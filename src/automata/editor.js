import { Window, h, icon, fs, automation, messageBox, comboFromEvent, shortcuts, openMenu } from '@lilos/sdk';
import * as system from '@lilos/system';
import { t, i18n } from './i18n.js';
import { engine, library, load, save, tell } from './store.js';
import { actionOf, actionLabel, paramLabel, appName, appColor, appGlyph, stepChips, valueText, refText, brokenRefs } from './describe.js';

/**
 * Automata's main window: the user's automations on the left, the steps of the chosen one in the
 * middle (on, ask first, ask the values), the options of the selected step on the right.
 * Every change is saved in the automation's file right away.
 */
const SAVE_MS = 400;
const NODE_TYPES = ['file', 'files', 'folder'];
const plain = v => !!v && typeof v === 'object' && !Array.isArray(v);
const TRIGGER_GLYPHS = { time: 'calendar', every: 'redo', login: 'user', folder: 'folderOpen' };

/** A trigger in a few words ('08:30 · lun mar mer', 'ogni 30 min', 'in ~/Download'). */
function triggerText(tr) {
  if (tr.type === 'every') return t('trigger.chipEvery', { n: tr.minutes });
  if (tr.type === 'login') return t('trigger.chipLogin');
  if (tr.type === 'folder') return t('trigger.chipFolder', { path: refText(tr.folder) });
  const monday = new Date(2026, 10, 2);
  const days = tr.days.length && tr.days.length < 7 ? tr.days.map(d => i18n.date(new Date(monday.getTime() + (d - 1) * 864e5), { weekday: 'short' })).join(' ') : t('trigger.everyDay');
  return `${tr.at} · ${days}`;
}

