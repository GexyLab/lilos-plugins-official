# Changelog di lilOS

## 1.8.0 — 2026-11-01

Prima versione di lilOS pubblicata nel repository ufficiale.

- Aggiornamenti di lilOS dall'AppStore: la versione nuova si mette accanto a quella in uso e parte al riavvio del kernel; se non parte, lilOS torna da solo alla precedente e lo dice agli amministratori; se parte, chiede se eliminare quella di prima
- Il kernel serve la pagina di lilOS (non serve più Vite per usarlo)
- Installazione da una release (`system/kernel/tools/install.js`), anche spostando una copia del repository con `--from`
- Le app possono dire con quali versioni di lilOS funzionano (campo `lilos` del manifesto)
- SDK: `systemReleases`; `pipeCatalog.js` non viene più scartato dalla build di produzione
