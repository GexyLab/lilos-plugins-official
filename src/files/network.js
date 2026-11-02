import { Window, h, icon, fs, openMenu } from '@lilos/sdk';
import * as sdk from '@lilos/sdk';   // `net` and `messageBox`: missing in older lilOS, so not imported by name
import { pickFile, launch } from '@lilos/system';
import * as system from '@lilos/system';   // `canLinkOnDesk`: missing in older lilOS
import { t } from './i18n.js';

/**
 * The network in the File Manager: the Rete section of the sidebar (one entry per connection,
 * with its state), the bar over the list inside a connection, reading a folder of a connection
 * when it opens (asking the password or the confirmation of a server when the kernel needs them),
 * and the window to add or change a connection: its protocol from a list, and below it the fields
 * that protocol asks for (the kernel's module describes them).
 * Everything does nothing in a lilOS without the network (sdk.net missing or no protocols).
 */
export const network = () => (sdk.net?.available ? sdk.net : null);

/** The connection of a node of fs (its own, or the one it is in), or null. */
export function mountOf(id) {
  const mountId = fs.get(id)?.net;
  return mountId ? network()?.mount(mountId) ?? null : null;
}

const STATES = { on: 'net.state.on', connecting: 'net.state.connecting', off: 'net.state.off', error: 'net.state.error' };
export const stateLabel = m => t(STATES[m.state] ?? 'net.state.off') + (m.state === 'error' && m.error ? `: ${m.error}` : '');

const PROTOCOL_BADGE = { ftp: 'FTP', ftps: 'FTPS', sftp: 'SFTP', webdav: 'DAV', smb: 'SMB', onedrive: 'OD' };

/** The protocol of a connection, as the kernel describes it (links, office, recycles, fields…). */
export const protocolOf = m => (m ? network()?.protocols.find(p => p.id === m.protocol) ?? null : null);

/** True if the protocol's account is one to sign in to on the provider's page (a 'signin' field). */
const signsIn = protocol => !!protocol?.fields.some(f => f.type === 'signin');
const badge = protocol => PROTOCOL_BADGE[protocol] ?? protocol.toUpperCase().slice(0, 5);

/**
 * The Rete section of the sidebar: its title opens the Rete folder, its + adds a connection; each
 * connection opens its folder, and has a menu (connect, disconnect, change, remove).
 */
export function sideSection(browser, { active, reteFolder }) {
  const net = network();
  if (!net) return [];
  const add = h('button', { class: 'fm-side-add', type: 'button', title: t('net.add'), 'aria-label': t('net.add'), onclick: () => connectDialog(browser) }, icon('plus'));
  const title = reteFolder
    ? h('button', { class: 'fm-side-title', type: 'button', onclick: () => browser.go(reteFolder) }, t('net.section'))
    : h('span', {}, t('net.section'));
  const entries = net.mounts().sort((a, b) => a.name.localeCompare(b.name)).map(m => {
    const node = net.mountNode(m.id);
    const on = active === node;
    const btn = h('button', {
      class: on ? 'fm-place fm-mount on' : 'fm-place fm-mount', type: 'button', 'aria-current': on ? 'true' : null,
      title: `${m.address} · ${stateLabel(m)}`, onclick: () => browser.go(node),
    }, h('span', { class: `fm-dot ${m.state}`, 'aria-hidden': 'true' }), h('span', { class: 'fm-mount-name' }, m.name), h('span', { class: 'fm-proto' }, badge(m.protocol)));
    btn.dataset.folder = node;
    btn.addEventListener('contextmenu', e => {
      e.preventDefault();
      mountMenu(browser, m, e.clientX, e.clientY);
    });
    return btn;
  });
  return [
    h('section', { class: 'fm-side-net', 'aria-label': t('net.section') },
      h('h6', { class: 'fm-side-head' }, title, add),
      ...(entries.length ? entries : [h('p', { class: 'fm-side-none' }, t('net.none'))])),
  ];
}

