import { Readable, Transform } from 'node:stream';

/**
 * Google Drive for the Rete folder: service 'netfs.gdrive', see the kernel's net/drivers.js. The
 * user's My Drive, or a shared drive of their organization, through the Drive API v3.
 *
 * Sign-in: Google's page (OAuth 2.0, authorization code with PKCE, the kernel's net/signin.js),
 * with the project each lilOS installation makes on Google Cloud: an admin puts its client ID and
 * client secret in the module's settings (Google wants the secret even with PKCE). Google sends
 * the window back only to https with a domain name or to this computer: elsewhere the sign-in is
 * by hand (signIn.manual: the user pastes the address of the page that does not open); with a
 * client of type "Desktop app" always so. The refresh token is the connection's secret.
 *
 * Drive is not a tree of names: items have ids, a folder may hold two items with the same name, a
 * name may have '/'. A folder is read whole and its names made unique for lilOS: the second
 * 'Preventivo.pdf' is 'Preventivo (2).pdf' (with a badge), a '/' is shown as '／'; paths go back
 * to ids through those listings (kept a few seconds). Google's own documents (Docs, Sheets,
 * Slides, Drawings) have no bytes: they are entries with `web` (they open on Google) and `export`
 * (copied as .docx/.xlsx/.pptx, or OpenDocument or PDF as the settings say; Google exports up to
 * 10 MB); Forms, Sites, Maps only open on the web. Shortcuts are followed (shown as links, so
 * copies do not walk into them). With the setting on, «Condivisi con me» at the top lists what
 * others shared. Removing goes to Drive's trash. Uploads go in 8 MB pieces (resumable upload), a
 * piece tried again on its own; downloads resume (Range).
 *
 * Settings: clientId, clientSecret (secret), clientType ('web' | 'desktop'), shared, exportFormat
 * ('office' | 'odf' | 'pdf'). For tests only: authUrl, tokenUrl, apiUrl replace Google's addresses.
 */
const TIMEOUT = 60_000;
const RETRIES = 4;
const MAX_WAIT = 30_000;
const MAX_PAGES = 100;               // 100 × 1000 items in a folder at most
const PIECE = 8 << 20;               // a multiple of 256 KiB
const LISTING_LIFE = 10_000;         // a folder read is used for paths this long
const SHARED_NAME = 'Condivisi con me';
const FOLDER = 'application/vnd.google-apps.folder';
const SHORTCUT = 'application/vnd.google-apps.shortcut';
const FIELDS = 'id,name,mimeType,size,modifiedTime,createdTime,shortcutDetails(targetId,targetMimeType),capabilities(canRename,canTrash)';

const label = (en, it) => ({ en, it });
const netError = (net, message, extra = {}) => Object.assign(new Error(message), { net, ...extra });
const sleep = (ms, signal) => new Promise((resolve, reject) => {
  if (signal?.aborted) return reject(signal.reason);
  const timer = setTimeout(resolve, ms);
  signal?.addEventListener('abort', () => { clearTimeout(timer); reject(signal.reason); }, { once: true });
});

let conf = {};
const authUrl = () => String(conf.authUrl || 'https://accounts.google.com/o/oauth2/v2/auth');
const tokenUrl = () => String(conf.tokenUrl || 'https://oauth2.googleapis.com/token');
const apiBase = () => String(conf.apiUrl || 'https://www.googleapis.com').replace(/\/+$/, '');
const clientId = () => (typeof conf.clientId === 'string' ? conf.clientId.trim() : '');
const clientSecret = () => (typeof conf.clientSecret === 'string' ? conf.clientSecret.trim() : '');
const SCOPES = 'https://www.googleapis.com/auth/drive openid email';

