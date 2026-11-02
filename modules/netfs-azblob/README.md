# netfs-azblob

Modulo del kernel che porta i contenitori di **Azure Blob Storage** nella cartella Rete, anche quelli degli account con spazio dei nomi gerarchico (**Data Lake Storage Gen2**).

- In **Connetti a un server** compare **Azure Blob Storage**. Si scrive il nome dell'account di archiviazione e si sceglie come entrare:
  - **Chiave dell'account** (portale di Azure → l'account → Chiavi di accesso): apre tutto l'account;
  - **Token SAS**: apre quello che dice il token (con elenco, lettura, scrittura ed eliminazione per usarlo come cartella);
  - **Microsoft Entra**: l'accesso con l'account di lavoro o dell'istituto, nella pagina di Microsoft. L'utente deve avere un ruolo sui dati, per esempio **Collaboratore ai dati dei BLOB di archiviazione**; senza, l'errore lo dice.
- Il contenitore (con **Elenca** si sceglie tra quelli dell'account) diventa la cartella `~/Rete/<nome>`; facoltativamente, solo una sua cartella. Con **Indirizzo personalizzato** si usano Azurite, i cloud nazionali o un dominio proprio.
- Senza spazio dei nomi gerarchico le cartelle sono parti dei nomi dei blob; una cartella vuota è un blob vuoto con il metadato `hdi_isfolder=true` (come le fanno Data Lake e Hadoop), e rinominare copia sul server e poi elimina. Con lo spazio dei nomi gerarchico (il modulo lo riconosce da solo) le cartelle sono vere: crearle, rinominarle ed eliminarle è una sola richiesta all'endpoint `dfs`.
- I file grandi vanno a **blocchi** da 8 MB, ognuno ritentato da solo se non riesce. I download interrotti riprendono.
- I blob nel livello **Archivio** hanno l'etichetta **archiviato**: si leggono dopo averli riattivati dal portale.
- **Eliminare è definitivo**, salvo l'eliminazione temporanea attiva sull'account.

## Microsoft Entra

Serve solo per l'accesso con un account Microsoft. Un amministratore inserisce in **Pannello di controllo → Azure Blob Storage** l'ID dell'app registrata su Azure (può essere quella di OneDrive) e la directory (`organizations` per qualsiasi account di lavoro, oppure l'ID o il dominio della propria):

1. [portal.azure.com](https://portal.azure.com) → **Registrazioni app**.
2. **Autenticazione** → piattaforma **Applicazioni per dispositivi mobili e desktop**: l'indirizzo `<indirizzo di lilOS>/api/net/signin/callback` e, per l'accesso incollando l'indirizzo, `http://127.0.0.1:53682/`. **Consenti flussi client pubblici**: Sì.
3. **Autorizzazioni API** → **Azure Storage** → `user_impersonation` (delegata).
4. Sull'account di archiviazione: **Controllo di accesso (IAM)** → ruolo **Collaboratore ai dati dei BLOB di archiviazione** agli utenti.

Le richieste con la chiave sono firmate dal modulo (Shared Key): nessun SDK. Fornisce il servizio `netfs.azblob`. Nessuna dipendenza. Richiede lilOS 1.13.0 o successivo.
