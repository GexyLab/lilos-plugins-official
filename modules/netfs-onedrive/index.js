import { createReadStream, createWriteStream } from 'node:fs';
import { rm, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

/**
 * OneDrive for the Rete folder (service 'netfs.onedrive', see the kernel's net/drivers.js): the
 * user's own OneDrive, personal or of work or school, through Microsoft Graph.
 *
 * Sign-in: the provider's page in a window (OAuth 2.0 authorization code with PKCE, the kernel's
 * net/signin.js), with the app each lilOS installation registers on Azure as a public client
 * ("Mobile and desktop applications" platform: the kernel redeems the code itself, with no
 * secret). The refresh token is the connection's secret; Microsoft gives a new one at each
 * renewal, and the driver hands it to the kernel (saveSecret). Access tokens stay in memory.
 *
 * Shared folders: Graph's list of what others shared (sharedWithMe) stops working in November
 * 2026, so the folders shared with the user open through their shortcuts, the ones added to "My
 * files" on onedrive.com: with the `shared` setting on, a shortcut is a folder of the connection
 * and what is inside it is read on the drive it points to (that needs Files.ReadWrite.All).
 *
 * Downloads resume (Range); uploads start over (an upload session cannot add to a file). Removing
 * sends to OneDrive's recycle bin. Settings (the module's configuration, Control Panel → OneDrive):
 *   clientId   the application (client) ID of the app on Azure
 *   accounts   'common' (personal and work or school) | 'organizations' | 'consumers' | 'tenant'
 *   tenant     the directory (tenant) ID or domain, with accounts 'tenant'
 *   shared     open the shared folders added as shortcuts (asks for Files.ReadWrite.All)
 * For tests only: loginUrl and graphUrl replace Microsoft's addresses.
 */
const SIMPLE_MAX = 4 << 20;                  // bigger files go by upload session
const CHUNK = 320 * 1024 * 32;               // 10 MiB: upload pieces are multiples of 320 KiB
const TIMEOUT = 60_000;                      // a request that gives no answer for this long fails
const RETRIES = 3;                           // throttled (429, 503) or broken requests, tried again
const MAX_WAIT = 30_000;                     // longest Retry-After honored
const MAX_PAGES = 200;                       // 200 × 999 entries in a folder, at most
const SELECT = 'name,size,folder,file,package,remoteItem,lastModifiedDateTime';
const FORBIDDEN = /["*:<>?\\|\u0000-\u001f]/;
const RESERVED = /^(\.lock|con|prn|aux|nul|com\d|lpt\d|desktop\.ini|_vti_.*)$/i;

const label = (en, it) => ({ en, it });
const netError = (net, message, extra = {}) => Object.assign(new Error(message), { net, ...extra });

let conf = {};

const loginBase = () => String(conf.loginUrl || 'https://login.microsoftonline.com').replace(/\/+$/, '');
const graphBase = () => String(conf.graphUrl || 'https://graph.microsoft.com/v1.0').replace(/\/+$/, '');
const clientId = () => (typeof conf.clientId === 'string' ? conf.clientId.trim() : '');
const sharedOn = () => conf.shared === true;

/** The directory the sign-in goes to: common, organizations, consumers, or one tenant. */
function authority() {
  const kind = ['common', 'organizations', 'consumers', 'tenant'].includes(conf.accounts) ? conf.accounts : 'common';
  if (kind !== 'tenant') return kind;
  const tenant = String(conf.tenant ?? '').trim();
  if (!/^[\w.-]{1,100}$/.test(tenant)) throw netError('invalid', 'ID della directory (tenant) non valido nelle impostazioni di OneDrive');
  return tenant;
}

const scopes = () => ['offline_access', 'User.Read', sharedOn() ? 'Files.ReadWrite.All' : 'Files.ReadWrite'].join(' ');

/** '/a b/c' → '/a%20b/c' (each part encoded, ':' and '#' too). */
const encodePath = path => path.split('/').map(encodeURIComponent).join('/');

/** A folder of OneDrive as the user writes it ('Lavoro/2026/') → '/Lavoro/2026'; '/' for all of it. */
export function cleanRoot(raw) {
  const parts = String(raw ?? '').split(/[/\\]+/).map(p => p.trim()).filter(Boolean);
  if (parts.some(p => p === '.' || p === '..' || FORBIDDEN.test(p))) throw netError('invalid', 'Cartella di OneDrive non valida');
  return `/${parts.join('/')}`;
}

const joinPath = (a, b) => (a === '/' ? b : b === '/' ? a : `${a}${b}`);
const parentOf = path => path.slice(0, path.lastIndexOf('/')) || '/';
const baseName = path => path.slice(path.lastIndexOf('/') + 1);

/** A name OneDrive accepts for a new file or folder. Throws 'invalid'. */
function checkName(name) {
  if (FORBIDDEN.test(name)) throw netError('invalid', `OneDrive non accetta questi caratteri nei nomi: " * : < > ? \\ | («${name}»)`);
  if (RESERVED.test(name) || name.startsWith('~$')) throw netError('invalid', `OneDrive non accetta il nome «${name}»`);
  if (/^\s|[\s.]$/.test(name)) throw netError('invalid', `OneDrive non accetta nomi che iniziano con uno spazio o finiscono con uno spazio o un punto («${name}»)`);
}

const sleep = (ms, signal) => new Promise((resolve, reject) => {
  if (signal?.aborted) return reject(signal.reason);
  const timer = setTimeout(resolve, ms);
  signal?.addEventListener('abort', () => { clearTimeout(timer); reject(signal.reason); }, { once: true });
});

/** fetch with a time limit until the answer starts (the body may then take its time). */
async function timedFetch(url, init = {}, signal = null) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error('Tempo scaduto')), TIMEOUT);
  const stop = () => controller.abort(signal.reason);
  signal?.addEventListener('abort', stop, { once: true });
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (err) {
    if (signal?.aborted) throw signal.reason ?? err;
    throw netError('unreachable', `OneDrive non raggiungibile (${err.cause?.code ?? err.message})`);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', stop);
  }
}

