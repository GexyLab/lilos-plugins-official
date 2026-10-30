import { UndoStack as e, Window as t, actionButton as n, fs as r, h as i, history as a, icon as o, isEditing as s, segmented as c, selectField as l, slider as u, svg as d, toast as f, toggle as p } from "/host/sdk.js";
import { handleCommand as m, launch as h, pickFile as g } from "/host/system.js";
// src/photo/glyphs.js
var _ = {
	upload: "<path d=\"M12 16V5M7 9.5l5-5 5 5M5 20h14\"/>",
	hand: "<path d=\"M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 11V4.5a1.5 1.5 0 0 1 3 0V12M14 11.5V6a1.5 1.5 0 0 1 3 0v8.5a6.5 6.5 0 0 1-6.5 6.5h-.8a6 6 0 0 1-4.6-2.2L3.6 15a1.5 1.5 0 0 1 2.3-1.9L8 15.5\"/>",
	brush: "<path d=\"M19.5 3.5l1 1-8.8 9.8-2-2z\"/><path d=\"M9.7 12.3c-2.2-.4-4.2 1-4.2 3.4 0 1.6-.8 2.6-2 3.3 3.8 1.1 8.4.3 8.2-4.7\"/>",
	text: "<path d=\"M5 6V4.5h14V6M12 4.5V20M9 20h6\"/>",
	crop: "<path d=\"M6 2v14a2 2 0 0 0 2 2h14\"/><path d=\"M2 6h14a2 2 0 0 1 2 2v14\"/>",
	resize: "<path d=\"M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7\"/>",
	convert: "<path d=\"M4 8h13l-3.5-3.5M20 16H7l3.5 3.5\"/>",
	actual: "<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\"/><path d=\"M11 9l2-1.5V16\"/>"
}, v = (e) => _[e] ? d("0 0 24 24", "ico", _[e]) : o(e), y = [
	{
		id: "png",
		label: "PNG",
		type: "image/png",
		ext: "png",
		lossy: !1,
		note: "Senza perdita di qualità, con la trasparenza."
	},
	{
		id: "jpeg",
		label: "JPEG",
		type: "image/jpeg",
		ext: "jpg",
		lossy: !0,
		note: "Più leggero, adatto alle foto; le parti trasparenti diventano bianche."
	},
	{
		id: "webp",
		label: "WebP",
		type: "image/webp",
		ext: "webp",
		lossy: !0,
		note: "Leggero e con la trasparenza."
	}
], b = [
	"png",
	"jpg",
	"jpeg",
	"gif",
	"webp",
	"bmp",
	"avif",
	"ico",
	"svg"
], x = {
	png: "png",
	jpg: "jpeg",
	jpeg: "jpeg",
	webp: "webp"
}, S = {
	png: "PNG",
	jpg: "JPEG",
	jpeg: "JPEG",
	gif: "GIF",
	webp: "WebP",
	bmp: "BMP",
	avif: "AVIF",
	ico: "ICO",
	svg: "SVG"
}, C = (e) => (/\.([^.]+)$/.exec(e)?.[1] ?? "").toLowerCase(), w = (e) => S[C(e)] ?? (C(e).toUpperCase() || "Immagine");
function T(e) {
	let t = y.find((t) => t.id === x[C(e)]);
	return t && D(t) ? t : null;
}
var E = /* @__PURE__ */ new Map();
function D(e) {
	if (!E.has(e.id)) {
		let t = document.createElement("canvas");
		t.width = t.height = 1, E.set(e.id, t.toDataURL(e.type).startsWith(`data:${e.type}`));
	}
	return E.get(e.id);
}
function O(e, t) {
	let n = document.createElement("canvas");
	return n.width = Math.max(1, Math.round(e)), n.height = Math.max(1, Math.round(t)), n;
}
function k(e) {
	let t = O(e.width, e.height);
	return t.getContext("2d").drawImage(e, 0, 0), t;
}
async function A(e) {
	let t = URL.createObjectURL(e);
	try {
		let e = new Image();
		e.src = t, await e.decode();
		let n = e.naturalWidth || 300, r = e.naturalHeight || 150, i = O(n, r);
		return i.getContext("2d").drawImage(e, 0, 0, n, r), i;
	} finally {
		URL.revokeObjectURL(t);
	}
}
function j(e, t, n = .92) {
	let r = e;
	if (t.id === "jpeg") {
		r = O(e.width, e.height);
		let t = r.getContext("2d");
		t.fillStyle = "#fff", t.fillRect(0, 0, r.width, r.height), t.drawImage(e, 0, 0);
	}
	return new Promise((e, i) => {
		r.toBlob((t) => t ? e(t) : i(/* @__PURE__ */ Error("Immagine troppo grande da salvare")), t.type, t.lossy ? n : void 0);
	});
}
function M(e, t, n, r = "high") {
	t = Math.max(1, Math.round(t)), n = Math.max(1, Math.round(n));
	let i = e;
	if (r === "high") for (; i.width / 2 >= t && i.height / 2 >= n;) {
		let e = O(i.width / 2, i.height / 2), t = e.getContext("2d");
		t.imageSmoothingQuality = "high", t.drawImage(i, 0, 0, e.width, e.height), i = e;
	}
	let a = O(t, n), o = a.getContext("2d");
	return o.imageSmoothingEnabled = r !== "pixel", r !== "pixel" && (o.imageSmoothingQuality = r === "high" ? "high" : "medium"), o.drawImage(i, 0, 0, t, n), a;
}
function N(e, { x: t, y: n, width: r, height: i }) {
	let a = O(r, i);
	return a.getContext("2d").drawImage(e, Math.round(t), Math.round(n), a.width, a.height, 0, 0, a.width, a.height), a;
}
function P(e) {
	return Number.isFinite(e) ? e < 1024 ? `${e} byte` : e < 1048576 ? `${Math.round(e / 1024)} KB` : `${(e / 1024 / 1024).toFixed(1).replace(".", ",")} MB` : "";
}
// src/photo/dialogs.js
function F(e, { title: t, symbol: r, rows: a, okLabel: o, collect: s, focus: c }) {
	return new Promise((l) => {
		let u = document.activeElement, d = (e) => {
			m.remove(), u?.focus?.(), l(e);
		}, f = () => {
			let e = s();
			e !== void 0 && d(e);
		}, p = i("div", {
			class: "ph-dialog",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": t
		}, i("div", { class: "ph-dialog-head" }, v(r), i("span", {}, t)), i("div", { class: "ph-dialog-body" }, a), i("div", { class: "ph-dialog-foot" }, n({
			label: "Annulla",
			onClick: () => d(null)
		}), n({
			label: o,
			primary: !0,
			onClick: f
		}))), m = i("div", { class: "ph-scrim" }, p);
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
var I = (e, ...t) => i("div", { class: "ph-row" }, i("span", { class: "ph-row-label" }, e), ...t), L = (e, t) => i("input", {
	class: "ph-number",
	type: "number",
	min: 1,
	step: 1,
	value: e,
	"aria-label": t
});
function R(e, { width: t, height: n }) {
	let r = "px", a = !0, o = L(t, "Larghezza"), s = L(n, "Altezza"), u = i("span", { class: "ph-unit" }, "px"), d = i("span", { class: "ph-unit" }, "px"), f = i("div", { class: "ph-hint" }), p = i("button", {
		class: "ph-lock",
		type: "button",
		"aria-pressed": "true",
		title: "Mantieni le proporzioni",
		"aria-label": "Mantieni le proporzioni",
		onclick: () => {
			a = !a, p.setAttribute("aria-pressed", String(a)), a && _("w");
		}
	}, v("link")), m = "high", h = () => {
		let e = Number(o.value), i = Number(s.value);
		return r === "px" ? [Math.round(e), Math.round(i)] : [Math.round(t * e / 100), Math.round(n * i / 100)];
	}, g = () => {
		let [e, r] = h();
		f.textContent = e > 0 && r > 0 ? `Ora ${t} × ${n} px, poi ${e} × ${r} px` : "Scrivi una larghezza e un’altezza";
	}, _ = (e) => {
		a && (r === "%" ? (e === "w" ? s : o).value = (e === "w" ? o : s).value : e === "w" ? s.value = Math.max(1, Math.round(Number(o.value) * n / t)) : o.value = Math.max(1, Math.round(Number(s.value) * t / n))), g();
	};
	o.addEventListener("input", () => _("w")), s.addEventListener("input", () => _("h"));
	let y = c({
		value: "px",
		label: "Unità",
		options: [{
			value: "px",
			label: "Pixel"
		}, {
			value: "%",
			label: "Percentuale"
		}],
		onChange: (e) => {
			let [i, a] = h();
			r = e, u.textContent = d.textContent = e, o.value = e === "px" ? i : Math.round(i / t * 100), s.value = e === "px" ? a : Math.round(a / n * 100), g();
		}
	});
	return g(), F(e, {
		title: "Ridimensiona l’immagine",
		symbol: "resize",
		okLabel: "Ridimensiona",
		focus: o,
		rows: [
			I("Unità", y),
			i("div", { class: "ph-row" }, i("span", { class: "ph-row-label" }, "Dimensioni"), i("div", { class: "ph-size" }, i("label", { class: "ph-size-field" }, o, u), p, i("label", { class: "ph-size-field" }, s, d))),
			I("Qualità", l({
				value: m,
				label: "Qualità",
				options: [
					{
						value: "high",
						label: "Alta"
					},
					{
						value: "medium",
						label: "Media, più veloce"
					},
					{
						value: "pixel",
						label: "Pixel netti"
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
			if (!(e > 0 && r > 0) || e > 16384 || r > 16384) f.textContent = "Larghezza e altezza vanno da 1 a 16384 pixel";
			else return e === t && r === n ? null : {
				width: e,
				height: r,
				quality: m
			};
		}
	});
}
function z(e, t, { name: n, folder: a, format: o = "png", title: s = "Converti e salva una copia", okLabel: l = "Salva" }) {
	let d = y.filter(D), f = d.find((e) => e.id === o) ?? d[0], m = a, h = 90, _ = !0, b = n.replace(/\.[^.]+$/, "") || "Immagine", x = i("input", {
		class: "ph-text",
		type: "text",
		spellcheck: "false",
		"aria-label": "Nome del file"
	});
	x.value = `${b}.${f.ext}`;
	let S = i("div", { class: "ph-hint" }), C = I("Qualità", u({
		value: h,
		min: 10,
		max: 100,
		unit: "%",
		label: "Qualità",
		onChange: (e) => {
			h = e;
		}
	})), w = C.querySelector("input");
	w.addEventListener("input", () => {
		h = Number(w.value);
	});
	let T = i("span", { class: "ph-folder-name" }), E = i("button", {
		class: "ph-folder",
		type: "button",
		onclick: async () => {
			let e = await g(t, {
				kind: "folder",
				title: "Scegli la cartella",
				text: "La copia viene salvata in questa cartella."
			});
			e && (m = e.id, O());
		}
	}, v("folder"), T), O = () => {
		let e = r.get(m);
		T.textContent = e ? m === r.root ? "Home" : e.name : "Scegli…", E.title = e ? r.path(m) : "";
	}, k = () => {
		C.classList.toggle("off", !f.lossy), w.disabled = !f.lossy, S.textContent = `${f.label}: ${f.note.charAt(0).toLowerCase()}${f.note.slice(1)}`;
	};
	return O(), k(), F(e, {
		title: s,
		symbol: "convert",
		okLabel: l,
		focus: x,
		rows: [
			I("Formato", c({
				value: f.id,
				label: "Formato",
				options: d.map((e) => ({
					value: e.id,
					label: e.label
				})),
				onChange: (e) => {
					f = d.find((t) => t.id === e), x.value = `${x.value.replace(/\.[^.]+$/, "") || b}.${f.ext}`, k();
				}
			})),
			C,
			I("Nome", x),
			i("div", { class: "ph-row" }, i("span", { class: "ph-row-label" }, "Cartella"), E),
			i("div", { class: "ph-row" }, i("span", { class: "ph-row-label" }, "Poi aprila"), p({
				value: _,
				label: "Apri la copia dopo il salvataggio",
				onChange: (e) => {
					_ = e;
				}
			})),
			S
		],
		collect: () => {
			let e = r.get(m), t = x.value.trim();
			if (!e || e.type !== "folder") S.textContent = "Scegli una cartella";
			else if (!t || t.includes("/")) S.textContent = "Scrivi un nome valido, senza «/»", x.focus();
			else return {
				format: f,
				quality: h / 100,
				name: t,
				folder: m,
				open: _
			};
		}
	});
}
// src/photo/PhotoApp.js
var B = [
	{
		value: "#ffffff",
		label: "Bianco"
	},
	{
		value: "#1f2328",
		label: "Nero"
	},
	{
		value: "#e5484d",
		label: "Rosso"
	},
	{
		value: "#f2994a",
		label: "Arancione"
	},
	{
		value: "#f2c94c",
		label: "Giallo"
	},
	{
		value: "#30a46c",
		label: "Verde"
	},
	{
		value: "#3b6ef5",
		label: "Blu"
	},
	{
		value: "#7c5cdb",
		label: "Viola"
	}
], V = [
	{
		value: "sans",
		label: "Sans",
		css: "system-ui, \"Segoe UI\", Roboto, sans-serif"
	},
	{
		value: "serif",
		label: "Serif",
		css: "Georgia, \"Times New Roman\", serif"
	},
	{
		value: "mono",
		label: "Mono",
		css: "ui-monospace, Consolas, \"Courier New\", monospace"
	},
	{
		value: "hand",
		label: "Manoscritto",
		css: "\"Segoe Print\", \"Bradley Hand\", \"Comic Sans MS\", cursive"
	}
], H = [
	{
		value: "free",
		label: "Libere"
	},
	{
		value: "image",
		label: "Come l’immagine"
	},
	{
		value: "1",
		label: "Quadrato 1:1"
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
], U = [
	{
		id: "view",
		label: "Guarda e sposta",
		key: "V",
		glyph: "hand"
	},
	{
		id: "brush",
		label: "Disegna",
		key: "B",
		glyph: "brush"
	},
	{
		id: "text",
		label: "Testo",
		key: "T",
		glyph: "text"
	},
	{
		id: "crop",
		label: "Ritaglia",
		key: "C",
		glyph: "crop"
	}
], W = [
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
], G = 1.2, K = 20;
function q({ args: e, openWindow: n } = {}) {
	let i = new t({
		title: "Photo",
		icon: "image",
		width: 900,
		height: 620,
		minWidth: 560,
		minHeight: 360
	}), a = new Z(i, n);
	return e?.file && r.exists(e.file) ? a.open(e.file) : a.render(), i.on("launch", (e) => {
		e?.file && r.exists(e.file) && a.open(e.file);
	}), i.canClose = () => a.confirmDiscard(), i.getState = () => ({ file: a.fileId }), i;
}
var J = (e, t, n) => Math.min(n, Math.max(t, e)), Y = (e, t) => e.name.localeCompare(t.name, void 0, {
	numeric: !0,
	sensitivity: "base"
}), X = (e) => b.includes(C(e)), Z = class {
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
	constructor(t, n) {
		this.win = t, this.openWindow = n ?? (() => {}), this.stack = new e({ limit: K });
		let { signal: s } = t, c = (e, t, n) => i("button", {
			class: "ph-btn",
			type: "button",
			title: t,
			"aria-label": t,
			onclick: n
		}, v(e));
		this.undoBtn = c("undo", "Annulla (Ctrl Z)", () => this.stack.undo()), this.redoBtn = c("redo", "Ripeti (Ctrl Y)", () => this.stack.redo()), this.saveBtn = c("save", "Salva (Ctrl S)", () => this.save()), this.downloadBtn = c("download", "Scarica sul computer", () => this.download()), this.revealBtn = c("folder", "Mostra nella cartella", () => this.reveal()), this.toolBtns = U.map((e) => {
			let t = c(e.glyph, `${e.label} (${e.key})`, () => this.setTool(e.id));
			return t.dataset.tool = e.id, t;
		});
		let l = (e, t, n, r) => i("button", {
			class: "ph-btn ph-labelled",
			type: "button",
			title: n,
			onclick: r
		}, v(e), i("span", {}, t));
		this.resizeBtn = l("resize", "Ridimensiona", "Ridimensiona l’immagine…", () => this.resize()), this.convertBtn = l("convert", "Converti", "Converti e salva una copia…", () => this.convert()), this.fileInput = i("input", {
			type: "file",
			accept: "image/*,.svg",
			multiple: !0,
			hidden: !0
		}), this.fileInput.addEventListener("change", () => {
			let e = [...this.fileInput.files];
			this.fileInput.value = "", this.importFiles(e);
		}, { signal: s }), this.options = {
			brush: this.#H(),
			text: this.#U(),
			crop: this.#W()
		}, this.banner = i("div", {
			class: "ph-banner",
			role: "alertdialog",
			hidden: !0
		}), this.overlay = i("canvas", {
			class: "ph-overlay",
			"aria-hidden": "true"
		}), this.cropFrame = i("div", {
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
		].map((e) => i("span", {
			class: "ph-handle",
			dataset: { handle: e }
		})), this.cropSize = i("span", { class: "ph-crop-size" })), this.paper = i("div", { class: "ph-paper" }, this.overlay, this.cropFrame), this.stage = i("div", {
			class: "ph-stage",
			tabindex: "0",
			"aria-label": "Immagine"
		}, this.paper), this.prevBtn = i("button", {
			class: "ph-nav ph-prev",
			type: "button",
			title: "Immagine precedente (←)",
			"aria-label": "Immagine precedente",
			onclick: () => this.step(-1)
		}, o("arrowLeft")), this.nextBtn = i("button", {
			class: "ph-nav ph-next",
			type: "button",
			title: "Immagine successiva (→)",
			"aria-label": "Immagine successiva",
			onclick: () => this.step(1)
		}, o("arrowRight")), this.empty = i("div", { class: "ph-empty" }), this.dropHint = i("div", {
			class: "ph-drop",
			hidden: !0
		}, v("upload"), i("span", {}, "Rilascia per importare in lilOS")), this.main = i("div", { class: "ph-main" }, this.stage, this.prevBtn, this.nextBtn, this.empty, this.dropHint), this.dims = i("span", { class: "ph-mono" }), this.info = i("span"), this.position = i("span"), this.state = i("span", { class: "ph-state" }), this.zoomLabel = i("button", {
			class: "ph-zoom-value",
			type: "button",
			title: "Adatta alla finestra",
			onclick: () => this.fitToWindow()
		});
		let u = (e, t, n) => i("button", {
			class: "ph-zoom-btn",
			type: "button",
			title: t,
			"aria-label": t,
			onclick: n
		}, v(e));
		t.body.classList.add("ph"), t.body.append(i("div", { class: "ph-toolbar" }, c("open", "Apri un’immagine… (Ctrl O)", () => this.openFile()), c("upload", "Importa dal computer…", () => this.fileInput.click()), this.saveBtn, this.downloadBtn, i("span", { class: "ph-sep" }), this.undoBtn, this.redoBtn, i("span", { class: "ph-sep" }), i("span", {
			class: "ph-tools",
			role: "group",
			"aria-label": "Strumenti"
		}, this.toolBtns), i("span", { class: "ph-sep" }), this.resizeBtn, this.convertBtn, i("span", { class: "ph-grow" }), this.revealBtn, this.fileInput), ...Object.values(this.options), this.banner, this.main, i("div", { class: "ph-status" }, this.dims, this.info, this.position, this.state, i("span", { class: "ph-grow" }), u("minus", "Riduci lo zoom (−)", () => this.zoomStep(-1)), this.zoomLabel, u("plus", "Aumenta lo zoom (+)", () => this.zoomStep(1)), u("fit", "Adatta alla finestra (0)", () => this.fitToWindow()), u("actual", "Dimensione reale (1)", () => this.zoomTo(1)))), this.paper.addEventListener("pointerdown", (e) => this.#C(e), { signal: s }), this.stage.addEventListener("pointerdown", (e) => this.#S(e), { signal: s }), this.stage.addEventListener("wheel", (e) => this.#I(e), {
			signal: s,
			passive: !1
		}), t.body.addEventListener("keydown", (e) => this.#L(e), { signal: s }), this.#R(s), addEventListener("beforeunload", (e) => {
			this.dirty && e.preventDefault();
		}, { signal: s });
		let d = new ResizeObserver(() => {
			this.#o && this.#F();
		});
		d.observe(this.stage);
		let f = [
			r.on("change", (e) => this.#g(e)),
			r.on("scope", () => this.render()),
			this.stack.on("change", () => this.render()),
			m("photo.save", {
				isActive: () => t.active,
				run: () => this.save()
			}),
			m("photo.open", {
				isActive: () => t.active,
				run: () => this.openFile()
			}),
			a.attach(t.body, this.stack)
		];
		t.on("destroy", () => {
			f.forEach((e) => e()), d.disconnect();
		}), this.setTool("view");
	}
	get dirty() {
		return !!this.canvas && this.#n !== this.#r;
	}
	get node() {
		return this.fileId ? r.get(this.fileId) : null;
	}
	async open(e) {
		let t = r.get(e);
		if (!t || t.type !== "file" || e === this.fileId && this.canvas && !this.#e || !await this.confirmDiscard(`prima di aprire «${t.name}»`)) return;
		this.#k();
		let n = ++this.#t;
		this.#m = "Apertura…", this.render();
		let i = null, a = "";
		try {
			i = await A(await r.readBlob(e));
		} catch (e) {
			a = e?.name === "EncodingError" || e instanceof DOMException ? `«${t.name}» non si può aprire: il formato non è supportato o il file è danneggiato.` : `«${t.name}» non si può leggere: ${e?.message ?? e}`;
		}
		n === this.#t && (this.#m = "", this.fileId = e, this.name = t.name, this.#e = a, this.#_(i), this.stack.clear(), this.#n = this.#r = ++this.#i, this.#b(), this.#o = !0, this.render(), this.#s === "crop" && this.#j(), this.#F(), this.stage.focus({ preventScroll: !0 }));
	}
	async openFile() {
		let e = await g(this.openWindow, {
			title: "Apri un’immagine",
			exts: b
		});
		e && this.open(e.id);
	}
	async importFiles(e) {
		let t = e.filter((e) => X(e.name) || e.type.startsWith("image/"));
		if (e.length && !t.length) return f(e.length === 1 ? `«${e[0].name}» non è un’immagine` : "Nessuna di queste è un’immagine");
		if (!t.length) return;
		let n = this.node && r.get(this.node.parent), i = n?.type === "folder" ? n : r.resolve("/Immagini") ?? r.get(r.root), a = null;
		for (let e of t) {
			let t = X(e.name) ? e.name : `${e.name || "Immagine"}.${e.type.split("/")[1] ?? "png"}`, n = r.create(i.id, {
				type: "file",
				name: t
			});
			try {
				await r.write(n.id, e), a ??= n;
			} catch (t) {
				r.remove(n.id), f(`«${e.name}» non è stata importata: ${t?.message ?? t}`);
			}
		}
		a && (f(t.length === 1 ? `Importata in ${i.id === r.root ? "Home" : i.name}` : `${t.length} immagini importate in ${i.name}`), this.open(a.id));
	}
	async save() {
		if (this.#O(), !this.canvas) return !1;
		let e = this.node, t = e && T(e.name);
		if (!t) return this.convert({
			title: e ? `${w(e.name)} non si può salvare: salva una copia` : "Il file non c’è più: salva una copia",
			okLabel: "Salva la copia",
			open: !0
		});
		try {
			await r.write(e.id, await j(this.canvas, t));
		} catch (e) {
			return f(`Non salvata: ${e?.message ?? e}`), !1;
		}
		return this.#r = this.#n, this.#m = "Salvata", this.render(), setTimeout(() => {
			this.#m === "Salvata" && (this.#m = "", this.render());
		}, 2e3), !0;
	}
	async convert({ title: e, okLabel: t, open: n } = {}) {
		if (this.#O(), !this.canvas) return !1;
		let i = this.node, a = i && r.get(i.parent)?.type === "folder" ? i.parent : (r.resolve("/Immagini") ?? r.get(r.root)).id, o = i && T(i.name), s = await z(this.win.body, this.openWindow, {
			name: this.name || "Immagine.png",
			folder: a,
			format: o?.id === "png" ? "jpeg" : "png",
			title: e,
			okLabel: t
		});
		if (!s) return !1;
		n !== void 0 && (s.open = n);
		let c;
		try {
			c = await j(this.canvas, s.format, s.quality);
		} catch (e) {
			return f(`Non salvata: ${e?.message ?? e}`), !1;
		}
		let l = r.create(s.folder, {
			type: "file",
			name: s.name
		});
		try {
			await r.write(l.id, c);
		} catch (e) {
			return r.remove(l.id), f(`Non salvata: ${e?.message ?? e}`), !1;
		}
		return s.open ? (this.#r = this.#n, await this.open(l.id)) : f(`Salvata «${l.name}» (${P(c.size)})`), !0;
	}
	async download() {
		if (this.#O(), !this.canvas) return;
		let e = this.node, t, n = this.name || "Immagine.png";
		try {
			if (e && !this.dirty) t = await r.readBlob(e.id);
			else {
				let e = T(n) ?? y[0];
				T(n) || (n = `${n.replace(/\.[^.]+$/, "")}.png`), t = await j(this.canvas, e);
			}
		} catch (e) {
			return f(`Non scaricata: ${e?.message ?? e}`);
		}
		let a = URL.createObjectURL(t);
		i("a", {
			href: a,
			download: n
		}).click(), setTimeout(() => URL.revokeObjectURL(a), 3e4);
	}
	reveal() {
		let e = this.node;
		e && h("files", { folder: e.parent });
	}
	#h() {
		let e = this.node;
		return e ? r.children(e.parent).filter((e) => e.type === "file" && X(e.name)).sort(Y) : [];
	}
	step(e) {
		let t = this.#h(), n = t.findIndex((e) => e.id === this.fileId), r = t[n + e];
		n !== -1 && r && this.open(r.id);
	}
	confirmDiscard(e = "") {
		return this.#O(), this.dirty ? new Promise((t) => {
			let r = async (e) => {
				this.banner.hidden = !0, this.banner.replaceChildren(), t(e === "save" ? await this.save() : e === "discard"), e === "cancel" && this.stage.focus();
			}, a = n({
				label: "Salva",
				primary: !0,
				onClick: () => r("save")
			});
			this.banner.replaceChildren(o("help"), i("span", { class: "ph-banner-text" }, `Le modifiche a «${this.name}» non sono salvate${e ? ` (${e})` : ""}.`), a, n({
				label: "Non salvare",
				danger: !0,
				onClick: () => r("discard")
			}), n({
				label: "Annulla",
				onClick: () => r("cancel")
			})), this.banner.onkeydown = (e) => {
				e.key === "Escape" && (e.stopPropagation(), r("cancel"));
			}, this.banner.hidden = !1, a.focus();
		}) : Promise.resolve(!0);
	}
	#g({ type: e, node: t, ids: n }) {
		if (!this.fileId) return this.render();
		(e === "rename" || e === "update") && t?.id === this.fileId && (this.name = t.name), e === "remove" && n?.includes(this.fileId) && (this.#m = "Il file non c’è più"), this.render();
	}
	#_(e) {
		this.canvas?.remove(), this.canvas = e, e && (e.classList.add("ph-image"), this.paper.prepend(e), this.overlay.width = e.width, this.overlay.height = e.height);
	}
	#v(e, t) {
		let n = k(this.canvas), r = this.#n, i = this.#n = ++this.#i, a = (e, t) => {
			this.#k();
			let n = e.width !== this.canvas?.width || e.height !== this.canvas?.height;
			this.#_(k(e)), this.#n = t, this.#s === "crop" && this.#j(), n && (this.#o = !0), this.#F(), this.render();
		};
		this.stack.push({
			label: e,
			undo: () => a(t, r),
			redo: () => a(n, i)
		});
	}
	#y(e, t) {
		let n = k(this.canvas);
		this.#_(t), this.#o = !0, this.#v(e, n), this.#s === "crop" && this.#j(), this.#F(), this.render();
	}
	async resize() {
		if (this.#O(), !this.canvas) return;
		let e = await R(this.win.body, {
			width: this.canvas.width,
			height: this.canvas.height
		});
		e && this.#y("Ridimensiona", M(this.canvas, e.width, e.height, e.quality));
	}
	#b() {
		if (!this.canvas) return;
		let e = Math.min(this.canvas.width, this.canvas.height);
		this.#l.chosen || (this.#l.size = J(Math.round(e / 120), 2, 200)), this.#u.chosen || (this.#u.size = J(Math.round(e / 14), 12, 400)), this.#G();
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
		let { size: t, opacity: n, mode: r } = this.#l, i = k(this.canvas), a = r === "eraser", o = (a ? this.canvas : this.overlay).getContext("2d");
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
			this.#v(a ? "Cancella" : "Disegna", i), this.render();
		};
		this.paper.setPointerCapture(e.pointerId), this.paper.addEventListener("pointermove", c), this.paper.addEventListener("pointerup", l), this.paper.addEventListener("pointercancel", l);
	}
	#T(e) {
		let t = V.find((e) => e.value === this.#u.font) ?? V[0];
		return `${this.#u.bold ? 700 : 400} ${e}px ${t.css}`;
	}
	#E({ x: e, y: t }) {
		let n = i("div", {
			class: "ph-textbox",
			role: "textbox",
			"aria-label": "Testo da scrivere sull’immagine",
			"aria-multiline": "true",
			spellcheck: "false"
		});
		n.contentEditable = "plaintext-only", n.contentEditable !== "plaintext-only" && (n.contentEditable = "true"), this.#p = {
			box: n,
			x: e,
			y: t - this.#u.size * G / 2
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
			lineHeight: String(G),
			color: this.#c
		});
	}
	#O() {
		if (!this.#p) return;
		let { box: e, x: t, y: n } = this.#p, r = e.innerText.replace(/\n+$/, "").split("\n");
		if (this.#k(), !r.some((e) => e.trim())) return;
		let i = k(this.canvas), a = this.canvas.getContext("2d"), o = this.#u.size;
		a.save(), a.font = this.#T(o), a.fillStyle = this.#c, a.textBaseline = "top", r.forEach((e, r) => a.fillText(e, t, n + o * .19999999999999996 / 2 + r * o * G)), a.restore(), this.#v("Testo", i), this.render();
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
		t === "new" && (i.x = J(i.x, 0, n), i.y = J(i.y, 0, r));
		let s = (e) => {
			let s = this.#x(e), c = s.x - i.x, l = s.y - i.y;
			this.#f = t === "move" ? {
				...a,
				x: J(a.x + c, 0, n - a.width),
				y: J(a.y + l, 0, r - a.height)
			} : t === "new" ? Q(i.x, i.y, J(s.x, 0, n), J(s.y, 0, r), o, n, r) : $(a, t, c, l, o, n, r), this.#N();
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
		let t = Math.round(e.x), n = Math.round(e.y), r = J(Math.round(e.width), 1, this.canvas.width - t), i = J(Math.round(e.height), 1, this.canvas.height - n);
		(r !== this.canvas.width || i !== this.canvas.height) && this.#y("Ritaglia", N(this.canvas, {
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
		this.#a = J(e, W[0], W.at(-1)), this.#o = !1, this.#F();
		let a = this.paper.getBoundingClientRect();
		this.stage.scrollLeft += a.left + i.x * this.#a - t, this.stage.scrollTop += a.top + i.y * this.#a - n;
	}
	zoomStep(e, t, n) {
		let r = this.#a, i = e > 0 ? W.find((e) => e > r * 1.001) : W.findLast((e) => e < r / 1.001);
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
		if (e.defaultPrevented || s() || e.target.closest?.(".ph-banner, .ph-scrim, select, input") || e.ctrlKey || e.metaKey || e.altKey) return;
		let t = e.key.length === 1 ? e.key.toLowerCase() : e.key, n = U.find((e) => e.key.toLowerCase() === t), r = !0;
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
			t(e) && (e.preventDefault(), n = 0, this.dropHint.hidden = !0, this.confirmDiscard("prima di importare").then((t) => {
				t && this.importFiles([...e.dataTransfer.files]);
			}));
		}, { signal: e });
	}
	#z() {
		let e = i("input", {
			type: "color",
			class: "ph-swatch ph-custom",
			title: "Altro colore…",
			"aria-label": "Altro colore"
		}), t = B.map((e) => i("button", {
			class: "ph-swatch",
			type: "button",
			title: e.label,
			"aria-label": e.label,
			style: { background: e.value },
			onclick: () => this.#B(e.value)
		}));
		return t.forEach((e, t) => {
			e.dataset.color = B[t].value;
		}), e.addEventListener("input", () => this.#B(e.value)), i("span", {
			class: "ph-swatches",
			role: "group",
			"aria-label": "Colore"
		}, t, e);
	}
	#B(e) {
		this.#c = e, this.#G(), this.#D(), this.#p?.box.focus();
	}
	#V({ value: e, min: t, max: n, unit: r, label: i, onInput: a }) {
		let o = u({
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
			label: "Spessore",
			onInput: (e) => {
				this.#l.size = e, this.#l.chosen = !0;
			}
		}), this.brushOpacity = this.#V({
			value: 100,
			min: 5,
			max: 100,
			unit: "%",
			label: "Opacità",
			onInput: (e) => {
				this.#l.opacity = e;
			}
		}), this.opacityGroup = i("span", { class: "ph-option" }, i("span", { class: "ph-label" }, "Opacità"), this.brushOpacity), i("div", {
			class: "ph-options",
			hidden: !0
		}, i("span", { class: "ph-option" }, i("span", { class: "ph-label" }, "Colore"), this.#z()), i("span", { class: "ph-option" }, i("span", { class: "ph-label" }, "Spessore"), this.brushSize), this.opacityGroup, c({
			value: "pen",
			label: "Pennello o gomma",
			options: [{
				value: "pen",
				label: "Pennello"
			}, {
				value: "eraser",
				label: "Gomma"
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
			label: "Dimensione",
			onInput: (e) => {
				this.#u.size = e, this.#u.chosen = !0, this.#D();
			}
		}), this.boldBtn = i("button", {
			class: "ph-btn ph-bold",
			type: "button",
			title: "Grassetto",
			"aria-label": "Grassetto",
			"aria-pressed": "true",
			onclick: () => {
				this.#u.bold = !this.#u.bold, this.#G(), this.#D(), this.#p?.box.focus();
			}
		}, "G"), i("div", {
			class: "ph-options",
			hidden: !0
		}, i("span", { class: "ph-option" }, i("span", { class: "ph-label" }, "Colore"), this.#z()), i("span", { class: "ph-option" }, i("span", { class: "ph-label" }, "Carattere"), l({
			value: this.#u.font,
			label: "Carattere",
			options: V,
			onChange: (e) => {
				this.#u.font = e, this.#D(), this.#p?.box.focus();
			}
		})), i("span", { class: "ph-option" }, i("span", { class: "ph-label" }, "Dimensione"), this.textSize), this.boldBtn, i("span", { class: "ph-hint" }, "Clic per scrivere · Invio conferma, Maiusc Invio va a capo"));
	}
	#W() {
		return this.applyCropBtn = n({
			label: "Ritaglia",
			primary: !0,
			onClick: () => this.applyCrop()
		}), i("div", {
			class: "ph-options",
			hidden: !0
		}, i("span", { class: "ph-option" }, i("span", { class: "ph-label" }, "Proporzioni"), l({
			value: this.#d,
			label: "Proporzioni",
			options: H,
			onChange: (e) => {
				this.#d = e, this.#j();
			}
		})), i("span", { class: "ph-hint" }, "Trascina il riquadro o i suoi bordi · Invio per ritagliare"), i("span", { class: "ph-grow" }), n({
			label: "Tutta l’immagine",
			onClick: () => this.#j()
		}), this.applyCropBtn);
	}
	#G() {
		for (let e of this.win.body.querySelectorAll(".ph-swatch[data-color]")) e.setAttribute("aria-pressed", String(e.dataset.color === this.#c));
		for (let e of this.win.body.querySelectorAll(".ph-custom")) e.value = this.#c, e.classList.toggle("on", !B.some((e) => e.value === this.#c));
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
		this.revealBtn.disabled = !e, this.undoBtn.disabled = !this.stack.canUndo, this.redoBtn.disabled = !this.stack.canRedo, this.undoBtn.title = this.stack.undoLabel ? `Annulla «${this.stack.undoLabel}» (Ctrl Z)` : "Annulla (Ctrl Z)", this.redoBtn.title = this.stack.redoLabel ? `Ripeti «${this.stack.redoLabel}» (Ctrl Y)` : "Ripeti (Ctrl Y)";
		let n = this.#h(), i = n.findIndex((e) => e.id === this.fileId);
		this.prevBtn.hidden = !t || i <= 0, this.nextBtn.hidden = !t || i === -1 || i >= n.length - 1, this.dims.textContent = t ? `${this.canvas.width} × ${this.canvas.height} px` : "", this.info.textContent = t && this.name ? [w(this.name), e && P(e.size ?? 0)].filter(Boolean).join(" · ") : "";
		let a = e && r.get(e.parent);
		this.position.textContent = i !== -1 && n.length > 1 ? `${i + 1} di ${n.length}${a ? ` in ${e.parent === r.root ? "Home" : a.name}` : ""}` : "", this.state.textContent = this.#m || (this.dirty ? "Modificata" : ""), this.state.classList.toggle("dirty", !this.#m && this.dirty), this.zoomLabel.hidden = !t;
		for (let e of this.win.body.querySelectorAll(".ph-zoom-btn")) e.disabled = !t;
	}
	#K() {
		let e = (e, t, n) => i("button", {
			class: "ctl-btn",
			type: "button",
			onclick: n
		}, v(e), i("span", {}, t));
		this.empty.replaceChildren(i("div", { class: "ph-empty-icon" }, o("image")), i("div", { class: "ph-empty-title" }, this.#t && this.#m ? "Apertura…" : this.#e ? "Immagine non disponibile" : "Nessuna immagine"), i("p", {}, this.#e || "Apri un’immagine di lilOS o importala dal computer. Puoi anche trascinarla qui."), i("div", { class: "ph-empty-actions" }, e("open", "Apri…", () => this.openFile()), e("upload", "Importa dal computer…", () => this.fileInput.click())));
	}
};
function Q(e, t, n, r, i, a, o) {
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
function $(e, t, n, r, i, a, o) {
	let s = e.x, c = e.y, l = e.x + e.width, u = e.y + e.height;
	if (t.includes("w") && (s = J(s + n, 0, l - 1)), t.includes("e") && (l = J(l + n, s + 1, a)), t.includes("n") && (c = J(c + r, 0, u - 1)), t.includes("s") && (u = J(u + r, c + 1, o)), !i) return {
		x: s,
		y: c,
		width: l - s,
		height: u - c
	};
	if (t.length === 2) return Q(t.includes("w") ? e.x + e.width : e.x, t.includes("n") ? e.y + e.height : e.y, t.includes("w") ? s : l, t.includes("n") ? c : u, i, a, o);
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
export { q as default };
