import { h, fs, segmented, selectField, slider, toggle, actionButton } from '@lilos/sdk';
import { pickFile } from '@lilos/system';
import { glyph } from './glyphs.js';
import { FORMATS, supported } from './image.js';
import { t } from './i18n.js';

/**
 * A small dialog over the app (inside its window, which stays usable only through it): title,
 * rows, Annulla and a main button. Esc or Annulla resolve null; the main button resolves
 * collect() (return undefined from it to keep the dialog open). Enter in a field is the main button.
 */
function openSheet(host, { title, symbol, rows, okLabel, collect, focus }) {
  return new Promise(resolve => {
    const previous = document.activeElement;
    const done = value => {
      scrim.remove();
      previous?.focus?.();
      resolve(value);
    };
    const ok = () => {
      const value = collect();
      if (value !== undefined) done(value);
    };
    const dialog = h('div', { class: 'ph-dialog', role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
      h('div', { class: 'ph-dialog-head' }, glyph(symbol), h('span', {}, title)),
      h('div', { class: 'ph-dialog-body' }, rows),
      h('div', { class: 'ph-dialog-foot' },
        actionButton({ label: t('action.cancel'), onClick: () => done(null) }),
        actionButton({ label: okLabel, primary: true, onClick: ok })));
    const scrim = h('div', { class: 'ph-scrim' }, dialog);
    scrim.addEventListener('keydown', e => {
      e.stopPropagation();   // the app's own keys (tools, arrows) do not apply behind the dialog
      if (e.key === 'Escape') done(null);
      else if (e.key === 'Enter' && e.target.matches('input:not([type="checkbox"]):not([type="range"])')) { e.preventDefault(); ok(); }
      else if (e.key === 'Tab') {
        // Keep the focus inside the dialog
        const all = [...dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), select')].filter(el => el.tabIndex !== -1);
        const i = all.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); all.at(-1)?.focus(); }
        else if (!e.shiftKey && i === all.length - 1) { e.preventDefault(); all[0]?.focus(); }
      }
    });
    scrim.addEventListener('pointerdown', e => { if (e.target === scrim) e.preventDefault(); });
    host.append(scrim);
    (focus ?? dialog.querySelector('input, button'))?.focus();
  });
}

const row = (label, ...control) => h('div', { class: 'ph-row' }, h('span', { class: 'ph-row-label' }, label), ...control);
const number = (value, label) => h('input', { class: 'ph-number', type: 'number', min: 1, step: 1, value, 'aria-label': label });

/** Width and height of the image: pixels or percent, proportions locked or not. Resolves { width, height, quality } or null. */
export function resizeDialog(host, { width, height }) {
  let unit = 'px', locked = true;
  const w = number(width, t('resize.width')), hgt = number(height, t('resize.height'));
  const unitW = h('span', { class: 'ph-unit' }, 'px'), unitH = h('span', { class: 'ph-unit' }, 'px');
  const result = h('div', { class: 'ph-hint' });
  const lock = h('button', { class: 'ph-lock', type: 'button', 'aria-pressed': 'true', title: t('resize.keepRatio'), 'aria-label': t('resize.keepRatio'), onclick: () => {
    locked = !locked;
    lock.setAttribute('aria-pressed', String(locked));
    if (locked) sync('w');
  } }, glyph('link'));
  let quality = 'high';
  const target = () => {
    const a = Number(w.value), b = Number(hgt.value);
    return unit === 'px' ? [Math.round(a), Math.round(b)] : [Math.round(width * a / 100), Math.round(height * b / 100)];
  };
  const show = () => {
    const [tw, th] = target();
    result.textContent = tw > 0 && th > 0 ? t('resize.result', { width, height, newWidth: tw, newHeight: th }) : t('resize.missing');
  };
  const sync = from => {
    if (locked) {
      if (unit === '%') (from === 'w' ? hgt : w).value = (from === 'w' ? w : hgt).value;
      else if (from === 'w') hgt.value = Math.max(1, Math.round(Number(w.value) * height / width));
      else w.value = Math.max(1, Math.round(Number(hgt.value) * width / height));
    }
    show();
  };
  w.addEventListener('input', () => sync('w'));
  hgt.addEventListener('input', () => sync('h'));
  const units = segmented({
    value: 'px', label: t('resize.unit'), options: [{ value: 'px', label: t('resize.pixels') }, { value: '%', label: t('resize.percent') }],
    onChange: v => {
      const [tw, th] = target();
      unit = v;
      unitW.textContent = unitH.textContent = v;
      w.value = v === 'px' ? tw : Math.round(tw / width * 100);
      hgt.value = v === 'px' ? th : Math.round(th / height * 100);
      show();
    },
  });
  show();
  return openSheet(host, {
    title: t('resize.title'), symbol: 'resize', okLabel: t('resize.ok'), focus: w,
    rows: [
      row(t('resize.unit'), units),
      h('div', { class: 'ph-row' }, h('span', { class: 'ph-row-label' }, t('resize.size')),
        h('div', { class: 'ph-size' },
          h('label', { class: 'ph-size-field' }, w, unitW),
          lock,
          h('label', { class: 'ph-size-field' }, hgt, unitH))),
      row(t('resize.quality'), selectField({
        value: quality, label: t('resize.quality'),
        options: [{ value: 'high', label: t('resize.quality.high') }, { value: 'medium', label: t('resize.quality.medium') }, { value: 'pixel', label: t('resize.quality.pixel') }],
        onChange: v => { quality = v; },
      })),
      result,
    ],
    collect: () => {
      const [tw, th] = target();
      if (!(tw > 0 && th > 0) || tw > 16384 || th > 16384) {
        result.textContent = t('resize.outOfRange');
        return undefined;
      }
      return tw === width && th === height ? null : { width: tw, height: th, quality };
    },
  });
}