// ---------- Sign-in and tokens ----------

/** What Microsoft's errors at sign-in mean for whoever set up the app on Azure. */
function tokenError(body, status) {
  const codes = Array.isArray(body?.error_codes) ? body.error_codes : [];
  const said = String(body?.error_description ?? body?.error ?? `errore ${status}`).split(/\r?\n/)[0].slice(0, 240);
  if (codes.includes(9002327) || codes.includes(7000218) || codes.includes(700025)) {
    return netError('invalid', 'Su Azure l’indirizzo di ritorno di lilOS va registrato nella piattaforma «Applicazioni per dispositivi mobili e desktop», con «Consenti flussi client pubblici» attivo');
  }
  if (codes.includes(50011) || codes.includes(500113)) return netError('invalid', 'L’indirizzo di ritorno di lilOS non è registrato nell’app su Azure (Pannello di controllo → OneDrive lo mostra)');
  if (codes.includes(700016)) return netError('invalid', 'App non trovata su Azure: controlla l’ID dell’applicazione e gli account ammessi (Pannello di controllo → OneDrive)');
  if (['invalid_grant', 'interaction_required', 'consent_required', 'login_required'].includes(body?.error)) return netError('auth', `Serve un nuovo accesso (${said})`);
  if (body?.error === 'invalid_client' || body?.error === 'unauthorized_client') return netError('invalid', `App su Azure non valida: ${said}`);
  return netError(status >= 500 ? 'unreachable' : 'invalid', `Accesso a Microsoft non riuscito: ${said}`);
}

