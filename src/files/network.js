import { Window, h, icon, fs, openMenu } from '@lilos/sdk';
import * as sdk from '@lilos/sdk';   // `net` and `messageBox`: missing in older lilOS, so not imported by name
import { pickFile } from '@lilos/system';
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

const PROTOCOL_BADGE = { ftp: 'FTP', ftps: 'FTPS', sftp: 'SFTP', webdav: 'DAV', smb: 'SMB' };
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
  openMenu(x, y, [
    { label: t('net.menu.open'), icon: 'open', action: () => browser.go(net.mountNode(m.id)) },
    m.state === 'on'
      ? { label: t('net.menu.disconnect'), icon: 'x', action: () => net.disconnect(m.id).catch(err => browser.netError(err)) }
      : { label: t('net.menu.connect'), icon: 'globe', action: () => browser.go(net.mountNode(m.id)) },
    { label: t('net.menu.edit'), icon: 'pencil', action: () => connectDialog(browser, m) },
    '-',
    { label: t('net.menu.remove'), icon: 'trash', danger: true, action: () => removeMount(browser, m) },
  ]);
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
  return h('div', { class: `fm-mountbar ${m.state}` },
    icon(m.state === 'on' ? 'lock' : 'globe'),
    h('span', { class: 'fm-mountbar-text' }, m.state === 'on' ? t('net.bar.on') : stateLabel(m), ' ', h('code', {}, m.address)),
    h('span', { class: 'fm-sp' }),
    m.state === 'on' ? disconnect : null);
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
        if (!await askSecret(browser, m, err.details?.reason === 'auth')) return false;
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
 *   initial   values of a connection being changed (its secret fields stay empty: "unchanged")
 *   only      'secret': only the secret fields (asking the password again)
 */
function protocolFields(browser, protocol, { initial = {}, only = null, onShares = null, onChange = null } = {}) {
  const values = { ...initial }, secret = {};
  for (const f of protocol.fields) if (values[f.key] === undefined && f.default !== undefined && !f.secret) values[f.key] = f.default;
  const rows = [];
  const el = h('div', { class: 'fm-net-fields' });
  const draw = () => {
    rows.length = 0;
    for (const f of protocol.fields) {
      if (only === 'secret' && !f.secret) continue;
      if (!shown(f, values)) continue;
      rows.push(fieldRow(browser, f, f.secret ? secret : values, { editing: !!initial.host && f.secret, onShares, changed: () => { onChange?.(); if (protocol.fields.some(x => x.when)) draw(); } }));
    }
    el.replaceChildren(...rows);
  };
  draw();
  return {
    el,
    values: () => Object.fromEntries(Object.entries(values).filter(([k]) => protocol.fields.some(f => f.key === k && !f.secret && shown(f, values)))),
    secret: () => ({ ...secret }),
    /** The keys of required fields shown and left empty (secret ones count only when asked for). */
    missing: (needSecret = true) => protocol.fields.filter(f => f.required && shown(f, values) && (f.secret ? needSecret && !secret[f.key] : values[f.key] === undefined || values[f.key] === '')).map(f => text(f.label)),
    focus: () => el.querySelector('input, select, textarea')?.focus(),
  };
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
 */
export function connectDialog(browser, m = null) {
  const net = network();
  if (!net) return;
  const win = new Window({ title: m ? t('net.edit.title', { name: m.name }) : t('net.connect.title'), icon: 'globe', width: 460, height: 660, minWidth: 360, minHeight: 360 });
  let protocol = net.protocols.find(p => p.id === (m?.protocol ?? net.protocols[0]?.id));
  let fields = null, trust = null;
  const select = h('select', { class: 'ctl-select', id: 'fm-net-protocol', disabled: !!m },
    ...net.protocols.map(p => h('option', { value: p.id, selected: p.id === protocol.id }, text(p.label))));
  const name = h('input', { class: 'ctl-text', type: 'text', spellcheck: 'false', value: m?.name ?? '' });
  const nameHint = h('small');
  const remember = h('input', { type: 'checkbox', checked: m ? m.remembered : true });
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
    fields = protocolFields(browser, protocol, {
      initial: m?.values ?? {},
      onShares: protocol.canListShares ? listShares : null,
      onChange: () => {
        if (!named) { name.value = fields.values().host ?? ''; hint(); }
        if (trust) { trust = null; note.hidden = true; save.textContent = m ? t('net.save') : t('net.connect.go'); }
      },
    });
    holder.replaceChildren(fields.el);
  };
  const config = () => ({ protocol: protocol.id, values: fields.values(), ...(trust && { trust: trust.fingerprint }) });

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
      win.emit('close');
      browser.go(net.mountNode(saved.id));
    } catch (err) {
      say(err.message, true);
    } finally {
      save.disabled = false;
    }
  });

  draw();
  hint();
  win.body.append(h('div', { class: 'fm-net-dialog' },
    h('div', { class: 'fm-net-body' },
      h('div', { class: 'fm-net-row' }, h('label', { for: 'fm-net-protocol' }, t('net.protocol')), select),
      holder,
      h('div', { class: 'fm-net-row' }, h('label', {}, t('net.name')), name, nameHint),
      h('label', { class: 'fm-net-check' }, remember, t('net.remember')),
      h('label', { class: 'fm-net-check' }, auto, t('net.auto')),
      note,
      status),
    h('div', { class: 'fm-net-foot' }, test, h('span', { class: 'fm-sp' }), cancel, save)));
  browser.openWindow(win);
  requestAnimationFrame(() => fields.focus());
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
