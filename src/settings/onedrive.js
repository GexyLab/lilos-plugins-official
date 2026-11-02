import { h, kernel, storage, toggle, selectField, textField, actionButton, toast } from '@lilos/sdk';
import * as sdk from '@lilos/sdk';   // net, kernelModules.settings: missing in older lilOS, so not imported by name
import { t } from './i18n.js';

/**
 * Control Panel → OneDrive (only while the kernel module netfs-onedrive runs: the protocol is in
 * net.protocols). Two parts:
 *   - for everyone on this lilOS (admins change it): the app registered on Azure, which accounts may
 *     sign in, and the shared folders (shortcuts in "My files"): the module's settings (module.json
 *     `settings`, kernelModules.settings), drawn from their descriptions; the address to register
 *     on Azure (this page's own) and the steps;
 *   - the user's own: where «Carica su OneDrive e apri» puts files (connection, folder, a file with
 *     the same name) and whether a double click opens Office documents of OneDrive in Office
 *     online (storage 'onedrive', the File Manager reads it).
 */
const MODULE = 'netfs-onedrive';
const KEY = 'onedrive';
const DEFAULTS = { mount: null, folder: '/lilOS', ifExists: 'ask', doubleClick: true };
const CALLBACK = '/api/net/signin/callback';

let state = null;     // the module's settings ({ fields, values, live }), { error }, or null before reading them
let loading = null;
let saving = null;    // a message about the last change: { ok, text }

/** True if this lilOS has OneDrive (the module is running). */
export const hasOneDrive = () => !!sdk.net?.protocols?.some(p => p.id === 'onedrive');

const isAdmin = () => kernel.user?.role === 'admin';
const text = v => sdk.net?.text(v) ?? (typeof v === 'string' ? v : '');

function load(rerender) {
  if (!isAdmin() || !sdk.kernelModules?.settings) {
    state = { fields: [], values: {}, readOnly: true };
    return;
  }
  loading ??= sdk.kernelModules.settings(MODULE)
    .then(s => { state = s; }, err => { state = { error: err.message }; })
    .finally(() => { loading = null; rerender(); });
}

/** Forgets what was read (the tab is opened again). */
export function reloadOneDrive() {
  state = null;
  saving = null;
}

function prefs() {
  const saved = storage.get(KEY, {}) ?? {};
  return { ...DEFAULTS, ...(saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {}) };
}

const setPref = (key, value) => storage.set(KEY, { ...prefs(), [key]: value });

const shown = (f, values) => !f.when || Object.entries(f.when).every(([k, want]) => (Array.isArray(want) ? want.includes(values[k]) : values[k] === want));

/** ctx: { rerender } */
export function oneDriveSections({ rerender }) {
  if (!state) load(rerender);
  return [appSection(rerender), uploadSection(), officeSection()];
}

/** The app on Azure and the module's settings (admins), the address to register, the steps. */
function appSection(rerender) {
  const rows = [];
  if (!state) rows.push({ label: t('common.loading') });
  else if (state.error) rows.push({ label: t('onedrive.app.error'), description: state.error });
  else if (state.readOnly) {
    const ready = !sdk.net.protocols.find(p => p.id === 'onedrive')?.notReady;
    rows.push({ label: t('onedrive.app.status'), description: t('onedrive.app.adminOnly'), control: ready ? t('onedrive.app.ready') : t('onedrive.app.notReady') });
  } else {
    const values = { ...state.values };
    for (const f of state.fields) if (values[f.key] === undefined && f.default !== undefined) values[f.key] = f.default;
    for (const f of state.fields) {
      if (!shown(f, values)) continue;
      rows.push({ label: text(f.label), description: f.hint ? text(f.hint) : undefined, keywords: t('onedrive.keywords'), control: () => settingControl(f, values, rerender) });
    }
    if (saving) rows.push({ label: saving.ok ? t('onedrive.app.saved') : t('onedrive.app.notSaved'), description: saving.text });
  }
  // The address Microsoft sends the sign-in window back to: this page's own
  const redirect = `${location.origin}${CALLBACK}`;
  const usable = location.protocol === 'https:' || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  rows.push({
    label: t('onedrive.redirect.label'),
    description: usable ? t('onedrive.redirect.description') : t('onedrive.redirect.unusable'),
    keywords: t('onedrive.keywords'),
    control: () => h('div', { class: 'od-redirect' }, h('code', {}, redirect),
      actionButton({ label: t('onedrive.copy'), onClick: () => navigator.clipboard?.writeText(redirect).then(() => toast(t('onedrive.copied')), () => {}) })),
  });
  rows.push({
    label: t('onedrive.steps.label'),
    keywords: t('onedrive.keywords'),
    control: () => h('ol', { class: 'od-steps' }, ...[1, 2, 3, 4, 5, 6].map(n => h('li', {}, t(`onedrive.steps.${n}`)))),
  });
  return { title: t('onedrive.app.title'), rows };
}