/** Google's own documents: what they are, and what they are copied as (per export format). */
const DOCS = {
  'application/vnd.google-apps.document': {
    label: label('Google document', 'Documento Google'),
    office: ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    odf: ['odt', 'application/vnd.oasis.opendocument.text'],
  },
  'application/vnd.google-apps.spreadsheet': {
    label: label('Google spreadsheet', 'Foglio Google'),
    office: ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    odf: ['ods', 'application/vnd.oasis.opendocument.spreadsheet'],
  },
  'application/vnd.google-apps.presentation': {
    label: label('Google presentation', 'Presentazione Google'),
    office: ['pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    odf: ['odp', 'application/vnd.oasis.opendocument.presentation'],
  },
  'application/vnd.google-apps.drawing': {
    label: label('Google drawing', 'Disegno Google'),
    office: ['pdf', 'application/pdf'],
    odf: ['pdf', 'application/pdf'],
  },
  'application/vnd.google-apps.form': { label: label('Google form', 'Modulo Google') },
  'application/vnd.google-apps.site': { label: label('Google site', 'Sito Google') },
  'application/vnd.google-apps.map': { label: label('Google map', 'Mappa Google') },
  'application/vnd.google-apps.jam': { label: label('Jamboard', 'Jamboard') },
};
const PDF = ['pdf', 'application/pdf'];

/** What a Google document is copied as: [extension, MIME type] or null (web only). */
function exportOf(mime) {
  const doc = DOCS[mime];
  if (!doc?.office) return null;
  if (conf.exportFormat === 'pdf') return PDF;
  return conf.exportFormat === 'odf' ? doc.odf : doc.office;
}

const isGoogleType = mime => typeof mime === 'string' && mime.startsWith('application/vnd.google-apps.') && mime !== FOLDER && mime !== SHORTCUT;

/** A folder of Drive as the user writes it ('Lavoro/2026/') → ['Lavoro', '2026']. Throws 'invalid'. */
export function cleanRoot(raw) {
  const parts = String(raw ?? '').split(/[/\\]+/).map(p => p.trim()).filter(Boolean);
  if (parts.some(p => p === '.' || p === '..' || /[\0-\x1f]/.test(p))) throw netError('invalid', 'Cartella di Drive non valida');
  return parts;
}

/** 'Preventivo.pdf', 2 → 'Preventivo (2).pdf' */
function numbered(name, n) {
  const dot = name.lastIndexOf('.');
  return dot > 0 ? `${name.slice(0, dot)} (${n})${name.slice(dot)}` : `${name} (${n})`;
}

/** A name of Drive as lilOS shows it: no '/' (shown as the full-width solidus), no control characters. */
const shownName = name => String(name ?? '').replace(/\//g, '／').replace(/[\0-\x1f\x7f]/g, '').trim() || '(senza nome)';
/** A name lilOS gives, for Drive: the full-width solidus goes back to '/'. */
const driveName = name => name.replace(/／/g, '/');

// ---------- HTTP ----------

async function timedFetch(url, init = {}, signal = null) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error('Tempo scaduto')), TIMEOUT);
  const stop = () => controller.abort(signal.reason);
  signal?.addEventListener('abort', stop, { once: true });
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (err) {
    if (signal?.aborted) throw signal.reason ?? err;
    throw netError('unreachable', `Google non raggiungibile (${err.cause?.code ?? err.message})`);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', stop);
  }
}

/** A Drive API error → an error with `net`. */
async function apiError(res) {
  const body = await res.json().catch(() => null);
  const reason = String(body?.error?.errors?.[0]?.reason ?? body?.error?.status ?? '');
  const said = String(body?.error?.message ?? '').split(/\r?\n/)[0].slice(0, 240) || `errore ${res.status}`;
  if (res.status === 401) return netError('auth', `Accesso a Google non più valido (${said})`);
  if (reason === 'storageQuotaExceeded' || reason === 'quotaExceeded') return netError('denied', 'Spazio esaurito su Google Drive');
  if (reason === 'exportSizeLimitExceeded') return netError('unsupported', 'Documento troppo grande da esportare (oltre 10 MB): scaricalo da Google');
  if (reason === 'cannotDownloadAbusiveFile') return netError('denied', 'Google blocca il download di questo file');
  if (res.status === 404) return netError('not_found', 'Non esiste su Google Drive');
  if (res.status === 403) return netError('denied', said);
  if (res.status === 409) return netError('exists', said);
  if (res.status === 429 || res.status >= 500) return netError('unreachable', said);
  return netError('invalid', said);
}

const throttled = async res => {
  if (res.status === 429 || res.status === 500 || res.status === 502 || res.status === 503 || res.status === 504) return true;
  if (res.status !== 403) return false;
  const body = await res.clone().json().catch(() => null);
  return ['userRateLimitExceeded', 'rateLimitExceeded'].includes(body?.error?.errors?.[0]?.reason);
};

