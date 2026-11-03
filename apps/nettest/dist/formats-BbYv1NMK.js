function e(e = 10) {
	let t = new Uint8Array(e);
	if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(t);
	else for (let n = 0; n < e; n++) t[n] = Math.floor(Math.random() * 256);
	let n = "";
	for (let e of t) n += "0123456789abcdefghijklmnopqrstuvwxyz"[e % 36];
	return n;
}
var t = (e) => typeof e == "string" ? e : e == null ? "" : typeof e == "object" ? JSON.stringify(e) : String(e), n = (e) => !!e && typeof e == "object" && !Array.isArray(e), r = (e) => Array.isArray(e) ? e.filter((e) => e != null) : [], i = (e) => e && e.enabled !== !1;
function a(e) {
	return {
		format: "nettest",
		version: 1,
		name: t(e) || "Collezione importata",
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
function o(n, r = {}) {
	return {
		id: e(),
		type: "folder",
		name: t(n) || "Cartella",
		items: [],
		auth: { type: "inherit" },
		scripts: {
			pre: "",
			test: ""
		},
		...r
	};
}
function s(t = {}) {
	return {
		id: e(),
		type: "request",
		name: "Richiesta",
		protocol: "http",
		method: "GET",
		url: "",
		headers: [],
		body: { kind: "none" },
		auth: { type: "inherit" },
		settings: {},
		checks: [],
		extract: [],
		scripts: {
			pre: "",
			test: ""
		},
		...t
	};
}
var c = (e, n, r = !0) => ({
	key: t(e),
	value: t(n),
	enabled: r !== !1
}), l = (e, n, r = !0) => ({
	key: t(e),
	value: t(n),
	enabled: r !== !1
}), u = (e, n = !0) => ({
	key: t(e),
	value: "",
	secret: !0,
	needsValue: !0,
	enabled: n !== !1
}), d = (n, r = []) => ({
	id: e(),
	name: t(n) || "Ambiente",
	variables: r
});
function f(e, t) {
	t.key && !e.some((e) => e.key === t.key) && e.push(t);
}
var p = (e) => t(e).split(/[\\/]/).filter(Boolean).pop() ?? "", m = (e, n) => {
	let a = r(e).find((e) => i(e) && t(e.key).toLowerCase() === n.toLowerCase());
	return a ? t(a.value) : void 0;
};
function h(e) {
	let n = t(e).split(";")[0].trim().toLowerCase();
	return n ? n === "application/json" || n.endsWith("+json") || n === "text/json" ? "json" : n === "application/xml" || n === "text/xml" || n.endsWith("+xml") ? "xml" : n === "text/html" || n === "application/xhtml+xml" ? "html" : /^(application|text)\/(x-)?(javascript|ecmascript)$/.test(n) ? "javascript" : n === "application/x-www-form-urlencoded" ? "form" : n === "multipart/form-data" ? "multipart" : n.startsWith("text/") ? "text" : null : null;
}
var g = {
	text: "text/plain",
	json: "application/json",
	xml: "application/xml",
	html: "text/html",
	javascript: "application/javascript",
	graphql: "application/json",
	form: "application/x-www-form-urlencoded"
};
function _(e, n) {
	return n?.kind === "multipart" ? e.map((e) => t(e.key).toLowerCase() === "content-type" && /^multipart\//i.test(t(e.value)) ? {
		...e,
		enabled: !1
	} : e) : e;
}
function v(e) {
	let n = (e) => {
		try {
			return decodeURIComponent(e.replace(/\+/g, " "));
		} catch {
			return e;
		}
	};
	return t(e).split("&").filter(Boolean).map((e) => {
		let t = e.indexOf("=");
		return {
			key: n(t < 0 ? e : e.slice(0, t)),
			value: t < 0 ? "" : n(e.slice(t + 1)),
			type: "text",
			enabled: !0
		};
	});
}
var ee = (e) => /^[^=&\s{}[\]"]+=[^&]*(&[^=&\s]+=[^&]*)*$/.test(t(e).trim()), y = (e) => t(e).replace(/[%&#=+ ]/g, (e) => e === " " ? "%20" : encodeURIComponent(e));
function b(e, t) {
	let n = t.map(([e, t]) => t === void 0 ? y(e) : `${y(e)}=${y(t)}`);
	if (!n.length) return e;
	let r = e.indexOf("#"), i = r < 0 ? e : e.slice(0, r);
	return `${i}${i.includes("?") ? /[?&]$/.test(i) ? "" : "&" : "?"}${n.join("&")}${r < 0 ? "" : e.slice(r)}`;
}
function x(e, n) {
	let r = t(n).replace(/^[a-z][a-z0-9+.-]*:\/\/[^/?#]*/i, "").replace(/^\{\{[^{}]+\}\}/, "").split(/[?#]/)[0];
	return `${t(e).toUpperCase() || "GET"} ${r || "/"}`.slice(0, 120);
}
function S() {
	let e = [], t = /* @__PURE__ */ new Map();
	return {
		add(t) {
			t && !e.includes(t) && e.push(t);
		},
		group(e, n) {
			let r = t.get(e) ?? [];
			r.includes(n) || r.push(n), t.set(e, r);
		},
		list() {
			let n = [...t].map(([e, t]) => `${e}: ${t.slice(0, 4).join(", ")}${t.length > 4 ? ` e altri ${t.length - 4}` : ""}`);
			return [...e, ...n];
		}
	};
}
var C = /* @__PURE__ */ new Set([
	"$guid",
	"$randomUUID",
	"$timestamp",
	"$isoTimestamp",
	"$randomInt",
	"$randomBoolean",
	"$randomFirstName",
	"$randomLastName",
	"$randomFullName",
	"$randomEmail",
	"$randomAlphaNumeric",
	"$randomHexColor"
]), w = {
	basic: ["password"],
	digest: ["password"],
	bearer: ["token"],
	apikey: ["value"],
	aws4: ["secretKey", "sessionToken"],
	oauth2: [
		"clientSecret",
		"password",
		"token"
	]
}, T = (e) => /^\s*\{\{[^{}]+\}\}\s*$/.test(e), E = /\b(pm|postman|insomnia)\.(sendRequest|cookies|vault|visualizer|execution|setNextRequest|require|iterationData\.set)\b|\bpostman\.\w+|\brequire\s*\(|\btv4\b|\bjsonSchema\b/;
function D(e, n, i, a) {
	let o = [], s = [], c = 0, l = (e, n) => {
		let i = e?.body;
		i?.kind === "file" && !t(i.file) && c++, i?.kind === "multipart" && (c += r(i.fields).filter((e) => e.type === "file" && !t(e.file)).length);
		let a = e?.auth;
		for (let e of w[a?.type] ?? []) if (t(a[e]) && !T(t(a[e]))) {
			o.push(n);
			break;
		}
		E.test(`${t(e?.scripts?.pre)}\n${t(e?.scripts?.test)}`) && s.push(n);
		for (let n of r(e?.items)) l(n, `«${t(n.name)}»`);
	};
	if (e) {
		l(e, "la collezione"), o.length && i.add(`Credenziali scritte in chiaro in ${o.slice(0, 4).join(", ")}${o.length > 4 ? ` e altri ${o.length - 4}` : ""}: meglio una variabile segreta`), s.length && i.add(`Script con funzioni che NetTest non ha (sendRequest, cookies, require…) in ${s.slice(0, 4).join(", ")}${s.length > 4 ? ` e altri ${s.length - 4}` : ""}`);
		let t = /* @__PURE__ */ new Set();
		for (let n of JSON.stringify(e).matchAll(/\{\{\s*(\$[A-Za-z]\w*)\s*\}\}/g)) C.has(n[1]) || t.add(n[1]);
		c && i.add(`${c === 1 ? "Un file da scegliere" : `${c} file da scegliere`} nei corpi delle richieste`), t.size && i.add(`Variabili dinamiche che NetTest non conosce: ${[...t].slice(0, 6).map((e) => `{{${e}}}`).join(", ")}`), e.environments = n;
	}
	let u = [...r(e?.variables), ...n.flatMap((e) => r(e.variables))].filter((e) => e.needsValue).length;
	return u && i.add(`${u === 1 ? "Una variabile segreta da scrivere" : `${u} variabili segrete da scrivere`} (i valori segreti non si importano)`), {
		format: a,
		collection: e,
		environments: n,
		warnings: i.list()
	};
}
// src/nettest/formats/yaml.js
var O = /^-(?:[ \t]|$)/, k = (e, t, n) => Object.defineProperty(e, t, {
	value: n,
	enumerable: !0,
	writable: !0,
	configurable: !0
});
function A(e) {
	return new j(String(e ?? "")).read();
}
var j = class {
	constructor(e) {
		for (this.raw = e.replace(/^﻿/, "").replace(/\r\n?/g, "\n").split("\n"), this.lines = this.raw.map((e) => {
			let t = /^( *)(.*)$/.exec(e);
			return {
				indent: t[1].length,
				text: t[2].replace(/[ \t]+$/, "")
			};
		}), this.pos = 0, this.end = this.lines.length, this.anchors = Object.create(null); this.pos < this.end && (this.blank(this.pos) || this.lines[this.pos].text.startsWith("%"));) this.pos++;
		if (this.pos < this.end && this.lines[this.pos].indent === 0 && /^---(\s|$)/.test(this.lines[this.pos].text)) {
			let e = this.lines[this.pos].text.slice(3).trim();
			e && !e.startsWith("#") ? this.lines[this.pos] = {
				indent: 0,
				text: e
			} : this.pos++;
		}
		for (let e = this.pos + 1; e < this.end; e++) if (this.lines[e].indent === 0 && /^(---|\.\.\.)(\s|$)/.test(this.lines[e].text)) {
			this.end = e;
			break;
		}
	}
	fail(e, t = this.pos) {
		throw Error(`YAML: ${e} (riga ${Math.min(t, this.raw.length - 1) + 1})`);
	}
	blank(e) {
		let t = this.lines[e].text.trimStart();
		return t === "" || t.startsWith("#");
	}
	next() {
		for (; this.pos < this.end && this.blank(this.pos);) this.pos++;
		return this.pos < this.end ? this.lines[this.pos] : null;
	}
	read() {
		let e = this.node(0);
		return this.next() && this.fail("struttura non valida"), e;
	}
	node(e) {
		let t = this.next();
		return !t || t.indent < e ? null : O.test(t.text) ? this.seq(t.indent) : M(t.text) ? this.map(t.indent) : (this.pos++, this.value(t.text, t.indent - 1, !1));
	}
	map(e) {
		let t = {};
		for (;;) {
			let n = this.next();
			if (!n || n.indent < e) break;
			n.indent > e && this.fail("rientro non valido");
			let r = M(n.text);
			if (!r) {
				if (O.test(n.text)) break;
				this.fail(n.text.startsWith("? ") ? "chiavi complesse non supportate" : "manca «:» dopo la chiave");
			}
			this.pos++;
			let i = this.value(r.rest, e, !0);
			if (r.key === "<<" && !r.quoted) {
				for (let e of Array.isArray(i) ? i : [i]) if (e && typeof e == "object") for (let [n, r] of Object.entries(e)) Object.hasOwn(t, n) || k(t, n, r);
			} else k(t, r.key, i);
		}
		return t;
	}
	seq(e) {
		let t = [];
		for (;;) {
			let n = this.next();
			if (!n || n.indent !== e || !O.test(n.text)) break;
			let r = n.text.slice(1), i = /^[ \t]*/.exec(r)[0].length, a = r.slice(i);
			if (a === "" || a.startsWith("#")) {
				this.pos++, t.push(this.node(e + 1));
				continue;
			}
			let o = e + 1 + i;
			O.test(a) || M(a) ? (this.lines[this.pos] = {
				indent: o,
				text: a
			}, t.push(this.node(o))) : (this.pos++, t.push(this.value(a, e, !1)));
		}
		return t;
	}
	value(e, t, n) {
		let r = e, i = null;
		for (;;) {
			let e = /^&(\S+)[ \t]*/.exec(r);
			if (e) {
				i = e[1], r = r.slice(e[0].length);
				continue;
			}
			let t = /^!\S*[ \t]*/.exec(r);
			if (t) r = r.slice(t[0].length);
			else break;
		}
		let a;
		if (r === "" || r.startsWith("#")) {
			if (a = this.node(t + 1), a === null && n) {
				let e = this.next();
				e && e.indent === t && O.test(e.text) && (a = this.seq(t));
			}
		} else if (r[0] === "|" || r[0] === ">") a = this.block(r, t);
		else if (r[0] === "*") {
			let e = /^\*(\S+)/.exec(r)[1];
			Object.hasOwn(this.anchors, e) || this.fail(`alias sconosciuto *${e}`, this.pos - 1), a = this.anchors[e];
		} else a = this.inline(r, t);
		return i && (this.anchors[i] = a), a;
	}
	inline(e, t) {
		let n = e, r = n[0];
		if (r === "\"" || r === "'") {
			for (; P(n, 0) < 0 && this.pos < this.end;) n += `\n${this.raw[this.pos++].trim()}`;
			let e = P(n, 0);
			return e < 0 && this.fail("stringa non chiusa"), te(n.slice(0, e + 1));
		}
		if (r === "[" || r === "{") {
			for (; !ne(n) && this.pos < this.end;) n += ` ${this.raw[this.pos++].trim()}`;
			let e = new ie(n), t = e.value();
			return e.ws(), e.i < n.length && n[e.i] !== "#" && this.fail("collezione non valida", this.pos - 1), t;
		}
		let i = N(n);
		for (; this.pos < this.end;) {
			let e = this.lines[this.pos];
			if (this.blank(this.pos) || e.indent <= t) break;
			M(e.text) && this.fail("rientro non valido"), i += ` ${N(e.text)}`, this.pos++;
		}
		return re(i.trim());
	}
	block(e, t) {
		let n = /^([|>])([-+]?)(\d?)([-+]?)/.exec(e), r = n[1] === ">", i = n[2] || n[4], a = n[3] ? t + Number(n[3]) : -1, o = [];
		for (; this.pos < this.end;) {
			let e = this.raw[this.pos];
			if (e.trim() === "") {
				o.push(""), this.pos++;
				continue;
			}
			let n = /^ */.exec(e)[0].length;
			if (a < 0) {
				if (n <= t) break;
				a = n;
			}
			if (n < a) break;
			o.push(e.slice(a)), this.pos++;
		}
		let s = 0;
		for (; o.length && o[o.length - 1] === "";) o.pop(), s++;
		let c;
		if (!r) c = o.join("\n");
		else {
			c = "";
			let e = !0, t = "";
			for (let n of o) n === "" ? (c += "\n", e = !0) : (c += !c || e ? n : (n.startsWith(" ") || t.startsWith(" ") ? "\n" : " ") + n, e = !1, t = n);
		}
		return o.length ? i === "-" ? c : i === "+" ? `${c}\n${"\n".repeat(s)}` : `${c}\n` : i === "+" ? "\n".repeat(s) : "";
	}
};
function M(e) {
	let t = e[0];
	if (!t || t === "#" || t === "[" || t === "{" || O.test(e) || e.startsWith("? ")) return null;
	if (t === "\"" || t === "'") {
		let t = P(e, 0);
		if (t < 0) return null;
		let n = /^[ \t]*:(?:[ \t]+|$)/.exec(e.slice(t + 1));
		return n ? {
			key: String(te(e.slice(0, t + 1))),
			rest: e.slice(t + 1 + n[0].length),
			quoted: !0
		} : null;
	}
	let n = /:(?:[ \t]+|$)/.exec(e);
	if (!n) return null;
	let r = e.slice(0, n.index);
	return /[ \t]#/.test(r) ? null : {
		key: r.trim(),
		rest: e.slice(n.index + n[0].length),
		quoted: !1
	};
}
function N(e) {
	let t = /(^|[ \t])#/.exec(e);
	return (t ? e.slice(0, t.index) : e).trimEnd();
}
function P(e, t) {
	let n = e[t];
	for (let r = t + 1; r < e.length; r++) if (n === "\"" && e[r] === "\\") r++;
	else if (e[r] === n) {
		if (n === "'" && e[r + 1] === "'") {
			r++;
			continue;
		}
		return r;
	}
	return -1;
}
var F = {
	0: "\0",
	a: "\x07",
	b: "\b",
	t: "	",
	"	": "	",
	n: "\n",
	v: "\v",
	f: "\f",
	r: "\r",
	e: "\x1B",
	" ": " ",
	"\"": "\"",
	"/": "/",
	"\\": "\\",
	N: "",
	_: "\xA0",
	L: "\u2028",
	P: "\u2029"
};
function te(e) {
	let t = e.slice(1, -1);
	return e[0] === "'" ? t.replace(/[ \t]*\n[ \t]*/g, " ").replace(/''/g, "'") : t.replace(/[ \t]*\n[ \t]*/g, " ").replace(/\\(x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8}|.)/g, (e, t) => t.length > 1 ? String.fromCodePoint(parseInt(t.slice(1), 16)) : Object.hasOwn(F, t) ? F[t] : e);
}
function ne(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === "\"" || r === "'") {
			let t = P(e, n);
			if (t < 0) return !1;
			n = t;
		} else if (r === "[" || r === "{") t++;
		else if ((r === "]" || r === "}") && (t--, t === 0)) return !0;
	}
	return t === 0;
}
function re(e) {
	return e === "" || e === "~" || /^(null|Null|NULL)$/.test(e) ? null : /^(true|True|TRUE)$/.test(e) ? !0 : /^(false|False|FALSE)$/.test(e) ? !1 : /^[-+]?(0|[1-9][0-9]*)$/.test(e) ? Number(e) : /^0x[0-9a-fA-F]+$/.test(e) ? parseInt(e.slice(2), 16) : /^0o[0-7]+$/.test(e) ? parseInt(e.slice(2), 8) : /^[-+]?(\.[0-9]+|(0|[1-9][0-9]*)(\.[0-9]*)?)([eE][-+]?[0-9]+)?$/.test(e) ? Number(e) : /^[-+]?\.(inf|Inf|INF)$/.test(e) ? e[0] === "-" ? -Infinity : Infinity : /^\.(nan|NaN|NAN)$/.test(e) ? NaN : e;
}
var ie = class {
	constructor(e) {
		this.t = e, this.i = 0;
	}
	ws() {
		for (; this.i < this.t.length && /\s/.test(this.t[this.i]);) this.i++;
	}
	value() {
		this.ws();
		let e = this.t[this.i];
		if (e === "[") {
			this.i++;
			let e = [];
			for (;;) {
				if (this.ws(), this.t[this.i] === "]") return this.i++, e;
				if (this.i >= this.t.length) throw Error("YAML: «]» mancante");
				e.push(this.value()), this.ws(), this.t[this.i] === "," && this.i++;
			}
		}
		if (e === "{") {
			this.i++;
			let e = {};
			for (;;) {
				if (this.ws(), this.t[this.i] === "}") return this.i++, e;
				if (this.i >= this.t.length) throw Error("YAML: «}» mancante");
				let t = this.scalar(!0);
				this.ws();
				let n = null;
				this.t[this.i] === ":" && (this.i++, n = this.value()), k(e, String(t), n), this.ws(), this.t[this.i] === "," && this.i++;
			}
		}
		return this.scalar(!1);
	}
	scalar(e) {
		this.ws();
		let t = this.t[this.i];
		if (t === "\"" || t === "'") {
			let e = P(this.t, this.i);
			if (e < 0) throw Error("YAML: stringa non chiusa");
			let t = te(this.t.slice(this.i, e + 1));
			return this.i = e + 1, t;
		}
		let n = this.i;
		for (; this.i < this.t.length;) {
			let t = this.t[this.i];
			if (t === "," || t === "]" || t === "}" || t === "[" || t === "{" || t === ":" && (e || /[\s,\]}]/.test(this.t[this.i + 1] ?? " ")) || t === "#" && /\s/.test(this.t[this.i - 1] ?? "")) break;
			this.i++;
		}
		return re(this.t.slice(n, this.i).trim());
	}
}, ae = (e) => n(e) && n(e.info) && Array.isArray(e.item), oe = (e) => n(e) && Array.isArray(e.requests) && Array.isArray(e.order ?? e.folders), se = (e) => n(e) && Array.isArray(e.values) && !e.info && (typeof e._postman_variable_scope == "string" || typeof e.name == "string"), I = (e) => n(e) ? t(e.content) : t(e);
function ce(e, t) {
	let r = e[t];
	return Array.isArray(r) ? Object.fromEntries(r.filter((e) => e && e.key).map((e) => [e.key, e.value])) : n(r) ? r : {};
}
function le(e, r, i) {
	if (!n(e) || !e.type) return { type: "inherit" };
	let a = ce(e, e.type), o = (e) => t(a[e]);
	switch (e.type) {
		case "inherit": return { type: "inherit" };
		case "noauth": return { type: "none" };
		case "basic": return {
			type: "basic",
			user: o("username"),
			password: o("password")
		};
		case "digest": return {
			type: "digest",
			user: o("username"),
			password: o("password")
		};
		case "bearer": return {
			type: "bearer",
			token: o("token")
		};
		case "apikey": return {
			type: "apikey",
			key: o("key"),
			value: o("value"),
			in: o("in") === "query" ? "query" : "header"
		};
		case "awsv4": return {
			type: "aws4",
			accessKey: o("accessKey"),
			secretKey: o("secretKey"),
			region: o("region"),
			service: o("service"),
			...o("sessionToken") && { sessionToken: o("sessionToken") }
		};
		case "oauth2": return ue(a, r, i);
		default: return i.group(`Autenticazione non supportata (${e.type}), importata come nessuna`, r), { type: "none" };
	}
}
function ue(e, n, i) {
	let a = (n) => t(e[n]), o = a("headerPrefix"), s = {
		type: "oauth2",
		...o && o !== "Bearer" && { prefix: o }
	};
	a("addTokenTo") === "queryParams" && i.group("OAuth 2.0: il token va nell’header, non nell’indirizzo", n);
	let c = a("grant_type"), l = {
		tokenUrl: a("accessTokenUrl"),
		clientId: a("clientId"),
		clientSecret: a("clientSecret"),
		scope: a("scope"),
		send: a("client_authentication") === "body" ? "body" : "basic"
	}, u = r(e.tokenRequestParams).find((e) => e?.key === "audience");
	return u && (l.audience = t(u.value)), c === "client_credentials" ? {
		...s,
		grant: "client_credentials",
		...l
	} : c === "password_credentials" ? {
		...s,
		grant: "password",
		...l,
		username: a("username"),
		password: a("password")
	} : c === "authorization_code" || c === "authorization_code_with_pkce" ? (i.group("OAuth 2.0: serve un nuovo accesso", n), {
		...s,
		grant: "authorization_code",
		...l,
		authorizeUrl: a("authUrl"),
		tokens: null
	}) : (a("accessToken") && i.group("OAuth 2.0: token non importato, va scritto di nuovo", n), {
		...s,
		token: ""
	});
}
function de(e, i, a) {
	if (!e) return {
		url: "",
		params: null
	};
	let o = typeof e == "string" ? { raw: e } : n(e) ? e : {}, s = t(o.raw), c = r(o.query).filter((e) => e && e.key !== void 0);
	if (!s) {
		let e = Array.isArray(o.host) ? o.host.join(".") : t(o.host), r = Array.isArray(o.path) ? o.path.map((e) => n(e) ? t(e.value) : t(e)).join("/") : t(o.path);
		s = `${o.protocol ? `${o.protocol}://` : ""}${e}${o.port ? `:${o.port}` : ""}${r ? `/${r.replace(/^\//, "")}` : ""}`;
		let i = c.filter((e) => !e.disabled).map((e) => e.value === null || e.value === void 0 ? t(e.key) : `${t(e.key)}=${t(e.value)}`);
		i.length && (s += `?${i.join("&")}`), o.hash && (s += `#${o.hash}`);
	}
	let l = Object.fromEntries(r(o.variable).filter((e) => e && e.key).map((e) => [t(e.key), t(e.value)])), u = s.search(/[?#]/);
	s = (u < 0 ? s : s.slice(0, u)).replace(/\/:([A-Za-z_][\w.-]*)(?=\/|$)/g, (e, t) => l[t] ? `/${l[t]}` : (a.group("Parametri di percorso diventati {{variabili}}", `:${t}`), `/{{${t}}}`)) + (u < 0 ? "" : s.slice(u));
	let d = c.some((e) => e.disabled) ? c.map((e) => ({
		key: t(e.key),
		value: t(e.value),
		enabled: !e.disabled
	})) : null;
	return {
		url: s,
		params: d
	};
}
function fe(e) {
	return typeof e == "string" ? e.split(/\r?\n/).map((e) => /^\s*([^:]+):\s*(.*)$/.exec(e)).filter(Boolean).map((e) => c(e[1].trim(), e[2])) : r(e).filter((e) => e && e.key).map((e) => c(e.key, e.value, !e.disabled));
}
var pe = {
	json: "json",
	xml: "xml",
	html: "html",
	javascript: "javascript",
	text: "text"
};
function me(e, i, a, o) {
	if (!n(e) || !e.mode || e.disabled) return { kind: "none" };
	switch (e.mode) {
		case "raw": {
			let n = pe[e.options?.raw?.language] ?? h(m(i, "content-type"));
			return {
				kind: [
					"form",
					"multipart",
					null
				].includes(n) || !n ? "text" : n,
				text: t(e.raw)
			};
		}
		case "urlencoded": return {
			kind: "form",
			fields: r(e.urlencoded).filter((e) => e && e.key !== void 0).map((e) => ({
				key: t(e.key),
				value: t(e.value),
				type: "text",
				enabled: !e.disabled
			}))
		};
		case "formdata": return {
			kind: "multipart",
			fields: r(e.formdata).filter((e) => e && e.key !== void 0).map((e) => {
				if (e.type === "file") {
					let n = Array.isArray(e.src) ? e.src : [e.src];
					return n.length > 1 && o.group("Più file in un campo: si tiene il primo", a), {
						key: t(e.key),
						value: "",
						type: "file",
						file: "",
						fileName: p(n[0]),
						contentType: t(e.contentType),
						enabled: !e.disabled
					};
				}
				return {
					key: t(e.key),
					value: t(e.value),
					type: "text",
					contentType: t(e.contentType),
					enabled: !e.disabled
				};
			})
		};
		case "file": return {
			kind: "file",
			file: "",
			fileName: p(n(e.file) ? e.file.src : e.file)
		};
		case "graphql": {
			let r = n(e.graphql) ? e.graphql : {}, i = typeof r.variables == "string" ? r.variables : r.variables ? JSON.stringify(r.variables, null, 2) : "";
			return {
				kind: "graphql",
				query: t(r.query),
				variables: i,
				...r.operationName && { operationName: t(r.operationName) }
			};
		}
		default: return o.group(`Corpo non supportato (${e.mode})`, a), { kind: "none" };
	}
}
function he(e, n, i) {
	let a = {
		pre: "",
		test: ""
	};
	for (let o of r(e)) {
		let e = o?.script?.exec, r = Array.isArray(e) ? e.join("\n") : t(e);
		if (!r.trim()) continue;
		if (o.disabled) {
			i.group("Script disattivati, non importati", n);
			continue;
		}
		let s = o.listen === "prerequest" ? "pre" : o.listen === "test" ? "test" : null;
		s && (a[s] = a[s] ? `${a[s]}\n${r}` : r);
	}
	return a;
}
function ge(e) {
	let t = {};
	return n(e) && (typeof e.followRedirects == "boolean" && (t.followRedirects = e.followRedirects), Number.isInteger(e.maxRedirects) && (t.maxRedirects = e.maxRedirects), e.strictSSL === !1 && (t.verify = !1)), t;
}
function _e(e, n, i) {
	let a = [];
	for (let n of r(e)) n && n.key !== void 0 && n.key !== null && n.key !== "" && (n.type === "secret" ? (f(a, u(n.key, n.disabled !== !0 && n.enabled !== !1)), i.group("Variabili segrete della collezione (meglio in un ambiente)", `«${t(n.key)}»`)) : f(a, l(n.key, n.value, n.disabled !== !0 && n.enabled !== !1)));
	return a;
}
function ve(e, i) {
	let a = typeof e.request == "string" ? {
		url: e.request,
		method: "GET"
	} : n(e.request) ? e.request : {}, o = `«${t(e.name) || "senza nome"}»`, c = (t(a.method) || "GET").toUpperCase(), { url: l, params: u } = de(a.url, o, i), d = fe(a.header), f = me(a.body, d, o, i), p = s({
		name: t(e.name) || x(c, l),
		protocol: f.kind === "graphql" ? "graphql" : "http",
		method: c,
		url: l,
		headers: _(d, f),
		body: f,
		auth: le(a.auth, o, i),
		settings: ge(e.protocolProfileBehavior),
		scripts: he(e.event, o, i)
	});
	u && (p.params = u);
	let m = I(a.description) || I(e.description);
	return m && (p.description = m), r(e.response).length && i.add("Gli esempi di risposta di Postman non si importano"), p;
}
function ye(e, i, a) {
	let s = [];
	for (let c of r(e)) if (n(c)) {
		if (Array.isArray(c.item)) {
			let e = `«${t(c.name) || "cartella"}»`, n = o(c.name, {
				auth: le(c.auth, e, a),
				scripts: he(c.event, e, a)
			});
			I(c.description) && (n.description = I(c.description));
			let r = _e(c.variable, e, a);
			if (r.length) {
				for (let e of r) f(i.variables, e);
				a.group("Variabili di cartella spostate nella collezione", e);
			}
			n.items = ye(c.item, i, a), s.push(n);
		} else c.request !== void 0 && s.push(ve(c, a));
	}
	return s;
}
function be(e, { name: n } = {}, r) {
	let i = a(n || t(e.info?.name));
	I(e.info?.description) && (i.description = I(e.info.description));
	let o = le(e.auth, "la collezione", r);
	return i.auth = o.type === "inherit" ? { type: "none" } : o, i.scripts = he(e.event, "la collezione", r), i.variables = _e(e.variable, "la collezione", r), i.items = ye(e.item, i, r), /v2\.[01]/.test(t(e.info?.schema)) || r.add("Versione di Postman non indicata: letta come v2.1"), {
		collection: i,
		environments: []
	};
}
function xe(e, { name: n } = {}) {
	let i = [];
	for (let n of r(e.values)) n && t(n.key) && f(i, n.type === "secret" ? u(n.key, n.enabled !== !1) : l(n.key, n.value, n.enabled !== !1));
	return {
		collection: null,
		environments: [d(n || t(e.name) || (e._postman_variable_scope === "globals" ? "Globali" : "Ambiente"), i)]
	};
}
// src/nettest/formats/insomnia.js
var Se = (e) => n(e) && e._type === "export" && Array.isArray(e.resources), Ce = (e) => n(e) && /^collection\.insomnia\.rest\/5/.test(t(e.type)), we = {
	unix: "{{$timestamp}}",
	"iso-8601": "{{$isoTimestamp}}"
};
function L(e, n) {
	let r = t(e);
	return r.includes("{") && (r = r.replace(/\{\{\s*_\.([\w.-]+)\s*\}\}/g, "{{$1}}").replace(/\{\{\s*_\[\s*['"]([^'"]+)['"]\s*\]\s*\}\}/g, "{{$1}}").replace(/\{\{\s*([\w.-]+)\s*\}\}/g, "{{$1}}").replace(/\{%\s*uuid\b[^%]*%\}/g, "{{$guid}}").replace(/\{%\s*now\s+'([\w-]+)'[^%]*%\}/g, (e, t) => we[t] ?? e), /\{%/.test(r) && n.add("Tag {% … %} di Insomnia (risposte, file, hash…) lasciati come sono: vanno sostituiti"), /\{\{\s*vault\./.test(r) && n.add("Il vault di Insomnia non si importa: le variabili {{vault.…}} vanno scritte")), r;
}
var R = (e, t) => typeof e == "string" ? t(e) : Array.isArray(e) ? e.map((e) => R(e, t)) : n(e) ? Object.fromEntries(Object.entries(e).map(([e, n]) => [e, R(n, t)])) : e, z = (e) => t(e).replace(/\binsomnia\./g, "pm.");
function Te(e, r, i) {
	if (!n(e) || !e.type) return { type: "inherit" };
	if (e.disabled) return { type: "none" };
	let a = (n) => t(e[n]);
	switch (e.type) {
		case "none": return { type: "none" };
		case "basic": return {
			type: "basic",
			user: a("username"),
			password: a("password")
		};
		case "digest": return {
			type: "digest",
			user: a("username"),
			password: a("password")
		};
		case "bearer": return {
			type: "bearer",
			token: a("token"),
			...a("prefix") && a("prefix") !== "Bearer" && { prefix: a("prefix") }
		};
		case "apikey": return a("addTo") === "cookie" ? {
			type: "apikey",
			key: "Cookie",
			value: `${a("key")}=${a("value")}`,
			in: "header"
		} : {
			type: "apikey",
			key: a("key"),
			value: a("value"),
			in: a("addTo") === "queryParams" ? "query" : "header"
		};
		case "iam": return {
			type: "aws4",
			accessKey: a("accessKeyId"),
			secretKey: a("secretAccessKey"),
			region: a("region"),
			service: a("service"),
			...a("sessionToken") && { sessionToken: a("sessionToken") }
		};
		case "oauth2": {
			let t = a("tokenPrefix"), n = {
				type: "oauth2",
				...t && t !== "Bearer" && { prefix: t }
			}, o = {
				tokenUrl: a("accessTokenUrl"),
				clientId: a("clientId"),
				clientSecret: a("clientSecret"),
				scope: a("scope"),
				send: e.credentialsInBody ? "body" : "basic",
				...a("audience") && { audience: a("audience") }
			};
			return e.grantType === "client_credentials" ? {
				...n,
				grant: "client_credentials",
				...o
			} : e.grantType === "password" ? {
				...n,
				grant: "password",
				...o,
				username: a("username"),
				password: a("password")
			} : e.grantType === "authorization_code" ? (i.group("OAuth 2.0: serve un nuovo accesso", r), {
				...n,
				grant: "authorization_code",
				...o,
				authorizeUrl: a("authorizationUrl"),
				tokens: null
			}) : {
				...n,
				token: ""
			};
		}
		default: return i.group(`Autenticazione non supportata (${e.type}), importata come nessuna`, r), { type: "none" };
	}
}
function Ee(e, i, a) {
	if (!n(e)) return { kind: "none" };
	let o = t(e.mimeType).split(";")[0].trim().toLowerCase();
	if (!o && !t(e.text)) return { kind: "none" };
	let s = r(e.params).filter((e) => e && e.name !== void 0);
	if (o === "application/x-www-form-urlencoded") return {
		kind: "form",
		fields: s.length ? s.map((e) => ({
			key: t(e.name),
			value: t(e.value),
			type: "text",
			enabled: !e.disabled
		})) : v(e.text)
	};
	if (o === "multipart/form-data") return {
		kind: "multipart",
		fields: s.map((e) => e.type === "file" ? {
			key: t(e.name),
			value: "",
			type: "file",
			file: "",
			fileName: p(e.fileName),
			enabled: !e.disabled
		} : {
			key: t(e.name),
			value: t(e.value),
			type: "text",
			enabled: !e.disabled
		})
	};
	if (o === "application/graphql") {
		let n = {};
		try {
			n = JSON.parse(t(e.text) || "{}");
		} catch {
			n = { query: t(e.text) };
		}
		let r = n.variables === void 0 || n.variables === null ? "" : typeof n.variables == "string" ? n.variables : JSON.stringify(n.variables, null, 2);
		return {
			kind: "graphql",
			query: t(n.query),
			variables: r,
			...n.operationName && { operationName: t(n.operationName) }
		};
	}
	if (o === "application/octet-stream" || e.fileName && !t(e.text)) return {
		kind: "file",
		file: "",
		fileName: p(e.fileName)
	};
	let c = h(o);
	return (c === "form" || c === "multipart") && a.group("Corpo letto come testo", i), {
		kind: c && c !== "form" && c !== "multipart" ? c : "text",
		text: t(e.text)
	};
}
function De(e) {
	return e === "on" || e === !0 ? { followRedirects: !0 } : e === "off" || e === !1 ? { followRedirects: !1 } : {};
}
function Oe(e, n) {
	let i = Object.fromEntries(r(n).filter((e) => e && e.name).map((e) => [t(e.name), t(e.value)])), a = e.search(/[?#]/), o = a < 0 ? e : e.slice(0, a);
	return Object.keys(i).length ? o.replace(/\/:([A-Za-z_][\w.-]*)(?=\/|$)/g, (e, t) => Object.hasOwn(i, t) ? `/${i[t] || `{{${t}}}`}` : e) + (a < 0 ? "" : e.slice(a)) : e;
}
function ke(e, n, { v5: i = !1 } = {}) {
	let a = `«${t(e.name) || "senza nome"}»`, o = (t(e.method) || "GET").toUpperCase(), l = Oe(t(e.url), e.pathParameters), u = r(e.parameters).filter((e) => e && t(e.name));
	l = b(l, u.filter((e) => !e.disabled).map((e) => [t(e.name), t(e.value)]));
	let d = r(e.headers).filter((e) => e && t(e.name)).map((e) => c(e.name, e.value, !e.disabled)), f = Ee(e.body, a, n), p = i ? {
		...De(e.settings?.followRedirects),
		...e.settings?.rejectUnauthorized === !1 && { verify: !1 }
	} : De(e.settingFollowRedirects), m = i ? {
		pre: z(e.scripts?.preRequest),
		test: z(e.scripts?.afterResponse)
	} : {
		pre: z(e.preRequestScript),
		test: z(e.afterResponseScript)
	}, h = s({
		name: t(e.name) || x(o, l),
		protocol: f.kind === "graphql" ? "graphql" : "http",
		method: o,
		url: l,
		headers: _(d, f),
		body: f,
		auth: Te(e.authentication, a, n),
		settings: p
	});
	return Object.assign(h, R({
		url: h.url,
		headers: h.headers,
		body: h.body,
		auth: h.auth
	}, (e) => L(e, n))), h.scripts = m, u.some((e) => e.disabled) && (h.params = u.map((e) => ({
		key: t(e.name),
		value: L(e.value, n),
		enabled: !e.disabled
	}))), t(e.description) && (h.description = t(e.description)), h;
}
function Ae(e, n, i, a) {
	let s = `«${t(e.name) || "cartella"}»`, c = o(e.name, {
		auth: R(Te(e.authentication, s, i), (e) => L(e, i)),
		scripts: a ? {
			pre: z(e.scripts?.preRequest),
			test: z(e.scripts?.afterResponse)
		} : {
			pre: z(e.preRequestScript),
			test: z(e.afterResponseScript)
		}
	});
	t(e.description) && (c.description = t(e.description));
	let u = B(e.environment);
	if (u.length) {
		for (let e of u) f(n.variables, l(e.key, L(e.value, i)));
		i.group("Variabili di cartella spostate nella collezione", s);
	}
	return r(e.headers).length && i.group("Header di cartella non importati", s), c;
}
function B(e, r = "") {
	let i = [];
	if (!n(e)) return i;
	for (let [a, o] of Object.entries(e)) {
		let e = r ? `${r}.${a}` : a;
		n(o) ? i.push(...B(o, e)) : i.push({
			key: e,
			value: Array.isArray(o) ? JSON.stringify(o) : t(o)
		});
	}
	return i;
}
function V(e, n) {
	return Array.isArray(e?.kvPairData) && e.environmentType === "kv" ? e.kvPairData.filter((e) => e && t(e.name)).map((e) => e.type === "secret" ? u(e.name, e.enabled !== !1) : l(e.name, L(e.value, n), e.enabled !== !1)) : B(e?.data).map((e) => l(e.key, L(e.value, n)));
}
function je(e, { name: r } = {}, i) {
	let s = e.resources.filter(n), c = /* @__PURE__ */ new Map();
	for (let e of s) {
		let n = t(e.parentId);
		c.has(n) || c.set(n, []), c.get(n).push(e);
	}
	for (let e of c.values()) e.sort((e, t) => (Number(e.metaSortKey) || 0) - (Number(t.metaSortKey) || 0));
	let l = s.filter((e) => e._type === "workspace"), u = a(r || t(l[0]?.name) || "Insomnia"), p = [], m = /* @__PURE__ */ new Set(), h = (e) => {
		let t = [];
		for (let n of c.get(e) ?? []) if (n._type === "request_group") {
			let e = Ae(n, u, i, !1);
			e.items = h(n._id), t.push(e);
		} else n._type === "request" ? t.push(ke(n, i)) : [
			"grpc_request",
			"websocket_request",
			"socketio_request"
		].includes(n._type) && m.add(n._type.replace("_request", ""));
		return t;
	}, g = l.length ? l : [{
		_id: "__root",
		name: u.name
	}];
	for (let e of g) for (let t of (c.get(e._id) ?? []).filter((e) => e._type === "environment")) {
		for (let e of V(t, i)) f(u.variables, e);
		for (let e of (c.get(t._id) ?? []).filter((e) => e._type === "environment")) p.push(d(e.name, V(e, i)));
	}
	for (let e of g) {
		let t = h(e._id);
		if (g.length > 1) {
			let n = o(e.name);
			n.items = t, u.items.push(n);
		} else u.items.push(...t);
	}
	return m.size && i.add(`Richieste ${[...m].join(", ")} di Insomnia non importate`), s.some((e) => e._type === "api_spec" && t(e.contents)) && i.add("La specifica API del progetto non si importa da qui: importala come file OpenAPI"), {
		collection: u,
		environments: p
	};
}
function Me(e, { name: i } = {}, o) {
	let s = a(i || t(e.name) || "Insomnia"), c = (e) => {
		let t = [];
		for (let i of r(e)) if (n(i)) {
			if (Array.isArray(i.children)) {
				let e = Ae(i, s, o, !0);
				e.items = c(i.children), t.push(e);
			} else (i.url !== void 0 || i.method !== void 0) && t.push(ke(i, o, { v5: !0 }));
		}
		return t;
	};
	s.items = c(e.collection);
	let l = [], u = e.environments;
	if (n(u)) {
		for (let e of V(u, o)) f(s.variables, e);
		for (let e of r(u.subEnvironments)) l.push(d(e.name, V(e, o)));
	}
	return {
		collection: s,
		environments: l
	};
}
// src/nettest/formats/openapi.js
var H = (e) => n(e) && (typeof e.openapi == "string" || typeof e.openapi == "number") && n(e.paths ?? {}), Ne = (e) => n(e) && String(e.swagger ?? "").startsWith("2") && n(e.paths ?? {}), Pe = [
	"get",
	"put",
	"post",
	"delete",
	"options",
	"head",
	"patch",
	"trace"
], Fe = 8;
function Ie(e, t) {
	let r = (t) => {
		let r = e;
		for (let e of t.slice(2).split("/")) {
			let t = decodeURIComponent(e).replace(/~1/g, "/").replace(/~0/g, "~");
			if (!n(r) && !Array.isArray(r)) return;
			r = r[t];
		}
		return r;
	};
	return function(e, i = /* @__PURE__ */ new Set()) {
		let a = e;
		for (let e = 0; e < 20 && n(a) && typeof a.$ref == "string"; e++) {
			let e = a.$ref;
			if (!e.startsWith("#/")) return t.add(`Riferimenti esterni non seguiti (${e.split("#")[0] || e})`), {};
			if (i.has(e)) return {};
			i.add(e), a = r(e);
		}
		return a ?? {};
	};
}
function Le(e) {
	let t = (r, { depth: i = 0, refs: a = [], forRequest: o = !0 } = {}) => {
		if (!n(r)) return null;
		let s = typeof r.$ref == "string" ? r.$ref : null;
		if (s && (a.includes(s) || a.length > Fe)) return null;
		let c = e(r), l = {
			depth: i + 1,
			refs: s ? [...a, s] : a,
			forRequest: o
		};
		if (c.example !== void 0) return c.example;
		if (Array.isArray(c.examples) && c.examples.length) return c.examples[0];
		if (c.default !== void 0) return c.default;
		if (Array.isArray(c.enum) && c.enum.length) return c.enum[0];
		if (c.const !== void 0) return c.const;
		if (i > Fe) return null;
		if (Array.isArray(c.allOf)) {
			let e = c.allOf.map((e) => t(e, l));
			return e.every((e) => n(e) || e === null) ? Object.assign({}, ...e.filter(Boolean), n(c.properties) ? t({
				...c,
				allOf: void 0
			}, l) : {}) : e.find((e) => e !== null) ?? null;
		}
		for (let e of ["oneOf", "anyOf"]) if (Array.isArray(c[e]) && c[e].length) return t(c[e][0], l);
		let u = Array.isArray(c.type) ? c.type.find((e) => e !== "null") : c.type;
		switch (u ||= n(c.properties) ? "object" : c.items ? "array" : null, u) {
			case "object": {
				let n = {};
				for (let [r, i] of Object.entries(c.properties ?? {})) {
					let a = e(i);
					o && a.readOnly || (o || !a.writeOnly) && (n[r] = t(i, l));
				}
				return n;
			}
			case "array": return c.items ? [t(c.items, l)] : [];
			case "integer": return 0;
			case "number": return 0;
			case "boolean": return !0;
			case "null": return null;
			case "string": return ze(c.format);
			default: return null;
		}
	};
	return t;
}
var Re = {
	date: "2024-01-01",
	"date-time": "2024-01-01T12:00:00Z",
	time: "12:00:00",
	email: "user@example.com",
	uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
	uri: "https://example.com",
	url: "https://example.com",
	hostname: "example.com",
	ipv4: "192.0.2.1",
	ipv6: "2001:db8::1",
	password: "",
	byte: "",
	binary: ""
}, ze = (e) => Object.hasOwn(Re, e) ? Re[e] : "string";
function U(e, t, r = "") {
	let i = String(t || "root").replace(/[^\w.-]/g, "_");
	return Array.isArray(e) ? e.map((e) => U(e, i, r)).join("\n") : n(e) ? `${r}<${i}>\n${Object.entries(e).map(([e, t]) => U(t, e, `${r}  `)).join("\n")}\n${r}</${i}>` : `${r}<${i}>${e == null ? "" : String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</${i}>`;
}
var W = (e) => e == null ? "" : typeof e == "object" ? JSON.stringify(e) : String(e), Be = (e) => t(e).replace(/[^\w.-]/g, "_") || "value";
function Ve(e, r, i, a) {
	let o = r ? e.components?.securitySchemes : e.securityDefinitions, s = /* @__PURE__ */ new Map(), c = Object.values(o ?? {}).filter((e) => i(e).type === "apiKey").length;
	for (let [e, d] of Object.entries(n(o) ? o : {})) {
		let n = i(d), o = [], f = (e) => (o.push(l(e, "")), `{{${e}}}`), p = (e) => (o.push(u(e)), `{{${e}}}`), m = null, h = t(n.type), g = t(n.scheme).toLowerCase();
		if (h === "basic" || h === "http" && g === "basic") m = {
			type: "basic",
			user: f("username"),
			password: p("password")
		};
		else if (h === "http" && g === "bearer") m = {
			type: "bearer",
			token: p("token")
		};
		else if (h === "http" && g === "digest") m = {
			type: "digest",
			user: f("username"),
			password: p("password")
		};
		else if (h === "apiKey") {
			let r = c > 1 ? Be(e) : "apiKey";
			m = n.in === "cookie" ? {
				type: "apikey",
				key: "Cookie",
				value: `${t(n.name)}=${p(r)}`,
				in: "header"
			} : {
				type: "apikey",
				key: t(n.name),
				value: p(r),
				in: n.in === "query" ? "query" : "header"
			};
		} else h === "oauth2" ? m = He(n, r, f, p, a) : h === "openIdConnect" ? (a.add("OpenID Connect: il token va scritto (o configura OAuth 2.0)"), m = {
			type: "oauth2",
			token: ""
		}) : a.add(`Schema di sicurezza non supportato: ${e} (${h}${g ? ` ${g}` : ""})`);
		m && s.set(e, {
			auth: m,
			vars: o
		});
	}
	return s;
}
function He(e, r, i, a, o) {
	let s = r ? n(e.flows) ? e.flows : {} : { [{
		application: "clientCredentials",
		password: "password",
		accessCode: "authorizationCode",
		implicit: "implicit"
	}[e.flow] ?? "implicit"]: e }, c = () => ({
		clientId: i("clientId"),
		clientSecret: a("clientSecret")
	});
	return s.clientCredentials ? {
		type: "oauth2",
		grant: "client_credentials",
		tokenUrl: t(s.clientCredentials.tokenUrl),
		...c(),
		scope: "",
		send: "basic"
	} : s.password ? {
		type: "oauth2",
		grant: "password",
		tokenUrl: t(s.password.tokenUrl),
		...c(),
		username: i("username"),
		password: a("password"),
		scope: "",
		send: "basic"
	} : s.authorizationCode ? (o.add("OAuth 2.0 con accesso dal browser: serve un accesso dalla richiesta"), {
		type: "oauth2",
		grant: "authorization_code",
		authorizeUrl: t(s.authorizationCode.authorizationUrl),
		tokenUrl: t(s.authorizationCode.tokenUrl),
		...c(),
		scope: "",
		send: "basic",
		tokens: null
	}) : (o.add("OAuth 2.0 implicito: il token va scritto"), {
		type: "oauth2",
		token: ""
	});
}
function Ue(e, i, a) {
	if (!Array.isArray(e)) return null;
	if (!e.length || e.every((e) => !n(e) || !Object.keys(e).length)) return {
		auth: { type: "none" },
		vars: []
	};
	for (let o of e) {
		let e = Object.keys(n(o) ? o : {}), s = e.find((e) => i.has(e));
		if (!s) continue;
		e.length > 1 && a.add("Requisiti di sicurezza con più schemi insieme: si usa il primo");
		let { auth: c, vars: l } = i.get(s), u = r(o[s]).map(t).filter(Boolean);
		return {
			auth: c.type === "oauth2" && c.grant && u.length ? {
				...c,
				scope: u.join(" ")
			} : c,
			vars: l
		};
	}
	return null;
}
var We = [
	(e) => e === "application/json",
	(e) => e.endsWith("+json"),
	(e) => e === "application/x-www-form-urlencoded",
	(e) => e === "multipart/form-data",
	(e) => e === "application/xml" || e === "text/xml",
	(e) => e.startsWith("text/"),
	() => !0
];
function Ge(e) {
	let t = Object.keys(n(e) ? e : {});
	for (let e of We) {
		let n = t.find((t) => e(t.toLowerCase()));
		if (n) return n;
	}
	return null;
}
function Ke(e, t, r, i, a) {
	let o = e.toLowerCase(), s = t.schema, l = t.example;
	l === void 0 && n(t.examples) && (l = i(Object.values(t.examples)[0]).value);
	let u = l === void 0 ? r(s) : l, d = h(o), f = [];
	if (d === "form" || d === "multipart") {
		let e = i(s), t = n(e.properties) ? e.properties : {};
		return {
			body: {
				kind: d,
				fields: Object.entries(t).map(([e, t]) => {
					let a = i(t), o = a.format === "binary" || a.format === "base64" || a.type === "array" && ["binary", "base64"].includes(i(a.items).format) || a.type === "file";
					return d === "multipart" && o ? {
						key: e,
						value: "",
						type: "file",
						file: "",
						fileName: "",
						enabled: !0
					} : {
						key: e,
						value: W(n(u) && u[e] !== void 0 ? u[e] : r(t)),
						type: "text",
						enabled: !0
					};
				})
			},
			headers: f
		};
	}
	if (d === "json") return o !== "application/json" && f.push(c("Content-Type", e)), {
		body: {
			kind: "json",
			text: typeof u == "string" ? u : JSON.stringify(u ?? {}, null, 2)
		},
		headers: f
	};
	if (d === "xml") {
		o !== "application/xml" && f.push(c("Content-Type", e));
		let t = i(s).xml?.name ?? a ?? "root";
		return {
			body: {
				kind: "xml",
				text: typeof u == "string" ? u : u == null ? "" : `<?xml version="1.0" encoding="UTF-8"?>\n${U(u, t)}`
			},
			headers: f
		};
	}
	return d ? (g[d] !== o && f.push(c("Content-Type", e)), {
		body: {
			kind: d,
			text: W(u)
		},
		headers: f
	}) : (f.push(c("Content-Type", e)), {
		body: {
			kind: "file",
			file: "",
			fileName: ""
		},
		headers: f
	});
}
function qe(e, i, a) {
	if (i) {
		let i = r(e.servers).filter((e) => n(e) && t(e.url));
		return i.length ? i.map((e) => {
			let r = t(e.url);
			for (let [i, a] of Object.entries(n(e.variables) ? e.variables : {})) r = r.split(`{${i}}`).join(t(a?.default ?? a?.enum?.[0]));
			return /^[a-z][a-z0-9+.-]*:\/\//i.test(r) || a.add(`Indirizzo del server relativo (${r}): completa la variabile baseUrl`), {
				url: r.replace(/\/+$/, ""),
				name: t(e.description) || r
			};
		}) : (a.add("Nessun server nella specifica: completa la variabile baseUrl"), [{
			url: "",
			name: ""
		}]);
	}
	return e.host || a.add("Nessun host nella specifica: completa la variabile baseUrl"), (r(e.schemes).length ? e.schemes : ["https"]).map((n) => {
		let r = `${e.host ? `${n}://${e.host}` : ""}${t(e.basePath)}`.replace(/\/+$/, "");
		return {
			url: r,
			name: r
		};
	});
}
function Je(e, n, i) {
	let a = /* @__PURE__ */ new Map();
	for (let o of [...r(e.parameters), ...r(n.parameters)]) {
		let e = i(o);
		t(e.name) && t(e.in) && a.set(`${e.in}:${e.name}`, e);
	}
	return [...a.values()];
}
function Ye(e, t, r) {
	let i = t ? r(e.schema) : e, a = e.example ?? (n(e.examples) ? r(Object.values(e.examples)[0]).value : void 0) ?? i.example ?? i.default ?? i.enum?.[0];
	return a === void 0 ? void 0 : W(a);
}
function Xe(t) {
	let r = Object.keys(n(t) ? t : {}), i = r.filter((e) => /^2\d\d$/.test(e));
	return i.length ? {
		id: e(),
		label: `Stato ${i.join(", ")}`,
		source: "status",
		path: "",
		op: "in",
		value: i.join(","),
		enabled: !0
	} : r.some((e) => /^2xx$/i.test(e)) ? {
		id: e(),
		label: "Stato 2xx",
		source: "status",
		path: "",
		op: "matches",
		value: "^2\\d\\d$",
		enabled: !0
	} : null;
}
function Ze(e, { name: i } = {}, u) {
	let p = H(e), m = Ie(e, u), g = Le(m), _ = a(i || t(e.info?.title) || "API");
	t(e.info?.description) && (_.description = t(e.info.description));
	let v = qe(e, p, u);
	_.variables.push(l("baseUrl", v[0].url));
	let ee = Ve(e, p, m, u), b = [], x = (e) => {
		for (let t of e) f(b, { ...t });
	}, S = Ue(e.security, ee, u);
	S && (_.auth = S.auth, x(S.vars));
	let C = /* @__PURE__ */ new Map();
	for (let n of r(e.tags)) t(n?.name) && !C.has(n.name) && C.set(n.name, o(n.name, t(n.description) ? { description: t(n.description) } : {}));
	let w = [], T = /* @__PURE__ */ new Set();
	for (let [i, a] of Object.entries(n(e.paths) ? e.paths : {})) {
		let d = m(a);
		for (let a of Pe) {
			let v = d[a];
			if (!n(v)) continue;
			let b = Je(d, v, m), S = `{{baseUrl}}${i.replace(/\{([^{}]+)\}/g, "{{$1}}")}`, E = [], D = [], O = [], k = [];
			for (let e of b) {
				let t = Ye(e, p, m);
				e.in === "path" ? f(_.variables, l(e.name, t ?? "")) : e.in === "query" ? e.required ? (t === void 0 && f(_.variables, l(e.name, "")), E.push(`${y(e.name)}=${t === void 0 ? `{{${e.name}}}` : y(t)}`)) : D.push(e.name) : e.in === "header" ? /^(accept|content-type|authorization)$/i.test(e.name) || O.push(c(e.name, t ?? "", !!e.required)) : e.in === "cookie" && k.push(`${e.name}=${t ?? ""}`);
			}
			for (let e of i.matchAll(/\{([^{}]+)\}/g)) f(_.variables, l(e[1], ""));
			E.length && (S += `?${E.join("&")}`), k.length && O.push(c("Cookie", k.join("; "), b.some((e) => e.in === "cookie" && e.required)));
			let A = { kind: "none" };
			if (p) {
				let e = m(v.requestBody), t = Ge(e.content);
				if (t) {
					let n = e.content[t]?.schema, r = typeof n?.$ref == "string" ? n.$ref.split("/").pop() : null, i = Ke(t, e.content[t] ?? {}, g, m, r);
					A = i.body, O.push(...i.headers);
				}
			} else {
				let n = r(v.consumes ?? e.consumes).map(t), i = b.find((e) => e.in === "body"), a = b.filter((e) => e.in === "formData");
				if (i) {
					let e = n.find((e) => h(e) === "json") ?? n.find((e) => !/form/.test(e)) ?? "application/json", t = typeof i.schema?.$ref == "string" ? i.schema.$ref.split("/").pop() : null, r = Ke(e, {
						schema: i.schema,
						example: i["x-example"]
					}, g, m, t);
					A = r.body, O.push(...r.headers);
				} else a.length && (A = {
					kind: a.some((e) => e.type === "file") || n.includes("multipart/form-data") ? "multipart" : "form",
					fields: a.map((e) => e.type === "file" ? {
						key: e.name,
						value: "",
						type: "file",
						file: "",
						fileName: "",
						enabled: !0
					} : {
						key: e.name,
						value: Ye(e, !1, m) ?? "",
						type: "text",
						enabled: e.required === !0
					})
				});
			}
			let j = { type: "inherit" };
			if (v.security !== void 0 && JSON.stringify(v.security) !== JSON.stringify(e.security)) {
				let e = Ue(v.security, ee, u);
				e && (j = e.auth, x(e.vars));
			}
			let M = s({
				name: `${t(v.summary).trim() || t(v.operationId) || `${a.toUpperCase()} ${i}`}${v.deprecated ? " (deprecata)" : ""}`.slice(0, 200),
				method: a.toUpperCase(),
				url: S,
				headers: O,
				body: A,
				auth: j
			}), N = Xe(v.responses);
			N && M.checks.push(N);
			let P = [t(v.description).trim(), D.length ? `Parametri facoltativi: ${D.join(", ")}` : ""].filter(Boolean);
			P.length && (M.description = P.join("\n\n"));
			let F = r(v.tags).map(t).find(Boolean);
			F ? (C.has(F) || C.set(F, o(F)), C.get(F).items.push(M), T.add(F)) : w.push(M);
		}
	}
	_.items = [...[...C.values()].filter((e) => T.has(e.name)), ...w], _.items.length || u.add("Nessuna operazione nella specifica");
	let E = [];
	if (v.length > 1) for (let e of v) E.push(d(e.name, [l("baseUrl", e.url), ...b.map((e) => ({ ...e }))]));
	else b.length && E.push(d(_.name, b));
	return {
		collection: _,
		environments: E
	};
}
// src/nettest/formats/har.js
var Qe = (e) => n(e) && n(e.log) && Array.isArray(e.log.entries), $e = /^(cookie|content-length|host|connection|keep-alive|transfer-encoding|upgrade|proxy-connection|te|trailer)$/i;
function et(e, i, a) {
	if (!n(e)) return { kind: "none" };
	let o = t(e.mimeType).split(";")[0].trim().toLowerCase(), s = r(e.params).filter((e) => e && e.name !== void 0);
	if (o === "application/x-www-form-urlencoded") return {
		kind: "form",
		fields: s.length ? s.map((e) => ({
			key: t(e.name),
			value: t(e.value),
			type: "text",
			enabled: !0
		})) : v(e.text)
	};
	if (o === "multipart/form-data") return s.length ? {
		kind: "multipart",
		fields: s.map((e) => e.fileName === void 0 ? {
			key: t(e.name),
			value: t(e.value),
			type: "text",
			enabled: !0
		} : {
			key: t(e.name),
			value: "",
			type: "file",
			file: "",
			fileName: p(e.fileName),
			contentType: t(e.contentType),
			enabled: !0
		})
	} : (a.group("Corpo multipart senza campi, letto come testo", i), {
		kind: "text",
		text: t(e.text)
	});
	let c = t(e.text);
	if (!c && !o) return { kind: "none" };
	if (e.encoding === "base64") return a.group("Corpo binario non importato (sceglierai un file)", i), {
		kind: "file",
		file: "",
		fileName: ""
	};
	let l = h(o);
	return {
		kind: l && l !== "form" && l !== "multipart" ? l : "text",
		text: c
	};
}
function tt(e, { name: n } = {}, i) {
	let l = a(n || "HAR"), u = /* @__PURE__ */ new Map(), d = 0, f = !1;
	for (let n of e.log.entries) {
		let e = n?.request, a = t(e?.url);
		if (!/^https?:\/\//i.test(a)) {
			d++;
			continue;
		}
		let o = (t(e.method) || "GET").toUpperCase(), l = `«${x(o, a)}»`, p = r(e.headers).filter((e) => e && t(e.name) && !t(e.name).startsWith(":")).map((e) => c(e.name, e.value, !$e.test(t(e.name))));
		p.some((e) => !e.enabled) && (f = !0);
		let m = et(e.postData, l, i), h = s({
			name: x(o, a),
			method: o,
			url: a,
			headers: _(p, m),
			body: m
		}), g = "";
		try {
			g = new URL(a).host;
		} catch {
			g = "";
		}
		u.has(g) || u.set(g, []), u.get(g).push(h);
	}
	if (u.size > 1) for (let [e, t] of u) {
		let n = o(e || "Altro");
		n.items = t, l.items.push(n);
	}
	else l.items = [...u.values()].flat();
	return d && i.add(`${d} voci non HTTP (data:, ws:, estensioni…) saltate`), f && i.add("Cookie e header della connessione importati ma disattivati"), {
		collection: l,
		environments: []
	};
}
// src/nettest/formats/curl.js
var nt = (e) => /^\s*(?:\$\s*)?curl(?:\.exe)?\s/im.test(String(e ?? "").replace(/^\s*(#|REM\b|::).*$/gim, "")), rt = {
	n: "\n",
	t: "	",
	r: "\r",
	e: "\x1B",
	a: "\x07",
	b: "\b",
	f: "\f",
	v: "\v",
	0: "\0"
};
function it(e) {
	let t = e.replace(/`\r?\n/g, " "), n = [], r = [], i = null, a = () => {
		i !== null && r.push(i), i = null;
	}, o = () => {
		a(), r.length && n.push(r), r = [];
	};
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (n === "\\") {
			if (t[e + 1] === "\n") {
				e++;
				continue;
			}
			if (t[e + 1] === "\r" && t[e + 2] === "\n") {
				e += 2;
				continue;
			}
			i = (i ?? "") + (t[e + 1] ?? ""), e++;
		} else if (n === "'") {
			let n = t.indexOf("'", e + 1);
			i = (i ?? "") + t.slice(e + 1, n < 0 ? void 0 : n), e = n < 0 ? t.length : n;
		} else if (n === "$" && t[e + 1] === "'") {
			let n = "", r = e + 2;
			for (; r < t.length && t[r] !== "'"; r++) {
				if (t[r] !== "\\") {
					n += t[r];
					continue;
				}
				let e = t[++r], i = /^x([0-9a-fA-F]{1,2})/.exec(t.slice(r)), a = /^u([0-9a-fA-F]{4})/.exec(t.slice(r));
				i ? (n += String.fromCharCode(parseInt(i[1], 16)), r += i[0].length - 1) : a ? (n += String.fromCharCode(parseInt(a[1], 16)), r += 4) : n += rt[e] ?? e;
			}
			i = (i ?? "") + n, e = r;
		} else if (n === "\"") {
			let n = "", r = e + 1;
			for (; r < t.length && t[r] !== "\""; r++) t[r] === "\\" && "$`\"\\\n".includes(t[r + 1]) ? (t[r + 1] !== "\n" && (n += t[r + 1]), r++) : n += t[r];
			i = (i ?? "") + n, e = r;
		} else if (n === " " || n === "	") a();
		else if (n === "\n" || n === "\r" || n === ";") o();
		else if (n === "&" && t[e + 1] === "&" || n === "|") o(), t[e + 1] === n && e++;
		else if (n === "#" && i === null) {
			for (; e < t.length && t[e] !== "\n";) e++;
			o();
		} else i = (i ?? "") + n;
	}
	return o(), n;
}
function at(e) {
	let t = e.replace(/\r\n?/g, "\n"), n = [], r = "", i = !1;
	for (let e = 0; e < t.length; e++) {
		let a = t[e];
		if (a === "\"") i = !i, r += a;
		else if (i) r += a;
		else if (a === "^") {
			let n = t[e + 1];
			if (n === "\n") {
				e++, t[e + 1] === "\n" && (r += "\n", e++);
				continue;
			}
			n !== void 0 && (r += n), e++;
		} else a === "\n" || a === "&" || a === "|" ? (r.trim() && n.push(r), r = "", t[e + 1] === a && e++) : r += a;
	}
	return r.trim() && n.push(r), n.map(ot).filter((e) => e.length && !/^(rem|::)$/i.test(e[0]));
}
function ot(e) {
	let t = [], n = null, r = !1;
	for (let i = 0; i < e.length; i++) {
		let a = e[i];
		if (a === "\\") {
			let t = 0;
			for (; e[i + t] === "\\";) t++;
			if (e[i + t] === "\"") {
				n = (n ?? "") + "\\".repeat(Math.floor(t / 2)), i += t - 1, t % 2 == 1 && (n += "\"", i++);
				continue;
			}
			n = (n ?? "") + "\\".repeat(t), i += t - 1;
		} else if (a === "\"") {
			if (r && e[i + 1] === "\"") {
				n = (n ?? "") + "\"", i++;
				continue;
			}
			r = !r, n ??= "";
		} else (a === " " || a === "	") && !r ? (n !== null && t.push(n), n = null) : n = (n ?? "") + a;
	}
	return n !== null && t.push(n), t;
}
var st = (e) => !/\s\\\r?\n/.test(e) && (/\s\^\r?\n/.test(e) || /(^|\s)\^"/.test(e)), ct = new Set("XHdFuAebowcmxUTErKyYzPQDt".split("")), lt = /* @__PURE__ */ new Set(/* @__PURE__ */ "request.header.data.data-raw.data-binary.data-ascii.data-urlencode.json.form.form-string.user.user-agent.referer.cookie.url.output.write-out.cookie-jar.max-time.connect-timeout.proxy.proxy-user.oauth2-bearer.aws-sigv4.upload-file.cacert.capath.cert.key.max-redirs.resolve.retry.limit-rate.range.config.interface.retry-delay.retry-max-time.speed-limit.speed-time.time-cond.trace.trace-ascii.stderr.dns-servers.noproxy.cert-type.key-type.pass.ciphers.tls-max.ftp-port.quote.expect100-timeout.unix-socket.abstract-unix-socket.connect-to.dump-header.variable.proto.proto-redir.header-file.request-target.telnet-option.local-port.max-filesize.netrc-file.pinnedpubkey.socks5.socks5-hostname.preproxy.happy-eyeballs-timeout-ms.keepalive-time.login-options.sasl-authzid.mail-from.mail-rcpt".split(".")), ut = {
	X: "request",
	H: "header",
	d: "data",
	F: "form",
	u: "user",
	A: "user-agent",
	e: "referer",
	b: "cookie",
	o: "output",
	w: "write-out",
	c: "cookie-jar",
	m: "max-time",
	x: "proxy",
	U: "proxy-user",
	T: "upload-file",
	E: "cert",
	r: "range",
	K: "config",
	D: "dump-header",
	k: "insecure",
	L: "location",
	G: "get",
	I: "head",
	s: "silent",
	S: "show-error",
	v: "verbose",
	i: "include",
	O: "remote-name",
	f: "fail",
	"#": "progress-bar",
	N: "no-buffer",
	g: "globoff",
	j: "junk-session-cookies",
	n: "netrc",
	q: "disable",
	Z: "parallel"
}, dt = /* @__PURE__ */ new Set(/* @__PURE__ */ "output.write-out.cookie-jar.silent.show-error.verbose.include.remote-name.fail.fail-with-body.progress-bar.no-buffer.globoff.dump-header.retry.retry-delay.retry-max-time.connect-timeout.stderr.trace.trace-ascii.path-as-is.no-progress-meter.remote-header-name.create-dirs.styled-output.no-keepalive.tcp-nodelay.ipv4.ipv6.raw.tr-encoding.disable".split("."));
function ft(e, t) {
	let n = [], r = [];
	for (let t = 1; t < e.length; t++) {
		let i = e[t];
		if (i === "--") {
			r.push(...e.slice(t + 1));
			break;
		}
		if (i.startsWith("--")) {
			let r = i.slice(2);
			lt.has(r) ? n.push({
				name: r,
				value: e[++t] ?? ""
			}) : n.push({
				name: r,
				value: !0
			});
		} else if (i.startsWith("-") && i.length > 1) for (let r = 1; r < i.length; r++) {
			let a = i[r], o = ut[a] ?? `-${a}`;
			if (ct.has(a)) {
				n.push({
					name: o,
					value: r + 1 < i.length ? i.slice(r + 1) : e[++t] ?? ""
				});
				break;
			}
			/[0-9]/.test(a) ? n.push({
				name: `-${a}`,
				value: !0
			}) : n.push({
				name: o,
				value: !0
			});
		}
		else r.push(i);
	}
	return r.length > 1 && t.add("Più indirizzi in un comando curl: si usa il primo"), {
		opts: n,
		url: r[0] ?? ""
	};
}
function pt(e, t) {
	let n = e.indexOf("="), r = n < 0 ? e : e.slice(0, n), i = n < 0 ? "" : e.slice(n + 1);
	if (t) return {
		key: r,
		value: i,
		type: "text",
		enabled: !0
	};
	let a = i, o = "";
	if (i.startsWith("\"")) {
		let e = i.indexOf("\"", 1);
		a = i.slice(1, e < 0 ? void 0 : e), o = e < 0 ? "" : i.slice(e + 1);
	} else {
		let e = i.indexOf(";");
		e >= 0 && (a = i.slice(0, e), o = i.slice(e));
	}
	let s = /;\s*type=([^;]+)/.exec(o)?.[1]?.trim() ?? "", c = /;\s*filename=("?)([^;"]+)\1/.exec(o)?.[2] ?? "";
	return a.startsWith("@") || a.startsWith("<") ? {
		key: r,
		value: "",
		type: "file",
		file: "",
		fileName: c || p(a.slice(1)),
		contentType: s,
		enabled: !0
	} : {
		key: r,
		value: a,
		type: "text",
		contentType: s,
		enabled: !0
	};
}
function mt(e, t) {
	let n = e.search(/[=@]/);
	if (n < 0) return encodeURIComponent(e);
	if (e[n] === "@") return t.add("--data-urlencode con un file: il contenuto va scritto nel corpo"), e.slice(0, n);
	let r = e.slice(0, n);
	return `${r ? `${r}=` : ""}${encodeURIComponent(e.slice(n + 1))}`;
}
function ht(e, n) {
	let { opts: r, url: i } = ft(e, n), a = "", o = [], l = [], u = null, d = !1, f = [], m = !1, g = !1, y = null, b = { type: "inherit" }, S = null, C = "basic", w = null, T = {}, E = i, D = /* @__PURE__ */ new Set();
	for (let { name: e, value: i } of r) {
		let r = t(i);
		switch (e) {
			case "request":
				a = r.toUpperCase();
				break;
			case "url":
				E = r;
				break;
			case "header": {
				if (r.startsWith("@")) {
					n.add("Header letti da file (-H @file) non importati");
					break;
				}
				let e = r.indexOf(":");
				if (e < 0) {
					r.endsWith(";") && o.push(c(r.slice(0, -1).trim(), ""));
					break;
				}
				let t = r.slice(e + 1).trim();
				if (!t) break;
				o.push(c(r.slice(0, e).trim(), t));
				break;
			}
			case "data":
			case "data-ascii":
			case "data-binary":
				r.startsWith("@") ? u = r.slice(1) : l.push(e === "data-binary" ? r : r.replace(/[\r\n]/g, ""));
				break;
			case "data-raw":
				l.push(r);
				break;
			case "data-urlencode":
				l.push(mt(r, n));
				break;
			case "json":
				d = !0, r.startsWith("@") ? u = r.slice(1) : l.push(r);
				break;
			case "form":
				f.push(pt(r, !1));
				break;
			case "form-string":
				f.push(pt(r, !0));
				break;
			case "user":
				S = r;
				break;
			case "digest":
				C = "digest";
				break;
			case "basic":
				C = "basic";
				break;
			case "ntlm":
			case "negotiate":
			case "anyauth":
				n.add(`Autenticazione --${e} non supportata`);
				break;
			case "aws-sigv4":
				w = r;
				break;
			case "oauth2-bearer":
				b = {
					type: "bearer",
					token: r
				};
				break;
			case "user-agent":
				o.push(c("User-Agent", r));
				break;
			case "referer":
				o.push(c("Referer", r.replace(/;auto$/, "")));
				break;
			case "cookie":
				r.includes("=") ? o.push(c("Cookie", r)) : n.add("Cookie letti da file (-b file) non importati");
				break;
			case "get":
				m = !0;
				break;
			case "head":
				g = !0;
				break;
			case "upload-file":
				y = r;
				break;
			case "insecure":
				T.verify = !1;
				break;
			case "location":
			case "location-trusted":
				T.followRedirects = !0;
				break;
			case "max-redirs":
				T.maxRedirects = Math.max(0, parseInt(r, 10) || 0);
				break;
			case "max-time":
				T.timeoutMs = Math.round((parseFloat(r) || 30) * 1e3);
				break;
			case "compressed":
				T.decode = !0;
				break;
			case "http1.1":
			case "http1.0":
			case "-0":
				T.version = "1.1";
				break;
			case "http2":
			case "http2-prior-knowledge":
				T.version = "2";
				break;
			case "proxy":
			case "socks5":
			case "socks5-hostname":
			case "preproxy":
				n.add("Proxy non supportati: le richieste vanno dirette");
				break;
			case "cacert":
			case "cert":
			case "key":
			case "capath":
				n.add("Certificati (--cacert, --cert, --key): scegli i file nelle impostazioni della richiesta");
				break;
			case "config":
				n.add("-K/--config non letto");
				break;
			default: dt.has(e) || D.add(e.startsWith("-") ? e : `--${e}`);
		}
	}
	if (D.size && n.add(`Opzioni di curl ignorate: ${[...D].slice(0, 8).join(", ")}`), !E) return null;
	if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(E) && !E.startsWith("{{") && (E = `http://${E}`), S !== null) {
		let e = S.indexOf(":"), t = e < 0 ? S : S.slice(0, e), r = e < 0 ? "" : S.slice(e + 1);
		if (e < 0 && n.add("-u senza password: va scritta"), w) {
			let [, , e = "", n = ""] = w.split(":");
			b = {
				type: "aws4",
				accessKey: t,
				secretKey: r,
				region: e,
				service: n
			};
		} else b = {
			type: C,
			user: t,
			password: r
		};
	}
	let O = { kind: "none" }, k = o.find((e) => e.key.toLowerCase() === "content-type")?.value;
	d && (k || o.push(c("Content-Type", "application/json")), o.some((e) => e.key.toLowerCase() === "accept") || o.push(c("Accept", "application/json")));
	let A = d ? l.join("") : l.join("&");
	if (m && l.length) E = `${E}${E.includes("?") ? "&" : "?"}${A}`;
	else if (f.length) O = {
		kind: "multipart",
		fields: f
	};
	else if (u !== null || y !== null) O = {
		kind: "file",
		file: "",
		fileName: p(u ?? y)
	}, u !== null && !k && o.push(c("Content-Type", "application/x-www-form-urlencoded"));
	else if (l.length) {
		let e = d ? "json" : h(k);
		e === "form" || !e && !k && ee(A) ? O = {
			kind: "form",
			fields: v(A)
		} : e && e !== "multipart" ? O = {
			kind: e,
			text: A
		} : (k || o.push(c("Content-Type", "application/x-www-form-urlencoded")), O = {
			kind: "text",
			text: A
		});
	}
	return a ||= g ? "HEAD" : y === null ? m || O.kind === "none" ? "GET" : "POST" : "PUT", s({
		name: x(a, E),
		method: a,
		url: E,
		headers: _(o, O),
		body: O,
		auth: b,
		settings: T
	});
}
function gt(e, { name: t } = {}, n) {
	let r = String(e ?? ""), i = st(r) ? at(r) : it(r), o = a(t || "cURL");
	for (let e of i) {
		let t = e[0] === "$" ? e.slice(1) : e;
		if (!/^curl(\.exe)?$/i.test(p(t[0] ?? ""))) continue;
		let r = ht(t, n);
		r ? o.items.push(r) : n.add("Un comando curl senza indirizzo è stato saltato");
	}
	return {
		collection: o,
		environments: []
	};
}
// src/nettest/formats/import.js
var _t = 32 << 20;
function vt(e) {
	let t = String(e ?? "").replace(/^﻿/, ""), n = t.trimStart();
	if (n.startsWith("{") || n.startsWith("[")) try {
		return {
			data: JSON.parse(t),
			yaml: !1
		};
	} catch {
		return {
			data: null,
			yaml: !1
		};
	}
	if (/^(openapi|swagger)\s*:/m.test(t) || /^type:\s*["']?(collection|spec)\.insomnia\.rest\//m.test(t)) try {
		return {
			data: A(t),
			yaml: !0
		};
	} catch (e) {
		return {
			data: null,
			yaml: !0,
			error: e
		};
	}
	return {
		data: null,
		yaml: !1
	};
}
function yt(e) {
	return n(e) ? e.format === "nettest" && Array.isArray(e.items) ? "nettest" : ae(e) || oe(e) ? "postman" : se(e) ? "postman-env" : Se(e) || Ce(e) || /^spec\.insomnia\.rest\//.test(String(e.type ?? "")) ? "insomnia" : H(e) ? "openapi" : Ne(e) ? "swagger" : Qe(e) ? "har" : null : null;
}
function bt(e) {
	let t = String(e ?? "");
	if (!t.trim()) return null;
	let { data: n } = vt(t);
	return n ? yt(n) : nt(t) ? "curl" : null;
}
function xt(e, { name: t } = {}) {
	let i = String(e ?? "");
	if (i.length > 33554432) throw Error("File troppo grande da importare (al massimo 32 MB)");
	if (!i.trim()) throw Error("Niente da importare: il testo è vuoto");
	let a = S(), o = { name: typeof t == "string" && t.trim() ? t.trim() : void 0 }, s = vt(i), c = s.data, l = c ? yt(c) : nt(i) ? "curl" : null;
	if (!l) throw s.error ? Error(`Non riesco a leggere il file: ${s.error.message}`) : Error("Formato non riconosciuto: si importano Postman, Insomnia, OpenAPI/Swagger, HAR, cURL e .nettest");
	let u;
	switch (l) {
		case "nettest": {
			let e = r(c.environments);
			return {
				format: l,
				collection: {
					...c,
					...o.name && { name: o.name }
				},
				environments: e,
				warnings: []
			};
		}
		case "postman":
			if (oe(c) && !ae(c)) throw Error("Collezione Postman v1: esportala da Postman come v2.1 e importala di nuovo");
			u = be(c, o, a);
			break;
		case "postman-env":
			u = xe(c, o);
			break;
		case "insomnia":
			if (Se(c)) u = je(c, o, a);
			else if (Ce(c)) u = Me(c, o, a);
			else if (n(c.spec?.contents) && (H(c.spec.contents) || Ne(c.spec.contents))) u = Ze(c.spec.contents, { name: o.name ?? c.name }, a);
			else throw Error("Documento di Insomnia senza richieste da importare");
			break;
		case "openapi":
			/^3\./.test(String(c.openapi)) || a.add(`OpenAPI ${c.openapi}: letto come 3.x`), u = Ze(c, o, a);
			break;
		case "swagger":
			u = Ze(c, o, a);
			break;
		case "har":
			u = tt(c, o, a);
			break;
		case "curl":
			if (u = gt(i, o, a), !u.collection.items.length) throw Error("Nessun comando curl con un indirizzo");
			break;
		default: throw Error("Formato non riconosciuto");
	}
	return D(u.collection, u.environments, a, l);
}
// src/nettest/formats/postman-export.js
var St = "https://schema.getpostman.com/json/collection/v2.1.0/collection.json", Ct = {
	json: "json",
	xml: "xml",
	html: "html",
	javascript: "javascript",
	text: "text"
}, G = (e) => Object.entries(e).filter(([, e]) => e != null && e !== "").map(([e, n]) => ({
	key: e,
	value: typeof n == "boolean" ? n : t(n),
	type: typeof n == "boolean" ? "boolean" : "string"
}));
function K(e) {
	if (n(e) && e.type && e.type !== "inherit") switch (e.type) {
		case "none": return { type: "noauth" };
		case "basic": return {
			type: "basic",
			basic: G({
				username: e.user,
				password: e.password
			})
		};
		case "digest": return {
			type: "digest",
			digest: G({
				username: e.user,
				password: e.password
			})
		};
		case "bearer": return {
			type: "bearer",
			bearer: G({ token: e.token })
		};
		case "apikey": return {
			type: "apikey",
			apikey: G({
				key: e.key,
				value: e.value,
				in: e.in === "query" ? "query" : "header"
			})
		};
		case "aws4": return {
			type: "awsv4",
			awsv4: G({
				accessKey: e.accessKey,
				secretKey: e.secretKey,
				region: e.region,
				service: e.service,
				sessionToken: e.sessionToken
			})
		};
		case "oauth2": {
			let n = {
				client_credentials: "client_credentials",
				password: "password_credentials",
				authorization_code: "authorization_code"
			}[e.grant], r = {
				type: "oauth2",
				oauth2: G({
					...!e.grant && { accessToken: e.token },
					...n && {
						grant_type: n,
						accessTokenUrl: e.tokenUrl,
						clientId: e.clientId,
						clientSecret: e.clientSecret,
						scope: e.scope,
						client_authentication: e.send === "body" ? "body" : "header"
					},
					...e.grant === "password" && {
						username: e.username,
						password: e.password
					},
					...e.grant === "authorization_code" && { authUrl: e.authorizeUrl },
					headerPrefix: e.prefix,
					addTokenTo: "header"
				})
			};
			return e.audience && r.oauth2.push({
				key: "tokenRequestParams",
				value: [{
					key: "audience",
					value: t(e.audience),
					enabled: !0,
					send_as: "request_body"
				}],
				type: "any"
			}), r;
		}
		default: return;
	}
}
function wt(e) {
	let n = t(e), r = { raw: n }, i = n.indexOf("#"), a = i < 0 ? n : n.slice(0, i);
	i >= 0 && (r.hash = n.slice(i + 1));
	let o = a.indexOf("?"), s = o < 0 ? a : a.slice(0, o), c = /^([a-z][a-z0-9+.-]*):\/\//i.exec(s);
	c && (r.protocol = c[1], s = s.slice(c[0].length));
	let l = s.indexOf("/"), u = l < 0 ? s : s.slice(0, l), d = /:(\d+|\{\{[^{}]+\}\})$/.exec(u);
	return d && (r.port = d[1], u = u.slice(0, d.index)), r.host = u.startsWith("{{") ? [u] : u.split(".").filter(Boolean), l >= 0 && (r.path = s.slice(l + 1).split("/")), o >= 0 && (r.query = a.slice(o + 1).split("&").filter(Boolean).map((e) => {
		let t = e.indexOf("=");
		return {
			key: t < 0 ? e : e.slice(0, t),
			value: t < 0 ? null : e.slice(t + 1)
		};
	})), r;
}
function Tt(e) {
	if (n(e) && e.kind && e.kind !== "none") {
		if (Ct[e.kind]) return {
			mode: "raw",
			raw: t(e.text),
			options: { raw: { language: Ct[e.kind] } }
		};
		if (e.kind === "form") return {
			mode: "urlencoded",
			urlencoded: r(e.fields).map((e) => ({
				key: t(e.key),
				value: t(e.value),
				type: "text",
				...!i(e) && { disabled: !0 }
			}))
		};
		if (e.kind === "multipart") return {
			mode: "formdata",
			formdata: r(e.fields).map((e) => ({
				key: t(e.key),
				...e.type === "file" ? {
					type: "file",
					src: t(e.file) || t(e.fileName)
				} : {
					type: "text",
					value: t(e.value)
				},
				...e.contentType && { contentType: t(e.contentType) },
				...!i(e) && { disabled: !0 }
			}))
		};
		if (e.kind === "file") return {
			mode: "file",
			file: { src: t(e.file) || t(e.fileName) }
		};
		if (e.kind === "graphql") return {
			mode: "graphql",
			graphql: {
				query: t(e.query),
				variables: t(e.variables)
			}
		};
	}
}
function Et(e) {
	let n = "", r = t(e).trim().replace(/^\$\.?/, "");
	for (let e of r.matchAll(/([^.[\]]+)|\[(-?\d+)\]|\[['"]([^'"]+)['"]\]/g)) if (e[2] !== void 0) n += Number(e[2]) < 0 ? `.at(${e[2]})` : `[${e[2]}]`;
	else {
		let t = e[1] ?? e[3];
		n += /^[A-Za-z_$][\w$]*$/.test(t) ? `.${t}` : `[${JSON.stringify(t)}]`;
	}
	return n;
}
function Dt(e, n) {
	switch (e) {
		case "status": return "pm.response.code";
		case "time": return "pm.response.responseTime";
		case "size": return "pm.response.responseSize";
		case "header": return `pm.response.headers.get(${JSON.stringify(t(n))})`;
		case "body": return "pm.response.text()";
		case "json": return `pm.response.json()${Et(n)}`;
		default: return null;
	}
}
function Ot(e) {
	let n = Dt(e.source, e.path);
	if (!n) return null;
	let r = JSON.stringify(t(e.value)), i = `Number(${r})`, a = {
		eq: `pm.expect(String(${n})).to.equal(${r})`,
		ne: `pm.expect(String(${n})).to.not.equal(${r})`,
		lt: `pm.expect(Number(${n})).to.be.below(${i})`,
		le: `pm.expect(Number(${n})).to.be.at.most(${i})`,
		gt: `pm.expect(Number(${n})).to.be.above(${i})`,
		ge: `pm.expect(Number(${n})).to.be.at.least(${i})`,
		contains: `pm.expect(String(${n})).to.include(${r})`,
		notContains: `pm.expect(String(${n})).to.not.include(${r})`,
		exists: `pm.expect(${n}).to.exist`,
		notExists: `pm.expect(${n}).to.not.exist`,
		matches: `pm.expect(String(${n})).to.match(new RegExp(${r}))`,
		in: `pm.expect(${JSON.stringify(t(e.value).split(",").map((e) => e.trim()))}).to.include(String(${n}))`,
		type: `pm.expect(${n}).to.be.a(${r})`,
		empty: `pm.expect(${n}).to.be.empty`,
		notEmpty: `pm.expect(${n}).to.not.be.empty`
	}[e.op];
	if (!a) return null;
	let o = t(e.label) || `${e.source}${e.path ? ` ${e.path}` : ""} ${e.op}${e.value !== void 0 && e.value !== "" ? ` ${e.value}` : ""}`;
	return `pm.test(${JSON.stringify(o)}, () => { ${a}; });`;
}
function kt(e) {
	let n = Dt(e.source, e.path);
	return !n || !t(e.var) ? null : (e.regex && (n = `(String(${n}).match(new RegExp(${JSON.stringify(t(e.regex))})) || [])[1]`), `${e.scope === "collection" ? "pm.collectionVariables" : e.scope === "globals" ? "pm.globals" : "pm.environment"}.set(${JSON.stringify(t(e.var))}, ${n});`);
}
function At(e) {
	let n = [...r(e.checks).filter(i).map(Ot), ...r(e.extract).filter(i).map(kt)].filter(Boolean), a = t(e.scripts?.test);
	return n.length ? `${a ? `${a}\n\n` : ""}// NetTest: checks and «save to variable»\n${n.join("\n")}` : a;
}
function q(e, n) {
	let r = [];
	return t(e).trim() && r.push({
		listen: "prerequest",
		script: {
			type: "text/javascript",
			exec: t(e).split("\n")
		}
	}), t(n).trim() && r.push({
		listen: "test",
		script: {
			type: "text/javascript",
			exec: t(n).split("\n")
		}
	}), r.length ? r : void 0;
}
function jt(e) {
	let a = n(e.settings) ? e.settings : {}, o = {
		...typeof a.followRedirects == "boolean" && { followRedirects: a.followRedirects },
		...Number.isInteger(a.maxRedirects) && { maxRedirects: a.maxRedirects },
		...a.verify === !1 && { strictSSL: !1 }
	}, s = e.protocol === "graphql" && e.body?.kind !== "graphql" ? Tt({
		...e.body,
		kind: "graphql"
	}) : Tt(e.body), c = wt(e.url);
	r(e.params).some((e) => e.enabled === !1) && (c.query = r(e.params).map((e) => ({
		key: t(e.key),
		value: t(e.value),
		...e.enabled === !1 && { disabled: !0 }
	})));
	let l = {
		method: t(e.method).toUpperCase() || (e.protocol === "graphql" ? "POST" : "GET"),
		header: r(e.headers).filter((e) => t(e.key)).map((e) => ({
			key: t(e.key),
			value: t(e.value),
			type: "text",
			...!i(e) && { disabled: !0 }
		})),
		...s && { body: s },
		url: c,
		...K(e.auth) && { auth: K(e.auth) },
		...e.description && { description: t(e.description) }
	};
	return {
		name: t(e.name) || "Richiesta",
		...q(e.scripts?.pre, At(e)) && { event: q(e.scripts?.pre, At(e)) },
		...Object.keys(o).length && { protocolProfileBehavior: o },
		request: l,
		response: []
	};
}
function Mt(e) {
	let n = [];
	for (let i of r(e)) if (i.type === "folder") {
		let e = K(i.auth);
		n.push({
			name: t(i.name) || "Cartella",
			...i.description && { description: t(i.description) },
			item: Mt(i.items),
			...e && { auth: e },
			...q(i.scripts?.pre, i.scripts?.test) && { event: q(i.scripts?.pre, i.scripts?.test) }
		});
	} else i.type !== "request" || i.protocol && i.protocol !== "http" && i.protocol !== "graphql" || n.push(jt(i));
	return n;
}
function Nt(a) {
	let o = n(a) ? a : {}, s = K(o.auth);
	return {
		info: {
			_postman_id: e(),
			name: t(o.name) || "NetTest",
			...o.description && { description: t(o.description) },
			schema: St
		},
		item: Mt(o.items),
		...s && s.type !== "noauth" && { auth: s },
		...q(o.scripts?.pre, o.scripts?.test) && { event: q(o.scripts?.pre, o.scripts?.test) },
		variable: r(o.variables).filter((e) => t(e.key)).map((e) => ({
			key: t(e.key),
			value: e.secret ? "" : t(e.value),
			type: e.secret ? "secret" : "string",
			...!i(e) && { disabled: !0 }
		}))
	};
}
function Pt(a) {
	let o = n(a) ? a : {};
	return {
		id: e(),
		name: t(o.name) || "Ambiente",
		values: r(o.variables).filter((e) => t(e.key)).map((e) => ({
			key: t(e.key),
			value: e.secret ? "" : t(e.value),
			type: e.secret ? "secret" : "default",
			enabled: i(e)
		})),
		_postman_variable_scope: "environment",
		_postman_exported_using: "lilOS NetTest"
	};
}
// src/nettest/formats/code-util.js
function Ft(e) {
	let n = t(e?.variables).trim(), r = "{}";
	if (n) try {
		r = JSON.stringify(JSON.parse(n));
	} catch {
		r = n;
	}
	let i = t(e?.operationName);
	return `{"query":${JSON.stringify(t(e?.query))},"variables":${r}${i ? `,"operationName":${JSON.stringify(i)}` : ""}}`;
}
function It(e) {
	return t(e).split(/(\{\{[^{}]+\}\})/).map((e, t) => t % 2 ? e : encodeURIComponent(e).replace(/%20/g, "+")).join("");
}
function Lt(e) {
	let n = "";
	for (let r of new TextEncoder().encode(t(e))) n += String.fromCharCode(r);
	return btoa(n);
}
var Rt = (e) => /^content-(type|language|encoding|disposition|md5|range|location)$/i.test(e) || /^(expires|last-modified|allow)$/i.test(e), J = (e) => t(e).split(/[\\/]/).filter(Boolean).pop() || "file", Y = (e) => /^[\w@%+=:,./-]+$/.test(e) ? e : `'${String(e).replace(/'/g, "'\\''")}'`;
function zt(e) {
	return `^"${String(e).replace(/(\\*)"/g, "$1$1\\\"").replace(/(\\+)$/, "$1$1").replace(/[^a-zA-Z0-9\s_\-:=+~'/.,?;()*@`[\]{}]/g, "^$&").replace(/%(?=[a-zA-Z0-9_])/g, "%^").replace(/\r?\n/g, "^\n\n")}^"`;
}
var X = (e) => `'${String(e).replace(/'/g, "''")}'`;
function Bt(e, t) {
	let n = t ? zt : Y, r = [], i = !!e.body;
	e.method === "HEAD" && !i ? r.push("-I") : (e.method !== "GET" || i) && !(e.method === "POST" && i) && r.push(`-X ${e.method}`), r.push(n(e.url)), e.follow && r.push("-L"), e.insecure && r.push("-k"), e.timeoutMs && r.push(`--max-time ${Math.ceil(e.timeoutMs / 1e3)}`);
	for (let t of e.headers) r.push(`-H ${n(t.value === "" ? `${t.key};` : `${t.key}: ${t.value}`)}`);
	e.basic && r.push(`-u ${n(`${e.basic.user}:${e.basic.password}`)}`), e.digest && r.push("--digest", `-u ${n(`${e.digest.user}:${e.digest.password}`)}`), e.aws4 && r.push(`--aws-sigv4 ${n(`aws:amz:${e.aws4.region}:${e.aws4.service}`)}`, `-u ${n(`${e.aws4.accessKey}:${e.aws4.secretKey}`)}`);
	let a = e.body;
	if (a?.type === "text" && r.push(`--data-raw ${n(a.text)}`), a?.type === "form") for (let [e, t] of a.fields) r.push(`--data-urlencode ${n(`${e}=${t}`)}`);
	if (a?.type === "multipart") for (let e of a.fields) {
		let t = e.contentType ? `;type=${e.contentType}` : "";
		e.file === void 0 ? !t && /^[@<]|;/.test(e.value) ? r.push(`--form-string ${n(`${e.key}=${e.value}`)}`) : r.push(`-F ${n(`${e.key}=${e.value}${t}`)}`) : r.push(`-F ${n(`${e.key}=@${e.file}${t}`)}`);
	}
	return a?.type === "file" && r.push(`--data-binary ${n(`@${a.path}`)}`), `${e.notes.map((e) => `${t ? "REM" : "#"} ${e}\n`).join("")}curl ${r.join(t ? " ^\n  " : " \\\n  ")}`;
}
function Vt(e) {
	let t = [], n = [], r = e.body;
	e.follow && t.push("--follow"), e.insecure && t.push("--verify=no"), e.timeoutMs && t.push(`--timeout=${Math.ceil(e.timeoutMs / 1e3)}`), e.basic && t.push(`-a ${Y(`${e.basic.user}:${e.basic.password}`)}`), e.digest && t.push("-A digest", `-a ${Y(`${e.digest.user}:${e.digest.password}`)}`);
	let i = [...e.notes];
	e.aws4 && i.push("AWS Signature v4: install the httpie-aws-auth plugin and add -A aws -a ACCESS_KEY:SECRET_KEY");
	let a = (e) => e.replace(/([\\:=@])/g, "\\$1");
	for (let t of e.headers) (!r || r.type !== "form" && r.type !== "multipart" || t.key.toLowerCase() !== "content-type") && n.push(Y(t.value === "" ? `${t.key};` : `${t.key}:${t.value}`));
	let o = "";
	if (r?.type === "text" && t.push(`--raw ${Y(r.text)}`), r?.type === "form") {
		t.push("--form");
		for (let [e, t] of r.fields) n.push(Y(`${a(e)}=${t}`));
	}
	if (r?.type === "multipart") {
		t.push("--multipart");
		for (let e of r.fields) n.push(Y(e.file === void 0 ? `${a(e.key)}=${e.value}` : `${a(e.key)}@${e.file}${e.contentType ? `;type=${e.contentType}` : ""}`));
	}
	r?.type === "file" ? o = ` < ${Y(r.path)}` : t.unshift("--ignore-stdin");
	let s = [
		...t,
		e.method,
		Y(e.url),
		...n
	];
	return `${i.map((e) => `# ${e}\n`).join("")}http ${s.join(" \\\n  ")}${o}`;
}
var Ht = /* @__PURE__ */ new Set([
	"GET",
	"POST",
	"PUT",
	"DELETE",
	"PATCH",
	"HEAD",
	"OPTIONS",
	"TRACE",
	"MERGE"
]);
function Ut(e) {
	let t = e.notes.map((e) => `# ${e}`), n = e.body, r = [], i = null, a = null;
	for (let t of e.headers) t.key.toLowerCase() === "content-type" ? i = t.value : t.key.toLowerCase() === "user-agent" ? a = t.value : Rt(t.key) || r.push(`    ${X(t.key)} = ${X(t.value)}`);
	e.basic && r.push(`    'Authorization' = 'Basic ' + [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes(${X(`${e.basic.user}:${e.basic.password}`)}))`), e.aws4 && t.push("# AWS Signature v4: sign the request with the AWS Tools for PowerShell (or another library)"), r.length && t.push("$headers = @{", ...r, "}"), e.digest && t.push(`$credential = New-Object System.Management.Automation.PSCredential(${X(e.digest.user)}, (ConvertTo-SecureString ${X(e.digest.password)} -AsPlainText -Force))`);
	let o = [`    Uri = ${X(e.url)}`], s = e.method[0] + e.method.slice(1).toLowerCase();
	return Ht.has(e.method) || t.push("# -CustomMethod needs PowerShell 7 or later"), o.push(Ht.has(e.method) ? `    Method = ${X(s)}` : `    CustomMethod = ${X(e.method)}`), r.length && o.push("    Headers = $headers"), i && n?.type !== "multipart" && o.push(`    ContentType = ${X(i)}`), a !== null && o.push(`    UserAgent = ${X(a)}`), n?.type === "text" && o.push(`    Body = ${X(n.text)}`), n?.type === "form" && o.push(`    Body = @{\n${n.fields.map(([e, t]) => `        ${X(e)} = ${X(t)}`).join("\n")}\n    }`), n?.type === "multipart" && (t.push("# -Form needs PowerShell 7 or later"), o.push(`    Form = @{\n${n.fields.map((e) => `        ${X(e.key)} = ${e.file === void 0 ? X(e.value) : `Get-Item -LiteralPath ${X(e.file)}`}`).join("\n")}\n    }`)), n?.type === "file" && o.push(`    InFile = ${X(n.path)}`), e.digest && o.push("    Credential = $credential"), e.follow || o.push("    MaximumRedirection = 0"), e.timeoutMs && o.push(`    TimeoutSec = ${Math.ceil(e.timeoutMs / 1e3)}`), e.insecure && (t.push("# -SkipCertificateCheck needs PowerShell 7 or later"), o.push("    SkipCertificateCheck = $true")), t.push("$params = @{", ...o, "}", "$response = Invoke-RestMethod @params", "$response | ConvertTo-Json -Depth 10"), t.join("\n");
}
var Z = "----NetTestBoundary7MA4YWxkTrZu0gW";
function Wt(e) {
	let t = /^([a-z][a-z0-9+.-]*:)?\/\/([^/?#]*)([^#]*)/i.exec(e.url), n = /^(\{\{[^{}]+\}\})([^#]*)/.exec(e.url), r = t ? t[2] : n ? n[1] : "", i = (t ? t[3] : n ? n[2] : e.url.split("#")[0]) || "/", a = [`${e.method} ${i.startsWith("/") || i === "*" ? i : `/${i}`} HTTP/1.1`];
	r && !e.headers.some((e) => e.key.toLowerCase() === "host") && a.push(`Host: ${r}`);
	for (let t of e.headers) a.push(`${t.key}: ${t.value}`);
	if (e.basic) {
		let t = `${e.basic.user}:${e.basic.password}`;
		a.push(`Authorization: Basic ${t.includes("{{") ? `<base64 of "${t}">` : Lt(t)}`);
	}
	e.digest && a.push("Authorization: Digest <answer to the server's challenge>"), e.aws4 && a.push("Authorization: AWS4-HMAC-SHA256 <signature>");
	let o = e.body, s = "", c = !0;
	if ((o?.type === "text" || o?.type === "form") && (s = o.text), o?.type === "multipart") {
		a.push(`Content-Type: multipart/form-data; boundary=${Z}`);
		for (let e of o.fields) {
			let t = e.key.replace(/["\r\n]/g, "_");
			e.file === void 0 ? s += `--${Z}\r\nContent-Disposition: form-data; name="${t}"\r\n${e.contentType ? `Content-Type: ${e.contentType}\r\n` : ""}\r\n${e.value}\r\n` : s += `--${Z}\r\nContent-Disposition: form-data; name="${t}"; filename="${e.file.split(/[\\/]/).pop()}"\r\nContent-Type: ${e.contentType || "application/octet-stream"}\r\n\r\n<contents of ${e.file}>\r\n`;
		}
		s += `--${Z}--\r\n`, s = s.replace(/\r\n/g, "\n"), c = !1;
	}
	return o?.type === "file" && (s = `<contents of ${o.path}>`, c = !1), s && c && !s.includes("{{") && !e.headers.some((e) => e.key.toLowerCase() === "content-length") && a.push(`Content-Length: ${new TextEncoder().encode(s).length}`), `${a.join("\n")}\n${s ? `\n${s}` : ""}`;
}
// src/nettest/formats/code-langs.js
var Q = (e) => JSON.stringify(String(e)), Gt = "AWS Signature v4: sign the request with the AWS SDK (or another library)", Kt = "Digest authentication: answer the server's challenge with a library";
function qt(e, t) {
	let n = e.notes.map((e) => `// ${e}`), r = e.body;
	if (e.digest && n.push(`// ${Kt}`), e.aws4 && n.push(`// ${t ? "AWS Signature v4: sign the request with @aws-sdk/signature-v4 (or aws4fetch)" : "AWS Signature v4: sign the request with aws4fetch (or another library)"}`), e.insecure && n.push(t ? "// self-signed certificate: run with NODE_TLS_REJECT_UNAUTHORIZED=0 (only for tests)" : "// the browser always checks the certificate"), t && r?.type === "file" && n.unshift("import { readFile } from 'node:fs/promises';", ""), t && r?.type === "multipart" && r.fields.some((e) => e.file !== void 0) && n.unshift("import { openAsBlob } from 'node:fs';", ""), r?.type === "multipart") {
		n.push("const form = new FormData();");
		for (let e of r.fields) e.file === void 0 ? n.push(e.contentType ? `form.append(${Q(e.key)}, new Blob([${Q(e.value)}], { type: ${Q(e.contentType)} }));` : `form.append(${Q(e.key)}, ${Q(e.value)});`) : t ? n.push(`form.append(${Q(e.key)}, await openAsBlob(${Q(e.file)}${e.contentType ? `, { type: ${Q(e.contentType)} }` : ""}), ${Q(J(e.file))});`) : n.push(`form.append(${Q(e.key)}, fileInput.files[0]); // ${e.file}: a file picked with <input type="file">`);
	}
	!t && r?.type === "file" && n.push(`const file = fileInput.files[0]; // ${r.path}: a file picked with <input type="file">`);
	let i = e.headers.map((e) => `    ${Q(e.key)}: ${Q(e.value)},`);
	e.basic && i.push(`    Authorization: 'Basic ' + ${t ? `Buffer.from(${Q(`${e.basic.user}:${e.basic.password}`)}).toString('base64')` : `btoa(${Q(`${e.basic.user}:${e.basic.password}`)})`},`);
	let a = [`  method: ${Q(e.method)},`];
	return i.length && a.push("  headers: {", ...i, "  },"), r?.type === "text" && a.push(`  body: ${Q(r.text)},`), r?.type === "form" && a.push(`  body: new URLSearchParams([${r.fields.map(([e, t]) => `[${Q(e)}, ${Q(t)}]`).join(", ")}]),`), r?.type === "multipart" && a.push("  body: form,"), r?.type === "file" && a.push(t ? `  body: await readFile(${Q(r.path)}),` : "  body: file,"), e.follow || a.push("  redirect: 'manual',"), e.timeoutMs && a.push(`  signal: AbortSignal.timeout(${e.timeoutMs}),`), n.push(`const response = await fetch(${Q(e.url)}, {`, ...a, "});", "", "console.log(response.status);", "console.log(await response.text());"), n.join("\n");
}
var Jt = (e) => qt(e, !1), Yt = (e) => qt(e, !0);
function Xt(e) {
	let t = ["import requests"], n = e.notes.map((e) => `# ${e}`), r = e.body, i = ["url"];
	return n.push(`url = ${Q(e.url)}`), e.headers.length && (n.push("headers = {", ...e.headers.map((e) => `    ${Q(e.key)}: ${Q(e.value)},`), "}"), i.push("headers=headers")), r?.type === "text" && (n.push(`payload = ${Q(r.text)}`), i.push("data=payload.encode(\"utf-8\")")), r?.type === "form" && (n.push("payload = [", ...r.fields.map(([e, t]) => `    (${Q(e)}, ${Q(t)}),`), "]"), i.push("data=payload")), r?.type === "multipart" && (n.push("files = [", ...r.fields.map((e) => e.file === void 0 ? `    (${Q(e.key)}, (None, ${Q(e.value)}${e.contentType ? `, ${Q(e.contentType)}` : ""})),` : `    (${Q(e.key)}, (${Q(J(e.file))}, open(${Q(e.file)}, "rb")${e.contentType ? `, ${Q(e.contentType)}` : ""})),`), "]"), i.push("files=files")), r?.type === "file" && i.push(`data=open(${Q(r.path)}, "rb")`), e.basic && i.push(`auth=(${Q(e.basic.user)}, ${Q(e.basic.password)})`), e.digest && (t.push("from requests.auth import HTTPDigestAuth"), i.push(`auth=HTTPDigestAuth(${Q(e.digest.user)}, ${Q(e.digest.password)})`)), e.aws4 && (t.push("from requests_aws4auth import AWS4Auth  # pip install requests-aws4auth"), i.push(`auth=AWS4Auth(${[
		e.aws4.accessKey,
		e.aws4.secretKey,
		e.aws4.region,
		e.aws4.service
	].map(Q).join(", ")})`)), e.insecure && i.push("verify=False"), e.follow ? e.method === "HEAD" && i.push("allow_redirects=True") : i.push("allow_redirects=False"), e.timeoutMs && i.push(`timeout=${e.timeoutMs / 1e3}`), n.push(`response = requests.request(${Q(e.method)}, ${i.join(", ")})`, "", "print(response.status_code)", "print(response.text)"), `${t.join("\n")}\n\n${n.join("\n")}`;
}
function Zt(e) {
	let t = /* @__PURE__ */ new Set([
		"fmt",
		"io",
		"net/http"
	]), n = [], r = e.body, i = [
		"	if err != nil {",
		"		panic(err)",
		"	}"
	];
	for (let t of e.notes) n.push(`\t// ${t}`);
	e.digest && n.push(`\t// ${Kt}`), e.aws4 && n.push(`\t// ${Gt} (github.com/aws/aws-sdk-go-v2/aws/signer/v4)`);
	let a = "nil", o = !1;
	(r?.type === "text" || r?.type === "form") && (t.add("strings"), r.type === "form" ? (t.add("net/url"), n.push("	form := url.Values{}", ...r.fields.map(([e, t]) => `\tform.Add(${Q(e)}, ${Q(t)})`), "	payload := strings.NewReader(form.Encode())")) : n.push(`\tpayload := strings.NewReader(${Q(r.text)})`), a = "payload"), r?.type === "multipart" && (t.add("bytes"), t.add("mime/multipart"), n.push("	payload := &bytes.Buffer{}", "	writer := multipart.NewWriter(payload)"), r.fields.forEach((e, r) => {
		e.file === void 0 ? n.push(`\twriter.WriteField(${Q(e.key)}, ${Q(e.value)})`) : (t.add("os"), n.push(`\tfile${r}, err := os.Open(${Q(e.file)})`, ...i, `\tdefer file${r}.Close()`, `\tpart${r}, err := writer.CreateFormFile(${Q(e.key)}, ${Q(J(e.file))})`, ...i, `\tio.Copy(part${r}, file${r})`));
	}), n.push("	writer.Close()"), a = "payload", o = !0), r?.type === "file" && (t.add("os"), n.push(`\tpayload, err := os.Open(${Q(r.path)})`, ...i, "	defer payload.Close()"), a = "payload"), n.push("", `\treq, err := http.NewRequest(${Q(e.method)}, ${Q(e.url)}, ${a})`, ...i);
	for (let t of e.headers) n.push(`\treq.Header.Add(${Q(t.key)}, ${Q(t.value)})`);
	o && n.push("	req.Header.Set(\"Content-Type\", writer.FormDataContentType())"), e.basic && n.push(`\treq.SetBasicAuth(${Q(e.basic.user)}, ${Q(e.basic.password)})`);
	let s = [];
	return e.insecure && (t.add("crypto/tls"), s.push("		Transport: &http.Transport{TLSClientConfig: &tls.Config{InsecureSkipVerify: true}},")), e.follow || s.push("		CheckRedirect: func(req *http.Request, via []*http.Request) error { return http.ErrUseLastResponse },"), e.timeoutMs && (t.add("time"), s.push(`\t\tTimeout: ${e.timeoutMs} * time.Millisecond,`)), n.push("", s.length ? [
		"	client := &http.Client{",
		...s,
		"	}"
	].join("\n") : "	client := &http.Client{}"), n.push("	res, err := client.Do(req)", ...i, "	defer res.Body.Close()", "", "	data, err := io.ReadAll(res.Body)", ...i, "	fmt.Println(res.Status)", "	fmt.Println(string(data))"), `package main\n\nimport (\n${[...t].sort().map((e) => `\t"${e}"`).join("\n")}\n)\n\nfunc main() {\n${n.join("\n")}\n}\n`;
}
var Qt = /^(connection|content-length|expect|host|upgrade)$/i;
function $t(e) {
	let t = /* @__PURE__ */ new Set([
		"java.net.URI",
		"java.net.http.HttpClient",
		"java.net.http.HttpRequest",
		"java.net.http.HttpResponse"
	]), n = [], r = e.body, i = "        ";
	for (let t of e.notes) n.push(`${i}// ${t}`);
	e.digest && n.push(`${i}// ${Kt}`), e.aws4 && n.push(`${i}// ${Gt}`), e.insecure && n.push(`${i}// to skip the certificate check, build the client with an SSLContext that trusts it`);
	let a = "HttpRequest.BodyPublishers.noBody()";
	if ((r?.type === "text" || r?.type === "form") && (a = `HttpRequest.BodyPublishers.ofString(${Q(r.text)})`), r?.type === "file" && (t.add("java.nio.file.Path"), a = `HttpRequest.BodyPublishers.ofFile(Path.of(${Q(r.path)}))`), r?.type === "multipart") {
		t.add("java.io.ByteArrayOutputStream"), t.add("java.nio.charset.StandardCharsets"), n.push(`${i}String boundary = "----NetTestBoundary7MA4YWxkTrZu0gW";`, `${i}ByteArrayOutputStream form = new ByteArrayOutputStream();`);
		for (let e of r.fields) {
			let r = e.key.replace(/["\r\n]/g, "_");
			e.file === void 0 ? n.push(`${i}form.write(("--" + boundary + ${Q(`\r\nContent-Disposition: form-data; name="${r}"\r\n${e.contentType ? `Content-Type: ${e.contentType}\r\n` : ""}\r\n${e.value}\r\n`)}).getBytes(StandardCharsets.UTF_8));`) : (t.add("java.nio.file.Files"), t.add("java.nio.file.Path"), n.push(`${i}form.write(("--" + boundary + ${Q(`\r\nContent-Disposition: form-data; name="${r}"; filename="${J(e.file)}"\r\nContent-Type: ${e.contentType || "application/octet-stream"}\r\n\r\n`)}).getBytes(StandardCharsets.UTF_8));`, `${i}form.write(Files.readAllBytes(Path.of(${Q(e.file)})));`, `${i}form.write("\\r\\n".getBytes(StandardCharsets.UTF_8));`));
		}
		n.push(`${i}form.write(("--" + boundary + "--\\r\\n").getBytes(StandardCharsets.UTF_8));`), a = "HttpRequest.BodyPublishers.ofByteArray(form.toByteArray())";
	}
	let o = [`${i}HttpRequest request = HttpRequest.newBuilder()`, `${i}    .uri(URI.create(${Q(e.url)}))`];
	for (let t of e.headers) Qt.test(t.key) ? o.push(`${i}    // ${t.key}: set by HttpClient itself`) : o.push(`${i}    .header(${Q(t.key)}, ${Q(t.value)})`);
	r?.type === "multipart" && o.push(`${i}    .header("Content-Type", "multipart/form-data; boundary=" + boundary)`), e.basic && (t.add("java.util.Base64"), t.add("java.nio.charset.StandardCharsets"), o.push(`${i}    .header("Authorization", "Basic " + Base64.getEncoder().encodeToString(${Q(`${e.basic.user}:${e.basic.password}`)}.getBytes(StandardCharsets.UTF_8)))`)), e.timeoutMs && (t.add("java.time.Duration"), o.push(`${i}    .timeout(Duration.ofMillis(${e.timeoutMs}))`)), o.push(`${i}    .method(${Q(e.method)}, ${a})`, `${i}    .build();`);
	let s = [
		`${i}HttpClient client = HttpClient.newBuilder()`,
		`${i}    .followRedirects(HttpClient.Redirect.${e.follow ? "NORMAL" : "NEVER"})`,
		`${i}    .build();`
	], c = [
		...n,
		...s,
		...o,
		`${i}HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());`,
		`${i}System.out.println(response.statusCode());`,
		`${i}System.out.println(response.body());`
	];
	return `${[...t].sort().map((e) => `import ${e};`).join("\n")}\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n${c.join("\n")}\n    }\n}\n`;
}
function en(e) {
	let t = /* @__PURE__ */ new Set([
		"System.Net.Http",
		"System.Net.Http.Headers",
		"System.Text"
	]), n = e.notes.map((e) => `// ${e}`), r = e.body;
	e.aws4 && n.push(`// ${Gt}`), (r?.type === "file" || r?.type === "multipart" && r.fields.some((e) => e.file !== void 0)) && t.add("System.IO"), r?.type === "form" && t.add("System.Collections.Generic");
	let i = [];
	e.follow || i.push("    AllowAutoRedirect = false,"), e.insecure && i.push("    ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator,"), e.digest && i.push(`    Credentials = new System.Net.NetworkCredential(${Q(e.digest.user)}, ${Q(e.digest.password)}),`), i.length ? n.push("var handler = new HttpClientHandler", "{", ...i, "};", "using var client = new HttpClient(handler);") : n.push("using var client = new HttpClient();"), e.timeoutMs && n.push(`client.Timeout = TimeSpan.FromMilliseconds(${e.timeoutMs});`), n.push(`var request = new HttpRequestMessage(new HttpMethod(${Q(e.method)}), ${Q(e.url)});`);
	for (let t of e.headers) Rt(t.key) || n.push(`request.Headers.TryAddWithoutValidation(${Q(t.key)}, ${Q(t.value)});`);
	if (e.basic && n.push(`request.Headers.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.UTF8.GetBytes(${Q(`${e.basic.user}:${e.basic.password}`)})));`), r?.type === "text" && n.push(`request.Content = new StringContent(${Q(r.text)}, Encoding.UTF8);`), r?.type === "form" && n.push("request.Content = new FormUrlEncodedContent(new[]", "{", ...r.fields.map(([e, t]) => `    new KeyValuePair<string, string>(${Q(e)}, ${Q(t)}),`), "});"), r?.type === "file" && n.push(`request.Content = new StreamContent(File.OpenRead(${Q(r.path)}));`), r?.type === "multipart" && (n.push("var form = new MultipartFormDataContent();"), r.fields.forEach((e, t) => {
		e.file === void 0 ? n.push(e.contentType ? `form.Add(new StringContent(${Q(e.value)}, Encoding.UTF8, ${Q(e.contentType)}), ${Q(e.key)});` : `form.Add(new StringContent(${Q(e.value)}), ${Q(e.key)});`) : (n.push(`var file${t} = new StreamContent(File.OpenRead(${Q(e.file)}));`), e.contentType && n.push(`file${t}.Headers.ContentType = MediaTypeHeaderValue.Parse(${Q(e.contentType)});`), n.push(`form.Add(file${t}, ${Q(e.key)}, ${Q(J(e.file))});`));
	}), n.push("request.Content = form;")), r && r.type !== "multipart") for (let t of e.headers.filter((e) => Rt(e.key))) n.push(`request.Content.Headers.Remove(${Q(t.key)});`, `request.Content.Headers.TryAddWithoutValidation(${Q(t.key)}, ${Q(t.value)});`);
	return n.push("", "var response = await client.SendAsync(request);", "Console.WriteLine((int)response.StatusCode);", "Console.WriteLine(await response.Content.ReadAsStringAsync());"), `${[...t].map((e) => `using ${e};`).join("\n")}\n\n${n.join("\n")}\n`;
}
var $ = (e) => `'${String(e).replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
function tn(e) {
	let t = e.body, n = [`    CURLOPT_URL => ${$(e.url)},`, "    CURLOPT_RETURNTRANSFER => true,"];
	return e.method === "HEAD" ? n.push("    CURLOPT_NOBODY => true,") : n.push(`    CURLOPT_CUSTOMREQUEST => ${$(e.method)},`), n.push(`    CURLOPT_FOLLOWLOCATION => ${e.follow ? "true" : "false"},`), e.timeoutMs && n.push(`    CURLOPT_TIMEOUT_MS => ${e.timeoutMs},`), e.insecure && n.push("    CURLOPT_SSL_VERIFYPEER => false,", "    CURLOPT_SSL_VERIFYHOST => 0,"), e.basic && n.push("    CURLOPT_HTTPAUTH => CURLAUTH_BASIC,", `    CURLOPT_USERPWD => ${$(`${e.basic.user}:${e.basic.password}`)},`), e.digest && n.push("    CURLOPT_HTTPAUTH => CURLAUTH_DIGEST,", `    CURLOPT_USERPWD => ${$(`${e.digest.user}:${e.digest.password}`)},`), e.aws4 && n.push(`    CURLOPT_AWS_SIGV4 => ${$(`aws:amz:${e.aws4.region}:${e.aws4.service}`)}, // PHP 8.2+`, `    CURLOPT_USERPWD => ${$(`${e.aws4.accessKey}:${e.aws4.secretKey}`)},`), e.headers.length && n.push("    CURLOPT_HTTPHEADER => [", ...e.headers.map((e) => `        ${$(e.value === "" ? `${e.key};` : `${e.key}: ${e.value}`)},`), "    ],"), (t?.type === "text" || t?.type === "form") && n.push(`    CURLOPT_POSTFIELDS => ${$(t.text)},`), t?.type === "file" && n.push(`    CURLOPT_POSTFIELDS => file_get_contents(${$(t.path)}),`), t?.type === "multipart" && n.push("    CURLOPT_POSTFIELDS => [", ...t.fields.map((e) => e.file === void 0 ? `        ${$(e.key)} => ${$(e.value)},` : `        ${$(e.key)} => new CURLFile(${$(e.file)}, ${$(e.contentType || "application/octet-stream")}, ${$(J(e.file))}),`), "    ],"), `<?php\n\n${e.notes.map((e) => `// ${e}\n`).join("")}$curl = curl_init();\ncurl_setopt_array($curl, [\n${n.join("\n")}\n]);\n$response = curl_exec($curl);\n$status = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);\ncurl_close($curl);\n\necho $status . "\\n" . $response;\n`;
}
// src/nettest/formats/code.js
var nn = [
	{
		id: "curl",
		label: "cURL",
		syntax: "shell"
	},
	{
		id: "curl-windows",
		label: "cURL (cmd di Windows)",
		syntax: "bat"
	},
	{
		id: "httpie",
		label: "HTTPie",
		syntax: "shell"
	},
	{
		id: "powershell",
		label: "PowerShell (Invoke-RestMethod)",
		syntax: "powershell"
	},
	{
		id: "fetch",
		label: "JavaScript (fetch)",
		syntax: "javascript"
	},
	{
		id: "node",
		label: "Node.js (fetch)",
		syntax: "javascript"
	},
	{
		id: "python",
		label: "Python (requests)",
		syntax: "python"
	},
	{
		id: "go",
		label: "Go (net/http)",
		syntax: "go"
	},
	{
		id: "java",
		label: "Java (java.net.http)",
		syntax: "java"
	},
	{
		id: "csharp",
		label: "C# (HttpClient)",
		syntax: "csharp"
	},
	{
		id: "php",
		label: "PHP (cURL)",
		syntax: "php"
	},
	{
		id: "raw",
		label: "HTTP grezzo",
		syntax: "http"
	}
], rn = {
	curl: (e) => Bt(e, !1),
	"curl-windows": (e) => Bt(e, !0),
	httpie: Vt,
	powershell: Ut,
	raw: Wt,
	fetch: Jt,
	node: Yt,
	python: Xt,
	go: Zt,
	java: $t,
	csharp: en,
	php: tn
};
function an(e, a = {}) {
	let o = n(e) ? e : {}, s = n(o.body) ? o.body : { kind: "none" }, c = o.protocol === "graphql" || s.kind === "graphql", l = n(o.settings) ? o.settings : {}, u = {
		method: (t(o.method) || (c ? "POST" : "GET")).toUpperCase(),
		url: t(o.url).trim(),
		headers: r(o.headers).filter((e) => i(e) && t(e.key).trim()).map((e) => ({
			key: t(e.key).trim(),
			value: t(e.value)
		})),
		body: null,
		basic: null,
		digest: null,
		aws4: null,
		notes: [],
		insecure: l.verify === !1,
		follow: l.followRedirects !== !1,
		timeoutMs: Number(l.timeoutMs) > 0 ? Number(l.timeoutMs) : 0
	}, d = (e) => u.headers.some((t) => t.key.toLowerCase() === e.toLowerCase()), f = (e) => {
		u.headers = u.headers.filter((t) => t.key.toLowerCase() !== e.toLowerCase());
	}, p = (e, t) => {
		f(e), u.headers.push({
			key: e,
			value: t
		});
	}, m = n(a.auth) ? a.auth : n(o.auth) ? o.auth : { type: "none" }, h = t(m.prefix) || "Bearer";
	switch (m.type) {
		case "basic":
			u.basic = {
				user: t(m.user),
				password: t(m.password)
			};
			break;
		case "digest":
			u.digest = {
				user: t(m.user),
				password: t(m.password)
			};
			break;
		case "bearer":
			p("Authorization", `${h} ${t(m.token)}`);
			break;
		case "apikey":
			if (!t(m.key).trim()) break;
			m.in === "query" ? u.url = b(u.url, [[t(m.key).trim(), t(m.value)]]) : p(t(m.key).trim(), t(m.value));
			break;
		case "aws4":
			u.aws4 = {
				accessKey: t(m.accessKey),
				secretKey: t(m.secretKey),
				region: t(m.region) || "us-east-1",
				service: t(m.service) || "execute-api"
			}, t(m.sessionToken) && p("X-Amz-Security-Token", t(m.sessionToken));
			break;
		case "oauth2": m.grant ? (u.notes.push(`OAuth 2.0 (${m.grant}): get an access token${t(m.tokenUrl) ? ` from ${t(m.tokenUrl)}` : ""} and put it in place of <token>`), p("Authorization", `${h} <token>`)) : t(m.token) ? p("Authorization", `${h} ${t(m.token)}`) : (u.notes.push("OAuth 2.0: put the access token in place of <token>"), p("Authorization", `${h} <token>`));
	}
	let _ = c ? "graphql" : t(s.kind);
	if (_ === "graphql") u.body = {
		type: "text",
		text: Ft(s)
	}, d("content-type") || u.headers.push({
		key: "Content-Type",
		value: g.graphql
	});
	else if ([
		"text",
		"json",
		"xml",
		"html",
		"javascript"
	].includes(_)) u.body = {
		type: "text",
		text: t(s.text)
	}, d("content-type") || u.headers.push({
		key: "Content-Type",
		value: g[_]
	});
	else if (_ === "form") {
		let e = r(s.fields).filter(i).map((e) => [t(e.key), t(e.value)]);
		u.body = {
			type: "form",
			fields: e,
			text: e.map(([e, t]) => `${It(e)}=${It(t)}`).join("&")
		}, d("content-type") || u.headers.push({
			key: "Content-Type",
			value: g.form
		});
	} else _ === "multipart" ? (u.headers = u.headers.filter((e) => !(e.key.toLowerCase() === "content-type" && /^multipart\//i.test(e.value))), u.body = {
		type: "multipart",
		fields: r(s.fields).filter(i).map((e) => e.type === "file" ? {
			key: t(e.key),
			file: t(e.file) || t(e.fileName) || "file",
			contentType: t(e.contentType)
		} : {
			key: t(e.key),
			value: t(e.value),
			contentType: t(e.contentType)
		})
	}) : _ === "file" && (u.body = {
		type: "file",
		path: t(s.file) || t(s.fileName) || "file"
	});
	/^[A-Z][A-Z0-9_-]{0,23}$/.test(u.method) || (u.notes.push(`Method «${u.method.slice(0, 40)}» is not valid: GET instead`), u.method = "GET");
	let v = (e) => typeof e == "string" ? e.replace(/[\r\n\u2028\u2029]+/g, " ") : e;
	if (u.notes = u.notes.map(v), u.body?.path && (u.body.path = v(u.body.path)), Array.isArray(u.body?.fields)) for (let e of u.body.fields) e.file !== void 0 && (e.file = v(e.file));
	return u;
}
function on(e, t, n = {}) {
	let r = rn[e];
	if (!r) throw Error(`Linguaggio non supportato: ${e}`);
	return r(an(t, n));
}
function sn(e, t = {}) {
	return on(t.windows ? "curl-windows" : "curl", e, t);
}
export { nn as LANGUAGES, _t as MAX_IMPORT, bt as detectFormat, xt as importText, e as newId, A as parseYaml, on as toCode, sn as toCurl, Nt as toPostman, Pt as toPostmanEnvironment };
