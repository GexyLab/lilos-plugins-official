# AppStore

Installa, aggiorna e rimuove app e moduli del kernel dai repository.

## Come si usa

- **Installati**: le app e i moduli che hai.
- **Aggiornamenti**: quello che ha una versione più nuova; *Aggiorna tutto* li aggiorna insieme.
- Le altre schede sono le **categorie** (Sistema, Produttività, Multimedia, Sviluppo, Kernel…), con quello che offrono tutti i repository.
- La casella in alto cerca nella scheda che stai guardando.
- Fai clic su una card per vederne i dettagli, i permessi e il README.
- **Opzioni**, in basso a destra, gestisce i repository e le preferenze dell'AppStore.
- **lilOS** stesso è in *Installati* e, quando il repository ufficiale ne ha una versione nuova, in *Aggiornamenti*. La nuova versione si mette accanto a quella in uso e parte al riavvio del kernel: se non parte, lilOS torna da solo alla versione di prima e lo dice agli amministratori; se parte, chiede se eliminare quella di prima. Nei dettagli ci sono il changelog e le versioni conservate sul disco, con *Usa questa versione* ed *Elimina*. Un lilOS che gira da una copia del suo repository (sviluppo) si aggiorna con git.

Installare, aggiornare e rimuovere è riservato agli amministratori. I moduli del kernel si vedono solo da amministratore.

> Un repository non ufficiale può contenere qualsiasi codice: l'AppStore lo segnala e chiede conferma prima di installare.