/** The menu of a connection: in the sidebar and on its folder. */
export function mountMenu(browser, m, x, y) {
  const net = network();
  if (!net) return;
  const node = net.mountNode(m.id);
  openMenu(x, y, [
    { label: t('net.menu.open'), icon: 'open', action: () => browser.go(net.mountNode(m.id)) },
    m.state === 'on'
      ? { label: t('net.menu.disconnect'), icon: 'x', action: () => net.disconnect(m.id).catch(err => browser.netError(err)) }
      : { label: t('net.menu.connect'), icon: 'globe', action: () => browser.go(net.mountNode(m.id)) },
    { label: t('net.menu.edit'), icon: 'pencil', action: () => connectDialog(browser, m) },
    system.canLinkOnDesk?.([node]) && { label: t('menu.deskLink'), icon: 'link', action: () => browser.addDeskLinks([node]) },
    '-',
    { label: t('net.menu.remove'), icon: 'trash', danger: true, action: () => removeMount(browser, m) },
  ].filter(Boolean));
}

async function removeMount(browser, m) {
  const answer = sdk.messageBox
    ? await sdk.messageBox(browser.win, { icon: 'warning', title: t('net.remove.title', { name: m.name }), text: t('net.remove.text'), buttons: ['continue', 'cancel'] })
    : 'continue';
  if (answer === 'continue') network()?.remove(m.id).catch(err => browser.netError(err));
}

/** The bar over the list inside a connection: where it is connected, and Disconnetti. */
export function mountBar(browser, folderId) {
  const m = mountOf(folderId);
  if (!m) return null;
  const disconnect = h('button', { class: 'ctl-btn', type: 'button', onclick: () => network().disconnect(m.id).catch(err => browser.netError(err)) }, icon('x'), t('net.menu.disconnect'));
  const web = m.state === 'on' && protocolOf(m)?.links && sdk.net.openWeb
    ? h('button', { class: 'ctl-btn', type: 'button', onclick: () => openInBrowser(browser, folderId) }, icon('globe'), t('net.web.open'))
    : null;
  return h('div', { class: `fm-mountbar ${m.state}` },
    icon(m.state === 'on' ? 'lock' : 'globe'),
    h('span', { class: 'fm-mountbar-text' }, m.state === 'on' ? t('net.bar.on') : stateLabel(m), ' ', h('code', {}, m.address)),
    h('span', { class: 'fm-sp' }),
    web,
    m.state === 'on' ? disconnect : null);
}

/**
 * Opens the page of a file or folder of a connection on the provider's site (OneDrive's, or Office
 * for the web for an Office document) in a new browser tab. Call it right from a click.
 */
export function openInBrowser(browser, id) {
  const m = mountOf(id);
  if (!m || !sdk.net?.openWeb) return;
  sdk.net.openWeb(() => sdk.net.link(m.id, fs.netPath(id)))
    .catch(err => (err.code === 'secret_required' ? askSignIn(browser, m) : browser.netError(err)));
}

/**
 * Reads a folder of a connection (it is being opened). When the kernel needs the password or the
 * user's confirmation of the server it asks, then reads again. Resolves true once read.
 */
export async function readRemote(browser, id) {
  const net = network();
  if (!net || !fs.isRemote?.(id)) return true;
  for (;;) {
    try {
      await fs.refresh(id);
      return true;
    } catch (err) {
      const m = mountOf(id);
      if (!m || !fs.exists(id)) return false;
      if (err.code === 'secret_required') {
        const ok = err.details?.reason === 'signin' || signsIn(protocolOf(m)) ? await askSignIn(browser, m) : await askSecret(browser, m, err.details?.reason === 'auth');
        if (!ok) return false;
        continue;
      }
      if (err.code === 'untrusted') {
        if (!await confirmTrust(browser, m.id, m.name, err.details?.trust)) return false;
        continue;
      }
      if (await browser.netError(err, { retry: true, title: t('net.error.read', { name: m.name }) }) !== 'retry') return false;
    }
  }
}

