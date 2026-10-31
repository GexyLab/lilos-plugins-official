/**
 * AppStore → Aggiornamenti: a service (it runs in lilOS's kernel, also with lilOS closed). When it
 * starts and then every `ore` hours it looks for newer versions of the installed apps and tells the
 * user about the ones it has not told them about yet. No imports: it runs in the kernel's isolate,
 * with only `lilos` (see the kernel's apps/serviceApi.js).
 *
 * Calls: { op: 'check' } checks now; anything else returns the last result { at, updates }.
 * Texts: lilos.locale gives the app's strings (locales.json) in the user's language; a kernel
 * older than translations has none, so then the Italian ones here.
 */
const ITALIAN = {
  'notify.updates': ({ n, names }) => (n === 1 ? `Aggiornamento disponibile: ${names}. Apri l’AppStore.` : `${n} aggiornamenti disponibili: ${names}. Apri l’AppStore.`),
};

export async function updates({ lilos, args }) {
  const t = lilos.locale?.i18n.t ?? ((key, params) => ITALIAN[key]?.(params ?? {}) ?? key);
  const hours = Math.min(168, Math.max(1, Number(args.ore) || 24));
  let last = null;

  const check = async () => {
    try {
      const found = await lilos.apps.updates();
      const told = (await lilos.storage.get('updates.told')) ?? {};
      const fresh = found.filter(u => told[u.id] !== u.latest);
      if (fresh.length) {
        const names = fresh.slice(0, 3).map(u => `${u.name} ${u.latest}`).join(', ') + (fresh.length > 3 ? '…' : '');
        await lilos.ui.notify(t('notify.updates', { n: fresh.length, names }));
        for (const u of fresh) told[u.id] = u.latest;
        await lilos.storage.set('updates.told', told);
      }
      last = { at: Date.now(), updates: found };
      console.log(`Controllati gli aggiornamenti: ${found.length} disponibili`);
    } catch (err) {
      console.error('Controllo degli aggiornamenti non riuscito:', err.message);
    }
    return last;
  };

  lilos.handle(data => (data?.op === 'check' ? check() : last));
  // Not awaited: reading the repositories can take a while, and the service is on meanwhile
  check();
  setInterval(check, hours * 3600_000);
}
