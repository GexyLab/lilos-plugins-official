# Changelog di lilOS

## 1.55.0 — 2026-11-11

Comprende anche le 1.53.0 e 1.54.0, mai pubblicate da sole.

- **Nuova funzionalità — collegamenti verso blocchi fuori vista (Logic Studio).** Quando un collegamento porta a un blocco che non si vede, sul bordo dello schema compare un'etichetta con il nome di quel blocco, dove il collegamento esce. I collegamenti di una porta che escono vicini hanno un'etichetta sola con tutti i nomi. Un clic sul nome porta il blocco al centro della vista e lo seleziona.
- **Nuova funzionalità — blocchi specchiati e collegamenti con Ctrl (Logic Studio).** Un blocco si può girare (ingressi a destra, uscite a sinistra). Con **Ctrl** premuto, un clic su una porta e poi su altre del lato opposto le collega tutte alla prima. Serve a Logic Studio IDE 1.19.0 o successivo.
- **Correzione bug — collegamento mentre lo trascini (Logic Studio).** Trascinando da un'uscita, il collegamento tratteggiato non si vedeva; ora segue il puntatore dal primo movimento.
- **Nuova funzionalità — i siti web si aprono in NetWave.** Nel programma lilOS per il computer, i collegamenti a siti web nelle finestre di lilOS e delle app si aprono in NetWave Browser. Restano fuori download, accessi a un servizio (Google, Microsoft…), indirizzi di lilOS e del computer e app isolate. Si spegne in NetWave → Opzioni → Generali.
- **Per gli sviluppatori.** SDK 0.39.0: `LogicCanvas.reveal(id)` e le etichette sul bordo; SDK 0.38.0: `LogicSchema.setMirror`, `LogicSchema.connectMany`, simbolo `mirror` in `icon()`.

## 1.52.0 — 2026-11-11

- **Nuova funzionalità — un blocco per ogni costante in Logic Studio.** Le costanti (π, e, c, h, G, unità astronomica…) non si scelgono più da un menu: ognuna ha il suo blocco, nelle tre categorie nuove **Costanti matematiche**, **Costanti fisiche** e **Costanti astronomiche**. Serve il pacchetto Costanti 1.1.0 o successivo; questa versione di lilOS dà il colore alle tre categorie.
- **Nuova funzionalità — un blocco per ogni Cast.** Al posto del Cast con il menu ci sono cinque blocchi: in numero, in testo, in sì/no, in testo JSON e da testo JSON (blocchi di base 1.6.0 o successivi).
- **Da sapere.** I blocchi vecchi (le tre «Costanti…» con il menu e «Cast (converti tipo)») funzionano ancora negli schemi salvati, ma non sono più nell'elenco dei blocchi: le loro Proprietà dicono cosa usare al loro posto.
- **Per gli sviluppatori.** SDK 0.37.0: colore delle categorie `constMath`, `constPhysics` e `constAstro` in `logic.css` (`--lc-const`). Nessuna API cambia.

## 1.51.1 — 2026-11-11

- **Correzione bug — la cornice dei gruppi di Logic Studio segue i blocchi.** Spostando un blocco di un gruppo aperto, la cornice si allungava solo in altezza: in larghezza restava quella della sua intestazione, e i blocchi finivano fuori. Ora si allarga e si stringe con i blocchi in tutte e due le direzioni. Per gli sviluppatori: SDK 0.36.1, correzione in `LogicCanvas`.

## 1.51.0 — 2026-11-11

- **Nuova funzionalità — Geometria piana, Analisi numerica e Hardware in Logic Studio.** Tre nuovi pacchetti di blocchi, che un amministratore installa dall'AppStore → Kernel: **Geometria piana** (rette, intersezioni, cerchi, poligoni, coniche, trasformazioni, figure in SVG), **Analisi numerica** (campionare una funzione, gradiente, massimi e minimi, successioni e serie, simulazione nel tempo, interpolazione, regressione, numeri complessi) e **Hardware** (porte seriali, USB, HID, webcam, audio, MIDI, informazioni di sistema, stampanti, GPIO e I²C su Linux). Le categorie nuove **Analisi numerica** e **Hardware** hanno la loro striscia colorata; **Geometria** ora raccoglie geometria piana e solida. Serve a Logic Studio IDE 1.16.0.
- **Sicurezza — il consenso delle app di Logic Studio conta anche l'hardware.** Un'app fatta con «Crea app» che usa blocchi dell'hardware chiede, la prima volta, il permesso di usare l'hardware del computer su cui gira lilOS (porte seriali, USB, webcam, audio…). In più, di serie solo gli amministratori possono usare l'hardware: gli altri utenti solo se un amministratore lo permette in Pannello di controllo → Logic Studio → Hardware.
- **Per gli sviluppatori — SDK 0.36.0.** Nuove categorie di blocchi `analysis` e `hardware` in `LogicCanvas` (`--lc-analysis`, `--lc-hardware`).

## 1.50.0 — 2026-11-11