/** Asks the user to confirm a server (its key or certificate), then connects with it. Resolves true if confirmed. */
async function confirmTrust(browser, mountId, name, trust) {
  if (!trust?.fingerprint || !sdk.messageBox) return false;
  // A key or certificate other than the one confirmed before: someone may be in between
  const changed = trust.changed === true;
  const answer = await sdk.messageBox(browser.win, {
    icon: changed ? 'error' : 'warning',
    title: t(changed ? 'net.trust.changed.title' : 'net.trust.title', { name }),
    text: t(changed ? 'net.trust.changed' : trust.kind === 'ssh' ? 'net.trust.ssh' : 'net.trust.tls', { fingerprint: trust.text ?? trust.fingerprint, previous: trust.previous ?? '' }),
    buttons: ['continue', 'cancel'], default: 'cancel',
  });
  if (answer !== 'continue') return false;
  try {
    await network().connect(mountId, { trust: trust.fingerprint });
    return true;
  } catch (err) {
    if (err.code === 'secret_required' || err.code === 'untrusted') return true;   // the next attempt asks
    await browser.netError(err);
    return false;
  }
}

// ---------- Fields of a protocol ----------

const text = v => network()?.text(v) ?? (typeof v === 'string' ? v : '');
const shown = (f, values) => !f.when || Object.entries(f.when).every(([k, want]) => (Array.isArray(want) ? want.includes(values[k]) : values[k] === want));

/**
 * The fields of a protocol in a form: returns { el, values(), secret(), check() }.
 *   initial   values of a connection being changed (its secret fields stay empty: "unchanged"), or to start from
 *   editing   the values are a saved connection's (default: when there is a server in them)
 *   only      'secret': only the secret fields (asking the password again)
 */
function protocolFields(browser, protocol, { initial = {}, editing = !!initial.host, only = null, onShares = null, onChange = null } = {}) {
  const values = { ...initial }, secret = {};
  const signin = { id: null };   // a sign-in made in this window: the kernel keeps what it gave
  for (const f of protocol.fields) if (values[f.key] === undefined && f.default !== undefined && !f.secret) values[f.key] = f.default;
  const rows = [];
  const el = h('div', { class: 'fm-net-fields' });
  const draw = () => {
    rows.length = 0;
    for (const f of protocol.fields) {
      if (only === 'secret' && !f.secret) continue;
      if (!shown(f, values)) continue;
      if (f.type === 'signin') {
        rows.push(signInRow(browser, protocol, f, values, signin, () => { onChange?.(); draw(); }));
        continue;
      }
      rows.push(fieldRow(browser, f, f.secret ? secret : values, { editing: editing && f.secret, onShares, changed: () => { onChange?.(); if (protocol.fields.some(x => x.when)) draw(); } }));
    }
    el.replaceChildren(...rows);
  };
  draw();
  return {
    el,
    values: () => Object.fromEntries(Object.entries(values).filter(([k]) => protocol.fields.some(f => f.key === k && !f.secret && f.type !== 'signin' && shown(f, values)))),
    secret: () => ({ ...secret }),
    /** The sign-in made here (its id for the kernel), or null. */
    signin: () => signin.id,
    /** The keys of required fields shown and left empty (secret ones count only when asked for). */
    missing: (needSecret = true) => protocol.fields.filter(f => f.required && shown(f, values) && (
      f.type === 'signin' ? !signin.id && !values[f.key] : f.secret ? needSecret && !secret[f.key] : values[f.key] === undefined || values[f.key] === '')).map(f => text(f.label)),
    focus: () => el.querySelector('input, select, textarea')?.focus(),
  };
}

/**
 * A 'signin' field: the account signed in to, or the button that opens the provider's page in a
 * window (lilOS waits for it there, with Annulla). Signing in again here changes the account.
 */
