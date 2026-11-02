import * as e from "/host/sdk.js";
import { SettingsWindow as t, TAG_COLORS as n, Window as r, fs as i, h as a, icon as o, selectField as s, session as c, storage as l, tags as u, trackDrag as d } from "/host/sdk.js";
import { DESK_NAME as f, callEntrypoint as p, handleCommand as m, installedApps as h, launch as g, openFile as _, pickFile as v } from "/host/system.js";
// node_modules/@xterm/xterm/lib/xterm.mjs
var y = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, b = (e, t) => {
	for (var n in t) y(e, n, {
		get: t[n],
		enumerable: !0
	});
}, x = (e, t, n, r) => {
	for (var i = r > 1 ? void 0 : r ? ee(t, n) : t, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = (r ? o(t, n, i) : o(i)) || i);
	return r && i && y(t, n, i), i;
}, S = (e, t) => (n, r) => t(n, r, e), te = "Terminal input", ne = {
	get: () => te,
	set: (e) => te = e
}, re = "Too much output to announce, navigate to rows manually to read", C = {
	get: () => re,
	set: (e) => re = e
};
function ie(e) {
	return e.replace(/\r?\n/g, "\r");
}
function ae(e, t) {
	return t ? "\x1B[200~" + e + "\x1B[201~" : e;
}
function oe(e, t) {
	e.clipboardData && e.clipboardData.setData("text/plain", t.selectionText), e.preventDefault();
}
function se(e, t, n, r) {
	e.stopPropagation(), e.clipboardData && ce(e.clipboardData.getData("text/plain"), t, n, r);
}
function ce(e, t, n, r) {
	e = ie(e), e = ae(e, n.decPrivateModes.bracketedPasteMode && r.rawOptions.ignoreBracketedPasteMode !== !0), n.triggerDataEvent(e, !0), t.value = "";
}
function w(e, t, n) {
	let r = n.getBoundingClientRect(), i = e.clientX - r.left - 10, a = e.clientY - r.top - 10;
	t.style.width = "20px", t.style.height = "20px", t.style.left = `${i}px`, t.style.top = `${a}px`, t.style.zIndex = "1000", t.focus();
}
function le(e, t, n, r, i) {
	w(e, t, n), i && r.rightClickSelect(e), t.value = r.selectionText, t.select();
}
function ue(e) {
	return e > 65535 ? (e -= 65536, String.fromCharCode((e >> 10) + 55296) + String.fromCharCode(e % 1024 + 56320)) : String.fromCharCode(e);
}
function de(e, t = 0, n = e.length) {
	let r = "";
	for (let i = t; i < n; ++i) {
		let t = e[i];
		t > 65535 ? (t -= 65536, r += String.fromCharCode((t >> 10) + 55296) + String.fromCharCode(t % 1024 + 56320)) : r += String.fromCharCode(t);
	}
	return r;
}
var fe = class {
	constructor() {
		this._interim = 0;
	}
	clear() {
		this._interim = 0;
	}
	decode(e, t) {
		let n = e.length;
		if (!n) return 0;
		let r = 0, i = 0;
		if (this._interim) {
			let n = e.charCodeAt(i++);
			56320 <= n && n <= 57343 ? t[r++] = (this._interim - 55296) * 1024 + n - 56320 + 65536 : (t[r++] = this._interim, t[r++] = n), this._interim = 0;
		}
		for (let a = i; a < n; ++a) {
			let i = e.charCodeAt(a);
			if (55296 <= i && i <= 56319) {
				if (++a >= n) return this._interim = i, r;
				let o = e.charCodeAt(a);
				56320 <= o && o <= 57343 ? t[r++] = (i - 55296) * 1024 + o - 56320 + 65536 : (t[r++] = i, t[r++] = o);
			} else i !== 65279 && (t[r++] = i);
		}
		return r;
	}
}, pe = class {
	constructor() {
		this.interim = /* @__PURE__ */ new Uint8Array(3);
	}
	clear() {
		this.interim.fill(0);
	}
	decode(e, t) {
		let n = e.length;
		if (!n) return 0;
		let r = 0, i, a, o, s, c = 0, l = 0;
		if (this.interim[0]) {
			let i = !1, a = this.interim[0];
			a &= (a & 224) == 192 ? 31 : (a & 240) == 224 ? 15 : 7;
			let o = 0, s;
			for (; (s = this.interim[++o] & 63) && o < 4;) a <<= 6, a |= s;
			let c = (this.interim[0] & 224) == 192 ? 2 : (this.interim[0] & 240) == 224 ? 3 : 4, u = c - o;
			for (; l < u;) {
				if (l >= n) return 0;
				if (s = e[l++], (s & 192) != 128) {
					l--, i = !0;
					break;
				}
				this.interim[o++] = s, a <<= 6, a |= s & 63;
			}
			i || (c === 2 ? a < 128 ? l-- : t[r++] = a : c === 3 ? a < 2048 || a >= 55296 && a <= 57343 || a === 65279 || (t[r++] = a) : a < 65536 || a > 1114111 || (t[r++] = a)), this.interim.fill(0);
		}
		let u = n - 4, d = l;
		for (; d < n;) {
			for (; d < u && !((i = e[d]) & 128) && !((a = e[d + 1]) & 128) && !((o = e[d + 2]) & 128) && !((s = e[d + 3]) & 128);) t[r++] = i, t[r++] = a, t[r++] = o, t[r++] = s, d += 4;
			if (i = e[d++], i < 128) t[r++] = i;
			else if ((i & 224) == 192) {
				if (d >= n) return this.interim[0] = i, r;
				if (a = e[d++], (a & 192) != 128 || (c = (i & 31) << 6 | a & 63, c < 128)) {
					d--;
					continue;
				}
				t[r++] = c;
			} else if ((i & 240) == 224) {
				if (d >= n) return this.interim[0] = i, r;
				if (a = e[d++], (a & 192) != 128) {
					d--;
					continue;
				}
				if (d >= n) return this.interim[0] = i, this.interim[1] = a, r;
				if (o = e[d++], (o & 192) != 128) {
					d--;
					continue;
				}
				if (c = (i & 15) << 12 | (a & 63) << 6 | o & 63, c < 2048 || c >= 55296 && c <= 57343 || c === 65279) continue;
				t[r++] = c;
			} else if ((i & 248) == 240) {
				if (d >= n) return this.interim[0] = i, r;
				if (a = e[d++], (a & 192) != 128) {
					d--;
					continue;
				}
				if (d >= n) return this.interim[0] = i, this.interim[1] = a, r;
				if (o = e[d++], (o & 192) != 128) {
					d--;
					continue;
				}
				if (d >= n) return this.interim[0] = i, this.interim[1] = a, this.interim[2] = o, r;
				if (s = e[d++], (s & 192) != 128) {
					d--;
					continue;
				}
				if (c = (i & 7) << 18 | (a & 63) << 12 | (o & 63) << 6 | s & 63, c < 65536 || c > 1114111) continue;
				t[r++] = c;
			}
		}
		return r;
	}
}, me = "", he = " ", ge = class e {
	constructor() {
		this.fg = 0, this.bg = 0, this.extended = new _e();
	}
	static toColorRGB(e) {
		return [
			e >>> 16 & 255,
			e >>> 8 & 255,
			e & 255
		];
	}
	static fromColorRGB(e) {
		return (e[0] & 255) << 16 | (e[1] & 255) << 8 | e[2] & 255;
	}
	clone() {
		let t = new e();
		return t.fg = this.fg, t.bg = this.bg, t.extended = this.extended.clone(), t;
	}
	isInverse() {
		return this.fg & 67108864;
	}
	isBold() {
		return this.fg & 134217728;
	}
	isUnderline() {
		return this.hasExtendedAttrs() && this.extended.underlineStyle !== 0 ? 1 : this.fg & 268435456;
	}
	isBlink() {
		return this.fg & 536870912;
	}
	isInvisible() {
		return this.fg & 1073741824;
	}
	isItalic() {
		return this.bg & 67108864;
	}
	isDim() {
		return this.bg & 134217728;
	}
	isStrikethrough() {
		return this.fg & 2147483648;
	}
	isProtected() {
		return this.bg & 536870912;
	}
	isOverline() {
		return this.bg & 1073741824;
	}
	getFgColorMode() {
		return this.fg & 50331648;
	}
	getBgColorMode() {
		return this.bg & 50331648;
	}
	isFgRGB() {
		return (this.fg & 50331648) == 50331648;
	}
	isBgRGB() {
		return (this.bg & 50331648) == 50331648;
	}
	isFgPalette() {
		return (this.fg & 50331648) == 16777216 || (this.fg & 50331648) == 33554432;
	}
	isBgPalette() {
		return (this.bg & 50331648) == 16777216 || (this.bg & 50331648) == 33554432;
	}
	isFgDefault() {
		return !(this.fg & 50331648);
	}
	isBgDefault() {
		return !(this.bg & 50331648);
	}
	isAttributeDefault() {
		return this.fg === 0 && this.bg === 0;
	}
	getFgColor() {
		switch (this.fg & 50331648) {
			case 16777216:
			case 33554432: return this.fg & 255;
			case 50331648: return this.fg & 16777215;
			default: return -1;
		}
	}
	getBgColor() {
		switch (this.bg & 50331648) {
			case 16777216:
			case 33554432: return this.bg & 255;
			case 50331648: return this.bg & 16777215;
			default: return -1;
		}
	}
	hasExtendedAttrs() {
		return this.bg & 268435456;
	}
	updateExtended() {
		this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
	}
	getUnderlineColor() {
		if (this.bg & 268435456 && ~this.extended.underlineColor) switch (this.extended.underlineColor & 50331648) {
			case 16777216:
			case 33554432: return this.extended.underlineColor & 255;
			case 50331648: return this.extended.underlineColor & 16777215;
			default: return this.getFgColor();
		}
		return this.getFgColor();
	}
	getUnderlineColorMode() {
		return this.bg & 268435456 && ~this.extended.underlineColor ? this.extended.underlineColor & 50331648 : this.getFgColorMode();
	}
	isUnderlineColorRGB() {
		return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) == 50331648 : this.isFgRGB();
	}
	isUnderlineColorPalette() {
		return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) == 16777216 || (this.extended.underlineColor & 50331648) == 33554432 : this.isFgPalette();
	}
	isUnderlineColorDefault() {
		return this.bg & 268435456 && ~this.extended.underlineColor ? !(this.extended.underlineColor & 50331648) : this.isFgDefault();
	}
	getUnderlineStyle() {
		return this.fg & 268435456 ? this.bg & 268435456 ? this.extended.underlineStyle : 1 : 0;
	}
	getUnderlineVariantOffset() {
		return this.extended.underlineVariantOffset;
	}
}, _e = class e {
	constructor(e = 0, t = 0) {
		this._ext = 0, this._urlId = 0, this._ext = e, this._urlId = t;
	}
	get ext() {
		return this._urlId ? this._ext & -469762049 | this.underlineStyle << 26 : this._ext;
	}
	set ext(e) {
		this._ext = e;
	}
	get underlineStyle() {
		return this._urlId ? 5 : (this._ext & 469762048) >> 26;
	}
	set underlineStyle(e) {
		this._ext &= -469762049, this._ext |= e << 26 & 469762048;
	}
	get underlineColor() {
		return this._ext & 67108863;
	}
	set underlineColor(e) {
		this._ext &= -67108864, this._ext |= e & 67108863;
	}
	get urlId() {
		return this._urlId;
	}
	set urlId(e) {
		this._urlId = e;
	}
	get underlineVariantOffset() {
		let e = (this._ext & 3758096384) >> 29;
		return e < 0 ? e ^ 4294967288 : e;
	}
	set underlineVariantOffset(e) {
		this._ext &= 536870911, this._ext |= e << 29 & 3758096384;
	}
	clone() {
		return new e(this._ext, this._urlId);
	}
	isEmpty() {
		return this.underlineStyle === 0 && this._urlId === 0;
	}
}, T = class e extends ge {
	constructor() {
		super(...arguments), this.content = 0, this.fg = 0, this.bg = 0, this.extended = new _e(), this.combinedData = "";
	}
	static fromCharData(t) {
		let n = new e();
		return n.setFromCharData(t), n;
	}
	isCombined() {
		return this.content & 2097152;
	}
	getWidth() {
		return this.content >> 22;
	}
	getChars() {
		return this.content & 2097152 ? this.combinedData : this.content & 2097151 ? ue(this.content & 2097151) : "";
	}
	getCode() {
		return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : this.content & 2097151;
	}
	setFromCharData(e) {
		this.fg = e[0], this.bg = 0;
		let t = !1;
		if (e[1].length > 2) t = !0;
		else if (e[1].length === 2) {
			let n = e[1].charCodeAt(0);
			if (55296 <= n && n <= 56319) {
				let r = e[1].charCodeAt(1);
				56320 <= r && r <= 57343 ? this.content = (n - 55296) * 1024 + r - 56320 + 65536 | e[2] << 22 : t = !0;
			} else t = !0;
		} else this.content = e[1].charCodeAt(0) | e[2] << 22;
		t && (this.combinedData = e[1], this.content = 2097152 | e[2] << 22);
	}
	getAsCharData() {
		return [
			this.fg,
			this.getChars(),
			this.getWidth(),
			this.getCode()
		];
	}
}, ve = "di$target", ye = "di$dependencies", be = /* @__PURE__ */ new Map();
function xe(e) {
	return e[ye] || [];
}
function E(e) {
	if (be.has(e)) return be.get(e);
	let t = function(e, n, r) {
		if (arguments.length !== 3) throw Error("@IServiceName-decorator can only be used to decorate a parameter");
		Se(t, e, r);
	};
	return t._id = e, be.set(e, t), t;
}
function Se(e, t, n) {
	t[ve] === t ? t[ye].push({
		id: e,
		index: n
	}) : (t[ye] = [{
		id: e,
		index: n
	}], t[ve] = t);
}
var Ce = E("BufferService"), we = E("CoreMouseService"), Te = E("CoreService"), Ee = E("CharsetService"), De = E("InstantiationService"), Oe = E("LogService"), ke = E("OptionsService"), Ae = E("OscLinkService"), je = E("UnicodeService"), Me = E("DecorationService"), Ne = class {
	constructor(e, t, n) {
		this._bufferService = e, this._optionsService = t, this._oscLinkService = n;
	}
	provideLinks(e, t) {
		let n = this._bufferService.buffer.lines.get(e - 1);
		if (!n) {
			t(void 0);
			return;
		}
		let r = [], i = this._optionsService.rawOptions.linkHandler, a = new T(), o = n.getTrimmedLength(), s = -1, c = -1, l = !1;
		for (let t = 0; t < o; t++) if (c !== -1 || n.hasContent(t)) {
			if (n.loadCell(t, a), a.hasExtendedAttrs() && a.extended.urlId) {
				if (c === -1) {
					c = t, s = a.extended.urlId;
					continue;
				}
				l = a.extended.urlId !== s;
			} else c !== -1 && (l = !0);
			if (l || c !== -1 && t === o - 1) {
				let n = this._oscLinkService.getLinkData(s)?.uri;
				if (n) {
					let a = {
						start: {
							x: c + 1,
							y: e
						},
						end: {
							x: t + +(!l && t === o - 1),
							y: e
						}
					}, s = !1;
					if (!i?.allowNonHttpProtocols) try {
						let e = new URL(n);
						["http:", "https:"].includes(e.protocol) || (s = !0);
					} catch {
						s = !0;
					}
					s || r.push({
						text: n,
						range: a,
						activate: (e, t) => i ? i.activate(e, t, a) : Pe(e, t),
						hover: (e, t) => i?.hover?.(e, t, a),
						leave: (e, t) => i?.leave?.(e, t, a)
					});
				}
				l = !1, a.hasExtendedAttrs() && a.extended.urlId ? (c = t, s = a.extended.urlId) : (c = -1, s = -1);
			}
		}
		t(r);
	}
};
Ne = x([
	S(0, Ce),
	S(1, ke),
	S(2, Ae)
], Ne);
function Pe(e, t) {
	if (confirm(`Do you want to navigate to ${t}?

WARNING: This link could potentially be dangerous`)) {
		let e = window.open();
		if (e) {
			try {
				e.opener = null;
			} catch {}
			e.location.href = t;
		} else console.warn("Opening link blocked as opener could not be cleared");
	}
}
var Fe = E("CharSizeService"), Ie = E("CoreBrowserService"), Le = E("MouseService"), Re = E("RenderService"), ze = E("SelectionService"), Be = E("CharacterJoinerService"), Ve = E("ThemeService"), He = E("LinkProviderService"), Ue = new class {
	constructor() {
		this.listeners = [], this.unexpectedErrorHandler = function(e) {
			setTimeout(() => {
				throw e.stack ? Ye.isErrorNoTelemetry(e) ? new Ye(e.message + "\n\n" + e.stack) : /* @__PURE__ */ Error(e.message + "\n\n" + e.stack) : e;
			}, 0);
		};
	}
	addListener(e) {
		return this.listeners.push(e), () => {
			this._removeListener(e);
		};
	}
	emit(e) {
		this.listeners.forEach((t) => {
			t(e);
		});
	}
	_removeListener(e) {
		this.listeners.splice(this.listeners.indexOf(e), 1);
	}
	setUnexpectedErrorHandler(e) {
		this.unexpectedErrorHandler = e;
	}
	getUnexpectedErrorHandler() {
		return this.unexpectedErrorHandler;
	}
	onUnexpectedError(e) {
		this.unexpectedErrorHandler(e), this.emit(e);
	}
	onUnexpectedExternalError(e) {
		this.unexpectedErrorHandler(e);
	}
}();
function We(e) {
	Ke(e) || Ue.onUnexpectedError(e);
}
var Ge = "Canceled";
function Ke(e) {
	return e instanceof qe || e instanceof Error && e.name === Ge && e.message === Ge;
}
var qe = class extends Error {
	constructor() {
		super(Ge), this.name = this.message;
	}
};
function Je(e) {
	return Error(e ? `Illegal argument: ${e}` : "Illegal argument");
}
var Ye = class e extends Error {
	constructor(e) {
		super(e), this.name = "CodeExpectedError";
	}
	static fromError(t) {
		if (t instanceof e) return t;
		let n = new e();
		return n.message = t.message, n.stack = t.stack, n;
	}
	static isErrorNoTelemetry(e) {
		return e.name === "CodeExpectedError";
	}
}, Xe = class e extends Error {
	constructor(t) {
		super(t || "An unexpected bug occurred."), Object.setPrototypeOf(this, e.prototype);
	}
};
function Ze(e, t = 0) {
	return e[e.length - (1 + t)];
}
var Qe;
((e) => {
	function t(e) {
		return e < 0;
	}
	e.isLessThan = t;
	function n(e) {
		return e <= 0;
	}
	e.isLessThanOrEqual = n;
	function r(e) {
		return e > 0;
	}
	e.isGreaterThan = r;
	function i(e) {
		return e === 0;
	}
	e.isNeitherLessOrGreaterThan = i, e.greaterThan = 1, e.lessThan = -1, e.neitherLessOrGreaterThan = 0;
})(Qe ||= {});
var $e = class e {
	constructor(e) {
		this.iterate = e;
	}
	forEach(e) {
		this.iterate((t) => (e(t), !0));
	}
	toArray() {
		let e = [];
		return this.iterate((t) => (e.push(t), !0)), e;
	}
	filter(t) {
		return new e((e) => this.iterate((n) => !t(n) || e(n)));
	}
	map(t) {
		return new e((e) => this.iterate((n) => e(t(n))));
	}
	some(e) {
		let t = !1;
		return this.iterate((n) => (t = e(n), !t)), t;
	}
	findFirst(e) {
		let t;
		return this.iterate((n) => !e(n) || (t = n, !1)), t;
	}
	findLast(e) {
		let t;
		return this.iterate((n) => (e(n) && (t = n), !0)), t;
	}
	findLastMaxBy(e) {
		let t, n = !0;
		return this.iterate((r) => ((n || Qe.isGreaterThan(e(r, t))) && (n = !1, t = r), !0)), t;
	}
};
$e.empty = new $e((e) => {});
function et(e, t) {
	let n = this, r = !1, i;
	return function() {
		if (r) return i;
		if (r = !0, t) try {
			i = e.apply(n, arguments);
		} finally {
			t();
		}
		else i = e.apply(n, arguments);
		return i;
	};
}
var tt;
((e) => {
	function t(e) {
		return e && typeof e == "object" && typeof e[Symbol.iterator] == "function";
	}
	e.is = t;
	let n = Object.freeze([]);
	function r() {
		return n;
	}
	e.empty = r;
	function* i(e) {
		yield e;
	}
	e.single = i;
	function a(e) {
		return t(e) ? e : i(e);
	}
	e.wrap = a;
	function o(e) {
		return e || n;
	}
	e.from = o;
	function* s(e) {
		for (let t = e.length - 1; t >= 0; t--) yield e[t];
	}
	e.reverse = s;
	function c(e) {
		return !e || e[Symbol.iterator]().next().done === !0;
	}
	e.isEmpty = c;
	function l(e) {
		return e[Symbol.iterator]().next().value;
	}
	e.first = l;
	function u(e, t) {
		let n = 0;
		for (let r of e) if (t(r, n++)) return !0;
		return !1;
	}
	e.some = u;
	function d(e, t) {
		for (let n of e) if (t(n)) return n;
	}
	e.find = d;
	function* f(e, t) {
		for (let n of e) t(n) && (yield n);
	}
	e.filter = f;
	function* p(e, t) {
		let n = 0;
		for (let r of e) yield t(r, n++);
	}
	e.map = p;
	function* m(e, t) {
		let n = 0;
		for (let r of e) yield* t(r, n++);
	}
	e.flatMap = m;
	function* h(...e) {
		for (let t of e) yield* t;
	}
	e.concat = h;
	function g(e, t, n) {
		let r = n;
		for (let n of e) r = t(r, n);
		return r;
	}
	e.reduce = g;
	function* _(e, t, n = e.length) {
		for (t < 0 && (t += e.length), n < 0 ? n += e.length : n > e.length && (n = e.length); t < n; t++) yield e[t];
	}
	e.slice = _;
	function v(t, n = Infinity) {
		let r = [];
		if (n === 0) return [r, t];
		let i = t[Symbol.iterator]();
		for (let t = 0; t < n; t++) {
			let t = i.next();
			if (t.done) return [r, e.empty()];
			r.push(t.value);
		}
		return [r, { [Symbol.iterator]() {
			return i;
		} }];
	}
	e.consume = v;
	async function y(e) {
		let t = [];
		for await (let n of e) t.push(n);
		return Promise.resolve(t);
	}
	e.asyncToArray = y;
})(tt ||= {});
var nt = null;
function rt(e) {
	return nt?.trackDisposable(e), e;
}
function it(e) {
	nt?.markAsDisposed(e);
}
function at(e, t) {
	nt?.setParent(e, t);
}
function ot(e) {
	return nt?.markAsSingleton(e), e;
}
function st(e) {
	if (tt.is(e)) {
		let t = [];
		for (let n of e) if (n) try {
			n.dispose();
		} catch (e) {
			t.push(e);
		}
		if (t.length === 1) throw t[0];
		if (t.length > 1) throw AggregateError(t, "Encountered errors while disposing of store");
		return Array.isArray(e) ? [] : e;
	}
	if (e) return e.dispose(), e;
}
function ct(...e) {
	return D(() => st(e));
}
function D(e) {
	let t = rt({ dispose: et(() => {
		it(t), e();
	}) });
	return t;
}
var lt = class e {
	constructor() {
		this._toDispose = /* @__PURE__ */ new Set(), this._isDisposed = !1, rt(this);
	}
	dispose() {
		this._isDisposed || (it(this), this._isDisposed = !0, this.clear());
	}
	get isDisposed() {
		return this._isDisposed;
	}
	clear() {
		if (this._toDispose.size !== 0) try {
			st(this._toDispose);
		} finally {
			this._toDispose.clear();
		}
	}
	add(t) {
		if (!t) return t;
		if (t === this) throw Error("Cannot register a disposable on itself!");
		return at(t, this), this._isDisposed ? e.DISABLE_DISPOSED_WARNING || console.warn((/* @__PURE__ */ Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!")).stack) : this._toDispose.add(t), t;
	}
	delete(e) {
		if (e) {
			if (e === this) throw Error("Cannot dispose a disposable on itself!");
			this._toDispose.delete(e), e.dispose();
		}
	}
	deleteAndLeak(e) {
		e && this._toDispose.has(e) && (this._toDispose.delete(e), at(e, null));
	}
};
lt.DISABLE_DISPOSED_WARNING = !1;
var ut = lt, O = class {
	constructor() {
		this._store = new ut(), rt(this), at(this._store, this);
	}
	dispose() {
		it(this), this._store.dispose();
	}
	_register(e) {
		if (e === this) throw Error("Cannot register a disposable on itself!");
		return this._store.add(e);
	}
};
O.None = Object.freeze({ dispose() {} });
var dt = class {
	constructor() {
		this._isDisposed = !1, rt(this);
	}
	get value() {
		return this._isDisposed ? void 0 : this._value;
	}
	set value(e) {
		this._isDisposed || e === this._value || (this._value?.dispose(), e && at(e, this), this._value = e);
	}
	clear() {
		this.value = void 0;
	}
	dispose() {
		this._isDisposed = !0, it(this), this._value?.dispose(), this._value = void 0;
	}
	clearAndLeak() {
		let e = this._value;
		return this._value = void 0, e && at(e, null), e;
	}
}, ft = typeof window == "object" ? window : globalThis, pt = class e {
	constructor(t) {
		this.element = t, this.next = e.Undefined, this.prev = e.Undefined;
	}
};
pt.Undefined = new pt(void 0);
var k = pt, mt = class {
	constructor() {
		this._first = k.Undefined, this._last = k.Undefined, this._size = 0;
	}
	get size() {
		return this._size;
	}
	isEmpty() {
		return this._first === k.Undefined;
	}
	clear() {
		let e = this._first;
		for (; e !== k.Undefined;) {
			let t = e.next;
			e.prev = k.Undefined, e.next = k.Undefined, e = t;
		}
		this._first = k.Undefined, this._last = k.Undefined, this._size = 0;
	}
	unshift(e) {
		return this._insert(e, !1);
	}
	push(e) {
		return this._insert(e, !0);
	}
	_insert(e, t) {
		let n = new k(e);
		if (this._first === k.Undefined) this._first = n, this._last = n;
		else if (t) {
			let e = this._last;
			this._last = n, n.prev = e, e.next = n;
		} else {
			let e = this._first;
			this._first = n, n.next = e, e.prev = n;
		}
		this._size += 1;
		let r = !1;
		return () => {
			r || (r = !0, this._remove(n));
		};
	}
	shift() {
		if (this._first !== k.Undefined) {
			let e = this._first.element;
			return this._remove(this._first), e;
		}
	}
	pop() {
		if (this._last !== k.Undefined) {
			let e = this._last.element;
			return this._remove(this._last), e;
		}
	}
	_remove(e) {
		if (e.prev !== k.Undefined && e.next !== k.Undefined) {
			let t = e.prev;
			t.next = e.next, e.next.prev = t;
		} else e.prev === k.Undefined && e.next === k.Undefined ? (this._first = k.Undefined, this._last = k.Undefined) : e.next === k.Undefined ? (this._last = this._last.prev, this._last.next = k.Undefined) : e.prev === k.Undefined && (this._first = this._first.next, this._first.prev = k.Undefined);
		--this._size;
	}
	*[Symbol.iterator]() {
		let e = this._first;
		for (; e !== k.Undefined;) yield e.element, e = e.next;
	}
}, ht = globalThis.performance && typeof globalThis.performance.now == "function", gt = class e {
	static create(t) {
		return new e(t);
	}
	constructor(e) {
		this._now = ht && e === !1 ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
	}
	stop() {
		this._stopTime = this._now();
	}
	reset() {
		this._startTime = this._now(), this._stopTime = -1;
	}
	elapsed() {
		return this._stopTime === -1 ? this._now() - this._startTime : this._stopTime - this._startTime;
	}
}, _t;
((e) => {
	e.None = () => O.None;
	function t(e, t) {
		return d(e, () => {}, 0, void 0, !0, void 0, t);
	}
	e.defer = t;
	function n(e) {
		return (t, n = null, r) => {
			let i = !1, a;
			return a = e((e) => {
				if (!i) return a ? a.dispose() : i = !0, t.call(n, e);
			}, null, r), i && a.dispose(), a;
		};
	}
	e.once = n;
	function r(e, t, n) {
		return l((n, r = null, i) => e((e) => n.call(r, t(e)), null, i), n);
	}
	e.map = r;
	function i(e, t, n) {
		return l((n, r = null, i) => e((e) => {
			t(e), n.call(r, e);
		}, null, i), n);
	}
	e.forEach = i;
	function a(e, t, n) {
		return l((n, r = null, i) => e((e) => t(e) && n.call(r, e), null, i), n);
	}
	e.filter = a;
	function o(e) {
		return e;
	}
	e.signal = o;
	function s(...e) {
		return (t, n = null, r) => u(ct(...e.map((e) => e((e) => t.call(n, e)))), r);
	}
	e.any = s;
	function c(e, t, n, i) {
		let a = n;
		return r(e, (e) => (a = t(a, e), a), i);
	}
	e.reduce = c;
	function l(e, t) {
		let n, r = new A({
			onWillAddFirstListener() {
				n = e(r.fire, r);
			},
			onDidRemoveLastListener() {
				n?.dispose();
			}
		});
		return t?.add(r), r.event;
	}
	function u(e, t) {
		return t instanceof Array ? t.push(e) : t && t.add(e), e;
	}
	function d(e, t, n = 100, r = !1, i = !1, a, o) {
		let s, c, l, u = 0, d, f = new A({
			leakWarningThreshold: a,
			onWillAddFirstListener() {
				s = e((e) => {
					u++, c = t(c, e), r && !l && (f.fire(c), c = void 0), d = () => {
						let e = c;
						c = void 0, l = void 0, (!r || u > 1) && f.fire(e), u = 0;
					}, typeof n == "number" ? (clearTimeout(l), l = setTimeout(d, n)) : l === void 0 && (l = 0, queueMicrotask(d));
				});
			},
			onWillRemoveListener() {
				i && u > 0 && d?.();
			},
			onDidRemoveLastListener() {
				d = void 0, s.dispose();
			}
		});
		return o?.add(f), f.event;
	}
	e.debounce = d;
	function f(t, n = 0, r) {
		return e.debounce(t, (e, t) => e ? (e.push(t), e) : [t], n, void 0, !0, void 0, r);
	}
	e.accumulate = f;
	function p(e, t = (e, t) => e === t, n) {
		let r = !0, i;
		return a(e, (e) => {
			let n = r || !t(e, i);
			return r = !1, i = e, n;
		}, n);
	}
	e.latch = p;
	function m(t, n, r) {
		return [e.filter(t, n, r), e.filter(t, (e) => !n(e), r)];
	}
	e.split = m;
	function h(e, t = !1, n = [], r) {
		let i = n.slice(), a = e((e) => {
			i ? i.push(e) : s.fire(e);
		});
		r && r.add(a);
		let o = () => {
			i?.forEach((e) => s.fire(e)), i = null;
		}, s = new A({
			onWillAddFirstListener() {
				a || (a = e((e) => s.fire(e)), r && r.add(a));
			},
			onDidAddFirstListener() {
				i && (t ? setTimeout(o) : o());
			},
			onDidRemoveLastListener() {
				a && a.dispose(), a = null;
			}
		});
		return r && r.add(s), s.event;
	}
	e.buffer = h;
	function g(e, t) {
		return (n, r, i) => {
			let a = t(new v());
			return e(function(e) {
				let t = a.evaluate(e);
				t !== _ && n.call(r, t);
			}, void 0, i);
		};
	}
	e.chain = g;
	let _ = Symbol("HaltChainable");
	class v {
		constructor() {
			this.steps = [];
		}
		map(e) {
			return this.steps.push(e), this;
		}
		forEach(e) {
			return this.steps.push((t) => (e(t), t)), this;
		}
		filter(e) {
			return this.steps.push((t) => e(t) ? t : _), this;
		}
		reduce(e, t) {
			let n = t;
			return this.steps.push((t) => (n = e(n, t), n)), this;
		}
		latch(e = (e, t) => e === t) {
			let t = !0, n;
			return this.steps.push((r) => {
				let i = t || !e(r, n);
				return t = !1, n = r, i ? r : _;
			}), this;
		}
		evaluate(e) {
			for (let t of this.steps) if (e = t(e), e === _) break;
			return e;
		}
	}
	function y(e, t, n = (e) => e) {
		let r = (...e) => i.fire(n(...e)), i = new A({
			onWillAddFirstListener: () => e.on(t, r),
			onDidRemoveLastListener: () => e.removeListener(t, r)
		});
		return i.event;
	}
	e.fromNodeEventEmitter = y;
	function ee(e, t, n = (e) => e) {
		let r = (...e) => i.fire(n(...e)), i = new A({
			onWillAddFirstListener: () => e.addEventListener(t, r),
			onDidRemoveLastListener: () => e.removeEventListener(t, r)
		});
		return i.event;
	}
	e.fromDOMEventEmitter = ee;
	function b(e) {
		return new Promise((t) => n(e)(t));
	}
	e.toPromise = b;
	function x(e) {
		let t = new A();
		return e.then((e) => {
			t.fire(e);
		}, () => {
			t.fire(void 0);
		}).finally(() => {
			t.dispose();
		}), t.event;
	}
	e.fromPromise = x;
	function S(e, t) {
		return e((e) => t.fire(e));
	}
	e.forward = S;
	function te(e, t, n) {
		return t(n), e((e) => t(e));
	}
	e.runAndSubscribe = te;
	class ne {
		constructor(e, t) {
			this._observable = e, this._counter = 0, this._hasChanged = !1;
			let n = {
				onWillAddFirstListener: () => {
					e.addObserver(this);
				},
				onDidRemoveLastListener: () => {
					e.removeObserver(this);
				}
			};
			this.emitter = new A(n), t && t.add(this.emitter);
		}
		beginUpdate(e) {
			this._counter++;
		}
		handlePossibleChange(e) {}
		handleChange(e, t) {
			this._hasChanged = !0;
		}
		endUpdate(e) {
			this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = !1, this.emitter.fire(this._observable.get())));
		}
	}
	function re(e, t) {
		return new ne(e, t).emitter.event;
	}
	e.fromObservable = re;
	function C(e) {
		return (t, n, r) => {
			let i = 0, a = !1, o = {
				beginUpdate() {
					i++;
				},
				endUpdate() {
					i--, i === 0 && (e.reportChanges(), a && (a = !1, t.call(n)));
				},
				handlePossibleChange() {},
				handleChange() {
					a = !0;
				}
			};
			e.addObserver(o), e.reportChanges();
			let s = { dispose() {
				e.removeObserver(o);
			} };
			return r instanceof ut ? r.add(s) : Array.isArray(r) && r.push(s), s;
		};
	}
	e.fromObservableLight = C;
})(_t ||= {});
var vt = class e {
	constructor(t) {
		this.listenerCount = 0, this.invocationCount = 0, this.elapsedOverall = 0, this.durations = [], this.name = `${t}_${e._idPool++}`, e.all.add(this);
	}
	start(e) {
		this._stopWatch = new gt(), this.listenerCount = e;
	}
	stop() {
		if (this._stopWatch) {
			let e = this._stopWatch.elapsed();
			this.durations.push(e), this.elapsedOverall += e, this.invocationCount += 1, this._stopWatch = void 0;
		}
	}
};
vt.all = /* @__PURE__ */ new Set(), vt._idPool = 0;
var yt = vt, bt = -1, xt = class e {
	constructor(t, n, r = (e._idPool++).toString(16).padStart(3, "0")) {
		this._errorHandler = t, this.threshold = n, this.name = r, this._warnCountdown = 0;
	}
	dispose() {
		this._stacks?.clear();
	}
	check(e, t) {
		let n = this.threshold;
		if (n <= 0 || t < n) return;
		this._stacks ||= /* @__PURE__ */ new Map();
		let r = this._stacks.get(e.value) || 0;
		if (this._stacks.set(e.value, r + 1), --this._warnCountdown, this._warnCountdown <= 0) {
			this._warnCountdown = n * .5;
			let [e, r] = this.getMostFrequentStack(), i = `[${this.name}] potential listener LEAK detected, having ${t} listeners already. MOST frequent listener (${r}):`;
			console.warn(i), console.warn(e);
			let a = new wt(i, e);
			this._errorHandler(a);
		}
		return () => {
			let t = this._stacks.get(e.value) || 0;
			this._stacks.set(e.value, t - 1);
		};
	}
	getMostFrequentStack() {
		if (!this._stacks) return;
		let e, t = 0;
		for (let [n, r] of this._stacks) (!e || t < r) && (e = [n, r], t = r);
		return e;
	}
};
xt._idPool = 1;
var St = xt, Ct = class e {
	constructor(e) {
		this.value = e;
	}
	static create() {
		return new e((/* @__PURE__ */ Error()).stack ?? "");
	}
	print() {
		console.warn(this.value.split("\n").slice(2).join("\n"));
	}
}, wt = class extends Error {
	constructor(e, t) {
		super(e), this.name = "ListenerLeakError", this.stack = t;
	}
}, Tt = class extends Error {
	constructor(e, t) {
		super(e), this.name = "ListenerRefusalError", this.stack = t;
	}
}, Et = 0, Dt = class {
	constructor(e) {
		this.value = e, this.id = Et++;
	}
}, Ot = 2, A = class {
	constructor(e) {
		this._size = 0, this._options = e, this._leakageMon = bt > 0 || this._options?.leakWarningThreshold ? new St(e?.onListenerError ?? We, this._options?.leakWarningThreshold ?? bt) : void 0, this._perfMon = this._options?._profName ? new yt(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
	}
	dispose() {
		this._disposed || (this._disposed = !0, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners && (this._listeners = void 0, this._size = 0), this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose());
	}
	get event() {
		return this._event ??= (e, t, n) => {
			if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
				let e = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
				console.warn(e);
				let t = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], n = new Tt(`${e}. HINT: Stack shows most frequent listener (${t[1]}-times)`, t[0]);
				return (this._options?.onListenerError || We)(n), O.None;
			}
			if (this._disposed) return O.None;
			t && (e = e.bind(t));
			let r = new Dt(e), i;
			this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * .2) && (r.stack = Ct.create(), i = this._leakageMon.check(r.stack, this._size + 1)), this._listeners ? this._listeners instanceof Dt ? (this._deliveryQueue ??= new kt(), this._listeners = [this._listeners, r]) : this._listeners.push(r) : (this._options?.onWillAddFirstListener?.(this), this._listeners = r, this._options?.onDidAddFirstListener?.(this)), this._size++;
			let a = D(() => {
				i?.(), this._removeListener(r);
			});
			return n instanceof ut ? n.add(a) : Array.isArray(n) && n.push(a), a;
		}, this._event;
	}
	_removeListener(e) {
		if (this._options?.onWillRemoveListener?.(this), !this._listeners) return;
		if (this._size === 1) {
			this._listeners = void 0, this._options?.onDidRemoveLastListener?.(this), this._size = 0;
			return;
		}
		let t = this._listeners, n = t.indexOf(e);
		if (n === -1) throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), /* @__PURE__ */ Error("Attempted to dispose unknown listener");
		this._size--, t[n] = void 0;
		let r = this._deliveryQueue.current === this;
		if (this._size * Ot <= t.length) {
			let e = 0;
			for (let n = 0; n < t.length; n++) t[n] ? t[e++] = t[n] : r && (this._deliveryQueue.end--, e < this._deliveryQueue.i && this._deliveryQueue.i--);
			t.length = e;
		}
	}
	_deliver(e, t) {
		if (!e) return;
		let n = this._options?.onListenerError || We;
		if (!n) e.value(t);
		else try {
			e.value(t);
		} catch (e) {
			n(e);
		}
	}
	_deliverQueue(e) {
		let t = e.current._listeners;
		for (; e.i < e.end;) this._deliver(t[e.i++], e.value);
		e.reset();
	}
	fire(e) {
		if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) {
			if (this._listeners instanceof Dt) this._deliver(this._listeners, e);
			else {
				let t = this._deliveryQueue;
				t.enqueue(this, e, this._listeners.length), this._deliverQueue(t);
			}
		}
		this._perfMon?.stop();
	}
	hasListeners() {
		return this._size > 0;
	}
}, kt = class {
	constructor() {
		this.i = -1, this.end = 0;
	}
	enqueue(e, t, n) {
		this.i = 0, this.end = n, this.current = e, this.value = t;
	}
	reset() {
		this.i = this.end, this.current = void 0, this.value = void 0;
	}
}, At = class {
	constructor() {
		this.mapWindowIdToZoomLevel = /* @__PURE__ */ new Map(), this._onDidChangeZoomLevel = new A(), this.onDidChangeZoomLevel = this._onDidChangeZoomLevel.event, this.mapWindowIdToZoomFactor = /* @__PURE__ */ new Map(), this._onDidChangeFullscreen = new A(), this.onDidChangeFullscreen = this._onDidChangeFullscreen.event, this.mapWindowIdToFullScreen = /* @__PURE__ */ new Map();
	}
	getZoomLevel(e) {
		return this.mapWindowIdToZoomLevel.get(this.getWindowId(e)) ?? 0;
	}
	setZoomLevel(e, t) {
		if (this.getZoomLevel(t) === e) return;
		let n = this.getWindowId(t);
		this.mapWindowIdToZoomLevel.set(n, e), this._onDidChangeZoomLevel.fire(n);
	}
	getZoomFactor(e) {
		return this.mapWindowIdToZoomFactor.get(this.getWindowId(e)) ?? 1;
	}
	setZoomFactor(e, t) {
		this.mapWindowIdToZoomFactor.set(this.getWindowId(t), e);
	}
	setFullscreen(e, t) {
		if (this.isFullscreen(t) === e) return;
		let n = this.getWindowId(t);
		this.mapWindowIdToFullScreen.set(n, e), this._onDidChangeFullscreen.fire(n);
	}
	isFullscreen(e) {
		return !!this.mapWindowIdToFullScreen.get(this.getWindowId(e));
	}
	getWindowId(e) {
		return e.vscodeWindowId;
	}
};
At.INSTANCE = new At();
var jt = At;
function Mt(e, t, n) {
	typeof t == "string" && (t = e.matchMedia(t)), t.addEventListener("change", n);
}
jt.INSTANCE.onDidChangeZoomLevel;
function Nt(e) {
	return jt.INSTANCE.getZoomFactor(e);
}
jt.INSTANCE.onDidChangeFullscreen;
var Pt = typeof navigator == "object" ? navigator.userAgent : "", Ft = Pt.indexOf("Firefox") >= 0, It = Pt.indexOf("AppleWebKit") >= 0, Lt = Pt.indexOf("Chrome") >= 0, Rt = !Lt && Pt.indexOf("Safari") >= 0;
Pt.indexOf("Electron/"), Pt.indexOf("Android");
var zt = !1;
if (typeof ft.matchMedia == "function") {
	let e = ft.matchMedia("(display-mode: standalone) or (display-mode: window-controls-overlay)"), t = ft.matchMedia("(display-mode: fullscreen)");
	zt = e.matches, Mt(ft, e, ({ matches: e }) => {
		zt && t.matches || (zt = e);
	});
}
function Bt() {
	return zt;
}
var Vt = "en", Ht = !1, Ut = !1, Wt = !1, Gt = !1, Kt = !1, qt = Vt, Jt, Yt = globalThis, Xt;
typeof Yt.vscode < "u" && typeof Yt.vscode.process < "u" ? Xt = Yt.vscode.process : typeof process < "u" && typeof process?.versions?.node == "string" && (Xt = process);
var Zt = typeof Xt?.versions?.electron == "string" && Xt?.type === "renderer";
if (typeof Xt == "object") {
	Ht = Xt.platform === "win32", Ut = Xt.platform === "darwin", Wt = Xt.platform === "linux", Wt && Xt.env.SNAP && Xt.env.SNAP_REVISION, Xt.env.CI || Xt.env.BUILD_ARTIFACTSTAGINGDIRECTORY, qt = Vt;
	let e = Xt.env.VSCODE_NLS_CONFIG;
	if (e) try {
		let t = JSON.parse(e);
		t.userLocale, t.osLocale, qt = t.resolvedLanguage || Vt, t.languagePack?.translationsConfigFile;
	} catch {}
	Gt = !0;
} else typeof navigator == "object" && !Zt ? (Jt = navigator.userAgent, Ht = Jt.indexOf("Windows") >= 0, Ut = Jt.indexOf("Macintosh") >= 0, (Jt.indexOf("Macintosh") >= 0 || Jt.indexOf("iPad") >= 0 || Jt.indexOf("iPhone") >= 0) && navigator.maxTouchPoints && navigator.maxTouchPoints, Wt = Jt.indexOf("Linux") >= 0, Jt?.indexOf("Mobi"), Kt = !0, qt = globalThis._VSCODE_NLS_LANGUAGE || Vt, navigator.language.toLowerCase()) : console.error("Unable to resolve platform.");
var Qt = Ht, $t = Ut, en = Wt, tn = Gt;
Kt && typeof Yt.importScripts == "function" && Yt.origin;
var nn = Jt, rn = qt, an;
((e) => {
	function t() {
		return rn;
	}
	e.value = t;
	function n() {
		return rn.length === 2 ? rn === "en" : rn.length >= 3 && rn[0] === "e" && rn[1] === "n" && rn[2] === "-";
	}
	e.isDefaultVariant = n;
	function r() {
		return rn === "en";
	}
	e.isDefault = r;
})(an ||= {});
var on = typeof Yt.postMessage == "function" && !Yt.importScripts;
(() => {
	if (on) {
		let e = [];
		Yt.addEventListener("message", (t) => {
			if (t.data && t.data.vscodeScheduleAsyncWork) for (let n = 0, r = e.length; n < r; n++) {
				let r = e[n];
				if (r.id === t.data.vscodeScheduleAsyncWork) {
					e.splice(n, 1), r.callback();
					return;
				}
			}
		});
		let t = 0;
		return (n) => {
			let r = ++t;
			e.push({
				id: r,
				callback: n
			}), Yt.postMessage({ vscodeScheduleAsyncWork: r }, "*");
		};
	}
	return (e) => setTimeout(e);
})();
var sn = !!(nn && nn.indexOf("Chrome") >= 0);
nn && nn.indexOf("Firefox"), !sn && nn && nn.indexOf("Safari"), nn && nn.indexOf("Edg/"), nn && nn.indexOf("Android");
var cn = typeof navigator == "object" ? navigator : {};
tn || document.queryCommandSupported && document.queryCommandSupported("copy") || cn && cn.clipboard && cn.clipboard.writeText, tn || cn && cn.clipboard && cn.clipboard.readText, tn || Bt() || cn.keyboard, "ontouchstart" in ft || cn.maxTouchPoints, ft.PointerEvent && ("ontouchstart" in ft || navigator.maxTouchPoints);
var ln = class {
	constructor() {
		this._keyCodeToStr = [], this._strToKeyCode = Object.create(null);
	}
	define(e, t) {
		this._keyCodeToStr[e] = t, this._strToKeyCode[t.toLowerCase()] = e;
	}
	keyCodeToStr(e) {
		return this._keyCodeToStr[e];
	}
	strToKeyCode(e) {
		return this._strToKeyCode[e.toLowerCase()] || 0;
	}
}, un = new ln(), dn = new ln(), fn = new ln(), pn = Array(230), mn;
((e) => {
	function t(e) {
		return un.keyCodeToStr(e);
	}
	e.toString = t;
	function n(e) {
		return un.strToKeyCode(e);
	}
	e.fromString = n;
	function r(e) {
		return dn.keyCodeToStr(e);
	}
	e.toUserSettingsUS = r;
	function i(e) {
		return fn.keyCodeToStr(e);
	}
	e.toUserSettingsGeneral = i;
	function a(e) {
		return dn.strToKeyCode(e) || fn.strToKeyCode(e);
	}
	e.fromUserSettings = a;
	function o(e) {
		if (e >= 98 && e <= 113) return null;
		switch (e) {
			case 16: return "Up";
			case 18: return "Down";
			case 15: return "Left";
			case 17: return "Right";
		}
		return un.keyCodeToStr(e);
	}
	e.toElectronAccelerator = o;
})(mn ||= {});
var hn = class e {
	constructor(e, t, n, r, i) {
		this.ctrlKey = e, this.shiftKey = t, this.altKey = n, this.metaKey = r, this.keyCode = i;
	}
	equals(t) {
		return t instanceof e && this.ctrlKey === t.ctrlKey && this.shiftKey === t.shiftKey && this.altKey === t.altKey && this.metaKey === t.metaKey && this.keyCode === t.keyCode;
	}
	getHashCode() {
		return `K${this.ctrlKey ? "1" : "0"}${this.shiftKey ? "1" : "0"}${this.altKey ? "1" : "0"}${this.metaKey ? "1" : "0"}${this.keyCode}`;
	}
	isModifierKey() {
		return this.keyCode === 0 || this.keyCode === 5 || this.keyCode === 57 || this.keyCode === 6 || this.keyCode === 4;
	}
	toKeybinding() {
		return new gn([this]);
	}
	isDuplicateModifierCase() {
		return this.ctrlKey && this.keyCode === 5 || this.shiftKey && this.keyCode === 4 || this.altKey && this.keyCode === 6 || this.metaKey && this.keyCode === 57;
	}
}, gn = class {
	constructor(e) {
		if (e.length === 0) throw Je("chords");
		this.chords = e;
	}
	getHashCode() {
		let e = "";
		for (let t = 0, n = this.chords.length; t < n; t++) t !== 0 && (e += ";"), e += this.chords[t].getHashCode();
		return e;
	}
	equals(e) {
		if (e === null || this.chords.length !== e.chords.length) return !1;
		for (let t = 0; t < this.chords.length; t++) if (!this.chords[t].equals(e.chords[t])) return !1;
		return !0;
	}
};
function _n(e) {
	if (e.charCode) {
		let t = String.fromCharCode(e.charCode).toUpperCase();
		return mn.fromString(t);
	}
	let t = e.keyCode;
	if (t === 3) return 7;
	if (Ft) switch (t) {
		case 59: return 85;
		case 60:
			if (en) return 97;
			break;
		case 61: return 86;
		case 107: return 109;
		case 109: return 111;
		case 173: return 88;
		case 224: if ($t) return 57;
	}
	else if (It && ($t && t === 93 || !$t && t === 92)) return 57;
	return pn[t] || 0;
}
var vn = $t ? 256 : 2048, yn = 512, bn = 1024, xn = $t ? 2048 : 256, Sn = class {
	constructor(e) {
		this._standardKeyboardEventBrand = !0;
		let t = e;
		this.browserEvent = t, this.target = t.target, this.ctrlKey = t.ctrlKey, this.shiftKey = t.shiftKey, this.altKey = t.altKey, this.metaKey = t.metaKey, this.altGraphKey = t.getModifierState?.("AltGraph"), this.keyCode = _n(t), this.code = t.code, this.ctrlKey = this.ctrlKey || this.keyCode === 5, this.altKey = this.altKey || this.keyCode === 6, this.shiftKey = this.shiftKey || this.keyCode === 4, this.metaKey = this.metaKey || this.keyCode === 57, this._asKeybinding = this._computeKeybinding(), this._asKeyCodeChord = this._computeKeyCodeChord();
	}
	preventDefault() {
		this.browserEvent && this.browserEvent.preventDefault && this.browserEvent.preventDefault();
	}
	stopPropagation() {
		this.browserEvent && this.browserEvent.stopPropagation && this.browserEvent.stopPropagation();
	}
	toKeyCodeChord() {
		return this._asKeyCodeChord;
	}
	equals(e) {
		return this._asKeybinding === e;
	}
	_computeKeybinding() {
		let e = 0;
		this.keyCode !== 5 && this.keyCode !== 4 && this.keyCode !== 6 && this.keyCode !== 57 && (e = this.keyCode);
		let t = 0;
		return this.ctrlKey && (t |= vn), this.altKey && (t |= yn), this.shiftKey && (t |= bn), this.metaKey && (t |= xn), t |= e, t;
	}
	_computeKeyCodeChord() {
		let e = 0;
		return this.keyCode !== 5 && this.keyCode !== 4 && this.keyCode !== 6 && this.keyCode !== 57 && (e = this.keyCode), new hn(this.ctrlKey, this.shiftKey, this.altKey, this.metaKey, e);
	}
}, Cn = /* @__PURE__ */ new WeakMap();
function wn(e) {
	if (!e.parent || e.parent === e) return null;
	try {
		let t = e.location, n = e.parent.location;
		if (t.origin !== "null" && n.origin !== "null" && t.origin !== n.origin) return null;
	} catch {
		return null;
	}
	return e.parent;
}
var Tn = class {
	static getSameOriginWindowChain(e) {
		let t = Cn.get(e);
		if (!t) {
			t = [], Cn.set(e, t);
			let n = e, r;
			do
				r = wn(n), r ? t.push({
					window: new WeakRef(n),
					iframeElement: n.frameElement || null
				}) : t.push({
					window: new WeakRef(n),
					iframeElement: null
				}), n = r;
			while (n);
		}
		return t.slice(0);
	}
	static getPositionOfChildWindowRelativeToAncestorWindow(e, t) {
		if (!t || e === t) return {
			top: 0,
			left: 0
		};
		let n = 0, r = 0, i = this.getSameOriginWindowChain(e);
		for (let e of i) {
			let i = e.window.deref();
			if (n += i?.scrollY ?? 0, r += i?.scrollX ?? 0, i === t || !e.iframeElement) break;
			let a = e.iframeElement.getBoundingClientRect();
			n += a.top, r += a.left;
		}
		return {
			top: n,
			left: r
		};
	}
}, En = class {
	constructor(e, t) {
		this.timestamp = Date.now(), this.browserEvent = t, this.leftButton = t.button === 0, this.middleButton = t.button === 1, this.rightButton = t.button === 2, this.buttons = t.buttons, this.target = t.target, this.detail = t.detail || 1, t.type === "dblclick" && (this.detail = 2), this.ctrlKey = t.ctrlKey, this.shiftKey = t.shiftKey, this.altKey = t.altKey, this.metaKey = t.metaKey, typeof t.pageX == "number" ? (this.posx = t.pageX, this.posy = t.pageY) : (this.posx = t.clientX + this.target.ownerDocument.body.scrollLeft + this.target.ownerDocument.documentElement.scrollLeft, this.posy = t.clientY + this.target.ownerDocument.body.scrollTop + this.target.ownerDocument.documentElement.scrollTop);
		let n = Tn.getPositionOfChildWindowRelativeToAncestorWindow(e, t.view);
		this.posx -= n.left, this.posy -= n.top;
	}
	preventDefault() {
		this.browserEvent.preventDefault();
	}
	stopPropagation() {
		this.browserEvent.stopPropagation();
	}
}, Dn = class {
	constructor(e, t = 0, n = 0) {
		this.browserEvent = e || null, this.target = e ? e.target || e.targetNode || e.srcElement : null, this.deltaY = n, this.deltaX = t;
		let r = !1;
		if (Lt) {
			let e = navigator.userAgent.match(/Chrome\/(\d+)/);
			r = (e ? parseInt(e[1]) : 123) <= 122;
		}
		if (e) {
			let t = e, n = e, i = e.view?.devicePixelRatio || 1;
			if (typeof t.wheelDeltaY < "u") this.deltaY = r ? t.wheelDeltaY / (120 * i) : t.wheelDeltaY / 120;
			else if (typeof n.VERTICAL_AXIS < "u" && n.axis === n.VERTICAL_AXIS) this.deltaY = -n.detail / 3;
			else if (e.type === "wheel") {
				let t = e;
				this.deltaY = t.deltaMode === t.DOM_DELTA_LINE ? Ft && !$t ? -e.deltaY / 3 : -e.deltaY : -e.deltaY / 40;
			}
			if (typeof t.wheelDeltaX < "u") this.deltaX = Rt && Qt ? -(t.wheelDeltaX / 120) : r ? t.wheelDeltaX / (120 * i) : t.wheelDeltaX / 120;
			else if (typeof n.HORIZONTAL_AXIS < "u" && n.axis === n.HORIZONTAL_AXIS) this.deltaX = -e.detail / 3;
			else if (e.type === "wheel") {
				let t = e;
				this.deltaX = t.deltaMode === t.DOM_DELTA_LINE ? Ft && !$t ? -e.deltaX / 3 : -e.deltaX : -e.deltaX / 40;
			}
			this.deltaY === 0 && this.deltaX === 0 && e.wheelDelta && (this.deltaY = r ? e.wheelDelta / (120 * i) : e.wheelDelta / 120);
		}
	}
	preventDefault() {
		this.browserEvent?.preventDefault();
	}
	stopPropagation() {
		this.browserEvent?.stopPropagation();
	}
}, On = Object.freeze(function(e, t) {
	let n = setTimeout(e.bind(t), 0);
	return { dispose() {
		clearTimeout(n);
	} };
}), kn;
((e) => {
	function t(t) {
		return t === e.None || t === e.Cancelled || t instanceof An ? !0 : !t || typeof t != "object" ? !1 : typeof t.isCancellationRequested == "boolean" && typeof t.onCancellationRequested == "function";
	}
	e.isCancellationToken = t, e.None = Object.freeze({
		isCancellationRequested: !1,
		onCancellationRequested: _t.None
	}), e.Cancelled = Object.freeze({
		isCancellationRequested: !0,
		onCancellationRequested: On
	});
})(kn ||= {});
var An = class {
	constructor() {
		this._isCancelled = !1, this._emitter = null;
	}
	cancel() {
		this._isCancelled || (this._isCancelled = !0, this._emitter && (this._emitter.fire(void 0), this.dispose()));
	}
	get isCancellationRequested() {
		return this._isCancelled;
	}
	get onCancellationRequested() {
		return this._isCancelled ? On : (this._emitter ||= new A(), this._emitter.event);
	}
	dispose() {
		this._emitter &&= (this._emitter.dispose(), null);
	}
}, jn = class {
	constructor(e, t) {
		this._isDisposed = !1, this._token = -1, typeof e == "function" && typeof t == "number" && this.setIfNotSet(e, t);
	}
	dispose() {
		this.cancel(), this._isDisposed = !0;
	}
	cancel() {
		this._token !== -1 && (clearTimeout(this._token), this._token = -1);
	}
	cancelAndSet(e, t) {
		if (this._isDisposed) throw new Xe("Calling 'cancelAndSet' on a disposed TimeoutTimer");
		this.cancel(), this._token = setTimeout(() => {
			this._token = -1, e();
		}, t);
	}
	setIfNotSet(e, t) {
		if (this._isDisposed) throw new Xe("Calling 'setIfNotSet' on a disposed TimeoutTimer");
		this._token === -1 && (this._token = setTimeout(() => {
			this._token = -1, e();
		}, t));
	}
}, Mn = class {
	constructor() {
		this.disposable = void 0, this.isDisposed = !1;
	}
	cancel() {
		this.disposable?.dispose(), this.disposable = void 0;
	}
	cancelAndSet(e, t, n = globalThis) {
		if (this.isDisposed) throw new Xe("Calling 'cancelAndSet' on a disposed IntervalTimer");
		this.cancel();
		let r = n.setInterval(() => {
			e();
		}, t);
		this.disposable = D(() => {
			n.clearInterval(r), this.disposable = void 0;
		});
	}
	dispose() {
		this.cancel(), this.isDisposed = !0;
	}
};
(function() {
	typeof globalThis.requestIdleCallback != "function" || globalThis.cancelIdleCallback;
})();
var Nn;
((e) => {
	async function t(e) {
		let t, n = await Promise.all(e.map((e) => e.then((e) => e, (e) => {
			t ||= e;
		})));
		if (typeof t < "u") throw t;
		return n;
	}
	e.settled = t;
	function n(e) {
		return new Promise(async (t, n) => {
			try {
				await e(t, n);
			} catch (e) {
				n(e);
			}
		});
	}
	e.withAsyncBody = n;
})(Nn ||= {});
var Pn = class e {
	static fromArray(t) {
		return new e((e) => {
			e.emitMany(t);
		});
	}
	static fromPromise(t) {
		return new e(async (e) => {
			e.emitMany(await t);
		});
	}
	static fromPromises(t) {
		return new e(async (e) => {
			await Promise.all(t.map(async (t) => e.emitOne(await t)));
		});
	}
	static merge(t) {
		return new e(async (e) => {
			await Promise.all(t.map(async (t) => {
				for await (let n of t) e.emitOne(n);
			}));
		});
	}
	constructor(e, t) {
		this._state = 0, this._results = [], this._error = null, this._onReturn = t, this._onStateChanged = new A(), queueMicrotask(async () => {
			let t = {
				emitOne: (e) => this.emitOne(e),
				emitMany: (e) => this.emitMany(e),
				reject: (e) => this.reject(e)
			};
			try {
				await Promise.resolve(e(t)), this.resolve();
			} catch (e) {
				this.reject(e);
			} finally {
				t.emitOne = void 0, t.emitMany = void 0, t.reject = void 0;
			}
		});
	}
	[Symbol.asyncIterator]() {
		let e = 0;
		return {
			next: async () => {
				do {
					if (this._state === 2) throw this._error;
					if (e < this._results.length) return {
						done: !1,
						value: this._results[e++]
					};
					if (this._state === 1) return {
						done: !0,
						value: void 0
					};
					await _t.toPromise(this._onStateChanged.event);
				} while (1);
			},
			return: async () => (this._onReturn?.(), {
				done: !0,
				value: void 0
			})
		};
	}
	static map(t, n) {
		return new e(async (e) => {
			for await (let r of t) e.emitOne(n(r));
		});
	}
	map(t) {
		return e.map(this, t);
	}
	static filter(t, n) {
		return new e(async (e) => {
			for await (let r of t) n(r) && e.emitOne(r);
		});
	}
	filter(t) {
		return e.filter(this, t);
	}
	static coalesce(t) {
		return e.filter(t, (e) => !!e);
	}
	coalesce() {
		return e.coalesce(this);
	}
	static async toPromise(e) {
		let t = [];
		for await (let n of e) t.push(n);
		return t;
	}
	toPromise() {
		return e.toPromise(this);
	}
	emitOne(e) {
		this._state === 0 && (this._results.push(e), this._onStateChanged.fire());
	}
	emitMany(e) {
		this._state === 0 && (this._results = this._results.concat(e), this._onStateChanged.fire());
	}
	resolve() {
		this._state === 0 && (this._state = 1, this._onStateChanged.fire());
	}
	reject(e) {
		this._state === 0 && (this._state = 2, this._error = e, this._onStateChanged.fire());
	}
};
Pn.EMPTY = Pn.fromArray([]);
function Fn(e) {
	return In(e, 0);
}
function In(e, t) {
	switch (typeof e) {
		case "object": return e === null ? Ln(349, t) : Array.isArray(e) ? Bn(e, t) : Vn(e, t);
		case "string": return zn(e, t);
		case "boolean": return Rn(e, t);
		case "number": return Ln(e, t);
		case "undefined": return Ln(937, t);
		default: return Ln(617, t);
	}
}
function Ln(e, t) {
	return (t << 5) - t + e | 0;
}
function Rn(e, t) {
	return Ln(e ? 433 : 863, t);
}
function zn(e, t) {
	t = Ln(149417, t);
	for (let n = 0, r = e.length; n < r; n++) t = Ln(e.charCodeAt(n), t);
	return t;
}
function Bn(e, t) {
	return t = Ln(104579, t), e.reduce((e, t) => In(t, e), t);
}
function Vn(e, t) {
	return t = Ln(181387, t), Object.keys(e).sort().reduce((t, n) => (t = zn(n, t), In(e[n], t)), t);
}
var { registerWindow: Hn, getWindow: Un, getDocument: Wn, getWindows: Gn, getWindowsCount: Kn, getWindowId: qn, getWindowById: Jn, hasWindow: Yn, onDidRegisterWindow: Xn, onWillUnregisterWindow: Zn, onDidUnregisterWindow: Qn } = function() {
	let e = /* @__PURE__ */ new Map(), t = {
		window: ft,
		disposables: new ut()
	};
	e.set(ft.vscodeWindowId, t);
	let n = new A(), r = new A(), i = new A();
	function a(n, r) {
		return (typeof n == "number" ? e.get(n) : void 0) ?? (r ? t : void 0);
	}
	return {
		onDidRegisterWindow: n.event,
		onWillUnregisterWindow: i.event,
		onDidUnregisterWindow: r.event,
		registerWindow(t) {
			if (e.has(t.vscodeWindowId)) return O.None;
			let a = new ut(), o = {
				window: t,
				disposables: a.add(new ut())
			};
			return e.set(t.vscodeWindowId, o), a.add(D(() => {
				e.delete(t.vscodeWindowId), r.fire(t);
			})), a.add(j(t, cr.BEFORE_UNLOAD, () => {
				i.fire(t);
			})), n.fire(o), a;
		},
		getWindows() {
			return e.values();
		},
		getWindowsCount() {
			return e.size;
		},
		getWindowId(e) {
			return e.vscodeWindowId;
		},
		hasWindow(t) {
			return e.has(t);
		},
		getWindowById: a,
		getWindow(e) {
			let t = e;
			if (t?.ownerDocument?.defaultView) return t.ownerDocument.defaultView.window;
			let n = e;
			return n?.view ? n.view.window : ft;
		},
		getDocument(e) {
			return Un(e).document;
		}
	};
}(), $n = class {
	constructor(e, t, n, r) {
		this._node = e, this._type = t, this._handler = n, this._options = r || !1, this._node.addEventListener(this._type, this._handler, this._options);
	}
	dispose() {
		this._handler &&= (this._node.removeEventListener(this._type, this._handler, this._options), this._node = null, null);
	}
};
function j(e, t, n, r) {
	return new $n(e, t, n, r);
}
function er(e, t) {
	return function(n) {
		return t(new En(e, n));
	};
}
function tr(e) {
	return function(t) {
		return e(new Sn(t));
	};
}
var nr = function(e, t, n, r) {
	let i = n;
	return t === "click" || t === "mousedown" || t === "contextmenu" ? i = er(Un(e), n) : (t === "keydown" || t === "keypress" || t === "keyup") && (i = tr(n)), j(e, t, i, r);
}, rr, ir = class extends Mn {
	constructor(e) {
		super(), this.defaultTarget = e && Un(e);
	}
	cancelAndSet(e, t, n) {
		return super.cancelAndSet(e, t, n ?? this.defaultTarget);
	}
}, ar = class {
	constructor(e, t = 0) {
		this._runner = e, this.priority = t, this._canceled = !1;
	}
	dispose() {
		this._canceled = !0;
	}
	execute() {
		if (!this._canceled) try {
			this._runner();
		} catch (e) {
			We(e);
		}
	}
	static sort(e, t) {
		return t.priority - e.priority;
	}
};
(function() {
	let e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = (i) => {
		n.set(i, !1);
		let a = e.get(i) ?? [];
		for (t.set(i, a), e.set(i, []), r.set(i, !0); a.length > 0;) a.sort(ar.sort), a.shift().execute();
		r.set(i, !1);
	};
	rr = (t, r, a = 0) => {
		let o = qn(t), s = new ar(r, a), c = e.get(o);
		return c || (c = [], e.set(o, c)), c.push(s), n.get(o) || (n.set(o, !0), t.requestAnimationFrame(() => i(o))), s;
	};
})();
var or = class e {
	constructor(e, t) {
		this.width = e, this.height = t;
	}
	with(t = this.width, n = this.height) {
		return t !== this.width || n !== this.height ? new e(t, n) : this;
	}
	static is(e) {
		return typeof e == "object" && typeof e.height == "number" && typeof e.width == "number";
	}
	static lift(t) {
		return t instanceof e ? t : new e(t.width, t.height);
	}
	static equals(e, t) {
		return e === t ? !0 : !e || !t ? !1 : e.width === t.width && e.height === t.height;
	}
};
or.None = new or(0, 0);
function sr(e) {
	let t = e.getBoundingClientRect(), n = Un(e);
	return {
		left: t.left + n.scrollX,
		top: t.top + n.scrollY,
		width: t.width,
		height: t.height
	};
}
new class {
	constructor() {
		this.mutationObservers = /* @__PURE__ */ new Map();
	}
	observe(e, t, n) {
		let r = this.mutationObservers.get(e);
		r || (r = /* @__PURE__ */ new Map(), this.mutationObservers.set(e, r));
		let i = Fn(n), a = r.get(i);
		if (a) a.users += 1;
		else {
			let o = new A(), s = new MutationObserver((e) => o.fire(e));
			s.observe(e, n);
			let c = a = {
				users: 1,
				observer: s,
				onDidMutate: o.event
			};
			t.add(D(() => {
				--c.users, c.users === 0 && (o.dispose(), s.disconnect(), r?.delete(i), r?.size === 0 && this.mutationObservers.delete(e));
			})), r.set(i, a);
		}
		return a.onDidMutate;
	}
}();
var cr = {
	CLICK: "click",
	AUXCLICK: "auxclick",
	DBLCLICK: "dblclick",
	MOUSE_UP: "mouseup",
	MOUSE_DOWN: "mousedown",
	MOUSE_OVER: "mouseover",
	MOUSE_MOVE: "mousemove",
	MOUSE_OUT: "mouseout",
	MOUSE_ENTER: "mouseenter",
	MOUSE_LEAVE: "mouseleave",
	MOUSE_WHEEL: "wheel",
	POINTER_UP: "pointerup",
	POINTER_DOWN: "pointerdown",
	POINTER_MOVE: "pointermove",
	POINTER_LEAVE: "pointerleave",
	CONTEXT_MENU: "contextmenu",
	WHEEL: "wheel",
	KEY_DOWN: "keydown",
	KEY_PRESS: "keypress",
	KEY_UP: "keyup",
	LOAD: "load",
	BEFORE_UNLOAD: "beforeunload",
	UNLOAD: "unload",
	PAGE_SHOW: "pageshow",
	PAGE_HIDE: "pagehide",
	PASTE: "paste",
	ABORT: "abort",
	ERROR: "error",
	RESIZE: "resize",
	SCROLL: "scroll",
	FULLSCREEN_CHANGE: "fullscreenchange",
	WK_FULLSCREEN_CHANGE: "webkitfullscreenchange",
	SELECT: "select",
	CHANGE: "change",
	SUBMIT: "submit",
	RESET: "reset",
	FOCUS: "focus",
	FOCUS_IN: "focusin",
	FOCUS_OUT: "focusout",
	BLUR: "blur",
	INPUT: "input",
	STORAGE: "storage",
	DRAG_START: "dragstart",
	DRAG: "drag",
	DRAG_ENTER: "dragenter",
	DRAG_LEAVE: "dragleave",
	DRAG_OVER: "dragover",
	DROP: "drop",
	DRAG_END: "dragend",
	ANIMATION_START: It ? "webkitAnimationStart" : "animationstart",
	ANIMATION_END: It ? "webkitAnimationEnd" : "animationend",
	ANIMATION_ITERATION: It ? "webkitAnimationIteration" : "animationiteration"
}, lr = class {
	constructor(e) {
		this.domNode = e, this._maxWidth = "", this._width = "", this._height = "", this._top = "", this._left = "", this._bottom = "", this._right = "", this._paddingTop = "", this._paddingLeft = "", this._paddingBottom = "", this._paddingRight = "", this._fontFamily = "", this._fontWeight = "", this._fontSize = "", this._fontStyle = "", this._fontFeatureSettings = "", this._fontVariationSettings = "", this._textDecoration = "", this._lineHeight = "", this._letterSpacing = "", this._className = "", this._display = "", this._position = "", this._visibility = "", this._color = "", this._backgroundColor = "", this._layerHint = !1, this._contain = "none", this._boxShadow = "";
	}
	setMaxWidth(e) {
		let t = ur(e);
		this._maxWidth !== t && (this._maxWidth = t, this.domNode.style.maxWidth = this._maxWidth);
	}
	setWidth(e) {
		let t = ur(e);
		this._width !== t && (this._width = t, this.domNode.style.width = this._width);
	}
	setHeight(e) {
		let t = ur(e);
		this._height !== t && (this._height = t, this.domNode.style.height = this._height);
	}
	setTop(e) {
		let t = ur(e);
		this._top !== t && (this._top = t, this.domNode.style.top = this._top);
	}
	setLeft(e) {
		let t = ur(e);
		this._left !== t && (this._left = t, this.domNode.style.left = this._left);
	}
	setBottom(e) {
		let t = ur(e);
		this._bottom !== t && (this._bottom = t, this.domNode.style.bottom = this._bottom);
	}
	setRight(e) {
		let t = ur(e);
		this._right !== t && (this._right = t, this.domNode.style.right = this._right);
	}
	setPaddingTop(e) {
		let t = ur(e);
		this._paddingTop !== t && (this._paddingTop = t, this.domNode.style.paddingTop = this._paddingTop);
	}
	setPaddingLeft(e) {
		let t = ur(e);
		this._paddingLeft !== t && (this._paddingLeft = t, this.domNode.style.paddingLeft = this._paddingLeft);
	}
	setPaddingBottom(e) {
		let t = ur(e);
		this._paddingBottom !== t && (this._paddingBottom = t, this.domNode.style.paddingBottom = this._paddingBottom);
	}
	setPaddingRight(e) {
		let t = ur(e);
		this._paddingRight !== t && (this._paddingRight = t, this.domNode.style.paddingRight = this._paddingRight);
	}
	setFontFamily(e) {
		this._fontFamily !== e && (this._fontFamily = e, this.domNode.style.fontFamily = this._fontFamily);
	}
	setFontWeight(e) {
		this._fontWeight !== e && (this._fontWeight = e, this.domNode.style.fontWeight = this._fontWeight);
	}
	setFontSize(e) {
		let t = ur(e);
		this._fontSize !== t && (this._fontSize = t, this.domNode.style.fontSize = this._fontSize);
	}
	setFontStyle(e) {
		this._fontStyle !== e && (this._fontStyle = e, this.domNode.style.fontStyle = this._fontStyle);
	}
	setFontFeatureSettings(e) {
		this._fontFeatureSettings !== e && (this._fontFeatureSettings = e, this.domNode.style.fontFeatureSettings = this._fontFeatureSettings);
	}
	setFontVariationSettings(e) {
		this._fontVariationSettings !== e && (this._fontVariationSettings = e, this.domNode.style.fontVariationSettings = this._fontVariationSettings);
	}
	setTextDecoration(e) {
		this._textDecoration !== e && (this._textDecoration = e, this.domNode.style.textDecoration = this._textDecoration);
	}
	setLineHeight(e) {
		let t = ur(e);
		this._lineHeight !== t && (this._lineHeight = t, this.domNode.style.lineHeight = this._lineHeight);
	}
	setLetterSpacing(e) {
		let t = ur(e);
		this._letterSpacing !== t && (this._letterSpacing = t, this.domNode.style.letterSpacing = this._letterSpacing);
	}
	setClassName(e) {
		this._className !== e && (this._className = e, this.domNode.className = this._className);
	}
	toggleClassName(e, t) {
		this.domNode.classList.toggle(e, t), this._className = this.domNode.className;
	}
	setDisplay(e) {
		this._display !== e && (this._display = e, this.domNode.style.display = this._display);
	}
	setPosition(e) {
		this._position !== e && (this._position = e, this.domNode.style.position = this._position);
	}
	setVisibility(e) {
		this._visibility !== e && (this._visibility = e, this.domNode.style.visibility = this._visibility);
	}
	setColor(e) {
		this._color !== e && (this._color = e, this.domNode.style.color = this._color);
	}
	setBackgroundColor(e) {
		this._backgroundColor !== e && (this._backgroundColor = e, this.domNode.style.backgroundColor = this._backgroundColor);
	}
	setLayerHinting(e) {
		this._layerHint !== e && (this._layerHint = e, this.domNode.style.transform = this._layerHint ? "translate3d(0px, 0px, 0px)" : "");
	}
	setBoxShadow(e) {
		this._boxShadow !== e && (this._boxShadow = e, this.domNode.style.boxShadow = e);
	}
	setContain(e) {
		this._contain !== e && (this._contain = e, this.domNode.style.contain = this._contain);
	}
	setAttribute(e, t) {
		this.domNode.setAttribute(e, t);
	}
	removeAttribute(e) {
		this.domNode.removeAttribute(e);
	}
	appendChild(e) {
		this.domNode.appendChild(e.domNode);
	}
	removeChild(e) {
		this.domNode.removeChild(e.domNode);
	}
};
function ur(e) {
	return typeof e == "number" ? `${e}px` : e;
}
function dr(e) {
	return new lr(e);
}
var fr = class {
	constructor() {
		this._hooks = new ut(), this._pointerMoveCallback = null, this._onStopCallback = null;
	}
	dispose() {
		this.stopMonitoring(!1), this._hooks.dispose();
	}
	stopMonitoring(e, t) {
		if (!this.isMonitoring()) return;
		this._hooks.clear(), this._pointerMoveCallback = null;
		let n = this._onStopCallback;
		this._onStopCallback = null, e && n && n(t);
	}
	isMonitoring() {
		return !!this._pointerMoveCallback;
	}
	startMonitoring(e, t, n, r, i) {
		this.isMonitoring() && this.stopMonitoring(!1), this._pointerMoveCallback = r, this._onStopCallback = i;
		let a = e;
		try {
			e.setPointerCapture(t), this._hooks.add(D(() => {
				try {
					e.releasePointerCapture(t);
				} catch {}
			}));
		} catch {
			a = Un(e);
		}
		this._hooks.add(j(a, cr.POINTER_MOVE, (e) => {
			e.buttons === n ? (e.preventDefault(), this._pointerMoveCallback(e)) : this.stopMonitoring(!0);
		})), this._hooks.add(j(a, cr.POINTER_UP, (e) => this.stopMonitoring(!0)));
	}
};
function pr(e, t, n) {
	let r = null, i = null;
	if (typeof n.value == "function" ? (r = "value", i = n.value, i.length !== 0 && console.warn("Memoize should only be used in functions with zero parameters")) : typeof n.get == "function" && (r = "get", i = n.get), !i) throw Error("not supported");
	let a = `$memoize$${t}`;
	n[r] = function(...e) {
		return this.hasOwnProperty(a) || Object.defineProperty(this, a, {
			configurable: !1,
			enumerable: !1,
			writable: !1,
			value: i.apply(this, e)
		}), this[a];
	};
}
var mr;
((e) => (e.Tap = "-xterm-gesturetap", e.Change = "-xterm-gesturechange", e.Start = "-xterm-gesturestart", e.End = "-xterm-gesturesend", e.Contextmenu = "-xterm-gesturecontextmenu"))(mr ||= {});
var hr = class e extends O {
	constructor() {
		super(), this.dispatched = !1, this.targets = new mt(), this.ignoreTargets = new mt(), this.activeTouches = {}, this.handle = null, this._lastSetTapCountTime = 0, this._register(_t.runAndSubscribe(Xn, ({ window: e, disposables: t }) => {
			t.add(j(e.document, "touchstart", (e) => this.onTouchStart(e), { passive: !1 })), t.add(j(e.document, "touchend", (t) => this.onTouchEnd(e, t))), t.add(j(e.document, "touchmove", (e) => this.onTouchMove(e), { passive: !1 }));
		}, {
			window: ft,
			disposables: this._store
		}));
	}
	static addTarget(t) {
		return e.isTouchDevice() ? (e.INSTANCE ||= ot(new e()), D(e.INSTANCE.targets.push(t))) : O.None;
	}
	static ignoreTarget(t) {
		return e.isTouchDevice() ? (e.INSTANCE ||= ot(new e()), D(e.INSTANCE.ignoreTargets.push(t))) : O.None;
	}
	static isTouchDevice() {
		return "ontouchstart" in ft || navigator.maxTouchPoints > 0;
	}
	dispose() {
		this.handle &&= (this.handle.dispose(), null), super.dispose();
	}
	onTouchStart(e) {
		let t = Date.now();
		this.handle &&= (this.handle.dispose(), null);
		for (let n = 0, r = e.targetTouches.length; n < r; n++) {
			let r = e.targetTouches.item(n);
			this.activeTouches[r.identifier] = {
				id: r.identifier,
				initialTarget: r.target,
				initialTimeStamp: t,
				initialPageX: r.pageX,
				initialPageY: r.pageY,
				rollingTimestamps: [t],
				rollingPageX: [r.pageX],
				rollingPageY: [r.pageY]
			};
			let i = this.newGestureEvent(mr.Start, r.target);
			i.pageX = r.pageX, i.pageY = r.pageY, this.dispatchEvent(i);
		}
		this.dispatched &&= (e.preventDefault(), e.stopPropagation(), !1);
	}
	onTouchEnd(t, n) {
		let r = Date.now(), i = Object.keys(this.activeTouches).length;
		for (let a = 0, o = n.changedTouches.length; a < o; a++) {
			let o = n.changedTouches.item(a);
			if (!this.activeTouches.hasOwnProperty(String(o.identifier))) {
				console.warn("move of an UNKNOWN touch", o);
				continue;
			}
			let s = this.activeTouches[o.identifier], c = Date.now() - s.initialTimeStamp;
			if (c < e.HOLD_DELAY && Math.abs(s.initialPageX - Ze(s.rollingPageX)) < 30 && Math.abs(s.initialPageY - Ze(s.rollingPageY)) < 30) {
				let e = this.newGestureEvent(mr.Tap, s.initialTarget);
				e.pageX = Ze(s.rollingPageX), e.pageY = Ze(s.rollingPageY), this.dispatchEvent(e);
			} else if (c >= e.HOLD_DELAY && Math.abs(s.initialPageX - Ze(s.rollingPageX)) < 30 && Math.abs(s.initialPageY - Ze(s.rollingPageY)) < 30) {
				let e = this.newGestureEvent(mr.Contextmenu, s.initialTarget);
				e.pageX = Ze(s.rollingPageX), e.pageY = Ze(s.rollingPageY), this.dispatchEvent(e);
			} else if (i === 1) {
				let e = Ze(s.rollingPageX), n = Ze(s.rollingPageY), i = Ze(s.rollingTimestamps) - s.rollingTimestamps[0], a = e - s.rollingPageX[0], o = n - s.rollingPageY[0], c = [...this.targets].filter((e) => s.initialTarget instanceof Node && e.contains(s.initialTarget));
				this.inertia(t, c, r, Math.abs(a) / i, a > 0 ? 1 : -1, e, Math.abs(o) / i, o > 0 ? 1 : -1, n);
			}
			this.dispatchEvent(this.newGestureEvent(mr.End, s.initialTarget)), delete this.activeTouches[o.identifier];
		}
		this.dispatched &&= (n.preventDefault(), n.stopPropagation(), !1);
	}
	newGestureEvent(e, t) {
		let n = document.createEvent("CustomEvent");
		return n.initEvent(e, !1, !0), n.initialTarget = t, n.tapCount = 0, n;
	}
	dispatchEvent(t) {
		if (t.type === mr.Tap) {
			let n = (/* @__PURE__ */ new Date()).getTime(), r = 0;
			r = n - this._lastSetTapCountTime > e.CLEAR_TAP_COUNT_TIME ? 1 : 2, this._lastSetTapCountTime = n, t.tapCount = r;
		} else (t.type === mr.Change || t.type === mr.Contextmenu) && (this._lastSetTapCountTime = 0);
		if (t.initialTarget instanceof Node) {
			for (let e of this.ignoreTargets) if (e.contains(t.initialTarget)) return;
			let e = [];
			for (let n of this.targets) if (n.contains(t.initialTarget)) {
				let r = 0, i = t.initialTarget;
				for (; i && i !== n;) r++, i = i.parentElement;
				e.push([r, n]);
			}
			e.sort((e, t) => e[0] - t[0]);
			for (let [n, r] of e) r.dispatchEvent(t), this.dispatched = !0;
		}
	}
	inertia(t, n, r, i, a, o, s, c, l) {
		this.handle = rr(t, () => {
			let u = Date.now(), d = u - r, f = 0, p = 0, m = !0;
			i += e.SCROLL_FRICTION * d, s += e.SCROLL_FRICTION * d, i > 0 && (m = !1, f = a * i * d), s > 0 && (m = !1, p = c * s * d);
			let h = this.newGestureEvent(mr.Change);
			h.translationX = f, h.translationY = p, n.forEach((e) => e.dispatchEvent(h)), m || this.inertia(t, n, u, i, a, o + f, s, c, l + p);
		});
	}
	onTouchMove(e) {
		let t = Date.now();
		for (let n = 0, r = e.changedTouches.length; n < r; n++) {
			let r = e.changedTouches.item(n);
			if (!this.activeTouches.hasOwnProperty(String(r.identifier))) {
				console.warn("end of an UNKNOWN touch", r);
				continue;
			}
			let i = this.activeTouches[r.identifier], a = this.newGestureEvent(mr.Change, i.initialTarget);
			a.translationX = r.pageX - Ze(i.rollingPageX), a.translationY = r.pageY - Ze(i.rollingPageY), a.pageX = r.pageX, a.pageY = r.pageY, this.dispatchEvent(a), i.rollingPageX.length > 3 && (i.rollingPageX.shift(), i.rollingPageY.shift(), i.rollingTimestamps.shift()), i.rollingPageX.push(r.pageX), i.rollingPageY.push(r.pageY), i.rollingTimestamps.push(t);
		}
		this.dispatched &&= (e.preventDefault(), e.stopPropagation(), !1);
	}
};
hr.SCROLL_FRICTION = -.005, hr.HOLD_DELAY = 700, hr.CLEAR_TAP_COUNT_TIME = 400, x([pr], hr, "isTouchDevice", 1);
var gr = hr, _r = class extends O {
	onclick(e, t) {
		this._register(j(e, cr.CLICK, (n) => t(new En(Un(e), n))));
	}
	onmousedown(e, t) {
		this._register(j(e, cr.MOUSE_DOWN, (n) => t(new En(Un(e), n))));
	}
	onmouseover(e, t) {
		this._register(j(e, cr.MOUSE_OVER, (n) => t(new En(Un(e), n))));
	}
	onmouseleave(e, t) {
		this._register(j(e, cr.MOUSE_LEAVE, (n) => t(new En(Un(e), n))));
	}
	onkeydown(e, t) {
		this._register(j(e, cr.KEY_DOWN, (e) => t(new Sn(e))));
	}
	onkeyup(e, t) {
		this._register(j(e, cr.KEY_UP, (e) => t(new Sn(e))));
	}
	oninput(e, t) {
		this._register(j(e, cr.INPUT, t));
	}
	onblur(e, t) {
		this._register(j(e, cr.BLUR, t));
	}
	onfocus(e, t) {
		this._register(j(e, cr.FOCUS, t));
	}
	onchange(e, t) {
		this._register(j(e, cr.CHANGE, t));
	}
	ignoreGesture(e) {
		return gr.ignoreTarget(e);
	}
}, vr = 11, yr = class extends _r {
	constructor(e) {
		super(), this._onActivate = e.onActivate, this.bgDomNode = document.createElement("div"), this.bgDomNode.className = "arrow-background", this.bgDomNode.style.position = "absolute", this.bgDomNode.style.width = e.bgWidth + "px", this.bgDomNode.style.height = e.bgHeight + "px", typeof e.top < "u" && (this.bgDomNode.style.top = "0px"), typeof e.left < "u" && (this.bgDomNode.style.left = "0px"), typeof e.bottom < "u" && (this.bgDomNode.style.bottom = "0px"), typeof e.right < "u" && (this.bgDomNode.style.right = "0px"), this.domNode = document.createElement("div"), this.domNode.className = e.className, this.domNode.style.position = "absolute", this.domNode.style.width = vr + "px", this.domNode.style.height = vr + "px", typeof e.top < "u" && (this.domNode.style.top = e.top + "px"), typeof e.left < "u" && (this.domNode.style.left = e.left + "px"), typeof e.bottom < "u" && (this.domNode.style.bottom = e.bottom + "px"), typeof e.right < "u" && (this.domNode.style.right = e.right + "px"), this._pointerMoveMonitor = this._register(new fr()), this._register(nr(this.bgDomNode, cr.POINTER_DOWN, (e) => this._arrowPointerDown(e))), this._register(nr(this.domNode, cr.POINTER_DOWN, (e) => this._arrowPointerDown(e))), this._pointerdownRepeatTimer = this._register(new ir()), this._pointerdownScheduleRepeatTimer = this._register(new jn());
	}
	_arrowPointerDown(e) {
		e.target && e.target instanceof Element && (this._onActivate(), this._pointerdownRepeatTimer.cancel(), this._pointerdownScheduleRepeatTimer.cancelAndSet(() => {
			this._pointerdownRepeatTimer.cancelAndSet(() => this._onActivate(), 1e3 / 24, Un(e));
		}, 200), this._pointerMoveMonitor.startMonitoring(e.target, e.pointerId, e.buttons, (e) => {}, () => {
			this._pointerdownRepeatTimer.cancel(), this._pointerdownScheduleRepeatTimer.cancel();
		}), e.preventDefault());
	}
}, br = class e {
	constructor(e, t, n, r, i, a, o) {
		this._forceIntegerValues = e, this._scrollStateBrand = void 0, this._forceIntegerValues && (t |= 0, n |= 0, r |= 0, i |= 0, a |= 0, o |= 0), this.rawScrollLeft = r, this.rawScrollTop = o, t < 0 && (t = 0), r + t > n && (r = n - t), r < 0 && (r = 0), i < 0 && (i = 0), o + i > a && (o = a - i), o < 0 && (o = 0), this.width = t, this.scrollWidth = n, this.scrollLeft = r, this.height = i, this.scrollHeight = a, this.scrollTop = o;
	}
	equals(e) {
		return this.rawScrollLeft === e.rawScrollLeft && this.rawScrollTop === e.rawScrollTop && this.width === e.width && this.scrollWidth === e.scrollWidth && this.scrollLeft === e.scrollLeft && this.height === e.height && this.scrollHeight === e.scrollHeight && this.scrollTop === e.scrollTop;
	}
	withScrollDimensions(t, n) {
		return new e(this._forceIntegerValues, typeof t.width < "u" ? t.width : this.width, typeof t.scrollWidth < "u" ? t.scrollWidth : this.scrollWidth, n ? this.rawScrollLeft : this.scrollLeft, typeof t.height < "u" ? t.height : this.height, typeof t.scrollHeight < "u" ? t.scrollHeight : this.scrollHeight, n ? this.rawScrollTop : this.scrollTop);
	}
	withScrollPosition(t) {
		return new e(this._forceIntegerValues, this.width, this.scrollWidth, typeof t.scrollLeft < "u" ? t.scrollLeft : this.rawScrollLeft, this.height, this.scrollHeight, typeof t.scrollTop < "u" ? t.scrollTop : this.rawScrollTop);
	}
	createScrollEvent(e, t) {
		let n = this.width !== e.width, r = this.scrollWidth !== e.scrollWidth, i = this.scrollLeft !== e.scrollLeft, a = this.height !== e.height, o = this.scrollHeight !== e.scrollHeight, s = this.scrollTop !== e.scrollTop;
		return {
			inSmoothScrolling: t,
			oldWidth: e.width,
			oldScrollWidth: e.scrollWidth,
			oldScrollLeft: e.scrollLeft,
			width: this.width,
			scrollWidth: this.scrollWidth,
			scrollLeft: this.scrollLeft,
			oldHeight: e.height,
			oldScrollHeight: e.scrollHeight,
			oldScrollTop: e.scrollTop,
			height: this.height,
			scrollHeight: this.scrollHeight,
			scrollTop: this.scrollTop,
			widthChanged: n,
			scrollWidthChanged: r,
			scrollLeftChanged: i,
			heightChanged: a,
			scrollHeightChanged: o,
			scrollTopChanged: s
		};
	}
}, xr = class extends O {
	constructor(e) {
		super(), this._scrollableBrand = void 0, this._onScroll = this._register(new A()), this.onScroll = this._onScroll.event, this._smoothScrollDuration = e.smoothScrollDuration, this._scheduleAtNextAnimationFrame = e.scheduleAtNextAnimationFrame, this._state = new br(e.forceIntegerValues, 0, 0, 0, 0, 0, 0), this._smoothScrolling = null;
	}
	dispose() {
		this._smoothScrolling &&= (this._smoothScrolling.dispose(), null), super.dispose();
	}
	setSmoothScrollDuration(e) {
		this._smoothScrollDuration = e;
	}
	validateScrollPosition(e) {
		return this._state.withScrollPosition(e);
	}
	getScrollDimensions() {
		return this._state;
	}
	setScrollDimensions(e, t) {
		let n = this._state.withScrollDimensions(e, t);
		this._setState(n, !!this._smoothScrolling), this._smoothScrolling?.acceptScrollDimensions(this._state);
	}
	getFutureScrollPosition() {
		return this._smoothScrolling ? this._smoothScrolling.to : this._state;
	}
	getCurrentScrollPosition() {
		return this._state;
	}
	setScrollPositionNow(e) {
		let t = this._state.withScrollPosition(e);
		this._smoothScrolling &&= (this._smoothScrolling.dispose(), null), this._setState(t, !1);
	}
	setScrollPositionSmooth(e, t) {
		if (this._smoothScrollDuration === 0) return this.setScrollPositionNow(e);
		if (this._smoothScrolling) {
			e = {
				scrollLeft: typeof e.scrollLeft > "u" ? this._smoothScrolling.to.scrollLeft : e.scrollLeft,
				scrollTop: typeof e.scrollTop > "u" ? this._smoothScrolling.to.scrollTop : e.scrollTop
			};
			let n = this._state.withScrollPosition(e);
			if (this._smoothScrolling.to.scrollLeft === n.scrollLeft && this._smoothScrolling.to.scrollTop === n.scrollTop) return;
			let r;
			r = t ? new Tr(this._smoothScrolling.from, n, this._smoothScrolling.startTime, this._smoothScrolling.duration) : this._smoothScrolling.combine(this._state, n, this._smoothScrollDuration), this._smoothScrolling.dispose(), this._smoothScrolling = r;
		} else {
			let t = this._state.withScrollPosition(e);
			this._smoothScrolling = Tr.start(this._state, t, this._smoothScrollDuration);
		}
		this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame(() => {
			this._smoothScrolling && (this._smoothScrolling.animationFrameDisposable = null, this._performSmoothScrolling());
		});
	}
	hasPendingScrollAnimation() {
		return !!this._smoothScrolling;
	}
	_performSmoothScrolling() {
		if (!this._smoothScrolling) return;
		let e = this._smoothScrolling.tick(), t = this._state.withScrollPosition(e);
		if (this._setState(t, !0), this._smoothScrolling) {
			if (e.isDone) {
				this._smoothScrolling.dispose(), this._smoothScrolling = null;
				return;
			}
			this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame(() => {
				this._smoothScrolling && (this._smoothScrolling.animationFrameDisposable = null, this._performSmoothScrolling());
			});
		}
	}
	_setState(e, t) {
		let n = this._state;
		n.equals(e) || (this._state = e, this._onScroll.fire(this._state.createScrollEvent(n, t)));
	}
}, Sr = class {
	constructor(e, t, n) {
		this.scrollLeft = e, this.scrollTop = t, this.isDone = n;
	}
};
function Cr(e, t) {
	let n = t - e;
	return function(t) {
		return e + n * Dr(t);
	};
}
function wr(e, t, n) {
	return function(r) {
		return r < n ? e(r / n) : t((r - n) / (1 - n));
	};
}
var Tr = class e {
	constructor(e, t, n, r) {
		this.from = e, this.to = t, this.duration = r, this.startTime = n, this.animationFrameDisposable = null, this._initAnimations();
	}
	_initAnimations() {
		this.scrollLeft = this._initAnimation(this.from.scrollLeft, this.to.scrollLeft, this.to.width), this.scrollTop = this._initAnimation(this.from.scrollTop, this.to.scrollTop, this.to.height);
	}
	_initAnimation(e, t, n) {
		if (Math.abs(e - t) > 2.5 * n) {
			let r, i;
			return e < t ? (r = e + .75 * n, i = t - .75 * n) : (r = e - .75 * n, i = t + .75 * n), wr(Cr(e, r), Cr(i, t), .33);
		}
		return Cr(e, t);
	}
	dispose() {
		this.animationFrameDisposable !== null && (this.animationFrameDisposable.dispose(), this.animationFrameDisposable = null);
	}
	acceptScrollDimensions(e) {
		this.to = e.withScrollPosition(this.to), this._initAnimations();
	}
	tick() {
		return this._tick(Date.now());
	}
	_tick(e) {
		let t = (e - this.startTime) / this.duration;
		return t < 1 ? new Sr(this.scrollLeft(t), this.scrollTop(t), !1) : new Sr(this.to.scrollLeft, this.to.scrollTop, !0);
	}
	combine(t, n, r) {
		return e.start(t, n, r);
	}
	static start(t, n, r) {
		r += 10;
		let i = Date.now() - 10;
		return new e(t, n, i, r);
	}
};
function Er(e) {
	return e ** 3;
}
function Dr(e) {
	return 1 - Er(1 - e);
}
var Or = class extends O {
	constructor(e, t, n) {
		super(), this._visibility = e, this._visibleClassName = t, this._invisibleClassName = n, this._domNode = null, this._isVisible = !1, this._isNeeded = !1, this._rawShouldBeVisible = !1, this._shouldBeVisible = !1, this._revealTimer = this._register(new jn());
	}
	setVisibility(e) {
		this._visibility !== e && (this._visibility = e, this._updateShouldBeVisible());
	}
	setShouldBeVisible(e) {
		this._rawShouldBeVisible = e, this._updateShouldBeVisible();
	}
	_applyVisibilitySetting() {
		return this._visibility === 2 ? !1 : this._visibility === 3 || this._rawShouldBeVisible;
	}
	_updateShouldBeVisible() {
		let e = this._applyVisibilitySetting();
		this._shouldBeVisible !== e && (this._shouldBeVisible = e, this.ensureVisibility());
	}
	setIsNeeded(e) {
		this._isNeeded !== e && (this._isNeeded = e, this.ensureVisibility());
	}
	setDomNode(e) {
		this._domNode = e, this._domNode.setClassName(this._invisibleClassName), this.setShouldBeVisible(!1);
	}
	ensureVisibility() {
		this._isNeeded ? this._shouldBeVisible ? this._reveal() : this._hide(!0) : this._hide(!1);
	}
	_reveal() {
		this._isVisible || (this._isVisible = !0, this._revealTimer.setIfNotSet(() => {
			this._domNode?.setClassName(this._visibleClassName);
		}, 0));
	}
	_hide(e) {
		this._revealTimer.cancel(), this._isVisible && (this._isVisible = !1, this._domNode?.setClassName(this._invisibleClassName + (e ? " fade" : "")));
	}
}, kr = 140, Ar = class extends _r {
	constructor(e) {
		super(), this._lazyRender = e.lazyRender, this._host = e.host, this._scrollable = e.scrollable, this._scrollByPage = e.scrollByPage, this._scrollbarState = e.scrollbarState, this._visibilityController = this._register(new Or(e.visibility, "visible scrollbar " + e.extraScrollbarClassName, "invisible scrollbar " + e.extraScrollbarClassName)), this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._pointerMoveMonitor = this._register(new fr()), this._shouldRender = !0, this.domNode = dr(document.createElement("div")), this.domNode.setAttribute("role", "presentation"), this.domNode.setAttribute("aria-hidden", "true"), this._visibilityController.setDomNode(this.domNode), this.domNode.setPosition("absolute"), this._register(j(this.domNode.domNode, cr.POINTER_DOWN, (e) => this._domNodePointerDown(e)));
	}
	_createArrow(e) {
		let t = this._register(new yr(e));
		this.domNode.domNode.appendChild(t.bgDomNode), this.domNode.domNode.appendChild(t.domNode);
	}
	_createSlider(e, t, n, r) {
		this.slider = dr(document.createElement("div")), this.slider.setClassName("slider"), this.slider.setPosition("absolute"), this.slider.setTop(e), this.slider.setLeft(t), typeof n == "number" && this.slider.setWidth(n), typeof r == "number" && this.slider.setHeight(r), this.slider.setLayerHinting(!0), this.slider.setContain("strict"), this.domNode.domNode.appendChild(this.slider.domNode), this._register(j(this.slider.domNode, cr.POINTER_DOWN, (e) => {
			e.button === 0 && (e.preventDefault(), this._sliderPointerDown(e));
		})), this.onclick(this.slider.domNode, (e) => {
			e.leftButton && e.stopPropagation();
		});
	}
	_onElementSize(e) {
		return this._scrollbarState.setVisibleSize(e) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = !0, this._lazyRender || this.render()), this._shouldRender;
	}
	_onElementScrollSize(e) {
		return this._scrollbarState.setScrollSize(e) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = !0, this._lazyRender || this.render()), this._shouldRender;
	}
	_onElementScrollPosition(e) {
		return this._scrollbarState.setScrollPosition(e) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = !0, this._lazyRender || this.render()), this._shouldRender;
	}
	beginReveal() {
		this._visibilityController.setShouldBeVisible(!0);
	}
	beginHide() {
		this._visibilityController.setShouldBeVisible(!1);
	}
	render() {
		this._shouldRender && (this._shouldRender = !1, this._renderDomNode(this._scrollbarState.getRectangleLargeSize(), this._scrollbarState.getRectangleSmallSize()), this._updateSlider(this._scrollbarState.getSliderSize(), this._scrollbarState.getArrowSize() + this._scrollbarState.getSliderPosition()));
	}
	_domNodePointerDown(e) {
		e.target === this.domNode.domNode && this._onPointerDown(e);
	}
	delegatePointerDown(e) {
		let t = this.domNode.domNode.getClientRects()[0].top, n = t + this._scrollbarState.getSliderPosition(), r = t + this._scrollbarState.getSliderPosition() + this._scrollbarState.getSliderSize(), i = this._sliderPointerPosition(e);
		n <= i && i <= r ? e.button === 0 && (e.preventDefault(), this._sliderPointerDown(e)) : this._onPointerDown(e);
	}
	_onPointerDown(e) {
		let t, n;
		if (e.target === this.domNode.domNode && typeof e.offsetX == "number" && typeof e.offsetY == "number") t = e.offsetX, n = e.offsetY;
		else {
			let r = sr(this.domNode.domNode);
			t = e.pageX - r.left, n = e.pageY - r.top;
		}
		let r = this._pointerDownRelativePosition(t, n);
		this._setDesiredScrollPositionNow(this._scrollByPage ? this._scrollbarState.getDesiredScrollPositionFromOffsetPaged(r) : this._scrollbarState.getDesiredScrollPositionFromOffset(r)), e.button === 0 && (e.preventDefault(), this._sliderPointerDown(e));
	}
	_sliderPointerDown(e) {
		if (!e.target || !(e.target instanceof Element)) return;
		let t = this._sliderPointerPosition(e), n = this._sliderOrthogonalPointerPosition(e), r = this._scrollbarState.clone();
		this.slider.toggleClassName("active", !0), this._pointerMoveMonitor.startMonitoring(e.target, e.pointerId, e.buttons, (e) => {
			let i = this._sliderOrthogonalPointerPosition(e), a = Math.abs(i - n);
			if (Qt && a > kr) {
				this._setDesiredScrollPositionNow(r.getScrollPosition());
				return;
			}
			let o = this._sliderPointerPosition(e) - t;
			this._setDesiredScrollPositionNow(r.getDesiredScrollPositionFromDelta(o));
		}, () => {
			this.slider.toggleClassName("active", !1), this._host.onDragEnd();
		}), this._host.onDragStart();
	}
	_setDesiredScrollPositionNow(e) {
		let t = {};
		this.writeScrollPosition(t, e), this._scrollable.setScrollPositionNow(t);
	}
	updateScrollbarSize(e) {
		this._updateScrollbarSize(e), this._scrollbarState.setScrollbarSize(e), this._shouldRender = !0, this._lazyRender || this.render();
	}
	isNeeded() {
		return this._scrollbarState.isNeeded();
	}
}, jr = class e {
	constructor(e, t, n, r, i, a) {
		this._scrollbarSize = Math.round(t), this._oppositeScrollbarSize = Math.round(n), this._arrowSize = Math.round(e), this._visibleSize = r, this._scrollSize = i, this._scrollPosition = a, this._computedAvailableSize = 0, this._computedIsNeeded = !1, this._computedSliderSize = 0, this._computedSliderRatio = 0, this._computedSliderPosition = 0, this._refreshComputedValues();
	}
	clone() {
		return new e(this._arrowSize, this._scrollbarSize, this._oppositeScrollbarSize, this._visibleSize, this._scrollSize, this._scrollPosition);
	}
	setVisibleSize(e) {
		let t = Math.round(e);
		return this._visibleSize !== t && (this._visibleSize = t, this._refreshComputedValues(), !0);
	}
	setScrollSize(e) {
		let t = Math.round(e);
		return this._scrollSize !== t && (this._scrollSize = t, this._refreshComputedValues(), !0);
	}
	setScrollPosition(e) {
		let t = Math.round(e);
		return this._scrollPosition !== t && (this._scrollPosition = t, this._refreshComputedValues(), !0);
	}
	setScrollbarSize(e) {
		this._scrollbarSize = Math.round(e);
	}
	setOppositeScrollbarSize(e) {
		this._oppositeScrollbarSize = Math.round(e);
	}
	static _computeValues(e, t, n, r, i) {
		let a = Math.max(0, n - e), o = Math.max(0, a - 2 * t), s = r > 0 && r > n;
		if (!s) return {
			computedAvailableSize: Math.round(a),
			computedIsNeeded: s,
			computedSliderSize: Math.round(o),
			computedSliderRatio: 0,
			computedSliderPosition: 0
		};
		let c = Math.round(Math.max(20, Math.floor(n * o / r))), l = (o - c) / (r - n), u = i * l;
		return {
			computedAvailableSize: Math.round(a),
			computedIsNeeded: s,
			computedSliderSize: Math.round(c),
			computedSliderRatio: l,
			computedSliderPosition: Math.round(u)
		};
	}
	_refreshComputedValues() {
		let t = e._computeValues(this._oppositeScrollbarSize, this._arrowSize, this._visibleSize, this._scrollSize, this._scrollPosition);
		this._computedAvailableSize = t.computedAvailableSize, this._computedIsNeeded = t.computedIsNeeded, this._computedSliderSize = t.computedSliderSize, this._computedSliderRatio = t.computedSliderRatio, this._computedSliderPosition = t.computedSliderPosition;
	}
	getArrowSize() {
		return this._arrowSize;
	}
	getScrollPosition() {
		return this._scrollPosition;
	}
	getRectangleLargeSize() {
		return this._computedAvailableSize;
	}
	getRectangleSmallSize() {
		return this._scrollbarSize;
	}
	isNeeded() {
		return this._computedIsNeeded;
	}
	getSliderSize() {
		return this._computedSliderSize;
	}
	getSliderPosition() {
		return this._computedSliderPosition;
	}
	getDesiredScrollPositionFromOffset(e) {
		if (!this._computedIsNeeded) return 0;
		let t = e - this._arrowSize - this._computedSliderSize / 2;
		return Math.round(t / this._computedSliderRatio);
	}
	getDesiredScrollPositionFromOffsetPaged(e) {
		if (!this._computedIsNeeded) return 0;
		let t = e - this._arrowSize, n = this._scrollPosition;
		return t < this._computedSliderPosition ? n -= this._visibleSize : n += this._visibleSize, n;
	}
	getDesiredScrollPositionFromDelta(e) {
		if (!this._computedIsNeeded) return 0;
		let t = this._computedSliderPosition + e;
		return Math.round(t / this._computedSliderRatio);
	}
}, Mr = class extends Ar {
	constructor(e, t, n) {
		let r = e.getScrollDimensions(), i = e.getCurrentScrollPosition();
		if (super({
			lazyRender: t.lazyRender,
			host: n,
			scrollbarState: new jr(t.horizontalHasArrows ? t.arrowSize : 0, t.horizontal === 2 ? 0 : t.horizontalScrollbarSize, t.vertical === 2 ? 0 : t.verticalScrollbarSize, r.width, r.scrollWidth, i.scrollLeft),
			visibility: t.horizontal,
			extraScrollbarClassName: "horizontal",
			scrollable: e,
			scrollByPage: t.scrollByPage
		}), t.horizontalHasArrows) throw Error("horizontalHasArrows is not supported in xterm.js");
		this._createSlider(Math.floor((t.horizontalScrollbarSize - t.horizontalSliderSize) / 2), 0, void 0, t.horizontalSliderSize);
	}
	_updateSlider(e, t) {
		this.slider.setWidth(e), this.slider.setLeft(t);
	}
	_renderDomNode(e, t) {
		this.domNode.setWidth(e), this.domNode.setHeight(t), this.domNode.setLeft(0), this.domNode.setBottom(0);
	}
	onDidScroll(e) {
		return this._shouldRender = this._onElementScrollSize(e.scrollWidth) || this._shouldRender, this._shouldRender = this._onElementScrollPosition(e.scrollLeft) || this._shouldRender, this._shouldRender = this._onElementSize(e.width) || this._shouldRender, this._shouldRender;
	}
	_pointerDownRelativePosition(e, t) {
		return e;
	}
	_sliderPointerPosition(e) {
		return e.pageX;
	}
	_sliderOrthogonalPointerPosition(e) {
		return e.pageY;
	}
	_updateScrollbarSize(e) {
		this.slider.setHeight(e);
	}
	writeScrollPosition(e, t) {
		e.scrollLeft = t;
	}
	updateOptions(e) {
		this.updateScrollbarSize(e.horizontal === 2 ? 0 : e.horizontalScrollbarSize), this._scrollbarState.setOppositeScrollbarSize(e.vertical === 2 ? 0 : e.verticalScrollbarSize), this._visibilityController.setVisibility(e.horizontal), this._scrollByPage = e.scrollByPage;
	}
}, Nr = class extends Ar {
	constructor(e, t, n) {
		let r = e.getScrollDimensions(), i = e.getCurrentScrollPosition();
		if (super({
			lazyRender: t.lazyRender,
			host: n,
			scrollbarState: new jr(t.verticalHasArrows ? t.arrowSize : 0, t.vertical === 2 ? 0 : t.verticalScrollbarSize, 0, r.height, r.scrollHeight, i.scrollTop),
			visibility: t.vertical,
			extraScrollbarClassName: "vertical",
			scrollable: e,
			scrollByPage: t.scrollByPage
		}), t.verticalHasArrows) throw Error("horizontalHasArrows is not supported in xterm.js");
		this._createSlider(0, Math.floor((t.verticalScrollbarSize - t.verticalSliderSize) / 2), t.verticalSliderSize, void 0);
	}
	_updateSlider(e, t) {
		this.slider.setHeight(e), this.slider.setTop(t);
	}
	_renderDomNode(e, t) {
		this.domNode.setWidth(t), this.domNode.setHeight(e), this.domNode.setRight(0), this.domNode.setTop(0);
	}
	onDidScroll(e) {
		return this._shouldRender = this._onElementScrollSize(e.scrollHeight) || this._shouldRender, this._shouldRender = this._onElementScrollPosition(e.scrollTop) || this._shouldRender, this._shouldRender = this._onElementSize(e.height) || this._shouldRender, this._shouldRender;
	}
	_pointerDownRelativePosition(e, t) {
		return t;
	}
	_sliderPointerPosition(e) {
		return e.pageY;
	}
	_sliderOrthogonalPointerPosition(e) {
		return e.pageX;
	}
	_updateScrollbarSize(e) {
		this.slider.setWidth(e);
	}
	writeScrollPosition(e, t) {
		e.scrollTop = t;
	}
	updateOptions(e) {
		this.updateScrollbarSize(e.vertical === 2 ? 0 : e.verticalScrollbarSize), this._scrollbarState.setOppositeScrollbarSize(0), this._visibilityController.setVisibility(e.vertical), this._scrollByPage = e.scrollByPage;
	}
}, Pr = 500, Fr = 50, Ir = !0, Lr = class {
	constructor(e, t, n) {
		this.timestamp = e, this.deltaX = t, this.deltaY = n, this.score = 0;
	}
}, Rr = class {
	constructor() {
		this._capacity = 5, this._memory = [], this._front = -1, this._rear = -1;
	}
	isPhysicalMouseWheel() {
		if (this._front === -1 && this._rear === -1) return !1;
		let e = 1, t = 0, n = 1, r = this._rear;
		do {
			let i = r === this._front ? e : 2 ** -n;
			if (e -= i, t += this._memory[r].score * i, r === this._front) break;
			r = (this._capacity + r - 1) % this._capacity, n++;
		} while (1);
		return t <= .5;
	}
	acceptStandardWheelEvent(e) {
		if (Lt) {
			let t = Nt(Un(e.browserEvent));
			this.accept(Date.now(), e.deltaX * t, e.deltaY * t);
		} else this.accept(Date.now(), e.deltaX, e.deltaY);
	}
	accept(e, t, n) {
		let r = null, i = new Lr(e, t, n);
		this._front === -1 && this._rear === -1 ? (this._memory[0] = i, this._front = 0, this._rear = 0) : (r = this._memory[this._rear], this._rear = (this._rear + 1) % this._capacity, this._rear === this._front && (this._front = (this._front + 1) % this._capacity), this._memory[this._rear] = i), i.score = this._computeScore(i, r);
	}
	_computeScore(e, t) {
		if (Math.abs(e.deltaX) > 0 && Math.abs(e.deltaY) > 0) return 1;
		let n = .5;
		if (this._isAlmostInt(e.deltaX) && this._isAlmostInt(e.deltaY) || (n += .25), t) {
			let r = Math.abs(e.deltaX), i = Math.abs(e.deltaY), a = Math.abs(t.deltaX), o = Math.abs(t.deltaY), s = Math.max(Math.min(r, a), 1), c = Math.max(Math.min(i, o), 1), l = Math.max(r, a), u = Math.max(i, o);
			l % s === 0 && u % c === 0 && (n -= .5);
		}
		return Math.min(Math.max(n, 0), 1);
	}
	_isAlmostInt(e) {
		return Math.abs(Math.round(e) - e) < .01;
	}
};
Rr.INSTANCE = new Rr();
var zr = Rr, Br = class extends _r {
	constructor(e, t, n) {
		super(), this._onScroll = this._register(new A()), this.onScroll = this._onScroll.event, this._onWillScroll = this._register(new A()), this.onWillScroll = this._onWillScroll.event, this._options = Hr(t), this._scrollable = n, this._register(this._scrollable.onScroll((e) => {
			this._onWillScroll.fire(e), this._onDidScroll(e), this._onScroll.fire(e);
		}));
		let r = {
			onMouseWheel: (e) => this._onMouseWheel(e),
			onDragStart: () => this._onDragStart(),
			onDragEnd: () => this._onDragEnd()
		};
		this._verticalScrollbar = this._register(new Nr(this._scrollable, this._options, r)), this._horizontalScrollbar = this._register(new Mr(this._scrollable, this._options, r)), this._domNode = document.createElement("div"), this._domNode.className = "xterm-scrollable-element " + this._options.className, this._domNode.setAttribute("role", "presentation"), this._domNode.style.position = "relative", this._domNode.appendChild(e), this._domNode.appendChild(this._horizontalScrollbar.domNode.domNode), this._domNode.appendChild(this._verticalScrollbar.domNode.domNode), this._options.useShadows ? (this._leftShadowDomNode = dr(document.createElement("div")), this._leftShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._leftShadowDomNode.domNode), this._topShadowDomNode = dr(document.createElement("div")), this._topShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._topShadowDomNode.domNode), this._topLeftShadowDomNode = dr(document.createElement("div")), this._topLeftShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._topLeftShadowDomNode.domNode)) : (this._leftShadowDomNode = null, this._topShadowDomNode = null, this._topLeftShadowDomNode = null), this._listenOnDomNode = this._options.listenOnDomNode || this._domNode, this._mouseWheelToDispose = [], this._setListeningToMouseWheel(this._options.handleMouseWheel), this.onmouseover(this._listenOnDomNode, (e) => this._onMouseOver(e)), this.onmouseleave(this._listenOnDomNode, (e) => this._onMouseLeave(e)), this._hideTimeout = this._register(new jn()), this._isDragging = !1, this._mouseIsOver = !1, this._shouldRender = !0, this._revealOnScroll = !0;
	}
	get options() {
		return this._options;
	}
	dispose() {
		this._mouseWheelToDispose = st(this._mouseWheelToDispose), super.dispose();
	}
	getDomNode() {
		return this._domNode;
	}
	getOverviewRulerLayoutInfo() {
		return {
			parent: this._domNode,
			insertBefore: this._verticalScrollbar.domNode.domNode
		};
	}
	delegateVerticalScrollbarPointerDown(e) {
		this._verticalScrollbar.delegatePointerDown(e);
	}
	getScrollDimensions() {
		return this._scrollable.getScrollDimensions();
	}
	setScrollDimensions(e) {
		this._scrollable.setScrollDimensions(e, !1);
	}
	updateClassName(e) {
		this._options.className = e, $t && (this._options.className += " mac"), this._domNode.className = "xterm-scrollable-element " + this._options.className;
	}
	updateOptions(e) {
		typeof e.handleMouseWheel < "u" && (this._options.handleMouseWheel = e.handleMouseWheel, this._setListeningToMouseWheel(this._options.handleMouseWheel)), typeof e.mouseWheelScrollSensitivity < "u" && (this._options.mouseWheelScrollSensitivity = e.mouseWheelScrollSensitivity), typeof e.fastScrollSensitivity < "u" && (this._options.fastScrollSensitivity = e.fastScrollSensitivity), typeof e.scrollPredominantAxis < "u" && (this._options.scrollPredominantAxis = e.scrollPredominantAxis), typeof e.horizontal < "u" && (this._options.horizontal = e.horizontal), typeof e.vertical < "u" && (this._options.vertical = e.vertical), typeof e.horizontalScrollbarSize < "u" && (this._options.horizontalScrollbarSize = e.horizontalScrollbarSize), typeof e.verticalScrollbarSize < "u" && (this._options.verticalScrollbarSize = e.verticalScrollbarSize), typeof e.scrollByPage < "u" && (this._options.scrollByPage = e.scrollByPage), this._horizontalScrollbar.updateOptions(this._options), this._verticalScrollbar.updateOptions(this._options), this._options.lazyRender || this._render();
	}
	setRevealOnScroll(e) {
		this._revealOnScroll = e;
	}
	delegateScrollFromMouseWheelEvent(e) {
		this._onMouseWheel(new Dn(e));
	}
	_setListeningToMouseWheel(e) {
		this._mouseWheelToDispose.length > 0 !== e && (this._mouseWheelToDispose = st(this._mouseWheelToDispose), e) && this._mouseWheelToDispose.push(j(this._listenOnDomNode, cr.MOUSE_WHEEL, (e) => {
			this._onMouseWheel(new Dn(e));
		}, { passive: !1 }));
	}
	_onMouseWheel(e) {
		if (e.browserEvent?.defaultPrevented) return;
		let t = zr.INSTANCE;
		Ir && t.acceptStandardWheelEvent(e);
		let n = !1;
		if (e.deltaY || e.deltaX) {
			let r = e.deltaY * this._options.mouseWheelScrollSensitivity, i = e.deltaX * this._options.mouseWheelScrollSensitivity;
			this._options.scrollPredominantAxis && (this._options.scrollYToX && i + r === 0 ? i = r = 0 : Math.abs(r) >= Math.abs(i) ? i = 0 : r = 0), this._options.flipAxes && ([r, i] = [i, r]);
			let a = !$t && e.browserEvent && e.browserEvent.shiftKey;
			(this._options.scrollYToX || a) && !i && (i = r, r = 0), e.browserEvent && e.browserEvent.altKey && (i *= this._options.fastScrollSensitivity, r *= this._options.fastScrollSensitivity);
			let o = this._scrollable.getFutureScrollPosition(), s = {};
			if (r) {
				let e = Fr * r, t = o.scrollTop - (e < 0 ? Math.floor(e) : Math.ceil(e));
				this._verticalScrollbar.writeScrollPosition(s, t);
			}
			if (i) {
				let e = Fr * i, t = o.scrollLeft - (e < 0 ? Math.floor(e) : Math.ceil(e));
				this._horizontalScrollbar.writeScrollPosition(s, t);
			}
			s = this._scrollable.validateScrollPosition(s), (o.scrollLeft !== s.scrollLeft || o.scrollTop !== s.scrollTop) && (Ir && this._options.mouseWheelSmoothScroll && t.isPhysicalMouseWheel() ? this._scrollable.setScrollPositionSmooth(s) : this._scrollable.setScrollPositionNow(s), n = !0);
		}
		let r = n;
		!r && this._options.alwaysConsumeMouseWheel && (r = !0), !r && this._options.consumeMouseWheelIfScrollbarIsNeeded && (this._verticalScrollbar.isNeeded() || this._horizontalScrollbar.isNeeded()) && (r = !0), r && (e.preventDefault(), e.stopPropagation());
	}
	_onDidScroll(e) {
		this._shouldRender = this._horizontalScrollbar.onDidScroll(e) || this._shouldRender, this._shouldRender = this._verticalScrollbar.onDidScroll(e) || this._shouldRender, this._options.useShadows && (this._shouldRender = !0), this._revealOnScroll && this._reveal(), this._options.lazyRender || this._render();
	}
	renderNow() {
		if (!this._options.lazyRender) throw Error("Please use `lazyRender` together with `renderNow`!");
		this._render();
	}
	_render() {
		if (this._shouldRender && (this._shouldRender = !1, this._horizontalScrollbar.render(), this._verticalScrollbar.render(), this._options.useShadows)) {
			let e = this._scrollable.getCurrentScrollPosition(), t = e.scrollTop > 0, n = e.scrollLeft > 0, r = n ? " left" : "", i = t ? " top" : "", a = n || t ? " top-left-corner" : "";
			this._leftShadowDomNode.setClassName(`shadow${r}`), this._topShadowDomNode.setClassName(`shadow${i}`), this._topLeftShadowDomNode.setClassName(`shadow${a}${i}${r}`);
		}
	}
	_onDragStart() {
		this._isDragging = !0, this._reveal();
	}
	_onDragEnd() {
		this._isDragging = !1, this._hide();
	}
	_onMouseLeave(e) {
		this._mouseIsOver = !1, this._hide();
	}
	_onMouseOver(e) {
		this._mouseIsOver = !0, this._reveal();
	}
	_reveal() {
		this._verticalScrollbar.beginReveal(), this._horizontalScrollbar.beginReveal(), this._scheduleHide();
	}
	_hide() {
		!this._mouseIsOver && !this._isDragging && (this._verticalScrollbar.beginHide(), this._horizontalScrollbar.beginHide());
	}
	_scheduleHide() {
		!this._mouseIsOver && !this._isDragging && this._hideTimeout.cancelAndSet(() => this._hide(), Pr);
	}
}, Vr = class extends Br {
	constructor(e, t, n) {
		super(e, t, n);
	}
	setScrollPosition(e) {
		e.reuseAnimation ? this._scrollable.setScrollPositionSmooth(e, e.reuseAnimation) : this._scrollable.setScrollPositionNow(e);
	}
	getScrollPosition() {
		return this._scrollable.getCurrentScrollPosition();
	}
};
function Hr(e) {
	let t = {
		lazyRender: typeof e.lazyRender < "u" && e.lazyRender,
		className: typeof e.className < "u" ? e.className : "",
		useShadows: typeof e.useShadows < "u" ? e.useShadows : !0,
		handleMouseWheel: typeof e.handleMouseWheel < "u" ? e.handleMouseWheel : !0,
		flipAxes: typeof e.flipAxes < "u" && e.flipAxes,
		consumeMouseWheelIfScrollbarIsNeeded: typeof e.consumeMouseWheelIfScrollbarIsNeeded < "u" && e.consumeMouseWheelIfScrollbarIsNeeded,
		alwaysConsumeMouseWheel: typeof e.alwaysConsumeMouseWheel < "u" && e.alwaysConsumeMouseWheel,
		scrollYToX: typeof e.scrollYToX < "u" && e.scrollYToX,
		mouseWheelScrollSensitivity: typeof e.mouseWheelScrollSensitivity < "u" ? e.mouseWheelScrollSensitivity : 1,
		fastScrollSensitivity: typeof e.fastScrollSensitivity < "u" ? e.fastScrollSensitivity : 5,
		scrollPredominantAxis: typeof e.scrollPredominantAxis < "u" ? e.scrollPredominantAxis : !0,
		mouseWheelSmoothScroll: typeof e.mouseWheelSmoothScroll < "u" ? e.mouseWheelSmoothScroll : !0,
		arrowSize: typeof e.arrowSize < "u" ? e.arrowSize : 11,
		listenOnDomNode: typeof e.listenOnDomNode < "u" ? e.listenOnDomNode : null,
		horizontal: typeof e.horizontal < "u" ? e.horizontal : 1,
		horizontalScrollbarSize: typeof e.horizontalScrollbarSize < "u" ? e.horizontalScrollbarSize : 10,
		horizontalSliderSize: typeof e.horizontalSliderSize < "u" ? e.horizontalSliderSize : 0,
		horizontalHasArrows: typeof e.horizontalHasArrows < "u" && e.horizontalHasArrows,
		vertical: typeof e.vertical < "u" ? e.vertical : 1,
		verticalScrollbarSize: typeof e.verticalScrollbarSize < "u" ? e.verticalScrollbarSize : 10,
		verticalHasArrows: typeof e.verticalHasArrows < "u" && e.verticalHasArrows,
		verticalSliderSize: typeof e.verticalSliderSize < "u" ? e.verticalSliderSize : 0,
		scrollByPage: typeof e.scrollByPage < "u" && e.scrollByPage
	};
	return t.horizontalSliderSize = typeof e.horizontalSliderSize < "u" ? e.horizontalSliderSize : t.horizontalScrollbarSize, t.verticalSliderSize = typeof e.verticalSliderSize < "u" ? e.verticalSliderSize : t.verticalScrollbarSize, $t && (t.className += " mac"), t;
}
var Ur = class extends O {
	constructor(e, t, n, r, i, a, o, s) {
		super(), this._bufferService = n, this._optionsService = o, this._renderService = s, this._onRequestScrollLines = this._register(new A()), this.onRequestScrollLines = this._onRequestScrollLines.event, this._isSyncing = !1, this._isHandlingScroll = !1, this._suppressOnScrollHandler = !1;
		let c = this._register(new xr({
			forceIntegerValues: !1,
			smoothScrollDuration: this._optionsService.rawOptions.smoothScrollDuration,
			scheduleAtNextAnimationFrame: (e) => rr(r.window, e)
		}));
		this._register(this._optionsService.onSpecificOptionChange("smoothScrollDuration", () => {
			c.setSmoothScrollDuration(this._optionsService.rawOptions.smoothScrollDuration);
		})), this._scrollableElement = this._register(new Vr(t, {
			vertical: 1,
			horizontal: 2,
			useShadows: !1,
			mouseWheelSmoothScroll: !0,
			...this._getChangeOptions()
		}, c)), this._register(this._optionsService.onMultipleOptionChange([
			"scrollSensitivity",
			"fastScrollSensitivity",
			"overviewRuler"
		], () => this._scrollableElement.updateOptions(this._getChangeOptions()))), this._register(i.onProtocolChange((e) => {
			this._scrollableElement.updateOptions({ handleMouseWheel: !(e & 16) });
		})), this._scrollableElement.setScrollDimensions({
			height: 0,
			scrollHeight: 0
		}), this._register(_t.runAndSubscribe(a.onChangeColors, () => {
			this._scrollableElement.getDomNode().style.backgroundColor = a.colors.background.css;
		})), e.appendChild(this._scrollableElement.getDomNode()), this._register(D(() => this._scrollableElement.getDomNode().remove())), this._styleElement = r.mainDocument.createElement("style"), t.appendChild(this._styleElement), this._register(D(() => this._styleElement.remove())), this._register(_t.runAndSubscribe(a.onChangeColors, () => {
			this._styleElement.textContent = [
				".xterm .xterm-scrollable-element > .scrollbar > .slider {",
				`  background: ${a.colors.scrollbarSliderBackground.css};`,
				"}",
				".xterm .xterm-scrollable-element > .scrollbar > .slider:hover {",
				`  background: ${a.colors.scrollbarSliderHoverBackground.css};`,
				"}",
				".xterm .xterm-scrollable-element > .scrollbar > .slider.active {",
				`  background: ${a.colors.scrollbarSliderActiveBackground.css};`,
				"}"
			].join("\n");
		})), this._register(this._bufferService.onResize(() => this.queueSync())), this._register(this._bufferService.buffers.onBufferActivate(() => {
			this._latestYDisp = void 0, this.queueSync();
		})), this._register(this._bufferService.onScroll(() => this._sync())), this._register(this._scrollableElement.onScroll((e) => this._handleScroll(e)));
	}
	scrollLines(e) {
		let t = this._scrollableElement.getScrollPosition();
		this._scrollableElement.setScrollPosition({
			reuseAnimation: !0,
			scrollTop: t.scrollTop + e * this._renderService.dimensions.css.cell.height
		});
	}
	scrollToLine(e, t) {
		t && (this._latestYDisp = e), this._scrollableElement.setScrollPosition({
			reuseAnimation: !t,
			scrollTop: e * this._renderService.dimensions.css.cell.height
		});
	}
	_getChangeOptions() {
		return {
			mouseWheelScrollSensitivity: this._optionsService.rawOptions.scrollSensitivity,
			fastScrollSensitivity: this._optionsService.rawOptions.fastScrollSensitivity,
			verticalScrollbarSize: this._optionsService.rawOptions.overviewRuler?.width || 14
		};
	}
	queueSync(e) {
		e !== void 0 && (this._latestYDisp = e), this._queuedAnimationFrame === void 0 && (this._queuedAnimationFrame = this._renderService.addRefreshCallback(() => {
			this._queuedAnimationFrame = void 0, this._sync(this._latestYDisp);
		}));
	}
	_sync(e = this._bufferService.buffer.ydisp) {
		!this._renderService || this._isSyncing || (this._isSyncing = !0, this._suppressOnScrollHandler = !0, this._scrollableElement.setScrollDimensions({
			height: this._renderService.dimensions.css.canvas.height,
			scrollHeight: this._renderService.dimensions.css.cell.height * this._bufferService.buffer.lines.length
		}), this._suppressOnScrollHandler = !1, e !== this._latestYDisp && this._scrollableElement.setScrollPosition({ scrollTop: e * this._renderService.dimensions.css.cell.height }), this._isSyncing = !1);
	}
	_handleScroll(e) {
		if (!this._renderService || this._isHandlingScroll || this._suppressOnScrollHandler) return;
		this._isHandlingScroll = !0;
		let t = Math.round(e.scrollTop / this._renderService.dimensions.css.cell.height), n = t - this._bufferService.buffer.ydisp;
		n !== 0 && (this._latestYDisp = t, this._onRequestScrollLines.fire(n)), this._isHandlingScroll = !1;
	}
};
Ur = x([
	S(2, Ce),
	S(3, Ie),
	S(4, we),
	S(5, Ve),
	S(6, ke),
	S(7, Re)
], Ur);
var Wr = class extends O {
	constructor(e, t, n, r, i) {
		super(), this._screenElement = e, this._bufferService = t, this._coreBrowserService = n, this._decorationService = r, this._renderService = i, this._decorationElements = /* @__PURE__ */ new Map(), this._altBufferIsActive = !1, this._dimensionsChanged = !1, this._container = document.createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this._register(this._renderService.onRenderedViewportChange(() => this._doRefreshDecorations())), this._register(this._renderService.onDimensionsChange(() => {
			this._dimensionsChanged = !0, this._queueRefresh();
		})), this._register(this._coreBrowserService.onDprChange(() => this._queueRefresh())), this._register(this._bufferService.buffers.onBufferActivate(() => {
			this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
		})), this._register(this._decorationService.onDecorationRegistered(() => this._queueRefresh())), this._register(this._decorationService.onDecorationRemoved((e) => this._removeDecoration(e))), this._register(D(() => {
			this._container.remove(), this._decorationElements.clear();
		}));
	}
	_queueRefresh() {
		this._animationFrame === void 0 && (this._animationFrame = this._renderService.addRefreshCallback(() => {
			this._doRefreshDecorations(), this._animationFrame = void 0;
		}));
	}
	_doRefreshDecorations() {
		for (let e of this._decorationService.decorations) this._renderDecoration(e);
		this._dimensionsChanged = !1;
	}
	_renderDecoration(e) {
		this._refreshStyle(e), this._dimensionsChanged && this._refreshXPosition(e);
	}
	_createElement(e) {
		let t = this._coreBrowserService.mainDocument.createElement("div");
		t.classList.add("xterm-decoration"), t.classList.toggle("xterm-decoration-top-layer", e?.options?.layer === "top"), t.style.width = `${Math.round((e.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, t.style.height = `${(e.options.height || 1) * this._renderService.dimensions.css.cell.height}px`, t.style.top = `${(e.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height}px`, t.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
		let n = e.options.x ?? 0;
		return n && n > this._bufferService.cols && (t.style.display = "none"), this._refreshXPosition(e, t), t;
	}
	_refreshStyle(e) {
		let t = e.marker.line - this._bufferService.buffers.active.ydisp;
		if (t < 0 || t >= this._bufferService.rows) e.element && (e.element.style.display = "none", e.onRenderEmitter.fire(e.element));
		else {
			let n = this._decorationElements.get(e);
			n || (n = this._createElement(e), e.element = n, this._decorationElements.set(e, n), this._container.appendChild(n), e.onDispose(() => {
				this._decorationElements.delete(e), n.remove();
			})), n.style.display = this._altBufferIsActive ? "none" : "block", this._altBufferIsActive || (n.style.width = `${Math.round((e.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, n.style.height = `${(e.options.height || 1) * this._renderService.dimensions.css.cell.height}px`, n.style.top = `${t * this._renderService.dimensions.css.cell.height}px`, n.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`), e.onRenderEmitter.fire(n);
		}
	}
	_refreshXPosition(e, t = e.element) {
		if (!t) return;
		let n = e.options.x ?? 0;
		(e.options.anchor || "left") === "right" ? t.style.right = n ? `${n * this._renderService.dimensions.css.cell.width}px` : "" : t.style.left = n ? `${n * this._renderService.dimensions.css.cell.width}px` : "";
	}
	_removeDecoration(e) {
		this._decorationElements.get(e)?.remove(), this._decorationElements.delete(e), e.dispose();
	}
};
Wr = x([
	S(1, Ce),
	S(2, Ie),
	S(3, Me),
	S(4, Re)
], Wr);
var Gr = class {
	constructor() {
		this._zones = [], this._zonePool = [], this._zonePoolIndex = 0, this._linePadding = {
			full: 0,
			left: 0,
			center: 0,
			right: 0
		};
	}
	get zones() {
		return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
	}
	clear() {
		this._zones.length = 0, this._zonePoolIndex = 0;
	}
	addDecoration(e) {
		if (e.options.overviewRulerOptions) {
			for (let t of this._zones) if (t.color === e.options.overviewRulerOptions.color && t.position === e.options.overviewRulerOptions.position) {
				if (this._lineIntersectsZone(t, e.marker.line)) return;
				if (this._lineAdjacentToZone(t, e.marker.line, e.options.overviewRulerOptions.position)) {
					this._addLineToZone(t, e.marker.line);
					return;
				}
			}
			if (this._zonePoolIndex < this._zonePool.length) {
				this._zonePool[this._zonePoolIndex].color = e.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = e.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = e.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = e.marker.line, this._zones.push(this._zonePool[this._zonePoolIndex++]);
				return;
			}
			this._zones.push({
				color: e.options.overviewRulerOptions.color,
				position: e.options.overviewRulerOptions.position,
				startBufferLine: e.marker.line,
				endBufferLine: e.marker.line
			}), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
		}
	}
	setPadding(e) {
		this._linePadding = e;
	}
	_lineIntersectsZone(e, t) {
		return t >= e.startBufferLine && t <= e.endBufferLine;
	}
	_lineAdjacentToZone(e, t, n) {
		return t >= e.startBufferLine - this._linePadding[n || "full"] && t <= e.endBufferLine + this._linePadding[n || "full"];
	}
	_addLineToZone(e, t) {
		e.startBufferLine = Math.min(e.startBufferLine, t), e.endBufferLine = Math.max(e.endBufferLine, t);
	}
}, Kr = {
	full: 0,
	left: 0,
	center: 0,
	right: 0
}, qr = {
	full: 0,
	left: 0,
	center: 0,
	right: 0
}, Jr = {
	full: 0,
	left: 0,
	center: 0,
	right: 0
}, Yr = class extends O {
	constructor(e, t, n, r, i, a, o, s) {
		super(), this._viewportElement = e, this._screenElement = t, this._bufferService = n, this._decorationService = r, this._renderService = i, this._optionsService = a, this._themeService = o, this._coreBrowserService = s, this._colorZoneStore = new Gr(), this._shouldUpdateDimensions = !0, this._shouldUpdateAnchor = !0, this._lastKnownBufferLength = 0, this._canvas = this._coreBrowserService.mainDocument.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), this._viewportElement.parentElement?.insertBefore(this._canvas, this._viewportElement), this._register(D(() => this._canvas?.remove()));
		let c = this._canvas.getContext("2d");
		if (c) this._ctx = c;
		else throw Error("Ctx cannot be null");
		this._register(this._decorationService.onDecorationRegistered(() => this._queueRefresh(void 0, !0))), this._register(this._decorationService.onDecorationRemoved(() => this._queueRefresh(void 0, !0))), this._register(this._renderService.onRenderedViewportChange(() => this._queueRefresh())), this._register(this._bufferService.buffers.onBufferActivate(() => {
			this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
		})), this._register(this._bufferService.onScroll(() => {
			this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
		})), this._register(this._renderService.onRender(() => {
			this._containerHeight && this._containerHeight === this._screenElement.clientHeight || (this._queueRefresh(!0), this._containerHeight = this._screenElement.clientHeight);
		})), this._register(this._coreBrowserService.onDprChange(() => this._queueRefresh(!0))), this._register(this._optionsService.onSpecificOptionChange("overviewRuler", () => this._queueRefresh(!0))), this._register(this._themeService.onChangeColors(() => this._queueRefresh())), this._queueRefresh(!0);
	}
	get _width() {
		return this._optionsService.options.overviewRuler?.width || 0;
	}
	_refreshDrawConstants() {
		let e = Math.floor((this._canvas.width - 1) / 3), t = Math.ceil((this._canvas.width - 1) / 3);
		qr.full = this._canvas.width, qr.left = e, qr.center = t, qr.right = e, this._refreshDrawHeightConstants(), Jr.full = 1, Jr.left = 1, Jr.center = 1 + qr.left, Jr.right = 1 + qr.left + qr.center;
	}
	_refreshDrawHeightConstants() {
		Kr.full = Math.round(2 * this._coreBrowserService.dpr);
		let e = this._canvas.height / this._bufferService.buffer.lines.length, t = Math.round(Math.max(Math.min(e, 12), 6) * this._coreBrowserService.dpr);
		Kr.left = t, Kr.center = t, Kr.right = t;
	}
	_refreshColorZonePadding() {
		this._colorZoneStore.setPadding({
			full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * Kr.full),
			left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * Kr.left),
			center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * Kr.center),
			right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * Kr.right)
		}), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
	}
	_refreshCanvasDimensions() {
		this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowserService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowserService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
	}
	_refreshDecorations() {
		this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
		for (let e of this._decorationService.decorations) this._colorZoneStore.addDecoration(e);
		this._ctx.lineWidth = 1, this._renderRulerOutline();
		let e = this._colorZoneStore.zones;
		for (let t of e) t.position !== "full" && this._renderColorZone(t);
		for (let t of e) t.position === "full" && this._renderColorZone(t);
		this._shouldUpdateDimensions = !1, this._shouldUpdateAnchor = !1;
	}
	_renderRulerOutline() {
		this._ctx.fillStyle = this._themeService.colors.overviewRulerBorder.css, this._ctx.fillRect(0, 0, 1, this._canvas.height), this._optionsService.rawOptions.overviewRuler.showTopBorder && this._ctx.fillRect(1, 0, this._canvas.width - 1, 1), this._optionsService.rawOptions.overviewRuler.showBottomBorder && this._ctx.fillRect(1, this._canvas.height - 1, this._canvas.width - 1, this._canvas.height);
	}
	_renderColorZone(e) {
		this._ctx.fillStyle = e.color, this._ctx.fillRect(Jr[e.position || "full"], Math.round((this._canvas.height - 1) * (e.startBufferLine / this._bufferService.buffers.active.lines.length) - Kr[e.position || "full"] / 2), qr[e.position || "full"], Math.round((this._canvas.height - 1) * ((e.endBufferLine - e.startBufferLine) / this._bufferService.buffers.active.lines.length) + Kr[e.position || "full"]));
	}
	_queueRefresh(e, t) {
		this._shouldUpdateDimensions = e || this._shouldUpdateDimensions, this._shouldUpdateAnchor = t || this._shouldUpdateAnchor, this._animationFrame === void 0 && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
			this._refreshDecorations(), this._animationFrame = void 0;
		}));
	}
};
Yr = x([
	S(2, Ce),
	S(3, Me),
	S(4, Re),
	S(5, ke),
	S(6, Ve),
	S(7, Ie)
], Yr);
var M;
((e) => (e.NUL = "\0", e.SOH = "", e.STX = "", e.ETX = "", e.EOT = "", e.ENQ = "", e.ACK = "", e.BEL = "\x07", e.BS = "\b", e.HT = "	", e.LF = "\n", e.VT = "\v", e.FF = "\f", e.CR = "\r", e.SO = "", e.SI = "", e.DLE = "", e.DC1 = "", e.DC2 = "", e.DC3 = "", e.DC4 = "", e.NAK = "", e.SYN = "", e.ETB = "", e.CAN = "", e.EM = "", e.SUB = "", e.ESC = "\x1B", e.FS = "", e.GS = "", e.RS = "", e.US = "", e.SP = " ", e.DEL = ""))(M ||= {});
var Xr;
((e) => (e.PAD = "", e.HOP = "", e.BPH = "", e.NBH = "", e.IND = "", e.NEL = "", e.SSA = "", e.ESA = "", e.HTS = "", e.HTJ = "", e.VTS = "", e.PLD = "", e.PLU = "", e.RI = "", e.SS2 = "", e.SS3 = "", e.DCS = "", e.PU1 = "", e.PU2 = "", e.STS = "", e.CCH = "", e.MW = "", e.SPA = "", e.EPA = "", e.SOS = "", e.SGCI = "", e.SCI = "", e.CSI = "", e.ST = "", e.OSC = "", e.PM = "", e.APC = ""))(Xr ||= {});
var Zr;
((e) => e.ST = `${M.ESC}\\`)(Zr ||= {});
var Qr = class {
	constructor(e, t, n, r, i, a) {
		this._textarea = e, this._compositionView = t, this._bufferService = n, this._optionsService = r, this._coreService = i, this._renderService = a, this._isComposing = !1, this._isSendingComposition = !1, this._compositionPosition = {
			start: 0,
			end: 0
		}, this._dataAlreadySent = "";
	}
	get isComposing() {
		return this._isComposing;
	}
	compositionstart() {
		this._isComposing = !0, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
	}
	compositionupdate(e) {
		this._compositionView.textContent = e.data, this.updateCompositionElements(), setTimeout(() => {
			this._compositionPosition.end = this._textarea.value.length;
		}, 0);
	}
	compositionend() {
		this._finalizeComposition(!0);
	}
	keydown(e) {
		if (this._isComposing || this._isSendingComposition) {
			if (e.keyCode === 20 || e.keyCode === 229 || e.keyCode === 16 || e.keyCode === 17 || e.keyCode === 18) return !1;
			this._finalizeComposition(!1);
		}
		return e.keyCode !== 229 || (this._handleAnyTextareaChanges(), !1);
	}
	_finalizeComposition(e) {
		if (this._compositionView.classList.remove("active"), this._isComposing = !1, e) {
			let e = {
				start: this._compositionPosition.start,
				end: this._compositionPosition.end
			};
			this._isSendingComposition = !0, setTimeout(() => {
				if (this._isSendingComposition) {
					this._isSendingComposition = !1;
					let t;
					e.start += this._dataAlreadySent.length, t = this._isComposing ? this._textarea.value.substring(e.start, this._compositionPosition.start) : this._textarea.value.substring(e.start), t.length > 0 && this._coreService.triggerDataEvent(t, !0);
				}
			}, 0);
		} else {
			this._isSendingComposition = !1;
			let e = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
			this._coreService.triggerDataEvent(e, !0);
		}
	}
	_handleAnyTextareaChanges() {
		let e = this._textarea.value;
		setTimeout(() => {
			if (!this._isComposing) {
				let t = this._textarea.value, n = t.replace(e, "");
				this._dataAlreadySent = n, t.length > e.length ? this._coreService.triggerDataEvent(n, !0) : t.length < e.length ? this._coreService.triggerDataEvent(`${M.DEL}`, !0) : t.length === e.length && t !== e && this._coreService.triggerDataEvent(t, !0);
			}
		}, 0);
	}
	updateCompositionElements(e) {
		if (this._isComposing) {
			if (this._bufferService.buffer.isCursorInViewport) {
				let e = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), t = this._renderService.dimensions.css.cell.height, n = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height, r = e * this._renderService.dimensions.css.cell.width;
				this._compositionView.style.left = r + "px", this._compositionView.style.top = n + "px", this._compositionView.style.height = t + "px", this._compositionView.style.lineHeight = t + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
				let i = this._compositionView.getBoundingClientRect();
				this._textarea.style.left = r + "px", this._textarea.style.top = n + "px", this._textarea.style.width = Math.max(i.width, 1) + "px", this._textarea.style.height = Math.max(i.height, 1) + "px", this._textarea.style.lineHeight = i.height + "px";
			}
			e || setTimeout(() => this.updateCompositionElements(!0), 0);
		}
	}
};
Qr = x([
	S(2, Ce),
	S(3, ke),
	S(4, Te),
	S(5, Re)
], Qr);
var $r = 0, ei = 0, ti = 0, N = 0, ni = {
	css: "#00000000",
	rgba: 0
}, P;
((e) => {
	function t(e, t, n, r) {
		return r === void 0 ? `#${ai(e)}${ai(t)}${ai(n)}` : `#${ai(e)}${ai(t)}${ai(n)}${ai(r)}`;
	}
	e.toCss = t;
	function n(e, t, n, r = 255) {
		return (e << 24 | t << 16 | n << 8 | r) >>> 0;
	}
	e.toRgba = n;
	function r(t, n, r, i) {
		return {
			css: e.toCss(t, n, r, i),
			rgba: e.toRgba(t, n, r, i)
		};
	}
	e.toColor = r;
})(P ||= {});
var F;
((e) => {
	function t(e, t) {
		if (N = (t.rgba & 255) / 255, N === 1) return {
			css: t.css,
			rgba: t.rgba
		};
		let n = t.rgba >> 24 & 255, r = t.rgba >> 16 & 255, i = t.rgba >> 8 & 255, a = e.rgba >> 24 & 255, o = e.rgba >> 16 & 255, s = e.rgba >> 8 & 255;
		return $r = a + Math.round((n - a) * N), ei = o + Math.round((r - o) * N), ti = s + Math.round((i - s) * N), {
			css: P.toCss($r, ei, ti),
			rgba: P.toRgba($r, ei, ti)
		};
	}
	e.blend = t;
	function n(e) {
		return (e.rgba & 255) == 255;
	}
	e.isOpaque = n;
	function r(e, t, n) {
		let r = ii.ensureContrastRatio(e.rgba, t.rgba, n);
		if (r) return P.toColor(r >> 24 & 255, r >> 16 & 255, r >> 8 & 255);
	}
	e.ensureContrastRatio = r;
	function i(e) {
		let t = (e.rgba | 255) >>> 0;
		return [$r, ei, ti] = ii.toChannels(t), {
			css: P.toCss($r, ei, ti),
			rgba: t
		};
	}
	e.opaque = i;
	function a(e, t) {
		return N = Math.round(t * 255), [$r, ei, ti] = ii.toChannels(e.rgba), {
			css: P.toCss($r, ei, ti, N),
			rgba: P.toRgba($r, ei, ti, N)
		};
	}
	e.opacity = a;
	function o(e, t) {
		return N = e.rgba & 255, a(e, N * t / 255);
	}
	e.multiplyOpacity = o;
	function s(e) {
		return [
			e.rgba >> 24 & 255,
			e.rgba >> 16 & 255,
			e.rgba >> 8 & 255
		];
	}
	e.toColorRGB = s;
})(F ||= {});
var I;
((e) => {
	let t, n;
	try {
		let e = document.createElement("canvas");
		e.width = 1, e.height = 1;
		let r = e.getContext("2d", { willReadFrequently: !0 });
		r && (t = r, t.globalCompositeOperation = "copy", n = t.createLinearGradient(0, 0, 1, 1));
	} catch {}
	function r(e) {
		if (e.match(/#[\da-f]{3,8}/i)) switch (e.length) {
			case 4: return $r = parseInt(e.slice(1, 2).repeat(2), 16), ei = parseInt(e.slice(2, 3).repeat(2), 16), ti = parseInt(e.slice(3, 4).repeat(2), 16), P.toColor($r, ei, ti);
			case 5: return $r = parseInt(e.slice(1, 2).repeat(2), 16), ei = parseInt(e.slice(2, 3).repeat(2), 16), ti = parseInt(e.slice(3, 4).repeat(2), 16), N = parseInt(e.slice(4, 5).repeat(2), 16), P.toColor($r, ei, ti, N);
			case 7: return {
				css: e,
				rgba: (parseInt(e.slice(1), 16) << 8 | 255) >>> 0
			};
			case 9: return {
				css: e,
				rgba: parseInt(e.slice(1), 16) >>> 0
			};
		}
		let r = e.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
		if (r) return $r = parseInt(r[1]), ei = parseInt(r[2]), ti = parseInt(r[3]), N = Math.round((r[5] === void 0 ? 1 : parseFloat(r[5])) * 255), P.toColor($r, ei, ti, N);
		if (!t || !n || (t.fillStyle = n, t.fillStyle = e, typeof t.fillStyle != "string") || (t.fillRect(0, 0, 1, 1), [$r, ei, ti, N] = t.getImageData(0, 0, 1, 1).data, N !== 255)) throw Error("css.toColor: Unsupported css format");
		return {
			rgba: P.toRgba($r, ei, ti, N),
			css: e
		};
	}
	e.toColor = r;
})(I ||= {});
var ri;
((e) => {
	function t(e) {
		return n(e >> 16 & 255, e >> 8 & 255, e & 255);
	}
	e.relativeLuminance = t;
	function n(e, t, n) {
		let r = e / 255, i = t / 255, a = n / 255, o = r <= .03928 ? r / 12.92 : ((r + .055) / 1.055) ** 2.4, s = i <= .03928 ? i / 12.92 : ((i + .055) / 1.055) ** 2.4, c = a <= .03928 ? a / 12.92 : ((a + .055) / 1.055) ** 2.4;
		return o * .2126 + s * .7152 + c * .0722;
	}
	e.relativeLuminance2 = n;
})(ri ||= {});
var ii;
((e) => {
	function t(e, t) {
		if (N = (t & 255) / 255, N === 1) return t;
		let n = t >> 24 & 255, r = t >> 16 & 255, i = t >> 8 & 255, a = e >> 24 & 255, o = e >> 16 & 255, s = e >> 8 & 255;
		return $r = a + Math.round((n - a) * N), ei = o + Math.round((r - o) * N), ti = s + Math.round((i - s) * N), P.toRgba($r, ei, ti);
	}
	e.blend = t;
	function n(e, t, n) {
		let a = ri.relativeLuminance(e >> 8), o = ri.relativeLuminance(t >> 8);
		if (oi(a, o) < n) {
			if (o < a) {
				let o = r(e, t, n), s = oi(a, ri.relativeLuminance(o >> 8));
				if (s < n) {
					let r = i(e, t, n);
					return s > oi(a, ri.relativeLuminance(r >> 8)) ? o : r;
				}
				return o;
			}
			let s = i(e, t, n), c = oi(a, ri.relativeLuminance(s >> 8));
			if (c < n) {
				let i = r(e, t, n);
				return c > oi(a, ri.relativeLuminance(i >> 8)) ? s : i;
			}
			return s;
		}
	}
	e.ensureContrastRatio = n;
	function r(e, t, n) {
		let r = e >> 24 & 255, i = e >> 16 & 255, a = e >> 8 & 255, o = t >> 24 & 255, s = t >> 16 & 255, c = t >> 8 & 255, l = oi(ri.relativeLuminance2(o, s, c), ri.relativeLuminance2(r, i, a));
		for (; l < n && (o > 0 || s > 0 || c > 0);) o -= Math.max(0, Math.ceil(o * .1)), s -= Math.max(0, Math.ceil(s * .1)), c -= Math.max(0, Math.ceil(c * .1)), l = oi(ri.relativeLuminance2(o, s, c), ri.relativeLuminance2(r, i, a));
		return (o << 24 | s << 16 | c << 8 | 255) >>> 0;
	}
	e.reduceLuminance = r;
	function i(e, t, n) {
		let r = e >> 24 & 255, i = e >> 16 & 255, a = e >> 8 & 255, o = t >> 24 & 255, s = t >> 16 & 255, c = t >> 8 & 255, l = oi(ri.relativeLuminance2(o, s, c), ri.relativeLuminance2(r, i, a));
		for (; l < n && (o < 255 || s < 255 || c < 255);) o = Math.min(255, o + Math.ceil((255 - o) * .1)), s = Math.min(255, s + Math.ceil((255 - s) * .1)), c = Math.min(255, c + Math.ceil((255 - c) * .1)), l = oi(ri.relativeLuminance2(o, s, c), ri.relativeLuminance2(r, i, a));
		return (o << 24 | s << 16 | c << 8 | 255) >>> 0;
	}
	e.increaseLuminance = i;
	function a(e) {
		return [
			e >> 24 & 255,
			e >> 16 & 255,
			e >> 8 & 255,
			e & 255
		];
	}
	e.toChannels = a;
})(ii ||= {});
function ai(e) {
	let t = e.toString(16);
	return t.length < 2 ? "0" + t : t;
}
function oi(e, t) {
	return e < t ? (t + .05) / (e + .05) : (e + .05) / (t + .05);
}
var si = class extends ge {
	constructor(e, t, n) {
		super(), this.content = 0, this.combinedData = "", this.fg = e.fg, this.bg = e.bg, this.combinedData = t, this._width = n;
	}
	isCombined() {
		return 2097152;
	}
	getWidth() {
		return this._width;
	}
	getChars() {
		return this.combinedData;
	}
	getCode() {
		return 2097151;
	}
	setFromCharData(e) {
		throw Error("not implemented");
	}
	getAsCharData() {
		return [
			this.fg,
			this.getChars(),
			this.getWidth(),
			this.getCode()
		];
	}
}, ci = class {
	constructor(e) {
		this._bufferService = e, this._characterJoiners = [], this._nextCharacterJoinerId = 0, this._workCell = new T();
	}
	register(e) {
		let t = {
			id: this._nextCharacterJoinerId++,
			handler: e
		};
		return this._characterJoiners.push(t), t.id;
	}
	deregister(e) {
		for (let t = 0; t < this._characterJoiners.length; t++) if (this._characterJoiners[t].id === e) return this._characterJoiners.splice(t, 1), !0;
		return !1;
	}
	getJoinedCharacters(e) {
		if (this._characterJoiners.length === 0) return [];
		let t = this._bufferService.buffer.lines.get(e);
		if (!t || t.length === 0) return [];
		let n = [], r = t.translateToString(!0), i = 0, a = 0, o = 0, s = t.getFg(0), c = t.getBg(0);
		for (let e = 0; e < t.getTrimmedLength(); e++) if (t.loadCell(e, this._workCell), this._workCell.getWidth() !== 0) {
			if (this._workCell.fg !== s || this._workCell.bg !== c) {
				if (e - i > 1) {
					let e = this._getJoinedRanges(r, o, a, t, i);
					for (let t = 0; t < e.length; t++) n.push(e[t]);
				}
				i = e, o = a, s = this._workCell.fg, c = this._workCell.bg;
			}
			a += this._workCell.getChars().length || he.length;
		}
		if (this._bufferService.cols - i > 1) {
			let e = this._getJoinedRanges(r, o, a, t, i);
			for (let t = 0; t < e.length; t++) n.push(e[t]);
		}
		return n;
	}
	_getJoinedRanges(e, t, n, r, i) {
		let a = e.substring(t, n), o = [];
		try {
			o = this._characterJoiners[0].handler(a);
		} catch (e) {
			console.error(e);
		}
		for (let e = 1; e < this._characterJoiners.length; e++) try {
			let t = this._characterJoiners[e].handler(a);
			for (let e = 0; e < t.length; e++) ci._mergeRanges(o, t[e]);
		} catch (e) {
			console.error(e);
		}
		return this._stringRangesToCellRanges(o, r, i), o;
	}
	_stringRangesToCellRanges(e, t, n) {
		let r = 0, i = !1, a = 0, o = e[r];
		if (o) {
			for (let s = n; s < this._bufferService.cols; s++) {
				let n = t.getWidth(s), c = t.getString(s).length || he.length;
				if (n !== 0) {
					if (!i && o[0] <= a && (o[0] = s, i = !0), o[1] <= a) {
						if (o[1] = s, o = e[++r], !o) break;
						o[0] <= a ? (o[0] = s, i = !0) : i = !1;
					}
					a += c;
				}
			}
			o && (o[1] = this._bufferService.cols);
		}
	}
	static _mergeRanges(e, t) {
		let n = !1;
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (n) {
				if (t[1] <= i[0]) return e[r - 1][1] = t[1], e;
				if (t[1] <= i[1]) return e[r - 1][1] = Math.max(t[1], i[1]), e.splice(r, 1), e;
				e.splice(r, 1), r--;
			} else {
				if (t[1] <= i[0]) return e.splice(r, 0, t), e;
				if (t[1] <= i[1]) return i[0] = Math.min(t[0], i[0]), e;
				t[0] < i[1] && (i[0] = Math.min(t[0], i[0]), n = !0);
				continue;
			}
		}
		return n ? e[e.length - 1][1] = t[1] : e.push(t), e;
	}
};
ci = x([S(0, Ce)], ci);
function li(e) {
	return 57508 <= e && e <= 57558;
}
function ui(e) {
	return 9472 <= e && e <= 9631;
}
function di(e) {
	return li(e) || ui(e);
}
function fi() {
	return {
		css: {
			canvas: pi(),
			cell: pi()
		},
		device: {
			canvas: pi(),
			cell: pi(),
			char: {
				width: 0,
				height: 0,
				left: 0,
				top: 0
			}
		}
	};
}
function pi() {
	return {
		width: 0,
		height: 0
	};
}
var mi = class {
	constructor(e, t, n, r, i, a, o) {
		this._document = e, this._characterJoinerService = t, this._optionsService = n, this._coreBrowserService = r, this._coreService = i, this._decorationService = a, this._themeService = o, this._workCell = new T(), this._columnSelectMode = !1, this.defaultSpacing = 0;
	}
	handleSelectionChanged(e, t, n) {
		this._selectionStart = e, this._selectionEnd = t, this._columnSelectMode = n;
	}
	createRow(e, t, n, r, i, a, o, s, c, l, u) {
		let d = [], f = this._characterJoinerService.getJoinedCharacters(t), p = this._themeService.colors, m = e.getNoBgTrimmedLength();
		n && m < a + 1 && (m = a + 1);
		let h, g = 0, _ = "", v = 0, y = 0, ee = 0, b = 0, x = !1, S = 0, te = !1, ne = 0, re = 0, C = [], ie = l !== -1 && u !== -1;
		for (let ae = 0; ae < m; ae++) {
			e.loadCell(ae, this._workCell);
			let m = this._workCell.getWidth();
			if (m === 0) continue;
			let oe = !1, se = ae >= re, ce = ae, w = this._workCell;
			if (f.length > 0 && ae === f[0][0] && se) {
				let r = f.shift(), i = this._isCellInSelection(r[0], t);
				for (v = r[0] + 1; v < r[1]; v++) se &&= i === this._isCellInSelection(v, t);
				se &&= !n || a < r[0] || a >= r[1], se ? (oe = !0, w = new si(this._workCell, e.translateToString(!0, r[0], r[1]), r[1] - r[0]), ce = r[1] - 1, m = w.getWidth()) : re = r[1];
			}
			let le = this._isCellInSelection(ae, t), ue = n && ae === a, de = ie && ae >= l && ae <= u, fe = !1;
			this._decorationService.forEachDecorationAtCell(ae, t, void 0, (e) => {
				fe = !0;
			});
			let pe = w.getChars() || he;
			if (pe === " " && (w.isUnderline() || w.isOverline()) && (pe = "\xA0"), ne = m * s - c.get(pe, w.isBold(), w.isItalic()), !h) h = this._document.createElement("span");
			else if (g && (le && te || !le && !te && w.bg === y) && (le && te && p.selectionForeground || w.fg === ee) && w.extended.ext === b && de === x && ne === S && !ue && !oe && !fe && se) {
				w.isInvisible() ? _ += he : _ += pe, g++;
				continue;
			} else g && (h.textContent = _), h = this._document.createElement("span"), g = 0, _ = "";
			if (y = w.bg, ee = w.fg, b = w.extended.ext, x = de, S = ne, te = le, oe && a >= ae && a <= ce && (a = ae), !this._coreService.isCursorHidden && ue && this._coreService.isCursorInitialized) {
				if (C.push("xterm-cursor"), this._coreBrowserService.isFocused) o && C.push("xterm-cursor-blink"), C.push(r === "bar" ? "xterm-cursor-bar" : r === "underline" ? "xterm-cursor-underline" : "xterm-cursor-block");
				else if (i) switch (i) {
					case "outline":
						C.push("xterm-cursor-outline");
						break;
					case "block":
						C.push("xterm-cursor-block");
						break;
					case "bar":
						C.push("xterm-cursor-bar");
						break;
					case "underline": C.push("xterm-cursor-underline");
				}
			}
			if (w.isBold() && C.push("xterm-bold"), w.isItalic() && C.push("xterm-italic"), w.isDim() && C.push("xterm-dim"), _ = w.isInvisible() ? he : w.getChars() || he, w.isUnderline() && (C.push(`xterm-underline-${w.extended.underlineStyle}`), _ === " " && (_ = "\xA0"), !w.isUnderlineColorDefault())) {
				if (w.isUnderlineColorRGB()) h.style.textDecorationColor = `rgb(${ge.toColorRGB(w.getUnderlineColor()).join(",")})`;
				else {
					let e = w.getUnderlineColor();
					this._optionsService.rawOptions.drawBoldTextInBrightColors && w.isBold() && e < 8 && (e += 8), h.style.textDecorationColor = p.ansi[e].css;
				}
			}
			w.isOverline() && (C.push("xterm-overline"), _ === " " && (_ = "\xA0")), w.isStrikethrough() && C.push("xterm-strikethrough"), de && (h.style.textDecoration = "underline");
			let me = w.getFgColor(), _e = w.getFgColorMode(), T = w.getBgColor(), ve = w.getBgColorMode(), ye = !!w.isInverse();
			if (ye) {
				let e = me;
				me = T, T = e;
				let t = _e;
				_e = ve, ve = t;
			}
			let be, xe, E = !1;
			this._decorationService.forEachDecorationAtCell(ae, t, void 0, (e) => {
				e.options.layer !== "top" && E || (e.backgroundColorRGB && (ve = 50331648, T = e.backgroundColorRGB.rgba >> 8 & 16777215, be = e.backgroundColorRGB), e.foregroundColorRGB && (_e = 50331648, me = e.foregroundColorRGB.rgba >> 8 & 16777215, xe = e.foregroundColorRGB), E = e.options.layer === "top");
			}), !E && le && (be = this._coreBrowserService.isFocused ? p.selectionBackgroundOpaque : p.selectionInactiveBackgroundOpaque, T = be.rgba >> 8 & 16777215, ve = 50331648, E = !0, p.selectionForeground && (_e = 50331648, me = p.selectionForeground.rgba >> 8 & 16777215, xe = p.selectionForeground)), E && C.push("xterm-decoration-top");
			let Se;
			switch (ve) {
				case 16777216:
				case 33554432:
					Se = p.ansi[T], C.push(`xterm-bg-${T}`);
					break;
				case 50331648:
					Se = P.toColor(T >> 16, T >> 8 & 255, T & 255), this._addStyle(h, `background-color:#${hi((T >>> 0).toString(16), "0", 6)}`);
					break;
				default: ye ? (Se = p.foreground, C.push("xterm-bg-257")) : Se = p.background;
			}
			switch (be || w.isDim() && (be = F.multiplyOpacity(Se, .5)), _e) {
				case 16777216:
				case 33554432:
					w.isBold() && me < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && (me += 8), this._applyMinimumContrast(h, Se, p.ansi[me], w, be, void 0) || C.push(`xterm-fg-${me}`);
					break;
				case 50331648:
					let e = P.toColor(me >> 16 & 255, me >> 8 & 255, me & 255);
					this._applyMinimumContrast(h, Se, e, w, be, xe) || this._addStyle(h, `color:#${hi(me.toString(16), "0", 6)}`);
					break;
				default: this._applyMinimumContrast(h, Se, p.foreground, w, be, xe) || ye && C.push("xterm-fg-257");
			}
			C.length &&= (h.className = C.join(" "), 0), !ue && !oe && !fe && se ? g++ : h.textContent = _, ne !== this.defaultSpacing && (h.style.letterSpacing = `${ne}px`), d.push(h), ae = ce;
		}
		return h && g && (h.textContent = _), d;
	}
	_applyMinimumContrast(e, t, n, r, i, a) {
		if (this._optionsService.rawOptions.minimumContrastRatio === 1 || di(r.getCode())) return !1;
		let o = this._getContrastCache(r), s;
		if (!i && !a && (s = o.getColor(t.rgba, n.rgba)), s === void 0) {
			let e = this._optionsService.rawOptions.minimumContrastRatio / (r.isDim() ? 2 : 1);
			s = F.ensureContrastRatio(i || t, a || n, e), o.setColor((i || t).rgba, (a || n).rgba, s ?? null);
		}
		return s ? (this._addStyle(e, `color:${s.css}`), !0) : !1;
	}
	_getContrastCache(e) {
		return e.isDim() ? this._themeService.colors.halfContrastCache : this._themeService.colors.contrastCache;
	}
	_addStyle(e, t) {
		e.setAttribute("style", `${e.getAttribute("style") || ""}${t};`);
	}
	_isCellInSelection(e, t) {
		let n = this._selectionStart, r = this._selectionEnd;
		return !n || !r ? !1 : this._columnSelectMode ? n[0] <= r[0] ? e >= n[0] && t >= n[1] && e < r[0] && t <= r[1] : e < n[0] && t >= n[1] && e >= r[0] && t <= r[1] : t > n[1] && t < r[1] || n[1] === r[1] && t === n[1] && e >= n[0] && e < r[0] || n[1] < r[1] && t === r[1] && e < r[0] || n[1] < r[1] && t === n[1] && e >= n[0];
	}
};
mi = x([
	S(1, Be),
	S(2, ke),
	S(3, Ie),
	S(4, Te),
	S(5, Me),
	S(6, Ve)
], mi);
function hi(e, t, n) {
	for (; e.length < n;) e = t + e;
	return e;
}
var gi = class {
	constructor(e, t) {
		this._flat = /* @__PURE__ */ new Float32Array(256), this._font = "", this._fontSize = 0, this._weight = "normal", this._weightBold = "bold", this._measureElements = [], this._container = e.createElement("div"), this._container.classList.add("xterm-width-cache-measure-container"), this._container.setAttribute("aria-hidden", "true"), this._container.style.whiteSpace = "pre", this._container.style.fontKerning = "none";
		let n = e.createElement("span");
		n.classList.add("xterm-char-measure-element");
		let r = e.createElement("span");
		r.classList.add("xterm-char-measure-element"), r.style.fontWeight = "bold";
		let i = e.createElement("span");
		i.classList.add("xterm-char-measure-element"), i.style.fontStyle = "italic";
		let a = e.createElement("span");
		a.classList.add("xterm-char-measure-element"), a.style.fontWeight = "bold", a.style.fontStyle = "italic", this._measureElements = [
			n,
			r,
			i,
			a
		], this._container.appendChild(n), this._container.appendChild(r), this._container.appendChild(i), this._container.appendChild(a), t.appendChild(this._container), this.clear();
	}
	dispose() {
		this._container.remove(), this._measureElements.length = 0, this._holey = void 0;
	}
	clear() {
		this._flat.fill(-9999), this._holey = /* @__PURE__ */ new Map();
	}
	setFont(e, t, n, r) {
		e === this._font && t === this._fontSize && n === this._weight && r === this._weightBold || (this._font = e, this._fontSize = t, this._weight = n, this._weightBold = r, this._container.style.fontFamily = this._font, this._container.style.fontSize = `${this._fontSize}px`, this._measureElements[0].style.fontWeight = `${n}`, this._measureElements[1].style.fontWeight = `${r}`, this._measureElements[2].style.fontWeight = `${n}`, this._measureElements[3].style.fontWeight = `${r}`, this.clear());
	}
	get(e, t, n) {
		let r = 0;
		if (!t && !n && e.length === 1 && (r = e.charCodeAt(0)) < 256) {
			if (this._flat[r] !== -9999) return this._flat[r];
			let t = this._measure(e, 0);
			return t > 0 && (this._flat[r] = t), t;
		}
		let i = e;
		t && (i += "B"), n && (i += "I");
		let a = this._holey.get(i);
		if (a === void 0) {
			let r = 0;
			t && (r |= 1), n && (r |= 2), a = this._measure(e, r), a > 0 && this._holey.set(i, a);
		}
		return a;
	}
	_measure(e, t) {
		let n = this._measureElements[t];
		return n.textContent = e.repeat(32), n.offsetWidth / 32;
	}
}, _i = class {
	constructor() {
		this.clear();
	}
	clear() {
		this.hasSelection = !1, this.columnSelectMode = !1, this.viewportStartRow = 0, this.viewportEndRow = 0, this.viewportCappedStartRow = 0, this.viewportCappedEndRow = 0, this.startCol = 0, this.endCol = 0, this.selectionStart = void 0, this.selectionEnd = void 0;
	}
	update(e, t, n, r = !1) {
		if (this.selectionStart = t, this.selectionEnd = n, !t || !n || t[0] === n[0] && t[1] === n[1]) {
			this.clear();
			return;
		}
		let i = e.buffers.active.ydisp, a = t[1] - i, o = n[1] - i, s = Math.max(a, 0), c = Math.min(o, e.rows - 1);
		s >= e.rows || c < 0 ? this.clear() : (this.hasSelection = !0, this.columnSelectMode = r, this.viewportStartRow = a, this.viewportEndRow = o, this.viewportCappedStartRow = s, this.viewportCappedEndRow = c, this.startCol = t[0], this.endCol = n[0]);
	}
	isCellSelected(e, t, n) {
		return this.hasSelection ? (n -= e.buffer.active.viewportY, this.columnSelectMode ? this.startCol <= this.endCol ? t >= this.startCol && n >= this.viewportCappedStartRow && t < this.endCol && n <= this.viewportCappedEndRow : t < this.startCol && n >= this.viewportCappedStartRow && t >= this.endCol && n <= this.viewportCappedEndRow : n > this.viewportStartRow && n < this.viewportEndRow || this.viewportStartRow === this.viewportEndRow && n === this.viewportStartRow && t >= this.startCol && t < this.endCol || this.viewportStartRow < this.viewportEndRow && n === this.viewportEndRow && t < this.endCol || this.viewportStartRow < this.viewportEndRow && n === this.viewportStartRow && t >= this.startCol) : !1;
	}
};
function vi() {
	return new _i();
}
var yi = "xterm-dom-renderer-owner-", bi = "xterm-rows", xi = "xterm-fg-", Si = "xterm-bg-", Ci = "xterm-focus", wi = "xterm-selection", Ti = 1, Ei = class extends O {
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		super(), this._terminal = e, this._document = t, this._element = n, this._screenElement = r, this._viewportElement = i, this._helperContainer = a, this._linkifier2 = o, this._charSizeService = c, this._optionsService = l, this._bufferService = u, this._coreService = d, this._coreBrowserService = f, this._themeService = p, this._terminalClass = Ti++, this._rowElements = [], this._selectionRenderModel = vi(), this.onRequestRedraw = this._register(new A()).event, this._rowContainer = this._document.createElement("div"), this._rowContainer.classList.add(bi), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = this._document.createElement("div"), this._selectionContainer.classList.add(wi), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = fi(), this._updateDimensions(), this._register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this._register(this._themeService.onChangeColors((e) => this._injectCss(e))), this._injectCss(this._themeService.colors), this._rowFactory = s.createInstance(mi, document), this._element.classList.add(yi + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this._register(this._linkifier2.onShowLinkUnderline((e) => this._handleLinkHover(e))), this._register(this._linkifier2.onHideLinkUnderline((e) => this._handleLinkLeave(e))), this._register(D(() => {
			this._element.classList.remove(yi + this._terminalClass), this._rowContainer.remove(), this._selectionContainer.remove(), this._widthCache.dispose(), this._themeStyleElement.remove(), this._dimensionsStyleElement.remove();
		})), this._widthCache = new gi(this._document, this._helperContainer), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
	}
	_updateDimensions() {
		let e = this._coreBrowserService.dpr;
		this.dimensions.device.char.width = this._charSizeService.width * e, this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * e), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.left = 0, this.dimensions.device.char.top = 0, this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols, this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows, this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / e), this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / e), this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols, this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
		for (let e of this._rowElements) e.style.width = `${this.dimensions.css.canvas.width}px`, e.style.height = `${this.dimensions.css.cell.height}px`, e.style.lineHeight = `${this.dimensions.css.cell.height}px`, e.style.overflow = "hidden";
		this._dimensionsStyleElement || (this._dimensionsStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
		let t = `${this._terminalSelector} .${bi} span { display: inline-block; height: 100%; vertical-align: top;}`;
		this._dimensionsStyleElement.textContent = t, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
	}
	_injectCss(e) {
		this._themeStyleElement || (this._themeStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
		let t = `${this._terminalSelector} .${bi} { pointer-events: none; color: ${e.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
		t += `${this._terminalSelector} .${bi} .xterm-dim { color: ${F.multiplyOpacity(e.foreground, .5).css};}`, t += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;
		let n = `blink_underline_${this._terminalClass}`, r = `blink_bar_${this._terminalClass}`, i = `blink_block_${this._terminalClass}`;
		t += `@keyframes ${n} { 50% {  border-bottom-style: hidden; }}`, t += `@keyframes ${r} { 50% {  box-shadow: none; }}`, t += `@keyframes ${i} { 0% {  background-color: ${e.cursor.css};  color: ${e.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${e.cursor.css}; }}`, t += `${this._terminalSelector} .${bi}.${Ci} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${n} 1s step-end infinite;}${this._terminalSelector} .${bi}.${Ci} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${r} 1s step-end infinite;}${this._terminalSelector} .${bi}.${Ci} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${i} 1s step-end infinite;}${this._terminalSelector} .${bi} .xterm-cursor.xterm-cursor-block { background-color: ${e.cursor.css}; color: ${e.cursorAccent.css};}${this._terminalSelector} .${bi} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${e.cursor.css} !important; color: ${e.cursorAccent.css} !important;}${this._terminalSelector} .${bi} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${e.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${bi} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${e.cursor.css} inset;}${this._terminalSelector} .${bi} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${e.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`, t += `${this._terminalSelector} .${wi} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${wi} div { position: absolute; background-color: ${e.selectionBackgroundOpaque.css};}${this._terminalSelector} .${wi} div { position: absolute; background-color: ${e.selectionInactiveBackgroundOpaque.css};}`;
		for (let [n, r] of e.ansi.entries()) t += `${this._terminalSelector} .${xi}${n} { color: ${r.css}; }${this._terminalSelector} .${xi}${n}.xterm-dim { color: ${F.multiplyOpacity(r, .5).css}; }${this._terminalSelector} .${Si}${n} { background-color: ${r.css}; }`;
		t += `${this._terminalSelector} .${xi}257 { color: ${F.opaque(e.background).css}; }${this._terminalSelector} .${xi}257.xterm-dim { color: ${F.multiplyOpacity(F.opaque(e.background), .5).css}; }${this._terminalSelector} .${Si}257 { background-color: ${e.foreground.css}; }`, this._themeStyleElement.textContent = t;
	}
	_setDefaultSpacing() {
		let e = this.dimensions.css.cell.width - this._widthCache.get("W", !1, !1);
		this._rowContainer.style.letterSpacing = `${e}px`, this._rowFactory.defaultSpacing = e;
	}
	handleDevicePixelRatioChange() {
		this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
	}
	_refreshRowElements(e, t) {
		for (let e = this._rowElements.length; e <= t; e++) {
			let e = this._document.createElement("div");
			this._rowContainer.appendChild(e), this._rowElements.push(e);
		}
		for (; this._rowElements.length > t;) this._rowContainer.removeChild(this._rowElements.pop());
	}
	handleResize(e, t) {
		this._refreshRowElements(e, t), this._updateDimensions(), this.handleSelectionChanged(this._selectionRenderModel.selectionStart, this._selectionRenderModel.selectionEnd, this._selectionRenderModel.columnSelectMode);
	}
	handleCharSizeChanged() {
		this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
	}
	handleBlur() {
		this._rowContainer.classList.remove(Ci), this.renderRows(0, this._bufferService.rows - 1);
	}
	handleFocus() {
		this._rowContainer.classList.add(Ci), this.renderRows(this._bufferService.buffer.y, this._bufferService.buffer.y);
	}
	handleSelectionChanged(e, t, n) {
		if (this._selectionContainer.replaceChildren(), this._rowFactory.handleSelectionChanged(e, t, n), this.renderRows(0, this._bufferService.rows - 1), !e || !t || (this._selectionRenderModel.update(this._terminal, e, t, n), !this._selectionRenderModel.hasSelection)) return;
		let r = this._selectionRenderModel.viewportStartRow, i = this._selectionRenderModel.viewportEndRow, a = this._selectionRenderModel.viewportCappedStartRow, o = this._selectionRenderModel.viewportCappedEndRow, s = this._document.createDocumentFragment();
		if (n) {
			let n = e[0] > t[0];
			s.appendChild(this._createSelectionElement(a, n ? t[0] : e[0], n ? e[0] : t[0], o - a + 1));
		} else {
			let n = r === a ? e[0] : 0, c = a === i ? t[0] : this._bufferService.cols;
			s.appendChild(this._createSelectionElement(a, n, c));
			let l = o - a - 1;
			if (s.appendChild(this._createSelectionElement(a + 1, 0, this._bufferService.cols, l)), a !== o) {
				let e = i === o ? t[0] : this._bufferService.cols;
				s.appendChild(this._createSelectionElement(o, 0, e));
			}
		}
		this._selectionContainer.appendChild(s);
	}
	_createSelectionElement(e, t, n, r = 1) {
		let i = this._document.createElement("div"), a = t * this.dimensions.css.cell.width, o = this.dimensions.css.cell.width * (n - t);
		return a + o > this.dimensions.css.canvas.width && (o = this.dimensions.css.canvas.width - a), i.style.height = `${r * this.dimensions.css.cell.height}px`, i.style.top = `${e * this.dimensions.css.cell.height}px`, i.style.left = `${a}px`, i.style.width = `${o}px`, i;
	}
	handleCursorMove() {}
	_handleOptionsChanged() {
		this._updateDimensions(), this._injectCss(this._themeService.colors), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
	}
	clear() {
		for (let e of this._rowElements) e.replaceChildren();
	}
	renderRows(e, t) {
		let n = this._bufferService.buffer, r = n.ybase + n.y, i = Math.min(n.x, this._bufferService.cols - 1), a = this._coreService.decPrivateModes.cursorBlink ?? this._optionsService.rawOptions.cursorBlink, o = this._coreService.decPrivateModes.cursorStyle ?? this._optionsService.rawOptions.cursorStyle, s = this._optionsService.rawOptions.cursorInactiveStyle;
		for (let c = e; c <= t; c++) {
			let e = c + n.ydisp, t = this._rowElements[c], l = n.lines.get(e);
			if (!t || !l) break;
			t.replaceChildren(...this._rowFactory.createRow(l, e, e === r, o, s, i, a, this.dimensions.css.cell.width, this._widthCache, -1, -1));
		}
	}
	get _terminalSelector() {
		return `.${yi}${this._terminalClass}`;
	}
	_handleLinkHover(e) {
		this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, !0);
	}
	_handleLinkLeave(e) {
		this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, !1);
	}
	_setCellUnderline(e, t, n, r, i, a) {
		n < 0 && (e = 0), r < 0 && (t = 0);
		let o = this._bufferService.rows - 1;
		n = Math.max(Math.min(n, o), 0), r = Math.max(Math.min(r, o), 0), i = Math.min(i, this._bufferService.cols);
		let s = this._bufferService.buffer, c = s.ybase + s.y, l = Math.min(s.x, i - 1), u = this._optionsService.rawOptions.cursorBlink, d = this._optionsService.rawOptions.cursorStyle, f = this._optionsService.rawOptions.cursorInactiveStyle;
		for (let o = n; o <= r; ++o) {
			let p = o + s.ydisp, m = this._rowElements[o], h = s.lines.get(p);
			if (!m || !h) break;
			m.replaceChildren(...this._rowFactory.createRow(h, p, p === c, d, f, l, u, this.dimensions.css.cell.width, this._widthCache, a ? o === n ? e : 0 : -1, a ? (o === r ? t : i) - 1 : -1));
		}
	}
};
Ei = x([
	S(7, De),
	S(8, Fe),
	S(9, ke),
	S(10, Ce),
	S(11, Te),
	S(12, Ie),
	S(13, Ve)
], Ei);
var Di = class extends O {
	constructor(e, t, n) {
		super(), this._optionsService = n, this.width = 0, this.height = 0, this._onCharSizeChange = this._register(new A()), this.onCharSizeChange = this._onCharSizeChange.event;
		try {
			this._measureStrategy = this._register(new Ai(this._optionsService));
		} catch {
			this._measureStrategy = this._register(new ki(e, t, this._optionsService));
		}
		this._register(this._optionsService.onMultipleOptionChange(["fontFamily", "fontSize"], () => this.measure()));
	}
	get hasValidSize() {
		return this.width > 0 && this.height > 0;
	}
	measure() {
		let e = this._measureStrategy.measure();
		(e.width !== this.width || e.height !== this.height) && (this.width = e.width, this.height = e.height, this._onCharSizeChange.fire());
	}
};
Di = x([S(2, ke)], Di);
var Oi = class extends O {
	constructor() {
		super(...arguments), this._result = {
			width: 0,
			height: 0
		};
	}
	_validateAndSet(e, t) {
		e !== void 0 && e > 0 && t !== void 0 && t > 0 && (this._result.width = e, this._result.height = t);
	}
}, ki = class extends Oi {
	constructor(e, t, n) {
		super(), this._document = e, this._parentElement = t, this._optionsService = n, this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W".repeat(32), this._measureElement.setAttribute("aria-hidden", "true"), this._measureElement.style.whiteSpace = "pre", this._measureElement.style.fontKerning = "none", this._parentElement.appendChild(this._measureElement);
	}
	measure() {
		return this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`, this._validateAndSet(Number(this._measureElement.offsetWidth) / 32, Number(this._measureElement.offsetHeight)), this._result;
	}
}, Ai = class extends Oi {
	constructor(e) {
		super(), this._optionsService = e, this._canvas = new OffscreenCanvas(100, 100), this._ctx = this._canvas.getContext("2d");
		let t = this._ctx.measureText("W");
		if (!("width" in t && "fontBoundingBoxAscent" in t && "fontBoundingBoxDescent" in t)) throw Error("Required font metrics not supported");
	}
	measure() {
		this._ctx.font = `${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;
		let e = this._ctx.measureText("W");
		return this._validateAndSet(e.width, e.fontBoundingBoxAscent + e.fontBoundingBoxDescent), this._result;
	}
}, ji = class extends O {
	constructor(e, t, n) {
		super(), this._textarea = e, this._window = t, this.mainDocument = n, this._isFocused = !1, this._cachedIsFocused = void 0, this._screenDprMonitor = this._register(new Mi(this._window)), this._onDprChange = this._register(new A()), this.onDprChange = this._onDprChange.event, this._onWindowChange = this._register(new A()), this.onWindowChange = this._onWindowChange.event, this._register(this.onWindowChange((e) => this._screenDprMonitor.setWindow(e))), this._register(_t.forward(this._screenDprMonitor.onDprChange, this._onDprChange)), this._register(j(this._textarea, "focus", () => this._isFocused = !0)), this._register(j(this._textarea, "blur", () => this._isFocused = !1));
	}
	get window() {
		return this._window;
	}
	set window(e) {
		this._window !== e && (this._window = e, this._onWindowChange.fire(this._window));
	}
	get dpr() {
		return this.window.devicePixelRatio;
	}
	get isFocused() {
		return this._cachedIsFocused === void 0 && (this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus(), queueMicrotask(() => this._cachedIsFocused = void 0)), this._cachedIsFocused;
	}
}, Mi = class extends O {
	constructor(e) {
		super(), this._parentWindow = e, this._windowResizeListener = this._register(new dt()), this._onDprChange = this._register(new A()), this.onDprChange = this._onDprChange.event, this._outerListener = () => this._setDprAndFireIfDiffers(), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._updateDpr(), this._setWindowResizeListener(), this._register(D(() => this.clearListener()));
	}
	setWindow(e) {
		this._parentWindow = e, this._setWindowResizeListener(), this._setDprAndFireIfDiffers();
	}
	_setWindowResizeListener() {
		this._windowResizeListener.value = j(this._parentWindow, "resize", () => this._setDprAndFireIfDiffers());
	}
	_setDprAndFireIfDiffers() {
		this._parentWindow.devicePixelRatio !== this._currentDevicePixelRatio && this._onDprChange.fire(this._parentWindow.devicePixelRatio), this._updateDpr();
	}
	_updateDpr() {
		this._outerListener && (this._resolutionMediaMatchList?.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
	}
	clearListener() {
		!this._resolutionMediaMatchList || !this._outerListener || (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = void 0, this._outerListener = void 0);
	}
}, Ni = class extends O {
	constructor() {
		super(), this.linkProviders = [], this._register(D(() => this.linkProviders.length = 0));
	}
	registerLinkProvider(e) {
		return this.linkProviders.push(e), { dispose: () => {
			let t = this.linkProviders.indexOf(e);
			t !== -1 && this.linkProviders.splice(t, 1);
		} };
	}
};
function Pi(e, t, n) {
	let r = n.getBoundingClientRect(), i = e.getComputedStyle(n), a = parseInt(i.getPropertyValue("padding-left")), o = parseInt(i.getPropertyValue("padding-top"));
	return [t.clientX - r.left - a, t.clientY - r.top - o];
}
function Fi(e, t, n, r, i, a, o, s, c) {
	if (!a) return;
	let l = Pi(e, t, n);
	if (l) return l[0] = Math.ceil((l[0] + (c ? o / 2 : 0)) / o), l[1] = Math.ceil(l[1] / s), l[0] = Math.min(Math.max(l[0], 1), r + +!!c), l[1] = Math.min(Math.max(l[1], 1), i), l;
}
var Ii = class {
	constructor(e, t) {
		this._renderService = e, this._charSizeService = t;
	}
	getCoords(e, t, n, r, i) {
		return Fi(window, e, t, n, r, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, i);
	}
	getMouseReportCoords(e, t) {
		let n = Pi(window, e, t);
		if (this._charSizeService.hasValidSize) return n[0] = Math.min(Math.max(n[0], 0), this._renderService.dimensions.css.canvas.width - 1), n[1] = Math.min(Math.max(n[1], 0), this._renderService.dimensions.css.canvas.height - 1), {
			col: Math.floor(n[0] / this._renderService.dimensions.css.cell.width),
			row: Math.floor(n[1] / this._renderService.dimensions.css.cell.height),
			x: Math.floor(n[0]),
			y: Math.floor(n[1])
		};
	}
};
Ii = x([S(0, Re), S(1, Fe)], Ii);
var Li = class {
	constructor(e, t) {
		this._renderCallback = e, this._coreBrowserService = t, this._refreshCallbacks = [];
	}
	dispose() {
		this._animationFrame &&= (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame), void 0);
	}
	addRefreshCallback(e) {
		return this._refreshCallbacks.push(e), this._animationFrame ||= this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh()), this._animationFrame;
	}
	refresh(e, t, n) {
		this._rowCount = n, e = e === void 0 ? 0 : e, t = t === void 0 ? this._rowCount - 1 : t, this._rowStart = this._rowStart === void 0 ? e : Math.min(this._rowStart, e), this._rowEnd = this._rowEnd === void 0 ? t : Math.max(this._rowEnd, t), !this._animationFrame && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh()));
	}
	_innerRefresh() {
		if (this._animationFrame = void 0, this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0) {
			this._runRefreshCallbacks();
			return;
		}
		let e = Math.max(this._rowStart, 0), t = Math.min(this._rowEnd, this._rowCount - 1);
		this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(e, t), this._runRefreshCallbacks();
	}
	_runRefreshCallbacks() {
		for (let e of this._refreshCallbacks) e(0);
		this._refreshCallbacks = [];
	}
}, Ri = {};
b(Ri, {
	getSafariVersion: () => Gi,
	isChromeOS: () => Zi,
	isFirefox: () => Hi,
	isIpad: () => qi,
	isIphone: () => Ji,
	isLegacyEdge: () => Ui,
	isLinux: () => Xi,
	isMac: () => Ki,
	isNode: () => zi,
	isSafari: () => Wi,
	isWindows: () => Yi
});
var zi = typeof process < "u" && "title" in process, Bi = zi ? "node" : navigator.userAgent, Vi = zi ? "node" : navigator.platform, Hi = Bi.includes("Firefox"), Ui = Bi.includes("Edge"), Wi = /^((?!chrome|android).)*safari/i.test(Bi);
function Gi() {
	if (!Wi) return 0;
	let e = Bi.match(/Version\/(\d+)/);
	return e === null || e.length < 2 ? 0 : parseInt(e[1]);
}
var Ki = [
	"Macintosh",
	"MacIntel",
	"MacPPC",
	"Mac68K"
].includes(Vi), qi = Vi === "iPad", Ji = Vi === "iPhone", Yi = [
	"Windows",
	"Win16",
	"Win32",
	"WinCE"
].includes(Vi), Xi = Vi.indexOf("Linux") >= 0, Zi = /\bCrOS\b/.test(Bi), Qi = class {
	constructor() {
		this._tasks = [], this._i = 0;
	}
	enqueue(e) {
		this._tasks.push(e), this._start();
	}
	flush() {
		for (; this._i < this._tasks.length;) this._tasks[this._i]() || this._i++;
		this.clear();
	}
	clear() {
		this._idleCallback &&= (this._cancelCallback(this._idleCallback), void 0), this._i = 0, this._tasks.length = 0;
	}
	_start() {
		this._idleCallback ||= this._requestCallback(this._process.bind(this));
	}
	_process(e) {
		this._idleCallback = void 0;
		let t = 0, n = 0, r = e.timeRemaining(), i = 0;
		for (; this._i < this._tasks.length;) {
			if (t = performance.now(), this._tasks[this._i]() || this._i++, t = Math.max(1, performance.now() - t), n = Math.max(t, n), i = e.timeRemaining(), n * 1.5 > i) {
				r - t < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(r - t))}ms`), this._start();
				return;
			}
			r = i;
		}
		this.clear();
	}
}, $i = class extends Qi {
	_requestCallback(e) {
		return setTimeout(() => e(this._createDeadline(16)));
	}
	_cancelCallback(e) {
		clearTimeout(e);
	}
	_createDeadline(e) {
		let t = performance.now() + e;
		return { timeRemaining: () => Math.max(0, t - performance.now()) };
	}
}, ea = class extends Qi {
	_requestCallback(e) {
		return requestIdleCallback(e);
	}
	_cancelCallback(e) {
		cancelIdleCallback(e);
	}
}, ta = !zi && "requestIdleCallback" in window ? ea : $i, na = class {
	constructor() {
		this._queue = new ta();
	}
	set(e) {
		this._queue.clear(), this._queue.enqueue(e);
	}
	flush() {
		this._queue.flush();
	}
}, ra = class extends O {
	constructor(e, t, n, r, i, a, o, s, c) {
		super(), this._rowCount = e, this._optionsService = n, this._charSizeService = r, this._coreService = i, this._coreBrowserService = s, this._renderer = this._register(new dt()), this._pausedResizeTask = new na(), this._observerDisposable = this._register(new dt()), this._isPaused = !1, this._needsFullRefresh = !1, this._isNextRenderRedrawOnly = !0, this._needsSelectionRefresh = !1, this._canvasWidth = 0, this._canvasHeight = 0, this._selectionState = {
			start: void 0,
			end: void 0,
			columnSelectMode: !1
		}, this._onDimensionsChange = this._register(new A()), this.onDimensionsChange = this._onDimensionsChange.event, this._onRenderedViewportChange = this._register(new A()), this.onRenderedViewportChange = this._onRenderedViewportChange.event, this._onRender = this._register(new A()), this.onRender = this._onRender.event, this._onRefreshRequest = this._register(new A()), this.onRefreshRequest = this._onRefreshRequest.event, this._renderDebouncer = new Li((e, t) => this._renderRows(e, t), this._coreBrowserService), this._register(this._renderDebouncer), this._syncOutputHandler = new ia(this._coreBrowserService, this._coreService, () => this._fullRefresh()), this._register(D(() => this._syncOutputHandler.dispose())), this._register(this._coreBrowserService.onDprChange(() => this.handleDevicePixelRatioChange())), this._register(o.onResize(() => this._fullRefresh())), this._register(o.buffers.onBufferActivate(() => this._renderer.value?.clear())), this._register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this._register(this._charSizeService.onCharSizeChange(() => this.handleCharSizeChanged())), this._register(a.onDecorationRegistered(() => this._fullRefresh())), this._register(a.onDecorationRemoved(() => this._fullRefresh())), this._register(this._optionsService.onMultipleOptionChange([
			"customGlyphs",
			"drawBoldTextInBrightColors",
			"letterSpacing",
			"lineHeight",
			"fontFamily",
			"fontSize",
			"fontWeight",
			"fontWeightBold",
			"minimumContrastRatio",
			"rescaleOverlappingGlyphs"
		], () => {
			this.clear(), this.handleResize(o.cols, o.rows), this._fullRefresh();
		})), this._register(this._optionsService.onMultipleOptionChange(["cursorBlink", "cursorStyle"], () => this.refreshRows(o.buffer.y, o.buffer.y, !0))), this._register(c.onChangeColors(() => this._fullRefresh())), this._registerIntersectionObserver(this._coreBrowserService.window, t), this._register(this._coreBrowserService.onWindowChange((e) => this._registerIntersectionObserver(e, t)));
	}
	get dimensions() {
		return this._renderer.value.dimensions;
	}
	_registerIntersectionObserver(e, t) {
		if ("IntersectionObserver" in e) {
			let n = new e.IntersectionObserver((e) => this._handleIntersectionChange(e[e.length - 1]), { threshold: 0 });
			n.observe(t), this._observerDisposable.value = D(() => n.disconnect());
		}
	}
	_handleIntersectionChange(e) {
		this._isPaused = e.isIntersecting === void 0 ? e.intersectionRatio === 0 : !e.isIntersecting, !this._isPaused && !this._charSizeService.hasValidSize && this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this._pausedResizeTask.flush(), this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = !1);
	}
	refreshRows(e, t, n = !1) {
		if (this._isPaused) {
			this._needsFullRefresh = !0;
			return;
		}
		if (this._coreService.decPrivateModes.synchronizedOutput) {
			this._syncOutputHandler.bufferRows(e, t);
			return;
		}
		let r = this._syncOutputHandler.flush();
		r && (e = Math.min(e, r.start), t = Math.max(t, r.end)), n || (this._isNextRenderRedrawOnly = !1), this._renderDebouncer.refresh(e, t, this._rowCount);
	}
	_renderRows(e, t) {
		if (this._renderer.value) {
			if (this._coreService.decPrivateModes.synchronizedOutput) {
				this._syncOutputHandler.bufferRows(e, t);
				return;
			}
			e = Math.min(e, this._rowCount - 1), t = Math.min(t, this._rowCount - 1), this._renderer.value.renderRows(e, t), this._needsSelectionRefresh &&= (this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), !1), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({
				start: e,
				end: t
			}), this._onRender.fire({
				start: e,
				end: t
			}), this._isNextRenderRedrawOnly = !0;
		}
	}
	resize(e, t) {
		this._rowCount = t, this._fireOnCanvasResize();
	}
	_handleOptionsChanged() {
		this._renderer.value && (this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize());
	}
	_fireOnCanvasResize() {
		this._renderer.value && (this._renderer.value.dimensions.css.canvas.width === this._canvasWidth && this._renderer.value.dimensions.css.canvas.height === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.value.dimensions));
	}
	hasRenderer() {
		return !!this._renderer.value;
	}
	setRenderer(e) {
		this._renderer.value = e, this._renderer.value && (this._renderer.value.onRequestRedraw((e) => this.refreshRows(e.start, e.end, !0)), this._needsSelectionRefresh = !0, this._fullRefresh());
	}
	addRefreshCallback(e) {
		return this._renderDebouncer.addRefreshCallback(e);
	}
	_fullRefresh() {
		this._isPaused ? this._needsFullRefresh = !0 : this.refreshRows(0, this._rowCount - 1);
	}
	clearTextureAtlas() {
		this._renderer.value && (this._renderer.value.clearTextureAtlas?.(), this._fullRefresh());
	}
	handleDevicePixelRatioChange() {
		this._charSizeService.measure(), this._renderer.value && (this._renderer.value.handleDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1));
	}
	handleResize(e, t) {
		this._renderer.value && (this._isPaused ? this._pausedResizeTask.set(() => this._renderer.value?.handleResize(e, t)) : this._renderer.value.handleResize(e, t), this._fullRefresh());
	}
	handleCharSizeChanged() {
		this._renderer.value?.handleCharSizeChanged();
	}
	handleBlur() {
		this._renderer.value?.handleBlur();
	}
	handleFocus() {
		this._renderer.value?.handleFocus();
	}
	handleSelectionChanged(e, t, n) {
		this._selectionState.start = e, this._selectionState.end = t, this._selectionState.columnSelectMode = n, this._renderer.value?.handleSelectionChanged(e, t, n);
	}
	handleCursorMove() {
		this._renderer.value?.handleCursorMove();
	}
	clear() {
		this._renderer.value?.clear();
	}
};
ra = x([
	S(2, ke),
	S(3, Fe),
	S(4, Te),
	S(5, Me),
	S(6, Ce),
	S(7, Ie),
	S(8, Ve)
], ra);
var ia = class {
	constructor(e, t, n) {
		this._coreBrowserService = e, this._coreService = t, this._onTimeout = n, this._start = 0, this._end = 0, this._isBuffering = !1;
	}
	bufferRows(e, t) {
		this._isBuffering ? (this._start = Math.min(this._start, e), this._end = Math.max(this._end, t)) : (this._start = e, this._end = t, this._isBuffering = !0), this._timeout === void 0 && (this._timeout = this._coreBrowserService.window.setTimeout(() => {
			this._timeout = void 0, this._coreService.decPrivateModes.synchronizedOutput = !1, this._onTimeout();
		}, 1e3));
	}
	flush() {
		if (this._timeout !== void 0 && (this._coreBrowserService.window.clearTimeout(this._timeout), this._timeout = void 0), !this._isBuffering) return;
		let e = {
			start: this._start,
			end: this._end
		};
		return this._isBuffering = !1, e;
	}
	dispose() {
		this._timeout !== void 0 && (this._coreBrowserService.window.clearTimeout(this._timeout), this._timeout = void 0);
	}
};
function aa(e, t, n, r) {
	let i = n.buffer.x, a = n.buffer.y;
	if (!n.buffer.hasScrollback) return ca(i, a, e, t, n, r) + la(a, t, n, r) + ua(i, a, e, t, n, r);
	let o;
	if (a === t) return o = i > e ? "D" : "C", _a(Math.abs(i - e), ga(o, r));
	o = a > t ? "D" : "C";
	let s = Math.abs(a - t);
	return _a(sa(a > t ? e : i, n) + (s - 1) * n.cols + 1 + oa(a > t ? i : e, n), ga(o, r));
}
function oa(e, t) {
	return e - 1;
}
function sa(e, t) {
	return t.cols - e;
}
function ca(e, t, n, r, i, a) {
	return la(t, r, i, a).length === 0 ? "" : _a(ha(e, t, e, t - fa(t, i), !1, i).length, ga("D", a));
}
function la(e, t, n, r) {
	let i = e - fa(e, n), a = t - fa(t, n);
	return _a(Math.abs(i - a) - da(e, t, n), ga(ma(e, t), r));
}
function ua(e, t, n, r, i, a) {
	let o;
	o = la(t, r, i, a).length > 0 ? r - fa(r, i) : t;
	let s = r, c = pa(e, t, n, r, i, a);
	return _a(ha(e, o, n, s, c === "C", i).length, ga(c, a));
}
function da(e, t, n) {
	let r = 0, i = e - fa(e, n), a = t - fa(t, n);
	for (let o = 0; o < Math.abs(i - a); o++) {
		let a = ma(e, t) === "A" ? -1 : 1;
		n.buffer.lines.get(i + a * o)?.isWrapped && r++;
	}
	return r;
}
function fa(e, t) {
	let n = 0, r = t.buffer.lines.get(e), i = r?.isWrapped;
	for (; i && e >= 0 && e < t.rows;) n++, r = t.buffer.lines.get(--e), i = r?.isWrapped;
	return n;
}
function pa(e, t, n, r, i, a) {
	let o;
	return o = la(n, r, i, a).length > 0 ? r - fa(r, i) : t, e < n && o <= r || e >= n && o < r ? "C" : "D";
}
function ma(e, t) {
	return e > t ? "A" : "B";
}
function ha(e, t, n, r, i, a) {
	let o = e, s = t, c = "";
	for (; (o !== n || s !== r) && s >= 0 && s < a.buffer.lines.length;) o += i ? 1 : -1, i && o > a.cols - 1 ? (c += a.buffer.translateBufferLineToString(s, !1, e, o), o = 0, e = 0, s++) : !i && o < 0 && (c += a.buffer.translateBufferLineToString(s, !1, 0, e + 1), o = a.cols - 1, e = o, s--);
	return c + a.buffer.translateBufferLineToString(s, !1, e, o);
}
function ga(e, t) {
	let n = t ? "O" : "[";
	return M.ESC + n + e;
}
function _a(e, t) {
	e = Math.floor(e);
	let n = "";
	for (let r = 0; r < e; r++) n += t;
	return n;
}
var va = class {
	constructor(e) {
		this._bufferService = e, this.isSelectAllActive = !1, this.selectionStartLength = 0;
	}
	clearSelection() {
		this.selectionStart = void 0, this.selectionEnd = void 0, this.isSelectAllActive = !1, this.selectionStartLength = 0;
	}
	get finalSelectionStart() {
		return this.isSelectAllActive ? [0, 0] : !this.selectionEnd || !this.selectionStart ? this.selectionStart : this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
	}
	get finalSelectionEnd() {
		if (this.isSelectAllActive) return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
		if (this.selectionStart) {
			if (!this.selectionEnd || this.areSelectionValuesReversed()) {
				let e = this.selectionStart[0] + this.selectionStartLength;
				return e > this._bufferService.cols ? e % this._bufferService.cols === 0 ? [this._bufferService.cols, this.selectionStart[1] + Math.floor(e / this._bufferService.cols) - 1] : [e % this._bufferService.cols, this.selectionStart[1] + Math.floor(e / this._bufferService.cols)] : [e, this.selectionStart[1]];
			}
			if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
				let e = this.selectionStart[0] + this.selectionStartLength;
				return e > this._bufferService.cols ? [e % this._bufferService.cols, this.selectionStart[1] + Math.floor(e / this._bufferService.cols)] : [Math.max(e, this.selectionEnd[0]), this.selectionEnd[1]];
			}
			return this.selectionEnd;
		}
	}
	areSelectionValuesReversed() {
		let e = this.selectionStart, t = this.selectionEnd;
		return !e || !t ? !1 : e[1] > t[1] || e[1] === t[1] && e[0] > t[0];
	}
	handleTrim(e) {
		return this.selectionStart && (this.selectionStart[1] -= e), this.selectionEnd && (this.selectionEnd[1] -= e), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), !0) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), !1);
	}
};
function ya(e, t) {
	if (e.start.y > e.end.y) throw Error(`Buffer range end (${e.end.x}, ${e.end.y}) cannot be before start (${e.start.x}, ${e.start.y})`);
	return t * (e.end.y - e.start.y) + (e.end.x - e.start.x + 1);
}
var ba = 50, xa = 15, Sa = 50, Ca = 500, wa = /* @__PURE__ */ RegExp("\xA0", "g"), Ta = class extends O {
	constructor(e, t, n, r, i, a, o, s, c) {
		super(), this._element = e, this._screenElement = t, this._linkifier = n, this._bufferService = r, this._coreService = i, this._mouseService = a, this._optionsService = o, this._renderService = s, this._coreBrowserService = c, this._dragScrollAmount = 0, this._enabled = !0, this._workCell = new T(), this._mouseDownTimeStamp = 0, this._oldHasSelection = !1, this._oldSelectionStart = void 0, this._oldSelectionEnd = void 0, this._onLinuxMouseSelection = this._register(new A()), this.onLinuxMouseSelection = this._onLinuxMouseSelection.event, this._onRedrawRequest = this._register(new A()), this.onRequestRedraw = this._onRedrawRequest.event, this._onSelectionChange = this._register(new A()), this.onSelectionChange = this._onSelectionChange.event, this._onRequestScrollLines = this._register(new A()), this.onRequestScrollLines = this._onRequestScrollLines.event, this._mouseMoveListener = (e) => this._handleMouseMove(e), this._mouseUpListener = (e) => this._handleMouseUp(e), this._coreService.onUserInput(() => {
			this.hasSelection && this.clearSelection();
		}), this._trimListener = this._bufferService.buffer.lines.onTrim((e) => this._handleTrim(e)), this._register(this._bufferService.buffers.onBufferActivate((e) => this._handleBufferActivate(e))), this.enable(), this._model = new va(this._bufferService), this._activeSelectionMode = 0, this._register(D(() => {
			this._removeMouseDownListeners();
		})), this._register(this._bufferService.onResize((e) => {
			e.rowsChanged && this.clearSelection();
		}));
	}
	reset() {
		this.clearSelection();
	}
	disable() {
		this.clearSelection(), this._enabled = !1;
	}
	enable() {
		this._enabled = !0;
	}
	get selectionStart() {
		return this._model.finalSelectionStart;
	}
	get selectionEnd() {
		return this._model.finalSelectionEnd;
	}
	get hasSelection() {
		let e = this._model.finalSelectionStart, t = this._model.finalSelectionEnd;
		return !e || !t ? !1 : e[0] !== t[0] || e[1] !== t[1];
	}
	get selectionText() {
		let e = this._model.finalSelectionStart, t = this._model.finalSelectionEnd;
		if (!e || !t) return "";
		let n = this._bufferService.buffer, r = [];
		if (this._activeSelectionMode === 3) {
			if (e[0] === t[0]) return "";
			let i = e[0] < t[0] ? e[0] : t[0], a = e[0] < t[0] ? t[0] : e[0];
			for (let o = e[1]; o <= t[1]; o++) {
				let e = n.translateBufferLineToString(o, !0, i, a);
				r.push(e);
			}
		} else {
			let i = e[1] === t[1] ? t[0] : void 0;
			r.push(n.translateBufferLineToString(e[1], !0, e[0], i));
			for (let i = e[1] + 1; i <= t[1] - 1; i++) {
				let e = n.lines.get(i), t = n.translateBufferLineToString(i, !0);
				e?.isWrapped ? r[r.length - 1] += t : r.push(t);
			}
			if (e[1] !== t[1]) {
				let e = n.lines.get(t[1]), i = n.translateBufferLineToString(t[1], !0, 0, t[0]);
				e && e.isWrapped ? r[r.length - 1] += i : r.push(i);
			}
		}
		return r.map((e) => e.replace(wa, " ")).join(Yi ? "\r\n" : "\n");
	}
	clearSelection() {
		this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
	}
	refresh(e) {
		this._refreshAnimationFrame ||= this._coreBrowserService.window.requestAnimationFrame(() => this._refresh()), Xi && e && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
	}
	_refresh() {
		this._refreshAnimationFrame = void 0, this._onRedrawRequest.fire({
			start: this._model.finalSelectionStart,
			end: this._model.finalSelectionEnd,
			columnSelectMode: this._activeSelectionMode === 3
		});
	}
	_isClickInSelection(e) {
		let t = this._getMouseBufferCoords(e), n = this._model.finalSelectionStart, r = this._model.finalSelectionEnd;
		return !n || !r || !t ? !1 : this._areCoordsInSelection(t, n, r);
	}
	isCellInSelection(e, t) {
		let n = this._model.finalSelectionStart, r = this._model.finalSelectionEnd;
		return !n || !r ? !1 : this._areCoordsInSelection([e, t], n, r);
	}
	_areCoordsInSelection(e, t, n) {
		return e[1] > t[1] && e[1] < n[1] || t[1] === n[1] && e[1] === t[1] && e[0] >= t[0] && e[0] < n[0] || t[1] < n[1] && e[1] === n[1] && e[0] < n[0] || t[1] < n[1] && e[1] === t[1] && e[0] >= t[0];
	}
	_selectWordAtCursor(e, t) {
		let n = this._linkifier.currentLink?.link?.range;
		if (n) return this._model.selectionStart = [n.start.x - 1, n.start.y - 1], this._model.selectionStartLength = ya(n, this._bufferService.cols), this._model.selectionEnd = void 0, !0;
		let r = this._getMouseBufferCoords(e);
		return r ? (this._selectWordAt(r, t), this._model.selectionEnd = void 0, !0) : !1;
	}
	selectAll() {
		this._model.isSelectAllActive = !0, this.refresh(), this._onSelectionChange.fire();
	}
	selectLines(e, t) {
		this._model.clearSelection(), e = Math.max(e, 0), t = Math.min(t, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [0, e], this._model.selectionEnd = [this._bufferService.cols, t], this.refresh(), this._onSelectionChange.fire();
	}
	_handleTrim(e) {
		this._model.handleTrim(e) && this.refresh();
	}
	_getMouseBufferCoords(e) {
		let t = this._mouseService.getCoords(e, this._screenElement, this._bufferService.cols, this._bufferService.rows, !0);
		if (t) return t[0]--, t[1]--, t[1] += this._bufferService.buffer.ydisp, t;
	}
	_getMouseEventScrollAmount(e) {
		let t = Pi(this._coreBrowserService.window, e, this._screenElement)[1], n = this._renderService.dimensions.css.canvas.height;
		return t >= 0 && t <= n ? 0 : (t > n && (t -= n), t = Math.min(Math.max(t, -ba), ba), t /= ba, t / Math.abs(t) + Math.round(t * (xa - 1)));
	}
	shouldForceSelection(e) {
		return Ki ? e.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : e.shiftKey;
	}
	handleMouseDown(e) {
		if (this._mouseDownTimeStamp = e.timeStamp, !(e.button === 2 && this.hasSelection) && e.button === 0) {
			if (!this._enabled) {
				if (!this.shouldForceSelection(e)) return;
				e.stopPropagation();
			}
			e.preventDefault(), this._dragScrollAmount = 0, this._enabled && e.shiftKey ? this._handleIncrementalClick(e) : e.detail === 1 ? this._handleSingleClick(e) : e.detail === 2 ? this._handleDoubleClick(e) : e.detail === 3 && this._handleTripleClick(e), this._addMouseDownListeners(), this.refresh(!0);
		}
	}
	_addMouseDownListeners() {
		this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval(() => this._dragScroll(), Sa);
	}
	_removeMouseDownListeners() {
		this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = void 0;
	}
	_handleIncrementalClick(e) {
		this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(e));
	}
	_handleSingleClick(e) {
		if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = !1, this._activeSelectionMode = this.shouldColumnSelect(e) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(e), !this._model.selectionStart) return;
		this._model.selectionEnd = void 0;
		let t = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
		t && t.length !== this._model.selectionStart[0] && t.hasWidth(this._model.selectionStart[0]) === 0 && this._model.selectionStart[0]++;
	}
	_handleDoubleClick(e) {
		this._selectWordAtCursor(e, !0) && (this._activeSelectionMode = 1);
	}
	_handleTripleClick(e) {
		let t = this._getMouseBufferCoords(e);
		t && (this._activeSelectionMode = 2, this._selectLineAt(t[1]));
	}
	shouldColumnSelect(e) {
		return e.altKey && !(Ki && this._optionsService.rawOptions.macOptionClickForcesSelection);
	}
	_handleMouseMove(e) {
		if (e.stopImmediatePropagation(), !this._model.selectionStart) return;
		let t = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
		if (this._model.selectionEnd = this._getMouseBufferCoords(e), !this._model.selectionEnd) {
			this.refresh(!0);
			return;
		}
		this._activeSelectionMode === 2 ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : this._activeSelectionMode === 1 && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(e), this._activeSelectionMode !== 3 && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
		let n = this._bufferService.buffer;
		if (this._model.selectionEnd[1] < n.lines.length) {
			let e = n.lines.get(this._model.selectionEnd[1]);
			e && e.hasWidth(this._model.selectionEnd[0]) === 0 && this._model.selectionEnd[0] < this._bufferService.cols && this._model.selectionEnd[0]++;
		}
		t && t[0] === this._model.selectionEnd[0] && t[1] === this._model.selectionEnd[1] || this.refresh(!0);
	}
	_dragScroll() {
		if (this._model.selectionEnd && this._model.selectionStart && this._dragScrollAmount) {
			this._onRequestScrollLines.fire({
				amount: this._dragScrollAmount,
				suppressScrollEvent: !1
			});
			let e = this._bufferService.buffer;
			this._dragScrollAmount > 0 ? (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(e.ydisp + this._bufferService.rows, e.lines.length - 1)) : (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = e.ydisp), this.refresh();
		}
	}
	_handleMouseUp(e) {
		let t = e.timeStamp - this._mouseDownTimeStamp;
		if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && t < Ca && e.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
			if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
				let t = this._mouseService.getCoords(e, this._element, this._bufferService.cols, this._bufferService.rows, !1);
				if (t && t[0] !== void 0 && t[1] !== void 0) {
					let e = aa(t[0] - 1, t[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
					this._coreService.triggerDataEvent(e, !0);
				}
			}
		} else this._fireEventIfSelectionChanged();
	}
	_fireEventIfSelectionChanged() {
		let e = this._model.finalSelectionStart, t = this._model.finalSelectionEnd, n = !!e && !!t && (e[0] !== t[0] || e[1] !== t[1]);
		n ? !e || !t || this._oldSelectionStart && this._oldSelectionEnd && e[0] === this._oldSelectionStart[0] && e[1] === this._oldSelectionStart[1] && t[0] === this._oldSelectionEnd[0] && t[1] === this._oldSelectionEnd[1] || this._fireOnSelectionChange(e, t, n) : this._oldHasSelection && this._fireOnSelectionChange(e, t, n);
	}
	_fireOnSelectionChange(e, t, n) {
		this._oldSelectionStart = e, this._oldSelectionEnd = t, this._oldHasSelection = n, this._onSelectionChange.fire();
	}
	_handleBufferActivate(e) {
		this.clearSelection(), this._trimListener.dispose(), this._trimListener = e.activeBuffer.lines.onTrim((e) => this._handleTrim(e));
	}
	_convertViewportColToCharacterIndex(e, t) {
		let n = t;
		for (let r = 0; t >= r; r++) {
			let i = e.loadCell(r, this._workCell).getChars().length;
			this._workCell.getWidth() === 0 ? n-- : i > 1 && t !== r && (n += i - 1);
		}
		return n;
	}
	setSelection(e, t, n) {
		this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [e, t], this._model.selectionStartLength = n, this.refresh(), this._fireEventIfSelectionChanged();
	}
	rightClickSelect(e) {
		this._isClickInSelection(e) || (this._selectWordAtCursor(e, !1) && this.refresh(!0), this._fireEventIfSelectionChanged());
	}
	_getWordAt(e, t, n = !0, r = !0) {
		if (e[0] >= this._bufferService.cols) return;
		let i = this._bufferService.buffer, a = i.lines.get(e[1]);
		if (!a) return;
		let o = i.translateBufferLineToString(e[1], !1), s = this._convertViewportColToCharacterIndex(a, e[0]), c = s, l = e[0] - s, u = 0, d = 0, f = 0, p = 0;
		if (o.charAt(s) === " ") {
			for (; s > 0 && o.charAt(s - 1) === " ";) s--;
			for (; c < o.length && o.charAt(c + 1) === " ";) c++;
		} else {
			let t = e[0], n = e[0];
			a.getWidth(t) === 0 && (u++, t--), a.getWidth(n) === 2 && (d++, n++);
			let r = a.getString(n).length;
			for (r > 1 && (p += r - 1, c += r - 1); t > 0 && s > 0 && !this._isCharWordSeparator(a.loadCell(t - 1, this._workCell));) {
				a.loadCell(t - 1, this._workCell);
				let e = this._workCell.getChars().length;
				this._workCell.getWidth() === 0 ? (u++, t--) : e > 1 && (f += e - 1, s -= e - 1), s--, t--;
			}
			for (; n < a.length && c + 1 < o.length && !this._isCharWordSeparator(a.loadCell(n + 1, this._workCell));) {
				a.loadCell(n + 1, this._workCell);
				let e = this._workCell.getChars().length;
				this._workCell.getWidth() === 2 ? (d++, n++) : e > 1 && (p += e - 1, c += e - 1), c++, n++;
			}
		}
		c++;
		let m = s + l - u + f, h = Math.min(this._bufferService.cols, c - s + u + d - f - p);
		if (t || o.slice(s, c).trim() !== "") {
			if (n && m === 0 && a.getCodePoint(0) !== 32) {
				let t = i.lines.get(e[1] - 1);
				if (t && a.isWrapped && t.getCodePoint(this._bufferService.cols - 1) !== 32) {
					let t = this._getWordAt([this._bufferService.cols - 1, e[1] - 1], !1, !0, !1);
					if (t) {
						let e = this._bufferService.cols - t.start;
						m -= e, h += e;
					}
				}
			}
			if (r && m + h === this._bufferService.cols && a.getCodePoint(this._bufferService.cols - 1) !== 32) {
				let t = i.lines.get(e[1] + 1);
				if (t?.isWrapped && t.getCodePoint(0) !== 32) {
					let t = this._getWordAt([0, e[1] + 1], !1, !1, !0);
					t && (h += t.length);
				}
			}
			return {
				start: m,
				length: h
			};
		}
	}
	_selectWordAt(e, t) {
		let n = this._getWordAt(e, t);
		if (n) {
			for (; n.start < 0;) n.start += this._bufferService.cols, e[1]--;
			this._model.selectionStart = [n.start, e[1]], this._model.selectionStartLength = n.length;
		}
	}
	_selectToWordAt(e) {
		let t = this._getWordAt(e, !0);
		if (t) {
			let n = e[1];
			for (; t.start < 0;) t.start += this._bufferService.cols, n--;
			if (!this._model.areSelectionValuesReversed()) for (; t.start + t.length > this._bufferService.cols;) t.length -= this._bufferService.cols, n++;
			this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? t.start : t.start + t.length, n];
		}
	}
	_isCharWordSeparator(e) {
		return e.getWidth() !== 0 && this._optionsService.rawOptions.wordSeparator.indexOf(e.getChars()) >= 0;
	}
	_selectLineAt(e) {
		let t = this._bufferService.buffer.getWrappedRangeForLine(e), n = {
			start: {
				x: 0,
				y: t.first
			},
			end: {
				x: this._bufferService.cols - 1,
				y: t.last
			}
		};
		this._model.selectionStart = [0, t.first], this._model.selectionEnd = void 0, this._model.selectionStartLength = ya(n, this._bufferService.cols);
	}
};
Ta = x([
	S(3, Ce),
	S(4, Te),
	S(5, Le),
	S(6, ke),
	S(7, Re),
	S(8, Ie)
], Ta);
var Ea = class {
	constructor() {
		this._data = {};
	}
	set(e, t, n) {
		this._data[e] || (this._data[e] = {}), this._data[e][t] = n;
	}
	get(e, t) {
		return this._data[e] ? this._data[e][t] : void 0;
	}
	clear() {
		this._data = {};
	}
}, Da = class {
	constructor() {
		this._color = new Ea(), this._css = new Ea();
	}
	setCss(e, t, n) {
		this._css.set(e, t, n);
	}
	getCss(e, t) {
		return this._css.get(e, t);
	}
	setColor(e, t, n) {
		this._color.set(e, t, n);
	}
	getColor(e, t) {
		return this._color.get(e, t);
	}
	clear() {
		this._color.clear(), this._css.clear();
	}
}, Oa = Object.freeze((() => {
	let e = [
		I.toColor("#2e3436"),
		I.toColor("#cc0000"),
		I.toColor("#4e9a06"),
		I.toColor("#c4a000"),
		I.toColor("#3465a4"),
		I.toColor("#75507b"),
		I.toColor("#06989a"),
		I.toColor("#d3d7cf"),
		I.toColor("#555753"),
		I.toColor("#ef2929"),
		I.toColor("#8ae234"),
		I.toColor("#fce94f"),
		I.toColor("#729fcf"),
		I.toColor("#ad7fa8"),
		I.toColor("#34e2e2"),
		I.toColor("#eeeeec")
	], t = [
		0,
		95,
		135,
		175,
		215,
		255
	];
	for (let n = 0; n < 216; n++) {
		let r = t[n / 36 % 6 | 0], i = t[n / 6 % 6 | 0], a = t[n % 6];
		e.push({
			css: P.toCss(r, i, a),
			rgba: P.toRgba(r, i, a)
		});
	}
	for (let t = 0; t < 24; t++) {
		let n = 8 + t * 10;
		e.push({
			css: P.toCss(n, n, n),
			rgba: P.toRgba(n, n, n)
		});
	}
	return e;
})()), ka = I.toColor("#ffffff"), Aa = I.toColor("#000000"), ja = I.toColor("#ffffff"), Ma = Aa, Na = {
	css: "rgba(255, 255, 255, 0.3)",
	rgba: 4294967117
}, Pa = ka, Fa = class extends O {
	constructor(e) {
		super(), this._optionsService = e, this._contrastCache = new Da(), this._halfContrastCache = new Da(), this._onChangeColors = this._register(new A()), this.onChangeColors = this._onChangeColors.event, this._colors = {
			foreground: ka,
			background: Aa,
			cursor: ja,
			cursorAccent: Ma,
			selectionForeground: void 0,
			selectionBackgroundTransparent: Na,
			selectionBackgroundOpaque: F.blend(Aa, Na),
			selectionInactiveBackgroundTransparent: Na,
			selectionInactiveBackgroundOpaque: F.blend(Aa, Na),
			scrollbarSliderBackground: F.opacity(ka, .2),
			scrollbarSliderHoverBackground: F.opacity(ka, .4),
			scrollbarSliderActiveBackground: F.opacity(ka, .5),
			overviewRulerBorder: ka,
			ansi: Oa.slice(),
			contrastCache: this._contrastCache,
			halfContrastCache: this._halfContrastCache
		}, this._updateRestoreColors(), this._setTheme(this._optionsService.rawOptions.theme), this._register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", () => this._contrastCache.clear())), this._register(this._optionsService.onSpecificOptionChange("theme", () => this._setTheme(this._optionsService.rawOptions.theme)));
	}
	get colors() {
		return this._colors;
	}
	_setTheme(e = {}) {
		let t = this._colors;
		if (t.foreground = L(e.foreground, ka), t.background = L(e.background, Aa), t.cursor = F.blend(t.background, L(e.cursor, ja)), t.cursorAccent = F.blend(t.background, L(e.cursorAccent, Ma)), t.selectionBackgroundTransparent = L(e.selectionBackground, Na), t.selectionBackgroundOpaque = F.blend(t.background, t.selectionBackgroundTransparent), t.selectionInactiveBackgroundTransparent = L(e.selectionInactiveBackground, t.selectionBackgroundTransparent), t.selectionInactiveBackgroundOpaque = F.blend(t.background, t.selectionInactiveBackgroundTransparent), t.selectionForeground = e.selectionForeground ? L(e.selectionForeground, ni) : void 0, t.selectionForeground === ni && (t.selectionForeground = void 0), F.isOpaque(t.selectionBackgroundTransparent) && (t.selectionBackgroundTransparent = F.opacity(t.selectionBackgroundTransparent, .3)), F.isOpaque(t.selectionInactiveBackgroundTransparent) && (t.selectionInactiveBackgroundTransparent = F.opacity(t.selectionInactiveBackgroundTransparent, .3)), t.scrollbarSliderBackground = L(e.scrollbarSliderBackground, F.opacity(t.foreground, .2)), t.scrollbarSliderHoverBackground = L(e.scrollbarSliderHoverBackground, F.opacity(t.foreground, .4)), t.scrollbarSliderActiveBackground = L(e.scrollbarSliderActiveBackground, F.opacity(t.foreground, .5)), t.overviewRulerBorder = L(e.overviewRulerBorder, Pa), t.ansi = Oa.slice(), t.ansi[0] = L(e.black, Oa[0]), t.ansi[1] = L(e.red, Oa[1]), t.ansi[2] = L(e.green, Oa[2]), t.ansi[3] = L(e.yellow, Oa[3]), t.ansi[4] = L(e.blue, Oa[4]), t.ansi[5] = L(e.magenta, Oa[5]), t.ansi[6] = L(e.cyan, Oa[6]), t.ansi[7] = L(e.white, Oa[7]), t.ansi[8] = L(e.brightBlack, Oa[8]), t.ansi[9] = L(e.brightRed, Oa[9]), t.ansi[10] = L(e.brightGreen, Oa[10]), t.ansi[11] = L(e.brightYellow, Oa[11]), t.ansi[12] = L(e.brightBlue, Oa[12]), t.ansi[13] = L(e.brightMagenta, Oa[13]), t.ansi[14] = L(e.brightCyan, Oa[14]), t.ansi[15] = L(e.brightWhite, Oa[15]), e.extendedAnsi) {
			let n = Math.min(t.ansi.length - 16, e.extendedAnsi.length);
			for (let r = 0; r < n; r++) t.ansi[r + 16] = L(e.extendedAnsi[r], Oa[r + 16]);
		}
		this._contrastCache.clear(), this._halfContrastCache.clear(), this._updateRestoreColors(), this._onChangeColors.fire(this.colors);
	}
	restoreColor(e) {
		this._restoreColor(e), this._onChangeColors.fire(this.colors);
	}
	_restoreColor(e) {
		if (e === void 0) for (let e = 0; e < this._restoreColors.ansi.length; ++e) this._colors.ansi[e] = this._restoreColors.ansi[e];
		else switch (e) {
			case 256:
				this._colors.foreground = this._restoreColors.foreground;
				break;
			case 257:
				this._colors.background = this._restoreColors.background;
				break;
			case 258:
				this._colors.cursor = this._restoreColors.cursor;
				break;
			default: this._colors.ansi[e] = this._restoreColors.ansi[e];
		}
	}
	modifyColors(e) {
		e(this._colors), this._onChangeColors.fire(this.colors);
	}
	_updateRestoreColors() {
		this._restoreColors = {
			foreground: this._colors.foreground,
			background: this._colors.background,
			cursor: this._colors.cursor,
			ansi: this._colors.ansi.slice()
		};
	}
};
Fa = x([S(0, ke)], Fa);
function L(e, t) {
	if (e !== void 0) try {
		return I.toColor(e);
	} catch {}
	return t;
}
var Ia = class {
	constructor(...e) {
		this._entries = /* @__PURE__ */ new Map();
		for (let [t, n] of e) this.set(t, n);
	}
	set(e, t) {
		let n = this._entries.get(e);
		return this._entries.set(e, t), n;
	}
	forEach(e) {
		for (let [t, n] of this._entries.entries()) e(t, n);
	}
	has(e) {
		return this._entries.has(e);
	}
	get(e) {
		return this._entries.get(e);
	}
}, La = class {
	constructor() {
		this._services = new Ia(), this._services.set(De, this);
	}
	setService(e, t) {
		this._services.set(e, t);
	}
	getService(e) {
		return this._services.get(e);
	}
	createInstance(e, ...t) {
		let n = xe(e).sort((e, t) => e.index - t.index), r = [];
		for (let t of n) {
			let n = this._services.get(t.id);
			if (!n) throw Error(`[createInstance] ${e.name} depends on UNKNOWN service ${t.id._id}.`);
			r.push(n);
		}
		let i = n.length > 0 ? n[0].index : t.length;
		if (t.length !== i) throw Error(`[createInstance] First service dependency of ${e.name} at position ${i + 1} conflicts with ${t.length} static arguments`);
		return new e(...t, ...r);
	}
}, Ra = {
	trace: 0,
	debug: 1,
	info: 2,
	warn: 3,
	error: 4,
	off: 5
}, za = "xterm.js: ", Ba = class extends O {
	constructor(e) {
		super(), this._optionsService = e, this._logLevel = 5, this._updateLogLevel(), this._register(this._optionsService.onSpecificOptionChange("logLevel", () => this._updateLogLevel())), Va = this;
	}
	get logLevel() {
		return this._logLevel;
	}
	_updateLogLevel() {
		this._logLevel = Ra[this._optionsService.rawOptions.logLevel];
	}
	_evalLazyOptionalParams(e) {
		for (let t = 0; t < e.length; t++) typeof e[t] == "function" && (e[t] = e[t]());
	}
	_log(e, t, n) {
		this._evalLazyOptionalParams(n), e.call(console, (this._optionsService.options.logger ? "" : za) + t, ...n);
	}
	trace(e, ...t) {
		this._logLevel <= 0 && this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger) ?? console.log, e, t);
	}
	debug(e, ...t) {
		this._logLevel <= 1 && this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger) ?? console.log, e, t);
	}
	info(e, ...t) {
		this._logLevel <= 2 && this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger) ?? console.info, e, t);
	}
	warn(e, ...t) {
		this._logLevel <= 3 && this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger) ?? console.warn, e, t);
	}
	error(e, ...t) {
		this._logLevel <= 4 && this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger) ?? console.error, e, t);
	}
};
Ba = x([S(0, ke)], Ba);
var Va, Ha = class extends O {
	constructor(e) {
		super(), this._maxLength = e, this.onDeleteEmitter = this._register(new A()), this.onDelete = this.onDeleteEmitter.event, this.onInsertEmitter = this._register(new A()), this.onInsert = this.onInsertEmitter.event, this.onTrimEmitter = this._register(new A()), this.onTrim = this.onTrimEmitter.event, this._array = Array(this._maxLength), this._startIndex = 0, this._length = 0;
	}
	get maxLength() {
		return this._maxLength;
	}
	set maxLength(e) {
		if (this._maxLength === e) return;
		let t = Array(e);
		for (let n = 0; n < Math.min(e, this.length); n++) t[n] = this._array[this._getCyclicIndex(n)];
		this._array = t, this._maxLength = e, this._startIndex = 0;
	}
	get length() {
		return this._length;
	}
	set length(e) {
		if (e > this._length) for (let t = this._length; t < e; t++) this._array[t] = void 0;
		this._length = e;
	}
	get(e) {
		return this._array[this._getCyclicIndex(e)];
	}
	set(e, t) {
		this._array[this._getCyclicIndex(e)] = t;
	}
	push(e) {
		this._array[this._getCyclicIndex(this._length)] = e, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
	}
	recycle() {
		if (this._length !== this._maxLength) throw Error("Can only recycle when the buffer is full");
		return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
	}
	get isFull() {
		return this._length === this._maxLength;
	}
	pop() {
		return this._array[this._getCyclicIndex(this._length-- - 1)];
	}
	splice(e, t, ...n) {
		if (t) {
			for (let n = e; n < this._length - t; n++) this._array[this._getCyclicIndex(n)] = this._array[this._getCyclicIndex(n + t)];
			this._length -= t, this.onDeleteEmitter.fire({
				index: e,
				amount: t
			});
		}
		for (let t = this._length - 1; t >= e; t--) this._array[this._getCyclicIndex(t + n.length)] = this._array[this._getCyclicIndex(t)];
		for (let t = 0; t < n.length; t++) this._array[this._getCyclicIndex(e + t)] = n[t];
		if (n.length && this.onInsertEmitter.fire({
			index: e,
			amount: n.length
		}), this._length + n.length > this._maxLength) {
			let e = this._length + n.length - this._maxLength;
			this._startIndex += e, this._length = this._maxLength, this.onTrimEmitter.fire(e);
		} else this._length += n.length;
	}
	trimStart(e) {
		e > this._length && (e = this._length), this._startIndex += e, this._length -= e, this.onTrimEmitter.fire(e);
	}
	shiftElements(e, t, n) {
		if (!(t <= 0)) {
			if (e < 0 || e >= this._length) throw Error("start argument out of range");
			if (e + n < 0) throw Error("Cannot shift elements in list beyond index 0");
			if (n > 0) {
				for (let r = t - 1; r >= 0; r--) this.set(e + r + n, this.get(e + r));
				let r = e + t + n - this._length;
				if (r > 0) for (this._length += r; this._length > this._maxLength;) this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
			} else for (let r = 0; r < t; r++) this.set(e + r + n, this.get(e + r));
		}
	}
	_getCyclicIndex(e) {
		return (this._startIndex + e) % this._maxLength;
	}
}, R = 3, z = Object.freeze(new ge()), Ua = 0, Wa = 2, Ga = class e {
	constructor(e, t, n = !1) {
		this.isWrapped = n, this._combined = {}, this._extendedAttrs = {}, this._data = new Uint32Array(e * R);
		let r = t || T.fromCharData([
			0,
			me,
			1,
			0
		]);
		for (let t = 0; t < e; ++t) this.setCell(t, r);
		this.length = e;
	}
	get(e) {
		let t = this._data[e * R + 0], n = t & 2097151;
		return [
			this._data[e * R + 1],
			t & 2097152 ? this._combined[e] : n ? ue(n) : "",
			t >> 22,
			t & 2097152 ? this._combined[e].charCodeAt(this._combined[e].length - 1) : n
		];
	}
	set(e, t) {
		this._data[e * R + 1] = t[0], t[1].length > 1 ? (this._combined[e] = t[1], this._data[e * R + 0] = e | 2097152 | t[2] << 22) : this._data[e * R + 0] = t[1].charCodeAt(0) | t[2] << 22;
	}
	getWidth(e) {
		return this._data[e * R + 0] >> 22;
	}
	hasWidth(e) {
		return this._data[e * R + 0] & 12582912;
	}
	getFg(e) {
		return this._data[e * R + 1];
	}
	getBg(e) {
		return this._data[e * R + 2];
	}
	hasContent(e) {
		return this._data[e * R + 0] & 4194303;
	}
	getCodePoint(e) {
		let t = this._data[e * R + 0];
		return t & 2097152 ? this._combined[e].charCodeAt(this._combined[e].length - 1) : t & 2097151;
	}
	isCombined(e) {
		return this._data[e * R + 0] & 2097152;
	}
	getString(e) {
		let t = this._data[e * R + 0];
		return t & 2097152 ? this._combined[e] : t & 2097151 ? ue(t & 2097151) : "";
	}
	isProtected(e) {
		return this._data[e * R + 2] & 536870912;
	}
	loadCell(e, t) {
		return Ua = e * R, t.content = this._data[Ua + 0], t.fg = this._data[Ua + 1], t.bg = this._data[Ua + 2], t.content & 2097152 && (t.combinedData = this._combined[e]), t.bg & 268435456 && (t.extended = this._extendedAttrs[e]), t;
	}
	setCell(e, t) {
		t.content & 2097152 && (this._combined[e] = t.combinedData), t.bg & 268435456 && (this._extendedAttrs[e] = t.extended), this._data[e * R + 0] = t.content, this._data[e * R + 1] = t.fg, this._data[e * R + 2] = t.bg;
	}
	setCellFromCodepoint(e, t, n, r) {
		r.bg & 268435456 && (this._extendedAttrs[e] = r.extended), this._data[e * R + 0] = t | n << 22, this._data[e * R + 1] = r.fg, this._data[e * R + 2] = r.bg;
	}
	addCodepointToCell(e, t, n) {
		let r = this._data[e * R + 0];
		r & 2097152 ? this._combined[e] += ue(t) : r & 2097151 ? (this._combined[e] = ue(r & 2097151) + ue(t), r &= -2097152, r |= 2097152) : r = t | 1 << 22, n && (r &= -12582913, r |= n << 22), this._data[e * R + 0] = r;
	}
	insertCells(e, t, n) {
		if (e %= this.length, e && this.getWidth(e - 1) === 2 && this.setCellFromCodepoint(e - 1, 0, 1, n), t < this.length - e) {
			let r = new T();
			for (let n = this.length - e - t - 1; n >= 0; --n) this.setCell(e + t + n, this.loadCell(e + n, r));
			for (let r = 0; r < t; ++r) this.setCell(e + r, n);
		} else for (let t = e; t < this.length; ++t) this.setCell(t, n);
		this.getWidth(this.length - 1) === 2 && this.setCellFromCodepoint(this.length - 1, 0, 1, n);
	}
	deleteCells(e, t, n) {
		if (e %= this.length, t < this.length - e) {
			let r = new T();
			for (let n = 0; n < this.length - e - t; ++n) this.setCell(e + n, this.loadCell(e + t + n, r));
			for (let e = this.length - t; e < this.length; ++e) this.setCell(e, n);
		} else for (let t = e; t < this.length; ++t) this.setCell(t, n);
		e && this.getWidth(e - 1) === 2 && this.setCellFromCodepoint(e - 1, 0, 1, n), this.getWidth(e) === 0 && !this.hasContent(e) && this.setCellFromCodepoint(e, 0, 1, n);
	}
	replaceCells(e, t, n, r = !1) {
		if (r) for (e && this.getWidth(e - 1) === 2 && !this.isProtected(e - 1) && this.setCellFromCodepoint(e - 1, 0, 1, n), t < this.length && this.getWidth(t - 1) === 2 && !this.isProtected(t) && this.setCellFromCodepoint(t, 0, 1, n); e < t && e < this.length;) this.isProtected(e) || this.setCell(e, n), e++;
		else for (e && this.getWidth(e - 1) === 2 && this.setCellFromCodepoint(e - 1, 0, 1, n), t < this.length && this.getWidth(t - 1) === 2 && this.setCellFromCodepoint(t, 0, 1, n); e < t && e < this.length;) this.setCell(e++, n);
	}
	resize(e, t) {
		if (e === this.length) return this._data.length * 4 * Wa < this._data.buffer.byteLength;
		let n = e * R;
		if (e > this.length) {
			if (this._data.buffer.byteLength >= n * 4) this._data = new Uint32Array(this._data.buffer, 0, n);
			else {
				let e = new Uint32Array(n);
				e.set(this._data), this._data = e;
			}
			for (let n = this.length; n < e; ++n) this.setCell(n, t);
		} else {
			this._data = this._data.subarray(0, n);
			let t = Object.keys(this._combined);
			for (let n = 0; n < t.length; n++) {
				let r = parseInt(t[n], 10);
				r >= e && delete this._combined[r];
			}
			let r = Object.keys(this._extendedAttrs);
			for (let t = 0; t < r.length; t++) {
				let n = parseInt(r[t], 10);
				n >= e && delete this._extendedAttrs[n];
			}
		}
		return this.length = e, n * 4 * Wa < this._data.buffer.byteLength;
	}
	cleanupMemory() {
		if (this._data.length * 4 * Wa < this._data.buffer.byteLength) {
			let e = new Uint32Array(this._data.length);
			return e.set(this._data), this._data = e, 1;
		}
		return 0;
	}
	fill(e, t = !1) {
		if (t) for (let t = 0; t < this.length; ++t) this.isProtected(t) || this.setCell(t, e);
		else {
			this._combined = {}, this._extendedAttrs = {};
			for (let t = 0; t < this.length; ++t) this.setCell(t, e);
		}
	}
	copyFrom(e) {
		this.length === e.length ? this._data.set(e._data) : this._data = new Uint32Array(e._data), this.length = e.length, this._combined = {};
		for (let t in e._combined) this._combined[t] = e._combined[t];
		this._extendedAttrs = {};
		for (let t in e._extendedAttrs) this._extendedAttrs[t] = e._extendedAttrs[t];
		this.isWrapped = e.isWrapped;
	}
	clone() {
		let t = new e(0);
		t._data = new Uint32Array(this._data), t.length = this.length;
		for (let e in this._combined) t._combined[e] = this._combined[e];
		for (let e in this._extendedAttrs) t._extendedAttrs[e] = this._extendedAttrs[e];
		return t.isWrapped = this.isWrapped, t;
	}
	getTrimmedLength() {
		for (let e = this.length - 1; e >= 0; --e) if (this._data[e * R + 0] & 4194303) return e + (this._data[e * R + 0] >> 22);
		return 0;
	}
	getNoBgTrimmedLength() {
		for (let e = this.length - 1; e >= 0; --e) if (this._data[e * R + 0] & 4194303 || this._data[e * R + 2] & 50331648) return e + (this._data[e * R + 0] >> 22);
		return 0;
	}
	copyCellsFrom(e, t, n, r, i) {
		let a = e._data;
		if (i) for (let i = r - 1; i >= 0; i--) {
			for (let e = 0; e < R; e++) this._data[(n + i) * R + e] = a[(t + i) * R + e];
			a[(t + i) * R + 2] & 268435456 && (this._extendedAttrs[n + i] = e._extendedAttrs[t + i]);
		}
		else for (let i = 0; i < r; i++) {
			for (let e = 0; e < R; e++) this._data[(n + i) * R + e] = a[(t + i) * R + e];
			a[(t + i) * R + 2] & 268435456 && (this._extendedAttrs[n + i] = e._extendedAttrs[t + i]);
		}
		let o = Object.keys(e._combined);
		for (let r = 0; r < o.length; r++) {
			let i = parseInt(o[r], 10);
			i >= t && (this._combined[i - t + n] = e._combined[i]);
		}
	}
	translateToString(e, t, n, r) {
		t ??= 0, n ??= this.length, e && (n = Math.min(n, this.getTrimmedLength())), r && (r.length = 0);
		let i = "";
		for (; t < n;) {
			let e = this._data[t * R + 0], n = e & 2097151, a = e & 2097152 ? this._combined[t] : n ? ue(n) : he;
			if (i += a, r) for (let e = 0; e < a.length; ++e) r.push(t);
			t += e >> 22 || 1;
		}
		return r && r.push(t), i;
	}
};
function Ka(e, t, n, r, i, a) {
	let o = [];
	for (let s = 0; s < e.length - 1; s++) {
		let c = s, l = e.get(++c);
		if (!l.isWrapped) continue;
		let u = [e.get(s)];
		for (; c < e.length && l.isWrapped;) u.push(l), l = e.get(++c);
		if (!a && r >= s && r < c) {
			s += u.length - 1;
			continue;
		}
		let d = 0, f = Xa(u, d, t), p = 1, m = 0;
		for (; p < u.length;) {
			let e = Xa(u, p, t), r = e - m, a = n - f, o = Math.min(r, a);
			u[d].copyCellsFrom(u[p], m, f, o, !1), f += o, f === n && (d++, f = 0), m += o, m === e && (p++, m = 0), f === 0 && d !== 0 && u[d - 1].getWidth(n - 1) === 2 && (u[d].copyCellsFrom(u[d - 1], n - 1, f++, 1, !1), u[d - 1].setCell(n - 1, i));
		}
		u[d].replaceCells(f, n, i);
		let h = 0;
		for (let e = u.length - 1; e > 0 && (e > d || u[e].getTrimmedLength() === 0); e--) h++;
		h > 0 && (o.push(s + u.length - h), o.push(h)), s += u.length - 1;
	}
	return o;
}
function qa(e, t) {
	let n = [], r = 0, i = t[r], a = 0;
	for (let o = 0; o < e.length; o++) if (i === o) {
		let n = t[++r];
		e.onDeleteEmitter.fire({
			index: o - a,
			amount: n
		}), o += n - 1, a += n, i = t[++r];
	} else n.push(o);
	return {
		layout: n,
		countRemoved: a
	};
}
function Ja(e, t) {
	let n = [];
	for (let r = 0; r < t.length; r++) n.push(e.get(t[r]));
	for (let t = 0; t < n.length; t++) e.set(t, n[t]);
	e.length = t.length;
}
function Ya(e, t, n) {
	let r = [], i = e.map((n, r) => Xa(e, r, t)).reduce((e, t) => e + t), a = 0, o = 0, s = 0;
	for (; s < i;) {
		if (i - s < n) {
			r.push(i - s);
			break;
		}
		a += n;
		let c = Xa(e, o, t);
		a > c && (a -= c, o++);
		let l = e[o].getWidth(a - 1) === 2;
		l && a--;
		let u = l ? n - 1 : n;
		r.push(u), s += u;
	}
	return r;
}
function Xa(e, t, n) {
	if (t === e.length - 1) return e[t].getTrimmedLength();
	let r = !e[t].hasContent(n - 1) && e[t].getWidth(n - 1) === 1, i = e[t + 1].getWidth(0) === 2;
	return r && i ? n - 1 : n;
}
var Za = class e {
	constructor(t) {
		this.line = t, this.isDisposed = !1, this._disposables = [], this._id = e._nextId++, this._onDispose = this.register(new A()), this.onDispose = this._onDispose.event;
	}
	get id() {
		return this._id;
	}
	dispose() {
		this.isDisposed || (this.isDisposed = !0, this.line = -1, this._onDispose.fire(), st(this._disposables), this._disposables.length = 0);
	}
	register(e) {
		return this._disposables.push(e), e;
	}
};
Za._nextId = 1;
var Qa = Za, B = {}, $a = B.B;
B[0] = {
	"`": "◆",
	a: "▒",
	b: "␉",
	c: "␌",
	d: "␍",
	e: "␊",
	f: "°",
	g: "±",
	h: "␤",
	i: "␋",
	j: "┘",
	k: "┐",
	l: "┌",
	m: "└",
	n: "┼",
	o: "⎺",
	p: "⎻",
	q: "─",
	r: "⎼",
	s: "⎽",
	t: "├",
	u: "┤",
	v: "┴",
	w: "┬",
	x: "│",
	y: "≤",
	z: "≥",
	"{": "π",
	"|": "≠",
	"}": "£",
	"~": "·"
}, B.A = { "#": "£" }, B.B = void 0, B[4] = {
	"#": "£",
	"@": "¾",
	"[": "ij",
	"\\": "½",
	"]": "|",
	"{": "¨",
	"|": "f",
	"}": "¼",
	"~": "´"
}, B.C = B[5] = {
	"[": "Ä",
	"\\": "Ö",
	"]": "Å",
	"^": "Ü",
	"`": "é",
	"{": "ä",
	"|": "ö",
	"}": "å",
	"~": "ü"
}, B.R = {
	"#": "£",
	"@": "à",
	"[": "°",
	"\\": "ç",
	"]": "§",
	"{": "é",
	"|": "ù",
	"}": "è",
	"~": "¨"
}, B.Q = {
	"@": "à",
	"[": "â",
	"\\": "ç",
	"]": "ê",
	"^": "î",
	"`": "ô",
	"{": "é",
	"|": "ù",
	"}": "è",
	"~": "û"
}, B.K = {
	"@": "§",
	"[": "Ä",
	"\\": "Ö",
	"]": "Ü",
	"{": "ä",
	"|": "ö",
	"}": "ü",
	"~": "ß"
}, B.Y = {
	"#": "£",
	"@": "§",
	"[": "°",
	"\\": "ç",
	"]": "é",
	"`": "ù",
	"{": "à",
	"|": "ò",
	"}": "è",
	"~": "ì"
}, B.E = B[6] = {
	"@": "Ä",
	"[": "Æ",
	"\\": "Ø",
	"]": "Å",
	"^": "Ü",
	"`": "ä",
	"{": "æ",
	"|": "ø",
	"}": "å",
	"~": "ü"
}, B.Z = {
	"#": "£",
	"@": "§",
	"[": "¡",
	"\\": "Ñ",
	"]": "¿",
	"{": "°",
	"|": "ñ",
	"}": "ç"
}, B.H = B[7] = {
	"@": "É",
	"[": "Ä",
	"\\": "Ö",
	"]": "Å",
	"^": "Ü",
	"`": "é",
	"{": "ä",
	"|": "ö",
	"}": "å",
	"~": "ü"
}, B["="] = {
	"#": "ù",
	"@": "à",
	"[": "é",
	"\\": "ç",
	"]": "ê",
	"^": "î",
	_: "è",
	"`": "ô",
	"{": "ä",
	"|": "ö",
	"}": "ü",
	"~": "û"
};
var eo = 4294967295, to = class {
	constructor(e, t, n) {
		this._hasScrollback = e, this._optionsService = t, this._bufferService = n, this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.tabs = {}, this.savedY = 0, this.savedX = 0, this.savedCurAttrData = z.clone(), this.savedCharset = $a, this.markers = [], this._nullCell = T.fromCharData([
			0,
			me,
			1,
			0
		]), this._whitespaceCell = T.fromCharData([
			0,
			he,
			1,
			32
		]), this._isClearing = !1, this._memoryCleanupQueue = new ta(), this._memoryCleanupPosition = 0, this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new Ha(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
	}
	getNullCell(e) {
		return e ? (this._nullCell.fg = e.fg, this._nullCell.bg = e.bg, this._nullCell.extended = e.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new _e()), this._nullCell;
	}
	getWhitespaceCell(e) {
		return e ? (this._whitespaceCell.fg = e.fg, this._whitespaceCell.bg = e.bg, this._whitespaceCell.extended = e.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new _e()), this._whitespaceCell;
	}
	getBlankLine(e, t) {
		return new Ga(this._bufferService.cols, this.getNullCell(e), t);
	}
	get hasScrollback() {
		return this._hasScrollback && this.lines.maxLength > this._rows;
	}
	get isCursorInViewport() {
		let e = this.ybase + this.y - this.ydisp;
		return e >= 0 && e < this._rows;
	}
	_getCorrectBufferLength(e) {
		if (!this._hasScrollback) return e;
		let t = e + this._optionsService.rawOptions.scrollback;
		return t > eo ? eo : t;
	}
	fillViewportRows(e) {
		if (this.lines.length === 0) {
			e === void 0 && (e = z);
			let t = this._rows;
			for (; t--;) this.lines.push(this.getBlankLine(e));
		}
	}
	clear() {
		this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new Ha(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
	}
	resize(e, t) {
		let n = this.getNullCell(z), r = 0, i = this._getCorrectBufferLength(t);
		if (i > this.lines.maxLength && (this.lines.maxLength = i), this.lines.length > 0) {
			if (this._cols < e) for (let t = 0; t < this.lines.length; t++) r += +this.lines.get(t).resize(e, n);
			let a = 0;
			if (this._rows < t) for (let r = this._rows; r < t; r++) this.lines.length < t + this.ybase && (this._optionsService.rawOptions.windowsMode || this._optionsService.rawOptions.windowsPty.backend !== void 0 || this._optionsService.rawOptions.windowsPty.buildNumber !== void 0 ? this.lines.push(new Ga(e, n)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + a + 1 ? (this.ybase--, a++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new Ga(e, n)));
			else for (let e = this._rows; e > t; e--) this.lines.length > t + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
			if (i < this.lines.maxLength) {
				let e = this.lines.length - i;
				e > 0 && (this.lines.trimStart(e), this.ybase = Math.max(this.ybase - e, 0), this.ydisp = Math.max(this.ydisp - e, 0), this.savedY = Math.max(this.savedY - e, 0)), this.lines.maxLength = i;
			}
			this.x = Math.min(this.x, e - 1), this.y = Math.min(this.y, t - 1), a && (this.y += a), this.savedX = Math.min(this.savedX, e - 1), this.scrollTop = 0;
		}
		if (this.scrollBottom = t - 1, this._isReflowEnabled && (this._reflow(e, t), this._cols > e)) for (let t = 0; t < this.lines.length; t++) r += +this.lines.get(t).resize(e, n);
		this._cols = e, this._rows = t, this._memoryCleanupQueue.clear(), r > .1 * this.lines.length && (this._memoryCleanupPosition = 0, this._memoryCleanupQueue.enqueue(() => this._batchedMemoryCleanup()));
	}
	_batchedMemoryCleanup() {
		let e = !0;
		this._memoryCleanupPosition >= this.lines.length && (this._memoryCleanupPosition = 0, e = !1);
		let t = 0;
		for (; this._memoryCleanupPosition < this.lines.length;) if (t += this.lines.get(this._memoryCleanupPosition++).cleanupMemory(), t > 100) return !0;
		return e;
	}
	get _isReflowEnabled() {
		let e = this._optionsService.rawOptions.windowsPty;
		return e && e.buildNumber ? this._hasScrollback && e.backend === "conpty" && e.buildNumber >= 21376 : this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
	}
	_reflow(e, t) {
		this._cols !== e && (e > this._cols ? this._reflowLarger(e, t) : this._reflowSmaller(e, t));
	}
	_reflowLarger(e, t) {
		let n = this._optionsService.rawOptions.reflowCursorLine, r = Ka(this.lines, this._cols, e, this.ybase + this.y, this.getNullCell(z), n);
		if (r.length > 0) {
			let n = qa(this.lines, r);
			Ja(this.lines, n.layout), this._reflowLargerAdjustViewport(e, t, n.countRemoved);
		}
	}
	_reflowLargerAdjustViewport(e, t, n) {
		let r = this.getNullCell(z), i = n;
		for (; i-- > 0;) this.ybase === 0 ? (this.y > 0 && this.y--, this.lines.length < t && this.lines.push(new Ga(e, r))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
		this.savedY = Math.max(this.savedY - n, 0);
	}
	_reflowSmaller(e, t) {
		let n = this._optionsService.rawOptions.reflowCursorLine, r = this.getNullCell(z), i = [], a = 0;
		for (let o = this.lines.length - 1; o >= 0; o--) {
			let s = this.lines.get(o);
			if (!s || !s.isWrapped && s.getTrimmedLength() <= e) continue;
			let c = [s];
			for (; s.isWrapped && o > 0;) s = this.lines.get(--o), c.unshift(s);
			if (!n) {
				let e = this.ybase + this.y;
				if (e >= o && e < o + c.length) continue;
			}
			let l = c[c.length - 1].getTrimmedLength(), u = Ya(c, this._cols, e), d = u.length - c.length, f;
			f = this.ybase === 0 && this.y !== this.lines.length - 1 ? Math.max(0, this.y - this.lines.maxLength + d) : Math.max(0, this.lines.length - this.lines.maxLength + d);
			let p = [];
			for (let e = 0; e < d; e++) {
				let e = this.getBlankLine(z, !0);
				p.push(e);
			}
			p.length > 0 && (i.push({
				start: o + c.length + a,
				newLines: p
			}), a += p.length), c.push(...p);
			let m = u.length - 1, h = u[m];
			h === 0 && (m--, h = u[m]);
			let g = c.length - d - 1, _ = l;
			for (; g >= 0;) {
				let e = Math.min(_, h);
				if (c[m] === void 0) break;
				c[m].copyCellsFrom(c[g], _ - e, h - e, e, !0), h -= e, h === 0 && (m--, h = u[m]), _ -= e, _ === 0 && (g--, _ = Xa(c, Math.max(g, 0), this._cols));
			}
			for (let t = 0; t < c.length; t++) u[t] < e && c[t].setCell(u[t], r);
			let v = d - f;
			for (; v-- > 0;) this.ybase === 0 ? this.y < t - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + a) - t && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
			this.savedY = Math.min(this.savedY + d, this.ybase + t - 1);
		}
		if (i.length > 0) {
			let e = [], t = [];
			for (let e = 0; e < this.lines.length; e++) t.push(this.lines.get(e));
			let n = this.lines.length, r = n - 1, o = 0, s = i[o];
			this.lines.length = Math.min(this.lines.maxLength, this.lines.length + a);
			let c = 0;
			for (let l = Math.min(this.lines.maxLength - 1, n + a - 1); l >= 0; l--) if (s && s.start > r + c) {
				for (let e = s.newLines.length - 1; e >= 0; e--) this.lines.set(l--, s.newLines[e]);
				l++, e.push({
					index: r + 1,
					amount: s.newLines.length
				}), c += s.newLines.length, s = i[++o];
			} else this.lines.set(l, t[r--]);
			let l = 0;
			for (let t = e.length - 1; t >= 0; t--) e[t].index += l, this.lines.onInsertEmitter.fire(e[t]), l += e[t].amount;
			let u = Math.max(0, n + a - this.lines.maxLength);
			u > 0 && this.lines.onTrimEmitter.fire(u);
		}
	}
	translateBufferLineToString(e, t, n = 0, r) {
		let i = this.lines.get(e);
		return i ? i.translateToString(t, n, r) : "";
	}
	getWrappedRangeForLine(e) {
		let t = e, n = e;
		for (; t > 0 && this.lines.get(t).isWrapped;) t--;
		for (; n + 1 < this.lines.length && this.lines.get(n + 1).isWrapped;) n++;
		return {
			first: t,
			last: n
		};
	}
	setupTabStops(e) {
		for (e == null ? (this.tabs = {}, e = 0) : this.tabs[e] || (e = this.prevStop(e)); e < this._cols; e += this._optionsService.rawOptions.tabStopWidth) this.tabs[e] = !0;
	}
	prevStop(e) {
		for (e ??= this.x; !this.tabs[--e] && e > 0;);
		return e >= this._cols ? this._cols - 1 : e < 0 ? 0 : e;
	}
	nextStop(e) {
		for (e ??= this.x; !this.tabs[++e] && e < this._cols;);
		return e >= this._cols ? this._cols - 1 : e < 0 ? 0 : e;
	}
	clearMarkers(e) {
		this._isClearing = !0;
		for (let t = 0; t < this.markers.length; t++) this.markers[t].line === e && (this.markers[t].dispose(), this.markers.splice(t--, 1));
		this._isClearing = !1;
	}
	clearAllMarkers() {
		this._isClearing = !0;
		for (let e = 0; e < this.markers.length; e++) this.markers[e].dispose();
		this.markers.length = 0, this._isClearing = !1;
	}
	addMarker(e) {
		let t = new Qa(e);
		return this.markers.push(t), t.register(this.lines.onTrim((e) => {
			t.line -= e, t.line < 0 && t.dispose();
		})), t.register(this.lines.onInsert((e) => {
			t.line >= e.index && (t.line += e.amount);
		})), t.register(this.lines.onDelete((e) => {
			t.line >= e.index && t.line < e.index + e.amount && t.dispose(), t.line > e.index && (t.line -= e.amount);
		})), t.register(t.onDispose(() => this._removeMarker(t))), t;
	}
	_removeMarker(e) {
		this._isClearing || this.markers.splice(this.markers.indexOf(e), 1);
	}
}, no = class extends O {
	constructor(e, t) {
		super(), this._optionsService = e, this._bufferService = t, this._onBufferActivate = this._register(new A()), this.onBufferActivate = this._onBufferActivate.event, this.reset(), this._register(this._optionsService.onSpecificOptionChange("scrollback", () => this.resize(this._bufferService.cols, this._bufferService.rows))), this._register(this._optionsService.onSpecificOptionChange("tabStopWidth", () => this.setupTabStops()));
	}
	reset() {
		this._normal = new to(!0, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new to(!1, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({
			activeBuffer: this._normal,
			inactiveBuffer: this._alt
		}), this.setupTabStops();
	}
	get alt() {
		return this._alt;
	}
	get active() {
		return this._activeBuffer;
	}
	get normal() {
		return this._normal;
	}
	activateNormalBuffer() {
		this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({
			activeBuffer: this._normal,
			inactiveBuffer: this._alt
		}));
	}
	activateAltBuffer(e) {
		this._activeBuffer !== this._alt && (this._alt.fillViewportRows(e), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({
			activeBuffer: this._alt,
			inactiveBuffer: this._normal
		}));
	}
	resize(e, t) {
		this._normal.resize(e, t), this._alt.resize(e, t), this.setupTabStops(e);
	}
	setupTabStops(e) {
		this._normal.setupTabStops(e), this._alt.setupTabStops(e);
	}
}, ro = 2, io = 1, ao = class extends O {
	constructor(e) {
		super(), this.isUserScrolling = !1, this._onResize = this._register(new A()), this.onResize = this._onResize.event, this._onScroll = this._register(new A()), this.onScroll = this._onScroll.event, this.cols = Math.max(e.rawOptions.cols || 0, ro), this.rows = Math.max(e.rawOptions.rows || 0, io), this.buffers = this._register(new no(e, this)), this._register(this.buffers.onBufferActivate((e) => {
			this._onScroll.fire(e.activeBuffer.ydisp);
		}));
	}
	get buffer() {
		return this.buffers.active;
	}
	resize(e, t) {
		let n = this.cols !== e, r = this.rows !== t;
		this.cols = e, this.rows = t, this.buffers.resize(e, t), this._onResize.fire({
			cols: e,
			rows: t,
			colsChanged: n,
			rowsChanged: r
		});
	}
	reset() {
		this.buffers.reset(), this.isUserScrolling = !1;
	}
	scroll(e, t = !1) {
		let n = this.buffer, r;
		r = this._cachedBlankLine, r && r.length === this.cols && r.getFg(0) === e.fg && r.getBg(0) === e.bg || (r = n.getBlankLine(e, t), this._cachedBlankLine = r), r.isWrapped = t;
		let i = n.ybase + n.scrollTop, a = n.ybase + n.scrollBottom;
		if (n.scrollTop === 0) {
			let e = n.lines.isFull;
			a === n.lines.length - 1 ? e ? n.lines.recycle().copyFrom(r) : n.lines.push(r.clone()) : n.lines.splice(a + 1, 0, r.clone()), e ? this.isUserScrolling && (n.ydisp = Math.max(n.ydisp - 1, 0)) : (n.ybase++, this.isUserScrolling || n.ydisp++);
		} else {
			let e = a - i + 1;
			n.lines.shiftElements(i + 1, e - 1, -1), n.lines.set(a, r.clone());
		}
		this.isUserScrolling || (n.ydisp = n.ybase), this._onScroll.fire(n.ydisp);
	}
	scrollLines(e, t) {
		let n = this.buffer;
		if (e < 0) {
			if (n.ydisp === 0) return;
			this.isUserScrolling = !0;
		} else e + n.ydisp >= n.ybase && (this.isUserScrolling = !1);
		let r = n.ydisp;
		n.ydisp = Math.max(Math.min(n.ydisp + e, n.ybase), 0), r !== n.ydisp && (t || this._onScroll.fire(n.ydisp));
	}
};
ao = x([S(0, ke)], ao);
var oo = {
	cols: 80,
	rows: 24,
	cursorBlink: !1,
	cursorStyle: "block",
	cursorWidth: 1,
	cursorInactiveStyle: "outline",
	customGlyphs: !0,
	drawBoldTextInBrightColors: !0,
	documentOverride: null,
	fastScrollModifier: "alt",
	fastScrollSensitivity: 5,
	fontFamily: "monospace",
	fontSize: 15,
	fontWeight: "normal",
	fontWeightBold: "bold",
	ignoreBracketedPasteMode: !1,
	lineHeight: 1,
	letterSpacing: 0,
	linkHandler: null,
	logLevel: "info",
	logger: null,
	scrollback: 1e3,
	scrollOnEraseInDisplay: !1,
	scrollOnUserInput: !0,
	scrollSensitivity: 1,
	screenReaderMode: !1,
	smoothScrollDuration: 0,
	macOptionIsMeta: !1,
	macOptionClickForcesSelection: !1,
	minimumContrastRatio: 1,
	disableStdin: !1,
	allowProposedApi: !1,
	allowTransparency: !1,
	tabStopWidth: 8,
	theme: {},
	reflowCursorLine: !1,
	rescaleOverlappingGlyphs: !1,
	rightClickSelectsWord: Ki,
	windowOptions: {},
	windowsMode: !1,
	windowsPty: {},
	wordSeparator: " ()[]{}',\"`",
	altClickMovesCursor: !0,
	convertEol: !1,
	termName: "xterm",
	cancelEvents: !1,
	overviewRuler: {}
}, so = [
	"normal",
	"bold",
	"100",
	"200",
	"300",
	"400",
	"500",
	"600",
	"700",
	"800",
	"900"
], co = class extends O {
	constructor(e) {
		super(), this._onOptionChange = this._register(new A()), this.onOptionChange = this._onOptionChange.event;
		let t = { ...oo };
		for (let n in e) if (n in t) try {
			let r = e[n];
			t[n] = this._sanitizeAndValidateOption(n, r);
		} catch (e) {
			console.error(e);
		}
		this.rawOptions = t, this.options = { ...t }, this._setupOptions(), this._register(D(() => {
			this.rawOptions.linkHandler = null, this.rawOptions.documentOverride = null;
		}));
	}
	onSpecificOptionChange(e, t) {
		return this.onOptionChange((n) => {
			n === e && t(this.rawOptions[e]);
		});
	}
	onMultipleOptionChange(e, t) {
		return this.onOptionChange((n) => {
			e.indexOf(n) !== -1 && t();
		});
	}
	_setupOptions() {
		let e = (e) => {
			if (!(e in oo)) throw Error(`No option with key "${e}"`);
			return this.rawOptions[e];
		}, t = (e, t) => {
			if (!(e in oo)) throw Error(`No option with key "${e}"`);
			t = this._sanitizeAndValidateOption(e, t), this.rawOptions[e] !== t && (this.rawOptions[e] = t, this._onOptionChange.fire(e));
		};
		for (let n in this.rawOptions) {
			let r = {
				get: e.bind(this, n),
				set: t.bind(this, n)
			};
			Object.defineProperty(this.options, n, r);
		}
	}
	_sanitizeAndValidateOption(e, t) {
		switch (e) {
			case "cursorStyle":
				if (t ||= oo[e], !lo(t)) throw Error(`"${t}" is not a valid value for ${e}`);
				break;
			case "wordSeparator":
				t ||= oo[e];
				break;
			case "fontWeight":
			case "fontWeightBold":
				if (typeof t == "number" && 1 <= t && t <= 1e3) break;
				t = so.includes(t) ? t : oo[e];
				break;
			case "cursorWidth": t = Math.floor(t);
			case "lineHeight":
			case "tabStopWidth":
				if (t < 1) throw Error(`${e} cannot be less than 1, value: ${t}`);
				break;
			case "minimumContrastRatio":
				t = Math.max(1, Math.min(21, Math.round(t * 10) / 10));
				break;
			case "scrollback":
				if (t = Math.min(t, 4294967295), t < 0) throw Error(`${e} cannot be less than 0, value: ${t}`);
				break;
			case "fastScrollSensitivity":
			case "scrollSensitivity":
				if (t <= 0) throw Error(`${e} cannot be less than or equal to 0, value: ${t}`);
				break;
			case "rows":
			case "cols":
				if (!t && t !== 0) throw Error(`${e} must be numeric, value: ${t}`);
				break;
			case "windowsPty": t ??= {};
		}
		return t;
	}
};
function lo(e) {
	return e === "block" || e === "underline" || e === "bar";
}
function uo(e, t = 5) {
	if (typeof e != "object") return e;
	let n = Array.isArray(e) ? [] : {};
	for (let r in e) n[r] = t <= 1 ? e[r] : e[r] && uo(e[r], t - 1);
	return n;
}
var fo = Object.freeze({ insertMode: !1 }), po = Object.freeze({
	applicationCursorKeys: !1,
	applicationKeypad: !1,
	bracketedPasteMode: !1,
	cursorBlink: void 0,
	cursorStyle: void 0,
	origin: !1,
	reverseWraparound: !1,
	sendFocus: !1,
	synchronizedOutput: !1,
	wraparound: !0
}), mo = class extends O {
	constructor(e, t, n) {
		super(), this._bufferService = e, this._logService = t, this._optionsService = n, this.isCursorInitialized = !1, this.isCursorHidden = !1, this._onData = this._register(new A()), this.onData = this._onData.event, this._onUserInput = this._register(new A()), this.onUserInput = this._onUserInput.event, this._onBinary = this._register(new A()), this.onBinary = this._onBinary.event, this._onRequestScrollToBottom = this._register(new A()), this.onRequestScrollToBottom = this._onRequestScrollToBottom.event, this.modes = uo(fo), this.decPrivateModes = uo(po);
	}
	reset() {
		this.modes = uo(fo), this.decPrivateModes = uo(po);
	}
	triggerDataEvent(e, t = !1) {
		if (this._optionsService.rawOptions.disableStdin) return;
		let n = this._bufferService.buffer;
		t && this._optionsService.rawOptions.scrollOnUserInput && n.ybase !== n.ydisp && this._onRequestScrollToBottom.fire(), t && this._onUserInput.fire(), this._logService.debug(`sending data "${e}"`), this._logService.trace("sending data (codes)", () => e.split("").map((e) => e.charCodeAt(0))), this._onData.fire(e);
	}
	triggerBinaryEvent(e) {
		this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${e}"`), this._logService.trace("sending binary (codes)", () => e.split("").map((e) => e.charCodeAt(0))), this._onBinary.fire(e));
	}
};
mo = x([
	S(0, Ce),
	S(1, Oe),
	S(2, ke)
], mo);
var ho = {
	NONE: {
		events: 0,
		restrict: () => !1
	},
	X10: {
		events: 1,
		restrict: (e) => e.button === 4 || e.action !== 1 ? !1 : (e.ctrl = !1, e.alt = !1, e.shift = !1, !0)
	},
	VT200: {
		events: 19,
		restrict: (e) => e.action !== 32
	},
	DRAG: {
		events: 23,
		restrict: (e) => e.action !== 32 || e.button !== 3
	},
	ANY: {
		events: 31,
		restrict: (e) => !0
	}
};
function go(e, t) {
	let n = (e.ctrl ? 16 : 0) | (e.shift ? 4 : 0) | (e.alt ? 8 : 0);
	return e.button === 4 ? (n |= 64, n |= e.action) : (n |= e.button & 3, e.button & 4 && (n |= 64), e.button & 8 && (n |= 128), e.action === 32 ? n |= 32 : e.action === 0 && !t && (n |= 3)), n;
}
var _o = String.fromCharCode, vo = {
	DEFAULT: (e) => {
		let t = [
			go(e, !1) + 32,
			e.col + 32,
			e.row + 32
		];
		return t[0] > 255 || t[1] > 255 || t[2] > 255 ? "" : `\x1B[M${_o(t[0])}${_o(t[1])}${_o(t[2])}`;
	},
	SGR: (e) => {
		let t = e.action === 0 && e.button !== 4 ? "m" : "M";
		return `\x1B[<${go(e, !0)};${e.col};${e.row}${t}`;
	},
	SGR_PIXELS: (e) => {
		let t = e.action === 0 && e.button !== 4 ? "m" : "M";
		return `\x1B[<${go(e, !0)};${e.x};${e.y}${t}`;
	}
}, yo = class extends O {
	constructor(e, t, n) {
		super(), this._bufferService = e, this._coreService = t, this._optionsService = n, this._protocols = {}, this._encodings = {}, this._activeProtocol = "", this._activeEncoding = "", this._lastEvent = null, this._wheelPartialScroll = 0, this._onProtocolChange = this._register(new A()), this.onProtocolChange = this._onProtocolChange.event;
		for (let e of Object.keys(ho)) this.addProtocol(e, ho[e]);
		for (let e of Object.keys(vo)) this.addEncoding(e, vo[e]);
		this.reset();
	}
	addProtocol(e, t) {
		this._protocols[e] = t;
	}
	addEncoding(e, t) {
		this._encodings[e] = t;
	}
	get activeProtocol() {
		return this._activeProtocol;
	}
	get areMouseEventsActive() {
		return this._protocols[this._activeProtocol].events !== 0;
	}
	set activeProtocol(e) {
		if (!this._protocols[e]) throw Error(`unknown protocol "${e}"`);
		this._activeProtocol = e, this._onProtocolChange.fire(this._protocols[e].events);
	}
	get activeEncoding() {
		return this._activeEncoding;
	}
	set activeEncoding(e) {
		if (!this._encodings[e]) throw Error(`unknown encoding "${e}"`);
		this._activeEncoding = e;
	}
	reset() {
		this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null, this._wheelPartialScroll = 0;
	}
	consumeWheelEvent(e, t, n) {
		if (e.deltaY === 0 || e.shiftKey || t === void 0 || n === void 0) return 0;
		let r = t / n, i = this._applyScrollModifier(e.deltaY, e);
		return e.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (i /= r + 0, Math.abs(e.deltaY) < 50 && (i *= .3), this._wheelPartialScroll += i, i = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : e.deltaMode === WheelEvent.DOM_DELTA_PAGE && (i *= this._bufferService.rows), i;
	}
	_applyScrollModifier(e, t) {
		return t.altKey || t.ctrlKey || t.shiftKey ? e * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : e * this._optionsService.rawOptions.scrollSensitivity;
	}
	triggerMouseEvent(e) {
		if (e.col < 0 || e.col >= this._bufferService.cols || e.row < 0 || e.row >= this._bufferService.rows || e.button === 4 && e.action === 32 || e.button === 3 && e.action !== 32 || e.button !== 4 && (e.action === 2 || e.action === 3) || (e.col++, e.row++, e.action === 32 && this._lastEvent && this._equalEvents(this._lastEvent, e, this._activeEncoding === "SGR_PIXELS")) || !this._protocols[this._activeProtocol].restrict(e)) return !1;
		let t = this._encodings[this._activeEncoding](e);
		return t && (this._activeEncoding === "DEFAULT" ? this._coreService.triggerBinaryEvent(t) : this._coreService.triggerDataEvent(t, !0)), this._lastEvent = e, !0;
	}
	explainEvents(e) {
		return {
			down: !!(e & 1),
			up: !!(e & 2),
			drag: !!(e & 4),
			move: !!(e & 8),
			wheel: !!(e & 16)
		};
	}
	_equalEvents(e, t, n) {
		if (n) {
			if (e.x !== t.x || e.y !== t.y) return !1;
		} else if (e.col !== t.col || e.row !== t.row) return !1;
		return e.button === t.button && e.action === t.action && e.ctrl === t.ctrl && e.alt === t.alt && e.shift === t.shift;
	}
};
yo = x([
	S(0, Ce),
	S(1, Te),
	S(2, ke)
], yo);
var bo = [
	[768, 879],
	[1155, 1158],
	[1160, 1161],
	[1425, 1469],
	[1471, 1471],
	[1473, 1474],
	[1476, 1477],
	[1479, 1479],
	[1536, 1539],
	[1552, 1557],
	[1611, 1630],
	[1648, 1648],
	[1750, 1764],
	[1767, 1768],
	[1770, 1773],
	[1807, 1807],
	[1809, 1809],
	[1840, 1866],
	[1958, 1968],
	[2027, 2035],
	[2305, 2306],
	[2364, 2364],
	[2369, 2376],
	[2381, 2381],
	[2385, 2388],
	[2402, 2403],
	[2433, 2433],
	[2492, 2492],
	[2497, 2500],
	[2509, 2509],
	[2530, 2531],
	[2561, 2562],
	[2620, 2620],
	[2625, 2626],
	[2631, 2632],
	[2635, 2637],
	[2672, 2673],
	[2689, 2690],
	[2748, 2748],
	[2753, 2757],
	[2759, 2760],
	[2765, 2765],
	[2786, 2787],
	[2817, 2817],
	[2876, 2876],
	[2879, 2879],
	[2881, 2883],
	[2893, 2893],
	[2902, 2902],
	[2946, 2946],
	[3008, 3008],
	[3021, 3021],
	[3134, 3136],
	[3142, 3144],
	[3146, 3149],
	[3157, 3158],
	[3260, 3260],
	[3263, 3263],
	[3270, 3270],
	[3276, 3277],
	[3298, 3299],
	[3393, 3395],
	[3405, 3405],
	[3530, 3530],
	[3538, 3540],
	[3542, 3542],
	[3633, 3633],
	[3636, 3642],
	[3655, 3662],
	[3761, 3761],
	[3764, 3769],
	[3771, 3772],
	[3784, 3789],
	[3864, 3865],
	[3893, 3893],
	[3895, 3895],
	[3897, 3897],
	[3953, 3966],
	[3968, 3972],
	[3974, 3975],
	[3984, 3991],
	[3993, 4028],
	[4038, 4038],
	[4141, 4144],
	[4146, 4146],
	[4150, 4151],
	[4153, 4153],
	[4184, 4185],
	[4448, 4607],
	[4959, 4959],
	[5906, 5908],
	[5938, 5940],
	[5970, 5971],
	[6002, 6003],
	[6068, 6069],
	[6071, 6077],
	[6086, 6086],
	[6089, 6099],
	[6109, 6109],
	[6155, 6157],
	[6313, 6313],
	[6432, 6434],
	[6439, 6440],
	[6450, 6450],
	[6457, 6459],
	[6679, 6680],
	[6912, 6915],
	[6964, 6964],
	[6966, 6970],
	[6972, 6972],
	[6978, 6978],
	[7019, 7027],
	[7616, 7626],
	[7678, 7679],
	[8203, 8207],
	[8234, 8238],
	[8288, 8291],
	[8298, 8303],
	[8400, 8431],
	[12330, 12335],
	[12441, 12442],
	[43014, 43014],
	[43019, 43019],
	[43045, 43046],
	[64286, 64286],
	[65024, 65039],
	[65056, 65059],
	[65279, 65279],
	[65529, 65531]
], xo = [
	[68097, 68099],
	[68101, 68102],
	[68108, 68111],
	[68152, 68154],
	[68159, 68159],
	[119143, 119145],
	[119155, 119170],
	[119173, 119179],
	[119210, 119213],
	[119362, 119364],
	[917505, 917505],
	[917536, 917631],
	[917760, 917999]
], V;
function So(e, t) {
	let n = 0, r = t.length - 1, i;
	if (e < t[0][0] || e > t[r][1]) return !1;
	for (; r >= n;) if (i = n + r >> 1, e > t[i][1]) n = i + 1;
	else if (e < t[i][0]) r = i - 1;
	else return !0;
	return !1;
}
var Co = class {
	constructor() {
		if (this.version = "6", !V) {
			V = /* @__PURE__ */ new Uint8Array(65536), V.fill(1), V[0] = 0, V.fill(0, 1, 32), V.fill(0, 127, 160), V.fill(2, 4352, 4448), V[9001] = 2, V[9002] = 2, V.fill(2, 11904, 42192), V[12351] = 1, V.fill(2, 44032, 55204), V.fill(2, 63744, 64256), V.fill(2, 65040, 65050), V.fill(2, 65072, 65136), V.fill(2, 65280, 65377), V.fill(2, 65504, 65511);
			for (let e = 0; e < bo.length; ++e) V.fill(0, bo[e][0], bo[e][1] + 1);
		}
	}
	wcwidth(e) {
		return e < 32 ? 0 : e < 127 ? 1 : e < 65536 ? V[e] : So(e, xo) ? 0 : e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141 ? 2 : 1;
	}
	charProperties(e, t) {
		let n = this.wcwidth(e), r = n === 0 && t !== 0;
		if (r) {
			let e = wo.extractWidth(t);
			e === 0 ? r = !1 : e > n && (n = e);
		}
		return wo.createPropertyValue(0, n, r);
	}
}, wo = class e {
	constructor() {
		this._providers = Object.create(null), this._active = "", this._onChange = new A(), this.onChange = this._onChange.event;
		let e = new Co();
		this.register(e), this._active = e.version, this._activeProvider = e;
	}
	static extractShouldJoin(e) {
		return !!(e & 1);
	}
	static extractWidth(e) {
		return e >> 1 & 3;
	}
	static extractCharKind(e) {
		return e >> 3;
	}
	static createPropertyValue(e, t, n = !1) {
		return (e & 16777215) << 3 | (t & 3) << 1 | !!n;
	}
	dispose() {
		this._onChange.dispose();
	}
	get versions() {
		return Object.keys(this._providers);
	}
	get activeVersion() {
		return this._active;
	}
	set activeVersion(e) {
		if (!this._providers[e]) throw Error(`unknown Unicode version "${e}"`);
		this._active = e, this._activeProvider = this._providers[e], this._onChange.fire(e);
	}
	register(e) {
		this._providers[e.version] = e;
	}
	wcwidth(e) {
		return this._activeProvider.wcwidth(e);
	}
	getStringCellWidth(t) {
		let n = 0, r = 0, i = t.length;
		for (let a = 0; a < i; ++a) {
			let o = t.charCodeAt(a);
			if (55296 <= o && o <= 56319) {
				if (++a >= i) return n + this.wcwidth(o);
				let e = t.charCodeAt(a);
				56320 <= e && e <= 57343 ? o = (o - 55296) * 1024 + e - 56320 + 65536 : n += this.wcwidth(e);
			}
			let s = this.charProperties(o, r), c = e.extractWidth(s);
			e.extractShouldJoin(s) && (c -= e.extractWidth(r)), n += c, r = s;
		}
		return n;
	}
	charProperties(e, t) {
		return this._activeProvider.charProperties(e, t);
	}
}, To = class {
	constructor() {
		this.glevel = 0, this._charsets = [];
	}
	reset() {
		this.charset = void 0, this._charsets = [], this.glevel = 0;
	}
	setgLevel(e) {
		this.glevel = e, this.charset = this._charsets[e];
	}
	setgCharset(e, t) {
		this._charsets[e] = t, this.glevel === e && (this.charset = t);
	}
};
function Eo(e) {
	let t = e.buffer.lines.get(e.buffer.ybase + e.buffer.y - 1)?.get(e.cols - 1), n = e.buffer.lines.get(e.buffer.ybase + e.buffer.y);
	n && t && (n.isWrapped = t[3] !== 0 && t[3] !== 32);
}
var Do = 2147483647, Oo = 256, ko = class e {
	constructor(e = 32, t = 32) {
		if (this.maxLength = e, this.maxSubParamsLength = t, t > Oo) throw Error("maxSubParamsLength must not be greater than 256");
		this.params = new Int32Array(e), this.length = 0, this._subParams = new Int32Array(t), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(e), this._rejectDigits = !1, this._rejectSubDigits = !1, this._digitIsSub = !1;
	}
	static fromArray(t) {
		let n = new e();
		if (!t.length) return n;
		for (let e = +!!Array.isArray(t[0]); e < t.length; ++e) {
			let r = t[e];
			if (Array.isArray(r)) for (let e = 0; e < r.length; ++e) n.addSubParam(r[e]);
			else n.addParam(r);
		}
		return n;
	}
	clone() {
		let t = new e(this.maxLength, this.maxSubParamsLength);
		return t.params.set(this.params), t.length = this.length, t._subParams.set(this._subParams), t._subParamsLength = this._subParamsLength, t._subParamsIdx.set(this._subParamsIdx), t._rejectDigits = this._rejectDigits, t._rejectSubDigits = this._rejectSubDigits, t._digitIsSub = this._digitIsSub, t;
	}
	toArray() {
		let e = [];
		for (let t = 0; t < this.length; ++t) {
			e.push(this.params[t]);
			let n = this._subParamsIdx[t] >> 8, r = this._subParamsIdx[t] & 255;
			r - n > 0 && e.push(Array.prototype.slice.call(this._subParams, n, r));
		}
		return e;
	}
	reset() {
		this.length = 0, this._subParamsLength = 0, this._rejectDigits = !1, this._rejectSubDigits = !1, this._digitIsSub = !1;
	}
	addParam(e) {
		if (this._digitIsSub = !1, this.length >= this.maxLength) this._rejectDigits = !0;
		else {
			if (e < -1) throw Error("values lesser than -1 are not allowed");
			this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = e > Do ? Do : e;
		}
	}
	addSubParam(e) {
		if (this._digitIsSub = !0, this.length) {
			if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength) {
				this._rejectSubDigits = !0;
				return;
			}
			if (e < -1) throw Error("values lesser than -1 are not allowed");
			this._subParams[this._subParamsLength++] = e > Do ? Do : e, this._subParamsIdx[this.length - 1]++;
		}
	}
	hasSubParams(e) {
		return (this._subParamsIdx[e] & 255) - (this._subParamsIdx[e] >> 8) > 0;
	}
	getSubParams(e) {
		let t = this._subParamsIdx[e] >> 8, n = this._subParamsIdx[e] & 255;
		return n - t > 0 ? this._subParams.subarray(t, n) : null;
	}
	getSubParamsAll() {
		let e = {};
		for (let t = 0; t < this.length; ++t) {
			let n = this._subParamsIdx[t] >> 8, r = this._subParamsIdx[t] & 255;
			r - n > 0 && (e[t] = this._subParams.slice(n, r));
		}
		return e;
	}
	addDigit(e) {
		let t;
		if (this._rejectDigits || !(t = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits) return;
		let n = this._digitIsSub ? this._subParams : this.params, r = n[t - 1];
		n[t - 1] = ~r ? Math.min(r * 10 + e, Do) : e;
	}
}, Ao = [], jo = class {
	constructor() {
		this._state = 0, this._active = Ao, this._id = -1, this._handlers = Object.create(null), this._handlerFb = () => {}, this._stack = {
			paused: !1,
			loopPosition: 0,
			fallThrough: !1
		};
	}
	registerHandler(e, t) {
		this._handlers[e] === void 0 && (this._handlers[e] = []);
		let n = this._handlers[e];
		return n.push(t), { dispose: () => {
			let e = n.indexOf(t);
			e !== -1 && n.splice(e, 1);
		} };
	}
	clearHandler(e) {
		this._handlers[e] && delete this._handlers[e];
	}
	setHandlerFallback(e) {
		this._handlerFb = e;
	}
	dispose() {
		this._handlers = Object.create(null), this._handlerFb = () => {}, this._active = Ao;
	}
	reset() {
		if (this._state === 2) for (let e = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; e >= 0; --e) this._active[e].end(!1);
		this._stack.paused = !1, this._active = Ao, this._id = -1, this._state = 0;
	}
	_start() {
		if (this._active = this._handlers[this._id] || Ao, !this._active.length) this._handlerFb(this._id, "START");
		else for (let e = this._active.length - 1; e >= 0; e--) this._active[e].start();
	}
	_put(e, t, n) {
		if (!this._active.length) this._handlerFb(this._id, "PUT", de(e, t, n));
		else for (let r = this._active.length - 1; r >= 0; r--) this._active[r].put(e, t, n);
	}
	start() {
		this.reset(), this._state = 1;
	}
	put(e, t, n) {
		if (this._state !== 3) {
			if (this._state === 1) for (; t < n;) {
				let n = e[t++];
				if (n === 59) {
					this._state = 2, this._start();
					break;
				}
				if (n < 48 || 57 < n) {
					this._state = 3;
					return;
				}
				this._id === -1 && (this._id = 0), this._id = this._id * 10 + n - 48;
			}
			this._state === 2 && n - t > 0 && this._put(e, t, n);
		}
	}
	end(e, t = !0) {
		if (this._state !== 0) {
			if (this._state !== 3) {
				if (this._state === 1 && this._start(), !this._active.length) this._handlerFb(this._id, "END", e);
				else {
					let n = !1, r = this._active.length - 1, i = !1;
					if (this._stack.paused && (r = this._stack.loopPosition - 1, n = t, i = this._stack.fallThrough, this._stack.paused = !1), !i && n === !1) {
						for (; r >= 0 && (n = this._active[r].end(e), n !== !0); r--) if (n instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = r, this._stack.fallThrough = !1, n;
						r--;
					}
					for (; r >= 0; r--) if (n = this._active[r].end(!1), n instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = r, this._stack.fallThrough = !0, n;
				}
			}
			this._active = Ao, this._id = -1, this._state = 0;
		}
	}
}, Mo = class {
	constructor(e) {
		this._handler = e, this._data = "", this._hitLimit = !1;
	}
	start() {
		this._data = "", this._hitLimit = !1;
	}
	put(e, t, n) {
		this._hitLimit || (this._data += de(e, t, n), this._data.length > 1e7 && (this._data = "", this._hitLimit = !0));
	}
	end(e) {
		let t = !1;
		if (this._hitLimit) t = !1;
		else if (e && (t = this._handler(this._data), t instanceof Promise)) return t.then((e) => (this._data = "", this._hitLimit = !1, e));
		return this._data = "", this._hitLimit = !1, t;
	}
}, No = [], Po = class {
	constructor() {
		this._handlers = Object.create(null), this._active = No, this._ident = 0, this._handlerFb = () => {}, this._stack = {
			paused: !1,
			loopPosition: 0,
			fallThrough: !1
		};
	}
	dispose() {
		this._handlers = Object.create(null), this._handlerFb = () => {}, this._active = No;
	}
	registerHandler(e, t) {
		this._handlers[e] === void 0 && (this._handlers[e] = []);
		let n = this._handlers[e];
		return n.push(t), { dispose: () => {
			let e = n.indexOf(t);
			e !== -1 && n.splice(e, 1);
		} };
	}
	clearHandler(e) {
		this._handlers[e] && delete this._handlers[e];
	}
	setHandlerFallback(e) {
		this._handlerFb = e;
	}
	reset() {
		if (this._active.length) for (let e = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; e >= 0; --e) this._active[e].unhook(!1);
		this._stack.paused = !1, this._active = No, this._ident = 0;
	}
	hook(e, t) {
		if (this.reset(), this._ident = e, this._active = this._handlers[e] || No, !this._active.length) this._handlerFb(this._ident, "HOOK", t);
		else for (let e = this._active.length - 1; e >= 0; e--) this._active[e].hook(t);
	}
	put(e, t, n) {
		if (!this._active.length) this._handlerFb(this._ident, "PUT", de(e, t, n));
		else for (let r = this._active.length - 1; r >= 0; r--) this._active[r].put(e, t, n);
	}
	unhook(e, t = !0) {
		if (!this._active.length) this._handlerFb(this._ident, "UNHOOK", e);
		else {
			let n = !1, r = this._active.length - 1, i = !1;
			if (this._stack.paused && (r = this._stack.loopPosition - 1, n = t, i = this._stack.fallThrough, this._stack.paused = !1), !i && n === !1) {
				for (; r >= 0 && (n = this._active[r].unhook(e), n !== !0); r--) if (n instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = r, this._stack.fallThrough = !1, n;
				r--;
			}
			for (; r >= 0; r--) if (n = this._active[r].unhook(!1), n instanceof Promise) return this._stack.paused = !0, this._stack.loopPosition = r, this._stack.fallThrough = !0, n;
		}
		this._active = No, this._ident = 0;
	}
}, Fo = new ko();
Fo.addParam(0);
var Io = class {
	constructor(e) {
		this._handler = e, this._data = "", this._params = Fo, this._hitLimit = !1;
	}
	hook(e) {
		this._params = e.length > 1 || e.params[0] ? e.clone() : Fo, this._data = "", this._hitLimit = !1;
	}
	put(e, t, n) {
		this._hitLimit || (this._data += de(e, t, n), this._data.length > 1e7 && (this._data = "", this._hitLimit = !0));
	}
	unhook(e) {
		let t = !1;
		if (this._hitLimit) t = !1;
		else if (e && (t = this._handler(this._data, this._params), t instanceof Promise)) return t.then((e) => (this._params = Fo, this._data = "", this._hitLimit = !1, e));
		return this._params = Fo, this._data = "", this._hitLimit = !1, t;
	}
}, Lo = class {
	constructor(e) {
		this.table = new Uint8Array(e);
	}
	setDefault(e, t) {
		this.table.fill(e << 4 | t);
	}
	add(e, t, n, r) {
		this.table[t << 8 | e] = n << 4 | r;
	}
	addMany(e, t, n, r) {
		for (let i = 0; i < e.length; i++) this.table[t << 8 | e[i]] = n << 4 | r;
	}
}, Ro = 160, zo = function() {
	let e = new Lo(4095), t = Array.apply(null, Array(256)).map((e, t) => t), n = (e, n) => t.slice(e, n), r = n(32, 127), i = n(0, 24);
	i.push(25), i.push.apply(i, n(28, 32));
	let a = n(0, 14), o;
	for (o in e.setDefault(1, 0), e.addMany(r, 0, 2, 0), a) e.addMany([
		24,
		26,
		153,
		154
	], o, 3, 0), e.addMany(n(128, 144), o, 3, 0), e.addMany(n(144, 152), o, 3, 0), e.add(156, o, 0, 0), e.add(27, o, 11, 1), e.add(157, o, 4, 8), e.addMany([
		152,
		158,
		159
	], o, 0, 7), e.add(155, o, 11, 3), e.add(144, o, 11, 9);
	return e.addMany(i, 0, 3, 0), e.addMany(i, 1, 3, 1), e.add(127, 1, 0, 1), e.addMany(i, 8, 0, 8), e.addMany(i, 3, 3, 3), e.add(127, 3, 0, 3), e.addMany(i, 4, 3, 4), e.add(127, 4, 0, 4), e.addMany(i, 6, 3, 6), e.addMany(i, 5, 3, 5), e.add(127, 5, 0, 5), e.addMany(i, 2, 3, 2), e.add(127, 2, 0, 2), e.add(93, 1, 4, 8), e.addMany(r, 8, 5, 8), e.add(127, 8, 5, 8), e.addMany([
		156,
		27,
		24,
		26,
		7
	], 8, 6, 0), e.addMany(n(28, 32), 8, 0, 8), e.addMany([
		88,
		94,
		95
	], 1, 0, 7), e.addMany(r, 7, 0, 7), e.addMany(i, 7, 0, 7), e.add(156, 7, 0, 0), e.add(127, 7, 0, 7), e.add(91, 1, 11, 3), e.addMany(n(64, 127), 3, 7, 0), e.addMany(n(48, 60), 3, 8, 4), e.addMany([
		60,
		61,
		62,
		63
	], 3, 9, 4), e.addMany(n(48, 60), 4, 8, 4), e.addMany(n(64, 127), 4, 7, 0), e.addMany([
		60,
		61,
		62,
		63
	], 4, 0, 6), e.addMany(n(32, 64), 6, 0, 6), e.add(127, 6, 0, 6), e.addMany(n(64, 127), 6, 0, 0), e.addMany(n(32, 48), 3, 9, 5), e.addMany(n(32, 48), 5, 9, 5), e.addMany(n(48, 64), 5, 0, 6), e.addMany(n(64, 127), 5, 7, 0), e.addMany(n(32, 48), 4, 9, 5), e.addMany(n(32, 48), 1, 9, 2), e.addMany(n(32, 48), 2, 9, 2), e.addMany(n(48, 127), 2, 10, 0), e.addMany(n(48, 80), 1, 10, 0), e.addMany(n(81, 88), 1, 10, 0), e.addMany([
		89,
		90,
		92
	], 1, 10, 0), e.addMany(n(96, 127), 1, 10, 0), e.add(80, 1, 11, 9), e.addMany(i, 9, 0, 9), e.add(127, 9, 0, 9), e.addMany(n(28, 32), 9, 0, 9), e.addMany(n(32, 48), 9, 9, 12), e.addMany(n(48, 60), 9, 8, 10), e.addMany([
		60,
		61,
		62,
		63
	], 9, 9, 10), e.addMany(i, 11, 0, 11), e.addMany(n(32, 128), 11, 0, 11), e.addMany(n(28, 32), 11, 0, 11), e.addMany(i, 10, 0, 10), e.add(127, 10, 0, 10), e.addMany(n(28, 32), 10, 0, 10), e.addMany(n(48, 60), 10, 8, 10), e.addMany([
		60,
		61,
		62,
		63
	], 10, 0, 11), e.addMany(n(32, 48), 10, 9, 12), e.addMany(i, 12, 0, 12), e.add(127, 12, 0, 12), e.addMany(n(28, 32), 12, 0, 12), e.addMany(n(32, 48), 12, 9, 12), e.addMany(n(48, 64), 12, 0, 11), e.addMany(n(64, 127), 12, 12, 13), e.addMany(n(64, 127), 10, 12, 13), e.addMany(n(64, 127), 9, 12, 13), e.addMany(i, 13, 13, 13), e.addMany(r, 13, 13, 13), e.add(127, 13, 0, 13), e.addMany([
		27,
		156,
		24,
		26
	], 13, 14, 0), e.add(Ro, 0, 2, 0), e.add(Ro, 8, 5, 8), e.add(Ro, 6, 0, 6), e.add(Ro, 11, 0, 11), e.add(Ro, 13, 13, 13), e;
}(), Bo = class extends O {
	constructor(e = zo) {
		super(), this._transitions = e, this._parseStack = {
			state: 0,
			handlers: [],
			handlerPos: 0,
			transition: 0,
			chunkPos: 0
		}, this.initialState = 0, this.currentState = this.initialState, this._params = new ko(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._printHandlerFb = (e, t, n) => {}, this._executeHandlerFb = (e) => {}, this._csiHandlerFb = (e, t) => {}, this._escHandlerFb = (e) => {}, this._errorHandlerFb = (e) => e, this._printHandler = this._printHandlerFb, this._executeHandlers = Object.create(null), this._csiHandlers = Object.create(null), this._escHandlers = Object.create(null), this._register(D(() => {
			this._csiHandlers = Object.create(null), this._executeHandlers = Object.create(null), this._escHandlers = Object.create(null);
		})), this._oscParser = this._register(new jo()), this._dcsParser = this._register(new Po()), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({ final: "\\" }, () => !0);
	}
	_identifier(e, t = [64, 126]) {
		let n = 0;
		if (e.prefix) {
			if (e.prefix.length > 1) throw Error("only one byte as prefix supported");
			if (n = e.prefix.charCodeAt(0), n && 60 > n || n > 63) throw Error("prefix must be in range 0x3c .. 0x3f");
		}
		if (e.intermediates) {
			if (e.intermediates.length > 2) throw Error("only two bytes as intermediates are supported");
			for (let t = 0; t < e.intermediates.length; ++t) {
				let r = e.intermediates.charCodeAt(t);
				if (32 > r || r > 47) throw Error("intermediate must be in range 0x20 .. 0x2f");
				n <<= 8, n |= r;
			}
		}
		if (e.final.length !== 1) throw Error("final must be a single byte");
		let r = e.final.charCodeAt(0);
		if (t[0] > r || r > t[1]) throw Error(`final must be in range ${t[0]} .. ${t[1]}`);
		return n <<= 8, n |= r, n;
	}
	identToString(e) {
		let t = [];
		for (; e;) t.push(String.fromCharCode(e & 255)), e >>= 8;
		return t.reverse().join("");
	}
	setPrintHandler(e) {
		this._printHandler = e;
	}
	clearPrintHandler() {
		this._printHandler = this._printHandlerFb;
	}
	registerEscHandler(e, t) {
		let n = this._identifier(e, [48, 126]);
		this._escHandlers[n] === void 0 && (this._escHandlers[n] = []);
		let r = this._escHandlers[n];
		return r.push(t), { dispose: () => {
			let e = r.indexOf(t);
			e !== -1 && r.splice(e, 1);
		} };
	}
	clearEscHandler(e) {
		this._escHandlers[this._identifier(e, [48, 126])] && delete this._escHandlers[this._identifier(e, [48, 126])];
	}
	setEscHandlerFallback(e) {
		this._escHandlerFb = e;
	}
	setExecuteHandler(e, t) {
		this._executeHandlers[e.charCodeAt(0)] = t;
	}
	clearExecuteHandler(e) {
		this._executeHandlers[e.charCodeAt(0)] && delete this._executeHandlers[e.charCodeAt(0)];
	}
	setExecuteHandlerFallback(e) {
		this._executeHandlerFb = e;
	}
	registerCsiHandler(e, t) {
		let n = this._identifier(e);
		this._csiHandlers[n] === void 0 && (this._csiHandlers[n] = []);
		let r = this._csiHandlers[n];
		return r.push(t), { dispose: () => {
			let e = r.indexOf(t);
			e !== -1 && r.splice(e, 1);
		} };
	}
	clearCsiHandler(e) {
		this._csiHandlers[this._identifier(e)] && delete this._csiHandlers[this._identifier(e)];
	}
	setCsiHandlerFallback(e) {
		this._csiHandlerFb = e;
	}
	registerDcsHandler(e, t) {
		return this._dcsParser.registerHandler(this._identifier(e), t);
	}
	clearDcsHandler(e) {
		this._dcsParser.clearHandler(this._identifier(e));
	}
	setDcsHandlerFallback(e) {
		this._dcsParser.setHandlerFallback(e);
	}
	registerOscHandler(e, t) {
		return this._oscParser.registerHandler(e, t);
	}
	clearOscHandler(e) {
		this._oscParser.clearHandler(e);
	}
	setOscHandlerFallback(e) {
		this._oscParser.setHandlerFallback(e);
	}
	setErrorHandler(e) {
		this._errorHandler = e;
	}
	clearErrorHandler() {
		this._errorHandler = this._errorHandlerFb;
	}
	reset() {
		this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._parseStack.state !== 0 && (this._parseStack.state = 2, this._parseStack.handlers = []);
	}
	_preserveStack(e, t, n, r, i) {
		this._parseStack.state = e, this._parseStack.handlers = t, this._parseStack.handlerPos = n, this._parseStack.transition = r, this._parseStack.chunkPos = i;
	}
	parse(e, t, n) {
		let r = 0, i = 0, a = 0, o;
		if (this._parseStack.state) {
			if (this._parseStack.state === 2) this._parseStack.state = 0, a = this._parseStack.chunkPos + 1;
			else {
				if (n === void 0 || this._parseStack.state === 1) throw this._parseStack.state = 1, /* @__PURE__ */ Error("improper continuation due to previous async handler, giving up parsing");
				let t = this._parseStack.handlers, i = this._parseStack.handlerPos - 1;
				switch (this._parseStack.state) {
					case 3:
						if (n === !1 && i > -1) {
							for (; i >= 0 && (o = t[i](this._params), o !== !0); i--) if (o instanceof Promise) return this._parseStack.handlerPos = i, o;
						}
						this._parseStack.handlers = [];
						break;
					case 4:
						if (n === !1 && i > -1) {
							for (; i >= 0 && (o = t[i](), o !== !0); i--) if (o instanceof Promise) return this._parseStack.handlerPos = i, o;
						}
						this._parseStack.handlers = [];
						break;
					case 6:
						if (r = e[this._parseStack.chunkPos], o = this._dcsParser.unhook(r !== 24 && r !== 26, n), o) return o;
						r === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
						break;
					case 5:
						if (r = e[this._parseStack.chunkPos], o = this._oscParser.end(r !== 24 && r !== 26, n), o) return o;
						r === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
				}
				this._parseStack.state = 0, a = this._parseStack.chunkPos + 1, this.precedingJoinState = 0, this.currentState = this._parseStack.transition & 15;
			}
		}
		for (let n = a; n < t; ++n) {
			switch (r = e[n], i = this._transitions.table[this.currentState << 8 | (r < 160 ? r : Ro)], i >> 4) {
				case 2:
					for (let i = n + 1;; ++i) if (i >= t || (r = e[i]) < 32 || r > 126 && r < Ro || ++i >= t || (r = e[i]) < 32 || r > 126 && r < Ro || ++i >= t || (r = e[i]) < 32 || r > 126 && r < Ro || ++i >= t || (r = e[i]) < 32 || r > 126 && r < Ro) {
						this._printHandler(e, n, i), n = i - 1;
						break;
					}
					break;
				case 3:
					this._executeHandlers[r] ? this._executeHandlers[r]() : this._executeHandlerFb(r), this.precedingJoinState = 0;
					break;
				case 0: break;
				case 1:
					if (this._errorHandler({
						position: n,
						code: r,
						currentState: this.currentState,
						collect: this._collect,
						params: this._params,
						abort: !1
					}).abort) return;
					break;
				case 7:
					let a = this._csiHandlers[this._collect << 8 | r], s = a ? a.length - 1 : -1;
					for (; s >= 0 && (o = a[s](this._params), o !== !0); s--) if (o instanceof Promise) return this._preserveStack(3, a, s, i, n), o;
					s < 0 && this._csiHandlerFb(this._collect << 8 | r, this._params), this.precedingJoinState = 0;
					break;
				case 8:
					do
						switch (r) {
							case 59:
								this._params.addParam(0);
								break;
							case 58:
								this._params.addSubParam(-1);
								break;
							default: this._params.addDigit(r - 48);
						}
					while (++n < t && (r = e[n]) > 47 && r < 60);
					n--;
					break;
				case 9:
					this._collect <<= 8, this._collect |= r;
					break;
				case 10:
					let c = this._escHandlers[this._collect << 8 | r], l = c ? c.length - 1 : -1;
					for (; l >= 0 && (o = c[l](), o !== !0); l--) if (o instanceof Promise) return this._preserveStack(4, c, l, i, n), o;
					l < 0 && this._escHandlerFb(this._collect << 8 | r), this.precedingJoinState = 0;
					break;
				case 11:
					this._params.reset(), this._params.addParam(0), this._collect = 0;
					break;
				case 12:
					this._dcsParser.hook(this._collect << 8 | r, this._params);
					break;
				case 13:
					for (let i = n + 1;; ++i) if (i >= t || (r = e[i]) === 24 || r === 26 || r === 27 || r > 127 && r < Ro) {
						this._dcsParser.put(e, n, i), n = i - 1;
						break;
					}
					break;
				case 14:
					if (o = this._dcsParser.unhook(r !== 24 && r !== 26), o) return this._preserveStack(6, [], 0, i, n), o;
					r === 27 && (i |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
					break;
				case 4:
					this._oscParser.start();
					break;
				case 5:
					for (let i = n + 1;; i++) if (i >= t || (r = e[i]) < 32 || r > 127 && r < Ro) {
						this._oscParser.put(e, n, i), n = i - 1;
						break;
					}
					break;
				case 6:
					if (o = this._oscParser.end(r !== 24 && r !== 26), o) return this._preserveStack(5, [], 0, i, n), o;
					r === 27 && (i |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
			}
			this.currentState = i & 15;
		}
	}
}, Vo = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/, Ho = /^[\da-f]+$/;
function Uo(e) {
	if (!e) return;
	let t = e.toLowerCase();
	if (t.indexOf("rgb:") === 0) {
		t = t.slice(4);
		let e = Vo.exec(t);
		if (e) {
			let t = e[1] ? 15 : e[4] ? 255 : e[7] ? 4095 : 65535;
			return [
				Math.round(parseInt(e[1] || e[4] || e[7] || e[10], 16) / t * 255),
				Math.round(parseInt(e[2] || e[5] || e[8] || e[11], 16) / t * 255),
				Math.round(parseInt(e[3] || e[6] || e[9] || e[12], 16) / t * 255)
			];
		}
	} else if (t.indexOf("#") === 0 && (t = t.slice(1), Ho.exec(t) && [
		3,
		6,
		9,
		12
	].includes(t.length))) {
		let e = t.length / 3, n = [
			0,
			0,
			0
		];
		for (let r = 0; r < 3; ++r) {
			let i = parseInt(t.slice(e * r, e * r + e), 16);
			n[r] = e === 1 ? i << 4 : e === 2 ? i : e === 3 ? i >> 4 : i >> 8;
		}
		return n;
	}
}
function Wo(e, t) {
	let n = e.toString(16), r = n.length < 2 ? "0" + n : n;
	switch (t) {
		case 4: return n[0];
		case 8: return r;
		case 12: return (r + r).slice(0, 3);
		default: return r + r;
	}
}
function Go(e, t = 16) {
	let [n, r, i] = e;
	return `rgb:${Wo(n, t)}/${Wo(r, t)}/${Wo(i, t)}`;
}
var Ko = {
	"(": 0,
	")": 1,
	"*": 2,
	"+": 3,
	"-": 1,
	".": 2
}, qo = 131072, Jo = 10;
function Yo(e, t) {
	if (e > 24) return t.setWinLines || !1;
	switch (e) {
		case 1: return !!t.restoreWin;
		case 2: return !!t.minimizeWin;
		case 3: return !!t.setWinPosition;
		case 4: return !!t.setWinSizePixels;
		case 5: return !!t.raiseWin;
		case 6: return !!t.lowerWin;
		case 7: return !!t.refreshWin;
		case 8: return !!t.setWinSizeChars;
		case 9: return !!t.maximizeWin;
		case 10: return !!t.fullscreenWin;
		case 11: return !!t.getWinState;
		case 13: return !!t.getWinPosition;
		case 14: return !!t.getWinSizePixels;
		case 15: return !!t.getScreenSizePixels;
		case 16: return !!t.getCellSizePixels;
		case 18: return !!t.getWinSizeChars;
		case 19: return !!t.getScreenSizeChars;
		case 20: return !!t.getIconTitle;
		case 21: return !!t.getWinTitle;
		case 22: return !!t.pushTitle;
		case 23: return !!t.popTitle;
		case 24: return !!t.setWinLines;
	}
	return !1;
}
var Xo = 5e3, Zo = 0, Qo = class extends O {
	constructor(e, t, n, r, i, a, o, s, c = new Bo()) {
		super(), this._bufferService = e, this._charsetService = t, this._coreService = n, this._logService = r, this._optionsService = i, this._oscLinkService = a, this._coreMouseService = o, this._unicodeService = s, this._parser = c, this._parseBuffer = /* @__PURE__ */ new Uint32Array(4096), this._stringDecoder = new fe(), this._utf8Decoder = new pe(), this._windowTitle = "", this._iconName = "", this._windowTitleStack = [], this._iconNameStack = [], this._curAttrData = z.clone(), this._eraseAttrDataInternal = z.clone(), this._onRequestBell = this._register(new A()), this.onRequestBell = this._onRequestBell.event, this._onRequestRefreshRows = this._register(new A()), this.onRequestRefreshRows = this._onRequestRefreshRows.event, this._onRequestReset = this._register(new A()), this.onRequestReset = this._onRequestReset.event, this._onRequestSendFocus = this._register(new A()), this.onRequestSendFocus = this._onRequestSendFocus.event, this._onRequestSyncScrollBar = this._register(new A()), this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event, this._onRequestWindowsOptionsReport = this._register(new A()), this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event, this._onA11yChar = this._register(new A()), this.onA11yChar = this._onA11yChar.event, this._onA11yTab = this._register(new A()), this.onA11yTab = this._onA11yTab.event, this._onCursorMove = this._register(new A()), this.onCursorMove = this._onCursorMove.event, this._onLineFeed = this._register(new A()), this.onLineFeed = this._onLineFeed.event, this._onScroll = this._register(new A()), this.onScroll = this._onScroll.event, this._onTitleChange = this._register(new A()), this.onTitleChange = this._onTitleChange.event, this._onColor = this._register(new A()), this.onColor = this._onColor.event, this._parseStack = {
			paused: !1,
			cursorStartX: 0,
			cursorStartY: 0,
			decodedLength: 0,
			position: 0
		}, this._specialColors = [
			256,
			257,
			258
		], this._register(this._parser), this._dirtyRowTracker = new $o(this._bufferService), this._activeBuffer = this._bufferService.buffer, this._register(this._bufferService.buffers.onBufferActivate((e) => this._activeBuffer = e.activeBuffer)), this._parser.setCsiHandlerFallback((e, t) => {
			this._logService.debug("Unknown CSI code: ", {
				identifier: this._parser.identToString(e),
				params: t.toArray()
			});
		}), this._parser.setEscHandlerFallback((e) => {
			this._logService.debug("Unknown ESC code: ", { identifier: this._parser.identToString(e) });
		}), this._parser.setExecuteHandlerFallback((e) => {
			this._logService.debug("Unknown EXECUTE code: ", { code: e });
		}), this._parser.setOscHandlerFallback((e, t, n) => {
			this._logService.debug("Unknown OSC code: ", {
				identifier: e,
				action: t,
				data: n
			});
		}), this._parser.setDcsHandlerFallback((e, t, n) => {
			t === "HOOK" && (n = n.toArray()), this._logService.debug("Unknown DCS code: ", {
				identifier: this._parser.identToString(e),
				action: t,
				payload: n
			});
		}), this._parser.setPrintHandler((e, t, n) => this.print(e, t, n)), this._parser.registerCsiHandler({ final: "@" }, (e) => this.insertChars(e)), this._parser.registerCsiHandler({
			intermediates: " ",
			final: "@"
		}, (e) => this.scrollLeft(e)), this._parser.registerCsiHandler({ final: "A" }, (e) => this.cursorUp(e)), this._parser.registerCsiHandler({
			intermediates: " ",
			final: "A"
		}, (e) => this.scrollRight(e)), this._parser.registerCsiHandler({ final: "B" }, (e) => this.cursorDown(e)), this._parser.registerCsiHandler({ final: "C" }, (e) => this.cursorForward(e)), this._parser.registerCsiHandler({ final: "D" }, (e) => this.cursorBackward(e)), this._parser.registerCsiHandler({ final: "E" }, (e) => this.cursorNextLine(e)), this._parser.registerCsiHandler({ final: "F" }, (e) => this.cursorPrecedingLine(e)), this._parser.registerCsiHandler({ final: "G" }, (e) => this.cursorCharAbsolute(e)), this._parser.registerCsiHandler({ final: "H" }, (e) => this.cursorPosition(e)), this._parser.registerCsiHandler({ final: "I" }, (e) => this.cursorForwardTab(e)), this._parser.registerCsiHandler({ final: "J" }, (e) => this.eraseInDisplay(e, !1)), this._parser.registerCsiHandler({
			prefix: "?",
			final: "J"
		}, (e) => this.eraseInDisplay(e, !0)), this._parser.registerCsiHandler({ final: "K" }, (e) => this.eraseInLine(e, !1)), this._parser.registerCsiHandler({
			prefix: "?",
			final: "K"
		}, (e) => this.eraseInLine(e, !0)), this._parser.registerCsiHandler({ final: "L" }, (e) => this.insertLines(e)), this._parser.registerCsiHandler({ final: "M" }, (e) => this.deleteLines(e)), this._parser.registerCsiHandler({ final: "P" }, (e) => this.deleteChars(e)), this._parser.registerCsiHandler({ final: "S" }, (e) => this.scrollUp(e)), this._parser.registerCsiHandler({ final: "T" }, (e) => this.scrollDown(e)), this._parser.registerCsiHandler({ final: "X" }, (e) => this.eraseChars(e)), this._parser.registerCsiHandler({ final: "Z" }, (e) => this.cursorBackwardTab(e)), this._parser.registerCsiHandler({ final: "`" }, (e) => this.charPosAbsolute(e)), this._parser.registerCsiHandler({ final: "a" }, (e) => this.hPositionRelative(e)), this._parser.registerCsiHandler({ final: "b" }, (e) => this.repeatPrecedingCharacter(e)), this._parser.registerCsiHandler({ final: "c" }, (e) => this.sendDeviceAttributesPrimary(e)), this._parser.registerCsiHandler({
			prefix: ">",
			final: "c"
		}, (e) => this.sendDeviceAttributesSecondary(e)), this._parser.registerCsiHandler({ final: "d" }, (e) => this.linePosAbsolute(e)), this._parser.registerCsiHandler({ final: "e" }, (e) => this.vPositionRelative(e)), this._parser.registerCsiHandler({ final: "f" }, (e) => this.hVPosition(e)), this._parser.registerCsiHandler({ final: "g" }, (e) => this.tabClear(e)), this._parser.registerCsiHandler({ final: "h" }, (e) => this.setMode(e)), this._parser.registerCsiHandler({
			prefix: "?",
			final: "h"
		}, (e) => this.setModePrivate(e)), this._parser.registerCsiHandler({ final: "l" }, (e) => this.resetMode(e)), this._parser.registerCsiHandler({
			prefix: "?",
			final: "l"
		}, (e) => this.resetModePrivate(e)), this._parser.registerCsiHandler({ final: "m" }, (e) => this.charAttributes(e)), this._parser.registerCsiHandler({ final: "n" }, (e) => this.deviceStatus(e)), this._parser.registerCsiHandler({
			prefix: "?",
			final: "n"
		}, (e) => this.deviceStatusPrivate(e)), this._parser.registerCsiHandler({
			intermediates: "!",
			final: "p"
		}, (e) => this.softReset(e)), this._parser.registerCsiHandler({
			intermediates: " ",
			final: "q"
		}, (e) => this.setCursorStyle(e)), this._parser.registerCsiHandler({ final: "r" }, (e) => this.setScrollRegion(e)), this._parser.registerCsiHandler({ final: "s" }, (e) => this.saveCursor(e)), this._parser.registerCsiHandler({ final: "t" }, (e) => this.windowOptions(e)), this._parser.registerCsiHandler({ final: "u" }, (e) => this.restoreCursor(e)), this._parser.registerCsiHandler({
			intermediates: "'",
			final: "}"
		}, (e) => this.insertColumns(e)), this._parser.registerCsiHandler({
			intermediates: "'",
			final: "~"
		}, (e) => this.deleteColumns(e)), this._parser.registerCsiHandler({
			intermediates: "\"",
			final: "q"
		}, (e) => this.selectProtected(e)), this._parser.registerCsiHandler({
			intermediates: "$",
			final: "p"
		}, (e) => this.requestMode(e, !0)), this._parser.registerCsiHandler({
			prefix: "?",
			intermediates: "$",
			final: "p"
		}, (e) => this.requestMode(e, !1)), this._parser.setExecuteHandler(M.BEL, () => this.bell()), this._parser.setExecuteHandler(M.LF, () => this.lineFeed()), this._parser.setExecuteHandler(M.VT, () => this.lineFeed()), this._parser.setExecuteHandler(M.FF, () => this.lineFeed()), this._parser.setExecuteHandler(M.CR, () => this.carriageReturn()), this._parser.setExecuteHandler(M.BS, () => this.backspace()), this._parser.setExecuteHandler(M.HT, () => this.tab()), this._parser.setExecuteHandler(M.SO, () => this.shiftOut()), this._parser.setExecuteHandler(M.SI, () => this.shiftIn()), this._parser.setExecuteHandler(Xr.IND, () => this.index()), this._parser.setExecuteHandler(Xr.NEL, () => this.nextLine()), this._parser.setExecuteHandler(Xr.HTS, () => this.tabSet()), this._parser.registerOscHandler(0, new Mo((e) => (this.setTitle(e), this.setIconName(e), !0))), this._parser.registerOscHandler(1, new Mo((e) => this.setIconName(e))), this._parser.registerOscHandler(2, new Mo((e) => this.setTitle(e))), this._parser.registerOscHandler(4, new Mo((e) => this.setOrReportIndexedColor(e))), this._parser.registerOscHandler(8, new Mo((e) => this.setHyperlink(e))), this._parser.registerOscHandler(10, new Mo((e) => this.setOrReportFgColor(e))), this._parser.registerOscHandler(11, new Mo((e) => this.setOrReportBgColor(e))), this._parser.registerOscHandler(12, new Mo((e) => this.setOrReportCursorColor(e))), this._parser.registerOscHandler(104, new Mo((e) => this.restoreIndexedColor(e))), this._parser.registerOscHandler(110, new Mo((e) => this.restoreFgColor(e))), this._parser.registerOscHandler(111, new Mo((e) => this.restoreBgColor(e))), this._parser.registerOscHandler(112, new Mo((e) => this.restoreCursorColor(e))), this._parser.registerEscHandler({ final: "7" }, () => this.saveCursor()), this._parser.registerEscHandler({ final: "8" }, () => this.restoreCursor()), this._parser.registerEscHandler({ final: "D" }, () => this.index()), this._parser.registerEscHandler({ final: "E" }, () => this.nextLine()), this._parser.registerEscHandler({ final: "H" }, () => this.tabSet()), this._parser.registerEscHandler({ final: "M" }, () => this.reverseIndex()), this._parser.registerEscHandler({ final: "=" }, () => this.keypadApplicationMode()), this._parser.registerEscHandler({ final: ">" }, () => this.keypadNumericMode()), this._parser.registerEscHandler({ final: "c" }, () => this.fullReset()), this._parser.registerEscHandler({ final: "n" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "o" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "|" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "}" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "~" }, () => this.setgLevel(1)), this._parser.registerEscHandler({
			intermediates: "%",
			final: "@"
		}, () => this.selectDefaultCharset()), this._parser.registerEscHandler({
			intermediates: "%",
			final: "G"
		}, () => this.selectDefaultCharset());
		for (let e in B) this._parser.registerEscHandler({
			intermediates: "(",
			final: e
		}, () => this.selectCharset("(" + e)), this._parser.registerEscHandler({
			intermediates: ")",
			final: e
		}, () => this.selectCharset(")" + e)), this._parser.registerEscHandler({
			intermediates: "*",
			final: e
		}, () => this.selectCharset("*" + e)), this._parser.registerEscHandler({
			intermediates: "+",
			final: e
		}, () => this.selectCharset("+" + e)), this._parser.registerEscHandler({
			intermediates: "-",
			final: e
		}, () => this.selectCharset("-" + e)), this._parser.registerEscHandler({
			intermediates: ".",
			final: e
		}, () => this.selectCharset("." + e)), this._parser.registerEscHandler({
			intermediates: "/",
			final: e
		}, () => this.selectCharset("/" + e));
		this._parser.registerEscHandler({
			intermediates: "#",
			final: "8"
		}, () => this.screenAlignmentPattern()), this._parser.setErrorHandler((e) => (this._logService.error("Parsing error: ", e), e)), this._parser.registerDcsHandler({
			intermediates: "$",
			final: "q"
		}, new Io((e, t) => this.requestStatusString(e, t)));
	}
	getAttrData() {
		return this._curAttrData;
	}
	_preserveStack(e, t, n, r) {
		this._parseStack.paused = !0, this._parseStack.cursorStartX = e, this._parseStack.cursorStartY = t, this._parseStack.decodedLength = n, this._parseStack.position = r;
	}
	_logSlowResolvingAsync(e) {
		this._logService.logLevel <= 3 && Promise.race([e, new Promise((e, t) => setTimeout(() => t("#SLOW_TIMEOUT"), Xo))]).catch((e) => {
			if (e !== "#SLOW_TIMEOUT") throw e;
			console.warn(`async parser handler taking longer than ${Xo} ms`);
		});
	}
	_getCurrentLinkId() {
		return this._curAttrData.extended.urlId;
	}
	parse(e, t) {
		let n, r = this._activeBuffer.x, i = this._activeBuffer.y, a = 0, o = this._parseStack.paused;
		if (o) {
			if (n = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, t)) return this._logSlowResolvingAsync(n), n;
			r = this._parseStack.cursorStartX, i = this._parseStack.cursorStartY, this._parseStack.paused = !1, e.length > qo && (a = this._parseStack.position + qo);
		}
		if (this._logService.logLevel <= 1 && this._logService.debug(`parsing data ${typeof e == "string" ? ` "${e}"` : ` "${Array.prototype.map.call(e, (e) => String.fromCharCode(e)).join("")}"`}`), this._logService.logLevel === 0 && this._logService.trace("parsing data (codes)", typeof e == "string" ? e.split("").map((e) => e.charCodeAt(0)) : e), this._parseBuffer.length < e.length && this._parseBuffer.length < qo && (this._parseBuffer = new Uint32Array(Math.min(e.length, qo))), o || this._dirtyRowTracker.clearRange(), e.length > qo) for (let t = a; t < e.length; t += qo) {
			let a = t + qo < e.length ? t + qo : e.length, o = typeof e == "string" ? this._stringDecoder.decode(e.substring(t, a), this._parseBuffer) : this._utf8Decoder.decode(e.subarray(t, a), this._parseBuffer);
			if (n = this._parser.parse(this._parseBuffer, o)) return this._preserveStack(r, i, o, t), this._logSlowResolvingAsync(n), n;
		}
		else if (!o) {
			let t = typeof e == "string" ? this._stringDecoder.decode(e, this._parseBuffer) : this._utf8Decoder.decode(e, this._parseBuffer);
			if (n = this._parser.parse(this._parseBuffer, t)) return this._preserveStack(r, i, t, 0), this._logSlowResolvingAsync(n), n;
		}
		(this._activeBuffer.x !== r || this._activeBuffer.y !== i) && this._onCursorMove.fire();
		let s = this._dirtyRowTracker.end + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp), c = this._dirtyRowTracker.start + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
		c < this._bufferService.rows && this._onRequestRefreshRows.fire({
			start: Math.min(c, this._bufferService.rows - 1),
			end: Math.min(s, this._bufferService.rows - 1)
		});
	}
	print(e, t, n) {
		let r, i, a = this._charsetService.charset, o = this._optionsService.rawOptions.screenReaderMode, s = this._bufferService.cols, c = this._coreService.decPrivateModes.wraparound, l = this._coreService.modes.insertMode, u = this._curAttrData, d = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
		this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._activeBuffer.x && n - t > 0 && d.getWidth(this._activeBuffer.x - 1) === 2 && d.setCellFromCodepoint(this._activeBuffer.x - 1, 0, 1, u);
		let f = this._parser.precedingJoinState;
		for (let p = t; p < n; ++p) {
			if (r = e[p], r < 127 && a) {
				let e = a[String.fromCharCode(r)];
				e && (r = e.charCodeAt(0));
			}
			let t = this._unicodeService.charProperties(r, f);
			i = wo.extractWidth(t);
			let n = wo.extractShouldJoin(t), m = n ? wo.extractWidth(f) : 0;
			if (f = t, o && this._onA11yChar.fire(ue(r)), this._getCurrentLinkId() && this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y), this._activeBuffer.x + i - m > s) {
				if (c) {
					let e = d, t = this._activeBuffer.x - m;
					for (this._activeBuffer.x = m, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), !0)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = !0), d = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y), m > 0 && d instanceof Ga && d.copyCellsFrom(e, t, 0, m, !1); t < s;) e.setCellFromCodepoint(t++, 0, 1, u);
				} else if (this._activeBuffer.x = s - 1, i === 2) continue;
			}
			if (n && this._activeBuffer.x) {
				let e = d.getWidth(this._activeBuffer.x - 1) ? 1 : 2;
				d.addCodepointToCell(this._activeBuffer.x - e, r, i);
				for (let e = i - m; --e >= 0;) d.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, u);
			} else if (l && (d.insertCells(this._activeBuffer.x, i - m, this._activeBuffer.getNullCell(u)), d.getWidth(s - 1) === 2 && d.setCellFromCodepoint(s - 1, 0, 1, u)), d.setCellFromCodepoint(this._activeBuffer.x++, r, i, u), i > 0) for (; --i;) d.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, u);
		}
		this._parser.precedingJoinState = f, this._activeBuffer.x < s && n - t > 0 && d.getWidth(this._activeBuffer.x) === 0 && !d.hasContent(this._activeBuffer.x) && d.setCellFromCodepoint(this._activeBuffer.x, 0, 1, u), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
	}
	registerCsiHandler(e, t) {
		return e.final === "t" && !e.prefix && !e.intermediates ? this._parser.registerCsiHandler(e, (e) => !Yo(e.params[0], this._optionsService.rawOptions.windowOptions) || t(e)) : this._parser.registerCsiHandler(e, t);
	}
	registerDcsHandler(e, t) {
		return this._parser.registerDcsHandler(e, new Io(t));
	}
	registerEscHandler(e, t) {
		return this._parser.registerEscHandler(e, t);
	}
	registerOscHandler(e, t) {
		return this._parser.registerOscHandler(e, new Mo(t));
	}
	bell() {
		return this._onRequestBell.fire(), !0;
	}
	lineFeed() {
		return this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows ? this._activeBuffer.y = this._bufferService.rows - 1 : this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = !1, this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), !0;
	}
	carriageReturn() {
		return this._activeBuffer.x = 0, !0;
	}
	backspace() {
		if (!this._coreService.decPrivateModes.reverseWraparound) return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, !0;
		if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0) this._activeBuffer.x--;
		else if (this._activeBuffer.x === 0 && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)?.isWrapped) {
			this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = !1, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
			let e = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
			e.hasWidth(this._activeBuffer.x) && !e.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
		}
		return this._restrictCursor(), !0;
	}
	tab() {
		if (this._activeBuffer.x >= this._bufferService.cols) return !0;
		let e = this._activeBuffer.x;
		return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - e), !0;
	}
	shiftOut() {
		return this._charsetService.setgLevel(1), !0;
	}
	shiftIn() {
		return this._charsetService.setgLevel(0), !0;
	}
	_restrictCursor(e = this._bufferService.cols - 1) {
		this._activeBuffer.x = Math.min(e, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
	}
	_setCursor(e, t) {
		this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = e, this._activeBuffer.y = this._activeBuffer.scrollTop + t) : (this._activeBuffer.x = e, this._activeBuffer.y = t), this._restrictCursor(), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
	}
	_moveCursor(e, t) {
		this._restrictCursor(), this._setCursor(this._activeBuffer.x + e, this._activeBuffer.y + t);
	}
	cursorUp(e) {
		let t = this._activeBuffer.y - this._activeBuffer.scrollTop;
		return t >= 0 ? this._moveCursor(0, -Math.min(t, e.params[0] || 1)) : this._moveCursor(0, -(e.params[0] || 1)), !0;
	}
	cursorDown(e) {
		let t = this._activeBuffer.scrollBottom - this._activeBuffer.y;
		return t >= 0 ? this._moveCursor(0, Math.min(t, e.params[0] || 1)) : this._moveCursor(0, e.params[0] || 1), !0;
	}
	cursorForward(e) {
		return this._moveCursor(e.params[0] || 1, 0), !0;
	}
	cursorBackward(e) {
		return this._moveCursor(-(e.params[0] || 1), 0), !0;
	}
	cursorNextLine(e) {
		return this.cursorDown(e), this._activeBuffer.x = 0, !0;
	}
	cursorPrecedingLine(e) {
		return this.cursorUp(e), this._activeBuffer.x = 0, !0;
	}
	cursorCharAbsolute(e) {
		return this._setCursor((e.params[0] || 1) - 1, this._activeBuffer.y), !0;
	}
	cursorPosition(e) {
		return this._setCursor(e.length >= 2 ? (e.params[1] || 1) - 1 : 0, (e.params[0] || 1) - 1), !0;
	}
	charPosAbsolute(e) {
		return this._setCursor((e.params[0] || 1) - 1, this._activeBuffer.y), !0;
	}
	hPositionRelative(e) {
		return this._moveCursor(e.params[0] || 1, 0), !0;
	}
	linePosAbsolute(e) {
		return this._setCursor(this._activeBuffer.x, (e.params[0] || 1) - 1), !0;
	}
	vPositionRelative(e) {
		return this._moveCursor(0, e.params[0] || 1), !0;
	}
	hVPosition(e) {
		return this.cursorPosition(e), !0;
	}
	tabClear(e) {
		let t = e.params[0];
		return t === 0 ? delete this._activeBuffer.tabs[this._activeBuffer.x] : t === 3 && (this._activeBuffer.tabs = {}), !0;
	}
	cursorForwardTab(e) {
		if (this._activeBuffer.x >= this._bufferService.cols) return !0;
		let t = e.params[0] || 1;
		for (; t--;) this._activeBuffer.x = this._activeBuffer.nextStop();
		return !0;
	}
	cursorBackwardTab(e) {
		if (this._activeBuffer.x >= this._bufferService.cols) return !0;
		let t = e.params[0] || 1;
		for (; t--;) this._activeBuffer.x = this._activeBuffer.prevStop();
		return !0;
	}
	selectProtected(e) {
		let t = e.params[0];
		return t === 1 && (this._curAttrData.bg |= 536870912), (t === 2 || t === 0) && (this._curAttrData.bg &= -536870913), !0;
	}
	_eraseInBufferLine(e, t, n, r = !1, i = !1) {
		let a = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
		a.replaceCells(t, n, this._activeBuffer.getNullCell(this._eraseAttrData()), i), r && (a.isWrapped = !1);
	}
	_resetBufferLine(e, t = !1) {
		let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
		n && (n.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), t), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + e), n.isWrapped = !1);
	}
	eraseInDisplay(e, t = !1) {
		this._restrictCursor(this._bufferService.cols);
		let n;
		switch (e.params[0]) {
			case 0:
				for (n = this._activeBuffer.y, this._dirtyRowTracker.markDirty(n), this._eraseInBufferLine(n++, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, t); n < this._bufferService.rows; n++) this._resetBufferLine(n, t);
				this._dirtyRowTracker.markDirty(n);
				break;
			case 1:
				for (n = this._activeBuffer.y, this._dirtyRowTracker.markDirty(n), this._eraseInBufferLine(n, 0, this._activeBuffer.x + 1, !0, t), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(n + 1).isWrapped = !1); n--;) this._resetBufferLine(n, t);
				this._dirtyRowTracker.markDirty(0);
				break;
			case 2:
				if (this._optionsService.rawOptions.scrollOnEraseInDisplay) {
					for (n = this._bufferService.rows, this._dirtyRowTracker.markRangeDirty(0, n - 1); n-- && !this._activeBuffer.lines.get(this._activeBuffer.ybase + n)?.getTrimmedLength(););
					for (; n >= 0; n--) this._bufferService.scroll(this._eraseAttrData());
				} else {
					for (n = this._bufferService.rows, this._dirtyRowTracker.markDirty(n - 1); n--;) this._resetBufferLine(n, t);
					this._dirtyRowTracker.markDirty(0);
				}
				break;
			case 3:
				let e = this._activeBuffer.lines.length - this._bufferService.rows;
				e > 0 && (this._activeBuffer.lines.trimStart(e), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - e, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - e, 0), this._onScroll.fire(0));
		}
		return !0;
	}
	eraseInLine(e, t = !1) {
		switch (this._restrictCursor(this._bufferService.cols), e.params[0]) {
			case 0:
				this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, t);
				break;
			case 1:
				this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, !1, t);
				break;
			case 2: this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, !0, t);
		}
		return this._dirtyRowTracker.markDirty(this._activeBuffer.y), !0;
	}
	insertLines(e) {
		this._restrictCursor();
		let t = e.params[0] || 1;
		if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
		let n = this._activeBuffer.ybase + this._activeBuffer.y, r = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, i = this._bufferService.rows - 1 + this._activeBuffer.ybase - r + 1;
		for (; t--;) this._activeBuffer.lines.splice(i - 1, 1), this._activeBuffer.lines.splice(n, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
		return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, !0;
	}
	deleteLines(e) {
		this._restrictCursor();
		let t = e.params[0] || 1;
		if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
		let n = this._activeBuffer.ybase + this._activeBuffer.y, r;
		for (r = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, r = this._bufferService.rows - 1 + this._activeBuffer.ybase - r; t--;) this._activeBuffer.lines.splice(n, 1), this._activeBuffer.lines.splice(r, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
		return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, !0;
	}
	insertChars(e) {
		this._restrictCursor();
		let t = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
		return t && (t.insertCells(this._activeBuffer.x, e.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
	}
	deleteChars(e) {
		this._restrictCursor();
		let t = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
		return t && (t.deleteCells(this._activeBuffer.x, e.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
	}
	scrollUp(e) {
		let t = e.params[0] || 1;
		for (; t--;) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
		return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
	}
	scrollDown(e) {
		let t = e.params[0] || 1;
		for (; t--;) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(z));
		return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
	}
	scrollLeft(e) {
		if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
		let t = e.params[0] || 1;
		for (let e = this._activeBuffer.scrollTop; e <= this._activeBuffer.scrollBottom; ++e) {
			let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
			n.deleteCells(0, t, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = !1;
		}
		return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
	}
	scrollRight(e) {
		if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
		let t = e.params[0] || 1;
		for (let e = this._activeBuffer.scrollTop; e <= this._activeBuffer.scrollBottom; ++e) {
			let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
			n.insertCells(0, t, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = !1;
		}
		return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
	}
	insertColumns(e) {
		if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
		let t = e.params[0] || 1;
		for (let e = this._activeBuffer.scrollTop; e <= this._activeBuffer.scrollBottom; ++e) {
			let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
			n.insertCells(this._activeBuffer.x, t, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = !1;
		}
		return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
	}
	deleteColumns(e) {
		if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return !0;
		let t = e.params[0] || 1;
		for (let e = this._activeBuffer.scrollTop; e <= this._activeBuffer.scrollBottom; ++e) {
			let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
			n.deleteCells(this._activeBuffer.x, t, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = !1;
		}
		return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), !0;
	}
	eraseChars(e) {
		this._restrictCursor();
		let t = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
		return t && (t.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (e.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), !0;
	}
	repeatPrecedingCharacter(e) {
		let t = this._parser.precedingJoinState;
		if (!t) return !0;
		let n = e.params[0] || 1, r = wo.extractWidth(t), i = this._activeBuffer.x - r, a = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).getString(i), o = new Uint32Array(a.length * n), s = 0;
		for (let e = 0; e < a.length;) {
			let t = a.codePointAt(e) || 0;
			o[s++] = t, e += t > 65535 ? 2 : 1;
		}
		let c = s;
		for (let e = 1; e < n; ++e) o.copyWithin(c, 0, s), c += s;
		return this.print(o, 0, c), !0;
	}
	sendDeviceAttributesPrimary(e) {
		return e.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(M.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(M.ESC + "[?6c")), !0;
	}
	sendDeviceAttributesSecondary(e) {
		return e.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(M.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(M.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(e.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(M.ESC + "[>83;40003;0c")), !0;
	}
	_is(e) {
		return (this._optionsService.rawOptions.termName + "").indexOf(e) === 0;
	}
	setMode(e) {
		for (let t = 0; t < e.length; t++) switch (e.params[t]) {
			case 4:
				this._coreService.modes.insertMode = !0;
				break;
			case 20: this._optionsService.options.convertEol = !0;
		}
		return !0;
	}
	setModePrivate(e) {
		for (let t = 0; t < e.length; t++) switch (e.params[t]) {
			case 1:
				this._coreService.decPrivateModes.applicationCursorKeys = !0;
				break;
			case 2:
				this._charsetService.setgCharset(0, $a), this._charsetService.setgCharset(1, $a), this._charsetService.setgCharset(2, $a), this._charsetService.setgCharset(3, $a);
				break;
			case 3:
				this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
				break;
			case 6:
				this._coreService.decPrivateModes.origin = !0, this._setCursor(0, 0);
				break;
			case 7:
				this._coreService.decPrivateModes.wraparound = !0;
				break;
			case 12:
				this._optionsService.options.cursorBlink = !0;
				break;
			case 45:
				this._coreService.decPrivateModes.reverseWraparound = !0;
				break;
			case 66:
				this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = !0, this._onRequestSyncScrollBar.fire();
				break;
			case 9:
				this._coreMouseService.activeProtocol = "X10";
				break;
			case 1e3:
				this._coreMouseService.activeProtocol = "VT200";
				break;
			case 1002:
				this._coreMouseService.activeProtocol = "DRAG";
				break;
			case 1003:
				this._coreMouseService.activeProtocol = "ANY";
				break;
			case 1004:
				this._coreService.decPrivateModes.sendFocus = !0, this._onRequestSendFocus.fire();
				break;
			case 1005:
				this._logService.debug("DECSET 1005 not supported (see #2507)");
				break;
			case 1006:
				this._coreMouseService.activeEncoding = "SGR";
				break;
			case 1015:
				this._logService.debug("DECSET 1015 not supported (see #2507)");
				break;
			case 1016:
				this._coreMouseService.activeEncoding = "SGR_PIXELS";
				break;
			case 25:
				this._coreService.isCursorHidden = !1;
				break;
			case 1048:
				this.saveCursor();
				break;
			case 1049: this.saveCursor();
			case 47:
			case 1047:
				this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = !0, this._onRequestRefreshRows.fire(void 0), this._onRequestSyncScrollBar.fire();
				break;
			case 2004:
				this._coreService.decPrivateModes.bracketedPasteMode = !0;
				break;
			case 2026: this._coreService.decPrivateModes.synchronizedOutput = !0;
		}
		return !0;
	}
	resetMode(e) {
		for (let t = 0; t < e.length; t++) switch (e.params[t]) {
			case 4:
				this._coreService.modes.insertMode = !1;
				break;
			case 20: this._optionsService.options.convertEol = !1;
		}
		return !0;
	}
	resetModePrivate(e) {
		for (let t = 0; t < e.length; t++) switch (e.params[t]) {
			case 1:
				this._coreService.decPrivateModes.applicationCursorKeys = !1;
				break;
			case 3:
				this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
				break;
			case 6:
				this._coreService.decPrivateModes.origin = !1, this._setCursor(0, 0);
				break;
			case 7:
				this._coreService.decPrivateModes.wraparound = !1;
				break;
			case 12:
				this._optionsService.options.cursorBlink = !1;
				break;
			case 45:
				this._coreService.decPrivateModes.reverseWraparound = !1;
				break;
			case 66:
				this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = !1, this._onRequestSyncScrollBar.fire();
				break;
			case 9:
			case 1e3:
			case 1002:
			case 1003:
				this._coreMouseService.activeProtocol = "NONE";
				break;
			case 1004:
				this._coreService.decPrivateModes.sendFocus = !1;
				break;
			case 1005:
				this._logService.debug("DECRST 1005 not supported (see #2507)");
				break;
			case 1006:
				this._coreMouseService.activeEncoding = "DEFAULT";
				break;
			case 1015:
				this._logService.debug("DECRST 1015 not supported (see #2507)");
				break;
			case 1016:
				this._coreMouseService.activeEncoding = "DEFAULT";
				break;
			case 25:
				this._coreService.isCursorHidden = !0;
				break;
			case 1048:
				this.restoreCursor();
				break;
			case 1049:
			case 47:
			case 1047:
				this._bufferService.buffers.activateNormalBuffer(), e.params[t] === 1049 && this.restoreCursor(), this._coreService.isCursorInitialized = !0, this._onRequestRefreshRows.fire(void 0), this._onRequestSyncScrollBar.fire();
				break;
			case 2004:
				this._coreService.decPrivateModes.bracketedPasteMode = !1;
				break;
			case 2026: this._coreService.decPrivateModes.synchronizedOutput = !1, this._onRequestRefreshRows.fire(void 0);
		}
		return !0;
	}
	requestMode(e, t) {
		let n;
		((e) => (e[e.NOT_RECOGNIZED = 0] = "NOT_RECOGNIZED", e[e.SET = 1] = "SET", e[e.RESET = 2] = "RESET", e[e.PERMANENTLY_SET = 3] = "PERMANENTLY_SET", e[e.PERMANENTLY_RESET = 4] = "PERMANENTLY_RESET"))(n ||= {});
		let r = this._coreService.decPrivateModes, { activeProtocol: i, activeEncoding: a } = this._coreMouseService, o = this._coreService, { buffers: s, cols: c } = this._bufferService, { active: l, alt: u } = s, d = this._optionsService.rawOptions, f = (e, n) => (o.triggerDataEvent(`${M.ESC}[${t ? "" : "?"}${e};${n}$y`), !0), p = (e) => e ? 1 : 2, m = e.params[0];
		return t ? m === 2 ? f(m, 4) : m === 4 ? f(m, p(o.modes.insertMode)) : m === 12 ? f(m, 3) : m === 20 ? f(m, p(d.convertEol)) : f(m, 0) : m === 1 ? f(m, p(r.applicationCursorKeys)) : m === 3 ? f(m, d.windowOptions.setWinLines ? c === 80 ? 2 : +(c === 132) : 0) : m === 6 ? f(m, p(r.origin)) : m === 7 ? f(m, p(r.wraparound)) : m === 8 ? f(m, 3) : m === 9 ? f(m, p(i === "X10")) : m === 12 ? f(m, p(d.cursorBlink)) : m === 25 ? f(m, p(!o.isCursorHidden)) : m === 45 ? f(m, p(r.reverseWraparound)) : m === 66 ? f(m, p(r.applicationKeypad)) : m === 67 ? f(m, 4) : m === 1e3 ? f(m, p(i === "VT200")) : m === 1002 ? f(m, p(i === "DRAG")) : m === 1003 ? f(m, p(i === "ANY")) : m === 1004 ? f(m, p(r.sendFocus)) : m === 1005 ? f(m, 4) : m === 1006 ? f(m, p(a === "SGR")) : m === 1015 ? f(m, 4) : m === 1016 ? f(m, p(a === "SGR_PIXELS")) : m === 1048 ? f(m, 1) : m === 47 || m === 1047 || m === 1049 ? f(m, p(l === u)) : m === 2004 ? f(m, p(r.bracketedPasteMode)) : m === 2026 ? f(m, p(r.synchronizedOutput)) : f(m, 0);
	}
	_updateAttrColor(e, t, n, r, i) {
		return t === 2 ? (e |= 50331648, e &= -16777216, e |= ge.fromColorRGB([
			n,
			r,
			i
		])) : t === 5 && (e &= -50331904, e |= 33554432 | n & 255), e;
	}
	_extractColor(e, t, n) {
		let r = [
			0,
			0,
			-1,
			0,
			0,
			0
		], i = 0, a = 0;
		do {
			if (r[a + i] = e.params[t + a], e.hasSubParams(t + a)) {
				let n = e.getSubParams(t + a), o = 0;
				do
					r[1] === 5 && (i = 1), r[a + o + 1 + i] = n[o];
				while (++o < n.length && o + a + 1 + i < r.length);
				break;
			}
			if (r[1] === 5 && a + i >= 2 || r[1] === 2 && a + i >= 5) break;
			r[1] && (i = 1);
		} while (++a + t < e.length && a + i < r.length);
		for (let e = 2; e < r.length; ++e) r[e] === -1 && (r[e] = 0);
		switch (r[0]) {
			case 38:
				n.fg = this._updateAttrColor(n.fg, r[1], r[3], r[4], r[5]);
				break;
			case 48:
				n.bg = this._updateAttrColor(n.bg, r[1], r[3], r[4], r[5]);
				break;
			case 58: n.extended = n.extended.clone(), n.extended.underlineColor = this._updateAttrColor(n.extended.underlineColor, r[1], r[3], r[4], r[5]);
		}
		return a;
	}
	_processUnderline(e, t) {
		t.extended = t.extended.clone(), (!~e || e > 5) && (e = 1), t.extended.underlineStyle = e, t.fg |= 268435456, e === 0 && (t.fg &= -268435457), t.updateExtended();
	}
	_processSGR0(e) {
		e.fg = z.fg, e.bg = z.bg, e.extended = e.extended.clone(), e.extended.underlineStyle = 0, e.extended.underlineColor &= -67108864, e.updateExtended();
	}
	charAttributes(e) {
		if (e.length === 1 && e.params[0] === 0) return this._processSGR0(this._curAttrData), !0;
		let t = e.length, n, r = this._curAttrData;
		for (let i = 0; i < t; i++) n = e.params[i], n >= 30 && n <= 37 ? (r.fg &= -50331904, r.fg |= 16777216 | n - 30) : n >= 40 && n <= 47 ? (r.bg &= -50331904, r.bg |= 16777216 | n - 40) : n >= 90 && n <= 97 ? (r.fg &= -50331904, r.fg |= n - 90 | 16777224) : n >= 100 && n <= 107 ? (r.bg &= -50331904, r.bg |= n - 100 | 16777224) : n === 0 ? this._processSGR0(r) : n === 1 ? r.fg |= 134217728 : n === 3 ? r.bg |= 67108864 : n === 4 ? (r.fg |= 268435456, this._processUnderline(e.hasSubParams(i) ? e.getSubParams(i)[0] : 1, r)) : n === 5 ? r.fg |= 536870912 : n === 7 ? r.fg |= 67108864 : n === 8 ? r.fg |= 1073741824 : n === 9 ? r.fg |= 2147483648 : n === 2 ? r.bg |= 134217728 : n === 21 ? this._processUnderline(2, r) : n === 22 ? (r.fg &= -134217729, r.bg &= -134217729) : n === 23 ? r.bg &= -67108865 : n === 24 ? (r.fg &= -268435457, this._processUnderline(0, r)) : n === 25 ? r.fg &= -536870913 : n === 27 ? r.fg &= -67108865 : n === 28 ? r.fg &= -1073741825 : n === 29 ? r.fg &= 2147483647 : n === 39 ? (r.fg &= -67108864, r.fg |= z.fg & 16777215) : n === 49 ? (r.bg &= -67108864, r.bg |= z.bg & 16777215) : n === 38 || n === 48 || n === 58 ? i += this._extractColor(e, i, r) : n === 53 ? r.bg |= 1073741824 : n === 55 ? r.bg &= -1073741825 : n === 59 ? (r.extended = r.extended.clone(), r.extended.underlineColor = -1, r.updateExtended()) : n === 100 ? (r.fg &= -67108864, r.fg |= z.fg & 16777215, r.bg &= -67108864, r.bg |= z.bg & 16777215) : this._logService.debug("Unknown SGR attribute: %d.", n);
		return !0;
	}
	deviceStatus(e) {
		switch (e.params[0]) {
			case 5:
				this._coreService.triggerDataEvent(`${M.ESC}[0n`);
				break;
			case 6:
				let e = this._activeBuffer.y + 1, t = this._activeBuffer.x + 1;
				this._coreService.triggerDataEvent(`${M.ESC}[${e};${t}R`);
		}
		return !0;
	}
	deviceStatusPrivate(e) {
		if (e.params[0] === 6) {
			let e = this._activeBuffer.y + 1, t = this._activeBuffer.x + 1;
			this._coreService.triggerDataEvent(`${M.ESC}[?${e};${t}R`);
		}
		return !0;
	}
	softReset(e) {
		return this._coreService.isCursorHidden = !1, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = z.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = !1, !0;
	}
	setCursorStyle(e) {
		let t = e.length === 0 ? 1 : e.params[0];
		if (t === 0) this._coreService.decPrivateModes.cursorStyle = void 0, this._coreService.decPrivateModes.cursorBlink = void 0;
		else {
			switch (t) {
				case 1:
				case 2:
					this._coreService.decPrivateModes.cursorStyle = "block";
					break;
				case 3:
				case 4:
					this._coreService.decPrivateModes.cursorStyle = "underline";
					break;
				case 5:
				case 6: this._coreService.decPrivateModes.cursorStyle = "bar";
			}
			let e = t % 2 == 1;
			this._coreService.decPrivateModes.cursorBlink = e;
		}
		return !0;
	}
	setScrollRegion(e) {
		let t = e.params[0] || 1, n;
		return (e.length < 2 || (n = e.params[1]) > this._bufferService.rows || n === 0) && (n = this._bufferService.rows), n > t && (this._activeBuffer.scrollTop = t - 1, this._activeBuffer.scrollBottom = n - 1, this._setCursor(0, 0)), !0;
	}
	windowOptions(e) {
		if (!Yo(e.params[0], this._optionsService.rawOptions.windowOptions)) return !0;
		let t = e.length > 1 ? e.params[1] : 0;
		switch (e.params[0]) {
			case 14:
				t !== 2 && this._onRequestWindowsOptionsReport.fire(0);
				break;
			case 16:
				this._onRequestWindowsOptionsReport.fire(1);
				break;
			case 18:
				this._bufferService && this._coreService.triggerDataEvent(`${M.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
				break;
			case 22:
				(t === 0 || t === 2) && (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > Jo && this._windowTitleStack.shift()), (t === 0 || t === 1) && (this._iconNameStack.push(this._iconName), this._iconNameStack.length > Jo && this._iconNameStack.shift());
				break;
			case 23: (t === 0 || t === 2) && this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), (t === 0 || t === 1) && this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
		}
		return !0;
	}
	saveCursor(e) {
		return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, !0;
	}
	restoreCursor(e) {
		return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), !0;
	}
	setTitle(e) {
		return this._windowTitle = e, this._onTitleChange.fire(e), !0;
	}
	setIconName(e) {
		return this._iconName = e, !0;
	}
	setOrReportIndexedColor(e) {
		let t = [], n = e.split(";");
		for (; n.length > 1;) {
			let e = n.shift(), r = n.shift();
			if (/^\d+$/.exec(e)) {
				let n = parseInt(e);
				if (es(n)) {
					if (r === "?") t.push({
						type: 0,
						index: n
					});
					else {
						let e = Uo(r);
						e && t.push({
							type: 1,
							index: n,
							color: e
						});
					}
				}
			}
		}
		return t.length && this._onColor.fire(t), !0;
	}
	setHyperlink(e) {
		let t = e.indexOf(";");
		if (t === -1) return !0;
		let n = e.slice(0, t).trim(), r = e.slice(t + 1);
		return r ? this._createHyperlink(n, r) : !n.trim() && this._finishHyperlink();
	}
	_createHyperlink(e, t) {
		this._getCurrentLinkId() && this._finishHyperlink();
		let n = e.split(":"), r, i = n.findIndex((e) => e.startsWith("id="));
		return i !== -1 && (r = n[i].slice(3) || void 0), this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = this._oscLinkService.registerLink({
			id: r,
			uri: t
		}), this._curAttrData.updateExtended(), !0;
	}
	_finishHyperlink() {
		return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), !0;
	}
	_setOrReportSpecialColor(e, t) {
		let n = e.split(";");
		for (let e = 0; e < n.length && !(t >= this._specialColors.length); ++e, ++t) if (n[e] === "?") this._onColor.fire([{
			type: 0,
			index: this._specialColors[t]
		}]);
		else {
			let r = Uo(n[e]);
			r && this._onColor.fire([{
				type: 1,
				index: this._specialColors[t],
				color: r
			}]);
		}
		return !0;
	}
	setOrReportFgColor(e) {
		return this._setOrReportSpecialColor(e, 0);
	}
	setOrReportBgColor(e) {
		return this._setOrReportSpecialColor(e, 1);
	}
	setOrReportCursorColor(e) {
		return this._setOrReportSpecialColor(e, 2);
	}
	restoreIndexedColor(e) {
		if (!e) return this._onColor.fire([{ type: 2 }]), !0;
		let t = [], n = e.split(";");
		for (let e = 0; e < n.length; ++e) if (/^\d+$/.exec(n[e])) {
			let r = parseInt(n[e]);
			es(r) && t.push({
				type: 2,
				index: r
			});
		}
		return t.length && this._onColor.fire(t), !0;
	}
	restoreFgColor(e) {
		return this._onColor.fire([{
			type: 2,
			index: 256
		}]), !0;
	}
	restoreBgColor(e) {
		return this._onColor.fire([{
			type: 2,
			index: 257
		}]), !0;
	}
	restoreCursorColor(e) {
		return this._onColor.fire([{
			type: 2,
			index: 258
		}]), !0;
	}
	nextLine() {
		return this._activeBuffer.x = 0, this.index(), !0;
	}
	keypadApplicationMode() {
		return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = !0, this._onRequestSyncScrollBar.fire(), !0;
	}
	keypadNumericMode() {
		return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = !1, this._onRequestSyncScrollBar.fire(), !0;
	}
	selectDefaultCharset() {
		return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, $a), !0;
	}
	selectCharset(e) {
		return e.length === 2 ? (e[0] === "/" || this._charsetService.setgCharset(Ko[e[0]], B[e[1]] || $a), !0) : (this.selectDefaultCharset(), !0);
	}
	index() {
		return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), !0;
	}
	tabSet() {
		return this._activeBuffer.tabs[this._activeBuffer.x] = !0, !0;
	}
	reverseIndex() {
		if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
			let e = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
			this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, e, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
		} else this._activeBuffer.y--, this._restrictCursor();
		return !0;
	}
	fullReset() {
		return this._parser.reset(), this._onRequestReset.fire(), !0;
	}
	reset() {
		this._curAttrData = z.clone(), this._eraseAttrDataInternal = z.clone();
	}
	_eraseAttrData() {
		return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= this._curAttrData.bg & 67108863, this._eraseAttrDataInternal;
	}
	setgLevel(e) {
		return this._charsetService.setgLevel(e), !0;
	}
	screenAlignmentPattern() {
		let e = new T();
		e.content = 4194373, e.fg = this._curAttrData.fg, e.bg = this._curAttrData.bg, this._setCursor(0, 0);
		for (let t = 0; t < this._bufferService.rows; ++t) {
			let n = this._activeBuffer.ybase + this._activeBuffer.y + t, r = this._activeBuffer.lines.get(n);
			r && (r.fill(e), r.isWrapped = !1);
		}
		return this._dirtyRowTracker.markAllDirty(), this._setCursor(0, 0), !0;
	}
	requestStatusString(e, t) {
		let n = (e) => (this._coreService.triggerDataEvent(`${M.ESC}${e}${M.ESC}\\`), !0), r = this._bufferService.buffer, i = this._optionsService.rawOptions;
		return n(e === "\"q" ? `P1$r${+!!this._curAttrData.isProtected()}"q` : e === "\"p" ? "P1$r61;1\"p" : e === "r" ? `P1$r${r.scrollTop + 1};${r.scrollBottom + 1}r` : e === "m" ? "P1$r0m" : e === " q" ? `P1$r${{
			block: 2,
			underline: 4,
			bar: 6
		}[i.cursorStyle] - +!!i.cursorBlink} q` : "P0$r");
	}
	markRangeDirty(e, t) {
		this._dirtyRowTracker.markRangeDirty(e, t);
	}
}, $o = class {
	constructor(e) {
		this._bufferService = e, this.clearRange();
	}
	clearRange() {
		this.start = this._bufferService.buffer.y, this.end = this._bufferService.buffer.y;
	}
	markDirty(e) {
		e < this.start ? this.start = e : e > this.end && (this.end = e);
	}
	markRangeDirty(e, t) {
		e > t && (Zo = e, e = t, t = Zo), e < this.start && (this.start = e), t > this.end && (this.end = t);
	}
	markAllDirty() {
		this.markRangeDirty(0, this._bufferService.rows - 1);
	}
};
$o = x([S(0, Ce)], $o);
function es(e) {
	return 0 <= e && e < 256;
}
var ts = 5e7, ns = 12, rs = 50, is = class extends O {
	constructor(e) {
		super(), this._action = e, this._writeBuffer = [], this._callbacks = [], this._pendingData = 0, this._bufferOffset = 0, this._isSyncWriting = !1, this._syncCalls = 0, this._didUserInput = !1, this._onWriteParsed = this._register(new A()), this.onWriteParsed = this._onWriteParsed.event;
	}
	handleUserInput() {
		this._didUserInput = !0;
	}
	writeSync(e, t) {
		if (t !== void 0 && this._syncCalls > t) {
			this._syncCalls = 0;
			return;
		}
		if (this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(void 0), this._syncCalls++, this._isSyncWriting) return;
		this._isSyncWriting = !0;
		let n;
		for (; n = this._writeBuffer.shift();) {
			this._action(n);
			let e = this._callbacks.shift();
			e && e();
		}
		this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = !1, this._syncCalls = 0;
	}
	write(e, t) {
		if (this._pendingData > ts) throw Error("write data discarded, use flow control to avoid losing data");
		if (!this._writeBuffer.length) {
			if (this._bufferOffset = 0, this._didUserInput) {
				this._didUserInput = !1, this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(t), this._innerWrite();
				return;
			}
			setTimeout(() => this._innerWrite());
		}
		this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(t);
	}
	_innerWrite(e = 0, t = !0) {
		let n = e || performance.now();
		for (; this._writeBuffer.length > this._bufferOffset;) {
			let e = this._writeBuffer[this._bufferOffset], r = this._action(e, t);
			if (r) {
				r.catch((e) => (queueMicrotask(() => {
					throw e;
				}), Promise.resolve(!1))).then((e) => performance.now() - n >= ns ? setTimeout(() => this._innerWrite(0, e)) : this._innerWrite(n, e));
				return;
			}
			let i = this._callbacks[this._bufferOffset];
			if (i && i(), this._bufferOffset++, this._pendingData -= e.length, performance.now() - n >= ns) break;
		}
		this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > rs && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout(() => this._innerWrite())) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
	}
}, as = class {
	constructor(e) {
		this._bufferService = e, this._nextId = 1, this._entriesWithId = /* @__PURE__ */ new Map(), this._dataByLinkId = /* @__PURE__ */ new Map();
	}
	registerLink(e) {
		let t = this._bufferService.buffer;
		if (e.id === void 0) {
			let n = t.addMarker(t.ybase + t.y), r = {
				data: e,
				id: this._nextId++,
				lines: [n]
			};
			return n.onDispose(() => this._removeMarkerFromLink(r, n)), this._dataByLinkId.set(r.id, r), r.id;
		}
		let n = e, r = this._getEntryIdKey(n), i = this._entriesWithId.get(r);
		if (i) return this.addLineToLink(i.id, t.ybase + t.y), i.id;
		let a = t.addMarker(t.ybase + t.y), o = {
			id: this._nextId++,
			key: this._getEntryIdKey(n),
			data: n,
			lines: [a]
		};
		return a.onDispose(() => this._removeMarkerFromLink(o, a)), this._entriesWithId.set(o.key, o), this._dataByLinkId.set(o.id, o), o.id;
	}
	addLineToLink(e, t) {
		let n = this._dataByLinkId.get(e);
		if (n && n.lines.every((e) => e.line !== t)) {
			let e = this._bufferService.buffer.addMarker(t);
			n.lines.push(e), e.onDispose(() => this._removeMarkerFromLink(n, e));
		}
	}
	getLinkData(e) {
		return this._dataByLinkId.get(e)?.data;
	}
	_getEntryIdKey(e) {
		return `${e.id};;${e.uri}`;
	}
	_removeMarkerFromLink(e, t) {
		let n = e.lines.indexOf(t);
		n !== -1 && (e.lines.splice(n, 1), e.lines.length === 0 && (e.data.id !== void 0 && this._entriesWithId.delete(e.key), this._dataByLinkId.delete(e.id)));
	}
};
as = x([S(0, Ce)], as);
var os = !1, ss = class extends O {
	constructor(e) {
		super(), this._windowsWrappingHeuristics = this._register(new dt()), this._onBinary = this._register(new A()), this.onBinary = this._onBinary.event, this._onData = this._register(new A()), this.onData = this._onData.event, this._onLineFeed = this._register(new A()), this.onLineFeed = this._onLineFeed.event, this._onResize = this._register(new A()), this.onResize = this._onResize.event, this._onWriteParsed = this._register(new A()), this.onWriteParsed = this._onWriteParsed.event, this._onScroll = this._register(new A()), this._instantiationService = new La(), this.optionsService = this._register(new co(e)), this._instantiationService.setService(ke, this.optionsService), this._bufferService = this._register(this._instantiationService.createInstance(ao)), this._instantiationService.setService(Ce, this._bufferService), this._logService = this._register(this._instantiationService.createInstance(Ba)), this._instantiationService.setService(Oe, this._logService), this.coreService = this._register(this._instantiationService.createInstance(mo)), this._instantiationService.setService(Te, this.coreService), this.coreMouseService = this._register(this._instantiationService.createInstance(yo)), this._instantiationService.setService(we, this.coreMouseService), this.unicodeService = this._register(this._instantiationService.createInstance(wo)), this._instantiationService.setService(je, this.unicodeService), this._charsetService = this._instantiationService.createInstance(To), this._instantiationService.setService(Ee, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(as), this._instantiationService.setService(Ae, this._oscLinkService), this._inputHandler = this._register(new Qo(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService)), this._register(_t.forward(this._inputHandler.onLineFeed, this._onLineFeed)), this._register(this._inputHandler), this._register(_t.forward(this._bufferService.onResize, this._onResize)), this._register(_t.forward(this.coreService.onData, this._onData)), this._register(_t.forward(this.coreService.onBinary, this._onBinary)), this._register(this.coreService.onRequestScrollToBottom(() => this.scrollToBottom(!0))), this._register(this.coreService.onUserInput(() => this._writeBuffer.handleUserInput())), this._register(this.optionsService.onMultipleOptionChange(["windowsMode", "windowsPty"], () => this._handleWindowsPtyOptionChange())), this._register(this._bufferService.onScroll(() => {
			this._onScroll.fire({ position: this._bufferService.buffer.ydisp }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
		})), this._writeBuffer = this._register(new is((e, t) => this._inputHandler.parse(e, t))), this._register(_t.forward(this._writeBuffer.onWriteParsed, this._onWriteParsed));
	}
	get onScroll() {
		return this._onScrollApi || (this._onScrollApi = this._register(new A()), this._onScroll.event((e) => {
			this._onScrollApi?.fire(e.position);
		})), this._onScrollApi.event;
	}
	get cols() {
		return this._bufferService.cols;
	}
	get rows() {
		return this._bufferService.rows;
	}
	get buffers() {
		return this._bufferService.buffers;
	}
	get options() {
		return this.optionsService.options;
	}
	set options(e) {
		for (let t in e) this.optionsService.options[t] = e[t];
	}
	write(e, t) {
		this._writeBuffer.write(e, t);
	}
	writeSync(e, t) {
		this._logService.logLevel <= 3 && !os && (this._logService.warn("writeSync is unreliable and will be removed soon."), os = !0), this._writeBuffer.writeSync(e, t);
	}
	input(e, t = !0) {
		this.coreService.triggerDataEvent(e, t);
	}
	resize(e, t) {
		isNaN(e) || isNaN(t) || (e = Math.max(e, ro), t = Math.max(t, io), this._bufferService.resize(e, t));
	}
	scroll(e, t = !1) {
		this._bufferService.scroll(e, t);
	}
	scrollLines(e, t) {
		this._bufferService.scrollLines(e, t);
	}
	scrollPages(e) {
		this.scrollLines(e * (this.rows - 1));
	}
	scrollToTop() {
		this.scrollLines(-this._bufferService.buffer.ydisp);
	}
	scrollToBottom(e) {
		this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
	}
	scrollToLine(e) {
		let t = e - this._bufferService.buffer.ydisp;
		t !== 0 && this.scrollLines(t);
	}
	registerEscHandler(e, t) {
		return this._inputHandler.registerEscHandler(e, t);
	}
	registerDcsHandler(e, t) {
		return this._inputHandler.registerDcsHandler(e, t);
	}
	registerCsiHandler(e, t) {
		return this._inputHandler.registerCsiHandler(e, t);
	}
	registerOscHandler(e, t) {
		return this._inputHandler.registerOscHandler(e, t);
	}
	_setup() {
		this._handleWindowsPtyOptionChange();
	}
	reset() {
		this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
	}
	_handleWindowsPtyOptionChange() {
		let e = !1, t = this.optionsService.rawOptions.windowsPty;
		t && t.buildNumber !== void 0 && t.buildNumber !== void 0 ? e = t.backend === "conpty" && t.buildNumber < 21376 : this.optionsService.rawOptions.windowsMode && (e = !0), e ? this._enableWindowsWrappingHeuristics() : this._windowsWrappingHeuristics.clear();
	}
	_enableWindowsWrappingHeuristics() {
		if (!this._windowsWrappingHeuristics.value) {
			let e = [];
			e.push(this.onLineFeed(Eo.bind(null, this._bufferService))), e.push(this.registerCsiHandler({ final: "H" }, () => (Eo(this._bufferService), !1))), this._windowsWrappingHeuristics.value = D(() => {
				for (let t of e) t.dispose();
			});
		}
	}
}, cs = {
	48: ["0", ")"],
	49: ["1", "!"],
	50: ["2", "@"],
	51: ["3", "#"],
	52: ["4", "$"],
	53: ["5", "%"],
	54: ["6", "^"],
	55: ["7", "&"],
	56: ["8", "*"],
	57: ["9", "("],
	186: [";", ":"],
	187: ["=", "+"],
	188: [",", "<"],
	189: ["-", "_"],
	190: [".", ">"],
	191: ["/", "?"],
	192: ["`", "~"],
	219: ["[", "{"],
	220: ["\\", "|"],
	221: ["]", "}"],
	222: ["'", "\""]
};
function ls(e, t, n, r) {
	let i = {
		type: 0,
		cancel: !1,
		key: void 0
	}, a = +!!e.shiftKey | (e.altKey ? 2 : 0) | (e.ctrlKey ? 4 : 0) | (e.metaKey ? 8 : 0);
	switch (e.keyCode) {
		case 0:
			e.key === "UIKeyInputUpArrow" ? i.key = t ? M.ESC + "OA" : M.ESC + "[A" : e.key === "UIKeyInputLeftArrow" ? i.key = t ? M.ESC + "OD" : M.ESC + "[D" : e.key === "UIKeyInputRightArrow" ? i.key = t ? M.ESC + "OC" : M.ESC + "[C" : e.key === "UIKeyInputDownArrow" && (i.key = t ? M.ESC + "OB" : M.ESC + "[B");
			break;
		case 8:
			i.key = e.ctrlKey ? "\b" : M.DEL, e.altKey && (i.key = M.ESC + i.key);
			break;
		case 9:
			if (e.shiftKey) {
				i.key = M.ESC + "[Z";
				break;
			}
			i.key = M.HT, i.cancel = !0;
			break;
		case 13:
			i.key = e.altKey ? M.ESC + M.CR : M.CR, i.cancel = !0;
			break;
		case 27:
			i.key = M.ESC, e.altKey && (i.key = M.ESC + M.ESC), i.cancel = !0;
			break;
		case 37:
			if (e.metaKey) break;
			i.key = a ? M.ESC + "[1;" + (a + 1) + "D" : t ? M.ESC + "OD" : M.ESC + "[D";
			break;
		case 39:
			if (e.metaKey) break;
			i.key = a ? M.ESC + "[1;" + (a + 1) + "C" : t ? M.ESC + "OC" : M.ESC + "[C";
			break;
		case 38:
			if (e.metaKey) break;
			i.key = a ? M.ESC + "[1;" + (a + 1) + "A" : t ? M.ESC + "OA" : M.ESC + "[A";
			break;
		case 40:
			if (e.metaKey) break;
			i.key = a ? M.ESC + "[1;" + (a + 1) + "B" : t ? M.ESC + "OB" : M.ESC + "[B";
			break;
		case 45:
			!e.shiftKey && !e.ctrlKey && (i.key = M.ESC + "[2~");
			break;
		case 46:
			i.key = a ? M.ESC + "[3;" + (a + 1) + "~" : M.ESC + "[3~";
			break;
		case 36:
			i.key = a ? M.ESC + "[1;" + (a + 1) + "H" : t ? M.ESC + "OH" : M.ESC + "[H";
			break;
		case 35:
			i.key = a ? M.ESC + "[1;" + (a + 1) + "F" : t ? M.ESC + "OF" : M.ESC + "[F";
			break;
		case 33:
			e.shiftKey ? i.type = 2 : i.key = e.ctrlKey ? M.ESC + "[5;" + (a + 1) + "~" : M.ESC + "[5~";
			break;
		case 34:
			e.shiftKey ? i.type = 3 : i.key = e.ctrlKey ? M.ESC + "[6;" + (a + 1) + "~" : M.ESC + "[6~";
			break;
		case 112:
			i.key = a ? M.ESC + "[1;" + (a + 1) + "P" : M.ESC + "OP";
			break;
		case 113:
			i.key = a ? M.ESC + "[1;" + (a + 1) + "Q" : M.ESC + "OQ";
			break;
		case 114:
			i.key = a ? M.ESC + "[1;" + (a + 1) + "R" : M.ESC + "OR";
			break;
		case 115:
			i.key = a ? M.ESC + "[1;" + (a + 1) + "S" : M.ESC + "OS";
			break;
		case 116:
			i.key = a ? M.ESC + "[15;" + (a + 1) + "~" : M.ESC + "[15~";
			break;
		case 117:
			i.key = a ? M.ESC + "[17;" + (a + 1) + "~" : M.ESC + "[17~";
			break;
		case 118:
			i.key = a ? M.ESC + "[18;" + (a + 1) + "~" : M.ESC + "[18~";
			break;
		case 119:
			i.key = a ? M.ESC + "[19;" + (a + 1) + "~" : M.ESC + "[19~";
			break;
		case 120:
			i.key = a ? M.ESC + "[20;" + (a + 1) + "~" : M.ESC + "[20~";
			break;
		case 121:
			i.key = a ? M.ESC + "[21;" + (a + 1) + "~" : M.ESC + "[21~";
			break;
		case 122:
			i.key = a ? M.ESC + "[23;" + (a + 1) + "~" : M.ESC + "[23~";
			break;
		case 123:
			i.key = a ? M.ESC + "[24;" + (a + 1) + "~" : M.ESC + "[24~";
			break;
		default: if (e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) e.keyCode >= 65 && e.keyCode <= 90 ? i.key = String.fromCharCode(e.keyCode - 64) : e.keyCode === 32 ? i.key = M.NUL : e.keyCode >= 51 && e.keyCode <= 55 ? i.key = String.fromCharCode(e.keyCode - 51 + 27) : e.keyCode === 56 ? i.key = M.DEL : e.keyCode === 219 ? i.key = M.ESC : e.keyCode === 220 ? i.key = M.FS : e.keyCode === 221 && (i.key = M.GS);
		else if ((!n || r) && e.altKey && !e.metaKey) {
			let t = cs[e.keyCode]?.[+!!e.shiftKey];
			if (t) i.key = M.ESC + t;
			else if (e.keyCode >= 65 && e.keyCode <= 90) {
				let t = e.ctrlKey ? e.keyCode - 64 : e.keyCode + 32, n = String.fromCharCode(t);
				e.shiftKey && (n = n.toUpperCase()), i.key = M.ESC + n;
			} else if (e.keyCode === 32) i.key = M.ESC + (e.ctrlKey ? M.NUL : " ");
			else if (e.key === "Dead" && e.code.startsWith("Key")) {
				let t = e.code.slice(3, 4);
				e.shiftKey || (t = t.toLowerCase()), i.key = M.ESC + t, i.cancel = !0;
			}
		} else n && !e.altKey && !e.ctrlKey && !e.shiftKey && e.metaKey ? e.keyCode === 65 && (i.type = 1) : e.key && !e.ctrlKey && !e.altKey && !e.metaKey && e.keyCode >= 48 && e.key.length === 1 ? i.key = e.key : e.key && e.ctrlKey && (e.key === "_" && (i.key = M.US), e.key === "@" && (i.key = M.NUL));
	}
	return i;
}
var H = 0, us = class {
	constructor(e) {
		this._getKey = e, this._array = [], this._insertedValues = [], this._flushInsertedTask = new ta(), this._isFlushingInserted = !1, this._deletedIndices = [], this._flushDeletedTask = new ta(), this._isFlushingDeleted = !1;
	}
	clear() {
		this._array.length = 0, this._insertedValues.length = 0, this._flushInsertedTask.clear(), this._isFlushingInserted = !1, this._deletedIndices.length = 0, this._flushDeletedTask.clear(), this._isFlushingDeleted = !1;
	}
	insert(e) {
		this._flushCleanupDeleted(), this._insertedValues.length === 0 && this._flushInsertedTask.enqueue(() => this._flushInserted()), this._insertedValues.push(e);
	}
	_flushInserted() {
		let e = this._insertedValues.sort((e, t) => this._getKey(e) - this._getKey(t)), t = 0, n = 0, r = Array(this._array.length + this._insertedValues.length);
		for (let i = 0; i < r.length; i++) n >= this._array.length || this._getKey(e[t]) <= this._getKey(this._array[n]) ? (r[i] = e[t], t++) : r[i] = this._array[n++];
		this._array = r, this._insertedValues.length = 0;
	}
	_flushCleanupInserted() {
		!this._isFlushingInserted && this._insertedValues.length > 0 && this._flushInsertedTask.flush();
	}
	delete(e) {
		if (this._flushCleanupInserted(), this._array.length === 0) return !1;
		let t = this._getKey(e);
		if (t === void 0 || (H = this._search(t), H === -1) || this._getKey(this._array[H]) !== t) return !1;
		do
			if (this._array[H] === e) return this._deletedIndices.length === 0 && this._flushDeletedTask.enqueue(() => this._flushDeleted()), this._deletedIndices.push(H), !0;
		while (++H < this._array.length && this._getKey(this._array[H]) === t);
		return !1;
	}
	_flushDeleted() {
		this._isFlushingDeleted = !0;
		let e = this._deletedIndices.sort((e, t) => e - t), t = 0, n = Array(this._array.length - e.length), r = 0;
		for (let i = 0; i < this._array.length; i++) e[t] === i ? t++ : n[r++] = this._array[i];
		this._array = n, this._deletedIndices.length = 0, this._isFlushingDeleted = !1;
	}
	_flushCleanupDeleted() {
		!this._isFlushingDeleted && this._deletedIndices.length > 0 && this._flushDeletedTask.flush();
	}
	*getKeyIterator(e) {
		if (this._flushCleanupInserted(), this._flushCleanupDeleted(), this._array.length !== 0 && (H = this._search(e), !(H < 0 || H >= this._array.length) && this._getKey(this._array[H]) === e)) do
			yield this._array[H];
		while (++H < this._array.length && this._getKey(this._array[H]) === e);
	}
	forEachByKey(e, t) {
		if (this._flushCleanupInserted(), this._flushCleanupDeleted(), this._array.length !== 0 && (H = this._search(e), !(H < 0 || H >= this._array.length) && this._getKey(this._array[H]) === e)) do
			t(this._array[H]);
		while (++H < this._array.length && this._getKey(this._array[H]) === e);
	}
	values() {
		return this._flushCleanupInserted(), this._flushCleanupDeleted(), [...this._array].values();
	}
	_search(e) {
		let t = 0, n = this._array.length - 1;
		for (; n >= t;) {
			let r = t + n >> 1, i = this._getKey(this._array[r]);
			if (i > e) n = r - 1;
			else if (i < e) t = r + 1;
			else {
				for (; r > 0 && this._getKey(this._array[r - 1]) === e;) r--;
				return r;
			}
		}
		return t;
	}
}, ds = 0, fs = 0, ps = class extends O {
	constructor() {
		super(), this._decorations = new us((e) => e?.marker.line), this._onDecorationRegistered = this._register(new A()), this.onDecorationRegistered = this._onDecorationRegistered.event, this._onDecorationRemoved = this._register(new A()), this.onDecorationRemoved = this._onDecorationRemoved.event, this._register(D(() => this.reset()));
	}
	get decorations() {
		return this._decorations.values();
	}
	registerDecoration(e) {
		if (e.marker.isDisposed) return;
		let t = new ms(e);
		if (t) {
			let e = t.marker.onDispose(() => t.dispose()), n = t.onDispose(() => {
				n.dispose(), t && (this._decorations.delete(t) && this._onDecorationRemoved.fire(t), e.dispose());
			});
			this._decorations.insert(t), this._onDecorationRegistered.fire(t);
		}
		return t;
	}
	reset() {
		for (let e of this._decorations.values()) e.dispose();
		this._decorations.clear();
	}
	*getDecorationsAtCell(e, t, n) {
		let r = 0, i = 0;
		for (let a of this._decorations.getKeyIterator(t)) r = a.options.x ?? 0, i = r + (a.options.width ?? 1), e >= r && e < i && (!n || (a.options.layer ?? "bottom") === n) && (yield a);
	}
	forEachDecorationAtCell(e, t, n, r) {
		this._decorations.forEachByKey(t, (t) => {
			ds = t.options.x ?? 0, fs = ds + (t.options.width ?? 1), e >= ds && e < fs && (!n || (t.options.layer ?? "bottom") === n) && r(t);
		});
	}
}, ms = class extends ut {
	constructor(e) {
		super(), this.options = e, this.onRenderEmitter = this.add(new A()), this.onRender = this.onRenderEmitter.event, this._onDispose = this.add(new A()), this.onDispose = this._onDispose.event, this._cachedBg = null, this._cachedFg = null, this.marker = e.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
	}
	get backgroundColorRGB() {
		return this._cachedBg === null && (this._cachedBg = this.options.backgroundColor ? I.toColor(this.options.backgroundColor) : void 0), this._cachedBg;
	}
	get foregroundColorRGB() {
		return this._cachedFg === null && (this._cachedFg = this.options.foregroundColor ? I.toColor(this.options.foregroundColor) : void 0), this._cachedFg;
	}
	dispose() {
		this._onDispose.fire(), super.dispose();
	}
}, hs = 1e3, gs = class {
	constructor(e, t = hs) {
		this._renderCallback = e, this._debounceThresholdMS = t, this._lastRefreshMs = 0, this._additionalRefreshRequested = !1;
	}
	dispose() {
		this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
	}
	refresh(e, t, n) {
		this._rowCount = n, e = e === void 0 ? 0 : e, t = t === void 0 ? this._rowCount - 1 : t, this._rowStart = this._rowStart === void 0 ? e : Math.min(this._rowStart, e), this._rowEnd = this._rowEnd === void 0 ? t : Math.max(this._rowEnd, t);
		let r = performance.now();
		if (r - this._lastRefreshMs >= this._debounceThresholdMS) this._lastRefreshMs = r, this._innerRefresh();
		else if (!this._additionalRefreshRequested) {
			let e = r - this._lastRefreshMs, t = this._debounceThresholdMS - e;
			this._additionalRefreshRequested = !0, this._refreshTimeoutID = window.setTimeout(() => {
				this._lastRefreshMs = performance.now(), this._innerRefresh(), this._additionalRefreshRequested = !1, this._refreshTimeoutID = void 0;
			}, t);
		}
	}
	_innerRefresh() {
		if (this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0) return;
		let e = Math.max(this._rowStart, 0), t = Math.min(this._rowEnd, this._rowCount - 1);
		this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(e, t);
	}
}, _s = 20, vs = class extends O {
	constructor(e, t, n, r) {
		super(), this._terminal = e, this._coreBrowserService = n, this._renderService = r, this._rowColumns = /* @__PURE__ */ new WeakMap(), this._liveRegionLineCount = 0, this._charsToConsume = [], this._charsToAnnounce = "";
		let i = this._coreBrowserService.mainDocument;
		this._accessibilityContainer = i.createElement("div"), this._accessibilityContainer.classList.add("xterm-accessibility"), this._rowContainer = i.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
		for (let e = 0; e < this._terminal.rows; e++) this._rowElements[e] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e]);
		if (this._topBoundaryFocusListener = (e) => this._handleBoundaryFocus(e, 0), this._bottomBoundaryFocusListener = (e) => this._handleBoundaryFocus(e, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._accessibilityContainer.appendChild(this._rowContainer), this._liveRegion = i.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityContainer.appendChild(this._liveRegion), this._liveRegionDebouncer = this._register(new gs(this._renderRows.bind(this))), !this._terminal.element) throw Error("Cannot enable accessibility before Terminal.open");
		this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityContainer), this._register(this._terminal.onResize((e) => this._handleResize(e.rows))), this._register(this._terminal.onRender((e) => this._refreshRows(e.start, e.end))), this._register(this._terminal.onScroll(() => this._refreshRows())), this._register(this._terminal.onA11yChar((e) => this._handleChar(e))), this._register(this._terminal.onLineFeed(() => this._handleChar("\n"))), this._register(this._terminal.onA11yTab((e) => this._handleTab(e))), this._register(this._terminal.onKey((e) => this._handleKey(e.key))), this._register(this._terminal.onBlur(() => this._clearLiveRegion())), this._register(this._renderService.onDimensionsChange(() => this._refreshRowsDimensions())), this._register(j(i, "selectionchange", () => this._handleSelectionChange())), this._register(this._coreBrowserService.onDprChange(() => this._refreshRowsDimensions())), this._refreshRowsDimensions(), this._refreshRows(), this._register(D(() => {
			this._accessibilityContainer.remove(), this._rowElements.length = 0;
		}));
	}
	_handleTab(e) {
		for (let t = 0; t < e; t++) this._handleChar(" ");
	}
	_handleChar(e) {
		this._liveRegionLineCount < _s + 1 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== e && (this._charsToAnnounce += e) : this._charsToAnnounce += e, e === "\n" && (this._liveRegionLineCount++, this._liveRegionLineCount === _s + 1 && (this._liveRegion.textContent += C.get())));
	}
	_clearLiveRegion() {
		this._liveRegion.textContent = "", this._liveRegionLineCount = 0;
	}
	_handleKey(e) {
		this._clearLiveRegion(), /\p{Control}/u.test(e) || this._charsToConsume.push(e);
	}
	_refreshRows(e, t) {
		this._liveRegionDebouncer.refresh(e, t, this._terminal.rows);
	}
	_renderRows(e, t) {
		let n = this._terminal.buffer, r = n.lines.length.toString();
		for (let i = e; i <= t; i++) {
			let e = n.lines.get(n.ydisp + i), t = [], a = e?.translateToString(!0, void 0, void 0, t) || "", o = (n.ydisp + i + 1).toString(), s = this._rowElements[i];
			s && (a.length === 0 ? (s.textContent = "\xA0", this._rowColumns.set(s, [0, 1])) : (s.textContent = a, this._rowColumns.set(s, t)), s.setAttribute("aria-posinset", o), s.setAttribute("aria-setsize", r), this._alignRowWidth(s));
		}
		this._announceCharacters();
	}
	_announceCharacters() {
		this._charsToAnnounce.length !== 0 && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
	}
	_handleBoundaryFocus(e, t) {
		let n = e.target, r = this._rowElements[t === 0 ? 1 : this._rowElements.length - 2];
		if (n.getAttribute("aria-posinset") === (t === 0 ? "1" : `${this._terminal.buffer.lines.length}`) || e.relatedTarget !== r) return;
		let i, a;
		if (t === 0 ? (i = n, a = this._rowElements.pop(), this._rowContainer.removeChild(a)) : (i = this._rowElements.shift(), a = n, this._rowContainer.removeChild(i)), i.removeEventListener("focus", this._topBoundaryFocusListener), a.removeEventListener("focus", this._bottomBoundaryFocusListener), t === 0) {
			let e = this._createAccessibilityTreeNode();
			this._rowElements.unshift(e), this._rowContainer.insertAdjacentElement("afterbegin", e);
		} else {
			let e = this._createAccessibilityTreeNode();
			this._rowElements.push(e), this._rowContainer.appendChild(e);
		}
		this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(t === 0 ? -1 : 1), this._rowElements[t === 0 ? 1 : this._rowElements.length - 2].focus(), e.preventDefault(), e.stopImmediatePropagation();
	}
	_handleSelectionChange() {
		if (this._rowElements.length === 0) return;
		let e = this._coreBrowserService.mainDocument.getSelection();
		if (!e) return;
		if (e.isCollapsed) {
			this._rowContainer.contains(e.anchorNode) && this._terminal.clearSelection();
			return;
		}
		if (!e.anchorNode || !e.focusNode) {
			console.error("anchorNode and/or focusNode are null");
			return;
		}
		let t = {
			node: e.anchorNode,
			offset: e.anchorOffset
		}, n = {
			node: e.focusNode,
			offset: e.focusOffset
		};
		if ((t.node.compareDocumentPosition(n.node) & Node.DOCUMENT_POSITION_PRECEDING || t.node === n.node && t.offset > n.offset) && ([t, n] = [n, t]), t.node.compareDocumentPosition(this._rowElements[0]) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING) && (t = {
			node: this._rowElements[0].childNodes[0],
			offset: 0
		}), !this._rowContainer.contains(t.node)) return;
		let r = this._rowElements.slice(-1)[0];
		if (n.node.compareDocumentPosition(r) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_PRECEDING) && (n = {
			node: r,
			offset: r.textContent?.length ?? 0
		}), !this._rowContainer.contains(n.node)) return;
		let i = ({ node: e, offset: t }) => {
			let n = e instanceof Text ? e.parentNode : e, r = parseInt(n?.getAttribute("aria-posinset"), 10) - 1;
			if (isNaN(r)) return console.warn("row is invalid. Race condition?"), null;
			let i = this._rowColumns.get(n);
			if (!i) return console.warn("columns is null. Race condition?"), null;
			let a = t < i.length ? i[t] : i.slice(-1)[0] + 1;
			return a >= this._terminal.cols && (++r, a = 0), {
				row: r,
				column: a
			};
		}, a = i(t), o = i(n);
		if (a && o) {
			if (a.row > o.row || a.row === o.row && a.column >= o.column) throw Error("invalid range");
			this._terminal.select(a.column, a.row, (o.row - a.row) * this._terminal.cols - a.column + o.column);
		}
	}
	_handleResize(e) {
		this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
		for (let e = this._rowContainer.children.length; e < this._terminal.rows; e++) this._rowElements[e] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e]);
		for (; this._rowElements.length > e;) this._rowContainer.removeChild(this._rowElements.pop());
		this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
	}
	_createAccessibilityTreeNode() {
		let e = this._coreBrowserService.mainDocument.createElement("div");
		return e.setAttribute("role", "listitem"), e.tabIndex = -1, this._refreshRowDimensions(e), e;
	}
	_refreshRowsDimensions() {
		if (this._renderService.dimensions.css.cell.height) {
			Object.assign(this._accessibilityContainer.style, {
				width: `${this._renderService.dimensions.css.canvas.width}px`,
				fontSize: `${this._terminal.options.fontSize}px`
			}), this._rowElements.length !== this._terminal.rows && this._handleResize(this._terminal.rows);
			for (let e = 0; e < this._terminal.rows; e++) this._refreshRowDimensions(this._rowElements[e]), this._alignRowWidth(this._rowElements[e]);
		}
	}
	_refreshRowDimensions(e) {
		e.style.height = `${this._renderService.dimensions.css.cell.height}px`;
	}
	_alignRowWidth(e) {
		e.style.transform = "";
		let t = e.getBoundingClientRect().width, n = this._rowColumns.get(e)?.slice(-1)?.[0];
		if (!n) return;
		let r = n * this._renderService.dimensions.css.cell.width;
		e.style.transform = `scaleX(${r / t})`;
	}
};
vs = x([
	S(1, De),
	S(2, Ie),
	S(3, Re)
], vs);
var ys = class extends O {
	constructor(e, t, n, r, i) {
		super(), this._element = e, this._mouseService = t, this._renderService = n, this._bufferService = r, this._linkProviderService = i, this._linkCacheDisposables = [], this._isMouseOut = !0, this._wasResized = !1, this._activeLine = -1, this._onShowLinkUnderline = this._register(new A()), this.onShowLinkUnderline = this._onShowLinkUnderline.event, this._onHideLinkUnderline = this._register(new A()), this.onHideLinkUnderline = this._onHideLinkUnderline.event, this._register(D(() => {
			st(this._linkCacheDisposables), this._linkCacheDisposables.length = 0, this._lastMouseEvent = void 0, this._activeProviderReplies?.clear();
		})), this._register(this._bufferService.onResize(() => {
			this._clearCurrentLink(), this._wasResized = !0;
		})), this._register(j(this._element, "mouseleave", () => {
			this._isMouseOut = !0, this._clearCurrentLink();
		})), this._register(j(this._element, "mousemove", this._handleMouseMove.bind(this))), this._register(j(this._element, "mousedown", this._handleMouseDown.bind(this))), this._register(j(this._element, "mouseup", this._handleMouseUp.bind(this)));
	}
	get currentLink() {
		return this._currentLink;
	}
	_handleMouseMove(e) {
		this._lastMouseEvent = e;
		let t = this._positionFromMouseEvent(e, this._element, this._mouseService);
		if (!t) return;
		this._isMouseOut = !1;
		let n = e.composedPath();
		for (let e = 0; e < n.length; e++) {
			let t = n[e];
			if (t.classList.contains("xterm")) break;
			if (t.classList.contains("xterm-hover")) return;
		}
		this._lastBufferCell && t.x === this._lastBufferCell.x && t.y === this._lastBufferCell.y || (this._handleHover(t), this._lastBufferCell = t);
	}
	_handleHover(e) {
		this._activeLine !== e.y || this._wasResized ? (this._clearCurrentLink(), this._askForLink(e, !1), this._wasResized = !1) : this._currentLink && this._linkAtPosition(this._currentLink.link, e) || (this._clearCurrentLink(), this._askForLink(e, !0));
	}
	_askForLink(e, t) {
		this._activeProviderReplies && t || (this._activeProviderReplies?.forEach((e) => {
			e?.forEach((e) => {
				e.link.dispose && e.link.dispose();
			});
		}), this._activeProviderReplies = /* @__PURE__ */ new Map(), this._activeLine = e.y);
		let n = !1;
		for (let [r, i] of this._linkProviderService.linkProviders.entries()) t ? this._activeProviderReplies?.get(r) && (n = this._checkLinkProviderResult(r, e, n)) : i.provideLinks(e.y, (t) => {
			if (this._isMouseOut) return;
			let i = t?.map((e) => ({ link: e }));
			this._activeProviderReplies?.set(r, i), n = this._checkLinkProviderResult(r, e, n), this._activeProviderReplies?.size === this._linkProviderService.linkProviders.length && this._removeIntersectingLinks(e.y, this._activeProviderReplies);
		});
	}
	_removeIntersectingLinks(e, t) {
		let n = /* @__PURE__ */ new Set();
		for (let r = 0; r < t.size; r++) {
			let i = t.get(r);
			if (i) for (let t = 0; t < i.length; t++) {
				let r = i[t], a = r.link.range.start.y < e ? 0 : r.link.range.start.x, o = r.link.range.end.y > e ? this._bufferService.cols : r.link.range.end.x;
				for (let e = a; e <= o; e++) {
					if (n.has(e)) {
						i.splice(t--, 1);
						break;
					}
					n.add(e);
				}
			}
		}
	}
	_checkLinkProviderResult(e, t, n) {
		if (!this._activeProviderReplies) return n;
		let r = this._activeProviderReplies.get(e), i = !1;
		for (let t = 0; t < e; t++) (!this._activeProviderReplies.has(t) || this._activeProviderReplies.get(t)) && (i = !0);
		if (!i && r) {
			let e = r.find((e) => this._linkAtPosition(e.link, t));
			e && (n = !0, this._handleNewLink(e));
		}
		if (this._activeProviderReplies.size === this._linkProviderService.linkProviders.length && !n) for (let e = 0; e < this._activeProviderReplies.size; e++) {
			let r = this._activeProviderReplies.get(e)?.find((e) => this._linkAtPosition(e.link, t));
			if (r) {
				n = !0, this._handleNewLink(r);
				break;
			}
		}
		return n;
	}
	_handleMouseDown() {
		this._mouseDownLink = this._currentLink;
	}
	_handleMouseUp(e) {
		if (!this._currentLink) return;
		let t = this._positionFromMouseEvent(e, this._element, this._mouseService);
		t && this._mouseDownLink && bs(this._mouseDownLink.link, this._currentLink.link) && this._linkAtPosition(this._currentLink.link, t) && this._currentLink.link.activate(e, this._currentLink.link.text);
	}
	_clearCurrentLink(e, t) {
		!this._currentLink || !this._lastMouseEvent || (!e || !t || this._currentLink.link.range.start.y >= e && this._currentLink.link.range.end.y <= t) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = void 0, st(this._linkCacheDisposables), this._linkCacheDisposables.length = 0);
	}
	_handleNewLink(e) {
		if (!this._lastMouseEvent) return;
		let t = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
		t && this._linkAtPosition(e.link, t) && (this._currentLink = e, this._currentLink.state = {
			decorations: {
				underline: e.link.decorations === void 0 || e.link.decorations.underline,
				pointerCursor: e.link.decorations === void 0 || e.link.decorations.pointerCursor
			},
			isHovered: !0
		}, this._linkHover(this._element, e.link, this._lastMouseEvent), e.link.decorations = {}, Object.defineProperties(e.link.decorations, {
			pointerCursor: {
				get: () => this._currentLink?.state?.decorations.pointerCursor,
				set: (e) => {
					this._currentLink?.state && this._currentLink.state.decorations.pointerCursor !== e && (this._currentLink.state.decorations.pointerCursor = e, this._currentLink.state.isHovered && this._element.classList.toggle("xterm-cursor-pointer", e));
				}
			},
			underline: {
				get: () => this._currentLink?.state?.decorations.underline,
				set: (t) => {
					this._currentLink?.state && this._currentLink?.state?.decorations.underline !== t && (this._currentLink.state.decorations.underline = t, this._currentLink.state.isHovered && this._fireUnderlineEvent(e.link, t));
				}
			}
		}), this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange((e) => {
			if (!this._currentLink) return;
			let t = e.start === 0 ? 0 : e.start + 1 + this._bufferService.buffer.ydisp, n = this._bufferService.buffer.ydisp + 1 + e.end;
			if (this._currentLink.link.range.start.y >= t && this._currentLink.link.range.end.y <= n && (this._clearCurrentLink(t, n), this._lastMouseEvent)) {
				let e = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
				e && this._askForLink(e, !1);
			}
		})));
	}
	_linkHover(e, t, n) {
		this._currentLink?.state && (this._currentLink.state.isHovered = !0, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t, !0), this._currentLink.state.decorations.pointerCursor && e.classList.add("xterm-cursor-pointer")), t.hover && t.hover(n, t.text);
	}
	_fireUnderlineEvent(e, t) {
		let n = e.range, r = this._bufferService.buffer.ydisp, i = this._createLinkUnderlineEvent(n.start.x - 1, n.start.y - r - 1, n.end.x, n.end.y - r - 1, void 0);
		(t ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(i);
	}
	_linkLeave(e, t, n) {
		this._currentLink?.state && (this._currentLink.state.isHovered = !1, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t, !1), this._currentLink.state.decorations.pointerCursor && e.classList.remove("xterm-cursor-pointer")), t.leave && t.leave(n, t.text);
	}
	_linkAtPosition(e, t) {
		let n = e.range.start.y * this._bufferService.cols + e.range.start.x, r = e.range.end.y * this._bufferService.cols + e.range.end.x, i = t.y * this._bufferService.cols + t.x;
		return n <= i && i <= r;
	}
	_positionFromMouseEvent(e, t, n) {
		let r = n.getCoords(e, t, this._bufferService.cols, this._bufferService.rows);
		if (r) return {
			x: r[0],
			y: r[1] + this._bufferService.buffer.ydisp
		};
	}
	_createLinkUnderlineEvent(e, t, n, r, i) {
		return {
			x1: e,
			y1: t,
			x2: n,
			y2: r,
			cols: this._bufferService.cols,
			fg: i
		};
	}
};
ys = x([
	S(1, Le),
	S(2, Re),
	S(3, Ce),
	S(4, He)
], ys);
function bs(e, t) {
	return e.text === t.text && e.range.start.x === t.range.start.x && e.range.start.y === t.range.start.y && e.range.end.x === t.range.end.x && e.range.end.y === t.range.end.y;
}
var xs = class extends ss {
	constructor(e = {}) {
		super(e), this._linkifier = this._register(new dt()), this.browser = Ri, this._keyDownHandled = !1, this._keyDownSeen = !1, this._keyPressHandled = !1, this._unprocessedDeadKey = !1, this._accessibilityManager = this._register(new dt()), this._onCursorMove = this._register(new A()), this.onCursorMove = this._onCursorMove.event, this._onKey = this._register(new A()), this.onKey = this._onKey.event, this._onRender = this._register(new A()), this.onRender = this._onRender.event, this._onSelectionChange = this._register(new A()), this.onSelectionChange = this._onSelectionChange.event, this._onTitleChange = this._register(new A()), this.onTitleChange = this._onTitleChange.event, this._onBell = this._register(new A()), this.onBell = this._onBell.event, this._onFocus = this._register(new A()), this._onBlur = this._register(new A()), this._onA11yCharEmitter = this._register(new A()), this._onA11yTabEmitter = this._register(new A()), this._onWillOpen = this._register(new A()), this._setup(), this._decorationService = this._instantiationService.createInstance(ps), this._instantiationService.setService(Me, this._decorationService), this._linkProviderService = this._instantiationService.createInstance(Ni), this._instantiationService.setService(He, this._linkProviderService), this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(Ne)), this._register(this._inputHandler.onRequestBell(() => this._onBell.fire())), this._register(this._inputHandler.onRequestRefreshRows((e) => this.refresh(e?.start ?? 0, e?.end ?? this.rows - 1))), this._register(this._inputHandler.onRequestSendFocus(() => this._reportFocus())), this._register(this._inputHandler.onRequestReset(() => this.reset())), this._register(this._inputHandler.onRequestWindowsOptionsReport((e) => this._reportWindowsOptions(e))), this._register(this._inputHandler.onColor((e) => this._handleColorEvent(e))), this._register(_t.forward(this._inputHandler.onCursorMove, this._onCursorMove)), this._register(_t.forward(this._inputHandler.onTitleChange, this._onTitleChange)), this._register(_t.forward(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this._register(_t.forward(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this._register(this._bufferService.onResize((e) => this._afterResize(e.cols, e.rows))), this._register(D(() => {
			this._customKeyEventHandler = void 0, this.element?.parentNode?.removeChild(this.element);
		}));
	}
	get linkifier() {
		return this._linkifier.value;
	}
	get onFocus() {
		return this._onFocus.event;
	}
	get onBlur() {
		return this._onBlur.event;
	}
	get onA11yChar() {
		return this._onA11yCharEmitter.event;
	}
	get onA11yTab() {
		return this._onA11yTabEmitter.event;
	}
	get onWillOpen() {
		return this._onWillOpen.event;
	}
	_handleColorEvent(e) {
		if (this._themeService) for (let t of e) {
			let e, n = "";
			switch (t.index) {
				case 256:
					e = "foreground", n = "10";
					break;
				case 257:
					e = "background", n = "11";
					break;
				case 258:
					e = "cursor", n = "12";
					break;
				default: e = "ansi", n = "4;" + t.index;
			}
			switch (t.type) {
				case 0:
					let r = F.toColorRGB(e === "ansi" ? this._themeService.colors.ansi[t.index] : this._themeService.colors[e]);
					this.coreService.triggerDataEvent(`${M.ESC}]${n};${Go(r)}${Zr.ST}`);
					break;
				case 1:
					if (e === "ansi") this._themeService.modifyColors((e) => e.ansi[t.index] = P.toColor(...t.color));
					else {
						let n = e;
						this._themeService.modifyColors((e) => e[n] = P.toColor(...t.color));
					}
					break;
				case 2: this._themeService.restoreColor(t.index);
			}
		}
	}
	_setup() {
		super._setup(), this._customKeyEventHandler = void 0;
	}
	get buffer() {
		return this.buffers.active;
	}
	focus() {
		this.textarea && this.textarea.focus({ preventScroll: !0 });
	}
	_handleScreenReaderModeOptionChange(e) {
		e ? !this._accessibilityManager.value && this._renderService && (this._accessibilityManager.value = this._instantiationService.createInstance(vs, this)) : this._accessibilityManager.clear();
	}
	_handleTextAreaFocus(e) {
		this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(M.ESC + "[I"), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
	}
	blur() {
		return this.textarea?.blur();
	}
	_handleTextAreaBlur() {
		this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(M.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
	}
	_syncTextArea() {
		if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService) return;
		let e = this.buffer.ybase + this.buffer.y, t = this.buffer.lines.get(e);
		if (!t) return;
		let n = Math.min(this.buffer.x, this.cols - 1), r = this._renderService.dimensions.css.cell.height, i = t.getWidth(n), a = this._renderService.dimensions.css.cell.width * i, o = this.buffer.y * this._renderService.dimensions.css.cell.height, s = n * this._renderService.dimensions.css.cell.width;
		this.textarea.style.left = s + "px", this.textarea.style.top = o + "px", this.textarea.style.width = a + "px", this.textarea.style.height = r + "px", this.textarea.style.lineHeight = r + "px", this.textarea.style.zIndex = "-5";
	}
	_initGlobal() {
		this._bindKeys(), this._register(j(this.element, "copy", (e) => {
			this.hasSelection() && oe(e, this._selectionService);
		}));
		let e = (e) => se(e, this.textarea, this.coreService, this.optionsService);
		this._register(j(this.textarea, "paste", e)), this._register(j(this.element, "paste", e)), Hi ? this._register(j(this.element, "mousedown", (e) => {
			e.button === 2 && le(e, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
		})) : this._register(j(this.element, "contextmenu", (e) => {
			le(e, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
		})), Xi && this._register(j(this.element, "auxclick", (e) => {
			e.button === 1 && w(e, this.textarea, this.screenElement);
		}));
	}
	_bindKeys() {
		this._register(j(this.textarea, "keyup", (e) => this._keyUp(e), !0)), this._register(j(this.textarea, "keydown", (e) => this._keyDown(e), !0)), this._register(j(this.textarea, "keypress", (e) => this._keyPress(e), !0)), this._register(j(this.textarea, "compositionstart", () => this._compositionHelper.compositionstart())), this._register(j(this.textarea, "compositionupdate", (e) => this._compositionHelper.compositionupdate(e))), this._register(j(this.textarea, "compositionend", () => this._compositionHelper.compositionend())), this._register(j(this.textarea, "input", (e) => this._inputEvent(e), !0)), this._register(this.onRender(() => this._compositionHelper.updateCompositionElements()));
	}
	open(e) {
		if (!e) throw Error("Terminal requires a parent element.");
		if (e.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), this.element?.ownerDocument.defaultView && this._coreBrowserService) {
			this.element.ownerDocument.defaultView !== this._coreBrowserService.window && (this._coreBrowserService.window = this.element.ownerDocument.defaultView);
			return;
		}
		this._document = e.ownerDocument, this.options.documentOverride && this.options.documentOverride instanceof Document && (this._document = this.optionsService.rawOptions.documentOverride), this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), e.appendChild(this.element);
		let t = this._document.createDocumentFragment();
		this._viewportElement = this._document.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), t.appendChild(this._viewportElement), this.screenElement = this._document.createElement("div"), this.screenElement.classList.add("xterm-screen"), this._register(j(this.screenElement, "mousemove", (e) => this.updateCursorStyle(e))), this._helperContainer = this._document.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), t.appendChild(this.screenElement);
		let n = this.textarea = this._document.createElement("textarea");
		this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", ne.get()), Zi || this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this._register(this.optionsService.onSpecificOptionChange("disableStdin", () => n.readOnly = this.optionsService.rawOptions.disableStdin)), this.textarea.readOnly = this.optionsService.rawOptions.disableStdin, this._coreBrowserService = this._register(this._instantiationService.createInstance(ji, this.textarea, e.ownerDocument.defaultView ?? window, this._document ?? typeof window < "u" ? window.document : null)), this._instantiationService.setService(Ie, this._coreBrowserService), this._register(j(this.textarea, "focus", (e) => this._handleTextAreaFocus(e))), this._register(j(this.textarea, "blur", () => this._handleTextAreaBlur())), this._helperContainer.appendChild(this.textarea), this._charSizeService = this._instantiationService.createInstance(Di, this._document, this._helperContainer), this._instantiationService.setService(Fe, this._charSizeService), this._themeService = this._instantiationService.createInstance(Fa), this._instantiationService.setService(Ve, this._themeService), this._characterJoinerService = this._instantiationService.createInstance(ci), this._instantiationService.setService(Be, this._characterJoinerService), this._renderService = this._register(this._instantiationService.createInstance(ra, this.rows, this.screenElement)), this._instantiationService.setService(Re, this._renderService), this._register(this._renderService.onRenderedViewportChange((e) => this._onRender.fire(e))), this.onResize((e) => this._renderService.resize(e.cols, e.rows)), this._compositionView = this._document.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance(Qr, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this._mouseService = this._instantiationService.createInstance(Ii), this._instantiationService.setService(Le, this._mouseService);
		let r = this._linkifier.value = this._register(this._instantiationService.createInstance(ys, this.screenElement));
		this.element.appendChild(t);
		try {
			this._onWillOpen.fire(this.element);
		} catch {}
		this._renderService.hasRenderer() || this._renderService.setRenderer(this._createRenderer()), this._register(this.onCursorMove(() => {
			this._renderService.handleCursorMove(), this._syncTextArea();
		})), this._register(this.onResize(() => this._renderService.handleResize(this.cols, this.rows))), this._register(this.onBlur(() => this._renderService.handleBlur())), this._register(this.onFocus(() => this._renderService.handleFocus())), this._viewport = this._register(this._instantiationService.createInstance(Ur, this.element, this.screenElement)), this._register(this._viewport.onRequestScrollLines((e) => {
			super.scrollLines(e, !1), this.refresh(0, this.rows - 1);
		})), this._selectionService = this._register(this._instantiationService.createInstance(Ta, this.element, this.screenElement, r)), this._instantiationService.setService(ze, this._selectionService), this._register(this._selectionService.onRequestScrollLines((e) => this.scrollLines(e.amount, e.suppressScrollEvent))), this._register(this._selectionService.onSelectionChange(() => this._onSelectionChange.fire())), this._register(this._selectionService.onRequestRedraw((e) => this._renderService.handleSelectionChanged(e.start, e.end, e.columnSelectMode))), this._register(this._selectionService.onLinuxMouseSelection((e) => {
			this.textarea.value = e, this.textarea.focus(), this.textarea.select();
		})), this._register(_t.any(this._onScroll.event, this._inputHandler.onScroll)(() => {
			this._selectionService.refresh(), this._viewport?.queueSync();
		})), this._register(this._instantiationService.createInstance(Wr, this.screenElement)), this._register(j(this.element, "mousedown", (e) => this._selectionService.handleMouseDown(e))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager.value = this._instantiationService.createInstance(vs, this)), this._register(this.optionsService.onSpecificOptionChange("screenReaderMode", (e) => this._handleScreenReaderModeOptionChange(e))), this.options.overviewRuler.width && (this._overviewRulerRenderer = this._register(this._instantiationService.createInstance(Yr, this._viewportElement, this.screenElement))), this.optionsService.onSpecificOptionChange("overviewRuler", (e) => {
			!this._overviewRulerRenderer && e && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this._register(this._instantiationService.createInstance(Yr, this._viewportElement, this.screenElement)));
		}), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
	}
	_createRenderer() {
		return this._instantiationService.createInstance(Ei, this, this._document, this.element, this.screenElement, this._viewportElement, this._helperContainer, this.linkifier);
	}
	bindMouse() {
		let e = this, t = this.element;
		function n(t) {
			let n = e._mouseService.getMouseReportCoords(t, e.screenElement);
			if (!n) return !1;
			let r, i;
			switch (t.overrideType || t.type) {
				case "mousemove":
					i = 32, t.buttons === void 0 ? (r = 3, t.button !== void 0 && (r = t.button < 3 ? t.button : 3)) : r = t.buttons & 1 ? 0 : t.buttons & 4 ? 1 : t.buttons & 2 ? 2 : 3;
					break;
				case "mouseup":
					i = 0, r = t.button < 3 ? t.button : 3;
					break;
				case "mousedown":
					i = 1, r = t.button < 3 ? t.button : 3;
					break;
				case "wheel":
					if (e._customWheelEventHandler && e._customWheelEventHandler(t) === !1) return !1;
					let n = t.deltaY;
					if (n === 0 || e.coreMouseService.consumeWheelEvent(t, e._renderService?.dimensions?.device?.cell?.height, e._coreBrowserService?.dpr) === 0) return !1;
					i = n < 0 ? 0 : 1, r = 4;
					break;
				default: return !1;
			}
			return i === void 0 || r === void 0 || r > 4 ? !1 : e.coreMouseService.triggerMouseEvent({
				col: n.col,
				row: n.row,
				x: n.x,
				y: n.y,
				button: r,
				action: i,
				ctrl: t.ctrlKey,
				alt: t.altKey,
				shift: t.shiftKey
			});
		}
		let r = {
			mouseup: null,
			wheel: null,
			mousedrag: null,
			mousemove: null
		}, i = {
			mouseup: (e) => (n(e), e.buttons || (this._document.removeEventListener("mouseup", r.mouseup), r.mousedrag && this._document.removeEventListener("mousemove", r.mousedrag)), this.cancel(e)),
			wheel: (e) => (n(e), this.cancel(e, !0)),
			mousedrag: (e) => {
				e.buttons && n(e);
			},
			mousemove: (e) => {
				e.buttons || n(e);
			}
		};
		this._register(this.coreMouseService.onProtocolChange((e) => {
			e ? (this.optionsService.rawOptions.logLevel === "debug" && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(e)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), e & 8 ? r.mousemove ||= (t.addEventListener("mousemove", i.mousemove), i.mousemove) : (t.removeEventListener("mousemove", r.mousemove), r.mousemove = null), e & 16 ? r.wheel ||= (t.addEventListener("wheel", i.wheel, { passive: !1 }), i.wheel) : (t.removeEventListener("wheel", r.wheel), r.wheel = null), e & 2 ? r.mouseup ||= i.mouseup : (this._document.removeEventListener("mouseup", r.mouseup), r.mouseup = null), e & 4 ? r.mousedrag ||= i.mousedrag : (this._document.removeEventListener("mousemove", r.mousedrag), r.mousedrag = null);
		})), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this._register(j(t, "mousedown", (e) => {
			if (e.preventDefault(), this.focus(), this.coreMouseService.areMouseEventsActive && !this._selectionService.shouldForceSelection(e)) return n(e), r.mouseup && this._document.addEventListener("mouseup", r.mouseup), r.mousedrag && this._document.addEventListener("mousemove", r.mousedrag), this.cancel(e);
		})), this._register(j(t, "wheel", (t) => {
			if (!r.wheel) {
				if (this._customWheelEventHandler && this._customWheelEventHandler(t) === !1) return !1;
				if (!this.buffer.hasScrollback) {
					if (t.deltaY === 0) return !1;
					if (e.coreMouseService.consumeWheelEvent(t, e._renderService?.dimensions?.device?.cell?.height, e._coreBrowserService?.dpr) === 0) return this.cancel(t, !0);
					let n = M.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (t.deltaY < 0 ? "A" : "B");
					return this.coreService.triggerDataEvent(n, !0), this.cancel(t, !0);
				}
			}
		}, { passive: !1 }));
	}
	refresh(e, t) {
		this._renderService?.refreshRows(e, t);
	}
	updateCursorStyle(e) {
		this._selectionService?.shouldColumnSelect(e) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
	}
	_showCursor() {
		this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = !0, this.refresh(this.buffer.y, this.buffer.y));
	}
	scrollLines(e, t) {
		this._viewport ? this._viewport.scrollLines(e) : super.scrollLines(e, t), this.refresh(0, this.rows - 1);
	}
	scrollPages(e) {
		this.scrollLines(e * (this.rows - 1));
	}
	scrollToTop() {
		this.scrollLines(-this._bufferService.buffer.ydisp);
	}
	scrollToBottom(e) {
		e && this._viewport ? this._viewport.scrollToLine(this.buffer.ybase, !0) : this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
	}
	scrollToLine(e) {
		let t = e - this._bufferService.buffer.ydisp;
		t !== 0 && this.scrollLines(t);
	}
	paste(e) {
		ce(e, this.textarea, this.coreService, this.optionsService);
	}
	attachCustomKeyEventHandler(e) {
		this._customKeyEventHandler = e;
	}
	attachCustomWheelEventHandler(e) {
		this._customWheelEventHandler = e;
	}
	registerLinkProvider(e) {
		return this._linkProviderService.registerLinkProvider(e);
	}
	registerCharacterJoiner(e) {
		if (!this._characterJoinerService) throw Error("Terminal must be opened first");
		let t = this._characterJoinerService.register(e);
		return this.refresh(0, this.rows - 1), t;
	}
	deregisterCharacterJoiner(e) {
		if (!this._characterJoinerService) throw Error("Terminal must be opened first");
		this._characterJoinerService.deregister(e) && this.refresh(0, this.rows - 1);
	}
	get markers() {
		return this.buffer.markers;
	}
	registerMarker(e) {
		return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + e);
	}
	registerDecoration(e) {
		return this._decorationService.registerDecoration(e);
	}
	hasSelection() {
		return this._selectionService ? this._selectionService.hasSelection : !1;
	}
	select(e, t, n) {
		this._selectionService.setSelection(e, t, n);
	}
	getSelection() {
		return this._selectionService ? this._selectionService.selectionText : "";
	}
	getSelectionPosition() {
		if (this._selectionService && this._selectionService.hasSelection) return {
			start: {
				x: this._selectionService.selectionStart[0],
				y: this._selectionService.selectionStart[1]
			},
			end: {
				x: this._selectionService.selectionEnd[0],
				y: this._selectionService.selectionEnd[1]
			}
		};
	}
	clearSelection() {
		this._selectionService?.clearSelection();
	}
	selectAll() {
		this._selectionService?.selectAll();
	}
	selectLines(e, t) {
		this._selectionService?.selectLines(e, t);
	}
	_keyDown(e) {
		if (this._keyDownHandled = !1, this._keyDownSeen = !0, this._customKeyEventHandler && this._customKeyEventHandler(e) === !1) return !1;
		let t = this.browser.isMac && this.options.macOptionIsMeta && e.altKey;
		if (!t && !this._compositionHelper.keydown(e)) return this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(!0), !1;
		t || e.key !== "Dead" && e.key !== "AltGraph" || (this._unprocessedDeadKey = !0);
		let n = ls(e, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
		if (this.updateCursorStyle(e), n.type === 3 || n.type === 2) {
			let t = this.rows - 1;
			return this.scrollLines(n.type === 2 ? -t : t), this.cancel(e, !0);
		}
		if (n.type === 1 && this.selectAll(), this._isThirdLevelShift(this.browser, e) || (n.cancel && this.cancel(e, !0), !n.key) || e.key && !e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1 && e.key.charCodeAt(0) >= 65 && e.key.charCodeAt(0) <= 90) return !0;
		if (this._unprocessedDeadKey) return this._unprocessedDeadKey = !1, !0;
		if ((n.key === M.ETX || n.key === M.CR) && (this.textarea.value = ""), this._onKey.fire({
			key: n.key,
			domEvent: e
		}), this._showCursor(), this.coreService.triggerDataEvent(n.key, !0), !this.optionsService.rawOptions.screenReaderMode || e.altKey || e.ctrlKey) return this.cancel(e, !0);
		this._keyDownHandled = !0;
	}
	_isThirdLevelShift(e, t) {
		let n = e.isMac && !this.options.macOptionIsMeta && t.altKey && !t.ctrlKey && !t.metaKey || e.isWindows && t.altKey && t.ctrlKey && !t.metaKey || e.isWindows && t.getModifierState("AltGraph");
		return t.type === "keypress" ? n : n && (!t.keyCode || t.keyCode > 47);
	}
	_keyUp(e) {
		this._keyDownSeen = !1, !(this._customKeyEventHandler && this._customKeyEventHandler(e) === !1) && (Ss(e) || this.focus(), this.updateCursorStyle(e), this._keyPressHandled = !1);
	}
	_keyPress(e) {
		let t;
		if (this._keyPressHandled = !1, this._keyDownHandled || this._customKeyEventHandler && this._customKeyEventHandler(e) === !1) return !1;
		if (this.cancel(e), e.charCode) t = e.charCode;
		else if (e.which === null || e.which === void 0) t = e.keyCode;
		else if (e.which !== 0 && e.charCode !== 0) t = e.which;
		else return !1;
		return !t || (e.altKey || e.ctrlKey || e.metaKey) && !this._isThirdLevelShift(this.browser, e) ? !1 : (t = String.fromCharCode(t), this._onKey.fire({
			key: t,
			domEvent: e
		}), this._showCursor(), this.coreService.triggerDataEvent(t, !0), this._keyPressHandled = !0, this._unprocessedDeadKey = !1, !0);
	}
	_inputEvent(e) {
		if (e.data && e.inputType === "insertText" && (!e.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
			if (this._keyPressHandled) return !1;
			this._unprocessedDeadKey = !1;
			let t = e.data;
			return this.coreService.triggerDataEvent(t, !0), this.cancel(e), !0;
		}
		return !1;
	}
	resize(e, t) {
		e === this.cols && t === this.rows ? this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure() : super.resize(e, t);
	}
	_afterResize(e, t) {
		this._charSizeService?.measure();
	}
	clear() {
		if (this.buffer.ybase !== 0 || this.buffer.y !== 0) {
			this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
			for (let e = 1; e < this.rows; e++) this.buffer.lines.push(this.buffer.getBlankLine(z));
			this._onScroll.fire({ position: this.buffer.ydisp }), this.refresh(0, this.rows - 1);
		}
	}
	reset() {
		this.options.rows = this.rows, this.options.cols = this.cols;
		let e = this._customKeyEventHandler;
		this._setup(), super.reset(), this._selectionService?.reset(), this._decorationService.reset(), this._customKeyEventHandler = e, this.refresh(0, this.rows - 1);
	}
	clearTextureAtlas() {
		this._renderService?.clearTextureAtlas();
	}
	_reportFocus() {
		this.element?.classList.contains("focus") ? this.coreService.triggerDataEvent(M.ESC + "[I") : this.coreService.triggerDataEvent(M.ESC + "[O");
	}
	_reportWindowsOptions(e) {
		if (this._renderService) switch (e) {
			case 0:
				let e = this._renderService.dimensions.css.canvas.width.toFixed(0), t = this._renderService.dimensions.css.canvas.height.toFixed(0);
				this.coreService.triggerDataEvent(`${M.ESC}[4;${t};${e}t`);
				break;
			case 1:
				let n = this._renderService.dimensions.css.cell.width.toFixed(0), r = this._renderService.dimensions.css.cell.height.toFixed(0);
				this.coreService.triggerDataEvent(`${M.ESC}[6;${r};${n}t`);
		}
	}
	cancel(e, t) {
		if (this.options.cancelEvents || t) return e.preventDefault(), e.stopPropagation(), !1;
	}
};
function Ss(e) {
	return e.keyCode === 16 || e.keyCode === 17 || e.keyCode === 18;
}
var Cs = class {
	constructor() {
		this._addons = [];
	}
	dispose() {
		for (let e = this._addons.length - 1; e >= 0; e--) this._addons[e].instance.dispose();
	}
	loadAddon(e, t) {
		let n = {
			instance: t,
			dispose: t.dispose,
			isDisposed: !1
		};
		this._addons.push(n), t.dispose = () => this._wrappedAddonDispose(n), t.activate(e);
	}
	_wrappedAddonDispose(e) {
		if (e.isDisposed) return;
		let t = -1;
		for (let n = 0; n < this._addons.length; n++) if (this._addons[n] === e) {
			t = n;
			break;
		}
		if (t === -1) throw Error("Could not dispose an addon that has not been loaded");
		e.isDisposed = !0, e.dispose.apply(e.instance), this._addons.splice(t, 1);
	}
}, ws = class {
	constructor(e) {
		this._line = e;
	}
	get isWrapped() {
		return this._line.isWrapped;
	}
	get length() {
		return this._line.length;
	}
	getCell(e, t) {
		if (!(e < 0 || e >= this._line.length)) return t ? (this._line.loadCell(e, t), t) : this._line.loadCell(e, new T());
	}
	translateToString(e, t, n) {
		return this._line.translateToString(e, t, n);
	}
}, Ts = class {
	constructor(e, t) {
		this._buffer = e, this.type = t;
	}
	init(e) {
		return this._buffer = e, this;
	}
	get cursorY() {
		return this._buffer.y;
	}
	get cursorX() {
		return this._buffer.x;
	}
	get viewportY() {
		return this._buffer.ydisp;
	}
	get baseY() {
		return this._buffer.ybase;
	}
	get length() {
		return this._buffer.lines.length;
	}
	getLine(e) {
		let t = this._buffer.lines.get(e);
		if (t) return new ws(t);
	}
	getNullCell() {
		return new T();
	}
}, Es = class extends O {
	constructor(e) {
		super(), this._core = e, this._onBufferChange = this._register(new A()), this.onBufferChange = this._onBufferChange.event, this._normal = new Ts(this._core.buffers.normal, "normal"), this._alternate = new Ts(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate(() => this._onBufferChange.fire(this.active));
	}
	get active() {
		if (this._core.buffers.active === this._core.buffers.normal) return this.normal;
		if (this._core.buffers.active === this._core.buffers.alt) return this.alternate;
		throw Error("Active buffer is neither normal nor alternate");
	}
	get normal() {
		return this._normal.init(this._core.buffers.normal);
	}
	get alternate() {
		return this._alternate.init(this._core.buffers.alt);
	}
}, Ds = class {
	constructor(e) {
		this._core = e;
	}
	registerCsiHandler(e, t) {
		return this._core.registerCsiHandler(e, (e) => t(e.toArray()));
	}
	addCsiHandler(e, t) {
		return this.registerCsiHandler(e, t);
	}
	registerDcsHandler(e, t) {
		return this._core.registerDcsHandler(e, (e, n) => t(e, n.toArray()));
	}
	addDcsHandler(e, t) {
		return this.registerDcsHandler(e, t);
	}
	registerEscHandler(e, t) {
		return this._core.registerEscHandler(e, t);
	}
	addEscHandler(e, t) {
		return this.registerEscHandler(e, t);
	}
	registerOscHandler(e, t) {
		return this._core.registerOscHandler(e, t);
	}
	addOscHandler(e, t) {
		return this.registerOscHandler(e, t);
	}
}, Os = class {
	constructor(e) {
		this._core = e;
	}
	register(e) {
		this._core.unicodeService.register(e);
	}
	get versions() {
		return this._core.unicodeService.versions;
	}
	get activeVersion() {
		return this._core.unicodeService.activeVersion;
	}
	set activeVersion(e) {
		this._core.unicodeService.activeVersion = e;
	}
}, ks = ["cols", "rows"], As = 0, js = class extends O {
	constructor(e) {
		super(), this._core = this._register(new xs(e)), this._addonManager = this._register(new Cs()), this._publicOptions = { ...this._core.options };
		let t = (e) => this._core.options[e], n = (e, t) => {
			this._checkReadonlyOptions(e), this._core.options[e] = t;
		};
		for (let e in this._core.options) {
			let r = {
				get: t.bind(this, e),
				set: n.bind(this, e)
			};
			Object.defineProperty(this._publicOptions, e, r);
		}
	}
	_checkReadonlyOptions(e) {
		if (ks.includes(e)) throw Error(`Option "${e}" can only be set in the constructor`);
	}
	_checkProposedApi() {
		if (!this._core.optionsService.rawOptions.allowProposedApi) throw Error("You must set the allowProposedApi option to true to use proposed API");
	}
	get onBell() {
		return this._core.onBell;
	}
	get onBinary() {
		return this._core.onBinary;
	}
	get onCursorMove() {
		return this._core.onCursorMove;
	}
	get onData() {
		return this._core.onData;
	}
	get onKey() {
		return this._core.onKey;
	}
	get onLineFeed() {
		return this._core.onLineFeed;
	}
	get onRender() {
		return this._core.onRender;
	}
	get onResize() {
		return this._core.onResize;
	}
	get onScroll() {
		return this._core.onScroll;
	}
	get onSelectionChange() {
		return this._core.onSelectionChange;
	}
	get onTitleChange() {
		return this._core.onTitleChange;
	}
	get onWriteParsed() {
		return this._core.onWriteParsed;
	}
	get element() {
		return this._core.element;
	}
	get parser() {
		return this._parser ||= new Ds(this._core), this._parser;
	}
	get unicode() {
		return this._checkProposedApi(), new Os(this._core);
	}
	get textarea() {
		return this._core.textarea;
	}
	get rows() {
		return this._core.rows;
	}
	get cols() {
		return this._core.cols;
	}
	get buffer() {
		return this._buffer ||= this._register(new Es(this._core)), this._buffer;
	}
	get markers() {
		return this._checkProposedApi(), this._core.markers;
	}
	get modes() {
		let e = this._core.coreService.decPrivateModes, t = "none";
		switch (this._core.coreMouseService.activeProtocol) {
			case "X10":
				t = "x10";
				break;
			case "VT200":
				t = "vt200";
				break;
			case "DRAG":
				t = "drag";
				break;
			case "ANY": t = "any";
		}
		return {
			applicationCursorKeysMode: e.applicationCursorKeys,
			applicationKeypadMode: e.applicationKeypad,
			bracketedPasteMode: e.bracketedPasteMode,
			insertMode: this._core.coreService.modes.insertMode,
			mouseTrackingMode: t,
			originMode: e.origin,
			reverseWraparoundMode: e.reverseWraparound,
			sendFocusMode: e.sendFocus,
			synchronizedOutputMode: e.synchronizedOutput,
			wraparoundMode: e.wraparound
		};
	}
	get options() {
		return this._publicOptions;
	}
	set options(e) {
		for (let t in e) this._publicOptions[t] = e[t];
	}
	blur() {
		this._core.blur();
	}
	focus() {
		this._core.focus();
	}
	input(e, t = !0) {
		this._core.input(e, t);
	}
	resize(e, t) {
		this._verifyIntegers(e, t), this._core.resize(e, t);
	}
	open(e) {
		this._core.open(e);
	}
	attachCustomKeyEventHandler(e) {
		this._core.attachCustomKeyEventHandler(e);
	}
	attachCustomWheelEventHandler(e) {
		this._core.attachCustomWheelEventHandler(e);
	}
	registerLinkProvider(e) {
		return this._core.registerLinkProvider(e);
	}
	registerCharacterJoiner(e) {
		return this._checkProposedApi(), this._core.registerCharacterJoiner(e);
	}
	deregisterCharacterJoiner(e) {
		this._checkProposedApi(), this._core.deregisterCharacterJoiner(e);
	}
	registerMarker(e = 0) {
		return this._verifyIntegers(e), this._core.registerMarker(e);
	}
	registerDecoration(e) {
		return this._checkProposedApi(), this._verifyPositiveIntegers(e.x ?? 0, e.width ?? 0, e.height ?? 0), this._core.registerDecoration(e);
	}
	hasSelection() {
		return this._core.hasSelection();
	}
	select(e, t, n) {
		this._verifyIntegers(e, t, n), this._core.select(e, t, n);
	}
	getSelection() {
		return this._core.getSelection();
	}
	getSelectionPosition() {
		return this._core.getSelectionPosition();
	}
	clearSelection() {
		this._core.clearSelection();
	}
	selectAll() {
		this._core.selectAll();
	}
	selectLines(e, t) {
		this._verifyIntegers(e, t), this._core.selectLines(e, t);
	}
	dispose() {
		super.dispose();
	}
	scrollLines(e) {
		this._verifyIntegers(e), this._core.scrollLines(e);
	}
	scrollPages(e) {
		this._verifyIntegers(e), this._core.scrollPages(e);
	}
	scrollToTop() {
		this._core.scrollToTop();
	}
	scrollToBottom() {
		this._core.scrollToBottom();
	}
	scrollToLine(e) {
		this._verifyIntegers(e), this._core.scrollToLine(e);
	}
	clear() {
		this._core.clear();
	}
	write(e, t) {
		this._core.write(e, t);
	}
	writeln(e, t) {
		this._core.write(e), this._core.write("\r\n", t);
	}
	paste(e) {
		this._core.paste(e);
	}
	refresh(e, t) {
		this._verifyIntegers(e, t), this._core.refresh(e, t);
	}
	reset() {
		this._core.reset();
	}
	clearTextureAtlas() {
		this._core.clearTextureAtlas();
	}
	loadAddon(e) {
		this._addonManager.loadAddon(this, e);
	}
	static get strings() {
		return {
			get promptLabel() {
				return ne.get();
			},
			set promptLabel(e) {
				ne.set(e);
			},
			get tooMuchOutput() {
				return C.get();
			},
			set tooMuchOutput(e) {
				C.set(e);
			}
		};
	}
	_verifyIntegers(...e) {
		for (As of e) if (As === 1 / 0 || isNaN(As) || As % 1 != 0) throw Error("This API only accepts integers");
	}
	_verifyPositiveIntegers(...e) {
		for (As of e) if (As && (As === 1 / 0 || isNaN(As) || As % 1 != 0 || As < 0)) throw Error("This API only accepts positive integers");
	}
}, Ms = 2, Ns = 1, Ps = class {
	activate(e) {
		this._terminal = e;
	}
	dispose() {}
	fit() {
		let e = this.proposeDimensions();
		if (!e || !this._terminal || isNaN(e.cols) || isNaN(e.rows)) return;
		let t = this._terminal._core;
		(this._terminal.rows !== e.rows || this._terminal.cols !== e.cols) && (t._renderService.clear(), this._terminal.resize(e.cols, e.rows));
	}
	proposeDimensions() {
		if (!this._terminal || !this._terminal.element || !this._terminal.element.parentElement) return;
		let e = this._terminal._core._renderService.dimensions;
		if (e.css.cell.width === 0 || e.css.cell.height === 0) return;
		let t = this._terminal.options.scrollback === 0 ? 0 : this._terminal.options.overviewRuler?.width || 14, n = window.getComputedStyle(this._terminal.element.parentElement), r = parseInt(n.getPropertyValue("height")), i = Math.max(0, parseInt(n.getPropertyValue("width"))), a = window.getComputedStyle(this._terminal.element), o = {
			top: parseInt(a.getPropertyValue("padding-top")),
			bottom: parseInt(a.getPropertyValue("padding-bottom")),
			right: parseInt(a.getPropertyValue("padding-right")),
			left: parseInt(a.getPropertyValue("padding-left"))
		}, s = o.top + o.bottom, c = o.right + o.left, l = r - s, u = i - c - t;
		return {
			cols: Math.max(Ms, Math.floor(u / e.css.cell.width)),
			rows: Math.max(Ns, Math.floor(l / e.css.cell.height))
		};
	}
}, Fs = new class {
	constructor() {
		this.listeners = [], this.unexpectedErrorHandler = function(e) {
			setTimeout(() => {
				throw e.stack ? Bs.isErrorNoTelemetry(e) ? new Bs(e.message + "\n\n" + e.stack) : /* @__PURE__ */ Error(e.message + "\n\n" + e.stack) : e;
			}, 0);
		};
	}
	addListener(e) {
		return this.listeners.push(e), () => {
			this._removeListener(e);
		};
	}
	emit(e) {
		this.listeners.forEach((t) => {
			t(e);
		});
	}
	_removeListener(e) {
		this.listeners.splice(this.listeners.indexOf(e), 1);
	}
	setUnexpectedErrorHandler(e) {
		this.unexpectedErrorHandler = e;
	}
	getUnexpectedErrorHandler() {
		return this.unexpectedErrorHandler;
	}
	onUnexpectedError(e) {
		this.unexpectedErrorHandler(e), this.emit(e);
	}
	onUnexpectedExternalError(e) {
		this.unexpectedErrorHandler(e);
	}
}();
function Is(e) {
	Rs(e) || Fs.onUnexpectedError(e);
}
var Ls = "Canceled";
function Rs(e) {
	return e instanceof zs || e instanceof Error && e.name === Ls && e.message === Ls;
}
var zs = class extends Error {
	constructor() {
		super(Ls), this.name = this.message;
	}
}, Bs = class e extends Error {
	constructor(e) {
		super(e), this.name = "CodeExpectedError";
	}
	static fromError(t) {
		if (t instanceof e) return t;
		let n = new e();
		return n.message = t.message, n.stack = t.stack, n;
	}
	static isErrorNoTelemetry(e) {
		return e.name === "CodeExpectedError";
	}
}, Vs;
((e) => {
	function t(e) {
		return e < 0;
	}
	e.isLessThan = t;
	function n(e) {
		return e <= 0;
	}
	e.isLessThanOrEqual = n;
	function r(e) {
		return e > 0;
	}
	e.isGreaterThan = r;
	function i(e) {
		return e === 0;
	}
	e.isNeitherLessOrGreaterThan = i, e.greaterThan = 1, e.lessThan = -1, e.neitherLessOrGreaterThan = 0;
})(Vs ||= {});
var Hs = class e {
	constructor(e) {
		this.iterate = e;
	}
	forEach(e) {
		this.iterate((t) => (e(t), !0));
	}
	toArray() {
		let e = [];
		return this.iterate((t) => (e.push(t), !0)), e;
	}
	filter(t) {
		return new e((e) => this.iterate((n) => !t(n) || e(n)));
	}
	map(t) {
		return new e((e) => this.iterate((n) => e(t(n))));
	}
	some(e) {
		let t = !1;
		return this.iterate((n) => (t = e(n), !t)), t;
	}
	findFirst(e) {
		let t;
		return this.iterate((n) => !e(n) || (t = n, !1)), t;
	}
	findLast(e) {
		let t;
		return this.iterate((n) => (e(n) && (t = n), !0)), t;
	}
	findLastMaxBy(e) {
		let t, n = !0;
		return this.iterate((r) => ((n || Vs.isGreaterThan(e(r, t))) && (n = !1, t = r), !0)), t;
	}
};
Hs.empty = new Hs((e) => {});
function Us(e, t) {
	let n = this, r = !1, i;
	return function() {
		if (r) return i;
		if (r = !0, t) try {
			i = e.apply(n, arguments);
		} finally {
			t();
		}
		else i = e.apply(n, arguments);
		return i;
	};
}
var Ws;
((e) => {
	function t(e) {
		return e && typeof e == "object" && typeof e[Symbol.iterator] == "function";
	}
	e.is = t;
	let n = Object.freeze([]);
	function r() {
		return n;
	}
	e.empty = r;
	function* i(e) {
		yield e;
	}
	e.single = i;
	function a(e) {
		return t(e) ? e : i(e);
	}
	e.wrap = a;
	function o(e) {
		return e || n;
	}
	e.from = o;
	function* s(e) {
		for (let t = e.length - 1; t >= 0; t--) yield e[t];
	}
	e.reverse = s;
	function c(e) {
		return !e || e[Symbol.iterator]().next().done === !0;
	}
	e.isEmpty = c;
	function l(e) {
		return e[Symbol.iterator]().next().value;
	}
	e.first = l;
	function u(e, t) {
		let n = 0;
		for (let r of e) if (t(r, n++)) return !0;
		return !1;
	}
	e.some = u;
	function d(e, t) {
		for (let n of e) if (t(n)) return n;
	}
	e.find = d;
	function* f(e, t) {
		for (let n of e) t(n) && (yield n);
	}
	e.filter = f;
	function* p(e, t) {
		let n = 0;
		for (let r of e) yield t(r, n++);
	}
	e.map = p;
	function* m(e, t) {
		let n = 0;
		for (let r of e) yield* t(r, n++);
	}
	e.flatMap = m;
	function* h(...e) {
		for (let t of e) yield* t;
	}
	e.concat = h;
	function g(e, t, n) {
		let r = n;
		for (let n of e) r = t(r, n);
		return r;
	}
	e.reduce = g;
	function* _(e, t, n = e.length) {
		for (t < 0 && (t += e.length), n < 0 ? n += e.length : n > e.length && (n = e.length); t < n; t++) yield e[t];
	}
	e.slice = _;
	function v(t, n = Infinity) {
		let r = [];
		if (n === 0) return [r, t];
		let i = t[Symbol.iterator]();
		for (let t = 0; t < n; t++) {
			let t = i.next();
			if (t.done) return [r, e.empty()];
			r.push(t.value);
		}
		return [r, { [Symbol.iterator]() {
			return i;
		} }];
	}
	e.consume = v;
	async function y(e) {
		let t = [];
		for await (let n of e) t.push(n);
		return Promise.resolve(t);
	}
	e.asyncToArray = y;
})(Ws ||= {});
var Gs = null;
function Ks(e) {
	return Gs?.trackDisposable(e), e;
}
function qs(e) {
	Gs?.markAsDisposed(e);
}
function Js(e, t) {
	Gs?.setParent(e, t);
}
function Ys(e) {
	if (Ws.is(e)) {
		let t = [];
		for (let n of e) if (n) try {
			n.dispose();
		} catch (e) {
			t.push(e);
		}
		if (t.length === 1) throw t[0];
		if (t.length > 1) throw AggregateError(t, "Encountered errors while disposing of store");
		return Array.isArray(e) ? [] : e;
	}
	if (e) return e.dispose(), e;
}
function Xs(...e) {
	return Zs(() => Ys(e));
}
function Zs(e) {
	let t = Ks({ dispose: Us(() => {
		qs(t), e();
	}) });
	return t;
}
var Qs = class e {
	constructor() {
		this._toDispose = /* @__PURE__ */ new Set(), this._isDisposed = !1, Ks(this);
	}
	dispose() {
		this._isDisposed || (qs(this), this._isDisposed = !0, this.clear());
	}
	get isDisposed() {
		return this._isDisposed;
	}
	clear() {
		if (this._toDispose.size !== 0) try {
			Ys(this._toDispose);
		} finally {
			this._toDispose.clear();
		}
	}
	add(t) {
		if (!t) return t;
		if (t === this) throw Error("Cannot register a disposable on itself!");
		return Js(t, this), this._isDisposed ? e.DISABLE_DISPOSED_WARNING || console.warn((/* @__PURE__ */ Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!")).stack) : this._toDispose.add(t), t;
	}
	delete(e) {
		if (e) {
			if (e === this) throw Error("Cannot dispose a disposable on itself!");
			this._toDispose.delete(e), e.dispose();
		}
	}
	deleteAndLeak(e) {
		e && this._toDispose.has(e) && (this._toDispose.delete(e), Js(e, null));
	}
};
Qs.DISABLE_DISPOSED_WARNING = !1;
var $s = Qs, ec = class {
	constructor() {
		this._store = new $s(), Ks(this), Js(this._store, this);
	}
	dispose() {
		qs(this), this._store.dispose();
	}
	_register(e) {
		if (e === this) throw Error("Cannot register a disposable on itself!");
		return this._store.add(e);
	}
};
ec.None = Object.freeze({ dispose() {} });
var tc = class {
	constructor() {
		this._isDisposed = !1, Ks(this);
	}
	get value() {
		return this._isDisposed ? void 0 : this._value;
	}
	set value(e) {
		this._isDisposed || e === this._value || (this._value?.dispose(), e && Js(e, this), this._value = e);
	}
	clear() {
		this.value = void 0;
	}
	dispose() {
		this._isDisposed = !0, qs(this), this._value?.dispose(), this._value = void 0;
	}
	clearAndLeak() {
		let e = this._value;
		return this._value = void 0, e && Js(e, null), e;
	}
}, nc = class e {
	constructor(t) {
		this.element = t, this.next = e.Undefined, this.prev = e.Undefined;
	}
};
nc.Undefined = new nc(void 0);
var rc = globalThis.performance && typeof globalThis.performance.now == "function", ic = class e {
	static create(t) {
		return new e(t);
	}
	constructor(e) {
		this._now = rc && e === !1 ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
	}
	stop() {
		this._stopTime = this._now();
	}
	reset() {
		this._startTime = this._now(), this._stopTime = -1;
	}
	elapsed() {
		return this._stopTime === -1 ? this._now() - this._startTime : this._stopTime - this._startTime;
	}
}, ac;
((e) => {
	e.None = () => ec.None;
	function t(e, t) {
		return d(e, () => {}, 0, void 0, !0, void 0, t);
	}
	e.defer = t;
	function n(e) {
		return (t, n = null, r) => {
			let i = !1, a;
			return a = e((e) => {
				if (!i) return a ? a.dispose() : i = !0, t.call(n, e);
			}, null, r), i && a.dispose(), a;
		};
	}
	e.once = n;
	function r(e, t, n) {
		return l((n, r = null, i) => e((e) => n.call(r, t(e)), null, i), n);
	}
	e.map = r;
	function i(e, t, n) {
		return l((n, r = null, i) => e((e) => {
			t(e), n.call(r, e);
		}, null, i), n);
	}
	e.forEach = i;
	function a(e, t, n) {
		return l((n, r = null, i) => e((e) => t(e) && n.call(r, e), null, i), n);
	}
	e.filter = a;
	function o(e) {
		return e;
	}
	e.signal = o;
	function s(...e) {
		return (t, n = null, r) => u(Xs(...e.map((e) => e((e) => t.call(n, e)))), r);
	}
	e.any = s;
	function c(e, t, n, i) {
		let a = n;
		return r(e, (e) => (a = t(a, e), a), i);
	}
	e.reduce = c;
	function l(e, t) {
		let n, r = new _c({
			onWillAddFirstListener() {
				n = e(r.fire, r);
			},
			onDidRemoveLastListener() {
				n?.dispose();
			}
		});
		return t?.add(r), r.event;
	}
	function u(e, t) {
		return t instanceof Array ? t.push(e) : t && t.add(e), e;
	}
	function d(e, t, n = 100, r = !1, i = !1, a, o) {
		let s, c, l, u = 0, d, f = new _c({
			leakWarningThreshold: a,
			onWillAddFirstListener() {
				s = e((e) => {
					u++, c = t(c, e), r && !l && (f.fire(c), c = void 0), d = () => {
						let e = c;
						c = void 0, l = void 0, (!r || u > 1) && f.fire(e), u = 0;
					}, typeof n == "number" ? (clearTimeout(l), l = setTimeout(d, n)) : l === void 0 && (l = 0, queueMicrotask(d));
				});
			},
			onWillRemoveListener() {
				i && u > 0 && d?.();
			},
			onDidRemoveLastListener() {
				d = void 0, s.dispose();
			}
		});
		return o?.add(f), f.event;
	}
	e.debounce = d;
	function f(t, n = 0, r) {
		return e.debounce(t, (e, t) => e ? (e.push(t), e) : [t], n, void 0, !0, void 0, r);
	}
	e.accumulate = f;
	function p(e, t = (e, t) => e === t, n) {
		let r = !0, i;
		return a(e, (e) => {
			let n = r || !t(e, i);
			return r = !1, i = e, n;
		}, n);
	}
	e.latch = p;
	function m(t, n, r) {
		return [e.filter(t, n, r), e.filter(t, (e) => !n(e), r)];
	}
	e.split = m;
	function h(e, t = !1, n = [], r) {
		let i = n.slice(), a = e((e) => {
			i ? i.push(e) : s.fire(e);
		});
		r && r.add(a);
		let o = () => {
			i?.forEach((e) => s.fire(e)), i = null;
		}, s = new _c({
			onWillAddFirstListener() {
				a || (a = e((e) => s.fire(e)), r && r.add(a));
			},
			onDidAddFirstListener() {
				i && (t ? setTimeout(o) : o());
			},
			onDidRemoveLastListener() {
				a && a.dispose(), a = null;
			}
		});
		return r && r.add(s), s.event;
	}
	e.buffer = h;
	function g(e, t) {
		return (n, r, i) => {
			let a = t(new v());
			return e(function(e) {
				let t = a.evaluate(e);
				t !== _ && n.call(r, t);
			}, void 0, i);
		};
	}
	e.chain = g;
	let _ = Symbol("HaltChainable");
	class v {
		constructor() {
			this.steps = [];
		}
		map(e) {
			return this.steps.push(e), this;
		}
		forEach(e) {
			return this.steps.push((t) => (e(t), t)), this;
		}
		filter(e) {
			return this.steps.push((t) => e(t) ? t : _), this;
		}
		reduce(e, t) {
			let n = t;
			return this.steps.push((t) => (n = e(n, t), n)), this;
		}
		latch(e = (e, t) => e === t) {
			let t = !0, n;
			return this.steps.push((r) => {
				let i = t || !e(r, n);
				return t = !1, n = r, i ? r : _;
			}), this;
		}
		evaluate(e) {
			for (let t of this.steps) if (e = t(e), e === _) break;
			return e;
		}
	}
	function y(e, t, n = (e) => e) {
		let r = (...e) => i.fire(n(...e)), i = new _c({
			onWillAddFirstListener: () => e.on(t, r),
			onDidRemoveLastListener: () => e.removeListener(t, r)
		});
		return i.event;
	}
	e.fromNodeEventEmitter = y;
	function ee(e, t, n = (e) => e) {
		let r = (...e) => i.fire(n(...e)), i = new _c({
			onWillAddFirstListener: () => e.addEventListener(t, r),
			onDidRemoveLastListener: () => e.removeEventListener(t, r)
		});
		return i.event;
	}
	e.fromDOMEventEmitter = ee;
	function b(e) {
		return new Promise((t) => n(e)(t));
	}
	e.toPromise = b;
	function x(e) {
		let t = new _c();
		return e.then((e) => {
			t.fire(e);
		}, () => {
			t.fire(void 0);
		}).finally(() => {
			t.dispose();
		}), t.event;
	}
	e.fromPromise = x;
	function S(e, t) {
		return e((e) => t.fire(e));
	}
	e.forward = S;
	function te(e, t, n) {
		return t(n), e((e) => t(e));
	}
	e.runAndSubscribe = te;
	class ne {
		constructor(e, t) {
			this._observable = e, this._counter = 0, this._hasChanged = !1;
			let n = {
				onWillAddFirstListener: () => {
					e.addObserver(this);
				},
				onDidRemoveLastListener: () => {
					e.removeObserver(this);
				}
			};
			this.emitter = new _c(n), t && t.add(this.emitter);
		}
		beginUpdate(e) {
			this._counter++;
		}
		handlePossibleChange(e) {}
		handleChange(e, t) {
			this._hasChanged = !0;
		}
		endUpdate(e) {
			this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = !1, this.emitter.fire(this._observable.get())));
		}
	}
	function re(e, t) {
		return new ne(e, t).emitter.event;
	}
	e.fromObservable = re;
	function C(e) {
		return (t, n, r) => {
			let i = 0, a = !1, o = {
				beginUpdate() {
					i++;
				},
				endUpdate() {
					i--, i === 0 && (e.reportChanges(), a && (a = !1, t.call(n)));
				},
				handlePossibleChange() {},
				handleChange() {
					a = !0;
				}
			};
			e.addObserver(o), e.reportChanges();
			let s = { dispose() {
				e.removeObserver(o);
			} };
			return r instanceof $s ? r.add(s) : Array.isArray(r) && r.push(s), s;
		};
	}
	e.fromObservableLight = C;
})(ac ||= {});
var oc = class e {
	constructor(t) {
		this.listenerCount = 0, this.invocationCount = 0, this.elapsedOverall = 0, this.durations = [], this.name = `${t}_${e._idPool++}`, e.all.add(this);
	}
	start(e) {
		this._stopWatch = new ic(), this.listenerCount = e;
	}
	stop() {
		if (this._stopWatch) {
			let e = this._stopWatch.elapsed();
			this.durations.push(e), this.elapsedOverall += e, this.invocationCount += 1, this._stopWatch = void 0;
		}
	}
};
oc.all = /* @__PURE__ */ new Set(), oc._idPool = 0;
var sc = oc, cc = -1, lc = class e {
	constructor(t, n, r = (e._idPool++).toString(16).padStart(3, "0")) {
		this._errorHandler = t, this.threshold = n, this.name = r, this._warnCountdown = 0;
	}
	dispose() {
		this._stacks?.clear();
	}
	check(e, t) {
		let n = this.threshold;
		if (n <= 0 || t < n) return;
		this._stacks ||= /* @__PURE__ */ new Map();
		let r = this._stacks.get(e.value) || 0;
		if (this._stacks.set(e.value, r + 1), --this._warnCountdown, this._warnCountdown <= 0) {
			this._warnCountdown = n * .5;
			let [e, r] = this.getMostFrequentStack(), i = `[${this.name}] potential listener LEAK detected, having ${t} listeners already. MOST frequent listener (${r}):`;
			console.warn(i), console.warn(e);
			let a = new fc(i, e);
			this._errorHandler(a);
		}
		return () => {
			let t = this._stacks.get(e.value) || 0;
			this._stacks.set(e.value, t - 1);
		};
	}
	getMostFrequentStack() {
		if (!this._stacks) return;
		let e, t = 0;
		for (let [n, r] of this._stacks) (!e || t < r) && (e = [n, r], t = r);
		return e;
	}
};
lc._idPool = 1;
var uc = lc, dc = class e {
	constructor(e) {
		this.value = e;
	}
	static create() {
		return new e((/* @__PURE__ */ Error()).stack ?? "");
	}
	print() {
		console.warn(this.value.split("\n").slice(2).join("\n"));
	}
}, fc = class extends Error {
	constructor(e, t) {
		super(e), this.name = "ListenerLeakError", this.stack = t;
	}
}, pc = class extends Error {
	constructor(e, t) {
		super(e), this.name = "ListenerRefusalError", this.stack = t;
	}
}, mc = 0, hc = class {
	constructor(e) {
		this.value = e, this.id = mc++;
	}
}, gc = 2, _c = class {
	constructor(e) {
		this._size = 0, this._options = e, this._leakageMon = cc > 0 || this._options?.leakWarningThreshold ? new uc(e?.onListenerError ?? Is, this._options?.leakWarningThreshold ?? cc) : void 0, this._perfMon = this._options?._profName ? new sc(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
	}
	dispose() {
		this._disposed || (this._disposed = !0, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners && (this._listeners = void 0, this._size = 0), this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose());
	}
	get event() {
		return this._event ??= (e, t, n) => {
			if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
				let e = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
				console.warn(e);
				let t = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], n = new pc(`${e}. HINT: Stack shows most frequent listener (${t[1]}-times)`, t[0]);
				return (this._options?.onListenerError || Is)(n), ec.None;
			}
			if (this._disposed) return ec.None;
			t && (e = e.bind(t));
			let r = new hc(e), i;
			this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * .2) && (r.stack = dc.create(), i = this._leakageMon.check(r.stack, this._size + 1)), this._listeners ? this._listeners instanceof hc ? (this._deliveryQueue ??= new vc(), this._listeners = [this._listeners, r]) : this._listeners.push(r) : (this._options?.onWillAddFirstListener?.(this), this._listeners = r, this._options?.onDidAddFirstListener?.(this)), this._size++;
			let a = Zs(() => {
				i?.(), this._removeListener(r);
			});
			return n instanceof $s ? n.add(a) : Array.isArray(n) && n.push(a), a;
		}, this._event;
	}
	_removeListener(e) {
		if (this._options?.onWillRemoveListener?.(this), !this._listeners) return;
		if (this._size === 1) {
			this._listeners = void 0, this._options?.onDidRemoveLastListener?.(this), this._size = 0;
			return;
		}
		let t = this._listeners, n = t.indexOf(e);
		if (n === -1) throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), /* @__PURE__ */ Error("Attempted to dispose unknown listener");
		this._size--, t[n] = void 0;
		let r = this._deliveryQueue.current === this;
		if (this._size * gc <= t.length) {
			let e = 0;
			for (let n = 0; n < t.length; n++) t[n] ? t[e++] = t[n] : r && (this._deliveryQueue.end--, e < this._deliveryQueue.i && this._deliveryQueue.i--);
			t.length = e;
		}
	}
	_deliver(e, t) {
		if (!e) return;
		let n = this._options?.onListenerError || Is;
		if (!n) e.value(t);
		else try {
			e.value(t);
		} catch (e) {
			n(e);
		}
	}
	_deliverQueue(e) {
		let t = e.current._listeners;
		for (; e.i < e.end;) this._deliver(t[e.i++], e.value);
		e.reset();
	}
	fire(e) {
		if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) {
			if (this._listeners instanceof hc) this._deliver(this._listeners, e);
			else {
				let t = this._deliveryQueue;
				t.enqueue(this, e, this._listeners.length), this._deliverQueue(t);
			}
		}
		this._perfMon?.stop();
	}
	hasListeners() {
		return this._size > 0;
	}
}, vc = class {
	constructor() {
		this.i = -1, this.end = 0;
	}
	enqueue(e, t, n) {
		this.i = 0, this.end = n, this.current = e, this.value = t;
	}
	reset() {
		this.i = this.end, this.current = void 0, this.value = void 0;
	}
}, yc = Object.freeze(function(e, t) {
	let n = setTimeout(e.bind(t), 0);
	return { dispose() {
		clearTimeout(n);
	} };
}), bc;
((e) => {
	function t(t) {
		return t === e.None || t === e.Cancelled || t instanceof xc ? !0 : !t || typeof t != "object" ? !1 : typeof t.isCancellationRequested == "boolean" && typeof t.onCancellationRequested == "function";
	}
	e.isCancellationToken = t, e.None = Object.freeze({
		isCancellationRequested: !1,
		onCancellationRequested: ac.None
	}), e.Cancelled = Object.freeze({
		isCancellationRequested: !0,
		onCancellationRequested: yc
	});
})(bc ||= {});
var xc = class {
	constructor() {
		this._isCancelled = !1, this._emitter = null;
	}
	cancel() {
		this._isCancelled || (this._isCancelled = !0, this._emitter && (this._emitter.fire(void 0), this.dispose()));
	}
	get isCancellationRequested() {
		return this._isCancelled;
	}
	get onCancellationRequested() {
		return this._isCancelled ? yc : (this._emitter ||= new _c(), this._emitter.event);
	}
	dispose() {
		this._emitter &&= (this._emitter.dispose(), null);
	}
}, Sc = "en", Cc = !1, wc = !1, Tc = Sc, Ec, Dc = globalThis, Oc;
typeof Dc.vscode < "u" && typeof Dc.vscode.process < "u" ? Oc = Dc.vscode.process : typeof process < "u" && typeof process?.versions?.node == "string" && (Oc = process);
var kc = typeof Oc?.versions?.electron == "string" && Oc?.type === "renderer";
if (typeof Oc == "object") {
	Oc.platform, Oc.platform, Cc = Oc.platform === "linux", Cc && Oc.env.SNAP && Oc.env.SNAP_REVISION, Oc.env.CI || Oc.env.BUILD_ARTIFACTSTAGINGDIRECTORY, Tc = Sc;
	let e = Oc.env.VSCODE_NLS_CONFIG;
	if (e) try {
		let t = JSON.parse(e);
		t.userLocale, t.osLocale, Tc = t.resolvedLanguage || Sc, t.languagePack?.translationsConfigFile;
	} catch {}
} else typeof navigator == "object" && !kc ? (Ec = navigator.userAgent, Ec.indexOf("Windows"), Ec.indexOf("Macintosh"), (Ec.indexOf("Macintosh") >= 0 || Ec.indexOf("iPad") >= 0 || Ec.indexOf("iPhone") >= 0) && navigator.maxTouchPoints && navigator.maxTouchPoints, Cc = Ec.indexOf("Linux") >= 0, Ec?.indexOf("Mobi"), wc = !0, Tc = globalThis._VSCODE_NLS_LANGUAGE || Sc, navigator.language.toLowerCase()) : console.error("Unable to resolve platform.");
wc && typeof Dc.importScripts == "function" && Dc.origin;
var Ac = Ec, jc = Tc, Mc;
((e) => {
	function t() {
		return jc;
	}
	e.value = t;
	function n() {
		return jc.length === 2 ? jc === "en" : jc.length >= 3 && jc[0] === "e" && jc[1] === "n" && jc[2] === "-";
	}
	e.isDefaultVariant = n;
	function r() {
		return jc === "en";
	}
	e.isDefault = r;
})(Mc ||= {});
var Nc = typeof Dc.postMessage == "function" && !Dc.importScripts;
(() => {
	if (Nc) {
		let e = [];
		Dc.addEventListener("message", (t) => {
			if (t.data && t.data.vscodeScheduleAsyncWork) for (let n = 0, r = e.length; n < r; n++) {
				let r = e[n];
				if (r.id === t.data.vscodeScheduleAsyncWork) {
					e.splice(n, 1), r.callback();
					return;
				}
			}
		});
		let t = 0;
		return (n) => {
			let r = ++t;
			e.push({
				id: r,
				callback: n
			}), Dc.postMessage({ vscodeScheduleAsyncWork: r }, "*");
		};
	}
	return (e) => setTimeout(e);
})();
var Pc = !!(Ac && Ac.indexOf("Chrome") >= 0);
Ac && Ac.indexOf("Firefox"), !Pc && Ac && Ac.indexOf("Safari"), Ac && Ac.indexOf("Edg/"), Ac && Ac.indexOf("Android");
function Fc(e, t = 0, n) {
	let r = setTimeout(() => {
		e(), n && i.dispose();
	}, t), i = Zs(() => {
		clearTimeout(r), n?.deleteAndLeak(i);
	});
	return n?.add(i), i;
}
(function() {
	typeof globalThis.requestIdleCallback != "function" || globalThis.cancelIdleCallback;
})();
var Ic;
((e) => {
	async function t(e) {
		let t, n = await Promise.all(e.map((e) => e.then((e) => e, (e) => {
			t ||= e;
		})));
		if (typeof t < "u") throw t;
		return n;
	}
	e.settled = t;
	function n(e) {
		return new Promise(async (t, n) => {
			try {
				await e(t, n);
			} catch (e) {
				n(e);
			}
		});
	}
	e.withAsyncBody = n;
})(Ic ||= {});
var Lc = class e {
	static fromArray(t) {
		return new e((e) => {
			e.emitMany(t);
		});
	}
	static fromPromise(t) {
		return new e(async (e) => {
			e.emitMany(await t);
		});
	}
	static fromPromises(t) {
		return new e(async (e) => {
			await Promise.all(t.map(async (t) => e.emitOne(await t)));
		});
	}
	static merge(t) {
		return new e(async (e) => {
			await Promise.all(t.map(async (t) => {
				for await (let n of t) e.emitOne(n);
			}));
		});
	}
	constructor(e, t) {
		this._state = 0, this._results = [], this._error = null, this._onReturn = t, this._onStateChanged = new _c(), queueMicrotask(async () => {
			let t = {
				emitOne: (e) => this.emitOne(e),
				emitMany: (e) => this.emitMany(e),
				reject: (e) => this.reject(e)
			};
			try {
				await Promise.resolve(e(t)), this.resolve();
			} catch (e) {
				this.reject(e);
			} finally {
				t.emitOne = void 0, t.emitMany = void 0, t.reject = void 0;
			}
		});
	}
	[Symbol.asyncIterator]() {
		let e = 0;
		return {
			next: async () => {
				do {
					if (this._state === 2) throw this._error;
					if (e < this._results.length) return {
						done: !1,
						value: this._results[e++]
					};
					if (this._state === 1) return {
						done: !0,
						value: void 0
					};
					await ac.toPromise(this._onStateChanged.event);
				} while (1);
			},
			return: async () => (this._onReturn?.(), {
				done: !0,
				value: void 0
			})
		};
	}
	static map(t, n) {
		return new e(async (e) => {
			for await (let r of t) e.emitOne(n(r));
		});
	}
	map(t) {
		return e.map(this, t);
	}
	static filter(t, n) {
		return new e(async (e) => {
			for await (let r of t) n(r) && e.emitOne(r);
		});
	}
	filter(t) {
		return e.filter(this, t);
	}
	static coalesce(t) {
		return e.filter(t, (e) => !!e);
	}
	coalesce() {
		return e.coalesce(this);
	}
	static async toPromise(e) {
		let t = [];
		for await (let n of e) t.push(n);
		return t;
	}
	toPromise() {
		return e.toPromise(this);
	}
	emitOne(e) {
		this._state === 0 && (this._results.push(e), this._onStateChanged.fire());
	}
	emitMany(e) {
		this._state === 0 && (this._results = this._results.concat(e), this._onStateChanged.fire());
	}
	resolve() {
		this._state === 0 && (this._state = 1, this._onStateChanged.fire());
	}
	reject(e) {
		this._state === 0 && (this._state = 2, this._error = e, this._onStateChanged.fire());
	}
};
Lc.EMPTY = Lc.fromArray([]);
var Rc = class extends ec {
	constructor(e) {
		super(), this._terminal = e, this._linesCacheTimeout = this._register(new tc()), this._linesCacheDisposables = this._register(new tc()), this._register(Zs(() => this._destroyLinesCache()));
	}
	initLinesCache() {
		this._linesCache || (this._linesCache = Array(this._terminal.buffer.active.length), this._linesCacheDisposables.value = Xs(this._terminal.onLineFeed(() => this._destroyLinesCache()), this._terminal.onCursorMove(() => this._destroyLinesCache()), this._terminal.onResize(() => this._destroyLinesCache()))), this._linesCacheTimeout.value = Fc(() => this._destroyLinesCache(), 15e3);
	}
	_destroyLinesCache() {
		this._linesCache = void 0, this._linesCacheDisposables.clear(), this._linesCacheTimeout.clear();
	}
	getLineFromCache(e) {
		return this._linesCache?.[e];
	}
	setLineInCache(e, t) {
		this._linesCache && (this._linesCache[e] = t);
	}
	translateBufferLineToStringWithWrap(e, t) {
		let n = [], r = [0], i = this._terminal.buffer.active.getLine(e);
		for (; i;) {
			let a = this._terminal.buffer.active.getLine(e + 1), o = a ? a.isWrapped : !1, s = i.translateToString(!o && t);
			if (o && a) {
				let e = i.getCell(i.length - 1);
				e && e.getCode() === 0 && e.getWidth() === 1 && a.getCell(0)?.getWidth() === 2 && (s = s.slice(0, -1));
			}
			if (n.push(s), o) r.push(r[r.length - 1] + s.length);
			else break;
			e++, i = a;
		}
		return [n.join(""), r];
	}
}, zc = class {
	get cachedSearchTerm() {
		return this._cachedSearchTerm;
	}
	set cachedSearchTerm(e) {
		this._cachedSearchTerm = e;
	}
	get lastSearchOptions() {
		return this._lastSearchOptions;
	}
	set lastSearchOptions(e) {
		this._lastSearchOptions = e;
	}
	isValidSearchTerm(e) {
		return !!(e && e.length > 0);
	}
	didOptionsChange(e) {
		return this._lastSearchOptions ? e ? this._lastSearchOptions.caseSensitive !== e.caseSensitive || this._lastSearchOptions.regex !== e.regex || this._lastSearchOptions.wholeWord !== e.wholeWord : !1 : !0;
	}
	shouldUpdateHighlighting(e, t) {
		return t?.decorations ? this._cachedSearchTerm === void 0 || e !== this._cachedSearchTerm || this.didOptionsChange(t) : !1;
	}
	clearCachedTerm() {
		this._cachedSearchTerm = void 0;
	}
	reset() {
		this._cachedSearchTerm = void 0, this._lastSearchOptions = void 0;
	}
}, Bc = class {
	constructor(e, t) {
		this._terminal = e, this._lineCache = t;
	}
	find(e, t, n, r) {
		if (!e || e.length === 0) {
			this._terminal.clearSelection();
			return;
		}
		if (n > this._terminal.cols) throw Error(`Invalid col: ${n} to search in terminal of ${this._terminal.cols} cols`);
		this._lineCache.initLinesCache();
		let i = {
			startRow: t,
			startCol: n
		}, a = this._findInLine(e, i, r);
		if (!a) for (let n = t + 1; n < this._terminal.buffer.active.baseY + this._terminal.rows && (i.startRow = n, i.startCol = 0, a = this._findInLine(e, i, r), !a); n++);
		return a;
	}
	findNextWithSelection(e, t, n) {
		if (!e || e.length === 0) {
			this._terminal.clearSelection();
			return;
		}
		let r = this._terminal.getSelectionPosition();
		this._terminal.clearSelection();
		let i = 0, a = 0;
		r && (n === e ? (i = r.end.x, a = r.end.y) : (i = r.start.x, a = r.start.y)), this._lineCache.initLinesCache();
		let o = {
			startRow: a,
			startCol: i
		}, s = this._findInLine(e, o, t);
		if (!s) for (let n = a + 1; n < this._terminal.buffer.active.baseY + this._terminal.rows && (o.startRow = n, o.startCol = 0, s = this._findInLine(e, o, t), !s); n++);
		if (!s && a !== 0) for (let n = 0; n < a && (o.startRow = n, o.startCol = 0, s = this._findInLine(e, o, t), !s); n++);
		return !s && r && (o.startRow = r.start.y, o.startCol = 0, s = this._findInLine(e, o, t)), s;
	}
	findPreviousWithSelection(e, t, n) {
		if (!e || e.length === 0) {
			this._terminal.clearSelection();
			return;
		}
		let r = this._terminal.getSelectionPosition();
		this._terminal.clearSelection();
		let i = this._terminal.buffer.active.baseY + this._terminal.rows - 1, a = this._terminal.cols;
		this._lineCache.initLinesCache();
		let o = {
			startRow: i,
			startCol: a
		}, s;
		if (r && (o.startRow = i = r.start.y, o.startCol = a = r.start.x, n !== e && (s = this._findInLine(e, o, t, !1), s || (o.startRow = i = r.end.y, o.startCol = a = r.end.x))), s ||= this._findInLine(e, o, t, !0), !s) {
			o.startCol = Math.max(o.startCol, this._terminal.cols);
			for (let n = i - 1; n >= 0 && (o.startRow = n, s = this._findInLine(e, o, t, !0), !s); n--);
		}
		if (!s && i !== this._terminal.buffer.active.baseY + this._terminal.rows - 1) for (let n = this._terminal.buffer.active.baseY + this._terminal.rows - 1; n >= i && (o.startRow = n, s = this._findInLine(e, o, t, !0), !s); n--);
		return s;
	}
	_isWholeWord(e, t, n) {
		return (e === 0 || " ~!@#$%^&*()+`-=[]{}|\\;:\"',./<>?".includes(t[e - 1])) && (e + n.length === t.length || " ~!@#$%^&*()+`-=[]{}|\\;:\"',./<>?".includes(t[e + n.length]));
	}
	_findInLine(e, t, n = {}, r = !1) {
		let i = t.startRow, a = t.startCol;
		if (this._terminal.buffer.active.getLine(i)?.isWrapped) {
			if (r) {
				t.startCol += this._terminal.cols;
				return;
			}
			return t.startRow--, t.startCol += this._terminal.cols, this._findInLine(e, t, n);
		}
		let o = this._lineCache.getLineFromCache(i);
		o || (o = this._lineCache.translateBufferLineToStringWithWrap(i, !0), this._lineCache.setLineInCache(i, o));
		let [s, c] = o, l = this._bufferColsToStringOffset(i, a), u = e, d = s;
		n.regex || (u = n.caseSensitive ? e : e.toLowerCase(), d = n.caseSensitive ? s : s.toLowerCase());
		let f = -1;
		if (n.regex) {
			let t = RegExp(u, n.caseSensitive ? "g" : "gi"), i;
			if (r) for (; i = t.exec(d.slice(0, l));) f = t.lastIndex - i[0].length, e = i[0], t.lastIndex -= e.length - 1;
			else i = t.exec(d.slice(l)), i && i[0].length > 0 && (f = l + (t.lastIndex - i[0].length), e = i[0]);
		} else r ? l - u.length >= 0 && (f = d.lastIndexOf(u, l - u.length)) : f = d.indexOf(u, l);
		if (f >= 0) {
			if (n.wholeWord && !this._isWholeWord(f, d, e)) return;
			let t = 0;
			for (; t < c.length - 1 && f >= c[t + 1];) t++;
			let r = t;
			for (; r < c.length - 1 && f + e.length >= c[r + 1];) r++;
			let a = f - c[t], o = f + e.length - c[r], s = this._stringLengthToBufferSize(i + t, a), l = this._stringLengthToBufferSize(i + r, o) - s + this._terminal.cols * (r - t);
			return {
				term: e,
				col: s,
				row: i + t,
				size: l
			};
		}
	}
	_stringLengthToBufferSize(e, t) {
		let n = this._terminal.buffer.active.getLine(e);
		if (!n) return 0;
		for (let e = 0; e < t; e++) {
			let r = n.getCell(e);
			if (!r) break;
			let i = r.getChars();
			i.length > 1 && (t -= i.length - 1);
			let a = n.getCell(e + 1);
			a && a.getWidth() === 0 && t++;
		}
		return t;
	}
	_bufferColsToStringOffset(e, t) {
		let n = e, r = 0, i = this._terminal.buffer.active.getLine(n);
		for (; t > 0 && i;) {
			for (let e = 0; e < t && e < this._terminal.cols; e++) {
				let t = i.getCell(e);
				if (!t) break;
				t.getWidth() && (r += t.getCode() === 0 ? 1 : t.getChars().length);
			}
			if (n++, i = this._terminal.buffer.active.getLine(n), i && !i.isWrapped) break;
			t -= this._terminal.cols;
		}
		return r;
	}
}, Vc = class extends ec {
	constructor(e) {
		super(), this._terminal = e, this._highlightDecorations = [], this._highlightedLines = /* @__PURE__ */ new Set(), this._register(Zs(() => this.clearHighlightDecorations()));
	}
	createHighlightDecorations(e, t) {
		this.clearHighlightDecorations();
		for (let n of e) {
			let e = this._createResultDecorations(n, t, !1);
			if (e) for (let t of e) this._storeDecoration(t, n);
		}
	}
	createActiveDecoration(e, t) {
		let n = this._createResultDecorations(e, t, !0);
		if (n) return {
			decorations: n,
			match: e,
			dispose() {
				Ys(n);
			}
		};
	}
	clearHighlightDecorations() {
		Ys(this._highlightDecorations), this._highlightDecorations = [], this._highlightedLines.clear();
	}
	_storeDecoration(e, t) {
		this._highlightedLines.add(e.marker.line), this._highlightDecorations.push({
			decoration: e,
			match: t,
			dispose() {
				e.dispose();
			}
		});
	}
	_applyStyles(e, t, n) {
		e.classList.contains("xterm-find-result-decoration") || (e.classList.add("xterm-find-result-decoration"), t && (e.style.outline = `1px solid ${t}`)), n && e.classList.add("xterm-find-active-result-decoration");
	}
	_createResultDecorations(e, t, n) {
		let r = [], i = e.col, a = e.size, o = -this._terminal.buffer.active.baseY - this._terminal.buffer.active.cursorY + e.row;
		for (; a > 0;) {
			let e = Math.min(this._terminal.cols - i, a);
			r.push([
				o,
				i,
				e
			]), i = 0, a -= e, o++;
		}
		let s = [];
		for (let e of r) {
			let r = this._terminal.registerMarker(e[0]), i = this._terminal.registerDecoration({
				marker: r,
				x: e[1],
				width: e[2],
				backgroundColor: n ? t.activeMatchBackground : t.matchBackground,
				overviewRulerOptions: this._highlightedLines.has(r.line) ? void 0 : {
					color: n ? t.activeMatchColorOverviewRuler : t.matchOverviewRuler,
					position: "center"
				}
			});
			if (i) {
				let e = [];
				e.push(r), e.push(i.onRender((e) => this._applyStyles(e, n ? t.activeMatchBorder : t.matchBorder, !1))), e.push(i.onDispose(() => Ys(e))), s.push(i);
			}
		}
		return s.length === 0 ? void 0 : s;
	}
}, Hc = class extends ec {
	constructor() {
		super(...arguments), this._searchResults = [], this._onDidChangeResults = this._register(new _c());
	}
	get onDidChangeResults() {
		return this._onDidChangeResults.event;
	}
	get searchResults() {
		return this._searchResults;
	}
	get selectedDecoration() {
		return this._selectedDecoration;
	}
	set selectedDecoration(e) {
		this._selectedDecoration = e;
	}
	updateResults(e, t) {
		this._searchResults = e.slice(0, t);
	}
	clearResults() {
		this._searchResults = [];
	}
	clearSelectedDecoration() {
		this._selectedDecoration &&= (this._selectedDecoration.dispose(), void 0);
	}
	findResultIndex(e) {
		for (let t = 0; t < this._searchResults.length; t++) {
			let n = this._searchResults[t];
			if (n.row === e.row && n.col === e.col && n.size === e.size) return t;
		}
		return -1;
	}
	fireResultsChanged(e) {
		if (!e) return;
		let t = -1;
		this._selectedDecoration && (t = this.findResultIndex(this._selectedDecoration.match)), this._onDidChangeResults.fire({
			resultIndex: t,
			resultCount: this._searchResults.length
		});
	}
	reset() {
		this.clearSelectedDecoration(), this.clearResults();
	}
}, Uc = class extends ec {
	constructor(e) {
		super(), this._highlightTimeout = this._register(new tc()), this._lineCache = this._register(new tc()), this._state = new zc(), this._resultTracker = this._register(new Hc()), this._highlightLimit = e?.highlightLimit ?? 1e3;
	}
	get onDidChangeResults() {
		return this._resultTracker.onDidChangeResults;
	}
	activate(e) {
		this._terminal = e, this._lineCache.value = new Rc(e), this._engine = new Bc(e, this._lineCache.value), this._decorationManager = new Vc(e), this._register(this._terminal.onWriteParsed(() => this._updateMatches())), this._register(this._terminal.onResize(() => this._updateMatches())), this._register(Zs(() => this.clearDecorations()));
	}
	_updateMatches() {
		this._highlightTimeout.clear(), this._state.cachedSearchTerm && this._state.lastSearchOptions?.decorations && (this._highlightTimeout.value = Fc(() => {
			let e = this._state.cachedSearchTerm;
			this._state.clearCachedTerm(), this.findPrevious(e, {
				...this._state.lastSearchOptions,
				incremental: !0
			}, { noScroll: !0 });
		}, 200));
	}
	clearDecorations(e) {
		this._resultTracker.clearSelectedDecoration(), this._decorationManager?.clearHighlightDecorations(), this._resultTracker.clearResults(), e || this._state.clearCachedTerm();
	}
	clearActiveDecoration() {
		this._resultTracker.clearSelectedDecoration();
	}
	findNext(e, t, n) {
		if (!this._terminal || !this._engine) throw Error("Cannot use addon until it has been loaded");
		this._state.lastSearchOptions = t, this._state.shouldUpdateHighlighting(e, t) && this._highlightAllMatches(e, t);
		let r = this._findNextAndSelect(e, t, n);
		return this._fireResults(t), this._state.cachedSearchTerm = e, r;
	}
	_highlightAllMatches(e, t) {
		if (!this._terminal || !this._engine || !this._decorationManager) throw Error("Cannot use addon until it has been loaded");
		if (!this._state.isValidSearchTerm(e)) {
			this.clearDecorations();
			return;
		}
		this.clearDecorations(!0);
		let n = [], r, i = this._engine.find(e, 0, 0, t);
		for (; i && (r?.row !== i.row || r?.col !== i.col) && !(n.length >= this._highlightLimit);) r = i, n.push(r), i = this._engine.find(e, r.col + r.term.length >= this._terminal.cols ? r.row + 1 : r.row, r.col + r.term.length >= this._terminal.cols ? 0 : r.col + 1, t);
		this._resultTracker.updateResults(n, this._highlightLimit), t.decorations && this._decorationManager.createHighlightDecorations(n, t.decorations);
	}
	_findNextAndSelect(e, t, n) {
		if (!this._terminal || !this._engine) return !1;
		if (!this._state.isValidSearchTerm(e)) return this._terminal.clearSelection(), this.clearDecorations(), !1;
		let r = this._engine.findNextWithSelection(e, t, this._state.cachedSearchTerm);
		return this._selectResult(r, t?.decorations, n?.noScroll);
	}
	findPrevious(e, t, n) {
		if (!this._terminal || !this._engine) throw Error("Cannot use addon until it has been loaded");
		this._state.lastSearchOptions = t, this._state.shouldUpdateHighlighting(e, t) && this._highlightAllMatches(e, t);
		let r = this._findPreviousAndSelect(e, t, n);
		return this._fireResults(t), this._state.cachedSearchTerm = e, r;
	}
	_fireResults(e) {
		this._resultTracker.fireResultsChanged(!!e?.decorations);
	}
	_findPreviousAndSelect(e, t, n) {
		if (!this._terminal || !this._engine) return !1;
		if (!this._state.isValidSearchTerm(e)) return this._terminal.clearSelection(), this.clearDecorations(), !1;
		let r = this._engine.findPreviousWithSelection(e, t, this._state.cachedSearchTerm);
		return this._selectResult(r, t?.decorations, n?.noScroll);
	}
	_selectResult(e, t, n) {
		if (!this._terminal || !this._decorationManager) return !1;
		if (this._resultTracker.clearSelectedDecoration(), !e) return this._terminal.clearSelection(), !1;
		if (this._terminal.select(e.col, e.row, e.size), t) {
			let n = this._decorationManager.createActiveDecoration(e, t);
			n && (this._resultTracker.selectedDecoration = n);
		}
		if (!n && (e.row >= this._terminal.buffer.active.viewportY + this._terminal.rows || e.row < this._terminal.buffer.active.viewportY)) {
			let t = e.row - this._terminal.buffer.active.viewportY;
			t -= Math.floor(this._terminal.rows / 2), this._terminal.scrollLines(t);
		}
		return !0;
	}
}, Wc = [
	[768, 879],
	[1155, 1158],
	[1160, 1161],
	[1425, 1469],
	[1471, 1471],
	[1473, 1474],
	[1476, 1477],
	[1479, 1479],
	[1536, 1539],
	[1552, 1557],
	[1611, 1630],
	[1648, 1648],
	[1750, 1764],
	[1767, 1768],
	[1770, 1773],
	[1807, 1807],
	[1809, 1809],
	[1840, 1866],
	[1958, 1968],
	[2027, 2035],
	[2305, 2306],
	[2364, 2364],
	[2369, 2376],
	[2381, 2381],
	[2385, 2388],
	[2402, 2403],
	[2433, 2433],
	[2492, 2492],
	[2497, 2500],
	[2509, 2509],
	[2530, 2531],
	[2561, 2562],
	[2620, 2620],
	[2625, 2626],
	[2631, 2632],
	[2635, 2637],
	[2672, 2673],
	[2689, 2690],
	[2748, 2748],
	[2753, 2757],
	[2759, 2760],
	[2765, 2765],
	[2786, 2787],
	[2817, 2817],
	[2876, 2876],
	[2879, 2879],
	[2881, 2883],
	[2893, 2893],
	[2902, 2902],
	[2946, 2946],
	[3008, 3008],
	[3021, 3021],
	[3134, 3136],
	[3142, 3144],
	[3146, 3149],
	[3157, 3158],
	[3260, 3260],
	[3263, 3263],
	[3270, 3270],
	[3276, 3277],
	[3298, 3299],
	[3393, 3395],
	[3405, 3405],
	[3530, 3530],
	[3538, 3540],
	[3542, 3542],
	[3633, 3633],
	[3636, 3642],
	[3655, 3662],
	[3761, 3761],
	[3764, 3769],
	[3771, 3772],
	[3784, 3789],
	[3864, 3865],
	[3893, 3893],
	[3895, 3895],
	[3897, 3897],
	[3953, 3966],
	[3968, 3972],
	[3974, 3975],
	[3984, 3991],
	[3993, 4028],
	[4038, 4038],
	[4141, 4144],
	[4146, 4146],
	[4150, 4151],
	[4153, 4153],
	[4184, 4185],
	[4448, 4607],
	[4959, 4959],
	[5906, 5908],
	[5938, 5940],
	[5970, 5971],
	[6002, 6003],
	[6068, 6069],
	[6071, 6077],
	[6086, 6086],
	[6089, 6099],
	[6109, 6109],
	[6155, 6157],
	[6313, 6313],
	[6432, 6434],
	[6439, 6440],
	[6450, 6450],
	[6457, 6459],
	[6679, 6680],
	[6912, 6915],
	[6964, 6964],
	[6966, 6970],
	[6972, 6972],
	[6978, 6978],
	[7019, 7027],
	[7616, 7626],
	[7678, 7679],
	[8203, 8207],
	[8234, 8238],
	[8288, 8291],
	[8298, 8303],
	[8400, 8431],
	[12330, 12335],
	[12441, 12442],
	[43014, 43014],
	[43019, 43019],
	[43045, 43046],
	[64286, 64286],
	[65024, 65039],
	[65056, 65059],
	[65279, 65279],
	[65529, 65531]
], Gc = [
	[68097, 68099],
	[68101, 68102],
	[68108, 68111],
	[68152, 68154],
	[68159, 68159],
	[119143, 119145],
	[119155, 119170],
	[119173, 119179],
	[119210, 119213],
	[119362, 119364],
	[917505, 917505],
	[917536, 917631],
	[917760, 917999]
], Kc;
function qc(e, t) {
	let n = 0, r = t.length - 1, i;
	if (e < t[0][0] || e > t[r][1]) return !1;
	for (; r >= n;) if (i = n + r >> 1, e > t[i][1]) n = i + 1;
	else if (e < t[i][0]) r = i - 1;
	else return !0;
	return !1;
}
var Jc = class {
	constructor() {
		if (this.version = "6", !Kc) {
			Kc = /* @__PURE__ */ new Uint8Array(65536), Kc.fill(1), Kc[0] = 0, Kc.fill(0, 1, 32), Kc.fill(0, 127, 160), Kc.fill(2, 4352, 4448), Kc[9001] = 2, Kc[9002] = 2, Kc.fill(2, 11904, 42192), Kc[12351] = 1, Kc.fill(2, 44032, 55204), Kc.fill(2, 63744, 64256), Kc.fill(2, 65040, 65050), Kc.fill(2, 65072, 65136), Kc.fill(2, 65280, 65377), Kc.fill(2, 65504, 65511);
			for (let e = 0; e < Wc.length; ++e) Kc.fill(0, Wc[e][0], Wc[e][1] + 1);
		}
	}
	wcwidth(e) {
		return e < 32 ? 0 : e < 127 ? 1 : e < 65536 ? Kc[e] : qc(e, Gc) ? 0 : e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141 ? 2 : 1;
	}
	charProperties(e, t) {
		let n = this.wcwidth(e), r = n === 0 && t !== 0;
		if (r) {
			let e = Ml.extractWidth(t);
			e === 0 ? r = !1 : e > n && (n = e);
		}
		return Ml.createPropertyValue(0, n, r);
	}
}, Yc = new class {
	constructor() {
		this.listeners = [], this.unexpectedErrorHandler = function(e) {
			setTimeout(() => {
				throw e.stack ? el.isErrorNoTelemetry(e) ? new el(e.message + "\n\n" + e.stack) : /* @__PURE__ */ Error(e.message + "\n\n" + e.stack) : e;
			}, 0);
		};
	}
	addListener(e) {
		return this.listeners.push(e), () => {
			this._removeListener(e);
		};
	}
	emit(e) {
		this.listeners.forEach((t) => {
			t(e);
		});
	}
	_removeListener(e) {
		this.listeners.splice(this.listeners.indexOf(e), 1);
	}
	setUnexpectedErrorHandler(e) {
		this.unexpectedErrorHandler = e;
	}
	getUnexpectedErrorHandler() {
		return this.unexpectedErrorHandler;
	}
	onUnexpectedError(e) {
		this.unexpectedErrorHandler(e), this.emit(e);
	}
	onUnexpectedExternalError(e) {
		this.unexpectedErrorHandler(e);
	}
}();
function Xc(e) {
	Qc(e) || Yc.onUnexpectedError(e);
}
var Zc = "Canceled";
function Qc(e) {
	return e instanceof $c || e instanceof Error && e.name === Zc && e.message === Zc;
}
var $c = class extends Error {
	constructor() {
		super(Zc), this.name = this.message;
	}
}, el = class e extends Error {
	constructor(e) {
		super(e), this.name = "CodeExpectedError";
	}
	static fromError(t) {
		if (t instanceof e) return t;
		let n = new e();
		return n.message = t.message, n.stack = t.stack, n;
	}
	static isErrorNoTelemetry(e) {
		return e.name === "CodeExpectedError";
	}
};
function tl(e, t) {
	let n = this, r = !1, i;
	return function() {
		if (r) return i;
		if (r = !0, t) try {
			i = e.apply(n, arguments);
		} finally {
			t();
		}
		else i = e.apply(n, arguments);
		return i;
	};
}
var nl;
((e) => {
	function t(e) {
		return e < 0;
	}
	e.isLessThan = t;
	function n(e) {
		return e <= 0;
	}
	e.isLessThanOrEqual = n;
	function r(e) {
		return e > 0;
	}
	e.isGreaterThan = r;
	function i(e) {
		return e === 0;
	}
	e.isNeitherLessOrGreaterThan = i, e.greaterThan = 1, e.lessThan = -1, e.neitherLessOrGreaterThan = 0;
})(nl ||= {});
var rl = class e {
	constructor(e) {
		this.iterate = e;
	}
	forEach(e) {
		this.iterate((t) => (e(t), !0));
	}
	toArray() {
		let e = [];
		return this.iterate((t) => (e.push(t), !0)), e;
	}
	filter(t) {
		return new e((e) => this.iterate((n) => !t(n) || e(n)));
	}
	map(t) {
		return new e((e) => this.iterate((n) => e(t(n))));
	}
	some(e) {
		let t = !1;
		return this.iterate((n) => (t = e(n), !t)), t;
	}
	findFirst(e) {
		let t;
		return this.iterate((n) => !e(n) || (t = n, !1)), t;
	}
	findLast(e) {
		let t;
		return this.iterate((n) => (e(n) && (t = n), !0)), t;
	}
	findLastMaxBy(e) {
		let t, n = !0;
		return this.iterate((r) => ((n || nl.isGreaterThan(e(r, t))) && (n = !1, t = r), !0)), t;
	}
};
rl.empty = new rl((e) => {});
var il;
((e) => {
	function t(e) {
		return e && typeof e == "object" && typeof e[Symbol.iterator] == "function";
	}
	e.is = t;
	let n = Object.freeze([]);
	function r() {
		return n;
	}
	e.empty = r;
	function* i(e) {
		yield e;
	}
	e.single = i;
	function a(e) {
		return t(e) ? e : i(e);
	}
	e.wrap = a;
	function o(e) {
		return e || n;
	}
	e.from = o;
	function* s(e) {
		for (let t = e.length - 1; t >= 0; t--) yield e[t];
	}
	e.reverse = s;
	function c(e) {
		return !e || e[Symbol.iterator]().next().done === !0;
	}
	e.isEmpty = c;
	function l(e) {
		return e[Symbol.iterator]().next().value;
	}
	e.first = l;
	function u(e, t) {
		let n = 0;
		for (let r of e) if (t(r, n++)) return !0;
		return !1;
	}
	e.some = u;
	function d(e, t) {
		for (let n of e) if (t(n)) return n;
	}
	e.find = d;
	function* f(e, t) {
		for (let n of e) t(n) && (yield n);
	}
	e.filter = f;
	function* p(e, t) {
		let n = 0;
		for (let r of e) yield t(r, n++);
	}
	e.map = p;
	function* m(e, t) {
		let n = 0;
		for (let r of e) yield* t(r, n++);
	}
	e.flatMap = m;
	function* h(...e) {
		for (let t of e) yield* t;
	}
	e.concat = h;
	function g(e, t, n) {
		let r = n;
		for (let n of e) r = t(r, n);
		return r;
	}
	e.reduce = g;
	function* _(e, t, n = e.length) {
		for (t < 0 && (t += e.length), n < 0 ? n += e.length : n > e.length && (n = e.length); t < n; t++) yield e[t];
	}
	e.slice = _;
	function v(t, n = Infinity) {
		let r = [];
		if (n === 0) return [r, t];
		let i = t[Symbol.iterator]();
		for (let t = 0; t < n; t++) {
			let t = i.next();
			if (t.done) return [r, e.empty()];
			r.push(t.value);
		}
		return [r, { [Symbol.iterator]() {
			return i;
		} }];
	}
	e.consume = v;
	async function y(e) {
		let t = [];
		for await (let n of e) t.push(n);
		return Promise.resolve(t);
	}
	e.asyncToArray = y;
})(il ||= {});
var al = null;
function ol(e) {
	return al?.trackDisposable(e), e;
}
function sl(e) {
	al?.markAsDisposed(e);
}
function cl(e, t) {
	al?.setParent(e, t);
}
function ll(e) {
	if (il.is(e)) {
		let t = [];
		for (let n of e) if (n) try {
			n.dispose();
		} catch (e) {
			t.push(e);
		}
		if (t.length === 1) throw t[0];
		if (t.length > 1) throw AggregateError(t, "Encountered errors while disposing of store");
		return Array.isArray(e) ? [] : e;
	}
	if (e) return e.dispose(), e;
}
function ul(...e) {
	return dl(() => ll(e));
}
function dl(e) {
	let t = ol({ dispose: tl(() => {
		sl(t), e();
	}) });
	return t;
}
var fl = class e {
	constructor() {
		this._toDispose = /* @__PURE__ */ new Set(), this._isDisposed = !1, ol(this);
	}
	dispose() {
		this._isDisposed || (sl(this), this._isDisposed = !0, this.clear());
	}
	get isDisposed() {
		return this._isDisposed;
	}
	clear() {
		if (this._toDispose.size !== 0) try {
			ll(this._toDispose);
		} finally {
			this._toDispose.clear();
		}
	}
	add(t) {
		if (!t) return t;
		if (t === this) throw Error("Cannot register a disposable on itself!");
		return cl(t, this), this._isDisposed ? e.DISABLE_DISPOSED_WARNING || console.warn((/* @__PURE__ */ Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!")).stack) : this._toDispose.add(t), t;
	}
	delete(e) {
		if (e) {
			if (e === this) throw Error("Cannot dispose a disposable on itself!");
			this._toDispose.delete(e), e.dispose();
		}
	}
	deleteAndLeak(e) {
		e && this._toDispose.has(e) && (this._toDispose.delete(e), cl(e, null));
	}
};
fl.DISABLE_DISPOSED_WARNING = !1;
var pl = fl, ml = class {
	constructor() {
		this._store = new pl(), ol(this), cl(this._store, this);
	}
	dispose() {
		sl(this), this._store.dispose();
	}
	_register(e) {
		if (e === this) throw Error("Cannot register a disposable on itself!");
		return this._store.add(e);
	}
};
ml.None = Object.freeze({ dispose() {} });
var hl = class e {
	constructor(t) {
		this.element = t, this.next = e.Undefined, this.prev = e.Undefined;
	}
};
hl.Undefined = new hl(void 0);
var gl = globalThis.performance && typeof globalThis.performance.now == "function", _l = class e {
	static create(t) {
		return new e(t);
	}
	constructor(e) {
		this._now = gl && e === !1 ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
	}
	stop() {
		this._stopTime = this._now();
	}
	reset() {
		this._startTime = this._now(), this._stopTime = -1;
	}
	elapsed() {
		return this._stopTime === -1 ? this._now() - this._startTime : this._stopTime - this._startTime;
	}
}, vl;
((e) => {
	e.None = () => ml.None;
	function t(e, t) {
		return d(e, () => {}, 0, void 0, !0, void 0, t);
	}
	e.defer = t;
	function n(e) {
		return (t, n = null, r) => {
			let i = !1, a;
			return a = e((e) => {
				if (!i) return a ? a.dispose() : i = !0, t.call(n, e);
			}, null, r), i && a.dispose(), a;
		};
	}
	e.once = n;
	function r(e, t, n) {
		return l((n, r = null, i) => e((e) => n.call(r, t(e)), null, i), n);
	}
	e.map = r;
	function i(e, t, n) {
		return l((n, r = null, i) => e((e) => {
			t(e), n.call(r, e);
		}, null, i), n);
	}
	e.forEach = i;
	function a(e, t, n) {
		return l((n, r = null, i) => e((e) => t(e) && n.call(r, e), null, i), n);
	}
	e.filter = a;
	function o(e) {
		return e;
	}
	e.signal = o;
	function s(...e) {
		return (t, n = null, r) => u(ul(...e.map((e) => e((e) => t.call(n, e)))), r);
	}
	e.any = s;
	function c(e, t, n, i) {
		let a = n;
		return r(e, (e) => (a = t(a, e), a), i);
	}
	e.reduce = c;
	function l(e, t) {
		let n, r = new Al({
			onWillAddFirstListener() {
				n = e(r.fire, r);
			},
			onDidRemoveLastListener() {
				n?.dispose();
			}
		});
		return t?.add(r), r.event;
	}
	function u(e, t) {
		return t instanceof Array ? t.push(e) : t && t.add(e), e;
	}
	function d(e, t, n = 100, r = !1, i = !1, a, o) {
		let s, c, l, u = 0, d, f = new Al({
			leakWarningThreshold: a,
			onWillAddFirstListener() {
				s = e((e) => {
					u++, c = t(c, e), r && !l && (f.fire(c), c = void 0), d = () => {
						let e = c;
						c = void 0, l = void 0, (!r || u > 1) && f.fire(e), u = 0;
					}, typeof n == "number" ? (clearTimeout(l), l = setTimeout(d, n)) : l === void 0 && (l = 0, queueMicrotask(d));
				});
			},
			onWillRemoveListener() {
				i && u > 0 && d?.();
			},
			onDidRemoveLastListener() {
				d = void 0, s.dispose();
			}
		});
		return o?.add(f), f.event;
	}
	e.debounce = d;
	function f(t, n = 0, r) {
		return e.debounce(t, (e, t) => e ? (e.push(t), e) : [t], n, void 0, !0, void 0, r);
	}
	e.accumulate = f;
	function p(e, t = (e, t) => e === t, n) {
		let r = !0, i;
		return a(e, (e) => {
			let n = r || !t(e, i);
			return r = !1, i = e, n;
		}, n);
	}
	e.latch = p;
	function m(t, n, r) {
		return [e.filter(t, n, r), e.filter(t, (e) => !n(e), r)];
	}
	e.split = m;
	function h(e, t = !1, n = [], r) {
		let i = n.slice(), a = e((e) => {
			i ? i.push(e) : s.fire(e);
		});
		r && r.add(a);
		let o = () => {
			i?.forEach((e) => s.fire(e)), i = null;
		}, s = new Al({
			onWillAddFirstListener() {
				a || (a = e((e) => s.fire(e)), r && r.add(a));
			},
			onDidAddFirstListener() {
				i && (t ? setTimeout(o) : o());
			},
			onDidRemoveLastListener() {
				a && a.dispose(), a = null;
			}
		});
		return r && r.add(s), s.event;
	}
	e.buffer = h;
	function g(e, t) {
		return (n, r, i) => {
			let a = t(new v());
			return e(function(e) {
				let t = a.evaluate(e);
				t !== _ && n.call(r, t);
			}, void 0, i);
		};
	}
	e.chain = g;
	let _ = Symbol("HaltChainable");
	class v {
		constructor() {
			this.steps = [];
		}
		map(e) {
			return this.steps.push(e), this;
		}
		forEach(e) {
			return this.steps.push((t) => (e(t), t)), this;
		}
		filter(e) {
			return this.steps.push((t) => e(t) ? t : _), this;
		}
		reduce(e, t) {
			let n = t;
			return this.steps.push((t) => (n = e(n, t), n)), this;
		}
		latch(e = (e, t) => e === t) {
			let t = !0, n;
			return this.steps.push((r) => {
				let i = t || !e(r, n);
				return t = !1, n = r, i ? r : _;
			}), this;
		}
		evaluate(e) {
			for (let t of this.steps) if (e = t(e), e === _) break;
			return e;
		}
	}
	function y(e, t, n = (e) => e) {
		let r = (...e) => i.fire(n(...e)), i = new Al({
			onWillAddFirstListener: () => e.on(t, r),
			onDidRemoveLastListener: () => e.removeListener(t, r)
		});
		return i.event;
	}
	e.fromNodeEventEmitter = y;
	function ee(e, t, n = (e) => e) {
		let r = (...e) => i.fire(n(...e)), i = new Al({
			onWillAddFirstListener: () => e.addEventListener(t, r),
			onDidRemoveLastListener: () => e.removeEventListener(t, r)
		});
		return i.event;
	}
	e.fromDOMEventEmitter = ee;
	function b(e) {
		return new Promise((t) => n(e)(t));
	}
	e.toPromise = b;
	function x(e) {
		let t = new Al();
		return e.then((e) => {
			t.fire(e);
		}, () => {
			t.fire(void 0);
		}).finally(() => {
			t.dispose();
		}), t.event;
	}
	e.fromPromise = x;
	function S(e, t) {
		return e((e) => t.fire(e));
	}
	e.forward = S;
	function te(e, t, n) {
		return t(n), e((e) => t(e));
	}
	e.runAndSubscribe = te;
	class ne {
		constructor(e, t) {
			this._observable = e, this._counter = 0, this._hasChanged = !1;
			let n = {
				onWillAddFirstListener: () => {
					e.addObserver(this);
				},
				onDidRemoveLastListener: () => {
					e.removeObserver(this);
				}
			};
			this.emitter = new Al(n), t && t.add(this.emitter);
		}
		beginUpdate(e) {
			this._counter++;
		}
		handlePossibleChange(e) {}
		handleChange(e, t) {
			this._hasChanged = !0;
		}
		endUpdate(e) {
			this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = !1, this.emitter.fire(this._observable.get())));
		}
	}
	function re(e, t) {
		return new ne(e, t).emitter.event;
	}
	e.fromObservable = re;
	function C(e) {
		return (t, n, r) => {
			let i = 0, a = !1, o = {
				beginUpdate() {
					i++;
				},
				endUpdate() {
					i--, i === 0 && (e.reportChanges(), a && (a = !1, t.call(n)));
				},
				handlePossibleChange() {},
				handleChange() {
					a = !0;
				}
			};
			e.addObserver(o), e.reportChanges();
			let s = { dispose() {
				e.removeObserver(o);
			} };
			return r instanceof pl ? r.add(s) : Array.isArray(r) && r.push(s), s;
		};
	}
	e.fromObservableLight = C;
})(vl ||= {});
var yl = class e {
	constructor(t) {
		this.listenerCount = 0, this.invocationCount = 0, this.elapsedOverall = 0, this.durations = [], this.name = `${t}_${e._idPool++}`, e.all.add(this);
	}
	start(e) {
		this._stopWatch = new _l(), this.listenerCount = e;
	}
	stop() {
		if (this._stopWatch) {
			let e = this._stopWatch.elapsed();
			this.durations.push(e), this.elapsedOverall += e, this.invocationCount += 1, this._stopWatch = void 0;
		}
	}
};
yl.all = /* @__PURE__ */ new Set(), yl._idPool = 0;
var bl = yl, xl = -1, Sl = class e {
	constructor(t, n, r = (e._idPool++).toString(16).padStart(3, "0")) {
		this._errorHandler = t, this.threshold = n, this.name = r, this._warnCountdown = 0;
	}
	dispose() {
		this._stacks?.clear();
	}
	check(e, t) {
		let n = this.threshold;
		if (n <= 0 || t < n) return;
		this._stacks ||= /* @__PURE__ */ new Map();
		let r = this._stacks.get(e.value) || 0;
		if (this._stacks.set(e.value, r + 1), --this._warnCountdown, this._warnCountdown <= 0) {
			this._warnCountdown = n * .5;
			let [e, r] = this.getMostFrequentStack(), i = `[${this.name}] potential listener LEAK detected, having ${t} listeners already. MOST frequent listener (${r}):`;
			console.warn(i), console.warn(e);
			let a = new Tl(i, e);
			this._errorHandler(a);
		}
		return () => {
			let t = this._stacks.get(e.value) || 0;
			this._stacks.set(e.value, t - 1);
		};
	}
	getMostFrequentStack() {
		if (!this._stacks) return;
		let e, t = 0;
		for (let [n, r] of this._stacks) (!e || t < r) && (e = [n, r], t = r);
		return e;
	}
};
Sl._idPool = 1;
var Cl = Sl, wl = class e {
	constructor(e) {
		this.value = e;
	}
	static create() {
		return new e((/* @__PURE__ */ Error()).stack ?? "");
	}
	print() {
		console.warn(this.value.split("\n").slice(2).join("\n"));
	}
}, Tl = class extends Error {
	constructor(e, t) {
		super(e), this.name = "ListenerLeakError", this.stack = t;
	}
}, El = class extends Error {
	constructor(e, t) {
		super(e), this.name = "ListenerRefusalError", this.stack = t;
	}
}, Dl = 0, Ol = class {
	constructor(e) {
		this.value = e, this.id = Dl++;
	}
}, kl = 2, Al = class {
	constructor(e) {
		this._size = 0, this._options = e, this._leakageMon = xl > 0 || this._options?.leakWarningThreshold ? new Cl(e?.onListenerError ?? Xc, this._options?.leakWarningThreshold ?? xl) : void 0, this._perfMon = this._options?._profName ? new bl(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
	}
	dispose() {
		this._disposed || (this._disposed = !0, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners && (this._listeners = void 0, this._size = 0), this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose());
	}
	get event() {
		return this._event ??= (e, t, n) => {
			if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
				let e = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
				console.warn(e);
				let t = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], n = new El(`${e}. HINT: Stack shows most frequent listener (${t[1]}-times)`, t[0]);
				return (this._options?.onListenerError || Xc)(n), ml.None;
			}
			if (this._disposed) return ml.None;
			t && (e = e.bind(t));
			let r = new Ol(e), i;
			this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * .2) && (r.stack = wl.create(), i = this._leakageMon.check(r.stack, this._size + 1)), this._listeners ? this._listeners instanceof Ol ? (this._deliveryQueue ??= new jl(), this._listeners = [this._listeners, r]) : this._listeners.push(r) : (this._options?.onWillAddFirstListener?.(this), this._listeners = r, this._options?.onDidAddFirstListener?.(this)), this._size++;
			let a = dl(() => {
				i?.(), this._removeListener(r);
			});
			return n instanceof pl ? n.add(a) : Array.isArray(n) && n.push(a), a;
		}, this._event;
	}
	_removeListener(e) {
		if (this._options?.onWillRemoveListener?.(this), !this._listeners) return;
		if (this._size === 1) {
			this._listeners = void 0, this._options?.onDidRemoveLastListener?.(this), this._size = 0;
			return;
		}
		let t = this._listeners, n = t.indexOf(e);
		if (n === -1) throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), /* @__PURE__ */ Error("Attempted to dispose unknown listener");
		this._size--, t[n] = void 0;
		let r = this._deliveryQueue.current === this;
		if (this._size * kl <= t.length) {
			let e = 0;
			for (let n = 0; n < t.length; n++) t[n] ? t[e++] = t[n] : r && (this._deliveryQueue.end--, e < this._deliveryQueue.i && this._deliveryQueue.i--);
			t.length = e;
		}
	}
	_deliver(e, t) {
		if (!e) return;
		let n = this._options?.onListenerError || Xc;
		if (!n) e.value(t);
		else try {
			e.value(t);
		} catch (e) {
			n(e);
		}
	}
	_deliverQueue(e) {
		let t = e.current._listeners;
		for (; e.i < e.end;) this._deliver(t[e.i++], e.value);
		e.reset();
	}
	fire(e) {
		if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) {
			if (this._listeners instanceof Ol) this._deliver(this._listeners, e);
			else {
				let t = this._deliveryQueue;
				t.enqueue(this, e, this._listeners.length), this._deliverQueue(t);
			}
		}
		this._perfMon?.stop();
	}
	hasListeners() {
		return this._size > 0;
	}
}, jl = class {
	constructor() {
		this.i = -1, this.end = 0;
	}
	enqueue(e, t, n) {
		this.i = 0, this.end = n, this.current = e, this.value = t;
	}
	reset() {
		this.i = this.end, this.current = void 0, this.value = void 0;
	}
}, Ml = class e {
	constructor() {
		this._providers = Object.create(null), this._active = "", this._onChange = new Al(), this.onChange = this._onChange.event;
		let e = new Jc();
		this.register(e), this._active = e.version, this._activeProvider = e;
	}
	static extractShouldJoin(e) {
		return !!(e & 1);
	}
	static extractWidth(e) {
		return e >> 1 & 3;
	}
	static extractCharKind(e) {
		return e >> 3;
	}
	static createPropertyValue(e, t, n = !1) {
		return (e & 16777215) << 3 | (t & 3) << 1 | !!n;
	}
	dispose() {
		this._onChange.dispose();
	}
	get versions() {
		return Object.keys(this._providers);
	}
	get activeVersion() {
		return this._active;
	}
	set activeVersion(e) {
		if (!this._providers[e]) throw Error(`unknown Unicode version "${e}"`);
		this._active = e, this._activeProvider = this._providers[e], this._onChange.fire(e);
	}
	register(e) {
		this._providers[e.version] = e;
	}
	wcwidth(e) {
		return this._activeProvider.wcwidth(e);
	}
	getStringCellWidth(t) {
		let n = 0, r = 0, i = t.length;
		for (let a = 0; a < i; ++a) {
			let o = t.charCodeAt(a);
			if (55296 <= o && o <= 56319) {
				if (++a >= i) return n + this.wcwidth(o);
				let e = t.charCodeAt(a);
				56320 <= e && e <= 57343 ? o = (o - 55296) * 1024 + e - 56320 + 65536 : n += this.wcwidth(e);
			}
			let s = this.charProperties(o, r), c = e.extractWidth(s);
			e.extractShouldJoin(s) && (c -= e.extractWidth(r)), n += c, r = s;
		}
		return n;
	}
	charProperties(e, t) {
		return this._activeProvider.charProperties(e, t);
	}
}, Nl = [
	[768, 879],
	[1155, 1161],
	[1425, 1469],
	[1471, 1471],
	[1473, 1474],
	[1476, 1477],
	[1479, 1479],
	[1536, 1541],
	[1552, 1562],
	[1564, 1564],
	[1611, 1631],
	[1648, 1648],
	[1750, 1757],
	[1759, 1764],
	[1767, 1768],
	[1770, 1773],
	[1807, 1807],
	[1809, 1809],
	[1840, 1866],
	[1958, 1968],
	[2027, 2035],
	[2045, 2045],
	[2070, 2073],
	[2075, 2083],
	[2085, 2087],
	[2089, 2093],
	[2137, 2139],
	[2259, 2306],
	[2362, 2362],
	[2364, 2364],
	[2369, 2376],
	[2381, 2381],
	[2385, 2391],
	[2402, 2403],
	[2433, 2433],
	[2492, 2492],
	[2497, 2500],
	[2509, 2509],
	[2530, 2531],
	[2558, 2558],
	[2561, 2562],
	[2620, 2620],
	[2625, 2626],
	[2631, 2632],
	[2635, 2637],
	[2641, 2641],
	[2672, 2673],
	[2677, 2677],
	[2689, 2690],
	[2748, 2748],
	[2753, 2757],
	[2759, 2760],
	[2765, 2765],
	[2786, 2787],
	[2810, 2815],
	[2817, 2817],
	[2876, 2876],
	[2879, 2879],
	[2881, 2884],
	[2893, 2893],
	[2902, 2902],
	[2914, 2915],
	[2946, 2946],
	[3008, 3008],
	[3021, 3021],
	[3072, 3072],
	[3076, 3076],
	[3134, 3136],
	[3142, 3144],
	[3146, 3149],
	[3157, 3158],
	[3170, 3171],
	[3201, 3201],
	[3260, 3260],
	[3263, 3263],
	[3270, 3270],
	[3276, 3277],
	[3298, 3299],
	[3328, 3329],
	[3387, 3388],
	[3393, 3396],
	[3405, 3405],
	[3426, 3427],
	[3530, 3530],
	[3538, 3540],
	[3542, 3542],
	[3633, 3633],
	[3636, 3642],
	[3655, 3662],
	[3761, 3761],
	[3764, 3772],
	[3784, 3789],
	[3864, 3865],
	[3893, 3893],
	[3895, 3895],
	[3897, 3897],
	[3953, 3966],
	[3968, 3972],
	[3974, 3975],
	[3981, 3991],
	[3993, 4028],
	[4038, 4038],
	[4141, 4144],
	[4146, 4151],
	[4153, 4154],
	[4157, 4158],
	[4184, 4185],
	[4190, 4192],
	[4209, 4212],
	[4226, 4226],
	[4229, 4230],
	[4237, 4237],
	[4253, 4253],
	[4448, 4607],
	[4957, 4959],
	[5906, 5908],
	[5938, 5940],
	[5970, 5971],
	[6002, 6003],
	[6068, 6069],
	[6071, 6077],
	[6086, 6086],
	[6089, 6099],
	[6109, 6109],
	[6155, 6158],
	[6277, 6278],
	[6313, 6313],
	[6432, 6434],
	[6439, 6440],
	[6450, 6450],
	[6457, 6459],
	[6679, 6680],
	[6683, 6683],
	[6742, 6742],
	[6744, 6750],
	[6752, 6752],
	[6754, 6754],
	[6757, 6764],
	[6771, 6780],
	[6783, 6783],
	[6832, 6846],
	[6912, 6915],
	[6964, 6964],
	[6966, 6970],
	[6972, 6972],
	[6978, 6978],
	[7019, 7027],
	[7040, 7041],
	[7074, 7077],
	[7080, 7081],
	[7083, 7085],
	[7142, 7142],
	[7144, 7145],
	[7149, 7149],
	[7151, 7153],
	[7212, 7219],
	[7222, 7223],
	[7376, 7378],
	[7380, 7392],
	[7394, 7400],
	[7405, 7405],
	[7412, 7412],
	[7416, 7417],
	[7616, 7673],
	[7675, 7679],
	[8203, 8207],
	[8234, 8238],
	[8288, 8292],
	[8294, 8303],
	[8400, 8432],
	[11503, 11505],
	[11647, 11647],
	[11744, 11775],
	[12330, 12333],
	[12441, 12442],
	[42607, 42610],
	[42612, 42621],
	[42654, 42655],
	[42736, 42737],
	[43010, 43010],
	[43014, 43014],
	[43019, 43019],
	[43045, 43046],
	[43204, 43205],
	[43232, 43249],
	[43263, 43263],
	[43302, 43309],
	[43335, 43345],
	[43392, 43394],
	[43443, 43443],
	[43446, 43449],
	[43452, 43453],
	[43493, 43493],
	[43561, 43566],
	[43569, 43570],
	[43573, 43574],
	[43587, 43587],
	[43596, 43596],
	[43644, 43644],
	[43696, 43696],
	[43698, 43700],
	[43703, 43704],
	[43710, 43711],
	[43713, 43713],
	[43756, 43757],
	[43766, 43766],
	[44005, 44005],
	[44008, 44008],
	[44013, 44013],
	[64286, 64286],
	[65024, 65039],
	[65056, 65071],
	[65279, 65279],
	[65529, 65531]
], Pl = [
	[66045, 66045],
	[66272, 66272],
	[66422, 66426],
	[68097, 68099],
	[68101, 68102],
	[68108, 68111],
	[68152, 68154],
	[68159, 68159],
	[68325, 68326],
	[68900, 68903],
	[69446, 69456],
	[69633, 69633],
	[69688, 69702],
	[69759, 69761],
	[69811, 69814],
	[69817, 69818],
	[69821, 69821],
	[69837, 69837],
	[69888, 69890],
	[69927, 69931],
	[69933, 69940],
	[70003, 70003],
	[70016, 70017],
	[70070, 70078],
	[70089, 70092],
	[70191, 70193],
	[70196, 70196],
	[70198, 70199],
	[70206, 70206],
	[70367, 70367],
	[70371, 70378],
	[70400, 70401],
	[70459, 70460],
	[70464, 70464],
	[70502, 70508],
	[70512, 70516],
	[70712, 70719],
	[70722, 70724],
	[70726, 70726],
	[70750, 70750],
	[70835, 70840],
	[70842, 70842],
	[70847, 70848],
	[70850, 70851],
	[71090, 71093],
	[71100, 71101],
	[71103, 71104],
	[71132, 71133],
	[71219, 71226],
	[71229, 71229],
	[71231, 71232],
	[71339, 71339],
	[71341, 71341],
	[71344, 71349],
	[71351, 71351],
	[71453, 71455],
	[71458, 71461],
	[71463, 71467],
	[71727, 71735],
	[71737, 71738],
	[72148, 72151],
	[72154, 72155],
	[72160, 72160],
	[72193, 72202],
	[72243, 72248],
	[72251, 72254],
	[72263, 72263],
	[72273, 72278],
	[72281, 72283],
	[72330, 72342],
	[72344, 72345],
	[72752, 72758],
	[72760, 72765],
	[72767, 72767],
	[72850, 72871],
	[72874, 72880],
	[72882, 72883],
	[72885, 72886],
	[73009, 73014],
	[73018, 73018],
	[73020, 73021],
	[73023, 73029],
	[73031, 73031],
	[73104, 73105],
	[73109, 73109],
	[73111, 73111],
	[73459, 73460],
	[78896, 78904],
	[92912, 92916],
	[92976, 92982],
	[94031, 94031],
	[94095, 94098],
	[113821, 113822],
	[113824, 113827],
	[119143, 119145],
	[119155, 119170],
	[119173, 119179],
	[119210, 119213],
	[119362, 119364],
	[121344, 121398],
	[121403, 121452],
	[121461, 121461],
	[121476, 121476],
	[121499, 121503],
	[121505, 121519],
	[122880, 122886],
	[122888, 122904],
	[122907, 122913],
	[122915, 122916],
	[122918, 122922],
	[123184, 123190],
	[123628, 123631],
	[125136, 125142],
	[125252, 125258],
	[917505, 917505],
	[917536, 917631],
	[917760, 917999]
], Fl = [
	[4352, 4447],
	[8986, 8987],
	[9001, 9002],
	[9193, 9196],
	[9200, 9200],
	[9203, 9203],
	[9725, 9726],
	[9748, 9749],
	[9800, 9811],
	[9855, 9855],
	[9875, 9875],
	[9889, 9889],
	[9898, 9899],
	[9917, 9918],
	[9924, 9925],
	[9934, 9934],
	[9940, 9940],
	[9962, 9962],
	[9970, 9971],
	[9973, 9973],
	[9978, 9978],
	[9981, 9981],
	[9989, 9989],
	[9994, 9995],
	[10024, 10024],
	[10060, 10060],
	[10062, 10062],
	[10067, 10069],
	[10071, 10071],
	[10133, 10135],
	[10160, 10160],
	[10175, 10175],
	[11035, 11036],
	[11088, 11088],
	[11093, 11093],
	[11904, 11929],
	[11931, 12019],
	[12032, 12245],
	[12272, 12283],
	[12288, 12329],
	[12334, 12350],
	[12353, 12438],
	[12443, 12543],
	[12549, 12591],
	[12593, 12686],
	[12688, 12730],
	[12736, 12771],
	[12784, 12830],
	[12832, 12871],
	[12880, 19903],
	[19968, 42124],
	[42128, 42182],
	[43360, 43388],
	[44032, 55203],
	[63744, 64255],
	[65040, 65049],
	[65072, 65106],
	[65108, 65126],
	[65128, 65131],
	[65281, 65376],
	[65504, 65510]
], Il = [
	[94176, 94179],
	[94208, 100343],
	[100352, 101106],
	[110592, 110878],
	[110928, 110930],
	[110948, 110951],
	[110960, 111355],
	[126980, 126980],
	[127183, 127183],
	[127374, 127374],
	[127377, 127386],
	[127488, 127490],
	[127504, 127547],
	[127552, 127560],
	[127568, 127569],
	[127584, 127589],
	[127744, 127776],
	[127789, 127797],
	[127799, 127868],
	[127870, 127891],
	[127904, 127946],
	[127951, 127955],
	[127968, 127984],
	[127988, 127988],
	[127992, 128062],
	[128064, 128064],
	[128066, 128252],
	[128255, 128317],
	[128331, 128334],
	[128336, 128359],
	[128378, 128378],
	[128405, 128406],
	[128420, 128420],
	[128507, 128591],
	[128640, 128709],
	[128716, 128716],
	[128720, 128722],
	[128725, 128725],
	[128747, 128748],
	[128756, 128762],
	[128992, 129003],
	[129293, 129393],
	[129395, 129398],
	[129402, 129442],
	[129445, 129450],
	[129454, 129482],
	[129485, 129535],
	[129648, 129651],
	[129656, 129658],
	[129664, 129666],
	[129680, 129685],
	[131072, 196605],
	[196608, 262141]
], Ll;
function Rl(e, t) {
	let n = 0, r = t.length - 1, i;
	if (e < t[0][0] || e > t[r][1]) return !1;
	for (; r >= n;) if (i = n + r >> 1, e > t[i][1]) n = i + 1;
	else if (e < t[i][0]) r = i - 1;
	else return !0;
	return !1;
}
var zl = class {
	constructor() {
		if (this.version = "11", !Ll) {
			Ll = /* @__PURE__ */ new Uint8Array(65536), Ll.fill(1), Ll[0] = 0, Ll.fill(0, 1, 32), Ll.fill(0, 127, 160);
			for (let e = 0; e < Nl.length; ++e) Ll.fill(0, Nl[e][0], Nl[e][1] + 1);
			for (let e = 0; e < Fl.length; ++e) Ll.fill(2, Fl[e][0], Fl[e][1] + 1);
		}
	}
	wcwidth(e) {
		return e < 32 ? 0 : e < 127 ? 1 : e < 65536 ? Ll[e] : Rl(e, Pl) ? 0 : Rl(e, Il) ? 2 : 1;
	}
	charProperties(e, t) {
		let n = this.wcwidth(e), r = n === 0 && t !== 0;
		if (r) {
			let e = Ml.extractWidth(t);
			e === 0 ? r = !1 : e > n && (n = e);
		}
		return Ml.createPropertyValue(0, n, r);
	}
}, Bl = class {
	activate(e) {
		e.unicode.register(new zl());
	}
	dispose() {}
};
// src/shared/i18n.js
function Vl(t, n) {
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
// src/terminal/i18n.js
var U = Vl("terminal", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Terminal\",\"@description\":\"A bash-like shell over the files of lilOS, in tabs and panes side by side, and remote sessions: SSH, Telnet, rlogin and SUPDUP, with saved hosts, .term links and sessions that keep running when the window is closed.\",\"@entrypoints.main.params.cwd.label\":\"Folder\",\"@entrypoints.main.params.cwd.description\":\"The folder to open the terminal in\",\"@automation.terminal.run.label\":\"Run a command\",\"@automation.terminal.run.params.command.label\":\"Command\",\"@automation.terminal.run.params.folder.label\":\"Folder\",\"@automation.terminal.run.params.folder.description\":\"The working folder the command runs in\",\"@entrypoints.main.params.file.label\":\"Link\",\"@entrypoints.main.params.file.description\":\"A terminal link (.term) to open\",\"ui.title\":\"Terminal\",\"ui.commandLine\":\"Command line\",\"ui.welcome\":\"lilOS Terminal · \\\"help\\\" lists the commands\",\"automation.tooLong\":\"Command too long to record\",\"automation.noCommand\":\"No command to run\",\"automation.busy\":\"The terminal is busy with another command\",\"automation.noFolder\":\"The folder is not there any more\",\"automation.status\":\"The command ended with status {status}\",\"shell.defaultUser\":\"user\",\"shell.readonly\":\"{name}: readonly variable\",\"shell.cannotUnset\":\"{name}: cannot unset: readonly variable\",\"shell.badSubscript\":\"{index}: bad array subscript\",\"shell.unknownConstruct\":\"unknown construct: {type}\",\"shell.badRegex\":\"invalid regular expression\",\"shell.unaryExpected\":\"{op}: unary operator expected\",\"shell.integerExpected\":\"{value}: integer expression expected\",\"shell.binaryExpected\":\"{op}: binary operator expected\",\"shell.commandNotFound\":\"{name}: command not found\",\"shell.tooDeep\":\"{name}: maximum function nesting level exceeded\",\"shell.badFd\":\"{fd}: Bad file descriptor\",\"shell.fdExpected\":\"{target}: file descriptor expected\",\"shell.ambiguousRedirect\":\"{target}: ambiguous redirect\",\"shell.isAppLink\":\"{path}: is a link to an app\",\"err.noSuchFile\":\"{path}: No such file or directory\",\"err.isADirectory\":\"{path}: Is a directory\",\"err.notAFile\":\"{path}: Not a regular file\",\"err.missingParen\":\"`)' expected\",\"err.badIdentifier\":\"`{name}': not a valid identifier\",\"err.numericArgument\":\"{value}: numeric argument required\",\"err.tooManyArguments\":\"too many arguments\",\"err.notADirectory\":\"{path}: Not a directory\",\"err.notFound\":\"{name}: not found\",\"err.missingOperand\":\"missing operand\",\"err.unknownSubcommand\":\"unknown subcommand: '{sub}'\",\"parse.unexpectedEnd\":\"syntax error: unexpected end of input\",\"parse.unexpectedEndOfFile\":\"syntax error: unexpected end of file\",\"parse.nearEnd\":\"end of input\",\"parse.nearNewline\":\"`newline'\",\"parse.nearToken\":\"`{token}'\",\"parse.near\":\"syntax error near unexpected token {near}\",\"parse.nearExpected\":\"syntax error near unexpected token {near}: expected `{expected}'\",\"parse.badFunctionName\":\"invalid function name\",\"parse.parenAfterName\":\"expected `)' after the function name\",\"parse.aliasLoop\":\"aliases expanded too many times\",\"parse.missingTarget\":\"syntax error near unexpected token {near}: missing target of `{op}'\",\"parse.forBadName\":\"for: invalid variable name\",\"parse.caseNoWord\":\"case: missing word\",\"parse.condNear\":\"syntax error in conditional expression near {near}\",\"parse.condNoOperand\":\"syntax error in conditional expression: missing operand\",\"parse.condNoRegex\":\"syntax error in conditional expression: missing regular expression\",\"parse.badSubstitution\":\"bad substitution\",\"parse.badSubstitutionBrace\":\"bad substitution: missing `}'\",\"parse.backquotes\":\"syntax error in backquoted command substitution\",\"jobs.done\":\"Done\",\"jobs.interrupted\":\"Interrupt\",\"jobs.exit\":\"Exit {code}\",\"jobs.running\":\"Running\",\"help.usageLine\":\"Usage: {usage}\",\"help.usageShort\":\"usage: {usage}\",\"help.noHelp\":\"no help topics match `{name}'\",\"help.intro\":\"lilOS Terminal: a bash-like shell over the files of lilOS.\\n\\\"help command\\\" or \\\"command --help\\\" explains a command; \\\"help if\\\", \\\"help for\\\", \\\"help case\\\"… the syntax.\",\"help.syntaxList\":\"Syntax: {list}\",\"help.sh.summary\":\"Like bash.\",\"help.sh.usage\":\"sh [-c commands | script] [arguments…]\",\"help.bash.text\":\"\\\"bash script.sh a b\\\" runs the script with $1=a, $2=b; \\\"bash -c 'echo $1' name x\\\" runs the text; \\\"cat script.sh | bash\\\" reads the script from the input.\",\"help.bash.summary\":\"Runs a script or commands in a new shell.\",\"help.bash.usage\":\"bash [-c commands | script] [arguments…]\",\"help.sleep.summary\":\"Waits: 5 (seconds), 0.5, 2m, 1h.\",\"help.sleep.usage\":\"sleep duration…\",\"help.kill.summary\":\"Interrupts commands in the background.\",\"help.kill.usage\":\"kill [-signal] %job | pid…\",\"help.fg.summary\":\"Brings a command in the background to the foreground: it is waited for and Ctrl C interrupts it.\",\"help.wait.summary\":\"Waits for the commands in the background to finish (all of them, or the ones named).\",\"help.jobs.summary\":\"Lists the commands started in the background with &.\",\"help.clear.summary\":\"Clears the screen (Ctrl L too).\",\"help.help.summary\":\"Lists the commands, or explains the one named.\",\"help.help.usage\":\"help [command]\",\"help.history.summary\":\"Shows the commands given (the last n); -c clears the history.\",\"help.which.summary\":\"Tells where a command is.\",\"help.which.usage\":\"which name…\",\"help.command.summary\":\"Starts a command ignoring the functions with the same name; with -v tells what it would start.\",\"help.command.usage\":\"command [-v] name [arguments…]\",\"help.type.summary\":\"Tells what a name is: alias, keyword, function, command.\",\"help.type.usage\":\"type [-t] name…\",\"help.unalias.summary\":\"Removes aliases (all of them with -a).\",\"help.unalias.usage\":\"unalias [-a] name…\",\"help.alias.text\":\"Example: alias ll='ls -l'. Aliases work from the line after the one that defines them.\",\"help.alias.summary\":\"Defines or shows aliases (short names for commands).\",\"help.alias.usage\":\"alias [name[=value]…]\",\"help.eval.summary\":\"Runs the arguments, joined by spaces, as a command.\",\"help.eval.usage\":\"eval [arguments…]\",\"help.dot.summary\":\"Like source.\",\"help.dot.usage\":\". file [arguments…]\",\"help.source.summary\":\"Runs the commands of a file in this shell (variables, functions and aliases stay).\",\"help.source.usage\":\"source file [arguments…]\",\"help.read.text\":\"-r  backslashes stay as they are\\n-p  shows a prompt\\n-a  puts the words in an array\\n-d  reads up to this character instead of up to the newline\\n-s  does not show what is typed (for passwords)\\nStatus 1 at the end of the input.\",\"help.read.summary\":\"Reads a line and splits it into the variables named ($REPLY without names).\",\"help.read.usage\":\"read [-rs] [-p prompt] [-a array] [-d delim] [name…]\",\"help.continue.summary\":\"Goes on to the next round of the loop (or of the n-th enclosing loop).\",\"help.break.summary\":\"Exits the loop (or n loops).\",\"help.return.summary\":\"Exits the function (or the script read with source).\",\"help.return.usage\":\"return [status]\",\"help.exit.summary\":\"Closes the terminal (or exits the script) with a status.\",\"help.exit.usage\":\"exit [status]\",\"help.let.summary\":\"Computes arithmetic expressions (status 1 if the last one is 0).\",\"help.let.usage\":\"let expression…\",\"help.bracket.summary\":\"Like test, with a final \\\"]\\\".\",\"help.bracket.usage\":\"[ expression ]\",\"help.test.text\":\"Files: -e exists, -f is a file, -d is a directory, -s is not empty\\nText: -z empty, -n not empty, a = b, a != b\\nNumbers: -eq -ne -lt -le -gt -ge\\nCombined: ! not, -a and, -o or, ( … )\",\"help.test.summary\":\"Evaluates an expression: status 0 if true, 1 if false.\",\"help.test.usage\":\"test expression\",\"help.colon.summary\":\"Does nothing (status 0); the arguments are expanded anyway.\",\"help.colon.usage\":\": [arguments…]\",\"help.false.summary\":\"Does nothing, unsuccessfully (status 1).\",\"help.true.summary\":\"Does nothing, successfully (status 0).\",\"help.shift.summary\":\"Shifts the positional parameters: $2 becomes $1…\",\"help.set.text\":\"-e  exits at the first command that fails\\n-u  error when an unset variable is used\\n-x  shows the commands before running them\\n-f  no expansion of * and ?\\n-o pipefail  a pipeline fails if one of its commands fails\\n+e, +u… turn them off. Without arguments it shows every variable.\",\"help.set.summary\":\"Sets the options of the shell and the positional parameters ($1, $2…).\",\"help.set.usage\":\"set [-euxf] [-o option] [--] [arguments…]\",\"help.printenv.summary\":\"Shows the exported variables (or the value of the ones named).\",\"help.printenv.usage\":\"printenv [name…]\",\"help.env.summary\":\"Shows the exported variables, or starts a command with more variables.\",\"help.env.usage\":\"env [name=value…] [command [arguments…]]\",\"help.unset.summary\":\"Removes variables (or functions with -f).\",\"help.unset.usage\":\"unset [-fv] name…\",\"help.typeset.summary\":\"Like declare.\",\"help.typeset.usage\":\"typeset [-aprxifF] [name[=value]…]\",\"help.declare.text\":\"-a array, -x exported, -r read-only, -i integer (the value is computed), -p shows, -f shows the functions, -g global inside a function.\",\"help.declare.summary\":\"Declares variables and shows their attributes.\",\"help.declare.usage\":\"declare [-aprxifF] [name[=value]…]\",\"help.local.summary\":\"Variables visible only inside the function.\",\"help.local.usage\":\"local [-arx] name[=value]…\",\"help.readonly.summary\":\"Makes variables read-only.\",\"help.readonly.usage\":\"readonly [name[=value]…]\",\"help.export.text\":\"Without arguments it lists the exported variables. -n removes the export.\",\"help.export.summary\":\"Makes variables visible to the commands and scripts it starts.\",\"help.export.usage\":\"export [-n] [name[=value]…]\",\"help.printf.text\":\"The format is applied again while arguments are left. -v saves the result in a variable.\",\"help.printf.summary\":\"Writes the arguments according to a format (%s, %d, %5.2f, %x, %b, %q…).\",\"help.printf.usage\":\"printf [-v var] format [arguments…]\",\"help.echo.text\":\"-n  no final newline\\n-e  interprets \\\\n, \\\\t, \\\\\\\\, \\\\e… \\n-E  does not interpret them (default)\",\"help.echo.summary\":\"Writes the arguments, separated by a space.\",\"help.echo.usage\":\"echo [-neE] [text…]\",\"help.pwd.summary\":\"Shows the working directory.\",\"help.cd.text\":\"Without arguments it goes to the home ($HOME). \\\"cd -\\\" goes back to the previous directory ($OLDPWD).\",\"help.cd.summary\":\"Changes the working directory.\",\"help.cd.usage\":\"cd [dir]\",\"help.realpath.summary\":\"The full path.\",\"help.realpath.usage\":\"realpath [-m] path…\",\"help.dirname.summary\":\"The path without its last part.\",\"help.dirname.usage\":\"dirname path…\",\"help.basename.summary\":\"The last part of a path (without the suffix).\",\"help.basename.usage\":\"basename path [suffix]\",\"help.tree.summary\":\"Shows directories as a tree.\",\"help.tree.usage\":\"tree [-adf] [-L levels] [dir…]\",\"help.find.text\":\"Tests: -name pattern, -iname, -path, -type f|d|l, -empty, -size [+-]n[ckMG], -mtime [+-]days, -mmin, -newer file\\nActions: -print, -print0, -delete (to the trash), -exec command {} \\\\; or +\\nOptions: -maxdepth n, -mindepth n. Combined: ! (not), -o (or), ( … )\\nExample: find . -name \\\"*.txt\\\" -size +1k\",\"help.find.summary\":\"Searches for files and directories.\",\"help.find.usage\":\"find [path…] [expression]\",\"help.stat.text\":\"-c  format: %n name, %s size, %F type, %y modification date, %Y in seconds, %w %W creation, %i id\",\"help.stat.summary\":\"Shows the details of files and directories.\",\"help.stat.usage\":\"stat [-c format] path…\",\"help.rmdir.summary\":\"Removes empty directories (to the trash).\",\"help.rmdir.usage\":\"rmdir [-p] dir…\",\"help.rm.text\":\"-r  directories too, with their contents\\n-d  empty directories\\n-f  no error for what does not exist\\n--purge  deletes permanently, without the trash\\nWhat goes to the trash can be put back with \\\"trash restore\\\".\",\"help.rm.summary\":\"Moves files and directories to the trash (with --purge deletes them forever).\",\"help.rm.usage\":\"rm [-rfvd] [--purge] path…\",\"help.mv.text\":\"If the destination is a directory, it moves into it; otherwise it renames. An overwritten file goes to the trash.\\n-n  does not overwrite\\n-v  tells what it moves\",\"help.mv.summary\":\"Moves or renames files and directories.\",\"help.mv.usage\":\"mv [-nv] source… dest\",\"help.cp.text\":\"-r  copies directories too, with their contents\\n-n  does not overwrite existing files\\n-v  tells what it copies\",\"help.cp.summary\":\"Copies files and directories.\",\"help.cp.usage\":\"cp [-rnv] source… dest\",\"help.touch.summary\":\"Creates empty files, or updates the modification date of the ones that exist.\",\"help.mkdir.text\":\"-p  creates the intermediate directories too; no error if it already exists\",\"help.mkdir.summary\":\"Creates directories.\",\"help.mkdir.usage\":\"mkdir [-pv] dir…\",\"help.cat.text\":\"-n  numbers the lines\\n-b  numbers only the non-empty ones\\n-s  only one empty line in a row\\n-E  $ at the end of every line\",\"help.cat.summary\":\"Shows the contents of files (or of the input), one after the other.\",\"help.ls.text\":\"-l  details (type, size, date, tags)\\n-a  also the names starting with \\\".\\\"\\n-h  human-readable sizes (1.2K)\\n-t  by date, -S by size, -r reversed\\n-1  one per line\\n-d  the directory itself, not its contents\\n-R  subdirectories too\\n-F  / after directories, @ after links, * after scripts\",\"help.ls.summary\":\"Lists the contents of directories.\",\"help.ls.usage\":\"ls [-laAh1trSdRF] [path…]\",\"help.xargs.text\":\"-n N  at most N arguments at a time\\n-I {}  one command per line, with {} replaced by the line\\n-0  words separated by the null character (find -print0)\\n-d C  words separated by C\\n-t  shows the commands before starting them\\n-r  starts nothing if the input is empty\\nExample: find . -name \\\"*.tmp\\\" | xargs rm\",\"help.xargs.summary\":\"Starts a command with the words of the input as arguments.\",\"help.xargs.usage\":\"xargs [-n N] [-I {}] [-0] [-t] [command [arguments…]]\",\"help.yes.summary\":\"Repeats a line forever (y if not given): useful in a pipeline.\",\"help.yes.usage\":\"yes [text]\",\"help.seq.text\":\"-s S  separator (newline if not given)\\n-w  same width, padded with zeros\",\"help.seq.summary\":\"Writes a sequence of numbers.\",\"help.seq.usage\":\"seq [first [step]] last\",\"help.nl.summary\":\"Numbers the lines (non-empty ones, or all with -b a).\",\"help.rev.summary\":\"Writes every line reversed.\",\"help.tr.text\":\"tr a-z A-Z  to uppercase\\ntr -d '\\\\r'  removes Windows carriage returns\\ntr -s ' '  only one space in a row\\nClasses: [:upper:] [:lower:] [:digit:] [:alpha:] [:alnum:] [:space:] [:punct:]\",\"help.tr.summary\":\"Replaces or deletes characters.\",\"help.tr.usage\":\"tr [-dsc] set1 [set2]\",\"help.cut.text\":\"-f 1,3  fields 1 and 3 (separated by tab or by -d)\\n-d ,  the separator\\n-c 1-5  characters 1 to 5\\n-s  only the lines with the separator\",\"help.cut.summary\":\"Extracts columns from every line.\",\"help.cut.usage\":\"cut -f fields [-d separator] | -c characters [file…]\",\"help.tee.text\":\"-a  appends instead of overwriting\",\"help.tee.summary\":\"Copies the input both to the output and to files.\",\"help.uniq.text\":\"-c  with the number of repetitions\\n-d  only the repeated lines\\n-u  only the unique ones\\n-i  ignoring case\",\"help.uniq.summary\":\"Removes lines repeated one after the other (usually after sort).\",\"help.sort.text\":\"-r  reversed\\n-n  by number\\n-h  by human-readable size (2K, 1M)\\n-u  without duplicates\\n-f  ignoring case\\n-k N[,M]  by field N (up to M)\\n-t C  fields separated by C\\n-V  numbers inside the text (file2 before file10)\\n-o file  writes to the file\",\"help.sort.summary\":\"Sorts lines.\",\"help.sort.usage\":\"sort [-rnufhV] [-k field] [-t separator] [file…]\",\"help.grep.text\":\"-i  ignoring case\\n-v  the lines that do NOT match\\n-n  with the line number\\n-c  counts the lines\\n-l  only the names of the files\\n-r  searches in directories\\n-w  whole words, -x whole lines\\n-E  extended regular expressions (| + ? () without backslash)\\n-F  plain text, not a regular expression\\n-o  only the part that matches\\n-q  no output, only the status\\n-A N, -B N, -C N  lines of context after, before, around\\nStatus: 0 found, 1 not found, 2 error.\",\"help.grep.summary\":\"Searches for the lines that contain a pattern (regular expression).\",\"help.grep.usage\":\"grep [-ivnclrwxEFoqH] [-e pattern] pattern [file…]\",\"help.wc.text\":\"-l lines, -w words, -c bytes, -m characters, -L the longest line\",\"help.wc.summary\":\"Counts lines, words and bytes.\",\"help.tail.text\":\"-n N  the last N lines (-n +N: from line N on)\\n-c N  the last N characters\",\"help.tail.summary\":\"The last lines (10 if not given).\",\"help.tail.usage\":\"tail [-n lines] [-c bytes] [file…]\",\"help.head.text\":\"-n N  the first N lines (-n -N: all but the last N)\\n-c N  the first N characters\\n-5 is like -n 5\",\"help.head.summary\":\"The first lines (10 if not given).\",\"help.head.usage\":\"head [-n lines] [-c bytes] [file…]\",\"help.sed.text\":\"s/old/new/g  replaces (g: every time, i: ignoring case, p: prints)\\n3d, /re/d, 2,5d  deletes lines     -n …p  prints only the chosen ones\\ny/abc/xyz/  transliterates     a text, i text, c text  appends, inserts, changes\\n=  line number   q  quits   h H g G x  hold space   b t :label  jumps\\nAddresses: n, $, /re/, a,b, a,+n, ! to negate, { … } to group.\\n-n  does not print lines by itself    -E  extended regular expressions    -i  edits the files\\nExamples: sed 's/red/blue/g' notes.txt    sed -n '1,5p' file    sed -i '/^#/d' conf.txt\",\"help.sed.summary\":\"Edits text line by line (substitutions, deletions…).\",\"help.diff.text\":\"-u  unified format (with 3 lines of context; -U N for N)\\n-q  only tells whether they differ\\n-i  ignoring case\\n-w  ignoring spaces, -b ignoring how many there are\\n-B  ignoring empty lines\\n-s  tells also when they are identical\\n\\\"-\\\" is the input. Status: 0 same, 1 different, 2 error.\",\"help.diff.summary\":\"Shows the differences between two files.\",\"help.uname.summary\":\"The name of the operating system.\",\"help.hostname.summary\":\"The name of the system.\",\"help.whoami.summary\":\"The name of the user.\",\"help.date.text\":\"Format: %Y year, %m month, %d day, %H:%M:%S time, %A day of the week, %B month, %s seconds since 1970, %F = %Y-%m-%d, %T = %H:%M:%S\\n-d @1700000000, -d 2026-01-01, -d yesterday\\nExample: date +%F\",\"help.date.summary\":\"Date and time.\",\"help.date.usage\":\"date [-u] [-d date] [+format]\",\"help.apps.summary\":\"Lists the installed apps (id, name, version).\",\"help.tag.text\":\"tag                lists the tags\\ntag ls Work        the items with the tag\\ntag show file      the tags of an item\\ntag add Work f     puts the tag (creates it if missing)\\ntag rm Work f      removes it\\ntag new name color creates a tag\\ntag delete name    deletes a tag\",\"help.tag.summary\":\"The tags of lilOS: lists, assigns, removes.\",\"help.tag.usage\":\"tag [ls [tag…] | show path… | add tag path… | rm tag path… | new name [color] | delete tag…]\",\"help.trash.text\":\"trash              lists what is in the trash\\ntrash put file     moves to the trash (like rm -r)\\ntrash restore name puts back\\ntrash rm name      deletes permanently\\ntrash empty        empties the trash\",\"help.trash.summary\":\"The trash: lists, puts back, empties.\",\"help.trash.usage\":\"trash [list | put path… | restore name… | rm name… | empty]\",\"help.open.text\":\"open notes.txt   opens with the default app\\nopen .   opens the directory in the File Manager\\nopen -a editor notes.txt   with a given app\\nopen -a photo   starts an app\",\"help.open.summary\":\"Opens files and directories with their app (or with the one given).\",\"help.open.usage\":\"open [-a app] path…\",\"arith.tooDeep\":\"expression recursion level exceeded\",\"arith.syntax\":\"{expr}: syntax error in expression (error token is \\\"{token}\\\")\",\"arith.end\":\"end\",\"arith.missingBracket\":\"{expr}: missing `]'\",\"arith.operandExpected\":\"{expr}: syntax error: operand expected\",\"arith.badBase\":\"{value}: invalid arithmetic base\",\"arith.tooGreatForBase\":\"{value}: value too great for base\",\"arith.invalid\":\"invalid expression\",\"arith.divisionByZero\":\"division by 0\",\"arith.negativeExponent\":\"exponent less than 0\",\"arith.unknownOperator\":\"unknown operator {op}\",\"expand.braceTooLarge\":\"brace expansion too large\",\"expand.badSubstitution\":\"{name}: bad substitution\",\"expand.unbound\":\"{name}: unbound variable\",\"expand.cannotAssign\":\"{name}: cannot assign in this way\",\"expand.nullOrNotSet\":\"parameter null or not set\",\"expand.negativeSubstring\":\"{count}: substring expression < 0\",\"opt.invalid\":\"invalid option -- '{option}'\",\"opt.longNeedsArgument\":\"option '--{name}' requires an argument\",\"opt.needsArgument\":\"option requires an argument -- '{option}'\",\"opt.badNumber\":\"invalid number: '{value}'\",\"regex.unmatchedBracket\":\"Unmatched [ in regular expression\",\"regex.invalid\":\"invalid regular expression: {pattern}\",\"appCmd.summary\":\"A command of the {app} app.\",\"appCmd.usage\":\"{name} [arguments…]\",\"printf.badNumber\":\"{value}: invalid number\",\"test.argumentExpected\":\"argument expected\",\"test.unexpectedArgument\":\"{arg}: unexpected argument\",\"test.missingBracket\":\"missing `]'\",\"cd.oldpwdNotSet\":\"OLDPWD not set\",\"local.onlyInFunction\":\"can only be used in a function\",\"set.badOptionName\":\"{name}: invalid option name\",\"set.badOption\":\"{option}: invalid option\",\"let.noExpression\":\"expression expected\",\"return.onlyInFunction\":\"can only `return' from a function or sourced script\",\"loop.onlyInLoop\":\"only meaningful in a `for', `while', or `until' loop\",\"loop.badCount\":\"{n}: loop count out of range\",\"alias.badName\":\"`{name}': invalid alias name\",\"which.builtIn\":\"{name}: built into the Terminal\",\"wait.notAJob\":\"{spec}: not a job of this shell\",\"fg.noSuchJob\":\"{job}: no such job\",\"fg.current\":\"current\",\"kill.noSuchJob\":\"{spec}: no such job or process\",\"sleep.missing\":\"missing operand\",\"sleep.badDuration\":\"invalid time interval '{value}'\",\"source.noFile\":\"filename argument required\",\"bash.noCommand\":\"-c: option requires an argument\",\"bash.already\":\"You are already in bash: for a script type \\\"bash file.sh\\\" or \\\"source file.sh\\\".\",\"type.alias\":\"{name} is aliased to `{value}'\",\"type.keyword\":\"{name} is a shell keyword\",\"type.function\":\"{name} is a function\",\"type.builtin\":\"{name} is a shell builtin\",\"type.appCommand\":\"{name} is a command of the {app} app\",\"type.command\":\"{name} is a Terminal command\",\"type.file\":\"{name} is {path}\",\"syntax.topic.variables\":\"variables\",\"syntax.topic.redirections\":\"redirections\",\"syntax.if\":\"if commands; then commands; [elif commands; then commands;] [else commands;] fi\\nRuns the branch of the first \\\"if\\\"/\\\"elif\\\" whose commands succeed (status 0).\\n  if [ -f notes.txt ]; then echo found; else echo missing; fi\",\"syntax.for\":\"for name in words…; do commands; done\\nfor (( init; condition; step )); do commands; done\\n  for f in *.txt; do wc -l \\\"$f\\\"; done\\n  for ((i = 1; i <= 3; i++)); do echo $i; done\",\"syntax.while\":\"while commands; do commands; done   (until: as long as the commands do NOT succeed)\\n  n=0; while [ $n -lt 3 ]; do echo $n; n=$((n + 1)); done\\n  ls | while read -r name; do echo \\\"- $name\\\"; done\",\"syntax.until\":\"until commands; do commands; done: repeats as long as the commands do not succeed.\",\"syntax.case\":\"case word in pattern|pattern) commands;; … esac\\nPatterns use * ? [ ]. \\\";&\\\" goes on into the next branch, \\\";;&\\\" tries the following patterns too.\\n  case \\\"$f\\\" in *.txt) echo text;; *.png|*.jpg) echo image;; *) echo other;; esac\",\"syntax.function\":\"name() { commands; }   or   function name { commands; }\\nThe arguments are $1, $2…, $@; \\\"local\\\" creates variables of the function, \\\"return n\\\" exits.\\n  greet() { echo \\\"Hello, $1\\\"; }; greet Eugenio\",\"syntax.cond\":\"[[ expression ]]: test without word splitting or expansion of *.\\n  [[ $name == *.txt ]]      comparison with a pattern\\n  [[ $s =~ ^[0-9]+$ ]]      regular expression (groups in BASH_REMATCH)\\n  [[ -d dir && ! -e file ]] -e -f -d -s -z -n, && || ! ( )\",\"syntax.arith\":\"(( expression )): integer arithmetic; status 0 if the result is not 0.\\n  (( n++ )); (( n > 3 )) && echo big; echo $(( 2 ** 10 ))\",\"syntax.variables\":\"name=value (no spaces), $name or ${name}. Arrays: a=(x y z), ${a[0]}, ${a[@]}, ${#a[@]}.\\n${v:-default} ${v:=default} ${v:+alt} ${#v} ${v#prefix} ${v%suffix} ${v/from/to} ${v//from/to} ${v:start:length} ${v^^} ${v,,}\\nSpecial: $? status of the last command, $$ the shell, $! the last command in the background, $# $@ $* the arguments.\",\"syntax.redirections\":\"> file (overwrites), >> file (appends), < file (reads), 2> errors, 2>&1, &> file, <<EOF … EOF, <<< text, | pipe.\\n/dev/null discards everything.\",\"files.cannotAccess\":\"cannot access '{path}': No such file or directory\",\"files.cannotCreate\":\"cannot create '{path}': No such file or directory\",\"files.overwriteFolder\":\"cannot overwrite directory '{name}' with non-directory\",\"files.missingDestination\":\"missing destination file operand after '{path}'\",\"files.targetNotFolder\":\"target '{path}' is not a directory\",\"files.cannotStat\":\"cannot stat '{path}': No such file or directory\",\"files.cannotRemove\":\"cannot remove '{path}': {reason}\",\"files.quotedNoSuchFile\":\"'{path}': No such file or directory\",\"mkdir.notAFolder\":\"cannot create directory '{path}': '{name}' exists and is not a directory\",\"mkdir.exists\":\"cannot create directory '{path}': File exists\",\"mkdir.noParent\":\"cannot create directory '{path}': No such file or directory\",\"mkdir.created\":\"created directory '{path}'\",\"cp.overwriteFile\":\"cannot overwrite non-directory '{name}' with directory\",\"cp.verbose\":\"'{from}' -> '{to}'\",\"cp.omitting\":\"-r not specified; omitting directory '{path}'\",\"cp.intoItself\":\"cannot copy a directory, '{path}', into itself\",\"mv.system\":\"cannot move '{path}': it is a system folder\",\"mv.intoItself\":\"cannot move '{path}' to a subdirectory of itself\",\"mv.notEmpty\":\"cannot move '{path}' to '{name}': Directory not empty\",\"mv.verbose\":\"renamed '{from}' -> '{to}'\",\"reason.noSuchFile\":\"No such file or directory\",\"reason.isADirectory\":\"Is a directory\",\"reason.notADirectory\":\"Not a directory\",\"reason.notEmpty\":\"Directory not empty\",\"reason.system\":\"it is a system folder\",\"reason.containsSystem\":\"it contains system folders\",\"rm.home\":\"it is dangerous to operate on '{path}': it is the home\",\"rm.purged\":\"permanently deleted '{path}'\",\"rm.trashed\":\"moved to the trash '{path}'\",\"rmdir.removed\":\"removed directory '{path}'\",\"stat.folder\":\"directory\",\"stat.appLink\":\"link to the app {app}\",\"stat.file\":\"regular file\",\"stat.emptyFile\":\"regular empty file\",\"stat.type\":\"Type: {type}\",\"stat.path\":\"Path: {path}\",\"stat.items\":\"Items: {n} ({total} in all)\",\"stat.size\":\"Size: {size} bytes ({human})\",\"stat.created\":\"Created: {date}\",\"stat.modified\":\"Modified: {date}\",\"stat.tags\":\"Tags: {tags}\",\"stat.system\":\"System folder\",\"find.missingArgument\":\"missing argument to `{name}'\",\"find.badType\":\"unknown argument to -type: {type} (f, d or l)\",\"find.badSize\":\"invalid -size argument '{value}'\",\"find.badValue\":\"invalid argument '{value}' to {option}\",\"find.cannotFind\":\"cannot find '{path}'\",\"find.execEnd\":\"missing end of `-exec' (`;' or `+')\",\"find.execCommand\":\"missing command of `-exec'\",\"find.unknownPredicate\":\"unknown predicate `{name}'\",\"find.unexpected\":\"unexpected argument: '{arg}'\",\"tree.folders\":{\"one\":\"{n} directory\",\"other\":\"{n} directories\"},\"tree.files\":{\"one\":\"{n} file\",\"other\":\"{n} files\"},\"ls.date\":\"{month} {day}\",\"wc.total\":\"total\",\"grep.noPattern\":\"missing pattern\\nUsage: grep [options] pattern [file…]\",\"sort.badKey\":\"invalid key: '{key}'\",\"sort.disorder\":\"-:{n}: disorder: {line}\",\"cut.badList\":\"invalid list: '{spec}'\",\"cut.noList\":\"you must specify a list of fields (-f) or characters (-c)\",\"cut.badDelimiter\":\"the delimiter must be a single character\",\"tr.reverseRange\":\"range-endpoints of '{range}' are in reverse collating sequence order\",\"tr.missingSet2\":\"missing operand after '{set}'\",\"seq.badArgument\":\"invalid floating point argument: '{value}'\",\"seq.zeroStep\":\"invalid Zero increment value: '0'\",\"xargs.unmatchedDouble\":\"unmatched double quote\",\"xargs.unmatchedSingle\":\"unmatched single quote\",\"xargs.badCount\":\"value for -n option should be >= 1\",\"sed.at\":\"-e expression #1, char {pos}: {message}\",\"sed.unterminated\":\"unterminated `s' command\",\"sed.badAddress\":\"invalid address\",\"sed.missingAddress\":\"missing second address\",\"sed.missingCommand\":\"missing command\",\"sed.unexpectedBrace\":\"unexpected `}'\",\"sed.badDelimiter\":\"invalid delimiter for `s'\",\"sed.yLengths\":\"strings for `y' command are different lengths\",\"sed.noLabel\":\"\\\":\\\" lacks a label\",\"sed.unknownCommand\":\"unknown command: `{cmd}'\",\"sed.unmatchedBrace\":\"unmatched `{'\",\"sed.noSuchLabel\":\"can't find label for jump to `{label}'\",\"sed.noPreviousRegex\":\"no previous regular expression\",\"sed.cannotRead\":\"can't read {path}: No such file or directory\",\"sed.noScript\":\"missing script\\nUsage: sed [-n] [-E] [-i] script [file…]\",\"sed.noFiles\":\"no input files to edit with -i\",\"diff.missingOperand\":\"missing operand after '{arg}'\",\"diff.extraOperand\":\"extra operand '{arg}'\",\"diff.identical\":\"Files {a} and {b} are identical\",\"diff.differ\":\"Files {a} and {b} differ\",\"diff.tooBig\":\"the files are too different and too large to compare\",\"open.noApp\":\"app not found: '{app}' (see \\\"apps\\\")\",\"trash.notInTrash\":\"'{name}' is not in the trash\",\"trash.empty\":\"The trash is empty.\",\"trash.deletedFolder\":\"(deleted folder)\",\"trash.items\":{\"one\":\"{n} item\",\"other\":\"{n} items\"},\"trash.missingPut\":\"missing what to move to the trash\",\"trash.cannotTrash\":\"{path}: cannot be moved to the trash (system folder)\",\"trash.missingRestore\":\"missing the name of what to put back\",\"trash.restored\":\"restored to {path}\",\"trash.missingName\":\"missing name\",\"trash.purged\":{\"one\":\"permanently deleted {n} item\",\"other\":\"permanently deleted {n} items\"},\"trash.emptied\":{\"one\":\"Trash emptied ({n} item).\",\"other\":\"Trash emptied ({n} items).\"},\"trash.alreadyEmpty\":\"The trash was already empty.\",\"tag.noSuchTag\":\"no such tag: '{name}' (see \\\"tag ls\\\")\",\"tag.none\":\"No tags. Create one with \\\"tag new name\\\".\",\"tag.hidden\":\"hidden\",\"tag.noTags\":\"no tags\",\"tag.usageAddRm\":\"tag {sub} name file…\",\"tag.created\":\"created tag '{name}'\",\"tag.system\":\"{path}: system items have no tags\",\"tag.usageNew\":\"tag new name [color]\",\"tag.createdShown\":\"created tag {tag}\",\"tag.usageDelete\":\"tag delete name…\",\"date.formatC\":\"%a %b %e %H:%M:%S %Y\",\"date.formatX\":\"%m/%d/%y\",\"date.format\":\"%a %b %e %H:%M:%S %Z %Y\",\"date.invalid\":\"invalid date '{date}'\",\"@actions.terminal.sshHere.label\":\"Open SSH terminal here\",\"help.ssh.summary\":\"open an SSH session in a new tab\",\"help.ssh.usage\":\"ssh [-p port] [-l user] [user@]host [command] | ssh <saved host>\",\"help.telnet.summary\":\"open a Telnet session in a new tab\",\"help.telnet.usage\":\"telnet [-l user] host [port] | telnet <saved host>\",\"help.rlogin.summary\":\"open an rlogin session in a new tab\",\"help.rlogin.usage\":\"rlogin [-l user] host | rlogin <saved host>\",\"help.supdup.summary\":\"open a SUPDUP session in a new tab\",\"help.supdup.usage\":\"supdup host [port] | supdup <saved host>\",\"help.sessions.summary\":\"the remote sessions still running; with a number, shows one in a tab\",\"help.sessions.usage\":\"sessions [n]\",\"remote.cmd.unavailable\":\"remote sessions are not available (lilOS has no module for them)\",\"remote.cmd.noModule\":\"{name}: lilOS has no module for it (an administrator installs {module} from the AppStore, Kernel tab)\",\"remote.cmd.opened\":\"Opened in a new tab: {name}\",\"remote.cmd.noUser\":\"ssh: a user is needed: user@host or -l user\",\"remote.cmd.noSession\":\"no running session «{name}» (see «sessions»)\",\"remote.cmd.shown\":\"Shown in a tab: {name}\",\"remote.cmd.shownNow\":\"shown in a window\",\"remote.cmd.closesIn\":{\"one\":\"closes in {n} minute\",\"other\":\"closes in {n} minutes\"},\"remote.cmd.none\":\"No remote session is running.\",\"remote.cmd.resumeHint\":\"«sessions <n>» shows one in a tab\",\"remote.tabs\":\"Tabs\",\"remote.screen\":\"Remote terminal\",\"remote.newShell\":\"New shell\",\"remote.activity\":\"New output\",\"remote.closeTab\":\"Close tab\",\"remote.closeSession\":\"Close (ends the session)\",\"remote.closeNamed\":\"Close {name}\",\"remote.close\":\"Close\",\"remote.cancel\":\"Cancel\",\"remote.notRemote\":\"it is not in a network connection\",\"remote.notSftp\":\"the SSH terminal opens only on SFTP connections\",\"remote.cannotReconnect\":\"this session cannot be opened again from here: open it again from the File Manager\",\"remote.unavailable\":\"The remote sessions cannot be reached: {error}\",\"remote.noProtocols\":\"lilOS has no module for remote sessions. An administrator can install term-ssh, term-telnet, term-rlogin or term-supdup from the AppStore (Kernel tab).\",\"remote.side.label\":\"Hosts and remote sessions\",\"remote.side.toggle\":\"Show or hide the hosts\",\"remote.side.hosts\":\"Hosts\",\"remote.side.connect\":\"Connect\",\"remote.side.open\":\"A session is open on this host\",\"remote.side.none\":\"No saved hosts. «ssh user@server» opens a session; + saves a host.\",\"remote.side.running\":\"Still running\",\"remote.side.elsewhere\":\"in another window\",\"remote.side.closesIn\":{\"one\":\"closes in {n} minute\",\"other\":\"closes in {n} minutes\"},\"remote.side.resume\":\"Resume\",\"remote.taken\":\"The session was opened in another window\",\"remote.takeBack\":\"Show it here\",\"remote.lostLink\":\"The link with lilOS dropped\",\"remote.attachAgain\":\"Attach again\",\"remote.secure\":\"Encrypted\",\"remote.insecure\":\"Not encrypted\",\"remote.insecureHint\":\"What you type, passwords included, goes over the network in clear\",\"remote.cipher\":\"Cipher: {cipher}\",\"remote.state.new\":\"Waiting\",\"remote.state.connecting\":\"Connecting…\",\"remote.state.on\":\"Connected\",\"remote.state.closed\":\"Closed\",\"remote.find\":\"Find (Ctrl+Shift+F)\",\"remote.find.count\":\"{i} of {n}\",\"remote.find.none\":\"None\",\"remote.find.prev\":\"Previous (Shift+Enter)\",\"remote.find.next\":\"Next (Enter)\",\"remote.record\":\"Record the session in a file\",\"remote.recordStop\":\"Stop recording\",\"remote.keys\":\"Keys\",\"remote.keys.send\":\"Send to the server:\",\"remote.keys.copy\":\"Copy\",\"remote.keys.paste\":\"Paste: Ctrl+Shift+V\",\"remote.keys.clear\":\"Clear the history\",\"remote.keys.disconnect\":\"Disconnect\",\"remote.signal.break\":\"Send Break\",\"remote.signal.interrupt\":\"Interrupt process\",\"remote.signal.ayt\":\"Are you there?\",\"remote.reconnect\":\"Reconnect\",\"remote.closed\":\"Connection closed\",\"remote.closedWhy\":\"Connection closed: {reason}\",\"remote.trust.title\":\"Confirm the server {host}\",\"remote.trust.changedTitle\":\"The key of {host} changed\",\"remote.trust.first\":\"First connection to this server. Check that the key fingerprint is the server's (whoever runs it can tell you).\",\"remote.trust.firstTls\":\"The certificate of this server is not valid for its name or is not signed by a known authority. Check its fingerprint before going on.\",\"remote.trust.changedText\":\"Warning: it may not be your server. It shows a different key from the one you confirmed: it may have been reinstalled, or someone may be in between. Go on only if you know why it changed.\",\"remote.trust.server\":\"Server\",\"remote.trust.key\":\"Key\",\"remote.trust.certificate\":\"Certificate\",\"remote.trust.previous\":\"Key confirmed before\",\"remote.trust.ask\":\"Continue if it is your server.\",\"remote.trust.askChanged\":\"Continue only to trust the new key.\",\"remote.record.title\":\"Record the session\",\"remote.record.file\":\"File\",\"remote.record.hint\":\"A file in your home. It is written while you work; it stops at 8 MB.\",\"remote.record.colors\":\"Keep the color codes (to see it again as it was)\",\"remote.record.start\":\"Record\",\"remote.record.badPath\":\"The folder does not exist: write a path such as ~/Documenti/session.txt\",\"remote.record.exists\":\"«{name}» exists already: choose another name\",\"remote.record.full\":\"Recording stopped: «{path}» reached its size limit\",\"remote.record.failed\":\"The recording could not be saved: {error}\",\"remote.record.saved\":\"Session recorded in «{path}»\",\"remote.host.newTitle\":\"New host\",\"remote.host.editTitle\":\"Change the host\",\"remote.host.name\":\"Name\",\"remote.host.folder\":\"Folder\",\"remote.host.folderNone\":\"None\",\"remote.host.protocol\":\"Protocol\",\"remote.host.kept\":\"•••••• (saved: empty keeps it)\",\"remote.host.noProtocols\":\"No protocol available.\",\"remote.host.insecureTitle\":\"Connection not encrypted\",\"remote.host.insecureText\":\"What you type, passwords included, goes over the network in clear. Use it only on networks you trust or with devices that have no SSH.\",\"remote.host.remember\":\"Remember passwords and passphrases\",\"remote.host.keyUnreadable\":\"The key file cannot be read: {error}\",\"remote.host.advanced\":\"Advanced\",\"remote.host.term\":\"Terminal type\",\"remote.host.encoding\":\"Encoding\",\"remote.host.backspace\":\"Backspace sends\",\"remote.host.backspaceDel\":\"DEL (^?)\",\"remote.host.backspaceBs\":\"BS (^H)\",\"remote.host.delete\":\"Delete\",\"remote.host.save\":\"Save\",\"remote.host.saveConnect\":\"Save and connect\",\"@entrypoints.filePreview.label\":\"Previews of .term links\",\"@commands.terminal.newShell.label\":\"New shell\",\"@commands.terminal.splitRight.label\":\"Split right\",\"@commands.terminal.splitDown.label\":\"Split down\",\"@commands.terminal.detach.label\":\"Detach tab into a new window\",\"@commands.terminal.broadcast.label\":\"Send input to all panes\",\"@commands.terminal.focusLeft.label\":\"Pane on the left\",\"@commands.terminal.focusRight.label\":\"Pane on the right\",\"@commands.terminal.focusUp.label\":\"Pane above\",\"@commands.terminal.focusDown.label\":\"Pane below\",\"@commands.terminal.previousTab.label\":\"Previous tab of the pane\",\"@commands.terminal.nextTab.label\":\"Next tab of the pane\",\"@commands.terminal.moveLeft.label\":\"Move tab to the left\",\"@commands.terminal.moveRight.label\":\"Move tab to the right\",\"@commands.terminal.moveUp.label\":\"Move tab up\",\"@commands.terminal.moveDown.label\":\"Move tab down\",\"tabs.count\":{\"one\":\"{n} tab\",\"other\":\"{n} tabs\"},\"tabs.pane\":\"Pane {n} — {name}\",\"tabs.rename\":\"Rename…\",\"tabs.renameLabel\":\"Tab name\",\"tabs.renameHint\":\"Empty: the usual name (the folder, or the server).\",\"tabs.renameOk\":\"Rename\",\"tabs.duplicate\":\"Duplicate\",\"tabs.splitRight\":\"Split right\",\"tabs.splitDown\":\"Split down\",\"tabs.moveToPane\":\"Move to pane\",\"tabs.detach\":\"Detach into a new window\",\"tabs.moveToWindow\":\"Move to window\",\"tabs.newWindow\":\"New window\",\"tabs.saveTerm\":\"Save as link (.term)…\",\"tabs.addToDesk\":\"Add to desk\",\"tabs.copyAddress\":\"Copy address\",\"tabs.closeOthers\":\"Close other tabs\",\"tabs.closeRight\":\"Close tabs to the right\",\"grid.gutter\":\"Drag to resize the panes; double click: same size\",\"grid.broadcast\":\"Send input to all panes\",\"grid.broadcastOn\":\"Input to all panes\",\"grid.broadcastOff\":\"What you type goes to the tab shown in every pane. Click to turn it off.\",\"menu.title\":\"Terminal menu\",\"menu.openTerm\":\"Open link (.term)…\",\"menu.openTermTitle\":\"Open a terminal link\",\"drag.newWindow\":\"Drop to open {name} in a new window\",\"drag.pane\":\"Move to this pane\",\"drag.split.left\":\"New pane on the left\",\"drag.split.right\":\"New pane on the right\",\"drag.split.up\":\"New pane above\",\"drag.split.down\":\"New pane below\",\"file.invalid\":\"This is not a terminal link (.term) or it is damaged\",\"file.missing\":\"The link does not exist any more\",\"file.cannot\":\"This tab cannot become a link\",\"file.noFolder\":\"The folder {path} does not exist\",\"file.serverFolder\":\"The folder of the server must be a full path, such as /var/www\",\"file.exists\":\"There is already a file named {name} in that folder\",\"file.noPassword\":\"Type the password (or the key) to keep in the file\",\"file.onDesk\":\"{name} is on the desk\",\"file.saved\":\"Link saved: {path}\",\"file.saveTitle\":\"Save link\",\"file.name\":\"File name\",\"file.folder\":\"Folder\",\"file.change\":\"Change…\",\"file.pickFolder\":\"Where to save the link\",\"file.cwdLocal\":\"Start in the folder (optional)\",\"file.cwdRemote\":\"Folder of the server to start in (optional)\",\"file.command\":\"Command to run at the start (optional)\",\"file.commandRemote\":\"Command at start (optional)\",\"file.commandRemoteHint\":\"Runs instead of the shell of the server\",\"file.openAs\":\"When opened\",\"file.openDefault\":\"As in the Options ({how})\",\"file.keepPassword\":\"Keep the password in the file\",\"file.passwordSaved\":\"The password saved for this host goes in the file.\",\"file.passwordHint\":\"The password is encrypted: it works only for you, on this lilOS, for this server and user. For anyone else it is asked as usual.\",\"file.save\":\"Save\",\"file.command.title\":\"This link runs a command\",\"file.command.text\":\"«{name}» runs this command when it opens:\\n\\n{command}\\n\\nRun it only if you trust who made the link. Continue?\",\"options.open\":\"Options…\",\"options.title\":\"Terminal options\",\"options.tab.general\":\"General\",\"options.tab.generalDescription\":\"How Terminal opens links\",\"options.files\":\"Terminal links (.term)\",\"options.openTerm\":\"Open the links\",\"options.openTermDescription\":\"Where a .term file opens with a double click, when the file does not say it itself\",\"options.openTerm.window\":\"In a new window\",\"options.openTerm.tab\":\"In a tab of the open window\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Terminale\",\"@description\":\"Una shell simile a bash sui file di lilOS, in schede e riquadri affiancati, e sessioni remote: SSH, Telnet, rlogin e SUPDUP, con host salvati, collegamenti .term e sessioni che restano aperte anche a finestra chiusa.\",\"@entrypoints.main.params.cwd.label\":\"Cartella\",\"@entrypoints.main.params.cwd.description\":\"La cartella in cui aprire il terminale\",\"@automation.terminal.run.label\":\"Esegui un comando\",\"@automation.terminal.run.params.command.label\":\"Comando\",\"@automation.terminal.run.params.folder.label\":\"Cartella\",\"@automation.terminal.run.params.folder.description\":\"La cartella di lavoro in cui gira il comando\",\"@entrypoints.main.params.file.label\":\"Collegamento\",\"@entrypoints.main.params.file.description\":\"Un collegamento al terminale (.term) da aprire\",\"ui.title\":\"Terminale\",\"ui.commandLine\":\"Riga di comando\",\"ui.welcome\":\"Terminale di lilOS · «help» elenca i comandi\",\"automation.tooLong\":\"Comando troppo lungo da registrare\",\"automation.noCommand\":\"Nessun comando da eseguire\",\"automation.busy\":\"Il terminale sta eseguendo un altro comando\",\"automation.noFolder\":\"La cartella non c’è più\",\"automation.status\":\"Il comando è finito con lo stato {status}\",\"shell.defaultUser\":\"utente\",\"shell.readonly\":\"{name}: variabile in sola lettura\",\"shell.cannotUnset\":\"{name}: impossibile eliminare: variabile in sola lettura\",\"shell.badSubscript\":\"{index}: indice dell’array non valido\",\"shell.unknownConstruct\":\"costrutto sconosciuto: {type}\",\"shell.badRegex\":\"espressione regolare non valida\",\"shell.unaryExpected\":\"{op}: operatore unario atteso\",\"shell.integerExpected\":\"{value}: è attesa un’espressione intera\",\"shell.binaryExpected\":\"{op}: operatore binario atteso\",\"shell.commandNotFound\":\"{name}: comando non trovato\",\"shell.tooDeep\":\"{name}: troppi livelli di ricorsione\",\"shell.badFd\":\"{fd}: descrittore di file errato\",\"shell.fdExpected\":\"{target}: è richiesto un descrittore di file\",\"shell.ambiguousRedirect\":\"{target}: redirezione ambigua\",\"shell.isAppLink\":\"{path}: è un collegamento a un’app\",\"err.noSuchFile\":\"{path}: file o cartella inesistente\",\"err.isADirectory\":\"{path}: è una cartella\",\"err.notAFile\":\"{path}: non è un file\",\"err.missingParen\":\"manca «)»\",\"err.badIdentifier\":\"«{name}»: identificatore non valido\",\"err.numericArgument\":\"{value}: è richiesto un argomento numerico\",\"err.tooManyArguments\":\"troppi argomenti\",\"err.notADirectory\":\"{path}: non è una cartella\",\"err.notFound\":\"{name}: non trovato\",\"err.missingOperand\":\"manca l’operando\",\"err.unknownSubcommand\":\"sottocomando sconosciuto: «{sub}»\",\"parse.unexpectedEnd\":\"errore di sintassi: fine del testo inattesa\",\"parse.unexpectedEndOfFile\":\"errore di sintassi: fine del file inattesa\",\"parse.nearEnd\":\"fine del testo\",\"parse.nearNewline\":\"a capo\",\"parse.nearToken\":\"«{token}»\",\"parse.near\":\"errore di sintassi vicino a {near}\",\"parse.nearExpected\":\"errore di sintassi vicino a {near}: atteso «{expected}»\",\"parse.badFunctionName\":\"nome di funzione non valido\",\"parse.parenAfterName\":\"atteso «)» dopo il nome della funzione\",\"parse.aliasLoop\":\"alias espansi troppe volte\",\"parse.missingTarget\":\"errore di sintassi vicino a {near}: manca la destinazione di «{op}»\",\"parse.forBadName\":\"for: nome di variabile non valido\",\"parse.caseNoWord\":\"case: manca la parola\",\"parse.condNear\":\"errore di sintassi in [[ vicino a {near}\",\"parse.condNoOperand\":\"errore di sintassi in [[: manca un operando\",\"parse.condNoRegex\":\"errore di sintassi in [[: manca l’espressione regolare\",\"parse.badSubstitution\":\"sostituzione errata\",\"parse.badSubstitutionBrace\":\"sostituzione errata: manca «}»\",\"parse.backquotes\":\"errore di sintassi tra gli apici inversi\",\"jobs.done\":\"Fatto\",\"jobs.interrupted\":\"Interrotto\",\"jobs.exit\":\"Uscita {code}\",\"jobs.running\":\"In esecuzione\",\"help.usageLine\":\"Uso: {usage}\",\"help.usageShort\":\"uso: {usage}\",\"help.noHelp\":\"nessun aiuto per «{name}»\",\"help.intro\":\"Terminale di lilOS: una shell come bash sui file di lilOS.\\n«help comando» o «comando --help» spiega un comando; «help if», «help for», «help case»… la sintassi.\",\"help.syntaxList\":\"Sintassi: {list}\",\"help.sh.summary\":\"Come bash.\",\"help.sh.usage\":\"sh [-c comandi | script] [argomenti…]\",\"help.bash.text\":\"«bash script.sh a b» esegue lo script con $1=a, $2=b; «bash -c 'echo $1' nome x» esegue il testo; «cat script.sh | bash» legge lo script dall’input.\",\"help.bash.summary\":\"Esegue uno script o dei comandi in una nuova shell.\",\"help.bash.usage\":\"bash [-c comandi | script] [argomenti…]\",\"help.sleep.summary\":\"Aspetta: 5 (secondi), 0.5, 2m, 1h.\",\"help.sleep.usage\":\"sleep durata…\",\"help.kill.summary\":\"Interrompe dei comandi in background.\",\"help.kill.usage\":\"kill [-segnale] %job | pid…\",\"help.fg.summary\":\"Porta in primo piano un comando in background: lo si aspetta e Ctrl C lo interrompe.\",\"help.wait.summary\":\"Aspetta che finiscano i comandi in background (tutti, o quelli indicati).\",\"help.jobs.summary\":\"Elenca i comandi avviati in background con &.\",\"help.clear.summary\":\"Pulisce lo schermo (anche Ctrl L).\",\"help.help.summary\":\"Elenca i comandi, o spiega quello indicato.\",\"help.help.usage\":\"help [comando]\",\"help.history.summary\":\"Mostra i comandi dati (gli ultimi n); -c cancella la cronologia.\",\"help.which.summary\":\"Dice dove si trova un comando.\",\"help.which.usage\":\"which nome…\",\"help.command.summary\":\"Avvia un comando ignorando le funzioni con lo stesso nome; con -v dice cosa avvierebbe.\",\"help.command.usage\":\"command [-v] nome [argomenti…]\",\"help.type.summary\":\"Dice cos’è un nome: alias, parola chiave, funzione, comando.\",\"help.type.usage\":\"type [-t] nome…\",\"help.unalias.summary\":\"Elimina degli alias (tutti con -a).\",\"help.unalias.usage\":\"unalias [-a] nome…\",\"help.alias.text\":\"Esempio: alias ll='ls -l'. Gli alias valgono dalla riga successiva a quella che li definisce.\",\"help.alias.summary\":\"Definisce o mostra gli alias (nomi brevi per comandi).\",\"help.alias.usage\":\"alias [nome[=valore]…]\",\"help.eval.summary\":\"Esegue gli argomenti, uniti da spazi, come un comando.\",\"help.eval.usage\":\"eval [argomenti…]\",\"help.dot.summary\":\"Come source.\",\"help.dot.usage\":\". file [argomenti…]\",\"help.source.summary\":\"Esegue i comandi di un file in questa shell (variabili, funzioni e alias restano).\",\"help.source.usage\":\"source file [argomenti…]\",\"help.read.text\":\"-r  le barre rovesciate restano come sono\\n-p  mostra un prompt\\n-a  mette le parole in un array\\n-d  legge fino a questo carattere invece che fino all’a capo\\n-s  non mostra ciò che si scrive (per le password)\\nStato 1 alla fine dell’input.\",\"help.read.summary\":\"Legge una riga e la divide nelle variabili indicate ($REPLY senza nomi).\",\"help.read.usage\":\"read [-rs] [-p prompt] [-a array] [-d delim] [nome…]\",\"help.continue.summary\":\"Passa al giro successivo del ciclo (o dell’n-esimo ciclo esterno).\",\"help.break.summary\":\"Esce dal ciclo (o da n cicli).\",\"help.return.summary\":\"Esce dalla funzione (o dallo script letto con source).\",\"help.return.usage\":\"return [stato]\",\"help.exit.summary\":\"Chiude il terminale (o esce dallo script) con uno stato.\",\"help.exit.usage\":\"exit [stato]\",\"help.let.summary\":\"Calcola espressioni aritmetiche (stato 1 se l’ultima vale 0).\",\"help.let.usage\":\"let espressione…\",\"help.bracket.summary\":\"Come test, con una «]» finale.\",\"help.bracket.usage\":\"[ espressione ]\",\"help.test.text\":\"File: -e esiste, -f è un file, -d è una cartella, -s non è vuoto\\nTesto: -z vuoto, -n non vuoto, a = b, a != b\\nNumeri: -eq -ne -lt -le -gt -ge\\nInsieme: ! negazione, -a e, -o o, ( … )\",\"help.test.summary\":\"Valuta un’espressione: stato 0 se vera, 1 se falsa.\",\"help.test.usage\":\"test espressione\",\"help.colon.summary\":\"Non fa niente (stato 0); gli argomenti vengono comunque espansi.\",\"help.colon.usage\":\": [argomenti…]\",\"help.false.summary\":\"Non fa niente, senza successo (stato 1).\",\"help.true.summary\":\"Non fa niente, con successo (stato 0).\",\"help.shift.summary\":\"Sposta i parametri posizionali: $2 diventa $1…\",\"help.set.text\":\"-e  esce al primo comando che fallisce\\n-u  errore se si usa una variabile non impostata\\n-x  mostra i comandi prima di eseguirli\\n-f  niente espansione di * e ?\\n-o pipefail  una pipe fallisce se fallisce uno dei suoi comandi\\n+e, +u… le disattivano. Senza argomenti mostra tutte le variabili.\",\"help.set.summary\":\"Imposta le opzioni della shell e i parametri posizionali ($1, $2…).\",\"help.set.usage\":\"set [-euxf] [-o opzione] [--] [argomenti…]\",\"help.printenv.summary\":\"Mostra le variabili esportate (o il valore di quelle indicate).\",\"help.printenv.usage\":\"printenv [nome…]\",\"help.env.summary\":\"Mostra le variabili esportate, o avvia un comando con variabili in più.\",\"help.env.usage\":\"env [nome=valore…] [comando [argomenti…]]\",\"help.unset.summary\":\"Elimina variabili (o funzioni con -f).\",\"help.unset.usage\":\"unset [-fv] nome…\",\"help.typeset.summary\":\"Come declare.\",\"help.typeset.usage\":\"typeset [-aprxifF] [nome[=valore]…]\",\"help.declare.text\":\"-a array, -x esportata, -r sola lettura, -i intero (il valore si calcola), -p mostra, -f mostra le funzioni, -g globale dentro una funzione.\",\"help.declare.summary\":\"Dichiara variabili e ne mostra gli attributi.\",\"help.declare.usage\":\"declare [-aprxifF] [nome[=valore]…]\",\"help.local.summary\":\"Variabili visibili solo dentro la funzione.\",\"help.local.usage\":\"local [-arx] nome[=valore]…\",\"help.readonly.summary\":\"Rende le variabili di sola lettura.\",\"help.readonly.usage\":\"readonly [nome[=valore]…]\",\"help.export.text\":\"Senza argomenti elenca le variabili esportate. -n toglie l’esportazione.\",\"help.export.summary\":\"Rende le variabili visibili ai comandi e agli script avviati.\",\"help.export.usage\":\"export [-n] [nome[=valore]…]\",\"help.printf.text\":\"Il formato si riapplica finché restano argomenti. -v salva il risultato in una variabile.\",\"help.printf.summary\":\"Scrive gli argomenti secondo un formato (%s, %d, %5.2f, %x, %b, %q…).\",\"help.printf.usage\":\"printf [-v var] formato [argomenti…]\",\"help.echo.text\":\"-n  senza a capo finale\\n-e  interpreta \\\\n, \\\\t, \\\\\\\\, \\\\e… \\n-E  non le interpreta (predefinito)\",\"help.echo.summary\":\"Scrive gli argomenti, separati da uno spazio.\",\"help.echo.usage\":\"echo [-neE] [testo…]\",\"help.pwd.summary\":\"Mostra la cartella di lavoro.\",\"help.cd.text\":\"Senza argomenti va nella home ($HOME). «cd -» torna alla cartella precedente ($OLDPWD).\",\"help.cd.summary\":\"Cambia la cartella di lavoro.\",\"help.cd.usage\":\"cd [cartella]\",\"help.realpath.summary\":\"Il percorso completo.\",\"help.realpath.usage\":\"realpath [-m] percorso…\",\"help.dirname.summary\":\"Il percorso senza l’ultima parte.\",\"help.dirname.usage\":\"dirname percorso…\",\"help.basename.summary\":\"L’ultima parte di un percorso (senza il suffisso).\",\"help.basename.usage\":\"basename percorso [suffisso]\",\"help.tree.summary\":\"Mostra le cartelle ad albero.\",\"help.tree.usage\":\"tree [-adf] [-L livelli] [cartella…]\",\"help.find.text\":\"Test: -name modello, -iname, -path, -type f|d|l, -empty, -size [+-]n[ckMG], -mtime [+-]giorni, -mmin, -newer file\\nAzioni: -print, -print0, -delete (nel cestino), -exec comando {} \\\\; oppure +\\nOpzioni: -maxdepth n, -mindepth n. Insieme: ! (negazione), -o (o), ( … )\\nEsempio: find . -name \\\"*.txt\\\" -size +1k\",\"help.find.summary\":\"Cerca file e cartelle.\",\"help.find.usage\":\"find [percorso…] [espressione]\",\"help.stat.text\":\"-c  formato: %n nome, %s dimensione, %F tipo, %y data di modifica, %Y in secondi, %w %W creazione, %i id\",\"help.stat.summary\":\"Mostra i dettagli di file e cartelle.\",\"help.stat.usage\":\"stat [-c formato] percorso…\",\"help.rmdir.summary\":\"Rimuove cartelle vuote (nel cestino).\",\"help.rmdir.usage\":\"rmdir [-p] cartella…\",\"help.rm.text\":\"-r  anche le cartelle, con il loro contenuto\\n-d  le cartelle vuote\\n-f  nessun errore per ciò che non esiste\\n--purge  elimina definitivamente, senza cestino\\nCiò che va nel cestino si rimette a posto con «trash restore».\",\"help.rm.summary\":\"Sposta file e cartelle nel cestino (con --purge li elimina per sempre).\",\"help.rm.usage\":\"rm [-rfvd] [--purge] percorso…\",\"help.mv.text\":\"Se la destinazione è una cartella, ci sposta dentro; altrimenti rinomina. Un file sovrascritto va nel cestino.\\n-n  non sovrascrive\\n-v  dice cosa sposta\",\"help.mv.summary\":\"Sposta o rinomina file e cartelle.\",\"help.mv.usage\":\"mv [-nv] origine… destinazione\",\"help.cp.text\":\"-r  copia anche le cartelle, con il loro contenuto\\n-n  non sovrascrive i file che esistono\\n-v  dice cosa copia\",\"help.cp.summary\":\"Copia file e cartelle.\",\"help.cp.usage\":\"cp [-rnv] origine… destinazione\",\"help.touch.summary\":\"Crea dei file vuoti, o aggiorna la data di modifica di quelli che esistono.\",\"help.mkdir.text\":\"-p  crea anche le cartelle intermedie; nessun errore se esiste già\",\"help.mkdir.summary\":\"Crea delle cartelle.\",\"help.mkdir.usage\":\"mkdir [-pv] cartella…\",\"help.cat.text\":\"-n  numera le righe\\n-b  numera solo quelle non vuote\\n-s  una sola riga vuota di fila\\n-E  $ alla fine di ogni riga\",\"help.cat.summary\":\"Mostra il contenuto dei file (o dell’input), uno dopo l’altro.\",\"help.ls.text\":\"-l  dettagli (tipo, dimensione, data, tag)\\n-a  anche i nomi che iniziano con «.»\\n-h  dimensioni leggibili (1,2K)\\n-t  per data, -S per dimensione, -r al contrario\\n-1  uno per riga\\n-d  la cartella stessa, non il contenuto\\n-R  anche le sottocartelle\\n-F  / dopo le cartelle, @ dopo i collegamenti, * dopo gli script\",\"help.ls.summary\":\"Elenca il contenuto delle cartelle.\",\"help.ls.usage\":\"ls [-laAh1trSdRF] [percorso…]\",\"help.xargs.text\":\"-n N  al massimo N argomenti per volta\\n-I {}  un comando per riga, con {} sostituito dalla riga\\n-0  parole separate dal carattere nullo (find -print0)\\n-d C  parole separate da C\\n-t  mostra i comandi prima di avviarli\\n-r  non avvia niente se l’input è vuoto\\nEsempio: find . -name \\\"*.tmp\\\" | xargs rm\",\"help.xargs.summary\":\"Avvia un comando con le parole dell’input come argomenti.\",\"help.xargs.usage\":\"xargs [-n N] [-I {}] [-0] [-t] [comando [argomenti…]]\",\"help.yes.summary\":\"Ripete una riga all’infinito (y se non indicata): utile in una pipe.\",\"help.yes.usage\":\"yes [testo]\",\"help.seq.text\":\"-s S  separatore (a capo se non indicato)\\n-w  stessa larghezza, con zeri davanti\",\"help.seq.summary\":\"Scrive una sequenza di numeri.\",\"help.seq.usage\":\"seq [primo [passo]] ultimo\",\"help.nl.summary\":\"Numera le righe (non vuote, o tutte con -b a).\",\"help.rev.summary\":\"Scrive ogni riga al contrario.\",\"help.tr.text\":\"tr a-z A-Z  in maiuscolo\\ntr -d '\\\\r'  elimina i ritorni a capo di Windows\\ntr -s ' '  un solo spazio di fila\\nClassi: [:upper:] [:lower:] [:digit:] [:alpha:] [:alnum:] [:space:] [:punct:]\",\"help.tr.summary\":\"Sostituisce o elimina caratteri.\",\"help.tr.usage\":\"tr [-dsc] insieme1 [insieme2]\",\"help.cut.text\":\"-f 1,3  i campi 1 e 3 (separati da tab o da -d)\\n-d ,  il separatore\\n-c 1-5  i caratteri da 1 a 5\\n-s  solo le righe con il separatore\",\"help.cut.summary\":\"Estrae colonne da ogni riga.\",\"help.cut.usage\":\"cut -f campi [-d separatore] | -c caratteri [file…]\",\"help.tee.text\":\"-a  aggiunge in fondo invece di sovrascrivere\",\"help.tee.summary\":\"Copia l’input sia sull’output sia nei file.\",\"help.uniq.text\":\"-c  con il numero di ripetizioni\\n-d  solo le righe ripetute\\n-u  solo quelle uniche\\n-i  senza distinguere maiuscole e minuscole\",\"help.uniq.summary\":\"Toglie le righe ripetute una dopo l’altra (di solito dopo sort).\",\"help.sort.text\":\"-r  al contrario\\n-n  per numero\\n-h  per dimensione leggibile (2K, 1M)\\n-u  senza doppioni\\n-f  senza distinguere maiuscole e minuscole\\n-k N[,M]  per il campo N (fino a M)\\n-t C  campi separati da C\\n-V  numeri dentro il testo (file2 prima di file10)\\n-o file  scrive nel file\",\"help.sort.summary\":\"Ordina le righe.\",\"help.sort.usage\":\"sort [-rnufhV] [-k campo] [-t separatore] [file…]\",\"help.grep.text\":\"-i  senza distinguere maiuscole e minuscole\\n-v  le righe che NON corrispondono\\n-n  con il numero di riga\\n-c  conta le righe\\n-l  solo i nomi dei file\\n-r  cerca nelle cartelle\\n-w  parole intere, -x righe intere\\n-E  espressioni regolari estese (| + ? () senza barra)\\n-F  testo semplice, non espressione regolare\\n-o  solo la parte che corrisponde\\n-q  nessun risultato, solo lo stato\\n-A N, -B N, -C N  righe di contesto dopo, prima, intorno\\nStato: 0 trovato, 1 non trovato, 2 errore.\",\"help.grep.summary\":\"Cerca le righe che contengono un modello (espressione regolare).\",\"help.grep.usage\":\"grep [-ivnclrwxEFoqH] [-e modello] modello [file…]\",\"help.wc.text\":\"-l righe, -w parole, -c byte, -m caratteri, -L la riga più lunga\",\"help.wc.summary\":\"Conta righe, parole e byte.\",\"help.tail.text\":\"-n N  le ultime N righe (-n +N: dalla riga N in poi)\\n-c N  gli ultimi N caratteri\",\"help.tail.summary\":\"Le ultime righe (10 se non indicato).\",\"help.tail.usage\":\"tail [-n righe] [-c byte] [file…]\",\"help.head.text\":\"-n N  le prime N righe (-n -N: tutte tranne le ultime N)\\n-c N  i primi N caratteri\\n-5 è come -n 5\",\"help.head.summary\":\"Le prime righe (10 se non indicato).\",\"help.head.usage\":\"head [-n righe] [-c byte] [file…]\",\"help.sed.text\":\"s/vecchio/nuovo/g  sostituisce (g: tutte le volte, i: senza maiuscole, p: stampa)\\n3d, /re/d, 2,5d  elimina righe     -n …p  stampa solo quelle scelte\\ny/abc/xyz/  traslittera     a testo, i testo, c testo  aggiunge, inserisce, cambia\\n=  numero di riga   q  esce   h H g G x  spazio di riserva   b t :etichetta  salti\\nIndirizzi: n, $, /re/, a,b, a,+n, ! per negare, { … } per raggruppare.\\n-n  non stampa le righe da sola    -E  espressioni regolari estese    -i  modifica i file\\nEsempi: sed 's/rosso/blu/g' note.txt    sed -n '1,5p' file    sed -i '/^#/d' conf.txt\",\"help.sed.summary\":\"Modifica il testo riga per riga (sostituzioni, cancellazioni…).\",\"help.diff.text\":\"-u  formato unificato (con 3 righe di contesto; -U N per N)\\n-q  dice solo se sono diversi\\n-i  senza distinguere maiuscole e minuscole\\n-w  ignorando gli spazi, -b ignorando quanti sono\\n-B  ignorando le righe vuote\\n-s  dice anche quando sono identici\\n«-» è l’input. Stato: 0 uguali, 1 diversi, 2 errore.\",\"help.diff.summary\":\"Mostra le differenze tra due file.\",\"help.uname.summary\":\"Il nome del sistema operativo.\",\"help.hostname.summary\":\"Il nome del sistema.\",\"help.whoami.summary\":\"Il nome dell’utente.\",\"help.date.text\":\"Formato: %Y anno, %m mese, %d giorno, %H:%M:%S ora, %A giorno della settimana, %B mese, %s secondi dal 1970, %F = %Y-%m-%d, %T = %H:%M:%S\\n-d @1700000000, -d 2026-01-01, -d ieri\\nEsempio: date +%F\",\"help.date.summary\":\"Data e ora.\",\"help.date.usage\":\"date [-u] [-d data] [+formato]\",\"help.apps.summary\":\"Elenca le app installate (id, nome, versione).\",\"help.tag.text\":\"tag                elenca i tag\\ntag ls Lavoro      gli elementi con il tag\\ntag show file      i tag di un elemento\\ntag add Lavoro f   mette il tag (lo crea se non c’è)\\ntag rm Lavoro f    lo toglie\\ntag new nome blu   crea un tag\\ntag delete nome    elimina un tag\",\"help.tag.summary\":\"I tag di lilOS: elenca, assegna, toglie.\",\"help.tag.usage\":\"tag [ls [tag…] | show percorso… | add tag percorso… | rm tag percorso… | new nome [colore] | delete tag…]\",\"help.trash.text\":\"trash              elenca ciò che è nel cestino\\ntrash put file     sposta nel cestino (come rm -r)\\ntrash restore nome rimette a posto\\ntrash rm nome      elimina definitivamente\\ntrash empty        svuota il cestino\",\"help.trash.summary\":\"Il cestino: elenca, rimette a posto, svuota.\",\"help.trash.usage\":\"trash [list | put percorso… | restore nome… | rm nome… | empty]\",\"help.open.text\":\"open note.txt   apre con l’app predefinita\\nopen .   apre la cartella nel File Manager\\nopen -a editor note.txt   con un’app precisa\\nopen -a photo   avvia un’app\",\"help.open.summary\":\"Apre file e cartelle con la loro app (o con quella indicata).\",\"help.open.usage\":\"open [-a app] percorso…\",\"arith.tooDeep\":\"espressione: troppi livelli di ricorsione\",\"arith.syntax\":\"{expr}: errore di sintassi nell’espressione (simbolo errato «{token}»)\",\"arith.end\":\"fine\",\"arith.missingBracket\":\"{expr}: manca «]»\",\"arith.operandExpected\":\"{expr}: errore di sintassi nell’espressione (operando atteso)\",\"arith.badBase\":\"{value}: base non valida\",\"arith.tooGreatForBase\":\"{value}: valore troppo grande per la base\",\"arith.invalid\":\"espressione non valida\",\"arith.divisionByZero\":\"divisione per zero\",\"arith.negativeExponent\":\"esponente negativo\",\"arith.unknownOperator\":\"operatore sconosciuto {op}\",\"expand.braceTooLarge\":\"espansione delle graffe troppo grande\",\"expand.badSubstitution\":\"{name}: sostituzione errata\",\"expand.unbound\":\"{name}: variabile non impostata\",\"expand.cannotAssign\":\"{name}: impossibile assegnare in questo modo\",\"expand.nullOrNotSet\":\"parametro nullo o non impostato\",\"expand.negativeSubstring\":\"{count}: espressione di sottostringa < 0\",\"opt.invalid\":\"opzione non valida -- «{option}»\",\"opt.longNeedsArgument\":\"l’opzione «--{name}» richiede un argomento\",\"opt.needsArgument\":\"l’opzione richiede un argomento -- «{option}»\",\"opt.badNumber\":\"numero non valido: «{value}»\",\"regex.unmatchedBracket\":\"«[» senza «]» nell’espressione regolare\",\"regex.invalid\":\"espressione regolare non valida: {pattern}\",\"appCmd.summary\":\"Comando dell’app {app}.\",\"appCmd.usage\":\"{name} [argomenti…]\",\"printf.badNumber\":\"{value}: è richiesto un numero\",\"test.argumentExpected\":\"manca un argomento\",\"test.unexpectedArgument\":\"{arg}: argomento inatteso\",\"test.missingBracket\":\"manca «]»\",\"cd.oldpwdNotSet\":\"OLDPWD non impostata\",\"local.onlyInFunction\":\"si può usare solo in una funzione\",\"set.badOptionName\":\"{name}: nome di opzione non valido\",\"set.badOption\":\"{option}: opzione non valida\",\"let.noExpression\":\"manca l’espressione\",\"return.onlyInFunction\":\"si può usare solo in una funzione o in uno script letto con source\",\"loop.onlyInLoop\":\"ha senso solo in un ciclo for, while o until\",\"loop.badCount\":\"{n}: numero di cicli non valido\",\"alias.badName\":\"«{name}»: nome di alias non valido\",\"which.builtIn\":\"{name}: comando integrato nel Terminale\",\"wait.notAJob\":\"{spec}: non è un job di questa shell\",\"fg.noSuchJob\":\"{job}: job inesistente\",\"fg.current\":\"attuale\",\"kill.noSuchJob\":\"{spec}: job o processo inesistente\",\"sleep.missing\":\"manca la durata\",\"sleep.badDuration\":\"durata non valida: «{value}»\",\"source.noFile\":\"manca il nome del file\",\"bash.noCommand\":\"-c: manca il testo dei comandi\",\"bash.already\":\"Sei già in bash: per uno script scrivi «bash file.sh» o «source file.sh».\",\"type.alias\":\"{name} è un alias di «{value}»\",\"type.keyword\":\"{name} è una parola chiave della shell\",\"type.function\":\"{name} è una funzione\",\"type.builtin\":\"{name} è un comando interno della shell\",\"type.appCommand\":\"{name} è un comando dell’app {app}\",\"type.command\":\"{name} è un comando del Terminale\",\"type.file\":\"{name} è {path}\",\"syntax.topic.variables\":\"variabili\",\"syntax.topic.redirections\":\"redirezioni\",\"syntax.if\":\"if comandi; then comandi; [elif comandi; then comandi;] [else comandi;] fi\\nEsegue il ramo del primo «if»/«elif» i cui comandi riescono (stato 0).\\n  if [ -f note.txt ]; then echo c’è; else echo manca; fi\",\"syntax.for\":\"for nome in parole…; do comandi; done\\nfor (( inizio; condizione; passo )); do comandi; done\\n  for f in *.txt; do wc -l \\\"$f\\\"; done\\n  for ((i = 1; i <= 3; i++)); do echo $i; done\",\"syntax.while\":\"while comandi; do comandi; done   (until: finché i comandi NON riescono)\\n  n=0; while [ $n -lt 3 ]; do echo $n; n=$((n + 1)); done\\n  ls | while read -r nome; do echo \\\"- $nome\\\"; done\",\"syntax.until\":\"until comandi; do comandi; done: ripete finché i comandi non riescono.\",\"syntax.case\":\"case parola in modello|modello) comandi;; … esac\\nI modelli usano * ? [ ]. «;&» prosegue nel ramo dopo, «;;&» prova anche i modelli successivi.\\n  case \\\"$f\\\" in *.txt) echo testo;; *.png|*.jpg) echo immagine;; *) echo altro;; esac\",\"syntax.function\":\"nome() { comandi; }   oppure   function nome { comandi; }\\nGli argomenti sono $1, $2…, $@; «local» crea variabili della funzione, «return n» esce.\\n  saluta() { echo \\\"Ciao, $1\\\"; }; saluta Eugenio\",\"syntax.cond\":\"[[ espressione ]]: test senza divisione in parole né espansione di *.\\n  [[ $nome == *.txt ]]      confronto con un modello\\n  [[ $s =~ ^[0-9]+$ ]]      espressione regolare (gruppi in BASH_REMATCH)\\n  [[ -d dir && ! -e file ]] -e -f -d -s -z -n, && || ! ( )\",\"syntax.arith\":\"(( espressione )): aritmetica intera; stato 0 se il risultato non è 0.\\n  (( n++ )); (( n > 3 )) && echo grande; echo $(( 2 ** 10 ))\",\"syntax.variables\":\"nome=valore (senza spazi), $nome o ${nome}. Array: a=(x y z), ${a[0]}, ${a[@]}, ${#a[@]}.\\n${v:-predefinito} ${v:=predefinito} ${v:+alt} ${#v} ${v#prefisso} ${v%suffisso} ${v/da/a} ${v//da/a} ${v:inizio:lunghezza} ${v^^} ${v,,}\\nSpeciali: $? stato dell’ultimo comando, $$ la shell, $! l’ultimo comando in background, $# $@ $* gli argomenti.\",\"syntax.redirections\":\"> file (sovrascrive), >> file (aggiunge), < file (legge), 2> errori, 2>&1, &> file, <<EOF … EOF, <<< testo, | pipe.\\n/dev/null scarta tutto.\",\"files.cannotAccess\":\"impossibile accedere a «{path}»: file o cartella inesistente\",\"files.cannotCreate\":\"impossibile creare «{path}»: file o cartella inesistente\",\"files.overwriteFolder\":\"impossibile sovrascrivere la cartella «{name}» con un file\",\"files.missingDestination\":\"manca la destinazione dopo «{path}»\",\"files.targetNotFolder\":\"la destinazione «{path}» non è una cartella\",\"files.cannotStat\":\"impossibile fare stat di «{path}»: file o cartella inesistente\",\"files.cannotRemove\":\"impossibile rimuovere «{path}»: {reason}\",\"files.quotedNoSuchFile\":\"«{path}»: file o cartella inesistente\",\"mkdir.notAFolder\":\"impossibile creare la cartella «{path}»: «{name}» esiste e non è una cartella\",\"mkdir.exists\":\"impossibile creare la cartella «{path}»: il file esiste\",\"mkdir.noParent\":\"impossibile creare la cartella «{path}»: file o cartella inesistente\",\"mkdir.created\":\"creata la cartella «{path}»\",\"cp.overwriteFile\":\"impossibile sovrascrivere «{name}», che non è una cartella, con una cartella\",\"cp.verbose\":\"«{from}» -> «{to}»\",\"cp.omitting\":\"-r non specificato; si omette la cartella «{path}»\",\"cp.intoItself\":\"impossibile copiare la cartella «{path}» dentro se stessa\",\"mv.system\":\"impossibile spostare «{path}»: è una cartella di sistema\",\"mv.intoItself\":\"impossibile spostare «{path}» in una sua sottocartella\",\"mv.notEmpty\":\"impossibile spostare «{path}» su «{name}»: la cartella non è vuota\",\"mv.verbose\":\"rinominato «{from}» -> «{to}»\",\"reason.noSuchFile\":\"file o cartella inesistente\",\"reason.isADirectory\":\"è una cartella\",\"reason.notADirectory\":\"non è una cartella\",\"reason.notEmpty\":\"la cartella non è vuota\",\"reason.system\":\"è una cartella di sistema\",\"reason.containsSystem\":\"contiene cartelle di sistema\",\"rm.home\":\"è pericoloso agire su «{path}»: è la home\",\"rm.purged\":\"eliminato definitivamente «{path}»\",\"rm.trashed\":\"spostato nel cestino «{path}»\",\"rmdir.removed\":\"rimossa la cartella «{path}»\",\"stat.folder\":\"cartella\",\"stat.appLink\":\"collegamento all’app {app}\",\"stat.file\":\"file\",\"stat.emptyFile\":\"file vuoto\",\"stat.type\":\"Tipo: {type}\",\"stat.path\":\"Percorso: {path}\",\"stat.items\":\"Elementi: {n} ({total} in tutto)\",\"stat.size\":\"Dimensione: {size} byte ({human})\",\"stat.created\":\"Creato: {date}\",\"stat.modified\":\"Modificato: {date}\",\"stat.tags\":\"Tag: {tags}\",\"stat.system\":\"Cartella di sistema\",\"find.missingArgument\":\"manca l’argomento di «{name}»\",\"find.badType\":\"tipo sconosciuto per -type: «{type}» (f, d o l)\",\"find.badSize\":\"dimensione non valida: «{value}»\",\"find.badValue\":\"valore non valido per {option}: «{value}»\",\"find.cannotFind\":\"impossibile trovare «{path}»\",\"find.execEnd\":\"manca la fine di «-exec» («;» o «+»)\",\"find.execCommand\":\"manca il comando di «-exec»\",\"find.unknownPredicate\":\"predicato sconosciuto: «{name}»\",\"find.unexpected\":\"argomento inatteso: «{arg}»\",\"tree.folders\":{\"one\":\"{n} cartella\",\"other\":\"{n} cartelle\"},\"tree.files\":{\"one\":\"{n} file\",\"other\":\"{n} file\"},\"ls.date\":\"{day} {month}\",\"wc.total\":\"totale\",\"grep.noPattern\":\"manca il modello da cercare\\nUso: grep [opzioni] modello [file…]\",\"sort.badKey\":\"chiave non valida: «{key}»\",\"sort.disorder\":\"-:{n}: disordine: {line}\",\"cut.badList\":\"elenco non valido: «{spec}»\",\"cut.noList\":\"indicare un elenco di campi (-f) o di caratteri (-c)\",\"cut.badDelimiter\":\"il delimitatore deve essere un solo carattere\",\"tr.reverseRange\":\"intervallo al contrario: «{range}»\",\"tr.missingSet2\":\"manca il secondo insieme dopo «{set}»\",\"seq.badArgument\":\"argomento non valido: «{value}»\",\"seq.zeroStep\":\"il passo non può essere 0\",\"xargs.unmatchedDouble\":\"virgolette doppie non chiuse\",\"xargs.unmatchedSingle\":\"virgolette singole non chiuse\",\"xargs.badCount\":\"il numero di argomenti deve essere almeno 1\",\"sed.at\":\"-e espressione #1, carattere {pos}: {message}\",\"sed.unterminated\":\"comando «s» non terminato\",\"sed.badAddress\":\"indirizzo non valido\",\"sed.missingAddress\":\"manca il secondo indirizzo\",\"sed.missingCommand\":\"manca il comando\",\"sed.unexpectedBrace\":\"«}» inatteso\",\"sed.badDelimiter\":\"delimitatore non valido per «s»\",\"sed.yLengths\":\"le stringhe di «y» hanno lunghezze diverse\",\"sed.noLabel\":\"«:» senza etichetta\",\"sed.unknownCommand\":\"comando sconosciuto: «{cmd}»\",\"sed.unmatchedBrace\":\"manca «}»\",\"sed.noSuchLabel\":\"etichetta inesistente per un salto: «{label}»\",\"sed.noPreviousRegex\":\"nessuna espressione regolare precedente\",\"sed.cannotRead\":\"impossibile leggere {path}: file o cartella inesistente\",\"sed.noScript\":\"manca lo script\\nUso: sed [-n] [-E] [-i] script [file…]\",\"sed.noFiles\":\"nessun file da modificare con -i\",\"diff.missingOperand\":\"manca un operando dopo «{arg}»\",\"diff.extraOperand\":\"operando in più: «{arg}»\",\"diff.identical\":\"I file {a} e {b} sono identici\",\"diff.differ\":\"I file {a} e {b} sono diversi\",\"diff.tooBig\":\"i file sono troppo diversi e troppo grandi da confrontare\",\"open.noApp\":\"app non trovata: «{app}» (vedi «apps»)\",\"trash.notInTrash\":\"«{name}» non è nel cestino\",\"trash.empty\":\"Il cestino è vuoto.\",\"trash.deletedFolder\":\"(cartella eliminata)\",\"trash.items\":{\"one\":\"{n} elemento\",\"other\":\"{n} elementi\"},\"trash.missingPut\":\"manca cosa mettere nel cestino\",\"trash.cannotTrash\":\"{path}: non si può cestinare (cartella di sistema)\",\"trash.missingRestore\":\"manca il nome di ciò che va rimesso a posto\",\"trash.restored\":\"rimesso in {path}\",\"trash.missingName\":\"manca il nome\",\"trash.purged\":{\"one\":\"eliminato definitivamente {n} elemento\",\"other\":\"eliminati definitivamente {n} elementi\"},\"trash.emptied\":{\"one\":\"Cestino svuotato ({n} elemento).\",\"other\":\"Cestino svuotato ({n} elementi).\"},\"trash.alreadyEmpty\":\"Il cestino era già vuoto.\",\"tag.noSuchTag\":\"tag inesistente: «{name}» (vedi «tag ls»)\",\"tag.none\":\"Nessun tag. Creane uno con «tag new nome».\",\"tag.hidden\":\"nascosto\",\"tag.noTags\":\"nessun tag\",\"tag.usageAddRm\":\"tag {sub} nome file…\",\"tag.created\":\"creato il tag «{name}»\",\"tag.system\":\"{path}: gli elementi di sistema non hanno tag\",\"tag.usageNew\":\"tag new nome [colore]\",\"tag.createdShown\":\"creato il tag {tag}\",\"tag.usageDelete\":\"tag delete nome…\",\"date.formatC\":\"%a %e %b %Y, %H:%M:%S\",\"date.formatX\":\"%d/%m/%Y\",\"date.format\":\"%a %e %b %Y, %H:%M:%S %Z\",\"date.invalid\":\"data non valida: «{date}»\",\"@actions.terminal.sshHere.label\":\"Apri terminale SSH qui\",\"help.ssh.summary\":\"apre una sessione SSH in una scheda nuova\",\"help.ssh.usage\":\"ssh [-p porta] [-l utente] [utente@]host [comando] | ssh <host salvato>\",\"help.telnet.summary\":\"apre una sessione Telnet in una scheda nuova\",\"help.telnet.usage\":\"telnet [-l utente] host [porta] | telnet <host salvato>\",\"help.rlogin.summary\":\"apre una sessione rlogin in una scheda nuova\",\"help.rlogin.usage\":\"rlogin [-l utente] host | rlogin <host salvato>\",\"help.supdup.summary\":\"apre una sessione SUPDUP in una scheda nuova\",\"help.supdup.usage\":\"supdup host [porta] | supdup <host salvato>\",\"help.sessions.summary\":\"le sessioni remote ancora aperte; con un numero, ne mostra una in una scheda\",\"help.sessions.usage\":\"sessions [n]\",\"remote.cmd.unavailable\":\"le sessioni remote non sono disponibili (lilOS non ha i loro moduli)\",\"remote.cmd.noModule\":\"{name}: lilOS non ha il suo modulo (un amministratore installa {module} dall’AppStore, scheda Kernel)\",\"remote.cmd.opened\":\"Aperta in una scheda nuova: {name}\",\"remote.cmd.noUser\":\"ssh: serve un utente: utente@host oppure -l utente\",\"remote.cmd.noSession\":\"nessuna sessione aperta «{name}» (vedi «sessions»)\",\"remote.cmd.shown\":\"Mostrata in una scheda: {name}\",\"remote.cmd.shownNow\":\"mostrata in una finestra\",\"remote.cmd.closesIn\":{\"one\":\"si chiude tra {n} minuto\",\"other\":\"si chiude tra {n} minuti\"},\"remote.cmd.none\":\"Nessuna sessione remota aperta.\",\"remote.cmd.resumeHint\":\"«sessions <n>» ne mostra una in una scheda\",\"remote.tabs\":\"Schede\",\"remote.screen\":\"Terminale remoto\",\"remote.newShell\":\"Nuova shell\",\"remote.activity\":\"Nuovo output\",\"remote.closeTab\":\"Chiudi scheda\",\"remote.closeSession\":\"Chiudi (termina la sessione)\",\"remote.closeNamed\":\"Chiudi {name}\",\"remote.close\":\"Chiudi\",\"remote.cancel\":\"Annulla\",\"remote.notRemote\":\"non è in una connessione di rete\",\"remote.notSftp\":\"il terminale SSH si apre solo sulle connessioni SFTP\",\"remote.cannotReconnect\":\"questa sessione non si riapre da qui: aprila di nuovo dal File Manager\",\"remote.unavailable\":\"Le sessioni remote non rispondono: {error}\",\"remote.noProtocols\":\"lilOS non ha moduli per le sessioni remote. Un amministratore può installare term-ssh, term-telnet, term-rlogin o term-supdup dall’AppStore (scheda Kernel).\",\"remote.side.label\":\"Host e sessioni remote\",\"remote.side.toggle\":\"Mostra o nascondi gli host\",\"remote.side.hosts\":\"Host\",\"remote.side.connect\":\"Connetti\",\"remote.side.open\":\"C’è una sessione aperta su questo host\",\"remote.side.none\":\"Nessun host salvato. «ssh utente@server» apre una sessione; + salva un host.\",\"remote.side.running\":\"Ancora attive\",\"remote.side.elsewhere\":\"in un’altra finestra\",\"remote.side.closesIn\":{\"one\":\"si chiude tra {n} minuto\",\"other\":\"si chiude tra {n} minuti\"},\"remote.side.resume\":\"Riprendi\",\"remote.taken\":\"La sessione è stata aperta in un’altra finestra\",\"remote.takeBack\":\"Mostrala qui\",\"remote.lostLink\":\"Il collegamento con lilOS si è interrotto\",\"remote.attachAgain\":\"Ricollega\",\"remote.secure\":\"Cifrata\",\"remote.insecure\":\"Non cifrata\",\"remote.insecureHint\":\"Quello che scrivi, password comprese, passa in chiaro sulla rete\",\"remote.cipher\":\"Cifratura: {cipher}\",\"remote.state.new\":\"In attesa\",\"remote.state.connecting\":\"Connessione…\",\"remote.state.on\":\"Connessa\",\"remote.state.closed\":\"Chiusa\",\"remote.find\":\"Cerca (Ctrl+Maiusc+F)\",\"remote.find.count\":\"{i} di {n}\",\"remote.find.none\":\"Nessuno\",\"remote.find.prev\":\"Precedente (Maiusc+Invio)\",\"remote.find.next\":\"Successivo (Invio)\",\"remote.record\":\"Registra la sessione in un file\",\"remote.recordStop\":\"Ferma la registrazione\",\"remote.keys\":\"Tasti\",\"remote.keys.send\":\"Manda al server:\",\"remote.keys.copy\":\"Copia\",\"remote.keys.paste\":\"Incolla: Ctrl+Maiusc+V\",\"remote.keys.clear\":\"Cancella lo storico\",\"remote.keys.disconnect\":\"Disconnetti\",\"remote.signal.break\":\"Invia Break\",\"remote.signal.interrupt\":\"Interrompi il processo\",\"remote.signal.ayt\":\"Ci sei? (AYT)\",\"remote.reconnect\":\"Riconnetti\",\"remote.closed\":\"Connessione chiusa\",\"remote.closedWhy\":\"Connessione chiusa: {reason}\",\"remote.trust.title\":\"Conferma il server {host}\",\"remote.trust.changedTitle\":\"La chiave di {host} è cambiata\",\"remote.trust.first\":\"Prima connessione a questo server. Controlla che l’impronta della chiave sia quella del server (te la dà chi lo gestisce).\",\"remote.trust.firstTls\":\"Il certificato di questo server non è valido per il suo nome o non è firmato da un’autorità nota. Controlla l’impronta prima di andare avanti.\",\"remote.trust.changedText\":\"Attenzione: potrebbe non essere il tuo server. Mostra una chiave diversa da quella che avevi confermato: può essere stato reinstallato, oppure qualcuno si è messo in mezzo. Vai avanti solo se sai perché è cambiata.\",\"remote.trust.server\":\"Server\",\"remote.trust.key\":\"Chiave\",\"remote.trust.certificate\":\"Certificato\",\"remote.trust.previous\":\"Chiave confermata prima\",\"remote.trust.ask\":\"Continua se è il tuo server.\",\"remote.trust.askChanged\":\"Continua solo per fidarti della nuova chiave.\",\"remote.record.title\":\"Registra la sessione\",\"remote.record.file\":\"File\",\"remote.record.hint\":\"Un file nella tua home. Viene scritto mentre lavori; si ferma a 8 MB.\",\"remote.record.colors\":\"Anche con i codici di colore (per rivederla com’era)\",\"remote.record.start\":\"Registra\",\"remote.record.badPath\":\"La cartella non esiste: scrivi un percorso come ~/Documenti/sessione.txt\",\"remote.record.exists\":\"«{name}» esiste già: scegli un altro nome\",\"remote.record.full\":\"Registrazione fermata: «{path}» ha raggiunto la dimensione massima\",\"remote.record.failed\":\"La registrazione non si salva: {error}\",\"remote.record.saved\":\"Sessione registrata in «{path}»\",\"remote.host.newTitle\":\"Nuovo host\",\"remote.host.editTitle\":\"Modifica l’host\",\"remote.host.name\":\"Nome\",\"remote.host.folder\":\"Cartella\",\"remote.host.folderNone\":\"Nessuna\",\"remote.host.protocol\":\"Protocollo\",\"remote.host.kept\":\"•••••• (salvata: vuota la lascia)\",\"remote.host.noProtocols\":\"Nessun protocollo disponibile.\",\"remote.host.insecureTitle\":\"Connessione non cifrata\",\"remote.host.insecureText\":\"Quello che scrivi, password comprese, passa in chiaro sulla rete. Usala solo su reti di cui ti fidi o con apparati che non hanno SSH.\",\"remote.host.remember\":\"Ricorda password e passphrase\",\"remote.host.keyUnreadable\":\"Il file della chiave non si legge: {error}\",\"remote.host.advanced\":\"Avanzate\",\"remote.host.term\":\"Tipo di terminale\",\"remote.host.encoding\":\"Codifica\",\"remote.host.backspace\":\"Backspace manda\",\"remote.host.backspaceDel\":\"DEL (^?)\",\"remote.host.backspaceBs\":\"BS (^H)\",\"remote.host.delete\":\"Elimina\",\"remote.host.save\":\"Salva\",\"remote.host.saveConnect\":\"Salva e connetti\",\"@entrypoints.filePreview.label\":\"Anteprime dei collegamenti .term\",\"@commands.terminal.newShell.label\":\"Nuova shell\",\"@commands.terminal.splitRight.label\":\"Dividi a destra\",\"@commands.terminal.splitDown.label\":\"Dividi in basso\",\"@commands.terminal.detach.label\":\"Stacca la scheda in una nuova finestra\",\"@commands.terminal.broadcast.label\":\"Invia l’input a tutti i riquadri\",\"@commands.terminal.focusLeft.label\":\"Riquadro a sinistra\",\"@commands.terminal.focusRight.label\":\"Riquadro a destra\",\"@commands.terminal.focusUp.label\":\"Riquadro sopra\",\"@commands.terminal.focusDown.label\":\"Riquadro sotto\",\"@commands.terminal.previousTab.label\":\"Scheda precedente del riquadro\",\"@commands.terminal.nextTab.label\":\"Scheda successiva del riquadro\",\"@commands.terminal.moveLeft.label\":\"Sposta la scheda a sinistra\",\"@commands.terminal.moveRight.label\":\"Sposta la scheda a destra\",\"@commands.terminal.moveUp.label\":\"Sposta la scheda in alto\",\"@commands.terminal.moveDown.label\":\"Sposta la scheda in basso\",\"tabs.count\":{\"one\":\"{n} scheda\",\"other\":\"{n} schede\"},\"tabs.pane\":\"Riquadro {n} — {name}\",\"tabs.rename\":\"Rinomina…\",\"tabs.renameLabel\":\"Nome della scheda\",\"tabs.renameHint\":\"Vuoto: il nome solito (la cartella, o il server).\",\"tabs.renameOk\":\"Rinomina\",\"tabs.duplicate\":\"Duplica\",\"tabs.splitRight\":\"Dividi a destra\",\"tabs.splitDown\":\"Dividi in basso\",\"tabs.moveToPane\":\"Sposta nel riquadro\",\"tabs.detach\":\"Stacca in una nuova finestra\",\"tabs.moveToWindow\":\"Sposta nella finestra\",\"tabs.newWindow\":\"Nuova finestra\",\"tabs.saveTerm\":\"Salva come collegamento (.term)…\",\"tabs.addToDesk\":\"Aggiungi alla scrivania\",\"tabs.copyAddress\":\"Copia indirizzo\",\"tabs.closeOthers\":\"Chiudi le altre schede\",\"tabs.closeRight\":\"Chiudi le schede a destra\",\"grid.gutter\":\"Trascina per cambiare la misura dei riquadri; doppio clic: uguali\",\"grid.broadcast\":\"Invia l’input a tutti i riquadri\",\"grid.broadcastOn\":\"Input a tutti i riquadri\",\"grid.broadcastOff\":\"Quello che scrivi va alla scheda mostrata in ogni riquadro. Clic per spegnerlo.\",\"menu.title\":\"Menu di Terminale\",\"menu.openTerm\":\"Apri un collegamento (.term)…\",\"menu.openTermTitle\":\"Apri un collegamento al terminale\",\"drag.newWindow\":\"Rilascia per aprire {name} in una finestra nuova\",\"drag.pane\":\"Sposta in questo riquadro\",\"drag.split.left\":\"Nuovo riquadro a sinistra\",\"drag.split.right\":\"Nuovo riquadro a destra\",\"drag.split.up\":\"Nuovo riquadro sopra\",\"drag.split.down\":\"Nuovo riquadro sotto\",\"file.invalid\":\"Non è un collegamento al terminale (.term) o è rovinato\",\"file.missing\":\"Il collegamento non esiste più\",\"file.cannot\":\"Questa scheda non può diventare un collegamento\",\"file.noFolder\":\"La cartella {path} non esiste\",\"file.serverFolder\":\"La cartella del server va scritta per intero, per esempio /var/www\",\"file.exists\":\"C’è già un file {name} in quella cartella\",\"file.noPassword\":\"Scrivi la password (o la chiave) da salvare nel file\",\"file.onDesk\":\"{name} è sulla scrivania\",\"file.saved\":\"Collegamento salvato: {path}\",\"file.saveTitle\":\"Salva collegamento\",\"file.name\":\"Nome del file\",\"file.folder\":\"Cartella\",\"file.change\":\"Cambia…\",\"file.pickFolder\":\"Dove salvare il collegamento\",\"file.cwdLocal\":\"Parti dalla cartella (facoltativo)\",\"file.cwdRemote\":\"Cartella del server in cui entrare (facoltativo)\",\"file.command\":\"Comando da eseguire all’avvio (facoltativo)\",\"file.commandRemote\":\"Comando all’avvio (facoltativo)\",\"file.commandRemoteHint\":\"Parte al posto della shell del server\",\"file.openAs\":\"All’apertura\",\"file.openDefault\":\"Come nelle Opzioni ({how})\",\"file.keepPassword\":\"Salva la password nel file\",\"file.passwordSaved\":\"Nel file va la password salvata per questo host.\",\"file.passwordHint\":\"La password è cifrata: vale solo per te, su questo lilOS, per questo server e utente. A chiunque altro viene chiesta come al solito.\",\"file.save\":\"Salva\",\"file.command.title\":\"Questo collegamento esegue un comando\",\"file.command.text\":\"«{name}» all’apertura esegue questo comando:\\n\\n{command}\\n\\nEseguilo solo se ti fidi di chi ha fatto il collegamento. Continuare?\",\"options.open\":\"Opzioni…\",\"options.title\":\"Opzioni di Terminale\",\"options.tab.general\":\"Generale\",\"options.tab.generalDescription\":\"Come Terminale apre i collegamenti\",\"options.files\":\"Collegamenti al terminale (.term)\",\"options.openTerm\":\"Apri i collegamenti\",\"options.openTermDescription\":\"Dove si apre un file .term con il doppio clic, quando il file non lo dice da sé\",\"options.openTerm.window\":\"In una finestra nuova\",\"options.openTerm.tab\":\"In una scheda della finestra aperta\"}}")
}), { t: W } = U, { h: G, icon: Hl, fs: Ul } = e, Wl = (e, t) => !e.when || Object.entries(e.when).every(([e, n]) => Array.isArray(n) ? n.includes(t[e]) : t[e] === n);
function Gl(t, n = null, r = null) {
	let i = (t) => e.term.text(t), { protocols: a, encodings: o, hosts: s } = t.data;
	return new Promise((c) => {
		let l = n?.protocol ?? r?.protocol ?? a[0]?.id, u = { ...n?.values ?? r?.values ?? {} }, d = {}, f = {
			term: "xterm-256color",
			encoding: "utf-8",
			backspace: "del",
			...n?.settings ?? {}
		}, p = G("input", {
			type: "text",
			value: n?.name ?? "",
			maxLength: 60,
			"aria-label": W("remote.host.name")
		}), m = [...new Set(s.map((e) => e.folder).filter(Boolean))], h = G("input", {
			type: "text",
			value: n?.folder ?? "",
			maxLength: 60,
			list: "tm-folders",
			placeholder: W("remote.host.folderNone")
		}), g = G("select", { disabled: !!n }, ...a.map((e) => G("option", {
			value: e.id,
			selected: e.id === l
		}, i(e.label)))), _ = G("input", {
			type: "checkbox",
			checked: !n || n.remembered
		}), v = G("div", { class: "tm-fields" }), y = G("input", {
			type: "text",
			value: f.term,
			maxLength: 40,
			spellcheck: "false"
		}), ee = G("select", {}, ...o.map((e) => G("option", {
			value: e,
			selected: e === f.encoding
		}, e.toUpperCase()))), b = G("select", {}, G("option", {
			value: "del",
			selected: f.backspace === "del"
		}, W("remote.host.backspaceDel")), G("option", {
			value: "bs",
			selected: f.backspace === "bs"
		}, W("remote.host.backspaceBs"))), x = G("p", {
			class: "tm-error",
			role: "alert",
			hidden: !0
		}), S = () => a.find((e) => e.id === l), te = (e) => {
			let t = `tm-f-${e.key}`, r = (t) => {
				e.secret ? d[e.key] = t : u[e.key] = t;
			}, a = e.secret ? "" : u[e.key] ?? e.default ?? "", o;
			if (e.type === "select") o = G("select", {
				id: t,
				onchange: () => {
					r(o.value), ne();
				}
			}, ...(e.options ?? []).map((e) => G("option", {
				value: e.value,
				selected: e.value === a
			}, i(e.label))));
			else if (e.type === "checkbox") return o = G("input", {
				id: t,
				type: "checkbox",
				checked: a === !0,
				onchange: () => {
					r(o.checked), ne();
				}
			}), G("label", { class: "tm-check" }, o, i(e.label));
			else o = e.type === "textarea" ? G("textarea", {
				id: t,
				oninput: () => r(o.value)
			}, String(a)) : e.type === "file" ? G("input", {
				id: t,
				type: "text",
				spellcheck: "false",
				placeholder: n?.remembered ? W("remote.host.kept") : "~/.ssh/id_ed25519",
				oninput: () => {
					d[`${e.key}:path`] = o.value.trim();
				}
			}) : G("input", {
				id: t,
				type: e.type === "password" ? "password" : e.type === "number" ? "number" : "text",
				value: e.secret ? "" : String(a),
				spellcheck: "false",
				autocomplete: "off",
				placeholder: e.secret && n?.remembered ? W("remote.host.kept") : e.placeholder ?? "",
				...e.type === "number" && {
					min: e.min,
					max: e.max
				},
				oninput: () => r(e.type === "number" ? o.value === "" ? "" : Number(o.value) : o.value)
			});
			return G("label", {
				class: "tm-field",
				for: t
			}, G("span", {}, i(e.label)), o, e.hint && G("small", {}, i(e.hint)));
		}, ne = () => {
			let e = S();
			if (!e) return v.replaceChildren(G("p", {}, W("remote.host.noProtocols")));
			for (let t of e.fields) !t.secret && t.default !== void 0 && u[t.key] === void 0 && (u[t.key] = t.default);
			let t = e.fields.filter((e) => Wl(e, u)), n = [];
			for (let e = 0; e < t.length; e++) {
				let r = t[e], i = t[e + 1];
				r.key === "host" && i?.key === "port" ? (n.push(G("div", { class: "tm-grid2" }, te(r), te(i))), e++) : n.push(te(r));
			}
			(e.secure ?? (l === "telnet" && u.tls === !0)) || n.push(G("div", { class: "tm-note" }, G("b", {}, Hl("lockOpen"), W("remote.host.insecureTitle")), W("remote.host.insecureText"))), e.fields.some((e) => e.secret) && n.push(G("label", { class: "tm-check" }, _, W("remote.host.remember"))), v.replaceChildren(...n);
		};
		g.addEventListener("change", () => {
			l = g.value;
			for (let e of Object.keys(u)) S()?.fields.some((t) => t.key === e && !t.secret) || delete u[e];
			ne();
		});
		let re = (e) => {
			x.textContent = e, x.hidden = !1;
		}, C = async (t) => {
			if (x.hidden = !0, t === "delete") {
				try {
					await e.term.removeHost(n.id);
				} catch (e) {
					return re(e.message);
				}
				return ie.close(), c({
					action: t,
					host: n
				});
			}
			let r = S(), i = {};
			try {
				for (let e of r.fields.filter((e) => e.secret && Wl(e, u))) if (e.type === "file") {
					let t = d[`${e.key}:path`];
					if (!t) continue;
					let n = Ul.resolve(t.startsWith("~") || t.startsWith("/") ? t : `~/${t}`);
					if (n?.type !== "file") throw Error(W("err.noSuchFile", { path: t }));
					i[e.key] = await Ul.read(n.id);
				} else d[e.key] && (i[e.key] = d[e.key]);
			} catch (e) {
				return re(W("remote.host.keyUnreadable", { error: e.message }));
			}
			let a = {};
			for (let e of r.fields) !e.secret && Wl(e, u) && u[e.key] !== void 0 && u[e.key] !== "" && (a[e.key] = u[e.key]);
			let o = {
				name: p.value,
				folder: h.value,
				values: a,
				settings: {
					term: y.value.trim() || "xterm-256color",
					encoding: ee.value,
					backspace: b.value
				},
				remember: _.checked,
				...!n && { protocol: l }
			}, s;
			try {
				s = await e.term.saveHost(n?.id ?? null, o, i);
			} catch (e) {
				return re(e.message);
			}
			ie.close(), c({
				action: t,
				host: s
			});
		};
		ne();
		let ie = t.showDialog(G("div", {
			class: "tm-dialog",
			role: "dialog",
			"aria-modal": "true",
			onkeydown: (e) => {
				e.key === "Enter" && e.target.tagName === "INPUT" && (e.preventDefault(), C("connect"));
			}
		}, G("h2", {}, W(n ? "remote.host.editTitle" : "remote.host.newTitle")), G("div", { class: "tm-dialog-body" }, G("label", { class: "tm-field" }, G("span", {}, W("remote.host.name")), p), G("div", { class: "tm-grid2b" }, G("label", { class: "tm-field" }, G("span", {}, W("remote.host.protocol")), g), G("label", { class: "tm-field" }, G("span", {}, W("remote.host.folder")), h, G("datalist", { id: "tm-folders" }, ...m.map((e) => G("option", { value: e }))))), v, G("details", {}, G("summary", {}, W("remote.host.advanced")), G("div", { class: "tm-fields" }, G("div", { class: "tm-grid2b" }, G("label", { class: "tm-field" }, G("span", {}, W("remote.host.term")), y), G("label", { class: "tm-field" }, G("span", {}, W("remote.host.encoding")), ee)), G("label", { class: "tm-field" }, G("span", {}, W("remote.host.backspace")), b))), x), G("div", { class: "tm-dialog-foot" }, n && G("button", {
			type: "button",
			class: "tm-btn danger tm-left",
			onclick: () => C("delete")
		}, W("remote.host.delete")), G("button", {
			type: "button",
			class: "tm-btn",
			onclick: () => {
				ie.close(), c(null);
			}
		}, W("remote.cancel")), G("button", {
			type: "button",
			class: "tm-btn",
			onclick: () => C("save")
		}, W("remote.host.save")), G("button", {
			type: "button",
			class: "tm-btn primary",
			onclick: () => C("connect")
		}, W("remote.host.saveConnect")))), () => c(null));
		p.focus();
	});
}
function Kl(e, t) {
	let n = /* @__PURE__ */ new Date(), r = (e) => String(e).padStart(2, "0"), i = `${n.getFullYear()}-${r(n.getMonth() + 1)}-${r(n.getDate())} ${r(n.getHours())}.${r(n.getMinutes())}`, a = String(t).replace(/[\\/:*?"<>|\x00-\x1f]+/g, "_").slice(0, 60);
	return new Promise((t) => {
		let n = G("input", {
			type: "text",
			value: `~/Documenti/${a} ${i}.txt`,
			spellcheck: "false"
		}), r = G("input", { type: "checkbox" }), o = G("p", {
			class: "tm-error",
			role: "alert",
			hidden: !0
		}), s = (e) => {
			l.close(), t(e);
		}, c = () => {
			let e = n.value.trim().replace(/\/+$/, ""), t = e.lastIndexOf("/"), i = t > 0 ? Ul.resolve(e.slice(0, t)) : null, a = e.slice(t + 1);
			if (!i || i.type !== "folder" || !a) return o.textContent = W("remote.record.badPath"), o.hidden = !1, n.focus();
			if (Ul.children(i.id).some((e) => e.name === a)) return o.textContent = W("remote.record.exists", { name: a }), o.hidden = !1, n.focus();
			s({
				path: e,
				folder: i.id,
				name: a,
				colors: r.checked
			});
		}, l = e.showDialog(G("div", {
			class: "tm-dialog",
			role: "dialog",
			"aria-modal": "true",
			onkeydown: (e) => {
				e.key === "Enter" && e.target === n && (e.preventDefault(), c());
			}
		}, G("h2", {}, W("remote.record.title")), G("div", { class: "tm-dialog-body" }, G("label", { class: "tm-field" }, G("span", {}, W("remote.record.file")), n, G("small", {}, W("remote.record.hint"))), G("label", { class: "tm-check" }, r, W("remote.record.colors")), o), G("div", { class: "tm-dialog-foot" }, G("button", {
			type: "button",
			class: "tm-btn",
			onclick: () => s(null)
		}, W("remote.cancel")), G("button", {
			type: "button",
			class: "tm-btn primary",
			onclick: c
		}, W("remote.record.start")))), () => t(null));
		n.focus();
	});
}
// src/terminal/keys.js
var ql = [
	"terminal.newShell",
	"terminal.splitRight",
	"terminal.splitDown",
	"terminal.detach",
	"terminal.broadcast",
	"terminal.focusLeft",
	"terminal.focusRight",
	"terminal.focusUp",
	"terminal.focusDown",
	"terminal.previousTab",
	"terminal.nextTab",
	"terminal.moveLeft",
	"terminal.moveRight",
	"terminal.moveUp",
	"terminal.moveDown"
];
function Jl(t) {
	return t.altKey || t.ctrlKey || t.metaKey ? ql.some((n) => {
		try {
			return e.shortcuts.matches(t, n);
		} catch {
			return !1;
		}
	}) : !1;
}
function Yl(t) {
	try {
		return e.shortcuts.label(t);
	} catch {
		return "";
	}
}
// src/terminal/remote/RemoteTab.js
var { h: K, icon: Xl } = e, Zl = {
	background: "#15171b",
	foreground: "#d7dae0",
	cursor: "#d7dae0",
	cursorAccent: "#15171b",
	selectionBackground: "rgba(110,168,255,.35)",
	black: "#1f2228",
	red: "#ff6b6b",
	green: "#5fd38d",
	yellow: "#e8c35a",
	blue: "#6ea8ff",
	magenta: "#c792ea",
	cyan: "#59c7d6",
	white: "#d7dae0",
	brightBlack: "#7d8490",
	brightRed: "#ff8a8a",
	brightGreen: "#7fe3a6",
	brightYellow: "#f2d57e",
	brightBlue: "#94c0ff",
	brightMagenta: "#dbaef5",
	brightCyan: "#7fdbe6",
	brightWhite: "#ffffff"
}, Ql = "ui-monospace, \"Cascadia Mono\", \"JetBrains Mono\", Consolas, \"DejaVu Sans Mono\", \"Liberation Mono\", monospace", $l = 8 << 20, eu = new TextEncoder(), tu = [
	["Ctrl+W", ""],
	["Ctrl+T", ""],
	["Ctrl+N", ""],
	["Ctrl+Q", ""],
	["Ctrl+Tab", "\x1B[27;5;9~"],
	["Ctrl+Alt+Canc", "\x1B[3;7~"],
	["F11", "\x1B[23~"],
	["F12", "\x1B[24~"],
	["Esc", "\x1B"]
], nu = (e) => e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]|\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)|\x1b[()][0-9A-Za-z]|\x1b[=>78DEHM]|[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, ""), ru = (e) => {
	e && navigator.clipboard?.writeText(e).catch(() => {});
}, iu = (e) => K("span", { class: `tm-proto tm-p-${/^[a-z0-9-]+$/.test(e) ? e : "x"}` }, {
	ssh: "SSH",
	telnet: "TELNET",
	rlogin: "RLOGIN",
	supdup: "SUPDUP"
}[e] ?? String(e).toUpperCase().slice(0, 8)), au = class t {
	remote = !0;
	#e;
	#t = null;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s = null;
	#c = null;
	#l = null;
	#u;
	#d = new TextDecoder();
	#f = null;
	constructor(e, t, n) {
		this.#e = e, this.session = t, this.spec = n, this.activity = !1, this.#n = new js({
			fontFamily: Ql,
			fontSize: 13,
			lineHeight: 1.1,
			scrollback: 1e4,
			theme: Zl,
			allowProposedApi: !0,
			cursorBlink: !0,
			macOptionIsMeta: !0,
			rightClickSelectsWord: !1
		}), this.#r = new Ps(), this.#i = new Uc(), this.#n.loadAddon(this.#r), this.#n.loadAddon(this.#i), this.#n.loadAddon(new Bl()), this.#n.unicode.activeVersion = "11", this.#a = K("div", {
			class: "tm-xscreen",
			"aria-label": W("remote.screen")
		}), this.#o = K("div", { class: "tm-status" }), this.el = K("div", {
			class: "tm-pane tm-remote",
			role: "tabpanel"
		}, this.#a, this.#o), this.el.addEventListener("keydown", (e) => {
			Jl(e) || e.stopPropagation();
		}), this.#n.open(this.#a), this.#n.attachCustomKeyEventHandler((e) => this.#y(e)), this.#n.onData((e) => {
			this.#h(eu.encode(e)), this.#e.typed?.(this, e);
		}), this.#n.onBinary((e) => {
			this.#h(Uint8Array.from(e, (e) => e.charCodeAt(0) & 255)), this.#e.typed?.(this, e);
		}), this.#n.onResize(({ cols: e, rows: t }) => {
			this.#g({
				t: "resize",
				cols: e,
				rows: t
			}), this.#b();
		}), this.#n.onTitleChange(() => e.tabChanged(this)), this.#n.onSelectionChange(() => ru(this.#n.getSelection())), this.#u = new ResizeObserver(() => {
			this.el.hidden || this.#p();
		}), this.#u.observe(this.#a), this.#b();
	}
	static restore(e, n) {
		let r = (e) => typeof e == "string" ? e.slice(0, 200) : "", i = {
			id: n.session,
			name: r(n.name) || r(n.address),
			protocol: r(n.protocol) || "ssh",
			address: r(n.address),
			secure: n.secure === !0,
			state: "new",
			info: null
		}, a = n.spec && typeof n.spec == "object" ? n.spec : null;
		return new t(e, i, a);
	}
	get owner() {
		return this.#e;
	}
	set owner(e) {
		this.#e = e;
	}
	get name() {
		return this.session.name;
	}
	get title() {
		return this.#n.title || this.session.title || "";
	}
	get closed() {
		return this.session.state === "closed";
	}
	get subtitle() {
		return this.session.address;
	}
	#p() {
		try {
			this.#r.fit();
		} catch {}
	}
	show() {
		this.el.hidden = !1, this.activity = !1, requestAnimationFrame(() => {
			this.#p(), this.#n.focus();
		});
	}
	hide() {
		this.el.hidden = !0;
	}
	focus() {
		this.#n.focus();
	}
	reflow() {
		this.el.hidden || requestAnimationFrame(() => this.#p());
	}
	state() {
		let e = this.session;
		return {
			kind: "remote",
			session: e.id,
			spec: this.spec,
			name: e.name,
			protocol: e.protocol,
			address: e.address,
			secure: !!e.secure
		};
	}
	receive(e) {
		this.#h(eu.encode(String(e)));
	}
	lost() {
		this.session = {
			...this.session,
			state: "closed"
		}, this.#b(), this.#w(), this.#e.tabChanged(this);
	}
	async attach() {
		this.#m(), this.#C(), this.#p();
		let t = e.term.attach(this.session.id, {
			cols: this.#n.cols,
			rows: this.#n.rows
		});
		this.#t = t, this.#n.reset(), t.onmessage = (e) => this.#t === t ? this.#_(e.data) : null;
	}
	#m() {
		let e = this.#t;
		if (this.#t = null, e) {
			try {
				e.postMessage(JSON.stringify({ t: "detach" }));
			} catch {}
			e.close();
		}
	}
	#h(e) {
		this.#t && !this.closed && this.#t.postMessage(e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength));
	}
	#g(e) {
		this.#t?.postMessage(JSON.stringify(e));
	}
	#_(e) {
		if (typeof e != "string") {
			let t = new Uint8Array(e);
			this.#n.write(t), this.#E(t), this.el.hidden && !this.activity && (this.activity = !0, this.#e.tabChanged(this));
			return;
		}
		let t;
		try {
			t = JSON.parse(e);
		} catch {
			return;
		}
		t.t === "state" && t.session ? (this.session = t.session, this.#b(), this.closed && this.#w(), this.#e.tabChanged(this)) : t.t === "trust" && t.trust ? this.#v(t.trust) : t.t === "taken" ? (this.#t = null, this.#S(W("remote.taken"), [[
			W("remote.takeBack"),
			() => this.attach().catch((e) => this.#e.error(e)),
			!0
		]])) : t.t === "gone" && this.#t && (this.#t = null, this.closed || this.#S(W("remote.lostLink"), [[
			W("remote.attachAgain"),
			() => this.attach().catch((e) => this.#e.error(e)),
			!0
		]]));
	}
	async #v(t) {
		this.#f?.close(null);
		let n = t.changed === !0, r = [
			W(n ? "remote.trust.changedText" : t.kind === "tls" ? "remote.trust.firstTls" : "remote.trust.first"),
			"",
			`${W("remote.trust.server")}: ${t.host ?? ""}`,
			`${W(t.kind === "tls" ? "remote.trust.certificate" : "remote.trust.key")}: ${t.text || t.fingerprint}`,
			...n && t.previous ? [`${W("remote.trust.previous")}: ${t.previous}`] : [],
			"",
			W(n ? "remote.trust.askChanged" : "remote.trust.ask")
		];
		this.#f = e.messageBox(this.#e.win, {
			icon: n ? "error" : "warning",
			title: W(n ? "remote.trust.changedTitle" : "remote.trust.title", { host: t.host ?? "" }),
			text: r.join("\n"),
			buttons: ["cancel", "continue"],
			default: n ? "cancel" : "continue"
		});
		let i = await this.#f;
		this.#f = null, this.#g({
			t: "trust",
			ok: i === "continue"
		}), this.#n.focus();
	}
	#y(e) {
		if (Jl(e)) return !1;
		if (e.type !== "keydown") return !0;
		let t = e.key.toLowerCase();
		if (e.ctrlKey && e.shiftKey && !e.altKey) {
			if (t === "c") return ru(this.#n.getSelection()), e.preventDefault(), !1;
			if (t === "v") return !1;
			if (t === "f") return e.preventDefault(), this.openFind(), !1;
		}
		return !0;
	}
	#b() {
		let e = this.session, t = e.secure ? K("span", { class: "tm-safe" }, Xl("lock"), W("remote.secure")) : K("span", {
			class: "tm-unsafe",
			title: W("remote.insecureHint")
		}, Xl("lockOpen"), W("remote.insecure")), n = () => K("span", { class: "tm-sep" }, "|"), r = [t, K("code", { title: e.address }, e.address)];
		e.info?.key && r.push(n(), K("span", { title: e.info.cipher ? W("remote.cipher", { cipher: e.info.cipher }) : "" }, e.info.key.replace(/^(\S+ SHA256:.{6}).*(.{3})$/, "$1…$2"))), e.info?.tls && r.push(n(), K("span", {}, e.info.tls)), r.push(n(), K("span", {}, e.state === "on" ? `${this.#n.cols} × ${this.#n.rows}` : W(`remote.state.${e.state}`)));
		let i = !!this.#l;
		this.#o.replaceChildren(...r, K("span", { class: "tm-sp" }), K("button", {
			type: "button",
			class: "tm-iconbtn",
			title: W("remote.find"),
			"aria-label": W("remote.find"),
			onclick: () => this.openFind()
		}, Xl("search")), K("button", {
			type: "button",
			class: "tm-iconbtn",
			title: W(i ? "remote.recordStop" : "remote.record"),
			"aria-label": W(i ? "remote.recordStop" : "remote.record"),
			"aria-pressed": i ? "true" : "false",
			onclick: () => this.#T()
		}, Xl(i ? "pause" : "save")), K("button", {
			type: "button",
			class: "tm-btn",
			"aria-haspopup": "menu",
			onclick: (e) => this.#x(e.currentTarget)
		}, Xl("keyboard"), W("remote.keys")));
	}
	#x(t) {
		let n = this.session, r = t.getBoundingClientRect(), i = [
			{
				label: W("remote.keys.send"),
				disabled: !0,
				action: () => {}
			},
			...tu.map(([e, t]) => ({
				label: e,
				action: () => {
					this.#h(eu.encode(t)), this.#n.focus();
				}
			})),
			...(n.signals ?? []).length ? ["-", ...n.signals.map((e) => ({
				label: W(`remote.signal.${e}`),
				action: () => this.#g({
					t: "signal",
					name: e
				})
			}))] : [],
			"-",
			{
				label: W("remote.keys.copy"),
				shortcut: "Ctrl+Maiusc+C",
				action: () => ru(this.#n.getSelection())
			},
			{
				label: W("remote.keys.paste"),
				disabled: !0,
				action: () => {}
			},
			{
				label: W("remote.keys.clear"),
				action: () => this.#n.clear()
			},
			this.closed ? {
				label: W("remote.reconnect"),
				action: () => this.#e.reconnect(this)
			} : {
				label: W("remote.keys.disconnect"),
				action: () => this.#e.closeSession(this)
			}
		];
		e.openMenu(r.left, r.top, i, { placement: "above" });
	}
	openFind() {
		if (this.#c) return this.#c.querySelector("input").focus();
		let e = K("input", {
			type: "text",
			"aria-label": W("remote.find"),
			spellcheck: "false"
		}), t = K("small", {}, ""), n = (t) => {
			let n = { decorations: {
				matchOverviewRuler: "#e8c35a",
				activeMatchColorOverviewRuler: "#ff6b6b",
				matchBackground: "#5a4a1a",
				activeMatchBackground: "#2f6fde"
			} };
			t ? this.#i.findPrevious(e.value, n) : this.#i.findNext(e.value, n);
		};
		this.#i.onDidChangeResults?.((n) => {
			t.textContent = n.resultCount ? W("remote.find.count", {
				i: n.resultIndex + 1,
				n: n.resultCount
			}) : e.value ? W("remote.find.none") : "";
		});
		let r = () => {
			this.#i.clearDecorations(), this.#c?.remove(), this.#c = null, this.#n.focus();
		};
		e.addEventListener("input", () => n(!1)), e.addEventListener("keydown", (e) => {
			e.key === "Enter" ? (e.preventDefault(), n(e.shiftKey)) : e.key === "Escape" && (e.preventDefault(), r());
		}), this.#c = K("div", {
			class: "tm-findbar",
			role: "search"
		}, e, t, K("button", {
			type: "button",
			class: "tm-iconbtn",
			title: W("remote.find.prev"),
			"aria-label": W("remote.find.prev"),
			onclick: () => n(!0)
		}, Xl("arrowUp")), K("button", {
			type: "button",
			class: "tm-iconbtn",
			title: W("remote.find.next"),
			"aria-label": W("remote.find.next"),
			onclick: () => n(!1)
		}, Xl("arrowDown")), K("button", {
			type: "button",
			class: "tm-iconbtn",
			title: W("remote.close"),
			"aria-label": W("remote.close"),
			onclick: r
		}, Xl("x"))), this.#a.append(this.#c), e.focus();
	}
	#S(e, t) {
		this.#C(), this.#s = K("div", {
			class: "tm-overlay",
			role: "status"
		}, Xl("warning"), K("span", {}, e), ...t.map(([e, t, n]) => K("button", {
			type: "button",
			class: `tm-btn${n ? " primary" : ""}`,
			onclick: t
		}, e))), this.#a.append(this.#s);
	}
	#C() {
		this.#s?.remove(), this.#s = null;
	}
	#w() {
		this.#O(), this.#f?.close(null), this.#S(this.session.reason ? W("remote.closedWhy", { reason: this.session.reason }) : W("remote.closed"), [[W("remote.closeTab"), () => this.#e.closeTab(this)], ...this.spec ? [[
			W("remote.reconnect"),
			() => this.#e.reconnect(this),
			!0
		]] : []]);
	}
	async replace(e) {
		this.session = e, this.#n.reset(), this.#b(), await this.attach();
	}
	async #T() {
		if (this.#l) return this.#O();
		let e = await Kl(this.#e, this.name);
		if (!e) return this.#n.focus();
		this.#l = {
			...e,
			chunks: [],
			size: 0,
			timer: setInterval(() => this.#D(), 2e3),
			saving: !1
		}, this.#b(), await this.#D(), this.#n.focus();
	}
	#E(t) {
		let n = this.#l;
		if (!n) return;
		let r = this.#d.decode(t, { stream: !0 }), i = n.colors ? r : nu(r.replace(/\r\n/g, "\n").replace(/\r(?!\n)/g, ""));
		n.chunks.push(i), n.size += i.length, n.size > $l && (e.notifications?.send?.({
			text: W("remote.record.full", { path: n.path }),
			level: "warning"
		}), this.#O());
	}
	async #D() {
		let t = this.#l;
		if (t && !t.saving) {
			t.saving = !0;
			try {
				let n = t.chunks.join(""), r = t.node && e.fs.get(t.node);
				r ? await e.fs.write(r.id, n) : (t.node = e.fs.create(t.folder, {
					type: "file",
					name: t.name
				}).id, await e.fs.write(t.node, n));
			} catch (e) {
				this.#e.error(W("remote.record.failed", { error: e.message })), clearInterval(t.timer), this.#l = null, this.#b();
			}
			t.saving = !1;
		}
	}
	#O() {
		let t = this.#l;
		t && (clearInterval(t.timer), t.saving = !1, this.#D().then(() => e.notifications?.send?.({
			text: W("remote.record.saved", { path: t.path }),
			level: "success"
		})), this.#l = null, this.#b());
	}
	dispose() {
		this.#O(), this.#f?.close(null), this.#m(), this.#u.disconnect(), this.#n.dispose();
	}
}, ou = class {
	tabs = [];
	current = null;
	constructor() {
		this.bar = a("div", {
			class: "tm-tabs",
			role: "tablist",
			"aria-label": W("remote.tabs")
		}), this.panes = a("div", { class: "tm-panes" }), this.el = a("div", { class: "tm-group" }, this.bar, this.panes);
	}
}, su = {
	row: 140,
	column: 90
}, cu = (e) => !!e && !(e instanceof ou) && Array.isArray(e.items), lu = class {
	root = null;
	constructor(e) {
		this.onChange = e, this.el = a("div", { class: "tm-grid" });
	}
	groups() {
		let e = [], t = (n) => cu(n) ? n.items.forEach(t) : n && e.push(n);
		return t(this.root), e;
	}
	parentOf(e, t = this.root) {
		if (!cu(t)) return null;
		let n = t.items.indexOf(e);
		if (n >= 0) return {
			split: t,
			index: n
		};
		for (let n of t.items) {
			let t = this.parentOf(e, n);
			if (t) return t;
		}
		return null;
	}
	#e(e, t) {
		let n = this.parentOf(e);
		n ? n.split.items[n.index] = t : this.root = t;
	}
	split(e, t, n) {
		let r = t === "left" || t === "right" ? "row" : "column", i = t === "right" || t === "down", a = this.parentOf(e);
		if (a && a.split.dir === r) {
			let e = a.split.sizes[a.index] / 2;
			a.split.sizes[a.index] = e;
			let t = i ? a.index + 1 : a.index;
			a.split.items.splice(t, 0, n), a.split.sizes.splice(t, 0, e);
		} else this.#e(e, {
			dir: r,
			items: i ? [e, n] : [n, e],
			sizes: [.5, .5]
		});
		this.render();
	}
	remove(e) {
		let t = this.parentOf(e);
		if (!t) return;
		let { split: n, index: r } = t, i = n.sizes[r];
		if (n.items.splice(r, 1), n.sizes.splice(r, 1), n.sizes[Math.max(0, r - 1)] += i, n.items.length === 1) {
			let e = n.items[0], t = this.parentOf(n);
			if (t && cu(e) && e.dir === t.split.dir) {
				let n = t.split.sizes[t.index];
				t.split.items.splice(t.index, 1, ...e.items), t.split.sizes.splice(t.index, 1, ...e.sizes.map((e) => e * n));
			} else this.#e(n, e);
		}
		this.render();
	}
	neighbor(e, t) {
		let n = e.el.getBoundingClientRect(), r = null, i = Infinity;
		for (let a of this.groups()) {
			if (a === e) continue;
			let o = a.el.getBoundingClientRect(), s, c;
			if (t === "left" || t === "right" ? (s = t === "left" ? n.left - o.right : o.left - n.right, c = Math.min(n.bottom, o.bottom) - Math.max(n.top, o.top)) : (s = t === "up" ? n.top - o.bottom : o.top - n.bottom, c = Math.min(n.right, o.right) - Math.max(n.left, o.left)), s < -2 || c <= 0) continue;
			let l = s * 1e3 - c;
			l < i && (r = a, i = l);
		}
		return r;
	}
	render() {
		let e = (t) => {
			if (!cu(t)) return t.el;
			let n = a("div", { class: `tm-split ${t.dir}` });
			return t.items.forEach((r, i) => {
				i && n.append(this.#t(t, i, n));
				let a = e(r);
				a.style.flex = `${t.sizes[i]} 1 0`, n.append(a);
			}), n;
		};
		if (!this.root) return this.el.replaceChildren();
		let t = e(this.root);
		t.style.flex = "", this.el.replaceChildren(t), this.el.classList.toggle("many", cu(this.root)), this.onChange?.();
	}
	#t(e, t, n) {
		let r = e.dir === "row", i = () => {
			let t = n.getBoundingClientRect(), i = (e.items.length - 1) * 5;
			return Math.max(1, (r ? t.width : t.height) - i);
		}, o = () => {
			[...n.children].filter((e) => !e.classList.contains("tm-gutter")).forEach((t, n) => {
				t.style.flex = `${e.sizes[n]} 1 0`;
			});
		}, s = (n, r) => {
			let i = Math.min(.45, su[e.dir] / r), a = e.sizes[t - 1] + e.sizes[t], s = Math.max(i, Math.min(a - i, e.sizes[t - 1] + n));
			e.sizes[t - 1] = s, e.sizes[t] = a - s, o();
		}, c = a("div", {
			class: "tm-gutter",
			role: "separator",
			tabindex: "0",
			title: W("grid.gutter"),
			"aria-orientation": r ? "vertical" : "horizontal",
			"aria-label": W("grid.gutter"),
			onpointerdown: (n) => {
				if (n.button !== 0) return;
				n.preventDefault();
				let a = i(), o = e.sizes[t - 1];
				c.classList.add("on"), d(n, {
					threshold: 0,
					onMove: (n, i) => {
						e.sizes[t] += e.sizes[t - 1] - o, e.sizes[t - 1] = o, s((r ? n : i) / a, a);
					},
					onEnd: () => {
						c.classList.remove("on"), this.onChange?.();
					}
				});
			},
			ondblclick: () => {
				e.sizes = e.items.map(() => 1 / e.items.length), o(), this.onChange?.();
			},
			onkeydown: (e) => {
				let t = r ? {
					ArrowLeft: -1,
					ArrowRight: 1
				} : {
					ArrowUp: -1,
					ArrowDown: 1
				};
				e.key in t && (e.preventDefault(), e.stopPropagation(), s(t[e.key] * .05, i()), this.onChange?.());
			}
		});
		return c;
	}
	toJSON(e) {
		let t = (n) => cu(n) ? {
			dir: n.dir,
			sizes: n.sizes.map((e) => Math.round(e * 1e4) / 1e4),
			items: n.items.map(t)
		} : {
			tabs: n.tabs.map(e),
			current: Math.max(0, n.tabs.indexOf(n.current))
		};
		return this.root ? t(this.root) : null;
	}
	load(e, t, n = 0) {
		let r = (e, n) => {
			if (!e || typeof e != "object" || n > 12) return null;
			if (Array.isArray(e.items)) {
				let t = e.dir === "column" ? "column" : "row", i = e.items.slice(0, 64).map((t, i) => [r(t, n + 1), Number(e.sizes?.[i])]).filter(([e]) => e);
				if (!i.length) return null;
				if (i.length === 1) return i[0][0];
				let a = i.map(([, e]) => Number.isFinite(e) && e > 0 ? e : 1), o = a.reduce((e, t) => e + t, 0);
				return {
					dir: t,
					items: i.map(([e]) => e),
					sizes: a.map((e) => e / o)
				};
			}
			return t(e);
		};
		return this.root = r(e, n), this.render(), !!this.root;
	}
}, uu = /* @__PURE__ */ new WeakMap(), du = .25;
function fu(e, t, n) {
	if (e.button !== 0) return;
	let r = null, i = null, s = null, c = !1, l = () => {
		i?.remove(), i = null;
	}, u = (e) => {
		e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), c = !0, r?.remove(), l());
	};
	d(e, {
		threshold: 6,
		onMove: (e, d, f) => {
			c || (r || (r = a("div", {
				class: "tm-ghost",
				"aria-hidden": "true"
			}, t.remote ? iu(t.session.protocol) : o("terminal"), a("span", {}, n.nameOf(t))), document.body.append(r), addEventListener("keydown", u, !0)), r.style.left = `${f.clientX + 10}px`, r.style.top = `${f.clientY + 8}px`, s = pu(f.clientX, f.clientY, t, n), s?.kind === "window" && Object.assign(s, {
				dx: e,
				dy: d
			}), l(), i = mu(s, t, n, f));
		},
		onEnd: (e, i) => {
			removeEventListener("keydown", u, !0), r?.remove(), l(), e && !c && s && n.drop(t, s, i);
		}
	});
}
function pu(e, t, n, r) {
	let i = document.elementsFromPoint(e, t).find((e) => !e.closest(".tm-ghost, .tm-mark")), a = i?.closest(".tm-group"), o = a && uu.get(a);
	if (!o) return i && r.win.el.contains(i) ? null : { kind: "window" };
	let { group: s } = o, c = s.tabs.includes(n), l = i.closest(".tm-tabs");
	if (l) {
		let t = [...l.querySelectorAll(".tm-tab")], n = t.findIndex((t) => {
			let n = t.getBoundingClientRect();
			return e < n.left + n.width / 2;
		});
		return n < 0 && (n = t.length), {
			kind: "bar",
			owner: o.owner,
			group: s,
			index: n
		};
	}
	let u = s.panes.getBoundingClientRect(), d = (e - u.left) / u.width, f = (t - u.top) / u.height, p = [
		["left", d],
		["right", 1 - d],
		["up", f],
		["down", 1 - f]
	].sort((e, t) => e[1] - t[1])[0];
	return p[1] < du ? c && s.tabs.length === 1 ? null : {
		kind: "split",
		owner: o.owner,
		group: s,
		side: p[0]
	} : c ? null : {
		kind: "pane",
		owner: o.owner,
		group: s
	};
}
function mu(e, t, n, r) {
	if (!e) return null;
	if (e.kind === "window") {
		if (n.tabs.length < 2) return null;
		let e = n.win.el.getBoundingClientRect(), i = a("div", {
			class: "tm-mark tm-mark-window",
			style: {
				left: `${r.clientX - 60}px`,
				top: `${r.clientY - 14}px`,
				width: `${e.width}px`,
				height: `${e.height}px`
			}
		}, a("span", {}, o("window"), W("drag.newWindow", { name: n.nameOf(t) })));
		return document.body.append(i), i;
	}
	if (e.kind === "bar") {
		let { bar: t } = e.group, n = [...t.querySelectorAll(".tm-tab")], r = t.getBoundingClientRect(), i = n[e.index], o = i ? i.getBoundingClientRect().left - 2 : (n.at(-1)?.getBoundingClientRect().right ?? r.left + 30) + 1, s = a("div", {
			class: "tm-mark tm-mark-line",
			style: {
				left: `${o}px`,
				top: `${r.top + 4}px`,
				height: `${r.height - 6}px`
			}
		});
		return document.body.append(s), s;
	}
	let i = e.group.panes.getBoundingClientRect(), s = {
		left: i.left,
		top: i.top,
		width: i.width,
		height: i.height
	};
	e.kind === "split" && (e.side === "right" && (s.left += i.width / 2), e.side === "down" && (s.top += i.height / 2), e.side === "left" || e.side === "right" ? s.width /= 2 : s.height /= 2);
	let c = e.kind === "pane" ? W("drag.pane") : W(`drag.split.${e.side}`), l = a("div", {
		class: "tm-mark tm-mark-area",
		style: Object.fromEntries(Object.entries(s).map(([e, t]) => [e, `${t}px`]))
	}, a("span", {}, c));
	return document.body.append(l), l;
}
// src/terminal/shell/pattern.js
var hu = {
	alpha: "a-zA-Z",
	digit: "0-9",
	alnum: "a-zA-Z0-9",
	upper: "A-Z",
	lower: "a-z",
	space: "\\s",
	blank: " \\t",
	punct: "!-\\/:-@\\[-`{-~",
	xdigit: "0-9A-Fa-f",
	word: "\\w",
	cntrl: "\\x00-\\x1f\\x7f",
	print: "\\x20-\\x7e",
	graph: "\\x21-\\x7e"
}, gu = /* @__PURE__ */ new Map(), _u = (e) => String(e).replace(/[\\*?[\]]/g, "\\$&"), vu = (e) => e.replace(/[.*+?^${}()|[\]\\/-]/g, "\\$&");
function yu(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (n === "\\") t++;
		else if (n === "*" || n === "?") return !0;
		else if (n === "[" && bu(e, t) > 0) return !0;
	}
	return !1;
}
function bu(e, t) {
	let n = t + 1;
	for ((e[n] === "!" || e[n] === "^") && n++, e[n] === "]" && n++; n < e.length; n++) if (e[n] === "\\") n++;
	else if (e[n] === "[" && e[n + 1] === ":") {
		let t = e.indexOf(":]", n + 2);
		t > 0 && (n = t + 1);
	} else if (e[n] === "]") return n;
	return -1;
}
function xu(e) {
	let t = "";
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === "\\") n + 1 < e.length ? t += vu(e[++n]) : t += "\\\\";
		else if (r === "*") t += "[\\s\\S]*";
		else if (r === "?") t += "[\\s\\S]";
		else if (r === "[" && bu(e, n) > 0) {
			let r = bu(e, n), i = n + 1, a = "";
			for ((e[i] === "!" || e[i] === "^") && (a += "^", i++); i < r; i++) {
				let t = e[i];
				if (t === "[" && e[i + 1] === ":") {
					let t = e.indexOf(":]", i + 2), n = e.slice(i + 2, t);
					a += hu[n] ?? "", i = t + 1;
				} else t === "\\" ? a += "\\" + (e[++i] ?? "\\") : t === "-" && i > n + 1 && i < r - 1 && a && a !== "^" ? a += "-" : a += /[\]\\^-]/.test(t) ? "\\" + t : t;
			}
			t += `[${a}]`, n = r;
		} else t += vu(r);
	}
	return t;
}
function Su(e, t, { ignoreCase: n = !1 } = {}) {
	let r = (n ? "i" : "s") + e, i = gu.get(r);
	return i || (i = RegExp(`^(?:${xu(e)})$`, n ? "i" : ""), gu.size > 500 && gu.clear(), gu.set(r, i)), i.test(t);
}
var Cu = (e) => String(e).replace(/\\([\s\S])/g, "$1");
// src/terminal/shell/paths.js
function wu(e, t) {
	t = String(t);
	let n = i.home, r;
	if (t === "~" || t.startsWith("~/")) r = t.slice(1);
	else if (t.startsWith("/")) {
		let e = t.toLowerCase(), i = n.toLowerCase();
		r = e === i || e.startsWith(i + "/") ? t.slice(n.length) : t;
	} else r = i.ancestors(e).slice(1).map((e) => e.name).join("/") + "/" + t;
	let a = [];
	for (let e of r.split("/")) e && e !== "." && (e === ".." ? a.pop() : a.push(e));
	return a;
}
function Tu(e, t) {
	return t === "" ? null : i.resolve("~/" + wu(e, t).join("/"));
}
function Eu(e, t) {
	let n = wu(e, t), r = n.pop() ?? "";
	return {
		parent: i.resolve("~/" + n.join("/")),
		name: r
	};
}
function Du(e) {
	let t = i.ancestors(e).slice(1).map((e) => e.name);
	return t.length ? "~/" + t.join("/") : "~";
}
var Ou = (e, t) => e === "" ? t : e.endsWith("/") ? e + t : `${e}/${t}`;
function ku(e, t) {
	let n = t.startsWith("/"), r = t.split("/"), a = [n ? "/" : ""];
	n && r.shift();
	let o = !1;
	return r.forEach((t) => {
		if (t === "") return;
		if (!yu(t)) {
			a = a.map((e) => Ou(e, Cu(t)));
			return;
		}
		o = !0;
		let n = [];
		for (let r of a) {
			let a = Tu(e, r || ".");
			a?.type === "folder" && i.children(a.id).map((e) => e.name).filter((e) => (!e.startsWith(".") || t.startsWith(".") || t.startsWith("\\.")) && Su(t, e)).sort(Au).forEach((e) => n.push(Ou(r, e)));
		}
		a = n;
	}), o ? (t.endsWith("/") && (a = a.filter((t) => Tu(e, t)?.type === "folder").map((e) => e + "/")), a.filter((t) => Tu(e, t))) : [];
}
var Au = (e, t) => e.localeCompare(t), ju = "terminal.options", Mu = { openTerm: "window" }, Nu = { openTerm: ["window", "tab"] }, Pu = () => {
	let e = l.get(ju, {});
	return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}, Fu = {
	get(e) {
		let t = Pu()[e];
		return Nu[e]?.includes(t) ? t : Mu[e];
	},
	set(e, t) {
		Nu[e]?.includes(t) && l.set(ju, {
			...Pu(),
			[e]: t
		});
	}
}, Iu = "terminal-options", Lu = null;
function Ru(e) {
	if (Lu?.el.isConnected) return e(Lu, Iu);
	let n = new t({
		title: W("options.title"),
		icon: "terminal",
		width: 640,
		height: 400,
		search: !1,
		tabs: [{
			id: "general",
			label: W("options.tab.general"),
			icon: "gear",
			description: W("options.tab.generalDescription"),
			sections: () => [{
				title: W("options.files"),
				rows: [{
					label: W("options.openTerm"),
					description: W("options.openTermDescription"),
					control: s({
						value: Fu.get("openTerm"),
						label: W("options.openTerm"),
						options: Nu.openTerm.map((e) => ({
							value: e,
							label: W(`options.openTerm.${e}`)
						})),
						onChange: (e) => Fu.set("openTerm", e)
					})
				}]
			}]
		}]
	});
	return Lu = n, n.on("destroy", () => {
		Lu === n && (Lu = null);
	}), e(n, Iu);
}
// src/terminal/termFile.js
var { h: q, fs: zu, storage: Bu } = e, Vu = "lilos.term", Hu = "terminal.trusted", Uu = /^[a-z][a-z0-9-]{0,30}$/, Wu = 262144, Gu = (e, t) => typeof e == "string" && e.length <= t && !/[\0]/.test(e) ? e : void 0;
function Ku(e) {
	let t;
	try {
		t = JSON.parse(String(e).slice(0, Wu));
	} catch {
		t = null;
	}
	if (!t || typeof t != "object" || t.type !== "lilos.term" || t.version !== 1 || !Uu.test(t.protocol ?? "")) throw Error(W("file.invalid"));
	let n = {
		type: Vu,
		version: 1,
		protocol: t.protocol,
		name: Gu(t.name, 60) ?? ""
	};
	if (t.protocol !== "local") {
		let e = {};
		for (let [n, r] of Object.entries(t.values && typeof t.values == "object" ? t.values : {})) /^[a-zA-Z][a-zA-Z0-9_]{0,40}$/.test(n) && (["number", "boolean"].includes(typeof r) || Gu(r, 4096) !== void 0) && (e[n] = r);
		n.values = e, t.settings && typeof t.settings == "object" && (n.settings = Object.fromEntries(Object.entries(t.settings).filter(([e, t]) => [
			"term",
			"encoding",
			"backspace"
		].includes(e) && Gu(t, 40) !== void 0))), Gu(t.sealed, 65536) && (n.sealed = t.sealed);
	}
	return Gu(t.cwd, 4096) && (n.cwd = t.cwd), Gu(t.command, 4096)?.trim() && (n.command = t.command), (t.open === "tab" || t.open === "window") && (n.open = t.open), n;
}
var qu = (e) => `${JSON.stringify(e, null, 2)}\n`;
async function Ju(e) {
	let t = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(e)));
	return [...new Uint8Array(t)].map((e) => e.toString(16).padStart(2, "0")).join("");
}
var Yu = () => {
	let e = Bu.get(Hu, []);
	return Array.isArray(e) ? e.filter((e) => typeof e == "string") : [];
};
async function Xu(e) {
	return Yu().includes(await Ju(e));
}
async function Zu(e) {
	let t = await Ju(e);
	Bu.set(Hu, [...Yu().filter((e) => e !== t), t].slice(-300));
}
function Qu(e) {
	if (e.protocol === "local") return e.cwd || "~";
	let t = e.values ?? {};
	return `${e.protocol}://${t.user ? `${t.user}@` : ""}${t.host ?? ""}${t.port ? `:${t.port}` : ""}`;
}
async function $u(t, n, { fresh: r = !1 } = {}) {
	let i = zu.get(n);
	if (i?.type !== "file") throw Error(W("file.missing"));
	let a = await zu.read(n), o = Ku(a), s = o.protocol === "local" ? o.command : o.values.command;
	if (s && !await Xu(a)) {
		if (await e.messageBox(t.win, {
			icon: "warning",
			title: W("file.command.title"),
			text: W("file.command.text", {
				name: i.name,
				command: s
			}),
			buttons: ["cancel", "continue"],
			default: "cancel"
		}) !== "continue") return;
		await Zu(a);
	}
	let c = (r ? "tab" : o.open ?? Fu.get("openTerm")) === "window" ? t.newWindow({ empty: !0 }) : t, l = o.name || i.name.replace(/\.term$/i, "");
	try {
		if (o.protocol === "local") {
			let e = o.cwd ? zu.resolve(o.cwd) : null;
			if (o.cwd && e?.type !== "folder") throw Error(W("file.noFolder", { path: o.cwd }));
			let t = c.makeShell({
				cwd: e?.id,
				run: o.command
			});
			t.customName = o.name || null, c.add(t);
			return;
		}
		if (!e.term?.available) throw Error(W("remote.cmd.unavailable"));
		let t = {
			protocol: o.protocol,
			values: o.values,
			name: l,
			...o.settings && { settings: o.settings },
			...o.cwd && { cwd: o.cwd }
		};
		try {
			await c.openRemote(o.sealed ? {
				...t,
				sealed: o.sealed
			} : t);
		} catch (n) {
			if (!o.sealed || n?.code !== "forbidden") throw n;
			e.notifications?.send?.({
				text: `${i.name}: ${n.message}`,
				level: "warning"
			}), await c.openRemote(t);
		}
	} finally {
		c !== t && !c.tabs.length && c.win.emit("close");
	}
}
function ed(e, { tab: t, host: n }) {
	if (n) return {
		name: n.name,
		protocol: n.protocol,
		values: { ...n.values },
		settings: n.settings,
		host: n
	};
	if (!t.remote) {
		let e = t.shell.cwd;
		return {
			name: t.customName || (e === zu.root ? W("ui.title") : zu.get(e)?.name ?? W("ui.title")),
			protocol: "local",
			cwd: Du(e)
		};
	}
	let r = t.spec;
	if (!r) return null;
	if (r.host) {
		let n = e.data.hosts.find((e) => e.id === r.host);
		return n ? {
			...ed(e, { host: n }),
			name: t.customName || n.name,
			cwd: r.cwd
		} : null;
	}
	return !r.protocol || !r.values ? null : {
		name: e.nameOf(t),
		protocol: r.protocol,
		values: { ...r.values },
		settings: r.settings,
		cwd: r.cwd
	};
}
var td = (e, t) => !!ed(e, { tab: t }), nd = () => zu.children(zu.root).find((e) => e.system && e.type === "folder" && e.name === f)?.id ?? null, rd = (e) => `${String(e).replace(/[\\/:*?"<>|\x00-\x1f]+/g, "_").replace(/\s+/g, " ").trim().slice(0, 80) || "terminal"}.term`;
function id(e, t) {
	let n = new Set(zu.children(e).map((e) => e.name.toLowerCase()));
	if (!n.has(t.toLowerCase())) return t;
	let r = t.replace(/\.term$/i, "");
	for (let e = 2;; e++) if (!n.has(`${r} (${e}).term`.toLowerCase())) return `${r} (${e}).term`;
}
async function ad(e, t, n) {
	let r = qu(n), i = zu.create(e, {
		type: "file",
		name: t
	});
	return await zu.write(i.id, r), await Zu(r), i;
}
var od = (e, t = {}) => {
	let n = {
		type: Vu,
		version: 1,
		name: e.name,
		protocol: e.protocol
	};
	return e.protocol !== "local" && (n.values = e.values, e.settings && (n.settings = e.settings)), e.cwd && (n.cwd = e.cwd), {
		...n,
		...t
	};
};
async function sd(t, n) {
	let r = ed(t, n), i = nd();
	if (!r || !i) throw Error(W("file.cannot"));
	let a = await ad(i, id(i, rd(r.name)), od(r));
	e.notifications?.send?.({
		text: W("file.onDesk", { name: a.name }),
		level: "success"
	});
}
function cd(e, t) {
	return e?.fields?.filter((e) => e.secret && (!e.when || Object.entries(e.when).every(([e, n]) => Array.isArray(n) ? n.includes(t[e]) : t[e] === n))) ?? [];
}
function ld(t, n) {
	let r = ed(t, n);
	if (!r) return t.error(W("file.cannot"));
	let i = r.protocol === "local", a = t.data.protocols.find((e) => e.id === r.protocol), o = nd() ?? zu.root, s = q("input", {
		type: "text",
		value: rd(r.name).replace(/\.term$/, ""),
		maxLength: 80,
		spellcheck: "false"
	}), c = q("input", {
		type: "text",
		value: Du(o),
		readOnly: !0,
		tabIndex: -1
	}), l = q("input", {
		type: "text",
		value: r.cwd ?? "",
		spellcheck: "false",
		placeholder: i ? "~/Documenti" : "/var/www"
	}), u = q("input", {
		type: "text",
		value: "",
		spellcheck: "false",
		placeholder: i ? "ls -l" : ""
	}), d = q("select", {}, q("option", { value: "" }, W("file.openDefault", { how: W(`options.openTerm.${Fu.get("openTerm")}`) })), q("option", { value: "tab" }, W("options.openTerm.tab")), q("option", { value: "window" }, W("options.openTerm.window"))), f = q("input", { type: "checkbox" }), p = !!r.host?.remembered, m = i ? [] : cd(a, r.values), h = {}, g = q("div", {
		class: "tm-fields",
		hidden: !0
	}, ...p ? [q("small", { class: "tm-hint" }, W("file.passwordSaved"))] : m.map((t) => {
		let n = q("input", {
			type: t.type === "password" ? "password" : "text",
			autocomplete: "off",
			spellcheck: "false",
			placeholder: t.type === "file" ? "~/.ssh/id_ed25519" : "",
			oninput: () => {
				h[t.key] = n.value;
			}
		});
		return q("label", { class: "tm-field" }, q("span", {}, e.term.text(t.label)), n);
	}));
	f.addEventListener("change", () => {
		g.hidden = !f.checked;
	});
	let _ = q("p", {
		class: "tm-error",
		role: "alert",
		hidden: !0
	}), y = (e) => {
		_.textContent = e, _.hidden = !1;
	}, ee = async () => {
		let e = await v(t.openWindow, {
			kind: "folder",
			title: W("file.pickFolder")
		});
		e && (o = e.id, c.value = Du(o));
	}, b = async () => {
		_.hidden = !0;
		let t = rd(s.value);
		if (!zu.get(o)) return y(W("file.noFolder", { path: c.value }));
		if (zu.children(o).some((e) => e.name.toLowerCase() === t.toLowerCase())) return y(W("file.exists", { name: t }));
		let n = l.value.trim();
		if (n && i && zu.resolve(n)?.type !== "folder") return y(W("file.noFolder", { path: n }));
		if (n && !i && !n.startsWith("/")) return y(W("file.serverFolder"));
		let a = { cwd: n || void 0 };
		i && u.value.trim() && (a.command = u.value.trim()), !i && u.value.trim() && (a.values = {
			...r.values,
			command: u.value.trim()
		}), d.value && (a.open = d.value);
		try {
			if (f.checked) {
				if (p) a.sealed = await e.term.seal({ host: r.host.id });
				else {
					let t = {};
					for (let e of m) {
						let n = h[e.key]?.trim?.() ? h[e.key] : "";
						if (n) {
							if (e.type === "file") {
								let r = zu.resolve(n.startsWith("~") || n.startsWith("/") ? n : `~/${n}`);
								if (r?.type !== "file") return y(W("err.noSuchFile", { path: n }));
								t[e.key] = await zu.read(r.id);
							} else t[e.key] = n;
						}
					}
					if (!Object.keys(t).length) return y(W("file.noPassword"));
					a.sealed = await e.term.seal({
						protocol: r.protocol,
						values: a.values ?? r.values,
						secret: t
					});
				}
			}
			let n = JSON.parse(JSON.stringify(od(r, a))), i = await ad(o, t, n);
			S.close(), e.notifications?.send?.({
				text: W("file.saved", { path: Du(i.id) }),
				level: "success"
			});
		} catch (e) {
			y(e.message);
		}
	}, x = i ? null : q("div", { class: "tm-summary" }, iu(r.protocol), q("code", {}, Qu({
		protocol: r.protocol,
		values: r.values
	}))), S = t.showDialog(q("div", {
		class: "tm-dialog",
		role: "dialog",
		"aria-modal": "true",
		onkeydown: (e) => {
			e.key === "Enter" && e.target.tagName === "INPUT" && e.target.type !== "checkbox" && (e.preventDefault(), b());
		}
	}, q("h2", {}, W("file.saveTitle")), q("div", { class: "tm-dialog-body" }, q("label", { class: "tm-field" }, q("span", {}, W("file.name")), q("div", { class: "tm-suffix" }, s, q("span", {}, ".term"))), q("div", { class: "tm-field" }, q("span", {}, W("file.folder")), q("div", { class: "tm-row" }, c, q("button", {
		type: "button",
		class: "tm-btn",
		onclick: ee
	}, W("file.change")))), x, q("label", { class: "tm-field" }, q("span", {}, W(i ? "file.cwdLocal" : "file.cwdRemote")), l), (i || r.protocol === "ssh") && q("label", { class: "tm-field" }, q("span", {}, W(i ? "file.command" : "file.commandRemote")), u, !i && q("small", {}, W("file.commandRemoteHint"))), q("label", { class: "tm-field" }, q("span", {}, W("file.openAs")), d), !i && (p || m.length) && q("label", { class: "tm-check" }, f, W("file.keepPassword")), !i && g, !i && q("small", { class: "tm-hint" }, W("file.passwordHint")), _), q("div", { class: "tm-dialog-foot" }, q("button", {
		type: "button",
		class: "tm-btn",
		onclick: () => S.close()
	}, W("remote.cancel")), q("button", {
		type: "button",
		class: "tm-btn primary",
		onclick: b
	}, W("file.save")))));
	s.select();
}
// src/terminal/window.js
var { h: J, icon: ud, fs: dd, storage: fd } = e, pd = "terminal.side", md = "terminal.sshHere", hd = {
	focusLeft: "left",
	focusRight: "right",
	focusUp: "up",
	focusDown: "down",
	moveLeft: "left",
	moveRight: "right",
	moveUp: "up",
	moveDown: "down"
}, gd = /* @__PURE__ */ new Set(), _d = class {
	data = {
		protocols: [],
		encodings: [],
		hosts: [],
		sessions: []
	};
	active = null;
	broadcast = !1;
	#e;
	#t;
	#n = [];
	#r = null;
	constructor(t, n, { makeShell: r, makeWindow: i, openWindow: a }) {
		this.win = t, this.openWindow = a, this.#e = r, this.#t = i, this.remote = {
			data: () => this.load(),
			open: (e) => this.openRemote(e),
			resume: (e) => this.resume(e)
		}, this.side = J("aside", {
			class: "tm-side",
			"aria-label": W("remote.side.label")
		}), this.grid = new lu(() => this.#u()), t.body.classList.add("tm"), t.body.append(J("div", { class: "tm-layout" }, this.side, this.grid.el)), this.side.hidden = fd.get(pd, !1) !== !0, gd.add(this);
		let o = e.term;
		o && (this.#n.push(o.on("hosts", () => this.load()), o.on("sessions", () => this.load())), this.load()), this.#n.push(...ql.map((e) => m(e, {
			isActive: () => t.active,
			run: () => this.command(e)
		}))), t.on("destroy", () => {
			gd.delete(this), this.#n.forEach((e) => e?.());
			for (let e of this.tabs) e.dispose();
		}), n?.layout && this.#d(n.layout) || (this.grid.root = this.#a(), this.grid.render(), this.active = this.grid.root, !n?.empty && !n?.file && this.add(this.#e(this, n))), n?.file ? this.#i(n.file, !0) : n?.action && this.launched(n);
	}
	makeShell(e = {}) {
		return this.#e(this, e);
	}
	get tabs() {
		return this.grid.groups().flatMap((e) => e.tabs);
	}
	get current() {
		return this.active?.current ?? null;
	}
	groupOf(e) {
		return this.grid.groups().find((t) => t.tabs.includes(e)) ?? null;
	}
	firstLocal() {
		return this.tabs.find((e) => !e.remote) ?? null;
	}
	nameOf(e) {
		return e.customName || e.name;
	}
	label() {
		let e = this.tabs.length;
		return `${this.current ? this.nameOf(this.current) : W("ui.title")} · ${W("tabs.count", { n: e })}`;
	}
	error(t) {
		e.notifications?.send?.({
			text: `${W("ui.title")}: ${t?.message ?? t}`,
			level: "error"
		});
	}
	launched(e) {
		if (e?.file) return this.#i(e.file, !1);
		if (e?.action === md && Array.isArray(e.files) && e.files[0]) return this.openHere(e.files[0]);
		if (e?.cwd && dd.get(e.cwd)?.type === "folder") {
			let t = this.current && !this.current.remote ? this.current : this.firstLocal() ?? this.add(this.#e(this, {}));
			this.select(t), t.changeDir(e.cwd);
		}
	}
	#i(e, t) {
		$u(this, e, { fresh: t }).catch((e) => this.error(e)).finally(() => {
			t && !this.tabs.length && this.add(this.#e(this, {}));
		});
	}
	newWindow(e = { empty: !0 }, t = null) {
		let n = this.win.el;
		return this.#t({
			...e,
			size: {
				w: parseFloat(n.style.width) || n.offsetWidth,
				h: parseFloat(n.style.height) || n.offsetHeight
			}
		}, t);
	}
	async load() {
		return e.term && (this.#r ??= e.term.load().then((e) => {
			this.data = e;
		}, (e) => {
			this.data = {
				...this.data,
				error: e.message
			};
		}).finally(() => {
			this.#r = null, this.drawSide(), this.drawTabs();
		}), await this.#r), this.data;
	}
	#a() {
		let e = new ou();
		return uu.set(e.el, {
			owner: this,
			group: e
		}), e.el.addEventListener("pointerdown", () => this.#o(e), !0), e.el.addEventListener("focusin", () => this.#o(e)), e.bar.addEventListener("contextmenu", (t) => {
			t.target === e.bar && (t.preventDefault(), this.#f(t.clientX, t.clientY));
		}), e.bar.addEventListener("dblclick", (t) => {
			t.target === e.bar && this.add(this.#e(this, { cwd: this.#c(e) }), e);
		}), e;
	}
	#o(e) {
		this.active !== e && (this.active = e, this.#s(), e.current && this.win.setTitle(W("ui.title"), e.current.subtitle));
	}
	#s() {
		for (let e of this.grid.groups()) e.el.classList.toggle("active", e === this.active);
	}
	#c(e) {
		return (e?.current && !e.current.remote ? e.current : this.firstLocal())?.shell.cwd;
	}
	add(e, t = this.active ?? this.grid.groups()[0], n = t.tabs.length) {
		return e.owner = this, t.tabs.splice(Math.max(0, Math.min(n, t.tabs.length)), 0, e), t.panes.append(e.el), this.select(e), e;
	}
	select(e) {
		let t = this.groupOf(e);
		if (t) {
			t.current = e;
			for (let n of t.tabs) n !== e && n.hide();
			e.show(), e.activity = !1, this.active = t, this.#s(), this.win.setTitle(W("ui.title"), e.subtitle), this.drawTabs(t);
		}
	}
	tabChanged(e) {
		e === this.current && this.win.setTitle(W("ui.title"), e.subtitle);
		let t = this.groupOf(e);
		t && this.drawTabs(t);
	}
	#l(e) {
		let t = this.groupOf(e);
		if (!t) return;
		let n = t.tabs.indexOf(e);
		t.tabs.splice(n, 1), e.el.remove(), t.current === e && (t.current = t.tabs[Math.min(n, t.tabs.length - 1)] ?? null, t.current?.show()), !t.tabs.length && this.grid.groups().length > 1 ? (this.grid.remove(t), this.active === t && (this.active = this.grid.groups()[0]), this.#s()) : this.drawTabs(t);
	}
	closeTab(e) {
		if (this.groupOf(e)) {
			if (e.remote && !e.closed && this.closeSession(e), this.#l(e), e.dispose(), !this.tabs.length) return this.win.emit("close");
			this.current && this.select(this.current);
		}
	}
	move(e, t, n, { index: r, side: i } = {}) {
		let a = this.groupOf(e);
		if (!a || !t.grid.groups().includes(n)) return;
		if (t === this && n === a && !i) {
			let t = a.tabs.indexOf(e), n = r ?? a.tabs.length;
			return n > t && n--, a.tabs.splice(t, 1), a.tabs.splice(n, 0, e), this.select(e);
		}
		if (i && n === a && a.tabs.length === 1) return;
		this.#l(e);
		let o = n;
		i && (o = t.#a(), t.grid.split(n, i, o)), t.add(e, o, r), t !== this && !this.tabs.length && this.win.emit("close");
	}
	splitTab(e, t) {
		let n = this.groupOf(e);
		if (!n) return;
		if (n.tabs.length > 1) return this.move(e, this, n, { side: t });
		let r = this.#a();
		this.grid.split(n, t, r), this.add(this.#e(this, { cwd: e.remote ? this.#c(n) : e.shell.cwd }), r);
	}
	detach(e, t = null) {
		if (this.tabs.length < 2 || !this.groupOf(e)) return;
		let n = this.newWindow({ empty: !0 }, t);
		this.move(e, n, n.grid.groups()[0]);
	}
	drop(e, t, n) {
		if (t.kind === "window") {
			if (this.tabs.length > 1) return this.detach(e, {
				x: n.clientX - 60,
				y: n.clientY - 14
			});
			let r = this.win.el, i = r.getBoundingClientRect().width / (r.offsetWidth || 1) || 1;
			return this.win.moveTo((parseFloat(r.style.left) || 0) + t.dx / i, (parseFloat(r.style.top) || 0) + t.dy / i);
		}
		if (t.kind === "bar") return this.move(e, t.owner, t.group, { index: t.index });
		if (t.kind === "split") return this.move(e, t.owner, t.group, { side: t.side });
		if (t.kind === "pane") return this.move(e, t.owner, t.group);
	}
	#u() {
		for (let e of this.grid.groups()) e.current?.reflow?.(), this.drawTabs(e);
		this.#s();
	}
	command(e) {
		let t = e.slice(9), n = this.current;
		if (t === "newShell") return this.add(this.#e(this, { cwd: this.#c(this.active) }));
		if (t === "broadcast") return this.toggleBroadcast();
		if (!n) return;
		if (t === "splitRight") return this.splitTab(n, "right");
		if (t === "splitDown") return this.splitTab(n, "down");
		if (t === "detach") return this.detach(n);
		if (t === "previousTab" || t === "nextTab") {
			let e = this.active.tabs, r = e[(e.indexOf(n) + (t === "nextTab" ? 1 : -1) + e.length) % e.length];
			return this.select(r);
		}
		let r = hd[t];
		if (!r) return;
		let i = this.grid.neighbor(this.active, r);
		if (t.startsWith("focus")) return i?.current && this.select(i.current);
		i ? this.move(n, this, i) : this.active.tabs.length > 1 && this.move(n, this, this.active, { side: r });
	}
	toggleBroadcast(e = !this.broadcast) {
		this.broadcast = e, this.grid.el.classList.toggle("tm-cast-on", e), this.drawTabs(), this.current?.focus();
	}
	typed(e, t) {
		if (!this.broadcast) return;
		let n = this.groupOf(e);
		if (n && n.current === e) for (let e of this.grid.groups()) e !== n && e.current && !e.current.closed && e.current.receive(t);
	}
	state() {
		return {
			layout: this.grid.toJSON((e) => ({
				...e.state(),
				...e.customName && { label: e.customName }
			})),
			cwd: this.firstLocal()?.shell.cwd
		};
	}
	#d(t) {
		let n = [];
		if (!this.grid.load(t, (t) => {
			let r = (Array.isArray(t?.tabs) ? t.tabs : []).slice(0, 50).map((t) => {
				let r = null;
				return t?.kind === "local" ? r = this.#e(this, {
					cwd: typeof t.cwd == "string" ? t.cwd : void 0,
					quiet: !0
				}) : t?.kind === "remote" && e.term && /^[a-f0-9]{16}$/.test(String(t.session)) && (r = au.restore(this, t), n.push(r)), r && typeof t.label == "string" && (r.customName = t.label.slice(0, 60)), r;
			}).filter(Boolean);
			if (!r.length) return null;
			let i = this.#a();
			for (let e of r) e.owner = this, i.tabs.push(e), i.panes.append(e.el), e.hide();
			return i.current = r[Math.min(Math.max(0, Number(t.current) || 0), r.length - 1)], i;
		})) return !1;
		for (let e of this.grid.groups()) e.current.show();
		return this.active = this.grid.groups()[0], this.select(this.active.current), n.length && this.load().then(({ sessions: e }) => {
			let t = new Set((e ?? []).filter((e) => e.state !== "closed").map((e) => e.id));
			for (let e of n) t.has(e.session.id) ? e.attach().catch((e) => this.error(e)) : e.lost();
		}), !0;
	}
	drawTabs(e = null) {
		let t = this.grid.groups(), n = t[0];
		for (let r of e ? [e] : t) {
			let e = t.length > 1;
			r.bar.replaceChildren(...[
				r === n && J("button", {
					type: "button",
					class: "tm-iconbtn",
					title: W("remote.side.toggle"),
					"aria-label": W("remote.side.toggle"),
					"aria-pressed": this.side.hidden ? "false" : "true",
					onclick: () => this.toggleSide()
				}, ud("sidebar")),
				...r.tabs.map((e, t) => J("div", {
					class: `tm-tab${e.closed ? " lost" : ""}${e.remote ? " remote" : ""}`,
					role: "tab",
					tabindex: "0",
					"aria-selected": r.current === e ? "true" : "false",
					title: [this.nameOf(e), e.title].filter(Boolean).join(" — "),
					onclick: () => this.select(e),
					onauxclick: (t) => {
						t.button === 1 && this.closeTab(e);
					},
					onpointerdown: (t) => {
						t.target.closest("button") || fu(t, e, this);
					},
					oncontextmenu: (t) => {
						t.preventDefault(), this.select(e), this.tabMenu(e, t.clientX, t.clientY);
					},
					onkeydown: (n) => {
						if ((n.key === "Enter" || n.key === " ") && (n.preventDefault(), this.select(e)), (n.key === "ArrowRight" || n.key === "ArrowLeft") && r.bar.querySelectorAll("[role=tab]")[t + (n.key === "ArrowRight" ? 1 : -1)]?.focus(), n.key === "ContextMenu" || n.key === "F10" && n.shiftKey) {
							n.preventDefault();
							let t = n.currentTarget.getBoundingClientRect();
							this.tabMenu(e, t.left, t.bottom);
						}
					}
				}, e.remote ? iu(e.session.protocol) : ud("terminal"), J("span", { class: "tm-tab-name" }, this.nameOf(e)), e.activity && J("span", {
					class: "tm-act",
					title: W("remote.activity")
				}), J("button", {
					type: "button",
					class: "tm-iconbtn",
					tabindex: "-1",
					title: W(e.remote ? "remote.closeSession" : "remote.closeTab"),
					"aria-label": W("remote.closeNamed", { name: this.nameOf(e) }),
					onclick: (t) => {
						t.stopPropagation(), this.closeTab(e);
					}
				}, ud("x")))),
				J("button", {
					type: "button",
					class: "tm-iconbtn",
					title: W("remote.newShell"),
					"aria-label": W("remote.newShell"),
					onclick: () => this.add(this.#e(this, { cwd: this.#c(r) }), r)
				}, ud("plus")),
				J("span", { class: "tm-grow" }),
				this.broadcast && e && J("button", {
					type: "button",
					class: "tm-cast",
					title: W("grid.broadcastOff"),
					onclick: () => this.toggleBroadcast(!1)
				}, ud("keyboard"), W("grid.broadcastOn")),
				r === n && J("button", {
					type: "button",
					class: "tm-iconbtn",
					title: W("menu.title"),
					"aria-label": W("menu.title"),
					"aria-haspopup": "menu",
					onclick: (e) => {
						let t = e.currentTarget.getBoundingClientRect();
						this.#f(t.right - 220, t.bottom);
					}
				}, ud("list"))
			].filter(Boolean));
		}
	}
	tabMenu(t, n, r) {
		let i = this.groupOf(t);
		if (!i) return;
		let a = this.grid.groups(), o = [...gd].filter((e) => e !== this && e.win.el.isConnected && !e.win.el.classList.contains("ws-away")), s = this.tabs.length < 2, c = (e, t) => W("tabs.pane", {
			n: t + 1,
			name: e.current ? this.nameOf(e.current) : ""
		});
		e.openMenu(n, r, [
			{
				label: W("tabs.rename"),
				icon: "pencil",
				action: () => this.rename(t)
			},
			{
				label: W("tabs.duplicate"),
				disabled: t.remote && !t.spec,
				action: () => this.duplicate(t)
			},
			"-",
			{
				label: W("tabs.splitRight"),
				shortcut: Yl("terminal.splitRight"),
				action: () => this.splitTab(t, "right")
			},
			{
				label: W("tabs.splitDown"),
				shortcut: Yl("terminal.splitDown"),
				action: () => this.splitTab(t, "down")
			},
			{
				label: W("tabs.moveToPane"),
				items: a.map((e, n) => e === i ? null : {
					label: c(e, n),
					action: () => this.move(t, this, e)
				}).filter(Boolean)
			},
			{
				label: W("tabs.detach"),
				icon: "window",
				shortcut: Yl("terminal.detach"),
				disabled: s,
				action: () => this.detach(t)
			},
			{
				label: W("tabs.moveToWindow"),
				items: [
					...o.map((e) => ({
						label: e.label(),
						action: () => this.move(t, e, e.active ?? e.grid.groups()[0])
					})),
					...o.length ? ["-"] : [],
					{
						label: W("tabs.newWindow"),
						disabled: s,
						action: () => this.detach(t)
					}
				]
			},
			"-",
			{
				label: W("tabs.saveTerm"),
				icon: "save",
				disabled: !td(this, t),
				action: () => ld(this, { tab: t })
			},
			{
				label: W("tabs.addToDesk"),
				icon: "link",
				disabled: !td(this, t),
				action: () => sd(this, { tab: t }).catch((e) => this.error(e))
			},
			...t.remote ? [
				"-",
				{
					label: W("remote.reconnect"),
					icon: "restart",
					disabled: !t.spec,
					action: () => this.reconnect(t)
				},
				{
					label: W("tabs.copyAddress"),
					action: () => navigator.clipboard?.writeText(t.session.address).catch(() => {})
				}
			] : [],
			"-",
			{
				label: W("grid.broadcast"),
				icon: this.broadcast ? "check" : null,
				shortcut: Yl("terminal.broadcast"),
				disabled: a.length < 2 && !this.broadcast,
				action: () => this.toggleBroadcast()
			},
			"-",
			{
				label: W(t.remote ? "remote.closeSession" : "remote.closeTab"),
				icon: "x",
				action: () => this.closeTab(t)
			},
			{
				label: W("tabs.closeOthers"),
				disabled: i.tabs.length < 2,
				action: () => i.tabs.filter((e) => e !== t).forEach((e) => this.closeTab(e))
			},
			{
				label: W("tabs.closeRight"),
				disabled: i.tabs.indexOf(t) === i.tabs.length - 1,
				action: () => i.tabs.slice(i.tabs.indexOf(t) + 1).forEach((e) => this.closeTab(e))
			}
		]);
	}
	#f(t, n) {
		let r = this.current;
		e.openMenu(t, n, [
			{
				label: W("remote.newShell"),
				icon: "terminal",
				shortcut: Yl("terminal.newShell"),
				action: () => this.command("terminal.newShell")
			},
			{
				label: W("remote.host.newTitle"),
				icon: "globe",
				disabled: !e.term?.available,
				action: () => this.editHost()
			},
			{
				label: W("menu.openTerm"),
				icon: "open",
				action: () => this.pickTermFile()
			},
			{
				label: W("tabs.newWindow"),
				icon: "window",
				action: () => this.newWindow({ cwd: this.#c(this.active) })
			},
			"-",
			{
				label: W("tabs.splitRight"),
				shortcut: Yl("terminal.splitRight"),
				disabled: !r,
				action: () => this.splitTab(r, "right")
			},
			{
				label: W("tabs.splitDown"),
				shortcut: Yl("terminal.splitDown"),
				disabled: !r,
				action: () => this.splitTab(r, "down")
			},
			{
				label: W("grid.broadcast"),
				icon: this.broadcast ? "check" : null,
				shortcut: Yl("terminal.broadcast"),
				disabled: this.grid.groups().length < 2 && !this.broadcast,
				action: () => this.toggleBroadcast()
			},
			"-",
			{
				label: W("options.open"),
				icon: "gear",
				action: () => Ru(this.openWindow)
			}
		]);
	}
	async pickTermFile() {
		let e = await v(this.openWindow, {
			title: W("menu.openTermTitle"),
			exts: ["term"]
		});
		e && $u(this, e.id, { fresh: !1 }).catch((e) => this.error(e));
	}
	rename(e) {
		let t = J("input", {
			type: "text",
			value: this.nameOf(e),
			maxLength: 60,
			"aria-label": W("tabs.renameLabel")
		}), n = (n) => {
			r.close(), n && (e.customName = t.value.replace(/\s+/g, " ").trim() || null), this.tabChanged(e), e.focus();
		}, r = this.showDialog(J("div", {
			class: "tm-dialog",
			role: "dialog",
			"aria-modal": "true",
			onkeydown: (e) => {
				e.key === "Enter" && (e.preventDefault(), n(!0));
			}
		}, J("h2", {}, W("tabs.rename")), J("div", { class: "tm-dialog-body" }, J("label", { class: "tm-field" }, J("span", {}, W("tabs.renameLabel")), t, J("small", {}, W("tabs.renameHint")))), J("div", { class: "tm-dialog-foot" }, J("button", {
			type: "button",
			class: "tm-btn",
			onclick: () => n(!1)
		}, W("remote.cancel")), J("button", {
			type: "button",
			class: "tm-btn primary",
			onclick: () => n(!0)
		}, W("tabs.renameOk")))), () => e.focus());
		t.select();
	}
	duplicate(e) {
		let t = this.groupOf(e), n = t.tabs.indexOf(e) + 1;
		if (!e.remote) return this.add(this.#e(this, { cwd: e.shell.cwd }), t, n);
		e.spec && this.openRemote(e.spec, {
			group: t,
			index: n
		}).catch((e) => this.error(e));
	}
	toggleSide() {
		this.side.hidden = !this.side.hidden, fd.set(pd, !this.side.hidden), this.side.hidden || this.load(), this.drawTabs(this.grid.groups()[0]);
	}
	async openRemote(t, { group: n, index: r, name: i } = {}) {
		let a = await e.term.open(t), o = { ...t };
		return delete o.sealed, await this.#p(a, o, {
			group: n,
			index: r,
			name: i
		}), a;
	}
	async #p(e, t, { group: n, index: r, name: i } = {}) {
		let a = new au(this, e, t);
		i && (a.customName = i), this.add(a, n && this.grid.groups().includes(n) ? n : void 0, r);
		try {
			await a.attach();
		} catch (e) {
			this.error(e);
		}
		return a;
	}
	async openHere(t) {
		try {
			let n = dd.get(t), r = n?.type === "folder" ? n.id : n?.parent;
			if (!r || !dd.isRemote?.(r)) throw Error(W("remote.notRemote"));
			let i = dd.netRef(r);
			if (e.net?.mount(i.mount)?.protocol !== "sftp") throw Error(W("remote.notSftp"));
			await this.#p(await e.term.open({
				mount: i.mount,
				path: i.path
			}), null);
		} catch (e) {
			this.error(e);
		}
	}
	async resume(e) {
		for (let t of gd) {
			let n = t.tabs.find((t) => t.remote && t.session.id === e.id);
			if (n) return t.select(n), n.attach();
		}
		return this.#p(e, e.host ? { host: e.host } : null);
	}
	async reconnect(t) {
		if (!t.spec) return this.error(W("remote.cannotReconnect"));
		try {
			await t.replace(await e.term.open(t.spec)), this.tabChanged(t);
		} catch (e) {
			this.error(e);
		}
	}
	async closeSession(t) {
		try {
			await e.term.close(t.session.id);
		} catch {}
	}
	async editHost(e = null, t = null) {
		await this.load();
		let n = await Gl(this, e, t);
		await this.load(), n?.action === "connect" && this.openRemote({ host: n.host.id }).catch((e) => this.error(e));
	}
	showDialog(e, t) {
		let n = J("div", { class: "tm-backdrop" }, e), r = () => n.remove();
		return n.addEventListener("keydown", (e) => {
			e.stopPropagation(), e.key === "Escape" && (e.preventDefault(), r(), t?.());
		}), this.win.body.append(n), { close: r };
	}
	drawSide() {
		if (this.side.hidden && this.side.childElementCount) return;
		let { hosts: t, sessions: n, protocols: r } = this.data;
		if (!e.term?.available || !r.length) return this.side.replaceChildren(J("h2", {}, J("span", {}, W("remote.side.hosts"))), J("p", { class: "tm-empty" }, this.data.error ? W("remote.unavailable", { error: this.data.error }) : W("remote.noProtocols")));
		let i = new Set(n.filter((e) => e.state !== "closed").map((e) => e.host).filter(Boolean)), a = /* @__PURE__ */ new Map();
		for (let e of [...t].sort((e, t) => e.name.localeCompare(t.name))) a.has(e.folder) || a.set(e.folder, []), a.get(e.folder).push(e);
		let o = (e) => this.openRemote({ host: e.id }).catch((e) => this.error(e)), s = (t) => J("button", {
			type: "button",
			class: "tm-place",
			title: t.address,
			onclick: () => o(t),
			oncontextmenu: (n) => {
				n.preventDefault(), e.openMenu(n.clientX, n.clientY, [
					{
						label: W("remote.side.connect"),
						action: () => o(t)
					},
					{
						label: W("remote.host.editTitle"),
						action: () => this.editHost(t)
					},
					"-",
					{
						label: W("tabs.saveTerm"),
						icon: "save",
						action: () => ld(this, { host: t })
					},
					{
						label: W("tabs.addToDesk"),
						icon: "link",
						action: () => sd(this, { host: t }).catch((e) => this.error(e))
					}
				]);
			}
		}, J("span", {
			class: `tm-dot${i.has(t.id) ? " on" : ""}`,
			title: i.has(t.id) ? W("remote.side.open") : ""
		}), J("span", { class: "tm-place-name" }, t.name), iu(t.protocol)), c = new Set([...gd].flatMap((e) => e.tabs.filter((e) => e.remote).map((e) => e.session.id))), l = n.filter((e) => e.state !== "closed" && !c.has(e.id));
		this.side.replaceChildren(J("h2", {}, J("span", {}, W("remote.side.hosts")), J("button", {
			type: "button",
			class: "tm-iconbtn",
			title: W("remote.host.newTitle"),
			"aria-label": W("remote.host.newTitle"),
			onclick: () => this.editHost()
		}, ud("plus"))), ...(a.get("") ?? []).map(s), ...[...a].filter(([e]) => e).sort(([e], [t]) => e.localeCompare(t)).flatMap(([e, t]) => [J("h3", {}, e), ...t.map(s)]), ...t.length ? [] : [J("p", { class: "tm-empty" }, W("remote.side.none"))], ...l.length ? [J("h2", {}, J("span", {}, W("remote.side.running"))), ...l.map((e) => J("div", { class: "tm-live" }, J("div", {
			class: "tm-live-name",
			title: e.address
		}, iu(e.protocol), J("span", {}, e.name)), J("div", { class: "tm-live-when" }, [
			e.title,
			e.attached ? W("remote.side.elsewhere") : e.closesAt ? W("remote.side.closesIn", { n: Math.max(1, Math.round((e.closesAt - Date.now()) / 6e4)) }) : "",
			U.date(e.created, { timeStyle: "short" })
		].filter(Boolean).join(" · ")), J("button", {
			type: "button",
			class: "tm-btn primary",
			onclick: () => this.resume(e).catch((e) => this.error(e))
		}, W("remote.side.resume"))))] : []);
	}
}, vd = class {
	constructor(e = 1) {
		this.levels = e;
	}
}, yd = class {
	constructor(e = 1) {
		this.levels = e;
	}
}, bd = class {
	constructor(e) {
		this.code = e;
	}
}, xd = class {
	constructor(e) {
		this.code = e;
	}
}, Sd = class {
	code = 130;
}, Cd = class {
	code = 141;
}, Y = class extends Error {}, wd = class extends Error {}, X = class extends Error {
	constructor(e, t = 1) {
		super(e), this.code = t;
	}
}, Td = class {
	aborted = !1;
	#e = /* @__PURE__ */ new Set();
	abort() {
		if (!this.aborted) {
			this.aborted = !0;
			for (let e of this.#e) e();
			this.#e.clear();
		}
	}
	onAbort(e) {
		return this.aborted ? (e(), () => {}) : (this.#e.add(e), () => this.#e.delete(e));
	}
	check() {
		if (this.aborted) throw new Sd();
	}
}, Ed = [
	"&>>",
	"<<<",
	"<<-",
	";;&",
	"&&",
	"||",
	";;",
	";&",
	"|&",
	"<<",
	">>",
	"<&",
	">&",
	"<>",
	">|",
	"&>",
	"|",
	"&",
	";",
	"<",
	">",
	"(",
	")"
], Dd = /* @__PURE__ */ new Set([
	"|",
	"&",
	";",
	"<",
	">",
	"(",
	")"
]), Od = [
	"then",
	"else",
	"elif",
	"fi",
	"do",
	"done",
	"esac",
	"}"
], kd = /* @__PURE__ */ new Set([
	")",
	";;",
	";&",
	";;&"
]), Ad = /* @__PURE__ */ new Set([
	"export",
	"local",
	"declare",
	"typeset",
	"readonly"
]), jd = [
	"==",
	"!=",
	"=~",
	"=",
	"<",
	">",
	"-eq",
	"-ne",
	"-lt",
	"-le",
	"-gt",
	"-ge",
	"-nt",
	"-ot",
	"-ef"
], Md = /^([A-Za-z_]\w*)(?:\[([^\]]*)\])?(\+?)=/, Nd = /(\d+)?(&>>|<<<|<<-|<<|>>|<&|>&|<>|>\||&>|<|>)/y, Pd = 100, Fd = (e) => e === " " || e === "	" || e === "\r", Id = (e) => e === void 0 || Fd(e) || e === "\n" || Dd.has(e), Ld = (e) => Fd(e) || e === "\n" || Dd.has(e);
function Rd(e, { aliases: t = null } = {}) {
	return new Vd(e, t).program();
}
function* zd(e, { aliases: t = null } = {}) {
	yield* new Vd(e, t).lines();
}
function Bd(e) {
	return { parts: new Vd(String(e), null).readParts({ stop: () => !1 }) };
}
var Vd = class e {
	heredocs = [];
	aliasActive = /* @__PURE__ */ new Set();
	aliasCount = 0;
	constructor(e, t) {
		this.src = String(e), this.pos = 0, this.aliases = t;
	}
	get ch() {
		return this.src[this.pos];
	}
	get eof() {
		return this.pos >= this.src.length;
	}
	starts(e) {
		return this.src.startsWith(e, this.pos);
	}
	fail(e) {
		throw this.eof ? new Y(e) : new wd(e);
	}
	near() {
		return this.eof ? W("parse.nearEnd") : this.ch === "\n" ? W("parse.nearNewline") : W("parse.nearToken", { token: this.peekOp() ?? this.src.slice(this.pos).match(/^\S{1,20}/)?.[0] ?? this.ch });
	}
	skipBlanks() {
		for (;;) {
			let e = this.ch;
			if (Fd(e)) this.pos++;
			else if (e === "\\" && this.src[this.pos + 1] === "\n") this.pos += 2;
			else if (e === "\\" && this.pos === this.src.length - 1) throw new Y();
			else if (e === "#") {
				let e = this.src.indexOf("\n", this.pos);
				this.pos = e < 0 ? this.src.length : e;
			} else return;
		}
	}
	newline() {
		if (this.ch !== "\n") return !1;
		this.pos++;
		for (let e of this.heredocs.splice(0)) this.readHeredoc(e);
		return !0;
	}
	linebreak() {
		for (this.skipBlanks(); this.newline();) this.skipBlanks();
	}
	peekOp() {
		return Ed.find((e) => this.starts(e)) ?? null;
	}
	atKeyword(e) {
		if (!this.starts(e)) return !1;
		let t = this.src[this.pos + e.length];
		return e === "{" || e === "!" || e === "[[" ? t === void 0 || Fd(t) || t === "\n" : Id(t);
	}
	keyword(e) {
		this.linebreak(), this.atKeyword(e) || this.fail(W("parse.nearExpected", {
			near: this.near(),
			expected: e
		})), this.pos += e.length;
	}
	atTerminator() {
		if (this.eof) return !0;
		let e = this.peekOp();
		return e && kd.has(e) ? !0 : Od.some((e) => this.atKeyword(e));
	}
	program() {
		let e = this.list();
		if (this.linebreak(), !this.eof) throw new wd(W("parse.near", { near: this.near() }));
		if (this.heredocs.length) throw new Y();
		return e;
	}
	*lines() {
		for (;;) {
			if (this.linebreak(), this.eof) {
				if (this.heredocs.length) throw new Y();
				return;
			}
			let e = [];
			for (;;) {
				if (this.atTerminator()) throw new wd(W("parse.near", { near: this.near() }));
				let t = this.pos, n = this.andOr(), r = this.src.slice(t, this.pos).trim();
				this.skipBlanks();
				let i = this.peekOp();
				if (i === "&" || i === ";") {
					if (this.pos++, e.push({
						node: n,
						async: i === "&",
						text: r
					}), this.skipBlanks(), this.eof || this.newline()) break;
				} else {
					if (e.push({
						node: n,
						async: !1,
						text: r
					}), this.eof || this.newline()) break;
					throw new wd(W("parse.near", { near: this.near() }));
				}
			}
			yield {
				type: "list",
				items: e
			};
		}
	}
	list() {
		let e = [];
		for (this.linebreak(); !this.atTerminator();) {
			let t = this.pos, n = this.andOr(), r = this.src.slice(t, this.pos).trim();
			this.skipBlanks();
			let i = this.peekOp();
			if (i === "&" || i === ";") this.pos++, e.push({
				node: n,
				async: i === "&",
				text: r
			});
			else if (this.newline()) e.push({
				node: n,
				async: !1,
				text: r
			});
			else {
				if (e.push({
					node: n,
					async: !1,
					text: r
				}), this.linebreak(), !this.atTerminator()) throw new wd(W("parse.near", { near: this.near() }));
				break;
			}
			this.linebreak();
		}
		return {
			type: "list",
			items: e
		};
	}
	andOr() {
		let e = this.pipeline(), t = [];
		for (;;) {
			this.skipBlanks();
			let e = this.peekOp();
			if (e !== "&&" && e !== "||") break;
			if (this.pos += 2, this.linebreak(), this.eof) throw new Y();
			t.push({
				op: e,
				node: this.pipeline()
			});
		}
		return t.length ? {
			type: "andor",
			first: e,
			rest: t
		} : e;
	}
	pipeline() {
		this.skipBlanks();
		let e = !1;
		for (; this.atKeyword("!");) this.pos++, e = !e, this.skipBlanks();
		let t = [this.command()], n = [];
		for (;;) {
			this.skipBlanks();
			let e = this.peekOp();
			if (e !== "|" && e !== "|&") break;
			if (this.pos += e.length, n.push(e === "|&"), this.linebreak(), this.eof) throw new Y();
			t.push(this.command());
		}
		return t.length === 1 && !e ? t[0] : {
			type: "pipeline",
			negate: e,
			cmds: t,
			both: n
		};
	}
	command() {
		if (this.skipBlanks(), this.eof) throw new Y();
		let e = this.pos, t;
		if (this.starts("((") && (t = this.arithCommand())) return this.redirects(t);
		let n = this.peekOp();
		if (n === "(") {
			this.pos++;
			let e = this.list();
			return this.linebreak(), this.ch !== ")" && this.fail(W("parse.nearExpected", {
				near: this.near(),
				expected: ")"
			})), this.pos++, this.redirects({
				type: "subshell",
				body: e
			});
		}
		if (n && !n.startsWith("<") && !n.startsWith(">") && n !== "&>" && n !== "&>>") throw new wd(W("parse.near", { near: W("parse.nearToken", { token: n }) }));
		if (this.atKeyword("if")) return this.redirects(this.ifClause());
		if (this.atKeyword("while")) return this.redirects(this.whileClause(!1));
		if (this.atKeyword("until")) return this.redirects(this.whileClause(!0));
		if (this.atKeyword("for")) return this.redirects(this.forClause());
		if (this.atKeyword("case")) return this.redirects(this.caseClause());
		if (this.atKeyword("{")) {
			this.pos++;
			let e = this.list();
			return this.keyword("}"), this.redirects({
				type: "group",
				body: e
			});
		}
		if (this.atKeyword("[[")) return this.redirects(this.condCommand());
		if (this.atKeyword("function")) {
			this.pos += 8, this.skipBlanks();
			let t = /[A-Za-z_][\w.:-]*/y;
			t.lastIndex = this.pos;
			let n = t.exec(this.src)?.[0];
			return n || this.fail(W("parse.badFunctionName")), this.pos += n.length, this.skipBlanks(), this.starts("(") && (this.pos++, this.skipBlanks(), this.ch !== ")" && this.fail(W("parse.parenAfterName")), this.pos++), this.funcBody(n, e);
		}
		let r = /([A-Za-z_][\w.:-]*)[ \t]*\([ \t]*\)/y;
		r.lastIndex = this.pos;
		let i = r.exec(this.src);
		if (i) return this.pos += i[0].length, this.funcBody(i[1], e);
		if (Od.some((e) => this.atKeyword(e))) throw new wd(W("parse.near", { near: this.near() }));
		return this.simple();
	}
	funcBody(e, t) {
		if (this.linebreak(), this.eof) throw new Y();
		return {
			type: "func",
			name: e,
			body: this.command(),
			text: this.src.slice(t, this.pos).trim()
		};
	}
	redirects(e) {
		for (e.redirs ??= [];;) if (this.skipBlanks(), !this.redirect(e.redirs)) return e;
	}
	simple() {
		let e = {
			type: "simple",
			assigns: [],
			words: [],
			redirs: []
		}, t = !1;
		for (; this.skipBlanks(), !(this.eof || this.ch === "\n");) {
			if (this.redirect(e.redirs)) continue;
			if (this.peekOp()) break;
			if (!e.words.length && this.aliases?.size && this.expandAlias()) continue;
			let n = this.pos, r = this.word();
			if (!r) break;
			let i = this.src.slice(n, this.pos), a = Md.exec(i);
			if (a && !e.words.length) e.assigns.push(this.assignment(n, a));
			else if (a && t && this.ch === "(" && i.endsWith("=")) {
				let { array: t } = this.assignment(n, a);
				e.words.push({
					parts: [{
						type: "lit",
						value: i
					}],
					declArray: {
						name: a[1],
						append: a[3] === "+",
						words: t
					}
				});
			} else a && t && (r.noSplit = !0), e.words.push(r), e.words.length === 1 && (t = r.parts.length === 1 && r.parts[0].type === "lit" && Ad.has(r.parts[0].value));
		}
		if (this.aliasActive.clear(), !e.words.length && !e.assigns.length && !e.redirs.length) throw new wd(W("parse.near", { near: this.near() }));
		return e;
	}
	assignment(e, t) {
		this.pos = e + t[0].length;
		let n = {
			name: t[1],
			index: t[2] ?? null,
			append: t[3] === "+",
			value: null,
			array: null
		};
		if (this.ch === "(" && n.index == null) for (this.pos++, n.array = [];;) {
			if (this.linebreak(), this.eof) throw new Y();
			if (this.ch === ")") {
				this.pos++;
				break;
			}
			let e = this.word();
			if (!e) throw new wd(W("parse.near", { near: this.near() }));
			n.array.push(e);
		}
		else n.value = this.word() ?? { parts: [] };
		return n;
	}
	expandAlias() {
		let e = /[^\s|&;<>()'"\\$`]+/y;
		e.lastIndex = this.pos;
		let t = e.exec(this.src)?.[0];
		if (!t || !Id(this.src[this.pos + t.length])) return !1;
		let n = this.aliases.get(t);
		if (n == null || this.aliasActive.has(t)) return !1;
		if (++this.aliasCount > Pd) throw new wd(W("parse.aliasLoop"));
		return this.aliasActive.add(t), this.src = this.src.slice(0, this.pos) + n + this.src.slice(this.pos + t.length), !0;
	}
	redirect(e) {
		Nd.lastIndex = this.pos;
		let t = Nd.exec(this.src);
		if (!t) return !1;
		this.pos += t[0].length;
		let n = t[2], r = t[1] == null ? null : Number(t[1]);
		this.skipBlanks();
		let i = this.pos, a = this.word();
		a || this.fail(W("parse.missingTarget", {
			near: this.near(),
			op: n
		}));
		let o = {
			fd: r,
			op: n,
			target: a
		};
		if (n === "<<" || n === "<<-") {
			let e = this.src.slice(i, this.pos);
			o.heredoc = {
				delim: e.replace(/['"\\]/g, ""),
				quoted: /['"\\]/.test(e),
				strip: n === "<<-",
				body: null
			}, this.heredocs.push(o);
		}
		return e.push(o), !0;
	}
	readHeredoc(t) {
		let { delim: n, strip: r, quoted: i } = t.heredoc, a = "";
		for (;;) {
			if (this.eof) throw new Y();
			let e = this.src.indexOf("\n", this.pos), t = this.src.slice(this.pos, e < 0 ? this.src.length : e);
			if (this.pos = e < 0 ? this.src.length : e + 1, r && (t = t.replace(/^\t+/, "")), t.replace(/\r$/, "") === n) break;
			a += t + "\n";
		}
		t.heredoc.body = i ? { parts: [{
			type: "sq",
			value: a
		}] } : { parts: [{
			type: "dq",
			parts: new e(a, null).readParts({ heredoc: !0 })
		}] };
	}
	ifClause() {
		this.pos += 2;
		let e = [], t = null, n = this.list();
		for (this.keyword("then"), e.push({
			cond: n,
			body: this.list()
		});;) if (this.linebreak(), this.atKeyword("elif")) this.pos += 4, n = this.list(), this.keyword("then"), e.push({
			cond: n,
			body: this.list()
		});
		else if (this.atKeyword("else")) {
			this.pos += 4, t = this.list(), this.keyword("fi");
			break;
		} else {
			this.keyword("fi");
			break;
		}
		return {
			type: "if",
			clauses: e,
			otherwise: t
		};
	}
	whileClause(e) {
		this.pos += 5;
		let t = this.list();
		this.keyword("do");
		let n = this.list();
		return this.keyword("done"), {
			type: "while",
			until: e,
			cond: t,
			body: n
		};
	}
	forClause() {
		if (this.pos += 3, this.skipBlanks(), this.starts("((")) {
			this.pos += 2;
			let [e = "", t = "", n = ""] = this.rawUntilDoubleParen().split(";");
			this.skipBlanks(), this.ch === ";" && this.pos++, this.keyword("do");
			let r = this.list();
			return this.keyword("done"), {
				type: "cfor",
				init: Bd(e),
				cond: Bd(t),
				step: Bd(n),
				body: r
			};
		}
		let e = /[A-Za-z_]\w*/y;
		e.lastIndex = this.pos;
		let t = e.exec(this.src)?.[0];
		t && Id(this.src[this.pos + t.length]) || this.fail(W("parse.forBadName")), this.pos += t.length;
		let n = null;
		if (this.linebreak(), this.atKeyword("in")) for (this.pos += 2, n = [];;) {
			if (this.skipBlanks(), this.eof) throw new Y();
			if (this.ch === ";" || this.ch === "\n") break;
			let e = this.word();
			if (!e) throw new wd(W("parse.near", { near: this.near() }));
			n.push(e);
		}
		this.skipBlanks(), this.ch === ";" && this.pos++, this.keyword("do");
		let r = this.list();
		return this.keyword("done"), {
			type: "for",
			name: t,
			words: n,
			body: r
		};
	}
	rawUntilDoubleParen() {
		let e = 0, t = this.pos;
		for (; !this.eof; this.pos++) {
			let n = this.ch;
			if (n === "(") e++;
			else if (n === ")") {
				if (e === 0 && this.src[this.pos + 1] === ")") {
					let e = this.src.slice(t, this.pos);
					return this.pos += 2, e;
				}
				e--;
			}
		}
		throw new Y();
	}
	caseClause() {
		this.pos += 4, this.skipBlanks();
		let e = this.word();
		e || this.fail(W("parse.caseNoWord")), this.keyword("in");
		let t = [];
		for (;;) {
			if (this.linebreak(), this.eof) throw new Y();
			if (this.atKeyword("esac")) {
				this.pos += 4;
				break;
			}
			this.ch === "(" && this.pos++;
			let e = [];
			for (;;) {
				this.skipBlanks();
				let t = this.word();
				if (t || this.fail(W("parse.near", { near: this.near() })), e.push(t), this.skipBlanks(), this.ch !== "|") break;
				this.pos++;
			}
			this.ch !== ")" && this.fail(W("parse.nearExpected", {
				near: this.near(),
				expected: ")"
			})), this.pos++;
			let n = this.list();
			this.skipBlanks();
			let r = this.peekOp(), i = ";;";
			r === ";;" || r === ";&" || r === ";;&" ? (this.pos += r.length, i = r) : (this.linebreak(), this.atKeyword("esac") || this.fail(W("parse.nearExpected", {
				near: this.near(),
				expected: ";;"
			}))), t.push({
				patterns: e,
				body: n,
				term: i
			});
		}
		return {
			type: "case",
			word: e,
			items: t
		};
	}
	arithCommand() {
		let e = this.pos;
		this.pos += 2;
		try {
			return {
				type: "arithcmd",
				word: Bd(this.rawUntilDoubleParen())
			};
		} catch (t) {
			if (!(t instanceof Y) || (this.pos = e, !this.src.includes(")", e))) throw t;
			return null;
		}
	}
	condCommand() {
		this.pos += 2;
		let e = this.condOr();
		return this.linebreak(), this.starts("]]") || this.fail(W("parse.condNear", { near: this.near() })), this.pos += 2, {
			type: "cond",
			expr: e
		};
	}
	condOr() {
		let e = this.condAnd();
		for (;;) {
			if (this.linebreak(), !this.starts("||")) return e;
			this.pos += 2, e = {
				op: "||",
				left: e,
				right: this.condAnd()
			};
		}
	}
	condAnd() {
		let e = this.condNot();
		for (;;) {
			if (this.linebreak(), !this.starts("&&")) return e;
			this.pos += 2, e = {
				op: "&&",
				left: e,
				right: this.condNot()
			};
		}
	}
	condNot() {
		return this.linebreak(), this.atKeyword("!") ? (this.pos++, {
			op: "!",
			expr: this.condNot()
		}) : this.condPrimary();
	}
	condPrimary() {
		if (this.linebreak(), this.eof) throw new Y();
		if (this.ch === "(") {
			this.pos++;
			let e = this.condOr();
			return this.linebreak(), this.ch !== ")" && this.fail(W("parse.condNear", { near: this.near() })), this.pos++, e;
		}
		let e = /-[a-zA-Z](?=[ \t])/y;
		e.lastIndex = this.pos;
		let t = e.exec(this.src);
		if (t) return this.pos += 2, this.skipBlanks(), {
			op: "unary",
			flag: t[0],
			arg: this.condWord()
		};
		let n = this.condWord();
		this.skipBlanks();
		let r = jd.find((e) => this.starts(e) && (e[0] !== "-" || Id(this.src[this.pos + e.length])));
		return r ? (this.pos += r.length, this.skipBlanks(), {
			op: "binary",
			bop: r,
			left: n,
			right: r === "=~" ? this.regexWord() : this.condWord()
		}) : {
			op: "word",
			word: n
		};
	}
	condWord() {
		this.starts("]]") && this.fail(W("parse.condNoOperand"));
		let e = this.word();
		return e || this.fail(W("parse.condNear", { near: this.near() })), e;
	}
	regexWord() {
		let e = 0, t = this.readParts({ stop: (t) => {
			if (t === "(") e++;
			else if (t === ")") {
				if (e === 0) return !0;
				e--;
			}
			return e === 0 && (Fd(t) || t === "\n" || t === ";" || t === "&");
		} });
		return t.length || this.fail(W("parse.condNoRegex")), { parts: t };
	}
	word() {
		let e = this.readParts({ stop: Ld });
		return e.length ? { parts: e } : null;
	}
	readParts({ stop: e = Ld, dq: t = !1, heredoc: n = !1 } = {}) {
		let r = [], i = "", a = () => {
			i && r.push({
				type: "lit",
				value: i
			}), i = "";
		}, o = !t && !n;
		for (; !this.eof;) {
			let s = this.ch;
			if (t && s === "\"" || o && e(s)) break;
			if (s === "\\") {
				let e = this.src[this.pos + 1];
				if (e === void 0) {
					if (n) {
						i += s, this.pos++;
						continue;
					}
					throw new Y();
				}
				if (e === "\n") {
					this.pos += 2;
					continue;
				}
				if (!o) {
					"$`\\".includes(e) || t && e === "\"" ? (i += e, this.pos += 2) : (i += s, this.pos++);
					continue;
				}
				a(), r.push({
					type: "sq",
					value: e
				}), this.pos += 2;
			} else if (o && s === "'") {
				let e = this.src.indexOf("'", this.pos + 1);
				if (e < 0) throw new Y();
				a(), r.push({
					type: "sq",
					value: this.src.slice(this.pos + 1, e)
				}), this.pos = e + 1;
			} else if (o && s === "\"") {
				a(), this.pos++;
				let e = this.readParts({ dq: !0 });
				if (this.ch !== "\"") throw new Y();
				this.pos++, r.push({
					type: "dq",
					parts: e
				});
			} else if (s === "`") a(), r.push(this.backtick(t));
			else {
				if (s === "$") {
					let e = this.src[this.pos + 1];
					if (o && e === "'") {
						a(), r.push({
							type: "sq",
							value: this.ansiC()
						});
						continue;
					}
					if (o && e === "\"") {
						this.pos++;
						continue;
					}
					let t = this.dollar();
					if (t) {
						a(), r.push(t);
						continue;
					}
				}
				i += s, this.pos++;
			}
		}
		return a(), r;
	}
	dollar() {
		let e = this.src[this.pos + 1];
		if (e === "(" && this.src[this.pos + 2] === "(") {
			let e = this.pos;
			this.pos += 3;
			let t = 0, n = this.readParts({ stop: (e) => {
				if (e === "(") t++;
				else if (e === ")") {
					if (t === 0) return !0;
					t--;
				}
				return !1;
			} });
			if (this.starts("))")) return this.pos += 2, {
				type: "arith",
				word: { parts: n }
			};
			if (this.eof) throw new Y();
			this.pos = e;
		}
		if (e === "(") {
			this.pos += 2;
			let e = this.list();
			if (this.linebreak(), this.eof) throw new Y();
			if (this.ch !== ")") throw new wd(W("parse.nearExpected", {
				near: this.near(),
				expected: ")"
			}));
			return this.pos++, {
				type: "cmdsub",
				body: e
			};
		}
		if (e === "{") return this.paramBrace();
		let t = /[A-Za-z_]\w*|[@*#?$!\-0-9]/y;
		t.lastIndex = this.pos + 1;
		let n = t.exec(this.src)?.[0];
		return n ? (this.pos += 1 + n.length, {
			type: "param",
			name: n
		}) : null;
	}
	paramBrace() {
		this.pos += 2;
		let e = {
			type: "param",
			name: ""
		};
		this.ch === "#" && this.src[this.pos + 1] !== "}" ? (e.length = !0, this.pos++) : this.ch === "!" && this.src[this.pos + 1] !== "}" && (e.indirect = !0, this.pos++);
		let t = /[A-Za-z_]\w*|[0-9]+|[@*#?$!\-]/y;
		t.lastIndex = this.pos;
		let n = t.exec(this.src)?.[0];
		if (n || this.fail(W("parse.badSubstitution")), e.name = n, this.pos += n.length, this.ch === "[") {
			let t = this.src.indexOf("]", this.pos);
			if (t < 0) throw new Y();
			e.index = this.src.slice(this.pos + 1, t), this.pos = t + 1;
		}
		let r = this.ch;
		if (r === "}" || e.length) return this.ch !== "}" && this.fail(W("parse.badSubstitution")), this.pos++, e;
		if (r === ":") {
			let t = this.src[this.pos + 1];
			"-=?+".includes(t) && t ? (e.op = ":" + t, this.pos += 2, e.arg = this.braceWord("}")) : (e.op = "substr", this.pos++, e.offset = this.braceWord(":}"), this.ch === ":" && (this.pos++, e.count = this.braceWord("}")));
		} else "-=?+".includes(r) ? (e.op = r, this.pos++, e.arg = this.braceWord("}")) : r === "#" || r === "%" || r === "^" || r === "," ? (e.op = this.src[this.pos + 1] === r ? r + r : r, this.pos += e.op.length, e.arg = this.braceWord("}")) : r === "/" ? (this.pos++, e.op = "/", "/#%".includes(this.ch) && (e.op += this.ch, this.pos++), e.arg = this.braceWord("/}"), this.ch === "/" ? (this.pos++, e.replace = this.braceWord("}")) : e.replace = { parts: [] }) : this.fail(W("parse.badSubstitution"));
		return this.ch !== "}" && this.fail(W("parse.badSubstitutionBrace")), this.pos++, e;
	}
	braceWord(e) {
		let t = 0, n = this.readParts({ stop: (n) => {
			if (n === "{") t++;
			else if (n === "}" && t > 0) return t--, !1;
			return t === 0 && e.includes(n);
		} });
		if (this.eof) throw new Y();
		return { parts: n };
	}
	backtick(t) {
		let n = "";
		for (this.pos++;;) {
			if (this.eof) throw new Y();
			let e = this.ch;
			if (e === "`") {
				this.pos++;
				break;
			}
			if (e === "\\") {
				let e = this.src[this.pos + 1];
				if (e === "\\" || e === "`" || e === "$" || t && e === "\"") {
					n += e, this.pos += 2;
					continue;
				}
			}
			n += e, this.pos++;
		}
		try {
			return {
				type: "cmdsub",
				body: new e(n, this.aliases).program()
			};
		} catch (e) {
			throw e instanceof Y ? new wd(W("parse.backquotes")) : e;
		}
	}
	ansiC() {
		this.pos += 2;
		let e = "", t = {
			n: "\n",
			t: "	",
			r: "\r",
			a: "\x07",
			b: "\b",
			e: "\x1B",
			E: "\x1B",
			f: "\f",
			v: "\v",
			"\\": "\\",
			"'": "'",
			"\"": "\"",
			"?": "?"
		};
		for (;;) {
			if (this.eof) throw new Y();
			let n = this.ch;
			if (n === "'") return this.pos++, e;
			if (n !== "\\") {
				e += n, this.pos++;
				continue;
			}
			let r = this.src[this.pos + 1];
			if (r === void 0) throw new Y();
			if (t[r] !== void 0) {
				e += t[r], this.pos += 2;
				continue;
			}
			let i, a = this.src.slice(this.pos + 1);
			if (i = /^x([0-9a-fA-F]{1,2})/.exec(a)) e += String.fromCharCode(parseInt(i[1], 16));
			else if ((i = /^u([0-9a-fA-F]{1,4})/.exec(a)) || (i = /^U([0-9a-fA-F]{1,8})/.exec(a))) e += String.fromCodePoint(Math.min(parseInt(i[1], 16), 1114111));
			else if (i = /^([0-7]{1,3})/.exec(a)) e += String.fromCharCode(parseInt(i[1], 8));
			else {
				e += "\\" + r, this.pos += 2;
				continue;
			}
			this.pos += 1 + i[0].length;
		}
	}
}, Hd = /* @__PURE__ */ "**=.<<=.>>=.**.<<.>>.<=.>=.==.!=.&&.||.++.--.+=.-=.*=./=.%=.&=.^=.|=.+.-.*./.%.<.>.=.!.~.&.^.|.?.:.(.).,".split("."), Ud = /* @__PURE__ */ new Set([
	"=",
	"+=",
	"-=",
	"*=",
	"/=",
	"%=",
	"<<=",
	">>=",
	"&=",
	"^=",
	"|=",
	"**="
]), Wd = [
	["||"],
	["&&"],
	["|"],
	["^"],
	["&"],
	["==", "!="],
	[
		"<",
		"<=",
		">",
		">="
	],
	["<<", ">>"],
	["+", "-"],
	[
		"*",
		"/",
		"%"
	]
], Gd = (e) => BigInt.asIntN(64, e), Kd = 32;
function qd(e, t, n = 0) {
	if (n > Kd) throw new X(U.t("arith.tooDeep"));
	let r = Yd(String(e));
	if (!r.length) return 0n;
	let i = {
		tokens: r,
		i: 0,
		text: e
	}, a = $d(i);
	if (i.i < r.length) throw Jd(i);
	return lf(a, t, n);
}
var Jd = (e) => new X(U.t("arith.syntax", {
	expr: String(e.text).trim(),
	token: e.tokens[e.i]?.v ?? U.t("arith.end")
}));
function Yd(e) {
	let t = [], n = 0;
	for (; n < e.length;) {
		let r = e[n];
		if (/\s/.test(r)) {
			n++;
			continue;
		}
		let i, a = e.slice(n);
		if (i = /^(?:0[xX][0-9a-fA-F]+|\d+#[0-9a-zA-Z@_]+|\d+)/.exec(a)) {
			t.push({
				t: "num",
				v: i[0]
			}), n += i[0].length;
			continue;
		}
		if (i = /^[A-Za-z_]\w*/.exec(a)) {
			n += i[0].length;
			let r = null;
			if (e[n] === "[") {
				let t = 0, i = n;
				for (; i < e.length; i++) if (e[i] === "[") t++;
				else if (e[i] === "]" && --t === 0) break;
				if (i >= e.length) throw new X(U.t("arith.missingBracket", { expr: e.trim() }));
				r = e.slice(n + 1, i), n = i + 1;
			}
			t.push({
				t: "var",
				v: i[0],
				index: r
			});
			continue;
		}
		let o = Hd.find((t) => e.startsWith(t, n));
		if (!o) throw new X(U.t("arith.syntax", {
			expr: e.trim(),
			token: r
		}));
		t.push({
			t: "op",
			v: o
		}), n += o.length;
	}
	return t;
}
var Xd = (e) => e.tokens[e.i], Zd = (e, ...t) => Xd(e)?.t === "op" && t.includes(Xd(e).v), Qd = (e) => e.tokens[e.i++];
function $d(e) {
	let t = ef(e);
	for (; Zd(e, ",");) Qd(e), t = {
		k: "comma",
		a: t,
		b: ef(e)
	};
	return t;
}
function ef(e) {
	let t = e.i, n = Xd(e);
	return n?.t === "var" && e.tokens[e.i + 1]?.t === "op" && Ud.has(e.tokens[e.i + 1].v) ? (e.i += 2, {
		k: "assign",
		name: n.v,
		index: n.index,
		op: e.tokens[t + 1].v,
		value: ef(e)
	}) : tf(e);
}
function tf(e) {
	let t = nf(e, 0);
	if (!Zd(e, "?")) return t;
	Qd(e);
	let n = ef(e);
	if (!Zd(e, ":")) throw Jd(e);
	return Qd(e), {
		k: "ternary",
		cond: t,
		yes: n,
		no: ef(e)
	};
}
function nf(e, t) {
	if (t >= Wd.length) return rf(e);
	let n = nf(e, t + 1);
	for (; Zd(e, ...Wd[t]);) n = {
		k: "bin",
		op: Qd(e).v,
		a: n,
		b: nf(e, t + 1)
	};
	return n;
}
function rf(e) {
	let t = af(e);
	return Zd(e, "**") ? (Qd(e), {
		k: "bin",
		op: "**",
		a: t,
		b: rf(e)
	}) : t;
}
function af(e) {
	if (Zd(e, "!", "~", "+", "-")) return {
		k: "unary",
		op: Qd(e).v,
		a: af(e)
	};
	if (Zd(e, "++", "--")) {
		let t = Qd(e).v, n = Qd(e);
		if (n?.t !== "var") throw Jd(e);
		return {
			k: "pre",
			op: t,
			name: n.v,
			index: n.index
		};
	}
	return of(e);
}
function of(e) {
	let t = Qd(e);
	if (!t) throw new X(U.t("arith.operandExpected", { expr: String(e.text).trim() }));
	if (t.t === "num") return {
		k: "num",
		v: t.v
	};
	if (t.t === "var") return Zd(e, "++", "--") ? {
		k: "post",
		op: Qd(e).v,
		name: t.v,
		index: t.index
	} : {
		k: "var",
		name: t.v,
		index: t.index
	};
	if (t.v === "(") {
		let t = $d(e);
		if (!Zd(e, ")")) throw Jd(e);
		return Qd(e), t;
	}
	throw e.i--, Jd(e);
}
function sf(e) {
	let t = String(e);
	if (/^0[xX]/.test(t)) return BigInt(t);
	let n = /^(\d+)#(.+)$/.exec(t);
	if (n) {
		let e = Number(n[1]);
		if (e < 2 || e > 64) throw new X(U.t("arith.badBase", { value: t }));
		let r = 0n;
		for (let i of n[2]) {
			let n = /\d/.test(i) ? +i : /[a-z]/.test(i) ? i.charCodeAt(0) - 87 : /[A-Z]/.test(i) ? e <= 36 ? i.charCodeAt(0) - 55 : i.charCodeAt(0) - 29 : i === "@" ? 62 : 63;
			if (n >= e) throw new X(U.t("arith.tooGreatForBase", { value: t }));
			r = r * BigInt(e) + BigInt(n);
		}
		return Gd(r);
	}
	if (/^0[0-7]+$/.test(t)) return Gd(BigInt("0o" + t.slice(1)));
	if (/^0\d+$/.test(t)) throw new X(U.t("arith.tooGreatForBase", { value: t }));
	return Gd(BigInt(t));
}
function cf(e, t, n, r) {
	let i = String(e.get(t, n == null ? null : String(qd(n, e, r + 1))) ?? "").trim();
	return i ? /^-?\d+$/.test(i) ? Gd(BigInt(i)) : qd(i, e, r + 1) : 0n;
}
function lf(e, t, n) {
	let r = (e) => lf(e, t, n), i = (e) => e.index == null ? null : String(qd(e.index, t, n + 1));
	switch (e.k) {
		case "num": return sf(e.v);
		case "var": return cf(t, e.name, e.index, n);
		case "comma": return r(e.a), r(e.b);
		case "ternary": return r(e.cond) === 0n ? r(e.no) : r(e.yes);
		case "unary": {
			let t = r(e.a);
			return e.op === "!" ? t === 0n ? 1n : 0n : e.op === "~" ? Gd(~t) : e.op === "-" ? Gd(-t) : t;
		}
		case "pre":
		case "post": {
			let r = i(e), a = cf(t, e.name, r ?? null, n), o = Gd(e.op === "++" ? a + 1n : a - 1n);
			return t.set(e.name, r, String(o)), e.k === "pre" ? o : a;
		}
		case "assign": {
			let a = i(e), o = r(e.value);
			return e.op !== "=" && (o = uf(e.op.slice(0, -1), cf(t, e.name, a, n), o)), t.set(e.name, a, String(o)), o;
		}
		case "bin": return e.op === "&&" ? r(e.a) !== 0n && r(e.b) !== 0n ? 1n : 0n : e.op === "||" ? r(e.a) !== 0n || r(e.b) !== 0n ? 1n : 0n : uf(e.op, r(e.a), r(e.b));
	}
	throw new X(U.t("arith.invalid"));
}
function uf(e, t, n) {
	switch (e) {
		case "+": return Gd(t + n);
		case "-": return Gd(t - n);
		case "*": return Gd(t * n);
		case "/":
		case "%":
			if (n === 0n) throw new X(U.t("arith.divisionByZero"));
			return Gd(e === "/" ? t / n : t % n);
		case "**":
			if (n < 0n) throw new X(U.t("arith.negativeExponent"));
			for (var r = 1n; n > 0n; n >>= 1n, t = Gd(t * t)) n & 1n && (r = Gd(r * t));
			return r;
		case "<<": return Gd(t << (n & 63n));
		case ">>": return Gd(t >> (n & 63n));
		case "&": return Gd(t & n);
		case "|": return Gd(t | n);
		case "^": return Gd(t ^ n);
		case "<": return t < n ? 1n : 0n;
		case "<=": return t <= n ? 1n : 0n;
		case ">": return t > n ? 1n : 0n;
		case ">=": return t >= n ? 1n : 0n;
		case "==": return t === n ? 1n : 0n;
		case "!=": return t === n ? 0n : 1n;
	}
	throw new X(U.t("arith.unknownOperator", { op: e }));
}
// src/terminal/shell/expand.js
var df = { brk: !0 }, ff = 1e5;
async function pf(e, t) {
	let n = [];
	for (let r of t) n.push(...await mf(e, r));
	return n;
}
async function mf(e, t, { split: n = !t.noSplit, braces: r = n } = {}) {
	let i = r ? xf(t.parts) : [t.parts], a = [];
	for (let t of i) {
		let r = await Ef(e, Tf(e, t), !1), i = n ? bf(r, _f(e)) : [yf(r)];
		for (let t of i) {
			if (n && !e.options.noglob) {
				let n = vf(t);
				if (yu(n)) {
					let t = ku(e.cwd, n);
					if (t.length) {
						a.push(...t);
						continue;
					}
				}
			}
			a.push(t.map((e) => e.text).join(""));
		}
	}
	return a;
}
async function Z(e, t) {
	return t ? yf(await Ef(e, Tf(e, t.parts), !1)).map((e) => e.text).join("") : "";
}
async function hf(e, t) {
	return t ? vf(yf(await Ef(e, Tf(e, t.parts), !1))) : "";
}
async function gf(e, t) {
	return yf(await Ef(e, t.parts, !1)).map((e) => e.quoted ? e.text.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") : e.text).join("");
}
var _f = (e) => e.getVar("IFS") ?? " 	\n", vf = (e) => e.map((e) => e.quoted ? _u(e.text) : e.text).join("");
function yf(e) {
	return e.map((e) => e.brk ? {
		text: " ",
		quoted: !0
	} : e);
}
function bf(e, t) {
	let n = [], r = [], i = !1, a = () => {
		n.push(r), r = [], i = !1;
	};
	for (let n of e) {
		if (n.brk) {
			a();
			continue;
		}
		if (n.quoted || !n.split) {
			r.push(n), i ||= n.quoted || n.text.length > 0;
			continue;
		}
		let e = "";
		for (let o of n.text) t.includes(o) ? (e &&= (r.push({
			text: e,
			quoted: !1
		}), i = !0, ""), /\s/.test(o) ? i && a() : a()) : e += o;
		e && (r.push({
			text: e,
			quoted: !1
		}), i = !0);
	}
	return i && a(), n;
}
function xf(e) {
	if (!e.some((e) => e.type === "lit" && e.value.includes("{"))) return [e];
	let t = e.flatMap((e) => e.type === "lit" ? [...e.value].map((e) => ({ c: e })) : [{ part: e }]), n = [];
	return Sf(t, n), n.map(wf);
}
function Sf(e, t) {
	if (t.length > ff) throw new X(W("expand.braceTooLarge"));
	for (let n = 0; n < e.length; n++) {
		if (e[n].c !== "{") continue;
		let r = 0, i = n, a = [];
		for (; i < e.length; i++) {
			let t = e[i].c;
			if (t === "{") r++;
			else if (t === "}" && --r === 0) break;
			else t === "," && r === 1 && a.push(i);
		}
		if (i >= e.length) return void t.push(e);
		let o = e.slice(0, n), s = e.slice(i + 1);
		if (a.length) {
			let r = [
				n,
				...a,
				i
			];
			for (let n = 0; n < r.length - 1; n++) Sf([
				...o,
				...e.slice(r[n] + 1, r[n + 1]),
				...s
			], t);
			return;
		}
		let c = e.slice(n + 1, i), l = c.every((e) => e.c != null) ? Cf(c.map((e) => e.c).join("")) : null;
		if (l) {
			for (let e of l) Sf([
				...o,
				...[...e].map((e) => ({ c: e })),
				...s
			], t);
			return;
		}
	}
	t.push(e);
}
function Cf(e) {
	let t = /^(-?\d+)\.\.(-?\d+)(?:\.\.(-?\d+))?$/.exec(e);
	if (t) {
		let [e, n] = [Number(t[1]), Number(t[2])], r = Math.abs(Number(t[3] ?? 1)) || 1, i = /^-?0\d/.test(t[1]) || /^-?0\d/.test(t[2]) ? Math.max(t[1].length, t[2].length) : 0;
		if (Math.abs(n - e) / r > ff) throw new X(W("expand.braceTooLarge"));
		let a = [];
		for (let t = e; e <= n ? t <= n : t >= n; t += e <= n ? r : -r) {
			let e = String(Math.abs(t)).padStart(i - +(t < 0), "0");
			a.push(t < 0 ? "-" + e : e);
		}
		return a;
	}
	if (t = /^([a-zA-Z])\.\.([a-zA-Z])(?:\.\.(-?\d+))?$/.exec(e), t) {
		let [e, n] = [t[1].charCodeAt(0), t[2].charCodeAt(0)], r = Math.abs(Number(t[3] ?? 1)) || 1, i = [];
		for (let t = e; e <= n ? t <= n : t >= n; t += e <= n ? r : -r) i.push(String.fromCharCode(t));
		return i;
	}
	return null;
}
function wf(e) {
	let t = [];
	for (let n of e) n.part ? t.push(n.part) : t.at(-1)?.type === "lit" && t.at(-1).fresh ? t.at(-1).value += n.c : t.push({
		type: "lit",
		value: n.c,
		fresh: !0
	});
	return t;
}
function Tf(e, t) {
	let n = t[0];
	if (n?.type !== "lit" || !n.value.startsWith("~")) return t;
	let r = n.value.indexOf("/"), a = r < 0 ? n.value : n.value.slice(0, r), o = r < 0 ? "" : n.value.slice(r), s = null;
	return a === "~" ? s = e.getVar("HOME") ?? i.home : a === "~+" ? s = e.getVar("PWD") : a === "~-" ? s = e.getVar("OLDPWD") : a.slice(1) === e.getVar("USER") && (s = i.home), s == null || r < 0 && t.length > 1 && t[1].type !== "lit" ? t : [
		{
			type: "sq",
			value: s
		},
		...o ? [{
			type: "lit",
			value: o
		}] : [],
		...t.slice(1)
	];
}
async function Ef(e, t, n) {
	let r = [];
	for (let i of t) switch (i.type) {
		case "lit":
			r.push({
				text: i.value,
				quoted: n,
				split: !1
			});
			break;
		case "sq":
			r.push({
				text: i.value,
				quoted: !0
			});
			break;
		case "dq": {
			let t = await Ef(e, i.parts, !0), n = i.parts.length > 0 && i.parts.every((e) => e.type === "param" && Df(e));
			!t.length && !n && r.push({
				text: "",
				quoted: !0
			}), r.push(...t);
			break;
		}
		case "cmdsub": {
			let t = (await e.substitute(i.body)).replace(/\n+$/, "");
			r.push({
				text: t,
				quoted: n,
				split: !n
			});
			break;
		}
		case "arith": {
			let t = await Z(e, i.word);
			r.push({
				text: String(e.arith(t)),
				quoted: n,
				split: !n
			});
			break;
		}
		case "param": r.push(...await Of(e, i, n));
	}
	return r;
}
var Df = (e) => !e.length && !e.op && (e.name === "@" || e.index === "@");
async function Of(e, t, n) {
	let { values: r, multi: i, star: a } = await kf(e, t);
	if (i || a) {
		if (a && n) return [{
			text: r.join((_f(e) || "")[0] ?? ""),
			quoted: !0
		}];
		let t = [];
		return r.forEach((e, r) => {
			r && t.push(df), t.push({
				text: e,
				quoted: n,
				split: !n
			});
		}), t;
	}
	return [{
		text: r[0] ?? "",
		quoted: n,
		split: !n
	}];
}
async function kf(e, t) {
	let n = t.name, r = t.index ?? null;
	if (t.indirect && (r === "@" || r === "*")) return {
		values: e.arrayKeys(n),
		multi: r === "@",
		star: r === "*"
	};
	if (t.indirect) {
		let t = Af(e, n, r).values[0] ?? "", i = /^([A-Za-z_]\w*|[0-9]+|[@*#?$!-])(?:\[(.*)\])?$/.exec(t);
		if (!i) throw new X(W("expand.badSubstitution", { name: t }));
		[, n, r = null] = i;
	}
	let { values: i, set: a, multi: o, star: s } = Af(e, n, r);
	if (t.length) return o || s ? { values: [String(i.length)] } : { values: [String([...i[0] ?? ""].length)] };
	let c = t.op;
	if (!c) {
		if (!a && e.options.nounset && !(o || s)) throw new X(W("expand.unbound", { name: n }));
		return {
			values: i,
			multi: o,
			star: s
		};
	}
	let l = !a || i.length === 0 || i.length === 1 && i[0] === "" && !(o || s), u = c.startsWith(":") ? l : !a;
	switch (c) {
		case "-":
		case ":-": return u ? { values: [await Z(e, t.arg)] } : {
			values: i,
			multi: o,
			star: s
		};
		case "=":
		case ":=":
			if (!u) return {
				values: i,
				multi: o,
				star: s
			};
			if (!/^[A-Za-z_]\w*$/.test(n)) throw new X(W("expand.cannotAssign", { name: n }));
			return e.setVar(n, await Z(e, t.arg), r), { values: [e.getVar(n, r) ?? ""] };
		case "?":
		case ":?":
			if (!u) return {
				values: i,
				multi: o,
				star: s
			};
			throw new X(`${n}: ${await Z(e, t.arg) || W("expand.nullOrNotSet")}`);
		case "+":
		case ":+": return u ? { values: [] } : { values: [await Z(e, t.arg)] };
	}
	let d = async (e) => ({
		values: await Promise.all(i.map(e)),
		multi: o,
		star: s
	});
	switch (c) {
		case "#":
		case "##":
		case "%":
		case "%%": {
			let n = await hf(e, t.arg);
			return d((e) => jf(e, n, c));
		}
		case "/":
		case "//":
		case "/#":
		case "/%": {
			let n = await hf(e, t.arg), r = await Z(e, t.replace);
			return d((e) => Mf(e, n, r, c));
		}
		case "^":
		case "^^":
		case ",":
		case ",,": {
			let n = t.arg?.parts.length ? await hf(e, t.arg) : "?", r = c[0] === "^";
			return d((e) => [...e].map((e, t) => (c.length === 2 || t === 0) && Su(n, e) ? r ? e.toUpperCase() : e.toLowerCase() : e).join(""));
		}
		case "substr": {
			let r = Number(e.arith(await Z(e, t.offset))), a = t.count ? Number(e.arith(await Z(e, t.count))) : null, c = (e) => {
				let t = r < 0 ? Math.max(0, e.length + r) : Math.min(r, e.length);
				if (a == null) return e.slice(t);
				if (a < 0) {
					if (o || s) throw new X(W("expand.negativeSubstring", { count: a }));
					return e.slice(t, Math.max(t, e.length + a));
				}
				return e.slice(t, t + a);
			};
			return o || s ? {
				values: c(n === "@" || n === "*" ? [e.getVar("0") ?? "bash", ...i] : i),
				multi: o,
				star: s
			} : { values: [c([...i[0] ?? ""]).join("")] };
		}
	}
	throw new X(W("expand.badSubstitution", { name: n }));
}
function Af(e, t, n) {
	if (t === "@" || t === "*") return {
		values: e.positional,
		set: !0,
		multi: t === "@",
		star: t === "*"
	};
	if (/^\d+$/.test(t)) {
		let n = t === "0" ? e.getVar("0") : e.positional[Number(t) - 1];
		return {
			values: n == null ? [] : [n],
			set: n != null
		};
	}
	if (t === "#") return {
		values: [String(e.positional.length)],
		set: !0
	};
	if (/^[?$!-]$/.test(t)) {
		let n = e.special(t);
		return {
			values: n == null ? [] : [n],
			set: n != null
		};
	}
	if (n === "@" || n === "*") {
		let r = e.getArray(t) ?? [];
		return {
			values: r,
			set: r.length > 0,
			multi: n === "@",
			star: n === "*"
		};
	}
	let r = e.getVar(t, n == null ? null : e.arrayIndex(n));
	return {
		values: r == null ? [] : [r],
		set: r != null
	};
}
function jf(e, t, n) {
	let r = n.length === 2;
	if (n[0] === "#") {
		let n = [...Array(e.length + 1).keys()];
		r && n.reverse();
		for (let r of n) if (Su(t, e.slice(0, r))) return e.slice(r);
	} else {
		let n = [...Array(e.length + 1).keys()];
		r || n.reverse();
		for (let r of n) if (Su(t, e.slice(r))) return e.slice(0, r);
	}
	return e;
}
function Mf(e, t, n, r) {
	if (!t) return e;
	let i = xu(t);
	if (r === "/#") return e.replace(RegExp(`^(?:${i})`), () => n);
	if (r === "/%") {
		for (let r = 0; r <= e.length; r++) if (Su(t, e.slice(r))) return e.slice(0, r) + n;
		return e;
	}
	let a = new RegExp(i, r === "//" ? "g" : "");
	return e.replace(a, (e) => e === "" ? e : n);
}
// src/terminal/shell/streams.js
var Nf = class {
	#e = "";
	#t = !1;
	async pull() {
		return null;
	}
	async read() {
		if (this.#e) {
			let e = this.#e;
			return this.#e = "", e;
		}
		if (this.#t) return null;
		let e = await this.pull();
		return e ?? (this.#t = !0), e;
	}
	async readAll() {
		let e = "";
		for (let t; (t = await this.read()) != null;) e += t;
		return e;
	}
	async readLine(e = "\n") {
		for (;;) {
			let t = this.#e.indexOf(e);
			if (t >= 0) {
				let n = this.#e.slice(0, t);
				return this.#e = this.#e.slice(t + e.length), n;
			}
			if (this.#t) break;
			let n = await this.pull();
			if (n == null) {
				this.#t = !0;
				break;
			}
			this.#e += n;
		}
		if (!this.#e) return null;
		let t = this.#e;
		return this.#e = "", t;
	}
	async *lines() {
		for (let e; (e = await this.readLine()) != null;) yield e;
	}
	close() {}
}, Pf = class extends Nf {
	#e;
	constructor(e) {
		super(), this.#e = String(e);
	}
	async pull() {
		let e = this.#e;
		return this.#e = null, e || null;
	}
}, Ff = class extends Nf {}, If = class {
	write() {}
	async close() {}
}, Lf = class extends If {}, Rf = class extends If {
	text = "";
	write(e) {
		this.text += e;
	}
}, zf = class extends If {
	constructor(e) {
		super(), this.fn = e;
	}
	write(e) {
		return this.fn(String(e));
	}
}, Bf = 65536;
function Vf() {
	let e = [], t = 0, n = !1, r = !1, i = null, a = [], o = () => {
		i?.(), i = null;
	}, s = () => {
		let e = a;
		a = [], e.forEach((e) => e());
	};
	class c extends If {
		async write(n) {
			if (r || (n = String(n), n && (e.push(n), t += n.length, o(), t > Bf && await new Promise((e) => a.push(e)), r))) throw new Cd();
		}
		async close() {
			n = !0, o();
		}
	}
	class l extends Nf {
		async pull() {
			for (; !e.length;) {
				if (n || r) return null;
				await new Promise((e) => {
					i = e;
				});
			}
			let a = e.splice(0).join("");
			return t = 0, s(), a;
		}
		close() {
			r = !0, e.length = 0, t = 0, s();
		}
	}
	return {
		writer: new c(),
		reader: new l()
	};
}
// src/terminal/shell/Shell.js
var Hf = 200, Uf = 0, Wf = 1e3, Gf = class e {
	scopes = [/* @__PURE__ */ new Map()];
	functions = /* @__PURE__ */ new Map();
	aliases = /* @__PURE__ */ new Map();
	positional = [];
	options = {
		errexit: !1,
		nounset: !1,
		xtrace: !1,
		pipefail: !1,
		noglob: !1
	};
	status = 0;
	lastBg = null;
	condDepth = 0;
	loopDepth = 0;
	funcDepth = 0;
	exempt = !1;
	#e = i.root;
	constructor({ host: e, commands: t, parent: n = null }) {
		if (this.host = e, this.commands = t, n) return;
		this.token = new Td(), this.jobs = {
			list: [],
			next: 1
		}, this.pid = Wf++, this.started = Date.now();
		let r = c.user?.username || W("shell.defaultUser"), a = {
			HOME: i.home,
			USER: r,
			LOGNAME: r,
			HOSTNAME: "lilos",
			SHELL: "/bin/bash",
			TERM: "lilos",
			PATH: `${i.home}/bin`,
			PS1: "\\u@\\h:\\w\\$ ",
			PS2: "> ",
			0: "bash",
			BASH_VERSION: "5.2-lilos"
		};
		for (let [e, t] of Object.entries(a)) this.scopes[0].set(e, {
			value: t,
			exported: ![
				"PS1",
				"PS2",
				"0",
				"BASH_VERSION"
			].includes(e)
		});
		this.cwd = i.root;
	}
	get cwd() {
		return i.get(this.#e)?.type === "folder" ? this.#e : i.root;
	}
	set cwd(e) {
		let t = this.getVar("PWD");
		this.#e = e, t != null && t !== i.path(e) && this.setVar("OLDPWD", t), this.setVar("PWD", i.path(e));
	}
	resolve(e) {
		return Tu(this.cwd, e);
	}
	locate(e) {
		return Eu(this.cwd, e);
	}
	#t(e) {
		for (let t = this.scopes.length - 1; t >= 0; t--) if (this.scopes[t].has(e)) return this.scopes[t].get(e);
		return null;
	}
	getVar(e, t = null) {
		if (e === "RANDOM") return String(Math.floor(Math.random() * 32768));
		if (e === "SECONDS") return String(Math.floor((Date.now() - this.started) / 1e3));
		let n = this.#t(e);
		if (n && n.value != null) return Array.isArray(n.value) ? n.value[t ?? 0] : t == null || t === 0 ? n.value : void 0;
	}
	getArray(e) {
		let t = this.#t(e);
		return !t || t.value == null ? null : Array.isArray(t.value) ? t.value.filter(() => !0) : [t.value];
	}
	arrayKeys(e) {
		let t = this.#t(e);
		return !t || t.value == null ? [] : Array.isArray(t.value) ? Object.keys(t.value) : ["0"];
	}
	isSet(e) {
		return this.#t(e)?.value != null;
	}
	setVar(e, t, n = null, { local: r = !1, exported: i, readonly: a } = {}) {
		let o = r ? this.scopes.at(-1).get(e) : this.#t(e);
		if (o?.readonly) throw new X(W("shell.readonly", { name: e }));
		return o || (o = {
			value: null,
			exported: !1
		}, (r ? this.scopes.at(-1) : this.scopes[0]).set(e, o)), Array.isArray(t) ? o.value = [...t] : n == null ? t !== void 0 && (Array.isArray(o.value) ? o.value[0] = t == null ? "" : String(t) : o.value = t == null ? null : String(t)) : (Array.isArray(o.value) || (o.value = o.value == null ? [] : [o.value]), o.value[n] = String(t)), i !== void 0 && (o.exported = i), a && (o.readonly = !0), o;
	}
	unsetVar(e, t = null) {
		for (let n = this.scopes.length - 1; n >= 0; n--) {
			let r = this.scopes[n].get(e);
			if (r) {
				if (r.readonly) throw new X(W("shell.cannotUnset", { name: e }));
				t != null && Array.isArray(r.value) ? delete r.value[t] : this.scopes[n].delete(e);
				return;
			}
		}
	}
	variables() {
		let e = /* @__PURE__ */ new Map();
		for (let t of this.scopes) for (let [n, r] of t) e.set(n, r);
		return [...e].filter(([, e]) => e.value != null).sort(([e], [t]) => e < t ? -1 : +(e > t));
	}
	environment() {
		return Object.fromEntries(this.variables().filter(([, e]) => e.exported).map(([e, t]) => [e, Array.isArray(t.value) ? t.value[0] ?? "" : t.value]));
	}
	special(e) {
		switch (e) {
			case "?": return String(this.status);
			case "$": return String(this.pid);
			case "!": return this.lastBg == null ? void 0 : String(this.lastBg);
			case "-": return Object.entries({
				e: "errexit",
				u: "nounset",
				x: "xtrace",
				f: "noglob"
			}).filter(([, e]) => this.options[e]).map(([e]) => e).join("");
		}
	}
	arith(e) {
		return qd(e, this.#n);
	}
	#n = {
		get: (e, t) => this.getVar(e, t == null ? null : Number(t)),
		set: (e, t, n) => this.setVar(e, n, t == null ? null : Number(t))
	};
	arrayIndex(e) {
		let t = String(e).replace(/\$\{?([A-Za-z_]\w*|[0-9#?])\}?/g, (e, t) => (/^\d$/.test(t) ? this.positional[t - 1] : t === "#" ? this.positional.length : t === "?" ? this.status : this.getVar(t)) ?? ""), n = Number(this.arith(t));
		if (n < 0) throw new X(W("shell.badSubscript", { index: e }));
		return n;
	}
	subshell({ script: t = !1 } = {}) {
		let n = new e({
			host: this.host,
			commands: this.commands,
			parent: this
		});
		return t ? n.scopes = [new Map(this.variables().filter(([, e]) => e.exported).map(([e, t]) => [e, {
			...t,
			value: Array.isArray(t.value) ? [...t.value] : t.value
		}]))] : (n.scopes = this.scopes.map((e) => new Map([...e].map(([e, t]) => [e, {
			...t,
			value: Array.isArray(t.value) ? [...t.value] : t.value
		}]))), n.functions = new Map(this.functions), n.aliases = new Map(this.aliases), n.positional = [...this.positional]), n.options = { ...this.options }, n.status = this.status, n.lastBg = this.lastBg, n.token = this.token, n.jobs = this.jobs, n.pid = this.pid, n.started = this.started, n.#e = this.cwd, n.subshellLevel = (this.subshellLevel ?? 0) + 1, n;
	}
	async run(e, t = this.host) {
		return Rd(e, { aliases: this.aliases }), this.exec({
			type: "script",
			source: e
		}, t);
	}
	async tick() {
		this.token.check();
		let e = performance.now();
		e - Uf > 12 && (Uf = e, await new Promise((e) => setTimeout(e)), this.token.check());
	}
	sleep(e) {
		return new Promise((t, n) => {
			let r = this.token.onAbort(() => {
				clearTimeout(i), n(new Sd());
			}), i = setTimeout(() => {
				r(), t();
			}, e);
		});
	}
	async exec(e, t) {
		switch (e.type) {
			case "list": return this.execList(e, t);
			case "andor": return this.execAndOr(e, t);
			case "pipeline": return this.execPipeline(e, t);
			case "simple": return this.execSimple(e, t);
			case "script": {
				let n = this.status;
				for (let r of zd(e.source, { aliases: this.aliases })) n = await this.execList(r, t);
				return n;
			}
		}
		return this.withRedirects(e.redirs ?? [], t, (t) => this.execCompound(e, t));
	}
	async execList(e, t) {
		let n = this.status;
		for (let r of e.items) if (r.async ? (this.startJob(r, t), n = 0) : (this.exempt = !1, n = await this.exec(r.node, t)), this.status = n, n !== 0 && this.options.errexit && !this.condDepth && !this.exempt && !r.async) throw new xd(n);
		return n;
	}
	async execAndOr(e, t) {
		let n = [e.first, ...e.rest.map((e) => e.node)], r = e.rest.map((e) => e.op), i = 0, a = 0;
		for (let e = 0; e < n.length; e++) {
			if (e > 0 && r[e - 1] === "&&" != (i === 0)) continue;
			let o = e === n.length - 1;
			o || this.condDepth++;
			try {
				i = await this.exec(n[e], t);
			} finally {
				o || this.condDepth--;
			}
			this.status = i, a = e;
		}
		return this.exempt = a < n.length - 1, i;
	}
	async execPipeline(e, t) {
		let n;
		e.negate && this.condDepth++;
		try {
			if (e.cmds.length === 1) n = await this.exec(e.cmds[0], t);
			else {
				let r = e.cmds.slice(1).map(() => Vf()), i = e.cmds.length - 1, a = await Promise.all(e.cmds.map(async (n, a) => {
					let o = a === i ? t.stdout : r[a].writer, s = {
						stdin: a === 0 ? t.stdin : r[a - 1].reader,
						stdout: o,
						stderr: e.both[a] ? o : t.stderr
					};
					try {
						return await this.subshell().runSubshell(n, s);
					} finally {
						a < i && await r[a].writer.close(), a > 0 && r[a - 1].reader.close();
					}
				}));
				this.setVar("PIPESTATUS", a.map(String)), n = this.options.pipefail ? [...a].reverse().find((e) => e !== 0) ?? 0 : a[i];
			}
		} finally {
			e.negate && this.condDepth--;
		}
		return e.negate ? +(n === 0) : n;
	}
	async runSubshell(e, t) {
		try {
			return await this.exec(e, t);
		} catch (e) {
			if (e instanceof xd) return e.code;
			if (e instanceof Cd) return 141;
			if (e instanceof vd || e instanceof yd) return 0;
			if (e instanceof bd) return e.code;
			if (e instanceof X) return await t.stderr.write(`bash: ${e.message}\n`), e.code;
			throw e;
		}
	}
	async execCompound(e, t) {
		switch (e.type) {
			case "group": return this.exec(e.body, t);
			case "subshell": return this.subshell().runSubshell(e.body, t);
			case "func": return this.functions.set(e.name, e), 0;
			case "if":
				for (let { cond: n, body: r } of e.clauses) if (await this.condition(n, t) === 0) return this.exec(r, t);
				return e.otherwise ? this.exec(e.otherwise, t) : 0;
			case "while": {
				let n = 0;
				return await this.loop(async () => await this.condition(e.cond, t) === 0 !== e.until && (n = await this.exec(e.body, t), !0)), n;
			}
			case "for": {
				let n = e.words ? await pf(this, e.words) : [...this.positional], r = 0, i = 0;
				return await this.loop(async () => i >= n.length ? !1 : (this.setVar(e.name, n[i++]), r = await this.exec(e.body, t), !0)), r;
			}
			case "cfor": {
				let n = async (e) => this.arith(await Z(this, e)), r = 0;
				e.init.parts.length && await n(e.init);
				let i = !0;
				return await this.loop(async () => (!i && e.step.parts.length && await n(e.step), i = !1, e.cond.parts.length && await n(e.cond) === 0n ? !1 : (r = await this.exec(e.body, t), !0))), r;
			}
			case "case": {
				let n = await Z(this, e.word), r = 0;
				for (let i = 0; i < e.items.length; i++) {
					let a = e.items[i], o = !1;
					for (let e of a.patterns) if (Su(await hf(this, e), n)) {
						o = !0;
						break;
					}
					if (o) {
						for (r = await this.exec(a.body, t); a.term === ";&" && i + 1 < e.items.length;) a = e.items[++i], r = await this.exec(a.body, t);
						if (a.term !== ";;&") break;
					}
				}
				return r;
			}
			case "arithcmd": return +(this.arith(await Z(this, e.word)) === 0n);
			case "cond": try {
				return +!await this.cond(e.expr);
			} catch (e) {
				if (!(e instanceof X)) throw e;
				return await t.stderr.write(`bash: ${e.message}\n`), 2;
			}
		}
		throw new X(W("shell.unknownConstruct", { type: e.type }));
	}
	async condition(e, t) {
		this.condDepth++;
		try {
			return await this.exec(e, t);
		} finally {
			this.condDepth--;
		}
	}
	async loop(e) {
		this.loopDepth++;
		try {
			for (;;) {
				await this.tick();
				try {
					if (!await e()) return;
				} catch (e) {
					if (e instanceof vd) {
						if (e.levels > 1) throw new vd(e.levels - 1);
						return;
					}
					if (e instanceof yd) {
						if (e.levels > 1) throw new yd(e.levels - 1);
						continue;
					}
					throw e;
				}
			}
		} finally {
			this.loopDepth--;
		}
	}
	async cond(e) {
		switch (e.op) {
			case "!": return !await this.cond(e.expr);
			case "&&": return await this.cond(e.left) && this.cond(e.right);
			case "||": return await this.cond(e.left) || this.cond(e.right);
			case "word": return await Z(this, e.word) !== "";
			case "unary": return this.unaryTest(e.flag, await Z(this, e.arg));
		}
		let t = await Z(this, e.left);
		switch (e.bop) {
			case "==":
			case "=": return Su(await hf(this, e.right), t);
			case "!=": return !Su(await hf(this, e.right), t);
			case "=~": {
				let n;
				try {
					n = new RegExp(await gf(this, e.right));
				} catch {
					throw new X(W("shell.badRegex"));
				}
				let r = n.exec(t);
				return this.setVar("BASH_REMATCH", r ? [...r].map((e) => e ?? "") : []), !!r;
			}
		}
		return this.binaryTest(e.bop, t, await Z(this, e.right), !0);
	}
	unaryTest(e, t) {
		let n = () => t === "" ? null : this.resolve(t);
		switch (e) {
			case "-n": return t !== "";
			case "-z": return t === "";
			case "-v": return this.isSet(t.replace(/\[.*$/, ""));
			case "-o": return !!this.options[t];
			case "-e":
			case "-a": return !!n() || t === "/dev/null";
			case "-f": return n()?.type === "file";
			case "-d": return n()?.type === "folder";
			case "-s": {
				let e = n();
				return !!e && (e.type !== "file" || (e.size ?? 0) > 0);
			}
			case "-r":
			case "-w": return !!n();
			case "-x": {
				let e = n();
				return e?.type === "folder" || e?.type === "file" && /\.(sh|bash)$/i.test(e.name);
			}
			case "-L":
			case "-h": return n()?.type === "app";
			case "-t": return t === "0" || t === "1" || t === "2";
		}
		throw new X(W("shell.unaryExpected", { op: e }));
	}
	binaryTest(e, t, n) {
		let r = (e) => {
			if (!/^\s*-?\d+\s*$/.test(e)) throw new X(W("shell.integerExpected", { value: e }));
			return BigInt(e.trim());
		};
		switch (e) {
			case "=":
			case "==": return t === n;
			case "!=": return t !== n;
			case "<": return t < n;
			case ">": return t > n;
			case "-eq": return r(t) === r(n);
			case "-ne": return r(t) !== r(n);
			case "-lt": return r(t) < r(n);
			case "-le": return r(t) <= r(n);
			case "-gt": return r(t) > r(n);
			case "-ge": return r(t) >= r(n);
			case "-nt": return (this.resolve(t)?.modified ?? -Infinity) > (this.resolve(n)?.modified ?? -Infinity);
			case "-ot": return (this.resolve(t)?.modified ?? Infinity) < (this.resolve(n)?.modified ?? Infinity);
			case "-ef": {
				let e = this.resolve(t), r = this.resolve(n);
				return !!e && e.id === r?.id;
			}
		}
		throw new X(W("shell.binaryExpected", { op: e }));
	}
	async execSimple(e, t) {
		await this.tick(), this.curIo = t, this.substStatus = null;
		let n;
		try {
			n = [];
			for (let t of e.words) {
				if (!t.declArray) {
					n.push(...await mf(this, t));
					continue;
				}
				let { name: e, append: r, words: i } = t.declArray, a = await pf(this, i);
				(this.declArrays ??= /* @__PURE__ */ new Map()).set(e, a), n.push(`${e}${r ? "+" : ""}=(${a.join(" ")})`);
			}
		} catch (e) {
			if (!(e instanceof X)) throw e;
			return await t.stderr.write(`bash: ${e.message}\n`), 1;
		}
		if (!n.length) {
			try {
				for (let t of e.assigns) await this.assign(t);
			} catch (e) {
				if (!(e instanceof X)) throw e;
				return await t.stderr.write(`bash: ${e.message}\n`), 1;
			}
			let n = this.substStatus ?? 0;
			return e.redirs.length ? this.withRedirects(e.redirs, t, async () => n) : n;
		}
		let r = null;
		if (e.assigns.length) {
			r = /* @__PURE__ */ new Map();
			for (let t of e.assigns) r.set(t.name, {
				value: t.array ? await pf(this, t.array) : await Z(this, t.value),
				exported: !0
			});
		}
		return this.options.xtrace && await t.stderr.write(`+ ${n.map(Yf).join(" ")}\n`), this.withRedirects(e.redirs, t, async (e) => {
			r && this.scopes.push(r);
			try {
				return await this.invoke(n, e);
			} finally {
				r && this.scopes.splice(this.scopes.indexOf(r), 1);
			}
		});
	}
	async assign(e) {
		if (e.array) {
			let t = await pf(this, e.array);
			this.setVar(e.name, e.append ? [...this.getArray(e.name) ?? [], ...t] : t);
			return;
		}
		let t = await Z(this, e.value), n = e.index == null ? null : this.arrayIndex(e.index);
		e.append ? this.setVar(e.name, (this.getVar(e.name, n) ?? "") + t, n) : this.setVar(e.name, t, n), this.options.xtrace && await this.curIo?.stderr.write(`+ ${e.name}=${Yf(t)}\n`);
	}
	async invoke(e, t, { functions: n = !0 } = {}) {
		let r = e[0];
		if (r.includes("/")) return this.runScript(r, e.slice(1), t);
		if (n && this.functions.has(r)) return this.callFunction(r, e, t);
		let i = this.commands.get(r);
		if (i) return this.runCommand(i, e, t);
		for (let n of (this.getVar("PATH") ?? "").split(":").filter(Boolean)) for (let i of [r, `${r}.sh`]) if (this.resolve(`${n}/${i}`)?.type === "file") return this.runScript(`${n}/${i}`, e.slice(1), t);
		return await t.stderr.write(`bash: ${W("shell.commandNotFound", { name: r })}\n`), 127;
	}
	async runCommand(e, t, n) {
		let r = new Kf(this, e, t, n);
		if (t[1] === "--help" && !e.ownHelp) return await r.out(Xf(e)), 0;
		try {
			let t = await e.run(r);
			return typeof t == "number" ? t : 0;
		} catch (e) {
			if (e instanceof Cd) return 141;
			let t = async (e) => {
				try {
					await r.error(e);
				} catch {}
			};
			if (e instanceof X) return await t(e.message), e.code;
			if (e instanceof vd || e instanceof yd || e instanceof bd || e instanceof xd || e instanceof Sd) throw e;
			return e instanceof Y || e instanceof wd ? (await t(e.message || W("parse.unexpectedEnd")), 2) : (await t(e?.message ?? String(e)), 1);
		}
	}
	async callFunction(e, t, n) {
		if (this.funcDepth >= Hf) throw new X(W("shell.tooDeep", { name: e }));
		let r = this.functions.get(e), i = this.positional, a = /* @__PURE__ */ new Map();
		this.positional = t.slice(1), this.scopes.push(a), this.funcDepth++;
		try {
			return await this.exec(r.body, n);
		} catch (e) {
			if (e instanceof bd) return e.code;
			throw e;
		} finally {
			this.funcDepth--, this.scopes.splice(this.scopes.indexOf(a), 1), this.positional = i;
		}
	}
	async readScript(e) {
		let t = this.resolve(e);
		if (!t) throw new X(W("err.noSuchFile", { path: e }), 127);
		if (t.type === "folder") throw new X(W("err.isADirectory", { path: e }), 126);
		if (t.type !== "file") throw new X(W("err.notAFile", { path: e }), 126);
		return i.read(t.id);
	}
	async runScript(e, t, n) {
		let r;
		try {
			r = await this.readScript(e);
		} catch (e) {
			if (!(e instanceof X)) throw e;
			return await n.stderr.write(`bash: ${e.message}\n`), e.code;
		}
		let i = this.subshell({ script: !0 });
		return i.positional = [...t], i.setVar("0", e), i.runSource(r, n, e);
	}
	async runSource(e, t, n) {
		try {
			Rd(e, { aliases: this.aliases });
		} catch (e) {
			if (!(e instanceof wd || e instanceof Y)) throw e;
			return await t.stderr.write(`${n}: ${e.message || W("parse.unexpectedEndOfFile")}\n`), 2;
		}
		return this.runSubshell({
			type: "script",
			source: e
		}, t);
	}
	async substitute(e) {
		let t = new Rf(), n = this.curIo ?? this.host, r = await this.subshell().runSubshell(e, {
			stdin: n.stdin,
			stdout: t,
			stderr: n.stderr
		});
		return this.substStatus = r, this.status = r, t.text;
	}
	async withRedirects(e, t, n) {
		if (!e.length) return n(t);
		let r = {
			0: t.stdin,
			1: t.stdout,
			2: t.stderr
		}, i = [];
		try {
			for (let n of e) {
				let e = n.fd ?? +!n.op.startsWith("<");
				switch (n.op) {
					case "<":
					case "<>":
						r[e] = await this.openRead(await this.redirTarget(n), t);
						break;
					case ">":
					case ">|":
					case ">>": {
						let a = await this.openWrite(await this.redirTarget(n), n.op === ">>", t);
						i.push(a), r[e] = a;
						break;
					}
					case "&>":
					case "&>>": {
						let e = await this.openWrite(await this.redirTarget(n), n.op === "&>>", t);
						i.push(e), r[1] = r[2] = e;
						break;
					}
					case ">&":
					case "<&": {
						let a = await this.redirTarget(n);
						if (a === "-") r[e] = n.op === ">&" ? new Lf() : new Ff();
						else if (/^\d+$/.test(a)) {
							if (!r[a]) throw new X(W("shell.badFd", { fd: a }));
							r[e] = r[a];
						} else if (n.op === ">&" && n.fd == null) {
							let e = await this.openWrite(a, !1, t);
							i.push(e), r[1] = r[2] = e;
						} else throw new X(W("shell.fdExpected", { target: a }));
						break;
					}
					case "<<":
					case "<<-":
						r[e] = new Pf(await Z(this, n.heredoc.body));
						break;
					case "<<<": r[e] = new Pf(await Z(this, n.target) + "\n");
				}
			}
		} catch (e) {
			if (!(e instanceof X)) throw e;
			await t.stderr.write(`bash: ${e.message}\n`);
			for (let e of i) await e.close().catch(() => {});
			return 1;
		}
		try {
			return await n({
				stdin: r[0],
				stdout: r[1],
				stderr: r[2]
			});
		} finally {
			for (let e of i) try {
				await e.close();
			} catch (e) {
				await t.stderr.write(`bash: ${e.message}\n`);
			}
		}
	}
	async redirTarget(e) {
		let t = await mf(this, e.target);
		if (t.length !== 1) throw new X(W("shell.ambiguousRedirect", { target: await Z(this, e.target) }));
		return t[0];
	}
	async openRead(e, t) {
		if (e === "/dev/null") return new Ff();
		if (e === "/dev/stdin") return t.stdin;
		let n = this.resolve(e);
		if (!n) throw new X(W("err.noSuchFile", { path: e }));
		if (n.type === "folder") throw new X(W("err.isADirectory", { path: e }));
		if (n.type !== "file") throw new X(W("err.notAFile", { path: e }));
		return new Pf(await i.read(n.id));
	}
	async openWrite(e, t, n) {
		if (e === "/dev/null") return new Lf();
		if (e === "/dev/stdout") return Jf(n.stdout);
		if (e === "/dev/stderr") return Jf(n.stderr);
		if (e === "/dev/tty") return Jf(this.host.stdout);
		let r = this.fileFor(e).id;
		return t || await i.write(r, ""), new qf(r, t);
	}
	fileFor(e) {
		let t = this.resolve(e);
		if (t?.type === "folder") throw new X(W("err.isADirectory", { path: e }));
		if (t?.type === "app") throw new X(W("shell.isAppLink", { path: e }));
		if (t) return t;
		let { parent: n, name: r } = this.locate(e);
		if (n?.type !== "folder" || !r) throw new X(W("err.noSuchFile", { path: e }));
		return i.create(n.id, {
			type: "file",
			name: r
		});
	}
	startJob(e, t) {
		let n = this.subshell();
		n.token = new Td();
		let r = {
			id: this.jobs.next++,
			pid: Wf++,
			text: e.text.replace(/&\s*$/, "").trim(),
			state: "running",
			code: null,
			token: n.token,
			notified: !1
		};
		return n.pid = r.pid, r.promise = n.runSubshell(e.node, {
			stdin: new Ff(),
			stdout: t.stdout,
			stderr: t.stderr
		}).then((e) => e, (e) => e instanceof Sd ? 130 : (t.stderr.write(`bash: ${e?.message ?? e}\n`), 1)).then((e) => (r.state = "done", r.code = e, e)), this.jobs.list.push(r), this.lastBg = r.pid, this.subshellLevel || t.stderr.write(`[${r.id}] ${r.pid}\n`), r;
	}
	findJob(e) {
		let t = this.jobs.list;
		return e == null || e === "%%" || e === "%+" || e === "%" ? t.at(-1) ?? null : e === "%-" ? t.at(-2) ?? null : /^%\d+$/.test(e) ? t.find((t) => t.id === Number(e.slice(1))) ?? null : /^\d+$/.test(e) ? t.find((t) => t.pid === Number(e)) ?? null : e.startsWith("%") ? t.find((t) => t.text.startsWith(e.slice(1))) ?? null : null;
	}
	reapJobs() {
		let e = this.jobs.list.filter((e) => e.state === "done");
		return this.jobs.list = this.jobs.list.filter((e) => e.state !== "done"), this.jobs.list.length || (this.jobs.next = 1), e.map((e) => `[${e.id}]  ${e.code === 0 ? W("jobs.done") : e.code === 130 ? W("jobs.interrupted") : W("jobs.exit", { code: e.code })}\t\t${e.text}\n`);
	}
	async waitJob(e, { forward: t = !1 } = {}) {
		let n, r = new Promise((r, i) => {
			n = this.token.onAbort(() => {
				t ? e.token.abort() : i(new Sd());
			});
		});
		try {
			return await Promise.race([e.promise, r]);
		} finally {
			n();
		}
	}
}, Kf = class {
	constructor(e, t, n, r) {
		this.shell = e, this.cmd = t, this.name = n[0], this.argv = n, this.args = n.slice(1), this.stdin = r.stdin, this.stdout = r.stdout, this.stderr = r.stderr, this.io = r;
	}
	get cwd() {
		return this.shell.cwd;
	}
	out(e) {
		return this.stdout.write(String(e));
	}
	err(e) {
		return this.stderr.write(String(e));
	}
	error(e) {
		return this.stderr.write(`${this.name}: ${e}\n`);
	}
	tick() {
		return this.shell.tick();
	}
	resolve(e) {
		return this.shell.resolve(e);
	}
	locate(e) {
		return this.shell.locate(e);
	}
	async *inputs(e) {
		e.length || (e = ["-"]);
		for (let t of e) {
			if (t === "-") {
				yield {
					name: "-",
					text: await this.stdin.readAll()
				};
				continue;
			}
			let e = this.resolve(t);
			e ? e.type === "folder" ? (await this.error(W("err.isADirectory", { path: t })), this.failed = !0) : e.type === "file" ? (yield {
				name: t,
				node: e,
				text: await i.read(e.id)
			}, await this.tick()) : (await this.error(W("err.notAFile", { path: t })), this.failed = !0) : (await this.error(W("err.noSuchFile", { path: t })), this.failed = !0);
		}
	}
}, qf = class extends If {
	#e = "";
	constructor(e, t) {
		super(), this.id = e, this.append = t;
	}
	write(e) {
		this.#e += e;
	}
	async close() {
		if (!i.exists(this.id) || this.append && !this.#e) return;
		let e = this.append ? await i.read(this.id) : "";
		await i.write(this.id, e + this.#e);
	}
}, Jf = (e) => ({
	write: (t) => e.write(t),
	close: async () => {}
}), Yf = (e) => e === "" ? "''" : /^[\w@%+=:,./~-]+$/.test(e) ? e : `'${e.replace(/'/g, "'\\''")}'`;
function Xf(e) {
	return `${e.usage ? `${W("help.usageLine", { usage: e.usage })}\n` : ""}${e.summary ?? ""}\n${e.help ? `\n${e.help.trim()}\n` : ""}`;
}
// src/terminal/commands/options.js
function Q(e, { flags: t = "", values: n = "", multi: r = "", long: i = {}, number: a = !1, stopAtArg: o = !1 } = {}) {
	let s = {}, c = [], l = e.args, u = (e, t) => {
		r.includes(e) ? (s[e] ??= []).push(t) : s[e] = t;
	}, d = (t) => new X(`${W("opt.invalid", { option: t })}${e.cmd.usage ? `\n${W("help.usageLine", { usage: e.cmd.usage })}` : ""}`, 2);
	for (let e = 0; e < l.length; e++) {
		let f = l[e];
		if (f === "--") {
			c.push(...l.slice(e + 1));
			break;
		}
		if (f.startsWith("--") && f.length > 2) {
			let [t, a] = f.slice(2).split(/=(.*)/s), o = i[t];
			if (o == null) throw d(`--${t}`);
			if (n.includes(o) || r.includes(o)) {
				let n = a ?? l[++e];
				if (n == null) throw new X(W("opt.longNeedsArgument", { name: t }), 2);
				u(o, n);
			} else s[o] = !0;
		} else if (f.startsWith("-") && f.length > 1) {
			if (a && /^-\d+$/.test(f)) {
				s.n = f.slice(1);
				continue;
			}
			for (let i = 1; i < f.length; i++) {
				let a = f[i];
				if (n.includes(a) || r.includes(a)) {
					let t = i + 1 < f.length ? f.slice(i + 1) : l[++e];
					if (t == null) throw new X(W("opt.needsArgument", { option: a }), 2);
					u(a, t);
					break;
				}
				if (!t.includes(a)) throw d(a);
				s[a] = !0;
			}
		} else {
			if (o) {
				c.push(...l.slice(e));
				break;
			}
			c.push(f);
		}
	}
	return {
		opts: s,
		args: c
	};
}
function $(e) {
	if (!/^[+-]?\d+$/.test(String(e))) throw new X(W("opt.badNumber", { value: e }), 2);
	return Number(e);
}
// src/terminal/commands/builtins.js
var Zf = [
	"if",
	"then",
	"else",
	"elif",
	"fi",
	"case",
	"esac",
	"for",
	"while",
	"until",
	"do",
	"done",
	"in",
	"function",
	"{",
	"}",
	"!",
	"[[",
	"]]"
], Qf = {
	errexit: "e",
	nounset: "u",
	xtrace: "x",
	noglob: "f",
	pipefail: null
}, $f = {
	n: "\n",
	t: "	",
	r: "\r",
	a: "\x07",
	b: "\b",
	e: "\x1B",
	E: "\x1B",
	f: "\f",
	v: "\v",
	"\\": "\\"
};
function ep(e, { printf: t = !1 } = {}) {
	let n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i !== "\\" || r === e.length - 1) {
			n += i;
			continue;
		}
		let a = e[++r];
		if ($f[a] != null) {
			n += $f[a];
			continue;
		}
		if (a === "c") return {
			text: n,
			stop: !0
		};
		if (t && a === "\"") {
			n += "\"";
			continue;
		}
		let o, s = e.slice(r);
		(o = /^x([0-9a-fA-F]{1,2})/.exec(s)) ? (n += String.fromCharCode(parseInt(o[1], 16)), r += o[0].length - 1) : (o = /^u([0-9a-fA-F]{1,4})/.exec(s)) || (o = /^U([0-9a-fA-F]{1,8})/.exec(s)) ? (n += String.fromCodePoint(Math.min(parseInt(o[1], 16), 1114111)), r += o[0].length - 1) : (o = (t ? /^([0-7]{1,3})/ : /^0([0-7]{0,3})/).exec(s)) ? (n += String.fromCharCode(parseInt(o[1] || "0", 8)), r += o[0].length - 1) : n += "\\" + a;
	}
	return {
		text: n,
		stop: !1
	};
}
function tp(e, t) {
	let n = "", r = 0, i = [], a = /%([-+ #0]*)(\*|\d+)?(?:\.(\*|\d*))?([diouxXfFeEgGcsbq%])/y, o = () => r < t.length ? t[r++] : void 0, s = (e) => {
		if (e == null || e === "") return 0;
		if (/^['"]./.test(e)) return e.codePointAt(1);
		let t = e.trim();
		if (/^[+-]?(0[xX][0-9a-fA-F]+|\d+)$/.test(t)) return Number(t.startsWith("-") ? -Number(t.slice(1)) : Number(t.replace(/^\+/, "")));
		if (/^[+-]?0[0-7]+$/.test(t)) return parseInt(t, 8);
		let n = Number(t);
		return Number.isFinite(n) ? n : (i.push(W("printf.badNumber", { value: e })), 0);
	};
	do {
		let t = r;
		for (let t = 0; t < e.length;) {
			let r = e[t];
			if (r === "\\") {
				let r = /^\\(x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{1,4}|[0-7]{1,3}|.)/s.exec(e.slice(t))[0], { text: a, stop: o } = ep(r, { printf: !0 });
				if (n += a, o) return {
					text: n,
					errors: i
				};
				t += r.length;
				continue;
			}
			if (r !== "%") {
				n += r, t++;
				continue;
			}
			a.lastIndex = t;
			let c = a.exec(e);
			if (!c) {
				n += r, t++;
				continue;
			}
			t += c[0].length;
			let [, l, u, d, f] = c;
			if (f === "%") {
				n += "%";
				continue;
			}
			u === "*" && (u = String(s(o()))), d === "*" && (d = String(s(o())));
			let p = o(), m;
			switch (f) {
				case "s":
					m = p ?? "", d && (m = m.slice(0, Number(d)));
					break;
				case "b":
					m = ep(p ?? "").text;
					break;
				case "q":
					m = Yf(p ?? "");
					break;
				case "c":
					m = (p ?? "")[0] ?? "";
					break;
				case "d":
				case "i":
				case "u": {
					let e = Math.trunc(s(p));
					m = String(Math.abs(e)), d && (m = m.padStart(Number(d), "0")), m = (e < 0 ? "-" : l.includes("+") ? "+" : l.includes(" ") ? " " : "") + m;
					break;
				}
				case "o":
					m = (l.includes("#") ? "0" : "") + Math.trunc(s(p)).toString(8);
					break;
				case "x":
					m = (l.includes("#") ? "0x" : "") + Math.trunc(s(p)).toString(16);
					break;
				case "X":
					m = (l.includes("#") ? "0X" : "") + Math.trunc(s(p)).toString(16).toUpperCase();
					break;
				default: {
					let e = s(p), t = d === void 0 || d === "" ? 6 : Number(d);
					m = f === "e" || f === "E" ? e.toExponential(t).replace(/e([+-])(\d)$/, "e$10$2") : f === "g" || f === "G" ? String(Number(e.toPrecision(t || 1))) : e.toFixed(t), (f === "E" || f === "G") && (m = m.toUpperCase()), e >= 0 && l.includes("+") && (m = "+" + m);
				}
			}
			let h = Number(u ?? 0);
			if (m.length < h) {
				if (l.includes("-")) m = m.padEnd(h);
				else if (l.includes("0") && /[diouxXfFeEgG]/.test(f)) {
					let e = /^[+-]/.test(m) ? m[0] : "";
					m = e + m.slice(e.length).padStart(h - e.length, "0");
				} else m = m.padStart(h);
			}
			n += m;
		}
		if (r === t) break;
	} while (r < t.length);
	return {
		text: n,
		errors: i
	};
}
function np(e, t) {
	let n = 0, r = [
		"=",
		"==",
		"!=",
		"<",
		">",
		"-eq",
		"-ne",
		"-lt",
		"-le",
		"-gt",
		"-ge",
		"-nt",
		"-ot",
		"-ef"
	], i = /^-[a-zA-Z]$/;
	if (t.length === 1) return t[0] !== "";
	let a = () => {
		let e = o();
		for (; t[n] === "-o";) {
			n++;
			let t = o();
			e ||= t;
		}
		return e;
	}, o = () => {
		let e = s();
		for (; t[n] === "-a";) {
			n++;
			let t = s();
			e &&= t;
		}
		return e;
	}, s = () => t[n] === "!" && n + 1 < t.length ? (n++, !s()) : c(), c = () => {
		if (n >= t.length) throw new X(W("test.argumentExpected"), 2);
		if (t[n] === "(" && n + 2 < t.length) {
			n++;
			let e = a();
			if (t[n] !== ")") throw new X(W("err.missingParen"), 2);
			return n++, e;
		}
		if (n + 2 < t.length + 0 && r.includes(t[n + 1]) && n + 2 <= t.length - 1) {
			let r = e.binaryTest(t[n + 1], t[n], t[n + 2]);
			return n += 3, r;
		}
		if (i.test(t[n]) && n + 1 < t.length) {
			let r = e.unaryTest(t[n], t[n + 1]);
			return n += 2, r;
		}
		return t[n++] !== "";
	};
	if (!t.length) return !1;
	let l = a();
	if (n < t.length) throw new X(W("test.unexpectedArgument", { arg: t[n] }), 2);
	return l;
}
function rp(e, t) {
	let n = (Array.isArray(t.value) ? "a" : "") + (t.exported ? "x" : "") + (t.readonly ? "r" : ""), r = Array.isArray(t.value) ? `(${Object.keys(t.value).map((e) => `[${e}]=${JSON.stringify(t.value[e])}`).join(" ")})` : JSON.stringify(t.value);
	return `declare -${n || "-"} ${e}=${r}\n`;
}
async function ip(e, { local: t = !1, exported: n, readonly: r = !1, flags: i = "axrigpfFn" } = {}) {
	let a = e.shell, { opts: o, args: s } = Q(e, { flags: i });
	if (o.f || o.F) {
		let t = s.length ? s : [...a.functions.keys()].sort(), n = 0;
		for (let r of t) {
			let t = a.functions.get(r);
			t ? await e.out(o.F ? `declare -f ${r}\n` : `${t.text}\n`) : n = 1;
		}
		return n;
	}
	let c = t || e.name !== "export" && e.name !== "readonly" && a.funcDepth > 0 && !o.g;
	if (!s.length || o.p) {
		let t = a.variables().filter(([t, n]) => (!s.length || s.includes(t)) && (!(o.x || e.name === "export") || n.exported) && (!(o.r || e.name === "readonly") || n.readonly) && (!o.a || Array.isArray(n.value)));
		for (let [n, r] of t) await e.out(rp(n, r));
		return 0;
	}
	let l = 0;
	for (let t of s) {
		let i = /^([A-Za-z_]\w*)(?:\[([^\]]*)\])?(\+?)(?:=(.*))?$/s.exec(t);
		if (!i) {
			await e.error(W("err.badIdentifier", { name: t })), l = 1;
			continue;
		}
		let [, s, u, d, f] = i, p = o.n ? !1 : o.x || n ? !0 : void 0;
		if (f === void 0) {
			a.setVar(s, o.a && !a.isSet(s) ? [] : void 0, null, {
				local: c,
				exported: p,
				readonly: r || o.r
			});
			continue;
		}
		let m = /^\((.*)\)$/s.exec(f), h = a.declArrays?.get(s);
		if (m && (o.a || h)) {
			a.declArrays?.delete(s);
			let e = h ?? (m[1].trim() ? m[1].trim().split(/\s+/) : []);
			d && (e = [...a.getArray(s) ?? [], ...e]), a.setVar(s, e, null, {
				local: c,
				exported: p,
				readonly: r || o.r
			});
			continue;
		}
		let g = u == null ? null : a.arrayIndex(u), _ = d ? (a.getVar(s, g) ?? "") + f : f;
		a.setVar(s, o.i ? String(a.arith(_)) : _, g, {
			local: c,
			exported: p,
			readonly: r || o.r
		});
	}
	return l;
}
var ap = (e, t, n) => {
	if (t == null) return n;
	if (!/^-?\d+$/.test(t)) throw new X(W("err.numericArgument", { value: t }), 2);
	return (Number(t) % 256 + 256) % 256;
}, op = [
	{
		name: "cd",
		get usage() {
			return W("help.cd.usage");
		},
		get summary() {
			return W("help.cd.summary");
		},
		get help() {
			return W("help.cd.text");
		},
		async run(e) {
			let t = e.shell, { args: n } = Q(e, { flags: "LPe" }), r = n[0] ?? t.getVar("HOME") ?? "~";
			if (n.length > 1) throw new X(W("err.tooManyArguments"));
			if (r === "-") {
				if (r = t.getVar("OLDPWD"), r == null) throw new X(W("cd.oldpwdNotSet"));
				await e.out(r + "\n");
			}
			let i = e.resolve(r);
			if (!i) throw new X(W("err.noSuchFile", { path: r }));
			if (i.type !== "folder") throw new X(W("err.notADirectory", { path: r }));
			t.cwd = i.id;
		}
	},
	{
		name: "pwd",
		usage: "pwd",
		get summary() {
			return W("help.pwd.summary");
		},
		async run(e) {
			await e.out(i.path(e.cwd) + "\n");
		}
	},
	{
		name: "echo",
		ownHelp: !0,
		get usage() {
			return W("help.echo.usage");
		},
		get summary() {
			return W("help.echo.summary");
		},
		get help() {
			return W("help.echo.text");
		},
		async run(e) {
			let t = e.args, n = !0, r = !1;
			for (; t.length && /^-[neE]+$/.test(t[0]);) {
				for (let e of t[0].slice(1)) e === "n" ? n = !1 : r = e === "e";
				t = t.slice(1);
			}
			let i = t.join(" ");
			if (r) {
				let e = ep(i);
				i = e.text, e.stop && (n = !1);
			}
			await e.out(i + (n ? "\n" : ""));
		}
	},
	{
		name: "printf",
		ownHelp: !0,
		get usage() {
			return W("help.printf.usage");
		},
		get summary() {
			return W("help.printf.summary");
		},
		get help() {
			return W("help.printf.text");
		},
		async run(e) {
			let t = e.args, n = null;
			if (t[0] === "-v" && (n = t[1], t = t.slice(2)), t[0] === "--" && (t = t.slice(1)), !t.length) throw new X(W("help.usageShort", { usage: this.usage }), 2);
			let { text: r, errors: i } = tp(t[0], t.slice(1));
			for (let t of i) await e.error(t);
			return n ? e.shell.setVar(n, r) : await e.out(r), +!!i.length;
		}
	},
	{
		name: "export",
		get usage() {
			return W("help.export.usage");
		},
		get summary() {
			return W("help.export.summary");
		},
		get help() {
			return W("help.export.text");
		},
		run: (e) => ip(e, {
			exported: !0,
			flags: "npf"
		})
	},
	{
		name: "readonly",
		get usage() {
			return W("help.readonly.usage");
		},
		get summary() {
			return W("help.readonly.summary");
		},
		run: (e) => ip(e, {
			readonly: !0,
			flags: "ap"
		})
	},
	{
		name: "local",
		get usage() {
			return W("help.local.usage");
		},
		get summary() {
			return W("help.local.summary");
		},
		run(e) {
			if (!e.shell.funcDepth) throw new X(W("local.onlyInFunction"));
			return ip(e, {
				local: !0,
				flags: "axrin"
			});
		}
	},
	{
		name: "declare",
		get usage() {
			return W("help.declare.usage");
		},
		get summary() {
			return W("help.declare.summary");
		},
		get help() {
			return W("help.declare.text");
		},
		run: (e) => ip(e)
	},
	{
		name: "typeset",
		get usage() {
			return W("help.typeset.usage");
		},
		get summary() {
			return W("help.typeset.summary");
		},
		run: (e) => ip(e)
	},
	{
		name: "unset",
		get usage() {
			return W("help.unset.usage");
		},
		get summary() {
			return W("help.unset.summary");
		},
		async run(e) {
			let { opts: t, args: n } = Q(e, { flags: "fv" });
			for (let r of n) {
				if (t.f) {
					e.shell.functions.delete(r);
					continue;
				}
				let n = /^([A-Za-z_]\w*)(?:\[(.*)\])?$/.exec(r);
				if (!n) throw new X(W("err.badIdentifier", { name: r }));
				n[2] == null && !t.v && !e.shell.isSet(n[1]) && e.shell.functions.has(n[1]) ? e.shell.functions.delete(n[1]) : e.shell.unsetVar(n[1], n[2] == null ? null : e.shell.arrayIndex(n[2]));
			}
		}
	},
	{
		name: "env",
		get usage() {
			return W("help.env.usage");
		},
		get summary() {
			return W("help.env.summary");
		},
		async run(e) {
			let t = [...e.args], n = /* @__PURE__ */ new Map();
			for (; t.length && /^[A-Za-z_]\w*=/.test(t[0]);) {
				let [e, r] = t.shift().split(/=(.*)/s);
				n.set(e, {
					value: r,
					exported: !0
				});
			}
			if (!t.length) {
				let t = {
					...e.shell.environment(),
					...Object.fromEntries([...n].map(([e, t]) => [e, t.value]))
				};
				for (let n of Object.keys(t).sort()) await e.out(`${n}=${t[n]}\n`);
				return 0;
			}
			e.shell.scopes.push(n);
			try {
				return await e.shell.invoke(t, e.io, { functions: !1 });
			} finally {
				e.shell.scopes.splice(e.shell.scopes.indexOf(n), 1);
			}
		}
	},
	{
		name: "printenv",
		get usage() {
			return W("help.printenv.usage");
		},
		get summary() {
			return W("help.printenv.summary");
		},
		async run(e) {
			let t = e.shell.environment();
			if (!e.args.length) {
				for (let n of Object.keys(t).sort()) await e.out(`${n}=${t[n]}\n`);
				return 0;
			}
			let n = 0;
			for (let r of e.args) r in t ? await e.out(t[r] + "\n") : n = 1;
			return n;
		}
	},
	{
		name: "set",
		ownHelp: !0,
		get usage() {
			return W("help.set.usage");
		},
		get summary() {
			return W("help.set.summary");
		},
		get help() {
			return W("help.set.text");
		},
		async run(e) {
			let t = e.shell, n = e.args;
			if (!n.length) {
				for (let [n, r] of t.variables()) await e.out(`${n}=${Array.isArray(r.value) ? `(${r.value.map(Yf).join(" ")})` : Yf(r.value)}\n`);
				return 0;
			}
			for (let r = 0; r < n.length; r++) {
				let i = n[r];
				if (i === "--") return t.positional = n.slice(r + 1), 0;
				if (/^[-+]o$/.test(i)) {
					let a = n[++r];
					if (a == null) {
						for (let [n] of Object.entries(Qf)) await e.out(`${n.padEnd(15)}${t.options[n] ? "on" : "off"}\n`);
						continue;
					}
					if (!(a in Qf)) throw new X(W("set.badOptionName", { name: a }), 2);
					t.options[a] = i[0] === "-";
				} else if (/^[-+][euxfv]+$/.test(i)) for (let e of i.slice(1)) {
					let n = Object.keys(Qf).find((t) => Qf[t] === e);
					n && (t.options[n] = i[0] === "-");
				}
				else {
					if (/^[-+]/.test(i) && i.length > 1) throw new X(W("set.badOption", { option: i }), 2);
					return t.positional = n.slice(r), 0;
				}
			}
			return 0;
		}
	},
	{
		name: "shift",
		usage: "shift [n]",
		get summary() {
			return W("help.shift.summary");
		},
		run(e) {
			let t = e.args[0] == null ? 1 : $(e.args[0]);
			return t > e.shell.positional.length ? 1 : (e.shell.positional = e.shell.positional.slice(t), 0);
		}
	},
	{
		name: "true",
		ownHelp: !0,
		usage: "true",
		get summary() {
			return W("help.true.summary");
		},
		run: () => 0
	},
	{
		name: "false",
		ownHelp: !0,
		usage: "false",
		get summary() {
			return W("help.false.summary");
		},
		run: () => 1
	},
	{
		name: ":",
		ownHelp: !0,
		get usage() {
			return W("help.colon.usage");
		},
		get summary() {
			return W("help.colon.summary");
		},
		run: () => 0
	},
	{
		name: "test",
		ownHelp: !0,
		get usage() {
			return W("help.test.usage");
		},
		get summary() {
			return W("help.test.summary");
		},
		get help() {
			return W("help.test.text");
		},
		run: (e) => +!np(e.shell, e.args)
	},
	{
		name: "[",
		ownHelp: !0,
		get usage() {
			return W("help.bracket.usage");
		},
		get summary() {
			return W("help.bracket.summary");
		},
		run(e) {
			if (e.args.at(-1) !== "]") throw new X(W("test.missingBracket"), 2);
			return +!np(e.shell, e.args.slice(0, -1));
		}
	},
	{
		name: "let",
		ownHelp: !0,
		get usage() {
			return W("help.let.usage");
		},
		get summary() {
			return W("help.let.summary");
		},
		run(e) {
			if (!e.args.length) throw new X(W("let.noExpression"), 2);
			let t = 0n;
			for (let n of e.args) t = e.shell.arith(n);
			return +(t === 0n);
		}
	},
	{
		name: "exit",
		get usage() {
			return W("help.exit.usage");
		},
		get summary() {
			return W("help.exit.summary");
		},
		run(e) {
			throw new xd(ap(e, e.args[0], e.shell.status));
		}
	},
	{
		name: "return",
		get usage() {
			return W("help.return.usage");
		},
		get summary() {
			return W("help.return.summary");
		},
		run(e) {
			throw !e.shell.funcDepth && !e.shell.sourceDepth ? new X(W("return.onlyInFunction")) : new bd(ap(e, e.args[0], e.shell.status));
		}
	},
	{
		name: "break",
		usage: "break [n]",
		get summary() {
			return W("help.break.summary");
		},
		async run(e) {
			if (!e.shell.loopDepth) return await e.error(W("loop.onlyInLoop")), 0;
			let t = e.args[0] == null ? 1 : $(e.args[0]);
			throw t < 1 ? new X(W("loop.badCount", { n: t })) : new vd(Math.min(t, e.shell.loopDepth));
		}
	},
	{
		name: "continue",
		usage: "continue [n]",
		get summary() {
			return W("help.continue.summary");
		},
		async run(e) {
			if (!e.shell.loopDepth) return await e.error(W("loop.onlyInLoop")), 0;
			let t = e.args[0] == null ? 1 : $(e.args[0]);
			throw t < 1 ? new X(W("loop.badCount", { n: t })) : new yd(Math.min(t, e.shell.loopDepth));
		}
	},
	{
		name: "read",
		get usage() {
			return W("help.read.usage");
		},
		get summary() {
			return W("help.read.summary");
		},
		get help() {
			return W("help.read.text");
		},
		async run(e) {
			let t = e.shell, { opts: n, args: r } = Q(e, {
				flags: "rs",
				values: "pad"
			});
			n.p && await e.err(n.p);
			let i = n.d === void 0 ? "\n" : n.d[0] ?? "\0";
			e.stdin.silent = !!n.s;
			let a;
			try {
				if (a = await e.stdin.readLine(i), a != null && !n.r) for (; /(^|[^\\])(\\\\)*\\$/.test(a);) {
					let t = await e.stdin.readLine(i);
					if (a = a.slice(0, -1) + (t ?? ""), t == null) break;
				}
			} finally {
				e.stdin.silent = !1;
			}
			n.s && e.stdin === t.host.stdin && await e.err("\n");
			let o = a == null;
			a ??= "";
			let s = n.r ? a : a.replace(/\\(.)/g, "$1"), c = t.getVar("IFS") ?? " 	\n", l = [...c].filter((e) => /\s/.test(e)).join(""), u = (e) => e.replace(RegExp(`^[${up(l)}]+|[${up(l)}]+$`, "g"), ""), d = (e) => c ? u(e).split(RegExp(`[${up(l)}]*[${up(c)}][${up(l)}]*|[${up(l)}]+`)).filter((e, t, n) => e !== "" || t < n.length - 1) : [e];
			if (n.a) return t.setVar(n.a, s === "" ? [] : d(s)), +!!o;
			if (!r.length) return t.setVar("REPLY", a), o && !a ? 1 : +!!o;
			let f = c ? u(s) : s;
			return r.forEach((e, n) => {
				if (n === r.length - 1) {
					t.setVar(e, f);
					return;
				}
				let i = c ? RegExp(`^([^${up(c)}]*)(?:[${up(l)}]*[${up(c)}][${up(l)}]*|[${up(l)}]+|$)`).exec(f) : null;
				t.setVar(e, i ? i[1] : f), f = i ? f.slice(i[0].length) : "";
			}), +!!o;
		}
	},
	{
		name: "source",
		get usage() {
			return W("help.source.usage");
		},
		get summary() {
			return W("help.source.summary");
		},
		run: (e) => sp(e)
	},
	{
		name: ".",
		get usage() {
			return W("help.dot.usage");
		},
		get summary() {
			return W("help.dot.summary");
		},
		run: (e) => sp(e)
	},
	{
		name: "eval",
		ownHelp: !0,
		get usage() {
			return W("help.eval.usage");
		},
		get summary() {
			return W("help.eval.summary");
		},
		async run(e) {
			try {
				return await e.shell.run(e.args.join(" "), e.io);
			} catch (e) {
				throw e instanceof wd || e instanceof Y ? new X(e.message || W("parse.unexpectedEnd"), 2) : e;
			}
		}
	},
	{
		name: "alias",
		get usage() {
			return W("help.alias.usage");
		},
		get summary() {
			return W("help.alias.summary");
		},
		get help() {
			return W("help.alias.text");
		},
		async run(e) {
			let t = e.shell.aliases, { args: n } = Q(e, { flags: "p" });
			if (!n.length) {
				for (let [n, r] of [...t].sort()) await e.out(`alias ${n}=${Yf(r)}\n`);
				return 0;
			}
			let r = 0;
			for (let i of n) {
				let n = i.indexOf("=");
				if (n > 0) {
					let a = i.slice(0, n);
					if (/[\s/$`=|&;<>()'"\\]/.test(a)) {
						await e.error(W("alias.badName", { name: a })), r = 1;
						continue;
					}
					t.set(a, i.slice(n + 1));
				} else t.has(i) ? await e.out(`alias ${i}=${Yf(t.get(i))}\n`) : (await e.error(W("err.notFound", { name: i })), r = 1);
			}
			return r;
		}
	},
	{
		name: "unalias",
		get usage() {
			return W("help.unalias.usage");
		},
		get summary() {
			return W("help.unalias.summary");
		},
		async run(e) {
			let { opts: t, args: n } = Q(e, { flags: "a" });
			if (t.a) return e.shell.aliases.clear(), 0;
			let r = 0;
			for (let t of n) e.shell.aliases.delete(t) || (await e.error(W("err.notFound", { name: t })), r = 1);
			return r;
		}
	},
	{
		name: "type",
		get usage() {
			return W("help.type.usage");
		},
		get summary() {
			return W("help.type.summary");
		},
		async run(e) {
			let { opts: t, args: n } = Q(e, { flags: "ta" }), r = 0;
			for (let i of n) {
				let n = lp(e.shell, i);
				n ? t.t ? await e.out(n.kind + "\n") : await e.out(n.text + "\n") : (t.t || await e.error(W("err.notFound", { name: i })), r = 1);
			}
			return r;
		}
	},
	{
		name: "command",
		get usage() {
			return W("help.command.usage");
		},
		get summary() {
			return W("help.command.summary");
		},
		async run(e) {
			let { opts: t, args: n } = Q(e, {
				flags: "vVp",
				stopAtArg: !0
			});
			if (!n.length) return 0;
			if (t.v || t.V) {
				let r = 0;
				for (let i of n) {
					let n = lp(e.shell, i);
					n ? await e.out((t.V ? n.text : n.kind === "alias" ? `alias ${i}=${Yf(e.shell.aliases.get(i))}` : n.path ?? i) + "\n") : r = 1;
				}
				return r;
			}
			return e.shell.invoke(n, e.io, { functions: !1 });
		}
	},
	{
		name: "which",
		get usage() {
			return W("help.which.usage");
		},
		get summary() {
			return W("help.which.summary");
		},
		async run(e) {
			let t = 0;
			for (let n of e.args) {
				let r = lp(e.shell, n);
				!r || r.kind === "alias" || r.kind === "keyword" || r.kind === "function" ? t = 1 : await e.out((r.path ?? W("which.builtIn", { name: n })) + "\n");
			}
			return t;
		}
	},
	{
		name: "history",
		usage: "history [-c] [n]",
		get summary() {
			return W("help.history.summary");
		},
		async run(e) {
			let { opts: t, args: n } = Q(e, { flags: "c" }), r = e.shell.host.history;
			if (!r) return 0;
			if (t.c) return r.clear(), 0;
			let i = r.list(), a = n[0] == null ? i.length : $(n[0]), o = Math.max(0, i.length - a);
			for (let t = o; t < i.length; t++) await e.out(`${String(t + 1).padStart(5)}  ${i[t]}\n`);
		}
	},
	{
		name: "help",
		get usage() {
			return W("help.help.usage");
		},
		get summary() {
			return W("help.help.summary");
		},
		async run(e) {
			let t = e.shell.commands;
			if (e.args.length) {
				let n = 0;
				for (let r of e.args) {
					let i = t.get(r);
					i ? await e.out(Xf(i)) : pp(r) ? await e.out(dp[pp(r)]().trim() + "\n") : (await e.error(W("help.noHelp", { name: r })), n = 1);
				}
				return n;
			}
			let n = [...t.values()].filter((e, t, n) => n.indexOf(e) === t && !e.hidden).sort((e, t) => e.name.localeCompare(t.name)), r = Math.max(...n.map((e) => e.name.length)) + 2;
			await e.out(`${W("help.intro")}\n\n`);
			for (let t of n) await e.out(`  ${t.name.padEnd(r)}${t.summary ?? ""}${t.app ? ` (${t.app})` : ""}\n`);
			await e.out(`\n${W("help.syntaxList", { list: Object.keys(dp).map(fp).join(", ") })}\n`);
		}
	},
	{
		name: "clear",
		usage: "clear",
		get summary() {
			return W("help.clear.summary");
		},
		async run(e) {
			e.stdout === e.shell.host.stdout ? e.shell.host.clear?.() : await e.out("\x1B[2J\x1B[H");
		}
	},
	{
		name: "jobs",
		usage: "jobs [-lp]",
		get summary() {
			return W("help.jobs.summary");
		},
		async run(e) {
			let { opts: t } = Q(e, { flags: "lp" }), n = e.shell.jobs.list;
			for (let r of n) {
				let i = r === n.at(-1) ? "+" : r === n.at(-2) ? "-" : " ";
				t.p ? await e.out(`${r.pid}\n`) : await e.out(`[${r.id}]${i} ${t.l ? `${r.pid} ` : ""}${r.state === "done" ? r.code === 0 ? W("jobs.done") : W("jobs.exit", { code: r.code }) : W("jobs.running")}\t\t${r.text}\n`);
			}
		}
	},
	{
		name: "wait",
		usage: "wait [%job | pid…]",
		get summary() {
			return W("help.wait.summary");
		},
		async run(e) {
			let t = e.shell;
			if (!e.args.length) {
				let e = 0;
				for (let n of [...t.jobs.list]) e = await t.waitJob(n);
				return e;
			}
			let n = 0;
			for (let r of e.args) {
				let i = t.findJob(r);
				i ? n = await t.waitJob(i) : (await e.error(W("wait.notAJob", { spec: r })), n = 127);
			}
			return n;
		}
	},
	{
		name: "fg",
		usage: "fg [%job]",
		get summary() {
			return W("help.fg.summary");
		},
		async run(e) {
			let t = e.shell, n = t.findJob(e.args[0]);
			if (!n) throw new X(W("fg.noSuchJob", { job: e.args[0] ?? W("fg.current") }));
			await e.out(n.text + "\n");
			let r = await t.waitJob(n, { forward: !0 });
			return t.jobs.list = t.jobs.list.filter((e) => e !== n), r;
		}
	},
	{
		name: "kill",
		get usage() {
			return W("help.kill.usage");
		},
		get summary() {
			return W("help.kill.summary");
		},
		async run(e) {
			let t = e.args;
			if (t[0] === "-l") return await e.out("HUP INT QUIT KILL TERM\n"), 0;
			if (t[0] === "-s" || t[0] === "-n" ? t = t.slice(2) : /^-\w+$/.test(t[0] ?? "") && (t = t.slice(1)), !t.length) throw new X(W("help.usageShort", { usage: this.usage }), 2);
			let n = 0;
			for (let r of t) {
				let t = e.shell.findJob(r);
				t ? t.token.abort() : (await e.error(W("kill.noSuchJob", { spec: r })), n = 1);
			}
			return n;
		}
	},
	{
		name: "sleep",
		get usage() {
			return W("help.sleep.usage");
		},
		get summary() {
			return W("help.sleep.summary");
		},
		async run(e) {
			if (!e.args.length) throw new X(W("sleep.missing"), 2);
			let t = 0;
			for (let n of e.args) {
				let e = /^(\d+(?:\.\d*)?|\.\d+)([smhd]?)$/.exec(n);
				if (!e) throw new X(W("sleep.badDuration", { value: n }), 2);
				t += Number(e[1]) * {
					"": 1,
					s: 1,
					m: 60,
					h: 3600,
					d: 86400
				}[e[2]] * 1e3;
			}
			await e.shell.sleep(t);
		}
	},
	{
		name: "bash",
		get usage() {
			return W("help.bash.usage");
		},
		get summary() {
			return W("help.bash.summary");
		},
		get help() {
			return W("help.bash.text");
		},
		run: (e) => cp(e)
	},
	{
		name: "sh",
		get usage() {
			return W("help.sh.usage");
		},
		get summary() {
			return W("help.sh.summary");
		},
		run: (e) => cp(e)
	}
];
async function sp(e) {
	let t = e.shell, [n, ...r] = e.args;
	if (!n) throw new X(W("source.noFile"), 2);
	let i = n;
	if (!n.includes("/") && !e.resolve(n)) {
		let r = (t.getVar("PATH") ?? "").split(":").find((t) => t && e.resolve(`${t}/${n}`)?.type === "file");
		r && (i = `${r}/${n}`);
	}
	let a = await t.readScript(i);
	try {
		Rd(a, { aliases: t.aliases });
	} catch (e) {
		throw e instanceof wd || e instanceof Y ? new X(`${n}: ${e.message || W("parse.unexpectedEndOfFile")}`, 2) : e;
	}
	let o = t.positional;
	r.length && (t.positional = r), t.sourceDepth = (t.sourceDepth ?? 0) + 1;
	try {
		return await t.exec({
			type: "script",
			source: a
		}, e.io);
	} catch (e) {
		if (e instanceof bd) return e.code;
		throw e;
	} finally {
		t.sourceDepth--, r.length && (t.positional = o);
	}
}
async function cp(e) {
	let t = e.shell, n = [...e.args], r = {
		e: !1,
		x: !1,
		u: !1
	}, i = null;
	for (; n.length && /^-[cexu]+$/.test(n[0]);) for (let e of n.shift().slice(1)) e === "c" ? i = n.shift() : r[e] = !0;
	if (i == null && n[0] === "-c") throw new X(W("bash.noCommand"), 2);
	let a = t.subshell({ script: !0 });
	if (Object.assign(a.options, {
		errexit: r.e,
		xtrace: r.x,
		nounset: r.u
	}), i != null) return a.setVar("0", n[0] ?? "bash"), a.positional = n.slice(1), a.runSource(i, e.io, "bash");
	if (n.length) {
		a.setVar("0", n[0]), a.positional = n.slice(1);
		let r;
		try {
			r = await t.readScript(n[0]);
		} catch (e) {
			throw e instanceof X ? new X(e.message, e.code) : e;
		}
		return a.runSource(r, e.io, n[0]);
	}
	return e.stdin === t.host.stdin ? (await e.err(`${W("bash.already")}\n`), 0) : a.runSource(await e.stdin.readAll(), e.io, "bash");
}
function lp(e, t) {
	if (e.aliases.has(t)) return {
		kind: "alias",
		text: W("type.alias", {
			name: t,
			value: e.aliases.get(t)
		})
	};
	if (Zf.includes(t)) return {
		kind: "keyword",
		text: W("type.keyword", { name: t })
	};
	if (e.functions.has(t)) return {
		kind: "function",
		text: `${W("type.function", { name: t })}\n${e.functions.get(t).text}`
	};
	let n = e.commands.get(t);
	if (n?.builtin) return {
		kind: "builtin",
		text: W("type.builtin", { name: t })
	};
	if (n?.app) return {
		kind: "file",
		text: W("type.appCommand", {
			name: t,
			app: n.app
		})
	};
	if (n) return {
		kind: "file",
		text: W("type.command", { name: t })
	};
	for (let n of (e.getVar("PATH") ?? "").split(":").filter(Boolean)) for (let r of [t, `${t}.sh`]) {
		let a = e.resolve(`${n}/${r}`);
		if (a?.type === "file") return {
			kind: "file",
			text: W("type.file", {
				name: t,
				path: i.path(a.id)
			}),
			path: i.path(a.id)
		};
	}
	return t.includes("/") && e.resolve(t)?.type === "file" ? {
		kind: "file",
		text: W("type.file", {
			name: t,
			path: t
		}),
		path: t
	} : null;
}
var up = (e) => e.replace(/[\]\\^-]/g, "\\$&"), dp = {
	if: () => W("syntax.if"),
	for: () => W("syntax.for"),
	while: () => W("syntax.while"),
	until: () => W("syntax.until"),
	case: () => W("syntax.case"),
	function: () => W("syntax.function"),
	"[[": () => W("syntax.cond"),
	"((": () => W("syntax.arith"),
	variables: () => W("syntax.variables"),
	redirections: () => W("syntax.redirections")
}, fp = (e) => ({
	variables: W("syntax.topic.variables"),
	redirections: W("syntax.topic.redirections")
})[e] ?? e, pp = (e) => Object.keys(dp).find((t) => t === e || fp(t) === e), mp = {
	reset: "\x1B[0m",
	folder: "\x1B[1;34m",
	app: "\x1B[36m",
	script: "\x1B[32m",
	dim: "\x1B[2m"
}, hp = (e) => e.type === "file" && /\.(sh|bash)$/i.test(e.name), gp = (e) => W("files.cannotAccess", { path: e }), _p = (e) => e.stdout === e.shell.host.stdout;
function vp(e) {
	if (e < 1024) return String(e);
	let t = [
		"K",
		"M",
		"G",
		"T"
	], n = e, r = -1;
	do
		n /= 1024, r++;
	while (n >= 1024 && r < t.length - 1);
	return (n < 10 ? U.number(Number(n.toFixed(1)), { minimumFractionDigits: 1 }) : String(Math.round(n))) + t[r];
}
function yp(e) {
	let t = new Date(e), n = /* @__PURE__ */ new Date(), r = W("ls.date", {
		day: String(t.getDate()).padStart(2),
		month: U.date(t, { month: "short" })
	});
	return Math.abs(n - t) < 15552e6 ? `${r} ${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}` : `${r}  ${t.getFullYear()}`;
}
var bp = (e) => e.type === "file" ? e.size ?? 0 : e.type === "folder" ? i.children(e.id).length : 0;
function xp(e, t, n = t.name, r = !1) {
	let i = r ? t.type === "folder" ? "/" : t.type === "app" ? "@" : hp(t) ? "*" : "" : "";
	if (!_p(e)) return n + i;
	let a = t.type === "folder" ? mp.folder : t.type === "app" ? mp.app : hp(t) ? mp.script : "";
	return a ? `${a}${n}${mp.reset}${i}` : n + i;
}
function Sp(e, t) {
	if (!e.length) return "";
	let n = (e) => e.plain.length;
	for (let r = Math.min(e.length, Math.max(1, Math.floor(t / 3))); r >= 1; r--) {
		let i = Math.ceil(e.length / r), a = [];
		for (let t = 0; t < r; t++) a.push(Math.max(0, ...e.slice(t * i, (t + 1) * i).map(n)));
		if (a.reduce((e, t) => e + t, 0) + 2 * (r - 1) > t && r > 1) continue;
		let o = "";
		for (let t = 0; t < i; t++) {
			let s = "";
			for (let o = 0; o < r; o++) {
				let c = e[o * i + t];
				if (!c) continue;
				let l = o === r - 1 || !e[(o + 1) * i + t];
				s += c.text + (l ? "" : " ".repeat(a[o] - n(c) + 2));
			}
			o += s + "\n";
		}
		return o;
	}
	return e.map((e) => e.text).join("\n") + "\n";
}
function Cp(e, t) {
	let n = [...e].sort((e, n) => (t.t ? n.modified - e.modified : t.S ? bp(n) - bp(e) : 0) || Au(e.name, n.name));
	return t.r ? n.reverse() : n;
}
async function wp(e, t, n) {
	if (!t.length) return;
	if (!n.l) {
		if (n[1] || !_p(e)) for (let { node: r, name: i } of t) await e.out(xp(e, r, i, n.F) + "\n");
		else {
			let r = t.map(({ node: t, name: r }) => ({
				text: xp(e, t, r, n.F),
				plain: r + (n.F && (t.type !== "file" || hp(t)) ? " " : "")
			}));
			await e.out(Sp(r, e.shell.host.columns?.() ?? 80));
		}
		return;
	}
	let r = t.map(({ node: t, name: r }) => {
		let a = t.type === "folder" ? "d" : t.type === "app" ? "l" : "-", o = t.type === "file" ? n.h ? vp(t.size ?? 0) : String(t.size ?? 0) : t.type === "folder" ? String(i.children(t.id).length) : "-", s = (t.tags ?? []).map((e) => u.get(e)?.name).filter(Boolean), c = xp(e, t, r, n.F);
		return t.type === "app" && (c += ` -> app:${t.app}`), s.length && (c += (_p(e) ? mp.dim : "") + " " + s.map((e) => "#" + e).join(" ") + (_p(e) ? mp.reset : "")), {
			type: a,
			size: o,
			date: yp(t.modified ?? t.created ?? 0),
			shown: c
		};
	}), a = Math.max(...r.map((e) => e.size.length));
	for (let t of r) await e.out(`${t.type}  ${t.size.padStart(a)}  ${t.date}  ${t.shown}\n`);
}
var Tp = (e, t) => i.children(e).filter((e) => t.a || t.A || !e.name.startsWith("."));
async function Ep(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "laA1htrSdRF",
		long: {
			all: "a",
			"almost-all": "A",
			"human-readable": "h",
			reverse: "r",
			recursive: "R",
			directory: "d",
			classify: "F"
		}
	}), r = n.length ? n : ["."], a = 0, o = [], s = [];
	for (let n of r) {
		let r = e.resolve(n);
		r ? r.type === "folder" && !t.d ? s.push({
			node: r,
			name: n
		}) : o.push({
			node: r,
			name: n
		}) : (await e.error(gp(n)), a = 2);
	}
	await wp(e, Cp(o.map((e) => ({
		...e.node,
		shownName: e.name
	})), t).map((e) => ({
		node: e,
		name: e.shownName
	})), t);
	let c = r.length > 1 || t.R, l = !o.length, u = async (n, r) => {
		await e.tick(), c && await e.out(`${l ? "" : "\n"}${r}:\n`), l = !1;
		let a = Cp(Tp(n.id, t), t), o = a.map((e) => ({
			node: e,
			name: e.name
		}));
		if (t.a && o.unshift({
			node: n,
			name: "."
		}, ...n.id === i.root ? [] : [{
			node: i.get(n.parent),
			name: ".."
		}]), await wp(e, o, t), t.R) for (let e of a.filter((e) => e.type === "folder")) await u(e, `${r.replace(/\/$/, "")}/${e.name}`);
	};
	for (let { node: e, name: t } of s) await u(e, t);
	return a;
}
async function Dp(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "nbsEA",
		long: {
			number: "n",
			"number-nonblank": "b",
			"squeeze-blank": "s",
			"show-ends": "E"
		}
	}), r = 0;
	for await (let { text: i } of e.inputs(n)) {
		if (!t.n && !t.b && !t.s && !t.E) {
			await e.out(i);
			continue;
		}
		let n = i.split("\n"), a = i.endsWith("\n");
		a && n.pop();
		let o = "", s = !1;
		for (let e of n) {
			if (t.s && e === "" && s) continue;
			s = e === "";
			let n = t.b ? e !== "" : t.n;
			o += (n ? `${String(++r).padStart(6)}\t` : "") + e + (t.E ? "$" : "") + "\n";
		}
		!a && o.endsWith("\n") && (o = o.slice(0, -1)), await e.out(o);
	}
	return +!!e.failed;
}
function Op(e, t) {
	let n = i.get(i.root);
	for (let r of wu(e.cwd, t)) {
		let e = i.children(n.id).find((e) => e.name.toLowerCase() === r.toLowerCase()) ?? i.resolve(`${i.path(n.id)}/${r}`);
		if (e && e.type !== "folder") throw new X(W("mkdir.notAFolder", {
			path: t,
			name: r
		}));
		n = e ?? i.create(n.id, {
			type: "folder",
			name: r
		});
	}
	return n;
}
async function kp(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "pv",
		long: {
			parents: "p",
			verbose: "v"
		}
	});
	if (!n.length) throw new X(W("err.missingOperand"), 2);
	let r = 0;
	for (let a of n) try {
		let n = e.resolve(a);
		if (n) {
			if (t.p && n.type === "folder") continue;
			throw new X(W("mkdir.exists", { path: a }));
		}
		if (t.p) Op(e, a);
		else {
			let { parent: t, name: n } = e.locate(a);
			if (t?.type !== "folder" || !n) throw new X(W("mkdir.noParent", { path: a }));
			i.create(t.id, {
				type: "folder",
				name: n
			});
		}
		t.v && await e.out(`${W("mkdir.created", { path: a })}\n`);
	} catch (t) {
		await e.error(t.message), r = 1;
	}
	return r;
}
async function Ap(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "cam",
		long: { "no-create": "c" }
	});
	if (!n.length) throw new X(W("err.missingOperand"), 2);
	let r = 0;
	for (let a of n) {
		let n = e.resolve(a);
		if (n) {
			n.type === "file" && await (i.copyContent ? i.copyContent(n.id, n.id) : i.write(n.id, await i.readBlob(n.id)));
			continue;
		}
		if (t.c) continue;
		let { parent: o, name: s } = e.locate(a);
		o?.type !== "folder" || !s ? (await e.error(W("files.cannotCreate", { path: a })), r = 1) : i.create(o.id, {
			type: "file",
			name: s
		});
	}
	return r;
}
async function jp(e, t, n, r, a) {
	await e.tick();
	let o = i.children(n).find((e) => e.name.toLowerCase() === r.toLowerCase());
	if (t.type === "folder") {
		let s = o;
		if (s && s.type !== "folder") throw new X(W("cp.overwriteFile", { name: r }));
		s ??= i.create(n, {
			type: "folder",
			name: r,
			color: t.color
		});
		for (let n of i.children(t.id)) await jp(e, n, s.id, n.name, a);
		return;
	}
	if (o) {
		if (a.n) return;
		if (o.type === "folder") throw new X(W("files.overwriteFolder", { name: r }));
		if (o.type === "file" && t.type === "file") {
			await (i.copyContent ? i.copyContent(t.id, o.id) : i.write(o.id, await i.readBlob(t.id))), a.v && await e.out(`${W("cp.verbose", {
				from: i.path(t.id),
				to: i.path(o.id)
			})}\n`);
			return;
		}
		i.trash([o.id]);
	}
	if (t.type === "file" && i.copy) {
		let o = await i.copy(t.id, n, { name: r });
		a.v && await e.out(`${W("cp.verbose", {
			from: i.path(t.id),
			to: i.path(o.id)
		})}
`);
		return;
	}
	let s = i.create(n, {
		type: t.type,
		name: r,
		app: t.app
	});
	t.type === "file" && await i.write(s.id, await i.readBlob(t.id)), a.v && await e.out(`${W("cp.verbose", {
		from: i.path(t.id),
		to: i.path(s.id)
	})}\n`);
}
function Mp(e, t) {
	if (t.length < 2) throw new X(t.length ? W("files.missingDestination", { path: t[0] }) : W("err.missingOperand"), 2);
	let n = t.at(-1), r = t.slice(0, -1), a = e.resolve(n);
	if (r.length > 1 && a?.type !== "folder") throw new X(W("files.targetNotFolder", { path: n }));
	return {
		sources: r,
		target: (t) => {
			if (a?.type === "folder" && a.id !== t.id) return {
				parent: a,
				name: t.name
			};
			if (a) return {
				parent: i.get(a.parent),
				name: a.id === t.id ? wu(e.cwd, n).at(-1) : a.name,
				existing: a
			};
			let { parent: r, name: o } = e.locate(n);
			if (r?.type !== "folder" || !o) throw new X(W("files.cannotCreate", { path: n }));
			return {
				parent: r,
				name: o
			};
		}
	};
}
async function Np(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "rRanvfp",
		long: {
			recursive: "r",
			"no-clobber": "n",
			verbose: "v",
			force: "f",
			archive: "a"
		}
	}), { sources: r, target: a } = Mp(e, n), o = 0;
	for (let n of r) try {
		let r = e.resolve(n);
		if (!r) throw new X(W("files.cannotStat", { path: n }));
		if (r.type === "folder" && !(t.r || t.R || t.a)) throw new X(W("cp.omitting", { path: n }));
		let { parent: o, name: s } = a(r);
		if (r.type === "folder" && i.isInside(o.id, r.id)) throw new X(W("cp.intoItself", { path: n }));
		await jp(e, r, o.id, s, t);
	} catch (t) {
		if (!(t instanceof X) && !(t instanceof Error)) throw t;
		await e.error(t.message), o = 1;
	}
	return o;
}
async function Pp(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "nvfi",
		long: {
			"no-clobber": "n",
			verbose: "v",
			force: "f"
		}
	}), { sources: r, target: a } = Mp(e, n), o = 0;
	for (let n of r) try {
		let r = e.resolve(n);
		if (!r) throw new X(W("files.cannotStat", { path: n }));
		if (r.system) throw new X(W("mv.system", { path: n }));
		let { parent: o, name: s } = a(r);
		if (r.type === "folder" && i.isInside(o.id, r.id)) throw new X(W("mv.intoItself", { path: n }));
		let c = i.children(o.id).find((e) => e.id !== r.id && e.name.toLowerCase() === s.toLowerCase());
		if (c) {
			if (t.n) continue;
			if (c.type === "folder" && r.type !== "folder") throw new X(W("files.overwriteFolder", { name: s }));
			if (c.type === "folder" && i.children(c.id).length) throw new X(W("mv.notEmpty", {
				path: n,
				name: s
			}));
			i.trash([c.id]);
		}
		r.parent !== o.id && i.move(r.id, o.id), i.get(r.id).name !== s && i.rename(r.id, s), t.v && await e.out(`${W("mv.verbose", {
			from: n,
			to: i.path(r.id)
		})}\n`);
	} catch (t) {
		await e.error(t.message), o = 1;
	}
	return o;
}
async function Fp(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "rRfvdi",
		long: {
			recursive: "r",
			force: "f",
			verbose: "v",
			dir: "d",
			purge: "P"
		}
	});
	if (!n.length && !t.f) throw new X(W("err.missingOperand"), 2);
	let r = 0;
	for (let a of n) {
		let n = e.resolve(a);
		if (!n) t.f || (await e.error(W("files.cannotRemove", {
			path: a,
			reason: W("reason.noSuchFile")
		})), r = 1);
		else try {
			if (n.id === i.root) throw new X(W("rm.home", { path: a }));
			if (n.type === "folder" && !(t.r || t.R)) {
				if (!t.d) throw new X(W("files.cannotRemove", {
					path: a,
					reason: W("reason.isADirectory")
				}));
				if (i.children(n.id).length) throw new X(W("files.cannotRemove", {
					path: a,
					reason: W("reason.notEmpty")
				}));
			}
			if (n.system) throw new X(W("files.cannotRemove", {
				path: a,
				reason: W("reason.system")
			}));
			if (t.P) i.remove(n.id);
			else if (!i.trash([n.id]).length) throw new X(W("files.cannotRemove", {
				path: a,
				reason: W("reason.containsSystem")
			}));
			t.v && await e.out(`${t.P ? W("rm.purged", { path: a }) : W("rm.trashed", { path: a })}\n`);
		} catch (t) {
			await e.error(t.message), r = 1;
		}
	}
	return r;
}
async function Ip(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "pv",
		long: {
			parents: "p",
			verbose: "v"
		}
	});
	if (!n.length) throw new X(W("err.missingOperand"), 2);
	let r = 0;
	for (let a of n) {
		let n = t.p ? wu(e.cwd, a).map((e, t, n) => "~/" + n.slice(0, n.length - t).join("/")) : [a];
		for (let a of n) {
			let n = e.resolve(a), o = async (t) => {
				await e.error(W("files.cannotRemove", {
					path: a,
					reason: t
				})), r = 1;
			};
			if (!n) {
				await o(W("reason.noSuchFile"));
				break;
			}
			if (n.type !== "folder") {
				await o(W("reason.notADirectory"));
				break;
			}
			if (i.children(n.id).length) {
				await o(W("reason.notEmpty"));
				break;
			}
			if (n.system || n.id === i.root) {
				await o(W("reason.system"));
				break;
			}
			i.trash([n.id]), t.v && await e.out(`${W("rmdir.removed", { path: a })}\n`);
		}
	}
	return r;
}
var Lp = (e) => U.date(e, {
	dateStyle: "medium",
	timeStyle: "medium"
}), Rp = (e) => e.type === "folder" ? W("stat.folder") : e.type === "app" ? W("stat.appLink", { app: e.app }) : e.size ? W("stat.file") : W("stat.emptyFile");
async function zp(e) {
	let { opts: t, args: n } = Q(e, {
		values: "c",
		long: { format: "c" }
	});
	if (!n.length) throw new X(W("err.missingOperand"), 2);
	let r = 0;
	for (let a of n) {
		let n = e.resolve(a);
		if (!n) {
			await e.error(gp(a)), r = 1;
			continue;
		}
		if (t.c != null) {
			let r = {
				n: a,
				N: `'${a}'`,
				s: String(n.size ?? 0),
				F: Rp(n),
				Y: String(Math.floor(n.modified / 1e3)),
				y: new Date(n.modified).toISOString(),
				W: String(Math.floor(n.created / 1e3)),
				w: new Date(n.created).toISOString(),
				i: n.id,
				"%": "%"
			};
			await e.out(t.c.replace(/%(.)/g, (e, t) => r[t] ?? e) + "\n");
			continue;
		}
		let o = (n.tags ?? []).map((e) => u.get(e)?.name).filter(Boolean);
		await e.out([
			`  File: ${a}`,
			`  ${W("stat.type", { type: Rp(n) })}`,
			`  ${W("stat.path", { path: i.path(n.id) })}`,
			n.type === "folder" ? `  ${W("stat.items", {
				n: i.children(n.id).length,
				total: i.count(n.id)
			})}` : n.type === "file" ? `  ${W("stat.size", {
				size: n.size ?? 0,
				human: vp(n.size ?? 0)
			})}` : null,
			`  ${W("stat.created", { date: Lp(n.created) })}`,
			`  ${W("stat.modified", { date: Lp(n.modified) })}`,
			o.length ? `  ${W("stat.tags", { tags: o.join(", ") })}` : null,
			n.system ? `  ${W("stat.system")}` : null,
			`  Id: ${n.id}`
		].filter(Boolean).join("\n") + "\n");
	}
	return r;
}
function Bp(e, t) {
	let n = 0, r = {
		maxdepth: Infinity,
		mindepth: 0
	}, a = [], o = () => {
		let e = s();
		for (; t[n] === "-o" || t[n] === "-or";) {
			n++;
			let t = s(), r = e;
			e = (e) => r(e) || t(e);
		}
		return e;
	}, s = () => {
		let e = c();
		for (;;) {
			if (t[n] === "-a" || t[n] === "-and") n++;
			else if (n >= t.length || t[n] === "-o" || t[n] === "-or" || t[n] === ")") return e;
			let r = c(), i = e;
			e = (e) => i(e) && r(e);
		}
	}, c = () => {
		if (t[n] === "!" || t[n] === "-not") {
			n++;
			let e = c();
			return (t) => !e(t);
		}
		return u();
	}, l = (e) => {
		if (n >= t.length) throw new X(W("find.missingArgument", { name: e }));
		return t[n++];
	}, u = () => {
		let s = t[n++];
		switch (s) {
			case "(": {
				let e = o();
				if (t[n++] !== ")") throw new X(W("err.missingParen"));
				return e;
			}
			case "-name": {
				let e = l(s);
				return (t) => Su(e, t.node.name);
			}
			case "-iname": {
				let e = l(s);
				return (t) => Su(e, t.node.name, { ignoreCase: !0 });
			}
			case "-path":
			case "-wholename": {
				let e = l(s);
				return (t) => Su(e, t.path);
			}
			case "-ipath": {
				let e = l(s);
				return (t) => Su(e, t.path, { ignoreCase: !0 });
			}
			case "-type": {
				let e = l(s), t = {
					f: "file",
					d: "folder",
					l: "app"
				}[e];
				if (!t) throw new X(W("find.badType", { type: e }));
				return (e) => e.node.type === t;
			}
			case "-empty": return (e) => e.node.type === "folder" ? !i.children(e.node.id).length : e.node.type === "file" && !e.node.size;
			case "-size": {
				let e = l(s), t = /^([+-]?)(\d+)([ckMG]?)$/.exec(e);
				if (!t) throw new X(W("find.badSize", { value: e }));
				let n = {
					c: 1,
					k: 1024,
					M: 1024 ** 2,
					G: 1024 ** 3,
					"": 512
				}[t[3]], r = Number(t[2]);
				return (e) => {
					if (e.node.type !== "file") return !1;
					let i = Math.ceil((e.node.size ?? 0) / n);
					return t[1] === "+" ? i > r : t[1] === "-" ? i < r : i === r;
				};
			}
			case "-mtime":
			case "-mmin": {
				let e = l(s), t = /^([+-]?)(\d+)$/.exec(e);
				if (!t) throw new X(W("find.badValue", {
					option: s,
					value: e
				}));
				let n = s === "-mtime" ? 864e5 : 6e4;
				return (e) => {
					let r = Math.floor((Date.now() - e.node.modified) / n);
					return t[1] === "+" ? r > +t[2] : t[1] === "-" ? r < +t[2] : r === +t[2];
				};
			}
			case "-newer": {
				let r = e.resolve(l(s));
				if (!r) throw new X(W("find.cannotFind", { path: t[n - 1] }));
				return (e) => e.node.modified > r.modified;
			}
			case "-maxdepth": return r.maxdepth = $(l(s)), () => !0;
			case "-mindepth": return r.mindepth = $(l(s)), () => !0;
			case "-true": return () => !0;
			case "-false": return () => !1;
			case "-print": return r.printed = !0, (e) => (e.out.push(e.path), !0);
			case "-print0": return r.printed = !0, (e) => (e.out.push(e.path + "\0"), !0);
			case "-delete": return r.printed = !0, (e) => (e.deletes.push(e.node.id), !0);
			case "-exec":
			case "-ok": {
				let e = [];
				for (; n < t.length && t[n] !== ";" && t[n] !== "+";) e.push(t[n++]);
				let i = t[n] === "+";
				if (n >= t.length) throw new X(W("find.execEnd"));
				if (n++, !e.length) throw new X(W("find.execCommand"));
				r.printed = !0;
				let o = {
					cmd: e,
					plus: i,
					batch: []
				};
				return a.push(o), (t) => i ? (o.batch.push(t.path), !0) : (t.runs.push(e.map((e) => e.replaceAll("{}", t.path))), !0);
			}
		}
		throw new X(W("find.unknownPredicate", { name: s }));
	}, d = t.length ? o() : () => !0;
	if (n < t.length) throw new X(W("find.unexpected", { arg: t[n] }));
	return {
		expr: d,
		global: r,
		execs: a
	};
}
async function Vp(e) {
	let t = e.args, n = 0;
	for (; n < t.length && !/^[-(!]/.test(t[n]);) n++;
	let r = n ? t.slice(0, n) : ["."], { expr: a, global: o, execs: s } = Bp(e, t.slice(n)), c = 0, l = [], u = async (t) => {
		let n = await e.shell.invoke(t, e.io);
		return n !== 0 && (c = 1), n === 0;
	};
	for (let t of r) {
		let n = e.resolve(t);
		if (!n) {
			await e.error(W("files.quotedNoSuchFile", { path: t })), c = 1;
			continue;
		}
		let r = async (t, n, s) => {
			if (await e.tick(), s >= o.mindepth) {
				let r = {
					node: t,
					path: n,
					out: [],
					deletes: l,
					runs: []
				};
				a(r) && !o.printed && r.out.push(n);
				for (let t of r.out) await e.out(t.endsWith("\0") ? t : t + "\n");
				for (let e of r.runs) await u(e);
			}
			if (t.type === "folder" && s < o.maxdepth) for (let e of [...i.children(t.id)].sort((e, t) => Au(e.name, t.name))) await r(e, n.endsWith("/") ? n + e.name : `${n}/${e.name}`, s + 1);
		};
		await r(n, t, 0);
	}
	for (let e of s.filter((e) => e.plus && e.batch.length)) {
		let t = e.cmd.indexOf("{}");
		await u(t < 0 ? [...e.cmd, ...e.batch] : [
			...e.cmd.slice(0, t),
			...e.batch,
			...e.cmd.slice(t + 1)
		]);
	}
	return l.length && i.trash([...l].reverse().filter((e) => i.exists(e))), c;
}
async function Hp(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "adf",
		values: "L"
	}), r = t.L == null ? Infinity : $(t.L), i = 0, a = 0, o = 0;
	for (let s of n.length ? n : ["."]) {
		let n = e.resolve(s);
		if (!n) {
			await e.error(W("files.quotedNoSuchFile", { path: s })), o = 1;
			continue;
		}
		await e.out(xp(e, n, s) + "\n");
		let c = async (n, o, s) => {
			if (s > r) return;
			let l = Cp(Tp(n.id, t).filter((e) => !t.d || e.type === "folder"), {});
			for (let n = 0; n < l.length; n++) {
				await e.tick();
				let r = l[n], u = n === l.length - 1, d = t.f ? `${o.replace(/[│├└─ ]/g, "")}${r.name}` : r.name;
				await e.out(`${o}${u ? "└── " : "├── "}${xp(e, r, d)}${r.type === "app" ? ` -> app:${r.app}` : ""}\n`), r.type === "folder" ? (i++, await c(r, o + (u ? "    " : "│   "), s + 1)) : a++;
			}
		};
		await c(n, "", 1);
	}
	return await e.out(`\n${W("tree.folders", { n: i })}${t.d ? "" : `, ${W("tree.files", { n: a })}`}\n`), o;
}
async function Up(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "az",
		values: "s",
		long: {
			multiple: "a",
			suffix: "s"
		}
	});
	if (!n.length) throw new X(W("err.missingOperand"), 2);
	let r = t.a || t.s != null ? n : [n[0]], i = t.s ?? (t.a ? null : n[1]);
	for (let n of r) {
		let r = n.replace(/\/+$/, "").split("/").pop() || (n.startsWith("/") ? "/" : "");
		i && r.endsWith(i) && r !== i && (r = r.slice(0, -i.length)), await e.out(r + (t.z ? "\0" : "\n"));
	}
}
async function Wp(e) {
	if (!e.args.length) throw new X(W("err.missingOperand"), 2);
	for (let t of e.args) {
		let n = t.replace(/\/+$/, ""), r = n.lastIndexOf("/");
		await e.out((r < 0 ? "." : r === 0 ? "/" : n.slice(0, r).replace(/\/+$/, "") || "/") + "\n");
	}
}
async function Gp(e) {
	let { opts: t, args: n } = Q(e, { flags: "emq" }), r = 0;
	for (let a of n.length ? n : ["."]) {
		let n = e.resolve(a);
		n ? await e.out(i.path(n.id) + "\n") : t.m ? await e.out([i.home, ...wu(e.cwd, a)].join("/") + "\n") : (t.q || await e.error(W("err.noSuchFile", { path: a })), r = 1);
	}
	return r;
}
var Kp = [
	{
		name: "ls",
		get usage() {
			return W("help.ls.usage");
		},
		get summary() {
			return W("help.ls.summary");
		},
		run: Ep,
		get help() {
			return W("help.ls.text");
		}
	},
	{
		name: "cat",
		usage: "cat [-nbsE] [file…]",
		get summary() {
			return W("help.cat.summary");
		},
		run: Dp,
		get help() {
			return W("help.cat.text");
		}
	},
	{
		name: "mkdir",
		get usage() {
			return W("help.mkdir.usage");
		},
		get summary() {
			return W("help.mkdir.summary");
		},
		run: kp,
		get help() {
			return W("help.mkdir.text");
		}
	},
	{
		name: "touch",
		usage: "touch [-c] file…",
		get summary() {
			return W("help.touch.summary");
		},
		run: Ap
	},
	{
		name: "cp",
		get usage() {
			return W("help.cp.usage");
		},
		get summary() {
			return W("help.cp.summary");
		},
		run: Np,
		get help() {
			return W("help.cp.text");
		}
	},
	{
		name: "mv",
		get usage() {
			return W("help.mv.usage");
		},
		get summary() {
			return W("help.mv.summary");
		},
		run: Pp,
		get help() {
			return W("help.mv.text");
		}
	},
	{
		name: "rm",
		get usage() {
			return W("help.rm.usage");
		},
		get summary() {
			return W("help.rm.summary");
		},
		run: Fp,
		get help() {
			return W("help.rm.text");
		}
	},
	{
		name: "rmdir",
		get usage() {
			return W("help.rmdir.usage");
		},
		get summary() {
			return W("help.rmdir.summary");
		},
		run: Ip
	},
	{
		name: "stat",
		get usage() {
			return W("help.stat.usage");
		},
		get summary() {
			return W("help.stat.summary");
		},
		run: zp,
		get help() {
			return W("help.stat.text");
		}
	},
	{
		name: "find",
		get usage() {
			return W("help.find.usage");
		},
		get summary() {
			return W("help.find.summary");
		},
		run: Vp,
		get help() {
			return W("help.find.text");
		}
	},
	{
		name: "tree",
		get usage() {
			return W("help.tree.usage");
		},
		get summary() {
			return W("help.tree.summary");
		},
		run: Hp
	},
	{
		name: "basename",
		get usage() {
			return W("help.basename.usage");
		},
		get summary() {
			return W("help.basename.summary");
		},
		run: Up
	},
	{
		name: "dirname",
		get usage() {
			return W("help.dirname.usage");
		},
		get summary() {
			return W("help.dirname.summary");
		},
		run: Wp
	},
	{
		name: "realpath",
		get usage() {
			return W("help.realpath.usage");
		},
		get summary() {
			return W("help.realpath.summary");
		},
		run: Gp
	}
], qp = {
	alpha: "a-zA-Z",
	digit: "0-9",
	alnum: "a-zA-Z0-9",
	upper: "A-Z",
	lower: "a-z",
	space: "\\s",
	blank: " \\t",
	punct: "!-\\/:-@\\[-`{-~",
	xdigit: "0-9A-Fa-f",
	word: "\\w",
	cntrl: "\\x00-\\x1f\\x7f",
	print: "\\x20-\\x7e",
	graph: "\\x21-\\x7e"
}, Jp = /* @__PURE__ */ new Set([
	"(",
	")",
	"{",
	"}",
	"|",
	"+",
	"?"
]);
function Yp(e, t) {
	let n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i === "[") {
			let t = r + 1, i = "[";
			for (e[t] === "^" && (i += "^", t++), e[t] === "]" && (i += "\\]", t++); t < e.length && e[t] !== "]"; t++) {
				if (e[t] === "[" && e[t + 1] === ":") {
					let n = e.indexOf(":]", t + 2);
					if (n > 0) {
						i += qp[e.slice(t + 2, n)] ?? "", t = n + 1;
						continue;
					}
				}
				i += e[t] === "\\" ? "\\\\" : e[t] === "[" ? "\\[" : e[t];
			}
			if (t >= e.length) throw new X(W("regex.unmatchedBracket"), 2);
			n += i + "]", r = t;
		} else if (i === "\\" && r + 1 < e.length) {
			let i = e[++r];
			i === "<" || i === ">" ? n += "\\b" : !t && Jp.has(i) ? n += i : n += "\\" + i;
		} else !t && Jp.has(i) ? n += "\\" + i : i === "*" && (r === 0 || !t && e.slice(0, r).endsWith("\\(")) ? n += "\\*" : n += i;
	}
	return n;
}
function Xp(e, { extended: t = !1, fixed: n = !1, ignoreCase: r = !1, word: i = !1, line: a = !1, global: o = !1 } = {}) {
	let s = n ? e.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") : Yp(e, t);
	i && (s = `(?<![\\w])(?:${s})(?![\\w])`), a && (s = `^(?:${s})$`);
	try {
		return new RegExp(s, (r ? "i" : "") + (o ? "g" : "") + "u");
	} catch {
		try {
			return new RegExp(s, (r ? "i" : "") + (o ? "g" : ""));
		} catch {
			throw new X(W("regex.invalid", { pattern: e }), 2);
		}
	}
}
// src/terminal/commands/text.js
var Zp = (e) => e.stdout === e.shell.host.stdout, Qp = (e) => new TextEncoder().encode(e).length;
function $p(e) {
	let t = e.split("\n"), n = e.endsWith("\n");
	return (n || e === "") && t.pop(), {
		lines: t,
		ended: n
	};
}
async function em(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "qv",
		values: "nc",
		long: {
			lines: "n",
			bytes: "c",
			quiet: "q"
		},
		number: !0
	}), r = t.n == null ? 10 : $(t.n), i = n.length ? n : ["-"], a = !0;
	for (let n of i) if (i.length > 1 && !t.q && await e.out(`${a ? "" : "\n"}==> ${n === "-" ? "standard input" : n} <==\n`), a = !1, n === "-" && t.c == null && r >= 0) {
		let t = 0;
		for (; t < r;) {
			let n = await e.stdin.readLine();
			if (n == null) break;
			await e.out(n + "\n"), t++;
		}
		e.stdin.close();
	} else for await (let { text: i } of e.inputs([n])) {
		if (t.c != null) {
			let n = $(t.c);
			await e.out(n >= 0 ? i.slice(0, n) : i.slice(0, Math.max(0, i.length + n)));
			continue;
		}
		let { lines: n, ended: a } = $p(i), o = r >= 0 ? n.slice(0, r) : n.slice(0, Math.max(0, n.length + r)), s = o.map((e) => e + "\n").join("");
		await e.out(!a && o.length && o.length === n.length ? s.slice(0, -1) : s);
	}
	return +!!e.failed;
}
async function tm(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "qvf",
		values: "nc",
		long: {
			lines: "n",
			bytes: "c",
			quiet: "q"
		},
		number: !0
	}), r = n.length ? n : ["-"], i = !0;
	for await (let { name: n, text: a } of e.inputs(r)) {
		if (r.length > 1 && !t.q && await e.out(`${i ? "" : "\n"}==> ${n === "-" ? "standard input" : n} <==\n`), i = !1, t.c != null) {
			let n = String(t.c), r = $(n.replace(/^[+-]/, ""));
			await e.out(n.startsWith("+") ? a.slice(Math.max(0, r - 1)) : a.slice(Math.max(0, a.length - r)));
			continue;
		}
		let o = String(t.n ?? "10"), { lines: s, ended: c } = $p(a), l = $(o.replace(/^[+-]/, "")), u = o.startsWith("+") ? s.slice(Math.max(0, l - 1)) : l === 0 ? [] : s.slice(-l), d = u.map((e) => e + "\n").join("");
		await e.out(!c && u.length ? d.slice(0, -1) : d);
	}
	return +!!e.failed;
}
async function nm(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "lwcmL",
		long: {
			lines: "l",
			words: "w",
			bytes: "c",
			chars: "m"
		}
	}), r = t.l || t.w || t.c || t.m || t.L ? t : {
		l: !0,
		w: !0,
		c: !0
	}, i = [];
	for await (let { name: t, text: r } of e.inputs(n)) i.push({
		name: t === "-" && !n.length ? "" : t,
		l: (r.match(/\n/g) ?? []).length,
		w: (r.match(/\S+/g) ?? []).length,
		c: Qp(r),
		m: [...r].length,
		L: Math.max(0, ...r.split("\n").map((e) => e.length))
	});
	i.length > 1 && i.push({
		name: W("wc.total"),
		...Object.fromEntries([
			"l",
			"w",
			"c",
			"m"
		].map((e) => [e, i.reduce((t, n) => t + n[e], 0)])),
		L: Math.max(...i.map((e) => e.L))
	});
	let a = [
		"l",
		"w",
		"m",
		"c",
		"L"
	].filter((e) => r[e]), o = a.length === 1 && i.length === 1 ? 0 : Math.max(...i.flatMap((e) => a.map((t) => String(e[t]).length)));
	for (let t of i) await e.out(a.map((e) => String(t[e]).padStart(o)).join(" ") + (t.name ? ` ${t.name}` : "") + "\n");
	return +!!e.failed;
}
async function rm(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "ivnclLrRwxEFoqsHhGPz",
		values: "mABC",
		multi: "ef",
		long: {
			"ignore-case": "i",
			"invert-match": "v",
			"line-number": "n",
			count: "c",
			"files-with-matches": "l",
			"files-without-match": "L",
			recursive: "r",
			"word-regexp": "w",
			"line-regexp": "x",
			"extended-regexp": "E",
			"fixed-strings": "F",
			"only-matching": "o",
			quiet: "q",
			silent: "q",
			"no-messages": "s",
			"with-filename": "H",
			"no-filename": "h",
			regexp: "e",
			file: "f",
			"max-count": "m",
			"after-context": "A",
			"before-context": "B",
			context: "C",
			color: "K",
			colour: "K"
		}
	}), r = [...n], a = t.e ?? [];
	for (let n of t.f ?? []) {
		let t = e.resolve(n);
		if (t?.type !== "file") throw new X(W("err.noSuchFile", { path: n }), 2);
		a.push(...(await i.read(t.id)).split("\n").filter(Boolean));
	}
	if (!a.length) {
		if (!r.length) throw new X(W("grep.noPattern"), 2);
		a = [r.shift()];
	}
	let o = {
		extended: t.E || t.P,
		fixed: t.F,
		ignoreCase: t.i,
		word: t.w,
		line: t.x
	}, s = a.map((e) => Xp(e, o)), c = a.map((e) => Xp(e, {
		...o,
		global: !0
	})), l = Zp(e), u = t.r || t.R, d = [], f = (e, t) => {
		if (e.type === "file") d.push(t);
		else if (e.type === "folder") for (let n of [...i.children(e.id)].sort((e, t) => Au(e.name, t.name))) f(n, t.endsWith("/") ? t + n.name : `${t}/${n.name}`);
	};
	if (u) for (let n of r.length ? r : ["."]) {
		let r = e.resolve(n);
		r ? f(r, n) : (t.s || await e.error(W("err.noSuchFile", { path: n })), e.failed = !0);
	}
	else d.push(...r);
	let p = t.H || (d.length > 1 || u) && !t.h, m = $(t.A ?? t.C ?? 0), h = $(t.B ?? t.C ?? 0), g = t.m == null ? Infinity : $(t.m), _ = !1, v = (e) => l ? `\x1b[1;31m${e}\x1b[0m` : e, y = (e, n, r) => (p ? l ? `\x1b[35m${e}\x1b[0m${r}` : e + r : "") + (t.n ? l ? `\x1b[32m${n}\x1b[0m${r}` : n + r : ""), ee = async (n, r) => {
		let { lines: i } = $p(r), a = 0, o = -1, u = 0;
		for (let r = 0; r < i.length && a < g; r++) {
			r % 2e3 == 0 && await e.tick();
			let d = i[r];
			if (s.some((e) => e.test(d)) === !!t.v) u > 0 && !t.c && !t.l && !t.L && !t.q && (await e.out(y(n, r + 1, "-") + d + "\n"), o = r, u--);
			else {
				if (a++, _ = !0, t.q) return a;
				if (!(t.c || t.l || t.L)) {
					(h || m) && o >= 0 && r - h > o + 1 && await e.out(l ? "\x1B[36m--\x1B[0m\n" : "--\n");
					for (let t = Math.max(o + 1, r - h); t < r; t++) await e.out(y(n, t + 1, "-") + i[t] + "\n");
					if (t.o && !t.v) for (let t of c) for (let i of d.matchAll(t)) i[0] && await e.out(y(n, r + 1, ":") + v(i[0]) + "\n");
					else {
						let i = d;
						if (l && !t.v) for (let e of c) i = i.replace(e, (e) => e && v(e));
						await e.out(y(n, r + 1, ":") + i + "\n");
					}
					o = r, u = m;
				}
			}
		}
		return a;
	}, b = d.length ? d : ["-"];
	for (let n of b) {
		let r, a = n === "-" ? "(standard input)" : n;
		if (n === "-") r = await e.stdin.readAll();
		else {
			let a = e.resolve(n);
			if (!a) {
				t.s || await e.error(W("err.noSuchFile", { path: n })), e.failed = !0;
				continue;
			}
			if (a.type === "folder") {
				t.s || await e.error(W("err.isADirectory", { path: n }));
				continue;
			}
			if (a.type !== "file") continue;
			r = await i.read(a.id);
		}
		let o = await ee(a, r);
		if (t.q && _) return 0;
		t.c && await e.out((p ? `${a}:` : "") + o + "\n"), t.l && o && await e.out(a + "\n"), t.L && !o && await e.out(a + "\n");
	}
	return e.failed && !t.q ? 2 : +!_;
}
function im(e, t, n) {
	if (!t) return e;
	let r = n == null ? e.trim().split(/\s+/) : e.split(n), i = t.end ?? r.length;
	return r.slice(t.start - 1, i).join(n ?? " ");
}
var am = {
	K: 1e3,
	M: 1e6,
	G: 1e9,
	T: 0xe8d4a51000,
	k: 1e3
}, om = (e) => {
	let t = /^\s*([+-]?\d*[.,]?\d+)/.exec(e);
	return t ? Number(t[1].replace(",", ".")) : 0;
};
async function sm(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "rnufhbVsc",
		values: "kto",
		long: {
			reverse: "r",
			"numeric-sort": "n",
			unique: "u",
			"ignore-case": "f",
			"human-numeric-sort": "h",
			key: "k",
			"field-separator": "t",
			output: "o"
		}
	}), r = [];
	for await (let { text: t } of e.inputs(n)) r.push(...$p(t).lines);
	let a = null;
	if (t.k) {
		let e = /^(\d+)(?:\.\d+)?[a-zA-Z]*(?:,(\d+)(?:\.\d+)?[a-zA-Z]*)?$/.exec(t.k);
		if (!e) throw new X(W("sort.badKey", { key: t.k }), 2);
		a = {
			start: Number(e[1]),
			end: e[2] ? Number(e[2]) : null
		}, /n/.test(t.k) && (t.n = !0), /r/.test(t.k) && (t.r = !0);
	}
	let o = (e) => {
		let n = im(e, a, t.t);
		return t.b && (n = n.trim()), t.f && (n = n.toLowerCase()), n;
	}, s = (e, n) => {
		let r = o(e), i = o(n);
		if (t.n) return om(r) - om(i) || Au(e, n);
		if (t.h) {
			let t = (e) => {
				let t = /^\s*([+-]?\d*\.?\d+)([KMGTk]?)/.exec(e);
				return t ? Number(t[1]) * (am[t[2]] ?? 1) : 0;
			};
			return t(r) - t(i) || Au(e, n);
		}
		return t.V ? r.localeCompare(i, void 0, { numeric: !0 }) : Au(r, i) || (r < i ? -1 : +(r > i));
	};
	if (t.c) {
		for (let t = 1; t < r.length; t++) if (s(r[t - 1], r[t]) > 0) return await e.error(W("sort.disorder", {
			n: t + 1,
			line: r[t]
		})), 1;
		return 0;
	}
	r.sort(t.r ? (e, t) => s(t, e) : s), t.u && (r = r.filter((e, t) => t === 0 || s(r[t - 1], e) !== 0));
	let c = r.map((e) => e + "\n").join("");
	if (t.o) {
		let n = e.shell.fileFor(t.o).id;
		await i.write(n, c);
	} else await e.out(c);
	return e.failed ? 2 : 0;
}
async function cm(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "cdui",
		values: "fs",
		long: {
			count: "c",
			repeated: "d",
			unique: "u",
			"ignore-case": "i",
			"skip-fields": "f",
			"skip-chars": "s"
		}
	}), [r, a] = n, o = [];
	for await (let { text: t } of e.inputs(r ? [r] : [])) o = $p(t).lines;
	let s = (e) => {
		let n = e;
		return t.f && (n = n.replace(RegExp(`^(\\s*\\S+){${$(t.f)}}`), "")), t.s && (n = n.slice($(t.s))), t.i ? n.toLowerCase() : n;
	}, c = "";
	for (let e = 0; e < o.length;) {
		let n = e + 1;
		for (; n < o.length && s(o[n]) === s(o[e]);) n++;
		let r = n - e;
		(!t.d || r > 1) && (!t.u || r === 1) && (c += (t.c ? `${String(r).padStart(7)} ` : "") + o[e] + "\n"), e = n;
	}
	return a ? await i.write(e.shell.fileFor(a).id, c) : await e.out(c), +!!e.failed;
}
async function lm(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "ai",
		long: { append: "a" }
	}), r = n.map((t) => ({
		path: t,
		id: e.shell.fileFor(t).id
	})), a = "";
	for (let t; (t = await e.stdin.read()) != null;) a += t, await e.out(t);
	for (let e of r) {
		let n = t.a ? await i.read(e.id) : "";
		await i.write(e.id, n + a);
	}
}
function um(e) {
	let t = String(e).split(",").map((t) => {
		let n = /^(\d*)(-?)(\d*)$/.exec(t);
		if (!n || !n[1] && !n[3]) throw new X(W("cut.badList", { spec: e }), 2);
		let r = n[1] ? Number(n[1]) : 1;
		return [r, n[2] ? n[3] ? Number(n[3]) : Infinity : r];
	});
	return (e) => t.some(([t, n]) => e >= t && e <= n);
}
async function dm(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "s",
		values: "dfcb",
		long: {
			delimiter: "d",
			fields: "f",
			characters: "c",
			bytes: "b",
			"only-delimited": "s",
			"output-delimiter": "O"
		}
	});
	if (!t.f && !t.c && !t.b) throw new X(W("cut.noList"), 2);
	let r = t.d ?? "	";
	if (r.length !== 1) throw new X(W("cut.badDelimiter"), 2);
	let i = t.O ?? r, a = "";
	for await (let { text: o } of e.inputs(n)) for (let e of $p(o).lines) if (t.f) {
		if (!e.includes(r)) {
			t.s || (a += e + "\n");
			continue;
		}
		let n = um(t.f);
		a += e.split(r).filter((e, t) => n(t + 1)).join(i) + "\n";
	} else {
		let n = um(t.c ?? t.b);
		a += [...e].filter((e, t) => n(t + 1)).join("") + "\n";
	}
	return await e.out(a), +!!e.failed;
}
var fm = {
	upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	lower: "abcdefghijklmnopqrstuvwxyz",
	digit: "0123456789",
	space: " 	\n\r\f\v",
	blank: " 	",
	punct: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
};
fm.alpha = fm.upper + fm.lower, fm.alnum = fm.alpha + fm.digit, fm.xdigit = "0123456789ABCDEFabcdef";
function pm(e) {
	let t = [], n = [];
	for (let t = 0; t < e.length; t++) {
		if (e[t] === "[" && e[t + 1] === ":") {
			let r = e.indexOf(":]", t + 2), i = fm[e.slice(t + 2, r)];
			if (r > 0 && i) {
				n.push(...[...i].map((e) => ({
					c: e,
					cls: !0
				}))), t = r + 1;
				continue;
			}
		}
		if (e[t] === "\\" && t + 1 < e.length) {
			let r = e[++t], i = {
				n: "\n",
				t: "	",
				r: "\r",
				"\\": "\\",
				a: "\x07",
				b: "\b",
				f: "\f",
				v: "\v"
			}[r];
			if (i) {
				n.push({ c: i });
				continue;
			}
			let a = /^[0-7]{1,3}/.exec(e.slice(t));
			if (a) {
				n.push({ c: String.fromCharCode(parseInt(a[0], 8)) }), t += a[0].length - 1;
				continue;
			}
			n.push({ c: r });
		} else n.push({ c: e[t] });
	}
	for (let e = 0; e < n.length; e++) if (n[e + 1]?.c === "-" && n[e + 2] && !n[e].cls && !n[e + 1].cls) {
		let r = n[e].c.codePointAt(0), i = n[e + 2].c.codePointAt(0);
		if (r > i) throw new X(W("tr.reverseRange", { range: `${n[e].c}-${n[e + 2].c}` }));
		for (let e = r; e <= i; e++) t.push(String.fromCodePoint(e));
		e += 2;
	} else t.push(n[e].c);
	return t;
}
async function mm(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "dscC",
		long: {
			delete: "d",
			"squeeze-repeats": "s",
			complement: "c"
		}
	});
	if (!n.length) throw new X(W("err.missingOperand"), 2);
	let r = pm(n[0]), i = n[1] == null ? null : pm(n[1]);
	if (!t.d && !t.s && !i) throw new X(W("tr.missingSet2", { set: n[0] }), 2);
	let a = t.c || t.C, o = a ? (e) => !r.includes(e) : (e) => r.includes(e), s = await e.stdin.readAll(), c = "", l = /* @__PURE__ */ new Map();
	i && !t.d && !a && r.forEach((e, t) => l.set(e, i[Math.min(t, i.length - 1)]));
	let u = t.s ? new Set(i && !t.d ? i : i ?? r) : null, d = null;
	for (let e of s) {
		if (t.d && o(e)) continue;
		let n = e;
		!t.d && i && (n = a ? o(e) ? i.at(-1) : e : l.get(e) ?? e), u && n === d && (t.d || i ? u.has(n) : o(n)) || (c += n, d = n);
	}
	await e.out(c);
}
async function hm(e) {
	let t = "";
	for await (let { text: n } of e.inputs(e.args)) {
		let { lines: e } = $p(n);
		t += e.map((e) => [...e].reverse().join("") + "\n").join("");
	}
	return await e.out(t), +!!e.failed;
}
async function gm(e) {
	let { opts: t, args: n } = Q(e, { values: "bwsv" }), r = t.b === "a", i = t.w == null ? 6 : $(t.w), a = t.s ?? "	", o = t.v == null ? 1 : $(t.v), s = "";
	for await (let { text: t } of e.inputs(n)) for (let e of $p(t).lines) s += r || e.trim() ? `${String(o++).padStart(i)}${a}${e}\n` : `${" ".repeat(i)}${a}${e}\n`.replace(/^\s+\t\n$/, "\n");
	await e.out(s);
}
async function _m(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "w",
		values: "sf",
		long: {
			separator: "s",
			"equal-width": "w",
			format: "f"
		}
	}), r = n.map((e) => {
		if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(e)) throw new X(W("seq.badArgument", { value: e }), 2);
		return Number(e);
	});
	if (!r.length || r.length > 3) throw new X(W("help.usageShort", { usage: W("help.seq.usage") }), 2);
	let [i, a, o] = r.length === 1 ? [
		1,
		1,
		r[0]
	] : r.length === 2 ? [
		r[0],
		1,
		r[1]
	] : r;
	if (a === 0) throw new X(W("seq.zeroStep"), 2);
	let s = Math.max(...n.map((e) => (e.split(".")[1] ?? "").length)), c = t.s ?? "\n", l = (e) => {
		let n = e.toFixed(s);
		if (t.w) {
			let e = Math.max(i.toFixed(s).length, o.toFixed(s).length), t = n.startsWith("-");
			n = (t ? "-" : "") + n.replace("-", "").padStart(e - +!!t, "0");
		}
		return n;
	}, u = "", d = 0;
	for (let t = 0;; t++) {
		let n = i + t * a;
		if (a > 0 ? n > o + 1e-9 : n < o - 1e-9) break;
		u += (d++ ? c : "") + l(n), u.length > 65536 && (await e.out(u), u = "", await e.tick());
	}
	await e.out(u + (d ? "\n" : ""));
}
async function vm(e) {
	let t = (e.args.length ? e.args.join(" ") : "y") + "\n", n = t.repeat(Math.max(1, Math.floor(4096 / t.length)));
	for (;;) await e.out(n), await e.tick();
}
function ym(e) {
	let t = [], n = "", r = !1, i = null;
	for (let a = 0; a < e.length; a++) {
		let o = e[a];
		i ? o === i ? i = null : n += o : o === "\"" || o === "'" ? (i = o, r = !0) : o === "\\" && a + 1 < e.length ? (n += e[++a], r = !0) : /\s/.test(o) ? (r && t.push(n), n = "", r = !1) : (n += o, r = !0);
	}
	if (i) throw new X(W(i === "\"" ? "xargs.unmatchedDouble" : "xargs.unmatchedSingle"));
	return r && t.push(n), t;
}
async function bm(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "0rtpx",
		values: "nIdLP",
		long: {
			null: "0",
			"no-run-if-empty": "r",
			verbose: "t",
			"max-args": "n",
			replace: "I",
			delimiter: "d",
			"max-lines": "L"
		},
		stopAtArg: !0
	}), r = n.length ? n : ["echo"], i = await e.stdin.readAll(), a;
	a = t[0] ? i.split("\0").filter((e, t, n) => e !== "" || t < n.length - 1) : t.d == null ? t.I != null || t.L != null ? i.split("\n").map((e) => e.trim()).filter(Boolean) : ym(i) : i.split(t.d.replace(/\\n/, "\n").replace(/\\t/, "	")).filter((e, t, n) => e !== "" || t < n.length - 1), t.d != null && a.at(-1)?.endsWith("\n") && (a[a.length - 1] = a.at(-1).slice(0, -1));
	let o = [];
	if (t.I != null) for (let e of a) o.push(r.map((n) => n.replaceAll(t.I, e)));
	else {
		let e = t.n == null ? t.L == null ? Infinity : $(t.L) : $(t.n);
		if (e < 1) throw new X(W("xargs.badCount"), 2);
		for (let n = 0; n < a.length; n += e === Infinity ? a.length : e) {
			let i = t.L == null ? a.slice(n, n + (e === Infinity ? a.length : e)) : a.slice(n, n + e).flatMap(ym);
			o.push([...r, ...i]);
		}
		!a.length && !t.r && o.push([...r]);
	}
	let s = 0;
	for (let n of o) {
		(t.t || t.p) && await e.err(n.join(" ") + "\n");
		let r = await e.shell.invoke(n, {
			stdin: new Ff(),
			stdout: e.stdout,
			stderr: e.stderr
		});
		if (r === 127) return 127;
		r !== 0 && (s = 123);
	}
	return s;
}
var xm = [
	{
		name: "head",
		get usage() {
			return W("help.head.usage");
		},
		get summary() {
			return W("help.head.summary");
		},
		run: em,
		get help() {
			return W("help.head.text");
		}
	},
	{
		name: "tail",
		get usage() {
			return W("help.tail.usage");
		},
		get summary() {
			return W("help.tail.summary");
		},
		run: tm,
		get help() {
			return W("help.tail.text");
		}
	},
	{
		name: "wc",
		usage: "wc [-lwcmL] [file…]",
		get summary() {
			return W("help.wc.summary");
		},
		run: nm,
		get help() {
			return W("help.wc.text");
		}
	},
	{
		name: "grep",
		get usage() {
			return W("help.grep.usage");
		},
		get summary() {
			return W("help.grep.summary");
		},
		run: rm,
		get help() {
			return W("help.grep.text");
		}
	},
	{
		name: "sort",
		get usage() {
			return W("help.sort.usage");
		},
		get summary() {
			return W("help.sort.summary");
		},
		run: sm,
		get help() {
			return W("help.sort.text");
		}
	},
	{
		name: "uniq",
		usage: "uniq [-cdui] [input [output]]",
		get summary() {
			return W("help.uniq.summary");
		},
		run: cm,
		get help() {
			return W("help.uniq.text");
		}
	},
	{
		name: "tee",
		usage: "tee [-a] [file…]",
		get summary() {
			return W("help.tee.summary");
		},
		run: lm,
		get help() {
			return W("help.tee.text");
		}
	},
	{
		name: "cut",
		get usage() {
			return W("help.cut.usage");
		},
		get summary() {
			return W("help.cut.summary");
		},
		run: dm,
		get help() {
			return W("help.cut.text");
		}
	},
	{
		name: "tr",
		get usage() {
			return W("help.tr.usage");
		},
		get summary() {
			return W("help.tr.summary");
		},
		run: mm,
		get help() {
			return W("help.tr.text");
		}
	},
	{
		name: "rev",
		usage: "rev [file…]",
		get summary() {
			return W("help.rev.summary");
		},
		run: hm
	},
	{
		name: "nl",
		usage: "nl [-b a] [file…]",
		get summary() {
			return W("help.nl.summary");
		},
		run: gm
	},
	{
		name: "seq",
		get usage() {
			return W("help.seq.usage");
		},
		get summary() {
			return W("help.seq.summary");
		},
		run: _m,
		get help() {
			return W("help.seq.text");
		}
	},
	{
		name: "yes",
		get usage() {
			return W("help.yes.usage");
		},
		get summary() {
			return W("help.yes.summary");
		},
		run: vm
	},
	{
		name: "xargs",
		get usage() {
			return W("help.xargs.usage");
		},
		get summary() {
			return W("help.xargs.summary");
		},
		run: bm,
		get help() {
			return W("help.xargs.text");
		}
	}
];
// src/terminal/commands/sed.js
function Sm(e, t) {
	let n = [], r = [], i = 0, a = () => e[i], o = () => {
		for (; i < e.length && /[ \t]/.test(e[i]);) i++;
	}, s = (e) => {
		throw new X(W("sed.at", {
			pos: i,
			message: e
		}));
	}, c = (t, n) => {
		let r = "";
		for (;;) {
			i >= e.length && s(W("sed.unterminated"));
			let a = e[i++];
			if (a === t) return r;
			if (a === "\\") {
				let a = e[i++];
				r += a === t ? t === "&" && !n ? "\\&" : t : a === "n" && !n ? "\n" : "\\" + (a ?? "");
			} else r += a === "\n" && !n ? "\n" : a;
		}
	}, l = (t) => {
		let n = c(t, !0), r = "";
		for (; e[i] === "I" || e[i] === "M";) r += e[i++];
		return {
			re: n,
			ignoreCase: r.includes("I")
		};
	}, u = () => {
		o();
		let t = a();
		if (/\d/.test(t ?? "")) {
			let t = /^\d+/.exec(e.slice(i));
			if (i += t[0].length, e[i] === "~") {
				i++;
				let n = /^\d+/.exec(e.slice(i))?.[0] ?? "0";
				return i += n.length, { step: [Number(t[0]), Number(n)] };
			}
			return { line: Number(t[0]) };
		}
		if (t === "$") return i++, { last: !0 };
		if (t === "/") return i++, l("/");
		if (t === "\\") {
			i++;
			let t = e[i++];
			return l(t);
		}
		return null;
	}, d = () => {
		o();
		let t = /^[^;\n}]*/.exec(e.slice(i));
		return i += t[0].length, t[0].trim();
	}, f = () => {
		o(), a() === "\\" && (i++, a() === "\n" && i++);
		let t = "";
		for (; i < e.length && e[i] !== "\n";) e[i] === "\\" && i + 1 < e.length ? (t += e[i + 1] === "n" ? "\n" : e[i + 1], i += 2) : t += e[i++];
		return t;
	};
	for (; i < e.length;) {
		for (; i < e.length && /[\s;]/.test(e[i]);) i++;
		if (i >= e.length) break;
		if (a() === "#") {
			for (; i < e.length && e[i] !== "\n";) i++;
			continue;
		}
		let t = {
			a1: u(),
			a2: null,
			neg: !1,
			active: !1
		};
		if (t.a1 && (o(), a() === ",")) {
			if (i++, o(), a() === "+") {
				i++;
				let n = /^\d+/.exec(e.slice(i));
				n || s(W("sed.badAddress")), i += n[0].length, t.a2 = { plus: Number(n[0]) };
			} else t.a2 = u(), t.a2 || s(W("sed.missingAddress"));
		}
		for (o(); a() === "!";) t.neg = !t.neg, i++, o();
		let l = e[i++];
		switch (l ?? s(W("sed.missingCommand")), t.type = l, l) {
			case "{":
				r.push(n.length);
				break;
			case "}":
				r.length || s(W("sed.unexpectedBrace")), n[r.pop()].end = n.length;
				break;
			case "s": {
				let n = e[i++];
				n && n !== "\n" && n !== "\\" || s(W("sed.badDelimiter")), t.re = c(n, !0), t.rep = c(n, !1);
				let r = /^[gGiIpPe0-9mM]*/.exec(e.slice(i));
				i += r[0].length, t.global = /g/i.test(r[0]), t.print = /p/i.test(r[0]), t.ignoreCase = /i/i.test(r[0]), t.nth = Number(/\d+/.exec(r[0])?.[0] ?? 1);
				break;
			}
			case "y": {
				let n = e[i++], r = [...c(n, !1)], a = [...c(n, !1)];
				r.length !== a.length && s(W("sed.yLengths")), t.map = new Map(r.map((e, t) => [e, a[t]]));
				break;
			}
			case "a":
			case "i":
			case "c":
				t.text = f();
				break;
			case ":":
				t.label = d(), t.label || s(W("sed.noLabel"));
				break;
			case "b":
			case "t":
			case "T":
				t.label = d();
				break;
			case "q":
			case "Q": {
				o();
				let n = /^\d+/.exec(e.slice(i));
				t.code = n ? Number(n[0]) : 0, n && (i += n[0].length);
				break;
			}
			case "r":
			case "w":
				t.file = f();
				break;
			case "d":
			case "D":
			case "p":
			case "P":
			case "=":
			case "n":
			case "N":
			case "h":
			case "H":
			case "g":
			case "G":
			case "x":
			case "l":
			case "z": break;
			default: s(W("sed.unknownCommand", { cmd: l }));
		}
		n.push(t);
	}
	r.length && s(W("sed.unmatchedBrace"));
	let p = new Map(n.map((e, t) => [e, t]).filter(([e]) => e.type === ":").map(([e, t]) => [e.label, t]));
	for (let e of n) {
		if ((e.type === "b" || e.type === "t" || e.type === "T") && e.label && !p.has(e.label)) throw new X(W("sed.noSuchLabel", { label: e.label }));
		for (let n of [e.a1, e.a2]) n?.re != null && (n.compiled = n.re === "" ? null : Xp(n.re, {
			extended: t,
			ignoreCase: n.ignoreCase
		}));
		e.type === "s" && (e.compiled = e.re === "" ? null : Xp(e.re, {
			extended: t,
			ignoreCase: e.ignoreCase,
			global: !0
		}));
	}
	return {
		cmds: n,
		labels: p
	};
}
function Cm(e, t) {
	let n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i === "&") n += t[0];
		else if (i === "\\" && r + 1 < e.length) {
			let i = e[++r];
			/\d/.test(i) ? n += t[Number(i)] ?? "" : n += i === "n" ? "\n" : i === "t" ? "	" : i;
		} else n += i;
	}
	return n;
}
async function wm(e, t, n, { quiet: r, write: a }) {
	let { cmds: o, labels: s } = t, c = "", l = null, u = 0, d = 0, f = !1;
	for (let e of o) e.active = !1;
	let p = () => u >= n.length, m = (e, t, n) => {
		if (e.line != null) return n === e.line;
		if (e.last) return p();
		if (e.step) return e.step[1] > 0 ? n >= e.step[0] && (n - e.step[0]) % e.step[1] === 0 : n === e.step[0];
		let r = e.compiled ?? l;
		if (!r) throw new X(W("sed.noPreviousRegex"));
		return l = r, r.test(t);
	}, h = (e, t, n) => {
		let r;
		return e.a1 ? e.a2 ? e.active ? (r = !0, (e.a2.line == null ? e.a2.plus == null ? m(e.a2, t, n) : n >= e.end2 : n >= e.a2.line) && (e.active = !1)) : m(e.a1, t, n) ? (r = !0, e.active = !0, e.a2.line != null && e.a2.line <= n && (e.active = !1), e.a2.plus != null && (e.end2 = n + e.a2.plus, e.a2.plus === 0 && (e.active = !1))) : r = !1 : r = m(e.a1, t, n) : r = !0, e.neg ? !r : r;
	}, g = 0;
	for (; !f && u < n.length;) {
		let t = n[u++];
		g++;
		let m = "", _ = !1, v = !r, y = !1;
		await e.tick();
		cycle: for (;;) {
			for (let ee = 0; ee < o.length; ee++) {
				let b = o[ee];
				if (b.type !== "}" && b.type !== ":") {
					if (!h(b, t, g)) b.type === "{" && (ee = b.end);
					else switch (b.type) {
						case "{": break;
						case "s": {
							let n = b.compiled ?? l;
							if (!n) throw new X(W("sed.noPreviousRegex"));
							l = n;
							let r = 0, i = !1, a = t.replace(new RegExp(n.source, n.flags.includes("g") ? n.flags : n.flags + "g"), (...e) => {
								let t = typeof e.at(-1) == "object" && e.at(-1) !== null, n = e.slice(0, t ? -3 : -2);
								return r++, r < b.nth || i && !b.global ? n[0] : (i = !0, Cm(b.rep, n));
							});
							i && (t = a, _ = !0, b.print && await e.out(t + "\n"));
							break;
						}
						case "y":
							t = [...t].map((e) => b.map.get(e) ?? e).join("");
							break;
						case "d":
							v = !1;
							break cycle;
						case "D":
							if (!t.includes("\n")) {
								v = !1;
								break cycle;
							}
							t = t.slice(t.indexOf("\n") + 1), y = !0, v = !1;
							break cycle;
						case "p":
							await e.out(t + "\n");
							break;
						case "P":
							await e.out(t.split("\n")[0] + "\n");
							break;
						case "=":
							await e.out(g + "\n");
							break;
						case "l":
							await e.out(JSON.stringify(t).slice(1, -1) + "$\n");
							break;
						case "z":
							t = "";
							break;
						case "a":
							m += b.text + "\n";
							break;
						case "i":
							await e.out(b.text + "\n");
							break;
						case "c":
							b.a2 && b.active || await e.out(b.text + "\n"), v = !1;
							break cycle;
						case "q":
							f = !0, d = b.code;
							break cycle;
						case "Q":
							f = !0, d = b.code, v = !1;
							break cycle;
						case "n":
							if (r || await e.out(t + "\n"), m &&= (await e.out(m), ""), p()) {
								v = !1, f = !0;
								break cycle;
							}
							t = n[u++], g++;
							break;
						case "N":
							if (p()) {
								f = !0;
								break cycle;
							}
							t += "\n" + n[u++], g++;
							break;
						case "h":
							c = t;
							break;
						case "H":
							c += "\n" + t;
							break;
						case "g":
							t = c;
							break;
						case "G":
							t += "\n" + c;
							break;
						case "x":
							[t, c] = [c, t];
							break;
						case "b":
							if (!b.label) break cycle;
							ee = s.get(b.label);
							break;
						case "t":
						case "T":
							if (_ === (b.type === "t")) {
								if (_ = !1, !b.label) break cycle;
								ee = s.get(b.label);
							}
							break;
						case "r": {
							let t = e.resolve(b.file);
							t?.type === "file" && (m += await i.read(t.id));
							break;
						}
						case "w": a(b.file, t + "\n");
					}
				}
			}
			break;
		}
		v && await e.out(t + "\n"), m && await e.out(m), y && !f && (n.splice(u, 0, t), g--);
	}
	return d;
}
async function Tm(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "nEris",
		values: "I",
		multi: "ef",
		long: {
			quiet: "n",
			silent: "n",
			expression: "e",
			file: "f",
			"in-place": "i",
			"regexp-extended": "E",
			separate: "s"
		}
	}), r = [...n], a = [...t.e ?? []];
	for (let n of t.f ?? []) {
		let t = e.resolve(n);
		if (t?.type !== "file") throw new X(W("sed.cannotRead", { path: n }));
		a.push(await i.read(t.id));
	}
	if (!a.length) {
		if (!r.length) throw new X(W("sed.noScript"), 1);
		a.push(r.shift());
	}
	let o = Sm(a.join("\n"), t.E || t.r), s = /* @__PURE__ */ new Map(), c = (e, t) => s.set(e, (s.get(e) ?? "") + t), l = 0;
	if (t.i || t.I != null) {
		if (!r.length) throw new X(W("sed.noFiles"));
		for (let n of r) {
			let r = e.resolve(n);
			if (r?.type !== "file") {
				await e.error(W("sed.cannotRead", { path: n })), l = 2;
				continue;
			}
			let { lines: a, ended: s } = Em(await i.read(r.id)), u = "";
			l = await wm({
				...e,
				out: (e) => {
					u += e;
				},
				tick: () => e.tick(),
				resolve: (t) => e.resolve(t)
			}, o, a, {
				quiet: t.n,
				write: c
			}) || l, await i.write(r.id, s || !u.endsWith("\n") ? u : u.slice(0, -1));
		}
	} else {
		let n = r.length ? r : ["-"], i = [], a = !0;
		for await (let { text: t } of e.inputs(n)) {
			let e = Em(t);
			i.push(...e.lines), a = e.ended;
		}
		let s = "";
		l = await wm({
			...e,
			out: (e) => {
				s += e;
			},
			tick: () => e.tick(),
			resolve: (t) => e.resolve(t)
		}, o, i, {
			quiet: t.n,
			write: c
		}), await e.out(a || !s.endsWith("\n") ? s : s.slice(0, -1)), e.failed && (l = 2);
	}
	for (let [t, n] of s) await i.write(e.shell.fileFor(t).id, n);
	return l;
}
function Em(e) {
	let t = e.split("\n"), n = e.endsWith("\n") || e === "";
	return n && t.pop(), {
		lines: t,
		ended: n
	};
}
var Dm = [{
	name: "sed",
	usage: "sed [-nEi] [-e script] [script] [file…]",
	get summary() {
		return W("help.sed.summary");
	},
	run: Tm,
	get help() {
		return W("help.sed.text");
	}
}];
// src/terminal/commands/diff.js
function Om(e, t, n = (e, t) => e === t) {
	let r = 0, i = 0;
	for (; r < e.length && r < t.length && n(e[r], t[r]);) r++;
	for (; i < e.length - r && i < t.length - r && n(e[e.length - 1 - i], t[t.length - 1 - i]);) i++;
	let a = Am(e.slice(r, e.length - i), t.slice(r, t.length - i), n);
	for (let e of a) e.a += r, e.b += r;
	return a;
}
var km = 4e7;
function Am(e, t, n) {
	let r = e.length, i = t.length, a = r + i, o = new Int32Array(2 * a + 2), s = [], c = !1;
	for (let l = 0; l <= a && !c; l++) {
		if ((l + 1) * o.length > km) throw new X(W("diff.tooBig"), 2);
		s.push(o.slice());
		for (let s = -l; s <= l; s += 2) {
			let u = s === -l || s !== l && o[a + s - 1] < o[a + s + 1] ? o[a + s + 1] : o[a + s - 1] + 1, d = u - s;
			for (; u < r && d < i && n(e[u], t[d]);) u++, d++;
			if (o[a + s] = u, u >= r && d >= i) {
				c = !0;
				break;
			}
		}
	}
	let l = [], u = r, d = i;
	for (let e = s.length - 1; e > 0; e--) {
		let t = s[e], n = u - d, r = n === -e || n !== e && t[a + n - 1] < t[a + n + 1] ? n + 1 : n - 1, i = t[a + r], o = i - r;
		for (; u > i && d > o;) u--, d--;
		l.push(u === i ? {
			op: "ins",
			a: u,
			b: o
		} : {
			op: "del",
			a: i,
			b: d
		}), u = i, d = o;
	}
	l.reverse();
	let f = [];
	for (let e of l) {
		let t = f.at(-1);
		e.op === "del" ? t && t.a + t.del === e.a && t.b + t.ins === e.b ? t.del++ : f.push({
			a: e.a,
			b: e.b,
			del: 1,
			ins: 0
		}) : t && t.a + t.del === e.a && t.b + t.ins === e.b ? t.ins++ : f.push({
			a: e.a,
			b: e.b,
			del: 0,
			ins: 1
		});
	}
	return f;
}
var jm = (e, t) => t <= 1 ? String(e + +!!t) : `${e + 1},${e + t}`, Mm = (e, t) => t === 1 ? String(e + 1) : `${t ? e + 1 : e},${t}`;
function Nm(e, t, n) {
	let r = "";
	for (let i of n) {
		let n = i.del && i.ins ? "c" : i.del ? "d" : "a";
		r += `${n === "a" ? String(i.a) : jm(i.a, i.del)}${n}${n === "d" ? String(i.b) : jm(i.b, i.ins)}\n`;
		for (let t = 0; t < i.del; t++) r += `< ${e[i.a + t]}\n`;
		n === "c" && (r += "---\n");
		for (let e = 0; e < i.ins; e++) r += `> ${t[i.b + e]}\n`;
	}
	return r;
}
function Pm(e, t, n, r) {
	let i = "", a = [];
	for (let e of n) {
		let t = a.at(-1);
		t && e.a - (t.at(-1).a + t.at(-1).del) <= 2 * r ? t.push(e) : a.push([e]);
	}
	for (let n of a) {
		let a = n[0], o = n.at(-1), s = Math.max(0, a.a - r), c = Math.max(0, a.b - r), l = Math.min(e.length, o.a + o.del + r), u = Math.min(t.length, o.b + o.ins + r);
		i += `@@ -${Mm(s, l - s)} +${Mm(c, u - c)} @@\n`;
		let d = s;
		for (let r of n) {
			for (; d < r.a; d++) i += ` ${e[d]}\n`;
			for (let t = 0; t < r.del; t++) i += `-${e[r.a + t]}\n`;
			for (let e = 0; e < r.ins; e++) i += `+${t[r.b + e]}\n`;
			d = r.a + r.del;
		}
		for (; d < l; d++) i += ` ${e[d]}\n`;
	}
	return i;
}
var Fm = (e) => {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}:${n(t.getSeconds())}`;
};
async function Im(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "uqiwbBsN",
		values: "U",
		long: {
			unified: "u",
			brief: "q",
			"ignore-case": "i",
			"ignore-all-space": "w",
			"ignore-space-change": "b",
			"ignore-blank-lines": "B",
			"report-identical-files": "s"
		}
	});
	if (n.length !== 2) throw new X(n.length < 2 ? W("diff.missingOperand", { arg: n[0] ?? "diff" }) : W("diff.extraOperand", { arg: n[2] }), 2);
	let r = async (t) => {
		if (t === "-") return {
			text: await e.stdin.readAll(),
			time: Date.now()
		};
		let n = e.resolve(t);
		if (!n) throw new X(W("err.noSuchFile", { path: t }), 2);
		if (n.type !== "file") throw new X(n.type === "folder" ? W("err.isADirectory", { path: t }) : W("err.notAFile", { path: t }), 2);
		return {
			text: await i.read(n.id),
			time: n.modified
		};
	}, [a, o] = [await r(n[0]), await r(n[1])], s = (e) => {
		let t = e.split("\n");
		return (e.endsWith("\n") || e === "") && t.pop(), t;
	}, c = s(a.text), l = s(o.text), u = (e) => (t.i && (e = e.toLowerCase()), t.w ? e = e.replace(/\s+/g, "") : t.b && (e = e.replace(/\s+/g, " ").trimEnd()), e), d = Om(c, l, (e, t) => u(e) === u(t));
	if (t.B && (d = d.filter((e) => !(c.slice(e.a, e.a + e.del).every((e) => !e.trim()) && l.slice(e.b, e.b + e.ins).every((e) => !e.trim())))), !d.length) return t.s && await e.out(`${W("diff.identical", {
		a: n[0],
		b: n[1]
	})}\n`), 0;
	if (t.q) return await e.out(`${W("diff.differ", {
		a: n[0],
		b: n[1]
	})}\n`), 1;
	if (t.u || t.U != null) {
		let r = t.U == null ? 3 : $(t.U);
		await e.out(`--- ${n[0]}\t${Fm(a.time)}\n+++ ${n[1]}\t${Fm(o.time)}\n` + Pm(c, l, d, r));
	} else await e.out(Nm(c, l, d));
	return 1;
}
var Lm = [{
	name: "diff",
	usage: "diff [-uqiwB] file1 file2",
	get summary() {
		return W("help.diff.summary");
	},
	run: Im,
	get help() {
		return W("help.diff.text");
	}
}], Rm = (e) => e.stdout === e.shell.host.stdout, zm = (e) => {
	let t = String(e).toLowerCase();
	return h().find((e) => e.id.toLowerCase() === t) ?? h().find((e) => e.name.toLowerCase() === t) ?? null;
};
async function Bm(e) {
	let { opts: t, args: n } = Q(e, {
		values: "a",
		long: { app: "a" }
	});
	if (t.a != null) {
		let r = zm(t.a);
		if (!r) throw new X(W("open.noApp", { app: t.a }));
		if (!n.length) return g(r.id), 0;
		for (let t of n) {
			let n = e.resolve(t);
			if (!n) throw new X(W("err.noSuchFile", { path: t }));
			g(r.id, n.type === "folder" ? { folder: n.id } : { file: n.id });
		}
		return 0;
	}
	if (!n.length) throw new X(W("help.usageShort", { usage: e.cmd.usage }), 2);
	let r = 0;
	for (let t of n) {
		let n = e.resolve(t);
		n ? n.type === "folder" ? g("files", { folder: n.id }) : n.type === "app" ? g(n.app) : _(n) : (await e.error(W("err.noSuchFile", { path: t })), r = 1);
	}
	return r;
}
var Vm = (e) => U.date(e, {
	day: "2-digit",
	month: "short",
	hour: "2-digit",
	minute: "2-digit"
});
function Hm(e, t) {
	let n = i.trashed();
	return t.map((e) => {
		let t = n.find((t) => t.id === e) ?? n.find((t) => t.name === e) ?? n.find((t) => t.name.toLowerCase() === e.toLowerCase());
		if (!t) throw new X(W("trash.notInTrash", { name: e }));
		return t;
	});
}
async function Um(e) {
	let [t = "list", ...n] = e.args;
	switch (t) {
		case "list":
		case "ls": {
			let t = i.trashed();
			if (!t.length) return await e.out(`${W("trash.empty")}\n`), 0;
			for (let n of t) {
				let t = i.exists(n.trashed.from) ? i.path(n.trashed.from) : W("trash.deletedFolder"), r = n.type === "folder" ? W("trash.items", { n: n.inside }) : vp(n.bytes);
				await e.out(`${Vm(n.trashed.at)}  ${r.padStart(10)}  ${n.name}${n.type === "folder" ? "/" : ""}  ← ${t}\n`);
			}
			return 0;
		}
		case "put": {
			if (!n.length) throw new X(W("trash.missingPut"), 2);
			let t = 0;
			for (let r of n) {
				let n = e.resolve(r);
				n ? i.trash([n.id]).length || (await e.error(W("trash.cannotTrash", { path: r })), t = 1) : (await e.error(W("err.noSuchFile", { path: r })), t = 1);
			}
			return t;
		}
		case "restore":
			if (!n.length) throw new X(W("trash.missingRestore"), 2);
			for (let { id: t, parent: r } of i.untrash(Hm(e, n).map((e) => e.id))) await e.out(`${W("trash.restored", { path: i.path(t) })}${i.root, ""}\n`);
			return 0;
		case "rm": {
			if (!n.length) throw new X(W("trash.missingName"), 2);
			let t = i.purge(Hm(e, n).map((e) => e.id));
			return await e.out(`${W("trash.purged", { n: t })}\n`), 0;
		}
		case "empty": {
			let t = i.purgeTrash();
			return await e.out(`${t ? W("trash.emptied", { n: t }) : W("trash.alreadyEmpty")}\n`), 0;
		}
	}
	throw new X(`${W("err.unknownSubcommand", { sub: t })}\n${W("help.usageLine", { usage: e.cmd.usage })}`, 2);
}
function Wm(e, t = !1) {
	let n = u.byName(e) ?? u.get(e);
	if (n) return n;
	if (t) return u.create({ name: e });
	throw new X(W("tag.noSuchTag", { name: e }));
}
async function Gm(e) {
	let [t = "ls", ...r] = e.args, a = (t) => Rm(e) ? `\x1b[38;2;${parseInt(t.slice(1, 3), 16)};${parseInt(t.slice(3, 5), 16)};${parseInt(t.slice(5, 7), 16)}m●\x1b[0m ` : "";
	switch (t) {
		case "ls":
		case "list": {
			if (r.length) {
				for (let t of r) {
					let n = Wm(t);
					for (let t of i.tagged(n.id).sort((e, t) => Au(i.path(e.id), i.path(t.id)))) await e.out(i.path(t.id) + (t.type === "folder" ? "/" : "") + "\n");
				}
				return 0;
			}
			let t = u.list();
			if (!t.length) return await e.out(`${W("tag.none")}\n`), 0;
			for (let n of t) await e.out(`${a(n.color)}${n.name}  (${i.tagged(n.id).length})${n.visible ? "" : `  ${W("tag.hidden")}`}\n`);
			return 0;
		}
		case "show": {
			let t = 0;
			for (let n of r.length ? r : ["."]) {
				let r = e.resolve(n);
				if (!r) {
					await e.error(W("err.noSuchFile", { path: n })), t = 1;
					continue;
				}
				let i = (r.tags ?? []).map((e) => u.get(e)).filter(Boolean).map((e) => a(e.color) + e.name);
				await e.out(`${n}: ${i.length ? i.join(", ") : W("tag.noTags")}\n`);
			}
			return t;
		}
		case "add":
		case "rm": {
			let [n, ...a] = r;
			if (!n || !a.length) throw new X(W("help.usageShort", { usage: W("tag.usageAddRm", { sub: t }) }), 2);
			let o = t === "add" && !u.byName(n), s = Wm(n, t === "add");
			o && await e.out(`${W("tag.created", { name: s.name })}\n`);
			let c = 0;
			for (let n of a) {
				let r = e.resolve(n);
				if (!r) {
					await e.error(W("err.noSuchFile", { path: n })), c = 1;
					continue;
				}
				if (r.system) {
					await e.error(W("tag.system", { path: n })), c = 1;
					continue;
				}
				let a = r.tags ?? [];
				i.setTags(r.id, t === "add" ? [...a, s.id] : a.filter((e) => e !== s.id));
			}
			return c;
		}
		case "new": {
			let [t, i] = r;
			if (!t) throw new X(W("help.usageShort", { usage: W("tag.usageNew") }), 2);
			let o = i ? n.find((e) => e.label.toLowerCase() === i.toLowerCase())?.value ?? i : void 0, s = u.create({
				name: t,
				color: o
			});
			return await e.out(`${W("tag.createdShown", { tag: a(s.color) + s.name })}\n`), 0;
		}
		case "delete":
			if (!r.length) throw new X(W("help.usageShort", { usage: W("tag.usageDelete") }), 2);
			for (let e of r) u.remove(Wm(e).id);
			return 0;
	}
	throw new X(`${W("err.unknownSubcommand", { sub: t })}\n${W("help.usageLine", { usage: e.cmd.usage })}`, 2);
}
async function Km(e) {
	let t = [...h()].sort((e, t) => Au(e.name, t.name)), n = Math.max(...t.map((e) => e.id.length));
	for (let r of t) {
		let t = r.package?.manifest?.version ?? "";
		await e.out(`${r.id.padEnd(n)}  ${r.name}${t ? `  ${t}` : ""}\n`);
	}
}
var qm = (e, t) => U.date(new Date(2024, 0, 7 + e, 12), { weekday: t }), Jm = (e, t) => U.date(new Date(2024, e, 15, 12), { month: t });
function Ym(e, t, n = !1) {
	let r = (e) => n ? t[`getUTC${e}`]() : t[`get${e}`](), i = (e, t = 2) => String(e).padStart(t, "0"), a = n ? Date.UTC(r("FullYear"), 0, 1) : new Date(r("FullYear"), 0, 1).getTime(), o = n ? 0 : -t.getTimezoneOffset(), s = {
		Y: () => r("FullYear"),
		y: () => i(r("FullYear") % 100),
		m: () => i(r("Month") + 1),
		d: () => i(r("Date")),
		e: () => String(r("Date")).padStart(2),
		H: () => i(r("Hours")),
		I: () => i((r("Hours") + 11) % 12 + 1),
		M: () => i(r("Minutes")),
		S: () => i(r("Seconds")),
		N: () => i(r("Milliseconds"), 3) + "000000",
		p: () => r("Hours") < 12 ? "AM" : "PM",
		A: () => qm(r("Day"), "long"),
		a: () => qm(r("Day"), "short"),
		B: () => Jm(r("Month"), "long"),
		b: () => Jm(r("Month"), "short"),
		h: () => Jm(r("Month"), "short"),
		j: () => i(Math.floor((t - a) / 864e5) + 1, 3),
		u: () => r("Day") || 7,
		w: () => r("Day"),
		s: () => Math.floor(t / 1e3),
		z: () => (o >= 0 ? "+" : "-") + i(Math.floor(Math.abs(o) / 60)) + i(Math.abs(o) % 60),
		Z: () => n ? "UTC" : Intl.DateTimeFormat().resolvedOptions().timeZone,
		F: () => `${s.Y()}-${s.m()}-${s.d()}`,
		T: () => `${s.H()}:${s.M()}:${s.S()}`,
		D: () => `${s.m()}/${s.d()}/${s.y()}`,
		R: () => `${s.H()}:${s.M()}`,
		c: () => Ym(W("date.formatC"), t, n),
		x: () => Ym(W("date.formatX"), t, n),
		X: () => s.T(),
		n: () => "\n",
		t: () => "	",
		"%": () => "%"
	};
	return e.replace(/%([a-zA-Z%])/g, (e, t) => s[t] ? String(s[t]()) : e);
}
async function Xm(e) {
	let { opts: t, args: n } = Q(e, {
		flags: "uR",
		values: "dI",
		long: {
			utc: "u",
			date: "d",
			"iso-8601": "I",
			rfc: "R"
		}
	}), r = /* @__PURE__ */ new Date();
	if (t.d != null) {
		let e = t.d.trim();
		if (r = /^@\d+$/.test(e) ? /* @__PURE__ */ new Date(Number(e.slice(1)) * 1e3) : e === "now" ? /* @__PURE__ */ new Date() : e === "yesterday" || e === "ieri" ? /* @__PURE__ */ new Date(Date.now() - 864e5) : e === "tomorrow" || e === "domani" ? new Date(Date.now() + 864e5) : new Date(e), Number.isNaN(r.getTime())) throw new X(W("date.invalid", { date: t.d }));
	}
	let i = n.find((e) => e.startsWith("+"));
	if (i) return e.out(Ym(i.slice(1), r, t.u) + "\n");
	if (t.I != null) return e.out(Ym(t.I === "seconds" ? "%Y-%m-%dT%H:%M:%S%z" : "%F", r, t.u) + "\n");
	if (t.R) return e.out(r.toUTCString() + "\n");
	await e.out(Ym(W("date.format"), r, t.u) + "\n");
}
var Zm = [
	{
		name: "open",
		get usage() {
			return W("help.open.usage");
		},
		get summary() {
			return W("help.open.summary");
		},
		run: Bm,
		get help() {
			return W("help.open.text");
		}
	},
	{
		name: "trash",
		get usage() {
			return W("help.trash.usage");
		},
		get summary() {
			return W("help.trash.summary");
		},
		run: Um,
		get help() {
			return W("help.trash.text");
		}
	},
	{
		name: "tag",
		get usage() {
			return W("help.tag.usage");
		},
		get summary() {
			return W("help.tag.summary");
		},
		run: Gm,
		get help() {
			return W("help.tag.text");
		}
	},
	{
		name: "apps",
		usage: "apps",
		get summary() {
			return W("help.apps.summary");
		},
		run: Km
	},
	{
		name: "date",
		get usage() {
			return W("help.date.usage");
		},
		get summary() {
			return W("help.date.summary");
		},
		run: Xm,
		get help() {
			return W("help.date.text");
		}
	},
	{
		name: "whoami",
		usage: "whoami",
		get summary() {
			return W("help.whoami.summary");
		},
		run: (e) => e.out((c.user?.username || e.shell.getVar("USER") || W("shell.defaultUser")) + "\n")
	},
	{
		name: "hostname",
		usage: "hostname",
		get summary() {
			return W("help.hostname.summary");
		},
		run: (e) => e.out((e.shell.getVar("HOSTNAME") ?? "lilos") + "\n")
	},
	{
		name: "uname",
		usage: "uname [-a]",
		get summary() {
			return W("help.uname.summary");
		},
		run: (e) => e.out(e.args.includes("-a") ? `lilOS lilos ${e.shell.getVar("BASH_VERSION")} ${navigator.platform || ""}\n`.replace(/ \n$/, "\n") : "lilOS\n")
	}
], Qm = {
	ssh: "ssh",
	telnet: "telnet",
	telnets: "telnet",
	rlogin: "rlogin",
	supdup: "supdup"
};
function $m(e) {
	let t = [], n = null, r = null;
	for (let i of String(e)) r ? i === r ? r = null : n += i : i === "\"" || i === "'" ? (r = i, n ??= "") : /\s/.test(i) ? n !== null && (t.push(n), n = null) : n = (n ?? "") + i;
	return n !== null && t.push(n), t;
}
var eh = (e) => {
	let t = Number(e);
	return Number.isInteger(t) && t >= 1 && t <= 65535 ? t : null;
};
function th(e) {
	let t = e.lastIndexOf("@");
	return {
		user: t > 0 ? e.slice(0, t) : "",
		host: (t >= 0 ? e.slice(t + 1) : e).replace(/^\[(.*)\]$/, "$1")
	};
}
function nh(e, t = [
	"ssh",
	"telnet",
	"rlogin",
	"supdup"
]) {
	let n = String(e ?? "").trim();
	if (!n) return null;
	let r = /^([a-z]+):\/\//i.exec(n);
	if (r) {
		let e = Qm[r[1].toLowerCase()];
		if (!e || !t.includes(e)) return null;
		let i;
		try {
			i = new URL(n.replace(/^[a-z]+:/i, "http:"));
		} catch {
			return null;
		}
		let a = { host: i.hostname.replace(/^\[(.*)\]$/, "$1") };
		return a.host ? (i.port && (a.port = Number(i.port)), i.username && (a.user = decodeURIComponent(i.username)), r[1].toLowerCase() === "telnets" && (a.tls = !0), {
			protocol: e,
			values: a
		}) : null;
	}
	let [i, ...a] = $m(n), o = i?.toLowerCase(), s = Qm[o];
	if (!s || !t.includes(s)) return null;
	let c = {};
	o === "telnets" && (c.tls = !0);
	let l = [];
	for (let e = 0; e < a.length; e++) {
		let t = a[e];
		if (t === "-p" && s === "ssh") {
			let t = eh(a[++e]);
			if (!t) return null;
			c.port = t;
		} else if (t === "-l") c.user = a[++e] ?? "";
		else if (/^-p\d+$/.test(t) && s === "ssh") c.port = eh(t.slice(2));
		else if (t.startsWith("-") && !l.length) continue;
		else l.push(t);
	}
	if (!l.length) return null;
	let u = th(l[0]);
	if (!u.host) return null;
	if (c.host = u.host, u.user && (c.user = u.user), s === "ssh" && l.length > 1 && (c.command = l.slice(1).join(" ")), s !== "ssh" && l[1] !== void 0) {
		let e = eh(l[1]);
		if (!e) return null;
		c.port = e;
	}
	return {
		protocol: s,
		values: c
	};
}
// src/terminal/commands/remote.js
var rh = (e) => e.shell.host.remote ?? null;
async function ih(t) {
	let n = rh(t);
	if (!n || !e.term?.available) throw new X(W("remote.cmd.unavailable"));
	if (!t.args.length) throw new X(W("help.usageShort", { usage: t.cmd.usage }), 2);
	let { hosts: r, protocols: i } = await n.data();
	if (!i.some((e) => e.id === ah(t.name))) throw new X(W("remote.cmd.noModule", {
		name: t.name,
		module: `term-${ah(t.name)}`
	}));
	if (t.args.length === 1) {
		let e = t.args[0].toLowerCase(), i = r.find((n) => n.protocol === ah(t.name) && n.name.toLowerCase() === e);
		if (i) return await n.open({ host: i.id }), await t.out(`${W("remote.cmd.opened", { name: i.name })}\n`), 0;
	}
	let a = nh([t.name, ...t.args.map((e) => /\s/.test(e) ? `'${e.replace(/'/g, "")}'` : e)].join(" "), i.map((e) => e.id));
	if (!a) throw new X(W("help.usageShort", { usage: t.cmd.usage }), 2);
	if (a.protocol === "ssh" && !a.values.user) throw new X(W("remote.cmd.noUser"));
	let o = await n.open(a);
	return await t.out(`${W("remote.cmd.opened", { name: o?.name ?? a.values.host })}\n`), 0;
}
var ah = (e) => e === "telnets" ? "telnet" : e;
async function oh(t) {
	let n = rh(t);
	if (!n || !e.term?.available) throw new X(W("remote.cmd.unavailable"));
	let { sessions: r } = await n.data(), i = r.filter((e) => e.state !== "closed"), a = (e) => i[Number(e) - 1] ?? i.find((t) => t.id === e || t.name.toLowerCase() === String(e).toLowerCase());
	if (t.args.length) {
		let e = a(t.args[0]);
		if (!e) throw new X(W("remote.cmd.noSession", { name: t.args[0] }));
		return await n.resume(e), await t.out(`${W("remote.cmd.shown", { name: e.name })}\n`), 0;
	}
	if (!i.length) return await t.out(`${W("remote.cmd.none")}\n`), 0;
	for (let [e, n] of i.entries()) {
		let r = n.attached ? W("remote.cmd.shownNow") : n.closesAt ? W("remote.cmd.closesIn", { n: Math.max(1, Math.round((n.closesAt - Date.now()) / 6e4)) }) : "";
		await t.out(`${String(e + 1).padStart(2)}  ${n.name}  \x1b[2m${n.address} · ${U.date(n.created, { timeStyle: "short" })}${r ? ` · ${r}` : ""}${n.title ? ` · ${n.title}` : ""}\x1b[0m\n`);
	}
	return await t.out(`\x1b[2m${W("remote.cmd.resumeHint")}\x1b[0m\n`), 0;
}
var sh = [
	{
		name: "ssh",
		get usage() {
			return W("help.ssh.usage");
		},
		get summary() {
			return W("help.ssh.summary");
		},
		run: ih
	},
	{
		name: "telnet",
		get usage() {
			return W("help.telnet.usage");
		},
		get summary() {
			return W("help.telnet.summary");
		},
		run: ih
	},
	{
		name: "rlogin",
		get usage() {
			return W("help.rlogin.usage");
		},
		get summary() {
			return W("help.rlogin.summary");
		},
		run: ih
	},
	{
		name: "supdup",
		get usage() {
			return W("help.supdup.usage");
		},
		get summary() {
			return W("help.supdup.summary");
		},
		run: ih
	},
	{
		name: "sessions",
		get usage() {
			return W("help.sessions.usage");
		},
		get summary() {
			return W("help.sessions.summary");
		},
		run: oh
	}
], ch = /^[a-z][\w.-]{0,39}$/, lh = /* @__PURE__ */ new Map();
for (let e of op) lh.set(e.name, Object.assign(e, { builtin: !0 }));
for (let e of [
	...Kp,
	...xm,
	...Dm,
	...Lm,
	...Zm,
	...sh
]) lh.set(e.name, e);
function uh() {
	let e = /* @__PURE__ */ new Map();
	for (let t of h()) {
		let n = t.package?.manifest?.contributes?.shell;
		if (Array.isArray(n)) for (let r of n.slice(0, 50)) r && ch.test(r.name ?? "") && typeof r.entry == "string" && !lh.has(r.name) && !e.has(r.name) && e.set(r.name, {
			name: r.name,
			app: t.name,
			summary: typeof r.summary == "string" ? r.summary.slice(0, 120) : W("appCmd.summary", { app: t.name }),
			usage: typeof r.usage == "string" ? r.usage.slice(0, 200) : W("appCmd.usage", { name: r.name }),
			ownHelp: r.help === !0,
			run: (e) => dh(e, t.id, r.entry)
		});
	}
	return e;
}
async function dh(e, t, n) {
	let r = e.shell, a = e.stdin === r.host.stdin ? null : await e.stdin.readAll(), o;
	try {
		o = await p(t, n, {
			command: e.name,
			args: e.args,
			stdin: a,
			cwd: i.path(e.cwd),
			env: r.environment()
		}, { from: "terminal" });
	} catch (e) {
		throw new X(e?.message ?? String(e));
	}
	return o == null ? 0 : typeof o == "string" ? (await e.out(o), 0) : (typeof o.stdout == "string" && await e.out(o.stdout), typeof o.stderr == "string" && await e.err(o.stderr), Number.isInteger(o.code) ? (o.code % 256 + 256) % 256 : 0);
}
var fh = {
	get: (e) => lh.get(e) ?? uh().get(e) ?? null,
	has: (e) => lh.has(e) || uh().has(e),
	names: () => [...lh.keys(), ...uh().keys()],
	values: () => [...lh.values(), ...uh().values()]
}, ph = /\x1b\[([0-9;?]*)([A-Za-z])|\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)|\x1b[()][0-9A-Za-z]|\x1b./g, mh = [
	0,
	95,
	135,
	175,
	215,
	255
];
function hh(e) {
	if (e < 16) return { cls: e };
	if (e >= 232) {
		let t = 8 + (e - 232) * 10;
		return { css: `rgb(${t},${t},${t})` };
	}
	let t = e - 16;
	return { css: `rgb(${mh[Math.floor(t / 36)]},${mh[Math.floor(t / 6) % 6]},${mh[t % 6]})` };
}
var gh = class {
	style = {};
	write(e, t, n = null, r = () => {}) {
		let i = 0;
		ph.lastIndex = 0;
		for (let a; a = ph.exec(e);) this.#e(e.slice(i, a.index), t, n), i = ph.lastIndex, a[2] === "m" ? this.#t(a[1]) : a[2] === "J" && (a[1] === "2" || a[1] === "3") && r();
		this.#e(e.slice(i), t, n);
	}
	#e(e, t, n) {
		if (e = e.replace(/\r\n/g, "\n").replace(/[\x00-\x08\x0b-\x1f\x7f]/g, ""), !e) return;
		let r = JSON.stringify(this.style), i = n ? n.previousSibling : t.lastChild;
		if (i?.nodeType === 1 && i.dataset.style === r) {
			i.textContent += e;
			return;
		}
		let a = this.style, o;
		if (r === "{}") o = document.createElement("span");
		else {
			o = document.createElement("span");
			let e = a.inverse ? a.bg ?? { cls: "bg" } : a.fg, t = a.inverse ? a.fg ?? { cls: "fg" } : a.bg;
			e?.cls == null ? e?.css && (o.style.color = e.css) : o.classList.add(`tm-c${e.cls}`), t?.cls == null ? t?.css && (o.style.backgroundColor = t.css) : o.classList.add(`tm-b${t.cls}`), a.bold && o.classList.add("tm-bold"), a.dim && o.classList.add("tm-dim"), a.italic && o.classList.add("tm-italic"), a.underline && o.classList.add("tm-underline"), a.strike && o.classList.add("tm-strike");
		}
		o.dataset.style = r, o.textContent = e, t.insertBefore(o, n);
	}
	#t(e) {
		let t = e === "" ? [0] : e.split(";").map(Number), n = { ...this.style };
		for (let e = 0; e < t.length; e++) {
			let r = t[e];
			if (r === 0) for (let e of Object.keys(n)) delete n[e];
			else if (r === 1) n.bold = !0;
			else if (r === 2) n.dim = !0;
			else if (r === 3) n.italic = !0;
			else if (r === 4) n.underline = !0;
			else if (r === 7) n.inverse = !0;
			else if (r === 9) n.strike = !0;
			else if (r === 22) delete n.bold, delete n.dim;
			else if (r === 23) delete n.italic;
			else if (r === 24) delete n.underline;
			else if (r === 27) delete n.inverse;
			else if (r === 29) delete n.strike;
			else if (r >= 30 && r <= 37) n.fg = { cls: r - 30 };
			else if (r >= 90 && r <= 97) n.fg = { cls: r - 90 + 8 };
			else if (r >= 40 && r <= 47) n.bg = { cls: r - 40 };
			else if (r >= 100 && r <= 107) n.bg = { cls: r - 100 + 8 };
			else if (r === 39) delete n.fg;
			else if (r === 49) delete n.bg;
			else if (r === 38 || r === 48) {
				let i = r === 38 ? "fg" : "bg";
				if (t[e + 1] === 5) n[i] = hh(t[e + 2] ?? 0), e += 2;
				else if (t[e + 1] === 2) {
					let [r, a, o] = t.slice(e + 2, e + 5).map((e) => Math.max(0, Math.min(255, e || 0)));
					n[i] = { css: `rgb(${r},${a},${o})` }, e += 4;
				}
			}
		}
		this.style = n;
	}
	reset() {
		this.style = {};
	}
}, _h = /[\s'"\\$`|&;<>()*?[\]{}!#]/g, vh = (e) => e.replace(_h, "\\$&");
function yh(e, t, n) {
	let r = t.slice(0, n), a = n;
	for (; a > 0 && !(/[\s|&;<>()]/.test(r[a - 1]) && r[a - 2] !== "\\");) a--;
	let o = r.slice(a).replace(/\\(.)/g, "$1").replace(/^['"]/, ""), s = r.slice(0, a).trimEnd(), c = !s || /(^|[|&;(]|\$\(|\b(then|do|else|elif|if|while|until|sudo|xargs|time|command|which|type|help))$/.test(s), l = /\$\{?([A-Za-z_]\w*)?$/.exec(o);
	if (l) {
		let t = l[1] ?? "", r = o.slice(0, o.length - t.length), i = e.variables().map(([e]) => e).filter((e) => e.startsWith(t)).map((e) => ({
			value: r + e + (r.endsWith("{") ? "}" : ""),
			label: e
		}));
		return {
			start: a,
			end: n,
			items: i
		};
	}
	if (c && !o.includes("/")) {
		let t = [.../* @__PURE__ */ new Set([
			...e.commands.names(),
			...e.functions.keys(),
			...e.aliases.keys()
		])].filter((e) => e.startsWith(o)).sort(Au).map((e) => ({
			value: vh(e),
			label: e
		}));
		if (t.length || !o) return {
			start: a,
			end: n,
			items: t
		};
	}
	let u = o.lastIndexOf("/"), d = u >= 0 ? o.slice(0, u + 1) : "", f = u >= 0 ? o.slice(u + 1) : o, p = d || ".";
	(p === "~/" || p.startsWith("~/")) && (p = (e.getVar("HOME") ?? i.home) + p.slice(1));
	let m = Tu(e.cwd, p);
	if (m?.type !== "folder") return {
		start: a,
		end: n,
		items: []
	};
	let h = f.toLowerCase(), g = i.children(m.id).filter((e) => e.name.toLowerCase().startsWith(h) && (f.startsWith(".") || !e.name.startsWith("."))).sort((e, t) => Au(e.name, t.name)).map((e) => ({
		value: vh(d) + vh(e.name) + (e.type === "folder" ? "/" : ""),
		label: e.name + (e.type === "folder" ? "/" : ""),
		folder: e.type === "folder"
	}));
	return {
		start: a,
		end: n,
		items: g
	};
}
function bh(e) {
	if (!e.length) return "";
	let t = e[0];
	for (let n of e.slice(1)) {
		let e = 0;
		for (; e < t.length && e < n.length && t[e].toLowerCase() === n[e].toLowerCase();) e++;
		t = t.slice(0, e);
	}
	return t;
}
// src/terminal/preview.js
var xh = 512, Sh = 16, Ch = 2048, wh = "#2b3038", Th = {
	ssh: [
		"SSH",
		"#dff3ec",
		"#1d6f57"
	],
	telnet: [
		"TELNET",
		"#fdeccf",
		"#8a5a0f"
	],
	rlogin: [
		"RLOGIN",
		"#ece6fb",
		"#5b3fae"
	],
	supdup: [
		"SUPDUP",
		"#fbe3e6",
		"#a2283a"
	]
};
function Eh({ lilos: e }) {
	e.handle(async (t) => {
		if (typeof t?.file != "string") return null;
		let n;
		try {
			n = Ku(await e.files.read(t.file));
		} catch {
			return null;
		}
		let r = Number.isFinite(t.size) ? Math.min(Ch, Math.max(Sh, Math.round(t.size))) : xh;
		return {
			image: await Dh(n, r),
			note: Qu(n)
		};
	});
}
async function Dh(e, t) {
	let n = document.createElement("canvas");
	n.width = n.height = t;
	let r = n.getContext("2d"), i = t / 100;
	r.fillStyle = e.protocol === "local" ? "#3b4049" : wh, r.fillRect(14 * i, 10 * i, 72 * i, 72 * i), r.strokeStyle = "#ffffff", r.lineWidth = 6 * i, r.lineCap = "round", r.lineJoin = "round", r.beginPath(), r.moveTo(32 * i, 34 * i), r.lineTo(44 * i, 46 * i), r.lineTo(32 * i, 58 * i), r.moveTo(50 * i, 58 * i), r.lineTo(66 * i, 58 * i), r.stroke();
	let a = Th[e.protocol] ?? (e.protocol === "local" ? null : [
		e.protocol.toUpperCase().slice(0, 8),
		"#e9ecf1",
		"#59606c"
	]);
	if (a) {
		let [e, t, n] = a;
		r.font = `700 ${11 * i}px system-ui, "Segoe UI", sans-serif`;
		let o = r.measureText(e).width + 8 * i, s = Math.min(96 * i - o, 86 * i - o / 2), c = 76 * i, l = 17 * i;
		r.fillStyle = "#ffffff", r.fillRect(s - 1.5 * i, c - 1.5 * i, o + 3 * i, l + 3 * i), r.fillStyle = t, r.fillRect(s, c, o, l), r.fillStyle = n, r.textBaseline = "middle", r.fillText(e, s + 4 * i, c + l / 2 + .5 * i);
	}
	let o = (e) => new Promise((t) => n.toBlob(t, e, .9)), s = await o("image/webp");
	return s?.type === "image/webp" ? s : o("image/png");
}
// src/terminal/TerminalApp.js
var Oh = "terminal.history", kh = 4e5, Ah = ".bashrc", jh = 4e3, Mh = () => e.automation ?? null;
function Nh({ args: e, openWindow: t } = {}) {
	return Ph(e, t);
}
function Ph(e, t) {
	let n = e?.size, i = new r({
		title: W("ui.title"),
		icon: "terminal",
		width: n?.w ?? 760,
		height: n?.h ?? 460,
		minWidth: 360,
		minHeight: 200
	}), a = new _d(i, e, {
		openWindow: t,
		makeShell: (e, t) => new Rh(e, t),
		makeWindow: (e, n) => {
			let r = Ph(e, t);
			return t(r, null, {
				main: !0,
				at: n
			}), r.terminal;
		}
	});
	return i.terminal = a, i.getState = () => a.state(), i.on("launch", (e) => a.launched(e)), Mh()?.handle("terminal.run", (e) => {
		let t = a.current && !a.current.remote ? a.current : a.firstLocal();
		return t || a.add(t = new Rh(a, {})), a.select(t), t.replay(e);
	}, {
		window: i,
		file: () => null
	}), i;
}
var Fh = {
	enter: "\r",
	complete: "	",
	interrupt: "",
	eof: "",
	clear: "\f",
	home: "\x1B[H",
	end: "\x1B[F",
	killBefore: "",
	killAfter: "\v",
	deleteWord: "",
	backspace: "",
	delete: "\x1B[3~",
	left: "\x1B[D",
	right: "\x1B[C",
	wordLeft: "\x1B[1;5D",
	wordRight: "\x1B[1;5C",
	up: "\x1B[A",
	down: "\x1B[B",
	escape: "\x1B"
}, Ih = [
	...Object.entries(Fh).map(([e, t]) => [t, e]),
	["\n", "enter"],
	["", "home"],
	["", "end"],
	["\b", "backspace"],
	["\x1BOH", "home"],
	["\x1BOF", "end"],
	["\x1B[1~", "home"],
	["\x1B[4~", "end"],
	["\x1BOA", "up"],
	["\x1BOB", "down"],
	["\x1BOC", "right"],
	["\x1BOD", "left"]
].sort((e, t) => t[0].length - e[0].length), Lh = class extends Nf {
	silent = !1;
	constructor(e) {
		super(), this.term = e;
	}
	pull() {
		return this.term.readInput(this);
	}
}, Rh = class {
	remote = !1;
	text = "";
	cursor = 0;
	pending = "";
	running = !1;
	queue = [];
	reader = null;
	#e = "";
	#t = 0;
	#n = -1;
	#r = "";
	#i = 0;
	#a = 0;
	#o = null;
	#s = new AbortController();
	constructor(e, t) {
		this.owner = e, this.#c = t?.quiet === !0, this.ansi = new gh();
		let { signal: n } = this.#s;
		this.edit = a("span", { class: "tm-edit" }), this.output = a("div", {
			class: "tm-out",
			role: "log",
			"aria-live": "polite"
		}, this.edit), this.input = a("textarea", {
			class: "tm-input",
			spellcheck: "false",
			autocapitalize: "off",
			autocomplete: "off",
			autocorrect: "off",
			rows: "1",
			"aria-label": W("ui.commandLine")
		}), this.screen = a("div", { class: "tm-screen" }, this.output, this.input), this.el = a("div", {
			class: "tm-pane tm-local",
			role: "tabpanel"
		}, this.screen), this.input.addEventListener("keydown", (e) => this.#v(e), { signal: n }), this.input.addEventListener("input", (e) => this.#p(e), { signal: n }), this.input.addEventListener("paste", (e) => this.#m(e), { signal: n }), this.input.addEventListener("focus", () => this.screen.classList.add("focused"), { signal: n }), this.input.addEventListener("blur", () => this.screen.classList.remove("focused"), { signal: n }), this.screen.addEventListener("mouseup", () => {
			String(getSelection()).length || this.focus();
		}, { signal: n }), this.resizes = new ResizeObserver(() => {
			this.#a = 0;
		}), this.resizes.observe(this.screen), this.history = zh();
		let r = new zf((e) => this.write(e));
		this.host = {
			stdin: new Lh(this),
			stdout: r,
			stderr: r,
			clear: () => this.clear(),
			columns: () => this.columns(),
			history: {
				list: () => [...this.history],
				clear: () => {
					this.history = [], Bh([]);
				}
			}
		}, Object.defineProperty(this.host, "remote", {
			get: () => this.owner.remote,
			enumerable: !0
		}), this.shell = new Gf({
			host: this.host,
			commands: fh
		}), t?.cwd && i.get(t.cwd)?.type === "folder" && (this.shell.cwd = t.cwd), this.shell.setVar("PS1", "\\[\\e[1;32m\\]\\u@\\h\\[\\e[0m\\]:\\[\\e[1;34m\\]\\w\\[\\e[0m\\]\\$ "), typeof t?.run == "string" && t.run.trim() && this.queue.push(t.run), this.#A(), this.ready = this.#l();
	}
	#c = !1;
	get name() {
		return Du(this.shell.cwd);
	}
	get subtitle() {
		return Du(this.shell.cwd);
	}
	get closed() {
		return !1;
	}
	activity = !1;
	show() {
		this.el.hidden = !1, requestAnimationFrame(() => {
			this.scrollToEnd(), this.focus();
		});
	}
	hide() {
		this.el.hidden = !0;
	}
	reflow() {
		this.el.hidden || this.scrollToEnd();
	}
	state() {
		return {
			kind: "local",
			cwd: this.shell.cwd
		};
	}
	receive(e) {
		let t = String(e), n = "", r = () => {
			n &&= (this.#h(n), "");
		};
		for (let e = 0; e < t.length;) {
			let i = Ih.find(([n]) => t.startsWith(n, e));
			if (i && !(i[0] === "\x1B" && e + 1 < t.length)) {
				r(), this.#b(i[1]), e += i[0].length;
				continue;
			}
			let a = t.charCodeAt(e);
			a === 27 ? (r(), e += /^\x1b(?:\[[0-9;?]*[ -/]*[@-~]|O.|.)?/.exec(t.slice(e))[0].length) : a < 32 || a === 127 ? (r(), e++) : n += t[e++];
		}
		r();
	}
	dispose() {
		this.#s.abort(), this.resizes.disconnect(), cancelAnimationFrame(this.#t), this.#o?.abort();
		for (let e of this.shell.jobs.list) e.token.abort();
		this.reader?.reject(new Sd());
	}
	async #l() {
		this.#c || this.write(`\x1b[2m${W("ui.welcome")}\x1b[0m\n`), this.shell.resolve(`~/${Ah}`)?.type === "file" ? await this.#D(`source ~/${Ah}`, { record: !1 }) : (this.prompt(), this.#T()), requestAnimationFrame(() => {
			this.el.hidden || this.focus();
		});
	}
	focus() {
		this.input.focus({ preventScroll: !0 });
	}
	write(e) {
		this.#e += e, this.#e.length > 1 << 18 ? this.flush() : this.#t ||= requestAnimationFrame(() => this.flush());
	}
	flush() {
		if (cancelAnimationFrame(this.#t), this.#t = 0, !this.#e) return;
		let e = this.#e;
		this.#e = "";
		let t = this.#d();
		this.ansi.write(e, this.output, this.edit, () => this.clear()), this.#u(), t && this.scrollToEnd();
	}
	#u() {
		let e = this.output.textContent.length;
		for (; e > kh && this.output.firstChild !== this.edit;) e -= this.output.firstChild.textContent.length, this.output.firstChild.remove();
	}
	#d() {
		return this.screen.scrollHeight - this.screen.scrollTop - this.screen.clientHeight < 40;
	}
	scrollToEnd() {
		this.screen.scrollTop = this.screen.scrollHeight;
	}
	clear() {
		for (this.#e = ""; this.output.firstChild !== this.edit;) this.output.firstChild.remove();
		this.screen.scrollTop = 0;
	}
	columns() {
		if (!this.#a) {
			let e = a("span", { class: "tm-probe" }, "MMMMMMMMMM");
			this.screen.append(e), this.#a = e.getBoundingClientRect().width / 10 || 8, e.remove();
		}
		return Math.max(20, Math.floor((this.screen.clientWidth - 24) / this.#a));
	}
	promptText(e = "PS1") {
		let t = this.shell.getVar(e) ?? "$ ", n = c.user?.username || this.shell.getVar("USER") || W("shell.defaultUser"), r = /* @__PURE__ */ new Date(), a = (e) => String(e).padStart(2, "0");
		return t.replace(/\\([uhHwW$nte\\[\]dA@])/g, (e, t) => ({
			u: n,
			h: this.shell.getVar("HOSTNAME") ?? "lilos",
			H: this.shell.getVar("HOSTNAME") ?? "lilos",
			w: Du(this.shell.cwd),
			W: this.shell.cwd === i.root ? "~" : i.get(this.shell.cwd)?.name ?? "~",
			$: "$",
			n: "\n",
			e: "\x1B",
			"\\": "\\",
			"[": "",
			"]": "",
			t: `${a(r.getHours())}:${a(r.getMinutes())}:${a(r.getSeconds())}`,
			A: `${a(r.getHours())}:${a(r.getMinutes())}`,
			d: U.date(r, {
				weekday: "short",
				day: "numeric",
				month: "short"
			}),
			"@": U.date(r, { timeStyle: "medium" })
		})[t]);
	}
	prompt() {
		for (let e of this.shell.reapJobs()) this.write(e);
		this.flush(), this.ansi.reset(), this.write(this.promptText(this.pending ? "PS2" : "PS1")), this.flush(), this.renderLine(), this.scrollToEnd();
	}
	renderLine() {
		let e = this.reader?.reader.silent, t = e ? "" : this.text, n = e ? 0 : this.cursor, r = a("span", { class: "tm-cursor" }, t[n] ?? " ");
		this.edit.replaceChildren(t.slice(0, n), r, t.slice(n + 1)), this.edit.hidden = this.running && !this.reader && !this.text;
	}
	setLine(e, t = e.length) {
		this.text = e, this.cursor = Math.max(0, Math.min(t, e.length)), this.#i = 0, this.renderLine();
	}
	#f(e) {
		this.write((this.reader?.reader.silent ? "" : e) + "\n"), this.setLine(""), this.flush();
	}
	#p(e) {
		if (e.isComposing) return;
		let t = this.input.value;
		if (this.input.value = "", !t) return;
		let n = t.replace(/\r\n?/g, "\n").split("\n");
		this.owner.typed?.(this, n.join("\r")), this.#h(n[0]), n.length > 1 && this.#g(n.slice(1));
	}
	#m(e) {
		let t = e.clipboardData?.getData("text/plain");
		if (t == null) return;
		e.preventDefault(), this.owner.typed?.(this, t.replace(/\r\n?/g, "\n").replace(/\n/g, "\r"));
		let n = t.replace(/\r\n?/g, "\n").split("\n");
		this.#h(n[0]), n.length > 1 && this.#g(n.slice(1));
	}
	#h(e) {
		e && (this.setLine(this.text.slice(0, this.cursor) + e + this.text.slice(this.cursor), this.cursor + e.length), this.scrollToEnd());
	}
	#g(e) {
		let t = e.pop();
		this.#w();
		for (let t of e) this.queue.push(t);
		t && (this.running || this.queue.length ? this.#_ = t : this.#h(t)), this.#T();
	}
	#_ = "";
	#v(e) {
		if (Jl(e)) return;
		let t = e.ctrlKey && !e.altKey && !e.metaKey, n = e.ctrlKey && e.key.length === 1 ? e.key.toLowerCase() : e.key;
		if (n !== "Tab" && (this.#i = 0), e.isComposing) return;
		let r = this.#y(n, t);
		r && (r === "interrupt" && String(getSelection()).length || (e.preventDefault(), e.stopPropagation(), Fh[r] && this.owner.typed?.(this, Fh[r]), this.#b(r)));
	}
	#y(e, t) {
		if (e === "Enter") return "enter";
		if (e === "Tab") return "complete";
		if (t) {
			let t = {
				c: "interrupt",
				d: "eof",
				l: "clear",
				a: "home",
				e: "end",
				u: "killBefore",
				k: "killAfter",
				w: "deleteWord",
				Backspace: "deleteWord",
				ArrowLeft: "wordLeft",
				ArrowRight: "wordRight"
			}[e];
			if (t) return t;
		}
		return {
			Backspace: "backspace",
			Delete: "delete",
			ArrowLeft: "left",
			ArrowRight: "right",
			Home: "home",
			End: "end",
			ArrowUp: "up",
			ArrowDown: "down",
			PageUp: "pageUp",
			PageDown: "pageDown",
			Escape: "escape"
		}[e] ?? null;
	}
	#b(e) {
		switch (e) {
			case "enter": return this.#w();
			case "complete": return this.#S();
			case "interrupt": return this.#C();
			case "eof":
				this.reader ? (this.#f(this.text), this.#k(null)) : !this.running && !this.text && !this.pending ? this.#j() : this.text && this.setLine(this.text.slice(0, this.cursor) + this.text.slice(this.cursor + 1), this.cursor);
				return;
			case "clear":
				this.clear(), this.running || this.prompt();
				return;
			case "home": return this.setLine(this.text, 0);
			case "end": return this.setLine(this.text, this.text.length);
			case "killBefore": return this.setLine(this.text.slice(this.cursor), 0);
			case "killAfter": return this.setLine(this.text.slice(0, this.cursor));
			case "deleteWord": {
				let e = this.text.slice(0, this.cursor).replace(/\S+\s*$/, "");
				return this.setLine(e + this.text.slice(this.cursor), e.length);
			}
			case "backspace":
				this.cursor > 0 && this.setLine(this.text.slice(0, this.cursor - 1) + this.text.slice(this.cursor), this.cursor - 1);
				return;
			case "delete": return this.setLine(this.text.slice(0, this.cursor) + this.text.slice(this.cursor + 1), this.cursor);
			case "left": return this.setLine(this.text, this.cursor - 1);
			case "right": return this.setLine(this.text, this.cursor + 1);
			case "wordLeft": return this.setLine(this.text, this.text.slice(0, this.cursor).replace(/\S+\s*$/, "").length);
			case "wordRight": {
				let e = /^\s*\S+/.exec(this.text.slice(this.cursor));
				return this.setLine(this.text, this.cursor + (e ? e[0].length : this.text.length));
			}
			case "up": return this.#x(-1);
			case "down": return this.#x(1);
			case "pageUp":
				this.screen.scrollTop -= this.screen.clientHeight * .9;
				return;
			case "pageDown":
				this.screen.scrollTop += this.screen.clientHeight * .9;
				return;
		}
	}
	#x(e) {
		if (this.reader) return;
		this.#n < 0 && (this.#r = this.text, this.#n = this.history.length);
		let t = this.#n + e;
		t < 0 || t > this.history.length || (this.#n = t, this.setLine(t === this.history.length ? this.#r : this.history[t]));
	}
	#S() {
		if (this.reader) return;
		let { start: e, end: t, items: n } = yh(this.shell, this.text, this.cursor);
		if (this.#i++, !n.length) return;
		let r = (n) => this.setLine(this.text.slice(0, e) + n + this.text.slice(t), e + n.length);
		if (n.length === 1) {
			let e = n[0];
			r(e.value + (e.folder || /[}/]$/.test(e.value) ? "" : " "));
			return;
		}
		let i = bh(n.map((e) => e.value)), a = this.text.slice(e, t);
		if (i.length > a.length) {
			r(i), this.#i = 1;
			return;
		}
		if (this.#i < 2) return;
		let o = this.text, s = this.cursor;
		this.#f(o), this.write(Sp(n.map((e) => ({
			text: e.label,
			plain: e.label
		})), this.columns())), this.prompt(), this.setLine(o, s), this.#i = 0;
	}
	#C() {
		this.running ? (this.write("^C"), this.reader ? this.#f("") : this.write("\n"), this.queue = [], this.#_ = "", this.#o?.abort()) : (this.write(this.text + "^C\n"), this.pending = "", this.queue = [], this.setLine(""), this.shell.status = 130, this.prompt());
	}
	#w() {
		let e = this.text;
		this.#n = -1, this.reader ? (this.#f(e), this.#k(e + "\n")) : this.running ? (this.queue.push(e), this.setLine("")) : (this.#f(e), this.#E(e));
	}
	#T() {
		for (; !this.running && this.queue.length;) {
			let e = this.queue.shift();
			this.write(e + "\n"), this.#E(e);
		}
		!this.running && !this.queue.length && this.#_ && (this.#h(this.#_), this.#_ = "");
	}
	#E(e) {
		let t = this.pending ? `${this.pending}\n${e}` : e;
		this.#D(t, { record: !0 });
	}
	async #D(e, { record: t, replay: n = !1 }) {
		if (!e.trim()) return this.pending = "", this.prompt(), {
			status: 0,
			error: ""
		};
		let r = this.shell.cwd;
		this.running = !0, this.renderLine(), this.#o = new Td(), this.shell.token = this.#o, this.host.stdin = new Lh(this);
		let i = "", a = n ? {
			...this.host,
			stderr: new zf((e) => {
				i = (i + e).slice(-2e3), this.write(e);
			})
		} : this.host, o = !1;
		try {
			let t = () => this.shell.run(e, a);
			await (Mh()?.quiet(t) ?? t());
		} catch (e) {
			if (e instanceof Y && !n) o = !0;
			else if (e instanceof Y) a.stderr.write(`bash: ${e.message || W("parse.unexpectedEndOfFile")}\n`), this.shell.status = 2;
			else if (e instanceof wd) a.stderr.write(`bash: ${e.message}\n`), this.shell.status = 2;
			else if (e instanceof xd) return this.flush(), this.#j(), {
				status: e.code ?? 0,
				error: i
			};
			else e instanceof Sd ? this.shell.status = 130 : (a.stderr.write(`bash: ${e?.message ?? e}\n`), this.shell.status = 1);
		}
		let s = this.shell.status;
		return this.pending = o ? e : "", t && !o && this.#O(e), t && !o && s === 0 && Mh()?.recording && !/^\s*automata(\s|$)/.test(e) && (await new Promise((e) => setTimeout(e)), e.length > jh ? Mh()?.missed("terminal", W("automation.tooLong")) : Mh()?.record("terminal.run", { params: {
			command: e,
			folder: r
		} })), this.running = !1, this.reader = null, this.#A(), this.flush(), /\n$/.test(this.edit.previousSibling?.textContent ?? "\n") || this.write("\n"), this.prompt(), this.#T(), {
			status: s,
			error: i
		};
	}
	async replay({ command: e = "", folder: t = null } = {}) {
		if (await this.ready, !e.trim()) throw Error(W("automation.noCommand"));
		if (this.running || this.pending) throw Error(W("automation.busy"));
		if (t && i.get(t)?.type !== "folder") throw Error(W("automation.noFolder"));
		let n = {
			text: this.text,
			cursor: this.cursor
		};
		if (this.setLine(""), t && t !== this.shell.cwd) {
			let e = Du(t);
			this.write(`cd ${e.startsWith("~/") ? `~/${Yf(e.slice(2))}` : Yf(e)}\n`), this.shell.cwd = t, this.#A(), this.prompt();
		}
		this.#f(e);
		let { status: r, error: a } = await this.#D(e, {
			record: !1,
			replay: !0
		});
		if (n.text && !this.running && !this.text && this.setLine(n.text, n.cursor), r !== 0) {
			let e = a.replace(/\x1b\[[0-9;]*m/g, "").trim().split("\n").at(-1);
			throw Error(e || W("automation.status", { status: r }));
		}
	}
	#O(e) {
		let t = e.trim();
		t && !e.startsWith(" ") && this.history.at(-1) !== t && (this.history = [...zh().filter((e) => e !== t), t].slice(-1e3), Bh(this.history));
	}
	readInput(e) {
		if (this.queue.length) {
			let t = this.queue.shift();
			return this.write((e.silent ? "" : t) + "\n"), Promise.resolve(t + "\n");
		}
		return this.flush(), new Promise((t, n) => {
			let r = this.#o?.onAbort(() => {
				this.reader = null, n(new Sd());
			});
			this.reader = {
				reader: e,
				resolve: (e) => {
					r?.(), t(e);
				},
				reject: (e) => {
					r?.(), n(e);
				}
			}, this.renderLine(), this.scrollToEnd();
		});
	}
	#k(e) {
		let t = this.reader;
		this.reader = null, this.renderLine(), t?.resolve(e);
	}
	changeDir(e) {
		this.shell.cwd = e, this.#A(), this.running || (this.write(`\ncd ${Du(e)}\n`), this.prompt());
	}
	#A() {
		this.owner.tabChanged(this);
	}
	#j() {
		this.running = !0, this.renderLine(), this.owner.closeTab(this);
	}
};
function zh() {
	let e = l.get(Oh, []);
	return Array.isArray(e) ? e.filter((e) => typeof e == "string").slice(-1e3) : [];
}
var Bh = (e) => l.set(Oh, e);
export { Nh as default, Eh as filePreview };
