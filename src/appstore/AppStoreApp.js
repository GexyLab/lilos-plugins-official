import { Window, h, icon, appIcon, apps, repositories, kernelModules, kernel, fs, settings, toast, actionButton, textField, toggle } from '@lilos/sdk';
import * as sdk from '@lilos/sdk';   // `locale`: missing in older lilOS, so not imported by name
import { describePermission, launch } from '@lilos/system';
// Namespace import: lilOS versions without services (before the kernel's services) still load the AppStore
import * as system from '@lilos/system';
import { renderMarkdown } from './markdown.js';
import { t } from './i18n.js';
import './appstore.css';

/**
 * AppStore: the apps and kernel modules offered by the repositories (the official one and those
 * an admin added), to install, update and remove. Everything is done by the kernel: this only
 * shows and asks. Non-admins can look, not change; kernel modules are only for admins.
 *
 * One window: a search box over the tabs (Installed, Updates, then a tab per category with
 * the items of every repository), cards that open the details with the README, and "Options"
 * (preferences and repositories) at the bottom right. A README the kernel cut (past 64 KB) can be
 * saved whole in the Download folder.
 */
const IMPLICIT = new Set(['fs.app', 'fs.tmp', 'fs.open', 'ui.notify', 'clipboard.write', 'auth.remote']);
const categories = () => [
  { id: 'system', label: t('category.system') },
  { id: 'productivity', label: t('category.productivity') },
  { id: 'media', label: t('category.media') },
  { id: 'development', label: t('category.development') },
  { id: 'other', label: t('category.other') },
  { id: 'kernel', label: t('category.kernel') },
];
const APP_CATEGORIES = new Set(['system', 'productivity', 'media', 'development', 'other']);
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
    repos: [], catalogs: new Map(), errors: new Map(), modules: [], loading: true, busy: null, pressed: null,
    tab: 'installed', query: {}, view: 'list', key: null, newRepo: { url: '', name: '' }, updates: null,
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
      const text = typeof done === 'function' ? done(result) : done;
      if (text) toast(text, { timeout: 5000 });
      await load({ quiet: true });
    } catch (err) {
      toast(err.message, { timeout: 7000 });
    } finally {
      state.busy = null;
      render();
    }
  }

  /** The AppStore's own service (Updates), as Control Panel → Startup → Services shows it, or null without services. */
  async function loadUpdatesService() {
    const list = await system.services?.list().catch(() => null);
    state.updates = list?.available ? list.services.find(s => s.app === 'appstore' && s.entry === 'updates') ?? null : null;
  }

  async function setUpdatesAtStart(on) {
    try {
      await system.services.setStartup('appstore', 'updates', on ? 'login' : 'none');
      await system.services[on ? 'start' : 'stop']('appstore', 'updates');
      toast(on ? t('updates.atStartOn') : t('updates.atStartOff'));
    } catch (err) {
      toast(err.message, { timeout: 7000 });
    }
    await loadUpdatesService();
    render();
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
      await loadUpdatesService();
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
    // Name and description in the user's language: the catalog's translations, or the installed app's
    const shown = (entry ? entry.locales && sdk.locale?.manifest(entry.manifest, entry.locales) : sdk.locale?.manifest(have.manifest)) || manifest;
    const offered = entry?.manifest.version ?? null;
    const here = !!have && (!entry || sameRepo(have.source, repo));
    return {
      key: `app:${repo?.id ?? '-'}:${manifest.id}`, kind: 'app', id: manifest.id, name: shown.name,
      description: shown.description ?? '', icon: manifest.icon ?? APP_ICON, publisher: manifest.publisher?.name ?? '',
      category: APP_CATEGORIES.has(manifest.category) ? manifest.category : 'other',
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
      { id: 'installed', label: t('tab.installed'), filter: i => i.here },
      { id: 'updates', label: t('tab.updates'), filter: i => !!i.update, badge: true },
      ...categories().filter(c => present.has(c.id) || (c.id === 'kernel' && isAdmin)).map(c => ({ ...c, category: true, filter: i => i.category === c.id })),
    ];
  }

  const matches = (item, query) => !query || [item.name, item.id, item.description, item.publisher, item.repo ? repoName(item.repo) : '']
    .some(text => text.toLowerCase().includes(query));

  const restartNeeded = () => isAdmin && state.modules.some(m => (m.enabled ?? null) !== (m.running ?? null));

  // ---------- Actions ----------

  /** A small dialog with Cancel and one button that confirms: what that button gives, or null. */
  function ask({ title, glyph, height, body, confirm }) {
    return new Promise(resolve => {
      const dialog = new Window({ title, icon: glyph, width: 440, height, minimizable: false, maximizable: false });
      let answered = false;
      const answer = value => {
        if (answered) return;
        answered = true;
        resolve(value);
        dialog.emit('close');
      };
      dialog.on('destroy', () => answer(null));
      dialog.body.append(h('div', { class: 'as-dialog' },
        ...body,
        h('div', { class: 'as-dialog-buttons' },
          actionButton({ label: t('action.cancel'), onClick: () => answer(null) }),
          actionButton({ label: confirm.label, primary: confirm.primary, danger: confirm.danger, onClick: () => answer(confirm.value) })),
      ));
      openWindow(dialog);
    });
  }

  /** Asks before installing: what the package may do and, when it is not official, the warning. */
  function confirmInstall({ title, name, permissions = [], official, kernelModule = false }) {
    const asked = granted(permissions);
    return ask({
      title, glyph: 'download', height: kernelModule || !official ? 340 : 300,
      body: [
        h('p', { class: 'as-dialog-lead' }, kernelModule ? t('confirm.kernelModule', { name }) : t('confirm.mayDo', { name })),
        !kernelModule && asked.length ? h('ul', {}, ...asked.map(p => h('li', {}, describePermission(p)))) : null,
        !kernelModule && !asked.length ? h('p', {}, t('permissions.none')) : null,
        official ? null : h('p', { class: 'as-warning' }, t('confirm.unverified')),
      ],
      confirm: { label: official ? t('action.install') : t('action.installAnyway'), primary: official, danger: !official, value: { grant: asked, allowUnsigned: !official } },
    });
  }

  /** Asks before uninstalling an app: it goes for every user, with its settings and data. */
  const confirmUninstall = item => ask({
    title: t('confirm.uninstallTitle', { name: item.name }), glyph: 'trash', height: 230,
    body: [h('p', { class: 'as-dialog-lead' }, t('confirm.uninstall', { name: item.name })), h('p', {}, t('confirm.uninstallFiles'))],
    confirm: { label: t('action.uninstall'), danger: true, value: true },
  });

  async function install(item) {
    const { repo, entry } = item;
    const source = { type: 'git', url: repo.url, path: entry.path, ref: state.catalogs.get(repo.id)?.ref };
    if (item.kind === 'module') {
      const answer = await confirmInstall({ title: t('confirm.installTitle', { name: item.name }), name: item.name, official: repo.official, kernelModule: true });
      if (answer) act('install', () => kernelModules.install(source, { allowUnsigned: answer.allowUnsigned }), t('done.moduleInstalled', { name: item.name }));
      return;
    }
    const answer = await confirmInstall({ title: t('confirm.installTitle', { name: item.name }), name: item.name, permissions: item.manifest.permissions, official: repo.official });
    if (answer) act('install', () => apps.install(source, answer), t('done.appInstalled', { name: item.name }));
  }

  /** What updating needs from the user (new permissions, the warning): null when they said no. */
  async function askUpdate(item) {
    const official = !!item.repo?.official;
    if (item.kind === 'module') {
      return official || await confirmInstall({ title: t('confirm.updateTitle', { name: item.name }), name: item.name, official, kernelModule: true }) ? { allowUnsigned: !official } : null;
    }
    const added = granted(item.entry?.manifest.permissions).filter(p => !item.have.granted.includes(p));
    if (!added.length && official) return { grant: [], allowUnsigned: false };
    return confirmInstall({ title: t('confirm.updateTitle', { name: item.name }), name: item.name, permissions: added, official });
  }

  const runUpdate = (item, answer) => (item.kind === 'module' ? kernelModules.update(item.id, answer) : apps.update(item.id, answer));

  /**
   * Updates apps through lilOS (updateApps): it says what will close, lets the windows save, puts
   * the new version in place and asks to restart when needed. The AppStore closes too when it is
   * among them, and opens again. An older lilOS: straight to the kernel.
   * jobs: [{ item, run }] → [{ item, result } | { item, error }], or null when the user went back.
   */
  async function updateThroughSystem(jobs, { reinstall = false } = {}) {
    if (!system.updateApps) {
      const out = [];
      for (const job of jobs) out.push(await job.run().then(result => ({ item: job.item, result }), error => ({ item: job.item, error })));
      return out;
    }
    const out = await system.updateApps(jobs.map(({ item, run }) => ({ id: item.id, run, restartOnUpdate: item.entry?.manifest.restartOnUpdate })), { from: 'appstore', reinstall });
    return out && out.map((r, i) => ({ ...r, item: jobs[i].item }));
  }

  /** One app through lilOS: its result (null when the user went back), or its error thrown. */
  async function updateOne(item, run, options) {
    const [out] = await updateThroughSystem([{ item, run }], options) ?? [null];
    if (out?.error) throw out.error;
    return out ? out.result : null;
  }

  async function update(item) {
    const answer = await askUpdate(item);
    if (!answer) return;
    const isModule = item.kind === 'module', name = item.name;
    act('update', () => (isModule ? runUpdate(item, answer) : updateOne(item, () => runUpdate(item, answer))), r => (!r ? null : r.unchanged ? (isModule ? t('done.moduleUpToDate', { name }) : t('done.appUpToDate', { name }))
      : isModule ? t('done.moduleUpdated', { name, version: r.version }) : t('done.appUpdated', { name, version: r.version })));
  }

  function updateAll(items) {
    act('update', async () => {
      let done = 0;
      const jobs = [];
      for (const item of items) {
        const answer = await askUpdate(item);
        if (!answer) continue;
        if (item.kind !== 'module') {
          jobs.push({ item, run: () => runUpdate(item, answer) });
          continue;
        }
        try {
          await runUpdate(item, answer);
          done++;
        } catch (err) {
          toast(`${item.name}: ${err.message}`, { timeout: 7000 });
        }
      }
      for (const r of (jobs.length && await updateThroughSystem(jobs)) || []) {
        if (r.error) toast(`${r.item.name}: ${r.error.message}`, { timeout: 7000 });
        else done++;
      }
      return done;
    }, done => t('done.updatedCount', { n: done }));
  }

  async function remove(item) {
    const name = item.name;
    if (item.kind === 'module') act('remove', () => kernelModules.remove(item.id), r => (r.kept.length ? t('done.moduleRemovedDataKept', { name }) : t('done.moduleRemoved', { name })));
    else if (await confirmUninstall(item)) act('remove', () => apps.uninstall(item.id), t('done.appRemoved', { name }));
  }

  /** Apps an administrator can take away: installed from here, and not needed by lilOS. */
  const canUninstall = item => isAdmin && item.kind === 'app' && item.here && !item.required;

  const reinstall = item => act('reinstall', () => updateOne(item, () => apps.update(item.id, { reinstall: true, allowUnsigned: !item.verified }), { reinstall: true }),
    r => (r ? t('done.appReinstalled', { name: item.name }) : null));

  /** Saves the whole README of a package in the Download folder. */
  async function downloadReadme(item, link) {
    link.disabled = true;
    link.setAttribute('aria-busy', 'true');
    try {
      const text = await repositories.readme(item.repo.id, item.entry.path);
      const folder = fs.children(fs.root).find(n => n.type === 'folder' && n.system && n.name === 'Download');
      if (!folder) throw new Error(t('error.noDownloadFolder'));
      const file = fs.create(folder.id, { type: 'file', name: `${item.name} - README.md` });
      await fs.write(file.id, text);
      toast(t('readme.saved', { file: file.name }), { timeout: 6000 });
    } catch (err) {
      toast(err.message, { timeout: 7000 });
    } finally {
      link.disabled = false;
      link.removeAttribute('aria-busy');
    }
  }

  const restartKernel = () => act('restart', async () => {
    await kernelModules.restart();
    await new Promise(r => setTimeout(r, 2500));
    // lilOS too, so that it is coherent with the kernel's new modules (it asks the user: not awaited)
    system.requestRestart?.(t('restart.kernelReason'), 'kernel-modules');
  }, t('done.kernelRestarted'));

  // ---------- Views ----------

  /** key: tells apart buttons with the same label, so the one pressed shows the spinner while its change runs. */
  const button = (label, onClick, { key = '', ...opts } = {}) => {
    const id = `${label}|${key}`;
    const b = actionButton({ label, onClick: () => { state.pressed = id; return onClick(); }, ...opts });
    b.disabled = !!state.busy;
    if (state.busy && state.pressed === id) b.setAttribute('aria-busy', 'true');
    return b;
  };
  const status = (text, ok = false) => h('span', { class: 'as-state' }, ok ? icon('check') : null, text);
  const repoLabel = item => (item.repo
    ? h('span', { class: 'as-repo', title: item.repo.url }, icon('link'), h('span', {}, repoName(item.repo)))
    : h('span', { class: 'as-repo' }, icon('folder'), h('span', {}, item.kind === 'module' ? t('repo.manual') : t('repo.localFolder'))));
  const unofficial = item => (item.repo && !item.repo.official ? h('span', { class: 'as-unofficial' }, t('repo.unofficial')) : null);
  const installedWord = item => (item.kind === 'module' ? t('status.installedModule') : t('status.installedApp'));
  const section = (title, ...extra) => h('div', { class: 'as-section-title' }, title, ...extra);
  const fact = (label, value) => h('div', { class: 'as-fact' }, h('b', {}, label), String(value));
  const backButton = label => h('button', { class: 'as-back', onclick: () => show('list') }, icon('arrowLeft'), label);

  function cardControl(item) {
    if (item.update) return isAdmin ? button(t('action.update'), () => update(item), { primary: true, key: item.key }) : status(t('status.updateAvailable', { version: item.update }));
    if (item.here) return status(item.kind === 'module' && !item.have.enabled ? t('status.removed') : installedWord(item), true);
    if (item.elsewhere) return status(t('status.otherRepo'));
    return isAdmin ? button(t('action.install'), () => install(item), { key: item.key }) : status(t('status.available'));
  }

  /** uninstall: the Installed tab, where each app that can go has its own button. */
  function card(item, { uninstall = false } = {}) {
    const version = item.update ? `${item.installed} → ${item.update}` : item.here ? item.installed : item.offered;
    const uninstallButton = uninstall && canUninstall(item) ? button(t('action.uninstall'), () => remove(item), { danger: true, key: item.key }) : null;
    return h('div', { class: 'as-card' },
      h('div', { class: 'as-card-top' },
        appIcon(item.icon),
        h('div', { class: 'as-card-head' },
          h('button', { class: 'as-card-open', onclick: () => show('detail', item.key) }, item.name, h('span', { class: 'as-ver' }, version)),
          h('div', { class: 'as-card-desc' }, item.description))),
      h('div', { class: 'as-card-foot' }, repoLabel(item), unofficial(item), h('span', { class: 'as-spacer' }),
        // The button says it is installed: no "Installed" next to it
        uninstallButton && !item.update ? null : cardControl(item), uninstallButton));
  }

  const grid = (list, options) => h('div', { class: 'as-grid' }, ...list.map(item => card(item, options)));

  function banners() {
    const out = [];
    if (restartNeeded() && ['installed', 'updates', 'kernel'].includes(state.tab)) {
      out.push(h('div', { class: 'as-banner' }, icon('info'), h('span', {}, t('banner.restartNeeded')), button(t('action.restartKernel'), restartKernel, { primary: true })));
    }
    const failed = visibleRepos().filter(r => state.errors.has(r.id));
    if (failed.length) {
      out.push(h('div', { class: 'as-banner' }, icon('info'),
        h('span', {}, failed.length === 1 ? t('banner.repoUnreachable', { name: repoName(failed[0]) }) : t('banner.reposUnreachable', { n: failed.length })),
        h('button', { class: 'as-link', onclick: () => show('options') }, t('action.details'))));
    }
    return out;
  }

  function listView(items, tab) {
    const query = (state.query[tab.id] ?? '').trim().toLowerCase();
    const list = items.filter(tab.filter).filter(i => matches(i, query));
    footerText.textContent = state.loading ? t('list.reading') : `${t('list.items', { n: list.length })} · ${t('list.repos', { n: visibleRepos().length })}`;
    if (!list.length) {
      const empty = state.loading && tab.id !== 'installed' ? t('list.reading')
        : query ? t('list.noResults', { query, tab: tab.label })
          : tab.id === 'updates' ? t('list.upToDate') : tab.id === 'installed' ? t('list.nothingInstalled') : t('list.emptyCategory');
      return [...banners(), h('div', { class: 'as-empty' }, empty)];
    }
    if (tab.id === 'installed') {
      const appsHere = list.filter(i => i.kind === 'app'), modulesHere = list.filter(i => i.kind === 'module');
      return [
        ...banners(),
        appsHere.length ? [section(t('list.apps')), grid(appsHere, { uninstall: true })] : null,
        modulesHere.length ? [section(t('list.modules')), grid(modulesHere)] : null,
      ];
    }
    if (tab.id === 'updates') {
      return [
        ...banners(),
        section(t('list.updates', { n: list.length }),
          isAdmin && list.length > 1 ? h('span', { class: 'as-bulk' }, button(t('action.updateAll'), () => updateAll(list), { primary: true })) : null),
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
    if (item.here && !isModule) actions.push(button(t('action.open'), () => launch(item.id), { primary: !item.update || !isAdmin }));
    if (isAdmin) {
      if (item.update) actions.push(button(t('action.updateTo', { version: item.update }), () => update(item), { primary: true, key: item.key }));
      if (item.here && (!isModule || item.have.enabled)) {
        if (!item.update && item.have.source) actions.push(button(t('action.checkUpdates'), () => update(item), { key: item.key }));
        if (!isModule) actions.push(button(t('action.reinstall'), () => reinstall(item), { key: item.key }));
        if (!item.required) actions.push(button(isModule ? t('action.remove') : t('action.uninstall'), () => remove(item), { danger: true, key: item.key }));
      }
      if (!item.here && !item.elsewhere && item.entry) actions.push(button(item.repo.official ? t('action.install') : t('action.installAnyway'), () => install(item), { primary: true, danger: !item.repo.official, key: item.key }));
    }
    const moduleState = isModule && item.have
      ? (!item.have.enabled ? t('moduleState.removed') : item.have.running !== item.have.enabled ? (item.have.running ? t('moduleState.oldUntilRestart', { version: item.have.running }) : t('moduleState.nextStart')) : t('moduleState.inUse'))
      : null;
    const permissions = granted(item.manifest?.permissions);
    footerText.textContent = `${item.name} ${item.offered ?? item.installed}`;
    return h('div', { class: 'as-detail' },
      backButton(tab.label),
      h('div', { class: 'as-detail-head' },
        appIcon(item.icon),
        h('div', { class: 'as-detail-title' },
          h('h1', {}, item.name),
          h('div', { class: 'as-sub' }, [item.publisher, isModule ? t('detail.kindModule') : t('detail.kindApp'), categories().find(c => c.id === item.category)?.label].filter(Boolean).join(' · ')),
          h('div', { class: 'as-meta' },
            repoLabel(item),
            item.verified ? h('span', { class: 'as-state' }, icon('shield'), t('detail.verified')) : item.repo ? h('span', { class: 'as-unofficial' }, t('detail.unverified')) : null,
            item.required ? h('span', { class: 'as-state' }, t('detail.required')) : null,
            item.elsewhere ? h('span', { class: 'as-state' }, isModule ? t('status.installedElsewhereModule') : t('status.installedElsewhereApp')) : null),
          actions.length ? h('div', { class: 'as-detail-actions' }, ...actions) : null)),
      item.repo && !item.repo.official && !item.here ? h('div', { class: 'as-banner' }, icon('info'), h('span', {}, t('detail.unofficialWarning'))) : null,
      h('div', { class: 'as-facts' },
        fact(t('detail.version'), item.offered ?? item.installed),
        fact(installedWord(item), item.installed ?? '—'),
        fact(t('detail.repository'), item.repo ? repoName(item.repo) : '—'),
        isModule ? fact(t('detail.provides'), item.provides.join(', ') || '—') : fact(t('detail.id'), item.id),
        moduleState ? fact(t('detail.state'), moduleState) : null),
      isModule
        ? h('div', { class: 'as-perm' }, h('h3', {}, icon('info'), t('detail.warning')), h('p', {}, t('detail.moduleWarning')))
        : h('div', { class: 'as-perm' }, h('h3', {}, icon('shield'), t('detail.mayDo')),
          permissions.length ? h('ul', {}, ...permissions.map(p => h('li', {}, icon('check'), describePermission(p)))) : h('p', { class: 'as-muted' }, t('permissions.none'))),
      h('div', { class: 'as-readme-title' }, icon('file'), 'README.md'),
      item.readme ? h('article', { class: 'as-readme' }, ...renderMarkdown(item.readme)) : null,
      item.readme && item.readmeTruncated ? h('p', { class: 'as-readme-cut' }, t('readme.truncated'), ' ',
        h('button', { class: 'as-link', onclick: e => downloadReadme(item, e.currentTarget) }, icon('download'), t('readme.download'))) : null,
      item.readme ? null
        : h('p', { class: 'as-muted' }, item.repo ? t('readme.none') : t('readme.notFromRepo')));
  }

  /** "Check for updates at startup": the AppStore's service, started when the user comes in. */
  function updatesRow() {
    const svc = state.updates;
    const locked = !svc || (svc.system && !svc.canControl);
    const text = !svc ? t('updates.needsEngine')
      : svc.system ? t('updates.bySystem')
        : t('updates.description');
    const control = toggle({ value: !!svc && svc.startup !== 'none', label: t('updates.atStart'), onChange: setUpdatesAtStart });
    control.disabled = locked;
    return h('div', { class: 'as-row' }, h('div', { class: 'as-row-text' }, h('b', {}, t('updates.atStart')), h('span', {}, text)), control);
  }

  function optionsView(tab) {
    const draft = state.newRepo;
    footerText.textContent = t('options.title');
    const repoRow = repo => {
      const catalog = state.catalogs.get(repo.id);
      const valid = list => (list ?? []).filter(e => !e.error).length;
      const invalid = [...catalog?.apps ?? [], ...catalog?.modules ?? []].filter(e => e.error);
      const what = state.errors.has(repo.id) ? t('options.unreachable', { error: state.errors.get(repo.id) })
        : catalog ? [t('options.apps', { n: valid(catalog.apps) }), t('options.modules', { n: valid(catalog.modules) }),
          invalid.length ? t('options.invalid', { n: invalid.length }) : null].filter(Boolean).join(' · ')
          : t('options.reading');
      return h('div', { class: 'as-row' },
        appIcon(repo.official ? { glyph: 'shield', color: '#30a46c' } : { glyph: 'link', color: '#8a909b' }),
        h('div', { class: 'as-row-text' },
          h('b', {}, repoName(repo), h('span', { class: 'as-muted' }, ` · ${repo.name}`)),
          h('span', {}, repo.url),
          h('span', { class: state.errors.has(repo.id) ? 'as-error' : null, title: invalid.map(e => `${e.path}: ${e.error}`).join('\n') || null }, what)),
        repo.official ? h('span', { class: 'as-muted' }, t('options.alwaysThere')) : isAdmin ? button(t('action.remove'), () => act('repo', () => repositories.remove(repo.id), t('done.repoRemoved', { name: repoName(repo) })), { danger: true, key: repo.id }) : null);
    };
    return h('div', { class: 'as-options' },
      backButton(tab.label),
      h('h2', {}, t('options.title')),
      h('p', { class: 'as-lead' }, t('options.lead')),
      section('AppStore'),
      h('div', { class: 'as-group' },
        h('div', { class: 'as-row' },
          h('div', { class: 'as-row-text' }, h('b', {}, t('options.showUnofficial')), h('span', {}, t('options.showUnofficialHint'))),
          toggle({ value: settings.get('appstore.showUnofficial'), label: t('options.showUnofficial'), onChange: v => settings.set('appstore.showUnofficial', v) })),
        updatesRow()),
      section(t('options.repositories'), h('span', { class: 'as-bulk' }, button(t('action.reload'), () => load()))),
      h('div', { class: 'as-group' }, ...state.repos.map(repoRow)),
      section(t('options.addRepo')),
      isAdmin
        ? h('div', { class: 'as-group' },
          h('div', { class: 'as-row' }, h('div', { class: 'as-row-text' }, h('b', {}, t('options.address')), h('span', {}, t('options.addressHint'))),
            textField({ value: draft.url, placeholder: 'https://…', label: t('options.addressLabel'), onInput: v => { draft.url = v; } })),
          h('div', { class: 'as-row' }, h('div', { class: 'as-row-text' }, h('b', {}, t('options.name')), h('span', {}, t('options.nameHint'))),
            textField({ value: draft.name, placeholder: t('options.name'), label: t('options.nameLabel'), onInput: v => { draft.name = v; } })),
          h('div', { class: 'as-row as-row-end' }, button(t('action.add'), () => act('repo', async () => {
            const repo = await repositories.add(draft.url.trim(), draft.name.trim() || undefined);
            state.newRepo = { url: '', name: '' };
            return repo;
          }, r => t('done.repoAdded', { name: repoName(r) })), { primary: true })))
        : h('p', { class: 'as-muted' }, t('options.adminOnly')));
  }

  // ---------- Window ----------

  const search = h('input', { type: 'search', autocomplete: 'off', spellcheck: 'false', 'aria-label': t('search.label') });
  const tabBar = h('div', { class: 'as-tabs', role: 'tablist' });
  const main = h('main', { class: 'as-main' });
  const footerText = h('span', { class: 'as-foot-text' });
  win.body.append(
    h('div', { class: 'as-head' }, h('label', { class: 'as-search' }, icon('search'), search), tabBar),
    main,
    h('footer', { class: 'as-foot' }, footerText, h('span', { class: 'as-spacer' }),
      h('button', { class: 'as-link', onclick: () => show('options') }, icon('gear'), t('options.title'))));

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
    if (!list.some(tb => tb.id === state.tab)) state.tab = 'installed';
    const tab = list.find(tb => tb.id === state.tab);
    const updates = items.filter(i => i.update).length;
    tabBar.replaceChildren(...list.flatMap((tb, n) => [
      tb.category && !list[n - 1].category ? h('span', { class: 'as-tab-sep' }) : null,
      h('button', { class: 'as-tab', role: 'tab', 'aria-selected': String(state.view === 'list' && tb.id === state.tab), tabindex: tb.id === state.tab ? '0' : '-1', onclick: () => selectTab(tb.id) },
        tb.label, tb.badge && updates ? h('span', { class: 'as-count' }, String(updates)) : null),
    ].filter(Boolean)));
    search.placeholder = t('search.placeholder', { tab: tab.label });
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
  const offServices = system.services?.on('change', e => { if (e.app === 'appstore') loadUpdatesService().then(render); });
  win.on('destroy', () => { offApps(); offSetting(); offServices?.(); });
  render();
  load();
  return win;
}
