# Changelog di lilOS

## 1.13.1 — 2026-11-02

- La cartella **Sistema**, dove lilOS tiene la copia dello sfondo, non si vede più: non è tra le cartelle della Home, nella barra laterale del File Manager né nella scelta dei file. Lo sfondo funziona come prima; per aprirla si scrive `~/Sistema` nel percorso del File Manager
- Per gli sviluppatori: `fs.setHiddenNodes` e `fs.hiddenNodes` (SDK 0.7.1)

## 1.13.0 — 2026-11-02

- **Collegamenti sulla scrivania**: nel File Manager, tasto destro su un file o una cartella (anche di un server della Rete) o su una connessione → «Aggiungi un collegamento al desktop». L'icona è quella dell'originale con una piccola catena; il collegamento segue l'originale se lo sposti o lo rinomini
- **Nuovo → Collegamento…** sulla scrivania (e «Nuovo collegamento…» nel File Manager): scrivi un percorso di lilOS (`~/Documenti/Note.txt`), un indirizzo con il protocollo (`sftp://utente@server/cartella`, `smb://server/condivisione/cartella`, `ftp://`, `ftps://`, `webdavs://`…) o una pagina web (`https://…`, si apre in una nuova scheda). Le cartelle si separano sempre con `/`. Senza una connessione a quel server si apre «Connetti a un server» già compilato
- Se l'originale non c'è più (nel cestino, eliminato, sparito dal server, connessione rimossa) un messaggio dice perché e il collegamento viene segnato come rotto, con una croce rossa; il segno sparisce quando l'originale torna
- Nel File Manager le sezioni Collegamenti, Tag e Rete della barra laterale si comprimono con il triangolo a sinistra del titolo
- Per gli sviluppatori: nodi `link` di `fs` (SDK 0.7.0) e funzioni dei collegamenti in `@lilos/system`

## 1.12.0 — 2026-11-02

