# Terminale

Una shell come **bash** che lavora sui file di lilOS. Si scrivono i comandi come in un terminale Linux: le cartelle e i file sono quelli che vedi nel File Manager, e la home (`~`, cioè `/home/<utente>`) è la radice di lilOS.

`help` elenca i comandi; `help comando` o `comando --help` spiega un comando; `help if`, `help for`, `help case`, `help variabili` e `help redirezioni` spiegano la sintassi.

## La shell

- Pipe `|` e `|&`, liste `;` `&&` `||`, comandi in background con `&` (`jobs`, `wait`, `fg`, `kill`).
- Redirezioni `>`, `>>`, `<`, `2>`, `2>&1`, `&>`, here-document `<<EOF` e `<<-EOF`, here-string `<<<`, `/dev/null`.
- Variabili, array (`a=(x y)`, `${a[@]}`), `export`, `local`, `readonly`, `declare`; espansioni `${v:-x}`, `${v#…}`, `${v%…}`, `${v/…/…}`, `${v:1:3}`, `${#v}`, `${v^^}`; `$(…)`, `` `…` ``, `$((…))`; graffe `{a,b}` e `{1..10}`; `*`, `?`, `[…]`.
- `if`, `while`, `until`, `for … in`, `for ((…))`, `case`, `[[ … ]]` (con `=~`), `(( … ))`, funzioni, `break`/`continue n`, `return`.
- Script: `bash script.sh`, `./script.sh`, `source file`; gli script in `~/bin` si avviano per nome (`$PATH`). All’apertura viene letto `~/.bashrc`, se c’è.
- `set -e`, `set -u`, `set -x`, `set -o pipefail`; `alias`, `history`, completamento con Tab, frecce per la cronologia, Ctrl C, Ctrl D, Ctrl L.

## I comandi

| Gruppo | Comandi |
|---|---|
| File e cartelle | `ls` `cd` `pwd` `cat` `mkdir` `touch` `cp` `mv` `rm` `rmdir` `stat` `find` `tree` `basename` `dirname` `realpath` |
| Testo | `echo` `printf` `head` `tail` `wc` `grep` `sort` `uniq` `tee` `cut` `tr` `sed` `diff` `rev` `nl` `seq` `yes` `xargs` |
| lilOS | `open` (apre con l’app giusta), `trash` (il cestino), `tag`, `apps`, `date`, `whoami` |
| Shell | `read` `test`/`[` `let` `eval` `source` `type` `command` `which` `env` `set` `shift` `sleep` `exit` e gli altri di `help` |

**`rm` sposta nel cestino**: ciò che si elimina per sbaglio torna con `trash restore nome`. Per eliminare davvero: `rm --purge` o `trash empty`.

## Schede e sessioni remote

Ogni shell è una **scheda**: **+** ne apre un'altra nella stessa cartella. Nella stessa finestra si lavora anche su altri computer:

- `ssh utente@server` (anche `-p porta`, `-l utente` e un comando da eseguire), `telnet server [porta]`, `rlogin -l utente server` e `supdup server` aprono la sessione in una **scheda nuova**. Al posto dell'indirizzo va bene il nome di un host salvato: `ssh web-01`.
- Il pannello a sinistra (pulsante accanto alle schede) ha gli **host salvati**, raggruppabili in cartelle, con le password cifrate nel kernel, e le sessioni **ancora attive**. **+** aggiunge un host; il tasto destro lo modifica.
- Le sessioni remote restano nel kernel anche a finestra chiusa: si riprendono dal pannello (**Riprendi**) o con `sessions` e `sessions <n>`. Senza finestra si chiudono dopo 10 minuti.
- Alla prima connessione SSH si conferma l'impronta della chiave del server; se cambia, un avviso. Una password non salvata la chiede il terminale stesso.
- Nella barra in basso: cifrata o no, indirizzo, chiave, dimensione; la ricerca (Ctrl+Maiusc+F), la registrazione in un file e il menu **Tasti** per Ctrl+W, Ctrl+T, Ctrl+N e gli altri tasti che il browser tiene per sé. Copia selezionando o con Ctrl+Maiusc+C, incolla con Ctrl+Maiusc+V.
- Nel File Manager, dentro una connessione **SFTP** della cartella Rete, **Apri terminale SSH qui** apre la sessione in quella cartella, con le stesse credenziali.

I protocolli sono moduli del kernel (`term-ssh`, `term-telnet`, `term-rlogin`, `term-supdup`) che un amministratore installa dall'AppStore, scheda Kernel. Telnet, rlogin e SUPDUP non sono cifrati. Vuole lilOS 1.12.0 o successivo.

## Comandi delle altre app

Un’app installata può aggiungere i suoi comandi al Terminale nel manifesto:

```json
"contributes": {
  "shell": [{ "name": "converti", "entry": "cli", "summary": "Converte immagini", "usage": "converti file formato" }]
}
```

`entry` è un punto d’ingresso `background` dell’app (manifesto con `sdk` `"2"`). Viene chiamato con `{ command, args, stdin, cwd, env }` (`stdin` è il testo in ingresso, o `null` se è la tastiera) e risponde con una stringa (l’output) o con `{ stdout, stderr, code }`. I comandi del Terminale hanno la precedenza su quelli delle app con lo stesso nome.

## Differenze da bash

Non ci sono processi né programmi esterni: i comandi sono quelli del Terminale e delle app. Mancano gli array associativi, `trap`, `getopts`, `select` e i permessi dei file (in lilOS non esistono); i nomi dei file non distinguono maiuscole e minuscole, come nel resto di lilOS.

## Riconoscimenti

- [xterm.js](https://xtermjs.org) 6.0.0 e gli addon fit, search e unicode11, per le schede delle sessioni remote: licenza MIT, © The xterm.js authors, © SourceLair Private Company, © Christopher Jeffrey.
- [ssh2](https://github.com/mscdex/ssh2) 1.17.0 nel modulo del kernel `term-ssh`: licenza MIT, © Brian White.
- Telnet: RFC 854, 856, 858, 1073, 1091, 1572. rlogin: RFC 1282. SUPDUP: RFC 734 e il protocollo SUPDUP di ITS.
