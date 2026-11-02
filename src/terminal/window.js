import * as sdk from '@lilos/sdk';   // `term` and `net`: missing in older lilOS, so not imported by name
import { RemoteTab, badge } from './remote/RemoteTab.js';
import { hostDialog } from './remote/dialogs.js';
import { i18n, t } from './i18n.js';

const { h, icon, fs, storage } = sdk;
const SIDE_KEY = 'terminal.side';
const HERE = 'terminal.sshHere';

/**
 * Terminal's window: its tabs (shells and remote sessions) and the side panel of the saved hosts
 * and of the remote sessions still running in the kernel. The shells' commands reach it as
 * host.remote (commands/remote.js): open(spec), resume(session), data().
 *
 *   new TerminalWindow(win, args, makeShell)   makeShell(owner, args) → a shell tab (TerminalApp.js)
 *   tab interface: el, name, subtitle, title?, closed, activity, remote, show(), hide(), focus(), dispose()
 */
export class TerminalWindow {
  tabs = [];
  current = null;
  data = { protocols: [], encodings: [], hosts: [], sessions: [] };
  #makeShell;
  #offs = [];
  #loading = null;

  constructor(win, args, makeShell) {
    this.win = win;
    this.#makeShell = makeShell;
    this.remote = {
      data: () => this.load(),
      open: spec => this.openRemote(spec),
      resume: session => this.resume(session),
    };
    this.side = h('aside', { class: 'tm-side', 'aria-label': t('remote.side.label') });
    this.bar = h('div', { class: 'tm-tabs', role: 'tablist', 'aria-label': t('remote.tabs') });
    this.panes = h('div', { class: 'tm-panes' });
    win.body.classList.add('tm');
    win.body.append(h('div', { class: 'tm-layout' }, this.side, h('div', { class: 'tm-main' }, this.bar, this.panes)));
    this.side.hidden = storage.get(SIDE_KEY, false) !== true;

    const term = sdk.term;
    if (term) {
      this.#offs.push(term.on('hosts', () => this.load()), term.on('sessions', () => this.load()));
      this.load();
    }
    win.on('destroy', () => {
      this.#offs.forEach(off => off?.());
      for (const tab of this.tabs) tab.dispose();   // the remote sessions stay in the kernel (10 minutes)
    });

    this.add(this.#makeShell(this, args));
    if (args?.action) this.launched(args);
  }

  firstLocal() { return this.tabs.find(tab => !tab.remote) ?? null; }

  error(err) {
    sdk.notifications?.send?.({ text: `${t('ui.title')}: ${err?.message ?? err}`, level: 'error' });
  }

  /** Opened again: a folder (go there), or the menu of a folder of an SFTP connection. */
  launched(args) {
    if (args?.action === HERE && Array.isArray(args.files) && args.files[0]) return this.openHere(args.files[0]);
    if (args?.cwd && fs.get(args.cwd)?.type === 'folder') {
      const shell = this.current && !this.current.remote ? this.current : this.firstLocal() ?? this.add(this.#makeShell(this, {}));
      this.select(shell);
      shell.changeDir(args.cwd);
    }
  }

  // ---------- Data ----------

  async load() {
    if (!sdk.term) return this.data;
    this.#loading ??= sdk.term.load().then(data => { this.data = data; }, err => { this.data = { ...this.data, error: err.message }; })
      .finally(() => { this.#loading = null; this.drawSide(); this.drawTabs(); });
    await this.#loading;
    return this.data;
  }

  // ---------- Tabs ----------

  add(tab) {
    this.tabs.push(tab);
    this.panes.append(tab.el);
    this.select(tab);
    return tab;
  }

  select(tab) {
    this.current = tab;
    for (const x of this.tabs) if (x !== tab) x.hide();
    tab.show();
    tab.activity = false;
    this.win.setTitle(t('ui.title'), tab.subtitle);
    this.drawTabs();
  }

  tabChanged(tab) {
    if (tab === this.current) this.win.setTitle(t('ui.title'), tab.subtitle);
    this.drawTabs();
  }

  closeTab(tab) {
    const i = this.tabs.indexOf(tab);
    if (i < 0) return;
    if (tab.remote && !tab.closed) this.closeSession(tab);
    this.tabs.splice(i, 1);
    tab.dispose();
    tab.el.remove();
    if (!this.tabs.length) return this.win.emit('close');
    if (this.current === tab) this.select(this.tabs[Math.min(i, this.tabs.length - 1)]);
    else this.drawTabs();
  }

  drawTabs() {
    const tabEl = (tab, i) => h('div', {
      class: `tm-tab${tab.closed ? ' lost' : ''}${tab.remote ? ' remote' : ''}`, role: 'tab', tabindex: '0',
      'aria-selected': this.current === tab ? 'true' : 'false', title: [tab.name, tab.title].filter(Boolean).join(' — '),
      onclick: () => this.select(tab),
      onauxclick: e => { if (e.button === 1) this.closeTab(tab); },
      onkeydown: e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.select(tab); }
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') this.bar.querySelectorAll('[role=tab]')[i + (e.key === 'ArrowRight' ? 1 : -1)]?.focus();
      },
    },
    tab.remote ? badge(tab.session.protocol) : icon('terminal'),
    h('span', { class: 'tm-tab-name' }, tab.name),
    tab.activity && h('span', { class: 'tm-act', title: t('remote.activity') }),
    h('button', { type: 'button', class: 'tm-iconbtn', title: t(tab.remote ? 'remote.closeSession' : 'remote.closeTab'), 'aria-label': t('remote.closeNamed', { name: tab.name }), onclick: e => { e.stopPropagation(); this.closeTab(tab); } }, icon('x')));
    this.bar.replaceChildren(
      h('button', { type: 'button', class: 'tm-iconbtn', title: t('remote.side.toggle'), 'aria-label': t('remote.side.toggle'), 'aria-pressed': this.side.hidden ? 'false' : 'true', onclick: () => this.toggleSide() }, icon('sidebar')),
      ...this.tabs.map(tabEl),
      h('button', { type: 'button', class: 'tm-iconbtn', title: t('remote.newShell'), 'aria-label': t('remote.newShell'), onclick: () => this.add(this.#makeShell(this, { cwd: this.firstLocal()?.shell.cwd })) }, icon('plus')));
  }

  toggleSide() {
    this.side.hidden = !this.side.hidden;
    storage.set(SIDE_KEY, !this.side.hidden);
    if (!this.side.hidden) this.load();
    this.drawTabs();
  }

  // ---------- Remote sessions ----------

  /** A new tab with a remote session: spec { host } | { protocol, values } (see the SDK's term.open). */
  async openRemote(spec) {
    const session = await sdk.term.open(spec);
    await this.#addRemote(session, spec);
    return session;
  }

  async #addRemote(session, spec) {
    const tab = this.add(new RemoteTab(this, session, spec));
    try {
      await tab.attach();
    } catch (err) {
      this.error(err);
    }
    return tab;
  }

  /** SSH where a folder of an SFTP connection is (the action of the File Manager's menu). */
  async openHere(id) {
    try {
      const node = fs.get(id);
      const folder = node?.type === 'folder' ? node.id : node?.parent;
      if (!folder || !fs.isRemote?.(folder)) throw new Error(t('remote.notRemote'));
      const ref = fs.netRef(folder);
      if (sdk.net?.mount(ref.mount)?.protocol !== 'sftp') throw new Error(t('remote.notSftp'));
      await this.#addRemote(await sdk.term.open({ mount: ref.mount, path: ref.path }), null);
    } catch (err) {
      this.error(err);
    }
  }

  /** A session running in the kernel: its tab, or a new tab attached to it. */
  async resume(session) {
    const there = this.tabs.find(x => x.remote && x.session.id === session.id);
    if (there) {
      this.select(there);
      return there.attach();
    }
    return this.#addRemote(session, session.host ? { host: session.host } : null);
  }

  async reconnect(tab) {
    if (!tab.spec) return this.error(t('remote.cannotReconnect'));
    try {
      await tab.replace(await sdk.term.open(tab.spec));
      this.drawTabs();
    } catch (err) {
      this.error(err);
    }
  }

  async closeSession(tab) {
    try { await sdk.term.close(tab.session.id); } catch { /* gone already */ }
  }

  async editHost(host = null, prefill = null) {
    await this.load();
    const result = await hostDialog(this, host, prefill);
    await this.load();
    if (result?.action === 'connect') this.openRemote({ host: result.host.id }).catch(err => this.error(err));
  }

  // ---------- Dialogs ----------

  showDialog(node, onCancel) {
    const back = h('div', { class: 'tm-backdrop' }, node);
    const close = () => back.remove();
    back.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Escape') { e.preventDefault(); close(); onCancel?.(); }
    });
    this.win.body.append(back);
    return { close };
  }

  // ---------- Side panel ----------

  drawSide() {
    if (this.side.hidden && this.side.childElementCount) return;
    const { hosts, sessions, protocols } = this.data;
    if (!sdk.term?.available || !protocols.length) {
      return this.side.replaceChildren(h('h2', {}, h('span', {}, t('remote.side.hosts'))), h('p', { class: 'tm-empty' }, this.data.error ? t('remote.unavailable', { error: this.data.error }) : t('remote.noProtocols')));
    }
    const live = new Set(sessions.filter(s => s.state !== 'closed').map(s => s.host).filter(Boolean));
    const groups = new Map();
    for (const host of [...hosts].sort((a, b) => a.name.localeCompare(b.name))) {
      if (!groups.has(host.folder)) groups.set(host.folder, []);
      groups.get(host.folder).push(host);
    }
    const open = host => this.openRemote({ host: host.id }).catch(err => this.error(err));
    const place = host => h('button', {
      type: 'button', class: 'tm-place', title: host.address, onclick: () => open(host),
      oncontextmenu: e => {
        e.preventDefault();
        sdk.openMenu(e.clientX, e.clientY, [
          { label: t('remote.side.connect'), action: () => open(host) },
          { label: t('remote.host.editTitle'), action: () => this.editHost(host) },
        ]);
      },
    }, h('span', { class: `tm-dot${live.has(host.id) ? ' on' : ''}`, title: live.has(host.id) ? t('remote.side.open') : '' }), h('span', { class: 'tm-place-name' }, host.name), badge(host.protocol));
    const mine = new Set(this.tabs.filter(x => x.remote).map(x => x.session.id));
    const running = sessions.filter(s => s.state !== 'closed' && !mine.has(s.id));
    this.side.replaceChildren(
      h('h2', {}, h('span', {}, t('remote.side.hosts')), h('button', { type: 'button', class: 'tm-iconbtn', title: t('remote.host.newTitle'), 'aria-label': t('remote.host.newTitle'), onclick: () => this.editHost() }, icon('plus'))),
      ...(groups.get('') ?? []).map(place),
      ...[...groups].filter(([f]) => f).sort(([a], [b]) => a.localeCompare(b)).flatMap(([f, list]) => [h('h3', {}, f), ...list.map(place)]),
      ...(hosts.length ? [] : [h('p', { class: 'tm-empty' }, t('remote.side.none'))]),
      ...(running.length ? [
        h('h2', {}, h('span', {}, t('remote.side.running'))),
        ...running.map(s => h('div', { class: 'tm-live' },
          h('div', { class: 'tm-live-name', title: s.address }, badge(s.protocol), h('span', {}, s.name)),
          h('div', { class: 'tm-live-when' }, [s.title, s.attached ? t('remote.side.elsewhere') : s.closesAt ? t('remote.side.closesIn', { n: Math.max(1, Math.round((s.closesAt - Date.now()) / 60000)) }) : '', i18n.date(s.created, { timeStyle: 'short' })].filter(Boolean).join(' · ')),
          h('button', { type: 'button', class: 'tm-btn primary', onclick: () => this.resume(s).catch(err => this.error(err)) }, t('remote.side.resume')))),
      ] : []),
    );
  }
}
