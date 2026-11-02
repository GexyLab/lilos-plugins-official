# netfs-gphotos

Modulo del kernel che porta **Google Foto** nella cartella Rete.

Dal 31 marzo 2025 Google non lascia più leggere tutta la libreria alle app esterne. Il modulo usa quello che resta:

- **Importa da Google Foto** (nella barra della connessione): si sceglie dove copiare (di serie `~/Immagini/Google Foto`), la pagina di Google si apre in una nuova scheda, si scelgono fino a 2000 foto e video e si preme Fine; lilOS copia ciò che è stato scelto in una cartella con la data e l'ora, con i trasferimenti del kernel. Le foto arrivano originali, con i loro dati (EXIF). La copia va avviata entro un'ora: poi gli indirizzi di Google scadono.
- Gli **album creati da lilOS** sono le cartelle della connessione: quello che si copia dentro un album va nella libreria dell'utente e nell'album. Una nuova cartella è un nuovo album; un album si rinomina.
- Google non permette alle app di **eliminare** né di **rinominare** le foto, né di eliminare gli album: dal menu una foto si **toglie dall'album** (resta nella libreria), e un album si elimina da photos.google.com.

## Impostazioni

Un amministratore inserisce in **Pannello di controllo → Google Foto** l'ID client e il segreto client di un progetto Google Cloud (può essere quello di Google Drive), con le API **Google Photos Picker API** e **Photos Library API** abilitate e gli ambiti `photospicker.mediaitems.readonly`, `photoslibrary.appendonly`, `photoslibrary.readonly.appcreateddata`, `photoslibrary.edit.appcreateddata`. L'accesso funziona come per Google Drive: nella finestra di Google con lilOS su https o su localhost, altrimenti incollando l'indirizzo.

Fornisce il servizio `netfs.gphotos`. Nessuna dipendenza. Richiede lilOS 1.13.0 o successivo.
