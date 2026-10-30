import { UndoStack as e, Window as t, appIcon as n, fileType as r, fs as i, h as a, history as o, icon as s, openMenu as c, session as l, settings as u, shortcuts as d, storage as f, tags as p, toast as m, trackDrag as h } from "/host/sdk.js";
import { DESK_NAME as g, SYSTEM_FOLDERS as ee, addTarget as _, confirmRemove as te, describeWorkspace as v, dragItems as y, dropZone as ne, getApp as b, handleCommand as re, itemIcon as x, launch as S, linkEntry as ie, links as C, markItem as ae, movableInto as oe, moveInto as se, onWorkspacesChange as ce, openFile as le, recordCreated as ue, removeNodes as de, renameNode as fe, restoreNodes as pe, setTag as me, showProperties as he, tagDots as w, tagSubmenu as ge } from "/host/system.js";
// src/files/format.js
var T = (e) => e.type === "folder" ? "Cartella" : e.type === "app" ? "App" : r(e.name).label, E = (e) => e.id === i.root ? "Home" : e.name, D = (e) => e.parent === i.root ? "Home" : i.path(e.parent);
function O(e) {
	let t = e.trashed.from;
	return i.exists(t) && t !== i.root ? i.path(t) : "Home";
}
function k(e) {
	let t = v(e.workspace);
	return t ? t.removed ? `${t.name} (eliminato)` : t.name : e.workspace ? "Sconosciuto" : "Condiviso";
}
function A(e) {
	let t = v(e.workspace), n = a("span", {
		class: "ws-owner-dot",
		"aria-hidden": "true"
	});
	return t && (n.style.background = t.color), a("span", {
		class: [
			"ws-owner",
			!t && "shared",
			t?.removed && "removed"
		].filter(Boolean).join(" "),
		title: `Workspace: ${k(e)}`
	}, n, a("span", {}, k(e)));
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
	return `${n.toLocaleString(l.locale, { maximumFractionDigits: 1 })} ${t[r]}`;
}
var M = (e) => e === 0 ? "Vuota" : e === 1 ? "1 elemento" : `${e.toLocaleString(l.locale)} elementi`;
function N(e) {
	return e.type === "folder" ? M(e.trashed ? e.inside : i.children(e.id).length) : e.type === "file" ? j(e.size ?? 0) : "—";
}
function P() {
	let e = u.get("trashRetention");
	return e <= 0 ? "Gli elementi restano finché non li elimini" : `Eliminati definitivamente dopo ${e === 1 ? "1 giorno" : `${e} giorni`}`;
}
var F = (e) => new Date(e).toLocaleString(l.locale, {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit"
}), I = "files-panels", L = 720, _e = class {
	open;
	width;
	constructor({ key: e, title: t, label: n, width: r, open: i = !1, room: o, onLayout: c, signal: l }) {
		this.key = e, this.defaultWidth = r, this.room = o, this.onLayout = c;
		let u = f.get(I, {})?.[e];
		this.open = typeof u?.open == "boolean" ? u.open : i, this.width = Number.isFinite(u?.width) ? R(u.width, 180, L) : r, this.split = a("div", {
			class: "fm-split",
			role: "separator",
			tabindex: "0",
			"aria-orientation": "vertical",
			"aria-label": `Larghezza del pannello ${n}`,
			"aria-valuemin": 180
		}), this.body = a("div", { class: "fm-panel-body" }), this.el = a("aside", {
			class: `fm-panel fm-panel-${e}`,
			"aria-label": t,
			hidden: !this.open
		}, this.split, a("div", { class: "fm-panel-head" }, a("span", { class: "fm-panel-title" }, t), a("button", {
			class: "fm-btn",
			type: "button",
			title: `Chiudi il pannello ${n}`,
			"aria-label": `Chiudi il pannello ${n}`,
			onclick: () => this.setOpen(!1)
		}, s("x"))), this.body), this.#e(l);
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
			this.el.classList.add("resizing"), h(e, {
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
		let e = f.get(I, {});
		f.set(I, {
			...e && typeof e == "object" ? e : {},
			[this.key]: {
				open: this.open,
				width: this.width
			}
		});
	}
}, R = (e, t, n) => Math.max(t, Math.min(e, n)), z = 1e5, ve = 5 << 20, B = 30, V = 200, H = (e) => e.toLocaleString(l.locale), U = (e, t, n) => `${H(e)} ${e === 1 ? t : n}`, W = (e) => e < 1024 ? j(e) : `${j(e)} (${H(e)} byte)`;
function ye(e) {
	let t = 0;
	for (let n of i.children(e)) t += n.type === "folder" ? ye(n.id) : n.size ?? 0;
	return t;
}
var G = (e) => e.trashed ? e.bytes ?? 0 : e.type === "folder" ? ye(e.id) : e.size ?? 0, be = (e) => e?.type === "file" && !e.trashed, xe = (e) => `${e.id}:${e.modified}:${e.size ?? 0}`;
function K(e) {
	let t = e.map((e) => p.get(e)).filter(Boolean);
	return t.length ? a("span", { class: "fm-chips" }, t.map((e) => a("span", {
		class: "fm-chip",
		title: e.visible ? e.name : `${e.name} (tag invisibile)`
	}, a("span", {
		class: "tag-dot",
		style: { background: e.color },
		"aria-hidden": "true"
	}), e.name))) : "Nessuno";
}
var q = (e) => a("dl", { class: "fm-facts" }, e.filter(Boolean).flatMap(([e, t, n]) => [a("dt", {}, e), a("dd", { class: n }, t)])), J = (e, ...t) => a("section", { class: "fm-info-section" }, a("h6", {}, e), ...t);
function Y(e, t, n) {
	return a("div", { class: "fm-info-head" }, a("span", { class: "fm-info-icon" }, e), a("div", { class: "fm-info-titles" }, a("div", {
		class: "fm-info-name",
		title: t
	}, t), n && a("div", { class: "fm-info-kind" }, n)));
}
function Se({ nodes: e, place: t, text: n }) {
	return e.length > 1 ? we(e) : e.length === 1 ? Ce(e[0], n) : t.trash ? Te() : t.tag ? Ee(t.tag) : a("div", {}, a("p", { class: "fm-info-hint" }, "Nessun elemento selezionato: ecco la cartella aperta."), Ce(t.node, n));
}
function Ce(e, t) {
	let { ext: n } = r(e.name), o = e.type === "app" ? b(e.app) : null, s = [["Tipo", e.type === "file" && n ? `${T(e)} (.${n})` : e.type === "app" ? "Collegamento a un’app" : T(e)], e.type === "app" && ["App", o ? o.name : `${e.app} (non installata)`]];
	if (e.type === "file" && s.push(["Dimensione", W(e.size ?? 0)]), e.type === "folder") {
		let t = e.trashed ? null : i.children(e.id).length, n = e.trashed ? e.inside : i.count(e.id);
		s.push(["Contenuto", t === null || n === t ? M(n) : `${M(t)}, ${H(n)} in tutto`]), s.push(["Dimensione", W(G(e))]);
	}
	e.trashed ? s.push(["Eliminato", F(e.trashed.at)], [
		"Posizione originale",
		O(e),
		"mono"
	]) : s.push([
		"Percorso",
		i.path(e.id),
		"mono"
	]), s.push(["Creato", F(e.created)], ["Modificato", F(e.modified)]);
	let c = [
		e.system && "Di sistema: non si rinomina e non si elimina",
		e.private && "Privata: si vede solo nel suo workspace",
		!e.trashed && i.isHidden(e.id) && "Nascosto da un tag invisibile",
		!e.trashed && C.has(e.id) && "Nella barra laterale (Collegamenti)"
	].filter(Boolean), l = a("div", {}, Y(x(e), E(e), T(e)), J("Generali", q(s)), J("Organizzazione", q([["Workspace", A(e)], ["Tag", K(e.tags ?? [])]])), c.length ? J("Attributi", a("ul", { class: "fm-notes" }, c.map((e) => a("li", {}, e)))) : null);
	if (be(e) && (e.size ?? 0) <= ve) {
		let n = a("dd", {}, "…"), r = a("dd", {}, "…"), i = a("dd", {}, "…");
		l.append(J("Testo", a("dl", { class: "fm-facts" }, a("dt", {}, "Righe"), n, a("dt", {}, "Parole"), r, a("dt", {}, "Caratteri"), i))), t(e).then((e) => {
			n.textContent = H(e ? e.split("\n").length : 0), r.textContent = H(e.trim() ? e.trim().split(/\s+/).length : 0), i.textContent = H([...e].length);
		}, () => {
			n.textContent = r.textContent = i.textContent = "—";
		});
	}
	return l;
}
function we(e) {
	let t = (t) => e.filter((e) => e.type === t).length, n = t("folder"), r = t("file"), o = t("app"), s = [
		n && U(n, "cartella", "cartelle"),
		r && U(r, "file", "file"),
		o && U(o, "app", "app")
	].filter(Boolean).join(", "), c = e.reduce((e, t) => e + (t.type === "folder" ? t.trashed ? t.inside : i.count(t.id) : 0), 0), l = /* @__PURE__ */ new Map();
	for (let t of e) l.set(T(t), (l.get(T(t)) ?? 0) + 1);
	let u = new Set(e.map((e) => e.parent)), d = e.map((e) => e.modified), f = [...new Set(e.map(k))], p = [...new Set(e.flatMap((e) => e.tags ?? []))], m = p.filter((t) => e.every((e) => e.tags?.includes(t))), h = e.every((e) => e.trashed), g = a("span", { class: "fm-info-stack" }, e.slice(0, 3).map((e) => a("span", {}, x(e))));
	return a("div", {}, Y(g, `${H(e.length)} elementi selezionati`, s), J("Generali", q([
		["Dimensione", W(e.reduce((e, t) => e + G(t), 0))],
		c > 0 && ["Contenuto", `${H(c)} element${c === 1 ? "o" : "i"} nelle cartelle`],
		["Tipi", [...l].sort((e, t) => t[1] - e[1]).map(([e, t]) => `${e} ${H(t)}`).join(" · ")],
		!h && [
			"Posizione",
			u.size === 1 ? D(e[0]) : `${H(u.size)} cartelle diverse`,
			u.size === 1 ? "mono" : null
		],
		["Meno recente", F(Math.min(...d))],
		["Più recente", F(Math.max(...d))]
	])), J("Organizzazione", q([
		["Workspace", f.join(", ")],
		["Tag", K(p)],
		p.length > 0 && ["In comune", K(m)]
	])), J("Elementi", a("ul", { class: "fm-names" }, e.slice(0, B).map((e) => a("li", { title: e.name }, a("span", { class: "fm-icon" }, x(e)), a("span", {}, e.name))), e.length > B ? a("li", { class: "more" }, `e altri ${H(e.length - B)}`) : null)));
}
function Te() {
	let e = i.trashed();
	return a("div", {}, Y(a("span", { class: "fm-info-glyph" }, s("trash")), "Cestino", M(e.length)), J("Generali", q([
		["Contenuto", e.length ? `${M(e.length)}, ${H(e.reduce((e, t) => e + 1 + t.inside, 0))} in tutto` : M(0)],
		["Dimensione", W(e.reduce((e, t) => e + (t.bytes ?? 0), 0))],
		e.length > 0 && ["Ultima eliminazione", F(e[0].trashed.at)],
		["Conservazione", P()]
	])));
}
function Ee(e) {
	let t = i.tagged(e.id);
	return a("div", {}, Y(a("span", {
		class: "tag-dot fm-info-tag",
		style: { background: e.color },
		"aria-hidden": "true"
	}), e.name, "Tag"), J("Generali", q([
		["Elementi", M(t.length)],
		["Dimensione", W(t.reduce((e, t) => e + G(t), 0))],
		["Visibilità", e.visible ? "Visibile" : "Invisibile: i suoi elementi sono nascosti altrove"]
	])));
}
var De = class {
	#e = null;
	#t = null;
	constructor(e, { text: t, open: n }) {
		this.body = e, this.text = t, this.open = n;
	}
	update(e) {
		let t = e.length === 1 ? e[0] : null, n = t ? `${xe(t)}:${t.name}:${t.type === "folder" && !t.trashed ? i.children(t.id).map((e) => e.id + e.name).join() : ""}` : `${e.length}`;
		if (n === this.#e) return;
		if (this.#e = n, this.#s(), !t) return this.#o(e.length ? X("list", `${H(e.length)} elementi selezionati`, "L’anteprima mostra un elemento alla volta") : X("file", "Nessun elemento selezionato", "Seleziona un file per vederne il contenuto"));
		if (t.trashed) return this.#o(this.#n(t), X("trash", "Nel cestino", "Ripristinalo per vederne il contenuto"));
		if (t.type === "folder") return this.#o(this.#n(t), this.#i(t));
		if (t.type === "app") return this.#o(this.#n(t), this.#a(t));
		let r = a("div", { class: "fm-preview-wait" }, "Caricamento…");
		this.#o(this.#n(t), r), this.text(t).then((e) => {
			this.#e === n && r.replaceWith(this.#r(t, e));
		}, (e) => {
			this.#e === n && r.replaceWith(X("x", "Impossibile leggere il file", e?.message ?? ""));
		});
	}
	destroy() {
		this.#s();
	}
	#n(e) {
		let t = e.trashed ? null : e.type === "folder" ? "Apri" : e.type === "app" ? "Avvia" : "Apri";
		return a("div", { class: "fm-preview-head" }, a("span", { class: "fm-icon" }, x(e)), a("span", {
			class: "fm-preview-name",
			title: e.name
		}, E(e)), t && a("button", {
			class: "fm-preview-open",
			type: "button",
			onclick: () => this.open(e)
		}, t));
	}
	#r(e, t) {
		if (!t) return X("file", "File vuoto", "");
		let { ext: n } = r(e.name);
		if (n === "svg" && /^\s*(<\?xml[^>]*>\s*)?(<!--[\s\S]*?-->\s*)*<svg[\s>]/i.test(t)) return this.#t = URL.createObjectURL(new Blob([t], { type: "image/svg+xml" })), a("div", { class: "fm-preview-image" }, a("img", {
			src: this.#t,
			alt: `Anteprima di ${e.name}`
		}));
		if (t.slice(0, 8e3).includes("\0")) return X("file", "Anteprima non disponibile", "Il file non contiene testo");
		let i = t.length > z;
		return a("div", { class: "fm-preview-textwrap" }, a("pre", {
			class: "fm-preview-text",
			tabindex: "0",
			"aria-label": `Contenuto di ${e.name}`
		}, i ? t.slice(0, z) : t), i ? a("div", { class: "fm-preview-note" }, `Mostrati i primi ${H(z)} caratteri su ${H(t.length)}: apri il file per vederlo tutto`) : null);
	}
	#i(e) {
		let t = i.children(e.id);
		if (!t.length) return X("folder", "Cartella vuota", "");
		let n = {
			folder: 0,
			file: 1,
			app: 1
		};
		return t.sort((e, t) => n[e.type] - n[t.type] || e.name.localeCompare(t.name, l.locale, { numeric: !0 })), a("ul", {
			class: "fm-preview-list",
			"aria-label": `Contenuto di ${e.name}`
		}, t.slice(0, V).map((e) => a("li", {
			title: `${e.name} — doppio clic per aprire`,
			ondblclick: () => this.open(e)
		}, a("span", { class: "fm-icon" }, x(e)), a("span", { class: "fm-label" }, e.name))), t.length > V ? a("li", { class: "more" }, `e altri ${H(t.length - V)}`) : null);
	}
	#a(e) {
		let t = b(e.app);
		return t ? a("div", { class: "fm-preview-app" }, n(t), a("strong", {}, t.name)) : X("x", "App non installata", e.app);
	}
	#o(...e) {
		this.body.replaceChildren(...e);
	}
	#s() {
		this.#t && URL.revokeObjectURL(this.#t), this.#t = null;
	}
};
function X(e, t, n) {
	return a("div", { class: "fm-preview-empty" }, s(e), a("strong", {}, t), n ? a("span", {}, n) : null);
}
// src/files/FilesApp.js
var Oe = 260, ke = "files-view", Z = i.trashRoot, Ae = [
	{
		key: "name",
		label: "Nome"
	},
	{
		key: "modified",
		label: "Modificato"
	},
	{
		key: "size",
		label: "Dimensione",
		num: !0
	},
	{
		key: "type",
		label: "Tipo"
	},
	{
		key: "workspace",
		label: "Workspace"
	}
], je = [
	{
		key: "name",
		label: "Nome"
	},
	{
		key: "deleted",
		label: "Eliminato"
	},
	{
		key: "size",
		label: "Dimensione",
		num: !0
	},
	{
		key: "type",
		label: "Tipo"
	},
	{
		key: "origin",
		label: "Posizione originale"
	}
], Q = "tag:", Me = [
	{
		key: "name",
		label: "Nome"
	},
	{
		key: "location",
		label: "Posizione"
	},
	{
		key: "type",
		label: "Tipo"
	},
	{
		key: "workspace",
		label: "Workspace"
	}
], $ = (e) => typeof e == "string" && e.startsWith(Q) ? p.get(e.slice(4)) : null;
function Ne(e) {
	return e?.trash || e?.folder === Z ? Z : typeof e?.tag == "string" && p.get(e.tag) ? Q + e.tag : $(e?.folder) || e?.folder && i.exists(e.folder) ? e.folder : null;
}
function Pe({ args: e } = {}) {
	let n = new t({
		title: "File Manager",
		icon: "folder",
		width: 1e3,
		height: 520,
		minWidth: 520,
		minHeight: 300
	}), r = new Ie(n);
	return r.go(Ne(e) ?? i.root, !1), n.on("launch", (e) => {
		let t = Ne(e);
		t && r.go(t);
	}), n.getState = () => ({ folder: r.folder }), n;
}
var Fe = (e) => String(e).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(), Ie = class {
	folder = i.root;
	#e = [];
	#t = [];
	#n = f.get(ke) === "grid" ? "grid" : "list";
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
	history = new e();
	constructor(e) {
		this.win = e;
		let t = (e, t, n) => a("button", {
			class: "fm-btn",
			type: "button",
			title: t,
			"aria-label": t,
			onclick: n
		}, s(e));
		this.backBtn = t("arrowLeft", "Indietro (Alt ←)", () => this.back()), this.forwardBtn = t("arrowRight", "Avanti (Alt →)", () => this.forward()), this.upBtn = t("arrowUp", "Cartella superiore (Alt ↑)", () => this.up()), this.crumbs = a("nav", {
			class: "fm-path",
			"aria-label": "Percorso"
		}), this.newBtn = t("folderPlus", "Nuova cartella", () => this.create("folder")), this.listBtn = t("list", "Vista elenco", () => this.setView("list")), this.gridBtn = t("grid", "Vista a icone", () => this.setView("grid")), this.previewBtn = t("sidebar", "", () => this.preview.toggle()), this.infoBtn = t("info", "", () => this.info.toggle()), this.search = a("input", {
			type: "text",
			spellcheck: "false",
			"aria-label": "Cerca nella cartella"
		}), this.search.addEventListener("input", () => {
			this.#i = Fe(this.search.value.trim()), this.render();
		}), this.search.addEventListener("keydown", (e) => {
			e.key === "Escape" && this.search.value && (e.stopPropagation(), this.search.value = "", this.#i = "", this.render()), e.key === "ArrowDown" && (e.preventDefault(), this.list.focus());
		}), this.side = a("aside", {
			class: "fm-side",
			"aria-label": "Risorse"
		}), this.list = a("div", {
			class: "fm-list",
			role: "listbox",
			tabindex: "0",
			"aria-multiselectable": "true",
			"aria-label": "Contenuto della cartella"
		}), this.statusLeft = a("span"), this.statusRight = a("span", { class: "fm-status-right" });
		let n = (t, n, r, i, a) => new _e({
			key: t,
			title: n,
			label: r,
			width: i,
			open: a,
			signal: e.signal,
			room: () => this.#h() - (t === "info" ? this.preview : this.info).shown,
			onLayout: () => {
				this.#g(), this.#p();
			}
		});
		this.preview = n("preview", "Anteprima", "dell’anteprima", 300, !1), this.info = n("info", "Informazioni", "delle informazioni", 260, !0), this.previewView = new De(this.preview.body, {
			text: (e) => this.#m(e),
			open: (e) => this.open(e)
		}), this.main = a("div", { class: "fm" }, this.side, a("div", { class: "fm-main" }, this.list, a("div", { class: "fm-status" }, this.statusLeft, this.statusRight)), this.preview.el, this.info.el), e.body.append(a("div", { class: "fm-toolbar" }, this.backBtn, this.forwardBtn, this.upBtn, this.crumbs, this.newBtn, a("span", { class: "fm-sep" }), this.listBtn, this.gridBtn, a("span", { class: "fm-sep" }), this.previewBtn, this.infoBtn, a("label", { class: "fm-search" }, s("search"), this.search)), this.main);
		let r = new ResizeObserver(() => this.#g());
		r.observe(this.main), this.#A(), ne(this.list, { folder: () => this.inTrash || this.inTag ? null : this.folder }), this.gap = a("div", {
			class: "fm-gap",
			"aria-hidden": "true"
		}), ne(this.side, { target: (e, t, n, r) => this.#x(e, t, n, r) });
		let c = i.on("change", (e) => this.#R(e)), l = C.on("change", () => {
			this.#P(this.folder) && this.render();
		}), u = i.on("scope", () => {
			this.#P(this.folder) && this.render();
		}), d = ce(() => {
			this.#P(this.folder) && this.render();
		}), f = i.on("trash", () => {
			this.inTrash && (this.#u = "", this.render());
		}), m = p.on("change", () => {
			if (this.folder.startsWith?.(Q) && !this.inTag) return this.go(i.root, !1);
			this.#P(this.folder) && this.render();
		}), h = _({
			isActive: () => e.active,
			selectionSize: () => this.#o.size,
			open: () => this.openSelected(),
			rename: () => this.rename([...this.#o][0]),
			remove: () => this.remove([...this.#o]),
			selectAll: () => this.#k(this.#a.map((e) => e.id)),
			deselect: () => this.#k([])
		}), g = o.attach(e.el, this.history), ee = [re("files.info", {
			isActive: () => e.active,
			run: () => this.info.toggle()
		}), re("files.preview", {
			isActive: () => e.active,
			run: () => this.preview.toggle()
		})];
		e.on("destroy", () => {
			c(), l(), u(), d(), f(), m(), h(), g(), ee.forEach((e) => e()), r.disconnect(), this.previewView.destroy();
		});
	}
	get inTrash() {
		return this.folder === Z;
	}
	get inTag() {
		return $(this.folder);
	}
	go(e, t = !0) {
		if (e !== Z && !$(e) && i.get(e)?.type !== "folder") return;
		t && e !== this.folder && (this.#e.push(this.folder), this.#t = []);
		let n = this.folder;
		this.folder = e, this.#o.clear(), this.#l = null, this.#u = "", this.search.value = "", this.#i = "";
		let r = i.ancestors(n).find((t) => t.parent === e);
		this.#c = r?.id ?? null, r && this.#o.add(r.id), this.#s = this.#c, this.render(), this.list.scrollTop = 0;
	}
	reveal(e) {
		let t = i.get(e);
		t && (this.go(t.parent), i.isHidden(e) ? this.#L(`«${t.name}» è nascosto da un tag invisibile`) : this.#k([e], e));
	}
	back() {
		this.#I(this.#e, this.#t);
	}
	forward() {
		this.#I(this.#t, this.#e);
	}
	up() {
		let e = i.get(this.folder)?.parent;
		e && this.go(e);
	}
	setView(e) {
		this.#n = e, f.set(ke, e), this.render();
	}
	open(e) {
		if (e.type === "folder") return this.go(e.id);
		if (e.type === "app") return S(e.app);
		le(e);
	}
	openSelected() {
		if (this.inTrash) return this.#L("Per aprirlo, ripristinalo (clic destro → Ripristina)");
		let e = this.#a.filter((e) => this.#o.has(e.id)), t = e.find((e) => e.type === "folder");
		e.filter((e) => e.type !== "folder").forEach((e) => this.open(e)), t && this.go(t.id);
	}
	create(e) {
		if (this.inTrash || this.inTag) return;
		this.#i &&= (this.search.value = "", "");
		let t = i.create(this.folder, {
			type: e,
			name: e === "folder" ? "Nuova cartella" : "Nuovo file.txt"
		});
		this.#k([t.id]), this.rename(t.id, !0);
	}
	rename(e, t = !1) {
		let n = i.get(e);
		if (!n || n.system) return;
		this.#l = e, this.render();
		let r = this.list.querySelector(".fm-rename");
		if (!r) return;
		r.focus();
		let a = n.type === "file" ? n.name.lastIndexOf(".") : -1;
		r.setSelectionRange(0, a > 0 ? a : n.name.length);
		let o = !1, s = (a) => {
			if (o) return;
			o = !0, this.#l = null;
			let s = r.value.replace(/\s+/g, " ").trim();
			if (a && s && s !== n.name && i.exists(e)) try {
				fe(t ? null : this.history, e, s);
			} catch (e) {
				this.#L(e.message);
			}
			t && ue(this.history, e), this.render(), this.list.focus();
		};
		r.addEventListener("keydown", (e) => {
			e.stopPropagation(), e.key === "Enter" && (e.preventDefault(), s(!0)), e.key === "Escape" && (e.preventDefault(), s(!1));
		}), r.addEventListener("blur", () => s(!0));
	}
	remove(e) {
		if (this.inTrash) return this.purge(e);
		let t = e.filter((e) => !i.get(e)?.system);
		if (!t.length) return this.#L("Le cartelle di sistema non si possono eliminare");
		let { x: n, y: r } = this.#F(t[0]);
		te(t, n, r, this.history);
	}
	restore(e) {
		let t = pe(this.history, e);
		if (!t.length) return;
		let n = [...new Set(t.map((e) => e.parent === i.root ? "Home" : i.path(e.parent)))], r = t.length === 1 ? `«${i.get(t[0].id).name}»` : `${t.length} elementi`;
		m(`Ripristinat${t.length === 1 ? "o" : "i"} ${r} in ${n.length === 1 ? n[0] : `${n.length} cartelle`}`);
	}
	purge(e) {
		let t = this.#a.filter((t) => e.includes(t.id));
		if (!t.length) return;
		let n = t.length === 1 ? `«${t[0].name}»` : `${t.length} elementi`, { x: r, y: a } = this.#F(t[0].id);
		c(r, a, [{
			label: `Elimina definitivamente ${n}`,
			icon: "trash",
			danger: !0,
			action: () => i.purge(t.map((e) => e.id))
		}, {
			label: "Annulla",
			icon: "x",
			action: () => {}
		}]);
	}
	empty(e, t) {
		let n = i.trashed().length;
		n && c(e, t, [{
			label: `Elimina definitivamente ${n === 1 ? "l’elemento" : `tutti i ${n} elementi`} nel cestino`,
			icon: "trash",
			danger: !0,
			action: () => i.purgeTrash()
		}, {
			label: "Annulla",
			icon: "x",
			action: () => {}
		}]);
	}
	render() {
		let e = this.inTag, t = this.inTrash ? {
			id: Z,
			name: "Cestino",
			parent: null
		} : e ? {
			id: this.folder,
			name: `Tag «${e.name}»`,
			parent: null
		} : i.get(this.folder);
		if (!t) return;
		this.win.setTitle(E(t), "File Manager"), this.#_(t), this.#v();
		let n = this.inTrash ? i.trashed() : e ? i.tagged(e.id) : i.children(this.folder);
		this.#a = this.#O(this.#i ? n.filter((e) => Fe(e.name).includes(this.#i)) : n);
		let r = new Set(this.#a.map((e) => e.id));
		this.#o = new Set([...this.#o].filter((e) => r.has(e))), r.has(this.#c) || (this.#c = this.#a[0]?.id ?? null);
		let o = this.list.scrollTop;
		this.list.classList.toggle("grid", this.#n === "grid"), this.#a.length ? this.#n === "list" ? this.list.replaceChildren(this.#C(), ...this.#a.map((e) => this.#w(e))) : this.list.replaceChildren(...this.#a.map((e) => this.#T(e))) : this.list.replaceChildren(a("div", { class: "fm-empty" }, this.#i ? `Nessun elemento corrisponde a «${this.search.value.trim()}»` : this.inTrash ? "Il cestino è vuoto" : e ? "Nessun elemento ha questo tag. Si assegna dal menu del tasto destro → Tag." : "Questa cartella è vuota")), this.list.scrollTop = o, this.list.setAttribute("aria-activedescendant", this.#c ? `fm-${this.#c}` : "");
		let s = n.length, c = this.#o.size;
		this.statusLeft.textContent = (s === 1 ? "1 elemento" : `${s} elementi`) + (c ? ` · ${c} selezionat${c === 1 ? "o" : "i"}` : ""), this.statusRight.textContent = this.#u || (this.inTrash ? P() : e ? e.visible ? "Tutti gli elementi con questo tag" : "Tag invisibile: questi elementi sono nascosti altrove" : i.path(this.folder)), this.statusRight.classList.toggle("msg", !!this.#u), this.#p();
	}
	#p() {
		for (let [e, t, n, r] of [[
			this.previewBtn,
			this.preview,
			"l’anteprima",
			"files.preview"
		], [
			this.infoBtn,
			this.info,
			"le informazioni",
			"files.info"
		]]) {
			let i = d.label(r), a = `${t.open ? "Nascondi" : "Mostra"} ${n}${i ? ` (${i})` : ""}`;
			e.title = a, e.setAttribute("aria-label", a), e.setAttribute("aria-pressed", String(t.open)), e.classList.toggle("on", t.open);
		}
		if (!this.info.open && !this.preview.open) return;
		let e = this.#a.filter((e) => this.#o.has(e.id));
		if (this.preview.open && this.previewView.update(e), this.info.open) {
			let t = this.inTag, n = this.inTrash ? { trash: !0 } : t ? { tag: t } : { node: i.get(this.folder) };
			if (!n.trash && !n.tag && !n.node) return;
			let r = this.info.body, a = r.scrollTop;
			r.replaceChildren(Se({
				nodes: e,
				place: n,
				text: (e) => this.#m(e)
			})), r.scrollTop = a;
		}
	}
	#m(e) {
		if (!be(e)) return Promise.reject(/* @__PURE__ */ Error("Non è un file"));
		let t = xe(e);
		return this.#f.key !== t && (this.#f = {
			key: t,
			text: i.read(e.id)
		}), this.#f.text;
	}
	#h() {
		return this.main.clientWidth - this.side.offsetWidth - Oe;
	}
	#g() {
		let e = [this.preview, this.info].filter((e) => e.open);
		if (!e.length || !this.main.isConnected) return;
		let t = e.reduce((e, t) => e + t.width, 0), n = Math.min(1, Math.max(0, this.#h()) / t);
		e.forEach((e) => e.show(Math.max(180, Math.floor(e.width * n))));
	}
	#_(e) {
		this.backBtn.disabled = !this.#e.some((e) => this.#P(e)), this.forwardBtn.disabled = !this.#t.some((e) => this.#P(e)), this.upBtn.disabled = !e.parent, this.newBtn.disabled = this.inTrash || !!this.inTag, this.listBtn.classList.toggle("on", this.#n === "list"), this.gridBtn.classList.toggle("on", this.#n === "grid"), this.listBtn.setAttribute("aria-pressed", String(this.#n === "list")), this.gridBtn.setAttribute("aria-pressed", String(this.#n === "grid")), this.search.placeholder = `Cerca in ${E(e)}`;
		let t = this.inTrash || this.inTag ? [e] : i.ancestors(this.folder);
		this.crumbs.replaceChildren(...t.flatMap((e, n) => {
			let r = n === t.length - 1 ? a("span", {
				class: "fm-crumb current",
				"aria-current": "page"
			}, E(e)) : a("button", {
				class: "fm-crumb",
				type: "button",
				onclick: () => this.go(e.id)
			}, E(e));
			return i.exists(e.id) && ae(r, e), n ? [a("span", {
				class: "fm-crumb-sep",
				"aria-hidden": "true"
			}, "›"), r] : [r];
		}));
	}
	#v() {
		let e = i.children(i.root), t = new Set(i.ancestors(this.folder).map((e) => e.id)), n = [{
			key: "root",
			id: i.root,
			name: "Home",
			glyph: "home"
		}, ...ee.map((t) => ({
			...t,
			id: e.find((e) => e.name === t.name && e.system)?.id,
			glyph: t.icon
		})).filter((e) => e.id).map((e) => ({
			...e,
			key: e.name === g ? "desk" : e.id
		}))], r = this.inTrash || this.inTag ? this.folder : [...n].reverse().find((e) => t.has(e.id))?.id, o = (e) => a("button", {
			class: e.id === r ? "fm-place on" : "fm-place",
			type: "button",
			"aria-current": e.id === r ? "true" : null,
			onclick: () => this.go(e.id)
		}, s(e.glyph), a("span", {}, e.name)), l = (e) => {
			let t = Q + e.id;
			return a("button", {
				class: t === r ? "fm-place fm-tag on" : "fm-place fm-tag",
				type: "button",
				"aria-current": t === r ? "true" : null,
				title: e.visible ? e.name : `${e.name}: tag invisibile, i suoi elementi sono nascosti altrove`,
				onclick: () => this.go(t)
			}, a("span", {
				class: "tag-dot",
				style: { background: e.color },
				"aria-hidden": "true"
			}), a("span", {}, e.name), e.visible ? null : s("eyeOff"));
		}, u = p.list(), d = n.map((e) => e.key);
		this.#d = {
			defaults: d,
			desk: n.find((e) => e.key === "desk")?.id
		};
		let f = (e, t, { node: n, folder: r } = {}) => (t.dataset.entry = e, r && (t.dataset.folder = r), t.addEventListener("pointerdown", (e) => {
			e.button === 0 && !e.target.closest(".fm-link-x") && y(e, {
				ids: [n],
				stack: this.history
			});
		}), t), m = (e) => {
			let t = e.id === this.folder, n = () => this.#y(e), r = a("button", {
				class: t ? "fm-place fm-link on" : "fm-place fm-link",
				type: "button",
				"aria-current": t ? "true" : null,
				title: e.parent === i.root ? `Home › ${e.name}` : `${i.path(e.parent)} › ${e.name}`,
				onclick: () => this.open(e)
			}, a("span", { class: "fm-link-icon" }, x(e)), a("span", {}, e.name));
			r.addEventListener("contextmenu", (t) => {
				t.preventDefault(), c(t.clientX, t.clientY, [
					{
						label: "Apri",
						icon: "open",
						action: () => this.open(e)
					},
					{
						label: "Mostra nella cartella",
						icon: "folderOpen",
						action: () => this.reveal(e.id)
					},
					"-",
					{
						label: "Elimina il collegamento",
						icon: "x",
						action: n
					}
				]);
			}), r.addEventListener("keydown", (e) => {
				e.key === "Delete" && (e.preventDefault(), e.stopPropagation(), n());
			});
			let o = a("button", {
				class: "fm-link-x",
				type: "button",
				title: "Elimina il collegamento (il file resta)",
				"aria-label": `Elimina il collegamento a «${e.name}»`,
				onclick: n
			}, s("x"));
			return f(e.id, a("div", { class: "fm-link-row" }, r, o), {
				node: e.id,
				folder: e.type === "folder" ? e.id : null
			});
		}, h = (e) => {
			let t = n.find((t) => t.key === e);
			if (t) return f(e, o(t), {
				node: t.id,
				folder: t.id
			});
			let r = i.get(e);
			return r ? m(r) : [];
		}, _ = o({
			id: Z,
			name: "Cestino",
			glyph: "trash"
		});
		_.dataset.trash = "", this.side.replaceChildren(a("section", {
			class: "fm-side-links",
			"aria-label": "Collegamenti"
		}, a("h6", {}, "Collegamenti"), ...C.arrange(d).flatMap(h)), ...u.length ? [a("h6", {}, "Tag"), ...u.map(l)] : [], a("hr", { class: "fm-side-sep" }), _, this.gap);
	}
	#y(e) {
		let { defaults: t } = this.#d, n = C.arrange(t).indexOf(e.id);
		n < 0 || (C.remove(e.id), this.history.push({
			label: `Elimina il collegamento a «${e.name}»`,
			undo: () => C.place([e.id], n, t),
			redo: () => C.remove(e.id)
		}), m(`Collegamento a «${e.name}» eliminato`), this.list.focus());
	}
	#b(e) {
		return e === i.root ? "root" : e === this.#d.desk ? "desk" : i.exists(e) ? e : null;
	}
	#x(e, t, n, r) {
		let a = e?.closest?.("[data-trash]");
		if (a) return r.some((e) => !i.get(e)?.system) ? {
			el: a,
			run: (e, t) => this.#S(r, t)
		} : null;
		let o = this.side.querySelector(".fm-side-links");
		if (!o?.contains(e)) return null;
		let s = [...o.querySelectorAll(":scope > [data-entry]")], c = e.closest("[data-entry]");
		if (c && s.includes(c)) {
			let e = c.getBoundingClientRect(), t = Math.min(8, e.height / 4), { folder: i } = c.dataset;
			if (i && n > e.top + t && n < e.bottom - t) {
				let e = oe(r, i);
				return e && {
					el: c,
					run: (t, n) => se(n, e, i)
				};
			}
		}
		let l = s.findIndex((e) => {
			let t = e.getBoundingClientRect();
			return n < t.top + t.height / 2;
		});
		l < 0 && (l = s.length);
		let u = [...new Set(r.map((e) => this.#b(e)).filter(Boolean))], { defaults: d } = this.#d;
		if (!C.changes(u, l, d)) return null;
		let f = this.side.getBoundingClientRect(), p = l < s.length ? s[l].getBoundingClientRect().top : s[s.length - 1].getBoundingClientRect().bottom;
		return this.gap.style.top = `${p - f.top + this.side.scrollTop}px`, {
			el: this.gap,
			run: () => {
				let e = C.place(u, l, d);
				e && m(e === 1 ? "Collegamento aggiunto" : `${e} collegamenti aggiunti`);
			}
		};
	}
	#S(e, t) {
		let n = e.filter((e) => !i.get(e)?.system).length;
		de(t, e), m(n === 1 ? "Spostato nel cestino" : `${n} elementi spostati nel cestino`);
	}
	#C() {
		let e = this.inTrash ? je : this.inTag ? Me : Ae;
		return a("div", {
			class: this.inTag ? "fm-head tagged" : "fm-head",
			role: "presentation"
		}, e.map((e) => {
			let t = this.#r.key === e.key;
			return a("button", {
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
			}, e.label, t ? a("span", {
				class: "fm-arrow",
				"aria-hidden": "true"
			}, this.#r.dir > 0 ? "▲" : "▼") : null);
		}));
	}
	#w(e) {
		if (e.trashed) {
			let t = O(e);
			return this.#D(e, "fm-row", a("span", { class: "fm-name" }, a("span", { class: "fm-icon" }, x(e)), this.#E(e)), a("span", {}, F(e.trashed.at)), a("span", { class: "num" }, N(e)), a("span", {}, T(e)), a("span", { title: `Ripristinando torna in ${t}` }, t));
		}
		let t = a("span", { class: "fm-name" }, a("span", { class: "fm-icon" }, x(e)), this.#E(e), w(e));
		if (this.inTag) {
			let n = D(e);
			return this.#D(e, "fm-row tagged", t, a("span", { title: n }, n), a("span", {}, T(e)), A(e));
		}
		return this.#D(e, "fm-row", t, a("span", {}, F(e.modified)), a("span", { class: "num" }, N(e)), a("span", {}, T(e)), A(e));
	}
	#T(e) {
		let t = this.#D(e, "fm-tile", a("span", { class: "fm-tile-icon" }, x(e), w(e, "fm-tile-tags")), this.#E(e)), n = (e.tags ?? []).map((e) => p.get(e)?.name).filter(Boolean);
		return t.title = e.trashed ? `${e.name}\nEliminato: ${F(e.trashed.at)}\nPosizione originale: ${O(e)}` : `${e.name}${this.inTag ? `\nPosizione: ${D(e)}` : ""}\nWorkspace: ${k(e)}${n.length ? `\nTag: ${n.join(", ")}` : ""}`, t;
	}
	#E(e) {
		return this.#l === e.id ? a("input", {
			class: "fm-rename",
			type: "text",
			value: e.name,
			spellcheck: "false",
			"aria-label": "Nuovo nome"
		}) : a("span", {
			class: "fm-label",
			title: e.name
		}, e.name);
	}
	#D(e, t, ...n) {
		let r = this.#o.has(e.id), i = a("div", {
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
		return e.trashed ? i : ae(i, e);
	}
	#O(e) {
		let { key: t, dir: n } = this.#r, r = (e) => t === "type" ? T(e) : t === "workspace" ? k(e) : t === "size" ? e.type === "folder" ? e.trashed ? e.inside : i.children(e.id).length : e.size ?? 0 : t === "modified" ? e.modified : t === "deleted" ? e.trashed?.at ?? e.modified : t === "origin" && e.trashed ? O(e) : t === "location" ? D(e) : e.name, a = {
			folder: 0,
			file: 1,
			app: 1
		};
		return [...e].sort((e, t) => {
			if (a[e.type] !== a[t.type]) return a[e.type] - a[t.type];
			let i = r(e), o = r(t);
			return ((typeof i == "number" ? i - o : String(i).localeCompare(String(o), l.locale, { numeric: !0 })) || e.name.localeCompare(t.name, l.locale, { numeric: !0 })) * n;
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
			!this.inTrash && this.#o.has(r) && y(e, {
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
			let r = i.get(n.dataset.id);
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
			label: this.#n === "list" ? "Vista a icone" : "Vista elenco",
			icon: this.#n === "list" ? "grid" : "list",
			action: () => this.setView(this.#n === "list" ? "grid" : "list")
		};
		if (this.inTrash) {
			let n = !this.#a.length;
			return c(e.clientX, e.clientY, [
				{
					label: "Ripristina tutto",
					icon: "undo",
					disabled: n,
					action: () => this.restore(i.trashed().map((e) => e.id))
				},
				{
					label: "Svuota il cestino…",
					icon: "trash",
					danger: !0,
					disabled: n,
					action: () => this.empty(e.clientX, e.clientY)
				},
				"-",
				t
			]);
		}
		if (this.inTag) return c(e.clientX, e.clientY, [
			{
				label: "Gestisci i tag…",
				icon: "gear",
				action: () => S("settings", { tab: "tags" })
			},
			"-",
			t
		]);
		c(e.clientX, e.clientY, [
			{
				label: "Nuova cartella",
				icon: "folderPlus",
				action: () => this.create("folder")
			},
			{
				label: "Nuovo file di testo",
				icon: "filePlus",
				action: () => this.create("file")
			},
			"-",
			t
		]);
	}
	#N(e) {
		let t = this.#a.filter((e) => this.#o.has(e.id)), n = t.length > 1;
		if (this.inTrash) {
			let r = t.map((e) => e.id);
			return c(e.clientX, e.clientY, [
				{
					label: n ? `Ripristina ${t.length} elementi` : "Ripristina",
					icon: "undo",
					action: () => this.restore(r)
				},
				{
					label: "Informazioni",
					icon: "info",
					shortcut: d.label("files.info"),
					action: () => this.info.setOpen(!0)
				},
				"-",
				{
					label: "Elimina definitivamente…",
					icon: "trash",
					shortcut: d.label("items.delete"),
					danger: !0,
					action: () => this.purge(r)
				}
			]);
		}
		let r = t.some((e) => e.system), i = t.map((e) => e.id), a = this.inTag;
		c(e.clientX, e.clientY, [
			{
				label: n ? `Apri ${t.length} elementi` : "Apri",
				icon: "open",
				shortcut: d.label("items.open"),
				action: () => this.openSelected()
			},
			!n && t[0].type === "file" && {
				label: "Apri con…",
				icon: "open",
				action: () => le(t[0], { choose: !0 })
			},
			!n && t[0].type === "folder" && {
				label: "Apri nell’Editor",
				icon: "code",
				action: () => S("editor", { folder: t[0].id })
			},
			a && !n && {
				label: "Mostra nella cartella",
				icon: "folderOpen",
				action: () => this.reveal(t[0].id)
			},
			{
				label: "Rinomina",
				icon: "pencil",
				shortcut: d.label("items.rename"),
				disabled: n || r,
				action: () => this.rename(t[0].id)
			},
			ge(i),
			a && {
				label: `Togli il tag «${a.name}»`,
				icon: "x",
				action: () => me(i, a.id, !1)
			},
			ie(i),
			{
				label: "Informazioni",
				icon: "info",
				shortcut: d.label("files.info"),
				action: () => this.info.setOpen(!0)
			},
			!n && {
				label: "Proprietà…",
				icon: "info",
				action: () => he(t[0].id)
			},
			"-",
			{
				label: n ? `Elimina ${t.length} elementi` : "Elimina",
				icon: "trash",
				shortcut: d.label("items.delete"),
				danger: !0,
				disabled: r,
				action: () => this.remove(t.map((e) => e.id))
			}
		].filter(Boolean));
	}
	#P(e) {
		return e === Z || !!$(e) || i.exists(e);
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
		let t = e.node && C.has(e.node.id);
		if (this.inTrash) return t ? this.render() : void 0;
		if (this.inTag) return this.render();
		if (e.type === "remove" && e.ids.includes(this.folder)) return this.go(e.parent && i.exists(e.parent) ? e.parent : i.root, !1);
		let n = e.parent === this.folder || e.from === this.folder, r = e.type !== "remove" && i.isInside(this.folder, e.node.id), a = [e.parent, e.from].some((e) => e && i.exists(e) && i.get(e).parent === this.folder);
		(n || r || a || t) && (n && e.type !== "rename" && (this.#u = ""), this.render());
	}
};
export { Pe as default };
