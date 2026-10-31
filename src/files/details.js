import { h, icon, fs, tags, fileType, session, appIcon } from '@lilos/sdk';
import { itemIcon, getApp, links } from '@lilos/system';
import { num, typeLabel, folderName, locationLabel, originLabel, ownerLabel, ownerNode, formatBytes, countLabel, retentionLabel, dateLabel } from './format.js';
import { t } from './i18n.js';

/** Characters of a file shown by the preview (the rest is cut). */
const PREVIEW_CHARS = 100_000;
/** Files bigger than this get no line and word count in the information panel. */
const STATS_BYTES = 5 << 20;
/** Names listed for a multiple selection, and children for a folder's preview. */
const MAX_NAMES = 30;
const MAX_CHILDREN = 200;

/** "1,2 KB (1.234 byte)", or "512 B". */
const bytesDetail = bytes => (bytes < 1024 ? formatBytes(bytes) : t('info.bytesDetail', { size: formatBytes(bytes), count: num(bytes) }));

/** Bytes of every file inside a folder, at any depth. */
function treeBytes(id) {
  let total = 0;
  for (const child of fs.children(id)) total += child.type === 'folder' ? treeBytes(child.id) : child.size ?? 0;
  return total;
}

/** Bytes of a node with what it contains (trashed items know theirs). */
const nodeBytes = n => (n.trashed ? n.bytes ?? 0 : n.type === 'folder' ? treeBytes(n.id) : n.size ?? 0);

/** True if the preview and the counts can read the node's content. */
export const readable = n => n?.type === 'file' && !n.trashed;

/** Key of what a node's content is now: it changes when the file is written. */
export const contentKey = n => `${n.id}:${n.modified}:${n.size ?? 0}`;

function tagChips(ids) {
  const list = ids.map(id => tags.get(id)).filter(Boolean);
  if (!list.length) return t('info.none');
  return h('span', { class: 'fm-chips' }, list.map(tag => h('span', { class: 'fm-chip', title: tag.visible ? tag.name : t('info.tagHidden', { name: tag.name }) },
    h('span', { class: 'tag-dot', style: { background: tag.color }, 'aria-hidden': 'true' }), tag.name)));
}

/** A list of label → value rows (null rows are skipped). */
const facts = rows => h('dl', { class: 'fm-facts' }, rows.filter(Boolean).flatMap(([label, value, cls]) => [
  h('dt', {}, label), h('dd', { class: cls }, value),
]));

const section = (title, ...children) => h('section', { class: 'fm-info-section' }, h('h6', {}, title), ...children);

function head(glyph, name, kind) {
  return h('div', { class: 'fm-info-head' },
    h('span', { class: 'fm-info-icon' }, glyph),
    h('div', { class: 'fm-info-titles' }, h('div', { class: 'fm-info-name', title: name }, name), kind && h('div', { class: 'fm-info-kind' }, kind)));
}

// ---------- Information ----------

/**
 * Contents of the information panel.
 *   nodes   the selected items (none: what the window shows: `place`)
 *   place   { trash: true } | { tag } | { node }: the folder, the trash or the tag view shown
 *   text    node → Promise<string>: its content (shared with the preview, read once)
 */
export function infoView({ nodes, place, text }) {
  if (nodes.length > 1) return selectionInfo(nodes);
  if (nodes.length === 1) return nodeInfo(nodes[0], text);
  if (place.trash) return trashInfo();
  if (place.tag) return tagInfo(place.tag);
  return h('div', {}, h('p', { class: 'fm-info-hint' }, t('info.folderHint')), nodeInfo(place.node, text));
}

function nodeInfo(n, text) {
  const { ext } = fileType(n.name);
  const app = n.type === 'app' ? getApp(n.app) : null;
  const general = [
    [t('info.type'), n.type === 'file' && ext ? `${typeLabel(n)} (.${ext})` : n.type === 'app' ? t('type.appLink') : typeLabel(n)],
    n.type === 'app' && [t('info.app'), app ? app.name : t('info.appMissing', { id: n.app })],
  ];
  if (n.type === 'file') general.push([t('info.size'), bytesDetail(n.size ?? 0)]);
  if (n.type === 'folder') {
    const direct = n.trashed ? null : fs.children(n.id).length;
    const all = n.trashed ? n.inside : fs.count(n.id);
    general.push([t('info.contents'), direct === null || all === direct ? countLabel(all) : t('info.contentsTotal', { items: countLabel(direct), total: num(all) })]);
    general.push([t('info.size'), bytesDetail(nodeBytes(n))]);
  }
  if (n.trashed) {
    general.push([t('info.deleted'), dateLabel(n.trashed.at)], [t('info.origin'), originLabel(n), 'mono']);
  } else {
    general.push([t('info.path'), fs.path(n.id), 'mono']);
  }
  general.push([t('info.created'), dateLabel(n.created)], [t('info.modified'), dateLabel(n.modified)]);

  const notes = [
    n.system && t('note.system'),
    n.private && t('note.private'),
    !n.trashed && fs.isHidden(n.id) && t('note.hidden'),
    !n.trashed && links.has(n.id) && t('note.linked'),
  ].filter(Boolean);

  const view = h('div', {},
    head(itemIcon(n), folderName(n), typeLabel(n)),
    section(t('info.general'), facts(general)),
    section(t('info.organization'), facts([
      [t('info.workspace'), ownerNode(n)],
      [t('info.tags'), tagChips(n.tags ?? [])],
    ])),
    notes.length ? section(t('info.attributes'), h('ul', { class: 'fm-notes' }, notes.map(note => h('li', {}, note)))) : null);

  // Lines, words and characters of a file: from its content, when it arrives
  if (readable(n) && (n.size ?? 0) <= STATS_BYTES) {
    const lines = h('dd', {}, '…'), words = h('dd', {}, '…'), chars = h('dd', {}, '…');
    view.append(section(t('info.text'), h('dl', { class: 'fm-facts' },
      h('dt', {}, t('info.lines')), lines, h('dt', {}, t('info.words')), words, h('dt', {}, t('info.chars')), chars)));
    text(n).then(content => {
      lines.textContent = num(content ? content.split('\n').length : 0);
      words.textContent = num(content.trim() ? content.trim().split(/\s+/).length : 0);
      chars.textContent = num([...content].length);
    }, () => { lines.textContent = words.textContent = chars.textContent = '—'; });
  }
  return view;
}

