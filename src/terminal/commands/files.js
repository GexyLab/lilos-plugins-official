import { fs, tags } from '@lilos/sdk';
import { options, int } from './options.js';
import { ShellError } from '../shell/signals.js';
import { matchPattern } from '../shell/pattern.js';
import { byName, segments } from '../shell/paths.js';

/** Commands on files and folders of lilOS: ls, cat, mkdir, touch, cp, mv, rm, rmdir, stat, find, tree… */
const MONTHS = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
const C = { reset: '\x1b[0m', folder: '\x1b[1;34m', app: '\x1b[36m', script: '\x1b[32m', dim: '\x1b[2m' };

const isScript = node => node.type === 'file' && /\.(sh|bash)$/i.test(node.name);
const missing = path => `impossibile accedere a «${path}»: file o cartella inesistente`;
const toTerminal = ctx => ctx.stdout === ctx.shell.host.stdout;

export function human(bytes) {
  if (bytes < 1024) return String(bytes);
  const units = ['K', 'M', 'G', 'T'];
  let v = bytes, u = -1;
  do { v /= 1024; u++; } while (v >= 1024 && u < units.length - 1);
  return (v < 10 ? v.toFixed(1) : String(Math.round(v))).replace('.', ',') + units[u];
}

function shortDate(ms) {
  const d = new Date(ms), now = new Date();
  const day = String(d.getDate()).padStart(2) + ' ' + MONTHS[d.getMonth()];
  const recent = Math.abs(now - d) < 180 * 86400e3;
  return recent ? `${day} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}` : `${day}  ${d.getFullYear()}`;
}

/** Size of a node: bytes for files, items inside for folders. */
const sizeOf = node => (node.type === 'file' ? node.size ?? 0 : node.type === 'folder' ? fs.children(node.id).length : 0);

function colored(ctx, node, name = node.name, classify = false) {
  const suffix = classify ? (node.type === 'folder' ? '/' : node.type === 'app' ? '@' : isScript(node) ? '*' : '') : '';
  if (!toTerminal(ctx)) return name + suffix;
  const color = node.type === 'folder' ? C.folder : node.type === 'app' ? C.app : isScript(node) ? C.script : '';
  return color ? `${color}${name}${C.reset}${suffix}` : name + suffix;
}

/** Names in columns, filled top to bottom like ls. */
export function columns(items, width) {
  if (!items.length) return '';
  const len = s => s.plain.length;
  for (let cols = Math.min(items.length, Math.max(1, Math.floor(width / 3))); cols >= 1; cols--) {
    const rows = Math.ceil(items.length / cols);
    const widths = [];
    for (let c = 0; c < cols; c++) widths.push(Math.max(0, ...items.slice(c * rows, (c + 1) * rows).map(len)));
    const total = widths.reduce((a, b) => a + b, 0) + 2 * (cols - 1);
    if (total > width && cols > 1) continue;
    let out = '';
    for (let r = 0; r < rows; r++) {
      let line = '';
      for (let c = 0; c < cols; c++) {
        const item = items[c * rows + r];
        if (!item) continue;
        const last = c === cols - 1 || !items[(c + 1) * rows + r];
        line += item.text + (last ? '' : ' '.repeat(widths[c] - len(item) + 2));
      }
      out += line + '\n';
    }
    return out;
  }
  return items.map(i => i.text).join('\n') + '\n';
}

function sortNodes(list, opts) {
  const sorted = [...list].sort((a, b) => (opts.t ? b.modified - a.modified : opts.S ? sizeOf(b) - sizeOf(a) : 0) || byName(a.name, b.name));
  return opts.r ? sorted.reverse() : sorted;
}

