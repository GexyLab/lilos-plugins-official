import { fs, tags, session, TAG_COLORS } from '@lilos/sdk';
import { installedApps, launch, openFile } from '@lilos/system';
import { options } from './options.js';
import { ShellError } from '../shell/signals.js';
import { columns, human } from './files.js';
import { byName } from '../shell/paths.js';

/** Commands of lilOS itself: open, trash, tag, apps; and date, whoami, hostname, uname. */
const toTerminal = ctx => ctx.stdout === ctx.shell.host.stdout;
const findApp = name => {
  const key = String(name).toLowerCase();
  return installedApps().find(a => a.id.toLowerCase() === key) ?? installedApps().find(a => a.name.toLowerCase() === key) ?? null;
};

async function open(ctx) {
  const { opts, args } = options(ctx, { values: 'a', long: { app: 'a' } });
  if (opts.a != null) {
    const app = findApp(opts.a);
    if (!app) throw new ShellError(`app non trovata: «${opts.a}» (vedi «apps»)`);
    if (!args.length) { launch(app.id); return 0; }
    for (const path of args) {
      const node = ctx.resolve(path);
      if (!node) throw new ShellError(`${path}: file o cartella inesistente`);
      launch(app.id, node.type === 'folder' ? { folder: node.id } : { file: node.id });
    }
    return 0;
  }
  if (!args.length) throw new ShellError(`uso: ${ctx.cmd.usage}`, 2);
  let status = 0;
  for (const path of args) {
    const node = ctx.resolve(path);
    if (!node) { await ctx.error(`${path}: file o cartella inesistente`); status = 1; continue; }
    if (node.type === 'folder') launch('files', { folder: node.id });
    else if (node.type === 'app') launch(node.app);
    else openFile(node);
  }
  return status;
}