/**
 * A copy in another format: format, quality, name, folder. Resolves
 * { format, quality, name, folder, open } or null.
 */
export function convertDialog(host, openWindow, { name, folder, format: initial = 'png', title = t('convert.title'), okLabel = t('action.save') }) {
  const formats = FORMATS.filter(supported);
  let format = formats.find(f => f.id === initial) ?? formats[0];
  let folderId = folder;
  let quality = 90;
  let open = true;
  const base = name.replace(/\.[^.]+$/, '') || t('file.defaultName');
  const nameField = h('input', { class: 'ph-text', type: 'text', spellcheck: 'false', 'aria-label': t('convert.fileName') });
  nameField.value = `${base}.${format.ext}`;
  const note = h('div', { class: 'ph-hint' });
  const qualityRow = row(t('convert.quality'), slider({ value: quality, min: 10, max: 100, unit: '%', label: t('convert.quality'), onChange: v => { quality = v; } }));
  const qualityInput = qualityRow.querySelector('input');
  qualityInput.addEventListener('input', () => { quality = Number(qualityInput.value); });
  const folderLabel = h('span', { class: 'ph-folder-name' });
  const folderButton = h('button', { class: 'ph-folder', type: 'button', onclick: async () => {
    const node = await pickFile(openWindow, { kind: 'folder', title: t('convert.pickFolder.title'), text: t('convert.pickFolder.text') });
    if (node) { folderId = node.id; showFolder(); }
  } }, glyph('folder'), folderLabel);
  const showFolder = () => {
    const node = fs.get(folderId);
    folderLabel.textContent = node ? (folderId === fs.root ? t('folder.home') : node.name) : t('convert.chooseFolder');
    folderButton.title = node ? fs.path(folderId) : '';
  };
  const showFormat = () => {
    qualityRow.classList.toggle('off', !format.lossy);
    qualityInput.disabled = !format.lossy;
    note.textContent = format.note;
  };
  showFolder();
  showFormat();
  return openSheet(host, {
    title, symbol: 'convert', okLabel, focus: nameField,
    rows: [
      row(t('convert.format'), segmented({
        value: format.id, label: t('convert.format'), options: formats.map(f => ({ value: f.id, label: f.label })),
        onChange: v => {
          format = formats.find(f => f.id === v);
          nameField.value = `${nameField.value.replace(/\.[^.]+$/, '') || base}.${format.ext}`;
          showFormat();
        },
      })),
      qualityRow,
      row(t('convert.name'), nameField),
      h('div', { class: 'ph-row' }, h('span', { class: 'ph-row-label' }, t('convert.folder')), folderButton),
      h('div', { class: 'ph-row' }, h('span', { class: 'ph-row-label' }, t('convert.openAfter')), toggle({ value: open, label: t('convert.openAfterLabel'), onChange: v => { open = v; } })),
      note,
    ],
    collect: () => {
      const node = fs.get(folderId);
      const fileName = nameField.value.trim();
      if (!node || node.type !== 'folder') { note.textContent = t('convert.noFolder'); return undefined; }
      if (!fileName || fileName.includes('/')) { note.textContent = t('convert.badName'); nameField.focus(); return undefined; }
      return { format, quality: quality / 100, name: fileName, folder: folderId, open };
    },
  });
}
