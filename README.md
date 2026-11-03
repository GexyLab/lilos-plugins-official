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

Le app di sistema girano dentro lilOS, senza sandbox. Il kernel le accetta solo da questo repository. Si installano dalla versione più alta tra i tag `vX.Y.Z`. Ogni tag ha le sue note di rilascio in `changelog/<tag>.md`.

## Struttura

Qui ci sono solo i pacchetti pronti da installare, costruiti, uniti e minificati: il kernel li installa così come sono, senza compilare niente. I sorgenti stanno nel repository di [lilOS](https://github.com/GexyLab/lilos), nella cartella `plugins/`; la loro storia fino al tag `v1.51.0` resta anche qui.

- `apps/<app>/`: `lilos.json` (il manifesto, con l'hash di ogni file, controllato dal kernel all'installazione), `dist/`, `locales.json` e `README.md`.
- `modules/<nome>/`: un modulo del kernel, con il suo codice unito e minificato in `index.js`; le dipendenze npm (`package.json`, `package-lock.json`) le installa il kernel.
- `system/lilos/`: lilOS stesso (pagina, kernel e SDK), che l'AppStore aggiorna.
- `changelog/<tag>.md`: cosa porta ogni versione.

Non si modifica a mano: si pubblica dal repository di lilOS con `npm run publish:repo` (vedi `plugins/README.md` là).
