import xtermCss from '@xterm/xterm/css/xterm.css?inline';
import { h, icon, badge, STYLE } from './ui.js';
import { parseQuick, words } from './quick.js';
import { Tab } from './tab.js';
import { hostDialog, aboutDialog } from './dialogs.js';

/**
 * Remote Terminal: SSH, Telnet, rlogin and SUPDUP sessions, each protocol a module of lilOS's
 * kernel; the sessions run in the kernel (see lilOS's SDK term.js). An installable app (sdk 2).
 * Its entry points are the exports here (see the manifest, app.json):
 *   main   the window: tabs of sessions, the saved hosts, a quick connection. Its args:
 *          { host: name } a saved host · { connect: { protocol, values } } (the Terminal's commands) ·
 *          { files, action } the action of the menu of a folder of an SFTP connection
 *   cli    the Terminal's commands ssh, telnet, rlogin, supdup: they open a tab in the window
 */

// ---------- Main: the window ----------

export async function main({ lilos, root, args }) {
  const t = (k, p) => lilos.locale.i18n.t(k, p);
  root.append(h('style', {}, xtermCss), h('style', {}, STYLE));
  const tabs = [];
  let current = null;         // the tab shown; null: the home
  let popup = null;
  const app = {
    lilos, t, tabs,
    data: { protocols: [], encodings: [], hosts: [], sessions: [] },
    text(label) {
      if (typeof label === 'string') return label;
      if (!label || typeof label !== 'object') return '';
      const code = lilos.locale.code, lang = code.split('-')[0];
      return label[code] ?? label[lang] ?? label.en ?? Object.values(label)[0] ?? '';
    },
    error(err) { lilos.ui.notify({ text: String(err?.message ?? err), level: 'error' }); },
    tabChanged: () => drawTabs(),
    reconnect, closeTab, closeSession,
    showDialog(node, onCancel) {
      const back = h('div', { class: 'backdrop' }, node);
      const close = () => back.remove();
      back.addEventListener('keydown', e => {
        e.stopPropagation();
        if (e.key === 'Escape') { e.preventDefault(); close(); onCancel?.(); }
      });
      box.append(back);
      return { close, focus: () => node.querySelector('button, input, select')?.focus() };
    },
    popup(menu, anchor, onClose) {
      app.closePopup();
      const r = anchor.getBoundingClientRect(), b = box.getBoundingClientRect();
      menu.style.visibility = 'hidden';
      box.append(menu);
      const left = Math.max(4, Math.min(r.right - b.left - menu.offsetWidth, b.width - menu.offsetWidth - 4));
      const top = r.top - b.top - menu.offsetHeight - 4 >= 0 ? r.top - b.top - menu.offsetHeight - 4 : r.bottom - b.top + 4;
      Object.assign(menu.style, { left: `${left}px`, top: `${top}px`, visibility: '' });
      const away = e => { if (!menu.contains(e.target)) app.closePopup(); };
      const keys = e => { if (e.key === 'Escape') { e.stopPropagation(); app.closePopup(); } };
      setTimeout(() => box.addEventListener('pointerdown', away), 0);
      menu.addEventListener('keydown', keys);
      popup = { menu, off: () => { box.removeEventListener('pointerdown', away); onClose?.(); } };
    },
    closePopup() {
      if (!popup) return;
      const p = popup;
      popup = null;
      p.menu.remove();
      p.off();
    },
  };

  const side = h('aside', { class: 'side', 'aria-label': t('side.label') });
  const tabBar = h('div', { class: 'tabs', role: 'tablist' });
  const homePane = h('div', { class: 'pane' });
  const main = h('div', { class: 'main' }, tabBar, homePane);
  const box = h('div', { class: 'rt' }, side, main);
  root.append(box);
  // The keys of the window stay in the window (the app may run in lilOS's page)
  box.addEventListener('keydown', e => { if (!e.ctrlKey || e.key !== 'Tab') e.stopPropagation(); });

  let sideOpen = true;
  try { sideOpen = (await lilos.storage.get('side')) !== false; } catch { /* default */ }
  side.hidden = !sideOpen;

  // ---------- Data ----------

  const load = async () => {
    try {
      app.data = await lilos.term.load();
    } catch (err) {
      app.data = { protocols: [], encodings: [], hosts: [], sessions: [], error: err.message };
    }
    drawSide();
    drawTabs();
    if (!current) drawHome();
  };

  // ---------- Tabs ----------

  const select = tab => {
    current = tab;
    homePane.hidden = !!tab;
    for (const x of tabs) if (x !== tab) x.hide();
    if (tab) tab.show(); else drawHome();
    lilos.window.setTitle(tab ? `${tab.name} — ${t('@name')}` : t('@name'));
    drawTabs();
  };

  function drawTabs() {
    const tabEl = (tab, i) => h('div', {
      class: `tab${tab.closed ? ' lost' : ''}`, role: 'tab', tabindex: '0', 'aria-selected': current === tab ? 'true' : 'false',
      title: [tab.name, tab.title].filter(Boolean).join(' — '),
      onclick: () => select(tab),
      onauxclick: e => { if (e.button === 1) closeTab(tab); },
      onkeydown: e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(tab); }
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') tabBar.querySelectorAll('[role=tab]')[i + (e.key === 'ArrowRight' ? 2 : 0)]?.focus();
      },
    }, badge(tab.session.protocol), h('span', { class: 'nm' }, tab.name), tab.activity && h('span', { class: 'act', title: t('tab.activity') }),
    h('button', { type: 'button', class: 'iconbtn', title: t('tab.close'), 'aria-label': t('tab.closeNamed', { name: tab.name }), onclick: e => { e.stopPropagation(); closeTab(tab); } }, icon('x')));
    tabBar.replaceChildren(
      h('button', { type: 'button', class: 'iconbtn', title: t('side.toggle'), 'aria-label': t('side.toggle'), 'aria-pressed': sideOpen ? 'true' : 'false', onclick: toggleSide }, icon('side')),
      h('div', { class: 'tab start', role: 'tab', tabindex: '0', 'aria-selected': current ? 'false' : 'true', onclick: () => select(null), onkeydown: e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(null); } } }, h('span', { class: 'nm' }, t('home.tab'))),
      ...tabs.map((tab, i) => tabEl(tab, i)),
      h('button', { type: 'button', class: 'iconbtn', title: t('tab.new'), 'aria-label': t('tab.new'), onclick: () => { select(null); homePane.querySelector('.quick input')?.focus(); } }, icon('plus')));
  }

  const toggleSide = () => {
    sideOpen = !sideOpen;
    side.hidden = !sideOpen;
    lilos.storage.set('side', sideOpen).catch(() => {});
    drawTabs();
  };

  /** A tab for a session (opened now or found running). */
  async function addTab(session, spec) {
    const tab = new Tab(app, session, spec);
    tabs.push(tab);
    main.append(tab.el);
    select(tab);
    try {
      await tab.attach();
    } catch (err) {
      app.error(err);
    }
    return tab;
  }

  /** Opens a session: spec { host } | { protocol, values } | file (the SFTP action). */
  async function open(spec, { here = null } = {}) {
    try {
      const session = here ? await lilos.term.openHere(here) : await lilos.term.open(spec);
      return await addTab(session, here ? null : spec);
    } catch (err) {
      app.error(err);
      return null;
    }
  }

  async function reconnect(tab) {
    if (!tab.spec) return app.error(t('tab.cannotReconnect'));
    try {
      await tab.replace(await lilos.term.open(tab.spec));
      drawTabs();
    } catch (err) {
      app.error(err);
    }
  }

  async function closeSession(tab) {
    try { await lilos.term.close(tab.session.id); } catch { /* gone already */ }
  }

  function closeTab(tab) {
    const i = tabs.indexOf(tab);
    if (i < 0) return;
    tabs.splice(i, 1);
    if (!tab.closed) closeSession(tab);
    tab.dispose();
    tab.el.remove();
    if (current === tab) select(tabs[Math.min(i, tabs.length - 1)] ?? null); else drawTabs();
  }

  /** A session running in the kernel (window closed before): a tab attached to it. */
  const resume = session => {
    const there = tabs.find(x => x.session.id === session.id);
    if (there) return there.attach().then(() => select(there), err => app.error(err));
    return addTab(session, session.host ? { host: session.host } : null);
  };

  // ---------- Side: saved hosts ----------

  const editHost = async (host = null, prefill = null) => {
    const result = await hostDialog(app, host, prefill);
    await load();
    if (result?.action === 'connect') open({ host: result.host.id });
  };

  function drawSide() {
    const live = new Set(app.data.sessions.filter(s => s.state !== 'closed').map(s => s.host).filter(Boolean));
    const groups = new Map();
    for (const host of [...app.data.hosts].sort((a, b) => a.name.localeCompare(b.name))) {
      if (!groups.has(host.folder)) groups.set(host.folder, []);
      groups.get(host.folder).push(host);
    }
    const place = host => h('button', {
      type: 'button', class: 'place', title: host.address, onclick: () => open({ host: host.id }),
      oncontextmenu: e => { e.preventDefault(); editHost(host); },
    }, h('span', { class: `dot${live.has(host.id) ? ' on' : ''}`, title: live.has(host.id) ? t('side.open') : '' }), h('span', { class: 'nm' }, host.name), badge(host.protocol));
    side.replaceChildren(
      h('h2', {}, h('span', {}, t('side.hosts')), h('button', { type: 'button', class: 'iconbtn', title: t('host.newTitle'), 'aria-label': t('host.newTitle'), onclick: () => editHost() }, icon('plus'))),
      ...(groups.get('') ?? []).map(place),
      ...[...groups].filter(([f]) => f).sort(([a], [b]) => a.localeCompare(b)).flatMap(([f, list]) => [h('h2', {}, h('span', {}, f)), ...list.map(place)]),
      ...(app.data.hosts.length ? [] : [h('p', { class: 'empty', style: 'padding:4px 6px' }, t('side.none'))]));
  }

  // ---------- Home ----------

  function drawHome() {
    const protocols = app.data.protocols.map(p => p.id);
    if (!protocols.length) {
      return homePane.replaceChildren(h('div', { class: 'home' },
        h('h3', {}, t('@name')),
        h('p', { class: 'empty' }, app.data.error ? t('home.unavailable', { error: app.data.error }) : t('home.noProtocols')),
        h('div', { class: 'foot' }, h('button', { type: 'button', class: 'btn', onclick: () => aboutDialog(app) }, icon('info'), t('about.button')))));
    }
    const input = h('input', { type: 'text', spellcheck: 'false', autocomplete: 'off', placeholder: 'ssh utente@server', 'aria-label': t('home.quick') });
    const error = h('p', { class: 'error', role: 'alert', hidden: true });
    const go = () => {
      const spec = parseQuick(input.value, protocols);
      if (!spec) { error.textContent = t('home.quickInvalid'); error.hidden = false; return; }
      if (spec.protocol === 'ssh' && !spec.values.user) { error.textContent = t('home.quickUser'); error.hidden = false; return; }
      error.hidden = true;
      open(spec);
    };
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); go(); } });
    const mine = new Set(tabs.map(x => x.session.id));
    const running = app.data.sessions.filter(s => s.state !== 'closed' && !mine.has(s.id));
    const ago = s => (s.closesAt ? t('home.closesIn', { n: Math.max(1, Math.round((s.closesAt - Date.now()) / 60000)) }) : t('home.openElsewhere'));
    const used = host => (host.used ? lilos.locale.i18n.date(host.used, { dateStyle: 'medium', timeStyle: 'short' }) : t('home.never'));
    homePane.replaceChildren(h('div', { class: 'home' },
      h('section', {},
        h('h3', {}, t('home.quick')),
        h('div', { class: 'quick' }, input,
          h('button', { type: 'button', class: 'btn primary', onclick: go }, icon('play'), t('home.connect')),
          h('button', { type: 'button', class: 'btn', title: t('home.saveAsHost'), onclick: () => editHost(null, parseQuick(input.value, protocols)) }, t('home.save'))),
        error,
        h('p', { class: 'hint' }, t('home.quickHint'), ' ', ...['telnet 10.0.0.1 23', 'rlogin -l ann sun4', 'supdup its.example', 'ssh://…'].flatMap((x, i) => [i ? ' · ' : '', h('code', {}, x)]))),
      running.length > 0 && h('section', {},
        h('h3', {}, t('home.running')),
        h('div', { class: 'live' }, ...running.map(s => h('div', { class: 'li' },
          h('span', { class: 'dot on' }),
          h('span', { class: 'nm', title: s.title || '' }, s.name, s.name !== s.address && h('small', {}, s.address)),
          h('span', { class: 'when' }, [s.title, ago(s)].filter(Boolean).join(' · ')),
          h('button', { type: 'button', class: 'btn primary', onclick: () => resume(s) }, t('home.resume')))))),
      h('section', {},
        h('h3', {}, t('home.hosts')),
        h('div', { class: 'hosts' },
          ...[...app.data.hosts].sort((a, b) => (b.used ?? 0) - (a.used ?? 0) || a.name.localeCompare(b.name)).map(host => h('div', { class: 'host' },
            h('button', { type: 'button', style: 'all:unset;cursor:pointer;display:grid;gap:4px', title: t('home.connectTo', { name: host.name }), onclick: () => open({ host: host.id }) },
              h('span', { class: 't' }, h('span', { class: 'nm' }, host.name), badge(host.protocol)),
              h('span', { class: 'a' }, host.address),
              h('span', { class: 'l' }, host.available ? used(host) : t('home.moduleMissing'))),
            h('button', { type: 'button', class: 'iconbtn edit', title: t('host.editTitle'), 'aria-label': t('host.editNamed', { name: host.name }), onclick: () => editHost(host) }, icon('pencil')))),
          h('button', { type: 'button', class: 'host new', onclick: () => editHost() }, icon('plus'), t('host.newTitle')))),
      h('div', { class: 'foot' }, h('button', { type: 'button', class: 'btn', onclick: () => aboutDialog(app) }, icon('info'), t('about.button')))));
  }

  // ---------- Launch args ----------

  const take = async a => {
    if (!a) return;
    if (a.connect?.protocol) return open({ protocol: a.connect.protocol, values: a.connect.values ?? {} });
    if (a.action === 'remote-terminal.here' && Array.isArray(a.files) && a.files[0]) return open(null, { here: a.files[0] });
    if (typeof a.host === 'string' && a.host.trim()) {
      const name = a.host.trim().toLowerCase();
      const host = app.data.hosts.find(x => x.name.toLowerCase() === name);
      if (host) return open({ host: host.id });
      app.error(t('home.hostNotFound', { name: a.host }));
    }
  };

  const offTerm = lilos.on('term', () => load());
  const offLaunch = lilos.on('launch', a => take(a));
  const offLocale = lilos.on('locale', () => { drawSide(); drawTabs(); if (!current) drawHome(); });
  await load();
  select(null);
  await take(args);
  return () => {
    offTerm(); offLaunch(); offLocale();
    app.closePopup();
    for (const tab of tabs) tab.dispose();   // the sessions stay in the kernel (10 minutes)
  };
}

// ---------- Cli: the Terminal's commands ----------

export async function cli({ lilos }) {
  const t = (k, p) => lilos.locale.i18n.t(k, p);
  lilos.handle(async data => {
    const command = String(data?.command ?? '');
    const args = Array.isArray(data?.args) ? data.args.map(String) : [];
    if (args.includes('--help') || args.includes('-h') || !args.length) return { stdout: `${t(`cli.usage.${command}`)}\n`, code: args.length ? 0 : 2 };
    const line = [command, ...args.map(a => (/\s/.test(a) ? `'${a.replace(/'/g, '')}'` : a))].join(' ');
    const spec = parseQuick(line);
    if (!spec) return { stderr: `${command}: ${t('cli.invalid')}\n${t(`cli.usage.${command}`)}\n`, code: 2 };
    if (spec.protocol === 'ssh' && !spec.values.user) return { stderr: `${command}: ${t('home.quickUser')}\n`, code: 2 };
    await lilos.app.call('main', { connect: spec });
    return `${t('cli.opened', { address: words(line).slice(1).join(' ') })}\n`;
  });
}