export function createEditor({ args, openWindow } = {}) {
  const win = new Window({ title: 'Automata', icon: 'automation', width: 1060, height: 620, minWidth: 760, minHeight: 440 });
  let current = null;      // id of the automation's file
  let doc = null;
  let selected = 0;
  let saveTimer = null;
  let error = '';

  const side = h('nav', { class: 'au-side', 'aria-label': t('side.label') });
  const main = h('div', { class: 'au-main' });
  const detail = h('aside', { class: 'au-detail', 'aria-label': t('detail.label') });
  const root = h('div', { class: 'au' }, side, main, detail);
  win.body.append(root);

  if (!engine()) {
    root.replaceChildren(h('p', { class: 'au-empty' }, t('needsNewer')));
    return win;
  }

  // ---------- Saving ----------

  const changed = (redraw = 'all') => {
    clearTimeout(saveTimer);
    const id = current, copy = structuredClone(doc);
    saveTimer = setTimeout(() => save(id, copy).catch(err => tell(t('error.save', { error: err.message }), 'error')), SAVE_MS);
    if (redraw === 'all') draw();
    else if (redraw === 'steps') { drawMain(); drawDetail(); }
    else if (redraw === 'detail') drawDetail();
  };
  win.on('destroy', () => {
    if (saveTimer && doc) { clearTimeout(saveTimer); save(current, doc).catch(() => {}); }
  });

  async function open(id) {
    if (saveTimer && doc) { clearTimeout(saveTimer); await save(current, doc).catch(() => {}); saveTimer = null; }
    current = id;
    doc = null;
    error = '';
    selected = 0;
    if (id) {
      try { doc = await load(id); } catch (err) { error = t('error.open', { error: err.message }); }
    }
    win.setTitle(doc ? `Automata — ${doc.name}` : 'Automata');
    draw();
  }

  // ---------- Left: the automations ----------

  function drawSide() {
    const list = library().list();
    side.replaceChildren(
      h('button', { class: 'au-btn rec', type: 'button', onclick: () => system.launch('automata', {}, 'recorder') }, icon('record'), t('side.record')),
      h('h6', {}, t('side.title')),
      h('div', { class: 'au-list', role: 'listbox', 'aria-label': t('side.title') },
        list.map(e => h('button', {
          class: 'au-item', type: 'button', role: 'option', 'aria-selected': String(e.id === current),
          onclick: () => open(e.id),
        }, icon(e.input === 'none' ? 'automation' : e.input === 'folder' ? 'folder' : 'file'),
        h('span', { class: 'au-two' }, h('span', {}, e.name), h('small', {}, [
          t('side.steps', { n: e.steps }),
          e.launch.shortcut ? ` · ${e.launch.shortcut}` : '',
        ].join(''))))),
      ),
      ...(list.length ? [] : [h('p', { class: 'au-hint' }, t('side.none'))]),
      h('span', { class: 'au-grow' }),
      h('p', { class: 'au-hint' }, t('side.where', { folder: engine().FOLDER })),
    );
  }

  // ---------- Middle: the steps ----------

  function drawMain() {
    if (error) return main.replaceChildren(h('div', { class: 'au-empty', role: 'alert' }, error));
    if (!doc) {
      return main.replaceChildren(h('div', { class: 'au-welcome' },
        icon('automation'),
        h('h2', {}, t('welcome.title')),
        h('p', {}, t('welcome.text')),
        h('button', { class: 'au-btn primary', type: 'button', onclick: () => system.launch('automata', {}, 'recorder') }, icon('record'), t('side.record'))));
    }
    const name = h('input', { class: 'au-name', value: doc.name, 'aria-label': t('head.name'), maxlength: 80, spellcheck: 'false' });
    name.addEventListener('change', () => { doc.name = name.value.trim() || doc.name; win.setTitle(`Automata — ${doc.name}`); changed('none'); drawSide(); });
    name.addEventListener('keydown', e => { if (e.key === 'Enter') name.blur(); });
    const desc = h('input', { class: 'au-desc', value: doc.description, placeholder: t('head.descPlaceholder'), 'aria-label': t('head.desc'), maxlength: 500 });
    desc.addEventListener('change', () => { doc.description = desc.value; changed('none'); });
    desc.addEventListener('keydown', e => { if (e.key === 'Enter') desc.blur(); });

    const more = h('button', { class: 'au-icon', type: 'button', title: t('head.more'), 'aria-label': t('head.more'), 'aria-haspopup': 'menu' }, icon('list'));
    more.addEventListener('click', () => {
      const r = more.getBoundingClientRect();
      openMenu(r.left, r.bottom, [
        { label: t('menu.launch'), icon: 'play', action: launchDialog },
        { label: t('menu.show'), icon: 'folderOpen', action: () => system.launch('files', { folder: fs.get(current)?.parent }) },
        '-',
        { label: t('menu.delete'), icon: 'trash', danger: true, action: remove },
      ]);
    });

    main.replaceChildren(
      h('header', { class: 'au-head' },
        h('div', { class: 'au-l1' }, name,
          h('button', { class: 'au-btn', type: 'button', onclick: () => system.launch('automata', { append: current }, 'recorder') }, icon('record'), t('head.recordMore')),
          h('button', { class: 'au-btn primary', type: 'button', onclick: () => run() }, icon('play'), t('head.run')),
          more),
        desc,
        h('div', { class: 'au-chips' }, launchChips())),
      h('div', { class: 'au-steps-h', 'aria-hidden': 'true' },
        h('span', { title: t('col.on') }, icon('check')), h('span', { title: t('col.confirm') }, icon('help')), h('span', { title: t('col.ask') }, icon('pencil')),
        h('span'), h('span', {}, t('col.step'))),
      stepList(),
      h('footer', { class: 'au-foot' },
        h('button', { class: 'au-btn', type: 'button', disabled: !doc.steps.length, onclick: () => run({ from: selected }) }, icon('play'), t('foot.fromHere')),
        h('button', { class: 'au-btn', type: 'button', disabled: !doc.steps.length, onclick: () => run({ from: selected, only: true }) }, icon('arrowRight'), t('foot.only')),
        h('button', { class: 'au-btn', type: 'button', onclick: launchDialog }, icon('gear'), t('foot.launch')),
        h('span', { class: 'au-grow' }),
        h('span', { class: 'au-hint' }, t('foot.hint'))),
    );
  }

  function launchChips() {
    const chips = [];
    const input = { none: t('input.none'), files: t('input.files'), folder: t('input.folder') }[doc.input];
    chips.push(h('span', { class: 'au-chip in' }, icon(doc.input === 'none' ? 'automation' : 'file'), t('chip.input', { what: input })));
    if (doc.launch.shortcut) chips.push(h('span', { class: 'au-chip' }, icon('keyboard'), h('kbd', {}, doc.launch.shortcut)));
    if (doc.launch.menu) chips.push(h('span', { class: 'au-chip' }, icon('list'), doc.launch.ext.length ? t('chip.menuExt', { ext: doc.launch.ext.join(', ') }) : t('chip.menu')));
    if (doc.launch.command) chips.push(h('span', { class: 'au-chip' }, icon('terminal'), `automata run ${doc.launch.command}`));
    for (const tr of doc.launch.triggers ?? []) chips.push(h('span', { class: 'au-chip auto' }, icon(TRIGGER_GLYPHS[tr.type]), triggerText(tr)));
    return chips;
  }

  function askable(step) {
    const def = actionOf(step);
    return def ? Object.entries(def.params).filter(([, p]) => automation.askable.includes(p.type)).map(([name]) => name) : [];
  }

  function stepList() {
    const list = h('div', { class: 'au-steps', role: 'listbox', tabindex: '0', 'aria-label': t('col.step'), 'aria-activedescendant': `au-step-${selected}` });
    if (!doc.steps.length) list.append(h('p', { class: 'au-hint pad' }, t('steps.none')));
    doc.steps.forEach((step, i) => {
      const def = actionOf(step);
      const asking = Object.values(step.fields ?? {}).some(f => f.mode === 'ask');
      const canAsk = askable(step).length > 0;
      const tg = (cls, on, label, glyph, onClick, enabled = true) => {
        const b = h('button', { class: `au-tg ${cls}${on ? ' on' : ''}`, type: 'button', title: label, 'aria-label': label, 'aria-pressed': String(on), tabindex: '-1', disabled: !enabled });
        b.append(icon(glyph));
        b.addEventListener('click', e => { e.stopPropagation(); onClick(); });
        return b;
      };
      const on = h('input', { type: 'checkbox', checked: step.enabled, tabindex: '-1', 'aria-label': t('col.on') });
      on.addEventListener('click', e => e.stopPropagation());
      on.addEventListener('change', () => { step.enabled = on.checked; changed('steps'); });
      const broken = brokenRefs(step, i);
      const row = h('div', {
        class: `au-step${i === selected ? ' sel' : ''}${step.enabled ? '' : ' off'}`, id: `au-step-${i}`, role: 'option', 'aria-selected': String(i === selected),
        onclick: () => { selected = i; drawMain(); drawDetail(); },
      },
      h('span', { class: 'c' }, on),
      h('span', { class: 'c' }, tg('cf', step.confirm, t('col.confirm'), 'help', () => { step.confirm = !step.confirm; changed('steps'); })),
      h('span', { class: 'c' }, tg('ak', asking, canAsk ? t('col.ask') : t('col.askNone'), 'pencil', () => toggleAsk(step), canAsk)),
      h('span', { class: 'c' }, badge(step)),
      h('span', { class: 'what' },
        h('b', {}, def ? actionLabel(step.action) : t('steps.missing', { action: step.action }), h('em', {}, appName(def?.app))),
        h('small', {}, stepChips(step).map(c => h('span', { class: 'au-v-wrap' }, `${c.label} `, h('span', { class: `au-v ${c.kind}` }, c.text))),
          broken ? h('span', { class: 'au-warn' }, icon('warning'), t('steps.broken')) : null)),
      h('span', { class: 'n' }, String(i + 1)));
      list.append(row);
    });
    list.addEventListener('keydown', e => {
      if (!doc.steps.length) return;
      const step = doc.steps[selected];
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const to = Math.max(0, Math.min(doc.steps.length - 1, selected + (e.key === 'ArrowDown' ? 1 : -1)));
        if (e.altKey) return move(selected, to);
        selected = to;
      } else if (e.key === ' ') {
        e.preventDefault();
        step.enabled = !step.enabled;
        return changed('steps'), refocus();
      } else if (e.key === 'Delete') {
        e.preventDefault();
        e.stopPropagation();
        return removeStep(selected);
      } else return;
      drawMain();
      drawDetail();
      refocus();
    });
    return list;
  }

  const refocus = () => main.querySelector('.au-steps')?.focus();

  function toggleAsk(step) {
    const names = askable(step);
    const asking = names.filter(n => step.fields[n]?.mode === 'ask');
    if (asking.length) names.forEach(n => { if (actionOf(step).params[n].type !== 'secret') step.fields[n] = { ...step.fields[n], mode: 'use' }; });
    else {
      const which = names.filter(n => step.changed.includes(n));
      (which.length ? which : names).forEach(n => { step.fields[n] = { ...step.fields[n], mode: 'ask' }; });
    }
    changed('steps');
  }

  function badge(step) {
    const def = actionOf(step);
    const b = h('span', { class: 'au-badge', 'aria-hidden': 'true' }, icon(appGlyph(def?.app, step.action)));
    b.style.background = appColor(def?.app);
    return b;
  }

  /** Moves a step and fixes the references to steps (what they point at stays the same). */
  function reorder(map) {
    const fix = v => {
      if (Array.isArray(v)) return v.map(fix);
      if (!plain(v)) return v;
      if (Number.isInteger(v.step)) return { ...v, step: map.has(v.step) ? map.get(v.step) : -1 };
      if (v.ref) return { ...v, ref: fix(v.ref) };
      return v;
    };
    for (const s of doc.steps) {
      for (const k of Object.keys(s.params)) s.params[k] = fix(s.params[k]);
      if (s.file) s.file = fix(s.file);
    }
  }

  function move(from, to) {
    if (from === to) return;
    const order = doc.steps.map((_, i) => i);
    order.splice(to, 0, order.splice(from, 1)[0]);
    doc.steps = order.map(i => doc.steps[i]);
    reorder(new Map(order.map((old, now) => [old, now])));
    selected = to;
    changed('steps');
    refocus();
  }

  async function removeStep(i) {
    const answer = await messageBox(win, { icon: 'warning', text: t('steps.removeAsk', { step: actionLabel(doc.steps[i].action) }), buttons: ['continue', 'cancel'] });
    if (answer !== 'continue') return refocus();
    const map = new Map(doc.steps.map((_, k) => [k, k < i ? k : k - 1]).filter(([k]) => k !== i));
    doc.steps.splice(i, 1);
    reorder(map);
    selected = Math.min(selected, doc.steps.length - 1);
    changed('steps');
    refocus();
  }

  // ---------- Right: the selected step ----------

  function drawDetail() {
    const step = doc?.steps[selected];
    if (!step) return detail.replaceChildren(h('p', { class: 'au-hint pad' }, doc ? t('detail.none') : ''));
    const def = actionOf(step);
    const sw = (on, title, hint, onChange) => {
      const b = h('button', { class: `au-switch${on ? ' on' : ''}`, type: 'button', role: 'switch', 'aria-checked': String(on), 'aria-label': title });
      b.addEventListener('click', () => onChange(!on));
      return h('div', { class: 'au-sw-row' }, b, h('div', {}, h('b', {}, title), h('small', {}, hint)));
    };
    const parts = [
      h('div', { class: 'au-dh' }, badge(step), h('div', {}, h('b', {}, def ? actionLabel(step.action) : step.action), h('small', {}, t('detail.from', { n: selected + 1, app: appName(def?.app) })))),
      sw(step.enabled, t('detail.on'), t('detail.onHint'), v => { step.enabled = v; changed('steps'); }),
      sw(step.confirm, t('detail.confirm'), t('detail.confirmHint'), v => { step.confirm = v; changed('steps'); }),
    ];
    if (def) {
      const names = Object.keys(def.params).filter(n => n in step.params || def.params[n].type === 'secret' || step.fields[n]?.mode === 'ask');
      const first = names.filter(n => step.changed.includes(n));
      const rest = names.filter(n => !step.changed.includes(n));
      if (step.file) parts.push(h('div', { class: 'au-sec' }, t('field.file')), refField(step, null, def));
      if (first.length) parts.push(h('div', { class: 'au-sec' }, icon('pencil'), t('detail.changed')), ...first.map(n => field(step, n, def)));
      if (rest.length) parts.push(h('div', { class: 'au-sec' }, first.length ? t('detail.others') : t('detail.fields')), ...rest.map(n => field(step, n, def)));
    }
    const onError = h('select', { class: 'au-select', 'aria-label': t('detail.onError') },
      ['stop', 'skip', 'ask'].map(v => h('option', { value: v, selected: step.onError === v }, t(`onError.${v}`))));
    onError.addEventListener('change', () => { step.onError = onError.value; changed('none'); });
    parts.push(h('div', { class: 'au-sec' }, t('detail.onError')), onError);
    detail.replaceChildren(h('div', { class: 'au-db' }, parts));
  }

  /** One param of the step: its value, and whether to use it, ask for it, or fill a template. */
  function field(step, name, def) {
    const p = def.params[name];
    const f = step.fields[name] ?? { mode: 'use' };
    const label = paramLabel(step.action, name, p);
    if (NODE_TYPES.includes(p.type)) return refField(step, name, def);
    const value = step.params[name];
    const was = step.defaults && name in step.defaults && step.changed.includes(name) ? valueText(step.action, name, p, step.defaults[name]) : null;
    const card = h('div', { class: `au-fld${f.mode === 'ask' ? ' asking' : ''}` },
      h('div', { class: 'top' }, h('b', {}, label),
        h('span', { class: 'was' }, p.type === 'secret' ? t('field.secret') : [t('field.recorded', { value: valueText(step.action, name, p, value) }), was ? ` · ${t('field.was', { value: was })}` : ''].join(''))));
    if (!automation.askable.includes(p.type)) return card;
    const modes = p.type === 'secret' ? ['ask'] : p.type === 'text' ? ['use', 'template', 'ask'] : ['use', 'ask'];
    const seg = h('div', { class: 'au-seg', role: 'radiogroup', 'aria-label': label });
    for (const m of modes) {
      const b = h('button', { type: 'button', role: 'radio', 'aria-checked': String(f.mode === m), class: m === 'ask' ? 'ask' : '' },
        m === 'use' ? t('mode.use', { value: shorten(valueText(step.action, name, p, value)) }) : t(`mode.${m}`));
      b.addEventListener('click', () => {
        step.fields[name] = { ...f, mode: m, ...(m === 'template' && !f.template && { template: '{nome}.{est}' }) };
        changed('steps');
      });
      seg.append(b);
    }
    card.append(seg);
    if (f.mode === 'ask') {
      const q = h('input', { class: 'au-input', value: f.question ?? '', placeholder: label, maxlength: 200, 'aria-label': t('field.question') });
      q.addEventListener('change', () => { step.fields[name] = { ...step.fields[name], question: q.value.trim() }; changed('steps'); });
      card.append(h('label', { class: 'au-q' }, h('span', {}, t('field.question')), q));
    }
    if (f.mode === 'template') {
      const tpl = h('input', { class: 'au-input mono', value: f.template ?? '', maxlength: 255, 'aria-label': t('field.template') });
      tpl.addEventListener('change', () => { step.fields[name] = { ...step.fields[name], template: tpl.value }; changed('steps'); });
      const tokens = ['{nome}', '{est}', '{data}', '{ora}', '{n}', '{cartella}'].map(tok => h('button', {
        class: 'au-tok', type: 'button', title: t(`token.${tok.slice(1, -1)}`),
        onclick: () => { tpl.value += tok; tpl.dispatchEvent(new Event('change')); },
      }, tok));
      const node = fs.get(firstNode(step, def));
      const sample = node ? engine().fillTemplate(f.template ?? '', { node, n: 1 }) : '';
      card.append(h('label', { class: 'au-q' }, h('span', {}, t('field.template')), tpl), h('div', { class: 'au-tokens' }, tokens),
        sample ? h('div', { class: 'au-preview' }, icon('check'), `${node.name} → ${sample}`) : null);
    }
    return card;
  }

  /** A param that names files or folders (or the step's own file): where it comes from. */
  function refField(step, name, def) {
    const p = name ? def.params[name] : { type: 'file' };
    const value = name ? step.params[name] : step.file;
    const f = name ? step.fields[name] ?? { mode: 'use' } : { mode: 'use' };
    const label = name ? paramLabel(step.action, name, p) : t('field.file');
    const one = Array.isArray(value) ? value[0] : value;
    const sources = [];
    const fixed = one && !one.input && !Number.isInteger(one.step) ? one : null;
    if (fixed) sources.push({ key: 'fixed', label: t('source.fixed', { path: refText(fixed) }), value: fixed });
    else if (step.recordedFixed?.[name ?? '_file']) sources.push({ key: 'fixed', label: t('source.fixed', { path: refText(step.recordedFixed[name ?? '_file']) }), value: step.recordedFixed[name ?? '_file'] });
    if (doc.input !== 'none') sources.push({ key: 'input', label: t('source.input'), value: { input: true } });
    if (doc.input === 'files' && p.type === 'folder') sources.push({ key: 'inputFolder', label: t('source.inputFolder'), value: { input: true, parent: true } });
    doc.steps.slice(0, selected).forEach((s, k) => {
      if (actionOf(s)?.result === 'file' || ['lilos.move', 'lilos.rename', 'lilos.open'].includes(s.action)) sources.push({ key: `step${k}`, label: t('source.step', { n: k + 1, step: actionLabel(s.action) }), value: { step: k } });
    });
    const keyOf = v => (!v ? '' : v.input ? (v.parent ? 'inputFolder' : 'input') : Number.isInteger(v.step) ? `step${v.step}` : 'fixed');
    const card = h('div', { class: `au-fld${f.mode === 'ask' ? ' asking' : ''}` }, h('div', { class: 'top' }, h('b', {}, label)));
    const many = Array.isArray(value) && value.length > 1;
    if (many) card.append(h('div', { class: 'au-hint' }, valueText(step.action, name, p, value)));
    else {
      const select = h('select', { class: 'au-select', 'aria-label': label }, sources.map(s => h('option', { value: s.key, selected: s.key === keyOf(one) }, s.label)));
      select.addEventListener('change', () => {
        const s = sources.find(x => x.key === select.value);
        // Keep the fixed one, to go back to it
        if (fixed) step.recordedFixed = { ...step.recordedFixed, [name ?? '_file']: fixed };
        const v = p.type === 'files' ? [s.value] : s.value;
        if (name) step.params[name] = v; else step.file = v;
        changed('steps');
      });
      card.append(select);
    }
    if (name && automation.askable.includes(p.type)) {
      const seg = h('div', { class: 'au-seg', role: 'radiogroup', 'aria-label': label });
      for (const m of ['use', 'ask']) {
        const b = h('button', { type: 'button', role: 'radio', 'aria-checked': String(f.mode === m), class: m === 'ask' ? 'ask' : '' }, m === 'use' ? t('mode.useRef') : t('mode.ask'));
        b.addEventListener('click', () => { step.fields[name] = { ...f, mode: m }; changed('steps'); });
        seg.append(b);
      }
      card.append(seg);
    }
    return card;
  }

  const firstNode = (step, def) => {
    const subject = Object.entries(def.params).find(([, p]) => p.subject)?.[0];
    const v = subject ? step.params[subject] : step.file;
    const ref = Array.isArray(v) ? v[0] : v;
    return ref?.id && fs.exists(ref.id) ? ref.id : ref?.path ? fs.resolve(ref.path)?.id ?? null : null;
  };
  const shorten = text => (text.length > 18 ? `${text.slice(0, 17)}…` : text);

  // ---------- Launch, run, remove ----------

  function launchDialog() {
    if (!doc) return;
    const draft = structuredClone({ input: doc.input, launch: { ...doc.launch, triggers: doc.launch.triggers ?? [] } });
    const overlay = h('div', { class: 'au-overlay', role: 'dialog', 'aria-modal': 'true', 'aria-label': t('launch.title', { name: doc.name }) });
    const close = () => { overlay.remove(); refocus(); };
    const inputSeg = h('div', { class: 'au-seg wide', role: 'radiogroup', 'aria-label': t('launch.input') });
    for (const v of ['none', 'files', 'folder']) {
      const b = h('button', { type: 'button', role: 'radio', 'aria-checked': String(draft.input === v) }, t(`input.${v}`));
      b.addEventListener('click', () => {
        draft.input = v;
        // The files menu starts it on what was chosen: nothing to start it on, no entry
        menuOn.disabled = v === 'none';
        if (v === 'none') menuOn.checked = false;
        inputSeg.querySelectorAll('button').forEach(x => x.setAttribute('aria-checked', String(x === b)));
      });
      inputSeg.append(b);
    }
    const menuOn = h('input', { type: 'checkbox', checked: draft.launch.menu && draft.input !== 'none', disabled: draft.input === 'none' });
    const ext = h('input', { class: 'au-input', value: draft.launch.ext.join(', '), placeholder: 'jpg, png', 'aria-label': t('launch.ext') });
    let combo = draft.launch.shortcut;
    const keyBtn = h('button', { class: 'au-btn key', type: 'button' }, combo || t('launch.noKey'));
    keyBtn.addEventListener('click', () => { keyBtn.textContent = t('launch.press'); keyBtn.dataset.listening = '1'; });
    keyBtn.addEventListener('keydown', e => {
      if (!keyBtn.dataset.listening) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.key === 'Escape') { delete keyBtn.dataset.listening; keyBtn.textContent = combo || t('launch.noKey'); return; }
      if (e.key === 'Backspace' || e.key === 'Delete') { combo = ''; delete keyBtn.dataset.listening; keyBtn.textContent = t('launch.noKey'); return; }
      const c = comboFromEvent(e);
      if (!c || !/^(Ctrl|Alt)\+/.test(c)) return;
      const owner = shortcuts.owner?.(c, `automation.${current}`);
      const problem = shortcuts.validate?.(c, `automation.${current}`) || (owner ? t('launch.keyTaken', { name: owner.label ?? owner }) : '');
      if (problem) { keyBtn.textContent = problem; return; }
      combo = c;
      delete keyBtn.dataset.listening;
      keyBtn.textContent = c;
    });
    const command = h('input', { class: 'au-input mono', value: draft.launch.command, placeholder: 'web', maxlength: 40, 'aria-label': t('launch.command') });
    const triggers = triggerEditor(draft.launch.triggers);
    const fail = h('p', { class: 'au-error', role: 'alert' });
    const ok = h('button', { class: 'au-btn primary', type: 'button' }, t('action.save'));
    ok.addEventListener('click', () => {
      const exts = ext.value.split(/[\s,;]+/).map(x => x.replace(/^\./, '').toLowerCase()).filter(Boolean);
      if (exts.some(x => !/^[a-z0-9]{1,10}$/.test(x))) return void (fail.textContent = t('launch.badExt'));
      const cmd = command.value.trim().toLowerCase();
      if (cmd && !/^[a-z][\w.-]{0,39}$/.test(cmd)) return void (fail.textContent = t('launch.badCommand'));
      const taken = library().list().find(e => e.id !== current && cmd && e.launch.command === cmd);
      if (taken) return void (fail.textContent = t('launch.commandTaken', { name: taken.name }));
      const list = triggers.value();
      if (list.some(tr => tr.type === 'folder' && !tr.folder)) return void (fail.textContent = t('trigger.noFolder'));
      if (list.some(tr => tr.type !== 'folder') && draft.input !== 'none') return void (fail.textContent = t('trigger.needsNone'));
      doc.input = draft.input;
      doc.launch = { menu: menuOn.checked && draft.input !== 'none', ext: exts, shortcut: combo, command: cmd, triggers: list };
      close();
      changed();
    });
    overlay.append(h('div', { class: 'au-dialog' },
      h('h3', {}, t('launch.title', { name: doc.name })),
      h('div', { class: 'au-opt' }, h('div', { class: 'au-sec' }, t('launch.input')), inputSeg, h('p', { class: 'au-hint' }, t('launch.inputHint'))),
      h('label', { class: 'au-check' }, menuOn, h('span', {}, h('b', {}, t('launch.menu')), h('small', {}, t('launch.menuHint')))),
      h('label', { class: 'au-q' }, h('span', {}, t('launch.ext')), ext),
      h('div', { class: 'au-q' }, h('span', {}, t('launch.shortcut')), keyBtn, h('small', { class: 'au-hint' }, t('launch.shortcutHint'))),
      h('label', { class: 'au-q' }, h('span', {}, t('launch.command')), command, h('small', { class: 'au-hint' }, t('launch.commandHint'))),
      h('div', { class: 'au-opt' }, h('div', { class: 'au-sec' }, t('trigger.title')), triggers.el, h('p', { class: 'au-hint' }, t('trigger.hint'))),
      fail,
      h('div', { class: 'au-dfoot' }, h('button', { class: 'au-btn', type: 'button', onclick: close }, t('action.cancel')), ok)));
    overlay.addEventListener('keydown', e => { if (e.key === 'Escape' && !keyBtn.dataset.listening) { e.stopPropagation(); close(); } });
    root.append(overlay);
    overlay.querySelector('button[aria-checked="true"]')?.focus();
  }

  /**
   * The triggers of the launch dialog: one row per trigger, added from four buttons. Returns
   * { el, value() → triggers as document.js wants them }.
   */
  function triggerEditor(initial) {
    const rows = initial.map(tr => ({ ...tr, days: [...(tr.days ?? [])] }));
    const el = h('div', { class: 'au-triggers' });
    const monday = new Date(2026, 10, 2);   // a Monday: the names of the days in the system's language
    const dayName = (d, style) => i18n.date(new Date(monday.getTime() + (d - 1) * 864e5), { weekday: style });
    const draw = () => {
      el.replaceChildren(...rows.map((tr, i) => {
        const remove = h('button', { class: 'au-icon', type: 'button', title: t('trigger.remove'), 'aria-label': t('trigger.remove'), onclick: () => { rows.splice(i, 1); draw(); } }, icon('x'));
        let body;
        if (tr.type === 'time') {
          const at = h('input', { class: 'au-input', type: 'time', value: tr.at ?? '08:00', 'aria-label': t('trigger.at') });
          at.addEventListener('change', () => { tr.at = at.value; });
          tr.at = at.value;
          const days = h('div', { class: 'au-days', role: 'group', 'aria-label': t('trigger.days') }, [1, 2, 3, 4, 5, 6, 7].map(d => {
            const b = h('button', { type: 'button', class: 'au-day', 'aria-pressed': String(tr.days.includes(d)), title: dayName(d, 'long'), 'aria-label': dayName(d, 'long') }, dayName(d, 'narrow'));
            b.addEventListener('click', () => {
              tr.days = tr.days.includes(d) ? tr.days.filter(x => x !== d) : [...tr.days, d].sort();
              b.setAttribute('aria-pressed', String(tr.days.includes(d)));
            });
            return b;
          }));
          const catchUp = h('input', { type: 'checkbox', checked: tr.catchUp === true });
          catchUp.addEventListener('change', () => { tr.catchUp = catchUp.checked; });
          body = [h('div', { class: 'au-l1' }, icon('calendar'), h('b', {}, t('trigger.time')), at, days),
            h('label', { class: 'au-check small' }, catchUp, h('span', {}, t('trigger.catchUp')))];
        } else if (tr.type === 'every') {
          const minutes = h('input', { class: 'au-input num', type: 'number', min: 5, max: 1440, value: tr.minutes ?? 30, 'aria-label': t('trigger.minutes') });
          minutes.addEventListener('change', () => { tr.minutes = Math.max(5, Math.min(1440, Math.round(Number(minutes.value) || 30))); minutes.value = tr.minutes; });
          tr.minutes ??= 30;
          body = [h('div', { class: 'au-l1' }, icon(TRIGGER_GLYPHS.every), h('b', {}, t('trigger.every')), minutes, h('span', {}, t('trigger.minutesUnit')))];
        } else if (tr.type === 'login') {
          body = [h('div', { class: 'au-l1' }, icon('user'), h('b', {}, t('trigger.login')))];
        } else {
          const where = h('code', { class: 'au-where' }, tr.folder ? refText(tr.folder) : t('trigger.noFolderYet'));
          const pick = h('button', { class: 'au-btn', type: 'button' }, t('trigger.chooseFolder'));
          pick.addEventListener('click', async () => {
            const node = await system.pickFile?.(openWindow, { kind: 'folder', title: t('trigger.chooseFolder') });
            if (!node) return;
            tr.folder = { id: node.id, path: fs.path(node.id) };
            where.textContent = refText(tr.folder);
          });
          body = [h('div', { class: 'au-l1' }, icon('folderOpen'), h('b', {}, t('trigger.folder')), where, pick),
            h('small', { class: 'au-hint' }, t('trigger.folderHint'))];
        }
        return h('div', { class: 'au-trigger' }, h('div', { class: 'au-tbody' }, body), remove);
      }),
      h('div', { class: 'au-l1 wrap' }, ['time', 'every', 'login', 'folder'].map(type => h('button', {
        class: 'au-btn', type: 'button', disabled: rows.length >= 10,
        onclick: () => { rows.push(type === 'time' ? { type, at: '08:00', days: [], catchUp: false } : type === 'every' ? { type, minutes: 30 } : { type }); draw(); },
      }, icon('plus'), t(`trigger.add.${type}`)))));
    };
    draw();
    return {
      el,
      value: () => rows.map(tr => (tr.type === 'time' ? { type: 'time', at: tr.at, days: tr.days, catchUp: !!tr.catchUp }
        : tr.type === 'every' ? { type: 'every', minutes: tr.minutes } : tr.type === 'login' ? { type: 'login' } : { type: 'folder', folder: tr.folder ?? null })),
    };
  }

  async function run({ from = 0, only = false } = {}) {
    if (!doc) return;
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; await save(current, doc).catch(() => {}); }
    system.launch('automata', { automation: current, from, only }, 'run');
  }

  async function remove() {
    const answer = await messageBox(win, { icon: 'warning', text: t('menu.deleteAsk', { name: doc.name }), buttons: ['continue', 'cancel'] });
    if (answer !== 'continue') return;
    clearTimeout(saveTimer);
    saveTimer = null;
    fs.trash([current]);
    doc = null;
    current = null;
    draw();
  }

  function draw() {
    drawSide();
    drawMain();
    drawDetail();
  }

  library().on('change', drawSide);
  const offActions = automation.on('actions', () => { if (doc) drawMain(); });
  win.on('destroy', () => { library().off('change', drawSide); offActions(); });
  win.on('launch', a => { if (a?.file) open(a.file); });
  win.getState = () => (current ? { file: current } : {});
  library().ready().then(() => open(args?.file && fs.exists(args.file) ? args.file : library().list()[0]?.id ?? null));
  return win;
}