function signInRow(browser, protocol, f, values, signin, changed) {
  const status = h('small', { class: 'fm-net-wait', role: 'status' });
  let controller = null, buttons = [];
  const go = () => {
    controller?.abort();
    controller = new AbortController();
    const others = Object.fromEntries(Object.entries(values).filter(([k]) => k !== f.key));
    const asked = sdk.net.signIn(protocol.id, others, { signal: controller.signal });
    for (const b of buttons) b.disabled = true;
    cancel.hidden = false;
    status.classList.remove('bad');
    status.textContent = t('net.signin.waiting');
    asked.then(({ signin: id, account }) => {
      signin.id = id;
      values[f.key] = account;
      changed();
    }, err => {
      for (const b of buttons) b.disabled = false;
      cancel.hidden = true;
      status.textContent = err.code === 'canceled' ? '' : err.code === 'blocked' ? t('net.signin.blocked') : err.message;
      status.classList.toggle('bad', err.code !== 'canceled');
    });
  };
  const cancel = h('button', { class: 'ctl-btn', type: 'button', hidden: true, onclick: () => controller?.abort() }, t('net.cancel'));
  const label = h('label', {}, text(f.label), f.required ? h('span', { class: 'fm-req', 'aria-hidden': 'true' }, ' *') : null);
  if (values[f.key]) {
    const other = h('button', { class: 'ctl-btn', type: 'button', onclick: go }, t('net.signin.other'));
    buttons = [other];
    return h('div', { class: 'fm-net-row' }, label,
      h('div', { class: 'fm-net-account' }, icon(signin.id ? 'check' : 'user'), h('span', { class: 'fm-net-who' }, values[f.key]), other, cancel),
      status);
  }
  const button = h('button', { class: 'ctl-btn primary fm-signin', type: 'button', onclick: go }, icon('user'), text(f.button) || t('net.signin.button'));
  buttons = [button];
  return h('div', { class: 'fm-net-row' }, label, h('div', { class: 'fm-net-pick' }, button, cancel), f.hint ? h('small', {}, text(f.hint)) : null, status);
}

function fieldRow(browser, f, store, { editing, onShares, changed }) {
  const id = `fm-net-${f.key}-${Math.random().toString(36).slice(2, 7)}`;
  const label = h('label', { for: id }, text(f.label), f.required ? h('span', { class: 'fm-req', 'aria-hidden': 'true' }, ' *') : null);
  const set = v => { if (v === '' || v === undefined) delete store[f.key]; else store[f.key] = v; changed(); };
  let input;
  if (f.type === 'checkbox') {
    input = h('input', { id, type: 'checkbox', checked: store[f.key] === true });
    input.addEventListener('change', () => set(input.checked));
    return h('label', { class: 'fm-net-check' }, input, text(f.label));
  }
  if (f.type === 'select') {
    input = h('select', { id, class: 'ctl-select' }, ...(f.options ?? []).map(o => h('option', { value: String(o.value), selected: o.value === store[f.key] }, text(o.label))));
    input.addEventListener('change', () => set(f.options.find(o => String(o.value) === input.value)?.value));
  } else if (f.type === 'textarea') {
    input = h('textarea', { id, class: 'ctl-text', rows: '3', spellcheck: 'false', placeholder: f.placeholder ?? '' });
    input.value = store[f.key] ?? '';
    input.addEventListener('input', () => set(input.value));
  } else if (f.type === 'file') {
    // The text of a file of lilOS (a private key): chosen, read, kept as the field's value
    const name = h('span', { class: 'fm-net-file' }, store[f.key] ? t('net.file.chosen') : editing ? t('net.secret.unchanged') : t('net.file.none'));
    input = h('button', { id, class: 'ctl-btn', type: 'button' }, t('net.file.browse'));
    input.addEventListener('click', async () => {
      const node = await pickFile(browser.openWindow, { title: text(f.label) });
      if (!node) return;
      try {
        set(await fs.read(node.id));
        name.textContent = node.name;
      } catch (err) { browser.netError(err); }
    });
    return h('div', { class: 'fm-net-row' }, label, h('div', { class: 'fm-net-pick' }, name, input), f.hint ? h('small', {}, text(f.hint)) : null);
  } else {
    const type = f.type === 'password' ? 'password' : f.type === 'number' ? 'number' : 'text';
    input = h('input', {
      id, class: 'ctl-text', type, spellcheck: 'false', autocomplete: f.type === 'password' ? 'new-password' : 'off',
      placeholder: f.secret && editing ? t('net.secret.unchanged') : f.placeholder ?? '',
      ...(f.min !== undefined && { min: String(f.min) }), ...(f.max !== undefined && { max: String(f.max) }),
    });
    input.value = store[f.key] ?? '';
    input.addEventListener('input', () => set(type === 'number' ? (input.value === '' ? '' : Number(input.value)) : input.value));
  }
  const row = [label];
  if (f.key === 'share' && onShares) {
    const list = h('button', { class: 'ctl-btn', type: 'button' }, t('net.shares.list'));
    list.addEventListener('click', () => onShares(list, name => { input.value = name; set(name); }));
    row.push(h('div', { class: 'fm-net-pick' }, input, list));
  } else row.push(input);
  if (f.hint) row.push(h('small', {}, text(f.hint)));
  return h('div', { class: 'fm-net-row' }, ...row);
}

