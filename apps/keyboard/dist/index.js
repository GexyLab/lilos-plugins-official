import * as e from "/host/sdk.js";
import { Window as t, h as n, storage as r } from "/host/sdk.js";
import * as i from "/host/system.js";
// src/keyboard/layouts.js
var a = (e, t, n, r = null, i = null, a = 1) => ({
	code: e,
	normal: t,
	shift: n,
	altGr: r,
	altGrShift: i,
	w: a
}), o = (e, t = {}) => [...e].map((e) => a(`Key${e.toUpperCase()}`, e, e.toUpperCase(), t[e] ?? null)), s = (e) => [..."1234567890"].map((t, n) => a(`Digit${t}`, t, e[n])), c = (e, t = 1, n = 1) => ({
	fn: e,
	code: e,
	w: t,
	h: n
}), l = [
	c("Escape"),
	c("ControlLeft", 1.25),
	c("AltLeft", 1.25),
	c("Layout"),
	c("Space", 5.25),
	c("AltRight", 1.25),
	c("Delete"),
	c("ArrowLeft"),
	[c("ArrowUp"), c("ArrowDown")],
	c("ArrowRight")
], u = {
	it: {
		lang: "it",
		short: "IT",
		altGr: !0,
		rows: [
			[
				a("Backquote", "\\", "|"),
				...s("!\"£$%&/()="),
				a("Minus", "'", "?", "`"),
				a("Equal", "ì", "^", "~"),
				c("Backspace", 2)
			],
			[
				c("Tab", 1.75),
				...o("qwertyuiop", { e: "€" }),
				a("BracketLeft", "è", "é", "[", "{"),
				a("BracketRight", "+", "*", "]", "}"),
				c("Enter", 1.25, 2)
			],
			[
				c("CapsLock", 1.75),
				...o("asdfghjkl"),
				a("Semicolon", "ò", "ç", "@"),
				a("Quote", "à", "°", "#"),
				a("Backslash", "ù", "§")
			],
			[
				c("ShiftLeft", 1.25),
				a("IntlBackslash", "<", ">"),
				...o("zxcvbnm"),
				a("Comma", ",", ";"),
				a("Period", ".", ":"),
				a("Slash", "-", "_"),
				c("ShiftRight", 2.75)
			],
			l
		]
	},
	us: {
		lang: "en",
		short: "EN",
		altGr: !1,
		rows: [
			[
				a("Backquote", "`", "~"),
				...s("!@#$%^&*()"),
				a("Minus", "-", "_"),
				a("Equal", "=", "+"),
				c("Backspace", 2)
			],
			[
				c("Tab", 1.5),
				...o("qwertyuiop"),
				a("BracketLeft", "[", "{"),
				a("BracketRight", "]", "}"),
				a("Backslash", "\\", "|", null, null, 1.5)
			],
			[
				c("CapsLock", 1.75),
				...o("asdfghjkl"),
				a("Semicolon", ";", ":"),
				a("Quote", "'", "\""),
				c("Enter", 2.25)
			],
			[
				c("ShiftLeft", 2.25),
				...o("zxcvbnm"),
				a("Comma", ",", "<"),
				a("Period", ".", ">"),
				a("Slash", "/", "?"),
				c("ShiftRight", 2.75)
			],
			l
		]
	}
}, d = (e) => String(e).toLowerCase().startsWith("it") ? "it" : "us";
function f(e) {
	let t = [], n = [];
	return e.rows.forEach((e, r) => {
		let i = 0, a = () => {
			for (let [e, t, a] of n) e === r && i >= t && i < a && (i = a);
		};
		for (let o of e) {
			if (a(), Array.isArray(o)) {
				o.forEach((e, n) => t.push({
					key: e,
					x: i,
					y: r + n / 2,
					w: e.w,
					h: .5
				})), i += o[0].w;
				continue;
			}
			let e = o.h ?? 1;
			t.push({
				key: o,
				x: i,
				y: r,
				w: o.w,
				h: e
			});
			for (let t = 1; t < e; t++) n.push([
				r + t,
				i,
				i + o.w
			]);
			i += o.w;
		}
	}), t;
}
// src/shared/i18n.js
function p(t, n) {
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
// src/keyboard/i18n.js
var m = p("keyboard", {
	en: { strings: {
		"@name": "On-Screen Keyboard",
		"@description": "A keyboard to type with the mouse or a finger, in the window where you are writing. Italian and US layouts.",
		title: "On-Screen Keyboard",
		needsNewer: "This keyboard needs a newer lilOS: update lilOS to type with it.",
		"layout.it": "Italiano",
		"layout.us": "English (US)",
		"key.layout": "Layout: {name}. Press to change it",
		"key.ctrl": "Ctrl",
		"key.delete": "Del",
		"key.Backspace": "Backspace",
		"key.Tab": "Tab",
		"key.CapsLock": "Caps Lock",
		"key.Enter": "Enter",
		"key.ShiftLeft": "Shift (twice: stays on)",
		"key.ShiftRight": "Shift (twice: stays on)",
		"key.ControlLeft": "Ctrl (twice: stays on)",
		"key.AltLeft": "Alt (twice: stays on)",
		"key.AltRight": "AltGr (twice: stays on)",
		"key.Escape": "Esc",
		"key.Delete": "Delete",
		"key.Space": "Space",
		"key.ArrowLeft": "Left",
		"key.ArrowRight": "Right",
		"key.ArrowUp": "Up",
		"key.ArrowDown": "Down"
	} },
	it: { strings: {
		"@name": "Tastiera a schermo",
		"@description": "Una tastiera per scrivere con il mouse o con un dito, nella finestra in cui stai scrivendo. Layout italiano e americano.",
		title: "Tastiera a schermo",
		needsNewer: "Questa tastiera ha bisogno di un lilOS più recente: aggiorna lilOS per scrivere con lei.",
		"layout.it": "Italiano",
		"layout.us": "English (US)",
		"key.layout": "Layout: {name}. Premi per cambiarlo",
		"key.ctrl": "Ctrl",
		"key.delete": "Canc",
		"key.Backspace": "Cancella a sinistra",
		"key.Tab": "Tab",
		"key.CapsLock": "Bloc Maiusc",
		"key.Enter": "Invio",
		"key.ShiftLeft": "Maiusc (due volte: resta attivo)",
		"key.ShiftRight": "Maiusc (due volte: resta attivo)",
		"key.ControlLeft": "Ctrl (due volte: resta attivo)",
		"key.AltLeft": "Alt (due volte: resta attivo)",
		"key.AltRight": "AltGr (due volte: resta attivo)",
		"key.Escape": "Esc",
		"key.Delete": "Canc",
		"key.Space": "Spazio",
		"key.ArrowLeft": "Sinistra",
		"key.ArrowRight": "Destra",
		"key.ArrowUp": "Su",
		"key.ArrowDown": "Giù"
	} }
}), { t: h } = m, g = "keyboard:layout", _ = {
	ShiftLeft: "shift",
	ShiftRight: "shift",
	ControlLeft: "ctrl",
	AltLeft: "alt",
	AltRight: "altGr"
}, v = 400, y = 450, b = 45, x = {
	Backspace: {
		text: "⌫",
		send: "Backspace"
	},
	Tab: {
		text: "⇥",
		send: "Tab"
	},
	CapsLock: { text: "⇪" },
	Enter: {
		text: "↵",
		send: "Enter"
	},
	ShiftLeft: { text: "⇧" },
	ShiftRight: { text: "⇧" },
	ControlLeft: { label: "key.ctrl" },
	AltLeft: { text: "Alt" },
	AltRight: { text: "AltGr" },
	Escape: {
		text: "Esc",
		send: "Escape"
	},
	Delete: {
		label: "key.delete",
		send: "Delete"
	},
	Space: { send: " " },
	ArrowLeft: {
		text: "←",
		send: "ArrowLeft"
	},
	ArrowRight: {
		text: "→",
		send: "ArrowRight"
	},
	ArrowUp: {
		text: "↑",
		send: "ArrowUp"
	},
	ArrowDown: {
		text: "↓",
		send: "ArrowDown"
	},
	Layout: {}
}, S = (e) => e.normal !== e.shift && e.normal.toUpperCase() === e.shift;
function C() {
	let e = new t({
		title: h("title"),
		icon: "keyboard",
		width: 780,
		height: 290,
		minWidth: 420,
		minHeight: 170,
		maximizable: !1,
		focusable: !1,
		onTop: !0
	}), a = u[r.get(g)] ? r.get(g) : d(m.lang), o = {
		shift: 0,
		ctrl: 0,
		alt: 0,
		altGr: 0
	}, s = !1, c = {
		mod: null,
		at: 0
	}, l = null, p = /* @__PURE__ */ new Map(), C = n("div", {
		class: "osk-keys",
		role: "group"
	}), w = n("div", { class: "osk" }, C);
	if (e.body.append(w), typeof i.sendKey != "function") return w.replaceChildren(n("p", { class: "osk-old" }, h("needsNewer"))), e;
	let T = () => u[a];
	function E() {
		C.setAttribute("aria-label", h("title")), p.clear(), C.replaceChildren(...f(T()).map(({ key: e, x: t, y: r, w: i, h: a }) => {
			let o = n("button", {
				type: "button",
				tabindex: "-1",
				class: `osk-key ${e.fn ? `fn fn-${e.fn}` : "char"}`,
				dataset: { code: e.code },
				style: `grid-column: ${t * 4 + 1} / span ${i * 4}; grid-row: ${r * 2 + 1} / span ${a * 2}`
			});
			return p.set(o, e), o.addEventListener("pointerdown", (t) => F(t, e, o)), o.addEventListener("click", (t) => {
				t.detail === 0 && j(e);
			}), o;
		})), D();
	}
	function D() {
		let e = T(), t = !!o.altGr && e.altGr;
		w.classList.toggle("shifted", !!o.shift);
		for (let r of C.children) {
			let i = p.get(r);
			if (!i) continue;
			if (i.fn) {
				O(r, i, e);
				continue;
			}
			let a = k(i), s = [n("span", { class: "main" }, a ?? A(i))];
			t || S(i) || o.shift || i.shift === i.normal || s.push(n("span", { class: "sub shift" }, i.shift)), e.altGr && !t && i.altGr && s.push(n("span", { class: "sub altgr" }, i.altGr)), r.replaceChildren(...s), r.classList.toggle("dead", t && a == null), r.setAttribute("aria-label", a ?? i.normal);
		}
	}
	function O(e, t, r) {
		let i = x[t.fn], c = t.fn === "AltRight" && !r.altGr ? "AltLeft" : t.fn, l = _[c] && o[_[c]], u = i.label ? h(i.label) : i.text ?? "";
		t.fn === "AltRight" && !r.altGr && (u = "Alt"), t.fn === "Layout" && (u = r.short), t.fn === "Space" && (u = h(`layout.${a}`)), e.replaceChildren(n("span", { class: "main" }, u)), e.classList.toggle("on", !!l || t.fn === "CapsLock" && s), e.classList.toggle("locked", l === 2 || t.fn === "CapsLock" && s);
		let d = t.fn === "Layout" ? h("key.layout", { name: h(`layout.${a}`) }) : h(`key.${t.fn}`);
		e.setAttribute("aria-label", d), e.title = d, (_[c] || t.fn === "CapsLock") && e.setAttribute("aria-pressed", String(!!l || t.fn === "CapsLock" && s));
	}
	function k(e) {
		return o.altGr && T().altGr ? (o.shift ? e.altGrShift : e.altGr) ?? null : A(e);
	}
	function A(e) {
		let t = !!o.shift;
		return (S(e) ? t !== s : t) ? e.shift : e.normal;
	}
	function j(e) {
		if (e.fn === "Layout") return P();
		if (e.fn === "CapsLock") return s = !s, D();
		let t = _[e.fn === "AltRight" && !T().altGr ? "AltLeft" : e.fn];
		if (t) return M(t);
		let n = !!o.ctrl, r = !!o.alt, a = !!o.shift, c = !!o.altGr && T().altGr;
		if (e.fn) {
			let t = x[e.fn].send;
			i.sendKey({
				key: t,
				code: e.code,
				text: t === " " ? " " : void 0,
				ctrl: n,
				alt: r,
				shift: a
			});
		} else if (c) {
			let t = k(e);
			i.sendKey({
				key: t ?? e.normal,
				code: e.code,
				text: t ?? void 0,
				shift: a,
				altGraph: !0
			});
		} else if (n || r) i.sendKey({
			key: A(e),
			code: e.code,
			ctrl: n,
			alt: r,
			shift: a
		});
		else {
			let t = k(e);
			i.sendKey({
				key: t,
				code: e.code,
				text: t,
				shift: a
			});
		}
		N();
	}
	function M(e) {
		let t = performance.now();
		o[e] === 1 && c.mod === e && t - c.at < v ? o[e] = 2 : o[e] = +!o[e], c = {
			mod: e,
			at: t
		}, D();
	}
	function N() {
		let e = !1;
		for (let t of Object.keys(o)) o[t] === 1 && (o[t] = 0, e = !0);
		e && D();
	}
	function P() {
		let e = Object.keys(u);
		a = e[(e.indexOf(a) + 1) % e.length], r.set(g, a), T().altGr || (o.altGr = 0), E();
	}
	function F(e, t, n) {
		if (e.button !== 0) return;
		e.preventDefault(), I(), n.setPointerCapture?.(e.pointerId), n.classList.add("down");
		let r = () => {
			n.classList.remove("down"), I();
		};
		n.addEventListener("pointerup", r, { once: !0 }), n.addEventListener("pointercancel", r, { once: !0 }), j(t), (!t.fn || x[t.fn].send) && (l = setTimeout(function e() {
			j(t), l = setTimeout(e, b);
		}, y));
	}
	function I() {
		clearTimeout(l), l = null;
	}
	let L = (e, t) => {
		for (let n of C.querySelectorAll(`[data-code="${CSS.escape(e)}"]`)) n.classList.toggle("hit", t);
	};
	return addEventListener("keydown", (e) => {
		e.isTrusted && L(e.code, !0);
	}, {
		capture: !0,
		signal: e.signal
	}), addEventListener("keyup", (e) => {
		e.isTrusted && L(e.code, !1);
	}, {
		capture: !0,
		signal: e.signal
	}), addEventListener("blur", () => {
		for (let e of C.querySelectorAll(".hit")) e.classList.remove("hit");
	}, { signal: e.signal }), e.on("destroy", I), E(), e;
}
export { C as default };