async function tokenRequest(form) {
  const res = await timedFetch(`${loginBase()}/${encodeURIComponent(authority())}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: new URLSearchParams({ client_id: clientId(), scope: scopes(), ...form }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || typeof body?.access_token !== 'string') throw tokenError(body, res.status);
  return body;
}

/** The access token of a session, renewed with the refresh token when it is about to end. */
class Tokens {
  #refresh; #save; #access = null; #until = 0; #renewing = null;

  constructor(refresh, save, first = null) {
    this.#refresh = refresh;
    this.#save = save;
    if (first) this.#keep(first);
  }

  #keep(body) {
    this.#access = body.access_token;
    this.#until = Date.now() + (Number(body.expires_in) || 3600) * 1000;
    if (typeof body.refresh_token === 'string' && body.refresh_token && body.refresh_token !== this.#refresh) {
      this.#refresh = body.refresh_token;
      try { this.#save?.({ account: body.refresh_token }); } catch { /* the kernel logs it */ }
    }
  }

  async get() {
    if (this.#access && Date.now() < this.#until - 120_000) return this.#access;
    return this.renew();
  }

  renew() {
    this.#renewing ??= tokenRequest({ grant_type: 'refresh_token', refresh_token: this.#refresh })
      .then(body => { this.#keep(body); return this.#access; })
      .finally(() => { this.#renewing = null; });
    return this.#renewing;
  }
}

// ---------- Graph ----------

/** A Graph error → an error with `net`. */
async function graphError(res) {
  const body = await res.json().catch(() => null);
  const code = String(body?.error?.code ?? '');
  const said = String(body?.error?.message ?? '').split(/\r?\n/)[0].slice(0, 240);
  const text = said || `errore ${res.status}`;
  switch (res.status) {
    case 401: return netError('auth', `Accesso a OneDrive non più valido (${text})`);
    case 403: return netError('denied', text);
    case 404: return netError('not_found', 'Non esiste su OneDrive');
    case 409: case 412: return netError('exists', text);
    case 423: return netError('denied', `Elemento bloccato: forse è aperto in Office (${text})`);
    case 507: return netError('denied', 'Spazio esaurito su OneDrive');
    case 400: return netError(code === 'notSupported' ? 'unsupported' : 'invalid', text);
    default: return netError(res.status >= 500 || res.status === 429 ? 'unreachable' : 'invalid', text);
  }
}

const retryAfter = (res, attempt) => Math.min(MAX_WAIT, (Number(res.headers.get('retry-after')) || 2 ** attempt) * 1000);

class Session {
  resume = { read: true, write: false };
  #tokens; #root;
  #anchors = new Map();   // full path (lower case) of a shortcut → { driveId, id }

  constructor(tokens, root) {
    this.#tokens = tokens;
    this.#root = root;
  }

  /** A Graph request: `path` after the API address (or a whole address from Graph itself). */
  async #graph(method, path, { body, headers = {}, signal, raw = false } = {}) {
    const url = /^https?:\/\//.test(path) ? path : `${graphBase()}${path}`;
    if (!url.startsWith(`${graphBase()}/`) && !url.startsWith(graphBase().replace(/\/v1\.0$/, '/'))) throw netError('invalid', 'Indirizzo di Graph inatteso');
    for (let attempt = 0, renewed = false; ; attempt++) {
      const token = await this.#tokens.get();
      const res = await timedFetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json', ...(body !== undefined && !(body instanceof Buffer) && { 'Content-Type': 'application/json' }), ...headers },
        body: body === undefined ? undefined : body instanceof Buffer ? body : JSON.stringify(body),
      }, signal);
      if (res.status === 401 && !renewed) {
        renewed = true;
        await res.body?.cancel().catch(() => {});
        await this.#tokens.renew();
        continue;
      }
      if ([429, 502, 503, 504].includes(res.status) && attempt < RETRIES) {
        await res.body?.cancel().catch(() => {});
        await sleep(retryAfter(res, attempt), signal);
        continue;
      }
      if (!res.ok) throw await graphError(res);
      if (raw) return res;
      if (res.status === 204) { await res.body?.cancel().catch(() => {}); return null; }
      return res.json();
    }
  }

  // ---------- Addresses (shortcuts included) ----------

  #full(path) {
    return joinPath(this.#root, path);
  }

  /**
   * The Graph address of a path of the connection. Inside a shortcut (shared folder) it goes by the
   * drive the shortcut points to. follow false: a shortcut itself (to rename or remove it), not
   * what it points to.
   */
  #url(path, opts) {
    return this.#address(this.#full(path), opts);
  }

  /** #url for a full path (from the top of the OneDrive, not of the connection). */
  #address(full, { follow = true } = {}) {
    const key = full.toLowerCase();
    let best = null;
    for (const [p, target] of this.#anchors) {
      if ((key === p && follow) || key.startsWith(`${p}/`)) if (!best || p.length > best.p.length) best = { p, target };
    }
    if (!best) return full === '/' ? '/me/drive/root' : `/me/drive/root:${encodePath(full)}:`;
    const base = `/drives/${encodeURIComponent(best.target.driveId)}/items/${encodeURIComponent(best.target.id)}`;
    const rest = full.slice(best.p.length);
    return rest ? `${base}:${encodePath(rest)}:` : base;
  }

  /** The drive a path is on (its shortcut's, or the user's: null). */
  #driveOf(path, opts) {
    const m = /^\/drives\/([^/]+)\/items\//.exec(this.#url(path, opts));
    return m ? decodeURIComponent(m[1]) : null;
  }

  /** Remembers the shortcuts among the entries of a folder (full path of the folder). */
  #learn(fullFolder, items) {
    if (!sharedOn()) return;
    for (const it of items) {
      const target = it.remoteItem;
      if (!target?.folder || !target.id || !target.parentReference?.driveId || typeof it.name !== 'string') continue;
      this.#anchors.set(joinPath(fullFolder, `/${it.name}`).toLowerCase(), { driveId: target.parentReference.driveId, id: target.id });
    }
  }

  /**
   * Runs fn(); if a path was not found and shortcuts are on, reads the folders on the way to it
   * (a shortcut there is learned) and runs it once more.
   */
  async #findAnd(path, fn) {
    try {
      return await fn();
    } catch (err) {
      if (err.net !== 'not_found' || !sharedOn() || !await this.#discover(path)) throw err;
      return fn();
    }
  }

  /** Reads the folders above `path` to find the shortcuts it goes through; true if one was new. */
  async #discover(path) {
    const parts = this.#full(path).split('/').filter(Boolean);
    let found = false, at = '/';
    for (const part of parts.slice(0, -1)) {
      const next = joinPath(at, `/${part}`);
      if (!this.#anchors.has(next.toLowerCase())) {
        const items = await this.#children(this.#address(at)).catch(() => null);
        if (!items) return found;
        const hit = items.find(i => i.name?.toLowerCase() === part.toLowerCase());
        if (!hit) return found;
        if (hit.remoteItem?.folder) { this.#learn(at, [hit]); found = true; }
      }
      at = next;
    }
    return found;
  }

  async #children(itemUrl) {
    const out = [];
    let next = `${itemUrl}/children?$top=999&$select=${SELECT}`;
    for (let page = 0; next && page < MAX_PAGES; page++) {
      const body = await this.#graph('GET', next);
      out.push(...(Array.isArray(body?.value) ? body.value : []));
      next = typeof body?.['@odata.nextLink'] === 'string' ? body['@odata.nextLink'] : null;
    }
    return out;
  }

  #entry(it, name = it.name) {
    const target = it.remoteItem;
    const folder = !!(it.folder || target?.folder);
    return {
      name, type: folder ? 'folder' : 'file',
      size: folder ? 0 : Number(target?.size ?? it.size) || 0,
      modified: Date.parse(target?.lastModifiedDateTime ?? it.lastModifiedDateTime) || 0,
    };
  }

  // ---------- The driver's session ----------

  async list(path) {
    return this.#findAnd(path, async () => {
      const items = await this.#children(this.#url(path));
      this.#learn(this.#full(path), items);
      // Shortcuts to what others shared: only with the setting on (they need Files.ReadWrite.All)
      return items.filter(it => sharedOn() || !it.remoteItem).map(it => this.#entry(it));
    });
  }

  async stat(path) {
    try {
      return await this.#findAnd(path, async () => {
        const it = await this.#graph('GET', `${this.#url(path)}?$select=${SELECT}`);
        return this.#entry(it, path === '/' ? it.name : baseName(path));
      });
    } catch (err) {
      if (err.net === 'not_found') return null;
      throw err;
    }
  }

  async read(path, { start = 0, signal } = {}) {
    const res = await this.#findAnd(path, () => this.#graph('GET', `${this.#url(path)}/content`, { signal, raw: true, headers: start > 0 ? { Range: `bytes=${start}-` } : {} }))
      .catch(err => {
        if (err.net === 'not_found' || err.net === 'invalid') {
          return this.#graph('GET', `${this.#url(path)}?$select=package`).then(it => {
            throw it?.package ? netError('unsupported', 'I blocchi appunti di OneNote si aprono solo sul web') : err;
          }, () => { throw err; });
        }
        throw err;
      });
    let stream = Readable.fromWeb(res.body);
    if (start > 0 && res.status === 200) {
      let skip = start;
      stream = stream.pipe(new Transform({
        transform(chunk, _enc, done) {
          if (skip >= chunk.length) { skip -= chunk.length; return done(); }
          const rest = chunk.subarray(skip);
          skip = 0;
          done(null, rest);
        },
      }));
    }
    return stream;
  }

  async write(path, source, { start = 0, signal, size } = {}) {
    if (start > 0) throw netError('unsupported', 'OneDrive non riprende un invio a metà');
    checkName(baseName(path));
    const held = await hold(source, Number.isSafeInteger(size) ? size : null, signal);
    try {
      await this.#findAnd(path, () => (held.buffer
        ? this.#graph('PUT', `${this.#url(path)}/content`, { body: held.buffer, headers: { 'Content-Type': 'application/octet-stream' }, signal })
        : this.#upload(path, held, signal)));
    } finally {
      if (held.dir) await rm(held.dir, { recursive: true, force: true }).catch(() => {});
    }
  }

  /** A big file, in pieces, through an upload session. */
  async #upload(path, held, signal) {
    const session = await this.#graph('POST', `${this.#url(path)}/createUploadSession`, { body: { item: { '@microsoft.graph.conflictBehavior': 'replace' } }, signal });
    const uploadUrl = session?.uploadUrl;
    if (typeof uploadUrl !== 'string' || !/^https?:\/\//.test(uploadUrl)) throw netError('invalid', 'OneDrive non ha aperto la sessione di caricamento');
    try {
      let offset = 0;
      for await (const piece of pieces(createReadStream(held.file), CHUNK)) {
        const end = offset + piece.length - 1;
        for (let attempt = 0; ; attempt++) {
          // The upload address carries its own authorization: no token with it
          const res = await timedFetch(uploadUrl, { method: 'PUT', headers: { 'Content-Range': `bytes ${offset}-${end}/${held.size}` }, body: piece }, signal)
            .catch(err => { if (attempt < RETRIES && err.net === 'unreachable') return null; throw err; });
          if (res && (res.ok || res.status === 202)) { await res.body?.cancel().catch(() => {}); break; }
          if (res && ![429, 500, 502, 503, 504].includes(res.status)) throw await graphError(res);
          if (attempt >= RETRIES) throw res ? await graphError(res) : netError('unreachable', 'Invio interrotto');
          await sleep(res ? retryAfter(res, attempt) : 2000, signal);
        }
        offset += piece.length;
      }
      if (offset !== held.size) throw netError('invalid', 'Dimensione del file cambiata durante l’invio');
    } catch (err) {
      timedFetch(uploadUrl, { method: 'DELETE' }).then(r => r.body?.cancel(), () => {});
      throw err;
    }
  }

  async mkdir(path) {
    const name = baseName(path);
    checkName(name);
    await this.#findAnd(parentOf(path), () => this.#graph('POST', `${this.#url(parentOf(path))}/children`, {
      body: { name, folder: {}, '@microsoft.graph.conflictBehavior': 'fail' },
    }));
  }

  async rename(from, to) {
    const name = baseName(to);
    checkName(name);
    const body = { name };
    if (parentOf(from) !== parentOf(to)) {
      const fromDrive = this.#driveOf(from, { follow: false });
      if (fromDrive !== this.#driveOf(to, { follow: false })) {
        throw netError('unsupported', 'Tra il tuo OneDrive e una cartella condivisa non si sposta: copia e poi elimina');
      }
      const parent = await this.#findAnd(parentOf(to), () => this.#graph('GET', `${this.#url(parentOf(to))}?$select=id,parentReference`));
      body.parentReference = { id: parent.id, ...(fromDrive && { driveId: parent.parentReference?.driveId ?? fromDrive }) };
    }
    await this.#findAnd(from, () => this.#graph('PATCH', this.#url(from, { follow: false }), { body }));
    this.#forget(from);
  }

  async remove(path) {
    await this.#findAnd(path, () => this.#graph('DELETE', this.#url(path, { follow: false })));
    this.#forget(path);
  }

  /** A folder and what is inside it, in one request: OneDrive's recycle bin gets it whole. */
  removeTree(path) {
    return this.remove(path);
  }

  async link(path) {
    const it = await this.#findAnd(path, () => this.#graph('GET', `${this.#url(path)}?$select=webUrl`));
    return it?.webUrl;
  }

  /** The space of the OneDrive (its quota). */
  async space() {
    const drive = await this.#graph('GET', '/me/drive?$select=quota');
    return { used: Number(drive?.quota?.used) || 0, total: Number(drive?.quota?.total) || 0 };
  }

  #forget(path) {
    const key = this.#full(path).toLowerCase();
    for (const p of [...this.#anchors.keys()]) if (p === key || p.startsWith(`${key}/`)) this.#anchors.delete(p);
  }

  /** The connection's folder is there (and is a folder). */
  async check() {
    if (this.#root === '/') {
      await this.#graph('GET', '/me/drive?$select=id');
      return;
    }
    const top = await this.stat('/');
    if (!top) throw netError('not_found', `La cartella ${this.#root} non esiste su OneDrive`);
    if (top.type !== 'folder') throw netError('invalid', `${this.#root} non è una cartella`);
  }

  /** The signed-in account: its e-mail address or user name. */
  async me() {
    const body = await this.#graph('GET', '/me?$select=mail,userPrincipalName');
    const who = String(body?.mail || body?.userPrincipalName || '').trim();
    if (!who) throw netError('invalid', 'Microsoft non ha detto chi è l’account');
    return who;
  }

  close() {}
}