async function listing(ctx, entries, opts) {
  if (!entries.length) return;
  if (!opts.l) {
    if (opts['1'] || !toTerminal(ctx)) {
      for (const { node, name } of entries) await ctx.out(colored(ctx, node, name, opts.F) + '\n');
    } else {
      const items = entries.map(({ node, name }) => ({ text: colored(ctx, node, name, opts.F), plain: name + (opts.F && (node.type !== 'file' || isScript(node)) ? ' ' : '') }));
      await ctx.out(columns(items, ctx.shell.host.columns?.() ?? 80));
    }
    return;
  }
  const rows = entries.map(({ node, name }) => {
    const type = node.type === 'folder' ? 'd' : node.type === 'app' ? 'l' : '-';
    const size = node.type === 'file' ? (opts.h ? human(node.size ?? 0) : String(node.size ?? 0)) : node.type === 'folder' ? String(fs.children(node.id).length) : '-';
    const tagNames = (node.tags ?? []).map(id => tags.get(id)?.name).filter(Boolean);
    let shown = colored(ctx, node, name, opts.F);
    if (node.type === 'app') shown += ` -> app:${node.app}`;
    if (tagNames.length) shown += (toTerminal(ctx) ? C.dim : '') + ' ' + tagNames.map(t => '#' + t).join(' ') + (toTerminal(ctx) ? C.reset : '');
    return { type, size, date: shortDate(node.modified ?? node.created ?? 0), shown };
  });
  const w = Math.max(...rows.map(r => r.size.length));
  for (const r of rows) await ctx.out(`${r.type}  ${r.size.padStart(w)}  ${r.date}  ${r.shown}\n`);
}

const visibleChildren = (id, opts) => fs.children(id).filter(n => opts.a || opts.A || !n.name.startsWith('.'));

async function ls(ctx) {
  const { opts, args } = options(ctx, { flags: 'laA1htrSdRF', long: { all: 'a', 'almost-all': 'A', 'human-readable': 'h', reverse: 'r', recursive: 'R', directory: 'd', classify: 'F' } });
  const paths = args.length ? args : ['.'];
  let status = 0;
  const files = [], dirs = [];
  for (const path of paths) {
    const node = ctx.resolve(path);
    if (!node) { await ctx.error(missing(path)); status = 2; continue; }
    if (node.type === 'folder' && !opts.d) dirs.push({ node, name: path });
    else files.push({ node, name: path });
  }
  await listing(ctx, sortNodes(files.map(f => ({ ...f.node, shownName: f.name })), opts).map(n => ({ node: n, name: n.shownName })), opts);
  const many = paths.length > 1 || opts.R;
  let first = !files.length;
  const showDir = async (node, label) => {
    await ctx.tick();
    if (many) await ctx.out(`${first ? '' : '\n'}${label}:\n`);
    first = false;
    const children = sortNodes(visibleChildren(node.id, opts), opts);
    const entries = children.map(n => ({ node: n, name: n.name }));
    if (opts.a) entries.unshift({ node, name: '.' }, ...(node.id !== fs.root ? [{ node: fs.get(node.parent), name: '..' }] : []));
    await listing(ctx, entries, opts);
    if (opts.R) for (const child of children.filter(n => n.type === 'folder')) await showDir(child, `${label.replace(/\/$/, '')}/${child.name}`);
  };
  for (const { node, name } of dirs) await showDir(node, name);
  return status;
}

async function cat(ctx) {
  const { opts, args } = options(ctx, { flags: 'nbsEA', long: { number: 'n', 'number-nonblank': 'b', 'squeeze-blank': 's', 'show-ends': 'E' } });
  let n = 0;
  for await (const { text } of ctx.inputs(args)) {
    if (!opts.n && !opts.b && !opts.s && !opts.E) { await ctx.out(text); continue; }
    const lines = text.split('\n');
    const trailing = text.endsWith('\n');
    if (trailing) lines.pop();
    let out = '', blank = false;
    for (const line of lines) {
      if (opts.s && line === '' && blank) continue;
      blank = line === '';
      const numbered = opts.b ? line !== '' : opts.n;
      out += (numbered ? `${String(++n).padStart(6)}\t` : '') + line + (opts.E ? '$' : '') + '\n';
    }
    if (!trailing && out.endsWith('\n')) out = out.slice(0, -1);
    await ctx.out(out);
  }
  return ctx.failed ? 1 : 0;
}

/** Creates the folders of a path that are missing (mkdir -p). Returns the last one. */
function makeFolders(ctx, path) {
  let node = fs.get(fs.root);
  for (const name of segments(ctx.cwd, path)) {
    const next = fs.children(node.id).find(n => n.name.toLowerCase() === name.toLowerCase()) ?? fs.resolve(`${fs.path(node.id)}/${name}`);
    if (next && next.type !== 'folder') throw new ShellError(`impossibile creare la cartella «${path}»: «${name}» esiste e non è una cartella`);
    node = next ?? fs.create(node.id, { type: 'folder', name });
  }
  return node;
}

