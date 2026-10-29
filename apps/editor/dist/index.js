import { Emitter as e, SettingsWindow as t, UndoStack as n, Window as r, actionButton as i, fileType as a, fs as o, h as s, history as c, icon as l, openMenu as u, selectField as d, session as f, settings as ee, shortcuts as p, splitName as te, storage as m, textField as ne, toggle as re, trackDrag as ie, uid as h } from "/host/sdk.js";
import { FOLDER_COLOR as ae, addTarget as oe, confirmRemove as se, dragItems as ce, dropZone as le, handleCommand as g, launch as ue, linkEntry as de, markItem as fe, moveNode as pe, pickFile as _, recordCreated as me, renameNode as he } from "/host/system.js";
// src/editor/highlight.js
var v = /"(?:\\.|[^"\\\n])*"?/, y = /'(?:\\.|[^'\\\n])*'?/, ge = /\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/, b = (e) => RegExp(`\\b(?:${e.join("|")})\\b`), _e = /* @__PURE__ */ "async.await.break.case.catch.class.const.continue.debugger.default.delete.do.else.export.extends.finally.for.from.function.if.import.in.instanceof.interface.let.new.of.return.static.super.switch.this.throw.try.type.typeof.var.void.while.with.yield".split("."), ve = /* @__PURE__ */ "and.as.assert.async.await.break.class.continue.def.del.elif.else.except.finally.for.from.global.if.import.in.is.lambda.nonlocal.not.or.pass.raise.return.try.while.with.yield".split("."), ye = {
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
			[v, "st"],
			[y, "st"],
			[/`(?:\\[\s\S]|[^`\\])*`?/, "st"],
			[b(_e), "kw"],
			[b([
				"true",
				"false",
				"null",
				"undefined",
				"NaN",
				"Infinity"
			]), "nu"],
			[ge, "nu"],
			[/\b[A-Za-z_$][\w$]*(?=\s*\()/, "fn"]
		]
	},
	css: {
		label: "CSS",
		rules: [
			[/\/\*[\s\S]*?(?:\*\/|$)/, "cm"],
			[v, "st"],
			[y, "st"],
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
			[v, "st"],
			[y, "st"],
			[/&#?\w+;/, "nu"]
		]
	},
	json: {
		label: "JSON",
		rules: [
			[/"(?:\\.|[^"\\\n])*"(?=\s*:)/, "pr"],
			[v, "st"],
			[b([
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
			[v, "st"],
			[y, "st"],
			[/@[\w.]+/, "fn"],
			[b(ve), "kw"],
			[b([
				"True",
				"False",
				"None",
				"self"
			]), "nu"],
			[ge, "nu"],
			[/\b[A-Za-z_]\w*(?=\s*\()/, "fn"]
		]
	}
}, x = /* @__PURE__ */ new Map();
function be(e) {
	if (!x.has(e)) {
		let { rules: t } = ye[e] ?? ye.text, n = /* @__PURE__ */ new Set(["g", ...t.flatMap(([e]) => [...e.flags])]);
		x.set(e, t.length ? {
			re: new RegExp(t.map(([e]) => `(${e.source})`).join("|"), [...n].join("")),
			classes: t.map(([, e]) => e)
		} : null);
	}
	return x.get(e);
}
function S(e, t) {
	let n = be(t);
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
// src/editor/complete.js
var xe = /* @__PURE__ */ "console.document.window.globalThis.Math.JSON.Array.Object.String.Number.Boolean.Promise.Map.Set.WeakMap.Date.RegExp.Error.Symbol.fetch.setTimeout.setInterval.clearTimeout.clearInterval.requestAnimationFrame.localStorage.parseInt.parseFloat.isNaN.structuredClone.true.false.null.undefined".split("."), Se = /* @__PURE__ */ "log.warn.error.info.length.push.pop.shift.unshift.slice.splice.concat.map.filter.reduce.forEach.find.findIndex.some.every.includes.indexOf.join.sort.reverse.flat.flatMap.at.split.trim.toLowerCase.toUpperCase.replace.replaceAll.startsWith.endsWith.padStart.keys.values.entries.assign.then.catch.finally.resolve.all.addEventListener.removeEventListener.querySelector.querySelectorAll.getElementById.createElement.append.appendChild.remove.classList.textContent.style.dataset.parse.stringify.floor.ceil.round.max.min.abs.random.now.toString.toFixed.get.set.has.delete.size".split("."), Ce = /* @__PURE__ */ "print.len.range.str.int.float.bool.list.dict.set.tuple.open.input.enumerate.zip.map.filter.sorted.reversed.sum.min.max.abs.round.isinstance.type.super.self.True.False.None".split("."), we = /* @__PURE__ */ "append.extend.insert.pop.remove.sort.copy.keys.values.items.get.update.split.join.strip.lower.upper.replace.format.startswith.endswith.find.count.read.write.readlines.close".split("."), Te = /* @__PURE__ */ "align-content.align-items.align-self.animation.aspect-ratio.background.background-color.background-image.background-position.background-repeat.background-size.border.border-bottom.border-color.border-left.border-radius.border-right.border-style.border-top.border-width.bottom.box-shadow.box-sizing.color.column-gap.content.cursor.display.filter.flex.flex-basis.flex-direction.flex-grow.flex-shrink.flex-wrap.font.font-family.font-size.font-style.font-weight.gap.grid.grid-area.grid-column.grid-row.grid-template-areas.grid-template-columns.grid-template-rows.height.inset.justify-content.justify-items.justify-self.left.letter-spacing.line-height.list-style.margin.margin-bottom.margin-left.margin-right.margin-top.max-height.max-width.min-height.min-width.object-fit.opacity.outline.overflow.overflow-x.overflow-y.padding.padding-bottom.padding-left.padding-right.padding-top.pointer-events.position.right.row-gap.text-align.text-decoration.text-overflow.text-transform.top.transform.transition.user-select.vertical-align.visibility.white-space.width.word-break.z-index".split("."), Ee = [
	"auto",
	"none",
	"inherit",
	"initial",
	"unset",
	"0",
	"100%",
	"transparent",
	"currentColor",
	"var(--|)",
	"calc(|)"
], C = [
	"flex-start",
	"flex-end",
	"center",
	"space-between",
	"space-around",
	"space-evenly",
	"stretch",
	"start",
	"end",
	"baseline"
], De = {
	display: [
		"block",
		"inline",
		"inline-block",
		"flex",
		"inline-flex",
		"grid",
		"inline-grid",
		"contents",
		"none"
	],
	position: [
		"static",
		"relative",
		"absolute",
		"fixed",
		"sticky"
	],
	"flex-direction": [
		"row",
		"column",
		"row-reverse",
		"column-reverse"
	],
	"flex-wrap": [
		"nowrap",
		"wrap",
		"wrap-reverse"
	],
	"justify-content": C,
	"align-items": C,
	"align-content": C,
	"align-self": C,
	"justify-items": C,
	"justify-self": C,
	"text-align": [
		"left",
		"right",
		"center",
		"justify",
		"start",
		"end"
	],
	overflow: [
		"visible",
		"hidden",
		"scroll",
		"auto",
		"clip"
	],
	"overflow-x": [
		"visible",
		"hidden",
		"scroll",
		"auto"
	],
	"overflow-y": [
		"visible",
		"hidden",
		"scroll",
		"auto"
	],
	cursor: [
		"pointer",
		"default",
		"text",
		"move",
		"grab",
		"grabbing",
		"not-allowed",
		"wait",
		"help"
	],
	"white-space": [
		"normal",
		"nowrap",
		"pre",
		"pre-wrap",
		"pre-line"
	],
	"font-weight": [
		"normal",
		"bold",
		"400",
		"500",
		"600",
		"700"
	],
	"font-style": ["normal", "italic"],
	"box-sizing": ["border-box", "content-box"],
	visibility: ["visible", "hidden"],
	"user-select": [
		"none",
		"text",
		"all",
		"auto"
	],
	"pointer-events": ["auto", "none"],
	"text-transform": [
		"uppercase",
		"lowercase",
		"capitalize",
		"none"
	],
	"text-decoration": [
		"none",
		"underline",
		"line-through"
	],
	"object-fit": [
		"cover",
		"contain",
		"fill",
		"none"
	],
	"border-style": [
		"solid",
		"dashed",
		"dotted",
		"none"
	],
	"vertical-align": [
		"top",
		"middle",
		"bottom",
		"baseline"
	]
}, w = [
	"@media",
	"@import",
	"@keyframes",
	"@font-face",
	"@supports",
	"@layer",
	"@container"
], T = /* @__PURE__ */ "a.abbr.article.aside.audio.b.blockquote.body.br.button.canvas.code.dd.details.dialog.div.dl.dt.em.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.head.header.hr.html.i.iframe.img.input.label.legend.li.link.main.meta.nav.ol.option.p.picture.pre.progress.script.section.select.small.source.span.strong.style.sub.summary.sup.svg.table.tbody.td.template.textarea.th.thead.time.title.tr.u.ul.video".split("."), E = /* @__PURE__ */ new Set([
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"link",
	"meta",
	"source",
	"track",
	"wbr"
]), Oe = [
	"class",
	"id",
	"style",
	"title",
	"lang",
	"hidden",
	"tabindex",
	"role",
	"aria-label",
	"aria-hidden",
	"data-"
], ke = {
	a: [
		"href",
		"target",
		"rel",
		"download"
	],
	img: [
		"src",
		"alt",
		"width",
		"height",
		"loading"
	],
	input: [
		"type",
		"name",
		"value",
		"placeholder",
		"required",
		"disabled",
		"checked",
		"min",
		"max"
	],
	button: [
		"type",
		"disabled",
		"name",
		"value"
	],
	form: ["action", "method"],
	label: ["for"],
	link: ["rel", "href"],
	script: [
		"src",
		"type",
		"defer",
		"async"
	],
	meta: [
		"name",
		"content",
		"charset"
	],
	select: [
		"name",
		"disabled",
		"multiple"
	],
	option: ["value", "selected"],
	textarea: [
		"name",
		"rows",
		"cols",
		"placeholder"
	],
	iframe: [
		"src",
		"width",
		"height"
	],
	video: [
		"src",
		"controls",
		"autoplay",
		"loop",
		"muted"
	],
	audio: [
		"src",
		"controls",
		"autoplay",
		"loop"
	],
	html: ["lang"],
	td: ["colspan", "rowspan"],
	th: [
		"colspan",
		"rowspan",
		"scope"
	]
}, Ae = /* @__PURE__ */ new Set([
	"hidden",
	"required",
	"disabled",
	"checked",
	"defer",
	"async",
	"multiple",
	"selected",
	"controls",
	"autoplay",
	"loop",
	"muted"
]), je = [
	"&nbsp;",
	"&amp;",
	"&lt;",
	"&gt;",
	"&quot;",
	"&copy;",
	"&euro;",
	"&hellip;",
	"&mdash;",
	"&rarr;"
], Me = [
	"javascript",
	"js",
	"css",
	"html",
	"json",
	"python",
	"bash",
	"sh",
	"text",
	"markdown"
], D = (e, t, n, r = e) => ({
	label: e,
	insert: r,
	kind: t,
	detail: n
}), O = (e, t, n) => e.map((e) => D(e.replace("|", ""), t, n, e));
function k(e, t, n, r, i = 3) {
	let a = /* @__PURE__ */ new Set();
	for (let o of e.matchAll(t)) if (!(o.index === n || o[0].length < i) && !(o.index < r && o.index + o[0].length > n) && (a.add(o[0]), a.size > 2e3)) break;
	return [...a].map((e) => D(e, "abc", "dal testo"));
}
function A(e, t, n) {
	let r = S(e.slice(Math.max(0, t - 4e3), t), n), i = r[r.length - 1];
	return i ? i[0] : null;
}
var j = (e, t, n) => {
	let r = t;
	for (; r > 0 && n.test(e[r - 1]);) r--;
	return r;
};
function Ne(e, t, n, r) {
	let i = j(e, t, /[\w$]/), a = A(e, i, n);
	if (!r && (a === "st" || a === "cm")) return null;
	let o = e[i - 1] === ".", s = k(e, n === "python" ? /[A-Za-z_]\w*/g : /[A-Za-z_$][\w$]*/g, i, t);
	return n === "python" ? {
		from: i,
		items: o ? [...O(we, "fn", "metodo"), ...s] : [
			...O([...ve], "kw", "parola chiave"),
			...O(Ce, "fn", "predefinita"),
			...s
		],
		allowEmpty: o
	} : {
		from: i,
		items: o ? [...O(Se, "fn", "proprietà o metodo"), ...s] : [
			...O(_e, "kw", "parola chiave"),
			...O(xe, "fn", "globale"),
			...s
		],
		allowEmpty: o
	};
}
function Pe(e, t, n) {
	let r = j(e, t, /[\w@-]/), i = A(e, r, "css");
	if (!n && (i === "st" || i === "cm")) return null;
	let a = e.lastIndexOf("{", r), o = e.lastIndexOf("}", r), s = Math.max(a, o, e.lastIndexOf(";", r - 1)) + 1, c = e.slice(s, r);
	if (e.slice(r, t).startsWith("@")) return {
		from: r,
		items: O(w, "kw", "regola")
	};
	if (a > o) {
		let n = c.lastIndexOf(":");
		if (n !== -1) {
			let i = c.slice(0, n).trim(), a = k(e, /--[\w-]+/g, r, t, 3).map((e) => ({
				...e,
				label: `var(${e.label})`,
				insert: `var(${e.label})`,
				kind: "val"
			}));
			return {
				from: r,
				items: [
					...O(De[i] ?? [], "val", i),
					...O(Ee, "val", "valore"),
					...a
				],
				allowEmpty: !0
			};
		}
		return {
			from: r,
			items: Te.map((e) => D(e, "pr", "proprietà", `${e}: |;`))
		};
	}
	return {
		from: r,
		items: [
			...O(T, "tag", "elemento"),
			...O(w, "kw", "regola"),
			...k(e, /[.#][\w-]+/g, r, t, 2)
		]
	};
}
function Fe(e, t) {
	let n = e.lastIndexOf("<", t - 1), r = e.lastIndexOf(">", t - 1), i = e.lastIndexOf("&", t - 1);
	if (i > r && i > n && !/\s/.test(e.slice(i, t))) return {
		from: i,
		items: O(je, "val", "carattere")
	};
	if (n <= r) return null;
	let a = e.slice(n + 1, t);
	if (/["']/.test(a.replace(/"[^"]*"|'[^']*'/g, ""))) return null;
	if (!/\s/.test(a)) {
		if (a.startsWith("/")) {
			let t = Ie(e.slice(0, n));
			return {
				from: n + 2,
				items: [.../* @__PURE__ */ new Set([...t.reverse(), ...T])].map((e) => D(e, "tag", t.includes(e) ? "da chiudere" : "elemento", `${e}>`)),
				allowEmpty: !0
			};
		}
		return a.startsWith("!") ? null : {
			from: n + 1,
			items: T.map((e) => D(e, "tag", "elemento", E.has(e) ? `${e}|>` : `${e}>|</${e}>`)),
			allowEmpty: !0
		};
	}
	let o = a.match(/^[\w-]+/)?.[0]?.toLowerCase() ?? "", s = j(e, t, /[\w:-]/), c = new Set([...a.matchAll(/\s([\w:-]+)(?==)/g)].map((e) => e[1]));
	return {
		from: s,
		items: [...ke[o] ?? [], ...Oe].filter((e) => !c.has(e)).map((e) => D(e, "attr", o ? `attributo di <${o}>` : "attributo", Ae.has(e) ? e : e === "data-" ? "data-|=\"\"" : `${e}="|"`)),
		allowEmpty: /\s$/.test(a)
	};
}
function Ie(e) {
	let t = [];
	for (let n of e.matchAll(/<(\/?)([\w-]+)[^>]*?(\/?)>/g)) {
		let e = n[2].toLowerCase();
		if (n[1]) {
			let n = t.lastIndexOf(e);
			n !== -1 && t.splice(n);
		} else !n[3] && !E.has(e) && t.push(e);
	}
	return t;
}
function Le(e, t) {
	let n = j(e, t, /[\w$-]/), r = [...new Set([...e.matchAll(/"((?:\\.|[^"\\\n])+)"(?=\s*:)/g)].map((e) => e[1]))].filter((r) => e.slice(n, t) !== r).map((e) => D(e, "pr", "chiave"));
	return {
		from: n,
		items: e.slice(e.lastIndexOf("\n", n - 1) + 1, n).split("\"").length % 2 == 0 ? r : [...O([
			"true",
			"false",
			"null"
		], "kw", "valore"), ...r]
	};
}
function Re(e, t, n) {
	let r = e.lastIndexOf("\n", t - 1) + 1, i = e.slice(r, t).match(/^\s*```(\w*)$/), a = (e.slice(0, r).match(/^\s*```/gm) ?? []).length % 2 == 0;
	return i && a ? {
		from: t - i[1].length,
		items: O(Me, "kw", "linguaggio del blocco"),
		allowEmpty: !0
	} : ze(e, t, n);
}
function ze(e, t) {
	let n = j(e, t, /[\p{L}\p{N}_'-]/u);
	return {
		from: n,
		items: k(e, /[\p{L}][\p{L}\p{N}_'-]+/gu, n, t, 4)
	};
}
var Be = {
	text: 3,
	markdown: 3
};
function Ve(e, t, n, { manual: r = !1 } = {}) {
	let i = n === "javascript" || n === "python" ? Ne(e, t, n, r) : n === "css" ? Pe(e, t, r) : n === "html" ? Fe(e, t) : n === "json" ? Le(e, t) : n === "markdown" ? Re(e, t, r) : ze(e, t);
	if (!i) return null;
	let a = e.slice(i.from, t);
	if (!r && !i.allowEmpty && a.length < (Be[n] ?? 1)) return null;
	let o = He(i.items, a);
	return o.length ? {
		from: i.from,
		items: o
	} : null;
}
function He(e, t) {
	let n = t.toLowerCase(), r = /* @__PURE__ */ new Set(), i = [];
	for (let a of e) {
		let e = a.filter ?? a.label, o = e.toLowerCase();
		if (r.has(a.label) || e === t) continue;
		let s = o.startsWith(n) ? +!e.startsWith(t) : n.length >= 2 && o.includes(n) ? 2 : -1;
		s < 0 || (r.add(a.label), i.push([s, a]));
	}
	return i.sort((e, t) => e[0] - t[0]), i.slice(0, 100).map(([, e]) => e);
}
// src/editor/lang/config.js
var Ue = "editor-lang", We = /* @__PURE__ */ new Set([
	"treesitter",
	"textmate",
	"simple"
]), M = /^[\w.:-]{1,80}$/, N = (e) => {
	try {
		return ["https:", "http:"].includes(new URL(e).protocol);
	} catch {
		return !1;
	}
};
function Ge(e) {
	let t = e && typeof e == "object" && !Array.isArray(e) ? e : {}, n = {};
	for (let [e, r] of Object.entries(t.engines ?? {})) M.test(e) && We.has(r) && (n[e] = r);
	let r = {
		json: !0,
		css: !0,
		html: !0
	};
	for (let e of Object.keys(r)) typeof t.builtin?.[e] == "boolean" && (r[e] = t.builtin[e]);
	let i = (Array.isArray(t.external) ? t.external : []).filter((e) => e && M.test(e.lang) && typeof e.url == "string" && /^wss?:\/\//.test(e.url)).map((e) => ({
		lang: e.lang,
		url: e.url
	})), a = {};
	for (let [e, n] of Object.entries(t.schemas ?? {})) M.test(e) && n && (n.type === "file" && M.test(n.id) ? a[e] = {
		type: "file",
		id: n.id
	} : n.type === "url" && N(n.url) && (a[e] = {
		type: "url",
		url: n.url
	}));
	return {
		engines: n,
		builtin: r,
		external: i,
		schemas: a,
		grammars: [...new Set((Array.isArray(t.grammars) ? t.grammars : []).filter((e) => typeof e == "string" && M.test(e)))]
	};
}
var P = new class extends e {
	#e = Ge(m.get(Ue));
	get(e) {
		return structuredClone(this.#e[e]);
	}
	set(e, t) {
		this.#e = Ge({
			...this.#e,
			[e]: t
		}), m.set(Ue, this.#e), this.emit("change", e);
	}
	setEntry(e, t, n) {
		let r = this.get(e);
		n === void 0 ? delete r[t] : r[t] = n, this.set(e, r);
	}
}(), F = [
	{
		id: "text",
		label: "Testo",
		exts: [
			"txt",
			"log",
			""
		],
		simple: "text"
	},
	{
		id: "markdown",
		label: "Markdown",
		exts: ["md", "markdown"],
		textmate: "markdown",
		simple: "markdown"
	},
	{
		id: "javascript",
		label: "JavaScript",
		exts: [
			"js",
			"mjs",
			"cjs"
		],
		textmate: "javascript",
		treesitter: "javascript",
		simple: "javascript"
	},
	{
		id: "typescript",
		label: "TypeScript",
		exts: ["ts"],
		textmate: "typescript",
		simple: "javascript"
	},
	{
		id: "css",
		label: "CSS",
		exts: ["css"],
		textmate: "css",
		treesitter: "css",
		simple: "css",
		server: "css"
	},
	{
		id: "html",
		label: "HTML",
		exts: ["html", "htm"],
		textmate: "html",
		treesitter: "html",
		simple: "html",
		server: "html"
	},
	{
		id: "xml",
		label: "XML",
		exts: ["xml", "svg"],
		textmate: "xml",
		simple: "html"
	},
	{
		id: "json",
		label: "JSON",
		exts: ["json"],
		textmate: "json",
		treesitter: "json",
		simple: "json",
		server: "json"
	},
	{
		id: "python",
		label: "Python",
		exts: ["py"],
		textmate: "python",
		treesitter: "python",
		simple: "python"
	},
	{
		id: "shell",
		label: "Shell",
		exts: ["sh", "bash"],
		textmate: "shellscript",
		treesitter: "bash",
		simple: "text"
	},
	{
		id: "yaml",
		label: "YAML",
		exts: ["yml", "yaml"],
		textmate: "yaml",
		simple: "text"
	}
], I = {
	treesitter: "Tree-sitter",
	textmate: "TextMate",
	simple: "Semplice"
}, L = /* @__PURE__ */ new Map(), Ke = new e(), R = () => [...F, ...L.values()], z = (e) => R().find((t) => t.id === e) ?? F[0];
function B(e) {
	let t = te(e ?? "")[1].toLowerCase();
	return [...L.values(), ...F].find((e) => e.exts.includes(t))?.id ?? "text";
}
var qe = (e) => [
	"treesitter",
	"textmate",
	"simple"
].filter((t) => t === "simple" || e[t]);
function V(e) {
	let t = P.get("engines")[e.id], n = qe(e);
	return n.includes(t) ? t : n[0];
}
async function H() {
	L.clear();
	let e = [];
	for (let t of P.get("grammars")) {
		let n = o.get(t);
		if (!n) e.push({
			fileId: t,
			error: "File eliminato"
		});
		else try {
			let e = JSON.parse(await o.read(t));
			if (!e || typeof e.scopeName != "string" || !Array.isArray(e.patterns)) throw Error("Non è una grammatica TextMate (mancano scopeName o patterns)");
			let n = `tm:${e.scopeName}`;
			L.set(n, {
				id: n,
				label: String(e.name || e.displayName || e.scopeName),
				custom: !0,
				fileId: t,
				exts: (Array.isArray(e.fileTypes) ? e.fileTypes : []).map((e) => String(e).replace(/^\./, "").toLowerCase()),
				textmate: { grammar: {
					...e,
					name: n
				} },
				simple: "text"
			});
		} catch (r) {
			e.push({
				fileId: t,
				name: n.name,
				error: r.message
			});
		}
	}
	return Ke.emit("change"), e;
}
// node_modules/web-tree-sitter/web-tree-sitter.wasm?url
var Je = "data:application/wasm;base64,AGFzbQEAAAAAEAhkeWxpbmsuMAEFvHoEHgABxwEZYAF/AX9gAn9/AX9gAX8AYAN/f38AYAN/f38Bf2ACf38AYAR/f39/AX9gBX9/f39/AGAEf39/fwBgAABgAAF/YAV/f39/fwF/YAd/f39/f39/AGAGf3x/f39/AX9gEH9/f39/f39/f39/f39/f38AYAZ/f39/f38AYAZ/f39/f38Bf2ACfn8Bf2AIf39/f39/f38Bf2AGfn9/f39/AX9gB39/f39/f38Bf2ACfH8BfGAEf39/fwF+YAR/fn9/AX9gA39+fwF+AtsDERZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxCGZkX3dyaXRlAAYDZW52FmVtc2NyaXB0ZW5fcmVzaXplX2hlYXAAABZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxB2ZkX3NlZWsAFwNlbnYJX2Fib3J0X2pzAAkWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQhmZF9jbG9zZQAAA2VudiN0cmVlX3NpdHRlcl9xdWVyeV9wcm9ncmVzc19jYWxsYmFjawAAA2Vudh10cmVlX3NpdHRlcl9wcm9ncmVzc19jYWxsYmFjawABA2Vudhp0cmVlX3NpdHRlcl9wYXJzZV9jYWxsYmFjawAHA2Vudhh0cmVlX3NpdHRlcl9sb2dfY2FsbGJhY2sABQNlbnYPX19zdGFja19wb2ludGVyA38BA2Vudg1fX21lbW9yeV9iYXNlA38AA2VudgxfX3RhYmxlX2Jhc2UDfwAHR09ULm1lbQtfX3N0YWNrX2xvdwN/AQdHT1QubWVtDF9fc3RhY2tfaGlnaAN/AQdHT1QubWVtC19faGVhcF9iYXNlA38BA2VudgZtZW1vcnkCAYAEgIACA2VudhlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAXAAHgOdApsCBQUGAAIDBwUFBAAFBQcCAw8DBAADBhADAAARBAQDAgICAQQABQQBAQUBAgQABQMIBwQCAQMIAAAFAAkBAwQBAAICCBIDAQYFBAcMBwgDAwATAAUFAQEGCAAUFQQAAAAEBQQEBAQAFgAFBwUECwQDCAEFAgEBAwMICgEBAQEEBAQEAAAAAAsBAQIDAQEEBAQCAAAAAAEABAMEAAAEAAAKAAIAAAAABQAEBQ0EAQQYAgAOAA4AAAAAAAABAAAMAgIAAAACAgICAgICAgACAgIBCQIFBQUAAAACAgUBAQACAAAAAAACAgAAAAAAAAUAAAEAAAAABQICAgIFAgICAgUCAgEBAgAABgsDBQkKAAIABAABAQEBAAUDAQAJCQY+CX8BQQALfwFB6PIAC38BQeDyAAt/AUHs8gALfwFB5PIAC38BQZj0AAt/AUGw9AALfwFBtPoAC38BQbj6AAsHqCGaARFfX3dhc21fY2FsbF9jdG9ycwCjAgZtYWxsb2MAIgZjYWxsb2MAKgdyZWFsbG9jAF0EZnJlZQAzDXRzX3JhbmdlX2VkaXQAUAZtZW1jbXAAEhh0c19sYW5ndWFnZV9zeW1ib2xfY291bnQAoQIXdHNfbGFuZ3VhZ2Vfc3RhdGVfY291bnQAnQIXdHNfbGFuZ3VhZ2VfYWJpX3ZlcnNpb24AmAIQdHNfbGFuZ3VhZ2VfbmFtZQCUAhd0c19sYW5ndWFnZV9maWVsZF9jb3VudACMAhZ0c19sYW5ndWFnZV9uZXh0X3N0YXRlACsXdHNfbGFuZ3VhZ2Vfc3ltYm9sX25hbWUA9wEbdHNfbGFuZ3VhZ2Vfc3ltYm9sX2Zvcl9uYW1lAB4Hc3RybmNtcAAbF3RzX2xhbmd1YWdlX3N5bWJvbF90eXBlAEQddHNfbGFuZ3VhZ2VfZmllbGRfbmFtZV9mb3JfaWQA1wEZdHNfbG9va2FoZWFkX2l0ZXJhdG9yX25ldwDCARx0c19sb29rYWhlYWRfaXRlcmF0b3JfZGVsZXRlALcBIXRzX2xvb2thaGVhZF9pdGVyYXRvcl9yZXNldF9zdGF0ZQC0ARt0c19sb29rYWhlYWRfaXRlcmF0b3JfcmVzZXQAswEadHNfbG9va2FoZWFkX2l0ZXJhdG9yX25leHQArwEkdHNfbG9va2FoZWFkX2l0ZXJhdG9yX2N1cnJlbnRfc3ltYm9sAKsBDXRzX3BvaW50X2VkaXQAkgEQdHNfcGFyc2VyX2RlbGV0ZQCRAQ90c19wYXJzZXJfcmVzZXQAKBZ0c19wYXJzZXJfc2V0X2xhbmd1YWdlAJABHXRzX3BhcnNlcl9zZXRfaW5jbHVkZWRfcmFuZ2VzADoMdHNfcXVlcnlfbmV3AI4BD3RzX3F1ZXJ5X2RlbGV0ZQBKCGlzd3NwYWNlAGYIaXN3YWxudW0AEw10c19xdWVyeV9jb3B5AI0BFnRzX3F1ZXJ5X3BhdHRlcm5fY291bnQAjAEWdHNfcXVlcnlfY2FwdHVyZV9jb3VudACLARV0c19xdWVyeV9zdHJpbmdfY291bnQAigEcdHNfcXVlcnlfY2FwdHVyZV9uYW1lX2Zvcl9pZACJASJ0c19xdWVyeV9jYXB0dXJlX3F1YW50aWZpZXJfZm9yX2lkAIgBHHRzX3F1ZXJ5X3N0cmluZ192YWx1ZV9mb3JfaWQAhwEfdHNfcXVlcnlfcHJlZGljYXRlc19mb3JfcGF0dGVybgCGAR90c19xdWVyeV9zdGFydF9ieXRlX2Zvcl9wYXR0ZXJuAIUBHXRzX3F1ZXJ5X2VuZF9ieXRlX2Zvcl9wYXR0ZXJuAIQBGnRzX3F1ZXJ5X2lzX3BhdHRlcm5fcm9vdGVkAIMBHXRzX3F1ZXJ5X2lzX3BhdHRlcm5fbm9uX2xvY2FsAIIBJnRzX3F1ZXJ5X2lzX3BhdHRlcm5fZ3VhcmFudGVlZF9hdF9zdGVwAKACGHRzX3F1ZXJ5X2Rpc2FibGVfY2FwdHVyZQCfAhh0c19xdWVyeV9kaXNhYmxlX3BhdHRlcm4AngIMdHNfdHJlZV9jb3B5AJYCDnRzX3RyZWVfZGVsZXRlAJUCB3RzX2luaXQAkwISdHNfcGFyc2VyX25ld193YXNtAJICHHRzX3BhcnNlcl9lbmFibGVfbG9nZ2VyX3dhc20AkQIUdHNfcGFyc2VyX3BhcnNlX3dhc20AjwIedHNfcGFyc2VyX2luY2x1ZGVkX3Jhbmdlc193YXNtAIsCHnRzX2xhbmd1YWdlX3R5cGVfaXNfbmFtZWRfd2FzbQCKAiB0c19sYW5ndWFnZV90eXBlX2lzX3Zpc2libGVfd2FzbQCJAhl0c19sYW5ndWFnZV9tZXRhZGF0YV93YXNtAIgCG3RzX2xhbmd1YWdlX3N1cGVydHlwZXNfd2FzbQCHAhl0c19sYW5ndWFnZV9zdWJ0eXBlc193YXNtAIYCFnRzX3RyZWVfcm9vdF9ub2RlX3dhc20AhQIidHNfdHJlZV9yb290X25vZGVfd2l0aF9vZmZzZXRfd2FzbQCEAhF0c190cmVlX2VkaXRfd2FzbQCDAhx0c190cmVlX2luY2x1ZGVkX3Jhbmdlc193YXNtAIICH3RzX3RyZWVfZ2V0X2NoYW5nZWRfcmFuZ2VzX3dhc20AgQIXdHNfdHJlZV9jdXJzb3JfbmV3X3dhc20AgAIYdHNfdHJlZV9jdXJzb3JfY29weV93YXNtAP8BGnRzX3RyZWVfY3Vyc29yX2RlbGV0ZV93YXNtAP4BGXRzX3RyZWVfY3Vyc29yX3Jlc2V0X3dhc20A/QEcdHNfdHJlZV9jdXJzb3JfcmVzZXRfdG9fd2FzbQD8ASR0c190cmVlX2N1cnNvcl9nb3RvX2ZpcnN0X2NoaWxkX3dhc20A+wEjdHNfdHJlZV9jdXJzb3JfZ290b19sYXN0X2NoaWxkX3dhc20A+gEudHNfdHJlZV9jdXJzb3JfZ290b19maXJzdF9jaGlsZF9mb3JfaW5kZXhfd2FzbQD5ATF0c190cmVlX2N1cnNvcl9nb3RvX2ZpcnN0X2NoaWxkX2Zvcl9wb3NpdGlvbl93YXNtAPgBJXRzX3RyZWVfY3Vyc29yX2dvdG9fbmV4dF9zaWJsaW5nX3dhc20A9gEpdHNfdHJlZV9jdXJzb3JfZ290b19wcmV2aW91c19zaWJsaW5nX3dhc20A9QEjdHNfdHJlZV9jdXJzb3JfZ290b19kZXNjZW5kYW50X3dhc20A9AEfdHNfdHJlZV9jdXJzb3JfZ290b19wYXJlbnRfd2FzbQDzASh0c190cmVlX2N1cnNvcl9jdXJyZW50X25vZGVfdHlwZV9pZF93YXNtAPIBKXRzX3RyZWVfY3Vyc29yX2N1cnJlbnRfbm9kZV9zdGF0ZV9pZF93YXNtAPEBKXRzX3RyZWVfY3Vyc29yX2N1cnJlbnRfbm9kZV9pc19uYW1lZF93YXNtAPABK3RzX3RyZWVfY3Vyc29yX2N1cnJlbnRfbm9kZV9pc19taXNzaW5nX3dhc20A7wEjdHNfdHJlZV9jdXJzb3JfY3VycmVudF9ub2RlX2lkX3dhc20A7gEidHNfdHJlZV9jdXJzb3Jfc3RhcnRfcG9zaXRpb25fd2FzbQDtASB0c190cmVlX2N1cnNvcl9lbmRfcG9zaXRpb25fd2FzbQDsAR90c190cmVlX2N1cnNvcl9zdGFydF9pbmRleF93YXNtAOsBHXRzX3RyZWVfY3Vyc29yX2VuZF9pbmRleF93YXNtAOoBJHRzX3RyZWVfY3Vyc29yX2N1cnJlbnRfZmllbGRfaWRfd2FzbQDpASF0c190cmVlX2N1cnNvcl9jdXJyZW50X2RlcHRoX3dhc20A6AEsdHNfdHJlZV9jdXJzb3JfY3VycmVudF9kZXNjZW5kYW50X2luZGV4X3dhc20A5wEgdHNfdHJlZV9jdXJzb3JfY3VycmVudF9ub2RlX3dhc20A5gETdHNfbm9kZV9zeW1ib2xfd2FzbQDlASF0c19ub2RlX2ZpZWxkX25hbWVfZm9yX2NoaWxkX3dhc20A5AEndHNfbm9kZV9maWVsZF9uYW1lX2Zvcl9uYW1lZF9jaGlsZF93YXNtAOMBIXRzX25vZGVfY2hpbGRyZW5fYnlfZmllbGRfaWRfd2FzbQDiASF0c19ub2RlX2ZpcnN0X2NoaWxkX2Zvcl9ieXRlX3dhc20A4QEndHNfbm9kZV9maXJzdF9uYW1lZF9jaGlsZF9mb3JfYnl0ZV93YXNtAOABG3RzX25vZGVfZ3JhbW1hcl9zeW1ib2xfd2FzbQDfARh0c19ub2RlX2NoaWxkX2NvdW50X3dhc20A3gEedHNfbm9kZV9uYW1lZF9jaGlsZF9jb3VudF93YXNtAN0BEnRzX25vZGVfY2hpbGRfd2FzbQDcARh0c19ub2RlX25hbWVkX2NoaWxkX3dhc20A2wEedHNfbm9kZV9jaGlsZF9ieV9maWVsZF9pZF93YXNtANoBGXRzX25vZGVfbmV4dF9zaWJsaW5nX3dhc20A2QEZdHNfbm9kZV9wcmV2X3NpYmxpbmdfd2FzbQDWAR90c19ub2RlX25leHRfbmFtZWRfc2libGluZ193YXNtANUBH3RzX25vZGVfcHJldl9uYW1lZF9zaWJsaW5nX3dhc20A1AEddHNfbm9kZV9kZXNjZW5kYW50X2NvdW50X3dhc20A0wETdHNfbm9kZV9wYXJlbnRfd2FzbQDSASJ0c19ub2RlX2NoaWxkX3dpdGhfZGVzY2VuZGFudF93YXNtANEBIXRzX25vZGVfZGVzY2VuZGFudF9mb3JfaW5kZXhfd2FzbQDQASd0c19ub2RlX25hbWVkX2Rlc2NlbmRhbnRfZm9yX2luZGV4X3dhc20AzwEkdHNfbm9kZV9kZXNjZW5kYW50X2Zvcl9wb3NpdGlvbl93YXNtAM4BKnRzX25vZGVfbmFtZWRfZGVzY2VuZGFudF9mb3JfcG9zaXRpb25fd2FzbQDNARh0c19ub2RlX3N0YXJ0X3BvaW50X3dhc20AzAEWdHNfbm9kZV9lbmRfcG9pbnRfd2FzbQDLARh0c19ub2RlX3N0YXJ0X2luZGV4X3dhc20AygEWdHNfbm9kZV9lbmRfaW5kZXhfd2FzbQDJARZ0c19ub2RlX3RvX3N0cmluZ193YXNtAMgBFXRzX25vZGVfY2hpbGRyZW5fd2FzbQDHARt0c19ub2RlX25hbWVkX2NoaWxkcmVuX3dhc20AxgEgdHNfbm9kZV9kZXNjZW5kYW50c19vZl90eXBlX3dhc20AxQEVdHNfbm9kZV9pc19uYW1lZF93YXNtAMQBGHRzX25vZGVfaGFzX2NoYW5nZXNfd2FzbQDDARZ0c19ub2RlX2hhc19lcnJvcl93YXNtAMEBFXRzX25vZGVfaXNfZXJyb3Jfd2FzbQDAARd0c19ub2RlX2lzX21pc3Npbmdfd2FzbQC/ARV0c19ub2RlX2lzX2V4dHJhX3dhc20AvgEYdHNfbm9kZV9wYXJzZV9zdGF0ZV93YXNtAL0BHXRzX25vZGVfbmV4dF9wYXJzZV9zdGF0ZV93YXNtALwBFXRzX3F1ZXJ5X21hdGNoZXNfd2FzbQC7ARZ0c19xdWVyeV9jYXB0dXJlc193YXNtALkBBm1lbXNldAA0Bm1lbWNweQAkB21lbW1vdmUAoQEIaXN3YWxwaGEAZwhpc3dibGFuawClAQhpc3dkaWdpdACqAQhpc3dsb3dlcgCmAQhpc3dwdW5jdACjAQhpc3d1cHBlcgCiAQlpc3d4ZGlnaXQAngEGbWVtY2hyAGQGc3RybGVuAGUGc3RyY21wAJ0BB3N0cm5jYXQApAEHc3RybmNweQCfAQh0b3dsb3dlcgCtAQh0b3d1cHBlcgCsAQhzZXRUaHJldwCuARlfZW1zY3JpcHRlbl9zdGFja19yZXN0b3JlAKkBF19lbXNjcmlwdGVuX3N0YWNrX2FsbG9jAKgBHGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2N1cnJlbnQApwEYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAKICCALYAQk/AQAjAgselwGWAZUBoAGcAZoBmQGYATGPAZwCmgKbApkCJZcCmwGUAZMBM5ACjgKNAroBuAG1AbYBsgGxAbABDAEBCoDNC5sC0AEBA38CQCABKAJMIgJBAE4EQCACRQ0BIwFBtPUAaigCGCACQf////8DcUcNAQsCQCAAQf8BcSIDIAEoAlBGDQAgASgCFCICIAEoAhBGDQAgASACQQFqNgIUIAIgADoAAA8LIAEgAxBpDwsgAUHMAGoiAiACKAIAIgNB/////wMgAxs2AgACQAJAIABB/wFxIgQgASgCUEYNACABKAIUIgMgASgCEEYNACABIANBAWo2AhQgAyAAOgAADAELIAEgBBBpCyACKAIAGiACQQA2AgALzQUCB38BfgJAIAEtAABBAXENACAAQQA2AhAgASgCACICKAIAGiACIAIoAgAiAkEBazYCACACQQFGBEAgACgCDCECIAAgACgCECIDQQFqIgQgACgCFCIFSwR/QQggBUEBdCIDIAQgAyAESxsiAyADQQhNGyIEQQN0IQMCfyACBEAgAiADIwcoAgARAQAMAQsgAyMIKAIAEQAACyECIAAgBDYCFCAAKAIQIgNBAWoFIAQLNgIQIAAgAjYCDCACIANBA3RqIAEpAgA3AgALIAAoAhAiAUUNAANAIAAgAUEBayIBNgIQAkAgACgCDCABQQN0aigCACIEKAIkIgIEQEEAIQFBACAEIAJBA3RrIgYgBEEBcRsDQAJAIAYgAUEDdGopAgAiCaciAkEBcQ0AIAIgAigCACICQQFrNgIAIAJBAUcNACAAKAIMIQIgACAAKAIQIgNBAWoiBSAAKAIUIghLBH9BCCAIQQF0IgMgBSADIAVLGyIDIANBCE0bIgVBA3QhAwJ/IAIEQCACIAMjBygCABEBAAwBCyADIwgoAgARAAALIQIgACAFNgIUIAAoAhAiA0EBagUgBQs2AhAgACACNgIMIAIgA0EDdGogCTcCAAsgAUEBaiIBIAQoAiRJDQALIwkoAgARAgAMAQsCQCAELQAsQcAAcUUNACAEKAJIQRlJDQAgBCgCMCMJKAIAEQIACwJAIAAoAggiAkUNACAAKAIEIgVBAWoiAUEgSw0AIAAoAgAhAyAAIAEgAksEf0EIIAJBAXQiAiABIAEgAkkbIgEgAUEITRsiAkEDdCEBAn8gAwRAIAMgASMHKAIAEQEADAELIAEjCCgCABEAAAshAyAAIAI2AgggACgCBCIFQQFqBSABCzYCBCAAIAM2AgAgAyAFQQN0aiIBQQA2AgQgASAENgIADAELIAQjCSgCABECAAsgACgCECIBDQALCwslAQF/IwBBEGsiBCQAIAQgAzYCDCAAIAEgAiADEF8gBEEQaiQAC5kDAQd/IAAgACgCACAALQAQaiIDNgIAAkAgACgCCCIFIANLBEAgACADLAAAIgFB/wFxIgI2AgxBASEEIAFBAEgEQAJAIAUgA2siBkEBRg0AAkAgAUFgTwRAAkAgAUFvTQRAIAAgAkEPcSICNgIMIwFB3gpqIAJqLQAAIAMtAAEiAUEFdnZBAXFFDQQgAUE/cSEHQQIhAQwBCyAAIAJB8AFrIgI2AgwgAUF0Sw0DIwFBsAxqIAMtAAEiAUEEdmosAAAgAnZBAXFFDQMgACABQT9xIAJBBnRyIgI2AgxBAiEEIAZBAkYNA0EDIQEgAy0AAkGAf3MiB0H/AXFBP0sNAwsgACAHQf8BcSACQQZ0ciICNgIMIAYiBCABRw0BDAILIAFBQkkNASAAIAJBH3EiAjYCDEEBIQELIAEgA2otAABBgH9zQf8BcSIEQT9NDQMgASEECyAAQX82AgwLIAAgBDoAECADIAVJDwsgAEEANgIMIABBADoAECADIAVJDwsgACACQQZ0IARyNgIMIAAgAUEBajoAECADIAVJC9sDAQZ/A0AgACgCDBBmBEAgABAMGgwBCyAAKAIMQTtGBEAgABAMGiAAKAIMIQEDQAJAIAEOCwMAAAAAAAAAAAADAAsgACAAKAIAIAAtABBqIgQ2AgAgAAJ/AkAgACgCCCIFIARLBEAgACAELAAAIgJB/wFxIgE2AgxBASACQQBODQIaQQEhAwJAIAUgBGsiBUEBRg0AAkAgAkFgTwRAAkAgAkFvTQRAIAAgAUEPcSIBNgIMIwFB3gpqIAFqLQAAIAQtAAEiAkEFdnZBAXFFDQQgAkE/cSEGQQIhAgwBCyAAIAFB8AFrIgE2AgwgAkF0Sw0DIwFBsAxqIAQtAAEiAkEEdmosAAAgAXZBAXFFDQMgACACQT9xIAFBBnRyIgE2AgxBAiEDIAVBAkYNA0EDIQIgBC0AAkGAf3MiBkH/AXFBP0sNAwsgACAGQf8BcSABQQZ0ciIBNgIMIAUiAyACRw0BDAILIAJBQkkNASAAIAFBH3EiATYCDEEBIQILIAIgBGotAABBgH9zQf8BcSIDQT9NDQIgAiEDC0F/IQEgAEF/NgIMIAAgAzoAEAwDCyAAQQA2AgwgAEEAOgAQDAQLIAAgAUEGdCADciIBNgIMIAJBAWoLOgAQDAALAAsLCxcAIAAtAABBIHFFBEAgASACIAAQaBoLC2sBAX8jAEGAAmsiBSQAAkAgAiADTA0AIARBgMAEcQ0AIAUgASACIANrIgNBgAIgA0GAAkkiARsQNBogAUUEQANAIAAgBUGAAhAOIANBgAJrIgNB/wFLDQALCyAAIAUgAxAOCyAFQYACaiQAC9gBAgV/AX4CfyABKAIEIAEoAggiBUEcbGoiA0EcaygCACIGKAIAIgJBAXEEQCACQQN2QQFxDAELIAIvASxBAnZBAXELIQRBACECAkAgBA0AIAVBAkkEQCABLwEQIQIMAQsgA0E4aygCACgCAC8BQiIERQ0AIAEoAgAoAggiAigCVCACLwEkIARsQQF0aiADQQhrKAIAQQF0ai8BACECCyADQRhrKQIAIQcgA0EQaygCACEDIAAgASgCADYCFCAAIAY2AhAgACACNgIMIAAgAzYCCCAAIAc3AgAL6QEBBn8jAEEQayIEJAAgACgCACICIAFBBXQiBmoiAygCAARAIAAoAjQhBSADKAIMBEAgBCADKQIMNwMIIAUgBEEIahAKCyADKAIUBEAgBCADKQIUNwMAIAUgBBAKCyADKAIEIgIEQCACKAIAIgcEQCAHIwkoAgARAgAgAygCBCECCyACQQA2AgggAkIANwIAIAIjCSgCABECAAsgAygCACAAQSRqIAUQGiAAKAIAIQILIAAoAgQgAUF/c2pBBXQiAQRAIAIgBmoiAiACQSBqIAH8CgAACyAAIAAoAgRBAWs2AgQgBEEQaiQAC4EBAQJ/AkACQCACQQRPBEAgACABckEDcQ0BA0AgACgCACABKAIARw0CIAFBBGohASAAQQRqIQAgAkEEayICQQNLDQALCyACRQ0BCwNAIAAtAAAiAyABLQAAIgRGBEAgAUEBaiEBIABBAWohACACQQFrIgINAQwCCwsgAyAEaw8LQQALHQEBf0EBIQEgAEEwa0EKTwR/IAAQZ0EARwVBAQsLFAAgASgCTEEASBogAEECIAEQaBoLqQ4BDn8gACgCACICQQA2AjAgAkIANwI0IAJBADsBQCACQQA2AiAgAkEANgI8IAIgAi8BLEG//ANxOwEsIAIvAUIiBQRAIAEoAlQgAS8BJCAFbEEBdGohCwsgAiACKAIkIgVBA3RrIQ0CQCAFRQRADAELQQAgDSACQQFxGyEPA0AgDyAKQQN0aiIELwEGIQcgBC8BBCEGIAQoAgAhAyAOAn8CQAJAAkACQAJAAkACQAJAAn8CQAJAAkACfwJAAkACQCAKBEAgAigCFA0BCyADQQFxIgQEfyADQQd2QQFxBSADLQAtQQFxCwRAIAIgAi8BLEGAAnI7ASwLIARFDQEgCg0CIAJBADYCFCACIAZB/wFxNgIMIAIgB0H/AXEiBTYCBCACIAdBCHYiBDYCGCACIAQ2AhAgAiAGQQh2QQ9xNgIIIAQgBWohBwwFCyADQQFxDQELIAMtACxBgAFxBEAgAiACLwEsQYABcjsBLAsgCgRAQQAgA0EBcQ0CGkEAIQRBACADKAIMIAMoAhQiBRshDCADKAIQIAMoAgRqIQkgBSADKAIIaiEHIAMoAhghBQwDCyADKAIEIQQgAiADKQIINwIIIAIgBDYCBCADKAIQIQUgAiADKQIUNwIUIAIgBTYCECAEIAVqIQcMBAtBAQshBCAHQQh2IgUgB0H/AXFqIQkgBkH/AXEhDCAGQQh2QQ9xIQcLIAIgAigCECAJaiIJNgIQIAIgAigCFCAHaq0gBSAMakEAIAIoAhggBxtqrUIghoQ3AhQgAigCBCAJaiEHIARFDQELIAIgAigCICADQRp0QR91QeIEcWoiBDYCICAHIAZBgOADcUEMdmoiBSAISyEHAkAgAi8BKEH+/wNJDQAgA0EKcUECRw0AIAIgBEHkAGo2AiALIAUgCCAHGyEIIAIoAjghB0EAIQQgA0EIcQ0EQQEhBiADQYD+A3FBCHYMAQsgAygCHCEMIAMoAiQhBQJ/AkAgAy8BKCIJQf7/A0YEQCADKAIUIQYgAygCECEJQeIEIQQgAiACKAIgIAMtAC1BAnEEf0HiBAUgAygCIAsgBkFibCAJa2pqQfQDazYCIAwBC0HiBCEEIAIgAy0ALUECcQR/QeIEBSADKAIgCyACKAIgaiIGNgIgIAIvAShB/f8DTQ0AIAMvASwiBEEEcQ0AIAlB//8DRgRAQQAgBUUNAhoLIARBAXEEQCACIAZB5ABqNgIgDAELIAVFDQAgAiADKAIwQeQAbCAGajYCIAsgBQshBCAHIAxqIQZBACEHQQAhBSACIAMoAiQEfyADKAI8BUEACyACKAI8ajYCPCAGIAggBiAISxshCCACIAMoAiQEfyADKAI4BUEACyACKAI4aiIHNgI4IAMvASwiBkEEcQ0CQQAhBiADLwEoC0H//wNxRQ0AIAtFDQAgCyAOQQF0aiIFLwEARQ0AIAIgB0EBajYCOCACIAIoAjBBAWo2AjACQAJAIAUvAQAiBEH+/wNrDgIHAQALIAEoAkggBEEDbGotAAFBAXFFDQYLIAIgAigCNEEBajYCNCAGRQ0GDAcLIAYNASADLwEsIQYLIAZBAXENAUEAIQYMAgsgA0ECcUUEQEEBIQYMAgsgAiAHQQFqNgI4IAIgAigCMEEBajYCMCADQQRxRQ0EIAIgAigCNEEBajYCNAwECyACIAdBAWo2AjggAiACKAIwQQFqNgIwIAMtACxBAnFFDQIgAiACKAI0QQFqNgI0DAILIARFDQAgAiACKAIwIAMoAjBqNgIwIAIgAigCNCADKAI0ajYCNAsgBg0BCyADLQAsQcAAcQRAIAIgAi8BLEHAAHI7ASwLIAMvAShB//8DRgRAIAJB//8DOwEqIAIgAi8BLEEYcjsBLAsgAy8BLEECdkEBcQwBCyADQQN2QQFxC0VqIQ4gCkEBaiIKIAAoAgAiAigCJCIESQ0ACwsgAiAIIAIoAhAiACACKAIEams2AhwgAi8BKCIFQf3/A0sEQCACIAIoAiAgACACKAIUQR5sampB9ANqNgIgCwJAIARFDQAgDSAEQQN0akEIaygCACEBAkAgDSgCACIAQQFxRQRAIAIgAEHEAEEoIAAoAiQbai8BADsBRCACIABBxgBBKiAAKAIkG2ovAQA7AUYgAC0ALEEIcUUNASACIAIvASxBCHI7ASwMAQsgAiAAQRB2OwFGIAIgAEGA/gNxQQh2OwFECwJAIAFBAXENACABLQAsQRBxRQ0AIAIgAi8BLEEQcjsBLAsgBEEBRg0AIAItACxBA3ENAAJAAkAgAEEBcQRAIAUgAEGA/gNxQQh2Rw0DQQEhBCABQQFxDQIgAS8BQCEEDAELIAAvASggBUcNAkEBIQQgAC8BQCEAAkAgAUEBcQRAIAANAQwDCyAAIAEvAUAiBE0NAQsgAEEBaiEEDAELIARBAWohBAsgAiAEOwFACwveBAIBfgR/IAAoAgAgAUEFdGoiBigCACEBIAIpAgAhBQJ/IAAoAigiAgRAIAAgAkEBayICNgIoIAAoAiQgAkECdGooAgAMAQtBpAEjCCgCABEAAAsiACAEOwEAIABBAmpBAEGSAfwLACAFpyECIABCADcCmAEgAEEBNgKUASAAQQA2AqABIAACfwJAAkACQCABBEAgAEEAOwAdIAAgAzoAHCAAIAU3AhQgACABNgIQIABBATsBkAEgAEEAOgAfIAAgASkCBDcCBCAAIAEoAgw2AgwgACABKAKYASIENgKYASAAIAEoAqABIgk2AqABIAAgASgCnAEiATYCnAEgAkUNASACQQFxDQNB4gQhAyAAIAItAC1BAnEEf0HiBAUgAigCIAsgBGo2ApgBQQAgAigCDCACKAIUIgQbIQcgBCACKAIIaiEEIAIoAhghCCACKAIQIAIoAgRqDAQLIABCADcCBEEAIQEgAEEANgIMIAINAQsgBiABNgIICyAGIAA2AgAPCyAAIAQgAkEadEEfdUHiBHFqNgKYASAFQiCIp0H/AXEhByAFQiiIp0EPcSEEIAVCOIinIgggBUIwiKdB/wFxagsgACgCBGo2AgRBACEDIAAgACgCCCAEaq0gByAIakEAIAAoAgwgBBtqrUIghoQ3AgggAAJ/IAJBAXFFBEAgACACKAIkIgQEfyACKAI4BUEACyABaiACLwEsQQFxaiACLwEoQf7/A0ZqNgKcAUEAIARFDQEaIAIoAjwMAQsgACABIAJBAXZBAXFqNgKcAUEACyAJajYCoAEgBiAANgIAC7kDAQZ/A0AgACAAKAIAIAAtABBqIgQ2AgACQAJAIAAoAggiBSAESwRAIAAgBCwAACICQf8BcSIBNgIMQQEhAyACQQBIBEACQCAFIARrIgVBAUYNAAJAIAJBYE8EQAJAIAJBb00EQCAAIAFBD3EiATYCDCMBQd4KaiABai0AACAELQABIgJBBXZ2QQFxRQ0EIAJBP3EhBkECIQIMAQsgACABQfABayIBNgIMIAJBdEsNAyMBQbAMaiAELQABIgJBBHZqLAAAIAF2QQFxRQ0DIAAgAkE/cSABQQZ0ciIBNgIMQQIhAyAFQQJGDQNBAyECIAQtAAJBgH9zIgZB/wFxQT9LDQMLIAAgBkH/AXEgAUEGdHIiATYCDCAFIgMgAkcNAQwCCyACQUJJDQEgACABQR9xIgE2AgxBASECCyACIARqLQAAQYB/c0H/AXEiA0E/TQ0DIAIhAwsgAEF/NgIMQX8hAQsgACADOgAQDAILQQAhASAAQQA2AgwgAEEAOgAQDAELIAAgAUEGdCADciIBNgIMIAAgAkEBajoAEAsgARATDQAgACgCDCIDQS1rQQJJDQAgA0HfAEYNAAsL5QkCFn8BfiMAQYABayIEJAAgAigCACIWAn8gAigCECIXKQIAIhmnIgZBAXEEQCAZQjiIpwwBCyAGKAIQCyISaiENIAEoAgghBiABKAIEIQ4gASgCFCEUIAEoAgAhCyABKAIQKAIAIQMCQAJAAkACQANAIANBAXENAyADKAIkRQ0DIAMvAUIiBwR/IBQoAggiCCgCVCAILwEkIAdsQQF0agVBAAshEyADKAIkIhVFDQMCfyADIBVBA3RrIg8oAgAiB0EBcUUEQCAHLwEsQQJ2QQFxDAELIAdBA3ZBAXELIgNFIRBBACEMAkAgAw0AIBNFDQAgEy8BACEMQQEhEAsgASAUNgIUIAEgDzYCECABIAw2AgwgASAGNgIIIAEgDjYCBCABIAs2AgACfyAPKAIAIgVBAXEiEUUEQEEAIAYgBSgCFCIHGyEIIAUoAhghCSAFKAIQIQMgByAOagwBCyAPLQAHIgMhCSAGIQggDgshByALIBZLDQMgDyAXRg0CIAMgC2ohCgJAAkACQAJAAkACQCASDQAgCiANSQ0AIBENASAFKAIkRQ0BIAUoAjBFDQEgBCABKQIINwNYIAQgASkCEDcDYCAEIAEpAgA3A1AgBEFAayACKQIINwMAIAQgAikCEDcDSCAEIAIpAgA3AzggBEHoAGogBEHQAGogBEE4ahAYIAQoAnhFDQEMBwsgEg0BCyAKIA1LDQEMAgsgCiANSQ0BCyAPKAIAIgNBAXENACADKAIkRQ0AIAMoAjANAQtBASERIBVBAUYNBCAIIAlqIQYDQEEAIQwCfyAPIBFBA3RqIgMoAgAiCUEBcSIIBEAgCUEDdkEBcQwBCyAJLwEsQQJ2QQFxC0UEQCATBH8gEyAQQQF0ai8BAAVBAAshDCAQQQFqIRALAn8gCARAIAMtAAVBD3EhBSADLQAGIQsgAy0ABAwBCyAJKAIIIQUgCSgCBCELIAkoAgwLIQggASAUNgIUIAEgAzYCECABIAw2AgwgASAFIAdqIg42AgQgASAKIAtqIgs2AgAgAUEAIAYgBRsgCGoiBjYCCAJ/IAMoAgAiBUEBcSIYBEAgAy0AByIKIQggBiEJIA4MAQtBACAGIAUoAhQiBxshCSAFKAIYIQggBSgCECEKIAcgDmoLIQcgCyAWSw0FIAMgF0YNBCAKIAtqIQoCQAJAAkACQAJAIBINACAKIA1JDQAgGA0BIAUoAiRFDQEgBSgCMEUNASAEIAEpAgg3AyggBCABKQIQNwMwIAQgASkCADcDICAEIAIpAgg3AxAgBCACKQIQNwMYIAQgAikCADcDCCAEQegAaiAEQSBqIARBCGoQGCAEKAJ4RQ0BDAgLIBINAQsgCiANSw0BDAILIAogDUkNAQsgAygCACIDQQFxDQAgAygCJEUNACADKAIwDQILIAggCWohBiARQQFqIhEgFUcNAAsMBAsgAy0ALEEBcSAMckUNAAsgACABKQIANwIAIAAgASkCEDcCECAAIAEpAgg3AggMAwsgACABIAEgBEHoAGogDBsgBS8BLEEBcRsiASkCADcCACAAIAEpAhA3AhAgACABKQIINwIIDAILIAAgASkCADcCACAAIAEpAhA3AhAgACABKQIINwIIDAELIABCADcCACAAQgA3AhAgAEIANwIICyAEQYABaiQAC/wUAhN/AX4jAEEwayINJAAgAUEANgIcIAFBADYCECABKAIAIA1BADoALiANQQA7ASwgAkEFdGooAgAhDAJAIAVBAEgEQAwBCyAFQf////8BcUH3////AUYNACAFQQlqIghB/////wFxIQogCEEDdCMIKAIAEQAAIQkgASgCHCEHCyABKAIYIQYgASAHQQFqIgggASgCICILSwR/QQggC0EBdCIHIAggByAISxsiCCAIQQhNGyIHQRhsIQgCfyAGBEAgBiAIIwcoAgARAQAMAQsgCCMIKAIAEQAACyEGIAEgBzYCICABKAIcIgdBAWoFIAgLNgIcIAEgBjYCGCAGIAdBGGxqIghBAToAFCAIQQA2AhAgCCAKNgIMIAhBADYCCCAIIAk2AgQgCCAMNgIAIAggDS0ALjoAFyAIIA0vASw7ABUgASgCHCIUBEAgAkEFdCEXA0AgEUEYbCIVIAEoAhhqIgsoAgAhDiAEIAsgAxEBACICQQJxIRICQAJAAkACQAJAAkACQAJAAkAgAkEBcUUEQCAOLwGQASECIBJFDQQgCygCDCEQIAsoAgghDCALKAIE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QANAIAQgA0EDdGshByADIQEDQAJAAkAgByABQQFrIgFBA3RqIggoAgAiAkEBcQ0AIAItACxBwABxRQ0AIAIoAiQhAyAIKAIEIQogAiEEDAELIAENAQsLIAMNAAsLIAAgCjYCECAAIAQ2AgwLIAAgBkEBayICNgIEAkAgAkUNACAJIAtqIQMDQAJAIAIhASAFIAZBBHRqQSBrKAIAIgdBAXFFBEAgBygCJCIIIAUgAUEEdGooAghBAWoiBEsNAQsgACABQQFrIgI2AgQgASEGIAINAQwCCwsgACgCCCICIAZJBEAgBUEIIAJBAXQiASAGIAEgBksbIgEgAUEITRsiAUEEdCMHKAIAEQEAIQUgACABNgIIIAcoAiQhCCAAKAIEIQELIAAgBTYCACAAIAFBAWo2AgQgByAIQQN0ayAEQQN0aikCACEMIAUgAUEEdGoiACADNgIMIAAgBDYCCCAAIAw3AgALC9kEAgd/AX4jAEEgayICJAACQCAAKAKgCSIBRQ0AIAAoAogKIgNFDQAgASgCdCIBRQ0AIAMgARECAAsgAEEANgKICiAAKAKYCgRAIAIgAEGYCmopAgA3AxggAEGICWogAkEYahAKIABCADcCmAoLIABCADcCgAogAEEANgL4CSAAKAIgBEBBACEBIABBADYCfCAAQQA6AIABIABCADcCJCAAQQA2AiAgACgCRCEFAkAgACgCZCIDBEADQAJAIAUgAUEYbGoiBigCFCIHRQ0AIAcgBigCECIETQ0AIAYpAgAhCCAAIAE2AmggACAINwIkIAAgBDYCIEEAIQEgACgCSEUNAyAAKAJsIgMgBE0EQCAEIAAoAnAgA2pJDQQLIABBADYCSCAAQgA3AmwMAwsgAUEBaiIBIANHDQALCyAAIAM2AmggBSADQRhsaiIBQQRrKAIAIQMgAUEQaykCACEIIABBADYCSCAAIAg3AiQgACADNgIgIABCADcCbEEBIQELIABBADYCACAAIAE2AnQLIAAoAoQJEDsgAEHgCWohASAAKALgCQRAIAIgASkCADcDECAAQYgJaiACQRBqEAoLIAAoAugJBEAgAiAAQegJaikCADcDCCAAQYgJaiACQQhqEAoLIAFCADcCACABQQA2AhAgAUIANwIIIAAoArQJBEAgAiAAQbQJaikCADcDACAAQYgJaiACEAogAEIANwK0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IAVBAXQiBCACIAIgBEkbIgIgAkEITRshAgJ/IAMEQCADIAIjBygCABEBAAwBCyACIwgoAgARAAALIQMgACACNgKMASAAKAKIASIEQQFqBSACCzYCiAEgACADNgKEASADIARqQQo6AAAMBgsgACAEQQFqIgIgACgCjAEiBUsEf0EIIAVBAXQiBCACIAIgBEkbIgIgAkEITRshAgJ/IAMEQCADIAIjBygCABEBAAwBCyACIwgoAgARAAALIQMgACACNgKMASAAKAKIASIEQQFqBSACCzYCiAEgACADNgKEASADIARqQQ06AAAMBQsgACAEQQFqIgIgACgCjAEiBUsEf0EIIAVBAXQiBCACIAIgBEkbIgIgAkEITRshAgJ/IAMEQCADIAIjBygCABEBAAwBCyACIwgoAgARAAALIQMgACACNgKMASAAKAKIASIEQQFqBSACCzYCiAEgACADNgKEASADIARqQQk6AAAMBAsgAkEwRg0CCyABKAIAIQYCQCAEIAEtABAiAmoiBSAAKAKMAU0NAAJ/IAMEQCADIAUjBygCABEBAAwBCyAFIwgoAgARAAALIQMgACAFNgKMASAAKAKIASIHIARNDQAgByAEayIHRQ0AIAMgBWogAyAEaiAH/AoAAAsCQCACRSIFDQAgAyAEaiEEIAYEQCAFDQEgBCAGIAL8CgAADAELIAJFDQAgBEEAIAL8CwALIAAgAzYChAEgACAAKAKIASACajYCiAEMAgsCQAJAAn8CQCACQdwARwRAIAJBCkYNBEEAIAJBIkcNBxogACgChAEhAiABKAIAIgggBGsiAyAAKAKIASIFaiIGIAAoAowBTQ0DIAJFDQEgAiAGIwcoAgARAQAMAgsgACgChAEhAgJAIAEoAgAiByAEayIDIAAoAogBIgVqIgYgACgCjAFNDQACfyACBEAgAiAGIwcoAgARAQAMAQsgBiMIKAIAEQAACyECIAAgBjYCjAEgACgCiAEiCSAFTQ0AIAkgBWsiCUUNACACIAZqIAIgBWogCfwKAAALAkAgBCAHRg0AIAIgBWohBSAEBEAgA0UNASAFIAQgA/wKAAAMAQsgA0UNACAFQQAgA/wLAAsgACACNgKEASAAIAAoAogBIANqNgKIASABKAIAQQFqIQRBAQwGCyAGIwgoAgARAAALIQIgACAGNgKMASAAKAKIASIH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IAEjCSgCABECAAsgAEEANgJ0IABCADcCbCAAKAKEASIBBEAgASMJKAIAEQIACyAAQQA2AowBIABCADcChAEgACgCeCIBBEAgASMJKAIAEQIACyAAQQA2AoABIABCADcCeCAAKAKQASIBBEAgASMJKAIAEQIACyAAQQA2ApgBIABCADcCkAECQCAAKAKcASIBRQ0AIAEoAlwNACABKAJoIAFHDQAgASABKAKoASICQQFrNgKoASACQQFHDQAgASMJKAIAEQIACyAAKAIAIgEEQCABIwkoAgARAgALIABBADYCCCAAQgA3AgAgACgCDCIBBEAgASMJKAIAEQIACyAAQQA2AhQgAEIANwIMIAAoAhgiAQRAIAEjCSgCABECAAtBACEBIABBADYCICAAQgA3AhggACgCJCICBEAgAiMJKAIAEQIACyAAQQA2AiwgAEIANwIkIAAoAjQiAgRAA0AgACgCMCABQQxsaiIDKAIAIgQEQCAEIwkoAgARAgAgACgCNCECCyADQQA2AgggA0IANwIAIAFBAWoiASACSQ0ACwsgACgCMCIBBEAgASMJKAIAEQIACyAAQQA2AjggAEIANwIwIAAjCSgCABECAAsLrxsBKX8jAEHQAGsiCyQAIANBADYCQCADQQA2AjQgA0EYaiEXIANBJGohHiADQQxqIRIgC0EOaiEiIAtBDGohKAJAA0ACQCADKAIERQRAIAMoAhxFDQMgIyADKAI0IiNPDQMgCyADKAIINgIQIAsgAykCADcDCCADIBcoAgg2AgggAyAXKQIANwIAIBcgCygCEDYCCCAXIAspAwg3AgAgH0EBaiEfDAELIAMoAgwhCSADKAIkIQQCQCADKAIQIg0gAygCKCIFaiIGIAMoAixNDQAgBkECdCEHAn8gBARAIAQgByMHKAIAEQEADAELIAcjCCgCABEAAAshBCADIAY2AiwgAygCKCIGIAVNDQAgBiAFa0ECdCIGRQ0AIAQgB2ogBCAFQQJ0aiAG/AoAAAsCQCANRQ0AIA1BAnQhByAEIAVBAnRqIQUgCQRAIAdFDQEgBSAJIAf8CgAADAELIAdFDQAgBUEAIAf8CwALIAMgBDYCJEEAIQQgA0EANgIQIAMgAygCKCANajYCKEEAIRYCQCADKAIERQ0AA0AgAygCACAWQQJ0aigCACEOAkACfwJAIARFBEAg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AqgJCyAAKAKgCiIBBEAgASMJKAIAEQIAIABBADYCqAogAEIANwKgCgsgACgCmAoEQCADIABBmApqKQIANwMYIABBiAlqIANBGGoQCiAAQgA3ApgKCyAAKAJEIwkoAgARAgAgAEHgCWohASAAKALgCQRAIAMgASkCADcDECAAQYgJaiADQRBqEAoLIAAoAugJBEAgAyAAQegJaikCADcDCCAAQYgJaiADQQhqEAoLIAFCADcCAEEAIQIgAUEANgIQIAFCADcCCCAAKAKICSIBBEACQCAAKAKMCQRAA0AgACgCiAkgAkEDdGooAgAjCSgCABECACACQQFqIgIgACgCjAlJDQALIAAoAogJIgFFDQELIAEjCSgCABECAAsgAEEANgKQCSAAQgA3AogJCyAAKAKUCSIBBEAgASMJKAIAEQIAIABBADYCnAkgAEIANwKUCQsgACgC9AkiAQRAIAEjCSgCABECAAsgAEEANgL8CSAAQgA3AvQJIAAoArwJIgEEQCABIwkoAgARAgALIABBADYCxAkgAEIANwK8CSAAKALICSIBBEAgASMJKAIAEQIACyAAQQA2AtAJIABCADcCyAkgACgC1AkiAQRAIAEjCSgCABECAAsgAEEANgLcCSAAQgA3AtQJIAAjCSgCABECAAsgA0EgaiQAC7MBAgV/AX4gACkCACIIQiCIpyEDIAinIQQCQCABKAIAIgUgAigCBCIHTwRAIAMgAigCICADIAIoAhhrIgZBACADIAZPG2ogBCACKAIUIgZLGyEDIAIoAhwgBCAGayIGQQAgBCAGTxtqIQQgAigCCCAFIAdraiEFDAELIAUgAigCAE0NACACKQIcIghCIIinIQMgAigCCCEFIAinIQQLIAAgBK0gA61CIIaENwIAIAEgBTYCAAsbACAAIAEQXSEAAkAgAUUNACAADQAQQwALIAALGwAgACABECohAQJAIABFDQAgAQ0AEEMACyABC5ABAQN/QQIhBEF/IQMCQCABQQJJBH8gAQUgAiAALwEAIgNBCHQgA0EIdnIiA0H//wNxIgU2AgAgAUF+cUECRg0BIANBgPgDcUGAsANHDQEgAC8BAiIAQQh0IABBCHZyIgBBgPgDcUGAuANHDQEgAEH//wNxIAVBCnRqQYC4/xprIQNBBAshBCACIAM2AgALIAQLzQIBBH8gAiAALAAAIgNB/wFxIgQ2AgBBASEFAkAgA0EASARAAkAgAUEBRg0AAkAgA0FgTwRAAkAgA0FvTQRAIAIgBEEPcSIENgIAIwFB3gpqIARqLQAAIAAtAAEiA0EFdnZBAXFFDQQgA0E/cSEGQQIhAwwBCyACIARB8AFrIgQ2AgAgA0F0Sw0DIwFBsAxqIAAtAAEiA0EEdmosAAAgBHZBAXFFDQMgAiADQT9xIARBBnRyIgQ2AgBBAiEFIAFBAkYNA0EDIQMgAC0AAkGAf3MiBkH/AXFBP0sNAwsgAiAGQf8BcSAEQQZ0ciIENgIAIAMgASIFRw0BDAILIANBQkkNASACIARBH3EiBDYCAEEBIQMLIAAgA2otAABBgH9zQf8BcSIAQT9NDQIgAyEFCyACQX82AgALIAUPCyACIARBBnQgAHI2AgAgA0EBagtuAQJ/QQIhBEF/IQMCQCABQQJJBH8gAQUgAiAALwEAIgM2AgAgAUF+cUECRg0BIANBgPgDcUGAsANHDQEgAC8BAiIAQYD4A3FBgLgDRw0BIANBCnQgAGpBgLj/GmshA0EECyEEIAIgAzYCAAsgBAtpAQJ/AkAgACgCaCIBIAAoAmRGDQAgAUUNACAAKAIgIAAoAkQgAUEYbGoiASgCEEcNACABQQRrKAIAIQIgACABQRBrKQIANwI8IAAgAjYCOA8LIAAgACkCIDcCOCAAQUBrIAAoAig2AgALhgQCCX8BfiMAQRBrIgUkACAAQQE6AHgCQCAALQCAAQ0AIAAoAiAiCSAAKAIoIgRrIQEgACgCJCECIAQEQCAAQQA2AnwgAEEAOgCAAQsgAEEANgIoIAAgAjYCJCAAIAE2AiAgACgCRCEHAkACfyAAKAJkIgYEQANAAkAgByADQRhsaiIIKAIUIgQgAU0NACAEIAgoAhAiAk0NACABIAJNBEAgACAIKQIANwIkIAAgAjYCICACIQELIAAgAzYCaEEAIQMgACgCSEUNBCAAKAJsIgIgAU0EQCABIAAoAnAgAmpJDQULIABBADYCSEEADAMLIANBAWoiAyAGRw0ACwsgACAGNgJoIAcgBkEYbGoiAkEEaygCACEBIAJBEGspAgAhCiAAQQA2AkggACAKNwIkIAAgATYCIEEBCyEDIABBADYCcAsgAEEBOgCAASAAQQA2AgAgACADNgJ0IABBADYCfCAAIAE2AmwgACgCUCEEIAAoAkwhAiAFIAApAiQ3AwggACACIAEgBUEIaiAAQfAAaiAEEQYANgJIIAAoAnBFBEAgAEEANgJIIAAgACgCZDYCaAwBCyAAKAJoIAAoAmRGDQAgABApA0AgACgCICAJTw0BIAAoAmggACgCZEYNASAAKAJIRQ0BIABBABBbIAAoAmggACgCZEcNAAsLIAAoAnwgBUEQaiQACysBAn8gACgCaCICIAAoAmRJBH8gACgCICAAKAJEIAJBGGxqKAIQRgVBAAsLGwEBfyAAECIhAQJAIABFDQAgAQ0AEEMACyABCw0AIAAoAmggACgCZEYLTQECfyABLQAAIQICQCAALQAAIgNFDQAgAiADRw0AA0AgAS0AASECIAAtAAEiA0UNASABQQFqIQEgAEEBaiEAIAIgA0YNAAsLIAMgAmsLFwAgAEEwa0EKSSAAQSByQeEAa0EGSXILggIBAn8CQAJAAkACQCABIAAiA3NBA3ENACACQQBHIQQCQCABQQNxRQ0AIAJFDQADQCADIAEtAAAiBDoAACAERQ0FIANBAWohAyACQQFrIgJBAEchBCABQQFqIgFBA3FFDQEgAg0ACwsgBEUNAiABLQAARQ0DIAJBBEkNAANAQYCChAggASgCACIEayAEckGAgYKEeHFBgIGChHhHDQIgAyAENgIAIANBBGohAyABQQRqIQEgAkEEayICQQNLDQALCyACRQ0BCwNAIAMgAS0AACIEOgAAIARFDQIgA0EBaiEDIAFBAWohASACQQFrIgINAAsLQQAhAgsgA0EAIAIQNBogAAtJAQF/IwBBEGsiAyQAIAMgAjYCDCAAKAJgBEAgAEGEAWoiAkGACCABIAMoAgwQXxogACgCXEEBIAIgACgCYBEDAAsgA0EQaiQAC+gCAQJ/AkAgACABRg0AIAEgACACaiIEa0EAIAJBAXRrTQRAIAAgASACECQPCyAAIAFzQQNxIQMCQAJAIAAgAUkEQCADBEAgACEDDAMLIABBA3FFBEAgACEDDAILIAAhAwNAIAJFDQQgAyABLQAAOgAAIAFBAWohASACQQFrIQIgA0EBaiIDQQNxDQALDAELAkAgAw0AIARBA3EEQANAIAJFDQUgACACQQFrIgJqIgMgASACai0AADoAACADQQNxDQALCyACQQNNDQADQCAAIAJBBGsiAmogASACaigCADYCACACQQNLDQALCyACRQ0CA0AgACACQQFrIgJqIAEgAmotAAA6AAAgAg0ACwwCCyACQQNNDQADQCADIAEoAgA2AgAgAUEEaiEBIANBBGohAyACQQRrIgJBA0sNAAsLIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQQFrIgINAAsLIAALCwAgAEEAEDIgAEcLPgEBfyAAQf//B00EfyMBQcDTAGoiASABIABBCHZqLQAAQQV0aiAAQQN2QR9xai0AACAAQQdxdkEBcQVBAAsLSQECfyAAEGUgAGohAwJAIAJFDQADQCABLQAAIgRFDQEgAyAEOgAAIANBAWohAyABQQFqIQEgAkEBayICDQALCyADQQA6AAAgAAsNACAAQSBGIABBCUZyCwsAIABBARAyIABHCwQAIwALEAAjACAAa0FwcSIAJAAgAAsGACAAJAALCgAgAEEwa0EKSQsHACAALwEcCwgAIABBARAyCwgAIABBABAyCxkAIw0oAgBFBEAjDiABNgIAIw0gADYCAAsL8gIBBX8gACgCFCIBQQJHBEAgACgCBCEDAn8CQAJAIAAtABBBAUYEQEECIQEgACADQQJqIgI2AgQgACgCCCACRgRAQQAgAC8BDiICRQ0EGiAAIAJBAWs7AQ4gAy8BAiEBIAAgA0EGaiICNgIEIAAgATsBDCAAIAIgAy8BBEEBdGo2AgggACADLwEGIgI7ARwgACgCACEEDAILIAAgAi8BADsBHAwCCwJAIAAoAgAiBCgCBCIFIAEEfyAALwEcQQFqBUEACyICQf//A3EiAU0NAANAIAMgAUEBdGovAQANASAFIAJBAWoiAkH//wNxIgFLDQALCyABIAVPBEBBAiEBQQAMAwsgACACOwEcIAAgAyABQQF0ai8BACIBOwEMC0EAIQMgACAEKAIMIAJB//8DcUsEfyAEKAI0IAFBA3RqIgEtAAAhAyAAIAFBCGo2AhhBAAUgAQs7AR4gACADOwEgC0EBIQFBAQshAiAAIAE2AhQLIAILqAEBBX8gACgCVCIDKAIAIQUgAygCBCIEIAAoAhQgACgCHCIHayIGIAQgBkkbIgYEQCAFIAcgBhAkGiADIAMoAgAgBmoiBTYCACADIAMoAgQgBmsiBDYCBAsgBCACIAIgBEsbIgQEQCAFIAEgBBAkGiADIAMoAgAgBGoiBTYCACADIAMoAgQgBGs2AgQLIAVBADoAACAAIAAoAiwiATYCHCAAIAE2AhQgAguyBQIGfgR/IAEgASgCAEEHakF4cSIBQRBqNgIAIAAgASkDACEDIAEpAwghBiMAQSBrIgAkACAGQv///////z+DIQICfiAGQjCIQv//AYMiBKciCEGB+ABrQf0PTQRAIAJCBIYgA0I8iIQhAiAIQYD4AGutIQQCQCADQv//////////D4MiA0KBgICAgICAgAhaBEAgAkIBfCECDAELIANCgICAgICAgIAIUg0AIAJCAYMgAnwhAgtCACACIAJC/////////wdWIgEbIQIgAa0gBHwMAQsCQCACIAOEUA0AIARC//8BUg0AIAJCBIYgA0I8iIRCgICAgICAgASEIQJC/w8MAQsgCEH+hwFLBEBCACECQv8PDAELQYD4AEGB+AAgBFAiCRsiCiAIayIBQfAASgRAQgAhAkIADAELIAIgAkKAgICAgIDAAIQgCRshAkEAIQkgCCAKRwRAIAMhBCACIQUCQEGAASABayIIQcAAcQRAIAMgCEFAaq2GIQVCACEEDAELIAhFDQAgBSAIrSIHhiAEQcAAIAhrrYiEIQUgBCAHhiEECyAAIAQ3AxAgACAFNwMYIAApAxAgACkDGIRCAFIhCQsCQCABQcAAcQRAIAIgAUFAaq2IIQNCACECDAELIAFFDQAgAkHAACABa62GIAMgAa0iBIiEIQMgAiAEiCECCyAAIAM3AwAgACACNwMIIAApAwhCBIYgACkDACIDQjyIhCECAkAgCa0gA0L//////////w+DhCIDQoGAgICAgICACFoEQCACQgF8IQIMAQsgA0KAgICAgICAgAhSDQAgAkIBgyACfCECCyACQoCAgICAgIAIhSACIAJC/////////wdWIgEbIQIgAa0LIQMgAEEgaiQAIAZCgICAgICAgICAf4MgA0I0hoQgAoS/OQMAC9wXAxJ/AXwDfiMAQbAEayILJAAgC0EANgIsAkAgAb0iGUIAUwRAIwFBCmohFEEBIRAgAZoiAb0hGQwBCyAEQYAQcQRAIwFBDWohFEEBIRAMAQsjAUEKaiIGQQZqIAZBAWogBEEBcSIQGyEUIBBFIRcLAkAgGUKAgICAgICA+P8Ag0KAgICAgICA+P8AUQRAIABBICACIBBBA2oiByAEQf//e3EQDyAAIBQgEBAOIAAjASIGQYcIaiAGQbEKaiAFQSBxIgMbIAZBtAhqIAZBvQpqIAMbIAEgAWIbQQMQDiAAQSAgAiAHIARBgMAAcxAPIAIgByACIAdKGyENDAELIAtBEGohEQJAAkACQCABIAtBLGoQYyIBIAGgIgFEAAAAAAAAAABiBEAgCyALKAIsIgZBAWs2AiwgBUEgciIVQeEARw0BDAMLIAVBIHIiFUHhAEYNAiALKAIsIQwMAQsgCyAGQR1rIgw2AiwgAUQAAAAAAACwQaIhAQtBBiADIANBAEgbIQogC0EwakGgAkEAIAxBAE4baiIOIQcDQCAHIAH8AyIDNgIAIAdBBGohByABIAO4oUQAAAAAZc3NQaIiAUQAAAAAAAAAAGINAAsCQCAMQQBMBEAgDCEJIAchBiAOIQgMAQsgDiEIIAwhCQNAQR0gCSAJQR1PGyEDAkAgB0EEayIGIAhJDQAgA60hG0IAIRkDQCAGIAY1AgAgG4YgGXwiGiAaQoCU69wDgCIZQoCU69wDfn0+AgAgBkEEayIGIAhPDQALIBpCgJTr3ANUDQAgCEEEayIIIBk+AgALA0AgCCAHIgZJBEAgBkEEayIHKAIARQ0BCwsgCyALKAIsIANrIgk2AiwgBiEHIAlBAEoNAAsLIAlBAEgEQCAKQRlqQQluQQFqIRIgFUHmAEYhEwNAQQlBACAJayIDIANBCU8bIQ0CQCAGIAhNBEBBAEEEIAgoAgAbIQcMAQtBgJTr3AMgDXYhFkF/IA10QX9zIQ9BACEJIAghBwNAIAcgBygCACIDIA12IAlqNgIAIAMgD3EgFmwhCSAHQQRqIgcgBkkNAAtBAEEEIAgoAgAbIQcgCUUNACAGIAk2AgAgBkEEaiEGCyALIAsoAiwgDWoiCTYCLCAOIAcgCGoiCCATGyIDIBJBAnRqIAYgBiADa0ECdSASShshBiAJQQBIDQALC0EAIQkCQCAGIAhNDQAgDiAIa0ECdUEJbCEJQQohByAIKAIAIgNBCkkNAANAIAlBAWohCSADIAdBCmwiB08NAAsLIAogCUEAIBVB5gBHG2sgFUHnAEYgCkEAR3FrIgMgBiAOa0ECdUEJbEEJa0gEQCALQTBqQYRgQaRiIAxBAEgbaiADQYDIAGoiDEEJbSIDQQJ0aiENQQohByAMIANBCWxrIgNBB0wEQANAIAdBCmwhByADQQFqIgNBCEcNAAsLAkAgDSgCACIMIAwgB24iEiAHbGsiD0UgDUEEaiIDIAZGcQ0AAkAgEkEBcUUEQEQAAAAAAABAQyEBIAdBgJTr3ANHDQEgCCANTw0BIA1BBGstAABBAXFFDQELRAEAAAAAAEBDIQELRAAAAAAAAOA/RAAAAAAAAPA/RAAAAAAAAPg/IAMgBkYbRAAAAAAAAPg/IA8gB0EBdiIDRhsgAyAPSxshGAJAIBcNACAULQAAQS1HDQAgGJohGCABmiEBCyANIAwgD2siAzYCACABIBigIAFhDQAgDSADIAdqIgM2AgAgA0GAlOvcA08EQANAIA1BADYCACAIIA1BBGsiDUsEQCAIQQRrIghBADYCAAsgDSANKAIAQQFqIgM2AgAgA0H/k+vcA0sNAAsLIA4gCGtBAnVBCWwhCUEKIQcgCCgCACIDQQpJDQADQCAJQQFqIQkgAyAHQQpsIgdPDQALCyANQQRqIgMgBiADIAZJGyEGCwNAIAYiDCAITSIHRQRAIAZBBGsiBigCAEUNAQsLAkAgFUHnAEcEQCAEQQhxIRMMAQsgCUF/c0F/IApBASAKGyIGIAlKIAlBe0pxIgMbIAZqIQpBf0F+IAMbIAVqIQUgBEEIcSITDQBBdyEGAkAgBw0AIAxBBGsoAgAiD0UNAEEKIQNBACEGIA9BCnANAANAIAYiB0EBaiEGIA8gA0EKbCIDcEUNAAsgB0F/cyEGCyAMIA5rQQJ1QQlsIQMgBUFfcUHGAEYEQEEAIRMgCiADIAZqQQlrIgNBACADQQBKGyIDIAMgCkobIQoMAQtBACETIAogAyAJaiAGakEJayIDQQAgA0EAShsiAyADIApKGyEKC0F/IQ0gCkH9////B0H+////ByAKIBNyIg8bSg0BIAogD0EAR2pBAWohFgJAIAVBX3EiB0HGAEYEQCAJIBZB/////wdzSg0DIAlBACAJQQBKGyEGDAELIBEgCSAJQR91IgNzIANrrSARECMiBmtBAUwEQANAIAZBAWsiBkEwOgAAIBEgBmtBAkgNAAsLIAZBAmsiEiAFOgAAIAZBAWtBLUErIAlBAEgbOgAAIBEgEmsiBiAWQf////8Hc0oNAgsgBiAWaiIDIBBB/////wdzSg0BIABBICACIAMgEGoiCSAEEA8gACAUIBAQDiAAQTAgAiAJIARBgIAEcxAPAkACQAJAIAdBxgBGBEAgC0EQakEJciEFIA4gCCAIIA5LGyIDIQgDQCAINQIAIAUQIyEGAkAgAyAIRwRAIAYgC0EQak0NAQNAIAZBAWsiBkEwOgAAIAYgC0EQaksNAAsMAQsgBSAGRw0AIAZBAWsiBkEwOgAACyAAIAYgBSAGaxAOIAhBBGoiCCAOTQ0ACyAPBEAgACMBQe8KakEBEA4LIAggDE8NASAKQQBMDQEDQCAINQIAIAUQIyIGIAtBEGpLBEADQCAGQQFrIgZBMDoAACAGIAtBEGpLDQALCyAAIAZBCSAKIApBCU4bEA4gCkEJayEGIAhBBGoiCCAMTw0DIApBCUogBiEKDQALDAILAkAgCkEASA0AIAwgCEEEaiAIIAxJGyEDIAtBEGpBCXIhDCAIIQcDQCAMIAc1AgAgDBAjIgZGBEAgBkEBayIGQTA6AAALAkAgByAIRwRAIAYgC0EQak0NAQNAIAZBAWsiBkEwOgAAIAYgC0EQaksNAAsMAQsgACAGQQEQDiAGQQFqIQYgCiATckUNACAAIwFB7wpqQQEQDgsgACAGIAwgBmsiBSAKIAUgCkgbEA4gCiAFayEKIAdBBGoiByADTw0BIApBAE4NAAsLIABBMCAKQRJqQRJBABAPIAAgEiARIBJrEA4MAgsgCiEGCyAAQTAgBkEJakEJQQAQDwsgAEEgIAIgCSAEQYDAAHMQDyACIAkgAiAJShshDQwBCyAUIAVBGnRBH3VBCXFqIQkCQCADQQtLDQBBDCADayEGRAAAAAAAADBAIRgDQCAYRAAAAAAAADBAoiEYIAZBAWsiBg0ACyAJLQAAQS1GBEAgGCABmiAYoaCaIQEMAQsgASAYoCAYoSEBCyARIAsoAiwiByAHQR91IgZzIAZrrSARECMiBkYEQCAGQQFrIgZBMDoAACALKAIsIQcLIBBBAnIhCiAFQSBxIQwgBkECayIOIAVBD2o6AAAgBkEBa0EtQSsgB0EASBs6AAAgBEEIcUUgA0EATHEhCCALQRBqIQcDQCAHIgUgAfwCIgYjAUHgL2pqLQAAIAxyOgAAIAEgBrehRAAAAAAAADBAoiEBAkAgB0EBaiIHIAtBEGprQQFHDQAgAUQAAAAAAAAAAGEgCHENACAFQS46AAEgBUECaiEHCyABRAAAAAAAAAAAYg0AC0F/IQ0gA0H9////ByAKIBEgDmsiCGoiBmtKDQAgAEEgIAIgBiADQQJqIAcgC0EQaiIFayIHIAdBAmsgA0gbIAcgAxsiA2oiBiAEEA8gACAJIAoQDiAAQTAgAiAGIARBgIAEcxAPIAAgBSAHEA4gAEEwIAMgB2tBAEEAEA8gACAOIAgQDiAAQSAgAiAGIARBgMAAcxAPIAIgBiACIAZKGyENCyALQbAEaiQAIA0LjQIBBn8CQCABKAIUIgcgAk0NACAAKAIAIQMCQCABKAJcDQAgASgCaCABRw0AIAEgASgCqAFBAWo2AqgBCwJ/IAEoAhgiBSACTQRAIAEoAiwgASgCMCACIAVrQQJ0aigCAEEBdGoiBEECaiEGIAQvAQAMAQsgASgCKCABKAIEIAJsQQF0aiEEQQALIQggAEIANwARIAAgCDsBDiAAQQA7AQwgACAGNgIIIAAgBDYCBCAAIAE2AgAgAEL//wM3AhwgACACIAVPOgAQIABBADYAGCADRQ0AIAMoAlwNACADKAJoIANHDQAgAyADKAKoASIAQQFrNgKoASAAQQFHDQAgAyMJKAIAEQIACyACIAdJC6cBAQV/IAEgACgCACICKAIUIgVJBEACfyACKAIYIgMgAU0EQCACKAIsIAIoAjAgASADa0ECdGooAgBBAXRqIgJBAmohBCACLwEADAELIAIoAiggAigCBCABbEEBdGohAkEACyEGIABCADcAESAAIAY7AQ4gAEEAOwEMIAAgBDYCCCAAIAI2AgQgAEL//wM3AhwgACABIANPOgAQIABBADYAGAsgASAFSQv6AgEHfyMAQSBrIgMkACADIAAoAhwiBDYCECAAKAIUIQUgAyACNgIcIAMgATYCGCADIAUgBGsiATYCFCABIAJqIQVBAiEHAn8CQAJAAkAgACgCPCADQRBqIgFBAiADQQxqEAAiBAR/IwFB+PQAaiAENgIAQX8FQQALBEAgASEEDAELA0AgBSADKAIMIgZGDQIgBkEASARAIAEhBAwECyABQQhBACAGIAEoAgQiCEsiCRtqIgQgBiAIQQAgCRtrIgggBCgCAGo2AgAgAUEMQQQgCRtqIgEgASgCACAIazYCACAFIAZrIQUgACgCPCAEIgEgByAJayIHIANBDGoQACIGBH8jAUH49ABqIAY2AgBBfwVBAAtFDQALCyAFQX9HDQELIAAgACgCLCIBNgIcIAAgATYCFCAAIAEgACgCMGo2AhAgAgwBCyAAQQA2AhwgAEIANwMQIAAgACgCAEEgcjYCAEEAIAdBAkYNABogAiAEKAIEawsgA0EgaiQAC04BAX8gACgCPCMAQRBrIgAkACABIAJB/wFxIABBCGoQAiICBH8jAUH49ABqIAI2AgBBfwVBAAshAiAAKQMIIQEgAEEQaiQAQn8gASACGwtTAQJ/IAAEQAJAIAAoAgAiAUUNACABKAJcDQAgASgCaCABRw0AIAEgASgCqAEiAkEBazYCqAEgAkEBRw0AIAEjCSgCABECAAsgACMJKAIAEQIACwsfACAAKAI8EAQiAAR/IwFB+PQAaiAANgIAQX8FQQALC+EGAQN/IwBBkAFrIhAkACMBQfT0AGoiEigCACIRRQRAIBIQgQEiETYCAAsgESAONgJMIBAjDCIRKAIANgKIASAQIBEoAgxBAXQ2AoABIBAgESgCCDYCfCAQIAE2AowBIBAgESgCEDYChAEgECARKAIEQQF0NgJ4IBAgA0EBdDYCdCAQIAI2AnAgECAFQQF0NgJsIBAgBDYCaCAQIAlBAXQ2AmQgECAINgJgIBAgC0EBdDYCXCAQIAo2AlgjASIDQfT0AGoiASgCACAQIBApAnA3AzggECAQKQJoNwMwIBBBOGogEEEwahB/IAEoAgAhAiAHQX8gBxsiBCAGTwRAIAIgBDYCeCACIAY2AnQLIBAgECkCYDcDKCAQIBApAlg3AyAgASgCACAQQShqIBBBIGoQfiABKAIAIQIgDUF/IA0bIgQgDE8EQCACIAQ2ApABIAIgDDYCjAELIAEoAgAgDjYCTCABKAIAIA82AmAgECAQKQKAATcDECAQIBApAogBNwMYIBAgA0H48gBqKQMANwNQIBAgECkCeDcDCCABKAIAIAAgEEEIaiAQQdAAahCAAUEAIQdBACEGIAEoAgAgEEHEAGogEEFAaxB2BEBBACEPQQAhBUEAIREDQAJAIBFBA2oiAyAQLwFKQQZsaiIAIAVNDQBBCCAFQQF0IgEgACAAIAFJGyIAIABBCE0bIgVBAnQhACAHBEAgByAAIwcoAgARAQAhBwwBCyAAIwgoAgARAAAhBwtBACENIBAvAUpBGGxBDGoiAARAIAcgEUECdGpBACAA/AsACyAQLwFIIQEgByAPQQJ0aiIAIBAvAUoiAjYCBCAAIAE2AgAgACAQKAJANgIIIA9BA2ohDyACBEADQCAHIA9BAnRqIgAgECgCTCANQRxsaiIBKAIYNgIAIAEoAgAhBCABKAIIIQggASgCECEJIAEoAgQhCiAAIAEoAgw2AhQgACAKNgIMIAAgCTYCBCAAIAhBAXY2AhAgACAEQQF2NgIIIA9BBmohDyANQQFqIg0gAkcNAAsLIAZBAWohBiACQQZsIANqIREjAUH09ABqKAIAIBBBxABqIBBBQGsQdg0ACwsjDCIAIwFB9PQAaigCAC0ArwE2AgggACAHNgIEIAAgBjYCACAQQZABaiQACwkAIAAoAgQQBQvSBgEDfyMAQZABayIQJAAjAUH09ABqIhIoAgAiEUUEQCASEIEBIhE2AgALIBEgDkF/IA4bNgJMIBAjDCIRKAIANgKIASAQIBEoAgxBAXQ2AoABIBAgESgCCDYCfCAQIAE2AowBIBAgESgCEDYChAEgECARKAIEQQF0NgJ4IBAgA0EBdDYCdCAQIAI2AnAgECAFQQF0NgJsIBAgBDYCaCAQIAlBAXQ2AmQgECAINgJgIBAgC0EBdDYCXCAQIAo2AlgjASIDQfT0AGoiASgCACAQIBApAnA3AzggECAQKQJoNwMwIBBBOGogEEEwahB/IAEoAgAhAiAHQX8gBxsiBCAGTwRAIAIgBDYCeCACIAY2AnQLIBAgECkCYDcDKCAQIBApAlg3AyAgASgCACAQQShqIBBBIGoQfiABKAIAIQIgDUF/IA0bIgQgDE8EQCACIAQ2ApABIAIgDDYCjAELIAEoAgAgDjYCTCABKAIAIA82AmAgECAQKQKAATcDECAQIBApAogBNwMYIBAgA0H48gBqKQMANwNQIBAgECkCeDcDCCABKAIAIAAgEEEIaiAQQdAAahCAAUEAIQdBACEGIAEoAgAgEEHEAGoQfQRAQQAhD0EAIQVBACERA0ACQCARQQJqIgMgEC8BSkEGbGoiACAFTQ0AQQggBUEBdCIBIAAgACABSRsiACAAQQhNGyIFQQJ0IQAgBwRAIAcgACMHKAIAEQEAIQcMAQsgACMIKAIAEQAAIQcLQQAhDSAQLwFKQRhsQQhqIgAEQCAHIBFBAnRqQQAgAPwLAAsgEC8BSCEAIAcgD0ECdGoiASAQLwFKIgI2AgQgASAANgIAIA9BAmohDyACBEADQCAHIA9BAnRqIgAgECgCTCANQRxsaiIBKAIYNgIAIAEoAgAhBCABKAIIIQggASgCECEJIAEoAgQhCiAAIAEoAgw2AhQgACAKNgIMIAAgCTYCBCAAIAhBAXY2AhAgACAEQQF2NgIIIA9BBmohDyANQQFqIg0gAkcNAAsLIAZBAWohBiACQQZsIANqIREjAUH09ABqKAIAIBBBxABqEH0NAAsLIwwiACMBQfT0AGooAgAtAK8BNgIIIAAgBzYCBCAAIAY2AgAgEEGQAWokAAvZAQEDfyMAQTBrIgEkACABIwwiAigCADYCKCABIAIoAgxBAXQ2AiAgASAANgIsIAEgASkCKDcDECABIAIoAhA2AiQgASABKQIgNwMIIAEgAigCCDYCHCABIAIoAgRBAXQ2AhggASABKQIYNwMAIAEoAhQoAgghAwJ/An8gASgCECgCACIAQQFxBEBB//8DIABBEHYiAkH//wNGDQIaIABBgP4DcUEIdgwBC0H//wMgAC8BKiICQf//A0YNARogAC8BKAshACADIAIgAEH//wNxECsLIAFBMGokAAt3AQJ/IwBBMGsiASQAIAEjDCICKAIANgIoIAEgAigCDEEBdDYCICABIAA2AiwgASABKQIoNwMQIAEgAigCEDYCJCABIAEpAiA3AwggASACKAIINgIcIAEgAigCBEEBdDYCGCABIAEpAhg3AwAgARBYIAFBMGokAAubAQECfyMAQTBrIgEkACABIwwiAigCADYCKCABIAIoAgxBAXQ2AiAgASAANgIsIAEgASkCKDcDECABIAIoAhA2AiQgASABKQIgNwMIIAEgAigCCDYCHCABIAIoAgRBAXQ2AhggASABKQIYNwMAAn8gASgCECgCACIAQQFxBEAgAEEDdkEBcQwBCyAALwEsQQJ2QQFxCyABQTBqJAALmwEBAn8jAEEwayIBJAAgASMMIgIoAgA2AiggASACKAIMQQF0NgIgIAEgADYCLCABIAEpAig3AxAgASACKAIQNgIkIAEgASkCIDcDCCABIAIoAgg2AhwgASACKAIEQQF0NgIYIAEgASkCGDcDAAJ/IAEoAhAoAgAiAEEBcQRAIABBBXZBAXEMAQsgAC8BLEEJdkEBcQsgAUEwaiQAC94BAQJ/IwBBMGsiASQAIAEjDCICKAIANgIoIAEgAigCDEEBdDYCICABIAA2AiwgASABKQIoNwMQIAEgAigCEDYCJCABIAEpAiA3AwggASACKAIINgIcIAEgAigCBEEBdDYCGCABIAEpAhg3AwACfwJAIAEoAgwiAEH//wNxRQRAIAEoAhAoAgAiAEEBcQRAIABBgP4DcUEIdiEADAILIAAvASghAAsgAEH//wNxQf//A0cNAEEBDAELIAEoAhQoAggoAkwgAEH//wNxQQF0ai8BAEH//wNGCyABQTBqJAALqgEBAn8jAEEwayIBJAAgASMMIgIoAgA2AiggASACKAIMQQF0NgIgIAEgADYCLCABIAEpAig3AxAgASACKAIQNgIkIAEgASkCIDcDCCABIAIoAgg2AhwgASACKAIEQQF0NgIYIAEgASkCGDcDAAJ/IAEoAhAoAgAiAEEBcQRAIABBGnRBH3VB4gRxDAELQeIEIAAtAC1BAnENABogACgCIAtBAEcgAUEwaiQAC9MBAQV/IAEgACgCFEkEQEEkIwgoAgARAAAhAgJAIAAoAlwNACAAKAJoIABHDQAgACAAKAKoAUEBajYCqAELAn8gACgCGCIEIAFNBEAgACgCLCAAKAIwIAEgBGtBAnRqKAIAQQF0aiIDQQJqIQUgAy8BAAwBCyAAKAIoIAAoAgQgAWxBAXRqIQNBAAshBiACQgA3ABEgAiAGOwEOIAJBADsBDCACIAU2AgggAiADNgIEIAIgADYCACACQv//AzcCHCACIAEgBE86ABAgAkEANgAYCyACC5sBAQJ/IwBBMGsiASQAIAEjDCICKAIANgIoIAEgAigCDEEBdDYCICABIAA2AiwgASABKQIoNwMQIAEgAigCEDYCJCABIAEpAiA3AwggASACKAIINgIcIAEgAigCBEEBdDYCGCABIAEpAhg3AwACfyABKAIQKAIAIgBBAXEEQCAAQQR2QQFxDAELIAAvASxBBXZBAXELIAFBMGokAAt3AQJ/IwBBMGsiASQAIAEjDCICKAIANgIoIAEgAigCDEEBdDYCICABIAA2AiwgASABKQIoNwMQIAEgAigCEDYCJCABIAEpAiA3AwggASACKAIINgIcIAEgAigCBEEBdDYCGCABIAEpAhg3AwAgARA/IAFBMGokAAvRBgEIfyMAQaABayIHJAAgByMMIggoAgA2ApgBIAcgCCgC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ASABKQIYNwMAIwBBEGsiBCQAIAEoAhQoAgghACABKAIQKQIAIQdBASECAkACQAJAIAEvAQwiA0H+/wNrDgIAAgELQQAhAgwBCyAAKAJIIANBA2xqLQAAIQILIAcgByAEQQ9qQQEgACADIAJBAXEiAhBZQQFqIgUjCCgCABEAACIGIAUgACADIAIQWRogBEEQaiQAIAFBMGokACAGC3oBAn8jAEEwayIBJAAgASMMIgIoAgA2AiggASACKAIMQQF0NgIgIAEgADYCLCABIAEpAig3AxAgASACKAIQNgIkIAEgASkCIDcDCCABIAIoAgg2AhwgASACKAIEQQF0NgIYIAEgASkCGDcDACABEFogAUEwaiQAQQF2C3sBAn8jAEEwayIBJAAgASMMIgIoAgA2AiggASACKAIMQQF0NgIgIAEgADYCLCABIAEpAig3AxAgASACKAIQNgIkIAEgASkCIDcDCCABIAIoAgg2AhwgASACKAIEQQF0NgIYIAEgASkCGDcDACABKAIAIAFBMGokAEEBdguWAQECfyMAQUBqIgEkACABIwwiAigCADYCOCABIAIoAgxBAXQ2AjAgASAANgI8IAEgASkCODcDGCABIAIoAhA2AjQgASABKQIwNwMQIAEgAigCCDYCLCABIAIoAgRBAXQ2AiggASABKQIoNwMIIAFBIGogAUEIahBBIAIgASgCIDYCACACIAEoAiRBAXY2AgQgAUFAayQAC54BAQJ/IwBBQGoiASQAIAEjDCICKAIANgI4IAEgAigCDEEBdDYCMCABIAA2AjwgASABKQI4NwMYIAEgAigCEDYCNCABIAEpAjA3AxAgASACKAIINgIsIAEgAigCBEEBdDYCKCABIAEpAig3AwggASABKAIMNgIgIAEgASgCEDYCJCACIAEoAiA2AgAgAiABKAIkQQF2NgIEIAFBQGskAAvXAgEGfyMAQfAAayIBJAAgASMMIgIoAgA2AmggASACKAIMQQF0NgJgIAEgADYCbCABIAIoAgg2AlwgASACKAIQNgJkIAEgAigCBEEBdDYCWCABIAIoAhhBAXQ2AlQgASACKAIUNgJQIAIoAiAhACACKAIcIQMgASABKQJoNwMoIAEgASkCYDcDICABIAM2AkggASABKQJYNwMYIAEgAEEBdDYCTCABIAEpAlA3AxAgASABKQJINwMI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AAsLIAEgACkDeDcCICABIAApA4gBNwIwIAEgACkDgAE3AigMAQsgAUIANwIgIAFCADcCMCABQgA3AigLIABBkAFqJAAgAyABKAIsNgIQIAMgASgCJDYCCCADIAEoAjA2AgAgAyABKAIoQQF2NgIMIAMgASgCIEEBdjYCBCABQdAAaiQAC50BAQJ/IwBBMGsiASQAIAEjDCICKAIANgIoIAEgAigCDEEBdDYCICABIAA2AiwgASABKQIoNwMQIAEgAigCEDYCJCABIAEpAiA3AwggASACKAIINgIcIAEgAigCBEEBdDYCGCABIAEpAhg3AwBBASEAAkAgASgCECgCACICQQFxDQAgAigCJEUNACACKAI4QQFqIQALIAFBMGokACAAC+4BAQN/IwBB0ABrIgEkACABIwwiAigCADYCSCABQUBrIgMgAigCDEEBdDYCACABIAA2AkwgASABKQJINwMYIAEgAigCEDYCRCABIAMpAgA3AxAgASACKAIINgI8IAEgAigCBEEBdDYCOCABIAEpAjg3AwgjAEEgayIAJAAgACABKQIYNwMYIAAgASkCEDcDECAAIAEpAgg3AwggAUEgaiAAQQhqQQAQViAAQSBqJAAgAiABKAIsNgIQIAIgASgCJDYCCCACIAEoAjA2AgAgAiABKAIoQQF2NgIMIAIgASgCIEEBdjYCBCABQdAAaiQAC+4BAQN/IwBB0ABrIgEkACABIwwiAigCADYCSCABQUBrIgMgAigCDEEBdDYCACABIAA2AkwgASABKQJINwMYIAEgAigCEDYCRCABIAMpAgA3AxAgASACKAIINgI8IAEgAigCBEEBdDYCOCABIAEpAjg3AwgjAEEgayIAJAAgACABKQIYNwMYIAAgASkCEDcDECAAIAEpAgg3AwggAUEgaiAAQQhqQQAQVyAAQSBqJAAgAiABKAIsNgIQIAIgASgCJDYCCCACIAEoAjA2AgAgAiABKAIoQQF2NgIMIAIgASgCIEEBdjYCBCABQdAAaiQAC+4BAQN/IwBB0ABrIgEkACABIwwiAigCADYCSCABQUBrIgMgAigCDEEBdDYCACABIAA2AkwgASABKQJINwMYIAEgAigCEDYCRCABIAMpAgA3AxAgASACKAIINgI8IAEgAigCBEEBdDYCOCABIAEpAjg3AwgjAEEgayIAJAAgACABKQIYNwMYIAAgASkCEDcDECAAIAEpAgg3AwggAUEgaiAAQQhqQQEQViAAQSBqJAAgAiABKAIsNgIQIAIgASgCJDYCCCACIAEoAjA2AgAgAiABKAIoQQF2NgIMIAIgASgCIEEBdjYCBCABQdAAaiQACyoBAn8CQCAAKAIgIgNFDQAgASADSw0AIAAoAjwgAUECdGooAgAhAgsgAgtZACMBQejyAGokByMBQeDyAGokCCMBQezyAGokCSMBQeTyAGokCiMBQZj0AGokCyMBQbD0AGokDCMBQbT6AGokDSMBQbj6AGokDiMBQaD0AGpBAEGcBvwLAAvuAQEDfyMAQdAAayIBJAAgASMMIgIoAgA2AkggAUFAayIDIAIoAgxBAXQ2AgAgASAANgJMIAEgASkCSDcDGCABIAIoAhA2AkQgASADKQIANwMQIAEgAigCCDYCPCABIAIoAgRBAXQ2AjggASABKQI4NwMIIwBBIGsiACQAIAAgASkCGDcDGCAAIAEpAhA3AxAgACABKQIINwMIIAFBIGogAEEIakEBEFcgAEEgaiQAIAIgASgCLDYCECACIAEoAiQ2AgggAiABKAIwNgIAIAIgASgCKEEBdjYCDCACIAEoAiBBAXY2AgQgAUHQAGokAAvFAQEDfyMAQdAAayICJAAgAiMMIgMoAgA2AkggAkFAayIEIAMoAgxBAXQ2AgAgAiAANgJMIAIgAikCSDcDGCACIAMoAhA2AkQgAiAEKQIANwMQIAIgAygCCDYCPCACIAMoAgRBAXQ2AjggAiACKQI4NwMIIAJBIGogAkEIaiABQf//A3EQPSADIAIoAiw2AhAgAyACKAIkNgIIIAMgAigCMDYCACADIAIoAihBAXY2AgwgAyACKAIgQQF2NgIEIAJB0ABqJAAL8AEBA38jAEHQAGsiAiQAIAIjDCIDKAIANgJIIAJBQGsiBCADKAIMQQF0NgIAIAIgADYCTCACIAIpAkg3AxggAiADKAIQNgJEIAIgBCkCADcDECACIAMoAgg2AjwgAiADKAIEQQF0NgI4IAIgAikCODcDCCMAQSBrIgAkACAAIAIpAhg3AxggACACKQIQNwMQIAAgAikCCDcDCCACQSBqIABBCGogAUEAED4gAEEgaiQAIAMgAigCLDYCECADIAIoAiQ2AgggAyACKAIwNgIAIAMgAigCKEEBdjYCDCADIAIoAiBBAXY2AgQgAkHQAGokAAvwAQEDfyMAQdAAayICJAAgAiMMIgMoAgA2AkggAkFAayIEIAMoAgxBAXQ2AgAgAiAANgJMIAIgAikCSDcDGCACIAMoAhA2AkQgAiAEKQIANwMQIAIgAygCCDYCPCACIAMoAgRBAXQ2AjggAiACKQI4NwMIIwBBIGsiACQAIAAgAikCGDcDGCAAIAIpAhA3AxAgACACKQIINwMIIAJBIGogAEEIaiABQQEQPiAAQSBqJAAgAyACKAIsNgIQIAMgAigCJDYCCCADIAIoAjA2AgAgAyACKAIoQQF2NgIMIAMgAigCIEEBdjYCBCACQdAAaiQAC5oBAQJ/IwBBMGsiASQAIAEjDCICKAIANgIoIAEgAigCDEEBdDYCICABIAA2AiwgASABKQIoNwMQIAEgAigCEDYCJCABIAEpAiA3AwggASACKAIINgIcIAEgAigCBEEBdDYCGCABIAEpAhg3AwBBACEAAkAgASgCECgCACICQQFxDQAgAigCJEUNACACKAI0IQALIAFBMGokACAAC5oBAQJ/IwBBMGsiASQAIAEjDCICKAIANgIoIAEgAigCDEEBdDYCICABIAA2AiwgASABKQIoNwMQIAEgAigCEDYCJCABIAEpAiA3AwggASACKAIINgIcIAEgAigCBEEBdDYCGCABIAEpAhg3AwBBACEAAkAgASgCECgCACICQQFxDQAgAigCJEUNACACKAIwIQALIAFBMGokACAAC5wBAQJ/IwBBMGsiASQAIAEjDCICKAIANgIoIAEgAigCDEEBdDYCICABIAA2AiwgASABKQIoNwMQIAEgAigCEDYCJCABIAEpAiA3AwggASACKAIINgIcIAEgAigCBEEBdDYCGCABIAEpAhg3AwACfyABKAIQKAIAIgBBAXEEQCAAQYD+A3FBCHYMAQsgAC8BKAtB//8DcSABQTBqJAAL+gEBA38jAEHQAGsiASQAIAEjDCICKAIANgJIIAFBQGsiAyACKAIMQQF0NgIAIAEgADYCTCABIAEpAkg3AxggASACKAIQNgJEIAEgAykCADcDECABIAIoAgg2AjwgASACKAIEQQF0NgI4IAEgASkCODcDCCACKAIUQQF0IQMjAEEgayIAJAAgACABKQIYNwMYIAAgASkCEDcDECAAIAEpAgg3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IgEkACABIAA2AjwgASMMIgApAwA3AkAgASAAKQMINwJIIAFBJGogAUE8ahAQIAEgASkCNDcDGCABIAEpAiw3AxAgASABKQIkNwMIIAEoAgggAUHQAGokAEEBdgt9AQF/IwBB0ABrIgEkACABIAA2AjwgASMMIgApAwA3AkAgASAAKQMINwJIIAFBJGogAUE8ahAQIAEgASkCNDcDECABIAEpAiw3AwggASABKQIkNwMAIAFBHGogARBBIAAgASgCHDYCACAAIAEoAiBBAXY2AgQgAUHQAGokAAuIAQEBfyMAQdAAayIBJAAgASAANgI8IAEjDCIAKQMANwJAIAEgACkDCDcCSCABQSRqIAFBPGoQECABIAEpAjQ3AxAgASABKQIsNwMIIAEgASkCJDcDACABIAEoAgQ2AhwgASABKAIINgIgIAAgASgCHDYCACAAIAEoAiBBAXY2AgQgAUHQAGokAAtCAQF/IwBBMGsiASQAIAEgADYCHCABIwwiACkDADcCICABIAApAwg3AiggAUEEaiABQRxqEBAgASgCFCABQTBqJAALhQEBAX8jAEHQAGsiASQAIAEgADYCPCABIwwiACkDADcCQCABIAApAwg3AkggAUEkaiABQTxqEBAgASABKQI0NwMYIAEgASkCLDcDECABIAEpAiQ3AwgCfyABKAIYKAIAIgBBAXEEQCAAQQV2QQFxDAELIAAvASxBCXZBAXELIAFB0ABqJAALZAEBfyMAQdAAayIBJAAgASAANgI8IAEjDCIAKQMANwJAIAEgACkDCDcCSCABQSRqIAFBPGoQECABIAEpAjQ3AxggASABKQIsNwMQIAEgASkCJDcDCCABQQhqED8gAUHQAGokAAtkAQF/IwBB0ABrIgEkACABIAA2AjwgASMMIgApAwA3AkAgASAAKQMINwJIIAFBJGogAUE8ahAQIAEgASkCNDcDGCABIAEpAiw3AxAgASABKQIkNwMIIAFBCGoQWCABQdAAaiQAC2QBAX8jAEHQAGsiASQAIAEgADYCPCABIwwiACkDADcCQCABIAApAwg3AkggAUEkaiABQTxqEBAgASABKQI0NwMYIAEgASkCLDcDECABIAEpAiQ3AwggAUEIahBAIAFB0ABqJAALTAECfyMAQSBrIgEkACABIAA2AgwgASMMIgApAwA3AhAgASAAKQMINwIYIAFBDGoQNSAAIAEpAhA3AwAgACABKQIYNwMIIAFBIGokAAvKBwIMfwF+IwBBIGsiAyQAIAMgADYCDCADIwwiDSkDADcCECADIA0pAwg3AhggASEJIwBB0ABrIgIkACADKAIUIQAgAygCECEHA0AgByAAQQFrIgFBHGxqIggoAhghCyAIKAIAKAIAIQYCQAJAIAFFBEBBASEFIAZBAXFFDQFBACEEDAILAkACfyAGQQFxIgwEQCAGQQJxBEBBACEEQQEhBQwFCyAGQQN2QQFxDAELQQEhBSAGLwEsIgRBAXENAiAEQQJ2QQFxCw0AIAhBHGsoAgAoAgAvAUIiBUUNAEEAIQQgAygCDCgCCCIKKAJUIAovASQgBWxBAXRqIAgoAhRBAXRqLwEAQQBHIQUgDEUNAQwCC0EAIQVBACEEIAwNAQsgBigCJEUEQEEAIQQMAQsgBigCOCEECwJAAkAgCSALSQ0AIAUgC2ogBGogCU0NAANAAkACQAJAIAcgAEEcbGoiCEEcaygCACILKAIAIgVBAXEEQCADKAIMIQEMAQsgAygCDCEBIAUoAiQNAQsgAiABNgIQIAJCADcDCCACQQA2AiwgAkIANwIkIAJCADcCHCACQgA3AhQMAQsgASgCCCEGIAUvAUIiBAR/IAYoAlQgBi8BJCAEbEEBdGoFQQALIQwgCEEEaygCACEEAkACQCAAQQFrIgpFDQAgBS8BLCIFQQFxDQAgBUEEcQ0BIAcgCkEcbGoiBUEcaygCACgCAC8BQiIKRQ0BIAQgBigCVCAGLwEkIApsQQF0aiAFKAIUQQF0ai8BAEEAR2ohBAwBCyAEQQFqIQQLIAspAgAhDiACIAE2AhAgAiAONwMIIAIgCEEYayIBKAIINgIcIAIgASkCADcCFCACIAw2AiwgAkIANwMgIAIgBDYCKCAEIAlLDQMLA0AgAkEIaiACQTBqIAJBzwBqECVFDQMgAigCKCAJTQ0ACyADIABBAWoiASADKAIYIgRLBH9BCCAEQQF0IgAgASAAIAFLGyIAIABBCE0bIgFBHGwhAAJ/IAcEQCAHIAAjBygCABEBAAwBCyAAIwgoAgARAAALIQcgAyABNgIYIAMoAhQiAEEBagUgAQs2AhQgAyAHNgIQIAcgAEEcbGoiACACKQIwNwIAIAAgAigCSDYCGCAAIAJBQGspAgA3AhAgACACKQI4NwIIIAItAE9BAUYEQCACKAJIIAlGDQMLIAMoAhAhByADKAIUIQAMAAsACyAAQQJJDQAgAyABNgIUIAEhAAwBCwsgAkHQAGokACANIAMpAhA3AwAgDSADKQIYNwMIIANBIGokAAvzBAINfwF+IwBBIGsiBiQAIAYgADYCDCAGIwwiCSkDADcCECAGIAkpAwg3AhhBASELAkAgBkEMaiIKIwJBD2oQRyINRQ0AIAooAgQgCigCCEEcbGoiAEEYayICKAIADQAgAEEQaygCAEUNACAAQQxrKAIAIQcgAEE4aygCACIBLQAAQQFxRQRAIAEoAgAiASABKAIkQQN0ayEDCyAAQTBrKQIAIQ4gAEE0aygCACEBIAIgBwR/An8gAygCACICQQFxBEAgASADLQAHIgJqIQggDkIgiKchBCAOpwwBC0EAIA5CIIinIAIoAhQiBRshBCACKAIQIAFqIQggAigCGCECIAUgDqdqC60gAiAEaq1CIIaEIQ5BASECIAdBAUcEQANAAkAgAyACQQN0aiIEKAIAIgFBAXEEQCAELQAHIgEgBC0ABmohDCAELQAFQQ9xIQUgBC0ABCEEDAELQQAgASgCDCABKAIUIgUbIQQgASgCECABKAIEaiEMIAUgASgCCGohBSABKAIYIQELIAUgDqdqrSABIARqQQAgDkIgiKcgBRtqrUIghoQhDiAIIAxqIQggAkEBaiICIAdHDQALCwJ/IAMgB0EDdGoiAigCACIDQQFxBEAgAi0ABUEPcSEBIAItAAQhBSACLQAGDAELIAMoAgwhBSADKAIIIQEgAygCBAsgASAOp2qtQQAgDkIgiKcgARsgBWqtQiCGhCEOIAhqBSABCzYCACAAQRRrIA43AgALAkACQAJAIA1BAWsOAgACAQsDQCAKEHBBAUYNAAsMAQtBACELCyAJIAYpAhA3AwAgCSAGKQIYNwMIIAZBIGokACALC0wBAn8jAEEgayIBJAAgASAANgIMIAEjDCIAKQMANwIQIAEgACkDCDcCGCABQQxqEBwgACABKQIQNwMAIAAgASkCGDcDCCABQSBqJAALTgEBfyMBQasKaiECAkACQAJAIAFB/v8Daw4CAAIBCyMBQaoKag8LQQAhAiAAKAIIIAAoAgRqIAFNDQAgACgCOCABQQJ0aigCACECCyACC4cBAgJ/AX4jAEEwayIBJAAgASAANgIcIAEjDCIAKAIANgIgIAEgACkCBDcCJCABIAAoAgwiAjYCLCABIAAoAhBBAXQ2AhggASACNgIUIAEgASkCFDcDCCABQRxqQQAgASgCCCABKAIMEG8gACABKQIgNwMAIAAgASkCKDcDCCABQTBqJABCAFILZgICfwF+IwBBIGsiASQAIAEgADYCDCABIwwiACgCADYCECABIAApAgQ3AhQgASAAKAIMIgI2AhwgAUEMaiACQQF0QQBBABBvIAAgASkCEDcDACAAIAEpAhg3AwggAUEgaiQAQgBSC18BA38jAEEgayIBJAAgASAANgIMIAEjDCIAKQMANwIQIAEgACkDCDcCGCABQQxqIQIDQCACEHAiA0EBRg0ACyADQQJGIAAgASkCEDcDACAAIAEpAhg3AwggAUEgaiQAC0wBAn8jAEEgayIBJAAgASAANgIMIAEjDCIAKQMANwIQIAEgACkDCDcCGCABQQxqECwgACABKQIQNwMAIAAgASkCGDcDCCABQSBqJAALugIBBX8jAEEwayICJAAgAiAANgIcIAIjDCIDKQMANwIgIAIgAykDCDcCKCACIAMpAxA3AgwgAiADKQMYNwIUIAIgATYCCCACIAIoAgg2AhwgAi8BGCEAIAJBADYCJCACIAA7ASwgAigCICEAIAIoAgwhBgJAAkAgAigCECIEIAIoAihLBEAgBEEcbCEBAn8gAARAIAAgASMHKAIAEQEADAELIAEjCCgCABEAAAshACACIAQ2AiggAigCJCIFRQ0BIAVBHGwiBUUNASAAIAFqIAAgBfwKAAAMAQsgBEUNASAEQRxsIQELIAYEQCABRQ0BIAAgBiAB/AoAAAwBCyABRQ0AIABBACAB/AsACyACIAA2AiAgAiACKAIkIARqNgIkIAMgAikCIDcDACADIAIpAig3AwggAkEwaiQAC9kBAgh/AX4jAEHQAGsiASQAIAEjDCICKAIANgJIIAFBQGsiAyACKAIMQQF0NgIAIAEgADYCTCACKAIgIQQgAikDGCEJIAIoAhQhBSACKAIEIQYgAigCCCEHIAIoAhAhCCABIAEpAkg3AxggASAINgJEIAEgAykCADcDECABIAc2AjwgASAGQQF0NgI4IAEgBTYCKCABIAk3AiwgASAENgI0IAEgADYCJCABIAEpAjg3AwggAUEkaiABQQhqEC0gAiABKQIoNwMAIAIgASkCMDcDCCABQdAAaiQAC1MBAX8jAEEgayIBJAAgASAANgIMIAEjDCIAKQMANwIQIAEgACkDCDcCGCABKAIQIgAEQCAAIwkoAgARAgALIAFBADYCGCABQgA3AhAgAUEgaiQAC8oBAQd/IwBBMGsiASQAIAEgADYCHCABIwwiAykDADcCICABIAMpAwg3AihBACEAIAEvASwhBiABKAIcIQcCQCABKAIkIgRFDQAgASgCICEFIARBHGwiAiMIKAIAEQAAIQAgBQRAIAJFDQEgACAFIAL8CgAADAELIAJFDQAgAEEAIAL8CwALIAFBADsBGiABIAY7ARggASAENgIUIAEgBDYCECABIAA2AgwgASAHNgIIIAMgASkCDDcDACADIAEpAhQ3AwggAUEwaiQAC5oBAQN/IwBB0ABrIgEkACABIwwiAigCADYCSCABQUBrIgMgAigCDEEBdDYCACABIAA2AkwgASABKQJINwMYIAEgAigCEDYCRCABIAMpAgA3AxAgASACKAIINgI8IAEgAigCBEEBdDYCOCABIAEpAjg3AwggAUEkaiABQQhqEHEgAiABKQIoNwMAIAIgASkCMDcDCCABQdAAaiQAC84wAht/A34jAEEQayIYJAAjAEFAaiIHJAAgB0EANgI8IAdCADcCJCAHQgA3AhwCfyAAKAIAIgJBAXEEQCAALQAEIQ0gAC0ABiEMIAAtAAVBD3EMAQsgAigCDCENIAIoAgQhDCACKAIICyEIIAdBADsBPCAHIAA2AiwgB0HgASMIKAIAEQAAIgI2AjAgB0KBgICAgAE3AjQgAkEANgIYIAJCADcCECACIA02AgwgAiAINgIIIAIgDDYCBCACIAA2AgACfyABKAIAIgJBAXEEQCABLQAEIQ0gAS0ABiEMIAEtAAVBD3EMAQsgAigCDCENIAIoAgQhDCACKAIICyECIAdBADsBKCAHIAE2AhggBygCHCEIIAcoAiRFBEACfyAIBEAgCEHgASMHKAIAEQEADAELQeABIwgoAgARAAALIQggB0EINgIkCyAHQQE2AiAgByAINgIcIAhBADYCGCAIQgA3AhAgCCANNgIMIAggAjYCCCAIIAw2AgQgCCABNgIAIAdBADYCECAHQgA3AwggACgCFCAAKAIYIAEoAhQg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QQFxC0UEQCADIQAMBAsgESAWRgRAIAMhAAwECyAGIA5NDQAgAyEADAMLQgAhJEEAIQpBACEEQgAhIyABIAlJBEAgCSABayEEIBwgBmsiAEEAIAAgHE0brSAbIBsgFWsiAEEAIAAgG00bIAYgHEkbrUIghoQhIwsgASAMSQRAIAwgAWshCiAOIAZrIgBBACAAIA5NG60gESARIBVrIgBBACAAIBFNGyAGIA5JG61CIIaEISQLAn8gASAQTwRAQgAhJ0EADAELICVCIIinIgAgACAVayIFQQAgACAFTxsgJaciACAGSxutQiCGIAAgBmsiBUEAIAAgBU8brYQhJyAQIAFrCyEFAn8gByAJSwRAICghJiAJDAELICghJiAJIAcgCUYgCSAMRnENABogJSEmIAQiCiEFICMiJCEnIBALIRACQCADQQFqIgAgGU0NAEEIIBlBAXQiASAAIAAgAUkbIgEgAUEITRsiGUEobCEBIAgEQCAIIAEjBygCABEBACEIDAELIAEjCCgCABEAACEICyAIIANBKGxqIgMgJzcCICADIAU2AhwgAyAkNwIUIAMgCjYCECADICM3AgggAyAENgIEIAMgFDYCACAAIQMgJiElCyAGIA9qrSAgICFqQQAgFSAPG2qtQiCGhCEjIAchASACQQFqIgIgIkcNAAsLIAANAAsgCARAIAgjCSgCABECAAsgCyALKQIINwIQIA1BMGokACAXIAspAxA3AgAgCygCGCIABEACQCALKAIcIgJFDQBBACEDIAJBBE8EQCACQXxxIQUDQCAAIANBA3RqIgEoAgAjCSIEKAIAEQIAIAEoAgggBCgCABECACABKAIQIAQoAgARAgAgASgCGCAEKAIAEQIAIANBBGohAyAdQQRqIh0gBUcNAAsLIAJBA3EiAkUNAANAIAAgA0EDdGooAgAjCSgCABECACADQQFqIQMgHkEBaiIeIAJHDQALCyAAIwkoAgARAgALIAsoAiQiAARAIAAjCSgCABECAAsgC0EwaiQAIBJBMGokAAv8AQIGfwF+IwBBMGsiASQAIwwiAigCFCABIAIoAhxBAXQ2AiwgASACKAIYNgIoIAEgASkCKDcDCEEBdCEGIAEpAgghBwJ/IAAoAgAiA0EBcQRAIAAtAAVBD3EhBCAALQAEIQUgAC0ABgwBCyADKAIMIQUgAygCCCEE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Ahg3A9ABIAogASkCEDcDyAEgCiABKQIINwPAASAKIAEpAgA3A7gBIB8gHygCBCIIQQFqIgcgHygCCCIBSwR/IAJBCCABQQF0IgEgByABIAdLGyIBIAFBCE0bIgFBBXQjBygCABEBACECIB8gATYCCCAfKAIEIghBAWoFIAcLNgIEIB8gAjYCACACIAhBBXRqIgEgCikDuAE3AgAgASAKKQPQATcCGCABIAopA8gBNwIQIAEgCikDwAE3AgggHygCACAfKAIEIgdBBXRqIh5BIGsoAgAiAQRAIAEgASgClAFBAWo2ApQBCyAVIDZrIgFBACABIBVNGyESIA8gIkshEyAPIA8gImsiCEkhDSADIAMgCWsiAkkhAQJAIB5BFGsoAgAiA0UNACADQQFxDQAgAyADKAIAQQFqNgIAIAMoAgAaIB8oAgQhBwsgFSASIBMbIRJBACAIIA0bIRNBACACIAEbIQggIWohDSAeQRxrQQA2AgAgBSgCoAkoAkggBEEDbGoiAS0AASEDIAEtAAAhAgJ+AkAgBEH/AUsNACAIQf4BSw0AIBNBD0sNACASQf4BSw0AIA1BD0sNACADQQJ0IAJBAXRqQQFyQf8BcSAEQQh0ciAWciEBIA1BDHQgE0EIdHIgCEEQdHIgEnKtQiCGDAELIBOtIBKtQiCGhCE7An8gBSgCjAkiAQRAIAUgAUEBayIBNgKMCSAFKAKICSABQQN0aigCAAwBC0HMACMIKAIAEQAACyEBIApCADcDwAEgCkIANwPIASAKQQA2AtABIAogCDYCiAIgCiA7NwOAAiAKQQA2AvgBIApBADYC9AEgCkEANgLwASAKIA02AuwBIApBADYC6AEgCkEANgLkASAKIAQ7AeABIAogHDsB3gEgCkEAOwHaASAKQgA3A7gBIApBATYCjAIgCiADQQF0IAJqQf8BcTsB3AEgASAKKAKMAjYCACABIAooAogCNgIEIAEgCikDgAI3AgggASAKKAL4ATYCECABIAooAvQBNgIUIAEgCigC8AE2AhggASAKKALsATYCHCABIAooAugBNgIgIAEgCigC5AE2AiQgASAKLwHgATsBKCABIAovAd4BOwEqIAEgCi8B3AE7ASwgASAKLwHaATsBLiABIAooAtABNgJIIAFBQGsgCikDyAE3AgAgASAKKQPAATcCOCABIAopA7gB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CiA9NwO4ASAKQbgBakEAIAFBACAAEDlBCiAFKAKMChAJDAQLQdwAIAUoAowKEAkgAS0AACEECyAEwCAFKAKMChAJIAFBAWohAQwACwALIAVBAToAxQpBACEEDAMLIAUpArQJIT0gBSgCoAkLIQAgBSgCZCEDIAUoAkQhAkEcIwgoAgARAAAiBCA9NwIAAkAgAEUNACAAKAJcDQAgACgCaCAARw0AIAAgACgCqAFBAWo2AqgBCyAEIAA2AggjBiIBRQRAIwFBoPQAaiIAIAAoAgBBAWoiATYCACABJAYLIARBADYCECAEIAE2AgwgBCADQRgjCigCABEBACIBNgIUIANBGGwiAARAIAEgAiAA/AoAAAsgBCADNgIYIAVCADcCtAkgBRAoDAELIAUQKAsgCkGQAmokACAFQgA3AqwKIClBEGokACAgQTBqJAAgBAsLACABQQFGIAIQCAs+AQF/IwBBEGsiAiQAIAIgADYCCCACIwJBFGpBACABGzYCDCACIAIpAgg3AwAgACACKQIANwJcIAJBEGokAAvKCAIHfwF+IwwhBiMAQRBrIgUkAEEBQcgKIwooAgARAQAiACMCIgFBA2o2AhwgACABQQRqNgIYIAAgAUEFajYCFCAAIAFBBmo2AhAgACABQQdqNgIMIAAgAUEIajYCCCAAQgA3AgAgAEEgakEAQeQI/AsAIABBAEEYIwcoAgARAQAiATYCRCABIwFB/AtqIgIpAhA3AhAgASACKQIINwIIIAEgAikCADcCACAAQQE2AmQCQAJAIAAoAkQiAygCFCIEIAAoAiAiAU0NACAEIAMoAhAiAk0NACABIAJNBEAgACADKQIANwIkIAAgAjYCICACIQELQQAhAiAAQQA2AmggACgCSEUNASAAKAJsIgMgAU0EQCABIAAoAnAgA2pJDQILIABBADYCSCAAQgA3AmwMAQtBASECIABBATYCaCADKQIIIQcgAEEANgJIIAAgBzcCJCAAIAQ2AiAgAEIANwJsCyAAQQA2ArAJIABBADYCACAAIAI2AnQgAEIANwKoCSAAQcAAIwgiASgCABEAADYCqAkgAEEENgKwCUGAAiABKAIAEQAAIQEgAEIANwKUCSAAQoCAgICABDcCjAkgACABNgKICSAAQZwJakEANgIAQQFBOCMKKAIAEQEAIgFCADcCACABQgA3AiggAUIANwIgIAFCADcCGCABQgA3AhAgAUIANwIIIAFBgAEjCCgCABEAADYCACABQQQ2AgggASgCDCECIAEoAhRBA00EQAJ/IAIEQCACQcAAIwcoAgARAQAMAQtBwAAjCCgCABEAAAshAiABQQQ2AhQLIAEgAjYCDCABKAIYIQIgASgCIEEDTQRAAn8gAgRAIAJB4AAjBygCABEBAAwBC0HgACMIKAIAEQAACyECIAFBBDYCIAsgASACNgIYIAEoAiQhAiABKAIsQTFNBEACfyACBEAgAkHIASMHKAIAEQEADAELQcgBIwgoAgARAAALIQIgAUEyNgIsCyABIABBiAlqIgM2AjQgASACNgIkAn8gASgCKCIEBEAgASAEQQFrIgQ2AiggAiAEQQJ0aigCAAwBC0GkASMIKAIAEQAACyICQQE7AQAgAkECakEAQZIB/AsAIAJCADcCBCACQQE2ApQBIAJBADYCDCACQgA3ApgBIAJBADYCoAEgASACNgIwIAEQOyAAQgA3AvQJIABCADcCtAkgACABNgKECSAAQfwJakIANwIAIABBhApqQQA2AgAgAEIANwKUCiAAQgA3AogKIABBADYCoAkgAEGcCmpCADcCACAAQaQKakIANwIAIABBADYCwAogAEHDCmpBADYAACAAQeAJaiEBIAAoAuAJBEAgBSABKQIANwMIIAMgBUEIahAKCyAAKALoCQRAIAUgAEHoCWopAgA3AwAgAyAFEAoLIAFCADcCACABQQA2AhAgAUIANwIIIAVBEGokACAGQYDQAEEBECo2AgQgBiAANgIACxQBAX8jDCIAQo+AgIDQATcDACAACxgBAX8gACgCAEEPTwR/IAAoAogBBUEACwvBAwEJfyMAQSBrIgIkACAABEAgAkIANwMYIAJCADcDECACQgA3AwggAiAAKQIANwMAIAJBCGogAhAKIAIoAggiAwRAAkAgAigCDCIERQ0AIARBBE8EQCAEQXxxIQkDQCADIAFBA3RqIgUoAgAjCSIGKAIAEQIAIAUoAgggBigCABECACAFKAIQIAYoAgARAgAgBSgCGCAGKAIAEQIAIAFBBGohASAIQQRqIgggCUcNAAsLIARBA3EiBEUNAANAIAMgAUEDdGooAgAjCSgCABECACABQQFqIQEgB0EBaiIHIARHDQALCyADIwkoAgARAgAgAkEA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AkEWajYCACMBQfzyAGojAkEXajYCACMBQZTzAGojAkEYajYCACMBQazzAGojAkEZajYCACMBQbDzAGojAkEaajYCACMBQbTzAGojAUHE9gBqNgIAIwFBmPQAaiMBQYjzAGo2AgAjAUGc9ABqIwU2AgALQgEDfyMBIgFBtPUAaiIAIAFBnPUAajYCYCAAIwQiAiMDazYCOCAAIAI2AjQgAEEqNgIYIAAgAUGA8wBqKAIANgI8CwundAEAIwELoHQtKyAgIDBYMHgALTBYKzBYIDBYLTB4KzB4IDB4AHJlZHVjZSBzeW06JXMsIGNoaWxkX2NvdW50OiV1AHJlc3VtZSB2ZXJzaW9uOiV1AHJlbW92ZWQgcGF1c2VkIHZlcnNpb246JXUAbGV4X2V4dGVybmFsIHN0YXRlOiVkLCByb3c6JXUsIGNvbHVtbjoldQBsZXhfaW50ZXJuYWwgc3RhdGU6JWQsIHJvdzoldSwgY29sdW1uOiV1AHByb2Nlc3MgdmVyc2lvbjoldSwgdmVyc2lvbl9jb3VudDoldSwgc3RhdGU6JWQsIHJvdzoldSwgY29sOiV1AHJlY292ZXJfdG9fcHJldmlvdXMgc3RhdGU6JXUsIGRlcHRoOiV1ACwgc2l6ZToldQBzaGlmdCBzdGF0ZToldQByZWNvdmVyX3dpdGhfbWlzc2luZyBzeW1ib2w6JXMsIHN0YXRlOiV1AGRpZmZlcmVudF9pbmNsdWRlZF9yYW5nZSAldSAtICV1AGFjY2VwdABwYXJzZV9hZnRlcl9lZGl0AFx0AGFib3J0aW5nIHJlZHVjZSB3aXRoIHRvbyBtYW55IHZlcnNpb25zAGhhc19jaGFuZ2VzAHN3aXRjaCBmcm9tX2tleXdvcmQ6JXMsIHRvX3dvcmRfdG9rZW46JXMAc3RhdGVfbWlzbWF0Y2ggc3ltOiVzAHNlbGVjdF9zbWFsbGVyX2Vycm9yIHN5bWJvbDolcywgb3Zlcl9zeW1ib2w6JXMAc2VsZWN0X2VhcmxpZXIgc3ltYm9sOiVzLCBvdmVyX3N5bWJvbDolcwBzZWxlY3RfZXhpc3Rpbmcgc3ltYm9sOiVzLCBvdmVyX3N5bWJvbDolcwBjYW50X3JldXNlX25vZGUgc3ltYm9sOiVzLCBmaXJzdF9sZWFmX3N5bWJvbDolcwBza2lwX3Rva2VuIHN5bWJvbDolcwBpZ25vcmVfZW1wdHlfZXh0ZXJuYWxfdG9rZW4gc3ltYm9sOiVzAHJldXNhYmxlX25vZGVfaGFzX2RpZmZlcmVudF9leHRlcm5hbF9zY2FubmVyX3N0YXRlIHN5bWJvbDolcwByZXVzZV9ub2RlIHN5bWJvbDolcwBwYXN0X3JldXNhYmxlX25vZGUgc3ltYm9sOiVzAGJlZm9yZV9yZXVzYWJsZV9ub2RlIHN5bWJvbDolcwBjYW50X3JldXNlX25vZGVfJXMgdHJlZTolcwBicmVha2Rvd25fdG9wX29mX3N0YWNrIHRyZWU6JXMAZGV0ZWN0X2Vycm9yIGxvb2thaGVhZDolcwAoJXMAaXNfZXJyb3IAc2tpcF91bnJlY29nbml6ZWRfY2hhcmFjdGVyAG5hbgBcbgBpc19taXNzaW5nAHJlc3VtZV9wYXJzaW5nAHJlY292ZXJfZW9mAGluZgBuZXdfcGFyc2UAY29uZGVuc2UAZG9uZQBpc19mcmFnaWxlAGNvbnRhaW5zX2RpZmZlcmVudF9pbmNsdWRlZF9yYW5nZQBza2lwIGNoYXJhY3RlcjolZABjb25zdW1lIGNoYXJhY3RlcjolZABzZWxlY3RfaGlnaGVyX3ByZWNlZGVuY2Ugc3ltYm9sOiVzLCBwcmVjOiVkLCBvdmVyX3N5bWJvbDolcywgb3RoZXJfcHJlYzolZABzaGlmdF9leHRyYQBub19sb29rYWhlYWRfYWZ0ZXJfbm9uX3Rlcm1pbmFsX2V4dHJhAF9fUk9PVF9fAF9FUlJPUgBOQU4ATUlTU0lORwBJTkYASU5WQUxJRABsZXhlZF9sb29rYWhlYWQgc3ltOgAgMDAwMDAwMDAwMDAwEDAwAC4AKCVzKQAobnVsbCkAKE5VTEwpACgiJXMiKQAnXHQnACdccicAJ1xuJwBza2lwIGNoYXJhY3RlcjonJWMnAGNvbnN1bWUgY2hhcmFjdGVyOiclYycAJ1wwJwAiJXMiAChNSVNTSU5HIAAoVU5FWFBFQ1RFRCAAJXM6IAAKCgAAAAAAAAAAAAAAAQAAAAAAAAAAAAAA//////////8AAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4PDw8AAAAAAAAAAAEAAAABAAAAAgAAAAEAAAACAAAAAQAAAAIAAAABAAAAAgAAAAAAAAAAAAAAEhETFBUWFxgZGhscHR4fICERIiMkESUmJygpKissES0uLxAQMBAQEBAQEBAxMjMQNDUQEBERERERERERERERERERERERERERERERERE2ERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERNxERERE4ETk6Ozw9PhERERERERERERERERERERERERERERERERERERERERERERERERERERERERE/EBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEUBBEUJDREVGR0hJShFLTE1OT1BREFJTVFVWV1hZWltcXRBeX2AQERERYWJjEBAQEBAQEBAQEBERERFkEBAQEBAQEBAQEBAQEBAQERFlEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQERFmZxAQaGkREREREREREREREREREREREREREREREWoREWsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEWxtEBAQEBAQEBAQbhAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQb3BxchAQEBAQEBAQc3R1EBAQEBB2dxAQEBB4EBB5EBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////////////////////////////////////AAAAAAAAAAD+//8H/v//BwAAAAAABCAE//9/////f//////////////////////////////////D/wMAH1AAAAAAAAAAAAAAIAAAAAAA37xA1///+////////////7///////////////////////wP8///////////////////////////+////fwL//////wEAAAAA/7+2AP///4cHAAAA/wf//////////v/D////////////////7x/+4f+fAAD///////8A4P///////////////wMA//////8HMAT////8/x8AAP///wH/BwAAAAAAAP//3z8AAPD/+AP////////////v/9/h/8///v/vn/n///3F459ZgLDP/wMQ7of5///9bcOHGQJewP8/AO6/+////e3jvxsBAM//AB7un/n///3t458ZwLDP/wIA7Mc91hjH/8PHHYEAwP8AAO/f/f///f/j3x1gB8//AADv3/3///3v498dYEDP/wYA79/9/////+ffXfCAz/8A/Oz/f/z///svf4Bf/8D/DAD+/////3//Bz8g/wMAAAAA1vf//6///ztfIP/zAAAAAAEAAAD/AwAA//7///8f/v8D///+////HwAAAAAAAAAA////////f/n/A////////////z//////vyD///////f///////////89fz3//////z3/////PX89/3//////////Pf//////////BwAAAAD//wAA/////////////z8//v//////////////////////////////////////////////////////////n////v//B////////////8f/Af/fDwD//w8A//8PAP/fDQD////////P//8BgBD/AwAAAAD/A///////////////Af//////B///////////PwD///9//w//AcD/////Px8A//////8P////A/8DAAAAAP///w//////////f/7/HwD/A/8DgAAAAAAAAAAAAAAA////////7//vD/8DAAAAAP//////8////////7//AwD///////9/AP/j//////8//wH//////+cAAAAAAN5vBP///////////////////////////////wAAAACA/x8A//8/P/////8/P/+q////P////////99f3B/PD/8f3B8AAAAAAAAAAAAAAAAAAAKAAAD/HwAAAAAAAAAAAAAAAIT8Lz5Qvf/z4EMAAP//////AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMD///////8DAAD//////3///////3//////////////////////H3gMAP////+/IP////////+AAAD//38Af39/f39/f3//////AAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAA/gM+H/7///////////9/4P7/////////////9+D///////7/////////////fwAA////BwAAAAAAAP///////////////////////////////z8AAAAAAAAAAAD///////////////////////////////////////8AAP//////////////////////HwAAAAAAAAAA//////8//x////8PAAD//////3/wj///////////////////AAAAAID//P////////////////n///////98AAAAAACA/7//////AAAA////////DwD//////////y8A/wMAAPzo//////8H/////wcA////H/////////f/AID/A////3////////9/AP8//wP//3/8/////////38FAAA4//88AH5+fgB/f///////9/8A////////////////////B/8D//////////////////////////8PAP//f/j//////w//////////////////P/////////////////8DAAAAAH8A+OD//X9f2/////////////////8DAAAA+P///////////////z8AAP///////////P///////wAAAAAA/w8AAAAAAAAAAAAAAAAAAN//////////////////////HwAA/wP+//8H/v//B8D/////////////f/z8/BwAAAAA/+///3///7f/P/8/AAAAAP///////////////////wcAAAAAAAAAAP///////x8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8f////////AQAAAAAA/////wDg////B///////B////z//////D/8+AAAAAAD/////////////////////////P/8D/////w//////D///////AP///////w8AAAAAAAAAAAAAAAAAAAAAAAAA////////fwD//z8A/wAAAAAAAAAAAAAAAAAAAAAAAAA//f////+/kf//PwD//38A////fwAAAAAAAAAA//83AP//PwD///8DAAAAAAAAAAD/////////wAAAAAAAAAAAb/Dv/v//PwAAAAAA////H////x8AAAAA//7//x8AAAD///////8/AP//PwD//wcA//8DAAAAAAAAAAAAAAAAAP///////////wEAAAAAAAD///////8HAP///////wcA//////8A/wMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8fgAD//z8AAAAAAAAAAAAAAAAAAAAAAAAA//9/AP//////////PwAAAMD/AAD8////////AQAA////Af8D////////x/9wAP////9HAP//////////HgD/FwAAAAD///v///+fQAAAAAAAAAAAf73/v/8B/////////wH/A++f+f///e3jnxmB4A8AAAAAAAAAAAAAAAAAAAAAAAAA//////////+7B/+DAAAAAP//////////swD/AwAAAAAAAAAAAAAAAAAAAAAAAAAA////////P38AAAA/AAAAAP////////9/EQD/AwAAAAD///////8/Af8DAAAAAAAA////5/8H/wMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////AQAAAAAAAAAAAAAAAP///////////wMAgAAAAAAAAAAAAAAAAAAAAAAAAAAA//z///////waAAAA////////538AAP///////////yAAAAAA/////////wH//f////9/fwEA/wMAAPz////8///+fwAAAAAAAAAAAH/7/////3+0ywD/A7/9////f3sB/wMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//fwD/////////////////////////AwAAAAAAAAAAAAAAAP////////////////9/AAD///////////////////////////////8PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////38AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////fwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////wH///9//wMAAAAAAAAAAAAAAAD///8/AAD///////8AAA8A/wP4///g//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAA////////////h/////////+A//8AAAAAAAAAAAsAAAD/////////////////////////////////////////AP///////////////////////////////////////wcA////fwAAAAAAAAcA8AD/////////////////////////////////////////////////////////////////D/////////////////8H/x//Af9DAAAAAAAAAAAAAAAA/////////////9///////////99k3v/r7/////////+/59/f////e1/8/f//////////////////////////////////////////////////////P/////3///f////3///f////3///f////3/////9/////f//98////////9////52wcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////H4A//0MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////8P/wP///////////////////////////////8fAAAAAAAAAP//////////jwj/AwAAAAAAAAAAAAAAAAAAAAAAAAAA7////5b+9wqE6paqlvf3Xv/7/w/u+/8PAAAAAAAAAAAAAAAAAAD///8D////A////wMAAAAAAAAAAAAAAAAAACAAAAAJAAAACgAAAA0AAAALAAAADAAAAIUAAAAAIAAAASAAAAIgAAADIAAABCAAAAUgAAAGIAAACCAAAAkgAAAKIAAAKCAAACkgAABfIAAAADAAAAAAAAAAAAAAAAAAABkACwAZGRkAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAGQAKChkZGQMKBwABAAkLGAAACQYLAAALAAYZAAAAGRkZAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAABkACw0ZGRkADQAAAgAJDgAAAAkADgAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAATAAAAABMAAAAACQwAAAAAAAwAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAADwAAAAQPAAAAAAkQAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAAAAAAAAABEAAAAAEQAAAAAJEgAAAAAAEgAAEgAAGgAAABoaGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaAAAAGhoaAAAAAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAFwAAAAAXAAAAAAkUAAAAAAAUAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYAAAAAAAAAAAAAABUAAAAAFQAAAAAJFgAAAAAAFgAAFgAAMDEyMzQ1Njc4OUFCQ0RFRgAIAABWAQAAOQAAAAAAAAAAAAAAASAAAADg//8Avx0AAOcCAAB5AAACJAAAAQEAAAD///8AAAAAAQIAAAD+//8BOf//ABj//wGH//8A1P7/AMMAAAHSAAABzgAAAc0AAAFPAAABygAAAcsAAAHPAAAAYQAAAdMAAAHRAAAAowAAAdUAAACCAAAB1gAAAdoAAAHZAAAB2wAAADgAAAMAAAAAsf//AZ///wHI//8CKCQAAAAAAAEBAAAA////ADP//wAm//8Bfv//ASsqAAFd//8BKCoAAD8qAAE9//8BRQAAAUcAAAAfKgAAHCoAAB4qAAAu//8AMv//ADb//wA1//8AT6UAAEulAAAx//8AKKUAAESlAAAv//8ALf//APcpAABBpQAA/SkAACv//wAq//8A5ykAAEOlAAAqpQAAu///ACf//wC5//8AJf//ABWlAAASpQACJEwAAAAAAAEgAAAA4P//AQEAAAD///8AVAAAAXQAAAEmAAABJQAAAUAAAAE/AAAA2v//ANv//wDh//8AwP//AMH//wEIAAAAwv//AMf//wDR//8Ayv//APj//wCq//8AsP//AAcAAACM//8BxP//AKD//wH5//8CGnAAAQEAAAD///8BIAAAAOD//wFQAAABDwAAAPH//wAAAAABMAAAAND//wEBAAAA////AAAAAADACwABYBwAAAAAAAHQlwABCAAAAPj//wIFigAAAAAAAUD0/wCe5/8AwokAANvn/wCS5/8Ak+f/AJzn/wCd5/8ApOf/AAAAAAA4igAABIoAAOYOAAEBAAAA////AAAAAADF//8BQeL/Ah2PAAAIAAAB+P//AAAAAABWAAABqv//AEoAAABkAAAAgAAAAHAAAAB+AAAACQAAAbb//wH3//8A2+P/AZz//wGQ//8BgP//AYL//wIFrAAAAAAAARAAAADw//8BHAAAAQEAAAGj4v8BQd//Abrf/wDk//8CC7EAAQEAAAD///8BMAAAAND//wAAAAABCdb/ARrx/wEZ1v8A1dX/ANjV/wHk1f8BA9b/AeHV/wHi1f8BwdX/AAAAAACg4/8AAAAAAQEAAAD///8CDLwAAAAAAAEBAAAA////Abxa/wGgAwAB/HX/Adha/wAwAAABsVr/AbVa/wG/Wv8B7lr/AdZa/wHrWv8B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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsrKysrKysrKysrKytVVlZWVlZWVlZWVlZWDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkKysrKysrKysrKysHAFZWVlZWVlZWVlZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJCsrKysrKysrKysrKysrKysHAAAAAFZWVlZWVlZWVlZWVlZWVlZWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACorKysrKysrKysrVlZWVlZWVlZWVg4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACorKysrKysrKysrVlZWVlZWVlZWVg4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKysrKysrKysrKytVVlZWVlZWVlZWVg4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABidRb3cAAAAAAAAAAAAAfAAAfwAAAAAAAAAAg46SlwCqAAAAAAAAAAAAALTEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxskAAADbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADeAAAAAOEAAAAAAAAA5AAAAAAAAAAAAAAA5wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADtAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIQExQVFhcYGRobHB0eHyAhEBAiIxAkJSYnKCkqKxAsLS4RES8REREREREwMTIzNDU2NxEQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQOBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQORA6Ozw9Pj8QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQQBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQQRAQQhBDREUQRkdIEEkQEEpLTE1OEE9QUVJTVFVWV1hZWlsQXF1eXxAQEBBgEBAQEBAQEBAQEBAQEBAQYRAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQYmMQEGRlEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEGYQEBAQEBAQEBAQEBAQEBAQEBAQZ2hpahAQa2wREW0QEBAQEBBubxAQEBAQcHEQEHJzdBB1dncRERF4eXp7fBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////////////////////////////////////wAAAAD+/wD8AQAA+AEAAHgAAAAA//vf+wAAgAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAD8/+Cv/////////////9///////yBAsAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAD8AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAADm/v///wBASQAAAAAAGAD//wDYAAAAAAAAAAEAPAAAAAAAAAAAAAAAABDgAR4AYP+/AAAAAAAA/wcAAAAAAAAAAAAAAAAAAAAAAAAA+M/jAAAAAwAg/38AAABOAAAAAAAAAAAAAAAAAAAIAAf8AAAAAAAAAAAAEAAgHgAwAAEAAAAAAAAAABAAIAAAAAD8bwAAAAAAAAAQACAAAAAAQAAAAAAAAAAAEAAgAAAAAAPgAAAAAAAAABAAIAAAAAD9AAAAAAAAAAAAACAAAAAA/wcQAAAAAAAAAAAgAAAAAID/EAAAAAAAABAAIAAAAAAAAAAAAAAAAAAYAKAAfwAA/wMAAAAAAAAAAAAEAAAAABAAAAAAAACAAIDA3wAMAAAAAAAAAAAAAAAEAB8AAAAAAAD+////APz//wAAAAAAAAAA/AAAAAAAAMD/3/8HAAAAAAAAAAAAAIAGAPwAAAAAAAAAAADAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAADg////HwAA/wMAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAABAAAYAAAAAAAAAAAAOAAAAAAQAAAAcAAAAAAAAAAAAAAAAAAAADAAAP5/LwAA/wP/fwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOMQAAAAAAAAAAAAAAAAAAAAAAAMT/////AAAAwAAAAAAAAAAAAQDgnwAAAAB/P/9/AAAAAAAAAAAAAAAAAAAQABAAAPz///8fAAAAAAAMAAAAAAAAQAAM8AAAAAAAAID4AAAAAAAAAMAAAAAAAAAAAP8A////IZADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////38A4PsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAD4ADgAOAAYID4/////P//////f9//8X//fwAA/////wAA/////wEAewPQwa9CAAwfvP//AAAAAAAO////////////////////////fwAAAP8HAAD/////////////PwAAAAAAAPz/////////////////////z////z//////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOCHA/4AAAAAAAAAAAAAAAAAAAGAAAAAAAAAAAAAAAAAAAAAAP//////f/////8AAAAAAAD////7/////////////w8A//////////////////////////////////8/AAAA/w8e////AfzB4AAAAAAAAAAAAAAAHgEAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAP////8PAAAA////f/////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAP///////38AAAAAAADAAOAAAAAAAAAAAAAAAIAPcAAAAAAAAAAAAAAAAAAA/wD//38AAwAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAEAAAAAAD/8DAAAAAAAA8AAAAAAAAAAAABDAAAD//wMXAAAAAAD4AAAAAAiAAAAAAAAAAAAAAAgA/z8AwAAAAAAAAAAAAAAAAAAAAPAAAIADAAAAAAAAAIACAADAAABDAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAOAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAgAAAAAAAAAAAAAAAAAAAAD8/wMAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADD///8D////////9/9/DwAAAAAAAAAAAAAAAAAAAAAAgP7/APwBAAD4AQAA+D8AAAAAAAAAAAAAAAAAAAB/fwAwh///////j/8AAAAAAADg//9//w8BAAAAAAD//////z8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////DwAAAAAPAAAAAAAAAAAAAAAAAACAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP8AAID/AAAAAID/AAAAAAAAAAAA+AAAwI8AAACAAAAAAAAAAAAAAAAAAAAAMP///P//////AAAAAAAAAIf/Af8BAAAA4AAAAOAAAAAAAAEAAGD4fwAAAAAAAAAA/gAAAP8AAAD/AAAAHgD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAA////fwAAAAAAAAAAAAAAAAAAAAAAAADgfwAAAMD//wMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwD/8/z8AAIADAAAAAAAA/gMgAAAAAAAAAAAAAAAAGAAPAAAAAAA4AAAAAAAAAAAA4T8A6P7/HwAAAAAAAABgPwAAAAAAAAAAAAAAAAACAAAAAAAAAAYAAAAAAAAAAAAYACAAAMAfHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABE+ABoAAAAAAAAAAAAAAAATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID///8AAAAAAAAAAAAAAACADgAAAP8fAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAIAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAPwHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAGID/AAAAAAAAAAAAAN8HAAAAAAAAAAAAAAAAAAAAAAAAgD4AAPz/HwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8DgAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAP//MAAA+AMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwDwAAAAAAAAAAAAAA////////////////////////////////////////PwD/////f/7//////////////////////////////wEAAP//////////PwAAAAAAAAAAAAAAAAAAAAAAAAD//w8A/////////////38A////AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAIAAAACAAAIAAAACAAAIAAAACAAAAAAgAAAAIAAAgAAAAAAAAA//////////////////////8PAPj+/wAAAAAAAAAAAAAAAAAAAAB/AACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP9/AAAAAAAAAAAAAAAAAHAHAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v////////8fAAAAAAAAAAAA/v///////z8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAP//////D////////////////w8A/3/+//7//v///z8A/x//////AAAA/AAAABwAAAD8////HwAAAAAAAMD///8HAP//////D/8BAwA/AAAAAAAAAAAAAAAAAAAAAAAAAP//////////////////////////////////PwD/H/8H//////////////////8PAP//////////////Af8PAAD/D/////////8A/wP//////wD///8/AAAAAAAAAAAAAP/v////////////////e/z/////58f////n/////////////////////w8A/z8PBwcAPwAAAAAAAAAAAAAAAAAQAAAAEQAAABIAAAATAAAAAAAAABYAAAAAAAAAFwAAAAAgAAAAAAAABQAAAAAAAAAAAAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQAAABoAAABEOwAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiDkAAAAAAAAAKhBzb3VyY2VNYXBwaW5nVVJMGHdlYi10cmVlLXNpdHRlci53YXNtLm1hcA==", Ye = {
	light: {
		name: "github-light",
		fg: "#24292e"
	},
	dark: {
		name: "github-dark",
		fg: "#e1e4e8"
	}
}, Xe = () => Ye[document.documentElement.dataset.theme === "dark" ? "dark" : "light"], Ze = 1, Qe = 2, $e = 4, et = {
	markdown: () => import("./markdown-CNVZ8ok-.js"),
	javascript: () => import("./javascript-BSjxD7Ei.js"),
	typescript: () => import("./typescript-DcJ-ca4B.js"),
	css: () => import("./css-BnAyJkjl.js"),
	html: () => import("./html-B15Ssl5e.js"),
	xml: () => import("./xml-D0f8rgW-.js"),
	json: () => import("./json-CWJmcBQn.js"),
	python: () => import("./python-BHaXfePs.js"),
	shellscript: () => import("./shellscript-CB7IBf-7.js"),
	yaml: () => import("./yaml-CcAIbj8h.js")
}, U = /* @__PURE__ */ new Map();
function tt(e, t) {
	if (t === "simple") return Promise.resolve({
		engine: t,
		tokenize: (t) => S(t, e.simple ?? "text")
	});
	let n = `${e.id}:${t}:${e.fileId ?? ""}`;
	if (!U.has(n)) {
		let r = t === "textmate" ? at(e) : lt(e);
		U.set(n, r.catch((e) => {
			throw U.delete(n), e;
		}));
	}
	return U.get(n).then((e) => ({
		engine: t,
		tokenize: e
	}));
}
function nt() {
	for (let e of [...U.keys()]) e.startsWith("tm:") && U.delete(e);
}
var rt = null;
function it() {
	return rt ??= (async () => {
		let [{ createHighlighterCore: e }, { createJavaScriptRegexEngine: t }] = await Promise.all([import("./dist-CIsKHyKw.js"), import("./dist-CQ8hnDd0.js")]);
		return e({
			themes: [import("./github-light-BNubH2n_.js"), import("./github-dark-xcSqNsVI.js")],
			langs: [],
			engine: t({ forgiving: !0 })
		});
	})(), rt;
}
async function at(e) {
	if (!e.textmate) throw Error(`Nessuna grammatica TextMate per ${e.label}`);
	let t = await it(), n = e.textmate, r = typeof n == "string" ? n : n.grammar.name;
	return t.getLoadedLanguages().includes(r) || (typeof n == "string" ? await t.loadLanguage(et[n]()) : await t.loadLanguage(n.grammar)), (e) => {
		let n = [], i = Xe();
		return t.codeToTokensBase(e, {
			lang: r,
			theme: i.name
		}).forEach((e, t) => {
			t && n.push([null, "\n"]);
			for (let t of e) {
				let e = t.color && t.color.toLowerCase() !== i.fg ? t.color : null;
				n.push([
					null,
					t.content,
					e,
					t.fontStyle || 0
				]);
			}
		}), n;
	};
}
var W = {
	ITALIC: Ze,
	BOLD: Qe,
	UNDERLINE: $e
}, ot = null, G = /* @__PURE__ */ new Map();
function st(e) {
	let t = e.toLowerCase(), n = (...e) => e.some((e) => t === e || t.startsWith(e + "."));
	return n("comment") ? "cm" : n("string.special.key") ? "pr" : n("string", "text.literal", "markup.raw") ? "st" : n("number", "float", "boolean", "constant", "variable.builtin", "escape", "character") ? "nu" : n("keyword", "tag", "conditional", "repeat", "include", "exception", "storageclass") ? "kw" : n("function", "method", "constructor") ? "fn" : n("property", "attribute", "label", "field", "variable.member") ? "pr" : n("type", "namespace", "module") ? "ty" : n("markup.heading", "text.title") ? "hd" : n("markup.strong", "text.strong") ? "bd" : n("markup.italic", "text.emphasis") ? "it" : n("punctuation.special", "markup.list") ? "pu" : null;
}
var ct = import.meta.url;
async function lt(e) {
	if (!e.treesitter) throw Error(`Nessuna grammatica Tree-sitter per ${e.label}`);
	let { Parser: t, Language: n, Query: r } = await import("./web-tree-sitter-DoPK4l5c.js");
	ot ??= t.init({ locateFile: () => Je }), await ot;
	let i = e.treesitter;
	G.has(i) || G.set(i, (async () => {
		let e = new URL(`tree-sitter/${i}/`, ct).href, [t, a] = await Promise.all([n.load(`${e}tree-sitter-${i}.wasm`), fetch(`${e}highlights.scm`).then((e) => {
			if (!e.ok) throw Error(`highlights.scm: ${e.status}`);
			return e.text();
		})]);
		return {
			language: t,
			query: new r(t, a)
		};
	})().catch((e) => {
		throw G.delete(i), e;
	}));
	let { language: a, query: o } = await G.get(i), s = new t();
	return s.setLanguage(a), (e) => {
		let t = s.parse(e);
		if (!t) return [[null, e]];
		try {
			let n = Array(e.length).fill(null), r = o.captures(t.rootNode).map((e) => ({
				start: e.node.startIndex,
				end: e.node.endIndex,
				cls: st(e.name)
			})).sort((e, t) => e.start - t.start || t.end - t.start - (e.end - e.start));
			for (let e of r) for (let t = e.start; t < e.end && t < n.length; t++) n[t] = e.cls;
			let i = [], a = 0;
			for (let t = 1; t <= e.length; t++) (t === e.length || n[t] !== n[a]) && (i.push([n[a], e.slice(a, t)]), a = t);
			return i.length ? i : [[null, e]];
		} finally {
			t.delete();
		}
	};
}
// src/editor/lsp/jsonrpc.js
var ut = class {
	#e = 1;
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Map();
	constructor(e) {
		this.send = e;
	}
	request(e, t) {
		let n = this.#e++;
		return new Promise((r, i) => {
			this.#t.set(n, {
				resolve: r,
				reject: i
			}), this.send({
				jsonrpc: "2.0",
				id: n,
				method: e,
				params: t
			});
		});
	}
	notify(e, t) {
		this.send({
			jsonrpc: "2.0",
			method: e,
			params: t
		});
	}
	onRequest(e, t) {
		this.#n.set(e, t);
	}
	onNotification(e, t) {
		this.#r.set(e, t);
	}
	close(e = "Connessione chiusa") {
		for (let { reject: t } of this.#t.values()) t(Error(e));
		this.#t.clear();
	}
	async receive(e) {
		if (e && typeof e == "object" && e.jsonrpc === "2.0") {
			if ("id" in e && !("method" in e)) {
				let t = this.#t.get(e.id);
				if (!t) return;
				this.#t.delete(e.id), e.error ? t.reject(Object.assign(Error(e.error.message ?? "Errore del server"), { code: e.error.code })) : t.resolve(e.result ?? null);
			} else if ("id" in e) {
				let t = this.#n.get(e.method);
				if (!t) return this.send({
					jsonrpc: "2.0",
					id: e.id,
					error: {
						code: -32601,
						message: `Metodo non gestito: ${e.method}`
					}
				});
				try {
					this.send({
						jsonrpc: "2.0",
						id: e.id,
						result: await t(e.params) ?? null
					});
				} catch (t) {
					this.send({
						jsonrpc: "2.0",
						id: e.id,
						error: {
							code: -32603,
							message: String(t?.message ?? t)
						}
					});
				}
			} else this.#r.get(e.method)?.(e.params);
		}
	}
}, dt = class extends e {
	status = "starting";
	error = null;
	capabilities = {};
	constructor(e, t, { requests: n = {} } = {}) {
		super(), this.name = e, this.transport = t, this.conn = new ut((e) => t.send(e)), t.onMessage((e) => this.conn.receive(e)), t.onClose((e) => this.#e(e ?? "Il server si è chiuso")), this.conn.onNotification("textDocument/publishDiagnostics", (e) => this.emit("diagnostics", e)), this.conn.onNotification("window/logMessage", (e) => this.emit("log", e?.message)), this.conn.onNotification("window/showMessage", (e) => this.emit("log", e?.message)), this.conn.onRequest("workspace/configuration", (e) => (e?.items ?? []).map(() => null)), this.conn.onRequest("client/registerCapability", () => null), this.conn.onRequest("window/workDoneProgress/create", () => null);
		for (let [e, t] of Object.entries(n)) this.conn.onRequest(e, t);
	}
	async start() {
		try {
			await this.transport.ready;
			let e = await this.conn.request("initialize", {
				processId: null,
				clientInfo: { name: "lilOS Editor" },
				rootUri: "file:///lilos",
				workspaceFolders: [{
					uri: "file:///lilos",
					name: "lilOS"
				}],
				capabilities: {
					textDocument: {
						synchronization: { dynamicRegistration: !1 },
						completion: {
							completionItem: {
								snippetSupport: !0,
								documentationFormat: ["plaintext"]
							},
							contextSupport: !0
						},
						publishDiagnostics: { relatedInformation: !1 }
					},
					workspace: {
						configuration: !0,
						workspaceFolders: !0
					}
				}
			});
			this.capabilities = e?.capabilities ?? {}, this.conn.notify("initialized", {}), this.#t("ready");
		} catch (e) {
			this.#e(e?.message ?? String(e));
		}
		return this;
	}
	get ready() {
		return this.status === "ready";
	}
	open(e, t, n, r) {
		this.conn.notify("textDocument/didOpen", { textDocument: {
			uri: e,
			languageId: t,
			version: n,
			text: r
		} });
	}
	change(e, t, n) {
		this.conn.notify("textDocument/didChange", {
			textDocument: {
				uri: e,
				version: t
			},
			contentChanges: [{ text: n }]
		});
	}
	close(e) {
		this.conn.notify("textDocument/didClose", { textDocument: { uri: e } });
	}
	configure(e) {
		this.conn.notify("workspace/didChangeConfiguration", { settings: e });
	}
	async completion(e, t, n) {
		if (!this.ready || !this.capabilities.completionProvider) return [];
		let r = n ? {
			triggerKind: 2,
			triggerCharacter: n
		} : { triggerKind: 1 }, i = await this.conn.request("textDocument/completion", {
			textDocument: { uri: e },
			position: t,
			context: r
		});
		return Array.isArray(i) ? i : i?.items ?? [];
	}
	get triggerCharacters() {
		return this.capabilities.completionProvider?.triggerCharacters ?? [];
	}
	async stop() {
		if (this.status !== "closed") {
			try {
				this.ready && (await Promise.race([this.conn.request("shutdown"), new Promise((e) => setTimeout(e, 500))]), this.conn.notify("exit"));
			} catch {}
			this.transport.close(), this.conn.close(), this.#t("closed");
		}
	}
	#e(e) {
		this.status !== "closed" && (this.error = e, this.conn.close(e), this.#t("error"));
	}
	#t(e) {
		this.status = e, this.emit("status", e);
	}
};
function ft(e) {
	let t = {
		message: null,
		close: null
	};
	return e.onmessage = (e) => t.message?.(e.data), e.onerror = (e) => {
		e.preventDefault?.(), t.close?.(`Errore nel server: ${e.message ?? "sconosciuto"}`);
	}, {
		ready: Promise.resolve(),
		send: (t) => e.postMessage(t),
		onMessage: (e) => {
			t.message = e;
		},
		onClose: (e) => {
			t.close = e;
		},
		close: () => e.terminate()
	};
}
function pt(e) {
	let t = new WebSocket(e), n = [], r = {
		message: null,
		close: null
	}, i = new Promise((r, i) => {
		t.onopen = () => {
			n.splice(0).forEach((e) => t.send(e)), r();
		}, t.onerror = () => i(/* @__PURE__ */ Error(`Impossibile collegarsi a ${e}`));
	});
	return i.catch(() => {}), t.onmessage = (e) => {
		if (typeof e.data != "string") return;
		let t = e.data.startsWith("Content-Length") ? e.data.slice(e.data.indexOf("\r\n\r\n") + 4) : e.data;
		try {
			r.message?.(JSON.parse(t));
		} catch {}
	}, t.onclose = (e) => r.close?.(`Connessione chiusa (${e.code})`), {
		ready: i,
		send: (e) => {
			let r = JSON.stringify(e);
			t.readyState === WebSocket.OPEN ? t.send(r) : n.push(r);
		},
		onMessage: (e) => {
			r.message = e;
		},
		onClose: (e) => {
			r.close = e;
		},
		close: () => t.close()
	};
}
// src/editor/lsp/manager.js
var mt = new e(), ht = {
	json: () => new Worker(new URL(
		/* @vite-ignore */
		new URL("json.worker-B3saI9fz.js", import.meta.url).href,
		"" + import.meta.url
	), {
		type: "module",
		name: "lilos-json"
	}),
	css: () => new Worker(new URL(
		/* @vite-ignore */
		new URL("css.worker-ntRg7X_k.js", import.meta.url).href,
		"" + import.meta.url
	), {
		type: "module",
		name: "lilos-css"
	}),
	html: () => new Worker(new URL(
		/* @vite-ignore */
		new URL("html.worker-X9Fc__8d.js", import.meta.url).href,
		"" + import.meta.url
	), {
		type: "module",
		name: "lilos-html"
	})
}, K = /* @__PURE__ */ new Map(), q = (e) => "file:///lilos" + o.path(e).split("/").map(encodeURIComponent).join("/");
function gt(e) {
	let t = P.get("external").find((t) => t.lang === e.id);
	return t ? {
		key: `ws:${t.url}`,
		label: `Server esterno (${t.url})`,
		make: () => pt(t.url)
	} : e.server && P.get("builtin")[e.server] ? {
		key: `builtin:${e.server}`,
		label: `Server ${e.server.toUpperCase()} (nel browser)`,
		make: () => ft(ht[e.server]())
	} : null;
}
function _t(e) {
	let t = gt(e);
	if (!t) return null;
	let n = K.get(t.key);
	if (n && n.status !== "error" && n.status !== "closed") return n.started;
	let r = new dt(t.label, t.make(), { requests: { "lilos/schemaContent": ({ uri: e }) => bt(e) } });
	return r.started = r.start().then((e) => (e.ready && e.configure(yt()), e)), K.set(t.key, r), r.started;
}
function vt(e) {
	return e?.type === "file" && o.exists(e.id) ? q(e.id) : e?.type === "url" && N(e.url) ? e.url : null;
}
function yt() {
	let e = [];
	for (let [t, n] of Object.entries(P.get("schemas"))) {
		let r = vt(n);
		r && o.exists(t) && e.push({
			uri: r,
			fileMatch: [q(t)]
		});
	}
	return { json: { schemas: e } };
}
async function bt(e) {
	if (e.startsWith("file:///lilos/")) {
		let t = decodeURIComponent(e.slice(13)), n = o.resolve(t);
		if (!n || n.type !== "file") throw Error(`Schema non trovato: ${t}`);
		return o.read(n.id);
	}
	if (!N(e)) throw Error(`Indirizzo dello schema non valido: ${e}`);
	let t = await fetch(e, { credentials: "omit" });
	if (!t.ok) throw Error(`Impossibile scaricare lo schema (${t.status})`);
	return t.text();
}
function xt() {
	for (let e of K.values()) e.ready && e.configure(yt());
}
P.on("change", async (e) => {
	if (e === "schemas") return xt();
	if (e !== "builtin" && e !== "external") return;
	let t = /* @__PURE__ */ new Set();
	for (let e of P.get("external")) t.add(`ws:${e.url}`);
	for (let [e, n] of Object.entries(P.get("builtin"))) n && t.add(`builtin:${e}`);
	for (let [e, n] of K) t.has(e) || (K.delete(e), n.started.then((e) => e.stop()).catch(() => {}));
	mt.emit("changed");
}), o.on("change", (e) => {
	let t = new Set(Object.values(P.get("schemas")).filter((e) => e.type === "file").map((e) => e.id)), n = new Set(Object.keys(P.get("schemas")));
	(t.has(e.node.id) || n.has(e.node.id) || e.ids?.some((e) => t.has(e) || n.has(e))) && xt();
});
// src/editor/lsp/convert.js
function St(e, t) {
	let n = 0, r = 0;
	for (let i = e.indexOf("\n"); i !== -1 && i < t; i = e.indexOf("\n", i + 1)) n++, r = i + 1;
	return {
		line: n,
		character: t - r
	};
}
function J(e, { line: t, character: n }) {
	let r = 0;
	for (let n = 0; n < t; n++) {
		let t = e.indexOf("\n", r);
		if (t === -1) return e.length;
		r = t + 1;
	}
	let i = e.indexOf("\n", r);
	return Math.min(r + n, i === -1 ? e.length : i);
}
function Ct(e) {
	let t = "", n = -1, r = Infinity, i = 0;
	for (let a of e.matchAll(/\\([$}\\])|\$(\d+)|\$\{(\d+)(?::((?:[^}\\]|\\.)*))?\}|\$\{(\d+)\|([^|]*)\|\}/g)) {
		if (t += e.slice(i, a.index), i = a.index + a[0].length, a[1]) {
			t += a[1];
			continue;
		}
		let o = Number(a[2] ?? a[3] ?? a[5]), s = a[4] === void 0 ? a[6] === void 0 ? "" : a[6].split(",")[0] : a[4].replace(/\\(.)/g, "$1"), c = o === 0 ? 2 ** 53 - 1 : o;
		c < r && (r = c, n = t.length), t += s;
	}
	return {
		text: t + e.slice(i),
		caret: n
	};
}
var wt = {
	1: "abc",
	2: "fn",
	3: "fn",
	4: "fn",
	5: "pr",
	6: "abc",
	7: "ty",
	8: "ty",
	9: "ty",
	10: "pr",
	11: "val",
	12: "val",
	13: "val",
	14: "kw",
	15: "snip",
	16: "val",
	17: "abc",
	18: "abc",
	19: "abc",
	20: "val",
	21: "val",
	22: "ty",
	23: "fn",
	24: "kw",
	25: "ty"
}, Tt = {
	1: "testo",
	2: "metodo",
	3: "funzione",
	4: "costruttore",
	5: "campo",
	6: "variabile",
	7: "classe",
	8: "interfaccia",
	9: "modulo",
	10: "proprietà",
	11: "unità",
	12: "valore",
	13: "enumerazione",
	14: "parola chiave",
	15: "snippet",
	16: "colore",
	17: "file",
	18: "riferimento",
	19: "cartella",
	20: "valore",
	21: "costante",
	22: "struttura",
	23: "evento",
	24: "operatore",
	25: "tipo"
}, Et = (e, t) => {
	let n = t;
	for (; n > 0 && /[\w$@#.-]/.test(e[n - 1]);) n--;
	return n;
};
function Dt(e, t, n) {
	if (!e.length) return null;
	let r = Et(t, n), i = e.map((e) => {
		let i = e.textEdit, a = i?.range ?? i?.insert ?? null, o = a ? Math.min(J(t, a.start), n) : r, s = a ? Math.max(n, J(t, i.range?.end ?? i.replace?.end ?? a.end)) : n, c = i?.newText ?? e.insertText ?? e.label, { text: l, caret: u } = e.insertTextFormat === 2 ? Ct(c) : {
			text: c,
			caret: -1
		};
		return {
			label: e.label,
			insert: l,
			caret: u,
			from: o,
			to: s,
			kind: wt[e.kind] ?? "abc",
			detail: e.detail || Tt[e.kind] || "",
			filter: e.filterText ?? e.label,
			sort: e.sortText ?? e.label
		};
	}).sort((e, t) => e.sort < t.sort ? -1 : +(e.sort > t.sort)), a = i[0].from, o = He(i, t.slice(a, n));
	return o.length ? {
		from: a,
		items: o
	} : null;
}
// src/editor/EditorSettings.js
var Ot = "editor-settings", Y = null;
function kt(e) {
	if (Y?.el.isConnected) return e(Y, Ot);
	let n = [], r = () => l.view.render(), a = async () => {
		let t = await _(e, {
			title: "Aggiungi una grammatica TextMate",
			exts: ["json"],
			text: "Scegli un file .tmLanguage.json: deve contenere \"scopeName\" e \"patterns\"; \"fileTypes\" indica le estensioni."
		});
		t && (P.set("grammars", [...P.get("grammars"), t.id]), nt(), n = await H(), r());
	}, c = async (e) => {
		P.set("grammars", P.get("grammars").filter((t) => t !== e)), nt(), n = await H(), r();
	}, l = new t({
		title: "Impostazioni dell’Editor",
		icon: "code",
		width: 720,
		height: 520,
		tabs: [
			{
				id: "highlight",
				label: "Evidenziazione",
				icon: "palette",
				description: "Con quale motore colorare ogni linguaggio, e grammatiche in più.",
				sections: () => [{
					title: "Motore per linguaggio",
					rows: R().map((e) => ({
						label: e.label,
						description: e.custom ? `Grammatica aggiunta · .${e.exts.join(", .") || "—"}` : `.${e.exts.filter(Boolean).join(", .") || "txt"}`,
						keywords: "evidenziazione colori tree-sitter textmate",
						control: d({
							value: V(e),
							label: `Motore per ${e.label}`,
							options: qe(e).map((e) => ({
								value: e,
								label: I[e]
							})),
							onChange: (t) => P.setEntry("engines", e.id, t)
						})
					}))
				}, {
					title: "Grammatiche TextMate aggiunte",
					rows: [
						...R().filter((e) => e.custom).map((e) => ({
							label: e.label,
							description: `${o.get(e.fileId) ? o.path(e.fileId) : "file eliminato"} · ${e.textmate.grammar.scopeName}`,
							control: i({
								label: "Rimuovi",
								onClick: () => c(e.fileId)
							})
						})),
						...n.map((e) => ({
							label: e.name ?? "Grammatica",
							description: `Non caricata: ${e.error}`,
							control: i({
								label: "Rimuovi",
								onClick: () => c(e.fileId)
							})
						})),
						{
							label: "Aggiungi una grammatica",
							description: "Un file .tmLanguage.json di lilOS (il formato di VS Code, Sublime Text, Shiki)",
							control: i({
								label: "Scegli file…",
								onClick: a
							})
						}
					]
				}]
			},
			{
				id: "servers",
				label: "Language server",
				icon: "code",
				description: "Server che suggeriscono il codice e segnalano gli errori (Language Server Protocol).",
				sections: () => {
					let e = P.get("builtin"), t = P.get("external"), n = d({
						value: "typescript",
						label: "Linguaggio",
						options: R().map((e) => ({
							value: e.id,
							label: e.label
						}))
					}), a = ne({
						placeholder: "ws://localhost:3000/typescript",
						label: "Indirizzo WebSocket"
					}), o = s("small", { class: "es-note" }), c = i({
						label: "Aggiungi",
						onClick: () => {
							let e = a.value.trim();
							/^wss?:\/\/.+/.test(e) ? (P.set("external", [...t.filter((e) => e.lang !== n.value), {
								lang: n.value,
								url: e
							}]), r()) : o.textContent = "Serve un indirizzo ws:// o wss://";
						}
					});
					return [{
						title: "Nel browser",
						rows: [
							[
								"json",
								"JSON",
								"Completamento, errori, schemi JSON"
							],
							[
								"css",
								"CSS",
								"Completamento ed errori"
							],
							[
								"html",
								"HTML",
								"Completamento di tag, attributi e valori"
							]
						].map(([t, n, r]) => ({
							label: n,
							description: r,
							keywords: "language server lsp",
							control: re({
								value: e[t],
								onChange: (e) => P.setEntry("builtin", t, e)
							})
						}))
					}, {
						title: "Server esterni (WebSocket)",
						rows: [...t.map((e) => ({
							label: R().find((t) => t.id === e.lang)?.label ?? e.lang,
							description: e.url,
							control: i({
								label: "Rimuovi",
								onClick: () => {
									P.set("external", t.filter((t) => t !== e)), r();
								}
							})
						})), {
							label: "Aggiungi un server",
							description: "Un Language Server raggiungibile via WebSocket (per esempio avviato con un ponte come lsp-ws-proxy). Ha la precedenza su quello nel browser.",
							control: s("div", { class: "es-add" }, n, a, c, o)
						}]
					}];
				}
			},
			{
				id: "schemas",
				label: "Schemi JSON",
				icon: "file",
				description: "Gli schemi che descrivono i file JSON.",
				sections: () => {
					let e = Object.entries(P.get("schemas")).filter(([e]) => o.exists(e));
					return [{
						title: "Schemi associati ai file",
						rows: e.length ? e.map(([e, t]) => ({
							label: o.path(e),
							description: t.type === "url" ? t.url : (o.exists(t.id) ? o.path(t.id) : "file dello schema eliminato") + (vt(t) ? "" : " · non disponibile"),
							control: i({
								label: "Rimuovi",
								onClick: () => {
									P.setEntry("schemas", e, void 0), r();
								}
							})
						})) : [{
							label: "Nessuno schema associato",
							description: "Si sceglie dall’Editor con un file JSON aperto (pulsante Schema). Vale anche \"$schema\" scritto nel file."
						}]
					}];
				}
			}
		]
	});
	return Y = l, l.on("destroy", () => {
		Y === l && (Y = null);
	}), H().then((e) => {
		n = e, r();
	}), e(l, Ot);
}
// src/editor/FileTree.js
var X = "editor-tree", Z = 160, At = 240, jt = class extends e {
	root = null;
	history = new n();
	collapsed = !1;
	width = At;
	#e = /* @__PURE__ */ new Set();
	#t = null;
	#n = null;
	#r = null;
	#i = !1;
	#a = "";
	constructor({ win: e, openWindow: t }) {
		super(), this.win = e, this.openWindow = t;
		let { signal: n } = e;
		this.title = s("span", { class: "ft-title" }), this.rootIcon = s("span", { class: "ft-icon folder" }, l("folder"));
		let r = (e, t, n) => s("button", {
			class: "ft-btn",
			type: "button",
			title: t,
			"aria-label": t,
			onclick: n
		}, l(e));
		this.tree = s("div", {
			class: "ft-tree",
			role: "tree",
			tabindex: "0",
			"aria-label": "Contenuto della cartella"
		}), this.note = s("div", {
			class: "ft-note",
			role: "status",
			"aria-live": "polite"
		}), this.split = s("div", {
			class: "ft-split",
			role: "separator",
			tabindex: "0",
			"aria-orientation": "vertical",
			"aria-label": "Larghezza del pannello della cartella",
			"aria-valuemin": Z
		}), this.el = s("aside", {
			class: "ft",
			"aria-label": "Cartella aperta"
		}, this.split, s("div", { class: "ft-head" }, this.rootIcon, this.title, r("filePlus", "Nuovo file", () => this.create("file", this.#m())), r("folderPlus", "Nuova cartella", () => this.create("folder", this.#m())), r("x", "Chiudi la cartella", () => this.setRoot(null))), this.tree, this.note), this.#u(n);
		let i = o.on("change", (e) => this.#y(e)), a = o.on("scope", () => this.render()), u = oe({
			isActive: () => e.active && this.tree.contains(document.activeElement) && !this.#r,
			selectionSize: () => +!!this.#t,
			open: () => this.#d(this.#t),
			rename: () => this.rename(this.#t),
			remove: () => this.remove(this.#t),
			selectAll: () => {},
			deselect: () => this.#f(null)
		}), d = c.attach(this.el, this.history);
		e.on("destroy", () => {
			i(), a(), u(), d();
		});
		let f = m.get(X, {});
		Number.isFinite(f?.width) && (this.width = f.width), Array.isArray(f?.expanded) && f.expanded.filter((e) => typeof e == "string").forEach((e) => this.#e.add(e));
	}
	setRoot(e) {
		let t = e && o.get(e);
		this.root = t?.type === "folder" ? e : null, this.root && (this.collapsed = !1), this.#t = null, this.#r = null, this.#a = "", this.#v(), this.render(), this.emit("root", this.root);
	}
	static savedRoot() {
		let e = m.get(X, {})?.root;
		return typeof e == "string" && o.get(e)?.type === "folder" ? e : null;
	}
	setCollapsed(e) {
		this.collapsed = !!e, this.render(), this.emit("layout");
	}
	resize(e, t = !0) {
		let n = this.el.parentElement?.clientWidth || 800;
		this.width = Math.round(Math.max(Z, Math.min(e, Math.max(Z, n * .6)))), this.el.style.width = `${this.width}px`, this.split.setAttribute("aria-valuenow", this.width), this.split.setAttribute("aria-valuemax", Math.round(Math.max(Z, n * .6))), t && this.#v();
	}
	setCurrent(e) {
		if (e !== this.#n) {
			if (this.#n = e, e && this.root && o.isInside(e, this.root)) for (let t of o.ancestors(e)) t.id !== e && o.isInside(t.id, this.root) && t.id !== this.root && this.#e.add(t.id);
			this.render();
		}
	}
	create(e, t = this.root) {
		if (!this.root || !this.#h(t)) return;
		let n = o.create(t, {
			type: e,
			name: e === "folder" ? "Nuova cartella" : "nuovo.txt"
		});
		t !== this.root && this.#e.add(t), this.#f(n.id), this.rename(n.id, !0);
	}
	rename(e, t = !1) {
		if (!e || e === this.root || !o.exists(e) || o.get(e).system) return;
		this.#r = e, this.#i = t, this.render();
		let n = this.tree.querySelector(".ft-rename");
		if (!n) return;
		n.focus();
		let r = o.get(e).name, i = o.get(e).type === "file" ? r.lastIndexOf(".") : -1;
		n.setSelectionRange(0, i > 0 ? i : r.length);
		let a = !1, s = (t) => {
			if (a) return;
			a = !0, this.#r = null;
			let i = n.value.replace(/\s+/g, " ").trim(), s = this.#i;
			if (t && i && i !== r && o.exists(e)) try {
				he(s ? null : this.history, e, i);
			} catch (e) {
				this.#g(e.message);
			}
			s && me(this.history, e);
			let c = s && o.get(e)?.type === "file";
			this.render(), this.tree.focus(), c && this.emit("open", e);
		};
		n.addEventListener("keydown", (e) => {
			e.stopPropagation(), e.key === "Enter" && (e.preventDefault(), s(!0)), e.key === "Escape" && (e.preventDefault(), s(!1));
		}), n.addEventListener("blur", () => s(!0));
	}
	remove(e) {
		if (!e || e === this.root || !o.exists(e)) return;
		let t = this.#l(e)?.getBoundingClientRect();
		se([e], t ? t.left + 24 : innerWidth / 2, t ? t.bottom : innerHeight / 2, this.history, { then: () => this.tree.focus() });
	}
	move(e, t) {
		if (e && e !== this.root && this.#h(t)) try {
			t !== this.root && this.#e.add(t), pe(this.history, e, t), this.#v(), this.#f(e);
		} catch (e) {
			this.#g(e.message);
		}
	}
	async moveTo(e) {
		let t = o.get(e);
		if (!t || e === this.root) return;
		let n = await _(this.openWindow, {
			kind: "folder",
			within: this.root,
			exclude: e,
			title: `Sposta «${t.name}»`,
			text: `Scegli la cartella, dentro «${o.get(this.root).name}», in cui spostarlo.`
		});
		n && this.move(e, n.id);
	}
	render() {
		let e = this.root && o.get(this.root);
		if (this.el.hidden = !e || this.collapsed, !e) return this.tree.replaceChildren();
		this.resize(this.width, !1), this.title.textContent = e.id === o.root ? "Home" : e.name, this.title.title = o.path(e.id), this.rootIcon.style.color = e.color ?? ae;
		let t = [], n = (e, r) => {
			for (let i of this.#s(o.children(e))) t.push(this.#o(i, r)), i.type === "folder" && this.#e.has(i.id) && n(i.id, r + 1);
		};
		n(e.id, 0), this.tree.replaceChildren(...t.length ? t : [s("div", { class: "ft-empty" }, "Cartella vuota")]), this.tree.setAttribute("aria-activedescendant", this.#t && this.#l(this.#t) ? `ft-${this.#t}` : ""), this.note.textContent = this.#a;
	}
	#o(e, t) {
		let n = e.type === "folder", r = n && this.#e.has(e.id), i = this.#r === e.id ? s("input", {
			class: "ft-rename",
			type: "text",
			value: e.name,
			spellcheck: "false",
			"aria-label": "Nuovo nome"
		}) : s("span", { class: "ft-name" }, e.name), o = n ? s("span", {
			class: "ft-icon folder",
			style: { color: e.color ?? ae }
		}, l("folder")) : s("span", {
			class: "ft-icon file",
			style: { background: a(e.name).color }
		});
		return fe(s("div", {
			class: [
				"ft-row",
				e.id === this.#t && "selected",
				e.id === this.#n && "current"
			].filter(Boolean).join(" "),
			id: `ft-${e.id}`,
			role: "treeitem",
			"aria-level": t + 1,
			"aria-selected": String(e.id === this.#t),
			"aria-expanded": n ? String(r) : null,
			dataset: { id: e.id },
			style: { paddingLeft: `${6 + t * 14}px` }
		}, s("span", {
			class: "ft-twisty",
			"aria-hidden": "true"
		}, n ? r ? "▾" : "▸" : ""), o, i), e);
	}
	#s(e) {
		return [...e].sort((e, t) => e.type === "folder" == (t.type === "folder") ? e.name.localeCompare(t.name, f.locale, { numeric: !0 }) : e.type === "folder" ? -1 : 1);
	}
	#c() {
		return [...this.tree.querySelectorAll(".ft-row")].map((e) => e.dataset.id);
	}
	#l(e) {
		return this.tree.querySelector(`#ft-${CSS.escape(e)}`);
	}
	#u(e) {
		let t = (e) => e.target.closest?.(".ft-row");
		this.split.addEventListener("pointerdown", (e) => {
			if (e.button !== 0) return;
			e.preventDefault();
			let t = this.width;
			this.el.classList.add("resizing"), ie(e, {
				threshold: 0,
				onMove: (e) => this.resize(t - e, !1),
				onEnd: () => {
					this.el.classList.remove("resizing"), this.#v();
				}
			});
		}, { signal: e }), this.split.addEventListener("dblclick", () => this.resize(At), { signal: e }), this.split.addEventListener("keydown", (e) => {
			let t = e.shiftKey ? 48 : 16, n = {
				ArrowLeft: this.width + t,
				ArrowRight: this.width - t,
				Home: Z,
				End: Infinity
			}[e.key];
			n !== void 0 && (e.preventDefault(), this.resize(n));
		}, { signal: e }), this.tree.addEventListener("click", (e) => {
			if (e.target.closest(".ft-rename")) return;
			let n = t(e);
			if (!n) return this.#f(null);
			let r = o.get(n.dataset.id);
			if (r?.type === "file" && e.detail === 2) return this.emit("open", r.id);
			this.#f(r.id), r?.type === "folder" && e.detail === 1 && this.#p(r.id);
		}, { signal: e }), this.tree.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			let n = t(e)?.dataset.id ?? null;
			n && this.#f(n);
			let r = n && o.get(n), i = r?.type === "folder" ? r.id : r ? r.parent : this.root;
			u(e.clientX, e.clientY, [
				r?.type === "file" && {
					label: "Apri",
					icon: "open",
					shortcut: p.label("items.open"),
					action: () => this.emit("open", n)
				},
				{
					label: "Nuovo file",
					icon: "filePlus",
					action: () => this.create("file", i)
				},
				{
					label: "Nuova cartella",
					icon: "folderPlus",
					action: () => this.create("folder", i)
				},
				...r ? [
					"-",
					{
						label: "Rinomina",
						icon: "pencil",
						shortcut: p.label("items.rename"),
						disabled: r.system,
						action: () => this.rename(n)
					},
					{
						label: "Sposta in…",
						icon: "arrowRight",
						disabled: r.system,
						action: () => this.moveTo(n)
					},
					de([n]),
					"-",
					{
						label: "Elimina",
						icon: "trash",
						shortcut: p.label("items.delete"),
						danger: !0,
						disabled: r.system,
						action: () => this.remove(n)
					}
				] : []
			].filter(Boolean));
		}, { signal: e }), le(this.tree, {
			folder: (e) => {
				let t = o.get(e?.closest?.(".ft-row")?.dataset.id);
				return t ? t.parent : this.root;
			},
			highlight: (e) => e === this.root ? this.tree : this.#l(e)
		}), this.tree.addEventListener("pointerdown", (e) => {
			let n = t(e);
			if (e.button !== 0 || !n || e.target.closest(".ft-rename")) return;
			let r = n.dataset.id;
			o.get(r)?.system || ce(e, {
				ids: [r],
				stack: this.history,
				onMove: () => n.classList.add("dragging"),
				onEnd: () => {
					n.classList.remove("dragging");
				}
			});
		}, { signal: e }), this.tree.addEventListener("keydown", (e) => {
			if (e.target !== this.tree) return;
			let t = this.#c(), n = t.indexOf(this.#t), r = this.#t && o.get(this.#t), i = (n) => {
				t[n] && (e.preventDefault(), this.#f(t[n]));
			};
			e.key === "ArrowDown" ? i(n < 0 ? 0 : Math.min(t.length - 1, n + 1)) : e.key === "ArrowUp" ? i(n < 0 ? 0 : Math.max(0, n - 1)) : e.key === "Home" ? i(0) : e.key === "End" ? i(t.length - 1) : e.key === "ArrowRight" && r?.type === "folder" ? (e.preventDefault(), this.#e.has(r.id) ? i(n + 1) : this.#p(r.id)) : e.key === "ArrowLeft" && r && (e.preventDefault(), r.type === "folder" && this.#e.has(r.id) ? this.#p(r.id) : r.parent !== this.root && this.#f(r.parent));
		}, { signal: e });
	}
	#d(e) {
		let t = e && o.get(e);
		t && (t.type === "file" ? this.emit("open", e) : this.#p(e));
	}
	#f(e) {
		this.#t = e;
		for (let t of this.tree.querySelectorAll(".ft-row")) {
			let n = t.dataset.id === e;
			t.classList.toggle("selected", n), t.setAttribute("aria-selected", String(n));
		}
		this.tree.setAttribute("aria-activedescendant", e && this.#l(e) ? `ft-${e}` : ""), this.#l(e)?.scrollIntoView({ block: "nearest" });
	}
	#p(e) {
		this.#e.has(e) ? this.#e.delete(e) : this.#e.add(e), this.#v(), this.render();
	}
	#m() {
		let e = this.#t && o.get(this.#t);
		return e ? e.type === "folder" ? e.id : e.parent : this.root;
	}
	#h(e) {
		return !!this.root && !!e && o.exists(e) && o.isInside(e, this.root);
	}
	#g(e) {
		this.#a = e, this.render(), clearTimeout(this.#_), this.#_ = setTimeout(() => {
			this.#a = "", this.note.textContent = "";
		}, 5e3);
	}
	#_ = 0;
	#v() {
		m.set(X, {
			root: this.root,
			expanded: [...this.#e].filter((e) => o.exists(e)).slice(0, 500),
			width: this.width
		});
	}
	#y(e) {
		this.root && (e.type === "remove" && e.ids.includes(this.root) ? this.setRoot(null) : (e.type === "remove" && e.ids.includes(this.#t) && (this.#t = null), this.#r && o.exists(this.#r) || ([
			e.node.id,
			e.parent,
			e.from
		].some((e) => e && (e === this.root || o.exists(e) && o.isInside(e, this.root))) || e.type === "remove") && this.render()));
	}
}, Mt = "  ", Nt = 3e5, Pt = 1e5, Q = "Senza titolo.txt", Ft = {
	kw: "kw",
	fn: "ƒ",
	pr: "pr",
	val: "val",
	tag: "<>",
	attr: "=",
	abc: "abc",
	ty: "T",
	snip: "{}"
}, It = { shell: "shellscript" }, Lt = {
	1: "errore",
	2: "avviso",
	3: "informazione",
	4: "suggerimento"
}, Rt = H();
function zt({ args: e, openWindow: t } = {}) {
	let n = new r({
		title: "Senza titolo",
		subtitle: "Editor",
		icon: "code",
		width: 780,
		height: 520,
		minWidth: 460,
		minHeight: 280
	}), i = new Ht(n, t), a = e && "folder" in e ? e.folder : jt.savedRoot();
	return i.tree.setRoot(a && o.get(a)?.type === "folder" ? a : null), e?.file && o.exists(e.file) ? i.open(e.file) : i.newDocument(), n.on("launch", (e) => {
		e?.folder && o.get(e.folder)?.type === "folder" && i.tree.setRoot(e.folder), e?.file && o.exists(e.file) && i.open(e.file);
	}), n.canClose = () => i.confirmDiscard(), n.getState = () => ({
		file: i.fileId,
		folder: i.tree.root,
		...i.tree.collapsed && { sidebar: !1 }
	}), e?.sidebar === !1 && i.tree.root && i.tree.setCollapsed(!0), n;
}
var Bt = (e, t) => {
	let n = 1;
	for (let r = e.indexOf("\n"); r !== -1 && r < t; r = e.indexOf("\n", r + 1)) n++;
	return n;
}, $ = (e, t) => {
	let n = document.createTreeWalker(e, NodeFilter.SHOW_TEXT), r, i = null;
	for (; r = n.nextNode();) {
		if (t <= r.length) return [r, t];
		t -= r.length, i = r;
	}
	return i ? [i, i.length] : [e, 0];
}, Vt = (e, t) => Promise.race([e, new Promise((e, n) => setTimeout(() => n(/* @__PURE__ */ Error("timeout")), t))]), Ht = class {
	fileId = null;
	name = Q;
	#e = "";
	#t = null;
	#n = "text";
	#r = !1;
	#i = 0;
	#a = 0;
	#o = "";
	#s = "";
	#c = null;
	#l = "";
	#u = "";
	#d = null;
	#f = null;
	#p = null;
	#m = "";
	#h = 0;
	#g = [];
	#_ = h();
	#v = null;
	#y = 0;
	#b = !1;
	constructor(e, t) {
		this.win = e, this.openWindow = t ?? (() => {});
		let { signal: n } = e, r = (e, t, n) => s("button", {
			class: "ed-btn",
			type: "button",
			title: t,
			"aria-label": t,
			onclick: n
		}, l(e));
		this.revealBtn = r("folder", "Mostra nella cartella", () => this.reveal()), this.schemaBtn = s("button", {
			class: "ed-schema",
			type: "button",
			onclick: () => this.#B()
		}), this.langSelect = d({
			value: "text",
			label: "Linguaggio",
			options: [],
			onChange: (e) => this.#j(e, !0)
		}), this.langSelect.classList.add("ed-lang"), this.#k(), this.banner = s("div", {
			class: "ed-banner",
			role: "alertdialog",
			hidden: !0
		}), this.gutter = s("div", {
			class: "ed-gutter",
			"aria-hidden": "true"
		}), this.current = s("div", {
			class: "ed-current",
			"aria-hidden": "true"
		}), this.code = s("pre", {
			class: "ed-hl",
			"aria-hidden": "true"
		}), this.squiggles = s("div", {
			class: "ed-diags",
			"aria-hidden": "true"
		}), this.input = s("textarea", {
			class: "ed-input",
			wrap: "soft",
			spellcheck: "false",
			autocapitalize: "off",
			autocomplete: "off",
			"aria-label": "Testo del documento",
			"aria-autocomplete": "list",
			"aria-expanded": "false"
		}), this.suggestions = s("div", {
			class: "ed-complete",
			role: "listbox",
			id: `ed-complete-${h()}`,
			"aria-label": "Suggerimenti",
			hidden: !0
		}), this.input.setAttribute("aria-controls", this.suggestions.id), this.suggestions.addEventListener("pointerdown", (e) => {
			e.preventDefault();
			let t = e.target.closest("[data-index]");
			t && this.#q(Number(t.dataset.index));
		}, { signal: n }), this.suggestions.addEventListener("pointermove", (e) => {
			let t = e.target.closest("[data-index]");
			t && this.#v && Number(t.dataset.index) !== this.#v.index && this.#K(Number(t.dataset.index));
		}, { signal: n }), this.position = s("span"), this.info = s("button", {
			class: "ed-info",
			type: "button",
			title: "Impostazioni dell’Editor",
			onclick: () => kt(this.openWindow)
		}), this.state = s("span", { class: "ed-state" }), this.tree = new jt({
			win: e,
			openWindow: this.openWindow
		}), this.tree.on("open", (e) => this.open(e)), this.tree.on("root", () => this.#S()), this.tree.on("layout", () => this.#S()), this.sidebarBtn = r("sidebar", "Mostra la cartella", () => this.toggleSidebar()), e.body.append(s("div", { class: "ed-toolbar" }, r("filePlus", "Nuovo documento", () => this.newDocument()), r("open", "Apri un file…", () => this.openFile()), r("folderOpen", "Apri una cartella…", () => this.openFolder()), r("save", "Salva", () => this.save()), this.revealBtn, s("span", { class: "ed-grow" }), this.schemaBtn, this.langSelect, r("gear", "Impostazioni dell’Editor", () => kt(this.openWindow)), this.sidebarBtn), this.banner, s("div", { class: "ed-main" }, s("div", { class: "ed" }, this.gutter, s("div", { class: "ed-area" }, this.current, this.code, this.squiggles, this.input, this.suggestions)), this.tree.el), s("div", { class: "ed-status" }, this.position, this.info, this.state)), this.input.addEventListener("input", (e) => this.#Y(e), { signal: n }), this.input.addEventListener("keydown", (e) => this.#ee(e), { signal: n }), this.input.addEventListener("scroll", () => {
			this.#O(), this.#G();
		}, { signal: n }), this.input.addEventListener("blur", () => this.#G(), { signal: n }), this.input.addEventListener("pointerdown", () => this.#G(), { signal: n });
		for (let e of [
			"keyup",
			"pointerup",
			"select",
			"focus"
		]) this.input.addEventListener(e, () => this.#D(), { signal: n });
		addEventListener("beforeunload", (e) => {
			this.dirty && e.preventDefault();
		}, { signal: n });
		let i = [
			o.on("change", (e) => this.#te(e)),
			o.on("scope", () => {
				this.fileId && o.exists(this.fileId) && this.render();
			}),
			P.on("change", (e) => {
				e === "engines" && (this.#M(), this.render()), e === "schemas" && this.render();
			}),
			mt.on("changed", () => this.#N()),
			ee.on("change:theme", () => this.#C()),
			Ke.on("change", () => {
				this.#k(), this.#r ? this.#M() : this.#j(B(this.name));
			}),
			g("editor.save", {
				isActive: () => e.active,
				run: () => this.save()
			}),
			g("editor.new", {
				isActive: () => e.active,
				run: () => this.newDocument()
			}),
			g("editor.openFile", {
				isActive: () => e.active,
				run: () => this.openFile()
			}),
			g("editor.openFolder", {
				isActive: () => e.active,
				run: () => this.openFolder()
			}),
			g("editor.sidebar", {
				isActive: () => e.active,
				run: () => this.toggleSidebar()
			}),
			g("editor.complete", {
				isActive: () => e.active && document.activeElement === this.input,
				run: () => this.#W(!0)
			}),
			c.attach(this.input, {
				text: !0,
				undo: () => this.#x("undo"),
				redo: () => this.#x("redo")
			})
		];
		e.on("destroy", () => {
			i.forEach((e) => e()), this.#P(), cancelAnimationFrame(this.#a);
		});
		let a = new ResizeObserver(() => {
			this.tree.el.hidden || this.tree.resize(this.tree.width, !1);
		});
		a.observe(e.body);
		let u = new ResizeObserver(() => this.#w());
		u.observe(this.input), e.on("destroy", () => {
			a.disconnect(), u.disconnect();
		});
	}
	#x(e) {
		return this.#G(), this.input.focus(), document.execCommand(e) ? "" : null;
	}
	get dirty() {
		return this.input.value !== this.#e;
	}
	get text() {
		return this.input.value;
	}
	async open(e) {
		if (e === this.fileId) return;
		let t = o.get(e);
		if (!t || t.type !== "file" || !await this.confirmDiscard(`prima di aprire «${t.name}»`)) return;
		let [n] = await Promise.all([o.read(e), Rt]);
		this.#X(e, t.name, n);
	}
	async newDocument() {
		await this.confirmDiscard() && (this.#_ = h(), this.#X(null, Q, ""));
	}
	async openFile() {
		let e = await _(this.openWindow, { title: "Apri un file" });
		e && this.open(e.id);
	}
	async openFolder() {
		let e = await _(this.openWindow, {
			kind: "folder",
			title: "Apri una cartella",
			text: "La cartella compare a destra: lì puoi creare, rinominare, spostare ed eliminare file e cartelle."
		});
		e && (this.tree.setRoot(e.id), this.tree.tree.focus());
	}
	toggleSidebar() {
		if (!this.tree.root) return this.openFolder();
		this.tree.setCollapsed(!this.tree.collapsed), this.tree.collapsed || this.tree.tree.focus();
	}
	async save() {
		let e = !this.fileId || !o.exists(this.fileId);
		if (e) {
			let e = (this.tree.root && o.get(this.tree.root)) ?? o.resolve("/Documenti") ?? o.get(o.root), t = o.create(e.id, {
				type: "file",
				name: this.name
			});
			this.fileId = t.id, this.name = t.name, this.#o = `Salvato in ${o.path(t.id)}`;
		} else this.#o = "";
		let t = this.text;
		return await o.write(this.fileId, t), this.#e = t, e && this.#N(), this.tree.setCurrent(this.fileId), this.render(), !0;
	}
	reveal() {
		let e = this.fileId && o.get(this.fileId);
		e && ue("files", { folder: e.parent });
	}
	confirmDiscard(e = "") {
		return this.dirty ? new Promise((t) => {
			let n = async (e) => {
				this.#U(), t(e === "save" ? await this.save() : e === "discard"), e === "cancel" && this.input.focus();
			};
			this.#H([
				l("help"),
				s("span", { class: "ed-banner-text" }, `Le modifiche a «${this.#Z()}» non sono salvate${e ? ` (${e})` : ""}.`),
				i({
					label: "Salva",
					primary: !0,
					onClick: () => n("save")
				}),
				i({
					label: "Non salvare",
					danger: !0,
					onClick: () => n("discard")
				}),
				i({
					label: "Annulla",
					onClick: () => n("cancel")
				})
			], () => n("cancel"));
		}) : Promise.resolve(!0);
	}
	render() {
		let e = this.fileId && o.get(this.fileId);
		this.win.setTitle(`${this.#Z()}${this.dirty ? " •" : ""}`, "Editor"), this.revealBtn.disabled = !e, this.langSelect.value = this.#n, this.#z(), this.#s = this.#o || (this.dirty ? "Modificato" : e ? `Salvato · ${o.path(e.id)}` : "Nuovo documento"), this.state.classList.toggle("dirty", this.dirty), this.#C(), this.#E();
	}
	#S() {
		let e = this.tree.root ? this.tree.collapsed ? "Mostra la cartella" : "Nascondi la cartella" : "Apri una cartella…";
		this.sidebarBtn.title = e, this.sidebarBtn.setAttribute("aria-label", e), this.sidebarBtn.setAttribute("aria-pressed", String(!!this.tree.root && !this.tree.collapsed));
	}
	#C() {
		let e = this.text, t = z(this.#n), n = this.#c ?? this.#A(t);
		n.engine === "textmate" && e.length > Pt && (n = this.#A(t));
		let r;
		try {
			r = e.length > Nt ? [[null, e]] : n.tokenize(e);
		} catch (n) {
			this.#u = n.message, r = this.#A(t).tokenize(e);
		}
		let i = s("div", {}), a = [i];
		for (let [e, t, n, o] of r) t.split("\n").forEach((t, r) => {
			if (r && a.push(i = s("div", {})), t) {
				if (e) i.append(s("span", { class: `tk-${e}` }, t));
				else if (n || o) {
					let e = s("span", {}, t);
					n && (e.style.color = n), o & W.ITALIC && (e.style.fontStyle = "italic"), o & W.BOLD && (e.style.fontWeight = "700"), o & W.UNDERLINE && (e.style.textDecoration = "underline"), i.append(e);
				} else i.append(t);
			}
		});
		this.code.replaceChildren(...a);
		let o = e.split("\n").length;
		o !== this.#i && (this.#i = o, this.gutter.replaceChildren(...Array.from({ length: o }, (e, t) => s("div", {}, String(t + 1))))), this.#w();
	}
	#w() {
		this.code.style.width = `${this.input.clientWidth}px`, Array.from(this.code.children, (e) => `${e.offsetHeight}px`).forEach((e, t) => {
			let n = this.gutter.children[t];
			n && n.style.height !== e && (n.style.height = e);
		}), this.#L(), this.#D(), this.#O();
	}
	#T(e, t, n) {
		let r = this.code.children[e];
		if (!r) return [];
		let i = document.createRange();
		i.setStart(...$(r, t)), i.setEnd(...$(r, n));
		let a = r.getBoundingClientRect(), o = parseFloat(getComputedStyle(r).lineHeight), s = /* @__PURE__ */ new Map();
		for (let e of i.getClientRects()) {
			let t = Math.max(0, Math.floor((e.top + e.height / 2 - a.top) / o)), n = s.get(t);
			s.set(t, n ? {
				left: Math.min(n.left, e.left),
				right: Math.max(n.right, e.right)
			} : {
				left: e.left,
				right: e.right
			});
		}
		return s.size || s.set(0, {
			left: a.left,
			right: a.left
		}), [...s].map(([e, t]) => ({
			...t,
			top: a.top + e * o,
			height: o
		}));
	}
	#E() {
		let e = z(this.#n), t = this.#c?.engine ?? "simple", n = this.#g.filter((e) => (e.severity ?? 1) === 1).length, r = this.#g.filter((e) => e.severity === 2).length, i = [I[t] + (V(e) === t ? "" : ` (${I[V(e)]} in caricamento)`)];
		this.#m && i.push(this.#m), (n || r) && i.push([n && `${n} ${n === 1 ? "errore" : "errori"}`, r && `${r} ${r === 1 ? "avviso" : "avvisi"}`].filter(Boolean).join(", ")), this.info.textContent = i.join(" · "), this.info.title = [this.#u, "Impostazioni dell’Editor"].filter(Boolean).join("\n"), this.info.classList.toggle("has-errors", n > 0);
	}
	#D() {
		let e = this.text, t = this.input.selectionStart, n = Bt(e, t), r = t - e.lastIndexOf("\n", t - 1), i = this.#R(e, t);
		this.position.textContent = `Riga ${n}, colonna ${r} · ${this.#i} ${this.#i === 1 ? "riga" : "righe"}`, this.state.textContent = i ? `${Lt[i.severity ?? 1]}: ${i.message}` : this.#s, this.state.title = this.state.textContent, this.state.classList.toggle("diag", !!i), this.gutter.querySelector(".on")?.classList.remove("on"), this.gutter.children[n - 1]?.classList.add("on");
		let a = this.code.children[n - 1];
		a && (this.current.style.setProperty("--top", `${a.offsetTop}px`), this.current.style.setProperty("--height", `${a.offsetHeight}px`));
	}
	#O() {
		let { scrollTop: e, scrollLeft: t } = this.input, n = `translate(${-t}px, ${-e}px)`;
		this.code.style.transform = n, this.squiggles.style.transform = n, this.current.style.setProperty("--scroll", `${e}px`), this.gutter.scrollTop = e;
	}
	#k() {
		let e = this.langSelect.value || this.#n;
		this.langSelect.replaceChildren(...R().map((e) => s("option", { value: e.id }, e.label))), this.langSelect.value = e;
	}
	#A(e) {
		return {
			engine: "simple",
			tokenize: (t) => S(t, e.simple ?? "text")
		};
	}
	#j(e, t = !1) {
		this.#n = z(e).id, t && (this.#r = !0), this.#G(), this.#M(), this.#N(), this.render();
	}
	#M() {
		let e = z(this.#n), t = V(e), n = `${e.id}:${t}`;
		(n !== this.#l || this.#c?.engine !== t) && (this.#l = n, this.#u = "", this.#c = this.#A(e), t !== "simple" && tt(e, t).then((e) => {
			this.#l === n && (this.#c = e, this.#C(), this.#E());
		}).catch((e) => {
			this.#l === n && (this.#u = `${I[t]} non disponibile: ${e.message}`, this.#E());
		}));
	}
	async #N() {
		this.#P();
		let e = z(this.#n), t = _t(e);
		if (!t) return this.#m = "", this.#E();
		let n = this.#p = {};
		this.#m = "Avvio del server…", this.#E();
		let r = await t;
		if (this.#p !== n) return;
		if (!r.ready) return this.#m = `Server non disponibile: ${r.error ?? "errore"}`, this.#E();
		let i = this.fileId && o.exists(this.fileId) ? q(this.fileId) : `untitled:${this.#_}`;
		this.#d = r, this.#f = {
			uri: i,
			version: 1,
			off: [r.on("diagnostics", (e) => {
				e.uri === this.#f?.uri && (this.#g = Array.isArray(e.diagnostics) ? e.diagnostics : [], this.#L(), this.#D(), this.#E());
			}), r.on("status", () => {
				r.ready || this.#d !== r || (this.#d = null, this.#g = [], this.#m = `Server non disponibile: ${r.error ?? "chiuso"}`, this.#L(), this.#E());
			})]
		}, r.open(i, It[e.id] ?? e.id, 1, this.text), this.#m = r.name, this.#E();
	}
	#P() {
		this.#p = null, clearTimeout(this.#h), this.#d?.ready && this.#f && this.#d.close(this.#f.uri), this.#f?.off.forEach((e) => e()), this.#d = null, this.#f = null, this.#g = [];
	}
	#F() {
		this.#d && (clearTimeout(this.#h), this.#h = setTimeout(() => this.#I(), 150));
	}
	#I() {
		clearTimeout(this.#h), this.#d?.ready && this.#f && this.#d.change(this.#f.uri, ++this.#f.version, this.text);
	}
	#L() {
		for (let e of this.gutter.querySelectorAll(".err, .warn")) e.classList.remove("err", "warn"), e.removeAttribute("title");
		if (!this.#g.length) return this.squiggles.replaceChildren();
		let e = this.text.split("\n"), t = this.code.getBoundingClientRect(), n = [], r = /* @__PURE__ */ new Map();
		for (let i of this.#g.slice(0, 300)) {
			let a = (i.severity ?? 1) === 1 ? "err" : "warn", o = i.range?.start ?? {
				line: 0,
				character: 0
			}, c = i.range?.end ?? o;
			for (let r = o.line; r <= Math.min(c.line, e.length - 1); r++) {
				let i = e[r] ?? "", l = Math.min(i.length, r === o.line ? o.character : 0), u = Math.min(i.length, r === c.line ? c.character : i.length);
				u <= l && (u = Math.min(i.length, l + 1));
				for (let e of this.#T(r, l, u)) n.push(s("div", {
					class: `ed-sq ${a}`,
					style: {
						left: `${e.left - t.left}px`,
						top: `${e.top - t.top + e.height - 4}px`,
						width: `${Math.max(6, e.right - e.left)}px`
					}
				}));
			}
			let l = r.get(o.line) ?? {
				sev: "warn",
				messages: []
			};
			a === "err" && (l.sev = "err"), l.messages.push(i.message), r.set(o.line, l);
		}
		this.squiggles.replaceChildren(...n);
		for (let [e, { sev: t, messages: n }] of r) {
			let r = this.gutter.children[e];
			r && (r.classList.add(t), r.title = n.join("\n"));
		}
	}
	#R(e, t) {
		return this.#g.length ? this.#g.find((n) => {
			if (!n.range) return !1;
			let r = J(e, n.range.start), i = J(e, n.range.end);
			return t >= r && t <= Math.max(i, r + 1);
		}) ?? null : null;
	}
	#z() {
		let e = z(this.#n).id === "json";
		if (this.schemaBtn.hidden = !e, !e) return;
		let t = this.fileId ? P.get("schemas")[this.fileId] : null, n = "nessuno";
		if (t?.type === "file") n = o.get(t.id)?.name ?? "file eliminato";
		else if (t?.type === "url") try {
			n = new URL(t.url).host;
		} catch {
			n = t.url;
		}
		this.schemaBtn.replaceChildren(l("file"), s("span", {}, `Schema: ${n}`)), this.schemaBtn.disabled = !this.fileId, this.schemaBtn.title = this.fileId ? t?.type === "url" ? t.url : "Schema JSON del file" : "Salva il file per associargli uno schema";
	}
	#B() {
		if (!this.fileId) return;
		let e = this.fileId, t = this.schemaBtn.getBoundingClientRect(), n = P.get("schemas")[e];
		u(t.left, t.bottom + 2, [
			{
				label: "Nessuno schema",
				icon: n ? "x" : "check",
				action: () => P.setEntry("schemas", e, void 0)
			},
			{
				label: "Scegli un file di lilOS…",
				icon: "file",
				action: async () => {
					let t = await _(this.openWindow, {
						title: "Scegli lo schema JSON",
						exts: ["json"],
						text: `Lo schema descrive le chiavi e i valori ammessi in «${this.name}».`
					});
					t && t.id !== e && P.setEntry("schemas", e, {
						type: "file",
						id: t.id
					});
				}
			},
			{
				label: "Indirizzo web…",
				icon: "globe",
				action: () => this.#V(e, n?.type === "url" ? n.url : "")
			},
			"-",
			{
				label: "Vale anche \"$schema\" scritto nel file",
				icon: "info",
				disabled: !0
			}
		]);
	}
	#V(e, t) {
		let n = s("input", {
			class: "ctl-text ed-banner-input",
			type: "url",
			placeholder: "https://json.schemastore.org/package.json",
			spellcheck: "false",
			"aria-label": "Indirizzo dello schema"
		});
		n.value = t;
		let r = s("span", { class: "ed-banner-text" }, "Indirizzo dello schema JSON:"), a = () => {
			let t = n.value.trim();
			N(t) ? (P.setEntry("schemas", e, {
				type: "url",
				url: t
			}), this.#U(), this.input.focus()) : (r.textContent = "Serve un indirizzo http:// o https://", n.focus());
		};
		n.addEventListener("keydown", (e) => {
			e.key === "Enter" && (e.preventDefault(), a());
		}), this.#H([
			l("globe"),
			r,
			n,
			i({
				label: "Usa",
				primary: !0,
				onClick: a
			}),
			i({
				label: "Annulla",
				onClick: () => {
					this.#U(), this.input.focus();
				}
			})
		], () => {
			this.#U(), this.input.focus();
		}), n.focus(), n.select();
	}
	#H(e, t) {
		this.banner.replaceChildren(...e), this.banner.hidden = !1, this.banner.querySelector("button")?.focus(), this.banner.onkeydown = (e) => {
			e.key === "Escape" && (e.stopPropagation(), t());
		};
	}
	#U() {
		this.banner.hidden = !0, this.banner.replaceChildren();
	}
	async #W(e = !1, t = null) {
		let n = this.input;
		if (n.selectionStart !== n.selectionEnd || !e && this.text.length > Nt) return this.#G();
		let r = ++this.#y, i = null, a = this.#d;
		if (a?.ready && a.capabilities.completionProvider && this.#f) {
			this.#I();
			try {
				let e = await Vt(a.completion(this.#f.uri, St(this.text, n.selectionStart), t), 1500);
				if (r !== this.#y) return;
				i = Dt(e, this.text, n.selectionStart);
			} catch {
				if (r !== this.#y) return;
			}
		}
		if (i ??= Ve(this.text, n.selectionStart, z(this.#n).simple ?? "text", { manual: e }), !i || n.selectionStart !== n.selectionEnd) return this.#G();
		this.#v = {
			...i,
			index: 0,
			manual: e
		};
		let o = this.text.slice(i.from, n.selectionStart);
		this.suggestions.replaceChildren(...i.items.map((e, t) => {
			let n = e.label.toLowerCase().startsWith(o.toLowerCase()) ? o.length : 0;
			return s("div", {
				class: "ed-ci",
				role: "option",
				id: `${this.suggestions.id}-${t}`,
				dataset: { index: t }
			}, s("span", { class: `ed-ci-kind k-${e.kind}` }, Ft[e.kind] ?? e.kind), s("span", { class: "ed-ci-label" }, n ? s("b", {}, e.label.slice(0, n)) : null, e.label.slice(n)), s("span", { class: "ed-ci-detail" }, e.detail));
		})), this.suggestions.hidden = !1, this.input.setAttribute("aria-expanded", "true"), this.#K(0), this.#J(i.from);
	}
	#G() {
		this.#y++, this.#v && (this.#v = null, this.suggestions.hidden = !0, this.suggestions.replaceChildren(), this.input.setAttribute("aria-expanded", "false"), this.input.removeAttribute("aria-activedescendant"));
	}
	#K(e) {
		let t = this.#v;
		if (!t) return;
		t.index = (e + t.items.length) % t.items.length, [...this.suggestions.children].forEach((e, n) => {
			e.classList.toggle("on", n === t.index), e.setAttribute("aria-selected", String(n === t.index));
		});
		let n = this.suggestions.children[t.index];
		n?.scrollIntoView({ block: "nearest" }), this.input.setAttribute("aria-activedescendant", n?.id ?? "");
	}
	#q(e = this.#v?.index) {
		let t = this.#v, n = t?.items[e];
		if (!n) return;
		this.#G();
		let r = n.from ?? t.from, i = Math.max(n.to ?? 0, this.input.selectionStart), a = n.insert, o = n.caret;
		o === void 0 && (o = a.indexOf("|"), a = a.replace("|", "")), this.input.setSelectionRange(r, i), this.#b = !0, this.#$(a), this.#b = !1, o !== -1 && this.input.setSelectionRange(r + o, r + o), this.#D(), z(this.#n).simple === "css" && n.kind === "pr" && this.#W(!1, ":");
	}
	#J(e) {
		this.#a && (cancelAnimationFrame(this.#a), this.#a = 0, this.render());
		let t = this.text, n = t.lastIndexOf("\n", e - 1) + 1, [r] = this.#T(Bt(t, e) - 1, e - n, e - n);
		if (!r) return;
		let i = this.suggestions, a = this.input.getBoundingClientRect(), o = r.left - a.left, s = r.top - a.top, c = r.height, l = i.offsetWidth, u = i.offsetHeight, d = s + c + 2, f = d + u > a.height && s - u - 2 >= 0 ? s - u - 2 : d;
		i.style.left = Math.max(4, Math.min(o - 30, a.width - l - 4)) + "px", i.style.top = f + "px";
	}
	#Y(e) {
		if (this.#Q(), this.#F(), this.#b) return;
		let t = typeof e.data == "string" ? e.data : "", n = e.inputType === "insertText" && t.length === 1, r = this.#d?.ready ? this.#d.triggerCharacters : [], i = z(this.#n).simple;
		n && (r.includes(t) || !/\s/.test(t) || i === "html" && t === " ") ? this.#W(this.#v?.manual ?? !1, r.includes(t) ? t : null) : e.inputType === "deleteContentBackward" && this.#v ? this.#W(this.#v.manual) : this.#G();
	}
	#X(e, t, n) {
		this.fileId = e, this.name = t, this.#e = n, this.#o = "", this.#r = !1, this.#G(), this.#U(), this.input.value = n, this.input.setSelectionRange(0, 0), this.input.scrollTop = 0, this.input.scrollLeft = 0, this.#j(B(t)), this.tree.setCurrent(e), this.input.focus();
	}
	#Z() {
		return this.fileId ? this.name : "Senza titolo";
	}
	#Q() {
		this.#o = "", cancelAnimationFrame(this.#a), this.#a = requestAnimationFrame(() => {
			this.#a = 0, this.render();
		});
	}
	#$(e) {
		document.execCommand?.("insertText", !1, e) || (this.input.setRangeText(e, this.input.selectionStart, this.input.selectionEnd, "end"), this.#Q(), this.#F());
	}
	#ee(e) {
		let t = this.input;
		if (this.#v && !e.ctrlKey && !e.altKey && !e.metaKey) {
			let t = this.#v, n = Math.max(1, Math.floor(this.suggestions.clientHeight / 24)), r = {
				ArrowDown: 1,
				ArrowUp: -1,
				PageDown: n,
				PageUp: -n
			}[e.key];
			if (r) return e.preventDefault(), this.#K(Math.abs(r) > 1 ? Math.max(0, Math.min(t.items.length - 1, t.index + r)) : t.index + r);
			if ((e.key === "Enter" || e.key === "Tab") && !e.shiftKey) return e.preventDefault(), this.#q();
			if (e.key === "Escape") return e.preventDefault(), e.stopPropagation(), this.#G();
			[
				"ArrowLeft",
				"ArrowRight",
				"Home",
				"End"
			].includes(e.key) && this.#G();
		}
		if (e.key === "Tab" && !e.ctrlKey && !e.altKey) {
			if (e.preventDefault(), !e.shiftKey) return this.#$(Mt);
			let n = t.value.lastIndexOf("\n", t.selectionStart - 1) + 1, r = t.value.slice(n, n + 2).match(/^ */)[0].length;
			if (r) {
				let e = t.selectionStart;
				t.setSelectionRange(n, n + r), this.#$(""), t.setSelectionRange(Math.max(n, e - r), Math.max(n, e - r));
			}
		} else if (e.key === "Enter" && !e.ctrlKey && !e.altKey && !e.metaKey) {
			e.preventDefault();
			let n = t.value.lastIndexOf("\n", t.selectionStart - 1) + 1, r = t.value.slice(n).match(/^[ \t]*/)[0].slice(0, t.selectionStart - n);
			this.#$("\n" + r);
		} else e.key === "Escape" && t.blur();
	}
	#te(e) {
		e.type === "create" && this.#t?.id === e.node.id && !this.fileId ? (this.fileId = e.node.id, this.#e = this.#t.saved, this.#t = null, this.name = e.node.name, this.#o = "Il file è stato ripristinato", this.tree.setCurrent(this.fileId), this.#N(), this.render()) : this.fileId && (e.type === "remove" && e.ids.includes(this.fileId) ? (this.#t = {
			id: this.fileId,
			saved: this.#e
		}, this.fileId = null, this.#e = "", this.#o = e.trashed ? "Il file è nel cestino: il testo resta qui finché non lo salvi o lo ripristini" : "Il file è stato eliminato: il testo resta qui finché non lo salvi", this.tree.setCurrent(null), this.#N(), this.render()) : e.type === "move" && e.ids.includes(this.fileId) ? (this.name = o.get(this.fileId).name, this.#N(), this.render()) : e.type === "rename" && e.node.id === this.fileId ? (this.name = e.node.name, !this.#r && B(this.name) !== this.#n ? this.#j(B(this.name)) : (this.#N(), this.render())) : e.type === "rename" && e.node.type === "folder" && o.isInside(this.fileId, e.node.id) && (this.#N(), this.render()));
	}
};
export { zt as default };
