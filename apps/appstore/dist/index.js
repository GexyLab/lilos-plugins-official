import * as e from "/host/sdk.js";
import { Window as t, actionButton as n, appIcon as r, apps as i, fs as a, h as o, icon as s, kernel as c, kernelModules as l, repositories as u, settings as d, textField as ee, toast as f, toggle as te } from "/host/sdk.js";
import * as p from "/host/system.js";
import { describePermission as ne, launch as re } from "/host/system.js";
// src/appstore/markdown.js
var m = /(`+)([^`]+?)\1|\*\*(.+?)\*\*|__(.+?)__|\*(?!\s)(.+?)\*|\b_(?!\s)(.+?)_\b|!\[([^\]]*)\]\([^)]*\)|\[([^\]]+)\]\(\s*<?((?:[^()\s<>]|\([^()\s]*\))+)>?(?:\s+"[^"]*")?\s*\)|<(https?:\/\/[^>\s]+)>/;
function h(e) {
	let t = [], n = e;
	for (; n;) {
		let e = m.exec(n);
		if (!e) {
			t.push(n);
			break;
		}
		e.index && t.push(n.slice(0, e.index)), e[2] === void 0 ? e[3] !== void 0 || e[4] !== void 0 ? t.push(o("strong", {}, ...h(e[3] ?? e[4]))) : e[5] !== void 0 || e[6] !== void 0 ? t.push(o("em", {}, ...h(e[5] ?? e[6]))) : e[7] === void 0 ? t.push(g(e[8] ?? e[10], e[9] ?? e[10])) : t.push(e[7] ? `[${e[7]}]` : "") : t.push(o("code", {}, e[2])), n = n.slice(e.index + e[0].length);
	}
	return t;
}
function g(e, t) {
	let n = null;
	try {
		let e = new URL(t);
		(e.protocol === "https:" || e.protocol === "http:") && (n = e.href);
	} catch {}
	let r = h(e);
	return n ? o("a", {
		href: n,
		target: "_blank",
		rel: "noopener noreferrer",
		title: n
	}, ...r) : o("span", {}, ...r);
}
var _ = (e) => e.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((e) => e.trim()), v = /^\s{0,3}([-*+]|\d{1,9}[.)])\s+(.*)$/, y = /^\s{0,3}(#{1,6}\s|```|~~~|>|[-*+]\s|\d{1,9}[.)]\s|(-\s*){3,}$|(\*\s*){3,}$)/;
function b(e) {
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
			n.push(o(`h${a[1].length}`, {}, ...h(a[2]))), r++;
			continue;
		}
		if (/^\s{0,3}((-\s*){3,}|(\*\s*){3,}|(_\s*){3,})$/.test(e)) {
			n.push(o("hr")), r++;
			continue;
		}
		if (/^\s{0,3}>/.test(e)) {
			let e = [];
			for (; r < t.length && /^\s{0,3}>/.test(t[r]); r++) e.push(t[r].replace(/^\s{0,3}>\s?/, ""));
			n.push(o("blockquote", {}, ...b(e.join("\n"))));
			continue;
		}
		if (e.includes("|") && /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(t[r + 1] ?? "")) {
			let i = _(e), a = [];
			for (r += 2; r < t.length && t[r].includes("|") && t[r].trim(); r++) a.push(_(t[r]));
			n.push(o("div", { class: "md-table" }, o("table", {}, o("thead", {}, o("tr", {}, ...i.map((e) => o("th", {}, ...h(e))))), o("tbody", {}, ...a.map((e) => o("tr", {}, ...i.map((t, n) => o("td", {}, ...h(e[n] ?? "")))))))));
			continue;
		}
		let s = v.exec(e);
		if (s) {
			let e = /\d/.test(s[1]), i = [];
			for (; r < t.length;) {
				let n = v.exec(t[r]);
				if (n && /\d/.test(n[1]) === e && !/^\s{2,}/.test(t[r])) i.push([n[2]]), r++;
				else if (i.length && t[r].trim() && (/^\s{2,}/.test(t[r]) || !y.test(t[r]))) i.at(-1).push(t[r].trim()), r++;
				else break;
			}
			n.push(o(e ? "ol" : "ul", {}, ...i.map(([e, ...t]) => {
				let n = t.filter((e) => v.test(e)), r = [e, ...t.filter((e) => !v.test(e))].join(" ");
				return o("li", {}, ...h(r), n.length ? b(n.join("\n")) : null);
			})));
			continue;
		}
		let c = [];
		for (; r < t.length && t[r].trim() && !y.test(t[r]); r++) c.push(t[r].trim());
		c.length || (c.push(e.trim()), r++), n.push(o("p", {}, ...h(c.join(" "))));
	}
	return n;
}
// src/shared/i18n.js
function ie(t, n) {
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
var { t: x } = ie("appstore", {
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
		"action.uninstall": "Uninstall",
		"action.restartKernel": "Restart the kernel",
		"action.details": "Details",
		"action.reload": "Reload",
		"action.add": "Add",
		"confirm.installTitle": "Install {name}",
		"confirm.updateTitle": "Update {name}",
		"confirm.uninstallTitle": "Uninstall {name}",
		"confirm.uninstall": "{name} will be removed for every user, with its settings and its data.",
		"confirm.uninstallFiles": "The files it had created are deleted, or go to the Trash if someone changed them. Your other files stay where they are.",
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
		"done.appRemoved": "{name} uninstalled",
		"done.moduleRemoved": "{name} removed: restart the kernel",
		"done.moduleRemovedDataKept": "{name} removed (its data is kept): restart the kernel",
		"done.appReinstalled": "{name} reinstalled",
		"done.kernelRestarted": "Kernel restarted",
		"restart.kernelReason": "The kernel started again with other modules",
		"done.repoRemoved": "{name} removed",
		"done.repoAdded": "{name} added",
		"updates.atStart": "Check for updates at startup",
		"updates.atStartOn": "The AppStore will check for updates when you sign in",
		"updates.atStartOff": "Checking for updates at startup turned off",
		"updates.needsEngine": "Needs the kernel’s service engine (the services-isolate module)",
		"updates.bySystem": "Chosen by an administrator for everyone: change it in Control Panel → Startup → Services",
		"updates.description": "When you sign in and then at intervals (every 24 hours, change it in Control Panel → Startup → Services), even with lilOS closed: a notification tells you what can be updated",
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
		"action.delete": "Delete",
		"detail.kindSystem": "Operating system",
		"banner.systemRestart": "lilOS {version} starts with the next restart of the kernel.",
		"system.description": "The system itself: desktop, kernel and SDK.",
		"system.inUse": "In use",
		"system.nextShort": "{version} at restart",
		"system.next": "{version} starts with the next restart",
		"system.confirmTitle": "Update lilOS to {version}?",
		"system.confirmLead": "lilOS {version} is installed next to {current}, the version in use, for every user.",
		"system.confirmRestart": "It starts when the kernel restarts: everyone signed in loses the connection for a few seconds, then lilOS loads again.",
		"system.confirmRollback": "If it does not start, lilOS goes back to {current} by itself and tells the administrators.",
		"system.upToDate": "lilOS is up to date",
		"system.ready": "lilOS {version} is ready: it starts with the next restart of the kernel",
		"system.nextCancelled": "The change of version has been called off",
		"system.removeTitle": "Delete lilOS {version}?",
		"system.removeLead": "The files of lilOS {version} are deleted from the disk: you can no longer go back to it. Data and apps are not touched.",
		"system.removed": "lilOS {version} deleted",
		"system.failed": "lilOS {version} did not start ({reason}): lilOS went back to {current} by itself.",
		"system.development": "This lilOS runs from a copy of its repository (development): it is updated with git, not from here.",
		"system.installedMode": "Installed",
		"system.developmentMode": "Development copy",
		"system.kept": "Versions kept on disk",
		"system.keptHint": "To go back to it",
		"system.keptFailed": "Did not start",
		"system.use": "Use this version",
		"system.cancelNext": "Call off",
		"system.warning": "lilOS is updated for every user. The new version is put next to the one in use and starts with the kernel’s restart; the one before stays on disk until you delete it.",
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
		"action.uninstall": "Disinstalla",
		"action.restartKernel": "Riavvia il kernel",
		"action.details": "Dettagli",
		"action.reload": "Ricarica",
		"action.add": "Aggiungi",
		"confirm.installTitle": "Installa {name}",
		"confirm.updateTitle": "Aggiorna {name}",
		"confirm.uninstallTitle": "Disinstalla {name}",
		"confirm.uninstall": "{name} sarà rimossa per tutti gli utenti, con le sue impostazioni e i suoi dati.",
		"confirm.uninstallFiles": "I file che aveva creato si eliminano, o vanno nel Cestino se qualcuno li ha modificati. Gli altri tuoi file restano dove sono.",
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
		"done.appRemoved": "{name} disinstallata",
		"done.moduleRemoved": "{name} rimosso: riavvia il kernel",
		"done.moduleRemovedDataKept": "{name} rimosso (i suoi dati restano): riavvia il kernel",
		"done.appReinstalled": "{name} reinstallata",
		"done.kernelRestarted": "Kernel riavviato",
		"restart.kernelReason": "Il kernel è ripartito con moduli diversi",
		"done.repoRemoved": "{name} rimosso",
		"done.repoAdded": "{name} aggiunto",
		"updates.atStart": "Controlla gli aggiornamenti all’avvio",
		"updates.atStartOn": "L’AppStore controllerà gli aggiornamenti quando entri",
		"updates.atStartOff": "Controllo degli aggiornamenti all’avvio spento",
		"updates.needsEngine": "Serve il motore dei servizi del kernel (modulo services-isolate)",
		"updates.bySystem": "Scelto da un amministratore per tutti: si cambia dal Pannello di controllo → Avvio → Servizi",
		"updates.description": "Quando entri e poi a intervalli (ogni 24 ore, si cambia nel Pannello di controllo → Avvio → Servizi), anche con lilOS chiuso: un avviso dice cosa si può aggiornare",
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
		"action.delete": "Elimina",
		"detail.kindSystem": "Sistema operativo",
		"banner.systemRestart": "lilOS {version} parte al prossimo riavvio del kernel.",
		"system.description": "Il sistema stesso: scrivania, kernel e SDK.",
		"system.inUse": "In uso",
		"system.nextShort": "{version} al riavvio",
		"system.next": "La {version} parte al prossimo riavvio",
		"system.confirmTitle": "Aggiornare lilOS alla {version}?",
		"system.confirmLead": "lilOS {version} viene installato accanto alla {current}, quella in uso, per tutti gli utenti.",
		"system.confirmRestart": "Parte al riavvio del kernel: chi è collegato perde la connessione per qualche secondo, poi lilOS si ricarica.",
		"system.confirmRollback": "Se non parte, lilOS torna da solo alla {current} e lo dice agli amministratori.",
		"system.upToDate": "lilOS è aggiornato",
		"system.ready": "lilOS {version} è pronto: parte al prossimo riavvio del kernel",
		"system.nextCancelled": "Il cambio di versione è stato annullato",
		"system.removeTitle": "Eliminare lilOS {version}?",
		"system.removeLead": "I file di lilOS {version} vengono eliminati dal disco: non potrai più tornarci. Dati e app non vengono toccati.",
		"system.removed": "lilOS {version} eliminato",
		"system.failed": "lilOS {version} non è partito ({reason}): lilOS è tornato da solo alla {current}.",
		"system.development": "Questo lilOS gira da una copia del suo repository (sviluppo): si aggiorna con git, non da qui.",
		"system.installedMode": "Installato",
		"system.developmentMode": "Copia di sviluppo",
		"system.kept": "Versioni conservate sul disco",
		"system.keptHint": "Per tornarci",
		"system.keptFailed": "Non è partita",
		"system.use": "Usa questa versione",
		"system.cancelNext": "Annulla il cambio",
		"system.warning": "lilOS si aggiorna per tutti gli utenti. La nuova versione si mette accanto a quella in uso e parte al riavvio del kernel; quella di prima resta sul disco finché non la elimini.",
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
}), S = /* @__PURE__ */ new Set([
	"fs.app",
	"fs.tmp",
	"fs.open",
	"ui.notify",
	"clipboard.write",
	"auth.remote"
]), ae = () => [
	{
		id: "system",
		label: x("category.system")
	},
	{
		id: "productivity",
		label: x("category.productivity")
	},
	{
		id: "media",
		label: x("category.media")
	},
	{
		id: "development",
		label: x("category.development")
	},
	{
		id: "other",
		label: x("category.other")
	},
	{
		id: "kernel",
		label: x("category.kernel")
	}
], oe = /* @__PURE__ */ new Set([
	"system",
	"productivity",
	"media",
	"development",
	"other"
]), se = {
	glyph: "monitor",
	color: "#5f6673"
}, ce = {
	glyph: "help",
	color: "#5f6673"
}, le = {
	glyph: "window",
	color: "#3b6ef5"
}, C = e.systemReleases ?? null;
d.define({ "appstore.showUnofficial": !0 });
var w = (e, t) => {
	let n = e.split(".").map(Number), r = t.split(".").map(Number);
	return (n[0] - r[0] || n[1] - r[1] || n[2] - r[2]) > 0;
}, T = (e) => e.replace(/\.git$/i, "").replace(/\/+$/, ""), E = (e, t) => !!e?.url && T(e.url).toLowerCase() === T(t.url).toLowerCase(), D = (e) => T(e.url).split(/[/\\]/).pop() || e.name, O = (e) => (e ?? []).filter((e) => !S.has(e.split(":")[0]));
function k({ openWindow: m }) {
	let h = c.user?.role === "admin", g = {
		repos: [],
		catalogs: /* @__PURE__ */ new Map(),
		errors: /* @__PURE__ */ new Map(),
		modules: [],
		system: null,
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
	}, _ = new t({
		title: "AppStore",
		icon: "download",
		width: 960,
		height: 640,
		minWidth: 560,
		minHeight: 420
	});
	_.el.classList.add("appstore");
	async function v(e, t, n) {
		if (!g.busy) {
			g.busy = e, $();
			try {
				let e = await t(), r = typeof n == "function" ? n(e) : n;
				r && f(r, { timeout: 5e3 }), await S({ quiet: !0 });
			} catch (e) {
				f(e.message, { timeout: 7e3 });
			} finally {
				g.busy = null, $();
			}
		}
	}
	async function y() {
		let e = await p.services?.list().catch(() => null);
		g.updates = e?.available ? e.services.find((e) => e.app === "appstore" && e.entry === "updates") ?? null : null;
	}
	async function ie(e) {
		try {
			await p.services.setStartup("appstore", "updates", e ? "login" : "none"), await p.services[e ? "start" : "stop"]("appstore", "updates"), f(x(e ? "updates.atStartOn" : "updates.atStartOff"));
		} catch (e) {
			f(e.message, { timeout: 7e3 });
		}
		await y(), $();
	}
	async function S({ quiet: e = !1 } = {}) {
		e || (g.loading = !0, $());
		try {
			g.repos = await u.list(), await Promise.all(g.repos.map(async (e) => {
				try {
					g.catalogs.set(e.id, await u.catalog(e.id)), g.errors.delete(e.id);
				} catch (t) {
					g.catalogs.delete(e.id), g.errors.set(e.id, t.message);
				}
			})), g.modules = h ? await l.list().catch(() => []) : [], g.system = C ? await C.info().catch(() => null) : null, await y(), await i.refresh();
		} catch (e) {
			f(e.message, { timeout: 7e3 });
		}
		g.loading = !1, $();
	}
	let T = () => g.repos.filter((e) => e.official || d.get("appstore.showUnofficial"));
	function k(t, n, r) {
		let i = n?.manifest ?? r.manifest, a = (n ? n.locales && e.locale?.manifest(n.manifest, n.locales) : e.locale?.manifest(r.manifest)) || i, o = n?.manifest.version ?? null, s = !!r && (!n || E(r.source, t));
		return {
			key: `app:${t?.id ?? "-"}:${i.id}`,
			kind: "app",
			id: i.id,
			name: a.name,
			description: a.description ?? "",
			icon: i.icon ?? ce,
			publisher: i.publisher?.name ?? "",
			category: oe.has(i.category) ? i.category : "other",
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
			update: s && o && w(o, r.version) ? o : null,
			required: !!i.required,
			verified: !!r?.signed || !!t?.official
		};
	}
	function A(e, t, n) {
		let r = t?.module ?? n, i = t?.module.version ?? null, a = !!n && (!t || E(n.source, e));
		return {
			key: `module:${e?.id ?? "-"}:${r.name}`,
			kind: "module",
			id: r.name,
			name: r.name,
			description: r.description ?? "",
			icon: t?.module.icon ?? n?.icon ?? se,
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
			update: a && n.enabled && i && w(i, n.enabled) ? i : null,
			provides: r.provides ?? [],
			verified: !!e?.official
		};
	}
	function ue() {
		let e = g.system;
		if (!e) return null;
		let t = g.repos.find((e) => e.official) ?? null, n = t && g.catalogs.get(t.id)?.system?.system ? g.catalogs.get(t.id).system : null, r = n?.system.version ?? null, i = e.mode === "installed";
		return {
			key: "system:lilos",
			kind: "system",
			id: "lilos",
			name: "lilOS",
			description: x("system.description"),
			icon: le,
			publisher: "lilOS",
			category: "system",
			repo: t,
			entry: n,
			have: e,
			readme: n?.readme ?? null,
			readmeTruncated: !!n?.readmeTruncated,
			changelog: n?.changelog ?? null,
			changelogTruncated: !!n?.changelogTruncated,
			offered: r,
			installed: e.version,
			here: !0,
			elsewhere: !1,
			update: i && r && w(r, e.version) && r !== e.next ? r : null,
			required: !0,
			verified: !0
		};
	}
	function de() {
		let e = i.list(), t = g.modules.filter((e) => e.enabled || e.running), n = [];
		for (let r of T()) {
			let i = g.catalogs.get(r.id);
			for (let t of i?.apps ?? []) t.manifest && n.push(k(r, t, e.find((e) => e.id === t.manifest.id)));
			if (h) for (let e of i?.modules ?? []) e.module && n.push(A(r, e, t.find((t) => t.name === e.module.name)));
		}
		for (let t of e) n.some((e) => e.kind === "app" && e.here && e.id === t.id) || n.push(k(g.repos.find((e) => E(t.source, e)) ?? null, null, t));
		for (let e of t) n.some((t) => t.kind === "module" && t.here && t.id === e.name) || n.push(A(g.repos.find((t) => E(e.source, t)) ?? null, null, e));
		let r = ue();
		return r ? [r, ...n] : n;
	}
	function fe(e) {
		let t = new Set(e.map((e) => e.category));
		return [
			{
				id: "installed",
				label: x("tab.installed"),
				filter: (e) => e.here
			},
			{
				id: "updates",
				label: x("tab.updates"),
				filter: (e) => !!e.update,
				badge: !0
			},
			...ae().filter((e) => t.has(e.id) || e.id === "kernel" && h).map((e) => ({
				...e,
				category: !0,
				filter: (t) => t.category === e.id
			}))
		];
	}
	let pe = (e, t) => !t || [
		e.name,
		e.id,
		e.description,
		e.publisher,
		e.repo ? D(e.repo) : ""
	].some((e) => e.toLowerCase().includes(t)), me = () => h && g.modules.some((e) => (e.enabled ?? null) !== (e.running ?? null)), j = () => h ? g.system?.next ?? null : null;
	function M({ title: e, glyph: r, height: i, body: a, confirm: s }) {
		return new Promise((c) => {
			let l = new t({
				title: e,
				icon: r,
				width: 440,
				height: i,
				minimizable: !1,
				maximizable: !1
			}), u = !1, d = (e) => {
				u || (u = !0, c(e), l.emit("close"));
			};
			l.on("destroy", () => d(null)), l.body.append(o("div", { class: "as-dialog" }, ...a, o("div", { class: "as-dialog-buttons" }, n({
				label: x("action.cancel"),
				onClick: () => d(null)
			}), n({
				label: s.label,
				primary: s.primary,
				danger: s.danger,
				onClick: () => d(s.value)
			})))), m(l);
		});
	}
	function N({ title: e, name: t, permissions: n = [], official: r, kernelModule: i = !1 }) {
		let a = O(n);
		return M({
			title: e,
			glyph: "download",
			height: i || !r ? 340 : 300,
			body: [
				o("p", { class: "as-dialog-lead" }, x(i ? "confirm.kernelModule" : "confirm.mayDo", { name: t })),
				!i && a.length ? o("ul", {}, ...a.map((e) => o("li", {}, ne(e)))) : null,
				!i && !a.length ? o("p", {}, x("permissions.none")) : null,
				r ? null : o("p", { class: "as-warning" }, x("confirm.unverified"))
			],
			confirm: {
				label: x(r ? "action.install" : "action.installAnyway"),
				primary: r,
				danger: !r,
				value: {
					grant: a,
					allowUnsigned: !r
				}
			}
		});
	}
	let he = (e) => M({
		title: x("confirm.uninstallTitle", { name: e.name }),
		glyph: "trash",
		height: 230,
		body: [o("p", { class: "as-dialog-lead" }, x("confirm.uninstall", { name: e.name })), o("p", {}, x("confirm.uninstallFiles"))],
		confirm: {
			label: x("action.uninstall"),
			danger: !0,
			value: !0
		}
	});
	async function ge(e) {
		let { repo: t, entry: n } = e, r = {
			type: "git",
			url: t.url,
			path: n.path,
			ref: g.catalogs.get(t.id)?.ref
		};
		if (e.kind === "module") {
			let n = await N({
				title: x("confirm.installTitle", { name: e.name }),
				name: e.name,
				official: t.official,
				kernelModule: !0
			});
			n && v("install", () => l.install(r, { allowUnsigned: n.allowUnsigned }), x("done.moduleInstalled", { name: e.name }));
			return;
		}
		let a = await N({
			title: x("confirm.installTitle", { name: e.name }),
			name: e.name,
			permissions: e.manifest.permissions,
			official: t.official
		});
		a && v("install", () => i.install(r, a), x("done.appInstalled", { name: e.name }));
	}
	async function P(e) {
		let t = !!e.repo?.official;
		if (e.kind === "module") return t || await N({
			title: x("confirm.updateTitle", { name: e.name }),
			name: e.name,
			official: t,
			kernelModule: !0
		}) ? { allowUnsigned: !t } : null;
		let n = O(e.entry?.manifest.permissions).filter((t) => !e.have.granted.includes(t));
		return !n.length && t ? {
			grant: [],
			allowUnsigned: !1
		} : N({
			title: x("confirm.updateTitle", { name: e.name }),
			name: e.name,
			permissions: n,
			official: t
		});
	}
	let F = (e, t) => e.kind === "module" ? l.update(e.id, t) : i.update(e.id, t);
	async function I(e, { reinstall: t = !1 } = {}) {
		if (!p.updateApps) {
			let t = [];
			for (let n of e) t.push(await n.run().then((e) => ({
				item: n.item,
				result: e
			}), (e) => ({
				item: n.item,
				error: e
			})));
			return t;
		}
		let n = await p.updateApps(e.map(({ item: e, run: t }) => ({
			id: e.id,
			run: t,
			restartOnUpdate: e.entry?.manifest.restartOnUpdate
		})), {
			from: "appstore",
			reinstall: t
		});
		return n && n.map((t, n) => ({
			...t,
			item: e[n].item
		}));
	}
	async function L(e, t, n) {
		let [r] = await I([{
			item: e,
			run: t
		}], n) ?? [null];
		if (r?.error) throw r.error;
		return r ? r.result : null;
	}
	async function R(e) {
		let t = await P(e);
		if (!t) return;
		let n = e.kind === "module", r = e.name;
		v("update", () => n ? F(e, t) : L(e, () => F(e, t)), (e) => e ? e.unchanged ? x(n ? "done.moduleUpToDate" : "done.appUpToDate", { name: r }) : x(n ? "done.moduleUpdated" : "done.appUpdated", {
			name: r,
			version: e.version
		}) : null);
	}
	function _e(e) {
		v("update", async () => {
			let t = 0, n = [];
			for (let r of e) {
				let e = await P(r);
				if (e) {
					if (r.kind !== "module") n.push({
						item: r,
						run: () => F(r, e)
					});
					else try {
						await F(r, e), t++;
					} catch (e) {
						f(`${r.name}: ${e.message}`, { timeout: 7e3 });
					}
				}
			}
			for (let e of n.length && await I(n) || []) e.error ? f(`${e.item.name}: ${e.error.message}`, { timeout: 7e3 }) : t++;
			return t;
		}, (e) => x("done.updatedCount", { n: e }));
	}
	async function ve(e) {
		let t = e.name;
		e.kind === "module" ? v("remove", () => l.remove(e.id), (e) => e.kept.length ? x("done.moduleRemovedDataKept", { name: t }) : x("done.moduleRemoved", { name: t })) : await he(e) && v("remove", () => i.uninstall(e.id), x("done.appRemoved", { name: t }));
	}
	let ye = (e) => h && e.kind === "app" && e.here && !e.required, be = (e) => v("reinstall", () => L(e, () => i.update(e.id, {
		reinstall: !0,
		allowUnsigned: !e.verified
	}), { reinstall: !0 }), (t) => t ? x("done.appReinstalled", { name: e.name }) : null);
	async function xe(e, t) {
		t.disabled = !0, t.setAttribute("aria-busy", "true");
		try {
			let t = await u.readme(e.repo.id, e.entry.path), n = a.children(a.root).find((e) => e.type === "folder" && e.system && e.name === "Download");
			if (!n) throw Error(x("error.noDownloadFolder"));
			let r = a.create(n.id, {
				type: "file",
				name: `${e.name} - README.md`
			});
			await a.write(r.id, t), f(x("readme.saved", { file: r.name }), { timeout: 6e3 });
		} catch (e) {
			f(e.message, { timeout: 7e3 });
		} finally {
			t.disabled = !1, t.removeAttribute("aria-busy");
		}
	}
	async function Se(e) {
		await M({
			title: x("system.confirmTitle", { version: e.update }),
			glyph: "download",
			height: 290,
			body: [
				o("p", { class: "as-dialog-lead" }, x("system.confirmLead", {
					version: e.update,
					current: e.installed
				})),
				o("p", {}, x("system.confirmRestart")),
				o("p", {}, x("system.confirmRollback", { current: e.installed }))
			],
			confirm: {
				label: x("action.update"),
				primary: !0,
				value: !0
			}
		}) && v("update", () => C.update(), (e) => e.unchanged ? x("system.upToDate") : x("system.ready", { version: e.version }));
	}
	let Ce = (e) => v("system", () => C.use(e), (t) => t.restartRequired ? x("system.ready", { version: e }) : x("system.nextCancelled"));
	async function we(e) {
		await M({
			title: x("system.removeTitle", { version: e }),
			glyph: "trash",
			height: 210,
			body: [o("p", { class: "as-dialog-lead" }, x("system.removeLead", { version: e }))],
			confirm: {
				label: x("action.delete"),
				danger: !0,
				value: !0
			}
		}) && v("system", () => C.remove(e), x("system.removed", { version: e }));
	}
	async function Te(e, t) {
		t.disabled = !0, t.setAttribute("aria-busy", "true");
		try {
			let t = await u.readme(e.repo.id, e.entry.path, "CHANGELOG.md"), n = a.children(a.root).find((e) => e.type === "folder" && e.system && e.name === "Download");
			if (!n) throw Error(x("error.noDownloadFolder"));
			let r = a.create(n.id, {
				type: "file",
				name: "lilOS - CHANGELOG.md"
			});
			await a.write(r.id, t), f(x("readme.saved", { file: r.name }), { timeout: 6e3 });
		} catch (e) {
			f(e.message, { timeout: 7e3 });
		} finally {
			t.disabled = !1, t.removeAttribute("aria-busy");
		}
	}
	let z = () => v("restart", async () => {
		let e = me();
		await l.restart(), await new Promise((e) => setTimeout(e, 2500)), e && p.requestRestart?.(x("restart.kernelReason"), "kernel-modules");
	}, x("done.kernelRestarted")), B = (e, t, { key: r = "", ...i } = {}) => {
		let a = `${e}|${r}`, o = n({
			label: e,
			onClick: () => (g.pressed = a, t()),
			...i
		});
		return o.disabled = !!g.busy, g.busy && g.pressed === a && o.setAttribute("aria-busy", "true"), o;
	}, V = (e, t = !1) => o("span", { class: "as-state" }, t ? s("check") : null, e), H = (e) => e.repo ? o("span", {
		class: "as-repo",
		title: e.repo.url
	}, s("link"), o("span", {}, D(e.repo))) : o("span", { class: "as-repo" }, s("folder"), o("span", {}, e.kind === "module" ? x("repo.manual") : x("repo.localFolder"))), Ee = (e) => e.repo && !e.repo.official ? o("span", { class: "as-unofficial" }, x("repo.unofficial")) : null, De = (e) => e.kind === "system" ? x("system.inUse") : e.kind === "module" ? x("status.installedModule") : x("status.installedApp"), U = (e, ...t) => o("div", { class: "as-section-title" }, e, ...t), W = (e, t) => o("div", { class: "as-fact" }, o("b", {}, e), String(t)), G = (e) => o("button", {
		class: "as-back",
		onclick: () => Q("list")
	}, s("arrowLeft"), e);
	function Oe(e) {
		return e.kind === "system" ? e.update ? h ? B(x("action.update"), () => Se(e), {
			primary: !0,
			key: e.key
		}) : V(x("status.updateAvailable", { version: e.update })) : j() ? V(x("system.nextShort", { version: j() })) : V(x("system.inUse"), !0) : e.update ? h ? B(x("action.update"), () => R(e), {
			primary: !0,
			key: e.key
		}) : V(x("status.updateAvailable", { version: e.update })) : e.here ? V(e.kind === "module" && !e.have.enabled ? x("status.removed") : De(e), !0) : e.elsewhere ? V(x("status.otherRepo")) : h ? B(x("action.install"), () => ge(e), { key: e.key }) : V(x("status.available"));
	}
	function ke(e, { uninstall: t = !1 } = {}) {
		let n = e.update ? `${e.installed} → ${e.update}` : e.here ? e.installed : e.offered, i = t && ye(e) ? B(x("action.uninstall"), () => ve(e), {
			danger: !0,
			key: e.key
		}) : null;
		return o("div", { class: "as-card" }, o("div", { class: "as-card-top" }, r(e.icon), o("div", { class: "as-card-head" }, o("button", {
			class: "as-card-open",
			onclick: () => Q("detail", e.key)
		}, e.name, o("span", { class: "as-ver" }, n)), o("div", { class: "as-card-desc" }, e.description))), o("div", { class: "as-card-foot" }, H(e), Ee(e), o("span", { class: "as-spacer" }), i && !e.update ? null : Oe(e), i));
	}
	let K = (e, t) => o("div", { class: "as-grid" }, ...e.map((e) => ke(e, t)));
	function q() {
		let e = [];
		j() && [
			"installed",
			"updates",
			"system"
		].includes(g.tab) && e.push(o("div", { class: "as-banner" }, s("info"), o("span", {}, x("banner.systemRestart", { version: j() })), B(x("action.restartKernel"), z, {
			primary: !0,
			key: "system"
		}))), me() && [
			"installed",
			"updates",
			"kernel"
		].includes(g.tab) && e.push(o("div", { class: "as-banner" }, s("info"), o("span", {}, x("banner.restartNeeded")), B(x("action.restartKernel"), z, { primary: !0 })));
		let t = T().filter((e) => g.errors.has(e.id));
		return t.length && e.push(o("div", { class: "as-banner" }, s("info"), o("span", {}, t.length === 1 ? x("banner.repoUnreachable", { name: D(t[0]) }) : x("banner.reposUnreachable", { n: t.length })), o("button", {
			class: "as-link",
			onclick: () => Q("options")
		}, x("action.details")))), e;
	}
	function Ae(e, t) {
		let n = (g.query[t.id] ?? "").trim().toLowerCase(), r = e.filter(t.filter).filter((e) => pe(e, n));
		if (Z.textContent = g.loading ? x("list.reading") : `${x("list.items", { n: r.length })} · ${x("list.repos", { n: T().length })}`, !r.length) {
			let e = g.loading && t.id !== "installed" ? x("list.reading") : n ? x("list.noResults", {
				query: n,
				tab: t.label
			}) : t.id === "updates" ? x("list.upToDate") : t.id === "installed" ? x("list.nothingInstalled") : x("list.emptyCategory");
			return [...q(), o("div", { class: "as-empty" }, e)];
		}
		if (t.id === "installed") {
			let e = r.filter((e) => e.kind === "app"), t = r.filter((e) => e.kind === "module"), n = r.filter((e) => e.kind === "system");
			return [
				...q(),
				n.length ? [U("lilOS"), K(n)] : null,
				e.length ? [U(x("list.apps")), K(e, { uninstall: !0 })] : null,
				t.length ? [U(x("list.modules")), K(t)] : null
			];
		}
		if (t.id === "updates") return [
			...q(),
			U(x("list.updates", { n: r.length }), h && r.length > 1 ? o("span", { class: "as-bulk" }, B(x("action.updateAll"), () => _e(r), { primary: !0 })) : null),
			K(r)
		];
		let i = (e) => Number(e.here || e.elsewhere);
		return [...q(), K([...r].sort((e, t) => i(e) - i(t) || e.name.localeCompare(t.name)))];
	}
	function je(e, t) {
		let n = e.have, i = n.mode === "installed", a = j(), c = [];
		h && e.update && c.push(B(x("action.updateTo", { version: e.update }), () => Se(e), {
			primary: !0,
			key: e.key
		}));
		let l = h && i ? (n.releases ?? []).filter((e) => e !== n.version) : [], u = (e) => o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, `lilOS ${e}`), o("span", {}, e === a ? x("system.next", { version: e }) : e === n.failed?.version ? x("system.keptFailed") : x("system.keptHint"))), e === a ? B(x("system.cancelNext"), () => Ce(n.version), { key: e }) : B(x("system.use"), () => Ce(e), { key: e }), e === a ? null : B(x("action.delete"), () => we(e), {
			danger: !0,
			key: e
		}));
		return Z.textContent = `lilOS ${n.version}`, o("div", { class: "as-detail" }, G(t.label), o("div", { class: "as-detail-head" }, r(e.icon), o("div", { class: "as-detail-title" }, o("h1", {}, "lilOS"), o("div", { class: "as-sub" }, x("detail.kindSystem")), o("div", { class: "as-meta" }, H(e), o("span", { class: "as-state" }, s("shield"), x("detail.verified")), o("span", { class: "as-state" }, x("detail.required"))), c.length ? o("div", { class: "as-detail-actions" }, ...c) : null)), a ? o("div", { class: "as-banner" }, s("info"), o("span", {}, x("banner.systemRestart", { version: a })), B(x("action.restartKernel"), z, {
			primary: !0,
			key: "system"
		})) : null, h && n.failed ? o("div", { class: "as-banner" }, s("warning"), o("span", {}, x("system.failed", {
			version: n.failed.version,
			reason: n.failed.reason,
			current: n.version
		}))) : null, i ? null : o("div", { class: "as-banner" }, s("info"), o("span", {}, x("system.development"))), o("div", { class: "as-facts" }, W(x("system.inUse"), n.version), W(x("detail.version"), e.offered ?? "—"), W(x("detail.repository"), e.repo ? D(e.repo) : "—"), W(x("detail.state"), a ? x("system.next", { version: a }) : x(i ? "system.installedMode" : "system.developmentMode"))), l.length ? [U(x("system.kept")), o("div", { class: "as-group" }, ...l.map(u))] : null, o("div", { class: "as-perm" }, o("h3", {}, s("info"), x("detail.warning")), o("p", {}, x("system.warning"))), e.changelog ? [o("div", { class: "as-readme-title" }, s("file"), "CHANGELOG.md"), o("article", { class: "as-readme" }, ...b(e.changelog))] : null, e.changelog && e.changelogTruncated ? o("p", { class: "as-readme-cut" }, x("readme.truncated"), " ", o("button", {
			class: "as-link",
			onclick: (t) => Te(e, t.currentTarget)
		}, s("download"), x("readme.download"))) : null, o("div", { class: "as-readme-title" }, s("file"), "README.md"), e.readme ? o("article", { class: "as-readme" }, ...b(e.readme)) : o("p", { class: "as-muted" }, e.repo ? x("readme.none") : x("readme.notFromRepo")), e.readme && e.readmeTruncated ? o("p", { class: "as-readme-cut" }, x("readme.truncated"), " ", o("button", {
			class: "as-link",
			onclick: (t) => xe(e, t.currentTarget)
		}, s("download"), x("readme.download"))) : null);
	}
	function Me(e, t) {
		if (e.kind === "system") return je(e, t);
		let n = e.kind === "module", i = [];
		e.here && !n && i.push(B(x("action.open"), () => re(e.id), { primary: !e.update || !h })), h && (e.update && i.push(B(x("action.updateTo", { version: e.update }), () => R(e), {
			primary: !0,
			key: e.key
		})), e.here && (!n || e.have.enabled) && (!e.update && e.have.source && i.push(B(x("action.checkUpdates"), () => R(e), { key: e.key })), n || i.push(B(x("action.reinstall"), () => be(e), { key: e.key })), e.required || i.push(B(x(n ? "action.remove" : "action.uninstall"), () => ve(e), {
			danger: !0,
			key: e.key
		}))), !e.here && !e.elsewhere && e.entry && i.push(B(e.repo.official ? x("action.install") : x("action.installAnyway"), () => ge(e), {
			primary: !0,
			danger: !e.repo.official,
			key: e.key
		})));
		let a = n && e.have ? e.have.enabled ? e.have.running === e.have.enabled ? x("moduleState.inUse") : e.have.running ? x("moduleState.oldUntilRestart", { version: e.have.running }) : x("moduleState.nextStart") : x("moduleState.removed") : null, c = O(e.manifest?.permissions);
		return Z.textContent = `${e.name} ${e.offered ?? e.installed}`, o("div", { class: "as-detail" }, G(t.label), o("div", { class: "as-detail-head" }, r(e.icon), o("div", { class: "as-detail-title" }, o("h1", {}, e.name), o("div", { class: "as-sub" }, [
			e.publisher,
			x(n ? "detail.kindModule" : "detail.kindApp"),
			ae().find((t) => t.id === e.category)?.label
		].filter(Boolean).join(" · ")), o("div", { class: "as-meta" }, H(e), e.verified ? o("span", { class: "as-state" }, s("shield"), x("detail.verified")) : e.repo ? o("span", { class: "as-unofficial" }, x("detail.unverified")) : null, e.required ? o("span", { class: "as-state" }, x("detail.required")) : null, e.elsewhere ? o("span", { class: "as-state" }, x(n ? "status.installedElsewhereModule" : "status.installedElsewhereApp")) : null), i.length ? o("div", { class: "as-detail-actions" }, ...i) : null)), e.repo && !e.repo.official && !e.here ? o("div", { class: "as-banner" }, s("info"), o("span", {}, x("detail.unofficialWarning"))) : null, o("div", { class: "as-facts" }, W(x("detail.version"), e.offered ?? e.installed), W(De(e), e.installed ?? "—"), W(x("detail.repository"), e.repo ? D(e.repo) : "—"), n ? W(x("detail.provides"), e.provides.join(", ") || "—") : W(x("detail.id"), e.id), a ? W(x("detail.state"), a) : null), n ? o("div", { class: "as-perm" }, o("h3", {}, s("info"), x("detail.warning")), o("p", {}, x("detail.moduleWarning"))) : o("div", { class: "as-perm" }, o("h3", {}, s("shield"), x("detail.mayDo")), c.length ? o("ul", {}, ...c.map((e) => o("li", {}, s("check"), ne(e)))) : o("p", { class: "as-muted" }, x("permissions.none"))), o("div", { class: "as-readme-title" }, s("file"), "README.md"), e.readme ? o("article", { class: "as-readme" }, ...b(e.readme)) : null, e.readme && e.readmeTruncated ? o("p", { class: "as-readme-cut" }, x("readme.truncated"), " ", o("button", {
			class: "as-link",
			onclick: (t) => xe(e, t.currentTarget)
		}, s("download"), x("readme.download"))) : null, e.readme ? null : o("p", { class: "as-muted" }, e.repo ? x("readme.none") : x("readme.notFromRepo")));
	}
	function Ne() {
		let e = g.updates, t = !e || e.system && !e.canControl, n = e ? e.system ? x("updates.bySystem") : x("updates.description") : x("updates.needsEngine"), r = te({
			value: !!e && e.startup !== "none",
			label: x("updates.atStart"),
			onChange: ie
		});
		return r.disabled = t, o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, x("updates.atStart")), o("span", {}, n)), r);
	}
	function Pe(e) {
		let t = g.newRepo;
		return Z.textContent = x("options.title"), o("div", { class: "as-options" }, G(e.label), o("h2", {}, x("options.title")), o("p", { class: "as-lead" }, x("options.lead")), U("AppStore"), o("div", { class: "as-group" }, o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, x("options.showUnofficial")), o("span", {}, x("options.showUnofficialHint"))), te({
			value: d.get("appstore.showUnofficial"),
			label: x("options.showUnofficial"),
			onChange: (e) => d.set("appstore.showUnofficial", e)
		})), Ne()), U(x("options.repositories"), o("span", { class: "as-bulk" }, B(x("action.reload"), () => S()))), o("div", { class: "as-group" }, ...g.repos.map((e) => {
			let t = g.catalogs.get(e.id), n = (e) => (e ?? []).filter((e) => !e.error).length, i = [...t?.apps ?? [], ...t?.modules ?? []].filter((e) => e.error), a = g.errors.has(e.id) ? x("options.unreachable", { error: g.errors.get(e.id) }) : t ? [
				x("options.apps", { n: n(t.apps) }),
				x("options.modules", { n: n(t.modules) }),
				i.length ? x("options.invalid", { n: i.length }) : null
			].filter(Boolean).join(" · ") : x("options.reading");
			return o("div", { class: "as-row" }, r(e.official ? {
				glyph: "shield",
				color: "#30a46c"
			} : {
				glyph: "link",
				color: "#8a909b"
			}), o("div", { class: "as-row-text" }, o("b", {}, D(e), o("span", { class: "as-muted" }, ` · ${e.name}`)), o("span", {}, e.url), o("span", {
				class: g.errors.has(e.id) ? "as-error" : null,
				title: i.map((e) => `${e.path}: ${e.error}`).join("\n") || null
			}, a)), e.official ? o("span", { class: "as-muted" }, x("options.alwaysThere")) : h ? B(x("action.remove"), () => v("repo", () => u.remove(e.id), x("done.repoRemoved", { name: D(e) })), {
				danger: !0,
				key: e.id
			}) : null);
		})), U(x("options.addRepo")), h ? o("div", { class: "as-group" }, o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, x("options.address")), o("span", {}, x("options.addressHint"))), ee({
			value: t.url,
			placeholder: "https://…",
			label: x("options.addressLabel"),
			onInput: (e) => {
				t.url = e;
			}
		})), o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, x("options.name")), o("span", {}, x("options.nameHint"))), ee({
			value: t.name,
			placeholder: x("options.name"),
			label: x("options.nameLabel"),
			onInput: (e) => {
				t.name = e;
			}
		})), o("div", { class: "as-row as-row-end" }, B(x("action.add"), () => v("repo", async () => {
			let e = await u.add(t.url.trim(), t.name.trim() || void 0);
			return g.newRepo = {
				url: "",
				name: ""
			}, e;
		}, (e) => x("done.repoAdded", { name: D(e) })), { primary: !0 }))) : o("p", { class: "as-muted" }, x("options.adminOnly")));
	}
	let J = o("input", {
		type: "search",
		autocomplete: "off",
		spellcheck: "false",
		"aria-label": x("search.label")
	}), Y = o("div", {
		class: "as-tabs",
		role: "tablist"
	}), X = o("main", { class: "as-main" }), Z = o("span", { class: "as-foot-text" });
	_.body.append(o("div", { class: "as-head" }, o("label", { class: "as-search" }, s("search"), J), Y), X, o("footer", { class: "as-foot" }, Z, o("span", { class: "as-spacer" }), o("button", {
		class: "as-link",
		onclick: () => Q("options")
	}, s("gear"), x("options.title"))));
	function Q(e, t = null) {
		g.view = e, g.key = t, $(), X.scrollTop = 0;
	}
	function Fe(e) {
		g.tab = e, Q("list");
	}
	J.addEventListener("input", () => {
		g.query[g.tab] = J.value, g.view = "list", $();
	}), J.addEventListener("keydown", (e) => {
		e.key === "Escape" && J.value && (e.stopPropagation(), J.value = "", J.dispatchEvent(new Event("input")));
	}), Y.addEventListener("keydown", (e) => {
		if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
		let t = [...Y.querySelectorAll("[role=tab]")];
		t[(t.indexOf(document.activeElement) + (e.key === "ArrowRight" ? 1 : -1) + t.length) % t.length].click(), Y.querySelector("[tabindex=\"0\"]")?.focus();
	});
	function $() {
		let e = de(), t = fe(e);
		t.some((e) => e.id === g.tab) || (g.tab = "installed");
		let n = t.find((e) => e.id === g.tab), r = e.filter((e) => e.update).length;
		Y.replaceChildren(...t.flatMap((e, n) => [e.category && !t[n - 1].category ? o("span", { class: "as-tab-sep" }) : null, o("button", {
			class: "as-tab",
			role: "tab",
			"aria-selected": String(g.view === "list" && e.id === g.tab),
			tabindex: e.id === g.tab ? "0" : "-1",
			onclick: () => Fe(e.id)
		}, e.label, e.badge && r ? o("span", { class: "as-count" }, String(r)) : null)].filter(Boolean))), J.placeholder = x("search.placeholder", { tab: n.label }), J.value !== (g.query[g.tab] ?? "") && (J.value = g.query[g.tab] ?? "");
		let i = g.view === "detail" ? e.find((e) => e.key === g.key) : null;
		g.view === "detail" && !i && (g.view = "list");
		let a = g.view === "options" ? Pe(n) : i ? Me(i, n) : Ae(e, n);
		X.replaceChildren(...[a].flat(3).filter(Boolean));
	}
	_.on("launch", (e) => {
		let t = {
			apps: "installed",
			modules: "kernel"
		}[e?.tab] ?? e?.tab;
		t === "repos" || t === "options" ? Q("options") : typeof t == "string" && Fe(t);
	});
	let Ie = i.on("change", () => $()), Le = d.on("change:appstore.showUnofficial", () => $()), Re = p.services?.on("change", (e) => {
		e.app === "appstore" && y().then($);
	});
	return _.on("destroy", () => {
		Ie(), Le(), Re?.();
	}), $(), S(), _;
}
export { k as default };
