import * as sdk from '@lilos/sdk';   // `term`: missing in older lilOS, so not imported by name
import { t } from '../i18n.js';

const { h, icon, fs } = sdk;

/**
 * The dialogs of the remote sessions, drawn over Terminal's window (owner.showDialog): a host to
 * add or change, a recording to start. Each returns a promise of what the user chose (null: cancelled).
 * The server key to confirm is a messageBox (RemoteTab.js).
 */

/** Whether a field is shown with these values (its `when`), as the kernel decides it. */
const shown = (f, values) => !f.when || Object.entries(f.when).every(([k, want]) => (Array.isArray(want) ? want.includes(values[k]) : values[k] === want));

/**
 * A host to add (host null; prefill: { protocol, values } from a command line) or change.
 * Saves it itself. Resolves { action: 'save' | 'connect' | 'delete', host } or null.
 */
export function hostDialog(owner, host = null, prefill = null) {
  const text = label => sdk.term.text(label);
  const { protocols, encodings, hosts } = owner.data;
  return new Promise(resolve => {
    let protocol = host?.protocol ?? prefill?.protocol ?? protocols[0]?.id;
    const values = { ...(host?.values ?? prefill?.values ?? {}) };
    const secret = {};
    const settings = { term: 'xterm-256color', encoding: 'utf-8', backspace: 'del', ...(host?.settings ?? {}) };
    const name = h('input', { type: 'text', value: host?.name ?? '', maxLength: 60, 'aria-label': t('remote.host.name') });
    const folders = [...new Set(hosts.map(x => x.folder).filter(Boolean))];
    const folder = h('input', { type: 'text', value: host?.folder ?? '', maxLength: 60, list: 'tm-folders', placeholder: t('remote.host.folderNone') });
    const select = h('select', { disabled: !!host }, ...protocols.map(p => h('option', { value: p.id, selected: p.id === protocol }, text(p.label))));
    const remember = h('input', { type: 'checkbox', checked: host ? host.remembered : true });
    const fieldsBox = h('div', { class: 'tm-fields' });
    const term = h('input', { type: 'text', value: settings.term, maxLength: 40, spellcheck: 'false' });
    const encoding = h('select', {}, ...encodings.map(e => h('option', { value: e, selected: e === settings.encoding }, e.toUpperCase())));
    const backspace = h('select', {}, h('option', { value: 'del', selected: settings.backspace === 'del' }, t('remote.host.backspaceDel')), h('option', { value: 'bs', selected: settings.backspace === 'bs' }, t('remote.host.backspaceBs')));
    const error = h('p', { class: 'tm-error', role: 'alert', hidden: true });
    const proto = () => protocols.find(p => p.id === protocol);

    const input = f => {
      const id = `tm-f-${f.key}`;
      const set = v => { if (f.secret) secret[f.key] = v; else values[f.key] = v; };
      const current = f.secret ? '' : values[f.key] ?? f.default ?? '';
      let el;
      if (f.type === 'select') {
        el = h('select', { id, onchange: () => { set(el.value); drawFields(); } }, ...(f.options ?? []).map(o => h('option', { value: o.value, selected: o.value === current }, text(o.label))));
      } else if (f.type === 'checkbox') {
        el = h('input', { id, type: 'checkbox', checked: current === true, onchange: () => { set(el.checked); drawFields(); } });
        return h('label', { class: 'tm-check' }, el, text(f.label));
      } else if (f.type === 'textarea') {
        el = h('textarea', { id, oninput: () => set(el.value) }, String(current));
      } else if (f.type === 'file') {
        // A file of lilOS (a private key): its path here, its content goes to the kernel
        el = h('input', { id, type: 'text', spellcheck: 'false', placeholder: host?.remembered ? t('remote.host.kept') : '~/.ssh/id_ed25519', oninput: () => { secret[`${f.key}:path`] = el.value.trim(); } });
      } else {
        const type = f.type === 'password' ? 'password' : f.type === 'number' ? 'number' : 'text';
        el = h('input', {
          id, type, value: f.secret ? '' : String(current), spellcheck: 'false', autocomplete: 'off',
          placeholder: f.secret && host?.remembered ? t('remote.host.kept') : f.placeholder ?? '',
          ...(f.type === 'number' && { min: f.min, max: f.max }),
          oninput: () => set(f.type === 'number' ? (el.value === '' ? '' : Number(el.value)) : el.value),
        });
      }
      return h('label', { class: 'tm-field', for: id }, h('span', {}, text(f.label)), el, f.hint && h('small', {}, text(f.hint)));
    };

    const drawFields = () => {
      const p = proto();
      if (!p) return fieldsBox.replaceChildren(h('p', {}, t('remote.host.noProtocols')));
      // Defaults first: other fields depend on them (when)
      for (const f of p.fields) if (!f.secret && f.default !== undefined && values[f.key] === undefined) values[f.key] = f.default;
      const fields = p.fields.filter(f => shown(f, values));
      const rows = [];
      for (let i = 0; i < fields.length; i++) {
        const f = fields[i], next = fields[i + 1];
        // Server and port on one line
        if (f.key === 'host' && next?.key === 'port') { rows.push(h('div', { class: 'tm-grid2' }, input(f), input(next))); i++; } else rows.push(input(f));
      }
      const secure = p.secure ?? (protocol === 'telnet' ? values.tls === true : false);
      if (!secure) rows.push(h('div', { class: 'tm-note' }, h('b', {}, icon('lockOpen'), t('remote.host.insecureTitle')), t('remote.host.insecureText')));
      if (p.fields.some(f => f.secret)) rows.push(h('label', { class: 'tm-check' }, remember, t('remote.host.remember')));
      fieldsBox.replaceChildren(...rows);
    };
    select.addEventListener('change', () => {
      protocol = select.value;
      for (const k of Object.keys(values)) if (!proto()?.fields.some(f => f.key === k && !f.secret)) delete values[k];
      drawFields();
    });

    const fail = message => { error.textContent = message; error.hidden = false; };
    const finish = async action => {
      error.hidden = true;
      if (action === 'delete') {
        try { await sdk.term.removeHost(host.id); } catch (err) { return fail(err.message); }
        dialog.close();
        return resolve({ action, host });
      }
      const p = proto();
      const secrets = {};
      try {
        for (const f of p.fields.filter(x => x.secret && shown(x, values))) {
          if (f.type === 'file') {
            const path = secret[`${f.key}:path`];
            if (!path) continue;
            const node = fs.resolve(path.startsWith('~') || path.startsWith('/') ? path : `~/${path}`);
            if (node?.type !== 'file') throw new Error(t('err.noSuchFile', { path }));
            secrets[f.key] = await fs.read(node.id);
          } else if (secret[f.key]) secrets[f.key] = secret[f.key];
        }
      } catch (err) {
        return fail(t('remote.host.keyUnreadable', { error: err.message }));
      }
      const clean = {};
      for (const f of p.fields) if (!f.secret && shown(f, values) && values[f.key] !== undefined && values[f.key] !== '') clean[f.key] = values[f.key];
      const config = {
        name: name.value, folder: folder.value, values: clean,
        settings: { term: term.value.trim() || 'xterm-256color', encoding: encoding.value, backspace: backspace.value },
        remember: remember.checked,
        ...(!host && { protocol }),
      };
      let saved;
      try {
        saved = await sdk.term.saveHost(host?.id ?? null, config, secrets);
      } catch (err) {
        return fail(err.message);
      }
      dialog.close();
      resolve({ action, host: saved });
    };

    drawFields();
    const dialog = owner.showDialog(h('div', { class: 'tm-dialog', role: 'dialog', 'aria-modal': 'true', onkeydown: e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); finish('connect'); } } },
      h('h2', {}, t(host ? 'remote.host.editTitle' : 'remote.host.newTitle')),
      h('div', { class: 'tm-dialog-body' },
        h('label', { class: 'tm-field' }, h('span', {}, t('remote.host.name')), name),
        h('div', { class: 'tm-grid2b' },
          h('label', { class: 'tm-field' }, h('span', {}, t('remote.host.protocol')), select),
          h('label', { class: 'tm-field' }, h('span', {}, t('remote.host.folder')), folder, h('datalist', { id: 'tm-folders' }, ...folders.map(f => h('option', { value: f }))))),
        fieldsBox,
        h('details', {}, h('summary', {}, t('remote.host.advanced')),
          h('div', { class: 'tm-fields' },
            h('div', { class: 'tm-grid2b' },
              h('label', { class: 'tm-field' }, h('span', {}, t('remote.host.term')), term),
              h('label', { class: 'tm-field' }, h('span', {}, t('remote.host.encoding')), encoding)),
            h('label', { class: 'tm-field' }, h('span', {}, t('remote.host.backspace')), backspace))),
        error),
      h('div', { class: 'tm-dialog-foot' },
        host && h('button', { type: 'button', class: 'tm-btn danger tm-left', onclick: () => finish('delete') }, t('remote.host.delete')),
        h('button', { type: 'button', class: 'tm-btn', onclick: () => { dialog.close(); resolve(null); } }, t('remote.cancel')),
        h('button', { type: 'button', class: 'tm-btn', onclick: () => finish('save') }, t('remote.host.save')),
        h('button', { type: 'button', class: 'tm-btn primary', onclick: () => finish('connect') }, t('remote.host.saveConnect')))), () => resolve(null));
    name.focus();
  });
}

