import { TAG_COLORS as e, Window as t, fs as n, h as r, session as i, storage as a, tags as o } from "/host/sdk.js";
import { callEntrypoint as s, installedApps as c, launch as l, openFile as u } from "/host/system.js";
// src/terminal/shell/signals.js
var d = class {
	constructor(e = 1) {
		this.levels = e;
	}
}, f = class {
	constructor(e = 1) {
		this.levels = e;
	}
}, p = class {
	constructor(e) {
		this.code = e;
	}
}, m = class {
	constructor(e) {
		this.code = e;
	}
}, h = class {
	code = 130;
}, g = class {
	code = 141;
}, _ = class extends Error {}, v = class extends Error {}, y = class extends Error {
	constructor(e, t = 1) {
		super(e), this.code = t;
	}
}, b = class {
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
		if (this.aborted) throw new h();
	}
}, x = [
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
], S = /* @__PURE__ */ new Set([
	"|",
	"&",
	";",
	"<",
	">",
	"(",
	")"
]), ee = [
	"then",
	"else",
	"elif",
	"fi",
	"do",
	"done",
	"esac",
	"}"
], te = /* @__PURE__ */ new Set([
	")",
	";;",
	";&",
	";;&"
]), ne = /* @__PURE__ */ new Set([
	"export",
	"local",
	"declare",
	"typeset",
	"readonly"
]), re = [
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
], ie = /^([A-Za-z_]\w*)(?:\[([^\]]*)\])?(\+?)=/, ae = /(\d+)?(&>>|<<<|<<-|<<|>>|<&|>&|<>|>\||&>|<|>)/y, oe = 100, C = (e) => e === " " || e === "	" || e === "\r", w = (e) => e === void 0 || C(e) || e === "\n" || S.has(e), se = (e) => C(e) || e === "\n" || S.has(e);
function ce(e, { aliases: t = null } = {}) {
	return new ue(e, t).program();
}
function* le(e, { aliases: t = null } = {}) {
	yield* new ue(e, t).lines();
}
function T(e) {
	return { parts: new ue(String(e), null).readParts({ stop: () => !1 }) };
}
var ue = class e {
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
		throw this.eof ? new _(e) : new v(e);
	}
	near() {
		return this.eof ? "fine del testo" : this.ch === "\n" ? "a capo" : `«${this.peekOp() ?? this.src.slice(this.pos).match(/^\S{1,20}/)?.[0] ?? this.ch}»`;
	}
	skipBlanks() {
		for (;;) {
			let e = this.ch;
			if (C(e)) this.pos++;
			else if (e === "\\" && this.src[this.pos + 1] === "\n") this.pos += 2;
			else if (e === "\\" && this.pos === this.src.length - 1) throw new _();
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
		return x.find((e) => this.starts(e)) ?? null;
	}
	atKeyword(e) {
		if (!this.starts(e)) return !1;
		let t = this.src[this.pos + e.length];
		return e === "{" || e === "!" || e === "[[" ? t === void 0 || C(t) || t === "\n" : w(t);
	}
	keyword(e) {
		this.linebreak(), this.atKeyword(e) || this.fail(`errore di sintassi vicino a ${this.near()}: atteso «${e}»`), this.pos += e.length;
	}
	atTerminator() {
		if (this.eof) return !0;
		let e = this.peekOp();
		return e && te.has(e) ? !0 : ee.some((e) => this.atKeyword(e));
	}
	program() {
		let e = this.list();
		if (this.linebreak(), !this.eof) throw new v(`errore di sintassi vicino a ${this.near()}`);
		if (this.heredocs.length) throw new _();
		return e;
	}
	*lines() {
		for (;;) {
			if (this.linebreak(), this.eof) {
				if (this.heredocs.length) throw new _();
				return;
			}
			let e = [];
			for (;;) {
				if (this.atTerminator()) throw new v(`errore di sintassi vicino a ${this.near()}`);
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
					throw new v(`errore di sintassi vicino a ${this.near()}`);
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
				}), this.linebreak(), !this.atTerminator()) throw new v(`errore di sintassi vicino a ${this.near()}`);
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
			if (this.pos += 2, this.linebreak(), this.eof) throw new _();
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
			if (this.pos += e.length, n.push(e === "|&"), this.linebreak(), this.eof) throw new _();
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
		if (this.skipBlanks(), this.eof) throw new _();
		let e = this.pos, t;
		if (this.starts("((") && (t = this.arithCommand())) return this.redirects(t);
		let n = this.peekOp();
		if (n === "(") {
			this.pos++;
			let e = this.list();
			return this.linebreak(), this.ch !== ")" && this.fail(`errore di sintassi vicino a ${this.near()}: atteso «)»`), this.pos++, this.redirects({
				type: "subshell",
				body: e
			});
		}
		if (n && !n.startsWith("<") && !n.startsWith(">") && n !== "&>" && n !== "&>>") throw new v(`errore di sintassi vicino a «${n}»`);
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
			return n || this.fail("nome di funzione non valido"), this.pos += n.length, this.skipBlanks(), this.starts("(") && (this.pos++, this.skipBlanks(), this.ch !== ")" && this.fail("atteso «)» dopo il nome della funzione"), this.pos++), this.funcBody(n, e);
		}
		let r = /([A-Za-z_][\w.:-]*)[ \t]*\([ \t]*\)/y;
		r.lastIndex = this.pos;
		let i = r.exec(this.src);
		if (i) return this.pos += i[0].length, this.funcBody(i[1], e);
		if (ee.some((e) => this.atKeyword(e))) throw new v(`errore di sintassi vicino a ${this.near()}`);
		return this.simple();
	}
	funcBody(e, t) {
		if (this.linebreak(), this.eof) throw new _();
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
			let i = this.src.slice(n, this.pos), a = ie.exec(i);
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
			} else a && t && (r.noSplit = !0), e.words.push(r), e.words.length === 1 && (t = r.parts.length === 1 && r.parts[0].type === "lit" && ne.has(r.parts[0].value));
		}
		if (this.aliasActive.clear(), !e.words.length && !e.assigns.length && !e.redirs.length) throw new v(`errore di sintassi vicino a ${this.near()}`);
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
			if (this.linebreak(), this.eof) throw new _();
			if (this.ch === ")") {
				this.pos++;
				break;
			}
			let e = this.word();
			if (!e) throw new v(`errore di sintassi vicino a ${this.near()}`);
			n.array.push(e);
		}
		else n.value = this.word() ?? { parts: [] };
		return n;
	}
	expandAlias() {
		let e = /[^\s|&;<>()'"\\$`]+/y;
		e.lastIndex = this.pos;
		let t = e.exec(this.src)?.[0];
		if (!t || !w(this.src[this.pos + t.length])) return !1;
		let n = this.aliases.get(t);
		if (n == null || this.aliasActive.has(t)) return !1;
		if (++this.aliasCount > oe) throw new v("alias espansi troppe volte");
		return this.aliasActive.add(t), this.src = this.src.slice(0, this.pos) + n + this.src.slice(this.pos + t.length), !0;
	}
	redirect(e) {
		ae.lastIndex = this.pos;
		let t = ae.exec(this.src);
		if (!t) return !1;
		this.pos += t[0].length;
		let n = t[2], r = t[1] == null ? null : Number(t[1]);
		this.skipBlanks();
		let i = this.pos, a = this.word();
		a || this.fail(`errore di sintassi vicino a ${this.near()}: manca la destinazione di «${n}»`);
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
			if (this.eof) throw new _();
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
				init: T(e),
				cond: T(t),
				step: T(n),
				body: r
			};
		}
		let e = /[A-Za-z_]\w*/y;
		e.lastIndex = this.pos;
		let t = e.exec(this.src)?.[0];
		t && w(this.src[this.pos + t.length]) || this.fail("for: nome di variabile non valido"), this.pos += t.length;
		let n = null;
		if (this.linebreak(), this.atKeyword("in")) for (this.pos += 2, n = [];;) {
			if (this.skipBlanks(), this.eof) throw new _();
			if (this.ch === ";" || this.ch === "\n") break;
			let e = this.word();
			if (!e) throw new v(`errore di sintassi vicino a ${this.near()}`);
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
		throw new _();
	}
	caseClause() {
		this.pos += 4, this.skipBlanks();
		let e = this.word();
		e || this.fail("case: manca la parola"), this.keyword("in");
		let t = [];
		for (;;) {
			if (this.linebreak(), this.eof) throw new _();
			if (this.atKeyword("esac")) {
				this.pos += 4;
				break;
			}
			this.ch === "(" && this.pos++;
			let e = [];
			for (;;) {
				this.skipBlanks();
				let t = this.word();
				if (t || this.fail(`errore di sintassi vicino a ${this.near()}`), e.push(t), this.skipBlanks(), this.ch !== "|") break;
				this.pos++;
			}
			this.ch !== ")" && this.fail(`errore di sintassi vicino a ${this.near()}: atteso «)»`), this.pos++;
			let n = this.list();
			this.skipBlanks();
			let r = this.peekOp(), i = ";;";
			r === ";;" || r === ";&" || r === ";;&" ? (this.pos += r.length, i = r) : (this.linebreak(), this.atKeyword("esac") || this.fail(`errore di sintassi vicino a ${this.near()}: atteso «;;»`)), t.push({
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
				word: T(this.rawUntilDoubleParen())
			};
		} catch (t) {
			if (!(t instanceof _) || (this.pos = e, !this.src.includes(")", e))) throw t;
			return null;
		}
	}
	condCommand() {
		this.pos += 2;
		let e = this.condOr();
		return this.linebreak(), this.starts("]]") || this.fail(`errore di sintassi in [[ vicino a ${this.near()}`), this.pos += 2, {
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
		if (this.linebreak(), this.eof) throw new _();
		if (this.ch === "(") {
			this.pos++;
			let e = this.condOr();
			return this.linebreak(), this.ch !== ")" && this.fail(`errore di sintassi in [[ vicino a ${this.near()}`), this.pos++, e;
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
		let r = re.find((e) => this.starts(e) && (e[0] !== "-" || w(this.src[this.pos + e.length])));
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
		this.starts("]]") && this.fail("errore di sintassi in [[: manca un operando");
		let e = this.word();
		return e || this.fail(`errore di sintassi in [[ vicino a ${this.near()}`), e;
	}
	regexWord() {
		let e = 0, t = this.readParts({ stop: (t) => {
			if (t === "(") e++;
			else if (t === ")") {
				if (e === 0) return !0;
				e--;
			}
			return e === 0 && (C(t) || t === "\n" || t === ";" || t === "&");
		} });
		return t.length || this.fail("errore di sintassi in [[: manca l’espressione regolare"), { parts: t };
	}
	word() {
		let e = this.readParts({ stop: se });
		return e.length ? { parts: e } : null;
	}
	readParts({ stop: e = se, dq: t = !1, heredoc: n = !1 } = {}) {
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
					throw new _();
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
				if (e < 0) throw new _();
				a(), r.push({
					type: "sq",
					value: this.src.slice(this.pos + 1, e)
				}), this.pos = e + 1;
			} else if (o && s === "\"") {
				a(), this.pos++;
				let e = this.readParts({ dq: !0 });
				if (this.ch !== "\"") throw new _();
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
			if (this.eof) throw new _();
			this.pos = e;
		}
		if (e === "(") {
			this.pos += 2;
			let e = this.list();
			if (this.linebreak(), this.eof) throw new _();
			if (this.ch !== ")") throw new v(`errore di sintassi vicino a ${this.near()}: atteso «)»`);
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
		if (n || this.fail("sostituzione errata"), e.name = n, this.pos += n.length, this.ch === "[") {
			let t = this.src.indexOf("]", this.pos);
			if (t < 0) throw new _();
			e.index = this.src.slice(this.pos + 1, t), this.pos = t + 1;
		}
		let r = this.ch;
		if (r === "}" || e.length) return this.ch !== "}" && this.fail("sostituzione errata"), this.pos++, e;
		if (r === ":") {
			let t = this.src[this.pos + 1];
			"-=?+".includes(t) && t ? (e.op = ":" + t, this.pos += 2, e.arg = this.braceWord("}")) : (e.op = "substr", this.pos++, e.offset = this.braceWord(":}"), this.ch === ":" && (this.pos++, e.count = this.braceWord("}")));
		} else "-=?+".includes(r) ? (e.op = r, this.pos++, e.arg = this.braceWord("}")) : r === "#" || r === "%" || r === "^" || r === "," ? (e.op = this.src[this.pos + 1] === r ? r + r : r, this.pos += e.op.length, e.arg = this.braceWord("}")) : r === "/" ? (this.pos++, e.op = "/", "/#%".includes(this.ch) && (e.op += this.ch, this.pos++), e.arg = this.braceWord("/}"), this.ch === "/" ? (this.pos++, e.replace = this.braceWord("}")) : e.replace = { parts: [] }) : this.fail("sostituzione errata");
		return this.ch !== "}" && this.fail("sostituzione errata: manca «}»"), this.pos++, e;
	}
	braceWord(e) {
		let t = 0, n = this.readParts({ stop: (n) => {
			if (n === "{") t++;
			else if (n === "}" && t > 0) return t--, !1;
			return t === 0 && e.includes(n);
		} });
		if (this.eof) throw new _();
		return { parts: n };
	}
	backtick(t) {
		let n = "";
		for (this.pos++;;) {
			if (this.eof) throw new _();
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
			throw e instanceof _ ? new v("errore di sintassi tra gli apici inversi") : e;
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
			if (this.eof) throw new _();
			let n = this.ch;
			if (n === "'") return this.pos++, e;
			if (n !== "\\") {
				e += n, this.pos++;
				continue;
			}
			let r = this.src[this.pos + 1];
			if (r === void 0) throw new _();
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
}, de = /* @__PURE__ */ "**=.<<=.>>=.**.<<.>>.<=.>=.==.!=.&&.||.++.--.+=.-=.*=./=.%=.&=.^=.|=.+.-.*./.%.<.>.=.!.~.&.^.|.?.:.(.).,".split("."), fe = /* @__PURE__ */ new Set([
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
]), pe = [
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
], E = (e) => BigInt.asIntN(64, e), me = 32;
function he(e, t, n = 0) {
	if (n > me) throw new y("espressione: troppi livelli di ricorsione");
	let r = ge(String(e));
	if (!r.length) return 0n;
	let i = {
		tokens: r,
		i: 0,
		text: e
	}, a = ve(i);
	if (i.i < r.length) throw D(i);
	return Ee(a, t, n);
}
var D = (e) => new y(`${String(e.text).trim()}: errore di sintassi nell’espressione (simbolo errato «${e.tokens[e.i]?.v ?? "fine"}»)`);
function ge(e) {
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
				if (i >= e.length) throw new y(`${e.trim()}: manca «]»`);
				r = e.slice(n + 1, i), n = i + 1;
			}
			t.push({
				t: "var",
				v: i[0],
				index: r
			});
			continue;
		}
		let o = de.find((t) => e.startsWith(t, n));
		if (!o) throw new y(`${e.trim()}: errore di sintassi nell’espressione (simbolo errato «${r}»)`);
		t.push({
			t: "op",
			v: o
		}), n += o.length;
	}
	return t;
}
var _e = (e) => e.tokens[e.i], O = (e, ...t) => _e(e)?.t === "op" && t.includes(_e(e).v), k = (e) => e.tokens[e.i++];
function ve(e) {
	let t = A(e);
	for (; O(e, ",");) k(e), t = {
		k: "comma",
		a: t,
		b: A(e)
	};
	return t;
}
function A(e) {
	let t = e.i, n = _e(e);
	return n?.t === "var" && e.tokens[e.i + 1]?.t === "op" && fe.has(e.tokens[e.i + 1].v) ? (e.i += 2, {
		k: "assign",
		name: n.v,
		index: n.index,
		op: e.tokens[t + 1].v,
		value: A(e)
	}) : ye(e);
}
function ye(e) {
	let t = be(e, 0);
	if (!O(e, "?")) return t;
	k(e);
	let n = A(e);
	if (!O(e, ":")) throw D(e);
	return k(e), {
		k: "ternary",
		cond: t,
		yes: n,
		no: A(e)
	};
}
function be(e, t) {
	if (t >= pe.length) return xe(e);
	let n = be(e, t + 1);
	for (; O(e, ...pe[t]);) n = {
		k: "bin",
		op: k(e).v,
		a: n,
		b: be(e, t + 1)
	};
	return n;
}
function xe(e) {
	let t = Se(e);
	return O(e, "**") ? (k(e), {
		k: "bin",
		op: "**",
		a: t,
		b: xe(e)
	}) : t;
}
function Se(e) {
	if (O(e, "!", "~", "+", "-")) return {
		k: "unary",
		op: k(e).v,
		a: Se(e)
	};
	if (O(e, "++", "--")) {
		let t = k(e).v, n = k(e);
		if (n?.t !== "var") throw D(e);
		return {
			k: "pre",
			op: t,
			name: n.v,
			index: n.index
		};
	}
	return Ce(e);
}
function Ce(e) {
	let t = k(e);
	if (!t) throw new y(`${String(e.text).trim()}: errore di sintassi nell’espressione (operando atteso)`);
	if (t.t === "num") return {
		k: "num",
		v: t.v
	};
	if (t.t === "var") return O(e, "++", "--") ? {
		k: "post",
		op: k(e).v,
		name: t.v,
		index: t.index
	} : {
		k: "var",
		name: t.v,
		index: t.index
	};
	if (t.v === "(") {
		let t = ve(e);
		if (!O(e, ")")) throw D(e);
		return k(e), t;
	}
	throw e.i--, D(e);
}
function we(e) {
	let t = String(e);
	if (/^0[xX]/.test(t)) return BigInt(t);
	let n = /^(\d+)#(.+)$/.exec(t);
	if (n) {
		let e = Number(n[1]);
		if (e < 2 || e > 64) throw new y(`${t}: base non valida`);
		let r = 0n;
		for (let i of n[2]) {
			let n = /\d/.test(i) ? +i : /[a-z]/.test(i) ? i.charCodeAt(0) - 87 : /[A-Z]/.test(i) ? e <= 36 ? i.charCodeAt(0) - 55 : i.charCodeAt(0) - 29 : i === "@" ? 62 : 63;
			if (n >= e) throw new y(`${t}: valore troppo grande per la base`);
			r = r * BigInt(e) + BigInt(n);
		}
		return E(r);
	}
	if (/^0[0-7]+$/.test(t)) return E(BigInt("0o" + t.slice(1)));
	if (/^0\d+$/.test(t)) throw new y(`${t}: valore troppo grande per la base`);
	return E(BigInt(t));
}
function Te(e, t, n, r) {
	let i = String(e.get(t, n == null ? null : String(he(n, e, r + 1))) ?? "").trim();
	return i ? /^-?\d+$/.test(i) ? E(BigInt(i)) : he(i, e, r + 1) : 0n;
}
function Ee(e, t, n) {
	let r = (e) => Ee(e, t, n), i = (e) => e.index == null ? null : String(he(e.index, t, n + 1));
	switch (e.k) {
		case "num": return we(e.v);
		case "var": return Te(t, e.name, e.index, n);
		case "comma": return r(e.a), r(e.b);
		case "ternary": return r(e.cond) === 0n ? r(e.no) : r(e.yes);
		case "unary": {
			let t = r(e.a);
			return e.op === "!" ? t === 0n ? 1n : 0n : e.op === "~" ? E(~t) : e.op === "-" ? E(-t) : t;
		}
		case "pre":
		case "post": {
			let r = i(e), a = Te(t, e.name, r ?? null, n), o = E(e.op === "++" ? a + 1n : a - 1n);
			return t.set(e.name, r, String(o)), e.k === "pre" ? o : a;
		}
		case "assign": {
			let a = i(e), o = r(e.value);
			return e.op !== "=" && (o = De(e.op.slice(0, -1), Te(t, e.name, a, n), o)), t.set(e.name, a, String(o)), o;
		}
		case "bin": return e.op === "&&" ? r(e.a) !== 0n && r(e.b) !== 0n ? 1n : 0n : e.op === "||" ? r(e.a) !== 0n || r(e.b) !== 0n ? 1n : 0n : De(e.op, r(e.a), r(e.b));
	}
	throw new y("espressione non valida");
}
function De(e, t, n) {
	switch (e) {
		case "+": return E(t + n);
		case "-": return E(t - n);
		case "*": return E(t * n);
		case "/":
		case "%":
			if (n === 0n) throw new y("divisione per zero");
			return E(e === "/" ? t / n : t % n);
		case "**":
			if (n < 0n) throw new y("esponente negativo");
			for (var r = 1n; n > 0n; n >>= 1n, t = E(t * t)) n & 1n && (r = E(r * t));
			return r;
		case "<<": return E(t << (n & 63n));
		case ">>": return E(t >> (n & 63n));
		case "&": return E(t & n);
		case "|": return E(t | n);
		case "^": return E(t ^ n);
		case "<": return t < n ? 1n : 0n;
		case "<=": return t <= n ? 1n : 0n;
		case ">": return t > n ? 1n : 0n;
		case ">=": return t >= n ? 1n : 0n;
		case "==": return t === n ? 1n : 0n;
		case "!=": return t === n ? 0n : 1n;
	}
	throw new y(`operatore sconosciuto ${e}`);
}
// src/terminal/shell/pattern.js
var Oe = {
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
}, j = /* @__PURE__ */ new Map(), ke = (e) => String(e).replace(/[\\*?[\]]/g, "\\$&"), Ae = (e) => e.replace(/[.*+?^${}()|[\]\\/-]/g, "\\$&");
function je(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (n === "\\") t++;
		else if (n === "*" || n === "?") return !0;
		else if (n === "[" && Me(e, t) > 0) return !0;
	}
	return !1;
}
function Me(e, t) {
	let n = t + 1;
	for ((e[n] === "!" || e[n] === "^") && n++, e[n] === "]" && n++; n < e.length; n++) if (e[n] === "\\") n++;
	else if (e[n] === "[" && e[n + 1] === ":") {
		let t = e.indexOf(":]", n + 2);
		t > 0 && (n = t + 1);
	} else if (e[n] === "]") return n;
	return -1;
}
function Ne(e) {
	let t = "";
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === "\\") n + 1 < e.length ? t += Ae(e[++n]) : t += "\\\\";
		else if (r === "*") t += "[\\s\\S]*";
		else if (r === "?") t += "[\\s\\S]";
		else if (r === "[" && Me(e, n) > 0) {
			let r = Me(e, n), i = n + 1, a = "";
			for ((e[i] === "!" || e[i] === "^") && (a += "^", i++); i < r; i++) {
				let t = e[i];
				if (t === "[" && e[i + 1] === ":") {
					let t = e.indexOf(":]", i + 2), n = e.slice(i + 2, t);
					a += Oe[n] ?? "", i = t + 1;
				} else t === "\\" ? a += "\\" + (e[++i] ?? "\\") : t === "-" && i > n + 1 && i < r - 1 && a && a !== "^" ? a += "-" : a += /[\]\\^-]/.test(t) ? "\\" + t : t;
			}
			t += `[${a}]`, n = r;
		} else t += Ae(r);
	}
	return t;
}
function M(e, t, { ignoreCase: n = !1 } = {}) {
	let r = (n ? "i" : "s") + e, i = j.get(r);
	return i || (i = RegExp(`^(?:${Ne(e)})$`, n ? "i" : ""), j.size > 500 && j.clear(), j.set(r, i)), i.test(t);
}
var Pe = (e) => String(e).replace(/\\([\s\S])/g, "$1");
// src/terminal/shell/paths.js
function N(e, t) {
	t = String(t);
	let r = n.home, i;
	if (t === "~" || t.startsWith("~/")) i = t.slice(1);
	else if (t.startsWith("/")) {
		let e = t.toLowerCase(), n = r.toLowerCase();
		i = e === n || e.startsWith(n + "/") ? t.slice(r.length) : t;
	} else i = n.ancestors(e).slice(1).map((e) => e.name).join("/") + "/" + t;
	let a = [];
	for (let e of i.split("/")) e && e !== "." && (e === ".." ? a.pop() : a.push(e));
	return a;
}
function P(e, t) {
	return t === "" ? null : n.resolve("~/" + N(e, t).join("/"));
}
function Fe(e, t) {
	let r = N(e, t), i = r.pop() ?? "";
	return {
		parent: n.resolve("~/" + r.join("/")),
		name: i
	};
}
function Ie(e) {
	let t = n.ancestors(e).slice(1).map((e) => e.name);
	return t.length ? "~/" + t.join("/") : "~";
}
var Le = (e, t) => e === "" ? t : e.endsWith("/") ? e + t : `${e}/${t}`;
function Re(e, t) {
	let r = t.startsWith("/"), i = t.split("/"), a = [r ? "/" : ""];
	r && i.shift();
	let o = !1;
	return i.forEach((t) => {
		if (t === "") return;
		if (!je(t)) {
			a = a.map((e) => Le(e, Pe(t)));
			return;
		}
		o = !0;
		let r = [];
		for (let i of a) {
			let a = P(e, i || ".");
			a?.type === "folder" && n.children(a.id).map((e) => e.name).filter((e) => (!e.startsWith(".") || t.startsWith(".") || t.startsWith("\\.")) && M(t, e)).sort(F).forEach((e) => r.push(Le(i, e)));
		}
		a = r;
	}), o ? (t.endsWith("/") && (a = a.filter((t) => P(e, t)?.type === "folder").map((e) => e + "/")), a.filter((t) => P(e, t))) : [];
}
var F = (e, t) => e.localeCompare(t), ze = { brk: !0 }, Be = 1e5;
async function I(e, t) {
	let n = [];
	for (let r of t) n.push(...await Ve(e, r));
	return n;
}
async function Ve(e, t, { split: n = !t.noSplit, braces: r = n } = {}) {
	let i = r ? Ke(t.parts) : [t.parts], a = [];
	for (let t of i) {
		let r = await B(e, Xe(e, t), !1), i = n ? Ge(r, Ue(e)) : [z(r)];
		for (let t of i) {
			if (n && !e.options.noglob) {
				let n = We(t);
				if (je(n)) {
					let t = Re(e.cwd, n);
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
async function L(e, t) {
	return t ? z(await B(e, Xe(e, t.parts), !1)).map((e) => e.text).join("") : "";
}
async function R(e, t) {
	return t ? We(z(await B(e, Xe(e, t.parts), !1))) : "";
}
async function He(e, t) {
	return z(await B(e, t.parts, !1)).map((e) => e.quoted ? e.text.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") : e.text).join("");
}
var Ue = (e) => e.getVar("IFS") ?? " 	\n", We = (e) => e.map((e) => e.quoted ? ke(e.text) : e.text).join("");
function z(e) {
	return e.map((e) => e.brk ? {
		text: " ",
		quoted: !0
	} : e);
}
function Ge(e, t) {
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
function Ke(e) {
	if (!e.some((e) => e.type === "lit" && e.value.includes("{"))) return [e];
	let t = e.flatMap((e) => e.type === "lit" ? [...e.value].map((e) => ({ c: e })) : [{ part: e }]), n = [];
	return qe(t, n), n.map(Ye);
}
function qe(e, t) {
	if (t.length > Be) throw new y("espansione delle graffe troppo grande");
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
			for (let n = 0; n < r.length - 1; n++) qe([
				...o,
				...e.slice(r[n] + 1, r[n + 1]),
				...s
			], t);
			return;
		}
		let c = e.slice(n + 1, i), l = c.every((e) => e.c != null) ? Je(c.map((e) => e.c).join("")) : null;
		if (l) {
			for (let e of l) qe([
				...o,
				...[...e].map((e) => ({ c: e })),
				...s
			], t);
			return;
		}
	}
	t.push(e);
}
function Je(e) {
	let t = /^(-?\d+)\.\.(-?\d+)(?:\.\.(-?\d+))?$/.exec(e);
	if (t) {
		let [e, n] = [Number(t[1]), Number(t[2])], r = Math.abs(Number(t[3] ?? 1)) || 1, i = /^-?0\d/.test(t[1]) || /^-?0\d/.test(t[2]) ? Math.max(t[1].length, t[2].length) : 0;
		if (Math.abs(n - e) / r > Be) throw new y("espansione delle graffe troppo grande");
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
function Ye(e) {
	let t = [];
	for (let n of e) n.part ? t.push(n.part) : t.at(-1)?.type === "lit" && t.at(-1).fresh ? t.at(-1).value += n.c : t.push({
		type: "lit",
		value: n.c,
		fresh: !0
	});
	return t;
}
function Xe(e, t) {
	let r = t[0];
	if (r?.type !== "lit" || !r.value.startsWith("~")) return t;
	let i = r.value.indexOf("/"), a = i < 0 ? r.value : r.value.slice(0, i), o = i < 0 ? "" : r.value.slice(i), s = null;
	return a === "~" ? s = e.getVar("HOME") ?? n.home : a === "~+" ? s = e.getVar("PWD") : a === "~-" ? s = e.getVar("OLDPWD") : a.slice(1) === e.getVar("USER") && (s = n.home), s == null || i < 0 && t.length > 1 && t[1].type !== "lit" ? t : [
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
async function B(e, t, n) {
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
			let t = await B(e, i.parts, !0), n = i.parts.length > 0 && i.parts.every((e) => e.type === "param" && Ze(e));
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
			let t = await L(e, i.word);
			r.push({
				text: String(e.arith(t)),
				quoted: n,
				split: !n
			});
			break;
		}
		case "param": r.push(...await Qe(e, i, n));
	}
	return r;
}
var Ze = (e) => !e.length && !e.op && (e.name === "@" || e.index === "@");
async function Qe(e, t, n) {
	let { values: r, multi: i, star: a } = await $e(e, t);
	if (i || a) {
		if (a && n) return [{
			text: r.join((Ue(e) || "")[0] ?? ""),
			quoted: !0
		}];
		let t = [];
		return r.forEach((e, r) => {
			r && t.push(ze), t.push({
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
async function $e(e, t) {
	let n = t.name, r = t.index ?? null;
	if (t.indirect && (r === "@" || r === "*")) return {
		values: e.arrayKeys(n),
		multi: r === "@",
		star: r === "*"
	};
	if (t.indirect) {
		let t = et(e, n, r).values[0] ?? "", i = /^([A-Za-z_]\w*|[0-9]+|[@*#?$!-])(?:\[(.*)\])?$/.exec(t);
		if (!i) throw new y(`${t}: sostituzione errata`);
		[, n, r = null] = i;
	}
	let { values: i, set: a, multi: o, star: s } = et(e, n, r);
	if (t.length) return o || s ? { values: [String(i.length)] } : { values: [String([...i[0] ?? ""].length)] };
	let c = t.op;
	if (!c) {
		if (!a && e.options.nounset && !(o || s)) throw new y(`${n}: variabile non impostata`);
		return {
			values: i,
			multi: o,
			star: s
		};
	}
	let l = !a || i.length === 0 || i.length === 1 && i[0] === "" && !(o || s), u = c.startsWith(":") ? l : !a;
	switch (c) {
		case "-":
		case ":-": return u ? { values: [await L(e, t.arg)] } : {
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
			if (!/^[A-Za-z_]\w*$/.test(n)) throw new y(`${n}: impossibile assegnare in questo modo`);
			return e.setVar(n, await L(e, t.arg), r), { values: [e.getVar(n, r) ?? ""] };
		case "?":
		case ":?":
			if (!u) return {
				values: i,
				multi: o,
				star: s
			};
			throw new y(`${n}: ${await L(e, t.arg) || "parametro nullo o non impostato"}`);
		case "+":
		case ":+": return u ? { values: [] } : { values: [await L(e, t.arg)] };
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
			let n = await R(e, t.arg);
			return d((e) => tt(e, n, c));
		}
		case "/":
		case "//":
		case "/#":
		case "/%": {
			let n = await R(e, t.arg), r = await L(e, t.replace);
			return d((e) => nt(e, n, r, c));
		}
		case "^":
		case "^^":
		case ",":
		case ",,": {
			let n = t.arg?.parts.length ? await R(e, t.arg) : "?", r = c[0] === "^";
			return d((e) => [...e].map((e, t) => (c.length === 2 || t === 0) && M(n, e) ? r ? e.toUpperCase() : e.toLowerCase() : e).join(""));
		}
		case "substr": {
			let r = Number(e.arith(await L(e, t.offset))), a = t.count ? Number(e.arith(await L(e, t.count))) : null, c = (e) => {
				let t = r < 0 ? Math.max(0, e.length + r) : Math.min(r, e.length);
				if (a == null) return e.slice(t);
				if (a < 0) {
					if (o || s) throw new y(`${a}: espressione di sottostringa < 0`);
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
	throw new y(`${n}: sostituzione errata`);
}
function et(e, t, n) {
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
function tt(e, t, n) {
	let r = n.length === 2;
	if (n[0] === "#") {
		let n = [...Array(e.length + 1).keys()];
		r && n.reverse();
		for (let r of n) if (M(t, e.slice(0, r))) return e.slice(r);
	} else {
		let n = [...Array(e.length + 1).keys()];
		r || n.reverse();
		for (let r of n) if (M(t, e.slice(r))) return e.slice(0, r);
	}
	return e;
}
function nt(e, t, n, r) {
	if (!t) return e;
	let i = Ne(t);
	if (r === "/#") return e.replace(RegExp(`^(?:${i})`), () => n);
	if (r === "/%") {
		for (let r = 0; r <= e.length; r++) if (M(t, e.slice(r))) return e.slice(0, r) + n;
		return e;
	}
	let a = new RegExp(i, r === "//" ? "g" : "");
	return e.replace(a, (e) => e === "" ? e : n);
}
// src/terminal/shell/streams.js
var V = class {
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
}, rt = class extends V {
	#e;
	constructor(e) {
		super(), this.#e = String(e);
	}
	async pull() {
		let e = this.#e;
		return this.#e = null, e || null;
	}
}, H = class extends V {}, U = class {
	write() {}
	async close() {}
}, it = class extends U {}, at = class extends U {
	text = "";
	write(e) {
		this.text += e;
	}
}, ot = class extends U {
	constructor(e) {
		super(), this.fn = e;
	}
	write(e) {
		return this.fn(String(e));
	}
}, st = 65536;
function ct() {
	let e = [], t = 0, n = !1, r = !1, i = null, a = [], o = () => {
		i?.(), i = null;
	}, s = () => {
		let e = a;
		a = [], e.forEach((e) => e());
	};
	class c extends U {
		async write(n) {
			if (r || (n = String(n), n && (e.push(n), t += n.length, o(), t > st && await new Promise((e) => a.push(e)), r))) throw new g();
		}
		async close() {
			n = !0, o();
		}
	}
	class l extends V {
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
var lt = 200, ut = 0, dt = 1e3, ft = class e {
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
	#e = n.root;
	constructor({ host: e, commands: t, parent: r = null }) {
		if (this.host = e, this.commands = t, r) return;
		this.token = new b(), this.jobs = {
			list: [],
			next: 1
		}, this.pid = dt++, this.started = Date.now();
		let a = i.user?.username || "utente", o = {
			HOME: n.home,
			USER: a,
			LOGNAME: a,
			HOSTNAME: "lilos",
			SHELL: "/bin/bash",
			TERM: "lilos",
			PATH: `${n.home}/bin`,
			PS1: "\\u@\\h:\\w\\$ ",
			PS2: "> ",
			0: "bash",
			BASH_VERSION: "5.2-lilos"
		};
		for (let [e, t] of Object.entries(o)) this.scopes[0].set(e, {
			value: t,
			exported: ![
				"PS1",
				"PS2",
				"0",
				"BASH_VERSION"
			].includes(e)
		});
		this.cwd = n.root;
	}
	get cwd() {
		return n.get(this.#e)?.type === "folder" ? this.#e : n.root;
	}
	set cwd(e) {
		let t = this.getVar("PWD");
		this.#e = e, t != null && t !== n.path(e) && this.setVar("OLDPWD", t), this.setVar("PWD", n.path(e));
	}
	resolve(e) {
		return P(this.cwd, e);
	}
	locate(e) {
		return Fe(this.cwd, e);
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
		if (o?.readonly) throw new y(`${e}: variabile in sola lettura`);
		return o || (o = {
			value: null,
			exported: !1
		}, (r ? this.scopes.at(-1) : this.scopes[0]).set(e, o)), Array.isArray(t) ? o.value = [...t] : n == null ? t !== void 0 && (Array.isArray(o.value) ? o.value[0] = t == null ? "" : String(t) : o.value = t == null ? null : String(t)) : (Array.isArray(o.value) || (o.value = o.value == null ? [] : [o.value]), o.value[n] = String(t)), i !== void 0 && (o.exported = i), a && (o.readonly = !0), o;
	}
	unsetVar(e, t = null) {
		for (let n = this.scopes.length - 1; n >= 0; n--) {
			let r = this.scopes[n].get(e);
			if (r) {
				if (r.readonly) throw new y(`${e}: impossibile eliminare: variabile in sola lettura`);
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
		return he(e, this.#n);
	}
	#n = {
		get: (e, t) => this.getVar(e, t == null ? null : Number(t)),
		set: (e, t, n) => this.setVar(e, n, t == null ? null : Number(t))
	};
	arrayIndex(e) {
		let t = String(e).replace(/\$\{?([A-Za-z_]\w*|[0-9#?])\}?/g, (e, t) => (/^\d$/.test(t) ? this.positional[t - 1] : t === "#" ? this.positional.length : t === "?" ? this.status : this.getVar(t)) ?? ""), n = Number(this.arith(t));
		if (n < 0) throw new y(`${e}: indice dell’array non valido`);
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
		return ce(e, { aliases: this.aliases }), this.exec({
			type: "script",
			source: e
		}, t);
	}
	async tick() {
		this.token.check();
		let e = performance.now();
		e - ut > 12 && (ut = e, await new Promise((e) => setTimeout(e)), this.token.check());
	}
	sleep(e) {
		return new Promise((t, n) => {
			let r = this.token.onAbort(() => {
				clearTimeout(i), n(new h());
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
				for (let r of le(e.source, { aliases: this.aliases })) n = await this.execList(r, t);
				return n;
			}
		}
		return this.withRedirects(e.redirs ?? [], t, (t) => this.execCompound(e, t));
	}
	async execList(e, t) {
		let n = this.status;
		for (let r of e.items) if (r.async ? (this.startJob(r, t), n = 0) : (this.exempt = !1, n = await this.exec(r.node, t)), this.status = n, n !== 0 && this.options.errexit && !this.condDepth && !this.exempt && !r.async) throw new m(n);
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
				let r = e.cmds.slice(1).map(() => ct()), i = e.cmds.length - 1, a = await Promise.all(e.cmds.map(async (n, a) => {
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
			if (e instanceof m) return e.code;
			if (e instanceof g) return 141;
			if (e instanceof d || e instanceof f) return 0;
			if (e instanceof p) return e.code;
			if (e instanceof y) return await t.stderr.write(`bash: ${e.message}\n`), e.code;
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
				let n = e.words ? await I(this, e.words) : [...this.positional], r = 0, i = 0;
				return await this.loop(async () => i >= n.length ? !1 : (this.setVar(e.name, n[i++]), r = await this.exec(e.body, t), !0)), r;
			}
			case "cfor": {
				let n = async (e) => this.arith(await L(this, e)), r = 0;
				e.init.parts.length && await n(e.init);
				let i = !0;
				return await this.loop(async () => (!i && e.step.parts.length && await n(e.step), i = !1, e.cond.parts.length && await n(e.cond) === 0n ? !1 : (r = await this.exec(e.body, t), !0))), r;
			}
			case "case": {
				let n = await L(this, e.word), r = 0;
				for (let i = 0; i < e.items.length; i++) {
					let a = e.items[i], o = !1;
					for (let e of a.patterns) if (M(await R(this, e), n)) {
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
			case "arithcmd": return +(this.arith(await L(this, e.word)) === 0n);
			case "cond": try {
				return +!await this.cond(e.expr);
			} catch (e) {
				if (!(e instanceof y)) throw e;
				return await t.stderr.write(`bash: ${e.message}\n`), 2;
			}
		}
		throw new y(`costrutto sconosciuto: ${e.type}`);
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
					if (e instanceof d) {
						if (e.levels > 1) throw new d(e.levels - 1);
						return;
					}
					if (e instanceof f) {
						if (e.levels > 1) throw new f(e.levels - 1);
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
			case "word": return await L(this, e.word) !== "";
			case "unary": return this.unaryTest(e.flag, await L(this, e.arg));
		}
		let t = await L(this, e.left);
		switch (e.bop) {
			case "==":
			case "=": return M(await R(this, e.right), t);
			case "!=": return !M(await R(this, e.right), t);
			case "=~": {
				let n;
				try {
					n = new RegExp(await He(this, e.right));
				} catch {
					throw new y("espressione regolare non valida");
				}
				let r = n.exec(t);
				return this.setVar("BASH_REMATCH", r ? [...r].map((e) => e ?? "") : []), !!r;
			}
		}
		return this.binaryTest(e.bop, t, await L(this, e.right), !0);
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
		throw new y(`${e}: operatore unario atteso`);
	}
	binaryTest(e, t, n) {
		let r = (e) => {
			if (!/^\s*-?\d+\s*$/.test(e)) throw new y(`${e}: è attesa un’espressione intera`);
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
		throw new y(`${e}: operatore binario atteso`);
	}
	async execSimple(e, t) {
		await this.tick(), this.curIo = t, this.substStatus = null;
		let n;
		try {
			n = [];
			for (let t of e.words) {
				if (!t.declArray) {
					n.push(...await Ve(this, t));
					continue;
				}
				let { name: e, append: r, words: i } = t.declArray, a = await I(this, i);
				(this.declArrays ??= /* @__PURE__ */ new Map()).set(e, a), n.push(`${e}${r ? "+" : ""}=(${a.join(" ")})`);
			}
		} catch (e) {
			if (!(e instanceof y)) throw e;
			return await t.stderr.write(`bash: ${e.message}\n`), 1;
		}
		if (!n.length) {
			try {
				for (let t of e.assigns) await this.assign(t);
			} catch (e) {
				if (!(e instanceof y)) throw e;
				return await t.stderr.write(`bash: ${e.message}\n`), 1;
			}
			let n = this.substStatus ?? 0;
			return e.redirs.length ? this.withRedirects(e.redirs, t, async () => n) : n;
		}
		let r = null;
		if (e.assigns.length) {
			r = /* @__PURE__ */ new Map();
			for (let t of e.assigns) r.set(t.name, {
				value: t.array ? await I(this, t.array) : await L(this, t.value),
				exported: !0
			});
		}
		return this.options.xtrace && await t.stderr.write(`+ ${n.map(W).join(" ")}\n`), this.withRedirects(e.redirs, t, async (e) => {
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
			let t = await I(this, e.array);
			this.setVar(e.name, e.append ? [...this.getArray(e.name) ?? [], ...t] : t);
			return;
		}
		let t = await L(this, e.value), n = e.index == null ? null : this.arrayIndex(e.index);
		e.append ? this.setVar(e.name, (this.getVar(e.name, n) ?? "") + t, n) : this.setVar(e.name, t, n), this.options.xtrace && await this.curIo?.stderr.write(`+ ${e.name}=${W(t)}\n`);
	}
	async invoke(e, t, { functions: n = !0 } = {}) {
		let r = e[0];
		if (r.includes("/")) return this.runScript(r, e.slice(1), t);
		if (n && this.functions.has(r)) return this.callFunction(r, e, t);
		let i = this.commands.get(r);
		if (i) return this.runCommand(i, e, t);
		for (let n of (this.getVar("PATH") ?? "").split(":").filter(Boolean)) for (let i of [r, `${r}.sh`]) if (this.resolve(`${n}/${i}`)?.type === "file") return this.runScript(`${n}/${i}`, e.slice(1), t);
		return await t.stderr.write(`bash: ${r}: comando non trovato\n`), 127;
	}
	async runCommand(e, t, n) {
		let r = new pt(this, e, t, n);
		if (t[1] === "--help" && !e.ownHelp) return await r.out(gt(e)), 0;
		try {
			let t = await e.run(r);
			return typeof t == "number" ? t : 0;
		} catch (e) {
			if (e instanceof g) return 141;
			let t = async (e) => {
				try {
					await r.error(e);
				} catch {}
			};
			if (e instanceof y) return await t(e.message), e.code;
			if (e instanceof d || e instanceof f || e instanceof p || e instanceof m || e instanceof h) throw e;
			return e instanceof _ || e instanceof v ? (await t(e.message || "errore di sintassi: fine del testo inattesa"), 2) : (await t(e?.message ?? String(e)), 1);
		}
	}
	async callFunction(e, t, n) {
		if (this.funcDepth >= lt) throw new y(`${e}: troppi livelli di ricorsione`);
		let r = this.functions.get(e), i = this.positional, a = /* @__PURE__ */ new Map();
		this.positional = t.slice(1), this.scopes.push(a), this.funcDepth++;
		try {
			return await this.exec(r.body, n);
		} catch (e) {
			if (e instanceof p) return e.code;
			throw e;
		} finally {
			this.funcDepth--, this.scopes.splice(this.scopes.indexOf(a), 1), this.positional = i;
		}
	}
	async readScript(e) {
		let t = this.resolve(e);
		if (!t) throw new y(`${e}: file o cartella inesistente`, 127);
		if (t.type === "folder") throw new y(`${e}: è una cartella`, 126);
		if (t.type !== "file") throw new y(`${e}: non è un file`, 126);
		return n.read(t.id);
	}
	async runScript(e, t, n) {
		let r;
		try {
			r = await this.readScript(e);
		} catch (e) {
			if (!(e instanceof y)) throw e;
			return await n.stderr.write(`bash: ${e.message}\n`), e.code;
		}
		let i = this.subshell({ script: !0 });
		return i.positional = [...t], i.setVar("0", e), i.runSource(r, n, e);
	}
	async runSource(e, t, n) {
		try {
			ce(e, { aliases: this.aliases });
		} catch (e) {
			if (!(e instanceof v || e instanceof _)) throw e;
			return await t.stderr.write(`${n}: ${e.message || "errore di sintassi: fine del file inattesa"}\n`), 2;
		}
		return this.runSubshell({
			type: "script",
			source: e
		}, t);
	}
	async substitute(e) {
		let t = new at(), n = this.curIo ?? this.host, r = await this.subshell().runSubshell(e, {
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
						if (a === "-") r[e] = n.op === ">&" ? new it() : new H();
						else if (/^\d+$/.test(a)) {
							if (!r[a]) throw new y(`${a}: descrittore di file errato`);
							r[e] = r[a];
						} else if (n.op === ">&" && n.fd == null) {
							let e = await this.openWrite(a, !1, t);
							i.push(e), r[1] = r[2] = e;
						} else throw new y(`${a}: è richiesto un descrittore di file`);
						break;
					}
					case "<<":
					case "<<-":
						r[e] = new rt(await L(this, n.heredoc.body));
						break;
					case "<<<": r[e] = new rt(await L(this, n.target) + "\n");
				}
			}
		} catch (e) {
			if (!(e instanceof y)) throw e;
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
		let t = await Ve(this, e.target);
		if (t.length !== 1) throw new y(`${await L(this, e.target)}: redirezione ambigua`);
		return t[0];
	}
	async openRead(e, t) {
		if (e === "/dev/null") return new H();
		if (e === "/dev/stdin") return t.stdin;
		let r = this.resolve(e);
		if (!r) throw new y(`${e}: file o cartella inesistente`);
		if (r.type === "folder") throw new y(`${e}: è una cartella`);
		if (r.type !== "file") throw new y(`${e}: non è un file`);
		return new rt(await n.read(r.id));
	}
	async openWrite(e, t, r) {
		if (e === "/dev/null") return new it();
		if (e === "/dev/stdout") return ht(r.stdout);
		if (e === "/dev/stderr") return ht(r.stderr);
		if (e === "/dev/tty") return ht(this.host.stdout);
		let i = this.fileFor(e).id;
		return t || await n.write(i, ""), new mt(i, t);
	}
	fileFor(e) {
		let t = this.resolve(e);
		if (t?.type === "folder") throw new y(`${e}: è una cartella`);
		if (t?.type === "app") throw new y(`${e}: è un collegamento a un’app`);
		if (t) return t;
		let { parent: r, name: i } = this.locate(e);
		if (r?.type !== "folder" || !i) throw new y(`${e}: file o cartella inesistente`);
		return n.create(r.id, {
			type: "file",
			name: i
		});
	}
	startJob(e, t) {
		let n = this.subshell();
		n.token = new b();
		let r = {
			id: this.jobs.next++,
			pid: dt++,
			text: e.text.replace(/&\s*$/, "").trim(),
			state: "running",
			code: null,
			token: n.token,
			notified: !1
		};
		return n.pid = r.pid, r.promise = n.runSubshell(e.node, {
			stdin: new H(),
			stdout: t.stdout,
			stderr: t.stderr
		}).then((e) => e, (e) => e instanceof h ? 130 : (t.stderr.write(`bash: ${e?.message ?? e}\n`), 1)).then((e) => (r.state = "done", r.code = e, e)), this.jobs.list.push(r), this.lastBg = r.pid, this.subshellLevel || t.stderr.write(`[${r.id}] ${r.pid}\n`), r;
	}
	findJob(e) {
		let t = this.jobs.list;
		return e == null || e === "%%" || e === "%+" || e === "%" ? t.at(-1) ?? null : e === "%-" ? t.at(-2) ?? null : /^%\d+$/.test(e) ? t.find((t) => t.id === Number(e.slice(1))) ?? null : /^\d+$/.test(e) ? t.find((t) => t.pid === Number(e)) ?? null : e.startsWith("%") ? t.find((t) => t.text.startsWith(e.slice(1))) ?? null : null;
	}
	reapJobs() {
		let e = this.jobs.list.filter((e) => e.state === "done");
		return this.jobs.list = this.jobs.list.filter((e) => e.state !== "done"), this.jobs.list.length || (this.jobs.next = 1), e.map((e) => `[${e.id}]  ${e.code === 0 ? "Fatto" : e.code === 130 ? "Interrotto" : `Uscita ${e.code}`}\t\t${e.text}\n`);
	}
	async waitJob(e, { forward: t = !1 } = {}) {
		let n, r = new Promise((r, i) => {
			n = this.token.onAbort(() => {
				t ? e.token.abort() : i(new h());
			});
		});
		try {
			return await Promise.race([e.promise, r]);
		} finally {
			n();
		}
	}
}, pt = class {
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
			e ? e.type === "folder" ? (await this.error(`${t}: è una cartella`), this.failed = !0) : e.type === "file" ? (yield {
				name: t,
				node: e,
				text: await n.read(e.id)
			}, await this.tick()) : (await this.error(`${t}: non è un file`), this.failed = !0) : (await this.error(`${t}: file o cartella inesistente`), this.failed = !0);
		}
	}
}, mt = class extends U {
	#e = "";
	constructor(e, t) {
		super(), this.id = e, this.append = t;
	}
	write(e) {
		this.#e += e;
	}
	async close() {
		if (!n.exists(this.id) || this.append && !this.#e) return;
		let e = this.append ? await n.read(this.id) : "";
		await n.write(this.id, e + this.#e);
	}
}, ht = (e) => ({
	write: (t) => e.write(t),
	close: async () => {}
}), W = (e) => e === "" ? "''" : /^[\w@%+=:,./~-]+$/.test(e) ? e : `'${e.replace(/'/g, "'\\''")}'`;
function gt(e) {
	return `${e.usage ? `Uso: ${e.usage}\n` : ""}${e.summary ?? ""}\n${e.help ? `\n${e.help.trim()}\n` : ""}`;
}
// src/terminal/commands/options.js
function G(e, { flags: t = "", values: n = "", multi: r = "", long: i = {}, number: a = !1, stopAtArg: o = !1 } = {}) {
	let s = {}, c = [], l = e.args, u = (e, t) => {
		r.includes(e) ? (s[e] ??= []).push(t) : s[e] = t;
	}, d = (t) => new y(`opzione non valida -- «${t}»${e.cmd.usage ? `\nUso: ${e.cmd.usage}` : ""}`, 2);
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
				if (n == null) throw new y(`l’opzione «--${t}» richiede un argomento`, 2);
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
					if (t == null) throw new y(`l’opzione richiede un argomento -- «${a}»`, 2);
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
function K(e, t = "numero") {
	if (!/^[+-]?\d+$/.test(String(e))) throw new y(`${t} non valido: «${e}»`, 2);
	return Number(e);
}
// src/terminal/commands/builtins.js
var _t = [
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
], vt = {
	errexit: "e",
	nounset: "u",
	xtrace: "x",
	noglob: "f",
	pipefail: null
}, yt = {
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
function bt(e, { printf: t = !1 } = {}) {
	let n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i !== "\\" || r === e.length - 1) {
			n += i;
			continue;
		}
		let a = e[++r];
		if (yt[a] != null) {
			n += yt[a];
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
function xt(e, t) {
	let n = "", r = 0, i = [], a = /%([-+ #0]*)(\*|\d+)?(?:\.(\*|\d*))?([diouxXfFeEgGcsbq%])/y, o = () => r < t.length ? t[r++] : void 0, s = (e) => {
		if (e == null || e === "") return 0;
		if (/^['"]./.test(e)) return e.codePointAt(1);
		let t = e.trim();
		if (/^[+-]?(0[xX][0-9a-fA-F]+|\d+)$/.test(t)) return Number(t.startsWith("-") ? -Number(t.slice(1)) : Number(t.replace(/^\+/, "")));
		if (/^[+-]?0[0-7]+$/.test(t)) return parseInt(t, 8);
		let n = Number(t);
		return Number.isFinite(n) ? n : (i.push(`${e}: è richiesto un numero`), 0);
	};
	do {
		let t = r;
		for (let t = 0; t < e.length;) {
			let r = e[t];
			if (r === "\\") {
				let r = /^\\(x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{1,4}|[0-7]{1,3}|.)/s.exec(e.slice(t))[0], { text: a, stop: o } = bt(r, { printf: !0 });
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
					m = bt(p ?? "").text;
					break;
				case "q":
					m = W(p ?? "");
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
function St(e, t) {
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
		if (n >= t.length) throw new y("manca un argomento", 2);
		if (t[n] === "(" && n + 2 < t.length) {
			n++;
			let e = a();
			if (t[n] !== ")") throw new y("manca «)»", 2);
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
	if (n < t.length) throw new y(`${t[n]}: argomento inatteso`, 2);
	return l;
}
function Ct(e, t) {
	let n = (Array.isArray(t.value) ? "a" : "") + (t.exported ? "x" : "") + (t.readonly ? "r" : ""), r = Array.isArray(t.value) ? `(${Object.keys(t.value).map((e) => `[${e}]=${JSON.stringify(t.value[e])}`).join(" ")})` : JSON.stringify(t.value);
	return `declare -${n || "-"} ${e}=${r}\n`;
}
async function q(e, { local: t = !1, exported: n, readonly: r = !1, flags: i = "axrigpfFn" } = {}) {
	let a = e.shell, { opts: o, args: s } = G(e, { flags: i });
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
		for (let [n, r] of t) await e.out(Ct(n, r));
		return 0;
	}
	let l = 0;
	for (let t of s) {
		let i = /^([A-Za-z_]\w*)(?:\[([^\]]*)\])?(\+?)(?:=(.*))?$/s.exec(t);
		if (!i) {
			await e.error(`«${t}»: identificatore non valido`), l = 1;
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
var wt = (e, t, n) => {
	if (t == null) return n;
	if (!/^-?\d+$/.test(t)) throw new y(`${t}: è richiesto un argomento numerico`, 2);
	return (Number(t) % 256 + 256) % 256;
}, Tt = [
	{
		name: "cd",
		usage: "cd [cartella]",
		summary: "Cambia la cartella di lavoro.",
		help: "Senza argomenti va nella home ($HOME). «cd -» torna alla cartella precedente ($OLDPWD).",
		async run(e) {
			let t = e.shell, { args: n } = G(e, { flags: "LPe" }), r = n[0] ?? t.getVar("HOME") ?? "~";
			if (n.length > 1) throw new y("troppi argomenti");
			if (r === "-") {
				if (r = t.getVar("OLDPWD"), r == null) throw new y("OLDPWD non impostata");
				await e.out(r + "\n");
			}
			let i = e.resolve(r);
			if (!i) throw new y(`${r}: file o cartella inesistente`);
			if (i.type !== "folder") throw new y(`${r}: non è una cartella`);
			t.cwd = i.id;
		}
	},
	{
		name: "pwd",
		usage: "pwd",
		summary: "Mostra la cartella di lavoro.",
		async run(e) {
			await e.out(n.path(e.cwd) + "\n");
		}
	},
	{
		name: "echo",
		ownHelp: !0,
		usage: "echo [-neE] [testo…]",
		summary: "Scrive gli argomenti, separati da uno spazio.",
		help: "-n  senza a capo finale\n-e  interpreta \\n, \\t, \\\\, \\e… \n-E  non le interpreta (predefinito)",
		async run(e) {
			let t = e.args, n = !0, r = !1;
			for (; t.length && /^-[neE]+$/.test(t[0]);) {
				for (let e of t[0].slice(1)) e === "n" ? n = !1 : r = e === "e";
				t = t.slice(1);
			}
			let i = t.join(" ");
			if (r) {
				let e = bt(i);
				i = e.text, e.stop && (n = !1);
			}
			await e.out(i + (n ? "\n" : ""));
		}
	},
	{
		name: "printf",
		ownHelp: !0,
		usage: "printf [-v var] formato [argomenti…]",
		summary: "Scrive gli argomenti secondo un formato (%s, %d, %5.2f, %x, %b, %q…).",
		help: "Il formato si riapplica finché restano argomenti. -v salva il risultato in una variabile.",
		async run(e) {
			let t = e.args, n = null;
			if (t[0] === "-v" && (n = t[1], t = t.slice(2)), t[0] === "--" && (t = t.slice(1)), !t.length) throw new y(`uso: ${this.usage}`, 2);
			let { text: r, errors: i } = xt(t[0], t.slice(1));
			for (let t of i) await e.error(t);
			return n ? e.shell.setVar(n, r) : await e.out(r), +!!i.length;
		}
	},
	{
		name: "export",
		usage: "export [-n] [nome[=valore]…]",
		summary: "Rende le variabili visibili ai comandi e agli script avviati.",
		help: "Senza argomenti elenca le variabili esportate. -n toglie l’esportazione.",
		run: (e) => q(e, {
			exported: !0,
			flags: "npf"
		})
	},
	{
		name: "readonly",
		usage: "readonly [nome[=valore]…]",
		summary: "Rende le variabili di sola lettura.",
		run: (e) => q(e, {
			readonly: !0,
			flags: "ap"
		})
	},
	{
		name: "local",
		usage: "local [-arx] nome[=valore]…",
		summary: "Variabili visibili solo dentro la funzione.",
		run(e) {
			if (!e.shell.funcDepth) throw new y("si può usare solo in una funzione");
			return q(e, {
				local: !0,
				flags: "axrin"
			});
		}
	},
	{
		name: "declare",
		usage: "declare [-aprxifF] [nome[=valore]…]",
		summary: "Dichiara variabili e ne mostra gli attributi.",
		help: "-a array, -x esportata, -r sola lettura, -i intero (il valore si calcola), -p mostra, -f mostra le funzioni, -g globale dentro una funzione.",
		run: (e) => q(e)
	},
	{
		name: "typeset",
		usage: "typeset [-aprxifF] [nome[=valore]…]",
		summary: "Come declare.",
		run: (e) => q(e)
	},
	{
		name: "unset",
		usage: "unset [-fv] nome…",
		summary: "Elimina variabili (o funzioni con -f).",
		async run(e) {
			let { opts: t, args: n } = G(e, { flags: "fv" });
			for (let r of n) {
				if (t.f) {
					e.shell.functions.delete(r);
					continue;
				}
				let n = /^([A-Za-z_]\w*)(?:\[(.*)\])?$/.exec(r);
				if (!n) throw new y(`«${r}»: identificatore non valido`);
				n[2] == null && !t.v && !e.shell.isSet(n[1]) && e.shell.functions.has(n[1]) ? e.shell.functions.delete(n[1]) : e.shell.unsetVar(n[1], n[2] == null ? null : e.shell.arrayIndex(n[2]));
			}
		}
	},
	{
		name: "env",
		usage: "env [nome=valore…] [comando [argomenti…]]",
		summary: "Mostra le variabili esportate, o avvia un comando con variabili in più.",
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
		usage: "printenv [nome…]",
		summary: "Mostra le variabili esportate (o il valore di quelle indicate).",
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
		usage: "set [-euxf] [-o opzione] [--] [argomenti…]",
		summary: "Imposta le opzioni della shell e i parametri posizionali ($1, $2…).",
		help: "-e  esce al primo comando che fallisce\n-u  errore se si usa una variabile non impostata\n-x  mostra i comandi prima di eseguirli\n-f  niente espansione di * e ?\n-o pipefail  una pipe fallisce se fallisce uno dei suoi comandi\n+e, +u… le disattivano. Senza argomenti mostra tutte le variabili.",
		async run(e) {
			let t = e.shell, n = e.args;
			if (!n.length) {
				for (let [n, r] of t.variables()) await e.out(`${n}=${Array.isArray(r.value) ? `(${r.value.map(W).join(" ")})` : W(r.value)}\n`);
				return 0;
			}
			for (let r = 0; r < n.length; r++) {
				let i = n[r];
				if (i === "--") return t.positional = n.slice(r + 1), 0;
				if (/^[-+]o$/.test(i)) {
					let a = n[++r];
					if (a == null) {
						for (let [n] of Object.entries(vt)) await e.out(`${n.padEnd(15)}${t.options[n] ? "on" : "off"}\n`);
						continue;
					}
					if (!(a in vt)) throw new y(`${a}: nome di opzione non valido`, 2);
					t.options[a] = i[0] === "-";
				} else if (/^[-+][euxfv]+$/.test(i)) for (let e of i.slice(1)) {
					let n = Object.keys(vt).find((t) => vt[t] === e);
					n && (t.options[n] = i[0] === "-");
				}
				else {
					if (/^[-+]/.test(i) && i.length > 1) throw new y(`${i}: opzione non valida`, 2);
					return t.positional = n.slice(r), 0;
				}
			}
			return 0;
		}
	},
	{
		name: "shift",
		usage: "shift [n]",
		summary: "Sposta i parametri posizionali: $2 diventa $1…",
		run(e) {
			let t = e.args[0] == null ? 1 : K(e.args[0]);
			return t > e.shell.positional.length ? 1 : (e.shell.positional = e.shell.positional.slice(t), 0);
		}
	},
	{
		name: "true",
		ownHelp: !0,
		usage: "true",
		summary: "Non fa niente, con successo (stato 0).",
		run: () => 0
	},
	{
		name: "false",
		ownHelp: !0,
		usage: "false",
		summary: "Non fa niente, senza successo (stato 1).",
		run: () => 1
	},
	{
		name: ":",
		ownHelp: !0,
		usage: ": [argomenti…]",
		summary: "Non fa niente (stato 0); gli argomenti vengono comunque espansi.",
		run: () => 0
	},
	{
		name: "test",
		ownHelp: !0,
		usage: "test espressione",
		summary: "Valuta un’espressione: stato 0 se vera, 1 se falsa.",
		help: "File: -e esiste, -f è un file, -d è una cartella, -s non è vuoto\nTesto: -z vuoto, -n non vuoto, a = b, a != b\nNumeri: -eq -ne -lt -le -gt -ge\nInsieme: ! negazione, -a e, -o o, ( … )",
		run: (e) => +!St(e.shell, e.args)
	},
	{
		name: "[",
		ownHelp: !0,
		usage: "[ espressione ]",
		summary: "Come test, con una «]» finale.",
		run(e) {
			if (e.args.at(-1) !== "]") throw new y("manca «]»", 2);
			return +!St(e.shell, e.args.slice(0, -1));
		}
	},
	{
		name: "let",
		ownHelp: !0,
		usage: "let espressione…",
		summary: "Calcola espressioni aritmetiche (stato 1 se l’ultima vale 0).",
		run(e) {
			if (!e.args.length) throw new y("manca l’espressione", 2);
			let t = 0n;
			for (let n of e.args) t = e.shell.arith(n);
			return +(t === 0n);
		}
	},
	{
		name: "exit",
		usage: "exit [stato]",
		summary: "Chiude il terminale (o esce dallo script) con uno stato.",
		run(e) {
			throw new m(wt(e, e.args[0], e.shell.status));
		}
	},
	{
		name: "return",
		usage: "return [stato]",
		summary: "Esce dalla funzione (o dallo script letto con source).",
		run(e) {
			throw !e.shell.funcDepth && !e.shell.sourceDepth ? new y("si può usare solo in una funzione o in uno script letto con source") : new p(wt(e, e.args[0], e.shell.status));
		}
	},
	{
		name: "break",
		usage: "break [n]",
		summary: "Esce dal ciclo (o da n cicli).",
		async run(e) {
			if (!e.shell.loopDepth) return await e.error("ha senso solo in un ciclo for, while o until"), 0;
			let t = e.args[0] == null ? 1 : K(e.args[0]);
			throw t < 1 ? new y(`${t}: numero di cicli non valido`) : new d(Math.min(t, e.shell.loopDepth));
		}
	},
	{
		name: "continue",
		usage: "continue [n]",
		summary: "Passa al giro successivo del ciclo (o dell’n-esimo ciclo esterno).",
		async run(e) {
			if (!e.shell.loopDepth) return await e.error("ha senso solo in un ciclo for, while o until"), 0;
			let t = e.args[0] == null ? 1 : K(e.args[0]);
			throw t < 1 ? new y(`${t}: numero di cicli non valido`) : new f(Math.min(t, e.shell.loopDepth));
		}
	},
	{
		name: "read",
		usage: "read [-rs] [-p prompt] [-a array] [-d delim] [nome…]",
		summary: "Legge una riga e la divide nelle variabili indicate ($REPLY senza nomi).",
		help: "-r  le barre rovesciate restano come sono\n-p  mostra un prompt\n-a  mette le parole in un array\n-d  legge fino a questo carattere invece che fino all’a capo\n-s  non mostra ciò che si scrive (per le password)\nStato 1 alla fine dell’input.",
		async run(e) {
			let t = e.shell, { opts: n, args: r } = G(e, {
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
			let s = n.r ? a : a.replace(/\\(.)/g, "$1"), c = t.getVar("IFS") ?? " 	\n", l = [...c].filter((e) => /\s/.test(e)).join(""), u = (e) => e.replace(RegExp(`^[${J(l)}]+|[${J(l)}]+$`, "g"), ""), d = (e) => c ? u(e).split(RegExp(`[${J(l)}]*[${J(c)}][${J(l)}]*|[${J(l)}]+`)).filter((e, t, n) => e !== "" || t < n.length - 1) : [e];
			if (n.a) return t.setVar(n.a, s === "" ? [] : d(s)), +!!o;
			if (!r.length) return t.setVar("REPLY", a), o && !a ? 1 : +!!o;
			let f = c ? u(s) : s;
			return r.forEach((e, n) => {
				if (n === r.length - 1) {
					t.setVar(e, f);
					return;
				}
				let i = c ? RegExp(`^([^${J(c)}]*)(?:[${J(l)}]*[${J(c)}][${J(l)}]*|[${J(l)}]+|$)`).exec(f) : null;
				t.setVar(e, i ? i[1] : f), f = i ? f.slice(i[0].length) : "";
			}), +!!o;
		}
	},
	{
		name: "source",
		usage: "source file [argomenti…]",
		summary: "Esegue i comandi di un file in questa shell (variabili, funzioni e alias restano).",
		run: (e) => Et(e)
	},
	{
		name: ".",
		usage: ". file [argomenti…]",
		summary: "Come source.",
		run: (e) => Et(e)
	},
	{
		name: "eval",
		ownHelp: !0,
		usage: "eval [argomenti…]",
		summary: "Esegue gli argomenti, uniti da spazi, come un comando.",
		async run(e) {
			try {
				return await e.shell.run(e.args.join(" "), e.io);
			} catch (e) {
				throw e instanceof v || e instanceof _ ? new y(e.message || "errore di sintassi: fine del testo inattesa", 2) : e;
			}
		}
	},
	{
		name: "alias",
		usage: "alias [nome[=valore]…]",
		summary: "Definisce o mostra gli alias (nomi brevi per comandi).",
		help: "Esempio: alias ll='ls -l'. Gli alias valgono dalla riga successiva a quella che li definisce.",
		async run(e) {
			let t = e.shell.aliases, { args: n } = G(e, { flags: "p" });
			if (!n.length) {
				for (let [n, r] of [...t].sort()) await e.out(`alias ${n}=${W(r)}\n`);
				return 0;
			}
			let r = 0;
			for (let i of n) {
				let n = i.indexOf("=");
				if (n > 0) {
					let a = i.slice(0, n);
					if (/[\s/$`=|&;<>()'"\\]/.test(a)) {
						await e.error(`«${a}»: nome di alias non valido`), r = 1;
						continue;
					}
					t.set(a, i.slice(n + 1));
				} else t.has(i) ? await e.out(`alias ${i}=${W(t.get(i))}\n`) : (await e.error(`${i}: non trovato`), r = 1);
			}
			return r;
		}
	},
	{
		name: "unalias",
		usage: "unalias [-a] nome…",
		summary: "Elimina degli alias (tutti con -a).",
		async run(e) {
			let { opts: t, args: n } = G(e, { flags: "a" });
			if (t.a) return e.shell.aliases.clear(), 0;
			let r = 0;
			for (let t of n) e.shell.aliases.delete(t) || (await e.error(`${t}: non trovato`), r = 1);
			return r;
		}
	},
	{
		name: "type",
		usage: "type [-t] nome…",
		summary: "Dice cos’è un nome: alias, parola chiave, funzione, comando.",
		async run(e) {
			let { opts: t, args: n } = G(e, { flags: "ta" }), r = 0;
			for (let i of n) {
				let n = Ot(e.shell, i);
				n ? t.t ? await e.out(n.kind + "\n") : await e.out(n.text + "\n") : (t.t || await e.error(`${i}: non trovato`), r = 1);
			}
			return r;
		}
	},
	{
		name: "command",
		usage: "command [-v] nome [argomenti…]",
		summary: "Avvia un comando ignorando le funzioni con lo stesso nome; con -v dice cosa avvierebbe.",
		async run(e) {
			let { opts: t, args: n } = G(e, {
				flags: "vVp",
				stopAtArg: !0
			});
			if (!n.length) return 0;
			if (t.v || t.V) {
				let r = 0;
				for (let i of n) {
					let n = Ot(e.shell, i);
					n ? await e.out((t.V ? n.text : n.kind === "alias" ? `alias ${i}=${W(e.shell.aliases.get(i))}` : n.path ?? i) + "\n") : r = 1;
				}
				return r;
			}
			return e.shell.invoke(n, e.io, { functions: !1 });
		}
	},
	{
		name: "which",
		usage: "which nome…",
		summary: "Dice dove si trova un comando.",
		async run(e) {
			let t = 0;
			for (let n of e.args) {
				let r = Ot(e.shell, n);
				!r || r.kind === "alias" || r.kind === "keyword" || r.kind === "function" ? t = 1 : await e.out((r.path ?? `${n}: comando integrato nel Terminale`) + "\n");
			}
			return t;
		}
	},
	{
		name: "history",
		usage: "history [-c] [n]",
		summary: "Mostra i comandi dati (gli ultimi n); -c cancella la cronologia.",
		async run(e) {
			let { opts: t, args: n } = G(e, { flags: "c" }), r = e.shell.host.history;
			if (!r) return 0;
			if (t.c) return r.clear(), 0;
			let i = r.list(), a = n[0] == null ? i.length : K(n[0]), o = Math.max(0, i.length - a);
			for (let t = o; t < i.length; t++) await e.out(`${String(t + 1).padStart(5)}  ${i[t]}\n`);
		}
	},
	{
		name: "help",
		usage: "help [comando]",
		summary: "Elenca i comandi, o spiega quello indicato.",
		async run(e) {
			let t = e.shell.commands;
			if (e.args.length) {
				let n = 0;
				for (let r of e.args) {
					let i = t.get(r);
					i ? await e.out(gt(i)) : kt[r] ? await e.out(kt[r].trim() + "\n") : (await e.error(`nessun aiuto per «${r}»`), n = 1);
				}
				return n;
			}
			let n = [...t.values()].filter((e, t, n) => n.indexOf(e) === t && !e.hidden).sort((e, t) => e.name.localeCompare(t.name)), r = Math.max(...n.map((e) => e.name.length)) + 2;
			await e.out("Terminale di lilOS: una shell come bash sui file di lilOS.\n«help comando» o «comando --help» spiega un comando; «help if», «help for», «help case»… la sintassi.\n\n");
			for (let t of n) await e.out(`  ${t.name.padEnd(r)}${t.summary ?? ""}${t.app ? ` (${t.app})` : ""}\n`);
			await e.out(`\nSintassi: ${Object.keys(kt).join(", ")}\n`);
		}
	},
	{
		name: "clear",
		usage: "clear",
		summary: "Pulisce lo schermo (anche Ctrl L).",
		async run(e) {
			e.stdout === e.shell.host.stdout ? e.shell.host.clear?.() : await e.out("\x1B[2J\x1B[H");
		}
	},
	{
		name: "jobs",
		usage: "jobs [-lp]",
		summary: "Elenca i comandi avviati in background con &.",
		async run(e) {
			let { opts: t } = G(e, { flags: "lp" }), n = e.shell.jobs.list;
			for (let r of n) {
				let i = r === n.at(-1) ? "+" : r === n.at(-2) ? "-" : " ";
				t.p ? await e.out(`${r.pid}\n`) : await e.out(`[${r.id}]${i} ${t.l ? `${r.pid} ` : ""}${r.state === "done" ? r.code === 0 ? "Fatto" : `Uscita ${r.code}` : "In esecuzione"}\t\t${r.text}\n`);
			}
		}
	},
	{
		name: "wait",
		usage: "wait [%job | pid…]",
		summary: "Aspetta che finiscano i comandi in background (tutti, o quelli indicati).",
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
				i ? n = await t.waitJob(i) : (await e.error(`${r}: non è un job di questa shell`), n = 127);
			}
			return n;
		}
	},
	{
		name: "fg",
		usage: "fg [%job]",
		summary: "Porta in primo piano un comando in background: lo si aspetta e Ctrl C lo interrompe.",
		async run(e) {
			let t = e.shell, n = t.findJob(e.args[0]);
			if (!n) throw new y(`${e.args[0] ?? "attuale"}: job inesistente`);
			await e.out(n.text + "\n");
			let r = await t.waitJob(n, { forward: !0 });
			return t.jobs.list = t.jobs.list.filter((e) => e !== n), r;
		}
	},
	{
		name: "kill",
		usage: "kill [-segnale] %job | pid…",
		summary: "Interrompe dei comandi in background.",
		async run(e) {
			let t = e.args;
			if (t[0] === "-l") return await e.out("HUP INT QUIT KILL TERM\n"), 0;
			if (t[0] === "-s" || t[0] === "-n" ? t = t.slice(2) : /^-\w+$/.test(t[0] ?? "") && (t = t.slice(1)), !t.length) throw new y(`uso: ${this.usage}`, 2);
			let n = 0;
			for (let r of t) {
				let t = e.shell.findJob(r);
				t ? t.token.abort() : (await e.error(`${r}: job o processo inesistente`), n = 1);
			}
			return n;
		}
	},
	{
		name: "sleep",
		usage: "sleep durata…",
		summary: "Aspetta: 5 (secondi), 0.5, 2m, 1h.",
		async run(e) {
			if (!e.args.length) throw new y("manca la durata", 2);
			let t = 0;
			for (let n of e.args) {
				let e = /^(\d+(?:\.\d*)?|\.\d+)([smhd]?)$/.exec(n);
				if (!e) throw new y(`durata non valida: «${n}»`, 2);
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
		usage: "bash [-c comandi | script] [argomenti…]",
		summary: "Esegue uno script o dei comandi in una nuova shell.",
		help: "«bash script.sh a b» esegue lo script con $1=a, $2=b; «bash -c 'echo $1' nome x» esegue il testo; «cat script.sh | bash» legge lo script dall’input.",
		run: (e) => Dt(e)
	},
	{
		name: "sh",
		usage: "sh [-c comandi | script] [argomenti…]",
		summary: "Come bash.",
		run: (e) => Dt(e)
	}
];
async function Et(e) {
	let t = e.shell, [n, ...r] = e.args;
	if (!n) throw new y("manca il nome del file", 2);
	let i = n;
	if (!n.includes("/") && !e.resolve(n)) {
		let r = (t.getVar("PATH") ?? "").split(":").find((t) => t && e.resolve(`${t}/${n}`)?.type === "file");
		r && (i = `${r}/${n}`);
	}
	let a = await t.readScript(i);
	try {
		ce(a, { aliases: t.aliases });
	} catch (e) {
		throw e instanceof v || e instanceof _ ? new y(`${n}: ${e.message || "errore di sintassi: fine del file inattesa"}`, 2) : e;
	}
	let o = t.positional;
	r.length && (t.positional = r), t.sourceDepth = (t.sourceDepth ?? 0) + 1;
	try {
		return await t.exec({
			type: "script",
			source: a
		}, e.io);
	} catch (e) {
		if (e instanceof p) return e.code;
		throw e;
	} finally {
		t.sourceDepth--, r.length && (t.positional = o);
	}
}
async function Dt(e) {
	let t = e.shell, n = [...e.args], r = {
		e: !1,
		x: !1,
		u: !1
	}, i = null;
	for (; n.length && /^-[cexu]+$/.test(n[0]);) for (let e of n.shift().slice(1)) e === "c" ? i = n.shift() : r[e] = !0;
	if (i == null && n[0] === "-c") throw new y("-c: manca il testo dei comandi", 2);
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
			throw e instanceof y ? new y(e.message, e.code) : e;
		}
		return a.runSource(r, e.io, n[0]);
	}
	return e.stdin === t.host.stdin ? (await e.err("Sei già in bash: per uno script scrivi «bash file.sh» o «source file.sh».\n"), 0) : a.runSource(await e.stdin.readAll(), e.io, "bash");
}
function Ot(e, t) {
	if (e.aliases.has(t)) return {
		kind: "alias",
		text: `${t} è un alias di «${e.aliases.get(t)}»`
	};
	if (_t.includes(t)) return {
		kind: "keyword",
		text: `${t} è una parola chiave della shell`
	};
	if (e.functions.has(t)) return {
		kind: "function",
		text: `${t} è una funzione\n${e.functions.get(t).text}`
	};
	let r = e.commands.get(t);
	if (r?.builtin) return {
		kind: "builtin",
		text: `${t} è un comando interno della shell`
	};
	if (r?.app) return {
		kind: "file",
		text: `${t} è un comando dell’app ${r.app}`
	};
	if (r) return {
		kind: "file",
		text: `${t} è un comando del Terminale`
	};
	for (let r of (e.getVar("PATH") ?? "").split(":").filter(Boolean)) for (let i of [t, `${t}.sh`]) {
		let a = e.resolve(`${r}/${i}`);
		if (a?.type === "file") return {
			kind: "file",
			text: `${t} è ${n.path(a.id)}`,
			path: n.path(a.id)
		};
	}
	return t.includes("/") && e.resolve(t)?.type === "file" ? {
		kind: "file",
		text: `${t} è ${t}`,
		path: t
	} : null;
}
var J = (e) => e.replace(/[\]\\^-]/g, "\\$&"), kt = {
	if: "if comandi; then comandi; [elif comandi; then comandi;] [else comandi;] fi\nEsegue il ramo del primo «if»/«elif» i cui comandi riescono (stato 0).\n  if [ -f note.txt ]; then echo c’è; else echo manca; fi",
	for: "for nome in parole…; do comandi; done\nfor (( inizio; condizione; passo )); do comandi; done\n  for f in *.txt; do wc -l \"$f\"; done\n  for ((i = 1; i <= 3; i++)); do echo $i; done",
	while: "while comandi; do comandi; done   (until: finché i comandi NON riescono)\n  n=0; while [ $n -lt 3 ]; do echo $n; n=$((n + 1)); done\n  ls | while read -r nome; do echo \"- $nome\"; done",
	until: "until comandi; do comandi; done: ripete finché i comandi non riescono.",
	case: "case parola in modello|modello) comandi;; … esac\nI modelli usano * ? [ ]. «;&» prosegue nel ramo dopo, «;;&» prova anche i modelli successivi.\n  case \"$f\" in *.txt) echo testo;; *.png|*.jpg) echo immagine;; *) echo altro;; esac",
	function: "nome() { comandi; }   oppure   function nome { comandi; }\nGli argomenti sono $1, $2…, $@; «local» crea variabili della funzione, «return n» esce.\n  saluta() { echo \"Ciao, $1\"; }; saluta Eugenio",
	"[[": "[[ espressione ]]: test senza divisione in parole né espansione di *.\n  [[ $nome == *.txt ]]      confronto con un modello\n  [[ $s =~ ^[0-9]+$ ]]      espressione regolare (gruppi in BASH_REMATCH)\n  [[ -d dir && ! -e file ]] -e -f -d -s -z -n, && || ! ( )",
	"((": "(( espressione )): aritmetica intera; stato 0 se il risultato non è 0.\n  (( n++ )); (( n > 3 )) && echo grande; echo $(( 2 ** 10 ))",
	variabili: "nome=valore (senza spazi), $nome o ${nome}. Array: a=(x y z), ${a[0]}, ${a[@]}, ${#a[@]}.\n${v:-predefinito} ${v:=predefinito} ${v:+alt} ${#v} ${v#prefisso} ${v%suffisso} ${v/da/a} ${v//da/a} ${v:inizio:lunghezza} ${v^^} ${v,,}\nSpeciali: $? stato dell’ultimo comando, $$ la shell, $! l’ultimo comando in background, $# $@ $* gli argomenti.",
	redirezioni: "> file (sovrascrive), >> file (aggiunge), < file (legge), 2> errori, 2>&1, &> file, <<EOF … EOF, <<< testo, | pipe.\n/dev/null scarta tutto."
}, At = [
	"gen",
	"feb",
	"mar",
	"apr",
	"mag",
	"giu",
	"lug",
	"ago",
	"set",
	"ott",
	"nov",
	"dic"
], Y = {
	reset: "\x1B[0m",
	folder: "\x1B[1;34m",
	app: "\x1B[36m",
	script: "\x1B[32m",
	dim: "\x1B[2m"
}, jt = (e) => e.type === "file" && /\.(sh|bash)$/i.test(e.name), Mt = (e) => `impossibile accedere a «${e}»: file o cartella inesistente`, Nt = (e) => e.stdout === e.shell.host.stdout;
function Pt(e) {
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
	return (n < 10 ? n.toFixed(1) : String(Math.round(n))).replace(".", ",") + t[r];
}
function Ft(e) {
	let t = new Date(e), n = /* @__PURE__ */ new Date(), r = String(t.getDate()).padStart(2) + " " + At[t.getMonth()];
	return Math.abs(n - t) < 15552e6 ? `${r} ${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}` : `${r}  ${t.getFullYear()}`;
}
var It = (e) => e.type === "file" ? e.size ?? 0 : e.type === "folder" ? n.children(e.id).length : 0;
function X(e, t, n = t.name, r = !1) {
	let i = r ? t.type === "folder" ? "/" : t.type === "app" ? "@" : jt(t) ? "*" : "" : "";
	if (!Nt(e)) return n + i;
	let a = t.type === "folder" ? Y.folder : t.type === "app" ? Y.app : jt(t) ? Y.script : "";
	return a ? `${a}${n}${Y.reset}${i}` : n + i;
}
function Lt(e, t) {
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
function Rt(e, t) {
	let n = [...e].sort((e, n) => (t.t ? n.modified - e.modified : t.S ? It(n) - It(e) : 0) || F(e.name, n.name));
	return t.r ? n.reverse() : n;
}
async function zt(e, t, r) {
	if (!t.length) return;
	if (!r.l) {
		if (r[1] || !Nt(e)) for (let { node: n, name: i } of t) await e.out(X(e, n, i, r.F) + "\n");
		else {
			let n = t.map(({ node: t, name: n }) => ({
				text: X(e, t, n, r.F),
				plain: n + (r.F && (t.type !== "file" || jt(t)) ? " " : "")
			}));
			await e.out(Lt(n, e.shell.host.columns?.() ?? 80));
		}
		return;
	}
	let i = t.map(({ node: t, name: i }) => {
		let a = t.type === "folder" ? "d" : t.type === "app" ? "l" : "-", s = t.type === "file" ? r.h ? Pt(t.size ?? 0) : String(t.size ?? 0) : t.type === "folder" ? String(n.children(t.id).length) : "-", c = (t.tags ?? []).map((e) => o.get(e)?.name).filter(Boolean), l = X(e, t, i, r.F);
		return t.type === "app" && (l += ` -> app:${t.app}`), c.length && (l += (Nt(e) ? Y.dim : "") + " " + c.map((e) => "#" + e).join(" ") + (Nt(e) ? Y.reset : "")), {
			type: a,
			size: s,
			date: Ft(t.modified ?? t.created ?? 0),
			shown: l
		};
	}), a = Math.max(...i.map((e) => e.size.length));
	for (let t of i) await e.out(`${t.type}  ${t.size.padStart(a)}  ${t.date}  ${t.shown}\n`);
}
var Bt = (e, t) => n.children(e).filter((e) => t.a || t.A || !e.name.startsWith("."));
async function Vt(e) {
	let { opts: t, args: r } = G(e, {
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
	}), i = r.length ? r : ["."], a = 0, o = [], s = [];
	for (let n of i) {
		let r = e.resolve(n);
		r ? r.type === "folder" && !t.d ? s.push({
			node: r,
			name: n
		}) : o.push({
			node: r,
			name: n
		}) : (await e.error(Mt(n)), a = 2);
	}
	await zt(e, Rt(o.map((e) => ({
		...e.node,
		shownName: e.name
	})), t).map((e) => ({
		node: e,
		name: e.shownName
	})), t);
	let c = i.length > 1 || t.R, l = !o.length, u = async (r, i) => {
		await e.tick(), c && await e.out(`${l ? "" : "\n"}${i}:\n`), l = !1;
		let a = Rt(Bt(r.id, t), t), o = a.map((e) => ({
			node: e,
			name: e.name
		}));
		if (t.a && o.unshift({
			node: r,
			name: "."
		}, ...r.id === n.root ? [] : [{
			node: n.get(r.parent),
			name: ".."
		}]), await zt(e, o, t), t.R) for (let e of a.filter((e) => e.type === "folder")) await u(e, `${i.replace(/\/$/, "")}/${e.name}`);
	};
	for (let { node: e, name: t } of s) await u(e, t);
	return a;
}
async function Ht(e) {
	let { opts: t, args: n } = G(e, {
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
function Ut(e, t) {
	let r = n.get(n.root);
	for (let i of N(e.cwd, t)) {
		let e = n.children(r.id).find((e) => e.name.toLowerCase() === i.toLowerCase()) ?? n.resolve(`${n.path(r.id)}/${i}`);
		if (e && e.type !== "folder") throw new y(`impossibile creare la cartella «${t}»: «${i}» esiste e non è una cartella`);
		r = e ?? n.create(r.id, {
			type: "folder",
			name: i
		});
	}
	return r;
}
async function Wt(e) {
	let { opts: t, args: r } = G(e, {
		flags: "pv",
		long: {
			parents: "p",
			verbose: "v"
		}
	});
	if (!r.length) throw new y("manca l’operando", 2);
	let i = 0;
	for (let a of r) try {
		let r = e.resolve(a);
		if (r) {
			if (t.p && r.type === "folder") continue;
			throw new y(`impossibile creare la cartella «${a}»: il file esiste`);
		}
		if (t.p) Ut(e, a);
		else {
			let { parent: t, name: r } = e.locate(a);
			if (t?.type !== "folder" || !r) throw new y(`impossibile creare la cartella «${a}»: file o cartella inesistente`);
			n.create(t.id, {
				type: "folder",
				name: r
			});
		}
		t.v && await e.out(`creata la cartella «${a}»\n`);
	} catch (t) {
		await e.error(t.message), i = 1;
	}
	return i;
}
async function Gt(e) {
	let { opts: t, args: r } = G(e, {
		flags: "cam",
		long: { "no-create": "c" }
	});
	if (!r.length) throw new y("manca l’operando", 2);
	let i = 0;
	for (let a of r) {
		let r = e.resolve(a);
		if (r) {
			r.type === "file" && await n.write(r.id, await n.readBlob(r.id));
			continue;
		}
		if (t.c) continue;
		let { parent: o, name: s } = e.locate(a);
		o?.type !== "folder" || !s ? (await e.error(`impossibile creare «${a}»: file o cartella inesistente`), i = 1) : n.create(o.id, {
			type: "file",
			name: s
		});
	}
	return i;
}
async function Kt(e, t, r, i, a) {
	await e.tick();
	let o = n.children(r).find((e) => e.name.toLowerCase() === i.toLowerCase());
	if (t.type === "folder") {
		let s = o;
		if (s && s.type !== "folder") throw new y(`impossibile sovrascrivere «${i}», che non è una cartella, con una cartella`);
		s ??= n.create(r, {
			type: "folder",
			name: i,
			color: t.color
		});
		for (let r of n.children(t.id)) await Kt(e, r, s.id, r.name, a);
		return;
	}
	if (o) {
		if (a.n) return;
		if (o.type === "folder") throw new y(`impossibile sovrascrivere la cartella «${i}» con un file`);
		if (o.type === "file" && t.type === "file") {
			await n.write(o.id, await n.readBlob(t.id)), a.v && await e.out(`«${n.path(t.id)}» -> «${n.path(o.id)}»\n`);
			return;
		}
		n.trash([o.id]);
	}
	let s = n.create(r, {
		type: t.type,
		name: i,
		app: t.app
	});
	t.type === "file" && await n.write(s.id, await n.readBlob(t.id)), a.v && await e.out(`«${n.path(t.id)}» -> «${n.path(s.id)}»\n`);
}
function qt(e, t) {
	if (t.length < 2) throw new y(t.length ? `manca la destinazione dopo «${t[0]}»` : "manca l’operando", 2);
	let r = t.at(-1), i = t.slice(0, -1), a = e.resolve(r);
	if (i.length > 1 && a?.type !== "folder") throw new y(`la destinazione «${r}» non è una cartella`);
	return {
		sources: i,
		target: (t) => {
			if (a?.type === "folder" && a.id !== t.id) return {
				parent: a,
				name: t.name
			};
			if (a) return {
				parent: n.get(a.parent),
				name: a.id === t.id ? N(e.cwd, r).at(-1) : a.name,
				existing: a
			};
			let { parent: i, name: o } = e.locate(r);
			if (i?.type !== "folder" || !o) throw new y(`impossibile creare «${r}»: file o cartella inesistente`);
			return {
				parent: i,
				name: o
			};
		}
	};
}
async function Jt(e) {
	let { opts: t, args: r } = G(e, {
		flags: "rRanvfp",
		long: {
			recursive: "r",
			"no-clobber": "n",
			verbose: "v",
			force: "f",
			archive: "a"
		}
	}), { sources: i, target: a } = qt(e, r), o = 0;
	for (let r of i) try {
		let i = e.resolve(r);
		if (!i) throw new y(`impossibile fare stat di «${r}»: file o cartella inesistente`);
		if (i.type === "folder" && !(t.r || t.R || t.a)) throw new y(`-r non specificato; si omette la cartella «${r}»`);
		let { parent: o, name: s } = a(i);
		if (i.type === "folder" && n.isInside(o.id, i.id)) throw new y(`impossibile copiare la cartella «${r}» dentro se stessa`);
		await Kt(e, i, o.id, s, t);
	} catch (t) {
		if (!(t instanceof y) && !(t instanceof Error)) throw t;
		await e.error(t.message), o = 1;
	}
	return o;
}
async function Yt(e) {
	let { opts: t, args: r } = G(e, {
		flags: "nvfi",
		long: {
			"no-clobber": "n",
			verbose: "v",
			force: "f"
		}
	}), { sources: i, target: a } = qt(e, r), o = 0;
	for (let r of i) try {
		let i = e.resolve(r);
		if (!i) throw new y(`impossibile fare stat di «${r}»: file o cartella inesistente`);
		if (i.system) throw new y(`impossibile spostare «${r}»: è una cartella di sistema`);
		let { parent: o, name: s } = a(i);
		if (i.type === "folder" && n.isInside(o.id, i.id)) throw new y(`impossibile spostare «${r}» in una sua sottocartella`);
		let c = n.children(o.id).find((e) => e.id !== i.id && e.name.toLowerCase() === s.toLowerCase());
		if (c) {
			if (t.n) continue;
			if (c.type === "folder" && i.type !== "folder") throw new y(`impossibile sovrascrivere la cartella «${s}» con un file`);
			if (c.type === "folder" && n.children(c.id).length) throw new y(`impossibile spostare «${r}» su «${s}»: la cartella non è vuota`);
			n.trash([c.id]);
		}
		i.parent !== o.id && n.move(i.id, o.id), n.get(i.id).name !== s && n.rename(i.id, s), t.v && await e.out(`rinominato «${r}» -> «${n.path(i.id)}»\n`);
	} catch (t) {
		await e.error(t.message), o = 1;
	}
	return o;
}
async function Xt(e) {
	let { opts: t, args: r } = G(e, {
		flags: "rRfvdi",
		long: {
			recursive: "r",
			force: "f",
			verbose: "v",
			dir: "d",
			purge: "P"
		}
	});
	if (!r.length && !t.f) throw new y("manca l’operando", 2);
	let i = 0;
	for (let a of r) {
		let r = e.resolve(a);
		if (!r) t.f || (await e.error(`impossibile rimuovere «${a}»: file o cartella inesistente`), i = 1);
		else try {
			if (r.id === n.root) throw new y(`è pericoloso agire su «${a}»: è la home`);
			if (r.type === "folder" && !(t.r || t.R)) {
				if (!t.d) throw new y(`impossibile rimuovere «${a}»: è una cartella`);
				if (n.children(r.id).length) throw new y(`impossibile rimuovere «${a}»: la cartella non è vuota`);
			}
			if (r.system) throw new y(`impossibile rimuovere «${a}»: è una cartella di sistema`);
			if (t.P) n.remove(r.id);
			else if (!n.trash([r.id]).length) throw new y(`impossibile rimuovere «${a}»: contiene cartelle di sistema`);
			t.v && await e.out(t.P ? `eliminato definitivamente «${a}»\n` : `spostato nel cestino «${a}»\n`);
		} catch (t) {
			await e.error(t.message), i = 1;
		}
	}
	return i;
}
async function Zt(e) {
	let { opts: t, args: r } = G(e, {
		flags: "pv",
		long: {
			parents: "p",
			verbose: "v"
		}
	});
	if (!r.length) throw new y("manca l’operando", 2);
	let i = 0;
	for (let a of r) {
		let r = t.p ? N(e.cwd, a).map((e, t, n) => "~/" + n.slice(0, n.length - t).join("/")) : [a];
		for (let a of r) {
			let r = e.resolve(a), o = async (t) => {
				await e.error(`impossibile rimuovere «${a}»: ${t}`), i = 1;
			};
			if (!r) {
				await o("file o cartella inesistente");
				break;
			}
			if (r.type !== "folder") {
				await o("non è una cartella");
				break;
			}
			if (n.children(r.id).length) {
				await o("la cartella non è vuota");
				break;
			}
			if (r.system || r.id === n.root) {
				await o("è una cartella di sistema");
				break;
			}
			n.trash([r.id]), t.v && await e.out(`rimossa la cartella «${a}»\n`);
		}
	}
	return i;
}
var Qt = (e) => new Date(e).toLocaleString("it-IT", {
	dateStyle: "medium",
	timeStyle: "medium"
}), $t = (e) => e.type === "folder" ? "cartella" : e.type === "app" ? `collegamento all’app ${e.app}` : e.size ? "file" : "file vuoto";
async function en(e) {
	let { opts: t, args: r } = G(e, {
		values: "c",
		long: { format: "c" }
	});
	if (!r.length) throw new y("manca l’operando", 2);
	let i = 0;
	for (let a of r) {
		let r = e.resolve(a);
		if (!r) {
			await e.error(Mt(a)), i = 1;
			continue;
		}
		if (t.c != null) {
			let n = {
				n: a,
				N: `'${a}'`,
				s: String(r.size ?? 0),
				F: $t(r),
				Y: String(Math.floor(r.modified / 1e3)),
				y: new Date(r.modified).toISOString(),
				W: String(Math.floor(r.created / 1e3)),
				w: new Date(r.created).toISOString(),
				i: r.id,
				"%": "%"
			};
			await e.out(t.c.replace(/%(.)/g, (e, t) => n[t] ?? e) + "\n");
			continue;
		}
		let s = (r.tags ?? []).map((e) => o.get(e)?.name).filter(Boolean);
		await e.out([
			`  File: ${a}`,
			`  Tipo: ${$t(r)}`,
			`  Percorso: ${n.path(r.id)}`,
			r.type === "folder" ? `  Elementi: ${n.children(r.id).length} (${n.count(r.id)} in tutto)` : r.type === "file" ? `  Dimensione: ${r.size ?? 0} byte (${Pt(r.size ?? 0)})` : null,
			`  Creato: ${Qt(r.created)}`,
			`  Modificato: ${Qt(r.modified)}`,
			s.length ? `  Tag: ${s.join(", ")}` : null,
			r.system ? "  Cartella di sistema" : null,
			`  Id: ${r.id}`
		].filter(Boolean).join("\n") + "\n");
	}
	return i;
}
function tn(e, t) {
	let r = 0, i = {
		maxdepth: Infinity,
		mindepth: 0
	}, a = [], o = () => {
		let e = s();
		for (; t[r] === "-o" || t[r] === "-or";) {
			r++;
			let t = s(), n = e;
			e = (e) => n(e) || t(e);
		}
		return e;
	}, s = () => {
		let e = c();
		for (;;) {
			if (t[r] === "-a" || t[r] === "-and") r++;
			else if (r >= t.length || t[r] === "-o" || t[r] === "-or" || t[r] === ")") return e;
			let n = c(), i = e;
			e = (e) => i(e) && n(e);
		}
	}, c = () => {
		if (t[r] === "!" || t[r] === "-not") {
			r++;
			let e = c();
			return (t) => !e(t);
		}
		return u();
	}, l = (e) => {
		if (r >= t.length) throw new y(`manca l’argomento di «${e}»`);
		return t[r++];
	}, u = () => {
		let s = t[r++];
		switch (s) {
			case "(": {
				let e = o();
				if (t[r++] !== ")") throw new y("manca «)»");
				return e;
			}
			case "-name": {
				let e = l(s);
				return (t) => M(e, t.node.name);
			}
			case "-iname": {
				let e = l(s);
				return (t) => M(e, t.node.name, { ignoreCase: !0 });
			}
			case "-path":
			case "-wholename": {
				let e = l(s);
				return (t) => M(e, t.path);
			}
			case "-ipath": {
				let e = l(s);
				return (t) => M(e, t.path, { ignoreCase: !0 });
			}
			case "-type": {
				let e = l(s), t = {
					f: "file",
					d: "folder",
					l: "app"
				}[e];
				if (!t) throw new y(`tipo sconosciuto per -type: «${e}» (f, d o l)`);
				return (e) => e.node.type === t;
			}
			case "-empty": return (e) => e.node.type === "folder" ? !n.children(e.node.id).length : e.node.type === "file" && !e.node.size;
			case "-size": {
				let e = l(s), t = /^([+-]?)(\d+)([ckMG]?)$/.exec(e);
				if (!t) throw new y(`dimensione non valida: «${e}»`);
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
				if (!t) throw new y(`valore non valido per ${s}: «${e}»`);
				let n = s === "-mtime" ? 864e5 : 6e4;
				return (e) => {
					let r = Math.floor((Date.now() - e.node.modified) / n);
					return t[1] === "+" ? r > +t[2] : t[1] === "-" ? r < +t[2] : r === +t[2];
				};
			}
			case "-newer": {
				let n = e.resolve(l(s));
				if (!n) throw new y(`impossibile trovare «${t[r - 1]}»`);
				return (e) => e.node.modified > n.modified;
			}
			case "-maxdepth": return i.maxdepth = K(l(s)), () => !0;
			case "-mindepth": return i.mindepth = K(l(s)), () => !0;
			case "-true": return () => !0;
			case "-false": return () => !1;
			case "-print": return i.printed = !0, (e) => (e.out.push(e.path), !0);
			case "-print0": return i.printed = !0, (e) => (e.out.push(e.path + "\0"), !0);
			case "-delete": return i.printed = !0, (e) => (e.deletes.push(e.node.id), !0);
			case "-exec":
			case "-ok": {
				let e = [];
				for (; r < t.length && t[r] !== ";" && t[r] !== "+";) e.push(t[r++]);
				let n = t[r] === "+";
				if (r >= t.length) throw new y("manca la fine di «-exec» («;» o «+»)");
				if (r++, !e.length) throw new y("manca il comando di «-exec»");
				i.printed = !0;
				let o = {
					cmd: e,
					plus: n,
					batch: []
				};
				return a.push(o), (t) => n ? (o.batch.push(t.path), !0) : (t.runs.push(e.map((e) => e.replaceAll("{}", t.path))), !0);
			}
		}
		throw new y(`predicato sconosciuto: «${s}»`);
	}, d = t.length ? o() : () => !0;
	if (r < t.length) throw new y(`argomento inatteso: «${t[r]}»`);
	return {
		expr: d,
		global: i,
		execs: a
	};
}
async function nn(e) {
	let t = e.args, r = 0;
	for (; r < t.length && !/^[-(!]/.test(t[r]);) r++;
	let i = r ? t.slice(0, r) : ["."], { expr: a, global: o, execs: s } = tn(e, t.slice(r)), c = 0, l = [], u = async (t) => {
		let n = await e.shell.invoke(t, e.io);
		return n !== 0 && (c = 1), n === 0;
	};
	for (let t of i) {
		let r = e.resolve(t);
		if (!r) {
			await e.error(`«${t}»: file o cartella inesistente`), c = 1;
			continue;
		}
		let i = async (t, r, s) => {
			if (await e.tick(), s >= o.mindepth) {
				let n = {
					node: t,
					path: r,
					out: [],
					deletes: l,
					runs: []
				};
				a(n) && !o.printed && n.out.push(r);
				for (let t of n.out) await e.out(t.endsWith("\0") ? t : t + "\n");
				for (let e of n.runs) await u(e);
			}
			if (t.type === "folder" && s < o.maxdepth) for (let e of [...n.children(t.id)].sort((e, t) => F(e.name, t.name))) await i(e, r.endsWith("/") ? r + e.name : `${r}/${e.name}`, s + 1);
		};
		await i(r, t, 0);
	}
	for (let e of s.filter((e) => e.plus && e.batch.length)) {
		let t = e.cmd.indexOf("{}");
		await u(t < 0 ? [...e.cmd, ...e.batch] : [
			...e.cmd.slice(0, t),
			...e.batch,
			...e.cmd.slice(t + 1)
		]);
	}
	return l.length && n.trash([...l].reverse().filter((e) => n.exists(e))), c;
}
async function rn(e) {
	let { opts: t, args: n } = G(e, {
		flags: "adf",
		values: "L"
	}), r = t.L == null ? Infinity : K(t.L), i = 0, a = 0, o = 0;
	for (let s of n.length ? n : ["."]) {
		let n = e.resolve(s);
		if (!n) {
			await e.error(`«${s}»: file o cartella inesistente`), o = 1;
			continue;
		}
		await e.out(X(e, n, s) + "\n");
		let c = async (n, o, s) => {
			if (s > r) return;
			let l = Rt(Bt(n.id, t).filter((e) => !t.d || e.type === "folder"), {});
			for (let n = 0; n < l.length; n++) {
				await e.tick();
				let r = l[n], u = n === l.length - 1, d = t.f ? `${o.replace(/[│├└─ ]/g, "")}${r.name}` : r.name;
				await e.out(`${o}${u ? "└── " : "├── "}${X(e, r, d)}${r.type === "app" ? ` -> app:${r.app}` : ""}\n`), r.type === "folder" ? (i++, await c(r, o + (u ? "    " : "│   "), s + 1)) : a++;
			}
		};
		await c(n, "", 1);
	}
	return await e.out(`\n${i} ${i === 1 ? "cartella" : "cartelle"}${t.d ? "" : `, ${a} file`}\n`), o;
}
async function an(e) {
	let { opts: t, args: n } = G(e, {
		flags: "az",
		values: "s",
		long: {
			multiple: "a",
			suffix: "s"
		}
	});
	if (!n.length) throw new y("manca l’operando", 2);
	let r = t.a || t.s != null ? n : [n[0]], i = t.s ?? (t.a ? null : n[1]);
	for (let n of r) {
		let r = n.replace(/\/+$/, "").split("/").pop() || (n.startsWith("/") ? "/" : "");
		i && r.endsWith(i) && r !== i && (r = r.slice(0, -i.length)), await e.out(r + (t.z ? "\0" : "\n"));
	}
}
async function on(e) {
	if (!e.args.length) throw new y("manca l’operando", 2);
	for (let t of e.args) {
		let n = t.replace(/\/+$/, ""), r = n.lastIndexOf("/");
		await e.out((r < 0 ? "." : r === 0 ? "/" : n.slice(0, r).replace(/\/+$/, "") || "/") + "\n");
	}
}
async function sn(e) {
	let { opts: t, args: r } = G(e, { flags: "emq" }), i = 0;
	for (let a of r.length ? r : ["."]) {
		let r = e.resolve(a);
		r ? await e.out(n.path(r.id) + "\n") : t.m ? await e.out([n.home, ...N(e.cwd, a)].join("/") + "\n") : (t.q || await e.error(`${a}: file o cartella inesistente`), i = 1);
	}
	return i;
}
var cn = [
	{
		name: "ls",
		usage: "ls [-laAh1trSdRF] [percorso…]",
		summary: "Elenca il contenuto delle cartelle.",
		run: Vt,
		help: "-l  dettagli (tipo, dimensione, data, tag)\n-a  anche i nomi che iniziano con «.»\n-h  dimensioni leggibili (1,2K)\n-t  per data, -S per dimensione, -r al contrario\n-1  uno per riga\n-d  la cartella stessa, non il contenuto\n-R  anche le sottocartelle\n-F  / dopo le cartelle, @ dopo i collegamenti, * dopo gli script"
	},
	{
		name: "cat",
		usage: "cat [-nbsE] [file…]",
		summary: "Mostra il contenuto dei file (o dell’input), uno dopo l’altro.",
		run: Ht,
		help: "-n  numera le righe\n-b  numera solo quelle non vuote\n-s  una sola riga vuota di fila\n-E  $ alla fine di ogni riga"
	},
	{
		name: "mkdir",
		usage: "mkdir [-pv] cartella…",
		summary: "Crea delle cartelle.",
		run: Wt,
		help: "-p  crea anche le cartelle intermedie; nessun errore se esiste già"
	},
	{
		name: "touch",
		usage: "touch [-c] file…",
		summary: "Crea dei file vuoti, o aggiorna la data di modifica di quelli che esistono.",
		run: Gt
	},
	{
		name: "cp",
		usage: "cp [-rnv] origine… destinazione",
		summary: "Copia file e cartelle.",
		run: Jt,
		help: "-r  copia anche le cartelle, con il loro contenuto\n-n  non sovrascrive i file che esistono\n-v  dice cosa copia"
	},
	{
		name: "mv",
		usage: "mv [-nv] origine… destinazione",
		summary: "Sposta o rinomina file e cartelle.",
		run: Yt,
		help: "Se la destinazione è una cartella, ci sposta dentro; altrimenti rinomina. Un file sovrascritto va nel cestino.\n-n  non sovrascrive\n-v  dice cosa sposta"
	},
	{
		name: "rm",
		usage: "rm [-rfvd] [--purge] percorso…",
		summary: "Sposta file e cartelle nel cestino (con --purge li elimina per sempre).",
		run: Xt,
		help: "-r  anche le cartelle, con il loro contenuto\n-d  le cartelle vuote\n-f  nessun errore per ciò che non esiste\n--purge  elimina definitivamente, senza cestino\nCiò che va nel cestino si rimette a posto con «trash restore»."
	},
	{
		name: "rmdir",
		usage: "rmdir [-p] cartella…",
		summary: "Rimuove cartelle vuote (nel cestino).",
		run: Zt
	},
	{
		name: "stat",
		usage: "stat [-c formato] percorso…",
		summary: "Mostra i dettagli di file e cartelle.",
		run: en,
		help: "-c  formato: %n nome, %s dimensione, %F tipo, %y data di modifica, %Y in secondi, %w %W creazione, %i id"
	},
	{
		name: "find",
		usage: "find [percorso…] [espressione]",
		summary: "Cerca file e cartelle.",
		run: nn,
		help: "Test: -name modello, -iname, -path, -type f|d|l, -empty, -size [+-]n[ckMG], -mtime [+-]giorni, -mmin, -newer file\nAzioni: -print, -print0, -delete (nel cestino), -exec comando {} \\; oppure +\nOpzioni: -maxdepth n, -mindepth n. Insieme: ! (negazione), -o (o), ( … )\nEsempio: find . -name \"*.txt\" -size +1k"
	},
	{
		name: "tree",
		usage: "tree [-adf] [-L livelli] [cartella…]",
		summary: "Mostra le cartelle ad albero.",
		run: rn
	},
	{
		name: "basename",
		usage: "basename percorso [suffisso]",
		summary: "L’ultima parte di un percorso (senza il suffisso).",
		run: an
	},
	{
		name: "dirname",
		usage: "dirname percorso…",
		summary: "Il percorso senza l’ultima parte.",
		run: on
	},
	{
		name: "realpath",
		usage: "realpath [-m] percorso…",
		summary: "Il percorso completo.",
		run: sn
	}
], ln = {
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
}, un = /* @__PURE__ */ new Set([
	"(",
	")",
	"{",
	"}",
	"|",
	"+",
	"?"
]);
function dn(e, t) {
	let n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i === "[") {
			let t = r + 1, i = "[";
			for (e[t] === "^" && (i += "^", t++), e[t] === "]" && (i += "\\]", t++); t < e.length && e[t] !== "]"; t++) {
				if (e[t] === "[" && e[t + 1] === ":") {
					let n = e.indexOf(":]", t + 2);
					if (n > 0) {
						i += ln[e.slice(t + 2, n)] ?? "", t = n + 1;
						continue;
					}
				}
				i += e[t] === "\\" ? "\\\\" : e[t] === "[" ? "\\[" : e[t];
			}
			if (t >= e.length) throw new y("«[» senza «]» nell’espressione regolare", 2);
			n += i + "]", r = t;
		} else if (i === "\\" && r + 1 < e.length) {
			let i = e[++r];
			i === "<" || i === ">" ? n += "\\b" : !t && un.has(i) ? n += i : n += "\\" + i;
		} else !t && un.has(i) ? n += "\\" + i : i === "*" && (r === 0 || !t && e.slice(0, r).endsWith("\\(")) ? n += "\\*" : n += i;
	}
	return n;
}
function fn(e, { extended: t = !1, fixed: n = !1, ignoreCase: r = !1, word: i = !1, line: a = !1, global: o = !1 } = {}) {
	let s = n ? e.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") : dn(e, t);
	i && (s = `(?<![\\w])(?:${s})(?![\\w])`), a && (s = `^(?:${s})$`);
	try {
		return new RegExp(s, (r ? "i" : "") + (o ? "g" : "") + "u");
	} catch {
		try {
			return new RegExp(s, (r ? "i" : "") + (o ? "g" : ""));
		} catch {
			throw new y(`espressione regolare non valida: ${e}`, 2);
		}
	}
}
// src/terminal/commands/text.js
var pn = (e) => e.stdout === e.shell.host.stdout, mn = (e) => new TextEncoder().encode(e).length;
function Z(e) {
	let t = e.split("\n"), n = e.endsWith("\n");
	return (n || e === "") && t.pop(), {
		lines: t,
		ended: n
	};
}
async function hn(e) {
	let { opts: t, args: n } = G(e, {
		flags: "qv",
		values: "nc",
		long: {
			lines: "n",
			bytes: "c",
			quiet: "q"
		},
		number: !0
	}), r = t.n == null ? 10 : K(t.n), i = n.length ? n : ["-"], a = !0;
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
			let n = K(t.c);
			await e.out(n >= 0 ? i.slice(0, n) : i.slice(0, Math.max(0, i.length + n)));
			continue;
		}
		let { lines: n, ended: a } = Z(i), o = r >= 0 ? n.slice(0, r) : n.slice(0, Math.max(0, n.length + r)), s = o.map((e) => e + "\n").join("");
		await e.out(!a && o.length && o.length === n.length ? s.slice(0, -1) : s);
	}
	return +!!e.failed;
}
async function gn(e) {
	let { opts: t, args: n } = G(e, {
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
			let n = String(t.c), r = K(n.replace(/^[+-]/, ""));
			await e.out(n.startsWith("+") ? a.slice(Math.max(0, r - 1)) : a.slice(Math.max(0, a.length - r)));
			continue;
		}
		let o = String(t.n ?? "10"), { lines: s, ended: c } = Z(a), l = K(o.replace(/^[+-]/, "")), u = o.startsWith("+") ? s.slice(Math.max(0, l - 1)) : l === 0 ? [] : s.slice(-l), d = u.map((e) => e + "\n").join("");
		await e.out(!c && u.length ? d.slice(0, -1) : d);
	}
	return +!!e.failed;
}
async function _n(e) {
	let { opts: t, args: n } = G(e, {
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
		c: mn(r),
		m: [...r].length,
		L: Math.max(0, ...r.split("\n").map((e) => e.length))
	});
	i.length > 1 && i.push({
		name: "totale",
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
async function vn(e) {
	let { opts: t, args: r } = G(e, {
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
	}), i = [...r], a = t.e ?? [];
	for (let r of t.f ?? []) {
		let t = e.resolve(r);
		if (t?.type !== "file") throw new y(`${r}: file o cartella inesistente`, 2);
		a.push(...(await n.read(t.id)).split("\n").filter(Boolean));
	}
	if (!a.length) {
		if (!i.length) throw new y("manca il modello da cercare\nUso: grep [opzioni] modello [file…]", 2);
		a = [i.shift()];
	}
	let o = {
		extended: t.E || t.P,
		fixed: t.F,
		ignoreCase: t.i,
		word: t.w,
		line: t.x
	}, s = a.map((e) => fn(e, o)), c = a.map((e) => fn(e, {
		...o,
		global: !0
	})), l = pn(e), u = t.r || t.R, d = [], f = (e, t) => {
		if (e.type === "file") d.push(t);
		else if (e.type === "folder") for (let r of [...n.children(e.id)].sort((e, t) => F(e.name, t.name))) f(r, t.endsWith("/") ? t + r.name : `${t}/${r.name}`);
	};
	if (u) for (let n of i.length ? i : ["."]) {
		let r = e.resolve(n);
		r ? f(r, n) : (t.s || await e.error(`${n}: file o cartella inesistente`), e.failed = !0);
	}
	else d.push(...i);
	let p = t.H || (d.length > 1 || u) && !t.h, m = K(t.A ?? t.C ?? 0), h = K(t.B ?? t.C ?? 0), g = t.m == null ? Infinity : K(t.m), _ = !1, v = (e) => l ? `\x1b[1;31m${e}\x1b[0m` : e, b = (e, n, r) => (p ? l ? `\x1b[35m${e}\x1b[0m${r}` : e + r : "") + (t.n ? l ? `\x1b[32m${n}\x1b[0m${r}` : n + r : ""), x = async (n, r) => {
		let { lines: i } = Z(r), a = 0, o = -1, u = 0;
		for (let r = 0; r < i.length && a < g; r++) {
			r % 2e3 == 0 && await e.tick();
			let d = i[r];
			if (s.some((e) => e.test(d)) === !!t.v) u > 0 && !t.c && !t.l && !t.L && !t.q && (await e.out(b(n, r + 1, "-") + d + "\n"), o = r, u--);
			else {
				if (a++, _ = !0, t.q) return a;
				if (!(t.c || t.l || t.L)) {
					(h || m) && o >= 0 && r - h > o + 1 && await e.out(l ? "\x1B[36m--\x1B[0m\n" : "--\n");
					for (let t = Math.max(o + 1, r - h); t < r; t++) await e.out(b(n, t + 1, "-") + i[t] + "\n");
					if (t.o && !t.v) for (let t of c) for (let i of d.matchAll(t)) i[0] && await e.out(b(n, r + 1, ":") + v(i[0]) + "\n");
					else {
						let i = d;
						if (l && !t.v) for (let e of c) i = i.replace(e, (e) => e && v(e));
						await e.out(b(n, r + 1, ":") + i + "\n");
					}
					o = r, u = m;
				}
			}
		}
		return a;
	}, S = d.length ? d : ["-"];
	for (let r of S) {
		let i, a = r === "-" ? "(standard input)" : r;
		if (r === "-") i = await e.stdin.readAll();
		else {
			let a = e.resolve(r);
			if (!a) {
				t.s || await e.error(`${r}: file o cartella inesistente`), e.failed = !0;
				continue;
			}
			if (a.type === "folder") {
				t.s || await e.error(`${r}: è una cartella`);
				continue;
			}
			if (a.type !== "file") continue;
			i = await n.read(a.id);
		}
		let o = await x(a, i);
		if (t.q && _) return 0;
		t.c && await e.out((p ? `${a}:` : "") + o + "\n"), t.l && o && await e.out(a + "\n"), t.L && !o && await e.out(a + "\n");
	}
	return e.failed && !t.q ? 2 : +!_;
}
function yn(e, t, n) {
	if (!t) return e;
	let r = n == null ? e.trim().split(/\s+/) : e.split(n), i = t.end ?? r.length;
	return r.slice(t.start - 1, i).join(n ?? " ");
}
var bn = {
	K: 1e3,
	M: 1e6,
	G: 1e9,
	T: 0xe8d4a51000,
	k: 1e3
}, xn = (e) => {
	let t = /^\s*([+-]?\d*[.,]?\d+)/.exec(e);
	return t ? Number(t[1].replace(",", ".")) : 0;
};
async function Sn(e) {
	let { opts: t, args: r } = G(e, {
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
	}), i = [];
	for await (let { text: t } of e.inputs(r)) i.push(...Z(t).lines);
	let a = null;
	if (t.k) {
		let e = /^(\d+)(?:\.\d+)?[a-zA-Z]*(?:,(\d+)(?:\.\d+)?[a-zA-Z]*)?$/.exec(t.k);
		if (!e) throw new y(`chiave non valida: «${t.k}»`, 2);
		a = {
			start: Number(e[1]),
			end: e[2] ? Number(e[2]) : null
		}, /n/.test(t.k) && (t.n = !0), /r/.test(t.k) && (t.r = !0);
	}
	let o = (e) => {
		let n = yn(e, a, t.t);
		return t.b && (n = n.trim()), t.f && (n = n.toLowerCase()), n;
	}, s = (e, n) => {
		let r = o(e), i = o(n);
		if (t.n) return xn(r) - xn(i) || F(e, n);
		if (t.h) {
			let t = (e) => {
				let t = /^\s*([+-]?\d*\.?\d+)([KMGTk]?)/.exec(e);
				return t ? Number(t[1]) * (bn[t[2]] ?? 1) : 0;
			};
			return t(r) - t(i) || F(e, n);
		}
		return t.V ? r.localeCompare(i, void 0, { numeric: !0 }) : F(r, i) || (r < i ? -1 : +(r > i));
	};
	if (t.c) {
		for (let t = 1; t < i.length; t++) if (s(i[t - 1], i[t]) > 0) return await e.error(`-:${t + 1}: disordine: ${i[t]}`), 1;
		return 0;
	}
	i.sort(t.r ? (e, t) => s(t, e) : s), t.u && (i = i.filter((e, t) => t === 0 || s(i[t - 1], e) !== 0));
	let c = i.map((e) => e + "\n").join("");
	if (t.o) {
		let r = e.shell.fileFor(t.o).id;
		await n.write(r, c);
	} else await e.out(c);
	return e.failed ? 2 : 0;
}
async function Cn(e) {
	let { opts: t, args: r } = G(e, {
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
	}), [i, a] = r, o = [];
	for await (let { text: t } of e.inputs(i ? [i] : [])) o = Z(t).lines;
	let s = (e) => {
		let n = e;
		return t.f && (n = n.replace(RegExp(`^(\\s*\\S+){${K(t.f)}}`), "")), t.s && (n = n.slice(K(t.s))), t.i ? n.toLowerCase() : n;
	}, c = "";
	for (let e = 0; e < o.length;) {
		let n = e + 1;
		for (; n < o.length && s(o[n]) === s(o[e]);) n++;
		let r = n - e;
		(!t.d || r > 1) && (!t.u || r === 1) && (c += (t.c ? `${String(r).padStart(7)} ` : "") + o[e] + "\n"), e = n;
	}
	return a ? await n.write(e.shell.fileFor(a).id, c) : await e.out(c), +!!e.failed;
}
async function wn(e) {
	let { opts: t, args: r } = G(e, {
		flags: "ai",
		long: { append: "a" }
	}), i = r.map((t) => ({
		path: t,
		id: e.shell.fileFor(t).id
	})), a = "";
	for (let t; (t = await e.stdin.read()) != null;) a += t, await e.out(t);
	for (let e of i) {
		let r = t.a ? await n.read(e.id) : "";
		await n.write(e.id, r + a);
	}
}
function Tn(e) {
	let t = String(e).split(",").map((t) => {
		let n = /^(\d*)(-?)(\d*)$/.exec(t);
		if (!n || !n[1] && !n[3]) throw new y(`elenco non valido: «${e}»`, 2);
		let r = n[1] ? Number(n[1]) : 1;
		return [r, n[2] ? n[3] ? Number(n[3]) : Infinity : r];
	});
	return (e) => t.some(([t, n]) => e >= t && e <= n);
}
async function En(e) {
	let { opts: t, args: n } = G(e, {
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
	if (!t.f && !t.c && !t.b) throw new y("indicare un elenco di campi (-f) o di caratteri (-c)", 2);
	let r = t.d ?? "	";
	if (r.length !== 1) throw new y("il delimitatore deve essere un solo carattere", 2);
	let i = t.O ?? r, a = "";
	for await (let { text: o } of e.inputs(n)) for (let e of Z(o).lines) if (t.f) {
		if (!e.includes(r)) {
			t.s || (a += e + "\n");
			continue;
		}
		let n = Tn(t.f);
		a += e.split(r).filter((e, t) => n(t + 1)).join(i) + "\n";
	} else {
		let n = Tn(t.c ?? t.b);
		a += [...e].filter((e, t) => n(t + 1)).join("") + "\n";
	}
	return await e.out(a), +!!e.failed;
}
var Q = {
	upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	lower: "abcdefghijklmnopqrstuvwxyz",
	digit: "0123456789",
	space: " 	\n\r\f\v",
	blank: " 	",
	punct: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
};
Q.alpha = Q.upper + Q.lower, Q.alnum = Q.alpha + Q.digit, Q.xdigit = "0123456789ABCDEFabcdef";
function Dn(e) {
	let t = [], n = [];
	for (let t = 0; t < e.length; t++) {
		if (e[t] === "[" && e[t + 1] === ":") {
			let r = e.indexOf(":]", t + 2), i = Q[e.slice(t + 2, r)];
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
		if (r > i) throw new y(`intervallo al contrario: «${n[e].c}-${n[e + 2].c}»`);
		for (let e = r; e <= i; e++) t.push(String.fromCodePoint(e));
		e += 2;
	} else t.push(n[e].c);
	return t;
}
async function On(e) {
	let { opts: t, args: n } = G(e, {
		flags: "dscC",
		long: {
			delete: "d",
			"squeeze-repeats": "s",
			complement: "c"
		}
	});
	if (!n.length) throw new y("manca l’operando", 2);
	let r = Dn(n[0]), i = n[1] == null ? null : Dn(n[1]);
	if (!t.d && !t.s && !i) throw new y(`manca il secondo insieme dopo «${n[0]}»`, 2);
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
async function kn(e) {
	let t = "";
	for await (let { text: n } of e.inputs(e.args)) {
		let { lines: e } = Z(n);
		t += e.map((e) => [...e].reverse().join("") + "\n").join("");
	}
	return await e.out(t), +!!e.failed;
}
async function An(e) {
	let { opts: t, args: n } = G(e, { values: "bwsv" }), r = t.b === "a", i = t.w == null ? 6 : K(t.w), a = t.s ?? "	", o = t.v == null ? 1 : K(t.v), s = "";
	for await (let { text: t } of e.inputs(n)) for (let e of Z(t).lines) s += r || e.trim() ? `${String(o++).padStart(i)}${a}${e}\n` : `${" ".repeat(i)}${a}${e}\n`.replace(/^\s+\t\n$/, "\n");
	await e.out(s);
}
async function jn(e) {
	let { opts: t, args: n } = G(e, {
		flags: "w",
		values: "sf",
		long: {
			separator: "s",
			"equal-width": "w",
			format: "f"
		}
	}), r = n.map((e) => {
		if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(e)) throw new y(`argomento non valido: «${e}»`, 2);
		return Number(e);
	});
	if (!r.length || r.length > 3) throw new y("uso: seq [primo [passo]] ultimo", 2);
	let [i, a, o] = r.length === 1 ? [
		1,
		1,
		r[0]
	] : r.length === 2 ? [
		r[0],
		1,
		r[1]
	] : r;
	if (a === 0) throw new y("il passo non può essere 0", 2);
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
async function Mn(e) {
	let t = (e.args.length ? e.args.join(" ") : "y") + "\n", n = t.repeat(Math.max(1, Math.floor(4096 / t.length)));
	for (;;) await e.out(n), await e.tick();
}
function Nn(e) {
	let t = [], n = "", r = !1, i = null;
	for (let a = 0; a < e.length; a++) {
		let o = e[a];
		i ? o === i ? i = null : n += o : o === "\"" || o === "'" ? (i = o, r = !0) : o === "\\" && a + 1 < e.length ? (n += e[++a], r = !0) : /\s/.test(o) ? (r && t.push(n), n = "", r = !1) : (n += o, r = !0);
	}
	if (i) throw new y(`virgolette ${i === "\"" ? "doppie" : "singole"} non chiuse`);
	return r && t.push(n), t;
}
async function Pn(e) {
	let { opts: t, args: n } = G(e, {
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
	a = t[0] ? i.split("\0").filter((e, t, n) => e !== "" || t < n.length - 1) : t.d == null ? t.I != null || t.L != null ? i.split("\n").map((e) => e.trim()).filter(Boolean) : Nn(i) : i.split(t.d.replace(/\\n/, "\n").replace(/\\t/, "	")).filter((e, t, n) => e !== "" || t < n.length - 1), t.d != null && a.at(-1)?.endsWith("\n") && (a[a.length - 1] = a.at(-1).slice(0, -1));
	let o = [];
	if (t.I != null) for (let e of a) o.push(r.map((n) => n.replaceAll(t.I, e)));
	else {
		let e = t.n == null ? t.L == null ? Infinity : K(t.L) : K(t.n);
		if (e < 1) throw new y("il numero di argomenti deve essere almeno 1", 2);
		for (let n = 0; n < a.length; n += e === Infinity ? a.length : e) {
			let i = t.L == null ? a.slice(n, n + (e === Infinity ? a.length : e)) : a.slice(n, n + e).flatMap(Nn);
			o.push([...r, ...i]);
		}
		!a.length && !t.r && o.push([...r]);
	}
	let s = 0;
	for (let n of o) {
		(t.t || t.p) && await e.err(n.join(" ") + "\n");
		let r = await e.shell.invoke(n, {
			stdin: new H(),
			stdout: e.stdout,
			stderr: e.stderr
		});
		if (r === 127) return 127;
		r !== 0 && (s = 123);
	}
	return s;
}
var Fn = [
	{
		name: "head",
		usage: "head [-n righe] [-c byte] [file…]",
		summary: "Le prime righe (10 se non indicato).",
		run: hn,
		help: "-n N  le prime N righe (-n -N: tutte tranne le ultime N)\n-c N  i primi N caratteri\n-5 è come -n 5"
	},
	{
		name: "tail",
		usage: "tail [-n righe] [-c byte] [file…]",
		summary: "Le ultime righe (10 se non indicato).",
		run: gn,
		help: "-n N  le ultime N righe (-n +N: dalla riga N in poi)\n-c N  gli ultimi N caratteri"
	},
	{
		name: "wc",
		usage: "wc [-lwcmL] [file…]",
		summary: "Conta righe, parole e byte.",
		run: _n,
		help: "-l righe, -w parole, -c byte, -m caratteri, -L la riga più lunga"
	},
	{
		name: "grep",
		usage: "grep [-ivnclrwxEFoqH] [-e modello] modello [file…]",
		summary: "Cerca le righe che contengono un modello (espressione regolare).",
		run: vn,
		help: "-i  senza distinguere maiuscole e minuscole\n-v  le righe che NON corrispondono\n-n  con il numero di riga\n-c  conta le righe\n-l  solo i nomi dei file\n-r  cerca nelle cartelle\n-w  parole intere, -x righe intere\n-E  espressioni regolari estese (| + ? () senza barra)\n-F  testo semplice, non espressione regolare\n-o  solo la parte che corrisponde\n-q  nessun risultato, solo lo stato\n-A N, -B N, -C N  righe di contesto dopo, prima, intorno\nStato: 0 trovato, 1 non trovato, 2 errore."
	},
	{
		name: "sort",
		usage: "sort [-rnufhV] [-k campo] [-t separatore] [file…]",
		summary: "Ordina le righe.",
		run: Sn,
		help: "-r  al contrario\n-n  per numero\n-h  per dimensione leggibile (2K, 1M)\n-u  senza doppioni\n-f  senza distinguere maiuscole e minuscole\n-k N[,M]  per il campo N (fino a M)\n-t C  campi separati da C\n-V  numeri dentro il testo (file2 prima di file10)\n-o file  scrive nel file"
	},
	{
		name: "uniq",
		usage: "uniq [-cdui] [input [output]]",
		summary: "Toglie le righe ripetute una dopo l’altra (di solito dopo sort).",
		run: Cn,
		help: "-c  con il numero di ripetizioni\n-d  solo le righe ripetute\n-u  solo quelle uniche\n-i  senza distinguere maiuscole e minuscole"
	},
	{
		name: "tee",
		usage: "tee [-a] [file…]",
		summary: "Copia l’input sia sull’output sia nei file.",
		run: wn,
		help: "-a  aggiunge in fondo invece di sovrascrivere"
	},
	{
		name: "cut",
		usage: "cut -f campi [-d separatore] | -c caratteri [file…]",
		summary: "Estrae colonne da ogni riga.",
		run: En,
		help: "-f 1,3  i campi 1 e 3 (separati da tab o da -d)\n-d ,  il separatore\n-c 1-5  i caratteri da 1 a 5\n-s  solo le righe con il separatore"
	},
	{
		name: "tr",
		usage: "tr [-dsc] insieme1 [insieme2]",
		summary: "Sostituisce o elimina caratteri.",
		run: On,
		help: "tr a-z A-Z  in maiuscolo\ntr -d '\\r'  elimina i ritorni a capo di Windows\ntr -s ' '  un solo spazio di fila\nClassi: [:upper:] [:lower:] [:digit:] [:alpha:] [:alnum:] [:space:] [:punct:]"
	},
	{
		name: "rev",
		usage: "rev [file…]",
		summary: "Scrive ogni riga al contrario.",
		run: kn
	},
	{
		name: "nl",
		usage: "nl [-b a] [file…]",
		summary: "Numera le righe (non vuote, o tutte con -b a).",
		run: An
	},
	{
		name: "seq",
		usage: "seq [primo [passo]] ultimo",
		summary: "Scrive una sequenza di numeri.",
		run: jn,
		help: "-s S  separatore (a capo se non indicato)\n-w  stessa larghezza, con zeri davanti"
	},
	{
		name: "yes",
		usage: "yes [testo]",
		summary: "Ripete una riga all’infinito (y se non indicata): utile in una pipe.",
		run: Mn
	},
	{
		name: "xargs",
		usage: "xargs [-n N] [-I {}] [-0] [-t] [comando [argomenti…]]",
		summary: "Avvia un comando con le parole dell’input come argomenti.",
		run: Pn,
		help: "-n N  al massimo N argomenti per volta\n-I {}  un comando per riga, con {} sostituito dalla riga\n-0  parole separate dal carattere nullo (find -print0)\n-d C  parole separate da C\n-t  mostra i comandi prima di avviarli\n-r  non avvia niente se l’input è vuoto\nEsempio: find . -name \"*.tmp\" | xargs rm"
	}
];
// src/terminal/commands/sed.js
function In(e, t) {
	let n = [], r = [], i = 0, a = () => e[i], o = () => {
		for (; i < e.length && /[ \t]/.test(e[i]);) i++;
	}, s = (e) => {
		throw new y(`-e espressione #1, carattere ${i}: ${e}`);
	}, c = (t, n) => {
		let r = "";
		for (;;) {
			i >= e.length && s("comando «s» non terminato");
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
				n || s("indirizzo non valido"), i += n[0].length, t.a2 = { plus: Number(n[0]) };
			} else t.a2 = u(), t.a2 || s("manca il secondo indirizzo");
		}
		for (o(); a() === "!";) t.neg = !t.neg, i++, o();
		let l = e[i++];
		switch (l ?? s("manca il comando"), t.type = l, l) {
			case "{":
				r.push(n.length);
				break;
			case "}":
				r.length || s("«}» inatteso"), n[r.pop()].end = n.length;
				break;
			case "s": {
				let n = e[i++];
				n && n !== "\n" && n !== "\\" || s("delimitatore non valido per «s»"), t.re = c(n, !0), t.rep = c(n, !1);
				let r = /^[gGiIpPe0-9mM]*/.exec(e.slice(i));
				i += r[0].length, t.global = /g/i.test(r[0]), t.print = /p/i.test(r[0]), t.ignoreCase = /i/i.test(r[0]), t.nth = Number(/\d+/.exec(r[0])?.[0] ?? 1);
				break;
			}
			case "y": {
				let n = e[i++], r = [...c(n, !1)], a = [...c(n, !1)];
				r.length !== a.length && s("le stringhe di «y» hanno lunghezze diverse"), t.map = new Map(r.map((e, t) => [e, a[t]]));
				break;
			}
			case "a":
			case "i":
			case "c":
				t.text = f();
				break;
			case ":":
				t.label = d(), t.label || s("«:» senza etichetta");
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
			default: s(`comando sconosciuto: «${l}»`);
		}
		n.push(t);
	}
	r.length && s("manca «}»");
	let p = new Map(n.map((e, t) => [e, t]).filter(([e]) => e.type === ":").map(([e, t]) => [e.label, t]));
	for (let e of n) {
		if ((e.type === "b" || e.type === "t" || e.type === "T") && e.label && !p.has(e.label)) throw new y(`etichetta inesistente per un salto: «${e.label}»`);
		for (let n of [e.a1, e.a2]) n?.re != null && (n.compiled = n.re === "" ? null : fn(n.re, {
			extended: t,
			ignoreCase: n.ignoreCase
		}));
		e.type === "s" && (e.compiled = e.re === "" ? null : fn(e.re, {
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
function Ln(e, t) {
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
async function Rn(e, t, r, { quiet: i, write: a }) {
	let { cmds: o, labels: s } = t, c = "", l = null, u = 0, d = 0, f = !1;
	for (let e of o) e.active = !1;
	let p = () => u >= r.length, m = (e, t, n) => {
		if (e.line != null) return n === e.line;
		if (e.last) return p();
		if (e.step) return e.step[1] > 0 ? n >= e.step[0] && (n - e.step[0]) % e.step[1] === 0 : n === e.step[0];
		let r = e.compiled ?? l;
		if (!r) throw new y("nessuna espressione regolare precedente");
		return l = r, r.test(t);
	}, h = (e, t, n) => {
		let r;
		return e.a1 ? e.a2 ? e.active ? (r = !0, (e.a2.line == null ? e.a2.plus == null ? m(e.a2, t, n) : n >= e.end2 : n >= e.a2.line) && (e.active = !1)) : m(e.a1, t, n) ? (r = !0, e.active = !0, e.a2.line != null && e.a2.line <= n && (e.active = !1), e.a2.plus != null && (e.end2 = n + e.a2.plus, e.a2.plus === 0 && (e.active = !1))) : r = !1 : r = m(e.a1, t, n) : r = !0, e.neg ? !r : r;
	}, g = 0;
	for (; !f && u < r.length;) {
		let t = r[u++];
		g++;
		let m = "", _ = !1, v = !i, b = !1;
		await e.tick();
		cycle: for (;;) {
			for (let x = 0; x < o.length; x++) {
				let S = o[x];
				if (S.type !== "}" && S.type !== ":") {
					if (!h(S, t, g)) S.type === "{" && (x = S.end);
					else switch (S.type) {
						case "{": break;
						case "s": {
							let n = S.compiled ?? l;
							if (!n) throw new y("nessuna espressione regolare precedente");
							l = n;
							let r = 0, i = !1, a = t.replace(new RegExp(n.source, n.flags.includes("g") ? n.flags : n.flags + "g"), (...e) => {
								let t = typeof e.at(-1) == "object" && e.at(-1) !== null, n = e.slice(0, t ? -3 : -2);
								return r++, r < S.nth || i && !S.global ? n[0] : (i = !0, Ln(S.rep, n));
							});
							i && (t = a, _ = !0, S.print && await e.out(t + "\n"));
							break;
						}
						case "y":
							t = [...t].map((e) => S.map.get(e) ?? e).join("");
							break;
						case "d":
							v = !1;
							break cycle;
						case "D":
							if (!t.includes("\n")) {
								v = !1;
								break cycle;
							}
							t = t.slice(t.indexOf("\n") + 1), b = !0, v = !1;
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
							m += S.text + "\n";
							break;
						case "i":
							await e.out(S.text + "\n");
							break;
						case "c":
							S.a2 && S.active || await e.out(S.text + "\n"), v = !1;
							break cycle;
						case "q":
							f = !0, d = S.code;
							break cycle;
						case "Q":
							f = !0, d = S.code, v = !1;
							break cycle;
						case "n":
							if (i || await e.out(t + "\n"), m &&= (await e.out(m), ""), p()) {
								v = !1, f = !0;
								break cycle;
							}
							t = r[u++], g++;
							break;
						case "N":
							if (p()) {
								f = !0;
								break cycle;
							}
							t += "\n" + r[u++], g++;
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
							if (!S.label) break cycle;
							x = s.get(S.label);
							break;
						case "t":
						case "T":
							if (_ === (S.type === "t")) {
								if (_ = !1, !S.label) break cycle;
								x = s.get(S.label);
							}
							break;
						case "r": {
							let t = e.resolve(S.file);
							t?.type === "file" && (m += await n.read(t.id));
							break;
						}
						case "w": a(S.file, t + "\n");
					}
				}
			}
			break;
		}
		v && await e.out(t + "\n"), m && await e.out(m), b && !f && (r.splice(u, 0, t), g--);
	}
	return d;
}
async function zn(e) {
	let { opts: t, args: r } = G(e, {
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
	}), i = [...r], a = [...t.e ?? []];
	for (let r of t.f ?? []) {
		let t = e.resolve(r);
		if (t?.type !== "file") throw new y(`impossibile leggere ${r}: file o cartella inesistente`);
		a.push(await n.read(t.id));
	}
	if (!a.length) {
		if (!i.length) throw new y("manca lo script\nUso: sed [-n] [-E] [-i] script [file…]", 1);
		a.push(i.shift());
	}
	let o = In(a.join("\n"), t.E || t.r), s = /* @__PURE__ */ new Map(), c = (e, t) => s.set(e, (s.get(e) ?? "") + t), l = 0;
	if (t.i || t.I != null) {
		if (!i.length) throw new y("nessun file da modificare con -i");
		for (let r of i) {
			let i = e.resolve(r);
			if (i?.type !== "file") {
				await e.error(`impossibile leggere ${r}: file o cartella inesistente`), l = 2;
				continue;
			}
			let { lines: a, ended: s } = Bn(await n.read(i.id)), u = "";
			l = await Rn({
				...e,
				out: (e) => {
					u += e;
				},
				tick: () => e.tick(),
				resolve: (t) => e.resolve(t)
			}, o, a, {
				quiet: t.n,
				write: c
			}) || l, await n.write(i.id, s || !u.endsWith("\n") ? u : u.slice(0, -1));
		}
	} else {
		let n = i.length ? i : ["-"], r = [], a = !0;
		for await (let { text: t } of e.inputs(n)) {
			let e = Bn(t);
			r.push(...e.lines), a = e.ended;
		}
		let s = "";
		l = await Rn({
			...e,
			out: (e) => {
				s += e;
			},
			tick: () => e.tick(),
			resolve: (t) => e.resolve(t)
		}, o, r, {
			quiet: t.n,
			write: c
		}), await e.out(a || !s.endsWith("\n") ? s : s.slice(0, -1)), e.failed && (l = 2);
	}
	for (let [t, r] of s) await n.write(e.shell.fileFor(t).id, r);
	return l;
}
function Bn(e) {
	let t = e.split("\n"), n = e.endsWith("\n") || e === "";
	return n && t.pop(), {
		lines: t,
		ended: n
	};
}
var Vn = [{
	name: "sed",
	usage: "sed [-nEi] [-e script] [script] [file…]",
	summary: "Modifica il testo riga per riga (sostituzioni, cancellazioni…).",
	run: zn,
	help: "s/vecchio/nuovo/g  sostituisce (g: tutte le volte, i: senza maiuscole, p: stampa)\n3d, /re/d, 2,5d  elimina righe     -n …p  stampa solo quelle scelte\ny/abc/xyz/  traslittera     a testo, i testo, c testo  aggiunge, inserisce, cambia\n=  numero di riga   q  esce   h H g G x  spazio di riserva   b t :etichetta  salti\nIndirizzi: n, $, /re/, a,b, a,+n, ! per negare, { … } per raggruppare.\n-n  non stampa le righe da sola    -E  espressioni regolari estese    -i  modifica i file\nEsempi: sed 's/rosso/blu/g' note.txt    sed -n '1,5p' file    sed -i '/^#/d' conf.txt"
}];
// src/terminal/commands/diff.js
function Hn(e, t, n = (e, t) => e === t) {
	let r = 0, i = 0;
	for (; r < e.length && r < t.length && n(e[r], t[r]);) r++;
	for (; i < e.length - r && i < t.length - r && n(e[e.length - 1 - i], t[t.length - 1 - i]);) i++;
	let a = Wn(e.slice(r, e.length - i), t.slice(r, t.length - i), n);
	for (let e of a) e.a += r, e.b += r;
	return a;
}
var Un = 4e7;
function Wn(e, t, n) {
	let r = e.length, i = t.length, a = r + i, o = new Int32Array(2 * a + 2), s = [], c = !1;
	for (let l = 0; l <= a && !c; l++) {
		if ((l + 1) * o.length > Un) throw new y("i file sono troppo diversi e troppo grandi da confrontare", 2);
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
var Gn = (e, t) => t <= 1 ? String(e + +!!t) : `${e + 1},${e + t}`, Kn = (e, t) => t === 1 ? String(e + 1) : `${t ? e + 1 : e},${t}`;
function qn(e, t, n) {
	let r = "";
	for (let i of n) {
		let n = i.del && i.ins ? "c" : i.del ? "d" : "a";
		r += `${n === "a" ? String(i.a) : Gn(i.a, i.del)}${n}${n === "d" ? String(i.b) : Gn(i.b, i.ins)}\n`;
		for (let t = 0; t < i.del; t++) r += `< ${e[i.a + t]}\n`;
		n === "c" && (r += "---\n");
		for (let e = 0; e < i.ins; e++) r += `> ${t[i.b + e]}\n`;
	}
	return r;
}
function Jn(e, t, n, r) {
	let i = "", a = [];
	for (let e of n) {
		let t = a.at(-1);
		t && e.a - (t.at(-1).a + t.at(-1).del) <= 2 * r ? t.push(e) : a.push([e]);
	}
	for (let n of a) {
		let a = n[0], o = n.at(-1), s = Math.max(0, a.a - r), c = Math.max(0, a.b - r), l = Math.min(e.length, o.a + o.del + r), u = Math.min(t.length, o.b + o.ins + r);
		i += `@@ -${Kn(s, l - s)} +${Kn(c, u - c)} @@\n`;
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
var Yn = (e) => {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}:${n(t.getSeconds())}`;
};
async function Xn(e) {
	let { opts: t, args: r } = G(e, {
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
	if (r.length !== 2) throw new y(r.length < 2 ? `manca un operando dopo «${r[0] ?? "diff"}»` : `operando in più: «${r[2]}»`, 2);
	let i = async (t) => {
		if (t === "-") return {
			text: await e.stdin.readAll(),
			time: Date.now()
		};
		let r = e.resolve(t);
		if (!r) throw new y(`${t}: file o cartella inesistente`, 2);
		if (r.type !== "file") throw new y(`${t}: ${r.type === "folder" ? "è una cartella" : "non è un file"}`, 2);
		return {
			text: await n.read(r.id),
			time: r.modified
		};
	}, [a, o] = [await i(r[0]), await i(r[1])], s = (e) => {
		let t = e.split("\n");
		return (e.endsWith("\n") || e === "") && t.pop(), t;
	}, c = s(a.text), l = s(o.text), u = (e) => (t.i && (e = e.toLowerCase()), t.w ? e = e.replace(/\s+/g, "") : t.b && (e = e.replace(/\s+/g, " ").trimEnd()), e), d = Hn(c, l, (e, t) => u(e) === u(t));
	if (t.B && (d = d.filter((e) => !(c.slice(e.a, e.a + e.del).every((e) => !e.trim()) && l.slice(e.b, e.b + e.ins).every((e) => !e.trim())))), !d.length) return t.s && await e.out(`I file ${r[0]} e ${r[1]} sono identici\n`), 0;
	if (t.q) return await e.out(`I file ${r[0]} e ${r[1]} sono diversi\n`), 1;
	if (t.u || t.U != null) {
		let n = t.U == null ? 3 : K(t.U);
		await e.out(`--- ${r[0]}\t${Yn(a.time)}\n+++ ${r[1]}\t${Yn(o.time)}\n` + Jn(c, l, d, n));
	} else await e.out(qn(c, l, d));
	return 1;
}
var Zn = [{
	name: "diff",
	usage: "diff [-uqiwB] file1 file2",
	summary: "Mostra le differenze tra due file.",
	run: Xn,
	help: "-u  formato unificato (con 3 righe di contesto; -U N per N)\n-q  dice solo se sono diversi\n-i  senza distinguere maiuscole e minuscole\n-w  ignorando gli spazi, -b ignorando quanti sono\n-B  ignorando le righe vuote\n-s  dice anche quando sono identici\n«-» è l’input. Stato: 0 uguali, 1 diversi, 2 errore."
}], Qn = (e) => e.stdout === e.shell.host.stdout, $n = (e) => {
	let t = String(e).toLowerCase();
	return c().find((e) => e.id.toLowerCase() === t) ?? c().find((e) => e.name.toLowerCase() === t) ?? null;
};
async function er(e) {
	let { opts: t, args: n } = G(e, {
		values: "a",
		long: { app: "a" }
	});
	if (t.a != null) {
		let r = $n(t.a);
		if (!r) throw new y(`app non trovata: «${t.a}» (vedi «apps»)`);
		if (!n.length) return l(r.id), 0;
		for (let t of n) {
			let n = e.resolve(t);
			if (!n) throw new y(`${t}: file o cartella inesistente`);
			l(r.id, n.type === "folder" ? { folder: n.id } : { file: n.id });
		}
		return 0;
	}
	if (!n.length) throw new y(`uso: ${e.cmd.usage}`, 2);
	let r = 0;
	for (let t of n) {
		let n = e.resolve(t);
		n ? n.type === "folder" ? l("files", { folder: n.id }) : n.type === "app" ? l(n.app) : u(n) : (await e.error(`${t}: file o cartella inesistente`), r = 1);
	}
	return r;
}
var tr = (e) => new Date(e).toLocaleString("it-IT", {
	day: "2-digit",
	month: "short",
	hour: "2-digit",
	minute: "2-digit"
});
function nr(e, t) {
	let r = n.trashed();
	return t.map((e) => {
		let t = r.find((t) => t.id === e) ?? r.find((t) => t.name === e) ?? r.find((t) => t.name.toLowerCase() === e.toLowerCase());
		if (!t) throw new y(`«${e}» non è nel cestino`);
		return t;
	});
}
async function rr(e) {
	let [t = "list", ...r] = e.args;
	switch (t) {
		case "list":
		case "ls": {
			let t = n.trashed();
			if (!t.length) return await e.out("Il cestino è vuoto.\n"), 0;
			for (let r of t) {
				let t = n.exists(r.trashed.from) ? n.path(r.trashed.from) : "(cartella eliminata)", i = r.type === "folder" ? `${r.inside} elementi` : Pt(r.bytes);
				await e.out(`${tr(r.trashed.at)}  ${i.padStart(10)}  ${r.name}${r.type === "folder" ? "/" : ""}  ← ${t}\n`);
			}
			return 0;
		}
		case "put": {
			if (!r.length) throw new y("manca cosa mettere nel cestino", 2);
			let t = 0;
			for (let i of r) {
				let r = e.resolve(i);
				r ? n.trash([r.id]).length || (await e.error(`${i}: non si può cestinare (cartella di sistema)`), t = 1) : (await e.error(`${i}: file o cartella inesistente`), t = 1);
			}
			return t;
		}
		case "restore":
			if (!r.length) throw new y("manca il nome di ciò che va rimesso a posto", 2);
			for (let { id: t, parent: i } of n.untrash(nr(e, r).map((e) => e.id))) await e.out(`rimesso in ${n.path(t)}${n.root, ""}\n`);
			return 0;
		case "rm": {
			if (!r.length) throw new y("manca il nome", 2);
			let t = n.purge(nr(e, r).map((e) => e.id));
			return await e.out(`${t === 1 ? "eliminato definitivamente 1 elemento" : `eliminati definitivamente ${t} elementi`}\n`), 0;
		}
		case "empty": {
			let t = n.purgeTrash();
			return await e.out(t ? `Cestino svuotato (${t} ${t === 1 ? "elemento" : "elementi"}).\n` : "Il cestino era già vuoto.\n"), 0;
		}
	}
	throw new y(`sottocomando sconosciuto: «${t}»\nUso: ${e.cmd.usage}`, 2);
}
function ir(e, t = !1) {
	let n = o.byName(e) ?? o.get(e);
	if (n) return n;
	if (t) return o.create({ name: e });
	throw new y(`tag inesistente: «${e}» (vedi «tag ls»)`);
}
async function ar(t) {
	let [r = "ls", ...i] = t.args, a = (e) => Qn(t) ? `\x1b[38;2;${parseInt(e.slice(1, 3), 16)};${parseInt(e.slice(3, 5), 16)};${parseInt(e.slice(5, 7), 16)}m●\x1b[0m ` : "";
	switch (r) {
		case "ls":
		case "list": {
			if (i.length) {
				for (let e of i) {
					let r = ir(e);
					for (let e of n.tagged(r.id).sort((e, t) => F(n.path(e.id), n.path(t.id)))) await t.out(n.path(e.id) + (e.type === "folder" ? "/" : "") + "\n");
				}
				return 0;
			}
			let e = o.list();
			if (!e.length) return await t.out("Nessun tag. Creane uno con «tag new nome».\n"), 0;
			for (let r of e) await t.out(`${a(r.color)}${r.name}  (${n.tagged(r.id).length})${r.visible ? "" : "  nascosto"}\n`);
			return 0;
		}
		case "show": {
			let e = 0;
			for (let n of i.length ? i : ["."]) {
				let r = t.resolve(n);
				if (!r) {
					await t.error(`${n}: file o cartella inesistente`), e = 1;
					continue;
				}
				let i = (r.tags ?? []).map((e) => o.get(e)).filter(Boolean).map((e) => a(e.color) + e.name);
				await t.out(`${n}: ${i.length ? i.join(", ") : "nessun tag"}\n`);
			}
			return e;
		}
		case "add":
		case "rm": {
			let [e, ...a] = i;
			if (!e || !a.length) throw new y(`uso: tag ${r} nome file…`, 2);
			let s = r === "add" && !o.byName(e), c = ir(e, r === "add");
			s && await t.out(`creato il tag «${c.name}»\n`);
			let l = 0;
			for (let e of a) {
				let i = t.resolve(e);
				if (!i) {
					await t.error(`${e}: file o cartella inesistente`), l = 1;
					continue;
				}
				if (i.system) {
					await t.error(`${e}: gli elementi di sistema non hanno tag`), l = 1;
					continue;
				}
				let a = i.tags ?? [];
				n.setTags(i.id, r === "add" ? [...a, c.id] : a.filter((e) => e !== c.id));
			}
			return l;
		}
		case "new": {
			let [n, r] = i;
			if (!n) throw new y("uso: tag new nome [colore]", 2);
			let s = r ? e.find((e) => e.label.toLowerCase() === r.toLowerCase())?.value ?? r : void 0, c = o.create({
				name: n,
				color: s
			});
			return await t.out(`creato il tag ${a(c.color)}${c.name}\n`), 0;
		}
		case "delete":
			if (!i.length) throw new y("uso: tag delete nome…", 2);
			for (let e of i) o.remove(ir(e).id);
			return 0;
	}
	throw new y(`sottocomando sconosciuto: «${r}»\nUso: ${t.cmd.usage}`, 2);
}
async function or(e) {
	let t = [...c()].sort((e, t) => F(e.name, t.name)), n = Math.max(...t.map((e) => e.id.length));
	for (let r of t) {
		let t = r.package?.manifest?.version ?? "";
		await e.out(`${r.id.padEnd(n)}  ${r.name}${t ? `  ${t}` : ""}\n`);
	}
}
var sr = [
	"domenica",
	"lunedì",
	"martedì",
	"mercoledì",
	"giovedì",
	"venerdì",
	"sabato"
], cr = [
	"gennaio",
	"febbraio",
	"marzo",
	"aprile",
	"maggio",
	"giugno",
	"luglio",
	"agosto",
	"settembre",
	"ottobre",
	"novembre",
	"dicembre"
];
function lr(e, t, n = !1) {
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
		A: () => sr[r("Day")],
		a: () => sr[r("Day")].slice(0, 3),
		B: () => cr[r("Month")],
		b: () => cr[r("Month")].slice(0, 3),
		h: () => cr[r("Month")].slice(0, 3),
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
		c: () => `${s.a()} ${s.e()} ${s.b()} ${s.Y()}, ${s.T()}`,
		x: () => `${s.d()}/${s.m()}/${s.Y()}`,
		X: () => s.T(),
		n: () => "\n",
		t: () => "	",
		"%": () => "%"
	};
	return e.replace(/%([a-zA-Z%])/g, (e, t) => s[t] ? String(s[t]()) : e);
}
async function ur(e) {
	let { opts: t, args: n } = G(e, {
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
		if (r = /^@\d+$/.test(e) ? /* @__PURE__ */ new Date(Number(e.slice(1)) * 1e3) : e === "now" ? /* @__PURE__ */ new Date() : e === "yesterday" || e === "ieri" ? /* @__PURE__ */ new Date(Date.now() - 864e5) : e === "tomorrow" || e === "domani" ? new Date(Date.now() + 864e5) : new Date(e), Number.isNaN(r.getTime())) throw new y(`data non valida: «${t.d}»`);
	}
	let i = n.find((e) => e.startsWith("+"));
	if (i) return e.out(lr(i.slice(1), r, t.u) + "\n");
	if (t.I != null) return e.out(lr(t.I === "seconds" ? "%Y-%m-%dT%H:%M:%S%z" : "%F", r, t.u) + "\n");
	if (t.R) return e.out(r.toUTCString() + "\n");
	await e.out(lr("%a %e %b %Y, %H:%M:%S %Z", r, t.u) + "\n");
}
var dr = [
	{
		name: "open",
		usage: "open [-a app] percorso…",
		summary: "Apre file e cartelle con la loro app (o con quella indicata).",
		run: er,
		help: "open note.txt   apre con l’app predefinita\nopen .   apre la cartella nel File Manager\nopen -a editor note.txt   con un’app precisa\nopen -a photo   avvia un’app"
	},
	{
		name: "trash",
		usage: "trash [list | put percorso… | restore nome… | rm nome… | empty]",
		summary: "Il cestino: elenca, rimette a posto, svuota.",
		run: rr,
		help: "trash              elenca ciò che è nel cestino\ntrash put file     sposta nel cestino (come rm -r)\ntrash restore nome rimette a posto\ntrash rm nome      elimina definitivamente\ntrash empty        svuota il cestino"
	},
	{
		name: "tag",
		usage: "tag [ls [tag…] | show percorso… | add tag percorso… | rm tag percorso… | new nome [colore] | delete tag…]",
		summary: "I tag di lilOS: elenca, assegna, toglie.",
		run: ar,
		help: "tag                elenca i tag\ntag ls Lavoro      gli elementi con il tag\ntag show file      i tag di un elemento\ntag add Lavoro f   mette il tag (lo crea se non c’è)\ntag rm Lavoro f    lo toglie\ntag new nome blu   crea un tag\ntag delete nome    elimina un tag"
	},
	{
		name: "apps",
		usage: "apps",
		summary: "Elenca le app installate (id, nome, versione).",
		run: or
	},
	{
		name: "date",
		usage: "date [-u] [-d data] [+formato]",
		summary: "Data e ora.",
		run: ur,
		help: "Formato: %Y anno, %m mese, %d giorno, %H:%M:%S ora, %A giorno della settimana, %B mese, %s secondi dal 1970, %F = %Y-%m-%d, %T = %H:%M:%S\n-d @1700000000, -d 2026-01-01, -d ieri\nEsempio: date +%F"
	},
	{
		name: "whoami",
		usage: "whoami",
		summary: "Il nome dell’utente.",
		run: (e) => e.out((i.user?.username || e.shell.getVar("USER") || "utente") + "\n")
	},
	{
		name: "hostname",
		usage: "hostname",
		summary: "Il nome del sistema.",
		run: (e) => e.out((e.shell.getVar("HOSTNAME") ?? "lilos") + "\n")
	},
	{
		name: "uname",
		usage: "uname [-a]",
		summary: "Il nome del sistema operativo.",
		run: (e) => e.out(e.args.includes("-a") ? `lilOS lilos ${e.shell.getVar("BASH_VERSION")} ${navigator.platform || ""}\n`.replace(/ \n$/, "\n") : "lilOS\n")
	}
], fr = /^[a-z][\w.-]{0,39}$/, $ = /* @__PURE__ */ new Map();
for (let e of Tt) $.set(e.name, {
	...e,
	builtin: !0
});
for (let e of [
	...cn,
	...Fn,
	...Vn,
	...Zn,
	...dr
]) $.set(e.name, e);
function pr() {
	let e = /* @__PURE__ */ new Map();
	for (let t of c()) {
		let n = t.package?.manifest?.contributes?.shell;
		if (Array.isArray(n)) for (let r of n.slice(0, 50)) r && fr.test(r.name ?? "") && typeof r.entry == "string" && !$.has(r.name) && !e.has(r.name) && e.set(r.name, {
			name: r.name,
			app: t.name,
			summary: typeof r.summary == "string" ? r.summary.slice(0, 120) : `Comando dell’app ${t.name}.`,
			usage: typeof r.usage == "string" ? r.usage.slice(0, 200) : `${r.name} [argomenti…]`,
			ownHelp: r.help === !0,
			run: (e) => mr(e, t.id, r.entry)
		});
	}
	return e;
}
async function mr(e, t, r) {
	let i = e.shell, a = e.stdin === i.host.stdin ? null : await e.stdin.readAll(), o;
	try {
		o = await s(t, r, {
			command: e.name,
			args: e.args,
			stdin: a,
			cwd: n.path(e.cwd),
			env: i.environment()
		}, { from: "terminal" });
	} catch (e) {
		throw new y(e?.message ?? String(e));
	}
	return o == null ? 0 : typeof o == "string" ? (await e.out(o), 0) : (typeof o.stdout == "string" && await e.out(o.stdout), typeof o.stderr == "string" && await e.err(o.stderr), Number.isInteger(o.code) ? (o.code % 256 + 256) % 256 : 0);
}
var hr = {
	get: (e) => $.get(e) ?? pr().get(e) ?? null,
	has: (e) => $.has(e) || pr().has(e),
	names: () => [...$.keys(), ...pr().keys()],
	values: () => [...$.values(), ...pr().values()]
}, gr = /\x1b\[([0-9;?]*)([A-Za-z])|\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)|\x1b[()][0-9A-Za-z]|\x1b./g, _r = [
	0,
	95,
	135,
	175,
	215,
	255
];
function vr(e) {
	if (e < 16) return { cls: e };
	if (e >= 232) {
		let t = 8 + (e - 232) * 10;
		return { css: `rgb(${t},${t},${t})` };
	}
	let t = e - 16;
	return { css: `rgb(${_r[Math.floor(t / 36)]},${_r[Math.floor(t / 6) % 6]},${_r[t % 6]})` };
}
var yr = class {
	style = {};
	write(e, t, n = null, r = () => {}) {
		let i = 0;
		gr.lastIndex = 0;
		for (let a; a = gr.exec(e);) this.#e(e.slice(i, a.index), t, n), i = gr.lastIndex, a[2] === "m" ? this.#t(a[1]) : a[2] === "J" && (a[1] === "2" || a[1] === "3") && r();
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
				if (t[e + 1] === 5) n[i] = vr(t[e + 2] ?? 0), e += 2;
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
}, br = /[\s'"\\$`|&;<>()*?[\]{}!#]/g, xr = (e) => e.replace(br, "\\$&");
function Sr(e, t, r) {
	let i = t.slice(0, r), a = r;
	for (; a > 0 && !(/[\s|&;<>()]/.test(i[a - 1]) && i[a - 2] !== "\\");) a--;
	let o = i.slice(a).replace(/\\(.)/g, "$1").replace(/^['"]/, ""), s = i.slice(0, a).trimEnd(), c = !s || /(^|[|&;(]|\$\(|\b(then|do|else|elif|if|while|until|sudo|xargs|time|command|which|type|help))$/.test(s), l = /\$\{?([A-Za-z_]\w*)?$/.exec(o);
	if (l) {
		let t = l[1] ?? "", n = o.slice(0, o.length - t.length), i = e.variables().map(([e]) => e).filter((e) => e.startsWith(t)).map((e) => ({
			value: n + e + (n.endsWith("{") ? "}" : ""),
			label: e
		}));
		return {
			start: a,
			end: r,
			items: i
		};
	}
	if (c && !o.includes("/")) {
		let t = [.../* @__PURE__ */ new Set([
			...e.commands.names(),
			...e.functions.keys(),
			...e.aliases.keys()
		])].filter((e) => e.startsWith(o)).sort(F).map((e) => ({
			value: xr(e),
			label: e
		}));
		if (t.length || !o) return {
			start: a,
			end: r,
			items: t
		};
	}
	let u = o.lastIndexOf("/"), d = u >= 0 ? o.slice(0, u + 1) : "", f = u >= 0 ? o.slice(u + 1) : o, p = d || ".";
	(p === "~/" || p.startsWith("~/")) && (p = (e.getVar("HOME") ?? n.home) + p.slice(1));
	let m = P(e.cwd, p);
	if (m?.type !== "folder") return {
		start: a,
		end: r,
		items: []
	};
	let h = f.toLowerCase(), g = n.children(m.id).filter((e) => e.name.toLowerCase().startsWith(h) && (f.startsWith(".") || !e.name.startsWith("."))).sort((e, t) => F(e.name, t.name)).map((e) => ({
		value: xr(d) + xr(e.name) + (e.type === "folder" ? "/" : ""),
		label: e.name + (e.type === "folder" ? "/" : ""),
		folder: e.type === "folder"
	}));
	return {
		start: a,
		end: r,
		items: g
	};
}
function Cr(e) {
	if (!e.length) return "";
	let t = e[0];
	for (let n of e.slice(1)) {
		let e = 0;
		for (; e < t.length && e < n.length && t[e].toLowerCase() === n[e].toLowerCase();) e++;
		t = t.slice(0, e);
	}
	return t;
}
// src/terminal/TerminalApp.js
var wr = "terminal.history", Tr = 4e5, Er = ".bashrc";
function Dr({ args: e } = {}) {
	let r = new t({
		title: "Terminale",
		icon: "terminal",
		width: 760,
		height: 460,
		minWidth: 360,
		minHeight: 200
	}), i = new kr(r, e);
	return r.getState = () => ({ cwd: i.shell.cwd }), r.on("launch", (e) => {
		e?.cwd && n.get(e.cwd)?.type === "folder" && i.changeDir(e.cwd);
	}), r;
}
var Or = class extends V {
	silent = !1;
	constructor(e) {
		super(), this.term = e;
	}
	pull() {
		return this.term.readInput(this);
	}
}, kr = class {
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
	constructor(e, t) {
		this.win = e, this.ansi = new yr();
		let { signal: i } = e;
		this.edit = r("span", { class: "tm-edit" }), this.output = r("div", {
			class: "tm-out",
			role: "log",
			"aria-live": "polite"
		}, this.edit), this.input = r("textarea", {
			class: "tm-input",
			spellcheck: "false",
			autocapitalize: "off",
			autocomplete: "off",
			autocorrect: "off",
			rows: "1",
			"aria-label": "Riga di comando"
		}), this.screen = r("div", { class: "tm-screen" }, this.output, this.input), e.body.classList.add("tm"), e.body.append(this.screen), this.input.addEventListener("keydown", (e) => this.#g(e), { signal: i }), this.input.addEventListener("input", (e) => this.#d(e), { signal: i }), this.input.addEventListener("paste", (e) => this.#f(e), { signal: i }), this.input.addEventListener("focus", () => this.screen.classList.add("focused"), { signal: i }), this.input.addEventListener("blur", () => this.screen.classList.remove("focused"), { signal: i }), this.screen.addEventListener("mouseup", () => {
			String(getSelection()).length || this.focus();
		}, { signal: i });
		let a = new ResizeObserver(() => {
			this.#a = 0;
		});
		a.observe(this.screen), this.history = Ar();
		let o = new ot((e) => this.write(e));
		this.host = {
			stdin: new Or(this),
			stdout: o,
			stderr: o,
			clear: () => this.clear(),
			columns: () => this.columns(),
			history: {
				list: () => [...this.history],
				clear: () => {
					this.history = [], jr([]);
				}
			}
		}, this.shell = new ft({
			host: this.host,
			commands: hr
		}), t?.cwd && n.get(t.cwd)?.type === "folder" && (this.shell.cwd = t.cwd), this.shell.setVar("PS1", "\\[\\e[1;32m\\]\\u@\\h\\[\\e[0m\\]:\\[\\e[1;34m\\]\\w\\[\\e[0m\\]\\$ "), e.on("destroy", () => {
			a.disconnect(), cancelAnimationFrame(this.#t), this.#o?.abort();
			for (let e of this.shell.jobs.list) e.token.abort();
			this.reader?.reject(new h());
		}), this.#E(), this.#s();
	}
	async #s() {
		this.write("\x1B[2mTerminale di lilOS · «help» elenca i comandi\x1B[0m\n"), this.shell.resolve(`~/${Er}`)?.type === "file" ? await this.#C(`source ~/${Er}`, { record: !1 }) : this.prompt(), requestAnimationFrame(() => this.focus());
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
		let t = this.#l();
		this.ansi.write(e, this.output, this.edit, () => this.clear()), this.#c(), t && this.scrollToEnd();
	}
	#c() {
		let e = this.output.textContent.length;
		for (; e > Tr && this.output.firstChild !== this.edit;) e -= this.output.firstChild.textContent.length, this.output.firstChild.remove();
	}
	#l() {
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
			let e = r("span", { class: "tm-probe" }, "MMMMMMMMMM");
			this.screen.append(e), this.#a = e.getBoundingClientRect().width / 10 || 8, e.remove();
		}
		return Math.max(20, Math.floor((this.screen.clientWidth - 24) / this.#a));
	}
	promptText(e = "PS1") {
		let t = this.shell.getVar(e) ?? "$ ", r = i.user?.username || this.shell.getVar("USER") || "utente", a = /* @__PURE__ */ new Date(), o = (e) => String(e).padStart(2, "0");
		return t.replace(/\\([uhHwW$nte\\[\]dA@])/g, (e, t) => ({
			u: r,
			h: this.shell.getVar("HOSTNAME") ?? "lilos",
			H: this.shell.getVar("HOSTNAME") ?? "lilos",
			w: Ie(this.shell.cwd),
			W: this.shell.cwd === n.root ? "~" : n.get(this.shell.cwd)?.name ?? "~",
			$: "$",
			n: "\n",
			e: "\x1B",
			"\\": "\\",
			"[": "",
			"]": "",
			t: `${o(a.getHours())}:${o(a.getMinutes())}:${o(a.getSeconds())}`,
			A: `${o(a.getHours())}:${o(a.getMinutes())}`,
			d: a.toLocaleDateString("it-IT", {
				weekday: "short",
				day: "numeric",
				month: "short"
			}),
			"@": a.toLocaleTimeString("it-IT")
		})[t]);
	}
	prompt() {
		for (let e of this.shell.reapJobs()) this.write(e);
		this.flush(), this.ansi.reset(), this.write(this.promptText(this.pending ? "PS2" : "PS1")), this.flush(), this.renderLine(), this.scrollToEnd();
	}
	renderLine() {
		let e = this.reader?.reader.silent, t = e ? "" : this.text, n = e ? 0 : this.cursor, i = r("span", { class: "tm-cursor" }, t[n] ?? " ");
		this.edit.replaceChildren(t.slice(0, n), i, t.slice(n + 1)), this.edit.hidden = this.running && !this.reader && !this.text;
	}
	setLine(e, t = e.length) {
		this.text = e, this.cursor = Math.max(0, Math.min(t, e.length)), this.#i = 0, this.renderLine();
	}
	#u(e) {
		this.write((this.reader?.reader.silent ? "" : e) + "\n"), this.setLine(""), this.flush();
	}
	#d(e) {
		if (e.isComposing) return;
		let t = this.input.value;
		if (this.input.value = "", !t) return;
		let n = t.replace(/\r\n?/g, "\n").split("\n");
		this.#p(n[0]), n.length > 1 && this.#m(n.slice(1));
	}
	#f(e) {
		let t = e.clipboardData?.getData("text/plain");
		if (t == null) return;
		e.preventDefault();
		let n = t.replace(/\r\n?/g, "\n").split("\n");
		this.#p(n[0]), n.length > 1 && this.#m(n.slice(1));
	}
	#p(e) {
		e && (this.setLine(this.text.slice(0, this.cursor) + e + this.text.slice(this.cursor), this.cursor + e.length), this.scrollToEnd());
	}
	#m(e) {
		let t = e.pop();
		this.#b();
		for (let t of e) this.queue.push(t);
		t && (this.running || this.queue.length ? this.#h = t : this.#p(t)), this.#x();
	}
	#h = "";
	#g(e) {
		let t = e.ctrlKey && !e.altKey && !e.metaKey, n = e.ctrlKey && e.key.length === 1 ? e.key.toLowerCase() : e.key, r = () => {
			e.preventDefault(), e.stopPropagation();
		};
		if (n !== "Tab" && (this.#i = 0), !e.isComposing) {
			if (n === "Enter") r(), this.#b();
			else if (n === "Tab") r(), this.#v();
			else if (t && n === "c") {
				if (String(getSelection()).length) return;
				r(), this.#y();
			} else if (t && n === "d") r(), this.reader ? (this.#u(this.text), this.#T(null)) : !this.running && !this.text && !this.pending ? this.#D() : this.text && this.setLine(this.text.slice(0, this.cursor) + this.text.slice(this.cursor + 1), this.cursor);
			else if (t && n === "l") r(), this.clear(), this.running || this.prompt();
			else if (t && n === "a") r(), this.setLine(this.text, 0);
			else if (t && n === "e") r(), this.setLine(this.text, this.text.length);
			else if (t && n === "u") r(), this.setLine(this.text.slice(this.cursor), 0);
			else if (t && n === "k") r(), this.setLine(this.text.slice(0, this.cursor));
			else if (t && (n === "w" || n === "Backspace")) {
				r();
				let e = this.text.slice(0, this.cursor).replace(/\S+\s*$/, "");
				this.setLine(e + this.text.slice(this.cursor), e.length);
			} else switch (n) {
				case "Backspace":
					r(), this.cursor > 0 && this.setLine(this.text.slice(0, this.cursor - 1) + this.text.slice(this.cursor), this.cursor - 1);
					return;
				case "Delete":
					r(), this.setLine(this.text.slice(0, this.cursor) + this.text.slice(this.cursor + 1), this.cursor);
					return;
				case "ArrowLeft":
					r(), t ? this.setLine(this.text, this.text.slice(0, this.cursor).replace(/\S+\s*$/, "").length) : this.setLine(this.text, this.cursor - 1);
					return;
				case "ArrowRight":
					if (r(), t) {
						let e = /^\s*\S+/.exec(this.text.slice(this.cursor));
						this.setLine(this.text, this.cursor + (e ? e[0].length : this.text.length));
					} else this.setLine(this.text, this.cursor + 1);
					return;
				case "Home":
					r(), this.setLine(this.text, 0);
					return;
				case "End":
					r(), this.setLine(this.text, this.text.length);
					return;
				case "ArrowUp":
					r(), this.#_(-1);
					return;
				case "ArrowDown":
					r(), this.#_(1);
					return;
				case "PageUp":
					r(), this.screen.scrollTop -= this.screen.clientHeight * .9;
					return;
				case "PageDown":
					r(), this.screen.scrollTop += this.screen.clientHeight * .9;
					return;
				case "Escape":
					r();
					return;
			}
		}
	}
	#_(e) {
		if (this.reader) return;
		this.#n < 0 && (this.#r = this.text, this.#n = this.history.length);
		let t = this.#n + e;
		t < 0 || t > this.history.length || (this.#n = t, this.setLine(t === this.history.length ? this.#r : this.history[t]));
	}
	#v() {
		if (this.reader) return;
		let { start: e, end: t, items: n } = Sr(this.shell, this.text, this.cursor);
		if (this.#i++, !n.length) return;
		let r = (n) => this.setLine(this.text.slice(0, e) + n + this.text.slice(t), e + n.length);
		if (n.length === 1) {
			let e = n[0];
			r(e.value + (e.folder || /[}/]$/.test(e.value) ? "" : " "));
			return;
		}
		let i = Cr(n.map((e) => e.value)), a = this.text.slice(e, t);
		if (i.length > a.length) {
			r(i), this.#i = 1;
			return;
		}
		if (this.#i < 2) return;
		let o = this.text, s = this.cursor;
		this.#u(o), this.write(Lt(n.map((e) => ({
			text: e.label,
			plain: e.label
		})), this.columns())), this.prompt(), this.setLine(o, s), this.#i = 0;
	}
	#y() {
		this.running ? (this.write("^C"), this.reader ? this.#u("") : this.write("\n"), this.queue = [], this.#h = "", this.#o?.abort()) : (this.write(this.text + "^C\n"), this.pending = "", this.queue = [], this.setLine(""), this.shell.status = 130, this.prompt());
	}
	#b() {
		let e = this.text;
		this.#n = -1, this.reader ? (this.#u(e), this.#T(e + "\n")) : this.running ? (this.queue.push(e), this.setLine("")) : (this.#u(e), this.#S(e));
	}
	#x() {
		for (; !this.running && this.queue.length;) {
			let e = this.queue.shift();
			this.write(e + "\n"), this.#S(e);
		}
		!this.running && !this.queue.length && this.#h && (this.#p(this.#h), this.#h = "");
	}
	#S(e) {
		let t = this.pending ? `${this.pending}\n${e}` : e;
		this.#C(t, { record: !0 });
	}
	async #C(e, { record: t }) {
		if (!e.trim()) {
			this.pending = "", this.prompt();
			return;
		}
		this.running = !0, this.renderLine(), this.#o = new b(), this.shell.token = this.#o, this.host.stdin = new Or(this);
		let n = !1;
		try {
			await this.shell.run(e, this.host);
		} catch (e) {
			if (e instanceof _) n = !0;
			else if (e instanceof v) this.write(`bash: ${e.message}\n`), this.shell.status = 2;
			else if (e instanceof m) {
				this.flush(), this.#D();
				return;
			} else e instanceof h ? this.shell.status = 130 : (this.write(`bash: ${e?.message ?? e}\n`), this.shell.status = 1);
		}
		this.pending = n ? e : "", t && !n && this.#w(e), this.running = !1, this.reader = null, this.#E(), this.flush(), /\n$/.test(this.edit.previousSibling?.textContent ?? "\n") || this.write("\n"), this.prompt(), this.#x();
	}
	#w(e) {
		let t = e.trim();
		t && !e.startsWith(" ") && this.history.at(-1) !== t && (this.history = [...Ar().filter((e) => e !== t), t].slice(-1e3), jr(this.history));
	}
	readInput(e) {
		if (this.queue.length) {
			let t = this.queue.shift();
			return this.write((e.silent ? "" : t) + "\n"), Promise.resolve(t + "\n");
		}
		return this.flush(), new Promise((t, n) => {
			let r = this.#o?.onAbort(() => {
				this.reader = null, n(new h());
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
	#T(e) {
		let t = this.reader;
		this.reader = null, this.renderLine(), t?.resolve(e);
	}
	changeDir(e) {
		this.shell.cwd = e, this.#E(), this.running || (this.write(`\ncd ${Ie(e)}\n`), this.prompt());
	}
	#E() {
		this.win.setTitle("Terminale", Ie(this.shell.cwd));
	}
	#D() {
		this.running = !0, this.renderLine(), this.win.emit("close");
	}
};
function Ar() {
	let e = a.get(wr, []);
	return Array.isArray(e) ? e.filter((e) => typeof e == "string").slice(-1e3) : [];
}
var jr = (e) => a.set(wr, e);
export { Dr as default };
