import { pack, unpack, read, MAX_FILE } from './archive.js';
import { h, STYLE } from './ui.js';

/**
 * Zip: makes and opens .zip archives. An installable app (sdk 2), not part of lilOS. Its entry
 * points are the exports here (see the manifest, app.json):
 *   main   a .zip opened with the app: what is inside, and Extract here
 *   work   the actions of the menu of files and folders (Compress → Zip / Unzip), in the background;
 *          the result is a notification. Also does them again for an automation (Automata):
 *          { automation: { action: 'zip.zip' | 'zip.unzip', params }, files } → the id of what it made
 */
const SHOWN = 500;   // entries listed in the window

/** 12345 → '12 KB', in the language of the system. */
function size(i18n, n) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let u = 0;
  while (n >= 1024 && u < units.length - 1) { n /= 1024; u++; }
  return `${i18n.number(n, { maximumFractionDigits: u && n < 10 ? 1 : 0 })} ${units[u]}`;
}

/** An error of archive.js, in words. */
function explain(lilos, err) {
  const t = (k, p) => lilos.locale.i18n.t(k, p);
  const code = err?.message;
  const detail = typeof err?.detail === 'number' ? size(lilos.locale.i18n, err.detail) : String(err?.detail ?? '');
  const known = ['nothing', 'tooMany', 'tooBig', 'resultTooBig', 'read', 'corrupt', 'empty', 'skippedAll', 'notZip', 'outside'];
  return known.includes(code)
    ? t(`error.${code}`, { detail, limit: size(lilos.locale.i18n, MAX_FILE), max: err.detail })
    : t('error.generic', { error: code ?? String(err) });
}

/** The node id of a '~' path the app made (automations name nodes by id). */
const idOf = async (lilos, ref) => (await lilos.files.info(ref)).id;

/**
 * Tells an automation being recorded what the user did (an action of contributes.automation),
 * with the '~' path of what it made. Older lilOS has no lilos.automation; a failure only means
 * the step is not recorded.
 */
async function record(lilos, id, params, made) {
  try {
    if (lilos.automation) await lilos.automation.record(id, { params, result: await idOf(lilos, made) });
  } catch { /* not recorded */ }
}

/** What was left out of an archive, in a sentence ('' when nothing). */
function skippedText(t, skipped) {
  if (!skipped.length) return '';
  const names = skipped.slice(0, 3).map(s => s.name).join(', ');
  return t('skipped', { n: skipped.length, names: skipped.length > 3 ? `${names}, …` : names });
}

// ---------- Main: a .zip opened with the app ----------