async function mkdir(ctx) {
  const { opts, args } = options(ctx, { flags: 'pv', long: { parents: 'p', verbose: 'v' } });
  if (!args.length) throw new ShellError('manca l’operando', 2);
  let status = 0;
  for (const path of args) {
    try {
      const existing = ctx.resolve(path);
      if (existing) {
        if (opts.p && existing.type === 'folder') continue;
        throw new ShellError(`impossibile creare la cartella «${path}»: il file esiste`);
      }
      if (opts.p) makeFolders(ctx, path);
      else {
        const { parent, name } = ctx.locate(path);
        if (parent?.type !== 'folder' || !name) throw new ShellError(`impossibile creare la cartella «${path}»: file o cartella inesistente`);
        fs.create(parent.id, { type: 'folder', name });
      }
      if (opts.v) await ctx.out(`creata la cartella «${path}»\n`);
    } catch (err) {
      await ctx.error(err.message);
      status = 1;
    }
  }
  return status;
}

async function touch(ctx) {
  const { opts, args } = options(ctx, { flags: 'cam', long: { 'no-create': 'c' } });
  if (!args.length) throw new ShellError('manca l’operando', 2);
  let status = 0;
  for (const path of args) {
    const node = ctx.resolve(path);
    if (node) {
      // Writing the same content again moves the modification date
      if (node.type === 'file') await fs.write(node.id, await fs.readBlob(node.id));
      continue;
    }
    if (opts.c) continue;
    const { parent, name } = ctx.locate(path);
    if (parent?.type !== 'folder' || !name) { await ctx.error(`impossibile creare «${path}»: file o cartella inesistente`); status = 1; continue; }
    fs.create(parent.id, { type: 'file', name });
  }
  return status;
}

/** Copies a node (with what it contains) into a folder under a name; merges into an existing folder. */
async function copyNode(ctx, node, parentId, name, opts) {
  await ctx.tick();
  const existing = fs.children(parentId).find(n => n.name.toLowerCase() === name.toLowerCase());
  if (node.type === 'folder') {
    let target = existing;
    if (target && target.type !== 'folder') throw new ShellError(`impossibile sovrascrivere «${name}», che non è una cartella, con una cartella`);
    target ??= fs.create(parentId, { type: 'folder', name, color: node.color });
    for (const child of fs.children(node.id)) await copyNode(ctx, child, target.id, child.name, opts);
    return;
  }
  if (existing) {
    if (opts.n) return;
    if (existing.type === 'folder') throw new ShellError(`impossibile sovrascrivere la cartella «${name}» con un file`);
    if (existing.type === 'file' && node.type === 'file') {
      await fs.write(existing.id, await fs.readBlob(node.id));
      if (opts.v) await ctx.out(`«${fs.path(node.id)}» -> «${fs.path(existing.id)}»\n`);
      return;
    }
    fs.trash([existing.id]);
  }
  const copy = fs.create(parentId, { type: node.type, name, app: node.app });
  if (node.type === 'file') await fs.write(copy.id, await fs.readBlob(node.id));
  if (opts.v) await ctx.out(`«${fs.path(node.id)}» -> «${fs.path(copy.id)}»\n`);
}

/** Sources and target of cp / mv: [{ node, path }], and where each goes: (node) → { parent, name }. */
function plan(ctx, args) {
  if (args.length < 2) throw new ShellError(args.length ? `manca la destinazione dopo «${args[0]}»` : 'manca l’operando', 2);
  const destPath = args.at(-1);
  const sources = args.slice(0, -1);
  const dest = ctx.resolve(destPath);
  if (sources.length > 1 && dest?.type !== 'folder') throw new ShellError(`la destinazione «${destPath}» non è una cartella`);
  return {
    sources,
    target: node => {
      if (dest?.type === 'folder' && dest.id !== node.id) return { parent: dest, name: node.name };
      if (dest) return { parent: fs.get(dest.parent), name: dest.id === node.id ? segments(ctx.cwd, destPath).at(-1) : dest.name, existing: dest };
      const { parent, name } = ctx.locate(destPath);
      if (parent?.type !== 'folder' || !name) throw new ShellError(`impossibile creare «${destPath}»: file o cartella inesistente`);
      return { parent, name };
    },
  };
}

