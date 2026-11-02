import { h, icon } from './ui.js';

/**
 * The dialogs of Remote Terminal, drawn inside its window (app.showDialog): the server key to
 * confirm, a host to add or change, a recording to start, the app's information and credits.
 * Each returns a promise of what the user chose (null: cancelled).
 */

/** A server key or certificate shown for the first time, or changed since it was confirmed. */
export function trustDialog(app, trust) {
  const t = app.t;
  return new Promise(resolve => {
    const done = ok => { dialog.close(); resolve(ok); };
    const changed = trust.changed === true;
    const body = [
      changed
        ? h('div', { class: 'note red' }, h('b', {}, icon('warn'), t('trust.changedTitle')), t('trust.changedText'))
        : h('p', {}, t(trust.kind === 'tls' ? 'trust.firstTls' : 'trust.first')),
      h('div', { class: 'field' }, h('span', {}, t('trust.server')), h('div', { class: 'fp' }, trust.host || '')),
      h('div', { class: 'field' }, h('span', {}, t(trust.kind === 'tls' ? 'trust.certificate' : 'trust.key')), h('div', { class: 'fp' }, trust.text || trust.fingerprint)),
      changed && trust.previous && h('div', { class: 'field' }, h('span', {}, t('trust.previous')), h('div', { class: 'fp' }, trust.previous)),
    ];
    const accept = h('button', { type: 'button', class: `btn ${changed ? 'danger' : 'primary'}`, onclick: () => done(true) }, t(changed ? 'trust.acceptChanged' : 'trust.accept'));
    const cancel = h('button', { type: 'button', class: `btn${changed ? ' primary' : ''}`, onclick: () => done(false) }, t('common.cancel'));
    const dialog = app.showDialog(h('div', { class: `dialog${changed ? ' alarm' : ''}`, role: 'alertdialog', 'aria-modal': 'true' },
      h('h2', {}, icon(changed ? 'warn' : 'shield'), t(changed ? 'trust.changedHeading' : 'trust.heading', { host: trust.host || '' })),
      h('div', { class: 'body' }, ...body),
      h('div', { class: 'foot' }, cancel, accept)), () => done(false));
    (changed ? cancel : accept).focus();
  });
}

/** Whether a field is shown with these values (its `when`), as the kernel decides it. */
const shown = (f, values) => !f.when || Object.entries(f.when).every(([k, want]) => (Array.isArray(want) ? want.includes(values[k]) : values[k] === want));

/**
 * A host to add (host null; prefill: { protocol, values } from a quick connection) or change.
 * Saves it itself. Resolves { action: 'save' | 'connect' | 'delete', host } or null.
 */
