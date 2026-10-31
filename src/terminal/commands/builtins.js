import { fs } from '@lilos/sdk';
import { options, int } from './options.js';
import { quote, helpText } from '../shell/Shell.js';
import { parse } from '../shell/parser.js';
import {
  BreakSignal, ContinueSignal, ReturnSignal, ExitSignal, ShellError, ParseError, Incomplete,
} from '../shell/signals.js';

/**
 * Commands that change or read the state of the shell: they need ctx.shell. `builtin: true`
 * (type says "comando interno della shell").
 */
const KEYWORDS = ['if', 'then', 'else', 'elif', 'fi', 'case', 'esac', 'for', 'while', 'until', 'do', 'done', 'in', 'function', '{', '}', '!', '[[', ']]'];
const OPTION_NAMES = { errexit: 'e', nounset: 'u', xtrace: 'x', noglob: 'f', pipefail: null };

const ESCAPES = { n: '\n', t: '\t', r: '\r', a: '\x07', b: '\b', e: '\x1b', E: '\x1b', f: '\f', v: '\v', '\\': '\\' };

/** Backslash escapes of echo -e, printf and %b. Returns { text, stop } (\c stops the output). */
export function unescape(s, { printf = false } = {}) {
  let text = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c !== '\\' || i === s.length - 1) { text += c; continue; }
    const n = s[++i];
    if (ESCAPES[n] != null) { text += ESCAPES[n]; continue; }
    if (n === 'c') return { text, stop: true };
    if (printf && n === '"') { text += '"'; continue; }
    let m;
    const rest = s.slice(i);
    if ((m = /^x([0-9a-fA-F]{1,2})/.exec(rest))) { text += String.fromCharCode(parseInt(m[1], 16)); i += m[0].length - 1; continue; }
    if ((m = /^u([0-9a-fA-F]{1,4})/.exec(rest)) || (m = /^U([0-9a-fA-F]{1,8})/.exec(rest))) { text += String.fromCodePoint(Math.min(parseInt(m[1], 16), 0x10ffff)); i += m[0].length - 1; continue; }
    if ((m = (printf ? /^([0-7]{1,3})/ : /^0([0-7]{0,3})/).exec(rest))) { text += String.fromCharCode(parseInt(m[1] || '0', 8)); i += m[0].length - 1; continue; }
    text += '\\' + n;
  }
  return { text, stop: false };
}