async function cp(ctx) {
  const { opts, args } = options(ctx, { flags: 'rRanvfp', long: { recursive: 'r', 'no-clobber': 'n', verbose: 'v', force: 'f', archive: 'a' } });
  const { sources, target } = plan(ctx, args);
  let status = 0;
  for (const path of sources) {
    try {
      const node = ctx.resolve(path);
      if (!node) throw new ShellError(`impossibile fare stat di «${path}»: file o cartella inesistente`);
      if (node.type === 'folder' && !(opts.r || opts.R || opts.a)) throw new ShellError(`-r non specificato; si omette la cartella «${path}»`);
      const { parent, name } = target(node);
      if (node.type === 'folder' && fs.isInside(parent.id, node.id)) throw new ShellError(`impossibile copiare la cartella «${path}» dentro se stessa`);
      await copyNode(ctx, node, parent.id, name, opts);
    } catch (err) {
      if (!(err instanceof ShellError) && !(err instanceof Error)) throw err;
      await ctx.error(err.message);
      status = 1;
    }
  }
  return status;
}

async function mv(ctx) {
  const { opts, args } = options(ctx, { flags: 'nvfi', long: { 'no-clobber': 'n', verbose: 'v', force: 'f' } });
  const { sources, target } = plan(ctx, args);
  let status = 0;
  for (const path of sources) {
    try {
      const node = ctx.resolve(path);
      if (!node) throw new ShellError(`impossibile fare stat di «${path}»: file o cartella inesistente`);
      if (node.system) throw new ShellError(`impossibile spostare «${path}»: è una cartella di sistema`);
      const { parent, name } = target(node);
      if (node.type === 'folder' && fs.isInside(parent.id, node.id)) throw new ShellError(`impossibile spostare «${path}» in una sua sottocartella`);
      const clash = fs.children(parent.id).find(n => n.id !== node.id && n.name.toLowerCase() === name.toLowerCase());
      if (clash) {
        if (opts.n) continue;
        if (clash.type === 'folder' && node.type !== 'folder') throw new ShellError(`impossibile sovrascrivere la cartella «${name}» con un file`);
        if (clash.type === 'folder' && fs.children(clash.id).length) throw new ShellError(`impossibile spostare «${path}» su «${name}»: la cartella non è vuota`);
        fs.trash([clash.id]);
      }
      if (node.parent !== parent.id) fs.move(node.id, parent.id);
      if (fs.get(node.id).name !== name) fs.rename(node.id, name);
      if (opts.v) await ctx.out(`rinominato «${path}» -> «${fs.path(node.id)}»\n`);
    } catch (err) {
      await ctx.error(err.message);
      status = 1;
    }
  }
  return status;
}

async function rm(ctx) {
  const { opts, args } = options(ctx, { flags: 'rRfvdi', long: { recursive: 'r', force: 'f', verbose: 'v', dir: 'd', purge: 'P' } });
  if (!args.length && !opts.f) throw new ShellError('manca l’operando', 2);
  let status = 0;
  for (const path of args) {
    const node = ctx.resolve(path);
    if (!node) {
      if (!opts.f) { await ctx.error(`impossibile rimuovere «${path}»: file o cartella inesistente`); status = 1; }
      continue;
    }
    try {
      if (node.id === fs.root) throw new ShellError(`è pericoloso agire su «${path}»: è la home`);
      if (node.type === 'folder' && !(opts.r || opts.R)) {
        if (!opts.d) throw new ShellError(`impossibile rimuovere «${path}»: è una cartella`);
        if (fs.children(node.id).length) throw new ShellError(`impossibile rimuovere «${path}»: la cartella non è vuota`);
      }
      if (node.system) throw new ShellError(`impossibile rimuovere «${path}»: è una cartella di sistema`);
      if (opts.P) fs.remove(node.id);
      else if (!fs.trash([node.id]).length) throw new ShellError(`impossibile rimuovere «${path}»: contiene cartelle di sistema`);
      if (opts.v) await ctx.out(opts.P ? `eliminato definitivamente «${path}»\n` : `spostato nel cestino «${path}»\n`);
    } catch (err) {
      await ctx.error(err.message);
      status = 1;
    }
  }
  return status;
}

