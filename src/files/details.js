import { h, icon, fs, tags, fileType, session, appIcon } from '@lilos/sdk';
import { itemIcon, getApp, links } from '@lilos/system';
import { typeLabel, folderName, locationLabel, originLabel, ownerLabel, ownerNode, formatBytes, countLabel, retentionLabel, dateLabel } from './format.js';

/** Characters of a file shown by the preview (the rest is cut). */
const PREVIEW_CHARS = 100_000;
/** Files bigger than this get no line and word count in the information panel. */
const STATS_BYTES = 5 << 20;
/** Names listed for a multiple selection, and children for a folder's preview. */
const MAX_NAMES = 30;
const MAX_CHILDREN = 200;

const num = n => n.toLocaleString(session.locale);
const plural = (n, one, many) => `${num(n)} ${n === 1 ? one : many}`;

/** "1,2 KB (1.234 byte)", or "512 B". */
const bytesDetail = bytes => (bytes < 1024 ? formatBytes(bytes) : `${formatBytes(bytes)} (${num(bytes)} byte)`);

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
  if (!list.length) return 'Nessuno';
  return h('span', { class: 'fm-chips' }, list.map(t => h('span', { class: 'fm-chip', title: t.visible ? t.name : `${t.name} (tag invisibile)` },
    h('span', { class: 'tag-dot', style: { background: t.color }, 'aria-hidden': 'true' }), t.name)));
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
  return h('div', {}, h('p', { class: 'fm-info-hint' }, 'Nessun elemento selezionato: ecco la cartella aperta.'), nodeInfo(place.node, text));
}

function nodeInfo(n, text) {
  const { ext } = fileType(n.name);
  const app = n.type === 'app' ? getApp(n.app) : null;
  const general = [
    ['Tipo', n.type === 'file' && ext ? `${typeLabel(n)} (.${ext})` : n.type === 'app' ? 'Collegamento a un’app' : typeLabel(n)],
    n.type === 'app' && ['App', app ? app.name : `${n.app} (non installata)`],
  ];
  if (n.type === 'file') general.push(['Dimensione', bytesDetail(n.size ?? 0)]);
  if (n.type === 'folder') {
    const direct = n.trashed ? null : fs.children(n.id).length;
    const all = n.trashed ? n.inside : fs.count(n.id);
    general.push(['Contenuto', direct === null || all === direct ? countLabel(all) : `${countLabel(direct)}, ${num(all)} in tutto`]);
    general.push(['Dimensione', bytesDetail(nodeBytes(n))]);
  }
  if (n.trashed) {
    general.push(['Eliminato', dateLabel(n.trashed.at)], ['Posizione originale', originLabel(n), 'mono']);
  } else {
    general.push(['Percorso', fs.path(n.id), 'mono']);
  }
  general.push(['Creato', dateLabel(n.created)], ['Modificato', dateLabel(n.modified)]);

  const notes = [
    n.system && 'Di sistema: non si rinomina e non si elimina',
    n.private && 'Privata: si vede solo nel suo workspace',
    !n.trashed && fs.isHidden(n.id) && 'Nascosto da un tag invisibile',
    !n.trashed && links.has(n.id) && 'Nella barra laterale (Collegamenti)',
  ].filter(Boolean);

  const view = h('div', {},
    head(itemIcon(n), folderName(n), typeLabel(n)),
    section('Generali', facts(general)),
    section('Organizzazione', facts([
      ['Workspace', ownerNode(n)],
      ['Tag', tagChips(n.tags ?? [])],
    ])),
    notes.length ? section('Attributi', h('ul', { class: 'fm-notes' }, notes.map(t => h('li', {}, t)))) : null);

  // Lines, words and characters of a file: from its content, when it arrives
  if (readable(n) && (n.size ?? 0) <= STATS_BYTES) {
    const lines = h('dd', {}, '…'), words = h('dd', {}, '…'), chars = h('dd', {}, '…');
    view.append(section('Testo', h('dl', { class: 'fm-facts' },
      h('dt', {}, 'Righe'), lines, h('dt', {}, 'Parole'), words, h('dt', {}, 'Caratteri'), chars)));
    text(n).then(t => {
      lines.textContent = num(t ? t.split('\n').length : 0);
      words.textContent = num(t.trim() ? t.trim().split(/\s+/).length : 0);
      chars.textContent = num([...t].length);
    }, () => { lines.textContent = words.textContent = chars.textContent = '—'; });
  }
  return view;
}

function selectionInfo(nodes) {
  const by = type => nodes.filter(n => n.type === type).length;
  const folders = by('folder'), files = by('file'), apps = by('app');
  const what = [folders && plural(folders, 'cartella', 'cartelle'), files && plural(files, 'file', 'file'), apps && plural(apps, 'app', 'app')].filter(Boolean).join(', ');
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
    head(stack, `${num(nodes.length)} elementi selezionati`, what),
    section('Generali', facts([
      ['Dimensione', bytesDetail(nodes.reduce((sum, n) => sum + nodeBytes(n), 0))],
      inside > 0 && ['Contenuto', `${num(inside)} element${inside === 1 ? 'o' : 'i'} nelle cartelle`],
      ['Tipi', [...types].sort((a, b) => b[1] - a[1]).map(([label, n]) => `${label} ${num(n)}`).join(' · ')],
      !trashed && ['Posizione', parents.size === 1 ? locationLabel(nodes[0]) : `${num(parents.size)} cartelle diverse`, parents.size === 1 ? 'mono' : null],
      ['Meno recente', dateLabel(Math.min(...times))],
      ['Più recente', dateLabel(Math.max(...times))],
    ])),
    section('Organizzazione', facts([
      ['Workspace', owners.join(', ')],
      ['Tag', tagChips(tagIds)],
      tagIds.length > 0 && ['In comune', tagChips(shared)],
    ])),
    section('Elementi', h('ul', { class: 'fm-names' },
      nodes.slice(0, MAX_NAMES).map(n => h('li', { title: n.name }, h('span', { class: 'fm-icon' }, itemIcon(n)), h('span', {}, n.name))),
      nodes.length > MAX_NAMES ? h('li', { class: 'more' }, `e altri ${num(nodes.length - MAX_NAMES)}`) : null)));
}

