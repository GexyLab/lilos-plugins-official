# Terminale remoto

Terminali **SSH**, **Telnet**, **rlogin** e **SUPDUP** in lilOS, in schede.

## Cosa fa

- **Connessione rapida**: scrivi la riga come in un terminale (`ssh utente@server -p 2222`, `telnet 192.168.1.1 23`, `rlogin -l utente server`, `supdup its.example`) oppure un indirizzo (`ssh://…`, `telnet://…`, `telnets://…`).
- **Host salvati**, raggruppabili in cartelle, con le password cifrate nel kernel (la pagina non le riceve mai). Una password non salvata la chiede il server nel terminale stesso, come fa `ssh`.
- **Le sessioni restano nel kernel**: chiudendo la finestra o ricaricando la pagina continuano a girare; riaprendo l'app le trovi in **Sessioni ancora attive** e le riprendi con lo schermo com'era (anche vim o htop). Una sessione senza finestra si chiude dopo 10 minuti.
- Alla prima connessione SSH si conferma l'impronta della chiave del server; se cambia, un avviso rosso.
- Il terminale è compatibile **xterm-256color**: colori, mouse, schermo alternativo, incolla protetto, caratteri larghi. Ricerca nello storico (Ctrl+Maiusc+F), copia selezionando, menu **Tasti** per Ctrl+W, Ctrl+T, Ctrl+N e gli altri tasti che il browser tiene per sé, Break e Interrupt per Telnet.
- **Registra** una sessione in un file di testo della home.
- Nel File Manager, dentro una connessione **SFTP** della cartella Rete: **Apri terminale SSH qui** apre una sessione sullo stesso server, in quella cartella, con le stesse credenziali.
- Nel **Terminale** di lilOS i comandi `ssh`, `telnet`, `rlogin` e `supdup` aprono una scheda di Terminale remoto.

## Da sapere

- Ogni protocollo è un modulo del kernel (`term-ssh`, `term-telnet`, `term-rlogin`, `term-supdup`): un amministratore li installa dall'AppStore (scheda Kernel). Senza moduli l'app lo dice.
- Telnet, rlogin e SUPDUP **non cifrano**: password comprese, tutto passa in chiaro. La barra in basso lo mostra.
- rlogin: molti server accettano solo client su una porta privilegiata (512-1023); il kernel la usa quando può (Windows, o il kernel eseguito come root).
- Chiede il permesso `term` (terminali remoti), `fs.write:~` (leggere le chiavi private e scrivere le registrazioni) e `ui.menus` (la voce del File Manager).

## Riconoscimenti

- [xterm.js](https://xtermjs.org) 6.0.0 e gli addon fit, search e unicode11: licenza MIT, © The xterm.js authors, © SourceLair Private Company, © Christopher Jeffrey.
- [ssh2](https://github.com/mscdex/ssh2) 1.17.0 nel modulo `term-ssh`: licenza MIT, © Brian White.
- Telnet: RFC 854, 856, 858, 1073, 1091, 1572. rlogin: RFC 1282. SUPDUP: RFC 734 e il protocollo SUPDUP di ITS.

Vuole lilOS 1.12.0 o successivo (API `lilos.term`, permesso `term`, `when.net` nelle voci dei menu).
