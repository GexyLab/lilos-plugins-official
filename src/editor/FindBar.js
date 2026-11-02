import { Emitter, h, icon, uid, actionButton } from '@lilos/sdk';
import { t } from './i18n.js';

/**
 * The find bar above the text (Ctrl+F; Ctrl+H also shows the replace row). Only shows the fields
 * and reports what the user asks; the Editor finds, selects and replaces (EditorApp.js, search.js).
 *   query → { find, replace, matchCase, wholeWord, regex }   setStatus(text, { error })
 *
 * Keyboard: Enter next match, Shift+Enter previous; in the replace field Enter replaces and
 * Ctrl+Alt+Enter replaces all; Esc closes. Every control is reached with Tab; the count is read
 * out by screen readers (aria-live).
 *
 * Events: 'query' (the text to find or an option changed) · 'next' · 'previous' · 'replace' · 'replaceAll' · 'close'
 */
export class FindBar extends Emitter {
  #options = { matchCase: false, wholeWord: false, regex: false };

  constructor({ signal }) {
    super();
    const statusId = `ed-find-status-${uid()}`;
    this.findInput = h('input', {
      class: 'ctl-text ed-find-input', type: 'text', spellcheck: 'false', autocomplete: 'off',
      placeholder: t('find.find'), 'aria-label': t('find.find'), 'aria-describedby': statusId,
    });
    this.replaceInput = h('input', {
      class: 'ctl-text ed-find-input', type: 'text', spellcheck: 'false', autocomplete: 'off',
      placeholder: t('find.replaceWith'), 'aria-label': t('find.replaceWith'),
    });
    this.status = h('span', { class: 'ed-find-status', id: statusId, role: 'status', 'aria-live': 'polite' });

    const tool = (glyph, label, onclick) => h('button', { class: 'ed-btn', type: 'button', title: label, 'aria-label': label, onclick }, icon(glyph));
    const option = (key, short, label) => {
      const button = h('button', { class: 'ed-find-opt', type: 'button', title: label, 'aria-label': label, 'aria-pressed': 'false', onclick: () => {
        this.#options[key] = !this.#options[key];
        button.setAttribute('aria-pressed', String(this.#options[key]));
        this.emit('query');
      } }, short);
      return button;
    };
    this.toggle = h('button', {
      class: 'ed-btn ed-find-toggle', type: 'button', title: t('find.toggleReplace'), 'aria-label': t('find.toggleReplace'), 'aria-expanded': 'false',
      onclick: () => { this.#showReplace(this.replaceRow.hidden); (this.replaceRow.hidden ? this.findInput : this.replaceInput).focus(); },
    }, icon('arrowRight'));

    this.replaceRow = h('div', { class: 'ed-find-row', hidden: true },
      h('span', { class: 'ed-find-indent' }),
      this.replaceInput,
      actionButton({ label: t('find.replace'), onClick: () => this.emit('replace') }),
      actionButton({ label: t('find.replaceAll'), onClick: () => this.emit('replaceAll') }));
    this.el = h('div', { class: 'ed-find', role: 'search', 'aria-label': t('find.label'), hidden: true },
      h('div', { class: 'ed-find-row' },
        this.toggle,
        this.findInput,
        option('matchCase', t('find.matchCase.short'), t('find.matchCase')),
        option('wholeWord', t('find.wholeWord.short'), t('find.wholeWord')),
        option('regex', t('find.regex.short'), t('find.regex')),
        this.status,
        tool('arrowUp', t('find.previous'), () => this.emit('previous')),
        tool('arrowDown', t('find.next'), () => this.emit('next')),
        tool('x', t('find.close'), () => this.emit('close'))),
      this.replaceRow);

    this.findInput.addEventListener('input', () => this.emit('query'), { signal });
    this.findInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.ctrlKey && !e.altKey && !e.metaKey) { e.preventDefault(); this.emit(e.shiftKey ? 'previous' : 'next'); }
    }, { signal });
    this.replaceInput.addEventListener('keydown', e => {
      if (e.key !== 'Enter' || e.shiftKey || e.metaKey) return;
      e.preventDefault();
      if (e.ctrlKey && e.altKey) this.emit('replaceAll');
      else if (!e.ctrlKey && !e.altKey) this.emit('replace');
    }, { signal });
    this.el.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopPropagation();
      this.emit('close');
    }, { signal });
  }

  get isOpen() { return !this.el.hidden; }

  get query() {
    return { find: this.findInput.value, replace: this.replaceInput.value, ...this.#options };
  }

  /**
   * Shows the bar (with the replace row when `replace`) and puts the focus in it; `text` (the
   * selection of the document) becomes what to find.
   */
  open({ replace = false, text = null } = {}) {
    const wasOpen = this.isOpen;
    this.el.hidden = false;
    if (replace) this.#showReplace(true);
    else if (!wasOpen) this.#showReplace(false);
    if (text != null) this.findInput.value = text;
    // Ctrl+H with something to find already: straight to what replaces it
    const field = replace && this.findInput.value ? this.replaceInput : this.findInput;
    field.focus();
    field.select();
    this.emit('query');
  }

  close() {
    this.el.hidden = true;
    this.setStatus('');
  }

  /** The count («3 of 12») or what is wrong (an invalid regular expression). */
  setStatus(text, { error = false } = {}) {
    if (this.status.textContent !== text) this.status.textContent = text;
    this.status.classList.toggle('error', error);
    if (error) this.findInput.setAttribute('aria-invalid', 'true');
    else this.findInput.removeAttribute('aria-invalid');
  }

  #showReplace(on) {
    this.replaceRow.hidden = !on;
    this.toggle.setAttribute('aria-expanded', String(on));
    this.toggle.replaceChildren(icon(on ? 'arrowDown' : 'arrowRight'));
  }
}
