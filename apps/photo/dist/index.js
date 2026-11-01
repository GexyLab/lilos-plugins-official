import * as e from "/host/sdk.js";
import { UndoStack as t, Window as n, actionButton as r, fs as i, h as a, history as o, icon as s, isEditing as c, segmented as l, selectField as u, slider as d, svg as f, toast as p, toggle as m } from "/host/sdk.js";
import { handleCommand as h, launch as g, pickFile as _ } from "/host/system.js";
// src/photo/glyphs.js
var v = {
	upload: "<path d=\"M12 16V5M7 9.5l5-5 5 5M5 20h14\"/>",
	hand: "<path d=\"M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 11V4.5a1.5 1.5 0 0 1 3 0V12M14 11.5V6a1.5 1.5 0 0 1 3 0v8.5a6.5 6.5 0 0 1-6.5 6.5h-.8a6 6 0 0 1-4.6-2.2L3.6 15a1.5 1.5 0 0 1 2.3-1.9L8 15.5\"/>",
	brush: "<path d=\"M19.5 3.5l1 1-8.8 9.8-2-2z\"/><path d=\"M9.7 12.3c-2.2-.4-4.2 1-4.2 3.4 0 1.6-.8 2.6-2 3.3 3.8 1.1 8.4.3 8.2-4.7\"/>",
	text: "<path d=\"M5 6V4.5h14V6M12 4.5V20M9 20h6\"/>",
	crop: "<path d=\"M6 2v14a2 2 0 0 0 2 2h14\"/><path d=\"M2 6h14a2 2 0 0 1 2 2v14\"/>",
	resize: "<path d=\"M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7\"/>",
	convert: "<path d=\"M4 8h13l-3.5-3.5M20 16H7l3.5 3.5\"/>",
	actual: "<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\"/><path d=\"M11 9l2-1.5V16\"/>"
}, y = (e) => v[e] ? f("0 0 24 24", "ico", v[e]) : s(e);
// src/shared/i18n.js
function b(t, n) {
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
// src/photo/i18n.js
var x = b("photo", {
	en: { strings: {
		"@name": "Photo",
		"@description": "View and touch up images: drawing, text, cropping, resizing and conversion to PNG, JPEG or WebP.",
		"@commands.photo.save.label": "Save",
		"@commands.photo.open.label": "Open an image",
		"@entrypoints.main.params.file.label": "Image",
		"@entrypoints.main.params.file.description": "The image to open",
		"@entrypoints.filePreview.label": "Image previews",
		"action.save": "Save",
		"action.cancel": "Cancel",
		"toolbar.open": "Open an image… (Ctrl O)",
		"toolbar.import": "Import from your computer…",
		"toolbar.save": "Save (Ctrl S)",
		"toolbar.download": "Download to your computer",
		"toolbar.undo": "Undo (Ctrl Z)",
		"toolbar.undo.named": "Undo “{label}” (Ctrl Z)",
		"toolbar.redo": "Redo (Ctrl Y)",
		"toolbar.redo.named": "Redo “{label}” (Ctrl Y)",
		"toolbar.tools": "Tools",
		"toolbar.tool": "{label} ({key})",
		"toolbar.resize": "Resize",
		"toolbar.resize.title": "Resize the image…",
		"toolbar.convert": "Convert",
		"toolbar.convert.title": "Convert and save a copy…",
		"toolbar.reveal": "Show in folder",
		"tool.view": "View and pan",
		"tool.brush": "Draw",
		"tool.text": "Text",
		"tool.crop": "Crop",
		"history.draw": "Draw",
		"history.erase": "Erase",
		"history.text": "Text",
		"history.crop": "Crop",
		"history.resize": "Resize",
		"stage.label": "Image",
		"nav.previous": "Previous image",
		"nav.previous.title": "Previous image (←)",
		"nav.next": "Next image",
		"nav.next.title": "Next image (→)",
		"drop.hint": "Drop to import into lilOS",
		"zoom.out": "Zoom out (−)",
		"zoom.in": "Zoom in (+)",
		"zoom.fit": "Fit to window (0)",
		"zoom.fitToWindow": "Fit to window",
		"zoom.actual": "Actual size (1)",
		"status.opening": "Opening…",
		"status.saved": "Saved",
		"status.modified": "Modified",
		"status.fileGone": "The file no longer exists",
		"status.size": "{width} × {height} px",
		"status.position": "{index} of {count}",
		"status.positionIn": "{index} of {count} in {folder}",
		"empty.title": "No image",
		"empty.unavailable": "Image unavailable",
		"empty.text": "Open an image from lilOS or import one from your computer. You can also drag it here.",
		"empty.open": "Open…",
		"confirm.unsaved": "Changes to “{name}” aren’t saved.",
		"confirm.unsaved.beforeOpen": "Changes to “{name}” aren’t saved. Save them before opening “{other}”?",
		"confirm.unsaved.beforeImport": "Changes to “{name}” aren’t saved. Save them before importing?",
		"confirm.discard": "Don’t save",
		"pick.open.title": "Open an image",
		"folder.home": "Home",
		"file.defaultName": "Image",
		"import.notImage": "“{name}” isn’t an image",
		"import.noImages": "None of these are images",
		"import.failed": "“{name}” wasn’t imported: {error}",
		"import.done": {
			one: "Imported into {folder}",
			other: "{n} images imported into {folder}"
		},
		"save.cannotWrite": "{format} can’t be saved: save a copy",
		"save.fileGone": "The file no longer exists: save a copy",
		"save.saveCopy": "Save copy",
		"error.unsupported": "“{name}” can’t be opened: the format isn’t supported or the file is damaged.",
		"error.unreadable": "“{name}” can’t be read: {error}",
		"error.notDownloaded": "Not downloaded: {error}",
		"error.tooLarge": "The image is too large to save",
		"option.color": "Color",
		"color.white": "White",
		"color.black": "Black",
		"color.red": "Red",
		"color.orange": "Orange",
		"color.yellow": "Yellow",
		"color.green": "Green",
		"color.blue": "Blue",
		"color.purple": "Purple",
		"color.custom": "Other color",
		"color.custom.title": "Other color…",
		"brush.size": "Size",
		"brush.opacity": "Opacity",
		"brush.mode": "Brush or eraser",
		"brush.pen": "Brush",
		"brush.eraser": "Eraser",
		"text.box": "Text to write on the image",
		"text.size": "Size",
		"text.bold": "Bold",
		"text.bold.letter": "B",
		"text.font": "Font",
		"text.hint": "Click to write · Enter confirms, Shift Enter starts a new line",
		"font.sans": "Sans",
		"font.serif": "Serif",
		"font.mono": "Mono",
		"font.hand": "Handwriting",
		"crop.ratio": "Aspect ratio",
		"crop.hint": "Drag the frame or its edges · Enter to crop",
		"crop.whole": "Whole image",
		"crop.apply": "Crop",
		"ratio.free": "Free",
		"ratio.image": "Same as image",
		"ratio.square": "Square 1:1",
		"resize.title": "Resize the image",
		"resize.ok": "Resize",
		"resize.unit": "Unit",
		"resize.pixels": "Pixels",
		"resize.percent": "Percent",
		"resize.size": "Size",
		"resize.width": "Width",
		"resize.height": "Height",
		"resize.keepRatio": "Keep proportions",
		"resize.quality": "Quality",
		"resize.quality.high": "High",
		"resize.quality.medium": "Medium, faster",
		"resize.quality.pixel": "Crisp pixels",
		"resize.result": "Now {width} × {height} px, then {newWidth} × {newHeight} px",
		"resize.missing": "Enter a width and a height",
		"resize.outOfRange": "Width and height must be between 1 and 16384 pixels",
		"convert.title": "Convert and save a copy",
		"convert.format": "Format",
		"convert.quality": "Quality",
		"convert.name": "Name",
		"convert.fileName": "File name",
		"convert.folder": "Folder",
		"convert.chooseFolder": "Choose…",
		"convert.pickFolder.title": "Choose the folder",
		"convert.pickFolder.text": "The copy is saved in this folder.",
		"convert.openAfter": "Then open it",
		"convert.openAfterLabel": "Open the copy after saving",
		"convert.noFolder": "Choose a folder",
		"convert.badName": "Enter a valid name, without “/”",
		"convert.saved": "Saved “{name}” ({size})",
		"format.generic": "Image",
		"format.png.note": "PNG: lossless, with transparency.",
		"format.jpeg.note": "JPEG: smaller, good for photos; transparent areas become white.",
		"format.webp.note": "WebP: small, with transparency.",
		"size.bytes": {
			one: "{n} byte",
			other: "{n} bytes"
		}
	} },
	it: { strings: {
		"@name": "Photo",
		"@description": "Guarda le immagini e le ritocca: disegno, testo, ritaglio, ridimensionamento e conversione in PNG, JPEG o WebP.",
		"@commands.photo.save.label": "Salva",
		"@commands.photo.open.label": "Apri un’immagine",
		"@entrypoints.main.params.file.label": "Immagine",
		"@entrypoints.main.params.file.description": "L’immagine da aprire",
		"@entrypoints.filePreview.label": "Anteprime delle immagini",
		"action.save": "Salva",
		"action.cancel": "Annulla",
		"toolbar.open": "Apri un’immagine… (Ctrl O)",
		"toolbar.import": "Importa dal computer…",
		"toolbar.save": "Salva (Ctrl S)",
		"toolbar.download": "Scarica sul computer",
		"toolbar.undo": "Annulla (Ctrl Z)",
		"toolbar.undo.named": "Annulla «{label}» (Ctrl Z)",
		"toolbar.redo": "Ripeti (Ctrl Y)",
		"toolbar.redo.named": "Ripeti «{label}» (Ctrl Y)",
		"toolbar.tools": "Strumenti",
		"toolbar.tool": "{label} ({key})",
		"toolbar.resize": "Ridimensiona",
		"toolbar.resize.title": "Ridimensiona l’immagine…",
		"toolbar.convert": "Converti",
		"toolbar.convert.title": "Converti e salva una copia…",
		"toolbar.reveal": "Mostra nella cartella",
		"tool.view": "Guarda e sposta",
		"tool.brush": "Disegna",
		"tool.text": "Testo",
		"tool.crop": "Ritaglia",
		"history.draw": "Disegna",
		"history.erase": "Cancella",
		"history.text": "Testo",
		"history.crop": "Ritaglia",
		"history.resize": "Ridimensiona",
		"stage.label": "Immagine",
		"nav.previous": "Immagine precedente",
		"nav.previous.title": "Immagine precedente (←)",
		"nav.next": "Immagine successiva",
		"nav.next.title": "Immagine successiva (→)",
		"drop.hint": "Rilascia per importare in lilOS",
		"zoom.out": "Riduci lo zoom (−)",
		"zoom.in": "Aumenta lo zoom (+)",
		"zoom.fit": "Adatta alla finestra (0)",
		"zoom.fitToWindow": "Adatta alla finestra",
		"zoom.actual": "Dimensione reale (1)",
		"status.opening": "Apertura…",
		"status.saved": "Salvata",
		"status.modified": "Modificata",
		"status.fileGone": "Il file non c’è più",
		"status.size": "{width} × {height} px",
		"status.position": "{index} di {count}",
		"status.positionIn": "{index} di {count} in {folder}",
		"empty.title": "Nessuna immagine",
		"empty.unavailable": "Immagine non disponibile",
		"empty.text": "Apri un’immagine di lilOS o importala dal computer. Puoi anche trascinarla qui.",
		"empty.open": "Apri…",
		"confirm.unsaved": "Le modifiche a «{name}» non sono salvate.",
		"confirm.unsaved.beforeOpen": "Le modifiche a «{name}» non sono salvate (prima di aprire «{other}»).",
		"confirm.unsaved.beforeImport": "Le modifiche a «{name}» non sono salvate (prima di importare).",
		"confirm.discard": "Non salvare",
		"pick.open.title": "Apri un’immagine",
		"folder.home": "Home",
		"file.defaultName": "Immagine",
		"import.notImage": "«{name}» non è un’immagine",
		"import.noImages": "Nessuna di queste è un’immagine",
		"import.failed": "«{name}» non è stata importata: {error}",
		"import.done": {
			one: "Importata in {folder}",
			other: "{n} immagini importate in {folder}"
		},
		"save.cannotWrite": "{format} non si può salvare: salva una copia",
		"save.fileGone": "Il file non c’è più: salva una copia",
		"save.saveCopy": "Salva la copia",
		"error.unsupported": "«{name}» non si può aprire: il formato non è supportato o il file è danneggiato.",
		"error.unreadable": "«{name}» non si può leggere: {error}",
		"error.notDownloaded": "Non scaricata: {error}",
		"error.tooLarge": "Immagine troppo grande da salvare",
		"option.color": "Colore",
		"color.white": "Bianco",
		"color.black": "Nero",
		"color.red": "Rosso",
		"color.orange": "Arancione",
		"color.yellow": "Giallo",
		"color.green": "Verde",
		"color.blue": "Blu",
		"color.purple": "Viola",
		"color.custom": "Altro colore",
		"color.custom.title": "Altro colore…",
		"brush.size": "Spessore",
		"brush.opacity": "Opacità",
		"brush.mode": "Pennello o gomma",
		"brush.pen": "Pennello",
		"brush.eraser": "Gomma",
		"text.box": "Testo da scrivere sull’immagine",
		"text.size": "Dimensione",
		"text.bold": "Grassetto",
		"text.bold.letter": "G",
		"text.font": "Carattere",
		"text.hint": "Clic per scrivere · Invio conferma, Maiusc Invio va a capo",
		"font.sans": "Sans",
		"font.serif": "Serif",
		"font.mono": "Mono",
		"font.hand": "Manoscritto",
		"crop.ratio": "Proporzioni",
		"crop.hint": "Trascina il riquadro o i suoi bordi · Invio per ritagliare",
		"crop.whole": "Tutta l’immagine",
		"crop.apply": "Ritaglia",
		"ratio.free": "Libere",
		"ratio.image": "Come l’immagine",
		"ratio.square": "Quadrato 1:1",
		"resize.title": "Ridimensiona l’immagine",
		"resize.ok": "Ridimensiona",
		"resize.unit": "Unità",
		"resize.pixels": "Pixel",
		"resize.percent": "Percentuale",
		"resize.size": "Dimensioni",
		"resize.width": "Larghezza",
		"resize.height": "Altezza",
		"resize.keepRatio": "Mantieni le proporzioni",
		"resize.quality": "Qualità",
		"resize.quality.high": "Alta",
		"resize.quality.medium": "Media, più veloce",
		"resize.quality.pixel": "Pixel netti",
		"resize.result": "Ora {width} × {height} px, poi {newWidth} × {newHeight} px",
		"resize.missing": "Scrivi una larghezza e un’altezza",
		"resize.outOfRange": "Larghezza e altezza vanno da 1 a 16384 pixel",
		"convert.title": "Converti e salva una copia",
		"convert.format": "Formato",
		"convert.quality": "Qualità",
		"convert.name": "Nome",
		"convert.fileName": "Nome del file",
		"convert.folder": "Cartella",
		"convert.chooseFolder": "Scegli…",
		"convert.pickFolder.title": "Scegli la cartella",
		"convert.pickFolder.text": "La copia viene salvata in questa cartella.",
		"convert.openAfter": "Poi aprila",
		"convert.openAfterLabel": "Apri la copia dopo il salvataggio",
		"convert.noFolder": "Scegli una cartella",
		"convert.badName": "Scrivi un nome valido, senza «/»",
		"convert.saved": "Salvata «{name}» ({size})",
		"format.generic": "Immagine",
		"format.png.note": "PNG: senza perdita di qualità, con la trasparenza.",
		"format.jpeg.note": "JPEG: più leggero, adatto alle foto; le parti trasparenti diventano bianche.",
		"format.webp.note": "WebP: leggero e con la trasparenza.",
		"size.bytes": {
			one: "{n} byte",
			other: "{n} byte"
		}
	} }
}), { t: S } = x, C = [
	{
		id: "png",
		label: "PNG",
		type: "image/png",
		ext: "png",
		lossy: !1,
		get note() {
			return S("format.png.note");
		}
	},
	{
		id: "jpeg",
		label: "JPEG",
		type: "image/jpeg",
		ext: "jpg",
		lossy: !0,
		get note() {
			return S("format.jpeg.note");
		}
	},
	{
		id: "webp",
		label: "WebP",
		type: "image/webp",
		ext: "webp",
		lossy: !0,
		get note() {
			return S("format.webp.note");
		}
	}
], w = [
	"png",
	"jpg",
	"jpeg",
	"gif",
	"webp",
	"bmp",
	"avif",
	"ico",
	"svg"
], T = {
	png: "png",
	jpg: "jpeg",
	jpeg: "jpeg",
	webp: "webp"
}, E = {
	png: "PNG",
	jpg: "JPEG",
	jpeg: "JPEG",
	gif: "GIF",
	webp: "WebP",
	bmp: "BMP",
	avif: "AVIF",
	ico: "ICO",
	svg: "SVG"
}, D = (e) => (/\.([^.]+)$/.exec(e)?.[1] ?? "").toLowerCase(), O = (e) => E[D(e)] ?? (D(e).toUpperCase() || S("format.generic"));
function k(e) {
	let t = C.find((t) => t.id === T[D(e)]);
	return t && j(t) ? t : null;
}
var A = /* @__PURE__ */ new Map();
function j(e) {
	if (!A.has(e.id)) {
		let t = document.createElement("canvas");
		t.width = t.height = 1, A.set(e.id, t.toDataURL(e.type).startsWith(`data:${e.type}`));
	}
	return A.get(e.id);
}
function M(e, t) {
	let n = document.createElement("canvas");
	return n.width = Math.max(1, Math.round(e)), n.height = Math.max(1, Math.round(t)), n;
}
function N(e) {
	let t = M(e.width, e.height);
	return t.getContext("2d").drawImage(e, 0, 0), t;
}
async function P(e) {
	let t = URL.createObjectURL(e);
	try {
		let e = new Image();
		e.src = t, await e.decode();
		let n = e.naturalWidth || 300, r = e.naturalHeight || 150, i = M(n, r);
		return i.getContext("2d").drawImage(e, 0, 0, n, r), i;
	} finally {
		URL.revokeObjectURL(t);
	}
}
function F(e, t, n = .92) {
	let r = e;
	if (t.id === "jpeg") {
		r = M(e.width, e.height);
		let t = r.getContext("2d");
		t.fillStyle = "#fff", t.fillRect(0, 0, r.width, r.height), t.drawImage(e, 0, 0);
	}
	return new Promise((e, i) => {
		r.toBlob((t) => t ? e(t) : i(Error(S("error.tooLarge"))), t.type, t.lossy ? n : void 0);
	});
}
function I(e, t, n, r = "high") {
	t = Math.max(1, Math.round(t)), n = Math.max(1, Math.round(n));
	let i = e;
	if (r === "high") for (; i.width / 2 >= t && i.height / 2 >= n;) {
		let e = M(i.width / 2, i.height / 2), t = e.getContext("2d");
		t.imageSmoothingQuality = "high", t.drawImage(i, 0, 0, e.width, e.height), i = e;
	}
	let a = M(t, n), o = a.getContext("2d");
	return o.imageSmoothingEnabled = r !== "pixel", r !== "pixel" && (o.imageSmoothingQuality = r === "high" ? "high" : "medium"), o.drawImage(i, 0, 0, t, n), a;
}
function L(e, { x: t, y: n, width: r, height: i }) {
	let a = M(r, i);
	return a.getContext("2d").drawImage(e, Math.round(t), Math.round(n), a.width, a.height, 0, 0, a.width, a.height), a;
}
function R(e) {
	return Number.isFinite(e) ? e < 1024 ? S("size.bytes", { n: e }) : e < 1048576 ? `${Math.round(e / 1024)} KB` : `${x.number(e / 1024 / 1024, {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1,
		useGrouping: !1
	})} MB` : "";
}
// src/photo/dialogs.js
function z(e, { title: t, symbol: n, rows: i, okLabel: o, collect: s, focus: c }) {
	return new Promise((l) => {
		let u = document.activeElement, d = (e) => {
			m.remove(), u?.focus?.(), l(e);
		}, f = () => {
			let e = s();
			e !== void 0 && d(e);
		}, p = a("div", {
			class: "ph-dialog",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": t
		}, a("div", { class: "ph-dialog-head" }, y(n), a("span", {}, t)), a("div", { class: "ph-dialog-body" }, i), a("div", { class: "ph-dialog-foot" }, r({
			label: S("action.cancel"),
			onClick: () => d(null)
		}), r({
			label: o,
			primary: !0,
			onClick: f
		}))), m = a("div", { class: "ph-scrim" }, p);
		m.addEventListener("keydown", (e) => {
			if (e.stopPropagation(), e.key === "Escape") d(null);
			else if (e.key === "Enter" && e.target.matches("input:not([type=\"checkbox\"]):not([type=\"range\"])")) e.preventDefault(), f();
			else if (e.key === "Tab") {
				let t = [...p.querySelectorAll("button:not(:disabled), input:not(:disabled), select")].filter((e) => e.tabIndex !== -1), n = t.indexOf(document.activeElement);
				e.shiftKey && n <= 0 ? (e.preventDefault(), t.at(-1)?.focus()) : !e.shiftKey && n === t.length - 1 && (e.preventDefault(), t[0]?.focus());
			}
		}), m.addEventListener("pointerdown", (e) => {
			e.target === m && e.preventDefault();
		}), e.append(m), (c ?? p.querySelector("input, button"))?.focus();
	});
}
var B = (e, ...t) => a("div", { class: "ph-row" }, a("span", { class: "ph-row-label" }, e), ...t), V = (e, t) => a("input", {
	class: "ph-number",
	type: "number",
	min: 1,
	step: 1,
	value: e,
	"aria-label": t
});
function H(e, { width: t, height: n }) {
	let r = "px", i = !0, o = V(t, S("resize.width")), s = V(n, S("resize.height")), c = a("span", { class: "ph-unit" }, "px"), d = a("span", { class: "ph-unit" }, "px"), f = a("div", { class: "ph-hint" }), p = a("button", {
		class: "ph-lock",
		type: "button",
		"aria-pressed": "true",
		title: S("resize.keepRatio"),
		"aria-label": S("resize.keepRatio"),
		onclick: () => {
			i = !i, p.setAttribute("aria-pressed", String(i)), i && _("w");
		}
	}, y("link")), m = "high", h = () => {
		let e = Number(o.value), i = Number(s.value);
		return r === "px" ? [Math.round(e), Math.round(i)] : [Math.round(t * e / 100), Math.round(n * i / 100)];
	}, g = () => {
		let [e, r] = h();
		f.textContent = e > 0 && r > 0 ? S("resize.result", {
			width: t,
			height: n,
			newWidth: e,
			newHeight: r
		}) : S("resize.missing");
	}, _ = (e) => {
		i && (r === "%" ? (e === "w" ? s : o).value = (e === "w" ? o : s).value : e === "w" ? s.value = Math.max(1, Math.round(Number(o.value) * n / t)) : o.value = Math.max(1, Math.round(Number(s.value) * t / n))), g();
	};
	o.addEventListener("input", () => _("w")), s.addEventListener("input", () => _("h"));
	let v = l({
		value: "px",
		label: S("resize.unit"),
		options: [{
			value: "px",
			label: S("resize.pixels")
		}, {
			value: "%",
			label: S("resize.percent")
		}],
		onChange: (e) => {
			let [i, a] = h();
			r = e, c.textContent = d.textContent = e, o.value = e === "px" ? i : Math.round(i / t * 100), s.value = e === "px" ? a : Math.round(a / n * 100), g();
		}
	});
	return g(), z(e, {
		title: S("resize.title"),
		symbol: "resize",
		okLabel: S("resize.ok"),
		focus: o,
		rows: [
			B(S("resize.unit"), v),
			a("div", { class: "ph-row" }, a("span", { class: "ph-row-label" }, S("resize.size")), a("div", { class: "ph-size" }, a("label", { class: "ph-size-field" }, o, c), p, a("label", { class: "ph-size-field" }, s, d))),
			B(S("resize.quality"), u({
				value: m,
				label: S("resize.quality"),
				options: [
					{
						value: "high",
						label: S("resize.quality.high")
					},
					{
						value: "medium",
						label: S("resize.quality.medium")
					},
					{
						value: "pixel",
						label: S("resize.quality.pixel")
					}
				],
				onChange: (e) => {
					m = e;
				}
			})),
			f
		],
		collect: () => {
			let [e, r] = h();
			if (!(e > 0 && r > 0) || e > 16384 || r > 16384) f.textContent = S("resize.outOfRange");
			else return e === t && r === n ? null : {
				width: e,
				height: r,
				quality: m
			};
		}
	});
}
function U(e, t, { name: n, folder: r, format: o = "png", title: s = S("convert.title"), okLabel: c = S("action.save") }) {
	let u = C.filter(j), f = u.find((e) => e.id === o) ?? u[0], p = r, h = 90, g = !0, v = n.replace(/\.[^.]+$/, "") || S("file.defaultName"), b = a("input", {
		class: "ph-text",
		type: "text",
		spellcheck: "false",
		"aria-label": S("convert.fileName")
	});
	b.value = `${v}.${f.ext}`;
	let x = a("div", { class: "ph-hint" }), w = B(S("convert.quality"), d({
		value: h,
		min: 10,
		max: 100,
		unit: "%",
		label: S("convert.quality"),
		onChange: (e) => {
			h = e;
		}
	})), T = w.querySelector("input");
	T.addEventListener("input", () => {
		h = Number(T.value);
	});
	let E = a("span", { class: "ph-folder-name" }), D = a("button", {
		class: "ph-folder",
		type: "button",
		onclick: async () => {
			let e = await _(t, {
				kind: "folder",
				title: S("convert.pickFolder.title"),
				text: S("convert.pickFolder.text")
			});
			e && (p = e.id, O());
		}
	}, y("folder"), E), O = () => {
		let e = i.get(p);
		E.textContent = e ? p === i.root ? S("folder.home") : e.name : S("convert.chooseFolder"), D.title = e ? i.path(p) : "";
	}, k = () => {
		w.classList.toggle("off", !f.lossy), T.disabled = !f.lossy, x.textContent = f.note;
	};
	return O(), k(), z(e, {
		title: s,
		symbol: "convert",
		okLabel: c,
		focus: b,
		rows: [
			B(S("convert.format"), l({
				value: f.id,
				label: S("convert.format"),
				options: u.map((e) => ({
					value: e.id,
					label: e.label
				})),
				onChange: (e) => {
					f = u.find((t) => t.id === e), b.value = `${b.value.replace(/\.[^.]+$/, "") || v}.${f.ext}`, k();
				}
			})),
			w,
			B(S("convert.name"), b),
			a("div", { class: "ph-row" }, a("span", { class: "ph-row-label" }, S("convert.folder")), D),
			a("div", { class: "ph-row" }, a("span", { class: "ph-row-label" }, S("convert.openAfter")), m({
				value: g,
				label: S("convert.openAfterLabel"),
				onChange: (e) => {
					g = e;
				}
			})),
			x
		],
		collect: () => {
			let e = i.get(p), t = b.value.trim();
			if (!e || e.type !== "folder") x.textContent = S("convert.noFolder");
			else if (!t || t.includes("/")) x.textContent = S("convert.badName"), b.focus();
			else return {
				format: f,
				quality: h / 100,
				name: t,
				folder: p,
				open: g
			};
		}
	});
}
// src/photo/preview.js
var W = 1024, G = 16, ee = 2048, te = {
	png: "image/png",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	gif: "image/gif",
	webp: "image/webp",
	bmp: "image/bmp",
	avif: "image/avif",
	ico: "image/x-icon",
	svg: "image/svg+xml"
};
function ne({ lilos: e }) {
	e.handle(async (t) => {
		if (typeof t?.file != "string") return null;
		let n = await e.files.info(t.file), r = D(n.name);
		if (!w.includes(r) || !n.size) return null;
		let i = await e.files.read(t.file, { bytes: !0 }), a;
		try {
			a = await P(new Blob([i], { type: te[r] }));
		} catch {
			return null;
		}
		let o = Number.isFinite(t.size) ? Math.min(ee, Math.max(G, Math.round(t.size))) : W, s = Math.min(1, o / Math.max(a.width, a.height)), c = s < 1 ? I(a, a.width * s, a.height * s) : a, l = C.find((e) => e.id === "webp");
		return { image: await F(c, j(l) ? l : C[0], .85) };
	});
}
// src/photo/PhotoApp.js
var K = () => [
	{
		value: "#ffffff",
		label: S("color.white")
	},
	{
		value: "#1f2328",
		label: S("color.black")
	},
	{
		value: "#e5484d",
		label: S("color.red")
	},
	{
		value: "#f2994a",
		label: S("color.orange")
	},
	{
		value: "#f2c94c",
		label: S("color.yellow")
	},
	{
		value: "#30a46c",
		label: S("color.green")
	},
	{
		value: "#3b6ef5",
		label: S("color.blue")
	},
	{
		value: "#7c5cdb",
		label: S("color.purple")
	}
], q = [
	{
		value: "sans",
		label: () => S("font.sans"),
		css: "system-ui, \"Segoe UI\", Roboto, sans-serif"
	},
	{
		value: "serif",
		label: () => S("font.serif"),
		css: "Georgia, \"Times New Roman\", serif"
	},
	{
		value: "mono",
		label: () => S("font.mono"),
		css: "ui-monospace, Consolas, \"Courier New\", monospace"
	},
	{
		value: "hand",
		label: () => S("font.hand"),
		css: "\"Segoe Print\", \"Bradley Hand\", \"Comic Sans MS\", cursive"
	}
], re = () => [
	{
		value: "free",
		label: S("ratio.free")
	},
	{
		value: "image",
		label: S("ratio.image")
	},
	{
		value: "1",
		label: S("ratio.square")
	},
	{
		value: "4/3",
		label: "4:3"
	},
	{
		value: "3/4",
		label: "3:4"
	},
	{
		value: "3/2",
		label: "3:2"
	},
	{
		value: "2/3",
		label: "2:3"
	},
	{
		value: "16/9",
		label: "16:9"
	},
	{
		value: "9/16",
		label: "9:16"
	}
], J = [
	{
		id: "view",
		label: () => S("tool.view"),
		key: "V",
		glyph: "hand"
	},
	{
		id: "brush",
		label: () => S("tool.brush"),
		key: "B",
		glyph: "brush"
	},
	{
		id: "text",
		label: () => S("tool.text"),
		key: "T",
		glyph: "text"
	},
	{
		id: "crop",
		label: () => S("tool.crop"),
		key: "C",
		glyph: "crop"
	}
], Y = [
	.05,
	.1,
	1 / 6,
	.25,
	1 / 3,
	.5,
	2 / 3,
	1,
	1.5,
	2,
	3,
	4,
	6,
	8,
	12,
	16
], X = 1.2, ie = 20;
function ae({ args: e, openWindow: t } = {}) {
	let r = new n({
		title: "Photo",
		icon: "image",
		width: 900,
		height: 620,
		minWidth: 560,
		minHeight: 360
	}), a = new se(r, t);
	return e?.file && i.exists(e.file) ? a.open(e.file) : a.render(), r.on("launch", (e) => {
		e?.file && i.exists(e.file) && a.open(e.file);
	}), r.canClose = () => a.confirmDiscard(), r.getState = () => ({ file: a.fileId }), r;
}
var Z = (e, t, n) => Math.min(n, Math.max(t, e)), oe = (e, t) => e.name.localeCompare(t.name, void 0, {
	numeric: !0,
	sensitivity: "base"
}), Q = (e) => w.includes(D(e)), se = class {
	fileId = null;
	name = "";
	canvas = null;
	#e = "";
	#t = 0;
	#n = 0;
	#r = 0;
	#i = 0;
	#a = 1;
	#o = !0;
	#s = "view";
	#c = "#e5484d";
	#l = {
		size: 8,
		opacity: 100,
		mode: "pen",
		chosen: !1
	};
	#u = {
		font: "sans",
		size: 48,
		bold: !0,
		chosen: !1
	};
	#d = "free";
	#f = null;
	#p = null;
	#m = "";
	constructor(e, n) {
		this.win = e, this.openWindow = n ?? (() => {}), this.stack = new t({ limit: ie });
		let { signal: r } = e, c = (e, t, n) => a("button", {
			class: "ph-btn",
			type: "button",
			title: t,
			"aria-label": t,
			onclick: n
		}, y(e));
		this.undoBtn = c("undo", S("toolbar.undo"), () => this.stack.undo()), this.redoBtn = c("redo", S("toolbar.redo"), () => this.stack.redo()), this.saveBtn = c("save", S("toolbar.save"), () => this.save()), this.downloadBtn = c("download", S("toolbar.download"), () => this.download()), this.revealBtn = c("folder", S("toolbar.reveal"), () => this.reveal()), this.toolBtns = J.map((e) => {
			let t = c(e.glyph, S("toolbar.tool", {
				label: e.label(),
				key: e.key
			}), () => this.setTool(e.id));
			return t.dataset.tool = e.id, t;
		});
		let l = (e, t, n, r) => a("button", {
			class: "ph-btn ph-labelled",
			type: "button",
			title: n,
			onclick: r
		}, y(e), a("span", {}, t));
		this.resizeBtn = l("resize", S("toolbar.resize"), S("toolbar.resize.title"), () => this.resize()), this.convertBtn = l("convert", S("toolbar.convert"), S("toolbar.convert.title"), () => this.convert()), this.fileInput = a("input", {
			type: "file",
			accept: "image/*,.svg",
			multiple: !0,
			hidden: !0
		}), this.fileInput.addEventListener("change", () => {
			let e = [...this.fileInput.files];
			this.fileInput.value = "", this.importFiles(e);
		}, { signal: r }), this.options = {
			brush: this.#H(),
			text: this.#U(),
			crop: this.#W()
		}, this.banner = a("div", {
			class: "ph-banner",
			role: "alertdialog",
			hidden: !0
		}), this.overlay = a("canvas", {
			class: "ph-overlay",
			"aria-hidden": "true"
		}), this.cropFrame = a("div", {
			class: "ph-crop",
			hidden: !0
		}, ...[
			"nw",
			"n",
			"ne",
			"e",
			"se",
			"s",
			"sw",
			"w"
		].map((e) => a("span", {
			class: "ph-handle",
			dataset: { handle: e }
		})), this.cropSize = a("span", { class: "ph-crop-size" })), this.paper = a("div", { class: "ph-paper" }, this.overlay, this.cropFrame), this.stage = a("div", {
			class: "ph-stage",
			tabindex: "0",
			"aria-label": S("stage.label")
		}, this.paper), this.prevBtn = a("button", {
			class: "ph-nav ph-prev",
			type: "button",
			title: S("nav.previous.title"),
			"aria-label": S("nav.previous"),
			onclick: () => this.step(-1)
		}, s("arrowLeft")), this.nextBtn = a("button", {
			class: "ph-nav ph-next",
			type: "button",
			title: S("nav.next.title"),
			"aria-label": S("nav.next"),
			onclick: () => this.step(1)
		}, s("arrowRight")), this.empty = a("div", { class: "ph-empty" }), this.dropHint = a("div", {
			class: "ph-drop",
			hidden: !0
		}, y("upload"), a("span", {}, S("drop.hint"))), this.main = a("div", { class: "ph-main" }, this.stage, this.prevBtn, this.nextBtn, this.empty, this.dropHint), this.dims = a("span", { class: "ph-mono" }), this.info = a("span"), this.position = a("span"), this.state = a("span", { class: "ph-state" }), this.zoomLabel = a("button", {
			class: "ph-zoom-value",
			type: "button",
			title: S("zoom.fitToWindow"),
			onclick: () => this.fitToWindow()
		});
		let u = (e, t, n) => a("button", {
			class: "ph-zoom-btn",
			type: "button",
			title: t,
			"aria-label": t,
			onclick: n
		}, y(e));
		e.body.classList.add("ph"), e.body.append(a("div", { class: "ph-toolbar" }, c("open", S("toolbar.open"), () => this.openFile()), c("upload", S("toolbar.import"), () => this.fileInput.click()), this.saveBtn, this.downloadBtn, a("span", { class: "ph-sep" }), this.undoBtn, this.redoBtn, a("span", { class: "ph-sep" }), a("span", {
			class: "ph-tools",
			role: "group",
			"aria-label": S("toolbar.tools")
		}, this.toolBtns), a("span", { class: "ph-sep" }), this.resizeBtn, this.convertBtn, a("span", { class: "ph-grow" }), this.revealBtn, this.fileInput), ...Object.values(this.options), this.banner, this.main, a("div", { class: "ph-status" }, this.dims, this.info, this.position, this.state, a("span", { class: "ph-grow" }), u("minus", S("zoom.out"), () => this.zoomStep(-1)), this.zoomLabel, u("plus", S("zoom.in"), () => this.zoomStep(1)), u("fit", S("zoom.fit"), () => this.fitToWindow()), u("actual", S("zoom.actual"), () => this.zoomTo(1)))), this.paper.addEventListener("pointerdown", (e) => this.#C(e), { signal: r }), this.stage.addEventListener("pointerdown", (e) => this.#S(e), { signal: r }), this.stage.addEventListener("wheel", (e) => this.#I(e), {
			signal: r,
			passive: !1
		}), e.body.addEventListener("keydown", (e) => this.#L(e), { signal: r }), this.#R(r), addEventListener("beforeunload", (e) => {
			this.dirty && e.preventDefault();
		}, { signal: r });
		let d = new ResizeObserver(() => {
			this.#o && this.#F();
		});
		d.observe(this.stage);
		let f = [
			i.on("change", (e) => this.#g(e)),
			i.on("scope", () => this.render()),
			this.stack.on("change", () => this.render()),
			h("photo.save", {
				isActive: () => e.active,
				run: () => this.save()
			}),
			h("photo.open", {
				isActive: () => e.active,
				run: () => this.openFile()
			}),
			o.attach(e.body, this.stack)
		];
		e.on("destroy", () => {
			f.forEach((e) => e()), d.disconnect();
		}), this.setTool("view");
	}
	get dirty() {
		return !!this.canvas && this.#n !== this.#r;
	}
	get node() {
		return this.fileId ? i.get(this.fileId) : null;
	}
	async open(e) {
		let t = i.get(e);
		if (!t || t.type !== "file" || e === this.fileId && this.canvas && !this.#e || !await this.confirmDiscard(S("confirm.unsaved.beforeOpen", {
			name: this.name,
			other: t.name
		}))) return;
		this.#k();
		let n = ++this.#t;
		this.#m = S("status.opening"), this.render();
		let r = null, a = "";
		try {
			r = await P(await i.readBlob(e));
		} catch (e) {
			a = e?.name === "EncodingError" || e instanceof DOMException ? S("error.unsupported", { name: t.name }) : S("error.unreadable", {
				name: t.name,
				error: e?.message ?? e
			});
		}
		n === this.#t && (this.#m = "", this.fileId = e, this.name = t.name, this.#e = a, this.#_(r), this.stack.clear(), this.#n = this.#r = ++this.#i, this.#b(), this.#o = !0, this.render(), this.#s === "crop" && this.#j(), this.#F(), this.stage.focus({ preventScroll: !0 }));
	}
	async openFile() {
		let e = await _(this.openWindow, {
			title: S("pick.open.title"),
			exts: w
		});
		e && this.open(e.id);
	}
	async importFiles(e) {
		let t = e.filter((e) => Q(e.name) || e.type.startsWith("image/"));
		if (e.length && !t.length) return p(e.length === 1 ? S("import.notImage", { name: e[0].name }) : S("import.noImages"));
		if (!t.length) return;
		let n = this.node && i.get(this.node.parent), r = n?.type === "folder" ? n : i.resolve("/Immagini") ?? i.get(i.root), a = null;
		for (let e of t) {
			let t = Q(e.name) ? e.name : `${e.name || S("file.defaultName")}.${e.type.split("/")[1] ?? "png"}`, n = i.create(r.id, {
				type: "file",
				name: t
			});
			try {
				await i.write(n.id, e), a ??= n;
			} catch (t) {
				i.remove(n.id), p(S("import.failed", {
					name: e.name,
					error: t?.message ?? t
				}));
			}
		}
		a && (p(S("import.done", {
			n: t.length,
			folder: r.id === i.root ? S("folder.home") : r.name
		})), this.open(a.id));
	}
	async save() {
		if (this.#O(), !this.canvas) return !1;
		let e = this.node, t = e && k(e.name);
		if (!t) return this.convert({
			title: e ? S("save.cannotWrite", { format: O(e.name) }) : S("save.fileGone"),
			okLabel: S("save.saveCopy"),
			open: !0
		});
		try {
			await i.write(e.id, await F(this.canvas, t));
		} catch (e) {
			return p(`Non salvata: ${e?.message ?? e}`), !1;
		}
		this.#r = this.#n;
		let n = this.#m = S("status.saved");
		return this.render(), setTimeout(() => {
			this.#m === n && (this.#m = "", this.render());
		}, 2e3), !0;
	}
	async convert({ title: e, okLabel: t, open: n } = {}) {
		if (this.#O(), !this.canvas) return !1;
		let r = this.node, a = r && i.get(r.parent)?.type === "folder" ? r.parent : (i.resolve("/Immagini") ?? i.get(i.root)).id, o = r && k(r.name), s = await U(this.win.body, this.openWindow, {
			name: this.name || `${S("file.defaultName")}.png`,
			folder: a,
			format: o?.id === "png" ? "jpeg" : "png",
			title: e,
			okLabel: t
		});
		if (!s) return !1;
		n !== void 0 && (s.open = n);
		let c;
		try {
			c = await F(this.canvas, s.format, s.quality);
		} catch (e) {
			return p(`Non salvata: ${e?.message ?? e}`), !1;
		}
		let l = i.create(s.folder, {
			type: "file",
			name: s.name
		});
		try {
			await i.write(l.id, c);
		} catch (e) {
			return i.remove(l.id), p(`Non salvata: ${e?.message ?? e}`), !1;
		}
		return s.open ? (this.#r = this.#n, await this.open(l.id)) : p(S("convert.saved", {
			name: l.name,
			size: R(c.size)
		})), !0;
	}
	async download() {
		if (this.#O(), !this.canvas) return;
		let e = this.node, t, n = this.name || `${S("file.defaultName")}.png`;
		try {
			if (e && !this.dirty) t = await i.readBlob(e.id);
			else {
				let e = k(n) ?? C[0];
				k(n) || (n = `${n.replace(/\.[^.]+$/, "")}.png`), t = await F(this.canvas, e);
			}
		} catch (e) {
			return p(S("error.notDownloaded", { error: e?.message ?? e }));
		}
		let r = URL.createObjectURL(t);
		a("a", {
			href: r,
			download: n
		}).click(), setTimeout(() => URL.revokeObjectURL(r), 3e4);
	}
	reveal() {
		let e = this.node;
		e && g("files", { folder: e.parent });
	}
	#h() {
		let e = this.node;
		return e ? i.children(e.parent).filter((e) => e.type === "file" && Q(e.name)).sort(oe) : [];
	}
	step(e) {
		let t = this.#h(), n = t.findIndex((e) => e.id === this.fileId), r = t[n + e];
		n !== -1 && r && this.open(r.id);
	}
	confirmDiscard(e) {
		return this.#O(), this.dirty ? new Promise((t) => {
			let n = async (e) => {
				this.banner.hidden = !0, this.banner.replaceChildren(), t(e === "save" ? await this.save() : e === "discard"), e === "cancel" && this.stage.focus();
			}, i = r({
				label: S("action.save"),
				primary: !0,
				onClick: () => n("save")
			});
			this.banner.replaceChildren(s("help"), a("span", { class: "ph-banner-text" }, e ?? S("confirm.unsaved", { name: this.name })), i, r({
				label: S("confirm.discard"),
				danger: !0,
				onClick: () => n("discard")
			}), r({
				label: S("action.cancel"),
				onClick: () => n("cancel")
			})), this.banner.onkeydown = (e) => {
				e.key === "Escape" && (e.stopPropagation(), n("cancel"));
			}, this.banner.hidden = !1, i.focus();
		}) : Promise.resolve(!0);
	}
	#g({ type: e, node: t, ids: n }) {
		if (!this.fileId) return this.render();
		(e === "rename" || e === "update") && t?.id === this.fileId && (this.name = t.name), e === "remove" && n?.includes(this.fileId) && (this.#m = S("status.fileGone")), this.render();
	}
	#_(e) {
		this.canvas?.remove(), this.canvas = e, e && (e.classList.add("ph-image"), this.paper.prepend(e), this.overlay.width = e.width, this.overlay.height = e.height);
	}
	#v(e, t) {
		let n = N(this.canvas), r = this.#n, i = this.#n = ++this.#i, a = (e, t) => {
			this.#k();
			let n = e.width !== this.canvas?.width || e.height !== this.canvas?.height;
			this.#_(N(e)), this.#n = t, this.#s === "crop" && this.#j(), n && (this.#o = !0), this.#F(), this.render();
		};
		this.stack.push({
			label: e,
			undo: () => a(t, r),
			redo: () => a(n, i)
		});
	}
	#y(e, t) {
		let n = N(this.canvas);
		this.#_(t), this.#o = !0, this.#v(e, n), this.#s === "crop" && this.#j(), this.#F(), this.render();
	}
	async resize() {
		if (this.#O(), !this.canvas) return;
		let e = await H(this.win.body, {
			width: this.canvas.width,
			height: this.canvas.height
		});
		e && this.#y(S("history.resize"), I(this.canvas, e.width, e.height, e.quality));
	}
	#b() {
		if (!this.canvas) return;
		let e = Math.min(this.canvas.width, this.canvas.height);
		this.#l.chosen || (this.#l.size = Z(Math.round(e / 120), 2, 200)), this.#u.chosen || (this.#u.size = Z(Math.round(e / 14), 12, 400)), this.#G();
	}
	setTool(e) {
		this.#s === "text" && e !== "text" && this.#O(), this.#s = e;
		for (let t of this.toolBtns) t.setAttribute("aria-pressed", String(t.dataset.tool === e));
		for (let [t, n] of Object.entries(this.options)) n.hidden = t !== e;
		this.paper.dataset.tool = e, this.stage.dataset.tool = e, e === "crop" ? this.#j() : this.#f = null, this.#N();
	}
	#x(e) {
		let t = this.paper.getBoundingClientRect();
		return {
			x: (e.clientX - t.left) / this.#a,
			y: (e.clientY - t.top) / this.#a
		};
	}
	#S(e) {
		if (e.button === 1 || e.button === 0 && this.#s === "view") {
			e.preventDefault(), this.stage.focus({ preventScroll: !0 });
			let t = this.stage.scrollLeft, n = this.stage.scrollTop, r = e.clientX, i = e.clientY;
			this.stage.setPointerCapture(e.pointerId), this.stage.classList.add("panning");
			let a = (e) => {
				this.stage.scrollLeft = t - (e.clientX - r), this.stage.scrollTop = n - (e.clientY - i);
			}, o = () => {
				this.stage.classList.remove("panning"), this.stage.removeEventListener("pointermove", a), this.stage.removeEventListener("pointerup", o), this.stage.removeEventListener("pointercancel", o);
			};
			this.stage.addEventListener("pointermove", a), this.stage.addEventListener("pointerup", o), this.stage.addEventListener("pointercancel", o);
		} else e.button === 0 && this.#s === "crop" && this.canvas && !this.paper.contains(e.target) && this.#M(e, "new");
	}
	#C(e) {
		if (e.button === 0 && this.canvas) {
			if (this.#s === "brush") e.stopPropagation(), this.#w(e);
			else if (this.#s === "text") {
				if (e.stopPropagation(), this.#p && this.#p.box.contains(e.target)) return;
				e.preventDefault(), this.#p ? this.#O() : this.#E(this.#x(e));
			} else this.#s === "crop" && (e.stopPropagation(), this.#M(e, e.target.dataset.handle ?? (e.target === this.cropFrame ? "move" : "new")));
		}
	}
	#w(e) {
		e.preventDefault();
		let { size: t, opacity: n, mode: r } = this.#l, i = N(this.canvas), a = r === "eraser", o = (a ? this.canvas : this.overlay).getContext("2d");
		o.save(), o.lineCap = o.lineJoin = "round", o.lineWidth = t, o.strokeStyle = o.fillStyle = this.#c, a && (o.globalCompositeOperation = "destination-out"), this.overlay.style.opacity = a ? "" : String(n / 100);
		let s = this.#x(e);
		o.beginPath(), o.arc(s.x, s.y, t / 2, 0, Math.PI * 2), o.fill();
		let c = (e) => {
			for (let t of e.getCoalescedEvents?.() ?? [e]) {
				let e = this.#x(t);
				o.beginPath(), o.moveTo(s.x, s.y), o.lineTo(e.x, e.y), o.stroke(), s = e;
			}
		}, l = () => {
			if (this.paper.removeEventListener("pointermove", c), this.paper.removeEventListener("pointerup", l), this.paper.removeEventListener("pointercancel", l), o.restore(), !a) {
				let e = this.canvas.getContext("2d");
				e.save(), e.globalAlpha = n / 100, e.drawImage(this.overlay, 0, 0), e.restore(), o.clearRect(0, 0, this.overlay.width, this.overlay.height);
			}
			this.#v(S(a ? "history.erase" : "history.draw"), i), this.render();
		};
		this.paper.setPointerCapture(e.pointerId), this.paper.addEventListener("pointermove", c), this.paper.addEventListener("pointerup", l), this.paper.addEventListener("pointercancel", l);
	}
	#T(e) {
		let t = q.find((e) => e.value === this.#u.font) ?? q[0];
		return `${this.#u.bold ? 700 : 400} ${e}px ${t.css}`;
	}
	#E({ x: e, y: t }) {
		let n = a("div", {
			class: "ph-textbox",
			role: "textbox",
			"aria-label": S("text.box"),
			"aria-multiline": "true",
			spellcheck: "false"
		});
		n.contentEditable = "plaintext-only", n.contentEditable !== "plaintext-only" && (n.contentEditable = "true"), this.#p = {
			box: n,
			x: e,
			y: t - this.#u.size * X / 2
		}, this.#D(), n.addEventListener("keydown", (e) => {
			e.stopPropagation(), e.key === "Enter" && !e.shiftKey ? (e.preventDefault(), this.#O(), this.stage.focus({ preventScroll: !0 })) : e.key === "Escape" && (e.preventDefault(), this.#k(), this.stage.focus({ preventScroll: !0 }));
		}), n.addEventListener("paste", (e) => {
			e.preventDefault(), document.execCommand("insertText", !1, e.clipboardData.getData("text/plain"));
		}), this.paper.append(n), n.focus();
	}
	#D() {
		if (!this.#p) return;
		let { box: e, x: t, y: n } = this.#p, r = this.#a;
		Object.assign(e.style, {
			left: `${t * r}px`,
			top: `${n * r}px`,
			font: this.#T(this.#u.size * r),
			lineHeight: String(X),
			color: this.#c
		});
	}
	#O() {
		if (!this.#p) return;
		let { box: e, x: t, y: n } = this.#p, r = e.innerText.replace(/\n+$/, "").split("\n");
		if (this.#k(), !r.some((e) => e.trim())) return;
		let i = N(this.canvas), a = this.canvas.getContext("2d"), o = this.#u.size;
		a.save(), a.font = this.#T(o), a.fillStyle = this.#c, a.textBaseline = "top", r.forEach((e, r) => a.fillText(e, t, n + o * .19999999999999996 / 2 + r * o * X)), a.restore(), this.#v(S("history.text"), i), this.render();
	}
	#k() {
		this.#p?.box.remove(), this.#p = null;
	}
	#A() {
		if (this.#d === "free" || !this.canvas) return null;
		if (this.#d === "image") return this.canvas.width / this.canvas.height;
		let [e, t = 1] = this.#d.split("/").map(Number);
		return e / t;
	}
	#j() {
		if (!this.canvas) return void (this.#f = null);
		let e = this.canvas.width, t = this.canvas.height, n = this.#A(), r = e, i = t;
		n && (r = Math.min(e, t * n), i = r / n), this.#f = {
			x: (e - r) / 2,
			y: (t - i) / 2,
			width: r,
			height: i
		}, this.#N();
	}
	#M(e, t) {
		if (e.preventDefault(), !this.#f) return;
		let n = this.canvas.width, r = this.canvas.height, i = this.#x(e), a = { ...this.#f }, o = this.#A();
		t === "new" && (i.x = Z(i.x, 0, n), i.y = Z(i.y, 0, r));
		let s = (e) => {
			let s = this.#x(e), c = s.x - i.x, l = s.y - i.y;
			this.#f = t === "move" ? {
				...a,
				x: Z(a.x + c, 0, n - a.width),
				y: Z(a.y + l, 0, r - a.height)
			} : t === "new" ? $(i.x, i.y, Z(s.x, 0, n), Z(s.y, 0, r), o, n, r) : ce(a, t, c, l, o, n, r), this.#N();
		}, c = () => {
			this.paper.removeEventListener("pointermove", s), this.paper.removeEventListener("pointerup", c), this.paper.removeEventListener("pointercancel", c), (this.#f.width < 1 || this.#f.height < 1) && this.#j();
		};
		this.paper.setPointerCapture(e.pointerId), this.paper.addEventListener("pointermove", s), this.paper.addEventListener("pointerup", c), this.paper.addEventListener("pointercancel", c);
	}
	#N() {
		let e = this.#f;
		if (this.cropFrame.hidden = !e || !this.canvas, !e || !this.canvas) return;
		let t = this.#a;
		Object.assign(this.cropFrame.style, {
			left: `${e.x * t}px`,
			top: `${e.y * t}px`,
			width: `${e.width * t}px`,
			height: `${e.height * t}px`
		}), this.cropSize.textContent = `${Math.round(e.width)} × ${Math.round(e.height)}`, this.applyCropBtn.disabled = Math.round(e.width) === this.canvas.width && Math.round(e.height) === this.canvas.height;
	}
	applyCrop() {
		let e = this.#f;
		if (!e || !this.canvas) return;
		let t = Math.round(e.x), n = Math.round(e.y), r = Z(Math.round(e.width), 1, this.canvas.width - t), i = Z(Math.round(e.height), 1, this.canvas.height - n);
		(r !== this.canvas.width || i !== this.canvas.height) && this.#y(S("history.crop"), L(this.canvas, {
			x: t,
			y: n,
			width: r,
			height: i
		}));
	}
	#P() {
		if (!this.canvas) return 1;
		let e = this.stage.clientWidth - 48, t = this.stage.clientHeight - 48;
		return e <= 0 || t <= 0 ? this.#a : Math.min(1, e / this.canvas.width, t / this.canvas.height);
	}
	#F() {
		if (!this.canvas) return;
		this.#o && (this.#a = this.#P());
		let e = this.#a, t = `${this.canvas.width * e}px`, n = `${this.canvas.height * e}px`;
		Object.assign(this.paper.style, {
			width: t,
			height: n
		}), this.canvas.classList.toggle("pixelated", e >= 2), this.zoomLabel.textContent = `${Math.round(e * 100)}%`, this.#N(), this.#D();
	}
	zoomTo(e, t, n) {
		if (!this.canvas) return;
		let r = this.stage.getBoundingClientRect();
		t ??= r.left + r.width / 2, n ??= r.top + r.height / 2;
		let i = this.#x({
			clientX: t,
			clientY: n
		});
		this.#a = Z(e, Y[0], Y.at(-1)), this.#o = !1, this.#F();
		let a = this.paper.getBoundingClientRect();
		this.stage.scrollLeft += a.left + i.x * this.#a - t, this.stage.scrollTop += a.top + i.y * this.#a - n;
	}
	zoomStep(e, t, n) {
		let r = this.#a, i = e > 0 ? Y.find((e) => e > r * 1.001) : Y.findLast((e) => e < r / 1.001);
		i && this.zoomTo(i, t, n);
	}
	fitToWindow() {
		this.#o = !0, this.#F();
	}
	#I(e) {
		if (!(e.ctrlKey || e.metaKey) || !this.canvas) return;
		e.preventDefault();
		let t = Math.abs(e.deltaY) < 40 ? Math.exp(-e.deltaY / 100) : null;
		t ? this.zoomTo(this.#a * t, e.clientX, e.clientY) : this.zoomStep(e.deltaY < 0 ? 1 : -1, e.clientX, e.clientY);
	}
	#L(e) {
		if (e.defaultPrevented || c() || e.target.closest?.(".ph-banner, .ph-scrim, select, input") || e.ctrlKey || e.metaKey || e.altKey) return;
		let t = e.key.length === 1 ? e.key.toLowerCase() : e.key, n = J.find((e) => e.key.toLowerCase() === t), r = !0;
		n ? this.setTool(n.id) : t === "+" || t === "=" ? this.zoomStep(1) : t === "-" ? this.zoomStep(-1) : t === "0" ? this.fitToWindow() : t === "1" ? this.zoomTo(1) : t === "ArrowLeft" && e.target.closest(".ph-main, .ph-toolbar") !== null ? this.step(-1) : t === "ArrowRight" && e.target.closest(".ph-main, .ph-toolbar") !== null ? this.step(1) : t === "Enter" && this.#s === "crop" && !e.target.closest("button") ? this.applyCrop() : t === "Escape" && this.#s === "crop" ? this.#j() : r = !1, r && e.preventDefault();
	}
	#R(e) {
		let t = (e) => [...e.dataTransfer?.types ?? []].includes("Files"), n = 0;
		this.main.addEventListener("dragenter", (e) => {
			t(e) && (n++, this.dropHint.hidden = !1);
		}, { signal: e }), this.main.addEventListener("dragleave", (e) => {
			t(e) && --n <= 0 && (n = 0, this.dropHint.hidden = !0);
		}, { signal: e }), this.main.addEventListener("dragover", (e) => {
			t(e) && (e.preventDefault(), e.dataTransfer.dropEffect = "copy");
		}, { signal: e }), this.main.addEventListener("drop", (e) => {
			t(e) && (e.preventDefault(), n = 0, this.dropHint.hidden = !0, this.confirmDiscard(S("confirm.unsaved.beforeImport", { name: this.name })).then((t) => {
				t && this.importFiles([...e.dataTransfer.files]);
			}));
		}, { signal: e });
	}
	#z() {
		let e = a("input", {
			type: "color",
			class: "ph-swatch ph-custom",
			title: S("color.custom.title"),
			"aria-label": S("color.custom")
		}), t = K(), n = t.map((e) => a("button", {
			class: "ph-swatch",
			type: "button",
			title: e.label,
			"aria-label": e.label,
			style: { background: e.value },
			onclick: () => this.#B(e.value)
		}));
		return n.forEach((e, n) => {
			e.dataset.color = t[n].value;
		}), e.addEventListener("input", () => this.#B(e.value)), a("span", {
			class: "ph-swatches",
			role: "group",
			"aria-label": S("option.color")
		}, n, e);
	}
	#B(e) {
		this.#c = e, this.#G(), this.#D(), this.#p?.box.focus();
	}
	#V({ value: e, min: t, max: n, unit: r, label: i, onInput: a }) {
		let o = d({
			value: e,
			min: t,
			max: n,
			unit: r,
			label: i
		}), s = o.querySelector("input");
		return s.addEventListener("input", () => a(Number(s.value))), o.set = (e) => {
			s.value = e, o.querySelector(".ctl-value").textContent = `${e}${r}`;
		}, o;
	}
	#H() {
		return this.brushSize = this.#V({
			value: this.#l.size,
			min: 1,
			max: 200,
			unit: " px",
			label: S("brush.size"),
			onInput: (e) => {
				this.#l.size = e, this.#l.chosen = !0;
			}
		}), this.brushOpacity = this.#V({
			value: 100,
			min: 5,
			max: 100,
			unit: "%",
			label: S("brush.opacity"),
			onInput: (e) => {
				this.#l.opacity = e;
			}
		}), this.opacityGroup = a("span", { class: "ph-option" }, a("span", { class: "ph-label" }, S("brush.opacity")), this.brushOpacity), a("div", {
			class: "ph-options",
			hidden: !0
		}, a("span", { class: "ph-option" }, a("span", { class: "ph-label" }, S("option.color")), this.#z()), a("span", { class: "ph-option" }, a("span", { class: "ph-label" }, S("brush.size")), this.brushSize), this.opacityGroup, l({
			value: "pen",
			label: S("brush.mode"),
			options: [{
				value: "pen",
				label: S("brush.pen")
			}, {
				value: "eraser",
				label: S("brush.eraser")
			}],
			onChange: (e) => {
				this.#l.mode = e, this.#G();
			}
		}));
	}
	#U() {
		return this.textSize = this.#V({
			value: this.#u.size,
			min: 8,
			max: 400,
			unit: " px",
			label: S("text.size"),
			onInput: (e) => {
				this.#u.size = e, this.#u.chosen = !0, this.#D();
			}
		}), this.boldBtn = a("button", {
			class: "ph-btn ph-bold",
			type: "button",
			title: S("text.bold"),
			"aria-label": S("text.bold"),
			"aria-pressed": "true",
			onclick: () => {
				this.#u.bold = !this.#u.bold, this.#G(), this.#D(), this.#p?.box.focus();
			}
		}, S("text.bold.letter")), a("div", {
			class: "ph-options",
			hidden: !0
		}, a("span", { class: "ph-option" }, a("span", { class: "ph-label" }, S("option.color")), this.#z()), a("span", { class: "ph-option" }, a("span", { class: "ph-label" }, S("text.font")), u({
			value: this.#u.font,
			label: S("text.font"),
			options: q.map((e) => ({
				value: e.value,
				label: e.label()
			})),
			onChange: (e) => {
				this.#u.font = e, this.#D(), this.#p?.box.focus();
			}
		})), a("span", { class: "ph-option" }, a("span", { class: "ph-label" }, S("text.size")), this.textSize), this.boldBtn, a("span", { class: "ph-hint" }, S("text.hint")));
	}
	#W() {
		return this.applyCropBtn = r({
			label: S("crop.apply"),
			primary: !0,
			onClick: () => this.applyCrop()
		}), a("div", {
			class: "ph-options",
			hidden: !0
		}, a("span", { class: "ph-option" }, a("span", { class: "ph-label" }, S("crop.ratio")), u({
			value: this.#d,
			label: S("crop.ratio"),
			options: re(),
			onChange: (e) => {
				this.#d = e, this.#j();
			}
		})), a("span", { class: "ph-hint" }, S("crop.hint")), a("span", { class: "ph-grow" }), r({
			label: S("crop.whole"),
			onClick: () => this.#j()
		}), this.applyCropBtn);
	}
	#G() {
		for (let e of this.win.body.querySelectorAll(".ph-swatch[data-color]")) e.setAttribute("aria-pressed", String(e.dataset.color === this.#c));
		for (let e of this.win.body.querySelectorAll(".ph-custom")) e.value = this.#c, e.classList.toggle("on", !K().some((e) => e.value === this.#c));
		this.brushSize?.set(this.#l.size), this.textSize?.set(this.#u.size), this.opacityGroup && (this.opacityGroup.hidden = this.#l.mode === "eraser"), this.boldBtn?.setAttribute("aria-pressed", String(this.#u.bold));
	}
	render() {
		let e = this.node, t = !!this.canvas;
		this.win.setTitle(this.name ? `${this.name}${this.dirty ? " •" : ""}` : "Photo", this.name ? "Photo" : ""), this.stage.hidden = !t, this.empty.hidden = t, t || this.#K();
		for (let e of [
			this.saveBtn,
			this.downloadBtn,
			this.resizeBtn,
			this.convertBtn,
			...this.toolBtns
		]) e.disabled = !t;
		this.revealBtn.disabled = !e, this.undoBtn.disabled = !this.stack.canUndo, this.redoBtn.disabled = !this.stack.canRedo, this.undoBtn.title = this.stack.undoLabel ? S("toolbar.undo.named", { label: this.stack.undoLabel }) : S("toolbar.undo"), this.redoBtn.title = this.stack.redoLabel ? S("toolbar.redo.named", { label: this.stack.redoLabel }) : S("toolbar.redo");
		let n = this.#h(), r = n.findIndex((e) => e.id === this.fileId);
		this.prevBtn.hidden = !t || r <= 0, this.nextBtn.hidden = !t || r === -1 || r >= n.length - 1, this.dims.textContent = t ? S("status.size", {
			width: this.canvas.width,
			height: this.canvas.height
		}) : "", this.info.textContent = t && this.name ? [O(this.name), e && R(e.size ?? 0)].filter(Boolean).join(" · ") : "";
		let a = e && i.get(e.parent), o = r + 1, s = n.length;
		this.position.textContent = r === -1 || s <= 1 ? "" : a ? S("status.positionIn", {
			index: o,
			count: s,
			folder: e.parent === i.root ? S("folder.home") : a.name
		}) : S("status.position", {
			index: o,
			count: s
		}), this.state.textContent = this.#m || (this.dirty ? S("status.modified") : ""), this.state.classList.toggle("dirty", !this.#m && this.dirty), this.zoomLabel.hidden = !t;
		for (let e of this.win.body.querySelectorAll(".ph-zoom-btn")) e.disabled = !t;
	}
	#K() {
		let e = (e, t, n) => a("button", {
			class: "ctl-btn",
			type: "button",
			onclick: n
		}, y(e), a("span", {}, t));
		this.empty.replaceChildren(a("div", { class: "ph-empty-icon" }, s("image")), a("div", { class: "ph-empty-title" }, this.#t && this.#m ? S("status.opening") : this.#e ? S("empty.unavailable") : S("empty.title")), a("p", {}, this.#e || S("empty.text")), a("div", { class: "ph-empty-actions" }, e("open", S("empty.open"), () => this.openFile()), e("upload", S("toolbar.import"), () => this.fileInput.click())));
	}
};
function $(e, t, n, r, i, a, o) {
	let s = n >= e ? 1 : -1, c = r >= t ? 1 : -1, l = Math.abs(n - e), u = Math.abs(r - t);
	if (i) {
		let n = s > 0 ? a - e : e, r = c > 0 ? o - t : t;
		l = Math.min(Math.max(l, u * i), n, r * i), u = l / i;
	}
	return {
		x: s > 0 ? e : e - l,
		y: c > 0 ? t : t - u,
		width: l,
		height: u
	};
}
function ce(e, t, n, r, i, a, o) {
	let s = e.x, c = e.y, l = e.x + e.width, u = e.y + e.height;
	if (t.includes("w") && (s = Z(s + n, 0, l - 1)), t.includes("e") && (l = Z(l + n, s + 1, a)), t.includes("n") && (c = Z(c + r, 0, u - 1)), t.includes("s") && (u = Z(u + r, c + 1, o)), !i) return {
		x: s,
		y: c,
		width: l - s,
		height: u - c
	};
	if (t.length === 2) return $(t.includes("w") ? e.x + e.width : e.x, t.includes("n") ? e.y + e.height : e.y, t.includes("w") ? s : l, t.includes("n") ? c : u, i, a, o);
	let d = e.x + e.width / 2, f = e.y + e.height / 2;
	if (t === "e" || t === "w") {
		let e = Math.min(l - s, 2 * Math.min(f, o - f) * i), n = e / i;
		return t === "w" ? s = l - e : l = s + e, e = l - s, {
			x: s,
			y: f - n / 2,
			width: e,
			height: n
		};
	}
	let p = Math.min(u - c, 2 * Math.min(d, a - d) / i), m = p * i;
	return t === "n" ? c = u - p : u = c + p, {
		x: d - m / 2,
		y: c,
		width: m,
		height: p
	};
}
export { ae as default, ne as filePreview };
