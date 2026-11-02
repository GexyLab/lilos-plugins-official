/**
 * DOM helpers and styles of Remote Terminal's window. The app runs isolated (a sandbox) or in a
 * Shadow DOM: it has no lilOS SDK, only `lilos`. Texts always go in as text, never as HTML (what a
 * server sends, names of hosts and sessions are untrusted).
 */
export function h(tag, attrs = {}, ...children) {
  const el = tag === 'svg' || tag === 'path' || tag === 'rect' || tag === 'circle'
    ? document.createElementNS('http://www.w3.org/2000/svg', tag)
    : document.createElement(tag);
  for (const [k, v] of Object.entries(attrs ?? {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.setAttribute('class', v);
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else if (k in el && typeof v !== 'string' && !(el instanceof SVGElement)) el[k] = v;
    else el.setAttribute(k, v === true ? '' : String(v));
  }
  el.append(...children.flat().filter(c => c != null && c !== false).map(c => (c instanceof Node ? c : document.createTextNode(String(c)))));
  return el;
}

/* Line icons (24×24, stroke), the few the window needs */
const PATHS = {
  plus: 'M12 5v14M5 12h14',
  x: 'M6 6l12 12M18 6 6 18',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  unlock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 7.5-2',
  search: 'M16 11a5 5 0 1 1-10 0 5 5 0 0 1 10 0zM20 20l-4.5-4.5',
  rec: 'M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM12 9v6M9 12h6',
  stop: 'M7 7h10v10H7z',
  kbd: 'M2 6h20v12H2zM6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10',
  side: 'M3 4h18v16H3zM9 4v16',
  play: 'M7 5v14l11-7z',
  folder: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  pencil: 'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4',
  info: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM12 11v5M12 8h.01',
  warn: 'M12 3 2 20h20zM12 10v4M12 17h.01',
  shield: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6zM9 12l2 2 4-4',
  refresh: 'M20 11a8 8 0 0 0-14.9-3M4 13a8 8 0 0 0 14.9 3M4 4v4h4M20 20v-4h-4',
  up: 'M12 19V5M6 11l6-6 6 6',
  down: 'M12 5v14M6 13l6 6 6-6',
  chev: 'M6 9l6 6 6-6',
};

export function icon(name, cls = 'ico') {
  return h('svg', { class: cls, viewBox: '0 0 24 24', 'aria-hidden': 'true' }, h('path', { d: PATHS[name] ?? PATHS.info }));
}

/** The short badge of a protocol. */
export const BADGE = { ssh: 'SSH', telnet: 'TELNET', rlogin: 'RLOGIN', supdup: 'SUPDUP' };
export const badge = protocol => h('span', { class: `proto p-${/^[a-z0-9-]+$/.test(protocol) ? protocol : 'x'}` }, BADGE[protocol] ?? String(protocol).toUpperCase().slice(0, 8));

export const STYLE = `
  :host, body { margin: 0; height: 100%; }
  .rt { box-sizing: border-box; height: 100%; display: flex; color: var(--text); background: var(--surface); font: 13px/1.4 var(--font, system-ui); overflow: hidden; }
  .rt * { box-sizing: border-box; }
  .rt button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
  .rt .ico { width: 15px; height: 15px; flex: none; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
  .rt .iconbtn { width: 24px; height: 24px; display: inline-grid; place-items: center; border-radius: var(--radius-sm, 5px); color: var(--dim); flex: none; }
  .rt .iconbtn:hover { background: var(--hover); color: var(--text); }
  .rt .iconbtn .ico { width: 13px; height: 13px; }
  .rt .btn { height: 28px; padding: 0 12px; border-radius: var(--radius-sm, 5px); border: 1px solid var(--border) !important; background: var(--surface) !important; display: inline-flex; align-items: center; gap: 6px; font-weight: 500; white-space: nowrap; }
  .rt .btn:hover:not(:disabled) { background: var(--hover) !important; }
  .rt .btn.primary { background: var(--accent) !important; border-color: var(--accent) !important; color: #fff; }
  .rt .btn.primary:hover:not(:disabled) { filter: brightness(1.08); }
  .rt .btn.danger { color: var(--danger, #d64545); }
  .rt .btn:disabled { opacity: .55; cursor: default; }
  .rt .btn .ico { width: 13px; height: 13px; }
  .rt :focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }

  /* Hosts (side) */
  .rt .side { width: 200px; flex: none; background: var(--side, var(--chrome)); border-right: 1px solid var(--border); padding: 6px; overflow: auto; }
  .rt .side[hidden] { display: none; }
  .rt .side h2 { margin: 0; font-size: 10.5px; font-weight: 600; color: var(--faint, var(--dim)); text-transform: uppercase; letter-spacing: .05em; padding: 10px 6px 3px; display: flex; align-items: center; }
  .rt .side h2 span { flex: 1; }
  .rt .side h2 .iconbtn { width: 20px; height: 20px; }
  .rt .place { width: 100%; height: 28px; display: flex; align-items: center; gap: 8px; padding: 0 6px; border-radius: var(--radius-sm, 5px); white-space: nowrap; overflow: hidden; text-align: left; }
  .rt .place:hover { background: var(--hover); }
  .rt .place .nm { flex: 1; overflow: hidden; text-overflow: ellipsis; }
  .rt .dot { width: 7px; height: 7px; border-radius: 50%; flex: none; background: var(--border); }
  .rt .dot.on { background: #30a46c; }
  .rt .proto { font-size: 9.5px; font-weight: 700; letter-spacing: .03em; padding: 1px 4px; border-radius: 3px; background: #e9ecf1; color: #59606c; flex: none; }
  .rt .p-ssh { background: #dff3ec; color: #1d6f57; }
  .rt .p-telnet { background: #fdeccf; color: #8a5a0f; }
  .rt .p-rlogin { background: #ece6fb; color: #5b3fae; }
  .rt .p-supdup { background: #fbe3e6; color: #a2283a; }

  /* Main: tabs and their content */
  .rt .main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .rt .tabs { height: 33px; flex: none; display: flex; align-items: flex-end; gap: 2px; padding: 0 6px; background: var(--chrome); border-bottom: 1px solid var(--border); overflow-x: auto; overflow-y: hidden; scrollbar-width: none; }
  .rt .tabs > .iconbtn { margin: 0 0 4px; }
  .rt .tab { height: 28px; display: flex; align-items: center; gap: 7px; padding: 0 4px 0 10px; border-radius: 6px 6px 0 0; color: var(--dim); font-weight: 500; white-space: nowrap; max-width: 220px; border: 1px solid transparent; border-bottom: 0; flex: none; }
  .rt .tab:hover { color: var(--text); }
  .rt .tab .nm { overflow: hidden; text-overflow: ellipsis; }
  .rt .tab .iconbtn { width: 18px; height: 18px; }
  .rt .tab .iconbtn .ico { width: 11px; height: 11px; }
  .rt .tab[aria-selected="true"] { background: #15171b; color: #e6e8ec; border-color: var(--border); margin-bottom: -1px; height: 29px; }
  .rt .tab[aria-selected="true"] .iconbtn { color: #9aa1ad; }
  .rt .tab[aria-selected="true"] .iconbtn:hover { background: #2a2d34; color: #fff; }
  .rt .tab.start[aria-selected="true"] { background: var(--surface); color: var(--text); }
  .rt .tab.lost .nm { text-decoration: line-through; opacity: .7; }
  .rt .tab .act { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); flex: none; }
  .rt .pane { flex: 1; min-height: 0; display: flex; flex-direction: column; position: relative; }
  .rt .pane[hidden] { display: none; }

  /* The terminal */
  .rt .screen { flex: 1; min-height: 0; background: #15171b; padding: 6px 4px 2px 8px; position: relative; overflow: hidden; }
  .rt .screen .xterm { height: 100%; }
  .rt .status { height: 26px; flex: none; display: flex; align-items: center; gap: 10px; padding: 0 6px 0 10px; font-size: 11px; color: var(--dim); border-top: 1px solid var(--border); background: var(--side, var(--chrome)); white-space: nowrap; overflow: hidden; }
  .rt .status .ico { width: 12px; height: 12px; }
  .rt .status .safe { color: #30a46c; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; }
  .rt .status .unsafe { color: #d9822b; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; }
  .rt .status code { font-family: ui-monospace, Consolas, monospace; font-size: 10.5px; color: var(--text); overflow: hidden; text-overflow: ellipsis; }
  .rt .status .sep { color: var(--border); }
  .rt .status .sp { flex: 1; }
  .rt .status .iconbtn { width: 22px; height: 22px; }
  .rt .status .iconbtn[aria-pressed="true"] { color: #e5484d; }
  .rt .status .btn { height: 20px; padding: 0 8px; font-size: 11px; }
  .rt .overlay { position: absolute; left: 50%; bottom: 16px; transform: translateX(-50%); display: flex; align-items: center; gap: 10px; padding: 8px 10px 8px 12px; background: #23262d; border: 1px solid #353943; border-radius: 7px; color: #e6e8ec; box-shadow: 0 10px 24px -8px rgba(0,0,0,.6); white-space: nowrap; max-width: calc(100% - 24px); z-index: 5; }
  .rt .overlay > span { overflow: hidden; text-overflow: ellipsis; }
  .rt .overlay .ico { color: #d9822b; }
  .rt .overlay small { color: #9aa1ad; }
  .rt .overlay .btn { height: 24px; background: #2f333b !important; border-color: #444a55 !important; color: #e6e8ec; }
  .rt .overlay .btn.primary { background: var(--accent) !important; border-color: var(--accent) !important; }
  .rt .findbar { position: absolute; top: 6px; right: 14px; display: flex; gap: 4px; align-items: center; background: #23262d; border: 1px solid #353943; border-radius: 7px; padding: 4px; color: #e6e8ec; z-index: 5; }
  .rt .findbar input { height: 24px; width: 170px; background: #15171b; border: 1px solid #3b3f48; border-radius: 4px; color: #e6e8ec; font: 11.5px ui-monospace, Consolas, monospace; padding: 0 6px; }
  .rt .findbar small { color: #9aa1ad; padding: 0 4px; min-width: 52px; text-align: center; }
  .rt .findbar .iconbtn { color: #9aa1ad; }
  .rt .findbar .iconbtn:hover { background: #2f333b; color: #fff; }

  /* Menus */
  .rt .menu { position: absolute; z-index: 20; min-width: 220px; background: rgba(24,26,31,.98); border: 1px solid #2c3038; border-radius: 7px; padding: 4px; color: #d7dae0; box-shadow: 0 12px 32px -8px rgba(0,0,0,.55); }
  .rt .menu button { width: 100%; height: 26px; display: flex; align-items: center; gap: 8px; padding: 0 8px; border-radius: 4px; text-align: left; }
  .rt .menu button:hover, .rt .menu button:focus-visible { background: rgba(255,255,255,.08); color: #fff; outline: none; }
  .rt .menu .k { margin-left: auto; color: #8a909b; font: 11px ui-monospace, Consolas, monospace; }
  .rt .menu hr { border: 0; border-top: 1px solid #2c3038; margin: 4px 2px; }
  .rt .menu .h { height: 22px; font-size: 10.5px; color: #8a909b; text-transform: uppercase; letter-spacing: .05em; padding: 4px 8px 0; }

  /* Home */
  .rt .home { flex: 1; overflow: auto; padding: 18px 22px; display: flex; flex-direction: column; gap: 20px; }
  .rt .home h3 { font-size: 11px; font-weight: 600; color: var(--faint, var(--dim)); text-transform: uppercase; letter-spacing: .05em; margin: 0 0 8px; }
  .rt .quick { display: flex; gap: 8px; }
  .rt .quick input { flex: 1; min-width: 0; height: 34px; font: 12.5px ui-monospace, Consolas, monospace; }
  .rt .quick .btn { height: 34px; }
  .rt .hint { font-size: 11.5px; color: var(--dim); margin: 6px 0 0; }
  .rt .hint code { font: 11px ui-monospace, Consolas, monospace; }
  .rt .error { color: var(--danger, #d64545); font-size: 12px; margin: 6px 0 0; }
  .rt .hosts { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 10px; }
  .rt .host { border: 1px solid var(--border); border-radius: 7px; padding: 10px 12px; display: grid; gap: 4px; background: var(--surface); text-align: left; position: relative; }
  .rt .host:hover { border-color: var(--accent); }
  .rt .host .t { display: flex; align-items: center; gap: 7px; font-weight: 600; }
  .rt .host .t .nm { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .rt .host .a { font: 11px ui-monospace, Consolas, monospace; color: var(--dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .rt .host .l { font-size: 11px; color: var(--faint, var(--dim)); }
  .rt .host .edit { position: absolute; right: 6px; bottom: 6px; opacity: 0; }
  .rt .host:hover .edit, .rt .host:focus-within .edit { opacity: 1; }
  .rt .host.new { border-style: dashed; place-items: center; color: var(--dim); font-weight: 500; grid-auto-flow: column; gap: 6px; min-height: 70px; }
  .rt .live { border: 1px solid color-mix(in srgb, var(--accent) 30%, var(--border)); background: color-mix(in srgb, var(--accent) 5%, var(--surface)); border-radius: 7px; }
  .rt .live .li { display: grid; grid-template-columns: 10px minmax(0, 1fr) auto auto; gap: 10px; align-items: center; padding: 8px 12px; }
  .rt .live .li + .li { border-top: 1px solid color-mix(in srgb, var(--accent) 18%, var(--border)); }
  .rt .live .nm { font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .rt .live .nm small { font-weight: 400; color: var(--dim); margin-left: 6px; font: 11px ui-monospace, Consolas, monospace; }
  .rt .live .when { font-size: 11px; color: var(--dim); white-space: nowrap; }
  .rt .empty { color: var(--dim); font-size: 12px; }
  .rt .foot { margin-top: auto; display: flex; gap: 8px; }

  /* Dialogs */
  .rt .backdrop { position: absolute; inset: 0; background: rgba(0,0,0,.35); display: grid; place-items: center; z-index: 30; padding: 16px; }
  .rt .dialog { width: min(440px, 100%); max-height: 100%; display: flex; flex-direction: column; background: var(--surface); color: var(--text); border-radius: 8px; box-shadow: 0 18px 40px -8px rgba(0,0,0,.6); border: 1px solid var(--border); overflow: hidden; }
  .rt .dialog > h2 { margin: 0; padding: 12px 16px; font-size: 13.5px; font-weight: 600; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 8px; }
  .rt .dialog > h2 .ico { width: 18px; height: 18px; color: var(--accent); }
  .rt .dialog.alarm > h2 .ico { color: var(--danger, #d64545); }
  .rt .dialog .body { padding: 14px 16px; display: grid; gap: 11px; overflow: auto; }
  .rt .dialog .body p { margin: 0; color: var(--dim); }
  .rt .dialog .foot { display: flex; gap: 8px; justify-content: flex-end; padding: 10px 16px; border-top: 1px solid var(--border); background: var(--side, var(--chrome)); margin: 0; }
  .rt .dialog .foot .left { margin-right: auto; }
  .rt .field { display: grid; gap: 4px; }
  .rt .field > span { font-size: 11.5px; color: var(--dim); font-weight: 500; }
  .rt .field small { font-size: 11px; color: var(--faint, var(--dim)); }
  .rt input[type=text], .rt input[type=password], .rt input[type=number], .rt input:not([type]), .rt select, .rt textarea {
    height: 28px; border: 1px solid var(--border); border-radius: 4px; padding: 0 8px; background: var(--field-bg, var(--surface)); color: var(--text); font: inherit; min-width: 0; }
  .rt textarea { height: 70px; padding: 6px 8px; resize: vertical; font: 11.5px ui-monospace, Consolas, monospace; }
  .rt input:focus, .rt select:focus, .rt textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent-soft, transparent); }
  .rt .grid2 { display: grid; grid-template-columns: 1fr 90px; gap: 8px; }
  .rt .grid2b { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .rt .check { display: flex; align-items: center; gap: 8px; }
  .rt .note { border: 1px solid #f0dca8; background: #fff8e6; color: #6b5212; border-radius: 4px; padding: 8px 10px; font-size: 11.5px; display: grid; gap: 4px; }
  .rt .note b { color: #b7791f; display: flex; align-items: center; gap: 6px; }
  .rt .note.red { border-color: #f3c4c6; background: #fff1f1; color: #7d1d21; }
  .rt .note.red b { color: #e5484d; }
  .rt .fp { font: 11px/1.5 ui-monospace, Consolas, monospace; background: var(--chrome); border: 1px solid var(--border); border-radius: 4px; padding: 7px 9px; word-break: break-all; color: var(--text); }
  .rt details summary { cursor: pointer; font-weight: 600; color: var(--dim); }
  .rt details[open] summary { margin-bottom: 10px; }
  .rt .credits { display: grid; gap: 10px; }
  .rt .credits div { display: grid; gap: 2px; }
  .rt .credits b { font-weight: 600; }
  .rt .credits span { color: var(--dim); font-size: 12px; }
`;
