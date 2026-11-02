import * as e from "/host/sdk.js";
import { UndoStack as t, Window as n, appIcon as r, fileType as i, fs as a, h as o, history as s, icon as c, openMenu as l, session as u, settings as d, shortcuts as f, splitName as p, storage as m, tags as h, toast as g, trackDrag as _ } from "/host/sdk.js";
import * as v from "/host/system.js";
import { DESK_NAME as y, SYSTEM_FOLDERS as b, addTarget as x, confirmRemove as S, describeWorkspace as C, dragItems as w, dropZone as T, getApp as E, handleCommand as ee, itemIcon as D, launch as te, linkEntry as ne, links as O, markItem as k, movableInto as A, moveInto as j, onWorkspacesChange as re, openFile as M, pickFile as ie, recordCreated as ae, removeNodes as oe, renameNode as se, restoreNodes as ce, setTag as le, showProperties as ue, tagDots as de, tagSubmenu as fe } from "/host/system.js";
// src/shared/i18n.js
function pe(t, n) {
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
var { t: N } = pe("files", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"File Manager\",\"@description\":\"Browse, search and organize files and folders: tags, links, desktop links, trash, info and preview.\",\"@commands.files.info.label\":\"Show or hide the info panel\",\"@commands.files.preview.label\":\"Show or hide the preview\",\"@commands.files.address.label\":\"Type a path\",\"@entrypoints.main.params.folder.label\":\"Folder\",\"@entrypoints.main.params.folder.description\":\"The folder it shows when it opens\",\"@entrypoints.newLink.label\":\"New link\",\"@entrypoints.newLink.params.folder.label\":\"Folder\",\"@entrypoints.newLink.params.folder.description\":\"Where the link is made\",\"menu.newLink\":\"New link…\",\"type.linkWeb\":\"Link to a web page\",\"newLink.title\":\"New link\",\"newLink.address\":\"Path or address\",\"newLink.address.placeholder\":\"~/Documenti/Note.txt or sftp://server/folder\",\"newLink.address.hint\":\"A path of lilOS, or an address with its protocol: sftp://user@server/folder, smb://server/share/folder, webdavs://server/folder, https://… for a web page. Folders are always separated by /.\",\"newLink.browse\":\"Browse…\",\"newLink.browseFile\":\"A file…\",\"newLink.browseFolder\":\"A folder…\",\"newLink.pickFile\":\"Choose the file of the link\",\"newLink.pickFolder\":\"Choose the folder of the link\",\"newLink.name\":\"Name\",\"newLink.make\":\"Create\",\"newLink.checking\":\"Looking for it on the server…\",\"newLink.error.empty\":\"Write a path or an address\",\"newLink.error.backslash\":\"Use / to separate folders, for SMB too: smb://server/share/folder\",\"newLink.error.slashes\":\"An address starts with its protocol and //, for example sftp://server/folder\",\"newLink.error.password\":\"Don’t write the password in the address: the connection asks for it\",\"newLink.error.host\":\"The server in the address is not valid\",\"newLink.error.path\":\"The path in the address is not valid\",\"newLink.error.noPath\":\"“{path}” does not exist\",\"newLink.error.notLinkable\":\"A link points to a file or a folder\",\"newLink.error.protocol\":\"No module of lilOS knows the protocol {protocol}: an administrator can add it from the AppStore → Kernel\",\"newLink.error.noConnection\":\"Without a connection to that server the link can’t be made\",\"newLink.error.otherFolder\":\"The connection “{name}” opens another folder: the address is outside it\",\"newLink.error.noRemote\":\"“{path}” does not exist on “{name}”\",\"newLink.error.noName\":\"Write a name\",\"newLink.error.folderGone\":\"The folder of the link is not there any more\",\"@automation.files.go.label\":\"Go to a folder\",\"@automation.files.go.params.folder.label\":\"Folder\",\"@automation.files.search.label\":\"Search the folder\",\"@automation.files.search.params.query.label\":\"Search for\",\"@automation.files.sort.label\":\"Sort\",\"@automation.files.sort.params.by.label\":\"Sort by\",\"@automation.files.sort.params.by.options.name.label\":\"Name\",\"@automation.files.sort.params.by.options.modified.label\":\"Modified\",\"@automation.files.sort.params.by.options.size.label\":\"Size\",\"@automation.files.sort.params.by.options.type.label\":\"Type\",\"@automation.files.sort.params.by.options.workspace.label\":\"Workspace\",\"@automation.files.sort.params.by.options.location.label\":\"Location\",\"@automation.files.sort.params.by.options.deleted.label\":\"Deleted\",\"@automation.files.sort.params.by.options.origin.label\":\"Original location\",\"@automation.files.sort.params.direction.label\":\"Order\",\"@automation.files.sort.params.direction.options.asc.label\":\"Ascending\",\"@automation.files.sort.params.direction.options.desc.label\":\"Descending\",\"@automation.files.view.label\":\"Change the view\",\"@automation.files.view.params.mode.label\":\"View\",\"@automation.files.view.params.mode.options.list.label\":\"List\",\"@automation.files.view.params.mode.options.grid.label\":\"Icons\",\"@automation.files.view.params.mode.options.thumbs.label\":\"Previews\",\"toolbar.back\":\"Back (Alt ←)\",\"toolbar.forward\":\"Forward (Alt →)\",\"toolbar.up\":\"Parent folder (Alt ↑)\",\"toolbar.path\":\"Path\",\"toolbar.address\":\"Path: type a folder and press Enter\",\"toolbar.search\":\"Search this folder\",\"toolbar.searchIn\":\"Search {name}\",\"view.list\":\"List view\",\"view.grid\":\"Icon view\",\"view.thumbs\":\"Preview view\",\"view.menu\":\"View\",\"list.label\":\"Folder contents\",\"list.more\":\"and {count} more\",\"rename.label\":\"New name\",\"create.folderName\":\"New folder\",\"create.fileName\":\"New file.txt\",\"panel.info.title\":\"Info\",\"panel.info.show\":\"Show the info panel\",\"panel.info.hide\":\"Hide the info panel\",\"panel.info.resize\":\"Info panel width\",\"panel.info.close\":\"Close the info panel\",\"panel.preview.title\":\"Preview\",\"panel.preview.show\":\"Show the preview\",\"panel.preview.hide\":\"Hide the preview\",\"panel.preview.resize\":\"Preview panel width\",\"panel.preview.close\":\"Close the preview panel\",\"place.home\":\"Home\",\"place.trash\":\"Trash\",\"place.tag\":\"Tag “{name}”\",\"side.label\":\"Places\",\"side.links\":\"Links\",\"side.tags\":\"Tags\",\"side.tagHidden\":\"{name}: invisible tag, its items are hidden elsewhere\",\"side.unlinkTitle\":\"Remove the link (the file stays)\",\"link.remove\":\"Remove the link to “{name}”\",\"side.collapse\":\"Collapse {name}\",\"side.expand\":\"Expand {name}\",\"link.notFound\":\"Not found\",\"link.mountGone\":\"Removed connection\",\"column.name\":\"Name\",\"column.modified\":\"Modified\",\"column.deleted\":\"Deleted\",\"column.size\":\"Size\",\"column.type\":\"Type\",\"column.workspace\":\"Workspace\",\"column.origin\":\"Original location\",\"column.location\":\"Location\",\"column.resize\":\"Width of the “{name}” column\",\"column.resizeTitle\":\"Drag to resize, double-click to fit the content\",\"columns.menu\":\"Columns\",\"columns.fitAll\":\"Fit all columns to their content\",\"columns.reset\":\"Default columns\",\"tree.expand\":\"Show contents here\",\"tree.expandAll\":\"Show contents with all subfolders\",\"tree.collapse\":\"Hide contents\",\"tree.collapseAll\":\"Close all folders\",\"tree.expandTitle\":\"Show contents (Alt-click: with subfolders)\",\"tree.collapseTitle\":\"Hide contents\",\"tile.deleted\":\"Deleted: {date}\",\"tile.origin\":\"Original location: {place}\",\"tile.location\":\"Location: {place}\",\"tile.tags\":\"Tags: {names}\",\"trash.restoresTo\":\"Goes back to {place} when restored\",\"trash.keptForever\":\"Items stay until you delete them\",\"trash.keptDays\":{\"one\":\"Deleted permanently after {count} day\",\"other\":\"Deleted permanently after {count} days\"},\"type.folder\":\"Folder\",\"type.app\":\"App\",\"type.appLink\":\"Link to an app\",\"type.linkFolder\":\"Link to a folder\",\"type.linkFile\":\"Link to a file\",\"owner.unknown\":\"Unknown\",\"owner.shared\":\"Shared\",\"owner.removed\":\"{name} (deleted)\",\"owner.label\":\"Workspace: {name}\",\"count.items\":{\"zero\":\"Empty\",\"one\":\"{count} item\",\"other\":\"{count} items\"},\"empty.noMatch\":\"No items match “{query}”\",\"empty.trash\":\"The trash is empty\",\"empty.tag\":\"No items have this tag. Add it from the right-click menu → Tag.\",\"empty.folder\":\"This folder is empty\",\"status.items\":{\"one\":\"{count} item\",\"other\":\"{count} items\"},\"status.selected\":{\"one\":\"{count} selected\",\"other\":\"{count} selected\"},\"status.tag\":\"All items with this tag\",\"status.tagHidden\":\"Invisible tag: these items are hidden elsewhere\",\"message.hiddenByTag\":\"“{name}” is hidden by an invisible tag\",\"message.restoreToOpen\":\"To open it, restore it (right-click → Restore)\",\"message.systemFolders\":\"System folders can’t be deleted\",\"message.noPath\":\"“{path}” doesn’t exist\",\"message.typePath\":\"Type the path of a folder, such as {path}\",\"error.notFile\":\"Not a file\",\"error.rename\":\"Can’t rename “{name}”\",\"error.deskLink\":\"Can’t add the link to the desktop\",\"error.createFolder\":\"Can’t create the folder\",\"error.createFile\":\"Can’t create the file\",\"error.delete\":\"Can’t delete\",\"error.pathNotFound\":\"Path not found\",\"error.folderNotFound\":\"Folder not found\",\"error.folderNotFoundText\":\"The folder to open no longer exists: showing {place} instead.\",\"error.tagNotFound\":\"Tag not found\",\"error.tagNotFoundText\":\"The tag to show no longer exists: showing {place} instead.\",\"automation.noFolder\":\"The folder is not there any more\",\"automation.noColumn\":\"This folder has no such column to sort by\",\"automation.noView\":\"Unknown view\",\"toast.restored\":\"Restored “{name}” to {place}\",\"toast.restoredMany\":\"Restored {count} items to {place}\",\"toast.restoredManyPlaces\":\"Restored {count} items to {folders} folders\",\"toast.unlinked\":\"Link to “{name}” removed\",\"toast.linksAdded\":{\"one\":\"Link added\",\"other\":\"{count} links added\"},\"toast.deskLinks\":{\"one\":\"Link added to the desktop\",\"other\":\"{count} links added to the desktop\"},\"toast.trashed\":{\"one\":\"Moved to the trash\",\"other\":\"{count} items moved to the trash\"},\"confirm.purge\":\"Delete “{name}” permanently\",\"confirm.purgeMany\":\"Delete {count} items permanently\",\"confirm.emptyTrash\":{\"one\":\"Delete the item in the trash permanently\",\"other\":\"Delete all {count} items in the trash permanently\"},\"confirm.cancel\":\"Cancel\",\"menu.open\":\"Open\",\"menu.openMany\":\"Open {count} items\",\"menu.openWith\":\"Open with…\",\"menu.openInEditor\":\"Open in Editor\",\"menu.reveal\":\"Show in folder\",\"menu.unlink\":\"Remove the link\",\"menu.deskLink\":\"Add a link to the desktop\",\"menu.rename\":\"Rename\",\"menu.untag\":\"Remove the tag “{name}”\",\"menu.info\":\"Info\",\"menu.properties\":\"Properties…\",\"menu.delete\":\"Delete\",\"menu.deleteMany\":\"Delete {count} items\",\"menu.restore\":\"Restore\",\"menu.restoreMany\":\"Restore {count} items\",\"menu.restoreAll\":\"Restore all\",\"menu.purge\":\"Delete permanently…\",\"menu.emptyTrash\":\"Empty the trash…\",\"menu.manageTags\":\"Manage tags…\",\"menu.newFolder\":\"New folder\",\"menu.newTextFile\":\"New text file\",\"info.folderHint\":\"Nothing selected: here is the open folder.\",\"info.general\":\"General\",\"info.organization\":\"Organization\",\"info.attributes\":\"Attributes\",\"info.text\":\"Text\",\"info.items\":\"Items\",\"info.type\":\"Type\",\"info.types\":\"Types\",\"info.app\":\"App\",\"info.linkTarget\":\"Points to\",\"info.linkState\":\"State\",\"info.linkBroken\":\"Broken: the original was not found the last time\",\"info.appMissing\":\"{id} (not installed)\",\"info.size\":\"Size\",\"info.bytesDetail\":\"{size} ({count} bytes)\",\"info.contents\":\"Contents\",\"info.contentsTotal\":\"{items}, {total} in all\",\"info.insideFolders\":{\"one\":\"{count} item in the folders\",\"other\":\"{count} items in the folders\"},\"info.deleted\":\"Deleted\",\"info.lastDeleted\":\"Last deleted\",\"info.origin\":\"Original location\",\"info.path\":\"Path\",\"info.location\":\"Location\",\"info.manyFolders\":\"{count} different folders\",\"info.created\":\"Created\",\"info.modified\":\"Modified\",\"info.oldest\":\"Oldest\",\"info.newest\":\"Newest\",\"info.workspace\":\"Workspace\",\"info.tags\":\"Tags\",\"info.common\":\"In common\",\"info.none\":\"None\",\"info.tagHidden\":\"{name} (invisible tag)\",\"info.tagKind\":\"Tag\",\"info.retention\":\"Retention\",\"info.visibility\":\"Visibility\",\"info.visible\":\"Visible\",\"info.invisible\":\"Invisible: its items are hidden elsewhere\",\"info.lines\":\"Lines\",\"info.words\":\"Words\",\"info.chars\":\"Characters\",\"info.folders\":{\"one\":\"{count} folder\",\"other\":\"{count} folders\"},\"info.files\":{\"one\":\"{count} file\",\"other\":\"{count} files\"},\"info.apps\":{\"one\":\"{count} app\",\"other\":\"{count} apps\"},\"note.system\":\"System item: it can’t be renamed or deleted\",\"note.private\":\"Private: visible only in its workspace\",\"note.hidden\":\"Hidden by an invisible tag\",\"note.linked\":\"In the sidebar (Links)\",\"selection.count\":\"{count} items selected\",\"preview.none\":\"Nothing selected\",\"preview.selectFile\":\"Select a file to see its contents\",\"preview.oneAtATime\":\"The preview shows one item at a time\",\"preview.trashed\":\"In the trash\",\"preview.restoreToSee\":\"Restore it to see its contents\",\"preview.loading\":\"Loading…\",\"preview.readError\":\"Can’t read the file\",\"preview.open\":\"Open\",\"preview.launch\":\"Launch\",\"preview.emptyFile\":\"Empty file\",\"preview.emptyFolder\":\"Empty folder\",\"preview.imageAlt\":\"Preview of {name}\",\"preview.unavailable\":\"No preview available\",\"preview.notText\":\"The file doesn’t contain text\",\"preview.contentsOf\":\"Contents of {name}\",\"preview.cut\":\"Showing the first {shown} of {total} characters: open the file to see all of it\",\"preview.childTitle\":\"{name} — double-click to open\",\"preview.appMissing\":\"App not installed\",\"preview.byApp\":\"Preview made by {app}\",\"net.section\":\"Network\",\"net.add\":\"Connect to a server…\",\"net.none\":\"No connections\",\"net.state.on\":\"Connected\",\"net.state.connecting\":\"Connecting…\",\"net.state.off\":\"Not connected\",\"net.state.error\":\"Cannot connect\",\"net.menu.open\":\"Open\",\"net.menu.connect\":\"Connect\",\"net.menu.disconnect\":\"Disconnect\",\"net.menu.edit\":\"Edit connection…\",\"net.menu.remove\":\"Remove connection\",\"net.remove.title\":\"Remove the connection «{name}»?\",\"net.remove.text\":\"Its folder leaves Network and its saved password is deleted. The files on the server stay where they are.\",\"net.bar.on\":\"Connected to\",\"net.loading\":\"Reading the folder from the server…\",\"net.notRead\":\"The folder could not be read from the server\",\"net.error.title\":\"Network\",\"net.error.read\":\"Cannot read «{name}»\",\"net.preview.big\":\"Not shown: the file is on a server and is bigger than 1 MB\",\"net.trust.title\":\"Confirm the server of «{name}»\",\"net.trust.ssh\":\"This is the first time lilOS connects to this server, or its key changed. Key fingerprint:\\n{fingerprint}\\n\\nContinue only if it matches the server's.\",\"net.trust.tls\":\"The server's certificate is not valid (self-signed, expired or for another name). Certificate fingerprint:\\n{fingerprint}\\n\\nContinue only if you trust this server.\",\"net.trust.first\":\"Server to confirm.\",\"net.trust.key\":\"Key fingerprint:\",\"net.trust.cert\":\"The certificate is not valid. Its fingerprint:\",\"net.trust.check\":\"Confirm only if it matches the server's.\",\"net.trust.go\":\"Confirm and connect\",\"net.connect.title\":\"Connect to a server\",\"net.edit.title\":\"Connection «{name}»\",\"net.protocol\":\"Protocol\",\"net.name\":\"Folder name in Network\",\"net.name.hint\":\"It will be {path}\",\"net.remember\":\"Remember the password (kept encrypted by lilOS)\",\"net.auto\":\"Connect when I sign in\",\"net.test\":\"Try\",\"net.testing\":\"Trying…\",\"net.test.ok\":\"It works: the server answers and the folder can be read\",\"net.connecting\":\"Connecting…\",\"net.connect.go\":\"Connect\",\"net.save\":\"Save and connect\",\"net.cancel\":\"Cancel\",\"net.later\":\"Later\",\"net.remember.signin\":\"Remember the sign-in (lilOS keeps it encrypted)\",\"net.web.open\":\"Open in the browser\",\"net.web.only\":\"It opens only on the provider's site\",\"net.web.copiedAs\":\"It opens on the provider's site; copied out, it becomes a {ext} file\",\"net.space.of\":\"{used} of {total} used\",\"net.space.used\":\"{used} used\",\"net.group.server\":\"Servers\",\"net.group.cloud\":\"Cloud\",\"net.group.local\":\"Local network\",\"net.signin.paste.text\":\"Sign in in the tab that opened. At the end the browser shows a page that does not open: copy its whole address from the address bar and paste it here.\",\"net.signin.paste.label\":\"Address of the page that did not open\",\"net.signin.paste.go\":\"Continue\",\"net.import.where\":\"Where to copy them\",\"net.import.change\":\"Change…\",\"net.import.step\":\"Pick photos and videos\",\"net.import.pick\":\"Pick in a new tab\",\"net.import.hint\":\"Google's page opens in a new tab: select up to 2000 items and press Done. The copy must start within an hour.\",\"net.import.opening\":\"Opening the page to pick…\",\"net.import.waiting\":\"Waiting for your choice in the other tab…\",\"net.import.picked\":\"{count} items picked: press Import\",\"net.import.none\":\"Nothing was picked\",\"net.import.failed\":\"Import failed\",\"net.import.go\":\"Import\",\"message.noRename\":\"«{name}» can’t be renamed here\",\"message.noRemove\":\"These items can’t be removed here\",\"net.signin.button\":\"Sign in\",\"net.signin.waiting\":\"Finish signing in in the window that opened…\",\"net.signin.blocked\":\"The browser blocked the sign-in window: allow pop-ups for lilOS and try again\",\"net.signin.other\":\"Use another account\",\"net.signin.again.title\":\"Sign in again to «{name}»\",\"net.signin.again.text\":\"The provider asks to sign in again for {account}.\",\"net.notReady.title\":\"{name} is not ready on this lilOS yet\",\"net.notReady.settings\":\"Open the settings\",\"office.open.word\":\"Open in Word online\",\"office.open.excel\":\"Open in Excel online\",\"office.open.powerpoint\":\"Open in PowerPoint online\",\"office.upload\":\"Upload to OneDrive and open\",\"office.none\":\"Connect OneDrive first (Rete → +)\",\"office.pick\":\"Upload to:\",\"office.uploaded\":\"«{name}» is on {folder}: what you change in Office is saved there\",\"office.again\":\"Signed in again: try once more\",\"office.failed\":\"«{name}» not uploaded\",\"office.exists.title\":\"File already on OneDrive\",\"office.exists.text\":\"There is already «{name}» in {folder}. Replace it with this one (what was changed online is lost), or keep both?\",\"office.exists.keep\":\"Keep both\",\"office.exists.replace\":\"Replace\",\"net.missing\":\"Missing: {fields}\",\"net.secret.unchanged\":\"unchanged\",\"net.file.browse\":\"Browse…\",\"net.file.none\":\"No file chosen\",\"net.file.chosen\":\"File chosen\",\"net.shares.list\":\"List…\",\"net.shares.none\":\"The server shares nothing you can see\",\"net.password.title\":\"Password for «{name}»\",\"net.password.text\":\"lilOS needs the password to connect to {address}.\",\"net.password.wrong\":\"The user or the password is not right\",\"net.trust.changed.title\":\"The server of «{name}» CHANGED its key\",\"net.trust.changed\":\"The key or certificate of this server is not the one you confirmed. Someone may be pretending to be the server: continue only if you know it was changed on purpose.\\n\\nBefore: {previous}\\nNow: {fingerprint}\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"File Manager\",\"@description\":\"Sfoglia, cerca e organizza file e cartelle: tag, collegamenti, collegamenti sul desktop, cestino, informazioni e anteprima.\",\"@commands.files.info.label\":\"Mostra o nascondi le informazioni\",\"@commands.files.preview.label\":\"Mostra o nascondi l’anteprima\",\"@commands.files.address.label\":\"Scrivi un percorso\",\"@entrypoints.main.params.folder.label\":\"Cartella\",\"@entrypoints.main.params.folder.description\":\"La cartella che mostra all’apertura\",\"@entrypoints.newLink.label\":\"Nuovo collegamento\",\"@entrypoints.newLink.params.folder.label\":\"Cartella\",\"@entrypoints.newLink.params.folder.description\":\"Dove si crea il collegamento\",\"menu.newLink\":\"Nuovo collegamento…\",\"type.linkWeb\":\"Collegamento a una pagina web\",\"newLink.title\":\"Nuovo collegamento\",\"newLink.address\":\"Percorso o indirizzo\",\"newLink.address.placeholder\":\"~/Documenti/Note.txt o sftp://server/cartella\",\"newLink.address.hint\":\"Un percorso di lilOS, o un indirizzo con il protocollo: sftp://utente@server/cartella, smb://server/condivisione/cartella, webdavs://server/cartella, https://… per una pagina web. Le cartelle si separano sempre con /.\",\"newLink.browse\":\"Sfoglia…\",\"newLink.browseFile\":\"Un file…\",\"newLink.browseFolder\":\"Una cartella…\",\"newLink.pickFile\":\"Scegli il file del collegamento\",\"newLink.pickFolder\":\"Scegli la cartella del collegamento\",\"newLink.name\":\"Nome\",\"newLink.make\":\"Crea\",\"newLink.checking\":\"Lo cerco sul server…\",\"newLink.error.empty\":\"Scrivi un percorso o un indirizzo\",\"newLink.error.backslash\":\"Usa / per separare le cartelle, anche per SMB: smb://server/condivisione/cartella\",\"newLink.error.slashes\":\"Un indirizzo comincia con il protocollo e //, per esempio sftp://server/cartella\",\"newLink.error.password\":\"Non scrivere la password nell’indirizzo: la chiede la connessione\",\"newLink.error.host\":\"Il server nell’indirizzo non è valido\",\"newLink.error.path\":\"Il percorso nell’indirizzo non è valido\",\"newLink.error.noPath\":\"«{path}» non esiste\",\"newLink.error.notLinkable\":\"Un collegamento punta a un file o a una cartella\",\"newLink.error.protocol\":\"Nessun modulo di lilOS conosce il protocollo {protocol}: un amministratore può aggiungerlo dall’AppStore → Kernel\",\"newLink.error.noConnection\":\"Senza una connessione a quel server il collegamento non si può creare\",\"newLink.error.otherFolder\":\"La connessione «{name}» apre un’altra cartella: l’indirizzo è fuori da quella\",\"newLink.error.noRemote\":\"«{path}» non esiste su «{name}»\",\"newLink.error.noName\":\"Scrivi un nome\",\"newLink.error.folderGone\":\"La cartella del collegamento non c’è più\",\"@automation.files.go.label\":\"Vai a una cartella\",\"@automation.files.go.params.folder.label\":\"Cartella\",\"@automation.files.search.label\":\"Cerca nella cartella\",\"@automation.files.search.params.query.label\":\"Cerca\",\"@automation.files.sort.label\":\"Ordina\",\"@automation.files.sort.params.by.label\":\"Ordina per\",\"@automation.files.sort.params.by.options.name.label\":\"Nome\",\"@automation.files.sort.params.by.options.modified.label\":\"Modificato\",\"@automation.files.sort.params.by.options.size.label\":\"Dimensione\",\"@automation.files.sort.params.by.options.type.label\":\"Tipo\",\"@automation.files.sort.params.by.options.workspace.label\":\"Workspace\",\"@automation.files.sort.params.by.options.location.label\":\"Posizione\",\"@automation.files.sort.params.by.options.deleted.label\":\"Eliminato\",\"@automation.files.sort.params.by.options.origin.label\":\"Posizione originale\",\"@automation.files.sort.params.direction.label\":\"Ordine\",\"@automation.files.sort.params.direction.options.asc.label\":\"Crescente\",\"@automation.files.sort.params.direction.options.desc.label\":\"Decrescente\",\"@automation.files.view.label\":\"Cambia vista\",\"@automation.files.view.params.mode.label\":\"Vista\",\"@automation.files.view.params.mode.options.list.label\":\"Elenco\",\"@automation.files.view.params.mode.options.grid.label\":\"Icone\",\"@automation.files.view.params.mode.options.thumbs.label\":\"Anteprime\",\"toolbar.back\":\"Indietro (Alt ←)\",\"toolbar.forward\":\"Avanti (Alt →)\",\"toolbar.up\":\"Cartella superiore (Alt ↑)\",\"toolbar.path\":\"Percorso\",\"toolbar.address\":\"Percorso: scrivi una cartella e premi Invio\",\"toolbar.search\":\"Cerca nella cartella\",\"toolbar.searchIn\":\"Cerca in {name}\",\"view.list\":\"Vista elenco\",\"view.grid\":\"Vista a icone\",\"view.thumbs\":\"Vista anteprime\",\"view.menu\":\"Vista\",\"list.label\":\"Contenuto della cartella\",\"list.more\":\"e altri {count}\",\"rename.label\":\"Nuovo nome\",\"create.folderName\":\"Nuova cartella\",\"create.fileName\":\"Nuovo file.txt\",\"panel.info.title\":\"Informazioni\",\"panel.info.show\":\"Mostra le informazioni\",\"panel.info.hide\":\"Nascondi le informazioni\",\"panel.info.resize\":\"Larghezza del pannello delle informazioni\",\"panel.info.close\":\"Chiudi il pannello delle informazioni\",\"panel.preview.title\":\"Anteprima\",\"panel.preview.show\":\"Mostra l’anteprima\",\"panel.preview.hide\":\"Nascondi l’anteprima\",\"panel.preview.resize\":\"Larghezza del pannello dell’anteprima\",\"panel.preview.close\":\"Chiudi il pannello dell’anteprima\",\"place.home\":\"Home\",\"place.trash\":\"Cestino\",\"place.tag\":\"Tag «{name}»\",\"side.label\":\"Risorse\",\"side.links\":\"Collegamenti\",\"side.tags\":\"Tag\",\"side.tagHidden\":\"{name}: tag invisibile, i suoi elementi sono nascosti altrove\",\"side.unlinkTitle\":\"Elimina il collegamento (il file resta)\",\"link.remove\":\"Elimina il collegamento a «{name}»\",\"side.collapse\":\"Comprimi {name}\",\"side.expand\":\"Espandi {name}\",\"link.notFound\":\"Non trovato\",\"link.mountGone\":\"Connessione rimossa\",\"column.name\":\"Nome\",\"column.modified\":\"Modificato\",\"column.deleted\":\"Eliminato\",\"column.size\":\"Dimensione\",\"column.type\":\"Tipo\",\"column.workspace\":\"Workspace\",\"column.origin\":\"Posizione originale\",\"column.location\":\"Posizione\",\"column.resize\":\"Larghezza della colonna «{name}»\",\"column.resizeTitle\":\"Trascina per ridimensionare, doppio clic per adattare al contenuto\",\"columns.menu\":\"Colonne\",\"columns.fitAll\":\"Adatta tutte le colonne al contenuto\",\"columns.reset\":\"Ripristina le colonne\",\"tree.expand\":\"Mostra il contenuto qui\",\"tree.expandAll\":\"Mostra il contenuto con tutte le sottocartelle\",\"tree.collapse\":\"Nascondi il contenuto\",\"tree.collapseAll\":\"Chiudi tutte le cartelle\",\"tree.expandTitle\":\"Mostra il contenuto (Alt+clic: anche le sottocartelle)\",\"tree.collapseTitle\":\"Nascondi il contenuto\",\"tile.deleted\":\"Eliminato: {date}\",\"tile.origin\":\"Posizione originale: {place}\",\"tile.location\":\"Posizione: {place}\",\"tile.tags\":\"Tag: {names}\",\"trash.restoresTo\":\"Ripristinando torna in {place}\",\"trash.keptForever\":\"Gli elementi restano finché non li elimini\",\"trash.keptDays\":{\"one\":\"Eliminati definitivamente dopo {count} giorno\",\"other\":\"Eliminati definitivamente dopo {count} giorni\"},\"type.folder\":\"Cartella\",\"type.app\":\"App\",\"type.appLink\":\"Collegamento a un’app\",\"type.linkFolder\":\"Collegamento a una cartella\",\"type.linkFile\":\"Collegamento a un file\",\"owner.unknown\":\"Sconosciuto\",\"owner.shared\":\"Condiviso\",\"owner.removed\":\"{name} (eliminato)\",\"owner.label\":\"Workspace: {name}\",\"count.items\":{\"zero\":\"Vuota\",\"one\":\"{count} elemento\",\"other\":\"{count} elementi\"},\"empty.noMatch\":\"Nessun elemento corrisponde a «{query}»\",\"empty.trash\":\"Il cestino è vuoto\",\"empty.tag\":\"Nessun elemento ha questo tag. Si assegna dal menu del tasto destro → Tag.\",\"empty.folder\":\"Questa cartella è vuota\",\"status.items\":{\"one\":\"{count} elemento\",\"other\":\"{count} elementi\"},\"status.selected\":{\"one\":\"{count} selezionato\",\"other\":\"{count} selezionati\"},\"status.tag\":\"Tutti gli elementi con questo tag\",\"status.tagHidden\":\"Tag invisibile: questi elementi sono nascosti altrove\",\"message.hiddenByTag\":\"«{name}» è nascosto da un tag invisibile\",\"message.restoreToOpen\":\"Per aprirlo, ripristinalo (clic destro → Ripristina)\",\"message.systemFolders\":\"Le cartelle di sistema non si possono eliminare\",\"message.noPath\":\"«{path}» non esiste\",\"message.typePath\":\"Scrivi il percorso di una cartella, come {path}\",\"error.notFile\":\"Non è un file\",\"error.rename\":\"Impossibile rinominare «{name}»\",\"error.deskLink\":\"Impossibile aggiungere il collegamento al desktop\",\"error.createFolder\":\"Impossibile creare la cartella\",\"error.createFile\":\"Impossibile creare il file\",\"error.delete\":\"Impossibile eliminare\",\"error.pathNotFound\":\"Percorso non trovato\",\"error.folderNotFound\":\"Cartella non trovata\",\"error.folderNotFoundText\":\"La cartella da aprire non esiste più: al suo posto c’è {place}.\",\"error.tagNotFound\":\"Tag non trovato\",\"error.tagNotFoundText\":\"Il tag da mostrare non esiste più: al suo posto c’è {place}.\",\"automation.noFolder\":\"La cartella non c’è più\",\"automation.noColumn\":\"Questa cartella non ha una colonna per cui ordinare così\",\"automation.noView\":\"Vista sconosciuta\",\"toast.restored\":\"Ripristinato «{name}» in {place}\",\"toast.restoredMany\":\"Ripristinati {count} elementi in {place}\",\"toast.restoredManyPlaces\":\"Ripristinati {count} elementi in {folders} cartelle\",\"toast.unlinked\":\"Collegamento a «{name}» eliminato\",\"toast.linksAdded\":{\"one\":\"Collegamento aggiunto\",\"other\":\"{count} collegamenti aggiunti\"},\"toast.deskLinks\":{\"one\":\"Collegamento aggiunto al desktop\",\"other\":\"{count} collegamenti aggiunti al desktop\"},\"toast.trashed\":{\"one\":\"Spostato nel cestino\",\"other\":\"{count} elementi spostati nel cestino\"},\"confirm.purge\":\"Elimina definitivamente «{name}»\",\"confirm.purgeMany\":\"Elimina definitivamente {count} elementi\",\"confirm.emptyTrash\":{\"one\":\"Elimina definitivamente l’elemento nel cestino\",\"other\":\"Elimina definitivamente tutti i {count} elementi nel cestino\"},\"confirm.cancel\":\"Annulla\",\"menu.open\":\"Apri\",\"menu.openMany\":\"Apri {count} elementi\",\"menu.openWith\":\"Apri con…\",\"menu.openInEditor\":\"Apri nell’Editor\",\"menu.reveal\":\"Mostra nella cartella\",\"menu.unlink\":\"Elimina il collegamento\",\"menu.deskLink\":\"Aggiungi un collegamento al desktop\",\"menu.rename\":\"Rinomina\",\"menu.untag\":\"Togli il tag «{name}»\",\"menu.info\":\"Informazioni\",\"menu.properties\":\"Proprietà…\",\"menu.delete\":\"Elimina\",\"menu.deleteMany\":\"Elimina {count} elementi\",\"menu.restore\":\"Ripristina\",\"menu.restoreMany\":\"Ripristina {count} elementi\",\"menu.restoreAll\":\"Ripristina tutto\",\"menu.purge\":\"Elimina definitivamente…\",\"menu.emptyTrash\":\"Svuota il cestino…\",\"menu.manageTags\":\"Gestisci i tag…\",\"menu.newFolder\":\"Nuova cartella\",\"menu.newTextFile\":\"Nuovo file di testo\",\"info.folderHint\":\"Nessun elemento selezionato: ecco la cartella aperta.\",\"info.general\":\"Generali\",\"info.organization\":\"Organizzazione\",\"info.attributes\":\"Attributi\",\"info.text\":\"Testo\",\"info.items\":\"Elementi\",\"info.type\":\"Tipo\",\"info.types\":\"Tipi\",\"info.app\":\"App\",\"info.linkTarget\":\"Originale\",\"info.linkState\":\"Stato\",\"info.linkBroken\":\"Rotto: l’originale non è stato trovato l’ultima volta\",\"info.appMissing\":\"{id} (non installata)\",\"info.size\":\"Dimensione\",\"info.bytesDetail\":\"{size} ({count} byte)\",\"info.contents\":\"Contenuto\",\"info.contentsTotal\":\"{items}, {total} in tutto\",\"info.insideFolders\":{\"one\":\"{count} elemento nelle cartelle\",\"other\":\"{count} elementi nelle cartelle\"},\"info.deleted\":\"Eliminato\",\"info.lastDeleted\":\"Ultima eliminazione\",\"info.origin\":\"Posizione originale\",\"info.path\":\"Percorso\",\"info.location\":\"Posizione\",\"info.manyFolders\":\"{count} cartelle diverse\",\"info.created\":\"Creato\",\"info.modified\":\"Modificato\",\"info.oldest\":\"Meno recente\",\"info.newest\":\"Più recente\",\"info.workspace\":\"Workspace\",\"info.tags\":\"Tag\",\"info.common\":\"In comune\",\"info.none\":\"Nessuno\",\"info.tagHidden\":\"{name} (tag invisibile)\",\"info.tagKind\":\"Tag\",\"info.retention\":\"Conservazione\",\"info.visibility\":\"Visibilità\",\"info.visible\":\"Visibile\",\"info.invisible\":\"Invisibile: i suoi elementi sono nascosti altrove\",\"info.lines\":\"Righe\",\"info.words\":\"Parole\",\"info.chars\":\"Caratteri\",\"info.folders\":{\"one\":\"{count} cartella\",\"other\":\"{count} cartelle\"},\"info.files\":{\"one\":\"{count} file\",\"other\":\"{count} file\"},\"info.apps\":{\"one\":\"{count} app\",\"other\":\"{count} app\"},\"note.system\":\"Di sistema: non si rinomina e non si elimina\",\"note.private\":\"Privata: si vede solo nel suo workspace\",\"note.hidden\":\"Nascosto da un tag invisibile\",\"note.linked\":\"Nella barra laterale (Collegamenti)\",\"selection.count\":\"{count} elementi selezionati\",\"preview.none\":\"Nessun elemento selezionato\",\"preview.selectFile\":\"Seleziona un file per vederne il contenuto\",\"preview.oneAtATime\":\"L’anteprima mostra un elemento alla volta\",\"preview.trashed\":\"Nel cestino\",\"preview.restoreToSee\":\"Ripristinalo per vederne il contenuto\",\"preview.loading\":\"Caricamento…\",\"preview.readError\":\"Impossibile leggere il file\",\"preview.open\":\"Apri\",\"preview.launch\":\"Avvia\",\"preview.emptyFile\":\"File vuoto\",\"preview.emptyFolder\":\"Cartella vuota\",\"preview.imageAlt\":\"Anteprima di {name}\",\"preview.unavailable\":\"Anteprima non disponibile\",\"preview.notText\":\"Il file non contiene testo\",\"preview.contentsOf\":\"Contenuto di {name}\",\"preview.cut\":\"Mostrati i primi {shown} caratteri su {total}: apri il file per vederlo tutto\",\"preview.childTitle\":\"{name} — doppio clic per aprire\",\"preview.appMissing\":\"App non installata\",\"preview.byApp\":\"Anteprima creata da {app}\",\"net.section\":\"Rete\",\"net.add\":\"Connetti a un server…\",\"net.none\":\"Nessuna connessione\",\"net.state.on\":\"Connessa\",\"net.state.connecting\":\"Connessione in corso…\",\"net.state.off\":\"Non connessa\",\"net.state.error\":\"Non si connette\",\"net.menu.open\":\"Apri\",\"net.menu.connect\":\"Connetti\",\"net.menu.disconnect\":\"Disconnetti\",\"net.menu.edit\":\"Modifica connessione…\",\"net.menu.remove\":\"Rimuovi connessione\",\"net.remove.title\":\"Rimuovere la connessione «{name}»?\",\"net.remove.text\":\"La sua cartella esce da Rete e la password salvata viene cancellata. I file sul server restano dove sono.\",\"net.bar.on\":\"Connesso a\",\"net.loading\":\"Lettura della cartella dal server…\",\"net.notRead\":\"Non è stato possibile leggere la cartella dal server\",\"net.error.title\":\"Rete\",\"net.error.read\":\"Non si legge «{name}»\",\"net.preview.big\":\"Non mostrato: il file è su un server ed è più grande di 1 MB\",\"net.trust.title\":\"Conferma il server di «{name}»\",\"net.trust.ssh\":\"È la prima volta che lilOS si collega a questo server, oppure la sua chiave è cambiata. Impronta della chiave:\\n{fingerprint}\\n\\nContinua solo se corrisponde a quella del server.\",\"net.trust.tls\":\"Il certificato del server non è valido (fatto da sé, scaduto o per un altro nome). Impronta del certificato:\\n{fingerprint}\\n\\nContinua solo se ti fidi di questo server.\",\"net.trust.first\":\"Server da confermare.\",\"net.trust.key\":\"Impronta della chiave:\",\"net.trust.cert\":\"Il certificato non è valido. La sua impronta:\",\"net.trust.check\":\"Conferma solo se corrisponde a quella del server.\",\"net.trust.go\":\"Conferma e connetti\",\"net.connect.title\":\"Connetti a un server\",\"net.edit.title\":\"Connessione «{name}»\",\"net.protocol\":\"Protocollo\",\"net.name\":\"Nome della cartella in Rete\",\"net.name.hint\":\"Sarà {path}\",\"net.remember\":\"Ricorda la password (lilOS la tiene cifrata)\",\"net.auto\":\"Connetti all’accesso\",\"net.test\":\"Prova\",\"net.testing\":\"Prova in corso…\",\"net.test.ok\":\"Funziona: il server risponde e la cartella si legge\",\"net.connecting\":\"Connessione in corso…\",\"net.connect.go\":\"Connetti\",\"net.save\":\"Salva e connetti\",\"net.cancel\":\"Annulla\",\"net.later\":\"Più tardi\",\"net.remember.signin\":\"Ricorda l’accesso (lilOS lo tiene cifrato)\",\"net.web.open\":\"Apri nel browser\",\"net.web.only\":\"Si apre solo sul sito del fornitore\",\"net.web.copiedAs\":\"Si apre sul sito del fornitore; copiato fuori diventa un file {ext}\",\"net.space.of\":\"{used} di {total} usati\",\"net.space.used\":\"{used} usati\",\"net.group.server\":\"Server\",\"net.group.cloud\":\"Cloud\",\"net.group.local\":\"Rete locale\",\"net.signin.paste.text\":\"Accedi nella scheda che si è aperta. Alla fine il browser mostra una pagina che non si apre: copia tutto il suo indirizzo dalla barra degli indirizzi e incollalo qui.\",\"net.signin.paste.label\":\"Indirizzo della pagina che non si è aperta\",\"net.signin.paste.go\":\"Continua\",\"net.import.where\":\"Dove copiarle\",\"net.import.change\":\"Cambia…\",\"net.import.step\":\"Scegli foto e video\",\"net.import.pick\":\"Scegli in una nuova scheda\",\"net.import.hint\":\"La pagina di Google si apre in una nuova scheda: seleziona fino a 2000 elementi e premi Fine. La copia va avviata entro un’ora.\",\"net.import.opening\":\"Apertura della pagina per scegliere…\",\"net.import.waiting\":\"In attesa della tua scelta nell’altra scheda…\",\"net.import.picked\":\"{count} elementi scelti: premi Importa\",\"net.import.none\":\"Non hai scelto niente\",\"net.import.failed\":\"Importazione non riuscita\",\"net.import.go\":\"Importa\",\"message.noRename\":\"«{name}» qui non si rinomina\",\"message.noRemove\":\"Questi elementi qui non si eliminano\",\"net.signin.button\":\"Accedi\",\"net.signin.waiting\":\"Completa l’accesso nella finestra che si è aperta…\",\"net.signin.blocked\":\"Il browser ha bloccato la finestra di accesso: consenti le finestre a comparsa per lilOS e riprova\",\"net.signin.other\":\"Usa un altro account\",\"net.signin.again.title\":\"Accedi di nuovo a «{name}»\",\"net.signin.again.text\":\"Il fornitore chiede di ripetere l’accesso per {account}.\",\"net.notReady.title\":\"{name} non è ancora pronto su questo lilOS\",\"net.notReady.settings\":\"Apri le impostazioni\",\"office.open.word\":\"Apri in Word online\",\"office.open.excel\":\"Apri in Excel online\",\"office.open.powerpoint\":\"Apri in PowerPoint online\",\"office.upload\":\"Carica su OneDrive e apri\",\"office.none\":\"Prima collega OneDrive (Rete → +)\",\"office.pick\":\"Carica su:\",\"office.uploaded\":\"«{name}» è su {folder}: quello che cambi in Office si salva lì\",\"office.again\":\"Accesso rifatto: riprova\",\"office.failed\":\"«{name}» non caricato\",\"office.exists.title\":\"File già su OneDrive\",\"office.exists.text\":\"In {folder} c’è già «{name}». Lo sostituisci con questo (quello che è stato cambiato online si perde) o li tieni entrambi?\",\"office.exists.keep\":\"Tieni entrambi\",\"office.exists.replace\":\"Sostituisci\",\"net.missing\":\"Mancano: {fields}\",\"net.secret.unchanged\":\"invariata\",\"net.file.browse\":\"Sfoglia…\",\"net.file.none\":\"Nessun file scelto\",\"net.file.chosen\":\"File scelto\",\"net.shares.list\":\"Elenca…\",\"net.shares.none\":\"Il server non condivide niente che tu possa vedere\",\"net.password.title\":\"Password di «{name}»\",\"net.password.text\":\"lilOS ha bisogno della password per connettersi a {address}.\",\"net.password.wrong\":\"Utente o password non giusti\",\"net.trust.changed.title\":\"Il server di «{name}» ha CAMBIATO chiave\",\"net.trust.changed\":\"La chiave o il certificato di questo server non è quello che avevi confermato. Qualcuno potrebbe fingersi il server: continua solo se sai che è stato cambiato apposta.\\n\\nPrima: {previous}\\nOra: {fingerprint}\"}}")
}), P = (e) => e.toLocaleString(u.locale), F = (e) => e.type === "folder" ? N("type.folder") : e.type === "app" ? N("type.app") : e.type === "link" ? N({
	folder: "type.linkFolder",
	web: "type.linkWeb"
}[e.link?.kind] ?? "type.linkFile") : i(e.name).label;
function me(t) {
	let n = t.link ?? {};
	return n.kind === "web" ? n.url : n.home ? a.exists(n.home) ? a.path(n.home) : N("link.notFound") : `${e.net?.mount(n.mount)?.name ?? N("link.mountGone")}: ${n.path}`;
}
var I = (e) => e.id === a.root ? N("place.home") : e.name, L = (e) => e.parent === a.root ? N("place.home") : a.path(e.parent);
function he(e) {
	let t = e.trashed.from;
	return a.exists(t) && t !== a.root ? a.path(t) : N("place.home");
}
function R(e) {
	let t = C(e.workspace);
	return t ? t.removed ? N("owner.removed", { name: t.name }) : t.name : e.workspace ? N("owner.unknown") : N("owner.shared");
}
function ge(e) {
	let t = C(e.workspace), n = o("span", {
		class: "ws-owner-dot",
		"aria-hidden": "true"
	});
	return t && (n.style.background = t.color), o("span", {
		class: [
			"ws-owner",
			!t && "shared",
			t?.removed && "removed"
		].filter(Boolean).join(" "),
		title: N("owner.label", { name: R(e) })
	}, n, o("span", {}, R(e)));
}
function _e(e) {
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
var z = (e) => N("count.items", {
	n: e,
	count: P(e)
});
function ve(e) {
	return e.type === "folder" ? z(e.trashed ? e.inside : a.children(e.id).length) : e.type === "file" && e.net && e.web ? "—" : e.type === "file" ? _e(e.size ?? 0) : "—";
}
function ye() {
	let e = d.get("trashRetention");
	return e <= 0 ? N("trash.keptForever") : N("trash.keptDays", {
		n: e,
		count: P(e)
	});
}
var B = (e) => new Date(e).toLocaleString(u.locale, {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit"
}), be = "files-panels", xe = 720, Se = class {
	open;
	width;
	constructor({ key: e, title: t, resizeLabel: n, closeLabel: r, width: i, open: a = !1, room: s, onLayout: l, signal: u }) {
		this.key = e, this.defaultWidth = i, this.room = s, this.onLayout = l;
		let d = m.get(be, {})?.[e];
		this.open = typeof d?.open == "boolean" ? d.open : a, this.width = Number.isFinite(d?.width) ? Ce(d.width, 180, xe) : i, this.split = o("div", {
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
		this.el.style.width = `${e}px`, this.split.setAttribute("aria-valuenow", e), this.split.setAttribute("aria-valuemax", Math.max(180, Math.min(xe, this.room())));
	}
	resize(e, t = !0) {
		this.width = Math.round(Ce(e, 180, Math.max(180, Math.min(xe, this.room())))), t && this.#t(), this.onLayout();
	}
	#e(e) {
		this.split.addEventListener("pointerdown", (e) => {
			if (e.button !== 0) return;
			e.preventDefault();
			let t = this.el.offsetWidth;
			this.el.classList.add("resizing"), _(e, {
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
		let e = m.get(be, {});
		m.set(be, {
			...e && typeof e == "object" ? e : {},
			[this.key]: {
				open: this.open,
				width: this.width
			}
		});
	}
}, Ce = (e, t, n) => Math.max(t, Math.min(e, n)), we = 1e5, Te = 5 << 20, Ee = 30, De = 200, V = (e) => e < 1024 ? _e(e) : N("info.bytesDetail", {
	size: _e(e),
	count: P(e)
});
function Oe(e) {
	let t = 0;
	for (let n of a.children(e)) t += n.type === "folder" ? Oe(n.id) : n.size ?? 0;
	return t;
}
var ke = (e) => e.trashed ? e.bytes ?? 0 : e.type === "folder" ? Oe(e.id) : e.size ?? 0, Ae = (e) => e?.type === "file" && !e.trashed, je = (e) => `${e.id}:${e.modified}:${e.size ?? 0}`;
function Me(e) {
	let t = e.map((e) => h.get(e)).filter(Boolean);
	return t.length ? o("span", { class: "fm-chips" }, t.map((e) => o("span", {
		class: "fm-chip",
		title: e.visible ? e.name : N("info.tagHidden", { name: e.name })
	}, o("span", {
		class: "tag-dot",
		style: { background: e.color },
		"aria-hidden": "true"
	}), e.name))) : N("info.none");
}
var H = (e) => o("dl", { class: "fm-facts" }, e.filter(Boolean).flatMap(([e, t, n]) => [o("dt", {}, e), o("dd", { class: n }, t)])), U = (e, ...t) => o("section", { class: "fm-info-section" }, o("h6", {}, e), ...t);
function Ne(e, t, n) {
	return o("div", { class: "fm-info-head" }, o("span", { class: "fm-info-icon" }, e), o("div", { class: "fm-info-titles" }, o("div", {
		class: "fm-info-name",
		title: t
	}, t), n && o("div", { class: "fm-info-kind" }, n)));
}
function Pe({ nodes: e, place: t, text: n }) {
	return e.length > 1 ? Ie(e) : e.length === 1 ? Fe(e[0], n) : t.trash ? Le() : t.tag ? Re(t.tag) : o("div", {}, o("p", { class: "fm-info-hint" }, N("info.folderHint")), Fe(t.node, n));
}
function Fe(e, t) {
	let { ext: n } = i(e.name), r = e.type === "app" ? E(e.app) : null, s = [[N("info.type"), e.type === "file" && n ? `${F(e)} (.${n})` : e.type === "app" ? N("type.appLink") : F(e)], e.type === "app" && [N("info.app"), r ? r.name : N("info.appMissing", { id: e.app })]];
	if (e.type === "file" && s.push([N("info.size"), V(e.size ?? 0)]), e.type === "link" && (s.push([
		N("info.linkTarget"),
		me(e),
		"mono"
	]), e.link?.broken && s.push([N("info.linkState"), N("info.linkBroken")])), e.type === "folder") {
		let t = e.trashed ? null : a.children(e.id).length, n = e.trashed ? e.inside : a.count(e.id);
		s.push([N("info.contents"), t === null || n === t ? z(n) : N("info.contentsTotal", {
			items: z(t),
			total: P(n)
		})]), s.push([N("info.size"), V(ke(e))]);
	}
	e.trashed ? s.push([N("info.deleted"), B(e.trashed.at)], [
		N("info.origin"),
		he(e),
		"mono"
	]) : s.push([
		N("info.path"),
		a.path(e.id),
		"mono"
	]), s.push([N("info.created"), B(e.created)], [N("info.modified"), B(e.modified)]);
	let c = [
		e.system && N("note.system"),
		e.private && N("note.private"),
		!e.trashed && a.isHidden(e.id) && N("note.hidden"),
		!e.trashed && O.has(e.id) && N("note.linked")
	].filter(Boolean), l = o("div", {}, Ne(D(e), I(e), F(e)), U(N("info.general"), H(s)), U(N("info.organization"), H([[N("info.workspace"), ge(e)], [N("info.tags"), Me(e.tags ?? [])]])), c.length ? U(N("info.attributes"), o("ul", { class: "fm-notes" }, c.map((e) => o("li", {}, e)))) : null);
	if (Ae(e) && (e.size ?? 0) <= Te) {
		let n = o("dd", {}, "…"), r = o("dd", {}, "…"), i = o("dd", {}, "…");
		l.append(U(N("info.text"), o("dl", { class: "fm-facts" }, o("dt", {}, N("info.lines")), n, o("dt", {}, N("info.words")), r, o("dt", {}, N("info.chars")), i))), t(e).then((e) => {
			n.textContent = P(e ? e.split("\n").length : 0), r.textContent = P(e.trim() ? e.trim().split(/\s+/).length : 0), i.textContent = P([...e].length);
		}, () => {
			n.textContent = r.textContent = i.textContent = "—";
		});
	}
	return l;
}
function Ie(e) {
	let t = (t) => e.filter((e) => e.type === t).length, n = t("folder"), r = t("file"), i = t("app"), s = [
		n && N("info.folders", {
			n,
			count: P(n)
		}),
		r && N("info.files", {
			n: r,
			count: P(r)
		}),
		i && N("info.apps", {
			n: i,
			count: P(i)
		})
	].filter(Boolean).join(", "), c = e.reduce((e, t) => e + (t.type === "folder" ? t.trashed ? t.inside : a.count(t.id) : 0), 0), l = /* @__PURE__ */ new Map();
	for (let t of e) l.set(F(t), (l.get(F(t)) ?? 0) + 1);
	let u = new Set(e.map((e) => e.parent)), d = e.map((e) => e.modified), f = [...new Set(e.map(R))], p = [...new Set(e.flatMap((e) => e.tags ?? []))], m = p.filter((t) => e.every((e) => e.tags?.includes(t))), h = e.every((e) => e.trashed), g = o("span", { class: "fm-info-stack" }, e.slice(0, 3).map((e) => o("span", {}, D(e))));
	return o("div", {}, Ne(g, N("selection.count", { count: P(e.length) }), s), U(N("info.general"), H([
		[N("info.size"), V(e.reduce((e, t) => e + ke(t), 0))],
		c > 0 && [N("info.contents"), N("info.insideFolders", {
			n: c,
			count: P(c)
		})],
		[N("info.types"), [...l].sort((e, t) => t[1] - e[1]).map(([e, t]) => `${e} ${P(t)}`).join(" · ")],
		!h && [
			N("info.location"),
			u.size === 1 ? L(e[0]) : N("info.manyFolders", { count: P(u.size) }),
			u.size === 1 ? "mono" : null
		],
		[N("info.oldest"), B(Math.min(...d))],
		[N("info.newest"), B(Math.max(...d))]
	])), U(N("info.organization"), H([
		[N("info.workspace"), f.join(", ")],
		[N("info.tags"), Me(p)],
		p.length > 0 && [N("info.common"), Me(m)]
	])), U(N("info.items"), o("ul", { class: "fm-names" }, e.slice(0, Ee).map((e) => o("li", { title: e.name }, o("span", { class: "fm-icon" }, D(e)), o("span", {}, e.name))), e.length > Ee ? o("li", { class: "more" }, N("list.more", { count: P(e.length - Ee) })) : null)));
}
function Le() {
	let e = a.trashed(), t = e.reduce((e, t) => e + 1 + t.inside, 0);
	return o("div", {}, Ne(o("span", { class: "fm-info-glyph" }, c("trash")), N("place.trash"), z(e.length)), U(N("info.general"), H([
		[N("info.contents"), e.length ? N("info.contentsTotal", {
			items: z(e.length),
			total: P(t)
		}) : z(0)],
		[N("info.size"), V(e.reduce((e, t) => e + (t.bytes ?? 0), 0))],
		e.length > 0 && [N("info.lastDeleted"), B(e[0].trashed.at)],
		[N("info.retention"), ye()]
	])));
}
function Re(e) {
	let t = a.tagged(e.id);
	return o("div", {}, Ne(o("span", {
		class: "tag-dot fm-info-tag",
		style: { background: e.color },
		"aria-hidden": "true"
	}), e.name, N("info.tagKind")), U(N("info.general"), H([
		[N("info.items"), z(t.length)],
		[N("info.size"), V(t.reduce((e, t) => e + ke(t), 0))],
		[N("info.visibility"), e.visible ? N("info.visible") : N("info.invisible")]
	])));
}
var ze = class {
	#e = null;
	#t = null;
	constructor(e, { text: t, open: n }) {
		this.body = e, this.text = t, this.open = n;
	}
	update(e) {
		let t = e.length === 1 ? e[0] : null, n = t ? `${je(t)}:${t.name}:${t.type === "folder" && !t.trashed ? a.children(t.id).map((e) => e.id + e.name).join() : ""}` : `${e.length}`;
		if (n === this.#e) return;
		if (this.#e = n, this.#d(), !t) return this.#u(e.length ? W("list", N("selection.count", { count: P(e.length) }), N("preview.oneAtATime")) : W("file", N("preview.none"), N("preview.selectFile")));
		if (t.trashed) return this.#u(this.#n(t), W("trash", N("preview.trashed"), N("preview.restoreToSee")));
		if (t.type === "folder") return this.#u(this.#n(t), this.#s(t));
		if (t.type === "app") return this.#u(this.#n(t), this.#l(t));
		if (t.type === "link") return this.#u(this.#n(t), this.#c(t));
		let r = o("div", { class: "fm-preview-wait" }, N("preview.loading"));
		this.#u(this.#n(t), r);
		let i = (e) => {
			this.#e === n && r.replaceWith(e());
		};
		this.#a(t).then((e) => {
			if (this.#e === n) return e ? i(() => this.#o(t, e)) : this.text(t).then((e) => i(() => this.#r(t, e)));
		}).catch((e) => i(() => W("x", N("preview.readError"), e?.message ?? "")));
	}
	destroy() {
		this.#d();
	}
	#n(e) {
		let t = e.trashed ? null : e.type === "app" ? N("preview.launch") : N("preview.open");
		return o("div", { class: "fm-preview-head" }, o("span", { class: "fm-icon" }, D(e)), o("span", {
			class: "fm-preview-name",
			title: e.name
		}, I(e)), t && o("button", {
			class: "fm-preview-open",
			type: "button",
			onclick: () => this.open(e)
		}, t));
	}
	#r(e, t) {
		if (!t) return W("file", N("preview.emptyFile"), "");
		let { ext: n } = i(e.name);
		return n === "svg" && /^\s*(<\?xml[^>]*>\s*)?(<!--[\s\S]*?-->\s*)*<svg[\s>]/i.test(t) ? (this.#t = URL.createObjectURL(new Blob([t], { type: "image/svg+xml" })), o("div", { class: "fm-preview-image" }, o("img", {
			src: this.#t,
			alt: N("preview.imageAlt", { name: e.name })
		}))) : t.slice(0, 8e3).includes("\0") ? W("file", N("preview.unavailable"), N("preview.notText")) : this.#i(e, t);
	}
	#i(e, t, n = null) {
		let r = t.length > we;
		return o("div", { class: "fm-preview-textwrap" }, o("pre", {
			class: "fm-preview-text",
			tabindex: "0",
			"aria-label": N("preview.contentsOf", { name: e.name })
		}, r ? t.slice(0, we) : t), r ? o("div", { class: "fm-preview-note" }, N("preview.cut", {
			shown: P(we),
			total: P(t.length)
		})) : null, n);
	}
	#a(e) {
		return typeof v.filePreview == "function" ? v.filePreview(e).catch((t) => (console.warn(`[files] anteprima di ${e.name}:`, t), null)) : Promise.resolve(null);
	}
	#o(e, t) {
		let n = o("div", { class: "fm-preview-note" }, [N("preview.byApp", { app: E(t.app)?.name ?? t.app }), t.note].filter(Boolean).join(" · "));
		if (typeof t.text == "string") return t.text ? this.#i(e, t.text, n) : W("file", N("preview.emptyFile"), "");
		let r;
		return t.image instanceof Blob ? (this.#t = URL.createObjectURL(t.image), r = o("div", { class: "fm-preview-image" }, o("img", {
			src: this.#t,
			alt: N("preview.imageAlt", { name: e.name })
		}))) : (r = o("iframe", {
			class: "fm-preview-frame",
			sandbox: "",
			referrerpolicy: "no-referrer",
			title: N("preview.contentsOf", { name: e.name })
		}), r.srcdoc = t.html), o("div", { class: "fm-preview-textwrap" }, r, n);
	}
	#s(e) {
		let t = a.children(e.id);
		if (!t.length) return W("folder", N("preview.emptyFolder"), "");
		let n = {
			folder: 0,
			file: 1,
			app: 1,
			link: 1
		};
		return t.sort((e, t) => n[e.type] - n[t.type] || e.name.localeCompare(t.name, u.locale, { numeric: !0 })), o("ul", {
			class: "fm-preview-list",
			"aria-label": N("preview.contentsOf", { name: e.name })
		}, t.slice(0, De).map((e) => o("li", {
			title: N("preview.childTitle", { name: e.name }),
			ondblclick: () => this.open(e)
		}, o("span", { class: "fm-icon" }, D(e)), o("span", { class: "fm-label" }, e.name))), t.length > De ? o("li", { class: "more" }, N("list.more", { count: P(t.length - De) })) : null);
	}
	#c(e) {
		return o("div", { class: "fm-preview-app" }, D(e), o("strong", {}, F(e)), o("span", { class: "fm-preview-link" }, me(e)));
	}
	#l(e) {
		let t = E(e.app);
		return t ? o("div", { class: "fm-preview-app" }, r(t), o("strong", {}, t.name)) : W("x", N("preview.appMissing"), e.app);
	}
	#u(...e) {
		this.body.replaceChildren(...e);
	}
	#d() {
		this.#t && URL.revokeObjectURL(this.#t), this.#t = null;
	}
};
function W(e, t, n) {
	return o("div", { class: "fm-preview-empty" }, c(e), o("strong", {}, t), n ? o("span", {}, n) : null);
}
// src/files/columns.js
var Be = "files-columns", Ve = 1600, He = 160, Ue = {
	modified: 128,
	deleted: 128,
	size: 92,
	type: 118,
	workspace: 124,
	origin: 160,
	location: 160
}, We = class {
	widths = {};
	hidden = /* @__PURE__ */ new Set();
	constructor() {
		let e = m.get(Be, {}), t = e && typeof e.widths == "object" ? e.widths : {};
		for (let [e, n] of Object.entries(t ?? {})) (Object.hasOwn(Ue, e) || e === "name") && Number.isFinite(n) && (this.widths[e] = Ge(Math.round(n), 48, Ve));
		Array.isArray(e?.hidden) && e.hidden.filter((e) => Object.hasOwn(Ue, e)).forEach((e) => this.hidden.add(e));
	}
	shown(e) {
		return e.filter((e) => e.key === "name" || !this.hidden.has(e.key));
	}
	width(e) {
		return this.widths[e] ?? Ue[e];
	}
	layout(e, t = null) {
		let n = this.widths.name == null && t !== "name", r = e.map((e) => e.key === t ? "max-content" : e.key === "name" && n ? `minmax(${He}px, 1fr)` : `${this.width(e.key)}px`);
		n || r.push("minmax(0, 1fr)");
		let i = e.reduce((e, r) => e + (r.key === t ? 0 : r.key === "name" && n ? He : this.width(r.key)), 0);
		return {
			template: r.join(" "),
			min: `${i}px`
		};
	}
	resize(e, t, n = !0) {
		this.widths[e] = Ge(Math.round(t), 48, Ve), n && this.save();
	}
	setHidden(e, t) {
		e !== "name" && (t ? this.hidden.add(e) : this.hidden.delete(e), this.save());
	}
	reset() {
		this.widths = {}, this.hidden.clear(), this.save();
	}
	save() {
		m.set(Be, {
			widths: this.widths,
			hidden: [...this.hidden]
		});
	}
}, Ge = (e, t, n) => Math.max(t, Math.min(e, n)), G = () => e.net?.available ? e.net : null;
function K(e) {
	let t = a.get(e)?.net;
	return t ? G()?.mount(t) ?? null : null;
}
var Ke = {
	on: "net.state.on",
	connecting: "net.state.connecting",
	off: "net.state.off",
	error: "net.state.error"
}, qe = (e) => N(Ke[e.state] ?? "net.state.off") + (e.state === "error" && e.error ? `: ${e.error}` : ""), Je = {
	ftp: "FTP",
	ftps: "FTPS",
	sftp: "SFTP",
	webdav: "DAV",
	smb: "SMB",
	onedrive: "OD",
	gdrive: "GD",
	gphotos: "GF",
	s3: "S3",
	azblob: "AZ",
	nfs: "NFS"
}, Ye = [
	"server",
	"cloud",
	"local"
], Xe = "Immagini";
function Ze(e) {
	if (!e?.net) return [];
	let t = (e) => G()?.text(e) ?? "", n = [];
	return e.web && n.push(o("span", {
		class: "fm-chip web",
		title: e.exportAs ? N("net.web.copiedAs", { ext: `.${e.exportAs}` }) : N("net.web.only")
	}, t(e.web))), e.badge && n.push(o("span", { class: "fm-chip" }, t(e.badge))), n;
}
var q = (e) => e ? G()?.protocols.find((t) => t.id === e.protocol) ?? null : null, Qe = (e) => !!e?.fields.some((e) => e.type === "signin"), $e = (e) => Je[e] ?? e.toUpperCase().slice(0, 5);
function et(e, { active: t, reteFolder: n }) {
	let r = G();
	if (!r) return [];
	let i = o("button", {
		class: "fm-side-add",
		type: "button",
		title: N("net.add"),
		"aria-label": N("net.add"),
		onclick: () => mt(e)
	}, c("plus")), a = n ? o("button", {
		class: "fm-side-title",
		type: "button",
		onclick: () => e.go(n)
	}, N("net.section")) : o("span", {}, N("net.section")), s = r.mounts().sort((e, t) => e.name.localeCompare(t.name)).map((n) => {
		let i = r.mountNode(n.id), a = t === i, s = o("button", {
			class: a ? "fm-place fm-mount on" : "fm-place fm-mount",
			type: "button",
			"aria-current": a ? "true" : null,
			title: `${n.address} · ${qe(n)}`,
			onclick: () => e.go(i)
		}, o("span", {
			class: `fm-dot ${n.state}`,
			"aria-hidden": "true"
		}), o("span", { class: "fm-mount-name" }, n.name), o("span", { class: "fm-proto" }, $e(n.protocol)));
		return s.dataset.folder = i, s.addEventListener("contextmenu", (t) => {
			t.preventDefault(), tt(e, n, t.clientX, t.clientY);
		}), s;
	});
	return [o("section", {
		class: "fm-side-net",
		"aria-label": N("net.section")
	}, o("h6", { class: "fm-side-head" }, a, i), ...s.length ? s : [o("p", { class: "fm-side-none" }, N("net.none"))])];
}
function tt(e, t, n, r) {
	let i = G();
	if (!i) return;
	let a = i.mountNode(t.id);
	l(n, r, [
		{
			label: N("net.menu.open"),
			icon: "open",
			action: () => e.go(i.mountNode(t.id))
		},
		t.state === "on" ? {
			label: N("net.menu.disconnect"),
			icon: "x",
			action: () => i.disconnect(t.id).catch((t) => e.netError(t))
		} : {
			label: N("net.menu.connect"),
			icon: "globe",
			action: () => e.go(i.mountNode(t.id))
		},
		{
			label: N("net.menu.edit"),
			icon: "pencil",
			action: () => mt(e, t)
		},
		v.canLinkOnDesk?.([a]) && {
			label: N("menu.deskLink"),
			icon: "link",
			action: () => e.addDeskLinks([a])
		},
		"-",
		{
			label: N("net.menu.remove"),
			icon: "trash",
			danger: !0,
			action: () => nt(e, t)
		}
	].filter(Boolean));
}
async function nt(t, n) {
	(e.messageBox ? await e.messageBox(t.win, {
		icon: "warning",
		title: N("net.remove.title", { name: n.name }),
		text: N("net.remove.text"),
		buttons: ["continue", "cancel"]
	}) : "continue") === "continue" && G()?.remove(n.id).catch((e) => t.netError(e));
}
function rt(t, n) {
	let r = K(n);
	if (!r) return null;
	let i = o("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => G().disconnect(r.id).catch((e) => t.netError(e))
	}, c("x"), N("net.menu.disconnect")), a = q(r), s = r.state === "on" && a?.links && e.net.openWeb ? o("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => ot(t, n)
	}, c("globe"), N("net.web.open")) : null, l = r.state === "on" && a?.importer && e.net.imports ? o("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => at(t, r)
	}, c("download"), G().text(a.importer.label)) : null, u = o("span", { class: "fm-mountbar-space" });
	return r.state === "on" && a?.space && e.net.space && e.net.space(r.id).then((e) => {
		e && (u.textContent = e.total ? N("net.space.of", {
			used: it(e.used),
			total: it(e.total)
		}) : N("net.space.used", { used: it(e.used) }));
	}, () => {}), o("div", { class: `fm-mountbar ${r.state}` }, c(r.state === "on" ? "lock" : "globe"), o("span", { class: "fm-mountbar-text" }, r.state === "on" ? N("net.bar.on") : qe(r), " ", o("code", {}, r.address)), o("span", { class: "fm-sp" }), u, l, s, r.state === "on" ? i : null);
}
function it(e) {
	let t = [
		"B",
		"KB",
		"MB",
		"GB",
		"TB",
		"PB"
	], n = e, r = 0;
	for (; n >= 1024 && r < t.length - 1;) n /= 1024, r++;
	return `${r ? n.toLocaleString(void 0, { maximumFractionDigits: 1 }) : n} ${t[r]}`;
}
function at(e, t) {
	let r = G(), i = q(t);
	if (!r?.imports || !i?.importer) return;
	let s = new n({
		title: r.text(i.importer.label).replace(/…$/, ""),
		icon: "download",
		width: 440,
		height: 380,
		minWidth: 340,
		minHeight: 300
	}), l = () => a.resolve(`~/${Xe}`)?.id ?? a.root, u = null, d = o("code", { class: "fm-net-where" }), f = () => {
		d.textContent = u ? a.path(u) : `~/${Xe}/${r.text(i.label)}`;
	}, p = o("button", {
		class: "ctl-btn",
		type: "button"
	}, N("net.import.change")), m = o("button", {
		class: "ctl-btn primary",
		type: "button"
	}, c("globe"), N("net.import.pick")), h = o("button", {
		class: "ctl-btn primary",
		type: "button",
		disabled: !0
	}, c("download"), N("net.import.go")), g = o("p", {
		class: "fm-net-status",
		role: "status"
	}), _ = (e, t = !1) => {
		g.textContent = e, g.classList.toggle("bad", t);
	}, v = null, y = null;
	p.addEventListener("click", async () => {
		let t = await ie(e.openWindow, {
			kind: "folder",
			title: N("net.import.where")
		});
		t && (u = t.id, f());
	}), m.addEventListener("click", () => {
		y?.abort();
		let n = y = new AbortController(), i = null;
		v = null, h.disabled = !0, _(N("net.import.opening")), r.openWeb(async () => {
			let e = await r.imports.start(t.id);
			return i = e.id, e.url;
		}).then(async () => {
			for (_(N("net.import.waiting"));;) {
				if (n.signal.aborted) return;
				let e = await r.imports.status(t.id, i, { wait: !0 });
				if (n.signal.aborted) return;
				if (e.status !== "pending") return e.status === "error" ? _(e.error ?? N("net.import.failed"), !0) : e.count ? (v = e, h.disabled = !1, _(N("net.import.picked", { count: e.count }))) : _(N("net.import.none"), !0);
			}
		}).catch((n) => {
			if (n.code === "secret_required") return ht(e, t), _("");
			_(n.message, !0);
		});
	}), h.addEventListener("click", async () => {
		if (v) {
			h.disabled = !0;
			try {
				let n = u;
				if (!n) {
					let e = l(), t = r.text(i.label);
					n = a.children(e).find((e) => e.type === "folder" && e.name === t)?.id ?? a.create(e, {
						type: "folder",
						name: t
					}).id;
				}
				await r.imports.copy(t.id, v.path, n), s.emit("close"), e.go(n);
			} catch (e) {
				h.disabled = !1, _(e.message, !0);
			}
		}
	}), s.on("destroy", () => y?.abort()), f(), s.body.append(o("div", { class: "fm-net-dialog" }, o("div", { class: "fm-net-body" }, o("div", { class: "fm-net-row" }, o("label", {}, N("net.import.where")), o("div", { class: "fm-net-pick" }, d, p)), o("div", { class: "fm-net-row" }, o("label", {}, N("net.import.step")), o("div", {}, m), o("small", {}, N("net.import.hint"))), g), o("div", { class: "fm-net-foot" }, o("span", { class: "fm-sp" }), o("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => s.emit("close")
	}, N("net.cancel")), h))), e.openWindow(s);
}
function ot(t, n) {
	let r = K(n);
	r && e.net?.openWeb && e.net.openWeb(() => e.net.link(r.id, a.netPath(n))).catch((e) => e.code === "secret_required" ? ht(t, r) : t.netError(e));
}
async function st(e, t) {
	if (!G() || !a.isRemote?.(t)) return !0;
	for (;;) try {
		return await a.refresh(t), !0;
	} catch (n) {
		let r = K(t);
		if (!r || !a.exists(t)) return !1;
		if (n.code === "secret_required") {
			if (!(n.details?.reason === "signin" || Qe(q(r)) ? await ht(e, r) : await gt(e, r, n.details?.reason === "auth"))) return !1;
			continue;
		}
		if (n.code === "untrusted") {
			if (!await ct(e, r.id, r.name, n.details?.trust)) return !1;
			continue;
		}
		if (await e.netError(n, {
			retry: !0,
			title: N("net.error.read", { name: r.name })
		}) !== "retry") return !1;
	}
}
async function ct(t, n, r, i) {
	if (!i?.fingerprint || !e.messageBox) return !1;
	let a = i.changed === !0;
	if (await e.messageBox(t.win, {
		icon: a ? "error" : "warning",
		title: N(a ? "net.trust.changed.title" : "net.trust.title", { name: r }),
		text: N(a ? "net.trust.changed" : i.kind === "ssh" ? "net.trust.ssh" : "net.trust.tls", {
			fingerprint: i.text ?? i.fingerprint,
			previous: i.previous ?? ""
		}),
		buttons: ["continue", "cancel"],
		default: "cancel"
	}) !== "continue") return !1;
	try {
		return await G().connect(n, { trust: i.fingerprint }), !0;
	} catch (e) {
		return e.code === "secret_required" || e.code === "untrusted" || (await t.netError(e), !1);
	}
}
var J = (e) => G()?.text(e) ?? (typeof e == "string" ? e : ""), lt = (e, t) => !e.when || Object.entries(e.when).every(([e, n]) => Array.isArray(n) ? n.includes(t[e]) : t[e] === n);
function ut(e, t, { initial: n = {}, editing: r = !!n.host, only: i = null, onShares: a = null, onChange: s = null } = {}) {
	let c = { ...n }, l = {}, u = { id: null };
	for (let e of t.fields) c[e.key] === void 0 && e.default !== void 0 && !e.secret && (c[e.key] = e.default);
	let d = [], f = o("div", { class: "fm-net-fields" }), p = () => {
		d.length = 0;
		for (let n of t.fields) (i !== "secret" || n.secret) && lt(n, c) && (n.type === "signin" ? d.push(dt(e, t, n, c, u, () => {
			s?.(), p();
		})) : d.push(pt(e, n, n.secret ? l : c, {
			editing: r && n.secret,
			onShares: a,
			changed: () => {
				s?.(), t.fields.some((e) => e.when) && p();
			}
		})));
		f.replaceChildren(...d);
	};
	return p(), {
		el: f,
		values: () => Object.fromEntries(Object.entries(c).filter(([e]) => t.fields.some((t) => t.key === e && !t.secret && t.type !== "signin" && lt(t, c)))),
		secret: () => ({ ...l }),
		signin: () => u.id,
		missing: (e = !0) => t.fields.filter((t) => t.required && lt(t, c) && (t.type === "signin" ? !u.id && !c[t.key] : t.secret ? e && !l[t.key] : c[t.key] === void 0 || c[t.key] === "")).map((e) => J(e.label)),
		focus: () => f.querySelector("input, select, textarea")?.focus()
	};
}
function dt(t, n, r, i, a, s) {
	let l = o("small", {
		class: "fm-net-wait",
		role: "status"
	}), u = ft(l), d = null, f = [], p = () => {
		d?.abort(), d = new AbortController();
		let t = Object.fromEntries(Object.entries(i).filter(([e]) => e !== r.key)), o = !!e.net.signInByHand?.(n), c = e.net.signIn(n.id, t, {
			signal: d.signal,
			...o && {
				manual: !0,
				askAddress: u.ask(d.signal)
			}
		});
		for (let e of f) e.disabled = !0;
		m.hidden = !1, l.classList.remove("bad"), l.textContent = o ? "" : N("net.signin.waiting"), c.then(({ signin: e, account: t }) => {
			a.id = e, i[r.key] = t, s();
		}, (e) => {
			for (let e of f) e.disabled = !1;
			m.hidden = !0, u.el.hidden = !0, l.textContent = e.code === "canceled" ? "" : e.code === "blocked" ? N("net.signin.blocked") : e.message, l.classList.toggle("bad", e.code !== "canceled");
		});
	}, m = o("button", {
		class: "ctl-btn",
		type: "button",
		hidden: !0,
		onclick: () => d?.abort()
	}, N("net.cancel")), h = o("label", {}, J(r.label), r.required ? o("span", {
		class: "fm-req",
		"aria-hidden": "true"
	}, " *") : null);
	if (i[r.key]) {
		let e = o("button", {
			class: "ctl-btn",
			type: "button",
			onclick: p
		}, N("net.signin.other"));
		return f = [e], o("div", { class: "fm-net-row" }, h, o("div", { class: "fm-net-account" }, c(a.id ? "check" : "user"), o("span", { class: "fm-net-who" }, i[r.key]), e, m), u.el, l);
	}
	let g = o("button", {
		class: "ctl-btn primary fm-signin",
		type: "button",
		onclick: p
	}, c("user"), J(r.button) || N("net.signin.button"));
	return f = [g], o("div", { class: "fm-net-row" }, h, o("div", { class: "fm-net-pick" }, g, m), r.hint ? o("small", {}, J(r.hint)) : null, u.el, l);
}
function ft(e) {
	let t = o("input", {
		class: "ctl-text",
		type: "text",
		spellcheck: "false",
		autocomplete: "off",
		placeholder: "http://127.0.0.1:53682/?state=…&code=…",
		"aria-label": N("net.signin.paste.label")
	}), n = o("button", {
		class: "ctl-btn primary",
		type: "button"
	}, N("net.signin.paste.go")), r = o("div", {
		class: "fm-net-paste",
		hidden: !0
	}, o("small", {}, N("net.signin.paste.text")), o("div", { class: "fm-net-pick" }, t, n));
	return {
		el: r,
		ask: (i) => (a) => new Promise((o) => {
			r.hidden = !1, e.textContent = a ?? "", e.classList.toggle("bad", !!a), t.value = "", requestAnimationFrame(() => t.focus());
			let s = (e) => {
				n.onclick = null, t.onkeydown = null, o(e);
			};
			n.onclick = () => s(t.value.trim() || null), t.onkeydown = (e) => {
				e.key === "Enter" && (e.preventDefault(), s(t.value.trim() || null));
			}, i.addEventListener("abort", () => s(null), { once: !0 });
		})
	};
}
function pt(e, t, n, { editing: r, onShares: i, changed: s }) {
	let c = `fm-net-${t.key}-${Math.random().toString(36).slice(2, 7)}`, l = o("label", { for: c }, J(t.label), t.required ? o("span", {
		class: "fm-req",
		"aria-hidden": "true"
	}, " *") : null), u = (e) => {
		e === "" || e === void 0 ? delete n[t.key] : n[t.key] = e, s();
	}, d;
	if (t.type === "checkbox") return d = o("input", {
		id: c,
		type: "checkbox",
		checked: n[t.key] === !0
	}), d.addEventListener("change", () => u(d.checked)), o("label", { class: "fm-net-check" }, d, J(t.label));
	if (t.type === "select") d = o("select", {
		id: c,
		class: "ctl-select"
	}, ...(t.options ?? []).map((e) => o("option", {
		value: String(e.value),
		selected: e.value === n[t.key],
		disabled: !!e.disabled
	}, J(e.label)))), d.addEventListener("change", () => u(t.options.find((e) => String(e.value) === d.value)?.value));
	else if (t.type === "textarea") d = o("textarea", {
		id: c,
		class: "ctl-text",
		rows: "3",
		spellcheck: "false",
		placeholder: t.placeholder ?? ""
	}), d.value = n[t.key] ?? "", d.addEventListener("input", () => u(d.value));
	else if (t.type === "file") {
		let i = o("span", { class: "fm-net-file" }, n[t.key] ? N("net.file.chosen") : N(r ? "net.secret.unchanged" : "net.file.none"));
		return d = o("button", {
			id: c,
			class: "ctl-btn",
			type: "button"
		}, N("net.file.browse")), d.addEventListener("click", async () => {
			let n = await ie(e.openWindow, { title: J(t.label) });
			if (n) try {
				u(await a.read(n.id)), i.textContent = n.name;
			} catch (t) {
				e.netError(t);
			}
		}), o("div", { class: "fm-net-row" }, l, o("div", { class: "fm-net-pick" }, i, d), t.hint ? o("small", {}, J(t.hint)) : null);
	} else {
		let e = t.type === "password" ? "password" : t.type === "number" ? "number" : "text";
		d = o("input", {
			id: c,
			class: "ctl-text",
			type: e,
			spellcheck: "false",
			autocomplete: t.type === "password" ? "new-password" : "off",
			placeholder: t.secret && r ? N("net.secret.unchanged") : t.placeholder ?? "",
			...t.min !== void 0 && { min: String(t.min) },
			...t.max !== void 0 && { max: String(t.max) }
		}), d.value = n[t.key] ?? "", d.addEventListener("input", () => u(e === "number" ? d.value === "" ? "" : Number(d.value) : d.value));
	}
	let f = [l];
	if (t.key === "share" && i) {
		let e = o("button", {
			class: "ctl-btn",
			type: "button"
		}, N("net.shares.list"));
		e.addEventListener("click", () => i(e, (e) => {
			d.value = e, u(e);
		})), f.push(o("div", { class: "fm-net-pick" }, d, e));
	} else f.push(d);
	return t.hint && f.push(o("small", {}, J(t.hint))), o("div", { class: "fm-net-row" }, ...f);
}
function mt(e, t = null, { initial: r = null, onConnected: i = null, onClosed: a = null } = {}) {
	let s = G();
	if (!s) return;
	let u = new n({
		title: t ? N("net.edit.title", { name: t.name }) : N("net.connect.title"),
		icon: "globe",
		width: 460,
		height: 660,
		minWidth: 360,
		minHeight: 360
	}), d = s.protocols.find((e) => e.id === (t?.protocol ?? r?.protocol)) ?? s.protocols[0], f = !1, p = null, m = null, h = (e) => o("option", {
		value: e.id,
		selected: e.id === d.id
	}, J(e.label)), g = Ye.map((e) => [e, s.protocols.filter((t) => (t.group ?? "server") === e)]).filter(([, e]) => e.length), _ = o("select", {
		class: "ctl-select",
		id: "fm-net-protocol",
		disabled: !!t
	}, ...g.length > 1 ? g.map(([e, t]) => o("optgroup", { label: N(`net.group.${e}`) }, ...t.map(h))) : s.protocols.map(h)), v = o("input", {
		class: "ctl-text",
		type: "text",
		spellcheck: "false",
		value: t?.name ?? r?.name ?? ""
	}), y = o("small"), b = o("input", {
		type: "checkbox",
		checked: !t || t.remembered
	}), x = o("span", {}, N("net.remember")), S = o("input", {
		type: "checkbox",
		checked: !!t?.auto
	}), C = o("div"), w = o("div", {
		class: "fm-net-note",
		hidden: !0,
		role: "alert"
	}), T = o("p", {
		class: "fm-net-status",
		role: "status"
	}), E = o("button", {
		class: "ctl-btn",
		type: "button"
	}, N("net.test")), ee = o("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => u.emit("close")
	}, N("net.cancel")), D = o("button", {
		class: "ctl-btn primary",
		type: "button"
	}, N(t ? "net.save" : "net.connect.go")), ne = !!t, O = () => {
		y.textContent = v.value.trim() ? N("net.name.hint", { path: `~/Rete/${v.value.trim()}` }) : "";
	}, k = (e, t = !1) => {
		T.textContent = e, T.classList.toggle("bad", t);
	}, A = () => {
		m = null, w.hidden = !0, D.textContent = N(t ? "net.save" : "net.connect.go");
		let n = d.notReady;
		E.disabled = D.disabled = !!n, n ? (p = ut(e, {
			...d,
			fields: []
		}), C.replaceChildren(o("div", { class: "fm-net-note" }, o("b", {}, N("net.notReady.title", { name: J(d.label) })), o("span", {}, J(n)), o("div", {}, o("button", {
			class: "ctl-btn",
			type: "button",
			onclick: () => te("settings", { tab: d.id })
		}, c("gear"), N("net.notReady.settings")))))) : (!ne && Qe(d) && (v.value = J(d.label), O()), x.textContent = N(Qe(d) ? "net.remember.signin" : "net.remember"), p = ut(e, d, {
			initial: t?.values ?? (d.id === r?.protocol ? r.values : {}),
			editing: !!t,
			onShares: d.canListShares ? re : null,
			onChange: () => {
				ne || (v.value = p.values().host ?? (Qe(d) ? J(d.label) : ""), O()), m && (m = null, w.hidden = !0, D.textContent = N(t ? "net.save" : "net.connect.go"));
			}
		}), C.replaceChildren(p.el));
	}, j = () => ({
		protocol: d.id,
		values: p.values(),
		...m && { trust: m.fingerprint },
		...p.signin() && { signin: p.signin() }
	});
	async function re(e, t) {
		try {
			e.disabled = !0;
			let n = await s.shares(j(), p.secret()), r = e.getBoundingClientRect();
			if (!n.length) return k(N("net.shares.none"));
			l(r.left, r.bottom, n.map((e) => ({
				label: e,
				icon: "folder",
				action: () => t(e)
			})));
		} catch (e) {
			if (e.code === "untrusted") return M(e.details?.trust);
			k(e.message, !0);
		} finally {
			e.disabled = !1;
		}
	}
	let M = (e) => {
		e?.fingerprint && (m = e, w.replaceChildren(o("b", {}, N("net.trust.first")), " ", N(e.kind === "ssh" ? "net.trust.key" : "net.trust.cert"), o("code", {}, e.text ?? e.fingerprint), o("span", {}, N("net.trust.check"))), w.hidden = !1, D.textContent = N("net.trust.go"), k(""));
	};
	_.addEventListener("change", () => {
		d = s.protocols.find((e) => e.id === _.value), A();
	}), v.addEventListener("input", () => {
		ne = !!v.value.trim(), O();
	}), E.addEventListener("click", async () => {
		let e = p.missing(!t);
		if (e.length) return k(N("net.missing", { fields: e.join(", ") }), !0);
		k(N("net.testing"));
		try {
			await s.test(j(), p.secret()), k(N("net.test.ok"));
		} catch (e) {
			if (e.code === "untrusted") return M(e.details?.trust);
			k(e.message, !0);
		}
	}), D.addEventListener("click", async () => {
		let n = p.missing(!t || !t.remembered);
		if (v.value.trim() || n.unshift(N("net.name")), n.length) return k(N("net.missing", { fields: n.join(", ") }), !0);
		D.disabled = !0, k(N("net.connecting"));
		try {
			let n = {
				name: v.value.trim(),
				...j(),
				auto: S.checked,
				remember: b.checked
			}, r = t ? await s.update(t.id, n, p.secret()) : await s.create(n, p.secret());
			t = r;
			try {
				await s.connect(r.id, m ? { trust: m.fingerprint } : {});
			} catch (e) {
				if (e.code === "untrusted") {
					M(e.details?.trust);
					return;
				}
				if (e.code === "secret_required") {
					k(e.message, !0);
					return;
				}
				k(e.message, !0);
				return;
			}
			f = !0, u.emit("close"), i ? i(r) : e.go(s.mountNode(r.id));
		} catch (e) {
			k(e.message, !0);
		} finally {
			D.disabled = !1;
		}
	}), a && u.on("destroy", () => {
		f || a();
	}), A(), O(), u.body.append(o("div", { class: "fm-net-dialog" }, o("div", { class: "fm-net-body" }, o("div", { class: "fm-net-row" }, o("label", { for: "fm-net-protocol" }, N("net.protocol")), _), C, o("div", { class: "fm-net-row" }, o("label", {}, N("net.name")), v, y), o("label", { class: "fm-net-check" }, b, x), o("label", { class: "fm-net-check" }, S, N("net.auto")), w, T), o("div", { class: "fm-net-foot" }, E, o("span", { class: "fm-sp" }), ee, D))), e.openWindow(u), requestAnimationFrame(() => p.focus());
}
function ht(e, t) {
	let r = G(), i = r?.protocols.find((e) => e.id === t.protocol);
	return !i || !r.signIn ? Promise.resolve(!1) : new Promise((a) => {
		let s = new n({
			title: N("net.signin.again.title", { name: t.name }),
			icon: "user",
			width: 420,
			height: 300,
			minWidth: 320,
			minHeight: 200
		}), l = i.fields.find((e) => e.type === "signin"), u = o("p", {
			class: "fm-net-status",
			role: "status"
		}), d = ft(u), f = o("button", {
			class: "ctl-btn primary",
			type: "button"
		}, c("user"), J(l?.button) || N("net.signin.button")), p = !1, m = null, h = (e) => {
			p || (p = !0, m?.abort(), a(e), s.emit("close"));
		};
		f.addEventListener("click", () => {
			m?.abort(), m = new AbortController();
			let e = !!r.signInByHand?.(i), n = r.signIn(i.id, t.values, {
				signal: m.signal,
				...e && {
					manual: !0,
					askAddress: d.ask(m.signal)
				}
			});
			f.disabled = !0, u.classList.remove("bad"), u.textContent = e ? "" : N("net.signin.waiting"), n.then(({ signin: e }) => r.connect(t.id, {
				signin: e,
				remember: t.remembered
			})).then(() => h(!0), (e) => {
				f.disabled = !1, d.el.hidden = !0, e.code === "canceled" ? u.textContent = "" : (u.textContent = e.code === "blocked" ? N("net.signin.blocked") : e.message, u.classList.add("bad"));
			});
		}), s.on("destroy", () => {
			p || (p = !0, m?.abort(), a(!1));
		}), s.body.append(o("div", { class: "fm-net-dialog" }, o("div", { class: "fm-net-body" }, o("p", {}, N("net.signin.again.text", { account: t.values?.[l?.key] ?? t.address })), o("div", {}, f), d.el, u), o("div", { class: "fm-net-foot" }, o("span", { class: "fm-sp" }), o("button", {
			class: "ctl-btn",
			type: "button",
			onclick: () => h(!1)
		}, N("net.later"))))), e.openWindow(s), requestAnimationFrame(() => f.focus());
	});
}
function gt(e, t, r = !1) {
	let i = G(), a = i?.protocols.find((e) => e.id === t.protocol);
	return a ? new Promise((s) => {
		let c = new n({
			title: N("net.password.title", { name: t.name }),
			icon: "lock",
			width: 380,
			height: 300,
			minWidth: 320,
			minHeight: 220
		}), l = ut(e, a, {
			initial: t.values,
			only: "secret"
		}), u = o("input", {
			type: "checkbox",
			checked: t.remembered
		}), d = o("p", {
			class: "fm-net-status bad",
			role: "status"
		}, r ? N("net.password.wrong") : ""), f = o("button", {
			class: "ctl-btn primary",
			type: "button"
		}, N("net.connect.go")), p = !1, m = (e) => {
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
		}), c.body.append(o("div", { class: "fm-net-dialog" }, o("div", { class: "fm-net-body" }, o("p", {}, N("net.password.text", { address: t.address })), l.el, o("label", { class: "fm-net-check" }, u, N("net.remember")), d), o("div", { class: "fm-net-foot" }, o("span", { class: "fm-sp" }), o("button", {
			class: "ctl-btn",
			type: "button",
			onclick: () => m(!1)
		}, N("net.cancel")), f))), e.openWindow(c), requestAnimationFrame(() => l.focus());
	}) : Promise.resolve(!1);
}
// src/files/office.js
var _t = {
	word: [
		"doc",
		"docx",
		"docm",
		"dot",
		"dotx",
		"odt",
		"rtf"
	],
	excel: [
		"xls",
		"xlsx",
		"xlsm",
		"xlsb",
		"xlt",
		"xltx",
		"ods"
	],
	powerpoint: [
		"ppt",
		"pptx",
		"pptm",
		"pps",
		"ppsx",
		"pot",
		"potx",
		"odp"
	]
}, vt = "onedrive", yt = {
	mount: null,
	folder: "/lilOS",
	ifExists: "ask",
	doubleClick: !0
};
function bt() {
	let e = m.get(vt, {}) ?? {};
	return {
		mount: typeof e.mount == "string" ? e.mount : null,
		folder: typeof e.folder == "string" && e.folder.trim() ? e.folder.trim() : yt.folder,
		ifExists: [
			"ask",
			"replace",
			"keep"
		].includes(e.ifExists) ? e.ifExists : yt.ifExists,
		doubleClick: e.doubleClick !== !1
	};
}
function xt(e) {
	if (e?.type !== "file") return null;
	let t = p(e.name)[1].toLowerCase();
	return Object.keys(_t).find((e) => _t[e].includes(t)) ?? null;
}
function St() {
	let e = G();
	return e?.putHome ? e.mounts().filter((e) => q(e)?.office) : [];
}
var Ct = (e) => !!e?.net && !!q(K(e.id))?.office;
function wt(e, t) {
	return !xt(t) || !Ct(t) || !bt().doubleClick || v.appFor?.(p(t.name)[1].toLowerCase()) ? !1 : (ot(e, t.id), !0);
}
function Tt(e, t) {
	if (t.length !== 1 || !G()) return [];
	let n = t[0], r = xt(n);
	return n.net ? q(K(n.id))?.links ? [{
		label: r && Ct(n) ? N(`office.open.${r}`) : N("net.web.open"),
		icon: "globe",
		action: () => ot(e, n.id)
	}] : [] : !r || !St().length ? [] : [{
		label: N("office.upload"),
		icon: "arrowUp",
		action: () => Et(e, n)
	}];
}
function Et(t, n, { mount: r = null, ifExists: i = null } = {}) {
	let a = St(), o = bt(), s = r ?? a.find((e) => e.id === o.mount) ?? (a.length === 1 ? a[0] : null);
	if (!s) {
		if (!a.length) return void t.netError(Error(N("office.none")));
		let e = t.list.querySelector(`[data-id="${CSS.escape(n.id)}"]`)?.getBoundingClientRect();
		l(e ? e.left + 40 : innerWidth / 2, e ? e.bottom : innerHeight / 2, [{
			label: N("office.pick"),
			disabled: !0
		}, ...a.map((e) => ({
			label: e.name,
			icon: "globe",
			action: () => Et(t, n, { mount: e })
		}))]);
		return;
	}
	let c = G(), u = i ?? o.ifExists, d = null;
	c.openWeb(async () => (d = await c.putHome(s.id, n.id, o.folder, u), c.link(s.id, d.path))).then(() => {
		e.notifications?.send({
			app: "files",
			text: N("office.uploaded", {
				name: d.name,
				folder: `${s.name}${o.folder === "/" ? "" : o.folder}`
			})
		}).catch(() => {});
	}, async (e) => {
		if (e.code === "conflict" && e.details?.exists) return Dt(t, n, s, e.details.name);
		e.code === "secret_required" ? await ht(t, s) && t.netError(Error(N("office.again"))) : t.netError(e, { title: N("office.failed", { name: n.name }) });
	});
}
function Dt(e, t, r, i) {
	let a = new n({
		title: N("office.exists.title"),
		icon: "warning",
		width: 420,
		height: 220,
		minWidth: 320,
		minHeight: 180
	}), s = (n) => {
		a.emit("close"), n && Et(e, t, {
			mount: r,
			ifExists: n
		});
	};
	a.body.append(o("div", { class: "fm-net-dialog" }, o("div", { class: "fm-net-body" }, o("p", {}, N("office.exists.text", {
		name: i,
		folder: bt().folder
	}))), o("div", { class: "fm-net-foot" }, o("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => s(null)
	}, N("net.cancel")), o("span", { class: "fm-sp" }), o("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => s("keep")
	}, N("office.exists.keep")), o("button", {
		class: "ctl-btn primary",
		type: "button",
		onclick: () => s("replace")
	}, c("arrowUp"), N("office.exists.replace"))))), e.openWindow(a);
}
// src/files/newLink.js
var Ot = {
	webdav: "http",
	dav: "http",
	webdavs: "https",
	davs: "https"
}, kt = /* @__PURE__ */ new Set(["http", "https"]), Y = class extends Error {};
function At(e) {
	let t = e.trim();
	if (!t) throw new Y(N("newLink.error.empty"));
	if (t.includes("\\")) throw new Y(N("newLink.error.backslash"));
	let n = /^([a-z][a-z0-9+.-]*):\/\/([^/?#]*)([^?#]*)/i.exec(t);
	if (!n) {
		if (/^[a-z][a-z0-9+.-]*:/i.test(t) && !t.startsWith("~")) throw new Y(N("newLink.error.slashes"));
		return { local: t };
	}
	let [, r, i, a] = n, o = i.lastIndexOf("@"), s = o >= 0 ? i.slice(0, o) : "";
	if (s.includes(":")) throw new Y(N("newLink.error.password"));
	let c = o >= 0 ? i.slice(o + 1) : i, l = /^(\[[0-9a-f:.]+\]|[^:[\]]+)(?::(\d{1,5}))?$/i.exec(c);
	if (!l) throw new Y(N("newLink.error.host"));
	let u;
	try {
		u = a.split("/").filter(Boolean).map(decodeURIComponent);
	} catch {
		throw new Y(N("newLink.error.path"));
	}
	if (u.some((e) => e === "." || e === ".." || e.includes("/"))) throw new Y(N("newLink.error.path"));
	return { url: {
		scheme: r.toLowerCase(),
		user: decodeURIComponent(s),
		host: l[1].toLowerCase(),
		port: l[2] ? Number(l[2]) : null,
		segs: u,
		folder: a.endsWith("/")
	} };
}
var X = (e) => Ot[e] || kt.has(e) ? {
	id: "webdav",
	http: Ot[e] ?? e
} : {
	id: e,
	http: null
};
function jt(e, t) {
	if (e.port) return e.port;
	let { id: n, http: r } = X(e.scheme);
	return n === "webdav" ? r === "https" ? 443 : 80 : t?.fields?.find((e) => e.key === "port")?.default ?? null;
}
function Mt(e) {
	let t = G();
	if (!t) return null;
	let n = X(e.scheme), r = t.protocols.find((e) => e.id === n.id), i = null;
	for (let a of t.mounts()) {
		if (a.protocol !== n.id) continue;
		let t;
		try {
			t = At(a.address).url;
		} catch {
			continue;
		}
		if (!t || n.http && X(t.scheme).http !== n.http || t.host !== e.host || jt(t, r) !== jt(e, r)) continue;
		let o = (e) => e.split(";").pop().toLowerCase();
		if (e.user && o(t.user) !== o(e.user)) continue;
		let s = (e, t) => a.protocol === "smb" ? e.toLowerCase() === t.toLowerCase() : e === t;
		t.segs.length > e.segs.length || !t.segs.every((t, n) => s(t, e.segs[n])) || (!i || t.segs.length > i.depth) && (i = {
			mount: a,
			path: `/${e.segs.slice(t.segs.length).join("/")}`,
			depth: t.segs.length
		});
	}
	return i && {
		mount: i.mount,
		path: i.path
	};
}
function Nt(e) {
	let { id: t, http: n } = X(e.scheme), r = e.host.includes(":") && !e.host.startsWith("[") ? `[${e.host}]` : e.host, i = {};
	if (t === "webdav") {
		let t = e.folder ? e.segs : e.segs.slice(0, -1);
		i.url = `${n}://${r}${e.port ? `:${e.port}` : ""}/${t.map(encodeURIComponent).join("/")}${t.length ? "/" : ""}`;
	} else i.host = e.host, e.port && (i.port = e.port), t === "smb" && e.segs.length && (i.share = e.segs[0]), i.path = "/";
	return e.user && (i.user = e.user.split(";").pop()), {
		protocol: t,
		values: i,
		name: e.host
	};
}
function Pt(e) {
	if (e.local) return e.local.replace(/\/+$/, "").split("/").pop().replace(/^~$/, "") || "";
	let { url: t } = e;
	return t.segs.at(-1) ?? t.host;
}
function Ft({ folder: t, openWindow: r, onMade: i = null }) {
	let s = new n({
		title: N("newLink.title"),
		icon: "link",
		width: 520,
		height: 290,
		minWidth: 380,
		minHeight: 260
	}), c = {
		win: s,
		openWindow: r,
		netError: (t, { retry: n = !1, title: r = N("net.error.title") } = {}) => e.messageBox ? e.messageBox(s, {
			icon: "error",
			title: r,
			text: t?.message ?? String(t),
			buttons: n ? ["retry", "cancel"] : ["ok"]
		}) : Promise.resolve(null),
		go: () => {}
	}, u = o("input", {
		class: "ctl-text",
		type: "text",
		id: "fm-link-address",
		spellcheck: "false",
		autocomplete: "off",
		placeholder: N("newLink.address.placeholder")
	}), d = o("input", {
		class: "ctl-text",
		type: "text",
		id: "fm-link-name",
		spellcheck: "false",
		autocomplete: "off"
	}), f = o("p", {
		class: "fm-net-status",
		role: "status"
	}), p = o("button", {
		class: "ctl-btn",
		type: "button"
	}, N("newLink.browse")), m = o("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => s.emit("close")
	}, N("net.cancel")), h = o("button", {
		class: "ctl-btn primary",
		type: "button"
	}, N("newLink.make")), g = !1, _ = !1, y = (e, t = !1) => {
		f.textContent = e, f.classList.toggle("bad", t);
	};
	u.addEventListener("input", () => {
		if (y(""), !g) try {
			d.value = Pt(At(u.value));
		} catch {
			d.value = "";
		}
	}), d.addEventListener("input", () => {
		g = !!d.value.trim();
	});
	for (let e of [u, d]) e.addEventListener("keydown", (e) => {
		e.stopPropagation(), e.key === "Enter" && (e.preventDefault(), x()), e.key === "Escape" && (e.preventDefault(), s.emit("close"));
	});
	p.addEventListener("click", () => {
		let e = p.getBoundingClientRect(), t = async (e) => {
			let t = await ie(r, {
				kind: e,
				title: N(e === "folder" ? "newLink.pickFolder" : "newLink.pickFile")
			});
			t && (u.value = a.path(t.id), u.dispatchEvent(new Event("input")), u.focus());
		};
		l(e.left, e.bottom, [{
			label: N("newLink.browseFile"),
			icon: "file",
			action: () => t("file")
		}, {
			label: N("newLink.browseFolder"),
			icon: "folder",
			action: () => t("folder")
		}]);
	});
	async function b(e) {
		if (e.local) {
			let t = a.resolve(e.local);
			if (!t) return void y(N("newLink.error.noPath", { path: e.local }), !0);
			let n = v.linkTo(t.id);
			return n ? { link: n } : void y(N("newLink.error.notLinkable"), !0);
		}
		let { url: t } = e, n = Mt(t);
		if (!n && kt.has(t.scheme)) return { link: {
			url: u.value.trim(),
			kind: "web"
		} };
		let r = G(), { id: i } = X(t.scheme);
		if (!r?.protocols.some((e) => e.id === i)) return void y(N("newLink.error.protocol", { protocol: t.scheme }), !0);
		if (!n) {
			let e = await new Promise((e) => mt(c, null, {
				initial: Nt(t),
				onConnected: e,
				onClosed: () => e(null)
			}));
			if (!e) return void y(N("newLink.error.noConnection"), !0);
			if (n = Mt(t), !n) return void y(N("newLink.error.otherFolder", { name: e.name }), !0);
		}
		y(N("newLink.checking"));
		let o = await v.locateLink({
			mount: n.mount.id,
			path: n.path
		}, {
			win: s,
			read: (e) => st(c, e)
		});
		if (o.stop) return void y("");
		if (o.missing) return void y(N("newLink.error.noRemote", {
			path: n.path,
			name: n.mount.name
		}), !0);
		let l = o.node;
		return { link: {
			mount: n.mount.id,
			path: a.netPath(l.id) ?? n.path,
			kind: l.type === "folder" ? "folder" : "file"
		} };
	}
	async function x() {
		if (_) return;
		let e;
		try {
			e = At(u.value);
		} catch (e) {
			if (!(e instanceof Y)) throw e;
			return y(e.message, !0), u.focus();
		}
		if (d.value.trim() || (d.value = Pt(e)), !d.value.trim()) return y(N("newLink.error.noName"), !0), d.focus();
		_ = h.disabled = !0;
		try {
			let n = await b(e);
			if (!n) return;
			if (!a.exists(t)) return y(N("newLink.error.folderGone"), !0);
			let r = a.create(t, {
				type: "link",
				name: d.value.trim(),
				link: n.link
			});
			i?.(r.id), s.emit("close");
		} catch (e) {
			y(e.message, !0);
		} finally {
			_ = h.disabled = !1;
		}
	}
	return h.addEventListener("click", x), s.body.append(o("div", { class: "fm-net-dialog" }, o("div", { class: "fm-net-body" }, o("div", { class: "fm-net-row" }, o("label", { for: "fm-link-address" }, N("newLink.address")), o("div", { class: "fm-net-pick" }, u, p), o("small", {}, N("newLink.address.hint"))), o("div", { class: "fm-net-row" }, o("label", { for: "fm-link-name" }, N("newLink.name")), d), f), o("div", { class: "fm-net-foot" }, o("span", { class: "fm-sp" }), m, h))), requestAnimationFrame(() => u.focus()), s;
}
// src/files/FilesApp.js
var Z = () => e.automation ?? null, It = 1e3, Lt = 1 << 20, Rt = 260, zt = "files-view", Bt = "files-side-folded", Vt = [
	"list",
	"grid",
	"thumbs"
], Ht = 112, Ut = {
	grid: 92,
	thumbs: 140
}, Q = a.trashRoot, Wt = () => [
	{
		key: "name",
		label: N("column.name")
	},
	{
		key: "modified",
		label: N("column.modified")
	},
	{
		key: "size",
		label: N("column.size"),
		num: !0
	},
	{
		key: "type",
		label: N("column.type")
	},
	{
		key: "workspace",
		label: N("column.workspace")
	}
], Gt = () => [
	{
		key: "name",
		label: N("column.name")
	},
	{
		key: "deleted",
		label: N("column.deleted")
	},
	{
		key: "size",
		label: N("column.size"),
		num: !0
	},
	{
		key: "type",
		label: N("column.type")
	},
	{
		key: "origin",
		label: N("column.origin")
	}
], $ = "tag:", Kt = () => [
	{
		key: "name",
		label: N("column.name")
	},
	{
		key: "location",
		label: N("column.location")
	},
	{
		key: "type",
		label: N("column.type")
	},
	{
		key: "workspace",
		label: N("column.workspace")
	}
], qt = (e) => typeof e == "string" && e.startsWith($) ? h.get(e.slice(4)) : null, Jt = (e) => e.some((e) => a.exists(e) && !a.get(e).system);
function Yt(e) {
	return e?.trash || e?.folder === Q ? Q : typeof e?.tag == "string" && h.get(e.tag) ? $ + e.tag : qt(e?.folder) || e?.folder && a.exists(e.folder) ? e.folder : null;
}
function Xt(e) {
	return Yt(e) ? null : typeof e?.tag == "string" || typeof e?.folder == "string" && e.folder.startsWith($) ? "tag" : e?.folder ? "folder" : null;
}
function Zt({ args: e, openWindow: t } = {}) {
	let r = new n({
		title: N("@name"),
		icon: "folder",
		width: 1e3,
		height: 520,
		minWidth: 520,
		minHeight: 300
	}), i = new en(r, t);
	i.go(Yt(e) ?? a.root, !1);
	let o = Xt(e);
	return o ? requestAnimationFrame(() => i.notFound(o)) : e?.link && requestAnimationFrame(() => i.followLink(e.link)), r.on("launch", (e) => {
		let t = Yt(e);
		if (t) i.go(t, !0, !1);
		else if (Xt(e)) return i.notFound(Xt(e));
		e?.link && i.followLink(e.link);
	}), r.getState = () => ({ folder: i.folder }), r.selection = () => i.selected, r;
}
function Qt({ args: e, openWindow: t } = {}) {
	return Ft({
		folder: e?.folder && a.get(e.folder)?.type === "folder" && !a.isRemote?.(e.folder) ? e.folder : a.root,
		openWindow: t ?? (() => {})
	});
}
var $t = (e) => String(e).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(), en = class {
	folder = a.root;
	#e = [];
	#t = [];
	#n = Vt.includes(m.get(zt)) ? m.get(zt) : "list";
	#r = new Set([].concat(m.get(Bt) ?? []).filter((e) => typeof e == "string"));
	#i = {
		key: "name",
		dir: 1
	};
	#a = new We();
	#o = "";
	#s = "";
	#c = 0;
	#l = [];
	#u = /* @__PURE__ */ new Set();
	#d = /* @__PURE__ */ new Map();
	#f = /* @__PURE__ */ new Set();
	#p = null;
	#m = null;
	#h = null;
	#g = "";
	#_ = "";
	#v = !1;
	#y = {
		defaults: [],
		desk: null
	};
	#b = {
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
		this.backBtn = r("arrowLeft", N("toolbar.back"), () => this.back()), this.forwardBtn = r("arrowRight", N("toolbar.forward"), () => this.forward()), this.upBtn = r("arrowUp", N("toolbar.up"), () => this.up()), this.crumbs = o("nav", {
			class: "fm-path",
			"aria-label": N("toolbar.path")
		}), this.crumbs.addEventListener("click", (e) => {
			e.target.closest("button") || this.editAddress();
		}), this.address = o("input", {
			class: "fm-path fm-address",
			type: "text",
			spellcheck: "false",
			autocomplete: "off",
			hidden: !0,
			"aria-label": N("toolbar.address")
		}), this.address.addEventListener("input", () => this.#w(!1)), this.address.addEventListener("keydown", (e) => {
			e.stopPropagation(), e.key === "Enter" && (e.preventDefault(), this.#C()), e.key === "Escape" && (e.preventDefault(), this.#S(!0));
		}), this.address.addEventListener("blur", () => {
			this.#v || this.#S(!1);
		}), this.newBtn = r("folderPlus", N("menu.newFolder"), () => this.create("folder")), this.listBtn = r("list", N("view.list"), () => this.setView("list")), this.gridBtn = r("grid", N("view.grid"), () => this.setView("grid")), this.thumbsBtn = r("image", N("view.thumbs"), () => this.setView("thumbs")), this.previewBtn = r("sidebar", "", () => this.preview.toggle()), this.infoBtn = r("info", "", () => this.info.toggle()), this.search = o("input", {
			type: "text",
			spellcheck: "false",
			"aria-label": N("toolbar.search")
		}), this.search.addEventListener("input", () => {
			this.#o = $t(this.search.value.trim()), this.render(), clearTimeout(this.#c), this.#c = setTimeout(() => this.#fe(), It);
		}), this.search.addEventListener("keydown", (e) => {
			e.key === "Enter" && this.#fe(), e.key === "Escape" && this.search.value && (e.stopPropagation(), this.search.value = "", this.#o = "", this.render(), this.#fe()), e.key === "ArrowDown" && (e.preventDefault(), this.list.focus());
		}), this.side = o("aside", {
			class: "fm-side",
			"aria-label": N("side.label")
		}), this.list = o("div", {
			class: "fm-list",
			role: "listbox",
			tabindex: "0",
			"aria-multiselectable": "true",
			"aria-label": N("list.label")
		}), this.mountSlot = o("div", { class: "fm-mountslot" }), this.statusLeft = o("span"), this.statusRight = o("span", { class: "fm-status-right" });
		let i = (e, n, r, i) => new Se({
			key: e,
			...n,
			width: r,
			open: i,
			signal: t.signal,
			room: () => this.#O() - (e === "info" ? this.preview : this.info).shown,
			onLayout: () => {
				this.#k(), this.#E();
			}
		});
		this.preview = i("preview", {
			title: N("panel.preview.title"),
			resizeLabel: N("panel.preview.resize"),
			closeLabel: N("panel.preview.close")
		}, 300, !1), this.info = i("info", {
			title: N("panel.info.title"),
			resizeLabel: N("panel.info.resize"),
			closeLabel: N("panel.info.close")
		}, 260, !0), this.previewView = new ze(this.preview.body, {
			text: (e) => this.#D(e),
			open: (e) => this.open(e)
		}), this.main = o("div", { class: "fm" }, this.side, o("div", { class: "fm-main" }, this.mountSlot, this.list, o("div", { class: "fm-status" }, this.statusLeft, this.statusRight)), this.preview.el, this.info.el), t.body.append(o("div", { class: "fm-toolbar" }, this.backBtn, this.forwardBtn, this.upBtn, this.crumbs, this.address, this.newBtn, o("span", { class: "fm-sep" }), this.listBtn, this.gridBtn, this.thumbsBtn, o("span", { class: "fm-sep" }), this.previewBtn, this.infoBtn, o("label", { class: "fm-search" }, c("search"), this.search)), this.main);
		let l = new ResizeObserver(() => this.#k());
		l.observe(this.main), this.#te(), T(this.list, { target: (e, t, n, r) => this.#I(r) }), this.gap = o("div", {
			class: "fm-gap",
			"aria-hidden": "true"
		}), T(this.side, { target: (e, t, n, r) => this.#F(e, t, n, r) });
		let u = a.on("change", (e) => this.#he(e)), d = O.on("change", () => {
			this.#se(this.folder) && this.render();
		}), f = a.on("scope", () => {
			this.#se(this.folder) && this.render();
		}), p = re(() => {
			this.#se(this.folder) && this.render();
		}), m = a.on("trash", () => {
			this.inTrash && (this.#g = "", this.render());
		}), g = G() ? e.net.on("mounts", () => {
			this.#se(this.folder) && this.render();
		}) : () => {}, _ = h.on("change", () => {
			if (this.folder.startsWith?.($) && !this.inTag) return this.go(a.root, !1);
			this.#se(this.folder) && this.render();
		}), v = x({
			isActive: () => t.active,
			selectionSize: () => this.#f.size,
			open: () => this.openSelected(),
			rename: () => this.rename([...this.#f][0]),
			remove: () => this.remove([...this.#f]),
			selectAll: () => this.#ee(this.#l.map((e) => e.id)),
			deselect: () => this.#ee([])
		}), y = s.attach(t.el, this.history), b = [
			ee("files.info", {
				isActive: () => t.active,
				run: () => this.info.toggle()
			}),
			ee("files.preview", {
				isActive: () => t.active,
				run: () => this.preview.toggle()
			}),
			ee("files.address", {
				isActive: () => t.active,
				run: () => this.editAddress()
			})
		];
		t.on("destroy", () => {
			u(), d(), f(), p(), m(), _(), g(), v(), y(), b.forEach((e) => e()), l.disconnect(), this.previewView.destroy(), clearTimeout(this.#c);
		}), this.#pe();
	}
	get inTrash() {
		return this.folder === Q;
	}
	get selected() {
		return this.inTrash ? [] : [...this.#f];
	}
	get inTag() {
		return qt(this.folder);
	}
	get tree() {
		return this.#n === "list" && !this.inTrash;
	}
	go(e, t = !0, n = t) {
		if (e !== Q && !qt(e) && a.get(e)?.type !== "folder") return;
		t && e !== this.folder && (this.#e.push(this.folder), this.#t = []);
		let r = this.folder;
		this.folder = e, this.#f.clear(), this.#h = null, this.#g = "", this.search.value = "", this.#o = "", clearTimeout(this.#c), this.#s = "";
		let i = a.ancestors(r).find((t) => t.parent === e);
		this.#m = i?.id ?? null, i && this.#f.add(i.id), this.#p = this.#m, this.render(), this.list.scrollTop = 0, a.isRemote?.(e) && this.#x(e), n && e !== r && this.#de();
	}
	async #x(e) {
		this.#ue(N("net.loading"));
		let t = await st(this, e);
		this.folder === e && this.#g === N("net.loading") && this.#ue(t ? "" : N("net.notRead"));
	}
	netError(e, { retry: t = !1, title: n = N("net.error.title") } = {}) {
		return this.#me(n, e?.message ?? String(e), t ? ["retry", "cancel"] : ["ok"]);
	}
	reveal(e) {
		let t = a.get(e);
		t && (this.go(t.parent), a.isHidden(e) ? this.#ue(N("message.hiddenByTag", { name: t.name })) : this.#ee([e], e));
	}
	back() {
		this.#le(this.#e, this.#t);
	}
	forward() {
		this.#le(this.#t, this.#e);
	}
	up() {
		let e = a.get(this.folder)?.parent;
		e && this.go(e);
	}
	editAddress() {
		this.address.hidden && (this.address.value = this.inTrash || this.inTag ? `${a.home}/` : a.path(this.folder), this.#w(!1), this.crumbs.hidden = !0, this.address.hidden = !1), this.address.focus(), this.address.select();
	}
	#S(e) {
		this.address.hidden || (this.address.hidden = !0, this.crumbs.hidden = !1, this.#g && this.#g === this.#_ && this.#ue(""), e && this.list.focus());
	}
	async #C() {
		let t = this.address.value.trim().replace(/\\/g, "/"), n = t ? a.resolve(t) : null;
		if (!n && t && e.messageBox) {
			this.#w(!0), this.#v = !0;
			let e = await this.#me(N("error.pathNotFound"), N("message.noPath", { path: t }), ["retry", "cancel"]);
			if (this.#v = !1, e !== "retry") return this.#S(!0);
			this.address.focus(), this.address.setSelectionRange(this.address.value.length, this.address.value.length);
		} else {
			if (!n) return this.#w(!0), this.#_ = t ? N("message.noPath", { path: t }) : N("message.typePath", { path: a.path(this.inTrash || this.inTag ? a.root : this.folder) }), this.#ue(this.#_);
			this.#S(!0), n.type === "folder" ? this.go(n.id) : this.reveal(n.id);
		}
	}
	#w(e) {
		this.address.classList.toggle("bad", e), this.address.setAttribute("aria-invalid", String(e));
	}
	setView(e) {
		e !== this.#n && Z()?.record("files.view", { params: { mode: e } }), this.#n = e, m.set(zt, e), this.render();
	}
	open(e) {
		if (e.type === "folder") return this.go(e.id);
		if (e.type === "app") return te(e.app);
		if (e.type === "link") return this.#T(e);
		if (e.net && e.web) return ot(this, e.id);
		wt(this, e) || M(e);
	}
	async #T(e) {
		if (e.link?.kind === "web") return v.openWebLink?.(e.link.url);
		let t = await v.findLinkTarget?.(e, {
			win: this.win,
			read: (e) => st(this, e)
		});
		t && this.open(t);
	}
	followLink(e) {
		let t = a.get(e);
		t?.type === "link" && this.#T(t);
	}
	newLink() {
		if (this.inTrash || this.inTag) return;
		let e = this.folder;
		this.openWindow(Ft({
			folder: e,
			openWindow: this.openWindow,
			onMade: (t) => {
				ae(this.history, t), this.folder === e && this.#ee([t], t);
			}
		}));
	}
	addDeskLinks(e) {
		let t;
		try {
			t = v.addDeskLinks(e);
		} catch (e) {
			this.#me(N("error.deskLink"), e.message);
			return;
		}
		t.forEach((e) => ae(this.history, e)), t.length && g(N("toast.deskLinks", {
			n: t.length,
			count: P(t.length)
		}));
	}
	openSelected() {
		if (this.inTrash) return this.#ue(N("message.restoreToOpen"));
		let e = this.#l.filter((e) => this.#f.has(e.id)), t = e.find((e) => e.type === "folder");
		e.filter((e) => e.type !== "folder").forEach((e) => this.open(e)), t && this.go(t.id);
	}
	create(e) {
		if (this.inTrash || this.inTag) return;
		this.#o &&= (this.search.value = "", "");
		let t;
		try {
			t = a.create(this.folder, {
				type: e,
				name: N(e === "folder" ? "create.folderName" : "create.fileName")
			});
		} catch (t) {
			this.#me(N(e === "folder" ? "error.createFolder" : "error.createFile"), t.message);
			return;
		}
		this.#ee([t.id]), this.rename(t.id, !0);
	}
	rename(e, t = !1) {
		let n = a.get(e);
		if (!n || n.system) return;
		if (n.noRename) return this.#ue(N("message.noRename", { name: n.name }));
		this.#h = e, this.render();
		let r = this.list.querySelector(".fm-rename");
		if (!r) return;
		r.focus();
		let i = n.type === "file" ? n.name.lastIndexOf(".") : -1;
		r.setSelectionRange(0, i > 0 ? i : n.name.length);
		let o = !1, s = (i) => {
			if (o) return;
			o = !0, this.#h = null;
			let s = r.value.replace(/\s+/g, " ").trim();
			if (i && s && s !== n.name && a.exists(e)) try {
				se(t ? null : this.history, e, s);
			} catch (t) {
				this.#me(N("error.rename", { name: n.name }), t.message, ["retry", "cancel"]).then((t) => {
					t === "retry" && a.exists(e) && this.rename(e);
				});
			}
			t && ae(this.history, e), this.render(), this.list.focus();
		};
		r.addEventListener("keydown", (e) => {
			e.stopPropagation(), e.key === "Enter" && (e.preventDefault(), s(!0)), e.key === "Escape" && (e.preventDefault(), s(!1));
		}), r.addEventListener("blur", () => s(!0));
	}
	setOpen(e, t, n = !1) {
		let r = [e];
		if (n) for (let e = 0; e < r.length; e++) r.push(...a.children(r[e]).filter((e) => e.type === "folder").map((e) => e.id));
		if (r.forEach((e) => t ? this.#u.add(e) : this.#u.delete(e)), t && r.filter((e) => a.isRemote?.(e)).forEach((e) => st(this, e)), !t) {
			let t = (t) => t != null && t !== e && a.isInside(t, e);
			t(this.#m) && (this.#m = e), t(this.#p) && (this.#p = e), [...this.#f].some(t) && (this.#f = new Set([...this.#f].filter((e) => !t(e)).concat(e)));
		}
		this.render();
	}
	remove(e) {
		if (this.inTrash) return this.purge(e);
		let t = e.filter((e) => !a.get(e)?.system && !a.get(e)?.noRemove);
		if (!t.length) return void this.#me(N("error.delete"), e.some((e) => a.get(e)?.noRemove) ? N("message.noRemove") : N("message.systemFolders"));
		let { x: n, y: r } = this.#ce(t[0]);
		S(t, n, r, this.history);
	}
	restore(e) {
		let t = ce(this.history, e);
		if (!t.length) return;
		let n = [...new Set(t.map((e) => e.parent === a.root ? N("place.home") : a.path(e.parent)))], r = P(t.length);
		g(t.length === 1 ? N("toast.restored", {
			name: a.get(t[0].id).name,
			place: n[0]
		}) : n.length === 1 ? N("toast.restoredMany", {
			count: r,
			place: n[0]
		}) : N("toast.restoredManyPlaces", {
			count: r,
			folders: P(n.length)
		}));
	}
	purge(e) {
		let t = this.#l.filter((t) => e.includes(t.id));
		if (!t.length) return;
		let n = t.length === 1 ? N("confirm.purge", { name: t[0].name }) : N("confirm.purgeMany", { count: P(t.length) }), { x: r, y: i } = this.#ce(t[0].id);
		l(r, i, [{
			label: n,
			icon: "trash",
			danger: !0,
			action: () => a.purge(t.map((e) => e.id))
		}, {
			label: N("confirm.cancel"),
			icon: "x",
			action: () => {}
		}]);
	}
	empty(e, t) {
		let n = a.trashed().length;
		n && l(e, t, [{
			label: N("confirm.emptyTrash", {
				n,
				count: P(n)
			}),
			icon: "trash",
			danger: !0,
			action: () => a.purgeTrash()
		}, {
			label: N("confirm.cancel"),
			icon: "x",
			action: () => {}
		}]);
	}
	render() {
		let e = this.inTag, t = this.inTrash ? {
			id: Q,
			name: N("place.trash"),
			parent: null
		} : e ? {
			id: this.folder,
			name: N("place.tag", { name: e.name }),
			parent: null
		} : a.get(this.folder);
		if (!t) return;
		this.win.setTitle(I(t), N("@name")), this.#A(t), this.#j();
		let n = !this.inTrash && !e && G() ? rt(this, this.folder) : null;
		this.mountSlot.replaceChildren(...n ? [n] : []);
		let r = this.inTrash ? a.trashed() : e ? a.tagged(e.id) : a.children(this.folder);
		this.#d.clear(), this.#l = this.#q(r);
		let i = new Set(this.#l.map((e) => e.id));
		this.#f = new Set([...this.#f].filter((e) => i.has(e))), i.has(this.#m) || (this.#m = this.#l[0]?.id ?? null);
		let s = this.list.scrollTop;
		this.list.classList.toggle("grid", this.#n !== "list"), this.list.classList.toggle("thumbs", this.#n === "thumbs"), this.list.classList.toggle("tree", this.tree), this.list.setAttribute("role", this.tree ? "tree" : "listbox"), this.#l.length ? this.#n === "list" ? (this.#z(), this.list.replaceChildren(this.#W(), ...this.#l.map((e) => this.#G(e)))) : this.list.replaceChildren(...this.#l.map((e) => this.#X(e))) : this.list.replaceChildren(o("div", { class: "fm-empty" }, this.#o ? N("empty.noMatch", { query: this.search.value.trim() }) : this.inTrash ? N("empty.trash") : N(e ? "empty.tag" : "empty.folder"))), this.list.scrollTop = s, this.list.setAttribute("aria-activedescendant", this.#m ? `fm-${this.#m}` : "");
		let c = r.length, l = this.#f.size;
		this.statusLeft.textContent = N("status.items", {
			n: c,
			count: P(c)
		}) + (l ? ` · ${N("status.selected", {
			n: l,
			count: P(l)
		})}` : ""), this.statusRight.textContent = this.#g || (this.inTrash ? ye() : e ? e.visible ? N("status.tag") : N("status.tagHidden") : a.path(this.folder)), this.statusRight.classList.toggle("msg", !!this.#g), this.#E();
	}
	#E() {
		let e = [[
			this.previewBtn,
			this.preview,
			"files.preview",
			N("panel.preview.show"),
			N("panel.preview.hide")
		], [
			this.infoBtn,
			this.info,
			"files.info",
			N("panel.info.show"),
			N("panel.info.hide")
		]];
		for (let [t, n, r, i, a] of e) {
			let e = f.label(r), o = `${n.open ? a : i}${e ? ` (${e})` : ""}`;
			t.title = o, t.setAttribute("aria-label", o), t.setAttribute("aria-pressed", String(n.open)), t.classList.toggle("on", n.open);
		}
		if (!this.info.open && !this.preview.open) return;
		let t = this.#l.filter((e) => this.#f.has(e.id));
		if (this.preview.open && this.previewView.update(t), this.info.open) {
			let e = this.inTag, n = this.inTrash ? { trash: !0 } : e ? { tag: e } : { node: a.get(this.folder) };
			if (!n.trash && !n.tag && !n.node) return;
			let r = this.info.body, i = r.scrollTop;
			r.replaceChildren(Pe({
				nodes: t,
				place: n,
				text: (e) => this.#D(e)
			})), r.scrollTop = i;
		}
	}
	#D(e) {
		if (!Ae(e)) return Promise.reject(Error(N("error.notFile")));
		if (e.net && (e.size ?? 0) > Lt) return Promise.reject(Error(N("net.preview.big")));
		let t = je(e);
		return this.#b.key !== t && (this.#b = {
			key: t,
			text: a.read(e.id)
		}), this.#b.text;
	}
	#O() {
		return this.main.clientWidth - this.side.offsetWidth - Rt;
	}
	#k() {
		let e = [this.preview, this.info].filter((e) => e.open);
		if (!e.length || !this.main.isConnected) return;
		let t = e.reduce((e, t) => e + t.width, 0), n = Math.min(1, Math.max(0, this.#O()) / t);
		e.forEach((e) => e.show(Math.max(180, Math.floor(e.width * n))));
	}
	#A(e) {
		this.backBtn.disabled = !this.#e.some((e) => this.#se(e)), this.forwardBtn.disabled = !this.#t.some((e) => this.#se(e)), this.upBtn.disabled = !e.parent, this.newBtn.disabled = this.inTrash || !!this.inTag;
		for (let [e, t] of [
			[this.listBtn, "list"],
			[this.gridBtn, "grid"],
			[this.thumbsBtn, "thumbs"]
		]) e.classList.toggle("on", this.#n === t), e.setAttribute("aria-pressed", String(this.#n === t));
		this.search.placeholder = N("toolbar.searchIn", { name: I(e) });
		let t = this.inTrash || this.inTag ? [e] : a.ancestors(this.folder);
		this.crumbs.replaceChildren(...t.flatMap((e, n) => {
			let r = n === t.length - 1 ? o("span", {
				class: "fm-crumb current",
				"aria-current": "page"
			}, I(e)) : o("button", {
				class: "fm-crumb",
				type: "button",
				onclick: () => this.go(e.id)
			}, I(e));
			return a.exists(e.id) && k(r, e), n ? [o("span", {
				class: "fm-crumb-sep",
				"aria-hidden": "true"
			}, "›"), r] : [r];
		}));
	}
	#j() {
		let e = a.children(a.root), t = new Set(a.ancestors(this.folder).map((e) => e.id)), n = [{
			key: "root",
			id: a.root,
			name: N("place.home"),
			glyph: "home"
		}, ...b.map((t) => ({
			...t,
			id: e.find((e) => e.name === t.name && e.system)?.id,
			glyph: t.icon
		})).filter((e) => e.id).map((e) => ({
			...e,
			key: e.name === y ? "desk" : e.id
		}))], r = a.ancestors(this.folder).find((e) => e.mount)?.id ?? null, i = this.inTrash || this.inTag ? this.folder : r ? null : [...n].reverse().find((e) => t.has(e.id))?.id, s = (e) => o("button", {
			class: e.id === i ? "fm-place on" : "fm-place",
			type: "button",
			"aria-current": e.id === i ? "true" : null,
			onclick: () => this.go(e.id)
		}, c(e.glyph), o("span", {}, e.name)), u = (e) => {
			let t = $ + e.id;
			return o("button", {
				class: t === i ? "fm-place fm-tag on" : "fm-place fm-tag",
				type: "button",
				"aria-current": t === i ? "true" : null,
				title: e.visible ? e.name : N("side.tagHidden", { name: e.name }),
				onclick: () => this.go(t)
			}, o("span", {
				class: "tag-dot",
				style: { background: e.color },
				"aria-hidden": "true"
			}), o("span", {}, e.name), e.visible ? null : c("eyeOff"));
		}, d = h.list(), f = n.map((e) => e.key);
		this.#y = {
			defaults: f,
			desk: n.find((e) => e.key === "desk")?.id
		};
		let p = (e, t, { node: n, folder: r } = {}) => (t.dataset.entry = e, r && (t.dataset.folder = r), t.addEventListener("pointerdown", (e) => {
			e.button === 0 && !e.target.closest(".fm-link-x") && w(e, {
				ids: [n],
				stack: this.history
			});
		}), t), m = (e) => {
			let t = e.id === this.folder, n = () => this.#N(e), r = o("button", {
				class: t ? "fm-place fm-link on" : "fm-place fm-link",
				type: "button",
				"aria-current": t ? "true" : null,
				title: `${L(e)} › ${e.name}`,
				onclick: () => this.open(e)
			}, o("span", { class: "fm-link-icon" }, D(e)), o("span", {}, e.name));
			r.addEventListener("contextmenu", (t) => {
				t.preventDefault(), l(t.clientX, t.clientY, [
					{
						label: N("menu.open"),
						icon: "open",
						action: () => this.open(e)
					},
					{
						label: N("menu.reveal"),
						icon: "folderOpen",
						action: () => this.reveal(e.id)
					},
					"-",
					{
						label: N("menu.unlink"),
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
				title: N("side.unlinkTitle"),
				"aria-label": N("link.remove", { name: e.name }),
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
			return r ? m(r) : [];
		}, _ = s({
			id: Q,
			name: N("place.trash"),
			glyph: "trash"
		});
		_.dataset.trash = "";
		let x = e.find((e) => e.system && e.name === v.NETWORK_NAME)?.id ?? null, S = (e) => o("h6", { class: "fm-side-head" }, o("span", { class: "fm-side-label" }, e));
		this.side.replaceChildren(this.#M("links", N("side.links"), o("section", {
			class: "fm-side-links",
			"aria-label": N("side.links")
		}, S(N("side.links")), ...O.arrange(f).flatMap(g))), ...d.length ? [this.#M("tags", N("side.tags"), o("section", {
			class: "fm-side-tags",
			"aria-label": N("side.tags")
		}, S(N("side.tags")), ...d.map(u)))] : [], ...et(this, {
			active: r,
			reteFolder: x
		}).map((e) => this.#M("net", N("net.section"), e)), o("hr", { class: "fm-side-sep" }), _, this.gap);
	}
	#M(e, t, n) {
		let r = !this.#r.has(e), i = n.querySelector(":scope > h6"), a = N(r ? "side.collapse" : "side.expand", { name: t }), s = () => {
			r ? this.#r.add(e) : this.#r.delete(e), m.set(Bt, [...this.#r]), this.#j(), this.side.querySelector(`[data-fold="${e}"]`)?.focus();
		};
		return i.prepend(o("button", {
			class: r ? "fm-side-fold open" : "fm-side-fold",
			type: "button",
			dataset: { fold: e },
			title: a,
			"aria-label": a,
			"aria-expanded": String(r),
			onclick: s
		})), i.querySelector(".fm-side-label")?.addEventListener("click", s), n.classList.toggle("folded", !r), n;
	}
	#N(e) {
		let { defaults: t } = this.#y, n = O.arrange(t).indexOf(e.id);
		n < 0 || (O.remove(e.id), this.history.push({
			label: N("link.remove", { name: e.name }),
			undo: () => O.place([e.id], n, t),
			redo: () => O.remove(e.id)
		}), g(N("toast.unlinked", { name: e.name })), this.list.focus());
	}
	#P(e) {
		return e === a.root ? "root" : e === this.#y.desk ? "desk" : a.exists(e) ? e : null;
	}
	#F(e, t, n, r) {
		let i = e?.closest?.("[data-trash]");
		if (i) return Jt(r) ? {
			el: i,
			run: (e, t) => this.#L(r, t)
		} : null;
		let a = e?.closest?.(".fm-mount");
		if (a) {
			let e = A(r, a.dataset.folder);
			return e && {
				el: a,
				run: (t, n) => j(n, e, a.dataset.folder)
			};
		}
		let o = this.side.querySelector(".fm-side-links");
		if (!o?.contains(e) || o.classList.contains("folded")) return null;
		let s = [...o.querySelectorAll(":scope > [data-entry]")], c = e.closest("[data-entry]");
		if (c && s.includes(c)) {
			let e = c.getBoundingClientRect(), t = Math.min(8, e.height / 4), { folder: i } = c.dataset;
			if (i && n > e.top + t && n < e.bottom - t) {
				let e = A(r, i);
				return e && {
					el: c,
					run: (t, n) => j(n, e, i)
				};
			}
		}
		let l = s.findIndex((e) => {
			let t = e.getBoundingClientRect();
			return n < t.top + t.height / 2;
		});
		l < 0 && (l = s.length);
		let u = [...new Set(r.map((e) => this.#P(e)).filter(Boolean))], { defaults: d } = this.#y;
		if (!O.changes(u, l, d)) return null;
		let f = this.side.getBoundingClientRect(), p = l < s.length ? s[l].getBoundingClientRect().top : s[s.length - 1].getBoundingClientRect().bottom;
		return this.gap.style.top = `${p - f.top + this.side.scrollTop}px`, {
			el: this.gap,
			run: () => {
				let e = O.place(u, l, d);
				e && g(N("toast.linksAdded", {
					n: e,
					count: P(e)
				}));
			}
		};
	}
	#I(e) {
		if (this.inTrash) return Jt(e) ? {
			el: this.list,
			run: (t, n) => this.#L(e, n)
		} : null;
		if (this.inTag) return null;
		let t = A(e, this.folder);
		return t && {
			el: this.list,
			run: (e, n) => j(n, t, this.folder)
		};
	}
	#L(e, t) {
		let n = e.filter((e) => !a.get(e)?.system).length;
		oe(t, e), g(N("toast.trashed", {
			n,
			count: P(n)
		}));
	}
	#R() {
		return (this.inTrash ? Gt : this.inTag ? Kt : Wt)();
	}
	#z(e = null) {
		let { template: t, min: n } = this.#a.layout(this.#a.shown(this.#R()), e);
		this.list.style.setProperty("--fm-cols", t), this.list.style.setProperty("--fm-min", n);
	}
	#B(e) {
		let t = this.list.querySelectorAll(`[data-col="${e}"]`);
		if (!t.length) return;
		this.#z(e);
		let n = 48;
		for (let e of t) n = Math.max(n, e.offsetWidth + 1);
		this.#a.resize(e, n), this.#z();
	}
	#V(e, t) {
		this.#a.setHidden(e, !t), !t && this.#i.key === e && (this.#i = {
			key: "name",
			dir: 1
		}), this.render();
	}
	#H() {
		let e = this.#R();
		return [
			...e.map((e) => {
				let t = e.key === "name" || !this.#a.hidden.has(e.key);
				return {
					label: e.label,
					icon: t ? "check" : null,
					disabled: e.key === "name",
					action: () => this.#V(e.key, !t)
				};
			}),
			"-",
			{
				label: N("columns.fitAll"),
				icon: "fit",
				action: () => this.#a.shown(e).forEach((e) => this.#B(e.key))
			},
			{
				label: N("columns.reset"),
				icon: "undo",
				action: () => {
					this.#a.reset(), this.render();
				}
			}
		];
	}
	#U(e) {
		let t = o("span", {
			class: "fm-grip",
			role: "separator",
			tabindex: "-1",
			"aria-orientation": "vertical",
			"aria-label": N("column.resize", { name: e.label }),
			title: N("column.resizeTitle")
		}), n = () => t.parentElement.offsetWidth;
		return t.addEventListener("pointerdown", (t) => {
			if (t.button !== 0) return;
			t.preventDefault();
			let r = n();
			this.list.classList.add("resizing"), _(t, {
				threshold: 0,
				onMove: (t) => {
					this.#a.resize(e.key, r + t, !1), this.#z();
				},
				onEnd: (e) => {
					this.list.classList.remove("resizing"), e && this.#a.save();
				}
			});
		}), t.addEventListener("dblclick", () => this.#B(e.key)), t.addEventListener("keydown", (t) => {
			let r = t.shiftKey ? 48 : 16, i = {
				ArrowLeft: -r,
				ArrowRight: r
			}[t.key];
			i !== void 0 && (t.preventDefault(), this.#a.resize(e.key, n() + i), this.#z());
		}), t;
	}
	#W() {
		let e = this.#a.shown(this.#R());
		return o("div", {
			class: "fm-head",
			role: "presentation"
		}, e.map((e) => {
			let t = this.#i.key === e.key, n = o("button", {
				class: [
					"fm-col",
					e.num && "num",
					t && "on"
				].filter(Boolean).join(" "),
				type: "button",
				tabindex: "-1",
				"aria-sort": t ? this.#i.dir > 0 ? "ascending" : "descending" : null,
				onclick: () => {
					this.#i = {
						key: e.key,
						dir: t ? -this.#i.dir : 1
					}, this.render(), Z()?.record("files.sort", { params: {
						by: e.key,
						direction: this.#i.dir > 0 ? "asc" : "desc"
					} });
				}
			}, e.label, t ? o("span", {
				class: "fm-arrow",
				"aria-hidden": "true"
			}, this.#i.dir > 0 ? "▲" : "▼") : null);
			return o("div", {
				class: "fm-th",
				dataset: { col: e.key }
			}, n, this.#U(e));
		}));
	}
	#G(e) {
		let t = this.#Y(e);
		return this.tree && (t.name.prepend(this.#K(e)), t.name.style.setProperty("--fm-depth", this.#d.get(e.id) ?? 0)), this.#Q(e, "fm-row", ...this.#a.shown(this.#R()).map((e) => {
			let n = t[e.key] ?? o("span");
			return n.dataset.col = e.key, n;
		}));
	}
	#K(e) {
		if (e.type !== "folder") return o("span", {
			class: "fm-twisty",
			"aria-hidden": "true"
		});
		let t = this.#u.has(e.id);
		return o("span", {
			class: t ? "fm-twisty open" : "fm-twisty",
			dataset: { twisty: e.id },
			"aria-hidden": "true",
			title: N(t ? "tree.collapseTitle" : "tree.expandTitle")
		});
	}
	#q(e, t = 0, n = []) {
		for (let r of this.#$(e)) {
			let e = n.length;
			n.push(r), this.#d.set(r.id, t), this.#J(r) && this.#q(a.children(r.id), t + 1, n), this.#o && n.length === e + 1 && !$t(r.name).includes(this.#o) && n.pop();
		}
		return n;
	}
	#J(e) {
		return this.tree && e.type === "folder" && this.#u.has(e.id);
	}
	#Y(e) {
		if (e.trashed) {
			let t = he(e);
			return {
				name: o("span", { class: "fm-name" }, o("span", { class: "fm-icon" }, D(e)), this.#Z(e)),
				deleted: o("span", {}, B(e.trashed.at)),
				size: o("span", { class: "num" }, ve(e)),
				type: o("span", {}, F(e)),
				origin: o("span", { title: N("trash.restoresTo", { place: t }) }, t)
			};
		}
		let t = this.inTag ? L(e) : "";
		return {
			name: o("span", { class: "fm-name" }, o("span", { class: "fm-icon" }, D(e)), this.#Z(e), de(e)),
			modified: o("span", {}, B(e.modified)),
			size: o("span", { class: "num" }, ve(e)),
			type: o("span", {}, F(e)),
			workspace: ge(e),
			location: o("span", { title: t }, t)
		};
	}
	#X(e) {
		let t = D(e, this.#n === "thumbs" && !e.trashed ? { preview: Ht } : void 0), n = this.#Q(e, "fm-tile", o("span", { class: "fm-tile-icon" }, t, de(e, "fm-tile-tags")), this.#Z(e)), r = (e.tags ?? []).map((e) => h.get(e)?.name).filter(Boolean), i = e.trashed ? [N("tile.deleted", { date: B(e.trashed.at) }), N("tile.origin", { place: he(e) })] : [
			this.inTag && N("tile.location", { place: L(e) }),
			N("owner.label", { name: R(e) }),
			r.length && N("tile.tags", { names: r.join(", ") })
		];
		return n.title = [e.name, ...i.filter(Boolean)].join("\n"), n;
	}
	#Z(e) {
		if (this.#h === e.id) return o("input", {
			class: "fm-rename",
			type: "text",
			value: e.name,
			spellcheck: "false",
			"aria-label": N("rename.label")
		});
		let t = Ze(e);
		return t.length ? o("span", { class: "fm-label-chips" }, o("span", {
			class: "fm-label",
			title: e.name
		}, e.name), ...t) : o("span", {
			class: "fm-label",
			title: e.name
		}, e.name);
	}
	#Q(e, t, ...n) {
		let r = this.#f.has(e.id), i = this.tree && t === "fm-row", a = o("div", {
			class: [
				t,
				r && "selected",
				e.id === this.#m && "cursor"
			].filter(Boolean).join(" "),
			id: `fm-${e.id}`,
			role: i ? "treeitem" : "option",
			"aria-selected": String(r),
			dataset: { id: e.id },
			"aria-level": i ? String((this.#d.get(e.id) ?? 0) + 1) : null,
			"aria-expanded": i && e.type === "folder" ? String(this.#u.has(e.id)) : null
		}, ...n);
		return e.trashed ? a : k(a, e);
	}
	#$(e) {
		let { key: t, dir: n } = this.#i, r = (e) => t === "type" ? F(e) : t === "workspace" ? R(e) : t === "size" ? e.type === "folder" ? e.trashed ? e.inside : a.children(e.id).length : e.size ?? 0 : t === "modified" ? e.modified : t === "deleted" ? e.trashed?.at ?? e.modified : t === "origin" && e.trashed ? he(e) : t === "location" ? L(e) : e.name, i = {
			folder: 0,
			file: 1,
			app: 1,
			link: 1
		};
		return [...e].sort((e, t) => {
			if (i[e.type] !== i[t.type]) return i[e.type] - i[t.type];
			let a = r(e), o = r(t);
			return ((typeof a == "number" ? a - o : String(a).localeCompare(String(o), u.locale, { numeric: !0 })) || e.name.localeCompare(t.name, u.locale, { numeric: !0 })) * n;
		});
	}
	#ee(e, t = e[e.length - 1] ?? this.#m) {
		this.#f = new Set(e), this.#m = t, this.render();
	}
	#te() {
		let { signal: e } = this.win, t = (e) => e.target.closest?.("[role=\"option\"], [role=\"treeitem\"]");
		this.list.addEventListener("pointerdown", (e) => {
			if (e.button !== 0 || e.target.closest(".fm-rename, .fm-head")) return;
			let n = e.target.closest("[data-twisty]");
			if (n) {
				e.preventDefault(), this.list.focus(), this.setOpen(n.dataset.twisty, !this.#u.has(n.dataset.twisty), e.altKey);
				return;
			}
			let r = t(e);
			if (!r) {
				e.ctrlKey || e.metaKey || e.shiftKey || this.#ee([]);
				return;
			}
			let i = r.dataset.id, o = this.#l.map((e) => e.id), s = !1;
			if (e.shiftKey && this.#p && o.includes(this.#p)) {
				let [t, n] = [o.indexOf(this.#p), o.indexOf(i)].sort((e, t) => e - t), r = o.slice(t, n + 1);
				this.#ee(e.ctrlKey || e.metaKey ? [.../* @__PURE__ */ new Set([...this.#f, ...r])] : r, i);
			} else if (e.ctrlKey || e.metaKey) {
				let e = new Set(this.#f);
				e.has(i) ? e.delete(i) : e.add(i), this.#p = i, this.#ee([...e], i);
			} else this.#p = i, this.#f.has(i) ? s = this.#f.size > 1 : this.#ee([i], i);
			this.inTrash && !a.isTrashed || !this.#f.has(i) || w(e, {
				ids: [...this.#f],
				stack: this.history,
				onEnd: ({ moved: e }) => {
					!e && s && this.#ee([i], i);
				}
			});
		}, { signal: e }), this.list.addEventListener("dblclick", (e) => {
			let n = t(e);
			if (!n || e.target.closest(".fm-rename, [data-twisty]")) return;
			if (this.inTrash) return this.openSelected();
			let r = a.get(n.dataset.id);
			r && this.open(r);
		}, { signal: e }), this.list.addEventListener("contextmenu", (e) => {
			if (e.preventDefault(), e.target.closest(".fm-head")) return l(e.clientX, e.clientY, this.#H());
			let n = t(e);
			if (!n) return this.#ae(e);
			this.#f.has(n.dataset.id) || this.#ee([n.dataset.id], n.dataset.id), this.#oe(e);
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
				e.preventDefault(), this.#ne(e.key === "ArrowRight");
				return;
			}
			let t = this.#ie(e.key);
			if (t == null || !this.#l.length) return;
			e.preventDefault();
			let n = this.#l.map((e) => e.id), r = n.indexOf(this.#m), i = t === -Infinity ? 0 : t === Infinity ? n.length - 1 : Math.max(0, Math.min(n.length - 1, (r < 0 ? 0 : r) + t)), a = n[i];
			if (e.shiftKey) {
				this.#p ||= this.#m ?? a;
				let [e, t] = [n.indexOf(this.#p), i].sort((e, t) => e - t);
				this.#ee(n.slice(e, t + 1), a);
			} else this.#re(a);
		}, { signal: e });
	}
	#ne(e) {
		let t = this.#l.findIndex((e) => e.id === this.#m), n = this.#l[t];
		if (!n) return;
		let r = this.#J(n), i = this.#d.get(n.id);
		if (e) {
			if (n.type !== "folder") return;
			if (!r) return this.setOpen(n.id, !0);
			let e = this.#l[t + 1];
			e && this.#d.get(e.id) > i && this.#re(e.id);
		} else r ? this.setOpen(n.id, !1) : i > 0 && this.#re(n.parent);
	}
	#re(e) {
		this.#p = e, this.#ee([e], e), this.list.querySelector(`#fm-${CSS.escape(e)}`)?.scrollIntoView({ block: "nearest" });
	}
	#ie(e) {
		let t = this.#n !== "list", n = t ? Math.max(1, Math.floor(this.list.clientWidth / Ut[this.#n])) : 1;
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
	#ae(e) {
		let t = {
			label: N("view.menu"),
			icon: "grid",
			items: Vt.map((e) => ({
				label: N(`view.${e}`),
				icon: this.#n === e ? "check" : null,
				action: () => this.setView(e)
			}))
		}, n = this.#n === "list" && {
			label: N("columns.menu"),
			icon: "list",
			items: this.#H()
		}, r = this.#l.some((e) => this.#J(e)) && {
			label: N("tree.collapseAll"),
			icon: "minus",
			action: () => {
				this.#u.clear(), this.render();
			}
		};
		if (this.inTrash) {
			let r = !this.#l.length;
			return l(e.clientX, e.clientY, [
				{
					label: N("menu.restoreAll"),
					icon: "undo",
					disabled: r,
					action: () => this.restore(a.trashed().map((e) => e.id))
				},
				{
					label: N("menu.emptyTrash"),
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
				label: N("menu.manageTags"),
				icon: "gear",
				action: () => te("settings", { tab: "tags" })
			},
			"-",
			t,
			n,
			r
		].filter(Boolean));
		let i = v.locateLink && !a.isRemote?.(this.folder);
		l(e.clientX, e.clientY, [
			{
				label: N("menu.newFolder"),
				icon: "folderPlus",
				action: () => this.create("folder")
			},
			{
				label: N("menu.newTextFile"),
				icon: "filePlus",
				action: () => this.create("file")
			},
			i && {
				label: N("menu.newLink"),
				icon: "link",
				action: () => this.newLink()
			},
			"-",
			t,
			n,
			r
		].filter(Boolean));
	}
	#oe(e) {
		let t = this.#l.filter((e) => this.#f.has(e.id)), n = t.length > 1, r = P(t.length);
		if (this.inTrash) {
			let i = t.map((e) => e.id);
			return l(e.clientX, e.clientY, [
				{
					label: n ? N("menu.restoreMany", { count: r }) : N("menu.restore"),
					icon: "undo",
					action: () => this.restore(i)
				},
				{
					label: N("menu.info"),
					icon: "info",
					shortcut: f.label("files.info"),
					action: () => this.info.setOpen(!0)
				},
				"-",
				{
					label: N("menu.purge"),
					icon: "trash",
					shortcut: f.label("items.delete"),
					danger: !0,
					action: () => this.purge(i)
				}
			]);
		}
		if (!n && t[0].mount) {
			let n = K(t[0].id);
			if (n) return tt(this, n, e.clientX, e.clientY);
		}
		let i = t.some((e) => e.system), a = t.some((e) => e.net), o = t.map((e) => e.id), s = this.inTag, c = !n && this.tree && t[0].type === "folder" && t[0], u = c && this.#u.has(c.id);
		l(e.clientX, e.clientY, [
			{
				label: n ? N("menu.openMany", { count: r }) : N("menu.open"),
				icon: "open",
				shortcut: f.label("items.open"),
				action: () => this.openSelected()
			},
			c && {
				label: N(u ? "tree.collapse" : "tree.expand"),
				icon: u ? "minus" : "plus",
				action: () => this.setOpen(c.id, !u)
			},
			c && {
				label: N("tree.expandAll"),
				icon: "plus",
				action: () => this.setOpen(c.id, !0, !0)
			},
			!n && t[0].type === "file" && {
				label: N("menu.openWith"),
				icon: "open",
				action: () => M(t[0], { choose: !0 })
			},
			...Tt(this, t),
			!n && t[0].type === "folder" && {
				label: N("menu.openInEditor"),
				icon: "code",
				action: () => te("editor", { folder: t[0].id })
			},
			s && !n && {
				label: N("menu.reveal"),
				icon: "folderOpen",
				action: () => this.reveal(t[0].id)
			},
			{
				label: N("menu.rename"),
				icon: "pencil",
				shortcut: f.label("items.rename"),
				disabled: n || i || t[0].noRename,
				action: () => this.rename(t[0].id)
			},
			!a && fe(o),
			s && {
				label: N("menu.untag", { name: s.name }),
				icon: "x",
				action: () => le(o, s.id, !1)
			},
			!a && ne(o),
			v.canLinkOnDesk?.(o) && {
				label: N("menu.deskLink"),
				icon: "link",
				action: () => this.addDeskLinks(o)
			},
			{
				label: N("menu.info"),
				icon: "info",
				shortcut: f.label("files.info"),
				action: () => this.info.setOpen(!0)
			},
			!n && {
				label: N("menu.properties"),
				icon: "info",
				action: () => ue(t[0].id)
			},
			...v.appActionEntries?.(o, { separator: !0 }) ?? [],
			"-",
			{
				label: t.every((e) => e.removeLabel) ? G()?.text(t[0].removeLabel) : n ? N("menu.deleteMany", { count: r }) : N("menu.delete"),
				icon: "trash",
				shortcut: f.label("items.delete"),
				danger: !0,
				disabled: i || t.every((e) => e.noRemove),
				action: () => this.remove(t.map((e) => e.id))
			}
		].filter(Boolean));
	}
	#se(e) {
		return e === Q || !!qt(e) || a.exists(e);
	}
	#ce(e) {
		let t = this.list.querySelector(`[data-id="${CSS.escape(e)}"]`)?.getBoundingClientRect();
		return {
			x: t ? t.left + 40 : innerWidth / 2,
			y: t ? t.bottom : innerHeight / 2
		};
	}
	#le(e, t) {
		for (; e.length;) {
			let n = e.pop();
			if (this.#se(n)) {
				t.push(this.folder), this.go(n, !1, !0);
				return;
			}
		}
	}
	#ue(e) {
		this.#g = e, this.render();
	}
	#de() {
		a.get(this.folder)?.type === "folder" && Z()?.record("files.go", { params: { folder: this.folder } });
	}
	#fe() {
		clearTimeout(this.#c);
		let e = this.search.value.trim();
		e !== this.#s && (this.#s = e, Z()?.record("files.search", { params: { query: e } }));
	}
	#pe() {
		let e = Z();
		if (!e) return;
		let t = {
			window: this.win,
			file: () => null
		};
		e.handle("files.go", ({ folder: e }) => {
			if (a.get(e)?.type !== "folder") throw Error(N("automation.noFolder"));
			this.go(e);
		}, t), e.handle("files.search", ({ query: e = "" }) => {
			this.search.value = e, this.#o = $t(e.trim()), this.#s = e.trim(), this.render();
		}, t), e.handle("files.sort", ({ by: e, direction: t }) => {
			if (!this.#R().some((t) => t.key === e)) throw Error(N("automation.noColumn"));
			this.#i = {
				key: e,
				dir: t === "desc" ? -1 : 1
			}, this.render();
		}, t), e.handle("files.view", ({ mode: e }) => {
			if (!Vt.includes(e)) throw Error(N("automation.noView"));
			this.setView(e);
		}, t);
	}
	async #me(t, n = "", r = ["ok"]) {
		if (!e.messageBox) return this.#ue(n ? `${t}: ${n}` : t), null;
		let i = await e.messageBox(this.win, {
			icon: "error",
			title: t,
			text: n,
			buttons: r
		});
		return this.list.isConnected && !this.win.el.contains(document.activeElement) && this.list.focus(), i;
	}
	notFound(e) {
		let t = N("place.home");
		this.#me(N(e === "tag" ? "error.tagNotFound" : "error.folderNotFound"), N(e === "tag" ? "error.tagNotFoundText" : "error.folderNotFoundText", { place: t }));
	}
	#he(e) {
		let t = e.node && O.has(e.node.id);
		if (this.inTrash) return t ? this.render() : void 0;
		if (this.inTag) return this.render();
		if (e.type === "remove" && e.ids.includes(this.folder)) return this.go(e.parent && a.exists(e.parent) ? e.parent : a.root, !1);
		let n = (e) => e === this.folder || this.#u.has(e), r = n(e.parent) || n(e.from), i = e.type !== "remove" && a.isInside(this.folder, e.node.id), o = [e.parent, e.from].some((e) => e && a.exists(e) && n(a.get(e).parent));
		(r || i || o || t) && (r && e.type !== "rename" && (this.#g = ""), this.render());
	}
};
export { Zt as default, Qt as newLink };
