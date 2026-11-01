import * as e from "/host/sdk.js";
import { UndoStack as t, Window as n, appIcon as r, fileType as i, fs as a, h as o, history as s, icon as c, openMenu as l, session as u, settings as d, shortcuts as f, storage as p, tags as m, toast as h, trackDrag as g } from "/host/sdk.js";
import * as _ from "/host/system.js";
import { DESK_NAME as ee, SYSTEM_FOLDERS as te, addTarget as ne, confirmRemove as re, describeWorkspace as ie, dragItems as ae, dropZone as oe, getApp as v, handleCommand as se, itemIcon as y, launch as b, linkEntry as ce, links as x, markItem as le, movableInto as ue, moveInto as de, onWorkspacesChange as fe, openFile as pe, recordCreated as me, removeNodes as he, renameNode as ge, restoreNodes as _e, setTag as ve, showProperties as ye, tagDots as be, tagSubmenu as xe } from "/host/system.js";
// src/shared/i18n.js
function Se(t, n) {
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
var { t: S } = Se("files", {
	en: { strings: {
		"@name": "File Manager",
		"@description": "Browse, search and organize files and folders: tags, links, trash, info and preview.",
		"@commands.files.info.label": "Show or hide the info panel",
		"@commands.files.preview.label": "Show or hide the preview",
		"@entrypoints.main.params.folder.label": "Folder",
		"@entrypoints.main.params.folder.description": "The folder it shows when it opens",
		"toolbar.back": "Back (Alt ←)",
		"toolbar.forward": "Forward (Alt →)",
		"toolbar.up": "Parent folder (Alt ↑)",
		"toolbar.path": "Path",
		"toolbar.search": "Search this folder",
		"toolbar.searchIn": "Search {name}",
		"view.list": "List view",
		"view.grid": "Icon view",
		"view.thumbs": "Preview view",
		"view.menu": "View",
		"list.label": "Folder contents",
		"list.more": "and {count} more",
		"rename.label": "New name",
		"create.folderName": "New folder",
		"create.fileName": "New file.txt",
		"panel.info.title": "Info",
		"panel.info.show": "Show the info panel",
		"panel.info.hide": "Hide the info panel",
		"panel.info.resize": "Info panel width",
		"panel.info.close": "Close the info panel",
		"panel.preview.title": "Preview",
		"panel.preview.show": "Show the preview",
		"panel.preview.hide": "Hide the preview",
		"panel.preview.resize": "Preview panel width",
		"panel.preview.close": "Close the preview panel",
		"place.home": "Home",
		"place.trash": "Trash",
		"place.tag": "Tag “{name}”",
		"side.label": "Places",
		"side.links": "Links",
		"side.tags": "Tags",
		"side.tagHidden": "{name}: invisible tag, its items are hidden elsewhere",
		"side.unlinkTitle": "Remove the link (the file stays)",
		"link.remove": "Remove the link to “{name}”",
		"column.name": "Name",
		"column.modified": "Modified",
		"column.deleted": "Deleted",
		"column.size": "Size",
		"column.type": "Type",
		"column.workspace": "Workspace",
		"column.origin": "Original location",
		"column.location": "Location",
		"column.resize": "Width of the “{name}” column",
		"column.resizeTitle": "Drag to resize, double-click to fit the content",
		"columns.menu": "Columns",
		"columns.fitAll": "Fit all columns to their content",
		"columns.reset": "Default columns",
		"tree.expand": "Show contents here",
		"tree.expandAll": "Show contents with all subfolders",
		"tree.collapse": "Hide contents",
		"tree.collapseAll": "Close all folders",
		"tree.expandTitle": "Show contents (Alt-click: with subfolders)",
		"tree.collapseTitle": "Hide contents",
		"tile.deleted": "Deleted: {date}",
		"tile.origin": "Original location: {place}",
		"tile.location": "Location: {place}",
		"tile.tags": "Tags: {names}",
		"trash.restoresTo": "Goes back to {place} when restored",
		"trash.keptForever": "Items stay until you delete them",
		"trash.keptDays": {
			one: "Deleted permanently after {count} day",
			other: "Deleted permanently after {count} days"
		},
		"type.folder": "Folder",
		"type.app": "App",
		"type.appLink": "Link to an app",
		"owner.unknown": "Unknown",
		"owner.shared": "Shared",
		"owner.removed": "{name} (deleted)",
		"owner.label": "Workspace: {name}",
		"count.items": {
			zero: "Empty",
			one: "{count} item",
			other: "{count} items"
		},
		"empty.noMatch": "No items match “{query}”",
		"empty.trash": "The trash is empty",
		"empty.tag": "No items have this tag. Add it from the right-click menu → Tag.",
		"empty.folder": "This folder is empty",
		"status.items": {
			one: "{count} item",
			other: "{count} items"
		},
		"status.selected": {
			one: "{count} selected",
			other: "{count} selected"
		},
		"status.tag": "All items with this tag",
		"status.tagHidden": "Invisible tag: these items are hidden elsewhere",
		"message.hiddenByTag": "“{name}” is hidden by an invisible tag",
		"message.restoreToOpen": "To open it, restore it (right-click → Restore)",
		"message.systemFolders": "System folders can’t be deleted",
		"error.notFile": "Not a file",
		"error.rename": "Can’t rename “{name}”",
		"error.createFolder": "Can’t create the folder",
		"error.createFile": "Can’t create the file",
		"error.delete": "Can’t delete",
		"error.folderNotFound": "Folder not found",
		"error.folderNotFoundText": "The folder to open no longer exists: showing {place} instead.",
		"error.tagNotFound": "Tag not found",
		"error.tagNotFoundText": "The tag to show no longer exists: showing {place} instead.",
		"toast.restored": "Restored “{name}” to {place}",
		"toast.restoredMany": "Restored {count} items to {place}",
		"toast.restoredManyPlaces": "Restored {count} items to {folders} folders",
		"toast.unlinked": "Link to “{name}” removed",
		"toast.linksAdded": {
			one: "Link added",
			other: "{count} links added"
		},
		"toast.trashed": {
			one: "Moved to the trash",
			other: "{count} items moved to the trash"
		},
		"confirm.purge": "Delete “{name}” permanently",
		"confirm.purgeMany": "Delete {count} items permanently",
		"confirm.emptyTrash": {
			one: "Delete the item in the trash permanently",
			other: "Delete all {count} items in the trash permanently"
		},
		"confirm.cancel": "Cancel",
		"menu.open": "Open",
		"menu.openMany": "Open {count} items",
		"menu.openWith": "Open with…",
		"menu.openInEditor": "Open in Editor",
		"menu.reveal": "Show in folder",
		"menu.unlink": "Remove the link",
		"menu.rename": "Rename",
		"menu.untag": "Remove the tag “{name}”",
		"menu.info": "Info",
		"menu.properties": "Properties…",
		"menu.delete": "Delete",
		"menu.deleteMany": "Delete {count} items",
		"menu.restore": "Restore",
		"menu.restoreMany": "Restore {count} items",
		"menu.restoreAll": "Restore all",
		"menu.purge": "Delete permanently…",
		"menu.emptyTrash": "Empty the trash…",
		"menu.manageTags": "Manage tags…",
		"menu.newFolder": "New folder",
		"menu.newTextFile": "New text file",
		"info.folderHint": "Nothing selected: here is the open folder.",
		"info.general": "General",
		"info.organization": "Organization",
		"info.attributes": "Attributes",
		"info.text": "Text",
		"info.items": "Items",
		"info.type": "Type",
		"info.types": "Types",
		"info.app": "App",
		"info.appMissing": "{id} (not installed)",
		"info.size": "Size",
		"info.bytesDetail": "{size} ({count} bytes)",
		"info.contents": "Contents",
		"info.contentsTotal": "{items}, {total} in all",
		"info.insideFolders": {
			one: "{count} item in the folders",
			other: "{count} items in the folders"
		},
		"info.deleted": "Deleted",
		"info.lastDeleted": "Last deleted",
		"info.origin": "Original location",
		"info.path": "Path",
		"info.location": "Location",
		"info.manyFolders": "{count} different folders",
		"info.created": "Created",
		"info.modified": "Modified",
		"info.oldest": "Oldest",
		"info.newest": "Newest",
		"info.workspace": "Workspace",
		"info.tags": "Tags",
		"info.common": "In common",
		"info.none": "None",
		"info.tagHidden": "{name} (invisible tag)",
		"info.tagKind": "Tag",
		"info.retention": "Retention",
		"info.visibility": "Visibility",
		"info.visible": "Visible",
		"info.invisible": "Invisible: its items are hidden elsewhere",
		"info.lines": "Lines",
		"info.words": "Words",
		"info.chars": "Characters",
		"info.folders": {
			one: "{count} folder",
			other: "{count} folders"
		},
		"info.files": {
			one: "{count} file",
			other: "{count} files"
		},
		"info.apps": {
			one: "{count} app",
			other: "{count} apps"
		},
		"note.system": "System item: it can’t be renamed or deleted",
		"note.private": "Private: visible only in its workspace",
		"note.hidden": "Hidden by an invisible tag",
		"note.linked": "In the sidebar (Links)",
		"selection.count": "{count} items selected",
		"preview.none": "Nothing selected",
		"preview.selectFile": "Select a file to see its contents",
		"preview.oneAtATime": "The preview shows one item at a time",
		"preview.trashed": "In the trash",
		"preview.restoreToSee": "Restore it to see its contents",
		"preview.loading": "Loading…",
		"preview.readError": "Can’t read the file",
		"preview.open": "Open",
		"preview.launch": "Launch",
		"preview.emptyFile": "Empty file",
		"preview.emptyFolder": "Empty folder",
		"preview.imageAlt": "Preview of {name}",
		"preview.unavailable": "No preview available",
		"preview.notText": "The file doesn’t contain text",
		"preview.contentsOf": "Contents of {name}",
		"preview.cut": "Showing the first {shown} of {total} characters: open the file to see all of it",
		"preview.childTitle": "{name} — double-click to open",
		"preview.appMissing": "App not installed",
		"preview.byApp": "Preview made by {app}"
	} },
	it: { strings: {
		"@name": "File Manager",
		"@description": "Sfoglia, cerca e organizza file e cartelle: tag, collegamenti, cestino, informazioni e anteprima.",
		"@commands.files.info.label": "Mostra o nascondi le informazioni",
		"@commands.files.preview.label": "Mostra o nascondi l’anteprima",
		"@entrypoints.main.params.folder.label": "Cartella",
		"@entrypoints.main.params.folder.description": "La cartella che mostra all’apertura",
		"toolbar.back": "Indietro (Alt ←)",
		"toolbar.forward": "Avanti (Alt →)",
		"toolbar.up": "Cartella superiore (Alt ↑)",
		"toolbar.path": "Percorso",
		"toolbar.search": "Cerca nella cartella",
		"toolbar.searchIn": "Cerca in {name}",
		"view.list": "Vista elenco",
		"view.grid": "Vista a icone",
		"view.thumbs": "Vista anteprime",
		"view.menu": "Vista",
		"list.label": "Contenuto della cartella",
		"list.more": "e altri {count}",
		"rename.label": "Nuovo nome",
		"create.folderName": "Nuova cartella",
		"create.fileName": "Nuovo file.txt",
		"panel.info.title": "Informazioni",
		"panel.info.show": "Mostra le informazioni",
		"panel.info.hide": "Nascondi le informazioni",
		"panel.info.resize": "Larghezza del pannello delle informazioni",
		"panel.info.close": "Chiudi il pannello delle informazioni",
		"panel.preview.title": "Anteprima",
		"panel.preview.show": "Mostra l’anteprima",
		"panel.preview.hide": "Nascondi l’anteprima",
		"panel.preview.resize": "Larghezza del pannello dell’anteprima",
		"panel.preview.close": "Chiudi il pannello dell’anteprima",
		"place.home": "Home",
		"place.trash": "Cestino",
		"place.tag": "Tag «{name}»",
		"side.label": "Risorse",
		"side.links": "Collegamenti",
		"side.tags": "Tag",
		"side.tagHidden": "{name}: tag invisibile, i suoi elementi sono nascosti altrove",
		"side.unlinkTitle": "Elimina il collegamento (il file resta)",
		"link.remove": "Elimina il collegamento a «{name}»",
		"column.name": "Nome",
		"column.modified": "Modificato",
		"column.deleted": "Eliminato",
		"column.size": "Dimensione",
		"column.type": "Tipo",
		"column.workspace": "Workspace",
		"column.origin": "Posizione originale",
		"column.location": "Posizione",
		"column.resize": "Larghezza della colonna «{name}»",
		"column.resizeTitle": "Trascina per ridimensionare, doppio clic per adattare al contenuto",
		"columns.menu": "Colonne",
		"columns.fitAll": "Adatta tutte le colonne al contenuto",
		"columns.reset": "Ripristina le colonne",
		"tree.expand": "Mostra il contenuto qui",
		"tree.expandAll": "Mostra il contenuto con tutte le sottocartelle",
		"tree.collapse": "Nascondi il contenuto",
		"tree.collapseAll": "Chiudi tutte le cartelle",
		"tree.expandTitle": "Mostra il contenuto (Alt+clic: anche le sottocartelle)",
		"tree.collapseTitle": "Nascondi il contenuto",
		"tile.deleted": "Eliminato: {date}",
		"tile.origin": "Posizione originale: {place}",
		"tile.location": "Posizione: {place}",
		"tile.tags": "Tag: {names}",
		"trash.restoresTo": "Ripristinando torna in {place}",
		"trash.keptForever": "Gli elementi restano finché non li elimini",
		"trash.keptDays": {
			one: "Eliminati definitivamente dopo {count} giorno",
			other: "Eliminati definitivamente dopo {count} giorni"
		},
		"type.folder": "Cartella",
		"type.app": "App",
		"type.appLink": "Collegamento a un’app",
		"owner.unknown": "Sconosciuto",
		"owner.shared": "Condiviso",
		"owner.removed": "{name} (eliminato)",
		"owner.label": "Workspace: {name}",
		"count.items": {
			zero: "Vuota",
			one: "{count} elemento",
			other: "{count} elementi"
		},
		"empty.noMatch": "Nessun elemento corrisponde a «{query}»",
		"empty.trash": "Il cestino è vuoto",
		"empty.tag": "Nessun elemento ha questo tag. Si assegna dal menu del tasto destro → Tag.",
		"empty.folder": "Questa cartella è vuota",
		"status.items": {
			one: "{count} elemento",
			other: "{count} elementi"
		},
		"status.selected": {
			one: "{count} selezionato",
			other: "{count} selezionati"
		},
		"status.tag": "Tutti gli elementi con questo tag",
		"status.tagHidden": "Tag invisibile: questi elementi sono nascosti altrove",
		"message.hiddenByTag": "«{name}» è nascosto da un tag invisibile",
		"message.restoreToOpen": "Per aprirlo, ripristinalo (clic destro → Ripristina)",
		"message.systemFolders": "Le cartelle di sistema non si possono eliminare",
		"error.notFile": "Non è un file",
		"error.rename": "Impossibile rinominare «{name}»",
		"error.createFolder": "Impossibile creare la cartella",
		"error.createFile": "Impossibile creare il file",
		"error.delete": "Impossibile eliminare",
		"error.folderNotFound": "Cartella non trovata",
		"error.folderNotFoundText": "La cartella da aprire non esiste più: al suo posto c’è {place}.",
		"error.tagNotFound": "Tag non trovato",
		"error.tagNotFoundText": "Il tag da mostrare non esiste più: al suo posto c’è {place}.",
		"toast.restored": "Ripristinato «{name}» in {place}",
		"toast.restoredMany": "Ripristinati {count} elementi in {place}",
		"toast.restoredManyPlaces": "Ripristinati {count} elementi in {folders} cartelle",
		"toast.unlinked": "Collegamento a «{name}» eliminato",
		"toast.linksAdded": {
			one: "Collegamento aggiunto",
			other: "{count} collegamenti aggiunti"
		},
		"toast.trashed": {
			one: "Spostato nel cestino",
			other: "{count} elementi spostati nel cestino"
		},
		"confirm.purge": "Elimina definitivamente «{name}»",
		"confirm.purgeMany": "Elimina definitivamente {count} elementi",
		"confirm.emptyTrash": {
			one: "Elimina definitivamente l’elemento nel cestino",
			other: "Elimina definitivamente tutti i {count} elementi nel cestino"
		},
		"confirm.cancel": "Annulla",
		"menu.open": "Apri",
		"menu.openMany": "Apri {count} elementi",
		"menu.openWith": "Apri con…",
		"menu.openInEditor": "Apri nell’Editor",
		"menu.reveal": "Mostra nella cartella",
		"menu.unlink": "Elimina il collegamento",
		"menu.rename": "Rinomina",
		"menu.untag": "Togli il tag «{name}»",
		"menu.info": "Informazioni",
		"menu.properties": "Proprietà…",
		"menu.delete": "Elimina",
		"menu.deleteMany": "Elimina {count} elementi",
		"menu.restore": "Ripristina",
		"menu.restoreMany": "Ripristina {count} elementi",
		"menu.restoreAll": "Ripristina tutto",
		"menu.purge": "Elimina definitivamente…",
		"menu.emptyTrash": "Svuota il cestino…",
		"menu.manageTags": "Gestisci i tag…",
		"menu.newFolder": "Nuova cartella",
		"menu.newTextFile": "Nuovo file di testo",
		"info.folderHint": "Nessun elemento selezionato: ecco la cartella aperta.",
		"info.general": "Generali",
		"info.organization": "Organizzazione",
		"info.attributes": "Attributi",
		"info.text": "Testo",
		"info.items": "Elementi",
		"info.type": "Tipo",
		"info.types": "Tipi",
		"info.app": "App",
		"info.appMissing": "{id} (non installata)",
		"info.size": "Dimensione",
		"info.bytesDetail": "{size} ({count} byte)",
		"info.contents": "Contenuto",
		"info.contentsTotal": "{items}, {total} in tutto",
		"info.insideFolders": {
			one: "{count} elemento nelle cartelle",
			other: "{count} elementi nelle cartelle"
		},
		"info.deleted": "Eliminato",
		"info.lastDeleted": "Ultima eliminazione",
		"info.origin": "Posizione originale",
		"info.path": "Percorso",
		"info.location": "Posizione",
		"info.manyFolders": "{count} cartelle diverse",
		"info.created": "Creato",
		"info.modified": "Modificato",
		"info.oldest": "Meno recente",
		"info.newest": "Più recente",
		"info.workspace": "Workspace",
		"info.tags": "Tag",
		"info.common": "In comune",
		"info.none": "Nessuno",
		"info.tagHidden": "{name} (tag invisibile)",
		"info.tagKind": "Tag",
		"info.retention": "Conservazione",
		"info.visibility": "Visibilità",
		"info.visible": "Visibile",
		"info.invisible": "Invisibile: i suoi elementi sono nascosti altrove",
		"info.lines": "Righe",
		"info.words": "Parole",
		"info.chars": "Caratteri",
		"info.folders": {
			one: "{count} cartella",
			other: "{count} cartelle"
		},
		"info.files": {
			one: "{count} file",
			other: "{count} file"
		},
		"info.apps": {
			one: "{count} app",
			other: "{count} app"
		},
		"note.system": "Di sistema: non si rinomina e non si elimina",
		"note.private": "Privata: si vede solo nel suo workspace",
		"note.hidden": "Nascosto da un tag invisibile",
		"note.linked": "Nella barra laterale (Collegamenti)",
		"selection.count": "{count} elementi selezionati",
		"preview.none": "Nessun elemento selezionato",
		"preview.selectFile": "Seleziona un file per vederne il contenuto",
		"preview.oneAtATime": "L’anteprima mostra un elemento alla volta",
		"preview.trashed": "Nel cestino",
		"preview.restoreToSee": "Ripristinalo per vederne il contenuto",
		"preview.loading": "Caricamento…",
		"preview.readError": "Impossibile leggere il file",
		"preview.open": "Apri",
		"preview.launch": "Avvia",
		"preview.emptyFile": "File vuoto",
		"preview.emptyFolder": "Cartella vuota",
		"preview.imageAlt": "Anteprima di {name}",
		"preview.unavailable": "Anteprima non disponibile",
		"preview.notText": "Il file non contiene testo",
		"preview.contentsOf": "Contenuto di {name}",
		"preview.cut": "Mostrati i primi {shown} caratteri su {total}: apri il file per vederlo tutto",
		"preview.childTitle": "{name} — doppio clic per aprire",
		"preview.appMissing": "App non installata",
		"preview.byApp": "Anteprima creata da {app}"
	} }
}), C = (e) => e.toLocaleString(u.locale), w = (e) => e.type === "folder" ? S("type.folder") : e.type === "app" ? S("type.app") : i(e.name).label, T = (e) => e.id === a.root ? S("place.home") : e.name, E = (e) => e.parent === a.root ? S("place.home") : a.path(e.parent);
function D(e) {
	let t = e.trashed.from;
	return a.exists(t) && t !== a.root ? a.path(t) : S("place.home");
}
function O(e) {
	let t = ie(e.workspace);
	return t ? t.removed ? S("owner.removed", { name: t.name }) : t.name : e.workspace ? S("owner.unknown") : S("owner.shared");
}
function Ce(e) {
	let t = ie(e.workspace), n = o("span", {
		class: "ws-owner-dot",
		"aria-hidden": "true"
	});
	return t && (n.style.background = t.color), o("span", {
		class: [
			"ws-owner",
			!t && "shared",
			t?.removed && "removed"
		].filter(Boolean).join(" "),
		title: S("owner.label", { name: O(e) })
	}, n, o("span", {}, O(e)));
}
function k(e) {
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
var A = (e) => S("count.items", {
	n: e,
	count: C(e)
});
function j(e) {
	return e.type === "folder" ? A(e.trashed ? e.inside : a.children(e.id).length) : e.type === "file" ? k(e.size ?? 0) : "—";
}
function M() {
	let e = d.get("trashRetention");
	return e <= 0 ? S("trash.keptForever") : S("trash.keptDays", {
		n: e,
		count: C(e)
	});
}
var N = (e) => new Date(e).toLocaleString(u.locale, {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit"
}), P = "files-panels", F = 720, we = class {
	open;
	width;
	constructor({ key: e, title: t, resizeLabel: n, closeLabel: r, width: i, open: a = !1, room: s, onLayout: l, signal: u }) {
		this.key = e, this.defaultWidth = i, this.room = s, this.onLayout = l;
		let d = p.get(P, {})?.[e];
		this.open = typeof d?.open == "boolean" ? d.open : a, this.width = Number.isFinite(d?.width) ? Te(d.width, 180, F) : i, this.split = o("div", {
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
		this.el.style.width = `${e}px`, this.split.setAttribute("aria-valuenow", e), this.split.setAttribute("aria-valuemax", Math.max(180, Math.min(F, this.room())));
	}
	resize(e, t = !0) {
		this.width = Math.round(Te(e, 180, Math.max(180, Math.min(F, this.room())))), t && this.#t(), this.onLayout();
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
		let e = p.get(P, {});
		p.set(P, {
			...e && typeof e == "object" ? e : {},
			[this.key]: {
				open: this.open,
				width: this.width
			}
		});
	}
}, Te = (e, t, n) => Math.max(t, Math.min(e, n)), I = 1e5, Ee = 5 << 20, L = 30, R = 200, z = (e) => e < 1024 ? k(e) : S("info.bytesDetail", {
	size: k(e),
	count: C(e)
});
function De(e) {
	let t = 0;
	for (let n of a.children(e)) t += n.type === "folder" ? De(n.id) : n.size ?? 0;
	return t;
}
var B = (e) => e.trashed ? e.bytes ?? 0 : e.type === "folder" ? De(e.id) : e.size ?? 0, Oe = (e) => e?.type === "file" && !e.trashed, ke = (e) => `${e.id}:${e.modified}:${e.size ?? 0}`;
function V(e) {
	let t = e.map((e) => m.get(e)).filter(Boolean);
	return t.length ? o("span", { class: "fm-chips" }, t.map((e) => o("span", {
		class: "fm-chip",
		title: e.visible ? e.name : S("info.tagHidden", { name: e.name })
	}, o("span", {
		class: "tag-dot",
		style: { background: e.color },
		"aria-hidden": "true"
	}), e.name))) : S("info.none");
}
var H = (e) => o("dl", { class: "fm-facts" }, e.filter(Boolean).flatMap(([e, t, n]) => [o("dt", {}, e), o("dd", { class: n }, t)])), U = (e, ...t) => o("section", { class: "fm-info-section" }, o("h6", {}, e), ...t);
function W(e, t, n) {
	return o("div", { class: "fm-info-head" }, o("span", { class: "fm-info-icon" }, e), o("div", { class: "fm-info-titles" }, o("div", {
		class: "fm-info-name",
		title: t
	}, t), n && o("div", { class: "fm-info-kind" }, n)));
}
function Ae({ nodes: e, place: t, text: n }) {
	return e.length > 1 ? Me(e) : e.length === 1 ? je(e[0], n) : t.trash ? Ne() : t.tag ? Pe(t.tag) : o("div", {}, o("p", { class: "fm-info-hint" }, S("info.folderHint")), je(t.node, n));
}
function je(e, t) {
	let { ext: n } = i(e.name), r = e.type === "app" ? v(e.app) : null, s = [[S("info.type"), e.type === "file" && n ? `${w(e)} (.${n})` : e.type === "app" ? S("type.appLink") : w(e)], e.type === "app" && [S("info.app"), r ? r.name : S("info.appMissing", { id: e.app })]];
	if (e.type === "file" && s.push([S("info.size"), z(e.size ?? 0)]), e.type === "folder") {
		let t = e.trashed ? null : a.children(e.id).length, n = e.trashed ? e.inside : a.count(e.id);
		s.push([S("info.contents"), t === null || n === t ? A(n) : S("info.contentsTotal", {
			items: A(t),
			total: C(n)
		})]), s.push([S("info.size"), z(B(e))]);
	}
	e.trashed ? s.push([S("info.deleted"), N(e.trashed.at)], [
		S("info.origin"),
		D(e),
		"mono"
	]) : s.push([
		S("info.path"),
		a.path(e.id),
		"mono"
	]), s.push([S("info.created"), N(e.created)], [S("info.modified"), N(e.modified)]);
	let c = [
		e.system && S("note.system"),
		e.private && S("note.private"),
		!e.trashed && a.isHidden(e.id) && S("note.hidden"),
		!e.trashed && x.has(e.id) && S("note.linked")
	].filter(Boolean), l = o("div", {}, W(y(e), T(e), w(e)), U(S("info.general"), H(s)), U(S("info.organization"), H([[S("info.workspace"), Ce(e)], [S("info.tags"), V(e.tags ?? [])]])), c.length ? U(S("info.attributes"), o("ul", { class: "fm-notes" }, c.map((e) => o("li", {}, e)))) : null);
	if (Oe(e) && (e.size ?? 0) <= Ee) {
		let n = o("dd", {}, "…"), r = o("dd", {}, "…"), i = o("dd", {}, "…");
		l.append(U(S("info.text"), o("dl", { class: "fm-facts" }, o("dt", {}, S("info.lines")), n, o("dt", {}, S("info.words")), r, o("dt", {}, S("info.chars")), i))), t(e).then((e) => {
			n.textContent = C(e ? e.split("\n").length : 0), r.textContent = C(e.trim() ? e.trim().split(/\s+/).length : 0), i.textContent = C([...e].length);
		}, () => {
			n.textContent = r.textContent = i.textContent = "—";
		});
	}
	return l;
}
function Me(e) {
	let t = (t) => e.filter((e) => e.type === t).length, n = t("folder"), r = t("file"), i = t("app"), s = [
		n && S("info.folders", {
			n,
			count: C(n)
		}),
		r && S("info.files", {
			n: r,
			count: C(r)
		}),
		i && S("info.apps", {
			n: i,
			count: C(i)
		})
	].filter(Boolean).join(", "), c = e.reduce((e, t) => e + (t.type === "folder" ? t.trashed ? t.inside : a.count(t.id) : 0), 0), l = /* @__PURE__ */ new Map();
	for (let t of e) l.set(w(t), (l.get(w(t)) ?? 0) + 1);
	let u = new Set(e.map((e) => e.parent)), d = e.map((e) => e.modified), f = [...new Set(e.map(O))], p = [...new Set(e.flatMap((e) => e.tags ?? []))], m = p.filter((t) => e.every((e) => e.tags?.includes(t))), h = e.every((e) => e.trashed), g = o("span", { class: "fm-info-stack" }, e.slice(0, 3).map((e) => o("span", {}, y(e))));
	return o("div", {}, W(g, S("selection.count", { count: C(e.length) }), s), U(S("info.general"), H([
		[S("info.size"), z(e.reduce((e, t) => e + B(t), 0))],
		c > 0 && [S("info.contents"), S("info.insideFolders", {
			n: c,
			count: C(c)
		})],
		[S("info.types"), [...l].sort((e, t) => t[1] - e[1]).map(([e, t]) => `${e} ${C(t)}`).join(" · ")],
		!h && [
			S("info.location"),
			u.size === 1 ? E(e[0]) : S("info.manyFolders", { count: C(u.size) }),
			u.size === 1 ? "mono" : null
		],
		[S("info.oldest"), N(Math.min(...d))],
		[S("info.newest"), N(Math.max(...d))]
	])), U(S("info.organization"), H([
		[S("info.workspace"), f.join(", ")],
		[S("info.tags"), V(p)],
		p.length > 0 && [S("info.common"), V(m)]
	])), U(S("info.items"), o("ul", { class: "fm-names" }, e.slice(0, L).map((e) => o("li", { title: e.name }, o("span", { class: "fm-icon" }, y(e)), o("span", {}, e.name))), e.length > L ? o("li", { class: "more" }, S("list.more", { count: C(e.length - L) })) : null)));
}
function Ne() {
	let e = a.trashed(), t = e.reduce((e, t) => e + 1 + t.inside, 0);
	return o("div", {}, W(o("span", { class: "fm-info-glyph" }, c("trash")), S("place.trash"), A(e.length)), U(S("info.general"), H([
		[S("info.contents"), e.length ? S("info.contentsTotal", {
			items: A(e.length),
			total: C(t)
		}) : A(0)],
		[S("info.size"), z(e.reduce((e, t) => e + (t.bytes ?? 0), 0))],
		e.length > 0 && [S("info.lastDeleted"), N(e[0].trashed.at)],
		[S("info.retention"), M()]
	])));
}
function Pe(e) {
	let t = a.tagged(e.id);
	return o("div", {}, W(o("span", {
		class: "tag-dot fm-info-tag",
		style: { background: e.color },
		"aria-hidden": "true"
	}), e.name, S("info.tagKind")), U(S("info.general"), H([
		[S("info.items"), A(t.length)],
		[S("info.size"), z(t.reduce((e, t) => e + B(t), 0))],
		[S("info.visibility"), e.visible ? S("info.visible") : S("info.invisible")]
	])));
}
var Fe = class {
	#e = null;
	#t = null;
	constructor(e, { text: t, open: n }) {
		this.body = e, this.text = t, this.open = n;
	}
	update(e) {
		let t = e.length === 1 ? e[0] : null, n = t ? `${ke(t)}:${t.name}:${t.type === "folder" && !t.trashed ? a.children(t.id).map((e) => e.id + e.name).join() : ""}` : `${e.length}`;
		if (n === this.#e) return;
		if (this.#e = n, this.#u(), !t) return this.#l(e.length ? G("list", S("selection.count", { count: C(e.length) }), S("preview.oneAtATime")) : G("file", S("preview.none"), S("preview.selectFile")));
		if (t.trashed) return this.#l(this.#n(t), G("trash", S("preview.trashed"), S("preview.restoreToSee")));
		if (t.type === "folder") return this.#l(this.#n(t), this.#s(t));
		if (t.type === "app") return this.#l(this.#n(t), this.#c(t));
		let r = o("div", { class: "fm-preview-wait" }, S("preview.loading"));
		this.#l(this.#n(t), r);
		let i = (e) => {
			this.#e === n && r.replaceWith(e());
		};
		this.#a(t).then((e) => {
			if (this.#e === n) return e ? i(() => this.#o(t, e)) : this.text(t).then((e) => i(() => this.#r(t, e)));
		}).catch((e) => i(() => G("x", S("preview.readError"), e?.message ?? "")));
	}
	destroy() {
		this.#u();
	}
	#n(e) {
		let t = e.trashed ? null : e.type === "app" ? S("preview.launch") : S("preview.open");
		return o("div", { class: "fm-preview-head" }, o("span", { class: "fm-icon" }, y(e)), o("span", {
			class: "fm-preview-name",
			title: e.name
		}, T(e)), t && o("button", {
			class: "fm-preview-open",
			type: "button",
			onclick: () => this.open(e)
		}, t));
	}
	#r(e, t) {
		if (!t) return G("file", S("preview.emptyFile"), "");
		let { ext: n } = i(e.name);
		return n === "svg" && /^\s*(<\?xml[^>]*>\s*)?(<!--[\s\S]*?-->\s*)*<svg[\s>]/i.test(t) ? (this.#t = URL.createObjectURL(new Blob([t], { type: "image/svg+xml" })), o("div", { class: "fm-preview-image" }, o("img", {
			src: this.#t,
			alt: S("preview.imageAlt", { name: e.name })
		}))) : t.slice(0, 8e3).includes("\0") ? G("file", S("preview.unavailable"), S("preview.notText")) : this.#i(e, t);
	}
	#i(e, t, n = null) {
		let r = t.length > I;
		return o("div", { class: "fm-preview-textwrap" }, o("pre", {
			class: "fm-preview-text",
			tabindex: "0",
			"aria-label": S("preview.contentsOf", { name: e.name })
		}, r ? t.slice(0, I) : t), r ? o("div", { class: "fm-preview-note" }, S("preview.cut", {
			shown: C(I),
			total: C(t.length)
		})) : null, n);
	}
	#a(e) {
		return typeof _.filePreview == "function" ? _.filePreview(e).catch((t) => (console.warn(`[files] anteprima di ${e.name}:`, t), null)) : Promise.resolve(null);
	}
	#o(e, t) {
		let n = o("div", { class: "fm-preview-note" }, [S("preview.byApp", { app: v(t.app)?.name ?? t.app }), t.note].filter(Boolean).join(" · "));
		if (typeof t.text == "string") return t.text ? this.#i(e, t.text, n) : G("file", S("preview.emptyFile"), "");
		let r;
		return t.image instanceof Blob ? (this.#t = URL.createObjectURL(t.image), r = o("div", { class: "fm-preview-image" }, o("img", {
			src: this.#t,
			alt: S("preview.imageAlt", { name: e.name })
		}))) : (r = o("iframe", {
			class: "fm-preview-frame",
			sandbox: "",
			referrerpolicy: "no-referrer",
			title: S("preview.contentsOf", { name: e.name })
		}), r.srcdoc = t.html), o("div", { class: "fm-preview-textwrap" }, r, n);
	}
	#s(e) {
		let t = a.children(e.id);
		if (!t.length) return G("folder", S("preview.emptyFolder"), "");
		let n = {
			folder: 0,
			file: 1,
			app: 1
		};
		return t.sort((e, t) => n[e.type] - n[t.type] || e.name.localeCompare(t.name, u.locale, { numeric: !0 })), o("ul", {
			class: "fm-preview-list",
			"aria-label": S("preview.contentsOf", { name: e.name })
		}, t.slice(0, R).map((e) => o("li", {
			title: S("preview.childTitle", { name: e.name }),
			ondblclick: () => this.open(e)
		}, o("span", { class: "fm-icon" }, y(e)), o("span", { class: "fm-label" }, e.name))), t.length > R ? o("li", { class: "more" }, S("list.more", { count: C(t.length - R) })) : null);
	}
	#c(e) {
		let t = v(e.app);
		return t ? o("div", { class: "fm-preview-app" }, r(t), o("strong", {}, t.name)) : G("x", S("preview.appMissing"), e.app);
	}
	#l(...e) {
		this.body.replaceChildren(...e);
	}
	#u() {
		this.#t && URL.revokeObjectURL(this.#t), this.#t = null;
	}
};
function G(e, t, n) {
	return o("div", { class: "fm-preview-empty" }, c(e), o("strong", {}, t), n ? o("span", {}, n) : null);
}
// src/files/columns.js
var Ie = "files-columns", Le = 1600, Re = 160, K = {
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
		let e = p.get(Ie, {}), t = e && typeof e.widths == "object" ? e.widths : {};
		for (let [e, n] of Object.entries(t ?? {})) (Object.hasOwn(K, e) || e === "name") && Number.isFinite(n) && (this.widths[e] = Be(Math.round(n), 48, Le));
		Array.isArray(e?.hidden) && e.hidden.filter((e) => Object.hasOwn(K, e)).forEach((e) => this.hidden.add(e));
	}
	shown(e) {
		return e.filter((e) => e.key === "name" || !this.hidden.has(e.key));
	}
	width(e) {
		return this.widths[e] ?? K[e];
	}
	layout(e, t = null) {
		let n = this.widths.name == null && t !== "name", r = e.map((e) => e.key === t ? "max-content" : e.key === "name" && n ? `minmax(${Re}px, 1fr)` : `${this.width(e.key)}px`);
		n || r.push("minmax(0, 1fr)");
		let i = e.reduce((e, r) => e + (r.key === t ? 0 : r.key === "name" && n ? Re : this.width(r.key)), 0);
		return {
			template: r.join(" "),
			min: `${i}px`
		};
	}
	resize(e, t, n = !0) {
		this.widths[e] = Be(Math.round(t), 48, Le), n && this.save();
	}
	setHidden(e, t) {
		e !== "name" && (t ? this.hidden.add(e) : this.hidden.delete(e), this.save());
	}
	reset() {
		this.widths = {}, this.hidden.clear(), this.save();
	}
	save() {
		p.set(Ie, {
			widths: this.widths,
			hidden: [...this.hidden]
		});
	}
}, Be = (e, t, n) => Math.max(t, Math.min(e, n)), Ve = 260, q = "files-view", He = [
	"list",
	"grid",
	"thumbs"
], Ue = 112, We = {
	grid: 92,
	thumbs: 140
}, J = a.trashRoot, Ge = () => [
	{
		key: "name",
		label: S("column.name")
	},
	{
		key: "modified",
		label: S("column.modified")
	},
	{
		key: "size",
		label: S("column.size"),
		num: !0
	},
	{
		key: "type",
		label: S("column.type")
	},
	{
		key: "workspace",
		label: S("column.workspace")
	}
], Ke = () => [
	{
		key: "name",
		label: S("column.name")
	},
	{
		key: "deleted",
		label: S("column.deleted")
	},
	{
		key: "size",
		label: S("column.size"),
		num: !0
	},
	{
		key: "type",
		label: S("column.type")
	},
	{
		key: "origin",
		label: S("column.origin")
	}
], Y = "tag:", qe = () => [
	{
		key: "name",
		label: S("column.name")
	},
	{
		key: "location",
		label: S("column.location")
	},
	{
		key: "type",
		label: S("column.type")
	},
	{
		key: "workspace",
		label: S("column.workspace")
	}
], X = (e) => typeof e == "string" && e.startsWith(Y) ? m.get(e.slice(4)) : null;
function Z(e) {
	return e?.trash || e?.folder === J ? J : typeof e?.tag == "string" && m.get(e.tag) ? Y + e.tag : X(e?.folder) || e?.folder && a.exists(e.folder) ? e.folder : null;
}
function Q(e) {
	return Z(e) ? null : typeof e?.tag == "string" || typeof e?.folder == "string" && e.folder.startsWith(Y) ? "tag" : e?.folder ? "folder" : null;
}
function Je({ args: e } = {}) {
	let t = new n({
		title: S("@name"),
		icon: "folder",
		width: 1e3,
		height: 520,
		minWidth: 520,
		minHeight: 300
	}), r = new Ye(t);
	r.go(Z(e) ?? a.root, !1);
	let i = Q(e);
	return i && requestAnimationFrame(() => r.notFound(i)), t.on("launch", (e) => {
		let t = Z(e);
		t ? r.go(t) : Q(e) && r.notFound(Q(e));
	}), t.getState = () => ({ folder: r.folder }), t;
}
var $ = (e) => String(e).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(), Ye = class {
	folder = a.root;
	#e = [];
	#t = [];
	#n = He.includes(p.get(q)) ? p.get(q) : "list";
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
	#m = {
		defaults: [],
		desk: null
	};
	#h = {
		key: null,
		text: null
	};
	history = new t();
	constructor(e) {
		this.win = e;
		let t = (e, t, n) => o("button", {
			class: "fm-btn",
			type: "button",
			title: t,
			"aria-label": t,
			onclick: n
		}, c(e));
		this.backBtn = t("arrowLeft", S("toolbar.back"), () => this.back()), this.forwardBtn = t("arrowRight", S("toolbar.forward"), () => this.forward()), this.upBtn = t("arrowUp", S("toolbar.up"), () => this.up()), this.crumbs = o("nav", {
			class: "fm-path",
			"aria-label": S("toolbar.path")
		}), this.newBtn = t("folderPlus", S("menu.newFolder"), () => this.create("folder")), this.listBtn = t("list", S("view.list"), () => this.setView("list")), this.gridBtn = t("grid", S("view.grid"), () => this.setView("grid")), this.thumbsBtn = t("image", S("view.thumbs"), () => this.setView("thumbs")), this.previewBtn = t("sidebar", "", () => this.preview.toggle()), this.infoBtn = t("info", "", () => this.info.toggle()), this.search = o("input", {
			type: "text",
			spellcheck: "false",
			"aria-label": S("toolbar.search")
		}), this.search.addEventListener("input", () => {
			this.#a = $(this.search.value.trim()), this.render();
		}), this.search.addEventListener("keydown", (e) => {
			e.key === "Escape" && this.search.value && (e.stopPropagation(), this.search.value = "", this.#a = "", this.render()), e.key === "ArrowDown" && (e.preventDefault(), this.list.focus());
		}), this.side = o("aside", {
			class: "fm-side",
			"aria-label": S("side.label")
		}), this.list = o("div", {
			class: "fm-list",
			role: "listbox",
			tabindex: "0",
			"aria-multiselectable": "true",
			"aria-label": S("list.label")
		}), this.statusLeft = o("span"), this.statusRight = o("span", { class: "fm-status-right" });
		let n = (t, n, r, i) => new we({
			key: t,
			...n,
			width: r,
			open: i,
			signal: e.signal,
			room: () => this.#v() - (t === "info" ? this.preview : this.info).shown,
			onLayout: () => {
				this.#y(), this.#g();
			}
		});
		this.preview = n("preview", {
			title: S("panel.preview.title"),
			resizeLabel: S("panel.preview.resize"),
			closeLabel: S("panel.preview.close")
		}, 300, !1), this.info = n("info", {
			title: S("panel.info.title"),
			resizeLabel: S("panel.info.resize"),
			closeLabel: S("panel.info.close")
		}, 260, !0), this.previewView = new Fe(this.preview.body, {
			text: (e) => this.#_(e),
			open: (e) => this.open(e)
		}), this.main = o("div", { class: "fm" }, this.side, o("div", { class: "fm-main" }, this.list, o("div", { class: "fm-status" }, this.statusLeft, this.statusRight)), this.preview.el, this.info.el), e.body.append(o("div", { class: "fm-toolbar" }, this.backBtn, this.forwardBtn, this.upBtn, this.crumbs, this.newBtn, o("span", { class: "fm-sep" }), this.listBtn, this.gridBtn, this.thumbsBtn, o("span", { class: "fm-sep" }), this.previewBtn, this.infoBtn, o("label", { class: "fm-search" }, c("search"), this.search)), this.main);
		let r = new ResizeObserver(() => this.#y());
		r.observe(this.main), this.#U(), oe(this.list, { folder: () => this.inTrash || this.inTag ? null : this.folder }), this.gap = o("div", {
			class: "fm-gap",
			"aria-hidden": "true"
		}), oe(this.side, { target: (e, t, n, r) => this.#w(e, t, n, r) });
		let i = a.on("change", (e) => this.#ee(e)), l = x.on("change", () => {
			this.#Y(this.folder) && this.render();
		}), u = a.on("scope", () => {
			this.#Y(this.folder) && this.render();
		}), d = fe(() => {
			this.#Y(this.folder) && this.render();
		}), f = a.on("trash", () => {
			this.inTrash && (this.#p = "", this.render());
		}), p = m.on("change", () => {
			if (this.folder.startsWith?.(Y) && !this.inTag) return this.go(a.root, !1);
			this.#Y(this.folder) && this.render();
		}), h = ne({
			isActive: () => e.active,
			selectionSize: () => this.#l.size,
			open: () => this.openSelected(),
			rename: () => this.rename([...this.#l][0]),
			remove: () => this.remove([...this.#l]),
			selectAll: () => this.#H(this.#o.map((e) => e.id)),
			deselect: () => this.#H([])
		}), g = s.attach(e.el, this.history), _ = [se("files.info", {
			isActive: () => e.active,
			run: () => this.info.toggle()
		}), se("files.preview", {
			isActive: () => e.active,
			run: () => this.preview.toggle()
		})];
		e.on("destroy", () => {
			i(), l(), u(), d(), f(), p(), h(), g(), _.forEach((e) => e()), r.disconnect(), this.previewView.destroy();
		});
	}
	get inTrash() {
		return this.folder === J;
	}
	get inTag() {
		return X(this.folder);
	}
	get tree() {
		return this.#n === "list" && !this.inTrash;
	}
	go(e, t = !0) {
		if (e !== J && !X(e) && a.get(e)?.type !== "folder") return;
		t && e !== this.folder && (this.#e.push(this.folder), this.#t = []);
		let n = this.folder;
		this.folder = e, this.#l.clear(), this.#f = null, this.#p = "", this.search.value = "", this.#a = "";
		let r = a.ancestors(n).find((t) => t.parent === e);
		this.#d = r?.id ?? null, r && this.#l.add(r.id), this.#u = this.#d, this.render(), this.list.scrollTop = 0;
	}
	reveal(e) {
		let t = a.get(e);
		t && (this.go(t.parent), a.isHidden(e) ? this.#Q(S("message.hiddenByTag", { name: t.name })) : this.#H([e], e));
	}
	back() {
		this.#Z(this.#e, this.#t);
	}
	forward() {
		this.#Z(this.#t, this.#e);
	}
	up() {
		let e = a.get(this.folder)?.parent;
		e && this.go(e);
	}
	setView(e) {
		this.#n = e, p.set(q, e), this.render();
	}
	open(e) {
		if (e.type === "folder") return this.go(e.id);
		if (e.type === "app") return b(e.app);
		pe(e);
	}
	openSelected() {
		if (this.inTrash) return this.#Q(S("message.restoreToOpen"));
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
				name: S(e === "folder" ? "create.folderName" : "create.fileName")
			});
		} catch (t) {
			this.#$(S(e === "folder" ? "error.createFolder" : "error.createFile"), t.message);
			return;
		}
		this.#H([t.id]), this.rename(t.id, !0);
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
				ge(t ? null : this.history, e, s);
			} catch (t) {
				this.#$(S("error.rename", { name: n.name }), t.message, ["retry", "cancel"]).then((t) => {
					t === "retry" && a.exists(e) && this.rename(e);
				});
			}
			t && me(this.history, e), this.render(), this.list.focus();
		};
		r.addEventListener("keydown", (e) => {
			e.stopPropagation(), e.key === "Enter" && (e.preventDefault(), s(!0)), e.key === "Escape" && (e.preventDefault(), s(!1));
		}), r.addEventListener("blur", () => s(!0));
	}
	setOpen(e, t, n = !1) {
		let r = [e];
		if (n) for (let e = 0; e < r.length; e++) r.push(...a.children(r[e]).filter((e) => e.type === "folder").map((e) => e.id));
		if (r.forEach((e) => t ? this.#s.add(e) : this.#s.delete(e)), !t) {
			let t = (t) => t != null && t !== e && a.isInside(t, e);
			t(this.#d) && (this.#d = e), t(this.#u) && (this.#u = e), [...this.#l].some(t) && (this.#l = new Set([...this.#l].filter((e) => !t(e)).concat(e)));
		}
		this.render();
	}
	remove(e) {
		if (this.inTrash) return this.purge(e);
		let t = e.filter((e) => !a.get(e)?.system);
		if (!t.length) return void this.#$(S("error.delete"), S("message.systemFolders"));
		let { x: n, y: r } = this.#X(t[0]);
		re(t, n, r, this.history);
	}
	restore(e) {
		let t = _e(this.history, e);
		if (!t.length) return;
		let n = [...new Set(t.map((e) => e.parent === a.root ? S("place.home") : a.path(e.parent)))], r = C(t.length);
		h(t.length === 1 ? S("toast.restored", {
			name: a.get(t[0].id).name,
			place: n[0]
		}) : n.length === 1 ? S("toast.restoredMany", {
			count: r,
			place: n[0]
		}) : S("toast.restoredManyPlaces", {
			count: r,
			folders: C(n.length)
		}));
	}
	purge(e) {
		let t = this.#o.filter((t) => e.includes(t.id));
		if (!t.length) return;
		let n = t.length === 1 ? S("confirm.purge", { name: t[0].name }) : S("confirm.purgeMany", { count: C(t.length) }), { x: r, y: i } = this.#X(t[0].id);
		l(r, i, [{
			label: n,
			icon: "trash",
			danger: !0,
			action: () => a.purge(t.map((e) => e.id))
		}, {
			label: S("confirm.cancel"),
			icon: "x",
			action: () => {}
		}]);
	}
	empty(e, t) {
		let n = a.trashed().length;
		n && l(e, t, [{
			label: S("confirm.emptyTrash", {
				n,
				count: C(n)
			}),
			icon: "trash",
			danger: !0,
			action: () => a.purgeTrash()
		}, {
			label: S("confirm.cancel"),
			icon: "x",
			action: () => {}
		}]);
	}
	render() {
		let e = this.inTag, t = this.inTrash ? {
			id: J,
			name: S("place.trash"),
			parent: null
		} : e ? {
			id: this.folder,
			name: S("place.tag", { name: e.name }),
			parent: null
		} : a.get(this.folder);
		if (!t) return;
		this.win.setTitle(T(t), S("@name")), this.#b(t), this.#x();
		let n = this.inTrash ? a.trashed() : e ? a.tagged(e.id) : a.children(this.folder);
		this.#c.clear(), this.#o = this.#F(n);
		let r = new Set(this.#o.map((e) => e.id));
		this.#l = new Set([...this.#l].filter((e) => r.has(e))), r.has(this.#d) || (this.#d = this.#o[0]?.id ?? null);
		let i = this.list.scrollTop;
		this.list.classList.toggle("grid", this.#n !== "list"), this.list.classList.toggle("thumbs", this.#n === "thumbs"), this.list.classList.toggle("tree", this.tree), this.list.setAttribute("role", this.tree ? "tree" : "listbox"), this.#o.length ? this.#n === "list" ? (this.#D(), this.list.replaceChildren(this.#M(), ...this.#o.map((e) => this.#N(e)))) : this.list.replaceChildren(...this.#o.map((e) => this.#R(e))) : this.list.replaceChildren(o("div", { class: "fm-empty" }, this.#a ? S("empty.noMatch", { query: this.search.value.trim() }) : this.inTrash ? S("empty.trash") : S(e ? "empty.tag" : "empty.folder"))), this.list.scrollTop = i, this.list.setAttribute("aria-activedescendant", this.#d ? `fm-${this.#d}` : "");
		let s = n.length, c = this.#l.size;
		this.statusLeft.textContent = S("status.items", {
			n: s,
			count: C(s)
		}) + (c ? ` · ${S("status.selected", {
			n: c,
			count: C(c)
		})}` : ""), this.statusRight.textContent = this.#p || (this.inTrash ? M() : e ? e.visible ? S("status.tag") : S("status.tagHidden") : a.path(this.folder)), this.statusRight.classList.toggle("msg", !!this.#p), this.#g();
	}
	#g() {
		let e = [[
			this.previewBtn,
			this.preview,
			"files.preview",
			S("panel.preview.show"),
			S("panel.preview.hide")
		], [
			this.infoBtn,
			this.info,
			"files.info",
			S("panel.info.show"),
			S("panel.info.hide")
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
			r.replaceChildren(Ae({
				nodes: t,
				place: n,
				text: (e) => this.#_(e)
			})), r.scrollTop = i;
		}
	}
	#_(e) {
		if (!Oe(e)) return Promise.reject(Error(S("error.notFile")));
		let t = ke(e);
		return this.#h.key !== t && (this.#h = {
			key: t,
			text: a.read(e.id)
		}), this.#h.text;
	}
	#v() {
		return this.main.clientWidth - this.side.offsetWidth - Ve;
	}
	#y() {
		let e = [this.preview, this.info].filter((e) => e.open);
		if (!e.length || !this.main.isConnected) return;
		let t = e.reduce((e, t) => e + t.width, 0), n = Math.min(1, Math.max(0, this.#v()) / t);
		e.forEach((e) => e.show(Math.max(180, Math.floor(e.width * n))));
	}
	#b(e) {
		this.backBtn.disabled = !this.#e.some((e) => this.#Y(e)), this.forwardBtn.disabled = !this.#t.some((e) => this.#Y(e)), this.upBtn.disabled = !e.parent, this.newBtn.disabled = this.inTrash || !!this.inTag;
		for (let [e, t] of [
			[this.listBtn, "list"],
			[this.gridBtn, "grid"],
			[this.thumbsBtn, "thumbs"]
		]) e.classList.toggle("on", this.#n === t), e.setAttribute("aria-pressed", String(this.#n === t));
		this.search.placeholder = S("toolbar.searchIn", { name: T(e) });
		let t = this.inTrash || this.inTag ? [e] : a.ancestors(this.folder);
		this.crumbs.replaceChildren(...t.flatMap((e, n) => {
			let r = n === t.length - 1 ? o("span", {
				class: "fm-crumb current",
				"aria-current": "page"
			}, T(e)) : o("button", {
				class: "fm-crumb",
				type: "button",
				onclick: () => this.go(e.id)
			}, T(e));
			return a.exists(e.id) && le(r, e), n ? [o("span", {
				class: "fm-crumb-sep",
				"aria-hidden": "true"
			}, "›"), r] : [r];
		}));
	}
	#x() {
		let e = a.children(a.root), t = new Set(a.ancestors(this.folder).map((e) => e.id)), n = [{
			key: "root",
			id: a.root,
			name: S("place.home"),
			glyph: "home"
		}, ...te.map((t) => ({
			...t,
			id: e.find((e) => e.name === t.name && e.system)?.id,
			glyph: t.icon
		})).filter((e) => e.id).map((e) => ({
			...e,
			key: e.name === ee ? "desk" : e.id
		}))], r = this.inTrash || this.inTag ? this.folder : [...n].reverse().find((e) => t.has(e.id))?.id, i = (e) => o("button", {
			class: e.id === r ? "fm-place on" : "fm-place",
			type: "button",
			"aria-current": e.id === r ? "true" : null,
			onclick: () => this.go(e.id)
		}, c(e.glyph), o("span", {}, e.name)), s = (e) => {
			let t = Y + e.id;
			return o("button", {
				class: t === r ? "fm-place fm-tag on" : "fm-place fm-tag",
				type: "button",
				"aria-current": t === r ? "true" : null,
				title: e.visible ? e.name : S("side.tagHidden", { name: e.name }),
				onclick: () => this.go(t)
			}, o("span", {
				class: "tag-dot",
				style: { background: e.color },
				"aria-hidden": "true"
			}), o("span", {}, e.name), e.visible ? null : c("eyeOff"));
		}, u = m.list(), d = n.map((e) => e.key);
		this.#m = {
			defaults: d,
			desk: n.find((e) => e.key === "desk")?.id
		};
		let f = (e, t, { node: n, folder: r } = {}) => (t.dataset.entry = e, r && (t.dataset.folder = r), t.addEventListener("pointerdown", (e) => {
			e.button === 0 && !e.target.closest(".fm-link-x") && ae(e, {
				ids: [n],
				stack: this.history
			});
		}), t), p = (e) => {
			let t = e.id === this.folder, n = () => this.#S(e), r = o("button", {
				class: t ? "fm-place fm-link on" : "fm-place fm-link",
				type: "button",
				"aria-current": t ? "true" : null,
				title: `${E(e)} › ${e.name}`,
				onclick: () => this.open(e)
			}, o("span", { class: "fm-link-icon" }, y(e)), o("span", {}, e.name));
			r.addEventListener("contextmenu", (t) => {
				t.preventDefault(), l(t.clientX, t.clientY, [
					{
						label: S("menu.open"),
						icon: "open",
						action: () => this.open(e)
					},
					{
						label: S("menu.reveal"),
						icon: "folderOpen",
						action: () => this.reveal(e.id)
					},
					"-",
					{
						label: S("menu.unlink"),
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
				title: S("side.unlinkTitle"),
				"aria-label": S("link.remove", { name: e.name }),
				onclick: n
			}, c("x"));
			return f(e.id, o("div", { class: "fm-link-row" }, r, i), {
				node: e.id,
				folder: e.type === "folder" ? e.id : null
			});
		}, h = (e) => {
			let t = n.find((t) => t.key === e);
			if (t) return f(e, i(t), {
				node: t.id,
				folder: t.id
			});
			let r = a.get(e);
			return r ? p(r) : [];
		}, g = i({
			id: J,
			name: S("place.trash"),
			glyph: "trash"
		});
		g.dataset.trash = "", this.side.replaceChildren(o("section", {
			class: "fm-side-links",
			"aria-label": S("side.links")
		}, o("h6", {}, S("side.links")), ...x.arrange(d).flatMap(h)), ...u.length ? [o("h6", {}, S("side.tags")), ...u.map(s)] : [], o("hr", { class: "fm-side-sep" }), g, this.gap);
	}
	#S(e) {
		let { defaults: t } = this.#m, n = x.arrange(t).indexOf(e.id);
		n < 0 || (x.remove(e.id), this.history.push({
			label: S("link.remove", { name: e.name }),
			undo: () => x.place([e.id], n, t),
			redo: () => x.remove(e.id)
		}), h(S("toast.unlinked", { name: e.name })), this.list.focus());
	}
	#C(e) {
		return e === a.root ? "root" : e === this.#m.desk ? "desk" : a.exists(e) ? e : null;
	}
	#w(e, t, n, r) {
		let i = e?.closest?.("[data-trash]");
		if (i) return r.some((e) => !a.get(e)?.system) ? {
			el: i,
			run: (e, t) => this.#T(r, t)
		} : null;
		let o = this.side.querySelector(".fm-side-links");
		if (!o?.contains(e)) return null;
		let s = [...o.querySelectorAll(":scope > [data-entry]")], c = e.closest("[data-entry]");
		if (c && s.includes(c)) {
			let e = c.getBoundingClientRect(), t = Math.min(8, e.height / 4), { folder: i } = c.dataset;
			if (i && n > e.top + t && n < e.bottom - t) {
				let e = ue(r, i);
				return e && {
					el: c,
					run: (t, n) => de(n, e, i)
				};
			}
		}
		let l = s.findIndex((e) => {
			let t = e.getBoundingClientRect();
			return n < t.top + t.height / 2;
		});
		l < 0 && (l = s.length);
		let u = [...new Set(r.map((e) => this.#C(e)).filter(Boolean))], { defaults: d } = this.#m;
		if (!x.changes(u, l, d)) return null;
		let f = this.side.getBoundingClientRect(), p = l < s.length ? s[l].getBoundingClientRect().top : s[s.length - 1].getBoundingClientRect().bottom;
		return this.gap.style.top = `${p - f.top + this.side.scrollTop}px`, {
			el: this.gap,
			run: () => {
				let e = x.place(u, l, d);
				e && h(S("toast.linksAdded", {
					n: e,
					count: C(e)
				}));
			}
		};
	}
	#T(e, t) {
		let n = e.filter((e) => !a.get(e)?.system).length;
		he(t, e), h(S("toast.trashed", {
			n,
			count: C(n)
		}));
	}
	#E() {
		return (this.inTrash ? Ke : this.inTag ? qe : Ge)();
	}
	#D(e = null) {
		let { template: t, min: n } = this.#i.layout(this.#i.shown(this.#E()), e);
		this.list.style.setProperty("--fm-cols", t), this.list.style.setProperty("--fm-min", n);
	}
	#O(e) {
		let t = this.list.querySelectorAll(`[data-col="${e}"]`);
		if (!t.length) return;
		this.#D(e);
		let n = 48;
		for (let e of t) n = Math.max(n, e.offsetWidth + 1);
		this.#i.resize(e, n), this.#D();
	}
	#k(e, t) {
		this.#i.setHidden(e, !t), !t && this.#r.key === e && (this.#r = {
			key: "name",
			dir: 1
		}), this.render();
	}
	#A() {
		let e = this.#E();
		return [
			...e.map((e) => {
				let t = e.key === "name" || !this.#i.hidden.has(e.key);
				return {
					label: e.label,
					icon: t ? "check" : null,
					disabled: e.key === "name",
					action: () => this.#k(e.key, !t)
				};
			}),
			"-",
			{
				label: S("columns.fitAll"),
				icon: "fit",
				action: () => this.#i.shown(e).forEach((e) => this.#O(e.key))
			},
			{
				label: S("columns.reset"),
				icon: "undo",
				action: () => {
					this.#i.reset(), this.render();
				}
			}
		];
	}
	#j(e) {
		let t = o("span", {
			class: "fm-grip",
			role: "separator",
			tabindex: "-1",
			"aria-orientation": "vertical",
			"aria-label": S("column.resize", { name: e.label }),
			title: S("column.resizeTitle")
		}), n = () => t.parentElement.offsetWidth;
		return t.addEventListener("pointerdown", (t) => {
			if (t.button !== 0) return;
			t.preventDefault();
			let r = n();
			this.list.classList.add("resizing"), g(t, {
				threshold: 0,
				onMove: (t) => {
					this.#i.resize(e.key, r + t, !1), this.#D();
				},
				onEnd: (e) => {
					this.list.classList.remove("resizing"), e && this.#i.save();
				}
			});
		}), t.addEventListener("dblclick", () => this.#O(e.key)), t.addEventListener("keydown", (t) => {
			let r = t.shiftKey ? 48 : 16, i = {
				ArrowLeft: -r,
				ArrowRight: r
			}[t.key];
			i !== void 0 && (t.preventDefault(), this.#i.resize(e.key, n() + i), this.#D());
		}), t;
	}
	#M() {
		let e = this.#i.shown(this.#E());
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
			}, n, this.#j(e));
		}));
	}
	#N(e) {
		let t = this.#L(e);
		return this.tree && (t.name.prepend(this.#P(e)), t.name.style.setProperty("--fm-depth", this.#c.get(e.id) ?? 0)), this.#B(e, "fm-row", ...this.#i.shown(this.#E()).map((e) => {
			let n = t[e.key] ?? o("span");
			return n.dataset.col = e.key, n;
		}));
	}
	#P(e) {
		if (e.type !== "folder") return o("span", {
			class: "fm-twisty",
			"aria-hidden": "true"
		});
		let t = this.#s.has(e.id);
		return o("span", {
			class: t ? "fm-twisty open" : "fm-twisty",
			dataset: { twisty: e.id },
			"aria-hidden": "true",
			title: S(t ? "tree.collapseTitle" : "tree.expandTitle")
		});
	}
	#F(e, t = 0, n = []) {
		for (let r of this.#V(e)) {
			let e = n.length;
			n.push(r), this.#c.set(r.id, t), this.#I(r) && this.#F(a.children(r.id), t + 1, n), this.#a && n.length === e + 1 && !$(r.name).includes(this.#a) && n.pop();
		}
		return n;
	}
	#I(e) {
		return this.tree && e.type === "folder" && this.#s.has(e.id);
	}
	#L(e) {
		if (e.trashed) {
			let t = D(e);
			return {
				name: o("span", { class: "fm-name" }, o("span", { class: "fm-icon" }, y(e)), this.#z(e)),
				deleted: o("span", {}, N(e.trashed.at)),
				size: o("span", { class: "num" }, j(e)),
				type: o("span", {}, w(e)),
				origin: o("span", { title: S("trash.restoresTo", { place: t }) }, t)
			};
		}
		let t = this.inTag ? E(e) : "";
		return {
			name: o("span", { class: "fm-name" }, o("span", { class: "fm-icon" }, y(e)), this.#z(e), be(e)),
			modified: o("span", {}, N(e.modified)),
			size: o("span", { class: "num" }, j(e)),
			type: o("span", {}, w(e)),
			workspace: Ce(e),
			location: o("span", { title: t }, t)
		};
	}
	#R(e) {
		let t = y(e, this.#n === "thumbs" && !e.trashed ? { preview: Ue } : void 0), n = this.#B(e, "fm-tile", o("span", { class: "fm-tile-icon" }, t, be(e, "fm-tile-tags")), this.#z(e)), r = (e.tags ?? []).map((e) => m.get(e)?.name).filter(Boolean), i = e.trashed ? [S("tile.deleted", { date: N(e.trashed.at) }), S("tile.origin", { place: D(e) })] : [
			this.inTag && S("tile.location", { place: E(e) }),
			S("owner.label", { name: O(e) }),
			r.length && S("tile.tags", { names: r.join(", ") })
		];
		return n.title = [e.name, ...i.filter(Boolean)].join("\n"), n;
	}
	#z(e) {
		return this.#f === e.id ? o("input", {
			class: "fm-rename",
			type: "text",
			value: e.name,
			spellcheck: "false",
			"aria-label": S("rename.label")
		}) : o("span", {
			class: "fm-label",
			title: e.name
		}, e.name);
	}
	#B(e, t, ...n) {
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
		return e.trashed ? a : le(a, e);
	}
	#V(e) {
		let { key: t, dir: n } = this.#r, r = (e) => t === "type" ? w(e) : t === "workspace" ? O(e) : t === "size" ? e.type === "folder" ? e.trashed ? e.inside : a.children(e.id).length : e.size ?? 0 : t === "modified" ? e.modified : t === "deleted" ? e.trashed?.at ?? e.modified : t === "origin" && e.trashed ? D(e) : t === "location" ? E(e) : e.name, i = {
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
	#H(e, t = e[e.length - 1] ?? this.#d) {
		this.#l = new Set(e), this.#d = t, this.render();
	}
	#U() {
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
				e.ctrlKey || e.metaKey || e.shiftKey || this.#H([]);
				return;
			}
			let i = r.dataset.id, a = this.#o.map((e) => e.id), o = !1;
			if (e.shiftKey && this.#u && a.includes(this.#u)) {
				let [t, n] = [a.indexOf(this.#u), a.indexOf(i)].sort((e, t) => e - t), r = a.slice(t, n + 1);
				this.#H(e.ctrlKey || e.metaKey ? [.../* @__PURE__ */ new Set([...this.#l, ...r])] : r, i);
			} else if (e.ctrlKey || e.metaKey) {
				let e = new Set(this.#l);
				e.has(i) ? e.delete(i) : e.add(i), this.#u = i, this.#H([...e], i);
			} else this.#u = i, this.#l.has(i) ? o = this.#l.size > 1 : this.#H([i], i);
			!this.inTrash && this.#l.has(i) && ae(e, {
				ids: [...this.#l],
				stack: this.history,
				onEnd: ({ moved: e }) => {
					!e && o && this.#H([i], i);
				}
			});
		}, { signal: e }), this.list.addEventListener("dblclick", (e) => {
			let n = t(e);
			if (!n || e.target.closest(".fm-rename, [data-twisty]")) return;
			if (this.inTrash) return this.openSelected();
			let r = a.get(n.dataset.id);
			r && this.open(r);
		}, { signal: e }), this.list.addEventListener("contextmenu", (e) => {
			if (e.preventDefault(), e.target.closest(".fm-head")) return l(e.clientX, e.clientY, this.#A());
			let n = t(e);
			if (!n) return this.#q(e);
			this.#l.has(n.dataset.id) || this.#H([n.dataset.id], n.dataset.id), this.#J(e);
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
				e.preventDefault(), this.#W(e.key === "ArrowRight");
				return;
			}
			let t = this.#K(e.key);
			if (t == null || !this.#o.length) return;
			e.preventDefault();
			let n = this.#o.map((e) => e.id), r = n.indexOf(this.#d), i = t === -Infinity ? 0 : t === Infinity ? n.length - 1 : Math.max(0, Math.min(n.length - 1, (r < 0 ? 0 : r) + t)), a = n[i];
			if (e.shiftKey) {
				this.#u ||= this.#d ?? a;
				let [e, t] = [n.indexOf(this.#u), i].sort((e, t) => e - t);
				this.#H(n.slice(e, t + 1), a);
			} else this.#G(a);
		}, { signal: e });
	}
	#W(e) {
		let t = this.#o.findIndex((e) => e.id === this.#d), n = this.#o[t];
		if (!n) return;
		let r = this.#I(n), i = this.#c.get(n.id);
		if (e) {
			if (n.type !== "folder") return;
			if (!r) return this.setOpen(n.id, !0);
			let e = this.#o[t + 1];
			e && this.#c.get(e.id) > i && this.#G(e.id);
		} else r ? this.setOpen(n.id, !1) : i > 0 && this.#G(n.parent);
	}
	#G(e) {
		this.#u = e, this.#H([e], e), this.list.querySelector(`#fm-${CSS.escape(e)}`)?.scrollIntoView({ block: "nearest" });
	}
	#K(e) {
		let t = this.#n !== "list", n = t ? Math.max(1, Math.floor(this.list.clientWidth / We[this.#n])) : 1;
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
	#q(e) {
		let t = {
			label: S("view.menu"),
			icon: "grid",
			items: He.map((e) => ({
				label: S(`view.${e}`),
				icon: this.#n === e ? "check" : null,
				action: () => this.setView(e)
			}))
		}, n = this.#n === "list" && {
			label: S("columns.menu"),
			icon: "list",
			items: this.#A()
		}, r = this.#o.some((e) => this.#I(e)) && {
			label: S("tree.collapseAll"),
			icon: "minus",
			action: () => {
				this.#s.clear(), this.render();
			}
		};
		if (this.inTrash) {
			let r = !this.#o.length;
			return l(e.clientX, e.clientY, [
				{
					label: S("menu.restoreAll"),
					icon: "undo",
					disabled: r,
					action: () => this.restore(a.trashed().map((e) => e.id))
				},
				{
					label: S("menu.emptyTrash"),
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
				label: S("menu.manageTags"),
				icon: "gear",
				action: () => b("settings", { tab: "tags" })
			},
			"-",
			t,
			n,
			r
		].filter(Boolean));
		l(e.clientX, e.clientY, [
			{
				label: S("menu.newFolder"),
				icon: "folderPlus",
				action: () => this.create("folder")
			},
			{
				label: S("menu.newTextFile"),
				icon: "filePlus",
				action: () => this.create("file")
			},
			"-",
			t,
			n,
			r
		].filter(Boolean));
	}
	#J(e) {
		let t = this.#o.filter((e) => this.#l.has(e.id)), n = t.length > 1, r = C(t.length);
		if (this.inTrash) {
			let i = t.map((e) => e.id);
			return l(e.clientX, e.clientY, [
				{
					label: n ? S("menu.restoreMany", { count: r }) : S("menu.restore"),
					icon: "undo",
					action: () => this.restore(i)
				},
				{
					label: S("menu.info"),
					icon: "info",
					shortcut: f.label("files.info"),
					action: () => this.info.setOpen(!0)
				},
				"-",
				{
					label: S("menu.purge"),
					icon: "trash",
					shortcut: f.label("items.delete"),
					danger: !0,
					action: () => this.purge(i)
				}
			]);
		}
		let i = t.some((e) => e.system), a = t.map((e) => e.id), o = this.inTag, s = !n && this.tree && t[0].type === "folder" && t[0], c = s && this.#s.has(s.id);
		l(e.clientX, e.clientY, [
			{
				label: n ? S("menu.openMany", { count: r }) : S("menu.open"),
				icon: "open",
				shortcut: f.label("items.open"),
				action: () => this.openSelected()
			},
			s && {
				label: S(c ? "tree.collapse" : "tree.expand"),
				icon: c ? "minus" : "plus",
				action: () => this.setOpen(s.id, !c)
			},
			s && {
				label: S("tree.expandAll"),
				icon: "plus",
				action: () => this.setOpen(s.id, !0, !0)
			},
			!n && t[0].type === "file" && {
				label: S("menu.openWith"),
				icon: "open",
				action: () => pe(t[0], { choose: !0 })
			},
			!n && t[0].type === "folder" && {
				label: S("menu.openInEditor"),
				icon: "code",
				action: () => b("editor", { folder: t[0].id })
			},
			o && !n && {
				label: S("menu.reveal"),
				icon: "folderOpen",
				action: () => this.reveal(t[0].id)
			},
			{
				label: S("menu.rename"),
				icon: "pencil",
				shortcut: f.label("items.rename"),
				disabled: n || i,
				action: () => this.rename(t[0].id)
			},
			xe(a),
			o && {
				label: S("menu.untag", { name: o.name }),
				icon: "x",
				action: () => ve(a, o.id, !1)
			},
			ce(a),
			{
				label: S("menu.info"),
				icon: "info",
				shortcut: f.label("files.info"),
				action: () => this.info.setOpen(!0)
			},
			!n && {
				label: S("menu.properties"),
				icon: "info",
				action: () => ye(t[0].id)
			},
			..._.appActionEntries?.(a, { separator: !0 }) ?? [],
			"-",
			{
				label: n ? S("menu.deleteMany", { count: r }) : S("menu.delete"),
				icon: "trash",
				shortcut: f.label("items.delete"),
				danger: !0,
				disabled: i,
				action: () => this.remove(t.map((e) => e.id))
			}
		].filter(Boolean));
	}
	#Y(e) {
		return e === J || !!X(e) || a.exists(e);
	}
	#X(e) {
		let t = this.list.querySelector(`[data-id="${CSS.escape(e)}"]`)?.getBoundingClientRect();
		return {
			x: t ? t.left + 40 : innerWidth / 2,
			y: t ? t.bottom : innerHeight / 2
		};
	}
	#Z(e, t) {
		for (; e.length;) {
			let n = e.pop();
			if (this.#Y(n)) {
				t.push(this.folder), this.go(n, !1);
				return;
			}
		}
	}
	#Q(e) {
		this.#p = e, this.render();
	}
	async #$(t, n = "", r = ["ok"]) {
		if (!e.messageBox) return this.#Q(n ? `${t}: ${n}` : t), null;
		let i = await e.messageBox(this.win, {
			icon: "error",
			title: t,
			text: n,
			buttons: r
		});
		return this.list.isConnected && !this.win.el.contains(document.activeElement) && this.list.focus(), i;
	}
	notFound(e) {
		let t = S("place.home");
		this.#$(S(e === "tag" ? "error.tagNotFound" : "error.folderNotFound"), S(e === "tag" ? "error.tagNotFoundText" : "error.folderNotFoundText", { place: t }));
	}
	#ee(e) {
		let t = e.node && x.has(e.node.id);
		if (this.inTrash) return t ? this.render() : void 0;
		if (this.inTag) return this.render();
		if (e.type === "remove" && e.ids.includes(this.folder)) return this.go(e.parent && a.exists(e.parent) ? e.parent : a.root, !1);
		let n = (e) => e === this.folder || this.#s.has(e), r = n(e.parent) || n(e.from), i = e.type !== "remove" && a.isInside(this.folder, e.node.id), o = [e.parent, e.from].some((e) => e && a.exists(e) && n(a.get(e).parent));
		(r || i || o || t) && (r && e.type !== "rename" && (this.#p = ""), this.render());
	}
};
export { Je as default };