export function hostDialog(app, host = null, prefill = null) {
  const t = app.t, text = label => app.text(label);
  const { protocols, encodings, hosts } = app.data;
  return new Promise(resolve => {
    let protocol = host?.protocol ?? prefill?.protocol ?? protocols[0]?.id;
    const values = { ...(host?.values ?? prefill?.values ?? {}) };
    const secret = {};
    const settings = { term: 'xterm-256color', encoding: 'utf-8', backspace: 'del', ...(host?.settings ?? {}) };
    const name = h('input', { type: 'text', value: host?.name ?? '', maxLength: 60, required: true, 'aria-label': t('host.name') });
    const folders = [...new Set(hosts.map(x => x.folder).filter(Boolean))];
    const folder = h('input', { type: 'text', value: host?.folder ?? '', maxLength: 60, list: 'rt-folders', 'aria-label': t('host.folder'), placeholder: t('host.folderNone') });
    const select = h('select', { 'aria-label': t('host.protocol'), disabled: !!host }, ...protocols.map(p => h('option', { value: p.id, selected: p.id === protocol }, text(p.label))));
    const remember = h('input', { type: 'checkbox', checked: host ? host.remembered : true });
    const fieldsBox = h('div', { style: 'display:grid;gap:11px' });
    const term = h('input', { type: 'text', value: settings.term, maxLength: 40, spellcheck: 'false' });
    const encoding = h('select', {}, ...encodings.map(e => h('option', { value: e, selected: e === settings.encoding }, e.toUpperCase())));
    const backspace = h('select', {}, h('option', { value: 'del', selected: settings.backspace === 'del' }, t('host.backspaceDel')), h('option', { value: 'bs', selected: settings.backspace === 'bs' }, t('host.backspaceBs')));
    const error = h('p', { class: 'error', role: 'alert', hidden: true });
    const proto = () => protocols.find(p => p.id === protocol);

    const input = f => {
      const id = `rt-f-${f.key}`;
      const set = v => { if (f.secret) secret[f.key] = v; else values[f.key] = v; };
      const current = f.secret ? '' : values[f.key] ?? f.default ?? '';
      let el;
      if (f.type === 'select') {
        el = h('select', { id, onchange: () => { set(el.value); drawFields(); } }, ...(f.options ?? []).map(o => h('option', { value: o.value, selected: o.value === current }, text(o.label))));
      } else if (f.type === 'checkbox') {
        el = h('input', { id, type: 'checkbox', checked: current === true, onchange: () => { set(el.checked); drawFields(); } });
        return h('label', { class: 'check' }, el, text(f.label));
      } else if (f.type === 'textarea') {
        el = h('textarea', { id, oninput: () => set(el.value) }, String(current));
      } else if (f.type === 'file') {
        // A file of lilOS (a private key): its path here, its content goes to the kernel
        el = h('input', { id, type: 'text', spellcheck: 'false', placeholder: host?.remembered ? t('host.kept') : '~/.ssh/id_ed25519', oninput: () => { secret[`${f.key}:path`] = el.value.trim(); } });
      } else {
        const type = f.type === 'password' ? 'password' : f.type === 'number' ? 'number' : 'text';
        el = h('input', {
          id, type, value: f.secret ? '' : String(current), spellcheck: 'false', autocomplete: 'off',
          placeholder: f.secret && host?.remembered ? t('host.kept') : f.placeholder ?? '',
          ...(f.type === 'number' && { min: f.min, max: f.max }),
          oninput: () => set(f.type === 'number' ? (el.value === '' ? '' : Number(el.value)) : el.value),
        });
      }
      return h('label', { class: 'field', for: id }, h('span', {}, text(f.label)), el, f.hint && h('small', {}, text(f.hint)));
    };

    const drawFields = () => {
      const p = proto();
      if (!p) return fieldsBox.replaceChildren(h('p', {}, t('host.noProtocols')));
      // Defaults first: other fields depend on them (when)
      for (const f of p.fields) if (!f.secret && f.default !== undefined && values[f.key] === undefined) values[f.key] = f.default;
      const fields = p.fields.filter(f => shown(f, values));
      const rows = [];
      for (let i = 0; i < fields.length; i++) {
        const f = fields[i], next = fields[i + 1];
        // Server and port on one line
        if (f.key === 'host' && next?.key === 'port') { rows.push(h('div', { class: 'grid2' }, input(f), input(next))); i++; } else rows.push(input(f));
      }
      const secure = p.secure ?? (protocol === 'telnet' ? values.tls === true : false);
      if (!secure) rows.push(h('div', { class: 'note' }, h('b', {}, icon('unlock'), t('host.insecureTitle')), t('host.insecureText')));
      if (p.fields.some(f => f.secret)) rows.push(h('label', { class: 'check' }, remember, t('host.remember')));
      fieldsBox.replaceChildren(...rows);
    };
    select.addEventListener('change', () => {
      protocol = select.value;
      for (const k of Object.keys(values)) if (!proto()?.fields.some(f => f.key === k && !f.secret)) delete values[k];
      drawFields();
    });

    const finish = async action => {
      error.hidden = true;
      if (action === 'delete') {
        try {
          await app.lilos.term.removeHost(host.id);
        } catch (err) { error.textContent = err.message; error.hidden = false; return; }
        dialog.close();
        return resolve({ action, host });
      }
      const p = proto();
      const secrets = {};
      try {
        for (const f of p.fields.filter(x => x.secret && shown(x, values))) {
          if (f.type === 'file') {
            const path = secret[`${f.key}:path`];
            if (path) secrets[f.key] = await app.lilos.files.read(path.startsWith('~') ? path : `~/${path.replace(/^\/+/, '')}`);
          } else if (secret[f.key]) secrets[f.key] = secret[f.key];
        }
      } catch (err) {
        error.textContent = t('host.keyUnreadable', { error: err.message });
        error.hidden = false;
        return;
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
        saved = await app.lilos.term.saveHost(host?.id ?? null, config, secrets);
      } catch (err) {
        error.textContent = err.message;
        error.hidden = false;
        return;
      }
      dialog.close();
      resolve({ action, host: saved });
    };

    drawFields();
    // Not a <form>: the sandbox of an isolated app blocks forms. Enter in a field saves and connects
    const dialog = app.showDialog(h('div', { class: 'dialog', role: 'dialog', 'aria-modal': 'true', onkeydown: e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); finish('connect'); } } },
      h('h2', {}, t(host ? 'host.editTitle' : 'host.newTitle')),
      h('div', { class: 'body' },
        h('label', { class: 'field' }, h('span', {}, t('host.name')), name),
        h('div', { class: 'grid2b' },
          h('label', { class: 'field' }, h('span', {}, t('host.protocol')), select),
          h('label', { class: 'field' }, h('span', {}, t('host.folder')), folder, h('datalist', { id: 'rt-folders' }, ...folders.map(f => h('option', { value: f }))))),
        fieldsBox,
        h('details', {}, h('summary', {}, t('host.advanced')),
          h('div', { style: 'display:grid;gap:11px' },
            h('div', { class: 'grid2b' },
              h('label', { class: 'field' }, h('span', {}, t('host.term')), term),
              h('label', { class: 'field' }, h('span', {}, t('host.encoding')), encoding)),
            h('label', { class: 'field' }, h('span', {}, t('host.backspace')), backspace))),
        error),
      h('div', { class: 'foot' },
        host && h('button', { type: 'button', class: 'btn danger left', onclick: () => finish('delete') }, t('host.delete')),
        h('button', { type: 'button', class: 'btn', onclick: () => { dialog.close(); resolve(null); } }, t('common.cancel')),
        h('button', { type: 'button', class: 'btn', onclick: () => finish('save') }, t('host.save')),
        h('button', { type: 'button', class: 'btn primary', onclick: () => finish('connect') }, t('host.saveConnect')))), () => resolve(null));
    name.focus();
  });
}