const when = ms => new Date(ms).toLocaleString('it-IT', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

/** Trashed items matching names or ids (the newest first for equal names). */
function pick(ctx, names) {
  const all = fs.trashed();
  return names.map(name => {
    const item = all.find(t => t.id === name) ?? all.find(t => t.name === name) ?? all.find(t => t.name.toLowerCase() === name.toLowerCase());
    if (!item) throw new ShellError(`«${name}» non è nel cestino`);
    return item;
  });
}

async function trash(ctx) {
  const [sub = 'list', ...rest] = ctx.args;
  switch (sub) {
    case 'list': case 'ls': {
      const items = fs.trashed();
      if (!items.length) { await ctx.out('Il cestino è vuoto.\n'); return 0; }
      for (const t of items) {
        const from = fs.exists(t.trashed.from) ? fs.path(t.trashed.from) : '(cartella eliminata)';
        const size = t.type === 'folder' ? `${t.inside} elementi` : human(t.bytes);
        await ctx.out(`${when(t.trashed.at)}  ${size.padStart(10)}  ${t.name}${t.type === 'folder' ? '/' : ''}  ← ${from}\n`);
      }
      return 0;
    }
    case 'put': {
      if (!rest.length) throw new ShellError('manca cosa mettere nel cestino', 2);
      let status = 0;
      for (const path of rest) {
        const node = ctx.resolve(path);
        if (!node) { await ctx.error(`${path}: file o cartella inesistente`); status = 1; continue; }
        if (!fs.trash([node.id]).length) { await ctx.error(`${path}: non si può cestinare (cartella di sistema)`); status = 1; }
      }
      return status;
    }
    case 'restore': {
      if (!rest.length) throw new ShellError('manca il nome di ciò che va rimesso a posto', 2);
      for (const { id, parent } of fs.untrash(pick(ctx, rest).map(t => t.id))) await ctx.out(`rimesso in ${fs.path(id)}${parent === fs.root ? '' : ''}\n`);
      return 0;
    }
    case 'rm': {
      if (!rest.length) throw new ShellError('manca il nome', 2);
      const n = fs.purge(pick(ctx, rest).map(t => t.id));
      await ctx.out(`${n === 1 ? 'eliminato definitivamente 1 elemento' : `eliminati definitivamente ${n} elementi`}\n`);
      return 0;
    }
    case 'empty': {
      const n = fs.purgeTrash();
      await ctx.out(n ? `Cestino svuotato (${n} ${n === 1 ? 'elemento' : 'elementi'}).\n` : 'Il cestino era già vuoto.\n');
      return 0;
    }
  }
  throw new ShellError(`sottocomando sconosciuto: «${sub}»\nUso: ${ctx.cmd.usage}`, 2);
}

function tagByName(name, create = false) {
  const tag = tags.byName(name) ?? tags.get(name);
  if (tag) return tag;
  if (create) return tags.create({ name });
  throw new ShellError(`tag inesistente: «${name}» (vedi «tag ls»)`);
}

async function tag(ctx) {
  const [sub = 'ls', ...rest] = ctx.args;
  const swatch = color => (toTerminal(ctx) ? `\x1b[38;2;${parseInt(color.slice(1, 3), 16)};${parseInt(color.slice(3, 5), 16)};${parseInt(color.slice(5, 7), 16)}m●\x1b[0m ` : '');
  switch (sub) {
    case 'ls': case 'list': {
      if (rest.length) {
        for (const name of rest) {
          const t = tagByName(name);
          for (const node of fs.tagged(t.id).sort((a, b) => byName(fs.path(a.id), fs.path(b.id)))) await ctx.out(fs.path(node.id) + (node.type === 'folder' ? '/' : '') + '\n');
        }
        return 0;
      }
      const list = tags.list();
      if (!list.length) { await ctx.out('Nessun tag. Creane uno con «tag new nome».\n'); return 0; }
      for (const t of list) await ctx.out(`${swatch(t.color)}${t.name}  (${fs.tagged(t.id).length})${t.visible ? '' : '  nascosto'}\n`);
      return 0;
    }
    case 'show': {
      let status = 0;
      for (const path of rest.length ? rest : ['.']) {
        const node = ctx.resolve(path);
        if (!node) { await ctx.error(`${path}: file o cartella inesistente`); status = 1; continue; }
        const names = (node.tags ?? []).map(id => tags.get(id)).filter(Boolean).map(t => swatch(t.color) + t.name);
        await ctx.out(`${path}: ${names.length ? names.join(', ') : 'nessun tag'}\n`);
      }
      return status;
    }
    case 'add': case 'rm': {
      const [name, ...paths] = rest;
      if (!name || !paths.length) throw new ShellError(`uso: tag ${sub} nome file…`, 2);
      const created = sub === 'add' && !tags.byName(name);
      const t = tagByName(name, sub === 'add');
      if (created) await ctx.out(`creato il tag «${t.name}»\n`);
      let status = 0;
      for (const path of paths) {
        const node = ctx.resolve(path);
        if (!node) { await ctx.error(`${path}: file o cartella inesistente`); status = 1; continue; }
        if (node.system) { await ctx.error(`${path}: gli elementi di sistema non hanno tag`); status = 1; continue; }
        const now = node.tags ?? [];
        fs.setTags(node.id, sub === 'add' ? [...now, t.id] : now.filter(id => id !== t.id));
      }
      return status;
    }
    case 'new': {
      const [name, color] = rest;
      if (!name) throw new ShellError('uso: tag new nome [colore]', 2);
      const found = color ? TAG_COLORS.find(c => c.label.toLowerCase() === color.toLowerCase())?.value ?? color : undefined;
      const t = tags.create({ name, color: found });
      await ctx.out(`creato il tag ${swatch(t.color)}${t.name}\n`);
      return 0;
    }
    case 'delete': {
      if (!rest.length) throw new ShellError('uso: tag delete nome…', 2);
      for (const name of rest) {
        tags.remove(tagByName(name).id);
      }
      return 0;
    }
  }
  throw new ShellError(`sottocomando sconosciuto: «${sub}»\nUso: ${ctx.cmd.usage}`, 2);
}

async function apps(ctx) {
  const list = [...installedApps()].sort((a, b) => byName(a.name, b.name));
  const width = Math.max(...list.map(a => a.id.length));
  for (const app of list) {
    const version = app.package?.manifest?.version ?? '';
    await ctx.out(`${app.id.padEnd(width)}  ${app.name}${version ? `  ${version}` : ''}\n`);
  }
}

const DAYS = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
const MONTHS = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

export function strftime(format, d, utc = false) {
  const g = k => (utc ? d[`getUTC${k}`]() : d[`get${k}`]());
  const p = (v, n = 2) => String(v).padStart(n, '0');
  const start = utc ? Date.UTC(g('FullYear'), 0, 1) : new Date(g('FullYear'), 0, 1).getTime();
  const offset = utc ? 0 : -d.getTimezoneOffset();
  const map = {
    Y: () => g('FullYear'), y: () => p(g('FullYear') % 100), m: () => p(g('Month') + 1), d: () => p(g('Date')), e: () => String(g('Date')).padStart(2),
    H: () => p(g('Hours')), I: () => p(((g('Hours') + 11) % 12) + 1), M: () => p(g('Minutes')), S: () => p(g('Seconds')), N: () => p(g('Milliseconds'), 3) + '000000',
    p: () => (g('Hours') < 12 ? 'AM' : 'PM'), A: () => DAYS[g('Day')], a: () => DAYS[g('Day')].slice(0, 3), B: () => MONTHS[g('Month')], b: () => MONTHS[g('Month')].slice(0, 3), h: () => MONTHS[g('Month')].slice(0, 3),
    j: () => p(Math.floor((d - start) / 86400e3) + 1, 3), u: () => g('Day') || 7, w: () => g('Day'), s: () => Math.floor(d / 1000),
    z: () => (offset >= 0 ? '+' : '-') + p(Math.floor(Math.abs(offset) / 60)) + p(Math.abs(offset) % 60), Z: () => (utc ? 'UTC' : Intl.DateTimeFormat().resolvedOptions().timeZone),
    F: () => `${map.Y()}-${map.m()}-${map.d()}`, T: () => `${map.H()}:${map.M()}:${map.S()}`, D: () => `${map.m()}/${map.d()}/${map.y()}`, R: () => `${map.H()}:${map.M()}`,
    c: () => `${map.a()} ${map.e()} ${map.b()} ${map.Y()}, ${map.T()}`, x: () => `${map.d()}/${map.m()}/${map.Y()}`, X: () => map.T(), n: () => '\n', t: () => '\t', '%': () => '%',
  };
  return format.replace(/%([a-zA-Z%])/g, (m, c) => (map[c] ? String(map[c]()) : m));
}

async function date(ctx) {
  const { opts, args } = options(ctx, { flags: 'uR', values: 'dI', long: { utc: 'u', date: 'd', 'iso-8601': 'I', rfc: 'R' } });
  let d = new Date();
  if (opts.d != null) {
    const v = opts.d.trim();
    d = /^@\d+$/.test(v) ? new Date(Number(v.slice(1)) * 1000) : v === 'now' ? new Date() : v === 'yesterday' || v === 'ieri' ? new Date(Date.now() - 86400e3) : v === 'tomorrow' || v === 'domani' ? new Date(Date.now() + 86400e3) : new Date(v);
    if (Number.isNaN(d.getTime())) throw new ShellError(`data non valida: «${opts.d}»`);
  }
  const fmt = args.find(a => a.startsWith('+'));
  if (fmt) return ctx.out(strftime(fmt.slice(1), d, opts.u) + '\n');
  if (opts.I != null) return ctx.out(strftime(opts.I === 'seconds' ? '%Y-%m-%dT%H:%M:%S%z' : '%F', d, opts.u) + '\n');
  if (opts.R) return ctx.out(d.toUTCString() + '\n');
  await ctx.out(strftime('%a %e %b %Y, %H:%M:%S %Z', d, opts.u) + '\n');
}

export const lilosCommands = [
  { name: 'open', usage: 'open [-a app] percorso…', summary: 'Apre file e cartelle con la loro app (o con quella indicata).', run: open,
    help: 'open note.txt   apre con l’app predefinita\nopen .   apre la cartella nel File Manager\nopen -a editor note.txt   con un’app precisa\nopen -a photo   avvia un’app' },
  { name: 'trash', usage: 'trash [list | put percorso… | restore nome… | rm nome… | empty]', summary: 'Il cestino: elenca, rimette a posto, svuota.', run: trash,
    help: 'trash              elenca ciò che è nel cestino\ntrash put file     sposta nel cestino (come rm -r)\ntrash restore nome rimette a posto\ntrash rm nome      elimina definitivamente\ntrash empty        svuota il cestino' },
  { name: 'tag', usage: 'tag [ls [tag…] | show percorso… | add tag percorso… | rm tag percorso… | new nome [colore] | delete tag…]', summary: 'I tag di lilOS: elenca, assegna, toglie.', run: tag,
    help: 'tag                elenca i tag\ntag ls Lavoro      gli elementi con il tag\ntag show file      i tag di un elemento\ntag add Lavoro f   mette il tag (lo crea se non c’è)\ntag rm Lavoro f    lo toglie\ntag new nome blu   crea un tag\ntag delete nome    elimina un tag' },
  { name: 'apps', usage: 'apps', summary: 'Elenca le app installate (id, nome, versione).', run: apps },
  { name: 'date', usage: 'date [-u] [-d data] [+formato]', summary: 'Data e ora.', run: date,
    help: 'Formato: %Y anno, %m mese, %d giorno, %H:%M:%S ora, %A giorno della settimana, %B mese, %s secondi dal 1970, %F = %Y-%m-%d, %T = %H:%M:%S\n-d @1700000000, -d 2026-01-01, -d ieri\nEsempio: date +%F' },
  { name: 'whoami', usage: 'whoami', summary: 'Il nome dell’utente.', run: ctx => ctx.out((session.user?.username || ctx.shell.getVar('USER') || 'utente') + '\n') },
  { name: 'hostname', usage: 'hostname', summary: 'Il nome del sistema.', run: ctx => ctx.out((ctx.shell.getVar('HOSTNAME') ?? 'lilos') + '\n') },
  { name: 'uname', usage: 'uname [-a]', summary: 'Il nome del sistema operativo.', run: ctx => ctx.out(ctx.args.includes('-a') ? `lilOS lilos ${ctx.shell.getVar('BASH_VERSION')} ${navigator.platform || ''}\n`.replace(/ \n$/, '\n') : 'lilOS\n') },
];

export { columns };