// ---------- Windows ----------

/**
 * Connetti a un server (m: a connection to change, or none for a new one): the protocol from a
 * list, its fields, the name of the folder in Rete, remember the password, connect at sign-in.
 * Prova tries without saving; the main button saves and connects (and opens the folder).
 *   initial      a new connection filled in: { protocol, values, name } (Nuovo collegamento)
 *   onConnected  (mount) once connected, in place of opening its folder; onClosed: closed before
 */
export function connectDialog(browser, m = null, { initial = null, onConnected = null, onClosed = null } = {}) {
  const net = network();
  if (!net) return;
  const win = new Window({ title: m ? t('net.edit.title', { name: m.name }) : t('net.connect.title'), icon: 'globe', width: 460, height: 660, minWidth: 360, minHeight: 360 });
  let protocol = net.protocols.find(p => p.id === (m?.protocol ?? initial?.protocol)) ?? net.protocols[0];
  let connected = false;
  let fields = null, trust = null;
  const select = h('select', { class: 'ctl-select', id: 'fm-net-protocol', disabled: !!m },
    ...net.protocols.map(p => h('option', { value: p.id, selected: p.id === protocol.id }, text(p.label))));
  const name = h('input', { class: 'ctl-text', type: 'text', spellcheck: 'false', value: m?.name ?? initial?.name ?? '' });
  const nameHint = h('small');
  const remember = h('input', { type: 'checkbox', checked: m ? m.remembered : true });
  const rememberText = h('span', {}, t('net.remember'));
  const auto = h('input', { type: 'checkbox', checked: !!m?.auto });
  const holder = h('div');
  const note = h('div', { class: 'fm-net-note', hidden: true, role: 'alert' });
  const status = h('p', { class: 'fm-net-status', role: 'status' });
  const test = h('button', { class: 'ctl-btn', type: 'button' }, t('net.test'));
  const cancel = h('button', { class: 'ctl-btn', type: 'button', onclick: () => win.emit('close') }, t('net.cancel'));
  const save = h('button', { class: 'ctl-btn primary', type: 'button' }, m ? t('net.save') : t('net.connect.go'));
  let named = !!m;   // the user wrote a name: the server's does not replace it

  const hint = () => { nameHint.textContent = name.value.trim() ? t('net.name.hint', { path: `~/Rete/${name.value.trim()}` }) : ''; };
  const say = (msg, bad = false) => { status.textContent = msg; status.classList.toggle('bad', bad); };
  const draw = () => {
    trust = null;
    note.hidden = true;
    save.textContent = m ? t('net.save') : t('net.connect.go');
    // Not usable yet (a module setting missing): why, instead of the fields
    const why = protocol.notReady;
    test.disabled = save.disabled = !!why;
    if (why) {
      fields = protocolFields(browser, { ...protocol, fields: [] });
      holder.replaceChildren(h('div', { class: 'fm-net-note' }, h('b', {}, t('net.notReady.title', { name: text(protocol.label) })), h('span', {}, text(why)),
        h('div', {}, h('button', { class: 'ctl-btn', type: 'button', onclick: () => launch('settings', { tab: protocol.id }) }, icon('gear'), t('net.notReady.settings')))));
      return;
    }
    // An account to sign in to: the folder in Rete is called after the provider, unless the user names it
    if (!named && signsIn(protocol)) { name.value = text(protocol.label); hint(); }
    rememberText.textContent = t(signsIn(protocol) ? 'net.remember.signin' : 'net.remember');
    fields = protocolFields(browser, protocol, {
      initial: m?.values ?? (protocol.id === initial?.protocol ? initial.values : {}),
      editing: !!m,
      onShares: protocol.canListShares ? listShares : null,
      onChange: () => {
        if (!named) { name.value = fields.values().host ?? (signsIn(protocol) ? text(protocol.label) : ''); hint(); }
        if (trust) { trust = null; note.hidden = true; save.textContent = m ? t('net.save') : t('net.connect.go'); }
      },
    });
    holder.replaceChildren(fields.el);
  };
  const config = () => ({ protocol: protocol.id, values: fields.values(), ...(trust && { trust: trust.fingerprint }), ...(fields.signin() && { signin: fields.signin() }) });

  async function listShares(button, pick) {
    try {
      button.disabled = true;
      const shares = await net.shares(config(), fields.secret());
      const r = button.getBoundingClientRect();
      if (!shares.length) return say(t('net.shares.none'));
      openMenu(r.left, r.bottom, shares.map(s => ({ label: s, icon: 'folder', action: () => pick(s) })));
    } catch (err) {
      if (err.code === 'untrusted') return showTrust(err.details?.trust);
      say(err.message, true);
    } finally { button.disabled = false; }
  }

  /** A server to confirm: its fingerprint in the window; the main button confirms and goes on. */
  const showTrust = tr => {
    if (!tr?.fingerprint) return;
    trust = tr;
    note.replaceChildren(h('b', {}, t('net.trust.first')), ' ', t(tr.kind === 'ssh' ? 'net.trust.key' : 'net.trust.cert'),
      h('code', {}, tr.text ?? tr.fingerprint), h('span', {}, t('net.trust.check')));
    note.hidden = false;
    save.textContent = t('net.trust.go');
    say('');
  };

  select.addEventListener('change', () => { protocol = net.protocols.find(p => p.id === select.value); draw(); });
  name.addEventListener('input', () => { named = !!name.value.trim(); hint(); });

  test.addEventListener('click', async () => {
    const missing = fields.missing(!m);
    if (missing.length) return say(t('net.missing', { fields: missing.join(', ') }), true);
    say(t('net.testing'));
    try {
      await net.test(config(), fields.secret());
      say(t('net.test.ok'));
    } catch (err) {
      if (err.code === 'untrusted') return showTrust(err.details?.trust);
      say(err.message, true);
    }
  });

  save.addEventListener('click', async () => {
    const missing = fields.missing(!m || !m.remembered);
    if (!name.value.trim()) missing.unshift(t('net.name'));
    if (missing.length) return say(t('net.missing', { fields: missing.join(', ') }), true);
    save.disabled = true;
    say(t('net.connecting'));
    try {
      const body = { name: name.value.trim(), ...config(), auto: auto.checked, remember: remember.checked };
      const saved = m ? await net.update(m.id, body, fields.secret()) : await net.create(body, fields.secret());
      m = saved;
      try {
        await net.connect(saved.id, trust ? { trust: trust.fingerprint } : {});
      } catch (err) {
        if (err.code === 'untrusted') { showTrust(err.details?.trust); return; }
        if (err.code === 'secret_required') { say(err.message, true); return; }
        say(err.message, true);
        return;
      }
      connected = true;
      win.emit('close');
      if (onConnected) onConnected(saved);
      else browser.go(net.mountNode(saved.id));
    } catch (err) {
      say(err.message, true);
    } finally {
      save.disabled = false;
    }
  });

  if (onClosed) win.on('destroy', () => { if (!connected) onClosed(); });
  draw();
  hint();
  win.body.append(h('div', { class: 'fm-net-dialog' },
    h('div', { class: 'fm-net-body' },
      h('div', { class: 'fm-net-row' }, h('label', { for: 'fm-net-protocol' }, t('net.protocol')), select),
      holder,
      h('div', { class: 'fm-net-row' }, h('label', {}, t('net.name')), name, nameHint),
      h('label', { class: 'fm-net-check' }, remember, rememberText),
      h('label', { class: 'fm-net-check' }, auto, t('net.auto')),
      note,
      status),
    h('div', { class: 'fm-net-foot' }, test, h('span', { class: 'fm-sp' }), cancel, save)));
  browser.openWindow(win);
  requestAnimationFrame(() => fields.focus());
}

