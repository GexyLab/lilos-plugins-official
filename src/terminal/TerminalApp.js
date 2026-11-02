import { Window, h, fs, storage, session } from '@lilos/sdk';
import { TerminalWindow } from './window.js';
import { Shell } from './shell/Shell.js';
import { commands } from './commands/index.js';
import { Reader, FnWriter } from './shell/streams.js';
import { Incomplete, ParseError, ExitSignal, Interrupt, Token } from './shell/signals.js';
import { tildePath } from './shell/paths.js';
import { columns } from './commands/files.js';
import { AnsiRenderer } from './ansi.js';
import { complete, commonPrefix } from './completion.js';
import { i18n, t } from './i18n.js';
import './terminal.css';

const HISTORY_KEY = 'terminal.history';
const HISTORY_MAX = 1000;
const SCROLLBACK = 400_000;   // characters of output kept
const RC = '.bashrc';

/**
 * Terminale: tabs of bash-like shells over lilOS's files (this file) and of remote sessions (SSH,
 * Telnet, rlogin, SUPDUP: remote/RemoteTab.js), with the saved hosts in a side panel (window.js).
 * args.cwd (a folder id) opens it there; { files, action: 'terminal.sshHere' } (the menu of a
 * folder of an SFTP connection) opens SSH in that folder.
 */
export default function createTerminal({ args } = {}) {
  const win = new Window({ title: t('ui.title'), icon: 'terminal', width: 760, height: 460, minWidth: 360, minHeight: 200 });
  const tabs = new TerminalWindow(win, args, (owner, a) => new LocalShell(owner, a));
  win.getState = () => ({ cwd: tabs.firstLocal()?.shell.cwd });
  win.on('launch', a => tabs.launched(a));
  return win;
}

/** Keyboard input of the commands that read the terminal (read, cat without files…). */
class TerminalReader extends Reader {
  silent = false;
  constructor(term) { super(); this.term = term; }
  pull() { return this.term.readInput(this); }
}

/**
 * One shell. Everything shown is one stream of output; the line being typed is a live span at its
 * end, fed by a hidden textarea (so selection and copying of the output work as on any page).
 */
class LocalShell {
  remote = false;
  text = '';            // the line being typed
  cursor = 0;
  pending = '';         // lines of a command not complete yet (if without fi…)
  running = false;
  queue = [];           // lines entered while a command runs (or pasted), not used yet
  reader = null;        // { resolve, reject, reader } while a command waits for a line
  #out = '';
  #frame = 0;
  #historyAt = -1;
  #draft = '';
  #tabs = 0;
  #charWidth = 0;
  #token = null;

  #listeners = new AbortController();

