import * as e from "/host/sdk.js";
import { Window as t, actionButton as n, appIcon as r, apps as i, fs as a, h as o, icon as s, kernel as c, kernelModules as l, repositories as u, settings as d, textField as f, toast as p, toggle as m } from "/host/sdk.js";
import * as h from "/host/system.js";
import { describePermission as ee, launch as te } from "/host/system.js";
// src/appstore/markdown.js
var ne = /(`+)([^`]+?)\1|\*\*(.+?)\*\*|__(.+?)__|\*(?!\s)(.+?)\*|\b_(?!\s)(.+?)_\b|!\[([^\]]*)\]\([^)]*\)|\[([^\]]+)\]\(\s*<?((?:[^()\s<>]|\([^()\s]*\))+)>?(?:\s+"[^"]*")?\s*\)|<(https?:\/\/[^>\s]+)>/;
function g(e) {
	let t = [], n = e;
	for (; n;) {
		let e = ne.exec(n);
		if (!e) {
			t.push(n);
			break;
		}
		e.index && t.push(n.slice(0, e.index)), e[2] === void 0 ? e[3] !== void 0 || e[4] !== void 0 ? t.push(o("strong", {}, ...g(e[3] ?? e[4]))) : e[5] !== void 0 || e[6] !== void 0 ? t.push(o("em", {}, ...g(e[5] ?? e[6]))) : e[7] === void 0 ? t.push(_(e[8] ?? e[10], e[9] ?? e[10])) : t.push(e[7] ? `[${e[7]}]` : "") : t.push(o("code", {}, e[2])), n = n.slice(e.index + e[0].length);
	}
	return t;
}
function _(e, t) {
	let n = null;
	try {
		let e = new URL(t);
		(e.protocol === "https:" || e.protocol === "http:") && (n = e.href);
	} catch {}
	let r = g(e);
	return n ? o("a", {
		href: n,
		target: "_blank",
		rel: "noopener noreferrer",
		title: n
	}, ...r) : o("span", {}, ...r);
}
var v = (e) => e.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((e) => e.trim()), y = /^\s{0,3}([-*+]|\d{1,9}[.)])\s+(.*)$/, b = /^\s{0,3}(#{1,6}\s|```|~~~|>|[-*+]\s|\d{1,9}[.)]\s|(-\s*){3,}$|(\*\s*){3,}$)/;
function x(e) {
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
			n.push(o(`h${a[1].length}`, {}, ...g(a[2]))), r++;
			continue;
		}
		if (/^\s{0,3}((-\s*){3,}|(\*\s*){3,}|(_\s*){3,})$/.test(e)) {
			n.push(o("hr")), r++;
			continue;
		}
		if (/^\s{0,3}>/.test(e)) {
			let e = [];
			for (; r < t.length && /^\s{0,3}>/.test(t[r]); r++) e.push(t[r].replace(/^\s{0,3}>\s?/, ""));
			n.push(o("blockquote", {}, ...x(e.join("\n"))));
			continue;
		}
		if (e.includes("|") && /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(t[r + 1] ?? "")) {
			let i = v(e), a = [];
			for (r += 2; r < t.length && t[r].includes("|") && t[r].trim(); r++) a.push(v(t[r]));
			n.push(o("div", { class: "md-table" }, o("table", {}, o("thead", {}, o("tr", {}, ...i.map((e) => o("th", {}, ...g(e))))), o("tbody", {}, ...a.map((e) => o("tr", {}, ...i.map((t, n) => o("td", {}, ...g(e[n] ?? "")))))))));
			continue;
		}
		let s = y.exec(e);
		if (s) {
			let e = /\d/.test(s[1]), i = [];
			for (; r < t.length;) {
				let n = y.exec(t[r]);
				if (n && /\d/.test(n[1]) === e && !/^\s{2,}/.test(t[r])) i.push([n[2]]), r++;
				else if (i.length && t[r].trim() && (/^\s{2,}/.test(t[r]) || !b.test(t[r]))) i.at(-1).push(t[r].trim()), r++;
				else break;
			}
			n.push(o(e ? "ol" : "ul", {}, ...i.map(([e, ...t]) => {
				let n = t.filter((e) => y.test(e)), r = [e, ...t.filter((e) => !y.test(e))].join(" ");
				return o("li", {}, ...g(r), n.length ? x(n.join("\n")) : null);
			})));
			continue;
		}
		let c = [];
		for (; r < t.length && t[r].trim() && !b.test(t[r]); r++) c.push(t[r].trim());
		c.length || (c.push(e.trim()), r++), n.push(o("p", {}, ...g(c.join(" "))));
	}
	return n;
}
// src/shared/i18n.js
function S(t, n) {
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
var { t: C } = S("appstore", {
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
		"updates.check": "Check for updates",
		"updates.taskHint": "An operation of the Scheduler, also with lilOS closed: a notification tells you what can be updated",
		"updates.when": "How often",
		"updates.daily": "Every day at 09:00",
		"updates.weekly": "Every Monday at 09:00",
		"updates.other": "As in the Scheduler",
		"updates.inScheduler": "Change it in the Scheduler",
		"updates.taskName": "Check for updates",
		"service.found": {
			one: "1 update available",
			other: "{n} updates available"
		},
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
		"updates.check": "Controlla gli aggiornamenti",
		"updates.taskHint": "Un’operazione della Pianificazione, anche a lilOS chiuso: un avviso dice cosa si può aggiornare",
		"updates.when": "Ogni quanto",
		"updates.daily": "Ogni giorno alle 09:00",
		"updates.weekly": "Ogni lunedì alle 09:00",
		"updates.other": "Come nella Pianificazione",
		"updates.inScheduler": "Cambiala nella Pianificazione",
		"updates.taskName": "Controlla aggiornamenti",
		"service.found": {
			one: "1 aggiornamento disponibile",
			other: "{n} aggiornamenti disponibili"
		},
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
}), re = /* @__PURE__ */ new Set([
	"fs.app",
	"fs.tmp",
	"fs.open",
	"ui.notify",
	"clipboard.write",
	"auth.remote"
]), ie = () => [
	{
		id: "system",
		label: C("category.system")
	},
	{
		id: "productivity",
		label: C("category.productivity")
	},
	{
		id: "media",
		label: C("category.media")
	},
	{
		id: "development",
		label: C("category.development")
	},
	{
		id: "other",
		label: C("category.other")
	},
	{
		id: "kernel",
		label: C("category.kernel")
	}
], ae = /* @__PURE__ */ new Set([
	"system",
	"productivity",
	"media",
	"development",
	"other"
]), oe = {
	glyph: "monitor",
	color: "#5f6673"
}, se = {
	glyph: "help",
	color: "#5f6673"
}, ce = {
	glyph: "window",
	color: "#3b6ef5"
}, w = e.systemReleases ?? null;
d.define({ "appstore.showUnofficial": !0 });
var T = (e, t) => {
	let n = e.split(".").map(Number), r = t.split(".").map(Number);
	return (n[0] - r[0] || n[1] - r[1] || n[2] - r[2]) > 0;
}, E = (e) => e.replace(/\.git$/i, "").replace(/\/+$/, ""), D = (e, t) => !!e?.url && E(e.url).toLowerCase() === E(t.url).toLowerCase(), O = (e) => E(e.url).split(/[/\\]/).pop() || e.name, k = (e) => (e ?? []).filter((e) => !re.has(e.split(":")[0]));
function le({ openWindow: ne }) {
	let g = c.user?.role === "admin", _ = {
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
	}, v = new t({
		title: "AppStore",
		icon: "download",
		width: 960,
		height: 640,
		minWidth: 560,
		minHeight: 420
	});
	v.el.classList.add("appstore");
	async function y(e, t, n) {
		if (!_.busy) {
			_.busy = e, $();
			try {
				let e = await t(), r = typeof n == "function" ? n(e) : n;
				r && p(r, { timeout: 5e3 }), await A({ quiet: !0 });
			} catch (e) {
				p(e.message, { timeout: 7e3 });
			} finally {
				_.busy = null, $();
			}
		}
	}
	async function b() {
		let e = await h.services?.list().catch(() => null);
		_.updates = e?.available ? e.services.find((e) => e.app === "appstore" && e.entry === "updates") ?? null : null;
	}
	let S = e.schedule?.available && typeof e.schedule.forApp == "function" ? e.schedule.forApp("appstore") : null, re = {
		daily: () => ({
			every: {
				n: 1,
				unit: "day"
			},
			times: ["09:00"]
		}),
		weekly: () => ({
			every: {
				n: 1,
				unit: "week"
			},
			days: [1],
			times: ["09:00"]
		})
	}, E = () => {
		let e = /* @__PURE__ */ new Date(), t = (e) => String(e).padStart(2, "0");
		return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}T09:00`;
	}, le = () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
	async function ue() {
		S && (_.updateTask = (await S.list().catch(() => [])).find((e) => e.what?.type === "service" && e.what.app === "appstore" && e.what.entry === "updates") ?? null, !_.updateTask && _.updates?.startup === "login" && (_.updateTask = await de({
			on: !0,
			every: "daily"
		}).catch(() => null), await h.services.setStartup("appstore", "updates", "none").catch(() => {}), await b()));
	}
	async function de({ on: e, every: t }) {
		let n = _.updateTask, r = t ?? fe(n) ?? "daily", i = {
			name: C("updates.taskName"),
			enabled: e,
			when: n && !t ? n.when : {
				...re[r](),
				start: n?.when?.start ?? E(),
				tz: n?.when?.tz ?? le()
			},
			what: {
				type: "service",
				app: "appstore",
				entry: "updates",
				params: {}
			},
			options: {
				...n?.options ?? {},
				notify: "error"
			}
		};
		return n ? S.update(n.id, i) : S.create(i);
	}
	let fe = (e) => e?.when?.every ? e.when.every.unit === "week" ? "weekly" : e.when.every.unit === "day" ? "daily" : "other" : null;
	async function pe(e) {
		try {
			_.updateTask = await de({
				on: _.updateTask?.enabled ?? !1,
				...e
			});
		} catch (e) {
			p(e.message, { timeout: 7e3 });
		}
		$();
	}
	async function me(e) {
		try {
			await h.services.setStartup("appstore", "updates", e ? "login" : "none"), await h.services[e ? "start" : "stop"]("appstore", "updates"), p(C(e ? "updates.atStartOn" : "updates.atStartOff"));
		} catch (e) {
			p(e.message, { timeout: 7e3 });
		}
		await b(), $();
	}
	async function A({ quiet: e = !1 } = {}) {
		e || (_.loading = !0, $());
		try {
			_.repos = await u.list(), await Promise.all(_.repos.map(async (e) => {
				try {
					_.catalogs.set(e.id, await u.catalog(e.id)), _.errors.delete(e.id);
				} catch (t) {
					_.catalogs.delete(e.id), _.errors.set(e.id, t.message);
				}
			})), _.modules = g ? await l.list().catch(() => []) : [], _.system = w ? await w.info().catch(() => null) : null, await b(), await ue(), await i.refresh();
		} catch (e) {
			p(e.message, { timeout: 7e3 });
		}
		_.loading = !1, $();
	}
	let j = () => _.repos.filter((e) => e.official || d.get("appstore.showUnofficial"));
	function he(t, n, r) {
		let i = n?.manifest ?? r.manifest, a = (n ? n.locales && e.locale?.manifest(n.manifest, n.locales) : e.locale?.manifest(r.manifest)) || i, o = n?.manifest.version ?? null, s = !!r && (!n || D(r.source, t));
		return {
			key: `app:${t?.id ?? "-"}:${i.id}`,
			kind: "app",
			id: i.id,
			name: a.name,
			description: a.description ?? "",
			icon: i.icon ?? se,
			publisher: i.publisher?.name ?? "",
			category: ae.has(i.category) ? i.category : "other",
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
			update: s && o && T(o, r.version) ? o : null,
			required: !!i.required,
			verified: !!r?.signed || !!t?.official
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
			icon: t?.module.icon ?? n?.icon ?? oe,
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
			verified: !!e?.official,
			required: !!n?.required || !!t?.module?.required
		};
	}
	function ge() {
		let e = _.system;
		if (!e) return null;
		let t = _.repos.find((e) => e.official) ?? null, n = t && _.catalogs.get(t.id)?.system?.system ? _.catalogs.get(t.id).system : null, r = n?.system.version ?? null, i = e.mode === "installed";
		return {
			key: "system:lilos",
			kind: "system",
			id: "lilos",
			name: "lilOS",
			description: C("system.description"),
			icon: ce,
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
			update: i && r && T(r, e.version) && r !== e.next ? r : null,
			required: !0,
			verified: !0
		};
	}
	function _e() {
		let e = i.list(), t = _.modules.filter((e) => e.enabled || e.running), n = [];
		for (let r of j()) {
			let i = _.catalogs.get(r.id);
			for (let t of i?.apps ?? []) t.manifest && n.push(he(r, t, e.find((e) => e.id === t.manifest.id)));
			if (g) for (let e of i?.modules ?? []) e.module && n.push(M(r, e, t.find((t) => t.name === e.module.name)));
		}
		for (let t of e) n.some((e) => e.kind === "app" && e.here && e.id === t.id) || n.push(he(_.repos.find((e) => D(t.source, e)) ?? null, null, t));
		for (let e of t) n.some((t) => t.kind === "module" && t.here && t.id === e.name) || n.push(M(_.repos.find((t) => D(e.source, t)) ?? null, null, e));
		let r = ge();
		return r ? [r, ...n] : n;
	}
	function ve(e) {
		let t = new Set(e.map((e) => e.category));
		return [
			{
				id: "installed",
				label: C("tab.installed"),
				filter: (e) => e.here
			},
			{
				id: "updates",
				label: C("tab.updates"),
				filter: (e) => !!e.update,
				badge: !0
			},
			...ie().filter((e) => t.has(e.id) || e.id === "kernel" && g).map((e) => ({
				...e,
				category: !0,
				filter: (t) => t.category === e.id
			}))
		];
	}
	let ye = (e, t) => !t || [
		e.name,
		e.id,
		e.description,
		e.publisher,
		e.repo ? O(e.repo) : ""
	].some((e) => e.toLowerCase().includes(t)), N = () => g && _.modules.some((e) => (e.enabled ?? null) !== (e.running ?? null)), P = () => g ? _.system?.next ?? null : null;
	function F({ title: e, glyph: r, height: i, body: a, confirm: s }) {
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
				label: C("action.cancel"),
				onClick: () => d(null)
			}), n({
				label: s.label,
				primary: s.primary,
				danger: s.danger,
				onClick: () => d(s.value)
			})))), ne(l);
		});
	}
	function I({ title: e, name: t, permissions: n = [], official: r, kernelModule: i = !1 }) {
		let a = k(n);
		return F({
			title: e,
			glyph: "download",
			height: i || !r ? 340 : 300,
			body: [
				o("p", { class: "as-dialog-lead" }, C(i ? "confirm.kernelModule" : "confirm.mayDo", { name: t })),
				!i && a.length ? o("ul", {}, ...a.map((e) => o("li", {}, ee(e)))) : null,
				!i && !a.length ? o("p", {}, C("permissions.none")) : null,
				r ? null : o("p", { class: "as-warning" }, C("confirm.unverified"))
			],
			confirm: {
				label: C(r ? "action.install" : "action.installAnyway"),
				primary: r,
				danger: !r,
				value: {
					grant: a,
					allowUnsigned: !r
				}
			}
		});
	}
	let be = (e) => F({
		title: C("confirm.uninstallTitle", { name: e.name }),
		glyph: "trash",
		height: 230,
		body: [o("p", { class: "as-dialog-lead" }, C("confirm.uninstall", { name: e.name })), o("p", {}, C("confirm.uninstallFiles"))],
		confirm: {
			label: C("action.uninstall"),
			danger: !0,
			value: !0
		}
	});
	async function xe(e) {
		let { repo: t, entry: n } = e, r = {
			type: "git",
			url: t.url,
			path: n.path,
			ref: _.catalogs.get(t.id)?.ref
		};
		if (e.kind === "module") {
			let n = await I({
				title: C("confirm.installTitle", { name: e.name }),
				name: e.name,
				official: t.official,
				kernelModule: !0
			});
			n && y("install", () => l.install(r, { allowUnsigned: n.allowUnsigned }), C("done.moduleInstalled", { name: e.name }));
			return;
		}
		let a = await I({
			title: C("confirm.installTitle", { name: e.name }),
			name: e.name,
			permissions: e.manifest.permissions,
			official: t.official
		});
		a && y("install", () => i.install(r, a), C("done.appInstalled", { name: e.name }));
	}
	async function Se(e) {
		let t = !!e.repo?.official;
		if (e.kind === "module") return t || await I({
			title: C("confirm.updateTitle", { name: e.name }),
			name: e.name,
			official: t,
			kernelModule: !0
		}) ? { allowUnsigned: !t } : null;
		let n = k(e.entry?.manifest.permissions).filter((t) => !e.have.granted.includes(t));
		return !n.length && t ? {
			grant: [],
			allowUnsigned: !1
		} : I({
			title: C("confirm.updateTitle", { name: e.name }),
			name: e.name,
			permissions: n,
			official: t
		});
	}
	let L = (e, t) => e.kind === "module" ? l.update(e.id, t) : i.update(e.id, t);
	async function Ce(e, { reinstall: t = !1 } = {}) {
		if (!h.updateApps) {
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
		let n = await h.updateApps(e.map(({ item: e, run: t }) => ({
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
	async function we(e, t, n) {
		let [r] = await Ce([{
			item: e,
			run: t
		}], n) ?? [null];
		if (r?.error) throw r.error;
		return r ? r.result : null;
	}
	async function R(e) {
		let t = await Se(e);
		if (!t) return;
		let n = e.kind === "module", r = e.name;
		y("update", () => n ? L(e, t) : we(e, () => L(e, t)), (e) => e ? e.unchanged ? C(n ? "done.moduleUpToDate" : "done.appUpToDate", { name: r }) : C(n ? "done.moduleUpdated" : "done.appUpdated", {
			name: r,
			version: e.version
		}) : null);
	}
	function Te(e) {
		y("update", async () => {
			let t = 0, n = [], r = e.find((e) => e.kind === "system");
			for (let i of e) {
				if (i === r) continue;
				let e = await Se(i);
				if (e) {
					if (i.kind !== "module") n.push({
						item: i,
						run: () => L(i, e)
					});
					else try {
						await L(i, e), t++;
					} catch (e) {
						p(`${i.name}: ${e.message}`, { timeout: 7e3 });
					}
				}
			}
			for (let e of n.length && await Ce(n) || []) e.error ? p(`${e.item.name}: ${e.error.message}`, { timeout: 7e3 }) : t++;
			if (r && await Ae(r)) try {
				(await w.update()).unchanged || t++;
			} catch (e) {
				p(`${r.name}: ${e.message}`, { timeout: 7e3 });
			}
			return t;
		}, (e) => C("done.updatedCount", { n: e }));
	}
	async function Ee(e) {
		let t = e.name;
		e.kind === "module" ? y("remove", () => l.remove(e.id), (e) => e.kept.length ? C("done.moduleRemovedDataKept", { name: t }) : C("done.moduleRemoved", { name: t })) : await be(e) && y("remove", () => i.uninstall(e.id), C("done.appRemoved", { name: t }));
	}
	let De = (e) => g && e.kind === "app" && e.here && !e.required, Oe = (e) => y("reinstall", () => we(e, () => i.update(e.id, {
		reinstall: !0,
		allowUnsigned: !e.verified
	}), { reinstall: !0 }), (t) => t ? C("done.appReinstalled", { name: e.name }) : null);
	async function ke(e, t) {
		t.disabled = !0, t.setAttribute("aria-busy", "true");
		try {
			let t = await u.readme(e.repo.id, e.entry.path), n = a.children(a.root).find((e) => e.type === "folder" && e.system && e.name === "Download");
			if (!n) throw Error(C("error.noDownloadFolder"));
			let r = a.create(n.id, {
				type: "file",
				name: `${e.name} - README.md`
			});
			await a.write(r.id, t), p(C("readme.saved", { file: r.name }), { timeout: 6e3 });
		} catch (e) {
			p(e.message, { timeout: 7e3 });
		} finally {
			t.disabled = !1, t.removeAttribute("aria-busy");
		}
	}
	let Ae = (e) => F({
		title: C("system.confirmTitle", { version: e.update }),
		glyph: "download",
		height: 290,
		body: [
			o("p", { class: "as-dialog-lead" }, C("system.confirmLead", {
				version: e.update,
				current: e.installed
			})),
			o("p", {}, C("system.confirmRestart")),
			o("p", {}, C("system.confirmRollback", { current: e.installed }))
		],
		confirm: {
			label: C("action.update"),
			primary: !0,
			value: !0
		}
	});
	async function je(e) {
		await Ae(e) && y("update", () => w.update(), (e) => e.unchanged ? C("system.upToDate") : C("system.ready", { version: e.version }));
	}
	let Me = (e) => y("system", () => w.use(e), (t) => t.restartRequired ? C("system.ready", { version: e }) : C("system.nextCancelled"));
	async function Ne(e) {
		await F({
			title: C("system.removeTitle", { version: e }),
			glyph: "trash",
			height: 210,
			body: [o("p", { class: "as-dialog-lead" }, C("system.removeLead", { version: e }))],
			confirm: {
				label: C("action.delete"),
				danger: !0,
				value: !0
			}
		}) && y("system", () => w.remove(e), C("system.removed", { version: e }));
	}
	async function Pe(e, t) {
		t.disabled = !0, t.setAttribute("aria-busy", "true");
		try {
			let t = await u.readme(e.repo.id, e.entry.path, "CHANGELOG.md"), n = a.children(a.root).find((e) => e.type === "folder" && e.system && e.name === "Download");
			if (!n) throw Error(C("error.noDownloadFolder"));
			let r = a.create(n.id, {
				type: "file",
				name: "lilOS - CHANGELOG.md"
			});
			await a.write(r.id, t), p(C("readme.saved", { file: r.name }), { timeout: 6e3 });
		} catch (e) {
			p(e.message, { timeout: 7e3 });
		} finally {
			t.disabled = !1, t.removeAttribute("aria-busy");
		}
	}
	let z = () => y("restart", async () => {
		let e = N();
		await l.restart(), await new Promise((e) => setTimeout(e, 2500)), e && h.requestRestart?.(C("restart.kernelReason"), "kernel-modules");
	}, C("done.kernelRestarted")), B = (e, t, { key: r = "", ...i } = {}) => {
		let a = `${e}|${r}`, o = n({
			label: e,
			onClick: () => (_.pressed = a, t()),
			...i
		});
		return o.disabled = !!_.busy, _.busy && _.pressed === a && o.setAttribute("aria-busy", "true"), o;
	}, V = (e, t = !1) => o("span", { class: "as-state" }, t ? s("check") : null, e), H = (e) => e.repo ? o("span", {
		class: "as-repo",
		title: e.repo.url
	}, s("link"), o("span", {}, O(e.repo))) : o("span", { class: "as-repo" }, s("folder"), o("span", {}, e.kind === "module" ? C("repo.manual") : C("repo.localFolder"))), Fe = (e) => e.repo && !e.repo.official ? o("span", { class: "as-unofficial" }, C("repo.unofficial")) : null, Ie = (e) => e.kind === "system" ? C("system.inUse") : e.kind === "module" ? C("status.installedModule") : C("status.installedApp"), U = (e, ...t) => o("div", { class: "as-section-title" }, e, ...t), W = (e, t) => o("div", { class: "as-fact" }, o("b", {}, e), String(t)), G = (e) => o("button", {
		class: "as-back",
		onclick: () => Q("list")
	}, s("arrowLeft"), e);
	function Le(e) {
		return e.kind === "system" ? e.update ? g ? B(C("action.update"), () => je(e), {
			primary: !0,
			key: e.key
		}) : V(C("status.updateAvailable", { version: e.update })) : P() ? V(C("system.nextShort", { version: P() })) : V(C("system.inUse"), !0) : e.update ? g ? B(C("action.update"), () => R(e), {
			primary: !0,
			key: e.key
		}) : V(C("status.updateAvailable", { version: e.update })) : e.here ? V(e.kind === "module" && !e.have.enabled ? C("status.removed") : Ie(e), !0) : e.elsewhere ? V(C("status.otherRepo")) : g ? B(C("action.install"), () => xe(e), { key: e.key }) : V(C("status.available"));
	}
	function Re(e, { uninstall: t = !1 } = {}) {
		let n = e.update ? `${e.installed} → ${e.update}` : e.here ? e.installed : e.offered, i = t && De(e) ? B(C("action.uninstall"), () => Ee(e), {
			danger: !0,
			key: e.key
		}) : null;
		return o("div", { class: "as-card" }, o("div", { class: "as-card-top" }, r(e.icon), o("div", { class: "as-card-head" }, o("button", {
			class: "as-card-open",
			onclick: () => Q("detail", e.key)
		}, e.name, o("span", { class: "as-ver" }, n)), o("div", { class: "as-card-desc" }, e.description))), o("div", { class: "as-card-foot" }, H(e), Fe(e), o("span", { class: "as-spacer" }), i && !e.update ? null : Le(e), i));
	}
	let K = (e, t) => o("div", { class: "as-grid" }, ...e.map((e) => Re(e, t)));
	function q() {
		let e = [];
		P() && [
			"installed",
			"updates",
			"system"
		].includes(_.tab) && e.push(o("div", { class: "as-banner" }, s("info"), o("span", {}, C("banner.systemRestart", { version: P() })), B(C("action.restartKernel"), z, {
			primary: !0,
			key: "system"
		}))), N() && [
			"installed",
			"updates",
			"kernel"
		].includes(_.tab) && e.push(o("div", { class: "as-banner" }, s("info"), o("span", {}, C("banner.restartNeeded")), B(C("action.restartKernel"), z, { primary: !0 })));
		let t = j().filter((e) => _.errors.has(e.id));
		return t.length && e.push(o("div", { class: "as-banner" }, s("info"), o("span", {}, t.length === 1 ? C("banner.repoUnreachable", { name: O(t[0]) }) : C("banner.reposUnreachable", { n: t.length })), o("button", {
			class: "as-link",
			onclick: () => Q("options")
		}, C("action.details")))), e;
	}
	function ze(e, t) {
		let n = (_.query[t.id] ?? "").trim().toLowerCase(), r = e.filter(t.filter).filter((e) => ye(e, n));
		if (Z.textContent = _.loading ? C("list.reading") : `${C("list.items", { n: r.length })} · ${C("list.repos", { n: j().length })}`, !r.length) {
			let e = _.loading && t.id !== "installed" ? C("list.reading") : n ? C("list.noResults", {
				query: n,
				tab: t.label
			}) : t.id === "updates" ? C("list.upToDate") : t.id === "installed" ? C("list.nothingInstalled") : C("list.emptyCategory");
			return [...q(), o("div", { class: "as-empty" }, e)];
		}
		if (t.id === "installed") {
			let e = r.filter((e) => e.kind === "app"), t = r.filter((e) => e.kind === "module"), n = r.filter((e) => e.kind === "system");
			return [
				...q(),
				n.length ? [U("lilOS"), K(n)] : null,
				e.length ? [U(C("list.apps")), K(e, { uninstall: !0 })] : null,
				t.length ? [U(C("list.modules")), K(t)] : null
			];
		}
		if (t.id === "updates") return [
			...q(),
			U(C("list.updates", { n: r.length }), g && r.length > 1 ? o("span", { class: "as-bulk" }, B(C("action.updateAll"), () => Te(r), { primary: !0 })) : null),
			K(r)
		];
		let i = (e) => Number(e.here || e.elsewhere);
		return [...q(), K([...r].sort((e, t) => i(e) - i(t) || e.name.localeCompare(t.name)))];
	}
	function Be(e, t) {
		let n = e.have, i = n.mode === "installed", a = P(), c = [];
		g && e.update && c.push(B(C("action.updateTo", { version: e.update }), () => je(e), {
			primary: !0,
			key: e.key
		}));
		let l = g && i ? (n.releases ?? []).filter((e) => e !== n.version) : [], u = (e) => o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, `lilOS ${e}`), o("span", {}, e === a ? C("system.next", { version: e }) : e === n.failed?.version ? C("system.keptFailed") : C("system.keptHint"))), e === a ? B(C("system.cancelNext"), () => Me(n.version), { key: e }) : B(C("system.use"), () => Me(e), { key: e }), e === a ? null : B(C("action.delete"), () => Ne(e), {
			danger: !0,
			key: e
		}));
		return Z.textContent = `lilOS ${n.version}`, o("div", { class: "as-detail" }, G(t.label), o("div", { class: "as-detail-head" }, r(e.icon), o("div", { class: "as-detail-title" }, o("h1", {}, "lilOS"), o("div", { class: "as-sub" }, C("detail.kindSystem")), o("div", { class: "as-meta" }, H(e), o("span", { class: "as-state" }, s("shield"), C("detail.verified")), o("span", { class: "as-state" }, C("detail.required"))), c.length ? o("div", { class: "as-detail-actions" }, ...c) : null)), a ? o("div", { class: "as-banner" }, s("info"), o("span", {}, C("banner.systemRestart", { version: a })), B(C("action.restartKernel"), z, {
			primary: !0,
			key: "system"
		})) : null, g && n.failed ? o("div", { class: "as-banner" }, s("warning"), o("span", {}, C("system.failed", {
			version: n.failed.version,
			reason: n.failed.reason,
			current: n.version
		}))) : null, i ? null : o("div", { class: "as-banner" }, s("info"), o("span", {}, C("system.development"))), o("div", { class: "as-facts" }, W(C("system.inUse"), n.version), W(C("detail.version"), e.offered ?? "—"), W(C("detail.repository"), e.repo ? O(e.repo) : "—"), W(C("detail.state"), a ? C("system.next", { version: a }) : C(i ? "system.installedMode" : "system.developmentMode"))), l.length ? [U(C("system.kept")), o("div", { class: "as-group" }, ...l.map(u))] : null, o("div", { class: "as-perm" }, o("h3", {}, s("info"), C("detail.warning")), o("p", {}, C("system.warning"))), e.changelog ? [o("div", { class: "as-readme-title" }, s("file"), "CHANGELOG.md"), o("article", { class: "as-readme" }, ...x(e.changelog))] : null, e.changelog && e.changelogTruncated ? o("p", { class: "as-readme-cut" }, C("readme.truncated"), " ", o("button", {
			class: "as-link",
			onclick: (t) => Pe(e, t.currentTarget)
		}, s("download"), C("readme.download"))) : null, o("div", { class: "as-readme-title" }, s("file"), "README.md"), e.readme ? o("article", { class: "as-readme" }, ...x(e.readme)) : o("p", { class: "as-muted" }, e.repo ? C("readme.none") : C("readme.notFromRepo")), e.readme && e.readmeTruncated ? o("p", { class: "as-readme-cut" }, C("readme.truncated"), " ", o("button", {
			class: "as-link",
			onclick: (t) => ke(e, t.currentTarget)
		}, s("download"), C("readme.download"))) : null);
	}
	function Ve(e, t) {
		if (e.kind === "system") return Be(e, t);
		let n = e.kind === "module", i = [];
		e.here && !n && i.push(B(C("action.open"), () => te(e.id), { primary: !e.update || !g })), g && (e.update && i.push(B(C("action.updateTo", { version: e.update }), () => R(e), {
			primary: !0,
			key: e.key
		})), e.here && (!n || e.have.enabled) && (!e.update && e.have.source && i.push(B(C("action.checkUpdates"), () => R(e), { key: e.key })), n || i.push(B(C("action.reinstall"), () => Oe(e), { key: e.key })), e.required || i.push(B(C(n ? "action.remove" : "action.uninstall"), () => Ee(e), {
			danger: !0,
			key: e.key
		}))), !e.here && !e.elsewhere && e.entry && i.push(B(e.repo.official ? C("action.install") : C("action.installAnyway"), () => xe(e), {
			primary: !0,
			danger: !e.repo.official,
			key: e.key
		})));
		let a = n && e.have ? e.have.enabled ? e.have.running === e.have.enabled ? C("moduleState.inUse") : e.have.running ? C("moduleState.oldUntilRestart", { version: e.have.running }) : C("moduleState.nextStart") : C("moduleState.removed") : null, c = k(e.manifest?.permissions);
		return Z.textContent = `${e.name} ${e.offered ?? e.installed}`, o("div", { class: "as-detail" }, G(t.label), o("div", { class: "as-detail-head" }, r(e.icon), o("div", { class: "as-detail-title" }, o("h1", {}, e.name), o("div", { class: "as-sub" }, [
			e.publisher,
			C(n ? "detail.kindModule" : "detail.kindApp"),
			ie().find((t) => t.id === e.category)?.label
		].filter(Boolean).join(" · ")), o("div", { class: "as-meta" }, H(e), e.verified ? o("span", { class: "as-state" }, s("shield"), C("detail.verified")) : e.repo ? o("span", { class: "as-unofficial" }, C("detail.unverified")) : null, e.required ? o("span", { class: "as-state" }, C("detail.required")) : null, e.elsewhere ? o("span", { class: "as-state" }, C(n ? "status.installedElsewhereModule" : "status.installedElsewhereApp")) : null), i.length ? o("div", { class: "as-detail-actions" }, ...i) : null)), e.repo && !e.repo.official && !e.here ? o("div", { class: "as-banner" }, s("info"), o("span", {}, C("detail.unofficialWarning"))) : null, o("div", { class: "as-facts" }, W(C("detail.version"), e.offered ?? e.installed), W(Ie(e), e.installed ?? "—"), W(C("detail.repository"), e.repo ? O(e.repo) : "—"), n ? W(C("detail.provides"), e.provides.join(", ") || "—") : W(C("detail.id"), e.id), a ? W(C("detail.state"), a) : null), n ? o("div", { class: "as-perm" }, o("h3", {}, s("info"), C("detail.warning")), o("p", {}, C("detail.moduleWarning"))) : o("div", { class: "as-perm" }, o("h3", {}, s("shield"), C("detail.mayDo")), c.length ? o("ul", {}, ...c.map((e) => o("li", {}, s("check"), ee(e)))) : o("p", { class: "as-muted" }, C("permissions.none"))), o("div", { class: "as-readme-title" }, s("file"), "README.md"), e.readme ? o("article", { class: "as-readme" }, ...x(e.readme)) : null, e.readme && e.readmeTruncated ? o("p", { class: "as-readme-cut" }, C("readme.truncated"), " ", o("button", {
			class: "as-link",
			onclick: (t) => ke(e, t.currentTarget)
		}, s("download"), C("readme.download"))) : null, e.readme ? null : o("p", { class: "as-muted" }, e.repo ? C("readme.none") : C("readme.notFromRepo")));
	}
	function He() {
		let e = _.updateTask, t = fe(e) ?? "daily", n = m({
			value: !!e?.enabled,
			label: C("updates.check"),
			onChange: (e) => pe({ on: e })
		}), r = [
			{
				value: "daily",
				label: C("updates.daily")
			},
			{
				value: "weekly",
				label: C("updates.weekly")
			},
			...t === "other" ? [{
				value: "other",
				label: C("updates.other")
			}] : []
		], i = o("select", {
			class: "ctl-select",
			"aria-label": C("updates.when")
		}, r.map((e) => o("option", {
			value: e.value,
			selected: e.value === t
		}, e.label)));
		i.disabled = !e?.enabled, i.addEventListener("change", () => {
			i.value !== "other" && pe({ every: i.value });
		});
		let a = o("button", {
			class: "as-link",
			type: "button",
			style: "background:none;border:0;padding:0;cursor:pointer;width:max-content",
			onclick: () => te("scheduler", { task: e?.id }, "main")
		}, C("updates.inScheduler"));
		return o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, C("updates.check")), o("span", {}, C("updates.taskHint")), e ? a : null), i, n);
	}
	function Ue() {
		if (S && _.updates) return He();
		let e = _.updates, t = !e || e.system && !e.canControl, n = e ? e.system ? C("updates.bySystem") : C("updates.description") : C("updates.needsEngine"), r = m({
			value: !!e && e.startup !== "none",
			label: C("updates.atStart"),
			onChange: me
		});
		return r.disabled = t, o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, C("updates.atStart")), o("span", {}, n)), r);
	}
	function We(e) {
		let t = _.newRepo;
		return Z.textContent = C("options.title"), o("div", { class: "as-options" }, G(e.label), o("h2", {}, C("options.title")), o("p", { class: "as-lead" }, C("options.lead")), U("AppStore"), o("div", { class: "as-group" }, o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, C("options.showUnofficial")), o("span", {}, C("options.showUnofficialHint"))), m({
			value: d.get("appstore.showUnofficial"),
			label: C("options.showUnofficial"),
			onChange: (e) => d.set("appstore.showUnofficial", e)
		})), Ue()), U(C("options.repositories"), o("span", { class: "as-bulk" }, B(C("action.reload"), () => A()))), o("div", { class: "as-group" }, ..._.repos.map((e) => {
			let t = _.catalogs.get(e.id), n = (e) => (e ?? []).filter((e) => !e.error).length, i = [...t?.apps ?? [], ...t?.modules ?? []].filter((e) => e.error), a = _.errors.has(e.id) ? C("options.unreachable", { error: _.errors.get(e.id) }) : t ? [
				C("options.apps", { n: n(t.apps) }),
				C("options.modules", { n: n(t.modules) }),
				i.length ? C("options.invalid", { n: i.length }) : null
			].filter(Boolean).join(" · ") : C("options.reading");
			return o("div", { class: "as-row" }, r(e.official ? {
				glyph: "shield",
				color: "#30a46c"
			} : {
				glyph: "link",
				color: "#8a909b"
			}), o("div", { class: "as-row-text" }, o("b", {}, O(e), o("span", { class: "as-muted" }, ` · ${e.name}`)), o("span", {}, e.url), o("span", {
				class: _.errors.has(e.id) ? "as-error" : null,
				title: i.map((e) => `${e.path}: ${e.error}`).join("\n") || null
			}, a)), e.official ? o("span", { class: "as-muted" }, C("options.alwaysThere")) : g ? B(C("action.remove"), () => y("repo", () => u.remove(e.id), C("done.repoRemoved", { name: O(e) })), {
				danger: !0,
				key: e.id
			}) : null);
		})), U(C("options.addRepo")), g ? o("div", { class: "as-group" }, o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, C("options.address")), o("span", {}, C("options.addressHint"))), f({
			value: t.url,
			placeholder: "https://…",
			label: C("options.addressLabel"),
			onInput: (e) => {
				t.url = e;
			}
		})), o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, C("options.name")), o("span", {}, C("options.nameHint"))), f({
			value: t.name,
			placeholder: C("options.name"),
			label: C("options.nameLabel"),
			onInput: (e) => {
				t.name = e;
			}
		})), o("div", { class: "as-row as-row-end" }, B(C("action.add"), () => y("repo", async () => {
			let e = await u.add(t.url.trim(), t.name.trim() || void 0);
			return _.newRepo = {
				url: "",
				name: ""
			}, e;
		}, (e) => C("done.repoAdded", { name: O(e) })), { primary: !0 }))) : o("p", { class: "as-muted" }, C("options.adminOnly")));
	}
	let J = o("input", {
		type: "search",
		autocomplete: "off",
		spellcheck: "false",
		"aria-label": C("search.label")
	}), Y = o("div", {
		class: "as-tabs",
		role: "tablist"
	}), X = o("main", { class: "as-main" }), Z = o("span", { class: "as-foot-text" });
	v.body.append(o("div", { class: "as-head" }, o("label", { class: "as-search" }, s("search"), J), Y), X, o("footer", { class: "as-foot" }, Z, o("span", { class: "as-spacer" }), o("button", {
		class: "as-link",
		onclick: () => Q("options")
	}, s("gear"), C("options.title"))));
	function Q(e, t = null) {
		_.view = e, _.key = t, $(), X.scrollTop = 0;
	}
	function Ge(e) {
		_.tab = e, Q("list");
	}
	J.addEventListener("input", () => {
		_.query[_.tab] = J.value, _.view = "list", $();
	}), J.addEventListener("keydown", (e) => {
		e.key === "Escape" && J.value && (e.stopPropagation(), J.value = "", J.dispatchEvent(new Event("input")));
	}), Y.addEventListener("keydown", (e) => {
		if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
		let t = [...Y.querySelectorAll("[role=tab]")];
		t[(t.indexOf(document.activeElement) + (e.key === "ArrowRight" ? 1 : -1) + t.length) % t.length].click(), Y.querySelector("[tabindex=\"0\"]")?.focus();
	});
	function $() {
		let e = _e(), t = ve(e);
		t.some((e) => e.id === _.tab) || (_.tab = "installed");
		let n = t.find((e) => e.id === _.tab), r = e.filter((e) => e.update).length;
		Y.replaceChildren(...t.flatMap((e, n) => [e.category && !t[n - 1].category ? o("span", { class: "as-tab-sep" }) : null, o("button", {
			class: "as-tab",
			role: "tab",
			"aria-selected": String(_.view === "list" && e.id === _.tab),
			tabindex: e.id === _.tab ? "0" : "-1",
			onclick: () => Ge(e.id)
		}, e.label, e.badge && r ? o("span", { class: "as-count" }, String(r)) : null)].filter(Boolean))), J.placeholder = C("search.placeholder", { tab: n.label }), J.value !== (_.query[_.tab] ?? "") && (J.value = _.query[_.tab] ?? "");
		let i = _.view === "detail" ? e.find((e) => e.key === _.key) : null;
		_.view === "detail" && !i && (_.view = "list");
		let a = _.view === "options" ? We(n) : i ? Ve(i, n) : ze(e, n);
		X.replaceChildren(...[a].flat(3).filter(Boolean));
	}
	v.on("launch", (e) => {
		let t = {
			apps: "installed",
			modules: "kernel"
		}[e?.tab] ?? e?.tab;
		t === "repos" || t === "options" ? Q("options") : typeof t == "string" && Ge(t);
	});
	let Ke = i.on("change", () => $()), qe = d.on("change:appstore.showUnofficial", () => $()), Je = h.services?.on("change", (e) => {
		e.app === "appstore" && b().then($);
	});
	return v.on("destroy", () => {
		Ke(), qe(), Je?.();
	}), $(), A(), v;
}
export { le as default };
