# Changelog di lilOS

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
