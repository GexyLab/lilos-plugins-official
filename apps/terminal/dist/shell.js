// src/terminal/kernel/kfs.js
var e = "root", t = "trash", n = /^[\w-]{1,40}$/, r = (e) => {
	let t = e.lastIndexOf(".");
	return t > 0 ? [e.slice(0, t), e.slice(t + 1)] : [e, ""];
}, i = (e) => JSON.parse(JSON.stringify(e)), a = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`, o = (e) => {
	let t = 0;
	for (let n of String(e)) {
		let e = n.codePointAt(0);
		t += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;
	}
	return t;
}, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function c(e) {
	let t = [];
	for (let n of String(e)) {
		let e = n.codePointAt(0);
		e < 128 ? t.push(e) : e < 2048 ? t.push(192 | e >> 6, 128 | e & 63) : e < 65536 ? t.push(224 | e >> 12, 128 | e >> 6 & 63, 128 | e & 63) : t.push(240 | e >> 18, 128 | e >> 12 & 63, 128 | e >> 6 & 63, 128 | e & 63);
	}
	return t;
}
function l(e) {
	let t = c(e), n = "";
	for (let e = 0; e < t.length; e += 3) {
		let r = t[e] << 16 | (t[e + 1] ?? 0) << 8 | (t[e + 2] ?? 0);
		n += s[r >> 18 & 63] + s[r >> 12 & 63] + (e + 1 < t.length ? s[r >> 6 & 63] : "=") + (e + 2 < t.length ? s[r & 63] : "=");
	}
	return n;
}
function u(e) {
	let t = String(e).replace(/[^A-Za-z0-9+/]/g, ""), n = [];
	for (let e = 0; e < t.length; e += 4) {
		let r = s.indexOf(t[e]) << 18 | s.indexOf(t[e + 1]) << 12 | (s.indexOf(t[e + 2]) & 63) << 6 | s.indexOf(t[e + 3]) & 63;
		n.push(r >> 16 & 255), t[e + 2] !== void 0 && n.push(r >> 8 & 255), t[e + 3] !== void 0 && n.push(r & 255);
	}
	let r = "";
	for (let e = 0; e < n.length;) {
		let t = n[e], i, a;
		t < 128 ? (i = t, a = 1) : t >> 5 == 6 ? (i = (t & 31) << 6 | n[e + 1] & 63, a = 2) : t >> 4 == 14 ? (i = (t & 15) << 12 | (n[e + 1] & 63) << 6 | n[e + 2] & 63, a = 3) : (i = (t & 7) << 18 | (n[e + 1] & 63) << 12 | (n[e + 2] & 63) << 6 | n[e + 3] & 63, a = 4), r += String.fromCodePoint(i), e += a;
	}
	return r;
}
var d = (e) => Math.floor(String(e).replace(/=+$/, "").length * 3 / 4);
function f(s) {
	let c = /* @__PURE__ */ new Map(), f = "/home", p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set(), h = (n) => {
		let r = c.get(n);
		if (!r || n === t) return null;
		for (let n = r; n; n = c.get(n.parent)) {
			if (n.parent === t || n.private) return null;
			if (n.id === e) return r;
		}
		return null;
	}, g = (e) => {
		p.add(e.id), m.delete(e.id);
	}, _ = (e) => [...c.values()].filter((t) => t.parent === e).flatMap((e) => [e.id, ..._(e.id)]), v = (e, t, n) => {
		let i = new Set([...c.values()].filter((t) => t.parent === e && t.id !== n).map((e) => e.name.toLowerCase()));
		if (!i.has(t.toLowerCase())) return t;
		let [a, o] = r(t);
		for (let e = 2;; e++) {
			let t = o ? `${a} ${e}.${o}` : `${a} ${e}`;
			if (!i.has(t.toLowerCase())) return t;
		}
	}, y = (e) => {
		let t = String(e ?? "").trim();
		if (!t || t.length > 255 || t.includes("/") || t === "." || t === "..") throw Error(`Nome non valido: ${t.slice(0, 40)}`);
		return t;
	}, b = (t) => {
		let n = h(t);
		if (!n) throw Error("Elemento inesistente");
		if (n.system || t === e) throw Error("Gli elementi di sistema non si possono modificare");
		return n;
	}, x = (e) => {
		let t = h(e);
		if (!t || t.type !== "file") throw Error("Il file non esiste");
		return t;
	}, S = (n, r) => {
		let i = c.get(n);
		i && n !== e && n !== t && (i.modified = r, g(i));
	}, C = {
		get root() {
			return e;
		},
		get trashRoot() {
			return t;
		},
		get workspace() {
			return null;
		},
		get home() {
			return f;
		},
		loaded: !0,
		async load() {
			let n = await s.home.load();
			f = String(n.home || "/home").replace(/\/+$/, ""), c.clear(), c.set(e, {
				id: e,
				type: "folder",
				name: "",
				parent: null,
				created: 0,
				modified: 0
			}), c.set(t, {
				id: t,
				type: "folder",
				name: "",
				parent: null,
				created: 0,
				modified: 0
			});
			for (let e of n.nodes ?? []) c.set(e.id, e);
			return n;
		},
		async flush() {
			if (!p.size && !m.size) return;
			let e = [...p].map((e) => c.get(e)).filter(Boolean).map(i), t = [...m];
			p.clear(), m.clear(), await s.home.sync({
				put: e,
				remove: t
			});
		},
		get: (e) => {
			let t = h(e);
			return t ? i(t) : null;
		},
		exists: (e) => !!h(e),
		children(e) {
			return h(e) ? [...c.values()].filter((t) => t.parent === e && h(t.id)).map(i) : [];
		},
		ancestors(e) {
			let t = [];
			if (!h(e)) return t;
			for (let n = c.get(e); n; n = c.get(n.parent)) t.unshift(i(n));
			return t;
		},
		path(e) {
			return [f, ...C.ancestors(e).slice(1).map((e) => e.name)].join("/");
		},
		resolve(t) {
			t = String(t);
			let n = t.toLowerCase(), r = f.toLowerCase();
			n === r || n.startsWith(`${r}/`) ? t = t.slice(f.length) : (t === "~" || t.startsWith("~/")) && (t = t.slice(1));
			let a = c.get(e);
			for (let e of t.split("/").filter(Boolean)) if (a = [...c.values()].find((t) => t.parent === a.id && t.name.toLowerCase() === e.toLowerCase() && h(t.id)), !a) return null;
			return i(a);
		},
		isInside: (e, t) => C.ancestors(e).some((e) => e.id === t),
		count(e) {
			let t = 0;
			for (let n of C.children(e)) t += 1 + (n.type === "folder" ? C.count(n.id) : 0);
			return t;
		},
		uniqueName: (e, t, n = null) => v(e, t, n),
		isRemote: () => !1,
		netRef: () => null,
		isTrashed: (e) => c.get(e)?.parent === t,
		create(e, { type: t, name: n, color: r, size: o } = {}) {
			let s = h(e);
			if (!s || s.type !== "folder") throw Error("La cartella di destinazione non esiste");
			if (t !== "file" && t !== "folder") throw Error(`Tipo non valido nel kernel: ${t}`);
			let l = Date.now(), u = {
				id: a(),
				type: t,
				name: "",
				parent: e,
				created: l,
				modified: l,
				...t === "file" && { size: Number.isFinite(o) && o >= 0 ? o : 0 },
				...t === "folder" && typeof r == "string" && { color: r }
			};
			return u.name = v(e, y(n), null), c.set(u.id, u), g(u), S(e, l), i(u);
		},
		rename(e, t) {
			let n = b(e), r = v(n.parent, y(t), e);
			return r === n.name || (n.name = r, n.modified = Date.now(), g(n)), r;
		},
		update(e, { color: t } = {}) {
			let n = h(e);
			if (!n) throw Error("Elemento inesistente");
			n.type === "folder" && typeof t == "string" && (n.color = t, g(n));
		},
		move(e, t) {
			let n = b(e), r = h(t);
			if (!r || r.type !== "folder") throw Error("La cartella di destinazione non esiste");
			if (C.isInside(t, e)) throw Error("Una cartella non può andare dentro se stessa");
			if (n.parent === t) return n.name;
			let i = n.parent;
			n.name = v(t, n.name, e), n.parent = t, g(n);
			let a = Date.now();
			return S(i, a), S(t, a), n.name;
		},
		remove(e) {
			let t = b(e), n = [e, ..._(e)];
			if (n.some((e) => c.get(e).system)) throw Error("Contiene cartelle di sistema");
			for (let e of n) c.delete(e), p.delete(e), m.add(e);
			S(t.parent, Date.now());
		},
		trash(e) {
			let n = [], r = Date.now();
			for (let i of e) {
				let e = h(i);
				if (!e || e.system || n.includes(i) || _(i).some((e) => c.get(e).system)) continue;
				let a = e.parent;
				e.parent = t, e.trashed = {
					at: r,
					from: a
				}, g(e), S(a, r), n.push(i);
			}
			return n;
		},
		trashed() {
			return [...c.values()].filter((e) => e.parent === t).map((e) => {
				let t = _(e.id).map((e) => c.get(e));
				return {
					...i(e),
					inside: t.length,
					bytes: [e, ...t].reduce((e, t) => e + (t.size ?? 0), 0)
				};
			}).sort((e, t) => t.trashed.at - e.trashed.at);
		},
		untrash(n, r = null) {
			let i = r == null ? null : h(r);
			if (r != null && i?.type !== "folder") return [];
			let a = [];
			for (let r of n) {
				let n = c.get(r);
				if (n?.parent !== t) continue;
				let o = i ?? h(n.trashed?.from), s = o?.type === "folder" ? o.id : e;
				delete n.trashed, n.parent = s, n.name = v(s, n.name, r), g(n), a.push({
					id: r,
					parent: s
				});
			}
			return a;
		},
		purge(e) {
			let n = e.filter((e) => c.get(e)?.parent === t);
			for (let e of n) for (let t of [e, ..._(e)]) c.delete(t), p.delete(t), m.add(t);
			return n.length;
		},
		purgeTrash(e = null) {
			return C.purge([...c.values()].filter((n) => n.parent === t && (e == null || (n.trashed?.at ?? 0) < e)).map((e) => e.id));
		},
		setTags(e, t) {
			let r = b(e), i = [...new Set((Array.isArray(t) ? t : []).filter((e) => typeof e == "string" && n.test(e)))].slice(0, 30);
			i.join() !== (r.tags ?? []).join() && (i.length ? r.tags = i : delete r.tags, g(r));
		},
		tagged: (e) => [...c.values()].filter((t) => t.tags?.includes(e) && h(t.id)).map(i),
		async read(e) {
			return x(e), await C.flush(), u((await s.home.read(e)).base64);
		},
		async readBlob(e, { type: t = "" } = {}) {
			let n = x(e);
			await C.flush();
			let r = (await s.home.read(e)).base64;
			return {
				size: d(r),
				type: t,
				base64: r,
				text: async () => u(r),
				name: n.name
			};
		},
		async write(e, t) {
			let n = x(e);
			await C.flush();
			let r = t && typeof t == "object" && typeof t.base64 == "string" ? t.base64 : l(String(t ?? ""));
			await s.home.write(e, { base64: r }), n.size = t && typeof t == "object" && typeof t.base64 == "string" ? d(r) : o(String(t ?? "")), n.modified = Date.now(), S(n.parent, n.modified);
		},
		async copy(e, t, { name: n } = {}) {
			let r = x(e), a = await C.readBlob(e), o = C.create(t, {
				type: "file",
				name: n ?? r.name,
				size: a.size
			}), s = c.get(o.id);
			return r.apps && (s.apps = i(r.apps)), await C.write(s.id, a), i(s);
		},
		async copyContent(e, t) {
			let n = x(e), r = x(t);
			await C.write(t, await C.readBlob(e)), n.apps ? r.apps = i(n.apps) : delete r.apps, g(r);
		},
		appMeta: (e, t) => {
			let n = h(e)?.apps?.[t];
			return n ? i(n) : null;
		},
		on: () => () => {}
	};
	return C;
}
// src/terminal/kernel/sdk.js
var p = "Non disponibile quando il comando gira nel kernel: serve il Terminale aperto in lilOS", m = null, h = null, g = [], _ = null, v = ((e) => new Proxy({}, {
	get: (t, n) => {
		let r = e(), i = r?.[n];
		return typeof i == "function" ? i.bind(r) : i;
	},
	has: (t, n) => n in (e() ?? {})
}))(() => h), y = {
	get user() {
		return m?.app?.user ?? null;
	},
	get locale() {
		return m?.locale?.code ?? "en";
	}
}, b = [
	{
		value: "#e5484d",
		label: "Rosso"
	},
	{
		value: "#d9822b",
		label: "Arancione"
	},
	{
		value: "#d4a72c",
		label: "Giallo"
	},
	{
		value: "#30a46c",
		label: "Verde"
	},
	{
		value: "#0d9488",
		label: "Verde acqua"
	},
	{
		value: "#3b6ef5",
		label: "Blu"
	},
	{
		value: "#7c5cdb",
		label: "Viola"
	},
	{
		value: "#8b8d98",
		label: "Grigio"
	}
], x = {
	list: () => g.map((e) => ({ ...e })),
	get: (e) => g.find((t) => t.id === e) ?? null,
	byName: (e) => g.find((t) => t.name.toLowerCase() === String(e).toLowerCase()) ?? null,
	create() {
		throw Error(p);
	},
	rename() {
		throw Error(p);
	},
	setColor() {
		throw Error(p);
	},
	remove() {
		throw Error(p);
	},
	on: () => () => {}
}, S = {
	get code() {
		return m?.locale?.code ?? "en";
	},
	forApp: () => ({ i18n: {
		t: (e, t) => _?.t(e, t) ?? e,
		date: (e, t) => _?.date?.(e, t) ?? new Date(e).toISOString(),
		number: (e, t) => _?.number?.(e, t) ?? String(e),
		get lang() {
			return _?.lang ?? "en";
		},
		get code() {
			return m?.locale?.code ?? "en";
		}
	} }),
	on: () => () => {}
};
async function C(e) {
	if (m = e, _ = e.locale?.i18n ?? null, !e.home) throw Error("Serve il modulo services-isolate 1.1.0 o più recente (AppStore → Kernel)");
	h = f(e);
	let t = await h.load();
	return g = Array.isArray(t.tags) ? t.tags.filter((e) => e && typeof e.id == "string" && typeof e.name == "string") : [], h;
}
// src/terminal/shell/signals.js
var w = class {
	constructor(e = 1) {
		this.levels = e;
	}
}, T = class {
	constructor(e = 1) {
		this.levels = e;
	}
}, ee = class {
	constructor(e) {
		this.code = e;
	}
}, te = class {
	constructor(e) {
		this.code = e;
	}
}, E = class {
	code = 130;
}, ne = class {
	code = 141;
}, D = class extends Error {}, O = class extends Error {}, k = class extends Error {
	constructor(e, t = 1) {
		super(e), this.code = t;
	}
}, re = class {
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
		if (this.aborted) throw new E();
	}
};
// src/shared/i18n.js
function ie(e, t) {
	if (S) return S.forApp(e).i18n;
	let n = {
		...t.en.strings,
		...t.it?.strings
	}, r = (e, t) => !!e && Object.hasOwn(e, t), i = (e, t) => e.replace(/\{(\w+)\}/g, (e, n) => r(t, n) ? String(t[n]) : e), a = new Intl.PluralRules("it");
	return {
		t: (e, t) => {
			let o = r(n, e) ? n[e] : void 0;
			if (o === void 0) return String(e);
			if (typeof o == "string") return i(o, t);
			let s = Number(r(t, "n") ? t.n : 0);
			return i(s === 0 && o.zero ? o.zero : o[a.select(s)] ?? o.other, t);
		},
		lang: "it",
		date: (e, t) => new Intl.DateTimeFormat("it-IT", t).format(e instanceof Date ? e : new Date(e)),
		number: (e, t) => new Intl.NumberFormat("it-IT", t).format(e)
	};
}
// src/terminal/i18n.js
var A = ie("terminal", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Terminal\",\"@description\":\"A bash-like shell over the files of lilOS, in tabs and panes side by side, and remote sessions: SSH, Telnet, rlogin and SUPDUP, with saved hosts, .term links and sessions that keep running when the window is closed.\",\"@entrypoints.main.params.cwd.label\":\"Folder\",\"@entrypoints.main.params.cwd.description\":\"The folder to open the terminal in\",\"@automation.terminal.run.label\":\"Run a command\",\"@automation.terminal.run.params.command.label\":\"Command\",\"@automation.terminal.run.params.folder.label\":\"Folder\",\"@automation.terminal.run.params.folder.description\":\"The working folder the command runs in\",\"@entrypoints.main.params.file.label\":\"Link\",\"@entrypoints.main.params.file.description\":\"A terminal link (.term) to open\",\"ui.title\":\"Terminal\",\"ui.commandLine\":\"Command line\",\"ui.welcome\":\"lilOS Terminal · \\\"help\\\" lists the commands\",\"automation.tooLong\":\"Command too long to record\",\"automation.noCommand\":\"No command to run\",\"automation.busy\":\"The terminal is busy with another command\",\"automation.noFolder\":\"The folder is not there any more\",\"automation.status\":\"The command ended with status {status}\",\"shell.defaultUser\":\"user\",\"shell.readonly\":\"{name}: readonly variable\",\"shell.cannotUnset\":\"{name}: cannot unset: readonly variable\",\"shell.badSubscript\":\"{index}: bad array subscript\",\"shell.unknownConstruct\":\"unknown construct: {type}\",\"shell.badRegex\":\"invalid regular expression\",\"shell.unaryExpected\":\"{op}: unary operator expected\",\"shell.integerExpected\":\"{value}: integer expression expected\",\"shell.binaryExpected\":\"{op}: binary operator expected\",\"shell.commandNotFound\":\"{name}: command not found\",\"shell.tooDeep\":\"{name}: maximum function nesting level exceeded\",\"shell.badFd\":\"{fd}: Bad file descriptor\",\"shell.fdExpected\":\"{target}: file descriptor expected\",\"shell.ambiguousRedirect\":\"{target}: ambiguous redirect\",\"shell.isAppLink\":\"{path}: is a link to an app\",\"err.noSuchFile\":\"{path}: No such file or directory\",\"err.isADirectory\":\"{path}: Is a directory\",\"err.notAFile\":\"{path}: Not a regular file\",\"err.missingParen\":\"`)' expected\",\"err.badIdentifier\":\"`{name}': not a valid identifier\",\"err.numericArgument\":\"{value}: numeric argument required\",\"err.tooManyArguments\":\"too many arguments\",\"err.notADirectory\":\"{path}: Not a directory\",\"err.notFound\":\"{name}: not found\",\"err.missingOperand\":\"missing operand\",\"err.unknownSubcommand\":\"unknown subcommand: '{sub}'\",\"parse.unexpectedEnd\":\"syntax error: unexpected end of input\",\"parse.unexpectedEndOfFile\":\"syntax error: unexpected end of file\",\"parse.nearEnd\":\"end of input\",\"parse.nearNewline\":\"`newline'\",\"parse.nearToken\":\"`{token}'\",\"parse.near\":\"syntax error near unexpected token {near}\",\"parse.nearExpected\":\"syntax error near unexpected token {near}: expected `{expected}'\",\"parse.badFunctionName\":\"invalid function name\",\"parse.parenAfterName\":\"expected `)' after the function name\",\"parse.aliasLoop\":\"aliases expanded too many times\",\"parse.missingTarget\":\"syntax error near unexpected token {near}: missing target of `{op}'\",\"parse.forBadName\":\"for: invalid variable name\",\"parse.caseNoWord\":\"case: missing word\",\"parse.condNear\":\"syntax error in conditional expression near {near}\",\"parse.condNoOperand\":\"syntax error in conditional expression: missing operand\",\"parse.condNoRegex\":\"syntax error in conditional expression: missing regular expression\",\"parse.badSubstitution\":\"bad substitution\",\"parse.badSubstitutionBrace\":\"bad substitution: missing `}'\",\"parse.backquotes\":\"syntax error in backquoted command substitution\",\"jobs.done\":\"Done\",\"jobs.interrupted\":\"Interrupt\",\"jobs.exit\":\"Exit {code}\",\"jobs.running\":\"Running\",\"help.usageLine\":\"Usage: {usage}\",\"help.usageShort\":\"usage: {usage}\",\"help.noHelp\":\"no help topics match `{name}'\",\"help.intro\":\"lilOS Terminal: a bash-like shell over the files of lilOS.\\n\\\"help command\\\" or \\\"command --help\\\" explains a command; \\\"help if\\\", \\\"help for\\\", \\\"help case\\\"… the syntax.\",\"help.syntaxList\":\"Syntax: {list}\",\"help.sh.summary\":\"Like bash.\",\"help.sh.usage\":\"sh [-c commands | script] [arguments…]\",\"help.bash.text\":\"\\\"bash script.sh a b\\\" runs the script with $1=a, $2=b; \\\"bash -c 'echo $1' name x\\\" runs the text; \\\"cat script.sh | bash\\\" reads the script from the input.\",\"help.bash.summary\":\"Runs a script or commands in a new shell.\",\"help.bash.usage\":\"bash [-c commands | script] [arguments…]\",\"help.sleep.summary\":\"Waits: 5 (seconds), 0.5, 2m, 1h.\",\"help.sleep.usage\":\"sleep duration…\",\"help.kill.summary\":\"Interrupts commands in the background.\",\"help.kill.usage\":\"kill [-signal] %job | pid…\",\"help.fg.summary\":\"Brings a command in the background to the foreground: it is waited for and Ctrl C interrupts it.\",\"help.wait.summary\":\"Waits for the commands in the background to finish (all of them, or the ones named).\",\"help.jobs.summary\":\"Lists the commands started in the background with &.\",\"help.clear.summary\":\"Clears the screen (Ctrl L too).\",\"help.help.summary\":\"Lists the commands, or explains the one named.\",\"help.help.usage\":\"help [command]\",\"help.history.summary\":\"Shows the commands given (the last n); -c clears the history.\",\"help.which.summary\":\"Tells where a command is.\",\"help.which.usage\":\"which name…\",\"help.command.summary\":\"Starts a command ignoring the functions with the same name; with -v tells what it would start.\",\"help.command.usage\":\"command [-v] name [arguments…]\",\"help.type.summary\":\"Tells what a name is: alias, keyword, function, command.\",\"help.type.usage\":\"type [-t] name…\",\"help.unalias.summary\":\"Removes aliases (all of them with -a).\",\"help.unalias.usage\":\"unalias [-a] name…\",\"help.alias.text\":\"Example: alias ll='ls -l'. Aliases work from the line after the one that defines them.\",\"help.alias.summary\":\"Defines or shows aliases (short names for commands).\",\"help.alias.usage\":\"alias [name[=value]…]\",\"help.eval.summary\":\"Runs the arguments, joined by spaces, as a command.\",\"help.eval.usage\":\"eval [arguments…]\",\"help.dot.summary\":\"Like source.\",\"help.dot.usage\":\". file [arguments…]\",\"help.source.summary\":\"Runs the commands of a file in this shell (variables, functions and aliases stay).\",\"help.source.usage\":\"source file [arguments…]\",\"help.read.text\":\"-r  backslashes stay as they are\\n-p  shows a prompt\\n-a  puts the words in an array\\n-d  reads up to this character instead of up to the newline\\n-s  does not show what is typed (for passwords)\\nStatus 1 at the end of the input.\",\"help.read.summary\":\"Reads a line and splits it into the variables named ($REPLY without names).\",\"help.read.usage\":\"read [-rs] [-p prompt] [-a array] [-d delim] [name…]\",\"help.continue.summary\":\"Goes on to the next round of the loop (or of the n-th enclosing loop).\",\"help.break.summary\":\"Exits the loop (or n loops).\",\"help.return.summary\":\"Exits the function (or the script read with source).\",\"help.return.usage\":\"return [status]\",\"help.exit.summary\":\"Closes the terminal (or exits the script) with a status.\",\"help.exit.usage\":\"exit [status]\",\"help.let.summary\":\"Computes arithmetic expressions (status 1 if the last one is 0).\",\"help.let.usage\":\"let expression…\",\"help.bracket.summary\":\"Like test, with a final \\\"]\\\".\",\"help.bracket.usage\":\"[ expression ]\",\"help.test.text\":\"Files: -e exists, -f is a file, -d is a directory, -s is not empty\\nText: -z empty, -n not empty, a = b, a != b\\nNumbers: -eq -ne -lt -le -gt -ge\\nCombined: ! not, -a and, -o or, ( … )\",\"help.test.summary\":\"Evaluates an expression: status 0 if true, 1 if false.\",\"help.test.usage\":\"test expression\",\"help.colon.summary\":\"Does nothing (status 0); the arguments are expanded anyway.\",\"help.colon.usage\":\": [arguments…]\",\"help.false.summary\":\"Does nothing, unsuccessfully (status 1).\",\"help.true.summary\":\"Does nothing, successfully (status 0).\",\"help.shift.summary\":\"Shifts the positional parameters: $2 becomes $1…\",\"help.set.text\":\"-e  exits at the first command that fails\\n-u  error when an unset variable is used\\n-x  shows the commands before running them\\n-f  no expansion of * and ?\\n-o pipefail  a pipeline fails if one of its commands fails\\n+e, +u… turn them off. Without arguments it shows every variable.\",\"help.set.summary\":\"Sets the options of the shell and the positional parameters ($1, $2…).\",\"help.set.usage\":\"set [-euxf] [-o option] [--] [arguments…]\",\"help.printenv.summary\":\"Shows the exported variables (or the value of the ones named).\",\"help.printenv.usage\":\"printenv [name…]\",\"help.env.summary\":\"Shows the exported variables, or starts a command with more variables.\",\"help.env.usage\":\"env [name=value…] [command [arguments…]]\",\"help.unset.summary\":\"Removes variables (or functions with -f).\",\"help.unset.usage\":\"unset [-fv] name…\",\"help.typeset.summary\":\"Like declare.\",\"help.typeset.usage\":\"typeset [-aprxifF] [name[=value]…]\",\"help.declare.text\":\"-a array, -x exported, -r read-only, -i integer (the value is computed), -p shows, -f shows the functions, -g global inside a function.\",\"help.declare.summary\":\"Declares variables and shows their attributes.\",\"help.declare.usage\":\"declare [-aprxifF] [name[=value]…]\",\"help.local.summary\":\"Variables visible only inside the function.\",\"help.local.usage\":\"local [-arx] name[=value]…\",\"help.readonly.summary\":\"Makes variables read-only.\",\"help.readonly.usage\":\"readonly [name[=value]…]\",\"help.export.text\":\"Without arguments it lists the exported variables. -n removes the export.\",\"help.export.summary\":\"Makes variables visible to the commands and scripts it starts.\",\"help.export.usage\":\"export [-n] [name[=value]…]\",\"help.printf.text\":\"The format is applied again while arguments are left. -v saves the result in a variable.\",\"help.printf.summary\":\"Writes the arguments according to a format (%s, %d, %5.2f, %x, %b, %q…).\",\"help.printf.usage\":\"printf [-v var] format [arguments…]\",\"help.echo.text\":\"-n  no final newline\\n-e  interprets \\\\n, \\\\t, \\\\\\\\, \\\\e… \\n-E  does not interpret them (default)\",\"help.echo.summary\":\"Writes the arguments, separated by a space.\",\"help.echo.usage\":\"echo [-neE] [text…]\",\"help.pwd.summary\":\"Shows the working directory.\",\"help.cd.text\":\"Without arguments it goes to the home ($HOME). \\\"cd -\\\" goes back to the previous directory ($OLDPWD).\",\"help.cd.summary\":\"Changes the working directory.\",\"help.cd.usage\":\"cd [dir]\",\"help.realpath.summary\":\"The full path.\",\"help.realpath.usage\":\"realpath [-m] path…\",\"help.dirname.summary\":\"The path without its last part.\",\"help.dirname.usage\":\"dirname path…\",\"help.basename.summary\":\"The last part of a path (without the suffix).\",\"help.basename.usage\":\"basename path [suffix]\",\"help.tree.summary\":\"Shows directories as a tree.\",\"help.tree.usage\":\"tree [-adf] [-L levels] [dir…]\",\"help.find.text\":\"Tests: -name pattern, -iname, -path, -type f|d|l, -empty, -size [+-]n[ckMG], -mtime [+-]days, -mmin, -newer file\\nActions: -print, -print0, -delete (to the trash), -exec command {} \\\\; or +\\nOptions: -maxdepth n, -mindepth n. Combined: ! (not), -o (or), ( … )\\nExample: find . -name \\\"*.txt\\\" -size +1k\",\"help.find.summary\":\"Searches for files and directories.\",\"help.find.usage\":\"find [path…] [expression]\",\"help.stat.text\":\"-c  format: %n name, %s size, %F type, %y modification date, %Y in seconds, %w %W creation, %i id\",\"help.stat.summary\":\"Shows the details of files and directories.\",\"help.stat.usage\":\"stat [-c format] path…\",\"help.rmdir.summary\":\"Removes empty directories (to the trash).\",\"help.rmdir.usage\":\"rmdir [-p] dir…\",\"help.rm.text\":\"-r  directories too, with their contents\\n-d  empty directories\\n-f  no error for what does not exist\\n--purge  deletes permanently, without the trash\\nWhat goes to the trash can be put back with \\\"trash restore\\\".\",\"help.rm.summary\":\"Moves files and directories to the trash (with --purge deletes them forever).\",\"help.rm.usage\":\"rm [-rfvd] [--purge] path…\",\"help.mv.text\":\"If the destination is a directory, it moves into it; otherwise it renames. An overwritten file goes to the trash.\\n-n  does not overwrite\\n-v  tells what it moves\",\"help.mv.summary\":\"Moves or renames files and directories.\",\"help.mv.usage\":\"mv [-nv] source… dest\",\"help.cp.text\":\"-r  copies directories too, with their contents\\n-n  does not overwrite existing files\\n-v  tells what it copies\",\"help.cp.summary\":\"Copies files and directories.\",\"help.cp.usage\":\"cp [-rnv] source… dest\",\"help.touch.summary\":\"Creates empty files, or updates the modification date of the ones that exist.\",\"help.mkdir.text\":\"-p  creates the intermediate directories too; no error if it already exists\",\"help.mkdir.summary\":\"Creates directories.\",\"help.mkdir.usage\":\"mkdir [-pv] dir…\",\"help.cat.text\":\"-n  numbers the lines\\n-b  numbers only the non-empty ones\\n-s  only one empty line in a row\\n-E  $ at the end of every line\",\"help.cat.summary\":\"Shows the contents of files (or of the input), one after the other.\",\"help.ls.text\":\"-l  details (type, size, date, tags)\\n-a  also the names starting with \\\".\\\"\\n-h  human-readable sizes (1.2K)\\n-t  by date, -S by size, -r reversed\\n-1  one per line\\n-d  the directory itself, not its contents\\n-R  subdirectories too\\n-F  / after directories, @ after links, * after scripts\",\"help.ls.summary\":\"Lists the contents of directories.\",\"help.ls.usage\":\"ls [-laAh1trSdRF] [path…]\",\"help.xargs.text\":\"-n N  at most N arguments at a time\\n-I {}  one command per line, with {} replaced by the line\\n-0  words separated by the null character (find -print0)\\n-d C  words separated by C\\n-t  shows the commands before starting them\\n-r  starts nothing if the input is empty\\nExample: find . -name \\\"*.tmp\\\" | xargs rm\",\"help.xargs.summary\":\"Starts a command with the words of the input as arguments.\",\"help.xargs.usage\":\"xargs [-n N] [-I {}] [-0] [-t] [command [arguments…]]\",\"help.yes.summary\":\"Repeats a line forever (y if not given): useful in a pipeline.\",\"help.yes.usage\":\"yes [text]\",\"help.seq.text\":\"-s S  separator (newline if not given)\\n-w  same width, padded with zeros\",\"help.seq.summary\":\"Writes a sequence of numbers.\",\"help.seq.usage\":\"seq [first [step]] last\",\"help.nl.summary\":\"Numbers the lines (non-empty ones, or all with -b a).\",\"help.rev.summary\":\"Writes every line reversed.\",\"help.tr.text\":\"tr a-z A-Z  to uppercase\\ntr -d '\\\\r'  removes Windows carriage returns\\ntr -s ' '  only one space in a row\\nClasses: [:upper:] [:lower:] [:digit:] [:alpha:] [:alnum:] [:space:] [:punct:]\",\"help.tr.summary\":\"Replaces or deletes characters.\",\"help.tr.usage\":\"tr [-dsc] set1 [set2]\",\"help.cut.text\":\"-f 1,3  fields 1 and 3 (separated by tab or by -d)\\n-d ,  the separator\\n-c 1-5  characters 1 to 5\\n-s  only the lines with the separator\",\"help.cut.summary\":\"Extracts columns from every line.\",\"help.cut.usage\":\"cut -f fields [-d separator] | -c characters [file…]\",\"help.tee.text\":\"-a  appends instead of overwriting\",\"help.tee.summary\":\"Copies the input both to the output and to files.\",\"help.uniq.text\":\"-c  with the number of repetitions\\n-d  only the repeated lines\\n-u  only the unique ones\\n-i  ignoring case\",\"help.uniq.summary\":\"Removes lines repeated one after the other (usually after sort).\",\"help.sort.text\":\"-r  reversed\\n-n  by number\\n-h  by human-readable size (2K, 1M)\\n-u  without duplicates\\n-f  ignoring case\\n-k N[,M]  by field N (up to M)\\n-t C  fields separated by C\\n-V  numbers inside the text (file2 before file10)\\n-o file  writes to the file\",\"help.sort.summary\":\"Sorts lines.\",\"help.sort.usage\":\"sort [-rnufhV] [-k field] [-t separator] [file…]\",\"help.grep.text\":\"-i  ignoring case\\n-v  the lines that do NOT match\\n-n  with the line number\\n-c  counts the lines\\n-l  only the names of the files\\n-r  searches in directories\\n-w  whole words, -x whole lines\\n-E  extended regular expressions (| + ? () without backslash)\\n-F  plain text, not a regular expression\\n-o  only the part that matches\\n-q  no output, only the status\\n-A N, -B N, -C N  lines of context after, before, around\\nStatus: 0 found, 1 not found, 2 error.\",\"help.grep.summary\":\"Searches for the lines that contain a pattern (regular expression).\",\"help.grep.usage\":\"grep [-ivnclrwxEFoqH] [-e pattern] pattern [file…]\",\"help.wc.text\":\"-l lines, -w words, -c bytes, -m characters, -L the longest line\",\"help.wc.summary\":\"Counts lines, words and bytes.\",\"help.tail.text\":\"-n N  the last N lines (-n +N: from line N on)\\n-c N  the last N characters\",\"help.tail.summary\":\"The last lines (10 if not given).\",\"help.tail.usage\":\"tail [-n lines] [-c bytes] [file…]\",\"help.head.text\":\"-n N  the first N lines (-n -N: all but the last N)\\n-c N  the first N characters\\n-5 is like -n 5\",\"help.head.summary\":\"The first lines (10 if not given).\",\"help.head.usage\":\"head [-n lines] [-c bytes] [file…]\",\"help.sed.text\":\"s/old/new/g  replaces (g: every time, i: ignoring case, p: prints)\\n3d, /re/d, 2,5d  deletes lines     -n …p  prints only the chosen ones\\ny/abc/xyz/  transliterates     a text, i text, c text  appends, inserts, changes\\n=  line number   q  quits   h H g G x  hold space   b t :label  jumps\\nAddresses: n, $, /re/, a,b, a,+n, ! to negate, { … } to group.\\n-n  does not print lines by itself    -E  extended regular expressions    -i  edits the files\\nExamples: sed 's/red/blue/g' notes.txt    sed -n '1,5p' file    sed -i '/^#/d' conf.txt\",\"help.sed.summary\":\"Edits text line by line (substitutions, deletions…).\",\"help.diff.text\":\"-u  unified format (with 3 lines of context; -U N for N)\\n-q  only tells whether they differ\\n-i  ignoring case\\n-w  ignoring spaces, -b ignoring how many there are\\n-B  ignoring empty lines\\n-s  tells also when they are identical\\n\\\"-\\\" is the input. Status: 0 same, 1 different, 2 error.\",\"help.diff.summary\":\"Shows the differences between two files.\",\"help.uname.summary\":\"The name of the operating system.\",\"help.hostname.summary\":\"The name of the system.\",\"help.whoami.summary\":\"The name of the user.\",\"help.date.text\":\"Format: %Y year, %m month, %d day, %H:%M:%S time, %A day of the week, %B month, %s seconds since 1970, %F = %Y-%m-%d, %T = %H:%M:%S\\n-d @1700000000, -d 2026-01-01, -d yesterday\\nExample: date +%F\",\"help.date.summary\":\"Date and time.\",\"help.date.usage\":\"date [-u] [-d date] [+format]\",\"help.apps.summary\":\"Lists the installed apps (id, name, version).\",\"help.tag.text\":\"tag                lists the tags\\ntag ls Work        the items with the tag\\ntag show file      the tags of an item\\ntag add Work f     puts the tag (creates it if missing)\\ntag rm Work f      removes it\\ntag new name color creates a tag\\ntag delete name    deletes a tag\",\"help.tag.summary\":\"The tags of lilOS: lists, assigns, removes.\",\"help.tag.usage\":\"tag [ls [tag…] | show path… | add tag path… | rm tag path… | new name [color] | delete tag…]\",\"help.trash.text\":\"trash              lists what is in the trash\\ntrash put file     moves to the trash (like rm -r)\\ntrash restore name puts back\\ntrash rm name      deletes permanently\\ntrash empty        empties the trash\",\"help.trash.summary\":\"The trash: lists, puts back, empties.\",\"help.trash.usage\":\"trash [list | put path… | restore name… | rm name… | empty]\",\"help.open.text\":\"open notes.txt   opens with the default app\\nopen .   opens the directory in the File Manager\\nopen -a editor notes.txt   with a given app\\nopen -a photo   starts an app\",\"help.open.summary\":\"Opens files and directories with their app (or with the one given).\",\"help.open.usage\":\"open [-a app] path…\",\"arith.tooDeep\":\"expression recursion level exceeded\",\"arith.syntax\":\"{expr}: syntax error in expression (error token is \\\"{token}\\\")\",\"arith.end\":\"end\",\"arith.missingBracket\":\"{expr}: missing `]'\",\"arith.operandExpected\":\"{expr}: syntax error: operand expected\",\"arith.badBase\":\"{value}: invalid arithmetic base\",\"arith.tooGreatForBase\":\"{value}: value too great for base\",\"arith.invalid\":\"invalid expression\",\"arith.divisionByZero\":\"division by 0\",\"arith.negativeExponent\":\"exponent less than 0\",\"arith.unknownOperator\":\"unknown operator {op}\",\"expand.braceTooLarge\":\"brace expansion too large\",\"expand.badSubstitution\":\"{name}: bad substitution\",\"expand.unbound\":\"{name}: unbound variable\",\"expand.cannotAssign\":\"{name}: cannot assign in this way\",\"expand.nullOrNotSet\":\"parameter null or not set\",\"expand.negativeSubstring\":\"{count}: substring expression < 0\",\"opt.invalid\":\"invalid option -- '{option}'\",\"opt.longNeedsArgument\":\"option '--{name}' requires an argument\",\"opt.needsArgument\":\"option requires an argument -- '{option}'\",\"opt.badNumber\":\"invalid number: '{value}'\",\"regex.unmatchedBracket\":\"Unmatched [ in regular expression\",\"regex.invalid\":\"invalid regular expression: {pattern}\",\"appCmd.summary\":\"A command of the {app} app.\",\"appCmd.usage\":\"{name} [arguments…]\",\"printf.badNumber\":\"{value}: invalid number\",\"test.argumentExpected\":\"argument expected\",\"test.unexpectedArgument\":\"{arg}: unexpected argument\",\"test.missingBracket\":\"missing `]'\",\"cd.oldpwdNotSet\":\"OLDPWD not set\",\"local.onlyInFunction\":\"can only be used in a function\",\"set.badOptionName\":\"{name}: invalid option name\",\"set.badOption\":\"{option}: invalid option\",\"let.noExpression\":\"expression expected\",\"return.onlyInFunction\":\"can only `return' from a function or sourced script\",\"loop.onlyInLoop\":\"only meaningful in a `for', `while', or `until' loop\",\"loop.badCount\":\"{n}: loop count out of range\",\"alias.badName\":\"`{name}': invalid alias name\",\"which.builtIn\":\"{name}: built into the Terminal\",\"wait.notAJob\":\"{spec}: not a job of this shell\",\"fg.noSuchJob\":\"{job}: no such job\",\"fg.current\":\"current\",\"kill.noSuchJob\":\"{spec}: no such job or process\",\"sleep.missing\":\"missing operand\",\"sleep.badDuration\":\"invalid time interval '{value}'\",\"source.noFile\":\"filename argument required\",\"bash.noCommand\":\"-c: option requires an argument\",\"bash.already\":\"You are already in bash: for a script type \\\"bash file.sh\\\" or \\\"source file.sh\\\".\",\"type.alias\":\"{name} is aliased to `{value}'\",\"type.keyword\":\"{name} is a shell keyword\",\"type.function\":\"{name} is a function\",\"type.builtin\":\"{name} is a shell builtin\",\"type.appCommand\":\"{name} is a command of the {app} app\",\"type.command\":\"{name} is a Terminal command\",\"type.file\":\"{name} is {path}\",\"syntax.topic.variables\":\"variables\",\"syntax.topic.redirections\":\"redirections\",\"syntax.if\":\"if commands; then commands; [elif commands; then commands;] [else commands;] fi\\nRuns the branch of the first \\\"if\\\"/\\\"elif\\\" whose commands succeed (status 0).\\n  if [ -f notes.txt ]; then echo found; else echo missing; fi\",\"syntax.for\":\"for name in words…; do commands; done\\nfor (( init; condition; step )); do commands; done\\n  for f in *.txt; do wc -l \\\"$f\\\"; done\\n  for ((i = 1; i <= 3; i++)); do echo $i; done\",\"syntax.while\":\"while commands; do commands; done   (until: as long as the commands do NOT succeed)\\n  n=0; while [ $n -lt 3 ]; do echo $n; n=$((n + 1)); done\\n  ls | while read -r name; do echo \\\"- $name\\\"; done\",\"syntax.until\":\"until commands; do commands; done: repeats as long as the commands do not succeed.\",\"syntax.case\":\"case word in pattern|pattern) commands;; … esac\\nPatterns use * ? [ ]. \\\";&\\\" goes on into the next branch, \\\";;&\\\" tries the following patterns too.\\n  case \\\"$f\\\" in *.txt) echo text;; *.png|*.jpg) echo image;; *) echo other;; esac\",\"syntax.function\":\"name() { commands; }   or   function name { commands; }\\nThe arguments are $1, $2…, $@; \\\"local\\\" creates variables of the function, \\\"return n\\\" exits.\\n  greet() { echo \\\"Hello, $1\\\"; }; greet Eugenio\",\"syntax.cond\":\"[[ expression ]]: test without word splitting or expansion of *.\\n  [[ $name == *.txt ]]      comparison with a pattern\\n  [[ $s =~ ^[0-9]+$ ]]      regular expression (groups in BASH_REMATCH)\\n  [[ -d dir && ! -e file ]] -e -f -d -s -z -n, && || ! ( )\",\"syntax.arith\":\"(( expression )): integer arithmetic; status 0 if the result is not 0.\\n  (( n++ )); (( n > 3 )) && echo big; echo $(( 2 ** 10 ))\",\"syntax.variables\":\"name=value (no spaces), $name or ${name}. Arrays: a=(x y z), ${a[0]}, ${a[@]}, ${#a[@]}.\\n${v:-default} ${v:=default} ${v:+alt} ${#v} ${v#prefix} ${v%suffix} ${v/from/to} ${v//from/to} ${v:start:length} ${v^^} ${v,,}\\nSpecial: $? status of the last command, $$ the shell, $! the last command in the background, $# $@ $* the arguments.\",\"syntax.redirections\":\"> file (overwrites), >> file (appends), < file (reads), 2> errors, 2>&1, &> file, <<EOF … EOF, <<< text, | pipe.\\n/dev/null discards everything.\",\"files.cannotAccess\":\"cannot access '{path}': No such file or directory\",\"files.cannotCreate\":\"cannot create '{path}': No such file or directory\",\"files.overwriteFolder\":\"cannot overwrite directory '{name}' with non-directory\",\"files.missingDestination\":\"missing destination file operand after '{path}'\",\"files.targetNotFolder\":\"target '{path}' is not a directory\",\"files.cannotStat\":\"cannot stat '{path}': No such file or directory\",\"files.cannotRemove\":\"cannot remove '{path}': {reason}\",\"files.quotedNoSuchFile\":\"'{path}': No such file or directory\",\"mkdir.notAFolder\":\"cannot create directory '{path}': '{name}' exists and is not a directory\",\"mkdir.exists\":\"cannot create directory '{path}': File exists\",\"mkdir.noParent\":\"cannot create directory '{path}': No such file or directory\",\"mkdir.created\":\"created directory '{path}'\",\"cp.overwriteFile\":\"cannot overwrite non-directory '{name}' with directory\",\"cp.verbose\":\"'{from}' -> '{to}'\",\"cp.omitting\":\"-r not specified; omitting directory '{path}'\",\"cp.intoItself\":\"cannot copy a directory, '{path}', into itself\",\"mv.system\":\"cannot move '{path}': it is a system folder\",\"mv.intoItself\":\"cannot move '{path}' to a subdirectory of itself\",\"mv.notEmpty\":\"cannot move '{path}' to '{name}': Directory not empty\",\"mv.verbose\":\"renamed '{from}' -> '{to}'\",\"reason.noSuchFile\":\"No such file or directory\",\"reason.isADirectory\":\"Is a directory\",\"reason.notADirectory\":\"Not a directory\",\"reason.notEmpty\":\"Directory not empty\",\"reason.system\":\"it is a system folder\",\"reason.containsSystem\":\"it contains system folders\",\"rm.home\":\"it is dangerous to operate on '{path}': it is the home\",\"rm.purged\":\"permanently deleted '{path}'\",\"rm.trashed\":\"moved to the trash '{path}'\",\"rmdir.removed\":\"removed directory '{path}'\",\"stat.folder\":\"directory\",\"stat.appLink\":\"link to the app {app}\",\"stat.file\":\"regular file\",\"stat.emptyFile\":\"regular empty file\",\"stat.type\":\"Type: {type}\",\"stat.path\":\"Path: {path}\",\"stat.items\":\"Items: {n} ({total} in all)\",\"stat.size\":\"Size: {size} bytes ({human})\",\"stat.created\":\"Created: {date}\",\"stat.modified\":\"Modified: {date}\",\"stat.tags\":\"Tags: {tags}\",\"stat.system\":\"System folder\",\"find.missingArgument\":\"missing argument to `{name}'\",\"find.badType\":\"unknown argument to -type: {type} (f, d or l)\",\"find.badSize\":\"invalid -size argument '{value}'\",\"find.badValue\":\"invalid argument '{value}' to {option}\",\"find.cannotFind\":\"cannot find '{path}'\",\"find.execEnd\":\"missing end of `-exec' (`;' or `+')\",\"find.execCommand\":\"missing command of `-exec'\",\"find.unknownPredicate\":\"unknown predicate `{name}'\",\"find.unexpected\":\"unexpected argument: '{arg}'\",\"tree.folders\":{\"one\":\"{n} directory\",\"other\":\"{n} directories\"},\"tree.files\":{\"one\":\"{n} file\",\"other\":\"{n} files\"},\"ls.date\":\"{month} {day}\",\"wc.total\":\"total\",\"grep.noPattern\":\"missing pattern\\nUsage: grep [options] pattern [file…]\",\"sort.badKey\":\"invalid key: '{key}'\",\"sort.disorder\":\"-:{n}: disorder: {line}\",\"cut.badList\":\"invalid list: '{spec}'\",\"cut.noList\":\"you must specify a list of fields (-f) or characters (-c)\",\"cut.badDelimiter\":\"the delimiter must be a single character\",\"tr.reverseRange\":\"range-endpoints of '{range}' are in reverse collating sequence order\",\"tr.missingSet2\":\"missing operand after '{set}'\",\"seq.badArgument\":\"invalid floating point argument: '{value}'\",\"seq.zeroStep\":\"invalid Zero increment value: '0'\",\"xargs.unmatchedDouble\":\"unmatched double quote\",\"xargs.unmatchedSingle\":\"unmatched single quote\",\"xargs.badCount\":\"value for -n option should be >= 1\",\"sed.at\":\"-e expression #1, char {pos}: {message}\",\"sed.unterminated\":\"unterminated `s' command\",\"sed.badAddress\":\"invalid address\",\"sed.missingAddress\":\"missing second address\",\"sed.missingCommand\":\"missing command\",\"sed.unexpectedBrace\":\"unexpected `}'\",\"sed.badDelimiter\":\"invalid delimiter for `s'\",\"sed.yLengths\":\"strings for `y' command are different lengths\",\"sed.noLabel\":\"\\\":\\\" lacks a label\",\"sed.unknownCommand\":\"unknown command: `{cmd}'\",\"sed.unmatchedBrace\":\"unmatched `{'\",\"sed.noSuchLabel\":\"can't find label for jump to `{label}'\",\"sed.noPreviousRegex\":\"no previous regular expression\",\"sed.cannotRead\":\"can't read {path}: No such file or directory\",\"sed.noScript\":\"missing script\\nUsage: sed [-n] [-E] [-i] script [file…]\",\"sed.noFiles\":\"no input files to edit with -i\",\"diff.missingOperand\":\"missing operand after '{arg}'\",\"diff.extraOperand\":\"extra operand '{arg}'\",\"diff.identical\":\"Files {a} and {b} are identical\",\"diff.differ\":\"Files {a} and {b} differ\",\"diff.tooBig\":\"the files are too different and too large to compare\",\"open.noApp\":\"app not found: '{app}' (see \\\"apps\\\")\",\"trash.notInTrash\":\"'{name}' is not in the trash\",\"trash.empty\":\"The trash is empty.\",\"trash.deletedFolder\":\"(deleted folder)\",\"trash.items\":{\"one\":\"{n} item\",\"other\":\"{n} items\"},\"trash.missingPut\":\"missing what to move to the trash\",\"trash.cannotTrash\":\"{path}: cannot be moved to the trash (system folder)\",\"trash.missingRestore\":\"missing the name of what to put back\",\"trash.restored\":\"restored to {path}\",\"trash.missingName\":\"missing name\",\"trash.purged\":{\"one\":\"permanently deleted {n} item\",\"other\":\"permanently deleted {n} items\"},\"trash.emptied\":{\"one\":\"Trash emptied ({n} item).\",\"other\":\"Trash emptied ({n} items).\"},\"trash.alreadyEmpty\":\"The trash was already empty.\",\"tag.noSuchTag\":\"no such tag: '{name}' (see \\\"tag ls\\\")\",\"tag.none\":\"No tags. Create one with \\\"tag new name\\\".\",\"tag.hidden\":\"hidden\",\"tag.noTags\":\"no tags\",\"tag.usageAddRm\":\"tag {sub} name file…\",\"tag.created\":\"created tag '{name}'\",\"tag.system\":\"{path}: system items have no tags\",\"tag.usageNew\":\"tag new name [color]\",\"tag.createdShown\":\"created tag {tag}\",\"tag.usageDelete\":\"tag delete name…\",\"date.formatC\":\"%a %b %e %H:%M:%S %Y\",\"date.formatX\":\"%m/%d/%y\",\"date.format\":\"%a %b %e %H:%M:%S %Z %Y\",\"date.invalid\":\"invalid date '{date}'\",\"@actions.terminal.sshHere.label\":\"Open SSH terminal here\",\"help.ssh.summary\":\"open an SSH session in a new tab\",\"help.ssh.usage\":\"ssh [-p port] [-l user] [user@]host [command] | ssh <saved host>\",\"help.telnet.summary\":\"open a Telnet session in a new tab\",\"help.telnet.usage\":\"telnet [-l user] host [port] | telnet <saved host>\",\"help.rlogin.summary\":\"open an rlogin session in a new tab\",\"help.rlogin.usage\":\"rlogin [-l user] host | rlogin <saved host>\",\"help.supdup.summary\":\"open a SUPDUP session in a new tab\",\"help.supdup.usage\":\"supdup host [port] | supdup <saved host>\",\"help.sessions.summary\":\"the remote sessions still running; with a number, shows one in a tab\",\"help.sessions.usage\":\"sessions [n]\",\"remote.cmd.unavailable\":\"remote sessions are not available (lilOS has no module for them)\",\"remote.cmd.noModule\":\"{name}: lilOS has no module for it (an administrator installs {module} from the AppStore, Kernel tab)\",\"remote.cmd.opened\":\"Opened in a new tab: {name}\",\"remote.cmd.noUser\":\"ssh: a user is needed: user@host or -l user\",\"remote.cmd.noSession\":\"no running session «{name}» (see «sessions»)\",\"remote.cmd.shown\":\"Shown in a tab: {name}\",\"remote.cmd.shownNow\":\"shown in a window\",\"remote.cmd.closesIn\":{\"one\":\"closes in {n} minute\",\"other\":\"closes in {n} minutes\"},\"remote.cmd.none\":\"No remote session is running.\",\"remote.cmd.resumeHint\":\"«sessions <n>» shows one in a tab\",\"remote.tabs\":\"Tabs\",\"remote.screen\":\"Remote terminal\",\"remote.newShell\":\"New shell\",\"remote.activity\":\"New output\",\"remote.closeTab\":\"Close tab\",\"remote.closeSession\":\"Close (ends the session)\",\"remote.closeNamed\":\"Close {name}\",\"remote.notRemote\":\"it is not in a network connection\",\"remote.notSftp\":\"the SSH terminal opens only on SFTP connections\",\"remote.cannotReconnect\":\"this session cannot be opened again from here: open it again from the File Manager\",\"remote.unavailable\":\"The remote sessions cannot be reached: {error}\",\"remote.noProtocols\":\"lilOS has no module for remote sessions. An administrator can install ssh, term-telnet, term-rlogin or term-supdup from the AppStore (Kernel tab).\",\"remote.side.label\":\"Hosts and remote sessions\",\"remote.side.toggle\":\"Show or hide the hosts\",\"remote.side.hosts\":\"Hosts\",\"remote.side.connect\":\"Connect\",\"remote.side.open\":\"A session is open on this host\",\"remote.side.none\":\"No saved hosts. «ssh user@server» opens a session; + saves a host.\",\"remote.side.running\":\"Still running\",\"remote.side.elsewhere\":\"in another window\",\"remote.side.closesIn\":{\"one\":\"closes in {n} minute\",\"other\":\"closes in {n} minutes\"},\"remote.side.resume\":\"Resume\",\"remote.taken\":\"The session was opened in another window\",\"remote.takeBack\":\"Show it here\",\"remote.lostLink\":\"The link with lilOS dropped\",\"remote.attachAgain\":\"Attach again\",\"remote.secure\":\"Encrypted\",\"remote.insecure\":\"Not encrypted\",\"remote.insecureHint\":\"What you type, passwords included, goes over the network in clear\",\"remote.cipher\":\"Cipher: {cipher}\",\"remote.state.new\":\"Waiting\",\"remote.state.connecting\":\"Connecting…\",\"remote.state.on\":\"Connected\",\"remote.state.closed\":\"Closed\",\"remote.find\":\"Find (Ctrl+Shift+F)\",\"remote.record\":\"Record the session in a file\",\"remote.recordStop\":\"Stop recording\",\"remote.keys\":\"Keys\",\"remote.keys.send\":\"Send to the server:\",\"remote.keys.copy\":\"Copy\",\"remote.keys.paste\":\"Paste: Ctrl+Shift+V\",\"remote.keys.clear\":\"Clear the history\",\"remote.keys.disconnect\":\"Disconnect\",\"remote.signal.break\":\"Send Break\",\"remote.signal.interrupt\":\"Interrupt process\",\"remote.signal.ayt\":\"Are you there?\",\"remote.reconnect\":\"Reconnect\",\"remote.closed\":\"Connection closed\",\"remote.closedWhy\":\"Connection closed: {reason}\",\"remote.record.title\":\"Record the session\",\"remote.record.file\":\"File\",\"remote.record.hint\":\"A file in your home. It is written while you work; it stops at 8 MB.\",\"remote.record.colors\":\"Keep the color codes (to see it again as it was)\",\"remote.record.start\":\"Record\",\"remote.record.badPath\":\"The folder does not exist: write a path such as ~/Documenti/session.txt\",\"remote.record.exists\":\"«{name}» exists already: choose another name\",\"remote.record.full\":\"Recording stopped: «{path}» reached its size limit\",\"remote.record.failed\":\"The recording could not be saved: {error}\",\"remote.record.saved\":\"Session recorded in «{path}»\",\"remote.host.newTitle\":\"New host\",\"remote.host.editTitle\":\"Change the host\",\"remote.host.name\":\"Name\",\"remote.host.folder\":\"Folder\",\"remote.host.folderNone\":\"None\",\"remote.host.protocol\":\"Protocol\",\"remote.host.noProtocols\":\"No protocol available.\",\"remote.host.insecureTitle\":\"Connection not encrypted\",\"remote.host.insecureText\":\"What you type, passwords included, goes over the network in clear. Use it only on networks you trust or with devices that have no SSH.\",\"remote.host.remember\":\"Remember passwords and passphrases\",\"remote.host.keyUnreadable\":\"The key file cannot be read: {error}\",\"remote.host.advanced\":\"Advanced\",\"remote.host.term\":\"Terminal type\",\"remote.host.encoding\":\"Encoding\",\"remote.host.backspace\":\"Backspace sends\",\"remote.host.backspaceDel\":\"DEL (^?)\",\"remote.host.backspaceBs\":\"BS (^H)\",\"remote.host.delete\":\"Delete\",\"remote.host.save\":\"Save\",\"remote.host.saveConnect\":\"Save and connect\",\"@entrypoints.filePreview.label\":\"Previews of .term links\",\"@entrypoints.shell.label\":\"Shell for the Scheduler\",\"@commands.terminal.newShell.label\":\"New shell\",\"@commands.terminal.splitRight.label\":\"Split right\",\"@commands.terminal.splitDown.label\":\"Split down\",\"@commands.terminal.detach.label\":\"Detach tab into a new window\",\"@commands.terminal.broadcast.label\":\"Send input to all panes\",\"@commands.terminal.focusLeft.label\":\"Pane on the left\",\"@commands.terminal.focusRight.label\":\"Pane on the right\",\"@commands.terminal.focusUp.label\":\"Pane above\",\"@commands.terminal.focusDown.label\":\"Pane below\",\"@commands.terminal.previousTab.label\":\"Previous tab of the pane\",\"@commands.terminal.nextTab.label\":\"Next tab of the pane\",\"@commands.terminal.moveLeft.label\":\"Move tab to the left\",\"@commands.terminal.moveRight.label\":\"Move tab to the right\",\"@commands.terminal.moveUp.label\":\"Move tab up\",\"@commands.terminal.moveDown.label\":\"Move tab down\",\"@dependencies.ssh.reason\":\"Remote sessions over SSH, and Terminal commands on saved SSH hosts\",\"@dependencies.term-telnet.reason\":\"Remote sessions over Telnet\",\"@dependencies.term-rlogin.reason\":\"Remote sessions over rlogin\",\"@dependencies.term-supdup.reason\":\"Remote sessions over SUPDUP\",\"@dependencies.services-isolate.reason\":\"Scheduled Terminal commands in the kernel, with the operation's time limit and Cancel\",\"tabs.count\":{\"one\":\"{n} tab\",\"other\":\"{n} tabs\"},\"tabs.pane\":\"Pane {n} — {name}\",\"tabs.rename\":\"Rename…\",\"tabs.renameLabel\":\"Tab name\",\"tabs.renameHint\":\"Empty: the usual name (the folder, or the server).\",\"tabs.renameOk\":\"Rename\",\"tabs.duplicate\":\"Duplicate\",\"tabs.splitRight\":\"Split right\",\"tabs.splitDown\":\"Split down\",\"tabs.moveToPane\":\"Move to pane\",\"tabs.detach\":\"Detach into a new window\",\"tabs.moveToWindow\":\"Move to window\",\"tabs.newWindow\":\"New window\",\"tabs.saveTerm\":\"Save as link (.term)…\",\"tabs.addToDesk\":\"Add to desk\",\"tabs.copyAddress\":\"Copy address\",\"tabs.closeOthers\":\"Close other tabs\",\"tabs.closeRight\":\"Close tabs to the right\",\"grid.gutter\":\"Drag to resize the panes; double click: same size\",\"grid.broadcast\":\"Send input to all panes\",\"grid.broadcastOn\":\"Input to all panes\",\"grid.broadcastOff\":\"What you type goes to the tab shown in every pane. Click to turn it off.\",\"menu.title\":\"Terminal menu\",\"menu.openTerm\":\"Open link (.term)…\",\"menu.openTermTitle\":\"Open a terminal link\",\"drag.newWindow\":\"Drop to open {name} in a new window\",\"drag.pane\":\"Move to this pane\",\"drag.split.left\":\"New pane on the left\",\"drag.split.right\":\"New pane on the right\",\"drag.split.up\":\"New pane above\",\"drag.split.down\":\"New pane below\",\"file.invalid\":\"This is not a terminal link (.term) or it is damaged\",\"file.missing\":\"The link does not exist any more\",\"file.cannot\":\"This tab cannot become a link\",\"file.noFolder\":\"The folder {path} does not exist\",\"file.serverFolder\":\"The folder of the server must be a full path, such as /var/www\",\"file.exists\":\"There is already a file named {name} in that folder\",\"file.noPassword\":\"Type the password (or the key) to keep in the file\",\"file.onDesk\":\"{name} is on the desk\",\"file.saved\":\"Link saved: {path}\",\"file.saveTitle\":\"Save link\",\"file.name\":\"File name\",\"file.folder\":\"Folder\",\"file.change\":\"Change…\",\"file.pickFolder\":\"Where to save the link\",\"file.cwdLocal\":\"Start in the folder (optional)\",\"file.cwdRemote\":\"Folder of the server to start in (optional)\",\"file.command\":\"Command to run at the start (optional)\",\"file.commandRemote\":\"Command at start (optional)\",\"file.commandRemoteHint\":\"Runs instead of the shell of the server\",\"file.openAs\":\"When opened\",\"file.openDefault\":\"As in the Options ({how})\",\"file.keepPassword\":\"Keep the password in the file\",\"file.passwordSaved\":\"The password saved for this host goes in the file.\",\"file.passwordHint\":\"The password is encrypted: it works only for you, on this lilOS, for this server and user. For anyone else it is asked as usual.\",\"file.save\":\"Save\",\"file.command.title\":\"This link runs a command\",\"file.command.text\":\"«{name}» runs this command when it opens:\\n\\n{command}\\n\\nRun it only if you trust who made the link. Continue?\",\"options.open\":\"Options…\",\"options.title\":\"Terminal options\",\"options.tab.general\":\"General\",\"options.tab.generalDescription\":\"How Terminal opens links\",\"options.files\":\"Terminal links (.term)\",\"options.openTerm\":\"Open the links\",\"options.openTermDescription\":\"Where a .term file opens with a double click, when the file does not say it itself\",\"options.openTerm.window\":\"In a new window\",\"options.openTerm.tab\":\"In a tab of the open window\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Terminale\",\"@description\":\"Una shell simile a bash sui file di lilOS, in schede e riquadri affiancati, e sessioni remote: SSH, Telnet, rlogin e SUPDUP, con host salvati, collegamenti .term e sessioni che restano aperte anche a finestra chiusa.\",\"@entrypoints.main.params.cwd.label\":\"Cartella\",\"@entrypoints.main.params.cwd.description\":\"La cartella in cui aprire il terminale\",\"@automation.terminal.run.label\":\"Esegui un comando\",\"@automation.terminal.run.params.command.label\":\"Comando\",\"@automation.terminal.run.params.folder.label\":\"Cartella\",\"@automation.terminal.run.params.folder.description\":\"La cartella di lavoro in cui gira il comando\",\"@entrypoints.main.params.file.label\":\"Collegamento\",\"@entrypoints.main.params.file.description\":\"Un collegamento al terminale (.term) da aprire\",\"ui.title\":\"Terminale\",\"ui.commandLine\":\"Riga di comando\",\"ui.welcome\":\"Terminale di lilOS · «help» elenca i comandi\",\"automation.tooLong\":\"Comando troppo lungo da registrare\",\"automation.noCommand\":\"Nessun comando da eseguire\",\"automation.busy\":\"Il terminale sta eseguendo un altro comando\",\"automation.noFolder\":\"La cartella non c’è più\",\"automation.status\":\"Il comando è finito con lo stato {status}\",\"shell.defaultUser\":\"utente\",\"shell.readonly\":\"{name}: variabile in sola lettura\",\"shell.cannotUnset\":\"{name}: impossibile eliminare: variabile in sola lettura\",\"shell.badSubscript\":\"{index}: indice dell’array non valido\",\"shell.unknownConstruct\":\"costrutto sconosciuto: {type}\",\"shell.badRegex\":\"espressione regolare non valida\",\"shell.unaryExpected\":\"{op}: operatore unario atteso\",\"shell.integerExpected\":\"{value}: è attesa un’espressione intera\",\"shell.binaryExpected\":\"{op}: operatore binario atteso\",\"shell.commandNotFound\":\"{name}: comando non trovato\",\"shell.tooDeep\":\"{name}: troppi livelli di ricorsione\",\"shell.badFd\":\"{fd}: descrittore di file errato\",\"shell.fdExpected\":\"{target}: è richiesto un descrittore di file\",\"shell.ambiguousRedirect\":\"{target}: redirezione ambigua\",\"shell.isAppLink\":\"{path}: è un collegamento a un’app\",\"err.noSuchFile\":\"{path}: file o cartella inesistente\",\"err.isADirectory\":\"{path}: è una cartella\",\"err.notAFile\":\"{path}: non è un file\",\"err.missingParen\":\"manca «)»\",\"err.badIdentifier\":\"«{name}»: identificatore non valido\",\"err.numericArgument\":\"{value}: è richiesto un argomento numerico\",\"err.tooManyArguments\":\"troppi argomenti\",\"err.notADirectory\":\"{path}: non è una cartella\",\"err.notFound\":\"{name}: non trovato\",\"err.missingOperand\":\"manca l’operando\",\"err.unknownSubcommand\":\"sottocomando sconosciuto: «{sub}»\",\"parse.unexpectedEnd\":\"errore di sintassi: fine del testo inattesa\",\"parse.unexpectedEndOfFile\":\"errore di sintassi: fine del file inattesa\",\"parse.nearEnd\":\"fine del testo\",\"parse.nearNewline\":\"a capo\",\"parse.nearToken\":\"«{token}»\",\"parse.near\":\"errore di sintassi vicino a {near}\",\"parse.nearExpected\":\"errore di sintassi vicino a {near}: atteso «{expected}»\",\"parse.badFunctionName\":\"nome di funzione non valido\",\"parse.parenAfterName\":\"atteso «)» dopo il nome della funzione\",\"parse.aliasLoop\":\"alias espansi troppe volte\",\"parse.missingTarget\":\"errore di sintassi vicino a {near}: manca la destinazione di «{op}»\",\"parse.forBadName\":\"for: nome di variabile non valido\",\"parse.caseNoWord\":\"case: manca la parola\",\"parse.condNear\":\"errore di sintassi in [[ vicino a {near}\",\"parse.condNoOperand\":\"errore di sintassi in [[: manca un operando\",\"parse.condNoRegex\":\"errore di sintassi in [[: manca l’espressione regolare\",\"parse.badSubstitution\":\"sostituzione errata\",\"parse.badSubstitutionBrace\":\"sostituzione errata: manca «}»\",\"parse.backquotes\":\"errore di sintassi tra gli apici inversi\",\"jobs.done\":\"Fatto\",\"jobs.interrupted\":\"Interrotto\",\"jobs.exit\":\"Uscita {code}\",\"jobs.running\":\"In esecuzione\",\"help.usageLine\":\"Uso: {usage}\",\"help.usageShort\":\"uso: {usage}\",\"help.noHelp\":\"nessun aiuto per «{name}»\",\"help.intro\":\"Terminale di lilOS: una shell come bash sui file di lilOS.\\n«help comando» o «comando --help» spiega un comando; «help if», «help for», «help case»… la sintassi.\",\"help.syntaxList\":\"Sintassi: {list}\",\"help.sh.summary\":\"Come bash.\",\"help.sh.usage\":\"sh [-c comandi | script] [argomenti…]\",\"help.bash.text\":\"«bash script.sh a b» esegue lo script con $1=a, $2=b; «bash -c 'echo $1' nome x» esegue il testo; «cat script.sh | bash» legge lo script dall’input.\",\"help.bash.summary\":\"Esegue uno script o dei comandi in una nuova shell.\",\"help.bash.usage\":\"bash [-c comandi | script] [argomenti…]\",\"help.sleep.summary\":\"Aspetta: 5 (secondi), 0.5, 2m, 1h.\",\"help.sleep.usage\":\"sleep durata…\",\"help.kill.summary\":\"Interrompe dei comandi in background.\",\"help.kill.usage\":\"kill [-segnale] %job | pid…\",\"help.fg.summary\":\"Porta in primo piano un comando in background: lo si aspetta e Ctrl C lo interrompe.\",\"help.wait.summary\":\"Aspetta che finiscano i comandi in background (tutti, o quelli indicati).\",\"help.jobs.summary\":\"Elenca i comandi avviati in background con &.\",\"help.clear.summary\":\"Pulisce lo schermo (anche Ctrl L).\",\"help.help.summary\":\"Elenca i comandi, o spiega quello indicato.\",\"help.help.usage\":\"help [comando]\",\"help.history.summary\":\"Mostra i comandi dati (gli ultimi n); -c cancella la cronologia.\",\"help.which.summary\":\"Dice dove si trova un comando.\",\"help.which.usage\":\"which nome…\",\"help.command.summary\":\"Avvia un comando ignorando le funzioni con lo stesso nome; con -v dice cosa avvierebbe.\",\"help.command.usage\":\"command [-v] nome [argomenti…]\",\"help.type.summary\":\"Dice cos’è un nome: alias, parola chiave, funzione, comando.\",\"help.type.usage\":\"type [-t] nome…\",\"help.unalias.summary\":\"Elimina degli alias (tutti con -a).\",\"help.unalias.usage\":\"unalias [-a] nome…\",\"help.alias.text\":\"Esempio: alias ll='ls -l'. Gli alias valgono dalla riga successiva a quella che li definisce.\",\"help.alias.summary\":\"Definisce o mostra gli alias (nomi brevi per comandi).\",\"help.alias.usage\":\"alias [nome[=valore]…]\",\"help.eval.summary\":\"Esegue gli argomenti, uniti da spazi, come un comando.\",\"help.eval.usage\":\"eval [argomenti…]\",\"help.dot.summary\":\"Come source.\",\"help.dot.usage\":\". file [argomenti…]\",\"help.source.summary\":\"Esegue i comandi di un file in questa shell (variabili, funzioni e alias restano).\",\"help.source.usage\":\"source file [argomenti…]\",\"help.read.text\":\"-r  le barre rovesciate restano come sono\\n-p  mostra un prompt\\n-a  mette le parole in un array\\n-d  legge fino a questo carattere invece che fino all’a capo\\n-s  non mostra ciò che si scrive (per le password)\\nStato 1 alla fine dell’input.\",\"help.read.summary\":\"Legge una riga e la divide nelle variabili indicate ($REPLY senza nomi).\",\"help.read.usage\":\"read [-rs] [-p prompt] [-a array] [-d delim] [nome…]\",\"help.continue.summary\":\"Passa al giro successivo del ciclo (o dell’n-esimo ciclo esterno).\",\"help.break.summary\":\"Esce dal ciclo (o da n cicli).\",\"help.return.summary\":\"Esce dalla funzione (o dallo script letto con source).\",\"help.return.usage\":\"return [stato]\",\"help.exit.summary\":\"Chiude il terminale (o esce dallo script) con uno stato.\",\"help.exit.usage\":\"exit [stato]\",\"help.let.summary\":\"Calcola espressioni aritmetiche (stato 1 se l’ultima vale 0).\",\"help.let.usage\":\"let espressione…\",\"help.bracket.summary\":\"Come test, con una «]» finale.\",\"help.bracket.usage\":\"[ espressione ]\",\"help.test.text\":\"File: -e esiste, -f è un file, -d è una cartella, -s non è vuoto\\nTesto: -z vuoto, -n non vuoto, a = b, a != b\\nNumeri: -eq -ne -lt -le -gt -ge\\nInsieme: ! negazione, -a e, -o o, ( … )\",\"help.test.summary\":\"Valuta un’espressione: stato 0 se vera, 1 se falsa.\",\"help.test.usage\":\"test espressione\",\"help.colon.summary\":\"Non fa niente (stato 0); gli argomenti vengono comunque espansi.\",\"help.colon.usage\":\": [argomenti…]\",\"help.false.summary\":\"Non fa niente, senza successo (stato 1).\",\"help.true.summary\":\"Non fa niente, con successo (stato 0).\",\"help.shift.summary\":\"Sposta i parametri posizionali: $2 diventa $1…\",\"help.set.text\":\"-e  esce al primo comando che fallisce\\n-u  errore se si usa una variabile non impostata\\n-x  mostra i comandi prima di eseguirli\\n-f  niente espansione di * e ?\\n-o pipefail  una pipe fallisce se fallisce uno dei suoi comandi\\n+e, +u… le disattivano. Senza argomenti mostra tutte le variabili.\",\"help.set.summary\":\"Imposta le opzioni della shell e i parametri posizionali ($1, $2…).\",\"help.set.usage\":\"set [-euxf] [-o opzione] [--] [argomenti…]\",\"help.printenv.summary\":\"Mostra le variabili esportate (o il valore di quelle indicate).\",\"help.printenv.usage\":\"printenv [nome…]\",\"help.env.summary\":\"Mostra le variabili esportate, o avvia un comando con variabili in più.\",\"help.env.usage\":\"env [nome=valore…] [comando [argomenti…]]\",\"help.unset.summary\":\"Elimina variabili (o funzioni con -f).\",\"help.unset.usage\":\"unset [-fv] nome…\",\"help.typeset.summary\":\"Come declare.\",\"help.typeset.usage\":\"typeset [-aprxifF] [nome[=valore]…]\",\"help.declare.text\":\"-a array, -x esportata, -r sola lettura, -i intero (il valore si calcola), -p mostra, -f mostra le funzioni, -g globale dentro una funzione.\",\"help.declare.summary\":\"Dichiara variabili e ne mostra gli attributi.\",\"help.declare.usage\":\"declare [-aprxifF] [nome[=valore]…]\",\"help.local.summary\":\"Variabili visibili solo dentro la funzione.\",\"help.local.usage\":\"local [-arx] nome[=valore]…\",\"help.readonly.summary\":\"Rende le variabili di sola lettura.\",\"help.readonly.usage\":\"readonly [nome[=valore]…]\",\"help.export.text\":\"Senza argomenti elenca le variabili esportate. -n toglie l’esportazione.\",\"help.export.summary\":\"Rende le variabili visibili ai comandi e agli script avviati.\",\"help.export.usage\":\"export [-n] [nome[=valore]…]\",\"help.printf.text\":\"Il formato si riapplica finché restano argomenti. -v salva il risultato in una variabile.\",\"help.printf.summary\":\"Scrive gli argomenti secondo un formato (%s, %d, %5.2f, %x, %b, %q…).\",\"help.printf.usage\":\"printf [-v var] formato [argomenti…]\",\"help.echo.text\":\"-n  senza a capo finale\\n-e  interpreta \\\\n, \\\\t, \\\\\\\\, \\\\e… \\n-E  non le interpreta (predefinito)\",\"help.echo.summary\":\"Scrive gli argomenti, separati da uno spazio.\",\"help.echo.usage\":\"echo [-neE] [testo…]\",\"help.pwd.summary\":\"Mostra la cartella di lavoro.\",\"help.cd.text\":\"Senza argomenti va nella home ($HOME). «cd -» torna alla cartella precedente ($OLDPWD).\",\"help.cd.summary\":\"Cambia la cartella di lavoro.\",\"help.cd.usage\":\"cd [cartella]\",\"help.realpath.summary\":\"Il percorso completo.\",\"help.realpath.usage\":\"realpath [-m] percorso…\",\"help.dirname.summary\":\"Il percorso senza l’ultima parte.\",\"help.dirname.usage\":\"dirname percorso…\",\"help.basename.summary\":\"L’ultima parte di un percorso (senza il suffisso).\",\"help.basename.usage\":\"basename percorso [suffisso]\",\"help.tree.summary\":\"Mostra le cartelle ad albero.\",\"help.tree.usage\":\"tree [-adf] [-L livelli] [cartella…]\",\"help.find.text\":\"Test: -name modello, -iname, -path, -type f|d|l, -empty, -size [+-]n[ckMG], -mtime [+-]giorni, -mmin, -newer file\\nAzioni: -print, -print0, -delete (nel cestino), -exec comando {} \\\\; oppure +\\nOpzioni: -maxdepth n, -mindepth n. Insieme: ! (negazione), -o (o), ( … )\\nEsempio: find . -name \\\"*.txt\\\" -size +1k\",\"help.find.summary\":\"Cerca file e cartelle.\",\"help.find.usage\":\"find [percorso…] [espressione]\",\"help.stat.text\":\"-c  formato: %n nome, %s dimensione, %F tipo, %y data di modifica, %Y in secondi, %w %W creazione, %i id\",\"help.stat.summary\":\"Mostra i dettagli di file e cartelle.\",\"help.stat.usage\":\"stat [-c formato] percorso…\",\"help.rmdir.summary\":\"Rimuove cartelle vuote (nel cestino).\",\"help.rmdir.usage\":\"rmdir [-p] cartella…\",\"help.rm.text\":\"-r  anche le cartelle, con il loro contenuto\\n-d  le cartelle vuote\\n-f  nessun errore per ciò che non esiste\\n--purge  elimina definitivamente, senza cestino\\nCiò che va nel cestino si rimette a posto con «trash restore».\",\"help.rm.summary\":\"Sposta file e cartelle nel cestino (con --purge li elimina per sempre).\",\"help.rm.usage\":\"rm [-rfvd] [--purge] percorso…\",\"help.mv.text\":\"Se la destinazione è una cartella, ci sposta dentro; altrimenti rinomina. Un file sovrascritto va nel cestino.\\n-n  non sovrascrive\\n-v  dice cosa sposta\",\"help.mv.summary\":\"Sposta o rinomina file e cartelle.\",\"help.mv.usage\":\"mv [-nv] origine… destinazione\",\"help.cp.text\":\"-r  copia anche le cartelle, con il loro contenuto\\n-n  non sovrascrive i file che esistono\\n-v  dice cosa copia\",\"help.cp.summary\":\"Copia file e cartelle.\",\"help.cp.usage\":\"cp [-rnv] origine… destinazione\",\"help.touch.summary\":\"Crea dei file vuoti, o aggiorna la data di modifica di quelli che esistono.\",\"help.mkdir.text\":\"-p  crea anche le cartelle intermedie; nessun errore se esiste già\",\"help.mkdir.summary\":\"Crea delle cartelle.\",\"help.mkdir.usage\":\"mkdir [-pv] cartella…\",\"help.cat.text\":\"-n  numera le righe\\n-b  numera solo quelle non vuote\\n-s  una sola riga vuota di fila\\n-E  $ alla fine di ogni riga\",\"help.cat.summary\":\"Mostra il contenuto dei file (o dell’input), uno dopo l’altro.\",\"help.ls.text\":\"-l  dettagli (tipo, dimensione, data, tag)\\n-a  anche i nomi che iniziano con «.»\\n-h  dimensioni leggibili (1,2K)\\n-t  per data, -S per dimensione, -r al contrario\\n-1  uno per riga\\n-d  la cartella stessa, non il contenuto\\n-R  anche le sottocartelle\\n-F  / dopo le cartelle, @ dopo i collegamenti, * dopo gli script\",\"help.ls.summary\":\"Elenca il contenuto delle cartelle.\",\"help.ls.usage\":\"ls [-laAh1trSdRF] [percorso…]\",\"help.xargs.text\":\"-n N  al massimo N argomenti per volta\\n-I {}  un comando per riga, con {} sostituito dalla riga\\n-0  parole separate dal carattere nullo (find -print0)\\n-d C  parole separate da C\\n-t  mostra i comandi prima di avviarli\\n-r  non avvia niente se l’input è vuoto\\nEsempio: find . -name \\\"*.tmp\\\" | xargs rm\",\"help.xargs.summary\":\"Avvia un comando con le parole dell’input come argomenti.\",\"help.xargs.usage\":\"xargs [-n N] [-I {}] [-0] [-t] [comando [argomenti…]]\",\"help.yes.summary\":\"Ripete una riga all’infinito (y se non indicata): utile in una pipe.\",\"help.yes.usage\":\"yes [testo]\",\"help.seq.text\":\"-s S  separatore (a capo se non indicato)\\n-w  stessa larghezza, con zeri davanti\",\"help.seq.summary\":\"Scrive una sequenza di numeri.\",\"help.seq.usage\":\"seq [primo [passo]] ultimo\",\"help.nl.summary\":\"Numera le righe (non vuote, o tutte con -b a).\",\"help.rev.summary\":\"Scrive ogni riga al contrario.\",\"help.tr.text\":\"tr a-z A-Z  in maiuscolo\\ntr -d '\\\\r'  elimina i ritorni a capo di Windows\\ntr -s ' '  un solo spazio di fila\\nClassi: [:upper:] [:lower:] [:digit:] [:alpha:] [:alnum:] [:space:] [:punct:]\",\"help.tr.summary\":\"Sostituisce o elimina caratteri.\",\"help.tr.usage\":\"tr [-dsc] insieme1 [insieme2]\",\"help.cut.text\":\"-f 1,3  i campi 1 e 3 (separati da tab o da -d)\\n-d ,  il separatore\\n-c 1-5  i caratteri da 1 a 5\\n-s  solo le righe con il separatore\",\"help.cut.summary\":\"Estrae colonne da ogni riga.\",\"help.cut.usage\":\"cut -f campi [-d separatore] | -c caratteri [file…]\",\"help.tee.text\":\"-a  aggiunge in fondo invece di sovrascrivere\",\"help.tee.summary\":\"Copia l’input sia sull’output sia nei file.\",\"help.uniq.text\":\"-c  con il numero di ripetizioni\\n-d  solo le righe ripetute\\n-u  solo quelle uniche\\n-i  senza distinguere maiuscole e minuscole\",\"help.uniq.summary\":\"Toglie le righe ripetute una dopo l’altra (di solito dopo sort).\",\"help.sort.text\":\"-r  al contrario\\n-n  per numero\\n-h  per dimensione leggibile (2K, 1M)\\n-u  senza doppioni\\n-f  senza distinguere maiuscole e minuscole\\n-k N[,M]  per il campo N (fino a M)\\n-t C  campi separati da C\\n-V  numeri dentro il testo (file2 prima di file10)\\n-o file  scrive nel file\",\"help.sort.summary\":\"Ordina le righe.\",\"help.sort.usage\":\"sort [-rnufhV] [-k campo] [-t separatore] [file…]\",\"help.grep.text\":\"-i  senza distinguere maiuscole e minuscole\\n-v  le righe che NON corrispondono\\n-n  con il numero di riga\\n-c  conta le righe\\n-l  solo i nomi dei file\\n-r  cerca nelle cartelle\\n-w  parole intere, -x righe intere\\n-E  espressioni regolari estese (| + ? () senza barra)\\n-F  testo semplice, non espressione regolare\\n-o  solo la parte che corrisponde\\n-q  nessun risultato, solo lo stato\\n-A N, -B N, -C N  righe di contesto dopo, prima, intorno\\nStato: 0 trovato, 1 non trovato, 2 errore.\",\"help.grep.summary\":\"Cerca le righe che contengono un modello (espressione regolare).\",\"help.grep.usage\":\"grep [-ivnclrwxEFoqH] [-e modello] modello [file…]\",\"help.wc.text\":\"-l righe, -w parole, -c byte, -m caratteri, -L la riga più lunga\",\"help.wc.summary\":\"Conta righe, parole e byte.\",\"help.tail.text\":\"-n N  le ultime N righe (-n +N: dalla riga N in poi)\\n-c N  gli ultimi N caratteri\",\"help.tail.summary\":\"Le ultime righe (10 se non indicato).\",\"help.tail.usage\":\"tail [-n righe] [-c byte] [file…]\",\"help.head.text\":\"-n N  le prime N righe (-n -N: tutte tranne le ultime N)\\n-c N  i primi N caratteri\\n-5 è come -n 5\",\"help.head.summary\":\"Le prime righe (10 se non indicato).\",\"help.head.usage\":\"head [-n righe] [-c byte] [file…]\",\"help.sed.text\":\"s/vecchio/nuovo/g  sostituisce (g: tutte le volte, i: senza maiuscole, p: stampa)\\n3d, /re/d, 2,5d  elimina righe     -n …p  stampa solo quelle scelte\\ny/abc/xyz/  traslittera     a testo, i testo, c testo  aggiunge, inserisce, cambia\\n=  numero di riga   q  esce   h H g G x  spazio di riserva   b t :etichetta  salti\\nIndirizzi: n, $, /re/, a,b, a,+n, ! per negare, { … } per raggruppare.\\n-n  non stampa le righe da sola    -E  espressioni regolari estese    -i  modifica i file\\nEsempi: sed 's/rosso/blu/g' note.txt    sed -n '1,5p' file    sed -i '/^#/d' conf.txt\",\"help.sed.summary\":\"Modifica il testo riga per riga (sostituzioni, cancellazioni…).\",\"help.diff.text\":\"-u  formato unificato (con 3 righe di contesto; -U N per N)\\n-q  dice solo se sono diversi\\n-i  senza distinguere maiuscole e minuscole\\n-w  ignorando gli spazi, -b ignorando quanti sono\\n-B  ignorando le righe vuote\\n-s  dice anche quando sono identici\\n«-» è l’input. Stato: 0 uguali, 1 diversi, 2 errore.\",\"help.diff.summary\":\"Mostra le differenze tra due file.\",\"help.uname.summary\":\"Il nome del sistema operativo.\",\"help.hostname.summary\":\"Il nome del sistema.\",\"help.whoami.summary\":\"Il nome dell’utente.\",\"help.date.text\":\"Formato: %Y anno, %m mese, %d giorno, %H:%M:%S ora, %A giorno della settimana, %B mese, %s secondi dal 1970, %F = %Y-%m-%d, %T = %H:%M:%S\\n-d @1700000000, -d 2026-01-01, -d ieri\\nEsempio: date +%F\",\"help.date.summary\":\"Data e ora.\",\"help.date.usage\":\"date [-u] [-d data] [+formato]\",\"help.apps.summary\":\"Elenca le app installate (id, nome, versione).\",\"help.tag.text\":\"tag                elenca i tag\\ntag ls Lavoro      gli elementi con il tag\\ntag show file      i tag di un elemento\\ntag add Lavoro f   mette il tag (lo crea se non c’è)\\ntag rm Lavoro f    lo toglie\\ntag new nome blu   crea un tag\\ntag delete nome    elimina un tag\",\"help.tag.summary\":\"I tag di lilOS: elenca, assegna, toglie.\",\"help.tag.usage\":\"tag [ls [tag…] | show percorso… | add tag percorso… | rm tag percorso… | new nome [colore] | delete tag…]\",\"help.trash.text\":\"trash              elenca ciò che è nel cestino\\ntrash put file     sposta nel cestino (come rm -r)\\ntrash restore nome rimette a posto\\ntrash rm nome      elimina definitivamente\\ntrash empty        svuota il cestino\",\"help.trash.summary\":\"Il cestino: elenca, rimette a posto, svuota.\",\"help.trash.usage\":\"trash [list | put percorso… | restore nome… | rm nome… | empty]\",\"help.open.text\":\"open note.txt   apre con l’app predefinita\\nopen .   apre la cartella nel File Manager\\nopen -a editor note.txt   con un’app precisa\\nopen -a photo   avvia un’app\",\"help.open.summary\":\"Apre file e cartelle con la loro app (o con quella indicata).\",\"help.open.usage\":\"open [-a app] percorso…\",\"arith.tooDeep\":\"espressione: troppi livelli di ricorsione\",\"arith.syntax\":\"{expr}: errore di sintassi nell’espressione (simbolo errato «{token}»)\",\"arith.end\":\"fine\",\"arith.missingBracket\":\"{expr}: manca «]»\",\"arith.operandExpected\":\"{expr}: errore di sintassi nell’espressione (operando atteso)\",\"arith.badBase\":\"{value}: base non valida\",\"arith.tooGreatForBase\":\"{value}: valore troppo grande per la base\",\"arith.invalid\":\"espressione non valida\",\"arith.divisionByZero\":\"divisione per zero\",\"arith.negativeExponent\":\"esponente negativo\",\"arith.unknownOperator\":\"operatore sconosciuto {op}\",\"expand.braceTooLarge\":\"espansione delle graffe troppo grande\",\"expand.badSubstitution\":\"{name}: sostituzione errata\",\"expand.unbound\":\"{name}: variabile non impostata\",\"expand.cannotAssign\":\"{name}: impossibile assegnare in questo modo\",\"expand.nullOrNotSet\":\"parametro nullo o non impostato\",\"expand.negativeSubstring\":\"{count}: espressione di sottostringa < 0\",\"opt.invalid\":\"opzione non valida -- «{option}»\",\"opt.longNeedsArgument\":\"l’opzione «--{name}» richiede un argomento\",\"opt.needsArgument\":\"l’opzione richiede un argomento -- «{option}»\",\"opt.badNumber\":\"numero non valido: «{value}»\",\"regex.unmatchedBracket\":\"«[» senza «]» nell’espressione regolare\",\"regex.invalid\":\"espressione regolare non valida: {pattern}\",\"appCmd.summary\":\"Comando dell’app {app}.\",\"appCmd.usage\":\"{name} [argomenti…]\",\"printf.badNumber\":\"{value}: è richiesto un numero\",\"test.argumentExpected\":\"manca un argomento\",\"test.unexpectedArgument\":\"{arg}: argomento inatteso\",\"test.missingBracket\":\"manca «]»\",\"cd.oldpwdNotSet\":\"OLDPWD non impostata\",\"local.onlyInFunction\":\"si può usare solo in una funzione\",\"set.badOptionName\":\"{name}: nome di opzione non valido\",\"set.badOption\":\"{option}: opzione non valida\",\"let.noExpression\":\"manca l’espressione\",\"return.onlyInFunction\":\"si può usare solo in una funzione o in uno script letto con source\",\"loop.onlyInLoop\":\"ha senso solo in un ciclo for, while o until\",\"loop.badCount\":\"{n}: numero di cicli non valido\",\"alias.badName\":\"«{name}»: nome di alias non valido\",\"which.builtIn\":\"{name}: comando integrato nel Terminale\",\"wait.notAJob\":\"{spec}: non è un job di questa shell\",\"fg.noSuchJob\":\"{job}: job inesistente\",\"fg.current\":\"attuale\",\"kill.noSuchJob\":\"{spec}: job o processo inesistente\",\"sleep.missing\":\"manca la durata\",\"sleep.badDuration\":\"durata non valida: «{value}»\",\"source.noFile\":\"manca il nome del file\",\"bash.noCommand\":\"-c: manca il testo dei comandi\",\"bash.already\":\"Sei già in bash: per uno script scrivi «bash file.sh» o «source file.sh».\",\"type.alias\":\"{name} è un alias di «{value}»\",\"type.keyword\":\"{name} è una parola chiave della shell\",\"type.function\":\"{name} è una funzione\",\"type.builtin\":\"{name} è un comando interno della shell\",\"type.appCommand\":\"{name} è un comando dell’app {app}\",\"type.command\":\"{name} è un comando del Terminale\",\"type.file\":\"{name} è {path}\",\"syntax.topic.variables\":\"variabili\",\"syntax.topic.redirections\":\"redirezioni\",\"syntax.if\":\"if comandi; then comandi; [elif comandi; then comandi;] [else comandi;] fi\\nEsegue il ramo del primo «if»/«elif» i cui comandi riescono (stato 0).\\n  if [ -f note.txt ]; then echo c’è; else echo manca; fi\",\"syntax.for\":\"for nome in parole…; do comandi; done\\nfor (( inizio; condizione; passo )); do comandi; done\\n  for f in *.txt; do wc -l \\\"$f\\\"; done\\n  for ((i = 1; i <= 3; i++)); do echo $i; done\",\"syntax.while\":\"while comandi; do comandi; done   (until: finché i comandi NON riescono)\\n  n=0; while [ $n -lt 3 ]; do echo $n; n=$((n + 1)); done\\n  ls | while read -r nome; do echo \\\"- $nome\\\"; done\",\"syntax.until\":\"until comandi; do comandi; done: ripete finché i comandi non riescono.\",\"syntax.case\":\"case parola in modello|modello) comandi;; … esac\\nI modelli usano * ? [ ]. «;&» prosegue nel ramo dopo, «;;&» prova anche i modelli successivi.\\n  case \\\"$f\\\" in *.txt) echo testo;; *.png|*.jpg) echo immagine;; *) echo altro;; esac\",\"syntax.function\":\"nome() { comandi; }   oppure   function nome { comandi; }\\nGli argomenti sono $1, $2…, $@; «local» crea variabili della funzione, «return n» esce.\\n  saluta() { echo \\\"Ciao, $1\\\"; }; saluta Eugenio\",\"syntax.cond\":\"[[ espressione ]]: test senza divisione in parole né espansione di *.\\n  [[ $nome == *.txt ]]      confronto con un modello\\n  [[ $s =~ ^[0-9]+$ ]]      espressione regolare (gruppi in BASH_REMATCH)\\n  [[ -d dir && ! -e file ]] -e -f -d -s -z -n, && || ! ( )\",\"syntax.arith\":\"(( espressione )): aritmetica intera; stato 0 se il risultato non è 0.\\n  (( n++ )); (( n > 3 )) && echo grande; echo $(( 2 ** 10 ))\",\"syntax.variables\":\"nome=valore (senza spazi), $nome o ${nome}. Array: a=(x y z), ${a[0]}, ${a[@]}, ${#a[@]}.\\n${v:-predefinito} ${v:=predefinito} ${v:+alt} ${#v} ${v#prefisso} ${v%suffisso} ${v/da/a} ${v//da/a} ${v:inizio:lunghezza} ${v^^} ${v,,}\\nSpeciali: $? stato dell’ultimo comando, $$ la shell, $! l’ultimo comando in background, $# $@ $* gli argomenti.\",\"syntax.redirections\":\"> file (sovrascrive), >> file (aggiunge), < file (legge), 2> errori, 2>&1, &> file, <<EOF … EOF, <<< testo, | pipe.\\n/dev/null scarta tutto.\",\"files.cannotAccess\":\"impossibile accedere a «{path}»: file o cartella inesistente\",\"files.cannotCreate\":\"impossibile creare «{path}»: file o cartella inesistente\",\"files.overwriteFolder\":\"impossibile sovrascrivere la cartella «{name}» con un file\",\"files.missingDestination\":\"manca la destinazione dopo «{path}»\",\"files.targetNotFolder\":\"la destinazione «{path}» non è una cartella\",\"files.cannotStat\":\"impossibile fare stat di «{path}»: file o cartella inesistente\",\"files.cannotRemove\":\"impossibile rimuovere «{path}»: {reason}\",\"files.quotedNoSuchFile\":\"«{path}»: file o cartella inesistente\",\"mkdir.notAFolder\":\"impossibile creare la cartella «{path}»: «{name}» esiste e non è una cartella\",\"mkdir.exists\":\"impossibile creare la cartella «{path}»: il file esiste\",\"mkdir.noParent\":\"impossibile creare la cartella «{path}»: file o cartella inesistente\",\"mkdir.created\":\"creata la cartella «{path}»\",\"cp.overwriteFile\":\"impossibile sovrascrivere «{name}», che non è una cartella, con una cartella\",\"cp.verbose\":\"«{from}» -> «{to}»\",\"cp.omitting\":\"-r non specificato; si omette la cartella «{path}»\",\"cp.intoItself\":\"impossibile copiare la cartella «{path}» dentro se stessa\",\"mv.system\":\"impossibile spostare «{path}»: è una cartella di sistema\",\"mv.intoItself\":\"impossibile spostare «{path}» in una sua sottocartella\",\"mv.notEmpty\":\"impossibile spostare «{path}» su «{name}»: la cartella non è vuota\",\"mv.verbose\":\"rinominato «{from}» -> «{to}»\",\"reason.noSuchFile\":\"file o cartella inesistente\",\"reason.isADirectory\":\"è una cartella\",\"reason.notADirectory\":\"non è una cartella\",\"reason.notEmpty\":\"la cartella non è vuota\",\"reason.system\":\"è una cartella di sistema\",\"reason.containsSystem\":\"contiene cartelle di sistema\",\"rm.home\":\"è pericoloso agire su «{path}»: è la home\",\"rm.purged\":\"eliminato definitivamente «{path}»\",\"rm.trashed\":\"spostato nel cestino «{path}»\",\"rmdir.removed\":\"rimossa la cartella «{path}»\",\"stat.folder\":\"cartella\",\"stat.appLink\":\"collegamento all’app {app}\",\"stat.file\":\"file\",\"stat.emptyFile\":\"file vuoto\",\"stat.type\":\"Tipo: {type}\",\"stat.path\":\"Percorso: {path}\",\"stat.items\":\"Elementi: {n} ({total} in tutto)\",\"stat.size\":\"Dimensione: {size} byte ({human})\",\"stat.created\":\"Creato: {date}\",\"stat.modified\":\"Modificato: {date}\",\"stat.tags\":\"Tag: {tags}\",\"stat.system\":\"Cartella di sistema\",\"find.missingArgument\":\"manca l’argomento di «{name}»\",\"find.badType\":\"tipo sconosciuto per -type: «{type}» (f, d o l)\",\"find.badSize\":\"dimensione non valida: «{value}»\",\"find.badValue\":\"valore non valido per {option}: «{value}»\",\"find.cannotFind\":\"impossibile trovare «{path}»\",\"find.execEnd\":\"manca la fine di «-exec» («;» o «+»)\",\"find.execCommand\":\"manca il comando di «-exec»\",\"find.unknownPredicate\":\"predicato sconosciuto: «{name}»\",\"find.unexpected\":\"argomento inatteso: «{arg}»\",\"tree.folders\":{\"one\":\"{n} cartella\",\"other\":\"{n} cartelle\"},\"tree.files\":{\"one\":\"{n} file\",\"other\":\"{n} file\"},\"ls.date\":\"{day} {month}\",\"wc.total\":\"totale\",\"grep.noPattern\":\"manca il modello da cercare\\nUso: grep [opzioni] modello [file…]\",\"sort.badKey\":\"chiave non valida: «{key}»\",\"sort.disorder\":\"-:{n}: disordine: {line}\",\"cut.badList\":\"elenco non valido: «{spec}»\",\"cut.noList\":\"indicare un elenco di campi (-f) o di caratteri (-c)\",\"cut.badDelimiter\":\"il delimitatore deve essere un solo carattere\",\"tr.reverseRange\":\"intervallo al contrario: «{range}»\",\"tr.missingSet2\":\"manca il secondo insieme dopo «{set}»\",\"seq.badArgument\":\"argomento non valido: «{value}»\",\"seq.zeroStep\":\"il passo non può essere 0\",\"xargs.unmatchedDouble\":\"virgolette doppie non chiuse\",\"xargs.unmatchedSingle\":\"virgolette singole non chiuse\",\"xargs.badCount\":\"il numero di argomenti deve essere almeno 1\",\"sed.at\":\"-e espressione #1, carattere {pos}: {message}\",\"sed.unterminated\":\"comando «s» non terminato\",\"sed.badAddress\":\"indirizzo non valido\",\"sed.missingAddress\":\"manca il secondo indirizzo\",\"sed.missingCommand\":\"manca il comando\",\"sed.unexpectedBrace\":\"«}» inatteso\",\"sed.badDelimiter\":\"delimitatore non valido per «s»\",\"sed.yLengths\":\"le stringhe di «y» hanno lunghezze diverse\",\"sed.noLabel\":\"«:» senza etichetta\",\"sed.unknownCommand\":\"comando sconosciuto: «{cmd}»\",\"sed.unmatchedBrace\":\"manca «}»\",\"sed.noSuchLabel\":\"etichetta inesistente per un salto: «{label}»\",\"sed.noPreviousRegex\":\"nessuna espressione regolare precedente\",\"sed.cannotRead\":\"impossibile leggere {path}: file o cartella inesistente\",\"sed.noScript\":\"manca lo script\\nUso: sed [-n] [-E] [-i] script [file…]\",\"sed.noFiles\":\"nessun file da modificare con -i\",\"diff.missingOperand\":\"manca un operando dopo «{arg}»\",\"diff.extraOperand\":\"operando in più: «{arg}»\",\"diff.identical\":\"I file {a} e {b} sono identici\",\"diff.differ\":\"I file {a} e {b} sono diversi\",\"diff.tooBig\":\"i file sono troppo diversi e troppo grandi da confrontare\",\"open.noApp\":\"app non trovata: «{app}» (vedi «apps»)\",\"trash.notInTrash\":\"«{name}» non è nel cestino\",\"trash.empty\":\"Il cestino è vuoto.\",\"trash.deletedFolder\":\"(cartella eliminata)\",\"trash.items\":{\"one\":\"{n} elemento\",\"other\":\"{n} elementi\"},\"trash.missingPut\":\"manca cosa mettere nel cestino\",\"trash.cannotTrash\":\"{path}: non si può cestinare (cartella di sistema)\",\"trash.missingRestore\":\"manca il nome di ciò che va rimesso a posto\",\"trash.restored\":\"rimesso in {path}\",\"trash.missingName\":\"manca il nome\",\"trash.purged\":{\"one\":\"eliminato definitivamente {n} elemento\",\"other\":\"eliminati definitivamente {n} elementi\"},\"trash.emptied\":{\"one\":\"Cestino svuotato ({n} elemento).\",\"other\":\"Cestino svuotato ({n} elementi).\"},\"trash.alreadyEmpty\":\"Il cestino era già vuoto.\",\"tag.noSuchTag\":\"tag inesistente: «{name}» (vedi «tag ls»)\",\"tag.none\":\"Nessun tag. Creane uno con «tag new nome».\",\"tag.hidden\":\"nascosto\",\"tag.noTags\":\"nessun tag\",\"tag.usageAddRm\":\"tag {sub} nome file…\",\"tag.created\":\"creato il tag «{name}»\",\"tag.system\":\"{path}: gli elementi di sistema non hanno tag\",\"tag.usageNew\":\"tag new nome [colore]\",\"tag.createdShown\":\"creato il tag {tag}\",\"tag.usageDelete\":\"tag delete nome…\",\"date.formatC\":\"%a %e %b %Y, %H:%M:%S\",\"date.formatX\":\"%d/%m/%Y\",\"date.format\":\"%a %e %b %Y, %H:%M:%S %Z\",\"date.invalid\":\"data non valida: «{date}»\",\"@actions.terminal.sshHere.label\":\"Apri terminale SSH qui\",\"help.ssh.summary\":\"apre una sessione SSH in una scheda nuova\",\"help.ssh.usage\":\"ssh [-p porta] [-l utente] [utente@]host [comando] | ssh <host salvato>\",\"help.telnet.summary\":\"apre una sessione Telnet in una scheda nuova\",\"help.telnet.usage\":\"telnet [-l utente] host [porta] | telnet <host salvato>\",\"help.rlogin.summary\":\"apre una sessione rlogin in una scheda nuova\",\"help.rlogin.usage\":\"rlogin [-l utente] host | rlogin <host salvato>\",\"help.supdup.summary\":\"apre una sessione SUPDUP in una scheda nuova\",\"help.supdup.usage\":\"supdup host [porta] | supdup <host salvato>\",\"help.sessions.summary\":\"le sessioni remote ancora aperte; con un numero, ne mostra una in una scheda\",\"help.sessions.usage\":\"sessions [n]\",\"remote.cmd.unavailable\":\"le sessioni remote non sono disponibili (lilOS non ha i loro moduli)\",\"remote.cmd.noModule\":\"{name}: lilOS non ha il suo modulo (un amministratore installa {module} dall’AppStore, scheda Kernel)\",\"remote.cmd.opened\":\"Aperta in una scheda nuova: {name}\",\"remote.cmd.noUser\":\"ssh: serve un utente: utente@host oppure -l utente\",\"remote.cmd.noSession\":\"nessuna sessione aperta «{name}» (vedi «sessions»)\",\"remote.cmd.shown\":\"Mostrata in una scheda: {name}\",\"remote.cmd.shownNow\":\"mostrata in una finestra\",\"remote.cmd.closesIn\":{\"one\":\"si chiude tra {n} minuto\",\"other\":\"si chiude tra {n} minuti\"},\"remote.cmd.none\":\"Nessuna sessione remota aperta.\",\"remote.cmd.resumeHint\":\"«sessions <n>» ne mostra una in una scheda\",\"remote.tabs\":\"Schede\",\"remote.screen\":\"Terminale remoto\",\"remote.newShell\":\"Nuova shell\",\"remote.activity\":\"Nuovo output\",\"remote.closeTab\":\"Chiudi scheda\",\"remote.closeSession\":\"Chiudi (termina la sessione)\",\"remote.closeNamed\":\"Chiudi {name}\",\"remote.notRemote\":\"non è in una connessione di rete\",\"remote.notSftp\":\"il terminale SSH si apre solo sulle connessioni SFTP\",\"remote.cannotReconnect\":\"questa sessione non si riapre da qui: aprila di nuovo dal File Manager\",\"remote.unavailable\":\"Le sessioni remote non rispondono: {error}\",\"remote.noProtocols\":\"lilOS non ha moduli per le sessioni remote. Un amministratore può installare ssh, term-telnet, term-rlogin o term-supdup dall’AppStore (scheda Kernel).\",\"remote.side.label\":\"Host e sessioni remote\",\"remote.side.toggle\":\"Mostra o nascondi gli host\",\"remote.side.hosts\":\"Host\",\"remote.side.connect\":\"Connetti\",\"remote.side.open\":\"C’è una sessione aperta su questo host\",\"remote.side.none\":\"Nessun host salvato. «ssh utente@server» apre una sessione; + salva un host.\",\"remote.side.running\":\"Ancora attive\",\"remote.side.elsewhere\":\"in un’altra finestra\",\"remote.side.closesIn\":{\"one\":\"si chiude tra {n} minuto\",\"other\":\"si chiude tra {n} minuti\"},\"remote.side.resume\":\"Riprendi\",\"remote.taken\":\"La sessione è stata aperta in un’altra finestra\",\"remote.takeBack\":\"Mostrala qui\",\"remote.lostLink\":\"Il collegamento con lilOS si è interrotto\",\"remote.attachAgain\":\"Ricollega\",\"remote.secure\":\"Cifrata\",\"remote.insecure\":\"Non cifrata\",\"remote.insecureHint\":\"Quello che scrivi, password comprese, passa in chiaro sulla rete\",\"remote.cipher\":\"Cifratura: {cipher}\",\"remote.state.new\":\"In attesa\",\"remote.state.connecting\":\"Connessione…\",\"remote.state.on\":\"Connessa\",\"remote.state.closed\":\"Chiusa\",\"remote.find\":\"Cerca (Ctrl+Maiusc+F)\",\"remote.record\":\"Registra la sessione in un file\",\"remote.recordStop\":\"Ferma la registrazione\",\"remote.keys\":\"Tasti\",\"remote.keys.send\":\"Manda al server:\",\"remote.keys.copy\":\"Copia\",\"remote.keys.paste\":\"Incolla: Ctrl+Maiusc+V\",\"remote.keys.clear\":\"Cancella lo storico\",\"remote.keys.disconnect\":\"Disconnetti\",\"remote.signal.break\":\"Invia Break\",\"remote.signal.interrupt\":\"Interrompi il processo\",\"remote.signal.ayt\":\"Ci sei? (AYT)\",\"remote.reconnect\":\"Riconnetti\",\"remote.closed\":\"Connessione chiusa\",\"remote.closedWhy\":\"Connessione chiusa: {reason}\",\"remote.record.title\":\"Registra la sessione\",\"remote.record.file\":\"File\",\"remote.record.hint\":\"Un file nella tua home. Viene scritto mentre lavori; si ferma a 8 MB.\",\"remote.record.colors\":\"Anche con i codici di colore (per rivederla com’era)\",\"remote.record.start\":\"Registra\",\"remote.record.badPath\":\"La cartella non esiste: scrivi un percorso come ~/Documenti/sessione.txt\",\"remote.record.exists\":\"«{name}» esiste già: scegli un altro nome\",\"remote.record.full\":\"Registrazione fermata: «{path}» ha raggiunto la dimensione massima\",\"remote.record.failed\":\"La registrazione non si salva: {error}\",\"remote.record.saved\":\"Sessione registrata in «{path}»\",\"remote.host.newTitle\":\"Nuovo host\",\"remote.host.editTitle\":\"Modifica l’host\",\"remote.host.name\":\"Nome\",\"remote.host.folder\":\"Cartella\",\"remote.host.folderNone\":\"Nessuna\",\"remote.host.protocol\":\"Protocollo\",\"remote.host.noProtocols\":\"Nessun protocollo disponibile.\",\"remote.host.insecureTitle\":\"Connessione non cifrata\",\"remote.host.insecureText\":\"Quello che scrivi, password comprese, passa in chiaro sulla rete. Usala solo su reti di cui ti fidi o con apparati che non hanno SSH.\",\"remote.host.remember\":\"Ricorda password e passphrase\",\"remote.host.keyUnreadable\":\"Il file della chiave non si legge: {error}\",\"remote.host.advanced\":\"Avanzate\",\"remote.host.term\":\"Tipo di terminale\",\"remote.host.encoding\":\"Codifica\",\"remote.host.backspace\":\"Backspace manda\",\"remote.host.backspaceDel\":\"DEL (^?)\",\"remote.host.backspaceBs\":\"BS (^H)\",\"remote.host.delete\":\"Elimina\",\"remote.host.save\":\"Salva\",\"remote.host.saveConnect\":\"Salva e connetti\",\"@entrypoints.filePreview.label\":\"Anteprime dei collegamenti .term\",\"@entrypoints.shell.label\":\"Shell per la Pianificazione\",\"@commands.terminal.newShell.label\":\"Nuova shell\",\"@commands.terminal.splitRight.label\":\"Dividi a destra\",\"@commands.terminal.splitDown.label\":\"Dividi in basso\",\"@commands.terminal.detach.label\":\"Stacca la scheda in una nuova finestra\",\"@commands.terminal.broadcast.label\":\"Invia l’input a tutti i riquadri\",\"@commands.terminal.focusLeft.label\":\"Riquadro a sinistra\",\"@commands.terminal.focusRight.label\":\"Riquadro a destra\",\"@commands.terminal.focusUp.label\":\"Riquadro sopra\",\"@commands.terminal.focusDown.label\":\"Riquadro sotto\",\"@commands.terminal.previousTab.label\":\"Scheda precedente del riquadro\",\"@commands.terminal.nextTab.label\":\"Scheda successiva del riquadro\",\"@commands.terminal.moveLeft.label\":\"Sposta la scheda a sinistra\",\"@commands.terminal.moveRight.label\":\"Sposta la scheda a destra\",\"@commands.terminal.moveUp.label\":\"Sposta la scheda in alto\",\"@commands.terminal.moveDown.label\":\"Sposta la scheda in basso\",\"@dependencies.ssh.reason\":\"Sessioni remote via SSH, e comandi del Terminale sugli host SSH salvati\",\"@dependencies.term-telnet.reason\":\"Sessioni remote via Telnet\",\"@dependencies.term-rlogin.reason\":\"Sessioni remote via rlogin\",\"@dependencies.term-supdup.reason\":\"Sessioni remote via SUPDUP\",\"@dependencies.services-isolate.reason\":\"Comandi del Terminale pianificati nel kernel, con il tempo massimo dell’operazione e Annulla\",\"tabs.count\":{\"one\":\"{n} scheda\",\"other\":\"{n} schede\"},\"tabs.pane\":\"Riquadro {n} — {name}\",\"tabs.rename\":\"Rinomina…\",\"tabs.renameLabel\":\"Nome della scheda\",\"tabs.renameHint\":\"Vuoto: il nome solito (la cartella, o il server).\",\"tabs.renameOk\":\"Rinomina\",\"tabs.duplicate\":\"Duplica\",\"tabs.splitRight\":\"Dividi a destra\",\"tabs.splitDown\":\"Dividi in basso\",\"tabs.moveToPane\":\"Sposta nel riquadro\",\"tabs.detach\":\"Stacca in una nuova finestra\",\"tabs.moveToWindow\":\"Sposta nella finestra\",\"tabs.newWindow\":\"Nuova finestra\",\"tabs.saveTerm\":\"Salva come collegamento (.term)…\",\"tabs.addToDesk\":\"Aggiungi alla scrivania\",\"tabs.copyAddress\":\"Copia indirizzo\",\"tabs.closeOthers\":\"Chiudi le altre schede\",\"tabs.closeRight\":\"Chiudi le schede a destra\",\"grid.gutter\":\"Trascina per cambiare la misura dei riquadri; doppio clic: uguali\",\"grid.broadcast\":\"Invia l’input a tutti i riquadri\",\"grid.broadcastOn\":\"Input a tutti i riquadri\",\"grid.broadcastOff\":\"Quello che scrivi va alla scheda mostrata in ogni riquadro. Clic per spegnerlo.\",\"menu.title\":\"Menu di Terminale\",\"menu.openTerm\":\"Apri un collegamento (.term)…\",\"menu.openTermTitle\":\"Apri un collegamento al terminale\",\"drag.newWindow\":\"Rilascia per aprire {name} in una finestra nuova\",\"drag.pane\":\"Sposta in questo riquadro\",\"drag.split.left\":\"Nuovo riquadro a sinistra\",\"drag.split.right\":\"Nuovo riquadro a destra\",\"drag.split.up\":\"Nuovo riquadro sopra\",\"drag.split.down\":\"Nuovo riquadro sotto\",\"file.invalid\":\"Non è un collegamento al terminale (.term) o è rovinato\",\"file.missing\":\"Il collegamento non esiste più\",\"file.cannot\":\"Questa scheda non può diventare un collegamento\",\"file.noFolder\":\"La cartella {path} non esiste\",\"file.serverFolder\":\"La cartella del server va scritta per intero, per esempio /var/www\",\"file.exists\":\"C’è già un file {name} in quella cartella\",\"file.noPassword\":\"Scrivi la password (o la chiave) da salvare nel file\",\"file.onDesk\":\"{name} è sulla scrivania\",\"file.saved\":\"Collegamento salvato: {path}\",\"file.saveTitle\":\"Salva collegamento\",\"file.name\":\"Nome del file\",\"file.folder\":\"Cartella\",\"file.change\":\"Cambia…\",\"file.pickFolder\":\"Dove salvare il collegamento\",\"file.cwdLocal\":\"Parti dalla cartella (facoltativo)\",\"file.cwdRemote\":\"Cartella del server in cui entrare (facoltativo)\",\"file.command\":\"Comando da eseguire all’avvio (facoltativo)\",\"file.commandRemote\":\"Comando all’avvio (facoltativo)\",\"file.commandRemoteHint\":\"Parte al posto della shell del server\",\"file.openAs\":\"All’apertura\",\"file.openDefault\":\"Come nelle Opzioni ({how})\",\"file.keepPassword\":\"Salva la password nel file\",\"file.passwordSaved\":\"Nel file va la password salvata per questo host.\",\"file.passwordHint\":\"La password è cifrata: vale solo per te, su questo lilOS, per questo server e utente. A chiunque altro viene chiesta come al solito.\",\"file.save\":\"Salva\",\"file.command.title\":\"Questo collegamento esegue un comando\",\"file.command.text\":\"«{name}» all’apertura esegue questo comando:\\n\\n{command}\\n\\nEseguilo solo se ti fidi di chi ha fatto il collegamento. Continuare?\",\"options.open\":\"Opzioni…\",\"options.title\":\"Opzioni di Terminale\",\"options.tab.general\":\"Generale\",\"options.tab.generalDescription\":\"Come Terminale apre i collegamenti\",\"options.files\":\"Collegamenti al terminale (.term)\",\"options.openTerm\":\"Apri i collegamenti\",\"options.openTermDescription\":\"Dove si apre un file .term con il doppio clic, quando il file non lo dice da sé\",\"options.openTerm.window\":\"In una finestra nuova\",\"options.openTerm.tab\":\"In una scheda della finestra aperta\"}}")
}), { t: j } = A, ae = [
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
], oe = /* @__PURE__ */ new Set([
	"|",
	"&",
	";",
	"<",
	">",
	"(",
	")"
]), se = [
	"then",
	"else",
	"elif",
	"fi",
	"do",
	"done",
	"esac",
	"}"
], ce = /* @__PURE__ */ new Set([
	")",
	";;",
	";&",
	";;&"
]), le = /* @__PURE__ */ new Set([
	"export",
	"local",
	"declare",
	"typeset",
	"readonly"
]), ue = [
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
], de = /^([A-Za-z_]\w*)(?:\[([^\]]*)\])?(\+?)=/, fe = /(\d+)?(&>>|<<<|<<-|<<|>>|<&|>&|<>|>\||&>|<|>)/y, pe = 100, M = (e) => e === " " || e === "	" || e === "\r", me = (e) => e === void 0 || M(e) || e === "\n" || oe.has(e), he = (e) => M(e) || e === "\n" || oe.has(e);
function ge(e, { aliases: t = null } = {}) {
	return new ye(e, t).program();
}
function* _e(e, { aliases: t = null } = {}) {
	yield* new ye(e, t).lines();
}
function ve(e) {
	return { parts: new ye(String(e), null).readParts({ stop: () => !1 }) };
}
var ye = class e {
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
		throw this.eof ? new D(e) : new O(e);
	}
	near() {
		return this.eof ? j("parse.nearEnd") : this.ch === "\n" ? j("parse.nearNewline") : j("parse.nearToken", { token: this.peekOp() ?? this.src.slice(this.pos).match(/^\S{1,20}/)?.[0] ?? this.ch });
	}
	skipBlanks() {
		for (;;) {
			let e = this.ch;
			if (M(e)) this.pos++;
			else if (e === "\\" && this.src[this.pos + 1] === "\n") this.pos += 2;
			else if (e === "\\" && this.pos === this.src.length - 1) throw new D();
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
		return ae.find((e) => this.starts(e)) ?? null;
	}
	atKeyword(e) {
		if (!this.starts(e)) return !1;
		let t = this.src[this.pos + e.length];
		return e === "{" || e === "!" || e === "[[" ? t === void 0 || M(t) || t === "\n" : me(t);
	}
	keyword(e) {
		this.linebreak(), this.atKeyword(e) || this.fail(j("parse.nearExpected", {
			near: this.near(),
			expected: e
		})), this.pos += e.length;
	}
	atTerminator() {
		if (this.eof) return !0;
		let e = this.peekOp();
		return e && ce.has(e) ? !0 : se.some((e) => this.atKeyword(e));
	}
	program() {
		let e = this.list();
		if (this.linebreak(), !this.eof) throw new O(j("parse.near", { near: this.near() }));
		if (this.heredocs.length) throw new D();
		return e;
	}
	*lines() {
		for (;;) {
			if (this.linebreak(), this.eof) {
				if (this.heredocs.length) throw new D();
				return;
			}
			let e = [];
			for (;;) {
				if (this.atTerminator()) throw new O(j("parse.near", { near: this.near() }));
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
					throw new O(j("parse.near", { near: this.near() }));
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
				}), this.linebreak(), !this.atTerminator()) throw new O(j("parse.near", { near: this.near() }));
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
			if (this.pos += 2, this.linebreak(), this.eof) throw new D();
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
			if (this.pos += e.length, n.push(e === "|&"), this.linebreak(), this.eof) throw new D();
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
		if (this.skipBlanks(), this.eof) throw new D();
		let e = this.pos, t;
		if (this.starts("((") && (t = this.arithCommand())) return this.redirects(t);
		let n = this.peekOp();
		if (n === "(") {
			this.pos++;
			let e = this.list();
			return this.linebreak(), this.ch !== ")" && this.fail(j("parse.nearExpected", {
				near: this.near(),
				expected: ")"
			})), this.pos++, this.redirects({
				type: "subshell",
				body: e
			});
		}
		if (n && !n.startsWith("<") && !n.startsWith(">") && n !== "&>" && n !== "&>>") throw new O(j("parse.near", { near: j("parse.nearToken", { token: n }) }));
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
			return n || this.fail(j("parse.badFunctionName")), this.pos += n.length, this.skipBlanks(), this.starts("(") && (this.pos++, this.skipBlanks(), this.ch !== ")" && this.fail(j("parse.parenAfterName")), this.pos++), this.funcBody(n, e);
		}
		let r = /([A-Za-z_][\w.:-]*)[ \t]*\([ \t]*\)/y;
		r.lastIndex = this.pos;
		let i = r.exec(this.src);
		if (i) return this.pos += i[0].length, this.funcBody(i[1], e);
		if (se.some((e) => this.atKeyword(e))) throw new O(j("parse.near", { near: this.near() }));
		return this.simple();
	}
	funcBody(e, t) {
		if (this.linebreak(), this.eof) throw new D();
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
			let i = this.src.slice(n, this.pos), a = de.exec(i);
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
			} else a && t && (r.noSplit = !0), e.words.push(r), e.words.length === 1 && (t = r.parts.length === 1 && r.parts[0].type === "lit" && le.has(r.parts[0].value));
		}
		if (this.aliasActive.clear(), !e.words.length && !e.assigns.length && !e.redirs.length) throw new O(j("parse.near", { near: this.near() }));
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
			if (this.linebreak(), this.eof) throw new D();
			if (this.ch === ")") {
				this.pos++;
				break;
			}
			let e = this.word();
			if (!e) throw new O(j("parse.near", { near: this.near() }));
			n.array.push(e);
		}
		else n.value = this.word() ?? { parts: [] };
		return n;
	}
	expandAlias() {
		let e = /[^\s|&;<>()'"\\$`]+/y;
		e.lastIndex = this.pos;
		let t = e.exec(this.src)?.[0];
		if (!t || !me(this.src[this.pos + t.length])) return !1;
		let n = this.aliases.get(t);
		if (n == null || this.aliasActive.has(t)) return !1;
		if (++this.aliasCount > pe) throw new O(j("parse.aliasLoop"));
		return this.aliasActive.add(t), this.src = this.src.slice(0, this.pos) + n + this.src.slice(this.pos + t.length), !0;
	}
	redirect(e) {
		fe.lastIndex = this.pos;
		let t = fe.exec(this.src);
		if (!t) return !1;
		this.pos += t[0].length;
		let n = t[2], r = t[1] == null ? null : Number(t[1]);
		this.skipBlanks();
		let i = this.pos, a = this.word();
		a || this.fail(j("parse.missingTarget", {
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
			if (this.eof) throw new D();
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
				init: ve(e),
				cond: ve(t),
				step: ve(n),
				body: r
			};
		}
		let e = /[A-Za-z_]\w*/y;
		e.lastIndex = this.pos;
		let t = e.exec(this.src)?.[0];
		t && me(this.src[this.pos + t.length]) || this.fail(j("parse.forBadName")), this.pos += t.length;
		let n = null;
		if (this.linebreak(), this.atKeyword("in")) for (this.pos += 2, n = [];;) {
			if (this.skipBlanks(), this.eof) throw new D();
			if (this.ch === ";" || this.ch === "\n") break;
			let e = this.word();
			if (!e) throw new O(j("parse.near", { near: this.near() }));
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
		throw new D();
	}
	caseClause() {
		this.pos += 4, this.skipBlanks();
		let e = this.word();
		e || this.fail(j("parse.caseNoWord")), this.keyword("in");
		let t = [];
		for (;;) {
			if (this.linebreak(), this.eof) throw new D();
			if (this.atKeyword("esac")) {
				this.pos += 4;
				break;
			}
			this.ch === "(" && this.pos++;
			let e = [];
			for (;;) {
				this.skipBlanks();
				let t = this.word();
				if (t || this.fail(j("parse.near", { near: this.near() })), e.push(t), this.skipBlanks(), this.ch !== "|") break;
				this.pos++;
			}
			this.ch !== ")" && this.fail(j("parse.nearExpected", {
				near: this.near(),
				expected: ")"
			})), this.pos++;
			let n = this.list();
			this.skipBlanks();
			let r = this.peekOp(), i = ";;";
			r === ";;" || r === ";&" || r === ";;&" ? (this.pos += r.length, i = r) : (this.linebreak(), this.atKeyword("esac") || this.fail(j("parse.nearExpected", {
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
				word: ve(this.rawUntilDoubleParen())
			};
		} catch (t) {
			if (!(t instanceof D) || (this.pos = e, !this.src.includes(")", e))) throw t;
			return null;
		}
	}
	condCommand() {
		this.pos += 2;
		let e = this.condOr();
		return this.linebreak(), this.starts("]]") || this.fail(j("parse.condNear", { near: this.near() })), this.pos += 2, {
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
		if (this.linebreak(), this.eof) throw new D();
		if (this.ch === "(") {
			this.pos++;
			let e = this.condOr();
			return this.linebreak(), this.ch !== ")" && this.fail(j("parse.condNear", { near: this.near() })), this.pos++, e;
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
		let r = ue.find((e) => this.starts(e) && (e[0] !== "-" || me(this.src[this.pos + e.length])));
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
		this.starts("]]") && this.fail(j("parse.condNoOperand"));
		let e = this.word();
		return e || this.fail(j("parse.condNear", { near: this.near() })), e;
	}
	regexWord() {
		let e = 0, t = this.readParts({ stop: (t) => {
			if (t === "(") e++;
			else if (t === ")") {
				if (e === 0) return !0;
				e--;
			}
			return e === 0 && (M(t) || t === "\n" || t === ";" || t === "&");
		} });
		return t.length || this.fail(j("parse.condNoRegex")), { parts: t };
	}
	word() {
		let e = this.readParts({ stop: he });
		return e.length ? { parts: e } : null;
	}
	readParts({ stop: e = he, dq: t = !1, heredoc: n = !1 } = {}) {
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
					throw new D();
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
				if (e < 0) throw new D();
				a(), r.push({
					type: "sq",
					value: this.src.slice(this.pos + 1, e)
				}), this.pos = e + 1;
			} else if (o && s === "\"") {
				a(), this.pos++;
				let e = this.readParts({ dq: !0 });
				if (this.ch !== "\"") throw new D();
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
			if (this.eof) throw new D();
			this.pos = e;
		}
		if (e === "(") {
			this.pos += 2;
			let e = this.list();
			if (this.linebreak(), this.eof) throw new D();
			if (this.ch !== ")") throw new O(j("parse.nearExpected", {
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
		if (n || this.fail(j("parse.badSubstitution")), e.name = n, this.pos += n.length, this.ch === "[") {
			let t = this.src.indexOf("]", this.pos);
			if (t < 0) throw new D();
			e.index = this.src.slice(this.pos + 1, t), this.pos = t + 1;
		}
		let r = this.ch;
		if (r === "}" || e.length) return this.ch !== "}" && this.fail(j("parse.badSubstitution")), this.pos++, e;
		if (r === ":") {
			let t = this.src[this.pos + 1];
			"-=?+".includes(t) && t ? (e.op = ":" + t, this.pos += 2, e.arg = this.braceWord("}")) : (e.op = "substr", this.pos++, e.offset = this.braceWord(":}"), this.ch === ":" && (this.pos++, e.count = this.braceWord("}")));
		} else "-=?+".includes(r) ? (e.op = r, this.pos++, e.arg = this.braceWord("}")) : r === "#" || r === "%" || r === "^" || r === "," ? (e.op = this.src[this.pos + 1] === r ? r + r : r, this.pos += e.op.length, e.arg = this.braceWord("}")) : r === "/" ? (this.pos++, e.op = "/", "/#%".includes(this.ch) && (e.op += this.ch, this.pos++), e.arg = this.braceWord("/}"), this.ch === "/" ? (this.pos++, e.replace = this.braceWord("}")) : e.replace = { parts: [] }) : this.fail(j("parse.badSubstitution"));
		return this.ch !== "}" && this.fail(j("parse.badSubstitutionBrace")), this.pos++, e;
	}
	braceWord(e) {
		let t = 0, n = this.readParts({ stop: (n) => {
			if (n === "{") t++;
			else if (n === "}" && t > 0) return t--, !1;
			return t === 0 && e.includes(n);
		} });
		if (this.eof) throw new D();
		return { parts: n };
	}
	backtick(t) {
		let n = "";
		for (this.pos++;;) {
			if (this.eof) throw new D();
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
			throw e instanceof D ? new O(j("parse.backquotes")) : e;
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
			if (this.eof) throw new D();
			let n = this.ch;
			if (n === "'") return this.pos++, e;
			if (n !== "\\") {
				e += n, this.pos++;
				continue;
			}
			let r = this.src[this.pos + 1];
			if (r === void 0) throw new D();
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
}, be = /* @__PURE__ */ "**=.<<=.>>=.**.<<.>>.<=.>=.==.!=.&&.||.++.--.+=.-=.*=./=.%=.&=.^=.|=.+.-.*./.%.<.>.=.!.~.&.^.|.?.:.(.).,".split("."), xe = /* @__PURE__ */ new Set([
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
]), Se = [
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
], N = (e) => BigInt.asIntN(64, e), Ce = 32;
function we(e, t, n = 0) {
	if (n > Ce) throw new k(A.t("arith.tooDeep"));
	let r = Te(String(e));
	if (!r.length) return 0n;
	let i = {
		tokens: r,
		i: 0,
		text: e
	}, a = De(i);
	if (i.i < r.length) throw P(i);
	return Fe(a, t, n);
}
var P = (e) => new k(A.t("arith.syntax", {
	expr: String(e.text).trim(),
	token: e.tokens[e.i]?.v ?? A.t("arith.end")
}));
function Te(e) {
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
				if (i >= e.length) throw new k(A.t("arith.missingBracket", { expr: e.trim() }));
				r = e.slice(n + 1, i), n = i + 1;
			}
			t.push({
				t: "var",
				v: i[0],
				index: r
			});
			continue;
		}
		let o = be.find((t) => e.startsWith(t, n));
		if (!o) throw new k(A.t("arith.syntax", {
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
var Ee = (e) => e.tokens[e.i], F = (e, ...t) => Ee(e)?.t === "op" && t.includes(Ee(e).v), I = (e) => e.tokens[e.i++];
function De(e) {
	let t = L(e);
	for (; F(e, ",");) I(e), t = {
		k: "comma",
		a: t,
		b: L(e)
	};
	return t;
}
function L(e) {
	let t = e.i, n = Ee(e);
	return n?.t === "var" && e.tokens[e.i + 1]?.t === "op" && xe.has(e.tokens[e.i + 1].v) ? (e.i += 2, {
		k: "assign",
		name: n.v,
		index: n.index,
		op: e.tokens[t + 1].v,
		value: L(e)
	}) : Oe(e);
}
function Oe(e) {
	let t = ke(e, 0);
	if (!F(e, "?")) return t;
	I(e);
	let n = L(e);
	if (!F(e, ":")) throw P(e);
	return I(e), {
		k: "ternary",
		cond: t,
		yes: n,
		no: L(e)
	};
}
function ke(e, t) {
	if (t >= Se.length) return Ae(e);
	let n = ke(e, t + 1);
	for (; F(e, ...Se[t]);) n = {
		k: "bin",
		op: I(e).v,
		a: n,
		b: ke(e, t + 1)
	};
	return n;
}
function Ae(e) {
	let t = je(e);
	return F(e, "**") ? (I(e), {
		k: "bin",
		op: "**",
		a: t,
		b: Ae(e)
	}) : t;
}
function je(e) {
	if (F(e, "!", "~", "+", "-")) return {
		k: "unary",
		op: I(e).v,
		a: je(e)
	};
	if (F(e, "++", "--")) {
		let t = I(e).v, n = I(e);
		if (n?.t !== "var") throw P(e);
		return {
			k: "pre",
			op: t,
			name: n.v,
			index: n.index
		};
	}
	return Me(e);
}
function Me(e) {
	let t = I(e);
	if (!t) throw new k(A.t("arith.operandExpected", { expr: String(e.text).trim() }));
	if (t.t === "num") return {
		k: "num",
		v: t.v
	};
	if (t.t === "var") return F(e, "++", "--") ? {
		k: "post",
		op: I(e).v,
		name: t.v,
		index: t.index
	} : {
		k: "var",
		name: t.v,
		index: t.index
	};
	if (t.v === "(") {
		let t = De(e);
		if (!F(e, ")")) throw P(e);
		return I(e), t;
	}
	throw e.i--, P(e);
}
function Ne(e) {
	let t = String(e);
	if (/^0[xX]/.test(t)) return BigInt(t);
	let n = /^(\d+)#(.+)$/.exec(t);
	if (n) {
		let e = Number(n[1]);
		if (e < 2 || e > 64) throw new k(A.t("arith.badBase", { value: t }));
		let r = 0n;
		for (let i of n[2]) {
			let n = /\d/.test(i) ? +i : /[a-z]/.test(i) ? i.charCodeAt(0) - 87 : /[A-Z]/.test(i) ? e <= 36 ? i.charCodeAt(0) - 55 : i.charCodeAt(0) - 29 : i === "@" ? 62 : 63;
			if (n >= e) throw new k(A.t("arith.tooGreatForBase", { value: t }));
			r = r * BigInt(e) + BigInt(n);
		}
		return N(r);
	}
	if (/^0[0-7]+$/.test(t)) return N(BigInt("0o" + t.slice(1)));
	if (/^0\d+$/.test(t)) throw new k(A.t("arith.tooGreatForBase", { value: t }));
	return N(BigInt(t));
}
function Pe(e, t, n, r) {
	let i = String(e.get(t, n == null ? null : String(we(n, e, r + 1))) ?? "").trim();
	return i ? /^-?\d+$/.test(i) ? N(BigInt(i)) : we(i, e, r + 1) : 0n;
}
function Fe(e, t, n) {
	let r = (e) => Fe(e, t, n), i = (e) => e.index == null ? null : String(we(e.index, t, n + 1));
	switch (e.k) {
		case "num": return Ne(e.v);
		case "var": return Pe(t, e.name, e.index, n);
		case "comma": return r(e.a), r(e.b);
		case "ternary": return r(e.cond) === 0n ? r(e.no) : r(e.yes);
		case "unary": {
			let t = r(e.a);
			return e.op === "!" ? t === 0n ? 1n : 0n : e.op === "~" ? N(~t) : e.op === "-" ? N(-t) : t;
		}
		case "pre":
		case "post": {
			let r = i(e), a = Pe(t, e.name, r ?? null, n), o = N(e.op === "++" ? a + 1n : a - 1n);
			return t.set(e.name, r, String(o)), e.k === "pre" ? o : a;
		}
		case "assign": {
			let a = i(e), o = r(e.value);
			return e.op !== "=" && (o = Ie(e.op.slice(0, -1), Pe(t, e.name, a, n), o)), t.set(e.name, a, String(o)), o;
		}
		case "bin": return e.op === "&&" ? r(e.a) !== 0n && r(e.b) !== 0n ? 1n : 0n : e.op === "||" ? r(e.a) !== 0n || r(e.b) !== 0n ? 1n : 0n : Ie(e.op, r(e.a), r(e.b));
	}
	throw new k(A.t("arith.invalid"));
}
function Ie(e, t, n) {
	switch (e) {
		case "+": return N(t + n);
		case "-": return N(t - n);
		case "*": return N(t * n);
		case "/":
		case "%":
			if (n === 0n) throw new k(A.t("arith.divisionByZero"));
			return N(e === "/" ? t / n : t % n);
		case "**":
			if (n < 0n) throw new k(A.t("arith.negativeExponent"));
			for (var r = 1n; n > 0n; n >>= 1n, t = N(t * t)) n & 1n && (r = N(r * t));
			return r;
		case "<<": return N(t << (n & 63n));
		case ">>": return N(t >> (n & 63n));
		case "&": return N(t & n);
		case "|": return N(t | n);
		case "^": return N(t ^ n);
		case "<": return t < n ? 1n : 0n;
		case "<=": return t <= n ? 1n : 0n;
		case ">": return t > n ? 1n : 0n;
		case ">=": return t >= n ? 1n : 0n;
		case "==": return t === n ? 1n : 0n;
		case "!=": return t === n ? 0n : 1n;
	}
	throw new k(A.t("arith.unknownOperator", { op: e }));
}
// src/shared/text.js
var Le = (e) => String(e).replace(/[.*+?^${}()|[\]\\/]/g, "\\$&"), Re = {
	alpha: "a-zA-Z",
	digit: "0-9",
	alnum: "a-zA-Z0-9",
	upper: "A-Z",
	lower: "a-z",
	space: "s",
	blank: " 	",
	punct: "!-/:-@[-`{-~",
	xdigit: "0-9A-Fa-f",
	word: "w",
	cntrl: "\0-",
	print: " -~",
	graph: "!-~"
}, ze = /* @__PURE__ */ new Map(), Be = (e) => String(e).replace(/[\\*?[\]]/g, "\\$&");
function Ve(e) {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (n === "\\") t++;
		else if (n === "*" || n === "?") return !0;
		else if (n === "[" && He(e, t) > 0) return !0;
	}
	return !1;
}
function He(e, t) {
	let n = t + 1;
	for ((e[n] === "!" || e[n] === "^") && n++, e[n] === "]" && n++; n < e.length; n++) if (e[n] === "\\") n++;
	else if (e[n] === "[" && e[n + 1] === ":") {
		let t = e.indexOf(":]", n + 2);
		t > 0 && (n = t + 1);
	} else if (e[n] === "]") return n;
	return -1;
}
function Ue(e) {
	let t = "";
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === "\\") n + 1 < e.length ? t += Le(e[++n]) : t += "\\\\";
		else if (r === "*") t += "[\\s\\S]*";
		else if (r === "?") t += "[\\s\\S]";
		else if (r === "[" && He(e, n) > 0) {
			let r = He(e, n), i = n + 1, a = "";
			for ((e[i] === "!" || e[i] === "^") && (a += "^", i++); i < r; i++) {
				let t = e[i];
				if (t === "[" && e[i + 1] === ":") {
					let t = e.indexOf(":]", i + 2), n = e.slice(i + 2, t);
					a += Re[n] ?? "", i = t + 1;
				} else t === "\\" ? a += "\\" + (e[++i] ?? "\\") : t === "-" && i > n + 1 && i < r - 1 && a && a !== "^" ? a += "-" : a += /[\]\\^-]/.test(t) ? "\\" + t : t;
			}
			t += `[${a}]`, n = r;
		} else t += Le(r);
	}
	return t;
}
function R(e, t, { ignoreCase: n = !1 } = {}) {
	let r = (n ? "i" : "s") + e, i = ze.get(r);
	return i || (i = RegExp(`^(?:${Ue(e)})$`, n ? "i" : ""), ze.size > 500 && ze.clear(), ze.set(r, i)), i.test(t);
}
var We = (e) => String(e).replace(/\\([\s\S])/g, "$1");
// src/terminal/shell/paths.js
function z(e, t) {
	t = String(t);
	let n = v.home, r;
	if (t === "~" || t.startsWith("~/")) r = t.slice(1);
	else if (t.startsWith("/")) {
		let e = t.toLowerCase(), i = n.toLowerCase();
		r = e === i || e.startsWith(i + "/") ? t.slice(n.length) : t;
	} else r = v.ancestors(e).slice(1).map((e) => e.name).join("/") + "/" + t;
	let i = [];
	for (let e of r.split("/")) e && e !== "." && (e === ".." ? i.pop() : i.push(e));
	return i;
}
function Ge(e, t) {
	return t === "" ? null : v.resolve("~/" + z(e, t).join("/"));
}
function Ke(e, t) {
	let n = z(e, t), r = n.pop() ?? "";
	return {
		parent: v.resolve("~/" + n.join("/")),
		name: r
	};
}
var qe = (e, t) => e === "" ? t : e.endsWith("/") ? e + t : `${e}/${t}`;
function Je(e, t) {
	let n = t.startsWith("/"), r = t.split("/"), i = [n ? "/" : ""];
	n && r.shift();
	let a = !1;
	return r.forEach((t) => {
		if (t === "") return;
		if (!Ve(t)) {
			i = i.map((e) => qe(e, We(t)));
			return;
		}
		a = !0;
		let n = [];
		for (let r of i) {
			let i = Ge(e, r || ".");
			i?.type === "folder" && v.children(i.id).map((e) => e.name).filter((e) => (!e.startsWith(".") || t.startsWith(".") || t.startsWith("\\.")) && R(t, e)).sort(B).forEach((e) => n.push(qe(r, e)));
		}
		i = n;
	}), a ? (t.endsWith("/") && (i = i.filter((t) => Ge(e, t)?.type === "folder").map((e) => e + "/")), i.filter((t) => Ge(e, t))) : [];
}
var B = (e, t) => e.localeCompare(t), Ye = { brk: !0 }, Xe = 1e5;
async function Ze(e, t) {
	let n = [];
	for (let r of t) n.push(...await Qe(e, r));
	return n;
}
async function Qe(e, t, { split: n = !t.noSplit, braces: r = n } = {}) {
	let i = r ? it(t.parts) : [t.parts], a = [];
	for (let t of i) {
		let r = await U(e, ct(e, t), !1), i = n ? rt(r, et(e)) : [nt(r)];
		for (let t of i) {
			if (n && !e.options.noglob) {
				let n = tt(t);
				if (Ve(n)) {
					let t = Je(e.cwd, n);
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
async function V(e, t) {
	return t ? nt(await U(e, ct(e, t.parts), !1)).map((e) => e.text).join("") : "";
}
async function H(e, t) {
	return t ? tt(nt(await U(e, ct(e, t.parts), !1))) : "";
}
async function $e(e, t) {
	return nt(await U(e, t.parts, !1)).map((e) => e.quoted ? e.text.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") : e.text).join("");
}
var et = (e) => e.getVar("IFS") ?? " 	\n", tt = (e) => e.map((e) => e.quoted ? Be(e.text) : e.text).join("");
function nt(e) {
	return e.map((e) => e.brk ? {
		text: " ",
		quoted: !0
	} : e);
}
function rt(e, t) {
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
function it(e) {
	if (!e.some((e) => e.type === "lit" && e.value.includes("{"))) return [e];
	let t = e.flatMap((e) => e.type === "lit" ? [...e.value].map((e) => ({ c: e })) : [{ part: e }]), n = [];
	return at(t, n), n.map(st);
}
function at(e, t) {
	if (t.length > Xe) throw new k(j("expand.braceTooLarge"));
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
			for (let n = 0; n < r.length - 1; n++) at([
				...o,
				...e.slice(r[n] + 1, r[n + 1]),
				...s
			], t);
			return;
		}
		let c = e.slice(n + 1, i), l = c.every((e) => e.c != null) ? ot(c.map((e) => e.c).join("")) : null;
		if (l) {
			for (let e of l) at([
				...o,
				...[...e].map((e) => ({ c: e })),
				...s
			], t);
			return;
		}
	}
	t.push(e);
}
function ot(e) {
	let t = /^(-?\d+)\.\.(-?\d+)(?:\.\.(-?\d+))?$/.exec(e);
	if (t) {
		let [e, n] = [Number(t[1]), Number(t[2])], r = Math.abs(Number(t[3] ?? 1)) || 1, i = /^-?0\d/.test(t[1]) || /^-?0\d/.test(t[2]) ? Math.max(t[1].length, t[2].length) : 0;
		if (Math.abs(n - e) / r > Xe) throw new k(j("expand.braceTooLarge"));
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
function st(e) {
	let t = [];
	for (let n of e) n.part ? t.push(n.part) : t.at(-1)?.type === "lit" && t.at(-1).fresh ? t.at(-1).value += n.c : t.push({
		type: "lit",
		value: n.c,
		fresh: !0
	});
	return t;
}
function ct(e, t) {
	let n = t[0];
	if (n?.type !== "lit" || !n.value.startsWith("~")) return t;
	let r = n.value.indexOf("/"), i = r < 0 ? n.value : n.value.slice(0, r), a = r < 0 ? "" : n.value.slice(r), o = null;
	return i === "~" ? o = e.getVar("HOME") ?? v.home : i === "~+" ? o = e.getVar("PWD") : i === "~-" ? o = e.getVar("OLDPWD") : i.slice(1) === e.getVar("USER") && (o = v.home), o == null || r < 0 && t.length > 1 && t[1].type !== "lit" ? t : [
		{
			type: "sq",
			value: o
		},
		...a ? [{
			type: "lit",
			value: a
		}] : [],
		...t.slice(1)
	];
}
async function U(e, t, n) {
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
			let t = await U(e, i.parts, !0), n = i.parts.length > 0 && i.parts.every((e) => e.type === "param" && lt(e));
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
			let t = await V(e, i.word);
			r.push({
				text: String(e.arith(t)),
				quoted: n,
				split: !n
			});
			break;
		}
		case "param": r.push(...await ut(e, i, n));
	}
	return r;
}
var lt = (e) => !e.length && !e.op && (e.name === "@" || e.index === "@");
async function ut(e, t, n) {
	let { values: r, multi: i, star: a } = await dt(e, t);
	if (i || a) {
		if (a && n) return [{
			text: r.join((et(e) || "")[0] ?? ""),
			quoted: !0
		}];
		let t = [];
		return r.forEach((e, r) => {
			r && t.push(Ye), t.push({
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
async function dt(e, t) {
	let n = t.name, r = t.index ?? null;
	if (t.indirect && (r === "@" || r === "*")) return {
		values: e.arrayKeys(n),
		multi: r === "@",
		star: r === "*"
	};
	if (t.indirect) {
		let t = ft(e, n, r).values[0] ?? "", i = /^([A-Za-z_]\w*|[0-9]+|[@*#?$!-])(?:\[(.*)\])?$/.exec(t);
		if (!i) throw new k(j("expand.badSubstitution", { name: t }));
		[, n, r = null] = i;
	}
	let { values: i, set: a, multi: o, star: s } = ft(e, n, r);
	if (t.length) return o || s ? { values: [String(i.length)] } : { values: [String([...i[0] ?? ""].length)] };
	let c = t.op;
	if (!c) {
		if (!a && e.options.nounset && !(o || s)) throw new k(j("expand.unbound", { name: n }));
		return {
			values: i,
			multi: o,
			star: s
		};
	}
	let l = !a || i.length === 0 || i.length === 1 && i[0] === "" && !(o || s), u = c.startsWith(":") ? l : !a;
	switch (c) {
		case "-":
		case ":-": return u ? { values: [await V(e, t.arg)] } : {
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
			if (!/^[A-Za-z_]\w*$/.test(n)) throw new k(j("expand.cannotAssign", { name: n }));
			return e.setVar(n, await V(e, t.arg), r), { values: [e.getVar(n, r) ?? ""] };
		case "?":
		case ":?":
			if (!u) return {
				values: i,
				multi: o,
				star: s
			};
			throw new k(`${n}: ${await V(e, t.arg) || j("expand.nullOrNotSet")}`);
		case "+":
		case ":+": return u ? { values: [] } : { values: [await V(e, t.arg)] };
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
			let n = await H(e, t.arg);
			return d((e) => pt(e, n, c));
		}
		case "/":
		case "//":
		case "/#":
		case "/%": {
			let n = await H(e, t.arg), r = await V(e, t.replace);
			return d((e) => mt(e, n, r, c));
		}
		case "^":
		case "^^":
		case ",":
		case ",,": {
			let n = t.arg?.parts.length ? await H(e, t.arg) : "?", r = c[0] === "^";
			return d((e) => [...e].map((e, t) => (c.length === 2 || t === 0) && R(n, e) ? r ? e.toUpperCase() : e.toLowerCase() : e).join(""));
		}
		case "substr": {
			let r = Number(e.arith(await V(e, t.offset))), a = t.count ? Number(e.arith(await V(e, t.count))) : null, c = (e) => {
				let t = r < 0 ? Math.max(0, e.length + r) : Math.min(r, e.length);
				if (a == null) return e.slice(t);
				if (a < 0) {
					if (o || s) throw new k(j("expand.negativeSubstring", { count: a }));
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
	throw new k(j("expand.badSubstitution", { name: n }));
}
function ft(e, t, n) {
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
function pt(e, t, n) {
	let r = n.length === 2;
	if (n[0] === "#") {
		let n = [...Array(e.length + 1).keys()];
		r && n.reverse();
		for (let r of n) if (R(t, e.slice(0, r))) return e.slice(r);
	} else {
		let n = [...Array(e.length + 1).keys()];
		r || n.reverse();
		for (let r of n) if (R(t, e.slice(r))) return e.slice(0, r);
	}
	return e;
}
function mt(e, t, n, r) {
	if (!t) return e;
	let i = Ue(t);
	if (r === "/#") return e.replace(RegExp(`^(?:${i})`), () => n);
	if (r === "/%") {
		for (let r = 0; r <= e.length; r++) if (R(t, e.slice(r))) return e.slice(0, r) + n;
		return e;
	}
	let a = new RegExp(i, r === "//" ? "g" : "");
	return e.replace(a, (e) => e === "" ? e : n);
}
// src/terminal/shell/streams.js
var ht = class {
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
}, gt = class extends ht {
	#e;
	constructor(e) {
		super(), this.#e = String(e);
	}
	async pull() {
		let e = this.#e;
		return this.#e = null, e || null;
	}
}, W = class extends ht {}, G = class {
	write() {}
	async close() {}
}, _t = class extends G {}, vt = class extends G {
	text = "";
	write(e) {
		this.text += e;
	}
}, yt = class extends G {
	constructor(e) {
		super(), this.fn = e;
	}
	write(e) {
		return this.fn(String(e));
	}
}, bt = 65536;
function xt() {
	let e = [], t = 0, n = !1, r = !1, i = null, a = [], o = () => {
		i?.(), i = null;
	}, s = () => {
		let e = a;
		a = [], e.forEach((e) => e());
	};
	class c extends G {
		async write(n) {
			if (r || (n = String(n), n && (e.push(n), t += n.length, o(), t > bt && await new Promise((e) => a.push(e)), r))) throw new ne();
		}
		async close() {
			n = !0, o();
		}
	}
	class l extends ht {
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
var St = 200, Ct = 0, wt = 1e3, Tt = class e {
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
	#e = v.root;
	constructor({ host: e, commands: t, parent: n = null }) {
		if (this.host = e, this.commands = t, n) return;
		this.token = new re(), this.jobs = {
			list: [],
			next: 1
		}, this.pid = wt++, this.started = Date.now();
		let r = y.user?.username || j("shell.defaultUser"), i = {
			HOME: v.home,
			USER: r,
			LOGNAME: r,
			HOSTNAME: "lilos",
			SHELL: "/bin/bash",
			TERM: "lilos",
			PATH: `${v.home}/bin`,
			PS1: "\\u@\\h:\\w\\$ ",
			PS2: "> ",
			0: "bash",
			BASH_VERSION: "5.2-lilos"
		};
		for (let [e, t] of Object.entries(i)) this.scopes[0].set(e, {
			value: t,
			exported: ![
				"PS1",
				"PS2",
				"0",
				"BASH_VERSION"
			].includes(e)
		});
		this.cwd = v.root;
	}
	get cwd() {
		return v.get(this.#e)?.type === "folder" ? this.#e : v.root;
	}
	set cwd(e) {
		let t = this.getVar("PWD");
		this.#e = e, t != null && t !== v.path(e) && this.setVar("OLDPWD", t), this.setVar("PWD", v.path(e));
	}
	resolve(e) {
		return Ge(this.cwd, e);
	}
	locate(e) {
		return Ke(this.cwd, e);
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
		if (o?.readonly) throw new k(j("shell.readonly", { name: e }));
		return o || (o = {
			value: null,
			exported: !1
		}, (r ? this.scopes.at(-1) : this.scopes[0]).set(e, o)), Array.isArray(t) ? o.value = [...t] : n == null ? t !== void 0 && (Array.isArray(o.value) ? o.value[0] = t == null ? "" : String(t) : o.value = t == null ? null : String(t)) : (Array.isArray(o.value) || (o.value = o.value == null ? [] : [o.value]), o.value[n] = String(t)), i !== void 0 && (o.exported = i), a && (o.readonly = !0), o;
	}
	unsetVar(e, t = null) {
		for (let n = this.scopes.length - 1; n >= 0; n--) {
			let r = this.scopes[n].get(e);
			if (r) {
				if (r.readonly) throw new k(j("shell.cannotUnset", { name: e }));
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
		return we(e, this.#n);
	}
	#n = {
		get: (e, t) => this.getVar(e, t == null ? null : Number(t)),
		set: (e, t, n) => this.setVar(e, n, t == null ? null : Number(t))
	};
	arrayIndex(e) {
		let t = String(e).replace(/\$\{?([A-Za-z_]\w*|[0-9#?])\}?/g, (e, t) => (/^\d$/.test(t) ? this.positional[t - 1] : t === "#" ? this.positional.length : t === "?" ? this.status : this.getVar(t)) ?? ""), n = Number(this.arith(t));
		if (n < 0) throw new k(j("shell.badSubscript", { index: e }));
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
		return ge(e, { aliases: this.aliases }), this.exec({
			type: "script",
			source: e
		}, t);
	}
	async tick() {
		this.token.check();
		let e = performance.now();
		e - Ct > 12 && (Ct = e, await new Promise((e) => setTimeout(e)), this.token.check());
	}
	sleep(e) {
		return new Promise((t, n) => {
			let r = this.token.onAbort(() => {
				clearTimeout(i), n(new E());
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
				for (let r of _e(e.source, { aliases: this.aliases })) n = await this.execList(r, t);
				return n;
			}
		}
		return this.withRedirects(e.redirs ?? [], t, (t) => this.execCompound(e, t));
	}
	async execList(e, t) {
		let n = this.status;
		for (let r of e.items) if (r.async ? (this.startJob(r, t), n = 0) : (this.exempt = !1, n = await this.exec(r.node, t)), this.status = n, n !== 0 && this.options.errexit && !this.condDepth && !this.exempt && !r.async) throw new te(n);
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
				let r = e.cmds.slice(1).map(() => xt()), i = e.cmds.length - 1, a = await Promise.all(e.cmds.map(async (n, a) => {
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
			if (e instanceof te) return e.code;
			if (e instanceof ne) return 141;
			if (e instanceof w || e instanceof T) return 0;
			if (e instanceof ee) return e.code;
			if (e instanceof k) return await t.stderr.write(`bash: ${e.message}\n`), e.code;
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
				let n = e.words ? await Ze(this, e.words) : [...this.positional], r = 0, i = 0;
				return await this.loop(async () => i >= n.length ? !1 : (this.setVar(e.name, n[i++]), r = await this.exec(e.body, t), !0)), r;
			}
			case "cfor": {
				let n = async (e) => this.arith(await V(this, e)), r = 0;
				e.init.parts.length && await n(e.init);
				let i = !0;
				return await this.loop(async () => (!i && e.step.parts.length && await n(e.step), i = !1, e.cond.parts.length && await n(e.cond) === 0n ? !1 : (r = await this.exec(e.body, t), !0))), r;
			}
			case "case": {
				let n = await V(this, e.word), r = 0;
				for (let i = 0; i < e.items.length; i++) {
					let a = e.items[i], o = !1;
					for (let e of a.patterns) if (R(await H(this, e), n)) {
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
			case "arithcmd": return +(this.arith(await V(this, e.word)) === 0n);
			case "cond": try {
				return +!await this.cond(e.expr);
			} catch (e) {
				if (!(e instanceof k)) throw e;
				return await t.stderr.write(`bash: ${e.message}\n`), 2;
			}
		}
		throw new k(j("shell.unknownConstruct", { type: e.type }));
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
					if (e instanceof w) {
						if (e.levels > 1) throw new w(e.levels - 1);
						return;
					}
					if (e instanceof T) {
						if (e.levels > 1) throw new T(e.levels - 1);
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
			case "word": return await V(this, e.word) !== "";
			case "unary": return this.unaryTest(e.flag, await V(this, e.arg));
		}
		let t = await V(this, e.left);
		switch (e.bop) {
			case "==":
			case "=": return R(await H(this, e.right), t);
			case "!=": return !R(await H(this, e.right), t);
			case "=~": {
				let n;
				try {
					n = new RegExp(await $e(this, e.right));
				} catch {
					throw new k(j("shell.badRegex"));
				}
				let r = n.exec(t);
				return this.setVar("BASH_REMATCH", r ? [...r].map((e) => e ?? "") : []), !!r;
			}
		}
		return this.binaryTest(e.bop, t, await V(this, e.right), !0);
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
		throw new k(j("shell.unaryExpected", { op: e }));
	}
	binaryTest(e, t, n) {
		let r = (e) => {
			if (!/^\s*-?\d+\s*$/.test(e)) throw new k(j("shell.integerExpected", { value: e }));
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
		throw new k(j("shell.binaryExpected", { op: e }));
	}
	async execSimple(e, t) {
		await this.tick(), this.curIo = t, this.substStatus = null;
		let n;
		try {
			n = [];
			for (let t of e.words) {
				if (!t.declArray) {
					n.push(...await Qe(this, t));
					continue;
				}
				let { name: e, append: r, words: i } = t.declArray, a = await Ze(this, i);
				(this.declArrays ??= /* @__PURE__ */ new Map()).set(e, a), n.push(`${e}${r ? "+" : ""}=(${a.join(" ")})`);
			}
		} catch (e) {
			if (!(e instanceof k)) throw e;
			return await t.stderr.write(`bash: ${e.message}\n`), 1;
		}
		if (!n.length) {
			try {
				for (let t of e.assigns) await this.assign(t);
			} catch (e) {
				if (!(e instanceof k)) throw e;
				return await t.stderr.write(`bash: ${e.message}\n`), 1;
			}
			let n = this.substStatus ?? 0;
			return e.redirs.length ? this.withRedirects(e.redirs, t, async () => n) : n;
		}
		let r = null;
		if (e.assigns.length) {
			r = /* @__PURE__ */ new Map();
			for (let t of e.assigns) r.set(t.name, {
				value: t.array ? await Ze(this, t.array) : await V(this, t.value),
				exported: !0
			});
		}
		return this.options.xtrace && await t.stderr.write(`+ ${n.map(K).join(" ")}\n`), this.withRedirects(e.redirs, t, async (e) => {
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
			let t = await Ze(this, e.array);
			this.setVar(e.name, e.append ? [...this.getArray(e.name) ?? [], ...t] : t);
			return;
		}
		let t = await V(this, e.value), n = e.index == null ? null : this.arrayIndex(e.index);
		e.append ? this.setVar(e.name, (this.getVar(e.name, n) ?? "") + t, n) : this.setVar(e.name, t, n), this.options.xtrace && await this.curIo?.stderr.write(`+ ${e.name}=${K(t)}\n`);
	}
	async invoke(e, t, { functions: n = !0 } = {}) {
		let r = e[0];
		if (r.includes("/")) return this.runScript(r, e.slice(1), t);
		if (n && this.functions.has(r)) return this.callFunction(r, e, t);
		let i = this.commands.get(r);
		if (i) return this.runCommand(i, e, t);
		for (let n of (this.getVar("PATH") ?? "").split(":").filter(Boolean)) for (let i of [r, `${r}.sh`]) if (this.resolve(`${n}/${i}`)?.type === "file") return this.runScript(`${n}/${i}`, e.slice(1), t);
		return await t.stderr.write(`bash: ${j("shell.commandNotFound", { name: r })}\n`), 127;
	}
	async runCommand(e, t, n) {
		let r = new Et(this, e, t, n);
		if (t[1] === "--help" && !e.ownHelp) return await r.out(kt(e)), 0;
		try {
			let t = await e.run(r);
			return typeof t == "number" ? t : 0;
		} catch (e) {
			if (e instanceof ne) return 141;
			let t = async (e) => {
				try {
					await r.error(e);
				} catch {}
			};
			if (e instanceof k) return await t(e.message), e.code;
			if (e instanceof w || e instanceof T || e instanceof ee || e instanceof te || e instanceof E) throw e;
			return e instanceof D || e instanceof O ? (await t(e.message || j("parse.unexpectedEnd")), 2) : (await t(e?.message ?? String(e)), 1);
		}
	}
	async callFunction(e, t, n) {
		if (this.funcDepth >= St) throw new k(j("shell.tooDeep", { name: e }));
		let r = this.functions.get(e), i = this.positional, a = /* @__PURE__ */ new Map();
		this.positional = t.slice(1), this.scopes.push(a), this.funcDepth++;
		try {
			return await this.exec(r.body, n);
		} catch (e) {
			if (e instanceof ee) return e.code;
			throw e;
		} finally {
			this.funcDepth--, this.scopes.splice(this.scopes.indexOf(a), 1), this.positional = i;
		}
	}
	async readScript(e) {
		let t = this.resolve(e);
		if (!t) throw new k(j("err.noSuchFile", { path: e }), 127);
		if (t.type === "folder") throw new k(j("err.isADirectory", { path: e }), 126);
		if (t.type !== "file") throw new k(j("err.notAFile", { path: e }), 126);
		return v.read(t.id);
	}
	async runScript(e, t, n) {
		let r;
		try {
			r = await this.readScript(e);
		} catch (e) {
			if (!(e instanceof k)) throw e;
			return await n.stderr.write(`bash: ${e.message}\n`), e.code;
		}
		let i = this.subshell({ script: !0 });
		return i.positional = [...t], i.setVar("0", e), i.runSource(r, n, e);
	}
	async runSource(e, t, n) {
		try {
			ge(e, { aliases: this.aliases });
		} catch (e) {
			if (!(e instanceof O || e instanceof D)) throw e;
			return await t.stderr.write(`${n}: ${e.message || j("parse.unexpectedEndOfFile")}\n`), 2;
		}
		return this.runSubshell({
			type: "script",
			source: e
		}, t);
	}
	async substitute(e) {
		let t = new vt(), n = this.curIo ?? this.host, r = await this.subshell().runSubshell(e, {
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
						if (a === "-") r[e] = n.op === ">&" ? new _t() : new W();
						else if (/^\d+$/.test(a)) {
							if (!r[a]) throw new k(j("shell.badFd", { fd: a }));
							r[e] = r[a];
						} else if (n.op === ">&" && n.fd == null) {
							let e = await this.openWrite(a, !1, t);
							i.push(e), r[1] = r[2] = e;
						} else throw new k(j("shell.fdExpected", { target: a }));
						break;
					}
					case "<<":
					case "<<-":
						r[e] = new gt(await V(this, n.heredoc.body));
						break;
					case "<<<": r[e] = new gt(await V(this, n.target) + "\n");
				}
			}
		} catch (e) {
			if (!(e instanceof k)) throw e;
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
		let t = await Qe(this, e.target);
		if (t.length !== 1) throw new k(j("shell.ambiguousRedirect", { target: await V(this, e.target) }));
		return t[0];
	}
	async openRead(e, t) {
		if (e === "/dev/null") return new W();
		if (e === "/dev/stdin") return t.stdin;
		let n = this.resolve(e);
		if (!n) throw new k(j("err.noSuchFile", { path: e }));
		if (n.type === "folder") throw new k(j("err.isADirectory", { path: e }));
		if (n.type !== "file") throw new k(j("err.notAFile", { path: e }));
		return new gt(await v.read(n.id));
	}
	async openWrite(e, t, n) {
		if (e === "/dev/null") return new _t();
		if (e === "/dev/stdout") return Ot(n.stdout);
		if (e === "/dev/stderr") return Ot(n.stderr);
		if (e === "/dev/tty") return Ot(this.host.stdout);
		let r = this.fileFor(e).id;
		return t || await v.write(r, ""), new Dt(r, t);
	}
	fileFor(e) {
		let t = this.resolve(e);
		if (t?.type === "folder") throw new k(j("err.isADirectory", { path: e }));
		if (t?.type === "app") throw new k(j("shell.isAppLink", { path: e }));
		if (t) return t;
		let { parent: n, name: r } = this.locate(e);
		if (n?.type !== "folder" || !r) throw new k(j("err.noSuchFile", { path: e }));
		return v.create(n.id, {
			type: "file",
			name: r
		});
	}
	startJob(e, t) {
		let n = this.subshell();
		n.token = new re();
		let r = {
			id: this.jobs.next++,
			pid: wt++,
			text: e.text.replace(/&\s*$/, "").trim(),
			state: "running",
			code: null,
			token: n.token,
			notified: !1
		};
		return n.pid = r.pid, r.promise = n.runSubshell(e.node, {
			stdin: new W(),
			stdout: t.stdout,
			stderr: t.stderr
		}).then((e) => e, (e) => e instanceof E ? 130 : (t.stderr.write(`bash: ${e?.message ?? e}\n`), 1)).then((e) => (r.state = "done", r.code = e, e)), this.jobs.list.push(r), this.lastBg = r.pid, this.subshellLevel || t.stderr.write(`[${r.id}] ${r.pid}\n`), r;
	}
	findJob(e) {
		let t = this.jobs.list;
		return e == null || e === "%%" || e === "%+" || e === "%" ? t.at(-1) ?? null : e === "%-" ? t.at(-2) ?? null : /^%\d+$/.test(e) ? t.find((t) => t.id === Number(e.slice(1))) ?? null : /^\d+$/.test(e) ? t.find((t) => t.pid === Number(e)) ?? null : e.startsWith("%") ? t.find((t) => t.text.startsWith(e.slice(1))) ?? null : null;
	}
	reapJobs() {
		let e = this.jobs.list.filter((e) => e.state === "done");
		return this.jobs.list = this.jobs.list.filter((e) => e.state !== "done"), this.jobs.list.length || (this.jobs.next = 1), e.map((e) => `[${e.id}]  ${e.code === 0 ? j("jobs.done") : e.code === 130 ? j("jobs.interrupted") : j("jobs.exit", { code: e.code })}\t\t${e.text}\n`);
	}
	async waitJob(e, { forward: t = !1 } = {}) {
		let n, r = new Promise((r, i) => {
			n = this.token.onAbort(() => {
				t ? e.token.abort() : i(new E());
			});
		});
		try {
			return await Promise.race([e.promise, r]);
		} finally {
			n();
		}
	}
}, Et = class {
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
			e ? e.type === "folder" ? (await this.error(j("err.isADirectory", { path: t })), this.failed = !0) : e.type === "file" ? (yield {
				name: t,
				node: e,
				text: await v.read(e.id)
			}, await this.tick()) : (await this.error(j("err.notAFile", { path: t })), this.failed = !0) : (await this.error(j("err.noSuchFile", { path: t })), this.failed = !0);
		}
	}
}, Dt = class extends G {
	#e = "";
	constructor(e, t) {
		super(), this.id = e, this.append = t;
	}
	write(e) {
		this.#e += e;
	}
	async close() {
		if (!v.exists(this.id) || this.append && !this.#e) return;
		let e = this.append ? await v.read(this.id) : "";
		await v.write(this.id, e + this.#e);
	}
}, Ot = (e) => ({
	write: (t) => e.write(t),
	close: async () => {}
}), K = (e) => e === "" ? "''" : /^[\w@%+=:,./~-]+$/.test(e) ? e : `'${e.replace(/'/g, "'\\''")}'`;
function kt(e) {
	return `${e.usage ? `${j("help.usageLine", { usage: e.usage })}\n` : ""}${e.summary ?? ""}\n${e.help ? `\n${e.help.trim()}\n` : ""}`;
}
// src/terminal/kernel/system.js
var At = () => [];
function jt() {
	throw Error(p);
}
function Mt() {
	throw Error(p);
}
async function Nt() {
	throw Error(p);
}
// src/terminal/commands/options.js
function q(e, { flags: t = "", values: n = "", multi: r = "", long: i = {}, number: a = !1, stopAtArg: o = !1 } = {}) {
	let s = {}, c = [], l = e.args, u = (e, t) => {
		r.includes(e) ? (s[e] ??= []).push(t) : s[e] = t;
	}, d = (t) => new k(`${j("opt.invalid", { option: t })}${e.cmd.usage ? `\n${j("help.usageLine", { usage: e.cmd.usage })}` : ""}`, 2);
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
				if (n == null) throw new k(j("opt.longNeedsArgument", { name: t }), 2);
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
					if (t == null) throw new k(j("opt.needsArgument", { option: a }), 2);
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
function J(e) {
	if (!/^[+-]?\d+$/.test(String(e))) throw new k(j("opt.badNumber", { value: e }), 2);
	return Number(e);
}
// src/terminal/commands/builtins.js
var Pt = [
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
], Ft = {
	errexit: "e",
	nounset: "u",
	xtrace: "x",
	noglob: "f",
	pipefail: null
}, It = {
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
function Lt(e, { printf: t = !1 } = {}) {
	let n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i !== "\\" || r === e.length - 1) {
			n += i;
			continue;
		}
		let a = e[++r];
		if (It[a] != null) {
			n += It[a];
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
function Rt(e, t) {
	let n = "", r = 0, i = [], a = /%([-+ #0]*)(\*|\d+)?(?:\.(\*|\d*))?([diouxXfFeEgGcsbq%])/y, o = () => r < t.length ? t[r++] : void 0, s = (e) => {
		if (e == null || e === "") return 0;
		if (/^['"]./.test(e)) return e.codePointAt(1);
		let t = e.trim();
		if (/^[+-]?(0[xX][0-9a-fA-F]+|\d+)$/.test(t)) return Number(t.startsWith("-") ? -Number(t.slice(1)) : Number(t.replace(/^\+/, "")));
		if (/^[+-]?0[0-7]+$/.test(t)) return parseInt(t, 8);
		let n = Number(t);
		return Number.isFinite(n) ? n : (i.push(j("printf.badNumber", { value: e })), 0);
	};
	do {
		let t = r;
		for (let t = 0; t < e.length;) {
			let r = e[t];
			if (r === "\\") {
				let r = /^\\(x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{1,4}|[0-7]{1,3}|.)/s.exec(e.slice(t))[0], { text: a, stop: o } = Lt(r, { printf: !0 });
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
					m = Lt(p ?? "").text;
					break;
				case "q":
					m = K(p ?? "");
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
function zt(e, t) {
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
		if (n >= t.length) throw new k(j("test.argumentExpected"), 2);
		if (t[n] === "(" && n + 2 < t.length) {
			n++;
			let e = a();
			if (t[n] !== ")") throw new k(j("err.missingParen"), 2);
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
	if (n < t.length) throw new k(j("test.unexpectedArgument", { arg: t[n] }), 2);
	return l;
}
function Bt(e, t) {
	let n = (Array.isArray(t.value) ? "a" : "") + (t.exported ? "x" : "") + (t.readonly ? "r" : ""), r = Array.isArray(t.value) ? `(${Object.keys(t.value).map((e) => `[${e}]=${JSON.stringify(t.value[e])}`).join(" ")})` : JSON.stringify(t.value);
	return `declare -${n || "-"} ${e}=${r}\n`;
}
async function Vt(e, { local: t = !1, exported: n, readonly: r = !1, flags: i = "axrigpfFn" } = {}) {
	let a = e.shell, { opts: o, args: s } = q(e, { flags: i });
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
		for (let [n, r] of t) await e.out(Bt(n, r));
		return 0;
	}
	let l = 0;
	for (let t of s) {
		let i = /^([A-Za-z_]\w*)(?:\[([^\]]*)\])?(\+?)(?:=(.*))?$/s.exec(t);
		if (!i) {
			await e.error(j("err.badIdentifier", { name: t })), l = 1;
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
var Ht = (e, t, n) => {
	if (t == null) return n;
	if (!/^-?\d+$/.test(t)) throw new k(j("err.numericArgument", { value: t }), 2);
	return (Number(t) % 256 + 256) % 256;
}, Ut = [
	{
		name: "cd",
		get usage() {
			return j("help.cd.usage");
		},
		get summary() {
			return j("help.cd.summary");
		},
		get help() {
			return j("help.cd.text");
		},
		async run(e) {
			let t = e.shell, { args: n } = q(e, { flags: "LPe" }), r = n[0] ?? t.getVar("HOME") ?? "~";
			if (n.length > 1) throw new k(j("err.tooManyArguments"));
			if (r === "-") {
				if (r = t.getVar("OLDPWD"), r == null) throw new k(j("cd.oldpwdNotSet"));
				await e.out(r + "\n");
			}
			let i = e.resolve(r);
			if (!i) throw new k(j("err.noSuchFile", { path: r }));
			if (i.type !== "folder") throw new k(j("err.notADirectory", { path: r }));
			t.cwd = i.id;
		}
	},
	{
		name: "pwd",
		usage: "pwd",
		get summary() {
			return j("help.pwd.summary");
		},
		async run(e) {
			await e.out(v.path(e.cwd) + "\n");
		}
	},
	{
		name: "echo",
		ownHelp: !0,
		get usage() {
			return j("help.echo.usage");
		},
		get summary() {
			return j("help.echo.summary");
		},
		get help() {
			return j("help.echo.text");
		},
		async run(e) {
			let t = e.args, n = !0, r = !1;
			for (; t.length && /^-[neE]+$/.test(t[0]);) {
				for (let e of t[0].slice(1)) e === "n" ? n = !1 : r = e === "e";
				t = t.slice(1);
			}
			let i = t.join(" ");
			if (r) {
				let e = Lt(i);
				i = e.text, e.stop && (n = !1);
			}
			await e.out(i + (n ? "\n" : ""));
		}
	},
	{
		name: "printf",
		ownHelp: !0,
		get usage() {
			return j("help.printf.usage");
		},
		get summary() {
			return j("help.printf.summary");
		},
		get help() {
			return j("help.printf.text");
		},
		async run(e) {
			let t = e.args, n = null;
			if (t[0] === "-v" && (n = t[1], t = t.slice(2)), t[0] === "--" && (t = t.slice(1)), !t.length) throw new k(j("help.usageShort", { usage: this.usage }), 2);
			let { text: r, errors: i } = Rt(t[0], t.slice(1));
			for (let t of i) await e.error(t);
			return n ? e.shell.setVar(n, r) : await e.out(r), +!!i.length;
		}
	},
	{
		name: "export",
		get usage() {
			return j("help.export.usage");
		},
		get summary() {
			return j("help.export.summary");
		},
		get help() {
			return j("help.export.text");
		},
		run: (e) => Vt(e, {
			exported: !0,
			flags: "npf"
		})
	},
	{
		name: "readonly",
		get usage() {
			return j("help.readonly.usage");
		},
		get summary() {
			return j("help.readonly.summary");
		},
		run: (e) => Vt(e, {
			readonly: !0,
			flags: "ap"
		})
	},
	{
		name: "local",
		get usage() {
			return j("help.local.usage");
		},
		get summary() {
			return j("help.local.summary");
		},
		run(e) {
			if (!e.shell.funcDepth) throw new k(j("local.onlyInFunction"));
			return Vt(e, {
				local: !0,
				flags: "axrin"
			});
		}
	},
	{
		name: "declare",
		get usage() {
			return j("help.declare.usage");
		},
		get summary() {
			return j("help.declare.summary");
		},
		get help() {
			return j("help.declare.text");
		},
		run: (e) => Vt(e)
	},
	{
		name: "typeset",
		get usage() {
			return j("help.typeset.usage");
		},
		get summary() {
			return j("help.typeset.summary");
		},
		run: (e) => Vt(e)
	},
	{
		name: "unset",
		get usage() {
			return j("help.unset.usage");
		},
		get summary() {
			return j("help.unset.summary");
		},
		async run(e) {
			let { opts: t, args: n } = q(e, { flags: "fv" });
			for (let r of n) {
				if (t.f) {
					e.shell.functions.delete(r);
					continue;
				}
				let n = /^([A-Za-z_]\w*)(?:\[(.*)\])?$/.exec(r);
				if (!n) throw new k(j("err.badIdentifier", { name: r }));
				n[2] == null && !t.v && !e.shell.isSet(n[1]) && e.shell.functions.has(n[1]) ? e.shell.functions.delete(n[1]) : e.shell.unsetVar(n[1], n[2] == null ? null : e.shell.arrayIndex(n[2]));
			}
		}
	},
	{
		name: "env",
		get usage() {
			return j("help.env.usage");
		},
		get summary() {
			return j("help.env.summary");
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
			return j("help.printenv.usage");
		},
		get summary() {
			return j("help.printenv.summary");
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
			return j("help.set.usage");
		},
		get summary() {
			return j("help.set.summary");
		},
		get help() {
			return j("help.set.text");
		},
		async run(e) {
			let t = e.shell, n = e.args;
			if (!n.length) {
				for (let [n, r] of t.variables()) await e.out(`${n}=${Array.isArray(r.value) ? `(${r.value.map(K).join(" ")})` : K(r.value)}\n`);
				return 0;
			}
			for (let r = 0; r < n.length; r++) {
				let i = n[r];
				if (i === "--") return t.positional = n.slice(r + 1), 0;
				if (/^[-+]o$/.test(i)) {
					let a = n[++r];
					if (a == null) {
						for (let [n] of Object.entries(Ft)) await e.out(`${n.padEnd(15)}${t.options[n] ? "on" : "off"}\n`);
						continue;
					}
					if (!(a in Ft)) throw new k(j("set.badOptionName", { name: a }), 2);
					t.options[a] = i[0] === "-";
				} else if (/^[-+][euxfv]+$/.test(i)) for (let e of i.slice(1)) {
					let n = Object.keys(Ft).find((t) => Ft[t] === e);
					n && (t.options[n] = i[0] === "-");
				}
				else {
					if (/^[-+]/.test(i) && i.length > 1) throw new k(j("set.badOption", { option: i }), 2);
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
			return j("help.shift.summary");
		},
		run(e) {
			let t = e.args[0] == null ? 1 : J(e.args[0]);
			return t > e.shell.positional.length ? 1 : (e.shell.positional = e.shell.positional.slice(t), 0);
		}
	},
	{
		name: "true",
		ownHelp: !0,
		usage: "true",
		get summary() {
			return j("help.true.summary");
		},
		run: () => 0
	},
	{
		name: "false",
		ownHelp: !0,
		usage: "false",
		get summary() {
			return j("help.false.summary");
		},
		run: () => 1
	},
	{
		name: ":",
		ownHelp: !0,
		get usage() {
			return j("help.colon.usage");
		},
		get summary() {
			return j("help.colon.summary");
		},
		run: () => 0
	},
	{
		name: "test",
		ownHelp: !0,
		get usage() {
			return j("help.test.usage");
		},
		get summary() {
			return j("help.test.summary");
		},
		get help() {
			return j("help.test.text");
		},
		run: (e) => +!zt(e.shell, e.args)
	},
	{
		name: "[",
		ownHelp: !0,
		get usage() {
			return j("help.bracket.usage");
		},
		get summary() {
			return j("help.bracket.summary");
		},
		run(e) {
			if (e.args.at(-1) !== "]") throw new k(j("test.missingBracket"), 2);
			return +!zt(e.shell, e.args.slice(0, -1));
		}
	},
	{
		name: "let",
		ownHelp: !0,
		get usage() {
			return j("help.let.usage");
		},
		get summary() {
			return j("help.let.summary");
		},
		run(e) {
			if (!e.args.length) throw new k(j("let.noExpression"), 2);
			let t = 0n;
			for (let n of e.args) t = e.shell.arith(n);
			return +(t === 0n);
		}
	},
	{
		name: "exit",
		get usage() {
			return j("help.exit.usage");
		},
		get summary() {
			return j("help.exit.summary");
		},
		run(e) {
			throw new te(Ht(e, e.args[0], e.shell.status));
		}
	},
	{
		name: "return",
		get usage() {
			return j("help.return.usage");
		},
		get summary() {
			return j("help.return.summary");
		},
		run(e) {
			throw !e.shell.funcDepth && !e.shell.sourceDepth ? new k(j("return.onlyInFunction")) : new ee(Ht(e, e.args[0], e.shell.status));
		}
	},
	{
		name: "break",
		usage: "break [n]",
		get summary() {
			return j("help.break.summary");
		},
		async run(e) {
			if (!e.shell.loopDepth) return await e.error(j("loop.onlyInLoop")), 0;
			let t = e.args[0] == null ? 1 : J(e.args[0]);
			throw t < 1 ? new k(j("loop.badCount", { n: t })) : new w(Math.min(t, e.shell.loopDepth));
		}
	},
	{
		name: "continue",
		usage: "continue [n]",
		get summary() {
			return j("help.continue.summary");
		},
		async run(e) {
			if (!e.shell.loopDepth) return await e.error(j("loop.onlyInLoop")), 0;
			let t = e.args[0] == null ? 1 : J(e.args[0]);
			throw t < 1 ? new k(j("loop.badCount", { n: t })) : new T(Math.min(t, e.shell.loopDepth));
		}
	},
	{
		name: "read",
		get usage() {
			return j("help.read.usage");
		},
		get summary() {
			return j("help.read.summary");
		},
		get help() {
			return j("help.read.text");
		},
		async run(e) {
			let t = e.shell, { opts: n, args: r } = q(e, {
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
			let s = n.r ? a : a.replace(/\\(.)/g, "$1"), c = t.getVar("IFS") ?? " 	\n", l = [...c].filter((e) => /\s/.test(e)).join(""), u = (e) => e.replace(RegExp(`^[${Y(l)}]+|[${Y(l)}]+$`, "g"), ""), d = (e) => c ? u(e).split(RegExp(`[${Y(l)}]*[${Y(c)}][${Y(l)}]*|[${Y(l)}]+`)).filter((e, t, n) => e !== "" || t < n.length - 1) : [e];
			if (n.a) return t.setVar(n.a, s === "" ? [] : d(s)), +!!o;
			if (!r.length) return t.setVar("REPLY", a), o && !a ? 1 : +!!o;
			let f = c ? u(s) : s;
			return r.forEach((e, n) => {
				if (n === r.length - 1) {
					t.setVar(e, f);
					return;
				}
				let i = c ? RegExp(`^([^${Y(c)}]*)(?:[${Y(l)}]*[${Y(c)}][${Y(l)}]*|[${Y(l)}]+|$)`).exec(f) : null;
				t.setVar(e, i ? i[1] : f), f = i ? f.slice(i[0].length) : "";
			}), +!!o;
		}
	},
	{
		name: "source",
		get usage() {
			return j("help.source.usage");
		},
		get summary() {
			return j("help.source.summary");
		},
		run: (e) => Wt(e)
	},
	{
		name: ".",
		get usage() {
			return j("help.dot.usage");
		},
		get summary() {
			return j("help.dot.summary");
		},
		run: (e) => Wt(e)
	},
	{
		name: "eval",
		ownHelp: !0,
		get usage() {
			return j("help.eval.usage");
		},
		get summary() {
			return j("help.eval.summary");
		},
		async run(e) {
			try {
				return await e.shell.run(e.args.join(" "), e.io);
			} catch (e) {
				throw e instanceof O || e instanceof D ? new k(e.message || j("parse.unexpectedEnd"), 2) : e;
			}
		}
	},
	{
		name: "alias",
		get usage() {
			return j("help.alias.usage");
		},
		get summary() {
			return j("help.alias.summary");
		},
		get help() {
			return j("help.alias.text");
		},
		async run(e) {
			let t = e.shell.aliases, { args: n } = q(e, { flags: "p" });
			if (!n.length) {
				for (let [n, r] of [...t].sort()) await e.out(`alias ${n}=${K(r)}\n`);
				return 0;
			}
			let r = 0;
			for (let i of n) {
				let n = i.indexOf("=");
				if (n > 0) {
					let a = i.slice(0, n);
					if (/[\s/$`=|&;<>()'"\\]/.test(a)) {
						await e.error(j("alias.badName", { name: a })), r = 1;
						continue;
					}
					t.set(a, i.slice(n + 1));
				} else t.has(i) ? await e.out(`alias ${i}=${K(t.get(i))}\n`) : (await e.error(j("err.notFound", { name: i })), r = 1);
			}
			return r;
		}
	},
	{
		name: "unalias",
		get usage() {
			return j("help.unalias.usage");
		},
		get summary() {
			return j("help.unalias.summary");
		},
		async run(e) {
			let { opts: t, args: n } = q(e, { flags: "a" });
			if (t.a) return e.shell.aliases.clear(), 0;
			let r = 0;
			for (let t of n) e.shell.aliases.delete(t) || (await e.error(j("err.notFound", { name: t })), r = 1);
			return r;
		}
	},
	{
		name: "type",
		get usage() {
			return j("help.type.usage");
		},
		get summary() {
			return j("help.type.summary");
		},
		async run(e) {
			let { opts: t, args: n } = q(e, { flags: "ta" }), r = 0;
			for (let i of n) {
				let n = Kt(e.shell, i);
				n ? t.t ? await e.out(n.kind + "\n") : await e.out(n.text + "\n") : (t.t || await e.error(j("err.notFound", { name: i })), r = 1);
			}
			return r;
		}
	},
	{
		name: "command",
		get usage() {
			return j("help.command.usage");
		},
		get summary() {
			return j("help.command.summary");
		},
		async run(e) {
			let { opts: t, args: n } = q(e, {
				flags: "vVp",
				stopAtArg: !0
			});
			if (!n.length) return 0;
			if (t.v || t.V) {
				let r = 0;
				for (let i of n) {
					let n = Kt(e.shell, i);
					n ? await e.out((t.V ? n.text : n.kind === "alias" ? `alias ${i}=${K(e.shell.aliases.get(i))}` : n.path ?? i) + "\n") : r = 1;
				}
				return r;
			}
			return e.shell.invoke(n, e.io, { functions: !1 });
		}
	},
	{
		name: "which",
		get usage() {
			return j("help.which.usage");
		},
		get summary() {
			return j("help.which.summary");
		},
		async run(e) {
			let t = 0;
			for (let n of e.args) {
				let r = Kt(e.shell, n);
				!r || r.kind === "alias" || r.kind === "keyword" || r.kind === "function" ? t = 1 : await e.out((r.path ?? j("which.builtIn", { name: n })) + "\n");
			}
			return t;
		}
	},
	{
		name: "history",
		usage: "history [-c] [n]",
		get summary() {
			return j("help.history.summary");
		},
		async run(e) {
			let { opts: t, args: n } = q(e, { flags: "c" }), r = e.shell.host.history;
			if (!r) return 0;
			if (t.c) return r.clear(), 0;
			let i = r.list(), a = n[0] == null ? i.length : J(n[0]), o = Math.max(0, i.length - a);
			for (let t = o; t < i.length; t++) await e.out(`${String(t + 1).padStart(5)}  ${i[t]}\n`);
		}
	},
	{
		name: "help",
		get usage() {
			return j("help.help.usage");
		},
		get summary() {
			return j("help.help.summary");
		},
		async run(e) {
			let t = e.shell.commands;
			if (e.args.length) {
				let n = 0;
				for (let r of e.args) {
					let i = t.get(r);
					i ? await e.out(kt(i)) : Yt(r) ? await e.out(qt[Yt(r)]().trim() + "\n") : (await e.error(j("help.noHelp", { name: r })), n = 1);
				}
				return n;
			}
			let n = [...t.values()].filter((e, t, n) => n.indexOf(e) === t && !e.hidden).sort((e, t) => e.name.localeCompare(t.name)), r = Math.max(...n.map((e) => e.name.length)) + 2;
			await e.out(`${j("help.intro")}\n\n`);
			for (let t of n) await e.out(`  ${t.name.padEnd(r)}${t.summary ?? ""}${t.app ? ` (${t.app})` : ""}\n`);
			await e.out(`\n${j("help.syntaxList", { list: Object.keys(qt).map(Jt).join(", ") })}\n`);
		}
	},
	{
		name: "clear",
		usage: "clear",
		get summary() {
			return j("help.clear.summary");
		},
		async run(e) {
			e.stdout === e.shell.host.stdout ? e.shell.host.clear?.() : await e.out("\x1B[2J\x1B[H");
		}
	},
	{
		name: "jobs",
		usage: "jobs [-lp]",
		get summary() {
			return j("help.jobs.summary");
		},
		async run(e) {
			let { opts: t } = q(e, { flags: "lp" }), n = e.shell.jobs.list;
			for (let r of n) {
				let i = r === n.at(-1) ? "+" : r === n.at(-2) ? "-" : " ";
				t.p ? await e.out(`${r.pid}\n`) : await e.out(`[${r.id}]${i} ${t.l ? `${r.pid} ` : ""}${r.state === "done" ? r.code === 0 ? j("jobs.done") : j("jobs.exit", { code: r.code }) : j("jobs.running")}\t\t${r.text}\n`);
			}
		}
	},
	{
		name: "wait",
		usage: "wait [%job | pid…]",
		get summary() {
			return j("help.wait.summary");
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
				i ? n = await t.waitJob(i) : (await e.error(j("wait.notAJob", { spec: r })), n = 127);
			}
			return n;
		}
	},
	{
		name: "fg",
		usage: "fg [%job]",
		get summary() {
			return j("help.fg.summary");
		},
		async run(e) {
			let t = e.shell, n = t.findJob(e.args[0]);
			if (!n) throw new k(j("fg.noSuchJob", { job: e.args[0] ?? j("fg.current") }));
			await e.out(n.text + "\n");
			let r = await t.waitJob(n, { forward: !0 });
			return t.jobs.list = t.jobs.list.filter((e) => e !== n), r;
		}
	},
	{
		name: "kill",
		get usage() {
			return j("help.kill.usage");
		},
		get summary() {
			return j("help.kill.summary");
		},
		async run(e) {
			let t = e.args;
			if (t[0] === "-l") return await e.out("HUP INT QUIT KILL TERM\n"), 0;
			if (t[0] === "-s" || t[0] === "-n" ? t = t.slice(2) : /^-\w+$/.test(t[0] ?? "") && (t = t.slice(1)), !t.length) throw new k(j("help.usageShort", { usage: this.usage }), 2);
			let n = 0;
			for (let r of t) {
				let t = e.shell.findJob(r);
				t ? t.token.abort() : (await e.error(j("kill.noSuchJob", { spec: r })), n = 1);
			}
			return n;
		}
	},
	{
		name: "sleep",
		get usage() {
			return j("help.sleep.usage");
		},
		get summary() {
			return j("help.sleep.summary");
		},
		async run(e) {
			if (!e.args.length) throw new k(j("sleep.missing"), 2);
			let t = 0;
			for (let n of e.args) {
				let e = /^(\d+(?:\.\d*)?|\.\d+)([smhd]?)$/.exec(n);
				if (!e) throw new k(j("sleep.badDuration", { value: n }), 2);
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
			return j("help.bash.usage");
		},
		get summary() {
			return j("help.bash.summary");
		},
		get help() {
			return j("help.bash.text");
		},
		run: (e) => Gt(e)
	},
	{
		name: "sh",
		get usage() {
			return j("help.sh.usage");
		},
		get summary() {
			return j("help.sh.summary");
		},
		run: (e) => Gt(e)
	}
];
async function Wt(e) {
	let t = e.shell, [n, ...r] = e.args;
	if (!n) throw new k(j("source.noFile"), 2);
	let i = n;
	if (!n.includes("/") && !e.resolve(n)) {
		let r = (t.getVar("PATH") ?? "").split(":").find((t) => t && e.resolve(`${t}/${n}`)?.type === "file");
		r && (i = `${r}/${n}`);
	}
	let a = await t.readScript(i);
	try {
		ge(a, { aliases: t.aliases });
	} catch (e) {
		throw e instanceof O || e instanceof D ? new k(`${n}: ${e.message || j("parse.unexpectedEndOfFile")}`, 2) : e;
	}
	let o = t.positional;
	r.length && (t.positional = r), t.sourceDepth = (t.sourceDepth ?? 0) + 1;
	try {
		return await t.exec({
			type: "script",
			source: a
		}, e.io);
	} catch (e) {
		if (e instanceof ee) return e.code;
		throw e;
	} finally {
		t.sourceDepth--, r.length && (t.positional = o);
	}
}
async function Gt(e) {
	let t = e.shell, n = [...e.args], r = {
		e: !1,
		x: !1,
		u: !1
	}, i = null;
	for (; n.length && /^-[cexu]+$/.test(n[0]);) for (let e of n.shift().slice(1)) e === "c" ? i = n.shift() : r[e] = !0;
	if (i == null && n[0] === "-c") throw new k(j("bash.noCommand"), 2);
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
			throw e instanceof k ? new k(e.message, e.code) : e;
		}
		return a.runSource(r, e.io, n[0]);
	}
	return e.stdin === t.host.stdin ? (await e.err(`${j("bash.already")}\n`), 0) : a.runSource(await e.stdin.readAll(), e.io, "bash");
}
function Kt(e, t) {
	if (e.aliases.has(t)) return {
		kind: "alias",
		text: j("type.alias", {
			name: t,
			value: e.aliases.get(t)
		})
	};
	if (Pt.includes(t)) return {
		kind: "keyword",
		text: j("type.keyword", { name: t })
	};
	if (e.functions.has(t)) return {
		kind: "function",
		text: `${j("type.function", { name: t })}\n${e.functions.get(t).text}`
	};
	let n = e.commands.get(t);
	if (n?.builtin) return {
		kind: "builtin",
		text: j("type.builtin", { name: t })
	};
	if (n?.app) return {
		kind: "file",
		text: j("type.appCommand", {
			name: t,
			app: n.app
		})
	};
	if (n) return {
		kind: "file",
		text: j("type.command", { name: t })
	};
	for (let n of (e.getVar("PATH") ?? "").split(":").filter(Boolean)) for (let r of [t, `${t}.sh`]) {
		let i = e.resolve(`${n}/${r}`);
		if (i?.type === "file") return {
			kind: "file",
			text: j("type.file", {
				name: t,
				path: v.path(i.id)
			}),
			path: v.path(i.id)
		};
	}
	return t.includes("/") && e.resolve(t)?.type === "file" ? {
		kind: "file",
		text: j("type.file", {
			name: t,
			path: t
		}),
		path: t
	} : null;
}
var Y = (e) => e.replace(/[\]\\^-]/g, "\\$&"), qt = {
	if: () => j("syntax.if"),
	for: () => j("syntax.for"),
	while: () => j("syntax.while"),
	until: () => j("syntax.until"),
	case: () => j("syntax.case"),
	function: () => j("syntax.function"),
	"[[": () => j("syntax.cond"),
	"((": () => j("syntax.arith"),
	variables: () => j("syntax.variables"),
	redirections: () => j("syntax.redirections")
}, Jt = (e) => ({
	variables: j("syntax.topic.variables"),
	redirections: j("syntax.topic.redirections")
})[e] ?? e, Yt = (e) => Object.keys(qt).find((t) => t === e || Jt(t) === e), X = {
	reset: "\x1B[0m",
	folder: "\x1B[1;34m",
	app: "\x1B[36m",
	script: "\x1B[32m",
	dim: "\x1B[2m"
}, Xt = (e) => e.type === "file" && /\.(sh|bash)$/i.test(e.name), Zt = (e) => j("files.cannotAccess", { path: e }), Qt = (e) => e.stdout === e.shell.host.stdout;
function $t(e) {
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
	return (n < 10 ? A.number(Number(n.toFixed(1)), { minimumFractionDigits: 1 }) : String(Math.round(n))) + t[r];
}
function en(e) {
	let t = new Date(e), n = /* @__PURE__ */ new Date(), r = j("ls.date", {
		day: String(t.getDate()).padStart(2),
		month: A.date(t, { month: "short" })
	});
	return Math.abs(n - t) < 15552e6 ? `${r} ${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}` : `${r}  ${t.getFullYear()}`;
}
var tn = (e) => e.type === "file" ? e.size ?? 0 : e.type === "folder" ? v.children(e.id).length : 0;
function nn(e, t, n = t.name, r = !1) {
	let i = r ? t.type === "folder" ? "/" : t.type === "app" ? "@" : Xt(t) ? "*" : "" : "";
	if (!Qt(e)) return n + i;
	let a = t.type === "folder" ? X.folder : t.type === "app" ? X.app : Xt(t) ? X.script : "";
	return a ? `${a}${n}${X.reset}${i}` : n + i;
}
function rn(e, t) {
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
function an(e, t) {
	let n = [...e].sort((e, n) => (t.t ? n.modified - e.modified : t.S ? tn(n) - tn(e) : 0) || B(e.name, n.name));
	return t.r ? n.reverse() : n;
}
async function on(e, t, n) {
	if (!t.length) return;
	if (!n.l) {
		if (n[1] || !Qt(e)) for (let { node: r, name: i } of t) await e.out(nn(e, r, i, n.F) + "\n");
		else {
			let r = t.map(({ node: t, name: r }) => ({
				text: nn(e, t, r, n.F),
				plain: r + (n.F && (t.type !== "file" || Xt(t)) ? " " : "")
			}));
			await e.out(rn(r, e.shell.host.columns?.() ?? 80));
		}
		return;
	}
	let r = t.map(({ node: t, name: r }) => {
		let i = t.type === "folder" ? "d" : t.type === "app" ? "l" : "-", a = t.type === "file" ? n.h ? $t(t.size ?? 0) : String(t.size ?? 0) : t.type === "folder" ? String(v.children(t.id).length) : "-", o = (t.tags ?? []).map((e) => x.get(e)?.name).filter(Boolean), s = nn(e, t, r, n.F);
		return t.type === "app" && (s += ` -> app:${t.app}`), o.length && (s += (Qt(e) ? X.dim : "") + " " + o.map((e) => "#" + e).join(" ") + (Qt(e) ? X.reset : "")), {
			type: i,
			size: a,
			date: en(t.modified ?? t.created ?? 0),
			shown: s
		};
	}), i = Math.max(...r.map((e) => e.size.length));
	for (let t of r) await e.out(`${t.type}  ${t.size.padStart(i)}  ${t.date}  ${t.shown}\n`);
}
var sn = (e, t) => v.children(e).filter((e) => t.a || t.A || !e.name.startsWith("."));
async function cn(e) {
	let { opts: t, args: n } = q(e, {
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
	}), r = n.length ? n : ["."], i = 0, a = [], o = [];
	for (let n of r) {
		let r = e.resolve(n);
		r ? r.type === "folder" && !t.d ? o.push({
			node: r,
			name: n
		}) : a.push({
			node: r,
			name: n
		}) : (await e.error(Zt(n)), i = 2);
	}
	await on(e, an(a.map((e) => ({
		...e.node,
		shownName: e.name
	})), t).map((e) => ({
		node: e,
		name: e.shownName
	})), t);
	let s = r.length > 1 || t.R, c = !a.length, l = async (n, r) => {
		await e.tick(), s && await e.out(`${c ? "" : "\n"}${r}:\n`), c = !1;
		let i = an(sn(n.id, t), t), a = i.map((e) => ({
			node: e,
			name: e.name
		}));
		if (t.a && a.unshift({
			node: n,
			name: "."
		}, ...n.id === v.root ? [] : [{
			node: v.get(n.parent),
			name: ".."
		}]), await on(e, a, t), t.R) for (let e of i.filter((e) => e.type === "folder")) await l(e, `${r.replace(/\/$/, "")}/${e.name}`);
	};
	for (let { node: e, name: t } of o) await l(e, t);
	return i;
}
async function ln(e) {
	let { opts: t, args: n } = q(e, {
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
function un(e, t) {
	let n = v.get(v.root);
	for (let r of z(e.cwd, t)) {
		let e = v.children(n.id).find((e) => e.name.toLowerCase() === r.toLowerCase()) ?? v.resolve(`${v.path(n.id)}/${r}`);
		if (e && e.type !== "folder") throw new k(j("mkdir.notAFolder", {
			path: t,
			name: r
		}));
		n = e ?? v.create(n.id, {
			type: "folder",
			name: r
		});
	}
	return n;
}
async function dn(e) {
	let { opts: t, args: n } = q(e, {
		flags: "pv",
		long: {
			parents: "p",
			verbose: "v"
		}
	});
	if (!n.length) throw new k(j("err.missingOperand"), 2);
	let r = 0;
	for (let i of n) try {
		let n = e.resolve(i);
		if (n) {
			if (t.p && n.type === "folder") continue;
			throw new k(j("mkdir.exists", { path: i }));
		}
		if (t.p) un(e, i);
		else {
			let { parent: t, name: n } = e.locate(i);
			if (t?.type !== "folder" || !n) throw new k(j("mkdir.noParent", { path: i }));
			v.create(t.id, {
				type: "folder",
				name: n
			});
		}
		t.v && await e.out(`${j("mkdir.created", { path: i })}\n`);
	} catch (t) {
		await e.error(t.message), r = 1;
	}
	return r;
}
async function fn(e) {
	let { opts: t, args: n } = q(e, {
		flags: "cam",
		long: { "no-create": "c" }
	});
	if (!n.length) throw new k(j("err.missingOperand"), 2);
	let r = 0;
	for (let i of n) {
		let n = e.resolve(i);
		if (n) {
			n.type === "file" && await (v.copyContent ? v.copyContent(n.id, n.id) : v.write(n.id, await v.readBlob(n.id)));
			continue;
		}
		if (t.c) continue;
		let { parent: a, name: o } = e.locate(i);
		a?.type !== "folder" || !o ? (await e.error(j("files.cannotCreate", { path: i })), r = 1) : v.create(a.id, {
			type: "file",
			name: o
		});
	}
	return r;
}
async function pn(e, t, n, r, i) {
	await e.tick();
	let a = v.children(n).find((e) => e.name.toLowerCase() === r.toLowerCase());
	if (t.type === "folder") {
		let o = a;
		if (o && o.type !== "folder") throw new k(j("cp.overwriteFile", { name: r }));
		o ??= v.create(n, {
			type: "folder",
			name: r,
			color: t.color
		});
		for (let n of v.children(t.id)) await pn(e, n, o.id, n.name, i);
		return;
	}
	if (a) {
		if (i.n) return;
		if (a.type === "folder") throw new k(j("files.overwriteFolder", { name: r }));
		if (a.type === "file" && t.type === "file") {
			await (v.copyContent ? v.copyContent(t.id, a.id) : v.write(a.id, await v.readBlob(t.id))), i.v && await e.out(`${j("cp.verbose", {
				from: v.path(t.id),
				to: v.path(a.id)
			})}\n`);
			return;
		}
		v.trash([a.id]);
	}
	if (t.type === "file" && v.copy) {
		let a = await v.copy(t.id, n, { name: r });
		i.v && await e.out(`${j("cp.verbose", {
			from: v.path(t.id),
			to: v.path(a.id)
		})}
`);
		return;
	}
	let o = v.create(n, {
		type: t.type,
		name: r,
		app: t.app
	});
	t.type === "file" && await v.write(o.id, await v.readBlob(t.id)), i.v && await e.out(`${j("cp.verbose", {
		from: v.path(t.id),
		to: v.path(o.id)
	})}\n`);
}
function mn(e, t) {
	if (t.length < 2) throw new k(t.length ? j("files.missingDestination", { path: t[0] }) : j("err.missingOperand"), 2);
	let n = t.at(-1), r = t.slice(0, -1), i = e.resolve(n);
	if (r.length > 1 && i?.type !== "folder") throw new k(j("files.targetNotFolder", { path: n }));
	return {
		sources: r,
		target: (t) => {
			if (i?.type === "folder" && i.id !== t.id) return {
				parent: i,
				name: t.name
			};
			if (i) return {
				parent: v.get(i.parent),
				name: i.id === t.id ? z(e.cwd, n).at(-1) : i.name,
				existing: i
			};
			let { parent: r, name: a } = e.locate(n);
			if (r?.type !== "folder" || !a) throw new k(j("files.cannotCreate", { path: n }));
			return {
				parent: r,
				name: a
			};
		}
	};
}
async function hn(e) {
	let { opts: t, args: n } = q(e, {
		flags: "rRanvfp",
		long: {
			recursive: "r",
			"no-clobber": "n",
			verbose: "v",
			force: "f",
			archive: "a"
		}
	}), { sources: r, target: i } = mn(e, n), a = 0;
	for (let n of r) try {
		let r = e.resolve(n);
		if (!r) throw new k(j("files.cannotStat", { path: n }));
		if (r.type === "folder" && !(t.r || t.R || t.a)) throw new k(j("cp.omitting", { path: n }));
		let { parent: a, name: o } = i(r);
		if (r.type === "folder" && v.isInside(a.id, r.id)) throw new k(j("cp.intoItself", { path: n }));
		await pn(e, r, a.id, o, t);
	} catch (t) {
		if (!(t instanceof k) && !(t instanceof Error)) throw t;
		await e.error(t.message), a = 1;
	}
	return a;
}
async function gn(e) {
	let { opts: t, args: n } = q(e, {
		flags: "nvfi",
		long: {
			"no-clobber": "n",
			verbose: "v",
			force: "f"
		}
	}), { sources: r, target: i } = mn(e, n), a = 0;
	for (let n of r) try {
		let r = e.resolve(n);
		if (!r) throw new k(j("files.cannotStat", { path: n }));
		if (r.system) throw new k(j("mv.system", { path: n }));
		let { parent: a, name: o } = i(r);
		if (r.type === "folder" && v.isInside(a.id, r.id)) throw new k(j("mv.intoItself", { path: n }));
		let s = v.children(a.id).find((e) => e.id !== r.id && e.name.toLowerCase() === o.toLowerCase());
		if (s) {
			if (t.n) continue;
			if (s.type === "folder" && r.type !== "folder") throw new k(j("files.overwriteFolder", { name: o }));
			if (s.type === "folder" && v.children(s.id).length) throw new k(j("mv.notEmpty", {
				path: n,
				name: o
			}));
			v.trash([s.id]);
		}
		r.parent !== a.id && v.move(r.id, a.id), v.get(r.id).name !== o && v.rename(r.id, o), t.v && await e.out(`${j("mv.verbose", {
			from: n,
			to: v.path(r.id)
		})}\n`);
	} catch (t) {
		await e.error(t.message), a = 1;
	}
	return a;
}
async function _n(e) {
	let { opts: t, args: n } = q(e, {
		flags: "rRfvdi",
		long: {
			recursive: "r",
			force: "f",
			verbose: "v",
			dir: "d",
			purge: "P"
		}
	});
	if (!n.length && !t.f) throw new k(j("err.missingOperand"), 2);
	let r = 0;
	for (let i of n) {
		let n = e.resolve(i);
		if (!n) t.f || (await e.error(j("files.cannotRemove", {
			path: i,
			reason: j("reason.noSuchFile")
		})), r = 1);
		else try {
			if (n.id === v.root) throw new k(j("rm.home", { path: i }));
			if (n.type === "folder" && !(t.r || t.R)) {
				if (!t.d) throw new k(j("files.cannotRemove", {
					path: i,
					reason: j("reason.isADirectory")
				}));
				if (v.children(n.id).length) throw new k(j("files.cannotRemove", {
					path: i,
					reason: j("reason.notEmpty")
				}));
			}
			if (n.system) throw new k(j("files.cannotRemove", {
				path: i,
				reason: j("reason.system")
			}));
			if (t.P) v.remove(n.id);
			else if (!v.trash([n.id]).length) throw new k(j("files.cannotRemove", {
				path: i,
				reason: j("reason.containsSystem")
			}));
			t.v && await e.out(`${t.P ? j("rm.purged", { path: i }) : j("rm.trashed", { path: i })}\n`);
		} catch (t) {
			await e.error(t.message), r = 1;
		}
	}
	return r;
}
async function vn(e) {
	let { opts: t, args: n } = q(e, {
		flags: "pv",
		long: {
			parents: "p",
			verbose: "v"
		}
	});
	if (!n.length) throw new k(j("err.missingOperand"), 2);
	let r = 0;
	for (let i of n) {
		let n = t.p ? z(e.cwd, i).map((e, t, n) => "~/" + n.slice(0, n.length - t).join("/")) : [i];
		for (let i of n) {
			let n = e.resolve(i), a = async (t) => {
				await e.error(j("files.cannotRemove", {
					path: i,
					reason: t
				})), r = 1;
			};
			if (!n) {
				await a(j("reason.noSuchFile"));
				break;
			}
			if (n.type !== "folder") {
				await a(j("reason.notADirectory"));
				break;
			}
			if (v.children(n.id).length) {
				await a(j("reason.notEmpty"));
				break;
			}
			if (n.system || n.id === v.root) {
				await a(j("reason.system"));
				break;
			}
			v.trash([n.id]), t.v && await e.out(`${j("rmdir.removed", { path: i })}\n`);
		}
	}
	return r;
}
var yn = (e) => A.date(e, {
	dateStyle: "medium",
	timeStyle: "medium"
}), bn = (e) => e.type === "folder" ? j("stat.folder") : e.type === "app" ? j("stat.appLink", { app: e.app }) : e.size ? j("stat.file") : j("stat.emptyFile");
async function xn(e) {
	let { opts: t, args: n } = q(e, {
		values: "c",
		long: { format: "c" }
	});
	if (!n.length) throw new k(j("err.missingOperand"), 2);
	let r = 0;
	for (let i of n) {
		let n = e.resolve(i);
		if (!n) {
			await e.error(Zt(i)), r = 1;
			continue;
		}
		if (t.c != null) {
			let r = {
				n: i,
				N: `'${i}'`,
				s: String(n.size ?? 0),
				F: bn(n),
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
		let a = (n.tags ?? []).map((e) => x.get(e)?.name).filter(Boolean);
		await e.out([
			`  File: ${i}`,
			`  ${j("stat.type", { type: bn(n) })}`,
			`  ${j("stat.path", { path: v.path(n.id) })}`,
			n.type === "folder" ? `  ${j("stat.items", {
				n: v.children(n.id).length,
				total: v.count(n.id)
			})}` : n.type === "file" ? `  ${j("stat.size", {
				size: n.size ?? 0,
				human: $t(n.size ?? 0)
			})}` : null,
			`  ${j("stat.created", { date: yn(n.created) })}`,
			`  ${j("stat.modified", { date: yn(n.modified) })}`,
			a.length ? `  ${j("stat.tags", { tags: a.join(", ") })}` : null,
			n.system ? `  ${j("stat.system")}` : null,
			`  Id: ${n.id}`
		].filter(Boolean).join("\n") + "\n");
	}
	return r;
}
function Sn(e, t) {
	let n = 0, r = {
		maxdepth: Infinity,
		mindepth: 0
	}, i = [], a = () => {
		let e = o();
		for (; t[n] === "-o" || t[n] === "-or";) {
			n++;
			let t = o(), r = e;
			e = (e) => r(e) || t(e);
		}
		return e;
	}, o = () => {
		let e = s();
		for (;;) {
			if (t[n] === "-a" || t[n] === "-and") n++;
			else if (n >= t.length || t[n] === "-o" || t[n] === "-or" || t[n] === ")") return e;
			let r = s(), i = e;
			e = (e) => i(e) && r(e);
		}
	}, s = () => {
		if (t[n] === "!" || t[n] === "-not") {
			n++;
			let e = s();
			return (t) => !e(t);
		}
		return l();
	}, c = (e) => {
		if (n >= t.length) throw new k(j("find.missingArgument", { name: e }));
		return t[n++];
	}, l = () => {
		let o = t[n++];
		switch (o) {
			case "(": {
				let e = a();
				if (t[n++] !== ")") throw new k(j("err.missingParen"));
				return e;
			}
			case "-name": {
				let e = c(o);
				return (t) => R(e, t.node.name);
			}
			case "-iname": {
				let e = c(o);
				return (t) => R(e, t.node.name, { ignoreCase: !0 });
			}
			case "-path":
			case "-wholename": {
				let e = c(o);
				return (t) => R(e, t.path);
			}
			case "-ipath": {
				let e = c(o);
				return (t) => R(e, t.path, { ignoreCase: !0 });
			}
			case "-type": {
				let e = c(o), t = {
					f: "file",
					d: "folder",
					l: "app"
				}[e];
				if (!t) throw new k(j("find.badType", { type: e }));
				return (e) => e.node.type === t;
			}
			case "-empty": return (e) => e.node.type === "folder" ? !v.children(e.node.id).length : e.node.type === "file" && !e.node.size;
			case "-size": {
				let e = c(o), t = /^([+-]?)(\d+)([ckMG]?)$/.exec(e);
				if (!t) throw new k(j("find.badSize", { value: e }));
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
				let e = c(o), t = /^([+-]?)(\d+)$/.exec(e);
				if (!t) throw new k(j("find.badValue", {
					option: o,
					value: e
				}));
				let n = o === "-mtime" ? 864e5 : 6e4;
				return (e) => {
					let r = Math.floor((Date.now() - e.node.modified) / n);
					return t[1] === "+" ? r > +t[2] : t[1] === "-" ? r < +t[2] : r === +t[2];
				};
			}
			case "-newer": {
				let r = e.resolve(c(o));
				if (!r) throw new k(j("find.cannotFind", { path: t[n - 1] }));
				return (e) => e.node.modified > r.modified;
			}
			case "-maxdepth": return r.maxdepth = J(c(o)), () => !0;
			case "-mindepth": return r.mindepth = J(c(o)), () => !0;
			case "-true": return () => !0;
			case "-false": return () => !1;
			case "-print": return r.printed = !0, (e) => (e.out.push(e.path), !0);
			case "-print0": return r.printed = !0, (e) => (e.out.push(e.path + "\0"), !0);
			case "-delete": return r.printed = !0, (e) => (e.deletes.push(e.node.id), !0);
			case "-exec":
			case "-ok": {
				let e = [];
				for (; n < t.length && t[n] !== ";" && t[n] !== "+";) e.push(t[n++]);
				let a = t[n] === "+";
				if (n >= t.length) throw new k(j("find.execEnd"));
				if (n++, !e.length) throw new k(j("find.execCommand"));
				r.printed = !0;
				let o = {
					cmd: e,
					plus: a,
					batch: []
				};
				return i.push(o), (t) => a ? (o.batch.push(t.path), !0) : (t.runs.push(e.map((e) => e.replaceAll("{}", t.path))), !0);
			}
		}
		throw new k(j("find.unknownPredicate", { name: o }));
	}, u = t.length ? a() : () => !0;
	if (n < t.length) throw new k(j("find.unexpected", { arg: t[n] }));
	return {
		expr: u,
		global: r,
		execs: i
	};
}
async function Cn(e) {
	let t = e.args, n = 0;
	for (; n < t.length && !/^[-(!]/.test(t[n]);) n++;
	let r = n ? t.slice(0, n) : ["."], { expr: i, global: a, execs: o } = Sn(e, t.slice(n)), s = 0, c = [], l = async (t) => {
		let n = await e.shell.invoke(t, e.io);
		return n !== 0 && (s = 1), n === 0;
	};
	for (let t of r) {
		let n = e.resolve(t);
		if (!n) {
			await e.error(j("files.quotedNoSuchFile", { path: t })), s = 1;
			continue;
		}
		let r = async (t, n, o) => {
			if (await e.tick(), o >= a.mindepth) {
				let r = {
					node: t,
					path: n,
					out: [],
					deletes: c,
					runs: []
				};
				i(r) && !a.printed && r.out.push(n);
				for (let t of r.out) await e.out(t.endsWith("\0") ? t : t + "\n");
				for (let e of r.runs) await l(e);
			}
			if (t.type === "folder" && o < a.maxdepth) for (let e of [...v.children(t.id)].sort((e, t) => B(e.name, t.name))) await r(e, n.endsWith("/") ? n + e.name : `${n}/${e.name}`, o + 1);
		};
		await r(n, t, 0);
	}
	for (let e of o.filter((e) => e.plus && e.batch.length)) {
		let t = e.cmd.indexOf("{}");
		await l(t < 0 ? [...e.cmd, ...e.batch] : [
			...e.cmd.slice(0, t),
			...e.batch,
			...e.cmd.slice(t + 1)
		]);
	}
	return c.length && v.trash([...c].reverse().filter((e) => v.exists(e))), s;
}
async function wn(e) {
	let { opts: t, args: n } = q(e, {
		flags: "adf",
		values: "L"
	}), r = t.L == null ? Infinity : J(t.L), i = 0, a = 0, o = 0;
	for (let s of n.length ? n : ["."]) {
		let n = e.resolve(s);
		if (!n) {
			await e.error(j("files.quotedNoSuchFile", { path: s })), o = 1;
			continue;
		}
		await e.out(nn(e, n, s) + "\n");
		let c = async (n, o, s) => {
			if (s > r) return;
			let l = an(sn(n.id, t).filter((e) => !t.d || e.type === "folder"), {});
			for (let n = 0; n < l.length; n++) {
				await e.tick();
				let r = l[n], u = n === l.length - 1, d = t.f ? `${o.replace(/[│├└─ ]/g, "")}${r.name}` : r.name;
				await e.out(`${o}${u ? "└── " : "├── "}${nn(e, r, d)}${r.type === "app" ? ` -> app:${r.app}` : ""}\n`), r.type === "folder" ? (i++, await c(r, o + (u ? "    " : "│   "), s + 1)) : a++;
			}
		};
		await c(n, "", 1);
	}
	return await e.out(`\n${j("tree.folders", { n: i })}${t.d ? "" : `, ${j("tree.files", { n: a })}`}\n`), o;
}
async function Tn(e) {
	let { opts: t, args: n } = q(e, {
		flags: "az",
		values: "s",
		long: {
			multiple: "a",
			suffix: "s"
		}
	});
	if (!n.length) throw new k(j("err.missingOperand"), 2);
	let r = t.a || t.s != null ? n : [n[0]], i = t.s ?? (t.a ? null : n[1]);
	for (let n of r) {
		let r = n.replace(/\/+$/, "").split("/").pop() || (n.startsWith("/") ? "/" : "");
		i && r.endsWith(i) && r !== i && (r = r.slice(0, -i.length)), await e.out(r + (t.z ? "\0" : "\n"));
	}
}
async function En(e) {
	if (!e.args.length) throw new k(j("err.missingOperand"), 2);
	for (let t of e.args) {
		let n = t.replace(/\/+$/, ""), r = n.lastIndexOf("/");
		await e.out((r < 0 ? "." : r === 0 ? "/" : n.slice(0, r).replace(/\/+$/, "") || "/") + "\n");
	}
}
async function Dn(e) {
	let { opts: t, args: n } = q(e, { flags: "emq" }), r = 0;
	for (let i of n.length ? n : ["."]) {
		let n = e.resolve(i);
		n ? await e.out(v.path(n.id) + "\n") : t.m ? await e.out([v.home, ...z(e.cwd, i)].join("/") + "\n") : (t.q || await e.error(j("err.noSuchFile", { path: i })), r = 1);
	}
	return r;
}
var On = [
	{
		name: "ls",
		get usage() {
			return j("help.ls.usage");
		},
		get summary() {
			return j("help.ls.summary");
		},
		run: cn,
		get help() {
			return j("help.ls.text");
		}
	},
	{
		name: "cat",
		usage: "cat [-nbsE] [file…]",
		get summary() {
			return j("help.cat.summary");
		},
		run: ln,
		get help() {
			return j("help.cat.text");
		}
	},
	{
		name: "mkdir",
		get usage() {
			return j("help.mkdir.usage");
		},
		get summary() {
			return j("help.mkdir.summary");
		},
		run: dn,
		get help() {
			return j("help.mkdir.text");
		}
	},
	{
		name: "touch",
		usage: "touch [-c] file…",
		get summary() {
			return j("help.touch.summary");
		},
		run: fn
	},
	{
		name: "cp",
		get usage() {
			return j("help.cp.usage");
		},
		get summary() {
			return j("help.cp.summary");
		},
		run: hn,
		get help() {
			return j("help.cp.text");
		}
	},
	{
		name: "mv",
		get usage() {
			return j("help.mv.usage");
		},
		get summary() {
			return j("help.mv.summary");
		},
		run: gn,
		get help() {
			return j("help.mv.text");
		}
	},
	{
		name: "rm",
		get usage() {
			return j("help.rm.usage");
		},
		get summary() {
			return j("help.rm.summary");
		},
		run: _n,
		get help() {
			return j("help.rm.text");
		}
	},
	{
		name: "rmdir",
		get usage() {
			return j("help.rmdir.usage");
		},
		get summary() {
			return j("help.rmdir.summary");
		},
		run: vn
	},
	{
		name: "stat",
		get usage() {
			return j("help.stat.usage");
		},
		get summary() {
			return j("help.stat.summary");
		},
		run: xn,
		get help() {
			return j("help.stat.text");
		}
	},
	{
		name: "find",
		get usage() {
			return j("help.find.usage");
		},
		get summary() {
			return j("help.find.summary");
		},
		run: Cn,
		get help() {
			return j("help.find.text");
		}
	},
	{
		name: "tree",
		get usage() {
			return j("help.tree.usage");
		},
		get summary() {
			return j("help.tree.summary");
		},
		run: wn
	},
	{
		name: "basename",
		get usage() {
			return j("help.basename.usage");
		},
		get summary() {
			return j("help.basename.summary");
		},
		run: Tn
	},
	{
		name: "dirname",
		get usage() {
			return j("help.dirname.usage");
		},
		get summary() {
			return j("help.dirname.summary");
		},
		run: En
	},
	{
		name: "realpath",
		get usage() {
			return j("help.realpath.usage");
		},
		get summary() {
			return j("help.realpath.summary");
		},
		run: Dn
	}
], kn = /* @__PURE__ */ new Set([
	"(",
	")",
	"{",
	"}",
	"|",
	"+",
	"?"
]);
function An(e, t) {
	let n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (i === "[") {
			let t = r + 1, i = "[";
			for (e[t] === "^" && (i += "^", t++), e[t] === "]" && (i += "\\]", t++); t < e.length && e[t] !== "]"; t++) {
				if (e[t] === "[" && e[t + 1] === ":") {
					let n = e.indexOf(":]", t + 2);
					if (n > 0) {
						i += Re[e.slice(t + 2, n)] ?? "", t = n + 1;
						continue;
					}
				}
				i += e[t] === "\\" ? "\\\\" : e[t] === "[" ? "\\[" : e[t];
			}
			if (t >= e.length) throw new k(j("regex.unmatchedBracket"), 2);
			n += i + "]", r = t;
		} else if (i === "\\" && r + 1 < e.length) {
			let i = e[++r];
			i === "<" || i === ">" ? n += "\\b" : !t && kn.has(i) ? n += i : n += "\\" + i;
		} else !t && kn.has(i) ? n += "\\" + i : i === "*" && (r === 0 || !t && e.slice(0, r).endsWith("\\(")) ? n += "\\*" : n += i;
	}
	return n;
}
function jn(e, { extended: t = !1, fixed: n = !1, ignoreCase: r = !1, word: i = !1, line: a = !1, global: o = !1 } = {}) {
	let s = n ? Le(e) : An(e, t);
	i && (s = `(?<![\\w])(?:${s})(?![\\w])`), a && (s = `^(?:${s})$`);
	try {
		return new RegExp(s, (r ? "i" : "") + (o ? "g" : "") + "u");
	} catch {
		try {
			return new RegExp(s, (r ? "i" : "") + (o ? "g" : ""));
		} catch {
			throw new k(j("regex.invalid", { pattern: e }), 2);
		}
	}
}
// src/terminal/commands/text.js
var Mn = (e) => e.stdout === e.shell.host.stdout, Nn = (e) => new TextEncoder().encode(e).length;
function Z(e) {
	let t = e.split("\n"), n = e.endsWith("\n");
	return (n || e === "") && t.pop(), {
		lines: t,
		ended: n
	};
}
async function Pn(e) {
	let { opts: t, args: n } = q(e, {
		flags: "qv",
		values: "nc",
		long: {
			lines: "n",
			bytes: "c",
			quiet: "q"
		},
		number: !0
	}), r = t.n == null ? 10 : J(t.n), i = n.length ? n : ["-"], a = !0;
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
			let n = J(t.c);
			await e.out(n >= 0 ? i.slice(0, n) : i.slice(0, Math.max(0, i.length + n)));
			continue;
		}
		let { lines: n, ended: a } = Z(i), o = r >= 0 ? n.slice(0, r) : n.slice(0, Math.max(0, n.length + r)), s = o.map((e) => e + "\n").join("");
		await e.out(!a && o.length && o.length === n.length ? s.slice(0, -1) : s);
	}
	return +!!e.failed;
}
async function Fn(e) {
	let { opts: t, args: n } = q(e, {
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
			let n = String(t.c), r = J(n.replace(/^[+-]/, ""));
			await e.out(n.startsWith("+") ? a.slice(Math.max(0, r - 1)) : a.slice(Math.max(0, a.length - r)));
			continue;
		}
		let o = String(t.n ?? "10"), { lines: s, ended: c } = Z(a), l = J(o.replace(/^[+-]/, "")), u = o.startsWith("+") ? s.slice(Math.max(0, l - 1)) : l === 0 ? [] : s.slice(-l), d = u.map((e) => e + "\n").join("");
		await e.out(!c && u.length ? d.slice(0, -1) : d);
	}
	return +!!e.failed;
}
async function In(e) {
	let { opts: t, args: n } = q(e, {
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
		c: Nn(r),
		m: [...r].length,
		L: Math.max(0, ...r.split("\n").map((e) => e.length))
	});
	i.length > 1 && i.push({
		name: j("wc.total"),
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
async function Ln(e) {
	let { opts: t, args: n } = q(e, {
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
	}), r = [...n], i = t.e ?? [];
	for (let n of t.f ?? []) {
		let t = e.resolve(n);
		if (t?.type !== "file") throw new k(j("err.noSuchFile", { path: n }), 2);
		i.push(...(await v.read(t.id)).split("\n").filter(Boolean));
	}
	if (!i.length) {
		if (!r.length) throw new k(j("grep.noPattern"), 2);
		i = [r.shift()];
	}
	let a = {
		extended: t.E || t.P,
		fixed: t.F,
		ignoreCase: t.i,
		word: t.w,
		line: t.x
	}, o = i.map((e) => jn(e, a)), s = i.map((e) => jn(e, {
		...a,
		global: !0
	})), c = Mn(e), l = t.r || t.R, u = [], d = (e, t) => {
		if (e.type === "file") u.push(t);
		else if (e.type === "folder") for (let n of [...v.children(e.id)].sort((e, t) => B(e.name, t.name))) d(n, t.endsWith("/") ? t + n.name : `${t}/${n.name}`);
	};
	if (l) for (let n of r.length ? r : ["."]) {
		let r = e.resolve(n);
		r ? d(r, n) : (t.s || await e.error(j("err.noSuchFile", { path: n })), e.failed = !0);
	}
	else u.push(...r);
	let f = t.H || (u.length > 1 || l) && !t.h, p = J(t.A ?? t.C ?? 0), m = J(t.B ?? t.C ?? 0), h = t.m == null ? Infinity : J(t.m), g = !1, _ = (e) => c ? `\x1b[1;31m${e}\x1b[0m` : e, y = (e, n, r) => (f ? c ? `\x1b[35m${e}\x1b[0m${r}` : e + r : "") + (t.n ? c ? `\x1b[32m${n}\x1b[0m${r}` : n + r : ""), b = async (n, r) => {
		let { lines: i } = Z(r), a = 0, l = -1, u = 0;
		for (let r = 0; r < i.length && a < h; r++) {
			r % 2e3 == 0 && await e.tick();
			let d = i[r];
			if (o.some((e) => e.test(d)) === !!t.v) u > 0 && !t.c && !t.l && !t.L && !t.q && (await e.out(y(n, r + 1, "-") + d + "\n"), l = r, u--);
			else {
				if (a++, g = !0, t.q) return a;
				if (!(t.c || t.l || t.L)) {
					(m || p) && l >= 0 && r - m > l + 1 && await e.out(c ? "\x1B[36m--\x1B[0m\n" : "--\n");
					for (let t = Math.max(l + 1, r - m); t < r; t++) await e.out(y(n, t + 1, "-") + i[t] + "\n");
					if (t.o && !t.v) for (let t of s) for (let i of d.matchAll(t)) i[0] && await e.out(y(n, r + 1, ":") + _(i[0]) + "\n");
					else {
						let i = d;
						if (c && !t.v) for (let e of s) i = i.replace(e, (e) => e && _(e));
						await e.out(y(n, r + 1, ":") + i + "\n");
					}
					l = r, u = p;
				}
			}
		}
		return a;
	}, x = u.length ? u : ["-"];
	for (let n of x) {
		let r, i = n === "-" ? "(standard input)" : n;
		if (n === "-") r = await e.stdin.readAll();
		else {
			let i = e.resolve(n);
			if (!i) {
				t.s || await e.error(j("err.noSuchFile", { path: n })), e.failed = !0;
				continue;
			}
			if (i.type === "folder") {
				t.s || await e.error(j("err.isADirectory", { path: n }));
				continue;
			}
			if (i.type !== "file") continue;
			r = await v.read(i.id);
		}
		let a = await b(i, r);
		if (t.q && g) return 0;
		t.c && await e.out((f ? `${i}:` : "") + a + "\n"), t.l && a && await e.out(i + "\n"), t.L && !a && await e.out(i + "\n");
	}
	return e.failed && !t.q ? 2 : +!g;
}
function Rn(e, t, n) {
	if (!t) return e;
	let r = n == null ? e.trim().split(/\s+/) : e.split(n), i = t.end ?? r.length;
	return r.slice(t.start - 1, i).join(n ?? " ");
}
var zn = {
	K: 1e3,
	M: 1e6,
	G: 1e9,
	T: 0xe8d4a51000,
	k: 1e3
}, Bn = (e) => {
	let t = /^\s*([+-]?\d*[.,]?\d+)/.exec(e);
	return t ? Number(t[1].replace(",", ".")) : 0;
};
async function Vn(e) {
	let { opts: t, args: n } = q(e, {
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
	for await (let { text: t } of e.inputs(n)) r.push(...Z(t).lines);
	let i = null;
	if (t.k) {
		let e = /^(\d+)(?:\.\d+)?[a-zA-Z]*(?:,(\d+)(?:\.\d+)?[a-zA-Z]*)?$/.exec(t.k);
		if (!e) throw new k(j("sort.badKey", { key: t.k }), 2);
		i = {
			start: Number(e[1]),
			end: e[2] ? Number(e[2]) : null
		}, /n/.test(t.k) && (t.n = !0), /r/.test(t.k) && (t.r = !0);
	}
	let a = (e) => {
		let n = Rn(e, i, t.t);
		return t.b && (n = n.trim()), t.f && (n = n.toLowerCase()), n;
	}, o = (e, n) => {
		let r = a(e), i = a(n);
		if (t.n) return Bn(r) - Bn(i) || B(e, n);
		if (t.h) {
			let t = (e) => {
				let t = /^\s*([+-]?\d*\.?\d+)([KMGTk]?)/.exec(e);
				return t ? Number(t[1]) * (zn[t[2]] ?? 1) : 0;
			};
			return t(r) - t(i) || B(e, n);
		}
		return t.V ? r.localeCompare(i, void 0, { numeric: !0 }) : B(r, i) || (r < i ? -1 : +(r > i));
	};
	if (t.c) {
		for (let t = 1; t < r.length; t++) if (o(r[t - 1], r[t]) > 0) return await e.error(j("sort.disorder", {
			n: t + 1,
			line: r[t]
		})), 1;
		return 0;
	}
	r.sort(t.r ? (e, t) => o(t, e) : o), t.u && (r = r.filter((e, t) => t === 0 || o(r[t - 1], e) !== 0));
	let s = r.map((e) => e + "\n").join("");
	if (t.o) {
		let n = e.shell.fileFor(t.o).id;
		await v.write(n, s);
	} else await e.out(s);
	return e.failed ? 2 : 0;
}
async function Hn(e) {
	let { opts: t, args: n } = q(e, {
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
	}), [r, i] = n, a = [];
	for await (let { text: t } of e.inputs(r ? [r] : [])) a = Z(t).lines;
	let o = (e) => {
		let n = e;
		return t.f && (n = n.replace(RegExp(`^(\\s*\\S+){${J(t.f)}}`), "")), t.s && (n = n.slice(J(t.s))), t.i ? n.toLowerCase() : n;
	}, s = "";
	for (let e = 0; e < a.length;) {
		let n = e + 1;
		for (; n < a.length && o(a[n]) === o(a[e]);) n++;
		let r = n - e;
		(!t.d || r > 1) && (!t.u || r === 1) && (s += (t.c ? `${String(r).padStart(7)} ` : "") + a[e] + "\n"), e = n;
	}
	return i ? await v.write(e.shell.fileFor(i).id, s) : await e.out(s), +!!e.failed;
}
async function Un(e) {
	let { opts: t, args: n } = q(e, {
		flags: "ai",
		long: { append: "a" }
	}), r = n.map((t) => ({
		path: t,
		id: e.shell.fileFor(t).id
	})), i = "";
	for (let t; (t = await e.stdin.read()) != null;) i += t, await e.out(t);
	for (let e of r) {
		let n = t.a ? await v.read(e.id) : "";
		await v.write(e.id, n + i);
	}
}
function Wn(e) {
	let t = String(e).split(",").map((t) => {
		let n = /^(\d*)(-?)(\d*)$/.exec(t);
		if (!n || !n[1] && !n[3]) throw new k(j("cut.badList", { spec: e }), 2);
		let r = n[1] ? Number(n[1]) : 1;
		return [r, n[2] ? n[3] ? Number(n[3]) : Infinity : r];
	});
	return (e) => t.some(([t, n]) => e >= t && e <= n);
}
async function Gn(e) {
	let { opts: t, args: n } = q(e, {
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
	if (!t.f && !t.c && !t.b) throw new k(j("cut.noList"), 2);
	let r = t.d ?? "	";
	if (r.length !== 1) throw new k(j("cut.badDelimiter"), 2);
	let i = t.O ?? r, a = "";
	for await (let { text: o } of e.inputs(n)) for (let e of Z(o).lines) if (t.f) {
		if (!e.includes(r)) {
			t.s || (a += e + "\n");
			continue;
		}
		let n = Wn(t.f);
		a += e.split(r).filter((e, t) => n(t + 1)).join(i) + "\n";
	} else {
		let n = Wn(t.c ?? t.b);
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
function Kn(e) {
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
		if (r > i) throw new k(j("tr.reverseRange", { range: `${n[e].c}-${n[e + 2].c}` }));
		for (let e = r; e <= i; e++) t.push(String.fromCodePoint(e));
		e += 2;
	} else t.push(n[e].c);
	return t;
}
async function qn(e) {
	let { opts: t, args: n } = q(e, {
		flags: "dscC",
		long: {
			delete: "d",
			"squeeze-repeats": "s",
			complement: "c"
		}
	});
	if (!n.length) throw new k(j("err.missingOperand"), 2);
	let r = Kn(n[0]), i = n[1] == null ? null : Kn(n[1]);
	if (!t.d && !t.s && !i) throw new k(j("tr.missingSet2", { set: n[0] }), 2);
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
async function Jn(e) {
	let t = "";
	for await (let { text: n } of e.inputs(e.args)) {
		let { lines: e } = Z(n);
		t += e.map((e) => [...e].reverse().join("") + "\n").join("");
	}
	return await e.out(t), +!!e.failed;
}
async function Yn(e) {
	let { opts: t, args: n } = q(e, { values: "bwsv" }), r = t.b === "a", i = t.w == null ? 6 : J(t.w), a = t.s ?? "	", o = t.v == null ? 1 : J(t.v), s = "";
	for await (let { text: t } of e.inputs(n)) for (let e of Z(t).lines) s += r || e.trim() ? `${String(o++).padStart(i)}${a}${e}\n` : `${" ".repeat(i)}${a}${e}\n`.replace(/^\s+\t\n$/, "\n");
	await e.out(s);
}
async function Xn(e) {
	let { opts: t, args: n } = q(e, {
		flags: "w",
		values: "sf",
		long: {
			separator: "s",
			"equal-width": "w",
			format: "f"
		}
	}), r = n.map((e) => {
		if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(e)) throw new k(j("seq.badArgument", { value: e }), 2);
		return Number(e);
	});
	if (!r.length || r.length > 3) throw new k(j("help.usageShort", { usage: j("help.seq.usage") }), 2);
	let [i, a, o] = r.length === 1 ? [
		1,
		1,
		r[0]
	] : r.length === 2 ? [
		r[0],
		1,
		r[1]
	] : r;
	if (a === 0) throw new k(j("seq.zeroStep"), 2);
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
async function Zn(e) {
	let t = (e.args.length ? e.args.join(" ") : "y") + "\n", n = t.repeat(Math.max(1, Math.floor(4096 / t.length)));
	for (;;) await e.out(n), await e.tick();
}
function Qn(e) {
	let t = [], n = "", r = !1, i = null;
	for (let a = 0; a < e.length; a++) {
		let o = e[a];
		i ? o === i ? i = null : n += o : o === "\"" || o === "'" ? (i = o, r = !0) : o === "\\" && a + 1 < e.length ? (n += e[++a], r = !0) : /\s/.test(o) ? (r && t.push(n), n = "", r = !1) : (n += o, r = !0);
	}
	if (i) throw new k(j(i === "\"" ? "xargs.unmatchedDouble" : "xargs.unmatchedSingle"));
	return r && t.push(n), t;
}
async function $n(e) {
	let { opts: t, args: n } = q(e, {
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
	a = t[0] ? i.split("\0").filter((e, t, n) => e !== "" || t < n.length - 1) : t.d == null ? t.I != null || t.L != null ? i.split("\n").map((e) => e.trim()).filter(Boolean) : Qn(i) : i.split(t.d.replace(/\\n/, "\n").replace(/\\t/, "	")).filter((e, t, n) => e !== "" || t < n.length - 1), t.d != null && a.at(-1)?.endsWith("\n") && (a[a.length - 1] = a.at(-1).slice(0, -1));
	let o = [];
	if (t.I != null) for (let e of a) o.push(r.map((n) => n.replaceAll(t.I, e)));
	else {
		let e = t.n == null ? t.L == null ? Infinity : J(t.L) : J(t.n);
		if (e < 1) throw new k(j("xargs.badCount"), 2);
		for (let n = 0; n < a.length; n += e === Infinity ? a.length : e) {
			let i = t.L == null ? a.slice(n, n + (e === Infinity ? a.length : e)) : a.slice(n, n + e).flatMap(Qn);
			o.push([...r, ...i]);
		}
		!a.length && !t.r && o.push([...r]);
	}
	let s = 0;
	for (let n of o) {
		(t.t || t.p) && await e.err(n.join(" ") + "\n");
		let r = await e.shell.invoke(n, {
			stdin: new W(),
			stdout: e.stdout,
			stderr: e.stderr
		});
		if (r === 127) return 127;
		r !== 0 && (s = 123);
	}
	return s;
}
var er = [
	{
		name: "head",
		get usage() {
			return j("help.head.usage");
		},
		get summary() {
			return j("help.head.summary");
		},
		run: Pn,
		get help() {
			return j("help.head.text");
		}
	},
	{
		name: "tail",
		get usage() {
			return j("help.tail.usage");
		},
		get summary() {
			return j("help.tail.summary");
		},
		run: Fn,
		get help() {
			return j("help.tail.text");
		}
	},
	{
		name: "wc",
		usage: "wc [-lwcmL] [file…]",
		get summary() {
			return j("help.wc.summary");
		},
		run: In,
		get help() {
			return j("help.wc.text");
		}
	},
	{
		name: "grep",
		get usage() {
			return j("help.grep.usage");
		},
		get summary() {
			return j("help.grep.summary");
		},
		run: Ln,
		get help() {
			return j("help.grep.text");
		}
	},
	{
		name: "sort",
		get usage() {
			return j("help.sort.usage");
		},
		get summary() {
			return j("help.sort.summary");
		},
		run: Vn,
		get help() {
			return j("help.sort.text");
		}
	},
	{
		name: "uniq",
		usage: "uniq [-cdui] [input [output]]",
		get summary() {
			return j("help.uniq.summary");
		},
		run: Hn,
		get help() {
			return j("help.uniq.text");
		}
	},
	{
		name: "tee",
		usage: "tee [-a] [file…]",
		get summary() {
			return j("help.tee.summary");
		},
		run: Un,
		get help() {
			return j("help.tee.text");
		}
	},
	{
		name: "cut",
		get usage() {
			return j("help.cut.usage");
		},
		get summary() {
			return j("help.cut.summary");
		},
		run: Gn,
		get help() {
			return j("help.cut.text");
		}
	},
	{
		name: "tr",
		get usage() {
			return j("help.tr.usage");
		},
		get summary() {
			return j("help.tr.summary");
		},
		run: qn,
		get help() {
			return j("help.tr.text");
		}
	},
	{
		name: "rev",
		usage: "rev [file…]",
		get summary() {
			return j("help.rev.summary");
		},
		run: Jn
	},
	{
		name: "nl",
		usage: "nl [-b a] [file…]",
		get summary() {
			return j("help.nl.summary");
		},
		run: Yn
	},
	{
		name: "seq",
		get usage() {
			return j("help.seq.usage");
		},
		get summary() {
			return j("help.seq.summary");
		},
		run: Xn,
		get help() {
			return j("help.seq.text");
		}
	},
	{
		name: "yes",
		get usage() {
			return j("help.yes.usage");
		},
		get summary() {
			return j("help.yes.summary");
		},
		run: Zn
	},
	{
		name: "xargs",
		get usage() {
			return j("help.xargs.usage");
		},
		get summary() {
			return j("help.xargs.summary");
		},
		run: $n,
		get help() {
			return j("help.xargs.text");
		}
	}
];
// src/terminal/commands/sed.js
function tr(e, t) {
	let n = [], r = [], i = 0, a = () => e[i], o = () => {
		for (; i < e.length && /[ \t]/.test(e[i]);) i++;
	}, s = (e) => {
		throw new k(j("sed.at", {
			pos: i,
			message: e
		}));
	}, c = (t, n) => {
		let r = "";
		for (;;) {
			i >= e.length && s(j("sed.unterminated"));
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
				n || s(j("sed.badAddress")), i += n[0].length, t.a2 = { plus: Number(n[0]) };
			} else t.a2 = u(), t.a2 || s(j("sed.missingAddress"));
		}
		for (o(); a() === "!";) t.neg = !t.neg, i++, o();
		let l = e[i++];
		switch (l ?? s(j("sed.missingCommand")), t.type = l, l) {
			case "{":
				r.push(n.length);
				break;
			case "}":
				r.length || s(j("sed.unexpectedBrace")), n[r.pop()].end = n.length;
				break;
			case "s": {
				let n = e[i++];
				n && n !== "\n" && n !== "\\" || s(j("sed.badDelimiter")), t.re = c(n, !0), t.rep = c(n, !1);
				let r = /^[gGiIpPe0-9mM]*/.exec(e.slice(i));
				i += r[0].length, t.global = /g/i.test(r[0]), t.print = /p/i.test(r[0]), t.ignoreCase = /i/i.test(r[0]), t.nth = Number(/\d+/.exec(r[0])?.[0] ?? 1);
				break;
			}
			case "y": {
				let n = e[i++], r = [...c(n, !1)], a = [...c(n, !1)];
				r.length !== a.length && s(j("sed.yLengths")), t.map = new Map(r.map((e, t) => [e, a[t]]));
				break;
			}
			case "a":
			case "i":
			case "c":
				t.text = f();
				break;
			case ":":
				t.label = d(), t.label || s(j("sed.noLabel"));
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
			default: s(j("sed.unknownCommand", { cmd: l }));
		}
		n.push(t);
	}
	r.length && s(j("sed.unmatchedBrace"));
	let p = new Map(n.map((e, t) => [e, t]).filter(([e]) => e.type === ":").map(([e, t]) => [e.label, t]));
	for (let e of n) {
		if ((e.type === "b" || e.type === "t" || e.type === "T") && e.label && !p.has(e.label)) throw new k(j("sed.noSuchLabel", { label: e.label }));
		for (let n of [e.a1, e.a2]) n?.re != null && (n.compiled = n.re === "" ? null : jn(n.re, {
			extended: t,
			ignoreCase: n.ignoreCase
		}));
		e.type === "s" && (e.compiled = e.re === "" ? null : jn(e.re, {
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
function nr(e, t) {
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
async function rr(e, t, n, { quiet: r, write: i }) {
	let { cmds: a, labels: o } = t, s = "", c = null, l = 0, u = 0, d = !1;
	for (let e of a) e.active = !1;
	let f = () => l >= n.length, p = (e, t, n) => {
		if (e.line != null) return n === e.line;
		if (e.last) return f();
		if (e.step) return e.step[1] > 0 ? n >= e.step[0] && (n - e.step[0]) % e.step[1] === 0 : n === e.step[0];
		let r = e.compiled ?? c;
		if (!r) throw new k(j("sed.noPreviousRegex"));
		return c = r, r.test(t);
	}, m = (e, t, n) => {
		let r;
		return e.a1 ? e.a2 ? e.active ? (r = !0, (e.a2.line == null ? e.a2.plus == null ? p(e.a2, t, n) : n >= e.end2 : n >= e.a2.line) && (e.active = !1)) : p(e.a1, t, n) ? (r = !0, e.active = !0, e.a2.line != null && e.a2.line <= n && (e.active = !1), e.a2.plus != null && (e.end2 = n + e.a2.plus, e.a2.plus === 0 && (e.active = !1))) : r = !1 : r = p(e.a1, t, n) : r = !0, e.neg ? !r : r;
	}, h = 0;
	for (; !d && l < n.length;) {
		let t = n[l++];
		h++;
		let p = "", g = !1, _ = !r, y = !1;
		await e.tick();
		cycle: for (;;) {
			for (let b = 0; b < a.length; b++) {
				let x = a[b];
				if (x.type !== "}" && x.type !== ":") {
					if (!m(x, t, h)) x.type === "{" && (b = x.end);
					else switch (x.type) {
						case "{": break;
						case "s": {
							let n = x.compiled ?? c;
							if (!n) throw new k(j("sed.noPreviousRegex"));
							c = n;
							let r = 0, i = !1, a = t.replace(new RegExp(n.source, n.flags.includes("g") ? n.flags : n.flags + "g"), (...e) => {
								let t = typeof e.at(-1) == "object" && e.at(-1) !== null, n = e.slice(0, t ? -3 : -2);
								return r++, r < x.nth || i && !x.global ? n[0] : (i = !0, nr(x.rep, n));
							});
							i && (t = a, g = !0, x.print && await e.out(t + "\n"));
							break;
						}
						case "y":
							t = [...t].map((e) => x.map.get(e) ?? e).join("");
							break;
						case "d":
							_ = !1;
							break cycle;
						case "D":
							if (!t.includes("\n")) {
								_ = !1;
								break cycle;
							}
							t = t.slice(t.indexOf("\n") + 1), y = !0, _ = !1;
							break cycle;
						case "p":
							await e.out(t + "\n");
							break;
						case "P":
							await e.out(t.split("\n")[0] + "\n");
							break;
						case "=":
							await e.out(h + "\n");
							break;
						case "l":
							await e.out(JSON.stringify(t).slice(1, -1) + "$\n");
							break;
						case "z":
							t = "";
							break;
						case "a":
							p += x.text + "\n";
							break;
						case "i":
							await e.out(x.text + "\n");
							break;
						case "c":
							x.a2 && x.active || await e.out(x.text + "\n"), _ = !1;
							break cycle;
						case "q":
							d = !0, u = x.code;
							break cycle;
						case "Q":
							d = !0, u = x.code, _ = !1;
							break cycle;
						case "n":
							if (r || await e.out(t + "\n"), p &&= (await e.out(p), ""), f()) {
								_ = !1, d = !0;
								break cycle;
							}
							t = n[l++], h++;
							break;
						case "N":
							if (f()) {
								d = !0;
								break cycle;
							}
							t += "\n" + n[l++], h++;
							break;
						case "h":
							s = t;
							break;
						case "H":
							s += "\n" + t;
							break;
						case "g":
							t = s;
							break;
						case "G":
							t += "\n" + s;
							break;
						case "x":
							[t, s] = [s, t];
							break;
						case "b":
							if (!x.label) break cycle;
							b = o.get(x.label);
							break;
						case "t":
						case "T":
							if (g === (x.type === "t")) {
								if (g = !1, !x.label) break cycle;
								b = o.get(x.label);
							}
							break;
						case "r": {
							let t = e.resolve(x.file);
							t?.type === "file" && (p += await v.read(t.id));
							break;
						}
						case "w": i(x.file, t + "\n");
					}
				}
			}
			break;
		}
		_ && await e.out(t + "\n"), p && await e.out(p), y && !d && (n.splice(l, 0, t), h--);
	}
	return u;
}
async function ir(e) {
	let { opts: t, args: n } = q(e, {
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
	}), r = [...n], i = [...t.e ?? []];
	for (let n of t.f ?? []) {
		let t = e.resolve(n);
		if (t?.type !== "file") throw new k(j("sed.cannotRead", { path: n }));
		i.push(await v.read(t.id));
	}
	if (!i.length) {
		if (!r.length) throw new k(j("sed.noScript"), 1);
		i.push(r.shift());
	}
	let a = tr(i.join("\n"), t.E || t.r), o = /* @__PURE__ */ new Map(), s = (e, t) => o.set(e, (o.get(e) ?? "") + t), c = 0;
	if (t.i || t.I != null) {
		if (!r.length) throw new k(j("sed.noFiles"));
		for (let n of r) {
			let r = e.resolve(n);
			if (r?.type !== "file") {
				await e.error(j("sed.cannotRead", { path: n })), c = 2;
				continue;
			}
			let { lines: i, ended: o } = ar(await v.read(r.id)), l = "";
			c = await rr({
				...e,
				out: (e) => {
					l += e;
				},
				tick: () => e.tick(),
				resolve: (t) => e.resolve(t)
			}, a, i, {
				quiet: t.n,
				write: s
			}) || c, await v.write(r.id, o || !l.endsWith("\n") ? l : l.slice(0, -1));
		}
	} else {
		let n = r.length ? r : ["-"], i = [], o = !0;
		for await (let { text: t } of e.inputs(n)) {
			let e = ar(t);
			i.push(...e.lines), o = e.ended;
		}
		let l = "";
		c = await rr({
			...e,
			out: (e) => {
				l += e;
			},
			tick: () => e.tick(),
			resolve: (t) => e.resolve(t)
		}, a, i, {
			quiet: t.n,
			write: s
		}), await e.out(o || !l.endsWith("\n") ? l : l.slice(0, -1)), e.failed && (c = 2);
	}
	for (let [t, n] of o) await v.write(e.shell.fileFor(t).id, n);
	return c;
}
function ar(e) {
	let t = e.split("\n"), n = e.endsWith("\n") || e === "";
	return n && t.pop(), {
		lines: t,
		ended: n
	};
}
var or = [{
	name: "sed",
	usage: "sed [-nEi] [-e script] [script] [file…]",
	get summary() {
		return j("help.sed.summary");
	},
	run: ir,
	get help() {
		return j("help.sed.text");
	}
}];
// src/terminal/commands/diff.js
function sr(e, t, n = (e, t) => e === t) {
	let r = 0, i = 0;
	for (; r < e.length && r < t.length && n(e[r], t[r]);) r++;
	for (; i < e.length - r && i < t.length - r && n(e[e.length - 1 - i], t[t.length - 1 - i]);) i++;
	let a = lr(e.slice(r, e.length - i), t.slice(r, t.length - i), n);
	for (let e of a) e.a += r, e.b += r;
	return a;
}
var cr = 4e7;
function lr(e, t, n) {
	let r = e.length, i = t.length, a = r + i, o = new Int32Array(2 * a + 2), s = [], c = !1;
	for (let l = 0; l <= a && !c; l++) {
		if ((l + 1) * o.length > cr) throw new k(j("diff.tooBig"), 2);
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
var ur = (e, t) => t <= 1 ? String(e + +!!t) : `${e + 1},${e + t}`, dr = (e, t) => t === 1 ? String(e + 1) : `${t ? e + 1 : e},${t}`;
function fr(e, t, n) {
	let r = "";
	for (let i of n) {
		let n = i.del && i.ins ? "c" : i.del ? "d" : "a";
		r += `${n === "a" ? String(i.a) : ur(i.a, i.del)}${n}${n === "d" ? String(i.b) : ur(i.b, i.ins)}\n`;
		for (let t = 0; t < i.del; t++) r += `< ${e[i.a + t]}\n`;
		n === "c" && (r += "---\n");
		for (let e = 0; e < i.ins; e++) r += `> ${t[i.b + e]}\n`;
	}
	return r;
}
function pr(e, t, n, r) {
	let i = "", a = [];
	for (let e of n) {
		let t = a.at(-1);
		t && e.a - (t.at(-1).a + t.at(-1).del) <= 2 * r ? t.push(e) : a.push([e]);
	}
	for (let n of a) {
		let a = n[0], o = n.at(-1), s = Math.max(0, a.a - r), c = Math.max(0, a.b - r), l = Math.min(e.length, o.a + o.del + r), u = Math.min(t.length, o.b + o.ins + r);
		i += `@@ -${dr(s, l - s)} +${dr(c, u - c)} @@\n`;
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
var mr = (e) => {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}:${n(t.getSeconds())}`;
};
async function hr(e) {
	let { opts: t, args: n } = q(e, {
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
	if (n.length !== 2) throw new k(n.length < 2 ? j("diff.missingOperand", { arg: n[0] ?? "diff" }) : j("diff.extraOperand", { arg: n[2] }), 2);
	let r = async (t) => {
		if (t === "-") return {
			text: await e.stdin.readAll(),
			time: Date.now()
		};
		let n = e.resolve(t);
		if (!n) throw new k(j("err.noSuchFile", { path: t }), 2);
		if (n.type !== "file") throw new k(n.type === "folder" ? j("err.isADirectory", { path: t }) : j("err.notAFile", { path: t }), 2);
		return {
			text: await v.read(n.id),
			time: n.modified
		};
	}, [i, a] = [await r(n[0]), await r(n[1])], o = (e) => {
		let t = e.split("\n");
		return (e.endsWith("\n") || e === "") && t.pop(), t;
	}, s = o(i.text), c = o(a.text), l = (e) => (t.i && (e = e.toLowerCase()), t.w ? e = e.replace(/\s+/g, "") : t.b && (e = e.replace(/\s+/g, " ").trimEnd()), e), u = sr(s, c, (e, t) => l(e) === l(t));
	if (t.B && (u = u.filter((e) => !(s.slice(e.a, e.a + e.del).every((e) => !e.trim()) && c.slice(e.b, e.b + e.ins).every((e) => !e.trim())))), !u.length) return t.s && await e.out(`${j("diff.identical", {
		a: n[0],
		b: n[1]
	})}\n`), 0;
	if (t.q) return await e.out(`${j("diff.differ", {
		a: n[0],
		b: n[1]
	})}\n`), 1;
	if (t.u || t.U != null) {
		let r = t.U == null ? 3 : J(t.U);
		await e.out(`--- ${n[0]}\t${mr(i.time)}\n+++ ${n[1]}\t${mr(a.time)}\n` + pr(s, c, u, r));
	} else await e.out(fr(s, c, u));
	return 1;
}
var gr = [{
	name: "diff",
	usage: "diff [-uqiwB] file1 file2",
	get summary() {
		return j("help.diff.summary");
	},
	run: hr,
	get help() {
		return j("help.diff.text");
	}
}], _r = (e) => e.stdout === e.shell.host.stdout, vr = (e) => {
	let t = String(e).toLowerCase();
	return At().find((e) => e.id.toLowerCase() === t) ?? At().find((e) => e.name.toLowerCase() === t) ?? null;
};
async function yr(e) {
	let { opts: t, args: n } = q(e, {
		values: "a",
		long: { app: "a" }
	});
	if (t.a != null) {
		let r = vr(t.a);
		if (!r) throw new k(j("open.noApp", { app: t.a }));
		if (!n.length) return jt(r.id), 0;
		for (let t of n) {
			let n = e.resolve(t);
			if (!n) throw new k(j("err.noSuchFile", { path: t }));
			jt(r.id, n.type === "folder" ? { folder: n.id } : { file: n.id });
		}
		return 0;
	}
	if (!n.length) throw new k(j("help.usageShort", { usage: e.cmd.usage }), 2);
	let r = 0;
	for (let t of n) {
		let n = e.resolve(t);
		n ? n.type === "folder" ? jt("files", { folder: n.id }) : n.type === "app" ? jt(n.app) : Mt(n) : (await e.error(j("err.noSuchFile", { path: t })), r = 1);
	}
	return r;
}
var br = (e) => A.date(e, {
	day: "2-digit",
	month: "short",
	hour: "2-digit",
	minute: "2-digit"
});
function xr(e, t) {
	let n = v.trashed();
	return t.map((e) => {
		let t = n.find((t) => t.id === e) ?? n.find((t) => t.name === e) ?? n.find((t) => t.name.toLowerCase() === e.toLowerCase());
		if (!t) throw new k(j("trash.notInTrash", { name: e }));
		return t;
	});
}
async function Sr(e) {
	let [t = "list", ...n] = e.args;
	switch (t) {
		case "list":
		case "ls": {
			let t = v.trashed();
			if (!t.length) return await e.out(`${j("trash.empty")}\n`), 0;
			for (let n of t) {
				let t = v.exists(n.trashed.from) ? v.path(n.trashed.from) : j("trash.deletedFolder"), r = n.type === "folder" ? j("trash.items", { n: n.inside }) : $t(n.bytes);
				await e.out(`${br(n.trashed.at)}  ${r.padStart(10)}  ${n.name}${n.type === "folder" ? "/" : ""}  ← ${t}\n`);
			}
			return 0;
		}
		case "put": {
			if (!n.length) throw new k(j("trash.missingPut"), 2);
			let t = 0;
			for (let r of n) {
				let n = e.resolve(r);
				n ? v.trash([n.id]).length || (await e.error(j("trash.cannotTrash", { path: r })), t = 1) : (await e.error(j("err.noSuchFile", { path: r })), t = 1);
			}
			return t;
		}
		case "restore":
			if (!n.length) throw new k(j("trash.missingRestore"), 2);
			for (let { id: t, parent: r } of v.untrash(xr(e, n).map((e) => e.id))) await e.out(`${j("trash.restored", { path: v.path(t) })}${v.root, ""}\n`);
			return 0;
		case "rm": {
			if (!n.length) throw new k(j("trash.missingName"), 2);
			let t = v.purge(xr(e, n).map((e) => e.id));
			return await e.out(`${j("trash.purged", { n: t })}\n`), 0;
		}
		case "empty": {
			let t = v.purgeTrash();
			return await e.out(`${t ? j("trash.emptied", { n: t }) : j("trash.alreadyEmpty")}\n`), 0;
		}
	}
	throw new k(`${j("err.unknownSubcommand", { sub: t })}\n${j("help.usageLine", { usage: e.cmd.usage })}`, 2);
}
function Cr(e, t = !1) {
	let n = x.byName(e) ?? x.get(e);
	if (n) return n;
	if (t) return x.create({ name: e });
	throw new k(j("tag.noSuchTag", { name: e }));
}
async function wr(e) {
	let [t = "ls", ...n] = e.args, r = (t) => _r(e) ? `\x1b[38;2;${parseInt(t.slice(1, 3), 16)};${parseInt(t.slice(3, 5), 16)};${parseInt(t.slice(5, 7), 16)}m●\x1b[0m ` : "";
	switch (t) {
		case "ls":
		case "list": {
			if (n.length) {
				for (let t of n) {
					let n = Cr(t);
					for (let t of v.tagged(n.id).sort((e, t) => B(v.path(e.id), v.path(t.id)))) await e.out(v.path(t.id) + (t.type === "folder" ? "/" : "") + "\n");
				}
				return 0;
			}
			let t = x.list();
			if (!t.length) return await e.out(`${j("tag.none")}\n`), 0;
			for (let n of t) await e.out(`${r(n.color)}${n.name}  (${v.tagged(n.id).length})${n.visible ? "" : `  ${j("tag.hidden")}`}\n`);
			return 0;
		}
		case "show": {
			let t = 0;
			for (let i of n.length ? n : ["."]) {
				let n = e.resolve(i);
				if (!n) {
					await e.error(j("err.noSuchFile", { path: i })), t = 1;
					continue;
				}
				let a = (n.tags ?? []).map((e) => x.get(e)).filter(Boolean).map((e) => r(e.color) + e.name);
				await e.out(`${i}: ${a.length ? a.join(", ") : j("tag.noTags")}\n`);
			}
			return t;
		}
		case "add":
		case "rm": {
			let [r, ...i] = n;
			if (!r || !i.length) throw new k(j("help.usageShort", { usage: j("tag.usageAddRm", { sub: t }) }), 2);
			let a = t === "add" && !x.byName(r), o = Cr(r, t === "add");
			a && await e.out(`${j("tag.created", { name: o.name })}\n`);
			let s = 0;
			for (let n of i) {
				let r = e.resolve(n);
				if (!r) {
					await e.error(j("err.noSuchFile", { path: n })), s = 1;
					continue;
				}
				if (r.system) {
					await e.error(j("tag.system", { path: n })), s = 1;
					continue;
				}
				let i = r.tags ?? [];
				v.setTags(r.id, t === "add" ? [...i, o.id] : i.filter((e) => e !== o.id));
			}
			return s;
		}
		case "new": {
			let [t, i] = n;
			if (!t) throw new k(j("help.usageShort", { usage: j("tag.usageNew") }), 2);
			let a = i ? b.find((e) => e.label.toLowerCase() === i.toLowerCase())?.value ?? i : void 0, o = x.create({
				name: t,
				color: a
			});
			return await e.out(`${j("tag.createdShown", { tag: r(o.color) + o.name })}\n`), 0;
		}
		case "delete":
			if (!n.length) throw new k(j("help.usageShort", { usage: j("tag.usageDelete") }), 2);
			for (let e of n) x.remove(Cr(e).id);
			return 0;
	}
	throw new k(`${j("err.unknownSubcommand", { sub: t })}\n${j("help.usageLine", { usage: e.cmd.usage })}`, 2);
}
async function Tr(e) {
	let t = [...At()].sort((e, t) => B(e.name, t.name)), n = Math.max(...t.map((e) => e.id.length));
	for (let r of t) {
		let t = r.package?.manifest?.version ?? "";
		await e.out(`${r.id.padEnd(n)}  ${r.name}${t ? `  ${t}` : ""}\n`);
	}
}
var Er = (e, t) => A.date(new Date(2024, 0, 7 + e, 12), { weekday: t }), Dr = (e, t) => A.date(new Date(2024, e, 15, 12), { month: t });
function Or(e, t, n = !1) {
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
		A: () => Er(r("Day"), "long"),
		a: () => Er(r("Day"), "short"),
		B: () => Dr(r("Month"), "long"),
		b: () => Dr(r("Month"), "short"),
		h: () => Dr(r("Month"), "short"),
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
		c: () => Or(j("date.formatC"), t, n),
		x: () => Or(j("date.formatX"), t, n),
		X: () => s.T(),
		n: () => "\n",
		t: () => "	",
		"%": () => "%"
	};
	return e.replace(/%([a-zA-Z%])/g, (e, t) => s[t] ? String(s[t]()) : e);
}
async function kr(e) {
	let { opts: t, args: n } = q(e, {
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
		if (r = /^@\d+$/.test(e) ? /* @__PURE__ */ new Date(Number(e.slice(1)) * 1e3) : e === "now" ? /* @__PURE__ */ new Date() : e === "yesterday" || e === "ieri" ? /* @__PURE__ */ new Date(Date.now() - 864e5) : e === "tomorrow" || e === "domani" ? new Date(Date.now() + 864e5) : new Date(e), Number.isNaN(r.getTime())) throw new k(j("date.invalid", { date: t.d }));
	}
	let i = n.find((e) => e.startsWith("+"));
	if (i) return e.out(Or(i.slice(1), r, t.u) + "\n");
	if (t.I != null) return e.out(Or(t.I === "seconds" ? "%Y-%m-%dT%H:%M:%S%z" : "%F", r, t.u) + "\n");
	if (t.R) return e.out(r.toUTCString() + "\n");
	await e.out(Or(j("date.format"), r, t.u) + "\n");
}
var Ar = [
	{
		name: "open",
		get usage() {
			return j("help.open.usage");
		},
		get summary() {
			return j("help.open.summary");
		},
		run: yr,
		get help() {
			return j("help.open.text");
		}
	},
	{
		name: "trash",
		get usage() {
			return j("help.trash.usage");
		},
		get summary() {
			return j("help.trash.summary");
		},
		run: Sr,
		get help() {
			return j("help.trash.text");
		}
	},
	{
		name: "tag",
		get usage() {
			return j("help.tag.usage");
		},
		get summary() {
			return j("help.tag.summary");
		},
		run: wr,
		get help() {
			return j("help.tag.text");
		}
	},
	{
		name: "apps",
		usage: "apps",
		get summary() {
			return j("help.apps.summary");
		},
		run: Tr
	},
	{
		name: "date",
		get usage() {
			return j("help.date.usage");
		},
		get summary() {
			return j("help.date.summary");
		},
		run: kr,
		get help() {
			return j("help.date.text");
		}
	},
	{
		name: "whoami",
		usage: "whoami",
		get summary() {
			return j("help.whoami.summary");
		},
		run: (e) => e.out((y.user?.username || e.shell.getVar("USER") || j("shell.defaultUser")) + "\n")
	},
	{
		name: "hostname",
		usage: "hostname",
		get summary() {
			return j("help.hostname.summary");
		},
		run: (e) => e.out((e.shell.getVar("HOSTNAME") ?? "lilos") + "\n")
	},
	{
		name: "uname",
		usage: "uname [-a]",
		get summary() {
			return j("help.uname.summary");
		},
		run: (e) => e.out(e.args.includes("-a") ? `lilOS lilos ${e.shell.getVar("BASH_VERSION")} ${navigator.platform || ""}\n`.replace(/ \n$/, "\n") : "lilOS\n")
	}
], jr = (e) => e.shell.host.remote ?? null;
async function Mr(e) {
	throw jr(e), new k(j("remote.cmd.unavailable"));
}
async function Nr(e) {
	throw jr(e), new k(j("remote.cmd.unavailable"));
}
var Pr = [
	{
		name: "ssh",
		get usage() {
			return j("help.ssh.usage");
		},
		get summary() {
			return j("help.ssh.summary");
		},
		run: Mr
	},
	{
		name: "telnet",
		get usage() {
			return j("help.telnet.usage");
		},
		get summary() {
			return j("help.telnet.summary");
		},
		run: Mr
	},
	{
		name: "rlogin",
		get usage() {
			return j("help.rlogin.usage");
		},
		get summary() {
			return j("help.rlogin.summary");
		},
		run: Mr
	},
	{
		name: "supdup",
		get usage() {
			return j("help.supdup.usage");
		},
		get summary() {
			return j("help.supdup.summary");
		},
		run: Mr
	},
	{
		name: "sessions",
		get usage() {
			return j("help.sessions.usage");
		},
		get summary() {
			return j("help.sessions.summary");
		},
		run: Nr
	}
], Fr = /^[a-z][\w.-]{0,39}$/, $ = /* @__PURE__ */ new Map();
for (let e of Ut) $.set(e.name, Object.assign(e, { builtin: !0 }));
for (let e of [
	...On,
	...er,
	...or,
	...gr,
	...Ar,
	...Pr
]) $.set(e.name, e);
function Ir() {
	let e = /* @__PURE__ */ new Map();
	for (let t of At()) {
		let n = t.package?.manifest?.contributes?.shell;
		if (Array.isArray(n)) for (let r of n.slice(0, 50)) r && Fr.test(r.name ?? "") && typeof r.entry == "string" && !$.has(r.name) && !e.has(r.name) && e.set(r.name, {
			name: r.name,
			app: t.name,
			summary: typeof r.summary == "string" ? r.summary.slice(0, 120) : j("appCmd.summary", { app: t.name }),
			usage: typeof r.usage == "string" ? r.usage.slice(0, 200) : j("appCmd.usage", { name: r.name }),
			ownHelp: r.help === !0,
			run: (e) => Lr(e, t.id, r.entry)
		});
	}
	return e;
}
async function Lr(e, t, n) {
	let r = e.shell, i = e.stdin === r.host.stdin ? null : await e.stdin.readAll(), a;
	try {
		a = await Nt(t, n, {
			command: e.name,
			args: e.args,
			stdin: i,
			cwd: v.path(e.cwd),
			env: r.environment()
		}, { from: "terminal" });
	} catch (e) {
		throw new k(e?.message ?? String(e));
	}
	return a == null ? 0 : typeof a == "string" ? (await e.out(a), 0) : (typeof a.stdout == "string" && await e.out(a.stdout), typeof a.stderr == "string" && await e.err(a.stderr), Number.isInteger(a.code) ? (a.code % 256 + 256) % 256 : 0);
}
var Rr = {
	get: (e) => $.get(e) ?? Ir().get(e) ?? null,
	has: (e) => $.has(e) || Ir().has(e),
	names: () => [...$.keys(), ...Ir().keys()],
	values: () => [...$.values(), ...Ir().values()]
};
globalThis.performance ??= { now: () => Date.now() }, globalThis.queueMicrotask ??= (e) => {
	Promise.resolve().then(e);
}, globalThis.structuredClone ??= (e) => e === void 0 ? void 0 : JSON.parse(JSON.stringify(e)), typeof globalThis.TextEncoder != "function" && (globalThis.TextEncoder = class {
	encode(e) {
		let t = [];
		for (let n of String(e)) {
			let e = n.codePointAt(0);
			e < 128 ? t.push(e) : e < 2048 ? t.push(192 | e >> 6, 128 | e & 63) : e < 65536 ? t.push(224 | e >> 12, 128 | e >> 6 & 63, 128 | e & 63) : t.push(240 | e >> 18, 128 | e >> 12 & 63, 128 | e >> 6 & 63, 128 | e & 63);
		}
		return new Uint8Array(t);
	}
});
async function zr(e, { lines: t = "", cwd: n = null } = {}, r) {
	if (r?.cancelled) return {
		ok: !1,
		code: 130,
		log: ""
	};
	let i;
	try {
		i = await C(e);
	} catch (e) {
		return {
			ok: !1,
			code: 1,
			error: e.message,
			log: ""
		};
	}
	let a = "", o = (e) => {
		a = (a + e).slice(-65536);
	}, s = new yt(o), c = {
		stdin: new W(),
		stdout: s,
		stderr: s,
		clear: () => {},
		columns: () => 120,
		history: {
			list: () => [],
			clear: () => {}
		}
	}, l = new Tt({
		host: c,
		commands: Rr
	});
	typeof n == "string" && i.get(n)?.type === "folder" && (l.cwd = n);
	let u = 0, d = r?.onCancel?.(() => l.token.abort());
	try {
		await l.run(String(t), c), u = l.token.aborted ? 130 : l.status;
	} catch (e) {
		e instanceof te ? u = e.code ?? 0 : e instanceof E ? u = 130 : e instanceof O || e instanceof D ? (o(`bash: ${e.message}\n`), u = 2) : (o(`bash: ${e?.message ?? e}\n`), u = 1);
	} finally {
		d?.();
	}
	try {
		await i.flush();
	} catch (e) {
		o(`bash: ${e.message}\n`), u ||= 1;
	}
	return {
		ok: u === 0,
		code: u,
		log: a
	};
}
function Br({ lilos: e }) {
	let t = Promise.resolve();
	e.handle((n, r, i) => {
		if (r !== "scheduler" || !n?.schedule) return {
			ok: !1,
			code: 2,
			error: "Il servizio shell esegue solo i comandi della Pianificazione"
		};
		let a = t.then(() => zr(e, n.schedule.params ?? {}, i));
		return t = a.catch(() => {}), a;
	});
}
export { Br as shell };
