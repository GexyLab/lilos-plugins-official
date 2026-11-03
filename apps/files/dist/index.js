import * as e from "/host/sdk.js";
import { UndoStack as t, Window as n, appIcon as r, fileType as i, formatBytes as a, fs as o, h as s, history as c, icon as l, messageBox as u, openMenu as d, resizeHandle as f, session as p, settings as m, shortcuts as h, splitName as g, storage as _, tags as v, toast as y, trackDrag as b } from "/host/sdk.js";
import * as x from "/host/system.js";
import { DESK_NAME as S, SYSTEM_FOLDERS as C, addTarget as w, confirmEmptyTrash as ee, confirmPurge as te, confirmRemove as T, describeWorkspace as ne, dragItems as E, dropZone as re, getApp as D, handleCommand as O, itemIcon as k, launch as ie, linkEntry as ae, links as A, markItem as oe, movableInto as se, moveInto as ce, nodeFacts as le, onWorkspacesChange as ue, openFile as de, pickFile as fe, recordCreated as pe, removeNodes as me, renameNode as he, restoreNodes as ge, setTag as _e, showProperties as ve, tagDots as ye, tagSubmenu as be } from "/host/system.js";
// src/shared/i18n.js
function xe(t, n) {
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
var { t: j } = xe("files", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"File Manager\",\"@description\":\"Browse, search and organize files and folders: tags, links, desktop links, trash, info and preview.\",\"@commands.files.info.label\":\"Show or hide the info panel\",\"@commands.files.preview.label\":\"Show or hide the preview\",\"@commands.files.address.label\":\"Type a path\",\"@entrypoints.main.params.folder.label\":\"Folder\",\"@entrypoints.main.params.folder.description\":\"The folder it shows when it opens\",\"@entrypoints.newLink.label\":\"New link\",\"@entrypoints.newLink.params.folder.label\":\"Folder\",\"@entrypoints.newLink.params.folder.description\":\"Where the link is made\",\"menu.newLink\":\"New link…\",\"type.linkWeb\":\"Link to a web page\",\"newLink.title\":\"New link\",\"newLink.address\":\"Path or address\",\"newLink.address.placeholder\":\"~/Documenti/Note.txt or sftp://server/folder\",\"newLink.address.hint\":\"A path of lilOS, or an address with its protocol: sftp://user@server/folder, smb://server/share/folder, webdavs://server/folder, https://… for a web page. Folders are always separated by /.\",\"newLink.browse\":\"Browse…\",\"newLink.browseFile\":\"A file…\",\"newLink.browseFolder\":\"A folder…\",\"newLink.pickFile\":\"Choose the file of the link\",\"newLink.pickFolder\":\"Choose the folder of the link\",\"newLink.name\":\"Name\",\"newLink.make\":\"Create\",\"newLink.checking\":\"Looking for it on the server…\",\"newLink.error.empty\":\"Write a path or an address\",\"newLink.error.backslash\":\"Use / to separate folders, for SMB too: smb://server/share/folder\",\"newLink.error.slashes\":\"An address starts with its protocol and //, for example sftp://server/folder\",\"newLink.error.password\":\"Don’t write the password in the address: the connection asks for it\",\"newLink.error.host\":\"The server in the address is not valid\",\"newLink.error.path\":\"The path in the address is not valid\",\"newLink.error.noPath\":\"“{path}” does not exist\",\"newLink.error.notLinkable\":\"A link points to a file or a folder\",\"newLink.error.protocol\":\"No module of lilOS knows the protocol {protocol}: an administrator can add it from the AppStore → Kernel\",\"newLink.error.noConnection\":\"Without a connection to that server the link can’t be made\",\"newLink.error.otherFolder\":\"The connection “{name}” opens another folder: the address is outside it\",\"newLink.error.noRemote\":\"“{path}” does not exist on “{name}”\",\"newLink.error.noName\":\"Write a name\",\"newLink.error.folderGone\":\"The folder of the link is not there any more\",\"@automation.files.go.label\":\"Go to a folder\",\"@automation.files.go.params.folder.label\":\"Folder\",\"@automation.files.search.label\":\"Search the folder\",\"@automation.files.search.params.query.label\":\"Search for\",\"@automation.files.sort.label\":\"Sort\",\"@automation.files.sort.params.by.label\":\"Sort by\",\"@automation.files.sort.params.by.options.name.label\":\"Name\",\"@automation.files.sort.params.by.options.modified.label\":\"Modified\",\"@automation.files.sort.params.by.options.size.label\":\"Size\",\"@automation.files.sort.params.by.options.type.label\":\"Type\",\"@automation.files.sort.params.by.options.workspace.label\":\"Workspace\",\"@automation.files.sort.params.by.options.location.label\":\"Location\",\"@automation.files.sort.params.by.options.deleted.label\":\"Deleted\",\"@automation.files.sort.params.by.options.origin.label\":\"Original location\",\"@automation.files.sort.params.direction.label\":\"Order\",\"@automation.files.sort.params.direction.options.asc.label\":\"Ascending\",\"@automation.files.sort.params.direction.options.desc.label\":\"Descending\",\"@automation.files.view.label\":\"Change the view\",\"@automation.files.view.params.mode.label\":\"View\",\"@automation.files.view.params.mode.options.list.label\":\"List\",\"@automation.files.view.params.mode.options.grid.label\":\"Icons\",\"@automation.files.view.params.mode.options.thumbs.label\":\"Previews\",\"@dependencies.ssh.reason\":\"SFTP connections in Network (and SSH sessions in Terminal)\",\"@dependencies.netfs-ftp.reason\":\"FTP and FTPS connections in Network\",\"@dependencies.netfs-webdav.reason\":\"WebDAV connections in Network\",\"@dependencies.netfs-smb.reason\":\"Windows shares (SMB) in Network\",\"@dependencies.netfs-nfs.reason\":\"NFS shares in Network\",\"@dependencies.netfs-onedrive.reason\":\"OneDrive in Network\",\"@dependencies.netfs-google.reason\":\"Google Drive and Google Photos in Network\",\"@dependencies.netfs-s3.reason\":\"Amazon S3 and compatible storage in Network\",\"@dependencies.netfs-azblob.reason\":\"Azure Blob Storage in Network\",\"toolbar.back\":\"Back (Alt ←)\",\"toolbar.forward\":\"Forward (Alt →)\",\"toolbar.up\":\"Parent folder (Alt ↑)\",\"toolbar.path\":\"Path\",\"toolbar.address\":\"Path: type a folder and press Enter\",\"toolbar.search\":\"Search this folder\",\"toolbar.searchIn\":\"Search {name}\",\"view.list\":\"List view\",\"view.grid\":\"Icon view\",\"view.thumbs\":\"Preview view\",\"view.menu\":\"View\",\"list.label\":\"Folder contents\",\"list.more\":\"and {count} more\",\"rename.label\":\"New name\",\"create.folderName\":\"New folder\",\"create.fileName\":\"New file.txt\",\"panel.info.title\":\"Info\",\"panel.info.show\":\"Show the info panel\",\"panel.info.hide\":\"Hide the info panel\",\"panel.info.resize\":\"Info panel width\",\"panel.info.close\":\"Close the info panel\",\"panel.preview.title\":\"Preview\",\"panel.preview.show\":\"Show the preview\",\"panel.preview.hide\":\"Hide the preview\",\"panel.preview.resize\":\"Preview panel width\",\"panel.preview.close\":\"Close the preview panel\",\"place.home\":\"Home\",\"place.trash\":\"Trash\",\"place.tag\":\"Tag “{name}”\",\"side.label\":\"Places\",\"side.links\":\"Links\",\"side.tags\":\"Tags\",\"side.tagHidden\":\"{name}: invisible tag, its items are hidden elsewhere\",\"side.unlinkTitle\":\"Remove the link (the file stays)\",\"link.remove\":\"Remove the link to “{name}”\",\"side.collapse\":\"Collapse {name}\",\"side.expand\":\"Expand {name}\",\"link.notFound\":\"Not found\",\"link.mountGone\":\"Removed connection\",\"column.name\":\"Name\",\"column.modified\":\"Modified\",\"column.deleted\":\"Deleted\",\"column.size\":\"Size\",\"column.type\":\"Type\",\"column.workspace\":\"Workspace\",\"column.origin\":\"Original location\",\"column.location\":\"Location\",\"column.resize\":\"Width of the “{name}” column\",\"column.resizeTitle\":\"Drag to resize, double-click to fit the content\",\"columns.menu\":\"Columns\",\"columns.fitAll\":\"Fit all columns to their content\",\"columns.reset\":\"Default columns\",\"tree.expand\":\"Show contents here\",\"tree.expandAll\":\"Show contents with all subfolders\",\"tree.collapse\":\"Hide contents\",\"tree.collapseAll\":\"Close all folders\",\"tree.expandTitle\":\"Show contents (Alt-click: with subfolders)\",\"tree.collapseTitle\":\"Hide contents\",\"tile.deleted\":\"Deleted: {date}\",\"tile.origin\":\"Original location: {place}\",\"tile.location\":\"Location: {place}\",\"tile.tags\":\"Tags: {names}\",\"trash.restoresTo\":\"Goes back to {place} when restored\",\"trash.keptForever\":\"Items stay until you delete them\",\"trash.keptDays\":{\"one\":\"Deleted permanently after {count} day\",\"other\":\"Deleted permanently after {count} days\"},\"type.folder\":\"Folder\",\"type.app\":\"App\",\"type.linkFolder\":\"Link to a folder\",\"type.linkFile\":\"Link to a file\",\"owner.unknown\":\"Unknown\",\"owner.shared\":\"Shared\",\"owner.removed\":\"{name} (deleted)\",\"owner.label\":\"Workspace: {name}\",\"count.items\":{\"zero\":\"Empty\",\"one\":\"{count} item\",\"other\":\"{count} items\"},\"empty.noMatch\":\"No items match “{query}”\",\"empty.trash\":\"The trash is empty\",\"empty.tag\":\"No items have this tag. Add it from the right-click menu → Tag.\",\"empty.folder\":\"This folder is empty\",\"status.items\":{\"one\":\"{count} item\",\"other\":\"{count} items\"},\"status.selected\":{\"one\":\"{count} selected\",\"other\":\"{count} selected\"},\"status.tag\":\"All items with this tag\",\"status.tagHidden\":\"Invisible tag: these items are hidden elsewhere\",\"message.hiddenByTag\":\"“{name}” is hidden by an invisible tag\",\"message.restoreToOpen\":\"To open it, restore it (right-click → Restore)\",\"message.systemFolders\":\"System folders can’t be deleted\",\"message.noPath\":\"“{path}” doesn’t exist\",\"message.typePath\":\"Type the path of a folder, such as {path}\",\"error.notFile\":\"Not a file\",\"error.rename\":\"Can’t rename “{name}”\",\"error.deskLink\":\"Can’t add the link to the desktop\",\"error.createFolder\":\"Can’t create the folder\",\"error.createFile\":\"Can’t create the file\",\"error.delete\":\"Can’t delete\",\"error.pathNotFound\":\"Path not found\",\"error.folderNotFound\":\"Folder not found\",\"error.folderNotFoundText\":\"The folder to open no longer exists: showing {place} instead.\",\"error.tagNotFound\":\"Tag not found\",\"error.tagNotFoundText\":\"The tag to show no longer exists: showing {place} instead.\",\"automation.noFolder\":\"The folder is not there any more\",\"automation.noColumn\":\"This folder has no such column to sort by\",\"automation.noView\":\"Unknown view\",\"toast.restored\":\"Restored “{name}” to {place}\",\"toast.restoredMany\":\"Restored {count} items to {place}\",\"toast.restoredManyPlaces\":\"Restored {count} items to {folders} folders\",\"toast.unlinked\":\"Link to “{name}” removed\",\"toast.linksAdded\":{\"one\":\"Link added\",\"other\":\"{count} links added\"},\"toast.deskLinks\":{\"one\":\"Link added to the desktop\",\"other\":\"{count} links added to the desktop\"},\"toast.trashed\":{\"one\":\"Moved to the trash\",\"other\":\"{count} items moved to the trash\"},\"menu.open\":\"Open\",\"menu.openMany\":\"Open {count} items\",\"menu.openWith\":\"Open with…\",\"computer.open\":\"Open on the computer\",\"computer.reveal\":\"Show in the computer's folder\",\"computer.export\":\"Export to the computer…\",\"computer.exportMany\":\"Export {count} files to the computer…\",\"computer.exported\":\"Saved on the computer: {path}\",\"computer.exportedMany\":\"{count} files saved on the computer\",\"computer.openFailed\":\"«{name}» not opened on the computer: {error}\",\"computer.exportFailed\":\"Not exported: {error}\",\"menu.openInEditor\":\"Open in Editor\",\"menu.reveal\":\"Show in folder\",\"menu.unlink\":\"Remove the link\",\"menu.deskLink\":\"Add a link to the desktop\",\"menu.rename\":\"Rename\",\"menu.untag\":\"Remove the tag “{name}”\",\"menu.info\":\"Info\",\"menu.properties\":\"Properties…\",\"menu.delete\":\"Delete\",\"menu.deleteMany\":\"Delete {count} items\",\"menu.restore\":\"Restore\",\"menu.restoreMany\":\"Restore {count} items\",\"menu.restoreAll\":\"Restore all\",\"menu.purge\":\"Delete permanently…\",\"menu.emptyTrash\":\"Empty the trash…\",\"menu.manageTags\":\"Manage tags…\",\"menu.newFolder\":\"New folder\",\"menu.newTextFile\":\"New text file\",\"info.folderHint\":\"Nothing selected: here is the open folder.\",\"info.general\":\"General\",\"info.organization\":\"Organization\",\"info.attributes\":\"Attributes\",\"info.text\":\"Text\",\"info.items\":\"Items\",\"info.types\":\"Types\",\"info.size\":\"Size\",\"info.bytesDetail\":\"{size} ({count} bytes)\",\"info.contents\":\"Contents\",\"info.contentsTotal\":\"{items}, {total} in all\",\"info.insideFolders\":{\"one\":\"{count} item in the folders\",\"other\":\"{count} items in the folders\"},\"info.lastDeleted\":\"Last deleted\",\"info.location\":\"Location\",\"info.manyFolders\":\"{count} different folders\",\"info.oldest\":\"Oldest\",\"info.newest\":\"Newest\",\"info.workspace\":\"Workspace\",\"info.tags\":\"Tags\",\"info.common\":\"In common\",\"info.none\":\"None\",\"info.tagHidden\":\"{name} (invisible tag)\",\"info.tagKind\":\"Tag\",\"info.retention\":\"Retention\",\"info.visibility\":\"Visibility\",\"info.visible\":\"Visible\",\"info.invisible\":\"Invisible: its items are hidden elsewhere\",\"info.lines\":\"Lines\",\"info.words\":\"Words\",\"info.chars\":\"Characters\",\"info.folders\":{\"one\":\"{count} folder\",\"other\":\"{count} folders\"},\"info.files\":{\"one\":\"{count} file\",\"other\":\"{count} files\"},\"info.apps\":{\"one\":\"{count} app\",\"other\":\"{count} apps\"},\"note.system\":\"System item: it can’t be renamed or deleted\",\"note.private\":\"Private: visible only in its workspace\",\"note.hidden\":\"Hidden by an invisible tag\",\"note.linked\":\"In the sidebar (Links)\",\"selection.count\":\"{count} items selected\",\"preview.none\":\"Nothing selected\",\"preview.selectFile\":\"Select a file to see its contents\",\"preview.oneAtATime\":\"The preview shows one item at a time\",\"preview.trashed\":\"In the trash\",\"preview.restoreToSee\":\"Restore it to see its contents\",\"preview.loading\":\"Loading…\",\"preview.readError\":\"Can’t read the file\",\"preview.open\":\"Open\",\"preview.launch\":\"Launch\",\"preview.emptyFile\":\"Empty file\",\"preview.emptyFolder\":\"Empty folder\",\"preview.imageAlt\":\"Preview of {name}\",\"preview.unavailable\":\"No preview available\",\"preview.notText\":\"The file doesn’t contain text\",\"preview.contentsOf\":\"Contents of {name}\",\"preview.cut\":\"Showing the first {shown} of {total} characters: open the file to see all of it\",\"preview.childTitle\":\"{name} — double-click to open\",\"preview.appMissing\":\"App not installed\",\"preview.byApp\":\"Preview made by {app}\",\"net.section\":\"Network\",\"net.add\":\"Connect to a server…\",\"net.none\":\"No connections\",\"net.state.on\":\"Connected\",\"net.state.connecting\":\"Connecting…\",\"net.state.off\":\"Not connected\",\"net.state.error\":\"Cannot connect\",\"net.menu.open\":\"Open\",\"net.menu.connect\":\"Connect\",\"net.menu.disconnect\":\"Disconnect\",\"net.menu.edit\":\"Edit connection…\",\"net.menu.remove\":\"Remove connection\",\"net.remove.title\":\"Remove the connection «{name}»?\",\"net.remove.text\":\"Its folder leaves Network and its saved password is deleted. The files on the server stay where they are.\",\"net.bar.on\":\"Connected to\",\"net.loading\":\"Reading the folder from the server…\",\"net.notRead\":\"The folder could not be read from the server\",\"net.error.title\":\"Network\",\"net.error.read\":\"Cannot read «{name}»\",\"net.preview.big\":\"Not shown: the file is on a server and is bigger than 1 MB\",\"net.connect.title\":\"Connect to a server\",\"net.edit.title\":\"Connection «{name}»\",\"net.protocol\":\"Protocol\",\"net.name\":\"Folder name in Network\",\"net.name.hint\":\"It will be {path}\",\"net.remember\":\"Remember the password (kept encrypted by lilOS)\",\"net.auto\":\"Connect when I sign in\",\"net.test\":\"Try\",\"net.testing\":\"Trying…\",\"net.test.ok\":\"It works: the server answers and the folder can be read\",\"net.connecting\":\"Connecting…\",\"net.connect.go\":\"Connect\",\"net.save\":\"Save and connect\",\"net.cancel\":\"Cancel\",\"net.later\":\"Later\",\"net.remember.signin\":\"Remember the sign-in (lilOS keeps it encrypted)\",\"net.web.open\":\"Open in the browser\",\"net.web.only\":\"It opens only on the provider's site\",\"net.web.copiedAs\":\"It opens on the provider's site; copied out, it becomes a {ext} file\",\"net.space.of\":\"{used} of {total} used\",\"net.space.used\":\"{used} used\",\"net.group.server\":\"Servers\",\"net.group.cloud\":\"Cloud\",\"net.group.local\":\"Local network\",\"net.signin.paste.text\":\"Sign in in the tab that opened. At the end the browser shows a page that does not open: copy its whole address from the address bar and paste it here.\",\"net.signin.paste.label\":\"Address of the page that did not open\",\"net.signin.paste.go\":\"Continue\",\"net.import.where\":\"Where to copy them\",\"net.import.change\":\"Change…\",\"net.import.step\":\"Pick photos and videos\",\"net.import.pick\":\"Pick in a new tab\",\"net.import.hint\":\"Google's page opens in a new tab: select up to 2000 items and press Done. The copy must start within an hour.\",\"net.import.opening\":\"Opening the page to pick…\",\"net.import.waiting\":\"Waiting for your choice in the other tab…\",\"net.import.picked\":\"{count} items picked: press Import\",\"net.import.none\":\"Nothing was picked\",\"net.import.failed\":\"Import failed\",\"net.import.go\":\"Import\",\"message.noRename\":\"«{name}» can’t be renamed here\",\"message.noRemove\":\"These items can’t be removed here\",\"net.signin.button\":\"Sign in\",\"net.signin.waiting\":\"Finish signing in in the window that opened…\",\"net.signin.blocked\":\"The browser blocked the sign-in window: allow pop-ups for lilOS and try again\",\"net.signin.other\":\"Use another account\",\"net.signin.again.title\":\"Sign in again to «{name}»\",\"net.signin.again.text\":\"The provider asks to sign in again for {account}.\",\"net.notReady.title\":\"{name} is not ready on this lilOS yet\",\"net.notReady.settings\":\"Open the settings\",\"office.open.word\":\"Open in Word online\",\"office.open.excel\":\"Open in Excel online\",\"office.open.powerpoint\":\"Open in PowerPoint online\",\"office.upload\":\"Upload to OneDrive and open\",\"office.none\":\"Connect OneDrive first (Rete → +)\",\"office.pick\":\"Upload to:\",\"office.uploaded\":\"«{name}» is on {folder}: what you change in Office is saved there\",\"office.again\":\"Signed in again: try once more\",\"office.failed\":\"«{name}» not uploaded\",\"office.exists.title\":\"File already on OneDrive\",\"office.exists.text\":\"There is already «{name}» in {folder}. Replace it with this one (what was changed online is lost), or keep both?\",\"office.exists.keep\":\"Keep both\",\"office.exists.replace\":\"Replace\",\"net.missing\":\"Missing: {fields}\",\"net.shares.list\":\"List…\",\"net.shares.none\":\"The server shares nothing you can see\",\"net.password.title\":\"Password for «{name}»\",\"net.password.text\":\"lilOS needs the password to connect to {address}.\",\"net.password.wrong\":\"The user or the password is not right\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"File Manager\",\"@description\":\"Sfoglia, cerca e organizza file e cartelle: tag, collegamenti, collegamenti sul desktop, cestino, informazioni e anteprima.\",\"@commands.files.info.label\":\"Mostra o nascondi le informazioni\",\"@commands.files.preview.label\":\"Mostra o nascondi l’anteprima\",\"@commands.files.address.label\":\"Scrivi un percorso\",\"@entrypoints.main.params.folder.label\":\"Cartella\",\"@entrypoints.main.params.folder.description\":\"La cartella che mostra all’apertura\",\"@entrypoints.newLink.label\":\"Nuovo collegamento\",\"@entrypoints.newLink.params.folder.label\":\"Cartella\",\"@entrypoints.newLink.params.folder.description\":\"Dove si crea il collegamento\",\"menu.newLink\":\"Nuovo collegamento…\",\"type.linkWeb\":\"Collegamento a una pagina web\",\"newLink.title\":\"Nuovo collegamento\",\"newLink.address\":\"Percorso o indirizzo\",\"newLink.address.placeholder\":\"~/Documenti/Note.txt o sftp://server/cartella\",\"newLink.address.hint\":\"Un percorso di lilOS, o un indirizzo con il protocollo: sftp://utente@server/cartella, smb://server/condivisione/cartella, webdavs://server/cartella, https://… per una pagina web. Le cartelle si separano sempre con /.\",\"newLink.browse\":\"Sfoglia…\",\"newLink.browseFile\":\"Un file…\",\"newLink.browseFolder\":\"Una cartella…\",\"newLink.pickFile\":\"Scegli il file del collegamento\",\"newLink.pickFolder\":\"Scegli la cartella del collegamento\",\"newLink.name\":\"Nome\",\"newLink.make\":\"Crea\",\"newLink.checking\":\"Lo cerco sul server…\",\"newLink.error.empty\":\"Scrivi un percorso o un indirizzo\",\"newLink.error.backslash\":\"Usa / per separare le cartelle, anche per SMB: smb://server/condivisione/cartella\",\"newLink.error.slashes\":\"Un indirizzo comincia con il protocollo e //, per esempio sftp://server/cartella\",\"newLink.error.password\":\"Non scrivere la password nell’indirizzo: la chiede la connessione\",\"newLink.error.host\":\"Il server nell’indirizzo non è valido\",\"newLink.error.path\":\"Il percorso nell’indirizzo non è valido\",\"newLink.error.noPath\":\"«{path}» non esiste\",\"newLink.error.notLinkable\":\"Un collegamento punta a un file o a una cartella\",\"newLink.error.protocol\":\"Nessun modulo di lilOS conosce il protocollo {protocol}: un amministratore può aggiungerlo dall’AppStore → Kernel\",\"newLink.error.noConnection\":\"Senza una connessione a quel server il collegamento non si può creare\",\"newLink.error.otherFolder\":\"La connessione «{name}» apre un’altra cartella: l’indirizzo è fuori da quella\",\"newLink.error.noRemote\":\"«{path}» non esiste su «{name}»\",\"newLink.error.noName\":\"Scrivi un nome\",\"newLink.error.folderGone\":\"La cartella del collegamento non c’è più\",\"@automation.files.go.label\":\"Vai a una cartella\",\"@automation.files.go.params.folder.label\":\"Cartella\",\"@automation.files.search.label\":\"Cerca nella cartella\",\"@automation.files.search.params.query.label\":\"Cerca\",\"@automation.files.sort.label\":\"Ordina\",\"@automation.files.sort.params.by.label\":\"Ordina per\",\"@automation.files.sort.params.by.options.name.label\":\"Nome\",\"@automation.files.sort.params.by.options.modified.label\":\"Modificato\",\"@automation.files.sort.params.by.options.size.label\":\"Dimensione\",\"@automation.files.sort.params.by.options.type.label\":\"Tipo\",\"@automation.files.sort.params.by.options.workspace.label\":\"Workspace\",\"@automation.files.sort.params.by.options.location.label\":\"Posizione\",\"@automation.files.sort.params.by.options.deleted.label\":\"Eliminato\",\"@automation.files.sort.params.by.options.origin.label\":\"Posizione originale\",\"@automation.files.sort.params.direction.label\":\"Ordine\",\"@automation.files.sort.params.direction.options.asc.label\":\"Crescente\",\"@automation.files.sort.params.direction.options.desc.label\":\"Decrescente\",\"@automation.files.view.label\":\"Cambia vista\",\"@automation.files.view.params.mode.label\":\"Vista\",\"@automation.files.view.params.mode.options.list.label\":\"Elenco\",\"@automation.files.view.params.mode.options.grid.label\":\"Icone\",\"@automation.files.view.params.mode.options.thumbs.label\":\"Anteprime\",\"@dependencies.ssh.reason\":\"Connessioni SFTP in Rete (e sessioni SSH nel Terminale)\",\"@dependencies.netfs-ftp.reason\":\"Connessioni FTP e FTPS in Rete\",\"@dependencies.netfs-webdav.reason\":\"Connessioni WebDAV in Rete\",\"@dependencies.netfs-smb.reason\":\"Condivisioni di Windows (SMB) in Rete\",\"@dependencies.netfs-nfs.reason\":\"Condivisioni NFS in Rete\",\"@dependencies.netfs-onedrive.reason\":\"OneDrive in Rete\",\"@dependencies.netfs-google.reason\":\"Google Drive e Google Foto in Rete\",\"@dependencies.netfs-s3.reason\":\"Amazon S3 e archivi compatibili in Rete\",\"@dependencies.netfs-azblob.reason\":\"Azure Blob Storage in Rete\",\"toolbar.back\":\"Indietro (Alt ←)\",\"toolbar.forward\":\"Avanti (Alt →)\",\"toolbar.up\":\"Cartella superiore (Alt ↑)\",\"toolbar.path\":\"Percorso\",\"toolbar.address\":\"Percorso: scrivi una cartella e premi Invio\",\"toolbar.search\":\"Cerca nella cartella\",\"toolbar.searchIn\":\"Cerca in {name}\",\"view.list\":\"Vista elenco\",\"view.grid\":\"Vista a icone\",\"view.thumbs\":\"Vista anteprime\",\"view.menu\":\"Vista\",\"list.label\":\"Contenuto della cartella\",\"list.more\":\"e altri {count}\",\"rename.label\":\"Nuovo nome\",\"create.folderName\":\"Nuova cartella\",\"create.fileName\":\"Nuovo file.txt\",\"panel.info.title\":\"Informazioni\",\"panel.info.show\":\"Mostra le informazioni\",\"panel.info.hide\":\"Nascondi le informazioni\",\"panel.info.resize\":\"Larghezza del pannello delle informazioni\",\"panel.info.close\":\"Chiudi il pannello delle informazioni\",\"panel.preview.title\":\"Anteprima\",\"panel.preview.show\":\"Mostra l’anteprima\",\"panel.preview.hide\":\"Nascondi l’anteprima\",\"panel.preview.resize\":\"Larghezza del pannello dell’anteprima\",\"panel.preview.close\":\"Chiudi il pannello dell’anteprima\",\"place.home\":\"Home\",\"place.trash\":\"Cestino\",\"place.tag\":\"Tag «{name}»\",\"side.label\":\"Risorse\",\"side.links\":\"Collegamenti\",\"side.tags\":\"Tag\",\"side.tagHidden\":\"{name}: tag invisibile, i suoi elementi sono nascosti altrove\",\"side.unlinkTitle\":\"Elimina il collegamento (il file resta)\",\"link.remove\":\"Elimina il collegamento a «{name}»\",\"side.collapse\":\"Comprimi {name}\",\"side.expand\":\"Espandi {name}\",\"link.notFound\":\"Non trovato\",\"link.mountGone\":\"Connessione rimossa\",\"column.name\":\"Nome\",\"column.modified\":\"Modificato\",\"column.deleted\":\"Eliminato\",\"column.size\":\"Dimensione\",\"column.type\":\"Tipo\",\"column.workspace\":\"Workspace\",\"column.origin\":\"Posizione originale\",\"column.location\":\"Posizione\",\"column.resize\":\"Larghezza della colonna «{name}»\",\"column.resizeTitle\":\"Trascina per ridimensionare, doppio clic per adattare al contenuto\",\"columns.menu\":\"Colonne\",\"columns.fitAll\":\"Adatta tutte le colonne al contenuto\",\"columns.reset\":\"Ripristina le colonne\",\"tree.expand\":\"Mostra il contenuto qui\",\"tree.expandAll\":\"Mostra il contenuto con tutte le sottocartelle\",\"tree.collapse\":\"Nascondi il contenuto\",\"tree.collapseAll\":\"Chiudi tutte le cartelle\",\"tree.expandTitle\":\"Mostra il contenuto (Alt+clic: anche le sottocartelle)\",\"tree.collapseTitle\":\"Nascondi il contenuto\",\"tile.deleted\":\"Eliminato: {date}\",\"tile.origin\":\"Posizione originale: {place}\",\"tile.location\":\"Posizione: {place}\",\"tile.tags\":\"Tag: {names}\",\"trash.restoresTo\":\"Ripristinando torna in {place}\",\"trash.keptForever\":\"Gli elementi restano finché non li elimini\",\"trash.keptDays\":{\"one\":\"Eliminati definitivamente dopo {count} giorno\",\"other\":\"Eliminati definitivamente dopo {count} giorni\"},\"type.folder\":\"Cartella\",\"type.app\":\"App\",\"type.linkFolder\":\"Collegamento a una cartella\",\"type.linkFile\":\"Collegamento a un file\",\"owner.unknown\":\"Sconosciuto\",\"owner.shared\":\"Condiviso\",\"owner.removed\":\"{name} (eliminato)\",\"owner.label\":\"Workspace: {name}\",\"count.items\":{\"zero\":\"Vuota\",\"one\":\"{count} elemento\",\"other\":\"{count} elementi\"},\"empty.noMatch\":\"Nessun elemento corrisponde a «{query}»\",\"empty.trash\":\"Il cestino è vuoto\",\"empty.tag\":\"Nessun elemento ha questo tag. Si assegna dal menu del tasto destro → Tag.\",\"empty.folder\":\"Questa cartella è vuota\",\"status.items\":{\"one\":\"{count} elemento\",\"other\":\"{count} elementi\"},\"status.selected\":{\"one\":\"{count} selezionato\",\"other\":\"{count} selezionati\"},\"status.tag\":\"Tutti gli elementi con questo tag\",\"status.tagHidden\":\"Tag invisibile: questi elementi sono nascosti altrove\",\"message.hiddenByTag\":\"«{name}» è nascosto da un tag invisibile\",\"message.restoreToOpen\":\"Per aprirlo, ripristinalo (clic destro → Ripristina)\",\"message.systemFolders\":\"Le cartelle di sistema non si possono eliminare\",\"message.noPath\":\"«{path}» non esiste\",\"message.typePath\":\"Scrivi il percorso di una cartella, come {path}\",\"error.notFile\":\"Non è un file\",\"error.rename\":\"Impossibile rinominare «{name}»\",\"error.deskLink\":\"Impossibile aggiungere il collegamento al desktop\",\"error.createFolder\":\"Impossibile creare la cartella\",\"error.createFile\":\"Impossibile creare il file\",\"error.delete\":\"Impossibile eliminare\",\"error.pathNotFound\":\"Percorso non trovato\",\"error.folderNotFound\":\"Cartella non trovata\",\"error.folderNotFoundText\":\"La cartella da aprire non esiste più: al suo posto c’è {place}.\",\"error.tagNotFound\":\"Tag non trovato\",\"error.tagNotFoundText\":\"Il tag da mostrare non esiste più: al suo posto c’è {place}.\",\"automation.noFolder\":\"La cartella non c’è più\",\"automation.noColumn\":\"Questa cartella non ha una colonna per cui ordinare così\",\"automation.noView\":\"Vista sconosciuta\",\"toast.restored\":\"Ripristinato «{name}» in {place}\",\"toast.restoredMany\":\"Ripristinati {count} elementi in {place}\",\"toast.restoredManyPlaces\":\"Ripristinati {count} elementi in {folders} cartelle\",\"toast.unlinked\":\"Collegamento a «{name}» eliminato\",\"toast.linksAdded\":{\"one\":\"Collegamento aggiunto\",\"other\":\"{count} collegamenti aggiunti\"},\"toast.deskLinks\":{\"one\":\"Collegamento aggiunto al desktop\",\"other\":\"{count} collegamenti aggiunti al desktop\"},\"toast.trashed\":{\"one\":\"Spostato nel cestino\",\"other\":\"{count} elementi spostati nel cestino\"},\"menu.open\":\"Apri\",\"menu.openMany\":\"Apri {count} elementi\",\"menu.openWith\":\"Apri con…\",\"computer.open\":\"Apri sul computer\",\"computer.reveal\":\"Mostra nella cartella del computer\",\"computer.export\":\"Esporta sul computer…\",\"computer.exportMany\":\"Esporta {count} file sul computer…\",\"computer.exported\":\"Salvato sul computer: {path}\",\"computer.exportedMany\":\"{count} file salvati sul computer\",\"computer.openFailed\":\"«{name}» non aperto sul computer: {error}\",\"computer.exportFailed\":\"Non esportato: {error}\",\"menu.openInEditor\":\"Apri nell’Editor\",\"menu.reveal\":\"Mostra nella cartella\",\"menu.unlink\":\"Elimina il collegamento\",\"menu.deskLink\":\"Aggiungi un collegamento al desktop\",\"menu.rename\":\"Rinomina\",\"menu.untag\":\"Togli il tag «{name}»\",\"menu.info\":\"Informazioni\",\"menu.properties\":\"Proprietà…\",\"menu.delete\":\"Elimina\",\"menu.deleteMany\":\"Elimina {count} elementi\",\"menu.restore\":\"Ripristina\",\"menu.restoreMany\":\"Ripristina {count} elementi\",\"menu.restoreAll\":\"Ripristina tutto\",\"menu.purge\":\"Elimina definitivamente…\",\"menu.emptyTrash\":\"Svuota il cestino…\",\"menu.manageTags\":\"Gestisci i tag…\",\"menu.newFolder\":\"Nuova cartella\",\"menu.newTextFile\":\"Nuovo file di testo\",\"info.folderHint\":\"Nessun elemento selezionato: ecco la cartella aperta.\",\"info.general\":\"Generali\",\"info.organization\":\"Organizzazione\",\"info.attributes\":\"Attributi\",\"info.text\":\"Testo\",\"info.items\":\"Elementi\",\"info.types\":\"Tipi\",\"info.size\":\"Dimensione\",\"info.bytesDetail\":\"{size} ({count} byte)\",\"info.contents\":\"Contenuto\",\"info.contentsTotal\":\"{items}, {total} in tutto\",\"info.insideFolders\":{\"one\":\"{count} elemento nelle cartelle\",\"other\":\"{count} elementi nelle cartelle\"},\"info.lastDeleted\":\"Ultima eliminazione\",\"info.location\":\"Posizione\",\"info.manyFolders\":\"{count} cartelle diverse\",\"info.oldest\":\"Meno recente\",\"info.newest\":\"Più recente\",\"info.workspace\":\"Workspace\",\"info.tags\":\"Tag\",\"info.common\":\"In comune\",\"info.none\":\"Nessuno\",\"info.tagHidden\":\"{name} (tag invisibile)\",\"info.tagKind\":\"Tag\",\"info.retention\":\"Conservazione\",\"info.visibility\":\"Visibilità\",\"info.visible\":\"Visibile\",\"info.invisible\":\"Invisibile: i suoi elementi sono nascosti altrove\",\"info.lines\":\"Righe\",\"info.words\":\"Parole\",\"info.chars\":\"Caratteri\",\"info.folders\":{\"one\":\"{count} cartella\",\"other\":\"{count} cartelle\"},\"info.files\":{\"one\":\"{count} file\",\"other\":\"{count} file\"},\"info.apps\":{\"one\":\"{count} app\",\"other\":\"{count} app\"},\"note.system\":\"Di sistema: non si rinomina e non si elimina\",\"note.private\":\"Privata: si vede solo nel suo workspace\",\"note.hidden\":\"Nascosto da un tag invisibile\",\"note.linked\":\"Nella barra laterale (Collegamenti)\",\"selection.count\":\"{count} elementi selezionati\",\"preview.none\":\"Nessun elemento selezionato\",\"preview.selectFile\":\"Seleziona un file per vederne il contenuto\",\"preview.oneAtATime\":\"L’anteprima mostra un elemento alla volta\",\"preview.trashed\":\"Nel cestino\",\"preview.restoreToSee\":\"Ripristinalo per vederne il contenuto\",\"preview.loading\":\"Caricamento…\",\"preview.readError\":\"Impossibile leggere il file\",\"preview.open\":\"Apri\",\"preview.launch\":\"Avvia\",\"preview.emptyFile\":\"File vuoto\",\"preview.emptyFolder\":\"Cartella vuota\",\"preview.imageAlt\":\"Anteprima di {name}\",\"preview.unavailable\":\"Anteprima non disponibile\",\"preview.notText\":\"Il file non contiene testo\",\"preview.contentsOf\":\"Contenuto di {name}\",\"preview.cut\":\"Mostrati i primi {shown} caratteri su {total}: apri il file per vederlo tutto\",\"preview.childTitle\":\"{name} — doppio clic per aprire\",\"preview.appMissing\":\"App non installata\",\"preview.byApp\":\"Anteprima creata da {app}\",\"net.section\":\"Rete\",\"net.add\":\"Connetti a un server…\",\"net.none\":\"Nessuna connessione\",\"net.state.on\":\"Connessa\",\"net.state.connecting\":\"Connessione in corso…\",\"net.state.off\":\"Non connessa\",\"net.state.error\":\"Non si connette\",\"net.menu.open\":\"Apri\",\"net.menu.connect\":\"Connetti\",\"net.menu.disconnect\":\"Disconnetti\",\"net.menu.edit\":\"Modifica connessione…\",\"net.menu.remove\":\"Rimuovi connessione\",\"net.remove.title\":\"Rimuovere la connessione «{name}»?\",\"net.remove.text\":\"La sua cartella esce da Rete e la password salvata viene cancellata. I file sul server restano dove sono.\",\"net.bar.on\":\"Connesso a\",\"net.loading\":\"Lettura della cartella dal server…\",\"net.notRead\":\"Non è stato possibile leggere la cartella dal server\",\"net.error.title\":\"Rete\",\"net.error.read\":\"Non si legge «{name}»\",\"net.preview.big\":\"Non mostrato: il file è su un server ed è più grande di 1 MB\",\"net.connect.title\":\"Connetti a un server\",\"net.edit.title\":\"Connessione «{name}»\",\"net.protocol\":\"Protocollo\",\"net.name\":\"Nome della cartella in Rete\",\"net.name.hint\":\"Sarà {path}\",\"net.remember\":\"Ricorda la password (lilOS la tiene cifrata)\",\"net.auto\":\"Connetti all’accesso\",\"net.test\":\"Prova\",\"net.testing\":\"Prova in corso…\",\"net.test.ok\":\"Funziona: il server risponde e la cartella si legge\",\"net.connecting\":\"Connessione in corso…\",\"net.connect.go\":\"Connetti\",\"net.save\":\"Salva e connetti\",\"net.cancel\":\"Annulla\",\"net.later\":\"Più tardi\",\"net.remember.signin\":\"Ricorda l’accesso (lilOS lo tiene cifrato)\",\"net.web.open\":\"Apri nel browser\",\"net.web.only\":\"Si apre solo sul sito del fornitore\",\"net.web.copiedAs\":\"Si apre sul sito del fornitore; copiato fuori diventa un file {ext}\",\"net.space.of\":\"{used} di {total} usati\",\"net.space.used\":\"{used} usati\",\"net.group.server\":\"Server\",\"net.group.cloud\":\"Cloud\",\"net.group.local\":\"Rete locale\",\"net.signin.paste.text\":\"Accedi nella scheda che si è aperta. Alla fine il browser mostra una pagina che non si apre: copia tutto il suo indirizzo dalla barra degli indirizzi e incollalo qui.\",\"net.signin.paste.label\":\"Indirizzo della pagina che non si è aperta\",\"net.signin.paste.go\":\"Continua\",\"net.import.where\":\"Dove copiarle\",\"net.import.change\":\"Cambia…\",\"net.import.step\":\"Scegli foto e video\",\"net.import.pick\":\"Scegli in una nuova scheda\",\"net.import.hint\":\"La pagina di Google si apre in una nuova scheda: seleziona fino a 2000 elementi e premi Fine. La copia va avviata entro un’ora.\",\"net.import.opening\":\"Apertura della pagina per scegliere…\",\"net.import.waiting\":\"In attesa della tua scelta nell’altra scheda…\",\"net.import.picked\":\"{count} elementi scelti: premi Importa\",\"net.import.none\":\"Non hai scelto niente\",\"net.import.failed\":\"Importazione non riuscita\",\"net.import.go\":\"Importa\",\"message.noRename\":\"«{name}» qui non si rinomina\",\"message.noRemove\":\"Questi elementi qui non si eliminano\",\"net.signin.button\":\"Accedi\",\"net.signin.waiting\":\"Completa l’accesso nella finestra che si è aperta…\",\"net.signin.blocked\":\"Il browser ha bloccato la finestra di accesso: consenti le finestre a comparsa per lilOS e riprova\",\"net.signin.other\":\"Usa un altro account\",\"net.signin.again.title\":\"Accedi di nuovo a «{name}»\",\"net.signin.again.text\":\"Il fornitore chiede di ripetere l’accesso per {account}.\",\"net.notReady.title\":\"{name} non è ancora pronto su questo lilOS\",\"net.notReady.settings\":\"Apri le impostazioni\",\"office.open.word\":\"Apri in Word online\",\"office.open.excel\":\"Apri in Excel online\",\"office.open.powerpoint\":\"Apri in PowerPoint online\",\"office.upload\":\"Carica su OneDrive e apri\",\"office.none\":\"Prima collega OneDrive (Rete → +)\",\"office.pick\":\"Carica su:\",\"office.uploaded\":\"«{name}» è su {folder}: quello che cambi in Office si salva lì\",\"office.again\":\"Accesso rifatto: riprova\",\"office.failed\":\"«{name}» non caricato\",\"office.exists.title\":\"File già su OneDrive\",\"office.exists.text\":\"In {folder} c’è già «{name}». Lo sostituisci con questo (quello che è stato cambiato online si perde) o li tieni entrambi?\",\"office.exists.keep\":\"Tieni entrambi\",\"office.exists.replace\":\"Sostituisci\",\"net.missing\":\"Mancano: {fields}\",\"net.shares.list\":\"Elenca…\",\"net.shares.none\":\"Il server non condivide niente che tu possa vedere\",\"net.password.title\":\"Password di «{name}»\",\"net.password.text\":\"lilOS ha bisogno della password per connettersi a {address}.\",\"net.password.wrong\":\"Utente o password non giusti\"}}")
}), M = (e) => e.toLocaleString(p.locale), N = (e) => e.type === "folder" ? j("type.folder") : e.type === "app" ? j("type.app") : e.type === "link" ? j({
	folder: "type.linkFolder",
	web: "type.linkWeb"
}[e.link?.kind] ?? "type.linkFile") : i(e.name).label;
function Se(t) {
	let n = t.link ?? {};
	return n.kind === "web" ? n.url : n.home ? o.exists(n.home) ? o.path(n.home) : j("link.notFound") : `${e.net?.mount(n.mount)?.name ?? j("link.mountGone")}: ${n.path}`;
}
var P = (e) => e.id === o.root ? j("place.home") : e.name, F = (e) => e.parent === o.root ? j("place.home") : o.path(e.parent);
function Ce(e) {
	let t = e.trashed.from;
	return o.exists(t) && t !== o.root ? o.path(t) : j("place.home");
}
function I(e) {
	let t = ne(e.workspace);
	return t ? t.removed ? j("owner.removed", { name: t.name }) : t.name : e.workspace ? j("owner.unknown") : j("owner.shared");
}
function we(e) {
	let t = ne(e.workspace), n = s("span", {
		class: "ws-owner-dot",
		"aria-hidden": "true"
	});
	return t && (n.style.background = t.color), s("span", {
		class: [
			"ws-owner",
			!t && "shared",
			t?.removed && "removed"
		].filter(Boolean).join(" "),
		title: j("owner.label", { name: I(e) })
	}, n, s("span", {}, I(e)));
}
var L = (e) => j("count.items", {
	n: e,
	count: M(e)
});
function Te(e) {
	return e.type === "folder" ? L(e.trashed ? e.inside : o.children(e.id).length) : e.type === "file" && e.net && e.web ? "—" : e.type === "file" ? a(e.size ?? 0) : "—";
}
function Ee() {
	let e = m.get("trashRetention");
	return e <= 0 ? j("trash.keptForever") : j("trash.keptDays", {
		n: e,
		count: M(e)
	});
}
var R = (e) => new Date(e).toLocaleString(p.locale, {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit"
}), De = "files-panels", Oe = 720, ke = class {
	open;
	width;
	constructor({ key: e, title: t, resizeLabel: n, closeLabel: r, width: i, open: a = !1, room: o, onLayout: c }) {
		this.key = e, this.room = o, this.onLayout = c;
		let u = _.get(De, {})?.[e];
		this.open = typeof u?.open == "boolean" ? u.open : a, this.width = Number.isFinite(u?.width) ? Ae(u.width, 180, Oe) : i, this.body = s("div", { class: "fm-panel-body" }), this.el = s("aside", {
			class: `fm-panel fm-panel-${e}`,
			"aria-label": t,
			hidden: !this.open
		}), this.split = f({
			get: () => this.el.offsetWidth,
			set: (e, t) => this.resize(e, t),
			min: 180,
			max: () => this.#e(),
			reset: i,
			invert: !0,
			label: n,
			host: this.el,
			className: "at-start"
		}), this.el.append(this.split, s("div", { class: "fm-panel-head" }, s("span", { class: "fm-panel-title" }, t), s("button", {
			class: "fm-btn",
			type: "button",
			title: r,
			"aria-label": r,
			onclick: () => this.setOpen(!1)
		}, l("x"))), this.body);
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
		this.el.style.width = `${e}px`;
	}
	resize(e, t = !0) {
		this.width = Math.round(Ae(e, 180, this.#e())), t && this.#t(), this.onLayout();
	}
	#e() {
		return Math.max(180, Math.min(Oe, this.room()));
	}
	#t() {
		let e = _.get(De, {});
		_.set(De, {
			...e && typeof e == "object" ? e : {},
			[this.key]: {
				open: this.open,
				width: this.width
			}
		});
	}
}, Ae = (e, t, n) => Math.max(t, Math.min(e, n)), je = 1e5, Me = 5 << 20, Ne = 30, Pe = 200, z = (e) => e < 1024 ? a(e) : j("info.bytesDetail", {
	size: a(e),
	count: M(e)
}), Fe = (e) => o.usage(e.id)?.bytes ?? e.bytes ?? e.size ?? 0, Ie = /* @__PURE__ */ new Set(["workspace", "tags"]), Le = (e) => e?.type === "file" && !e.trashed, Re = (e) => `${e.id}:${e.modified}:${e.size ?? 0}`;
function ze(e) {
	let t = e.map((e) => v.get(e)).filter(Boolean);
	return t.length ? s("span", { class: "fm-chips" }, t.map((e) => s("span", {
		class: "fm-chip",
		title: e.visible ? e.name : j("info.tagHidden", { name: e.name })
	}, s("span", {
		class: "tag-dot",
		style: { background: e.color },
		"aria-hidden": "true"
	}), e.name))) : j("info.none");
}
var B = (e) => s("dl", { class: "fm-facts" }, e.filter(Boolean).flatMap(([e, t, n]) => [s("dt", {}, e), s("dd", { class: n }, t)])), V = (e, ...t) => s("section", { class: "fm-info-section" }, s("h6", {}, e), ...t);
function Be(e, t, n) {
	return s("div", { class: "fm-info-head" }, s("span", { class: "fm-info-icon" }, e), s("div", { class: "fm-info-titles" }, s("div", {
		class: "fm-info-name",
		title: t
	}, t), n && s("div", { class: "fm-info-kind" }, n)));
}
function Ve({ nodes: e, place: t, text: n }) {
	return e.length > 1 ? Ue(e) : e.length === 1 ? He(e[0], n) : t.trash ? We() : t.tag ? Ge(t.tag) : s("div", {}, s("p", { class: "fm-info-hint" }, j("info.folderHint")), He(t.node, n));
}
function He(e, t) {
	let n = le(e), r = n.filter((e) => !Ie.has(e.key)).map((e) => e.key === "size" ? [e.label, z(e.bytes)] : [
		e.label,
		e.value,
		e.mono ? "mono" : null
	]), i = n.filter((e) => Ie.has(e.key)).map((t) => t.key === "workspace" ? [t.label, we(e)] : [t.label, ze(t.tags.map((e) => e.id))]), a = [
		e.system && j("note.system"),
		e.private && j("note.private"),
		!e.trashed && o.isHidden(e.id) && j("note.hidden"),
		!e.trashed && A.has(e.id) && j("note.linked")
	].filter(Boolean), c = s("div", {}, Be(k(e), P(e), N(e)), V(j("info.general"), B(r)), V(j("info.organization"), B(i)), a.length ? V(j("info.attributes"), s("ul", { class: "fm-notes" }, a.map((e) => s("li", {}, e)))) : null);
	if (Le(e) && (e.size ?? 0) <= Me) {
		let n = s("dd", {}, "…"), r = s("dd", {}, "…"), i = s("dd", {}, "…"), a = V(j("info.text"), s("dl", { class: "fm-facts" }, s("dt", {}, j("info.lines")), n, s("dt", {}, j("info.words")), r, s("dt", {}, j("info.chars")), i));
		c.append(a), t(e).then((e) => {
			if (e.slice(0, 8e3).includes("\0")) return a.remove();
			n.textContent = M(e ? e.split("\n").length : 0), r.textContent = M(e.trim() ? e.trim().split(/\s+/).length : 0), i.textContent = M([...e].length);
		}, () => {
			n.textContent = r.textContent = i.textContent = "—";
		});
	}
	return c;
}
function Ue(e) {
	let t = (t) => e.filter((e) => e.type === t).length, n = t("folder"), r = t("file"), i = t("app"), a = [
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
	].filter(Boolean).join(", "), c = e.reduce((e, t) => e + (t.type === "folder" ? t.trashed ? t.inside : o.count(t.id) : 0), 0), l = /* @__PURE__ */ new Map();
	for (let t of e) l.set(N(t), (l.get(N(t)) ?? 0) + 1);
	let u = new Set(e.map((e) => e.parent)), d = e.map((e) => e.modified), f = [...new Set(e.map(I))], p = [...new Set(e.flatMap((e) => e.tags ?? []))], m = p.filter((t) => e.every((e) => e.tags?.includes(t))), h = e.every((e) => e.trashed), g = s("span", { class: "fm-info-stack" }, e.slice(0, 3).map((e) => s("span", {}, k(e))));
	return s("div", {}, Be(g, j("selection.count", { count: M(e.length) }), a), V(j("info.general"), B([
		[j("info.size"), z(e.reduce((e, t) => e + Fe(t), 0))],
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
		[j("info.oldest"), R(Math.min(...d))],
		[j("info.newest"), R(Math.max(...d))]
	])), V(j("info.organization"), B([
		[j("info.workspace"), f.join(", ")],
		[j("info.tags"), ze(p)],
		p.length > 0 && [j("info.common"), ze(m)]
	])), V(j("info.items"), s("ul", { class: "fm-names" }, e.slice(0, Ne).map((e) => s("li", { title: e.name }, s("span", { class: "fm-icon" }, k(e)), s("span", {}, e.name))), e.length > Ne ? s("li", { class: "more" }, j("list.more", { count: M(e.length - Ne) })) : null)));
}
function We() {
	let e = o.trashed(), t = e.reduce((e, t) => e + 1 + t.inside, 0);
	return s("div", {}, Be(s("span", { class: "fm-info-glyph" }, l("trash")), j("place.trash"), L(e.length)), V(j("info.general"), B([
		[j("info.contents"), e.length ? j("info.contentsTotal", {
			items: L(e.length),
			total: M(t)
		}) : L(0)],
		[j("info.size"), z(e.reduce((e, t) => e + (t.bytes ?? 0), 0))],
		e.length > 0 && [j("info.lastDeleted"), R(e[0].trashed.at)],
		[j("info.retention"), Ee()]
	])));
}
function Ge(e) {
	let t = o.tagged(e.id);
	return s("div", {}, Be(s("span", {
		class: "tag-dot fm-info-tag",
		style: { background: e.color },
		"aria-hidden": "true"
	}), e.name, j("info.tagKind")), V(j("info.general"), B([
		[j("info.items"), L(t.length)],
		[j("info.size"), z(t.reduce((e, t) => e + Fe(t), 0))],
		[j("info.visibility"), e.visible ? j("info.visible") : j("info.invisible")]
	])));
}
var Ke = class {
	#e = null;
	#t = null;
	constructor(e, { text: t, open: n }) {
		this.body = e, this.text = t, this.open = n;
	}
	update(e) {
		let t = e.length === 1 ? e[0] : null, n = t ? `${Re(t)}:${t.name}:${t.type === "folder" && !t.trashed ? o.children(t.id).map((e) => e.id + e.name).join() : ""}` : `${e.length}`;
		if (n === this.#e) return;
		if (this.#e = n, this.#d(), !t) return this.#u(e.length ? H("list", j("selection.count", { count: M(e.length) }), j("preview.oneAtATime")) : H("file", j("preview.none"), j("preview.selectFile")));
		if (t.trashed) return this.#u(this.#n(t), H("trash", j("preview.trashed"), j("preview.restoreToSee")));
		if (t.type === "folder") return this.#u(this.#n(t), this.#s(t));
		if (t.type === "app") return this.#u(this.#n(t), this.#l(t));
		if (t.type === "link") return this.#u(this.#n(t), this.#c(t));
		let r = s("div", { class: "fm-preview-wait" }, j("preview.loading"));
		this.#u(this.#n(t), r);
		let i = (e) => {
			this.#e === n && r.replaceWith(e());
		};
		this.#a(t).then((e) => {
			if (this.#e === n) return e ? i(() => this.#o(t, e)) : this.text(t).then((e) => i(() => this.#r(t, e)));
		}).catch((e) => i(() => H("x", j("preview.readError"), e?.message ?? "")));
	}
	destroy() {
		this.#d();
	}
	#n(e) {
		let t = e.trashed ? null : e.type === "app" ? j("preview.launch") : j("preview.open");
		return s("div", { class: "fm-preview-head" }, s("span", { class: "fm-icon" }, k(e)), s("span", {
			class: "fm-preview-name",
			title: e.name
		}, P(e)), t && s("button", {
			class: "fm-preview-open",
			type: "button",
			onclick: () => this.open(e)
		}, t));
	}
	#r(e, t) {
		if (!t) return H("file", j("preview.emptyFile"), "");
		let { ext: n } = i(e.name);
		return n === "svg" && /^\s*(<\?xml[^>]*>\s*)?(<!--[\s\S]*?-->\s*)*<svg[\s>]/i.test(t) ? (this.#t = URL.createObjectURL(new Blob([t], { type: "image/svg+xml" })), s("div", { class: "fm-preview-image" }, s("img", {
			src: this.#t,
			alt: j("preview.imageAlt", { name: e.name })
		}))) : t.slice(0, 8e3).includes("\0") ? H("file", j("preview.unavailable"), j("preview.notText")) : this.#i(e, t);
	}
	#i(e, t, n = null) {
		let r = t.length > je;
		return s("div", { class: "fm-preview-textwrap" }, s("pre", {
			class: "fm-preview-text",
			tabindex: "0",
			"aria-label": j("preview.contentsOf", { name: e.name })
		}, r ? t.slice(0, je) : t), r ? s("div", { class: "fm-preview-note" }, j("preview.cut", {
			shown: M(je),
			total: M(t.length)
		})) : null, n);
	}
	#a(e) {
		return typeof x.filePreview == "function" ? x.filePreview(e).catch((t) => (console.warn(`[files] anteprima di ${e.name}:`, t), null)) : Promise.resolve(null);
	}
	#o(e, t) {
		let n = s("div", { class: "fm-preview-note" }, [j("preview.byApp", { app: D(t.app)?.name ?? t.app }), t.note].filter(Boolean).join(" · "));
		if (typeof t.text == "string") return t.text ? this.#i(e, t.text, n) : H("file", j("preview.emptyFile"), "");
		let r;
		return t.image instanceof Blob ? (this.#t = URL.createObjectURL(t.image), r = s("div", { class: "fm-preview-image" }, s("img", {
			src: this.#t,
			alt: j("preview.imageAlt", { name: e.name })
		}))) : (r = s("iframe", {
			class: "fm-preview-frame",
			sandbox: "",
			referrerpolicy: "no-referrer",
			title: j("preview.contentsOf", { name: e.name })
		}), r.srcdoc = t.html), s("div", { class: "fm-preview-textwrap" }, r, n);
	}
	#s(e) {
		let t = o.children(e.id);
		if (!t.length) return H("folder", j("preview.emptyFolder"), "");
		let n = {
			folder: 0,
			file: 1,
			app: 1,
			link: 1
		};
		return t.sort((e, t) => n[e.type] - n[t.type] || e.name.localeCompare(t.name, p.locale, { numeric: !0 })), s("ul", {
			class: "fm-preview-list",
			"aria-label": j("preview.contentsOf", { name: e.name })
		}, t.slice(0, Pe).map((e) => s("li", {
			title: j("preview.childTitle", { name: e.name }),
			ondblclick: () => this.open(e)
		}, s("span", { class: "fm-icon" }, k(e)), s("span", { class: "fm-label" }, e.name))), t.length > Pe ? s("li", { class: "more" }, j("list.more", { count: M(t.length - Pe) })) : null);
	}
	#c(e) {
		return s("div", { class: "fm-preview-app" }, k(e), s("strong", {}, N(e)), s("span", { class: "fm-preview-link" }, Se(e)));
	}
	#l(e) {
		let t = D(e.app);
		return t ? s("div", { class: "fm-preview-app" }, r(t), s("strong", {}, t.name)) : H("x", j("preview.appMissing"), e.app);
	}
	#u(...e) {
		this.body.replaceChildren(...e);
	}
	#d() {
		this.#t && URL.revokeObjectURL(this.#t), this.#t = null;
	}
};
function H(e, t, n) {
	return s("div", { class: "fm-preview-empty" }, l(e), s("strong", {}, t), n ? s("span", {}, n) : null);
}
// src/files/columns.js
var qe = "files-columns", Je = 1600, Ye = 160, Xe = {
	modified: 128,
	deleted: 128,
	size: 92,
	type: 118,
	workspace: 124,
	origin: 160,
	location: 160
}, Ze = class {
	widths = {};
	hidden = /* @__PURE__ */ new Set();
	constructor() {
		let e = _.get(qe, {}), t = e && typeof e.widths == "object" ? e.widths : {};
		for (let [e, n] of Object.entries(t ?? {})) (Object.hasOwn(Xe, e) || e === "name") && Number.isFinite(n) && (this.widths[e] = Qe(Math.round(n), 48, Je));
		Array.isArray(e?.hidden) && e.hidden.filter((e) => Object.hasOwn(Xe, e)).forEach((e) => this.hidden.add(e));
	}
	shown(e) {
		return e.filter((e) => e.key === "name" || !this.hidden.has(e.key));
	}
	width(e) {
		return this.widths[e] ?? Xe[e];
	}
	layout(e, t = null) {
		let n = this.widths.name == null && t !== "name", r = e.map((e) => e.key === t ? "max-content" : e.key === "name" && n ? `minmax(${Ye}px, 1fr)` : `${this.width(e.key)}px`);
		n || r.push("minmax(0, 1fr)");
		let i = e.reduce((e, r) => e + (r.key === t ? 0 : r.key === "name" && n ? Ye : this.width(r.key)), 0);
		return {
			template: r.join(" "),
			min: `${i}px`
		};
	}
	resize(e, t, n = !0) {
		this.widths[e] = Qe(Math.round(t), 48, Je), n && this.save();
	}
	setHidden(e, t) {
		e !== "name" && (t ? this.hidden.add(e) : this.hidden.delete(e), this.save());
	}
	reset() {
		this.widths = {}, this.hidden.clear(), this.save();
	}
	save() {
		_.set(qe, {
			widths: this.widths,
			hidden: [...this.hidden]
		});
	}
}, Qe = (e, t, n) => Math.max(t, Math.min(e, n)), { h: U, uid: $e, toggle: et, textField: tt, actionButton: nt, fs: rt } = e, it = (e, t) => !e.when || Object.entries(e.when).every(([e, n]) => Array.isArray(n) ? n.includes(t[e]) : t[e] === n), W = (t) => e.net?.text?.(t) ?? (typeof t == "string" ? t : ""), at = (e) => e.secret || e.type === "password";
function ot(e, t) {
	for (let n of e) !at(n) && n.type !== "signin" && t[n.key] === void 0 && n.default !== void 0 && (t[n.key] = n.default);
	return t;
}
function st(e, t) {
	let n = {};
	for (let r of e) {
		if (at(r) || r.type === "signin" || r.type === "file" || !it(r, t)) continue;
		let e = t[r.key];
		e !== void 0 && e !== "" && e !== null && (n[r.key] = e);
	}
	return n;
}
var ct = (e, t) => (e.options ?? []).find((e) => String(e.value) === t)?.value;
function lt(e, t, n, r = {}) {
	return U("select", {
		class: "ctl-select",
		...r
	}, ...(e.options ?? []).map((e) => U("option", {
		value: String(e.value),
		selected: e.value === t,
		disabled: !!e.disabled
	}, n(e.label))));
}
var ut = (e) => e.required ? U("span", {
	class: "sh-field-req",
	"aria-hidden": "true"
}, " *") : null;
function dt(e, { t, values: n = {}, text: r = W, editing: i = !1, only: a = null, pairs: o = [], pickFile: s = null, filePlaceholder: c = "", signin: l = null, extra: u = null, after: d = null, onChange: f = null } = {}) {
	let p = ot(e, { ...n }), m = {}, h = {}, g = U("div", { class: "sh-fields" }), _ = U("div", { class: "sh-fields-after" }), v = "", y = () => e.filter((e) => (a !== "secret" || e.secret) && it(e, p) && (e.type !== "signin" || l)), b = () => {
		f?.(p), y().map((e) => e.key).join("\n") === v ? x() : C();
	}, x = () => {
		let e = d ? [d(p)].flat(Infinity).filter(Boolean) : [];
		_.replaceChildren(...e), _.hidden = !e.length;
	};
	function S(e) {
		if (e.type === "signin") return l(e, {
			values: p,
			changed: b
		});
		let n = e.secret ? m : p, a = `sh-f-${e.key}-${$e()}`, o = U("label", { for: a }, r(e.label), ut(e)), d = e.hint ? U("small", { class: "sh-field-hint" }, r(e.hint)) : null, g = (t) => {
			t === "" || t == null ? delete n[e.key] : n[e.key] = t, b();
		}, _;
		if (e.type === "checkbox") return _ = U("input", {
			id: a,
			type: "checkbox",
			checked: n[e.key] === !0,
			dataset: { key: e.key }
		}), _.addEventListener("change", () => g(_.checked)), U("div", { class: "sh-field" }, U("label", { class: "sh-field-check" }, _, r(e.label)), d);
		if (e.type === "select") {
			if (n[e.key] === void 0) {
				let t = (e.options ?? []).find((e) => !e.disabled);
				t && (n[e.key] = t.value);
			}
			_ = lt(e, n[e.key], r, {
				id: a,
				dataset: { key: e.key }
			}), _.addEventListener("change", () => g(ct(e, _.value)));
		} else if (e.type === "textarea") _ = U("textarea", {
			id: a,
			class: "ctl-text",
			rows: "3",
			spellcheck: "false",
			placeholder: e.placeholder ?? "",
			dataset: { key: e.key }
		}), _.value = n[e.key] ?? "", _.addEventListener("input", () => g(_.value));
		else if (e.type === "file") {
			_ = U("input", {
				id: a,
				class: "ctl-text",
				type: "text",
				spellcheck: "false",
				autocomplete: "off",
				dataset: { key: e.key },
				placeholder: i && e.secret ? t("shared.fields.unchanged") : e.placeholder ?? c
			}), _.value = h[e.key] ?? "";
			let n = (t) => {
				t.trim() ? h[e.key] = t.trim() : delete h[e.key], f?.(p);
			};
			_.addEventListener("input", () => n(_.value));
			let l = s && nt({
				label: t("shared.fields.browse"),
				onClick: async () => {
					let t = await s({
						kind: "file",
						title: r(e.label)
					});
					t && (_.value = rt.tildePath(t.id), n(_.value));
				}
			});
			return U("div", { class: "sh-field" }, o, l ? U("div", { class: "sh-field-pick" }, _, l) : _, d);
		} else {
			let r = e.type === "password" ? "password" : e.type === "number" ? "number" : "text";
			_ = U("input", {
				id: a,
				class: "ctl-text",
				type: r,
				spellcheck: "false",
				autocomplete: r === "password" ? "new-password" : "off",
				dataset: { key: e.key },
				placeholder: e.secret && i ? t("shared.fields.unchanged") : e.placeholder ?? "",
				min: e.min === void 0 ? null : String(e.min),
				max: e.max === void 0 ? null : String(e.max)
			}), _.value = n[e.key] ?? "", _.addEventListener("input", () => g(r === "number" ? _.value === "" ? "" : Number(_.value) : _.value));
		}
		let v = u?.(e, {
			input: _,
			set: (e) => {
				_.value = e ?? "", g(e);
			}
		});
		return U("div", { class: "sh-field" }, o, v ? U("div", { class: "sh-field-pick" }, _, v) : _, d);
	}
	function C() {
		let e = g.contains(document.activeElement) ? document.activeElement.dataset?.key : null, t = y();
		v = t.map((e) => e.key).join("\n");
		let n = [];
		for (let e = 0; e < t.length; e++) {
			let r = t[e], i = t[e + 1];
			i && o.some(([e, t]) => e === r.key && t === i.key) ? (n.push(U("div", { class: "sh-field-pair" }, S(r), S(i))), e++) : n.push(S(r));
		}
		g.replaceChildren(...n, _), x(), e && g.querySelector(`[data-key="${CSS.escape(e)}"]`)?.focus();
	}
	C();
	let w = async (e) => {
		let n = {};
		for (let r of y()) {
			if (r.type !== "file" || !!r.secret !== e || !h[r.key]) continue;
			let i = h[r.key], a = rt.resolve(i.startsWith("~") || i.startsWith("/") ? i : `~/${i}`);
			if (a?.type !== "file") throw Error(t("shared.fields.noSuchFile", { path: i }));
			n[r.key] = await rt.read(a.id);
		}
		return n;
	};
	return {
		el: g,
		values: () => st(e, p),
		secret: async () => ({
			...Object.fromEntries(Object.entries(m).filter(([e]) => y().some((t) => t.key === e))),
			...await w(!0)
		}),
		read: async () => {
			let [t, n] = await Promise.all([w(!1), w(!0)]), r = Object.fromEntries(Object.entries(m).filter(([e]) => y().some((t) => t.key === e)));
			return {
				values: {
					...st(e, p),
					...t
				},
				secret: {
					...r,
					...n
				}
			};
		},
		missing: (e = !0) => y().filter((t) => t.required && (t.type === "file" ? (!t.secret || e) && !h[t.key] : t.secret ? e && !m[t.key] : p[t.key] === void 0 || p[t.key] === "")).map((e) => r(e.label)),
		all: () => p,
		focus: () => g.querySelector("input, select, textarea, button")?.focus(),
		redraw: C
	};
}
// src/shared/trustPrompt.js
function ft(e, t, { t: n, name: r = t?.host ?? "" } = {}) {
	if (!t?.fingerprint) return Object.assign(Promise.resolve(!1), { close() {} });
	let i = t.changed === !0, a = t.kind === "tls", o = [
		n(i ? "shared.trust.changedText" : a ? "shared.trust.firstTls" : "shared.trust.first"),
		"",
		...t.host ? [`${n("shared.trust.server")}: ${t.host}`] : [],
		`${n(a ? "shared.trust.certificate" : "shared.trust.key")}: ${t.text || t.fingerprint}`,
		...i && t.previous ? [`${n("shared.trust.previous")}: ${t.previous}`] : [],
		"",
		n(i ? "shared.trust.askChanged" : "shared.trust.ask")
	], s = u(e, {
		icon: i ? "error" : "warning",
		title: n(i ? "shared.trust.changedTitle" : "shared.trust.title", { name: r }),
		text: o.join("\n"),
		buttons: ["cancel", "continue"],
		default: "cancel"
	}), c = s.then((e) => e === "continue");
	return c.close = () => s.close(null), c;
}
// src/files/network.js
var G = () => e.net?.available ? e.net : null;
function K(e) {
	let t = o.get(e)?.net;
	return t ? G()?.mount(t) ?? null : null;
}
var pt = {
	on: "net.state.on",
	connecting: "net.state.connecting",
	off: "net.state.off",
	error: "net.state.error"
}, mt = (e) => j(pt[e.state] ?? "net.state.off") + (e.state === "error" && e.error ? `: ${e.error}` : ""), ht = {
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
}, gt = [
	"server",
	"cloud",
	"local"
], _t = "Immagini";
function vt(e) {
	if (!e?.net) return [];
	let t = (e) => G()?.text(e) ?? "", n = [];
	return e.web && n.push(s("span", {
		class: "fm-chip web",
		title: e.exportAs ? j("net.web.copiedAs", { ext: `.${e.exportAs}` }) : j("net.web.only")
	}, t(e.web))), e.badge && n.push(s("span", { class: "fm-chip" }, t(e.badge))), n;
}
var q = (e) => e ? G()?.protocols.find((t) => t.id === e.protocol) ?? null : null, yt = (e) => !!e?.fields.some((e) => e.type === "signin"), bt = (e) => ht[e] ?? e.toUpperCase().slice(0, 5);
function xt(e, { active: t, reteFolder: n }) {
	let r = G();
	if (!r) return [];
	let i = s("button", {
		class: "fm-side-add",
		type: "button",
		title: j("net.add"),
		"aria-label": j("net.add"),
		onclick: () => Mt(e)
	}, l("plus")), a = n ? s("button", {
		class: "fm-side-title",
		type: "button",
		onclick: () => e.go(n)
	}, j("net.section")) : s("span", {}, j("net.section")), o = r.mounts().sort((e, t) => e.name.localeCompare(t.name)).map((n) => {
		let i = r.mountNode(n.id), a = t === i, o = s("button", {
			class: a ? "fm-place fm-mount on" : "fm-place fm-mount",
			type: "button",
			"aria-current": a ? "true" : null,
			title: `${n.address} · ${mt(n)}`,
			onclick: () => e.go(i)
		}, s("span", {
			class: `fm-dot ${n.state}`,
			"aria-hidden": "true"
		}), s("span", { class: "fm-mount-name" }, n.name), s("span", { class: "fm-proto" }, bt(n.protocol)));
		return o.dataset.folder = i, o.addEventListener("contextmenu", (t) => {
			t.preventDefault(), St(e, n, t.clientX, t.clientY);
		}), o;
	});
	return [s("section", {
		class: "fm-side-net",
		"aria-label": j("net.section")
	}, s("h6", { class: "fm-side-head" }, a, i), ...o.length ? o : [s("p", { class: "fm-side-none" }, j("net.none"))])];
}
function St(e, t, n, r) {
	let i = G();
	if (!i) return;
	let a = i.mountNode(t.id);
	d(n, r, [
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
			action: () => Mt(e, t)
		},
		x.canLinkOnDesk?.([a]) && {
			label: j("menu.deskLink"),
			icon: "link",
			action: () => e.addDeskLinks([a])
		},
		"-",
		{
			label: j("net.menu.remove"),
			icon: "trash",
			danger: !0,
			action: () => Ct(e, t)
		}
	].filter(Boolean));
}
async function Ct(e, t) {
	await u(e.win, {
		icon: "warning",
		title: j("net.remove.title", { name: t.name }),
		text: j("net.remove.text"),
		buttons: ["continue", "cancel"]
	}) === "continue" && G()?.remove(t.id).catch((t) => e.netError(t));
}
function wt(t, n) {
	let r = K(n);
	if (!r) return null;
	let i = s("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => G().disconnect(r.id).catch((e) => t.netError(e))
	}, l("x"), j("net.menu.disconnect")), o = q(r), c = r.state === "on" && o?.links && e.net.openWeb ? s("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => Et(t, n)
	}, l("globe"), j("net.web.open")) : null, u = r.state === "on" && o?.importer && e.net.imports ? s("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => Tt(t, r)
	}, l("download"), G().text(o.importer.label)) : null, d = s("span", { class: "fm-mountbar-space" });
	return r.state === "on" && o?.space && e.net.space && e.net.space(r.id).then((e) => {
		e && (d.textContent = e.total ? j("net.space.of", {
			used: a(e.used),
			total: a(e.total)
		}) : j("net.space.used", { used: a(e.used) }));
	}, () => {}), s("div", { class: `fm-mountbar ${r.state}` }, l(r.state === "on" ? "lock" : "globe"), s("span", { class: "fm-mountbar-text" }, r.state === "on" ? j("net.bar.on") : mt(r), " ", s("code", {}, r.address)), s("span", { class: "fm-sp" }), d, u, c, r.state === "on" ? i : null);
}
function Tt(e, t) {
	let r = G(), i = q(t);
	if (!r?.imports || !i?.importer) return;
	let a = new n({
		title: r.text(i.importer.label).replace(/…$/, ""),
		icon: "download",
		width: 440,
		height: 380,
		minWidth: 340,
		minHeight: 300
	}), c = () => o.resolve(`~/${_t}`)?.id ?? o.root, u = null, d = s("code", { class: "fm-net-where" }), f = () => {
		d.textContent = u ? o.path(u) : `~/${_t}/${r.text(i.label)}`;
	}, p = s("button", {
		class: "ctl-btn",
		type: "button"
	}, j("net.import.change")), m = s("button", {
		class: "ctl-btn primary",
		type: "button"
	}, l("globe"), j("net.import.pick")), h = s("button", {
		class: "ctl-btn primary",
		type: "button",
		disabled: !0
	}, l("download"), j("net.import.go")), g = s("p", {
		class: "fm-net-status",
		role: "status"
	}), _ = (e, t = !1) => {
		g.textContent = e, g.classList.toggle("bad", t);
	}, v = null, y = null;
	p.addEventListener("click", async () => {
		let t = await fe(e.openWindow, {
			kind: "folder",
			title: j("net.import.where")
		});
		t && (u = t.id, f());
	}), m.addEventListener("click", () => {
		y?.abort();
		let n = y = new AbortController(), i = null;
		v = null, h.disabled = !0, _(j("net.import.opening")), r.openWeb(async () => {
			let e = await r.imports.start(t.id);
			return i = e.id, e.url;
		}).then(async () => {
			for (_(j("net.import.waiting"));;) {
				if (n.signal.aborted) return;
				let e = await r.imports.status(t.id, i, { wait: !0 });
				if (n.signal.aborted) return;
				if (e.status !== "pending") return e.status === "error" ? _(e.error ?? j("net.import.failed"), !0) : e.count ? (v = e, h.disabled = !1, _(j("net.import.picked", { count: e.count }))) : _(j("net.import.none"), !0);
			}
		}).catch((n) => {
			if (n.code === "secret_required") return Nt(e, t), _("");
			_(n.message, !0);
		});
	}), h.addEventListener("click", async () => {
		if (v) {
			h.disabled = !0;
			try {
				let n = u;
				if (!n) {
					let e = c(), t = r.text(i.label);
					n = o.children(e).find((e) => e.type === "folder" && e.name === t)?.id ?? o.create(e, {
						type: "folder",
						name: t
					}).id;
				}
				await r.imports.copy(t.id, v.path, n), a.emit("close"), e.go(n);
			} catch (e) {
				h.disabled = !1, _(e.message, !0);
			}
		}
	}), a.on("destroy", () => y?.abort()), f(), a.body.append(s("div", { class: "fm-net-dialog" }, s("div", { class: "fm-net-body" }, s("div", { class: "sh-field" }, s("label", {}, j("net.import.where")), s("div", { class: "sh-field-pick" }, d, p)), s("div", { class: "sh-field" }, s("label", {}, j("net.import.step")), s("div", {}, m), s("small", { class: "sh-field-hint" }, j("net.import.hint"))), g), s("div", { class: "fm-net-foot" }, s("span", { class: "fm-sp" }), s("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => a.emit("close")
	}, j("net.cancel")), h))), e.openWindow(a);
}
function Et(t, n) {
	let r = K(n);
	r && e.net?.openWeb && e.net.openWeb(() => e.net.link(r.id, o.netPath(n))).catch((e) => e.code === "secret_required" ? Nt(t, r) : t.netError(e));
}
async function Dt(e, t) {
	if (!G() || !o.isRemote?.(t)) return !0;
	for (;;) try {
		return await o.refresh(t), !0;
	} catch (n) {
		let r = K(t);
		if (!r || !o.exists(t)) return !1;
		if (n.code === "secret_required") {
			if (!(n.details?.reason === "signin" || yt(q(r)) ? await Nt(e, r) : await Pt(e, r, n.details?.reason === "auth"))) return !1;
			continue;
		}
		if (n.code === "untrusted") {
			if (!await Ot(e, r.id, r.name, n.details?.trust)) return !1;
			continue;
		}
		if (await e.netError(n, {
			retry: !0,
			title: j("net.error.read", { name: r.name })
		}) !== "retry") return !1;
	}
}
async function Ot(e, t, n, r) {
	if (!await ft(e.win, r, {
		t: j,
		name: n
	})) return !1;
	try {
		return await G().connect(t, { trust: r.fingerprint }), !0;
	} catch (t) {
		return t.code === "secret_required" || t.code === "untrusted" || (await e.netError(t), !1);
	}
}
function kt(e, t, { initial: n = {}, editing: r = !1, only: i = null, onShares: a = null, onChange: o = null } = {}) {
	let c = { id: null };
	return {
		...dt(t.fields, {
			t: j,
			values: n,
			editing: r,
			only: i,
			onChange: o,
			pickFile: (t) => fe(e.openWindow, t),
			signin: (e, { values: n, changed: r }) => At(t, e, n, c, r),
			extra: (e, { set: t }) => {
				if (e.key !== "share" || !a) return null;
				let n = s("button", {
					class: "ctl-btn",
					type: "button"
				}, j("net.shares.list"));
				return n.addEventListener("click", () => a(n, t)), n;
			}
		}),
		signin: () => c.id
	};
}
function At(t, n, r, i, a) {
	let o = s("div", { class: "sh-field" }), c = s("small", {
		class: "fm-net-wait",
		role: "status"
	}), u = jt(c), d = null, f = [], p = () => {
		d?.abort(), d = new AbortController();
		let o = Object.fromEntries(Object.entries(r).filter(([e]) => e !== n.key)), s = !!e.net.signInByHand?.(t), l = e.net.signIn(t.id, o, {
			signal: d.signal,
			...s && {
				manual: !0,
				askAddress: u.ask(d.signal)
			}
		});
		for (let e of f) e.disabled = !0;
		m.hidden = !1, c.classList.remove("bad"), c.textContent = s ? "" : j("net.signin.waiting"), l.then(({ signin: e, account: t }) => {
			i.id = e, r[n.key] = t, h(), a();
		}, (e) => {
			for (let e of f) e.disabled = !1;
			m.hidden = !0, u.el.hidden = !0, c.textContent = e.code === "canceled" ? "" : e.code === "blocked" ? j("net.signin.blocked") : e.message, c.classList.toggle("bad", e.code !== "canceled");
		});
	}, m = s("button", {
		class: "ctl-btn",
		type: "button",
		hidden: !0,
		onclick: () => d?.abort()
	}, j("net.cancel")), h = () => {
		m.hidden = !0;
		let e = s("label", {}, W(n.label), n.required ? s("span", {
			class: "sh-field-req",
			"aria-hidden": "true"
		}, " *") : null);
		if (r[n.key]) {
			let t = s("button", {
				class: "ctl-btn",
				type: "button",
				onclick: p
			}, j("net.signin.other"));
			return f = [t], o.replaceChildren(e, s("div", { class: "fm-net-account" }, l(i.id ? "check" : "user"), s("span", { class: "fm-net-who" }, r[n.key]), t, m), u.el, c);
		}
		let t = s("button", {
			class: "ctl-btn primary fm-signin",
			type: "button",
			onclick: p
		}, l("user"), W(n.button) || j("net.signin.button"));
		f = [t], o.replaceChildren(...[
			e,
			s("div", { class: "sh-field-pick" }, t, m),
			n.hint ? s("small", { class: "sh-field-hint" }, W(n.hint)) : null,
			u.el,
			c
		].filter(Boolean));
	};
	return h(), o;
}
function jt(e) {
	let t = s("input", {
		class: "ctl-text",
		type: "text",
		spellcheck: "false",
		autocomplete: "off",
		placeholder: "http://127.0.0.1:53682/?state=…&code=…",
		"aria-label": j("net.signin.paste.label")
	}), n = s("button", {
		class: "ctl-btn primary",
		type: "button"
	}, j("net.signin.paste.go")), r = s("div", {
		class: "fm-net-paste",
		hidden: !0
	}, s("small", {}, j("net.signin.paste.text")), s("div", { class: "sh-field-pick" }, t, n));
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
function Mt(e, t = null, { initial: r = null, onConnected: i = null, onClosed: a = null } = {}) {
	let o = G();
	if (!o) return;
	let c = new n({
		title: t ? j("net.edit.title", { name: t.name }) : j("net.connect.title"),
		icon: "globe",
		width: 460,
		height: 660,
		minWidth: 360,
		minHeight: 360
	}), u = o.protocols.find((e) => e.id === (t?.protocol ?? r?.protocol)) ?? o.protocols[0], f = !1, p = null, m = null, h = (e) => s("option", {
		value: e.id,
		selected: e.id === u.id
	}, W(e.label)), g = gt.map((e) => [e, o.protocols.filter((t) => (t.group ?? "server") === e)]).filter(([, e]) => e.length), _ = s("select", {
		class: "ctl-select",
		id: "fm-net-protocol",
		disabled: !!t
	}, ...g.length > 1 ? g.map(([e, t]) => s("optgroup", { label: j(`net.group.${e}`) }, ...t.map(h))) : o.protocols.map(h)), v = s("input", {
		class: "ctl-text",
		type: "text",
		id: "fm-net-name",
		spellcheck: "false",
		value: t?.name ?? r?.name ?? ""
	}), y = s("small", { class: "sh-field-hint" }), b = s("input", {
		type: "checkbox",
		checked: !t || t.remembered
	}), x = s("span", {}, j("net.remember")), S = s("input", {
		type: "checkbox",
		checked: !!t?.auto
	}), C = s("div"), w = s("p", {
		class: "fm-net-status",
		role: "status"
	}), ee = s("button", {
		class: "ctl-btn",
		type: "button"
	}, j("net.test")), te = s("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => c.emit("close")
	}, j("net.cancel")), T = s("button", {
		class: "ctl-btn primary",
		type: "button"
	}, j(t ? "net.save" : "net.connect.go")), ne = !!t, E = () => {
		y.textContent = v.value.trim() ? j("net.name.hint", { path: `~/Rete/${v.value.trim()}` }) : "";
	}, re = () => {
		ne || (v.value = p.values().host ?? (yt(u) ? W(u.label) : ""), E());
	}, D = (e, t = !1) => {
		w.textContent = e, w.classList.toggle("bad", t);
	}, O = () => {
		m = null;
		let n = u.notReady;
		ee.disabled = T.disabled = !!n, n ? (p = kt(e, {
			...u,
			fields: []
		}), C.replaceChildren(s("div", { class: "fm-net-note" }, s("b", {}, j("net.notReady.title", { name: W(u.label) })), s("span", {}, W(n)), s("div", {}, s("button", {
			class: "ctl-btn",
			type: "button",
			onclick: () => ie("settings", { tab: u.id })
		}, l("gear"), j("net.notReady.settings")))))) : (x.textContent = j(yt(u) ? "net.remember.signin" : "net.remember"), p = kt(e, u, {
			initial: t?.values ?? (u.id === r?.protocol ? r.values : {}),
			editing: !!t,
			onShares: u.canListShares ? A : null,
			onChange: () => {
				re(), m = null;
			}
		}), re(), C.replaceChildren(p.el));
	}, k = async () => {
		let { values: e, secret: t } = await p.read();
		return [{
			protocol: u.id,
			values: e,
			...m && { trust: m.fingerprint },
			...p.signin() && { signin: p.signin() }
		}, t];
	}, ae = async (e) => await ft(c, e, {
		t: j,
		name: v.value.trim() || e?.host
	}) ? (m = e, !0) : !1;
	async function A(e, t) {
		e.disabled = !0;
		try {
			for (;;) try {
				let n = await o.shares(...await k()), r = e.getBoundingClientRect();
				if (!n.length) return D(j("net.shares.none"));
				d(r.left, r.bottom, n.map((e) => ({
					label: e,
					icon: "folder",
					action: () => t(e)
				})));
				return;
			} catch (e) {
				if (e.code === "untrusted" && await ae(e.details?.trust)) continue;
				return D(e.code === "untrusted" ? "" : e.message, !0);
			}
		} finally {
			e.disabled = !1;
		}
	}
	_.addEventListener("change", () => {
		u = o.protocols.find((e) => e.id === _.value), O();
	}), v.addEventListener("input", () => {
		ne = !!v.value.trim(), E();
	}), ee.addEventListener("click", async () => {
		let e = p.missing(!t);
		if (e.length) return D(j("net.missing", { fields: e.join(", ") }), !0);
		for (D(j("net.testing"));;) try {
			return await o.test(...await k()), D(j("net.test.ok"));
		} catch (e) {
			if (e.code === "untrusted" && await ae(e.details?.trust)) continue;
			return D(e.code === "untrusted" ? "" : e.message, !0);
		}
	}), T.addEventListener("click", async () => {
		let n = p.missing(!t || !t.remembered);
		if (v.value.trim() || n.unshift(j("net.name")), n.length) return D(j("net.missing", { fields: n.join(", ") }), !0);
		T.disabled = !0, D(j("net.connecting"));
		try {
			let [n, r] = await k(), a = {
				name: v.value.trim(),
				...n,
				auto: S.checked,
				remember: b.checked
			}, s = t ? await o.update(t.id, a, r) : await o.create(a, r);
			for (t = s;;) try {
				await o.connect(s.id, m ? { trust: m.fingerprint } : {});
				break;
			} catch (e) {
				if (e.code === "untrusted" && await ae(e.details?.trust)) continue;
				return D(e.code === "untrusted" ? "" : e.message, !0);
			}
			f = !0, c.emit("close"), i ? i(s) : e.go(o.mountNode(s.id));
		} catch (e) {
			D(e.message, !0);
		} finally {
			T.disabled = !1;
		}
	}), a && c.on("destroy", () => {
		f || a();
	}), O(), E(), c.body.append(s("div", { class: "fm-net-dialog" }, s("div", { class: "fm-net-body" }, s("div", { class: "sh-field" }, s("label", { for: "fm-net-protocol" }, j("net.protocol")), _), C, s("div", { class: "sh-field" }, s("label", { for: "fm-net-name" }, j("net.name")), v, y), s("label", { class: "sh-field-check" }, b, x), s("label", { class: "sh-field-check" }, S, j("net.auto")), w), s("div", { class: "fm-net-foot" }, ee, s("span", { class: "fm-sp" }), te, T))), e.openWindow(c), requestAnimationFrame(() => p.focus());
}
async function Nt(e, t) {
	let n = G(), r = n?.protocols.find((e) => e.id === t.protocol);
	if (!r || !n.signIn) return !1;
	let i = r.fields.find((e) => e.type === "signin"), a = s("p", {
		class: "fm-net-status",
		role: "status"
	}), o = jt(a), c = s("button", {
		class: "ctl-btn primary",
		type: "button"
	}, l("user"), W(i?.button) || j("net.signin.button")), d = null, f = u(e.win, {
		icon: "info",
		title: j("net.signin.again.title", { name: t.name }),
		text: j("net.signin.again.text", { account: t.values?.[i?.key] ?? t.address }),
		content: s("div", { class: "fm-net-signin" }, s("div", {}, c), o.el, a),
		buttons: [{
			value: "cancel",
			label: j("net.later")
		}]
	});
	c.addEventListener("click", () => {
		d?.abort(), d = new AbortController();
		let e = !!n.signInByHand?.(r), i = n.signIn(r.id, t.values, {
			signal: d.signal,
			...e && {
				manual: !0,
				askAddress: o.ask(d.signal)
			}
		});
		c.disabled = !0, a.classList.remove("bad"), a.textContent = e ? "" : j("net.signin.waiting"), i.then(({ signin: e }) => n.connect(t.id, {
			signin: e,
			remember: t.remembered
		})).then(() => f.close("connected"), (e) => {
			c.disabled = !1, o.el.hidden = !0, e.code === "canceled" ? a.textContent = "" : (a.textContent = e.code === "blocked" ? j("net.signin.blocked") : e.message, a.classList.add("bad"));
		});
	}), c.focus();
	let p = await f;
	return d?.abort(), p === "connected";
}
async function Pt(e, t, n = !1) {
	let r = G(), i = r?.protocols.find((e) => e.id === t.protocol);
	if (!i) return !1;
	let a = kt(e, i, {
		initial: t.values,
		only: "secret"
	}), o = u(e.win, {
		icon: n ? "warning" : "info",
		title: j("net.password.title", { name: t.name }),
		text: [n && j("net.password.wrong"), j("net.password.text", { address: t.address })].filter(Boolean).join("\n\n"),
		content: a.el,
		fields: [{
			name: "remember",
			type: "checkbox",
			label: j("net.remember"),
			value: t.remembered
		}],
		buttons: ["cancel", {
			value: "connect",
			label: j("net.connect.go"),
			primary: !0
		}],
		validate: async ({ remember: e }) => {
			try {
				await r.connect(t.id, {
					secret: await a.secret(),
					remember: e
				});
			} catch (e) {
				if (e.code !== "untrusted") return e.message;
			}
			return !0;
		}
	});
	a.focus();
	let { button: s } = await o;
	return s === "connect";
}
// src/files/office.js
var Ft = {
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
}, It = "onedrive", Lt = {
	mount: null,
	folder: "/lilOS",
	ifExists: "ask",
	doubleClick: !0
};
function Rt() {
	let e = _.get(It, {}) ?? {};
	return {
		mount: typeof e.mount == "string" ? e.mount : null,
		folder: typeof e.folder == "string" && e.folder.trim() ? e.folder.trim() : Lt.folder,
		ifExists: [
			"ask",
			"replace",
			"keep"
		].includes(e.ifExists) ? e.ifExists : Lt.ifExists,
		doubleClick: e.doubleClick !== !1
	};
}
function zt(e) {
	if (e?.type !== "file") return null;
	let t = g(e.name)[1].toLowerCase();
	return Object.keys(Ft).find((e) => Ft[e].includes(t)) ?? null;
}
function Bt() {
	let e = G();
	return e?.putHome ? e.mounts().filter((e) => q(e)?.office) : [];
}
var Vt = (e) => !!e?.net && !!q(K(e.id))?.office;
function Ht(e, t) {
	return !zt(t) || !Vt(t) || !Rt().doubleClick || x.appFor?.(g(t.name)[1].toLowerCase()) ? !1 : (Et(e, t.id), !0);
}
function Ut(e, t) {
	if (t.length !== 1 || !G()) return [];
	let n = t[0], r = zt(n);
	return n.net ? q(K(n.id))?.links ? [{
		label: r && Vt(n) ? j(`office.open.${r}`) : j("net.web.open"),
		icon: "globe",
		action: () => Et(e, n.id)
	}] : [] : !r || !Bt().length ? [] : [{
		label: j("office.upload"),
		icon: "arrowUp",
		action: () => Wt(e, n)
	}];
}
function Wt(t, n, { mount: r = null, ifExists: i = null } = {}) {
	let a = Bt(), o = Rt(), s = r ?? a.find((e) => e.id === o.mount) ?? (a.length === 1 ? a[0] : null);
	if (!s) {
		if (!a.length) return void t.netError(Error(j("office.none")));
		let e = t.list.querySelector(`[data-id="${CSS.escape(n.id)}"]`)?.getBoundingClientRect();
		d(e ? e.left + 40 : innerWidth / 2, e ? e.bottom : innerHeight / 2, [{
			label: j("office.pick"),
			disabled: !0
		}, ...a.map((e) => ({
			label: e.name,
			icon: "globe",
			action: () => Wt(t, n, { mount: e })
		}))]);
		return;
	}
	let c = G(), l = i ?? o.ifExists, u = null;
	c.openWeb(async () => (u = await c.putHome(s.id, n.id, o.folder, l), c.link(s.id, u.path))).then(() => {
		e.notifications?.send({
			app: "files",
			text: j("office.uploaded", {
				name: u.name,
				folder: `${s.name}${o.folder === "/" ? "" : o.folder}`
			})
		}).catch(() => {});
	}, async (e) => {
		if (e.code === "conflict" && e.details?.exists) return Gt(t, n, s, e.details.name);
		e.code === "secret_required" ? await Nt(t, s) && t.netError(Error(j("office.again"))) : t.netError(e, { title: j("office.failed", { name: n.name }) });
	});
}
async function Gt(e, t, n, r) {
	let i = await u(e.win, {
		icon: "warning",
		title: j("office.exists.title"),
		text: j("office.exists.text", {
			name: r,
			folder: Rt().folder
		}),
		buttons: [
			"cancel",
			{
				value: "keep",
				label: j("office.exists.keep")
			},
			{
				value: "replace",
				label: j("office.exists.replace"),
				icon: "arrowUp",
				primary: !0
			}
		]
	});
	(i === "keep" || i === "replace") && Wt(e, t, {
		mount: n,
		ifExists: i
	});
}
// src/files/computer.js
var Kt = () => e.host?.native ? e.host : null, qt = (t, n) => e.toast(t, { level: n }), Jt = (e, t) => (n) => qt(j(e, {
	...t,
	error: n.message
}), "error");
function Yt(t) {
	if (!t.net || !e.net?.mount) return null;
	let n;
	try {
		n = e.fs.netRef(t.id);
	} catch {
		return null;
	}
	let r = e.net.mount(n.mount);
	if (r?.protocol !== "local" || typeof r.values?.folder != "string") return null;
	let i = r.values.folder.replace(/[\\/]+$/, ""), a = i.includes("\\") || /^[A-Za-z]:/.test(i) ? "\\" : "/";
	return n.path === "/" ? i || a : `${i}${n.path.split("/").join(a)}`;
}
function Xt(e) {
	let t = Kt();
	if (!t || !e.length) return [];
	let n = e.length === 1 ? e[0] : null, r = n && Yt(n), i = e.filter((e) => e.type === "file" && !e.web), a = [];
	return r && t.trusted ? (n.type === "file" && a.push({
		label: j("computer.open"),
		icon: "monitor",
		action: () => t.openPath(r).catch(Jt("computer.openFailed", { name: n.name }))
	}), a.push({
		label: j("computer.reveal"),
		icon: "folderOpen",
		action: () => t.reveal(r).catch(Jt("computer.openFailed", { name: n.name }))
	})) : n?.type === "file" && !n.net && !n.web && t.trusted && a.push({
		label: j("computer.open"),
		icon: "monitor",
		action: () => t.openOnComputer(n.id).catch(Jt("computer.openFailed", { name: n.name }))
	}), i.length && i.length === e.length && a.push({
		label: i.length === 1 ? j("computer.export") : j("computer.exportMany", { count: i.length }),
		icon: "download",
		action: async () => {
			try {
				let e = await t.exportToComputer(i.map((e) => e.id));
				e?.saved?.length && qt(e.saved.length === 1 ? j("computer.exported", { path: e.saved[0] }) : j("computer.exportedMany", { count: e.saved.length }), "success");
			} catch (e) {
				qt(j("computer.exportFailed", { error: e.message }), "error");
			}
		}
	}), a.length ? ["-", ...a] : [];
}
// src/files/newLink.js
var Zt = {
	webdav: "http",
	dav: "http",
	webdavs: "https",
	davs: "https"
}, Qt = /* @__PURE__ */ new Set(["http", "https"]), J = class extends Error {};
function $t(e) {
	let t = e.trim();
	if (!t) throw new J(j("newLink.error.empty"));
	if (t.includes("\\")) throw new J(j("newLink.error.backslash"));
	let n = /^([a-z][a-z0-9+.-]*):\/\/([^/?#]*)([^?#]*)/i.exec(t);
	if (!n) {
		if (/^[a-z][a-z0-9+.-]*:/i.test(t) && !t.startsWith("~")) throw new J(j("newLink.error.slashes"));
		return { local: t };
	}
	let [, r, i, a] = n, o = i.lastIndexOf("@"), s = o >= 0 ? i.slice(0, o) : "";
	if (s.includes(":")) throw new J(j("newLink.error.password"));
	let c = o >= 0 ? i.slice(o + 1) : i, l = /^(\[[0-9a-f:.]+\]|[^:[\]]+)(?::(\d{1,5}))?$/i.exec(c);
	if (!l) throw new J(j("newLink.error.host"));
	let u;
	try {
		u = a.split("/").filter(Boolean).map(decodeURIComponent);
	} catch {
		throw new J(j("newLink.error.path"));
	}
	if (u.some((e) => e === "." || e === ".." || e.includes("/"))) throw new J(j("newLink.error.path"));
	return { url: {
		scheme: r.toLowerCase(),
		user: decodeURIComponent(s),
		host: l[1].toLowerCase(),
		port: l[2] ? Number(l[2]) : null,
		segs: u,
		folder: a.endsWith("/")
	} };
}
var Y = (e) => Zt[e] || Qt.has(e) ? {
	id: "webdav",
	http: Zt[e] ?? e
} : {
	id: e,
	http: null
};
function en(e, t) {
	if (e.port) return e.port;
	let { id: n, http: r } = Y(e.scheme);
	return n === "webdav" ? r === "https" ? 443 : 80 : t?.fields?.find((e) => e.key === "port")?.default ?? null;
}
function tn(e) {
	let t = G();
	if (!t) return null;
	let n = Y(e.scheme), r = t.protocols.find((e) => e.id === n.id), i = null;
	for (let a of t.mounts()) {
		if (a.protocol !== n.id) continue;
		let t;
		try {
			t = $t(a.address).url;
		} catch {
			continue;
		}
		if (!t || n.http && Y(t.scheme).http !== n.http || t.host !== e.host || en(t, r) !== en(e, r)) continue;
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
function nn(e) {
	let { id: t, http: n } = Y(e.scheme), r = e.host.includes(":") && !e.host.startsWith("[") ? `[${e.host}]` : e.host, i = {};
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
function rn(e) {
	if (e.local) return e.local.replace(/\/+$/, "").split("/").pop().replace(/^~$/, "") || "";
	let { url: t } = e;
	return t.segs.at(-1) ?? t.host;
}
function an({ folder: e, openWindow: t, onMade: r = null }) {
	let i = new n({
		title: j("newLink.title"),
		icon: "link",
		width: 520,
		height: 290,
		minWidth: 380,
		minHeight: 260
	}), a = {
		win: i,
		openWindow: t,
		netError: (e, { retry: t = !1, title: n = j("net.error.title") } = {}) => u(i, {
			icon: "error",
			title: n,
			text: e?.message ?? String(e),
			buttons: t ? ["retry", "cancel"] : ["ok"]
		}),
		go: () => {}
	}, c = s("input", {
		class: "ctl-text",
		type: "text",
		id: "fm-link-address",
		spellcheck: "false",
		autocomplete: "off",
		placeholder: j("newLink.address.placeholder")
	}), l = s("input", {
		class: "ctl-text",
		type: "text",
		id: "fm-link-name",
		spellcheck: "false",
		autocomplete: "off"
	}), f = s("p", {
		class: "fm-net-status",
		role: "status"
	}), p = s("button", {
		class: "ctl-btn",
		type: "button"
	}, j("newLink.browse")), m = s("button", {
		class: "ctl-btn",
		type: "button",
		onclick: () => i.emit("close")
	}, j("net.cancel")), h = s("button", {
		class: "ctl-btn primary",
		type: "button"
	}, j("newLink.make")), g = !1, _ = !1, v = (e, t = !1) => {
		f.textContent = e, f.classList.toggle("bad", t);
	};
	c.addEventListener("input", () => {
		if (v(""), !g) try {
			l.value = rn($t(c.value));
		} catch {
			l.value = "";
		}
	}), l.addEventListener("input", () => {
		g = !!l.value.trim();
	});
	for (let e of [c, l]) e.addEventListener("keydown", (e) => {
		e.stopPropagation(), e.key === "Enter" && (e.preventDefault(), b()), e.key === "Escape" && (e.preventDefault(), i.emit("close"));
	});
	p.addEventListener("click", () => {
		let e = p.getBoundingClientRect(), n = async (e) => {
			let n = await fe(t, {
				kind: e,
				title: j(e === "folder" ? "newLink.pickFolder" : "newLink.pickFile")
			});
			n && (c.value = o.path(n.id), c.dispatchEvent(new Event("input")), c.focus());
		};
		d(e.left, e.bottom, [{
			label: j("newLink.browseFile"),
			icon: "file",
			action: () => n("file")
		}, {
			label: j("newLink.browseFolder"),
			icon: "folder",
			action: () => n("folder")
		}]);
	});
	async function y(e) {
		if (e.local) {
			let t = o.resolve(e.local);
			if (!t) return void v(j("newLink.error.noPath", { path: e.local }), !0);
			let n = x.linkTo(t.id);
			return n ? { link: n } : void v(j("newLink.error.notLinkable"), !0);
		}
		let { url: t } = e, n = tn(t);
		if (!n && Qt.has(t.scheme)) return { link: {
			url: c.value.trim(),
			kind: "web"
		} };
		let r = G(), { id: s } = Y(t.scheme);
		if (!r?.protocols.some((e) => e.id === s)) return void v(j("newLink.error.protocol", { protocol: t.scheme }), !0);
		if (!n) {
			let e = await new Promise((e) => Mt(a, null, {
				initial: nn(t),
				onConnected: e,
				onClosed: () => e(null)
			}));
			if (!e) return void v(j("newLink.error.noConnection"), !0);
			if (n = tn(t), !n) return void v(j("newLink.error.otherFolder", { name: e.name }), !0);
		}
		v(j("newLink.checking"));
		let l = await x.locateLink({
			mount: n.mount.id,
			path: n.path
		}, {
			win: i,
			read: (e) => Dt(a, e)
		});
		if (l.stop) return void v("");
		if (l.missing) return void v(j("newLink.error.noRemote", {
			path: n.path,
			name: n.mount.name
		}), !0);
		let u = l.node;
		return { link: {
			mount: n.mount.id,
			path: o.netPath(u.id) ?? n.path,
			kind: u.type === "folder" ? "folder" : "file"
		} };
	}
	async function b() {
		if (_) return;
		let t;
		try {
			t = $t(c.value);
		} catch (e) {
			if (!(e instanceof J)) throw e;
			return v(e.message, !0), c.focus();
		}
		if (l.value.trim() || (l.value = rn(t)), !l.value.trim()) return v(j("newLink.error.noName"), !0), l.focus();
		_ = h.disabled = !0;
		try {
			let n = await y(t);
			if (!n) return;
			if (!o.exists(e)) return v(j("newLink.error.folderGone"), !0);
			let a = o.create(e, {
				type: "link",
				name: l.value.trim(),
				link: n.link
			});
			r?.(a.id), i.emit("close");
		} catch (e) {
			v(e.message, !0);
		} finally {
			_ = h.disabled = !1;
		}
	}
	return h.addEventListener("click", b), i.body.append(s("div", { class: "fm-net-dialog" }, s("div", { class: "fm-net-body" }, s("div", { class: "sh-field" }, s("label", { for: "fm-link-address" }, j("newLink.address")), s("div", { class: "sh-field-pick" }, c, p), s("small", { class: "sh-field-hint" }, j("newLink.address.hint"))), s("div", { class: "sh-field" }, s("label", { for: "fm-link-name" }, j("newLink.name")), l), f), s("div", { class: "fm-net-foot" }, s("span", { class: "fm-sp" }), m, h))), requestAnimationFrame(() => c.focus()), i;
}
// src/shared/text.js
var on = (e) => String(e).replace(/\s+/g, " ").trim();
// src/shared/inlineRename.js
function sn(e, t, { onDone: n = null } = {}) {
	return new Promise((r) => {
		e.focus();
		let i = t.type === "file" ? t.name.lastIndexOf(".") : -1;
		e.setSelectionRange(0, i > 0 ? i : t.name.length);
		let a = !1, o = (i) => {
			if (a) return;
			a = !0;
			let o = on(e.value), s = i && o && o !== t.name ? o : null;
			n?.(s), r(s);
		};
		e.addEventListener("keydown", (e) => {
			e.stopPropagation(), e.key === "Enter" && (e.preventDefault(), o(!0)), e.key === "Escape" && (e.preventDefault(), o(!1));
		}), e.addEventListener("blur", () => o(!0));
	});
}
// src/files/FilesApp.js
var X = () => e.automation ?? null, cn = 1e3, ln = 1 << 20, un = 260, dn = "files-view", fn = "files-side-folded", pn = [
	"list",
	"grid",
	"thumbs"
], mn = 112, hn = {
	grid: 92,
	thumbs: 140
}, Z = o.trashRoot, gn = () => [
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
], _n = () => [
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
], Q = "tag:", vn = () => [
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
], $ = (e) => typeof e == "string" && e.startsWith(Q) ? v.get(e.slice(4)) : null, yn = (e) => e.some((e) => o.exists(e) && !o.get(e).system);
function bn(e) {
	return e?.trash || e?.folder === Z ? Z : typeof e?.tag == "string" && v.get(e.tag) ? Q + e.tag : $(e?.folder) || e?.folder && o.exists(e.folder) ? e.folder : null;
}
function xn(e) {
	return bn(e) ? null : typeof e?.tag == "string" || typeof e?.folder == "string" && e.folder.startsWith(Q) ? "tag" : e?.folder ? "folder" : null;
}
function Sn({ args: e, openWindow: t } = {}) {
	let r = new n({
		title: j("@name"),
		icon: "folder",
		width: 1e3,
		height: 520,
		minWidth: 520,
		minHeight: 300
	}), i = new Tn(r, t);
	i.go(bn(e) ?? o.root, !1);
	let a = xn(e);
	return a ? requestAnimationFrame(() => i.notFound(a)) : e?.link && requestAnimationFrame(() => i.followLink(e.link)), r.on("launch", (e) => {
		let t = bn(e);
		if (t) i.go(t, !0, !1);
		else if (xn(e)) return i.notFound(xn(e));
		e?.link && i.followLink(e.link);
	}), r.getState = () => ({ folder: i.folder }), r.selection = () => i.selected, r;
}
function Cn({ args: e, openWindow: t } = {}) {
	return an({
		folder: e?.folder && o.get(e.folder)?.type === "folder" && !o.isRemote?.(e.folder) ? e.folder : o.root,
		openWindow: t ?? (() => {})
	});
}
var wn = (e) => String(e).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(), Tn = class {
	folder = o.root;
	#e = [];
	#t = [];
	#n = pn.includes(_.get(dn)) ? _.get(dn) : "list";
	#r = new Set([].concat(_.get(fn) ?? []).filter((e) => typeof e == "string"));
	#i = {
		key: "name",
		dir: 1
	};
	#a = new Ze();
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
		let r = (e, t, n) => s("button", {
			class: "fm-btn",
			type: "button",
			title: t,
			"aria-label": t,
			onclick: n
		}, l(e));
		this.backBtn = r("arrowLeft", j("toolbar.back"), () => this.back()), this.forwardBtn = r("arrowRight", j("toolbar.forward"), () => this.forward()), this.upBtn = r("arrowUp", j("toolbar.up"), () => this.up()), this.crumbs = s("nav", {
			class: "fm-path",
			"aria-label": j("toolbar.path")
		}), this.crumbs.addEventListener("click", (e) => {
			e.target.closest("button") || this.editAddress();
		}), this.address = s("input", {
			class: "fm-path fm-address",
			type: "text",
			spellcheck: "false",
			autocomplete: "off",
			hidden: !0,
			"aria-label": j("toolbar.address")
		}), this.address.addEventListener("input", () => this.#w(!1)), this.address.addEventListener("keydown", (e) => {
			e.stopPropagation(), e.key === "Enter" && (e.preventDefault(), this.#C()), e.key === "Escape" && (e.preventDefault(), this.#S(!0));
		}), this.address.addEventListener("blur", () => {
			this.#v || this.#S(!1);
		}), this.newBtn = r("folderPlus", j("menu.newFolder"), () => this.create("folder")), this.listBtn = r("list", j("view.list"), () => this.setView("list")), this.gridBtn = r("grid", j("view.grid"), () => this.setView("grid")), this.thumbsBtn = r("image", j("view.thumbs"), () => this.setView("thumbs")), this.previewBtn = r("sidebar", "", () => this.preview.toggle()), this.infoBtn = r("info", "", () => this.info.toggle()), this.search = s("input", {
			type: "text",
			spellcheck: "false",
			"aria-label": j("toolbar.search")
		}), this.search.addEventListener("input", () => {
			this.#o = wn(this.search.value.trim()), this.render(), clearTimeout(this.#c), this.#c = setTimeout(() => this.#fe(), cn);
		}), this.search.addEventListener("keydown", (e) => {
			e.key === "Enter" && this.#fe(), e.key === "Escape" && this.search.value && (e.stopPropagation(), this.search.value = "", this.#o = "", this.render(), this.#fe()), e.key === "ArrowDown" && (e.preventDefault(), this.list.focus());
		}), this.side = s("aside", {
			class: "fm-side",
			"aria-label": j("side.label")
		}), this.list = s("div", {
			class: "fm-list",
			role: "listbox",
			tabindex: "0",
			"aria-multiselectable": "true",
			"aria-label": j("list.label")
		}), this.mountSlot = s("div", { class: "fm-mountslot" }), this.statusLeft = s("span"), this.statusRight = s("span", { class: "fm-status-right" });
		let i = (e, t, n, r) => new ke({
			key: e,
			...t,
			width: n,
			open: r,
			room: () => this.#O() - (e === "info" ? this.preview : this.info).shown,
			onLayout: () => {
				this.#k(), this.#E();
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
		}, 260, !0), this.previewView = new Ke(this.preview.body, {
			text: (e) => this.#D(e),
			open: (e) => this.open(e)
		}), this.main = s("div", { class: "fm" }, this.side, s("div", { class: "fm-main" }, this.mountSlot, this.list, s("div", { class: "fm-status" }, this.statusLeft, this.statusRight)), this.preview.el, this.info.el), t.body.append(s("div", { class: "fm-toolbar" }, this.backBtn, this.forwardBtn, this.upBtn, this.crumbs, this.address, this.newBtn, s("span", { class: "fm-sep" }), this.listBtn, this.gridBtn, this.thumbsBtn, s("span", { class: "fm-sep" }), this.previewBtn, this.infoBtn, s("label", { class: "fm-search" }, l("search"), this.search)), this.main);
		let a = new ResizeObserver(() => this.#k());
		a.observe(this.main), this.#te(), re(this.list, {
			target: (e, t, n, r) => this.#I(r),
			files: () => this.inTrash || this.inTag ? null : this.folder
		}), this.gap = s("div", {
			class: "fm-gap",
			"aria-hidden": "true"
		}), re(this.side, { target: (e, t, n, r) => this.#F(e, t, n, r) });
		let u = o.on("change", (e) => this.#he(e)), d = A.on("change", () => {
			this.#se(this.folder) && this.render();
		}), f = o.on("scope", () => {
			this.#se(this.folder) && this.render();
		}), p = ue(() => {
			this.#se(this.folder) && this.render();
		}), m = o.on("trash", () => {
			this.inTrash && (this.#g = "", this.render());
		}), h = G() ? e.net.on("mounts", () => {
			this.#se(this.folder) && this.render();
		}) : () => {}, g = v.on("change", () => {
			if (this.folder.startsWith?.(Q) && !this.inTag) return this.go(o.root, !1);
			this.#se(this.folder) && this.render();
		}), _ = w({
			isActive: () => t.active,
			selectionSize: () => this.#f.size,
			open: () => this.openSelected(),
			rename: () => this.rename([...this.#f][0]),
			remove: () => this.remove([...this.#f]),
			selectAll: () => this.#ee(this.#l.map((e) => e.id)),
			deselect: () => this.#ee([])
		}), y = c.attach(t.el, this.history), b = [
			O("files.info", {
				isActive: () => t.active,
				run: () => this.info.toggle()
			}),
			O("files.preview", {
				isActive: () => t.active,
				run: () => this.preview.toggle()
			}),
			O("files.address", {
				isActive: () => t.active,
				run: () => this.editAddress()
			})
		];
		t.on("destroy", () => {
			u(), d(), f(), p(), m(), g(), h(), _(), y(), b.forEach((e) => e()), a.disconnect(), this.previewView.destroy(), clearTimeout(this.#c);
		}), this.#pe();
	}
	get inTrash() {
		return this.folder === Z;
	}
	get selected() {
		return this.inTrash ? [] : [...this.#f];
	}
	get inTag() {
		return $(this.folder);
	}
	get tree() {
		return this.#n === "list" && !this.inTrash;
	}
	go(e, t = !0, n = t) {
		if (e !== Z && !$(e) && o.get(e)?.type !== "folder") return;
		t && e !== this.folder && (this.#e.push(this.folder), this.#t = []);
		let r = this.folder;
		this.folder = e, this.#f.clear(), this.#h = null, this.#g = "", this.search.value = "", this.#o = "", clearTimeout(this.#c), this.#s = "";
		let i = o.ancestors(r).find((t) => t.parent === e);
		this.#m = i?.id ?? null, i && this.#f.add(i.id), this.#p = this.#m, this.render(), this.list.scrollTop = 0, o.isRemote?.(e) && this.#x(e), n && e !== r && this.#de();
	}
	async #x(e) {
		this.#ue(j("net.loading"));
		let t = await Dt(this, e);
		this.folder === e && this.#g === j("net.loading") && this.#ue(t ? "" : j("net.notRead"));
	}
	netError(e, { retry: t = !1, title: n = j("net.error.title") } = {}) {
		return this.#me(n, e?.message ?? String(e), t ? ["retry", "cancel"] : ["ok"]);
	}
	reveal(e) {
		let t = o.get(e);
		t && (this.go(t.parent), o.isHidden(e) ? this.#ue(j("message.hiddenByTag", { name: t.name })) : this.#ee([e], e));
	}
	back() {
		this.#le(this.#e, this.#t);
	}
	forward() {
		this.#le(this.#t, this.#e);
	}
	up() {
		let e = o.get(this.folder)?.parent;
		e && this.go(e);
	}
	editAddress() {
		this.address.hidden && (this.address.value = this.inTrash || this.inTag ? `${o.home}/` : o.path(this.folder), this.#w(!1), this.crumbs.hidden = !0, this.address.hidden = !1), this.address.focus(), this.address.select();
	}
	#S(e) {
		this.address.hidden || (this.address.hidden = !0, this.crumbs.hidden = !1, this.#g && this.#g === this.#_ && this.#ue(""), e && this.list.focus());
	}
	async #C() {
		let e = this.address.value.trim().replace(/\\/g, "/"), t = e ? o.resolve(e) : null;
		if (!t && e) {
			this.#w(!0), this.#v = !0;
			let t = await this.#me(j("error.pathNotFound"), j("message.noPath", { path: e }), ["retry", "cancel"]);
			if (this.#v = !1, t !== "retry") return this.#S(!0);
			this.address.focus(), this.address.setSelectionRange(this.address.value.length, this.address.value.length);
		} else {
			if (!t) return this.#w(!0), this.#_ = e ? j("message.noPath", { path: e }) : j("message.typePath", { path: o.path(this.inTrash || this.inTag ? o.root : this.folder) }), this.#ue(this.#_);
			this.#S(!0), t.type === "folder" ? this.go(t.id) : this.reveal(t.id);
		}
	}
	#w(e) {
		this.address.classList.toggle("bad", e), this.address.setAttribute("aria-invalid", String(e));
	}
	setView(e) {
		e !== this.#n && X()?.record("files.view", { params: { mode: e } }), this.#n = e, _.set(dn, e), this.render();
	}
	open(e) {
		if (e.type === "folder") return this.go(e.id);
		if (e.type === "app") return ie(e.app);
		if (e.type === "link") return this.#T(e);
		if (e.net && e.web) return Et(this, e.id);
		Ht(this, e) || de(e);
	}
	async #T(e) {
		if (e.link?.kind === "web") return x.openWebLink?.(e.link.url);
		let t = await x.findLinkTarget?.(e, {
			win: this.win,
			read: (e) => Dt(this, e)
		});
		t && this.open(t);
	}
	followLink(e) {
		let t = o.get(e);
		t?.type === "link" && this.#T(t);
	}
	newLink() {
		if (this.inTrash || this.inTag) return;
		let e = this.folder;
		this.openWindow(an({
			folder: e,
			openWindow: this.openWindow,
			onMade: (t) => {
				pe(this.history, t), this.folder === e && this.#ee([t], t);
			}
		}));
	}
	addDeskLinks(e) {
		let t;
		try {
			t = x.addDeskLinks(e);
		} catch (e) {
			this.#me(j("error.deskLink"), e.message);
			return;
		}
		t.forEach((e) => pe(this.history, e)), t.length && y(j("toast.deskLinks", {
			n: t.length,
			count: M(t.length)
		}));
	}
	openSelected() {
		if (this.inTrash) return this.#ue(j("message.restoreToOpen"));
		let e = this.#l.filter((e) => this.#f.has(e.id)), t = e.find((e) => e.type === "folder");
		e.filter((e) => e.type !== "folder").forEach((e) => this.open(e)), t && this.go(t.id);
	}
	create(e) {
		if (this.inTrash || this.inTag) return;
		this.#o &&= (this.search.value = "", "");
		let t;
		try {
			t = o.create(this.folder, {
				type: e,
				name: j(e === "folder" ? "create.folderName" : "create.fileName")
			});
		} catch (t) {
			this.#me(j(e === "folder" ? "error.createFolder" : "error.createFile"), t.message);
			return;
		}
		this.#ee([t.id]), this.rename(t.id, !0);
	}
	rename(e, t = !1) {
		let n = o.get(e);
		if (!n || n.system) return;
		if (n.noRename) return this.#ue(j("message.noRename", { name: n.name }));
		this.#h = e, this.render();
		let r = this.list.querySelector(".fm-rename");
		r && sn(r, n, { onDone: (r) => {
			if (this.#h = null, r && o.exists(e)) try {
				he(t ? null : this.history, e, r);
			} catch (t) {
				this.#me(j("error.rename", { name: n.name }), t.message, ["retry", "cancel"]).then((t) => {
					t === "retry" && o.exists(e) && this.rename(e);
				});
			}
			t && pe(this.history, e), this.render(), this.list.focus();
		} });
	}
	setOpen(e, t, n = !1) {
		let r = [e];
		if (n) for (let e = 0; e < r.length; e++) r.push(...o.children(r[e]).filter((e) => e.type === "folder").map((e) => e.id));
		if (r.forEach((e) => t ? this.#u.add(e) : this.#u.delete(e)), t && r.filter((e) => o.isRemote?.(e)).forEach((e) => Dt(this, e)), !t) {
			let t = (t) => t != null && t !== e && o.isInside(t, e);
			t(this.#m) && (this.#m = e), t(this.#p) && (this.#p = e), [...this.#f].some(t) && (this.#f = new Set([...this.#f].filter((e) => !t(e)).concat(e)));
		}
		this.render();
	}
	remove(e) {
		if (this.inTrash) return this.purge(e);
		let t = e.filter((e) => !o.get(e)?.system && !o.get(e)?.noRemove);
		if (!t.length) return void this.#me(j("error.delete"), e.some((e) => o.get(e)?.noRemove) ? j("message.noRemove") : j("message.systemFolders"));
		let { x: n, y: r } = this.#ce(t[0]);
		T(t, n, r, this.history);
	}
	restore(e) {
		let t = ge(this.history, e);
		if (!t.length) return;
		let n = [...new Set(t.map((e) => e.parent === o.root ? j("place.home") : o.path(e.parent)))], r = M(t.length);
		y(t.length === 1 ? j("toast.restored", {
			name: o.get(t[0].id).name,
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
		let t = this.#l.filter((t) => e.includes(t.id));
		if (!t.length) return;
		let { x: n, y: r } = this.#ce(t[0].id);
		te(t.map((e) => e.id), n, r);
	}
	empty(e, t) {
		ee(e, t);
	}
	render() {
		let e = this.inTag, t = this.inTrash ? {
			id: Z,
			name: j("place.trash"),
			parent: null
		} : e ? {
			id: this.folder,
			name: j("place.tag", { name: e.name }),
			parent: null
		} : o.get(this.folder);
		if (!t) return;
		this.win.setTitle(P(t), j("@name")), this.#A(t), this.#j();
		let n = !this.inTrash && !e && G() ? wt(this, this.folder) : null;
		this.mountSlot.replaceChildren(...n ? [n] : []);
		let r = this.inTrash ? o.trashed() : e ? o.tagged(e.id) : o.children(this.folder);
		this.#d.clear(), this.#l = this.#q(r);
		let i = new Set(this.#l.map((e) => e.id));
		this.#f = new Set([...this.#f].filter((e) => i.has(e))), i.has(this.#m) || (this.#m = this.#l[0]?.id ?? null);
		let a = this.list.scrollTop;
		this.list.classList.toggle("grid", this.#n !== "list"), this.list.classList.toggle("thumbs", this.#n === "thumbs"), this.list.classList.toggle("tree", this.tree), this.list.setAttribute("role", this.tree ? "tree" : "listbox"), this.#l.length ? this.#n === "list" ? (this.#z(), this.list.replaceChildren(this.#W(), ...this.#l.map((e) => this.#G(e)))) : this.list.replaceChildren(...this.#l.map((e) => this.#X(e))) : this.list.replaceChildren(s("div", { class: "fm-empty" }, this.#o ? j("empty.noMatch", { query: this.search.value.trim() }) : this.inTrash ? j("empty.trash") : j(e ? "empty.tag" : "empty.folder"))), this.list.scrollTop = a, this.list.setAttribute("aria-activedescendant", this.#m ? `fm-${this.#m}` : "");
		let c = r.length, l = this.#f.size;
		this.statusLeft.textContent = j("status.items", {
			n: c,
			count: M(c)
		}) + (l ? ` · ${j("status.selected", {
			n: l,
			count: M(l)
		})}` : ""), this.statusRight.textContent = this.#g || (this.inTrash ? Ee() : e ? e.visible ? j("status.tag") : j("status.tagHidden") : o.path(this.folder)), this.statusRight.classList.toggle("msg", !!this.#g), this.#E();
	}
	#E() {
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
			let e = h.label(r), o = `${n.open ? a : i}${e ? ` (${e})` : ""}`;
			t.title = o, t.setAttribute("aria-label", o), t.setAttribute("aria-pressed", String(n.open)), t.classList.toggle("on", n.open);
		}
		if (!this.info.open && !this.preview.open) return;
		let t = this.#l.filter((e) => this.#f.has(e.id));
		if (this.preview.open && this.previewView.update(t), this.info.open) {
			let e = this.inTag, n = this.inTrash ? { trash: !0 } : e ? { tag: e } : { node: o.get(this.folder) };
			if (!n.trash && !n.tag && !n.node) return;
			let r = this.info.body, i = r.scrollTop;
			r.replaceChildren(Ve({
				nodes: t,
				place: n,
				text: (e) => this.#D(e)
			})), r.scrollTop = i;
		}
	}
	#D(e) {
		if (!Le(e)) return Promise.reject(Error(j("error.notFile")));
		if (e.net && (e.size ?? 0) > ln) return Promise.reject(Error(j("net.preview.big")));
		let t = Re(e);
		return this.#b.key !== t && (this.#b = {
			key: t,
			text: o.read(e.id)
		}), this.#b.text;
	}
	#O() {
		return this.main.clientWidth - this.side.offsetWidth - un;
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
		this.search.placeholder = j("toolbar.searchIn", { name: P(e) });
		let t = this.inTrash || this.inTag ? [e] : o.ancestors(this.folder);
		this.crumbs.replaceChildren(...t.flatMap((e, n) => {
			let r = n === t.length - 1 ? s("span", {
				class: "fm-crumb current",
				"aria-current": "page"
			}, P(e)) : s("button", {
				class: "fm-crumb",
				type: "button",
				onclick: () => this.go(e.id)
			}, P(e));
			return o.exists(e.id) && oe(r, e), n ? [s("span", {
				class: "fm-crumb-sep",
				"aria-hidden": "true"
			}, "›"), r] : [r];
		}));
	}
	#j() {
		let e = o.children(o.root), t = new Set(o.ancestors(this.folder).map((e) => e.id)), n = [{
			key: "root",
			id: o.root,
			name: j("place.home"),
			glyph: "home"
		}, ...C.map((t) => ({
			...t,
			id: e.find((e) => e.name === t.name && e.system)?.id,
			glyph: t.icon
		})).filter((e) => e.id).map((e) => ({
			...e,
			key: e.name === S ? "desk" : e.id
		}))], r = o.ancestors(this.folder).find((e) => e.mount)?.id ?? null, i = this.inTrash || this.inTag ? this.folder : r ? null : [...n].reverse().find((e) => t.has(e.id))?.id, a = (e) => s("button", {
			class: e.id === i ? "fm-place on" : "fm-place",
			type: "button",
			"aria-current": e.id === i ? "true" : null,
			onclick: () => this.go(e.id)
		}, l(e.glyph), s("span", {}, e.name)), c = (e) => {
			let t = Q + e.id;
			return s("button", {
				class: t === i ? "fm-place fm-tag on" : "fm-place fm-tag",
				type: "button",
				"aria-current": t === i ? "true" : null,
				title: e.visible ? e.name : j("side.tagHidden", { name: e.name }),
				onclick: () => this.go(t)
			}, s("span", {
				class: "tag-dot",
				style: { background: e.color },
				"aria-hidden": "true"
			}), s("span", {}, e.name), e.visible ? null : l("eyeOff"));
		}, u = v.list(), f = n.map((e) => e.key);
		this.#y = {
			defaults: f,
			desk: n.find((e) => e.key === "desk")?.id
		};
		let p = (e, t, { node: n, folder: r } = {}) => (t.dataset.entry = e, r && (t.dataset.folder = r), t.addEventListener("pointerdown", (e) => {
			e.button === 0 && !e.target.closest(".fm-link-x") && E(e, {
				ids: [n],
				stack: this.history
			});
		}), t), m = (e) => {
			let t = e.id === this.folder, n = () => this.#N(e), r = s("button", {
				class: t ? "fm-place fm-link on" : "fm-place fm-link",
				type: "button",
				"aria-current": t ? "true" : null,
				title: `${F(e)} › ${e.name}`,
				onclick: () => this.open(e)
			}, s("span", { class: "fm-link-icon" }, k(e)), s("span", {}, e.name));
			r.addEventListener("contextmenu", (t) => {
				t.preventDefault(), d(t.clientX, t.clientY, [
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
			let i = s("button", {
				class: "fm-link-x",
				type: "button",
				title: j("side.unlinkTitle"),
				"aria-label": j("link.remove", { name: e.name }),
				onclick: n
			}, l("x"));
			return p(e.id, s("div", { class: "fm-link-row" }, r, i), {
				node: e.id,
				folder: e.type === "folder" ? e.id : null
			});
		}, h = (e) => {
			let t = n.find((t) => t.key === e);
			if (t) return p(e, a(t), {
				node: t.id,
				folder: t.id
			});
			let r = o.get(e);
			return r ? m(r) : [];
		}, g = a({
			id: Z,
			name: j("place.trash"),
			glyph: "trash"
		});
		g.dataset.trash = "";
		let _ = e.find((e) => e.system && e.name === x.NETWORK_NAME)?.id ?? null, y = (e) => s("h6", { class: "fm-side-head" }, s("span", { class: "fm-side-label" }, e));
		this.side.replaceChildren(this.#M("links", j("side.links"), s("section", {
			class: "fm-side-links",
			"aria-label": j("side.links")
		}, y(j("side.links")), ...A.arrange(f).flatMap(h))), ...u.length ? [this.#M("tags", j("side.tags"), s("section", {
			class: "fm-side-tags",
			"aria-label": j("side.tags")
		}, y(j("side.tags")), ...u.map(c)))] : [], ...xt(this, {
			active: r,
			reteFolder: _
		}).map((e) => this.#M("net", j("net.section"), e)), s("hr", { class: "fm-side-sep" }), g, this.gap);
	}
	#M(e, t, n) {
		let r = !this.#r.has(e), i = n.querySelector(":scope > h6"), a = j(r ? "side.collapse" : "side.expand", { name: t }), o = () => {
			r ? this.#r.add(e) : this.#r.delete(e), _.set(fn, [...this.#r]), this.#j(), this.side.querySelector(`[data-fold="${e}"]`)?.focus();
		};
		return i.prepend(s("button", {
			class: r ? "fm-side-fold open" : "fm-side-fold",
			type: "button",
			dataset: { fold: e },
			title: a,
			"aria-label": a,
			"aria-expanded": String(r),
			onclick: o
		})), i.querySelector(".fm-side-label")?.addEventListener("click", o), n.classList.toggle("folded", !r), n;
	}
	#N(e) {
		let { defaults: t } = this.#y, n = A.arrange(t).indexOf(e.id);
		n < 0 || (A.remove(e.id), this.history.push({
			label: j("link.remove", { name: e.name }),
			undo: () => A.place([e.id], n, t),
			redo: () => A.remove(e.id)
		}), y(j("toast.unlinked", { name: e.name })), this.list.focus());
	}
	#P(e) {
		return e === o.root ? "root" : e === this.#y.desk ? "desk" : o.exists(e) ? e : null;
	}
	#F(e, t, n, r) {
		let i = e?.closest?.("[data-trash]");
		if (i) return yn(r) ? {
			el: i,
			run: (e, t) => this.#L(r, t)
		} : null;
		let a = e?.closest?.(".fm-mount");
		if (a) {
			let e = se(r, a.dataset.folder);
			return e && {
				el: a,
				run: (t, n) => ce(n, e, a.dataset.folder)
			};
		}
		let o = this.side.querySelector(".fm-side-links");
		if (!o?.contains(e) || o.classList.contains("folded")) return null;
		let s = [...o.querySelectorAll(":scope > [data-entry]")], c = e.closest("[data-entry]");
		if (c && s.includes(c)) {
			let e = c.getBoundingClientRect(), t = Math.min(8, e.height / 4), { folder: i } = c.dataset;
			if (i && n > e.top + t && n < e.bottom - t) {
				let e = se(r, i);
				return e && {
					el: c,
					run: (t, n) => ce(n, e, i)
				};
			}
		}
		let l = s.findIndex((e) => {
			let t = e.getBoundingClientRect();
			return n < t.top + t.height / 2;
		});
		l < 0 && (l = s.length);
		let u = [...new Set(r.map((e) => this.#P(e)).filter(Boolean))], { defaults: d } = this.#y;
		if (!A.changes(u, l, d)) return null;
		let f = this.side.getBoundingClientRect(), p = l < s.length ? s[l].getBoundingClientRect().top : s[s.length - 1].getBoundingClientRect().bottom;
		return this.gap.style.top = `${p - f.top + this.side.scrollTop}px`, {
			el: this.gap,
			run: () => {
				let e = A.place(u, l, d);
				e && y(j("toast.linksAdded", {
					n: e,
					count: M(e)
				}));
			}
		};
	}
	#I(e) {
		if (this.inTrash) return yn(e) ? {
			el: this.list,
			run: (t, n) => this.#L(e, n)
		} : null;
		if (this.inTag) return null;
		let t = se(e, this.folder);
		return t && {
			el: this.list,
			run: (e, n) => ce(n, t, this.folder)
		};
	}
	#L(e, t) {
		let n = e.filter((e) => !o.get(e)?.system).length;
		me(t, e), y(j("toast.trashed", {
			n,
			count: M(n)
		}));
	}
	#R() {
		return (this.inTrash ? _n : this.inTag ? vn : gn)();
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
				label: j("columns.fitAll"),
				icon: "fit",
				action: () => this.#a.shown(e).forEach((e) => this.#B(e.key))
			},
			{
				label: j("columns.reset"),
				icon: "undo",
				action: () => {
					this.#a.reset(), this.render();
				}
			}
		];
	}
	#U(e) {
		let t = s("span", {
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
			this.list.classList.add("resizing"), b(t, {
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
		return s("div", {
			class: "fm-head",
			role: "presentation"
		}, e.map((e) => {
			let t = this.#i.key === e.key, n = s("button", {
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
					}, this.render(), X()?.record("files.sort", { params: {
						by: e.key,
						direction: this.#i.dir > 0 ? "asc" : "desc"
					} });
				}
			}, e.label, t ? s("span", {
				class: "fm-arrow",
				"aria-hidden": "true"
			}, this.#i.dir > 0 ? "▲" : "▼") : null);
			return s("div", {
				class: "fm-th",
				dataset: { col: e.key }
			}, n, this.#U(e));
		}));
	}
	#G(e) {
		let t = this.#Y(e);
		return this.tree && (t.name.prepend(this.#K(e)), t.name.style.setProperty("--fm-depth", this.#d.get(e.id) ?? 0)), this.#Q(e, "fm-row", ...this.#a.shown(this.#R()).map((e) => {
			let n = t[e.key] ?? s("span");
			return n.dataset.col = e.key, n;
		}));
	}
	#K(e) {
		if (e.type !== "folder") return s("span", {
			class: "fm-twisty",
			"aria-hidden": "true"
		});
		let t = this.#u.has(e.id);
		return s("span", {
			class: t ? "fm-twisty open" : "fm-twisty",
			dataset: { twisty: e.id },
			"aria-hidden": "true",
			title: j(t ? "tree.collapseTitle" : "tree.expandTitle")
		});
	}
	#q(e, t = 0, n = []) {
		for (let r of this.#$(e)) {
			let e = n.length;
			n.push(r), this.#d.set(r.id, t), this.#J(r) && this.#q(o.children(r.id), t + 1, n), this.#o && n.length === e + 1 && !wn(r.name).includes(this.#o) && n.pop();
		}
		return n;
	}
	#J(e) {
		return this.tree && e.type === "folder" && this.#u.has(e.id);
	}
	#Y(e) {
		if (e.trashed) {
			let t = Ce(e);
			return {
				name: s("span", { class: "fm-name" }, s("span", { class: "fm-icon" }, k(e)), this.#Z(e)),
				deleted: s("span", {}, R(e.trashed.at)),
				size: s("span", { class: "num" }, Te(e)),
				type: s("span", {}, N(e)),
				origin: s("span", { title: j("trash.restoresTo", { place: t }) }, t)
			};
		}
		let t = this.inTag ? F(e) : "";
		return {
			name: s("span", { class: "fm-name" }, s("span", { class: "fm-icon" }, k(e)), this.#Z(e), ye(e)),
			modified: s("span", {}, R(e.modified)),
			size: s("span", { class: "num" }, Te(e)),
			type: s("span", {}, N(e)),
			workspace: we(e),
			location: s("span", { title: t }, t)
		};
	}
	#X(e) {
		let t = k(e, this.#n === "thumbs" && !e.trashed ? { preview: mn } : void 0), n = this.#Q(e, "fm-tile", s("span", { class: "fm-tile-icon" }, t, ye(e, "fm-tile-tags")), this.#Z(e)), r = (e.tags ?? []).map((e) => v.get(e)?.name).filter(Boolean), i = e.trashed ? [j("tile.deleted", { date: R(e.trashed.at) }), j("tile.origin", { place: Ce(e) })] : [
			this.inTag && j("tile.location", { place: F(e) }),
			j("owner.label", { name: I(e) }),
			r.length && j("tile.tags", { names: r.join(", ") })
		];
		return n.title = [e.name, ...i.filter(Boolean)].join("\n"), n;
	}
	#Z(e) {
		if (this.#h === e.id) return s("input", {
			class: "fm-rename",
			type: "text",
			value: e.name,
			spellcheck: "false",
			"aria-label": j("rename.label")
		});
		let t = vt(e);
		return t.length ? s("span", { class: "fm-label-chips" }, s("span", {
			class: "fm-label",
			title: e.name
		}, e.name), ...t) : s("span", {
			class: "fm-label",
			title: e.name
		}, e.name);
	}
	#Q(e, t, ...n) {
		let r = this.#f.has(e.id), i = this.tree && t === "fm-row", a = s("div", {
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
		return e.trashed ? a : oe(a, e);
	}
	#$(e) {
		let { key: t, dir: n } = this.#i, r = (e) => t === "type" ? N(e) : t === "workspace" ? I(e) : t === "size" ? e.type === "folder" ? e.trashed ? e.inside : o.children(e.id).length : e.size ?? 0 : t === "modified" ? e.modified : t === "deleted" ? e.trashed?.at ?? e.modified : t === "origin" && e.trashed ? Ce(e) : t === "location" ? F(e) : e.name, i = {
			folder: 0,
			file: 1,
			app: 1,
			link: 1
		};
		return [...e].sort((e, t) => {
			if (i[e.type] !== i[t.type]) return i[e.type] - i[t.type];
			let a = r(e), o = r(t);
			return ((typeof a == "number" ? a - o : String(a).localeCompare(String(o), p.locale, { numeric: !0 })) || e.name.localeCompare(t.name, p.locale, { numeric: !0 })) * n;
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
			let i = r.dataset.id, a = this.#l.map((e) => e.id), s = !1;
			if (e.shiftKey && this.#p && a.includes(this.#p)) {
				let [t, n] = [a.indexOf(this.#p), a.indexOf(i)].sort((e, t) => e - t), r = a.slice(t, n + 1);
				this.#ee(e.ctrlKey || e.metaKey ? [.../* @__PURE__ */ new Set([...this.#f, ...r])] : r, i);
			} else if (e.ctrlKey || e.metaKey) {
				let e = new Set(this.#f);
				e.has(i) ? e.delete(i) : e.add(i), this.#p = i, this.#ee([...e], i);
			} else this.#p = i, this.#f.has(i) ? s = this.#f.size > 1 : this.#ee([i], i);
			this.inTrash && !o.isTrashed || !this.#f.has(i) || E(e, {
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
			let r = o.get(n.dataset.id);
			r && this.open(r);
		}, { signal: e }), this.list.addEventListener("contextmenu", (e) => {
			if (e.preventDefault(), e.target.closest(".fm-head")) return d(e.clientX, e.clientY, this.#H());
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
		let t = this.#n !== "list", n = t ? Math.max(1, Math.floor(this.list.clientWidth / hn[this.#n])) : 1;
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
			label: j("view.menu"),
			icon: "grid",
			items: pn.map((e) => ({
				label: j(`view.${e}`),
				icon: this.#n === e ? "check" : null,
				action: () => this.setView(e)
			}))
		}, n = this.#n === "list" && {
			label: j("columns.menu"),
			icon: "list",
			items: this.#H()
		}, r = this.#l.some((e) => this.#J(e)) && {
			label: j("tree.collapseAll"),
			icon: "minus",
			action: () => {
				this.#u.clear(), this.render();
			}
		};
		if (this.inTrash) {
			let r = !this.#l.length;
			return d(e.clientX, e.clientY, [
				{
					label: j("menu.restoreAll"),
					icon: "undo",
					disabled: r,
					action: () => this.restore(o.trashed().map((e) => e.id))
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
		if (this.inTag) return d(e.clientX, e.clientY, [
			{
				label: j("menu.manageTags"),
				icon: "gear",
				action: () => ie("settings", { tab: "tags" })
			},
			"-",
			t,
			n,
			r
		].filter(Boolean));
		let i = x.locateLink && !o.isRemote?.(this.folder);
		d(e.clientX, e.clientY, [
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
			i && {
				label: j("menu.newLink"),
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
		let t = this.#l.filter((e) => this.#f.has(e.id)), n = t.length > 1, r = M(t.length);
		if (this.inTrash) {
			let i = t.map((e) => e.id);
			return d(e.clientX, e.clientY, [
				{
					label: n ? j("menu.restoreMany", { count: r }) : j("menu.restore"),
					icon: "undo",
					action: () => this.restore(i)
				},
				{
					label: j("menu.info"),
					icon: "info",
					shortcut: h.label("files.info"),
					action: () => this.info.setOpen(!0)
				},
				"-",
				{
					label: j("menu.purge"),
					icon: "trash",
					shortcut: h.label("items.delete"),
					danger: !0,
					action: () => this.purge(i)
				}
			]);
		}
		if (!n && t[0].mount) {
			let n = K(t[0].id);
			if (n) return St(this, n, e.clientX, e.clientY);
		}
		let i = t.some((e) => e.system), a = t.some((e) => e.net), o = t.map((e) => e.id), s = this.inTag, c = !n && this.tree && t[0].type === "folder" && t[0], l = c && this.#u.has(c.id);
		d(e.clientX, e.clientY, [
			{
				label: n ? j("menu.openMany", { count: r }) : j("menu.open"),
				icon: "open",
				shortcut: h.label("items.open"),
				action: () => this.openSelected()
			},
			c && {
				label: j(l ? "tree.collapse" : "tree.expand"),
				icon: l ? "minus" : "plus",
				action: () => this.setOpen(c.id, !l)
			},
			c && {
				label: j("tree.expandAll"),
				icon: "plus",
				action: () => this.setOpen(c.id, !0, !0)
			},
			!n && t[0].type === "file" && {
				label: j("menu.openWith"),
				icon: "open",
				action: () => de(t[0], { choose: !0 })
			},
			...Ut(this, t),
			...Xt(t),
			!n && t[0].type === "folder" && {
				label: j("menu.openInEditor"),
				icon: "code",
				action: () => ie("editor", { folder: t[0].id })
			},
			s && !n && {
				label: j("menu.reveal"),
				icon: "folderOpen",
				action: () => this.reveal(t[0].id)
			},
			{
				label: j("menu.rename"),
				icon: "pencil",
				shortcut: h.label("items.rename"),
				disabled: n || i || t[0].noRename,
				action: () => this.rename(t[0].id)
			},
			!a && be(o),
			s && {
				label: j("menu.untag", { name: s.name }),
				icon: "x",
				action: () => _e(o, s.id, !1)
			},
			!a && ae(o),
			x.canLinkOnDesk?.(o) && {
				label: j("menu.deskLink"),
				icon: "link",
				action: () => this.addDeskLinks(o)
			},
			{
				label: j("menu.info"),
				icon: "info",
				shortcut: h.label("files.info"),
				action: () => this.info.setOpen(!0)
			},
			!n && {
				label: j("menu.properties"),
				icon: "info",
				action: () => ve(t[0].id)
			},
			...x.appActionEntries?.(o, { separator: !0 }) ?? [],
			"-",
			{
				label: t.every((e) => e.removeLabel) ? G()?.text(t[0].removeLabel) : n ? j("menu.deleteMany", { count: r }) : j("menu.delete"),
				icon: "trash",
				shortcut: h.label("items.delete"),
				danger: !0,
				disabled: i || t.every((e) => e.noRemove),
				action: () => this.remove(t.map((e) => e.id))
			}
		].filter(Boolean));
	}
	#se(e) {
		return e === Z || !!$(e) || o.exists(e);
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
		o.get(this.folder)?.type === "folder" && X()?.record("files.go", { params: { folder: this.folder } });
	}
	#fe() {
		clearTimeout(this.#c);
		let e = this.search.value.trim();
		e !== this.#s && (this.#s = e, X()?.record("files.search", { params: { query: e } }));
	}
	#pe() {
		let e = X();
		if (!e) return;
		let t = {
			window: this.win,
			file: () => null
		};
		e.handle("files.go", ({ folder: e }) => {
			if (o.get(e)?.type !== "folder") throw Error(j("automation.noFolder"));
			this.go(e);
		}, t), e.handle("files.search", ({ query: e = "" }) => {
			this.search.value = e, this.#o = wn(e.trim()), this.#s = e.trim(), this.render();
		}, t), e.handle("files.sort", ({ by: e, direction: t }) => {
			if (!this.#R().some((t) => t.key === e)) throw Error(j("automation.noColumn"));
			this.#i = {
				key: e,
				dir: t === "desc" ? -1 : 1
			}, this.render();
		}, t), e.handle("files.view", ({ mode: e }) => {
			if (!pn.includes(e)) throw Error(j("automation.noView"));
			this.setView(e);
		}, t);
	}
	async #me(e, t = "", n = ["ok"]) {
		let r = await u(this.win, {
			icon: "error",
			title: e,
			text: t,
			buttons: n
		});
		return this.list.isConnected && !this.win.el.contains(document.activeElement) && this.list.focus(), r;
	}
	notFound(e) {
		let t = j("place.home");
		this.#me(j(e === "tag" ? "error.tagNotFound" : "error.folderNotFound"), j(e === "tag" ? "error.tagNotFoundText" : "error.folderNotFoundText", { place: t }));
	}
	#he(e) {
		let t = e.node && A.has(e.node.id);
		if (this.inTrash) return t ? this.render() : void 0;
		if (this.inTag) return this.render();
		if (e.type === "remove" && e.ids.includes(this.folder)) return this.go(e.parent && o.exists(e.parent) ? e.parent : o.root, !1);
		let n = (e) => e === this.folder || this.#u.has(e), r = n(e.parent) || n(e.from), i = e.type !== "remove" && o.isInside(this.folder, e.node.id), a = [e.parent, e.from].some((e) => e && o.exists(e) && n(o.get(e).parent));
		(r || i || a || t) && (r && e.type !== "rename" && (this.#g = ""), this.render());
	}
};
export { Sn as default, Cn as newLink };
