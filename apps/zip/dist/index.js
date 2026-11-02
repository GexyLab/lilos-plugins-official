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
async function Ce(e) {
	let t = (await e.files.info("~")).path;
	return {
		ref: (e) => e === t ? "~" : e.startsWith(`${t}/`) ? `~${e.slice(t.length)}` : Q("outside", e),
		parent: (e) => e.slice(0, e.lastIndexOf("/")) || "~"
	};
}
var we = async (e, t) => new Set((await e.files.list(t)).map((e) => e.name.toLowerCase())), Te = async (e, t) => new Uint8Array(await (await e.files.read(t, { bytes: !0 })).arrayBuffer()), Ee = (e) => new Date(Math.min(Math.max(Number.isFinite(e) ? e : Date.now(), Date.UTC(1980, 0, 2)), Date.UTC(2099, 11, 30)));
async function De(e, t, { archiveName: n = "Archive", onProgress: r } = {}) {
	let { ref: i, parent: a } = await Ce(e), o = (await Promise.all(t.map((t) => e.files.info(t)))).map((e) => ({
		...e,
		ref: i(e.path)
	}));
	if (!o.length) throw Q("nothing");
	let s = a(o[0].ref), c = {}, l = 0, u = 0, d = async (t, n, i, a) => {
		if (i.type === "folder") {
			let r = t[n] = {};
			for (let t of await e.files.list(a)) (t.type === "file" || t.type === "folder") && await d(r, t.name, t, `${a}/${t.name}`);
		} else if (i.type === "file") {
			if (++u > 1e4) throw Q("tooMany", ge);
			if (l += i.size ?? 0, l > 268435456) throw Q("tooBig", he);
			r?.({
				count: u,
				name: n
			}), t[n] = [await Te(e, a).catch((e) => {
				throw Q("read", `${n}: ${e?.message ?? e}`);
			}), {
				mtime: Ee(i.modified),
				level: _e.has(ye(n).toLowerCase()) ? 0 : 6
			}];
		}
	}, f = /* @__PURE__ */ new Set();
	for (let e of o) await d(c, Se(e.name, f, { folder: e.type === "folder" }), e, e.ref);
	let p = fe(c);
	if (p.byteLength > 10485760) throw Q("resultTooBig", p.byteLength);
	let m = o[0], h = Se(`${o.length === 1 ? m.type === "folder" ? m.name : be(m.name) : n}.zip`, await we(e, s)), g = `${s}/${h}`;
	return await e.files.write(g, p), {
		name: h,
		ref: g,
		count: u,
		size: p.byteLength
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
	let { ref: r, parent: i } = await Ce(e), a = await e.files.info(t);
	if (a.type !== "file") throw Q("notZip", a.name);
	let o = await Te(e, t).catch((e) => {
		throw Q("read", `${a.name}: ${e?.message ?? e}`);
	}), { entries: s, skipped: c } = Ae(o);
	if (!s.length) throw Q(c.length ? "skippedAll" : "empty", a.name);
	let l = new Set(s.map((e) => e.path[0].toLowerCase())).size === 1 && s.every((e) => e.path.length > 1 || e.folder), u = i(r(a.path)), d = Se(xe(l ? s[0].path[0] : be(a.name)) || "Archive", await we(e, u), { folder: !0 }), f = `${u}/${d}`, p = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), h = (e) => m.get(e) ?? m.set(e, /* @__PURE__ */ new Set()).get(e), g = (e) => {
		let t = f;
		for (let n = 0; n < e.length; n++) {
			let r = e.slice(0, n + 1).join("/").toLowerCase();
			p.has(r) || p.set(r, `${t}/${Se(e[n], h(t), { folder: !0 })}`), t = p.get(r);
		}
		return t;
	}, _ = /* @__PURE__ */ new Map();
	for (let e of s) {
		let t = l ? e.path.slice(1) : e.path;
		if (e.folder) g(t);
		else {
			let n = g(t.slice(0, -1));
			_.set(e.raw, `${n}/${Se(t.at(-1), h(n))}`);
		}
	}
	for (let t of [f, ...p.values()]) await e.files.mkdir(t);
	let v = 0, y = pe(o, { filter: (e) => _.has(e.name) });
	for (let [t, r] of Object.entries(y)) {
		let i = _.get(t);
		n?.({
			count: v + 1,
			name: i.slice(i.lastIndexOf("/") + 1)
		}), await e.files.write(i, r), v++;
	}
	return {
		name: d,
		ref: f,
		count: v,
		skipped: c
	};
}
// src/zip/ui.js
function $(e, t = {}, ...n) {
	let r = document.createElement(e);
	for (let [e, n] of Object.entries(t ?? {})) n != null && n !== !1 && (e === "class" ? r.className = n : e.startsWith("on") && typeof n == "function" ? r.addEventListener(e.slice(2), n) : e in r && typeof n != "string" ? r[e] = n : r.setAttribute(e, n === !0 ? "" : String(n)));
	return r.append(...n.flat().filter((e) => e != null && e !== !1).map((e) => e instanceof Node ? e : document.createTextNode(String(e)))), r;
}
var Me = "\n  :host, body { margin: 0; }\n  .zp { box-sizing: border-box; height: 100%; overflow: hidden; padding: 18px 20px; display: flex; flex-direction: column; gap: 12px; color: var(--text); font: 13px/1.45 var(--font, system-ui); }\n  .zp * { box-sizing: border-box; }\n  .zp h1 { font-size: 15px; font-weight: 600; margin: 0; overflow-wrap: anywhere; }\n  .zp p { margin: 0; color: var(--dim); }\n  .zp .hint { font-size: 12px; }\n  .zp .list { flex: 1; min-height: 60px; overflow: auto; list-style: none; margin: 0; padding: 0; border: 1px solid var(--border); border-radius: var(--radius-sm, 6px); }\n  .zp .list li { display: flex; align-items: center; gap: 10px; padding: 5px 10px; }\n  .zp .list li + li { border-top: 1px solid var(--border); }\n  .zp .list .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n  .zp .list .folder .name { color: var(--dim); }\n  .zp .list .size { color: var(--dim); font-size: 12px; font-variant-numeric: tabular-nums; white-space: nowrap; }\n  .zp .list .more { color: var(--dim); font-style: italic; }\n  .zp .empty { padding: 12px 10px; color: var(--dim); border: 1px solid var(--border); border-radius: var(--radius-sm, 6px); }\n  .zp .row { display: flex; gap: 8px; align-items: center; justify-content: flex-end; flex-wrap: wrap; }\n  .zp button { font: inherit; padding: 6px 14px; border-radius: var(--radius-sm, 6px); border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; }\n  .zp button:hover:not(:disabled) { background: var(--hover); }\n  .zp button:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }\n  .zp button.primary { background: var(--accent); border-color: var(--accent); color: #fff; }\n  .zp button.primary:hover:not(:disabled) { filter: brightness(1.08); background: var(--accent); }\n  .zp button:disabled { opacity: .55; cursor: default; }\n  .zp [aria-busy=\"true\"] { cursor: progress; }\n  .zp .error { color: var(--danger, #d64545); }\n  .zp .warn { padding: 8px 10px; border-radius: var(--radius-sm, 6px); background: color-mix(in srgb, #e0a030 14%, transparent); color: var(--text); }\n  .zp .ok { color: var(--text); }\n", Ne = 500;
function Pe(e, t) {
	let n = [
		"B",
		"KB",
		"MB",
		"GB"
	], r = 0;
	for (; t >= 1024 && r < n.length - 1;) t /= 1024, r++;
	return `${e.number(t, { maximumFractionDigits: r && t < 10 ? 1 : 0 })} ${n[r]}`;
}
function Fe(e, t) {
	let n = (t, n) => e.locale.i18n.t(t, n), r = t?.message, i = typeof t?.detail == "number" ? Pe(e.locale.i18n, t.detail) : String(t?.detail ?? "");
	return [
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
	].includes(r) ? n(`error.${r}`, {
		detail: i,
		limit: Pe(e.locale.i18n, me),
		max: t.detail
	}) : n("error.generic", { error: r ?? String(t) });
}
var Ie = async (e, t) => (await e.files.info(t)).id;
async function Le(e, t, n, r) {
	try {
		e.automation && await e.automation.record(t, {
			params: n,
			result: await Ie(e, r)
		});
	} catch {}
}
function Re(e, t) {
	if (!t.length) return "";
	let n = t.slice(0, 3).map((e) => e.name).join(", ");
	return e("skipped", {
		n: t.length,
		names: t.length > 3 ? `${n}, …` : n
	});
}
async function ze({ lilos: e, root: t, args: n }) {
	let r = (t, n) => e.locale.i18n.t(t, n);
	t.append($("style", {}, Me));
	let i = $("div", { class: "zp" });
	t.append(i);
	let a = null, o = null, s = null, c = "", l = null, u = !1, d = (e) => {
		a = e?.file ?? (Array.isArray(e?.files) ? e.files[0] : null) ?? null, o = s = l = null, c = "";
	}, f = () => {
		if (!a) return e.window.setTitle("Zip"), i.replaceChildren($("h1", {}, "Zip"), $("p", {}, r("main.intro")), $("p", { class: "hint" }, r("main.limits", { limit: Pe(e.locale.i18n, me) })));
		if (e.window.setTitle(o?.name ?? "Zip"), c) return i.replaceChildren($("h1", {}, o?.name ?? ""), $("div", {
			class: "error",
			role: "alert"
		}, c));
		if (!s) return i.replaceChildren($("p", {
			class: "hint",
			"aria-busy": "true"
		}, r("main.reading")));
		let t = s.entries.filter((e) => !e.folder), n = t.reduce((e, t) => e + t.size, 0), d = $("button", {
			type: "button",
			class: "primary",
			disabled: u || !s.entries.length,
			"aria-busy": u ? "true" : "false",
			onclick: p
		}, r(u ? "main.extracting" : "main.extract"));
		i.replaceChildren(...[
			$("h1", {}, o.name),
			$("p", {}, r("main.summary", {
				n: t.length,
				size: Pe(e.locale.i18n, n),
				packed: Pe(e.locale.i18n, o.size)
			})),
			s.entries.length ? $("ul", {
				class: "list",
				"aria-label": r("main.content")
			}, ...s.entries.slice(0, Ne).map((t) => $("li", { class: t.folder ? "folder" : "" }, $("span", {
				class: "name",
				title: t.path.join("/")
			}, t.path.join("/") + (t.folder ? "/" : "")), $("span", { class: "size" }, t.folder ? "" : Pe(e.locale.i18n, t.size)))), s.entries.length > Ne && $("li", { class: "more" }, r("main.more", { n: s.entries.length - Ne }))) : $("div", { class: "empty" }, r("main.empty")),
			s.skipped.length > 0 && $("p", { class: "warn" }, Re(r, s.skipped)),
			l && $("p", {
				class: "ok",
				role: "status"
			}, l),
			$("div", { class: "row" }, $("button", {
				type: "button",
				onclick: () => e.window.close()
			}, r("common.close")), d)
		].filter(Boolean));
	};
	async function p() {
		if (!u) {
			u = !0, l = null, f();
			try {
				let t = await je(e, a);
				l = [r("done.unzip", {
					name: t.name,
					n: t.count
				}), Re(r, t.skipped)].filter(Boolean).join(" "), e.ui.notify({
					text: l,
					level: "success"
				}), await Le(e, "zip.unzip", { file: a }, t.ref);
			} catch (t) {
				c = Fe(e, t);
			}
			u = !1, f();
		}
	}
	let m = async () => {
		if (f(), a) {
			try {
				o = await e.files.info(a), s = Ae(new Uint8Array(await (await e.files.read(a, { bytes: !0 })).arrayBuffer()));
			} catch (t) {
				c = Fe(e, t);
			}
			f();
		}
	};
	d(n);
	let h = e.on("launch", (e) => {
		d(e), m();
	}), g = e.on("locale", f);
	return await m(), () => {
		h(), g();
	};
}
async function Be({ lilos: e }) {
	let t = (t, n) => e.locale.i18n.t(t, n);
	async function n({ action: n, params: r }) {
		try {
			if (n === "zip.zip") return await Ie(e, (await De(e, Array.isArray(r?.items) ? r.items : [], { archiveName: t("archive.name") })).ref);
			if (n === "zip.unzip" && typeof r?.file == "string") return await Ie(e, (await je(e, r.file)).ref);
		} catch (t) {
			throw Error(Fe(e, t));
		}
		throw Error("unknown");
	}
	e.handle(async (r) => {
		if (r?.automation) return n(r.automation);
		let i = Array.isArray(r?.files) ? r.files : [];
		try {
			if (r?.action === "zip.zip") {
				let n = await De(e, i, { archiveName: t("archive.name") });
				return await e.ui.notify({
					text: t("done.zip", {
						name: n.name,
						n: n.count,
						size: Pe(e.locale.i18n, n.size)
					}),
					level: "success"
				}), await Le(e, "zip.zip", { items: i }, n.ref), { name: n.name };
			}
			if (r?.action === "zip.unzip") {
				let n = [];
				for (let r of i) {
					let i = await je(e, r);
					n.push(i.name), await e.ui.notify({
						text: [t("done.unzip", {
							name: i.name,
							n: i.count
						}), Re(t, i.skipped)].filter(Boolean).join(" "),
						level: i.skipped.length ? "warning" : "success"
					}), await Le(e, "zip.unzip", { file: r }, i.ref);
				}
				return { names: n };
			}
		} catch (t) {
			return await e.ui.notify({
				text: Fe(e, t),
				level: "error"
			}), { error: t?.message ?? String(t) };
		}
		throw Error("unknown");
	});
}
export { ze as main, Be as work };