- **Nuova funzionalità — i blocchi dei database in Logic Studio.** Nella nuova categoria **Database** (striscia ocra e icona del cilindro) ci sono i blocchi dei pacchetti **Database (SQL)**, **MongoDB**, **Redis**, **InfluxDB** ed **Elasticsearch**, che un amministratore installa dall'AppStore → Kernel. Serve a Logic Studio IDE 1.15.0.
- **Sicurezza — le password dei blocchi sono cifrate.** La password che scrivi nelle Proprietà di un blocco (per esempio quella di un database) viene cifrata per te e per questo lilOS: lo schema tiene solo il testo cifrato, e solo il kernel la apre quando il blocco si connette.
- **Sicurezza — il consenso delle app di Logic Studio conta anche i database.** Un'app fatta con «Crea app» che usa blocchi di database chiede, la prima volta, il permesso di fare richieste in rete (e di usare i tuoi file per SQLite).
- **Nuova funzionalità — programmi da riga di comando (da 1.49.0).** Un progetto di Logic Studio si lancia dal Terminale con `lilos logic run`, con argomenti e un codice di uscita (categoria di blocchi **Programma**).
- **Nuova funzionalità — testi e forme negli schemi (da 1.48.0).** Sul foglio di uno schema e nelle finestre dei progetti si scrivono testi e si disegnano forme, che si ridimensionano con il mouse.
- **Per gli sviluppatori — SDK 0.33.0 → 0.35.0.** `logic.seal(valore)` per le impostazioni `secret`, simbolo `database` e categoria `db` (0.35.0); `logic.start` con `args` e `kind: 'cli'`, evento `finished`, categoria `program` (0.34.0); disegni in `LogicCanvas` (`role: 'drawing'`, `editText`) (0.33.0).

## 1.47.0 — 2026-11-11

