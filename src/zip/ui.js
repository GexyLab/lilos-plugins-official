/**
 * Small DOM helpers for Zip's window. The app runs isolated (a sandbox) or in a Shadow DOM:
 * it has no lilOS SDK, only `lilos`. Texts always go in as text, never as HTML (names in an
 * archive are untrusted).
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

export const STYLE = `
  :host, body { margin: 0; }
  .zp { box-sizing: border-box; height: 100%; overflow: hidden; padding: 18px 20px; display: flex; flex-direction: column; gap: 12px; color: var(--text); font: 13px/1.45 var(--font, system-ui); }
  .zp * { box-sizing: border-box; }
  .zp h1 { font-size: 15px; font-weight: 600; margin: 0; overflow-wrap: anywhere; }
  .zp p { margin: 0; color: var(--dim); }
  .zp .hint { font-size: 12px; }
  .zp .list { flex: 1; min-height: 60px; overflow: auto; list-style: none; margin: 0; padding: 0; border: 1px solid var(--border); border-radius: var(--radius-sm, 6px); }
  .zp .list li { display: flex; align-items: center; gap: 10px; padding: 5px 10px; }
  .zp .list li + li { border-top: 1px solid var(--border); }
  .zp .list .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .zp .list .folder .name { color: var(--dim); }
  .zp .list .size { color: var(--dim); font-size: 12px; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .zp .list .more { color: var(--dim); font-style: italic; }
  .zp .empty { padding: 12px 10px; color: var(--dim); border: 1px solid var(--border); border-radius: var(--radius-sm, 6px); }
  .zp .row { display: flex; gap: 8px; align-items: center; justify-content: flex-end; flex-wrap: wrap; }
  .zp button { font: inherit; padding: 6px 14px; border-radius: var(--radius-sm, 6px); border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; }
  .zp button:hover:not(:disabled) { background: var(--hover); }
  .zp button:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  .zp button.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
  .zp button.primary:hover:not(:disabled) { filter: brightness(1.08); background: var(--accent); }
  .zp button:disabled { opacity: .55; cursor: default; }
  .zp [aria-busy="true"] { cursor: progress; }
  .zp .error { color: var(--danger, #d64545); }
  .zp .warn { padding: 8px 10px; border-radius: var(--radius-sm, 6px); background: color-mix(in srgb, #e0a030 14%, transparent); color: var(--text); }
  .zp .ok { color: var(--text); }
`;