function selectionInfo(nodes) {
  const by = type => nodes.filter(n => n.type === type).length;
  const folders = by('folder'), files = by('file'), apps = by('app');
  const what = [
    folders && t('info.folders', { n: folders, count: num(folders) }),
    files && t('info.files', { n: files, count: num(files) }),
    apps && t('info.apps', { n: apps, count: num(apps) }),
  ].filter(Boolean).join(', ');
  const inside = nodes.reduce((sum, n) => sum + (n.type !== 'folder' ? 0 : n.trashed ? n.inside : fs.count(n.id)), 0);
  const types = new Map();
  for (const n of nodes) types.set(typeLabel(n), (types.get(typeLabel(n)) ?? 0) + 1);
  const parents = new Set(nodes.map(n => n.parent));
  const times = nodes.map(n => n.modified);
  const owners = [...new Set(nodes.map(ownerLabel))];
  const tagIds = [...new Set(nodes.flatMap(n => n.tags ?? []))];
  const shared = tagIds.filter(id => nodes.every(n => n.tags?.includes(id)));
  const trashed = nodes.every(n => n.trashed);

  const stack = h('span', { class: 'fm-info-stack' }, nodes.slice(0, 3).map(n => h('span', {}, itemIcon(n))));
  return h('div', {},
    head(stack, t('selection.count', { count: num(nodes.length) }), what),
    section(t('info.general'), facts([
      [t('info.size'), bytesDetail(nodes.reduce((sum, n) => sum + nodeBytes(n), 0))],
      inside > 0 && [t('info.contents'), t('info.insideFolders', { n: inside, count: num(inside) })],
      [t('info.types'), [...types].sort((a, b) => b[1] - a[1]).map(([label, n]) => `${label} ${num(n)}`).join(' · ')],
      !trashed && [t('info.location'), parents.size === 1 ? locationLabel(nodes[0]) : t('info.manyFolders', { count: num(parents.size) }), parents.size === 1 ? 'mono' : null],
      [t('info.oldest'), dateLabel(Math.min(...times))],
      [t('info.newest'), dateLabel(Math.max(...times))],
    ])),
    section(t('info.organization'), facts([
      [t('info.workspace'), owners.join(', ')],
      [t('info.tags'), tagChips(tagIds)],
      tagIds.length > 0 && [t('info.common'), tagChips(shared)],
    ])),
    section(t('info.items'), h('ul', { class: 'fm-names' },
      nodes.slice(0, MAX_NAMES).map(n => h('li', { title: n.name }, h('span', { class: 'fm-icon' }, itemIcon(n)), h('span', {}, n.name))),
      nodes.length > MAX_NAMES ? h('li', { class: 'more' }, t('list.more', { count: num(nodes.length - MAX_NAMES) })) : null)));
}

function trashInfo() {
  const items = fs.trashed();
  const total = items.reduce((s, n) => s + 1 + n.inside, 0);
  return h('div', {},
    head(h('span', { class: 'fm-info-glyph' }, icon('trash')), t('place.trash'), countLabel(items.length)),
    section(t('info.general'), facts([
      [t('info.contents'), items.length ? t('info.contentsTotal', { items: countLabel(items.length), total: num(total) }) : countLabel(0)],
      [t('info.size'), bytesDetail(items.reduce((s, n) => s + (n.bytes ?? 0), 0))],
      items.length > 0 && [t('info.lastDeleted'), dateLabel(items[0].trashed.at)],
      [t('info.retention'), retentionLabel()],
    ])));
}

function tagInfo(tag) {
  const items = fs.tagged(tag.id);
  return h('div', {},
    head(h('span', { class: 'tag-dot fm-info-tag', style: { background: tag.color }, 'aria-hidden': 'true' }), tag.name, t('info.tagKind')),
    section(t('info.general'), facts([
      [t('info.items'), countLabel(items.length)],
      [t('info.size'), bytesDetail(items.reduce((s, n) => s + nodeBytes(n), 0))],
      [t('info.visibility'), tag.visible ? t('info.visible') : t('info.invisible')],
    ])));
}