- **Nuova funzionalità — colori e simboli dei blocchi di matematica.** In Logic Studio i blocchi delle quattro nuove categorie **Geometria solida**, **Trigonometria**, **Funzioni** e **Integrali** (pacchetti che un amministratore installa dall'AppStore → Kernel) hanno la loro striscia colorata e le loro icone (cubo, triangolo, f(x), integrale). Serve a Logic Studio IDE 1.12.0.
- **Per gli sviluppatori — SDK 0.32.0.** Nuovi simboli `cube`, `sphere`, `triangle`, `function` e `integral` di `icon()`; nuove categorie di blocchi `geometry`, `trig`, `functions` e `integrals` in `LogicCanvas`.

## 1.46.0 — 2026-11-11

- **Nuova funzionalità — il colore e i simboli dei blocchi dei segnali.** In Logic Studio i blocchi della nuova categoria **Segnali** (pacchetto **Segnali**, che un amministratore installa dall'AppStore → Kernel) hanno la loro striscia rosa e le icone dell'onda e del filtro. Serve a Logic Studio IDE 1.11.0.
- **Nuova funzionalità — finestre di dialogo (da 1.45.0).** Una finestra può essere «di dialogo»: finché è aperta, le altre finestre della stessa app sono bloccate; un clic su di loro porta avanti la finestra di dialogo, che lampeggia. Le usano le finestre dei progetti di Logic Studio (IDE 1.10.0), che possono anche aprirsi estese o restare sempre in primo piano.
- **Per gli sviluppatori — SDK 0.30.0 e 0.31.0.** `Window` con `modal`, `setBlocked`, `blocked` e `flash()`, il `WindowManager` con i gruppi di finestre; `LogicWindow` con `state`, `modal` e `onTop`; nuovi simboli `wave` e `filter` di `icon()` e la categoria di blocchi `signal`.

## 1.44.1 — 2026-11-11

- **Miglioramento — un colore per i blocchi delle unità di misura.** In Logic Studio i blocchi della nuova categoria **Unità di misura** (pacchetto **Grandezze e unità**, che un amministratore installa dall'AppStore → Kernel) hanno la loro striscia arancione nello schema e nella scheda Blocchi. Serve a Logic Studio IDE 1.8.0.
- **Per gli sviluppatori — SDK 0.29.1.** Nuova categoria di blocchi `units` in `LogicCanvas` (`.cat-units`, `--lc-units`).

## 1.44.0 — 2026-11-11

- **Nuova funzionalità — i gruppi di blocchi in Logic Studio.** Con Logic Studio IDE 1.7.0 i blocchi di uno schema si raggruppano (Ctrl+G) in una cornice che si può comprimere in un solo blocco, con la porta **Run** per farli partire e le porte esposte verso l'esterno.
- **Miglioramento — gli impulsi tornano a «no».** Un impulso vale sì e subito dopo di nuovo no.
- **Miglioramento — l'Exception del blocco Throw si vede da subito.** È la sua unica uscita, quindi non parte più nascosta.

## 1.42.0 — 2026-11-11

- **Miglioramento — la porta «Exception» si vede bene.** In Logic Studio l'uscita degli errori di ogni blocco si chiama **Exception** in tutte le lingue ed è di un rosso acceso, anche quando non è collegata. Serve a Logic Studio IDE 1.6.0, che porta anche i nuovi blocchi per gestire le eccezioni.

## 1.41.0 — 2026-11-11

- **Nuova funzionalità — porte nascoste di serie in Logic Studio.** Un blocco può avere porte che servono di rado e che partono nascoste: si mostrano con l'occhio accanto alla porta nelle Proprietà. Serve a Logic Studio IDE 1.5.0, per i nuovi ingressi **invia** e **imposta** del blocco **Costante · Variabile**.

## 1.40.0 — 2026-11-11

- **Nuova funzionalità — la documentazione di Logic Studio.** Con Logic Studio IDE 1.4.0 ogni blocco e ogni componente ha la sua pagina, con porte, impostazioni, come funziona ed esempi, in italiano e in inglese. Si apre con il tasto destro → **Documentazione**, con **F1** o con il pulsante **?** nelle Proprietà.
- **Per gli sviluppatori — SDK 0.25.0.** Nuovo export `markdown(testo, { link })` (Markdown → nodi DOM, mai HTML; stili `.lilos-md`) e nuovi metodi `logic.docIndex(lang)` e `logic.doc(pack, page, lang)`. Un pacchetto di Logic Studio può dare la sua documentazione con `register({ docs })` (motore 1.1.0).

## 1.39.1 — 2026-11-11

- **Miglioramento — l'oggetto di un'area della UI si riconosce.** Negli schemi di Logic Studio il blocco che rappresenta un'area di una finestra ha come titolo «UI > nome dell'area», così si distingue subito dagli altri blocchi. L'etichetta salvata nel file non cambia.
- **Per gli sviluppatori — SDK 0.24.1.** `LogicCanvas` disegna il titolo dell'oggetto di un componente (ruolo `component`) con il prefisso «UI > ».

## 1.39.0 — 2026-11-11

- **Nuova funzionalità — porte nascoste nei blocchi di Logic Studio.** L'SDK 0.24.0 permette di nascondere le porte dei blocchi nel disegno degli schemi: le porte nascoste non compaiono, quelle collegate compaiono sempre. L'uscita Eccezione parte nascosta. Serve a Logic Studio IDE 1.2.1.
- **Per gli sviluppatori.** Nuovo export `portHidden`, nuovo metodo `LogicSchema.setPortHidden` (una porta collegata non si nasconde), `portsOf` dà anche `hidden`; `LogicCanvas` ridisegna un blocco quando cambiano i suoi collegamenti.

## 1.38.2 — 2026-11-11

- **Correzione — il tasto centrale dentro Logic Studio.** Trascinare con il tasto centrale (la rotella) dentro Logic Studio sposta solo la vista dello schema: non sposta più la scrivania, e con lei la finestra.
- **Per gli sviluppatori.** Un elemento con `data-pan="native"` (e quello che contiene) tiene il tasto centrale per sé: lì la scrivania non si sposta. La tela `LogicCanvas` dell'SDK (0.23.2) lo ha già.

## 1.38.1 — 2026-11-11

- **Nuova funzionalità — NetWave Browser.** Un browser dentro lilOS (dall'AppStore): schede in quante finestre vuoi, ogni finestra salvabile come sessione (`.nwsession`) con tutte le sue schede, cronologia delle pagine e delle sessioni, finestre private. Le pagine le mostra il programma lilOS, ognuna isolata in un processo e una sessione sua: non toccano mai lilOS né i tuoi file. In un browser normale NetWave avvisa e offre **Apri nel browser**. Serve il programma lilOS 0.5.1.
- **Miglioramento — collegamenti web nel browser di lilOS.** I collegamenti web della scrivania si aprono in NetWave quando è installato e il programma lo permette, altrimenti nel tuo browser.
- **Sicurezza — download delle pagine web letti a pezzi.** lilOS prende i file scaricati da NetWave un pezzo alla volta: un file grande non riempie più la memoria del programma.
- **Per gli sviluppatori — SDK 0.23.1.** `host.web` e `WebPage` (pagine web mostrate dal programma, solo per server di fiducia), `download.read` restituisce un `Blob`, eventi `popupsDropped` ed `expired`; il tipo di file `nwsession`. Decisione D89 nella documentazione.

## 1.37.0 — 2026-11-10

- **Nuova funzionalità — Logic Studio.** Blocchi logici collegati tra loro, come in OpenBack: i dati passano sui collegamenti e ogni blocco ci fa qualcosa. Con l'app **Logic Studio IDE** (dall'AppStore) si creano progetti di schemi e di finestre fatte di Componenti UI (pulsanti, interruttori, indicatori, tabelle, grafici…), si provano con i valori dal vivo e si attivano: un progetto attivo gira nel motore di lilOS anche a lilOS chiuso. I blocchi e le componenti arrivano con i moduli del kernel (motore `logicstudio-engine` e pacchetti `logicstudio-*`).
- **Nuova funzionalità — le finestre dei progetti le apre lilOS.** Il menu applicazioni ha la scheda **Progetti**, con i progetti attivi: un clic apre la loro finestra principale, senza Logic Studio. Le console dei progetti si aprono come sceglie il progetto (tutte, solo quando chiedono un dato, mai, o tutte in una), e quando una console chiede un dato senza finestre aperte arriva una notifica.
- **Nuova funzionalità — app fatte con Logic Studio, eseguite senza installarle.** «Crea app» in Logic Studio fa il pacchetto di un'app nella cartella App create: aprendo il suo file .lsapp lilOS la esegue, solo per te e finché le sue finestre restano aperte. Prima di eseguire un'app che usa i tuoi file, la rete, le notifiche o gli eventi, lilOS chiede il permesso.
- **Nuova funzionalità — Pannello di controllo → Logic Studio.** Quello che usano i tuoi programmi; per gli amministratori i limiti per tutti, le quote di ogni utente, i programmi in esecuzione e i pacchetti installati.
- **Per gli sviluppatori — SDK 0.22.0.** `logic` (il motore), il modello di schemi, finestre e progetti, `LogicCanvas`, `LogicUI`, le console e la libreria dei grafici `chart`. Dettagli nella documentazione (decisione D88).

## 1.36.0 — 2026-11-10

- **Nuova funzionalità — Ctrl + doppio clic apre una cartella in una finestra nuova.** Il doppio clic su una cartella della scrivania o di una workarea la apre ancora nella finestra del File Manager già aperta; con **Ctrl** premuto (⌘ sul Mac) si apre in una finestra tutta sua. Vale anche per Home, Documenti, Immagini, Download, il Cestino e i collegamenti a una cartella.
- **Miglioramento — citazioni solo nella tua lingua.** Le schermate di accesso e di blocco mostrano solo le citazioni tradotte nel pacchetto di lingua in uso: con un pacchetto più vecchio non compaiono più citazioni in inglese.
- **Miglioramento — lingue aggiornate da sole.** A ogni avvio lilOS aggiorna le lingue installate se il repository ufficiale ne ha una versione più nuova adatta: dopo un aggiornamento di lilOS i testi nuovi arrivano nella tua lingua senza passare dall'AppStore.

## 1.35.1 — 2026-11-07

- **Miglioramento — citazioni senza virgolette.** Nelle schermate di accesso e di blocco la citazione è in corsivo, con l'autore sotto.
- **Miglioramento — citazioni come si conoscono in ogni lingua.** In inglese le battute originali dei film; nelle altre lingue, dove trovate, le battute dei sottotitoli e le versioni che circolano in quella lingua, invece di una traduzione dall'italiano (aggiorna il pacchetto della tua lingua).

## 1.35.0 — 2026-11-07

Comprende anche la 1.34.0.

- **Nuova funzionalità — citazioni nelle schermate di accesso e di blocco.** Al posto dell'elenco a sinistra c'è una citazione da film e scienziati, con l'autore sotto: scelta a caso, ogni 2 minuti lascia il posto a un'altra con una dissolvenza.
- **Nuova funzionalità — lilOS senza interfaccia.** Con `"ui": false` in `config.json` (o `install.js --no-ui`) il kernel non serve la pagina di lilOS e lo si gestisce dalla riga di comando con il comando `lilos` (modulo `terminal-cli`). La licenza si accetta nella console all'avvio, oppure con `--accept-license`.
- **Correzione bug — installazione nuova.** `tools/install.js` si fermava leggendo il catalogo del repository ufficiale (dalla 1.32.0), quindi un'installazione nuova che prendeva i moduli da lì non andava a buon fine.

## 1.33.0 — 2026-11-05

- **Nuova funzionalità — file fino a 1 GB.** Il limite di 10 MB per file non c'è più: il kernel salva i file a flusso e il predefinito è 1 GB. Un amministratore lo cambia in Pannello di controllo → Archiviazione → Limiti (0 = senza limite).
- **Nuova funzionalità — quota di spazio per utente.** Una quota predefinita (0 = senza limite, come prima) e quote personali in Archiviazione → Utenti. Conta tutta la home, cestino compreso; oltre la quota si rifiuta solo ciò che fa crescere lo spazio. Al 90% arriva una notifica.
- **Nuova funzionalità — Il mio spazio e caricamenti a pezzi.** Ogni utente vede spazio usato, quota e dimensione massima di un file; i file grandi vanno al kernel a pezzi e un invio interrotto riparte da dove era arrivato.
- **Miglioramento — soglie configurabili.** Lettura in memoria, testo, pezzi nel database, copia nel browser e pezzi di caricamento sono impostazioni del kernel (anche in `lilos-install.json` → `kernel.settings`).
- **SDK 0.21.0.** Nuovo `kernelSettings`; per i moduli `ctx.settings` e `fs.usage()`; codice d'errore `quota` (507).

## 1.32.0 — 2026-11-04

- **Nuova funzionalità — lilOS in altre lingue.** I testi di lilOS (scrivania, barra, menu applicazioni, pagina utente, finestre di sistema, accesso) e i messaggi del kernel arrivano da un pacchetto di lingua: si installa da AppStore → Lingue (qualsiasi utente, vale per tutti) e si sceglie in Pannello di controllo → Lingua. 20 lingue disponibili; le app usano le proprie traduzioni.
- **Nuova funzionalità — arabo e urdu da destra a sinistra.** lilOS si specchia: barra, menu, finestre di sistema e frecce della tastiera seguono la lingua; le app restano nella direzione della loro lingua.
- **Da fare dopo l'aggiornamento — l'italiano è un pacchetto.** Senza pacchetto lilOS è in inglese: installa «Italiano» da AppStore → Lingue e sceglilo in Pannello di controllo → Lingua.
- **Miglioramento — messaggi del kernel nella tua lingua**, invece che sempre in italiano.

## 1.31.0 — 2026-11-04

- **Nuova funzionalità — widget sulla scrivania.** Un'app di sistema può mostrare sulla scrivania i file di un suo tipo con un proprio widget, al posto dell'icona: la prima è **Note adesive** (da installare dall'AppStore), i cui file `.sticky` diventano foglietti colorati da scrivere lì sopra. Si selezionano, si spostano, vanno nelle workarea e nel Cestino come le icone; «Riordina icone» li lascia dove sono; nella minimappa hanno il loro colore. Senza l'app, o scegliendo un'altra app per quel tipo di file, tornano icone.
- **Nuova funzionalità — Nuovo → Nota adesiva** nel tasto destro della scrivania, con Note adesive installata. Se avevi personalizzato quel menu, ripristinalo per vederla (Pannello di controllo → Usabilità → Menu contestuale).
- **Miglioramento — per gli sviluppatori.** SDK 0.19.0: `fs.everywhere`, `fs.bring`, `visible` nelle azioni dei menu, il glifo `note`; il manifesto accetta `contributes.widgets[].fileType` e il permesso `desktop.widget` ora ha effetto per le app di sistema.

## 1.30.0 — 2026-11-04

Comprende anche la 1.28.0 e la 1.29.0.

- **Nuova funzionalità — nuova schermata di accesso.** Accesso, licenza, avvio e messaggi prima di lilOS hanno due metà: a sinistra il pannello di lilOS con lo stato della connessione e la versione, a destra il modulo. È scura di default; il pulsante in alto a destra la fa chiara, e il browser se lo ricorda. Il blocco e la sessione scaduta mostrano l'ora e l'avatar, con solo la password.
- **Nuova funzionalità — «Resta connesso».** Spento, la sessione finisce quando si chiude il browser; acceso (come prima), dura finché non scade.
- **Miglioramento — password e tentativi.** L'occhio mostra la password, compare l'avviso del Bloc Maiusc, dopo troppi tentativi sbagliati il pulsante conta i secondi; «Password dimenticata?» spiega a chi chiedere.
- **Miglioramento — avvio.** Dopo l'accesso si vedono i passi fino al desktop. Se il kernel non risponde, lilOS riprova da solo (5, 10, poi ogni 30 secondi).
- **Nuova funzionalità — «Mostra sul desktop».** Con il tasto destro su un'app del menu applicazioni la rimetti sul desktop del workspace in cui sei, se l'avevi tolta.
- **Miglioramento — per gli sviluppatori.** SDK 0.18.0: `kernel.login(nome, password, { remember })` e `KernelError.retryAfter`. Una copia di sviluppo di lilOS può leggere app e moduli da un repository locale (`apps.devRepository`); per chi ha lilOS installato non cambia niente.

## 1.27.0 — 2026-11-03

Comprende anche la 1.25.0 e la 1.26.0.

- **Nuova funzionalità — la licenza di lilOS si accetta al primo avvio.** Dopo l'accesso un amministratore legge la licenza d'uso, letta dal repository ufficiale, e la accetta una volta per tutta l'installazione. Finché non l'ha fatto, gli altri utenti non entrano. Se il testo cambia si accetta di nuovo. Senza rete si usa la copia inclusa (EULA.md). Con "acceptLicense": true in lilos-install.json la accetta chi prepara l'installazione. **Dopo l'aggiornamento entra subito come amministratore.**
- **Nuova funzionalità — NetTest.** Una nuova app, dall'AppStore, per provare API e servizi di rete (HTTP, GraphQL, WebSocket, SSE, TCP, TLS, UDP, gRPC, MQTT). Le richieste le fa il kernel.
- **Sicurezza — i valori segreti di NetTest non lasciano il kernel.** Sono sigillati: pagina, script, cronologia e risposte li mostrano come ••••. Credenziali e corpo non seguono un reindirizzamento verso un altro server.
- **Nuova funzionalità — l'eccezione per la rete decisa dall'amministratore.** In Pannello di controllo → Rete l'amministratore può aprire al kernel questo computer, la rete locale o solo alcuni indirizzi.
- **Nuova funzionalità — Arresta.** Nella pagina utente, solo per gli amministratori: spegne lilOS per tutti, dopo una conferma.
- **Miglioramento — per gli sviluppatori.** SDK 0.17.0: calls, net.rules() e net.setRules(), kernelModules.shutdown(), host.quit().

## 1.24.0 — 2026-11-03

- Nuova funzionalità — impostazioni di installazione: un file lilos-install.json dice dove installare lilOS, quale versione (quella dell'installer o la più recente), quali moduli, repository, app e utenti, e le impostazioni iniziali di ogni utente.
- Nuova funzionalità — immagini del sistema: tools/image.js fa un'immagine di un lilOS installato e configurato (app, utenti, file); con "image" nel file di installazione si installa quella al posto della release ufficiale.
- Sicurezza: le password del file di installazione vengono cancellate al primo avvio; le sessioni non entrano mai in un'immagine.

## 1.23.0 — 2026-11-03

- **Nuova funzionalità — il programma lilOS.** lilOS gira anche nella sua finestra, senza browser, su Windows, macOS e Linux: si scarica da https://github.com/GexyLab/lilos/releases. Il programma può installare lilOS sul computer (kernel e PostgreSQL compresi), collegarsi a un server lilOS o al lilOS già installato. Da qui la pagina sa quando gira nel programma: numero di notifiche sull'icona, notifiche del sistema, link lilos://, scelta dei dispositivi (porte seriali, USB) fatta da lilOS
- **Nuova funzionalità — file trascinati dal computer.** I file e le cartelle trascinati dal computer sulla scrivania o in una cartella aperta vengono copiati in lilOS, anche nel browser
- **Nuova funzionalità — Rete › Questo computer.** Le nuove installazioni hanno il modulo netfs-local: le cartelle del computer su cui gira il kernel si collegano in Rete (gli amministratori qualsiasi cartella, gli altri utenti solo quelle permesse)
- **Miglioramento — per gli sviluppatori.** SDK 0.15.0: `host` (cosa offre il programma lilOS) e gli eventi `device.attach` / `device.detach` nei pipe. Il kernel controlla la password di un amministratore senza aprire una sessione (serve per uscire dalla modalità kiosk del programma)

## 1.22.0 — 2026-11-03

- **Sicurezza** (con più utenti): i moduli di Rete e del Terminale si collegano solo agli indirizzi che il kernel ha controllato, invece di risolvere di nuovo il nome del server da soli (*DNS rebinding*). Vale con i moduli aggiornati (repository ufficiale v1.51.0). Aggiorna subito lilOS e i moduli se più persone usano lo stesso lilOS
- **Un'app Microsoft e un progetto Google per tutto**: si impostano una volta nel Pannello di controllo 1.18.0 (**App Microsoft**, **Progetto Google**) e servono OneDrive, Azure Blob, Google Drive e Google Foto; il kernel fa l'accesso e rinnova i token. Le impostazioni che erano nei moduli vengono spostate da sole
- **Un server confermato vale per Rete e Terminale**: la chiave di un server SSH o un certificato si confermano una volta sola
- **Moduli che ne sostituiscono altri**: **ssh** prende il posto di term-ssh e netfs-sftp, **netfs-google** di netfs-gdrive e netfs-gphotos; installandoli il kernel sposta impostazioni, segreti e connessioni e toglie i vecchi. L'AppStore 1.10.0 li mostra negli aggiornamenti
- **Automata**: le partenze a un'ora e ogni pochi minuti sono operazioni della Pianificazione (anche a lilOS chiuso); Automata 1.2.0 sposta da sola quelle che ci sono. Un'automazione pianificata gira senza aprire finestre se non chiede niente
- La finestra Proprietà, le conferme di eliminazione e i nomi dei tipi di file seguono la lingua di lilOS; le dimensioni sono scritte allo stesso modo ovunque
- Correzioni: niente «false» in «Recenti e frequenti» del menu di avvio; i pulsanti nascosti dei dialoghi restano nascosti; le etichette lunghe dei pulsanti a segmenti finiscono con «…»
- Per gli sviluppatori: SDK 0.14.0 (`messageBox` con contenuto, pulsanti e campi, anche per le app isolate; `formatBytes`; `fs.usage`, `fs.tildePath`, `fs.cleanName`; `resizeHandle`; controlli più completi); per i moduli `ctx.lookup`, `ctx.paths`, `ctx.jsonStore`, `ctx.tokens` con `oauth`, `replaces` (decisione D70)

## 1.21.1 — 2026-11-02

- I comandi del Terminale pianificati «in lilOS» (e le operazioni «Servizio di un'app») possono durare fino al **Tempo massimo** dell'operazione: prima si fermavano sempre dopo 60 secondi. Servono il Terminale 1.7.0 e il modulo services-isolate 1.2.0; con il modulo vecchio l'errore dice di aggiornarlo
- **Annulla**, e il tempo massimo che scade, fermano davvero il comando, come Ctrl+C: prima la corsa risultava annullata ma il comando continuava a lavorare
- Nello Storico una corsa annullata o scaduta tiene quello che il comando aveva scritto fino a lì (modulo scheduler 1.0.1, incluso in lilOS)

## 1.21.0 — 2026-11-02

- **Dipendenze tra pacchetti**: un'app dichiara i moduli del kernel e le altre app di cui ha bisogno (obbligatori o facoltativi). Installandola o aggiornandola, l'AppStore 1.9.0 mostra cosa si installa insieme e chiede il consenso; il kernel installa tutto nell'ordine giusto e, se qualcosa fallisce, toglie quello che aveva appena installato. Dopo aver installato o rimosso moduli l'AppStore chiede se riavviare il kernel adesso o più tardi
- Un pacchetto che serve a un altro non si rimuove (il messaggio dice a chi serve); disinstallando un'app, l'AppStore propone di togliere anche quello che era stato installato solo per lei
- Un'app che aspetta un suo modulo (installato, attivo dopo il riavvio del kernel) non parte e spiega perché
- Per gli sviluppatori: SDK 0.13.0 con `packages`, campo `dependencies` nel manifesto delle app e in `module.json` (decisione D69)

## 1.20.2 — 2026-11-02

- Passando a un altro workspace non compare più la notifica «Workspace «nome»»: il cambio lo fai tu e il pulsante del workspace mostra già dove sei. Restano le notifiche quando elimini un workspace o arrivi al massimo di 20

## 1.20.1 — 2026-11-02

- I comandi dei moduli dalla riga di comando (`npm run kernel:cli -- users-basic add <nome> --admin`, `passwd`, `list`, `remove`) funzionano di nuovo: si fermavano subito con l'errore «The "path" argument must be of type string». lilOS in uso non cambia

## 1.20.0 — 2026-11-02

- **Tutti i workspace nella barra delle applicazioni**: accanto al logo, invece del solo workspace attuale, un pulsante per ogni workspace in fila (pallino e nome). Quello in cui sei è evidenziato, un clic su un altro ti ci porta, la freccia dopo l'ultimo (o il clic destro) apre il menu dei workspace. Si sceglie dal menu dei workspace (**Mostra tutti i workspace**) o dal Pannello di controllo 1.17.0 → Workspace → Tutti; di serie resta solo l'attuale

## 1.19.2 — 2026-11-02

- **Sicurezza** (con più utenti): le richieste web della Pianificazione controllano l'indirizzo nel momento in cui si collegano, anche dopo un reindirizzamento. Prima un nome di dominio poteva cambiare indirizzo tra il controllo e la connessione (*DNS rebinding*) e portare il kernel verso questo computer o la rete locale. Aggiorna subito se più persone usano lo stesso lilOS
- Un comando pianificato su un host SSH fermato da un segnale (per esempio `kill -9`) ora risulta **non riuscito** e dice il segnale, invece di sembrare riuscito. Serve anche il modulo **term-ssh 1.0.2** (AppStore → Kernel)

## 1.19.0 — 2026-11-02

- lilOS 1.19.0: la Pianificazione (operazioni a una data e ora o ripetute, nel kernel anche a lilOS chiuso); SDK 0.12.0
- Documentazione della Pianificazione riallineata (D68, lilOS 1.19.0, avvio da sola di Automata); si pianificano solo automazioni senza file
- Documentazione: la Pianificazione (guida, API, ricette), moduli obbligatori, lilos.home, services-isolate 1.1.0
- Pianificazione: correzioni della revisione di sicurezza
- Comando del Terminale pianificato: nella home con la shell del Terminale o su un host SSH salvato; lilos.home per i servizi; spostamenti del kernel nelle pagine aperte
- Modulo obbligatorio nel pacchetto di lilOS e nella configurazione; Pianificazione tra le app di base
- Pianificazione nella pagina: SDK schedule, esecutore del browser, lilos.schedule per le app
- Pianificazione nel kernel: modulo obbligatorio scheduler, regole, azioni e API

## 1.18.0 — 2026-11-02

- Nuova app **ArduinoIDE**, da installare dall'AppStore (Sviluppo): sketch per **Arduino Uno, Nano e Mega**. Editor con evidenziazione C++ e **suggerimenti mentre scrivi** (funzioni, metodi di `Serial`, parametri, definizioni), **Verifica** (Ctrl R) con la memoria usata, **Carica** (Ctrl U), **monitor seriale** (velocità, fine riga, ora davanti alle righe, salva in un file; si mette in pausa da solo durante il caricamento), **gestore librerie** (cerca, versioni, dipendenze, «Includi»), esempi, pannello **Problemi** che porta alla riga e propone la libreria che manca («Installa e riprova»). Gli sketch sono cartelle in `~/Arduino`, le tue librerie in `~/Arduino/libraries`
- La scheda è collegata **al computer da cui usi lilOS**, anche se lilOS gira su un server: il caricamento e il monitor passano dal browser (Chrome, Edge o Firefox 151+, con lilOS su https o localhost; non Safari). Il browser chiede una volta quale porta usare; le schede originali si riconoscono dall'USB, per i cloni (CH340, CP210x…) scegli la scheda e lilOS se la ricorda. Per i Nano clone c'è il processore «vecchio bootloader»
- Compilazione, librerie e suggerimenti li fa il nuovo **modulo del kernel `arduino`** (AppStore → Kernel, poi riavvio): la prima volta un amministratore lo **prepara** da ArduinoIDE (scarica arduino-cli, il server dei suggerimenti e il pacchetto delle schede AVR, circa 150 MB, controllati con la loro impronta). Su Windows conviene una cartella dei dati corta (impostazione del modulo)
- Per gli sviluppatori: SDK 0.11.0 con `serial` (porte seriali con Web Serial, aperte dalla pagina di lilOS) e `kernel.channel` / `kernel.module(nome)`; nelle app installate `lilos.serial` (permesso `serial`) e `lilos.kernel` (permesso `kernel:<modulo>`); i moduli del kernel hanno `ctx.socket` (WebSocket) e `ctx.dataDir`; simbolo `chip` (decisione D67)

## 1.17.0 — 2026-11-02

- Le automazioni di **Automata** (1.1.0) possono partire da sole: **a un'ora** (scegliendo i giorni, e se lilOS era chiuso a quell'ora anche al prossimo accesso), **ogni tot minuti**, **quando entri** o **quando arrivano file in una cartella** (creati, spostati o copiati lì, anche solo con certe estensioni). Si imposta in Automata → Avvio, «Quando parte da sola»
- Partono solo mentre lilOS è aperto, in una scheda sola anche con più schede aperte. Un'automazione che chiede qualcosa si apre nella finestra di Automata; le altre girano da sole e una notifica dice com'è andata
- La scorciatoia di un'automazione lavora su quello che hai selezionato nel **File Manager** (1.15.0), non solo sulla scrivania
- Quando un passo chiede un gruppo di file se ne possono scegliere più d'uno: file e cartelle, aggiunti e tolti uno per uno
- **Editor** 1.5.0: **Trova e sostituisci** (Ctrl F, Ctrl H: maiuscole, parola intera, espressioni regolari; «Sostituisci tutto» si annulla con un Ctrl Z) e **Salva con nome…** (Ctrl Maiusc S); un documento nuovo chiede dove salvarlo. Tutti e due si possono registrare in un'automazione

## 1.16.0 — 2026-11-02

- **Terminale 1.4.0** (dall'AppStore): la finestra si divide in **riquadri**, affiancati o uno sopra l'altro, quanti ne vuoi, ognuno con le sue schede. **Dividi a destra** e **Dividi in basso** sono nel menu della scheda; oppure si trascina una scheda sul bordo di un terminale. I separatori si trascinano, il doppio clic rende le misure uguali
- Il **menu della scheda** (tasto destro, Maiusc F10 o tasto Menu): Rinomina, Duplica, Dividi, Sposta nel riquadro, **Stacca in una nuova finestra**, **Sposta nella finestra**, Salva come collegamento, Aggiungi alla scrivania, Riconnetti, Copia indirizzo, Chiudi le altre / quelle a destra. Una scheda trascinata fuori dalla finestra diventa una finestra nuova; staccare o spostare non riavvia niente (comando in corso, sessione SSH)
- Le finestre staccate tornano con lilOS insieme ai loro riquadri; le sessioni remote ancora aperte si riagganciano
- **Invia l'input a tutti i riquadri**: quello che scrivi va alla scheda mostrata in ogni riquadro (per esempio lo stesso comando su più server)
- **Collegamenti `.term`**: un file che apre una shell o una sessione remota con un doppio clic, di serie in una finestra nuova (si cambia nelle Opzioni di Terminale). Si crea con **Salva come collegamento (.term)…** o **Aggiungi alla scrivania**. La password si può salvare nel file, **cifrata**: vale solo per chi l'ha salvata, su questo lilOS, per lo stesso server e utente. Senza password nel file si usa quella di un host salvato con lo stesso indirizzo. Un collegamento che esegue un comando chiede conferma la prima volta. Anteprima nel File Manager
- Scorciatoie nuove di Terminale (si cambiano nel Pannello di controllo → Scorciatoie): Alt Maiusc T, D, S, W, B, Alt Maiusc frecce e PagSu/PagGiù, Ctrl Alt Maiusc frecce per spostare la scheda
- Per gli sviluppatori: SDK 0.10.0 con `term.seal` e i campi `cwd`, `name`, `sealed` di `term.open` (anche `lilos.term` nelle app installate); `openWindow(win, key, { main, at })` apre un'altra finestra principale dell'app; tipo di file `term` (decisione D66)

## 1.15.0 — 2026-11-02

- Nuova app **Automata**, da installare dall'AppStore: registra quello che fai in lilOS e lo rifà quando vuoi, anche su altri file. Avvii la registrazione, lavori come sempre e ogni operazione diventa un **passo**; Ctrl Z toglie anche il passo annullato
- Si registrano le operazioni con un senso, non i clic: creare, rinominare, spostare (anche trascinando), copiare, cestinare, eliminare e ripristinare file e cartelle, i tag, aprire file e app, chiudere finestre, cambiare workspace e impostazioni, spostare o riordinare le icone della scrivania. E, nelle app, Photo (ridimensiona, ritaglia, salva, converti), File Manager (cartella, ricerca, ordine, vista), Terminale (una riga di comando), Zip (comprimi, estrai), FileCrypt (cifra, decifra, blocca) ed Editor (salva)
- Per ogni passo: eseguirlo o no, **chiedere conferma** prima, e per ogni campo usare il valore registrato, **chiederlo** al momento del passo o comporlo con un **modello** (`{nome}`, `{est}`, `{data}`, `{ora}`, `{n}`, `{cartella}`). Le password non si salvano mai: si chiedono sempre
- Un'automazione si avvia da Automata, dal menu dei file (sottomenu **Automazioni**, anche «Registra partendo da qui»), con una scorciatoia o dal Terminale (`automata list`, `automata run <nome> [file…] [--yes]`); su più file i passi si ripetono per ciascuno. Le automazioni sono file `.automata` nella cartella **Automazioni** della home
- Durante una registrazione la barra delle applicazioni mostra **REC** con il numero dei passi
- Per gli sviluppatori: l'SDK 0.9.0 ha `automation`, il manifesto `contributes.automation`, le app isolate `lilos.automation.record`; nuovo evento `desk.place`

## 1.14.0 — 2026-11-02

- Cinque nuovi protocolli in **Connetti a un server**, da installare dall'AppStore (scheda Kernel): **Google Drive** (netfs-gdrive), **Google Foto** (netfs-gphotos), **Amazon S3 e compatibili** (netfs-s3: AWS, Cloudflare R2, Backblaze B2, Wasabi, MinIO o un altro indirizzo), **Azure Blob Storage** (netfs-azblob) e **NFS** (netfs-nfs, NFSv3). Ogni connessione è una cartella in `~/Rete`, con i trasferimenti nel kernel come per gli altri protocolli. Le installazioni nuove non li hanno già: li installa un amministratore
- La lista dei protocolli è divisa in **Server**, **Cloud** e **Rete locale**
- **Google Drive**: il Mio Drive o un Drive condiviso, la cartella «Condivisi con me», l'eliminazione nel cestino di Drive e lo spazio usato. I documenti Google si aprono su Google in una nuova scheda; copiati fuori da Drive diventano .docx, .xlsx o .pptx (il formato lo sceglie l'amministratore). Due file con lo stesso nome si vedono come «Nome (2)»
- **Google Foto**: «Importa da Google Foto» apre la scelta di Google in una nuova scheda e copia le foto scelte in una cartella di lilOS (di serie `~/Immagini/Google Foto/<data ora>`). Nella cartella della connessione ci sono gli album creati da lilOS: Google non lascia vedere alle app il resto della libreria, né eliminare o rinominare le foto (si possono solo togliere da un album)
- Google Drive e Google Foto vogliono un progetto Google Cloud dell'amministratore (ID e segreto client nel Pannello di controllo, schede Google Drive e Google Foto; il segreto resta cifrato e non si rivede). Google accetta il ritorno dall'accesso solo su un indirizzo https con un dominio o su `localhost`: altrimenti si accede incollando in lilOS l'indirizzo della pagina finale (client Google di tipo «App desktop»)
- **Azure Blob Storage**: accesso con la chiave dell'account, un token SAS o l'account Microsoft (Entra). Sugli account con lo spazio dei nomi gerarchico (Data Lake Gen2) le cartelle sono vere e rinominare è immediato
- **NFS**: lilOS parla NFSv3 da solo, anche su Windows. UID e GID sul server li assegna l'amministratore a ogni utente (Pannello di controllo, scheda NFS): chi non li ha non si connette. Kerberos e NFSv4.1 arriveranno dopo
- OneDrive 1.1.0 mostra lo spazio usato
- Nel Terminale le sessioni remote (SSH, Telnet, rlogin, SUPDUP) sono schede del Terminale stesso; l'app Terminale remoto non è più nel catalogo. term-ssh 1.0.1: confermare la chiave di un server dopo più di 20 secondi fermava il kernel
- Per gli sviluppatori: SDK 0.8.0; nel contratto dei protocolli `group`, elementi `web`/`export`, `badge`, `can`, `removeLabel`, `space()`, l'importazione dalla pagina del fornitore, l'accesso incollando l'indirizzo e i campi segreti nelle impostazioni dei moduli (decisione D63)

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
