import { c as e, i as t, l as n, n as r, r as i, s as a, t as o } from "./i18n-BNs41huj.js";
import { Emitter as s, Window as c, actionButton as l, comboFromEvent as u, fs as d, h as f, host as p, icon as m, messageBox as h, notifications as g, openMenu as _, uid as v } from "/host/sdk.js";
import { launch as y, openFile as ee, pickFile as b } from "/host/system.js";
// src/shared/TabBar.js
var te = class extends s {
	#e;
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = [];
	#i = null;
	#a = null;
	#o;
	#s;
	constructor({ t: e, signal: t, label: n = "", newLabel: r = null, newButton: i = !0, reorder: a = !0, dragStart: o = null, className: s = "" } = {}) {
		super(), this.#e = e, this.#o = a, this.#s = o, this.list = f("div", {
			class: "sh-tabs",
			role: "tablist",
			"aria-label": n || null
		}), this.start = f("div", { class: "sh-tabbar-slot" }), this.end = f("div", { class: "sh-tabbar-slot end" });
		let c = r ?? e("shared.tabs.new");
		this.newButton = i ? f("button", {
			class: "sh-tabbar-btn sh-tab-new",
			type: "button",
			title: c,
			"aria-label": c,
			onclick: () => this.emit("new")
		}, m("plus")) : null, this.el = f("div", { class: ["sh-tabbar", s].filter(Boolean).join(" ") }, this.start, this.list, this.newButton, this.end), this.start.hidden = this.end.hidden = !0, this.list.addEventListener("pointerdown", (e) => this.#f(e), { signal: t }), this.list.addEventListener("auxclick", (e) => {
			let t = e.target.closest(".sh-tab");
			e.button === 1 && t && (e.preventDefault(), this.emit("close", t.dataset.key));
		}, { signal: t }), this.list.addEventListener("mousedown", (e) => {
			e.button === 1 && e.preventDefault();
		}, { signal: t }), this.el.addEventListener("dblclick", (e) => {
			(e.target === this.list || e.target === this.el) && this.emit("new");
		}, { signal: t }), this.list.addEventListener("contextmenu", (e) => {
			let t = e.target.closest(".sh-tab");
			t && (e.preventDefault(), this.emit("menu", {
				key: t.dataset.key,
				x: e.clientX,
				y: e.clientY
			}));
		}, { signal: t }), this.list.addEventListener("wheel", (e) => {
			!e.deltaY || Math.abs(e.deltaX) > Math.abs(e.deltaY) || (e.preventDefault(), this.list.scrollLeft += e.deltaY);
		}, {
			signal: t,
			passive: !1
		}), this.list.addEventListener("keydown", (e) => this.#d(e), { signal: t });
		let l = new ResizeObserver(() => this.#c());
		l.observe(this.list), t?.addEventListener("abort", () => l.disconnect());
	}
	render(e, t) {
		let n = e.map((e) => e.key);
		for (let [e, t] of this.#t) n.includes(e) || (t.remove(), this.#t.delete(e), this.#n.delete(e));
		for (let n of e) {
			let e = this.#t.get(n.key);
			e || (e = this.#l(n.key), this.#t.set(n.key, e)), this.#u(e, n, this.#n.get(n.key), n.key === t), this.#n.set(n.key, n);
		}
		n.join("\n") !== this.#r.join("\n") && (this.list.append(...n.map((e) => this.#t.get(e))), this.#r = n), t !== this.#i && (this.#i = t, this.#c());
	}
	setSlots({ start: e, end: t } = {}) {
		e !== void 0 && (this.start.replaceChildren(...[e ?? []].flat().filter(Boolean)), this.start.hidden = !this.start.childElementCount), t !== void 0 && (this.end.replaceChildren(...[t ?? []].flat().filter(Boolean)), this.end.hidden = !this.end.childElementCount);
	}
	focus() {
		this.#t.get(this.#i)?.focus({ preventScroll: !0 });
	}
	tabElement(e) {
		return this.#t.get(e) ?? null;
	}
	#c() {
		let e = this.#t.get(this.#i);
		if (!e) return;
		let { offsetLeft: t, offsetWidth: n } = e;
		t < this.list.scrollLeft ? this.list.scrollLeft = t : t + n > this.list.scrollLeft + this.list.clientWidth && (this.list.scrollLeft = t + n - this.list.clientWidth);
	}
	#l(e) {
		let t = f("button", {
			class: "sh-tab-close",
			type: "button",
			tabindex: "-1"
		}, m("x"));
		return t.addEventListener("click", (t) => {
			t.stopPropagation(), this.emit("close", e);
		}), t.addEventListener("pointerdown", (e) => e.stopPropagation()), f("div", {
			class: "sh-tab",
			role: "tab",
			dataset: { key: e }
		}, f("span", {
			class: "sh-tab-icon",
			hidden: !0
		}), f("span", { class: "sh-tab-name" }), f("span", {
			class: "sh-tab-detail",
			hidden: !0
		}), f("span", {
			class: "sh-tab-act",
			hidden: !0
		}), t);
	}
	#u(e, t, n, r) {
		e.className = [
			"sh-tab",
			r && "on",
			t.dirty && "dirty",
			t.class,
			e.classList.contains("dragging") && "dragging"
		].filter(Boolean).join(" "), e.setAttribute("aria-selected", String(r)), e.tabIndex = r ? 0 : -1, e.title = t.title ?? t.label;
		let [i, a, o, s, c] = e.children;
		t.icon !== n?.icon && (i.replaceChildren(...t.icon == null ? [] : [typeof t.icon == "string" ? m(t.icon) : t.icon]), i.hidden = t.icon == null), a.textContent !== t.label && (a.textContent = t.label), o.textContent = t.detail ?? "", o.hidden = !t.detail, s.hidden = !t.activity, s.title = typeof t.activity == "string" ? t.activity : "";
		let l = t.closeLabel ?? this.#e("shared.tabs.close", { name: t.label }), u = t.closeTitle ?? l;
		c.getAttribute("aria-label") !== l && c.setAttribute("aria-label", l), c.title !== u && (c.title = u);
	}
	#d(e) {
		let t = e.target.closest?.(".sh-tab");
		if (!t) return;
		let n = this.#r.indexOf(t.dataset.key), r = {
			ArrowLeft: n - 1,
			ArrowRight: n + 1,
			Home: 0,
			End: this.#r.length - 1
		}[e.key];
		if (r !== void 0) {
			e.preventDefault();
			let t = this.#r[Math.max(0, Math.min(this.#r.length - 1, r))];
			this.emit("select", t), this.#t.get(t)?.focus({ preventScroll: !0 });
		} else if (e.key === "Delete") e.preventDefault(), this.emit("close", t.dataset.key);
		else if (e.key === "ContextMenu" || e.key === "F10" && e.shiftKey) {
			e.preventDefault();
			let n = t.getBoundingClientRect();
			this.emit("menu", {
				key: t.dataset.key,
				x: n.left,
				y: n.bottom + 2
			});
		} else (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.emit("select", t.dataset.key));
	}
	#f(e) {
		let t = e.target.closest(".sh-tab");
		if (!t || e.button !== 0) return;
		let n = t.dataset.key;
		if (this.emit("select", n), this.#s) return this.#s(e, n);
		if (!this.#o) return;
		this.#a = {
			key: n,
			el: t,
			startX: e.clientX,
			moved: !1,
			index: this.#r.indexOf(n)
		};
		let r = (t) => {
			t.pointerId === e.pointerId && this.#p(t);
		}, i = (t) => {
			t.pointerId === e.pointerId && (removeEventListener("pointermove", r), removeEventListener("pointerup", i), removeEventListener("pointercancel", i), this.#m());
		};
		addEventListener("pointermove", r), addEventListener("pointerup", i), addEventListener("pointercancel", i);
	}
	#p(e) {
		let t = this.#a;
		if (!t || !t.moved && Math.abs(e.clientX - t.startX) < 5) return;
		t.moved = !0, t.el.classList.add("dragging");
		let n = this.#r.filter((e) => e !== t.key).map((e) => this.#t.get(e)), r = n.findIndex((t) => {
			let n = t.getBoundingClientRect();
			return e.clientX < n.left + n.width / 2;
		});
		r === -1 && (r = n.length), r !== t.index && (t.index = r, this.list.insertBefore(t.el, n[r] ?? null));
		let i = this.list.getBoundingClientRect();
		e.clientX < i.left + 16 ? this.list.scrollLeft -= 8 : e.clientX > i.right - 16 && (this.list.scrollLeft += 8);
	}
	#m() {
		let e = this.#a;
		this.#a = null, e?.moved && (e.el.classList.remove("dragging"), this.list.append(...this.#r.map((e) => this.#t.get(e))), e.index !== this.#r.indexOf(e.key) && this.emit("move", {
			key: e.key,
			index: e.index
		}));
	}
}, ne = class extends s {
	#e = {
		matchCase: !1,
		wholeWord: !1,
		regex: !1
	};
	#t;
	#n;
	constructor({ t: e, signal: t, replace: n = !0, options: r = !0, floating: i = !1, className: a = "" } = {}) {
		super(), this.#t = e, this.#n = n;
		let o = `sh-find-status-${v()}`;
		this.findInput = f("input", {
			class: "ctl-text sh-find-input",
			type: "text",
			spellcheck: "false",
			autocomplete: "off",
			placeholder: e("shared.find.find"),
			"aria-label": e("shared.find.find"),
			"aria-describedby": o
		}), this.status = f("span", {
			class: "sh-find-status",
			id: o,
			role: "status",
			"aria-live": "polite"
		});
		let s = (e, t, n) => f("button", {
			class: "sh-find-btn",
			type: "button",
			title: t,
			"aria-label": t,
			onclick: n
		}, m(e)), c = (e, t, n) => {
			let r = f("button", {
				class: "sh-find-opt",
				type: "button",
				title: n,
				"aria-label": n,
				"aria-pressed": "false",
				onclick: () => {
					this.#e[e] = !this.#e[e], r.setAttribute("aria-pressed", String(this.#e[e])), this.emit("query");
				}
			}, t);
			return r;
		};
		n ? (this.replaceInput = f("input", {
			class: "ctl-text sh-find-input",
			type: "text",
			spellcheck: "false",
			autocomplete: "off",
			placeholder: e("shared.find.replaceWith"),
			"aria-label": e("shared.find.replaceWith")
		}), this.toggle = f("button", {
			class: "sh-find-btn sh-find-toggle",
			type: "button",
			title: e("shared.find.toggleReplace"),
			"aria-label": e("shared.find.toggleReplace"),
			"aria-expanded": "false",
			onclick: () => {
				this.#r(this.replaceRow.hidden), (this.replaceRow.hidden ? this.findInput : this.replaceInput).focus();
			}
		}, m("arrowRight")), this.replaceRow = f("div", {
			class: "sh-find-row",
			hidden: !0
		}, f("span", { class: "sh-find-indent" }), this.replaceInput, l({
			label: e("shared.find.replace"),
			onClick: () => this.emit("replace")
		}), l({
			label: e("shared.find.replaceAll"),
			onClick: () => this.emit("replaceAll")
		})), this.replaceInput.addEventListener("keydown", (e) => {
			e.key !== "Enter" || e.shiftKey || e.metaKey || (e.preventDefault(), e.ctrlKey && e.altKey ? this.emit("replaceAll") : !e.ctrlKey && !e.altKey && this.emit("replace"));
		}, { signal: t })) : this.replaceInput = this.toggle = this.replaceRow = null, this.el = f("div", {
			class: [
				"sh-find",
				i && "floating",
				a
			].filter(Boolean).join(" "),
			role: "search",
			"aria-label": e(n ? "shared.find.labelReplace" : "shared.find.label"),
			hidden: !0
		}, f("div", { class: "sh-find-row" }, this.toggle, this.findInput, r ? [
			c("matchCase", e("shared.find.matchCase.short"), e("shared.find.matchCase")),
			c("wholeWord", e("shared.find.wholeWord.short"), e("shared.find.wholeWord")),
			c("regex", e("shared.find.regex.short"), e("shared.find.regex"))
		] : null, this.status, s("arrowUp", e("shared.find.previous"), () => this.emit("previous")), s("arrowDown", e("shared.find.next"), () => this.emit("next")), s("x", e("shared.find.close"), () => this.emit("close"))), this.replaceRow), this.findInput.addEventListener("input", () => this.emit("query"), { signal: t }), this.findInput.addEventListener("keydown", (e) => {
			e.key !== "Enter" || e.ctrlKey || e.altKey || e.metaKey || (e.preventDefault(), this.emit(e.shiftKey ? "previous" : "next"));
		}, { signal: t }), this.el.addEventListener("keydown", (e) => {
			e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), this.emit("close"));
		}, { signal: t });
	}
	get isOpen() {
		return !this.el.hidden;
	}
	get query() {
		return {
			find: this.findInput.value,
			replace: this.replaceInput?.value ?? "",
			...this.#e
		};
	}
	open({ replace: e = !1, text: t = null } = {}) {
		let n = this.isOpen;
		this.el.hidden = !1, this.#n && (e ? this.#r(!0) : n || this.#r(!1)), t != null && (this.findInput.value = t);
		let r = e && this.#n && this.findInput.value ? this.replaceInput : this.findInput;
		r.focus(), r.select(), this.emit("query");
	}
	close() {
		this.el.hidden = !0, this.setStatus("");
	}
	focus() {
		this.findInput.focus();
	}
	setStatus(e, { error: t = !1 } = {}) {
		this.status.textContent !== e && (this.status.textContent = e), this.status.classList.toggle("error", t), t ? this.findInput.setAttribute("aria-invalid", "true") : this.findInput.removeAttribute("aria-invalid");
	}
	results({ total: e = 0, index: t = -1, more: n = !1, error: r = null } = {}) {
		let i = this.#t;
		if (r) return this.setStatus(i("shared.find.badRegex", { error: r }), { error: !0 });
		if (!this.findInput.value) return this.setStatus("");
		if (!e) return this.setStatus(i("shared.find.none"));
		let a = `${e}${n ? "+" : ""}`;
		this.setStatus(t >= 0 ? i("shared.find.count", {
			index: t + 1,
			total: a
		}) : i("shared.find.total", {
			n: e,
			total: a
		}));
	}
	#r(e) {
		this.replaceRow.hidden = !e, this.toggle.setAttribute("aria-expanded", String(e)), this.toggle.replaceChildren(m(e ? "arrowDown" : "arrowRight"));
	}
}, re = 40, ie = 24, x = /* @__PURE__ */ new Set(), S = 0, C = null, w = 0, T = !0, E = [
	"resize",
	"scroll",
	"wheel",
	"pointerdown",
	"pointerup",
	"keydown",
	"transitionend",
	"animationend",
	"focusin"
];
function D(e = !0) {
	e === !0 && (T = !0), S ||= requestAnimationFrame(() => {
		S = 0;
		let e = T;
		T = !1;
		for (let t of x) t.check(e);
	});
}
var O = () => D();
function ae() {
	if (!C) {
		C = new MutationObserver(() => D()), C.observe(document.body, {
			subtree: !0,
			childList: !0,
			attributes: !0,
			attributeFilter: [
				"style",
				"class",
				"hidden",
				"open"
			]
		});
		for (let e of E) addEventListener(e, O, {
			capture: !0,
			passive: !0
		});
		w = setInterval(() => D(!1), 250);
	}
}
function oe() {
	if (C && !x.size) {
		C.disconnect(), C = null;
		for (let e of E) removeEventListener(e, O, { capture: !0 });
		clearInterval(w), cancelAnimationFrame(S), S = 0;
	}
}
var se = class {
	page = null;
	hold = !1;
	#e;
	#t;
	#n;
	#r = !1;
	#i = "";
	#a = "";
	#o = !1;
	#s = 0;
	#c = Promise.resolve();
	constructor(e, { win: t = null } = {}) {
		this.#e = e, this.#t = t, this.#n = f("img", {
			class: "nw-picture",
			alt: "",
			draggable: "false",
			hidden: !0
		}), e.prepend(this.#n), x.add(this), ae();
	}
	attach(e) {
		if (e === this.page) return;
		let t = this.page;
		this.page = e, this.#n.hidden = !0, this.#n.removeAttribute("src"), t && this.#r && this.#p(() => t.place(null)), this.#r = !1, this.#i = "", this.#s = 0, this.refresh();
	}
	refresh() {
		this.#a = "", D();
	}
	check(e = !0) {
		let t = this.page;
		if (!t || t.closed) return;
		let n = this.#e, r = n.getBoundingClientRect();
		if (this.hold || !n.isConnected || r.width < 4 || r.height < 4 || n.closest("[hidden]")) return this.#o = !1, this.#u(t, !1);
		let i = n.offsetWidth ? r.width / n.offsetWidth : 1, a = this.#t && !this.#t.el.classList.contains("max") ? 4 * i : 0, o = {
			x: r.left + a,
			y: r.top,
			width: Math.max(1, r.width - 2 * a),
			height: Math.max(1, r.height - a)
		}, s = `${Math.round(r.left)},${Math.round(r.top)},${Math.round(r.width)},${Math.round(r.height)},${i.toFixed(3)}`;
		if (!e && s === this.#a) return this.#o && this.#l(t);
		if (this.#a = s, this.#o = this.#d(r), this.#o) return this.#r ? this.#u(t, !0) : this.#l(t);
		this.#r && s === this.#i || (this.#r = !0, this.#i = s, this.#p(() => t.place(o, i)));
	}
	#l(e) {
		Date.now() - this.#s < 1e3 || (this.#s = Date.now(), this.#p(async () => {
			let t = await e.cover();
			t && this.page === e && !this.#r && (this.#n.src = t, this.#n.hidden = !1);
		}));
	}
	#u(e, t) {
		this.#r && (this.#r = !1, this.#i = "", t ? (this.#s = Date.now(), this.#p(async () => {
			let t = await e.cover();
			t && this.page === e && !this.#r && (this.#n.src = t, this.#n.hidden = !1);
		})) : this.#p(() => e.place(null)));
	}
	#d(e) {
		let t = this.#e, n = Math.max(e.left + 2, 0), r = Math.min(e.right - 2, innerWidth - 1), i = Math.max(e.top + 2, 0), a = Math.min(e.bottom - 2, innerHeight - 1);
		if (r <= n || a <= i) return !1;
		let o = Math.max(1, Math.ceil((r - n) / re)), s = Math.max(1, Math.ceil((a - i) / ie));
		for (let e = 0; e <= s; e++) {
			let c = i + (a - i) * e / s;
			for (let e = 0; e <= o; e++) {
				let i = document.elementFromPoint(n + (r - n) * e / o, c);
				if (i && !t.contains(i) && !this.#f(i)) return !0;
			}
		}
		return !1;
	}
	#f(e) {
		let t = e.closest(".win-edges");
		return !!t && !!this.#t?.el.contains(t);
	}
	#p(e) {
		return this.#c = this.#c.then(e).catch(() => {}), this.#c;
	}
	dispose() {
		x.delete(this), oe(), this.page = null;
	}
}, ce = "netwave-session", k = "nwsession", A = "Sessioni NetWave", le = 2 << 20, ue = 500, de = /^(https?:\/\/|about:blank$)/i, j = (e, t) => typeof e == "string" ? e.slice(0, t) : "";
function fe(e) {
	let t;
	try {
		t = JSON.parse(String(e).slice(0, le));
	} catch {
		t = null;
	}
	if (!t || typeof t != "object" || t.format !== "netwave-session" || t.version !== 1 || !Array.isArray(t.tabs)) throw Error(r("session.invalid"));
	let n = t.tabs.slice(0, ue).filter((e) => e && typeof e.url == "string" && de.test(e.url)).map((e) => ({
		url: e.url.slice(0, 4e3),
		title: j(e.title, 300),
		...e.pinned === !0 && { pinned: !0 }
	})), i = Number.isInteger(t.active) && t.active >= 0 && t.active < n.length ? t.active : 0;
	return {
		id: /^[A-Za-z0-9_-]{4,40}$/.test(t.id ?? "") ? t.id : v(),
		name: j(t.name, 120).trim(),
		savedAt: j(t.savedAt, 40),
		autosave: t.autosave === !0,
		active: i,
		tabs: n
	};
}
var M = (e) => `${JSON.stringify({
	format: ce,
	version: 1,
	id: e.id,
	name: e.name,
	savedAt: (/* @__PURE__ */ new Date()).toISOString(),
	autosave: !!e.autosave,
	active: e.active ?? 0,
	tabs: e.tabs
}, null, 2)}\n`, N = (e) => e?.name?.replace(/\.nwsession$/i, "") ?? "";
function pe() {
	let e = d.resolve("~/Documenti");
	return e?.type === "folder" ? d.children(e.id).find((e) => e.type === "folder" && e.name.toLowerCase() === A.toLowerCase()) ?? d.create(e.id, {
		type: "folder",
		name: A
	}) : null;
}
async function P(e) {
	let t = d.get(e);
	if (t?.type !== "file") throw Error(r("session.missing"));
	let n = fe(await d.read(e));
	return {
		...n,
		name: n.name || N(t)
	};
}
async function me(e, t) {
	let n = d.cleanName(t.name, { portable: !0 }) || r("session.untitled"), i = d.create(e, {
		type: "file",
		name: d.uniqueName(e, `${n}.${k}`)
	});
	return await d.write(i.id, M(t)), i;
}
async function he(e, t) {
	if (!d.exists(e)) throw Error(r("session.missing"));
	await d.write(e, M(t));
}
// src/netwave/pages.js
var F = (e) => {
	try {
		return new URL(e).host;
	} catch {
		return e;
	}
}, I = (e) => o.date(e, {
	day: "numeric",
	month: "short",
	hour: "2-digit",
	minute: "2-digit"
});
function ge(e) {
	let t = f("input", {
		class: "nw-start-input",
		type: "text",
		spellcheck: "false",
		autocomplete: "off",
		"aria-label": r("address.placeholder"),
		placeholder: r("address.placeholder")
	}), n = f("form", {
		class: "nw-start-search",
		onsubmit: (n) => {
			n.preventDefault(), e.go(t.value);
		}
	}, m("search"), t), a = [f("div", { class: "nw-start-logo" }, m(e.private ? "eyeOff" : "globe")), f("h2", {}, e.private ? r("private.title") : r("start.title"))];
	if (e.private && a.push(f("p", { class: "nw-start-note" }, r("private.text"))), a.push(n), e.engine === !1 && a.push(f("p", { class: "nw-start-warn" }, m("warning"), r("engine.missingShort"))), !e.private) {
		let t = i.frequent(8);
		t.length && a.push(f("div", { class: "nw-start-tiles" }, ...t.map((t) => f("button", {
			type: "button",
			class: "nw-tile",
			title: t.url,
			onclick: () => e.go(t.url)
		}, f("span", { class: "nw-tile-letter" }, (F(t.url).replace(/^www\./, "")[0] ?? "?").toUpperCase()), f("span", { class: "nw-tile-name" }, t.title || F(t.url))))));
		let n = i.sessions().slice(0, 4), o = i.closed().filter((e) => e.kind === "window").slice(0, 3);
		if (n.length || o.length) {
			let t = [...n.map((t) => f("button", {
				type: "button",
				class: "nw-start-row",
				onclick: () => L(e, t)
			}, m("workarea"), f("span", { class: "nw-start-row-name" }, t.name), f("span", { class: "nw-start-row-meta" }, r("start.sessionMeta", {
				n: t.tabs.length,
				when: I(t.at)
			})))), ...o.map((t) => f("button", {
				type: "button",
				class: "nw-start-row",
				onclick: () => e.reopenClosed(t.id)
			}, m("window"), f("span", { class: "nw-start-row-name" }, r("start.closedWindow")), f("span", { class: "nw-start-row-meta" }, r("start.sessionMeta", {
				n: t.tabs.length,
				when: I(t.at)
			}))))];
			a.push(f("div", { class: "nw-start-list" }, f("h3", {}, r("start.recent")), ...t));
		}
	}
	return f("div", { class: "nw-start" }, ...a);
}
function L(e, t) {
	return t.file && d.exists(t.file) ? e.openSessionFile(t.file) : e.openSnapshot(t);
}
var _e = [
	[(e) => e === "signedOut", "signedOut"],
	[(e) => e === "engine", "engine"],
	[(e) => e === "gone", "gone"],
	[(e) => e === "blocked" || e === -20 || e === -301, "blocked"],
	[(e) => e === "scheme", "scheme"],
	[(e) => e === -105 || e === -137, "notFound"],
	[(e) => e === -106, "offline"],
	[(e) => e === -102 || e === -109 || e === -104, "refused"],
	[(e) => e === -7 || e === -118, "timeout"],
	[(e) => typeof e == "number" && e <= -200 && e > -300, "certificate"],
	[(e) => e === -310, "redirects"]
];
function R(e, t, n = null) {
	if (n === "engine") return f("div", { class: "nw-problem" }, f("div", { class: "nw-problem-icon" }, m("monitor")), f("h2", {}, r("engine.missingTitle")), f("p", {}, r("engine.missingText")), f("p", { class: "nw-problem-url" }, t.url), f("div", { class: "nw-problem-actions" }, f("button", {
		type: "button",
		class: "ctl-btn primary",
		disabled: !/^https?:\/\//i.test(t.url),
		onclick: () => {
			/^https?:\/\//i.test(t.url) && window.open(t.url, "_blank", "noopener,noreferrer");
		}
	}, m("open"), r("engine.openOutside"))));
	let i = t.error?.code, a = _e.find(([e]) => e(i))?.[1] ?? "generic", o = a === "certificate" || a === "blocked" || a === "scheme";
	return f("div", { class: "nw-problem" }, f("div", { class: "nw-problem-icon" }, m(o ? "shield" : "warning")), f("h2", {}, r(`error.${a}.title`)), f("p", {}, r(`error.${a}.text`, {
		host: F(t.error?.url || t.url),
		scheme: t.error?.description ?? ""
	})), f("p", { class: "nw-problem-url" }, t.error?.url || t.url), a !== "scheme" && (typeof i == "number" || t.error?.description) ? f("p", { class: "nw-problem-code" }, [t.error?.description, typeof i == "number" ? `(${i})` : ""].filter(Boolean).join(" ")) : null, f("div", { class: "nw-problem-actions" }, ...t.canBack ? [f("button", {
		type: "button",
		class: "ctl-btn",
		onclick: () => {
			t.error = null, e.run("back");
		}
	}, m("arrowLeft"), r("nav.back"))] : [], ...o ? [] : [f("button", {
		type: "button",
		class: "ctl-btn primary",
		onclick: () => e.run("reload")
	}, m("restart"), r("error.retry"))]));
}
// src/netwave/downloads.js
var ve = 30, z = 150;
function ye(e) {
	let t = d.cleanName(e) || "download";
	if (t.length <= z) return t;
	let n = t.lastIndexOf("."), r = n > 0 && t.length - n <= 12 ? t.slice(n) : "";
	return t.slice(0, z - r.length) + r;
}
var B = new class extends s {
	#e = [];
	#t = !1;
	#n = Promise.resolve();
	get busy() {
		return this.#e.some((e) => e.state === "progressing" || e.state === "saving");
	}
	get unseen() {
		return this.#t;
	}
	seen() {
		this.#t && (this.#t = !1, this.emit("change"));
	}
	list() {
		return this.#e.map((e) => ({ ...e }));
	}
	update(e, t) {
		let n = this.#e.find((e) => e.id === t.downloadId);
		if (n || (n = {
			id: t.downloadId,
			page: e,
			name: t.name || "download",
			state: "progressing",
			received: 0,
			total: 0,
			node: null
		}, this.#e.unshift(n), this.#e.length = Math.min(this.#e.length, ve)), n.state === "progressing") {
			if (n.received = t.received, n.total = t.total, t.state === "completed") n.state = "saving", this.#n = this.#n.then(() => this.#r(n));
			else if (t.state === "cancelled") {
				n.state = "cancelled";
				let e = t.reason === "tooBig" ? "download.tooBig" : t.reason === "busy" ? "download.busy" : "download.stopped";
				g.send({
					text: r(e, { name: n.name }),
					level: "warning"
				});
			} else t.state === "interrupted" && (n.state = "failed", g.send({
				text: r("download.failedText", { name: n.name }),
				level: "error"
			}));
			this.emit("change");
		}
	}
	async #r(e) {
		try {
			let t = await e.page.download.read(e.id), n = d.resolve("~/Download") ?? d.get(d.root), i = d.uniqueName(n.id, ye(e.name)), a = d.create(n.id, {
				type: "file",
				name: i
			});
			await d.write(a.id, t instanceof Blob ? t : new Blob([t])), Object.assign(e, {
				node: a.id,
				name: i,
				state: "saved"
			}), this.#t = !0, g.send({
				text: r("download.done", {
					name: i,
					path: d.tildePath(n.id)
				}),
				level: "success"
			});
		} catch (t) {
			e.state = "failed", g.send({
				text: r("download.failedText", { name: e.name }) + (t?.message ? ` (${t.message})` : ""),
				level: "error"
			});
		} finally {
			e.page.download.done(e.id).catch(() => {}), this.emit("change");
		}
	}
	cancel(e) {
		let t = this.#e.find((t) => t.id === e);
		t && t.state === "progressing" && (t.state = "cancelled", t.page.download.cancel(e).catch(() => {}), this.emit("change"));
	}
}(), V = {
	"Ctrl+T": "newTab",
	"Ctrl+W": "closeTab",
	"Ctrl+F4": "closeTab",
	"Ctrl+Shift+T": "reopenTab",
	"Ctrl+N": "newWindow",
	"Ctrl+Shift+N": "newPrivate",
	"Ctrl+L": "focusAddress",
	"Alt+D": "focusAddress",
	F6: "focusAddress",
	F5: "reload",
	"Ctrl+R": "reload",
	"Ctrl+Shift+R": "hardReload",
	"Ctrl+F5": "hardReload",
	"Alt+ArrowLeft": "back",
	"Alt+ArrowRight": "forward",
	"Alt+Home": "home",
	"Ctrl+Tab": "nextTab",
	"Ctrl+Shift+Tab": "prevTab",
	"Ctrl+PageDown": "nextTab",
	"Ctrl+PageUp": "prevTab",
	"Ctrl+1": "tab1",
	"Ctrl+2": "tab2",
	"Ctrl+3": "tab3",
	"Ctrl+4": "tab4",
	"Ctrl+5": "tab5",
	"Ctrl+6": "tab6",
	"Ctrl+7": "tab7",
	"Ctrl+8": "tab8",
	"Ctrl+9": "lastTab",
	"Ctrl+H": "history",
	"Ctrl+J": "downloads",
	"Ctrl+S": "save",
	"Ctrl+Shift+S": "saveAs",
	"Ctrl+O": "openSession",
	"Ctrl+F": "find",
	F3: "findNext",
	"Ctrl+Equal": "zoomIn",
	"Ctrl+Plus": "zoomIn",
	"Ctrl+Minus": "zoomOut",
	"Ctrl+0": "zoomReset"
}, H = [
	.5,
	.67,
	.75,
	.8,
	.9,
	1,
	1.1,
	1.25,
	1.5,
	1.75,
	2,
	2.5,
	3
], U = /* @__PURE__ */ new Set(), W = null, be = null, xe = () => be ??= p.web?.available?.() ?? Promise.resolve(!1), G = (e) => !e || e === "about:blank", K = (e) => {
	try {
		return new URL(e).origin;
	} catch {
		return "";
	}
}, q = (e) => {
	try {
		return new URL(e).host;
	} catch {
		return e;
	}
}, Se = () => Array.from(crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(12)), (e) => (e % 36).toString(36)).join(""), J = (e) => e.title || (G(e.url) ? r("tabs.newTab") : q(e.url)), Y = (e) => String(e ?? "").split("#")[0], X = (e, t) => String(e ?? "").replace(/[\u0000-\u001f\u007f-\u009f‎‏‪-‮⁦-⁩]/g, " ").replace(/\s+/g, " ").trim().slice(0, t), Ce = {
	video: "camera",
	audio: "microphone"
}, Z = (e) => {
	if (e.permission !== "media") return [e.permission];
	let t = [...new Set((e.media ?? []).map((e) => Ce[e]).filter(Boolean))];
	return t.length ? t : ["camera", "microphone"];
}, we = 2e4, Te = 20, Ee = () => W && U.has(W) && !W.private ? W : [...U].reverse().find((e) => !e.private) ?? null;
function De(e, t) {
	return new Q(e ?? {}, t).win;
}
var Q = class o {
	tabs = [];
	active = null;
	session = null;
	engine = null;
	#e = 0;
	#t = !1;
	constructor(t, n) {
		this.openWindow = n, this.private = t.private === !0, this.privateKey = this.private ? Se() : null;
		let a = this.private && t.ended === !0;
		this.key = `netwave:${v()}`;
		let o = t.size, s = this.win = new c({
			title: r("app.name"),
			icon: "globe",
			width: o?.w ?? 1100,
			height: o?.h ?? 720,
			minWidth: 460,
			minHeight: 280
		});
		s.netwave = this, s.el.classList.add("nw-window"), s.el.classList.toggle("nw-private", this.private);
		let { signal: l } = s;
		U.add(this), W = this, this.bar = new te({
			t: r,
			signal: l,
			label: r("tabs.label"),
			newLabel: r("tabs.newKeys")
		}), this.bar.on("select", (e) => this.select(this.#i(e))), this.bar.on("close", (e) => this.closeTab(this.#i(e))), this.bar.on("new", () => this.newTab()), this.bar.on("move", ({ key: e, index: t }) => this.#o(this.#i(e), t)), this.bar.on("menu", ({ key: e, x: t, y: n }) => this.#D(this.#i(e), t, n)), this.private && this.bar.setSlots({ end: f("span", {
			class: "nw-privtag",
			title: r("private.text")
		}, m("eyeOff"), r("private.tag")) });
		let u = (e, t, n, r = "") => f("button", {
			type: "button",
			class: `nw-tbtn ${r}`.trim(),
			title: t,
			"aria-label": t,
			onclick: n
		}, m(e));
		this.backBtn = u("arrowLeft", r("nav.back"), () => this.run("back"), "nw-dir"), this.forwardBtn = u("arrowRight", r("nav.forward"), () => this.run("forward"), "nw-dir"), this.reloadBtn = u("restart", r("nav.reload"), () => this.active?.loading ? this.active.page?.stop() : this.run("reload")), this.homeBtn = u("home", r("nav.home"), () => this.run("home")), this.address = f("input", {
			class: "nw-address-input",
			type: "text",
			spellcheck: "false",
			autocomplete: "off",
			"aria-label": r("address.label"),
			placeholder: r("address.placeholder")
		}), this.lock = f("span", {
			class: "nw-lock",
			"aria-hidden": "true"
		}), this.zoomChip = f("button", {
			type: "button",
			class: "nw-zoomchip",
			hidden: !0,
			title: r("zoom.reset"),
			onclick: () => this.run("zoomReset")
		}), this.engineChip = f("button", {
			type: "button",
			class: "nw-engine",
			onclick: (e) => this.#k(e.currentTarget)
		}, m("shield"), f("span")), this.addressBox = f("form", {
			class: "nw-address",
			onsubmit: (e) => {
				e.preventDefault(), this.go(this.address.value);
			}
		}, this.lock, this.address, this.zoomChip, this.engineChip), this.sessionChip = f("button", {
			type: "button",
			class: "nw-session",
			onclick: (e) => this.#A(e.currentTarget)
		}), this.historyBtn = u("clock", r("history.open"), () => this.run("history")), this.downloadBtn = u("download", r("download.open"), (e) => this.#M(e.currentTarget), "nw-dl"), this.menuBtn = u("list", r("menu.open"), (e) => this.#j(e.currentTarget)), this.toolbar = f("div", {
			class: "nw-toolbar",
			role: "toolbar",
			"aria-label": r("nav.label")
		}, this.backBtn, this.forwardBtn, this.reloadBtn, this.homeBtn, this.addressBox, this.sessionChip, f("span", { class: "nw-sep" }), this.historyBtn, this.downloadBtn, this.menuBtn), this.address.addEventListener("focus", () => {
			this.#t = !0, this.address.select();
		}, { signal: l }), this.address.addEventListener("blur", () => {
			this.#t = !1, this.#N();
		}, { signal: l }), this.address.addEventListener("keydown", (e) => {
			e.key === "Escape" && (this.#t = !1, this.#N(), this.address.blur(), this.active?.page?.focus());
		}, { signal: l }), this.find = new ne({
			t: r,
			signal: l,
			replace: !1,
			options: !1,
			className: "nw-find"
		}), this.find.el.hidden = !0;
		let d = "";
		this.find.on("query", () => {
			let e = this.find.query.find;
			e ? (this.active?.page?.find(e, {
				forward: !0,
				next: !1
			}), d = e) : (this.active?.page?.stopFind(), this.find.setStatus(""), d = "");
		}), this.find.on("next", () => d && this.active?.page?.find(d, {
			forward: !0,
			next: !0
		})), this.find.on("previous", () => d && this.active?.page?.find(d, {
			forward: !1,
			next: !0
		})), this.find.on("close", () => this.#m()), this.askBar = f("div", {
			class: "nw-ask",
			role: "alertdialog",
			hidden: !0
		}), this.overlay = f("div", {
			class: "nw-overlay",
			hidden: !0
		}), this.slot = f("div", {
			class: "nw-slot",
			tabindex: "-1"
		}, this.overlay), this.live = new se(this.slot, { win: s }), s.body.append(f("div", { class: "nw-root" }, f("div", { class: "nw-tabs" }, this.bar.el), this.toolbar, this.find.el, this.askBar, this.slot)), s.el.addEventListener("keydown", (e) => this.#d(e), {
			capture: !0,
			signal: l
		}), s.el.addEventListener("focusin", () => {
			W = this;
		}, { signal: l }), s.getState = () => this.state(), s.canClose = () => this.#x(), s.on("dismiss", () => this.#S()), s.on("destroy", () => this.#C()), s.on("launch", (e) => this.launched(e));
		let p = [
			e.on("grants", () => this.#w()),
			i.on("change", () => {
				G(this.active?.url) && this.#I();
			}),
			B.on("change", () => this.#L())
		];
		l.addEventListener("abort", () => p.forEach((e) => e())), xe().then((e) => {
			this.engine = e, this.engineChip.lastChild.textContent = r(e ? "engine.native" : "engine.none"), this.engineChip.classList.toggle("off", !e), this.#c(this.active), this.draw();
		}), this.#n(a ? {} : t), a && setTimeout(() => this.win.emit("close"), 0);
	}
	#n(n) {
		if (Array.isArray(n.tabs) && n.tabs.length) {
			for (let e of t(n.tabs)) this.tabs.push(this.#r(e));
			if (n.session?.id && !this.private) {
				let e = n.session;
				this.session = {
					id: e.id,
					name: String(e.name ?? ""),
					file: e.file && d.exists(e.file) ? e.file : null,
					autosave: !!e.autosave,
					sig: typeof e.sig == "string" ? e.sig : ""
				};
			}
			this.select(this.tabs[Math.min(Math.max(0, n.active | 0), this.tabs.length - 1)]);
			return;
		}
		if (typeof n.file == "string") {
			this.select(this.#a(this.#r({}))), this.openSessionFile(n.file, { here: !0 });
			return;
		}
		let r = typeof n.url == "string" ? a(n.url) : e.get("home") || "";
		this.select(this.#a(this.#r({ url: r })));
	}
	launched(e) {
		return typeof e?.file == "string" ? this.openSessionFile(e.file) : typeof e?.url == "string" ? this.newTab(e.url) : null;
	}
	#r({ url: e = "", title: t = "", pinned: n = !1 } = {}) {
		return {
			key: v(),
			url: e || "",
			title: t || "",
			pinned: !!n,
			icon: null,
			page: null,
			opening: null,
			loading: !1,
			canBack: !1,
			canForward: !1,
			error: null,
			audible: !1,
			muted: !1,
			zoom: 1,
			asks: [],
			found: null
		};
	}
	#i(e) {
		return this.tabs.find((t) => t.key === e) ?? null;
	}
	#a(e, t = null) {
		let n = t ? this.tabs.indexOf(t) + 1 : this.tabs.length, r = this.tabs.filter((e) => e.pinned).length;
		return !e.pinned && n < r && (n = r), this.tabs.splice(n, 0, e), this.#y(), e;
	}
	newTab(t = null, { after: n = null, select: r = !0 } = {}) {
		let i = t ? a(t) : e.get("home") || "", o = this.#a(this.#r({ url: i }), n);
		return r ? (this.select(o), i || setTimeout(() => this.overlay.querySelector("input")?.focus(), 0)) : this.draw(), o;
	}
	select(e) {
		e && (this.active = e, this.#c(e), this.find.el.hidden || this.#m(), this.draw());
	}
	closeTab(e = this.active, { record: t = !0 } = {}) {
		if (!e) return;
		let n = this.tabs.indexOf(e);
		n < 0 || (t && !this.private && !G(e.url) && i.addClosed("tab", [e], this.#g()), this.tabs.splice(n, 1), e.page?.close(), e.page = null, this.tabs.length ? (this.active === e && this.select(this.tabs[Math.min(n, this.tabs.length - 1)]), this.#y(), this.draw()) : (this.tabs.push(this.#r({})), this.select(this.tabs[0]), this.win.emit("close")));
	}
	#o(e, t) {
		if (!e) return;
		let n = this.tabs.filter((t) => t.pinned && t !== e).length, r = e.pinned ? Math.min(t, n) : Math.max(t, n);
		this.tabs.splice(this.tabs.indexOf(e), 1), this.tabs.splice(Math.min(r, this.tabs.length), 0, e), this.#y(), this.draw();
	}
	#s(e, t) {
		e.pinned = t, this.tabs.splice(this.tabs.indexOf(e), 1);
		let n = this.tabs.filter((e) => e.pinned).length;
		this.tabs.splice(n, 0, e), this.#y(), this.draw();
	}
	detach(e) {
		!e || this.tabs.length < 2 || this.newWindow({
			tabs: t([e]),
			active: 0,
			...this.private && { private: !0 }
		}) && this.closeTab(e, { record: !1 });
	}
	async #c(t) {
		!t || t.page || t.opening || !this.engine || G(t.url) || t.error?.code === "gone" || (t.opening = (async () => {
			try {
				let n = await p.web.open({
					private: this.privateKey ?? void 0,
					keys: Object.keys(V)
				});
				if (!this.tabs.includes(t)) {
					n.close();
					return;
				}
				t.page = n, this.#l(t, n), this.private || n.grants(e.grants()), t.zoom !== 1 && n.zoom(t.zoom), await n.navigate(t.url);
			} catch (e) {
				t.error = {
					code: String(e?.message ?? "").includes("signedOut") ? "signedOut" : "engine",
					description: e?.message ?? ""
				};
			} finally {
				t.opening = null, this.draw();
			}
		})());
	}
	#l(e, t) {
		let n = () => this.active === e, a = 0;
		t.on("title", (t) => {
			e.title = X(t.title, 300), !this.private && !G(e.url) && i.retitle(e.url, e.title), this.draw();
		}), t.on("favicon", (t) => {
			e.icon = t.icon, this.draw();
		}), t.on("loading", (t) => {
			e.loading = t.loading, t.loading && (e.error = null), this.draw();
		}), t.on("nav", (t) => {
			let n = t.url !== e.url;
			Y(t.url) !== Y(e.url) && (e.title = ""), e.url = t.url, e.canBack = t.canGoBack, e.canForward = t.canGoForward, n && (e.asks = e.asks.filter((e) => e.origin === K(t.url)), this.#y()), t.url !== e.visited && (e.visited = t.url, this.private || i.visit(t.url, e.title, this.#g())), this.draw();
		}), t.on("error", (t) => {
			e.error = {
				code: t.code,
				description: t.description,
				url: t.url
			}, e.loading = !1, this.draw();
		}), t.on("blocked", (e) => {
			if (Date.now() - a < we) return;
			a = Date.now();
			let t = "";
			try {
				let n = new URL(e.url);
				t = n.host ? `${n.protocol}//${n.host}` : n.protocol;
			} catch {}
			g.send({
				text: r("blocked", { url: t.slice(0, 80) }),
				level: "warning"
			});
		}), t.on("open", (t) => this.#u(e, t)), t.on("popupsDropped", (t) => this.#u(e, {
			...t,
			dropped: !0
		})), t.on("expired", (t) => {
			e.asks = e.asks.filter((e) => e.requestId !== t.requestId), this.draw();
		}), t.on("focus", () => this.#h()), t.on("key", (e) => this.run(V[e.combo])), t.on("menu", (t) => this.#O(e, t)), t.on("audio", (t) => {
			e.audible = t.audible, this.draw();
		}), t.on("found", (e) => {
			n() && this.find.setStatus(e.matches ? r("find.count", {
				active: e.active,
				n: e.matches
			}) : r("find.none"), { error: !e.matches });
		}), t.on("permission", (t) => {
			e.asks.push(t), this.draw();
		}), t.on("auth", (t) => this.#E(e, t)), t.on("download", (e) => B.update(t, e, this.#g())), t.on("gone", (n) => {
			e.error = {
				code: "gone",
				description: n.reason
			}, e.page = null, t.close(), this.draw();
		});
	}
	#u(t, n) {
		let r = n.origin || K(t.url), i = () => {
			n.url && this.newTab(n.url, {
				after: t,
				select: n.disposition !== "background-tab"
			});
		};
		if (n.disposition === "background-tab" || !e.get("askTabs")) return i();
		let a = this.private ? void 0 : e.grant(r, "tabs");
		if (a === !0) return i();
		if (a === !1) return;
		let o = t.asks.find((e) => e.kind === "tabs" && e.origin === r);
		o || (o = {
			kind: "tabs",
			origin: r,
			urls: [],
			dropped: !1
		}, t.asks.push(o)), n.dropped ? o.dropped = !0 : o.urls.length < Te && o.urls.push(n.url), o.urls.length ? this.draw() : t.asks = t.asks.filter((e) => e !== o);
	}
	go(e) {
		let t = this.active ?? this.newTab(), r = n(e);
		if (r) {
			this.#t = !1, this.address.blur(), t.error = {
				code: "scheme",
				description: r,
				url: String(e).trim().slice(0, 200)
			}, this.draw(), this.slot.focus();
			return;
		}
		let i = a(e);
		i && (t.url = i, t.error = null, this.#t = !1, this.address.blur(), t.page ? t.page.navigate(i).catch((e) => {
			t.error = {
				code: "blocked",
				description: e.message,
				url: i
			}, this.draw();
		}) : this.#c(t), this.#y(), this.draw(), t.page ? t.page.focus() : this.slot.focus());
	}
	run(t) {
		let n = this.active, r = n?.page, i = /^tab(\d)$/.exec(t ?? "");
		if (i) return this.select(this.tabs[Number(i[1]) - 1]);
		switch (t) {
			case "newTab": return this.newTab();
			case "closeTab": return this.closeTab();
			case "reopenTab": return this.reopenClosed();
			case "newWindow": return this.newWindow({});
			case "newPrivate": return this.newWindow({ private: !0 });
			case "focusAddress": return this.address.focus(), this.address.select(), null;
			case "reload": return n?.error && (n.error = null, !r) ? this.#c(n).then(() => this.draw()) : r?.reload();
			case "hardReload": return r?.reload(!0);
			case "back": return r?.back();
			case "forward": return r?.forward();
			case "home": return this.go(e.get("home") || "about:blank");
			case "nextTab": return this.select(this.tabs[(this.tabs.indexOf(n) + 1) % this.tabs.length]);
			case "prevTab": return this.select(this.tabs[(this.tabs.indexOf(n) - 1 + this.tabs.length) % this.tabs.length]);
			case "lastTab": return this.select(this.tabs.at(-1));
			case "history": return ke(this.openWindow);
			case "downloads": return this.#M(this.downloadBtn);
			case "save": return this.saveSession();
			case "saveAs": return this.saveSessionAs();
			case "openSession": return this.pickSession();
			case "find": return this.#p();
			case "findNext": return this.find.el.hidden ? this.#p() : this.find.emit("next");
			case "zoomIn": return this.#f(1);
			case "zoomOut": return this.#f(-1);
			case "zoomReset": return this.#f(0);
			default: return null;
		}
	}
	#d(e) {
		let t = u(e), n = t && V[t];
		n && (e.target.closest?.("input, textarea") && /^(Ctrl\+(Z|Y|A|C|V|X)|Alt\+Arrow)/.test(t) || (e.preventDefault(), e.stopPropagation(), this.run(n)));
	}
	#f(e) {
		let t = this.active;
		if (!t) return;
		let n = H.indexOf(H.reduce((e, n) => Math.abs(n - t.zoom) < Math.abs(e - t.zoom) ? n : e));
		t.zoom = e === 0 ? 1 : H[Math.min(H.length - 1, Math.max(0, n + e))], t.page?.zoom(t.zoom), this.draw();
	}
	#p() {
		this.active?.page && (this.find.el.hidden = !1, this.find.open({ text: this.find.query.find }), this.find.focus(), this.live.refresh());
	}
	#m() {
		this.find.close(), this.find.el.hidden = !0, this.active?.page?.stopFind(), this.live.refresh(), this.active?.page?.focus();
	}
	#h() {
		W = this, this.win.active || this.win.el.dispatchEvent(new FocusEvent("focusin", { bubbles: !0 }));
	}
	show() {
		this.win.el.hidden && this.openWindow(this.win, this.key), this.#h();
	}
	newWindow(e) {
		e.private && (e = {
			...e,
			private: !0
		});
		let t = new o(e, this.openWindow);
		return this.openWindow(t.win, t.key, { main: !0 }), t;
	}
	reopenClosed(e = null) {
		let t = i.takeClosed(e);
		if (!t) return;
		if (t.kind === "window") return this.newWindow({
			tabs: t.tabs,
			active: 0
		});
		let n = null;
		for (let e of t.tabs) n = this.#a(this.#r(e));
		this.select(n);
	}
	#g() {
		return this.session && !this.private ? {
			id: this.session.id,
			name: this.session.name
		} : null;
	}
	#_() {
		let e = t(this.tabs), n = Math.max(0, e.findIndex((e) => e.url === this.active?.url));
		return {
			id: this.session?.id ?? v(),
			name: this.session?.name ?? "",
			autosave: !!this.session?.autosave,
			active: n,
			tabs: e
		};
	}
	#v() {
		return JSON.stringify(t(this.tabs).map((e) => [e.url, !!e.pinned]));
	}
	get dirty() {
		return !!this.session && this.session.sig !== this.#v();
	}
	#y() {
		this.session?.autosave && this.session.file && (clearTimeout(this.#e), this.#e = setTimeout(() => {
			this.dirty && this.saveSession({ quiet: !0 });
		}, 1500));
	}
	async saveSession({ quiet: e = !1 } = {}) {
		if (this.private) return;
		if (!this.session?.file || !d.exists(this.session.file)) return this.saveSessionAs();
		let t = this.#_();
		try {
			await he(this.session.file, t), this.session.sig = this.#v(), i.session({
				...this.session,
				path: d.tildePath(this.session.file),
				event: "save",
				tabs: t.tabs
			});
		} catch (t) {
			e || h(this.win, {
				icon: "error",
				title: r("session.saveFailed"),
				text: t.message
			});
		}
		this.draw();
	}
	async saveSessionAs() {
		if (this.private) return;
		let e = await Oe(this);
		if (!e) return;
		let t = {
			...this.#_(),
			id: v(),
			name: e.name,
			autosave: e.autosave,
			tabs: e.tabs
		};
		try {
			let n = await me(e.folder, t);
			this.session = {
				id: t.id,
				name: e.name,
				file: n.id,
				autosave: e.autosave,
				sig: JSON.stringify(e.tabs.map((e) => [e.url, !!e.pinned]))
			}, i.session({
				...this.session,
				path: d.tildePath(n.id),
				event: "save",
				tabs: t.tabs
			}), g.send({
				text: r("session.saved", {
					name: e.name,
					path: d.tildePath(n.id)
				}),
				level: "success"
			});
		} catch (e) {
			h(this.win, {
				icon: "error",
				title: r("session.saveFailed"),
				text: e.message
			});
		}
		this.draw();
	}
	async pickSession() {
		let e = await b(this.openWindow, {
			title: r("session.openTitle"),
			exts: [k]
		});
		e && this.openSessionFile(e.id);
	}
	async openSessionFile(e, { here: t = !1 } = {}) {
		let n = [...U].find((t) => t.session?.file === e);
		if (n && n !== this) {
			n.show(), t && this.win.emit("close");
			return;
		}
		let i;
		try {
			i = await P(e);
		} catch (e) {
			h(this.win, {
				icon: "error",
				title: r("session.openFailed"),
				text: e.message
			});
			return;
		}
		let a = this.tabs.every((e) => G(e.url)) && !this.session && !this.private;
		if (!t && !a) return this.newWindow({}).#b(i, e);
		this.#b(i, e);
	}
	#b(e, t) {
		for (let e of this.tabs) e.page?.close();
		this.tabs = e.tabs.map((e) => this.#r(e)), this.tabs.length || this.tabs.push(this.#r({})), this.session = {
			id: e.id,
			name: e.name || N(d.get(t)),
			file: t,
			autosave: e.autosave,
			sig: ""
		}, this.session.sig = this.#v(), i.session({
			...this.session,
			path: d.tildePath(t),
			event: "open",
			tabs: e.tabs
		}), this.select(this.tabs[Math.min(e.active, this.tabs.length - 1)]);
	}
	openSnapshot(e) {
		let t = this.tabs.every((e) => G(e.url)) && !this.session && !this.private ? this : this.newWindow({});
		for (let e of t.tabs) e.page?.close();
		return t.tabs = e.tabs.map((e) => t.#r(e)), t.tabs.length || t.tabs.push(t.#r({})), t.select(t.tabs[0]), t;
	}
	async revertSession() {
		if (this.session?.file) try {
			this.#b(await P(this.session.file), this.session.file);
		} catch (e) {
			h(this.win, {
				icon: "error",
				title: r("session.openFailed"),
				text: e.message
			});
		}
	}
	async renameSession() {
		let e = this.session;
		if (!e?.file) return;
		let t = await h(this.win, {
			title: r("session.rename"),
			fields: [{
				name: "name",
				label: r("session.name"),
				value: e.name,
				required: !0,
				maxLength: 120
			}],
			buttons: ["cancel", "ok"]
		}), n = t?.button === "ok" ? String(t.values.name).trim() : "";
		if (n && n !== e.name) try {
			let t = d.get(e.file), i = d.uniqueName(t.parent, `${d.cleanName(n, { portable: !0 }) || r("session.untitled")}.${k}`, t.id);
			d.rename(e.file, i), e.name = n, await this.saveSession({ quiet: !0 });
		} catch (e) {
			h(this.win, {
				icon: "error",
				title: r("session.saveFailed"),
				text: e.message
			});
		}
	}
	unlinkSession() {
		this.session && (this.session = null, this.draw());
	}
	async #x() {
		if (!this.dirty || this.session.autosave) return !0;
		this.live.refresh();
		let e = await h(this.win, {
			icon: "warning",
			title: r("session.unsavedTitle", { name: this.session.name }),
			text: r("session.unsavedText"),
			buttons: [
				"cancel",
				{
					value: "discard",
					label: r("session.discard"),
					danger: !0
				},
				{
					value: "save",
					label: r("session.save"),
					primary: !0
				}
			]
		});
		return e === "save" ? (await this.saveSession(), !this.dirty) : e === "discard";
	}
	#S() {
		this.private || (clearTimeout(this.#e), this.session ? (this.session.autosave && this.dirty && this.session.file && this.saveSession({ quiet: !0 }), i.session({
			...this.session,
			path: this.session.file ? d.tildePath(this.session.file) : null,
			event: "close",
			tabs: t(this.tabs)
		})) : this.tabs.some((e) => !G(e.url)) && i.addClosed("window", this.tabs));
	}
	#C() {
		clearTimeout(this.#e);
		for (let e of this.tabs) e.page?.close();
		this.live.dispose(), U.delete(this), W === this && (W = null);
	}
	state() {
		return this.private ? {
			private: !0,
			ended: !0
		} : {
			tabs: t(this.tabs),
			active: Math.max(0, this.tabs.indexOf(this.active)),
			...this.session && { session: {
				id: this.session.id,
				name: this.session.name,
				file: this.session.file,
				autosave: this.session.autosave,
				sig: this.session.sig
			} }
		};
	}
	#w() {
		if (!this.private) for (let t of this.tabs) t.page?.grants(e.grants());
	}
	#T(t, n, r, i) {
		if (t.asks = t.asks.filter((e) => e !== n), i &&= !this.private, n.kind === "tabs") {
			if (i && e.setGrant(n.origin, "tabs", r), r) {
				let e = t;
				for (let t of n.urls) e = this.newTab(t, {
					after: e,
					select: t === n.urls.at(-1)
				});
			}
			this.draw();
		} else {
			if (t.page?.permission(n.requestId, r, i), i) for (let t of Z(n)) e.setGrant(n.origin, t, r);
			this.draw();
		}
	}
	async #E(e, t) {
		this.active !== e && this.select(e), this.live.refresh();
		let n = await h(this.win, {
			icon: "lock",
			title: r("auth.title", { host: X(t.host, 100) }),
			text: t.realm ? r("auth.realm", { realm: X(t.realm, 80) }) : r("auth.text"),
			fields: [{
				name: "user",
				label: r("auth.user"),
				required: !0,
				maxLength: 200
			}, {
				name: "password",
				type: "password",
				label: r("auth.password"),
				maxLength: 500
			}],
			buttons: ["cancel", "ok"]
		});
		n?.button === "ok" ? e.page?.auth(t.requestId, n.values.user, n.values.password) : e.page?.auth(t.requestId, null);
	}
	#D(e, t, n) {
		if (!e) return;
		let i = this.tabs.indexOf(e);
		_(t, n, [
			{
				label: r("tabs.reload"),
				icon: "restart",
				disabled: !e.page,
				action: () => e.page?.reload()
			},
			{
				label: r("tabs.duplicate"),
				icon: "plus",
				disabled: G(e.url),
				action: () => this.newTab(e.url, { after: e })
			},
			{
				label: r(e.pinned ? "tabs.unpin" : "tabs.pin"),
				icon: "grip",
				action: () => this.#s(e, !e.pinned)
			},
			{
				label: r(e.muted ? "tabs.unmute" : "tabs.mute"),
				icon: "music",
				disabled: !e.page,
				action: () => {
					e.muted = !e.muted, e.page?.mute(e.muted), this.draw();
				}
			},
			{
				label: r("tabs.detach"),
				icon: "window",
				disabled: this.tabs.length < 2,
				action: () => this.detach(e)
			},
			"-",
			{
				label: r("tabs.close"),
				icon: "x",
				action: () => this.closeTab(e)
			},
			{
				label: r("tabs.closeOthers"),
				disabled: this.tabs.length < 2,
				action: () => {
					for (let t of this.tabs.filter((t) => t !== e && !t.pinned)) this.closeTab(t);
				}
			},
			{
				label: r("tabs.closeRight"),
				disabled: i === this.tabs.length - 1,
				action: () => {
					for (let e of this.tabs.slice(i + 1).filter((e) => !e.pinned)) this.closeTab(e);
				}
			}
		]);
	}
	#O(t, n) {
		let i = this.slot.getBoundingClientRect(), a = i.left + n.x, o = i.top + n.y, s = t.page, c = (e) => navigator.clipboard?.writeText(e).catch(() => {}), l = [];
		if (n.link && l.push({
			label: r("page.openLinkTab"),
			icon: "plus",
			action: () => this.newTab(n.link, {
				after: t,
				select: !1
			})
		}, {
			label: r("page.openLinkWindow"),
			icon: "window",
			action: () => this.newWindow({
				url: n.link,
				...this.private && { private: !0 }
			})
		}, ...this.private ? [] : [{
			label: r("page.openLinkPrivate"),
			icon: "eyeOff",
			action: () => this.newWindow({
				url: n.link,
				private: !0
			})
		}], {
			label: r("page.copyLink"),
			icon: "link",
			action: () => c(n.link)
		}, "-"), n.image && l.push({
			label: r("page.openImage"),
			icon: "image",
			action: () => this.newTab(n.image, { after: t })
		}, {
			label: r("page.copyImageLink"),
			icon: "link",
			action: () => c(n.image)
		}, "-"), n.editable) l.push({
			label: r("page.cut"),
			disabled: !n.flags.canCut,
			action: () => s?.edit("cut")
		}, {
			label: r("page.copy"),
			disabled: !n.flags.canCopy,
			action: () => s?.edit("copy")
		}, {
			label: r("page.paste"),
			disabled: !n.flags.canPaste,
			action: () => s?.edit("paste")
		}, {
			label: r("page.selectAll"),
			action: () => s?.edit("selectAll")
		}, "-");
		else if (n.selection) {
			let i = n.selection.trim().replace(/\s+/g, " ");
			l.push({
				label: r("page.copy"),
				action: () => s?.edit("copy")
			}, {
				label: r("page.search", { text: i.length > 30 ? `${i.slice(0, 30)}…` : i }),
				icon: "search",
				action: () => this.newTab(e.searchUrl(i), { after: t })
			}, "-");
		}
		l.push({
			label: r("nav.back"),
			icon: "arrowLeft",
			disabled: !t.canBack,
			action: () => s?.back()
		}, {
			label: r("nav.forward"),
			icon: "arrowRight",
			disabled: !t.canForward,
			action: () => s?.forward()
		}, {
			label: r("nav.reload"),
			icon: "restart",
			action: () => s?.reload()
		}, {
			label: r("page.copyAddress"),
			icon: "link",
			disabled: G(t.url),
			action: () => c(t.url)
		}), _(a, o, l);
	}
	#k(t) {
		let n = this.active, i = t.getBoundingClientRect(), a = K(n?.url), o = /^https:/.test(n?.url ?? ""), s = a && !this.private ? e.grants().filter((e) => e.origin === a) : [];
		_(i.left, i.bottom + 4, [
			{
				label: this.engine ? r("site.isolated") : r("engine.missingTitle"),
				icon: "shield",
				disabled: !0,
				action: () => {}
			},
			...a ? [{
				label: r(o ? "site.secure" : "site.insecure", { host: q(n.url) }),
				icon: o ? "lock" : "lockOpen",
				disabled: !0,
				action: () => {}
			}] : [],
			...s.length ? ["-", ...s.map((t) => ({
				label: r(t.allow ? "site.allowed" : "site.blocked", { what: r(`perm.${t.permission}`) }),
				icon: t.allow ? "check" : "x",
				items: [{
					label: r("site.forget"),
					action: () => e.setGrant(t.origin, t.permission, null)
				}]
			}))] : [],
			"-",
			{
				label: r("site.reload"),
				icon: "restart",
				disabled: !n?.page,
				action: () => n?.page?.reload()
			}
		], "below");
	}
	#A(e) {
		let t = e.getBoundingClientRect(), n = this.session;
		if (this.private) {
			_(t.left, t.bottom + 4, [{
				label: r("private.noSession"),
				icon: "eyeOff",
				disabled: !0,
				action: () => {}
			}], "below");
			return;
		}
		if (!n) {
			_(t.left, t.bottom + 4, [{
				label: r("session.saveNew"),
				icon: "save",
				shortcut: "Ctrl+S",
				action: () => this.saveSessionAs()
			}, {
				label: r("session.open"),
				icon: "folderOpen",
				shortcut: "Ctrl+O",
				action: () => this.pickSession()
			}], "below");
			return;
		}
		let i = n.file && d.exists(n.file) ? d.tildePath(n.file) : r("session.noFile");
		_(t.left, t.bottom + 4, [
			{
				label: i,
				icon: "file",
				disabled: !0,
				action: () => {}
			},
			...this.dirty ? [{
				label: r("session.changed"),
				icon: "warning",
				disabled: !0,
				action: () => {}
			}] : [],
			"-",
			{
				label: r("session.save"),
				icon: "save",
				shortcut: "Ctrl+S",
				action: () => this.saveSession()
			},
			{
				label: r("session.saveAsNew"),
				icon: "filePlus",
				shortcut: "Ctrl+Shift+S",
				action: () => this.saveSessionAs()
			},
			{
				label: r("session.revert"),
				icon: "undo",
				disabled: !this.dirty || !n.file,
				action: () => this.revertSession()
			},
			{
				label: r("session.rename"),
				icon: "pencil",
				disabled: !n.file,
				action: () => this.renameSession()
			},
			"-",
			{
				label: r("session.autosave"),
				icon: n.autosave ? "check" : null,
				disabled: !n.file,
				action: () => {
					n.autosave = !n.autosave, this.saveSession({ quiet: !0 });
				}
			},
			{
				label: r("session.reveal"),
				icon: "folder",
				disabled: !n.file || !d.exists(n.file),
				action: () => y("files", { folder: d.get(n.file).parent })
			},
			{
				label: r("session.unlink"),
				icon: "link",
				action: () => this.unlinkSession()
			}
		], "below");
	}
	#j(e) {
		let t = e.getBoundingClientRect(), n = this.active;
		_(t.right - 240, t.bottom + 4, [
			{
				label: r("menu.newTab"),
				icon: "plus",
				shortcut: "Ctrl+T",
				action: () => this.newTab()
			},
			{
				label: r("menu.newWindow"),
				icon: "window",
				shortcut: "Ctrl+N",
				action: () => this.newWindow({})
			},
			{
				label: r("menu.newPrivate"),
				icon: "eyeOff",
				shortcut: "Ctrl+Shift+N",
				action: () => this.newWindow({ private: !0 })
			},
			"-",
			{
				label: r("session.saveNew"),
				icon: "save",
				shortcut: "Ctrl+Shift+S",
				disabled: this.private,
				action: () => this.saveSessionAs()
			},
			{
				label: r("session.open"),
				icon: "folderOpen",
				shortcut: "Ctrl+O",
				action: () => this.pickSession()
			},
			{
				label: r("menu.reopenTab"),
				icon: "undo",
				shortcut: "Ctrl+Shift+T",
				disabled: !i.closed().length,
				action: () => this.reopenClosed()
			},
			"-",
			{
				label: r("history.open"),
				icon: "clock",
				shortcut: "Ctrl+H",
				action: () => ke(this.openWindow)
			},
			{
				label: r("download.folder"),
				icon: "download",
				action: () => {
					let e = d.resolve("~/Download");
					e && y("files", { folder: e.id });
				}
			},
			"-",
			{
				label: r("menu.find"),
				icon: "search",
				shortcut: "Ctrl+F",
				disabled: !n?.page,
				action: () => this.#p()
			},
			{
				label: r("menu.zoom", { n: Math.round((n?.zoom ?? 1) * 100) }),
				icon: "zoom",
				items: [
					{
						label: r("zoom.in"),
						icon: "plus",
						shortcut: "Ctrl+=",
						action: () => this.#f(1)
					},
					{
						label: r("zoom.out"),
						icon: "minus",
						shortcut: "Ctrl+-",
						action: () => this.#f(-1)
					},
					{
						label: r("zoom.reset"),
						shortcut: "Ctrl+0",
						action: () => this.#f(0)
					}
				]
			},
			"-",
			{
				label: r("menu.options"),
				icon: "gear",
				action: () => je(this.openWindow)
			}
		], "below");
	}
	#M(e) {
		let t = e.getBoundingClientRect(), n = B.list(), i = n.length ? n.map((e) => ({
			label: e.state === "progressing" ? r("download.progress", {
				name: e.name,
				pct: e.total ? Math.round(e.received / e.total * 100) : "…"
			}) : e.state === "saved" ? e.name : r(`download.${e.state}`, { name: e.name }),
			icon: e.state === "saved" ? "file" : e.state === "progressing" ? "download" : "warning",
			disabled: e.state !== "saved" && e.state !== "progressing",
			action: () => {
				e.state === "saved" && e.node && d.exists(e.node) ? ee(d.get(e.node)) : e.state === "progressing" && B.cancel(e.id);
			}
		})) : [{
			label: r("download.none"),
			disabled: !0,
			action: () => {}
		}];
		B.seen(), _(t.right - 280, t.bottom + 4, [
			...i,
			"-",
			{
				label: r("download.folder"),
				icon: "folder",
				action: () => {
					let e = d.resolve("~/Download");
					e && y("files", { folder: e.id });
				}
			}
		], "below");
	}
	draw() {
		let e = this.active;
		this.bar.render(this.tabs.map((e) => ({
			key: e.key,
			label: e.pinned ? "" : J(e),
			title: G(e.url) ? J(e) : `${J(e)}\n${e.url}`,
			icon: e.loading ? f("span", {
				class: "nw-spin",
				"aria-hidden": "true"
			}) : e.icon ? f("img", {
				class: "nw-fav",
				src: e.icon,
				alt: ""
			}) : "globe",
			activity: e.audible && !e.muted ? r("tabs.playing") : !1,
			class: [
				e.pinned && "nw-pinned",
				e.muted && "nw-muted",
				e.asks.length && "nw-asking"
			].filter(Boolean).join(" ") || void 0
		})), e?.key ?? null), this.backBtn.disabled = !e?.canBack, this.forwardBtn.disabled = !e?.canForward, this.reloadBtn.replaceChildren(m(e?.loading ? "x" : "restart")), this.reloadBtn.title = this.reloadBtn.ariaLabel = r(e?.loading ? "nav.stop" : "nav.reload"), this.#N(), this.zoomChip.hidden = !e || e.zoom === 1, this.zoomChip.textContent = e ? `${Math.round(e.zoom * 100)}%` : "", this.#P(), this.#F(), this.#I(), this.#L();
		let t = this.session ? `${this.session.name}${this.dirty ? " •" : ""}` : this.private ? r("private.title") : e && !G(e.url) ? q(e.url) : "";
		this.win.setTitle(r("app.name"), t);
	}
	#N() {
		let e = this.active;
		this.#t || (this.address.value = G(e?.url) ? "" : e.url);
		let t = /^https:/.test(e?.url ?? "");
		this.lock.replaceChildren(G(e?.url) ? m("search") : m(t ? "lock" : "lockOpen")), this.lock.className = `nw-lock ${G(e?.url) ? "" : t ? "ok" : "warn"}`, this.lock.title = G(e?.url) ? "" : r(t ? "site.secureShort" : "site.insecureShort");
	}
	#P() {
		let e = this.session, t = this.sessionChip;
		t.classList.toggle("none", !e), t.classList.toggle("dirty", this.dirty), t.hidden = this.private, t.replaceChildren(m("workarea"), f("span", { class: "nw-session-name" }, e ? e.name : r("session.none")), ...this.dirty ? [f("span", {
			class: "nw-dot",
			title: r("session.changed")
		})] : [], m("arrowDown")), t.title = e ? r("session.chipTitle", { name: e.name }) : r("session.noneTitle");
	}
	#F() {
		let e = this.active, t = e?.asks[0];
		if (this.askBar.hidden = !t, !t) {
			this.live.refresh();
			return;
		}
		let n, i;
		if (t.kind === "tabs") n = "plus", i = t.urls.length > 1 ? r("ask.tabsMany", { n: t.urls.length }) : r("ask.tabs", { host: q(t.urls[0]) }), t.dropped && (i += ` ${r("ask.tabsDropped")}`);
		else {
			let e = Z(t), a = t.permission === "media" ? r(e.length > 1 ? "perm.media" : `perm.${e[0]}`) : r(`perm.${t.permission}`);
			n = t.permission === "geolocation" ? "home" : t.permission === "media" ? "camera" : t.permission === "notifications" ? "bell" : "shield", i = r("ask.wants", { what: a });
		}
		let a = f("input", {
			type: "checkbox",
			checked: !!t.remember,
			onchange: (e) => {
				t.remember = e.currentTarget.checked;
			}
		});
		this.askBar.replaceChildren(m(n), f("div", { class: "nw-ask-text" }, f("b", {}, q(t.origin)), ` ${i}`, f("small", {}, r(this.private ? "ask.hintPrivate" : t.kind === "tabs" ? "ask.hintTabs" : "ask.hint"))), ...this.private ? [] : [f("label", { class: "nw-ask-remember" }, a, r("ask.remember"))], f("button", {
			type: "button",
			class: "ctl-btn",
			onclick: () => this.#T(e, t, !1, a.checked)
		}, r("ask.deny")), f("button", {
			type: "button",
			class: "ctl-btn primary",
			onclick: () => this.#T(e, t, !0, a.checked)
		}, r(t.kind === "tabs" ? "ask.open" : "ask.allow"))), this.live.refresh();
	}
	#I() {
		let e = this.active, t = null;
		e ? e.error ? t = R(this, e) : G(e.url) ? t = ge(this) : this.engine === !1 && (t = R(this, e, "engine")) : t = null, this.overlay.hidden = !t, t ? this.overlay.replaceChildren(t) : this.overlay.replaceChildren(), this.live.hold = !!t, this.live.attach(t ? null : e?.page ?? null), this.live.refresh();
	}
	#L() {
		this.downloadBtn.classList.toggle("busy", B.busy), this.downloadBtn.classList.toggle("fresh", B.unseen);
	}
};
async function Oe(e) {
	let n = pe(), i = f("span", { class: "nw-folder-path" }, n ? d.tildePath(n.id) : r("session.chooseFolder")), a = f("button", {
		type: "button",
		class: "ctl-btn",
		onclick: async () => {
			let t = await b(e.openWindow, {
				kind: "folder",
				title: r("session.whereTo")
			});
			t && (n = t, i.textContent = d.tildePath(t.id));
		}
	}, r("session.change")), o = e.tabs.filter((e) => !G(e.url)).map((e) => {
		let t = f("input", {
			type: "checkbox",
			checked: !0
		});
		return {
			tab: e,
			box: t,
			el: f("label", { class: "nw-save-row" }, t, e.icon ? f("img", {
				class: "nw-fav",
				src: e.icon,
				alt: ""
			}) : m("globe"), f("span", { class: "nw-save-title" }, J(e)), f("span", { class: "nw-save-url" }, q(e.url)))
		};
	}), s = f("div", { class: "nw-save" }, f("div", { class: "nw-save-folder" }, m("folder"), i, a), f("div", { class: "nw-save-label" }, r("session.tabsCount", { n: o.length })), f("div", { class: "nw-save-list" }, ...o.map((e) => e.el)), f("p", { class: "nw-save-note" }, m("shield"), r("session.privacy")));
	e.live.refresh();
	let c = await h(e.win, {
		title: r("session.saveTitle"),
		content: s,
		width: 520,
		fields: [{
			name: "name",
			label: r("session.name"),
			value: e.session?.name || (e.active ? J(e.active) : ""),
			required: !0,
			maxLength: 120
		}, {
			name: "autosave",
			type: "checkbox",
			label: r("session.autosaveLong"),
			value: !1
		}],
		validate: () => n ? !0 : r("session.chooseFolder"),
		buttons: ["cancel", {
			value: "save",
			label: r("session.save"),
			primary: !0
		}]
	});
	if (c?.button !== "save") return null;
	let l = t(o.filter((e) => e.box.checked).map((e) => e.tab));
	return {
		name: String(c.values.name).trim(),
		autosave: !!c.values.autosave,
		folder: n.id,
		tabs: l
	};
}
var $ = null;
function ke(e) {
	$ ??= import("./historyWindow-CnmI78mC.js"), $.then((t) => t.openHistory(e));
}
var Ae = null;
function je(e) {
	Ae ??= import("./optionsWindow-DQvCvYJ8.js"), Ae.then((t) => t.openOptions(e));
}
export { L as a, U as i, Ee as n, De as r, Q as t };