/** One of the module's settings, saved as soon as it changes. */
function settingControl(f, values, rerender) {
  const save = async value => {
    const next = { ...state.values, [f.key]: value };
    if (value === '' || value === undefined) delete next[f.key];
    try {
      state = await sdk.kernelModules.saveSettings(MODULE, next);
      saving = { ok: true, text: f.key === 'shared' ? t('onedrive.app.signAgain') : '' };
      await sdk.net.load();   // the protocol's state (ready, fields) as it is now
    } catch (err) {
      saving = { ok: false, text: err.message };
    }
    rerender();
  };
  const label = text(f.label);
  if (f.type === 'checkbox') return toggle({ value: values[f.key] === true, label, onChange: save });
  if (f.type === 'select') {
    return selectField({ value: values[f.key], label, options: (f.options ?? []).map(o => ({ value: o.value, label: text(o.label) })), onChange: save });
  }
  const field = textField({ value: values[f.key] ?? '', placeholder: f.placeholder ?? '', label, onChange: v => save(v.trim()) });
  field.classList.add('od-text');
  return field;
}

/** Carica su OneDrive e apri: which connection, which folder, a file with the same name there. */
function uploadSection() {
  const p = prefs();
  const mounts = sdk.net.mounts().filter(m => m.protocol === 'onedrive');
  return {
    title: t('onedrive.upload.title'),
    rows: [
      {
        label: t('onedrive.upload.mount.label'), description: mounts.length ? t('onedrive.upload.mount.description') : t('onedrive.upload.mount.none'),
        keywords: t('onedrive.keywords'),
        control: () => {
          const options = [{ value: '', label: t('onedrive.upload.mount.ask') }, ...mounts.map(m => ({ value: m.id, label: `${m.name} · ${m.values?.account ?? m.address}` }))];
          const el = selectField({ value: mounts.some(m => m.id === p.mount) ? p.mount : '', options, label: t('onedrive.upload.mount.label'), onChange: v => setPref('mount', v || null) });
          el.disabled = !mounts.length;
          return el;
        },
      },
      {
        label: t('onedrive.upload.folder.label'), description: t('onedrive.upload.folder.description'), keywords: t('onedrive.keywords'),
        control: () => {
          const field = textField({ value: p.folder, placeholder: DEFAULTS.folder, label: t('onedrive.upload.folder.label'), onChange: v => setPref('folder', cleanFolder(v)) });
          field.classList.add('od-text');
          return field;
        },
      },
      {
        label: t('onedrive.upload.exists.label'), description: t('onedrive.upload.exists.description'), keywords: t('onedrive.keywords'),
        control: () => selectField({
          value: p.ifExists, label: t('onedrive.upload.exists.label'),
          options: [
            { value: 'ask', label: t('onedrive.upload.exists.ask') },
            { value: 'keep', label: t('onedrive.upload.exists.keep') },
            { value: 'replace', label: t('onedrive.upload.exists.replace') },
          ],
          onChange: v => setPref('ifExists', v),
        }),
      },
    ],
  };
}

/** The double click on an Office document of OneDrive. */
function officeSection() {
  return {
    title: t('onedrive.office.title'),
    rows: [{
      label: t('onedrive.office.doubleClick.label'), description: t('onedrive.office.doubleClick.description'), keywords: t('onedrive.keywords'),
      control: () => toggle({ value: prefs().doubleClick !== false, label: t('onedrive.office.doubleClick.label'), onChange: v => setPref('doubleClick', v) }),
    }],
  };
}

/** 'Lavoro\\2026 ' → '/Lavoro/2026'; '' → the default. */
function cleanFolder(raw) {
  const parts = String(raw ?? '').split(/[/\\]+/).map(s => s.trim()).filter(s => s && s !== '.' && s !== '..');
  return parts.length ? `/${parts.join('/')}` : DEFAULTS.folder;
}

