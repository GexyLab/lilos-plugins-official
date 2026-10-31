import { h, icon, appIcon, fs, settings, toggle, selectField, textField, actionButton, openMenu, toast } from '@lilos/sdk';
import { apps, startup, pickFile } from '@lilos/system';
import { servicesOptionRow } from './services.js';
import { t } from './i18n.js';

/**
 * Sistema → Avvio: what starts by itself (lilOS's apps/startup.js, and the kernel's services).
 *   Opzioni   the switches, and the way out (?avvio=no)
 *   Servizi   services.js
 *   App       the apps that open, each window entry point with its params; "Aggiungi…" at the end
 */
export function startupOptionsSections({ rerender }) {
  return [
    {
      title: t('startup.auto.title'),
      rows: [servicesOptionRow(rerender), {
        label: t('startup.openApps.label'),
        description: t('startup.openApps.description'),
        keywords: t('startup.openApps.keywords'),
        control: toggle({ value: settings.get('startupApps'), label: t('startup.openApps.label'), onChange: v => settings.set('startupApps', v) }),
      }],
    },
    {
      title: t('startup.trouble.title'),
      rows: [{
        label: t('startup.safe.label'),
        description: t('startup.safe.description'),
        keywords: t('startup.safe.keywords'),
        control: startup.skipped ? t('startup.safe.active') : '',
      }],
    },
  ];
}

/** ctx: { openWindow, rerender } */
export function startupAppsSections(ctx) {
  const list = startup.apps().filter(item => apps.some(a => a.id === item.app));
  return [{
    title: t('startup.apps.title'),
    content: () => h('div', { class: 'su-apps' },
      h('p', { class: 'su-hint' }, t('startup.apps.hint')),
      list.length ? list.map(item => appCard(item, ctx)) : h('p', { class: 'su-empty' }, t('startup.apps.none')),
      addRow(list, ctx)),
  }];
}

function appCard(item, ctx) {
  const app = apps.find(a => a.id === item.app);
  const windows = startup.windowEntries(app.id);
  const enabled = new Map(item.entries.map(e => [e.entry, e.params]));
  const on = windows.filter(w => enabled.has(w.entry)).length;
  const head = h('div', { class: 'st-row su-head' },
    appIcon(app, 'su-icon'),
    h('div', { class: 'st-label' }, h('b', {}, app.name),
      h('small', {}, windows.length === 1 ? t('startup.apps.oneEntry') : t('startup.apps.entries', { on, n: windows.length }))),
    actionButton({ label: t('startup.apps.remove'), onClick: () => { startup.removeApp(app.id); ctx.rerender(); } }));
  const rows = windows.flatMap(w => {
    const active = enabled.has(w.entry);
    const row = h('div', { class: 'st-row su-entry' },
      toggle({
        value: active, label: `${app.name}: ${w.label}`,
        onChange: v => {
          try { startup.setEntry(app.id, w.entry, v); } catch (err) { toast(err.message); }
          ctx.rerender();
        },
      }),
      h('div', { class: 'st-label' }, h('b', {}, w.label), h('small', {}, h('code', {}, w.entry))));
    return active ? [row, paramsForm(app, w, enabled.get(w.entry), ctx)] : [row];
  });
  return h('div', { class: 'st-card su-app' }, head, rows);
}

