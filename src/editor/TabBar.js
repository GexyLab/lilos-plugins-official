import { Emitter, h, icon } from '@lilos/sdk';
import { t } from './i18n.js';

/**
 * The tabs of the open documents, above the text. Only shows them and reports what the user asks;
 * the Editor decides (EditorApp.js).
 *   render([{ key, label, detail?, title, dirty }], activeKey)
 *
 * Mouse: click selects, middle click closes, drag moves, double click on the free space opens a
 * new document, the wheel scrolls. Keyboard (tablist): ← → Home End select, Delete closes, the
 * menu key or Shift F10 opens the menu.
 *
 * Events: 'select' key · 'close' key · 'new' · 'menu' { key, x, y } · 'move' { key, index }
 */
export class TabBar extends Emitter {
  #tabs = new Map();      // key → element
  #order = [];
  #active = null;
  #drag = null;           // { key, el, startX, moved, index }

  constructor({ signal }) {
    super();
    this.list = h('div', { class: 'ed-tabs', role: 'tablist', 'aria-label': t('tabs.label') });
    const add = h('button', { class: 'ed-btn ed-tab-new', type: 'button', title: t('toolbar.newDocument'), 'aria-label': t('toolbar.newDocument'), onclick: () => this.emit('new') }, icon('plus'));
    this.el = h('div', { class: 'ed-tabbar' }, this.list, add);

    this.list.addEventListener('pointerdown', e => this.#onPointerDown(e), { signal });
    this.list.addEventListener('auxclick', e => {
      const tab = e.target.closest('.ed-tab');
      if (e.button === 1 && tab) { e.preventDefault(); this.emit('close', tab.dataset.key); }
    }, { signal });
    // A middle click must not start the browser's autoscroll
    this.list.addEventListener('mousedown', e => { if (e.button === 1) e.preventDefault(); }, { signal });
    this.list.addEventListener('dblclick', e => { if (e.target === this.list) this.emit('new'); }, { signal });
    this.list.addEventListener('contextmenu', e => {
      const tab = e.target.closest('.ed-tab');
      if (!tab) return;
      e.preventDefault();
      this.emit('menu', { key: tab.dataset.key, x: e.clientX, y: e.clientY });
    }, { signal });
    this.list.addEventListener('wheel', e => {
      if (!e.deltaY || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      this.list.scrollLeft += e.deltaY;
    }, { signal, passive: false });
    this.list.addEventListener('keydown', e => this.#onKey(e), { signal });
    // A narrower window: the active tab stays in view
    const fit = new ResizeObserver(() => this.#reveal());
    fit.observe(this.list);
    signal.addEventListener('abort', () => fit.disconnect());
  }

  render(items, activeKey) {
    const keys = items.map(it => it.key);
    for (const [key, el] of this.#tabs) if (!keys.includes(key)) { el.remove(); this.#tabs.delete(key); }
    for (const it of items) {
      let el = this.#tabs.get(it.key);
      if (!el) {
        el = this.#create(it.key);
        this.#tabs.set(it.key, el);
      }
      const on = it.key === activeKey;
      el.setAttribute('aria-selected', String(on));
      el.tabIndex = on ? 0 : -1;
      el.classList.toggle('on', on);
      el.classList.toggle('dirty', it.dirty);
      el.title = it.title;
      const [name, detail, close] = el.children;
      if (name.textContent !== it.label) name.textContent = it.label;
      detail.textContent = it.detail ?? '';
      detail.hidden = !it.detail;
      const label = t('tabs.close', { name: it.label });
      if (close.getAttribute('aria-label') !== label) { close.setAttribute('aria-label', label); close.title = label; }
    }
    if (keys.join('\n') !== this.#order.join('\n')) {
      this.list.append(...keys.map(k => this.#tabs.get(k)));
      this.#order = keys;
    }
    if (activeKey !== this.#active) {
      this.#active = activeKey;
      this.#reveal();
    }
  }

  /** Scrolls the list (only the list: not the windows around it) to show the active tab. */
  #reveal() {
    const el = this.#tabs.get(this.#active);
    if (!el) return;
    const { offsetLeft: left, offsetWidth: width } = el;
    if (left < this.list.scrollLeft) this.list.scrollLeft = left;
    else if (left + width > this.list.scrollLeft + this.list.clientWidth) this.list.scrollLeft = left + width - this.list.clientWidth;
  }

  /** Puts the keyboard focus on the active tab. */
  focus() {
    this.#tabs.get(this.#active)?.focus({ preventScroll: true });
  }

  #create(key) {
    const close = h('button', { class: 'ed-tab-close', type: 'button', tabindex: '-1' }, icon('x'));
    close.addEventListener('click', e => { e.stopPropagation(); this.emit('close', key); });
    close.addEventListener('pointerdown', e => e.stopPropagation());
    return h('div', { class: 'ed-tab', role: 'tab', dataset: { key } },
      h('span', { class: 'ed-tab-name' }), h('span', { class: 'ed-tab-detail' }), close);
  }

  #onKey(e) {
    const tab = e.target.closest?.('.ed-tab');
    if (!tab) return;
    const i = this.#order.indexOf(tab.dataset.key);
    const to = { ArrowLeft: i - 1, ArrowRight: i + 1, Home: 0, End: this.#order.length - 1 }[e.key];
    if (to !== undefined) {
      e.preventDefault();
      const key = this.#order[Math.max(0, Math.min(this.#order.length - 1, to))];
      this.emit('select', key);
      this.#tabs.get(key)?.focus({ preventScroll: true });
    } else if (e.key === 'Delete') {
      e.preventDefault();
      this.emit('close', tab.dataset.key);
    } else if (e.key === 'ContextMenu' || (e.key === 'F10' && e.shiftKey)) {
      e.preventDefault();
      const r = tab.getBoundingClientRect();
      this.emit('menu', { key: tab.dataset.key, x: r.left, y: r.bottom + 2 });
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.emit('select', tab.dataset.key);
    }
  }

  // ---------- Selecting and moving with the mouse ----------

  #onPointerDown(e) {
    const tab = e.target.closest('.ed-tab');
    if (!tab || e.button !== 0) return;
    const key = tab.dataset.key;
    this.emit('select', key);
    this.#drag = { key, el: tab, startX: e.clientX, moved: false, index: this.#order.indexOf(key) };
    tab.setPointerCapture(e.pointerId);
    const move = ev => this.#dragMove(ev);
    const end = () => {
      tab.removeEventListener('pointermove', move);
      tab.removeEventListener('pointerup', end);
      tab.removeEventListener('pointercancel', end);
      this.#dragEnd();
    };
    tab.addEventListener('pointermove', move);
    tab.addEventListener('pointerup', end);
    tab.addEventListener('pointercancel', end);
  }

  #dragMove(e) {
    const d = this.#drag;
    if (!d) return;
    if (!d.moved && Math.abs(e.clientX - d.startX) < 5) return;
    d.moved = true;
    d.el.classList.add('dragging');
    // The place among the other tabs: before the first one whose middle is right of the pointer
    const others = this.#order.filter(k => k !== d.key).map(k => this.#tabs.get(k));
    let index = others.findIndex(el => {
      const r = el.getBoundingClientRect();
      return e.clientX < r.left + r.width / 2;
    });
    if (index === -1) index = others.length;
    if (index !== d.index) {
      d.index = index;
      this.list.insertBefore(d.el, others[index] ?? null);
    }
    // Near the edges the list scrolls
    const box = this.list.getBoundingClientRect();
    if (e.clientX < box.left + 16) this.list.scrollLeft -= 8;
    else if (e.clientX > box.right - 16) this.list.scrollLeft += 8;
  }

  #dragEnd() {
    const d = this.#drag;
    this.#drag = null;
    if (!d?.moved) return;
    d.el.classList.remove('dragging');
    // Back in the order known until the Editor renders the new one
    this.list.append(...this.#order.map(k => this.#tabs.get(k)));
    if (d.index !== this.#order.indexOf(d.key)) this.emit('move', { key: d.key, index: d.index });
  }
}
