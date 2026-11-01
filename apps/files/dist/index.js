import * as e from "/host/sdk.js";
import { UndoStack as t, Window as n, appIcon as r, fileType as i, fs as a, h as o, history as s, icon as c, openMenu as l, session as u, settings as d, shortcuts as f, storage as p, tags as m, toast as h, trackDrag as g } from "/host/sdk.js";
import * as _ from "/host/system.js";
import { DESK_NAME as v, SYSTEM_FOLDERS as y, addTarget as b, confirmRemove as x, describeWorkspace as S, dragItems as C, dropZone as w, getApp as T, handleCommand as E, itemIcon as D, launch as ee, linkEntry as te, links as O, markItem as ne, movableInto as k, moveInto as A, onWorkspacesChange as re, openFile as ie, pickFile as ae, recordCreated as oe, removeNodes as se, renameNode as ce, restoreNodes as le, setTag as ue, showProperties as de, tagDots as fe, tagSubmenu as pe } from "/host/system.js";
// src/shared/i18n.js
function me(t, n) {
	if (e.locale) return e.locale.forApp(t).i18n;
	let r = {
		...n.en.strings,
		...n.it?.strings
	}, i = (e, t) => !!e && Object.hasOwn(e, t), a = (e, t) => e.replace(/\{(\w+)\}/g, (e, n) => i(t, n) ? String(t[n]) : e), o = new Intl.PluralRules("it");
	return {
		t: (e, t) => {
			let n = i(r, e) ? r[e] : void 0;
			if (n === void 0) return String(e);
			if (typeof n == "string") return a(n, t);
			let s = Number(i(t, "n") ? t.n : 0);
			return a(s === 0 && n.zero ? n.zero : n[o.select(s)] ?? n.other, t);
		},
		lang: "it",
		date: (e, t) => new Intl.DateTimeFormat("it-IT", t).format(e instanceof Date ? e : new Date(e)),
		number: (e, t) => new Intl.NumberFormat("it-IT", t).format(e)
	};
}
var { t: j } = me("files", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"File Manager\",\"@description\":\"Browse, search and organize files and folders: tags, links, trash, info and preview.\",\"@commands.files.info.label\":\"Show or hide the info panel\",\"@commands.files.preview.label\":\"Show or hide the preview\",\"@commands.files.address.label\":\"Type a path\",\"@entrypoints.main.params.folder.label\":\"Folder\",\"@entrypoints.main.params.folder.description\":\"The folder it shows when it opens\",\"toolbar.back\":\"Back (Alt ←)\",\"toolbar.forward\":\"Forward (Alt →)\",\"toolbar.up\":\"Parent folder (Alt ↑)\",\"toolbar.path\":\"Path\",\"toolbar.address\":\"Path: type a folder and press Enter\",\"toolbar.search\":\"Search this folder\",\"toolbar.searchIn\":\"Search {name}\",\"view.list\":\"List view\",\"view.grid\":\"Icon view\",\"view.thumbs\":\"Preview view\",\"view.menu\":\"View\",\"list.label\":\"Folder contents\",\"list.more\":\"and {count} more\",\"rename.label\":\"New name\",\"create.folderName\":\"New folder\",\"create.fileName\":\"New file.txt\",\"panel.info.title\":\"Info\",\"panel.info.show\":\"Show the info panel\",\"panel.info.hide\":\"Hide the info panel\",\"panel.info.resize\":\"Info panel width\",\"panel.info.close\":\"Close the info panel\",\"panel.preview.title\":\"Preview\",\"panel.preview.show\":\"Show the preview\",\"panel.preview.hide\":\"Hide the preview\",\"panel.preview.resize\":\"Preview panel width\",\"panel.preview.close\":\"Close the preview panel\",\"place.home\":\"Home\",\"place.trash\":\"Trash\",\"place.tag\":\"Tag “{name}”\",\"side.label\":\"Places\",\"side.links\":\"Links\",\"side.tags\":\"Tags\",\"side.tagHidden\":\"{name}: invisible tag, its items are hidden elsewhere\",\"side.unlinkTitle\":\"Remove the link (the file stays)\",\"link.remove\":\"Remove the link to “{name}”\",\"column.name\":\"Name\",\"column.modified\":\"Modified\",\"column.deleted\":\"Deleted\",\"column.size\":\"Size\",\"column.type\":\"Type\",\"column.workspace\":\"Workspace\",\"column.origin\":\"Original location\",\"column.location\":\"Location\",\"column.resize\":\"Width of the “{name}” column\",\"column.resizeTitle\":\"Drag to resize, double-click to fit the content\",\"columns.menu\":\"Columns\",\"columns.fitAll\":\"Fit all columns to their content\",\"columns.reset\":\"Default columns\",\"tree.expand\":\"Show contents here\",\"tree.expandAll\":\"Show contents with all subfolders\",\"tree.collapse\":\"Hide contents\",\"tree.collapseAll\":\"Close all folders\",\"tree.expandTitle\":\"Show contents (Alt-click: with subfolders)\",\"tree.collapseTitle\":\"Hide contents\",\"tile.deleted\":\"Deleted: {date}\",\"tile.origin\":\"Original location: {place}\",\"tile.location\":\"Location: {place}\",\"tile.tags\":\"Tags: {names}\",\"trash.restoresTo\":\"Goes back to {place} when restored\",\"trash.keptForever\":\"Items stay until you delete them\",\"trash.keptDays\":{\"one\":\"Deleted permanently after {count} day\",\"other\":\"Deleted permanently after {count} days\"},\"type.folder\":\"Folder\",\"type.app\":\"App\",\"type.appLink\":\"Link to an app\",\"owner.unknown\":\"Unknown\",\"owner.shared\":\"Shared\",\"owner.removed\":\"{name} (deleted)\",\"owner.label\":\"Workspace: {name}\",\"count.items\":{\"zero\":\"Empty\",\"one\":\"{count} item\",\"other\":\"{count} items\"},\"empty.noMatch\":\"No items match “{query}”\",\"empty.trash\":\"The trash is empty\",\"empty.tag\":\"No items have this tag. Add it from the right-click menu → Tag.\",\"empty.folder\":\"This folder is empty\",\"status.items\":{\"one\":\"{count} item\",\"other\":\"{count} items\"},\"status.selected\":{\"one\":\"{count} selected\",\"other\":\"{count} selected\"},\"status.tag\":\"All items with this tag\",\"status.tagHidden\":\"Invisible tag: these items are hidden elsewhere\",\"message.hiddenByTag\":\"“{name}” is hidden by an invisible tag\",\"message.restoreToOpen\":\"To open it, restore it (right-click → Restore)\",\"message.systemFolders\":\"System folders can’t be deleted\",\"message.noPath\":\"“{path}” doesn’t exist\",\"message.typePath\":\"Type the path of a folder, such as {path}\",\"error.notFile\":\"Not a file\",\"error.rename\":\"Can’t rename “{name}”\",\"error.createFolder\":\"Can’t create the folder\",\"error.createFile\":\"Can’t create the file\",\"error.delete\":\"Can’t delete\",\"error.pathNotFound\":\"Path not found\",\"error.folderNotFound\":\"Folder not found\",\"error.folderNotFoundText\":\"The folder to open no longer exists: showing {place} instead.\",\"error.tagNotFound\":\"Tag not found\",\"error.tagNotFoundText\":\"The tag to show no longer exists: showing {place} instead.\",\"toast.restored\":\"Restored “{name}” to {place}\",\"toast.restoredMany\":\"Restored {count} items to {place}\",\"toast.restoredManyPlaces\":\"Restored {count} items to {folders} folders\",\"toast.unlinked\":\"Link to “{name}” removed\",\"toast.linksAdded\":{\"one\":\"Link added\",\"other\":\"{count} links added\"},\"toast.trashed\":{\"one\":\"Moved to the trash\",\"other\":\"{count} items moved to the trash\"},\"confirm.purge\":\"Delete “{name}” permanently\",\"confirm.purgeMany\":\"Delete {count} items permanently\",\"confirm.emptyTrash\":{\"one\":\"Delete the item in the trash permanently\",\"other\":\"Delete all {count} items in the trash permanently\"},\"confirm.cancel\":\"Cancel\",\"menu.open\":\"Open\",\"menu.openMany\":\"Open {count} items\",\"menu.openWith\":\"Open with…\",\"menu.openInEditor\":\"Open in Editor\",\"menu.reveal\":\"Show in folder\",\"menu.unlink\":\"Remove the link\",\"menu.rename\":\"Rename\",\"menu.untag\":\"Remove the tag “{name}”\",\"menu.info\":\"Info\",\"menu.properties\":\"Properties…\",\"menu.delete\":\"Delete\",\"menu.deleteMany\":\"Delete {count} items\",\"menu.restore\":\"Restore\",\"menu.restoreMany\":\"Restore {count} items\",\"menu.restoreAll\":\"Restore all\",\"menu.purge\":\"Delete permanently…\",\"menu.emptyTrash\":\"Empty the trash…\",\"menu.manageTags\":\"Manage tags…\",\"menu.newFolder\":\"New folder\",\"menu.newTextFile\":\"New text file\",\"info.folderHint\":\"Nothing selected: here is the open folder.\",\"info.general\":\"General\",\"info.organization\":\"Organization\",\"info.attributes\":\"Attributes\",\"info.text\":\"Text\",\"info.items\":\"Items\",\"info.type\":\"Type\",\"info.types\":\"Types\",\"info.app\":\"App\",\"info.appMissing\":\"{id} (not installed)\",\"info.size\":\"Size\",\"info.bytesDetail\":\"{size} ({count} bytes)\",\"info.contents\":\"Contents\",\"info.contentsTotal\":\"{items}, {total} in all\",\"info.insideFolders\":{\"one\":\"{count} item in the folders\",\"other\":\"{count} items in the folders\"},\"info.deleted\":\"Deleted\",\"info.lastDeleted\":\"Last deleted\",\"info.origin\":\"Original location\",\"info.path\":\"Path\",\"info.location\":\"Location\",\"info.manyFolders\":\"{count} different folders\",\"info.created\":\"Created\",\"info.modified\":\"Modified\",\"info.oldest\":\"Oldest\",\"info.newest\":\"Newest\",\"info.workspace\":\"Workspace\",\"info.tags\":\"Tags\",\"info.common\":\"In common\",\"info.none\":\"None\",\"info.tagHidden\":\"{name} (invisible tag)\",\"info.tagKind\":\"Tag\",\"info.retention\":\"Retention\",\"info.visibility\":\"Visibility\",\"info.visible\":\"Visible\",\"info.invisible\":\"Invisible: its items are hidden elsewhere\",\"info.lines\":\"Lines\",\"info.words\":\"Words\",\"info.chars\":\"Characters\",\"info.folders\":{\"one\":\"{count} folder\",\"other\":\"{count} folders\"},\"info.files\":{\"one\":\"{count} file\",\"other\":\"{count} files\"},\"info.apps\":{\"one\":\"{count} app\",\"other\":\"{count} apps\"},\"note.system\":\"System item: it can’t be renamed or deleted\",\"note.private\":\"Private: visible only in its workspace\",\"note.hidden\":\"Hidden by an invisible tag\",\"note.linked\":\"In the sidebar (Links)\",\"selection.count\":\"{count} items selected\",\"preview.none\":\"Nothing selected\",\"preview.selectFile\":\"Select a file to see its contents\",\"preview.oneAtATime\":\"The preview shows one item at a time\",\"preview.trashed\":\"In the trash\",\"preview.restoreToSee\":\"Restore it to see its contents\",\"preview.loading\":\"Loading…\",\"preview.readError\":\"Can’t read the file\",\"preview.open\":\"Open\",\"preview.launch\":\"Launch\",\"preview.emptyFile\":\"Empty file\",\"preview.emptyFolder\":\"Empty folder\",\"preview.imageAlt\":\"Preview of {name}\",\"preview.unavailable\":\"No preview available\",\"preview.notText\":\"The file doesn’t contain text\",\"preview.contentsOf\":\"Contents of {name}\",\"preview.cut\":\"Showing the first {shown} of {total} characters: open the file to see all of it\",\"preview.childTitle\":\"{name} — double-click to open\",\"preview.appMissing\":\"App not installed\",\"preview.byApp\":\"Preview made by {app}\",\"net.section\":\"Network\",\"net.add\":\"Connect to a server…\",\"net.none\":\"No connections\",\"net.state.on\":\"Connected\",\"net.state.connecting\":\"Connecting…\",\"net.state.off\":\"Not connected\",\"net.state.error\":\"Cannot connect\",\"net.menu.open\":\"Open\",\"net.menu.connect\":\"Connect\",\"net.menu.disconnect\":\"Disconnect\",\"net.menu.edit\":\"Edit connection…\",\"net.menu.remove\":\"Remove connection\",\"net.remove.title\":\"Remove the connection «{name}»?\",\"net.remove.text\":\"Its folder leaves Network and its saved password is deleted. The files on the server stay where they are.\",\"net.bar.on\":\"Connected to\",\"net.loading\":\"Reading the folder from the server…\",\"net.notRead\":\"The folder could not be read from the server\",\"net.error.title\":\"Network\",\"net.error.read\":\"Cannot read «{name}»\",\"net.preview.big\":\"Not shown: the file is on a server and is bigger than 1 MB\",\"net.trust.title\":\"Confirm the server of «{name}»\",\"net.trust.ssh\":\"This is the first time lilOS connects to this server, or its key changed. Key fingerprint:\\n{fingerprint}\\n\\nContinue only if it matches the server's.\",\"net.trust.tls\":\"The server's certificate is not valid (self-signed, expired or for another name). Certificate fingerprint:\\n{fingerprint}\\n\\nContinue only if you trust this server.\",\"net.trust.first\":\"Server to confirm.\",\"net.trust.key\":\"Key fingerprint:\",\"net.trust.cert\":\"The certificate is not valid. Its fingerprint:\",\"net.trust.check\":\"Confirm only if it matches the server's.\",\"net.trust.go\":\"Confirm and connect\",\"net.connect.title\":\"Connect to a server\",\"net.edit.title\":\"Connection «{name}»\",\"net.protocol\":\"Protocol\",\"net.name\":\"Folder name in Network\",\"net.name.hint\":\"It will be {path}\",\"net.remember\":\"Remember the password (kept encrypted by lilOS)\",\"net.auto\":\"Connect when I sign in\",\"net.test\":\"Try\",\"net.testing\":\"Trying…\",\"net.test.ok\":\"It works: the server answers and the folder can be read\",\"net.connecting\":\"Connecting…\",\"net.connect.go\":\"Connect\",\"net.save\":\"Save and connect\",\"net.cancel\":\"Cancel\",\"net.missing\":\"Missing: {fields}\",\"net.secret.unchanged\":\"unchanged\",\"net.file.browse\":\"Browse…\",\"net.file.none\":\"No file chosen\",\"net.file.chosen\":\"File chosen\",\"net.shares.list\":\"List…\",\"net.shares.none\":\"The server shares nothing you can see\",\"net.password.title\":\"Password for «{name}»\",\"net.password.text\":\"lilOS needs the password to connect to {address}.\",\"net.password.wrong\":\"The user or the password is not right\",\"net.trust.changed.title\":\"The server of «{name}» CHANGED its key\",\"net.trust.changed\":\"The key or certificate of this server is not the one you confirmed. Someone may be pretending to be the server: continue only if you know it was changed on purpose.\\n\\nBefore: {previous}\\nNow: {fingerprint}\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"File Manager\",\"@description\":\"Sfoglia, cerca e organizza file e cartelle: tag, collegamenti, cestino, informazioni e anteprima.\",\"@commands.files.info.label\":\"Mostra o nascondi le informazioni\",\"@commands.files.preview.label\":\"Mostra o nascondi l’anteprima\",\"@commands.files.address.label\":\"Scrivi un percorso\",\"@entrypoints.main.params.folder.label\":\"Cartella\",\"@entrypoints.main.params.folder.description\":\"La cartella che mostra all’apertura\",\"toolbar.back\":\"Indietro (Alt ←)\",\"toolbar.forward\":\"Avanti (Alt →)\",\"toolbar.up\":\"Cartella superiore (Alt ↑)\",\"toolbar.path\":\"Percorso\",\"toolbar.address\":\"Percorso: scrivi una cartella e premi Invio\",\"toolbar.search\":\"Cerca nella cartella\",\"toolbar.searchIn\":\"Cerca in {name}\",\"view.list\":\"Vista elenco\",\"view.grid\":\"Vista a icone\",\"view.thumbs\":\"Vista anteprime\",\"view.menu\":\"Vista\",\"list.label\":\"Contenuto della cartella\",\"list.more\":\"e altri {count}\",\"rename.label\":\"Nuovo nome\",\"create.folderName\":\"Nuova cartella\",\"create.fileName\":\"Nuovo file.txt\",\"panel.info.title\":\"Informazioni\",\"panel.info.show\":\"Mostra le informazioni\",\"panel.info.hide\":\"Nascondi le informazioni\",\"panel.info.resize\":\"Larghezza del pannello delle informazioni\",\"panel.info.close\":\"Chiudi il pannello delle informazioni\",\"panel.preview.title\":\"Anteprima\",\"panel.preview.show\":\"Mostra l’anteprima\",\"panel.preview.hide\":\"Nascondi l’anteprima\",\"panel.preview.resize\":\"Larghezza del pannello dell’anteprima\",\"panel.preview.close\":\"Chiudi il pannello dell’anteprima\",\"place.home\":\"Home\",\"place.trash\":\"Cestino\",\"place.tag\":\"Tag «{name}»\",\"side.label\":\"Risorse\",\"side.links\":\"Collegamenti\",\"side.tags\":\"Tag\",\"side.tagHidden\":\"{name}: tag invisibile, i suoi elementi sono nascosti altrove\",\"side.unlinkTitle\":\"Elimina il collegamento (il file resta)\",\"link.remove\":\"Elimina il collegamento a «{name}»\",\"column.name\":\"Nome\",\"column.modified\":\"Modificato\",\"column.deleted\":\"Eliminato\",\"column.size\":\"Dimensione\",\"column.type\":\"Tipo\",\"column.workspace\":\"Workspace\",\"column.origin\":\"Posizione originale\",\"column.location\":\"Posizione\",\"column.resize\":\"Larghezza della colonna «{name}»\",\"column.resizeTitle\":\"Trascina per ridimensionare, doppio clic per adattare al contenuto\",\"columns.menu\":\"Colonne\",\"columns.fitAll\":\"Adatta tutte le colonne al contenuto\",\"columns.reset\":\"Ripristina le colonne\",\"tree.expand\":\"Mostra il contenuto qui\",\"tree.expandAll\":\"Mostra il contenuto con tutte le sottocartelle\",\"tree.collapse\":\"Nascondi il contenuto\",\"tree.collapseAll\":\"Chiudi tutte le cartelle\",\"tree.expandTitle\":\"Mostra il contenuto (Alt+clic: anche le sottocartelle)\",\"tree.collapseTitle\":\"Nascondi il contenuto\",\"tile.deleted\":\"Eliminato: {date}\",\"tile.origin\":\"Posizione originale: {place}\",\"tile.location\":\"Posizione: {place}\",\"tile.tags\":\"Tag: {names}\",\"trash.restoresTo\":\"Ripristinando torna in {place}\",\"trash.keptForever\":\"Gli elementi restano finché non li elimini\",\"trash.keptDays\":{\"one\":\"Eliminati definitivamente dopo {count} giorno\",\"other\":\"Eliminati definitivamente dopo {count} giorni\"},\"type.folder\":\"Cartella\",\"type.app\":\"App\",\"type.appLink\":\"Collegamento a un’app\",\"owner.unknown\":\"Sconosciuto\",\"owner.shared\":\"Condiviso\",\"owner.removed\":\"{name} (eliminato)\",\"owner.label\":\"Workspace: {name}\",\"count.items\":{\"zero\":\"Vuota\",\"one\":\"{count} elemento\",\"other\":\"{count} elementi\"},\"empty.noMatch\":\"Nessun elemento corrisponde a «{query}»\",\"empty.trash\":\"Il cestino è vuoto\",\"empty.tag\":\"Nessun elemento ha questo tag. Si assegna dal menu del tasto destro → Tag.\",\"empty.folder\":\"Questa cartella è vuota\",\"status.items\":{\"one\":\"{count} elemento\",\"other\":\"{count} elementi\"},\"status.selected\":{\"one\":\"{count} selezionato\",\"other\":\"{count} selezionati\"},\"status.tag\":\"Tutti gli elementi con questo tag\",\"status.tagHidden\":\"Tag invisibile: questi elementi sono nascosti altrove\",\"message.hiddenByTag\":\"«{name}» è nascosto da un tag invisibile\",\"message.restoreToOpen\":\"Per aprirlo, ripristinalo (clic destro → Ripristina)\",\"message.systemFolders\":\"Le cartelle di sistema non si possono eliminare\",\"message.noPath\":\"«{path}» non esiste\",\"message.typePath\":\"Scrivi il percorso di una cartella, come {path}\",\"error.notFile\":\"Non è un file\",\"error.rename\":\"Impossibile rinominare «{name}»\",\"error.createFolder\":\"Impossibile creare la cartella\",\"error.createFile\":\"Impossibile creare il file\",\"error.delete\":\"Impossibile eliminare\",\"error.pathNotFound\":\"Percorso non trovato\",\"error.folderNotFound\":\"Cartella non trovata\",\"error.folderNotFoundText\":\"La cartella da aprire non esiste più: al suo posto c’è {place}.\",\"error.tagNotFound\":\"Tag non trovato\",\"error.tagNotFoundText\":\"Il tag da mostrare non esiste più: al suo posto c’è {place}.\",\"toast.restored\":\"Ripristinato «{name}» in {place}\",\"toast.restoredMany\":\"Ripristinati {count} elementi in {place}\",\"toast.restoredManyPlaces\":\"Ripristinati {count} elementi in {folders} cartelle\",\"toast.unlinked\":\"Collegamento a «{name}» eliminato\",\"toast.linksAdded\":{\"one\":\"Collegamento aggiunto\",\"other\":\"{count} collegamenti aggiunti\"},\"toast.trashed\":{\"one\":\"Spostato nel cestino\",\"other\":\"{count} elementi spostati nel cestino\"},\"confirm.purge\":\"Elimina definitivamente «{name}»\",\"confirm.purgeMany\":\"Elimina definitivamente {count} elementi\",\"confirm.emptyTrash\":{\"one\":\"Elimina definitivamente l’elemento nel cestino\",\"other\":\"Elimina definitivamente tutti i {count} elementi nel cestino\"},\"confirm.cancel\":\"Annulla\",\"menu.open\":\"Apri\",\"menu.openMany\":\"Apri {count} elementi\",\"menu.openWith\":\"Apri con…\",\"menu.openInEditor\":\"Apri nell’Editor\",\"menu.reveal\":\"Mostra nella cartella\",\"menu.unlink\":\"Elimina il collegamento\",\"menu.rename\":\"Rinomina\",\"menu.untag\":\"Togli il tag «{name}»\",\"menu.info\":\"Informazioni\",\"menu.properties\":\"Proprietà…\",\"menu.delete\":\"Elimina\",\"menu.deleteMany\":\"Elimina {count} elementi\",\"menu.restore\":\"Ripristina\",\"menu.restoreMany\":\"Ripristina {count} elementi\",\"menu.restoreAll\":\"Ripristina tutto\",\"menu.purge\":\"Elimina definitivamente…\",\"menu.emptyTrash\":\"Svuota il cestino…\",\"menu.manageTags\":\"Gestisci i tag…\",\"menu.newFolder\":\"Nuova cartella\",\"menu.newTextFile\":\"Nuovo file di testo\",\"info.folderHint\":\"Nessun elemento selezionato: ecco la cartella aperta.\",\"info.general\":\"Generali\",\"info.organization\":\"Organizzazione\",\"info.attributes\":\"Attributi\",\"info.text\":\"Testo\",\"info.items\":\"Elementi\",\"info.type\":\"Tipo\",\"info.types\":\"Tipi\",\"info.app\":\"App\",\"info.appMissing\":\"{id} (non installata)\",\"info.size\":\"Dimensione\",\"info.bytesDetail\":\"{size} ({count} byte)\",\"info.contents\":\"Contenuto\",\"info.contentsTotal\":\"{items}, {total} in tutto\",\"info.insideFolders\":{\"one\":\"{count} elemento nelle cartelle\",\"other\":\"{count} elementi nelle cartelle\"},\"info.deleted\":\"Eliminato\",\"info.lastDeleted\":\"Ultima eliminazione\",\"info.origin\":\"Posizione originale\",\"info.path\":\"Percorso\",\"info.location\":\"Posizione\",\"info.manyFolders\":\"{count} cartelle diverse\",\"info.created\":\"Creato\",\"info.modified\":\"Modificato\",\"info.oldest\":\"Meno recente\",\"info.newest\":\"Più recente\",\"info.workspace\":\"Workspace\",\"info.tags\":\"Tag\",\"info.common\":\"In comune\",\"info.none\":\"Nessuno\",\"info.tagHidden\":\"{name} (tag invisibile)\",\"info.tagKind\":\"Tag\",\"info.retention\":\"Conservazione\",\"info.visibility\":\"Visibilità\",\"info.visible\":\"Visibile\",\"info.invisible\":\"Invisibile: i suoi elementi sono nascosti altrove\",\"info.lines\":\"Righe\",\"info.words\":\"Parole\",\"info.chars\":\"Caratteri\",\"info.folders\":{\"one\":\"{count} cartella\",\"other\":\"{count} cartelle\"},\"info.files\":{\"one\":\"{count} file\",\"other\":\"{count} file\"},\"info.apps\":{\"one\":\"{count} app\",\"other\":\"{count} app\"},\"note.system\":\"Di sistema: non si rinomina e non si elimina\",\"note.private\":\"Privata: si vede solo nel suo workspace\",\"note.hidden\":\"Nascosto da un tag invisibile\",\"note.linked\":\"Nella barra laterale (Collegamenti)\",\"selection.count\":\"{count} elementi selezionati\",\"preview.none\":\"Nessun elemento selezionato\",\"preview.selectFile\":\"Seleziona un file per vederne il contenuto\",\"preview.oneAtATime\":\"L’anteprima mostra un elemento alla volta\",\"preview.trashed\":\"Nel cestino\",\"preview.restoreToSee\":\"Ripristinalo per vederne il contenuto\",\"preview.loading\":\"Caricamento…\",\"preview.readError\":\"Impossibile leggere il file\",\"preview.open\":\"Apri\",\"preview.launch\":\"Avvia\",\"preview.emptyFile\":\"File vuoto\",\"preview.emptyFolder\":\"Cartella vuota\",\"preview.imageAlt\":\"Anteprima di {name}\",\"preview.unavailable\":\"Anteprima non disponibile\",\"preview.notText\":\"Il file non contiene testo\",\"preview.contentsOf\":\"Contenuto di {name}\",\"preview.cut\":\"Mostrati i primi {shown} caratteri su {total}: apri il file per vederlo tutto\",\"preview.childTitle\":\"{name} — doppio clic per aprire\",\"preview.appMissing\":\"App non installata\",\"preview.byApp\":\"Anteprima creata da {app}\",\"net.section\":\"Rete\",\"net.add\":\"Connetti a un server…\",\"net.none\":\"Nessuna connessione\",\"net.state.on\":\"Connessa\",\"net.state.connecting\":\"Connessione in corso…\",\"net.state.off\":\"Non connessa\",\"net.state.error\":\"Non si connette\",\"net.menu.open\":\"Apri\",\"net.menu.connect\":\"Connetti\",\"net.menu.disconnect\":\"Disconnetti\",\"net.menu.edit\":\"Modifica connessione…\",\"net.menu.remove\":\"Rimuovi connessione\",\"net.remove.title\":\"Rimuovere la connessione «{name}»?\",\"net.remove.text\":\"La sua cartella esce da Rete e la password salvata viene cancellata. I file sul server restano dove sono.\",\"net.bar.on\":\"Connesso a\",\"net.loading\":\"Lettura della cartella dal server…\",\"net.notRead\":\"Non è stato possibile leggere la cartella dal server\",\"net.error.title\":\"Rete\",\"net.error.read\":\"Non si legge «{name}»\",\"net.preview.big\":\"Non mostrato: il file è su un server ed è più grande di 1 MB\",\"net.trust.title\":\"Conferma il server di «{name}»\",\"net.trust.ssh\":\"È la prima volta che lilOS si collega a questo server, oppure la sua chiave è cambiata. Impronta della chiave:\\n{fingerprint}\\n\\nContinua solo se corrisponde a quella del server.\",\"net.trust.tls\":\"Il certificato del server non è valido (fatto da sé, scaduto o per un altro nome). Impronta del certificato:\\n{fingerprint}\\n\\nContinua solo se ti fidi di questo server.\",\"net.trust.first\":\"Server da confermare.\",\"net.trust.key\":\"Impronta della chiave:\",\"net.trust.cert\":\"Il certificato non è valido. La sua impronta:\",\"net.trust.check\":\"Conferma solo se corrisponde a quella del server.\",\"net.trust.go\":\"Conferma e connetti\",\"net.connect.title\":\"Connetti a un server\",\"net.edit.title\":\"Connessione «{name}»\",\"net.protocol\":\"Protocollo\",\"net.name\":\"Nome della cartella in Rete\",\"net.name.hint\":\"Sarà {path}\",\"net.remember\":\"Ricorda la password (lilOS la tiene cifrata)\",\"net.auto\":\"Connetti all’accesso\",\"net.test\":\"Prova\",\"net.testing\":\"Prova in corso…\",\"net.test.ok\":\"Funziona: il server risponde e la cartella si legge\",\"net.connecting\":\"Connessione in corso…\",\"net.connect.go\":\"Connetti\",\"net.save\":\"Salva e connetti\",\"net.cancel\":\"Annulla\",\"net.missing\":\"Mancano: {fields}\",\"net.secret.unchanged\":\"invariata\",\"net.file.browse\":\"Sfoglia…\",\"net.file.none\":\"Nessun file scelto\",\"net.file.chosen\":\"File scelto\",\"net.shares.list\":\"Elenca…\",\"net.shares.none\":\"Il server non condivide niente che tu possa vedere\",\"net.password.title\":\"Password di «{name}»\",\"net.password.text\":\"lilOS ha bisogno della password per connettersi a {address}.\",\"net.password.wrong\":\"Utente o password non giusti\",\"net.trust.changed.title\":\"Il server di «{name}» ha CAMBIATO chiave\",\"net.trust.changed\":\"La chiave o il certificato di questo server non è quello che avevi confermato. Qualcuno potrebbe fingersi il server: continua solo se sai che è stato cambiato apposta.\\n\\nPrima: {previous}\\nOra: {fingerprint}\"}}")
}), M = (e) => e.toLocaleString(u.locale), N = (e) => e.type === "folder" ? j("type.folder") : e.type === "app" ? j("type.app") : i(e.name).label, P = (e) => e.id === a.root ? j("place.home") : e.name, F = (e) => e.parent === a.root ? j("place.home") : a.path(e.parent);
function I(e) {
	let t = e.trashed.from;
	return a.exists(t) && t !== a.root ? a.path(t) : j("place.home");
}
function L(e) {
	let t = S(e.workspace);
	return t ? t.removed ? j("owner.removed", { name: t.name }) : t.name : e.workspace ? j("owner.unknown") : j("owner.shared");
}
function he(e) {
	let t = S(e.workspace), n = o("span", {
		class: "ws-owner-dot",
		"aria-hidden": "true"
	});
	return t && (n.style.background = t.color), o("span", {
		class: [
			"ws-owner",
			!t && "shared",
			t?.removed && "removed"
		].filter(Boolean).join(" "),
		title: j("owner.label", { name: L(e) })
	}, n, o("span", {}, L(e)));
}
function R(e) {
	if (e < 1024) return `${e} B`;
	let t = [
		"KB",
		"MB",
		"GB"
	], n = e, r = -1;
	do
		n /= 1024, r++;
	while (n >= 1024 && r < t.length - 1);
	return `${n.toLocaleString(u.locale, { maximumFractionDigits: 1 })} ${t[r]}`;
}
var z = (e) => j("count.items", {
	n: e,
	count: M(e)
});
function ge(e) {
	return e.type === "folder" ? z(e.trashed ? e.inside : a.children(e.id).length) : e.type === "file" ? R(e.size ?? 0) : "—";
}
function _e() {
	let e = d.get("trashRetention");
	return e <= 0 ? j("trash.keptForever") : j("trash.keptDays", {
		n: e,
		count: M(e)
	});
}
var B = (e) => new Date(e).toLocaleString(u.locale, {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit"
}), V = "files-panels", H = 720, ve = class {
	open;
	width;
	constructor({ key: e, title: t, resizeLabel: n, closeLabel: r, width: i, open: a = !1, room: s, onLayout: l, signal: u }) {
		this.key = e, this.defaultWidth = i, this.room = s, this.onLayout = l;
		let d = p.get(V, {})?.[e];
		this.open = typeof d?.open == "boolean" ? d.open : a, this.width = Number.isFinite(d?.width) ? ye(d.width, 180, H) : i, this.split = o("div", {
			class: "fm-split",
			role: "separator",
			tabindex: "0",
			"aria-orientation": "vertical",
			"aria-label": n,
			"aria-valuemin": 180
		}), this.body = o("div", { class: "fm-panel-body" }), this.el = o("aside", {
			class: `fm-panel fm-panel-${e}`,
			"aria-label": t,
			hidden: !this.open
		}, this.split, o("div", { class: "fm-panel-head" }, o("span", { class: "fm-panel-title" }, t), o("button", {
			class: "fm-btn",
			type: "button",
			title: r,
			"aria-label": r,
			onclick: () => this.setOpen(!1)
		}, c("x"))), this.body), this.#e(u);
	}
	setOpen(e) {
		this.open !== !!e && (this.open = !!e, this.el.hidden = !this.open, this.#t(), this.onLayout());
	}
	toggle() {
		this.setOpen(!this.open);
	}
	get shown() {
		return this.open ? this.el.offsetWidth : 0;
	}
	show(e) {
		this.el.style.width = `${e}px`, this.split.setAttribute("aria-valuenow", e), this.split.setAttribute("aria-valuemax", Math.max(180, Math.min(H, this.room())));
	}
	resize(e, t = !0) {
		this.width = Math.round(ye(e, 180, Math.max(180, Math.min(H, this.room())))), t && this.#t(), this.onLayout();
	}
	#e(e) {
		this.split.addEventListener("pointerdown", (e) => {
			if (e.button !== 0) return;
			e.preventDefault();
			let t = this.el.offsetWidth;
			this.el.classList.add("resizing"), g(e, {
				threshold: 0,
				onMove: (e) => this.resize(t - e, !1),
				onEnd: () => {
					this.el.classList.remove("resizing"), this.#t();
				}
			});
		}, { signal: e }), this.split.addEventListener("dblclick", () => this.resize(this.defaultWidth), { signal: e }), this.split.addEventListener("keydown", (e) => {
			let t = e.shiftKey ? 48 : 16, n = this.el.offsetWidth, r = {
				ArrowLeft: n + t,
				ArrowRight: n - t,
				Home: 180,
				End: Infinity
			}[e.key];
			r !== void 0 && (e.preventDefault(), this.resize(r));
		}, { signal: e });
	}
	#t() {
		let e = p.get(V, {});
		p.set(V, {
			...e && typeof e == "object" ? e : {},
			[this.key]: {
				open: this.open,
				width: this.width
			}
		});
	}
}, ye = (e, t, n) => Math.max(t, Math.min(e, n)), be = 1e5, xe = 5 << 20, Se = 30, Ce = 200, U = (e) => e < 1024 ? R(e) : j("info.bytesDetail", {
	size: R(e),
	count: M(e)
});
function we(e) {
	let t = 0;
	for (let n of a.children(e)) t += n.type === "folder" ? we(n.id) : n.size ?? 0;
	return t;
}
var Te = (e) => e.trashed ? e.bytes ?? 0 : e.type === "folder" ? we(e.id) : e.size ?? 0, Ee = (e) => e?.type === "file" && !e.trashed, De = (e) => `${e.id}:${e.modified}:${e.size ?? 0}`;
function Oe(e) {
	let t = e.map((e) => m.get(e)).filter(Boolean);
	return t.length ? o("span", { class: "fm-chips" }, t.map((e) => o("span", {
		class: "fm-chip",
		title: e.visible ? e.name : j("info.tagHidden", { name: e.name })
	}, o("span", {
		class: "tag-dot",
		style: { background: e.color },
		"aria-hidden": "true"
	}), e.name))) : j("info.none");
}
var W = (e) => o("dl", { class: "fm-facts" }, e.filter(Boolean).flatMap(([e, t, n]) => [o("dt", {}, e), o("dd", { class: n }, t)])), G = (e, ...t) => o("section", { class: "fm-info-section" }, o("h6", {}, e), ...t);
function K(e, t, n) {
	return o("div", { class: "fm-info-head" }, o("span", { class: "fm-info-icon" }, e), o("div", { class: "fm-info-titles" }, o("div", {
		class: "fm-info-name",
		title: t
	}, t), n && o("div", { class: "fm-info-kind" }, n)));
}
function ke({ nodes: e, place: t, text: n }) {
	return e.length > 1 ? je(e) : e.length === 1 ? Ae(e[0], n) : t.trash ? Me() : t.tag ? Ne(t.tag) : o("div", {}, o("p", { class: "fm-info-hint" }, j("info.folderHint")), Ae(t.node, n));
}
function Ae(e, t) {
	let { ext: n } = i(e.name), r = e.type === "app" ? T(e.app) : null, s = [[j("info.type"), e.type === "file" && n ? `${N(e)} (.${n})` : e.type === "app" ? j("type.appLink") : N(e)], e.type === "app" && [j("info.app"), r ? r.name : j("info.appMissing", { id: e.app })]];
	if (e.type === "file" && s.push([j("info.size"), U(e.size ?? 0)]), e.type === "folder") {
		let t = e.trashed ? null : a.children(e.id).length, n = e.trashed ? e.inside : a.count(e.id);
		s.push([j("info.contents"), t === null || n === t ? z(n) : j("info.contentsTotal", {
			items: z(t),
			total: M(n)
		})]), s.push([j("info.size"), U(Te(e))]);
	}
	e.trashed ? s.push([j("info.deleted"), B(e.trashed.at)], [
		j("info.origin"),
		I(e),
		"mono"
	]) : s.push([
		j("info.path"),
		a.path(e.id),
		"mono"
	]), s.push([j("info.created"), B(e.created)], [j("info.modified"), B(e.modified)]);
	let c = [
		e.system && j("note.system"),
		e.private && j("note.private"),
		!e.trashed && a.isHidden(e.id) && j("note.hidden"),
		!e.trashed && O.has(e.id) && j("note.linked")
	].filter(Boolean), l = o("div", {}, K(D(e), P(e), N(e)), G(j("info.general"), W(s)), G(j("info.organization"), W([[j("info.workspace"), he(e)], [j("info.tags"), Oe(e.tags ?? [])]])), c.length ? G(j("info.attributes"), o("ul", { class: "fm-notes" }, c.map((e) => o("li", {}, e)))) : null);
	if (Ee(e) && (e.size ?? 0) <= xe) {
		let n = o("dd", {}, "…"), r = o("dd", {}, "…"), i = o("dd", {}, "…");
		l.append(G(j("info.text"), o("dl", { class: "fm-facts" }, o("dt", {}, j("info.lines")), n, o("dt", {}, j("info.words")), r, o("dt", {}, j("info.chars")), i))), t(e).then((e) => {
			n.textContent = M(e ? e.split("\n").length : 0), r.textContent = M(e.trim() ? e.trim().split(/\s+/).length : 0), i.textContent = M([...e].length);
		}, () => {
			n.textContent = r.textContent = i.textContent = "—";
		});
	}
	return l;
}
function je(e) {
	let t = (t) => e.filter((e) => e.type === t).length, n = t("folder"), r = t("file"), i = t("app"), s = [
		n && j("info.folders", {
			n,
			count: M(n)
		}),
		r && j("info.files", {
			n: r,
			count: M(r)
		}),
		i && j("info.apps", {
			n: i,
			count: M(i)
		})
	].filter(Boolean).join(", "), c = e.reduce((e, t) => e + (t.type === "folder" ? t.trashed ? t.inside : a.count(t.id) : 0), 0), l = /* @__PURE__ */ new Map();
	for (let t of e) l.set(N(t), (l.get(N(t)) ?? 0) + 1);
	let u = new Set(e.map((e) => e.parent)), d = e.map((e) => e.modified), f = [...new Set(e.map(L))], p = [...new Set(e.flatMap((e) => e.tags ?? []))], m = p.filter((t) => e.every((e) => e.tags?.includes(t))), h = e.every((e) => e.trashed), g = o("span", { class: "fm-info-stack" }, e.slice(0, 3).map((e) => o("span", {}, D(e))));
	return o("div", {}, K(g, j("selection.count", { count: M(e.length) }), s), G(j("info.general"), W([
		[j("info.size"), U(e.reduce((e, t) => e + Te(t), 0))],
		c > 0 && [j("info.contents"), j("info.insideFolders", {
			n: c,
			count: M(c)
		})],
		[j("info.types"), [...l].sort((e, t) => t[1] - e[1]).map(([e, t]) => `${e} ${M(t)}`).join(" · ")],
		!h && [
			j("info.location"),
			u.size === 1 ? F(e[0]) : j("info.manyFolders", { count: M(u.size) }),
			u.size === 1 ? "mono" : null
		],
		[j("info.oldest"), B(Math.min(...d))],
		[j("info.newest"), B(Math.max(...d))]
	])), G(j("info.organization"), W([
		[j("info.workspace"), f.join(", ")],
		[j("info.tags"), Oe(p)],
		p.length > 0 && [j("info.common"), Oe(m)]
	])), G(j("info.items"), o("ul", { class: "fm-names" }, e.slice(0, Se).map((e) => o("li", { title: e.name }, o("span", { class: "fm-icon" }, D(e)), o("span", {}, e.name))), e.length > Se ? o("li", { class: "more" }, j("list.more", { count: M(e.length - Se) })) : null)));
}
function Me() {
	let e = a.trashed(), t = e.reduce((e, t) => e + 1 + t.inside, 0);
	return o("div", {}, K(o("span", { class: "fm-info-glyph" }, c("trash")), j("place.trash"), z(e.length)), G(j("info.general"), W([
		[j("info.contents"), e.length ? j("info.contentsTotal", {
			items: z(e.length),
			total: M(t)
		}) : z(0)],
		[j("info.size"), U(e.reduce((e, t) => e + (t.bytes ?? 0), 0))],
		e.length > 0 && [j("info.lastDeleted"), B(e[0].trashed.at)],
		[j("info.retention"), _e()]
	])));
}
function Ne(e) {
	let t = a.tagged(e.id);
	return o("div", {}, K(o("span", {
		class: "tag-dot fm-info-tag",
		style: { background: e.color },
		"aria-hidden": "true"
	}), e.name, j("info.tagKind")), G(j("info.general"), W([
		[j("info.items"), z(t.length)],
		[j("info.size"), U(t.reduce((e, t) => e + Te(t), 0))],
		[j("info.visibility"), e.visible ? j("info.visible") : j("info.invisible")]
	])));
}
var Pe = class {
	#e = null;
	#t = null;
	constructor(e, { text: t, open: n }) {
		this.body = e, this.text = t, this.open = n;
	}
	update(e) {
		let t = e.length === 1 ? e[0] : null, n = t ? `${De(t)}:${t.name}:${t.type === "folder" && !t.trashed ? a.children(t.id).map((e) => e.id + e.name).join() : ""}` : `${e.length}`;
		if (n === this.#e) return;
		if (this.#e = n, this.#u(), !t) return this.#l(e.length ? q("list", j("selection.count", { count: M(e.length) }), j("preview.oneAtATime")) : q("file", j("preview.none"), j("preview.selectFile")));
		if (t.trashed) return this.#l(this.#n(t), q("trash", j("preview.trashed"), j("preview.restoreToSee")));
		if (t.type === "folder") return this.#l(this.#n(t), this.#s(t));
		if (t.type === "app") return this.#l(this.#n(t), this.#c(t));
		let r = o("div", { class: "fm-preview-wait" }, j("preview.loading"));
		this.#l(this.#n(t), r);
		let i = (e) => {
			this.#e === n && r.replaceWith(e());
		};
		this.#a(t).then((e) => {
			if (this.#e === n) return e ? i(() => this.#o(t, e)) : this.text(t).then((e) => i(() => this.#r(t, e)));
		}).catch((e) => i(() => q("x", j("preview.readError"), e?.message ?? "")));
	}
	destroy() {
		this.#u();
	}
	#n(e) {
		let t = e.trashed ? null : e.type === "app" ? j("preview.launch") : j("preview.open");
		return o("div", { class: "fm-preview-head" }, o("span", { class: "fm-icon" }, D(e)), o("span", {
			class: "fm-preview-name",
			title: e.name
		}, P(e)), t && o("button", {
			class: "fm-preview-open",
			type: "button",
			onclick: () => this.open(e)
		}, t));
	}
	#r(e, t) {
		if (!t) return q("file", j("preview.emptyFile"), "");
		let { ext: n } = i(e.name);
		return n === "svg" && /^\s*(<\?xml[^>]*>\s*)?(<!--[\s\S]*?-->\s*)*<svg[\s>]/i.test(t) ? (this.#t = URL.createObjectURL(new Blob([t], { type: "image/svg+xml" })), o("div", { class: "fm-preview-image" }, o("img", {
			src: this.#t,
			alt: j("preview.imageAlt", { name: e.name })
		}))) : t.slice(0, 8e3).includes("\0") ? q("file", j("preview.unavailable"), j("preview.notText")) : this.#i(e, t);
	}
	#i(e, t, n = null) {
		let r = t.length > be;
		return o("div", { class: "fm-preview-textwrap" }, o("pre", {
			class: "fm-preview-text",
			tabindex: "0",
			"aria-label": j("preview.contentsOf", { name: e.name })
		}, r ? t.slice(0, be) : t), r ? o("div", { class: "fm-preview-note" }, j("preview.cut", {
			shown: M(be),
			total: M(t.length)
		})) : null, n);
	}
	#a(e) {
		return typeof _.filePreview == "function" ? _.filePreview(e).catch((t) => (console.warn(`[files] anteprima di ${e.name}:`, t), null)) : Promise.resolve(null);
	}
	#o(e, t) {
		let n = o("div", { class: "fm-preview-note" }, [j("preview.byApp", { app: T(t.app)?.name ?? t.app }), t.note].filter(Boolean).join(" · "));
		if (typeof t.text == "string") return t.text ? this.#i(e, t.text, n) : q("file", j("preview.emptyFile"), "");
		let r;
		return t.image instanceof Blob ? (this.#t = URL.createObjectURL(t.image), r = o("div", { class: "fm-preview-image" }, o("img", {
			src: this.#t,
			alt: j("preview.imageAlt", { name: e.name })
		}))) : (r = o("iframe", {
			class: "fm-preview-frame",
			sandbox: "",
			referrerpolicy: "no-referrer",
			title: j("preview.contentsOf", { name: e.name })
		}), r.srcdoc = t.html), o("div", { class: "fm-preview-textwrap" }, r, n);
	}
	#s(e) {
		let t = a.children(e.id);
		if (!t.length) return q("folder", j("preview.emptyFolder"), "");
		let n = {
			folder: 0,
			file: 1,
			app: 1
		};
		return t.sort((e, t) => n[e.type] - n[t.type] || e.name.localeCompare(t.name, u.locale, { numeric: !0 })), o("ul", {
			class: "fm-preview-list",
			"aria-label": j("preview.contentsOf", { name: e.name })
		}, t.slice(0, Ce).map((e) => o("li", {
			title: j("preview.childTitle", { name: e.name }),
			ondblclick: () => this.open(e)
		}, o("span", { class: "fm-icon" }, D(e)), o("span", { class: "fm-label" }, e.name))), t.length > Ce ? o("li", { class: "more" }, j("list.more", { count: M(t.length - Ce) })) : null);
	}
	#c(e) {
		let t = T(e.app);
		return t ? o("div", { class: "fm-preview-app" }, r(t), o("strong", {}, t.name)) : q("x", j("preview.appMissing"), e.app);
	}
	#l(...e) {
		this.body.replaceChildren(...e);
	}
	#u() {
		this.#t && URL.revokeObjectURL(this.#t), this.#t = null;
	}
};
function q(e, t, n) {
	return o("div", { class: "fm-preview-empty" }, c(e), o("strong", {}, t), n ? o("span", {}, n) : null);
}
// src/files/columns.js
var Fe = "files-columns", Ie = 1600, Le = 160, Re = {
	modified: 128,
	deleted: 128,
	size: 92,
	type: 118,
	workspace: 124,
	origin: 160,
	location: 160
}, ze = class {
	widths = {};
	hidden = /* @__PURE__ */ new Set();
	constructor() {
		let e = p.get(Fe, {}), t = e && typeof e.widths == "object" ? e.widths : {};
		for (let [e, n] of Object.entries(t ?? {})) (Object.hasOwn(Re, e) || e === "name") && Number.isFinite(n) && (this.widths[e] = Be(Math.round(n), 48, Ie));
		Array.isArray(e?.hidden) && e.hidden.filter((e) => Object.hasOwn(Re, e)).forEach((e) => this.hidden.add(e));
	}
	shown(e) {
		return e.filter((e) => e.key === "name" || !this.hidden.has(e.key));
	}
	width(e) {
		return this.widths[e] ?? Re[e];
	}
	layout(e, t = null) {
		let n = this.widths.name == null && t !== "name", r = e.map((e) => e.key === t ? "max-content" : e.key === "name" && n ? `minmax(${Le}px, 1fr)` : `${this.width(e.key)}px`);
		n || r.push("minmax(0, 1fr)");
		let i = e.reduce((e, r) => e + (r.key === t ? 0 : r.key === "name" && n ? Le : this.width(r.key)), 0);
		return {
			template: r.join(" "),
			min: `${i}px`
		};
	}
	resize(e, t, n = !0) {
		this.widths[e] = Be(Math.round(t), 48, Ie), n && this.save();
	}
	setHidden(e, t) {
		e !== "name" && (t ? this.hidden.add(e) : this.hidden.delete(e), this.save());
	}
	reset() {
		this.widths = {}, this.hidden.clear(), this.save();
	}
	save() {
		p.set(Fe, {
			widths: this.widths,
			hidden: [...this.hidden]
		});
	}
}, Be = (e, t, n) => Math.max(t, Math.min(e, n)), J = () => e.net?.available ? e.net : null;
function Ve(e) {
	let t = a.get(e)?.net;
	return t ? J()?.mount(t) ?? null : null;
}
var He = {
	on: "net.state.on",
	connecting: "net.state.connecting",
	off: "net.state.off",
	error: "net.state.error"
}, Ue = (e) => j(He[e.state] ?? "net.state.off") + (e.state === "error" && e.error ? `: ${e.error}` : ""), We = {
	ftp: "FTP",
	ftps: "FTPS",
	sftp: "SFTP",
	webdav: "DAV",
	smb: "SMB"
}, Ge = (e) => We[e] ?? e.toUpperCase().slice(0, 5);
function Ke(e, { active: t, reteFolder: n }) {
	let r = J();
	if (!r) return [];
	let i = o("button", {
		class: "fm-side-add",
		type: "button",
		title: j("net.add"),
		"aria-label": j("net.add"),
		onclick: () => tt(e)
	}, c("plus")), a = n ? o("button", {
		class: "fm-side-title",
		type: "button",
		onclick: () => e.go(n)
	}, j("net.section")) : o("span", {}, j("net.section")), s = r.mounts().sort((e, t) => e.name.localeCompare(t.name)).map((n) => {
		let i = r.mountNode(n.id), a = t === i, s = o("button", {
			class: a ? "fm-place fm-mount on" : "fm-place fm-mount",
			type: "button",
			"aria-current": a ? "true" : null,
			title: `${n.address} · ${Ue(n)}`,
			onclick: () => e.go(i)
		}, o("span", {
			class: `fm-dot ${n.state}`,
			"aria-hidden": "true"
		}), o("span", { class: "fm-mount-name" }, n.name), o("span", { class: "fm-proto" }, Ge(n.protocol)));
		return s.dataset.folder = i, s.addEventListener("contextmenu", (t) => {
			t.preventDefault(), qe(e, n, t.clientX, t.clientY);
		}), s;
	});
	return [o("section", {
		class: "fm-side-net",
		"aria-label": j("net.section")
	}, o("h6", { class: "fm-side-head" }, a, i), ...s.length ? s : [o("p", { class: "fm-side-none" }, j("net.none"))])];
}
function qe(e, t, n, r) {
	let i = J();
	i && l(n, r, [
		{
			label: j("net.menu.open"),
			icon: "open",
			action: () => e.go(i.mountNode(t.id))
		},
		t.state === "on" ? {
			label: j("net.menu.disconnect"),
			icon: "x",
			action: () => i.disconnect(t.id).catch((t) => e.netError(t))
		} : {
			label: j("net.menu.connect"),
			icon: "globe",
			action: () => e.go(i.mountNode(t.id))
		},
		{
			label: j("net.menu.edit"),
			icon: "pencil",
			action: () => tt(e, t)
		},
		"-",
		{
			label: j("net.menu.remove"),
			icon: "trash",
			danger: !0,
			action: () => Je(e, t)
		}
	]);
}
async function Je(t, n) {
	(e.messageBox ? await e.messageBox(t.win, {
		icon: "warning",
		title: j("net.remove.title", { name: n.name }),
		text: j("net.remove.text"),
		buttons: ["continue", "cancel"]
	}) : "continue") === "continue" && J()?.remove(n.id).catch((e) => t.netError(e));
}
function Ye(e, t) {
	let n = Ve(t);
	if (!n) return null;
	let r = o("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => J().disconnect(n.id).catch((t) => e.netError(t))
	}, c("x"), j("net.menu.disconnect"));
	return o("div", { class: `fm-mountbar ${n.state}` }, c(n.state === "on" ? "lock" : "globe"), o("span", { class: "fm-mountbar-text" }, n.state === "on" ? j("net.bar.on") : Ue(n), " ", o("code", {}, n.address)), o("span", { class: "fm-sp" }), n.state === "on" ? r : null);
}
async function Xe(e, t) {
	if (!J() || !a.isRemote?.(t)) return !0;
	for (;;) try {
		return await a.refresh(t), !0;
	} catch (n) {
		let r = Ve(t);
		if (!r || !a.exists(t)) return !1;
		if (n.code === "secret_required") {
			if (!await nt(e, r, n.details?.reason === "auth")) return !1;
			continue;
		}
		if (n.code === "untrusted") {
			if (!await Ze(e, r.id, r.name, n.details?.trust)) return !1;
			continue;
		}
		if (await e.netError(n, {
			retry: !0,
			title: j("net.error.read", { name: r.name })
		}) !== "retry") return !1;
	}
}
async function Ze(t, n, r, i) {
	if (!i?.fingerprint || !e.messageBox) return !1;
	let a = i.changed === !0;
	if (await e.messageBox(t.win, {
		icon: a ? "error" : "warning",
		title: j(a ? "net.trust.changed.title" : "net.trust.title", { name: r }),
		text: j(a ? "net.trust.changed" : i.kind === "ssh" ? "net.trust.ssh" : "net.trust.tls", {
			fingerprint: i.text ?? i.fingerprint,
			previous: i.previous ?? ""
		}),
		buttons: ["continue", "cancel"],
		default: "cancel"
	}) !== "continue") return !1;
	try {
		return await J().connect(n, { trust: i.fingerprint }), !0;
	} catch (e) {
		return e.code === "secret_required" || e.code === "untrusted" || (await t.netError(e), !1);
	}
}
var Y = (e) => J()?.text(e) ?? (typeof e == "string" ? e : ""), Qe = (e, t) => !e.when || Object.entries(e.when).every(([e, n]) => Array.isArray(n) ? n.includes(t[e]) : t[e] === n);
function $e(e, t, { initial: n = {}, only: r = null, onShares: i = null, onChange: a = null } = {}) {
	let s = { ...n }, c = {};
	for (let e of t.fields) s[e.key] === void 0 && e.default !== void 0 && !e.secret && (s[e.key] = e.default);
	let l = [], u = o("div", { class: "fm-net-fields" }), d = () => {
		l.length = 0;
		for (let o of t.fields) (r !== "secret" || o.secret) && Qe(o, s) && l.push(et(e, o, o.secret ? c : s, {
			editing: !!n.host && o.secret,
			onShares: i,
			changed: () => {
				a?.(), t.fields.some((e) => e.when) && d();
			}
		}));
		u.replaceChildren(...l);
	};
	return d(), {
		el: u,
		values: () => Object.fromEntries(Object.entries(s).filter(([e]) => t.fields.some((t) => t.key === e && !t.secret && Qe(t, s)))),
		secret: () => ({ ...c }),
		missing: (e = !0) => t.fields.filter((t) => t.required && Qe(t, s) && (t.secret ? e && !c[t.key] : s[t.key] === void 0 || s[t.key] === "")).map((e) => Y(e.label)),
		focus: () => u.querySelector("input, select, textarea")?.focus()
	};
}
function et(e, t, n, { editing: r, onShares: i, changed: s }) {
	let c = `fm-net-${t.key}-${Math.random().toString(36).slice(2, 7)}`, l = o("label", { for: c }, Y(t.label), t.required ? o("span", {
		class: "fm-req",
		"aria-hidden": "true"
	}, " *") : null), u = (e) => {
		e === "" || e === void 0 ? delete n[t.key] : n[t.key] = e, s();
	}, d;
	if (t.type === "checkbox") return d = o("input", {
		id: c,
		type: "checkbox",
		checked: n[t.key] === !0
	}), d.addEventListener("change", () => u(d.checked)), o("label", { class: "fm-net-check" }, d, Y(t.label));
	if (t.type === "select") d = o("select", {
		id: c,
		class: "ctl-select"
	}, ...(t.options ?? []).map((e) => o("option", {
		value: String(e.value),
		selected: e.value === n[t.key]
	}, Y(e.label)))), d.addEventListener("change", () => u(t.options.find((e) => String(e.value) === d.value)?.value));
	else if (t.type === "textarea") d = o("textarea", {
		id: c,
		class: "ctl-text",
		rows: "3",
		spellcheck: "false",
		placeholder: t.placeholder ?? ""
	}), d.value = n[t.key] ?? "", d.addEventListener("input", () => u(d.value));
	else if (t.type === "file") {
		let i = o("span", { class: "fm-net-file" }, n[t.key] ? j("net.file.chosen") : j(r ? "net.secret.unchanged" : "net.file.none"));
		return d = o("button", {
			id: c,
			class: "ctl-btn",
			type: "button"
		}, j("net.file.browse")), d.addEventListener("click", async () => {
			let n = await ae(e.openWindow, { title: Y(t.label) });
			if (n) try {
				u(await a.read(n.id)), i.textContent = n.name;
			} catch (t) {
				e.netError(t);
			}
		}), o("div", { class: "fm-net-row" }, l, o("div", { class: "fm-net-pick" }, i, d), t.hint ? o("small", {}, Y(t.hint)) : null);
	} else {
		let e = t.type === "password" ? "password" : t.type === "number" ? "number" : "text";
		d = o("input", {
			id: c,
			class: "ctl-text",
			type: e,
			spellcheck: "false",
			autocomplete: t.type === "password" ? "new-password" : "off",
			placeholder: t.secret && r ? j("net.secret.unchanged") : t.placeholder ?? "",
			...t.min !== void 0 && { min: String(t.min) },
			...t.max !== void 0 && { max: String(t.max) }
		}), d.value = n[t.key] ?? "", d.addEventListener("input", () => u(e === "number" ? d.value === "" ? "" : Number(d.value) : d.value));
	}
	let f = [l];
	if (t.key === "share" && i) {
		let e = o("button", {
			class: "ctl-btn",
			type: "button"
		}, j("net.shares.list"));
		e.addEventListener("click", () => i(e, (e) => {
			d.value = e, u(e);
		})), f.push(o("div", { class: "fm-net-pick" }, d, e));
	} else f.push(d);
	return t.hint && f.push(o("small", {}, Y(t.hint))), o("div", { class: "fm-net-row" }, ...f);
}
function tt(e, t = null) {
	let r = J();
	if (!r) return;
	let i = new n({
		title: t ? j("net.edit.title", { name: t.name }) : j("net.connect.title"),
		icon: "globe",
		width: 460,
		height: 660,
		minWidth: 360,
		minHeight: 360
	}), a = r.protocols.find((e) => e.id === (t?.protocol ?? r.protocols[0]?.id)), s = null, c = null, u = o("select", {
		class: "ctl-select",
		id: "fm-net-protocol",
		disabled: !!t
	}, ...r.protocols.map((e) => o("option", {
		value: e.id,
		selected: e.id === a.id
	}, Y(e.label)))), d = o("input", {
		class: "ctl-text",
		type: "text",
		spellcheck: "false",
		value: t?.name ?? ""
	}), f = o("small"), p = o("input", {
		type: "checkbox",
		checked: !t || t.remembered
	}), m = o("input", {
		type: "checkbox",
		checked: !!t?.auto
	}), h = o("div"), g = o("div", {
		class: "fm-net-note",
		hidden: !0,
		role: "alert"
	}), _ = o("p", {
		class: "fm-net-status",
		role: "status"
	}), v = o("button", {
		class: "ctl-btn",
		type: "button"
	}, j("net.test")), y = o("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => i.emit("close")
	}, j("net.cancel")), b = o("button", {
		class: "ctl-btn primary",
		type: "button"
	}, j(t ? "net.save" : "net.connect.go")), x = !!t, S = () => {
		f.textContent = d.value.trim() ? j("net.name.hint", { path: `~/Rete/${d.value.trim()}` }) : "";
	}, C = (e, t = !1) => {
		_.textContent = e, _.classList.toggle("bad", t);
	}, w = () => {
		c = null, g.hidden = !0, b.textContent = j(t ? "net.save" : "net.connect.go"), s = $e(e, a, {
			initial: t?.values ?? {},
			onShares: a.canListShares ? E : null,
			onChange: () => {
				x || (d.value = s.values().host ?? "", S()), c && (c = null, g.hidden = !0, b.textContent = j(t ? "net.save" : "net.connect.go"));
			}
		}), h.replaceChildren(s.el);
	}, T = () => ({
		protocol: a.id,
		values: s.values(),
		...c && { trust: c.fingerprint }
	});
	async function E(e, t) {
		try {
			e.disabled = !0;
			let n = await r.shares(T(), s.secret()), i = e.getBoundingClientRect();
			if (!n.length) return C(j("net.shares.none"));
			l(i.left, i.bottom, n.map((e) => ({
				label: e,
				icon: "folder",
				action: () => t(e)
			})));
		} catch (e) {
			if (e.code === "untrusted") return D(e.details?.trust);
			C(e.message, !0);
		} finally {
			e.disabled = !1;
		}
	}
	let D = (e) => {
		e?.fingerprint && (c = e, g.replaceChildren(o("b", {}, j("net.trust.first")), " ", j(e.kind === "ssh" ? "net.trust.key" : "net.trust.cert"), o("code", {}, e.text ?? e.fingerprint), o("span", {}, j("net.trust.check"))), g.hidden = !1, b.textContent = j("net.trust.go"), C(""));
	};
	u.addEventListener("change", () => {
		a = r.protocols.find((e) => e.id === u.value), w();
	}), d.addEventListener("input", () => {
		x = !!d.value.trim(), S();
	}), v.addEventListener("click", async () => {
		let e = s.missing(!t);
		if (e.length) return C(j("net.missing", { fields: e.join(", ") }), !0);
		C(j("net.testing"));
		try {
			await r.test(T(), s.secret()), C(j("net.test.ok"));
		} catch (e) {
			if (e.code === "untrusted") return D(e.details?.trust);
			C(e.message, !0);
		}
	}), b.addEventListener("click", async () => {
		let n = s.missing(!t || !t.remembered);
		if (d.value.trim() || n.unshift(j("net.name")), n.length) return C(j("net.missing", { fields: n.join(", ") }), !0);
		b.disabled = !0, C(j("net.connecting"));
		try {
			let n = {
				name: d.value.trim(),
				...T(),
				auto: m.checked,
				remember: p.checked
			}, a = t ? await r.update(t.id, n, s.secret()) : await r.create(n, s.secret());
			t = a;
			try {
				await r.connect(a.id, c ? { trust: c.fingerprint } : {});
			} catch (e) {
				if (e.code === "untrusted") {
					D(e.details?.trust);
					return;
				}
				if (e.code === "secret_required") {
					C(e.message, !0);
					return;
				}
				C(e.message, !0);
				return;
			}
			i.emit("close"), e.go(r.mountNode(a.id));
		} catch (e) {
			C(e.message, !0);
		} finally {
			b.disabled = !1;
		}
	}), w(), S(), i.body.append(o("div", { class: "fm-net-dialog" }, o("div", { class: "fm-net-body" }, o("div", { class: "fm-net-row" }, o("label", { for: "fm-net-protocol" }, j("net.protocol")), u), h, o("div", { class: "fm-net-row" }, o("label", {}, j("net.name")), d, f), o("label", { class: "fm-net-check" }, p, j("net.remember")), o("label", { class: "fm-net-check" }, m, j("net.auto")), g, _), o("div", { class: "fm-net-foot" }, v, o("span", { class: "fm-sp" }), y, b))), e.openWindow(i), requestAnimationFrame(() => s.focus());
}
function nt(e, t, r = !1) {
	let i = J(), a = i?.protocols.find((e) => e.id === t.protocol);
	return a ? new Promise((s) => {
		let c = new n({
			title: j("net.password.title", { name: t.name }),
			icon: "lock",
			width: 380,
			height: 300,
			minWidth: 320,
			minHeight: 220
		}), l = $e(e, a, {
			initial: t.values,
			only: "secret"
		}), u = o("input", {
			type: "checkbox",
			checked: t.remembered
		}), d = o("p", {
			class: "fm-net-status bad",
			role: "status"
		}, r ? j("net.password.wrong") : ""), f = o("button", {
			class: "ctl-btn primary",
			type: "button"
		}, j("net.connect.go")), p = !1, m = (e) => {
			p || (p = !0, s(e), c.emit("close"));
		}, h = async () => {
			f.disabled = !0, d.textContent = "";
			try {
				await i.connect(t.id, {
					secret: l.secret(),
					remember: u.checked
				}), m(!0);
			} catch (e) {
				if (e.code === "untrusted") return m(!0);
				d.textContent = e.message, f.disabled = !1;
			}
		};
		f.addEventListener("click", h), l.el.addEventListener("keydown", (e) => {
			e.key === "Enter" && (e.preventDefault(), h());
		}), c.on("destroy", () => {
			p || (p = !0, s(!1));
		}), c.body.append(o("div", { class: "fm-net-dialog" }, o("div", { class: "fm-net-body" }, o("p", {}, j("net.password.text", { address: t.address })), l.el, o("label", { class: "fm-net-check" }, u, j("net.remember")), d), o("div", { class: "fm-net-foot" }, o("span", { class: "fm-sp" }), o("button", {
			class: "ctl-btn",
			type: "button",
			onclick: () => m(!1)
		}, j("net.cancel")), f))), e.openWindow(c), requestAnimationFrame(() => l.focus());
	}) : Promise.resolve(!1);
}
// src/files/FilesApp.js
var rt = 1 << 20, it = 260, at = "files-view", ot = [
	"list",
	"grid",
	"thumbs"
], st = 112, ct = {
	grid: 92,
	thumbs: 140
}, X = a.trashRoot, lt = () => [
	{
		key: "name",
		label: j("column.name")
	},
	{
		key: "modified",
		label: j("column.modified")
	},
	{
		key: "size",
		label: j("column.size"),
		num: !0
	},
	{
		key: "type",
		label: j("column.type")
	},
	{
		key: "workspace",
		label: j("column.workspace")
	}
], ut = () => [
	{
		key: "name",
		label: j("column.name")
	},
	{
		key: "deleted",
		label: j("column.deleted")
	},
	{
		key: "size",
		label: j("column.size"),
		num: !0
	},
	{
		key: "type",
		label: j("column.type")
	},
	{
		key: "origin",
		label: j("column.origin")
	}
], Z = "tag:", dt = () => [
	{
		key: "name",
		label: j("column.name")
	},
	{
		key: "location",
		label: j("column.location")
	},
	{
		key: "type",
		label: j("column.type")
	},
	{
		key: "workspace",
		label: j("column.workspace")
	}
], Q = (e) => typeof e == "string" && e.startsWith(Z) ? m.get(e.slice(4)) : null, ft = (e) => e.some((e) => a.exists(e) && !a.get(e).system);
function pt(e) {
	return e?.trash || e?.folder === X ? X : typeof e?.tag == "string" && m.get(e.tag) ? Z + e.tag : Q(e?.folder) || e?.folder && a.exists(e.folder) ? e.folder : null;
}
function $(e) {
	return pt(e) ? null : typeof e?.tag == "string" || typeof e?.folder == "string" && e.folder.startsWith(Z) ? "tag" : e?.folder ? "folder" : null;
}
function mt({ args: e, openWindow: t } = {}) {
	let r = new n({
		title: j("@name"),
		icon: "folder",
		width: 1e3,
		height: 520,
		minWidth: 520,
		minHeight: 300
	}), i = new gt(r, t);
	i.go(pt(e) ?? a.root, !1);
	let o = $(e);
	return o && requestAnimationFrame(() => i.notFound(o)), r.on("launch", (e) => {
		let t = pt(e);
		t ? i.go(t) : $(e) && i.notFound($(e));
	}), r.getState = () => ({ folder: i.folder }), r;
}
var ht = (e) => String(e).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(), gt = class {
	folder = a.root;
	#e = [];
	#t = [];
	#n = ot.includes(p.get(at)) ? p.get(at) : "list";
	#r = {
		key: "name",
		dir: 1
	};
	#i = new ze();
	#a = "";
	#o = [];
	#s = /* @__PURE__ */ new Set();
	#c = /* @__PURE__ */ new Map();
	#l = /* @__PURE__ */ new Set();
	#u = null;
	#d = null;
	#f = null;
	#p = "";
	#m = "";
	#h = !1;
	#g = {
		defaults: [],
		desk: null
	};
	#_ = {
		key: null,
		text: null
	};
	history = new t();
	constructor(t, n) {
		this.win = t, this.openWindow = n ?? (() => {});
		let r = (e, t, n) => o("button", {
			class: "fm-btn",
			type: "button",
			title: t,
			"aria-label": t,
			onclick: n
		}, c(e));
		this.backBtn = r("arrowLeft", j("toolbar.back"), () => this.back()), this.forwardBtn = r("arrowRight", j("toolbar.forward"), () => this.forward()), this.upBtn = r("arrowUp", j("toolbar.up"), () => this.up()), this.crumbs = o("nav", {
			class: "fm-path",
			"aria-label": j("toolbar.path")
		}), this.crumbs.addEventListener("click", (e) => {
			e.target.closest("button") || this.editAddress();
		}), this.address = o("input", {
			class: "fm-path fm-address",
			type: "text",
			spellcheck: "false",
			autocomplete: "off",
			hidden: !0,
			"aria-label": j("toolbar.address")
		}), this.address.addEventListener("input", () => this.#x(!1)), this.address.addEventListener("keydown", (e) => {
			e.stopPropagation(), e.key === "Enter" && (e.preventDefault(), this.#b()), e.key === "Escape" && (e.preventDefault(), this.#y(!0));
		}), this.address.addEventListener("blur", () => {
			this.#h || this.#y(!1);
		}), this.newBtn = r("folderPlus", j("menu.newFolder"), () => this.create("folder")), this.listBtn = r("list", j("view.list"), () => this.setView("list")), this.gridBtn = r("grid", j("view.grid"), () => this.setView("grid")), this.thumbsBtn = r("image", j("view.thumbs"), () => this.setView("thumbs")), this.previewBtn = r("sidebar", "", () => this.preview.toggle()), this.infoBtn = r("info", "", () => this.info.toggle()), this.search = o("input", {
			type: "text",
			spellcheck: "false",
			"aria-label": j("toolbar.search")
		}), this.search.addEventListener("input", () => {
			this.#a = ht(this.search.value.trim()), this.render();
		}), this.search.addEventListener("keydown", (e) => {
			e.key === "Escape" && this.search.value && (e.stopPropagation(), this.search.value = "", this.#a = "", this.render()), e.key === "ArrowDown" && (e.preventDefault(), this.list.focus());
		}), this.side = o("aside", {
			class: "fm-side",
			"aria-label": j("side.label")
		}), this.list = o("div", {
			class: "fm-list",
			role: "listbox",
			tabindex: "0",
			"aria-multiselectable": "true",
			"aria-label": j("list.label")
		}), this.mountSlot = o("div", { class: "fm-mountslot" }), this.statusLeft = o("span"), this.statusRight = o("span", { class: "fm-status-right" });
		let i = (e, n, r, i) => new ve({
			key: e,
			...n,
			width: r,
			open: i,
			signal: t.signal,
			room: () => this.#w() - (e === "info" ? this.preview : this.info).shown,
			onLayout: () => {
				this.#T(), this.#S();
			}
		});
		this.preview = i("preview", {
			title: j("panel.preview.title"),
			resizeLabel: j("panel.preview.resize"),
			closeLabel: j("panel.preview.close")
		}, 300, !1), this.info = i("info", {
			title: j("panel.info.title"),
			resizeLabel: j("panel.info.resize"),
			closeLabel: j("panel.info.close")
		}, 260, !0), this.previewView = new Pe(this.preview.body, {
			text: (e) => this.#C(e),
			open: (e) => this.open(e)
		}), this.main = o("div", { class: "fm" }, this.side, o("div", { class: "fm-main" }, this.mountSlot, this.list, o("div", { class: "fm-status" }, this.statusLeft, this.statusRight)), this.preview.el, this.info.el), t.body.append(o("div", { class: "fm-toolbar" }, this.backBtn, this.forwardBtn, this.upBtn, this.crumbs, this.address, this.newBtn, o("span", { class: "fm-sep" }), this.listBtn, this.gridBtn, this.thumbsBtn, o("span", { class: "fm-sep" }), this.previewBtn, this.infoBtn, o("label", { class: "fm-search" }, c("search"), this.search)), this.main);
		let l = new ResizeObserver(() => this.#T());
		l.observe(this.main), this.#X(), w(this.list, { target: (e, t, n, r) => this.#j(r) }), this.gap = o("div", {
			class: "fm-gap",
			"aria-hidden": "true"
		}), w(this.side, { target: (e, t, n, r) => this.#A(e, t, n, r) });
		let u = a.on("change", (e) => this.#se(e)), d = O.on("change", () => {
			this.#ne(this.folder) && this.render();
		}), f = a.on("scope", () => {
			this.#ne(this.folder) && this.render();
		}), p = re(() => {
			this.#ne(this.folder) && this.render();
		}), h = a.on("trash", () => {
			this.inTrash && (this.#p = "", this.render());
		}), g = J() ? e.net.on("mounts", () => {
			this.#ne(this.folder) && this.render();
		}) : () => {}, _ = m.on("change", () => {
			if (this.folder.startsWith?.(Z) && !this.inTag) return this.go(a.root, !1);
			this.#ne(this.folder) && this.render();
		}), v = b({
			isActive: () => t.active,
			selectionSize: () => this.#l.size,
			open: () => this.openSelected(),
			rename: () => this.rename([...this.#l][0]),
			remove: () => this.remove([...this.#l]),
			selectAll: () => this.#Y(this.#o.map((e) => e.id)),
			deselect: () => this.#Y([])
		}), y = s.attach(t.el, this.history), x = [
			E("files.info", {
				isActive: () => t.active,
				run: () => this.info.toggle()
			}),
			E("files.preview", {
				isActive: () => t.active,
				run: () => this.preview.toggle()
			}),
			E("files.address", {
				isActive: () => t.active,
				run: () => this.editAddress()
			})
		];
		t.on("destroy", () => {
			u(), d(), f(), p(), h(), _(), g(), v(), y(), x.forEach((e) => e()), l.disconnect(), this.previewView.destroy();
		});
	}
	get inTrash() {
		return this.folder === X;
	}
	get inTag() {
		return Q(this.folder);
	}
	get tree() {
		return this.#n === "list" && !this.inTrash;
	}
	go(e, t = !0) {
		if (e !== X && !Q(e) && a.get(e)?.type !== "folder") return;
		t && e !== this.folder && (this.#e.push(this.folder), this.#t = []);
		let n = this.folder;
		this.folder = e, this.#l.clear(), this.#f = null, this.#p = "", this.search.value = "", this.#a = "";
		let r = a.ancestors(n).find((t) => t.parent === e);
		this.#d = r?.id ?? null, r && this.#l.add(r.id), this.#u = this.#d, this.render(), this.list.scrollTop = 0, a.isRemote?.(e) && this.#v(e);
	}
	async #v(e) {
		this.#ae(j("net.loading"));
		let t = await Xe(this, e);
		this.folder === e && this.#p === j("net.loading") && this.#ae(t ? "" : j("net.notRead"));
	}
	netError(e, { retry: t = !1, title: n = j("net.error.title") } = {}) {
		return this.#oe(n, e?.message ?? String(e), t ? ["retry", "cancel"] : ["ok"]);
	}
	reveal(e) {
		let t = a.get(e);
		t && (this.go(t.parent), a.isHidden(e) ? this.#ae(j("message.hiddenByTag", { name: t.name })) : this.#Y([e], e));
	}
	back() {
		this.#ie(this.#e, this.#t);
	}
	forward() {
		this.#ie(this.#t, this.#e);
	}
	up() {
		let e = a.get(this.folder)?.parent;
		e && this.go(e);
	}
	editAddress() {
		this.address.hidden && (this.address.value = this.inTrash || this.inTag ? `${a.home}/` : a.path(this.folder), this.#x(!1), this.crumbs.hidden = !0, this.address.hidden = !1), this.address.focus(), this.address.select();
	}
	#y(e) {
		this.address.hidden || (this.address.hidden = !0, this.crumbs.hidden = !1, this.#p && this.#p === this.#m && this.#ae(""), e && this.list.focus());
	}
	async #b() {
		let t = this.address.value.trim().replace(/\\/g, "/"), n = t ? a.resolve(t) : null;
		if (!n && t && e.messageBox) {
			this.#x(!0), this.#h = !0;
			let e = await this.#oe(j("error.pathNotFound"), j("message.noPath", { path: t }), ["retry", "cancel"]);
			if (this.#h = !1, e !== "retry") return this.#y(!0);
			this.address.focus(), this.address.setSelectionRange(this.address.value.length, this.address.value.length);
		} else {
			if (!n) return this.#x(!0), this.#m = t ? j("message.noPath", { path: t }) : j("message.typePath", { path: a.path(this.inTrash || this.inTag ? a.root : this.folder) }), this.#ae(this.#m);
			this.#y(!0), n.type === "folder" ? this.go(n.id) : this.reveal(n.id);
		}
	}
	#x(e) {
		this.address.classList.toggle("bad", e), this.address.setAttribute("aria-invalid", String(e));
	}
	setView(e) {
		this.#n = e, p.set(at, e), this.render();
	}
	open(e) {
		if (e.type === "folder") return this.go(e.id);
		if (e.type === "app") return ee(e.app);
		ie(e);
	}
	openSelected() {
		if (this.inTrash) return this.#ae(j("message.restoreToOpen"));
		let e = this.#o.filter((e) => this.#l.has(e.id)), t = e.find((e) => e.type === "folder");
		e.filter((e) => e.type !== "folder").forEach((e) => this.open(e)), t && this.go(t.id);
	}
	create(e) {
		if (this.inTrash || this.inTag) return;
		this.#a &&= (this.search.value = "", "");
		let t;
		try {
			t = a.create(this.folder, {
				type: e,
				name: j(e === "folder" ? "create.folderName" : "create.fileName")
			});
		} catch (t) {
			this.#oe(j(e === "folder" ? "error.createFolder" : "error.createFile"), t.message);
			return;
		}
		this.#Y([t.id]), this.rename(t.id, !0);
	}
	rename(e, t = !1) {
		let n = a.get(e);
		if (!n || n.system) return;
		this.#f = e, this.render();
		let r = this.list.querySelector(".fm-rename");
		if (!r) return;
		r.focus();
		let i = n.type === "file" ? n.name.lastIndexOf(".") : -1;
		r.setSelectionRange(0, i > 0 ? i : n.name.length);
		let o = !1, s = (i) => {
			if (o) return;
			o = !0, this.#f = null;
			let s = r.value.replace(/\s+/g, " ").trim();
			if (i && s && s !== n.name && a.exists(e)) try {
				ce(t ? null : this.history, e, s);
			} catch (t) {
				this.#oe(j("error.rename", { name: n.name }), t.message, ["retry", "cancel"]).then((t) => {
					t === "retry" && a.exists(e) && this.rename(e);
				});
			}
			t && oe(this.history, e), this.render(), this.list.focus();
		};
		r.addEventListener("keydown", (e) => {
			e.stopPropagation(), e.key === "Enter" && (e.preventDefault(), s(!0)), e.key === "Escape" && (e.preventDefault(), s(!1));
		}), r.addEventListener("blur", () => s(!0));
	}
	setOpen(e, t, n = !1) {
		let r = [e];
		if (n) for (let e = 0; e < r.length; e++) r.push(...a.children(r[e]).filter((e) => e.type === "folder").map((e) => e.id));
		if (r.forEach((e) => t ? this.#s.add(e) : this.#s.delete(e)), t && r.filter((e) => a.isRemote?.(e)).forEach((e) => Xe(this, e)), !t) {
			let t = (t) => t != null && t !== e && a.isInside(t, e);
			t(this.#d) && (this.#d = e), t(this.#u) && (this.#u = e), [...this.#l].some(t) && (this.#l = new Set([...this.#l].filter((e) => !t(e)).concat(e)));
		}
		this.render();
	}
	remove(e) {
		if (this.inTrash) return this.purge(e);
		let t = e.filter((e) => !a.get(e)?.system);
		if (!t.length) return void this.#oe(j("error.delete"), j("message.systemFolders"));
		let { x: n, y: r } = this.#re(t[0]);
		x(t, n, r, this.history);
	}
	restore(e) {
		let t = le(this.history, e);
		if (!t.length) return;
		let n = [...new Set(t.map((e) => e.parent === a.root ? j("place.home") : a.path(e.parent)))], r = M(t.length);
		h(t.length === 1 ? j("toast.restored", {
			name: a.get(t[0].id).name,
			place: n[0]
		}) : n.length === 1 ? j("toast.restoredMany", {
			count: r,
			place: n[0]
		}) : j("toast.restoredManyPlaces", {
			count: r,
			folders: M(n.length)
		}));
	}
	purge(e) {
		let t = this.#o.filter((t) => e.includes(t.id));
		if (!t.length) return;
		let n = t.length === 1 ? j("confirm.purge", { name: t[0].name }) : j("confirm.purgeMany", { count: M(t.length) }), { x: r, y: i } = this.#re(t[0].id);
		l(r, i, [{
			label: n,
			icon: "trash",
			danger: !0,
			action: () => a.purge(t.map((e) => e.id))
		}, {
			label: j("confirm.cancel"),
			icon: "x",
			action: () => {}
		}]);
	}
	empty(e, t) {
		let n = a.trashed().length;
		n && l(e, t, [{
			label: j("confirm.emptyTrash", {
				n,
				count: M(n)
			}),
			icon: "trash",
			danger: !0,
			action: () => a.purgeTrash()
		}, {
			label: j("confirm.cancel"),
			icon: "x",
			action: () => {}
		}]);
	}
	render() {
		let e = this.inTag, t = this.inTrash ? {
			id: X,
			name: j("place.trash"),
			parent: null
		} : e ? {
			id: this.folder,
			name: j("place.tag", { name: e.name }),
			parent: null
		} : a.get(this.folder);
		if (!t) return;
		this.win.setTitle(P(t), j("@name")), this.#E(t), this.#D();
		let n = !this.inTrash && !e && J() ? Ye(this, this.folder) : null;
		this.mountSlot.replaceChildren(...n ? [n] : []);
		let r = this.inTrash ? a.trashed() : e ? a.tagged(e.id) : a.children(this.folder);
		this.#c.clear(), this.#o = this.#H(r);
		let i = new Set(this.#o.map((e) => e.id));
		this.#l = new Set([...this.#l].filter((e) => i.has(e))), i.has(this.#d) || (this.#d = this.#o[0]?.id ?? null);
		let s = this.list.scrollTop;
		this.list.classList.toggle("grid", this.#n !== "list"), this.list.classList.toggle("thumbs", this.#n === "thumbs"), this.list.classList.toggle("tree", this.tree), this.list.setAttribute("role", this.tree ? "tree" : "listbox"), this.#o.length ? this.#n === "list" ? (this.#P(), this.list.replaceChildren(this.#z(), ...this.#o.map((e) => this.#B(e)))) : this.list.replaceChildren(...this.#o.map((e) => this.#G(e))) : this.list.replaceChildren(o("div", { class: "fm-empty" }, this.#a ? j("empty.noMatch", { query: this.search.value.trim() }) : this.inTrash ? j("empty.trash") : j(e ? "empty.tag" : "empty.folder"))), this.list.scrollTop = s, this.list.setAttribute("aria-activedescendant", this.#d ? `fm-${this.#d}` : "");
		let c = r.length, l = this.#l.size;
		this.statusLeft.textContent = j("status.items", {
			n: c,
			count: M(c)
		}) + (l ? ` · ${j("status.selected", {
			n: l,
			count: M(l)
		})}` : ""), this.statusRight.textContent = this.#p || (this.inTrash ? _e() : e ? e.visible ? j("status.tag") : j("status.tagHidden") : a.path(this.folder)), this.statusRight.classList.toggle("msg", !!this.#p), this.#S();
	}
	#S() {
		let e = [[
			this.previewBtn,
			this.preview,
			"files.preview",
			j("panel.preview.show"),
			j("panel.preview.hide")
		], [
			this.infoBtn,
			this.info,
			"files.info",
			j("panel.info.show"),
			j("panel.info.hide")
		]];
		for (let [t, n, r, i, a] of e) {
			let e = f.label(r), o = `${n.open ? a : i}${e ? ` (${e})` : ""}`;
			t.title = o, t.setAttribute("aria-label", o), t.setAttribute("aria-pressed", String(n.open)), t.classList.toggle("on", n.open);
		}
		if (!this.info.open && !this.preview.open) return;
		let t = this.#o.filter((e) => this.#l.has(e.id));
		if (this.preview.open && this.previewView.update(t), this.info.open) {
			let e = this.inTag, n = this.inTrash ? { trash: !0 } : e ? { tag: e } : { node: a.get(this.folder) };
			if (!n.trash && !n.tag && !n.node) return;
			let r = this.info.body, i = r.scrollTop;
			r.replaceChildren(ke({
				nodes: t,
				place: n,
				text: (e) => this.#C(e)
			})), r.scrollTop = i;
		}
	}
	#C(e) {
		if (!Ee(e)) return Promise.reject(Error(j("error.notFile")));
		if (e.net && (e.size ?? 0) > rt) return Promise.reject(Error(j("net.preview.big")));
		let t = De(e);
		return this.#_.key !== t && (this.#_ = {
			key: t,
			text: a.read(e.id)
		}), this.#_.text;
	}
	#w() {
		return this.main.clientWidth - this.side.offsetWidth - it;
	}
	#T() {
		let e = [this.preview, this.info].filter((e) => e.open);
		if (!e.length || !this.main.isConnected) return;
		let t = e.reduce((e, t) => e + t.width, 0), n = Math.min(1, Math.max(0, this.#w()) / t);
		e.forEach((e) => e.show(Math.max(180, Math.floor(e.width * n))));
	}
	#E(e) {
		this.backBtn.disabled = !this.#e.some((e) => this.#ne(e)), this.forwardBtn.disabled = !this.#t.some((e) => this.#ne(e)), this.upBtn.disabled = !e.parent, this.newBtn.disabled = this.inTrash || !!this.inTag;
		for (let [e, t] of [
			[this.listBtn, "list"],
			[this.gridBtn, "grid"],
			[this.thumbsBtn, "thumbs"]
		]) e.classList.toggle("on", this.#n === t), e.setAttribute("aria-pressed", String(this.#n === t));
		this.search.placeholder = j("toolbar.searchIn", { name: P(e) });
		let t = this.inTrash || this.inTag ? [e] : a.ancestors(this.folder);
		this.crumbs.replaceChildren(...t.flatMap((e, n) => {
			let r = n === t.length - 1 ? o("span", {
				class: "fm-crumb current",
				"aria-current": "page"
			}, P(e)) : o("button", {
				class: "fm-crumb",
				type: "button",
				onclick: () => this.go(e.id)
			}, P(e));
			return a.exists(e.id) && ne(r, e), n ? [o("span", {
				class: "fm-crumb-sep",
				"aria-hidden": "true"
			}, "›"), r] : [r];
		}));
	}
	#D() {
		let e = a.children(a.root), t = new Set(a.ancestors(this.folder).map((e) => e.id)), n = [{
			key: "root",
			id: a.root,
			name: j("place.home"),
			glyph: "home"
		}, ...y.map((t) => ({
			...t,
			id: e.find((e) => e.name === t.name && e.system)?.id,
			glyph: t.icon
		})).filter((e) => e.id).map((e) => ({
			...e,
			key: e.name === v ? "desk" : e.id
		}))], r = a.ancestors(this.folder).find((e) => e.mount)?.id ?? null, i = this.inTrash || this.inTag ? this.folder : r ? null : [...n].reverse().find((e) => t.has(e.id))?.id, s = (e) => o("button", {
			class: e.id === i ? "fm-place on" : "fm-place",
			type: "button",
			"aria-current": e.id === i ? "true" : null,
			onclick: () => this.go(e.id)
		}, c(e.glyph), o("span", {}, e.name)), u = (e) => {
			let t = Z + e.id;
			return o("button", {
				class: t === i ? "fm-place fm-tag on" : "fm-place fm-tag",
				type: "button",
				"aria-current": t === i ? "true" : null,
				title: e.visible ? e.name : j("side.tagHidden", { name: e.name }),
				onclick: () => this.go(t)
			}, o("span", {
				class: "tag-dot",
				style: { background: e.color },
				"aria-hidden": "true"
			}), o("span", {}, e.name), e.visible ? null : c("eyeOff"));
		}, d = m.list(), f = n.map((e) => e.key);
		this.#g = {
			defaults: f,
			desk: n.find((e) => e.key === "desk")?.id
		};
		let p = (e, t, { node: n, folder: r } = {}) => (t.dataset.entry = e, r && (t.dataset.folder = r), t.addEventListener("pointerdown", (e) => {
			e.button === 0 && !e.target.closest(".fm-link-x") && C(e, {
				ids: [n],
				stack: this.history
			});
		}), t), h = (e) => {
			let t = e.id === this.folder, n = () => this.#O(e), r = o("button", {
				class: t ? "fm-place fm-link on" : "fm-place fm-link",
				type: "button",
				"aria-current": t ? "true" : null,
				title: `${F(e)} › ${e.name}`,
				onclick: () => this.open(e)
			}, o("span", { class: "fm-link-icon" }, D(e)), o("span", {}, e.name));
			r.addEventListener("contextmenu", (t) => {
				t.preventDefault(), l(t.clientX, t.clientY, [
					{
						label: j("menu.open"),
						icon: "open",
						action: () => this.open(e)
					},
					{
						label: j("menu.reveal"),
						icon: "folderOpen",
						action: () => this.reveal(e.id)
					},
					"-",
					{
						label: j("menu.unlink"),
						icon: "x",
						action: n
					}
				]);
			}), r.addEventListener("keydown", (e) => {
				e.key === "Delete" && (e.preventDefault(), e.stopPropagation(), n());
			});
			let i = o("button", {
				class: "fm-link-x",
				type: "button",
				title: j("side.unlinkTitle"),
				"aria-label": j("link.remove", { name: e.name }),
				onclick: n
			}, c("x"));
			return p(e.id, o("div", { class: "fm-link-row" }, r, i), {
				node: e.id,
				folder: e.type === "folder" ? e.id : null
			});
		}, g = (e) => {
			let t = n.find((t) => t.key === e);
			if (t) return p(e, s(t), {
				node: t.id,
				folder: t.id
			});
			let r = a.get(e);
			return r ? h(r) : [];
		}, b = s({
			id: X,
			name: j("place.trash"),
			glyph: "trash"
		});
		b.dataset.trash = "";
		let x = e.find((e) => e.system && e.name === _.NETWORK_NAME)?.id ?? null;
		this.side.replaceChildren(o("section", {
			class: "fm-side-links",
			"aria-label": j("side.links")
		}, o("h6", {}, j("side.links")), ...O.arrange(f).flatMap(g)), ...d.length ? [o("h6", {}, j("side.tags")), ...d.map(u)] : [], ...Ke(this, {
			active: r,
			reteFolder: x
		}), o("hr", { class: "fm-side-sep" }), b, this.gap);
	}
	#O(e) {
		let { defaults: t } = this.#g, n = O.arrange(t).indexOf(e.id);
		n < 0 || (O.remove(e.id), this.history.push({
			label: j("link.remove", { name: e.name }),
			undo: () => O.place([e.id], n, t),
			redo: () => O.remove(e.id)
		}), h(j("toast.unlinked", { name: e.name })), this.list.focus());
	}
	#k(e) {
		return e === a.root ? "root" : e === this.#g.desk ? "desk" : a.exists(e) ? e : null;
	}
	#A(e, t, n, r) {
		let i = e?.closest?.("[data-trash]");
		if (i) return ft(r) ? {
			el: i,
			run: (e, t) => this.#M(r, t)
		} : null;
		let a = e?.closest?.(".fm-mount");
		if (a) {
			let e = k(r, a.dataset.folder);
			return e && {
				el: a,
				run: (t, n) => A(n, e, a.dataset.folder)
			};
		}
		let o = this.side.querySelector(".fm-side-links");
		if (!o?.contains(e)) return null;
		let s = [...o.querySelectorAll(":scope > [data-entry]")], c = e.closest("[data-entry]");
		if (c && s.includes(c)) {
			let e = c.getBoundingClientRect(), t = Math.min(8, e.height / 4), { folder: i } = c.dataset;
			if (i && n > e.top + t && n < e.bottom - t) {
				let e = k(r, i);
				return e && {
					el: c,
					run: (t, n) => A(n, e, i)
				};
			}
		}
		let l = s.findIndex((e) => {
			let t = e.getBoundingClientRect();
			return n < t.top + t.height / 2;
		});
		l < 0 && (l = s.length);
		let u = [...new Set(r.map((e) => this.#k(e)).filter(Boolean))], { defaults: d } = this.#g;
		if (!O.changes(u, l, d)) return null;
		let f = this.side.getBoundingClientRect(), p = l < s.length ? s[l].getBoundingClientRect().top : s[s.length - 1].getBoundingClientRect().bottom;
		return this.gap.style.top = `${p - f.top + this.side.scrollTop}px`, {
			el: this.gap,
			run: () => {
				let e = O.place(u, l, d);
				e && h(j("toast.linksAdded", {
					n: e,
					count: M(e)
				}));
			}
		};
	}
	#j(e) {
		if (this.inTrash) return ft(e) ? {
			el: this.list,
			run: (t, n) => this.#M(e, n)
		} : null;
		if (this.inTag) return null;
		let t = k(e, this.folder);
		return t && {
			el: this.list,
			run: (e, n) => A(n, t, this.folder)
		};
	}
	#M(e, t) {
		let n = e.filter((e) => !a.get(e)?.system).length;
		se(t, e), h(j("toast.trashed", {
			n,
			count: M(n)
		}));
	}
	#N() {
		return (this.inTrash ? ut : this.inTag ? dt : lt)();
	}
	#P(e = null) {
		let { template: t, min: n } = this.#i.layout(this.#i.shown(this.#N()), e);
		this.list.style.setProperty("--fm-cols", t), this.list.style.setProperty("--fm-min", n);
	}
	#F(e) {
		let t = this.list.querySelectorAll(`[data-col="${e}"]`);
		if (!t.length) return;
		this.#P(e);
		let n = 48;
		for (let e of t) n = Math.max(n, e.offsetWidth + 1);
		this.#i.resize(e, n), this.#P();
	}
	#I(e, t) {
		this.#i.setHidden(e, !t), !t && this.#r.key === e && (this.#r = {
			key: "name",
			dir: 1
		}), this.render();
	}
	#L() {
		let e = this.#N();
		return [
			...e.map((e) => {
				let t = e.key === "name" || !this.#i.hidden.has(e.key);
				return {
					label: e.label,
					icon: t ? "check" : null,
					disabled: e.key === "name",
					action: () => this.#I(e.key, !t)
				};
			}),
			"-",
			{
				label: j("columns.fitAll"),
				icon: "fit",
				action: () => this.#i.shown(e).forEach((e) => this.#F(e.key))
			},
			{
				label: j("columns.reset"),
				icon: "undo",
				action: () => {
					this.#i.reset(), this.render();
				}
			}
		];
	}
	#R(e) {
		let t = o("span", {
			class: "fm-grip",
			role: "separator",
			tabindex: "-1",
			"aria-orientation": "vertical",
			"aria-label": j("column.resize", { name: e.label }),
			title: j("column.resizeTitle")
		}), n = () => t.parentElement.offsetWidth;
		return t.addEventListener("pointerdown", (t) => {
			if (t.button !== 0) return;
			t.preventDefault();
			let r = n();
			this.list.classList.add("resizing"), g(t, {
				threshold: 0,
				onMove: (t) => {
					this.#i.resize(e.key, r + t, !1), this.#P();
				},
				onEnd: (e) => {
					this.list.classList.remove("resizing"), e && this.#i.save();
				}
			});
		}), t.addEventListener("dblclick", () => this.#F(e.key)), t.addEventListener("keydown", (t) => {
			let r = t.shiftKey ? 48 : 16, i = {
				ArrowLeft: -r,
				ArrowRight: r
			}[t.key];
			i !== void 0 && (t.preventDefault(), this.#i.resize(e.key, n() + i), this.#P());
		}), t;
	}
	#z() {
		let e = this.#i.shown(this.#N());
		return o("div", {
			class: "fm-head",
			role: "presentation"
		}, e.map((e) => {
			let t = this.#r.key === e.key, n = o("button", {
				class: [
					"fm-col",
					e.num && "num",
					t && "on"
				].filter(Boolean).join(" "),
				type: "button",
				tabindex: "-1",
				"aria-sort": t ? this.#r.dir > 0 ? "ascending" : "descending" : null,
				onclick: () => {
					this.#r = {
						key: e.key,
						dir: t ? -this.#r.dir : 1
					}, this.render();
				}
			}, e.label, t ? o("span", {
				class: "fm-arrow",
				"aria-hidden": "true"
			}, this.#r.dir > 0 ? "▲" : "▼") : null);
			return o("div", {
				class: "fm-th",
				dataset: { col: e.key }
			}, n, this.#R(e));
		}));
	}
	#B(e) {
		let t = this.#W(e);
		return this.tree && (t.name.prepend(this.#V(e)), t.name.style.setProperty("--fm-depth", this.#c.get(e.id) ?? 0)), this.#q(e, "fm-row", ...this.#i.shown(this.#N()).map((e) => {
			let n = t[e.key] ?? o("span");
			return n.dataset.col = e.key, n;
		}));
	}
	#V(e) {
		if (e.type !== "folder") return o("span", {
			class: "fm-twisty",
			"aria-hidden": "true"
		});
		let t = this.#s.has(e.id);
		return o("span", {
			class: t ? "fm-twisty open" : "fm-twisty",
			dataset: { twisty: e.id },
			"aria-hidden": "true",
			title: j(t ? "tree.collapseTitle" : "tree.expandTitle")
		});
	}
	#H(e, t = 0, n = []) {
		for (let r of this.#J(e)) {
			let e = n.length;
			n.push(r), this.#c.set(r.id, t), this.#U(r) && this.#H(a.children(r.id), t + 1, n), this.#a && n.length === e + 1 && !ht(r.name).includes(this.#a) && n.pop();
		}
		return n;
	}
	#U(e) {
		return this.tree && e.type === "folder" && this.#s.has(e.id);
	}
	#W(e) {
		if (e.trashed) {
			let t = I(e);
			return {
				name: o("span", { class: "fm-name" }, o("span", { class: "fm-icon" }, D(e)), this.#K(e)),
				deleted: o("span", {}, B(e.trashed.at)),
				size: o("span", { class: "num" }, ge(e)),
				type: o("span", {}, N(e)),
				origin: o("span", { title: j("trash.restoresTo", { place: t }) }, t)
			};
		}
		let t = this.inTag ? F(e) : "";
		return {
			name: o("span", { class: "fm-name" }, o("span", { class: "fm-icon" }, D(e)), this.#K(e), fe(e)),
			modified: o("span", {}, B(e.modified)),
			size: o("span", { class: "num" }, ge(e)),
			type: o("span", {}, N(e)),
			workspace: he(e),
			location: o("span", { title: t }, t)
		};
	}
	#G(e) {
		let t = D(e, this.#n === "thumbs" && !e.trashed ? { preview: st } : void 0), n = this.#q(e, "fm-tile", o("span", { class: "fm-tile-icon" }, t, fe(e, "fm-tile-tags")), this.#K(e)), r = (e.tags ?? []).map((e) => m.get(e)?.name).filter(Boolean), i = e.trashed ? [j("tile.deleted", { date: B(e.trashed.at) }), j("tile.origin", { place: I(e) })] : [
			this.inTag && j("tile.location", { place: F(e) }),
			j("owner.label", { name: L(e) }),
			r.length && j("tile.tags", { names: r.join(", ") })
		];
		return n.title = [e.name, ...i.filter(Boolean)].join("\n"), n;
	}
	#K(e) {
		return this.#f === e.id ? o("input", {
			class: "fm-rename",
			type: "text",
			value: e.name,
			spellcheck: "false",
			"aria-label": j("rename.label")
		}) : o("span", {
			class: "fm-label",
			title: e.name
		}, e.name);
	}
	#q(e, t, ...n) {
		let r = this.#l.has(e.id), i = this.tree && t === "fm-row", a = o("div", {
			class: [
				t,
				r && "selected",
				e.id === this.#d && "cursor"
			].filter(Boolean).join(" "),
			id: `fm-${e.id}`,
			role: i ? "treeitem" : "option",
			"aria-selected": String(r),
			dataset: { id: e.id },
			"aria-level": i ? String((this.#c.get(e.id) ?? 0) + 1) : null,
			"aria-expanded": i && e.type === "folder" ? String(this.#s.has(e.id)) : null
		}, ...n);
		return e.trashed ? a : ne(a, e);
	}
	#J(e) {
		let { key: t, dir: n } = this.#r, r = (e) => t === "type" ? N(e) : t === "workspace" ? L(e) : t === "size" ? e.type === "folder" ? e.trashed ? e.inside : a.children(e.id).length : e.size ?? 0 : t === "modified" ? e.modified : t === "deleted" ? e.trashed?.at ?? e.modified : t === "origin" && e.trashed ? I(e) : t === "location" ? F(e) : e.name, i = {
			folder: 0,
			file: 1,
			app: 1
		};
		return [...e].sort((e, t) => {
			if (i[e.type] !== i[t.type]) return i[e.type] - i[t.type];
			let a = r(e), o = r(t);
			return ((typeof a == "number" ? a - o : String(a).localeCompare(String(o), u.locale, { numeric: !0 })) || e.name.localeCompare(t.name, u.locale, { numeric: !0 })) * n;
		});
	}
	#Y(e, t = e[e.length - 1] ?? this.#d) {
		this.#l = new Set(e), this.#d = t, this.render();
	}
	#X() {
		let { signal: e } = this.win, t = (e) => e.target.closest?.("[role=\"option\"], [role=\"treeitem\"]");
		this.list.addEventListener("pointerdown", (e) => {
			if (e.button !== 0 || e.target.closest(".fm-rename, .fm-head")) return;
			let n = e.target.closest("[data-twisty]");
			if (n) {
				e.preventDefault(), this.list.focus(), this.setOpen(n.dataset.twisty, !this.#s.has(n.dataset.twisty), e.altKey);
				return;
			}
			let r = t(e);
			if (!r) {
				e.ctrlKey || e.metaKey || e.shiftKey || this.#Y([]);
				return;
			}
			let i = r.dataset.id, o = this.#o.map((e) => e.id), s = !1;
			if (e.shiftKey && this.#u && o.includes(this.#u)) {
				let [t, n] = [o.indexOf(this.#u), o.indexOf(i)].sort((e, t) => e - t), r = o.slice(t, n + 1);
				this.#Y(e.ctrlKey || e.metaKey ? [.../* @__PURE__ */ new Set([...this.#l, ...r])] : r, i);
			} else if (e.ctrlKey || e.metaKey) {
				let e = new Set(this.#l);
				e.has(i) ? e.delete(i) : e.add(i), this.#u = i, this.#Y([...e], i);
			} else this.#u = i, this.#l.has(i) ? s = this.#l.size > 1 : this.#Y([i], i);
			this.inTrash && !a.isTrashed || !this.#l.has(i) || C(e, {
				ids: [...this.#l],
				stack: this.history,
				onEnd: ({ moved: e }) => {
					!e && s && this.#Y([i], i);
				}
			});
		}, { signal: e }), this.list.addEventListener("dblclick", (e) => {
			let n = t(e);
			if (!n || e.target.closest(".fm-rename, [data-twisty]")) return;
			if (this.inTrash) return this.openSelected();
			let r = a.get(n.dataset.id);
			r && this.open(r);
		}, { signal: e }), this.list.addEventListener("contextmenu", (e) => {
			if (e.preventDefault(), e.target.closest(".fm-head")) return l(e.clientX, e.clientY, this.#L());
			let n = t(e);
			if (!n) return this.#ee(e);
			this.#l.has(n.dataset.id) || this.#Y([n.dataset.id], n.dataset.id), this.#te(e);
		}, { signal: e }), this.list.addEventListener("keydown", (e) => {
			if (e.target !== this.list) return;
			if (e.altKey && [
				"ArrowLeft",
				"ArrowRight",
				"ArrowUp"
			].includes(e.key)) {
				e.preventDefault(), {
					ArrowLeft: () => this.back(),
					ArrowRight: () => this.forward(),
					ArrowUp: () => this.up()
				}[e.key]();
				return;
			}
			if (e.key === "Backspace") {
				e.preventDefault(), this.up();
				return;
			}
			if (this.tree && (e.key === "ArrowRight" || e.key === "ArrowLeft") && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
				e.preventDefault(), this.#Z(e.key === "ArrowRight");
				return;
			}
			let t = this.#$(e.key);
			if (t == null || !this.#o.length) return;
			e.preventDefault();
			let n = this.#o.map((e) => e.id), r = n.indexOf(this.#d), i = t === -Infinity ? 0 : t === Infinity ? n.length - 1 : Math.max(0, Math.min(n.length - 1, (r < 0 ? 0 : r) + t)), a = n[i];
			if (e.shiftKey) {
				this.#u ||= this.#d ?? a;
				let [e, t] = [n.indexOf(this.#u), i].sort((e, t) => e - t);
				this.#Y(n.slice(e, t + 1), a);
			} else this.#Q(a);
		}, { signal: e });
	}
	#Z(e) {
		let t = this.#o.findIndex((e) => e.id === this.#d), n = this.#o[t];
		if (!n) return;
		let r = this.#U(n), i = this.#c.get(n.id);
		if (e) {
			if (n.type !== "folder") return;
			if (!r) return this.setOpen(n.id, !0);
			let e = this.#o[t + 1];
			e && this.#c.get(e.id) > i && this.#Q(e.id);
		} else r ? this.setOpen(n.id, !1) : i > 0 && this.#Q(n.parent);
	}
	#Q(e) {
		this.#u = e, this.#Y([e], e), this.list.querySelector(`#fm-${CSS.escape(e)}`)?.scrollIntoView({ block: "nearest" });
	}
	#$(e) {
		let t = this.#n !== "list", n = t ? Math.max(1, Math.floor(this.list.clientWidth / ct[this.#n])) : 1;
		return {
			ArrowDown: n,
			ArrowUp: -n,
			Home: -Infinity,
			End: Infinity,
			...t && {
				ArrowRight: 1,
				ArrowLeft: -1
			}
		}[e] ?? null;
	}
	#ee(e) {
		let t = {
			label: j("view.menu"),
			icon: "grid",
			items: ot.map((e) => ({
				label: j(`view.${e}`),
				icon: this.#n === e ? "check" : null,
				action: () => this.setView(e)
			}))
		}, n = this.#n === "list" && {
			label: j("columns.menu"),
			icon: "list",
			items: this.#L()
		}, r = this.#o.some((e) => this.#U(e)) && {
			label: j("tree.collapseAll"),
			icon: "minus",
			action: () => {
				this.#s.clear(), this.render();
			}
		};
		if (this.inTrash) {
			let r = !this.#o.length;
			return l(e.clientX, e.clientY, [
				{
					label: j("menu.restoreAll"),
					icon: "undo",
					disabled: r,
					action: () => this.restore(a.trashed().map((e) => e.id))
				},
				{
					label: j("menu.emptyTrash"),
					icon: "trash",
					danger: !0,
					disabled: r,
					action: () => this.empty(e.clientX, e.clientY)
				},
				"-",
				t,
				n
			].filter(Boolean));
		}
		if (this.inTag) return l(e.clientX, e.clientY, [
			{
				label: j("menu.manageTags"),
				icon: "gear",
				action: () => ee("settings", { tab: "tags" })
			},
			"-",
			t,
			n,
			r
		].filter(Boolean));
		l(e.clientX, e.clientY, [
			{
				label: j("menu.newFolder"),
				icon: "folderPlus",
				action: () => this.create("folder")
			},
			{
				label: j("menu.newTextFile"),
				icon: "filePlus",
				action: () => this.create("file")
			},
			"-",
			t,
			n,
			r
		].filter(Boolean));
	}
	#te(e) {
		let t = this.#o.filter((e) => this.#l.has(e.id)), n = t.length > 1, r = M(t.length);
		if (this.inTrash) {
			let i = t.map((e) => e.id);
			return l(e.clientX, e.clientY, [
				{
					label: n ? j("menu.restoreMany", { count: r }) : j("menu.restore"),
					icon: "undo",
					action: () => this.restore(i)
				},
				{
					label: j("menu.info"),
					icon: "info",
					shortcut: f.label("files.info"),
					action: () => this.info.setOpen(!0)
				},
				"-",
				{
					label: j("menu.purge"),
					icon: "trash",
					shortcut: f.label("items.delete"),
					danger: !0,
					action: () => this.purge(i)
				}
			]);
		}
		if (!n && t[0].mount) {
			let n = Ve(t[0].id);
			if (n) return qe(this, n, e.clientX, e.clientY);
		}
		let i = t.some((e) => e.system), a = t.some((e) => e.net), o = t.map((e) => e.id), s = this.inTag, c = !n && this.tree && t[0].type === "folder" && t[0], u = c && this.#s.has(c.id);
		l(e.clientX, e.clientY, [
			{
				label: n ? j("menu.openMany", { count: r }) : j("menu.open"),
				icon: "open",
				shortcut: f.label("items.open"),
				action: () => this.openSelected()
			},
			c && {
				label: j(u ? "tree.collapse" : "tree.expand"),
				icon: u ? "minus" : "plus",
				action: () => this.setOpen(c.id, !u)
			},
			c && {
				label: j("tree.expandAll"),
				icon: "plus",
				action: () => this.setOpen(c.id, !0, !0)
			},
			!n && t[0].type === "file" && {
				label: j("menu.openWith"),
				icon: "open",
				action: () => ie(t[0], { choose: !0 })
			},
			!n && t[0].type === "folder" && {
				label: j("menu.openInEditor"),
				icon: "code",
				action: () => ee("editor", { folder: t[0].id })
			},
			s && !n && {
				label: j("menu.reveal"),
				icon: "folderOpen",
				action: () => this.reveal(t[0].id)
			},
			{
				label: j("menu.rename"),
				icon: "pencil",
				shortcut: f.label("items.rename"),
				disabled: n || i,
				action: () => this.rename(t[0].id)
			},
			!a && pe(o),
			s && {
				label: j("menu.untag", { name: s.name }),
				icon: "x",
				action: () => ue(o, s.id, !1)
			},
			!a && te(o),
			{
				label: j("menu.info"),
				icon: "info",
				shortcut: f.label("files.info"),
				action: () => this.info.setOpen(!0)
			},
			!n && {
				label: j("menu.properties"),
				icon: "info",
				action: () => de(t[0].id)
			},
			..._.appActionEntries?.(o, { separator: !0 }) ?? [],
			"-",
			{
				label: n ? j("menu.deleteMany", { count: r }) : j("menu.delete"),
				icon: "trash",
				shortcut: f.label("items.delete"),
				danger: !0,
				disabled: i,
				action: () => this.remove(t.map((e) => e.id))
			}
		].filter(Boolean));
	}
	#ne(e) {
		return e === X || !!Q(e) || a.exists(e);
	}
	#re(e) {
		let t = this.list.querySelector(`[data-id="${CSS.escape(e)}"]`)?.getBoundingClientRect();
		return {
			x: t ? t.left + 40 : innerWidth / 2,
			y: t ? t.bottom : innerHeight / 2
		};
	}
	#ie(e, t) {
		for (; e.length;) {
			let n = e.pop();
			if (this.#ne(n)) {
				t.push(this.folder), this.go(n, !1);
				return;
			}
		}
	}
	#ae(e) {
		this.#p = e, this.render();
	}
	async #oe(t, n = "", r = ["ok"]) {
		if (!e.messageBox) return this.#ae(n ? `${t}: ${n}` : t), null;
		let i = await e.messageBox(this.win, {
			icon: "error",
			title: t,
			text: n,
			buttons: r
		});
		return this.list.isConnected && !this.win.el.contains(document.activeElement) && this.list.focus(), i;
	}
	notFound(e) {
		let t = j("place.home");
		this.#oe(j(e === "tag" ? "error.tagNotFound" : "error.folderNotFound"), j(e === "tag" ? "error.tagNotFoundText" : "error.folderNotFoundText", { place: t }));
	}
	#se(e) {
		let t = e.node && O.has(e.node.id);
		if (this.inTrash) return t ? this.render() : void 0;
		if (this.inTag) return this.render();
		if (e.type === "remove" && e.ids.includes(this.folder)) return this.go(e.parent && a.exists(e.parent) ? e.parent : a.root, !1);
		let n = (e) => e === this.folder || this.#s.has(e), r = n(e.parent) || n(e.from), i = e.type !== "remove" && a.isInside(this.folder, e.node.id), o = [e.parent, e.from].some((e) => e && a.exists(e) && n(a.get(e).parent));
		(r || i || o || t) && (r && e.type !== "rename" && (this.#p = ""), this.render());
	}
};
export { mt as default };
