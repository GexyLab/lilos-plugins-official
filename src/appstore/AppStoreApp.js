import { SettingsWindow, Window, h, apps, repositories, kernelModules, kernel, toast, actionButton, textField } from '@lilos/sdk';
import './appstore.css';

/**
 * AppStore: the apps and kernel modules offered by the repositories (the official one and those
 * an admin added), to install, update and remove; and the repositories themselves. Everything
 * is done by the kernel: this only shows and asks. Non-admins can look, not change.
 */
const PERMISSION_LABELS = {
  'fs.read': 'Leggere i file in', 'fs.write': 'Leggere e modificare i file in', 'fs.workspaces': 'Vedere i file privati di tutti i workspace',
  'tags.read': 'Vedere i tag', 'tags.write': 'Creare e assegnare tag', 'desktop.items': 'Mettere elementi sulla scrivania',
  'desktop.widget': 'Mostrare widget sulla scrivania', 'ui.menus': 'Aggiungere voci ai menu', 'ui.commands': 'Aggiungere comandi',
  'ui.shortcuts': 'Aggiungere scorciatoie da tastiera', 'clipboard.read': 'Leggere gli appunti', net: 'Collegarsi a',
  'media.camera': 'Usare la fotocamera', 'media.microphone': 'Usare il microfono', geo: 'Conoscere la posizione',
  'apps.call': 'Usare le azioni dell’app', 'ai.use': 'Usare l’intelligenza artificiale',
  'ai.expose': 'Rendere le proprie azioni disponibili all’assistente', background: 'Lavorare anche quando lilOS è chiuso',
  'apps.manage': 'Installare e rimuovere app', 'workspaces.manage': 'Gestire i workspace', 'settings.system': 'Cambiare le impostazioni di sistema',
};
const IMPLICIT = new Set(['fs.app', 'fs.tmp', 'fs.open', 'ui.notify', 'clipboard.write', 'auth.remote']);

function describePermission(p) {
  const i = p.indexOf(':');
  const name = i < 0 ? p : p.slice(0, i);
  const param = i < 0 ? '' : p.slice(i + 1);
  return `${PERMISSION_LABELS[name] ?? name}${param ? ` ${param.replace(/^~/, 'Home')}` : ''}`;
}

const newer = (a, b) => {
  const pa = a.split('.').map(Number), pb = b.split('.').map(Number);
  return (pa[0] - pb[0] || pa[1] - pb[1] || pa[2] - pb[2]) > 0;
};
const sameRepo = (source, repo) => source?.url && source.url.replace(/\.git$/i, '').replace(/\/+$/, '').toLowerCase() === repo.url.replace(/\.git$/i, '').replace(/\/+$/, '').toLowerCase();