/**
 * Asks to sign in again to the account of a connection (the provider no longer takes the one it
 * had), then connects with the new sign-in. Resolves true once connected, false if the user gave up.
 */
export function askSignIn(browser, m) {
  const net = network();
  const protocol = net?.protocols.find(p => p.id === m.protocol);
  if (!protocol || !net.signIn) return Promise.resolve(false);
  return new Promise(resolve => {
    const win = new Window({ title: t('net.signin.again.title', { name: m.name }), icon: 'user', width: 400, height: 250, minWidth: 320, minHeight: 200 });
    const field = protocol.fields.find(f => f.type === 'signin');
    const status = h('p', { class: 'fm-net-status', role: 'status' });
    const go = h('button', { class: 'ctl-btn primary', type: 'button' }, icon('user'), text(field?.button) || t('net.signin.button'));
    let done = false, controller = null;
    const finish = value => { if (done) return; done = true; controller?.abort(); resolve(value); win.emit('close'); };
    go.addEventListener('click', () => {
      controller?.abort();
      controller = new AbortController();
      const asked = net.signIn(protocol.id, m.values, { signal: controller.signal });
      go.disabled = true;
      status.classList.remove('bad');
      status.textContent = t('net.signin.waiting');
      asked.then(({ signin }) => net.connect(m.id, { signin, remember: m.remembered }))
        .then(() => finish(true), err => {
          go.disabled = false;
          if (err.code === 'canceled') { status.textContent = ''; return; }
          status.textContent = err.code === 'blocked' ? t('net.signin.blocked') : err.message;
          status.classList.add('bad');
        });
    });
    win.on('destroy', () => { if (!done) { done = true; controller?.abort(); resolve(false); } });
    win.body.append(h('div', { class: 'fm-net-dialog' },
      h('div', { class: 'fm-net-body' },
        h('p', {}, t('net.signin.again.text', { account: m.values?.[field?.key] ?? m.address })),
        h('div', {}, go),
        status),
      h('div', { class: 'fm-net-foot' }, h('span', { class: 'fm-sp' }),
        h('button', { class: 'ctl-btn', type: 'button', onclick: () => finish(false) }, t('net.later')))));
    browser.openWindow(win);
    requestAnimationFrame(() => go.focus());
  });
}

