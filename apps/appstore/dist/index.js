import { Window as e, actionButton as t, appIcon as n, apps as r, fs as i, h as a, icon as o, kernel as s, kernelModules as c, repositories as l, settings as u, textField as d, toast as f, toggle as p } from "/host/sdk.js";
import * as m from "/host/system.js";
import { describePermission as h, launch as ee } from "/host/system.js";
// src/appstore/markdown.js
var g = /(`+)([^`]+?)\1|\*\*(.+?)\*\*|__(.+?)__|\*(?!\s)(.+?)\*|\b_(?!\s)(.+?)_\b|!\[([^\]]*)\]\([^)]*\)|\[([^\]]+)\]\(\s*<?((?:[^()\s<>]|\([^()\s]*\))+)>?(?:\s+"[^"]*")?\s*\)|<(https?:\/\/[^>\s]+)>/;
function _(e) {
	let t = [], n = e;
	for (; n;) {
		let e = g.exec(n);
		if (!e) {
			t.push(n);
			break;
		}
		e.index && t.push(n.slice(0, e.index)), e[2] === void 0 ? e[3] !== void 0 || e[4] !== void 0 ? t.push(a("strong", {}, ..._(e[3] ?? e[4]))) : e[5] !== void 0 || e[6] !== void 0 ? t.push(a("em", {}, ..._(e[5] ?? e[6]))) : e[7] === void 0 ? t.push(v(e[8] ?? e[10], e[9] ?? e[10])) : t.push(e[7] ? `[${e[7]}]` : "") : t.push(a("code", {}, e[2])), n = n.slice(e.index + e[0].length);
	}
	return t;
}
function v(e, t) {
	let n = null;
	try {
		let e = new URL(t);
		(e.protocol === "https:" || e.protocol === "http:") && (n = e.href);
	} catch {}
	let r = _(e);
	return n ? a("a", {
		href: n,
		target: "_blank",
		rel: "noopener noreferrer",
		title: n
	}, ...r) : a("span", {}, ...r);
}
var y = (e) => e.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((e) => e.trim()), b = /^\s{0,3}([-*+]|\d{1,9}[.)])\s+(.*)$/, x = /^\s{0,3}(#{1,6}\s|```|~~~|>|[-*+]\s|\d{1,9}[.)]\s|(-\s*){3,}$|(\*\s*){3,}$)/;
function S(e) {
	let t = String(e).replace(/\r\n?/g, "\n").split("\n"), n = [], r = 0;
	for (; r < t.length;) {
		let e = t[r];
		if (!e.trim()) {
			r++;
			continue;
		}
		let i = /^\s{0,3}(```|~~~)/.exec(e);
		if (i) {
			let e = [];
			for (r++; r < t.length && !t[r].trimStart().startsWith(i[1]); r++) e.push(t[r]);
			r++, n.push(a("pre", {}, a("code", {}, e.join("\n"))));
			continue;
		}
		let o = /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/.exec(e);
		if (o) {
			n.push(a(`h${o[1].length}`, {}, ..._(o[2]))), r++;
			continue;
		}
		if (/^\s{0,3}((-\s*){3,}|(\*\s*){3,}|(_\s*){3,})$/.test(e)) {
			n.push(a("hr")), r++;
			continue;
		}
		if (/^\s{0,3}>/.test(e)) {
			let e = [];
			for (; r < t.length && /^\s{0,3}>/.test(t[r]); r++) e.push(t[r].replace(/^\s{0,3}>\s?/, ""));
			n.push(a("blockquote", {}, ...S(e.join("\n"))));
			continue;
		}
		if (e.includes("|") && /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(t[r + 1] ?? "")) {
			let i = y(e), o = [];
			for (r += 2; r < t.length && t[r].includes("|") && t[r].trim(); r++) o.push(y(t[r]));
			n.push(a("div", { class: "md-table" }, a("table", {}, a("thead", {}, a("tr", {}, ...i.map((e) => a("th", {}, ..._(e))))), a("tbody", {}, ...o.map((e) => a("tr", {}, ...i.map((t, n) => a("td", {}, ..._(e[n] ?? "")))))))));
			continue;
		}
		let s = b.exec(e);
		if (s) {
			let e = /\d/.test(s[1]), i = [];
			for (; r < t.length;) {
				let n = b.exec(t[r]);
				if (n && /\d/.test(n[1]) === e && !/^\s{2,}/.test(t[r])) i.push([n[2]]), r++;
				else if (i.length && t[r].trim() && (/^\s{2,}/.test(t[r]) || !x.test(t[r]))) i.at(-1).push(t[r].trim()), r++;
				else break;
			}
			n.push(a(e ? "ol" : "ul", {}, ...i.map(([e, ...t]) => {
				let n = t.filter((e) => b.test(e)), r = [e, ...t.filter((e) => !b.test(e))].join(" ");
				return a("li", {}, ..._(r), n.length ? S(n.join("\n")) : null);
			})));
			continue;
		}
		let c = [];
		for (; r < t.length && t[r].trim() && !x.test(t[r]); r++) c.push(t[r].trim());
		c.length || (c.push(e.trim()), r++), n.push(a("p", {}, ..._(c.join(" "))));
	}
	return n;
}
// src/appstore/AppStoreApp.js
var C = /* @__PURE__ */ new Set([
	"fs.app",
	"fs.tmp",
	"fs.open",
	"ui.notify",
	"clipboard.write",
	"auth.remote"
]), w = [
	{
		id: "system",
		label: "Sistema"
	},
	{
		id: "productivity",
		label: "Produttività"
	},
	{
		id: "media",
		label: "Multimedia"
	},
	{
		id: "development",
		label: "Sviluppo"
	},
	{
		id: "other",
		label: "Altro"
	},
	{
		id: "kernel",
		label: "Kernel"
	}
], te = {
	glyph: "monitor",
	color: "#5f6673"
}, ne = {
	glyph: "help",
	color: "#5f6673"
};
u.define({ "appstore.showUnofficial": !0 });
var T = (e, t) => {
	let n = e.split(".").map(Number), r = t.split(".").map(Number);
	return (n[0] - r[0] || n[1] - r[1] || n[2] - r[2]) > 0;
}, E = (e) => e.replace(/\.git$/i, "").replace(/\/+$/, ""), D = (e, t) => !!e?.url && E(e.url).toLowerCase() === E(t.url).toLowerCase(), O = (e) => E(e.url).split(/[/\\]/).pop() || e.name, k = (e) => (e ?? []).filter((e) => !C.has(e.split(":")[0]));
function A({ openWindow: g }) {
	let _ = s.user?.role === "admin", v = {
		repos: [],
		catalogs: /* @__PURE__ */ new Map(),
		errors: /* @__PURE__ */ new Map(),
		modules: [],
		loading: !0,
		busy: null,
		pressed: null,
		tab: "installed",
		query: {},
		view: "list",
		key: null,
		newRepo: {
			url: "",
			name: ""
		},
		updates: null
	}, y = new e({
		title: "AppStore",
		icon: "download",
		width: 960,
		height: 640,
		minWidth: 560,
		minHeight: 420
	});
	y.el.classList.add("appstore");
	async function b(e, t, n) {
		if (!v.busy) {
			v.busy = e, $();
			try {
				let e = await t();
				n && f(typeof n == "function" ? n(e) : n, { timeout: 5e3 }), await E({ quiet: !0 });
			} catch (e) {
				f(e.message, { timeout: 7e3 });
			} finally {
				v.busy = null, $();
			}
		}
	}
	async function x() {
		let e = await m.services?.list().catch(() => null);
		v.updates = e?.available ? e.services.find((e) => e.app === "appstore" && e.entry === "updates") ?? null : null;
	}
	async function C(e) {
		try {
			await m.services.setStartup("appstore", "updates", e ? "login" : "none"), await m.services[e ? "start" : "stop"]("appstore", "updates"), f(e ? "L’AppStore controllerà gli aggiornamenti quando entri" : "Controllo degli aggiornamenti all’avvio spento");
		} catch (e) {
			f(e.message, { timeout: 7e3 });
		}
		await x(), $();
	}
	async function E({ quiet: e = !1 } = {}) {
		e || (v.loading = !0, $());
		try {
			v.repos = await l.list(), await Promise.all(v.repos.map(async (e) => {
				try {
					v.catalogs.set(e.id, await l.catalog(e.id)), v.errors.delete(e.id);
				} catch (t) {
					v.catalogs.delete(e.id), v.errors.set(e.id, t.message);
				}
			})), v.modules = _ ? await c.list().catch(() => []) : [], await x(), await r.refresh();
		} catch (e) {
			f(e.message, { timeout: 7e3 });
		}
		v.loading = !1, $();
	}
	let A = () => v.repos.filter((e) => e.official || u.get("appstore.showUnofficial"));
	function j(e, t, n) {
		let r = t?.manifest ?? n.manifest, i = t?.manifest.version ?? null, a = !!n && (!t || D(n.source, e));
		return {
			key: `app:${e?.id ?? "-"}:${r.id}`,
			kind: "app",
			id: r.id,
			name: r.name,
			description: r.description ?? "",
			icon: r.icon ?? ne,
			publisher: r.publisher?.name ?? "",
			category: w.some((e) => e.id === r.category && e.id !== "kernel") ? r.category : "other",
			repo: e,
			entry: t,
			have: n,
			manifest: r,
			readme: t?.readme ?? null,
			readmeTruncated: !!t?.readmeTruncated,
			offered: i,
			installed: n?.version ?? null,
			here: a,
			elsewhere: !!n && !a,
			update: a && i && T(i, n.version) ? i : null,
			required: !!r.required,
			verified: !!n?.signed || !!e?.official
		};
	}
	function M(e, t, n) {
		let r = t?.module ?? n, i = t?.module.version ?? null, a = !!n && (!t || D(n.source, e));
		return {
			key: `module:${e?.id ?? "-"}:${r.name}`,
			kind: "module",
			id: r.name,
			name: r.name,
			description: r.description ?? "",
			icon: t?.module.icon ?? n?.icon ?? te,
			publisher: "",
			category: "kernel",
			repo: e,
			entry: t,
			have: n,
			module: r,
			readme: t?.readme ?? null,
			readmeTruncated: !!t?.readmeTruncated,
			offered: i,
			installed: n ? n.enabled ?? n.running : null,
			here: a,
			elsewhere: !!n && !a,
			update: a && n.enabled && i && T(i, n.enabled) ? i : null,
			provides: r.provides ?? [],
			verified: !!e?.official
		};
	}
	function re() {
		let e = r.list(), t = v.modules.filter((e) => e.enabled || e.running), n = [];
		for (let r of A()) {
			let i = v.catalogs.get(r.id);
			for (let t of i?.apps ?? []) t.manifest && n.push(j(r, t, e.find((e) => e.id === t.manifest.id)));
			if (_) for (let e of i?.modules ?? []) e.module && n.push(M(r, e, t.find((t) => t.name === e.module.name)));
		}
		for (let t of e) n.some((e) => e.kind === "app" && e.here && e.id === t.id) || n.push(j(v.repos.find((e) => D(t.source, e)) ?? null, null, t));
		for (let e of t) n.some((t) => t.kind === "module" && t.here && t.id === e.name) || n.push(M(v.repos.find((t) => D(e.source, t)) ?? null, null, e));
		return n;
	}
	function ie(e) {
		let t = new Set(e.map((e) => e.category));
		return [
			{
				id: "installed",
				label: "Installati",
				filter: (e) => e.here
			},
			{
				id: "updates",
				label: "Aggiornamenti",
				filter: (e) => !!e.update,
				badge: !0
			},
			...w.filter((e) => t.has(e.id) || e.id === "kernel" && _).map((e) => ({
				...e,
				category: !0,
				filter: (t) => t.category === e.id
			}))
		];
	}
	let ae = (e, t) => !t || [
		e.name,
		e.id,
		e.description,
		e.publisher,
		e.repo ? O(e.repo) : ""
	].some((e) => e.toLowerCase().includes(t)), oe = () => _ && v.modules.some((e) => (e.enabled ?? null) !== (e.running ?? null));
	function N({ title: n, name: r, permissions: i = [], official: o, kernelModule: s = !1 }) {
		return new Promise((c) => {
			let l = k(i), u = new e({
				title: n,
				icon: "download",
				width: 440,
				height: s || !o ? 340 : 300,
				minimizable: !1,
				maximizable: !1
			}), d = !1, f = (e) => {
				d || (d = !0, c(e), u.emit("close"));
			};
			u.on("destroy", () => f(null)), u.body.append(a("div", { class: "as-dialog" }, a("p", { class: "as-dialog-lead" }, s ? `${r} è un modulo del kernel: il suo codice girerà nel kernel, con accesso completo a utenti e file.` : `${r} potrà:`), !s && l.length ? a("ul", {}, ...l.map((e) => a("li", {}, h(e)))) : null, !s && !l.length ? a("p", {}, "Nessun permesso oltre ai propri dati.") : null, o ? null : a("p", { class: "as-warning" }, "Non verificata: viene da un repository non ufficiale. Non si può sapere chi l’ha scritta, né che il codice non sia stato modificato. Installala solo se ti fidi di chi la distribuisce."), a("div", { class: "as-dialog-buttons" }, t({
				label: "Annulla",
				onClick: () => f(null)
			}), t({
				label: o ? "Installa" : "Installa comunque",
				primary: o,
				danger: !o,
				onClick: () => f({
					grant: l,
					allowUnsigned: !o
				})
			})))), g(u);
		});
	}
	async function P(e) {
		let { repo: t, entry: n } = e, i = {
			type: "git",
			url: t.url,
			path: n.path,
			ref: v.catalogs.get(t.id)?.ref
		};
		if (e.kind === "module") {
			let n = await N({
				title: `Installa ${e.name}`,
				name: e.name,
				official: t.official,
				kernelModule: !0
			});
			n && b("install", () => c.install(i, { allowUnsigned: n.allowUnsigned }), `${e.name} installato: riavvia il kernel per usarlo`);
			return;
		}
		let a = await N({
			title: `Installa ${e.name}`,
			name: e.name,
			permissions: e.manifest.permissions,
			official: t.official
		});
		a && b("install", () => r.install(i, a), `${e.name} installata`);
	}
	async function F(e) {
		let t = !!e.repo?.official;
		if (e.kind === "module") return t || await N({
			title: `Aggiorna ${e.name}`,
			name: e.name,
			official: t,
			kernelModule: !0
		}) ? { allowUnsigned: !t } : null;
		let n = k(e.entry?.manifest.permissions).filter((t) => !e.have.granted.includes(t));
		return !n.length && t ? {
			grant: [],
			allowUnsigned: !1
		} : N({
			title: `Aggiorna ${e.name}`,
			name: e.name,
			permissions: n,
			official: t
		});
	}
	let I = (e, t) => e.kind === "module" ? c.update(e.id, t) : r.update(e.id, t);
	async function L(e) {
		let t = await F(e);
		t && b("update", () => I(e, t), (t) => t.unchanged ? `${e.name} è già aggiornat${e.kind === "module" ? "o" : "a"}` : e.kind === "module" ? `${e.name} ${t.version} installato: riavvia il kernel` : `${e.name} aggiornata alla ${t.version}`);
	}
	function se(e) {
		b("update", async () => {
			let t = 0;
			for (let n of e) {
				let e = await F(n);
				if (e) try {
					await I(n, e), t++;
				} catch (e) {
					f(`${n.name}: ${e.message}`, { timeout: 7e3 });
				}
			}
			return t;
		}, (e) => e === 1 ? "1 elemento aggiornato" : `${e} elementi aggiornati`);
	}
	function ce(e) {
		e.kind === "module" ? b("remove", () => c.remove(e.id), (t) => `${e.name} rimosso${t.kept.length ? " (i suoi dati restano)" : ""}: riavvia il kernel`) : b("remove", () => r.uninstall(e.id), `${e.name} rimossa`);
	}
	let le = (e) => b("reinstall", () => r.update(e.id, {
		reinstall: !0,
		allowUnsigned: !e.verified
	}), `${e.name} reinstallata`);
	async function ue(e, t) {
		t.disabled = !0, t.setAttribute("aria-busy", "true");
		try {
			let t = await l.readme(e.repo.id, e.entry.path), n = i.children(i.root).find((e) => e.type === "folder" && e.system && e.name === "Download");
			if (!n) throw Error("Manca la cartella Download");
			let r = i.create(n.id, {
				type: "file",
				name: `${e.name} - README.md`
			});
			await i.write(r.id, t), f(`README salvato in Download come «${r.name}»`, { timeout: 6e3 });
		} catch (e) {
			f(e.message, { timeout: 7e3 });
		} finally {
			t.disabled = !1, t.removeAttribute("aria-busy");
		}
	}
	let de = () => b("restart", async () => {
		await c.restart(), await new Promise((e) => setTimeout(e, 2500));
	}, "Kernel riavviato"), R = (e, n, { key: r = "", ...i } = {}) => {
		let a = `${e}|${r}`, o = t({
			label: e,
			onClick: () => (v.pressed = a, n()),
			...i
		});
		return o.disabled = !!v.busy, v.busy && v.pressed === a && o.setAttribute("aria-busy", "true"), o;
	}, z = (e, t = !1) => a("span", { class: "as-state" }, t ? o("check") : null, e), B = (e) => e.repo ? a("span", {
		class: "as-repo",
		title: e.repo.url
	}, o("link"), a("span", {}, O(e.repo))) : a("span", { class: "as-repo" }, o("folder"), a("span", {}, e.kind === "module" ? "Installato a mano" : "Cartella locale")), fe = (e) => e.repo && !e.repo.official ? a("span", { class: "as-unofficial" }, "non ufficiale") : null, V = (e) => e.kind === "module" ? "Installato" : "Installata", H = (e, ...t) => a("div", { class: "as-section-title" }, e, ...t), U = (e, t) => a("div", { class: "as-fact" }, a("b", {}, e), String(t)), W = (e) => a("button", {
		class: "as-back",
		onclick: () => Z("list")
	}, o("arrowLeft"), e);
	function pe(e) {
		return e.update ? _ ? R("Aggiorna", () => L(e), {
			primary: !0,
			key: e.key
		}) : z(`Aggiornamento ${e.update}`) : e.here ? z(e.kind === "module" && !e.have.enabled ? "Rimosso" : V(e), !0) : e.elsewhere ? z("Da un altro repository") : _ ? R("Installa", () => P(e), { key: e.key }) : z("Disponibile");
	}
	function me(e) {
		let t = e.update ? `${e.installed} → ${e.update}` : e.here ? e.installed : e.offered;
		return a("div", { class: "as-card" }, a("div", { class: "as-card-top" }, n(e.icon), a("div", { class: "as-card-head" }, a("button", {
			class: "as-card-open",
			onclick: () => Z("detail", e.key)
		}, e.name, a("span", { class: "as-ver" }, t)), a("div", { class: "as-card-desc" }, e.description))), a("div", { class: "as-card-foot" }, B(e), fe(e), a("span", { class: "as-spacer" }), pe(e)));
	}
	let G = (e) => a("div", { class: "as-grid" }, ...e.map(me));
	function K() {
		let e = [];
		oe() && [
			"installed",
			"updates",
			"kernel"
		].includes(v.tab) && e.push(a("div", { class: "as-banner" }, o("info"), a("span", {}, "Le modifiche ai moduli valgono dal prossimo avvio del kernel."), R("Riavvia il kernel", de, { primary: !0 })));
		let t = A().filter((e) => v.errors.has(e.id));
		return t.length && e.push(a("div", { class: "as-banner" }, o("info"), a("span", {}, t.length === 1 ? `${O(t[0])} non è raggiungibile: quello che offre non è elencato.` : `${t.length} repository non sono raggiungibili: quello che offrono non è elencato.`), a("button", {
			class: "as-link",
			onclick: () => Z("options")
		}, "Dettagli"))), e;
	}
	function he(e, t) {
		let n = (v.query[t.id] ?? "").trim().toLowerCase(), r = e.filter(t.filter).filter((e) => ae(e, n));
		if (X.textContent = v.loading ? "Lettura dei repository…" : `${r.length === 1 ? "1 elemento" : `${r.length} elementi`} · ${A().length} repository`, !r.length) {
			let e = v.loading && t.id !== "installed" ? "Lettura dei repository…" : n ? `Nessun risultato per “${n}” in ${t.label}` : t.id === "updates" ? "Tutto aggiornato" : t.id === "installed" ? "Niente di installato" : "Niente in questa categoria";
			return [...K(), a("div", { class: "as-empty" }, e)];
		}
		if (t.id === "installed") {
			let e = r.filter((e) => e.kind === "app"), t = r.filter((e) => e.kind === "module");
			return [
				...K(),
				e.length ? [H("App"), G(e)] : null,
				t.length ? [H("Moduli del kernel"), G(t)] : null
			];
		}
		if (t.id === "updates") return [
			...K(),
			H(r.length === 1 ? "1 aggiornamento" : `${r.length} aggiornamenti`, _ && r.length > 1 ? a("span", { class: "as-bulk" }, R("Aggiorna tutto", () => se(r), { primary: !0 })) : null),
			G(r)
		];
		let i = (e) => Number(e.here || e.elsewhere);
		return [...K(), G([...r].sort((e, t) => i(e) - i(t) || e.name.localeCompare(t.name)))];
	}
	function ge(e, t) {
		let r = e.kind === "module", i = [];
		e.here && !r && i.push(R("Apri", () => ee(e.id), { primary: !e.update || !_ })), _ && (e.update && i.push(R(`Aggiorna a ${e.update}`, () => L(e), {
			primary: !0,
			key: e.key
		})), e.here && (!r || e.have.enabled) && (!e.update && e.have.source && i.push(R("Cerca aggiornamenti", () => L(e), { key: e.key })), r || i.push(R("Reinstalla", () => le(e), { key: e.key })), e.required || i.push(R("Rimuovi", () => ce(e), {
			danger: !0,
			key: e.key
		}))), !e.here && !e.elsewhere && e.entry && i.push(R(e.repo.official ? "Installa" : "Installa comunque", () => P(e), {
			primary: !0,
			danger: !e.repo.official,
			key: e.key
		})));
		let s = r && e.have ? e.have.enabled ? e.have.running === e.have.enabled ? "In uso" : e.have.running ? `In uso la ${e.have.running} fino al riavvio` : "Attivo dal prossimo avvio" : "Rimosso: attivo fino al riavvio" : null, c = k(e.manifest?.permissions);
		return X.textContent = `${e.name} ${e.offered ?? e.installed}`, a("div", { class: "as-detail" }, W(t.label), a("div", { class: "as-detail-head" }, n(e.icon), a("div", { class: "as-detail-title" }, a("h1", {}, e.name), a("div", { class: "as-sub" }, [
			e.publisher,
			r ? "Modulo del kernel" : "App",
			w.find((t) => t.id === e.category)?.label
		].filter(Boolean).join(" · ")), a("div", { class: "as-meta" }, B(e), e.verified ? a("span", { class: "as-state" }, o("shield"), "Verificata") : e.repo ? a("span", { class: "as-unofficial" }, "non ufficiale · non verificata") : null, e.required ? a("span", { class: "as-state" }, "Necessaria a lilOS") : null, e.elsewhere ? a("span", { class: "as-state" }, `${V(e)} da un altro repository`) : null), i.length ? a("div", { class: "as-detail-actions" }, ...i) : null)), e.repo && !e.repo.official && !e.here ? a("div", { class: "as-banner" }, o("info"), a("span", {}, "Viene da un repository non ufficiale: non si può sapere chi l’ha scritta, né che il codice non sia stato modificato.")) : null, a("div", { class: "as-facts" }, U("Versione", e.offered ?? e.installed), U(V(e), e.installed ?? "—"), U("Repository", e.repo ? O(e.repo) : "—"), r ? U("Fornisce", e.provides.join(", ") || "—") : U("ID", e.id), s ? U("Stato", s) : null), r ? a("div", { class: "as-perm" }, a("h3", {}, o("info"), "Attenzione"), a("p", {}, "Il codice di un modulo gira nel kernel, con accesso completo a utenti e file. Le modifiche valgono dal prossimo avvio del kernel.")) : a("div", { class: "as-perm" }, a("h3", {}, o("shield"), "Potrà"), c.length ? a("ul", {}, ...c.map((e) => a("li", {}, o("check"), h(e)))) : a("p", { class: "as-muted" }, "Nessun permesso oltre ai propri dati.")), a("div", { class: "as-readme-title" }, o("file"), "README.md"), e.readme ? a("article", { class: "as-readme" }, ...S(e.readme)) : null, e.readme && e.readmeTruncated ? a("p", { class: "as-readme-cut" }, "Il README è troppo lungo: qui se ne vede solo l’inizio. ", a("button", {
			class: "as-link",
			onclick: (t) => ue(e, t.currentTarget)
		}, o("download"), "Scarica il README completo")) : null, e.readme ? null : a("p", { class: "as-muted" }, e.repo ? "Questo pacchetto non ha un README." : "Il README si legge dal repository: questo elemento non viene da un repository elencato."));
	}
	function _e() {
		let e = v.updates, t = !e || e.system && !e.canControl, n = e ? e.system ? "Scelto da un amministratore per tutti: si cambia da Sistema → Avvio → Servizi" : "Quando entri e poi ogni giorno, anche con lilOS chiuso: un avviso dice cosa si può aggiornare" : "Serve il motore dei servizi del kernel (modulo services-isolate)", r = p({
			value: !!e && e.startup !== "none",
			label: "Controlla gli aggiornamenti all’avvio",
			onChange: C
		});
		return r.disabled = t, a("div", { class: "as-row" }, a("div", { class: "as-row-text" }, a("b", {}, "Controlla gli aggiornamenti all’avvio"), a("span", {}, n)), r);
	}
	function ve(e) {
		let t = v.newRepo;
		return X.textContent = "Opzioni", a("div", { class: "as-options" }, W(e.label), a("h2", {}, "Opzioni"), a("p", { class: "as-lead" }, "Preferenze dell’AppStore e repository da cui arrivano app e moduli."), H("AppStore"), a("div", { class: "as-group" }, a("div", { class: "as-row" }, a("div", { class: "as-row-text" }, a("b", {}, "Mostra i repository non ufficiali"), a("span", {}, "Se spento, le schede elencano solo quello che offre il repository ufficiale")), p({
			value: u.get("appstore.showUnofficial"),
			label: "Mostra i repository non ufficiali",
			onChange: (e) => u.set("appstore.showUnofficial", e)
		})), _e()), H("Repository", a("span", { class: "as-bulk" }, R("Ricarica", () => E()))), a("div", { class: "as-group" }, ...v.repos.map((e) => {
			let t = v.catalogs.get(e.id), r = (e) => (e ?? []).filter((e) => !e.error).length, i = [...t?.apps ?? [], ...t?.modules ?? []].filter((e) => e.error), o = v.errors.has(e.id) ? `Non raggiungibile: ${v.errors.get(e.id)}` : t ? [
				`${r(t.apps)} app`,
				r(t.modules) === 1 ? "1 modulo" : `${r(t.modules)} moduli`,
				i.length === 1 ? "1 pacchetto non valido" : i.length ? `${i.length} pacchetti non validi` : null
			].filter(Boolean).join(" · ") : "Lettura…";
			return a("div", { class: "as-row" }, n(e.official ? {
				glyph: "shield",
				color: "#30a46c"
			} : {
				glyph: "link",
				color: "#8a909b"
			}), a("div", { class: "as-row-text" }, a("b", {}, O(e), a("span", { class: "as-muted" }, ` · ${e.name}`)), a("span", {}, e.url), a("span", {
				class: v.errors.has(e.id) ? "as-error" : null,
				title: i.map((e) => `${e.path}: ${e.error}`).join("\n") || null
			}, o)), e.official ? a("span", { class: "as-muted" }, "Sempre presente") : _ ? R("Rimuovi", () => b("repo", () => l.remove(e.id), `${O(e)} rimosso`), {
				danger: !0,
				key: e.id
			}) : null);
		})), H("Aggiungi un repository"), _ ? a("div", { class: "as-group" }, a("div", { class: "as-row" }, a("div", { class: "as-row-text" }, a("b", {}, "Indirizzo"), a("span", {}, "Un repository git con catalog.json, per esempio https://github.com/nome/repo")), d({
			value: t.url,
			placeholder: "https://…",
			label: "Indirizzo del repository",
			onInput: (e) => {
				t.url = e;
			}
		})), a("div", { class: "as-row" }, a("div", { class: "as-row-text" }, a("b", {}, "Nome"), a("span", {}, "Facoltativo: altrimenti quello del suo catalogo")), d({
			value: t.name,
			placeholder: "Nome",
			label: "Nome del repository",
			onInput: (e) => {
				t.name = e;
			}
		})), a("div", { class: "as-row as-row-end" }, R("Aggiungi", () => b("repo", async () => {
			let e = await l.add(t.url.trim(), t.name.trim() || void 0);
			return v.newRepo = {
				url: "",
				name: ""
			}, e;
		}, (e) => `${O(e)} aggiunto`), { primary: !0 }))) : a("p", { class: "as-muted" }, "Solo un amministratore aggiunge e rimuove repository."));
	}
	let q = a("input", {
		type: "search",
		autocomplete: "off",
		spellcheck: "false",
		"aria-label": "Cerca"
	}), J = a("div", {
		class: "as-tabs",
		role: "tablist"
	}), Y = a("main", { class: "as-main" }), X = a("span", { class: "as-foot-text" });
	y.body.append(a("div", { class: "as-head" }, a("label", { class: "as-search" }, o("search"), q), J), Y, a("footer", { class: "as-foot" }, X, a("span", { class: "as-spacer" }), a("button", {
		class: "as-link",
		onclick: () => Z("options")
	}, o("gear"), "Opzioni")));
	function Z(e, t = null) {
		v.view = e, v.key = t, $(), Y.scrollTop = 0;
	}
	function Q(e) {
		v.tab = e, Z("list");
	}
	q.addEventListener("input", () => {
		v.query[v.tab] = q.value, v.view = "list", $();
	}), q.addEventListener("keydown", (e) => {
		e.key === "Escape" && q.value && (e.stopPropagation(), q.value = "", q.dispatchEvent(new Event("input")));
	}), J.addEventListener("keydown", (e) => {
		if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
		let t = [...J.querySelectorAll("[role=tab]")];
		t[(t.indexOf(document.activeElement) + (e.key === "ArrowRight" ? 1 : -1) + t.length) % t.length].click(), J.querySelector("[tabindex=\"0\"]")?.focus();
	});
	function $() {
		let e = re(), t = ie(e);
		t.some((e) => e.id === v.tab) || (v.tab = "installed");
		let n = t.find((e) => e.id === v.tab), r = e.filter((e) => e.update).length;
		J.replaceChildren(...t.flatMap((e, n) => [e.category && !t[n - 1].category ? a("span", { class: "as-tab-sep" }) : null, a("button", {
			class: "as-tab",
			role: "tab",
			"aria-selected": String(v.view === "list" && e.id === v.tab),
			tabindex: e.id === v.tab ? "0" : "-1",
			onclick: () => Q(e.id)
		}, e.label, e.badge && r ? a("span", { class: "as-count" }, String(r)) : null)].filter(Boolean))), q.placeholder = `Cerca in ${n.label}`, q.value !== (v.query[v.tab] ?? "") && (q.value = v.query[v.tab] ?? "");
		let i = v.view === "detail" ? e.find((e) => e.key === v.key) : null;
		v.view === "detail" && !i && (v.view = "list");
		let o = v.view === "options" ? ve(n) : i ? ge(i, n) : he(e, n);
		Y.replaceChildren(...[o].flat(3).filter(Boolean));
	}
	y.on("launch", (e) => {
		let t = {
			apps: "installed",
			modules: "kernel"
		}[e?.tab] ?? e?.tab;
		t === "repos" || t === "options" ? Z("options") : typeof t == "string" && Q(t);
	});
	let ye = r.on("change", () => $()), be = u.on("change:appstore.showUnofficial", () => $()), xe = m.services?.on("change", (e) => {
		e.app === "appstore" && x().then($);
	});
	return y.on("destroy", () => {
		ye(), be(), xe?.();
	}), $(), E(), y;
}
export { A as default };
