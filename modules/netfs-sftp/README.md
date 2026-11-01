# netfs-sftp

Modulo del kernel per le connessioni **SFTP (SSH)** nella cartella Rete.

- Accesso con password o con una chiave privata (un file di lilOS, con la sua passphrase se ne ha una).
- Alla prima connessione lilOS mostra l'impronta della chiave del server e chiede di confermarla; se la chiave cambia la chiede di nuovo.
- I trasferimenti interrotti riprendono dal punto in cui si erano fermati.

Con questo modulo il protocollo compare in **Connetti a un server** (File Manager → sezione Rete → +). Ogni connessione diventa una cartella in `~/Rete`; i file si copiano trascinandoli tra la Home e la cartella, e il kernel li trasferisce anche a File Manager chiuso (finestra **Trasferimento dati**). Le password restano nel kernel, cifrate, e la pagina non le riceve mai.

Fornisce il servizio `netfs.sftp`. Dipendenza: `ssh2` 1.17.0.