/** Where to record a session: { path, colors } or null. */
export function recordDialog(app, sessionName) {
  const t = app.t;
  const now = new Date();
  const two = n => String(n).padStart(2, '0');
  const stamp = `${now.getFullYear()}-${two(now.getMonth() + 1)}-${two(now.getDate())} ${two(now.getHours())}.${two(now.getMinutes())}`;
  const safe = String(sessionName).replace(/[\\/:*?"<>|\x00-\x1f]+/g, '_').slice(0, 60);
  return new Promise(resolve => {
    const path = h('input', { type: 'text', value: `~/Documenti/${safe} ${stamp}.txt`, spellcheck: 'false' });
    const colors = h('input', { type: 'checkbox' });
    const done = value => { dialog.close(); resolve(value); };
    const start = () => {
      const p = path.value.trim();
      if (!/^~\/.+[^/]$/.test(p)) return path.focus();
      done({ path: p, colors: colors.checked });
    };
    const dialog = app.showDialog(h('div', { class: 'dialog', role: 'dialog', 'aria-modal': 'true', onkeydown: e => { if (e.key === 'Enter' && e.target === path) { e.preventDefault(); start(); } } },
    h('h2', {}, icon('rec'), t('record.title')),
    h('div', { class: 'body' },
      h('label', { class: 'field' }, h('span', {}, t('record.file')), path, h('small', {}, t('record.hint'))),
      h('label', { class: 'check' }, colors, t('record.colors'))),
    h('div', { class: 'foot' },
      h('button', { type: 'button', class: 'btn', onclick: () => done(null) }, t('common.cancel')),
      h('button', { type: 'button', class: 'btn primary', onclick: start }, t('record.start')))), () => resolve(null));
    path.focus();
  });
}

/** The app's information: version, what it can do, credits (third-party code and the protocols). */
export function aboutDialog(app) {
  const t = app.t;
  const credit = (name, what) => h('div', {}, h('b', {}, name), h('span', {}, what));
  const dialog = app.showDialog(h('div', { class: 'dialog', role: 'dialog', 'aria-modal': 'true' },
    h('h2', {}, icon('info'), t('about.title', { version: app.lilos.app.version })),
    h('div', { class: 'body' },
      h('p', {}, t('about.text')),
      h('div', { class: 'credits' },
        h('b', {}, t('about.credits')),
        credit('xterm.js 6.0.0', t('about.xterm')),
        credit('@xterm/addon-fit, @xterm/addon-search, @xterm/addon-unicode11', t('about.addons')),
        credit('ssh2 1.17.0', t('about.ssh2')),
        credit('Telnet', 'RFC 854, 856, 858, 1073, 1091, 1572'),
        credit('rlogin', 'RFC 1282'),
        credit('SUPDUP', t('about.supdup')))),
    h('div', { class: 'foot' }, h('button', { type: 'button', class: 'btn primary', onclick: () => dialog.close() }, t('common.close')))));
  dialog.focus();
}