async function rmdir(ctx) {
  const { opts, args } = options(ctx, { flags: 'pv', long: { parents: 'p', verbose: 'v' } });
  if (!args.length) throw new ShellError('manca l’operando', 2);
  let status = 0;
  for (const path of args) {
    const chain = opts.p ? segments(ctx.cwd, path).map((_, i, all) => '~/' + all.slice(0, all.length - i).join('/')) : [path];
    for (const p of chain) {
      const node = ctx.resolve(p);
      const fail = async msg => { await ctx.error(`impossibile rimuovere «${p}»: ${msg}`); status = 1; };
      if (!node) { await fail('file o cartella inesistente'); break; }
      if (node.type !== 'folder') { await fail('non è una cartella'); break; }
      if (fs.children(node.id).length) { await fail('la cartella non è vuota'); break; }
      if (node.system || node.id === fs.root) { await fail('è una cartella di sistema'); break; }
      fs.trash([node.id]);
      if (opts.v) await ctx.out(`rimossa la cartella «${p}»\n`);
    }
  }
  return status;
}

const fullDate = ms => new Date(ms).toLocaleString('it-IT', { dateStyle: 'medium', timeStyle: 'medium' });
const typeName = n => (n.type === 'folder' ? 'cartella' : n.type === 'app' ? `collegamento all’app ${n.app}` : n.size ? 'file' : 'file vuoto');

async function stat(ctx) {
  const { opts, args } = options(ctx, { values: 'c', long: { format: 'c' } });
  if (!args.length) throw new ShellError('manca l’operando', 2);
  let status = 0;
  for (const path of args) {
    const node = ctx.resolve(path);
    if (!node) { await ctx.error(missing(path)); status = 1; continue; }
    if (opts.c != null) {
      const map = { n: path, N: `'${path}'`, s: String(node.size ?? 0), F: typeName(node), Y: String(Math.floor(node.modified / 1000)), y: new Date(node.modified).toISOString(), W: String(Math.floor(node.created / 1000)), w: new Date(node.created).toISOString(), i: node.id, '%': '%' };
      await ctx.out(opts.c.replace(/%(.)/g, (m, c) => map[c] ?? m) + '\n');
      continue;
    }
    const tagNames = (node.tags ?? []).map(id => tags.get(id)?.name).filter(Boolean);
    await ctx.out([
      `  File: ${path}`,
      `  Tipo: ${typeName(node)}`,
      `  Percorso: ${fs.path(node.id)}`,
      node.type === 'folder' ? `  Elementi: ${fs.children(node.id).length} (${fs.count(node.id)} in tutto)` : node.type === 'file' ? `  Dimensione: ${node.size ?? 0} byte (${human(node.size ?? 0)})` : null,
      `  Creato: ${fullDate(node.created)}`,
      `  Modificato: ${fullDate(node.modified)}`,
      tagNames.length ? `  Tag: ${tagNames.join(', ')}` : null,
      node.system ? '  Cartella di sistema' : null,
      `  Id: ${node.id}`,
    ].filter(Boolean).join('\n') + '\n');
  }
  return status;
}

// ---------- find ----------

