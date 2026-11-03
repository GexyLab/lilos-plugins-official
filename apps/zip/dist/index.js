// node_modules/fflate/esm/browser.js
var e = Uint8Array, t = Uint16Array, n = Int32Array, r = new e([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]), i = new e([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]), a = new e([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]), o = function(e, r) {
	for (var i = new t(31), a = 0; a < 31; ++a) i[a] = r += 1 << e[a - 1];
	for (var o = new n(i[30]), a = 1; a < 30; ++a) for (var s = i[a]; s < i[a + 1]; ++s) o[s] = s - i[a] << 5 | a;
	return {
		b: i,
		r: o
	};
}, s = o(r, 2), c = s.b, l = s.r;
c[28] = 258, l[258] = 28;
for (var u = o(i, 0), d = u.b, f = u.r, p = new t(32768), m = 0; m < 32768; ++m) {
	var h = (m & 43690) >> 1 | (m & 21845) << 1;
	h = (h & 52428) >> 2 | (h & 13107) << 2, h = (h & 61680) >> 4 | (h & 3855) << 4, p[m] = ((h & 65280) >> 8 | (h & 255) << 8) >> 1;
}
for (var g = (function(e, n, r) {
	for (var i = e.length, a = 0, o = new t(n); a < i; ++a) e[a] && ++o[e[a] - 1];
	var s = new t(n);
	for (a = 1; a < n; ++a) s[a] = s[a - 1] + o[a - 1] << 1;
	var c;
	if (r) {
		c = new t(1 << n);
		var l = 15 - n;
		for (a = 0; a < i; ++a) if (e[a]) for (var u = a << 4 | e[a], d = n - e[a], f = s[e[a] - 1]++ << d, m = f | (1 << d) - 1; f <= m; ++f) c[p[f] >> l] = u;
	} else for (c = new t(i), a = 0; a < i; ++a) e[a] && (c[a] = p[s[e[a] - 1]++] >> 15 - e[a]);
	return c;
}), _ = new e(288), m = 0; m < 144; ++m) _[m] = 8;
for (var m = 144; m < 256; ++m) _[m] = 9;
for (var m = 256; m < 280; ++m) _[m] = 7;
for (var m = 280; m < 288; ++m) _[m] = 8;
for (var v = new e(32), m = 0; m < 32; ++m) v[m] = 5;
var y = /*#__PURE__*/ g(_, 9, 0), b = /*#__PURE__*/ g(_, 9, 1), x = /*#__PURE__*/ g(v, 5, 0), S = /*#__PURE__*/ g(v, 5, 1), C = function(e) {
	for (var t = e[0], n = 1; n < e.length; ++n) e[n] > t && (t = e[n]);
	return t;
}, w = function(e, t, n) {
	var r = t / 8 | 0;
	return (e[r] | e[r + 1] << 8) >> (t & 7) & n;
}, ee = function(e, t) {
	var n = t / 8 | 0;
	return (e[n] | e[n + 1] << 8 | e[n + 2] << 16) >> (t & 7);
}, te = function(e) {
	return (e + 7) / 8 | 0;
}, ne = function(t, n, r) {
	return (n == null || n < 0) && (n = 0), (r == null || r > t.length) && (r = t.length), new e(t.subarray(n, r));
}, T = [
	"unexpected EOF",
	"invalid block type",
	"invalid length/literal",
	"invalid distance",
	"stream finished",
	"no stream handler",
	,
	"no callback",
	"invalid UTF-8 data",
	"extra field too long",
	"date not in range 1980-2099",
	"filename too long",
	"stream finishing",
	"invalid zip data"
], E = function(e, t, n) {
	var r = Error(t || T[e]);
	if (r.code = e, Error.captureStackTrace && Error.captureStackTrace(r, E), !n) throw r;
	return r;
}, D = function(t, n, o, s) {
	var l = t.length, u = s ? s.length : 0;
	if (!l || n.f && !n.l) return o || new e(0);
	var f = !o, p = f || n.i != 2, m = n.i;
	f && (o = new e(l * 3));
	var h = function(t) {
		var n = o.length;
		if (t > n) {
			var r = new e(Math.max(n * 2, t));
			r.set(o), o = r;
		}
	}, _ = n.f || 0, v = n.p || 0, y = n.b || 0, x = n.l, T = n.d, D = n.m, O = n.n, k = l * 8;
	do {
		if (!x) {
			_ = w(t, v, 1);
			var A = w(t, v + 1, 3);
			if (v += 3, !A) {
				var j = te(v) + 4, M = t[j - 4] | t[j - 3] << 8, N = j + M;
				if (N > l) {
					m && E(0);
					break;
				}
				p && h(y + M), o.set(t.subarray(j, N), y), n.b = y += M, n.p = v = N * 8, n.f = _;
				continue;
			}
			if (A == 1) x = b, T = S, D = 9, O = 5;
			else if (A == 2) {
				var re = w(t, v, 31) + 257, P = w(t, v + 10, 15) + 4, F = re + w(t, v + 5, 31) + 1;
				v += 14;
				for (var I = new e(F), L = new e(19), R = 0; R < P; ++R) L[a[R]] = w(t, v + R * 3, 7);
				v += P * 3;
				for (var z = C(L), B = (1 << z) - 1, V = g(L, z, 1), R = 0; R < F;) {
					var H = V[w(t, v, B)];
					v += H & 15;
					var j = H >> 4;
					if (j < 16) I[R++] = j;
					else {
						var U = 0, W = 0;
						for (j == 16 ? (W = 3 + w(t, v, 3), v += 2, U = I[R - 1]) : j == 17 ? (W = 3 + w(t, v, 7), v += 3) : j == 18 && (W = 11 + w(t, v, 127), v += 7); W--;) I[R++] = U;
					}
				}
				var G = I.subarray(0, re), K = I.subarray(re);
				D = C(G), O = C(K), x = g(G, D, 1), T = g(K, O, 1);
			} else E(1);
			if (v > k) {
				m && E(0);
				break;
			}
		}
		p && h(y + 131072);
		for (var ie = (1 << D) - 1, ae = (1 << O) - 1, q = v;; q = v) {
			var U = x[ee(t, v) & ie], J = U >> 4;
			if (v += U & 15, v > k) {
				m && E(0);
				break;
			}
			if (U || E(2), J < 256) o[y++] = J;
			else if (J == 256) {
				q = v, x = null;
				break;
			} else {
				var Y = J - 254;
				if (J > 264) {
					var R = J - 257, X = r[R];
					Y = w(t, v, (1 << X) - 1) + c[R], v += X;
				}
				var Z = T[ee(t, v) & ae], oe = Z >> 4;
				Z || E(3), v += Z & 15;
				var K = d[oe];
				if (oe > 3) {
					var X = i[oe];
					K += ee(t, v) & (1 << X) - 1, v += X;
				}
				if (v > k) {
					m && E(0);
					break;
				}
				p && h(y + 131072);
				var se = y + Y;
				if (y < K) {
					var ce = u - K, le = Math.min(K, se);
					for (ce + y < 0 && E(3); y < le; ++y) o[y] = s[ce + y];
				}
				for (; y < se; ++y) o[y] = o[y - K];
			}
		}
		n.l = x, n.p = q, n.b = y, n.f = _, x && (_ = 1, n.m = D, n.d = T, n.n = O);
	} while (!_);
	return y != o.length && f ? ne(o, 0, y) : o.subarray(0, y);
}, O = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8;
}, k = function(e, t, n) {
	n <<= t & 7;
	var r = t / 8 | 0;
	e[r] |= n, e[r + 1] |= n >> 8, e[r + 2] |= n >> 16;
}, A = function(n, r) {
	for (var i = [], a = 0; a < n.length; ++a) n[a] && i.push({
		s: a,
		f: n[a]
	});
	var o = i.length, s = i.slice();
	if (!o) return {
		t: I,
		l: 0
	};
	if (o == 1) {
		var c = new e(i[0].s + 1);
		return c[i[0].s] = 1, {
			t: c,
			l: 1
		};
	}
	i.sort(function(e, t) {
		return e.f - t.f;
	}), i.push({
		s: -1,
		f: 25001
	});
	var l = i[0], u = i[1], d = 0, f = 1, p = 2;
	for (i[0] = {
		s: -1,
		f: l.f + u.f,
		l,
		r: u
	}; f != o - 1;) l = i[i[d].f < i[p].f ? d++ : p++], u = i[d != f && i[d].f < i[p].f ? d++ : p++], i[f++] = {
		s: -1,
		f: l.f + u.f,
		l,
		r: u
	};
	for (var m = s[0].s, a = 1; a < o; ++a) s[a].s > m && (m = s[a].s);
	var h = new t(m + 1), g = j(i[f - 1], h, 0);
	if (g > r) {
		var a = 0, _ = 0, v = g - r, y = 1 << v;
		for (s.sort(function(e, t) {
			return h[t.s] - h[e.s] || e.f - t.f;
		}); a < o; ++a) {
			var b = s[a].s;
			if (h[b] > r) _ += y - (1 << g - h[b]), h[b] = r;
			else break;
		}
		for (_ >>= v; _ > 0;) {
			var x = s[a].s;
			h[x] < r ? _ -= 1 << r - h[x]++ - 1 : ++a;
		}
		for (; a >= 0 && _; --a) {
			var S = s[a].s;
			h[S] == r && (--h[S], ++_);
		}
		g = r;
	}
	return {
		t: new e(h),
		l: g
	};
}, j = function(e, t, n) {
	return e.s == -1 ? Math.max(j(e.l, t, n + 1), j(e.r, t, n + 1)) : t[e.s] = n;
}, M = function(e) {
	for (var n = e.length; n && !e[--n];);
	for (var r = new t(++n), i = 0, a = e[0], o = 1, s = function(e) {
		r[i++] = e;
	}, c = 1; c <= n; ++c) if (e[c] == a && c != n) ++o;
	else {
		if (!a && o > 2) {
			for (; o > 138; o -= 138) s(32754);
			o > 2 && (s(o > 10 ? o - 11 << 5 | 28690 : o - 3 << 5 | 12305), o = 0);
		} else if (o > 3) {
			for (s(a), --o; o > 6; o -= 6) s(8304);
			o > 2 && (s(o - 3 << 5 | 8208), o = 0);
		}
		for (; o--;) s(a);
		o = 1, a = e[c];
	}
	return {
		c: r.subarray(0, i),
		n
	};
}, N = function(e, t) {
	for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
	return n;
}, re = function(e, t, n) {
	var r = n.length, i = te(t + 2);
	e[i] = r & 255, e[i + 1] = r >> 8, e[i + 2] = e[i] ^ 255, e[i + 3] = e[i + 1] ^ 255;
	for (var a = 0; a < r; ++a) e[i + a + 4] = n[a];
	return (i + 4 + r) * 8;
}, P = function(e, n, o, s, c, l, u, d, f, p, m) {
	O(n, m++, o), ++c[256];
	for (var h = A(c, 15), b = h.t, S = h.l, C = A(l, 15), w = C.t, ee = C.l, te = M(b), ne = te.c, T = te.n, E = M(w), D = E.c, j = E.n, P = new t(19), F = 0; F < ne.length; ++F) ++P[ne[F] & 31];
	for (var F = 0; F < D.length; ++F) ++P[D[F] & 31];
	for (var I = A(P, 7), L = I.t, R = I.l, z = 19; z > 4 && !L[a[z - 1]]; --z);
	var B = p + 5 << 3, V = N(c, _) + N(l, v) + u, H = N(c, b) + N(l, w) + u + 14 + 3 * z + N(P, L) + 2 * P[16] + 3 * P[17] + 7 * P[18];
	if (f >= 0 && B <= V && B <= H) return re(n, m, e.subarray(f, f + p));
	var U, W, G, K;
	if (O(n, m, 1 + (H < V)), m += 2, H < V) {
		U = g(b, S, 0), W = b, G = g(w, ee, 0), K = w;
		var ie = g(L, R, 0);
		O(n, m, T - 257), O(n, m + 5, j - 1), O(n, m + 10, z - 4), m += 14;
		for (var F = 0; F < z; ++F) O(n, m + 3 * F, L[a[F]]);
		m += 3 * z;
		for (var ae = [ne, D], q = 0; q < 2; ++q) for (var J = ae[q], F = 0; F < J.length; ++F) {
			var Y = J[F] & 31;
			O(n, m, ie[Y]), m += L[Y], Y > 15 && (O(n, m, J[F] >> 5 & 127), m += J[F] >> 12);
		}
	} else U = y, W = _, G = x, K = v;
	for (var F = 0; F < d; ++F) {
		var X = s[F];
		if (X > 255) {
			var Y = X >> 18 & 31;
			k(n, m, U[Y + 257]), m += W[Y + 257], Y > 7 && (O(n, m, X >> 23 & 31), m += r[Y]);
			var Z = X & 31;
			k(n, m, G[Z]), m += K[Z], Z > 3 && (k(n, m, X >> 5 & 8191), m += i[Z]);
		} else k(n, m, U[X]), m += W[X];
	}
	return k(n, m, U[256]), m + W[256];
}, F = /*#__PURE__*/ new n([
	65540,
	131080,
	131088,
	131104,
	262176,
	1048704,
	1048832,
	2114560,
	2117632
]), I = /*#__PURE__*/ new e(0), L = function(a, o, s, c, u, d) {
	var p = d.z || a.length, m = new e(c + p + 5 * (1 + Math.ceil(p / 7e3)) + u), h = m.subarray(c, m.length - u), g = d.l, _ = (d.r || 0) & 7;
	if (o) {
		_ && (h[0] = d.r >> 3);
		for (var v = F[o - 1], y = v >> 13, b = v & 8191, x = (1 << s) - 1, S = d.p || new t(32768), C = d.h || new t(x + 1), w = Math.ceil(s / 3), ee = 2 * w, T = function(e) {
			return (a[e] ^ a[e + 1] << w ^ a[e + 2] << ee) & x;
		}, E = new n(25e3), D = new t(288), O = new t(32), k = 0, A = 0, j = d.i || 0, M = 0, N = d.w || 0, I = 0; j + 2 < p; ++j) {
			var L = T(j), R = j & 32767, z = C[L];
			if (S[R] = z, C[L] = R, N <= j) {
				var B = p - j;
				if ((k > 7e3 || M > 24576) && (B > 423 || !g)) {
					_ = P(a, h, 0, E, D, O, A, M, I, j - I, _), M = k = A = 0, I = j;
					for (var V = 0; V < 286; ++V) D[V] = 0;
					for (var V = 0; V < 30; ++V) O[V] = 0;
				}
				var H = 2, U = 0, W = b, G = R - z & 32767;
				if (B > 2 && L == T(j - G)) for (var K = Math.min(y, B) - 1, ie = Math.min(32767, j), ae = Math.min(258, B); G <= ie && --W && R != z;) {
					if (a[j + H] == a[j + H - G]) {
						for (var q = 0; q < ae && a[j + q] == a[j + q - G]; ++q);
						if (q > H) {
							if (H = q, U = G, q > K) break;
							for (var J = Math.min(G, q - 2), Y = 0, V = 0; V < J; ++V) {
								var X = j - G + V & 32767, Z = X - S[X] & 32767;
								Z > Y && (Y = Z, z = X);
							}
						}
					}
					R = z, z = S[R], G += R - z & 32767;
				}
				if (U) {
					E[M++] = 268435456 | l[H] << 18 | f[U];
					var oe = l[H] & 31, se = f[U] & 31;
					A += r[oe] + i[se], ++D[257 + oe], ++O[se], N = j + H, ++k;
				} else E[M++] = a[j], ++D[a[j]];
			}
		}
		for (j = Math.max(j, N); j < p; ++j) E[M++] = a[j], ++D[a[j]];
		_ = P(a, h, g, E, D, O, A, M, I, j - I, _), g || (d.r = _ & 7 | h[_ / 8 | 0] << 3, _ -= 7, d.h = C, d.p = S, d.i = j, d.w = N);
	} else {
		for (var j = d.w || 0; j < p + g; j += 65535) {
			var ce = j + 65535;
			ce >= p && (h[_ / 8 | 0] = g, ce = p), _ = re(h, _ + 1, a.subarray(j, ce));
		}
		d.i = p;
	}
	return ne(m, 0, c + te(_) + u);
}, R = /*#__PURE__*/ (function() {
	for (var e = /* @__PURE__ */ new Int32Array(256), t = 0; t < 256; ++t) {
		for (var n = t, r = 9; --r;) n = (n & 1 && -306674912) ^ n >>> 1;
		e[t] = n;
	}
	return e;
})(), z = function() {
	var e = -1;
	return {
		p: function(t) {
			for (var n = e, r = 0; r < t.length; ++r) n = R[n & 255 ^ t[r]] ^ n >>> 8;
			e = n;
		},
		d: function() {
			return ~e;
		}
	};
}, B = function(t, n, r, i, a) {
	if (!a && (a = { l: 1 }, n.dictionary)) {
		var o = n.dictionary.subarray(-32768), s = new e(o.length + t.length);
		s.set(o), s.set(t, o.length), t = s, a.w = o.length;
	}
	return L(t, n.level == null ? 6 : n.level, n.mem == null ? a.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(t.length))) * 1.5) : 20 : 12 + n.mem, r, i, a);
}, V = function(e, t) {
	var n = {};
	for (var r in e) n[r] = e[r];
	for (var r in t) n[r] = t[r];
	return n;
}, H = function(e, t) {
	return e[t] | e[t + 1] << 8;
}, U = function(e, t) {
	return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
}, W = function(e, t) {
	return U(e, t) + U(e, t + 4) * 4294967296;
}, G = function(e, t, n) {
	for (; n; ++t) e[t] = n, n >>>= 8;
};
function K(e, t) {
	return B(e, t || {}, 0, 0);
}
function ie(e, t) {
	return D(e, { i: 2 }, t && t.out, t && t.dictionary);
}
var ae = function(t, n, r, i) {
	for (var a in t) {
		var o = t[a], s = n + a, c = i;
		Array.isArray(o) && (c = V(i, o[1]), o = o[0]), o instanceof e ? r[s] = [o, c] : (r[s += "/"] = [new e(0), c], ae(o, s, r, i));
	}
}, q = typeof TextEncoder < "u" && /*#__PURE__*/ new TextEncoder(), J = typeof TextDecoder < "u" && /*#__PURE__*/ new TextDecoder();
try {
	J.decode(I, { stream: !0 });
} catch {}
var Y = function(e) {
	for (var t = "", n = 0;;) {
		var r = e[n++], i = (r > 127) + (r > 223) + (r > 239);
		if (n + i > e.length) return {
			s: t,
			r: ne(e, n - 1)
		};
		i ? i == 3 ? (r = ((r & 15) << 18 | (e[n++] & 63) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) - 65536, t += String.fromCharCode(55296 | r >> 10, 56320 | r & 1023)) : i & 1 ? t += String.fromCharCode((r & 31) << 6 | e[n++] & 63) : t += String.fromCharCode((r & 15) << 12 | (e[n++] & 63) << 6 | e[n++] & 63) : t += String.fromCharCode(r);
	}
};
function X(t, n) {
	if (n) {
		for (var r = new e(t.length), i = 0; i < t.length; ++i) r[i] = t.charCodeAt(i);
		return r;
	}
	if (q) return q.encode(t);
	for (var a = t.length, o = new e(t.length + (t.length >> 1)), s = 0, c = function(e) {
		o[s++] = e;
	}, i = 0; i < a; ++i) {
		if (s + 5 > o.length) {
			var l = new e(s + 8 + (a - i << 1));
			l.set(o), o = l;
		}
		var u = t.charCodeAt(i);
		u < 128 || n ? c(u) : u < 2048 ? (c(192 | u >> 6), c(128 | u & 63)) : u > 55295 && u < 57344 ? (u = 65536 + (u & 1047552) | t.charCodeAt(++i) & 1023, c(240 | u >> 18), c(128 | u >> 12 & 63), c(128 | u >> 6 & 63), c(128 | u & 63)) : (c(224 | u >> 12), c(128 | u >> 6 & 63), c(128 | u & 63));
	}
	return ne(o, 0, s);
}
function Z(e, t) {
	if (t) {
		for (var n = "", r = 0; r < e.length; r += 16384) n += String.fromCharCode.apply(null, e.subarray(r, r + 16384));
		return n;
	}
	if (J) return J.decode(e);
	var i = Y(e), a = i.s, n = i.r;
	return n.length && E(8), a;
}
var oe = function(e, t) {
	return t + 30 + H(e, t + 26) + H(e, t + 28);
}, se = function(e, t, n) {
	var r = H(e, t + 28), i = Z(e.subarray(t + 46, t + 46 + r), !(H(e, t + 8) & 2048)), a = t + 46 + r, o = U(e, t + 20), s = n && o == 4294967295 ? ce(e, a) : [
		o,
		U(e, t + 24),
		U(e, t + 42)
	], c = s[0], l = s[1], u = s[2];
	return [
		H(e, t + 10),
		c,
		l,
		i,
		a + H(e, t + 30) + H(e, t + 32),
		u
	];
}, ce = function(e, t) {
	for (; H(e, t) != 1; t += 4 + H(e, t + 2));
	return [
		W(e, t + 12),
		W(e, t + 4),
		W(e, t + 20)
	];
}, le = function(e) {
	var t = 0;
	if (e) for (var n in e) {
		var r = e[n].length;
		r > 65535 && E(9), t += r + 4;
	}
	return t;
}, ue = function(e, t, n, r, i, a, o, s) {
	var c = r.length, l = n.extra, u = s && s.length, d = le(l);
	G(e, t, o == null ? 67324752 : 33639248), t += 4, o != null && (e[t++] = 20, e[t++] = n.os), e[t] = 20, t += 2, e[t++] = n.flag << 1 | (a < 0 && 8), e[t++] = i && 8, e[t++] = n.compression & 255, e[t++] = n.compression >> 8;
	var f = new Date(n.mtime == null ? Date.now() : n.mtime), p = f.getFullYear() - 1980;
	if ((p < 0 || p > 119) && E(10), G(e, t, p << 25 | f.getMonth() + 1 << 21 | f.getDate() << 16 | f.getHours() << 11 | f.getMinutes() << 5 | f.getSeconds() >> 1), t += 4, a != -1 && (G(e, t, n.crc), G(e, t + 4, a < 0 ? -a - 2 : a), G(e, t + 8, n.size)), G(e, t + 12, c), G(e, t + 14, d), t += 16, o != null && (G(e, t, u), G(e, t + 6, n.attrs), G(e, t + 10, o), t += 14), e.set(r, t), t += c, d) for (var m in l) {
		var h = l[m], g = h.length;
		G(e, t, +m), G(e, t + 2, g), e.set(h, t + 4), t += 4 + g;
	}
	return u && (e.set(s, t), t += u), t;
}, de = function(e, t, n, r, i) {
	G(e, t, 101010256), G(e, t + 8, n), G(e, t + 10, n), G(e, t + 12, r), G(e, t + 16, i);
};
function fe(t, n) {
	n ||= {};
	var r = {}, i = [];
	ae(t, "", r, n);
	var a = 0, o = 0;
	for (var s in r) {
		var c = r[s], l = c[0], u = c[1], d = u.level == 0 ? 0 : 8, f = X(s), p = f.length, m = u.comment, h = m && X(m), g = h && h.length, _ = le(u.extra);
		p > 65535 && E(11);
		var v = d ? K(l, u) : l, y = v.length, b = z();
		b.p(l), i.push(V(u, {
			size: l.length,
			crc: b.d(),
			c: v,
			f,
			m: h,
			u: p != s.length || h && m.length != g,
			o: a,
			compression: d
		})), a += 30 + p + _ + y, o += 76 + 2 * (p + _) + (g || 0) + y;
	}
	for (var x = new e(o + 22), S = a, C = o - a, w = 0; w < i.length; ++w) {
		var f = i[w];
		ue(x, f.o, f, f.f, f.u, f.c.length);
		var ee = 30 + f.f.length + le(f.extra);
		x.set(f.c, f.o + ee), ue(x, a, f, f.f, f.u, f.c.length, f.o, f.m), a += 16 + ee + (f.m ? f.m.length : 0);
	}
	return de(x, a, i.length, C, S), x;
}
function pe(t, n) {
	for (var r = {}, i = t.length - 22; U(t, i) != 101010256; --i) (!i || t.length - i > 65558) && E(13);
	var a = H(t, i + 8);
	if (!a) return {};
	var o = U(t, i + 16), s = o == 4294967295 || a == 65535;
	if (s) {
		var c = U(t, i - 12);
		s = U(t, c) == 101075792, s && (a = U(t, c + 32), o = U(t, c + 48));
	}
	for (var l = n && n.filter, u = 0; u < a; ++u) {
		var d = se(t, o, s), f = d[0], p = d[1], m = d[2], h = d[3], g = d[4], _ = d[5], v = oe(t, _);
		o = g, (!l || l({
			name: h,
			size: p,
			originalSize: m,
			compression: f
		})) && (f ? f == 8 ? r[h] = ie(t.subarray(v, v + p), { out: new e(m) }) : E(14, "unknown compression type " + f) : r[h] = ne(t, v, v + p));
	}
	return r;
}
// src/zip/archive.js
var me = 10 << 20, he = 256 << 20, ge = 1e4, _e = /* @__PURE__ */ new Set(/* @__PURE__ */ "zip.gz.tgz.bz2.xz.7z.rar.jpg.jpeg.png.gif.webp.avif.heic.mp3.m4a.aac.ogg.opus.flac.mp4.m4v.mov.webm.mkv.woff.woff2.docx.xlsx.pptx.odt.ods.odp.epub".split(".")), ve = /^(__MACOSX|\.DS_Store|Thumbs\.db|desktop\.ini)$/i, Q = (e, t) => Object.assign(Error(e), { detail: t }), ye = (e) => {
	let t = e.lastIndexOf(".");
	return t > 0 ? e.slice(t + 1) : "";
}, be = (e) => {
	let t = e.lastIndexOf(".");
	return t > 0 ? e.slice(0, t) : e;
}, xe = (e) => String(e).replace(/[\u0000-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim().slice(0, 255);
function Se(e, t, { folder: n = !1 } = {}) {
	let r = n ? "" : ye(e), i = r ? e.slice(0, -(r.length + 1)) : e, a = e;
	for (let e = 2; t.has(a.toLowerCase()); e++) a = `${i} ${e}${r ? `.${r}` : ""}`;
	return t.add(a.toLowerCase()), a;
}
var Ce = (e) => e.ref ?? Q("outside", e.path), we = (e) => e.slice(0, e.lastIndexOf("/")) || "~", Te = async (e, t) => new Uint8Array(await (await e.files.read(t, { bytes: !0 })).arrayBuffer()), Ee = (e) => new Date(Math.min(Math.max(Number.isFinite(e) ? e : Date.now(), Date.UTC(1980, 0, 2)), Date.UTC(2099, 11, 30)));
async function De(e, t, { archiveName: n = "Archive", onProgress: r } = {}) {
	let i = (await Promise.all(t.map((t) => e.files.info(t)))).map((e) => ({
		...e,
		ref: Ce(e)
	}));
	if (!i.length) throw Q("nothing");
	let a = we(i[0].ref), o = {}, s = 0, c = 0, l = async (t, n, i, a) => {
		if (i.type === "folder") {
			let r = t[n] = {};
			for (let t of await e.files.list(a)) (t.type === "file" || t.type === "folder") && await l(r, t.name, t, `${a}/${t.name}`);
		} else if (i.type === "file") {
			if (++c > 1e4) throw Q("tooMany", ge);
			if (s += i.size ?? 0, s > 268435456) throw Q("tooBig", he);
			r?.({
				count: c,
				name: n
			}), t[n] = [await Te(e, a).catch((e) => {
				throw Q("read", `${n}: ${e?.message ?? e}`);
			}), {
				mtime: Ee(i.modified),
				level: _e.has(ye(n).toLowerCase()) ? 0 : 6
			}];
		}
	}, u = /* @__PURE__ */ new Set();
	for (let e of i) await l(o, Se(e.name, u, { folder: e.type === "folder" }), e, e.ref);
	let d = fe(o);
	if (d.byteLength > 10485760) throw Q("resultTooBig", d.byteLength);
	let f = i[0], p = i.length === 1 ? f.type === "folder" ? f.name : be(f.name) : n, m = await e.files.write(`${a}/${p}.zip`, d, { unique: !0 });
	return {
		name: m.name,
		ref: m.ref,
		id: m.id,
		count: c,
		size: d.byteLength
	};
}
function Oe(e) {
	let t = e.split(/[/\\]+/).filter((e) => e !== "" && e !== ".");
	if (t.includes("..")) return null;
	let n = t.map(xe);
	return n.some((e) => !e) ? null : n;
}
function ke(e) {
	let t = /* @__PURE__ */ new Set(), n = new DataView(e.buffer, e.byteOffset, e.byteLength), r = e.length - 22;
	for (; r >= 0 && e.length - r <= 65557 && n.getUint32(r, !0) !== 101010256;) r--;
	if (r < 0 || e.length - r > 65557) return t;
	let i = n.getUint16(r + 10, !0), a = n.getUint32(r + 16, !0);
	for (let r = 0; r < i && a + 46 <= e.length && n.getUint32(a, !0) === 33639248; r++) {
		let r = n.getUint16(a + 8, !0), i = n.getUint16(a + 28, !0);
		if (r & 1) {
			let n = e.subarray(a + 46, a + 46 + i);
			t.add(r & 2048 ? new TextDecoder().decode(n) : String.fromCharCode(...n));
		}
		a += 46 + i + n.getUint16(a + 30, !0) + n.getUint16(a + 32, !0);
	}
	return t;
}
function Ae(e) {
	let t = [], n = [], r = 0;
	try {
		let i = ke(e);
		pe(e, { filter: (e) => {
			let a = /[/\\]$/.test(e.name), o = Oe(e.name);
			if (!o) return n.push({
				name: e.name,
				why: "unsafe"
			}), !1;
			if (!o.length || o.some((e) => ve.test(e))) return !1;
			if (i.has(e.name)) return n.push({
				name: e.name,
				why: "encrypted"
			}), !1;
			if (e.compression !== 0 && e.compression !== 8) return n.push({
				name: e.name,
				why: "method"
			}), !1;
			if (!a && e.originalSize > 10485760) return n.push({
				name: e.name,
				why: "big"
			}), !1;
			if (t.length >= 1e4) throw Q("tooMany", ge);
			if (r += a ? 0 : e.originalSize, r > 268435456) throw Q("tooBig", he);
			return t.push({
				raw: e.name,
				path: o,
				folder: a,
				size: a ? 0 : e.originalSize
			}), !1;
		} });
	} catch (e) {
		throw e?.detail === void 0 ? Q("corrupt", e?.message ?? String(e)) : e;
	}
	return {
		entries: t,
		skipped: n
	};
}
async function je(e, t, { onProgress: n } = {}) {
	let r = await e.files.info(t);
	if (r.type !== "file") throw Q("notZip", r.name);
	let i = await Te(e, t).catch((e) => {
		throw Q("read", `${r.name}: ${e?.message ?? e}`);
	}), { entries: a, skipped: o } = Ae(i);
	if (!a.length) throw Q(o.length ? "skippedAll" : "empty", r.name);
	let s = new Set(a.map((e) => e.path[0].toLowerCase())).size === 1 && a.every((e) => e.path.length > 1 || e.folder), c = we(Ce(r)), l = await e.files.mkdir(`${c}/${xe(s ? a[0].path[0] : be(r.name)) || "Archive"}`, { unique: !0 }), u = l.ref, d = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), p = (e) => f.get(e) ?? f.set(e, /* @__PURE__ */ new Set()).get(e), m = (e) => {
		let t = u;
		for (let n = 0; n < e.length; n++) {
			let r = e.slice(0, n + 1).join("/").toLowerCase();
			d.has(r) || d.set(r, `${t}/${Se(e[n], p(t), { folder: !0 })}`), t = d.get(r);
		}
		return t;
	}, h = /* @__PURE__ */ new Map();
	for (let e of a) {
		let t = s ? e.path.slice(1) : e.path;
		if (e.folder) m(t);
		else {
			let n = m(t.slice(0, -1));
			h.set(e.raw, `${n}/${Se(t.at(-1), p(n))}`);
		}
	}
	for (let t of d.values()) await e.files.mkdir(t);
	let g = 0, _ = pe(i, { filter: (e) => h.has(e.name) });
	for (let [t, r] of Object.entries(_)) {
		let i = h.get(t);
		n?.({
			count: g + 1,
			name: i.slice(i.lastIndexOf("/") + 1)
		}), await e.files.write(i, r), g++;
	}
	return {
		name: l.name,
		ref: u,
		id: l.id,
		count: g,
		skipped: o
	};
}
// src/shared/sandbox/dom.js
function $(e, t = {}, ...n) {
	let r = document.createElement(e);
	for (let [e, n] of Object.entries(t ?? {})) n != null && n !== !1 && (e === "class" ? r.className = n : e.startsWith("on") && typeof n == "function" ? r.addEventListener(e.slice(2), n) : e in r && typeof n != "string" ? r[e] = n : r.setAttribute(e, n === !0 ? "" : String(n)));
	return r.append(...n.flat(Infinity).filter((e) => e != null && e !== !1).map((e) => e instanceof Node ? e : document.createTextNode(String(e)))), r;
}
function Me(e, { gap: t = 12, overflow: n = "hidden" } = {}) {
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
// src/zip/ui.js
var Ne = Me("zp") + "\n  .zp .list { flex: 1; min-height: 60px; overflow: auto; }\n  .zp .list li { padding: 5px 10px; }\n  .zp .list .folder .name { color: var(--dim); }\n  .zp .list .size { color: var(--dim); font-size: 12px; font-variant-numeric: tabular-nums; white-space: nowrap; }\n  .zp .list .more { color: var(--dim); font-style: italic; }\n  .zp .empty { border: 1px solid var(--border); border-radius: var(--radius-sm, 6px); }\n  .zp .ok { color: var(--text); }\n", Pe = (e) => e?.file ?? (Array.isArray(e?.files) ? e.files[0] : null) ?? null;
async function Fe(e, t, n) {
	try {
		await e.automation?.record(t, n);
	} catch {}
}
var Ie = (e, t) => e.on("locale", t);
function Le(e, t, { style: n, className: r }, i) {
	n && t.append($("style", {}, n));
	let a = $("div", { class: r });
	t.append(a);
	let o = () => i(a);
	return {
		box: a,
		redraw: o,
		off: Ie(e, o)
	};
}
function Re(e, t, n, r = {}) {
	let i = t?.message, a = Array.isArray(n) ? n.includes(i) ? `error.${i}` : null : n && Object.hasOwn(n, i) ? n[i] : null;
	return a ? e(a, {
		detail: String(t?.detail ?? ""),
		...r
	}) : e("error.generic", { error: i ?? String(t) });
}
function ze(e, { automation: t = {}, actions: n = {}, onError: r = null, other: i = null, explainError: a = (e) => e?.message ?? String(e) } = {}) {
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
// src/zip/ZipApp.js
var Be = 500, Ve = [
	"nothing",
	"tooMany",
	"tooBig",
	"resultTooBig",
	"read",
	"corrupt",
	"empty",
	"skippedAll",
	"notZip",
	"outside"
];
function He(e, t) {
	let n = (t, n) => e.locale.i18n.t(t, n), r = (t) => e.locale.formatBytes(t);
	return Re(n, t, Ve, {
		...typeof t?.detail == "number" && { detail: r(t.detail) },
		limit: r(me),
		max: t?.detail
	});
}
function Ue(e, t) {
	if (!t.length) return "";
	let n = t.slice(0, 3).map((e) => e.name).join(", ");
	return e("skipped", {
		n: t.length,
		names: t.length > 3 ? `${n}, …` : n
	});
}
async function We({ lilos: e, root: t, args: n }) {
	let r = (t, n) => e.locale.i18n.t(t, n), i = (t) => e.locale.formatBytes(t), { box: a, off: o } = Le(e, t, {
		style: Ne,
		className: "zp"
	}, () => m()), s = null, c = null, l = null, u = "", d = null, f = !1, p = (e) => {
		s = Pe(e), c = l = d = null, u = "";
	}, m = () => {
		if (!s) return e.window.setTitle("Zip"), a.replaceChildren($("h1", {}, "Zip"), $("p", {}, r("main.intro")), $("p", { class: "hint" }, r("main.limits", { limit: i(me) })));
		if (e.window.setTitle(c?.name ?? "Zip"), u) return a.replaceChildren($("h1", {}, c?.name ?? ""), $("div", {
			class: "error",
			role: "alert"
		}, u));
		if (!l) return a.replaceChildren($("p", {
			class: "hint",
			"aria-busy": "true"
		}, r("main.reading")));
		let t = l.entries.filter((e) => !e.folder), n = t.reduce((e, t) => e + t.size, 0), o = $("button", {
			type: "button",
			class: "primary",
			disabled: f || !l.entries.length,
			"aria-busy": f ? "true" : "false",
			onclick: h
		}, r(f ? "main.extracting" : "main.extract"));
		a.replaceChildren(...[
			$("h1", {}, c.name),
			$("p", {}, r("main.summary", {
				n: t.length,
				size: i(n),
				packed: i(c.size)
			})),
			l.entries.length ? $("ul", {
				class: "list",
				"aria-label": r("main.content")
			}, ...l.entries.slice(0, Be).map((e) => $("li", { class: e.folder ? "folder" : "" }, $("span", {
				class: "name",
				title: e.path.join("/")
			}, e.path.join("/") + (e.folder ? "/" : "")), $("span", { class: "size" }, e.folder ? "" : i(e.size)))), l.entries.length > Be && $("li", { class: "more" }, r("main.more", { n: l.entries.length - Be }))) : $("div", { class: "empty" }, r("main.empty")),
			l.skipped.length > 0 && $("p", { class: "warn" }, Ue(r, l.skipped)),
			d && $("p", {
				class: "ok",
				role: "status"
			}, d),
			$("div", { class: "row" }, $("button", {
				type: "button",
				onclick: () => e.window.close()
			}, r("common.close")), o)
		].filter(Boolean));
	};
	async function h() {
		if (!f) {
			f = !0, d = null, m();
			try {
				let t = await je(e, s);
				d = [r("done.unzip", {
					name: t.name,
					n: t.count
				}), Ue(r, t.skipped)].filter(Boolean).join(" "), e.ui.notify({
					text: d,
					level: "success"
				}), await Fe(e, "zip.unzip", {
					params: { file: s },
					result: t.id
				});
			} catch (t) {
				u = He(e, t);
			}
			f = !1, m();
		}
	}
	let g = async () => {
		if (m(), s) {
			try {
				c = await e.files.info(s), l = Ae(new Uint8Array(await (await e.files.read(s, { bytes: !0 })).arrayBuffer()));
			} catch (t) {
				u = He(e, t);
			}
			m();
		}
	};
	p(n);
	let _ = e.on("launch", (e) => {
		p(e), g();
	});
	return await g(), () => {
		_(), o();
	};
}
async function Ge({ lilos: e }) {
	let t = (t, n) => e.locale.i18n.t(t, n), n = (t) => e.locale.formatBytes(t), r = (n) => De(e, n, { archiveName: t("archive.name") });
	ze(e, {
		automation: {
			"zip.zip": async (e) => (await r(Array.isArray(e.items) ? e.items : [])).id,
			"zip.unzip": async (t) => {
				if (typeof t.file != "string") throw Error("unknown");
				return (await je(e, t.file)).id;
			}
		},
		actions: {
			"zip.zip": async (i) => {
				let a = await r(i);
				return await e.ui.notify({
					text: t("done.zip", {
						name: a.name,
						n: a.count,
						size: n(a.size)
					}),
					level: "success"
				}), await Fe(e, "zip.zip", {
					params: { items: i },
					result: a.id
				}), { name: a.name };
			},
			"zip.unzip": async (n) => {
				let r = [];
				for (let i of n) {
					let n = await je(e, i);
					r.push(n.name), await e.ui.notify({
						text: [t("done.unzip", {
							name: n.name,
							n: n.count
						}), Ue(t, n.skipped)].filter(Boolean).join(" "),
						level: n.skipped.length ? "warning" : "success"
					}), await Fe(e, "zip.unzip", {
						params: { file: i },
						result: n.id
					});
				}
				return { names: r };
			}
		},
		onError: async (t) => (await e.ui.notify({
			text: He(e, t),
			level: "error"
		}), { error: t?.message ?? String(t) }),
		explainError: (t) => He(e, t)
	});
}
export { We as main, Ge as work };
