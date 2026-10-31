import * as e from "/host/sdk.js";
import { UndoStack as t, Window as n, appIcon as r, fileType as i, fs as a, h as o, history as s, icon as c, openMenu as l, session as u, settings as d, shortcuts as f, storage as p, tags as m, toast as h, trackDrag as g } from "/host/sdk.js";
import { DESK_NAME as ee, SYSTEM_FOLDERS as te, addTarget as ne, confirmRemove as re, describeWorkspace as ie, dragItems as _, dropZone as v, getApp as y, handleCommand as ae, itemIcon as b, launch as x, linkEntry as oe, links as S, markItem as se, movableInto as ce, moveInto as le, onWorkspacesChange as ue, openFile as de, recordCreated as fe, removeNodes as pe, renameNode as me, restoreNodes as he, setTag as ge, showProperties as _e, tagDots as C, tagSubmenu as ve } from "/host/system.js";
// src/shared/i18n.js
function ye(t, n) {
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
var { t: w } = ye("files", {
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
		"preview.appMissing": "App not installed"
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
		"preview.appMissing": "App non installata"
	} }
}), T = (e) => e.toLocaleString(u.locale), E = (e) => e.type === "folder" ? w("type.folder") : e.type === "app" ? w("type.app") : i(e.name).label, D = (e) => e.id === a.root ? w("place.home") : e.name, O = (e) => e.parent === a.root ? w("place.home") : a.path(e.parent);
function k(e) {
	let t = e.trashed.from;
	return a.exists(t) && t !== a.root ? a.path(t) : w("place.home");
}
function A(e) {
	let t = ie(e.workspace);
	return t ? t.removed ? w("owner.removed", { name: t.name }) : t.name : e.workspace ? w("owner.unknown") : w("owner.shared");
}
function be(e) {
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
		title: w("owner.label", { name: A(e) })
	}, n, o("span", {}, A(e)));
}
function j(e) {
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
var M = (e) => w("count.items", {
	n: e,
	count: T(e)
});
function N(e) {
	return e.type === "folder" ? M(e.trashed ? e.inside : a.children(e.id).length) : e.type === "file" ? j(e.size ?? 0) : "—";
}
function P() {
	let e = d.get("trashRetention");
	return e <= 0 ? w("trash.keptForever") : w("trash.keptDays", {
		n: e,
		count: T(e)
	});
}
var F = (e) => new Date(e).toLocaleString(u.locale, {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit"
}), I = "files-panels", L = 720, xe = class {
	open;
	width;
	constructor({ key: e, title: t, resizeLabel: n, closeLabel: r, width: i, open: a = !1, room: s, onLayout: l, signal: u }) {
		this.key = e, this.defaultWidth = i, this.room = s, this.onLayout = l;
		let d = p.get(I, {})?.[e];
		this.open = typeof d?.open == "boolean" ? d.open : a, this.width = Number.isFinite(d?.width) ? R(d.width, 180, L) : i, this.split = o("div", {
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
		this.el.style.width = `${e}px`, this.split.setAttribute("aria-valuenow", e), this.split.setAttribute("aria-valuemax", Math.max(180, Math.min(L, this.room())));
	}
	resize(e, t = !0) {
		this.width = Math.round(R(e, 180, Math.max(180, Math.min(L, this.room())))), t && this.#t(), this.onLayout();
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
		let e = p.get(I, {});
		p.set(I, {
			...e && typeof e == "object" ? e : {},
			[this.key]: {
				open: this.open,
				width: this.width
			}
		});
	}
}, R = (e, t, n) => Math.max(t, Math.min(e, n)), z = 1e5, Se = 5 << 20, B = 30, V = 200, H = (e) => e < 1024 ? j(e) : w("info.bytesDetail", {
	size: j(e),
	count: T(e)
});
function Ce(e) {
	let t = 0;
	for (let n of a.children(e)) t += n.type === "folder" ? Ce(n.id) : n.size ?? 0;
	return t;
}
var U = (e) => e.trashed ? e.bytes ?? 0 : e.type === "folder" ? Ce(e.id) : e.size ?? 0, we = (e) => e?.type === "file" && !e.trashed, Te = (e) => `${e.id}:${e.modified}:${e.size ?? 0}`;
function W(e) {
	let t = e.map((e) => m.get(e)).filter(Boolean);
	return t.length ? o("span", { class: "fm-chips" }, t.map((e) => o("span", {
		class: "fm-chip",
		title: e.visible ? e.name : w("info.tagHidden", { name: e.name })
	}, o("span", {
		class: "tag-dot",
		style: { background: e.color },
		"aria-hidden": "true"
	}), e.name))) : w("info.none");
}
var G = (e) => o("dl", { class: "fm-facts" }, e.filter(Boolean).flatMap(([e, t, n]) => [o("dt", {}, e), o("dd", { class: n }, t)])), K = (e, ...t) => o("section", { class: "fm-info-section" }, o("h6", {}, e), ...t);
function q(e, t, n) {
	return o("div", { class: "fm-info-head" }, o("span", { class: "fm-info-icon" }, e), o("div", { class: "fm-info-titles" }, o("div", {
		class: "fm-info-name",
		title: t
	}, t), n && o("div", { class: "fm-info-kind" }, n)));
}
function Ee({ nodes: e, place: t, text: n }) {
	return e.length > 1 ? Oe(e) : e.length === 1 ? De(e[0], n) : t.trash ? ke() : t.tag ? Ae(t.tag) : o("div", {}, o("p", { class: "fm-info-hint" }, w("info.folderHint")), De(t.node, n));
}
function De(e, t) {
	let { ext: n } = i(e.name), r = e.type === "app" ? y(e.app) : null, s = [[w("info.type"), e.type === "file" && n ? `${E(e)} (.${n})` : e.type === "app" ? w("type.appLink") : E(e)], e.type === "app" && [w("info.app"), r ? r.name : w("info.appMissing", { id: e.app })]];
	if (e.type === "file" && s.push([w("info.size"), H(e.size ?? 0)]), e.type === "folder") {
		let t = e.trashed ? null : a.children(e.id).length, n = e.trashed ? e.inside : a.count(e.id);
		s.push([w("info.contents"), t === null || n === t ? M(n) : w("info.contentsTotal", {
			items: M(t),
			total: T(n)
		})]), s.push([w("info.size"), H(U(e))]);
	}
	e.trashed ? s.push([w("info.deleted"), F(e.trashed.at)], [
		w("info.origin"),
		k(e),
		"mono"
	]) : s.push([
		w("info.path"),
		a.path(e.id),
		"mono"
	]), s.push([w("info.created"), F(e.created)], [w("info.modified"), F(e.modified)]);
	let c = [
		e.system && w("note.system"),
		e.private && w("note.private"),
		!e.trashed && a.isHidden(e.id) && w("note.hidden"),
		!e.trashed && S.has(e.id) && w("note.linked")
	].filter(Boolean), l = o("div", {}, q(b(e), D(e), E(e)), K(w("info.general"), G(s)), K(w("info.organization"), G([[w("info.workspace"), be(e)], [w("info.tags"), W(e.tags ?? [])]])), c.length ? K(w("info.attributes"), o("ul", { class: "fm-notes" }, c.map((e) => o("li", {}, e)))) : null);
	if (we(e) && (e.size ?? 0) <= Se) {
		let n = o("dd", {}, "…"), r = o("dd", {}, "…"), i = o("dd", {}, "…");
		l.append(K(w("info.text"), o("dl", { class: "fm-facts" }, o("dt", {}, w("info.lines")), n, o("dt", {}, w("info.words")), r, o("dt", {}, w("info.chars")), i))), t(e).then((e) => {
			n.textContent = T(e ? e.split("\n").length : 0), r.textContent = T(e.trim() ? e.trim().split(/\s+/).length : 0), i.textContent = T([...e].length);
		}, () => {
			n.textContent = r.textContent = i.textContent = "—";
		});
	}
	return l;
}
function Oe(e) {
	let t = (t) => e.filter((e) => e.type === t).length, n = t("folder"), r = t("file"), i = t("app"), s = [
		n && w("info.folders", {
			n,
			count: T(n)
		}),
		r && w("info.files", {
			n: r,
			count: T(r)
		}),
		i && w("info.apps", {
			n: i,
			count: T(i)
		})
	].filter(Boolean).join(", "), c = e.reduce((e, t) => e + (t.type === "folder" ? t.trashed ? t.inside : a.count(t.id) : 0), 0), l = /* @__PURE__ */ new Map();
	for (let t of e) l.set(E(t), (l.get(E(t)) ?? 0) + 1);
	let u = new Set(e.map((e) => e.parent)), d = e.map((e) => e.modified), f = [...new Set(e.map(A))], p = [...new Set(e.flatMap((e) => e.tags ?? []))], m = p.filter((t) => e.every((e) => e.tags?.includes(t))), h = e.every((e) => e.trashed), g = o("span", { class: "fm-info-stack" }, e.slice(0, 3).map((e) => o("span", {}, b(e))));
	return o("div", {}, q(g, w("selection.count", { count: T(e.length) }), s), K(w("info.general"), G([
		[w("info.size"), H(e.reduce((e, t) => e + U(t), 0))],
		c > 0 && [w("info.contents"), w("info.insideFolders", {
			n: c,
			count: T(c)
		})],
		[w("info.types"), [...l].sort((e, t) => t[1] - e[1]).map(([e, t]) => `${e} ${T(t)}`).join(" · ")],
		!h && [
			w("info.location"),
			u.size === 1 ? O(e[0]) : w("info.manyFolders", { count: T(u.size) }),
			u.size === 1 ? "mono" : null
		],
		[w("info.oldest"), F(Math.min(...d))],
		[w("info.newest"), F(Math.max(...d))]
	])), K(w("info.organization"), G([
		[w("info.workspace"), f.join(", ")],
		[w("info.tags"), W(p)],
		p.length > 0 && [w("info.common"), W(m)]
	])), K(w("info.items"), o("ul", { class: "fm-names" }, e.slice(0, B).map((e) => o("li", { title: e.name }, o("span", { class: "fm-icon" }, b(e)), o("span", {}, e.name))), e.length > B ? o("li", { class: "more" }, w("list.more", { count: T(e.length - B) })) : null)));
}
function ke() {
	let e = a.trashed(), t = e.reduce((e, t) => e + 1 + t.inside, 0);
	return o("div", {}, q(o("span", { class: "fm-info-glyph" }, c("trash")), w("place.trash"), M(e.length)), K(w("info.general"), G([
		[w("info.contents"), e.length ? w("info.contentsTotal", {
			items: M(e.length),
			total: T(t)
		}) : M(0)],
		[w("info.size"), H(e.reduce((e, t) => e + (t.bytes ?? 0), 0))],
		e.length > 0 && [w("info.lastDeleted"), F(e[0].trashed.at)],
		[w("info.retention"), P()]
	])));
}
function Ae(e) {
	let t = a.tagged(e.id);
	return o("div", {}, q(o("span", {
		class: "tag-dot fm-info-tag",
		style: { background: e.color },
		"aria-hidden": "true"
	}), e.name, w("info.tagKind")), K(w("info.general"), G([
		[w("info.items"), M(t.length)],
		[w("info.size"), H(t.reduce((e, t) => e + U(t), 0))],
		[w("info.visibility"), e.visible ? w("info.visible") : w("info.invisible")]
	])));
}
var je = class {
	#e = null;
	#t = null;
	constructor(e, { text: t, open: n }) {
		this.body = e, this.text = t, this.open = n;
	}
	update(e) {
		let t = e.length === 1 ? e[0] : null, n = t ? `${Te(t)}:${t.name}:${t.type === "folder" && !t.trashed ? a.children(t.id).map((e) => e.id + e.name).join() : ""}` : `${e.length}`;
		if (n === this.#e) return;
		if (this.#e = n, this.#s(), !t) return this.#o(e.length ? J("list", w("selection.count", { count: T(e.length) }), w("preview.oneAtATime")) : J("file", w("preview.none"), w("preview.selectFile")));
		if (t.trashed) return this.#o(this.#n(t), J("trash", w("preview.trashed"), w("preview.restoreToSee")));
		if (t.type === "folder") return this.#o(this.#n(t), this.#i(t));
		if (t.type === "app") return this.#o(this.#n(t), this.#a(t));
		let r = o("div", { class: "fm-preview-wait" }, w("preview.loading"));
		this.#o(this.#n(t), r), this.text(t).then((e) => {
			this.#e === n && r.replaceWith(this.#r(t, e));
		}, (e) => {
			this.#e === n && r.replaceWith(J("x", w("preview.readError"), e?.message ?? ""));
		});
	}
	destroy() {
		this.#s();
	}
	#n(e) {
		let t = e.trashed ? null : e.type === "app" ? w("preview.launch") : w("preview.open");
		return o("div", { class: "fm-preview-head" }, o("span", { class: "fm-icon" }, b(e)), o("span", {
			class: "fm-preview-name",
			title: e.name
		}, D(e)), t && o("button", {
			class: "fm-preview-open",
			type: "button",
			onclick: () => this.open(e)
		}, t));
	}
	#r(e, t) {
		if (!t) return J("file", w("preview.emptyFile"), "");
		let { ext: n } = i(e.name);
		if (n === "svg" && /^\s*(<\?xml[^>]*>\s*)?(<!--[\s\S]*?-->\s*)*<svg[\s>]/i.test(t)) return this.#t = URL.createObjectURL(new Blob([t], { type: "image/svg+xml" })), o("div", { class: "fm-preview-image" }, o("img", {
			src: this.#t,
			alt: w("preview.imageAlt", { name: e.name })
		}));
		if (t.slice(0, 8e3).includes("\0")) return J("file", w("preview.unavailable"), w("preview.notText"));
		let r = t.length > z;
		return o("div", { class: "fm-preview-textwrap" }, o("pre", {
			class: "fm-preview-text",
			tabindex: "0",
			"aria-label": w("preview.contentsOf", { name: e.name })
		}, r ? t.slice(0, z) : t), r ? o("div", { class: "fm-preview-note" }, w("preview.cut", {
			shown: T(z),
			total: T(t.length)
		})) : null);
	}
	#i(e) {
		let t = a.children(e.id);
		if (!t.length) return J("folder", w("preview.emptyFolder"), "");
		let n = {
			folder: 0,
			file: 1,
			app: 1
		};
		return t.sort((e, t) => n[e.type] - n[t.type] || e.name.localeCompare(t.name, u.locale, { numeric: !0 })), o("ul", {
			class: "fm-preview-list",
			"aria-label": w("preview.contentsOf", { name: e.name })
		}, t.slice(0, V).map((e) => o("li", {
			title: w("preview.childTitle", { name: e.name }),
			ondblclick: () => this.open(e)
		}, o("span", { class: "fm-icon" }, b(e)), o("span", { class: "fm-label" }, e.name))), t.length > V ? o("li", { class: "more" }, w("list.more", { count: T(t.length - V) })) : null);
	}
	#a(e) {
		let t = y(e.app);
		return t ? o("div", { class: "fm-preview-app" }, r(t), o("strong", {}, t.name)) : J("x", w("preview.appMissing"), e.app);
	}
	#o(...e) {
		this.body.replaceChildren(...e);
	}
	#s() {
		this.#t && URL.revokeObjectURL(this.#t), this.#t = null;
	}
};
function J(e, t, n) {
	return o("div", { class: "fm-preview-empty" }, c(e), o("strong", {}, t), n ? o("span", {}, n) : null);
}
// src/files/columns.js
var Me = "files-columns", Ne = 1600, Pe = 160, Y = {
	modified: 128,
	deleted: 128,
	size: 92,
	type: 118,
	workspace: 124,
	origin: 160,
	location: 160
}, Fe = class {
	widths = {};
	hidden = /* @__PURE__ */ new Set();
	constructor() {
		let e = p.get(Me, {}), t = e && typeof e.widths == "object" ? e.widths : {};
		for (let [e, n] of Object.entries(t ?? {})) (Object.hasOwn(Y, e) || e === "name") && Number.isFinite(n) && (this.widths[e] = Ie(Math.round(n), 48, Ne));
		Array.isArray(e?.hidden) && e.hidden.filter((e) => Object.hasOwn(Y, e)).forEach((e) => this.hidden.add(e));
	}
	shown(e) {
		return e.filter((e) => e.key === "name" || !this.hidden.has(e.key));
	}
	width(e) {
		return this.widths[e] ?? Y[e];
	}
	layout(e, t = null) {
		let n = this.widths.name == null && t !== "name", r = e.map((e) => e.key === t ? "max-content" : e.key === "name" && n ? `minmax(${Pe}px, 1fr)` : `${this.width(e.key)}px`);
		n || r.push("minmax(0, 1fr)");
		let i = e.reduce((e, r) => e + (r.key === t ? 0 : r.key === "name" && n ? Pe : this.width(r.key)), 0);
		return {
			template: r.join(" "),
			min: `${i}px`
		};
	}
	resize(e, t, n = !0) {
		this.widths[e] = Ie(Math.round(t), 48, Ne), n && this.save();
	}
	setHidden(e, t) {
		e !== "name" && (t ? this.hidden.add(e) : this.hidden.delete(e), this.save());
	}
	reset() {
		this.widths = {}, this.hidden.clear(), this.save();
	}
	save() {
		p.set(Me, {
			widths: this.widths,
			hidden: [...this.hidden]
		});
	}
}, Ie = (e, t, n) => Math.max(t, Math.min(e, n)), Le = 260, Re = "files-view", X = a.trashRoot, ze = () => [
	{
		key: "name",
		label: w("column.name")
	},
	{
		key: "modified",
		label: w("column.modified")
	},
	{
		key: "size",
		label: w("column.size"),
		num: !0
	},
	{
		key: "type",
		label: w("column.type")
	},
	{
		key: "workspace",
		label: w("column.workspace")
	}
], Be = () => [
	{
		key: "name",
		label: w("column.name")
	},
	{
		key: "deleted",
		label: w("column.deleted")
	},
	{
		key: "size",
		label: w("column.size"),
		num: !0
	},
	{
		key: "type",
		label: w("column.type")
	},
	{
		key: "origin",
		label: w("column.origin")
	}
], Z = "tag:", Ve = () => [
	{
		key: "name",
		label: w("column.name")
	},
	{
		key: "location",
		label: w("column.location")
	},
	{
		key: "type",
		label: w("column.type")
	},
	{
		key: "workspace",
		label: w("column.workspace")
	}
], Q = (e) => typeof e == "string" && e.startsWith(Z) ? m.get(e.slice(4)) : null;
function He(e) {
	return e?.trash || e?.folder === X ? X : typeof e?.tag == "string" && m.get(e.tag) ? Z + e.tag : Q(e?.folder) || e?.folder && a.exists(e.folder) ? e.folder : null;
}
function Ue({ args: e } = {}) {
	let t = new n({
		title: w("@name"),
		icon: "folder",
		width: 1e3,
		height: 520,
		minWidth: 520,
		minHeight: 300
	}), r = new We(t);
	return r.go(He(e) ?? a.root, !1), t.on("launch", (e) => {
		let t = He(e);
		t && r.go(t);
	}), t.getState = () => ({ folder: r.folder }), t;
}
var $ = (e) => String(e).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(), We = class {
	folder = a.root;
	#e = [];
	#t = [];
	#n = p.get(Re) === "grid" ? "grid" : "list";
	#r = {
		key: "name",
		dir: 1
	};
	#i = new Fe();
	#a = "";
	#o = [];
	#s = /* @__PURE__ */ new Set();
	#c = null;
	#l = null;
	#u = null;
	#d = "";
	#f = {
		defaults: [],
		desk: null
	};
	#p = {
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
		this.backBtn = t("arrowLeft", w("toolbar.back"), () => this.back()), this.forwardBtn = t("arrowRight", w("toolbar.forward"), () => this.forward()), this.upBtn = t("arrowUp", w("toolbar.up"), () => this.up()), this.crumbs = o("nav", {
			class: "fm-path",
			"aria-label": w("toolbar.path")
		}), this.newBtn = t("folderPlus", w("menu.newFolder"), () => this.create("folder")), this.listBtn = t("list", w("view.list"), () => this.setView("list")), this.gridBtn = t("grid", w("view.grid"), () => this.setView("grid")), this.previewBtn = t("sidebar", "", () => this.preview.toggle()), this.infoBtn = t("info", "", () => this.info.toggle()), this.search = o("input", {
			type: "text",
			spellcheck: "false",
			"aria-label": w("toolbar.search")
		}), this.search.addEventListener("input", () => {
			this.#a = $(this.search.value.trim()), this.render();
		}), this.search.addEventListener("keydown", (e) => {
			e.key === "Escape" && this.search.value && (e.stopPropagation(), this.search.value = "", this.#a = "", this.render()), e.key === "ArrowDown" && (e.preventDefault(), this.list.focus());
		}), this.side = o("aside", {
			class: "fm-side",
			"aria-label": w("side.label")
		}), this.list = o("div", {
			class: "fm-list",
			role: "listbox",
			tabindex: "0",
			"aria-multiselectable": "true",
			"aria-label": w("list.label")
		}), this.statusLeft = o("span"), this.statusRight = o("span", { class: "fm-status-right" });
		let n = (t, n, r, i) => new xe({
			key: t,
			...n,
			width: r,
			open: i,
			signal: e.signal,
			room: () => this.#g() - (t === "info" ? this.preview : this.info).shown,
			onLayout: () => {
				this.#_(), this.#m();
			}
		});
		this.preview = n("preview", {
			title: w("panel.preview.title"),
			resizeLabel: w("panel.preview.resize"),
			closeLabel: w("panel.preview.close")
		}, 300, !1), this.info = n("info", {
			title: w("panel.info.title"),
			resizeLabel: w("panel.info.resize"),
			closeLabel: w("panel.info.close")
		}, 260, !0), this.previewView = new je(this.preview.body, {
			text: (e) => this.#h(e),
			open: (e) => this.open(e)
		}), this.main = o("div", { class: "fm" }, this.side, o("div", { class: "fm-main" }, this.list, o("div", { class: "fm-status" }, this.statusLeft, this.statusRight)), this.preview.el, this.info.el), e.body.append(o("div", { class: "fm-toolbar" }, this.backBtn, this.forwardBtn, this.upBtn, this.crumbs, this.newBtn, o("span", { class: "fm-sep" }), this.listBtn, this.gridBtn, o("span", { class: "fm-sep" }), this.previewBtn, this.infoBtn, o("label", { class: "fm-search" }, c("search"), this.search)), this.main);
		let r = new ResizeObserver(() => this.#_());
		r.observe(this.main), this.#R(), v(this.list, { folder: () => this.inTrash || this.inTag ? null : this.folder }), this.gap = o("div", {
			class: "fm-gap",
			"aria-hidden": "true"
		}), v(this.side, { target: (e, t, n, r) => this.#S(e, t, n, r) });
		let i = a.on("change", (e) => this.#K(e)), l = S.on("change", () => {
			this.#H(this.folder) && this.render();
		}), u = a.on("scope", () => {
			this.#H(this.folder) && this.render();
		}), d = ue(() => {
			this.#H(this.folder) && this.render();
		}), f = a.on("trash", () => {
			this.inTrash && (this.#d = "", this.render());
		}), p = m.on("change", () => {
			if (this.folder.startsWith?.(Z) && !this.inTag) return this.go(a.root, !1);
			this.#H(this.folder) && this.render();
		}), h = ne({
			isActive: () => e.active,
			selectionSize: () => this.#s.size,
			open: () => this.openSelected(),
			rename: () => this.rename([...this.#s][0]),
			remove: () => this.remove([...this.#s]),
			selectAll: () => this.#L(this.#o.map((e) => e.id)),
			deselect: () => this.#L([])
		}), g = s.attach(e.el, this.history), ee = [ae("files.info", {
			isActive: () => e.active,
			run: () => this.info.toggle()
		}), ae("files.preview", {
			isActive: () => e.active,
			run: () => this.preview.toggle()
		})];
		e.on("destroy", () => {
			i(), l(), u(), d(), f(), p(), h(), g(), ee.forEach((e) => e()), r.disconnect(), this.previewView.destroy();
		});
	}
	get inTrash() {
		return this.folder === X;
	}
	get inTag() {
		return Q(this.folder);
	}
	go(e, t = !0) {
		if (e !== X && !Q(e) && a.get(e)?.type !== "folder") return;
		t && e !== this.folder && (this.#e.push(this.folder), this.#t = []);
		let n = this.folder;
		this.folder = e, this.#s.clear(), this.#u = null, this.#d = "", this.search.value = "", this.#a = "";
		let r = a.ancestors(n).find((t) => t.parent === e);
		this.#l = r?.id ?? null, r && this.#s.add(r.id), this.#c = this.#l, this.render(), this.list.scrollTop = 0;
	}
	reveal(e) {
		let t = a.get(e);
		t && (this.go(t.parent), a.isHidden(e) ? this.#G(w("message.hiddenByTag", { name: t.name })) : this.#L([e], e));
	}
	back() {
		this.#W(this.#e, this.#t);
	}
	forward() {
		this.#W(this.#t, this.#e);
	}
	up() {
		let e = a.get(this.folder)?.parent;
		e && this.go(e);
	}
	setView(e) {
		this.#n = e, p.set(Re, e), this.render();
	}
	open(e) {
		if (e.type === "folder") return this.go(e.id);
		if (e.type === "app") return x(e.app);
		de(e);
	}
	openSelected() {
		if (this.inTrash) return this.#G(w("message.restoreToOpen"));
		let e = this.#o.filter((e) => this.#s.has(e.id)), t = e.find((e) => e.type === "folder");
		e.filter((e) => e.type !== "folder").forEach((e) => this.open(e)), t && this.go(t.id);
	}
	create(e) {
		if (this.inTrash || this.inTag) return;
		this.#a &&= (this.search.value = "", "");
		let t = a.create(this.folder, {
			type: e,
			name: w(e === "folder" ? "create.folderName" : "create.fileName")
		});
		this.#L([t.id]), this.rename(t.id, !0);
	}
	rename(e, t = !1) {
		let n = a.get(e);
		if (!n || n.system) return;
		this.#u = e, this.render();
		let r = this.list.querySelector(".fm-rename");
		if (!r) return;
		r.focus();
		let i = n.type === "file" ? n.name.lastIndexOf(".") : -1;
		r.setSelectionRange(0, i > 0 ? i : n.name.length);
		let o = !1, s = (i) => {
			if (o) return;
			o = !0, this.#u = null;
			let s = r.value.replace(/\s+/g, " ").trim();
			if (i && s && s !== n.name && a.exists(e)) try {
				me(t ? null : this.history, e, s);
			} catch (e) {
				this.#G(e.message);
			}
			t && fe(this.history, e), this.render(), this.list.focus();
		};
		r.addEventListener("keydown", (e) => {
			e.stopPropagation(), e.key === "Enter" && (e.preventDefault(), s(!0)), e.key === "Escape" && (e.preventDefault(), s(!1));
		}), r.addEventListener("blur", () => s(!0));
	}
	remove(e) {
		if (this.inTrash) return this.purge(e);
		let t = e.filter((e) => !a.get(e)?.system);
		if (!t.length) return this.#G(w("message.systemFolders"));
		let { x: n, y: r } = this.#U(t[0]);
		re(t, n, r, this.history);
	}
	restore(e) {
		let t = he(this.history, e);
		if (!t.length) return;
		let n = [...new Set(t.map((e) => e.parent === a.root ? w("place.home") : a.path(e.parent)))], r = T(t.length);
		h(t.length === 1 ? w("toast.restored", {
			name: a.get(t[0].id).name,
			place: n[0]
		}) : n.length === 1 ? w("toast.restoredMany", {
			count: r,
			place: n[0]
		}) : w("toast.restoredManyPlaces", {
			count: r,
			folders: T(n.length)
		}));
	}
	purge(e) {
		let t = this.#o.filter((t) => e.includes(t.id));
		if (!t.length) return;
		let n = t.length === 1 ? w("confirm.purge", { name: t[0].name }) : w("confirm.purgeMany", { count: T(t.length) }), { x: r, y: i } = this.#U(t[0].id);
		l(r, i, [{
			label: n,
			icon: "trash",
			danger: !0,
			action: () => a.purge(t.map((e) => e.id))
		}, {
			label: w("confirm.cancel"),
			icon: "x",
			action: () => {}
		}]);
	}
	empty(e, t) {
		let n = a.trashed().length;
		n && l(e, t, [{
			label: w("confirm.emptyTrash", {
				n,
				count: T(n)
			}),
			icon: "trash",
			danger: !0,
			action: () => a.purgeTrash()
		}, {
			label: w("confirm.cancel"),
			icon: "x",
			action: () => {}
		}]);
	}
	render() {
		let e = this.inTag, t = this.inTrash ? {
			id: X,
			name: w("place.trash"),
			parent: null
		} : e ? {
			id: this.folder,
			name: w("place.tag", { name: e.name }),
			parent: null
		} : a.get(this.folder);
		if (!t) return;
		this.win.setTitle(D(t), w("@name")), this.#v(t), this.#y();
		let n = this.inTrash ? a.trashed() : e ? a.tagged(e.id) : a.children(this.folder);
		this.#o = this.#I(this.#a ? n.filter((e) => $(e.name).includes(this.#a)) : n);
		let r = new Set(this.#o.map((e) => e.id));
		this.#s = new Set([...this.#s].filter((e) => r.has(e))), r.has(this.#l) || (this.#l = this.#o[0]?.id ?? null);
		let i = this.list.scrollTop;
		this.list.classList.toggle("grid", this.#n === "grid"), this.#o.length ? this.#n === "list" ? (this.#T(), this.list.replaceChildren(this.#A(), ...this.#o.map((e) => this.#j(e)))) : this.list.replaceChildren(...this.#o.map((e) => this.#N(e))) : this.list.replaceChildren(o("div", { class: "fm-empty" }, this.#a ? w("empty.noMatch", { query: this.search.value.trim() }) : this.inTrash ? w("empty.trash") : w(e ? "empty.tag" : "empty.folder"))), this.list.scrollTop = i, this.list.setAttribute("aria-activedescendant", this.#l ? `fm-${this.#l}` : "");
		let s = n.length, c = this.#s.size;
		this.statusLeft.textContent = w("status.items", {
			n: s,
			count: T(s)
		}) + (c ? ` · ${w("status.selected", {
			n: c,
			count: T(c)
		})}` : ""), this.statusRight.textContent = this.#d || (this.inTrash ? P() : e ? e.visible ? w("status.tag") : w("status.tagHidden") : a.path(this.folder)), this.statusRight.classList.toggle("msg", !!this.#d), this.#m();
	}
	#m() {
		let e = [[
			this.previewBtn,
			this.preview,
			"files.preview",
			w("panel.preview.show"),
			w("panel.preview.hide")
		], [
			this.infoBtn,
			this.info,
			"files.info",
			w("panel.info.show"),
			w("panel.info.hide")
		]];
		for (let [t, n, r, i, a] of e) {
			let e = f.label(r), o = `${n.open ? a : i}${e ? ` (${e})` : ""}`;
			t.title = o, t.setAttribute("aria-label", o), t.setAttribute("aria-pressed", String(n.open)), t.classList.toggle("on", n.open);
		}
		if (!this.info.open && !this.preview.open) return;
		let t = this.#o.filter((e) => this.#s.has(e.id));
		if (this.preview.open && this.previewView.update(t), this.info.open) {
			let e = this.inTag, n = this.inTrash ? { trash: !0 } : e ? { tag: e } : { node: a.get(this.folder) };
			if (!n.trash && !n.tag && !n.node) return;
			let r = this.info.body, i = r.scrollTop;
			r.replaceChildren(Ee({
				nodes: t,
				place: n,
				text: (e) => this.#h(e)
			})), r.scrollTop = i;
		}
	}
	#h(e) {
		if (!we(e)) return Promise.reject(Error(w("error.notFile")));
		let t = Te(e);
		return this.#p.key !== t && (this.#p = {
			key: t,
			text: a.read(e.id)
		}), this.#p.text;
	}
	#g() {
		return this.main.clientWidth - this.side.offsetWidth - Le;
	}
	#_() {
		let e = [this.preview, this.info].filter((e) => e.open);
		if (!e.length || !this.main.isConnected) return;
		let t = e.reduce((e, t) => e + t.width, 0), n = Math.min(1, Math.max(0, this.#g()) / t);
		e.forEach((e) => e.show(Math.max(180, Math.floor(e.width * n))));
	}
	#v(e) {
		this.backBtn.disabled = !this.#e.some((e) => this.#H(e)), this.forwardBtn.disabled = !this.#t.some((e) => this.#H(e)), this.upBtn.disabled = !e.parent, this.newBtn.disabled = this.inTrash || !!this.inTag, this.listBtn.classList.toggle("on", this.#n === "list"), this.gridBtn.classList.toggle("on", this.#n === "grid"), this.listBtn.setAttribute("aria-pressed", String(this.#n === "list")), this.gridBtn.setAttribute("aria-pressed", String(this.#n === "grid")), this.search.placeholder = w("toolbar.searchIn", { name: D(e) });
		let t = this.inTrash || this.inTag ? [e] : a.ancestors(this.folder);
		this.crumbs.replaceChildren(...t.flatMap((e, n) => {
			let r = n === t.length - 1 ? o("span", {
				class: "fm-crumb current",
				"aria-current": "page"
			}, D(e)) : o("button", {
				class: "fm-crumb",
				type: "button",
				onclick: () => this.go(e.id)
			}, D(e));
			return a.exists(e.id) && se(r, e), n ? [o("span", {
				class: "fm-crumb-sep",
				"aria-hidden": "true"
			}, "›"), r] : [r];
		}));
	}
	#y() {
		let e = a.children(a.root), t = new Set(a.ancestors(this.folder).map((e) => e.id)), n = [{
			key: "root",
			id: a.root,
			name: w("place.home"),
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
			let t = Z + e.id;
			return o("button", {
				class: t === r ? "fm-place fm-tag on" : "fm-place fm-tag",
				type: "button",
				"aria-current": t === r ? "true" : null,
				title: e.visible ? e.name : w("side.tagHidden", { name: e.name }),
				onclick: () => this.go(t)
			}, o("span", {
				class: "tag-dot",
				style: { background: e.color },
				"aria-hidden": "true"
			}), o("span", {}, e.name), e.visible ? null : c("eyeOff"));
		}, u = m.list(), d = n.map((e) => e.key);
		this.#f = {
			defaults: d,
			desk: n.find((e) => e.key === "desk")?.id
		};
		let f = (e, t, { node: n, folder: r } = {}) => (t.dataset.entry = e, r && (t.dataset.folder = r), t.addEventListener("pointerdown", (e) => {
			e.button === 0 && !e.target.closest(".fm-link-x") && _(e, {
				ids: [n],
				stack: this.history
			});
		}), t), p = (e) => {
			let t = e.id === this.folder, n = () => this.#b(e), r = o("button", {
				class: t ? "fm-place fm-link on" : "fm-place fm-link",
				type: "button",
				"aria-current": t ? "true" : null,
				title: `${O(e)} › ${e.name}`,
				onclick: () => this.open(e)
			}, o("span", { class: "fm-link-icon" }, b(e)), o("span", {}, e.name));
			r.addEventListener("contextmenu", (t) => {
				t.preventDefault(), l(t.clientX, t.clientY, [
					{
						label: w("menu.open"),
						icon: "open",
						action: () => this.open(e)
					},
					{
						label: w("menu.reveal"),
						icon: "folderOpen",
						action: () => this.reveal(e.id)
					},
					"-",
					{
						label: w("menu.unlink"),
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
				title: w("side.unlinkTitle"),
				"aria-label": w("link.remove", { name: e.name }),
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
			id: X,
			name: w("place.trash"),
			glyph: "trash"
		});
		g.dataset.trash = "", this.side.replaceChildren(o("section", {
			class: "fm-side-links",
			"aria-label": w("side.links")
		}, o("h6", {}, w("side.links")), ...S.arrange(d).flatMap(h)), ...u.length ? [o("h6", {}, w("side.tags")), ...u.map(s)] : [], o("hr", { class: "fm-side-sep" }), g, this.gap);
	}
	#b(e) {
		let { defaults: t } = this.#f, n = S.arrange(t).indexOf(e.id);
		n < 0 || (S.remove(e.id), this.history.push({
			label: w("link.remove", { name: e.name }),
			undo: () => S.place([e.id], n, t),
			redo: () => S.remove(e.id)
		}), h(w("toast.unlinked", { name: e.name })), this.list.focus());
	}
	#x(e) {
		return e === a.root ? "root" : e === this.#f.desk ? "desk" : a.exists(e) ? e : null;
	}
	#S(e, t, n, r) {
		let i = e?.closest?.("[data-trash]");
		if (i) return r.some((e) => !a.get(e)?.system) ? {
			el: i,
			run: (e, t) => this.#C(r, t)
		} : null;
		let o = this.side.querySelector(".fm-side-links");
		if (!o?.contains(e)) return null;
		let s = [...o.querySelectorAll(":scope > [data-entry]")], c = e.closest("[data-entry]");
		if (c && s.includes(c)) {
			let e = c.getBoundingClientRect(), t = Math.min(8, e.height / 4), { folder: i } = c.dataset;
			if (i && n > e.top + t && n < e.bottom - t) {
				let e = ce(r, i);
				return e && {
					el: c,
					run: (t, n) => le(n, e, i)
				};
			}
		}
		let l = s.findIndex((e) => {
			let t = e.getBoundingClientRect();
			return n < t.top + t.height / 2;
		});
		l < 0 && (l = s.length);
		let u = [...new Set(r.map((e) => this.#x(e)).filter(Boolean))], { defaults: d } = this.#f;
		if (!S.changes(u, l, d)) return null;
		let f = this.side.getBoundingClientRect(), p = l < s.length ? s[l].getBoundingClientRect().top : s[s.length - 1].getBoundingClientRect().bottom;
		return this.gap.style.top = `${p - f.top + this.side.scrollTop}px`, {
			el: this.gap,
			run: () => {
				let e = S.place(u, l, d);
				e && h(w("toast.linksAdded", {
					n: e,
					count: T(e)
				}));
			}
		};
	}
	#C(e, t) {
		let n = e.filter((e) => !a.get(e)?.system).length;
		pe(t, e), h(w("toast.trashed", {
			n,
			count: T(n)
		}));
	}
	#w() {
		return (this.inTrash ? Be : this.inTag ? Ve : ze)();
	}
	#T(e = null) {
		let { template: t, min: n } = this.#i.layout(this.#i.shown(this.#w()), e);
		this.list.style.setProperty("--fm-cols", t), this.list.style.setProperty("--fm-min", n);
	}
	#E(e) {
		let t = this.list.querySelectorAll(`[data-col="${e}"]`);
		if (!t.length) return;
		this.#T(e);
		let n = 48;
		for (let e of t) n = Math.max(n, e.offsetWidth + 1);
		this.#i.resize(e, n), this.#T();
	}
	#D(e, t) {
		this.#i.setHidden(e, !t), !t && this.#r.key === e && (this.#r = {
			key: "name",
			dir: 1
		}), this.render();
	}
	#O() {
		let e = this.#w();
		return [
			...e.map((e) => {
				let t = e.key === "name" || !this.#i.hidden.has(e.key);
				return {
					label: e.label,
					icon: t ? "check" : null,
					disabled: e.key === "name",
					action: () => this.#D(e.key, !t)
				};
			}),
			"-",
			{
				label: w("columns.fitAll"),
				icon: "fit",
				action: () => this.#i.shown(e).forEach((e) => this.#E(e.key))
			},
			{
				label: w("columns.reset"),
				icon: "undo",
				action: () => {
					this.#i.reset(), this.render();
				}
			}
		];
	}
	#k(e) {
		let t = o("span", {
			class: "fm-grip",
			role: "separator",
			tabindex: "-1",
			"aria-orientation": "vertical",
			"aria-label": w("column.resize", { name: e.label }),
			title: w("column.resizeTitle")
		}), n = () => t.parentElement.offsetWidth;
		return t.addEventListener("pointerdown", (t) => {
			if (t.button !== 0) return;
			t.preventDefault();
			let r = n();
			this.list.classList.add("resizing"), g(t, {
				threshold: 0,
				onMove: (t) => {
					this.#i.resize(e.key, r + t, !1), this.#T();
				},
				onEnd: (e) => {
					this.list.classList.remove("resizing"), e && this.#i.save();
				}
			});
		}), t.addEventListener("dblclick", () => this.#E(e.key)), t.addEventListener("keydown", (t) => {
			let r = t.shiftKey ? 48 : 16, i = {
				ArrowLeft: -r,
				ArrowRight: r
			}[t.key];
			i !== void 0 && (t.preventDefault(), this.#i.resize(e.key, n() + i), this.#T());
		}), t;
	}
	#A() {
		let e = this.#i.shown(this.#w());
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
			}, n, this.#k(e));
		}));
	}
	#j(e) {
		let t = this.#M(e);
		return this.#F(e, "fm-row", ...this.#i.shown(this.#w()).map((e) => {
			let n = t[e.key] ?? o("span");
			return n.dataset.col = e.key, n;
		}));
	}
	#M(e) {
		if (e.trashed) {
			let t = k(e);
			return {
				name: o("span", { class: "fm-name" }, o("span", { class: "fm-icon" }, b(e)), this.#P(e)),
				deleted: o("span", {}, F(e.trashed.at)),
				size: o("span", { class: "num" }, N(e)),
				type: o("span", {}, E(e)),
				origin: o("span", { title: w("trash.restoresTo", { place: t }) }, t)
			};
		}
		let t = this.inTag ? O(e) : "";
		return {
			name: o("span", { class: "fm-name" }, o("span", { class: "fm-icon" }, b(e)), this.#P(e), C(e)),
			modified: o("span", {}, F(e.modified)),
			size: o("span", { class: "num" }, N(e)),
			type: o("span", {}, E(e)),
			workspace: be(e),
			location: o("span", { title: t }, t)
		};
	}
	#N(e) {
		let t = this.#F(e, "fm-tile", o("span", { class: "fm-tile-icon" }, b(e), C(e, "fm-tile-tags")), this.#P(e)), n = (e.tags ?? []).map((e) => m.get(e)?.name).filter(Boolean), r = e.trashed ? [w("tile.deleted", { date: F(e.trashed.at) }), w("tile.origin", { place: k(e) })] : [
			this.inTag && w("tile.location", { place: O(e) }),
			w("owner.label", { name: A(e) }),
			n.length && w("tile.tags", { names: n.join(", ") })
		];
		return t.title = [e.name, ...r.filter(Boolean)].join("\n"), t;
	}
	#P(e) {
		return this.#u === e.id ? o("input", {
			class: "fm-rename",
			type: "text",
			value: e.name,
			spellcheck: "false",
			"aria-label": w("rename.label")
		}) : o("span", {
			class: "fm-label",
			title: e.name
		}, e.name);
	}
	#F(e, t, ...n) {
		let r = this.#s.has(e.id), i = o("div", {
			class: [
				t,
				r && "selected",
				e.id === this.#l && "cursor"
			].filter(Boolean).join(" "),
			id: `fm-${e.id}`,
			role: "option",
			"aria-selected": String(r),
			dataset: { id: e.id }
		}, ...n);
		return e.trashed ? i : se(i, e);
	}
	#I(e) {
		let { key: t, dir: n } = this.#r, r = (e) => t === "type" ? E(e) : t === "workspace" ? A(e) : t === "size" ? e.type === "folder" ? e.trashed ? e.inside : a.children(e.id).length : e.size ?? 0 : t === "modified" ? e.modified : t === "deleted" ? e.trashed?.at ?? e.modified : t === "origin" && e.trashed ? k(e) : t === "location" ? O(e) : e.name, i = {
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
	#L(e, t = e[e.length - 1] ?? this.#l) {
		this.#s = new Set(e), this.#l = t, this.render();
	}
	#R() {
		let { signal: e } = this.win, t = (e) => e.target.closest?.("[role=\"option\"]");
		this.list.addEventListener("pointerdown", (e) => {
			if (e.button !== 0 || e.target.closest(".fm-rename, .fm-head")) return;
			let n = t(e);
			if (!n) {
				e.ctrlKey || e.metaKey || e.shiftKey || this.#L([]);
				return;
			}
			let r = n.dataset.id, i = this.#o.map((e) => e.id), a = !1;
			if (e.shiftKey && this.#c && i.includes(this.#c)) {
				let [t, n] = [i.indexOf(this.#c), i.indexOf(r)].sort((e, t) => e - t), a = i.slice(t, n + 1);
				this.#L(e.ctrlKey || e.metaKey ? [.../* @__PURE__ */ new Set([...this.#s, ...a])] : a, r);
			} else if (e.ctrlKey || e.metaKey) {
				let e = new Set(this.#s);
				e.has(r) ? e.delete(r) : e.add(r), this.#c = r, this.#L([...e], r);
			} else this.#c = r, this.#s.has(r) ? a = this.#s.size > 1 : this.#L([r], r);
			!this.inTrash && this.#s.has(r) && _(e, {
				ids: [...this.#s],
				stack: this.history,
				onEnd: ({ moved: e }) => {
					!e && a && this.#L([r], r);
				}
			});
		}, { signal: e }), this.list.addEventListener("dblclick", (e) => {
			let n = t(e);
			if (!n || e.target.closest(".fm-rename")) return;
			if (this.inTrash) return this.openSelected();
			let r = a.get(n.dataset.id);
			r && this.open(r);
		}, { signal: e }), this.list.addEventListener("contextmenu", (e) => {
			if (e.preventDefault(), e.target.closest(".fm-head")) return l(e.clientX, e.clientY, this.#O());
			let n = t(e);
			if (!n) return this.#B(e);
			this.#s.has(n.dataset.id) || this.#L([n.dataset.id], n.dataset.id), this.#V(e);
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
			let t = this.#z(e.key);
			if (t == null || !this.#o.length) return;
			e.preventDefault();
			let n = this.#o.map((e) => e.id), r = n.indexOf(this.#l), i = t === -Infinity ? 0 : t === Infinity ? n.length - 1 : Math.max(0, Math.min(n.length - 1, (r < 0 ? 0 : r) + t)), a = n[i];
			if (e.shiftKey) {
				this.#c ||= this.#l ?? a;
				let [e, t] = [n.indexOf(this.#c), i].sort((e, t) => e - t);
				this.#L(n.slice(e, t + 1), a);
			} else this.#c = a, this.#L([a], a);
			this.list.querySelector(`#fm-${CSS.escape(a)}`)?.scrollIntoView({ block: "nearest" });
		}, { signal: e });
	}
	#z(e) {
		let t = this.#n === "grid" ? Math.max(1, Math.floor(this.list.clientWidth / 92)) : 1;
		return {
			ArrowDown: t,
			ArrowUp: -t,
			Home: -Infinity,
			End: Infinity,
			...this.#n === "grid" && {
				ArrowRight: 1,
				ArrowLeft: -1
			}
		}[e] ?? null;
	}
	#B(e) {
		let t = {
			label: this.#n === "list" ? w("view.grid") : w("view.list"),
			icon: this.#n === "list" ? "grid" : "list",
			action: () => this.setView(this.#n === "list" ? "grid" : "list")
		}, n = this.#n === "list" && {
			label: w("columns.menu"),
			icon: "list",
			items: this.#O()
		};
		if (this.inTrash) {
			let r = !this.#o.length;
			return l(e.clientX, e.clientY, [
				{
					label: w("menu.restoreAll"),
					icon: "undo",
					disabled: r,
					action: () => this.restore(a.trashed().map((e) => e.id))
				},
				{
					label: w("menu.emptyTrash"),
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
				label: w("menu.manageTags"),
				icon: "gear",
				action: () => x("settings", { tab: "tags" })
			},
			"-",
			t,
			n
		].filter(Boolean));
		l(e.clientX, e.clientY, [
			{
				label: w("menu.newFolder"),
				icon: "folderPlus",
				action: () => this.create("folder")
			},
			{
				label: w("menu.newTextFile"),
				icon: "filePlus",
				action: () => this.create("file")
			},
			"-",
			t,
			n
		].filter(Boolean));
	}
	#V(e) {
		let t = this.#o.filter((e) => this.#s.has(e.id)), n = t.length > 1, r = T(t.length);
		if (this.inTrash) {
			let i = t.map((e) => e.id);
			return l(e.clientX, e.clientY, [
				{
					label: n ? w("menu.restoreMany", { count: r }) : w("menu.restore"),
					icon: "undo",
					action: () => this.restore(i)
				},
				{
					label: w("menu.info"),
					icon: "info",
					shortcut: f.label("files.info"),
					action: () => this.info.setOpen(!0)
				},
				"-",
				{
					label: w("menu.purge"),
					icon: "trash",
					shortcut: f.label("items.delete"),
					danger: !0,
					action: () => this.purge(i)
				}
			]);
		}
		let i = t.some((e) => e.system), a = t.map((e) => e.id), o = this.inTag;
		l(e.clientX, e.clientY, [
			{
				label: n ? w("menu.openMany", { count: r }) : w("menu.open"),
				icon: "open",
				shortcut: f.label("items.open"),
				action: () => this.openSelected()
			},
			!n && t[0].type === "file" && {
				label: w("menu.openWith"),
				icon: "open",
				action: () => de(t[0], { choose: !0 })
			},
			!n && t[0].type === "folder" && {
				label: w("menu.openInEditor"),
				icon: "code",
				action: () => x("editor", { folder: t[0].id })
			},
			o && !n && {
				label: w("menu.reveal"),
				icon: "folderOpen",
				action: () => this.reveal(t[0].id)
			},
			{
				label: w("menu.rename"),
				icon: "pencil",
				shortcut: f.label("items.rename"),
				disabled: n || i,
				action: () => this.rename(t[0].id)
			},
			ve(a),
			o && {
				label: w("menu.untag", { name: o.name }),
				icon: "x",
				action: () => ge(a, o.id, !1)
			},
			oe(a),
			{
				label: w("menu.info"),
				icon: "info",
				shortcut: f.label("files.info"),
				action: () => this.info.setOpen(!0)
			},
			!n && {
				label: w("menu.properties"),
				icon: "info",
				action: () => _e(t[0].id)
			},
			"-",
			{
				label: n ? w("menu.deleteMany", { count: r }) : w("menu.delete"),
				icon: "trash",
				shortcut: f.label("items.delete"),
				danger: !0,
				disabled: i,
				action: () => this.remove(t.map((e) => e.id))
			}
		].filter(Boolean));
	}
	#H(e) {
		return e === X || !!Q(e) || a.exists(e);
	}
	#U(e) {
		let t = this.list.querySelector(`[data-id="${CSS.escape(e)}"]`)?.getBoundingClientRect();
		return {
			x: t ? t.left + 40 : innerWidth / 2,
			y: t ? t.bottom : innerHeight / 2
		};
	}
	#W(e, t) {
		for (; e.length;) {
			let n = e.pop();
			if (this.#H(n)) {
				t.push(this.folder), this.go(n, !1);
				return;
			}
		}
	}
	#G(e) {
		this.#d = e, this.render();
	}
	#K(e) {
		let t = e.node && S.has(e.node.id);
		if (this.inTrash) return t ? this.render() : void 0;
		if (this.inTag) return this.render();
		if (e.type === "remove" && e.ids.includes(this.folder)) return this.go(e.parent && a.exists(e.parent) ? e.parent : a.root, !1);
		let n = e.parent === this.folder || e.from === this.folder, r = e.type !== "remove" && a.isInside(this.folder, e.node.id), i = [e.parent, e.from].some((e) => e && a.exists(e) && a.get(e).parent === this.folder);
		(n || r || i || t) && (n && e.type !== "rename" && (this.#d = ""), this.render());
	}
};
export { Ue as default };