/** printf's format, applied again while arguments are left. */
export function format(fmt, args) {
  let out = '', k = 0, errors = [];
  const SPEC = /%([-+ #0]*)(\*|\d+)?(?:\.(\*|\d*))?([diouxXfFeEgGcsbq%])/y;
  const next = () => (k < args.length ? args[k++] : undefined);
  const num = v => {
    if (v == null || v === '') return 0;
    if (/^['"]./.test(v)) return v.codePointAt(1);
    const t = v.trim();
    if (/^[+-]?(0[xX][0-9a-fA-F]+|\d+)$/.test(t)) return Number(t.startsWith('-') ? -Number(t.slice(1)) : Number(t.replace(/^\+/, '')));
    if (/^[+-]?0[0-7]+$/.test(t)) return parseInt(t, 8);
    const f = Number(t);
    if (Number.isFinite(f)) return f;
    errors.push(`${v}: è richiesto un numero`);
    return 0;
  };
  do {
    const start = k;
    for (let i = 0; i < fmt.length;) {
      const c = fmt[i];
      if (c === '\\') {
        const end = /^\\(x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{1,4}|[0-7]{1,3}|.)/s.exec(fmt.slice(i))[0];
        const { text, stop } = unescape(end, { printf: true });
        out += text;
        if (stop) return { text: out, errors };
        i += end.length;
        continue;
      }
      if (c !== '%') { out += c; i++; continue; }
      SPEC.lastIndex = i;
      const m = SPEC.exec(fmt);
      if (!m) { out += c; i++; continue; }
      i += m[0].length;
      let [, flags, width, precision, conv] = m;
      if (conv === '%') { out += '%'; continue; }
      if (width === '*') width = String(num(next()));
      if (precision === '*') precision = String(num(next()));
      const arg = next();
      let s;
      switch (conv) {
        case 's': s = arg ?? ''; if (precision) s = s.slice(0, Number(precision)); break;
        case 'b': { const r = unescape(arg ?? ''); s = r.text; break; }
        case 'q': s = quote(arg ?? ''); break;
        case 'c': s = (arg ?? '')[0] ?? ''; break;
        case 'd': case 'i': case 'u': {
          const n = Math.trunc(num(arg));
          s = String(Math.abs(n));
          if (precision) s = s.padStart(Number(precision), '0');
          s = (n < 0 ? '-' : flags.includes('+') ? '+' : flags.includes(' ') ? ' ' : '') + s;
          break;
        }
        case 'o': s = (flags.includes('#') ? '0' : '') + Math.trunc(num(arg)).toString(8); break;
        case 'x': s = (flags.includes('#') ? '0x' : '') + Math.trunc(num(arg)).toString(16); break;
        case 'X': s = (flags.includes('#') ? '0X' : '') + Math.trunc(num(arg)).toString(16).toUpperCase(); break;
        default: {
          const n = num(arg), p = precision === undefined || precision === '' ? 6 : Number(precision);
          s = conv === 'e' || conv === 'E' ? n.toExponential(p).replace(/e([+-])(\d)$/, 'e$10$2') : conv === 'g' || conv === 'G' ? String(Number(n.toPrecision(p || 1))) : n.toFixed(p);
          if (conv === 'E' || conv === 'G') s = s.toUpperCase();
          if (n >= 0 && flags.includes('+')) s = '+' + s;
        }
      }
      const w = Number(width ?? 0);
      if (s.length < w) {
        if (flags.includes('-')) s = s.padEnd(w);
        else if (flags.includes('0') && /[diouxXfFeEgG]/.test(conv)) {
          const sign = /^[+-]/.test(s) ? s[0] : '';
          s = sign + s.slice(sign.length).padStart(w - sign.length, '0');
        } else s = s.padStart(w);
      }
      out += s;
    }
    if (k === start) break;
  } while (k < args.length);
  return { text: out, errors };
}

/** Evaluates the arguments of test / [ . */
function test(shell, a) {
  let i = 0;
  const BIN = ['=', '==', '!=', '<', '>', '-eq', '-ne', '-lt', '-le', '-gt', '-ge', '-nt', '-ot', '-ef'];
  const UNARY = /^-[a-zA-Z]$/;
  if (a.length === 1) return a[0] !== '';
  const or = () => {
    let v = and();
    while (a[i] === '-o') { i++; const r = and(); v = v || r; }
    return v;
  };
  const and = () => {
    let v = not();
    while (a[i] === '-a') { i++; const r = not(); v = v && r; }
    return v;
  };
  const not = () => {
    if (a[i] === '!' && i + 1 < a.length) { i++; return !not(); }
    return primary();
  };
  const primary = () => {
    if (i >= a.length) throw new ShellError('manca un argomento', 2);
    if (a[i] === '(' && i + 2 < a.length) {
      i++;
      const v = or();
      if (a[i] !== ')') throw new ShellError('manca «)»', 2);
      i++;
      return v;
    }
    if (i + 2 < a.length + 0 && BIN.includes(a[i + 1]) && i + 2 <= a.length - 1) {
      const v = shell.binaryTest(a[i + 1], a[i], a[i + 2]);
      i += 3;
      return v;
    }
    if (UNARY.test(a[i]) && i + 1 < a.length) {
      const v = shell.unaryTest(a[i], a[i + 1]);
      i += 2;
      return v;
    }
    return a[i++] !== '';
  };
  if (!a.length) return false;
  const v = or();
  if (i < a.length) throw new ShellError(`${a[i]}: argomento inatteso`, 2);
  return v;
}

function printVar(name, v) {
  const flags = (Array.isArray(v.value) ? 'a' : '') + (v.exported ? 'x' : '') + (v.readonly ? 'r' : '');
  const value = Array.isArray(v.value)
    ? `(${Object.keys(v.value).map(k => `[${k}]=${JSON.stringify(v.value[k])}`).join(' ')})`
    : JSON.stringify(v.value);
  return `declare -${flags || '-'} ${name}=${value}\n`;
}

/** Declares variables: local, declare, typeset, readonly, export share this. */
async function declare(ctx, { local = false, exported, readonly = false, flags = 'axrigpfFn' } = {}) {
  const shell = ctx.shell;
  const { opts, args } = options(ctx, { flags });
  if (opts.f || opts.F) {
    const names = args.length ? args : [...shell.functions.keys()].sort();
    let status = 0;
    for (const name of names) {
      const fn = shell.functions.get(name);
      if (!fn) { status = 1; continue; }
      await ctx.out(opts.F ? `declare -f ${name}\n` : `${fn.text}\n`);
    }
    return status;
  }
  const isLocal = local || (ctx.name !== 'export' && ctx.name !== 'readonly' && shell.funcDepth > 0 && !opts.g);
  if (!args.length || opts.p) {
    const vars = shell.variables().filter(([n, v]) => (!args.length || args.includes(n))
      && (!(opts.x || ctx.name === 'export') || v.exported) && (!(opts.r || ctx.name === 'readonly') || v.readonly) && (!opts.a || Array.isArray(v.value)));
    for (const [name, v] of vars) await ctx.out(printVar(name, v));
    return 0;
  }
  let status = 0;
  for (const arg of args) {
    const m = /^([A-Za-z_]\w*)(?:\[([^\]]*)\])?(\+?)(?:=(.*))?$/s.exec(arg);
    if (!m) { await ctx.error(`«${arg}»: identificatore non valido`); status = 1; continue; }
    const [, name, index, append, value] = m;
    const exp = opts.n ? false : opts.x || exported ? true : undefined;
    if (value === undefined) {
      shell.setVar(name, opts.a && !shell.isSet(name) ? [] : undefined, null, { local: isLocal, exported: exp, readonly: readonly || opts.r });
      continue;
    }
    const arrayLiteral = /^\((.*)\)$/s.exec(value);
    const parsed = shell.declArrays?.get(name);
    if (arrayLiteral && (opts.a || parsed)) {
      shell.declArrays?.delete(name);
      let items = parsed ?? (arrayLiteral[1].trim() ? arrayLiteral[1].trim().split(/\s+/) : []);
      if (append) items = [...(shell.getArray(name) ?? []), ...items];
      shell.setVar(name, items, null, { local: isLocal, exported: exp, readonly: readonly || opts.r });
      continue;
    }
    const idx = index != null ? shell.arrayIndex(index) : null;
    const final = append ? (shell.getVar(name, idx) ?? '') + value : value;
    shell.setVar(name, opts.i ? String(shell.arith(final)) : final, idx, { local: isLocal, exported: exp, readonly: readonly || opts.r });
  }
  return status;
}

const exitCode = (ctx, value, fallback) => {
  if (value == null) return fallback;
  if (!/^-?\d+$/.test(value)) throw new ShellError(`${value}: è richiesto un argomento numerico`, 2);
  return ((Number(value) % 256) + 256) % 256;
};

export const builtins = [
  {
    name: 'cd', usage: 'cd [cartella]', summary: 'Cambia la cartella di lavoro.',
    help: 'Senza argomenti va nella home ($HOME). «cd -» torna alla cartella precedente ($OLDPWD).',
    async run(ctx) {
      const shell = ctx.shell;
      const { args } = options(ctx, { flags: 'LPe' });
      let target = args[0] ?? shell.getVar('HOME') ?? '~';
      if (args.length > 1) throw new ShellError('troppi argomenti');
      if (target === '-') {
        target = shell.getVar('OLDPWD');
        if (target == null) throw new ShellError('OLDPWD non impostata');
        await ctx.out(target + '\n');
      }
      const node = ctx.resolve(target);
      if (!node) throw new ShellError(`${target}: file o cartella inesistente`);
      if (node.type !== 'folder') throw new ShellError(`${target}: non è una cartella`);
      shell.cwd = node.id;
    },
  },
  {
    name: 'pwd', usage: 'pwd', summary: 'Mostra la cartella di lavoro.',
    async run(ctx) { await ctx.out(fs.path(ctx.cwd) + '\n'); },
  },
  {
    name: 'echo', ownHelp: true, usage: 'echo [-neE] [testo…]', summary: 'Scrive gli argomenti, separati da uno spazio.',
    help: '-n  senza a capo finale\n-e  interpreta \\n, \\t, \\\\, \\e… \n-E  non le interpreta (predefinito)',
    async run(ctx) {
      let args = ctx.args, newline = true, escapes = false;
      while (args.length && /^-[neE]+$/.test(args[0])) {
        for (const f of args[0].slice(1)) {
          if (f === 'n') newline = false;
          else escapes = f === 'e';
        }
        args = args.slice(1);
      }
      let text = args.join(' ');
      if (escapes) {
        const r = unescape(text);
        text = r.text;
        if (r.stop) newline = false;
      }
      await ctx.out(text + (newline ? '\n' : ''));
    },
  },
  {
    name: 'printf', ownHelp: true, usage: 'printf [-v var] formato [argomenti…]', summary: 'Scrive gli argomenti secondo un formato (%s, %d, %5.2f, %x, %b, %q…).',
    help: 'Il formato si riapplica finché restano argomenti. -v salva il risultato in una variabile.',
    async run(ctx) {
      let args = ctx.args, target = null;
      if (args[0] === '-v') { target = args[1]; args = args.slice(2); }
      if (args[0] === '--') args = args.slice(1);
      if (!args.length) throw new ShellError(`uso: ${this.usage}`, 2);
      const { text, errors } = format(args[0], args.slice(1));
      for (const e of errors) await ctx.error(e);
      if (target) ctx.shell.setVar(target, text);
      else await ctx.out(text);
      return errors.length ? 1 : 0;
    },
  },
  {
    name: 'export', usage: 'export [-n] [nome[=valore]…]', summary: 'Rende le variabili visibili ai comandi e agli script avviati.',
    help: 'Senza argomenti elenca le variabili esportate. -n toglie l’esportazione.',
    run: ctx => declare(ctx, { exported: true, flags: 'npf' }),
  },
  {
    name: 'readonly', usage: 'readonly [nome[=valore]…]', summary: 'Rende le variabili di sola lettura.',
    run: ctx => declare(ctx, { readonly: true, flags: 'ap' }),
  },
  {
    name: 'local', usage: 'local [-arx] nome[=valore]…', summary: 'Variabili visibili solo dentro la funzione.',
    run(ctx) {
      if (!ctx.shell.funcDepth) throw new ShellError('si può usare solo in una funzione');
      return declare(ctx, { local: true, flags: 'axrin' });
    },
  },
  {
    name: 'declare', usage: 'declare [-aprxifF] [nome[=valore]…]', summary: 'Dichiara variabili e ne mostra gli attributi.',
    help: '-a array, -x esportata, -r sola lettura, -i intero (il valore si calcola), -p mostra, -f mostra le funzioni, -g globale dentro una funzione.',
    run: ctx => declare(ctx),
  },
  { name: 'typeset', usage: 'typeset [-aprxifF] [nome[=valore]…]', summary: 'Come declare.', run: ctx => declare(ctx) },
  {
    name: 'unset', usage: 'unset [-fv] nome…', summary: 'Elimina variabili (o funzioni con -f).',
    async run(ctx) {
      const { opts, args } = options(ctx, { flags: 'fv' });
      for (const arg of args) {
        if (opts.f) { ctx.shell.functions.delete(arg); continue; }
        const m = /^([A-Za-z_]\w*)(?:\[(.*)\])?$/.exec(arg);
        if (!m) throw new ShellError(`«${arg}»: identificatore non valido`);
        if (m[2] == null && !opts.v && !ctx.shell.isSet(m[1]) && ctx.shell.functions.has(m[1])) ctx.shell.functions.delete(m[1]);
        else ctx.shell.unsetVar(m[1], m[2] == null ? null : ctx.shell.arrayIndex(m[2]));
      }
    },
  },
  {
    name: 'env', usage: 'env [nome=valore…] [comando [argomenti…]]', summary: 'Mostra le variabili esportate, o avvia un comando con variabili in più.',
    async run(ctx) {
      const args = [...ctx.args];
      const extra = new Map();
      while (args.length && /^[A-Za-z_]\w*=/.test(args[0])) {
        const [name, value] = args.shift().split(/=(.*)/s);
        extra.set(name, { value, exported: true });
      }
      if (!args.length) {
        const env = { ...ctx.shell.environment(), ...Object.fromEntries([...extra].map(([k, v]) => [k, v.value])) };
        for (const k of Object.keys(env).sort()) await ctx.out(`${k}=${env[k]}\n`);
        return 0;
      }
      ctx.shell.scopes.push(extra);
      try {
        return await ctx.shell.invoke(args, ctx.io, { functions: false });
      } finally {
        ctx.shell.scopes.splice(ctx.shell.scopes.indexOf(extra), 1);
      }
    },
  },
  {
    name: 'printenv', usage: 'printenv [nome…]', summary: 'Mostra le variabili esportate (o il valore di quelle indicate).',
    async run(ctx) {
      const env = ctx.shell.environment();
      if (!ctx.args.length) {
        for (const k of Object.keys(env).sort()) await ctx.out(`${k}=${env[k]}\n`);
        return 0;
      }
      let status = 0;
      for (const name of ctx.args) {
        if (name in env) await ctx.out(env[name] + '\n');
        else status = 1;
      }
      return status;
    },
  },
  {
    name: 'set', ownHelp: true, usage: 'set [-euxf] [-o opzione] [--] [argomenti…]', summary: 'Imposta le opzioni della shell e i parametri posizionali ($1, $2…).',
    help: '-e  esce al primo comando che fallisce\n-u  errore se si usa una variabile non impostata\n-x  mostra i comandi prima di eseguirli\n-f  niente espansione di * e ?\n-o pipefail  una pipe fallisce se fallisce uno dei suoi comandi\n+e, +u… le disattivano. Senza argomenti mostra tutte le variabili.',
    async run(ctx) {
      const shell = ctx.shell;
      const args = ctx.args;
      if (!args.length) {
        for (const [name, v] of shell.variables()) await ctx.out(`${name}=${Array.isArray(v.value) ? `(${v.value.map(quote).join(' ')})` : quote(v.value)}\n`);
        return 0;
      }
      for (let i = 0; i < args.length; i++) {
        const a = args[i];
        if (a === '--') { shell.positional = args.slice(i + 1); return 0; }
        if (/^[-+]o$/.test(a)) {
          const name = args[++i];
          if (name == null) {
            for (const [o] of Object.entries(OPTION_NAMES)) await ctx.out(`${o.padEnd(15)}${shell.options[o] ? 'on' : 'off'}\n`);
            continue;
          }
          if (!(name in OPTION_NAMES)) throw new ShellError(`${name}: nome di opzione non valido`, 2);
          shell.options[name] = a[0] === '-';
          continue;
        }
        if (/^[-+][euxfv]+$/.test(a)) {
          for (const f of a.slice(1)) {
            const name = Object.keys(OPTION_NAMES).find(k => OPTION_NAMES[k] === f);
            if (name) shell.options[name] = a[0] === '-';
          }
          continue;
        }
        if (/^[-+]/.test(a) && a.length > 1) throw new ShellError(`${a}: opzione non valida`, 2);
        shell.positional = args.slice(i);
        return 0;
      }
      return 0;
    },
  },
  {
    name: 'shift', usage: 'shift [n]', summary: 'Sposta i parametri posizionali: $2 diventa $1…',
    run(ctx) {
      const n = ctx.args[0] == null ? 1 : int(ctx.args[0]);
      if (n > ctx.shell.positional.length) return 1;
      ctx.shell.positional = ctx.shell.positional.slice(n);
      return 0;
    },
  },
  { name: 'true', ownHelp: true, usage: 'true', summary: 'Non fa niente, con successo (stato 0).', run: () => 0 },
  { name: 'false', ownHelp: true, usage: 'false', summary: 'Non fa niente, senza successo (stato 1).', run: () => 1 },
  { name: ':', ownHelp: true, usage: ': [argomenti…]', summary: 'Non fa niente (stato 0); gli argomenti vengono comunque espansi.', run: () => 0 },
  {
    name: 'test', ownHelp: true, usage: 'test espressione', summary: 'Valuta un’espressione: stato 0 se vera, 1 se falsa.',
    help: 'File: -e esiste, -f è un file, -d è una cartella, -s non è vuoto\nTesto: -z vuoto, -n non vuoto, a = b, a != b\nNumeri: -eq -ne -lt -le -gt -ge\nInsieme: ! negazione, -a e, -o o, ( … )',
    run: ctx => (test(ctx.shell, ctx.args) ? 0 : 1),
  },
  {
    name: '[', ownHelp: true, usage: '[ espressione ]', summary: 'Come test, con una «]» finale.',
    run(ctx) {
      if (ctx.args.at(-1) !== ']') throw new ShellError('manca «]»', 2);
      return test(ctx.shell, ctx.args.slice(0, -1)) ? 0 : 1;
    },
  },
  {
    name: 'let', ownHelp: true, usage: 'let espressione…', summary: 'Calcola espressioni aritmetiche (stato 1 se l’ultima vale 0).',
    run(ctx) {
      if (!ctx.args.length) throw new ShellError('manca l’espressione', 2);
      let v = 0n;
      for (const e of ctx.args) v = ctx.shell.arith(e);
      return v !== 0n ? 0 : 1;
    },
  },
  {
    name: 'exit', usage: 'exit [stato]', summary: 'Chiude il terminale (o esce dallo script) con uno stato.',
    run(ctx) { throw new ExitSignal(exitCode(ctx, ctx.args[0], ctx.shell.status)); },
  },
  {
    name: 'return', usage: 'return [stato]', summary: 'Esce dalla funzione (o dallo script letto con source).',
    run(ctx) {
      if (!ctx.shell.funcDepth && !ctx.shell.sourceDepth) throw new ShellError('si può usare solo in una funzione o in uno script letto con source');
      throw new ReturnSignal(exitCode(ctx, ctx.args[0], ctx.shell.status));
    },
  },
  {
    name: 'break', usage: 'break [n]', summary: 'Esce dal ciclo (o da n cicli).',
    async run(ctx) {
      if (!ctx.shell.loopDepth) { await ctx.error('ha senso solo in un ciclo for, while o until'); return 0; }
      const n = ctx.args[0] == null ? 1 : int(ctx.args[0]);
      if (n < 1) throw new ShellError(`${n}: numero di cicli non valido`);
      throw new BreakSignal(Math.min(n, ctx.shell.loopDepth));
    },
  },
  {
    name: 'continue', usage: 'continue [n]', summary: 'Passa al giro successivo del ciclo (o dell’n-esimo ciclo esterno).',
    async run(ctx) {
      if (!ctx.shell.loopDepth) { await ctx.error('ha senso solo in un ciclo for, while o until'); return 0; }
      const n = ctx.args[0] == null ? 1 : int(ctx.args[0]);
      if (n < 1) throw new ShellError(`${n}: numero di cicli non valido`);
      throw new ContinueSignal(Math.min(n, ctx.shell.loopDepth));
    },
  },
  {
    name: 'read', usage: 'read [-rs] [-p prompt] [-a array] [-d delim] [nome…]', summary: 'Legge una riga e la divide nelle variabili indicate ($REPLY senza nomi).',
    help: '-r  le barre rovesciate restano come sono\n-p  mostra un prompt\n-a  mette le parole in un array\n-d  legge fino a questo carattere invece che fino all’a capo\n-s  non mostra ciò che si scrive (per le password)\nStato 1 alla fine dell’input.',
    async run(ctx) {
      const shell = ctx.shell;
      const { opts, args } = options(ctx, { flags: 'rs', values: 'pad' });
      if (opts.p) await ctx.err(opts.p);
      const delim = opts.d === undefined ? '\n' : opts.d[0] ?? '\0';
      ctx.stdin.silent = !!opts.s;
      let line;
      try {
        line = await ctx.stdin.readLine(delim);
        if (line != null && !opts.r) {
          while (/(^|[^\\])(\\\\)*\\$/.test(line)) {
            const more = await ctx.stdin.readLine(delim);
            line = line.slice(0, -1) + (more ?? '');
            if (more == null) break;
          }
        }
      } finally {
        ctx.stdin.silent = false;
      }
      if (opts.s && ctx.stdin === shell.host.stdin) await ctx.err('\n');
      const eof = line == null;
      line ??= '';
      const raw = opts.r ? line : line.replace(/\\(.)/g, '$1');
      const ifs = shell.getVar('IFS') ?? ' \t\n';
      const ws = [...ifs].filter(c => /\s/.test(c)).join('');
      const trim = s => s.replace(new RegExp(`^[${escapeClass(ws)}]+|[${escapeClass(ws)}]+$`, 'g'), '');
      const split = s => (ifs ? trim(s).split(new RegExp(`[${escapeClass(ws)}]*[${escapeClass(ifs)}][${escapeClass(ws)}]*|[${escapeClass(ws)}]+`)).filter((x, i, all) => x !== '' || i < all.length - 1) : [s]);
      if (opts.a) {
        shell.setVar(opts.a, raw === '' ? [] : split(raw));
        return eof ? 1 : 0;
      }
      if (!args.length) {
        shell.setVar('REPLY', line);
        return eof && !line ? 1 : eof ? 1 : 0;
      }
      let rest = ifs ? trim(raw) : raw;
      args.forEach((name, i) => {
        if (i === args.length - 1) { shell.setVar(name, rest); return; }
        const m = ifs ? new RegExp(`^([^${escapeClass(ifs)}]*)(?:[${escapeClass(ws)}]*[${escapeClass(ifs)}][${escapeClass(ws)}]*|[${escapeClass(ws)}]+|$)`).exec(rest) : null;
        shell.setVar(name, m ? m[1] : rest);
        rest = m ? rest.slice(m[0].length) : '';
      });
      return eof ? 1 : 0;
    },
  },
  {
    name: 'source', usage: 'source file [argomenti…]', summary: 'Esegue i comandi di un file in questa shell (variabili, funzioni e alias restano).',
    run: ctx => source(ctx),
  },
  { name: '.', usage: '. file [argomenti…]', summary: 'Come source.', run: ctx => source(ctx) },
  {
    name: 'eval', ownHelp: true, usage: 'eval [argomenti…]', summary: 'Esegue gli argomenti, uniti da spazi, come un comando.',
    async run(ctx) {
      try {
        return await ctx.shell.run(ctx.args.join(' '), ctx.io);
      } catch (err) {
        if (err instanceof ParseError || err instanceof Incomplete) throw new ShellError(err.message || 'errore di sintassi: fine del testo inattesa', 2);
        throw err;
      }
    },
  },
  {
    name: 'alias', usage: 'alias [nome[=valore]…]', summary: 'Definisce o mostra gli alias (nomi brevi per comandi).',
    help: 'Esempio: alias ll=\'ls -l\'. Gli alias valgono dalla riga successiva a quella che li definisce.',
    async run(ctx) {
      const aliases = ctx.shell.aliases;
      const { args } = options(ctx, { flags: 'p' });
      if (!args.length) {
        for (const [k, v] of [...aliases].sort()) await ctx.out(`alias ${k}=${quote(v)}\n`);
        return 0;
      }
      let status = 0;
      for (const arg of args) {
        const eq = arg.indexOf('=');
        if (eq > 0) {
          const name = arg.slice(0, eq);
          if (/[\s/$`=|&;<>()'"\\]/.test(name)) { await ctx.error(`«${name}»: nome di alias non valido`); status = 1; continue; }
          aliases.set(name, arg.slice(eq + 1));
        } else if (aliases.has(arg)) await ctx.out(`alias ${arg}=${quote(aliases.get(arg))}\n`);
        else { await ctx.error(`${arg}: non trovato`); status = 1; }
      }
      return status;
    },
  },
  {
    name: 'unalias', usage: 'unalias [-a] nome…', summary: 'Elimina degli alias (tutti con -a).',
    async run(ctx) {
      const { opts, args } = options(ctx, { flags: 'a' });
      if (opts.a) { ctx.shell.aliases.clear(); return 0; }
      let status = 0;
      for (const name of args) {
        if (!ctx.shell.aliases.delete(name)) { await ctx.error(`${name}: non trovato`); status = 1; }
      }
      return status;
    },
  },
  {
    name: 'type', usage: 'type [-t] nome…', summary: 'Dice cos’è un nome: alias, parola chiave, funzione, comando.',
    async run(ctx) {
      const { opts, args } = options(ctx, { flags: 'ta' });
      let status = 0;
      for (const name of args) {
        const what = describe(ctx.shell, name);
        if (!what) { if (!opts.t) await ctx.error(`${name}: non trovato`); status = 1; continue; }
        if (opts.t) { await ctx.out(what.kind + '\n'); continue; }
        await ctx.out(what.text + '\n');
      }
      return status;
    },
  },
  {
    name: 'command', usage: 'command [-v] nome [argomenti…]', summary: 'Avvia un comando ignorando le funzioni con lo stesso nome; con -v dice cosa avvierebbe.',
    async run(ctx) {
      const { opts, args } = options(ctx, { flags: 'vVp', stopAtArg: true });
      if (!args.length) return 0;
      if (opts.v || opts.V) {
        let status = 0;
        for (const name of args) {
          const what = describe(ctx.shell, name);
          if (!what) { status = 1; continue; }
          await ctx.out((opts.V ? what.text : what.kind === 'alias' ? `alias ${name}=${quote(ctx.shell.aliases.get(name))}` : what.path ?? name) + '\n');
        }
        return status;
      }
      return ctx.shell.invoke(args, ctx.io, { functions: false });
    },
  },
  {
    name: 'which', usage: 'which nome…', summary: 'Dice dove si trova un comando.',
    async run(ctx) {
      let status = 0;
      for (const name of ctx.args) {
        const what = describe(ctx.shell, name);
        if (!what || what.kind === 'alias' || what.kind === 'keyword' || what.kind === 'function') { status = 1; continue; }
        await ctx.out((what.path ?? `${name}: comando integrato nel Terminale`) + '\n');
      }
      return status;
    },
  },
  {
    name: 'history', usage: 'history [-c] [n]', summary: 'Mostra i comandi dati (gli ultimi n); -c cancella la cronologia.',
    async run(ctx) {
      const { opts, args } = options(ctx, { flags: 'c' });
      const history = ctx.shell.host.history;
      if (!history) return 0;
      if (opts.c) { history.clear(); return 0; }
      const list = history.list();
      const n = args[0] == null ? list.length : int(args[0]);
      const from = Math.max(0, list.length - n);
      for (let i = from; i < list.length; i++) await ctx.out(`${String(i + 1).padStart(5)}  ${list[i]}\n`);
    },
  },
  {
    name: 'help', usage: 'help [comando]', summary: 'Elenca i comandi, o spiega quello indicato.',
    async run(ctx) {
      const commands = ctx.shell.commands;
      if (ctx.args.length) {
        let status = 0;
        for (const name of ctx.args) {
          const cmd = commands.get(name);
          if (cmd) await ctx.out(helpText(cmd));
          else if (SYNTAX[name]) await ctx.out(SYNTAX[name].trim() + '\n');
          else { await ctx.error(`nessun aiuto per «${name}»`); status = 1; }
        }
        return status;
      }
      const all = [...commands.values()].filter((c, i, list) => list.indexOf(c) === i && !c.hidden).sort((a, b) => a.name.localeCompare(b.name));
      const width = Math.max(...all.map(c => c.name.length)) + 2;
      await ctx.out('Terminale di lilOS: una shell come bash sui file di lilOS.\n«help comando» o «comando --help» spiega un comando; «help if», «help for», «help case»… la sintassi.\n\n');
      for (const c of all) await ctx.out(`  ${c.name.padEnd(width)}${c.summary ?? ''}${c.app ? ` (${c.app})` : ''}\n`);
      await ctx.out(`\nSintassi: ${Object.keys(SYNTAX).join(', ')}\n`);
    },
  },
  {
    name: 'clear', usage: 'clear', summary: 'Pulisce lo schermo (anche Ctrl L).',
    async run(ctx) { if (ctx.stdout === ctx.shell.host.stdout) ctx.shell.host.clear?.(); else await ctx.out('\x1b[2J\x1b[H'); },
  },
  {
    name: 'jobs', usage: 'jobs [-lp]', summary: 'Elenca i comandi avviati in background con &.',
    async run(ctx) {
      const { opts } = options(ctx, { flags: 'lp' });
      const list = ctx.shell.jobs.list;
      for (const j of list) {
        const mark = j === list.at(-1) ? '+' : j === list.at(-2) ? '-' : ' ';
        if (opts.p) await ctx.out(`${j.pid}\n`);
        else await ctx.out(`[${j.id}]${mark} ${opts.l ? `${j.pid} ` : ''}${j.state === 'done' ? (j.code === 0 ? 'Fatto' : `Uscita ${j.code}`) : 'In esecuzione'}\t\t${j.text}\n`);
      }
    },
  },
  {
    name: 'wait', usage: 'wait [%job | pid…]', summary: 'Aspetta che finiscano i comandi in background (tutti, o quelli indicati).',
    async run(ctx) {
      const shell = ctx.shell;
      if (!ctx.args.length) {
        let status = 0;
        for (const job of [...shell.jobs.list]) status = await shell.waitJob(job);
        return status;
      }
      let status = 0;
      for (const spec of ctx.args) {
        const job = shell.findJob(spec);
        if (!job) { await ctx.error(`${spec}: non è un job di questa shell`); status = 127; continue; }
        status = await shell.waitJob(job);
      }
      return status;
    },
  },
  {
    name: 'fg', usage: 'fg [%job]', summary: 'Porta in primo piano un comando in background: lo si aspetta e Ctrl C lo interrompe.',
    async run(ctx) {
      const shell = ctx.shell;
      const job = shell.findJob(ctx.args[0]);
      if (!job) throw new ShellError(`${ctx.args[0] ?? 'attuale'}: job inesistente`);
      await ctx.out(job.text + '\n');
      const code = await shell.waitJob(job, { forward: true });
      shell.jobs.list = shell.jobs.list.filter(j => j !== job);
      return code;
    },
  },
  {
    name: 'kill', usage: 'kill [-segnale] %job | pid…', summary: 'Interrompe dei comandi in background.',
    async run(ctx) {
      let args = ctx.args;
      if (args[0] === '-l') { await ctx.out('HUP INT QUIT KILL TERM\n'); return 0; }
      if (args[0] === '-s' || args[0] === '-n') args = args.slice(2);
      else if (/^-\w+$/.test(args[0] ?? '')) args = args.slice(1);
      if (!args.length) throw new ShellError(`uso: ${this.usage}`, 2);
      let status = 0;
      for (const spec of args) {
        const job = ctx.shell.findJob(spec);
        if (!job) { await ctx.error(`${spec}: job o processo inesistente`); status = 1; continue; }
        job.token.abort();
      }
      return status;
    },
  },
  {
    name: 'sleep', usage: 'sleep durata…', summary: 'Aspetta: 5 (secondi), 0.5, 2m, 1h.',
    async run(ctx) {
      if (!ctx.args.length) throw new ShellError('manca la durata', 2);
      let ms = 0;
      for (const a of ctx.args) {
        const m = /^(\d+(?:\.\d*)?|\.\d+)([smhd]?)$/.exec(a);
        if (!m) throw new ShellError(`durata non valida: «${a}»`, 2);
        ms += Number(m[1]) * { '': 1, s: 1, m: 60, h: 3600, d: 86400 }[m[2]] * 1000;
      }
      await ctx.shell.sleep(ms);
    },
  },
  {
    name: 'bash', usage: 'bash [-c comandi | script] [argomenti…]', summary: 'Esegue uno script o dei comandi in una nuova shell.',
    help: '«bash script.sh a b» esegue lo script con $1=a, $2=b; «bash -c \'echo $1\' nome x» esegue il testo; «cat script.sh | bash» legge lo script dall’input.',
    run: ctx => runBash(ctx),
  },
  { name: 'sh', usage: 'sh [-c comandi | script] [argomenti…]', summary: 'Come bash.', run: ctx => runBash(ctx) },
];

async function source(ctx) {
  const shell = ctx.shell;
  const [file, ...args] = ctx.args;
  if (!file) throw new ShellError('manca il nome del file', 2);
  let path = file;
  if (!file.includes('/') && !ctx.resolve(file)) {
    const dir = (shell.getVar('PATH') ?? '').split(':').find(d => d && ctx.resolve(`${d}/${file}`)?.type === 'file');
    if (dir) path = `${dir}/${file}`;
  }
  const text = await shell.readScript(path);
  try {
    parse(text, { aliases: shell.aliases });
  } catch (err) {
    if (err instanceof ParseError || err instanceof Incomplete) throw new ShellError(`${file}: ${err.message || 'errore di sintassi: fine del file inattesa'}`, 2);
    throw err;
  }
  const saved = shell.positional;
  if (args.length) shell.positional = args;
  shell.sourceDepth = (shell.sourceDepth ?? 0) + 1;
  try {
    return await shell.exec({ type: 'script', source: text }, ctx.io);
  } catch (err) {
    if (err instanceof ReturnSignal) return err.code;
    throw err;
  } finally {
    shell.sourceDepth--;
    if (args.length) shell.positional = saved;
  }
}

async function runBash(ctx) {
  const shell = ctx.shell;
  const args = [...ctx.args];
  const flags = { e: false, x: false, u: false };
  let command = null;
  while (args.length && /^-[cexu]+$/.test(args[0])) {
    for (const f of args.shift().slice(1)) {
      if (f === 'c') command = args.shift();
      else flags[f] = true;
    }
  }
  if (command == null && args[0] === '-c') throw new ShellError('-c: manca il testo dei comandi', 2);
  const sub = shell.subshell({ script: true });
  Object.assign(sub.options, { errexit: flags.e, xtrace: flags.x, nounset: flags.u });
  if (command != null) {
    sub.setVar('0', args[0] ?? 'bash');
    sub.positional = args.slice(1);
    return sub.runSource(command, ctx.io, 'bash');
  }
  if (args.length) {
    sub.setVar('0', args[0]);
    sub.positional = args.slice(1);
    let text;
    try {
      text = await shell.readScript(args[0]);
    } catch (err) {
      if (err instanceof ShellError) throw new ShellError(err.message, err.code);
      throw err;
    }
    return sub.runSource(text, ctx.io, args[0]);
  }
  if (ctx.stdin === shell.host.stdin) {
    await ctx.err('Sei già in bash: per uno script scrivi «bash file.sh» o «source file.sh».\n');
    return 0;
  }
  return sub.runSource(await ctx.stdin.readAll(), ctx.io, 'bash');
}

/** { kind, text, path? } for type, command -v and which; null if unknown. */
export function describe(shell, name) {
  if (shell.aliases.has(name)) return { kind: 'alias', text: `${name} è un alias di «${shell.aliases.get(name)}»` };
  if (KEYWORDS.includes(name)) return { kind: 'keyword', text: `${name} è una parola chiave della shell` };
  if (shell.functions.has(name)) return { kind: 'function', text: `${name} è una funzione\n${shell.functions.get(name).text}` };
  const cmd = shell.commands.get(name);
  if (cmd?.builtin) return { kind: 'builtin', text: `${name} è un comando interno della shell` };
  if (cmd?.app) return { kind: 'file', text: `${name} è un comando dell’app ${cmd.app}` };
  if (cmd) return { kind: 'file', text: `${name} è un comando del Terminale` };
  for (const dir of (shell.getVar('PATH') ?? '').split(':').filter(Boolean)) {
    for (const file of [name, `${name}.sh`]) {
      const node = shell.resolve(`${dir}/${file}`);
      if (node?.type === 'file') return { kind: 'file', text: `${name} è ${fs.path(node.id)}`, path: fs.path(node.id) };
    }
  }
  if (name.includes('/') && shell.resolve(name)?.type === 'file') return { kind: 'file', text: `${name} è ${name}`, path: name };
  return null;
}

const escapeClass = s => s.replace(/[\]\\^-]/g, '\\$&');

const SYNTAX = {
  if: `if comandi; then comandi; [elif comandi; then comandi;] [else comandi;] fi
Esegue il ramo del primo «if»/«elif» i cui comandi riescono (stato 0).
  if [ -f note.txt ]; then echo c’è; else echo manca; fi`,
  for: `for nome in parole…; do comandi; done
for (( inizio; condizione; passo )); do comandi; done
  for f in *.txt; do wc -l "$f"; done
  for ((i = 1; i <= 3; i++)); do echo $i; done`,
  while: `while comandi; do comandi; done   (until: finché i comandi NON riescono)
  n=0; while [ $n -lt 3 ]; do echo $n; n=$((n + 1)); done
  ls | while read -r nome; do echo "- $nome"; done`,
  until: 'until comandi; do comandi; done: ripete finché i comandi non riescono.',
  case: `case parola in modello|modello) comandi;; … esac
I modelli usano * ? [ ]. «;&» prosegue nel ramo dopo, «;;&» prova anche i modelli successivi.
  case "$f" in *.txt) echo testo;; *.png|*.jpg) echo immagine;; *) echo altro;; esac`,
  function: `nome() { comandi; }   oppure   function nome { comandi; }
Gli argomenti sono $1, $2…, $@; «local» crea variabili della funzione, «return n» esce.
  saluta() { echo "Ciao, $1"; }; saluta Eugenio`,
  '[[': `[[ espressione ]]: test senza divisione in parole né espansione di *.
  [[ $nome == *.txt ]]      confronto con un modello
  [[ $s =~ ^[0-9]+$ ]]      espressione regolare (gruppi in BASH_REMATCH)
  [[ -d dir && ! -e file ]] -e -f -d -s -z -n, && || ! ( )`,
  '((': `(( espressione )): aritmetica intera; stato 0 se il risultato non è 0.
  (( n++ )); (( n > 3 )) && echo grande; echo $(( 2 ** 10 ))`,
  variabili: `nome=valore (senza spazi), $nome o \${nome}. Array: a=(x y z), \${a[0]}, \${a[@]}, \${#a[@]}.
\${v:-predefinito} \${v:=predefinito} \${v:+alt} \${#v} \${v#prefisso} \${v%suffisso} \${v/da/a} \${v//da/a} \${v:inizio:lunghezza} \${v^^} \${v,,}
Speciali: $? stato dell’ultimo comando, $$ la shell, $! l’ultimo comando in background, $# $@ $* gli argomenti.`,
  redirezioni: `> file (sovrascrive), >> file (aggiunge), < file (legge), 2> errori, 2>&1, &> file, <<EOF … EOF, <<< testo, | pipe.
/dev/null scarta tutto.`,
};