  constructor(owner, args) {
    this.owner = owner;
    this.ansi = new AnsiRenderer();
    const { signal } = this.#listeners;

    this.edit = h('span', { class: 'tm-edit' });
    this.output = h('div', { class: 'tm-out', role: 'log', 'aria-live': 'polite' }, this.edit);
    this.input = h('textarea', {
      class: 'tm-input', spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', autocorrect: 'off',
      rows: '1', 'aria-label': t('ui.commandLine'),
    });
    this.screen = h('div', { class: 'tm-screen' }, this.output, this.input);
    this.el = h('div', { class: 'tm-pane tm-local', role: 'tabpanel' }, this.screen);

    this.input.addEventListener('keydown', e => this.#onKey(e), { signal });
    this.input.addEventListener('input', e => this.#onInput(e), { signal });
    this.input.addEventListener('paste', e => this.#onPaste(e), { signal });
    this.input.addEventListener('focus', () => this.screen.classList.add('focused'), { signal });
    this.input.addEventListener('blur', () => this.screen.classList.remove('focused'), { signal });
    // A click focuses the line, unless it selected some text to copy
    this.screen.addEventListener('mouseup', () => { if (!String(getSelection()).length) this.focus(); }, { signal });
    this.resizes = new ResizeObserver(() => { this.#charWidth = 0; });
    this.resizes.observe(this.screen);

    this.history = loadHistory();
    const out = new FnWriter(t => this.write(t));
    this.host = {
      stdin: new TerminalReader(this),
      stdout: out,
      stderr: out,
      clear: () => this.clear(),
      columns: () => this.columns(),
      history: {
        list: () => [...this.history],
        clear: () => { this.history = []; saveHistory([]); },
      },
      remote: owner.remote,   // ssh, telnet…: tabs of the window (commands/remote.js)
    };
    this.shell = new Shell({ host: this.host, commands });
    if (args?.cwd && fs.get(args.cwd)?.type === 'folder') this.shell.cwd = args.cwd;
    this.shell.setVar('PS1', '\\[\\e[1;32m\\]\\u@\\h\\[\\e[0m\\]:\\[\\e[1;34m\\]\\w\\[\\e[0m\\]\\$ ');

    this.#updateTitle();
    this.#start();
  }

  get name() { return tildePath(this.shell.cwd); }
  get subtitle() { return tildePath(this.shell.cwd); }
  get closed() { return false; }
  activity = false;

  show() {
    this.el.hidden = false;
    requestAnimationFrame(() => { this.scrollToEnd(); this.focus(); });
  }

  hide() { this.el.hidden = true; }

  /** The tab or the window closes: the shell stops. */
  dispose() {
    this.#listeners.abort();
    this.resizes.disconnect();
    cancelAnimationFrame(this.#frame);
    this.#token?.abort();
    for (const job of this.shell.jobs.list) job.token.abort();
    this.reader?.reject(new Interrupt());
  }

  async #start() {
    this.write(`\x1b[2m${t('ui.welcome')}\x1b[0m\n`);
    if (this.shell.resolve(`~/${RC}`)?.type === 'file') {
      await this.#execute(`source ~/${RC}`, { record: false });
    } else this.prompt();
    requestAnimationFrame(() => this.focus());
  }

  focus() { this.input.focus({ preventScroll: true }); }

  // ---------- Output ----------

  write(text) {
    this.#out += text;
    if (this.#out.length > 1 << 18) this.flush();
    else if (!this.#frame) this.#frame = requestAnimationFrame(() => this.flush());
  }

  flush() {
    cancelAnimationFrame(this.#frame);
    this.#frame = 0;
    if (!this.#out) return;
    const text = this.#out;
    this.#out = '';
    const stick = this.#atBottom();
    this.ansi.write(text, this.output, this.edit, () => this.clear());
    this.#trim();
    if (stick) this.scrollToEnd();
  }

  #trim() {
    let total = this.output.textContent.length;
    while (total > SCROLLBACK && this.output.firstChild !== this.edit) {
      total -= this.output.firstChild.textContent.length;
      this.output.firstChild.remove();
    }
  }

  #atBottom() { return this.screen.scrollHeight - this.screen.scrollTop - this.screen.clientHeight < 40; }
  scrollToEnd() { this.screen.scrollTop = this.screen.scrollHeight; }

  clear() {
    this.#out = '';
    while (this.output.firstChild !== this.edit) this.output.firstChild.remove();
    this.screen.scrollTop = 0;
  }

  /** How many characters fit in a line (for ls's columns). */
  columns() {
    if (!this.#charWidth) {
      const probe = h('span', { class: 'tm-probe' }, 'MMMMMMMMMM');
      this.screen.append(probe);
      this.#charWidth = probe.getBoundingClientRect().width / 10 || 8;
      probe.remove();
    }
    return Math.max(20, Math.floor((this.screen.clientWidth - 24) / this.#charWidth));
  }

  // ---------- Prompt and line ----------

  promptText(name = 'PS1') {
    const ps = this.shell.getVar(name) ?? '$ ';
    const user = session.user?.username || this.shell.getVar('USER') || t('shell.defaultUser');
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    return ps.replace(/\\([uhHwW$nte\\[\]dA@])/g, (_, c) => ({
      u: user, h: this.shell.getVar('HOSTNAME') ?? 'lilos', H: this.shell.getVar('HOSTNAME') ?? 'lilos',
      w: tildePath(this.shell.cwd), W: this.shell.cwd === fs.root ? '~' : fs.get(this.shell.cwd)?.name ?? '~',
      $: '$', n: '\n', e: '\x1b', '\\': '\\', '[': '', ']': '',
      t: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`, A: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
      d: i18n.date(now, { weekday: 'short', day: 'numeric', month: 'short' }), '@': i18n.date(now, { timeStyle: 'medium' }),
    })[c]);
  }

  prompt() {
    for (const line of this.shell.reapJobs()) this.write(line);
    // Colors left on by a command do not leak into the prompt
    this.flush();
    this.ansi.reset();
    this.write(this.promptText(this.pending ? 'PS2' : 'PS1'));
    this.flush();
    this.renderLine();
    this.scrollToEnd();
  }

  renderLine() {
    const silent = this.reader?.reader.silent;
    const text = silent ? '' : this.text;
    const at = silent ? 0 : this.cursor;
    const cursor = h('span', { class: 'tm-cursor' }, text[at] ?? ' ');
    this.edit.replaceChildren(text.slice(0, at), cursor, text.slice(at + 1));
    this.edit.hidden = this.running && !this.reader && !this.text;
  }

  setLine(text, cursor = text.length) {
    this.text = text;
    this.cursor = Math.max(0, Math.min(cursor, text.length));
    this.#tabs = 0;
    this.renderLine();
  }

  /** The line as typed goes into the output (it stays on screen), the edit span empties. */
  #commitLine(text) {
    this.write((this.reader?.reader.silent ? '' : text) + '\n');
    this.setLine('');
    this.flush();
  }

  // ---------- Input ----------

  #onInput(e) {
    if (e.isComposing) return;
    const value = this.input.value;
    this.input.value = '';
    if (!value) return;
    const lines = value.replace(/\r\n?/g, '\n').split('\n');
    this.#insert(lines[0]);
    if (lines.length > 1) this.#feed(lines.slice(1));
  }

  #onPaste(e) {
    const text = e.clipboardData?.getData('text/plain');
    if (text == null) return;
    e.preventDefault();
    const lines = text.replace(/\r\n?/g, '\n').split('\n');
    this.#insert(lines[0]);
    if (lines.length > 1) this.#feed(lines.slice(1));
  }

  #insert(s) {
    if (!s) return;
    this.setLine(this.text.slice(0, this.cursor) + s + this.text.slice(this.cursor), this.cursor + s.length);
    this.scrollToEnd();
  }

  /** Pasted lines: the current one is entered, the others follow it in order; the last stays typed. */
  #feed(rest) {
    const last = rest.pop();
    this.#enter();
    for (const line of rest) this.queue.push(line);
    if (last) {
      if (this.running || this.queue.length) this.#tail = last;
      else this.#insert(last);
    }
    this.#drain();
  }

  #tail = '';

  #onKey(e) {
    const ctrl = e.ctrlKey && !e.altKey && !e.metaKey;
    const key = e.ctrlKey && e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const stop = () => { e.preventDefault(); e.stopPropagation(); };
    if (key !== 'Tab') this.#tabs = 0;
    if (e.isComposing) return;
    if (key === 'Enter') { stop(); this.#enter(); return; }
    if (key === 'Tab') { stop(); this.#complete(); return; }
    if (ctrl && key === 'c') {
      if (String(getSelection()).length) return;   // copy the selected output
      stop();
      this.#interrupt();
      return;
    }
    if (ctrl && key === 'd') {
      stop();
      if (this.reader) { this.#commitLine(this.text); this.#resolveRead(null); }
      else if (!this.running && !this.text && !this.pending) this.#exit();
      else if (this.text) this.setLine(this.text.slice(0, this.cursor) + this.text.slice(this.cursor + 1), this.cursor);
      return;
    }
    if (ctrl && key === 'l') {
      stop();
      this.clear();
      if (!this.running) this.prompt();
      return;
    }
    if (ctrl && key === 'a') { stop(); this.setLine(this.text, 0); return; }
    if (ctrl && key === 'e') { stop(); this.setLine(this.text, this.text.length); return; }
    if (ctrl && key === 'u') { stop(); this.setLine(this.text.slice(this.cursor), 0); return; }
    if (ctrl && key === 'k') { stop(); this.setLine(this.text.slice(0, this.cursor)); return; }
    if (ctrl && (key === 'w' || key === 'Backspace')) {
      stop();
      const before = this.text.slice(0, this.cursor).replace(/\S+\s*$/, '');
      this.setLine(before + this.text.slice(this.cursor), before.length);
      return;
    }
    switch (key) {
      case 'Backspace':
        stop();
        if (this.cursor > 0) this.setLine(this.text.slice(0, this.cursor - 1) + this.text.slice(this.cursor), this.cursor - 1);
        return;
      case 'Delete':
        stop();
        this.setLine(this.text.slice(0, this.cursor) + this.text.slice(this.cursor + 1), this.cursor);
        return;
      case 'ArrowLeft':
        stop();
        if (ctrl) this.setLine(this.text, this.text.slice(0, this.cursor).replace(/\S+\s*$/, '').length);
        else this.setLine(this.text, this.cursor - 1);
        return;
      case 'ArrowRight':
        stop();
        if (ctrl) { const m = /^\s*\S+/.exec(this.text.slice(this.cursor)); this.setLine(this.text, this.cursor + (m ? m[0].length : this.text.length)); }
        else this.setLine(this.text, this.cursor + 1);
        return;
      case 'Home': stop(); this.setLine(this.text, 0); return;
      case 'End': stop(); this.setLine(this.text, this.text.length); return;
      case 'ArrowUp': stop(); this.#historyStep(-1); return;
      case 'ArrowDown': stop(); this.#historyStep(1); return;
      case 'PageUp': stop(); this.screen.scrollTop -= this.screen.clientHeight * 0.9; return;
      case 'PageDown': stop(); this.screen.scrollTop += this.screen.clientHeight * 0.9; return;
      case 'Escape': stop(); return;
    }
  }

  #historyStep(dir) {
    if (this.reader) return;
    if (this.#historyAt < 0) { this.#draft = this.text; this.#historyAt = this.history.length; }
    const next = this.#historyAt + dir;
    if (next < 0 || next > this.history.length) return;
    this.#historyAt = next;
    this.setLine(next === this.history.length ? this.#draft : this.history[next]);
  }

  #complete() {
    if (this.reader) return;
    const { start, end, items } = complete(this.shell, this.text, this.cursor);
    this.#tabs++;
    if (!items.length) return;
    const replace = value => this.setLine(this.text.slice(0, start) + value + this.text.slice(end), start + value.length);
    if (items.length === 1) {
      const only = items[0];
      replace(only.value + (only.folder || /[}/]$/.test(only.value) ? '' : ' '));
      return;
    }
    const prefix = commonPrefix(items.map(i => i.value));
    const current = this.text.slice(start, end);
    if (prefix.length > current.length) { replace(prefix); this.#tabs = 1; return; }
    if (this.#tabs < 2) return;
    // Second Tab: show the candidates, then the prompt and the line again
    const line = this.text, cursor = this.cursor;
    this.#commitLine(line);
    this.write(columns(items.map(i => ({ text: i.label, plain: i.label })), this.columns()));
    this.prompt();
    this.setLine(line, cursor);
    this.#tabs = 0;
  }

  #interrupt() {
    if (this.running) {
      this.write('^C');
      if (this.reader) this.#commitLine('');
      else this.write('\n');
      this.queue = [];
      this.#tail = '';
      this.#token?.abort();
      return;
    }
    this.write(this.text + '^C\n');
    this.pending = '';
    this.queue = [];
    this.setLine('');
    this.shell.status = 130;
    this.prompt();
  }

  // ---------- Running ----------

  #enter() {
    const line = this.text;
    this.#historyAt = -1;
    if (this.reader) {
      this.#commitLine(line);
      this.#resolveRead(line + '\n');
      return;
    }
    if (this.running) {
      // Typed ahead: used by the next read, or run after the command
      this.queue.push(line);
      this.setLine('');
      return;
    }
    this.#commitLine(line);
    this.#submit(line);
  }

  /** Runs what is queued, one line at a time, while nothing is running. */
  #drain() {
    while (!this.running && this.queue.length) {
      const line = this.queue.shift();
      this.write(line + '\n');
      this.#submit(line);
    }
    if (!this.running && !this.queue.length && this.#tail) {
      this.#insert(this.#tail);
      this.#tail = '';
    }
  }

  #submit(line) {
    const source = this.pending ? `${this.pending}\n${line}` : line;
    this.#execute(source, { record: true });
  }

  async #execute(source, { record }) {
    if (!source.trim()) {
      this.pending = '';
      this.prompt();
      return;
    }
    this.running = true;
    this.renderLine();
    this.#token = new Token();
    this.shell.token = this.#token;
    this.host.stdin = new TerminalReader(this);
    let incomplete = false;
    try {
      await this.shell.run(source, this.host);
    } catch (err) {
      if (err instanceof Incomplete) incomplete = true;
      else if (err instanceof ParseError) { this.write(`bash: ${err.message}\n`); this.shell.status = 2; }
      else if (err instanceof ExitSignal) { this.flush(); this.#exit(); return; }
      else if (err instanceof Interrupt) this.shell.status = 130;
      else { this.write(`bash: ${err?.message ?? err}\n`); this.shell.status = 1; }
    }
    this.pending = incomplete ? source : '';
    if (record && !incomplete) this.#remember(source);
    this.running = false;
    this.reader = null;
    this.#updateTitle();
    this.flush();
    // Output without a final newline: the prompt starts on a line of its own
    if (!/\n$/.test(this.edit.previousSibling?.textContent ?? '\n')) this.write('\n');
    this.prompt();
    this.#drain();
  }

  #remember(source) {
    const entry = source.trim();
    if (!entry || source.startsWith(' ') || this.history.at(-1) === entry) return;
    this.history = [...loadHistory().filter(h => h !== entry), entry].slice(-HISTORY_MAX);
    saveHistory(this.history);
  }

  /** A command reads a line from the keyboard: from what was typed ahead, or waiting for Enter. */
  readInput(reader) {
    if (this.queue.length) {
      const line = this.queue.shift();
      this.write((reader.silent ? '' : line) + '\n');
      return Promise.resolve(line + '\n');
    }
    this.flush();
    return new Promise((resolve, reject) => {
      const off = this.#token?.onAbort(() => { this.reader = null; reject(new Interrupt()); });
      this.reader = {
        reader,
        resolve: v => { off?.(); resolve(v); },
        reject: e => { off?.(); reject(e); },
      };
      this.renderLine();
      this.scrollToEnd();
    });
  }

  #resolveRead(value) {
    const r = this.reader;
    this.reader = null;
    this.renderLine();
    r?.resolve(value);
  }

  changeDir(id) {
    this.shell.cwd = id;
    this.#updateTitle();
    if (!this.running) {
      this.write(`\ncd ${tildePath(id)}\n`);
      this.prompt();
    }
  }

  #updateTitle() {
    this.owner.tabChanged(this);
  }

  #exit() {
    this.running = true;
    this.renderLine();
    this.owner.closeTab(this);
  }
}

function loadHistory() {
  const list = storage.get(HISTORY_KEY, []);
  return Array.isArray(list) ? list.filter(x => typeof x === 'string').slice(-HISTORY_MAX) : [];
}

const saveHistory = list => storage.set(HISTORY_KEY, list);

