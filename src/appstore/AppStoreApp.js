import { Window, h, icon, appIcon, apps, repositories, kernelModules, kernel, fs, settings, toast, actionButton, textField, toggle } from '@lilos/sdk';
import { describePermission, launch } from '@lilos/system';
import { renderMarkdown } from './markdown.js';
import './appstore.css';

/**
 * AppStore: the apps and kernel modules offered by the repositories (the official one and those
 * an admin added), to install, update and remove. Everything is done by the kernel: this only
 * shows and asks. Non-admins can look, not change; kernel modules are only for admins.
 *
 * One window: a search box over the tabs (Installati, Aggiornamenti, then a tab per category with
 * the items of every repository), cards that open the details with the README, and "Opzioni"
 * (preferences and repositories) at the bottom right. A README the kernel cut (past 64 KB) can be
 * saved whole in the Download folder.
 */
const IMPLICIT = new Set(['fs.app', 'fs.tmp', 'fs.open', 'ui.notify', 'clipboard.write', 'auth.remote']);
const CATEGORIES = [
  { id: 'system', label: 'Sistema' },
  { id: 'productivity', label: 'Produttività' },
  { id: 'media', label: 'Multimedia' },
  { id: 'development', label: 'Sviluppo' },
  { id: 'other', label: 'Altro' },
  { id: 'kernel', label: 'Kernel' },
];
const MODULE_ICON = { glyph: 'monitor', color: '#5f6673' };
const APP_ICON = { glyph: 'help', color: '#5f6673' };

settings.define({ 'appstore.showUnofficial': true });

const newer = (a, b) => {
  const pa = a.split('.').map(Number), pb = b.split('.').map(Number);
  return (pa[0] - pb[0] || pa[1] - pb[1] || pa[2] - pb[2]) > 0;
};
const cleanUrl = url => url.replace(/\.git$/i, '').replace(/\/+$/, '');
const sameRepo = (source, repo) => !!source?.url && cleanUrl(source.url).toLowerCase() === cleanUrl(repo.url).toLowerCase();
/** The repository's own name, without its path: the last part of its address. */
const repoName = repo => cleanUrl(repo.url).split(/[/\\]/).pop() || repo.name;
const granted = permissions => (permissions ?? []).filter(p => !IMPLICIT.has(p.split(':')[0]));

