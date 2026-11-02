import { h, kernel, toggle, selectField, textField, actionButton, toast } from '@lilos/sdk';
import * as sdk from '@lilos/sdk';   // net, kernelModules.settings: missing in older lilOS, so not imported by name
import { t } from './i18n.js';

/**
 * Control Panel → Google Drive, Google Foto, Azure Blob Storage, NFS: one tab for each of these
 * protocols while its kernel module runs (the protocol is in net.protocols). The module's settings
 * (module.json `settings`, kernelModules.settings), drawn from their descriptions and saved as soon
 * as they change, for admins; then what helps to set them: the addresses to register with the
 * provider and the steps. A secret setting (type 'password', the client secret) is never shown:
 * it says whether it is set, and can be replaced or removed.
 */
const TABS = {
  gdrive: { module: 'netfs-gdrive', icon: 'cloud', google: true },
  gphotos: { module: 'netfs-gphotos', icon: 'image', google: true },
  azblob: { module: 'netfs-azblob', icon: 'cloud', entra: true },
  nfs: { module: 'netfs-nfs', icon: 'disk' },
};
const CALLBACK = '/api/net/signin/callback';
const BY_HAND = 'http://127.0.0.1:53682/';
const STEPS = { gdrive: 6, gphotos: 6, azblob: 5, nfs: 4 };

const states = new Map();   // tab → { fields, values, secrets } | { error } | { readOnly }
const loading = new Map();
const said = new Map();     // tab → { ok, text } of the last change

const isAdmin = () => kernel.user?.role === 'admin';
const text = v => sdk.net?.text(v) ?? (typeof v === 'string' ? v : '');
const shown = (f, values) => !f.when || Object.entries(f.when).every(([k, want]) => (Array.isArray(want) ? want.includes(values[k]) : values[k] === want));

/** The tabs of the protocols this lilOS has: [{ id, icon, label, description, sections }]. */
export function cloudTabs({ rerender }) {
  return Object.entries(TABS).filter(([id]) => sdk.net?.protocols?.some(p => p.id === id)).map(([id, tab]) => ({
    id, icon: tab.icon,
    get label() { return t(`cloud.${id}.label`); },
    get description() { return t(`cloud.${id}.description`); },
    sections: () => sections(id, rerender),
  }));
}

/** Forgets what was read of a tab (it is opened again). */
export function reloadCloud(id) {
  states.delete(id);
  said.delete(id);
}

function load(id, rerender) {
  if (!isAdmin() || !sdk.kernelModules?.settings) {
    states.set(id, { readOnly: true });
    return;
  }
  if (loading.has(id)) return;
  loading.set(id, sdk.kernelModules.settings(TABS[id].module)
    .then(s => states.set(id, s), err => states.set(id, { error: err.message }))
    .finally(() => { loading.delete(id); rerender(); }));
}

function sections(id, rerender) {
  if (!states.has(id)) load(id, rerender);
  const out = [settingsSection(id, rerender)];
  if (TABS[id].google || TABS[id].entra) out.push(addressSection(id));
  out.push({ title: t(`cloud.${id}.steps.title`), rows: [{ label: t(`cloud.${id}.steps.label`), control: () => h('ol', { class: 'od-steps' }, ...Array.from({ length: STEPS[id] }, (_, i) => h('li', {}, t(`cloud.${id}.steps.${i + 1}`)))) }] });
  return out;
}

