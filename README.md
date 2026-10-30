# lilOS — app e moduli ufficiali

Il repository ufficiale di [lilOS](https://github.com/GexyLab/lilos): le app di sistema e i moduli del kernel. Il kernel di lilOS installa da qui le app che gli mancano e l'AppStore lo mostra sempre.

## Cosa c'è

| Cartella | Cosa | Note |
|---|---|---|
| `apps/files` | **File Manager**: sfoglia, cerca e organizza file e cartelle, con pannelli di informazioni e anteprima | Necessaria |
| `apps/editor` | **Editor** di testo e codice | Si può nascondere o rimuovere |
| `apps/settings` | **Impostazioni** | Necessaria |
| `apps/appstore` | **AppStore**: app e moduli dei repository | Necessaria |
| `apps/photo` | **Photo**: guarda le immagini e le ritocca (disegno, testo, ritaglio, ridimensionamento, conversione in PNG, JPEG e WebP) | Si installa dall'AppStore; vuole lilOS con i file binari (`fs.readBlob`) |
| `modules/users-basic` | Modulo del kernel: utenti e accesso, in `users.json` | |
| `modules/fs-postgres` | Modulo del kernel: file system su PostgreSQL | |

`catalog.json` elenca le cartelle dei pacchetti: è ciò che l'AppStore legge.

Ogni cartella di pacchetto (`apps/<id>/`, `modules/<nome>/`) ha un `README.md`: l'AppStore lo mostra nei dettagli del pacchetto (Markdown, niente HTML, immagini non caricate; oltre 64 KB se ne vede l'inizio e un link salva il file completo nella cartella Download di lilOS). In `app.json` il campo `category` (`system`, `productivity`, `media`, `development` o `other`, predefinita) decide in quale scheda dell'AppStore compare l'app; `module.json` può avere `icon: { glyph, color }`.

Le app di sistema girano dentro lilOS, senza sandbox. Il kernel le accetta solo da questo repository. Si installano dalla versione più alta tra i tag `vX.Y.Z`.

## Struttura

- `src/<app>/`: sorgenti di ogni app, con `app.json`, il modello del manifesto.
- `apps/<app>/`: il pacchetto pronto, con `lilos.json`, `dist/` e il `README.md` (che si scrive qui, a mano).
  - Si genera con `npm run build` e si committa: il kernel installa i file così come sono, senza compilare niente.
  - `lilos.json` contiene l'hash di ogni file, controllato dal kernel all'installazione.
- `modules/<nome>/`: un modulo del kernel così com'è (`module.json`, `index.js`, eventuale `package.json` con `package-lock.json`).

Le app importano `@lilos/sdk` e `@lilos/system` senza includerli nel build: a runtime usano quelli di lilOS, serviti come `/host/sdk.js` e `/host/system.js`. `@lilos/system` è l'API che lilOS dà alle app di sistema (vedi `src/systemApi.js` nel repository di lilOS).

## Pubblicare una nuova versione

1. Aumenta `version` in `src/<app>/app.json` (o in `modules/<nome>/module.json`).
2. `npm install`, poi `npm run build` (oppure `npm run build -- editor` per una sola app).
3. Committa sorgenti e `apps/`, poi crea il tag: `git tag v1.1.0 && git push --follow-tags`.

Le grammatiche di Tree-sitter dell'Editor si aggiornano con `npm run vendor:tree-sitter`.