// ---------- Sign-in and tokens ----------

function tokenError(body, status) {
  const said = String(body?.error_description ?? body?.error ?? `errore ${status}`).split(/\r?\n/)[0].slice(0, 240);
  if (body?.error === 'invalid_grant') return netError('auth', `Serve un nuovo accesso (${said})`);
  if (body?.error === 'invalid_client' || body?.error === 'unauthorized_client') return netError('invalid', `Progetto Google non valido: controlla ID e segreto client (${said})`);
  if (body?.error === 'redirect_uri_mismatch') return netError('invalid', 'L’indirizzo di ritorno di lilOS non è registrato nel progetto Google (Pannello di controllo → Google Drive lo mostra)');
  return netError(status >= 500 ? 'unreachable' : 'invalid', `Accesso a Google non riuscito: ${said}`);
}

async function tokenRequest(form) {
  const res = await timedFetch(tokenUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: new URLSearchParams({ client_id: clientId(), client_secret: clientSecret(), ...form }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || typeof body?.access_token !== 'string') throw tokenError(body, res.status);
  return body;
}

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

/** Calls the Drive API with a session's tokens: renews once on 401, waits and tries again when throttled. */
async function call(tokens, method, path, { query = {}, body, headers = {}, signal, raw = false, upload = false } = {}) {
  const url = /^https?:\/\//.test(path) ? new URL(path) : new URL(`${apiBase()}${upload ? '/upload' : ''}/drive/v3${path}`);
  if (url.origin !== new URL(apiBase()).origin) throw netError('invalid', 'Indirizzo di Google inatteso');
  for (const [k, v] of Object.entries(query)) if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  for (let attempt = 0, renewed = false; ; attempt++) {
    const json = body !== undefined && !(body instanceof Buffer) && !(body instanceof Uint8Array);
    const res = await timedFetch(url, {
      method,
      headers: { Authorization: `Bearer ${await tokens.get()}`, ...(json && { 'Content-Type': 'application/json; charset=utf-8' }), ...headers },
      body: body === undefined ? undefined : json ? JSON.stringify(body) : body,
    }, signal);
    if (res.status === 401 && !renewed) {
      renewed = true;
      await res.body?.cancel().catch(() => {});
      await tokens.renew();
      continue;
    }
    if (attempt < RETRIES && await throttled(res)) {
      await res.body?.cancel().catch(() => {});
      await sleep(Math.min(MAX_WAIT, (Number(res.headers.get('retry-after')) || 2 ** attempt) * 1000), signal);
      continue;
    }
    if (!res.ok && !(raw && res.status === 308)) throw await apiError(res);
    if (raw) return res;
    if (res.status === 204) { await res.body?.cancel().catch(() => {}); return null; }
    return res.json();
  }
}

// ---------- The session ----------

class Session {
  resume = { read: true, write: false };
  #tokens; #driveId; #rootId; #listings = new Map();   // folder id → { at, byName: Map }

  constructor(tokens, driveId, rootId) {
    this.#tokens = tokens;
    this.#driveId = driveId;
    this.#rootId = rootId;
  }

  #api(method, path, opts = {}) {
    return call(this.#tokens, method, path, { ...opts, query: { supportsAllDrives: true, ...opts.query } });
  }

  /** The shared-with-me folder is shown (setting on, My Drive, connection on its top). */
  get #sharedShown() {
    return conf.shared !== false && !this.#driveId && this.#rootId === 'root';
  }

  /** Everything in a folder: Drive's items (q: the query), all pages. */
  async #items(q) {
    const out = [];
    let pageToken;
    for (let page = 0; page < MAX_PAGES; page++) {
      const body = await this.#api('GET', '/files', {
        query: {
          q, pageSize: 1000, fields: `nextPageToken,files(${FIELDS})`, orderBy: 'createdTime', pageToken,
          includeItemsFromAllDrives: true, ...(this.#driveId && { corpora: 'drive', driveId: this.#driveId }),
        },
      });
      out.push(...(Array.isArray(body?.files) ? body.files : []));
      pageToken = body?.nextPageToken;
      if (!pageToken) return out;
    }
    throw netError('invalid', 'Cartella troppo grande');
  }

  /**
   * A folder read and named for lilOS: Map shown name → item ({ id, name, mimeType, …, shown,
   * twin }), kept a few seconds. id SHARED: the shared-with-me folder.
   */
  async #listing(folderId, { fresh = false } = {}) {
    const held = this.#listings.get(folderId);
    if (held && !fresh && Date.now() - held.at < LISTING_LIFE) return held.byName;
    const items = folderId === SHARED
      ? await this.#items('sharedWithMe = true and trashed = false')
      : await this.#items(`'${folderId.replace(/['\\]/g, '\\$&')}' in parents and trashed = false`);
    const byName = new Map(), taken = new Set();
    if (folderId === this.#rootId && this.#sharedShown) {
      byName.set(SHARED_NAME, { id: SHARED, mimeType: FOLDER, shown: SHARED_NAME, virtual: true });
      taken.add(SHARED_NAME.toLowerCase());
    }
    for (const it of items) {
      if (typeof it?.id !== 'string') continue;
      const base = shownName(it.name);
      let shown = base, n = 1;
      while (taken.has(shown.toLowerCase())) shown = numbered(base, ++n);
      taken.add(shown.toLowerCase());
      byName.set(shown, { ...it, shown, twin: n > 1 });
    }
    this.#listings.set(folderId, { at: Date.now(), byName });
    if (this.#listings.size > 200) this.#listings.delete(this.#listings.keys().next().value);
    return byName;
  }

  #forget(...folderIds) {
    for (const id of folderIds) this.#listings.delete(id);
  }

  /** The item at a path: { id, mimeType, … } (the top: the connection's root), or null. Shortcuts are followed. */
  async #resolve(path) {
    let at = { id: this.#rootId, mimeType: FOLDER, root: true };
    for (const part of path.split('/').filter(Boolean)) {
      const folderId = folderOf(at);
      if (!folderId) return null;
      const hit = (await this.#listing(folderId)).get(part);
      if (!hit) return null;
      at = { ...hit, parentId: folderId };
    }
    return at;
  }

  async #need(path) {
    return await this.#resolve(path) ?? (() => { throw netError('not_found', 'Non esiste su Google Drive'); })();
  }

  #entry(it) {
    const folder = folderOf(it) !== null;
    const e = {
      name: it.shown, type: folder ? 'folder' : 'file',
      size: folder || isGoogleType(it.mimeType) ? 0 : Number(it.size) || 0,
      modified: Date.parse(it.modifiedTime) || 0,
    };
    if (it.mimeType === SHORTCUT && folder) e.link = true;
    const google = isGoogleType(it.mimeType) ? it.mimeType : it.mimeType === SHORTCUT && isGoogleType(it.shortcutDetails?.targetMimeType) ? it.shortcutDetails.targetMimeType : null;
    if (google) {
      e.web = DOCS[google]?.label ?? label('Google file', 'File Google');
      const ex = exportOf(google);
      if (ex) e.export = ex[0];
    }
    if (it.twin) e.badge = label('same name on Drive', 'stesso nome su Drive');
    if (it.virtual) { e.badge = label('shared with me', 'da altri'); e.can = { rename: false, remove: false }; }
    else if (it.capabilities) {
      const can = {};
      if (it.capabilities.canRename === false) can.rename = false;
      if (it.capabilities.canTrash === false) can.remove = false;
      if (Object.keys(can).length) e.can = can;
    }
    return e;
  }

  // ---------- The driver's session ----------

  async list(path) {
    const at = await this.#need(path);
    const folderId = folderOf(at) ?? (() => { throw netError('invalid', 'Non è una cartella'); })();
    return [...(await this.#listing(folderId, { fresh: true })).values()].map(it => this.#entry(it));
  }

  async stat(path) {
    const at = await this.#resolve(path);
    if (!at) return null;
    if (at.root) return { name: '', type: 'folder', size: 0, modified: 0 };
    return this.#entry(at);
  }

  async read(path, { start = 0, signal, format } = {}) {
    const at = await this.#need(path);
    const id = at.mimeType === SHORTCUT ? at.shortcutDetails?.targetId : at.id;
    const mime = at.mimeType === SHORTCUT ? at.shortcutDetails?.targetMimeType : at.mimeType;
    if (folderOf(at)) throw netError('invalid', 'Non è un file');
    if (isGoogleType(mime)) {
      const ex = exportOf(mime);
      if (!ex || (format && format !== ex[0])) throw netError('unsupported', 'Questo documento si apre solo sul web');
      const res = await this.#api('GET', `/files/${encodeURIComponent(id)}/export`, { query: { mimeType: ex[1] }, raw: true, signal });
      return Readable.fromWeb(res.body);
    }
    const res = await this.#api('GET', `/files/${encodeURIComponent(id)}`, { query: { alt: 'media' }, raw: true, signal, headers: start > 0 ? { Range: `bytes=${start}-` } : {} });
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

  /** A file from a stream: a new one, or new content for the one with that name (resumable upload in pieces). */
  async write(path, source, { start = 0, signal, size } = {}) {
    if (start > 0) throw netError('unsupported', 'Google Drive non riprende un invio a metà');
    const { parentId, name } = await this.#parentOf(path);
    const existing = (await this.#listing(parentId, { fresh: true })).get(baseName(path));
    if (existing && (folderOf(existing) || isGoogleType(existing.mimeType) || existing.mimeType === SHORTCUT)) throw netError('exists', 'C’è già un elemento con questo nome');
    const known = Number.isSafeInteger(size) ? size : null;
    const init = existing
      ? await this.#api('PATCH', `/files/${encodeURIComponent(existing.id)}`, { upload: true, query: { uploadType: 'resumable' }, body: {}, raw: true, signal, headers: known !== null ? { 'X-Upload-Content-Length': String(known) } : {} })
      : await this.#api('POST', '/files', { upload: true, query: { uploadType: 'resumable' }, body: { name: driveName(name), parents: [parentId] }, raw: true, signal, headers: known !== null ? { 'X-Upload-Content-Length': String(known) } : {} });
    await init.body?.cancel().catch(() => {});
    const session = init.headers.get('location');
    if (!session || !/^https?:\/\//.test(session)) throw netError('invalid', 'Google non ha aperto il caricamento');
    try {
      let offset = 0, done = false;
      const it = pieces(source, PIECE);
      let next = await it.next();
      while (!done) {
        const piece = next.done ? Buffer.alloc(0) : next.value;
        const after = next.done ? { done: true } : await it.next();
        const last = after.done;
        const total = last ? offset + piece.length : '*';
        const range = piece.length ? `bytes ${offset}-${offset + piece.length - 1}/${total}` : `bytes */${total}`;
        for (let attempt = 0; ; attempt++) {
          const res = await call(this.#tokens, 'PUT', session, { body: piece, headers: { 'Content-Range': range }, raw: true, signal }).catch(err => {
            if (attempt < RETRIES && (err.net === 'unreachable' || err.net === 'lost')) return null;
            throw err;
          });
          if (res) {
            await res.body?.cancel().catch(() => {});
            if (res.status === 308 && !last) break;
            if (res.ok && last) { done = true; break; }
            if (res.status === 308 && last) throw netError('lost', 'Google non ha ricevuto tutto il file');
          }
          if (attempt >= RETRIES) throw netError('unreachable', 'Invio interrotto');
          await sleep(2000 * (attempt + 1), signal);
        }
        offset += piece.length;
        next = after;
      }
    } catch (err) {
      timedFetch(session, { method: 'DELETE' }).then(r => r.body?.cancel(), () => {});
      throw err;
    }
    this.#forget(parentId);
  }

  async #parentOf(path) {
    const parent = path.slice(0, path.lastIndexOf('/')) || '/';
    const at = await this.#need(parent);
    const parentId = folderOf(at);
    if (!parentId) throw netError('invalid', 'Non è una cartella');
    if (parentId === SHARED) throw netError('unsupported', 'In «Condivisi con me» non si crea niente: entra in una cartella condivisa');
    return { parentId, name: baseName(path) };
  }

  async mkdir(path) {
    const { parentId, name } = await this.#parentOf(path);
    if ((await this.#listing(parentId, { fresh: true })).has(name)) throw netError('exists', 'Esiste già su Google Drive');
    await this.#api('POST', '/files', { body: { name: driveName(name), mimeType: FOLDER, parents: [parentId] }, query: { fields: 'id' } });
    this.#forget(parentId);
  }

  async rename(from, to) {
    const it = await this.#need(from);
    if (it.root || it.virtual) throw netError('denied', 'Questa cartella non si rinomina');
    const { parentId, name } = await this.#parentOf(to);
    if ((await this.#listing(parentId, { fresh: true })).has(name)) throw netError('exists', 'Esiste già su Google Drive');
    const query = { fields: 'id' };
    if (parentId !== it.parentId) {
      if (it.parentId === SHARED) throw netError('unsupported', 'Ciò che è condiviso con te non si sposta: copialo');
      Object.assign(query, { addParents: parentId, removeParents: it.parentId });
    }
    await this.#api('PATCH', `/files/${encodeURIComponent(it.id)}`, { query, body: { name: driveName(name) } });
    this.#forget(parentId, it.parentId, it.id);
  }

  /** To Drive's trash (the item itself: a shortcut, not what it points to). */
  async remove(path) {
    const it = await this.#need(path);
    if (it.root || it.virtual) throw netError('denied', 'Questa cartella non si elimina');
    if (it.parentId === SHARED) throw netError('denied', 'Ciò che è condiviso con te non si elimina da qui (si toglie da Condivisi con me sul sito di Google)');
    await this.#api('PATCH', `/files/${encodeURIComponent(it.id)}`, { body: { trashed: true }, query: { fields: 'id' } });
    this.#forget(it.parentId, it.id);
  }

  removeTree(path) {
    return this.remove(path);
  }

  async link(path) {
    const it = await this.#need(path);
    if (it.virtual) return 'https://drive.google.com/drive/shared-with-me';
    if (it.root) return this.#driveId ? `https://drive.google.com/drive/folders/${encodeURIComponent(this.#driveId)}` : 'https://drive.google.com/drive/my-drive';
    const body = await this.#api('GET', `/files/${encodeURIComponent(it.id)}`, { query: { fields: 'webViewLink' } });
    return body?.webViewLink;
  }

  async space() {
    const body = await this.#api('GET', '/about', { query: { fields: 'storageQuota' } });
    return { used: Number(body?.storageQuota?.usage) || 0, total: Number(body?.storageQuota?.limit) || 0 };
  }

  /** The id of the folder at a path (the top of a connection on a folder), or null. */
  async folderIdAt(path) {
    const at = await this.#resolve(path);
    return at ? folderOf(at) : null;
  }

  close() {
    this.#listings.clear();
  }
}

const SHARED = '\u0000shared';
const baseName = path => path.slice(path.lastIndexOf('/') + 1);
const folderOf = it => (it.mimeType === FOLDER ? it.id : it.mimeType === SHORTCUT && it.shortcutDetails?.targetMimeType === FOLDER ? it.shortcutDetails.targetId : null);

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

/** The account's shared drives: [{ id, name }]. */
async function sharedDrives(tokens) {
  const out = [];
  let pageToken;
  for (let page = 0; page < 20; page++) {
    const body = await call(tokens, 'GET', '/drives', { query: { pageSize: 100, fields: 'nextPageToken,drives(id,name)', pageToken } });
    out.push(...(Array.isArray(body?.drives) ? body.drives : []).filter(d => typeof d?.id === 'string' && typeof d.name === 'string'));
    pageToken = body?.nextPageToken;
    if (!pageToken) break;
  }
  return out;
}

const MY_DRIVE = ['', 'il mio drive', 'my drive'];
const isMyDrive = v => MY_DRIVE.includes(String(v ?? '').trim().toLowerCase());

// ---------- The driver ----------

const driver = {
  label: label('Google Drive', 'Google Drive'),
  order: 62,
  group: 'cloud',
  links: {},
  recycles: true,
  space: true,
  fields: [
    {
      key: 'account', type: 'signin', label: label('Google account', 'Account Google'), required: true,
      button: label('Sign in with Google', 'Accedi con Google'),
    },
    {
      key: 'share', type: 'text', label: label('Drive', 'Drive'), placeholder: 'Il mio Drive',
      hint: label('Empty: My Drive. Or a shared drive of your organization (List)', 'Vuoto: Il mio Drive. Oppure un Drive condiviso dell’organizzazione (Elenca)'),
    },
    {
      key: 'root', type: 'text', label: label('Folder', 'Cartella'), placeholder: '/',
      hint: label('Optional: only this folder, for example /Work/2026', 'Facoltativo: solo questa cartella, per esempio /Lavoro/2026'),
    },
  ],

  ready() {
    if (!clientId() || !clientSecret()) {
      return label('An administrator must first enter the client ID and secret of the Google Cloud project (Control Panel → Google Drive)', 'Un amministratore deve prima inserire ID e segreto client del progetto Google Cloud (Pannello di controllo → Google Drive)');
    }
    return null;
  },

  check(v) {
    cleanRoot(v.root);
    if (v.share !== undefined && String(v.share).length > 200) throw netError('invalid', 'Nome del Drive troppo lungo');
  },

  address(v) {
    const root = (() => { try { return cleanRoot(v.root); } catch { return []; } })();
    const drive = isMyDrive(v.share) ? '' : `/${v.share}`;
    return `gdrive://${v.account ?? ''}${drive}${root.length ? `/${root.join('/')}` : ''}`;
  },

  signIn: {
    manual: true,
    onlyManual: () => conf.clientType === 'desktop',
    start({ redirectUri, state, challenge }) {
      if (!clientId() || !clientSecret()) throw netError('unsupported', 'Progetto Google non impostato (Pannello di controllo → Google Drive)');
      const url = new URL(authUrl());
      url.search = new URLSearchParams({
        client_id: clientId(), response_type: 'code', redirect_uri: redirectUri, scope: SCOPES, state,
        code_challenge: challenge, code_challenge_method: 'S256', access_type: 'offline', prompt: 'consent select_account', include_granted_scopes: 'true',
      });
      return url.href;
    },
    async finish({ code, redirectUri, verifier }) {
      const body = await tokenRequest({ grant_type: 'authorization_code', code, redirect_uri: redirectUri, code_verifier: verifier });
      if (typeof body.refresh_token !== 'string') throw netError('invalid', 'Google non ha dato un accesso duraturo: togli lilOS dalle app collegate all’account e riprova');
      if (typeof body.scope === 'string' && !body.scope.split(' ').includes('https://www.googleapis.com/auth/drive')) {
        throw netError('invalid', 'Serve il permesso su tutto Google Drive: riprova e lascia la casella del permesso selezionata');
      }
      const tokens = new Tokens(body.refresh_token, null, body);
      const about = await call(tokens, 'GET', '/about', { query: { fields: 'user(emailAddress)' } });
      const account = String(about?.user?.emailAddress ?? '').trim();
      if (!account) throw netError('invalid', 'Google non ha detto chi è l’account');
      return { account, secret: body.refresh_token };
    },
  },

  /** The drives the account can open: My Drive, then its shared drives. */
  async shares(values, { secret = {}, saveSecret = null } = {}) {
    if (typeof secret.account !== 'string' || !secret.account) throw netError('auth', 'Accedi prima con Google');
    const tokens = new Tokens(secret.account, saveSecret);
    return ['Il mio Drive', ...(await sharedDrives(tokens)).map(d => d.name)];
  },

  async connect(values, { secret = {}, saveSecret = null } = {}) {
    if (!clientId() || !clientSecret()) throw netError('unsupported', 'Progetto Google non impostato (Pannello di controllo → Google Drive)');
    if (typeof secret.account !== 'string' || !secret.account) throw netError('auth', 'Serve un nuovo accesso');
    const tokens = new Tokens(secret.account, saveSecret);
    await tokens.renew();
    let driveId = null;
    if (!isMyDrive(values.share)) {
      const drive = (await sharedDrives(tokens)).find(d => d.name === values.share || d.id === values.share);
      if (!drive) throw netError('not_found', `Drive condiviso «${values.share}» non trovato per questo account`);
      driveId = drive.id;
    }
    let session = new Session(tokens, driveId, driveId ?? 'root');
    const root = cleanRoot(values.root);
    if (root.length) {
      // The folder's id becomes the connection's top
      const id = await session.folderIdAt(`/${root.join('/')}`);
      if (!id || id === SHARED) throw netError('not_found', `La cartella /${root.join('/')} non esiste su Google Drive`);
      session = new Session(tokens, driveId, id);
    }
    await session.list('/');
    return session;
  },
};

export default {
  async init(ctx) {
    conf = ctx.config;
    ctx.onConfig?.(config => { conf = config; });
    ctx.provide('netfs.gdrive', driver);
  },
};
