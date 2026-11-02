import { Readable, Transform } from 'node:stream';

/**
 * Google Photos for the Rete folder: service 'netfs.gphotos', see the kernel's net/drivers.js.
 *
 * Since 31 March 2025 Google lets apps read only what they made, so the module has two parts:
 *   - Importa da Google Foto (the driver's importer, Photos Picker API): the user picks photos and
 *     videos on Google's page in a new tab (up to 2000 at a time); they become a folder of the
 *     session (named after the date and time) that the kernel copies, with its transfers, where
 *     the user chose. Google's addresses of picked items last 60 minutes: the folder goes then.
 *   - The albums made by lilOS (Photos Library API, app-created data only): the connection's
 *     folders. Files copied into one are uploaded to the user's library and added to it; a new
 *     folder is a new album; an album can be renamed. Google does not let apps delete or rename
 *     photos nor delete albums: removing a photo takes it out of the album (it stays in the
 *     library).
 * Sign-in as for Google Drive (the project of the installation; client ID and secret in the
 * module's settings), with the Photos scopes. Uploads start over when interrupted; downloads of
 * album items resume (Range). For tests only: authUrl, tokenUrl, pickerUrl, libraryUrl.
 */
const TIMEOUT = 60_000;
const RETRIES = 4;
const MAX_WAIT = 30_000;
const IMPORT_LIFE = 55 * 60_000;      // picked items' addresses last 60 minutes
const MAX_PICKED = 2000;
const MAX_ALBUMS = 1000;
const MAX_ITEMS = 20_000;             // of one album

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
const pickerBase = () => String(conf.pickerUrl || 'https://photospicker.googleapis.com/v1').replace(/\/+$/, '');
const libraryBase = () => String(conf.libraryUrl || 'https://photoslibrary.googleapis.com/v1').replace(/\/+$/, '');
const clientId = () => (typeof conf.clientId === 'string' ? conf.clientId.trim() : '');
const clientSecret = () => (typeof conf.clientSecret === 'string' ? conf.clientSecret.trim() : '');
const SCOPES = [
  'https://www.googleapis.com/auth/photospicker.mediaitems.readonly',
  'https://www.googleapis.com/auth/photoslibrary.appendonly',
  'https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata',
  'https://www.googleapis.com/auth/photoslibrary.edit.appcreateddata',
  'openid', 'email',
].join(' ');

