var e = [
	"+",
	"-",
	"*",
	"/"
], t = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	".",
	...e,
	"=",
	"%",
	"sqr",
	"sqrt",
	"neg",
	"back",
	"ce",
	"c"
], n = (e) => e === 0 ? 0 : Number.parseFloat(e.toPrecision(15));
function r(e, t, r) {
	if (t === "/" && r === 0) return { error: e === 0 ? "undefined" : "divZero" };
	let i = t === "+" ? e + r : t === "-" ? e - r : t === "*" ? e * r : e / r;
	return Number.isFinite(i) ? { value: n(i) } : { error: "overflow" };
}
var i = class {
	constructor() {
		this.c();
	}
	c() {
		this.acc = null, this.accLabel = null, this.op = null, this.value = 0, this.text = null, this.label = null, this.operand = !1, this.done = !1, this.last = null, this.expr = [], this.error = null;
	}
	press(n) {
		if (!t.includes(n)) return !1;
		if (this.error) {
			if (n === "c" || n === "ce" || n === "back") return this.c(), !0;
			if (/^[\d.]$/.test(n)) this.c();
			else return !1;
		}
		return /^[\d.]$/.test(n) ? this.#n(n) : e.includes(n) ? this.#r(n) : n === "=" ? this.#i() : n === "%" ? this.#a() : n === "sqr" || n === "sqrt" || n === "neg" ? this.#o(n) : n === "back" ? this.#s() : n === "ce" ? this.#c() : (this.c(), !0);
	}
	get typing() {
		return this.text !== null;
	}
	view() {
		let e = [...this.expr];
		return !this.done && this.label !== null && e.push(this.label), {
			value: this.value,
			text: this.text,
			expr: e,
			op: this.op && !this.operand ? this.op : null,
			error: this.error
		};
	}
	#e(e) {
		return this.c(), this.error = e, !0;
	}
	#t(e, t) {
		return this.done &&= (this.expr = [], !1), this.value = e, this.text = null, this.label = t, this.op && (this.operand = !0), !0;
	}
	#n(e) {
		if (this.done) {
			let e = this.last;
			this.c(), this.last = e;
		}
		if (!this.typing) this.text = e === "." ? "0." : e;
		else {
			if (e === "." && this.text.includes(".") || this.text.replace(/[-.]/g, "").length >= 16) return !1;
			e !== "." && /^-?0$/.test(this.text) ? this.text = this.text.slice(0, -1) + e : this.text += e;
		}
		return this.value = Number(this.text), this.label = null, this.op && (this.operand = !0), !0;
	}
	#r(e) {
		if (this.op && this.operand) {
			let e = r(this.acc, this.op, this.value);
			if (e.error) return this.#e(e.error);
			this.value = e.value, this.label = null;
		} else if (this.op) return this.op = e, this.expr[this.expr.length - 1] = e, !0;
		return this.acc = this.value, this.accLabel = this.op ? null : this.label, this.op = e, this.expr = [this.accLabel ?? this.acc, e], this.text = null, this.label = null, this.operand = !1, this.done = !1, !0;
	}
	#i() {
		let e, t, n;
		if (this.op) {
			e = this.accLabel ?? this.acc, t = this.op, n = this.operand ? this.value : this.acc;
			let i = r(this.acc, t, n);
			if (i.error) return this.#e(i.error);
			this.expr = [
				e,
				t,
				this.operand ? this.label ?? n : n,
				"="
			], this.last = {
				op: t,
				b: n
			}, this.value = i.value;
		} else if (this.last) {
			({op: t, b: n} = this.last);
			let e = r(this.value, t, n);
			if (e.error) return this.#e(e.error);
			this.expr = [
				this.label ?? this.value,
				t,
				n,
				"="
			], this.value = e.value;
		} else this.expr = [this.label ?? this.value, "="];
		return this.acc = null, this.accLabel = null, this.op = null, this.operand = !1, this.text = null, this.label = null, this.done = !0, !0;
	}
	#a() {
		let e = n(this.op === "+" || this.op === "-" ? this.acc * this.value / 100 : this.value / 100);
		return this.#t(e, e);
	}
	#o(e) {
		if (e === "neg" && this.typing && !this.done) return !/^-?0$/.test(this.text) && (this.text = this.text.startsWith("-") ? this.text.slice(1) : `-${this.text}`, this.value = Number(this.text), !0);
		let t = this.value;
		if (e === "sqrt" && t < 0) return this.#e("invalid");
		let r = e === "sqrt" ? n(Math.sqrt(t)) : e === "sqr" ? n(t * t) : -t || 0;
		return Number.isFinite(r) ? this.#t(r, {
			fn: e,
			arg: this.done ? t : this.label ?? t
		}) : this.#e("overflow");
	}
	#s() {
		return this.done ? (this.expr = [], !0) : this.typing ? (this.text = this.text.slice(0, -1), (this.text === "" || this.text === "-") && (this.text = "0"), this.value = Number(this.text), !0) : !1;
	}
	#c() {
		return this.done ? (this.c(), !0) : (this.text = "0", this.value = 0, this.label = null, this.op && (this.operand = !0), !0);
	}
}, a = {
	"+": "+",
	"-": "−",
	"*": "×",
	"/": "÷"
};
function o(e) {
	let t;
	try {
		t = new Intl.NumberFormat(e).formatToParts(12345.6);
	} catch {
		t = new Intl.NumberFormat("en").formatToParts(12345.6);
	}
	let n = (e, n) => t.find((t) => t.type === e)?.value ?? n;
	return {
		decimal: n("decimal", "."),
		group: n("group", ",")
	};
}
function s(e, t, { group: n = !0 } = {}) {
	let r = /^(-?)(\d*)(\.?)(\d*)(e[-+]\d+)?$/.exec(e);
	if (!r) return e;
	let [, i, a, o, s, c = ""] = r, l = n ? a.replace(/\B(?=(\d{3})+(?!\d))/g, t.group) : a;
	return `${i ? "−" : ""}${l}${o ? t.decimal : ""}${s}${c}`;
}
function c(e) {
	let t = Math.abs(e);
	return e === 0 ? "0" : t >= 0x2386f26fc10000 || t < 1e-7 ? e.toExponential() : String(e);
}
var l = (e, t, n) => s(c(e), t, n), u = (e) => a[e] ?? e;
function d(e, t) {
	if (typeof e == "number") return l(e, t);
	let n = d(e.arg, t), r = typeof e.arg == "number" && e.arg >= 0;
	return e.fn === "sqrt" ? `√(${n})` : e.fn === "sqr" ? r ? `${n}²` : `(${n})²` : `−(${n})`;
}
var f = (e, t) => e.map((e) => typeof e == "string" ? u(e) : d(e, t)).join(" "), p = (e, t = {}, ...n) => {
	let r = document.createElement(e);
	for (let [e, n] of Object.entries(t)) n != null && n !== !1 && (e === "class" ? r.className = n : e.startsWith("on") ? r.addEventListener(e.slice(2), n) : r.setAttribute(e, n === !0 ? "" : String(n)));
	return r.append(...n.filter((e) => e != null)), r;
}, m = [
	[
		"%",
		"%",
		"fn",
		"key.percent",
		"%"
	],
	[
		"ce",
		"CE",
		"fn",
		"key.clearEntry",
		"keyname.delete"
	],
	[
		"c",
		"C",
		"fn",
		"key.clear",
		"Esc"
	],
	[
		"back",
		"⌫",
		"fn",
		"key.backspace",
		"keyname.backspace"
	],
	[
		"sqr",
		"x²",
		"fn",
		"key.square",
		"Q"
	],
	[
		"sqrt",
		"√x",
		"fn",
		"key.sqrt",
		"@"
	],
	[
		"neg",
		"±",
		"fn",
		"key.negate",
		"F9"
	],
	[
		"/",
		"÷",
		"op",
		"key.divide",
		"/"
	],
	[
		"7",
		"7",
		"num"
	],
	[
		"8",
		"8",
		"num"
	],
	[
		"9",
		"9",
		"num"
	],
	[
		"*",
		"×",
		"op",
		"key.multiply",
		"*"
	],
	[
		"4",
		"4",
		"num"
	],
	[
		"5",
		"5",
		"num"
	],
	[
		"6",
		"6",
		"num"
	],
	[
		"-",
		"−",
		"op",
		"key.subtract",
		"-"
	],
	[
		"1",
		"1",
		"num"
	],
	[
		"2",
		"2",
		"num"
	],
	[
		"3",
		"3",
		"num"
	],
	[
		"+",
		"+",
		"op",
		"key.add",
		"+"
	],
	[
		"0",
		"0",
		"num wide"
	],
	[
		".",
		null,
		"num",
		"key.decimal",
		", ."
	],
	[
		"=",
		"=",
		"eq",
		"key.equals",
		"keyname.enter"
	]
], h = {
	...Object.fromEntries("0123456789".split("").map((e) => [e, e])),
	".": ".",
	",": ".",
	"+": "+",
	"-": "-",
	"*": "*",
	x: "*",
	X: "*",
	"/": "/",
	"=": "=",
	Enter: "=",
	"%": "%",
	q: "sqr",
	Q: "sqr",
	"@": "sqrt",
	F9: "neg",
	Backspace: "back",
	Delete: "ce",
	Escape: "c"
}, g = "<svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"8\" y=\"8\" width=\"12\" height=\"12\" rx=\"2\"/><path d=\"M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8\"/></svg>";
function _({ lilos: e, root: t }) {
	let n = () => e.locale.i18n, r = (e, t) => n().t(e, t), a = new i(), c = o(e.locale.code ?? n().lang);
	t.append(p("style", {}, v));
	let u = p("div", { class: "expr" }), d = p("div", {
		class: "value",
		role: "status",
		"aria-atomic": "true"
	}), _ = p("button", {
		type: "button",
		class: "copy",
		tabindex: "-1",
		onclick: () => w()
	});
	_.innerHTML = g;
	let y = p("div", {
		class: "keys",
		role: "group"
	}), b = p("div", {
		class: "calc",
		tabindex: "-1"
	}, p("div", { class: "screen" }, _, u, d), y);
	t.append(b);
	function x() {
		y.setAttribute("aria-label", r("keypad")), _.title = r("tip", {
			label: r("copy"),
			keys: "Ctrl+C"
		}), _.setAttribute("aria-label", r("copy")), y.replaceChildren(...m.map(([e, t, n, i, a]) => {
			let o = i ? r(i) : null, s = a?.startsWith("keyname.") ? r(a) : a;
			return p("button", {
				type: "button",
				class: `key ${n}`,
				"data-key": e,
				"aria-label": o,
				title: o && r("tip", {
					label: o,
					keys: s
				}),
				onclick: () => C(e)
			}, t ?? c.decimal);
		}));
	}
	function S() {
		let e = a.view();
		u.textContent = e.error ? "" : f(e.expr, c);
		let t = e.error ? r(`error.${e.error}`) : e.text === null ? l(e.value, c) : s(e.text, c);
		d.textContent = t, d.classList.toggle("error", !!e.error), d.style.setProperty("--len", String(Math.max(t.length, 9))), _.disabled = !!e.error;
		for (let t of y.querySelectorAll(".op")) t.classList.toggle("armed", t.dataset.key === e.op);
	}
	function C(e) {
		a.press(e) && S();
	}
	async function w() {
		let t = a.view();
		if (!t.error) try {
			await e.clipboard.write(l(t.value, c, { group: !1 }).replace("−", "-")), await e.ui.toast(r("copied"));
		} catch (t) {
			await e.ui.toast(r("copyFailed")), console.warn(t);
		}
	}
	function T(e) {
		let t = y.querySelector(`[data-key="${CSS.escape(e)}"]`);
		t && (t.classList.add("hit"), setTimeout(() => t.classList.remove("hit"), 120));
	}
	b.addEventListener("keydown", (e) => {
		if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "c") return e.preventDefault(), e.stopPropagation(), w();
		if (e.ctrlKey || e.metaKey || e.altKey) return;
		let t = Object.hasOwn(h, e.key) ? h[e.key] : null;
		t && (e.preventDefault(), e.stopPropagation(), T(t), C(t));
	}), b.addEventListener("pointerdown", (e) => {
		e.target.closest("button") || requestAnimationFrame(() => b.focus());
	});
	let E = e.on("locale", () => {
		c = o(e.locale.code ?? n().lang), x(), S();
	});
	return x(), S(), requestAnimationFrame(() => b.focus()), () => E?.();
}
var v = "\n  :host { display: block; height: 100%; }\n  html, body { height: 100%; margin: 0; }\n  .calc { box-sizing: border-box; height: 100%; display: flex; flex-direction: column; gap: 8px; padding: 10px; color: var(--text); font: 14px/1.3 var(--font, system-ui); container-type: size; outline: none; user-select: none; -webkit-user-select: none; }\n  .calc * { box-sizing: border-box; }\n  .screen { position: relative; display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-end; gap: 2px; padding: 8px 6px 4px; flex: 0 0 auto; min-height: clamp(64px, 24cqh, 140px); }\n  .expr { min-height: 1.3em; max-width: 100%; color: var(--dim); font-size: clamp(12px, 3.6cqh, 16px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: right; }\n  .value { max-width: 100%; font-size: clamp(18px, min(calc(160cqw / var(--len, 9)), 11cqh), 54px); font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; user-select: text; -webkit-user-select: text; }\n  .value.error { font-weight: 500; font-size: clamp(14px, min(7cqw, 7cqh), 28px); color: var(--danger, #d64545); white-space: normal; text-align: right; }\n  .copy { position: absolute; top: 4px; left: 2px; display: grid; place-items: center; width: 28px; height: 28px; padding: 0; border: 0; border-radius: var(--radius-sm, 6px); background: none; color: var(--dim); cursor: pointer; opacity: .7; }\n  .copy:hover:not(:disabled) { background: var(--hover); color: var(--text); opacity: 1; }\n  .copy:disabled { opacity: .3; cursor: default; }\n  .keys { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 1fr; gap: 4px; }\n  .key { min-width: 0; min-height: 0; padding: 0; border: 1px solid var(--border); border-radius: var(--radius-sm, 6px); font: inherit; font-size: clamp(13px, min(6cqw, 4.2cqh), 24px); color: var(--text); background: var(--chrome, var(--surface)); cursor: pointer; transition: background .08s, filter .08s; }\n  .key:hover { background: var(--hover); }\n  .key:active, .key.hit { filter: brightness(.9); }\n  .key:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }\n  .key.num { font-weight: 600; background: var(--field-bg, var(--surface)); }\n  .key.num:hover { background: var(--hover); }\n  .key.fn { color: var(--dim); }\n  .key.op { font-size: clamp(15px, min(7cqw, 5cqh), 28px); color: var(--accent); }\n  .key.op.armed { background: var(--accent-soft, var(--hover)); border-color: var(--accent); }\n  .key.eq { background: var(--accent); border-color: var(--accent); color: #fff; font-size: clamp(15px, min(7cqw, 5cqh), 28px); }\n  .key.eq:hover { background: var(--accent); filter: brightness(1.08); }\n  .key.eq:active, .key.eq.hit { filter: brightness(.92); }\n  .key.wide { grid-column: span 2; }\n";
export { _ as main };
