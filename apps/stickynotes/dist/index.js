import * as e from "/host/sdk.js";
import { Window as t, fs as n, h as r, icon as i, schedule as a, splitName as o, storage as s } from "/host/sdk.js";
import * as c from "/host/system.js";
// src/stickynotes/note.js
var l = "stickynotes", u = "sticky", d = {
	yellow: "#fff0a3",
	pink: "#ffd3de",
	green: "#cdeec4",
	blue: "#cce3ff",
	violet: "#e3d8ff",
	orange: "#ffd9b3"
}, f = Object.keys(d), p = "#2b2a26", m = {
	small: [160, 140],
	medium: [200, 180],
	large: [280, 240]
}, h = {
	w: 120,
	h: 90
}, g = {
	w: 600,
	h: 600
}, _ = 80, v = 240, y = 60, b = (e, t, n, r) => Number.isFinite(e) ? Math.min(n, Math.max(t, Math.round(e))) : r, x = (e, t) => typeof e == "string" ? e.slice(0, t) : "";
function S(e, t = {}) {
	let n = e?.apps?.stickynotes ?? {}, r = f.includes(n.color) ? n.color : f.includes(t.color) ? t.color : "yellow", [i, a] = m.medium;
	return {
		color: r,
		w: b(n.w, h.w, g.w, i),
		h: b(n.h, h.h, g.h, a),
		title: x(n.title, _),
		excerpt: x(n.excerpt, v),
		remind: Number.isSafeInteger(n.remind) && n.remind > 0 ? n.remind : null,
		task: typeof n.task == "string" && n.task.length <= 80 ? n.task : null,
		auto: n.auto !== !1,
		named: typeof n.named == "string" ? n.named.slice(0, 255) : null,
		checks: Array.isArray(n.checks) && n.checks.length === 2 && n.checks.every(Number.isSafeInteger) ? n.checks : null
	};
}
function C(e) {
	let t = {
		color: e.color,
		w: e.w,
		h: e.h
	};
	return e.title && (t.title = e.title.slice(0, _)), e.excerpt && (t.excerpt = e.excerpt.slice(0, v)), e.remind && (t.remind = e.remind), e.task && (t.task = e.task), e.auto === !1 && (t.auto = !1), e.named && (t.named = e.named), e.checks && (t.checks = e.checks), t;
}
var w = /^\s*[-*]\s+\[( |x|X)\]\s?(.*)$/, T = /^\s*[-*]\s+(.*)$/;
function E(e) {
	let t = w.exec(e);
	if (t) return {
		kind: "check",
		done: t[1] !== " ",
		text: t[2]
	};
	let n = T.exec(e);
	return n ? {
		kind: "bullet",
		text: n[1]
	} : {
		kind: "text",
		text: e
	};
}
function D(e) {
	let t = String(e ?? "").replace(/\r\n?/g, "\n").split("\n"), n = O(E(t[0] ?? "").text).trim(), r = t.slice(1).map((e, t) => ({
		...E(e),
		line: t + 1
	}));
	for (; r.length && r.at(-1).kind === "text" && !r.at(-1).text.trim();) r.pop();
	let i = r.filter((e) => e.kind === "check");
	return {
		title: n,
		body: r,
		checks: i.length ? [i.filter((e) => e.done).length, i.length] : null
	};
}
var O = (e) => String(e).replace(/\*\*(.+?)\*\*/g, "$1");
function k(e) {
	let { title: t, body: n, checks: r } = D(e), i = n.map((e) => O(e.text).trim()).filter(Boolean).join(" · ").slice(0, v);
	return {
		title: t.slice(0, _),
		excerpt: i,
		checks: r
	};
}
function ee(e, t) {
	let n = String(e ?? "").replace(/\r\n?/g, "\n").split("\n"), r = w.exec(n[t] ?? "");
	return r ? (n[t] = n[t].replace(/\[( |x|X)\]/, r[1] === " " ? "[x]" : "[ ]"), n.join("\n")) : e;
}
function A(e) {
	let t = [], n = 0;
	for (let i of String(e).matchAll(/\*\*(.+?)\*\*/g)) i.index > n && t.push(e.slice(n, i.index)), t.push(r("b", {}, i[1])), n = i.index + i[0].length;
	return n < e.length && t.push(e.slice(n)), t;
}
function j(e, t) {
	return `${n.cleanName(String(e ?? "").replace(/[\\/:*?"<>|]+/g, " ").replace(/\s+/g, " ").trim()).slice(0, y).trim() || t}.${u}`;
}
var M = (e) => e?.type === "file" && o(e.name)[1].toLowerCase() === "sticky", te = (e) => o(e.name)[0];
// src/shared/i18n.js
function ne(t, n) {
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
// src/stickynotes/i18n.js
var N = ne("stickynotes", {
	en: { strings: {
		"@name": "Sticky Notes",
		"@description": "Colored notes on the desk: written in place, with lists, boxes to tick and reminders. Each note is a .sticky text file.",
		"@widgets.note.name": "Sticky note",
		"@entrypoints.main.params.file.label": "Note",
		"@entrypoints.main.params.file.description": "A note to write in a window",
		"@entrypoints.reveal.label": "Show a note on its desk",
		"@entrypoints.filePreview.label": "Note previews",
		"@dependencies.scheduler.reason": "Reminders of the notes",
		"app.name": "Sticky Notes",
		"common.cancel": "Cancel",
		"note.untitled": "Note",
		"note.empty": "Empty note",
		"note.resize": "Drag to resize",
		"note.reminderAt": "Reminder: {when}",
		"note.checks": "{done} of {n}",
		"editor.label": "Text of the note",
		"editor.placeholder": "Write here… the first line is the title",
		"editor.toolbar": "Note",
		"editor.bold": "Bold (Ctrl B)",
		"editor.bullets": "Bulleted list",
		"editor.checks": "List with boxes to tick",
		"editor.remind": "Remind me",
		"editor.done": "Done",
		"editor.doneHint": "Stop writing (Esc)",
		"color.yellow": "Yellow",
		"color.pink": "Pink",
		"color.green": "Green",
		"color.blue": "Blue",
		"color.violet": "Violet",
		"color.orange": "Orange",
		"size.small": "Small",
		"size.medium": "Medium",
		"size.large": "Large",
		"menu.write": "Write",
		"menu.color": "Color",
		"menu.size": "Size",
		"menu.reminder": "Reminder…",
		"menu.reminderAt": "Reminder: {when}…",
		"menu.copy": "Copy the text",
		"remind.title": "Remind me",
		"remind.inHour": "In an hour",
		"remind.evening": "This evening",
		"remind.morning": "Tomorrow morning",
		"remind.monday": "Next Monday",
		"remind.date": "Date",
		"remind.time": "Time",
		"remind.hint": "{zone}. It comes as a notification, also with lilOS closed (you see it when you open it).",
		"remind.save": "Remind me",
		"remind.remove": "Remove",
		"remind.failed": "Reminder not saved: {message}",
		"remind.invalid": "Date or time not valid",
		"remind.past": "That time has already gone",
		"remind.today": "today {time}",
		"remind.tomorrow": "tomorrow {time}",
		"remind.on": "{date}, {time}",
		"remind.taskName": "Note: {title}",
		"reveal.gone": "The note is no longer there.",
		"list.filters": "Filters",
		"list.search": "Search the notes",
		"list.new": "New note",
		"list.cannotCreate": "The note cannot be made here: Sticky Notes must be the app of .sticky files (Control Panel → Usability → File types).",
		"list.all": "All",
		"list.withReminder": "With a reminder",
		"list.workspaces": "Workspaces",
		"list.elsewhere": "Not on a desk",
		"list.colors": "Color",
		"list.newColor": "New notes",
		"list.otherFolder": "Another workspace's folder",
		"list.unknownWorkspace": "Workspace",
		"list.show": "Show",
		"list.bring": "Bring here",
		"list.gone": "The note is no longer there",
		"list.count": {
			one: "{n} note",
			other: "{n} notes"
		},
		"list.noMatch": "No note matches.",
		"list.none": "No notes yet. Right-click the desk → New → Sticky note, or «New note».",
		"list.status": {
			one: "{n} note",
			other: "{n} notes on the desks of {spaces} workspaces and in other folders"
		}
	} },
	it: { strings: {
		"@name": "Note adesive",
		"@description": "Note colorate sulla scrivania: si scrivono lì, con elenchi, caselle da spuntare e promemoria. Ogni nota è un file di testo .sticky.",
		"@widgets.note.name": "Nota adesiva",
		"@entrypoints.main.params.file.label": "Nota",
		"@entrypoints.main.params.file.description": "Una nota da scrivere in una finestra",
		"@entrypoints.reveal.label": "Mostra una nota sulla sua scrivania",
		"@entrypoints.filePreview.label": "Anteprime delle note",
		"@dependencies.scheduler.reason": "I promemoria delle note",
		"app.name": "Note adesive",
		"common.cancel": "Annulla",
		"note.untitled": "Nota",
		"note.empty": "Nota vuota",
		"note.resize": "Trascina per cambiare la misura",
		"note.reminderAt": "Promemoria: {when}",
		"note.checks": "{done} di {n}",
		"editor.label": "Testo della nota",
		"editor.placeholder": "Scrivi qui… la prima riga è il titolo",
		"editor.toolbar": "Nota",
		"editor.bold": "Grassetto (Ctrl B)",
		"editor.bullets": "Elenco puntato",
		"editor.checks": "Elenco con caselle da spuntare",
		"editor.remind": "Ricordamelo",
		"editor.done": "Fine",
		"editor.doneHint": "Smetti di scrivere (Esc)",
		"color.yellow": "Giallo",
		"color.pink": "Rosa",
		"color.green": "Verde",
		"color.blue": "Azzurro",
		"color.violet": "Viola",
		"color.orange": "Arancione",
		"size.small": "Piccola",
		"size.medium": "Media",
		"size.large": "Grande",
		"menu.write": "Scrivi",
		"menu.color": "Colore",
		"menu.size": "Misura",
		"menu.reminder": "Promemoria…",
		"menu.reminderAt": "Promemoria: {when}…",
		"menu.copy": "Copia il testo",
		"remind.title": "Ricordamelo",
		"remind.inHour": "Tra un'ora",
		"remind.evening": "Stasera",
		"remind.morning": "Domani mattina",
		"remind.monday": "Lunedì prossimo",
		"remind.date": "Data",
		"remind.time": "Ora",
		"remind.hint": "{zone}. Arriva come notifica, anche a lilOS chiuso (la vedi quando lo apri).",
		"remind.save": "Ricordamelo",
		"remind.remove": "Togli",
		"remind.failed": "Promemoria non salvato: {message}",
		"remind.invalid": "Data o ora non valide",
		"remind.past": "Quell'ora è già passata",
		"remind.today": "oggi {time}",
		"remind.tomorrow": "domani {time}",
		"remind.on": "{date}, {time}",
		"remind.taskName": "Nota: {title}",
		"reveal.gone": "La nota non c'è più.",
		"list.filters": "Filtri",
		"list.search": "Cerca nelle note",
		"list.new": "Nuova nota",
		"list.cannotCreate": "Qui la nota non si può creare: Note adesive deve essere l'app dei file .sticky (Pannello di controllo → Usabilità → Tipi di file).",
		"list.all": "Tutte",
		"list.withReminder": "Con promemoria",
		"list.workspaces": "Workspace",
		"list.elsewhere": "Fuori dalle scrivanie",
		"list.colors": "Colore",
		"list.newColor": "Nuove note",
		"list.otherFolder": "Cartella di un altro workspace",
		"list.unknownWorkspace": "Workspace",
		"list.show": "Mostra",
		"list.bring": "Porta qui",
		"list.gone": "La nota non c'è più",
		"list.count": {
			one: "{n} nota",
			other: "{n} note"
		},
		"list.noMatch": "Nessuna nota corrisponde.",
		"list.none": "Ancora nessuna nota. Tasto destro sulla scrivania → Nuovo → Nota adesiva, oppure «Nuova nota».",
		"list.status": {
			one: "{n} nota",
			other: "{n} note sulle scrivanie di {spaces} workspace e in altre cartelle"
		}
	} }
}), { t: P } = N, F = `app:${l}:color`, I = /* @__PURE__ */ new Set(), L = () => f.includes(s.get(F)) ? s.get(F) : "yellow", re = (e) => {
	f.includes(e) && s.set(F, e);
}, R = (e) => S(e, { color: L() });
async function z(e) {
	try {
		return await n.read(e);
	} catch {
		return null;
	}
}
function B(e, t) {
	let r = n.get(e);
	r && n.setAppMeta(e, l, C({
		...R(r),
		...t
	}));
}
async function V(e, t) {
	let r = n.get(e);
	if (!r) return;
	let { title: i, excerpt: a, checks: o } = k(t), s = C({
		...R(r),
		title: i,
		excerpt: a,
		checks: o
	});
	await n.write(e, t, { mark: {
		app: l,
		value: s
	} }), ie(e);
}
function ie(e) {
	let t = n.get(e);
	if (!t) return;
	let r = R(t);
	if (r.auto && r.named && r.named !== t.name) {
		n.setAppMeta(e, l, C({
			...r,
			auto: !1
		}));
		return;
	}
	if (!r.auto || !r.title) return;
	let i = n.uniqueName(t.parent, j(r.title, P("note.untitled")), e);
	if (i !== t.name) {
		I.add(e);
		try {
			n.setAppMeta(e, l, C({
				...r,
				named: i
			})), n.rename(e, i);
		} catch (e) {
			console.warn("[stickynotes] nome non cambiato:", e.message);
		} finally {
			I.delete(e);
		}
	}
}
function ae(e) {
	if (I.has(e.id)) return;
	let t = R(e);
	if (t.auto && t.named && e.name !== t.named) try {
		B(e.id, { auto: !1 });
	} catch {}
}
// src/stickynotes/remind.js
var oe = null, H = () => oe ??= a.forApp(l), U = () => !!a?.available, W = (e) => String(e).padStart(2, "0"), se = (e) => `${e.getFullYear()}-${W(e.getMonth() + 1)}-${W(e.getDate())}T${W(e.getHours())}:${W(e.getMinutes())}`, G = () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
function K(e) {
	let { remind: t } = R(e);
	return t && t > Date.now() ? t : null;
}
function q(e) {
	let t = new Date(e), n = /* @__PURE__ */ new Date(), r = new Date(t.getFullYear(), t.getMonth(), t.getDate()) - new Date(n.getFullYear(), n.getMonth(), n.getDate()), i = N.date(t, {
		hour: "2-digit",
		minute: "2-digit"
	});
	return r === 0 ? P("remind.today", { time: i }) : r === 864e5 ? P("remind.tomorrow", { time: i }) : P("remind.on", {
		date: N.date(t, {
			weekday: "short",
			day: "numeric",
			month: "short"
		}),
		time: i
	});
}
async function ce(e, t) {
	let r = n.get(e);
	if (!r) return;
	let i = R(r), a = i.title || P("note.untitled"), o = {
		name: P("remind.taskName", { title: a }).slice(0, 120),
		enabled: !0,
		when: {
			once: se(new Date(t)),
			tz: G()
		},
		what: {
			type: "notify",
			level: "info",
			text: (i.excerpt ? `${a} — ${i.excerpt}` : a).slice(0, 300),
			open: {
				app: l,
				entry: "reveal",
				args: { note: e }
			}
		}
	}, s = null;
	i.task && (s = await H().update(i.task, o).catch(() => null)), s ??= await H().create(o), B(e, {
		remind: t,
		task: s.id
	});
}
async function le(e) {
	let t = n.get(e), r = t && R(t);
	r && (r.task && await H().remove(r.task).catch(() => {}), B(e, {
		remind: null,
		task: null
	}));
}
function ue() {
	let e = /* @__PURE__ */ new Date(), t = (t, n, r = 0) => new Date(e.getFullYear(), e.getMonth(), e.getDate() + t, n, r).getTime(), n = (8 - e.getDay()) % 7 || 7;
	return [
		{
			label: P("remind.inHour"),
			at: Date.now() + 36e5
		},
		{
			label: P("remind.evening"),
			at: t(0, 18)
		},
		{
			label: P("remind.morning"),
			at: t(1, 9)
		},
		{
			label: P("remind.monday"),
			at: t(n, 9)
		}
	].filter((e) => e.at > Date.now() + 6e4);
}
function J(e, { x: t, y: a }, o = () => {}) {
	document.querySelector(".sn-pop")?.remove();
	let s = n.get(e);
	if (!s) return;
	let c = K(s), l = new Date(c ?? Date.now() + 36e5), u = r("input", {
		class: "ctl-text",
		type: "date",
		"aria-label": P("remind.date")
	}), d = r("input", {
		class: "ctl-text",
		type: "time",
		"aria-label": P("remind.time")
	});
	u.value = `${l.getFullYear()}-${W(l.getMonth() + 1)}-${W(l.getDate())}`, d.value = `${W(l.getHours())}:${W(c ? l.getMinutes() : 0)}`;
	let f = r("p", {
		class: "sn-pop-error",
		hidden: !0
	}), p = () => {
		_.remove(), removeEventListener("pointerdown", v, !0);
	}, m = (e) => {
		f.textContent = P("remind.failed", { message: e.message }), f.hidden = !1;
	}, h = async (t) => {
		try {
			await ce(e, t), p(), o();
		} catch (e) {
			m(e);
		}
	}, g = () => {
		let [e, t, n] = u.value.split("-").map(Number), [r, i] = d.value.split(":").map(Number), a = new Date(e, t - 1, n, r, i).getTime();
		if (!Number.isFinite(a)) return m(Error(P("remind.invalid")));
		if (a <= Date.now()) return m(Error(P("remind.past")));
		h(a);
	}, _ = r("div", {
		class: "sn-pop",
		role: "dialog",
		"aria-label": P("remind.title")
	}, r("h5", {}, i("bell"), P("remind.title")), r("div", { class: "sn-quick" }, ue().map((e) => r("button", {
		type: "button",
		onclick: () => h(e.at)
	}, r("span", {}, e.label), r("small", {}, q(e.at))))), r("div", { class: "sn-pop-row" }, u, d), r("p", { class: "sn-pop-hint" }, P("remind.hint", { zone: G() })), f, r("div", { class: "sn-pop-foot" }, c && r("button", {
		class: "ctl-btn danger",
		type: "button",
		onclick: async () => {
			try {
				await le(e), p(), o();
			} catch (e) {
				m(e);
			}
		}
	}, P("remind.remove")), r("span", { class: "sn-grow" }), r("button", {
		class: "ctl-btn",
		type: "button",
		onclick: p
	}, P("common.cancel")), r("button", {
		class: "ctl-btn primary",
		type: "button",
		onclick: g
	}, P("remind.save"))));
	_.addEventListener("keydown", (e) => {
		e.stopPropagation(), e.key === "Escape" && p(), e.key === "Enter" && (e.target === u || e.target === d) && g();
	});
	let v = (e) => {
		_.contains(e.target) || p();
	};
	document.body.append(_);
	let y = _.getBoundingClientRect();
	_.style.left = `${Math.max(8, Math.min(innerWidth - y.width - 8, t))}px`, _.style.top = `${Math.max(8, Math.min(innerHeight - y.height - 8, a))}px`, setTimeout(() => addEventListener("pointerdown", v, !0)), _.querySelector("button")?.focus();
}
// src/stickynotes/editor.js
var de = 600;
function Y(e, t) {
	let { value: n, selectionStart: r, selectionEnd: i } = e, a = n.lastIndexOf("\n", r - 1) + 1, o = n.indexOf("\n", i), s = o === -1 ? n.length : o, c = n.slice(a, s).split("\n"), l = /^\s*[-*]\s+(\[( |x|X)\]\s?)?/, u = c.every((e) => t === "- " ? /^\s*[-*]\s+(?!\[[ xX]\])/.test(e) : /^\s*[-*]\s+\[[ xX]\]/.test(e)), d = c.map((e) => u ? e.replace(l, "") : t + e.replace(l, "")).join("\n");
	e.setRangeText(d, a, s, "select"), e.dispatchEvent(new Event("input"));
}
function X(e) {
	let { value: t, selectionStart: n, selectionEnd: r } = e, i = t.slice(n, r);
	t.slice(n - 2, n) === "**" && t.slice(r, r + 2) === "**" ? e.setRangeText(i, n - 2, r + 2, "select") : (e.setRangeText(`**${i}**`, n, r, "end"), i || e.setSelectionRange(n + 2, n + 2)), e.dispatchEvent(new Event("input"));
}
function Z({ id: e, text: t = null, onColor: a = () => {}, onEnd: o = () => {}, endOnBlur: s = !1 }) {
	let c = 0, l = !1, u = t, p = r("textarea", {
		class: "sn-text",
		spellcheck: "true",
		"aria-label": P("editor.label"),
		placeholder: P("editor.placeholder")
	});
	p.value = t ?? "", t ?? z(e).then((e) => {
		!l && e != null && (p.value = e, u = e);
	});
	let m = async () => {
		if (clearTimeout(c), p.value !== u && n.exists(e)) {
			u = p.value;
			try {
				await V(e, u);
			} catch (e) {
				console.error("[stickynotes] nota non salvata:", e);
			}
		}
	};
	p.addEventListener("input", () => {
		clearTimeout(c), c = setTimeout(m, de);
	}), p.addEventListener("keydown", (e) => {
		e.stopPropagation(), e.key === "Escape" && (e.preventDefault(), y()), (e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "b" && (e.preventDefault(), X(p));
	}), s && p.addEventListener("blur", () => setTimeout(() => {
		document.hasFocus() && document.activeElement !== p && y();
	}));
	for (let e of [
		"pointerdown",
		"dblclick",
		"contextmenu",
		"wheel"
	]) p.addEventListener(e, (t) => {
		(e !== "wheel" || p.scrollHeight > p.clientHeight) && t.stopPropagation();
	});
	let h = (t) => r("button", {
		class: "sn-sw",
		type: "button",
		title: P(`color.${t}`),
		"aria-label": P(`color.${t}`),
		style: { background: d[t] },
		onclick: () => {
			B(e, { color: t }), _.querySelectorAll(".sn-sw").forEach((e) => e.classList.toggle("on", e === _.querySelector(`[data-color="${t}"]`))), a(t), p.focus();
		},
		dataset: { color: t }
	}), g = (e, t, n) => r("button", {
		class: "sn-tool",
		type: "button",
		title: t,
		"aria-label": t,
		onclick: () => {
			n(), p.focus();
		}
	}, e), _ = r("div", {
		class: "sn-bar",
		role: "toolbar",
		"aria-label": P("editor.toolbar")
	}, f.map(h), r("span", { class: "sn-sep" }), g(r("b", {}, "B"), P("editor.bold"), () => X(p)), g(i("list"), P("editor.bullets"), () => Y(p, "- ")), g(i("check"), P("editor.checks"), () => Y(p, "- [ ] ")), U() && r("span", { class: "sn-sep" }), U() && g(i("bell"), P("editor.remind"), () => {
		let t = _.getBoundingClientRect();
		m().then(() => J(e, {
			x: t.left,
			y: t.bottom + 6
		}));
	}), r("span", { class: "sn-sep" }), r("button", {
		class: "sn-tool sn-done",
		type: "button",
		title: P("editor.doneHint"),
		onclick: () => y()
	}, P("editor.done")));
	_.addEventListener("pointerdown", (e) => {
		e.stopPropagation(), e.target.closest("button") && e.preventDefault();
	}), _.addEventListener("dblclick", (e) => e.stopPropagation());
	let v = R(n.get(e)).color;
	_.querySelector(`[data-color="${v}"]`)?.classList.add("on");
	async function y() {
		l || (l = !0, await m(), o(p.value));
	}
	return {
		area: p,
		bar: _,
		save: m,
		finish: y,
		get ended() {
			return l;
		},
		focus() {
			p.focus(), p.setSelectionRange(p.value.length, p.value.length);
		}
	};
}
// src/stickynotes/widget.js
var Q = .6, fe = .25;
function pe({ el: e, node: t, host: a }) {
	let o = t.id, s = null, l = t.modified, u = null, p = a.scale, _ = !1, v = r("div", { class: "sn-view" }), y = r("div", { class: "sn-foot" }), b = r("div", {
		class: "sn-grip",
		title: P("note.resize")
	}), x = r("div", {
		class: "sn",
		role: "note"
	}, v, y, b);
	e.append(x);
	let S = () => R(n.get(o) ?? t);
	function C() {
		let e = S();
		if (x.style.setProperty("--sn-c", d[e.color]), a.setColor(d[e.color]), a.setSize(e.w, e.h), u) return;
		let { title: c, body: l, checks: f } = D(s ?? (e.title ? `${e.title}\n${e.excerpt}` : "")), m = l.map((e) => e.kind === "check" ? r("div", { class: `sn-li${e.done ? " done" : ""}` }, r("button", {
			class: `sn-cb${e.done ? " on" : ""}`,
			type: "button",
			role: "checkbox",
			"aria-checked": String(e.done),
			"aria-label": e.text,
			onclick: (t) => {
				t.stopPropagation(), T(e.line);
			}
		}), r("span", {}, A(e.text))) : e.kind === "bullet" ? r("div", { class: "sn-bul" }, A(e.text)) : r("div", { class: "sn-p" }, e.text ? A(e.text) : "\xA0"));
		x.setAttribute("aria-label", c || P("note.untitled")), v.replaceChildren(r("div", { class: "sn-t" }, c || r("span", { class: "sn-ph" }, s === "" ? P("note.empty") : "")), ...m);
		let h = K(n.get(o) ?? t);
		y.replaceChildren(h ? r("span", {
			class: "sn-when",
			title: P("note.reminderAt", { when: q(h) })
		}, i("bell"), q(h)) : "", f ? r("span", { class: "sn-count" }, P("note.checks", {
			done: f[0],
			n: f[1]
		})) : ""), x.classList.toggle("has-foot", !!(h || f)), E(p);
	}
	async function w() {
		let e = await z(o);
		if (e == null) return;
		s = e, s === "" && Date.now() - (n.get(o)?.created ?? 0) < 5e3 && (_ = !0);
		let t = k(s), r = S();
		if (n.exists(o) && (t.title !== r.title || t.excerpt !== r.excerpt || String(t.checks) !== String(r.checks))) try {
			B(o, {
				title: t.title,
				excerpt: t.excerpt,
				checks: t.checks
			});
		} catch {}
		C();
	}
	async function T(e) {
		let t = await z(o);
		t != null && (s = t), s != null && (s = ee(s, e), C(), await V(o, s).catch((e) => console.error("[stickynotes]", e)));
	}
	function E(e) {
		p = e;
		let t = e < fe ? "far" : e < Q ? "mid" : "near";
		x.dataset.lod = t;
		let n = v.querySelector(".sn-t");
		n && (n.style.fontSize = t === "near" ? "" : `${Math.min(Q / e * 13.5, 34)}px`);
	}
	function O() {
		!u && n.exists(o) && (p < .9 && c.revealOnDesk(o), u = Z({
			id: o,
			text: s,
			endOnBlur: !0,
			onColor: () => C(),
			onEnd: (e) => j(e)
		}), a.setEditing(!0), x.classList.add("editing"), v.replaceWith(u.area), e.append(u.bar), requestAnimationFrame(() => u?.focus()));
	}
	async function j(e) {
		if (!u) return;
		let t = u;
		if (u = null, a.setEditing(!1), x.classList.remove("editing"), t.area.replaceWith(v), t.bar.remove(), s = e, !e.trim() && n.exists(o)) try {
			_ ? n.remove(o) : n.trash([o]);
		} catch (e) {
			console.warn("[stickynotes]", e.message);
		}
		else _ = !1, C();
	}
	b.addEventListener("pointerdown", (e) => {
		if (e.button !== 0) return;
		e.stopPropagation(), e.preventDefault(), a.select();
		let t = S(), n = e.clientX, r = e.clientY, i = t.w, s = t.h;
		b.setPointerCapture(e.pointerId);
		let c = (e) => {
			i = Math.round(Math.min(g.w, Math.max(h.w, t.w + (e.clientX - n) / p))), s = Math.round(Math.min(g.h, Math.max(h.h, t.h + (e.clientY - r) / p))), a.setSize(i, s);
		}, l = () => {
			b.removeEventListener("pointermove", c), b.removeEventListener("pointerup", l), b.removeEventListener("pointercancel", l), (i !== t.w || s !== t.h) && B(o, {
				w: i,
				h: s
			});
		};
		b.addEventListener("pointermove", c), b.addEventListener("pointerup", l), b.addEventListener("pointercancel", l);
	});
	let M = (e, [t, n]) => ({
		label: P(`size.${e}`),
		icon: S().w === t && S().h === n ? "check" : void 0,
		action: () => B(o, {
			w: t,
			h: n
		})
	});
	return C(), w(), {
		update(e) {
			o = e.id, ae(e), e.modified !== l && !u ? (l = e.modified, w()) : C();
		},
		zoom: E,
		open: O,
		selected(e) {
			x.classList.toggle("sel", e);
		},
		menu() {
			let e = S(), r = K(n.get(o) ?? t);
			return [
				{
					label: P("menu.write"),
					icon: "pencil",
					action: O
				},
				{
					label: P("menu.color"),
					icon: "palette",
					items: f.map((t) => ({
						label: P(`color.${t}`),
						swatch: d[t],
						icon: e.color === t ? "check" : void 0,
						action: () => B(o, { color: t })
					}))
				},
				{
					label: P("menu.size"),
					icon: "max",
					items: Object.entries(m).map(([e, t]) => M(e, t))
				},
				U() && {
					label: r ? P("menu.reminderAt", { when: q(r) }) : P("menu.reminder"),
					icon: "bell",
					action: () => {
						let e = x.getBoundingClientRect();
						J(o, {
							x: e.right + 8,
							y: e.top
						});
					}
				},
				{
					label: P("menu.copy"),
					icon: "file",
					action: async () => {
						let e = s ?? await z(o);
						e != null && await navigator.clipboard?.writeText(e).catch(() => {});
					}
				}
			].filter(Boolean);
		},
		destroy() {
			u && u.save(), u?.bar.remove(), u = null, document.querySelector(".sn-pop")?.remove();
		}
	};
}
// src/stickynotes/list.js
var $ = "all", me = "remind", he = "elsewhere";
function ge({ args: e } = {}) {
	let a = new t({
		title: P("app.name"),
		icon: "note",
		width: 900,
		height: 560,
		minWidth: 560,
		minHeight: 320
	}), o = {
		filter: $,
		query: "",
		focus: typeof e?.focus == "string" ? e.focus : null
	}, s = r("nav", {
		class: "sn-side",
		"aria-label": P("list.filters")
	}), l = r("input", {
		class: "ctl-text sn-search",
		type: "search",
		placeholder: P("list.search"),
		"aria-label": P("list.search")
	}), u = r("span", { class: "sn-hint" }), p = r("div", {
		class: "sn-grid",
		role: "list"
	}), m = r("div", { class: "sn-status" }), h = r("button", {
		class: "ctl-btn primary",
		type: "button",
		onclick: () => {
			c.newWidgetOnDesk("stickynotes", "note") ? a.emit("minimize") : m.textContent = P("list.cannotCreate");
		}
	}, i("plus"), P("list.new"));
	a.body.append(r("div", { class: "sn-win" }, s, r("div", { class: "sn-main" }, r("div", { class: "sn-tools" }, l, u, r("span", { class: "sn-grow" }), h), p, m))), l.addEventListener("input", () => {
		o.query = l.value.trim().toLowerCase(), w();
	});
	function g() {
		return n.everywhere(M).map((e) => {
			let t = R(e);
			return {
				node: e,
				meta: t,
				scope: e.scope,
				title: t.title || te(e),
				excerpt: t.excerpt,
				remind: K(e)
			};
		}).sort((e, t) => (t.node.modified ?? 0) - (e.node.modified ?? 0));
	}
	let _ = () => c.workspaceManager()?.list?.() ?? [], v = (e) => !!e.scope;
	function y(e) {
		let t = o.filter;
		return !(t === me && !e.remind || t === he && v(e) || t.startsWith("ws:") && e.scope !== t.slice(3) || t.startsWith("color:") && e.meta.color !== t.slice(6) || o.query && !`${e.title}\n${e.excerpt}`.toLowerCase().includes(o.query));
	}
	function b(e, t, n, i) {
		return r("button", {
			class: "sn-flt",
			type: "button",
			"aria-pressed": String(o.filter === e),
			onclick: () => {
				o.filter = e, w();
			}
		}, i, r("span", {}, t), r("small", {}, String(n)));
	}
	function x(e) {
		let t = _(), n = e.filter((e) => !v(e)).length;
		s.replaceChildren(b($, P("list.all"), e.length, i("note")), b(me, P("list.withReminder"), e.filter((e) => e.remind).length, i("bell")), r("h6", {}, P("list.workspaces")), ...t.map((t) => b(`ws:${t.id}`, t.name, e.filter((e) => e.scope === t.id).length, r("span", {
			class: "sn-dot",
			style: { background: t.color }
		}))), n ? b(he, P("list.elsewhere"), n, i("folder")) : "", r("h6", {}, P("list.colors")), ...f.map((t) => b(`color:${t}`, P(`color.${t}`), e.filter((e) => e.meta.color === t).length, r("span", {
			class: "sn-sq",
			style: { background: d[t] }
		}))), r("h6", {}, P("list.newColor")), r("div", {
			class: "sn-newcolor",
			role: "radiogroup",
			"aria-label": P("list.newColor")
		}, f.map((e) => r("button", {
			class: `sn-sw${L() === e ? " on" : ""}`,
			type: "button",
			role: "radio",
			"aria-checked": String(L() === e),
			title: P(`color.${e}`),
			"aria-label": P(`color.${e}`),
			style: { background: d[e] },
			onclick: () => {
				re(e), w();
			}
		}))));
	}
	function S(e) {
		if (!e.scope) {
			let t = n.get(e.node.id);
			return r("span", {}, i("folder"), t ? n.tildePath(e.node.parent) : P("list.otherFolder"));
		}
		let t = c.describeWorkspace(e.scope);
		return r("span", {}, r("span", {
			class: "sn-dot",
			style: { background: t?.color ?? "#888" }
		}), t?.name ?? P("list.unknownWorkspace"));
	}
	function C(e) {
		let t = async () => {
			if (e.scope && await c.revealOnDesk(e.node.id)) return;
			let t = n.get(e.node.id);
			t && c.launch("files", { folder: t.parent });
		}, a = r("div", {
			class: "sn-card",
			role: "listitem",
			tabindex: "0",
			"aria-label": e.title,
			dataset: { id: e.node.id }
		}, r("div", { class: "sn-card-t" }, e.title), e.excerpt ? r("div", { class: "sn-card-x" }, e.excerpt) : "", r("div", { class: "sn-card-w" }, e.remind ? r("span", {}, i("bell"), q(e.remind)) : "", S(e)), r("div", { class: "sn-card-acts" }, r("button", {
			class: "ctl-btn primary",
			type: "button",
			onclick: t
		}, i("fit"), P("list.show")), r("button", {
			class: "ctl-btn",
			type: "button",
			onclick: async () => {
				await c.bringToDesk(e.node.id, {
					w: e.meta.w,
					h: e.meta.h
				}) || (m.textContent = P("list.gone"));
			}
		}, i("arrowDown"), P("list.bring"))));
		return a.style.setProperty("--sn-c", d[e.meta.color]), a.addEventListener("dblclick", (e) => {
			e.target.closest("button") || t();
		}), a.addEventListener("keydown", (e) => {
			e.key === "Enter" && e.target === a && t();
		}), a;
	}
	function w() {
		let e = g();
		x(e);
		let t = e.filter(y);
		u.textContent = P("list.count", { n: t.length }), p.replaceChildren(...t.length ? t.map(C) : [r("p", { class: "sn-empty" }, e.length ? P("list.noMatch") : P("list.none"))]), m.textContent = P("list.status", {
			n: e.length,
			spaces: new Set(e.filter(v).map((e) => e.scope)).size
		}), o.focus &&= (p.querySelector(`[data-id="${CSS.escape(o.focus)}"]`)?.scrollIntoView({ block: "nearest" }), null);
	}
	let T = 0, E = () => {
		clearTimeout(T), T = setTimeout(w, 150);
	}, D = [
		n.on("change", E),
		n.on("scope", E),
		c.onWorkspacesChange?.(E) ?? (() => {}),
		N.onChange?.(w) ?? (() => {})
	];
	return a.on("destroy", () => D.forEach((e) => e?.())), w(), a;
}
var _e = 2048, ve = 1024, ye = (e, t = ve) => Number.isFinite(e) ? Math.min(_e, Math.max(16, Math.round(e))) : t;
function be(e, t, { size: n = ve } = {}) {
	e.handle(async (e) => typeof e?.file == "string" ? t(e.file, ye(e.size, n)) : null);
}
async function xe(e, t = .85) {
	let n = e;
	typeof n?.toBlob != "function" && (n = document.createElement("canvas"), n.width = Math.max(1, e.width), n.height = Math.max(1, e.height), n.getContext("2d").drawImage(e, 0, 0));
	let r = (e) => new Promise((r) => n.toBlob(r, e, t)), i = await r("image/webp");
	return i?.type === "image/webp" ? i : r("image/png");
}
// src/stickynotes/preview.js
var Se = 16384;
function Ce({ lilos: e }) {
	be(e, async (t, n) => {
		let r = await e.files.info(t), i = r.size ? new TextDecoder().decode(await new Blob([await e.files.read(t, { bytes: !0 })]).slice(0, Se).arrayBuffer()) : "";
		if (i.includes("\0")) return null;
		let a = d[r.meta?.color] ?? d.yellow;
		return { image: await xe(we(D(i), a, n)) };
	}, { size: 512 });
}
function we({ title: e, body: t }, n, r) {
	let i = document.createElement("canvas");
	i.width = i.height = r;
	let a = i.getContext("2d"), o = Math.round(r * .08);
	a.fillStyle = n, a.fillRect(0, 0, r, r), a.fillStyle = p, a.textBaseline = "top";
	let s = Math.max(6, r / 13), c = s * 1.35, l = r - o * 2, u = o, d = (e, { bold: t = !1, mark: n = "" } = {}) => {
		if (u + c > r - o / 2) return;
		a.font = `${t ? 700 : 400} ${t ? s * 1.08 : s}px Manrope, system-ui, sans-serif`;
		let i = n + O(e);
		for (; i && a.measureText(i).width > l;) i = i.slice(0, -2) + "…";
		a.globalAlpha = n === "☑ " ? .6 : 1, a.fillText(i, o, u), a.globalAlpha = 1, u += c;
	};
	e && d(e, { bold: !0 });
	for (let e of t) d(e.text, { mark: e.kind === "check" ? e.done ? "☑ " : "☐ " : e.kind === "bullet" ? "• " : "" });
	return i;
}
// src/stickynotes/StickyNotesApp.js
function Te({ args: e, openWindow: t } = {}) {
	let n = Ee(e);
	return n.on("launch", (e) => {
		let r = Ee(e, n);
		r && t?.(r, r.key);
	}), n;
}
function Ee(e, t = null) {
	let r = typeof e?.file == "string" ? n.get(e.file) : null;
	if (r && M(r)) return t?.noteId === r.id ? null : ke(r);
	if (t && !t.noteId) return null;
	let i = ge({ args: e });
	return i.key = "stickynotes:list", i;
}
var De = { note: pe };
function Oe({ args: e } = {}) {
	let i = new t({
		title: P("app.name"),
		icon: "note",
		width: 320,
		height: 140
	}), a = typeof e?.note == "string" ? e.note : null, o = (e) => i.body.append(r("p", { class: "sn-empty" }, e));
	return c.revealOnDesk(a).then((e) => {
		if (e) return i.emit("close");
		let t = a && n.get(a);
		if (t) return c.launch("stickynotes", { file: t.id }), i.emit("close");
		o(P("reveal.gone"));
	}, (e) => o(e.message)), i;
}
function ke(e) {
	let i = R(e), a = new t({
		title: i.title || e.name,
		icon: "note",
		width: 360,
		height: 380,
		minWidth: 260,
		minHeight: 220
	}), o = r("div", { class: "sn sn-alone editing" });
	o.style.setProperty("--sn-c", d[i.color]);
	let s = Z({
		id: e.id,
		onColor: (e) => o.style.setProperty("--sn-c", d[e]),
		onEnd: () => a.emit("close")
	});
	o.append(s.area), a.body.append(r("div", { class: "sn-single" }, s.bar, o));
	let c = n.on("change", (t) => {
		t.node?.id === e.id && (t.type === "remove" ? a.emit("close") : a.setTitle?.(R(n.get(e.id) ?? t.node).title || t.node.name));
	});
	return a.noteId = e.id, a.key = `stickynotes:note:${e.id}`, a.getState = () => ({ file: e.id }), a.canClose = async () => (await s.save(), !0), a.on("destroy", () => {
		c(), s.save();
	}), requestAnimationFrame(() => s.focus()), a;
}
export { Te as default, Ce as filePreview, Oe as reveal, De as widgets };
