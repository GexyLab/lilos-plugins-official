# FileCrypt

Cifra singoli file con una password.

## Cosa fa

- **Cifra un file al suo posto**: dal menu del file scegli **Cifra…**, scrivi la password due volte e il file resta dov'è, con lo stesso nome. Sull'icona compare un lucchetto.
- **Lo apre nella sua app**: con il doppio clic su un file cifrato si apre la finestra **Sblocca**. Dopo la password il file si apre nell'app di sempre (Editor, Photo…), e quando lo salvi torna cifrato da solo.
- **Lo blocca di nuovo**: con **Blocca** dal menu del file, dalla finestra di FileCrypt, dopo un tempo senza uso (15 minuti, si può cambiare), quando esci dall'account e quando fermi FileCrypt dalla barra delle applicazioni. Le finestre che mostrano il file si chiudono.
- **Toglie la cifratura**: con **Rimuovi cifratura…** dal menu del file, e la password, il file torna in chiaro.

Le copie di un file cifrato restano cifrate e si aprono con la stessa password.

## Algoritmi

- Contenuto: **AES-256-GCM** (predefinito), AES-128-GCM o ChaCha20-Poly1305. Ogni file ha una chiave sua, e ogni salvataggio usa un nonce nuovo.
- Password: **Argon2id** (predefinito, 64 MiB e 3 passaggi) oppure PBKDF2-SHA256 con 600.000 iterazioni.
- Il formato è `LILOS-ENC/1`: un'intestazione che descrive il file, protetta insieme al contenuto, poi il contenuto cifrato.

Tutto avviene nell'app: lilOS e il kernel non vedono mai la password né le chiavi.

## Da sapere

- **Se dimentichi la password il file è perso.** Nessuno lo può recuperare, nemmeno un amministratore.
- Si cifra solo il contenuto: nome, dimensione, date e tag restano visibili.
- Mentre un file è sbloccato lo leggono in chiaro lilOS e l'app con cui lo apri; le altre app isolate ricevono un errore. Un'app non isolata (una scelta dell'amministratore) può fare tutto quello che fa l'utente, quindi anche leggerlo.
- Se disinstalli FileCrypt i file restano cifrati e intatti: lilOS non li apre finché non la reinstalli.
- I backup del database possono contenere versioni precedenti di un file, salvate quando non era ancora cifrato.

Vuole una versione di lilOS con le pipe sugli eventi e i dati delle app sui file.
