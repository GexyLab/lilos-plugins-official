# lilOS — app e moduli ufficiali

Il repository ufficiale di [lilOS](https://github.com/GexyLab/lilos): le app di sistema e i moduli del kernel. Il kernel di lilOS installa da qui le app che gli mancano e l'AppStore lo mostra sempre.

Le altre app e i loro moduli, con i sorgenti aperti a tutti, stanno nel repository [lilos-plugins-community](https://github.com/GexyLab/lilos-plugins-community) (per esempio ArduinoIDE4LilOS e il modulo `arduino`): un amministratore lo aggiunge da AppStore → Opzioni → Aggiungi un repository.

## Cosa c'è

| Cartella | Cosa | Note |
|---|---|---|
| `apps/files` | **File Manager**: sfoglia, cerca e organizza file e cartelle, con pannelli di informazioni e anteprima | Necessaria |
| `apps/editor` | **Editor** di testo e codice | Si può nascondere o rimuovere |
| `apps/settings` | **Pannello di controllo**: le impostazioni di lilOS | Necessaria |
| `apps/appstore` | **AppStore**: app e moduli dei repository | Necessaria |
| `apps/photo` | **Photo**: guarda le immagini e le ritocca (disegno, testo, ritaglio, ridimensionamento, conversione in PNG, JPEG e WebP) | Si installa dall'AppStore; vuole lilOS con i file binari (`fs.readBlob`) |
| `apps/terminal` | **Terminale**: una shell come bash sui file di lilOS (pipe, redirezioni, variabili, cicli, funzioni, script; `ls`, `grep`, `sed`, `find`, `diff`…). Le altre app possono aggiungere comandi con `contributes.shell` | Si installa dall'AppStore; `rm` sposta nel cestino |
| `apps/zip` | **Zip**: comprime file e cartelle in archivi `.zip` e li estrae, dal menu di file e cartelle (**Comprimi → Zip / Unzip**); aprendo un `.zip` ne mostra il contenuto | Si installa dall'AppStore; vuole lilOS con i sottomenu delle azioni (`contributes.menus`, `when.notExt`) |
| `modules/users-basic` | Modulo del kernel: utenti e accesso, in `users.json` | |
| `modules/fs-postgres` | Modulo del kernel: file system su PostgreSQL | |
| `modules/services-isolate` | Modulo del kernel: fa girare i servizi delle app, isolati (isolated-vm) | |

`catalog.json` elenca le cartelle dei pacchetti: è ciò che l'AppStore legge.

Ogni cartella di pacchetto (`apps/<id>/`, `modules/<nome>/`) ha un `README.md`: l'AppStore lo mostra nei dettagli del pacchetto (Markdown, niente HTML, immagini non caricate; oltre 64 KB se ne vede l'inizio e un link salva il file completo nella cartella Download di lilOS). In `app.json` il campo `category` (`system`, `productivity`, `media`, `development` o `other`, predefinita) decide in quale scheda dell'AppStore compare l'app; `module.json` può avere `icon: { glyph, color }`.

Le app di sistema girano dentro lilOS, senza sandbox. Il kernel le accetta solo da questo repository. Si installano dalla versione più alta tra i tag `vX.Y.Z`.

## Struttura

- `src/<app>/`: sorgenti di ogni app, con `app.json`, il modello del manifesto.
- `apps/<app>/`: il pacchetto pronto, con `lilos.json`, `dist/` e il `README.md` (che si scrive qui, a mano).
  - Si genera con `npm run build` e si committa: il kernel installa i file così come sono, senza compilare niente.
  - `lilos.json` contiene l'hash di ogni file, controllato dal kernel all'installazione.
- `modules/<nome>/`: un modulo del kernel così com'è (`module.json`, `index.js`, eventuale `package.json` con `package-lock.json`).
- `modules/_shared/`: codice in comune tra i moduli (non è un modulo: il catalogo non lo elenca). Vedi «Codice in comune dei moduli».

Le app importano `@lilos/sdk` e `@lilos/system` senza includerli nel build: a runtime usano quelli di lilOS, serviti come `/host/sdk.js` e `/host/system.js`. `@lilos/system` è l'API che lilOS dà alle app di sistema (vedi `src/systemApi.js` nel repository di lilOS).

## Pubblicare una nuova versione

1. Aumenta `version` in `src/<app>/app.json` (o in `modules/<nome>/module.json`).
2. `npm install`, poi `npm run build` (oppure `npm run build -- editor` per una sola app).
3. Committa sorgenti e `apps/`, poi crea il tag: `git tag v1.1.0 && git push --follow-tags`.

Le grammatiche di Tree-sitter dell'Editor si aggiornano con `npm run vendor:tree-sitter`.

### Codice in comune dei moduli

Un modulo si installa da solo (solo la sua cartella, come `modules/<nome>_<versione>`), quindi non può importare da un altro. Il codice che più moduli usano (errori di rete, connessioni TCP e TLS attraverso `ctx.lookup` del kernel, HTTP con i certificati da confermare, XML, richieste alle API dei servizi cloud, flussi a pezzi…) sta in `modules/_shared/`, e ogni modulo ne ha una copia in `lib/shared/`: quella dei file che il suo codice importa da lì (con quello che importano a loro volta). Si modifica sempre `modules/_shared/`, poi `npm run sync:modules` aggiorna le copie (e toglie quelle non più importate) e si aumenta la versione dei moduli che cambiano. `npm run check:modules`, e `npm run build`, si fermano se una copia manca, è diversa o non serve più.

### Riconoscimenti

Ogni libreria, font o strumento di altri autori compare nel Pannello di controllo, in Informazioni → Riconoscimenti, letto da `src/settings/credits.json`. Quando aggiungi, aggiorni o togli una dipendenza (di un'app o di un modulo), installa (`npm ci` qui e in ogni modulo con un `package-lock.json`) e rigenera l'elenco con `npm run credits`, poi ricostruisci il Pannello di controllo (`npm run build -- settings`). Il codice copiato nel repository (una cartella con la sua `LICENSE`) va in `VENDORED` e i font web in `FONTS`, in `scripts/credits.mjs`. `npm run build` e `npm run check:credits` si fermano se l'elenco non corrisponde ai `package-lock.json`, al codice copiato o ai font.
