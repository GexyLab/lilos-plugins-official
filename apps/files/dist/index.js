import * as e from "/host/sdk.js";
import { UndoStack as t, Window as n, appIcon as r, fileType as i, fs as a, h as o, history as s, icon as c, openMenu as l, session as u, settings as d, shortcuts as f, storage as p, tags as m, toast as h, trackDrag as g } from "/host/sdk.js";
import { DESK_NAME as ee, SYSTEM_FOLDERS as te, addTarget as ne, confirmRemove as re, describeWorkspace as _, dragItems as ie, dropZone as ae, getApp as v, handleCommand as oe, itemIcon as y, launch as b, linkEntry as se, links as x, markItem as ce, movableInto as le, moveInto as ue, onWorkspacesChange as de, openFile as S, recordCreated as fe, removeNodes as pe, renameNode as me, restoreNodes as he, setTag as ge, showProperties as _e, tagDots as ve, tagSubmenu as ye } from "/host/system.js";
// src/shared/i18n.js
function be(t, n) {
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
var { t: C } = be("files", {
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
}), w = (e) => e.toLocaleString(u.locale), T = (e) => e.type === "folder" ? C("type.folder") : e.type === "app" ? C("type.app") : i(e.name).label, E = (e) => e.id === a.root ? C("place.home") : e.name, D = (e) => e.parent === a.root ? C("place.home") : a.path(e.parent);
function O(e) {
	let t = e.trashed.from;
	return a.exists(t) && t !== a.root ? a.path(t) : C("place.home");
}
function k(e) {
	let t = _(e.workspace);
	return t ? t.removed ? C("owner.removed", { name: t.name }) : t.name : e.workspace ? C("owner.unknown") : C("owner.shared");
}
function A(e) {
	let t = _(e.workspace), n = o("span", {
		class: "ws-owner-dot",
		"aria-hidden": "true"
	});
	return t && (n.style.background = t.color), o("span", {
		class: [
			"ws-owner",
			!t && "shared",
			t?.removed && "removed"
		].filter(Boolean).join(" "),
		title: C("owner.label", { name: k(e) })
	}, n, o("span", {}, k(e)));
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
var M = (e) => C("count.items", {
	n: e,
	count: w(e)
});
function xe(e) {
	return e.type === "folder" ? M(e.trashed ? e.inside : a.children(e.id).length) : e.type === "file" ? j(e.size ?? 0) : "—";
}
function N() {
	let e = d.get("trashRetention");
	return e <= 0 ? C("trash.keptForever") : C("trash.keptDays", {
		n: e,
		count: w(e)
	});
}
var P = (e) => new Date(e).toLocaleString(u.locale, {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit"
}), F = "files-panels", I = 720, Se = class {
	open;
	width;
	constructor({ key: e, title: t, resizeLabel: n, closeLabel: r, width: i, open: a = !1, room: s, onLayout: l, signal: u }) {
		this.key = e, this.defaultWidth = i, this.room = s, this.onLayout = l;
		let d = p.get(F, {})?.[e];
		this.open = typeof d?.open == "boolean" ? d.open : a, this.width = Number.isFinite(d?.width) ? Ce(d.width, 180, I) : i, this.split = o("div", {
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
		this.el.style.width = `${e}px`, this.split.setAttribute("aria-valuenow", e), this.split.setAttribute("aria-valuemax", Math.max(180, Math.min(I, this.room())));
	}
	resize(e, t = !0) {
		this.width = Math.round(Ce(e, 180, Math.max(180, Math.min(I, this.room())))), t && this.#t(), this.onLayout();
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
		let e = p.get(F, {});
		p.set(F, {
			...e && typeof e == "object" ? e : {},
			[this.key]: {
				open: this.open,
				width: this.width
			}
		});
	}
}, Ce = (e, t, n) => Math.max(t, Math.min(e, n)), L = 1e5, we = 5 << 20, R = 30, z = 200, B = (e) => e < 1024 ? j(e) : C("info.bytesDetail", {
	size: j(e),
	count: w(e)
});
function V(e) {
	let t = 0;
	for (let n of a.children(e)) t += n.type === "folder" ? V(n.id) : n.size ?? 0;
	return t;
}
var H = (e) => e.trashed ? e.bytes ?? 0 : e.type === "folder" ? V(e.id) : e.size ?? 0, U = (e) => e?.type === "file" && !e.trashed, W = (e) => `${e.id}:${e.modified}:${e.size ?? 0}`;
function G(e) {
	let t = e.map((e) => m.get(e)).filter(Boolean);
	return t.length ? o("span", { class: "fm-chips" }, t.map((e) => o("span", {
		class: "fm-chip",
		title: e.visible ? e.name : C("info.tagHidden", { name: e.name })
	}, o("span", {
		class: "tag-dot",
		style: { background: e.color },
		"aria-hidden": "true"
	}), e.name))) : C("info.none");
}
var K = (e) => o("dl", { class: "fm-facts" }, e.filter(Boolean).flatMap(([e, t, n]) => [o("dt", {}, e), o("dd", { class: n }, t)])), q = (e, ...t) => o("section", { class: "fm-info-section" }, o("h6", {}, e), ...t);
function J(e, t, n) {
	return o("div", { class: "fm-info-head" }, o("span", { class: "fm-info-icon" }, e), o("div", { class: "fm-info-titles" }, o("div", {
		class: "fm-info-name",
		title: t
	}, t), n && o("div", { class: "fm-info-kind" }, n)));
}
function Te({ nodes: e, place: t, text: n }) {
	return e.length > 1 ? Ee(e) : e.length === 1 ? Y(e[0], n) : t.trash ? De() : t.tag ? Oe(t.tag) : o("div", {}, o("p", { class: "fm-info-hint" }, C("info.folderHint")), Y(t.node, n));
}
function Y(e, t) {
	let { ext: n } = i(e.name), r = e.type === "app" ? v(e.app) : null, s = [[C("info.type"), e.type === "file" && n ? `${T(e)} (.${n})` : e.type === "app" ? C("type.appLink") : T(e)], e.type === "app" && [C("info.app"), r ? r.name : C("info.appMissing", { id: e.app })]];
	if (e.type === "file" && s.push([C("info.size"), B(e.size ?? 0)]), e.type === "folder") {
		let t = e.trashed ? null : a.children(e.id).length, n = e.trashed ? e.inside : a.count(e.id);
		s.push([C("info.contents"), t === null || n === t ? M(n) : C("info.contentsTotal", {
			items: M(t),
			total: w(n)
		})]), s.push([C("info.size"), B(H(e))]);
	}
	e.trashed ? s.push([C("info.deleted"), P(e.trashed.at)], [
		C("info.origin"),
		O(e),
		"mono"
	]) : s.push([
		C("info.path"),
		a.path(e.id),
		"mono"
	]), s.push([C("info.created"), P(e.created)], [C("info.modified"), P(e.modified)]);
	let c = [
		e.system && C("note.system"),
		e.private && C("note.private"),
		!e.trashed && a.isHidden(e.id) && C("note.hidden"),
		!e.trashed && x.has(e.id) && C("note.linked")
	].filter(Boolean), l = o("div", {}, J(y(e), E(e), T(e)), q(C("info.general"), K(s)), q(C("info.organization"), K([[C("info.workspace"), A(e)], [C("info.tags"), G(e.tags ?? [])]])), c.length ? q(C("info.attributes"), o("ul", { class: "fm-notes" }, c.map((e) => o("li", {}, e)))) : null);
	if (U(e) && (e.size ?? 0) <= we) {
		let n = o("dd", {}, "…"), r = o("dd", {}, "…"), i = o("dd", {}, "…");
		l.append(q(C("info.text"), o("dl", { class: "fm-facts" }, o("dt", {}, C("info.lines")), n, o("dt", {}, C("info.words")), r, o("dt", {}, C("info.chars")), i))), t(e).then((e) => {
			n.textContent = w(e ? e.split("\n").length : 0), r.textContent = w(e.trim() ? e.trim().split(/\s+/).length : 0), i.textContent = w([...e].length);
		}, () => {
			n.textContent = r.textContent = i.textContent = "—";
		});
	}
	return l;
}
function Ee(e) {
	let t = (t) => e.filter((e) => e.type === t).length, n = t("folder"), r = t("file"), i = t("app"), s = [
		n && C("info.folders", {
			n,
			count: w(n)
		}),
		r && C("info.files", {
			n: r,
			count: w(r)
		}),
		i && C("info.apps", {
			n: i,
			count: w(i)
		})
	].filter(Boolean).join(", "), c = e.reduce((e, t) => e + (t.type === "folder" ? t.trashed ? t.inside : a.count(t.id) : 0), 0), l = /* @__PURE__ */ new Map();
	for (let t of e) l.set(T(t), (l.get(T(t)) ?? 0) + 1);
	let u = new Set(e.map((e) => e.parent)), d = e.map((e) => e.modified), f = [...new Set(e.map(k))], p = [...new Set(e.flatMap((e) => e.tags ?? []))], m = p.filter((t) => e.every((e) => e.tags?.includes(t))), h = e.every((e) => e.trashed), g = o("span", { class: "fm-info-stack" }, e.slice(0, 3).map((e) => o("span", {}, y(e))));
	return o("div", {}, J(g, C("selection.count", { count: w(e.length) }), s), q(C("info.general"), K([
		[C("info.size"), B(e.reduce((e, t) => e + H(t), 0))],
		c > 0 && [C("info.contents"), C("info.insideFolders", {
			n: c,
			count: w(c)
		})],
		[C("info.types"), [...l].sort((e, t) => t[1] - e[1]).map(([e, t]) => `${e} ${w(t)}`).join(" · ")],
		!h && [
			C("info.location"),
			u.size === 1 ? D(e[0]) : C("info.manyFolders", { count: w(u.size) }),
			u.size === 1 ? "mono" : null
		],
		[C("info.oldest"), P(Math.min(...d))],
		[C("info.newest"), P(Math.max(...d))]
	])), q(C("info.organization"), K([
		[C("info.workspace"), f.join(", ")],
		[C("info.tags"), G(p)],
		p.length > 0 && [C("info.common"), G(m)]
	])), q(C("info.items"), o("ul", { class: "fm-names" }, e.slice(0, R).map((e) => o("li", { title: e.name }, o("span", { class: "fm-icon" }, y(e)), o("span", {}, e.name))), e.length > R ? o("li", { class: "more" }, C("list.more", { count: w(e.length - R) })) : null)));
}
function De() {
	let e = a.trashed(), t = e.reduce((e, t) => e + 1 + t.inside, 0);
	return o("div", {}, J(o("span", { class: "fm-info-glyph" }, c("trash")), C("place.trash"), M(e.length)), q(C("info.general"), K([
		[C("info.contents"), e.length ? C("info.contentsTotal", {
			items: M(e.length),
			total: w(t)
		}) : M(0)],
		[C("info.size"), B(e.reduce((e, t) => e + (t.bytes ?? 0), 0))],
		e.length > 0 && [C("info.lastDeleted"), P(e[0].trashed.at)],
		[C("info.retention"), N()]
	])));
}
function Oe(e) {
	let t = a.tagged(e.id);
	return o("div", {}, J(o("span", {
		class: "tag-dot fm-info-tag",
		style: { background: e.color },
		"aria-hidden": "true"
	}), e.name, C("info.tagKind")), q(C("info.general"), K([
		[C("info.items"), M(t.length)],
		[C("info.size"), B(t.reduce((e, t) => e + H(t), 0))],
		[C("info.visibility"), e.visible ? C("info.visible") : C("info.invisible")]
	])));
}
var ke = class {
	#e = null;
	#t = null;
	constructor(e, { text: t, open: n }) {
		this.body = e, this.text = t, this.open = n;
	}
	update(e) {
		let t = e.length === 1 ? e[0] : null, n = t ? `${W(t)}:${t.name}:${t.type === "folder" && !t.trashed ? a.children(t.id).map((e) => e.id + e.name).join() : ""}` : `${e.length}`;
		if (n === this.#e) return;
		if (this.#e = n, this.#s(), !t) return this.#o(e.length ? X("list", C("selection.count", { count: w(e.length) }), C("preview.oneAtATime")) : X("file", C("preview.none"), C("preview.selectFile")));
		if (t.trashed) return this.#o(this.#n(t), X("trash", C("preview.trashed"), C("preview.restoreToSee")));
		if (t.type === "folder") return this.#o(this.#n(t), this.#i(t));
		if (t.type === "app") return this.#o(this.#n(t), this.#a(t));
		let r = o("div", { class: "fm-preview-wait" }, C("preview.loading"));
		this.#o(this.#n(t), r), this.text(t).then((e) => {
			this.#e === n && r.replaceWith(this.#r(t, e));
		}, (e) => {
			this.#e === n && r.replaceWith(X("x", C("preview.readError"), e?.message ?? ""));
		});
	}
	destroy() {
		this.#s();
	}
	#n(e) {
		let t = e.trashed ? null : e.type === "app" ? C("preview.launch") : C("preview.open");
		return o("div", { class: "fm-preview-head" }, o("span", { class: "fm-icon" }, y(e)), o("span", {
			class: "fm-preview-name",
			title: e.name
		}, E(e)), t && o("button", {
			class: "fm-preview-open",
			type: "button",
			onclick: () => this.open(e)
		}, t));
	}
	#r(e, t) {
		if (!t) return X("file", C("preview.emptyFile"), "");
		let { ext: n } = i(e.name);
		if (n === "svg" && /^\s*(<\?xml[^>]*>\s*)?(<!--[\s\S]*?-->\s*)*<svg[\s>]/i.test(t)) return this.#t = URL.createObjectURL(new Blob([t], { type: "image/svg+xml" })), o("div", { class: "fm-preview-image" }, o("img", {
			src: this.#t,
			alt: C("preview.imageAlt", { name: e.name })
		}));
		if (t.slice(0, 8e3).includes("\0")) return X("file", C("preview.unavailable"), C("preview.notText"));
		let r = t.length > L;
		return o("div", { class: "fm-preview-textwrap" }, o("pre", {
			class: "fm-preview-text",
			tabindex: "0",
			"aria-label": C("preview.contentsOf", { name: e.name })
		}, r ? t.slice(0, L) : t), r ? o("div", { class: "fm-preview-note" }, C("preview.cut", {
			shown: w(L),
			total: w(t.length)
		})) : null);
	}
	#i(e) {
		let t = a.children(e.id);
		if (!t.length) return X("folder", C("preview.emptyFolder"), "");
		let n = {
			folder: 0,
			file: 1,
			app: 1
		};
		return t.sort((e, t) => n[e.type] - n[t.type] || e.name.localeCompare(t.name, u.locale, { numeric: !0 })), o("ul", {
			class: "fm-preview-list",
			"aria-label": C("preview.contentsOf", { name: e.name })
		}, t.slice(0, z).map((e) => o("li", {
			title: C("preview.childTitle", { name: e.name }),
			ondblclick: () => this.open(e)
		}, o("span", { class: "fm-icon" }, y(e)), o("span", { class: "fm-label" }, e.name))), t.length > z ? o("li", { class: "more" }, C("list.more", { count: w(t.length - z) })) : null);
	}
	#a(e) {
		let t = v(e.app);
		return t ? o("div", { class: "fm-preview-app" }, r(t), o("strong", {}, t.name)) : X("x", C("preview.appMissing"), e.app);
	}
	#o(...e) {
		this.body.replaceChildren(...e);
	}
	#s() {
		this.#t && URL.revokeObjectURL(this.#t), this.#t = null;
	}
};
function X(e, t, n) {
	return o("div", { class: "fm-preview-empty" }, c(e), o("strong", {}, t), n ? o("span", {}, n) : null);
}
// src/files/FilesApp.js
var Ae = 260, je = "files-view", Z = a.trashRoot, Me = () => [
	{
		key: "name",
		label: C("column.name")
	},
	{
		key: "modified",
		label: C("column.modified")
	},
	{
		key: "size",
		label: C("column.size"),
		num: !0
	},
	{
		key: "type",
		label: C("column.type")
	},
	{
		key: "workspace",
		label: C("column.workspace")
	}
], Ne = () => [
	{
		key: "name",
		label: C("column.name")
	},
	{
		key: "deleted",
		label: C("column.deleted")
	},
	{
		key: "size",
		label: C("column.size"),
		num: !0
	},
	{
		key: "type",
		label: C("column.type")
	},
	{
		key: "origin",
		label: C("column.origin")
	}
], Q = "tag:", Pe = () => [
	{
		key: "name",
		label: C("column.name")
	},
	{
		key: "location",
		label: C("column.location")
	},
	{
		key: "type",
		label: C("column.type")
	},
	{
		key: "workspace",
		label: C("column.workspace")
	}
], $ = (e) => typeof e == "string" && e.startsWith(Q) ? m.get(e.slice(4)) : null;
function Fe(e) {
	return e?.trash || e?.folder === Z ? Z : typeof e?.tag == "string" && m.get(e.tag) ? Q + e.tag : $(e?.folder) || e?.folder && a.exists(e.folder) ? e.folder : null;
}
function Ie({ args: e } = {}) {
	let t = new n({
		title: C("@name"),
		icon: "folder",
		width: 1e3,
		height: 520,
		minWidth: 520,
		minHeight: 300
	}), r = new Re(t);
	return r.go(Fe(e) ?? a.root, !1), t.on("launch", (e) => {
		let t = Fe(e);
		t && r.go(t);
	}), t.getState = () => ({ folder: r.folder }), t;
}
var Le = (e) => String(e).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(), Re = class {
	folder = a.root;
	#e = [];
	#t = [];
	#n = p.get(je) === "grid" ? "grid" : "list";
	#r = {
		key: "name",
		dir: 1
	};
	#i = "";
	#a = [];
	#o = /* @__PURE__ */ new Set();
	#s = null;
	#c = null;
	#l = null;
	#u = "";
	#d = {
		defaults: [],
		desk: null
	};
	#f = {
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
		this.backBtn = t("arrowLeft", C("toolbar.back"), () => this.back()), this.forwardBtn = t("arrowRight", C("toolbar.forward"), () => this.forward()), this.upBtn = t("arrowUp", C("toolbar.up"), () => this.up()), this.crumbs = o("nav", {
			class: "fm-path",
			"aria-label": C("toolbar.path")
		}), this.newBtn = t("folderPlus", C("menu.newFolder"), () => this.create("folder")), this.listBtn = t("list", C("view.list"), () => this.setView("list")), this.gridBtn = t("grid", C("view.grid"), () => this.setView("grid")), this.previewBtn = t("sidebar", "", () => this.preview.toggle()), this.infoBtn = t("info", "", () => this.info.toggle()), this.search = o("input", {
			type: "text",
			spellcheck: "false",
			"aria-label": C("toolbar.search")
		}), this.search.addEventListener("input", () => {
			this.#i = Le(this.search.value.trim()), this.render();
		}), this.search.addEventListener("keydown", (e) => {
			e.key === "Escape" && this.search.value && (e.stopPropagation(), this.search.value = "", this.#i = "", this.render()), e.key === "ArrowDown" && (e.preventDefault(), this.list.focus());
		}), this.side = o("aside", {
			class: "fm-side",
			"aria-label": C("side.label")
		}), this.list = o("div", {
			class: "fm-list",
			role: "listbox",
			tabindex: "0",
			"aria-multiselectable": "true",
			"aria-label": C("list.label")
		}), this.statusLeft = o("span"), this.statusRight = o("span", { class: "fm-status-right" });
		let n = (t, n, r, i) => new Se({
			key: t,
			...n,
			width: r,
			open: i,
			signal: e.signal,
			room: () => this.#h() - (t === "info" ? this.preview : this.info).shown,
			onLayout: () => {
				this.#g(), this.#p();
			}
		});
		this.preview = n("preview", {
			title: C("panel.preview.title"),
			resizeLabel: C("panel.preview.resize"),
			closeLabel: C("panel.preview.close")
		}, 300, !1), this.info = n("info", {
			title: C("panel.info.title"),
			resizeLabel: C("panel.info.resize"),
			closeLabel: C("panel.info.close")
		}, 260, !0), this.previewView = new ke(this.preview.body, {
			text: (e) => this.#m(e),
			open: (e) => this.open(e)
		}), this.main = o("div", { class: "fm" }, this.side, o("div", { class: "fm-main" }, this.list, o("div", { class: "fm-status" }, this.statusLeft, this.statusRight)), this.preview.el, this.info.el), e.body.append(o("div", { class: "fm-toolbar" }, this.backBtn, this.forwardBtn, this.upBtn, this.crumbs, this.newBtn, o("span", { class: "fm-sep" }), this.listBtn, this.gridBtn, o("span", { class: "fm-sep" }), this.previewBtn, this.infoBtn, o("label", { class: "fm-search" }, c("search"), this.search)), this.main);
		let r = new ResizeObserver(() => this.#g());
		r.observe(this.main), this.#A(), ae(this.list, { folder: () => this.inTrash || this.inTag ? null : this.folder }), this.gap = o("div", {
			class: "fm-gap",
			"aria-hidden": "true"
		}), ae(this.side, { target: (e, t, n, r) => this.#x(e, t, n, r) });
		let i = a.on("change", (e) => this.#R(e)), l = x.on("change", () => {
			this.#P(this.folder) && this.render();
		}), u = a.on("scope", () => {
			this.#P(this.folder) && this.render();
		}), d = de(() => {
			this.#P(this.folder) && this.render();
		}), f = a.on("trash", () => {
			this.inTrash && (this.#u = "", this.render());
		}), p = m.on("change", () => {
			if (this.folder.startsWith?.(Q) && !this.inTag) return this.go(a.root, !1);
			this.#P(this.folder) && this.render();
		}), h = ne({
			isActive: () => e.active,
			selectionSize: () => this.#o.size,
			open: () => this.openSelected(),
			rename: () => this.rename([...this.#o][0]),
			remove: () => this.remove([...this.#o]),
			selectAll: () => this.#k(this.#a.map((e) => e.id)),
			deselect: () => this.#k([])
		}), g = s.attach(e.el, this.history), ee = [oe("files.info", {
			isActive: () => e.active,
			run: () => this.info.toggle()
		}), oe("files.preview", {
			isActive: () => e.active,
			run: () => this.preview.toggle()
		})];
		e.on("destroy", () => {
			i(), l(), u(), d(), f(), p(), h(), g(), ee.forEach((e) => e()), r.disconnect(), this.previewView.destroy();
		});
	}
	get inTrash() {
		return this.folder === Z;
	}
	get inTag() {
		return $(this.folder);
	}
	go(e, t = !0) {
		if (e !== Z && !$(e) && a.get(e)?.type !== "folder") return;
		t && e !== this.folder && (this.#e.push(this.folder), this.#t = []);
		let n = this.folder;
		this.folder = e, this.#o.clear(), this.#l = null, this.#u = "", this.search.value = "", this.#i = "";
		let r = a.ancestors(n).find((t) => t.parent === e);
		this.#c = r?.id ?? null, r && this.#o.add(r.id), this.#s = this.#c, this.render(), this.list.scrollTop = 0;
	}
	reveal(e) {
		let t = a.get(e);
		t && (this.go(t.parent), a.isHidden(e) ? this.#L(C("message.hiddenByTag", { name: t.name })) : this.#k([e], e));
	}
	back() {
		this.#I(this.#e, this.#t);
	}
	forward() {
		this.#I(this.#t, this.#e);
	}
	up() {
		let e = a.get(this.folder)?.parent;
		e && this.go(e);
	}
	setView(e) {
		this.#n = e, p.set(je, e), this.render();
	}
	open(e) {
		if (e.type === "folder") return this.go(e.id);
		if (e.type === "app") return b(e.app);
		S(e);
	}
	openSelected() {
		if (this.inTrash) return this.#L(C("message.restoreToOpen"));
		let e = this.#a.filter((e) => this.#o.has(e.id)), t = e.find((e) => e.type === "folder");
		e.filter((e) => e.type !== "folder").forEach((e) => this.open(e)), t && this.go(t.id);
	}
	create(e) {
		if (this.inTrash || this.inTag) return;
		this.#i &&= (this.search.value = "", "");
		let t = a.create(this.folder, {
			type: e,
			name: C(e === "folder" ? "create.folderName" : "create.fileName")
		});
		this.#k([t.id]), this.rename(t.id, !0);
	}
	rename(e, t = !1) {
		let n = a.get(e);
		if (!n || n.system) return;
		this.#l = e, this.render();
		let r = this.list.querySelector(".fm-rename");
		if (!r) return;
		r.focus();
		let i = n.type === "file" ? n.name.lastIndexOf(".") : -1;
		r.setSelectionRange(0, i > 0 ? i : n.name.length);
		let o = !1, s = (i) => {
			if (o) return;
			o = !0, this.#l = null;
			let s = r.value.replace(/\s+/g, " ").trim();
			if (i && s && s !== n.name && a.exists(e)) try {
				me(t ? null : this.history, e, s);
			} catch (e) {
				this.#L(e.message);
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
		if (!t.length) return this.#L(C("message.systemFolders"));
		let { x: n, y: r } = this.#F(t[0]);
		re(t, n, r, this.history);
	}
	restore(e) {
		let t = he(this.history, e);
		if (!t.length) return;
		let n = [...new Set(t.map((e) => e.parent === a.root ? C("place.home") : a.path(e.parent)))], r = w(t.length);
		h(t.length === 1 ? C("toast.restored", {
			name: a.get(t[0].id).name,
			place: n[0]
		}) : n.length === 1 ? C("toast.restoredMany", {
			count: r,
			place: n[0]
		}) : C("toast.restoredManyPlaces", {
			count: r,
			folders: w(n.length)
		}));
	}
	purge(e) {
		let t = this.#a.filter((t) => e.includes(t.id));
		if (!t.length) return;
		let n = t.length === 1 ? C("confirm.purge", { name: t[0].name }) : C("confirm.purgeMany", { count: w(t.length) }), { x: r, y: i } = this.#F(t[0].id);
		l(r, i, [{
			label: n,
			icon: "trash",
			danger: !0,
			action: () => a.purge(t.map((e) => e.id))
		}, {
			label: C("confirm.cancel"),
			icon: "x",
			action: () => {}
		}]);
	}
	empty(e, t) {
		let n = a.trashed().length;
		n && l(e, t, [{
			label: C("confirm.emptyTrash", {
				n,
				count: w(n)
			}),
			icon: "trash",
			danger: !0,
			action: () => a.purgeTrash()
		}, {
			label: C("confirm.cancel"),
			icon: "x",
			action: () => {}
		}]);
	}
	render() {
		let e = this.inTag, t = this.inTrash ? {
			id: Z,
			name: C("place.trash"),
			parent: null
		} : e ? {
			id: this.folder,
			name: C("place.tag", { name: e.name }),
			parent: null
		} : a.get(this.folder);
		if (!t) return;
		this.win.setTitle(E(t), C("@name")), this.#_(t), this.#v();
		let n = this.inTrash ? a.trashed() : e ? a.tagged(e.id) : a.children(this.folder);
		this.#a = this.#O(this.#i ? n.filter((e) => Le(e.name).includes(this.#i)) : n);
		let r = new Set(this.#a.map((e) => e.id));
		this.#o = new Set([...this.#o].filter((e) => r.has(e))), r.has(this.#c) || (this.#c = this.#a[0]?.id ?? null);
		let i = this.list.scrollTop;
		this.list.classList.toggle("grid", this.#n === "grid"), this.#a.length ? this.#n === "list" ? this.list.replaceChildren(this.#C(), ...this.#a.map((e) => this.#w(e))) : this.list.replaceChildren(...this.#a.map((e) => this.#T(e))) : this.list.replaceChildren(o("div", { class: "fm-empty" }, this.#i ? C("empty.noMatch", { query: this.search.value.trim() }) : this.inTrash ? C("empty.trash") : C(e ? "empty.tag" : "empty.folder"))), this.list.scrollTop = i, this.list.setAttribute("aria-activedescendant", this.#c ? `fm-${this.#c}` : "");
		let s = n.length, c = this.#o.size;
		this.statusLeft.textContent = C("status.items", {
			n: s,
			count: w(s)
		}) + (c ? ` · ${C("status.selected", {
			n: c,
			count: w(c)
		})}` : ""), this.statusRight.textContent = this.#u || (this.inTrash ? N() : e ? e.visible ? C("status.tag") : C("status.tagHidden") : a.path(this.folder)), this.statusRight.classList.toggle("msg", !!this.#u), this.#p();
	}
	#p() {
		let e = [[
			this.previewBtn,
			this.preview,
			"files.preview",
			C("panel.preview.show"),
			C("panel.preview.hide")
		], [
			this.infoBtn,
			this.info,
			"files.info",
			C("panel.info.show"),
			C("panel.info.hide")
		]];
		for (let [t, n, r, i, a] of e) {
			let e = f.label(r), o = `${n.open ? a : i}${e ? ` (${e})` : ""}`;
			t.title = o, t.setAttribute("aria-label", o), t.setAttribute("aria-pressed", String(n.open)), t.classList.toggle("on", n.open);
		}
		if (!this.info.open && !this.preview.open) return;
		let t = this.#a.filter((e) => this.#o.has(e.id));
		if (this.preview.open && this.previewView.update(t), this.info.open) {
			let e = this.inTag, n = this.inTrash ? { trash: !0 } : e ? { tag: e } : { node: a.get(this.folder) };
			if (!n.trash && !n.tag && !n.node) return;
			let r = this.info.body, i = r.scrollTop;
			r.replaceChildren(Te({
				nodes: t,
				place: n,
				text: (e) => this.#m(e)
			})), r.scrollTop = i;
		}
	}
	#m(e) {
		if (!U(e)) return Promise.reject(Error(C("error.notFile")));
		let t = W(e);
		return this.#f.key !== t && (this.#f = {
			key: t,
			text: a.read(e.id)
		}), this.#f.text;
	}
	#h() {
		return this.main.clientWidth - this.side.offsetWidth - Ae;
	}
	#g() {
		let e = [this.preview, this.info].filter((e) => e.open);
		if (!e.length || !this.main.isConnected) return;
		let t = e.reduce((e, t) => e + t.width, 0), n = Math.min(1, Math.max(0, this.#h()) / t);
		e.forEach((e) => e.show(Math.max(180, Math.floor(e.width * n))));
	}
	#_(e) {
		this.backBtn.disabled = !this.#e.some((e) => this.#P(e)), this.forwardBtn.disabled = !this.#t.some((e) => this.#P(e)), this.upBtn.disabled = !e.parent, this.newBtn.disabled = this.inTrash || !!this.inTag, this.listBtn.classList.toggle("on", this.#n === "list"), this.gridBtn.classList.toggle("on", this.#n === "grid"), this.listBtn.setAttribute("aria-pressed", String(this.#n === "list")), this.gridBtn.setAttribute("aria-pressed", String(this.#n === "grid")), this.search.placeholder = C("toolbar.searchIn", { name: E(e) });
		let t = this.inTrash || this.inTag ? [e] : a.ancestors(this.folder);
		this.crumbs.replaceChildren(...t.flatMap((e, n) => {
			let r = n === t.length - 1 ? o("span", {
				class: "fm-crumb current",
				"aria-current": "page"
			}, E(e)) : o("button", {
				class: "fm-crumb",
				type: "button",
				onclick: () => this.go(e.id)
			}, E(e));
			return a.exists(e.id) && ce(r, e), n ? [o("span", {
				class: "fm-crumb-sep",
				"aria-hidden": "true"
			}, "›"), r] : [r];
		}));
	}
	#v() {
		let e = a.children(a.root), t = new Set(a.ancestors(this.folder).map((e) => e.id)), n = [{
			key: "root",
			id: a.root,
			name: C("place.home"),
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
			let t = Q + e.id;
			return o("button", {
				class: t === r ? "fm-place fm-tag on" : "fm-place fm-tag",
				type: "button",
				"aria-current": t === r ? "true" : null,
				title: e.visible ? e.name : C("side.tagHidden", { name: e.name }),
				onclick: () => this.go(t)
			}, o("span", {
				class: "tag-dot",
				style: { background: e.color },
				"aria-hidden": "true"
			}), o("span", {}, e.name), e.visible ? null : c("eyeOff"));
		}, u = m.list(), d = n.map((e) => e.key);
		this.#d = {
			defaults: d,
			desk: n.find((e) => e.key === "desk")?.id
		};
		let f = (e, t, { node: n, folder: r } = {}) => (t.dataset.entry = e, r && (t.dataset.folder = r), t.addEventListener("pointerdown", (e) => {
			e.button === 0 && !e.target.closest(".fm-link-x") && ie(e, {
				ids: [n],
				stack: this.history
			});
		}), t), p = (e) => {
			let t = e.id === this.folder, n = () => this.#y(e), r = o("button", {
				class: t ? "fm-place fm-link on" : "fm-place fm-link",
				type: "button",
				"aria-current": t ? "true" : null,
				title: `${D(e)} › ${e.name}`,
				onclick: () => this.open(e)
			}, o("span", { class: "fm-link-icon" }, y(e)), o("span", {}, e.name));
			r.addEventListener("contextmenu", (t) => {
				t.preventDefault(), l(t.clientX, t.clientY, [
					{
						label: C("menu.open"),
						icon: "open",
						action: () => this.open(e)
					},
					{
						label: C("menu.reveal"),
						icon: "folderOpen",
						action: () => this.reveal(e.id)
					},
					"-",
					{
						label: C("menu.unlink"),
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
				title: C("side.unlinkTitle"),
				"aria-label": C("link.remove", { name: e.name }),
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
			id: Z,
			name: C("place.trash"),
			glyph: "trash"
		});
		g.dataset.trash = "", this.side.replaceChildren(o("section", {
			class: "fm-side-links",
			"aria-label": C("side.links")
		}, o("h6", {}, C("side.links")), ...x.arrange(d).flatMap(h)), ...u.length ? [o("h6", {}, C("side.tags")), ...u.map(s)] : [], o("hr", { class: "fm-side-sep" }), g, this.gap);
	}
	#y(e) {
		let { defaults: t } = this.#d, n = x.arrange(t).indexOf(e.id);
		n < 0 || (x.remove(e.id), this.history.push({
			label: C("link.remove", { name: e.name }),
			undo: () => x.place([e.id], n, t),
			redo: () => x.remove(e.id)
		}), h(C("toast.unlinked", { name: e.name })), this.list.focus());
	}
	#b(e) {
		return e === a.root ? "root" : e === this.#d.desk ? "desk" : a.exists(e) ? e : null;
	}
	#x(e, t, n, r) {
		let i = e?.closest?.("[data-trash]");
		if (i) return r.some((e) => !a.get(e)?.system) ? {
			el: i,
			run: (e, t) => this.#S(r, t)
		} : null;
		let o = this.side.querySelector(".fm-side-links");
		if (!o?.contains(e)) return null;
		let s = [...o.querySelectorAll(":scope > [data-entry]")], c = e.closest("[data-entry]");
		if (c && s.includes(c)) {
			let e = c.getBoundingClientRect(), t = Math.min(8, e.height / 4), { folder: i } = c.dataset;
			if (i && n > e.top + t && n < e.bottom - t) {
				let e = le(r, i);
				return e && {
					el: c,
					run: (t, n) => ue(n, e, i)
				};
			}
		}
		let l = s.findIndex((e) => {
			let t = e.getBoundingClientRect();
			return n < t.top + t.height / 2;
		});
		l < 0 && (l = s.length);
		let u = [...new Set(r.map((e) => this.#b(e)).filter(Boolean))], { defaults: d } = this.#d;
		if (!x.changes(u, l, d)) return null;
		let f = this.side.getBoundingClientRect(), p = l < s.length ? s[l].getBoundingClientRect().top : s[s.length - 1].getBoundingClientRect().bottom;
		return this.gap.style.top = `${p - f.top + this.side.scrollTop}px`, {
			el: this.gap,
			run: () => {
				let e = x.place(u, l, d);
				e && h(C("toast.linksAdded", {
					n: e,
					count: w(e)
				}));
			}
		};
	}
	#S(e, t) {
		let n = e.filter((e) => !a.get(e)?.system).length;
		pe(t, e), h(C("toast.trashed", {
			n,
			count: w(n)
		}));
	}
	#C() {
		let e = (this.inTrash ? Ne : this.inTag ? Pe : Me)();
		return o("div", {
			class: this.inTag ? "fm-head tagged" : "fm-head",
			role: "presentation"
		}, e.map((e) => {
			let t = this.#r.key === e.key;
			return o("button", {
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
		}));
	}
	#w(e) {
		if (e.trashed) {
			let t = O(e);
			return this.#D(e, "fm-row", o("span", { class: "fm-name" }, o("span", { class: "fm-icon" }, y(e)), this.#E(e)), o("span", {}, P(e.trashed.at)), o("span", { class: "num" }, xe(e)), o("span", {}, T(e)), o("span", { title: C("trash.restoresTo", { place: t }) }, t));
		}
		let t = o("span", { class: "fm-name" }, o("span", { class: "fm-icon" }, y(e)), this.#E(e), ve(e));
		if (this.inTag) {
			let n = D(e);
			return this.#D(e, "fm-row tagged", t, o("span", { title: n }, n), o("span", {}, T(e)), A(e));
		}
		return this.#D(e, "fm-row", t, o("span", {}, P(e.modified)), o("span", { class: "num" }, xe(e)), o("span", {}, T(e)), A(e));
	}
	#T(e) {
		let t = this.#D(e, "fm-tile", o("span", { class: "fm-tile-icon" }, y(e), ve(e, "fm-tile-tags")), this.#E(e)), n = (e.tags ?? []).map((e) => m.get(e)?.name).filter(Boolean), r = e.trashed ? [C("tile.deleted", { date: P(e.trashed.at) }), C("tile.origin", { place: O(e) })] : [
			this.inTag && C("tile.location", { place: D(e) }),
			C("owner.label", { name: k(e) }),
			n.length && C("tile.tags", { names: n.join(", ") })
		];
		return t.title = [e.name, ...r.filter(Boolean)].join("\n"), t;
	}
	#E(e) {
		return this.#l === e.id ? o("input", {
			class: "fm-rename",
			type: "text",
			value: e.name,
			spellcheck: "false",
			"aria-label": C("rename.label")
		}) : o("span", {
			class: "fm-label",
			title: e.name
		}, e.name);
	}
	#D(e, t, ...n) {
		let r = this.#o.has(e.id), i = o("div", {
			class: [
				t,
				r && "selected",
				e.id === this.#c && "cursor"
			].filter(Boolean).join(" "),
			id: `fm-${e.id}`,
			role: "option",
			"aria-selected": String(r),
			dataset: { id: e.id }
		}, ...n);
		return e.trashed ? i : ce(i, e);
	}
	#O(e) {
		let { key: t, dir: n } = this.#r, r = (e) => t === "type" ? T(e) : t === "workspace" ? k(e) : t === "size" ? e.type === "folder" ? e.trashed ? e.inside : a.children(e.id).length : e.size ?? 0 : t === "modified" ? e.modified : t === "deleted" ? e.trashed?.at ?? e.modified : t === "origin" && e.trashed ? O(e) : t === "location" ? D(e) : e.name, i = {
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
	#k(e, t = e[e.length - 1] ?? this.#c) {
		this.#o = new Set(e), this.#c = t, this.render();
	}
	#A() {
		let { signal: e } = this.win, t = (e) => e.target.closest?.("[role=\"option\"]");
		this.list.addEventListener("pointerdown", (e) => {
			if (e.button !== 0 || e.target.closest(".fm-rename, .fm-head")) return;
			let n = t(e);
			if (!n) {
				e.ctrlKey || e.metaKey || e.shiftKey || this.#k([]);
				return;
			}
			let r = n.dataset.id, i = this.#a.map((e) => e.id), a = !1;
			if (e.shiftKey && this.#s && i.includes(this.#s)) {
				let [t, n] = [i.indexOf(this.#s), i.indexOf(r)].sort((e, t) => e - t), a = i.slice(t, n + 1);
				this.#k(e.ctrlKey || e.metaKey ? [.../* @__PURE__ */ new Set([...this.#o, ...a])] : a, r);
			} else if (e.ctrlKey || e.metaKey) {
				let e = new Set(this.#o);
				e.has(r) ? e.delete(r) : e.add(r), this.#s = r, this.#k([...e], r);
			} else this.#s = r, this.#o.has(r) ? a = this.#o.size > 1 : this.#k([r], r);
			!this.inTrash && this.#o.has(r) && ie(e, {
				ids: [...this.#o],
				stack: this.history,
				onEnd: ({ moved: e }) => {
					!e && a && this.#k([r], r);
				}
			});
		}, { signal: e }), this.list.addEventListener("dblclick", (e) => {
			let n = t(e);
			if (!n || e.target.closest(".fm-rename")) return;
			if (this.inTrash) return this.openSelected();
			let r = a.get(n.dataset.id);
			r && this.open(r);
		}, { signal: e }), this.list.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			let n = t(e);
			if (!n) return this.#M(e);
			this.#o.has(n.dataset.id) || this.#k([n.dataset.id], n.dataset.id), this.#N(e);
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
			let t = this.#j(e.key);
			if (t == null || !this.#a.length) return;
			e.preventDefault();
			let n = this.#a.map((e) => e.id), r = n.indexOf(this.#c), i = t === -Infinity ? 0 : t === Infinity ? n.length - 1 : Math.max(0, Math.min(n.length - 1, (r < 0 ? 0 : r) + t)), a = n[i];
			if (e.shiftKey) {
				this.#s ||= this.#c ?? a;
				let [e, t] = [n.indexOf(this.#s), i].sort((e, t) => e - t);
				this.#k(n.slice(e, t + 1), a);
			} else this.#s = a, this.#k([a], a);
			this.list.querySelector(`#fm-${CSS.escape(a)}`)?.scrollIntoView({ block: "nearest" });
		}, { signal: e });
	}
	#j(e) {
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
	#M(e) {
		let t = {
			label: this.#n === "list" ? C("view.grid") : C("view.list"),
			icon: this.#n === "list" ? "grid" : "list",
			action: () => this.setView(this.#n === "list" ? "grid" : "list")
		};
		if (this.inTrash) {
			let n = !this.#a.length;
			return l(e.clientX, e.clientY, [
				{
					label: C("menu.restoreAll"),
					icon: "undo",
					disabled: n,
					action: () => this.restore(a.trashed().map((e) => e.id))
				},
				{
					label: C("menu.emptyTrash"),
					icon: "trash",
					danger: !0,
					disabled: n,
					action: () => this.empty(e.clientX, e.clientY)
				},
				"-",
				t
			]);
		}
		if (this.inTag) return l(e.clientX, e.clientY, [
			{
				label: C("menu.manageTags"),
				icon: "gear",
				action: () => b("settings", { tab: "tags" })
			},
			"-",
			t
		]);
		l(e.clientX, e.clientY, [
			{
				label: C("menu.newFolder"),
				icon: "folderPlus",
				action: () => this.create("folder")
			},
			{
				label: C("menu.newTextFile"),
				icon: "filePlus",
				action: () => this.create("file")
			},
			"-",
			t
		]);
	}
	#N(e) {
		let t = this.#a.filter((e) => this.#o.has(e.id)), n = t.length > 1, r = w(t.length);
		if (this.inTrash) {
			let i = t.map((e) => e.id);
			return l(e.clientX, e.clientY, [
				{
					label: n ? C("menu.restoreMany", { count: r }) : C("menu.restore"),
					icon: "undo",
					action: () => this.restore(i)
				},
				{
					label: C("menu.info"),
					icon: "info",
					shortcut: f.label("files.info"),
					action: () => this.info.setOpen(!0)
				},
				"-",
				{
					label: C("menu.purge"),
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
				label: n ? C("menu.openMany", { count: r }) : C("menu.open"),
				icon: "open",
				shortcut: f.label("items.open"),
				action: () => this.openSelected()
			},
			!n && t[0].type === "file" && {
				label: C("menu.openWith"),
				icon: "open",
				action: () => S(t[0], { choose: !0 })
			},
			!n && t[0].type === "folder" && {
				label: C("menu.openInEditor"),
				icon: "code",
				action: () => b("editor", { folder: t[0].id })
			},
			o && !n && {
				label: C("menu.reveal"),
				icon: "folderOpen",
				action: () => this.reveal(t[0].id)
			},
			{
				label: C("menu.rename"),
				icon: "pencil",
				shortcut: f.label("items.rename"),
				disabled: n || i,
				action: () => this.rename(t[0].id)
			},
			ye(a),
			o && {
				label: C("menu.untag", { name: o.name }),
				icon: "x",
				action: () => ge(a, o.id, !1)
			},
			se(a),
			{
				label: C("menu.info"),
				icon: "info",
				shortcut: f.label("files.info"),
				action: () => this.info.setOpen(!0)
			},
			!n && {
				label: C("menu.properties"),
				icon: "info",
				action: () => _e(t[0].id)
			},
			"-",
			{
				label: n ? C("menu.deleteMany", { count: r }) : C("menu.delete"),
				icon: "trash",
				shortcut: f.label("items.delete"),
				danger: !0,
				disabled: i,
				action: () => this.remove(t.map((e) => e.id))
			}
		].filter(Boolean));
	}
	#P(e) {
		return e === Z || !!$(e) || a.exists(e);
	}
	#F(e) {
		let t = this.list.querySelector(`[data-id="${CSS.escape(e)}"]`)?.getBoundingClientRect();
		return {
			x: t ? t.left + 40 : innerWidth / 2,
			y: t ? t.bottom : innerHeight / 2
		};
	}
	#I(e, t) {
		for (; e.length;) {
			let n = e.pop();
			if (this.#P(n)) {
				t.push(this.folder), this.go(n, !1);
				return;
			}
		}
	}
	#L(e) {
		this.#u = e, this.render();
	}
	#R(e) {
		let t = e.node && x.has(e.node.id);
		if (this.inTrash) return t ? this.render() : void 0;
		if (this.inTag) return this.render();
		if (e.type === "remove" && e.ids.includes(this.folder)) return this.go(e.parent && a.exists(e.parent) ? e.parent : a.root, !1);
		let n = e.parent === this.folder || e.from === this.folder, r = e.type !== "remove" && a.isInside(this.folder, e.node.id), i = [e.parent, e.from].some((e) => e && a.exists(e) && a.get(e).parent === this.folder);
		(n || r || i || t) && (n && e.type !== "rename" && (this.#u = ""), this.render());
	}
};
export { Ie as default };
