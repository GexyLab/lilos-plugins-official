import { UndoStack as e, Window as t, fileType as n, fs as r, h as i, history as a, icon as o, openMenu as s, session as c, settings as l, shortcuts as u, storage as d, tags as f, toast as p } from "/host/sdk.js";
import { DESK_NAME as m, SYSTEM_FOLDERS as h, addTarget as g, confirmRemove as _, describeWorkspace as v, dragItems as y, dropZone as b, itemIcon as x, launch as S, linkEntry as C, links as w, markItem as T, movableInto as E, moveInto as D, onWorkspacesChange as O, openFile as k, recordCreated as A, removeNodes as j, renameNode as M, restoreNodes as N, setTag as P, tagDots as F, tagSubmenu as I } from "/host/system.js";
// src/files/FilesApp.js
var L = "files-view", R = r.trashRoot, ee = [
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
], te = [
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
], z = "tag:", B = [
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
], V = (e) => typeof e == "string" && e.startsWith(z) ? f.get(e.slice(4)) : null, H = (e) => e.parent === r.root ? "Home" : r.path(e.parent);
function U(e) {
	let t = e.trashed.from;
	return r.exists(t) && t !== r.root ? r.path(t) : "Home";
}
function W(e) {
	let t = v(e.workspace);
	return t ? t.removed ? `${t.name} (eliminato)` : t.name : e.workspace ? "Sconosciuto" : "Condiviso";
}
function G(e) {
	let t = v(e.workspace), n = i("span", {
		class: "ws-owner-dot",
		"aria-hidden": "true"
	});
	return t && (n.style.background = t.color), i("span", {
		class: [
			"ws-owner",
			!t && "shared",
			t?.removed && "removed"
		].filter(Boolean).join(" "),
		title: `Workspace: ${W(e)}`
	}, n, i("span", {}, W(e)));
}
function K(e) {
	return e?.trash || e?.folder === R ? R : typeof e?.tag == "string" && f.get(e.tag) ? z + e.tag : V(e?.folder) || e?.folder && r.exists(e.folder) ? e.folder : null;
}
function q({ args: e } = {}) {
	let n = new t({
		title: "File",
		icon: "folder",
		width: 780,
		height: 480,
		minWidth: 520,
		minHeight: 300
	}), i = new re(n);
	return i.go(K(e) ?? r.root, !1), n.on("launch", (e) => {
		let t = K(e);
		t && i.go(t);
	}), n.getState = () => ({ folder: i.folder }), n;
}
var J = (e) => String(e).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(), Y = (e) => e.type === "folder" ? "Cartella" : e.type === "app" ? "App" : n(e.name).label, X = (e) => e.id === r.root ? "Home" : e.name;
function Z(e) {
	if (e < 1024) return `${e} B`;
	let t = [
		"KB",
		"MB",
		"GB"
	], n = e, r = -1;
	do
		n /= 1024, r++;
	while (n >= 1024 && r < t.length - 1);
	return `${n.toLocaleString(c.locale, { maximumFractionDigits: 1 })} ${t[r]}`;
}
function Q(e) {
	if (e.type === "folder") {
		let t = e.trashed ? e.inside : r.children(e.id).length;
		return t === 0 ? "Vuota" : t === 1 ? "1 elemento" : `${t} elementi`;
	}
	return e.type === "file" ? Z(e.size ?? 0) : "—";
}
function ne() {
	let e = l.get("trashRetention");
	return e <= 0 ? "Gli elementi restano finché non li elimini" : `Eliminati definitivamente dopo ${e === 1 ? "1 giorno" : `${e} giorni`}`;
}
var $ = (e) => new Date(e).toLocaleString(c.locale, {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit"
}), re = class {
	folder = r.root;
	#e = [];
	#t = [];
	#n = d.get(L) === "grid" ? "grid" : "list";
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
	history = new e();
	constructor(e) {
		this.win = e;
		let t = (e, t, n) => i("button", {
			class: "fm-btn",
			type: "button",
			title: t,
			"aria-label": t,
			onclick: n
		}, o(e));
		this.backBtn = t("arrowLeft", "Indietro (Alt ←)", () => this.back()), this.forwardBtn = t("arrowRight", "Avanti (Alt →)", () => this.forward()), this.upBtn = t("arrowUp", "Cartella superiore (Alt ↑)", () => this.up()), this.crumbs = i("nav", {
			class: "fm-path",
			"aria-label": "Percorso"
		}), this.newBtn = t("folderPlus", "Nuova cartella", () => this.create("folder")), this.listBtn = t("list", "Vista elenco", () => this.setView("list")), this.gridBtn = t("grid", "Vista a icone", () => this.setView("grid")), this.search = i("input", {
			type: "text",
			spellcheck: "false",
			"aria-label": "Cerca nella cartella"
		}), this.search.addEventListener("input", () => {
			this.#i = J(this.search.value.trim()), this.render();
		}), this.search.addEventListener("keydown", (e) => {
			e.key === "Escape" && this.search.value && (e.stopPropagation(), this.search.value = "", this.#i = "", this.render()), e.key === "ArrowDown" && (e.preventDefault(), this.list.focus());
		}), this.side = i("aside", {
			class: "fm-side",
			"aria-label": "Risorse"
		}), this.list = i("div", {
			class: "fm-list",
			role: "listbox",
			tabindex: "0",
			"aria-multiselectable": "true",
			"aria-label": "Contenuto della cartella"
		}), this.statusLeft = i("span"), this.statusRight = i("span", { class: "fm-status-right" }), e.body.append(i("div", { class: "fm-toolbar" }, this.backBtn, this.forwardBtn, this.upBtn, this.crumbs, this.newBtn, i("span", { class: "fm-sep" }), this.listBtn, this.gridBtn, i("label", { class: "fm-search" }, o("search"), this.search)), i("div", { class: "fm" }, this.side, i("div", { class: "fm-main" }, this.list, i("div", { class: "fm-status" }, this.statusLeft, this.statusRight)))), this.#T(), b(this.list, { folder: () => this.inTrash || this.inTag ? null : this.folder }), this.gap = i("div", {
			class: "fm-gap",
			"aria-hidden": "true"
		}), b(this.side, { target: (e, t, n, r) => this.#g(e, t, n, r) });
		let n = r.on("change", (e) => this.#N(e)), s = w.on("change", () => {
			this.#k(this.folder) && this.render();
		}), c = r.on("scope", () => {
			this.#k(this.folder) && this.render();
		}), l = O(() => {
			this.#k(this.folder) && this.render();
		}), u = r.on("trash", () => {
			this.inTrash && (this.#u = "", this.render());
		}), d = f.on("change", () => {
			if (this.folder.startsWith?.(z) && !this.inTag) return this.go(r.root, !1);
			this.#k(this.folder) && this.render();
		}), p = g({
			isActive: () => e.active,
			selectionSize: () => this.#o.size,
			open: () => this.openSelected(),
			rename: () => this.rename([...this.#o][0]),
			remove: () => this.remove([...this.#o]),
			selectAll: () => this.#w(this.#a.map((e) => e.id)),
			deselect: () => this.#w([])
		}), m = a.attach(e.el, this.history);
		e.on("destroy", () => {
			n(), s(), c(), l(), u(), d(), p(), m();
		});
	}
	get inTrash() {
		return this.folder === R;
	}
	get inTag() {
		return V(this.folder);
	}
	go(e, t = !0) {
		if (e !== R && !V(e) && r.get(e)?.type !== "folder") return;
		t && e !== this.folder && (this.#e.push(this.folder), this.#t = []);
		let n = this.folder;
		this.folder = e, this.#o.clear(), this.#l = null, this.#u = "", this.search.value = "", this.#i = "";
		let i = r.ancestors(n).find((t) => t.parent === e);
		this.#c = i?.id ?? null, i && this.#o.add(i.id), this.#s = this.#c, this.render(), this.list.scrollTop = 0;
	}
	reveal(e) {
		let t = r.get(e);
		t && (this.go(t.parent), r.isHidden(e) ? this.#M(`«${t.name}» è nascosto da un tag invisibile`) : this.#w([e], e));
	}
	back() {
		this.#j(this.#e, this.#t);
	}
	forward() {
		this.#j(this.#t, this.#e);
	}
	up() {
		let e = r.get(this.folder)?.parent;
		e && this.go(e);
	}
	setView(e) {
		this.#n = e, d.set(L, e), this.render();
	}
	open(e) {
		if (e.type === "folder") return this.go(e.id);
		if (e.type === "app") return S(e.app);
		k(e);
	}
	openSelected() {
		if (this.inTrash) return this.#M("Per aprirlo, ripristinalo (clic destro → Ripristina)");
		let e = this.#a.filter((e) => this.#o.has(e.id)), t = e.find((e) => e.type === "folder");
		e.filter((e) => e.type !== "folder").forEach((e) => this.open(e)), t && this.go(t.id);
	}
	create(e) {
		if (this.inTrash || this.inTag) return;
		this.#i &&= (this.search.value = "", "");
		let t = r.create(this.folder, {
			type: e,
			name: e === "folder" ? "Nuova cartella" : "Nuovo file.txt"
		});
		this.#w([t.id]), this.rename(t.id, !0);
	}
	rename(e, t = !1) {
		let n = r.get(e);
		if (!n || n.system) return;
		this.#l = e, this.render();
		let i = this.list.querySelector(".fm-rename");
		if (!i) return;
		i.focus();
		let a = n.type === "file" ? n.name.lastIndexOf(".") : -1;
		i.setSelectionRange(0, a > 0 ? a : n.name.length);
		let o = !1, s = (a) => {
			if (o) return;
			o = !0, this.#l = null;
			let s = i.value.replace(/\s+/g, " ").trim();
			if (a && s && s !== n.name && r.exists(e)) try {
				M(t ? null : this.history, e, s);
			} catch (e) {
				this.#M(e.message);
			}
			t && A(this.history, e), this.render(), this.list.focus();
		};
		i.addEventListener("keydown", (e) => {
			e.stopPropagation(), e.key === "Enter" && (e.preventDefault(), s(!0)), e.key === "Escape" && (e.preventDefault(), s(!1));
		}), i.addEventListener("blur", () => s(!0));
	}
	remove(e) {
		if (this.inTrash) return this.purge(e);
		let t = e.filter((e) => !r.get(e)?.system);
		if (!t.length) return this.#M("Le cartelle di sistema non si possono eliminare");
		let { x: n, y: i } = this.#A(t[0]);
		_(t, n, i, this.history);
	}
	restore(e) {
		let t = N(this.history, e);
		if (!t.length) return;
		let n = [...new Set(t.map((e) => e.parent === r.root ? "Home" : r.path(e.parent)))], i = t.length === 1 ? `«${r.get(t[0].id).name}»` : `${t.length} elementi`;
		p(`Ripristinat${t.length === 1 ? "o" : "i"} ${i} in ${n.length === 1 ? n[0] : `${n.length} cartelle`}`);
	}
	purge(e) {
		let t = this.#a.filter((t) => e.includes(t.id));
		if (!t.length) return;
		let n = t.length === 1 ? `«${t[0].name}»` : `${t.length} elementi`, { x: i, y: a } = this.#A(t[0].id);
		s(i, a, [{
			label: `Elimina definitivamente ${n}`,
			icon: "trash",
			danger: !0,
			action: () => r.purge(t.map((e) => e.id))
		}, {
			label: "Annulla",
			icon: "x",
			action: () => {}
		}]);
	}
	empty(e, t) {
		let n = r.trashed().length;
		n && s(e, t, [{
			label: `Elimina definitivamente ${n === 1 ? "l’elemento" : `tutti i ${n} elementi`} nel cestino`,
			icon: "trash",
			danger: !0,
			action: () => r.purgeTrash()
		}, {
			label: "Annulla",
			icon: "x",
			action: () => {}
		}]);
	}
	render() {
		let e = this.inTag, t = this.inTrash ? {
			id: R,
			name: "Cestino",
			parent: null
		} : e ? {
			id: this.folder,
			name: `Tag «${e.name}»`,
			parent: null
		} : r.get(this.folder);
		if (!t) return;
		this.win.setTitle(X(t), "File"), this.#f(t), this.#p();
		let n = this.inTrash ? r.trashed() : e ? r.tagged(e.id) : r.children(this.folder);
		this.#a = this.#C(this.#i ? n.filter((e) => J(e.name).includes(this.#i)) : n);
		let a = new Set(this.#a.map((e) => e.id));
		this.#o = new Set([...this.#o].filter((e) => a.has(e))), a.has(this.#c) || (this.#c = this.#a[0]?.id ?? null);
		let o = this.list.scrollTop;
		this.list.classList.toggle("grid", this.#n === "grid"), this.#a.length ? this.#n === "list" ? this.list.replaceChildren(this.#v(), ...this.#a.map((e) => this.#y(e))) : this.list.replaceChildren(...this.#a.map((e) => this.#b(e))) : this.list.replaceChildren(i("div", { class: "fm-empty" }, this.#i ? `Nessun elemento corrisponde a «${this.search.value.trim()}»` : this.inTrash ? "Il cestino è vuoto" : e ? "Nessun elemento ha questo tag. Si assegna dal menu del tasto destro → Tag." : "Questa cartella è vuota")), this.list.scrollTop = o, this.list.setAttribute("aria-activedescendant", this.#c ? `fm-${this.#c}` : "");
		let s = n.length, c = this.#o.size;
		this.statusLeft.textContent = (s === 1 ? "1 elemento" : `${s} elementi`) + (c ? ` · ${c} selezionat${c === 1 ? "o" : "i"}` : ""), this.statusRight.textContent = this.#u || (this.inTrash ? ne() : e ? e.visible ? "Tutti gli elementi con questo tag" : "Tag invisibile: questi elementi sono nascosti altrove" : r.path(this.folder)), this.statusRight.classList.toggle("msg", !!this.#u);
	}
	#f(e) {
		this.backBtn.disabled = !this.#e.some((e) => this.#k(e)), this.forwardBtn.disabled = !this.#t.some((e) => this.#k(e)), this.upBtn.disabled = !e.parent, this.newBtn.disabled = this.inTrash || !!this.inTag, this.listBtn.classList.toggle("on", this.#n === "list"), this.gridBtn.classList.toggle("on", this.#n === "grid"), this.listBtn.setAttribute("aria-pressed", String(this.#n === "list")), this.gridBtn.setAttribute("aria-pressed", String(this.#n === "grid")), this.search.placeholder = `Cerca in ${X(e)}`;
		let t = this.inTrash || this.inTag ? [e] : r.ancestors(this.folder);
		this.crumbs.replaceChildren(...t.flatMap((e, n) => {
			let a = n === t.length - 1 ? i("span", {
				class: "fm-crumb current",
				"aria-current": "page"
			}, X(e)) : i("button", {
				class: "fm-crumb",
				type: "button",
				onclick: () => this.go(e.id)
			}, X(e));
			return r.exists(e.id) && T(a, e), n ? [i("span", {
				class: "fm-crumb-sep",
				"aria-hidden": "true"
			}, "›"), a] : [a];
		}));
	}
	#p() {
		let e = r.children(r.root), t = new Set(r.ancestors(this.folder).map((e) => e.id)), n = [{
			key: "root",
			id: r.root,
			name: "Home",
			glyph: "home"
		}, ...h.map((t) => ({
			...t,
			id: e.find((e) => e.name === t.name && e.system)?.id,
			glyph: t.icon
		})).filter((e) => e.id).map((e) => ({
			...e,
			key: e.name === m ? "desk" : e.id
		}))], a = this.inTrash || this.inTag ? this.folder : [...n].reverse().find((e) => t.has(e.id))?.id, c = (e) => i("button", {
			class: e.id === a ? "fm-place on" : "fm-place",
			type: "button",
			"aria-current": e.id === a ? "true" : null,
			onclick: () => this.go(e.id)
		}, o(e.glyph), i("span", {}, e.name)), l = (e) => {
			let t = z + e.id;
			return i("button", {
				class: t === a ? "fm-place fm-tag on" : "fm-place fm-tag",
				type: "button",
				"aria-current": t === a ? "true" : null,
				title: e.visible ? e.name : `${e.name}: tag invisibile, i suoi elementi sono nascosti altrove`,
				onclick: () => this.go(t)
			}, i("span", {
				class: "tag-dot",
				style: { background: e.color },
				"aria-hidden": "true"
			}), i("span", {}, e.name), e.visible ? null : o("eyeOff"));
		}, u = f.list(), d = n.map((e) => e.key);
		this.#d = {
			defaults: d,
			desk: n.find((e) => e.key === "desk")?.id
		};
		let p = (e, t, { node: n, folder: r } = {}) => (t.dataset.entry = e, r && (t.dataset.folder = r), t.addEventListener("pointerdown", (e) => {
			e.button === 0 && !e.target.closest(".fm-link-x") && y(e, {
				ids: [n],
				stack: this.history
			});
		}), t), g = (e) => {
			let t = e.id === this.folder, n = () => this.#m(e), a = i("button", {
				class: t ? "fm-place fm-link on" : "fm-place fm-link",
				type: "button",
				"aria-current": t ? "true" : null,
				title: e.parent === r.root ? `Home › ${e.name}` : `${r.path(e.parent)} › ${e.name}`,
				onclick: () => this.open(e)
			}, i("span", { class: "fm-link-icon" }, x(e)), i("span", {}, e.name));
			a.addEventListener("contextmenu", (t) => {
				t.preventDefault(), s(t.clientX, t.clientY, [
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
			}), a.addEventListener("keydown", (e) => {
				e.key === "Delete" && (e.preventDefault(), e.stopPropagation(), n());
			});
			let c = i("button", {
				class: "fm-link-x",
				type: "button",
				title: "Elimina il collegamento (il file resta)",
				"aria-label": `Elimina il collegamento a «${e.name}»`,
				onclick: n
			}, o("x"));
			return p(e.id, i("div", { class: "fm-link-row" }, a, c), {
				node: e.id,
				folder: e.type === "folder" ? e.id : null
			});
		}, _ = (e) => {
			let t = n.find((t) => t.key === e);
			if (t) return p(e, c(t), {
				node: t.id,
				folder: t.id
			});
			let i = r.get(e);
			return i ? g(i) : [];
		}, v = c({
			id: R,
			name: "Cestino",
			glyph: "trash"
		});
		v.dataset.trash = "", this.side.replaceChildren(i("section", {
			class: "fm-side-links",
			"aria-label": "Collegamenti"
		}, i("h6", {}, "Collegamenti"), ...w.arrange(d).flatMap(_)), ...u.length ? [i("h6", {}, "Tag"), ...u.map(l)] : [], i("hr", { class: "fm-side-sep" }), v, this.gap);
	}
	#m(e) {
		let { defaults: t } = this.#d, n = w.arrange(t).indexOf(e.id);
		n < 0 || (w.remove(e.id), this.history.push({
			label: `Elimina il collegamento a «${e.name}»`,
			undo: () => w.place([e.id], n, t),
			redo: () => w.remove(e.id)
		}), p(`Collegamento a «${e.name}» eliminato`), this.list.focus());
	}
	#h(e) {
		return e === r.root ? "root" : e === this.#d.desk ? "desk" : r.exists(e) ? e : null;
	}
	#g(e, t, n, i) {
		let a = e?.closest?.("[data-trash]");
		if (a) return i.some((e) => !r.get(e)?.system) ? {
			el: a,
			run: (e, t) => this.#_(i, t)
		} : null;
		let o = this.side.querySelector(".fm-side-links");
		if (!o?.contains(e)) return null;
		let s = [...o.querySelectorAll(":scope > [data-entry]")], c = e.closest("[data-entry]");
		if (c && s.includes(c)) {
			let e = c.getBoundingClientRect(), t = Math.min(8, e.height / 4), { folder: r } = c.dataset;
			if (r && n > e.top + t && n < e.bottom - t) {
				let e = E(i, r);
				return e && {
					el: c,
					run: (t, n) => D(n, e, r)
				};
			}
		}
		let l = s.findIndex((e) => {
			let t = e.getBoundingClientRect();
			return n < t.top + t.height / 2;
		});
		l < 0 && (l = s.length);
		let u = [...new Set(i.map((e) => this.#h(e)).filter(Boolean))], { defaults: d } = this.#d;
		if (!w.changes(u, l, d)) return null;
		let f = this.side.getBoundingClientRect(), m = l < s.length ? s[l].getBoundingClientRect().top : s[s.length - 1].getBoundingClientRect().bottom;
		return this.gap.style.top = `${m - f.top + this.side.scrollTop}px`, {
			el: this.gap,
			run: () => {
				let e = w.place(u, l, d);
				e && p(e === 1 ? "Collegamento aggiunto" : `${e} collegamenti aggiunti`);
			}
		};
	}
	#_(e, t) {
		let n = e.filter((e) => !r.get(e)?.system).length;
		j(t, e), p(n === 1 ? "Spostato nel cestino" : `${n} elementi spostati nel cestino`);
	}
	#v() {
		let e = this.inTrash ? te : this.inTag ? B : ee;
		return i("div", {
			class: this.inTag ? "fm-head tagged" : "fm-head",
			role: "presentation"
		}, e.map((e) => {
			let t = this.#r.key === e.key;
			return i("button", {
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
			}, e.label, t ? i("span", {
				class: "fm-arrow",
				"aria-hidden": "true"
			}, this.#r.dir > 0 ? "▲" : "▼") : null);
		}));
	}
	#y(e) {
		if (e.trashed) {
			let t = U(e);
			return this.#S(e, "fm-row", i("span", { class: "fm-name" }, i("span", { class: "fm-icon" }, x(e)), this.#x(e)), i("span", {}, $(e.trashed.at)), i("span", { class: "num" }, Q(e)), i("span", {}, Y(e)), i("span", { title: `Ripristinando torna in ${t}` }, t));
		}
		let t = i("span", { class: "fm-name" }, i("span", { class: "fm-icon" }, x(e)), this.#x(e), F(e));
		if (this.inTag) {
			let n = H(e);
			return this.#S(e, "fm-row tagged", t, i("span", { title: n }, n), i("span", {}, Y(e)), G(e));
		}
		return this.#S(e, "fm-row", t, i("span", {}, $(e.modified)), i("span", { class: "num" }, Q(e)), i("span", {}, Y(e)), G(e));
	}
	#b(e) {
		let t = this.#S(e, "fm-tile", i("span", { class: "fm-tile-icon" }, x(e), F(e, "fm-tile-tags")), this.#x(e)), n = (e.tags ?? []).map((e) => f.get(e)?.name).filter(Boolean);
		return t.title = e.trashed ? `${e.name}\nEliminato: ${$(e.trashed.at)}\nPosizione originale: ${U(e)}` : `${e.name}${this.inTag ? `\nPosizione: ${H(e)}` : ""}\nWorkspace: ${W(e)}${n.length ? `\nTag: ${n.join(", ")}` : ""}`, t;
	}
	#x(e) {
		return this.#l === e.id ? i("input", {
			class: "fm-rename",
			type: "text",
			value: e.name,
			spellcheck: "false",
			"aria-label": "Nuovo nome"
		}) : i("span", {
			class: "fm-label",
			title: e.name
		}, e.name);
	}
	#S(e, t, ...n) {
		let r = this.#o.has(e.id), a = i("div", {
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
		return e.trashed ? a : T(a, e);
	}
	#C(e) {
		let { key: t, dir: n } = this.#r, i = (e) => t === "type" ? Y(e) : t === "workspace" ? W(e) : t === "size" ? e.type === "folder" ? e.trashed ? e.inside : r.children(e.id).length : e.size ?? 0 : t === "modified" ? e.modified : t === "deleted" ? e.trashed?.at ?? e.modified : t === "origin" && e.trashed ? U(e) : t === "location" ? H(e) : e.name, a = {
			folder: 0,
			file: 1,
			app: 1
		};
		return [...e].sort((e, t) => {
			if (a[e.type] !== a[t.type]) return a[e.type] - a[t.type];
			let r = i(e), o = i(t);
			return ((typeof r == "number" ? r - o : String(r).localeCompare(String(o), c.locale, { numeric: !0 })) || e.name.localeCompare(t.name, c.locale, { numeric: !0 })) * n;
		});
	}
	#w(e, t = e[e.length - 1] ?? this.#c) {
		this.#o = new Set(e), this.#c = t, this.render();
	}
	#T() {
		let { signal: e } = this.win, t = (e) => e.target.closest?.("[role=\"option\"]");
		this.list.addEventListener("pointerdown", (e) => {
			if (e.button !== 0 || e.target.closest(".fm-rename, .fm-head")) return;
			let n = t(e);
			if (!n) {
				e.ctrlKey || e.metaKey || e.shiftKey || this.#w([]);
				return;
			}
			let r = n.dataset.id, i = this.#a.map((e) => e.id), a = !1;
			if (e.shiftKey && this.#s && i.includes(this.#s)) {
				let [t, n] = [i.indexOf(this.#s), i.indexOf(r)].sort((e, t) => e - t), a = i.slice(t, n + 1);
				this.#w(e.ctrlKey || e.metaKey ? [.../* @__PURE__ */ new Set([...this.#o, ...a])] : a, r);
			} else if (e.ctrlKey || e.metaKey) {
				let e = new Set(this.#o);
				e.has(r) ? e.delete(r) : e.add(r), this.#s = r, this.#w([...e], r);
			} else this.#s = r, this.#o.has(r) ? a = this.#o.size > 1 : this.#w([r], r);
			!this.inTrash && this.#o.has(r) && y(e, {
				ids: [...this.#o],
				stack: this.history,
				onEnd: ({ moved: e }) => {
					!e && a && this.#w([r], r);
				}
			});
		}, { signal: e }), this.list.addEventListener("dblclick", (e) => {
			let n = t(e);
			if (!n || e.target.closest(".fm-rename")) return;
			if (this.inTrash) return this.openSelected();
			let i = r.get(n.dataset.id);
			i && this.open(i);
		}, { signal: e }), this.list.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			let n = t(e);
			if (!n) return this.#D(e);
			this.#o.has(n.dataset.id) || this.#w([n.dataset.id], n.dataset.id), this.#O(e);
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
			let t = this.#E(e.key);
			if (t == null || !this.#a.length) return;
			e.preventDefault();
			let n = this.#a.map((e) => e.id), r = n.indexOf(this.#c), i = t === -Infinity ? 0 : t === Infinity ? n.length - 1 : Math.max(0, Math.min(n.length - 1, (r < 0 ? 0 : r) + t)), a = n[i];
			if (e.shiftKey) {
				this.#s ||= this.#c ?? a;
				let [e, t] = [n.indexOf(this.#s), i].sort((e, t) => e - t);
				this.#w(n.slice(e, t + 1), a);
			} else this.#s = a, this.#w([a], a);
			this.list.querySelector(`#fm-${CSS.escape(a)}`)?.scrollIntoView({ block: "nearest" });
		}, { signal: e });
	}
	#E(e) {
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
	#D(e) {
		let t = {
			label: this.#n === "list" ? "Vista a icone" : "Vista elenco",
			icon: this.#n === "list" ? "grid" : "list",
			action: () => this.setView(this.#n === "list" ? "grid" : "list")
		};
		if (this.inTrash) {
			let n = !this.#a.length;
			return s(e.clientX, e.clientY, [
				{
					label: "Ripristina tutto",
					icon: "undo",
					disabled: n,
					action: () => this.restore(r.trashed().map((e) => e.id))
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
		if (this.inTag) return s(e.clientX, e.clientY, [
			{
				label: "Gestisci i tag…",
				icon: "gear",
				action: () => S("settings", { tab: "tags" })
			},
			"-",
			t
		]);
		s(e.clientX, e.clientY, [
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
	#O(e) {
		let t = this.#a.filter((e) => this.#o.has(e.id)), n = t.length > 1;
		if (this.inTrash) {
			let r = t.map((e) => e.id);
			return s(e.clientX, e.clientY, [
				{
					label: n ? `Ripristina ${t.length} elementi` : "Ripristina",
					icon: "undo",
					action: () => this.restore(r)
				},
				"-",
				{
					label: "Elimina definitivamente…",
					icon: "trash",
					shortcut: u.label("items.delete"),
					danger: !0,
					action: () => this.purge(r)
				}
			]);
		}
		let r = t.some((e) => e.system), i = t.map((e) => e.id), a = this.inTag;
		s(e.clientX, e.clientY, [
			{
				label: n ? `Apri ${t.length} elementi` : "Apri",
				icon: "open",
				shortcut: u.label("items.open"),
				action: () => this.openSelected()
			},
			!n && t[0].type === "file" && {
				label: "Apri con…",
				icon: "open",
				action: () => k(t[0], { choose: !0 })
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
				shortcut: u.label("items.rename"),
				disabled: n || r,
				action: () => this.rename(t[0].id)
			},
			I(i),
			a && {
				label: `Togli il tag «${a.name}»`,
				icon: "x",
				action: () => P(i, a.id, !1)
			},
			C(i),
			"-",
			{
				label: n ? `Elimina ${t.length} elementi` : "Elimina",
				icon: "trash",
				shortcut: u.label("items.delete"),
				danger: !0,
				disabled: r,
				action: () => this.remove(t.map((e) => e.id))
			}
		].filter(Boolean));
	}
	#k(e) {
		return e === R || !!V(e) || r.exists(e);
	}
	#A(e) {
		let t = this.list.querySelector(`[data-id="${CSS.escape(e)}"]`)?.getBoundingClientRect();
		return {
			x: t ? t.left + 40 : innerWidth / 2,
			y: t ? t.bottom : innerHeight / 2
		};
	}
	#j(e, t) {
		for (; e.length;) {
			let n = e.pop();
			if (this.#k(n)) {
				t.push(this.folder), this.go(n, !1);
				return;
			}
		}
	}
	#M(e) {
		this.#u = e, this.render();
	}
	#N(e) {
		let t = e.node && w.has(e.node.id);
		if (this.inTrash) return t ? this.render() : void 0;
		if (this.inTag) return this.render();
		if (e.type === "remove" && e.ids.includes(this.folder)) return this.go(e.parent && r.exists(e.parent) ? e.parent : r.root, !1);
		let n = e.parent === this.folder || e.from === this.folder, i = e.type !== "remove" && r.isInside(this.folder, e.node.id), a = [e.parent, e.from].some((e) => e && r.exists(e) && r.get(e).parent === this.folder);
		(n || i || a || t) && (n && e.type !== "rename" && (this.#u = ""), this.render());
	}
};
export { q as default };
