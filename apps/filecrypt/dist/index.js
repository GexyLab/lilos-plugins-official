// src/shared/sandbox/dom.js
function e(e, t = {}, ...n) {
	let r = document.createElement(e);
	for (let [e, n] of Object.entries(t ?? {})) n != null && n !== !1 && (e === "class" ? r.className = n : e.startsWith("on") && typeof n == "function" ? r.addEventListener(e.slice(2), n) : e in r && typeof n != "string" ? r[e] = n : r.setAttribute(e, n === !0 ? "" : String(n)));
	return r.append(...n.flat(Infinity).filter((e) => e != null && e !== !1).map((e) => e instanceof Node ? e : document.createTextNode(String(e)))), r;
}
function t(e, { gap: t = 12, overflow: n = "hidden" } = {}) {
	let r = `.${e}`;
	return `
  :host, body { margin: 0; }
  ${r} { box-sizing: border-box; height: 100%; overflow: ${n}; padding: 18px 20px; display: flex; flex-direction: column; gap: ${t}px; color: var(--text); font: 13px/1.45 var(--font, system-ui); }
  ${r} * { box-sizing: border-box; }
  ${r} h1 { font-size: 15px; font-weight: 600; margin: 0; overflow-wrap: anywhere; }
  ${r} p { margin: 0; color: var(--dim); }
  ${r} .hint { font-size: 12px; color: var(--dim); }
  ${r} .row { display: flex; gap: 8px; align-items: center; justify-content: flex-end; flex-wrap: wrap; }
  ${r} button { font: inherit; padding: 6px 14px; border-radius: var(--radius-sm, 6px); border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; }
  ${r} button:hover:not(:disabled) { background: var(--hover); }
  ${r} button.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
  ${r} button.primary:hover:not(:disabled) { filter: brightness(1.08); background: var(--accent); }
  ${r} button:disabled { opacity: .55; cursor: default; }
  ${r} input, ${r} select { font: inherit; color: var(--text); background: var(--field-bg, var(--surface)); border: 1px solid var(--border); border-radius: var(--radius-sm, 6px); padding: 7px 9px; }
  ${r} button:focus-visible, ${r} input:focus-visible, ${r} select:focus-visible, ${r} summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  ${r} [aria-busy="true"] { cursor: progress; }
  ${r} .error { color: var(--danger, #d64545); }
  ${r} .warn { padding: 8px 10px; border-radius: var(--radius-sm, 6px); background: color-mix(in srgb, #e0a030 14%, transparent); color: var(--text); }
  ${r} ul { list-style: none; margin: 0; padding: 0; border: 1px solid var(--border); border-radius: var(--radius-sm, 6px); }
  ${r} li { display: flex; align-items: center; gap: 10px; padding: 6px 10px; }
  ${r} li + li { border-top: 1px solid var(--border); }
  ${r} li .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  ${r} .empty { padding: 12px 10px; color: var(--dim); }
`;
}
// src/filecrypt/ui.js
function n(t, n, r) {
	let i = e("select", { onchange: () => r?.(i.value) }, ...t.map(([t, n]) => e("option", { value: t }, n)));
	return i.value = String(n), i;
}
async function r(e) {
	let t = await e.app.connect("vault"), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), i = 1;
	return t.onmessage = (e) => {
		let t = e.data ?? {};
		if (t.status && t.id == null) return r.forEach((e) => e(t.status));
		let i = n.get(t.id);
		i && (n.delete(t.id), t.error ? i.reject(Error(t.error)) : i.resolve(t));
	}, {
		ask: (e) => new Promise((r, a) => {
			let o = i++;
			n.set(o, {
				resolve: r,
				reject: a
			}), t.postMessage({
				...e,
				id: o
			});
		}),
		onStatus: (e) => r.add(e),
		close: () => t.close()
	};
}
var i = t("fc", {
	gap: 14,
	overflow: "auto"
}) + "\n  .fc h2 { font-size: 12px; font-weight: 600; margin: 4px 0 0; color: var(--dim); text-transform: uppercase; letter-spacing: .04em; }\n  .fc .fc-form { display: flex; flex-direction: column; gap: 12px; }\n  .fc label { display: flex; flex-direction: column; gap: 5px; font-weight: 500; }\n  .fc .error { min-height: 1.45em; }\n  .fc .warn { padding: 9px 11px; background: color-mix(in srgb, var(--danger, #d64545) 10%, transparent); }\n  .fc .meter { display: flex; gap: 4px; }\n  .fc .meter span { flex: 1; height: 4px; border-radius: 2px; background: var(--border); }\n  .fc .meter[data-level=\"1\"] span:nth-child(-n+1) { background: #d64545; }\n  .fc .meter[data-level=\"2\"] span:nth-child(-n+2) { background: #e0a030; }\n  .fc .meter[data-level=\"3\"] span:nth-child(-n+3) { background: #7fb24a; }\n  .fc .meter[data-level=\"4\"] span { background: #3f9d5c; }\n  .fc .hint { font-weight: 400; }\n  .fc details { border: 1px solid var(--border); border-radius: var(--radius-sm, 6px); padding: 6px 10px; }\n  .fc details[open] { padding-bottom: 10px; }\n  .fc details > div { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }\n  .fc summary { cursor: pointer; font-weight: 500; }\n  .fc li { padding: 7px 10px; }\n  .fc li .when { color: var(--dim); font-size: 12px; }\n  .fc .settings { display: grid; grid-template-columns: 1fr; gap: 10px; }\n";
// node_modules/@noble/ciphers/esm/utils.js
function a(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function o(e) {
	if (typeof e != "boolean") throw Error(`boolean expected, not ${e}`);
}
function s(e) {
	if (!Number.isSafeInteger(e) || e < 0) throw Error("positive integer expected, got " + e);
}
function c(e, ...t) {
	if (!a(e)) throw Error("Uint8Array expected");
	if (t.length > 0 && !t.includes(e.length)) throw Error("Uint8Array expected of length " + t + ", got length=" + e.length);
}
function l(e, t = !0) {
	if (e.destroyed) throw Error("Hash instance has been destroyed");
	if (t && e.finished) throw Error("Hash#digest() has already been called");
}
function u(e, t) {
	c(e);
	let n = t.outputLen;
	if (e.length < n) throw Error("digestInto() expects output buffer of length at least " + n);
}
function d(e) {
	return new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
}
function f(...e) {
	for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function p(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
var m = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function h(e) {
	if (typeof e != "string") throw Error("string expected");
	return new Uint8Array(new TextEncoder().encode(e));
}
function g(e) {
	if (typeof e == "string") e = h(e);
	else if (a(e)) e = w(e);
	else throw Error("Uint8Array expected, got " + typeof e);
	return e;
}
function _(e, t) {
	if (typeof t != "object" || !t) throw Error("options must be defined");
	return Object.assign(e, t);
}
function v(e, t) {
	if (e.length !== t.length) return !1;
	let n = 0;
	for (let r = 0; r < e.length; r++) n |= e[r] ^ t[r];
	return n === 0;
}
var y = (e, t) => {
	function n(n, ...r) {
		if (c(n), !m) throw Error("Non little-endian hardware is not yet supported");
		if (e.nonceLength !== void 0) {
			let t = r[0];
			if (!t) throw Error("nonce / iv required");
			e.varSizeNonce ? c(t) : c(t, e.nonceLength);
		}
		let i = e.tagLength;
		i && r[1] !== void 0 && c(r[1]);
		let a = t(n, ...r), o = (e, t) => {
			if (t !== void 0) {
				if (e !== 2) throw Error("cipher output not supported");
				c(t);
			}
		}, s = !1;
		return {
			encrypt(e, t) {
				if (s) throw Error("cannot encrypt() twice with same key + nonce");
				return s = !0, c(e), o(a.encrypt.length, t), a.encrypt(e, t);
			},
			decrypt(e, t) {
				if (c(e), i && e.length < i) throw Error("invalid ciphertext length: smaller than tagLength=" + i);
				return o(a.decrypt.length, t), a.decrypt(e, t);
			}
		};
	}
	return Object.assign(n, e), n;
};
function b(e, t, n = !0) {
	if (t === void 0) return new Uint8Array(e);
	if (t.length !== e) throw Error("invalid output length, expected " + e + ", got: " + t.length);
	if (n && !C(t)) throw Error("invalid output, must be aligned");
	return t;
}
function x(e, t, n, r) {
	if (typeof e.setBigUint64 == "function") return e.setBigUint64(t, n, r);
	let i = BigInt(32), a = BigInt(4294967295), o = Number(n >> i & a), s = Number(n & a), c = r ? 4 : 0, l = r ? 0 : 4;
	e.setUint32(t + c, o, r), e.setUint32(t + l, s, r);
}
function S(e, t, n) {
	o(n);
	let r = /* @__PURE__ */ new Uint8Array(16), i = p(r);
	return x(i, 0, BigInt(t), n), x(i, 8, BigInt(e), n), r;
}
function C(e) {
	return e.byteOffset % 4 == 0;
}
function w(e) {
	return Uint8Array.from(e);
}
// node_modules/@noble/ciphers/esm/_arx.js
var T = (e) => Uint8Array.from(e.split("").map((e) => e.charCodeAt(0))), E = T("expand 16-byte k"), D = T("expand 32-byte k"), O = d(E), k = d(D);
function A(e, t) {
	return e << t | e >>> 32 - t;
}
function j(e) {
	return e.byteOffset % 4 == 0;
}
var M = 64, N = 16, P = 2 ** 32 - 1, F = /* @__PURE__ */ new Uint32Array();
function I(e, t, n, r, i, a, o, s) {
	let c = i.length, l = new Uint8Array(M), u = d(l), f = j(i) && j(a), p = f ? d(i) : F, m = f ? d(a) : F;
	for (let d = 0; d < c; o++) {
		if (e(t, n, r, u, o, s), o >= P) throw Error("arx: counter overflow");
		let h = Math.min(M, c - d);
		if (f && h === M) {
			let e = d / 4;
			if (d % 4 != 0) throw Error("arx: invalid block position");
			for (let t = 0, n; t < N; t++) n = e + t, m[n] = p[n] ^ u[t];
			d += M;
		} else {
			for (let e = 0, t; e < h; e++) t = d + e, a[t] = i[t] ^ l[e];
			d += h;
		}
	}
}
function L(e, t) {
	let { allowShortKeys: n, extendNonceFn: r, counterLength: i, counterRight: a, rounds: l } = _({
		allowShortKeys: !1,
		counterLength: 8,
		counterRight: !1,
		rounds: 20
	}, t);
	if (typeof e != "function") throw Error("core must be a function");
	return s(i), s(l), o(a), o(n), (t, o, u, p, m = 0) => {
		c(t), c(o), c(u);
		let h = u.length;
		if (p === void 0 && (p = new Uint8Array(h)), c(p), s(m), m < 0 || m >= P) throw Error("arx: counter overflow");
		if (p.length < h) throw Error(`arx: output (${p.length}) is shorter than data (${h})`);
		let g = [], _ = t.length, v, y;
		if (_ === 32) g.push(v = w(t)), y = k;
		else if (_ === 16 && n) v = /* @__PURE__ */ new Uint8Array(32), v.set(t), v.set(t, 16), y = O, g.push(v);
		else throw Error(`arx: invalid 32-byte key, got length=${_}`);
		j(o) || g.push(o = w(o));
		let b = d(v);
		if (r) {
			if (o.length !== 24) throw Error("arx: extended nonce must be 24 bytes");
			r(y, b, d(o.subarray(0, 16)), b), o = o.subarray(16);
		}
		let x = 16 - i;
		if (x !== o.length) throw Error(`arx: nonce must be ${x} or 16 bytes`);
		if (x !== 12) {
			let e = /* @__PURE__ */ new Uint8Array(12);
			e.set(o, a ? 0 : 12 - o.length), o = e, g.push(o);
		}
		let S = d(o);
		return I(e, y, b, S, u, p, m, l), f(...g), p;
	};
}
// node_modules/@noble/ciphers/esm/_poly1305.js
var R = (e, t) => e[t++] & 255 | (e[t++] & 255) << 8, z = class {
	constructor(e) {
		this.blockLen = 16, this.outputLen = 16, this.buffer = /* @__PURE__ */ new Uint8Array(16), this.r = /* @__PURE__ */ new Uint16Array(10), this.h = /* @__PURE__ */ new Uint16Array(10), this.pad = /* @__PURE__ */ new Uint16Array(8), this.pos = 0, this.finished = !1, e = g(e), c(e, 32);
		let t = R(e, 0), n = R(e, 2), r = R(e, 4), i = R(e, 6), a = R(e, 8), o = R(e, 10), s = R(e, 12), l = R(e, 14);
		this.r[0] = t & 8191, this.r[1] = (t >>> 13 | n << 3) & 8191, this.r[2] = (n >>> 10 | r << 6) & 7939, this.r[3] = (r >>> 7 | i << 9) & 8191, this.r[4] = (i >>> 4 | a << 12) & 255, this.r[5] = a >>> 1 & 8190, this.r[6] = (a >>> 14 | o << 2) & 8191, this.r[7] = (o >>> 11 | s << 5) & 8065, this.r[8] = (s >>> 8 | l << 8) & 8191, this.r[9] = l >>> 5 & 127;
		for (let t = 0; t < 8; t++) this.pad[t] = R(e, 16 + 2 * t);
	}
	process(e, t, n = !1) {
		let r = n ? 0 : 2048, { h: i, r: a } = this, o = a[0], s = a[1], c = a[2], l = a[3], u = a[4], d = a[5], f = a[6], p = a[7], m = a[8], h = a[9], g = R(e, t + 0), _ = R(e, t + 2), v = R(e, t + 4), y = R(e, t + 6), b = R(e, t + 8), x = R(e, t + 10), S = R(e, t + 12), C = R(e, t + 14), w = i[0] + (g & 8191), T = i[1] + ((g >>> 13 | _ << 3) & 8191), E = i[2] + ((_ >>> 10 | v << 6) & 8191), D = i[3] + ((v >>> 7 | y << 9) & 8191), O = i[4] + ((y >>> 4 | b << 12) & 8191), k = i[5] + (b >>> 1 & 8191), A = i[6] + ((b >>> 14 | x << 2) & 8191), j = i[7] + ((x >>> 11 | S << 5) & 8191), M = i[8] + ((S >>> 8 | C << 8) & 8191), N = i[9] + (C >>> 5 | r), P = 0, F = P + w * o + 5 * h * T + 5 * m * E + 5 * p * D + 5 * f * O;
		P = F >>> 13, F &= 8191, F += 5 * d * k + 5 * u * A + 5 * l * j + 5 * c * M + 5 * s * N, P += F >>> 13, F &= 8191;
		let I = P + w * s + T * o + 5 * h * E + 5 * m * D + 5 * p * O;
		P = I >>> 13, I &= 8191, I += 5 * f * k + 5 * d * A + 5 * u * j + 5 * l * M + 5 * c * N, P += I >>> 13, I &= 8191;
		let L = P + w * c + T * s + E * o + 5 * h * D + 5 * m * O;
		P = L >>> 13, L &= 8191, L += 5 * p * k + 5 * f * A + 5 * d * j + 5 * u * M + 5 * l * N, P += L >>> 13, L &= 8191;
		let z = P + w * l + T * c + E * s + D * o + 5 * h * O;
		P = z >>> 13, z &= 8191, z += 5 * m * k + 5 * p * A + 5 * f * j + 5 * d * M + 5 * u * N, P += z >>> 13, z &= 8191;
		let B = P + w * u + T * l + E * c + D * s + O * o;
		P = B >>> 13, B &= 8191, B += 5 * h * k + 5 * m * A + 5 * p * j + 5 * f * M + 5 * d * N, P += B >>> 13, B &= 8191;
		let V = P + w * d + T * u + E * l + D * c + O * s;
		P = V >>> 13, V &= 8191, V += k * o + 5 * h * A + 5 * m * j + 5 * p * M + 5 * f * N, P += V >>> 13, V &= 8191;
		let H = P + w * f + T * d + E * u + D * l + O * c;
		P = H >>> 13, H &= 8191, H += k * s + A * o + 5 * h * j + 5 * m * M + 5 * p * N, P += H >>> 13, H &= 8191;
		let U = P + w * p + T * f + E * d + D * u + O * l;
		P = U >>> 13, U &= 8191, U += k * c + A * s + j * o + 5 * h * M + 5 * m * N, P += U >>> 13, U &= 8191;
		let W = P + w * m + T * p + E * f + D * d + O * u;
		P = W >>> 13, W &= 8191, W += k * l + A * c + j * s + M * o + 5 * h * N, P += W >>> 13, W &= 8191;
		let G = P + w * h + T * m + E * p + D * f + O * d;
		P = G >>> 13, G &= 8191, G += k * u + A * l + j * c + M * s + N * o, P += G >>> 13, G &= 8191, P = (P << 2) + P | 0, P = P + F | 0, F = P & 8191, P >>>= 13, I += P, i[0] = F, i[1] = I, i[2] = L, i[3] = z, i[4] = B, i[5] = V, i[6] = H, i[7] = U, i[8] = W, i[9] = G;
	}
	finalize() {
		let { h: e, pad: t } = this, n = /* @__PURE__ */ new Uint16Array(10), r = e[1] >>> 13;
		e[1] &= 8191;
		for (let t = 2; t < 10; t++) e[t] += r, r = e[t] >>> 13, e[t] &= 8191;
		e[0] += r * 5, r = e[0] >>> 13, e[0] &= 8191, e[1] += r, r = e[1] >>> 13, e[1] &= 8191, e[2] += r, n[0] = e[0] + 5, r = n[0] >>> 13, n[0] &= 8191;
		for (let t = 1; t < 10; t++) n[t] = e[t] + r, r = n[t] >>> 13, n[t] &= 8191;
		n[9] -= 8192;
		let i = (r ^ 1) - 1;
		for (let e = 0; e < 10; e++) n[e] &= i;
		i = ~i;
		for (let t = 0; t < 10; t++) e[t] = e[t] & i | n[t];
		e[0] = (e[0] | e[1] << 13) & 65535, e[1] = (e[1] >>> 3 | e[2] << 10) & 65535, e[2] = (e[2] >>> 6 | e[3] << 7) & 65535, e[3] = (e[3] >>> 9 | e[4] << 4) & 65535, e[4] = (e[4] >>> 12 | e[5] << 1 | e[6] << 14) & 65535, e[5] = (e[6] >>> 2 | e[7] << 11) & 65535, e[6] = (e[7] >>> 5 | e[8] << 8) & 65535, e[7] = (e[8] >>> 8 | e[9] << 5) & 65535;
		let a = e[0] + t[0];
		e[0] = a & 65535;
		for (let n = 1; n < 8; n++) a = (e[n] + t[n] | 0) + (a >>> 16) | 0, e[n] = a & 65535;
		f(n);
	}
	update(e) {
		l(this), e = g(e), c(e);
		let { buffer: t, blockLen: n } = this, r = e.length;
		for (let i = 0; i < r;) {
			let a = Math.min(n - this.pos, r - i);
			if (a === n) for (; n <= r - i; i += n) this.process(e, i);
			else t.set(e.subarray(i, i + a), this.pos), this.pos += a, i += a, this.pos === n && (this.process(t, 0, !1), this.pos = 0);
		}
		return this;
	}
	destroy() {
		f(this.h, this.r, this.buffer, this.pad);
	}
	digestInto(e) {
		l(this), u(e, this), this.finished = !0;
		let { buffer: t, h: n } = this, { pos: r } = this;
		if (r) {
			for (t[r++] = 1; r < 16; r++) t[r] = 0;
			this.process(t, 0, !0);
		}
		this.finalize();
		let i = 0;
		for (let t = 0; t < 8; t++) e[i++] = n[t] >>> 0, e[i++] = n[t] >>> 8;
		return e;
	}
	digest() {
		let { buffer: e, outputLen: t } = this;
		this.digestInto(e);
		let n = e.slice(0, t);
		return this.destroy(), n;
	}
};
function B(e) {
	let t = (t, n) => e(n).update(g(t)).digest(), n = e(/* @__PURE__ */ new Uint8Array(32));
	return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (t) => e(t), t;
}
var V = B((e) => new z(e));
// node_modules/@noble/ciphers/esm/chacha.js
function H(e, t, n, r, i, a = 20) {
	let o = e[0], s = e[1], c = e[2], l = e[3], u = t[0], d = t[1], f = t[2], p = t[3], m = t[4], h = t[5], g = t[6], _ = t[7], v = i, y = n[0], b = n[1], x = n[2], S = o, C = s, w = c, T = l, E = u, D = d, O = f, k = p, j = m, M = h, N = g, P = _, F = v, I = y, L = b, R = x;
	for (let e = 0; e < a; e += 2) S = S + E | 0, F = A(F ^ S, 16), j = j + F | 0, E = A(E ^ j, 12), S = S + E | 0, F = A(F ^ S, 8), j = j + F | 0, E = A(E ^ j, 7), C = C + D | 0, I = A(I ^ C, 16), M = M + I | 0, D = A(D ^ M, 12), C = C + D | 0, I = A(I ^ C, 8), M = M + I | 0, D = A(D ^ M, 7), w = w + O | 0, L = A(L ^ w, 16), N = N + L | 0, O = A(O ^ N, 12), w = w + O | 0, L = A(L ^ w, 8), N = N + L | 0, O = A(O ^ N, 7), T = T + k | 0, R = A(R ^ T, 16), P = P + R | 0, k = A(k ^ P, 12), T = T + k | 0, R = A(R ^ T, 8), P = P + R | 0, k = A(k ^ P, 7), S = S + D | 0, R = A(R ^ S, 16), N = N + R | 0, D = A(D ^ N, 12), S = S + D | 0, R = A(R ^ S, 8), N = N + R | 0, D = A(D ^ N, 7), C = C + O | 0, F = A(F ^ C, 16), P = P + F | 0, O = A(O ^ P, 12), C = C + O | 0, F = A(F ^ C, 8), P = P + F | 0, O = A(O ^ P, 7), w = w + k | 0, I = A(I ^ w, 16), j = j + I | 0, k = A(k ^ j, 12), w = w + k | 0, I = A(I ^ w, 8), j = j + I | 0, k = A(k ^ j, 7), T = T + E | 0, L = A(L ^ T, 16), M = M + L | 0, E = A(E ^ M, 12), T = T + E | 0, L = A(L ^ T, 8), M = M + L | 0, E = A(E ^ M, 7);
	let z = 0;
	r[z++] = o + S | 0, r[z++] = s + C | 0, r[z++] = c + w | 0, r[z++] = l + T | 0, r[z++] = u + E | 0, r[z++] = d + D | 0, r[z++] = f + O | 0, r[z++] = p + k | 0, r[z++] = m + j | 0, r[z++] = h + M | 0, r[z++] = g + N | 0, r[z++] = _ + P | 0, r[z++] = v + F | 0, r[z++] = y + I | 0, r[z++] = b + L | 0, r[z++] = x + R | 0;
}
var U = /* @__PURE__ */ L(H, {
	counterRight: !1,
	counterLength: 4,
	allowShortKeys: !1
}), W = /* @__PURE__ */ new Uint8Array(16), G = (e, t) => {
	e.update(t);
	let n = t.length % 16;
	n && e.update(W.subarray(n));
}, ee = /* @__PURE__ */ new Uint8Array(32);
function te(e, t, n, r, i) {
	let a = e(t, n, ee), o = V.create(a);
	i && G(o, i), G(o, r);
	let s = S(r.length, i ? i.length : 0, !0);
	o.update(s);
	let c = o.digest();
	return f(a, s), c;
}
var ne = /* @__PURE__ */ y({
	blockSize: 64,
	nonceLength: 12,
	tagLength: 16
}, ((e) => (t, n, r) => ({
	encrypt(i, a) {
		let o = i.length;
		a = b(o + 16, a, !1), a.set(i);
		let s = a.subarray(0, -16);
		e(t, n, s, s, 1);
		let c = te(e, t, n, s, r);
		return a.set(c, o), f(c), a;
	},
	decrypt(i, a) {
		a = b(i.length - 16, a, !1);
		let o = i.subarray(0, -16), s = i.subarray(-16), c = te(e, t, n, o, r);
		if (!v(s, c)) throw Error("invalid tag");
		return a.set(i.subarray(0, -16)), e(t, n, a, a, 1), f(c), a;
	}
}))(U)), re = "LILOS-ENC/1", ie = 16384, ae = 4, K = [
	"AES-256-GCM",
	"AES-128-GCM",
	"ChaCha20-Poly1305"
], oe = ["argon2id", "pbkdf2"], se = new TextEncoder(), ce = new TextDecoder();
function q(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 32768) t += String.fromCharCode(...e.subarray(n, n + 32768));
	return btoa(t);
}
function J(e) {
	if (typeof e != "string" || !/^[A-Za-z0-9+/]*={0,2}$/.test(e)) throw Error("bad base64");
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	return n;
}
function le(e) {
	return se.encode(`${re}\n${JSON.stringify(e)}\n`);
}
function ue(e) {
	let t = se.encode(`${re}\n`);
	return e.length >= t.length && t.every((t, n) => e[n] === t);
}
function de(e) {
	if (!ue(e)) throw Error("not-encrypted");
	let t = e.indexOf(10, 12);
	if (t < 0 || t - 12 > ie) throw Error("bad-header");
	let n;
	try {
		n = JSON.parse(ce.decode(e.subarray(12, t)));
	} catch {
		throw Error("bad-header");
	}
	if (!n || n.v !== 1 || !K.includes(n.alg) || typeof n.nonce != "string" || !Array.isArray(n.recipients) || n.recipients.length < 1 || n.recipients.length > ae) throw Error("bad-header");
	return {
		header: n,
		aad: e.subarray(0, t + 1),
		body: e.subarray(t + 1)
	};
}
function fe(e, t) {
	let n = le(e), r = new Uint8Array(n.length + t.length);
	return r.set(n, 0), r.set(t, n.length), r;
}
// src/filecrypt/crypto.js
var Y = globalThis.crypto.subtle, pe = new TextEncoder(), me = pe.encode("LILOS-ENC/1 key"), he = {
	argon2id: {
		name: "argon2id",
		m: 65536,
		t: 3,
		p: 1
	},
	pbkdf2: {
		name: "pbkdf2",
		hash: "SHA-256",
		iterations: 6e5
	}
};
function ge(e) {
	if (e?.name === "argon2id") {
		if ([
			e.m,
			e.t,
			e.p
		].every(Number.isInteger) && e.m >= 8192 && e.m <= 262144 && e.t >= 1 && e.t <= 10 && e.p >= 1 && e.p <= 4) return e;
	} else if (e?.name === "pbkdf2" && e.hash === "SHA-256" && Number.isInteger(e.iterations) && e.iterations >= 1e5 && e.iterations <= 1e7) return e;
	throw Error("bad-header");
}
var X = (e) => globalThis.crypto.getRandomValues(new Uint8Array(e)), _e = (e) => String(e).normalize("NFC"), ve = (e) => e.name === "argon2id" ? e.m * e.t * e.p : e.iterations / 10, ye = 16e5, be = (e) => e === "AES-128-GCM" ? 16 : 32;
async function xe(e, t, n) {
	if (n.name === "argon2id") {
		let r = globalThis.hashwasm;
		if (!r?.argon2id) throw Error("no-argon2");
		return r.argon2id({
			password: e,
			salt: t,
			parallelism: n.p,
			iterations: n.t,
			memorySize: n.m,
			hashLength: 32,
			outputType: "binary"
		});
	}
	let r = await Y.importKey("raw", pe.encode(e), "PBKDF2", !1, ["deriveBits"]);
	return new Uint8Array(await Y.deriveBits({
		name: "PBKDF2",
		hash: "SHA-256",
		salt: t,
		iterations: n.iterations
	}, r, 256));
}
async function Se(e, t, n, r, i) {
	let a = await Y.importKey("raw", t, "AES-GCM", !1, [e]), o = {
		name: "AES-GCM",
		iv: n,
		additionalData: i,
		tagLength: 128
	};
	return new Uint8Array(await (e === "encrypt" ? Y.encrypt(o, a, r) : Y.decrypt(o, a, r)));
}
async function Ce(e, t, n, r, i) {
	return e === "ChaCha20-Poly1305" ? ne(t, n, i).encrypt(r) : Se("encrypt", t, n, r, i);
}
async function we(e, t, n, r, i) {
	try {
		return e === "ChaCha20-Poly1305" ? ne(t, n, i).decrypt(r) : await Se("decrypt", t, n, r, i);
	} catch {
		throw Error("wrong");
	}
}
async function Te(e, t, n) {
	let r = he[n] ?? he.argon2id, i = X(16), a = X(12), o = await Se("encrypt", await xe(_e(t), i, r), a, e, me);
	return {
		type: "password",
		kdf: r,
		salt: q(i),
		nonce: q(a),
		key: q(o)
	};
}
async function Ee(e, t) {
	let n = X(12), r = {
		v: 1,
		alg: t.alg,
		nonce: q(n),
		recipients: t.recipients
	};
	return fe(r, await Ce(t.alg, t.key, n, e, le(r)));
}
async function De(e, { password: t, alg: n = "AES-256-GCM", kdf: r = "argon2id" }) {
	if (!K.includes(n) || !oe.includes(r)) throw Error("bad-options");
	let i = X(be(n)), a = {
		alg: n,
		key: i,
		recipients: [await Te(i, t, r)]
	};
	return {
		bytes: await Ee(e, a),
		state: a
	};
}
async function Oe(e, t) {
	let { header: n, aad: r, body: i } = de(e), a = ye;
	for (let e of n.recipients) {
		if (e?.type !== "password") continue;
		let o = ge(e.kdf);
		if ((a -= ve(o)) < 0) throw Error("bad-header");
		let s = await xe(_e(t), J(e.salt), o), c;
		try {
			c = await we("AES-256-GCM", s, J(e.nonce), J(e.key), me);
		} catch {
			continue;
		}
		if (c.length !== be(n.alg)) throw Error("bad-header");
		let l;
		try {
			l = await we(n.alg, c, J(n.nonce), i, r);
		} catch {
			throw Error("corrupt");
		}
		return {
			plain: l,
			state: {
				alg: n.alg,
				key: c,
				recipients: n.recipients
			}
		};
	}
	throw Error("wrong");
}
async function ke(e, t) {
	let { header: n, aad: r, body: i } = de(e);
	if (n.alg !== t.alg) throw Error("wrong");
	return we(n.alg, t.key, J(n.nonce), i, r);
}
function Ae(e) {
	let t = String(e);
	if (t.length < 8) return 0;
	let n = [
		/[a-z]/,
		/[A-Z]/,
		/[0-9]/,
		/[^a-zA-Z0-9]/
	].filter((e) => e.test(t)).length, r = new Set(t).size, i = t.length >= 16 ? 3 : t.length >= 12 ? 2 : 1;
	return n >= 3 && i++, r < t.length / 3 && i--, Math.max(1, Math.min(4, i));
}
// src/shared/sandbox/app.js
var je = (e) => e?.file ?? (Array.isArray(e?.files) ? e.files[0] : null) ?? null;
async function Me(e, t, n) {
	try {
		await e.automation?.record(t, n);
	} catch {}
}
var Ne = (e, t) => e.on("locale", t);
function Pe(t, n, { style: r, className: i }, a) {
	r && n.append(e("style", {}, r));
	let o = e("div", { class: i });
	n.append(o);
	let s = () => a(o);
	return {
		box: o,
		redraw: s,
		off: Ne(t, s)
	};
}
function Fe(e, t, n, r = {}) {
	let i = t?.message, a = Array.isArray(n) ? n.includes(i) ? `error.${i}` : null : n && Object.hasOwn(n, i) ? n[i] : null;
	return a ? e(a, {
		detail: String(t?.detail ?? ""),
		...r
	}) : e("error.generic", { error: i ?? String(t) });
}
function Ie(e, { automation: t = {}, actions: n = {}, onError: r = null, other: i = null, explainError: a = (e) => e?.message ?? String(e) } = {}) {
	e.handle(async (e) => {
		if (e?.automation) {
			let { action: n, params: r } = e.automation, i = typeof n == "string" && Object.hasOwn(t, n) ? t[n] : null;
			if (!i) throw Error("unknown");
			try {
				return await i(r && typeof r == "object" ? r : {}, e);
			} catch (e) {
				throw e?.message === "unknown" ? e : Error(a(e));
			}
		}
		let o = typeof e?.action == "string" && Object.hasOwn(n, e.action) ? n[e.action] : null;
		if (o) try {
			return await o(Array.isArray(e.files) ? e.files : [], e);
		} catch (t) {
			if (!r) throw t;
			return r(t, e);
		}
		if (i) return i(e);
		throw Error("unknown");
	});
}
// src/filecrypt/vault.js
var Le = {
	content: !0,
	v: 1
}, Re = "settings", ze = {
	alg: "AES-256-GCM",
	kdf: "argon2id",
	lockAfter: 15
};
async function Z(e) {
	let t = await e.storage.get(Re), n = t && typeof t == "object" ? t : {};
	return {
		alg: K.includes(n.alg) ? n.alg : ze.alg,
		kdf: oe.includes(n.kdf) ? n.kdf : ze.kdf,
		lockAfter: Number.isInteger(n.lockAfter) && n.lockAfter >= 0 && n.lockAfter <= 1440 ? n.lockAfter : ze.lockAfter
	};
}
var Be = {
	wrong: "error.wrong",
	corrupt: "error.corrupt",
	short: "encrypt.tooShort",
	already: "error.already",
	"not-encrypted": "error.notEncrypted",
	"bad-header": "error.badHeader",
	"no-argon2": "error.noArgon2"
}, Ve = (e, t) => Fe(e, t, Be), He = 8, Q = async (e) => new Uint8Array(await e.arrayBuffer());
async function Ue({ lilos: e }) {
	let t = (t, n) => e.locale.i18n.t(t, n), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), i = await Z(e), a = () => [...n].map(([e, t]) => ({
		id: e,
		name: t.name,
		since: t.since
	})), o = () => {
		e.app.keepAlive(n.size > 0);
		let t = a();
		for (let e of r) e.postMessage({ status: t });
	};
	async function s(r, { quiet: i = !1 } = {}) {
		let a = r.filter((e) => (n.get(e)?.state.key.fill(0), n.delete(e)));
		return a.length ? (await e.files.locked(a), i || e.ui.toast(t("toast.locked", { n: a.length })), o(), a.length) : 0;
	}
	setInterval(async () => {
		if (!i.lockAfter) return;
		let t = Date.now() - i.lockAfter * 6e4, r = [...n].filter(([, e]) => e.used < t).map(([e]) => e);
		if (!r.length) return;
		let a = new Set(await e.files.shown(r));
		for (let e of a) n.get(e).used = Date.now();
		let o = r.filter((e) => !a.has(e));
		o.length && s(o);
	}, 3e4);
	let c = { where: { meta: "own" } };
	await e.pipes.subscribe("file.open", {
		stage: "before",
		position: "first",
		...c
	}, async ({ node: t }) => {
		let r = n.get(t.id);
		return r ? (r.used = Date.now(), null) : (await e.app.call("unlock", { file: t.id }), { stop: { silent: !0 } });
	}), await e.pipes.subscribe("file.read", {
		stage: "after",
		position: "last",
		...c
	}, async ({ node: e, content: r }, i) => {
		let a = n.get(e.id);
		if (!a) return { stop: { error: t("error.locked", { name: e.name }) } };
		let o = i.caller;
		if (o && !o.system && !o.opened) return { stop: { error: t("error.otherApp", { name: e.name }) } };
		let s = await Q(r);
		if (!ue(s)) return { stop: { error: t("error.broken", { name: e.name }) } };
		try {
			let e = await ke(s, a.state);
			return a.used = Date.now(), { data: { content: new Blob([e]) } };
		} catch {
			return { stop: { error: t("error.broken", { name: e.name }) } };
		}
	}), await e.pipes.subscribe("file.write", {
		stage: "before",
		position: "last",
		...c
	}, async ({ node: e, content: r }) => {
		let i = n.get(e.id);
		return i ? (i.used = Date.now(), { data: { content: new Blob([await Ee(await Q(r), i.state)]) } }) : { stop: { error: t("error.writeLocked", { name: e.name }) } };
	});
	async function l(t) {
		switch (t.op) {
			case "follow": return { status: a() };
			case "settings": return i = await Z(e), {};
			case "lock": {
				let r = Array.isArray(t.files) ? t.files : [...n.keys()], i = await s(r);
				return await Me(e, "filecrypt.lock", { params: { files: r } }), { locked: i };
			}
			case "unlock": {
				let r = await e.files.info(t.file), { state: i } = await Oe(await Q(await e.files.read(t.file, { bytes: !0 })), String(t.password));
				return n.set(t.file, {
					state: i,
					name: r.name,
					since: Date.now(),
					used: Date.now()
				}), o(), {};
			}
			case "encrypt": {
				let r = await e.files.info(t.file);
				if (r.meta) throw Error("already");
				if (String(t.password ?? "").length < He) throw Error("short");
				let { bytes: a, state: s } = await De(await Q(await e.files.read(t.file, { bytes: !0 })), {
					password: String(t.password),
					alg: t.alg ?? i.alg,
					kdf: t.kdf ?? i.kdf
				});
				return await e.files.write(t.file, a, { mark: Le }), n.set(t.file, {
					state: s,
					name: r.name,
					since: Date.now(),
					used: Date.now()
				}), o(), {};
			}
			case "decrypt": {
				let { plain: r } = await Oe(await Q(await e.files.read(t.file, { bytes: !0 })), String(t.password));
				return await e.files.write(t.file, new Blob([r]), { mark: null }), n.get(t.file)?.state.key.fill(0), n.delete(t.file), o(), {};
			}
			default: throw Error("unknown");
		}
	}
	e.on("connect", (e) => {
		e.onmessage = async (t) => {
			let n = t.data ?? {};
			try {
				e.postMessage({
					id: n.id,
					...await l(n)
				}), n.op === "follow" && r.add(e);
			} catch (t) {
				e.postMessage({
					id: n.id,
					error: t?.message ?? String(t)
				});
			}
		};
	}), Ie(e, {
		automation: {
			"filecrypt.encrypt": async (e) => {
				await l({
					op: "encrypt",
					file: e.file,
					password: e.password,
					alg: K.includes(e.alg) ? e.alg : void 0,
					kdf: oe.includes(e.kdf) ? e.kdf : void 0
				});
			},
			"filecrypt.decrypt": async (e) => {
				await l({
					op: "decrypt",
					file: e.file,
					password: e.password
				});
			},
			"filecrypt.lock": async (e) => {
				await s(Array.isArray(e.files) ? e.files : [], { quiet: !0 });
			}
		},
		actions: { "filecrypt.lock": async (t) => {
			let n = await s(t);
			return await Me(e, "filecrypt.lock", { params: { files: t } }), { locked: n };
		} },
		other: async (t) => {
			if (t?.op === "prepare") {
				let r = await e.files.info(t.file);
				return {
					name: r.name,
					encrypted: !!r.meta,
					unlocked: n.has(t.file)
				};
			}
			if (t?.op === "status") return a();
			throw Error("unknown");
		},
		explainError: (e) => Ve(t, e)
	});
}
// src/filecrypt/windows.js
var We = (e) => [["argon2id", e("kdf.argon2id")], ["pbkdf2", e("kdf.pbkdf2")]], Ge = () => K.map((e) => [e, e]), Ke = (e) => [
	5,
	15,
	30,
	60,
	0
].map((t) => [String(t), t ? e("settings.minutes", { n: t }) : e("settings.never")]), qe = (e, t, n) => Pe(e, t, {
	style: i,
	className: "fc"
}, n);
function $(e, t) {
	e.disabled = t, e.setAttribute("aria-busy", t ? "true" : "false");
}
function Je(t, ...n) {
	let r = e("div", {
		class: "fc-form",
		role: "form"
	}, ...n);
	return r.addEventListener("keydown", (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && (e.preventDefault(), t());
	}), r;
}
async function Ye({ lilos: t, root: i }) {
	let a = (e, n) => t.locale.i18n.t(e, n), o = await r(t), s = [], c = await Z(t), { redraw: l, off: u } = qe(t, i, (r) => {
		let i = async (e) => {
			c = {
				...c,
				...e
			}, await t.storage.set(Re, c), await o.ask({ op: "settings" });
		}, l = (e) => t.locale.i18n.date(e, {
			hour: "2-digit",
			minute: "2-digit"
		});
		r.replaceChildren(e("h1", {}, a("main.title")), e("p", {}, a("main.intro")), e("h2", {}, a("main.unlocked")), s.length ? e("ul", {}, ...s.map((t) => e("li", {}, e("span", {
			class: "name",
			title: t.name
		}, t.name), e("span", { class: "when" }, a("main.since", { time: l(t.since) })), e("button", {
			type: "button",
			onclick: () => o.ask({
				op: "lock",
				files: [t.id]
			})
		}, a("main.lock"))))) : e("div", { class: "empty" }, a("main.none")), s.length > 1 && e("div", { class: "row" }, e("button", {
			type: "button",
			onclick: () => o.ask({ op: "lock" })
		}, a("main.lockAll"))), e("h2", {}, a("settings.title")), e("div", { class: "settings" }, e("label", {}, a("settings.alg"), n(Ge(), c.alg, (e) => i({ alg: e }))), e("label", {}, a("settings.kdf"), n(We(a), c.kdf, (e) => i({ kdf: e }))), e("label", {}, a("settings.lockAfter"), n(Ke(a), c.lockAfter, (e) => i({ lockAfter: Number(e) })))), e("p", { class: "hint" }, a("main.limits")));
	});
	return o.onStatus((e) => {
		s = e, l();
	}), {status: s} = await o.ask({ op: "follow" }), l(), () => {
		u(), o.close();
	};
}
async function Xe({ lilos: t, root: n, args: i }) {
	let a = (e, n) => t.locale.i18n.t(e, n), o = null, s = "unlock", c = "", l = "", u = null, d = (e) => {
		o = je(e), s = e?.action === "filecrypt.decrypt" ? "decrypt" : "unlock", l = "";
	};
	d(i);
	let { redraw: f, off: p } = qe(t, n, (n) => {
		if (!o) return n.replaceChildren(e("p", {}, a("unlock.noFile")));
		let i = e("input", {
			type: "password",
			autocomplete: "current-password",
			"aria-describedby": "fc-error",
			required: !0
		}), d = e("div", {
			class: "error",
			id: "fc-error",
			role: "alert"
		}, l), f = async () => {
			if (!p.disabled) {
				if (!i.value) return i.focus();
				$(p, !0);
				try {
					await t.app.call("vault", {
						op: "prepare",
						file: o
					}), u ??= await r(t), await u.ask({
						op: s,
						file: o,
						password: i.value
					}), i.value = "", s === "unlock" ? await t.files.open(o) : (t.ui.toast(a("toast.decrypted", { name: c })), await Me(t, "filecrypt.decrypt", { params: { file: o } })), t.window.close();
				} catch (e) {
					l = Ve(a, e), d.textContent = l, i.value = "", $(p, !1), i.focus();
				}
			}
		}, p = e("button", {
			type: "button",
			class: "primary",
			onclick: f
		}, a(s === "decrypt" ? "decrypt.button" : "unlock.button"));
		n.replaceChildren(e("h1", {}, a(s === "decrypt" ? "decrypt.title" : "unlock.title", { name: c })), e("p", {}, a(s === "decrypt" ? "decrypt.intro" : "unlock.intro")), Je(f, e("label", {}, a("unlock.password"), i), d, e("div", { class: "row" }, e("button", {
			type: "button",
			onclick: () => t.window.close()
		}, a("common.cancel")), p))), i.focus();
	}), m = async () => {
		c = o ? (await t.files.info(o)).name : "", t.window.setTitle(a(s === "decrypt" ? "decrypt.windowTitle" : "unlock.windowTitle")), f();
	}, h = t.on("launch", (e) => {
		d(e), m();
	});
	return await m(), () => {
		p(), h(), u?.close();
	};
}
async function Ze({ lilos: t, root: i, args: a }) {
	let o = (e, n) => t.locale.i18n.t(e, n), s = je(a), c = "", l = null, u = await Z(t), d = () => [
		"",
		o("strength.weak"),
		o("strength.fair"),
		o("strength.good"),
		o("strength.strong")
	], { redraw: f, off: p } = qe(t, i, (i) => {
		if (!s) return i.replaceChildren(e("p", {}, o("unlock.noFile")));
		let a = e("input", {
			type: "password",
			autocomplete: "new-password",
			required: !0,
			"aria-describedby": "fc-strength"
		}), f = e("input", {
			type: "password",
			autocomplete: "new-password",
			required: !0
		}), p = e("div", {
			class: "meter",
			"aria-hidden": "true",
			"data-level": "0"
		}, e("span"), e("span"), e("span"), e("span")), m = e("span", {
			class: "hint",
			id: "fc-strength",
			"aria-live": "polite"
		}, o("strength.short")), h = n(Ge(), u.alg), g = n(We(o), u.kdf), _ = e("div", {
			class: "error",
			role: "alert"
		});
		a.addEventListener("input", () => {
			let e = Ae(a.value);
			p.dataset.level = String(e), m.textContent = e ? d()[e] : o("strength.short");
		});
		let v = async () => {
			if (!y.disabled) {
				if (_.textContent = "", Ae(a.value) === 0) return _.textContent = o("encrypt.tooShort"), a.focus();
				if (a.value !== f.value) return _.textContent = o("encrypt.mismatch"), f.focus();
				$(y, !0), y.textContent = o("encrypt.working");
				try {
					await t.app.call("vault", {
						op: "prepare",
						file: s
					}), l ??= await r(t), await l.ask({
						op: "encrypt",
						file: s,
						password: a.value,
						alg: h.value,
						kdf: g.value
					}), a.value = f.value = "", t.ui.toast(o("toast.encrypted", { name: c })), await Me(t, "filecrypt.encrypt", {
						params: {
							file: s,
							alg: h.value,
							kdf: g.value
						},
						defaults: {
							alg: u.alg,
							kdf: u.kdf
						}
					}), t.window.close();
				} catch (e) {
					_.textContent = Ve(o, e), $(y, !1), y.textContent = o("encrypt.button");
				}
			}
		}, y = e("button", {
			type: "button",
			class: "primary",
			onclick: v
		}, o("encrypt.button")), b = Je(v, e("label", {}, o("encrypt.password"), a, p, m), e("label", {}, o("encrypt.repeat"), f), e("details", {}, e("summary", {}, o("encrypt.advanced")), e("div", {}, e("label", {}, o("settings.alg"), h), e("label", {}, o("settings.kdf"), g))), e("div", { class: "warn" }, o("encrypt.warning")), _, e("div", { class: "row" }, e("button", {
			type: "button",
			onclick: () => t.window.close()
		}, o("common.cancel")), y));
		i.replaceChildren(e("h1", {}, o("encrypt.title", { name: c })), e("p", {}, o("encrypt.intro")), b), a.focus();
	}), m = async () => {
		c = s ? (await t.files.info(s)).name : "", t.window.setTitle(o("encrypt.windowTitle")), f();
	}, h = t.on("launch", (e) => {
		s = je(e) ?? s, m();
	});
	return await m(), () => {
		p(), h(), l?.close();
	};
}
export { Ze as encrypt, Ye as main, Xe as unlock, Ue as vault };