/**
 * The bytes to send, held: in memory up to 4 MB ({ buffer }), else in a temporary file
 * ({ file, size, dir }), as an upload session needs the size first and may send a piece twice.
 */
async function hold(source, size, signal) {
  if (size !== null && size <= SIMPLE_MAX) {
    const chunks = [];
    for await (const c of source) chunks.push(c);
    return { buffer: Buffer.concat(chunks) };
  }
  const dir = await mkdtemp(join(tmpdir(), 'lilos-onedrive-'));
  const file = join(dir, 'upload');
  let total = 0;
  const count = new Transform({ transform(chunk, _enc, done) { total += chunk.length; done(null, chunk); } });
  try {
    await pipeline(source, count, createWriteStream(file), { signal });
  } catch (err) {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
    throw err;
  }
  if (total <= SIMPLE_MAX) {
    const chunks = [];
    for await (const c of createReadStream(file)) chunks.push(c);
    await rm(dir, { recursive: true, force: true }).catch(() => {});
    return { buffer: Buffer.concat(chunks) };
  }
  return { file, size: total, dir };
}

/** A stream in pieces of exactly `size` bytes (the last one shorter). */
async function* pieces(stream, size) {
  let held = [], length = 0;
  for await (const chunk of stream) {
    held.push(chunk);
    length += chunk.length;
    while (length >= size) {
      const all = Buffer.concat(held);
      yield all.subarray(0, size);
      held = [all.subarray(size)];
      length -= size;
    }
  }
  if (length) yield Buffer.concat(held);
}

