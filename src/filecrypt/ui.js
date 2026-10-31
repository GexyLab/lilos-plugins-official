/**
 * Small DOM helpers for FileCrypt's windows. The app runs isolated (a sandbox) or in a Shadow DOM:
 * it has no lilOS SDK, only `lilos`. Texts always go in as text, never as HTML (file names are untrusted).
 */
export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs ?? {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else if (k in el && typeof v !== 'string') el[k] = v;
    else el.setAttribute(k, v === true ? '' : String(v));
  }
  el.append(...children.flat().filter(c => c != null && c !== false).map(c => (c instanceof Node ? c : document.createTextNode(String(c)))));
  return el;
}

/** A select of [value, label] options. */
export function select(options, value, onChange) {
  const el = h('select', { onchange: () => onChange?.(el.value) }, ...options.map(([v, label]) => h('option', { value: v }, label)));
  el.value = String(value);
  return el;
}

/**
 * A channel with the vault: ask(message) → its answer (throws with the vault's error), and
 * onStatus(fn) for the list of unlocked files it sends while the window follows it.
 */
export async function vaultChannel(lilos) {
  const port = await lilos.app.connect('vault');
  const pending = new Map();
  const listeners = new Set();
  let next = 1;
  port.onmessage = e => {
    const m = e.data ?? {};
    if (m.status && m.id == null) return listeners.forEach(fn => fn(m.status));
    const p = pending.get(m.id);
    if (!p) return;
    pending.delete(m.id);
    if (m.error) p.reject(new Error(m.error)); else p.resolve(m);
  };
  return {
    ask: message => new Promise((resolve, reject) => {
      const id = next++;
      pending.set(id, { resolve, reject });
      port.postMessage({ ...message, id });
    }),
    onStatus: fn => listeners.add(fn),
    close: () => port.close(),
  };
}

export const STYLE = `
  :host, body { margin: 0; }
  .fc { box-sizing: border-box; height: 100%; overflow: auto; padding: 18px 20px; display: flex; flex-direction: column; gap: 14px; color: var(--text); font: 13px/1.45 var(--font, system-ui); }
  .fc * { box-sizing: border-box; }
  .fc h1 { font-size: 15px; font-weight: 600; margin: 0; overflow-wrap: anywhere; }
  .fc h2 { font-size: 12px; font-weight: 600; margin: 4px 0 0; color: var(--dim); text-transform: uppercase; letter-spacing: .04em; }
  .fc p { margin: 0; color: var(--dim); }
  .fc .fc-form { display: flex; flex-direction: column; gap: 12px; }
  .fc label { display: flex; flex-direction: column; gap: 5px; font-weight: 500; }
  .fc input, .fc select { font: inherit; color: var(--text); background: var(--field-bg, var(--surface)); border: 1px solid var(--border); border-radius: var(--radius-sm, 6px); padding: 7px 9px; }
  .fc input:focus-visible, .fc select:focus-visible, .fc button:focus-visible, .fc summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  .fc .row { display: flex; gap: 8px; align-items: center; justify-content: flex-end; flex-wrap: wrap; }
  .fc button { font: inherit; padding: 6px 14px; border-radius: var(--radius-sm, 6px); border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; }
  .fc button:hover:not(:disabled) { background: var(--hover); }
  .fc button.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
  .fc button.primary:hover:not(:disabled) { filter: brightness(1.08); background: var(--accent); }
  .fc button:disabled { opacity: .55; cursor: default; }
  .fc .error { color: var(--danger, #d64545); min-height: 1.45em; }
  .fc .warn { padding: 9px 11px; border-radius: var(--radius-sm, 6px); background: color-mix(in srgb, var(--danger, #d64545) 10%, transparent); color: var(--text); }
  .fc .meter { display: flex; gap: 4px; }
  .fc .meter span { flex: 1; height: 4px; border-radius: 2px; background: var(--border); }
  .fc .meter[data-level="1"] span:nth-child(-n+1) { background: #d64545; }
  .fc .meter[data-level="2"] span:nth-child(-n+2) { background: #e0a030; }
  .fc .meter[data-level="3"] span:nth-child(-n+3) { background: #7fb24a; }
  .fc .meter[data-level="4"] span { background: #3f9d5c; }
  .fc .hint { font-size: 12px; color: var(--dim); font-weight: 400; }
  .fc details { border: 1px solid var(--border); border-radius: var(--radius-sm, 6px); padding: 6px 10px; }
  .fc details[open] { padding-bottom: 10px; }
  .fc details > div { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
  .fc summary { cursor: pointer; font-weight: 500; }
  .fc ul { list-style: none; margin: 0; padding: 0; border: 1px solid var(--border); border-radius: var(--radius-sm, 6px); }
  .fc li { display: flex; align-items: center; gap: 10px; padding: 7px 10px; }
  .fc li + li { border-top: 1px solid var(--border); }
  .fc li .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .fc li .when { color: var(--dim); font-size: 12px; }
  .fc .empty { padding: 12px 10px; color: var(--dim); }
  .fc .settings { display: grid; grid-template-columns: 1fr; gap: 10px; }
  .fc [aria-busy="true"] { cursor: progress; }
`;