- Nuova app **Terminale remoto** (dall'AppStore): terminali SSH, Telnet, rlogin e SUPDUP in schede, con la connessione rapida (`ssh utente@server`), gli host salvati in cartelle e le password cifrate nel kernel. Una password non salvata la chiede il terminale stesso, come fa `ssh`
- Le sessioni restano aperte nel kernel anche a finestra chiusa o pagina ricaricata: riaprendo l'app le ritrovi in «Sessioni ancora attive» e le riprendi con lo schermo com'era. Senza finestra si chiudono dopo 10 minuti
- La prima connessione SSH chiede di confermare l'impronta della chiave del server; se cambia, un avviso rosso. Telnet, rlogin e SUPDUP non sono cifrati e la barra in basso lo dice
- Nel File Manager, dentro una connessione SFTP della Rete, «Apri terminale SSH qui» apre la shell in quella cartella; nel Terminale i comandi `ssh`, `telnet`, `rlogin` e `supdup` aprono una scheda
- I protocolli sono moduli del kernel da installare dall'AppStore (scheda Kernel): term-ssh, term-telnet, term-rlogin, term-supdup. Le nuove installazioni li hanno già
- Per chi fa app: SDK 0.6.0 con `term`, il permesso `term` e `lilos.term` per le app installate, e la condizione `when.net` per le voci dei menu (solo dentro le connessioni di rete di certi protocolli)

## 1.11.0 — 2026-11-02

- **OneDrive** nella cartella Rete (modulo netfs-onedrive, da installare dall'AppStore → Kernel): il tuo OneDrive, personale o di lavoro, diventa una cartella di Home → Rete. Ci si collega con **Accedi con Microsoft**, che apre la pagina di Microsoft in una finestra; i token restano nel kernel, cifrati, e se Microsoft chiede un nuovo accesso lilOS lo dice
- Sui documenti Word, Excel e PowerPoint di OneDrive c'è **Apri in Word/Excel/PowerPoint online** (anche col doppio clic): si aprono in Office per il web in una nuova scheda. Sui documenti Office della Home c'è **Carica su OneDrive e apri**. Eliminare da OneDrive manda nel cestino di OneDrive
- Nuova scheda **Pannello di controllo → OneDrive**: l'amministratore inserisce l'app registrata su Azure (con i passi e l'indirizzo di ritorno da copiare) e sceglie se aprire le cartelle condivise aggiunte a «I miei file»; ognuno sceglie dove vanno i file di «Carica su OneDrive e apri». Servono File Manager 1.11.0 e Pannello di controllo 1.14.0 (da aggiornare dall'AppStore)
- L'accesso con Microsoft funziona con lilOS su https, o su http da questo computer (localhost)
- Per chi scrive moduli: i moduli del kernel possono avere impostazioni che un amministratore cambia senza riavviare, e i protocolli di rete un accesso sulla pagina del fornitore

## 1.10.1 — 2026-11-02

- Con più utenti, i server della rete locale del computer su cui gira lilOS (per esempio `192.168.…`) non sono più raggiungibili di serie: chi gestisce lilOS li apre tutti (`"net": { "allowPrivate": true }` in `config.json`) o solo quelli che servono, come il NAS (`"net": { "allow": ["192.168.1.50/32"] }`). Con un solo utente non cambia niente
- SMB (modulo netfs-smb 1.0.1, da aggiornare dall'AppStore): niente più cadute a caso durante le scritture lunghe, e anche i server SMB 2.0.2 (Vista, Server 2008, NAS vecchi)

## 1.10.0 — 2026-11-01

- Nuova cartella **Rete**: ogni server a cui ti colleghi (FTP, FTPS, SFTP, WebDAV, SMB) diventa una cartella in Home → Rete e si usa come le altre. Si aggiunge dal File Manager (sezione Rete → +, «Connetti a un server»): si sceglie il protocollo da un elenco e compaiono i campi che servono
- Le password restano nel kernel, cifrate, e partono solo verso il server per cui sono state date, dopo averlo verificato: la prima volta lilOS mostra l'impronta della chiave o del certificato e chiede di confermarla; se cambia, lo dice chiaramente
- Trascinare file tra la Home e una cartella di rete li copia: lo fa il kernel, anche a File Manager o pagina chiusi, e dopo un riavvio riprende da dove era. Se dura più di 5 secondi si apre **Trasferimento dati**: quanto è stato inviato e ricevuto, il file in corso, la coda di ogni destinazione; si annulla tutto, una destinazione, una cartella o un file. Alla fine arriva una notifica
- Le cartelle SMB si aggiornano da sole quando qualcuno cambia i file sul server; le altre si rileggono quando le apri
- Eliminare su un server è definitivo (niente Cestino) e lilOS chiede sempre conferma
- I protocolli sono moduli del kernel da installare o aggiornare dall'AppStore: netfs-sftp, netfs-ftp, netfs-webdav, netfs-smb, e fs-postgres 1.1.0 (i file grandi a pezzi); la sezione Rete è nel File Manager 1.10.0

## 1.9.7 — 2026-11-01

- Installando lilOS con `--from` (i dati di un'altra copia), i moduli del kernel che sono quelli ufficiali (stessa versione e stesso codice) diventano ufficiali: l'AppStore li mostra una sola volta, invece che due («Installato a mano» e «Da un altro repository»), e li aggiorna. I loro dati restano. Gli altri moduli restano installati a mano e l'installazione lo dice

## 1.9.6 — 2026-11-01

- Gli elementi del Cestino si possono trascinare fuori: lasciati su una cartella (della scrivania, della barra laterale del File Manager, di una finestra aperta su una cartella) si ripristinano **lì**, non nella cartella da cui erano partiti; su un punto vuoto della scrivania tornano nella Scrivania, nel punto in cui li lasci. Una notifica dice dove sono andati e Ctrl Z li rimette nel cestino
- File e cartelle lasciati nell'elenco del Cestino aperto vanno nel cestino
- Il trascinamento nel Cestino aperto e fuori dal Cestino è nel File Manager 1.9.0 (da aggiornare dall'AppStore)

## 1.9.5 — 2026-11-01

- La pagina utente ha uno sfondo pieno: non lascia più intravedere, sfocato, quello che c'è sotto (come il menu applicazioni dalla 1.9.3)

## 1.9.4 — 2026-11-01

- L'immagine di sfondo è alta esattamente quanto la scrivania e non si deforma: in altezza si vede sempre tutta; se è più larga dello schermo si taglia ai lati, se è più stretta ai lati si vede il colore della scrivania
- «Usa come sfondo desktop» copia l'immagine nella nuova cartella di sistema **Sistema** e usa la copia: eliminare o modificare l'originale non cambia lo sfondo. Sistema tiene solo la copia in uso (un nuovo sfondo o «Togli» eliminano quella di prima); uno sfondo scelto con le versioni precedenti viene copiato al primo avvio
- Il testo della scheda Sfondo è nel Pannello di controllo 1.13.1 (da aggiornare dall'AppStore)

## 1.9.3 — 2026-11-01

- Menu applicazioni con lo sfondo pieno, senza trasparenza
- Icone di app, cartelle e file nello stile «Ritaglio»: quadrato pieno del loro colore con il simbolo ritagliato
- La barra delle notifiche resta 10 secondi dopo l'ultima arrivata

## 1.9.2 — 2026-11-01

- L'immagine di sfondo della scrivania parte sempre dal bordo superiore dello schermo: se è più alta dello schermo si taglia solo in basso (prima era centrata e si tagliava sopra e sotto); una più larga si taglia ancora ai due lati

## 1.9.1 — 2026-11-01

- Il kernel nella release è impacchettato e minificato: nel repository ufficiale non c'è più il suo codice leggibile. Nessun cambiamento per chi usa lilOS

## 1.9.0 — 2026-11-01

- Immagine di sfondo della scrivania: «Usa come sfondo desktop» nel menu di un file immagine sulla scrivania, oppure Pannello di controllo → Scrivania → Sfondo. Riempie lo schermo mantenendo le proporzioni e non si sposta né si ingrandisce con la scrivania; se il file viene eliminato, lo sfondo si toglie
- Colore della scrivania a scelta, nello stesso posto: etichette e puntini si adattano al colore chiaro o scuro
- La scheda Sfondo è nel Pannello di controllo 1.13.0 (da aggiornare dall'AppStore)

## 1.8.0 — 2026-11-01

Prima versione di lilOS pubblicata nel repository ufficiale.

- Aggiornamenti di lilOS dall'AppStore: la versione nuova si mette accanto a quella in uso e parte al riavvio del kernel; se non parte, lilOS torna da solo alla precedente e lo dice agli amministratori; se parte, chiede se eliminare quella di prima
- Il kernel serve la pagina di lilOS (non serve più Vite per usarlo)
- Installazione da una release (`system/kernel/tools/install.js`), anche spostando una copia del repository con `--from`
- Le app possono dire con quali versioni di lilOS funzionano (campo `lilos` del manifesto)
- SDK: `systemReleases`; `pipeCatalog.js` non viene più scartato dalla build di produzione