// ---------- The driver ----------

const driver = {
  label: label('OneDrive', 'OneDrive'),
  order: 60,
  links: { office: true },
  recycles: true,
  space: true,
  group: 'cloud',
  fields: [
    {
      key: 'account', type: 'signin', label: label('Microsoft account', 'Account Microsoft'), required: true,
      button: label('Sign in with Microsoft', 'Accedi con Microsoft'),
      hint: label('Personal (outlook.com, hotmail.com…) or work or school', 'Personale (outlook.com, hotmail.com…) o di lavoro o dell’istituto'),
    },
    {
      key: 'root', type: 'text', label: label('OneDrive folder', 'Cartella di OneDrive'), placeholder: '/',
      hint: label('Optional: only this folder, for example /Work/2026', 'Facoltativo: solo questa cartella, per esempio /Lavoro/2026'),
    },
  ],

  ready() {
    if (!clientId()) {
      return label('An administrator must first enter the ID of the app registered on Azure (Control Panel → OneDrive)', 'Un amministratore deve prima inserire l’ID dell’app registrata su Azure (Pannello di controllo → OneDrive)');
    }
    return null;
  },

  check(v) {
    cleanRoot(v.root);
  },

  address(v) {
    const root = (() => { try { return cleanRoot(v.root); } catch { return '/'; } })();
    return `onedrive://${v.account ?? ''}${root === '/' ? '' : root}`;
  },

  signIn: {
    start({ redirectUri, state, challenge }) {
      if (!clientId()) throw netError('unsupported', 'App Azure non impostata (Pannello di controllo → OneDrive)');
      const url = new URL(`${loginBase()}/${encodeURIComponent(authority())}/oauth2/v2.0/authorize`);
      url.search = new URLSearchParams({
        client_id: clientId(), response_type: 'code', redirect_uri: redirectUri, response_mode: 'query',
        scope: scopes(), state, code_challenge: challenge, code_challenge_method: 'S256', prompt: 'select_account',
      });
      return url.href;
    },

    async finish({ code, redirectUri, verifier }) {
      const body = await tokenRequest({ grant_type: 'authorization_code', code, redirect_uri: redirectUri, code_verifier: verifier });
      if (typeof body.refresh_token !== 'string') throw netError('invalid', 'Microsoft non ha dato un accesso duraturo (manca offline_access)');
      const session = new Session(new Tokens(body.refresh_token, null, body), '/');
      const me = await session.me();
      await session.check().catch(err => {
        throw err.net === 'not_found' || err.net === 'denied' ? netError('invalid', `L’account ${me} non ha un OneDrive (${err.message})`) : err;
      });
      return { account: me, secret: body.refresh_token };
    },
  },

  async connect(values, { secret = {}, saveSecret = null } = {}) {
    if (!clientId()) throw netError('unsupported', 'App Azure non impostata (Pannello di controllo → OneDrive)');
    if (typeof secret.account !== 'string' || !secret.account) throw netError('auth', 'Serve un nuovo accesso');
    const tokens = new Tokens(secret.account, saveSecret);
    await tokens.renew();
    const session = new Session(tokens, cleanRoot(values.root));
    await session.check();
    return session;
  },
};

export default {
  async init(ctx) {
    conf = ctx.config;
    ctx.onConfig?.(config => { conf = config; });
    ctx.provide('netfs.onedrive', driver);
  },
};
