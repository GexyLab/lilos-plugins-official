# Editor

Editor di testo e di codice.

## Cosa fa

- Evidenzia la sintassi dei linguaggi più comuni.
- Suggerisce mentre scrivi e controlla **JSON**, **CSS** e **HTML**, segnalando gli errori.
- Va a capo da solo: niente scorrimento orizzontale.
- Prepara le **anteprime** dei file di testo (punto d'ingresso `filePreview`): un foglio con le prime righe colorate, per le miniature del File Manager e della scrivania.
- Ha l'albero dei file della cartella aperta, per passare da un file all'altro.

Si apre facendo doppio clic su un file di testo, oppure dal menu Start.
Si può nascondere o rimuovere: lilOS funziona anche senza.

## Automazioni

Con **Automata** (lilOS 1.15.0 o successivo) l'Editor rende registrabile **Salva il file**: rifatto, salva la scheda di quel file senza chiedere niente. Scrivere non si registra (il Registratore lo mostra barrato). Non ci sono ancora «Trova e sostituisci» né «Salva con nome», quindi non c'è altro da registrare.