const shownName = name => String(name ?? '').replace(/\//g, '／').replace(/[\0-\x1f\x7f]/g, '').trim() || '(senza nome)';
const libraryName = name => name.replace(/／/g, '/');
function numbered(name, n) {
  const dot = name.lastIndexOf('.');
  return dot > 0 ? `${name.slice(0, dot)} (${n})${name.slice(dot)}` : `${name} (${n})`;
}
/** Unique names for lilOS: [{ ...item, shown }] in the same order. */
function named(items, nameOf) {
  const taken = new Set();
  return items.map(it => {
    const base = shownName(nameOf(it));
    let shown = base, n = 1;
    while (taken.has(shown.toLowerCase())) shown = numbered(base, ++n);
    taken.add(shown.toLowerCase());
    return { ...it, shown };
  });
}

// ---------- HTTP ----------

/** Google's APIs, and the addresses of photos (https, on googleusercontent.com): the token goes nowhere else. */
function googleUrl(raw) {
  let u;
  try { u = new URL(raw); } catch { return false; }
  if ([new URL(pickerBase()).origin, new URL(libraryBase()).origin].includes(u.origin)) return true;
  return u.protocol === 'https:' && /(^|\.)googleusercontent\.com$/.test(u.hostname);
}

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

async function apiError(res) {
  const body = await res.json().catch(() => null);
  const said = String(body?.error?.message ?? '').split(/\r?\n/)[0].slice(0, 240) || `errore ${res.status}`;
  if (res.status === 401) return netError('auth', `Accesso a Google non più valido (${said})`);
  if (res.status === 404) return netError('not_found', 'Non esiste in Google Foto');
  if (res.status === 403) return netError('denied', said);
  if (res.status === 409) return netError('exists', said);
  if (res.status === 429 || res.status >= 500) return netError('unreachable', said);
  return netError('invalid', said);
}

function tokenError(body, status) {
  const said = String(body?.error_description ?? body?.error ?? `errore ${status}`).split(/\r?\n/)[0].slice(0, 240);
  if (body?.error === 'invalid_grant') return netError('auth', `Serve un nuovo accesso (${said})`);
  if (body?.error === 'invalid_client' || body?.error === 'unauthorized_client') return netError('invalid', `Progetto Google non valido: controlla ID e segreto client (${said})`);
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

/** Who signed in, from the id token. */
function emailOf(idToken) {
  try {
    const claims = JSON.parse(Buffer.from(String(idToken).split('.')[1], 'base64url').toString('utf8'));
    return String(claims.email || '').trim().slice(0, 200);
  } catch {
    return '';
  }
}

// ---------- The session ----------

class Session {
  resume = { read: true, write: false };
  #tokens;
  #imports = new Map();     // picker session id → { name, created, items: [{ shown, baseUrl, video, created }] } once picked
  #albums = null;           // [{ id, title, shown, count, productUrl }], read again at each listing of the top

  constructor(tokens) {
    this.#tokens = tokens;
  }

  /** A request to one of Google's Photos APIs: renews once on 401, waits when throttled. */
  async #call(method, url, { body, headers = {}, signal, raw = false, json = true } = {}) {
    const u = new URL(url);
    if (!googleUrl(u)) throw netError('invalid', 'Indirizzo di Google inatteso');
    for (let attempt = 0, renewed = false; ; attempt++) {
      const res = await timedFetch(u, {
        method,
        headers: { Authorization: `Bearer ${await this.#tokens.get()}`, ...(body !== undefined && json && { 'Content-Type': 'application/json' }), ...headers },
        body: body === undefined ? undefined : json ? JSON.stringify(body) : body,
        ...(body instanceof ReadableStream && { duplex: 'half' }),
      }, signal);
      if (res.status === 401 && !renewed) {
        renewed = true;
        await res.body?.cancel().catch(() => {});
        await this.#tokens.renew();
        continue;
      }
      if (attempt < RETRIES && (res.status === 429 || res.status >= 500) && !(body instanceof ReadableStream)) {
        await res.body?.cancel().catch(() => {});
        await sleep(Math.min(MAX_WAIT, (Number(res.headers.get('retry-after')) || 2 ** attempt) * 1000), signal);
        continue;
      }
      if (!res.ok) throw await apiError(res);
      if (raw) return res;
      const text = await res.text();
      return text ? JSON.parse(text) : null;
    }
  }

  // ---------- Imports (Picker API) ----------

  #prune() {
    for (const [id, imp] of this.#imports) {
      if (Date.now() - imp.created > IMPORT_LIFE) {
        this.#imports.delete(id);
        this.#call('DELETE', `${pickerBase()}/sessions/${encodeURIComponent(id)}`).catch(() => {});
      }
    }
  }

  importer = {
    start: async () => {
      this.#prune();
      const s = await this.#call('POST', `${pickerBase()}/sessions`, { body: { pickingConfig: { maxItemCount: String(MAX_PICKED) } } });
      if (typeof s?.id !== 'string' || typeof s.pickerUri !== 'string' || !/^https:\/\//.test(s.pickerUri)) throw netError('invalid', 'Google non ha aperto la pagina per scegliere');
      this.#imports.set(s.id, { created: Date.now(), name: null, items: null });
      return { id: s.id, url: `${s.pickerUri.replace(/\/+$/, '')}/autoclose` };
    },

    poll: async id => {
      const imp = this.#imports.get(id);
      if (!imp) return { status: 'error', error: 'Importazione scaduta: ricomincia' };
      if (imp.items) return { status: 'done', count: imp.items.length, path: `/${imp.name}` };
      let s;
      try {
        s = await this.#call('GET', `${pickerBase()}/sessions/${encodeURIComponent(id)}`);
      } catch (err) {
        if (err.net === 'not_found') { this.#imports.delete(id); return { status: 'error', error: 'La scelta è scaduta: ricomincia' }; }
        throw err;
      }
      if (!s?.mediaItemsSet) return { status: 'pending' };
      const picked = [];
      let pageToken;
      for (let page = 0; page < 40 && picked.length < MAX_PICKED; page++) {
        const q = new URLSearchParams({ sessionId: id, pageSize: '100', ...(pageToken && { pageToken }) });
        const body = await this.#call('GET', `${pickerBase()}/mediaItems?${q}`);
        for (const m of Array.isArray(body?.mediaItems) ? body.mediaItems : []) {
          if (typeof m?.mediaFile?.baseUrl !== 'string' || !googleUrl(m.mediaFile.baseUrl)) continue;
          picked.push({ name: m.mediaFile.filename || `${m.id}.jpg`, baseUrl: m.mediaFile.baseUrl, video: m.type === 'VIDEO', created: Date.parse(m.createTime) || 0 });
        }
        pageToken = body?.nextPageToken;
        if (!pageToken) break;
      }
      imp.items = named(picked, p => p.name);
      imp.name = this.#importName();
      return { status: 'done', count: imp.items.length, path: `/${imp.name}` };
    },
  };

  /** '2026-11-02 10.05.31' (a second later if taken): the folder of an import. */
  #importName() {
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    let name = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}.${p(d.getMinutes())}.${p(d.getSeconds())}`;
    for (let n = 2; [...this.#imports.values()].some(i => i.name === name); n++) name = `${name.replace(/ \(\d+\)$/, '')} (${n})`;
    return name;
  }

  #import(name) {
    this.#prune();
    return [...this.#imports.values()].find(i => i.items && i.name === name) ?? null;
  }

  // ---------- Albums (Library API, app-created) ----------

  async #readAlbums() {
    const out = [];
    let pageToken;
    for (let page = 0; page < MAX_ALBUMS / 50; page++) {
      const q = new URLSearchParams({ pageSize: '50', ...(pageToken && { pageToken }) });
      const body = await this.#call('GET', `${libraryBase()}/albums?${q}`);
      for (const a of Array.isArray(body?.albums) ? body.albums : []) {
        if (typeof a?.id === 'string') out.push({ id: a.id, title: a.title ?? '', count: Number(a.mediaItemsCount) || 0, productUrl: a.productUrl, cover: null });
      }
      pageToken = body?.nextPageToken;
      if (!pageToken) break;
    }
    this.#albums = named(out, a => a.title);
    return this.#albums;
  }

  async #album(name, { fresh = false } = {}) {
    const list = !fresh && this.#albums ? this.#albums : await this.#readAlbums();
    return list.find(a => a.shown === name) ?? (fresh ? null : (await this.#readAlbums()).find(a => a.shown === name) ?? null);
  }

  async #albumItems(album) {
    const out = [];
    let pageToken;
    for (let page = 0; page < MAX_ITEMS / 100; page++) {
      const body = await this.#call('POST', `${libraryBase()}/mediaItems:search`, { body: { albumId: album.id, pageSize: 100, ...(pageToken && { pageToken }) } });
      for (const m of Array.isArray(body?.mediaItems) ? body.mediaItems : []) {
        if (typeof m?.id !== 'string') continue;
        out.push({ id: m.id, name: m.filename || `${m.id}.jpg`, baseUrl: m.baseUrl, productUrl: m.productUrl, video: !!m.mediaMetadata?.video || /^video\//.test(m.mimeType ?? ''), created: Date.parse(m.mediaMetadata?.creationTime) || 0 });
      }
      pageToken = body?.nextPageToken;
      if (!pageToken) break;
    }
    return named(out, m => m.name);
  }

  /** What a path is: { kind: 'top' | 'album' | 'item' | 'import' | 'picked', … } or null. */
  async #where(path) {
    const parts = path.split('/').filter(Boolean);
    if (!parts.length) return { kind: 'top' };
    const imp = this.#import(parts[0]);
    if (imp) {
      if (parts.length === 1) return { kind: 'import', imp };
      const item = parts.length === 2 ? imp.items.find(i => i.shown === parts[1]) : null;
      return item ? { kind: 'picked', item } : null;
    }
    const album = await this.#album(parts[0]);
    if (!album) return null;
    if (parts.length === 1) return { kind: 'album', album };
    if (parts.length > 2) return null;
    const item = (await this.#albumItems(album)).find(i => i.shown === parts[1]);
    return item ? { kind: 'item', album, item } : null;
  }

  #itemEntry(i) {
    return {
      name: i.shown, type: 'file', size: 0, modified: i.created || 0,
      can: { rename: false }, removeLabel: label('Remove from album', 'Togli dall’album'),
    };
  }

  // ---------- The driver's session ----------

  async list(path) {
    const at = await this.#where(path) ?? (() => { throw netError('not_found', 'Non esiste in Google Foto'); })();
    if (at.kind === 'top') return (await this.#readAlbums()).map(a => ({ name: a.shown, type: 'folder', size: 0, modified: 0, can: { remove: false } }));
    if (at.kind === 'album') return (await this.#albumItems(at.album)).map(i => this.#itemEntry(i));
    if (at.kind === 'import') return at.imp.items.map(i => ({ name: i.shown, type: 'file', size: 0, modified: i.created || 0 }));
    throw netError('invalid', 'Non è una cartella');
  }

  async stat(path) {
    const at = await this.#where(path);
    if (!at) return null;
    const name = path.slice(path.lastIndexOf('/') + 1);
    if (at.kind === 'top') return { name: '', type: 'folder', size: 0, modified: 0 };
    if (at.kind === 'album') return { name, type: 'folder', size: 0, modified: 0, can: { remove: false } };
    if (at.kind === 'import') return { name, type: 'folder', size: 0, modified: at.imp.created };
    if (at.kind === 'picked') return { name, type: 'file', size: 0, modified: at.item.created || 0 };
    return this.#itemEntry(at.item);
  }

  async read(path, { start = 0, signal } = {}) {
    const at = await this.#where(path);
    if (!at || (at.kind !== 'item' && at.kind !== 'picked')) throw netError('not_found', 'Non esiste in Google Foto');
    let { baseUrl, video } = at.item;
    if (at.kind === 'item') {
      // An album's item: its address read again (they last an hour)
      const fresh = await this.#call('GET', `${libraryBase()}/mediaItems/${encodeURIComponent(at.item.id)}`);
      baseUrl = fresh?.baseUrl ?? baseUrl;
    }
    if (typeof baseUrl !== 'string' || !googleUrl(baseUrl)) throw netError('invalid', 'Google non ha dato l’indirizzo del file');
    // =d: the original with its data (EXIF); =dv: a video's bytes
    const res = await this.#call('GET', `${baseUrl}${video ? '=dv' : '=d'}`, { raw: true, signal, headers: start > 0 ? { Range: `bytes=${start}-` } : {} });
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

  /** A photo or video copied into an album: uploaded to the library, then added to the album. */
  async write(path, source, { start = 0, signal } = {}) {
    if (start > 0) throw netError('unsupported', 'Google Foto non riprende un invio a metà');
    const parts = path.split('/').filter(Boolean);
    if (parts.length !== 2) throw netError('unsupported', 'In Google Foto si copia dentro un album creato da lilOS');
    const album = await this.#album(parts[0]) ?? (() => { throw netError('not_found', 'Album inesistente (o non creato da lilOS)'); })();
    const res = await this.#call('POST', `${libraryBase()}/uploads`, {
      raw: true, json: false, signal,
      body: Readable.toWeb(source),
      headers: { 'Content-Type': 'application/octet-stream', 'X-Goog-Upload-Protocol': 'raw', 'X-Goog-Upload-File-Name': encodeURIComponent(libraryName(parts[1])).slice(0, 250) },
    });
    const token = (await res.text()).trim();
    if (!token || token.length > 4096) throw netError('invalid', 'Google non ha accettato il file');
    const made = await this.#call('POST', `${libraryBase()}/mediaItems:batchCreate`, {
      body: { albumId: album.id, newMediaItems: [{ simpleMediaItem: { fileName: libraryName(parts[1]), uploadToken: token } }] }, signal,
    });
    const result = made?.newMediaItemResults?.[0];
    const code = Number(result?.status?.code ?? 0);
    if (code !== 0 && result?.status?.message !== 'Success' && result?.status?.message !== 'OK') {
      throw netError('invalid', `Google Foto non ha accettato «${parts[1]}»: ${String(result?.status?.message ?? 'formato non supportato').slice(0, 200)}`);
    }
  }

  async mkdir(path) {
    const parts = path.split('/').filter(Boolean);
    if (parts.length !== 1) throw netError('unsupported', 'In Google Foto le cartelle sono gli album: solo al primo livello');
    if (await this.#album(parts[0], { fresh: true })) throw netError('exists', 'C’è già un album con questo nome');
    await this.#call('POST', `${libraryBase()}/albums`, { body: { album: { title: libraryName(parts[0]) } } });
    this.#albums = null;
  }

  async rename(from, to) {
    const a = from.split('/').filter(Boolean), b = to.split('/').filter(Boolean);
    if (a.length !== 1 || b.length !== 1) throw netError('unsupported', 'Google Foto non permette di rinominare né spostare le foto: si rinominano solo gli album');
    const album = await this.#album(a[0]) ?? (() => { throw netError('not_found', 'Album inesistente'); })();
    if (await this.#album(b[0], { fresh: true })) throw netError('exists', 'C’è già un album con questo nome');
    await this.#call('PATCH', `${libraryBase()}/albums/${encodeURIComponent(album.id)}?updateMask=title`, { body: { title: libraryName(b[0]) } });
    this.#albums = null;
  }

  /** A photo out of its album (it stays in the library); albums are removed only on Google's site. */
  async remove(path) {
    const at = await this.#where(path) ?? (() => { throw netError('not_found', 'Non esiste in Google Foto'); })();
    if (at.kind === 'album') throw netError('unsupported', 'Google non permette alle app di eliminare gli album: eliminalo da photos.google.com');
    if (at.kind === 'import' || at.kind === 'picked' || at.kind === 'top') throw netError('unsupported', 'Non si elimina');
    await this.#call('POST', `${libraryBase()}/albums/${encodeURIComponent(at.album.id)}:batchRemoveMediaItems`, { body: { mediaItemIds: [at.item.id] } });
  }

  removeTree(path) {
    return this.remove(path);
  }

  async link(path) {
    const at = await this.#where(path);
    if (!at || at.kind === 'top' || at.kind === 'import' || at.kind === 'picked') return 'https://photos.google.com/';
    const url = at.kind === 'album' ? at.album.productUrl : at.item.productUrl;
    return typeof url === 'string' && /^https:\/\//.test(url) ? url : 'https://photos.google.com/';
  }

  close() {
    for (const id of this.#imports.keys()) this.#call('DELETE', `${pickerBase()}/sessions/${encodeURIComponent(id)}`).catch(() => {});
    this.#imports.clear();
  }
}

// ---------- The driver ----------

const driver = {
  label: label('Google Photos', 'Google Foto'),
  order: 64,
  group: 'cloud',
  links: {},
  importer: { label: label('Import from Google Photos…', 'Importa da Google Foto…') },
  removeText: label('they leave the album and stay in your Google Photos library', 'escono dall’album e restano nella tua libreria di Google Foto'),
  fields: [
    {
      key: 'account', type: 'signin', label: label('Google account', 'Account Google'), required: true,
      button: label('Sign in with Google', 'Accedi con Google'),
      hint: label('lilOS sees only the photos you pick and the albums it makes', 'lilOS vede solo le foto che scegli e gli album che crea'),
    },
  ],

  ready() {
    if (!clientId() || !clientSecret()) {
      return label('An administrator must first enter the client ID and secret of the Google Cloud project (Control Panel → Google Photos)', 'Un amministratore deve prima inserire ID e segreto client del progetto Google Cloud (Pannello di controllo → Google Foto)');
    }
    return null;
  },

  address(v) {
    return `gphotos://${v.account ?? ''}`;
  },

  signIn: {
    manual: true,
    onlyManual: () => conf.clientType === 'desktop',
    start({ redirectUri, state, challenge }) {
      if (!clientId() || !clientSecret()) throw netError('unsupported', 'Progetto Google non impostato (Pannello di controllo → Google Foto)');
      const url = new URL(authUrl());
      url.search = new URLSearchParams({
        client_id: clientId(), response_type: 'code', redirect_uri: redirectUri, scope: SCOPES, state,
        code_challenge: challenge, code_challenge_method: 'S256', access_type: 'offline', prompt: 'consent select_account',
      });
      return url.href;
    },
    async finish({ code, redirectUri, verifier }) {
      const body = await tokenRequest({ grant_type: 'authorization_code', code, redirect_uri: redirectUri, code_verifier: verifier });
      if (typeof body.refresh_token !== 'string') throw netError('invalid', 'Google non ha dato un accesso duraturo: togli lilOS dalle app collegate all’account e riprova');
      const account = emailOf(body.id_token);
      if (!account) throw netError('invalid', 'Google non ha detto chi è l’account');
      return { account, secret: body.refresh_token };
    },
  },

  async connect(values, { secret = {}, saveSecret = null } = {}) {
    if (!clientId() || !clientSecret()) throw netError('unsupported', 'Progetto Google non impostato (Pannello di controllo → Google Foto)');
    if (typeof secret.account !== 'string' || !secret.account) throw netError('auth', 'Serve un nuovo accesso');
    const tokens = new Tokens(secret.account, saveSecret);
    await tokens.renew();
    const session = new Session(tokens);
    await session.list('/');
    return session;
  },
};

export default {
  async init(ctx) {
    conf = ctx.config;
    ctx.onConfig?.(config => { conf = config; });
    ctx.provide('netfs.gphotos', driver);
  },
};
