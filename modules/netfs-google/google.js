import { netError } from './lib/shared/errors.js';
import { fetcher } from './lib/shared/cloud.js';
import { needPaths } from './lib/shared/kernel.js';

/**
 * What Google Drive and Google Photos share: the module's settings (the project each lilOS
 * installation makes on Google Cloud), the sign-in on Google's page and its tokens, the names of
 * Google's items as lilOS shows them.
 *
 * Sign-in: Google's page (OAuth 2.0, authorization code with PKCE, the kernel's net/signin.js): an
 * admin puts the project's client ID and client secret in the module's settings (Google wants the
 * secret even with PKCE). Google sends the window back only to https with a domain name or to this
 * computer: elsewhere the sign-in is by hand (signIn.manual: the user pastes the address of the
 * page that does not open); with a client of type "Desktop app" always so. The refresh token is the
 * connection's secret.
 *
 * Settings: clientId, clientSecret (secret), clientType ('web' | 'desktop'); for tests only
 * authUrl, tokenUrl replace Google's addresses.
 */
let conf = {};
let moduleCtx = null;

/** The module's ctx (init): its configuration, kept up to date when an admin changes it. */
export function bind(ctx) {
  moduleCtx = ctx;
  conf = ctx.config;
  ctx.onConfig?.(config => { conf = config; });
}

export const config = () => conf;
/** The kernel's path helpers (ctx.paths), from connect()'s ctx or the module's. */
export const pathsOf = ctx => needPaths(ctx, moduleCtx);

const authUrl = () => String(conf.authUrl || 'https://accounts.google.com/o/oauth2/v2/auth');
const tokenUrl = () => String(conf.tokenUrl || 'https://oauth2.googleapis.com/token');
const clientId = () => (typeof conf.clientId === 'string' ? conf.clientId.trim() : '');
const clientSecret = () => (typeof conf.clientSecret === 'string' ? conf.clientSecret.trim() : '');
/** The project is set: client ID and secret. */
export const projectSet = () => !!(clientId() && clientSecret());

export const label = (en, it) => ({ en, it });
export const timedFetch = fetcher('Google');

// ---------- Sign-in and tokens ----------

function tokenError(body, status) {
  const said = String(body?.error_description ?? body?.error ?? `errore ${status}`).split(/\r?\n/)[0].slice(0, 240);
  if (body?.error === 'invalid_grant') return netError('auth', `Serve un nuovo accesso (${said})`);
  if (body?.error === 'invalid_client' || body?.error === 'unauthorized_client') return netError('invalid', `Progetto Google non valido: controlla ID e segreto client (${said})`);
  if (body?.error === 'redirect_uri_mismatch') return netError('invalid', 'L’indirizzo di ritorno di lilOS non è registrato nel progetto Google (Pannello di controllo → Google Drive lo mostra)');
  return netError(status >= 500 ? 'unreachable' : 'invalid', `Accesso a Google non riuscito: ${said}`);
}

export async function tokenRequest(form) {
  const res = await timedFetch(tokenUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: new URLSearchParams({ client_id: clientId(), client_secret: clientSecret(), ...form }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || typeof body?.access_token !== 'string') throw tokenError(body, res.status);
  return body;
}

/** The access token of a session, renewed with the refresh token when it is about to end. */
export class Tokens {
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

/** The address of Google's sign-in page for these scopes (signIn.start). */
export function signInUrl({ redirectUri, state, challenge }, scopes, extra = {}) {
  const url = new URL(authUrl());
  url.search = new URLSearchParams({
    client_id: clientId(), response_type: 'code', redirect_uri: redirectUri, scope: scopes, state,
    code_challenge: challenge, code_challenge_method: 'S256', access_type: 'offline', prompt: 'consent select_account', ...extra,
  });
  return url.href;
}

/** signIn.onlyManual: a "Desktop app" client sends the window back only by pasting the address. */
export const onlyManual = () => conf.clientType === 'desktop';

// ---------- Names ----------

/** A name of Google as lilOS shows it: no '/' (shown as the full-width solidus), no control characters. */
export const shownName = name => String(name ?? '').replace(/\//g, '／').replace(/[\0-\x1f\x7f]/g, '').trim() || '(senza nome)';
/** A name lilOS gives, for Google: the full-width solidus goes back to '/'. */
export const googleName = name => name.replace(/／/g, '/');

/** 'Preventivo.pdf', 2 → 'Preventivo (2).pdf' */
function numbered(name, n) {
  const dot = name.lastIndexOf('.');
  return dot > 0 ? `${name.slice(0, dot)} (${n})${name.slice(dot)}` : `${name} (${n})`;
}

/**
 * Unique names for lilOS (Google allows two items with the same name): [{ ...item, shown, twin }]
 * in the same order, the second 'Preventivo.pdf' being 'Preventivo (2).pdf' (twin). `taken`: names
 * already in use (lower case), added to.
 */
export function named(items, nameOf, taken = new Set()) {
  return items.map(it => {
    const base = shownName(nameOf(it));
    let shown = base, n = 1;
    while (taken.has(shown.toLowerCase())) shown = numbered(base, ++n);
    taken.add(shown.toLowerCase());
    return { ...it, shown, twin: n > 1 };
  });
}