function settingsSection(id, rerender) {
  const state = states.get(id);
  const rows = [];
  if (!state) rows.push({ label: t('common.loading') });
  else if (state.error) rows.push({ label: t('cloud.error'), description: state.error });
  else if (state.readOnly) {
    const ready = !sdk.net.protocols.find(p => p.id === id)?.notReady;
    rows.push({ label: t('cloud.status'), description: t('cloud.adminOnly'), control: ready ? t('cloud.ready') : t('cloud.notReady') });
  } else {
    const values = { ...state.values };
    for (const f of state.fields) if (values[f.key] === undefined && f.default !== undefined && f.type !== 'password') values[f.key] = f.default;
    for (const f of state.fields) {
      if (!shown(f, values)) continue;
      rows.push({ label: text(f.label), description: f.hint ? text(f.hint) : undefined, keywords: t(`cloud.${id}.keywords`), control: () => control(id, f, values, rerender) });
    }
    if (id === 'nfs') rows.push({ label: t('cloud.nfs.you'), description: t('cloud.nfs.you.description'), control: () => h('code', {}, kernel.user?.username ?? '') });
    const last = said.get(id);
    if (last) rows.push({ label: last.ok ? t('cloud.saved') : t('cloud.notSaved'), description: last.text });
  }
  return { title: t(`cloud.${id}.settings`), rows };
}

/** One setting, saved as soon as it changes. */
function control(id, f, values, rerender) {
  const state = states.get(id);
  const save = async value => {
    // Secret settings: left out keeps them, null removes them
    const next = Object.fromEntries(Object.entries(state.values).filter(([k]) => state.fields.some(x => x.key === k && x.type !== 'password')));
    if (f.type === 'password') next[f.key] = value;
    else if (value === '' || value === undefined) delete next[f.key];
    else next[f.key] = value;
    try {
      states.set(id, await sdk.kernelModules.saveSettings(TABS[id].module, next));
      said.set(id, { ok: true, text: '' });
      await sdk.net.load();   // the protocol's state (ready) as it is now
    } catch (err) {
      said.set(id, { ok: false, text: err.message });
    }
    rerender();
  };
  const label = text(f.label);
  if (f.type === 'checkbox') return toggle({ value: values[f.key] === true, label, onChange: save });
  if (f.type === 'select') return selectField({ value: values[f.key], label, options: (f.options ?? []).filter(o => !o.disabled).map(o => ({ value: o.value, label: text(o.label) })), onChange: save });
  if (f.type === 'textarea') {
    const area = h('textarea', { class: 'ctl-text cloud-area', rows: '5', spellcheck: 'false', placeholder: f.placeholder ?? '', 'aria-label': label });
    area.value = values[f.key] ?? '';
    area.addEventListener('change', () => save(area.value));
    return area;
  }
  if (f.type === 'password') {
    const set = state.secrets?.includes(f.key);
    const input = h('input', { class: 'ctl-text od-text', type: 'password', autocomplete: 'new-password', placeholder: set ? t('cloud.secret.set') : t('cloud.secret.empty'), 'aria-label': label });
    input.addEventListener('change', () => { if (input.value.trim()) save(input.value.trim()); });
    return h('div', { class: 'cloud-secret' }, input, set ? actionButton({ label: t('cloud.secret.remove'), danger: true, onClick: () => save(null) }) : null);
  }
  const field = textField({ value: values[f.key] ?? '', placeholder: f.placeholder ?? '', label, onChange: v => save(v.trim()) });
  field.classList.add('od-text');
  return field;
}

/** The addresses to register with the provider: this page's (sign-in window) and the one by hand. */
function addressSection(id) {
  const copy = value => actionButton({ label: t('cloud.copy'), onClick: () => navigator.clipboard?.writeText(value).then(() => toast(t('cloud.copied')), () => {}) });
  const redirect = `${location.origin}${CALLBACK}`;
  const usable = location.protocol === 'https:' || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  return {
    title: t('cloud.addresses.title'),
    rows: [
      {
        label: t('cloud.redirect.label'),
        description: usable ? t(`cloud.redirect.${TABS[id].google ? 'google' : 'entra'}`) : t('cloud.redirect.unusable'),
        control: () => h('div', { class: 'od-redirect' }, h('code', {}, redirect), copy(redirect)),
      },
      {
        label: t('cloud.byHand.label'),
        description: t(`cloud.byHand.${TABS[id].google ? 'google' : 'entra'}`),
        control: () => h('div', { class: 'od-redirect' }, h('code', {}, BY_HAND), copy(BY_HAND)),
      },
    ],
  };
}