/**
 * Asks the password (the secret fields of the protocol) of a connection, then connects with it.
 * wrong: the last one was not right. Resolves true once connected (or when the next step is to
 * confirm the server), false if the user gave up.
 */
function askSecret(browser, m, wrong = false) {
  const net = network();
  const protocol = net?.protocols.find(p => p.id === m.protocol);
  if (!protocol) return Promise.resolve(false);
  return new Promise(resolve => {
    const win = new Window({ title: t('net.password.title', { name: m.name }), icon: 'lock', width: 380, height: 300, minWidth: 320, minHeight: 220 });
    const fields = protocolFields(browser, protocol, { initial: m.values, only: 'secret' });
    const remember = h('input', { type: 'checkbox', checked: m.remembered });
    const status = h('p', { class: 'fm-net-status bad', role: 'status' }, wrong ? t('net.password.wrong') : '');
    const ok = h('button', { class: 'ctl-btn primary', type: 'button' }, t('net.connect.go'));
    let done = false;
    const finish = value => { if (done) return; done = true; resolve(value); win.emit('close'); };
    const go = async () => {
      ok.disabled = true;
      status.textContent = '';
      try {
        await net.connect(m.id, { secret: fields.secret(), remember: remember.checked });
        finish(true);
      } catch (err) {
        if (err.code === 'untrusted') return finish(true);   // reading again asks to confirm the server
        status.textContent = err.message;
        ok.disabled = false;
      }
    };
    ok.addEventListener('click', go);
    fields.el.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); go(); } });
    win.on('destroy', () => { if (!done) { done = true; resolve(false); } });
    win.body.append(h('div', { class: 'fm-net-dialog' },
      h('div', { class: 'fm-net-body' },
        h('p', {}, t('net.password.text', { address: m.address })),
        fields.el,
        h('label', { class: 'fm-net-check' }, remember, t('net.remember')),
        status),
      h('div', { class: 'fm-net-foot' }, h('span', { class: 'fm-sp' }),
        h('button', { class: 'ctl-btn', type: 'button', onclick: () => finish(false) }, t('net.cancel')), ok)));
    browser.openWindow(win);
    requestAnimationFrame(() => fields.focus());
  });
}