export default function AppStore({ openWindow }) {
  const isAdmin = kernel.user?.role === 'admin';
  const state = {
    repos: [], catalogs: new Map(), errors: new Map(), modules: [], loading: true, busy: null,
    tab: 'installed', query: {}, view: 'list', key: null, newRepo: { url: '', name: '' },
  };

  const win = new Window({ title: 'AppStore', icon: 'download', width: 960, height: 640, minWidth: 560, minHeight: 420 });
  win.el.classList.add('appstore');

  /** Runs one change at a time; buttons are off meanwhile. */
  async function act(label, fn, done) {
    if (state.busy) return;
    state.busy = label;
    render();
    try {
      const result = await fn();
      if (done) toast(typeof done === 'function' ? done(result) : done, { timeout: 5000 });
      await load({ quiet: true });
    } catch (err) {
      toast(err.message, { timeout: 7000 });
    } finally {
      state.busy = null;
      render();
    }
  }

  async function load({ quiet = false } = {}) {
    if (!quiet) { state.loading = true; render(); }
    try {
      state.repos = await repositories.list();
      await Promise.all(state.repos.map(async repo => {
        try {
          state.catalogs.set(repo.id, await repositories.catalog(repo.id));
          state.errors.delete(repo.id);
        } catch (err) {
          state.catalogs.delete(repo.id);
          state.errors.set(repo.id, err.message);
        }
      }));
      state.modules = isAdmin ? await kernelModules.list().catch(() => []) : [];
      await apps.refresh();
    } catch (err) {
      toast(err.message, { timeout: 7000 });
    }
    state.loading = false;
    render();
  }

  // ---------- Items: apps and modules of every repository, and what is installed ----------

  const visibleRepos = () => state.repos.filter(r => r.official || settings.get('appstore.showUnofficial'));

  function appItem(repo, entry, have) {
    const manifest = entry?.manifest ?? have.manifest;
    const offered = entry?.manifest.version ?? null;
    const here = !!have && (!entry || sameRepo(have.source, repo));
    return {
      key: `app:${repo?.id ?? '-'}:${manifest.id}`, kind: 'app', id: manifest.id, name: manifest.name,
      description: manifest.description ?? '', icon: manifest.icon ?? APP_ICON, publisher: manifest.publisher?.name ?? '',
      category: CATEGORIES.some(c => c.id === manifest.category && c.id !== 'kernel') ? manifest.category : 'other',
      repo, entry, have, manifest, readme: entry?.readme ?? null, readmeTruncated: !!entry?.readmeTruncated,
      offered, installed: have?.version ?? null, here, elsewhere: !!have && !here,
      update: here && offered && newer(offered, have.version) ? offered : null,
      required: !!manifest.required,
      verified: !!have?.signed || !!repo?.official,
    };
  }

  function moduleItem(repo, entry, have) {
    const module = entry?.module ?? have;
    const offered = entry?.module.version ?? null;
    const here = !!have && (!entry || sameRepo(have.source, repo));
    return {
      key: `module:${repo?.id ?? '-'}:${module.name}`, kind: 'module', id: module.name, name: module.name,
      description: module.description ?? '', icon: entry?.module.icon ?? have?.icon ?? MODULE_ICON, publisher: '',
      category: 'kernel', repo, entry, have, module, readme: entry?.readme ?? null, readmeTruncated: !!entry?.readmeTruncated,
      offered, installed: have ? have.enabled ?? have.running : null, here, elsewhere: !!have && !here,
      update: here && have.enabled && offered && newer(offered, have.enabled) ? offered : null,
      provides: module.provides ?? [], verified: !!repo?.official,
    };
  }

  function allItems() {
    const installed = apps.list();
    const modules = state.modules.filter(m => m.enabled || m.running);
    const out = [];
    for (const repo of visibleRepos()) {
      const catalog = state.catalogs.get(repo.id);
      for (const entry of catalog?.apps ?? []) if (entry.manifest) out.push(appItem(repo, entry, installed.find(a => a.id === entry.manifest.id)));
      if (isAdmin) for (const entry of catalog?.modules ?? []) if (entry.module) out.push(moduleItem(repo, entry, modules.find(m => m.name === entry.module.name)));
    }
    // Installed, but not offered by a repository shown here (or not read yet)
    for (const app of installed) {
      if (!out.some(i => i.kind === 'app' && i.here && i.id === app.id)) out.push(appItem(state.repos.find(r => sameRepo(app.source, r)) ?? null, null, app));
    }
    for (const m of modules) {
      if (!out.some(i => i.kind === 'module' && i.here && i.id === m.name)) out.push(moduleItem(state.repos.find(r => sameRepo(m.source, r)) ?? null, null, m));
    }
    return out;
  }

  function tabs(items) {
    const present = new Set(items.map(i => i.category));
    return [
      { id: 'installed', label: 'Installati', filter: i => i.here },
      { id: 'updates', label: 'Aggiornamenti', filter: i => !!i.update, badge: true },
      ...CATEGORIES.filter(c => present.has(c.id) || (c.id === 'kernel' && isAdmin)).map(c => ({ ...c, category: true, filter: i => i.category === c.id })),
    ];
  }

  const matches = (item, query) => !query || [item.name, item.id, item.description, item.publisher, item.repo ? repoName(item.repo) : '']
    .some(text => text.toLowerCase().includes(query));

  const restartNeeded = () => isAdmin && state.modules.some(m => (m.enabled ?? null) !== (m.running ?? null));

  // ---------- Actions ----------

  /** Asks before installing: what the package may do and, when it is not official, the warning. */
  function confirmInstall({ title, name, permissions = [], official, kernelModule = false }) {
    return new Promise(resolve => {
      const asked = granted(permissions);
      const dialog = new Window({ title, icon: 'download', width: 440, height: kernelModule || !official ? 340 : 300, minimizable: false, maximizable: false });
      let answered = false;
      const answer = value => {
        if (answered) return;
        answered = true;
        resolve(value);
        dialog.emit('close');
      };
      dialog.on('destroy', () => answer(null));
      dialog.body.append(h('div', { class: 'as-dialog' },
        h('p', { class: 'as-dialog-lead' }, kernelModule ? `${name} è un modulo del kernel: il suo codice girerà nel kernel, con accesso completo a utenti e file.` : `${name} potrà:`),
        !kernelModule && asked.length ? h('ul', {}, ...asked.map(p => h('li', {}, describePermission(p)))) : null,
        !kernelModule && !asked.length ? h('p', {}, 'Nessun permesso oltre ai propri dati.') : null,
        official ? null : h('p', { class: 'as-warning' }, 'Non verificata: viene da un repository non ufficiale. Non si può sapere chi l’ha scritta, né che il codice non sia stato modificato. Installala solo se ti fidi di chi la distribuisce.'),
        h('div', { class: 'as-dialog-buttons' },
          actionButton({ label: 'Annulla', onClick: () => answer(null) }),
          actionButton({ label: official ? 'Installa' : 'Installa comunque', primary: official, danger: !official, onClick: () => answer({ grant: asked, allowUnsigned: !official }) })),
      ));
      openWindow(dialog);
    });
  }

  async function install(item) {
    const { repo, entry } = item;
    const source = { type: 'git', url: repo.url, path: entry.path, ref: state.catalogs.get(repo.id)?.ref };
    if (item.kind === 'module') {
      const answer = await confirmInstall({ title: `Installa ${item.name}`, name: item.name, official: repo.official, kernelModule: true });
      if (answer) act('install', () => kernelModules.install(source, { allowUnsigned: answer.allowUnsigned }), `${item.name} installato: riavvia il kernel per usarlo`);
      return;
    }
    const answer = await confirmInstall({ title: `Installa ${item.name}`, name: item.name, permissions: item.manifest.permissions, official: repo.official });
    if (answer) act('install', () => apps.install(source, answer), `${item.name} installata`);
  }

  /** What updating needs from the user (new permissions, the warning): null when they said no. */
  async function askUpdate(item) {
    const official = !!item.repo?.official;
    if (item.kind === 'module') {
      return official || await confirmInstall({ title: `Aggiorna ${item.name}`, name: item.name, official, kernelModule: true }) ? { allowUnsigned: !official } : null;
    }
    const added = granted(item.entry?.manifest.permissions).filter(p => !item.have.granted.includes(p));
    if (!added.length && official) return { grant: [], allowUnsigned: false };
    return confirmInstall({ title: `Aggiorna ${item.name}`, name: item.name, permissions: added, official });
  }

  const runUpdate = (item, answer) => (item.kind === 'module' ? kernelModules.update(item.id, answer) : apps.update(item.id, answer));

  async function update(item) {
    const answer = await askUpdate(item);
    if (!answer) return;
    act('update', () => runUpdate(item, answer), r => (r.unchanged ? `${item.name} è già aggiornat${item.kind === 'module' ? 'o' : 'a'}`
      : item.kind === 'module' ? `${item.name} ${r.version} installato: riavvia il kernel` : `${item.name} aggiornata alla ${r.version}`));
  }

  function updateAll(items) {
    act('update', async () => {
      let done = 0;
      for (const item of items) {
        const answer = await askUpdate(item);
        if (!answer) continue;
        try {
          await runUpdate(item, answer);
          done++;
        } catch (err) {
          toast(`${item.name}: ${err.message}`, { timeout: 7000 });
        }
      }
      return done;
    }, done => (done === 1 ? '1 elemento aggiornato' : `${done} elementi aggiornati`));
  }

  function remove(item) {
    if (item.kind === 'module') act('remove', () => kernelModules.remove(item.id), r => `${item.name} rimosso${r.kept.length ? ' (i suoi dati restano)' : ''}: riavvia il kernel`);
    else act('remove', () => apps.uninstall(item.id), `${item.name} rimossa`);
  }

  const reinstall = item => act('reinstall', () => apps.update(item.id, { reinstall: true, allowUnsigned: !item.verified }), `${item.name} reinstallata`);

  /** Saves the whole README of a package in the Download folder. */
  async function downloadReadme(item) {
    try {
      const text = await repositories.readme(item.repo.id, item.entry.path);
      const folder = fs.children(fs.root).find(n => n.type === 'folder' && n.system && n.name === 'Download');
      if (!folder) throw new Error('Manca la cartella Download');
      const file = fs.create(folder.id, { type: 'file', name: `${item.name} - README.md` });
      await fs.write(file.id, text);
      toast(`README salvato in Download come «${file.name}»`, { timeout: 6000 });
    } catch (err) {
      toast(err.message, { timeout: 7000 });
    }
  }

  const restartKernel = () => act('restart', async () => {
    await kernelModules.restart();
    await new Promise(r => setTimeout(r, 2500));
  }, 'Kernel riavviato');

  // ---------- Views ----------

  const button = (label, onClick, opts = {}) => {
    const b = actionButton({ label, onClick, ...opts });
    b.disabled = !!state.busy;
    return b;
  };
  const status = (text, ok = false) => h('span', { class: 'as-state' }, ok ? icon('check') : null, text);
  const repoLabel = item => (item.repo
    ? h('span', { class: 'as-repo', title: item.repo.url }, icon('link'), h('span', {}, repoName(item.repo)))
    : h('span', { class: 'as-repo' }, icon('folder'), h('span', {}, item.kind === 'module' ? 'Installato a mano' : 'Cartella locale')));
  const unofficial = item => (item.repo && !item.repo.official ? h('span', { class: 'as-unofficial' }, 'non ufficiale') : null);
  const installedWord = item => (item.kind === 'module' ? 'Installato' : 'Installata');
  const section = (title, ...extra) => h('div', { class: 'as-section-title' }, title, ...extra);
  const fact = (label, value) => h('div', { class: 'as-fact' }, h('b', {}, label), String(value));
  const backButton = label => h('button', { class: 'as-back', onclick: () => show('list') }, icon('arrowLeft'), label);

  function cardControl(item) {
    if (item.update) return isAdmin ? button('Aggiorna', () => update(item), { primary: true }) : status(`Aggiornamento ${item.update}`);
    if (item.here) return status(item.kind === 'module' && !item.have.enabled ? 'Rimosso' : installedWord(item), true);
    if (item.elsewhere) return status('Da un altro repository');
    return isAdmin ? button('Installa', () => install(item)) : status('Disponibile');
  }

  function card(item) {
    const version = item.update ? `${item.installed} → ${item.update}` : item.here ? item.installed : item.offered;
    return h('div', { class: 'as-card' },
      h('div', { class: 'as-card-top' },
        appIcon(item.icon),
        h('div', { class: 'as-card-head' },
          h('button', { class: 'as-card-open', onclick: () => show('detail', item.key) }, item.name, h('span', { class: 'as-ver' }, version)),
          h('div', { class: 'as-card-desc' }, item.description))),
      h('div', { class: 'as-card-foot' }, repoLabel(item), unofficial(item), h('span', { class: 'as-spacer' }), cardControl(item)));
  }

  const grid = list => h('div', { class: 'as-grid' }, ...list.map(card));

  function banners() {
    const out = [];
    if (restartNeeded() && ['installed', 'updates', 'kernel'].includes(state.tab)) {
      out.push(h('div', { class: 'as-banner' }, icon('info'), h('span', {}, 'Le modifiche ai moduli valgono dal prossimo avvio del kernel.'), button('Riavvia il kernel', restartKernel, { primary: true })));
    }
    const failed = visibleRepos().filter(r => state.errors.has(r.id));
    if (failed.length) {
      out.push(h('div', { class: 'as-banner' }, icon('info'),
        h('span', {}, failed.length === 1 ? `${repoName(failed[0])} non è raggiungibile: quello che offre non è elencato.` : `${failed.length} repository non sono raggiungibili: quello che offrono non è elencato.`),
        h('button', { class: 'as-link', onclick: () => show('options') }, 'Dettagli')));
    }
    return out;
  }

  function listView(items, tab) {
    const query = (state.query[tab.id] ?? '').trim().toLowerCase();
    const list = items.filter(tab.filter).filter(i => matches(i, query));
    footerText.textContent = state.loading ? 'Lettura dei repository…' : `${list.length === 1 ? '1 elemento' : `${list.length} elementi`} · ${visibleRepos().length} repository`;
    if (!list.length) {
      const empty = state.loading && tab.id !== 'installed' ? 'Lettura dei repository…'
        : query ? `Nessun risultato per “${query}” in ${tab.label}`
          : tab.id === 'updates' ? 'Tutto aggiornato' : tab.id === 'installed' ? 'Niente di installato' : 'Niente in questa categoria';
      return [...banners(), h('div', { class: 'as-empty' }, empty)];
    }
    if (tab.id === 'installed') {
      const appsHere = list.filter(i => i.kind === 'app'), modulesHere = list.filter(i => i.kind === 'module');
      return [
        ...banners(),
        appsHere.length ? [section('App'), grid(appsHere)] : null,
        modulesHere.length ? [section('Moduli del kernel'), grid(modulesHere)] : null,
      ];
    }
    if (tab.id === 'updates') {
      return [
        ...banners(),
        section(list.length === 1 ? '1 aggiornamento' : `${list.length} aggiornamenti`,
          isAdmin && list.length > 1 ? h('span', { class: 'as-bulk' }, button('Aggiorna tutto', () => updateAll(list), { primary: true })) : null),
        grid(list),
      ];
    }
    // What can be installed first, then what already is
    const installed = i => Number(i.here || i.elsewhere);
    return [...banners(), grid([...list].sort((a, b) => installed(a) - installed(b) || a.name.localeCompare(b.name)))];
  }

  function detailView(item, tab) {
    const isModule = item.kind === 'module';
    const actions = [];
    if (item.here && !isModule) actions.push(button('Apri', () => launch(item.id), { primary: !item.update || !isAdmin }));
    if (isAdmin) {
      if (item.update) actions.push(button(`Aggiorna a ${item.update}`, () => update(item), { primary: true }));
      if (item.here && (!isModule || item.have.enabled)) {
        if (!item.update && item.have.source) actions.push(button('Cerca aggiornamenti', () => update(item)));
        if (!isModule) actions.push(button('Reinstalla', () => reinstall(item)));
        if (!item.required) actions.push(button('Rimuovi', () => remove(item), { danger: true }));
      }
      if (!item.here && !item.elsewhere && item.entry) actions.push(button(item.repo.official ? 'Installa' : 'Installa comunque', () => install(item), { primary: true, danger: !item.repo.official }));
    }
    const moduleState = isModule && item.have
      ? (!item.have.enabled ? 'Rimosso: attivo fino al riavvio' : item.have.running !== item.have.enabled ? (item.have.running ? `In uso la ${item.have.running} fino al riavvio` : 'Attivo dal prossimo avvio') : 'In uso')
      : null;
    const permissions = granted(item.manifest?.permissions);
    footerText.textContent = `${item.name} ${item.offered ?? item.installed}`;
    return h('div', { class: 'as-detail' },
      backButton(tab.label),
      h('div', { class: 'as-detail-head' },
        appIcon(item.icon),
        h('div', { class: 'as-detail-title' },
          h('h1', {}, item.name),
          h('div', { class: 'as-sub' }, [item.publisher, isModule ? 'Modulo del kernel' : 'App', CATEGORIES.find(c => c.id === item.category)?.label].filter(Boolean).join(' · ')),
          h('div', { class: 'as-meta' },
            repoLabel(item),
            item.verified ? h('span', { class: 'as-state' }, icon('shield'), 'Verificata') : item.repo ? h('span', { class: 'as-unofficial' }, 'non ufficiale · non verificata') : null,
            item.required ? h('span', { class: 'as-state' }, 'Necessaria a lilOS') : null,
            item.elsewhere ? h('span', { class: 'as-state' }, `${installedWord(item)} da un altro repository`) : null),
          actions.length ? h('div', { class: 'as-detail-actions' }, ...actions) : null)),
      item.repo && !item.repo.official && !item.here ? h('div', { class: 'as-banner' }, icon('info'), h('span', {}, 'Viene da un repository non ufficiale: non si può sapere chi l’ha scritta, né che il codice non sia stato modificato.')) : null,
      h('div', { class: 'as-facts' },
        fact('Versione', item.offered ?? item.installed),
        fact(installedWord(item), item.installed ?? '—'),
        fact('Repository', item.repo ? repoName(item.repo) : '—'),
        isModule ? fact('Fornisce', item.provides.join(', ') || '—') : fact('ID', item.id),
        moduleState ? fact('Stato', moduleState) : null),
      isModule
        ? h('div', { class: 'as-perm' }, h('h3', {}, icon('info'), 'Attenzione'), h('p', {}, 'Il codice di un modulo gira nel kernel, con accesso completo a utenti e file. Le modifiche valgono dal prossimo avvio del kernel.'))
        : h('div', { class: 'as-perm' }, h('h3', {}, icon('shield'), 'Potrà'),
          permissions.length ? h('ul', {}, ...permissions.map(p => h('li', {}, icon('check'), describePermission(p)))) : h('p', { class: 'as-muted' }, 'Nessun permesso oltre ai propri dati.')),
      h('div', { class: 'as-readme-title' }, icon('file'), 'README.md'),
      item.readme ? h('article', { class: 'as-readme' }, ...renderMarkdown(item.readme)) : null,
      item.readme && item.readmeTruncated ? h('p', { class: 'as-readme-cut' }, 'Il README è troppo lungo: qui se ne vede solo l’inizio. ',
        h('button', { class: 'as-link', onclick: () => downloadReadme(item) }, icon('download'), 'Scarica il README completo')) : null,
      item.readme ? null
        : h('p', { class: 'as-muted' }, item.repo ? 'Questo pacchetto non ha un README.' : 'Il README si legge dal repository: questo elemento non viene da un repository elencato.'));
  }

  function optionsView(tab) {
    const draft = state.newRepo;
    footerText.textContent = 'Opzioni';
    const repoRow = repo => {
      const catalog = state.catalogs.get(repo.id);
      const valid = list => (list ?? []).filter(e => !e.error).length;
      const invalid = [...catalog?.apps ?? [], ...catalog?.modules ?? []].filter(e => e.error);
      const what = state.errors.has(repo.id) ? `Non raggiungibile: ${state.errors.get(repo.id)}`
        : catalog ? [`${valid(catalog.apps)} app`, valid(catalog.modules) === 1 ? '1 modulo' : `${valid(catalog.modules)} moduli`,
          invalid.length === 1 ? '1 pacchetto non valido' : invalid.length ? `${invalid.length} pacchetti non validi` : null].filter(Boolean).join(' · ')
          : 'Lettura…';
      return h('div', { class: 'as-row' },
        appIcon(repo.official ? { glyph: 'shield', color: '#30a46c' } : { glyph: 'link', color: '#8a909b' }),
        h('div', { class: 'as-row-text' },
          h('b', {}, repoName(repo), h('span', { class: 'as-muted' }, ` · ${repo.name}`)),
          h('span', {}, repo.url),
          h('span', { class: state.errors.has(repo.id) ? 'as-error' : null, title: invalid.map(e => `${e.path}: ${e.error}`).join('\n') || null }, what)),
        repo.official ? h('span', { class: 'as-muted' }, 'Sempre presente') : isAdmin ? button('Rimuovi', () => act('repo', () => repositories.remove(repo.id), `${repoName(repo)} rimosso`), { danger: true }) : null);
    };
    return h('div', { class: 'as-options' },
      backButton(tab.label),
      h('h2', {}, 'Opzioni'),
      h('p', { class: 'as-lead' }, 'Preferenze dell’AppStore e repository da cui arrivano app e moduli.'),
      section('AppStore'),
      h('div', { class: 'as-group' },
        h('div', { class: 'as-row' },
          h('div', { class: 'as-row-text' }, h('b', {}, 'Mostra i repository non ufficiali'), h('span', {}, 'Se spento, le schede elencano solo quello che offre il repository ufficiale')),
          toggle({ value: settings.get('appstore.showUnofficial'), label: 'Mostra i repository non ufficiali', onChange: v => settings.set('appstore.showUnofficial', v) }))),
      section('Repository', h('span', { class: 'as-bulk' }, button('Ricarica', () => load()))),
      h('div', { class: 'as-group' }, ...state.repos.map(repoRow)),
      section('Aggiungi un repository'),
      isAdmin
        ? h('div', { class: 'as-group' },
          h('div', { class: 'as-row' }, h('div', { class: 'as-row-text' }, h('b', {}, 'Indirizzo'), h('span', {}, 'Un repository git con catalog.json, per esempio https://github.com/nome/repo')),
            textField({ value: draft.url, placeholder: 'https://…', label: 'Indirizzo del repository', onInput: v => { draft.url = v; } })),
          h('div', { class: 'as-row' }, h('div', { class: 'as-row-text' }, h('b', {}, 'Nome'), h('span', {}, 'Facoltativo: altrimenti quello del suo catalogo')),
            textField({ value: draft.name, placeholder: 'Nome', label: 'Nome del repository', onInput: v => { draft.name = v; } })),
          h('div', { class: 'as-row as-row-end' }, button('Aggiungi', () => act('repo', async () => {
            const repo = await repositories.add(draft.url.trim(), draft.name.trim() || undefined);
            state.newRepo = { url: '', name: '' };
            return repo;
          }, r => `${repoName(r)} aggiunto`), { primary: true })))
        : h('p', { class: 'as-muted' }, 'Solo un amministratore aggiunge e rimuove repository.'));
  }

  // ---------- Window ----------

  const search = h('input', { type: 'search', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Cerca' });
  const tabBar = h('div', { class: 'as-tabs', role: 'tablist' });
  const main = h('main', { class: 'as-main' });
  const footerText = h('span', { class: 'as-foot-text' });
  win.body.append(
    h('div', { class: 'as-head' }, h('label', { class: 'as-search' }, icon('search'), search), tabBar),
    main,
    h('footer', { class: 'as-foot' }, footerText, h('span', { class: 'as-spacer' }),
      h('button', { class: 'as-link', onclick: () => show('options') }, icon('gear'), 'Opzioni')));

  function show(view, key = null) {
    state.view = view;
    state.key = key;
    render();
    main.scrollTop = 0;
  }

  function selectTab(id) {
    state.tab = id;
    show('list');
  }

  search.addEventListener('input', () => {
    state.query[state.tab] = search.value;
    state.view = 'list';
    render();
  });
  search.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || !search.value) return;
    e.stopPropagation();
    search.value = '';
    search.dispatchEvent(new Event('input'));
  });
  tabBar.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const all = [...tabBar.querySelectorAll('[role=tab]')];
    const next = all[(all.indexOf(document.activeElement) + (e.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length];
    next.click();
    tabBar.querySelector('[tabindex="0"]')?.focus();
  });

  function render() {
    const items = allItems();
    const list = tabs(items);
    if (!list.some(t => t.id === state.tab)) state.tab = 'installed';
    const tab = list.find(t => t.id === state.tab);
    const updates = items.filter(i => i.update).length;
    tabBar.replaceChildren(...list.flatMap((t, n) => [
      t.category && !list[n - 1].category ? h('span', { class: 'as-tab-sep' }) : null,
      h('button', { class: 'as-tab', role: 'tab', 'aria-selected': String(state.view === 'list' && t.id === state.tab), tabindex: t.id === state.tab ? '0' : '-1', onclick: () => selectTab(t.id) },
        t.label, t.badge && updates ? h('span', { class: 'as-count' }, String(updates)) : null),
    ].filter(Boolean)));
    search.placeholder = `Cerca in ${tab.label}`;
    if (search.value !== (state.query[state.tab] ?? '')) search.value = state.query[state.tab] ?? '';
    const item = state.view === 'detail' ? items.find(i => i.key === state.key) : null;
    if (state.view === 'detail' && !item) state.view = 'list';
    const view = state.view === 'options' ? optionsView(tab) : item ? detailView(item, tab) : listView(items, tab);
    main.replaceChildren(...[view].flat(3).filter(Boolean));
  }

  win.on('launch', args => {
    const tab = { apps: 'installed', modules: 'kernel' }[args?.tab] ?? args?.tab;
    if (tab === 'repos' || tab === 'options') show('options');
    else if (typeof tab === 'string') selectTab(tab);
  });
  const offApps = apps.on('change', () => render());
  const offSetting = settings.on('change:appstore.showUnofficial', () => render());
  win.on('destroy', () => { offApps(); offSetting(); });
  render();
  load();
  return win;
}