function parseFind(ctx, tokens) {
  let i = 0;
  const global = { maxdepth: Infinity, mindepth: 0 };
  const execs = [];
  const or = () => {
    let left = and();
    while (tokens[i] === '-o' || tokens[i] === '-or') { i++; const right = and(); const l = left; left = n => l(n) || right(n); }
    return left;
  };
  const and = () => {
    let left = not();
    for (;;) {
      if (tokens[i] === '-a' || tokens[i] === '-and') i++;
      else if (i >= tokens.length || tokens[i] === '-o' || tokens[i] === '-or' || tokens[i] === ')') return left;
      const right = not();
      const l = left;
      left = n => l(n) && right(n);
    }
  };
  const not = () => {
    if (tokens[i] === '!' || tokens[i] === '-not') { i++; const e = not(); return n => !e(n); }
    return primary();
  };
  const arg = name => {
    if (i >= tokens.length) throw new ShellError(`manca l’argomento di «${name}»`);
    return tokens[i++];
  };
  const primary = () => {
    const t = tokens[i++];
    switch (t) {
      case '(': { const e = or(); if (tokens[i++] !== ')') throw new ShellError('manca «)»'); return e; }
      case '-name': { const p = arg(t); return n => matchPattern(p, n.node.name); }
      case '-iname': { const p = arg(t); return n => matchPattern(p, n.node.name, { ignoreCase: true }); }
      case '-path': case '-wholename': { const p = arg(t); return n => matchPattern(p, n.path); }
      case '-ipath': { const p = arg(t); return n => matchPattern(p, n.path, { ignoreCase: true }); }
      case '-type': {
        const k = arg(t);
        const want = { f: 'file', d: 'folder', l: 'app' }[k];
        if (!want) throw new ShellError(`tipo sconosciuto per -type: «${k}» (f, d o l)`);
        return n => n.node.type === want;
      }
      case '-empty': return n => (n.node.type === 'folder' ? !fs.children(n.node.id).length : n.node.type === 'file' && !n.node.size);
      case '-size': {
        const v = arg(t);
        const m = /^([+-]?)(\d+)([ckMG]?)$/.exec(v);
        if (!m) throw new ShellError(`dimensione non valida: «${v}»`);
        const unit = { c: 1, k: 1024, M: 1024 ** 2, G: 1024 ** 3, '': 512 }[m[3]];
        const size = Number(m[2]);
        return n => {
          if (n.node.type !== 'file') return false;
          const s = Math.ceil((n.node.size ?? 0) / unit);
          return m[1] === '+' ? s > size : m[1] === '-' ? s < size : s === size;
        };
      }
      case '-mtime': case '-mmin': {
        const v = arg(t);
        const m = /^([+-]?)(\d+)$/.exec(v);
        if (!m) throw new ShellError(`valore non valido per ${t}: «${v}»`);
        const unit = t === '-mtime' ? 86400e3 : 60e3;
        return n => {
          const age = Math.floor((Date.now() - n.node.modified) / unit);
          return m[1] === '+' ? age > +m[2] : m[1] === '-' ? age < +m[2] : age === +m[2];
        };
      }
      case '-newer': {
        const ref = ctx.resolve(arg(t));
        if (!ref) throw new ShellError(`impossibile trovare «${tokens[i - 1]}»`);
        return n => n.node.modified > ref.modified;
      }
      case '-maxdepth': global.maxdepth = int(arg(t)); return () => true;
      case '-mindepth': global.mindepth = int(arg(t)); return () => true;
      case '-true': return () => true;
      case '-false': return () => false;
      case '-print': global.printed = true; return n => (n.out.push(n.path), true);
      case '-print0': global.printed = true; return n => (n.out.push(n.path + '\0'), true);
      case '-delete': global.printed = true; return n => (n.deletes.push(n.node.id), true);
      case '-exec': case '-ok': {
        const cmd = [];
        while (i < tokens.length && tokens[i] !== ';' && tokens[i] !== '+') cmd.push(tokens[i++]);
        const plus = tokens[i] === '+';
        if (i >= tokens.length) throw new ShellError('manca la fine di «-exec» («;» o «+»)');
        i++;
        if (!cmd.length) throw new ShellError('manca il comando di «-exec»');
        global.printed = true;
        const ex = { cmd, plus, batch: [] };
        execs.push(ex);
        return n => {
          if (plus) { ex.batch.push(n.path); return true; }
          n.runs.push(cmd.map(a => a.replaceAll('{}', n.path)));
          return true;
        };
      }
    }
    throw new ShellError(`predicato sconosciuto: «${t}»`);
  };
  const expr = tokens.length ? or() : () => true;
  if (i < tokens.length) throw new ShellError(`argomento inatteso: «${tokens[i]}»`);
  return { expr, global, execs };
}

