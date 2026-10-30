import { h, fs, segmented, selectField, slider, toggle, actionButton } from '@lilos/sdk';
import { pickFile } from '@lilos/system';
import { glyph } from './glyphs.js';
import { FORMATS, supported } from './image.js';

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
        actionButton({ label: 'Annulla', onClick: () => done(null) }),
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
  const w = number(width, 'Larghezza'), hgt = number(height, 'Altezza');
  const unitW = h('span', { class: 'ph-unit' }, 'px'), unitH = h('span', { class: 'ph-unit' }, 'px');
  const result = h('div', { class: 'ph-hint' });
  const lock = h('button', { class: 'ph-lock', type: 'button', 'aria-pressed': 'true', title: 'Mantieni le proporzioni', 'aria-label': 'Mantieni le proporzioni', onclick: () => {
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
    result.textContent = tw > 0 && th > 0 ? `Ora ${width} × ${height} px, poi ${tw} × ${th} px` : 'Scrivi una larghezza e un’altezza';
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
    value: 'px', label: 'Unità', options: [{ value: 'px', label: 'Pixel' }, { value: '%', label: 'Percentuale' }],
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
    title: 'Ridimensiona l’immagine', symbol: 'resize', okLabel: 'Ridimensiona', focus: w,
    rows: [
      row('Unità', units),
      h('div', { class: 'ph-row' }, h('span', { class: 'ph-row-label' }, 'Dimensioni'),
        h('div', { class: 'ph-size' },
          h('label', { class: 'ph-size-field' }, w, unitW),
          lock,
          h('label', { class: 'ph-size-field' }, hgt, unitH))),
      row('Qualità', selectField({
        value: quality, label: 'Qualità',
        options: [{ value: 'high', label: 'Alta' }, { value: 'medium', label: 'Media, più veloce' }, { value: 'pixel', label: 'Pixel netti' }],
        onChange: v => { quality = v; },
      })),
      result,
    ],
    collect: () => {
      const [tw, th] = target();
      if (!(tw > 0 && th > 0) || tw > 16384 || th > 16384) {
        result.textContent = 'Larghezza e altezza vanno da 1 a 16384 pixel';
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
export function convertDialog(host, openWindow, { name, folder, format: initial = 'png', title = 'Converti e salva una copia', okLabel = 'Salva' }) {
  const formats = FORMATS.filter(supported);
  let format = formats.find(f => f.id === initial) ?? formats[0];
  let folderId = folder;
  let quality = 90;
  let open = true;
  const base = name.replace(/\.[^.]+$/, '') || 'Immagine';
  const nameField = h('input', { class: 'ph-text', type: 'text', spellcheck: 'false', 'aria-label': 'Nome del file' });
  nameField.value = `${base}.${format.ext}`;
  const note = h('div', { class: 'ph-hint' });
  const qualityRow = row('Qualità', slider({ value: quality, min: 10, max: 100, unit: '%', label: 'Qualità', onChange: v => { quality = v; } }));
  const qualityInput = qualityRow.querySelector('input');
  qualityInput.addEventListener('input', () => { quality = Number(qualityInput.value); });
  const folderLabel = h('span', { class: 'ph-folder-name' });
  const folderButton = h('button', { class: 'ph-folder', type: 'button', onclick: async () => {
    const node = await pickFile(openWindow, { kind: 'folder', title: 'Scegli la cartella', text: 'La copia viene salvata in questa cartella.' });
    if (node) { folderId = node.id; showFolder(); }
  } }, glyph('folder'), folderLabel);
  const showFolder = () => {
    const node = fs.get(folderId);
    folderLabel.textContent = node ? (folderId === fs.root ? 'Home' : node.name) : 'Scegli…';
    folderButton.title = node ? fs.path(folderId) : '';
  };
  const showFormat = () => {
    qualityRow.classList.toggle('off', !format.lossy);
    qualityInput.disabled = !format.lossy;
    note.textContent = `${format.label}: ${format.note.charAt(0).toLowerCase()}${format.note.slice(1)}`;
  };
  showFolder();
  showFormat();
  return openSheet(host, {
    title, symbol: 'convert', okLabel, focus: nameField,
    rows: [
      row('Formato', segmented({
        value: format.id, label: 'Formato', options: formats.map(f => ({ value: f.id, label: f.label })),
        onChange: v => {
          format = formats.find(f => f.id === v);
          nameField.value = `${nameField.value.replace(/\.[^.]+$/, '') || base}.${format.ext}`;
          showFormat();
        },
      })),
      qualityRow,
      row('Nome', nameField),
      h('div', { class: 'ph-row' }, h('span', { class: 'ph-row-label' }, 'Cartella'), folderButton),
      h('div', { class: 'ph-row' }, h('span', { class: 'ph-row-label' }, 'Poi aprila'), toggle({ value: open, label: 'Apri la copia dopo il salvataggio', onChange: v => { open = v; } })),
      note,
    ],
    collect: () => {
      const node = fs.get(folderId);
      const fileName = nameField.value.trim();
      if (!node || node.type !== 'folder') { note.textContent = 'Scegli una cartella'; return undefined; }
      if (!fileName || fileName.includes('/')) { note.textContent = 'Scrivi un nome valido, senza «/»'; nameField.focus(); return undefined; }
      return { format, quality: quality / 100, name: fileName, folder: folderId, open };
    },
  });
}