/** Where to record a session: { path, folder, name, colors } or null. */
export function recordDialog(owner, sessionName) {
  const now = new Date();
  const two = n => String(n).padStart(2, '0');
  const stamp = `${now.getFullYear()}-${two(now.getMonth() + 1)}-${two(now.getDate())} ${two(now.getHours())}.${two(now.getMinutes())}`;
  const safe = String(sessionName).replace(/[\\/:*?"<>|\x00-\x1f]+/g, '_').slice(0, 60);
  return new Promise(resolve => {
    const path = h('input', { type: 'text', value: `~/Documenti/${safe} ${stamp}.txt`, spellcheck: 'false' });
    const colors = h('input', { type: 'checkbox' });
    const error = h('p', { class: 'tm-error', role: 'alert', hidden: true });
    const done = value => { dialog.close(); resolve(value); };
    const start = () => {
      const p = path.value.trim().replace(/\/+$/, '');
      const cut = p.lastIndexOf('/');
      const dir = cut > 0 ? fs.resolve(p.slice(0, cut)) : null;
      const name = p.slice(cut + 1);
      if (!dir || dir.type !== 'folder' || !name) { error.textContent = t('remote.record.badPath'); error.hidden = false; return path.focus(); }
      if (fs.children(dir.id).some(n => n.name === name)) { error.textContent = t('remote.record.exists', { name }); error.hidden = false; return path.focus(); }
      done({ path: p, folder: dir.id, name, colors: colors.checked });
    };
    const dialog = owner.showDialog(h('div', { class: 'tm-dialog', role: 'dialog', 'aria-modal': 'true', onkeydown: e => { if (e.key === 'Enter' && e.target === path) { e.preventDefault(); start(); } } },
      h('h2', {}, t('remote.record.title')),
      h('div', { class: 'tm-dialog-body' },
        h('label', { class: 'tm-field' }, h('span', {}, t('remote.record.file')), path, h('small', {}, t('remote.record.hint'))),
        h('label', { class: 'tm-check' }, colors, t('remote.record.colors')),
        error),
      h('div', { class: 'tm-dialog-foot' },
        h('button', { type: 'button', class: 'tm-btn', onclick: () => done(null) }, t('remote.cancel')),
        h('button', { type: 'button', class: 'tm-btn primary', onclick: start }, t('remote.record.start')))), () => resolve(null));
    path.focus();
  });
}
