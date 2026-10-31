import * as e from "/host/sdk.js";
import { Window as t, actionButton as n, appIcon as r, apps as i, fs as a, h as o, icon as s, kernel as c, kernelModules as l, repositories as u, settings as d, textField as f, toast as p, toggle as m } from "/host/sdk.js";
import * as h from "/host/system.js";
import { describePermission as g, launch as ee } from "/host/system.js";
// src/appstore/markdown.js
var _ = /(`+)([^`]+?)\1|\*\*(.+?)\*\*|__(.+?)__|\*(?!\s)(.+?)\*|\b_(?!\s)(.+?)_\b|!\[([^\]]*)\]\([^)]*\)|\[([^\]]+)\]\(\s*<?((?:[^()\s<>]|\([^()\s]*\))+)>?(?:\s+"[^"]*")?\s*\)|<(https?:\/\/[^>\s]+)>/;
function v(e) {
	let t = [], n = e;
	for (; n;) {
		let e = _.exec(n);
		if (!e) {
			t.push(n);
			break;
		}
		e.index && t.push(n.slice(0, e.index)), e[2] === void 0 ? e[3] !== void 0 || e[4] !== void 0 ? t.push(o("strong", {}, ...v(e[3] ?? e[4]))) : e[5] !== void 0 || e[6] !== void 0 ? t.push(o("em", {}, ...v(e[5] ?? e[6]))) : e[7] === void 0 ? t.push(y(e[8] ?? e[10], e[9] ?? e[10])) : t.push(e[7] ? `[${e[7]}]` : "") : t.push(o("code", {}, e[2])), n = n.slice(e.index + e[0].length);
	}
	return t;
}
function y(e, t) {
	let n = null;
	try {
		let e = new URL(t);
		(e.protocol === "https:" || e.protocol === "http:") && (n = e.href);
	} catch {}
	let r = v(e);
	return n ? o("a", {
		href: n,
		target: "_blank",
		rel: "noopener noreferrer",
		title: n
	}, ...r) : o("span", {}, ...r);
}
var b = (e) => e.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((e) => e.trim()), x = /^\s{0,3}([-*+]|\d{1,9}[.)])\s+(.*)$/, S = /^\s{0,3}(#{1,6}\s|```|~~~|>|[-*+]\s|\d{1,9}[.)]\s|(-\s*){3,}$|(\*\s*){3,}$)/;
function C(e) {
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
			r++, n.push(o("pre", {}, o("code", {}, e.join("\n"))));
			continue;
		}
		let a = /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/.exec(e);
		if (a) {
			n.push(o(`h${a[1].length}`, {}, ...v(a[2]))), r++;
			continue;
		}
		if (/^\s{0,3}((-\s*){3,}|(\*\s*){3,}|(_\s*){3,})$/.test(e)) {
			n.push(o("hr")), r++;
			continue;
		}
		if (/^\s{0,3}>/.test(e)) {
			let e = [];
			for (; r < t.length && /^\s{0,3}>/.test(t[r]); r++) e.push(t[r].replace(/^\s{0,3}>\s?/, ""));
			n.push(o("blockquote", {}, ...C(e.join("\n"))));
			continue;
		}
		if (e.includes("|") && /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(t[r + 1] ?? "")) {
			let i = b(e), a = [];
			for (r += 2; r < t.length && t[r].includes("|") && t[r].trim(); r++) a.push(b(t[r]));
			n.push(o("div", { class: "md-table" }, o("table", {}, o("thead", {}, o("tr", {}, ...i.map((e) => o("th", {}, ...v(e))))), o("tbody", {}, ...a.map((e) => o("tr", {}, ...i.map((t, n) => o("td", {}, ...v(e[n] ?? "")))))))));
			continue;
		}
		let s = x.exec(e);
		if (s) {
			let e = /\d/.test(s[1]), i = [];
			for (; r < t.length;) {
				let n = x.exec(t[r]);
				if (n && /\d/.test(n[1]) === e && !/^\s{2,}/.test(t[r])) i.push([n[2]]), r++;
				else if (i.length && t[r].trim() && (/^\s{2,}/.test(t[r]) || !S.test(t[r]))) i.at(-1).push(t[r].trim()), r++;
				else break;
			}
			n.push(o(e ? "ol" : "ul", {}, ...i.map(([e, ...t]) => {
				let n = t.filter((e) => x.test(e)), r = [e, ...t.filter((e) => !x.test(e))].join(" ");
				return o("li", {}, ...v(r), n.length ? C(n.join("\n")) : null);
			})));
			continue;
		}
		let c = [];
		for (; r < t.length && t[r].trim() && !S.test(t[r]); r++) c.push(t[r].trim());
		c.length || (c.push(e.trim()), r++), n.push(o("p", {}, ...v(c.join(" "))));
	}
	return n;
}
// src/shared/i18n.js
function w(t, n) {
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
var { t: T } = w("appstore", {
	en: { strings: {
		"@name": "AppStore",
		"@description": "Installs, updates and removes apps and kernel modules from repositories; checks for updates even with lilOS closed.",
		"@entrypoints.updates.label": "Updates",
		"@entrypoints.updates.params.ore.label": "Check every (hours)",
		"category.system": "System",
		"category.productivity": "Productivity",
		"category.media": "Media",
		"category.development": "Development",
		"category.other": "Other",
		"category.kernel": "Kernel",
		"tab.installed": "Installed",
		"tab.updates": "Updates",
		"search.label": "Search",
		"search.placeholder": "Search in {tab}",
		"action.cancel": "Cancel",
		"action.install": "Install",
		"action.installAnyway": "Install anyway",
		"action.update": "Update",
		"action.updateTo": "Update to {version}",
		"action.updateAll": "Update all",
		"action.checkUpdates": "Check for updates",
		"action.open": "Open",
		"action.reinstall": "Reinstall",
		"action.remove": "Remove",
		"action.restartKernel": "Restart the kernel",
		"action.details": "Details",
		"action.reload": "Reload",
		"action.add": "Add",
		"confirm.installTitle": "Install {name}",
		"confirm.updateTitle": "Update {name}",
		"confirm.kernelModule": "{name} is a kernel module: its code will run in the kernel, with full access to users and files.",
		"confirm.mayDo": "{name} will be able to:",
		"confirm.unverified": "Not verified: it comes from an unofficial repository. There is no way to know who wrote it, or that its code has not been changed. Install it only if you trust whoever distributes it.",
		"permissions.none": "No permissions beyond its own data.",
		"done.appInstalled": "{name} installed",
		"done.moduleInstalled": "{name} installed: restart the kernel to use it",
		"done.appUpToDate": "{name} is already up to date",
		"done.moduleUpToDate": "{name} is already up to date",
		"done.appUpdated": "{name} updated to {version}",
		"done.moduleUpdated": "{name} {version} installed: restart the kernel",
		"done.updatedCount": {
			one: "{n} item updated",
			other: "{n} items updated"
		},
		"done.appRemoved": "{name} removed",
		"done.moduleRemoved": "{name} removed: restart the kernel",
		"done.moduleRemovedDataKept": "{name} removed (its data is kept): restart the kernel",
		"done.appReinstalled": "{name} reinstalled",
		"done.kernelRestarted": "Kernel restarted",
		"done.repoRemoved": "{name} removed",
		"done.repoAdded": "{name} added",
		"updates.atStart": "Check for updates at startup",
		"updates.atStartOn": "The AppStore will check for updates when you sign in",
		"updates.atStartOff": "Checking for updates at startup turned off",
		"updates.needsEngine": "Needs the kernel’s service engine (the services-isolate module)",
		"updates.bySystem": "Chosen by an administrator for everyone: change it in System → Startup → Services",
		"updates.description": "When you sign in and then at intervals (every 24 hours, change it in System → Startup → Services), even with lilOS closed: a notification tells you what can be updated",
		"notify.updates": {
			one: "Update available: {names}. Open the AppStore.",
			other: "{n} updates available: {names}. Open the AppStore."
		},
		"readme.saved": "README saved in Download as “{file}”",
		"readme.truncated": "The README is too long: only its beginning is shown here.",
		"readme.download": "Download the full README",
		"readme.none": "This package has no README.",
		"readme.notFromRepo": "The README is read from the repository: this item does not come from a listed repository.",
		"error.noDownloadFolder": "The Download folder is missing",
		"status.available": "Available",
		"status.updateAvailable": "Update {version}",
		"status.removed": "Removed",
		"status.otherRepo": "From another repository",
		"status.installedApp": "Installed",
		"status.installedModule": "Installed",
		"status.installedElsewhereApp": "Installed from another repository",
		"status.installedElsewhereModule": "Installed from another repository",
		"repo.manual": "Installed manually",
		"repo.localFolder": "Local folder",
		"repo.unofficial": "unofficial",
		"banner.restartNeeded": "Changes to modules take effect from the next kernel start.",
		"banner.repoUnreachable": "{name} is unreachable: what it offers is not listed.",
		"banner.reposUnreachable": {
			one: "{n} repository is unreachable: what it offers is not listed.",
			other: "{n} repositories are unreachable: what they offer is not listed."
		},
		"list.reading": "Reading the repositories…",
		"list.items": {
			one: "{n} item",
			other: "{n} items"
		},
		"list.repos": {
			one: "{n} repository",
			other: "{n} repositories"
		},
		"list.noResults": "No results for “{query}” in {tab}",
		"list.upToDate": "Everything is up to date",
		"list.nothingInstalled": "Nothing installed",
		"list.emptyCategory": "Nothing in this category",
		"list.apps": "Apps",
		"list.modules": "Kernel modules",
		"list.updates": {
			one: "{n} update",
			other: "{n} updates"
		},
		"detail.kindApp": "App",
		"detail.kindModule": "Kernel module",
		"detail.verified": "Verified",
		"detail.unverified": "unofficial · not verified",
		"detail.required": "Required by lilOS",
		"detail.unofficialWarning": "It comes from an unofficial repository: there is no way to know who wrote it, or that its code has not been changed.",
		"detail.version": "Version",
		"detail.repository": "Repository",
		"detail.provides": "Provides",
		"detail.id": "ID",
		"detail.state": "Status",
		"detail.warning": "Warning",
		"detail.moduleWarning": "A module’s code runs in the kernel, with full access to users and files. Changes take effect from the next kernel start.",
		"detail.mayDo": "Allowed to",
		"moduleState.removed": "Removed: active until restart",
		"moduleState.oldUntilRestart": "{version} in use until restart",
		"moduleState.nextStart": "Active from the next start",
		"moduleState.inUse": "In use",
		"options.title": "Options",
		"options.lead": "AppStore preferences and the repositories apps and modules come from.",
		"options.showUnofficial": "Show unofficial repositories",
		"options.showUnofficialHint": "When off, the tabs list only what the official repository offers",
		"options.repositories": "Repositories",
		"options.unreachable": "Unreachable: {error}",
		"options.apps": {
			one: "{n} app",
			other: "{n} apps"
		},
		"options.modules": {
			one: "{n} module",
			other: "{n} modules"
		},
		"options.invalid": {
			one: "{n} invalid package",
			other: "{n} invalid packages"
		},
		"options.reading": "Reading…",
		"options.alwaysThere": "Always present",
		"options.addRepo": "Add a repository",
		"options.address": "Address",
		"options.addressHint": "A git repository with catalog.json, for example https://github.com/name/repo",
		"options.addressLabel": "Repository address",
		"options.name": "Name",
		"options.nameHint": "Optional: otherwise the one in its catalog",
		"options.nameLabel": "Repository name",
		"options.adminOnly": "Only an administrator can add and remove repositories."
	} },
	it: { strings: {
		"@name": "AppStore",
		"@description": "Installa, aggiorna e rimuove app e moduli del kernel dai repository; controlla gli aggiornamenti anche a lilOS chiuso.",
		"@entrypoints.updates.label": "Aggiornamenti",
		"@entrypoints.updates.params.ore.label": "Controlla ogni (ore)",
		"category.system": "Sistema",
		"category.productivity": "Produttività",
		"category.media": "Multimedia",
		"category.development": "Sviluppo",
		"category.other": "Altro",
		"category.kernel": "Kernel",
		"tab.installed": "Installati",
		"tab.updates": "Aggiornamenti",
		"search.label": "Cerca",
		"search.placeholder": "Cerca in {tab}",
		"action.cancel": "Annulla",
		"action.install": "Installa",
		"action.installAnyway": "Installa comunque",
		"action.update": "Aggiorna",
		"action.updateTo": "Aggiorna a {version}",
		"action.updateAll": "Aggiorna tutto",
		"action.checkUpdates": "Cerca aggiornamenti",
		"action.open": "Apri",
		"action.reinstall": "Reinstalla",
		"action.remove": "Rimuovi",
		"action.restartKernel": "Riavvia il kernel",
		"action.details": "Dettagli",
		"action.reload": "Ricarica",
		"action.add": "Aggiungi",
		"confirm.installTitle": "Installa {name}",
		"confirm.updateTitle": "Aggiorna {name}",
		"confirm.kernelModule": "{name} è un modulo del kernel: il suo codice girerà nel kernel, con accesso completo a utenti e file.",
		"confirm.mayDo": "{name} potrà:",
		"confirm.unverified": "Non verificata: viene da un repository non ufficiale. Non si può sapere chi l’ha scritta, né che il codice non sia stato modificato. Installala solo se ti fidi di chi la distribuisce.",
		"permissions.none": "Nessun permesso oltre ai propri dati.",
		"done.appInstalled": "{name} installata",
		"done.moduleInstalled": "{name} installato: riavvia il kernel per usarlo",
		"done.appUpToDate": "{name} è già aggiornata",
		"done.moduleUpToDate": "{name} è già aggiornato",
		"done.appUpdated": "{name} aggiornata alla {version}",
		"done.moduleUpdated": "{name} {version} installato: riavvia il kernel",
		"done.updatedCount": {
			one: "{n} elemento aggiornato",
			other: "{n} elementi aggiornati"
		},
		"done.appRemoved": "{name} rimossa",
		"done.moduleRemoved": "{name} rimosso: riavvia il kernel",
		"done.moduleRemovedDataKept": "{name} rimosso (i suoi dati restano): riavvia il kernel",
		"done.appReinstalled": "{name} reinstallata",
		"done.kernelRestarted": "Kernel riavviato",
		"done.repoRemoved": "{name} rimosso",
		"done.repoAdded": "{name} aggiunto",
		"updates.atStart": "Controlla gli aggiornamenti all’avvio",
		"updates.atStartOn": "L’AppStore controllerà gli aggiornamenti quando entri",
		"updates.atStartOff": "Controllo degli aggiornamenti all’avvio spento",
		"updates.needsEngine": "Serve il motore dei servizi del kernel (modulo services-isolate)",
		"updates.bySystem": "Scelto da un amministratore per tutti: si cambia da Sistema → Avvio → Servizi",
		"updates.description": "Quando entri e poi a intervalli (ogni 24 ore, si cambia in Sistema → Avvio → Servizi), anche con lilOS chiuso: un avviso dice cosa si può aggiornare",
		"notify.updates": {
			one: "Aggiornamento disponibile: {names}. Apri l’AppStore.",
			other: "{n} aggiornamenti disponibili: {names}. Apri l’AppStore."
		},
		"readme.saved": "README salvato in Download come «{file}»",
		"readme.truncated": "Il README è troppo lungo: qui se ne vede solo l’inizio.",
		"readme.download": "Scarica il README completo",
		"readme.none": "Questo pacchetto non ha un README.",
		"readme.notFromRepo": "Il README si legge dal repository: questo elemento non viene da un repository elencato.",
		"error.noDownloadFolder": "Manca la cartella Download",
		"status.available": "Disponibile",
		"status.updateAvailable": "Aggiornamento {version}",
		"status.removed": "Rimosso",
		"status.otherRepo": "Da un altro repository",
		"status.installedApp": "Installata",
		"status.installedModule": "Installato",
		"status.installedElsewhereApp": "Installata da un altro repository",
		"status.installedElsewhereModule": "Installato da un altro repository",
		"repo.manual": "Installato a mano",
		"repo.localFolder": "Cartella locale",
		"repo.unofficial": "non ufficiale",
		"banner.restartNeeded": "Le modifiche ai moduli valgono dal prossimo avvio del kernel.",
		"banner.repoUnreachable": "{name} non è raggiungibile: quello che offre non è elencato.",
		"banner.reposUnreachable": {
			one: "{n} repository non è raggiungibile: quello che offre non è elencato.",
			other: "{n} repository non sono raggiungibili: quello che offrono non è elencato."
		},
		"list.reading": "Lettura dei repository…",
		"list.items": {
			one: "{n} elemento",
			other: "{n} elementi"
		},
		"list.repos": {
			one: "{n} repository",
			other: "{n} repository"
		},
		"list.noResults": "Nessun risultato per “{query}” in {tab}",
		"list.upToDate": "Tutto aggiornato",
		"list.nothingInstalled": "Niente di installato",
		"list.emptyCategory": "Niente in questa categoria",
		"list.apps": "App",
		"list.modules": "Moduli del kernel",
		"list.updates": {
			one: "{n} aggiornamento",
			other: "{n} aggiornamenti"
		},
		"detail.kindApp": "App",
		"detail.kindModule": "Modulo del kernel",
		"detail.verified": "Verificata",
		"detail.unverified": "non ufficiale · non verificata",
		"detail.required": "Necessaria a lilOS",
		"detail.unofficialWarning": "Viene da un repository non ufficiale: non si può sapere chi l’ha scritta, né che il codice non sia stato modificato.",
		"detail.version": "Versione",
		"detail.repository": "Repository",
		"detail.provides": "Fornisce",
		"detail.id": "ID",
		"detail.state": "Stato",
		"detail.warning": "Attenzione",
		"detail.moduleWarning": "Il codice di un modulo gira nel kernel, con accesso completo a utenti e file. Le modifiche valgono dal prossimo avvio del kernel.",
		"detail.mayDo": "Potrà",
		"moduleState.removed": "Rimosso: attivo fino al riavvio",
		"moduleState.oldUntilRestart": "In uso la {version} fino al riavvio",
		"moduleState.nextStart": "Attivo dal prossimo avvio",
		"moduleState.inUse": "In uso",
		"options.title": "Opzioni",
		"options.lead": "Preferenze dell’AppStore e repository da cui arrivano app e moduli.",
		"options.showUnofficial": "Mostra i repository non ufficiali",
		"options.showUnofficialHint": "Se spento, le schede elencano solo quello che offre il repository ufficiale",
		"options.repositories": "Repository",
		"options.unreachable": "Non raggiungibile: {error}",
		"options.apps": {
			one: "{n} app",
			other: "{n} app"
		},
		"options.modules": {
			one: "{n} modulo",
			other: "{n} moduli"
		},
		"options.invalid": {
			one: "{n} pacchetto non valido",
			other: "{n} pacchetti non validi"
		},
		"options.reading": "Lettura…",
		"options.alwaysThere": "Sempre presente",
		"options.addRepo": "Aggiungi un repository",
		"options.address": "Indirizzo",
		"options.addressHint": "Un repository git con catalog.json, per esempio https://github.com/nome/repo",
		"options.addressLabel": "Indirizzo del repository",
		"options.name": "Nome",
		"options.nameHint": "Facoltativo: altrimenti quello del suo catalogo",
		"options.nameLabel": "Nome del repository",
		"options.adminOnly": "Solo un amministratore aggiunge e rimuove repository."
	} }
}), E = /* @__PURE__ */ new Set([
	"fs.app",
	"fs.tmp",
	"fs.open",
	"ui.notify",
	"clipboard.write",
	"auth.remote"
]), te = () => [
	{
		id: "system",
		label: T("category.system")
	},
	{
		id: "productivity",
		label: T("category.productivity")
	},
	{
		id: "media",
		label: T("category.media")
	},
	{
		id: "development",
		label: T("category.development")
	},
	{
		id: "other",
		label: T("category.other")
	},
	{
		id: "kernel",
		label: T("category.kernel")
	}
], ne = /* @__PURE__ */ new Set([
	"system",
	"productivity",
	"media",
	"development",
	"other"
]), re = {
	glyph: "monitor",
	color: "#5f6673"
}, ie = {
	glyph: "help",
	color: "#5f6673"
};
d.define({ "appstore.showUnofficial": !0 });
var D = (e, t) => {
	let n = e.split(".").map(Number), r = t.split(".").map(Number);
	return (n[0] - r[0] || n[1] - r[1] || n[2] - r[2]) > 0;
}, O = (e) => e.replace(/\.git$/i, "").replace(/\/+$/, ""), k = (e, t) => !!e?.url && O(e.url).toLowerCase() === O(t.url).toLowerCase(), A = (e) => O(e.url).split(/[/\\]/).pop() || e.name, j = (e) => (e ?? []).filter((e) => !E.has(e.split(":")[0]));
function M({ openWindow: _ }) {
	let v = c.user?.role === "admin", y = {
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
	}, b = new t({
		title: "AppStore",
		icon: "download",
		width: 960,
		height: 640,
		minWidth: 560,
		minHeight: 420
	});
	b.el.classList.add("appstore");
	async function x(e, t, n) {
		if (!y.busy) {
			y.busy = e, $();
			try {
				let e = await t();
				n && p(typeof n == "function" ? n(e) : n, { timeout: 5e3 }), await E({ quiet: !0 });
			} catch (e) {
				p(e.message, { timeout: 7e3 });
			} finally {
				y.busy = null, $();
			}
		}
	}
	async function S() {
		let e = await h.services?.list().catch(() => null);
		y.updates = e?.available ? e.services.find((e) => e.app === "appstore" && e.entry === "updates") ?? null : null;
	}
	async function w(e) {
		try {
			await h.services.setStartup("appstore", "updates", e ? "login" : "none"), await h.services[e ? "start" : "stop"]("appstore", "updates"), p(T(e ? "updates.atStartOn" : "updates.atStartOff"));
		} catch (e) {
			p(e.message, { timeout: 7e3 });
		}
		await S(), $();
	}
	async function E({ quiet: e = !1 } = {}) {
		e || (y.loading = !0, $());
		try {
			y.repos = await u.list(), await Promise.all(y.repos.map(async (e) => {
				try {
					y.catalogs.set(e.id, await u.catalog(e.id)), y.errors.delete(e.id);
				} catch (t) {
					y.catalogs.delete(e.id), y.errors.set(e.id, t.message);
				}
			})), y.modules = v ? await l.list().catch(() => []) : [], await S(), await i.refresh();
		} catch (e) {
			p(e.message, { timeout: 7e3 });
		}
		y.loading = !1, $();
	}
	let O = () => y.repos.filter((e) => e.official || d.get("appstore.showUnofficial"));
	function M(t, n, r) {
		let i = n?.manifest ?? r.manifest, a = (n ? n.locales && e.locale?.manifest(n.manifest, n.locales) : e.locale?.manifest(r.manifest)) || i, o = n?.manifest.version ?? null, s = !!r && (!n || k(r.source, t));
		return {
			key: `app:${t?.id ?? "-"}:${i.id}`,
			kind: "app",
			id: i.id,
			name: a.name,
			description: a.description ?? "",
			icon: i.icon ?? ie,
			publisher: i.publisher?.name ?? "",
			category: ne.has(i.category) ? i.category : "other",
			repo: t,
			entry: n,
			have: r,
			manifest: i,
			readme: n?.readme ?? null,
			readmeTruncated: !!n?.readmeTruncated,
			offered: o,
			installed: r?.version ?? null,
			here: s,
			elsewhere: !!r && !s,
			update: s && o && D(o, r.version) ? o : null,
			required: !!i.required,
			verified: !!r?.signed || !!t?.official
		};
	}
	function N(e, t, n) {
		let r = t?.module ?? n, i = t?.module.version ?? null, a = !!n && (!t || k(n.source, e));
		return {
			key: `module:${e?.id ?? "-"}:${r.name}`,
			kind: "module",
			id: r.name,
			name: r.name,
			description: r.description ?? "",
			icon: t?.module.icon ?? n?.icon ?? re,
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
			update: a && n.enabled && i && D(i, n.enabled) ? i : null,
			provides: r.provides ?? [],
			verified: !!e?.official
		};
	}
	function ae() {
		let e = i.list(), t = y.modules.filter((e) => e.enabled || e.running), n = [];
		for (let r of O()) {
			let i = y.catalogs.get(r.id);
			for (let t of i?.apps ?? []) t.manifest && n.push(M(r, t, e.find((e) => e.id === t.manifest.id)));
			if (v) for (let e of i?.modules ?? []) e.module && n.push(N(r, e, t.find((t) => t.name === e.module.name)));
		}
		for (let t of e) n.some((e) => e.kind === "app" && e.here && e.id === t.id) || n.push(M(y.repos.find((e) => k(t.source, e)) ?? null, null, t));
		for (let e of t) n.some((t) => t.kind === "module" && t.here && t.id === e.name) || n.push(N(y.repos.find((t) => k(e.source, t)) ?? null, null, e));
		return n;
	}
	function oe(e) {
		let t = new Set(e.map((e) => e.category));
		return [
			{
				id: "installed",
				label: T("tab.installed"),
				filter: (e) => e.here
			},
			{
				id: "updates",
				label: T("tab.updates"),
				filter: (e) => !!e.update,
				badge: !0
			},
			...te().filter((e) => t.has(e.id) || e.id === "kernel" && v).map((e) => ({
				...e,
				category: !0,
				filter: (t) => t.category === e.id
			}))
		];
	}
	let se = (e, t) => !t || [
		e.name,
		e.id,
		e.description,
		e.publisher,
		e.repo ? A(e.repo) : ""
	].some((e) => e.toLowerCase().includes(t)), ce = () => v && y.modules.some((e) => (e.enabled ?? null) !== (e.running ?? null));
	function P({ title: e, name: r, permissions: i = [], official: a, kernelModule: s = !1 }) {
		return new Promise((c) => {
			let l = j(i), u = new t({
				title: e,
				icon: "download",
				width: 440,
				height: s || !a ? 340 : 300,
				minimizable: !1,
				maximizable: !1
			}), d = !1, f = (e) => {
				d || (d = !0, c(e), u.emit("close"));
			};
			u.on("destroy", () => f(null)), u.body.append(o("div", { class: "as-dialog" }, o("p", { class: "as-dialog-lead" }, T(s ? "confirm.kernelModule" : "confirm.mayDo", { name: r })), !s && l.length ? o("ul", {}, ...l.map((e) => o("li", {}, g(e)))) : null, !s && !l.length ? o("p", {}, T("permissions.none")) : null, a ? null : o("p", { class: "as-warning" }, T("confirm.unverified")), o("div", { class: "as-dialog-buttons" }, n({
				label: T("action.cancel"),
				onClick: () => f(null)
			}), n({
				label: T(a ? "action.install" : "action.installAnyway"),
				primary: a,
				danger: !a,
				onClick: () => f({
					grant: l,
					allowUnsigned: !a
				})
			})))), _(u);
		});
	}
	async function F(e) {
		let { repo: t, entry: n } = e, r = {
			type: "git",
			url: t.url,
			path: n.path,
			ref: y.catalogs.get(t.id)?.ref
		};
		if (e.kind === "module") {
			let n = await P({
				title: T("confirm.installTitle", { name: e.name }),
				name: e.name,
				official: t.official,
				kernelModule: !0
			});
			n && x("install", () => l.install(r, { allowUnsigned: n.allowUnsigned }), T("done.moduleInstalled", { name: e.name }));
			return;
		}
		let a = await P({
			title: T("confirm.installTitle", { name: e.name }),
			name: e.name,
			permissions: e.manifest.permissions,
			official: t.official
		});
		a && x("install", () => i.install(r, a), T("done.appInstalled", { name: e.name }));
	}
	async function I(e) {
		let t = !!e.repo?.official;
		if (e.kind === "module") return t || await P({
			title: T("confirm.updateTitle", { name: e.name }),
			name: e.name,
			official: t,
			kernelModule: !0
		}) ? { allowUnsigned: !t } : null;
		let n = j(e.entry?.manifest.permissions).filter((t) => !e.have.granted.includes(t));
		return !n.length && t ? {
			grant: [],
			allowUnsigned: !1
		} : P({
			title: T("confirm.updateTitle", { name: e.name }),
			name: e.name,
			permissions: n,
			official: t
		});
	}
	let L = (e, t) => e.kind === "module" ? l.update(e.id, t) : i.update(e.id, t);
	async function R(e) {
		let t = await I(e);
		if (!t) return;
		let n = e.kind === "module", r = e.name;
		x("update", () => L(e, t), (e) => e.unchanged ? T(n ? "done.moduleUpToDate" : "done.appUpToDate", { name: r }) : T(n ? "done.moduleUpdated" : "done.appUpdated", {
			name: r,
			version: e.version
		}));
	}
	function le(e) {
		x("update", async () => {
			let t = 0;
			for (let n of e) {
				let e = await I(n);
				if (e) try {
					await L(n, e), t++;
				} catch (e) {
					p(`${n.name}: ${e.message}`, { timeout: 7e3 });
				}
			}
			return t;
		}, (e) => T("done.updatedCount", { n: e }));
	}
	function ue(e) {
		let t = e.name;
		e.kind === "module" ? x("remove", () => l.remove(e.id), (e) => e.kept.length ? T("done.moduleRemovedDataKept", { name: t }) : T("done.moduleRemoved", { name: t })) : x("remove", () => i.uninstall(e.id), T("done.appRemoved", { name: t }));
	}
	let de = (e) => x("reinstall", () => i.update(e.id, {
		reinstall: !0,
		allowUnsigned: !e.verified
	}), T("done.appReinstalled", { name: e.name }));
	async function fe(e, t) {
		t.disabled = !0, t.setAttribute("aria-busy", "true");
		try {
			let t = await u.readme(e.repo.id, e.entry.path), n = a.children(a.root).find((e) => e.type === "folder" && e.system && e.name === "Download");
			if (!n) throw Error(T("error.noDownloadFolder"));
			let r = a.create(n.id, {
				type: "file",
				name: `${e.name} - README.md`
			});
			await a.write(r.id, t), p(T("readme.saved", { file: r.name }), { timeout: 6e3 });
		} catch (e) {
			p(e.message, { timeout: 7e3 });
		} finally {
			t.disabled = !1, t.removeAttribute("aria-busy");
		}
	}
	let pe = () => x("restart", async () => {
		await l.restart(), await new Promise((e) => setTimeout(e, 2500));
	}, T("done.kernelRestarted")), z = (e, t, { key: r = "", ...i } = {}) => {
		let a = `${e}|${r}`, o = n({
			label: e,
			onClick: () => (y.pressed = a, t()),
			...i
		});
		return o.disabled = !!y.busy, y.busy && y.pressed === a && o.setAttribute("aria-busy", "true"), o;
	}, B = (e, t = !1) => o("span", { class: "as-state" }, t ? s("check") : null, e), V = (e) => e.repo ? o("span", {
		class: "as-repo",
		title: e.repo.url
	}, s("link"), o("span", {}, A(e.repo))) : o("span", { class: "as-repo" }, s("folder"), o("span", {}, e.kind === "module" ? T("repo.manual") : T("repo.localFolder"))), me = (e) => e.repo && !e.repo.official ? o("span", { class: "as-unofficial" }, T("repo.unofficial")) : null, H = (e) => e.kind === "module" ? T("status.installedModule") : T("status.installedApp"), U = (e, ...t) => o("div", { class: "as-section-title" }, e, ...t), W = (e, t) => o("div", { class: "as-fact" }, o("b", {}, e), String(t)), G = (e) => o("button", {
		class: "as-back",
		onclick: () => Q("list")
	}, s("arrowLeft"), e);
	function he(e) {
		return e.update ? v ? z(T("action.update"), () => R(e), {
			primary: !0,
			key: e.key
		}) : B(T("status.updateAvailable", { version: e.update })) : e.here ? B(e.kind === "module" && !e.have.enabled ? T("status.removed") : H(e), !0) : e.elsewhere ? B(T("status.otherRepo")) : v ? z(T("action.install"), () => F(e), { key: e.key }) : B(T("status.available"));
	}
	function ge(e) {
		let t = e.update ? `${e.installed} → ${e.update}` : e.here ? e.installed : e.offered;
		return o("div", { class: "as-card" }, o("div", { class: "as-card-top" }, r(e.icon), o("div", { class: "as-card-head" }, o("button", {
			class: "as-card-open",
			onclick: () => Q("detail", e.key)
		}, e.name, o("span", { class: "as-ver" }, t)), o("div", { class: "as-card-desc" }, e.description))), o("div", { class: "as-card-foot" }, V(e), me(e), o("span", { class: "as-spacer" }), he(e)));
	}
	let K = (e) => o("div", { class: "as-grid" }, ...e.map(ge));
	function q() {
		let e = [];
		ce() && [
			"installed",
			"updates",
			"kernel"
		].includes(y.tab) && e.push(o("div", { class: "as-banner" }, s("info"), o("span", {}, T("banner.restartNeeded")), z(T("action.restartKernel"), pe, { primary: !0 })));
		let t = O().filter((e) => y.errors.has(e.id));
		return t.length && e.push(o("div", { class: "as-banner" }, s("info"), o("span", {}, t.length === 1 ? T("banner.repoUnreachable", { name: A(t[0]) }) : T("banner.reposUnreachable", { n: t.length })), o("button", {
			class: "as-link",
			onclick: () => Q("options")
		}, T("action.details")))), e;
	}
	function _e(e, t) {
		let n = (y.query[t.id] ?? "").trim().toLowerCase(), r = e.filter(t.filter).filter((e) => se(e, n));
		if (Z.textContent = y.loading ? T("list.reading") : `${T("list.items", { n: r.length })} · ${T("list.repos", { n: O().length })}`, !r.length) {
			let e = y.loading && t.id !== "installed" ? T("list.reading") : n ? T("list.noResults", {
				query: n,
				tab: t.label
			}) : t.id === "updates" ? T("list.upToDate") : t.id === "installed" ? T("list.nothingInstalled") : T("list.emptyCategory");
			return [...q(), o("div", { class: "as-empty" }, e)];
		}
		if (t.id === "installed") {
			let e = r.filter((e) => e.kind === "app"), t = r.filter((e) => e.kind === "module");
			return [
				...q(),
				e.length ? [U(T("list.apps")), K(e)] : null,
				t.length ? [U(T("list.modules")), K(t)] : null
			];
		}
		if (t.id === "updates") return [
			...q(),
			U(T("list.updates", { n: r.length }), v && r.length > 1 ? o("span", { class: "as-bulk" }, z(T("action.updateAll"), () => le(r), { primary: !0 })) : null),
			K(r)
		];
		let i = (e) => Number(e.here || e.elsewhere);
		return [...q(), K([...r].sort((e, t) => i(e) - i(t) || e.name.localeCompare(t.name)))];
	}
	function ve(e, t) {
		let n = e.kind === "module", i = [];
		e.here && !n && i.push(z(T("action.open"), () => ee(e.id), { primary: !e.update || !v })), v && (e.update && i.push(z(T("action.updateTo", { version: e.update }), () => R(e), {
			primary: !0,
			key: e.key
		})), e.here && (!n || e.have.enabled) && (!e.update && e.have.source && i.push(z(T("action.checkUpdates"), () => R(e), { key: e.key })), n || i.push(z(T("action.reinstall"), () => de(e), { key: e.key })), e.required || i.push(z(T("action.remove"), () => ue(e), {
			danger: !0,
			key: e.key
		}))), !e.here && !e.elsewhere && e.entry && i.push(z(e.repo.official ? T("action.install") : T("action.installAnyway"), () => F(e), {
			primary: !0,
			danger: !e.repo.official,
			key: e.key
		})));
		let a = n && e.have ? e.have.enabled ? e.have.running === e.have.enabled ? T("moduleState.inUse") : e.have.running ? T("moduleState.oldUntilRestart", { version: e.have.running }) : T("moduleState.nextStart") : T("moduleState.removed") : null, c = j(e.manifest?.permissions);
		return Z.textContent = `${e.name} ${e.offered ?? e.installed}`, o("div", { class: "as-detail" }, G(t.label), o("div", { class: "as-detail-head" }, r(e.icon), o("div", { class: "as-detail-title" }, o("h1", {}, e.name), o("div", { class: "as-sub" }, [
			e.publisher,
			T(n ? "detail.kindModule" : "detail.kindApp"),
			te().find((t) => t.id === e.category)?.label
		].filter(Boolean).join(" · ")), o("div", { class: "as-meta" }, V(e), e.verified ? o("span", { class: "as-state" }, s("shield"), T("detail.verified")) : e.repo ? o("span", { class: "as-unofficial" }, T("detail.unverified")) : null, e.required ? o("span", { class: "as-state" }, T("detail.required")) : null, e.elsewhere ? o("span", { class: "as-state" }, T(n ? "status.installedElsewhereModule" : "status.installedElsewhereApp")) : null), i.length ? o("div", { class: "as-detail-actions" }, ...i) : null)), e.repo && !e.repo.official && !e.here ? o("div", { class: "as-banner" }, s("info"), o("span", {}, T("detail.unofficialWarning"))) : null, o("div", { class: "as-facts" }, W(T("detail.version"), e.offered ?? e.installed), W(H(e), e.installed ?? "—"), W(T("detail.repository"), e.repo ? A(e.repo) : "—"), n ? W(T("detail.provides"), e.provides.join(", ") || "—") : W(T("detail.id"), e.id), a ? W(T("detail.state"), a) : null), n ? o("div", { class: "as-perm" }, o("h3", {}, s("info"), T("detail.warning")), o("p", {}, T("detail.moduleWarning"))) : o("div", { class: "as-perm" }, o("h3", {}, s("shield"), T("detail.mayDo")), c.length ? o("ul", {}, ...c.map((e) => o("li", {}, s("check"), g(e)))) : o("p", { class: "as-muted" }, T("permissions.none"))), o("div", { class: "as-readme-title" }, s("file"), "README.md"), e.readme ? o("article", { class: "as-readme" }, ...C(e.readme)) : null, e.readme && e.readmeTruncated ? o("p", { class: "as-readme-cut" }, T("readme.truncated"), " ", o("button", {
			class: "as-link",
			onclick: (t) => fe(e, t.currentTarget)
		}, s("download"), T("readme.download"))) : null, e.readme ? null : o("p", { class: "as-muted" }, e.repo ? T("readme.none") : T("readme.notFromRepo")));
	}
	function ye() {
		let e = y.updates, t = !e || e.system && !e.canControl, n = e ? e.system ? T("updates.bySystem") : T("updates.description") : T("updates.needsEngine"), r = m({
			value: !!e && e.startup !== "none",
			label: T("updates.atStart"),
			onChange: w
		});
		return r.disabled = t, o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, T("updates.atStart")), o("span", {}, n)), r);
	}
	function be(e) {
		let t = y.newRepo;
		return Z.textContent = T("options.title"), o("div", { class: "as-options" }, G(e.label), o("h2", {}, T("options.title")), o("p", { class: "as-lead" }, T("options.lead")), U("AppStore"), o("div", { class: "as-group" }, o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, T("options.showUnofficial")), o("span", {}, T("options.showUnofficialHint"))), m({
			value: d.get("appstore.showUnofficial"),
			label: T("options.showUnofficial"),
			onChange: (e) => d.set("appstore.showUnofficial", e)
		})), ye()), U(T("options.repositories"), o("span", { class: "as-bulk" }, z(T("action.reload"), () => E()))), o("div", { class: "as-group" }, ...y.repos.map((e) => {
			let t = y.catalogs.get(e.id), n = (e) => (e ?? []).filter((e) => !e.error).length, i = [...t?.apps ?? [], ...t?.modules ?? []].filter((e) => e.error), a = y.errors.has(e.id) ? T("options.unreachable", { error: y.errors.get(e.id) }) : t ? [
				T("options.apps", { n: n(t.apps) }),
				T("options.modules", { n: n(t.modules) }),
				i.length ? T("options.invalid", { n: i.length }) : null
			].filter(Boolean).join(" · ") : T("options.reading");
			return o("div", { class: "as-row" }, r(e.official ? {
				glyph: "shield",
				color: "#30a46c"
			} : {
				glyph: "link",
				color: "#8a909b"
			}), o("div", { class: "as-row-text" }, o("b", {}, A(e), o("span", { class: "as-muted" }, ` · ${e.name}`)), o("span", {}, e.url), o("span", {
				class: y.errors.has(e.id) ? "as-error" : null,
				title: i.map((e) => `${e.path}: ${e.error}`).join("\n") || null
			}, a)), e.official ? o("span", { class: "as-muted" }, T("options.alwaysThere")) : v ? z(T("action.remove"), () => x("repo", () => u.remove(e.id), T("done.repoRemoved", { name: A(e) })), {
				danger: !0,
				key: e.id
			}) : null);
		})), U(T("options.addRepo")), v ? o("div", { class: "as-group" }, o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, T("options.address")), o("span", {}, T("options.addressHint"))), f({
			value: t.url,
			placeholder: "https://…",
			label: T("options.addressLabel"),
			onInput: (e) => {
				t.url = e;
			}
		})), o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, T("options.name")), o("span", {}, T("options.nameHint"))), f({
			value: t.name,
			placeholder: T("options.name"),
			label: T("options.nameLabel"),
			onInput: (e) => {
				t.name = e;
			}
		})), o("div", { class: "as-row as-row-end" }, z(T("action.add"), () => x("repo", async () => {
			let e = await u.add(t.url.trim(), t.name.trim() || void 0);
			return y.newRepo = {
				url: "",
				name: ""
			}, e;
		}, (e) => T("done.repoAdded", { name: A(e) })), { primary: !0 }))) : o("p", { class: "as-muted" }, T("options.adminOnly")));
	}
	let J = o("input", {
		type: "search",
		autocomplete: "off",
		spellcheck: "false",
		"aria-label": T("search.label")
	}), Y = o("div", {
		class: "as-tabs",
		role: "tablist"
	}), X = o("main", { class: "as-main" }), Z = o("span", { class: "as-foot-text" });
	b.body.append(o("div", { class: "as-head" }, o("label", { class: "as-search" }, s("search"), J), Y), X, o("footer", { class: "as-foot" }, Z, o("span", { class: "as-spacer" }), o("button", {
		class: "as-link",
		onclick: () => Q("options")
	}, s("gear"), T("options.title"))));
	function Q(e, t = null) {
		y.view = e, y.key = t, $(), X.scrollTop = 0;
	}
	function xe(e) {
		y.tab = e, Q("list");
	}
	J.addEventListener("input", () => {
		y.query[y.tab] = J.value, y.view = "list", $();
	}), J.addEventListener("keydown", (e) => {
		e.key === "Escape" && J.value && (e.stopPropagation(), J.value = "", J.dispatchEvent(new Event("input")));
	}), Y.addEventListener("keydown", (e) => {
		if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
		let t = [...Y.querySelectorAll("[role=tab]")];
		t[(t.indexOf(document.activeElement) + (e.key === "ArrowRight" ? 1 : -1) + t.length) % t.length].click(), Y.querySelector("[tabindex=\"0\"]")?.focus();
	});
	function $() {
		let e = ae(), t = oe(e);
		t.some((e) => e.id === y.tab) || (y.tab = "installed");
		let n = t.find((e) => e.id === y.tab), r = e.filter((e) => e.update).length;
		Y.replaceChildren(...t.flatMap((e, n) => [e.category && !t[n - 1].category ? o("span", { class: "as-tab-sep" }) : null, o("button", {
			class: "as-tab",
			role: "tab",
			"aria-selected": String(y.view === "list" && e.id === y.tab),
			tabindex: e.id === y.tab ? "0" : "-1",
			onclick: () => xe(e.id)
		}, e.label, e.badge && r ? o("span", { class: "as-count" }, String(r)) : null)].filter(Boolean))), J.placeholder = T("search.placeholder", { tab: n.label }), J.value !== (y.query[y.tab] ?? "") && (J.value = y.query[y.tab] ?? "");
		let i = y.view === "detail" ? e.find((e) => e.key === y.key) : null;
		y.view === "detail" && !i && (y.view = "list");
		let a = y.view === "options" ? be(n) : i ? ve(i, n) : _e(e, n);
		X.replaceChildren(...[a].flat(3).filter(Boolean));
	}
	b.on("launch", (e) => {
		let t = {
			apps: "installed",
			modules: "kernel"
		}[e?.tab] ?? e?.tab;
		t === "repos" || t === "options" ? Q("options") : typeof t == "string" && xe(t);
	});
	let Se = i.on("change", () => $()), Ce = d.on("change:appstore.showUnofficial", () => $()), we = h.services?.on("change", (e) => {
		e.app === "appstore" && S().then($);
	});
	return b.on("destroy", () => {
		Se(), Ce(), we?.();
	}), $(), E(), b;
}
export { M as default };