function trashInfo() {
  const items = fs.trashed();
  return h('div', {},
    head(h('span', { class: 'fm-info-glyph' }, icon('trash')), 'Cestino', countLabel(items.length)),
    section('Generali', facts([
      ['Contenuto', items.length ? `${countLabel(items.length)}, ${num(items.reduce((s, n) => s + 1 + n.inside, 0))} in tutto` : countLabel(0)],
      ['Dimensione', bytesDetail(items.reduce((s, n) => s + (n.bytes ?? 0), 0))],
      items.length > 0 && ['Ultima eliminazione', dateLabel(items[0].trashed.at)],
      ['Conservazione', retentionLabel()],
    ])));
}

function tagInfo(tag) {
  const items = fs.tagged(tag.id);
  return h('div', {},
    head(h('span', { class: 'tag-dot fm-info-tag', style: { background: tag.color }, 'aria-hidden': 'true' }), tag.name, 'Tag'),
    section('Generali', facts([
      ['Elementi', countLabel(items.length)],
      ['Dimensione', bytesDetail(items.reduce((s, n) => s + nodeBytes(n), 0))],
      ['Visibilità', tag.visible ? 'Visibile' : 'Invisibile: i suoi elementi sono nascosti altrove'],
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
        ? empty('list', `${num(nodes.length)} elementi selezionati`, 'L’anteprima mostra un elemento alla volta')
        : empty('file', 'Nessun elemento selezionato', 'Seleziona un file per vederne il contenuto'));
    }
    if (n.trashed) return this.#show(this.#title(n), empty('trash', 'Nel cestino', 'Ripristinalo per vederne il contenuto'));
    if (n.type === 'folder') return this.#show(this.#title(n), this.#folder(n));
    if (n.type === 'app') return this.#show(this.#title(n), this.#app(n));
    const loading = h('div', { class: 'fm-preview-wait' }, 'Caricamento…');
    this.#show(this.#title(n), loading);
    this.text(n).then(t => {
      if (this.#key !== key) return;
      loading.replaceWith(this.#file(n, t));
    }, err => {
      if (this.#key !== key) return;
      loading.replaceWith(empty('x', 'Impossibile leggere il file', err?.message ?? ''));
    });
  }

  destroy() { this.#clear(); }

  #title(n) {
    const action = n.trashed ? null : n.type === 'folder' ? 'Apri' : n.type === 'app' ? 'Avvia' : 'Apri';
    return h('div', { class: 'fm-preview-head' },
      h('span', { class: 'fm-icon' }, itemIcon(n)),
      h('span', { class: 'fm-preview-name', title: n.name }, folderName(n)),
      action && h('button', { class: 'fm-preview-open', type: 'button', onclick: () => this.open(n) }, action));
  }

  #file(n, t) {
    if (!t) return empty('file', 'File vuoto', '');
    const { ext } = fileType(n.name);
    if (ext === 'svg' && /^\s*(<\?xml[^>]*>\s*)?(<!--[\s\S]*?-->\s*)*<svg[\s>]/i.test(t)) {
      // An <img> runs no script of the SVG and loads nothing else
      this.#url = URL.createObjectURL(new Blob([t], { type: 'image/svg+xml' }));
      return h('div', { class: 'fm-preview-image' }, h('img', { src: this.#url, alt: `Anteprima di ${n.name}` }));
    }
    if (t.slice(0, 8000).includes('\0')) return empty('file', 'Anteprima non disponibile', 'Il file non contiene testo');
    const cut = t.length > PREVIEW_CHARS;
    return h('div', { class: 'fm-preview-textwrap' },
      h('pre', { class: 'fm-preview-text', tabindex: '0', 'aria-label': `Contenuto di ${n.name}` }, cut ? t.slice(0, PREVIEW_CHARS) : t),
      cut ? h('div', { class: 'fm-preview-note' }, `Mostrati i primi ${num(PREVIEW_CHARS)} caratteri su ${num(t.length)}: apri il file per vederlo tutto`) : null);
  }

  #folder(n) {
    const children = fs.children(n.id);
    if (!children.length) return empty('folder', 'Cartella vuota', '');
    const rank = { folder: 0, file: 1, app: 1 };
    children.sort((a, b) => rank[a.type] - rank[b.type] || a.name.localeCompare(b.name, session.locale, { numeric: true }));
    return h('ul', { class: 'fm-preview-list', 'aria-label': `Contenuto di ${n.name}` },
      children.slice(0, MAX_CHILDREN).map(c => h('li', { title: `${c.name} — doppio clic per aprire`, ondblclick: () => this.open(c) },
        h('span', { class: 'fm-icon' }, itemIcon(c)), h('span', { class: 'fm-label' }, c.name))),
      children.length > MAX_CHILDREN ? h('li', { class: 'more' }, `e altri ${num(children.length - MAX_CHILDREN)}`) : null);
  }

  #app(n) {
    const app = getApp(n.app);
    if (!app) return empty('x', 'App non installata', n.app);
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