async function find(ctx) {
  const args = ctx.args;
  let k = 0;
  while (k < args.length && !/^[-(!]/.test(args[k])) k++;
  const starts = k ? args.slice(0, k) : ['.'];
  const { expr, global, execs } = parseFind(ctx, args.slice(k));
  let status = 0;
  const deletes = [];
  const run = async argv => {
    const code = await ctx.shell.invoke(argv, ctx.io);
    if (code !== 0) status = 1;
    return code === 0;
  };
  for (const start of starts) {
    const root = ctx.resolve(start);
    if (!root) { await ctx.error(`«${start}»: file o cartella inesistente`); status = 1; continue; }
    const walk = async (node, path, depth) => {
      await ctx.tick();
      if (depth >= global.mindepth) {
        const n = { node, path, out: [], deletes, runs: [] };
        if (expr(n) && !global.printed) n.out.push(path);
        for (const line of n.out) await ctx.out(line.endsWith('\0') ? line : line + '\n');
        for (const argv of n.runs) await run(argv);
      }
      if (node.type === 'folder' && depth < global.maxdepth) {
        for (const child of [...fs.children(node.id)].sort((a, b) => byName(a.name, b.name))) {
          await walk(child, path.endsWith('/') ? path + child.name : `${path}/${child.name}`, depth + 1);
        }
      }
    };
    await walk(root, start, 0);
  }
  for (const ex of execs.filter(e => e.plus && e.batch.length)) {
    const at = ex.cmd.indexOf('{}');
    await run(at < 0 ? [...ex.cmd, ...ex.batch] : [...ex.cmd.slice(0, at), ...ex.batch, ...ex.cmd.slice(at + 1)]);
  }
  // Deepest first, so a folder is not trashed before what it contains is considered
  if (deletes.length) fs.trash([...deletes].reverse().filter(id => fs.exists(id)));
  return status;
}

async function tree(ctx) {
  const { opts, args } = options(ctx, { flags: 'adf', values: 'L' });
  const max = opts.L != null ? int(opts.L) : Infinity;
  let folders = 0, files = 0, status = 0;
  for (const start of args.length ? args : ['.']) {
    const root = ctx.resolve(start);
    if (!root) { await ctx.error(`«${start}»: file o cartella inesistente`); status = 1; continue; }
    await ctx.out(colored(ctx, root, start) + '\n');
    const walk = async (node, prefix, depth) => {
      if (depth > max) return;
      const children = sortNodes(visibleChildren(node.id, opts).filter(n => !opts.d || n.type === 'folder'), {});
      for (let i = 0; i < children.length; i++) {
        await ctx.tick();
        const child = children[i];
        const last = i === children.length - 1;
        const name = opts.f ? `${prefix.replace(/[│├└─ ]/g, '')}${child.name}` : child.name;
        await ctx.out(`${prefix}${last ? '└── ' : '├── '}${colored(ctx, child, name)}${child.type === 'app' ? ` -> app:${child.app}` : ''}\n`);
        if (child.type === 'folder') {
          folders++;
          await walk(child, prefix + (last ? '    ' : '│   '), depth + 1);
        } else files++;
      }
    };
    await walk(root, '', 1);
  }
  await ctx.out(`\n${folders} ${folders === 1 ? 'cartella' : 'cartelle'}${opts.d ? '' : `, ${files} file`}\n`);
  return status;
}

async function basename(ctx) {
  const { opts, args } = options(ctx, { flags: 'az', values: 's', long: { multiple: 'a', suffix: 's' } });
  if (!args.length) throw new ShellError('manca l’operando', 2);
  const names = opts.a || opts.s != null ? args : [args[0]];
  const suffix = opts.s ?? (opts.a ? null : args[1]);
  for (const path of names) {
    let base = path.replace(/\/+$/, '').split('/').pop() || (path.startsWith('/') ? '/' : '');
    if (suffix && base.endsWith(suffix) && base !== suffix) base = base.slice(0, -suffix.length);
    await ctx.out(base + (opts.z ? '\0' : '\n'));
  }
}

async function dirname(ctx) {
  if (!ctx.args.length) throw new ShellError('manca l’operando', 2);
  for (const path of ctx.args) {
    const trimmed = path.replace(/\/+$/, '');
    const i = trimmed.lastIndexOf('/');
    await ctx.out((i < 0 ? '.' : i === 0 ? '/' : trimmed.slice(0, i).replace(/\/+$/, '') || '/') + '\n');
  }
}

async function realpath(ctx) {
  const { opts, args } = options(ctx, { flags: 'emq' });
  let status = 0;
  for (const path of args.length ? args : ['.']) {
    const node = ctx.resolve(path);
    if (node) { await ctx.out(fs.path(node.id) + '\n'); continue; }
    if (opts.m) { await ctx.out([fs.home, ...segments(ctx.cwd, path)].join('/') + '\n'); continue; }
    if (!opts.q) await ctx.error(`${path}: file o cartella inesistente`);
    status = 1;
  }
  return status;
}

export const fileCommands = [
  { name: 'ls', usage: 'ls [-laAh1trSdRF] [percorso…]', summary: 'Elenca il contenuto delle cartelle.', run: ls,
    help: '-l  dettagli (tipo, dimensione, data, tag)\n-a  anche i nomi che iniziano con «.»\n-h  dimensioni leggibili (1,2K)\n-t  per data, -S per dimensione, -r al contrario\n-1  uno per riga\n-d  la cartella stessa, non il contenuto\n-R  anche le sottocartelle\n-F  / dopo le cartelle, @ dopo i collegamenti, * dopo gli script' },
  { name: 'cat', usage: 'cat [-nbsE] [file…]', summary: 'Mostra il contenuto dei file (o dell’input), uno dopo l’altro.', run: cat,
    help: '-n  numera le righe\n-b  numera solo quelle non vuote\n-s  una sola riga vuota di fila\n-E  $ alla fine di ogni riga' },
  { name: 'mkdir', usage: 'mkdir [-pv] cartella…', summary: 'Crea delle cartelle.', run: mkdir, help: '-p  crea anche le cartelle intermedie; nessun errore se esiste già' },
  { name: 'touch', usage: 'touch [-c] file…', summary: 'Crea dei file vuoti, o aggiorna la data di modifica di quelli che esistono.', run: touch },
  { name: 'cp', usage: 'cp [-rnv] origine… destinazione', summary: 'Copia file e cartelle.', run: cp,
    help: '-r  copia anche le cartelle, con il loro contenuto\n-n  non sovrascrive i file che esistono\n-v  dice cosa copia' },
  { name: 'mv', usage: 'mv [-nv] origine… destinazione', summary: 'Sposta o rinomina file e cartelle.', run: mv,
    help: 'Se la destinazione è una cartella, ci sposta dentro; altrimenti rinomina. Un file sovrascritto va nel cestino.\n-n  non sovrascrive\n-v  dice cosa sposta' },
  { name: 'rm', usage: 'rm [-rfvd] [--purge] percorso…', summary: 'Sposta file e cartelle nel cestino (con --purge li elimina per sempre).', run: rm,
    help: '-r  anche le cartelle, con il loro contenuto\n-d  le cartelle vuote\n-f  nessun errore per ciò che non esiste\n--purge  elimina definitivamente, senza cestino\nCiò che va nel cestino si rimette a posto con «trash restore».' },
  { name: 'rmdir', usage: 'rmdir [-p] cartella…', summary: 'Rimuove cartelle vuote (nel cestino).', run: rmdir },
  { name: 'stat', usage: 'stat [-c formato] percorso…', summary: 'Mostra i dettagli di file e cartelle.', run: stat,
    help: '-c  formato: %n nome, %s dimensione, %F tipo, %y data di modifica, %Y in secondi, %w %W creazione, %i id' },
  { name: 'find', usage: 'find [percorso…] [espressione]', summary: 'Cerca file e cartelle.', run: find,
    help: 'Test: -name modello, -iname, -path, -type f|d|l, -empty, -size [+-]n[ckMG], -mtime [+-]giorni, -mmin, -newer file\nAzioni: -print, -print0, -delete (nel cestino), -exec comando {} \\; oppure +\nOpzioni: -maxdepth n, -mindepth n. Insieme: ! (negazione), -o (o), ( … )\nEsempio: find . -name "*.txt" -size +1k' },
  { name: 'tree', usage: 'tree [-adf] [-L livelli] [cartella…]', summary: 'Mostra le cartelle ad albero.', run: tree },
  { name: 'basename', usage: 'basename percorso [suffisso]', summary: 'L’ultima parte di un percorso (senza il suffisso).', run: basename },
  { name: 'dirname', usage: 'dirname percorso…', summary: 'Il percorso senza l’ultima parte.', run: dirname },
  { name: 'realpath', usage: 'realpath [-m] percorso…', summary: 'Il percorso completo.', run: realpath },
];