export default function AppStore({ openWindow }) {
  const isAdmin = kernel.user?.role === 'admin';
  const state = { repos: [], catalogs: new Map(), errors: new Map(), modules: [], loading: true, busy: null, newRepo: { url: '', name: '' } };
  let win;

  const rerender = () => win.view.render();

  /** Runs one change at a time; buttons are off meanwhile. */
  async function act(label, fn, done) {
    if (state.busy) return;
    state.busy = label;
    rerender();
    try {
      const result = await fn();
      if (done) toast(typeof done === 'function' ? done(result) : done, { timeout: 5000 });
      await load({ quiet: true });
    } catch (err) {
      toast(err.message, { timeout: 7000 });
    } finally {
      state.busy = null;
      rerender();
    }
  }

  async function load({ quiet = false } = {}) {
    if (!quiet) { state.loading = true; rerender(); }
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
    rerender();
  }

  /** Asks before installing: what the package may do and, when it is not official, the warning. */
  function confirmInstall({ title, name, permissions = [], official, kernelModule = false }) {
    return new Promise(resolve => {
      const granted = permissions.filter(p => !IMPLICIT.has(p.split(':')[0]));
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
        !kernelModule && granted.length ? h('ul', {}, ...granted.map(p => h('li', {}, describePermission(p)))) : null,
        !kernelModule && !granted.length ? h('p', {}, 'Nessun permesso oltre ai propri dati.') : null,
        official ? null : h('p', { class: 'as-warning' }, 'Non verificata: viene da un repository non ufficiale. Non si può sapere chi l’ha scritta, né che il codice non sia stato modificato. Installala solo se ti fidi di chi la distribuisce.'),
        h('div', { class: 'as-dialog-buttons' },
          actionButton({ label: 'Annulla', onClick: () => answer(null) }),
          actionButton({ label: official ? 'Installa' : 'Installa comunque', primary: official, danger: !official, onClick: () => answer({ grant: granted, allowUnsigned: !official }) })),
      ));
      openWindow(dialog);
    });
  }

  const status = text => h('span', { class: 'as-status' }, text);
  const buttons = (...list) => h('div', { class: 'as-actions' }, ...list.filter(Boolean));
  const button = (label, onClick, opts = {}) => actionButton({ label, onClick, ...opts });
  const disabled = el => { el.disabled = !!state.busy; return el; };

  // ---------- Apps ----------

  function availableApps() {
    if (state.loading) return [{ rows: [{ label: 'Lettura dei repository…' }] }];
    const installed = apps.list();
    return state.repos.map(repo => {
      const catalog = state.catalogs.get(repo.id);
      const error = state.errors.get(repo.id);
      const rows = error ? [{ label: 'Repository non raggiungibile', description: error }] : (catalog?.apps ?? []).map(entry => {
        if (entry.error) return { label: entry.path, description: `Pacchetto non valido: ${entry.error}` };
        const m = entry.manifest;
        const have = installed.find(a => a.id === m.id);
        const fromHere = have && sameRepo(have.source, repo);
        let control;
        if (!have) {
          control = isAdmin ? disabled(button('Installa', () => install(repo, catalog, entry), { primary: true })) : status('Disponibile');
        } else if (fromHere && newer(m.version, have.version)) {
          control = isAdmin ? disabled(button(`Aggiorna a ${m.version}`, () => update(have, repo), { primary: true })) : status(`Aggiornamento ${m.version}`);
        } else {
          control = status(fromHere ? 'Installata' : 'Installata da un altro repository');
        }
        return {
          label: `${m.name} ${m.version}`,
          description: [m.description, m.publisher?.name, m.system ? 'App di sistema' : m.kind === 'remote' ? 'App remota' : null].filter(Boolean).join(' · '),
          keywords: `${m.id} ${m.name}`,
          control: () => control,
        };
      });
      return { title: `${repo.name}${repo.official ? '' : ' (non ufficiale)'}`, rows: rows.length ? rows : [{ label: 'Nessuna app' }] };
    });
  }

  async function install(repo, catalog, entry) {
    const m = entry.manifest;
    const answer = await confirmInstall({ title: `Installa ${m.name}`, name: m.name, permissions: m.permissions, official: repo.official });
    if (!answer) return;
    act('install', () => apps.install({ type: 'git', url: repo.url, path: entry.path, ref: catalog.ref }, answer), `${m.name} installata`);
  }

  async function update(app, repo) {
    const latest = state.catalogs.get(repo?.id)?.apps.find(e => e.manifest?.id === app.id)?.manifest;
    const added = (latest?.permissions ?? []).filter(p => !IMPLICIT.has(p.split(':')[0]) && !app.granted.includes(p));
    let answer = { grant: [], allowUnsigned: !repo?.official };
    if (added.length || !repo?.official) {
      answer = await confirmInstall({ title: `Aggiorna ${app.manifest.name}`, name: app.manifest.name, permissions: added, official: !!repo?.official });
      if (!answer) return;
    }
    act('update', () => apps.update(app.id, answer), r => (r.unchanged ? `${app.manifest.name} è già aggiornata` : `${app.manifest.name} aggiornata alla ${r.version}`));
  }

  function installedApps() {
    const list = apps.list();
    return [{
      title: 'Installate',
      rows: list.length ? list.map(app => {
        const repo = state.repos.find(r => sameRepo(app.source, r));
        const latest = state.catalogs.get(repo?.id)?.apps.find(e => e.manifest?.id === app.id)?.manifest;
        const upgrade = latest && newer(latest.version, app.version);
        return {
          label: `${app.manifest.name} ${app.version}`,
          description: [
            repo ? repo.name : app.source?.type === 'local' ? 'Cartella locale' : 'Origine sconosciuta',
            app.signed || (app.system && repo?.official) ? 'Verificata' : 'Non verificata',
            app.required ? 'Necessaria a lilOS' : null,
            upgrade ? `Disponibile la ${latest.version}` : null,
          ].filter(Boolean).join(' · '),
          keywords: `${app.id} ${app.manifest.name}`,
          control: () => (isAdmin ? buttons(
            disabled(button(upgrade ? `Aggiorna a ${latest.version}` : 'Cerca aggiornamenti', () => update(app, repo), { primary: !!upgrade })),
            disabled(button('Reinstalla', () => act('reinstall', () => apps.update(app.id, { reinstall: true, allowUnsigned: !(app.signed || app.system) }), `${app.manifest.name} reinstallata`))),
            app.required ? null : disabled(button('Rimuovi', () => act('remove', () => apps.uninstall(app.id), `${app.manifest.name} rimossa`), { danger: true })),
          ) : status(app.version)),
        };
      }) : [{ label: 'Nessuna app installata' }],
    }];
  }

  // ---------- Kernel modules ----------

  const restartNeeded = () => state.modules.some(m => (m.enabled ?? null) !== (m.running ?? null));

  function restartSection() {
    if (!isAdmin || !restartNeeded()) return [];
    return [{
      title: 'Riavvio necessario',
      rows: [{
        label: 'Le modifiche ai moduli valgono dal prossimo avvio del kernel',
        control: () => disabled(button('Riavvia il kernel', () => act('restart', async () => {
          await kernelModules.restart();
          await new Promise(r => setTimeout(r, 2500));
        }, 'Kernel riavviato'), { primary: true })),
      }],
    }];
  }

  function availableModules() {
    if (!isAdmin) return [{ rows: [{ label: 'Solo un amministratore vede e gestisce i moduli del kernel' }] }];
    if (state.loading) return [{ rows: [{ label: 'Lettura dei repository…' }] }];
    return [...restartSection(), ...state.repos.map(repo => {
      const catalog = state.catalogs.get(repo.id);
      const rows = (catalog?.modules ?? []).map(entry => {
        if (entry.error) return { label: entry.path, description: `Pacchetto non valido: ${entry.error}` };
        const m = entry.module;
        const have = state.modules.find(x => x.name === m.name && x.enabled);
        const control = !have
          ? disabled(button('Installa', () => installModule(repo, catalog, entry), { primary: true }))
          : sameRepo(have.source, repo) && newer(m.version, have.enabled)
            ? disabled(button(`Aggiorna a ${m.version}`, () => updateModule(have, repo), { primary: true }))
            : status('Installato');
        return { label: `${m.name} ${m.version}`, description: [m.description, m.provides?.length ? `Fornisce: ${m.provides.join(', ')}` : null].filter(Boolean).join(' · '), control: () => control };
      });
      return { title: `${repo.name}${repo.official ? '' : ' (non ufficiale)'}`, rows: state.errors.has(repo.id) ? [{ label: 'Repository non raggiungibile', description: state.errors.get(repo.id) }] : rows.length ? rows : [{ label: 'Nessun modulo' }] };
    })];
  }

  async function installModule(repo, catalog, entry) {
    const answer = await confirmInstall({ title: `Installa ${entry.module.name}`, name: entry.module.name, official: repo.official, kernelModule: true });
    if (!answer) return;
    act('install', () => kernelModules.install({ type: 'git', url: repo.url, path: entry.path, ref: catalog.ref }, { allowUnsigned: answer.allowUnsigned }), `${entry.module.name} installato: riavvia il kernel per usarlo`);
  }

  async function updateModule(mod, repo) {
    const official = !!repo?.official;
    if (!official && !await confirmInstall({ title: `Aggiorna ${mod.name}`, name: mod.name, official, kernelModule: true })) return;
    act('update', () => kernelModules.update(mod.name, { allowUnsigned: !official }), r => (r.unchanged ? `${mod.name} è già aggiornato` : `${mod.name} ${r.version} installato: riavvia il kernel`));
  }

  function installedModules() {
    if (!isAdmin) return [{ rows: [{ label: 'Solo un amministratore vede e gestisce i moduli del kernel' }] }];
    return [...restartSection(), {
      title: 'Installati',
      rows: state.modules.length ? state.modules.map(m => {
        const repo = state.repos.find(r => sameRepo(m.source, r));
        return {
          label: `${m.name} ${m.enabled ?? m.version}`,
          description: [
            m.description,
            m.provides.length ? `Fornisce: ${m.provides.join(', ')}` : null,
            !m.enabled ? 'Spento (restano i suoi dati)' : m.running !== m.enabled ? (m.running ? `In uso la ${m.running} fino al riavvio` : 'Attivo dal prossimo avvio') : 'In uso',
            repo ? repo.name : 'Installato a mano',
          ].filter(Boolean).join(' · '),
          control: () => (m.enabled ? buttons(
            m.source ? disabled(button('Cerca aggiornamenti', () => updateModule(m, repo))) : null,
            disabled(button('Rimuovi', () => act('remove', () => kernelModules.remove(m.name), r => `${m.name} rimosso${r.kept.length ? ' (i suoi dati restano)' : ''}: riavvia il kernel`), { danger: true })),
          ) : status('Spento')),
        };
      }) : [{ label: 'Nessun modulo' }],
    }];
  }

  // ---------- Repositories ----------

  function repositorySections() {
    const draft = state.newRepo;
    return [
      {
        title: 'Repository',
        rows: state.repos.map(repo => ({
          label: repo.name,
          description: `${repo.url}${repo.official ? ' · Ufficiale' : ''}${state.errors.has(repo.id) ? ` · Non raggiungibile: ${state.errors.get(repo.id)}` : ''}`,
          control: () => (repo.official || !isAdmin ? status(repo.official ? 'Sempre presente' : '') : disabled(button('Rimuovi', () => act('repo', () => repositories.remove(repo.id), `${repo.name} rimosso`), { danger: true }))),
        })),
      },
      isAdmin ? {
        title: 'Aggiungi un repository',
        rows: [
          { label: 'Indirizzo', description: 'Un repository git con catalog.json, per esempio https://github.com/nome/repo', control: () => textField({ value: draft.url, placeholder: 'https://…', label: 'Indirizzo del repository', onInput: v => { draft.url = v; } }) },
          { label: 'Nome', description: 'Facoltativo: altrimenti quello del suo catalogo', control: () => textField({ value: draft.name, placeholder: 'Nome', label: 'Nome del repository', onInput: v => { draft.name = v; } }) },
          { label: '', control: () => disabled(button('Aggiungi', () => act('repo', async () => {
            const repo = await repositories.add(draft.url.trim(), draft.name.trim() || undefined);
            state.newRepo = { url: '', name: '' };
            return repo;
          }, r => `${r.name} aggiunto`), { primary: true })) },
        ],
      } : { rows: [{ label: 'Solo un amministratore aggiunge e rimuove repository' }] },
    ];
  }

  win = new SettingsWindow({
    title: 'AppStore', icon: 'download', width: 860, height: 600,
    tabs: [
      { group: 'Catalogo' },
      { id: 'apps', label: 'App', icon: 'window', description: 'App dei repository: si installano per tutti gli utenti e tutti i workspace.', subtabs: [{ id: 'available', label: 'Disponibili', sections: availableApps }, { id: 'installed', label: 'Installate', sections: installedApps }] },
      { id: 'modules', label: 'Moduli del kernel', icon: 'monitor', description: 'Parti del kernel: utenti, file system, collegamenti ad altri servizi. Valgono dopo il riavvio del kernel.', subtabs: [{ id: 'available', label: 'Disponibili', sections: availableModules }, { id: 'installed', label: 'Installati', sections: installedModules }] },
      { group: '' },
      { id: 'repos', label: 'Repository', icon: 'link', description: 'Da dove arrivano app e moduli. Quello ufficiale c’è sempre.', sections: repositorySections },
    ],
  });
  win.el.classList.add('appstore');
  win.on('launch', args => { if (args?.tab) win.view.select(args.tab); });
  const offApps = apps.on('change', () => rerender());
  win.on('destroy', offApps);
  load();
  return win;
}