// ---------- Preview ----------

/**
 * The preview panel: what a file contains (text, an SVG image), what a folder holds, the app
 * of a shortcut. It shows one item; it is rebuilt only when that item or its content changes.
 */
export class Preview {
  #key = null;
  #url = null;   // object URL of an SVG shown, revoked when it goes

  constructor(body, { text, open }) {
    this.body = body;
    this.text = text;
    this.open = open;
  }

  update(nodes) {
    const n = nodes.length === 1 ? nodes[0] : null;
    const key = n ? `${contentKey(n)}:${n.name}:${n.type === 'folder' && !n.trashed ? fs.children(n.id).map(c => c.id + c.name).join() : ''}` : `${nodes.length}`;
    if (key === this.#key) return;
    this.#key = key;
    this.#clear();
    if (!n) {
      return this.#show(nodes.length
        ? empty('list', t('selection.count', { count: num(nodes.length) }), t('preview.oneAtATime'))
        : empty('file', t('preview.none'), t('preview.selectFile')));
    }
    if (n.trashed) return this.#show(this.#title(n), empty('trash', t('preview.trashed'), t('preview.restoreToSee')));
    if (n.type === 'folder') return this.#show(this.#title(n), this.#folder(n));
    if (n.type === 'app') return this.#show(this.#title(n), this.#app(n));
    const loading = h('div', { class: 'fm-preview-wait' }, t('preview.loading'));
    this.#show(this.#title(n), loading);
    this.text(n).then(content => {
      if (this.#key !== key) return;
      loading.replaceWith(this.#file(n, content));
    }, err => {
      if (this.#key !== key) return;
      loading.replaceWith(empty('x', t('preview.readError'), err?.message ?? ''));
    });
  }

  destroy() { this.#clear(); }

  #title(n) {
    const action = n.trashed ? null : n.type === 'app' ? t('preview.launch') : t('preview.open');
    return h('div', { class: 'fm-preview-head' },
      h('span', { class: 'fm-icon' }, itemIcon(n)),
      h('span', { class: 'fm-preview-name', title: n.name }, folderName(n)),
      action && h('button', { class: 'fm-preview-open', type: 'button', onclick: () => this.open(n) }, action));
  }

  #file(n, content) {
    if (!content) return empty('file', t('preview.emptyFile'), '');
    const { ext } = fileType(n.name);
    if (ext === 'svg' && /^\s*(<\?xml[^>]*>\s*)?(<!--[\s\S]*?-->\s*)*<svg[\s>]/i.test(content)) {
      // An <img> runs no script of the SVG and loads nothing else
      this.#url = URL.createObjectURL(new Blob([content], { type: 'image/svg+xml' }));
      return h('div', { class: 'fm-preview-image' }, h('img', { src: this.#url, alt: t('preview.imageAlt', { name: n.name }) }));
    }
    if (content.slice(0, 8000).includes('\0')) return empty('file', t('preview.unavailable'), t('preview.notText'));
    const cut = content.length > PREVIEW_CHARS;
    return h('div', { class: 'fm-preview-textwrap' },
      h('pre', { class: 'fm-preview-text', tabindex: '0', 'aria-label': t('preview.contentsOf', { name: n.name }) }, cut ? content.slice(0, PREVIEW_CHARS) : content),
      cut ? h('div', { class: 'fm-preview-note' }, t('preview.cut', { shown: num(PREVIEW_CHARS), total: num(content.length) })) : null);
  }

  #folder(n) {
    const children = fs.children(n.id);
    if (!children.length) return empty('folder', t('preview.emptyFolder'), '');
    const rank = { folder: 0, file: 1, app: 1 };
    children.sort((a, b) => rank[a.type] - rank[b.type] || a.name.localeCompare(b.name, session.locale, { numeric: true }));
    return h('ul', { class: 'fm-preview-list', 'aria-label': t('preview.contentsOf', { name: n.name }) },
      children.slice(0, MAX_CHILDREN).map(c => h('li', { title: t('preview.childTitle', { name: c.name }), ondblclick: () => this.open(c) },
        h('span', { class: 'fm-icon' }, itemIcon(c)), h('span', { class: 'fm-label' }, c.name))),
      children.length > MAX_CHILDREN ? h('li', { class: 'more' }, t('list.more', { count: num(children.length - MAX_CHILDREN) })) : null);
  }

  #app(n) {
    const app = getApp(n.app);
    if (!app) return empty('x', t('preview.appMissing'), n.app);
    return h('div', { class: 'fm-preview-app' }, appIcon(app), h('strong', {}, app.name));
  }

  #show(...children) { this.body.replaceChildren(...children); }

  #clear() {
    if (this.#url) URL.revokeObjectURL(this.#url);
    this.#url = null;
  }
}

function empty(glyph, title, detail) {
  return h('div', { class: 'fm-preview-empty' }, icon(glyph), h('strong', {}, title), detail ? h('span', {}, detail) : null);
}