export async function main({ lilos, root, args }) {
  const t = (k, p) => lilos.locale.i18n.t(k, p);
  root.append(h('style', {}, STYLE));
  const box = h('div', { class: 'zp' });
  root.append(box);

  let file = null, info = null, content = null, error = '', done = null, working = false;
  const take = a => {
    file = a?.file ?? (Array.isArray(a?.files) ? a.files[0] : null) ?? null;
    info = content = done = null;
    error = '';
  };

  const draw = () => {
    if (!file) {
      lilos.window.setTitle('Zip');
      return box.replaceChildren(h('h1', {}, 'Zip'), h('p', {}, t('main.intro')), h('p', { class: 'hint' }, t('main.limits', { limit: size(lilos.locale.i18n, MAX_FILE) })));
    }
    lilos.window.setTitle(info?.name ?? 'Zip');
    if (error) return box.replaceChildren(h('h1', {}, info?.name ?? ''), h('div', { class: 'error', role: 'alert' }, error));
    if (!content) return box.replaceChildren(h('p', { class: 'hint', 'aria-busy': 'true' }, t('main.reading')));
    const files = content.entries.filter(e => !e.folder);
    const total = files.reduce((s, e) => s + e.size, 0);
    const go = h('button', { type: 'button', class: 'primary', disabled: working || !content.entries.length, 'aria-busy': working ? 'true' : 'false', onclick: extract }, t(working ? 'main.extracting' : 'main.extract'));
    box.replaceChildren(...[
      h('h1', {}, info.name),
      h('p', {}, t('main.summary', { n: files.length, size: size(lilos.locale.i18n, total), packed: size(lilos.locale.i18n, info.size) })),
      content.entries.length
        ? h('ul', { class: 'list', 'aria-label': t('main.content') }, ...content.entries.slice(0, SHOWN).map(e => h('li', { class: e.folder ? 'folder' : '' },
          h('span', { class: 'name', title: e.path.join('/') }, e.path.join('/') + (e.folder ? '/' : '')),
          h('span', { class: 'size' }, e.folder ? '' : size(lilos.locale.i18n, e.size)))),
        content.entries.length > SHOWN && h('li', { class: 'more' }, t('main.more', { n: content.entries.length - SHOWN })))
        : h('div', { class: 'empty' }, t('main.empty')),
      content.skipped.length > 0 && h('p', { class: 'warn' }, skippedText(t, content.skipped)),
      done && h('p', { class: 'ok', role: 'status' }, done),
      h('div', { class: 'row' }, h('button', { type: 'button', onclick: () => lilos.window.close() }, t('common.close')), go),
    ].filter(Boolean));
  };

  async function extract() {
    if (working) return;
    working = true;
    done = null;
    draw();
    try {
      const result = await unpack(lilos, file);
      done = [t('done.unzip', { name: result.name, n: result.count }), skippedText(t, result.skipped)].filter(Boolean).join(' ');
      lilos.ui.notify({ text: done, level: 'success' });
      await record(lilos, 'zip.unzip', { file }, result.ref);
    } catch (err) {
      error = explain(lilos, err);
    }
    working = false;
    draw();
  }

  const load = async () => {
    draw();
    if (!file) return;
    try {
      info = await lilos.files.info(file);
      content = read(new Uint8Array(await (await lilos.files.read(file, { bytes: true })).arrayBuffer()));
    } catch (err) {
      error = explain(lilos, err);
    }
    draw();
  };
  take(args);
  // Asked again (another archive) while open
  const offLaunch = lilos.on('launch', a => { take(a); load(); });
  const offLocale = lilos.on('locale', draw);
  await load();
  return () => { offLaunch(); offLocale(); };
}

// ---------- Work: Compress → Zip / Unzip ----------

export async function work({ lilos }) {
  const t = (k, p) => lilos.locale.i18n.t(k, p);

  /** A step of an automation, done again without asking anything: the id of what it made. */
  async function again({ action, params }) {
    try {
      if (action === 'zip.zip') {
        const items = Array.isArray(params?.items) ? params.items : [];
        return await idOf(lilos, (await pack(lilos, items, { archiveName: t('archive.name') })).ref);
      }
      if (action === 'zip.unzip' && typeof params?.file === 'string') return await idOf(lilos, (await unpack(lilos, params.file)).ref);
    } catch (err) {
      throw new Error(explain(lilos, err));
    }
    throw new Error('unknown');
  }

  lilos.handle(async data => {
    if (data?.automation) return again(data.automation);
    const ids = Array.isArray(data?.files) ? data.files : [];
    try {
      if (data?.action === 'zip.zip') {
        const result = await pack(lilos, ids, { archiveName: t('archive.name') });
        await lilos.ui.notify({ text: t('done.zip', { name: result.name, n: result.count, size: size(lilos.locale.i18n, result.size) }), level: 'success' });
        await record(lilos, 'zip.zip', { items: ids }, result.ref);
        return { name: result.name };
      }
      if (data?.action === 'zip.unzip') {
        const names = [];
        for (const id of ids) {
          const result = await unpack(lilos, id);
          names.push(result.name);
          await lilos.ui.notify({ text: [t('done.unzip', { name: result.name, n: result.count }), skippedText(t, result.skipped)].filter(Boolean).join(' '), level: result.skipped.length ? 'warning' : 'success' });
          // One step for each archive: it is what the action does again
          await record(lilos, 'zip.unzip', { file: id }, result.ref);
        }
        return { names };
      }
    } catch (err) {
      await lilos.ui.notify({ text: explain(lilos, err), level: 'error' });
      return { error: err?.message ?? String(err) };
    }
    throw new Error('unknown');
  });
}
