import { h, icon, storage, trackDrag } from '@lilos/sdk';

const STATE_KEY = 'files-panels';   // { info: { open, width }, preview: { open, width } }
export const MIN_WIDTH = 180;
const MAX_WIDTH = 720;

/**
 * A panel on the right of the File Manager (information, preview): a header with its title and
 * a close button, then its body. It is resized by dragging its left edge (or with ← → on it,
 * Home / End for the limits; double click: default width) and shown or hidden with setOpen().
 * Open and width are remembered (STATE_KEY), one entry per panel.
 *
 * `room()` is the widest the panel can be now (the window decides, see FileBrowser#fit);
 * `onLayout()` runs when it opens, closes or changes width.
 */
export class SidePanel {
  open;
  width;          // the width the user chose; the one shown can be less (see show)

  constructor({ key, title, resizeLabel, closeLabel, width, open = false, room, onLayout, signal }) {
    this.key = key;
    this.defaultWidth = width;
    this.room = room;
    this.onLayout = onLayout;
    const saved = storage.get(STATE_KEY, {})?.[key];
    this.open = typeof saved?.open === 'boolean' ? saved.open : open;
    this.width = Number.isFinite(saved?.width) ? clamp(saved.width, MIN_WIDTH, MAX_WIDTH) : width;

    this.split = h('div', {
      class: 'fm-split', role: 'separator', tabindex: '0', 'aria-orientation': 'vertical',
      'aria-label': resizeLabel, 'aria-valuemin': MIN_WIDTH,
    });
    this.body = h('div', { class: 'fm-panel-body' });
    this.el = h('aside', { class: `fm-panel fm-panel-${key}`, 'aria-label': title, hidden: !this.open },
      this.split,
      h('div', { class: 'fm-panel-head' },
        h('span', { class: 'fm-panel-title' }, title),
        h('button', { class: 'fm-btn', type: 'button', title: closeLabel, 'aria-label': closeLabel, onclick: () => this.setOpen(false) }, icon('x'))),
      this.body);
    this.#bind(signal);
  }

  setOpen(open) {
    if (this.open === !!open) return;
    this.open = !!open;
    this.el.hidden = !this.open;
    this.#save();
    this.onLayout();
  }

  toggle() { this.setOpen(!this.open); }

  /** Width shown now (0 if closed). */
  get shown() { return this.open ? this.el.offsetWidth : 0; }

  /** Shows the panel `px` wide (less than `width` when the window is narrow). */
  show(px) {
    this.el.style.width = `${px}px`;
    this.split.setAttribute('aria-valuenow', px);
    this.split.setAttribute('aria-valuemax', Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, this.room())));
  }

  /** The width the user chose, within the limits and the room there is. */
  resize(px, save = true) {
    this.width = Math.round(clamp(px, MIN_WIDTH, Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, this.room()))));
    if (save) this.#save();
    this.onLayout();
  }

  #bind(signal) {
    // The panel is on the right, so dragging left makes it wider
    this.split.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      e.preventDefault();
      const start = this.el.offsetWidth;
      this.el.classList.add('resizing');
      trackDrag(e, {
        threshold: 0,
        onMove: dx => this.resize(start - dx, false),
        onEnd: () => { this.el.classList.remove('resizing'); this.#save(); },
      });
    }, { signal });
    this.split.addEventListener('dblclick', () => this.resize(this.defaultWidth), { signal });
    this.split.addEventListener('keydown', e => {
      const step = e.shiftKey ? 48 : 16;
      const now = this.el.offsetWidth;
      const to = { ArrowLeft: now + step, ArrowRight: now - step, Home: MIN_WIDTH, End: Infinity }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      this.resize(to);
    }, { signal });
  }

  #save() {
    const all = storage.get(STATE_KEY, {});
    storage.set(STATE_KEY, { ...(all && typeof all === 'object' ? all : {}), [this.key]: { open: this.open, width: this.width } });
  }
}

const clamp = (v, min, max) => Math.max(min, Math.min(v, max));