/** The params of one enabled entry point: a form when it declares them, a JSON field when not. Saved on each change. */
function paramsForm(app, w, saved, { openWindow }) {
  const label = t('startup.params.of', { entry: w.label, app: app.name });
  if (!w.params) {
    const hint = t('startup.params.undescribed');
    const note = h('span', { class: 'su-note' }, hint);
    const area = h('textarea', { class: 'su-json', spellcheck: 'false', placeholder: '{ }', 'aria-label': t('startup.params.jsonOf', { name: label }) });
    area.value = Object.keys(saved).length ? JSON.stringify(saved) : '';
    area.addEventListener('change', () => {
      const text = area.value.trim();
      try {
        let value;
        try { value = text ? JSON.parse(text) : {}; } catch { throw new Error(t('startup.params.invalidJson')); }
        startup.setParams(app.id, w.entry, value);
        area.removeAttribute('aria-invalid');
        note.classList.remove('bad');
        note.textContent = hint;
      } catch (err) {
        area.setAttribute('aria-invalid', 'true');
        note.classList.add('bad');
        note.textContent = t('startup.params.notSaved', { error: err.message });
      }
    });
    return h('div', { class: 'su-params' }, h('span', { class: 'su-plabel' }, t('startup.params.json')), h('span'), area, note);
  }

  let values = { ...saved };
  const set = (name, value) => {
    const next = { ...values };
    if (value === '' || value == null) delete next[name];
    else next[name] = value;
    try {
      startup.setParams(app.id, w.entry, next);
      values = next;
      return true;
    } catch (err) {
      toast(err.message, { timeout: 6000 });
      return false;
    }
  };
  const fields = Object.entries(w.params).flatMap(([name, p]) => {
    const current = Object.hasOwn(values, name) ? values[name] : p.default;
    const aria = `${p.label} (${label})`;
    let control;
    if (p.type === 'boolean') {
      control = toggle({ value: current === true, label: aria, onChange: v => set(name, v) });
    } else if (p.type === 'choice') {
      const options = [{ value: '', label: '—' }, ...p.options.map(o => ({ value: String(o.value), label: o.label }))];
      control = selectField({
        value: current === undefined ? '' : String(current), options, label: aria,
        onChange: v => set(name, v === '' ? null : p.options.find(o => String(o.value) === v)?.value),
      });
    } else if (p.type === 'number') {
      control = h('input', { class: 'ctl-text su-number', type: 'number', min: p.min, max: p.max, 'aria-label': aria });
      control.value = current ?? '';
      control.addEventListener('change', () => {
        if (!set(name, control.value === '' ? null : Number(control.value))) control.value = values[name] ?? '';
      });
    } else if (p.type === 'file' || p.type === 'folder') {
      control = pathField(p, current, aria, v => set(name, v), openWindow);
    } else {
      control = textField({ value: current ?? '', label: aria, onChange: v => { if (!set(name, v)) control.value = values[name] ?? ''; } });
      if (p.maxLength) control.maxLength = p.maxLength;
    }
    return [h('label', { class: 'su-plabel', title: p.description ?? '' }, p.label), h('div', { class: 'su-field' }, control)];
  });
  return h('div', { class: 'su-params' }, fields);
}

/** A file or folder chosen with lilOS's picker: its path, "Scegli…" and a button to clear it. */
function pathField(p, id, label, onChange, openWindow) {
  const folder = p.type === 'folder';
  const shown = h('input', { class: 'ctl-text', type: 'text', readonly: true, placeholder: folder ? t('startup.path.noFolder') : t('startup.path.noFile'), 'aria-label': label });
  const show = nodeId => {
    shown.value = !nodeId ? '' : fs.exists(nodeId) ? fs.path(nodeId) : t('startup.path.gone');
  };
  show(id);
  const choose = actionButton({
    label: t('common.choose'),
    onClick: async () => {
      const node = await pickFile(openWindow, { kind: folder ? 'folder' : 'file', title: p.label });
      if (node && onChange(node.id)) show(node.id);
    },
  });
  const clear = h('button', { class: 'ctl-btn su-clear', type: 'button', title: t('common.remove'), 'aria-label': t('startup.path.clear', { name: p.label }) }, icon('x'));
  clear.addEventListener('click', () => { if (onChange(null)) show(null); });
  return h('div', { class: 'su-path' }, shown, choose, clear);
}

function addRow(list, { rerender }) {
  const button = actionButton({
    label: t('common.addMore'),
    onClick: () => {
      const candidates = apps.filter(a => a.load && !list.some(x => x.app === a.id) && startup.windowEntries(a.id).length)
        .sort((a, b) => a.name.localeCompare(b.name));
      if (!candidates.length) return toast(t('startup.apps.allAdded'));
      const r = button.getBoundingClientRect();
      openMenu(r.left, r.bottom + 4, candidates.map(a => ({
        label: a.name, icon: a.glyph,
        action: () => {
          try { startup.addApp(a.id); } catch (err) { toast(err.message); }
          rerender();
        },
      })));
    },
  });
  return h('div', { class: 'st-row su-add' },
    h('span', { class: 'su-plus' }, icon('plus')),
    h('div', { class: 'st-label' }, h('b', {}, t('startup.apps.add')),
      h('small', {}, t('startup.apps.addDescription'))),
    button);
}
