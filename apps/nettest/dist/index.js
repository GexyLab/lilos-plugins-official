import * as e from "/host/sdk.js";
import { Emitter as t, Window as n, calls as r, formatBytes as i, fs as a, h as o, icon as s, messageBox as c, notifications as l, openMenu as u, resizeHandle as d, storage as f } from "/host/sdk.js";
import * as p from "/host/system.js";
import { pickFile as m } from "/host/system.js";
// src/shared/TabBar.js
var h = class extends t {
	#e;
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = [];
	#i = null;
	#a = null;
	#o;
	#s;
	constructor({ t: e, signal: t, label: n = "", newLabel: r = null, newButton: i = !0, reorder: a = !0, dragStart: c = null, className: l = "" } = {}) {
		super(), this.#e = e, this.#o = a, this.#s = c, this.list = o("div", {
			class: "sh-tabs",
			role: "tablist",
			"aria-label": n || null
		}), this.start = o("div", { class: "sh-tabbar-slot" }), this.end = o("div", { class: "sh-tabbar-slot end" });
		let u = r ?? e("shared.tabs.new");
		this.newButton = i ? o("button", {
			class: "sh-tabbar-btn sh-tab-new",
			type: "button",
			title: u,
			"aria-label": u,
			onclick: () => this.emit("new")
		}, s("plus")) : null, this.el = o("div", { class: ["sh-tabbar", l].filter(Boolean).join(" ") }, this.start, this.list, this.newButton, this.end), this.start.hidden = this.end.hidden = !0, this.list.addEventListener("pointerdown", (e) => this.#f(e), { signal: t }), this.list.addEventListener("auxclick", (e) => {
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
		let d = new ResizeObserver(() => this.#c());
		d.observe(this.list), t?.addEventListener("abort", () => d.disconnect());
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
		let t = o("button", {
			class: "sh-tab-close",
			type: "button",
			tabindex: "-1"
		}, s("x"));
		return t.addEventListener("click", (t) => {
			t.stopPropagation(), this.emit("close", e);
		}), t.addEventListener("pointerdown", (e) => e.stopPropagation()), o("div", {
			class: "sh-tab",
			role: "tab",
			dataset: { key: e }
		}, o("span", {
			class: "sh-tab-icon",
			hidden: !0
		}), o("span", { class: "sh-tab-name" }), o("span", {
			class: "sh-tab-detail",
			hidden: !0
		}), o("span", {
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
		let [i, a, o, c, l] = e.children;
		t.icon !== n?.icon && (i.replaceChildren(...t.icon == null ? [] : [typeof t.icon == "string" ? s(t.icon) : t.icon]), i.hidden = t.icon == null), a.textContent !== t.label && (a.textContent = t.label), o.textContent = t.detail ?? "", o.hidden = !t.detail, c.hidden = !t.activity, c.title = typeof t.activity == "string" ? t.activity : "";
		let u = t.closeLabel ?? this.#e("shared.tabs.close", { name: t.label }), d = t.closeTitle ?? u;
		l.getAttribute("aria-label") !== u && l.setAttribute("aria-label", u), l.title !== d && (l.title = d);
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
}, g = 0;
function _({ t: e, rows: t, onChange: n, columns: r = [], secret: i = null, mono: a = !1, keys: c = null, values: l = null, placeholder: u = {} }) {
	let d = o("div", {
		class: `kv${a ? " mono" : ""}`,
		role: "table"
	}), f = c ? `kv-keys-${++g}` : null, p = () => n?.(t), m = (e, n, r, i = {}) => {
		let a = o("input", {
			class: "kv-in",
			type: "text",
			value: String(e[n] ?? ""),
			placeholder: r ?? "",
			spellcheck: "false",
			autocomplete: "off",
			"aria-label": r ?? n,
			...i,
			oninput: () => {
				e[n] = a.value, e === _ && a.value && (t.push(e), _ = h(), d.append(v(_, !0)), a.closest(".kv-row").classList.remove("draft")), p();
			}
		});
		return a;
	}, h = () => ({
		key: "",
		value: "",
		enabled: !0
	}), _ = h(), v = (n, a = !1) => {
		let c = o("div", {
			class: `kv-row${a ? " draft" : ""}${n.enabled === !1 ? " off" : ""}`,
			role: "row"
		}), d = o("input", {
			type: "checkbox",
			class: "kv-on",
			checked: n.enabled !== !1,
			"aria-label": e("shared.kv.enabled"),
			onchange: () => {
				n.enabled = d.checked, c.classList.toggle("off", !d.checked), p();
			}
		}), h = [o("span", { class: "kv-c on" }, d), o("span", { class: "kv-c" }, m(n, "key", u.key ?? e("shared.kv.key"), f ? { list: f } : {}))];
		if (i && n.secret) {
			let e = o("span", { class: "kv-sealed" }, s("lock"), i.label(n));
			h.push(o("span", { class: "kv-c" }, e));
		} else {
			let t = l?.(n), r = t?.length ? `kv-vals-${++g}` : null;
			h.push(o("span", { class: "kv-c" }, m(n, "value", u.value ?? e("shared.kv.value"), r ? { list: r } : {}), r ? o("datalist", { id: r }, ...t.map((e) => o("option", { value: e }))) : null));
		}
		for (let e of r) if (e.options) {
			let t = o("select", {
				class: "kv-in",
				"aria-label": e.placeholder,
				onchange: () => {
					n[e.field] = t.value, n !== _ && p();
				}
			}, ...e.options.map((t) => o("option", {
				value: t.value,
				selected: String(n[e.field] ?? e.options[0].value) === t.value
			}, t.label)));
			h.push(o("span", {
				class: "kv-c",
				style: e.width ? `flex: 0 0 ${e.width}px` : ""
			}, t));
		} else h.push(o("span", {
			class: "kv-c",
			style: e.width ? `flex: 0 0 ${e.width}px` : ""
		}, m(n, e.field, e.placeholder)));
		let v = o("span", { class: "kv-c tools" });
		return i && v.append(o("button", {
			type: "button",
			class: `kv-btn${n.secret ? " on" : ""}`,
			title: n.secret ? e("shared.kv.unseal") : e("shared.kv.seal"),
			"aria-pressed": String(!!n.secret),
			onclick: async () => {
				await i.onSecret(n, !n.secret), y(), p();
			}
		}, s(n.secret ? "lock" : "lockOpen"))), v.append(o("button", {
			type: "button",
			class: "kv-btn",
			title: e("shared.kv.remove"),
			onclick: () => {
				t.splice(t.indexOf(n), 1), c.remove(), p();
			}
		}, s("x"))), h.push(v), c.append(...h), c;
	};
	function y() {
		_ = h(), d.replaceChildren(...t.map((e) => v(e)), v(_, !0)), f && d.append(o("datalist", { id: f }, ...c.map((e) => o("option", { value: e }))));
	}
	return y(), {
		el: d,
		render: y,
		focusLast: () => d.querySelector(".kv-row.draft .kv-in")?.focus()
	};
}
// src/shared/trustPrompt.js
function v(e, t, { t: n, name: r = t?.host ?? "" } = {}) {
	if (!t?.fingerprint) return Object.assign(Promise.resolve(!1), { close() {} });
	let i = t.changed === !0, a = t.kind === "tls", o = [
		n(i ? "shared.trust.changedText" : a ? "shared.trust.firstTls" : "shared.trust.first"),
		"",
		...t.host ? [`${n("shared.trust.server")}: ${t.host}`] : [],
		`${n(a ? "shared.trust.certificate" : "shared.trust.key")}: ${t.text || t.fingerprint}`,
		...i && t.previous ? [`${n("shared.trust.previous")}: ${t.previous}`] : [],
		"",
		n(i ? "shared.trust.askChanged" : "shared.trust.ask")
	], s = c(e, {
		icon: i ? "error" : "warning",
		title: n(i ? "shared.trust.changedTitle" : "shared.trust.title", { name: r }),
		text: o.join("\n"),
		buttons: ["cancel", "continue"],
		default: "cancel"
	}), l = s.then((e) => e === "continue");
	return l.close = () => s.close(null), l;
}
// src/shared/highlight.js
var y = /"(?:\\.|[^"\\\n])*"?/, b = /'(?:\\.|[^'\\\n])*'?/, x = /\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/, S = (e) => RegExp(`\\b(?:${e.join("|")})\\b`), C = /* @__PURE__ */ "async.await.break.case.catch.class.const.continue.debugger.default.delete.do.else.export.extends.finally.for.from.function.if.import.in.instanceof.interface.let.new.of.return.static.super.switch.this.throw.try.type.typeof.var.void.while.with.yield".split("."), w = /* @__PURE__ */ "and.as.assert.async.await.break.class.continue.def.del.elif.else.except.finally.for.from.global.if.import.in.is.lambda.nonlocal.not.or.pass.raise.return.try.while.with.yield".split("."), T = {
	text: {
		label: "Testo",
		rules: []
	},
	markdown: {
		label: "Markdown",
		rules: [
			[/```[\s\S]*?(?:```|$)/, "st"],
			[/^#{1,6} .*$/m, "hd"],
			[/^ {0,3}>.*$/m, "cm"],
			[/^\s*(?:[-*+]|\d+\.)(?= )/m, "pu"],
			[/`[^`\n]+`/, "st"],
			[/\*\*[^*\n]+\*\*|__[^_\n]+__/, "bd"],
			[/\*[^*\n]+\*|_[^_\n]+_/, "it"],
			[/!?\[[^\]\n]*\]\([^)\n]*\)/, "fn"]
		]
	},
	javascript: {
		label: "JavaScript",
		rules: [
			[/\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)/, "cm"],
			[y, "st"],
			[b, "st"],
			[/`(?:\\[\s\S]|[^`\\])*`?/, "st"],
			[S(C), "kw"],
			[S([
				"true",
				"false",
				"null",
				"undefined",
				"NaN",
				"Infinity"
			]), "nu"],
			[x, "nu"],
			[/\b[A-Za-z_$][\w$]*(?=\s*\()/, "fn"]
		]
	},
	css: {
		label: "CSS",
		rules: [
			[/\/\*[\s\S]*?(?:\*\/|$)/, "cm"],
			[y, "st"],
			[b, "st"],
			[/@[\w-]+/, "kw"],
			[/#[\da-fA-F]{3,8}\b/, "nu"],
			[/-?\b\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|vmin|vmax|s|ms|deg|fr|ch)?/, "nu"],
			[/--[\w-]+|[a-z-]+(?=\s*:[^:{]*[;}])/, "pr"],
			[/!important/, "kw"]
		]
	},
	html: {
		label: "HTML",
		rules: [
			[/<!--[\s\S]*?(?:-->|$)/, "cm"],
			[/<!DOCTYPE[^>]*>/i, "cm"],
			[/<\/?[\w-]+|\/?>/, "kw"],
			[/[\w:-]+(?==)/, "pr"],
			[y, "st"],
			[b, "st"],
			[/&#?\w+;/, "nu"]
		]
	},
	json: {
		label: "JSON",
		rules: [
			[/"(?:\\.|[^"\\\n])*"(?=\s*:)/, "pr"],
			[y, "st"],
			[S([
				"true",
				"false",
				"null"
			]), "kw"],
			[/-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/, "nu"]
		]
	},
	python: {
		label: "Python",
		rules: [
			[/#[^\n]*/, "cm"],
			[/"""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$)/, "st"],
			[y, "st"],
			[b, "st"],
			[/@[\w.]+/, "fn"],
			[S(w), "kw"],
			[S([
				"True",
				"False",
				"None",
				"self"
			]), "nu"],
			[x, "nu"],
			[/\b[A-Za-z_]\w*(?=\s*\()/, "fn"]
		]
	}
}, E = /* @__PURE__ */ new Map();
function ee(e) {
	if (!E.has(e)) {
		let { rules: t } = T[e] ?? T.text, n = /* @__PURE__ */ new Set(["g", ...t.flatMap(([e]) => [...e.flags])]);
		E.set(e, t.length ? {
			re: new RegExp(t.map(([e]) => `(${e.source})`).join("|"), [...n].join("")),
			classes: t.map(([, e]) => e)
		} : null);
	}
	return E.get(e);
}
function te(e, t) {
	let n = ee(t);
	if (!n) return [[null, e]];
	let r = [], i = 0;
	n.re.lastIndex = 0;
	for (let t; t = n.re.exec(e);) {
		if (!t[0]) {
			n.re.lastIndex++;
			continue;
		}
		t.index > i && r.push([null, e.slice(i, t.index)]);
		let a = t.findIndex((e, t) => t > 0 && e !== void 0) - 1;
		r.push([n.classes[a], t[0]]), i = t.index + t[0].length;
	}
	return i < e.length && r.push([null, e.slice(i)]), r;
}
// src/nettest/code.js
var ne = 4e5, re = /\b(?:query|mutation|subscription|fragment|on|schema|type|input|enum|interface|union|scalar|extend|directive|implements)\b/;
function ie(e) {
	let t = RegExp(`(#[^\\n]*)|("(?:\\\\.|[^"\\\\\\n])*"?)|(${re.source})|(\\$[A-Za-z_]\\w*)|(\\b\\d+(?:\\.\\d+)?\\b)|(@[A-Za-z_]\\w*)|(\\b[A-Za-z_]\\w*(?=\\s*[:(]))`, "g"), n = [
		"cm",
		"st",
		"kw",
		"pr",
		"nu",
		"pu",
		"fn"
	], r = [], i = 0;
	for (let a; a = t.exec(e);) a.index > i && r.push([null, e.slice(i, a.index)]), r.push([n[a.slice(1).findIndex((e) => e !== void 0)], a[0]]), i = a.index + a[0].length;
	return i < e.length && r.push([null, e.slice(i)]), r;
}
function ae(e, t) {
	let n = e.length > ne ? [[null, e]] : t === "graphql" ? ie(e) : te(e, t === "xml" ? "html" : t), r = [];
	for (let [e, t] of n) {
		let n = 0;
		for (let i of t.matchAll(/\{\{[^{}]{1,120}\}\}/g)) i.index > n && r.push(o("span", e ? { class: `tk-${e}` } : {}, t.slice(n, i.index))), r.push(o("span", { class: "nx-var" }, i[0])), n = i.index + i[0].length;
		n < t.length && r.push(e ? o("span", { class: `tk-${e}` }, t.slice(n)) : document.createTextNode(t.slice(n)));
	}
	return r;
}
function D({ value: e = "", lang: t = "text", onInput: n, placeholder: r = "", readOnly: i = !1, label: a = "", minLines: s = 4 } = {}) {
	let c = String(e), l = t, u = o("pre", {
		class: "nx-code-hl",
		"aria-hidden": "true"
	}), d = o("textarea", {
		class: "nx-code-in",
		spellcheck: "false",
		autocomplete: "off",
		placeholder: r,
		readOnly: i,
		"aria-label": a || r,
		wrap: "soft"
	});
	d.value = c;
	let f = o("div", {
		class: `nx-code${i ? " ro" : ""}`,
		style: `--min-lines: ${s}`
	}, u, d), p = () => {
		u.replaceChildren(...ae(c, l), "\n");
	}, m = () => {
		u.scrollTop = d.scrollTop, u.scrollLeft = d.scrollLeft;
	}, h = !1;
	return d.addEventListener("input", () => {
		c = d.value, p(), n?.(c);
	}), d.addEventListener("scroll", m), d.addEventListener("keydown", (e) => {
		if (e.key === "Escape") h = !0;
		else {
			if (e.key === "Tab" && !e.shiftKey && !h && !i && !e.ctrlKey && !e.altKey && !e.metaKey) {
				e.preventDefault();
				let { selectionStart: t, selectionEnd: n } = d;
				d.setRangeText("  ", t, n, "end"), d.dispatchEvent(new Event("input"));
			}
			h = !1;
		}
	}), p(), {
		el: f,
		get value() {
			return c;
		},
		setValue(e) {
			c = String(e ?? ""), d.value !== c && (d.value = c), p(), m();
		},
		setLang(e) {
			l = e, p();
		},
		focus: () => d.focus(),
		input: d
	};
}
// src/shared/i18n.js
function oe(t, n) {
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
var { t: O } = oe("nettest", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"NetTest\",\"@description\":\"Requests to APIs and network services, made by the lilOS kernel: HTTP/REST and GraphQL with environments, secret variables, authentication, scripts and checks; WebSocket, SSE, gRPC, MQTT, TCP, TLS and UDP sessions; collections run in order or by the Scheduler.\",\"@entrypoints.main.params.file.label\":\"Collection\",\"@entrypoints.main.params.file.description\":\"A NetTest collection (.nettest) to open\",\"@entrypoints.filePreview.label\":\"Previews of .nettest collections\",\"@dependencies.services-isolate.reason\":\"JavaScript scripts before and after the requests, in an isolated sandbox\",\"@dependencies.call-grpc.reason\":\"gRPC calls and streams\",\"@dependencies.call-mqtt.reason\":\"MQTT sessions\",\"app.name\":\"NetTest\",\"ui.cancel\":\"Cancel\",\"mine.name\":\"My requests\",\"mine.where\":\"Kept in NetTest\",\"tools.new\":\"New\",\"tools.import\":\"Import\",\"tools.open\":\"Open collection\",\"tools.cookies\":\"Cookies\",\"tools.run\":\"Run\",\"tools.schedule\":\"Schedule\",\"tools.save\":\"Save\",\"tools.saveKeys\":\"Save the collection (Ctrl+S)\",\"tabs.label\":\"Open requests\",\"tabs.new\":\"New HTTP request\",\"tabs.close\":\"Close\",\"tabs.closeOthers\":\"Close the others\",\"side.collections\":\"Collections\",\"side.history\":\"History\",\"side.search\":\"Search\",\"side.resize\":\"Resize the side panel\",\"side.unsaved\":\"Not saved\",\"side.menu\":\"Menu\",\"side.firstRequest\":\"Add a request\",\"side.clearHistory\":\"Clear the history\",\"side.noHistory\":\"The requests you send show up here.\",\"side.historyGone\":\"That request is no longer here\",\"menu.newRequest\":\"New request\",\"menu.newFolder\":\"New folder\",\"menu.newCollection\":\"New collection…\",\"menu.settings\":\"Settings\",\"menu.environments\":\"Environments\",\"menu.run\":\"Run\",\"menu.schedule\":\"Schedule…\",\"menu.save\":\"Save\",\"menu.saveAs\":\"Save as…\",\"menu.export\":\"Export for Postman…\",\"menu.close\":\"Close\",\"menu.open\":\"Open\",\"menu.rename\":\"Rename\",\"menu.duplicate\":\"Duplicate\",\"menu.delete\":\"Delete\",\"item.unnamed\":\"Request without a name\",\"item.unnamedFolder\":\"Folder without a name\",\"item.newName\":\"New {protocol} request\",\"item.name\":\"Name\",\"item.folderName\":\"Name of the folder\",\"item.newFolderName\":\"New folder\",\"item.collectionName\":\"Name of the collection\",\"item.newCollectionName\":\"New collection\",\"item.copyOf\":\"{name} (copy)\",\"item.deleteRequest\":\"Delete «{name}»?\",\"item.deleteFolder\":\"Delete the folder «{name}»?\",\"item.deleteFolderText\":\"The requests in it go too.\",\"file.missing\":\"The file is no longer there\",\"file.invalid\":\"«{name}» is not a NetTest collection\",\"file.tooBig\":\"«{name}» is too big\",\"file.whereTo\":\"Where to save\",\"file.saveFailed\":\"Not saved\",\"file.saved\":\"Saved in {path}\",\"file.exported\":\"Exported to {path}\",\"file.unsavedTitle\":\"Save the changes to «{name}»?\",\"file.unsavedText\":\"Otherwise they are lost.\",\"file.unsavedMany\":{\"one\":\"A collection has unsaved changes\",\"other\":\"{n} collections have unsaved changes\"},\"file.discard\":\"Don’t save\",\"file.saveAll\":\"Save all\",\"empty.title\":\"Send a request\",\"empty.text\":\"The lilOS kernel sends it: no CORS, and it reaches the servers the kernel reaches. Choose a protocol to start.\",\"empty.import\":\"…or import a collection from Postman, Insomnia, OpenAPI, HAR or cURL\",\"env.choose\":\"Environment\",\"env.manage\":\"Environments and variables\",\"env.none\":\"No environment\",\"env.of\":\"Environment of «{name}»\",\"env.title\":\"Environments — {name}\",\"env.environments\":\"Environments\",\"env.add\":\"New environment\",\"env.other\":\"Other variables\",\"env.collectionVars\":\"Of the collection\",\"env.globals\":\"Global\",\"env.active\":\"in use\",\"env.use\":\"Use it\",\"env.newName\":\"Development\",\"env.deleteTitle\":\"Delete the environment «{name}»?\",\"env.noneYet\":\"No environment yet: Development, Test, Production… each with its own values of the same variables.\",\"env.secret.title\":\"Secret value of «{name}»\",\"env.secret.text\":\"lilOS seals it at once: the file keeps it encrypted, only you open it on this lilOS, and nobody sees it again.\",\"env.secret.sealed\":\"•••• sealed\",\"env.secret.missing\":\"no value: click the lock twice to give one\",\"env.secret.dropTitle\":\"Make «{name}» a plain variable?\",\"env.secret.dropText\":\"Its sealed value goes: you type a new one, which stays visible in the file.\",\"env.secret.needs\":\"Give a value to: {names} (secret values are not passed on with the file)\",\"env.secret.hint\":\"A variable with the lock is secret: its value is sealed by lilOS and put in the request by the kernel; requests, scripts and history show it as ••••.\",\"vars.name\":\"Variable\",\"vars.value\":\"Value\",\"vars.envHint\":\"Write {{name}} in addresses, headers, bodies and auth: the value of the chosen environment goes there.\",\"vars.collectionHint\":\"The collection’s own variables: the same in every environment, and the environment’s win.\",\"vars.globalsHint\":\"For every collection, kept in NetTest (not in the files).\",\"vars.scope.environment\":\"in the environment\",\"vars.scope.collection\":\"in the collection\",\"vars.scope.globals\":\"global\",\"req.method\":\"Method\",\"req.url\":\"Address\",\"req.send\":\"Send\",\"req.cancel\":\"Stop\",\"req.cancelled\":\"Stopped\",\"req.more\":\"More\",\"req.resize\":\"Resize the request and the response\",\"req.unknownVars\":\"No value for: {names}\",\"req.tab.params\":\"Parameters\",\"req.tab.auth\":\"Authorization\",\"req.tab.headers\":\"Headers\",\"req.tab.body\":\"Body\",\"req.tab.graphql\":\"Query\",\"req.tab.scripts\":\"Scripts\",\"req.tab.checks\":\"Checks\",\"req.tab.settings\":\"Settings\",\"req.param\":\"Parameter\",\"req.value\":\"Value\",\"req.header\":\"Header\",\"req.field\":\"Field\",\"req.paramsHint\":\"The query of the address, row by row: changing one changes the other.\",\"req.headersHint\":\"NetTest adds User-Agent, Accept and Accept-Encoding when they are missing, and Cookie with the cookies the server set.\",\"req.body.none\":\"None\",\"req.body.json\":\"JSON\",\"req.body.text\":\"Text\",\"req.body.xml\":\"XML\",\"req.body.html\":\"HTML\",\"req.body.form\":\"Form\",\"req.body.multipart\":\"Multipart\",\"req.body.file\":\"File\",\"req.body.noneHint\":\"The {method} request goes without a body.\",\"req.body.fieldType\":\"Kind\",\"req.body.fieldText\":\"Text\",\"req.body.fieldFile\":\"File\",\"req.body.fileHint\":\"For a file field, write the path of the home (~/Documenti/foto.png) as the value, or choose it below.\",\"req.body.binaryHint\":\"The file goes as it is, with the Content-Type of its kind unless a header says otherwise.\",\"req.body.format\":\"Format\",\"req.body.badJson\":\"Not valid JSON: {error}\",\"req.file.choose\":\"Choose…\",\"req.file.pick\":\"File to send\",\"req.file.none\":\"No file\",\"req.file.missing\":\"Choose «{name}» again (it was in the import)\",\"req.gql.query\":\"Query\",\"req.gql.variables\":\"Variables (JSON)\",\"req.gql.schema\":\"Schema\",\"req.gql.filter\":\"Filter the fields\",\"req.gql.noSchema\":\"The server did not give its schema (introspection off?)\",\"req.copyCode\":\"Copy as code…\",\"req.duplicate\":\"Duplicate\",\"req.schedule\":\"Schedule this request…\",\"scripts.pre\":\"Before the request\",\"scripts.test\":\"After the response\",\"scripts.snippets\":\"Add\",\"scripts.hint\":\"JavaScript, run by the kernel in an isolated sandbox (no network, no files), 5 seconds at most. `nt` (or `pm`, as in Postman): variables, request, response, test and expect. Secret variables read as {{name}}.\",\"scripts.snip.setVar\":\"Set a variable of the environment\",\"scripts.snip.timestamp\":\"A variable with the time now\",\"scripts.snip.header\":\"Add a header\",\"scripts.snip.status\":\"Test: the status is 200\",\"scripts.snip.time\":\"Test: answers in less than 500 ms\",\"scripts.snip.json\":\"Test: the body has a field\",\"scripts.snip.save\":\"Save a value of the body in the environment\",\"checks.title\":\"Checks\",\"checks.add\":\"Add a check\",\"checks.remove\":\"Remove\",\"checks.enabled\":\"On\",\"checks.value\":\"value\",\"checks.src.status\":\"Status\",\"checks.src.time\":\"Time (ms)\",\"checks.src.size\":\"Size (bytes)\",\"checks.src.header\":\"Header\",\"checks.src.json\":\"JSON\",\"checks.src.body\":\"Body\",\"checks.op.eq\":\"is\",\"checks.op.ne\":\"is not\",\"checks.op.lt\":\"less than\",\"checks.op.le\":\"at most\",\"checks.op.gt\":\"more than\",\"checks.op.ge\":\"at least\",\"checks.op.contains\":\"contains\",\"checks.op.notContains\":\"does not contain\",\"checks.op.exists\":\"exists\",\"checks.op.notExists\":\"does not exist\",\"checks.op.matches\":\"matches (regex)\",\"checks.op.in\":\"is one of (a, b)\",\"checks.op.type\":\"is of type\",\"checks.op.empty\":\"is empty\",\"checks.op.notEmpty\":\"is not empty\",\"extract.title\":\"Save to variable\",\"extract.add\":\"Add\",\"extract.var\":\"variable\",\"extract.hint\":\"A value of the response kept for the next requests (a token, an id): JSON path ($.data.id), header, or body with a regular expression.\",\"set.timeout\":\"Time limit (seconds)\",\"set.timeoutHint\":\"30 when empty\",\"set.redirects\":\"Redirects\",\"set.follow\":\"Follow them\",\"set.version\":\"HTTP version\",\"set.version.auto\":\"Automatic (HTTP/2 when the server offers it)\",\"set.tls\":\"Certificate\",\"set.verify\":\"Check the server’s certificate\",\"set.verifyHint\":\"When it is not valid lilOS asks you to confirm it (once per server).\",\"set.decode\":\"Compression\",\"set.decodeLabel\":\"Decompress the response (gzip, br, deflate)\",\"set.cookies\":\"Cookies\",\"set.cookiesLabel\":\"Send and keep cookies\",\"set.cert\":\"Client certificate\",\"set.certHint\":\"PEM, for servers that ask who you are (mTLS)\",\"set.key\":\"Its key\",\"set.passphrase\":\"Key password\",\"set.ca\":\"More CA certificates\",\"set.caHint\":\"PEM: the authority of an internal network, trusted for this request\",\"set.maxBody\":\"Largest response (MB)\",\"set.maxBodyHint\":\"20 when empty; what is beyond is cut\",\"set.pickFile\":\"Choose the file\",\"auth.type\":\"Type\",\"auth.type.inherit\":\"From the folder\",\"auth.type.none\":\"None\",\"auth.type.basic\":\"Basic\",\"auth.type.bearer\":\"Bearer token\",\"auth.type.apikey\":\"API key\",\"auth.type.digest\":\"Digest\",\"auth.type.aws4\":\"AWS signature v4\",\"auth.type.oauth2\":\"OAuth 2.0\",\"auth.user\":\"User\",\"auth.password\":\"Password\",\"auth.token\":\"Token\",\"auth.prefix\":\"Prefix\",\"auth.useSecret\":\"Better a secret variable of the environment ({{name}}): the value would stay in clear in the file\",\"auth.apikey.key\":\"Name\",\"auth.apikey.value\":\"Value\",\"auth.apikey.in\":\"Where\",\"auth.apikey.header\":\"Header\",\"auth.apikey.query\":\"Query of the address\",\"auth.aws.accessKey\":\"Access key\",\"auth.aws.secretKey\":\"Secret key\",\"auth.aws.sessionToken\":\"Session token\",\"auth.aws.region\":\"Region\",\"auth.aws.service\":\"Service\",\"auth.inherits\":\"Uses {type} of «{name}»\",\"auth.inheritsNone\":\"Uses what the folders and the collection say\",\"auth.noneText\":\"The request goes without authorization.\",\"auth.oauth.grant\":\"Grant\",\"auth.oauth.grant.token\":\"A token I have\",\"auth.oauth.grant.authorization_code\":\"Sign in (code + PKCE)\",\"auth.oauth.grant.client_credentials\":\"Client credentials\",\"auth.oauth.grant.password\":\"User and password\",\"auth.oauth.authorizeUrl\":\"Authorization address\",\"auth.oauth.tokenUrl\":\"Token address\",\"auth.oauth.clientId\":\"Client ID\",\"auth.oauth.clientSecret\":\"Client secret\",\"auth.oauth.scope\":\"Scope\",\"auth.oauth.audience\":\"Audience\",\"auth.oauth.send\":\"Client credentials go\",\"auth.oauth.send.body\":\"in the body\",\"auth.oauth.send.basic\":\"in a Basic header\",\"auth.oauth.redirect\":\"Return address\",\"auth.oauth.redirect.lilos\":\"lilOS’s own (leave empty)\",\"auth.oauth.redirect.hint\":\"Register {url} with the provider; or write the address you registered there, and paste where the window ends.\",\"auth.oauth.signIn\":\"Sign in\",\"auth.oauth.forget\":\"Forget the access\",\"auth.oauth.has\":\"Token {preview}, valid until {until}\",\"auth.oauth.expired\":\"Token {preview} expired on {until}\",\"auth.oauth.renews\":\"renewed by itself\",\"auth.oauth.none\":\"Not signed in yet\",\"auth.oauth.auto\":\"The kernel asks for the token when the request needs it and keeps it until it ends.\",\"auth.oauth.failed\":\"Sign-in failed\",\"auth.oauth.paste.title\":\"Where did the window end?\",\"auth.oauth.paste.text\":\"After signing in, the provider sends the window to the address you registered. Copy the whole address of that page here.\",\"auth.oauth.paste.label\":\"Address\",\"res.label\":\"Response\",\"res.body\":\"Body of the response\",\"res.empty\":\"Send the request to see the response here.\",\"res.sending\":\"Sending…\",\"res.error\":\"Error\",\"res.untrusted\":\"Certificate to confirm\",\"res.sizeWire\":\"{size} on the network (compressed)\",\"res.truncated\":\"cut\",\"res.passed\":{\"one\":\"{ok}/{n} passed\",\"other\":\"{ok}/{n} passed\"},\"res.redirects\":{\"one\":\"1 redirect\",\"other\":\"{n} redirects\"},\"res.tab.body\":\"Body\",\"res.tab.headers\":\"Headers\",\"res.tab.cookies\":\"Cookies\",\"res.tab.results\":\"Results\",\"res.tab.console\":\"Console\",\"res.tab.timing\":\"Times\",\"res.tab.request\":\"Request sent\",\"res.mode.pretty\":\"Formatted\",\"res.mode.raw\":\"As it came\",\"res.mode.preview\":\"Preview\",\"res.copy\":\"Copy\",\"res.download\":\"Download\",\"res.preview\":\"Preview of the page\",\"res.noBody\":\"No body\",\"res.check\":\"Check\",\"res.noResults\":\"No checks and no tests: add them in Checks or Scripts.\",\"res.noCookies\":\"The response set no cookies.\",\"res.noLogs\":\"The scripts wrote nothing.\",\"res.phase.pre\":\"before\",\"res.phase.test\":\"after\",\"res.cookie.name\":\"Name\",\"res.cookie.value\":\"Value\",\"res.cookie.domain\":\"Domain\",\"res.cookie.path\":\"Path\",\"res.cookie.expires\":\"Expires\",\"res.cookie.flags\":\"Flags\",\"res.cookie.session\":\"with the session\",\"res.t.lookup\":\"DNS\",\"res.t.connect\":\"Connection\",\"res.t.tls\":\"TLS\",\"res.t.wait\":\"Waiting\",\"res.t.download\":\"Download\",\"res.t.total\":\"Total\",\"res.remote\":\"Server: {address}\",\"res.tlsError\":\"Certificate not valid: {error} (confirmed by you)\",\"res.cert.issuer\":\"Issued by\",\"res.trust\":\"Confirm the certificate…\",\"live.host\":\"Server\",\"live.port\":\"Port\",\"live.connect\":\"Connect\",\"live.disconnect\":\"Disconnect\",\"live.openStream\":\"Open the stream\",\"live.invoke\":\"Call\",\"live.idle\":\"Not connected\",\"live.state.new\":\"Starting\",\"live.state.connecting\":\"Connecting…\",\"live.state.on\":\"Connected\",\"live.state.closed\":\"Closed\",\"live.subprotocol\":\"subprotocol {name}\",\"live.closesAt\":\"closes at {time} without a window\",\"live.tab.messages\":\"Messages\",\"live.tab.headers\":\"Headers\",\"live.tab.settings\":\"Settings\",\"live.tab.subscriptions\":\"Subscriptions\",\"live.tab.client\":\"Client\",\"live.tab.service\":\"Service\",\"live.tab.metadata\":\"Metadata\",\"live.filter\":\"Filter\",\"live.ping\":\"Ping\",\"live.halfClose\":\"End sending\",\"live.endStream\":\"End the stream\",\"live.clear\":\"Clear\",\"live.noMessages\":\"No messages yet.\",\"live.message\":\"Message\",\"live.format\":\"Format\",\"live.fmt.text\":\"Text\",\"live.fmt.json\":\"JSON\",\"live.fmt.hex\":\"Bytes (hex)\",\"live.fmt.base64\":\"Bytes (Base64)\",\"live.send\":\"Send\",\"live.save\":\"Keep this message\",\"live.unsave\":\"Forget it\",\"live.dir.in\":\"Received\",\"live.dir.out\":\"Sent\",\"live.dir.sys\":\"NetTest\",\"live.badHex\":\"Not valid hexadecimal bytes\",\"live.notConnected\":\"Not connected\",\"live.noAnswer\":\"No answer\",\"live.taken\":\"Opened in another window\",\"live.ws.protocols\":\"Subprotocols\",\"live.tls.servername\":\"Server name (SNI)\",\"live.mqtt.topic\":\"Topic\",\"live.mqtt.retain\":\"Retain\",\"live.mqtt.noTopic\":\"Write the topic to publish on\",\"live.mqtt.version\":\"Version\",\"live.mqtt.clientId\":\"Client ID\",\"live.mqtt.clientIdHint\":\"empty: one made up\",\"live.mqtt.keepalive\":\"Keep alive (seconds)\",\"live.mqtt.clean\":\"Clean start (no session kept by the broker)\",\"live.mqtt.subscribe\":\"Subscribe\",\"live.mqtt.unsubscribe\":\"Unsubscribe\",\"live.mqtt.subsHint\":\"The topics to receive (+ and # as wildcards): renewed every time the session connects.\",\"live.grpc.service\":\"Service\",\"live.grpc.method\":\"Method\",\"live.grpc.reflect\":\"From the server (reflection)\",\"live.grpc.fromProto\":\"From the .proto below\",\"live.grpc.proto\":\".proto file (optional)\",\"live.grpc.protoHint\":\"Paste the .proto when the server has no reflection; imports of other files are not followed.\",\"live.grpc.saved\":\"{service} / {method} (load the methods to change it)\",\"live.grpc.pick\":\"Choose the service and the method first (Service)\",\"live.grpc.metaKey\":\"Key\",\"live.grpc.metaHint\":\"Sent as the call’s metadata (HTTP/2 headers): authorization, x-api-key…\",\"live.grpcUnaryHint\":\"The request message, in JSON. Invoca sends it; checks and scripts work as for HTTP.\",\"folder.tab.overview\":\"General\",\"folder.tab.variables\":\"Variables\",\"folder.tab.auth\":\"Authorization\",\"folder.tab.scripts\":\"Scripts\",\"folder.counts\":{\"one\":\"1 request\",\"other\":\"{n} requests\"},\"folder.notes\":\"Notes\",\"folder.notesHint\":\"What it is for, how to use it…\",\"folder.collectionHint\":\"Its environments are in Environments (the gear next to the environment).\",\"folder.authHint\":\"The requests inside with «From the folder» use this.\",\"folder.scriptsHint\":\"They run for every request inside, before its own.\",\"run.title\":\"Run — {name}\",\"run.what\":\"What\",\"run.all\":\"The whole collection\",\"run.env\":\"Environment\",\"run.iterations\":\"Rounds\",\"run.data\":\"Data\",\"run.noData\":\"none (CSV or JSON: a round per row)\",\"run.dataRows\":{\"one\":\"{name}: 1 row\",\"other\":\"{name}: {n} rows\"},\"run.dropData\":\"No data file\",\"run.pickData\":\"Data file (CSV or JSON)\",\"run.badData\":\"Data file not readable\",\"run.delay\":\"Pause between requests (ms)\",\"run.stop\":\"Stop at the first failure\",\"run.keep\":\"Keep the variables the run changes (environment in use)\",\"run.start\":\"Run\",\"run.cancel\":\"Stop\",\"run.passed\":\"{n} passed\",\"run.failed\":\"{n} failed\",\"run.skipped\":\"{n} skipped\",\"run.cancelled\":\"Stopped\",\"run.done\":\"Done in {time}\",\"run.export\":\"Export the results\",\"run.openRequest\":\"Open the request\",\"run.failedTitle\":\"The run did not start\",\"import.title\":\"Import\",\"import.intro\":\"A collection or requests from Postman (v2), Insomnia, OpenAPI or Swagger, HAR, cURL commands, or a .nettest file.\",\"import.pick\":\"Choose a file…\",\"import.orPaste\":\"or paste it here\",\"import.paste\":\"Text to import\",\"import.placeholder\":\"curl https://api.example.com -H \\\"Accept: application/json\\\"\",\"import.hint\":\"The format is recognised by itself.\",\"import.detected\":\"Recognised: {format}\",\"import.unknown\":\"Format not recognised\",\"import.toFile\":\"As a new collection (a .nettest file)\",\"import.toMine\":\"As a folder of «My requests»\",\"import.do\":\"Import\",\"import.imported\":\"Imported\",\"import.failed\":\"Not imported\",\"import.doneNotes\":\"Imported, with a few notes\",\"import.secrets\":\"Give the secret values again in Environments: {names}\",\"import.format.postman\":\"Postman collection\",\"import.format.postman-env\":\"Postman environment\",\"import.format.insomnia\":\"Insomnia\",\"import.format.openapi\":\"OpenAPI 3\",\"import.format.swagger\":\"Swagger 2\",\"import.format.har\":\"HAR\",\"import.format.curl\":\"cURL\",\"import.format.nettest\":\"NetTest\",\"code.title\":\"Copy as code — {name}\",\"code.copy\":\"Copy\",\"code.copied\":\"Copied\",\"code.secrets\":\"Secret variables stay as {{name}}: they never leave lilOS.\",\"cookies.title\":\"Cookies\",\"cookies.hint\":\"The cookies servers set, sent again with the next requests to them (as a browser does).\",\"cookies.none\":\"No cookies.\",\"cookies.remove\":\"Remove\",\"cookies.removeAll\":\"Remove all of this server\",\"schedule.noScheduler\":\"The Scheduler is not installed\",\"schedule.needFile\":\"Save the collection first\",\"schedule.needFileText\":\"The kernel runs a .nettest file of your home, also with lilOS closed: save «My requests» as a collection, then schedule it.\",\"menu.needsModule\":\"{protocol} (install the {module} module)\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"NetTest\",\"@description\":\"Richieste ad API e servizi di rete, fatte dal kernel di lilOS: HTTP/REST e GraphQL con ambienti, variabili segrete, autenticazione, script e verifiche; sessioni WebSocket, SSE, gRPC, MQTT, TCP, TLS e UDP; collezioni eseguite in ordine o da Pianificazione.\",\"@entrypoints.main.params.file.label\":\"Collezione\",\"@entrypoints.main.params.file.description\":\"Una collezione di NetTest (.nettest) da aprire\",\"@entrypoints.filePreview.label\":\"Anteprime delle collezioni .nettest\",\"@dependencies.services-isolate.reason\":\"Script JavaScript prima e dopo le richieste, in un ambiente isolato\",\"@dependencies.call-grpc.reason\":\"Chiamate e flussi gRPC\",\"@dependencies.call-mqtt.reason\":\"Sessioni MQTT\",\"app.name\":\"NetTest\",\"ui.cancel\":\"Annulla\",\"mine.name\":\"Le mie richieste\",\"mine.where\":\"Tenuta in NetTest\",\"tools.new\":\"Nuova\",\"tools.import\":\"Importa\",\"tools.open\":\"Apri collezione\",\"tools.cookies\":\"Cookie\",\"tools.run\":\"Esegui\",\"tools.schedule\":\"Pianifica\",\"tools.save\":\"Salva\",\"tools.saveKeys\":\"Salva la collezione (Ctrl+S)\",\"tabs.label\":\"Richieste aperte\",\"tabs.new\":\"Nuova richiesta HTTP\",\"tabs.close\":\"Chiudi\",\"tabs.closeOthers\":\"Chiudi le altre\",\"side.collections\":\"Collezioni\",\"side.history\":\"Cronologia\",\"side.search\":\"Cerca\",\"side.resize\":\"Ridimensiona il pannello laterale\",\"side.unsaved\":\"Non salvata\",\"side.menu\":\"Menu\",\"side.firstRequest\":\"Aggiungi una richiesta\",\"side.clearHistory\":\"Svuota la cronologia\",\"side.noHistory\":\"Qui compaiono le richieste che mandi.\",\"side.historyGone\":\"Quella richiesta non c’è più\",\"menu.newRequest\":\"Nuova richiesta\",\"menu.newFolder\":\"Nuova cartella\",\"menu.newCollection\":\"Nuova collezione…\",\"menu.settings\":\"Impostazioni\",\"menu.environments\":\"Ambienti\",\"menu.run\":\"Esegui\",\"menu.schedule\":\"Pianifica…\",\"menu.save\":\"Salva\",\"menu.saveAs\":\"Salva con nome…\",\"menu.export\":\"Esporta per Postman…\",\"menu.close\":\"Chiudi\",\"menu.open\":\"Apri\",\"menu.rename\":\"Rinomina\",\"menu.duplicate\":\"Duplica\",\"menu.delete\":\"Elimina\",\"item.unnamed\":\"Richiesta senza nome\",\"item.unnamedFolder\":\"Cartella senza nome\",\"item.newName\":\"Nuova richiesta {protocol}\",\"item.name\":\"Nome\",\"item.folderName\":\"Nome della cartella\",\"item.newFolderName\":\"Nuova cartella\",\"item.collectionName\":\"Nome della collezione\",\"item.newCollectionName\":\"Nuova collezione\",\"item.copyOf\":\"{name} (copia)\",\"item.deleteRequest\":\"Eliminare «{name}»?\",\"item.deleteFolder\":\"Eliminare la cartella «{name}»?\",\"item.deleteFolderText\":\"Se ne vanno anche le richieste che contiene.\",\"file.missing\":\"Il file non c’è più\",\"file.invalid\":\"«{name}» non è una collezione di NetTest\",\"file.tooBig\":\"«{name}» è troppo grande\",\"file.whereTo\":\"Dove salvare\",\"file.saveFailed\":\"Non salvata\",\"file.saved\":\"Salvata in {path}\",\"file.exported\":\"Esportata in {path}\",\"file.unsavedTitle\":\"Salvare le modifiche a «{name}»?\",\"file.unsavedText\":\"Altrimenti vanno perse.\",\"file.unsavedMany\":{\"one\":\"Una collezione ha modifiche non salvate\",\"other\":\"{n} collezioni hanno modifiche non salvate\"},\"file.discard\":\"Non salvare\",\"file.saveAll\":\"Salva tutto\",\"empty.title\":\"Manda una richiesta\",\"empty.text\":\"La manda il kernel di lilOS: niente CORS, e arriva ai server che raggiunge il kernel. Scegli un protocollo per cominciare.\",\"empty.import\":\"…oppure importa una collezione da Postman, Insomnia, OpenAPI, HAR o cURL\",\"env.choose\":\"Ambiente\",\"env.manage\":\"Ambienti e variabili\",\"env.none\":\"Nessun ambiente\",\"env.of\":\"Ambiente di «{name}»\",\"env.title\":\"Ambienti — {name}\",\"env.environments\":\"Ambienti\",\"env.add\":\"Nuovo ambiente\",\"env.other\":\"Altre variabili\",\"env.collectionVars\":\"Della collezione\",\"env.globals\":\"Globali\",\"env.active\":\"in uso\",\"env.use\":\"Usalo\",\"env.newName\":\"Sviluppo\",\"env.deleteTitle\":\"Eliminare l’ambiente «{name}»?\",\"env.noneYet\":\"Ancora nessun ambiente: Sviluppo, Test, Produzione… ognuno con i suoi valori delle stesse variabili.\",\"env.secret.title\":\"Valore segreto di «{name}»\",\"env.secret.text\":\"lilOS lo sigilla subito: il file lo tiene cifrato, lo apri solo tu su questo lilOS, e nessuno lo vede più.\",\"env.secret.sealed\":\"•••• sigillato\",\"env.secret.missing\":\"nessun valore: clicca due volte il lucchetto per darne uno\",\"env.secret.dropTitle\":\"Rendere «{name}» una variabile normale?\",\"env.secret.dropText\":\"Il valore sigillato se ne va: ne scrivi uno nuovo, che resta visibile nel file.\",\"env.secret.needs\":\"Dai un valore a: {names} (i valori segreti non passano con il file)\",\"env.secret.hint\":\"Una variabile con il lucchetto è segreta: il valore è sigillato da lilOS e lo mette nella richiesta il kernel; richieste, script e cronologia lo mostrano come ••••.\",\"vars.name\":\"Variabile\",\"vars.value\":\"Valore\",\"vars.envHint\":\"Scrivi {{nome}} negli indirizzi, negli header, nei corpi e nell’autenticazione: lì va il valore dell’ambiente scelto.\",\"vars.collectionHint\":\"Le variabili della collezione: le stesse in ogni ambiente, e vincono quelle dell’ambiente.\",\"vars.globalsHint\":\"Per tutte le collezioni, tenute in NetTest (non nei file).\",\"vars.scope.environment\":\"nell’ambiente\",\"vars.scope.collection\":\"nella collezione\",\"vars.scope.globals\":\"globale\",\"req.method\":\"Metodo\",\"req.url\":\"Indirizzo\",\"req.send\":\"Invia\",\"req.cancel\":\"Ferma\",\"req.cancelled\":\"Fermata\",\"req.more\":\"Altro\",\"req.resize\":\"Ridimensiona richiesta e risposta\",\"req.unknownVars\":\"Nessun valore per: {names}\",\"req.tab.params\":\"Parametri\",\"req.tab.auth\":\"Autorizzazione\",\"req.tab.headers\":\"Header\",\"req.tab.body\":\"Corpo\",\"req.tab.graphql\":\"Query\",\"req.tab.scripts\":\"Script\",\"req.tab.checks\":\"Verifiche\",\"req.tab.settings\":\"Impostazioni\",\"req.param\":\"Parametro\",\"req.value\":\"Valore\",\"req.header\":\"Header\",\"req.field\":\"Campo\",\"req.paramsHint\":\"La query dell’indirizzo, riga per riga: cambiando l’una cambia l’altro.\",\"req.headersHint\":\"NetTest aggiunge User-Agent, Accept e Accept-Encoding quando mancano, e Cookie con i cookie che il server ha impostato.\",\"req.body.none\":\"Nessuno\",\"req.body.json\":\"JSON\",\"req.body.text\":\"Testo\",\"req.body.xml\":\"XML\",\"req.body.html\":\"HTML\",\"req.body.form\":\"Form\",\"req.body.multipart\":\"Multipart\",\"req.body.file\":\"File\",\"req.body.noneHint\":\"La richiesta {method} parte senza corpo.\",\"req.body.fieldType\":\"Tipo\",\"req.body.fieldText\":\"Testo\",\"req.body.fieldFile\":\"File\",\"req.body.fileHint\":\"Per un campo file, scrivi come valore il percorso della home (~/Documenti/foto.png), o sceglilo qui sotto.\",\"req.body.binaryHint\":\"Il file parte così com’è, con il Content-Type del suo tipo se un header non dice altro.\",\"req.body.format\":\"Formatta\",\"req.body.badJson\":\"JSON non valido: {error}\",\"req.file.choose\":\"Scegli…\",\"req.file.pick\":\"File da mandare\",\"req.file.none\":\"Nessun file\",\"req.file.missing\":\"Scegli di nuovo «{name}» (era nell’importazione)\",\"req.gql.query\":\"Query\",\"req.gql.variables\":\"Variabili (JSON)\",\"req.gql.schema\":\"Schema\",\"req.gql.filter\":\"Filtra i campi\",\"req.gql.noSchema\":\"Il server non ha dato il suo schema (introspezione spenta?)\",\"req.copyCode\":\"Copia come codice…\",\"req.duplicate\":\"Duplica\",\"req.schedule\":\"Pianifica questa richiesta…\",\"scripts.pre\":\"Prima della richiesta\",\"scripts.test\":\"Dopo la risposta\",\"scripts.snippets\":\"Aggiungi\",\"scripts.hint\":\"JavaScript, eseguito dal kernel in un ambiente isolato (niente rete, niente file), al massimo 5 secondi. `nt` (o `pm`, come in Postman): variabili, richiesta, risposta, test ed expect. Le variabili segrete si leggono come {{nome}}.\",\"scripts.snip.setVar\":\"Imposta una variabile dell’ambiente\",\"scripts.snip.timestamp\":\"Una variabile con l’ora di adesso\",\"scripts.snip.header\":\"Aggiungi un header\",\"scripts.snip.status\":\"Test: lo stato è 200\",\"scripts.snip.time\":\"Test: risponde in meno di 500 ms\",\"scripts.snip.json\":\"Test: il corpo ha un campo\",\"scripts.snip.save\":\"Salva un valore del corpo nell’ambiente\",\"checks.title\":\"Verifiche\",\"checks.add\":\"Aggiungi una verifica\",\"checks.remove\":\"Togli\",\"checks.enabled\":\"Attiva\",\"checks.value\":\"valore\",\"checks.src.status\":\"Stato\",\"checks.src.time\":\"Tempo (ms)\",\"checks.src.size\":\"Dimensione (byte)\",\"checks.src.header\":\"Header\",\"checks.src.json\":\"JSON\",\"checks.src.body\":\"Corpo\",\"checks.op.eq\":\"è\",\"checks.op.ne\":\"non è\",\"checks.op.lt\":\"minore di\",\"checks.op.le\":\"al massimo\",\"checks.op.gt\":\"maggiore di\",\"checks.op.ge\":\"almeno\",\"checks.op.contains\":\"contiene\",\"checks.op.notContains\":\"non contiene\",\"checks.op.exists\":\"esiste\",\"checks.op.notExists\":\"non esiste\",\"checks.op.matches\":\"corrisponde a (regex)\",\"checks.op.in\":\"è uno tra (a, b)\",\"checks.op.type\":\"è di tipo\",\"checks.op.empty\":\"è vuoto\",\"checks.op.notEmpty\":\"non è vuoto\",\"extract.title\":\"Salva in variabile\",\"extract.add\":\"Aggiungi\",\"extract.var\":\"variabile\",\"extract.hint\":\"Un valore della risposta tenuto per le richieste dopo (un token, un id): percorso JSON ($.data.id), header, o corpo con un’espressione regolare.\",\"set.timeout\":\"Tempo massimo (secondi)\",\"set.timeoutHint\":\"30 se vuoto\",\"set.redirects\":\"Reindirizzamenti\",\"set.follow\":\"Seguili\",\"set.version\":\"Versione HTTP\",\"set.version.auto\":\"Automatica (HTTP/2 se il server la offre)\",\"set.tls\":\"Certificato\",\"set.verify\":\"Controlla il certificato del server\",\"set.verifyHint\":\"Quando non è valido lilOS ti chiede di confermarlo (una volta per server).\",\"set.decode\":\"Compressione\",\"set.decodeLabel\":\"Decomprimi la risposta (gzip, br, deflate)\",\"set.cookies\":\"Cookie\",\"set.cookiesLabel\":\"Manda e tieni i cookie\",\"set.cert\":\"Certificato del client\",\"set.certHint\":\"PEM, per i server che chiedono chi sei (mTLS)\",\"set.key\":\"La sua chiave\",\"set.passphrase\":\"Password della chiave\",\"set.ca\":\"Altri certificati CA\",\"set.caHint\":\"PEM: l’autorità di una rete interna, considerata affidabile per questa richiesta\",\"set.maxBody\":\"Risposta più grande (MB)\",\"set.maxBodyHint\":\"20 se vuoto; quello che va oltre viene tagliato\",\"set.pickFile\":\"Scegli il file\",\"auth.type\":\"Tipo\",\"auth.type.inherit\":\"Dalla cartella\",\"auth.type.none\":\"Nessuna\",\"auth.type.basic\":\"Basic\",\"auth.type.bearer\":\"Token Bearer\",\"auth.type.apikey\":\"Chiave API\",\"auth.type.digest\":\"Digest\",\"auth.type.aws4\":\"Firma AWS v4\",\"auth.type.oauth2\":\"OAuth 2.0\",\"auth.user\":\"Utente\",\"auth.password\":\"Password\",\"auth.token\":\"Token\",\"auth.prefix\":\"Prefisso\",\"auth.useSecret\":\"Meglio una variabile segreta dell’ambiente ({{nome}}): il valore resterebbe in chiaro nel file\",\"auth.apikey.key\":\"Nome\",\"auth.apikey.value\":\"Valore\",\"auth.apikey.in\":\"Dove\",\"auth.apikey.header\":\"Header\",\"auth.apikey.query\":\"Query dell’indirizzo\",\"auth.aws.accessKey\":\"Chiave di accesso\",\"auth.aws.secretKey\":\"Chiave segreta\",\"auth.aws.sessionToken\":\"Token di sessione\",\"auth.aws.region\":\"Regione\",\"auth.aws.service\":\"Servizio\",\"auth.inherits\":\"Usa {type} di «{name}»\",\"auth.inheritsNone\":\"Usa quello che dicono le cartelle e la collezione\",\"auth.noneText\":\"La richiesta parte senza autorizzazione.\",\"auth.oauth.grant\":\"Concessione\",\"auth.oauth.grant.token\":\"Un token che ho\",\"auth.oauth.grant.authorization_code\":\"Accesso (codice + PKCE)\",\"auth.oauth.grant.client_credentials\":\"Credenziali del client\",\"auth.oauth.grant.password\":\"Utente e password\",\"auth.oauth.authorizeUrl\":\"Indirizzo di autorizzazione\",\"auth.oauth.tokenUrl\":\"Indirizzo del token\",\"auth.oauth.clientId\":\"ID del client\",\"auth.oauth.clientSecret\":\"Segreto del client\",\"auth.oauth.scope\":\"Ambito (scope)\",\"auth.oauth.audience\":\"Destinatario (audience)\",\"auth.oauth.send\":\"Le credenziali del client vanno\",\"auth.oauth.send.body\":\"nel corpo\",\"auth.oauth.send.basic\":\"in un header Basic\",\"auth.oauth.redirect\":\"Indirizzo di ritorno\",\"auth.oauth.redirect.lilos\":\"quello di lilOS (lascia vuoto)\",\"auth.oauth.redirect.hint\":\"Registra {url} presso il fornitore; oppure scrivi l’indirizzo che hai registrato lì, e incolla dove finisce la finestra.\",\"auth.oauth.signIn\":\"Accedi\",\"auth.oauth.forget\":\"Dimentica l’accesso\",\"auth.oauth.has\":\"Token {preview}, valido fino al {until}\",\"auth.oauth.expired\":\"Token {preview} scaduto il {until}\",\"auth.oauth.renews\":\"si rinnova da solo\",\"auth.oauth.none\":\"Accesso non ancora fatto\",\"auth.oauth.auto\":\"Il kernel chiede il token quando serve alla richiesta e lo tiene finché vale.\",\"auth.oauth.failed\":\"Accesso non riuscito\",\"auth.oauth.paste.title\":\"Dove è finita la finestra?\",\"auth.oauth.paste.text\":\"Dopo l’accesso il fornitore manda la finestra all’indirizzo che hai registrato. Copia qui tutto l’indirizzo di quella pagina.\",\"auth.oauth.paste.label\":\"Indirizzo\",\"res.label\":\"Risposta\",\"res.body\":\"Corpo della risposta\",\"res.empty\":\"Manda la richiesta per vedere qui la risposta.\",\"res.sending\":\"Invio…\",\"res.error\":\"Errore\",\"res.untrusted\":\"Certificato da confermare\",\"res.sizeWire\":\"{size} in rete (compressa)\",\"res.truncated\":\"tagliata\",\"res.passed\":{\"one\":\"{ok}/{n} riuscita\",\"other\":\"{ok}/{n} riuscite\"},\"res.redirects\":{\"one\":\"1 reindirizzamento\",\"other\":\"{n} reindirizzamenti\"},\"res.tab.body\":\"Corpo\",\"res.tab.headers\":\"Header\",\"res.tab.cookies\":\"Cookie\",\"res.tab.results\":\"Risultati\",\"res.tab.console\":\"Console\",\"res.tab.timing\":\"Tempi\",\"res.tab.request\":\"Richiesta inviata\",\"res.mode.pretty\":\"Formattato\",\"res.mode.raw\":\"Com’è arrivato\",\"res.mode.preview\":\"Anteprima\",\"res.copy\":\"Copia\",\"res.download\":\"Scarica\",\"res.preview\":\"Anteprima della pagina\",\"res.noBody\":\"Nessun corpo\",\"res.check\":\"Verifica\",\"res.noResults\":\"Nessuna verifica e nessun test: aggiungili in Verifiche o Script.\",\"res.noCookies\":\"La risposta non ha impostato cookie.\",\"res.noLogs\":\"Gli script non hanno scritto niente.\",\"res.phase.pre\":\"prima\",\"res.phase.test\":\"dopo\",\"res.cookie.name\":\"Nome\",\"res.cookie.value\":\"Valore\",\"res.cookie.domain\":\"Dominio\",\"res.cookie.path\":\"Percorso\",\"res.cookie.expires\":\"Scade\",\"res.cookie.flags\":\"Opzioni\",\"res.cookie.session\":\"con la sessione\",\"res.t.lookup\":\"DNS\",\"res.t.connect\":\"Connessione\",\"res.t.tls\":\"TLS\",\"res.t.wait\":\"Attesa\",\"res.t.download\":\"Scaricamento\",\"res.t.total\":\"Totale\",\"res.remote\":\"Server: {address}\",\"res.tlsError\":\"Certificato non valido: {error} (confermato da te)\",\"res.cert.issuer\":\"Rilasciato da\",\"res.trust\":\"Conferma il certificato…\",\"live.host\":\"Server\",\"live.port\":\"Porta\",\"live.connect\":\"Collega\",\"live.disconnect\":\"Scollega\",\"live.openStream\":\"Apri il flusso\",\"live.invoke\":\"Invoca\",\"live.idle\":\"Non collegato\",\"live.state.new\":\"Avvio\",\"live.state.connecting\":\"Collegamento…\",\"live.state.on\":\"Collegato\",\"live.state.closed\":\"Chiuso\",\"live.subprotocol\":\"sottoprotocollo {name}\",\"live.closesAt\":\"si chiude alle {time} senza finestra\",\"live.tab.messages\":\"Messaggi\",\"live.tab.headers\":\"Header\",\"live.tab.settings\":\"Impostazioni\",\"live.tab.subscriptions\":\"Iscrizioni\",\"live.tab.client\":\"Client\",\"live.tab.service\":\"Servizio\",\"live.tab.metadata\":\"Metadati\",\"live.filter\":\"Filtra\",\"live.ping\":\"Ping\",\"live.halfClose\":\"Chiudi l’invio\",\"live.endStream\":\"Chiudi il flusso\",\"live.clear\":\"Svuota\",\"live.noMessages\":\"Ancora nessun messaggio.\",\"live.message\":\"Messaggio\",\"live.format\":\"Formato\",\"live.fmt.text\":\"Testo\",\"live.fmt.json\":\"JSON\",\"live.fmt.hex\":\"Byte (esadecimale)\",\"live.fmt.base64\":\"Byte (Base64)\",\"live.send\":\"Invia\",\"live.save\":\"Tieni questo messaggio\",\"live.unsave\":\"Dimenticalo\",\"live.dir.in\":\"Ricevuto\",\"live.dir.out\":\"Inviato\",\"live.dir.sys\":\"NetTest\",\"live.badHex\":\"Byte esadecimali non validi\",\"live.notConnected\":\"Non collegato\",\"live.noAnswer\":\"Nessuna risposta\",\"live.taken\":\"Aperta in un’altra finestra\",\"live.ws.protocols\":\"Sottoprotocolli\",\"live.tls.servername\":\"Nome del server (SNI)\",\"live.mqtt.topic\":\"Topic\",\"live.mqtt.retain\":\"Conserva (retain)\",\"live.mqtt.noTopic\":\"Scrivi il topic su cui pubblicare\",\"live.mqtt.version\":\"Versione\",\"live.mqtt.clientId\":\"ID del client\",\"live.mqtt.clientIdHint\":\"vuoto: uno inventato\",\"live.mqtt.keepalive\":\"Keep alive (secondi)\",\"live.mqtt.clean\":\"Avvio pulito (nessuna sessione tenuta dal broker)\",\"live.mqtt.subscribe\":\"Iscriviti\",\"live.mqtt.unsubscribe\":\"Annulla l’iscrizione\",\"live.mqtt.subsHint\":\"I topic da ricevere (+ e # come jolly): rinnovati ogni volta che la sessione si collega.\",\"live.grpc.service\":\"Servizio\",\"live.grpc.method\":\"Metodo\",\"live.grpc.reflect\":\"Dal server (reflection)\",\"live.grpc.fromProto\":\"Dal .proto qui sotto\",\"live.grpc.proto\":\"File .proto (facoltativo)\",\"live.grpc.protoHint\":\"Incolla il .proto quando il server non ha la reflection; gli import di altri file non vengono seguiti.\",\"live.grpc.saved\":\"{service} / {method} (carica i metodi per cambiarlo)\",\"live.grpc.pick\":\"Scegli prima il servizio e il metodo (Servizio)\",\"live.grpc.metaKey\":\"Chiave\",\"live.grpc.metaHint\":\"Mandati come metadati della chiamata (header HTTP/2): authorization, x-api-key…\",\"live.grpcUnaryHint\":\"Il messaggio della richiesta, in JSON. Invoca lo manda; verifiche e script funzionano come per HTTP.\",\"folder.tab.overview\":\"Generale\",\"folder.tab.variables\":\"Variabili\",\"folder.tab.auth\":\"Autorizzazione\",\"folder.tab.scripts\":\"Script\",\"folder.counts\":{\"one\":\"1 richiesta\",\"other\":\"{n} richieste\"},\"folder.notes\":\"Note\",\"folder.notesHint\":\"A cosa serve, come si usa…\",\"folder.collectionHint\":\"I suoi ambienti sono in Ambienti (l’ingranaggio accanto all’ambiente).\",\"folder.authHint\":\"Le richieste dentro con «Dalla cartella» usano questa.\",\"folder.scriptsHint\":\"Girano per ogni richiesta dentro, prima dei suoi.\",\"run.title\":\"Esegui — {name}\",\"run.what\":\"Cosa\",\"run.all\":\"Tutta la collezione\",\"run.env\":\"Ambiente\",\"run.iterations\":\"Giri\",\"run.data\":\"Dati\",\"run.noData\":\"nessuno (CSV o JSON: un giro per riga)\",\"run.dataRows\":{\"one\":\"{name}: 1 riga\",\"other\":\"{name}: {n} righe\"},\"run.dropData\":\"Nessun file di dati\",\"run.pickData\":\"File di dati (CSV o JSON)\",\"run.badData\":\"File di dati non leggibile\",\"run.delay\":\"Pausa tra le richieste (ms)\",\"run.stop\":\"Fermati al primo errore\",\"run.keep\":\"Tieni le variabili cambiate dall’esecuzione (ambiente in uso)\",\"run.start\":\"Esegui\",\"run.cancel\":\"Ferma\",\"run.passed\":\"{n} riuscite\",\"run.failed\":\"{n} fallite\",\"run.skipped\":\"{n} saltate\",\"run.cancelled\":\"Fermata\",\"run.done\":\"Finita in {time}\",\"run.export\":\"Esporta i risultati\",\"run.openRequest\":\"Apri la richiesta\",\"run.failedTitle\":\"L’esecuzione non è partita\",\"import.title\":\"Importa\",\"import.intro\":\"Una collezione o delle richieste da Postman (v2), Insomnia, OpenAPI o Swagger, HAR, comandi cURL, o un file .nettest.\",\"import.pick\":\"Scegli un file…\",\"import.orPaste\":\"o incollalo qui\",\"import.paste\":\"Testo da importare\",\"import.placeholder\":\"curl https://api.example.com -H \\\"Accept: application/json\\\"\",\"import.hint\":\"Il formato si riconosce da solo.\",\"import.detected\":\"Riconosciuto: {format}\",\"import.unknown\":\"Formato non riconosciuto\",\"import.toFile\":\"Come nuova collezione (un file .nettest)\",\"import.toMine\":\"Come cartella di «Le mie richieste»\",\"import.do\":\"Importa\",\"import.imported\":\"Importata\",\"import.failed\":\"Non importata\",\"import.doneNotes\":\"Importata, con qualche nota\",\"import.secrets\":\"Dai di nuovo i valori segreti in Ambienti: {names}\",\"import.format.postman\":\"Collezione di Postman\",\"import.format.postman-env\":\"Ambiente di Postman\",\"import.format.insomnia\":\"Insomnia\",\"import.format.openapi\":\"OpenAPI 3\",\"import.format.swagger\":\"Swagger 2\",\"import.format.har\":\"HAR\",\"import.format.curl\":\"cURL\",\"import.format.nettest\":\"NetTest\",\"code.title\":\"Copia come codice — {name}\",\"code.copy\":\"Copia\",\"code.copied\":\"Copiato\",\"code.secrets\":\"Le variabili segrete restano {{nome}}: non escono mai da lilOS.\",\"cookies.title\":\"Cookie\",\"cookies.hint\":\"I cookie impostati dai server, rimandati con le richieste successive a loro (come fa un browser).\",\"cookies.none\":\"Nessun cookie.\",\"cookies.remove\":\"Togli\",\"cookies.removeAll\":\"Togli tutti quelli di questo server\",\"schedule.noScheduler\":\"Pianificazione non è installata\",\"schedule.needFile\":\"Prima salva la collezione\",\"schedule.needFileText\":\"Il kernel esegue un file .nettest della tua home, anche a lilOS chiuso: salva «Le mie richieste» come collezione, poi pianificala.\",\"menu.needsModule\":\"{protocol} (installa il modulo {module})\"}}")
}), se = [
	"inherit",
	"none",
	"basic",
	"bearer",
	"apikey",
	"digest",
	"aws4",
	"oauth2"
], ce = [
	"token",
	"authorization_code",
	"client_credentials",
	"password"
];
function le({ auth: e, onChange: t, inherit: n = !0, inherited: i = null, win: a }) {
	let l = o("div", { class: "nx-auth" }), u = () => t?.(), d = (e, t, n) => o("label", { class: "nx-frow" }, o("span", { class: "nx-flabel" }, e), o("span", { class: "nx-fval" }, t, n ? o("small", { class: "nx-hint" }, n) : null)), f = (t, { placeholder: n = "", password: r = !1, mono: i = !0 } = {}) => {
		let a = o("input", {
			class: `ctl-text nx-wide${i ? " mono" : ""}`,
			type: r ? "password" : "text",
			value: String(e[t] ?? ""),
			placeholder: n,
			spellcheck: "false",
			autocomplete: "off",
			oninput: () => {
				e[t] = a.value, c(), u();
			}
		}), s = o("small", {
			class: "nx-hint warn",
			hidden: !0
		}, O("auth.useSecret")), c = () => {
			s.hidden = !r || !a.value || /^\{\{[^{}]+\}\}$/.test(a.value.trim());
		};
		return c(), o("span", { class: "nx-fstack" }, a, s);
	}, p = (t, n, r) => {
		let i = o("select", {
			class: "ctl-select",
			onchange: () => {
				e[t] = i.value, u(), _();
			}
		}, ...n.map(([n, i]) => o("option", {
			value: n,
			selected: (e[t] ?? r) === n
		}, i)));
		return i;
	};
	function m() {
		let t = e.grant ?? "token", n = [d(O("auth.oauth.grant"), p("grant", ce.map((e) => [e, O(`auth.oauth.grant.${e}`)]), "token"))];
		if (t === "token") n.push(d(O("auth.token"), f("token", {
			placeholder: "{{accessToken}}",
			password: !0
		})));
		else if (t === "authorization_code" && n.push(d(O("auth.oauth.authorizeUrl"), f("authorizeUrl", { placeholder: "https://login.example.com/oauth2/authorize" }))), n.push(d(O("auth.oauth.tokenUrl"), f("tokenUrl", { placeholder: "https://login.example.com/oauth2/token" }))), n.push(d(O("auth.oauth.clientId"), f("clientId"))), n.push(d(O("auth.oauth.clientSecret"), f("clientSecret", {
			password: !0,
			placeholder: "{{clientSecret}}"
		}))), n.push(d(O("auth.oauth.scope"), f("scope", { placeholder: "read write" }))), n.push(d(O("auth.oauth.audience"), f("audience"))), t === "password" && (n.push(d(O("auth.user"), f("username"))), n.push(d(O("auth.password"), f("password", { password: !0 })))), n.push(d(O("auth.oauth.send"), p("send", [["body", O("auth.oauth.send.body")], ["basic", O("auth.oauth.send.basic")]], "body"))), t === "authorization_code") {
			n.push(d(O("auth.oauth.redirect"), f("redirectUri", { placeholder: O("auth.oauth.redirect.lilos") }), O("auth.oauth.redirect.hint", { url: `${location.origin}/api/calls/oauth/callback` })));
			let t = e.tokenInfo, r = o("span", { class: "nx-oauth-state" }, t ? [
				s(t.expires > Date.now() ? "check" : "warning"),
				O(t.expires > Date.now() ? "auth.oauth.has" : "auth.oauth.expired", {
					preview: t.preview,
					until: new Date(t.expires).toLocaleString()
				}),
				t.refresh ? ` · ${O("auth.oauth.renews")}` : ""
			] : O("auth.oauth.none"));
			n.push(d("", o("span", { class: "nx-oauth" }, o("button", {
				type: "button",
				class: "ctl-btn primary",
				onclick: (e) => h(e.currentTarget)
			}, s("user"), O("auth.oauth.signIn")), e.tokens ? o("button", {
				type: "button",
				class: "ctl-btn",
				onclick: () => {
					delete e.tokens, delete e.tokenInfo, u(), _();
				}
			}, O("auth.oauth.forget")) : null, r)));
		} else n.push(d("", o("small", { class: "nx-hint" }, O("auth.oauth.auto"))));
		return n.push(d(O("auth.prefix"), f("prefix", { placeholder: "Bearer" }))), n;
	}
	async function h(t) {
		let n = Object.fromEntries([
			"authorizeUrl",
			"tokenUrl",
			"clientId",
			"clientSecret",
			"scope",
			"audience",
			"send",
			"redirectUri"
		].map((t) => [t, e[t] ?? ""]));
		t.disabled = !0;
		try {
			let t;
			t = n.redirectUri.trim() ? await r.signIn(n, { askAddress: async (e) => {
				let t = await c(a, {
					title: O("auth.oauth.paste.title"),
					text: e ? `${O("auth.oauth.paste.text")}\n\n${e}` : O("auth.oauth.paste.text"),
					fields: [{
						name: "url",
						label: O("auth.oauth.paste.label"),
						placeholder: n.redirectUri,
						required: !0
					}],
					buttons: ["cancel", "ok"]
				});
				return t?.button === "ok" ? t.values.url : null;
			} }) : await r.signIn(n), e.tokens = t.sealed, e.tokenInfo = {
				expires: t.expires,
				scope: t.scope,
				preview: t.preview,
				refresh: t.refresh
			}, u(), _();
		} catch (e) {
			e?.code !== "canceled" && c(a, {
				icon: "error",
				title: O("auth.oauth.failed"),
				text: e.message
			});
		} finally {
			t.disabled = !1;
		}
	}
	function g() {
		switch (e.type) {
			case "basic":
			case "digest": return [d(O("auth.user"), f("user")), d(O("auth.password"), f("password", {
				password: !0,
				placeholder: "{{password}}"
			}))];
			case "bearer": return [d(O("auth.token"), f("token", {
				password: !0,
				placeholder: "{{token}}"
			})), d(O("auth.prefix"), f("prefix", { placeholder: "Bearer" }))];
			case "apikey": return [
				d(O("auth.apikey.key"), f("key", { placeholder: "X-Api-Key" })),
				d(O("auth.apikey.value"), f("value", {
					password: !0,
					placeholder: "{{apiKey}}"
				})),
				d(O("auth.apikey.in"), p("in", [["header", O("auth.apikey.header")], ["query", O("auth.apikey.query")]], "header"))
			];
			case "aws4": return [
				d(O("auth.aws.accessKey"), f("accessKey")),
				d(O("auth.aws.secretKey"), f("secretKey", {
					password: !0,
					placeholder: "{{awsSecret}}"
				})),
				d(O("auth.aws.sessionToken"), f("sessionToken", { password: !0 })),
				d(O("auth.aws.region"), f("region", { placeholder: "eu-south-1" })),
				d(O("auth.aws.service"), f("service", { placeholder: "execute-api" }))
			];
			case "oauth2": return m();
			case "inherit": {
				let e = i?.();
				return [o("p", { class: "nx-hint" }, e ? O("auth.inherits", {
					type: O(`auth.type.${e.auth.type ?? "none"}`),
					name: e.name
				}) : O("auth.inheritsNone"))];
			}
			default: return [o("p", { class: "nx-hint" }, O("auth.noneText"))];
		}
	}
	function _() {
		let t = se.filter((e) => n || e !== "inherit");
		t.includes(e.type) || (e.type = n ? "inherit" : "none");
		let r = o("select", {
			class: "ctl-select",
			"aria-label": O("auth.type"),
			onchange: () => {
				e.type = r.value, u(), _();
			}
		}, ...t.map((t) => o("option", {
			value: t,
			selected: e.type === t
		}, O(`auth.type.${t}`))));
		l.replaceChildren(d(O("auth.type"), r), ...g());
	}
	return _(), {
		el: l,
		draw: _
	};
}
// src/nettest/model.js
var ue = "nettest", de = "nettest", fe = [
	{
		id: "http",
		label: "HTTP",
		live: !1
	},
	{
		id: "graphql",
		label: "GraphQL",
		live: !1
	},
	{
		id: "ws",
		label: "WebSocket",
		live: !0
	},
	{
		id: "sse",
		label: "SSE",
		live: !0
	},
	{
		id: "grpc",
		label: "gRPC",
		live: !1,
		module: "call-grpc"
	},
	{
		id: "mqtt",
		label: "MQTT",
		live: !0,
		module: "call-mqtt"
	},
	{
		id: "tcp",
		label: "TCP",
		live: !0
	},
	{
		id: "tls",
		label: "TLS",
		live: !0
	},
	{
		id: "udp",
		label: "UDP",
		live: !0
	}
], k = (e) => fe.find((t) => t.id === e) ?? fe[0], pe = [
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
	"HEAD",
	"OPTIONS"
], A = () => [...crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(8))].map((e) => (e % 36).toString(36)).join(""), me = {
	http: "https://",
	graphql: "https://",
	ws: "wss://",
	sse: "https://",
	grpc: "grpc://",
	mqtt: "mqtt://"
};
function he(e = "http", t = "") {
	let n = k(e).id, r = {
		id: A(),
		type: "request",
		name: t,
		protocol: n,
		method: n === "graphql" ? "POST" : "GET",
		url: me[n] ?? "",
		headers: [],
		body: {
			kind: n === "graphql" ? "graphql" : "none",
			text: "",
			fields: [],
			query: "",
			variables: ""
		},
		auth: { type: "inherit" },
		settings: {},
		checks: [],
		extract: [],
		scripts: {
			pre: "",
			test: ""
		},
		values: {}
	};
	return (n === "tcp" || n === "tls" || n === "udp") && (r.values = {
		host: "",
		port: ""
	}), n === "mqtt" && (r.values = {
		version: "5",
		clean: !0,
		keepalive: 60,
		clientId: "",
		username: "",
		password: "",
		subscriptions: []
	}), n === "grpc" && (r.values = {
		service: "",
		method: "",
		message: "{\n  \n}",
		proto: "",
		metadata: []
	}), n === "ws" && (r.values = { protocols: "" }), (k(n).live || n === "grpc") && (r.messages = []), r;
}
var j = (e = "") => ({
	id: A(),
	type: "folder",
	name: e,
	items: [],
	auth: { type: "inherit" },
	scripts: {
		pre: "",
		test: ""
	}
});
function M(e) {
	return {
		format: ue,
		version: 1,
		name: e,
		variables: [],
		auth: { type: "none" },
		scripts: {
			pre: "",
			test: ""
		},
		environments: [],
		items: []
	};
}
function N(e, t, n = []) {
	for (let r of e ?? []) if (t(r, e, n) === !1 || r.type === "folder" && N(r.items, t, [...n, r]) === !1) return !1;
	return !0;
}
function P(e, t) {
	let n = null;
	return N(e.items, (e, r, i) => e.id !== t || (n = {
		item: e,
		list: r,
		parents: i
	}, !1)), n;
}
function F(e) {
	let t = structuredClone(e);
	return t.id = A(), t.type === "folder" && (t.items = t.items.map(F)), t;
}
function ge(e, t) {
	let n = P(e, t), r = (e) => ({
		auth: e.auth ?? { type: "inherit" },
		scripts: e.scripts ?? {}
	});
	return [r(e), ...(n?.parents ?? []).map(r)];
}
function I(e, t) {
	let n = P(e, t);
	if (!n) return {
		auth: { type: "none" },
		from: null
	};
	if (n.item.auth?.type && n.item.auth.type !== "inherit") return {
		auth: n.item.auth,
		from: null
	};
	for (let e of [...n.parents].reverse()) if (e.auth?.type && e.auth.type !== "inherit") return {
		auth: e.auth,
		from: e
	};
	return {
		auth: e.auth ?? { type: "none" },
		from: e
	};
}
var L = (e) => Array.isArray(e) ? e.filter((e) => e && typeof e == "object") : [], R = (e) => typeof e == "string" ? e : e == null ? "" : String(e);
function z(e) {
	if (String(e).length > 33554432) throw Error("file.tooBig");
	let t;
	try {
		t = JSON.parse(String(e));
	} catch {
		throw Error("file.invalid");
	}
	if (!t || typeof t != "object" || t.format !== "nettest" || !Array.isArray(t.items)) throw Error("file.invalid");
	let n = M(R(t.name));
	n.variables = L(t.variables).map((e) => ({
		key: R(e.key),
		value: R(e.value),
		enabled: e.enabled !== !1
	})), n.auth = t.auth && typeof t.auth == "object" ? t.auth : { type: "none" }, n.scripts = {
		pre: R(t.scripts?.pre),
		test: R(t.scripts?.test)
	}, n.environments = L(t.environments).map((e) => ({
		id: R(e.id) || A(),
		name: R(e.name) || "—",
		variables: L(e.variables).map((e) => ({
			key: R(e.key),
			value: e.secret ? "" : R(e.value),
			secret: e.secret === !0,
			...e.secret && typeof e.sealed == "string" && { sealed: e.sealed },
			enabled: e.enabled !== !1
		}))
	}));
	let r = (e) => L(e).map((e) => {
		if (e.type === "folder") return {
			...j(R(e.name)),
			...e,
			id: R(e.id) || A(),
			items: r(e.items)
		};
		let t = he(k(e.protocol).id, R(e.name));
		return {
			...t,
			...e,
			id: R(e.id) || A(),
			type: "request",
			headers: L(e.headers),
			checks: L(e.checks),
			extract: L(e.extract),
			body: {
				...t.body,
				...e.body && typeof e.body == "object" ? e.body : {}
			},
			scripts: {
				pre: R(e.scripts?.pre),
				test: R(e.scripts?.test)
			},
			values: {
				...t.values,
				...e.values && typeof e.values == "object" ? e.values : {}
			}
		};
	});
	return n.items = r(t.items), n;
}
function B(e) {
	let t = {
		...e,
		environments: (e.environments ?? []).map((e) => ({
			...e,
			variables: e.variables.map((e) => e.secret ? {
				key: e.key,
				value: "",
				secret: !0,
				...e.sealed && { sealed: e.sealed },
				enabled: e.enabled !== !1
			} : {
				key: e.key,
				value: e.value,
				enabled: e.enabled !== !1
			})
		}))
	};
	return `${JSON.stringify(t, null, 2)}\n`;
}
var V = (e) => Object.fromEntries(L(e).filter((e) => e.enabled !== !1 && e.key && !e.secret).map((e) => [e.key, R(e.value)]));
function H(e) {
	if (!e) return {
		values: {},
		secrets: {}
	};
	let t = L(e.variables).filter((e) => e.enabled !== !1 && e.key);
	return {
		values: V(t),
		secrets: Object.fromEntries(t.filter((e) => e.secret && e.sealed).map((e) => [e.key, e.sealed]))
	};
}
function U(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	for (let [i, a] of [
		["globals", n],
		["collection", e?.variables],
		["environment", t?.variables]
	]) for (let e of L(a)) e.key && e.enabled !== !1 && r.set(e.key, {
		key: e.key,
		value: e.secret ? "" : R(e.value),
		scope: i,
		secret: !!e.secret
	});
	return [...r.values()];
}
var _e = () => ({
	id: A(),
	enabled: !0,
	source: "status",
	path: "",
	op: "eq",
	value: "200"
}), ve = () => ({
	id: A(),
	enabled: !0,
	var: "",
	source: "json",
	path: "",
	scope: "environment"
});
function W(e) {
	let t = R(e).indexOf("?");
	if (t < 0) return [];
	let n = R(e).indexOf("#", t), r = R(e).slice(t + 1, n < 0 ? void 0 : n);
	return r ? r.split("&").map((e) => {
		let t = e.indexOf("="), n = (e) => {
			try {
				return decodeURIComponent(e.replace(/\+/g, " "));
			} catch {
				return e;
			}
		};
		return {
			key: n(t < 0 ? e : e.slice(0, t)),
			value: t < 0 ? "" : n(e.slice(t + 1)),
			enabled: !0
		};
	}) : [];
}
function ye(e, t) {
	let n = R(e), r = n.indexOf("?"), i = n.indexOf("#", r < 0 ? 0 : r), a = r < 0 ? i < 0 ? n : n.slice(0, i) : n.slice(0, r), o = (e) => R(e).replace(/[%&#=+ ]/g, (e) => e === " " ? "%20" : encodeURIComponent(e)), s = t.filter((e) => e.enabled !== !1 && (e.key || e.value)).map((e) => e.value === "" ? o(e.key) : `${o(e.key)}=${o(e.value)}`).join("&");
	return `${a}${s ? `?${s}` : ""}${i < 0 ? "" : n.slice(i)}`;
}
var be = (e) => [...R(e).matchAll(/\{\{\s*([^{}\s][^{}]*?)\s*\}\}/g)].map((e) => e[1]);
function G(e, t) {
	let n = new Map(t.filter((e) => !e.secret).map((e) => [e.key, e.value])), r = R(e);
	for (let e = 0; e < 5; e++) {
		let e = r.replace(/\{\{\s*([^{}\s][^{}]*?)\s*\}\}/g, (e, t) => n.has(t) ? n.get(t) : e);
		if (e === r) break;
		r = e;
	}
	return r;
}
// src/nettest/store.js
var K = "mine", xe = 200, q = {
	mine: "nettest.mine",
	open: "nettest.open",
	history: "nettest.history",
	globals: "nettest.globals",
	env: "nettest.env",
	cookies: "nettest.cookies"
}, Se = class extends t {
	collections = /* @__PURE__ */ new Map();
	#e = !1;
	#t = 0;
	load() {
		if (this.#e) return;
		this.#e = !0;
		let e = null;
		try {
			e = f.get(q.mine, null) ? z(JSON.stringify(f.get(q.mine))) : null;
		} catch {
			e = null;
		}
		this.collections.set(K, {
			key: K,
			file: null,
			data: e ?? M(O("mine.name")),
			dirty: !1
		});
		for (let e of f.get(q.open, [])) typeof e == "string" && this.openFile(e, { quiet: !0 }).catch(() => {});
		a.on("change", (e) => {
			if (e.type === "remove") for (let t of e.ids ?? [e.node?.id]) this.collections.has(t) && this.close(t);
			e.type === "rename" && this.collections.has(e.node?.id) && this.emit("collections");
		});
	}
	get list() {
		return [...this.collections.values()];
	}
	get(e) {
		return this.collections.get(e) ?? null;
	}
	nameOf(e) {
		return e.key === K ? O("mine.name") : e.data.name || a.get(e.file)?.name.replace(/\.nettest$/i, "") || "—";
	}
	#n() {
		f.set(q.open, this.list.filter((e) => e.file).map((e) => e.file));
	}
	async openFile(e, { quiet: t = !1 } = {}) {
		if (this.collections.has(e)) return this.collections.get(e);
		let n = a.get(e);
		if (n?.type !== "file") throw Error(O("file.missing"));
		let r;
		try {
			r = z(await a.read(e));
		} catch (e) {
			throw Error(O(e.message.startsWith("file.") ? e.message : "file.invalid", { name: n.name }));
		}
		r.name || (r.name = n.name.replace(/\.nettest$/i, ""));
		let i = {
			key: e,
			file: e,
			data: r,
			dirty: !1
		};
		return this.collections.set(e, i), this.#n(), t ? queueMicrotask(() => this.emit("collections")) : this.emit("collections"), i;
	}
	async createFile(e, t, n = M(t)) {
		let r = a.cleanName(t, { portable: !0 }).slice(0, 80).trim() || "NetTest", i = a.create(e, {
			type: "file",
			name: `${r}.${de}`
		});
		n.name ||= r, await a.write(i.id, B(n));
		let o = {
			key: i.id,
			file: i.id,
			data: n,
			dirty: !1
		};
		return this.collections.set(i.id, o), this.#n(), this.emit("collections"), o;
	}
	close(e) {
		e !== K && (this.collections.delete(e), this.#n(), this.emit("collections"));
	}
	touch(e) {
		let t = this.collections.get(e);
		t && (e === K ? (clearTimeout(this.#t), this.#t = setTimeout(() => f.set(q.mine, JSON.parse(B(t.data))), 400)) : t.dirty || (t.dirty = !0, this.emit("collections")), this.emit("change", e));
	}
	async save(e) {
		let t = this.collections.get(e);
		if (t) {
			if (!t.file) return this.touch(e);
			if (!a.get(t.file)) throw Error(O("file.missing"));
			await a.write(t.file, B(t.data)), t.dirty = !1, this.emit("collections");
		}
	}
	async saveAs(e, t, n) {
		let r = this.collections.get(e), i = structuredClone(r.data);
		return i.name = n, this.createFile(t, n, i);
	}
	get history() {
		let e = f.get(q.history, []);
		return Array.isArray(e) ? e : [];
	}
	addHistory(e) {
		f.set(q.history, [e, ...this.history].slice(0, xe)), this.emit("history");
	}
	clearHistory() {
		f.set(q.history, []), this.emit("history");
	}
	get globals() {
		let e = f.get(q.globals, []);
		return Array.isArray(e) ? e : [];
	}
	setGlobals(e) {
		f.set(q.globals, e.map((e) => ({
			key: String(e.key ?? ""),
			value: String(e.value ?? ""),
			enabled: e.enabled !== !1
		}))), this.emit("globals");
	}
	envId(e) {
		let t = f.get(q.env, {})?.[e] ?? null;
		return this.get(e)?.data.environments.some((e) => e.id === t) ? t : null;
	}
	env(e) {
		let t = this.envId(e);
		return t ? this.get(e).data.environments.find((e) => e.id === t) : null;
	}
	setEnv(e, t) {
		f.set(q.env, {
			...f.get(q.env, {}),
			[e]: t
		}), this.emit("env", e);
	}
	get cookies() {
		let e = f.get(q.cookies, {});
		return e && typeof e == "object" ? e : {};
	}
	setCookies(e) {
		f.set(q.cookies, e), this.emit("cookies");
	}
}, J = K, Y = new Se(), Ce = 100;
function we(e) {
	let [t, ...n] = String(e).split(";"), r = t.indexOf("=");
	if (r < 1) return null;
	let i = {
		name: t.slice(0, r).trim(),
		value: t.slice(r + 1).trim(),
		secure: !1,
		httpOnly: !1
	};
	for (let e of n) {
		let [t, ...n] = e.split("="), r = t.trim().toLowerCase(), a = n.join("=").trim();
		if (r === "domain" && a) i.domain = a.replace(/^\./, "").toLowerCase();
		else if (r === "path" && a.startsWith("/")) i.path = a;
		else if (r === "expires") {
			let e = Date.parse(a);
			Number.isNaN(e) || (i.expires ??= e);
		} else r === "max-age" && /^-?\d+$/.test(a) ? i.expires = Date.now() + Number(a) * 1e3 : r === "secure" ? i.secure = !0 : r === "httponly" ? i.httpOnly = !0 : r === "samesite" && (i.sameSite = a);
	}
	return i;
}
var Te = (e) => {
	let t = e.pathname || "/", n = t.lastIndexOf("/");
	return n <= 0 ? "/" : t.slice(0, n);
}, Ee = (e, t) => e === t || e.endsWith(`.${t}`), De = (e, t) => e === t || e.startsWith(t.endsWith("/") ? t : `${t}/`);
function Oe(e, t) {
	let n;
	try {
		n = new URL(e);
	} catch {
		return;
	}
	let r = (t ?? []).filter(([e]) => e.toLowerCase() === "set-cookie").map(([, e]) => we(e)).filter(Boolean);
	if (!r.length) return;
	let i = Y.cookies, a = n.hostname.toLowerCase();
	for (let e of r) {
		let t = e.domain && e.domain.includes(".") && Ee(a, e.domain) ? e.domain : a;
		if (t === "__proto__" || t === "constructor" || t === "prototype") continue;
		let r = Object.hasOwn(i, t) ? i[t] : {}, o = `${e.name}|${e.path ?? Te(n)}`;
		e.expires !== void 0 && e.expires <= Date.now() ? delete r[o] : r[o] = {
			name: e.name,
			value: e.value,
			path: e.path ?? Te(n),
			expires: e.expires ?? null,
			secure: e.secure,
			hostOnly: !e.domain
		};
		let s = Object.keys(r);
		for (let e of s.slice(0, Math.max(0, s.length - Ce))) delete r[e];
		Object.keys(r).length ? i[t] = r : delete i[t];
	}
	Y.setCookies(i);
}
function ke(e) {
	let t;
	try {
		t = new URL(e);
	} catch {
		return "";
	}
	let n = t.hostname.toLowerCase(), r = Date.now(), i = [];
	for (let [e, a] of Object.entries(Y.cookies)) if (Ee(n, e)) for (let o of Object.values(a)) o.hostOnly && n !== e || o.expires && o.expires <= r || o.secure && t.protocol !== "https:" || De(t.pathname || "/", o.path) && i.push(`${o.name}=${o.value}`);
	return i.join("; ");
}
var Ae = () => Object.entries(Y.cookies).flatMap(([e, t]) => Object.entries(t).map(([t, n]) => ({
	domain: e,
	key: t,
	...n
})));
function je(e, t) {
	let n = Y.cookies;
	n[e] && (t ? delete n[e][t] : delete n[e], n[e] && !Object.keys(n[e]).length && delete n[e], Y.setCookies(n));
}
// src/nettest/response.js
var Me = [
	"body",
	"headers",
	"cookies",
	"results",
	"console",
	"timing",
	"request"
], Ne = /^image\/(png|jpe?g|gif|webp|svg\+xml|avif|bmp|x-icon)/i, Pe = (e) => e >= 500 ? "s5" : e >= 400 ? "s4" : e >= 300 ? "s3" : e >= 200 ? "s2" : "s1", X = (e) => e == null ? "—" : e < 1e3 ? `${Math.round(e)} ms` : `${(e / 1e3).toFixed(2)} s`, Fe = (e, t) => e.find(([e]) => e.toLowerCase() === t)?.[1] ?? "";
function Ie(e) {
	let t = e.response, n = Uint8Array.from(atob(t.body ?? ""), (e) => e.charCodeAt(0)), r = Fe(t.headers ?? [], "content-type"), i = new TextDecoder("utf-8", { fatal: !1 }).decode(n), a;
	if (/json/i.test(r) || /^\s*[[{]/.test(i)) try {
		a = JSON.parse(i);
	} catch {
		a = void 0;
	}
	let o = !a && /[\u0000-\u0008\u000e-\u001f]/.test(i.slice(0, 2e3)) && !/^text\//i.test(r), s = a === void 0 ? /xml|html/i.test(r) ? "html" : /javascript/i.test(r) ? "javascript" : /css/i.test(r) ? "css" : "text" : "json";
	return {
		bytes: n,
		type: r,
		text: i,
		json: a,
		binary: o,
		lang: s
	};
}
function Le(e, t = 65536) {
	let n = [];
	for (let r = 0; r < Math.min(e.length, t); r += 16) {
		let t = [...e.subarray(r, r + 16)];
		n.push(`${r.toString(16).padStart(8, "0")}  ${t.map((e) => e.toString(16).padStart(2, "0")).join(" ").padEnd(47)}  ${t.map((e) => e >= 32 && e < 127 ? String.fromCharCode(e) : ".").join("")}`);
	}
	return n.join("\n") + (e.length > t ? `\n… ${i(e.length - t)}` : "");
}
function Re({ onTrust: e } = {}) {
	let t = "body", n = "pretty", r = null, a = null, c = null, l = o("div", { class: "nx-resbar" }), u = o("div", {
		class: "nx-subtabs",
		role: "tablist"
	}), d = o("div", { class: "nx-respane" }), f = o("section", {
		class: "nx-response",
		"aria-label": O("res.label")
	}, l, u, d), p = D({
		readOnly: !0,
		label: O("res.body"),
		minLines: 6
	});
	function m() {
		if (!r) return l.replaceChildren(o("span", { class: "nx-dim" }, O("res.empty")));
		let e = r.response, n = [];
		if (r.error && n.push(o("span", { class: "nx-pill s5" }, s("error"), r.error.code === "untrusted" ? O("res.untrusted") : O("res.error"))), e) {
			n.push(o("span", { class: `nx-pill ${Pe(e.status)}` }, `${e.status} ${e.statusText ?? ""}`.trim()));
			let t = e.timings ?? {};
			n.push(o("span", {
				class: "nx-metric",
				title: h(t)
			}, s("clock"), X(t.total))), n.push(o("span", {
				class: "nx-metric",
				title: e.received && e.received !== e.size ? O("res.sizeWire", { size: i(e.received) }) : ""
			}, s("download"), i(e.size ?? 0))), e.httpVersion && n.push(o("span", { class: "nx-metric" }, `HTTP/${e.httpVersion}`)), e.tls?.protocol && n.push(o("span", {
				class: "nx-metric",
				title: `${e.tls.cipher ?? ""}\n${e.tls.subject ?? ""}`
			}, s("lock"), e.tls.protocol)), e.truncated && n.push(o("span", { class: "nx-pill s4" }, O("res.truncated")));
		}
		let a = [...r.checks.filter((e) => !e.ok), ...r.tests.filter((e) => e.ok === !1)].length, c = r.checks.length + r.tests.length;
		c && n.push(o("button", {
			type: "button",
			class: `nx-pill ${a ? "s5" : "s2"} link`,
			onclick: () => {
				t = "results", S();
			}
		}, s(a ? "warning" : "check"), O("res.passed", {
			ok: c - a,
			n: c
		}))), r.redirects?.length && n.push(o("span", {
			class: "nx-metric",
			title: r.redirects.map((e) => `${e.status} ${e.url}`).join("\n")
		}, O("res.redirects", { n: r.redirects.length }))), l.replaceChildren(...n);
	}
	function h(e) {
		let t = [
			["lookup", "res.t.lookup"],
			["connect", "res.t.connect"],
			["secure", "res.t.tls"],
			["firstByte", "res.t.wait"],
			["done", "res.t.download"]
		], n = 0;
		return t.filter(([t]) => e[t] !== null && e[t] !== void 0).map(([t, r]) => {
			let i = e[t] - n;
			return n = e[t], `${O(r)}: ${X(i)}`;
		}).join("\n");
	}
	let g = (e) => {
		let n = e === "headers" ? r?.response?.headers?.length : e === "console" ? r?.logs?.length : e === "results" ? (r?.checks?.length ?? 0) + (r?.tests?.length ?? 0) : e === "cookies" ? _().length : 0;
		return o("button", {
			type: "button",
			role: "tab",
			"aria-selected": String(t === e),
			class: t === e ? "on" : "",
			onclick: () => {
				t = e, S();
			}
		}, O(`res.tab.${e}`), n ? o("span", { class: "nx-count" }, String(n)) : null);
	}, _ = () => (r?.response?.headers ?? []).filter(([e]) => e.toLowerCase() === "set-cookie").map(([, e]) => we(e)).filter(Boolean);
	function v() {
		if (!r?.response) return [o("p", { class: "nx-dim" }, r?.error ? "" : O("res.noBody"))];
		a ??= Ie(r);
		let e = o("div", { class: "nx-modes" }, ...[
			"pretty",
			"raw",
			"preview"
		].map((e) => o("button", {
			type: "button",
			class: n === e ? "on" : "",
			onclick: () => {
				n = e, S();
			}
		}, O(`res.mode.${e}`))), o("span", { class: "nx-grow" }), o("button", {
			type: "button",
			class: "nx-icon",
			title: O("res.copy"),
			onclick: () => navigator.clipboard?.writeText(a.text)
		}, s("code")), o("button", {
			type: "button",
			class: "nx-icon",
			title: O("res.download"),
			onclick: y
		}, s("download")));
		if (n === "preview") {
			if (Ne.test(a.type)) {
				let t = URL.createObjectURL(new Blob([a.bytes], { type: a.type }));
				return c?.(), c = () => URL.revokeObjectURL(t), [e, o("div", { class: "nx-preview img" }, o("img", {
					src: t,
					alt: ""
				}))];
			}
			if (/html/i.test(a.type)) return [e, o("iframe", {
				class: "nx-preview",
				sandbox: "",
				referrerpolicy: "no-referrer",
				srcdoc: `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:">${a.text}`,
				title: O("res.preview")
			})];
		}
		return a.binary ? (p.setLang("text"), p.setValue(Le(a.bytes))) : n === "pretty" && a.json !== void 0 ? (p.setLang("json"), p.setValue(JSON.stringify(a.json, null, 2))) : (p.setLang(n === "raw" ? "text" : a.lang), p.setValue(a.text.length > 4e6 ? `${a.text.slice(0, 4e6)}\n…` : a.text)), [e, p.el];
	}
	function y() {
		let e = o("a", {
			href: URL.createObjectURL(new Blob([a.bytes], { type: a.type || "application/octet-stream" })),
			download: `response${a.lang === "json" ? ".json" : a.lang === "html" ? ".html" : ".txt"}`
		});
		e.click(), setTimeout(() => URL.revokeObjectURL(e.href), 1e4);
	}
	let b = (e) => o("table", { class: "nx-table" }, o("tbody", {}, ...e.map(([e, t]) => o("tr", {}, o("th", {}, e), o("td", {}, t)))));
	function x() {
		let e = [];
		for (let t of r.checks) e.push(o("li", { class: t.ok ? "ok" : "ko" }, s(t.ok ? "check" : "x"), o("span", {}, t.label || O("res.check")), o("small", {}, `${t.actual}${t.message ? ` · ${t.message}` : ""}`)));
		for (let t of r.tests) e.push(o("li", { class: t.ok === null ? "skip" : t.ok ? "ok" : "ko" }, s(t.ok === !1 ? "x" : t.ok === null ? "minus" : "check"), o("span", {}, t.name), t.error ? o("small", {}, t.error) : null));
		return e.length ? [o("ul", { class: "nx-results" }, ...e)] : [o("p", { class: "nx-dim" }, O("res.noResults"))];
	}
	function S() {
		if (m(), u.replaceChildren(...r ? Me.map(g) : []), !r) return d.replaceChildren();
		if (r.error) {
			let n = o("div", { class: "nx-error" }, s("error"), o("div", {}, o("b", {}, r.error.message), r.error.detail ? o("small", {}, r.error.detail) : null));
			if (r.error.trust && n.append(o("button", {
				type: "button",
				class: "ctl-btn",
				onclick: () => e?.(r.error.trust)
			}, s("shield"), O("res.trust"))), t === "body") return d.replaceChildren(n, ...r.response ? v() : []);
		}
		let n = r.response, i;
		switch (t) {
			case "body":
				i = v();
				break;
			case "headers":
				i = n ? [b(n.headers)] : [];
				break;
			case "cookies": {
				let e = _();
				i = e.length ? [o("table", { class: "nx-table" }, o("thead", {}, o("tr", {}, ...[
					"name",
					"value",
					"domain",
					"path",
					"expires",
					"flags"
				].map((e) => o("th", {}, O(`res.cookie.${e}`))))), o("tbody", {}, ...e.map((e) => o("tr", {}, o("td", {}, e.name), o("td", { class: "mono" }, e.value), o("td", {}, e.domain ?? ""), o("td", {}, e.path ?? ""), o("td", {}, e.expires ? new Date(e.expires).toLocaleString() : O("res.cookie.session")), o("td", {}, [
					e.secure && "Secure",
					e.httpOnly && "HttpOnly",
					e.sameSite
				].filter(Boolean).join(" "))))))] : [o("p", { class: "nx-dim" }, O("res.noCookies"))];
				break;
			}
			case "results":
				i = x();
				break;
			case "console":
				i = r.logs.length ? [o("div", { class: "nx-console" }, ...r.logs.map((e) => o("div", { class: `l-${e.level}` }, o("span", { class: "nx-phase" }, O(`res.phase.${e.phase ?? "pre"}`)), e.text)))] : [o("p", { class: "nx-dim" }, O("res.noLogs"))];
				break;
			case "timing":
				i = [
					C(n?.timings ?? {}),
					n?.remote?.address ? o("p", { class: "nx-dim" }, O("res.remote", { address: `${n.remote.address}:${n.remote.port}` })) : null,
					n?.tls ? w(n.tls) : null
				];
				break;
			case "request": {
				let e = r.request;
				i = e ? [o("pre", { class: "nx-raw" }, `${e.method} ${e.url}\n${e.headers.map(([e, t]) => `${e}: ${t}`).join("\n")}${e.body?.text ? `\n\n${e.body.text}` : ""}`)] : [];
				break;
			}
			default: i = [];
		}
		d.replaceChildren(...i.filter(Boolean));
	}
	function C(e) {
		let t = e.total || e.done || 1, n = [
			["lookup", "res.t.lookup"],
			["connect", "res.t.connect"],
			["secure", "res.t.tls"],
			["firstByte", "res.t.wait"],
			["done", "res.t.download"]
		].filter(([t]) => e[t] !== null && e[t] !== void 0), r = 0;
		return o("div", { class: "nx-timing" }, ...n.map(([n, i]) => {
			let a = r, s = e[n] - r;
			return r = e[n], o("div", { class: "nx-trow" }, o("span", {}, O(i)), o("span", { class: "nx-track" }, o("i", {
				class: `k-${n}`,
				style: `left:${a / t * 100}%;width:${Math.max(.5, s / t * 100)}%`
			})), o("b", {}, X(s)));
		}), o("div", { class: "nx-trow total" }, o("span", {}, O("res.t.total")), o("span", {}), o("b", {}, X(e.total))));
	}
	let w = (e) => o("div", { class: "nx-tls" }, o("h4", {}, s("lock"), `${e.protocol ?? ""} · ${e.cipher ?? ""}${e.alpn ? ` · ${e.alpn}` : ""}`), e.error ? o("p", { class: "nx-hint warn" }, O("res.tlsError", { error: e.error })) : null, ...(e.chain ?? []).map((e) => o("div", { class: "nx-cert" }, o("b", {}, e.subject), o("small", {}, `${O("res.cert.issuer")}: ${e.issuer}`), o("small", {}, `${e.validFrom ?? ""} → ${e.validTo ?? ""}`), o("small", { class: "mono" }, e.fingerprint))));
	return S(), {
		el: f,
		show(e) {
			r = e, a = null, c?.(), c = null, e?.error && !e.response && (t = "body"), f.classList.remove("busy"), S();
		},
		busy(e) {
			f.classList.toggle("busy", e), e && l.replaceChildren(o("span", { class: "nx-spin" }), o("span", { class: "nx-dim" }, O("res.sending")));
		},
		message(e) {
			r = null, S(), l.replaceChildren(o("span", { class: "nx-dim" }, e));
		}
	};
}
// src/nettest/request.js
var ze = [
	"params",
	"auth",
	"headers",
	"body",
	"scripts",
	"checks",
	"settings"
], Be = [
	"none",
	"json",
	"text",
	"xml",
	"html",
	"form",
	"multipart",
	"file"
], Ve = [
	"Accept",
	"Accept-Encoding",
	"Accept-Language",
	"Authorization",
	"Cache-Control",
	"Content-Type",
	"Cookie",
	"If-Match",
	"If-None-Match",
	"If-Modified-Since",
	"Origin",
	"Prefer",
	"Range",
	"Referer",
	"User-Agent",
	"X-Api-Key",
	"X-Correlation-Id",
	"X-Request-Id",
	"X-Requested-With"
], He = [
	"application/json",
	"application/xml",
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain",
	"text/html",
	"application/octet-stream"
], Ue = [
	"status",
	"time",
	"size",
	"header",
	"json",
	"body"
], We = [
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge",
	"contains",
	"notContains",
	"exists",
	"notExists",
	"matches",
	"in",
	"type",
	"empty",
	"notEmpty"
], Ge = {
	pre: [
		["scripts.snip.setVar", "nt.environment.set('name', 'value');"],
		["scripts.snip.timestamp", "nt.variables.set('now', String(Date.now()));"],
		["scripts.snip.header", "nt.request.headers.upsert({ key: 'X-Request-Id', value: crypto.randomUUID ? crypto.randomUUID() : String(Math.random()) });"]
	],
	test: [
		["scripts.snip.status", "nt.test('Lo stato è 200', () => {\n  nt.response.to.have.status(200);\n});"],
		["scripts.snip.time", "nt.test('Risponde in meno di 500 ms', () => {\n  nt.expect(nt.response.responseTime).to.be.below(500);\n});"],
		["scripts.snip.json", "nt.test('Il corpo ha un id', () => {\n  const body = nt.response.json();\n  nt.expect(body).to.have.property('id');\n});"],
		["scripts.snip.save", "nt.environment.set('token', nt.response.json().token);"]
	]
}, Z = (e) => `m-${String(e).toLowerCase().replace(/[^a-z]/g, "") || "x"}`, Ke = class e {
	#e = null;
	#t = "params";
	constructor(e, t, n) {
		this.owner = e, this.key = t, this.item = n, this.response = Re({ onTrust: (e) => this.#c(e) }), this.el = o("div", { class: "nx-request" }), this.draw();
	}
	get collection() {
		return Y.get(this.key)?.data;
	}
	touch() {
		Y.touch(this.key), this.owner.itemChanged(this.key, this.item);
	}
	draw() {
		let t = this.item, n = t.protocol === "graphql", r = o("select", {
			class: `nx-method ${Z(t.method)}`,
			"aria-label": O("req.method"),
			onchange: () => {
				t.method = r.value, r.className = `nx-method ${Z(t.method)}`, this.touch();
			}
		}, ...[.../* @__PURE__ */ new Set([...pe, t.method])].map((e) => o("option", {
			value: e,
			selected: t.method === e
		}, e)));
		this.url = o("input", {
			class: "nx-url",
			type: "text",
			value: t.url,
			spellcheck: "false",
			autocomplete: "off",
			placeholder: "https://api.example.com/{{path}}",
			"aria-label": O("req.url"),
			oninput: () => {
				t.url = this.url.value, this.#r(), this.#i(), this.touch();
			},
			onkeydown: (e) => {
				e.key === "Enter" && (e.preventDefault(), this.send());
			}
		}), this.sendButton = o("button", {
			type: "button",
			class: "ctl-btn primary nx-send",
			onclick: () => this.#e ? this.cancel() : this.send()
		}, s("play"), O("req.send")), this.warn = o("div", { class: "nx-varwarn" });
		let i = o("div", { class: "nx-reqhead" }, o("span", { class: `nx-proto p-${t.protocol}` }, k(t.protocol).label), r, this.url, this.sendButton, o("button", {
			type: "button",
			class: "ctl-btn",
			title: O("req.more"),
			onclick: (e) => this.#l(e)
		}, s("list")));
		this.tabs = o("div", {
			class: "nx-subtabs",
			role: "tablist"
		}), this.pane = o("div", { class: "nx-reqpane" });
		let a = o("div", { class: "nx-reqtop" }, i, this.warn, this.tabs, this.pane), c = o("div", { class: "nx-split" });
		e.topHeight && (a.style.flexBasis = `${e.topHeight}px`);
		let l = d({
			orientation: "horizontal",
			get: () => a.offsetHeight,
			min: 120,
			max: () => c.offsetHeight - 120,
			reset: () => {
				a.style.flexBasis = "", e.topHeight = 0;
			},
			set: (t) => {
				a.style.flexBasis = `${t}px`, e.topHeight = t;
			},
			label: O("req.resize"),
			host: c
		});
		c.append(a, l, this.response.el), this.el.replaceChildren(c), this.#n(), this.#i(), n && this.#t === "params" && (this.#t = "body");
	}
	#n() {
		let e = this.item, t = (t) => t === "params" ? W(e.url).length : t === "headers" ? e.headers.filter((e) => e.enabled !== !1 && e.key).length : t === "checks" ? e.checks.length + e.extract.length : t === "scripts" ? [e.scripts.pre, e.scripts.test].filter((e) => e?.trim()).length : 0;
		this.tabs.replaceChildren(...ze.map((n) => o("button", {
			type: "button",
			role: "tab",
			"aria-selected": String(this.#t === n),
			class: this.#t === n ? "on" : "",
			onclick: () => {
				this.#t = n, this.#n();
			}
		}, O(n === "body" && e.protocol === "graphql" ? "req.tab.graphql" : `req.tab.${n}`), t(n) ? o("span", { class: "nx-count" }, String(t(n))) : null))), this.pane.replaceChildren(this[`section_${this.#t}`]());
	}
	#r() {
		this.#t === "params" && this.paramsTable && document.activeElement === this.url && (this.paramRows.splice(0, this.paramRows.length, ...W(this.item.url)), this.paramsTable.render());
	}
	#i() {
		let e = new Set(U(this.collection, Y.env(this.key), Y.globals).map((e) => e.key)), t = this.item, n = [
			t.url,
			...t.headers.map((e) => `${e.key}${e.value}`),
			t.body?.text,
			t.body?.query
		].flatMap(be), r = [...new Set(n.filter((t) => !e.has(t) && !t.startsWith("$")))];
		this.warn.replaceChildren(...r.length ? [s("warning"), O("req.unknownVars", { names: r.join(", ") })] : []), this.warn.hidden = !r.length;
	}
	section_params() {
		return this.paramRows = W(this.item.url), this.paramsTable = _({
			t: O,
			rows: this.paramRows,
			mono: !0,
			placeholder: {
				key: O("req.param"),
				value: O("req.value")
			},
			onChange: (e) => {
				this.item.url = ye(this.item.url, e), this.url.value = this.item.url, this.touch(), this.#i();
			}
		}), o("div", { class: "nx-sec" }, o("p", { class: "nx-hint" }, O("req.paramsHint")), this.paramsTable.el);
	}
	section_auth() {
		let e = this.item;
		e.auth ??= { type: "inherit" };
		let t = le({
			auth: e.auth,
			win: this.owner.win,
			onChange: () => this.touch(),
			inherited: () => {
				let t = this.collection;
				if (!t || !P(t, e.id)) return null;
				let { auth: n, from: r } = I(t, e.id);
				return {
					auth: n,
					name: r === t || !r ? Y.nameOf(Y.get(this.key)) : r.name
				};
			}
		});
		return o("div", { class: "nx-sec" }, t.el);
	}
	section_headers() {
		let e = this.item, t = _({
			t: O,
			rows: e.headers,
			mono: !0,
			keys: Ve,
			placeholder: {
				key: O("req.header"),
				value: O("req.value")
			},
			values: (e) => /^content-type$/i.test(e.key) || /^accept$/i.test(e.key) ? He : [],
			onChange: () => {
				this.touch(), this.#i();
			}
		});
		return o("div", { class: "nx-sec" }, t.el, o("p", { class: "nx-hint" }, O("req.headersHint")));
	}
	section_body() {
		let e = this.item, t = e.body;
		if (e.protocol === "graphql") {
			let e = D({
				value: t.query ?? "",
				lang: "graphql",
				label: O("req.gql.query"),
				minLines: 8,
				onInput: (e) => {
					t.query = e, this.touch();
				}
			}), n = D({
				value: t.variables ?? "",
				lang: "json",
				label: O("req.gql.variables"),
				minLines: 4,
				onInput: (e) => {
					t.variables = e, this.touch();
				}
			}), r = o("div", { class: "nx-schema" }), i = o("button", {
				type: "button",
				class: "ctl-btn",
				onclick: () => this.#o(r, e)
			}, s("list"), O("req.gql.schema"));
			return o("div", { class: "nx-sec gql" }, o("div", { class: "nx-gqlmain" }, o("div", { class: "nx-flabel" }, O("req.gql.query"), o("span", { class: "nx-grow" }), i), e.el, o("div", { class: "nx-flabel" }, O("req.gql.variables")), n.el), r);
		}
		let n = o("div", { class: "nx-modes" }, ...Be.map((e) => o("button", {
			type: "button",
			class: t.kind === e ? "on" : "",
			onclick: () => {
				t.kind = e, this.touch(), this.#n();
			}
		}, O(`req.body.${e}`)))), r;
		if (t.kind === "none") r = o("p", { class: "nx-hint" }, O("req.body.noneHint", { method: e.method }));
		else if (t.kind === "form" || t.kind === "multipart") {
			t.fields ??= [];
			let e = _({
				t: O,
				rows: t.fields,
				mono: !0,
				placeholder: {
					key: O("req.field"),
					value: O("req.value")
				},
				columns: t.kind === "multipart" ? [{
					field: "type",
					placeholder: O("req.body.fieldType"),
					width: 92,
					options: [{
						value: "text",
						label: O("req.body.fieldText")
					}, {
						value: "file",
						label: O("req.body.fieldFile")
					}]
				}] : [],
				onChange: () => this.touch()
			}), n = t.kind === "multipart" ? o("div", { class: "nx-files" }, ...t.fields.filter((e) => e.type === "file").map((e) => this.#a(e, "file", () => this.#n()))) : null;
			r = o("div", {}, e.el, n, t.kind === "multipart" ? o("p", { class: "nx-hint" }, O("req.body.fileHint")) : null);
		} else if (t.kind === "file") r = o("div", {}, this.#a(t, "file", () => this.#n()), o("p", { class: "nx-hint" }, O("req.body.binaryHint")));
		else {
			let e = {
				json: "json",
				xml: "html",
				html: "html",
				text: "text"
			}[t.kind] ?? "text", n = D({
				value: t.text ?? "",
				lang: e,
				label: O("req.tab.body"),
				minLines: 8,
				onInput: (e) => {
					t.text = e, this.touch(), this.#i();
				}
			}), i = o("div", { class: "nx-modes" }, o("span", { class: "nx-grow" }), t.kind === "json" ? o("button", {
				type: "button",
				onclick: () => {
					try {
						n.setValue(JSON.stringify(JSON.parse(n.value), null, 2)), t.text = n.value, this.touch();
					} catch (e) {
						this.owner.notice(O("req.body.badJson", { error: e.message }));
					}
				}
			}, O("req.body.format")) : null);
			r = o("div", {}, i, n.el);
		}
		return o("div", { class: "nx-sec" }, n, r);
	}
	#a(e, t, n) {
		let r = e[t] || (e.fileName ? O("req.file.missing", { name: e.fileName }) : O("req.file.none"));
		return o("div", { class: "nx-filerow" }, s("file"), o("span", { class: e[t] ? "mono" : "nx-dim" }, e.key ? `${e.key}: ${r}` : r), o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: async () => {
				let r = await m(this.owner.openWindow, { title: O("req.file.pick") });
				r && (e[t] = a.tildePath(r.id), this.touch(), n());
			}
		}, O("req.file.choose")));
	}
	section_scripts() {
		let e = this.item, t = (t) => {
			let n = D({
				value: e.scripts[t] ?? "",
				lang: "javascript",
				label: O(`scripts.${t}`),
				minLines: 7,
				onInput: (n) => {
					e.scripts[t] = n, this.touch();
				}
			}), r = o("button", {
				type: "button",
				class: "nx-link",
				onclick: (r) => {
					let i = r.currentTarget.getBoundingClientRect();
					u(i.left, i.bottom, Ge[t].map(([r, i]) => ({
						label: O(r),
						action: () => {
							n.setValue(`${n.value}${n.value && !n.value.endsWith("\n") ? "\n" : ""}${i}\n`), e.scripts[t] = n.value, this.touch();
						}
					})));
				}
			}, s("plus"), O("scripts.snippets"));
			return o("div", { class: "nx-scriptbox" }, o("div", { class: "nx-flabel" }, O(`scripts.${t}`), o("span", { class: "nx-grow" }), r), n.el);
		};
		return o("div", { class: "nx-sec" }, o("p", { class: "nx-hint" }, O("scripts.hint")), t("pre"), t("test"));
	}
	section_checks() {
		let e = this.item, t = o("div", { class: "nx-checks" }), n = (e, t, n, r) => {
			let i = o("select", {
				class: "ctl-select",
				onchange: () => {
					e[t] = i.value, this.touch(), r?.();
				}
			}, ...n.map(([n, r]) => o("option", {
				value: n,
				selected: String(e[t]) === n
			}, r)));
			return i;
		}, r = (e, t, n, r = "") => o("input", {
			class: `ctl-text mono ${r}`,
			value: String(e[t] ?? ""),
			placeholder: n,
			oninput: (n) => {
				e[t] = n.target.value, this.touch();
			}
		}), i = (e, t) => o("button", {
			type: "button",
			class: "nx-icon",
			title: O("checks.remove"),
			onclick: () => {
				e.splice(e.indexOf(t), 1), this.touch(), this.#n();
			}
		}, s("x")), a = (e) => e === "header" || e === "json", c = () => {
			t.replaceChildren(o("h4", {}, O("checks.title")), ...e.checks.map((t) => o("div", { class: "nx-check" }, o("input", {
				type: "checkbox",
				checked: t.enabled !== !1,
				"aria-label": O("checks.enabled"),
				onchange: (e) => {
					t.enabled = e.target.checked, this.touch();
				}
			}), n(t, "source", Ue.map((e) => [e, O(`checks.src.${e}`)]), c), a(t.source) ? r(t, "path", t.source === "json" ? "$.data.id" : "Content-Type", "path") : o("span", { class: "path" }), n(t, "op", We.map((e) => [e, O(`checks.op.${e}`)]), c), [
				"exists",
				"notExists",
				"empty",
				"notEmpty"
			].includes(t.op) ? o("span", { class: "val" }) : r(t, "value", O("checks.value"), "val"), i(e.checks, t))), o("button", {
				type: "button",
				class: "nx-link",
				onclick: () => {
					e.checks.push(_e()), this.touch(), c();
				}
			}, s("plus"), O("checks.add")), o("h4", {}, O("extract.title")), o("p", { class: "nx-hint" }, O("extract.hint")), ...e.extract.map((t) => o("div", { class: "nx-check" }, o("input", {
				type: "checkbox",
				checked: t.enabled !== !1,
				"aria-label": O("checks.enabled"),
				onchange: (e) => {
					t.enabled = e.target.checked, this.touch();
				}
			}), r(t, "var", O("extract.var"), "var"), o("span", { class: "nx-dim" }, "←"), n(t, "source", [
				"json",
				"header",
				"body",
				"status"
			].map((e) => [e, O(`checks.src.${e}`)]), c), t.source === "status" ? o("span", { class: "path" }) : r(t, t.source === "body" ? "regex" : "path", t.source === "json" ? "$.token" : t.source === "header" ? "Location" : "id=(\\d+)", "path"), n(t, "scope", [
				"environment",
				"collection",
				"globals"
			].map((e) => [e, O(`vars.scope.${e}`)])), i(e.extract, t))), o("button", {
				type: "button",
				class: "nx-link",
				onclick: () => {
					e.extract.push(ve()), this.touch(), c();
				}
			}, s("plus"), O("extract.add")));
		};
		return c(), o("div", { class: "nx-sec" }, t);
	}
	section_settings() {
		let e = this.item.settings ??= {}, t = (e, t, n) => o("label", { class: "nx-frow" }, o("span", { class: "nx-flabel" }, e), o("span", { class: "nx-fval" }, t, n ? o("small", { class: "nx-hint" }, n) : null)), n = (t, n, r) => o("label", { class: "nx-check1" }, o("input", {
			type: "checkbox",
			checked: e[t] ?? n,
			onchange: (n) => {
				e[t] = n.target.checked, this.touch();
			}
		}), r), r = (t, n, r = 1) => o("input", {
			class: "ctl-text",
			type: "number",
			min: 0,
			value: e[t] === void 0 ? "" : e[t] / r,
			placeholder: n,
			oninput: (n) => {
				n.target.value === "" ? delete e[t] : e[t] = Number(n.target.value) * r, this.touch();
			}
		}), i = o("select", {
			class: "ctl-select",
			onchange: () => {
				e.version = i.value, this.touch();
			}
		}, ...[
			["auto", O("set.version.auto")],
			["1.1", "HTTP/1.1"],
			["2", "HTTP/2"]
		].map(([t, n]) => o("option", {
			value: t,
			selected: (e.version ?? "auto") === t
		}, n))), s = (t) => o("span", { class: "nx-filepick" }, o("input", {
			class: "ctl-text mono",
			value: e[t] ?? "",
			placeholder: "~/…",
			oninput: (n) => {
				e[t] = n.target.value, this.touch();
			}
		}), o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: async (n) => {
				let r = await m(this.owner.openWindow, { title: O("set.pickFile") });
				r && (e[t] = a.tildePath(r.id), n.target.closest(".nx-filepick").querySelector("input").value = e[t], this.touch());
			}
		}, O("req.file.choose")));
		return o("div", { class: "nx-sec nx-settings" }, t(O("set.timeout"), r("timeoutMs", "30", 1e3), O("set.timeoutHint")), t(O("set.redirects"), o("span", { class: "nx-inline" }, n("followRedirects", !0, O("set.follow")), r("maxRedirects", "10"))), t(O("set.version"), i), t(O("set.tls"), n("verify", !0, O("set.verify")), O("set.verifyHint")), t(O("set.decode"), n("decode", !0, O("set.decodeLabel"))), t(O("set.cookies"), n("cookies", !0, O("set.cookiesLabel"))), t(O("set.cert"), s("cert"), O("set.certHint")), t(O("set.key"), s("key")), t(O("set.passphrase"), o("input", {
			class: "ctl-text mono",
			value: e.passphrase ?? "",
			placeholder: "{{passphrase}}",
			oninput: (t) => {
				e.passphrase = t.target.value, this.touch();
			}
		})), t(O("set.ca"), s("ca"), O("set.caHint")), t(O("set.maxBody"), r("maxBody", "20", 1 << 20), O("set.maxBodyHint")));
	}
	async #o(e, t) {
		e.replaceChildren(o("span", { class: "nx-spin" }));
		let n = this.item, i = {
			...structuredClone(n),
			body: {
				kind: "graphql",
				query: qe,
				variables: ""
			},
			scripts: {
				pre: "",
				test: ""
			},
			checks: [],
			extract: []
		};
		try {
			let { result: n } = await r.send(this.#s(i)), a = n.response ? JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(n.response.body), (e) => e.charCodeAt(0)))) : null, s = a?.data?.__schema?.types;
			if (!s) throw Error(n.error?.message ?? O("req.gql.noSchema"));
			let c = [
				a.data.__schema.queryType?.name,
				a.data.__schema.mutationType?.name,
				a.data.__schema.subscriptionType?.name
			].filter(Boolean), l = (e) => e?.kind === "NON_NULL" ? `${l(e.ofType)}!` : e?.kind === "LIST" ? `[${l(e.ofType)}]` : e?.name ?? "?", u = s.filter((e) => !e.name.startsWith("__") && e.fields).sort((e, t) => c.includes(t.name) - c.includes(e.name) || e.name.localeCompare(t.name));
			e.replaceChildren(o("input", {
				class: "ctl-text nx-wide",
				type: "search",
				placeholder: O("req.gql.filter"),
				oninput: (t) => {
					let n = t.target.value.toLowerCase();
					e.querySelectorAll(".nx-gqlf").forEach((e) => {
						e.hidden = n && !e.textContent.toLowerCase().includes(n);
					});
				}
			}), ...u.map((e) => o("details", { open: c.includes(e.name) }, o("summary", {}, e.name), ...e.fields.map((e) => o("button", {
				type: "button",
				class: "nx-gqlf",
				title: e.description ?? "",
				onclick: () => {
					let n = t.input;
					n.focus(), n.setRangeText(e.name, n.selectionStart, n.selectionEnd, "end"), n.dispatchEvent(new Event("input"));
				}
			}, o("b", {}, e.name), e.args?.length ? `(${e.args.map((e) => `${e.name}: ${l(e.type)}`).join(", ")})` : "", o("small", {}, `: ${l(e.type)}`))))));
		} catch (t) {
			e.replaceChildren(o("p", { class: "nx-hint warn" }, t.message));
		}
	}
	#s(e = this.item) {
		let t = Y.get(this.key)?.data, n = Y.env(this.key), r = structuredClone(e);
		if (r.settings?.cookies !== !1 && !r.headers.some((e) => e.enabled !== !1 && /^cookie$/i.test(e.key))) {
			let e = ke(G(r.url, U(t, n, Y.globals)));
			e && r.headers.push({
				key: "Cookie",
				value: e,
				enabled: !0
			});
		}
		return {
			request: r,
			chain: t && P(t, e.id) ? ge(t, e.id) : [{
				auth: t?.auth ?? { type: "none" },
				scripts: t?.scripts ?? {}
			}],
			environment: H(n),
			collection: { values: V(t?.variables) },
			globals: { values: V(Y.globals) }
		};
	}
	async send() {
		if (this.#e) return;
		let e = this.item;
		this.#e = new AbortController(), this.sendButton.replaceChildren(s("stop"), O("req.cancel")), this.response.busy(!0);
		let t = Date.now();
		try {
			let n = await r.send(this.#s(), { signal: this.#e.signal });
			this.owner.applyResult(this.key, n);
			let i = n.result;
			i.response && Oe(i.response.url ?? G(e.url, U(this.collection, Y.env(this.key), Y.globals)), i.response.headers), this.response.show(i), Y.addHistory({
				id: `${t}`,
				at: t,
				key: this.key,
				item: e.id,
				name: e.name,
				protocol: e.protocol,
				method: i.request?.method ?? e.method,
				url: i.request?.url ?? e.url,
				status: i.response?.status ?? null,
				ms: i.response?.timings?.total ?? i.ms,
				error: i.error?.message ?? null,
				ok: i.ok,
				snapshot: JSON.stringify(e).length < 65536 ? structuredClone(e) : null
			});
		} catch (e) {
			e?.code === "canceled" ? this.response.message(O("req.cancelled")) : this.response.show({
				error: {
					code: e.code ?? "internal",
					message: e.message
				},
				checks: [],
				tests: [],
				logs: [],
				redirects: []
			});
		} finally {
			this.#e = null, this.sendButton.replaceChildren(s("play"), O("req.send"));
		}
	}
	cancel() {
		this.#e?.abort();
	}
	async #c(e) {
		await v(this.owner.win, e, { t: O }) && (await r.trust(e), this.send());
	}
	#l(e) {
		let t = e.currentTarget.getBoundingClientRect();
		u(t.right - 200, t.bottom, [
			{
				label: O("req.copyCode"),
				icon: "code",
				action: () => this.owner.copyAsCode(this.key, this.item)
			},
			{
				label: O("req.duplicate"),
				icon: "filePlus",
				action: () => this.owner.duplicate(this.key, this.item.id)
			},
			{
				label: O("req.schedule"),
				icon: "clock",
				action: () => this.owner.schedule(this.key, this.item.id)
			}
		]);
	}
	focus() {
		this.url?.focus();
	}
	destroy() {
		this.cancel();
	}
}, qe = "query IntrospectionQuery { __schema { queryType { name } mutationType { name } subscriptionType { name }\n  types { kind name description fields(includeDeprecated: true) { name description args { name type { ...T } } type { ...T } } } } }\nfragment T on __Type { kind name ofType { kind name ofType { kind name ofType { kind name } } } }", Je = [
	"text",
	"json",
	"hex",
	"base64"
], Ye = (e) => btoa(String.fromCharCode(...e)), Xe = (e) => {
	let t = e.replace(/0x|[\s,:]/gi, "");
	if (!/^(?:[0-9a-f]{2})*$/i.test(t)) throw Error(O("live.badHex"));
	return Uint8Array.from(t.match(/../g) ?? [], (e) => parseInt(e, 16));
}, Ze = (e) => [...atob(e)].map((e) => e.charCodeAt(0).toString(16).padStart(2, "0")).join(" "), Qe = (e) => {
	try {
		return JSON.stringify(JSON.parse(e), null, 2);
	} catch {
		return e;
	}
}, $e = (e) => new Date(e).toLocaleTimeString(void 0, {
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	fractionalSecondDigits: 3
}), et = class {
	#e = null;
	#t = [];
	#n = null;
	#r = "messages";
	#i = "";
	#a = "text";
	#o = null;
	#s = /* @__PURE__ */ new Map();
	constructor(e, t, n) {
		this.owner = e, this.key = t, this.item = n, this.el = o("div", { class: "nx-live" }), this.response = n.protocol === "grpc" ? Re({ onTrust: (e) => this.#C(e) }) : null, this.draw(), this.#u();
	}
	get collection() {
		return Y.get(this.key)?.data;
	}
	get protocol() {
		return this.item.protocol;
	}
	touch() {
		Y.touch(this.key), this.owner.itemChanged(this.key, this.item);
	}
	get #c() {
		return this.#o?.services.find((e) => e.name === this.item.values.service)?.methods.find((e) => e.name === this.item.values.method) ?? null;
	}
	get #l() {
		let e = this.#c;
		return !!(e && (e.clientStreaming || e.serverStreaming));
	}
	async #u() {
		try {
			let e = (await r.sessions()).find((e) => e.request === this.item.id && e.state !== "closed");
			e && this.#x(e);
		} catch {}
	}
	draw() {
		let e = this.item, t = e.values ??= {}, n = [
			"tcp",
			"tls",
			"udp"
		].includes(this.protocol) ? [o("input", {
			class: "nx-url",
			value: t.host ?? "",
			placeholder: O("live.host"),
			"aria-label": O("live.host"),
			spellcheck: "false",
			oninput: (e) => {
				t.host = e.target.value, this.touch();
			}
		}), o("input", {
			class: "nx-port",
			value: t.port ?? "",
			placeholder: O("live.port"),
			"aria-label": O("live.port"),
			inputmode: "numeric",
			oninput: (e) => {
				t.port = e.target.value, this.touch();
			}
		})] : [o("input", {
			class: "nx-url",
			value: e.url ?? "",
			spellcheck: "false",
			"aria-label": O("req.url"),
			placeholder: {
				ws: "wss://echo.example.com/socket",
				sse: "https://example.com/events",
				mqtt: "mqtts://broker.example.com:8883",
				grpc: "grpcs://api.example.com:443"
			}[this.protocol] ?? "",
			oninput: (t) => {
				e.url = t.target.value, this.touch();
			},
			onkeydown: (e) => {
				e.key === "Enter" && this.connect();
			}
		})];
		this.button = o("button", {
			type: "button",
			class: "ctl-btn primary nx-send",
			onclick: () => this.connect()
		}), this.state = o("span", { class: "nx-livestate" }), this.tabs = o("div", {
			class: "nx-subtabs",
			role: "tablist"
		}), this.pane = o("div", { class: "nx-livepane" }), this.el.replaceChildren(o("div", { class: "nx-reqhead" }, o("span", { class: `nx-proto p-${this.protocol}` }, k(this.protocol).label), ...n, this.button), this.state, this.tabs, this.pane, ...this.response ? [this.response.el] : []), this.#p(), this.#f();
	}
	#d() {
		switch (this.protocol) {
			case "ws": return [
				"messages",
				"headers",
				"settings"
			];
			case "sse": return [
				"messages",
				"headers",
				"settings"
			];
			case "mqtt": return [
				"messages",
				"subscriptions",
				"client",
				"settings"
			];
			case "grpc": return [
				"service",
				"messages",
				"metadata",
				"settings"
			];
			case "udp": return ["messages"];
			default: return ["messages", "settings"];
		}
	}
	#f() {
		let e = this.#d();
		e.includes(this.#r) || (this.#r = e[0]), this.tabs.replaceChildren(...e.map((e) => o("button", {
			type: "button",
			role: "tab",
			"aria-selected": String(this.#r === e),
			class: this.#r === e ? "on" : "",
			onclick: () => {
				this.#r = e, this.#f();
			}
		}, O(`live.tab.${e}`), e === "messages" && this.#t.length ? o("span", { class: "nx-count" }, String(this.#t.filter((e) => e.dir !== "sys").length)) : null))), this.pane.replaceChildren(this[`tab_${this.#r}`]());
	}
	#p() {
		let e = this.#n, t = e?.state === "on" || e?.state === "connecting", n = this.protocol === "grpc" && !this.#l;
		this.button.replaceChildren(...n ? [s("play"), O("live.invoke")] : t ? [s("stop"), O("live.disconnect")] : [s("play"), O(this.protocol === "grpc" ? "live.openStream" : "live.connect")]), this.button.classList.toggle("danger", t && !n);
		let r = e?.info ?? {};
		this.state.replaceChildren(...e ? [
			o("span", { class: `nx-dot st-${e.state}` }),
			O(`live.state.${e.state}`),
			e.reason ? ` · ${e.reason}` : "",
			r.protocol ? ` · ${O("live.subprotocol", { name: r.protocol })}` : "",
			r.remote ? ` · ${r.remote}` : "",
			r.tls?.protocol ? ` · ${r.tls.protocol}` : "",
			r.clientId ? ` · ${r.clientId}` : "",
			e.closesAt ? ` · ${O("live.closesAt", { time: new Date(e.closesAt).toLocaleTimeString() })}` : ""
		] : [O("live.idle")]);
	}
	tab_messages() {
		this.item;
		let e = o("div", {
			class: "nx-log",
			role: "log",
			"aria-live": "polite"
		});
		this.log = e, this.#h();
		let t = [o("div", { class: "nx-modes" }, o("input", {
			class: "ctl-text",
			type: "search",
			placeholder: O("live.filter"),
			value: this.#i,
			oninput: (e) => {
				this.#i = e.target.value.toLowerCase(), this.#h();
			}
		}), o("span", { class: "nx-grow" }), this.protocol === "ws" ? o("button", {
			type: "button",
			class: "ctl-btn",
			disabled: this.#n?.state !== "on",
			onclick: () => this.#S("ping")
		}, O("live.ping")) : null, ["tcp", "tls"].includes(this.protocol) ? o("button", {
			type: "button",
			class: "ctl-btn",
			disabled: this.#n?.state !== "on",
			onclick: () => this.#S("end")
		}, O("live.halfClose")) : null, this.protocol === "grpc" && this.#l ? o("button", {
			type: "button",
			class: "ctl-btn",
			disabled: this.#n?.state !== "on",
			onclick: () => this.#S("end")
		}, O("live.endStream")) : null, o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: () => {
				this.#t = [], this.#h();
			}
		}, O("live.clear"))), e];
		return this.protocol !== "sse" && t.push(this.#m()), this.protocol === "grpc" && !this.#l ? o("div", { class: "nx-sec" }, o("p", { class: "nx-hint" }, O("live.grpcUnaryHint")), this.#m()) : o("div", { class: "nx-msgs" }, ...t);
	}
	#m() {
		let e = this.item;
		e.messages ??= [];
		let t = this.draft ??= {
			type: this.protocol === "grpc" ? "json" : "text",
			data: this.protocol === "grpc" ? e.values.message ?? "{}" : "",
			topic: e.values.lastTopic ?? "",
			qos: 0,
			retain: !1
		}, n = D({
			value: t.data,
			lang: this.#a === "json" || this.protocol === "grpc" ? "json" : "text",
			label: O("live.message"),
			minLines: 3,
			onInput: (n) => {
				t.data = n, this.protocol === "grpc" && (e.values.message = n, this.touch());
			}
		}), r = this.protocol === "grpc" ? null : o("select", {
			class: "ctl-select",
			"aria-label": O("live.format"),
			onchange: (e) => {
				this.#a = e.target.value, n.setLang(this.#a === "json" ? "json" : "text");
			}
		}, ...Je.map((e) => o("option", {
			value: e,
			selected: this.#a === e
		}, O(`live.fmt.${e}`)))), i = this.protocol === "mqtt" ? [
			o("input", {
				class: "ctl-text mono",
				placeholder: O("live.mqtt.topic"),
				value: t.topic,
				oninput: (n) => {
					t.topic = n.target.value, e.values.lastTopic = t.topic;
				}
			}),
			o("select", {
				class: "ctl-select",
				"aria-label": "QoS",
				onchange: (e) => {
					t.qos = Number(e.target.value);
				}
			}, ...[
				0,
				1,
				2
			].map((e) => o("option", {
				value: e,
				selected: t.qos === e
			}, `QoS ${e}`))),
			o("label", { class: "nx-check1" }, o("input", {
				type: "checkbox",
				checked: t.retain,
				onchange: (e) => {
					t.retain = e.target.checked;
				}
			}), O("live.mqtt.retain"))
		] : [], a = o("button", {
			type: "button",
			class: "ctl-btn primary",
			onclick: () => this.send(n.value)
		}, s("arrowRight"), O("live.send"));
		n.input.addEventListener("keydown", (e) => {
			e.key === "Enter" && (e.ctrlKey || e.metaKey) && (e.preventDefault(), this.send(n.value));
		});
		let c = o("div", { class: "nx-saved" }, ...e.messages.map((r) => o("span", { class: "nx-chip" }, o("button", {
			type: "button",
			title: r.data.slice(0, 200),
			onclick: () => {
				n.setValue(r.data), t.data = r.data, r.meta?.topic && (t.topic = r.meta.topic);
			}
		}, r.name || r.data.slice(0, 24)), o("button", {
			type: "button",
			class: "x",
			title: O("live.unsave"),
			onclick: () => {
				e.messages.splice(e.messages.indexOf(r), 1), this.touch(), this.#f();
			}
		}, s("x")))), o("button", {
			type: "button",
			class: "nx-link",
			onclick: () => {
				n.value && (e.messages.push({
					id: A(),
					name: n.value.slice(0, 24),
					type: this.#a,
					data: n.value,
					...t.topic && { meta: { topic: t.topic } }
				}), this.touch(), this.#f());
			}
		}, s("save"), O("live.save")));
		return o("div", { class: "nx-compose" }, o("div", { class: "nx-modes" }, r, ...i, o("span", { class: "nx-grow" }), this.protocol === "grpc" && !this.#l ? null : a), n.el, this.protocol === "grpc" && !this.#l ? null : c);
	}
	#h() {
		if (!this.log) return;
		let e = this.#t.filter((e) => !this.#i || e.data.toLowerCase().includes(this.#i) || JSON.stringify(e.meta ?? {}).toLowerCase().includes(this.#i)).slice(-2e3), t = this.log.scrollHeight - this.log.scrollTop - this.log.clientHeight < 40;
		this.log.replaceChildren(...e.length ? e.map((e) => this.#g(e)) : [o("p", { class: "nx-dim" }, O("live.noMessages"))]), t && (this.log.scrollTop = this.log.scrollHeight);
	}
	#g(e) {
		let t = e.type === "binary" ? Ze(e.data) : e.type === "json" || /^\s*[{[]/.test(e.data) ? Qe(e.data) : e.data, n = e.meta ?? {}, r = [
			n.event && n.event !== "message" ? n.event : null,
			n.id === void 0 ? null : `id ${n.id}`,
			n.topic ?? null,
			n.qos ? `QoS ${n.qos}` : null,
			n.retain ? "retain" : null,
			n.from ?? null,
			n.status === void 0 ? null : `status ${n.status}`,
			e.type === "binary" ? i(atob(e.data).length) : null
		].filter(Boolean), a = o("div", { class: `nx-msg d-${e.dir} ty-${e.type}` }, o("span", { class: "nx-msgtime" }, $e(e.at)), o("span", {
			class: "nx-msgdir",
			title: O(`live.dir.${e.dir}`)
		}, e.dir === "in" ? "↓" : e.dir === "out" ? "↑" : "•"), o("div", { class: "nx-msgbody" }, r.length ? o("div", { class: "nx-msgtags" }, ...r.map((e) => o("span", {}, e))) : null, o("pre", {}, t.length > 2e4 ? `${t.slice(0, 2e4)}…` : t)));
		return n.trust && a.append(o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: () => this.#C(n.trust)
		}, s("shield"), O("res.trust"))), a;
	}
	tab_headers() {
		let e = this.item, t = [_({
			t: O,
			rows: e.headers,
			mono: !0,
			placeholder: {
				key: O("req.header"),
				value: O("req.value")
			},
			onChange: () => this.touch()
		}).el];
		return this.protocol === "ws" && t.unshift(o("label", { class: "nx-frow" }, o("span", { class: "nx-flabel" }, O("live.ws.protocols")), o("input", {
			class: "ctl-text mono nx-wide",
			value: e.values.protocols ?? "",
			placeholder: "graphql-transport-ws, v1.chat",
			oninput: (t) => {
				e.values.protocols = t.target.value, this.touch();
			}
		}))), o("div", { class: "nx-sec" }, ...t);
	}
	tab_metadata() {
		let e = this.item, t = _({
			t: O,
			rows: e.headers,
			mono: !0,
			placeholder: {
				key: O("live.grpc.metaKey"),
				value: O("req.value")
			},
			onChange: () => this.touch()
		});
		return o("div", { class: "nx-sec" }, o("p", { class: "nx-hint" }, O("live.grpc.metaHint")), t.el);
	}
	tab_settings() {
		let e = this.item.settings ??= {}, t = this.item.values, n = [o("label", { class: "nx-check1" }, o("input", {
			type: "checkbox",
			checked: e.verify !== !1,
			onchange: (t) => {
				e.verify = t.target.checked, this.touch();
			}
		}), O("set.verify")), o("small", { class: "nx-hint" }, O("set.verifyHint"))];
		return this.protocol === "tls" && n.push(o("label", { class: "nx-frow" }, o("span", { class: "nx-flabel" }, O("live.tls.servername")), o("input", {
			class: "ctl-text mono",
			value: t.servername ?? "",
			oninput: (e) => {
				t.servername = e.target.value, this.touch();
			}
		})), o("label", { class: "nx-frow" }, o("span", { class: "nx-flabel" }, "ALPN"), o("input", {
			class: "ctl-text mono",
			value: t.alpn ?? "",
			placeholder: "h2, http/1.1",
			oninput: (e) => {
				t.alpn = e.target.value, this.touch();
			}
		}))), this.protocol === "grpc" && n.push(o("label", { class: "nx-frow" }, o("span", { class: "nx-flabel" }, O("set.timeout")), o("input", {
			class: "ctl-text",
			type: "number",
			value: e.timeoutMs ? e.timeoutMs / 1e3 : "",
			placeholder: "30",
			oninput: (t) => {
				e.timeoutMs = t.target.value ? Number(t.target.value) * 1e3 : void 0, this.touch();
			}
		}))), o("div", { class: "nx-sec nx-settings" }, ...n);
	}
	tab_client() {
		let e = this.item.values, t = (t, n, { type: r = "text", ph: i = "" } = {}) => o("label", { class: "nx-frow" }, o("span", { class: "nx-flabel" }, n), o("input", {
			class: "ctl-text mono",
			type: r,
			value: e[t] ?? "",
			placeholder: i,
			oninput: (n) => {
				e[t] = r === "number" ? Number(n.target.value) : n.target.value, this.touch();
			}
		}));
		return o("div", { class: "nx-sec nx-settings" }, o("label", { class: "nx-frow" }, o("span", { class: "nx-flabel" }, O("live.mqtt.version")), o("select", {
			class: "ctl-select",
			onchange: (t) => {
				e.version = t.target.value, this.touch();
			}
		}, ...["5", "3.1.1"].map((t) => o("option", {
			value: t,
			selected: String(e.version ?? "5") === t
		}, `MQTT ${t}`)))), t("clientId", O("live.mqtt.clientId"), { ph: O("live.mqtt.clientIdHint") }), t("username", O("auth.user")), t("password", O("auth.password"), {
			type: "password",
			ph: "{{mqttPassword}}"
		}), t("keepalive", O("live.mqtt.keepalive"), {
			type: "number",
			ph: "60"
		}), o("label", { class: "nx-check1" }, o("input", {
			type: "checkbox",
			checked: e.clean !== !1,
			onchange: (t) => {
				e.clean = t.target.checked, this.touch();
			}
		}), O("live.mqtt.clean")));
	}
	tab_subscriptions() {
		let e = this.item.values;
		e.subscriptions ??= [];
		let t = this.#n?.state === "on", n = o("div", { class: "nx-subs" }, ...e.subscriptions.map((n) => o("div", { class: "nx-sub" }, o("code", {}, n.topic), o("span", { class: "nx-dim" }, `QoS ${n.qos ?? 0}`), o("span", { class: "nx-grow" }), o("button", {
			type: "button",
			class: "nx-icon",
			title: O("live.mqtt.unsubscribe"),
			onclick: async () => {
				t && await this.#S("unsubscribe", { topic: n.topic }).catch(() => {}), e.subscriptions.splice(e.subscriptions.indexOf(n), 1), this.touch(), this.#f();
			}
		}, s("x"))))), r = o("input", {
			class: "ctl-text mono",
			placeholder: "sensors/+/temperature"
		}), i = o("select", { class: "ctl-select" }, ...[
			0,
			1,
			2
		].map((e) => o("option", { value: e }, `QoS ${e}`)));
		return o("div", { class: "nx-sec" }, o("p", { class: "nx-hint" }, O("live.mqtt.subsHint")), n, o("div", { class: "nx-modes" }, r, i, o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: async () => {
				if (!r.value.trim()) return;
				let n = {
					topic: r.value.trim(),
					qos: Number(i.value)
				};
				t && await this.#S("subscribe", n).catch((e) => this.owner.notice(e.message)), e.subscriptions.push(n), this.touch(), this.#f();
			}
		}, s("plus"), O("live.mqtt.subscribe"))));
	}
	tab_service() {
		let e = this.item.values, t = o("div", { class: "nx-sec" }), n = this.#o?.services ?? [], r = o("select", {
			class: "ctl-select",
			onchange: (t) => {
				e.service = t.target.value, e.method = n.find((t) => t.name === e.service)?.methods[0]?.name ?? "", this.#_();
			}
		}, o("option", { value: "" }, O("live.grpc.service")), ...n.map((t) => o("option", {
			value: t.name,
			selected: e.service === t.name
		}, t.name))), i = n.find((t) => t.name === e.service)?.methods ?? [], a = o("select", {
			class: "ctl-select",
			onchange: (t) => {
				e.method = t.target.value, this.#_();
			}
		}, o("option", { value: "" }, O("live.grpc.method")), ...i.map((t) => o("option", {
			value: t.name,
			selected: e.method === t.name
		}, `${t.name}${t.clientStreaming || t.serverStreaming ? ` (${[t.clientStreaming && "client", t.serverStreaming && "server"].filter(Boolean).join("+")} stream)` : ""}`))), c = D({
			value: e.proto ?? "",
			lang: "text",
			label: O("live.grpc.proto"),
			minLines: 6,
			onInput: (t) => {
				e.proto = t, this.touch();
			}
		});
		return t.append(o("div", { class: "nx-modes" }, o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: () => this.#v(!1)
		}, s("download"), O("live.grpc.reflect")), o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: () => this.#v(!0)
		}, s("file"), O("live.grpc.fromProto")), this.describing ? o("span", { class: "nx-spin" }) : null), this.describeError ? o("p", { class: "nx-hint warn" }, this.describeError) : null, o("div", { class: "nx-modes" }, r, a), e.service && !n.length ? o("p", { class: "nx-hint" }, O("live.grpc.saved", {
			service: e.service,
			method: e.method
		})) : null, o("div", { class: "nx-flabel" }, O("live.grpc.proto")), c.el, o("p", { class: "nx-hint" }, O("live.grpc.protoHint"))), t;
	}
	#_() {
		let e = this.#c;
		e?.requestExample === void 0 || this.item.values.message && this.item.values.message.trim() !== "{}" && this.item.values.message.trim() !== "{\n  \n}" || (this.item.values.message = JSON.stringify(e.requestExample, null, 2), this.draft = null), this.touch(), this.#p(), this.#f();
	}
	async #v(e) {
		this.describing = !0, this.describeError = "", this.#f();
		try {
			let t = this.#y();
			e || (t.request.values = {
				...t.request.values,
				proto: ""
			}), this.#o = await r.describe(t);
		} catch (e) {
			this.describeError = e.message;
		} finally {
			this.describing = !1, this.#p(), this.#f();
		}
	}
	#y() {
		let e = this.collection, t = Y.env(this.key);
		return {
			request: structuredClone(this.item),
			chain: e && P(e, this.item.id) ? ge(e, this.item.id) : [],
			environment: H(t),
			collection: { values: V(e?.variables) },
			globals: { values: V(Y.globals) }
		};
	}
	async connect() {
		let e = this.#n;
		if (this.protocol === "grpc" && !this.#l) return this.#b();
		if (e && (e.state === "on" || e.state === "connecting")) await r.closeSession(e.id).catch(() => {});
		else try {
			this.#t = [];
			let e = await r.openSession(this.#y());
			this.#x(e);
		} catch (e) {
			this.#t.push({
				n: 0,
				at: Date.now(),
				dir: "sys",
				type: "error",
				data: e.message
			}), this.#h();
		}
	}
	async #b() {
		if (!this.item.values.method) return this.owner.notice(O("live.grpc.pick"));
		this.response.busy(!0);
		try {
			let e = await r.send(this.#y());
			this.owner.applyResult(this.key, e), this.response.show(e.result);
		} catch (e) {
			this.response.show({
				error: {
					code: e.code ?? "internal",
					message: e.message
				},
				checks: [],
				tests: [],
				logs: [],
				redirects: []
			});
		}
	}
	#x(e) {
		this.#e?.detach?.(), this.#n = e;
		let t = r.attach(e.id);
		this.#e = t, t.onmessage = (e) => {
			if (this.#e !== t) return;
			let n;
			try {
				n = JSON.parse(e.data);
			} catch {
				return;
			}
			if (n.t === "state") {
				let e = this.protocol === "mqtt" && n.session.state === "on" && this.#n?.state !== "on";
				if (this.#n = n.session, this.#p(), e) for (let e of this.item.values.subscriptions ?? []) this.#S("subscribe", e).catch(() => {});
				this.#r === "messages" && this.#f();
			} else if (n.t === "history") this.#t = n.items, this.#h();
			else if (n.t === "msg") this.#t.push(n.item), this.#t.length > 5e3 && this.#t.splice(0, 1e3), this.#h(), n.item.meta?.trust && this.#C(n.item.meta.trust, !0);
			else if (n.t === "result") {
				let e = this.#s.get(n.id);
				this.#s.delete(n.id), n.error ? e?.reject(Error(n.error.message)) : e?.resolve(n.result);
			} else n.t === "taken" ? (this.#n = {
				...this.#n,
				state: "closed",
				reason: O("live.taken")
			}, this.#p()) : n.t === "gone" && this.#e === t && (this.#e = null);
		};
	}
	#S(e, t = null) {
		if (!this.#e) return Promise.reject(Error(O("live.notConnected")));
		let n = A();
		return this.#e.postMessage(JSON.stringify({
			t: "command",
			id: n,
			name: e,
			args: t
		})), new Promise((e, t) => {
			this.#s.set(n, {
				resolve: e,
				reject: t
			}), setTimeout(() => {
				this.#s.delete(n) && t(Error(O("live.noAnswer")));
			}, 15e3);
		});
	}
	send(e) {
		if (!this.#e || this.#n?.state !== "on") return this.owner.notice(O("live.notConnected"));
		let t;
		try {
			let n = this.protocol === "grpc" ? "json" : this.#a;
			n === "hex" ? t = {
				type: "binary",
				data: Ye(Xe(e))
			} : n === "base64" ? t = {
				type: "binary",
				data: e.replace(/\s+/g, "")
			} : n === "json" ? (JSON.parse(e), t = {
				type: "json",
				data: e
			}) : t = {
				type: "text",
				data: e
			};
		} catch (e) {
			return this.owner.notice(e.message);
		}
		if (this.protocol === "mqtt") {
			let e = this.draft;
			if (!e?.topic) return this.owner.notice(O("live.mqtt.noTopic"));
			t.meta = {
				topic: e.topic,
				qos: e.qos ?? 0,
				retain: !!e.retain
			};
		}
		this.#e.postMessage(JSON.stringify({
			t: "send",
			msg: t
		}));
	}
	async #C(e, t = !1) {
		await v(this.owner.win, e, { t: O }) && (await r.trust(e), t || this.protocol !== "grpc" ? this.connect() : this.#b());
	}
	focus() {
		this.el.querySelector(".nx-url")?.focus();
	}
	destroy() {
		this.#e?.detach?.(), this.#e = null;
	}
}, tt = class {
	#e = "overview";
	constructor(e, t, n) {
		this.owner = e, this.key = t, this.item = n, this.el = o("div", { class: "nx-folder" }), this.draw();
	}
	get node() {
		return this.item ?? Y.get(this.key).data;
	}
	touch() {
		Y.touch(this.key), this.owner.itemChanged(this.key, this.item);
	}
	draw() {
		let e = Y.get(this.key), t = this.node, n = this.item ? [
			"overview",
			"auth",
			"scripts"
		] : [
			"overview",
			"variables",
			"auth",
			"scripts"
		], r = 0, i = 0;
		N(t.items, (e) => {
			e.type === "folder" ? i++ : r++;
		});
		let c = this.item ? t.name : Y.nameOf(e), l = o("div", { class: "nx-fhead" }, s(this.item ? "folder" : e.file ? "file" : "star", "ico big"), o("div", {}, o("h2", {}, c), o("small", { class: "nx-dim" }, [e.file ? a.tildePath(e.file) : O("mine.where"), O("folder.counts", {
			n: r,
			folders: i
		})].join(" · "))), o("span", { class: "nx-grow" }), o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: () => this.owner.run(this.key, this.item?.id ?? null)
		}, s("play"), O("tools.run"))), u = o("div", {
			class: "nx-subtabs",
			role: "tablist"
		}, ...n.map((e) => o("button", {
			type: "button",
			role: "tab",
			"aria-selected": String(this.#e === e),
			class: this.#e === e ? "on" : "",
			onclick: () => {
				this.#e = e, this.draw();
			}
		}, O(`folder.tab.${e}`))));
		this.el.replaceChildren(l, u, o("div", { class: "nx-reqpane" }, this[`section_${this.#e}`]()));
	}
	section_overview() {
		let e = this.node, t = o("input", {
			class: "ctl-text nx-wide",
			value: e.name ?? "",
			oninput: (t) => {
				e.name = t.target.value, this.touch();
			}
		}), n = o("textarea", {
			class: "ctl-text nx-notes",
			rows: 6,
			placeholder: O("folder.notesHint"),
			oninput: (t) => {
				e.description = t.target.value, this.touch();
			}
		});
		return n.value = e.description ?? "", o("div", { class: "nx-sec nx-settings" }, o("label", { class: "nx-frow" }, o("span", { class: "nx-flabel" }, O("item.name")), t), o("label", { class: "nx-frow" }, o("span", { class: "nx-flabel" }, O("folder.notes")), n), this.item ? null : o("p", { class: "nx-hint" }, O("folder.collectionHint")));
	}
	section_variables() {
		let e = this.node, t = _({
			t: O,
			rows: e.variables,
			mono: !0,
			placeholder: {
				key: O("vars.name"),
				value: O("vars.value")
			},
			onChange: () => this.touch()
		});
		return o("div", { class: "nx-sec" }, o("p", { class: "nx-hint" }, O("vars.collectionHint")), t.el);
	}
	section_auth() {
		let e = this.node;
		e.auth ??= { type: this.item ? "inherit" : "none" };
		let t = Y.get(this.key).data, n = le({
			auth: e.auth,
			win: this.owner.win,
			inherit: !!this.item,
			onChange: () => this.touch(),
			inherited: () => {
				let e = P(t, this.item.id)?.parents.at(-1);
				if (e) {
					let { auth: n, from: r } = I(t, e.id);
					return {
						auth: n,
						name: r === t || !r ? Y.nameOf(Y.get(this.key)) : r.name
					};
				}
				return {
					auth: t.auth ?? { type: "none" },
					name: Y.nameOf(Y.get(this.key))
				};
			}
		});
		return o("div", { class: "nx-sec" }, o("p", { class: "nx-hint" }, O("folder.authHint")), n.el);
	}
	section_scripts() {
		let e = this.node;
		e.scripts ??= {
			pre: "",
			test: ""
		};
		let t = (t) => o("div", { class: "nx-scriptbox" }, o("div", { class: "nx-flabel" }, O(`scripts.${t}`)), D({
			value: e.scripts[t] ?? "",
			lang: "javascript",
			label: O(`scripts.${t}`),
			minLines: 7,
			onInput: (n) => {
				e.scripts[t] = n, this.touch();
			}
		}).el);
		return o("div", { class: "nx-sec" }, o("p", { class: "nx-hint" }, O("folder.scriptsHint")), t("pre"), t("test"));
	}
	destroy() {}
}, nt = "nettest-envs";
function rt(e, t) {
	let i = Y.get(t);
	if (!i) return;
	let a = new n({
		title: O("env.title", { name: Y.nameOf(i) }),
		icon: "globe",
		width: 760,
		height: 480
	}), l = i.data, d = Y.envId(t) ?? l.environments[0]?.id ?? "collection", f = o("nav", { class: "nx-envlist" }), p = o("div", { class: "nx-envpane" });
	a.body.append(o("div", { class: "nx nx-envs" }, f, p));
	let m = () => Y.touch(t), h = async (e) => {
		let t = await c(a, {
			title: O("env.secret.title", { name: e.key || "—" }),
			text: O("env.secret.text"),
			fields: [{
				name: "v",
				type: "password",
				label: O("vars.value"),
				required: !0
			}],
			buttons: ["cancel", "ok"]
		});
		return t?.button === "ok" ? String(t.values.v) : null;
	}, g = {
		label: (e) => e.sealed ? O("env.secret.sealed") : O("env.secret.missing"),
		onSecret: async (e, t) => {
			if (!t) {
				if (await c(a, {
					icon: "warning",
					title: O("env.secret.dropTitle", { name: e.key }),
					text: O("env.secret.dropText"),
					buttons: ["cancel", "continue"]
				}) !== "continue") return;
				Object.assign(e, {
					secret: !1,
					value: ""
				}), delete e.sealed;
				return;
			}
			let n = e.value || await h(e);
			if (n !== null) try {
				e.sealed = await r.seal(n), Object.assign(e, {
					secret: !0,
					value: ""
				}), delete e.needsValue;
			} catch (e) {
				c(a, {
					icon: "error",
					text: e.message
				});
			}
		}
	};
	function v() {
		let e = (e, n, r, i) => o("button", {
			type: "button",
			class: `nx-envitem${d === e ? " on" : ""}`,
			onclick: () => {
				d = e, x();
			},
			oncontextmenu: i ? (e) => {
				e.preventDefault(), i(e.clientX, e.clientY);
			} : null
		}, s(r), o("span", {}, n), Y.envId(t) === e ? o("span", { class: "nx-badge" }, O("env.active")) : null);
		f.replaceChildren(o("h6", {}, O("env.environments")), ...l.environments.map((t) => e(t.id, t.name, "globe", (e, n) => b(t, e, n))), o("button", {
			type: "button",
			class: "nx-link",
			onclick: y
		}, s("plus"), O("env.add")), o("h6", {}, O("env.other")), e("collection", O("env.collectionVars"), "list"), e("globals", O("env.globals"), "star"));
	}
	async function y() {
		let e = await c(a, {
			title: O("env.add"),
			fields: [{
				name: "v",
				label: O("item.name"),
				value: O("env.newName"),
				required: !0
			}],
			buttons: ["cancel", "ok"]
		});
		if (e?.button !== "ok") return;
		let n = {
			id: A(),
			name: String(e.values.v).trim(),
			variables: []
		};
		l.environments.push(n), Y.envId(t) || Y.setEnv(t, n.id), d = n.id, m(), x();
	}
	function b(e, n, r) {
		u(n, r, [
			{
				label: O("env.use"),
				icon: "check",
				action: () => {
					Y.setEnv(t, e.id), x();
				}
			},
			{
				label: O("menu.rename"),
				icon: "pencil",
				action: async () => {
					let t = await c(a, {
						title: O("menu.rename"),
						fields: [{
							name: "v",
							label: O("item.name"),
							value: e.name,
							required: !0
						}],
						buttons: ["cancel", "ok"]
					});
					t?.button === "ok" && (e.name = String(t.values.v).trim(), m(), x());
				}
			},
			{
				label: O("menu.duplicate"),
				icon: "filePlus",
				action: () => {
					let t = {
						...structuredClone(e),
						id: A(),
						name: O("item.copyOf", { name: e.name })
					};
					l.environments.push(t), m(), x();
				}
			},
			{
				label: O("menu.delete"),
				icon: "trash",
				danger: !0,
				action: async () => {
					await c(a, {
						icon: "warning",
						title: O("env.deleteTitle", { name: e.name }),
						buttons: ["cancel", {
							value: "delete",
							label: O("menu.delete"),
							danger: !0,
							primary: !0
						}]
					}) === "delete" && (l.environments.splice(l.environments.indexOf(e), 1), Y.envId(t) === e.id && Y.setEnv(t, null), d = l.environments[0]?.id ?? "collection", m(), x());
				}
			}
		]);
	}
	function x() {
		if (v(), d === "globals") {
			let e = Y.globals, t = _({
				t: O,
				rows: e,
				mono: !0,
				placeholder: {
					key: O("vars.name"),
					value: O("vars.value")
				},
				onChange: () => Y.setGlobals(e)
			});
			return p.replaceChildren(o("h3", {}, O("env.globals")), o("p", { class: "nx-hint" }, O("vars.globalsHint")), t.el);
		}
		if (d === "collection") {
			let e = _({
				t: O,
				rows: l.variables,
				mono: !0,
				placeholder: {
					key: O("vars.name"),
					value: O("vars.value")
				},
				onChange: m
			});
			return p.replaceChildren(o("h3", {}, O("env.collectionVars")), o("p", { class: "nx-hint" }, O("vars.collectionHint")), e.el);
		}
		let e = l.environments.find((e) => e.id === d);
		if (!e) return p.replaceChildren(o("div", { class: "nx-hello" }, o("p", {}, O("env.noneYet")), o("button", {
			type: "button",
			class: "ctl-btn primary",
			onclick: y
		}, s("plus"), O("env.add"))));
		let n = _({
			t: O,
			rows: e.variables,
			mono: !0,
			secret: g,
			placeholder: {
				key: O("vars.name"),
				value: O("vars.value")
			},
			onChange: m
		}), r = e.variables.filter((e) => e.secret && !e.sealed).map((e) => e.key);
		p.replaceChildren(...[
			o("div", { class: "nx-envhead" }, o("h3", {}, e.name), o("span", { class: "nx-grow" }), Y.envId(t) === e.id ? o("span", { class: "nx-badge" }, O("env.active")) : o("button", {
				type: "button",
				class: "ctl-btn",
				onclick: () => {
					Y.setEnv(t, e.id), x();
				}
			}, O("env.use"))),
			o("p", { class: "nx-hint" }, O("vars.envHint")),
			r.length ? o("p", { class: "nx-hint warn" }, s("warning"), O("env.secret.needs", { names: r.join(", ") })) : null,
			n.el,
			o("p", { class: "nx-hint" }, s("lock"), O("env.secret.hint"))
		].filter(Boolean));
	}
	let S = Y.on("collections", () => {
		Y.get(t) || a.emit("close");
	});
	a.on("destroy", S), x(), e.openWindow(a, `${nt}:${t}`);
}
// src/nettest/run.js
function it(e) {
	let t = String(e).replace(/^\uFEFF/, ""), n = t.slice(0, t.search(/\r?\n|$/)), r = n.includes(";") && !n.includes(",") ? ";" : ",", i = [], a = [], o = "", s = !1;
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		s ? n === "\"" && t[e + 1] === "\"" ? (o += "\"", e++) : n === "\"" ? s = !1 : o += n : n === "\"" && !o ? s = !0 : n === r ? (a.push(o), o = "") : n === "\n" || n === "\r" ? (n === "\r" && t[e + 1] === "\n" && e++, a.push(o), o = "", a.some((e) => e !== "") && i.push(a), a = []) : o += n;
	}
	a.push(o), a.some((e) => e !== "") && i.push(a);
	let [c, ...l] = i;
	return c ? l.map((e) => Object.fromEntries(c.map((t, n) => [t.trim(), e[n] ?? ""]))) : [];
}
function at(e, t, i = null) {
	let l = Y.get(t);
	if (!l) return;
	let u = l.data, d = new n({
		title: O("run.title", { name: Y.nameOf(l) }),
		icon: "play",
		width: 820,
		height: 600
	}), f = {
		folder: i ?? "",
		env: Y.envId(t) ?? "",
		iterations: 1,
		delayMs: 0,
		stopOnError: !1,
		data: null,
		dataName: "",
		keep: !0
	}, p = null, h = [], g = null, _ = 0, v = [];
	N(u.items, (e, t, n) => {
		e.type === "folder" && v.push({
			id: e.id,
			label: [...n.map((e) => e.name), e.name].join(" / ")
		});
	});
	let y = (e, t, n) => o("select", {
		class: "ctl-select",
		onchange: (e) => n(e.target.value)
	}, ...t.map(([t, n]) => o("option", {
		value: t,
		selected: String(e) === t
	}, n))), b = o("div", { class: "nx-runform" }), x = o("div", { class: "nx-runbar" }), S = o("div", {
		class: "nx-runlist",
		role: "list"
	});
	d.body.append(o("div", { class: "nx nx-run" }, b, x, S));
	function C() {
		let e = (e, t) => o("label", { class: "nx-frow" }, o("span", { class: "nx-flabel" }, e), t);
		b.replaceChildren(e(O("run.what"), y(f.folder, [["", O("run.all")], ...v.map((e) => [e.id, e.label])], (e) => {
			f.folder = e;
		})), e(O("run.env"), y(f.env, [["", O("env.none")], ...u.environments.map((e) => [e.id, e.name])], (e) => {
			f.env = e;
		})), e(O("run.iterations"), o("input", {
			class: "ctl-text",
			type: "number",
			min: 1,
			max: 1e3,
			value: f.iterations,
			disabled: !!f.data,
			oninput: (e) => {
				f.iterations = Math.max(1, Number(e.target.value) || 1);
			}
		})), e(O("run.data"), o("span", { class: "nx-inline" }, o("span", { class: f.data ? "mono" : "nx-dim" }, f.data ? O("run.dataRows", {
			name: f.dataName,
			n: f.data.length
		}) : O("run.noData")), o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: w
		}, O("req.file.choose")), f.data ? o("button", {
			type: "button",
			class: "nx-icon",
			title: O("run.dropData"),
			onclick: () => {
				f.data = null, C();
			}
		}, s("x")) : null)), e(O("run.delay"), o("input", {
			class: "ctl-text",
			type: "number",
			min: 0,
			value: f.delayMs,
			oninput: (e) => {
				f.delayMs = Math.max(0, Number(e.target.value) || 0);
			}
		})), o("label", { class: "nx-check1" }, o("input", {
			type: "checkbox",
			checked: f.stopOnError,
			onchange: (e) => {
				f.stopOnError = e.target.checked;
			}
		}), O("run.stop")), o("label", { class: "nx-check1" }, o("input", {
			type: "checkbox",
			checked: f.keep,
			onchange: (e) => {
				f.keep = e.target.checked;
			}
		}), O("run.keep")), o("div", { class: "nx-modes" }, o("span", { class: "nx-grow" }), p ? o("button", {
			type: "button",
			class: "ctl-btn danger",
			onclick: () => r.cancelRun(p).catch(() => {})
		}, s("stop"), O("run.cancel")) : o("button", {
			type: "button",
			class: "ctl-btn primary",
			onclick: ee
		}, s("play"), O("run.start"))));
	}
	async function w() {
		let t = await m(e.openWindow, {
			title: O("run.pickData"),
			exts: ["csv", "json"]
		});
		if (t) try {
			let e = await a.read(t.id), n = /\.json$/i.test(t.name) ? JSON.parse(e) : it(e);
			if (!Array.isArray(n) || n.some((e) => !e || typeof e != "object")) throw Error(O("run.badData"));
			f.data = n, f.dataName = t.name, C();
		} catch (e) {
			c(d, {
				icon: "error",
				title: O("run.badData"),
				text: e.message
			});
		}
	}
	function T() {
		let e = h.filter((e) => e.ok && !e.skipped).length, t = h.filter((e) => !e.ok).length, n = h.filter((e) => e.skipped).length, r = _ ? Math.round(h.length / _ * 100) : 0;
		x.replaceChildren(...[
			o("span", { class: "nx-pill s2" }, s("check"), O("run.passed", { n: e })),
			o("span", { class: `nx-pill ${t ? "s5" : "s1"}` }, s("x"), O("run.failed", { n: t })),
			n ? o("span", { class: "nx-pill s1" }, O("run.skipped", { n })) : null,
			o("span", { class: "nx-grow" }),
			g ? o("span", { class: "nx-dim" }, g.cancelled ? O("run.cancelled") : O("run.done", { time: X(g.ms) })) : p ? o("span", { class: "nx-dim" }, `${h.length}/${_}`) : null,
			h.length && !p ? o("button", {
				type: "button",
				class: "ctl-btn",
				onclick: te
			}, s("download"), O("run.export")) : null,
			o("div", { class: "nx-progress" }, o("i", { style: `width:${g ? 100 : r}%` }))
		].filter(Boolean));
	}
	function E(n) {
		let r = [...n.checks.filter((e) => !e.ok).map((e) => `${e.label || O("res.check")}: ${e.actual}`), ...n.tests.filter((e) => e.ok === !1).map((e) => `${e.name}: ${e.error ?? ""}`)], i = n.logs.filter((e) => e.level === "error").map((e) => e.text);
		return o("details", {
			class: `nx-runrow ${n.skipped ? "skip" : n.ok ? "ok" : "ko"}`,
			role: "listitem"
		}, o("summary", {}, s(n.skipped ? "minus" : n.ok ? "check" : "x"), o("span", { class: "nx-name" }, n.name || n.id), n.iteration ? o("span", { class: "nx-dim" }, `#${n.iteration + 1}`) : null, o("span", { class: "nx-grow" }), n.response ? o("span", { class: `nx-st ${Pe(n.response.status)}` }, String(n.response.status)) : null, o("span", { class: "nx-dim" }, X(n.ms))), o("div", { class: "nx-rundetail" }, n.request ? o("div", { class: "mono" }, `${n.request.method} ${n.request.url}`) : null, n.skipped ? o("p", { class: "nx-dim" }, n.skipped) : null, n.error ? o("p", { class: "nx-hint warn" }, n.error.message) : null, ...[...r, ...i].map((e) => o("p", { class: "nx-hint warn" }, e)), ...n.tests.filter((e) => e.ok).map((e) => o("p", { class: "nx-dim" }, `✓ ${e.name}`)), n.logs.length ? o("pre", { class: "nx-raw" }, n.logs.map((e) => e.text).join("\n")) : null, o("button", {
			type: "button",
			class: "nx-link",
			onclick: () => {
				e.openItem(t, n.id);
			}
		}, O("run.openRequest"))));
	}
	async function ee() {
		h = [], g = null, S.replaceChildren();
		try {
			let n = u.environments.find((e) => e.id === f.env) ?? null, i = JSON.parse(B(u)), a = await r.run({
				collection: i,
				only: f.folder ? [f.folder] : null,
				environment: H(n),
				globals: { values: V(Y.globals) },
				data: f.data,
				iterations: f.iterations,
				delayMs: f.delayMs,
				stopOnError: f.stopOnError
			});
			p = a.id, _ = a.total, C(), T();
			for (let e = 0;;) {
				let t = await r.progress(p, {
					after: e,
					wait: !0
				});
				for (let e of t.results) h.push(e), S.append(E(e));
				if (e = t.next, T(), t.done) {
					g = t.summary;
					break;
				}
			}
			g && f.keep && f.env === Y.envId(t) && e.applyResult(t, {
				vars: g.vars,
				secret: g.secret,
				renewed: g.renewed
			});
		} catch (e) {
			c(d, {
				icon: "error",
				title: O("run.failedTitle"),
				text: e.message
			});
		} finally {
			p = null, C(), T();
		}
	}
	async function te() {
		let t = await m(e.openWindow, {
			kind: "folder",
			title: O("file.whereTo")
		});
		if (!t) return;
		let n = `${a.cleanName(Y.nameOf(l), { portable: !0 }) || "nettest"} ${(/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[T:]/g, "-")}.json`, r = a.create(t.id, {
			type: "file",
			name: n
		}), i = h.map(({ response: e, ...t }) => ({
			...t,
			response: e && {
				status: e.status,
				statusText: e.statusText,
				headers: e.headers,
				size: e.size,
				timings: e.timings
			}
		}));
		await a.write(r.id, `${JSON.stringify({
			collection: Y.nameOf(l),
			at: (/* @__PURE__ */ new Date()).toISOString(),
			summary: g,
			results: i
		}, null, 2)}\n`), e.notice(O("file.exported", { path: a.tildePath(r.id) }));
	}
	d.on("destroy", () => {
		p && r.cancelRun(p).catch(() => {});
	}), C(), T(), e.openWindow(d), i && !P(u, i) && (f.folder = "");
}
// src/nettest/dialogs.js
var Q = () => import("./formats-BbYv1NMK.js");
function ot(e) {
	let t = new n({
		title: O("import.title"),
		icon: "download",
		width: 640,
		height: 520
	}), r = "", i = "", l = "file", u = null, d = D({
		value: "",
		lang: "json",
		label: O("import.paste"),
		placeholder: O("import.placeholder"),
		minLines: 10,
		onInput: (e) => {
			r = e, g();
		}
	}), f = o("p", { class: "nx-hint" }), m = o("div", { class: "nx-radios" }), h = o("button", {
		type: "button",
		class: "ctl-btn primary",
		disabled: !0,
		onclick: () => v()
	}, O("import.do"));
	async function g() {
		let e = await Q();
		u = r.trim() ? e.detectFormat(r) : null, f.replaceChildren(...r.trim() ? [s(u ? "check" : "warning"), u ? O("import.detected", { format: O(`import.format.${u}`) }) : O("import.unknown")] : [O("import.hint")]), h.disabled = !u;
	}
	function _() {
		m.replaceChildren(...[["file", O("import.toFile")], ["mine", O("import.toMine")]].map(([e, t]) => o("label", { class: "nx-check1" }, o("input", {
			type: "radio",
			name: "where",
			checked: l === e,
			onchange: () => {
				l = e;
			}
		}), t)));
	}
	async function v() {
		try {
			let { collection: n, environments: a = [], warnings: o = [] } = (await Q()).importText(r, { name: i });
			if (!n) {
				let t = Y.get(e.active?.col ?? "mine");
				t.data.environments.push(...a), Y.touch(t.key);
			} else if (l === "mine") {
				let e = {
					...j(n.name || i || O("import.imported")),
					items: n.items,
					auth: n.auth ?? { type: "inherit" },
					scripts: n.scripts
				}, t = Y.get(J).data;
				t.items.push(e), t.variables.push(...(n.variables ?? []).filter((e) => !t.variables.some((t) => t.key === e.key))), t.environments.push(...n.environments ?? []), Y.touch(J);
			} else {
				let t = await p.pickFile(e.openWindow, {
					kind: "folder",
					title: O("file.whereTo")
				});
				if (!t) return;
				let r = await Y.createFile(t.id, n.name || i || O("import.imported"), n);
				e.openItem(r.key, null);
			}
			let s = (n?.environments ?? a).flatMap((e) => e.variables.filter((e) => e.secret).map((e) => e.key)), u = [...o, ...s.length ? [O("import.secrets", { names: [...new Set(s)].join(", ") })] : []];
			u.length && await c(t, {
				icon: "info",
				title: O("import.doneNotes"),
				text: u.slice(0, 30).join("\n")
			}), t.emit("close");
		} catch (e) {
			c(t, {
				icon: "error",
				title: O("import.failed"),
				text: e.message
			});
		}
	}
	let y = o("button", {
		type: "button",
		class: "ctl-btn",
		onclick: async () => {
			let t = await p.pickFile(e.openWindow, {
				title: O("import.pick"),
				exts: [
					"json",
					"yaml",
					"yml",
					"har",
					"txt",
					"sh",
					de
				]
			});
			t && (r = await a.read(t.id), i = t.name.replace(/\.(postman_collection\.json|json|yaml|yml|har|txt|sh|nettest)$/i, ""), d.setValue(r.length > 2e5 ? `${r.slice(0, 2e5)}\n…` : r), g());
		}
	}, s("folderOpen"), O("import.pick"));
	_(), g(), t.body.append(o("div", { class: "nx nx-dialog" }, o("p", {}, O("import.intro")), o("div", { class: "nx-modes" }, y, o("span", { class: "nx-dim" }, O("import.orPaste"))), d.el, f, m, o("div", { class: "nx-modes" }, o("span", { class: "nx-grow" }), o("button", {
		type: "button",
		class: "ctl-btn",
		onclick: () => t.emit("close")
	}, O("ui.cancel")), h))), e.openWindow(t);
}
function st(e, t) {
	let n = Y.get(e).data, r = U(n, Y.env(e), Y.globals), i = (e) => G(e, r), a = (e) => typeof e == "string" ? i(e) : Array.isArray(e) ? e.map(a) : e && typeof e == "object" ? Object.fromEntries(Object.entries(e).map(([e, t]) => [e, a(t)])) : e, o = P(n, t.id) ? I(n, t.id).auth : t.auth?.type === "inherit" ? { type: "none" } : t.auth;
	return a({
		...structuredClone(t),
		auth: structuredClone(o ?? { type: "none" }),
		headers: t.headers.filter((e) => e.enabled !== !1 && e.key)
	});
}
async function ct(e, t, r) {
	let i = await Q(), a = new n({
		title: O("code.title", { name: r.name || r.url }),
		icon: "code",
		width: 720,
		height: 520
	}), c = Y.codeLanguage ?? "curl", l = st(t, r), u = D({
		readOnly: !0,
		lang: "text",
		label: O("code.title", { name: "" }),
		minLines: 14
	}), d = () => {
		try {
			u.setValue(i.toCode(c, l));
		} catch (e) {
			u.setValue(`// ${e.message}`);
		}
		u.setLang({
			fetch: "javascript",
			node: "javascript",
			python: "python",
			php: "text"
		}[c] ?? "text");
	}, f = o("select", {
		class: "ctl-select",
		onchange: (e) => {
			c = e.target.value, Y.codeLanguage = c, d();
		}
	}, ...i.LANGUAGES.map((e) => o("option", {
		value: e.id,
		selected: e.id === c
	}, e.label))), p = o("button", {
		type: "button",
		class: "ctl-btn primary",
		onclick: async () => {
			await navigator.clipboard?.writeText(u.value), p.replaceChildren(s("check"), O("code.copied")), setTimeout(() => p.replaceChildren(s("code"), O("code.copy")), 1500);
		}
	}, s("code"), O("code.copy"));
	d(), a.body.append(o("div", { class: "nx nx-dialog" }, o("div", { class: "nx-modes" }, f, o("span", { class: "nx-grow" }), p), u.el, o("p", { class: "nx-hint" }, s("lock"), O("code.secrets")))), e.openWindow(a);
}
function lt(e) {
	let t = new n({
		title: O("cookies.title"),
		icon: "list",
		width: 680,
		height: 440
	}), r = o("div", { class: "nx nx-dialog" }), i = () => {
		let e = Ae(), t = Object.groupBy ? Object.groupBy(e, (e) => e.domain) : e.reduce((e, t) => ((e[t.domain] ??= []).push(t), e), {});
		r.replaceChildren(o("p", { class: "nx-hint" }, O("cookies.hint")), ...e.length ? Object.entries(t).map(([e, t]) => o("details", {
			open: !0,
			class: "nx-cookies"
		}, o("summary", {}, o("b", {}, e), o("span", { class: "nx-dim" }, ` · ${t.length}`), o("button", {
			type: "button",
			class: "nx-icon",
			title: O("cookies.removeAll"),
			onclick: () => {
				je(e), i();
			}
		}, s("trash"))), o("table", { class: "nx-table" }, o("tbody", {}, ...t.map((t) => o("tr", {}, o("th", {}, t.name), o("td", { class: "mono" }, t.value.slice(0, 200)), o("td", { class: "nx-dim" }, t.path), o("td", { class: "nx-dim" }, t.expires ? new Date(t.expires).toLocaleString() : O("res.cookie.session")), o("td", {}, o("button", {
			type: "button",
			class: "nx-icon",
			title: O("cookies.remove"),
			onclick: () => {
				je(e, t.key), i();
			}
		}, s("x"))))))))) : [o("p", { class: "nx-dim" }, O("cookies.none"))]);
	}, a = Y.on("cookies", i);
	t.on("destroy", a), i(), t.body.append(r), e.openWindow(t, "nettest-cookies");
}
async function ut(e, t, n = null) {
	let r = Y.get(t);
	if (!r) return;
	if (!p.isInstalled("scheduler")) return c(e.win, {
		icon: "warning",
		text: O("schedule.noScheduler")
	});
	if (!r.file) return await c(e.win, {
		icon: "info",
		title: O("schedule.needFile"),
		text: O("schedule.needFileText")
	}), e.saveAs(t);
	r.dirty && await e.save(t);
	let i = Y.env(t), o = n ? P(r.data, n)?.item : null;
	p.launch("scheduler", {
		name: o ? `${Y.nameOf(r)} · ${o.name}` : Y.nameOf(r),
		what: {
			type: "collection",
			file: r.file,
			label: a.tildePath(r.file),
			environment: i?.id ?? null,
			environmentLabel: i?.name ?? "",
			only: o ? [o.id] : null
		}
	}, "create");
}
// src/nettest/window.js
var dt = "nettest.side", ft = "nettest.folders", $ = /* @__PURE__ */ new Set(), pt = class {
	tabs = [];
	active = null;
	#e = "collections";
	#t = "";
	#n = new Set(f.get(ft, []));
	constructor({ args: e = {}, openWindow: t }) {
		this.openWindow = t, Y.load(), this.win = new n({
			title: O("app.name"),
			icon: "globe",
			width: 1180,
			height: 720
		}), this.win.getState = () => ({
			tabs: this.tabs.map((e) => e.key),
			active: this.active?.key ?? null
		}), this.win.canClose = () => this.#S();
		let i = new AbortController();
		this.signal = i.signal, this.win.on("destroy", () => {
			i.abort(), this.offs.forEach((e) => e()), this.tabs.forEach((e) => e.view?.destroy?.()), $.delete(this);
		}), $.add(this), this.bar = new h({
			t: O,
			signal: this.signal,
			label: O("tabs.label"),
			newLabel: O("tabs.new")
		}), this.bar.on("select", (e) => this.select(e)), this.bar.on("close", (e) => this.closeTab(e)), this.bar.on("new", () => this.newRequest(J, "http")), this.bar.on("move", ({ key: e, index: t }) => {
			let n = this.tabs.find((t) => t.key === e);
			this.tabs.splice(this.tabs.indexOf(n), 1), this.tabs.splice(t, 0, n), this.#v();
		}), this.bar.on("menu", ({ key: e, x: t, y: n }) => u(t, n, [{
			label: O("tabs.close"),
			action: () => this.closeTab(e)
		}, {
			label: O("tabs.closeOthers"),
			action: () => this.tabs.filter((t) => t.key !== e).forEach((e) => this.closeTab(e.key))
		}])), this.envSelect = o("select", {
			class: "ctl-select nx-envsel",
			"aria-label": O("env.choose"),
			onchange: () => {
				let e = this.active;
				e && Y.setEnv(e.col, this.envSelect.value || null);
			}
		}), this.tree = o("div", {
			class: "nx-tree",
			role: "tree",
			"aria-label": O("side.collections")
		}), this.side = o("aside", { class: "nx-side" }), this.main = o("div", { class: "nx-main" }), this.empty = o("div", { class: "nx-empty" });
		let a = Number(f.get(dt, 0)) || 260;
		this.side.style.width = `${a}px`;
		let c = d({
			get: () => this.side.offsetWidth,
			set: (e, t) => {
				this.side.style.width = `${e}px`, t && f.set(dt, e);
			},
			min: 180,
			max: 520,
			reset: 260,
			label: O("side.resize"),
			host: this.side
		}), l = o("div", { class: "nx-tools" }, o("button", {
			type: "button",
			class: "ctl-btn primary",
			onclick: (e) => this.#g(e.currentTarget)
		}, s("plus"), O("tools.new")), o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: () => ot(this)
		}, s("download"), O("tools.import")), o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: () => this.openCollectionFile()
		}, s("folderOpen"), O("tools.open")), o("span", { class: "nx-sep" }), s("globe", "ico nx-envico"), this.envSelect, o("button", {
			type: "button",
			class: "nx-icon",
			title: O("env.manage"),
			onclick: () => this.environments()
		}, s("gear")), o("span", { class: "nx-grow" }), o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: () => lt(this)
		}, O("tools.cookies")), o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: () => this.run()
		}, s("play"), O("tools.run")), o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: () => this.schedule()
		}, s("clock"), O("tools.schedule")), o("button", {
			type: "button",
			class: "ctl-btn",
			title: O("tools.saveKeys"),
			onclick: () => this.save()
		}, s("save"), O("tools.save")));
		this.body = o("div", { class: "nx-body" }, this.side, c, o("div", { class: "nx-work" }, this.bar.el, this.main)), this.win.body.append(o("div", { class: "nx" }, l, this.body)), this.win.body.addEventListener("keydown", (e) => this.#C(e)), this.offs = [
			Y.on("collections", () => {
				this.#o(), this.#v(), this.#_();
			}),
			Y.on("change", (e) => {
				e !== this.#r && this.#s();
			}),
			Y.on("history", () => {
				this.#e === "history" && this.#s();
			}),
			Y.on("env", () => this.#_())
		], this.#o(), this.#a(e), r.info().then((e) => {
			this.protocols = new Set(e.protocols.map((e) => e.id));
		}, () => {});
	}
	#r = null;
	protocols = null;
	#i(e, t = null) {
		return fe.map((n) => {
			let r = n.module && this.protocols && !this.protocols.has(n.id);
			return {
				label: r ? O("menu.needsModule", {
					protocol: n.label,
					module: n.module
				}) : n.label,
				disabled: !!r,
				action: () => this.newRequest(e, n.id, t)
			};
		});
	}
	async #a(e) {
		if (typeof e?.file == "string") try {
			let t = await Y.openFile(e.file);
			this.openItem(t.key, null);
		} catch (e) {
			this.notice(e.message);
		}
		for (let t of Array.isArray(e?.tabs) ? e.tabs : []) {
			let [e, n] = String(t).split("/");
			(Y.get(e) || await Y.openFile(e).catch(() => null)) && this.openItem(e, n || null, { quiet: !0 });
		}
		e?.active && this.select(e.active), this.tabs.length || this.#v();
	}
	async openFileArg(e) {
		try {
			let t = await Y.openFile(e);
			this.#n.delete(t.key), this.openItem(t.key, null);
		} catch (e) {
			this.notice(e.message, "error");
		}
	}
	notice(e, t = "info") {
		l?.send?.({
			text: String(e),
			level: t
		}).catch(() => {});
	}
	#o() {
		let e = o("div", { class: "nx-sideseg" }, ...["collections", "history"].map((e) => o("button", {
			type: "button",
			class: this.#e === e ? "on" : "",
			onclick: () => {
				this.#e = e, this.#o();
			}
		}, s(e === "history" ? "clock" : "list"), O(`side.${e}`)))), t = o("input", {
			class: "ctl-text nx-search",
			type: "search",
			placeholder: O("side.search"),
			value: this.#t,
			oninput: () => {
				this.#t = t.value.toLowerCase(), this.#s();
			}
		});
		this.side.replaceChildren(e, t, this.tree), this.#s();
	}
	#s() {
		if (this.#e === "history") return this.#c();
		let e = [], t = this.#t;
		for (let n of Y.list) {
			let r = n.data, i = !this.#n.has(n.key);
			if (e.push(o("div", {
				class: `nx-node col${this.active?.col === n.key && !this.active.id ? " sel" : ""}`,
				role: "treeitem",
				"aria-expanded": String(i),
				tabindex: "0",
				onclick: () => this.#u(n.key),
				ondblclick: () => this.openItem(n.key, null),
				oncontextmenu: (e) => {
					e.preventDefault(), this.#m(n, e.clientX, e.clientY);
				}
			}, s(i ? "arrowDown" : "arrowRight", "ico nx-caret"), s(n.file ? "file" : "star"), o("span", { class: "nx-name" }, Y.nameOf(n)), n.dirty ? o("span", {
				class: "nx-dirty",
				title: O("side.unsaved")
			}) : null, o("button", {
				type: "button",
				class: "nx-icon nx-more",
				title: O("side.menu"),
				onclick: (e) => {
					e.stopPropagation();
					let t = e.currentTarget.getBoundingClientRect();
					this.#m(n, t.left, t.bottom);
				}
			}, s("list")))), !i && !t) continue;
			let a = (e) => !t || e.name.toLowerCase().includes(t) || (e.url ?? "").toLowerCase().includes(t) || e.type === "folder" && e.items.some(a), c = (r, i) => {
				for (let l of r) {
					if (!a(l)) continue;
					let r = `${n.key}/${l.id}`;
					if (l.type === "folder") {
						let a = t || !this.#n.has(r);
						e.push(o("div", {
							class: `nx-node folder${this.active?.key === r ? " sel" : ""}`,
							style: `--depth:${i}`,
							role: "treeitem",
							"aria-expanded": String(!!a),
							tabindex: "0",
							onclick: () => this.#u(r),
							ondblclick: () => this.openItem(n.key, l.id),
							oncontextmenu: (e) => {
								e.preventDefault(), this.#h(n, l, e.clientX, e.clientY);
							},
							draggable: "true",
							ondragstart: (e) => this.#d(e, n, l),
							ondragover: (e) => this.#f(e),
							ondrop: (e) => this.#p(e, n, l)
						}, s(a ? "arrowDown" : "arrowRight", "ico nx-caret"), s(a ? "folderOpen" : "folder"), o("span", { class: "nx-name" }, l.name || O("item.unnamedFolder")))), a && c(l.items, i + 1);
					} else {
						let t = k(l.protocol);
						e.push(o("div", {
							class: `nx-node req${this.active?.key === r ? " sel" : ""}`,
							style: `--depth:${i}`,
							role: "treeitem",
							tabindex: "0",
							onclick: () => this.openItem(n.key, l.id),
							onkeydown: (e) => {
								e.key === "Enter" && this.openItem(n.key, l.id);
							},
							oncontextmenu: (e) => {
								e.preventDefault(), this.#h(n, l, e.clientX, e.clientY);
							},
							draggable: "true",
							ondragstart: (e) => this.#d(e, n, l),
							ondragover: (e) => this.#f(e),
							ondrop: (e) => this.#p(e, n, l)
						}, l.protocol === "http" ? o("span", { class: `nx-m ${Z(l.method)}` }, l.method.slice(0, 6)) : o("span", { class: `nx-m p-${l.protocol}` }, t.label.slice(0, 4)), o("span", { class: "nx-name" }, l.name || l.url || O("item.unnamed"))));
					}
				}
			};
			c(r.items, 1), !r.items.length && !t && e.push(o("button", {
				type: "button",
				class: "nx-node add",
				style: "--depth:1",
				onclick: () => this.newRequest(n.key, "http")
			}, s("plus"), O("side.firstRequest")));
		}
		this.tree.replaceChildren(...e);
	}
	#c() {
		let e = this.#t, t = Y.history.filter((t) => !e || `${t.method} ${t.url} ${t.name}`.toLowerCase().includes(e)), n = (e) => new Date(e).toLocaleDateString(void 0, {
			weekday: "long",
			day: "numeric",
			month: "long"
		}), r = [], i = "";
		for (let e of t) {
			let t = n(e.at);
			t !== i && (r.push(o("h6", { class: "nx-day" }, t)), i = t), r.push(o("div", {
				class: "nx-node hist",
				tabindex: "0",
				title: `${e.method} ${e.url}`,
				onclick: () => this.#l(e)
			}, e.protocol === "http" || e.protocol === "graphql" ? o("span", { class: `nx-m ${Z(e.method)}` }, String(e.method).slice(0, 6)) : o("span", { class: `nx-m p-${e.protocol}` }, k(e.protocol).label.slice(0, 4)), o("span", { class: "nx-name" }, e.url), o("span", { class: `nx-st ${e.error ? "s5" : e.status >= 400 ? "s4" : "s2"}` }, e.error ? "!" : String(e.status ?? ""))));
		}
		t.length ? r.push(o("button", {
			type: "button",
			class: "nx-link",
			onclick: () => Y.clearHistory()
		}, s("trash"), O("side.clearHistory"))) : r.push(o("p", { class: "nx-dim nx-pad" }, O("side.noHistory"))), this.tree.replaceChildren(...r);
	}
	#l(e) {
		let t = Y.get(e.key);
		if (t && P(t.data, e.item)) return this.openItem(e.key, e.item);
		if (!e.snapshot) return this.notice(O("side.historyGone"));
		let n = {
			...F(e.snapshot),
			name: e.snapshot.name || e.url
		};
		Y.get(J).data.items.push(n), Y.touch(J), this.openItem(J, n.id);
	}
	#u(e) {
		this.#n.has(e) ? this.#n.delete(e) : this.#n.add(e), f.set(ft, [...this.#n].slice(-500)), this.#s();
	}
	#d(e, t, n) {
		e.dataTransfer.setData("application/x-nettest", JSON.stringify({
			col: t.key,
			id: n.id
		})), e.dataTransfer.effectAllowed = "move";
	}
	#f(e) {
		e.dataTransfer.types.includes("application/x-nettest") && (e.preventDefault(), e.dataTransfer.dropEffect = "move");
	}
	#p(e, t, n) {
		e.preventDefault();
		let r;
		try {
			r = JSON.parse(e.dataTransfer.getData("application/x-nettest"));
		} catch {
			return;
		}
		if (r.id === n.id) return;
		let i = Y.get(r.col)?.data, a = i && P(i, r.id);
		if (!a || a.item.type === "folder" && (a.item.id === n.id || !N(a.item.items, (e) => e.id !== n.id))) return;
		a.list.splice(a.list.indexOf(a.item), 1);
		let o = P(t.data, n.id);
		if (n.type === "folder" ? n.items.push(a.item) : o.list.splice(o.list.indexOf(n), 0, a.item), Y.touch(r.col), r.col !== t.key) {
			Y.touch(t.key);
			for (let e of this.tabs.filter((e) => e.col === r.col && e.id === a.item.id)) this.closeTab(e.key);
		}
	}
	#m(e, t, n) {
		u(t, n, [
			{
				label: O("menu.newRequest"),
				icon: "plus",
				items: this.#i(e.key)
			},
			{
				label: O("menu.newFolder"),
				icon: "folderPlus",
				action: () => this.newFolder(e.key)
			},
			"-",
			{
				label: O("menu.settings"),
				icon: "gear",
				action: () => this.openItem(e.key, null)
			},
			{
				label: O("menu.environments"),
				icon: "globe",
				action: () => this.environments(e.key)
			},
			{
				label: O("menu.run"),
				icon: "play",
				action: () => this.run(e.key)
			},
			{
				label: O("menu.schedule"),
				icon: "clock",
				disabled: !e.file,
				action: () => this.schedule(e.key)
			},
			"-",
			...e.file ? [{
				label: O("menu.save"),
				icon: "save",
				disabled: !e.dirty,
				action: () => this.save(e.key)
			}] : [],
			{
				label: O("menu.saveAs"),
				icon: "filePlus",
				action: () => this.saveAs(e.key)
			},
			{
				label: O("menu.export"),
				icon: "download",
				action: () => this.exportPostman(e.key)
			},
			...e.file ? ["-", {
				label: O("menu.close"),
				icon: "x",
				action: () => this.closeCollection(e.key)
			}] : []
		]);
	}
	#h(e, t, n, r) {
		let i = t.type === "folder";
		u(n, r, [
			...i ? [
				{
					label: O("menu.newRequest"),
					icon: "plus",
					items: this.#i(e.key, t.id)
				},
				{
					label: O("menu.newFolder"),
					icon: "folderPlus",
					action: () => this.newFolder(e.key, t.id)
				},
				{
					label: O("menu.settings"),
					icon: "gear",
					action: () => this.openItem(e.key, t.id)
				},
				{
					label: O("menu.run"),
					icon: "play",
					action: () => this.run(e.key, t.id)
				},
				"-"
			] : [
				{
					label: O("menu.open"),
					icon: "open",
					action: () => this.openItem(e.key, t.id)
				},
				{
					label: O("req.copyCode"),
					icon: "code",
					disabled: !["http", "graphql"].includes(t.protocol),
					action: () => this.copyAsCode(e.key, t)
				},
				"-"
			],
			{
				label: O("menu.rename"),
				icon: "pencil",
				action: () => this.rename(e.key, t)
			},
			{
				label: O("menu.duplicate"),
				icon: "filePlus",
				action: () => this.duplicate(e.key, t.id)
			},
			{
				label: O("menu.delete"),
				icon: "trash",
				danger: !0,
				action: () => this.remove(e.key, t)
			}
		]);
	}
	#g(e) {
		let t = e.getBoundingClientRect(), n = this.active?.col ?? "mine";
		u(t.left, t.bottom, [
			...this.#i(n),
			"-",
			{
				label: O("menu.newFolder"),
				icon: "folderPlus",
				action: () => this.newFolder(n)
			},
			{
				label: O("menu.newCollection"),
				icon: "filePlus",
				action: () => this.newCollection()
			}
		]);
	}
	#_() {
		let e = this.active?.col ?? "mine", t = Y.get(e), n = Y.envId(e);
		this.envSelect.replaceChildren(o("option", { value: "" }, O("env.none")), ...(t?.data.environments ?? []).map((e) => o("option", {
			value: e.id,
			selected: e.id === n
		}, e.name))), this.envSelect.title = t ? O("env.of", { name: Y.nameOf(t) }) : "";
	}
	#v() {
		this.tabs = this.tabs.filter((e) => {
			let t = Y.get(e.col);
			return t && (!e.id || P(t.data, e.id)) ? !0 : (e.view?.destroy?.(), !1);
		}), this.active && !this.tabs.includes(this.active) && (this.active = this.tabs.at(-1) ?? null), this.bar.render(this.tabs.map((e) => {
			let t = Y.get(e.col), n = e.id ? P(t.data, e.id)?.item : null, r = this.#y(e), i = n?.type === "request" ? o("span", { class: `nx-m small ${n.protocol === "http" ? Z(n.method) : `p-${n.protocol}`}` }, n.protocol === "http" ? n.method.slice(0, 3) : k(n.protocol).label.slice(0, 3)) : n ? "folder" : "gear";
			return {
				key: e.key,
				label: r,
				icon: i,
				detail: Y.list.length > 1 ? Y.nameOf(t) : "",
				dirty: t.dirty,
				title: n?.url ?? ""
			};
		}), this.active?.key), this.active ? this.main.firstChild !== this.active.view.el && this.main.replaceChildren(this.active.view.el) : (this.main.replaceChildren(this.empty), this.empty.replaceChildren(o("div", { class: "nx-hello" }, s("globe", "ico big"), o("h2", {}, O("empty.title")), o("p", {}, O("empty.text")), o("div", { class: "nx-modes center" }, ...[
			"http",
			"graphql",
			"ws",
			"grpc",
			"mqtt"
		].map((e) => o("button", {
			type: "button",
			class: "ctl-btn",
			onclick: () => this.newRequest(J, e)
		}, k(e).label))), o("p", {}, o("button", {
			type: "button",
			class: "nx-link",
			onclick: () => ot(this)
		}, O("empty.import"))))));
		let e = this.active ? this.#y(this.active) : "";
		this.win.setTitle(e ? `${e} — ${O("app.name")}` : O("app.name")), this.#_();
	}
	#y(e) {
		let t = Y.get(e.col), n = e.id ? P(t.data, e.id)?.item : null;
		return n ? n.name || n.url || O("item.unnamed") : Y.nameOf(t);
	}
	openItem(e, t, { quiet: n = !1 } = {}) {
		let r = `${e}/${t ?? ""}`, i = this.tabs.find((e) => e.key === r);
		if (!i) {
			let n = Y.get(e), a = t ? P(n?.data ?? { items: [] }, t)?.item : null;
			if (!n || t && !a) return;
			i = {
				key: r,
				col: e,
				id: t,
				view: !a || a.type === "folder" ? new tt(this, e, a) : k(a.protocol).live || a.protocol === "grpc" ? new et(this, e, a) : new Ke(this, e, a)
			}, this.tabs.push(i);
		}
		return !n || !this.active ? this.select(r) : this.#v(), i;
	}
	select(e) {
		let t = this.tabs.find((t) => t.key === e);
		t && (this.active = t, this.#v(), this.#s(), queueMicrotask(() => t.view.focus?.()));
	}
	closeTab(e) {
		let t = this.tabs.find((t) => t.key === e);
		if (!t) return;
		t.view?.destroy?.();
		let n = this.tabs.indexOf(t);
		this.tabs.splice(n, 1), this.active === t && (this.active = this.tabs[n] ?? this.tabs[n - 1] ?? null), this.#v(), this.#s();
	}
	itemChanged(e) {
		this.#r = e, clearTimeout(this.itemTimer), this.itemTimer = setTimeout(() => {
			this.#r = null, this.#s();
			for (let e of $) e !== this && e.#s();
			let e = this.bar.el.scrollLeft;
			this.#v(), this.bar.el.scrollLeft = e;
		}, 250);
	}
	#b(e, t) {
		let n = Y.get(e).data;
		return t ? P(n, t)?.item.items ?? n.items : n.items;
	}
	newRequest(e, t, n = null) {
		let r = he(t, "");
		r.name = O("item.newName", { protocol: k(t).label }), this.#b(e, n).push(r), n && this.#n.delete(`${e}/${n}`), this.#n.delete(e), Y.touch(e), this.openItem(e, r.id);
	}
	async newFolder(e, t = null) {
		let n = await this.#x(O("menu.newFolder"), O("item.folderName"), O("item.newFolderName"));
		n && (this.#b(e, t).push(j(n)), Y.touch(e));
	}
	async rename(e, t) {
		let n = await this.#x(O("menu.rename"), O("item.name"), t.name);
		n !== null && (t.name = n, Y.touch(e), this.#v());
	}
	duplicate(e, t) {
		let n = P(Y.get(e).data, t);
		if (!n) return;
		let r = F(n.item);
		r.name = O("item.copyOf", { name: n.item.name }), n.list.splice(n.list.indexOf(n.item) + 1, 0, r), Y.touch(e), r.type === "request" && this.openItem(e, r.id);
	}
	async remove(e, t) {
		if (await c(this.win, {
			icon: "warning",
			title: O(t.type === "folder" ? "item.deleteFolder" : "item.deleteRequest", { name: t.name }),
			text: t.type === "folder" ? O("item.deleteFolderText") : "",
			buttons: ["cancel", {
				value: "delete",
				label: O("menu.delete"),
				danger: !0,
				primary: !0
			}]
		}) !== "delete") return;
		let n = P(Y.get(e).data, t.id);
		n && (n.list.splice(n.list.indexOf(n.item), 1), Y.touch(e), this.#v());
	}
	async #x(e, t, n = "") {
		let r = await c(this.win, {
			title: e,
			fields: [{
				name: "v",
				label: t,
				value: n,
				required: !0,
				maxLength: 120
			}],
			buttons: ["cancel", "ok"]
		});
		return r?.button === "ok" ? String(r.values.v).trim() : null;
	}
	async newCollection() {
		let e = await this.#x(O("menu.newCollection"), O("item.collectionName"), O("item.newCollectionName"));
		if (!e) return;
		let t = await p.pickFile(this.openWindow, {
			kind: "folder",
			title: O("file.whereTo")
		});
		if (t) try {
			let n = await Y.createFile(t.id, e);
			this.openItem(n.key, null);
		} catch (e) {
			this.notice(e.message);
		}
	}
	async openCollectionFile() {
		let e = await p.pickFile(this.openWindow, {
			title: O("tools.open"),
			exts: [de]
		});
		if (e) try {
			let t = await Y.openFile(e.id);
			this.#n.delete(t.key), this.#s();
		} catch (e) {
			c(this.win, {
				icon: "error",
				text: e.message
			});
		}
	}
	async save(e = this.active?.col) {
		let t = Y.get(e);
		if (t) {
			if (!t.file) return this.saveAs(e);
			try {
				await Y.save(e);
			} catch (e) {
				c(this.win, {
					icon: "error",
					title: O("file.saveFailed"),
					text: e.message
				});
			}
		}
	}
	async saveAs(e) {
		let t = Y.get(e), n = await this.#x(O("menu.saveAs"), O("item.collectionName"), Y.nameOf(t));
		if (!n) return;
		let r = await p.pickFile(this.openWindow, {
			kind: "folder",
			title: O("file.whereTo")
		});
		if (r) try {
			let t = await Y.saveAs(e, r.id, n);
			this.notice(O("file.saved", { path: a.tildePath(t.file) }));
		} catch (e) {
			c(this.win, {
				icon: "error",
				title: O("file.saveFailed"),
				text: e.message
			});
		}
	}
	async closeCollection(e) {
		let t = Y.get(e);
		if (t?.dirty) {
			let n = await c(this.win, {
				icon: "warning",
				title: O("file.unsavedTitle", { name: Y.nameOf(t) }),
				text: O("file.unsavedText"),
				buttons: [
					"cancel",
					{
						value: "discard",
						label: O("file.discard"),
						danger: !0
					},
					{
						value: "save",
						label: O("menu.save"),
						primary: !0
					}
				]
			});
			if (n === "cancel" || !n) return;
			n === "save" && await this.save(e);
		}
		for (let t of this.tabs.filter((t) => t.col === e)) this.closeTab(t.key);
		Y.close(e);
	}
	async exportPostman(e) {
		let { toPostman: t } = await import("./formats-BbYv1NMK.js"), n = Y.get(e), r = await p.pickFile(this.openWindow, {
			kind: "folder",
			title: O("file.whereTo")
		});
		if (!r) return;
		let i = `${a.cleanName(Y.nameOf(n), { portable: !0 }) || "collection"}.postman_collection.json`, o = a.create(r.id, {
			type: "file",
			name: i
		});
		await a.write(o.id, `${JSON.stringify(t(n.data), null, 2)}\n`), this.notice(O("file.exported", { path: a.tildePath(o.id) }));
	}
	async #S() {
		if ($.size > 1) return !0;
		let e = Y.list.filter((e) => e.dirty);
		if (!e.length) return !0;
		let t = await c(this.win, {
			icon: "warning",
			title: O("file.unsavedMany", { n: e.length }),
			text: e.map((e) => Y.nameOf(e)).join("\n"),
			buttons: [
				"cancel",
				{
					value: "discard",
					label: O("file.discard"),
					danger: !0
				},
				{
					value: "save",
					label: O("file.saveAll"),
					primary: !0
				}
			]
		});
		if (t === "save") {
			for (let t of e) await this.save(t.key);
			return !0;
		}
		return t === "discard";
	}
	applyResult(e, t) {
		let n = Y.get(e);
		if (!n || !t?.vars) return;
		let r = n.data, i = !1, a = (e, n, { secret: r = [] } = {}) => {
			for (let [a, o] of Object.entries(n ?? {})) {
				if (r.includes(a)) continue;
				let n = e.find((e) => e.key === a);
				n && n.secret && !t.secret?.includes(a) ? (n.secret = !1, delete n.sealed, n.value = o, i = !0) : n && !n.secret && n.value !== o ? (n.value = o, i = !0) : n || (e.push({
					key: a,
					value: o,
					enabled: !0
				}), i = !0);
			}
		}, o = Y.env(e);
		o && a(o.variables, t.vars.environment, { secret: t.secret ?? [] }), a(r.variables, t.vars.collection);
		let s = Y.globals, c = JSON.stringify(s);
		a(s, t.vars.globals), JSON.stringify(s) !== c && Y.setGlobals(s);
		for (let [e, n] of Object.entries(t.renewed ?? {})) {
			let t = (t) => {
				t?.auth?.tokens === e && (t.auth.tokens = n.sealed, t.auth.tokenInfo = {
					expires: n.expires,
					scope: n.scope,
					preview: n.preview,
					refresh: n.refresh
				}, i = !0);
			};
			t(r), N(r.items, t);
		}
		i && Y.touch(e);
	}
	environments(e = this.active?.col ?? "mine") {
		rt(this, e);
	}
	run(e = this.active?.col ?? "mine", t = null) {
		at(this, e, t);
	}
	schedule(e = this.active?.col ?? "mine", t = null) {
		ut(this, e, t);
	}
	copyAsCode(e, t) {
		ct(this, e, t);
	}
	#C(e) {
		let t = e.ctrlKey || e.metaKey;
		t && e.key === "s" ? (e.preventDefault(), this.save()) : t && e.key === "Enter" ? (e.preventDefault(), this.active?.view.send?.() ?? this.active?.view.connect?.()) : t && e.key.toLowerCase() === "n" && e.altKey ? (e.preventDefault(), this.newRequest(this.active?.col ?? "mine", "http")) : t && e.key.toLowerCase() === "w" && e.altKey && this.active && (e.preventDefault(), this.closeTab(this.active.key));
	}
}, mt = 2048, ht = 1024, gt = (e, t = ht) => Number.isFinite(e) ? Math.min(mt, Math.max(16, Math.round(e))) : t;
function _t(e, t, { size: n = ht } = {}) {
	e.handle(async (e) => typeof e?.file == "string" ? t(e.file, gt(e.size, n)) : null);
}
async function vt(e, t = .85) {
	let n = e;
	typeof n?.toBlob != "function" && (n = document.createElement("canvas"), n.width = Math.max(1, e.width), n.height = Math.max(1, e.height), n.getContext("2d").drawImage(e, 0, 0));
	let r = (e) => new Promise((r) => n.toBlob(r, e, t)), i = await r("image/webp");
	return i?.type === "image/webp" ? i : r("image/png");
}
// src/nettest/preview.js
var yt = "#c2410c";
function bt({ lilos: e }) {
	_t(e, async (t, n) => {
		let r;
		try {
			r = z(await e.files.read(t));
		} catch {
			return null;
		}
		let i = 0, a = /* @__PURE__ */ new Set();
		return N(r.items, (e) => {
			e.type === "request" && (i++, a.add(k(e.protocol).label));
		}), {
			image: await vt(xt(i, n), .9),
			note: [r.name, [...a].join(" · ")].filter(Boolean).join(" — ")
		};
	}, { size: 512 });
}
function xt(e, t) {
	let n = document.createElement("canvas");
	n.width = n.height = t;
	let r = n.getContext("2d"), i = t / 100;
	r.fillStyle = yt, r.fillRect(14 * i, 10 * i, 72 * i, 72 * i), r.strokeStyle = "#ffffff", r.lineWidth = 6 * i, r.lineCap = "round", r.lineJoin = "round", r.beginPath(), r.moveTo(30 * i, 36 * i), r.lineTo(66 * i, 36 * i), r.moveTo(56 * i, 26 * i), r.lineTo(66 * i, 36 * i), r.lineTo(56 * i, 46 * i), r.moveTo(70 * i, 58 * i), r.lineTo(34 * i, 58 * i), r.moveTo(44 * i, 48 * i), r.lineTo(34 * i, 58 * i), r.lineTo(44 * i, 68 * i), r.stroke();
	let a = String(e);
	r.font = `700 ${13 * i}px system-ui, "Segoe UI", sans-serif`;
	let o = r.measureText(a).width + 10 * i, s = 86 * i - o / 2, c = 74 * i, l = 19 * i;
	return r.fillStyle = "#ffffff", r.fillRect(s - 1.5 * i, c - 1.5 * i, o + 3 * i, l + 3 * i), r.fillStyle = "#fde3d3", r.fillRect(s, c, o, l), r.fillStyle = "#9a3412", r.textBaseline = "middle", r.fillText(a, s + 5 * i, c + l / 2 + .5 * i), n;
}
// src/nettest/NetTestApp.js
function St({ args: e, openWindow: t } = {}) {
	let n = new pt({
		args: e ?? {},
		openWindow: t
	});
	return n.win.on("launch", (e) => {
		typeof e?.file == "string" && n.openFileArg(e.file);
	}), n.win;
}
export { St as default, bt as filePreview };
