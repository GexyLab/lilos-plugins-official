import * as e from "/host/sdk.js";
import { UndoStack as t, Window as n, actionButton as r, formatBytes as i, fs as a, h as o, history as s, icon as c, isEditing as l, messageBox as u, segmented as d, selectField as f, slider as p, svg as m, toast as h, toggle as g } from "/host/sdk.js";
import { handleCommand as _, launch as v, pickFile as y } from "/host/system.js";
// src/photo/glyphs.js
var b = {
	upload: "<path d=\"M12 16V5M7 9.5l5-5 5 5M5 20h14\"/>",
	hand: "<path d=\"M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 11V4.5a1.5 1.5 0 0 1 3 0V12M14 11.5V6a1.5 1.5 0 0 1 3 0v8.5a6.5 6.5 0 0 1-6.5 6.5h-.8a6 6 0 0 1-4.6-2.2L3.6 15a1.5 1.5 0 0 1 2.3-1.9L8 15.5\"/>",
	brush: "<path d=\"M19.5 3.5l1 1-8.8 9.8-2-2z\"/><path d=\"M9.7 12.3c-2.2-.4-4.2 1-4.2 3.4 0 1.6-.8 2.6-2 3.3 3.8 1.1 8.4.3 8.2-4.7\"/>",
	text: "<path d=\"M5 6V4.5h14V6M12 4.5V20M9 20h6\"/>",
	crop: "<path d=\"M6 2v14a2 2 0 0 0 2 2h14\"/><path d=\"M2 6h14a2 2 0 0 1 2 2v14\"/>",
	resize: "<path d=\"M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7\"/>",
	convert: "<path d=\"M4 8h13l-3.5-3.5M20 16H7l3.5 3.5\"/>",
	actual: "<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\"/><path d=\"M11 9l2-1.5V16\"/>"
}, x = (e) => b[e] ? m("0 0 24 24", "ico", b[e]) : c(e);
// src/shared/i18n.js
function S(t, n) {
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
var { t: C } = S("photo", {
	en: { strings: {
		"@name": "Photo",
		"@description": "View and touch up images: drawing, text, cropping, resizing and conversion to PNG, JPEG or WebP.",
		"@commands.photo.save.label": "Save",
		"@commands.photo.open.label": "Open an image",
		"@entrypoints.main.params.file.label": "Image",
		"@entrypoints.main.params.file.description": "The image to open",
		"@entrypoints.filePreview.label": "Image previews",
		"@automation.photo.resize.label": "Resize the image",
		"@automation.photo.resize.params.width.label": "Width",
		"@automation.photo.resize.params.height.label": "Height",
		"@automation.photo.resize.params.unit.label": "Unit",
		"@automation.photo.resize.params.unit.options.pixels.label": "Pixels",
		"@automation.photo.resize.params.unit.options.percent.label": "Percent",
		"@automation.photo.resize.params.keepRatio.label": "Keep proportions",
		"@automation.photo.resize.params.keepRatio.description": "The height follows the width and the proportions of each image",
		"@automation.photo.resize.params.quality.label": "Quality",
		"@automation.photo.resize.params.quality.options.high.label": "High",
		"@automation.photo.resize.params.quality.options.medium.label": "Medium, faster",
		"@automation.photo.resize.params.quality.options.pixel.label": "Crisp pixels",
		"@automation.photo.crop.label": "Crop the image",
		"@automation.photo.crop.params.x.label": "Left",
		"@automation.photo.crop.params.x.description": "Pixels from the left edge",
		"@automation.photo.crop.params.y.label": "Top",
		"@automation.photo.crop.params.y.description": "Pixels from the top edge",
		"@automation.photo.crop.params.width.label": "Width",
		"@automation.photo.crop.params.height.label": "Height",
		"@automation.photo.saveAs.label": "Convert and save a copy",
		"@automation.photo.saveAs.params.format.label": "Format",
		"@automation.photo.saveAs.params.format.options.png.label": "PNG",
		"@automation.photo.saveAs.params.format.options.jpeg.label": "JPEG",
		"@automation.photo.saveAs.params.format.options.webp.label": "WebP",
		"@automation.photo.saveAs.params.quality.label": "Quality",
		"@automation.photo.saveAs.params.quality.description": "From 10 to 100, for JPEG and WebP",
		"@automation.photo.saveAs.params.name.label": "Name",
		"@automation.photo.saveAs.params.folder.label": "Folder",
		"@automation.photo.saveAs.params.open.label": "Open the copy after saving",
		"@automation.photo.save.label": "Save the image",
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
		"automation.noImage": "No image is open",
		"automation.notSaved": "The image was not saved",
		"automation.badFormat": "This browser can’t write that format",
		"automation.cropOutside": "The crop starts outside the image",
		"format.generic": "Image",
		"format.png.note": "PNG: lossless, with transparency.",
		"format.jpeg.note": "JPEG: smaller, good for photos; transparent areas become white.",
		"format.webp.note": "WebP: small, with transparency."
	} },
	it: { strings: {
		"@name": "Photo",
		"@description": "Guarda le immagini e le ritocca: disegno, testo, ritaglio, ridimensionamento e conversione in PNG, JPEG o WebP.",
		"@commands.photo.save.label": "Salva",
		"@commands.photo.open.label": "Apri un’immagine",
		"@entrypoints.main.params.file.label": "Immagine",
		"@entrypoints.main.params.file.description": "L’immagine da aprire",
		"@entrypoints.filePreview.label": "Anteprime delle immagini",
		"@automation.photo.resize.label": "Ridimensiona l’immagine",
		"@automation.photo.resize.params.width.label": "Larghezza",
		"@automation.photo.resize.params.height.label": "Altezza",
		"@automation.photo.resize.params.unit.label": "Unità",
		"@automation.photo.resize.params.unit.options.pixels.label": "Pixel",
		"@automation.photo.resize.params.unit.options.percent.label": "Percentuale",
		"@automation.photo.resize.params.keepRatio.label": "Mantieni le proporzioni",
		"@automation.photo.resize.params.keepRatio.description": "L’altezza segue la larghezza e le proporzioni di ogni immagine",
		"@automation.photo.resize.params.quality.label": "Qualità",
		"@automation.photo.resize.params.quality.options.high.label": "Alta",
		"@automation.photo.resize.params.quality.options.medium.label": "Media, più veloce",
		"@automation.photo.resize.params.quality.options.pixel.label": "Pixel netti",
		"@automation.photo.crop.label": "Ritaglia l’immagine",
		"@automation.photo.crop.params.x.label": "Da sinistra",
		"@automation.photo.crop.params.x.description": "Pixel dal bordo sinistro",
		"@automation.photo.crop.params.y.label": "Dall’alto",
		"@automation.photo.crop.params.y.description": "Pixel dal bordo superiore",
		"@automation.photo.crop.params.width.label": "Larghezza",
		"@automation.photo.crop.params.height.label": "Altezza",
		"@automation.photo.saveAs.label": "Converti e salva una copia",
		"@automation.photo.saveAs.params.format.label": "Formato",
		"@automation.photo.saveAs.params.format.options.png.label": "PNG",
		"@automation.photo.saveAs.params.format.options.jpeg.label": "JPEG",
		"@automation.photo.saveAs.params.format.options.webp.label": "WebP",
		"@automation.photo.saveAs.params.quality.label": "Qualità",
		"@automation.photo.saveAs.params.quality.description": "Da 10 a 100, per JPEG e WebP",
		"@automation.photo.saveAs.params.name.label": "Nome",
		"@automation.photo.saveAs.params.folder.label": "Cartella",
		"@automation.photo.saveAs.params.open.label": "Apri la copia dopo il salvataggio",
		"@automation.photo.save.label": "Salva l’immagine",
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
		"automation.noImage": "Nessuna immagine aperta",
		"automation.notSaved": "L’immagine non è stata salvata",
		"automation.badFormat": "Questo browser non sa scrivere quel formato",
		"automation.cropOutside": "Il ritaglio comincia fuori dall’immagine",
		"format.generic": "Immagine",
		"format.png.note": "PNG: senza perdita di qualità, con la trasparenza.",
		"format.jpeg.note": "JPEG: più leggero, adatto alle foto; le parti trasparenti diventano bianche.",
		"format.webp.note": "WebP: leggero e con la trasparenza."
	} }
}), w = {
	window: {
		width: 900,
		height: 620
	},
	fileTypes: [
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"bmp",
		"avif",
		"ico",
		"svg"
	],
	commands: [{
		id: "photo.save",
		label: "Save",
		keys: ["Ctrl+S"]
	}, {
		id: "photo.open",
		label: "Open an image",
		keys: ["Ctrl+O"]
	}],
	automation: [
		{
			id: "photo.resize",
			label: "Resize the image",
			target: "window",
			params: {
				width: {
					type: "number",
					label: "Width",
					min: 1
				},
				height: {
					type: "number",
					label: "Height",
					min: 1
				},
				unit: {
					type: "choice",
					label: "Unit",
					options: [{
						value: "pixels",
						label: "Pixels"
					}, {
						value: "percent",
						label: "Percent"
					}]
				},
				keepRatio: {
					type: "boolean",
					label: "Keep proportions",
					description: "The height follows the width and the proportions of each image"
				},
				quality: {
					type: "choice",
					label: "Quality",
					options: [
						{
							value: "high",
							label: "High"
						},
						{
							value: "medium",
							label: "Medium, faster"
						},
						{
							value: "pixel",
							label: "Crisp pixels"
						}
					]
				}
			}
		},
		{
			id: "photo.crop",
			label: "Crop the image",
			target: "window",
			params: {
				x: {
					type: "number",
					label: "Left",
					description: "Pixels from the left edge",
					min: 0
				},
				y: {
					type: "number",
					label: "Top",
					description: "Pixels from the top edge",
					min: 0
				},
				width: {
					type: "number",
					label: "Width",
					min: 1
				},
				height: {
					type: "number",
					label: "Height",
					min: 1
				}
			}
		},
		{
			id: "photo.saveAs",
			label: "Convert and save a copy",
			target: "window",
			result: "file",
			params: {
				format: {
					type: "choice",
					label: "Format",
					options: [
						{
							value: "png",
							label: "PNG"
						},
						{
							value: "jpeg",
							label: "JPEG"
						},
						{
							value: "webp",
							label: "WebP"
						}
					]
				},
				quality: {
					type: "number",
					label: "Quality",
					description: "From 10 to 100, for JPEG and WebP",
					min: 10,
					max: 100
				},
				name: {
					type: "text",
					label: "Name",
					maxLength: 255
				},
				folder: {
					type: "folder",
					label: "Folder"
				},
				open: {
					type: "boolean",
					label: "Open the copy after saving"
				}
			}
		},
		{
			id: "photo.save",
			label: "Save the image",
			target: "window"
		}
	]
}, T = [
	{
		id: "png",
		label: "PNG",
		type: "image/png",
		ext: "png",
		lossy: !1,
		get note() {
			return C("format.png.note");
		}
	},
	{
		id: "jpeg",
		label: "JPEG",
		type: "image/jpeg",
		ext: "jpg",
		lossy: !0,
		get note() {
			return C("format.jpeg.note");
		}
	},
	{
		id: "webp",
		label: "WebP",
		type: "image/webp",
		ext: "webp",
		lossy: !0,
		get note() {
			return C("format.webp.note");
		}
	}
], E = w.fileTypes, D = {
	png: "png",
	jpg: "jpeg",
	jpeg: "jpeg",
	webp: "webp"
}, O = {
	png: "PNG",
	jpg: "JPEG",
	jpeg: "JPEG",
	gif: "GIF",
	webp: "WebP",
	bmp: "BMP",
	avif: "AVIF",
	ico: "ICO",
	svg: "SVG"
}, k = (e) => (/\.([^.]+)$/.exec(e)?.[1] ?? "").toLowerCase(), A = (e) => O[k(e)] ?? (k(e).toUpperCase() || C("format.generic"));
function j(e) {
	let t = T.find((t) => t.id === D[k(e)]);
	return t && N(t) ? t : null;
}
var M = /* @__PURE__ */ new Map();
function N(e) {
	if (!M.has(e.id)) {
		let t = document.createElement("canvas");
		t.width = t.height = 1, M.set(e.id, t.toDataURL(e.type).startsWith(`data:${e.type}`));
	}
	return M.get(e.id);
}
function P(e, t) {
	let n = document.createElement("canvas");
	return n.width = Math.max(1, Math.round(e)), n.height = Math.max(1, Math.round(t)), n;
}
function F(e) {
	let t = P(e.width, e.height);
	return t.getContext("2d").drawImage(e, 0, 0), t;
}
async function I(e) {
	let t = URL.createObjectURL(e);
	try {
		let e = new Image();
		e.src = t, await e.decode();
		let n = e.naturalWidth || 300, r = e.naturalHeight || 150, i = P(n, r);
		return i.getContext("2d").drawImage(e, 0, 0, n, r), i;
	} finally {
		URL.revokeObjectURL(t);
	}
}
function L(e, t, n = .92) {
	let r = e;
	if (t.id === "jpeg") {
		r = P(e.width, e.height);
		let t = r.getContext("2d");
		t.fillStyle = "#fff", t.fillRect(0, 0, r.width, r.height), t.drawImage(e, 0, 0);
	}
	return new Promise((e, i) => {
		r.toBlob((t) => t ? e(t) : i(Error(C("error.tooLarge"))), t.type, t.lossy ? n : void 0);
	});
}
function R(e, t, n, r = "high") {
	t = Math.max(1, Math.round(t)), n = Math.max(1, Math.round(n));
	let i = e;
	if (r === "high") for (; i.width / 2 >= t && i.height / 2 >= n;) {
		let e = P(i.width / 2, i.height / 2), t = e.getContext("2d");
		t.imageSmoothingQuality = "high", t.drawImage(i, 0, 0, e.width, e.height), i = e;
	}
	let a = P(t, n), o = a.getContext("2d");
	return o.imageSmoothingEnabled = r !== "pixel", r !== "pixel" && (o.imageSmoothingQuality = r === "high" ? "high" : "medium"), o.drawImage(i, 0, 0, t, n), a;
}
function ee(e, { x: t, y: n, width: r, height: i }) {
	let a = P(r, i);
	return a.getContext("2d").drawImage(e, Math.round(t), Math.round(n), a.width, a.height, 0, 0, a.width, a.height), a;
}
// src/photo/dialogs.js
async function z(e, { title: t, rows: n, okLabel: r, collect: i, focus: a }) {
	let s, c = u(e, {
		title: t,
		width: 380,
		content: o("div", { class: "ph-sheet" }, n),
		buttons: ["cancel", {
			value: "ok",
			label: r,
			primary: !0
		}],
		validate: () => (s = i(), s !== void 0)
	});
	return a?.focus(), await c === "ok" ? s : null;
}
var B = (e, ...t) => o("div", { class: "ph-row" }, o("span", { class: "ph-row-label" }, e), ...t), V = (e, t) => o("input", {
	class: "ph-number",
	type: "number",
	min: 1,
	step: 1,
	value: e,
	"aria-label": t
});
function te(e, { width: t, height: n }) {
	let r = "px", i = !0, a = V(t, C("resize.width")), s = V(n, C("resize.height")), c = o("span", { class: "ph-unit" }, "px"), l = o("span", { class: "ph-unit" }, "px"), u = o("div", { class: "ph-hint" }), p = o("button", {
		class: "ph-lock",
		type: "button",
		"aria-pressed": "true",
		title: C("resize.keepRatio"),
		"aria-label": C("resize.keepRatio"),
		onclick: () => {
			i = !i, p.setAttribute("aria-pressed", String(i)), i && _("w");
		}
	}, x("link")), m = "high", h = () => {
		let e = Number(a.value), i = Number(s.value);
		return r === "px" ? [Math.round(e), Math.round(i)] : [Math.round(t * e / 100), Math.round(n * i / 100)];
	}, g = () => {
		let [e, r] = h();
		u.textContent = e > 0 && r > 0 ? C("resize.result", {
			width: t,
			height: n,
			newWidth: e,
			newHeight: r
		}) : C("resize.missing");
	}, _ = (e) => {
		i && (r === "%" ? (e === "w" ? s : a).value = (e === "w" ? a : s).value : e === "w" ? s.value = Math.max(1, Math.round(Number(a.value) * n / t)) : a.value = Math.max(1, Math.round(Number(s.value) * t / n))), g();
	};
	a.addEventListener("input", () => _("w")), s.addEventListener("input", () => _("h"));
	let v = d({
		value: "px",
		label: C("resize.unit"),
		options: [{
			value: "px",
			label: C("resize.pixels")
		}, {
			value: "%",
			label: C("resize.percent")
		}],
		onChange: (e) => {
			let [i, o] = h();
			r = e, c.textContent = l.textContent = e, a.value = e === "px" ? i : Math.round(i / t * 100), s.value = e === "px" ? o : Math.round(o / n * 100), g();
		}
	});
	return g(), z(e, {
		title: C("resize.title"),
		okLabel: C("resize.ok"),
		focus: a,
		rows: [
			B(C("resize.unit"), v),
			o("div", { class: "ph-row" }, o("span", { class: "ph-row-label" }, C("resize.size")), o("div", { class: "ph-size" }, o("label", { class: "ph-size-field" }, a, c), p, o("label", { class: "ph-size-field" }, s, l))),
			B(C("resize.quality"), f({
				value: m,
				label: C("resize.quality"),
				options: [
					{
						value: "high",
						label: C("resize.quality.high")
					},
					{
						value: "medium",
						label: C("resize.quality.medium")
					},
					{
						value: "pixel",
						label: C("resize.quality.pixel")
					}
				],
				onChange: (e) => {
					m = e;
				}
			})),
			u
		],
		collect: () => {
			let [e, o] = h();
			if (!(e > 0 && o > 0) || e > 16384 || o > 16384) {
				u.textContent = C("resize.outOfRange");
				return;
			}
			if (e === t && o === n) return null;
			let c = r === "%", l = {
				width: c ? Number(a.value) : e,
				height: c ? Number(s.value) : o,
				unit: c ? "percent" : "pixels",
				keepRatio: i,
				quality: m
			};
			return {
				width: e,
				height: o,
				quality: m,
				asked: l
			};
		}
	});
}
function ne(e, t, { name: n, folder: r, format: i = "png", title: s = C("convert.title"), okLabel: c = C("action.save") }) {
	let l = T.filter(N), u = l.find((e) => e.id === i) ?? l[0], f = r, m = 90, h = !0, _ = n.replace(/\.[^.]+$/, "") || C("file.defaultName"), v = o("input", {
		class: "ph-text",
		type: "text",
		spellcheck: "false",
		"aria-label": C("convert.fileName")
	});
	v.value = `${_}.${u.ext}`;
	let b = o("div", { class: "ph-hint" }), S = B(C("convert.quality"), p({
		value: m,
		min: 10,
		max: 100,
		unit: "%",
		label: C("convert.quality"),
		onChange: (e) => {
			m = e;
		}
	})), w = S.querySelector("input");
	w.addEventListener("input", () => {
		m = Number(w.value);
	});
	let E = o("span", { class: "ph-folder-name" }), D = o("button", {
		class: "ph-folder",
		type: "button",
		onclick: async () => {
			let e = await y(t, {
				kind: "folder",
				title: C("convert.pickFolder.title"),
				text: C("convert.pickFolder.text")
			});
			e && (f = e.id, O());
		}
	}, x("folder"), E), O = () => {
		let e = a.get(f);
		E.textContent = e ? f === a.root ? C("folder.home") : e.name : C("convert.chooseFolder"), D.title = e ? a.path(f) : "";
	}, k = () => {
		S.classList.toggle("off", !u.lossy), w.disabled = !u.lossy, b.textContent = u.note;
	};
	return O(), k(), z(e, {
		title: s,
		okLabel: c,
		focus: v,
		rows: [
			B(C("convert.format"), d({
				value: u.id,
				label: C("convert.format"),
				options: l.map((e) => ({
					value: e.id,
					label: e.label
				})),
				onChange: (e) => {
					u = l.find((t) => t.id === e), v.value = `${v.value.replace(/\.[^.]+$/, "") || _}.${u.ext}`, k();
				}
			})),
			S,
			B(C("convert.name"), v),
			o("div", { class: "ph-row" }, o("span", { class: "ph-row-label" }, C("convert.folder")), D),
			o("div", { class: "ph-row" }, o("span", { class: "ph-row-label" }, C("convert.openAfter")), g({
				value: h,
				label: C("convert.openAfterLabel"),
				onChange: (e) => {
					h = e;
				}
			})),
			b
		],
		collect: () => {
			let e = a.get(f), t = v.value.trim();
			if (!e || e.type !== "folder") b.textContent = C("convert.noFolder");
			else if (!t || t.includes("/")) b.textContent = C("convert.badName"), v.focus();
			else return {
				format: u,
				quality: m / 100,
				name: t,
				folder: f,
				open: h
			};
		}
	});
}
var H = 2048, U = 1024, re = (e, t = U) => Number.isFinite(e) ? Math.min(H, Math.max(16, Math.round(e))) : t;
function ie(e, t, { size: n = U } = {}) {
	e.handle(async (e) => typeof e?.file == "string" ? t(e.file, re(e.size, n)) : null);
}
async function ae(e, t = .85) {
	let n = e;
	typeof n?.toBlob != "function" && (n = document.createElement("canvas"), n.width = Math.max(1, e.width), n.height = Math.max(1, e.height), n.getContext("2d").drawImage(e, 0, 0));
	let r = (e) => new Promise((r) => n.toBlob(r, e, t)), i = await r("image/webp");
	return i?.type === "image/webp" ? i : r("image/png");
}
// src/photo/preview.js
var oe = {
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
function se({ lilos: e }) {
	ie(e, async (t, n) => {
		let r = await e.files.info(t), i = k(r.name);
		if (!E.includes(i) || !r.size) return null;
		let a = await e.files.read(t, { bytes: !0 }), o;
		try {
			o = await I(new Blob([a], { type: oe[i] }));
		} catch {
			return null;
		}
		let s = Math.min(1, n / Math.max(o.width, o.height));
		return { image: await ae(s < 1 ? R(o, o.width * s, o.height * s) : o) };
	});
}
// src/photo/PhotoApp.js
var W = () => [
	{
		value: "#ffffff",
		label: C("color.white")
	},
	{
		value: "#1f2328",
		label: C("color.black")
	},
	{
		value: "#e5484d",
		label: C("color.red")
	},
	{
		value: "#f2994a",
		label: C("color.orange")
	},
	{
		value: "#f2c94c",
		label: C("color.yellow")
	},
	{
		value: "#30a46c",
		label: C("color.green")
	},
	{
		value: "#3b6ef5",
		label: C("color.blue")
	},
	{
		value: "#7c5cdb",
		label: C("color.purple")
	}
], G = [
	{
		value: "sans",
		label: () => C("font.sans"),
		css: "system-ui, \"Segoe UI\", Roboto, sans-serif"
	},
	{
		value: "serif",
		label: () => C("font.serif"),
		css: "Georgia, \"Times New Roman\", serif"
	},
	{
		value: "mono",
		label: () => C("font.mono"),
		css: "ui-monospace, Consolas, \"Courier New\", monospace"
	},
	{
		value: "hand",
		label: () => C("font.hand"),
		css: "\"Segoe Print\", \"Bradley Hand\", \"Comic Sans MS\", cursive"
	}
], ce = () => [
	{
		value: "free",
		label: C("ratio.free")
	},
	{
		value: "image",
		label: C("ratio.image")
	},
	{
		value: "1",
		label: C("ratio.square")
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
], K = [
	{
		id: "view",
		label: () => C("tool.view"),
		key: "V",
		glyph: "hand"
	},
	{
		id: "brush",
		label: () => C("tool.brush"),
		key: "B",
		glyph: "brush"
	},
	{
		id: "text",
		label: () => C("tool.text"),
		key: "T",
		glyph: "text"
	},
	{
		id: "crop",
		label: () => C("tool.crop"),
		key: "C",
		glyph: "crop"
	}
], q = [
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
], J = 1.2, le = 20, Y = 16384, X = () => e.automation ?? null;
function ue({ args: e, openWindow: t } = {}) {
	let r = new n({
		title: "Photo",
		icon: "image",
		width: 900,
		height: 620,
		minWidth: 560,
		minHeight: 360
	}), i = new fe(r, t);
	return e?.file && a.exists(e.file) ? i.open(e.file) : i.render(), r.on("launch", (e) => {
		e?.file && a.exists(e.file) && i.open(e.file);
	}), r.canClose = () => i.confirmDiscard(), r.getState = () => ({ file: i.fileId }), r;
}
var Z = (e, t, n) => Math.min(n, Math.max(t, e)), de = (e, t) => e.name.localeCompare(t.name, void 0, {
	numeric: !0,
	sensitivity: "base"
}), Q = (e) => E.includes(k(e)), fe = class {
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
		this.win = e, this.openWindow = n ?? (() => {}), this.stack = new t({ limit: le });
		let { signal: r } = e, i = (e, t, n) => o("button", {
			class: "ph-btn",
			type: "button",
			title: t,
			"aria-label": t,
			onclick: n
		}, x(e));
		this.undoBtn = i("undo", C("toolbar.undo"), () => this.stack.undo()), this.redoBtn = i("redo", C("toolbar.redo"), () => this.stack.redo()), this.saveBtn = i("save", C("toolbar.save"), () => this.save()), this.downloadBtn = i("download", C("toolbar.download"), () => this.download()), this.revealBtn = i("folder", C("toolbar.reveal"), () => this.reveal()), this.toolBtns = K.map((e) => {
			let t = i(e.glyph, C("toolbar.tool", {
				label: e.label(),
				key: e.key
			}), () => this.setTool(e.id));
			return t.dataset.tool = e.id, t;
		});
		let l = (e, t, n, r) => o("button", {
			class: "ph-btn ph-labelled",
			type: "button",
			title: n,
			onclick: r
		}, x(e), o("span", {}, t));
		this.resizeBtn = l("resize", C("toolbar.resize"), C("toolbar.resize.title"), () => this.resize()), this.convertBtn = l("convert", C("toolbar.convert"), C("toolbar.convert.title"), () => this.convert()), this.fileInput = o("input", {
			type: "file",
			accept: "image/*,.svg",
			multiple: !0,
			hidden: !0
		}), this.fileInput.addEventListener("change", () => {
			let e = [...this.fileInput.files];
			this.fileInput.value = "", this.importFiles(e);
		}, { signal: r }), this.options = {
			brush: this.#W(),
			text: this.#G(),
			crop: this.#K()
		}, this.banner = o("div", {
			class: "ph-banner",
			role: "alertdialog",
			hidden: !0
		}), this.overlay = o("canvas", {
			class: "ph-overlay",
			"aria-hidden": "true"
		}), this.cropFrame = o("div", {
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
		].map((e) => o("span", {
			class: "ph-handle",
			dataset: { handle: e }
		})), this.cropSize = o("span", { class: "ph-crop-size" })), this.paper = o("div", { class: "ph-paper" }, this.overlay, this.cropFrame), this.stage = o("div", {
			class: "ph-stage",
			tabindex: "0",
			"aria-label": C("stage.label")
		}, this.paper), this.prevBtn = o("button", {
			class: "ph-nav ph-prev",
			type: "button",
			title: C("nav.previous.title"),
			"aria-label": C("nav.previous"),
			onclick: () => this.step(-1)
		}, c("arrowLeft")), this.nextBtn = o("button", {
			class: "ph-nav ph-next",
			type: "button",
			title: C("nav.next.title"),
			"aria-label": C("nav.next"),
			onclick: () => this.step(1)
		}, c("arrowRight")), this.empty = o("div", { class: "ph-empty" }), this.dropHint = o("div", {
			class: "ph-drop",
			hidden: !0
		}, x("upload"), o("span", {}, C("drop.hint"))), this.main = o("div", { class: "ph-main" }, this.stage, this.prevBtn, this.nextBtn, this.empty, this.dropHint), this.dims = o("span", { class: "ph-mono" }), this.info = o("span"), this.position = o("span"), this.state = o("span", { class: "ph-state" }), this.zoomLabel = o("button", {
			class: "ph-zoom-value",
			type: "button",
			title: C("zoom.fitToWindow"),
			onclick: () => this.fitToWindow()
		});
		let u = (e, t, n) => o("button", {
			class: "ph-zoom-btn",
			type: "button",
			title: t,
			"aria-label": t,
			onclick: n
		}, x(e));
		e.body.classList.add("ph"), e.body.append(o("div", { class: "ph-toolbar" }, i("open", C("toolbar.open"), () => this.openFile()), i("upload", C("toolbar.import"), () => this.fileInput.click()), this.saveBtn, this.downloadBtn, o("span", { class: "ph-sep" }), this.undoBtn, this.redoBtn, o("span", { class: "ph-sep" }), o("span", {
			class: "ph-tools",
			role: "group",
			"aria-label": C("toolbar.tools")
		}, this.toolBtns), o("span", { class: "ph-sep" }), this.resizeBtn, this.convertBtn, o("span", { class: "ph-grow" }), this.revealBtn, this.fileInput), ...Object.values(this.options), this.banner, this.main, o("div", { class: "ph-status" }, this.dims, this.info, this.position, this.state, o("span", { class: "ph-grow" }), u("minus", C("zoom.out"), () => this.zoomStep(-1)), this.zoomLabel, u("plus", C("zoom.in"), () => this.zoomStep(1)), u("fit", C("zoom.fit"), () => this.fitToWindow()), u("actual", C("zoom.actual"), () => this.zoomTo(1)))), this.paper.addEventListener("pointerdown", (e) => this.#T(e), { signal: r }), this.stage.addEventListener("pointerdown", (e) => this.#w(e), { signal: r }), this.stage.addEventListener("wheel", (e) => this.#R(e), {
			signal: r,
			passive: !1
		}), e.body.addEventListener("keydown", (e) => this.#z(e), { signal: r }), this.#B(r), addEventListener("beforeunload", (e) => {
			this.dirty && e.preventDefault();
		}, { signal: r });
		let d = new ResizeObserver(() => {
			this.#o && this.#L();
		});
		d.observe(this.stage);
		let f = [
			a.on("change", (e) => this.#v(e)),
			a.on("scope", () => this.render()),
			this.stack.on("change", () => this.render()),
			_("photo.save", {
				isActive: () => e.active,
				run: () => this.save()
			}),
			_("photo.open", {
				isActive: () => e.active,
				run: () => this.openFile()
			}),
			s.attach(e.body, this.stack)
		];
		e.on("destroy", () => {
			f.forEach((e) => e()), d.disconnect();
		});
		let p = X();
		if (p) {
			let t = () => this.fileId;
			p.handle("photo.resize", (e) => this.resizeTo(e), {
				window: e,
				file: t
			}), p.handle("photo.crop", (e) => void this.cropTo(e), {
				window: e,
				file: t
			}), p.handle("photo.saveAs", (e) => this.saveCopy(e), {
				window: e,
				file: t
			}), p.handle("photo.save", () => this.saveInPlace(), {
				window: e,
				file: t
			});
		}
		this.setTool("view");
	}
	get dirty() {
		return !!this.canvas && this.#n !== this.#r;
	}
	get node() {
		return this.fileId ? a.get(this.fileId) : null;
	}
	async open(e) {
		let t = a.get(e);
		if (!t || t.type !== "file" || e === this.fileId && this.canvas && !this.#e || !await this.confirmDiscard(C("confirm.unsaved.beforeOpen", {
			name: this.name,
			other: t.name
		}))) return;
		this.#j();
		let n = ++this.#t;
		this.#m = C("status.opening"), this.render();
		let r = null, i = "";
		try {
			r = await I(await a.readBlob(e));
		} catch (e) {
			i = e?.name === "EncodingError" || e instanceof DOMException ? C("error.unsupported", { name: t.name }) : C("error.unreadable", {
				name: t.name,
				error: e?.message ?? e
			});
		}
		n === this.#t && (this.#m = "", this.fileId = e, this.name = t.name, this.#e = i, this.#y(r), this.stack.clear(), this.#n = this.#r = ++this.#i, this.#S(), this.#o = !0, this.render(), this.#s === "crop" && this.#N(), this.#L(), this.stage.focus({ preventScroll: !0 }));
	}
	async openFile() {
		let e = await y(this.openWindow, {
			title: C("pick.open.title"),
			exts: E
		});
		e && this.open(e.id);
	}
	async importFiles(e) {
		let t = e.filter((e) => Q(e.name) || e.type.startsWith("image/"));
		if (e.length && !t.length) return h(e.length === 1 ? C("import.notImage", { name: e[0].name }) : C("import.noImages"));
		if (!t.length) return;
		let n = this.node && a.get(this.node.parent), r = n?.type === "folder" ? n : a.resolve("/Immagini") ?? a.get(a.root), i = null;
		for (let e of t) {
			let t = Q(e.name) ? e.name : `${e.name || C("file.defaultName")}.${e.type.split("/")[1] ?? "png"}`, n = a.create(r.id, {
				type: "file",
				name: t
			});
			try {
				await a.write(n.id, e), i ??= n;
			} catch (t) {
				a.remove(n.id), h(C("import.failed", {
					name: e.name,
					error: t?.message ?? t
				}));
			}
		}
		i && (h(C("import.done", {
			n: t.length,
			folder: r.id === a.root ? C("folder.home") : r.name
		})), this.open(i.id));
	}
	async save() {
		if (this.#A(), !this.canvas) return !1;
		let e = this.node, t = e && j(e.name);
		if (!t) return this.convert({
			title: e ? C("save.cannotWrite", { format: A(e.name) }) : C("save.fileGone"),
			okLabel: C("save.saveCopy"),
			open: !0
		});
		try {
			await a.write(e.id, await L(this.canvas, t));
		} catch (e) {
			return h(`Non salvata: ${e?.message ?? e}`), !1;
		}
		this.#r = this.#n, X()?.record("photo.save", { file: e.id });
		let n = this.#m = C("status.saved");
		return this.render(), setTimeout(() => {
			this.#m === n && (this.#m = "", this.render());
		}, 2e3), !0;
	}
	async saveInPlace() {
		if (!this.canvas) throw Error(C("automation.noImage"));
		let e = this.node;
		if (!e || !j(e.name)) throw Error(e ? C("save.cannotWrite", { format: A(e.name) }) : C("save.fileGone"));
		if (!await this.save()) throw Error(C("automation.notSaved"));
	}
	#h() {
		let e = this.node, t = e && a.get(e.parent)?.type === "folder" ? e.parent : (a.resolve("/Immagini") ?? a.get(a.root)).id, n = e && j(e.name);
		return {
			name: this.name || `${C("file.defaultName")}.png`,
			folder: t,
			format: n?.id === "png" ? "jpeg" : "png"
		};
	}
	async #g({ format: e, quality: t, name: n, folder: r }) {
		let i = await L(this.canvas, e, t), o = a.create(r, {
			type: "file",
			name: n
		});
		try {
			await a.write(o.id, i);
		} catch (e) {
			throw a.remove(o.id), e;
		}
		return {
			copy: o,
			blob: i
		};
	}
	async convert({ title: e, okLabel: t, open: n } = {}) {
		if (this.#A(), !this.canvas) return !1;
		let r = this.#h(), a = await ne(this.win, this.openWindow, {
			...r,
			title: e,
			okLabel: t
		});
		if (!a) return !1;
		n !== void 0 && (a.open = n);
		let o = this.fileId, s, c;
		try {
			({copy: s, blob: c} = await this.#g(a));
		} catch (e) {
			return h(`Non salvata: ${e?.message ?? e}`), !1;
		}
		let l = r.name.replace(/\.[^.]+$/, "") || C("file.defaultName");
		return X()?.record("photo.saveAs", {
			params: {
				format: a.format.id,
				quality: Math.round(a.quality * 100),
				name: a.name,
				folder: a.folder,
				open: a.open
			},
			defaults: {
				format: r.format,
				quality: 90,
				name: `${l}.${T.find((e) => e.id === r.format).ext}`,
				folder: r.folder,
				open: !0
			},
			file: o,
			result: s.id
		}), a.open ? (this.#r = this.#n, await this.open(s.id)) : h(C("convert.saved", {
			name: s.name,
			size: i(c.size)
		})), !0;
	}
	async saveCopy({ format: e, quality: t = 90, name: n, folder: r, open: i = !1 } = {}) {
		if (this.#A(), !this.canvas) throw Error(C("automation.noImage"));
		let o = this.#h(), s = T.find((t) => t.id === (e ?? o.format));
		if (!s || !N(s)) throw Error(C("automation.badFormat"));
		let c = r ?? o.folder;
		if (a.get(c)?.type !== "folder") throw Error(C("convert.noFolder"));
		let l = n?.trim() || `${o.name.replace(/\.[^.]+$/, "") || C("file.defaultName")}.${s.ext}`;
		if (l.includes("/")) throw Error(C("convert.badName"));
		let { copy: u } = await this.#g({
			format: s,
			quality: Z(Number(t) || 90, 10, 100) / 100,
			name: l,
			folder: c
		});
		return i && (this.#r = this.#n, await this.open(u.id)), u.id;
	}
	async download() {
		if (this.#A(), !this.canvas) return;
		let e = this.node, t, n = this.name || `${C("file.defaultName")}.png`;
		try {
			if (e && !this.dirty) t = await a.readBlob(e.id);
			else {
				let e = j(n) ?? T[0];
				j(n) || (n = `${n.replace(/\.[^.]+$/, "")}.png`), t = await L(this.canvas, e);
			}
		} catch (e) {
			return h(C("error.notDownloaded", { error: e?.message ?? e }));
		}
		let r = URL.createObjectURL(t);
		o("a", {
			href: r,
			download: n
		}).click(), setTimeout(() => URL.revokeObjectURL(r), 3e4);
	}
	reveal() {
		let e = this.node;
		e && v("files", { folder: e.parent });
	}
	#_() {
		let e = this.node;
		return e ? a.children(e.parent).filter((e) => e.type === "file" && Q(e.name)).sort(de) : [];
	}
	step(e) {
		let t = this.#_(), n = t.findIndex((e) => e.id === this.fileId), r = t[n + e];
		n !== -1 && r && this.open(r.id);
	}
	confirmDiscard(e) {
		return this.#A(), this.dirty ? new Promise((t) => {
			let n = async (e) => {
				this.banner.hidden = !0, this.banner.replaceChildren(), t(e === "save" ? await this.save() : e === "discard"), e === "cancel" && this.stage.focus();
			}, i = r({
				label: C("action.save"),
				primary: !0,
				onClick: () => n("save")
			});
			this.banner.replaceChildren(c("help"), o("span", { class: "ph-banner-text" }, e ?? C("confirm.unsaved", { name: this.name })), i, r({
				label: C("confirm.discard"),
				danger: !0,
				onClick: () => n("discard")
			}), r({
				label: C("action.cancel"),
				onClick: () => n("cancel")
			})), this.banner.onkeydown = (e) => {
				e.key === "Escape" && (e.stopPropagation(), n("cancel"));
			}, this.banner.hidden = !1, i.focus();
		}) : Promise.resolve(!0);
	}
	#v({ type: e, node: t, ids: n }) {
		if (!this.fileId) return this.render();
		(e === "rename" || e === "update") && t?.id === this.fileId && (this.name = t.name), e === "remove" && n?.includes(this.fileId) && (this.#m = C("status.fileGone")), this.render();
	}
	#y(e) {
		this.canvas?.remove(), this.canvas = e, e && (e.classList.add("ph-image"), this.paper.prepend(e), this.overlay.width = e.width, this.overlay.height = e.height);
	}
	#b(e, t) {
		let n = F(this.canvas), r = this.#n, i = this.#n = ++this.#i, a = (e, t) => {
			this.#j();
			let n = e.width !== this.canvas?.width || e.height !== this.canvas?.height;
			this.#y(F(e)), this.#n = t, this.#s === "crop" && this.#N(), n && (this.#o = !0), this.#L(), this.render();
		};
		this.stack.push({
			label: e,
			undo: () => a(t, r),
			redo: () => a(n, i)
		});
	}
	#x(e, t) {
		let n = F(this.canvas);
		this.#y(t), this.#o = !0, this.#b(e, n), this.#s === "crop" && this.#N(), this.#L(), this.render();
	}
	async resize() {
		if (this.#A(), !this.canvas) return;
		let { width: e, height: t } = this.canvas, n = await te(this.win, {
			width: e,
			height: t
		});
		n && (this.#x(C("history.resize"), R(this.canvas, n.width, n.height, n.quality)), X()?.record("photo.resize", {
			params: n.asked,
			defaults: {
				width: e,
				height: t,
				unit: "pixels",
				keepRatio: !0,
				quality: "high"
			},
			file: this.fileId
		}));
	}
	resizeTo({ width: e, height: t, unit: n = "pixels", keepRatio: r = !0, quality: i = "high" } = {}) {
		if (this.#A(), !this.canvas) throw Error(C("automation.noImage"));
		let a = this.canvas.width, o = this.canvas.height, s, c;
		if (n === "percent" ? (s = Math.round(a * e / 100), c = Math.round(o * (r ? e : t) / 100)) : (s = Math.round(e), c = r ? Math.max(1, Math.round(e * o / a)) : Math.round(t)), !(s > 0 && c > 0) || s > Y || c > Y) throw Error(C("resize.outOfRange"));
		(s !== a || c !== o) && this.#x(C("history.resize"), R(this.canvas, s, c, [
			"high",
			"medium",
			"pixel"
		].includes(i) ? i : "high"));
	}
	#S() {
		if (!this.canvas) return;
		let e = Math.min(this.canvas.width, this.canvas.height);
		this.#l.chosen || (this.#l.size = Z(Math.round(e / 120), 2, 200)), this.#u.chosen || (this.#u.size = Z(Math.round(e / 14), 12, 400)), this.#q();
	}
	setTool(e) {
		this.#s === "text" && e !== "text" && this.#A(), this.#s = e;
		for (let t of this.toolBtns) t.setAttribute("aria-pressed", String(t.dataset.tool === e));
		for (let [t, n] of Object.entries(this.options)) n.hidden = t !== e;
		this.paper.dataset.tool = e, this.stage.dataset.tool = e, e === "crop" ? this.#N() : this.#f = null, this.#F();
	}
	#C(e) {
		let t = this.paper.getBoundingClientRect();
		return {
			x: (e.clientX - t.left) / this.#a,
			y: (e.clientY - t.top) / this.#a
		};
	}
	#w(e) {
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
		} else e.button === 0 && this.#s === "crop" && this.canvas && !this.paper.contains(e.target) && this.#P(e, "new");
	}
	#T(e) {
		if (e.button === 0 && this.canvas) {
			if (this.#s === "brush") e.stopPropagation(), this.#E(e);
			else if (this.#s === "text") {
				if (e.stopPropagation(), this.#p && this.#p.box.contains(e.target)) return;
				e.preventDefault(), this.#p ? this.#A() : this.#O(this.#C(e));
			} else this.#s === "crop" && (e.stopPropagation(), this.#P(e, e.target.dataset.handle ?? (e.target === this.cropFrame ? "move" : "new")));
		}
	}
	#E(e) {
		e.preventDefault();
		let { size: t, opacity: n, mode: r } = this.#l, i = F(this.canvas), a = r === "eraser", o = (a ? this.canvas : this.overlay).getContext("2d");
		o.save(), o.lineCap = o.lineJoin = "round", o.lineWidth = t, o.strokeStyle = o.fillStyle = this.#c, a && (o.globalCompositeOperation = "destination-out"), this.overlay.style.opacity = a ? "" : String(n / 100);
		let s = this.#C(e);
		o.beginPath(), o.arc(s.x, s.y, t / 2, 0, Math.PI * 2), o.fill();
		let c = (e) => {
			for (let t of e.getCoalescedEvents?.() ?? [e]) {
				let e = this.#C(t);
				o.beginPath(), o.moveTo(s.x, s.y), o.lineTo(e.x, e.y), o.stroke(), s = e;
			}
		}, l = () => {
			if (this.paper.removeEventListener("pointermove", c), this.paper.removeEventListener("pointerup", l), this.paper.removeEventListener("pointercancel", l), o.restore(), !a) {
				let e = this.canvas.getContext("2d");
				e.save(), e.globalAlpha = n / 100, e.drawImage(this.overlay, 0, 0), e.restore(), o.clearRect(0, 0, this.overlay.width, this.overlay.height);
			}
			this.#b(C(a ? "history.erase" : "history.draw"), i), X()?.missed("photo", C("tool.brush")), this.render();
		};
		this.paper.setPointerCapture(e.pointerId), this.paper.addEventListener("pointermove", c), this.paper.addEventListener("pointerup", l), this.paper.addEventListener("pointercancel", l);
	}
	#D(e) {
		let t = G.find((e) => e.value === this.#u.font) ?? G[0];
		return `${this.#u.bold ? 700 : 400} ${e}px ${t.css}`;
	}
	#O({ x: e, y: t }) {
		let n = o("div", {
			class: "ph-textbox",
			role: "textbox",
			"aria-label": C("text.box"),
			"aria-multiline": "true",
			spellcheck: "false"
		});
		n.contentEditable = "plaintext-only", n.contentEditable !== "plaintext-only" && (n.contentEditable = "true"), this.#p = {
			box: n,
			x: e,
			y: t - this.#u.size * J / 2
		}, this.#k(), n.addEventListener("keydown", (e) => {
			e.stopPropagation(), e.key === "Enter" && !e.shiftKey ? (e.preventDefault(), this.#A(), this.stage.focus({ preventScroll: !0 })) : e.key === "Escape" && (e.preventDefault(), this.#j(), this.stage.focus({ preventScroll: !0 }));
		}), n.addEventListener("paste", (e) => {
			e.preventDefault(), document.execCommand("insertText", !1, e.clipboardData.getData("text/plain"));
		}), this.paper.append(n), n.focus();
	}
	#k() {
		if (!this.#p) return;
		let { box: e, x: t, y: n } = this.#p, r = this.#a;
		Object.assign(e.style, {
			left: `${t * r}px`,
			top: `${n * r}px`,
			font: this.#D(this.#u.size * r),
			lineHeight: String(J),
			color: this.#c
		});
	}
	#A() {
		if (!this.#p) return;
		let { box: e, x: t, y: n } = this.#p, r = e.innerText.replace(/\n+$/, "").split("\n");
		if (this.#j(), !r.some((e) => e.trim())) return;
		let i = F(this.canvas), a = this.canvas.getContext("2d"), o = this.#u.size;
		a.save(), a.font = this.#D(o), a.fillStyle = this.#c, a.textBaseline = "top", r.forEach((e, r) => a.fillText(e, t, n + o * .19999999999999996 / 2 + r * o * J)), a.restore(), this.#b(C("history.text"), i), X()?.missed("photo", C("tool.text")), this.render();
	}
	#j() {
		this.#p?.box.remove(), this.#p = null;
	}
	#M() {
		if (this.#d === "free" || !this.canvas) return null;
		if (this.#d === "image") return this.canvas.width / this.canvas.height;
		let [e, t = 1] = this.#d.split("/").map(Number);
		return e / t;
	}
	#N() {
		if (!this.canvas) return void (this.#f = null);
		let e = this.canvas.width, t = this.canvas.height, n = this.#M(), r = e, i = t;
		n && (r = Math.min(e, t * n), i = r / n), this.#f = {
			x: (e - r) / 2,
			y: (t - i) / 2,
			width: r,
			height: i
		}, this.#F();
	}
	#P(e, t) {
		if (e.preventDefault(), !this.#f) return;
		let n = this.canvas.width, r = this.canvas.height, i = this.#C(e), a = { ...this.#f }, o = this.#M();
		t === "new" && (i.x = Z(i.x, 0, n), i.y = Z(i.y, 0, r));
		let s = (e) => {
			let s = this.#C(e), c = s.x - i.x, l = s.y - i.y;
			this.#f = t === "move" ? {
				...a,
				x: Z(a.x + c, 0, n - a.width),
				y: Z(a.y + l, 0, r - a.height)
			} : t === "new" ? $(i.x, i.y, Z(s.x, 0, n), Z(s.y, 0, r), o, n, r) : pe(a, t, c, l, o, n, r), this.#F();
		}, c = () => {
			this.paper.removeEventListener("pointermove", s), this.paper.removeEventListener("pointerup", c), this.paper.removeEventListener("pointercancel", c), (this.#f.width < 1 || this.#f.height < 1) && this.#N();
		};
		this.paper.setPointerCapture(e.pointerId), this.paper.addEventListener("pointermove", s), this.paper.addEventListener("pointerup", c), this.paper.addEventListener("pointercancel", c);
	}
	#F() {
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
		let t = this.cropTo({
			x: e.x,
			y: e.y,
			width: e.width,
			height: e.height
		});
		t && X()?.record("photo.crop", {
			params: t,
			file: this.fileId
		});
	}
	cropTo({ x: e = 0, y: t = 0, width: n, height: r } = {}) {
		if (!this.canvas) throw Error(C("automation.noImage"));
		let i = this.canvas.width, a = this.canvas.height;
		if (e = Math.round(e), t = Math.round(t), !(e >= 0 && t >= 0 && e < i && t < a)) throw Error(C("automation.cropOutside"));
		let o = {
			x: e,
			y: t,
			width: Z(Math.round(n ?? i - e), 1, i - e),
			height: Z(Math.round(r ?? a - t), 1, a - t)
		};
		return o.width === i && o.height === a ? null : (this.#x(C("history.crop"), ee(this.canvas, o)), o);
	}
	#I() {
		if (!this.canvas) return 1;
		let e = this.stage.clientWidth - 48, t = this.stage.clientHeight - 48;
		return e <= 0 || t <= 0 ? this.#a : Math.min(1, e / this.canvas.width, t / this.canvas.height);
	}
	#L() {
		if (!this.canvas) return;
		this.#o && (this.#a = this.#I());
		let e = this.#a, t = `${this.canvas.width * e}px`, n = `${this.canvas.height * e}px`;
		Object.assign(this.paper.style, {
			width: t,
			height: n
		}), this.canvas.classList.toggle("pixelated", e >= 2), this.zoomLabel.textContent = `${Math.round(e * 100)}%`, this.#F(), this.#k();
	}
	zoomTo(e, t, n) {
		if (!this.canvas) return;
		let r = this.stage.getBoundingClientRect();
		t ??= r.left + r.width / 2, n ??= r.top + r.height / 2;
		let i = this.#C({
			clientX: t,
			clientY: n
		});
		this.#a = Z(e, q[0], q.at(-1)), this.#o = !1, this.#L();
		let a = this.paper.getBoundingClientRect();
		this.stage.scrollLeft += a.left + i.x * this.#a - t, this.stage.scrollTop += a.top + i.y * this.#a - n;
	}
	zoomStep(e, t, n) {
		let r = this.#a, i = e > 0 ? q.find((e) => e > r * 1.001) : q.findLast((e) => e < r / 1.001);
		i && this.zoomTo(i, t, n);
	}
	fitToWindow() {
		this.#o = !0, this.#L();
	}
	#R(e) {
		if (!(e.ctrlKey || e.metaKey) || !this.canvas) return;
		e.preventDefault();
		let t = Math.abs(e.deltaY) < 40 ? Math.exp(-e.deltaY / 100) : null;
		t ? this.zoomTo(this.#a * t, e.clientX, e.clientY) : this.zoomStep(e.deltaY < 0 ? 1 : -1, e.clientX, e.clientY);
	}
	#z(e) {
		if (e.defaultPrevented || l() || e.target.closest?.(".ph-banner, .msgbox-layer, select, input") || e.ctrlKey || e.metaKey || e.altKey) return;
		let t = e.key.length === 1 ? e.key.toLowerCase() : e.key, n = K.find((e) => e.key.toLowerCase() === t), r = !0;
		n ? this.setTool(n.id) : t === "+" || t === "=" ? this.zoomStep(1) : t === "-" ? this.zoomStep(-1) : t === "0" ? this.fitToWindow() : t === "1" ? this.zoomTo(1) : t === "ArrowLeft" && e.target.closest(".ph-main, .ph-toolbar") !== null ? this.step(-1) : t === "ArrowRight" && e.target.closest(".ph-main, .ph-toolbar") !== null ? this.step(1) : t === "Enter" && this.#s === "crop" && !e.target.closest("button") ? this.applyCrop() : t === "Escape" && this.#s === "crop" ? this.#N() : r = !1, r && e.preventDefault();
	}
	#B(e) {
		let t = (e) => [...e.dataTransfer?.types ?? []].includes("Files"), n = 0;
		this.main.addEventListener("dragenter", (e) => {
			t(e) && (n++, this.dropHint.hidden = !1);
		}, { signal: e }), this.main.addEventListener("dragleave", (e) => {
			t(e) && --n <= 0 && (n = 0, this.dropHint.hidden = !0);
		}, { signal: e }), this.main.addEventListener("dragover", (e) => {
			t(e) && (e.preventDefault(), e.dataTransfer.dropEffect = "copy");
		}, { signal: e }), this.main.addEventListener("drop", (e) => {
			t(e) && (e.preventDefault(), n = 0, this.dropHint.hidden = !0, this.confirmDiscard(C("confirm.unsaved.beforeImport", { name: this.name })).then((t) => {
				t && this.importFiles([...e.dataTransfer.files]);
			}));
		}, { signal: e });
	}
	#V() {
		let e = o("input", {
			type: "color",
			class: "ph-swatch ph-custom",
			title: C("color.custom.title"),
			"aria-label": C("color.custom")
		}), t = W(), n = t.map((e) => o("button", {
			class: "ph-swatch",
			type: "button",
			title: e.label,
			"aria-label": e.label,
			style: { background: e.value },
			onclick: () => this.#H(e.value)
		}));
		return n.forEach((e, n) => {
			e.dataset.color = t[n].value;
		}), e.addEventListener("input", () => this.#H(e.value)), o("span", {
			class: "ph-swatches",
			role: "group",
			"aria-label": C("option.color")
		}, n, e);
	}
	#H(e) {
		this.#c = e, this.#q(), this.#k(), this.#p?.box.focus();
	}
	#U({ value: e, min: t, max: n, unit: r, label: i, onInput: a }) {
		let o = p({
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
	#W() {
		return this.brushSize = this.#U({
			value: this.#l.size,
			min: 1,
			max: 200,
			unit: " px",
			label: C("brush.size"),
			onInput: (e) => {
				this.#l.size = e, this.#l.chosen = !0;
			}
		}), this.brushOpacity = this.#U({
			value: 100,
			min: 5,
			max: 100,
			unit: "%",
			label: C("brush.opacity"),
			onInput: (e) => {
				this.#l.opacity = e;
			}
		}), this.opacityGroup = o("span", { class: "ph-option" }, o("span", { class: "ph-label" }, C("brush.opacity")), this.brushOpacity), o("div", {
			class: "ph-options",
			hidden: !0
		}, o("span", { class: "ph-option" }, o("span", { class: "ph-label" }, C("option.color")), this.#V()), o("span", { class: "ph-option" }, o("span", { class: "ph-label" }, C("brush.size")), this.brushSize), this.opacityGroup, d({
			value: "pen",
			label: C("brush.mode"),
			options: [{
				value: "pen",
				label: C("brush.pen")
			}, {
				value: "eraser",
				label: C("brush.eraser")
			}],
			onChange: (e) => {
				this.#l.mode = e, this.#q();
			}
		}));
	}
	#G() {
		return this.textSize = this.#U({
			value: this.#u.size,
			min: 8,
			max: 400,
			unit: " px",
			label: C("text.size"),
			onInput: (e) => {
				this.#u.size = e, this.#u.chosen = !0, this.#k();
			}
		}), this.boldBtn = o("button", {
			class: "ph-btn ph-bold",
			type: "button",
			title: C("text.bold"),
			"aria-label": C("text.bold"),
			"aria-pressed": "true",
			onclick: () => {
				this.#u.bold = !this.#u.bold, this.#q(), this.#k(), this.#p?.box.focus();
			}
		}, C("text.bold.letter")), o("div", {
			class: "ph-options",
			hidden: !0
		}, o("span", { class: "ph-option" }, o("span", { class: "ph-label" }, C("option.color")), this.#V()), o("span", { class: "ph-option" }, o("span", { class: "ph-label" }, C("text.font")), f({
			value: this.#u.font,
			label: C("text.font"),
			options: G.map((e) => ({
				value: e.value,
				label: e.label()
			})),
			onChange: (e) => {
				this.#u.font = e, this.#k(), this.#p?.box.focus();
			}
		})), o("span", { class: "ph-option" }, o("span", { class: "ph-label" }, C("text.size")), this.textSize), this.boldBtn, o("span", { class: "ph-hint" }, C("text.hint")));
	}
	#K() {
		return this.applyCropBtn = r({
			label: C("crop.apply"),
			primary: !0,
			onClick: () => this.applyCrop()
		}), o("div", {
			class: "ph-options",
			hidden: !0
		}, o("span", { class: "ph-option" }, o("span", { class: "ph-label" }, C("crop.ratio")), f({
			value: this.#d,
			label: C("crop.ratio"),
			options: ce(),
			onChange: (e) => {
				this.#d = e, this.#N();
			}
		})), o("span", { class: "ph-hint" }, C("crop.hint")), o("span", { class: "ph-grow" }), r({
			label: C("crop.whole"),
			onClick: () => this.#N()
		}), this.applyCropBtn);
	}
	#q() {
		for (let e of this.win.body.querySelectorAll(".ph-swatch[data-color]")) e.setAttribute("aria-pressed", String(e.dataset.color === this.#c));
		for (let e of this.win.body.querySelectorAll(".ph-custom")) e.value = this.#c, e.classList.toggle("on", !W().some((e) => e.value === this.#c));
		this.brushSize?.set(this.#l.size), this.textSize?.set(this.#u.size), this.opacityGroup && (this.opacityGroup.hidden = this.#l.mode === "eraser"), this.boldBtn?.setAttribute("aria-pressed", String(this.#u.bold));
	}
	render() {
		let e = this.node, t = !!this.canvas;
		this.win.setTitle(this.name ? `${this.name}${this.dirty ? " •" : ""}` : "Photo", this.name ? "Photo" : ""), this.stage.hidden = !t, this.empty.hidden = t, t || this.#J();
		for (let e of [
			this.saveBtn,
			this.downloadBtn,
			this.resizeBtn,
			this.convertBtn,
			...this.toolBtns
		]) e.disabled = !t;
		this.revealBtn.disabled = !e, this.undoBtn.disabled = !this.stack.canUndo, this.redoBtn.disabled = !this.stack.canRedo, this.undoBtn.title = this.stack.undoLabel ? C("toolbar.undo.named", { label: this.stack.undoLabel }) : C("toolbar.undo"), this.redoBtn.title = this.stack.redoLabel ? C("toolbar.redo.named", { label: this.stack.redoLabel }) : C("toolbar.redo");
		let n = this.#_(), r = n.findIndex((e) => e.id === this.fileId);
		this.prevBtn.hidden = !t || r <= 0, this.nextBtn.hidden = !t || r === -1 || r >= n.length - 1, this.dims.textContent = t ? C("status.size", {
			width: this.canvas.width,
			height: this.canvas.height
		}) : "", this.info.textContent = t && this.name ? [A(this.name), e && i(e.size ?? 0)].filter(Boolean).join(" · ") : "";
		let o = e && a.get(e.parent), s = r + 1, c = n.length;
		this.position.textContent = r === -1 || c <= 1 ? "" : o ? C("status.positionIn", {
			index: s,
			count: c,
			folder: e.parent === a.root ? C("folder.home") : o.name
		}) : C("status.position", {
			index: s,
			count: c
		}), this.state.textContent = this.#m || (this.dirty ? C("status.modified") : ""), this.state.classList.toggle("dirty", !this.#m && this.dirty), this.zoomLabel.hidden = !t;
		for (let e of this.win.body.querySelectorAll(".ph-zoom-btn")) e.disabled = !t;
	}
	#J() {
		let e = (e, t, n) => o("button", {
			class: "ctl-btn",
			type: "button",
			onclick: n
		}, x(e), o("span", {}, t));
		this.empty.replaceChildren(o("div", { class: "ph-empty-icon" }, c("image")), o("div", { class: "ph-empty-title" }, this.#t && this.#m ? C("status.opening") : this.#e ? C("empty.unavailable") : C("empty.title")), o("p", {}, this.#e || C("empty.text")), o("div", { class: "ph-empty-actions" }, e("open", C("empty.open"), () => this.openFile()), e("upload", C("toolbar.import"), () => this.fileInput.click())));
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
function pe(e, t, n, r, i, a, o) {
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
export { ue as default, se as filePreview };
