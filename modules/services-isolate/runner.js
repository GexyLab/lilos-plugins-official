import e from"isolated-vm";var t=1e3,n=e=>process.send?.(e),r=e=>{n({type:`exit`,reason:e}),setTimeout(()=>process.exit(1),50)},i=`
'use strict';
const info = JSON.parse(_info);
delete globalThis._info;
const call = async (method, params) => JSON.parse(await _call.apply(undefined, [method, JSON.stringify(params)], { result: { promise: true } }));
const text = args => args.map(a => {
  if (typeof a === 'string') return a;
  if (a instanceof Error) return a.stack || a.message;
  try { return JSON.stringify(a); } catch { return String(a); }
}).join(' ');
const log = level => (...args) => _log.applyIgnored(undefined, [level, text(args)]);
globalThis.console = Object.freeze({ log: log('info'), info: log('info'), debug: log('info'), warn: log('warn'), error: log('error') });
// lilos.locale: the kernel sends the translations engine as text (the SDK's i18n.js) with the app's strings
const locale = typeof info.i18n === 'string' ? (0, eval)('(' + info.i18n + ')')(info.locale).locale : null;
delete info.i18n;

const timers = new Map();
let nextTimer = 1;
const timer = repeat => (fn, ms, ...args) => {
  if (typeof fn !== 'function') throw new TypeError('Serve una funzione');
  const id = nextTimer++;
  timers.set(id, { fn, args, repeat });
  _timer.applyIgnored(undefined, [id, Math.max(0, Number(ms) || 0), repeat]);
  return id;
};
const clear = id => { if (timers.delete(id)) _clear.applyIgnored(undefined, [id]); };
globalThis.setTimeout = timer(false);
globalThis.setInterval = timer(true);
globalThis.clearTimeout = clear;
globalThis.clearInterval = clear;
globalThis.__fire = id => {
  const t = timers.get(id);
  if (!t) return;
  if (!t.repeat) timers.delete(id);
  try {
    const out = t.fn(...t.args);
    if (out && typeof out.then === 'function') out.then(null, err => console.error('Errore in un timer:', err));
  } catch (err) {
    console.error('Errore in un timer:', err);
  }
};

let handler = null;
const lilos = Object.freeze({
  app: Object.freeze({ id: info.id, version: info.version, entry: info.entry, args: info.args, user: info.user }),
  ...(locale && { locale }),
  handle(fn) {
    if (typeof fn !== 'function') throw new TypeError('lilos.handle vuole una funzione');
    handler = fn;
  },
  storage: Object.freeze({ get: key => call('storage.get', [key]), set: (key, value) => call('storage.set', [key, value]) }),
  files: Object.freeze({
    read: path => call('files.read', [path]),
    write: (path, text) => call('files.write', [path, text]),
    list: path => call('files.list', [path]),
    mkdir: path => call('files.mkdir', [path]),
  }),
  net: Object.freeze({ fetch: (url, options) => call('net.fetch', [url, options ?? {}]) }),
  ui: Object.freeze({ notify: text => call('ui.notify', [text]) }),
  apps: Object.freeze({ updates: () => call('apps.updates', []) }),
  home: Object.freeze({
    load: () => call('home.load', []),
    sync: changes => call('home.sync', [changes]),
    read: id => call('home.read', [id]),
    write: (id, data) => call('home.write', [id, data]),
  }),
});
globalThis.__start = fn => fn({ lilos, args: info.args });
// The requests being answered: id → { cancelled, listeners }. The handler's third argument tells it
// when its caller gave up (the scheduler's «Annulla», the operation's time limit)
const live = new Map();
globalThis.__request = async (data, from, id) => {
  if (!handler) throw new Error('Il servizio non risponde: non ha chiamato lilos.handle()');
  const state = { cancelled: false, listeners: new Set() };
  live.set(id, state);
  const request = Object.freeze({
    get cancelled() { return state.cancelled; },
    onCancel(fn) {
      if (typeof fn !== 'function') throw new TypeError('onCancel vuole una funzione');
      if (state.cancelled) { fn(); return () => {}; }
      state.listeners.add(fn);
      return () => state.listeners.delete(fn);
    },
  });
  try {
    return JSON.stringify((await handler(JSON.parse(data), JSON.parse(from), request)) ?? null);
  } finally {
    live.delete(id);
  }
};
globalThis.__cancel = id => {
  const state = live.get(id);
  if (!state || state.cancelled) return;
  state.cancelled = true;
  for (const fn of state.listeners) {
    try { fn(); } catch (err) { console.error('Errore in onCancel:', err); }
  }
  state.listeners.clear();
};
`,a=null,o=128,s=1e4,c=new Map,l=new Map,u=1,d=null,f=null,p=null,m=e=>(a?.isDisposed&&r(`memoria esaurita (al massimo ${o} MB)`),e);async function h({code:r,info:h,limits:g}){s=g?.cpuMs??s,o=g?.memoryMb??o,a=new e.Isolate({memoryLimit:o});let _=await a.createContext(),v=_.global;await v.set(`_info`,JSON.stringify(h)),await v.set(`_call`,new e.Reference((e,t)=>new Promise((r,i)=>{let a=u++;c.set(a,{resolve:r,reject:i}),n({type:`call`,id:a,method:e,params:JSON.parse(t)})}))),await v.set(`_log`,new e.Reference((e,t)=>n({type:`log`,level:e,text:t}))),await v.set(`_timer`,new e.Reference((e,r,i)=>{if(l.size>=t)return;let o=()=>{i||l.delete(e),a.isDisposed||d?.apply(void 0,[e],{timeout:s}).catch(e=>{m(e),n({type:`log`,level:`error`,text:`Timer: ${e.message}`})})};l.set(e,i?setInterval(o,Math.max(10,r)):setTimeout(o,r))})),await v.set(`_clear`,new e.Reference(e=>{clearTimeout(l.get(e)),clearInterval(l.get(e)),l.delete(e)})),await _.eval(i,{timeout:s}),d=await v.get(`__fire`,{reference:!0}),f=await v.get(`__request`,{reference:!0}),p=await v.get(`__cancel`,{reference:!0});let y=await a.compileModule(r,{filename:`${h.id}/${h.entry}.js`});await y.instantiate(_,e=>{throw Error(`import non permesso: ${e}`)}),await y.evaluate({timeout:s});let b=await y.namespace.get(h.entry,{reference:!0});if(b.typeof!==`function`)throw Error(`Il codice non esporta la funzione ${h.entry}`);await(await v.get(`__start`,{reference:!0})).apply(void 0,[b.derefInto()],{result:{promise:!0},timeout:s})}process.on(`message`,async e=>{if(e&&typeof e==`object`){if(e.type===`start`)try{await h(e),n({type:`ready`})}catch(e){m(e),n({type:`failed`,error:e.message}),setTimeout(()=>process.exit(1),50)}else if(e.type===`request`)try{let t=await f.apply(void 0,[JSON.stringify(e.data??null),JSON.stringify(e.from??null),e.id],{result:{promise:!0},timeout:s});n({type:`answer`,id:e.id,result:JSON.parse(t)})}catch(t){m(t),n({type:`answer`,id:e.id,error:t.message})}else if(e.type===`cancel`)p?.apply(void 0,[e.id],{timeout:s}).catch(e=>{m(e),n({type:`log`,level:`error`,text:`Annullamento: ${e.message}`})});else if(e.type===`reply`){let t=c.get(e.id);if(!t)return;c.delete(e.id),e.error?t.reject(Error(e.error)):t.resolve(JSON.stringify(e.result??null))}else e.type===`stop`&&process.exit(0)}}),process.on(`disconnect`,()=>process.exit(0));export{};