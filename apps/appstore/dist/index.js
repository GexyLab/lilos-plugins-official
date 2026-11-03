import * as e from "/host/sdk.js";
import { Window as t, actionButton as n, appIcon as r, apps as i, busyButton as a, fs as o, h as s, icon as c, kernel as l, kernelModules as u, messageBox as d, packages as f, repositories as p, settings as m, storage as h, textField as ee, toast as g, toggle as _ } from "/host/sdk.js";
import * as v from "/host/system.js";
import { compareVersions as y, describePermission as b, launch as te, needsGrant as x } from "/host/system.js";
// src/appstore/markdown.js
var S = /(`+)([^`]+?)\1|\*\*(.+?)\*\*|__(.+?)__|\*(?!\s)(.+?)\*|\b_(?!\s)(.+?)_\b|!\[([^\]]*)\]\([^)]*\)|\[([^\]]+)\]\(\s*<?((?:[^()\s<>]|\([^()\s]*\))+)>?(?:\s+"[^"]*")?\s*\)|<(https?:\/\/[^>\s]+)>/;
function C(e) {
	let t = [], n = e;
	for (; n;) {
		let e = S.exec(n);
		if (!e) {
			t.push(n);
			break;
		}
		e.index && t.push(n.slice(0, e.index)), e[2] === void 0 ? e[3] !== void 0 || e[4] !== void 0 ? t.push(s("strong", {}, ...C(e[3] ?? e[4]))) : e[5] !== void 0 || e[6] !== void 0 ? t.push(s("em", {}, ...C(e[5] ?? e[6]))) : e[7] === void 0 ? t.push(w(e[8] ?? e[10], e[9] ?? e[10])) : t.push(e[7] ? `[${e[7]}]` : "") : t.push(s("code", {}, e[2])), n = n.slice(e.index + e[0].length);
	}
	return t;
}
function w(e, t) {
	let n = null;
	try {
		let e = new URL(t);
		(e.protocol === "https:" || e.protocol === "http:") && (n = e.href);
	} catch {}
	let r = C(e);
	return n ? s("a", {
		href: n,
		target: "_blank",
		rel: "noopener noreferrer",
		title: n
	}, ...r) : s("span", {}, ...r);
}
var T = (e) => e.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((e) => e.trim()), E = /^\s{0,3}([-*+]|\d{1,9}[.)])\s+(.*)$/, D = /^\s{0,3}(#{1,6}\s|```|~~~|>|[-*+]\s|\d{1,9}[.)]\s|(-\s*){3,}$|(\*\s*){3,}$)/;
function O(e) {
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
			r++, n.push(s("pre", {}, s("code", {}, e.join("\n"))));
			continue;
		}
		let a = /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/.exec(e);
		if (a) {
			n.push(s(`h${a[1].length}`, {}, ...C(a[2]))), r++;
			continue;
		}
		if (/^\s{0,3}((-\s*){3,}|(\*\s*){3,}|(_\s*){3,})$/.test(e)) {
			n.push(s("hr")), r++;
			continue;
		}
		if (/^\s{0,3}>/.test(e)) {
			let e = [];
			for (; r < t.length && /^\s{0,3}>/.test(t[r]); r++) e.push(t[r].replace(/^\s{0,3}>\s?/, ""));
			n.push(s("blockquote", {}, ...O(e.join("\n"))));
			continue;
		}
		if (e.includes("|") && /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(t[r + 1] ?? "")) {
			let i = T(e), a = [];
			for (r += 2; r < t.length && t[r].includes("|") && t[r].trim(); r++) a.push(T(t[r]));
			n.push(s("div", { class: "md-table" }, s("table", {}, s("thead", {}, s("tr", {}, ...i.map((e) => s("th", {}, ...C(e))))), s("tbody", {}, ...a.map((e) => s("tr", {}, ...i.map((t, n) => s("td", {}, ...C(e[n] ?? "")))))))));
			continue;
		}
		let o = E.exec(e);
		if (o) {
			let e = /\d/.test(o[1]), i = [];
			for (; r < t.length;) {
				let n = E.exec(t[r]);
				if (n && /\d/.test(n[1]) === e && !/^\s{2,}/.test(t[r])) i.push([n[2]]), r++;
				else if (i.length && t[r].trim() && (/^\s{2,}/.test(t[r]) || !D.test(t[r]))) i.at(-1).push(t[r].trim()), r++;
				else break;
			}
			n.push(s(e ? "ol" : "ul", {}, ...i.map(([e, ...t]) => {
				let n = t.filter((e) => E.test(e)), r = [e, ...t.filter((e) => !E.test(e))].join(" ");
				return s("li", {}, ...C(r), n.length ? O(n.join("\n")) : null);
			})));
			continue;
		}
		let c = [];
		for (; r < t.length && t[r].trim() && !D.test(t[r]); r++) c.push(t[r].trim());
		c.length || (c.push(e.trim()), r++), n.push(s("p", {}, ...C(c.join(" "))));
	}
	return n;
}
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
var { t: k } = ne("appstore", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"AppStore\",\"@description\":\"Installs, updates and removes apps and kernel modules from repositories; checks for updates even with lilOS closed.\",\"@entrypoints.updates.label\":\"Updates\",\"@entrypoints.updates.params.ore.label\":\"Check every (hours)\",\"category.system\":\"System\",\"category.productivity\":\"Productivity\",\"category.media\":\"Media\",\"category.development\":\"Development\",\"category.other\":\"Other\",\"category.kernel\":\"Kernel\",\"tab.installed\":\"Installed\",\"tab.updates\":\"Updates\",\"search.label\":\"Search\",\"search.placeholder\":\"Search in {tab}\",\"action.install\":\"Install\",\"action.installAnyway\":\"Install anyway\",\"action.installName\":\"Install {name}\",\"action.update\":\"Update\",\"action.updateTo\":\"Update to {version}\",\"action.updateAll\":\"Update all\",\"action.checkUpdates\":\"Check for updates\",\"action.open\":\"Open\",\"action.reinstall\":\"Reinstall\",\"action.remove\":\"Remove\",\"action.uninstall\":\"Uninstall\",\"action.restartKernel\":\"Restart the kernel\",\"action.details\":\"Details\",\"action.reload\":\"Reload\",\"action.add\":\"Add\",\"confirm.installTitle\":\"Install {name}\",\"confirm.updateTitle\":\"Update {name}\",\"confirm.uninstallTitle\":\"Uninstall {name}\",\"confirm.uninstall\":\"{name} will be removed for every user, with its settings and its data.\",\"confirm.uninstallFiles\":\"The files it had created are deleted, or go to the Trash if someone changed them. Your other files stay where they are.\",\"confirm.kernelModule\":\"{name} is a kernel module: its code will run in the kernel, with full access to users and files.\",\"confirm.replaces\":\"{name} takes the place of {names}: their settings and connections move to it, and they are removed.\",\"confirm.mayDo\":\"{name} will be able to:\",\"confirm.unverified\":\"Not verified: it comes from an unofficial repository. There is no way to know who wrote it, or that its code has not been changed. Install it only if you trust whoever distributes it.\",\"permissions.none\":\"No permissions beyond its own data.\",\"done.appInstalled\":\"{name} installed\",\"done.moduleInstalled\":\"{name} installed: restart the kernel to use it\",\"done.moduleReplaced\":\"It takes the place of {names}, with their settings.\",\"done.appUpToDate\":\"{name} is already up to date\",\"done.moduleUpToDate\":\"{name} is already up to date\",\"done.appUpdated\":\"{name} updated to {version}\",\"done.moduleUpdated\":\"{name} {version} installed: restart the kernel\",\"done.updatedCount\":{\"one\":\"{n} item updated\",\"other\":\"{n} items updated\"},\"done.appRemoved\":\"{name} uninstalled\",\"done.moduleRemoved\":\"{name} removed: restart the kernel\",\"done.moduleRemovedDataKept\":\"{name} removed (its data is kept): restart the kernel\",\"done.appReinstalled\":\"{name} reinstalled\",\"done.kernelRestarted\":\"Kernel restarted\",\"restart.kernelReason\":\"The kernel started again with other modules\",\"done.repoRemoved\":\"{name} removed\",\"done.repoAdded\":\"{name} added\",\"updates.atStart\":\"Check for updates at startup\",\"updates.atStartOn\":\"The AppStore will check for updates when you sign in\",\"updates.atStartOff\":\"Checking for updates at startup turned off\",\"updates.needsEngine\":\"Needs the kernel’s service engine (the services-isolate module)\",\"updates.bySystem\":\"Chosen by an administrator for everyone: change it in Control Panel → Startup → Services\",\"updates.description\":\"When you sign in and then at intervals (every 24 hours, change it in Control Panel → Startup → Services), even with lilOS closed: a notification tells you what can be updated\",\"updates.check\":\"Check for updates\",\"updates.taskHint\":\"An operation of the Scheduler, also with lilOS closed: a notification tells you what can be updated\",\"updates.when\":\"How often\",\"updates.daily\":\"Every day at 09:00\",\"updates.weekly\":\"Every Monday at 09:00\",\"updates.other\":\"As in the Scheduler\",\"updates.inScheduler\":\"Change it in the Scheduler\",\"updates.taskName\":\"Check for updates\",\"service.found\":{\"one\":\"1 update available\",\"other\":\"{n} updates available\"},\"notify.updates\":{\"one\":\"Update available: {names}. Open the AppStore.\",\"other\":\"{n} updates available: {names}. Open the AppStore.\"},\"readme.saved\":\"README saved in Download as “{file}”\",\"readme.truncated\":\"The README is too long: only its beginning is shown here.\",\"readme.download\":\"Download the full README\",\"readme.none\":\"This package has no README.\",\"readme.notFromRepo\":\"The README is read from the repository: this item does not come from a listed repository.\",\"error.noDownloadFolder\":\"The Download folder is missing\",\"status.available\":\"Available\",\"status.updateAvailable\":\"Update {version}\",\"status.removed\":\"Removed\",\"status.replacedBy\":\"Replaced by {name}\",\"status.otherRepo\":\"From another repository\",\"status.installedApp\":\"Installed\",\"status.installedModule\":\"Installed\",\"status.installedElsewhereApp\":\"Installed from another repository\",\"status.installedElsewhereModule\":\"Installed from another repository\",\"repo.manual\":\"Installed manually\",\"repo.localFolder\":\"Local folder\",\"repo.unofficial\":\"unofficial\",\"banner.restartNeeded\":\"Changes to modules take effect from the next kernel start.\",\"banner.repoUnreachable\":\"{name} is unreachable: what it offers is not listed.\",\"banner.reposUnreachable\":{\"one\":\"{n} repository is unreachable: what it offers is not listed.\",\"other\":\"{n} repositories are unreachable: what they offer is not listed.\"},\"banner.reposDisabled\":{\"one\":\"{n} repository is off: what it offers is not listed.\",\"other\":\"{n} repositories are off: what they offer is not listed.\"},\"banner.officialDisabled\":\"The official repository is off: its apps and the updates of lilOS and of its apps are not listed.\",\"list.reading\":\"Reading the repositories…\",\"list.items\":{\"one\":\"{n} item\",\"other\":\"{n} items\"},\"list.repos\":{\"one\":\"{n} repository\",\"other\":\"{n} repositories\"},\"list.noResults\":\"No results for “{query}” in {tab}\",\"list.upToDate\":\"Everything is up to date\",\"list.nothingInstalled\":\"Nothing installed\",\"list.emptyCategory\":\"Nothing in this category\",\"list.apps\":\"Apps\",\"list.modules\":\"Kernel modules\",\"list.updates\":{\"one\":\"{n} update\",\"other\":\"{n} updates\"},\"detail.kindApp\":\"App\",\"detail.kindModule\":\"Kernel module\",\"detail.verified\":\"Verified\",\"detail.unverified\":\"unofficial · not verified\",\"detail.required\":\"Required by lilOS\",\"detail.unofficialWarning\":\"It comes from an unofficial repository: there is no way to know who wrote it, or that its code has not been changed.\",\"detail.version\":\"Version\",\"detail.repository\":\"Repository\",\"detail.provides\":\"Provides\",\"detail.id\":\"ID\",\"detail.state\":\"Status\",\"detail.warning\":\"Warning\",\"detail.moduleWarning\":\"A module’s code runs in the kernel, with full access to users and files. Changes take effect from the next kernel start.\",\"detail.mayDo\":\"Allowed to\",\"moduleState.removed\":\"Removed: active until restart\",\"moduleState.oldUntilRestart\":\"{version} in use until restart\",\"moduleState.nextStart\":\"Active from the next start\",\"moduleState.inUse\":\"In use\",\"action.delete\":\"Delete\",\"detail.kindSystem\":\"Operating system\",\"banner.systemRestart\":\"lilOS {version} starts with the next restart of the kernel.\",\"system.description\":\"The system itself: desktop, kernel and SDK.\",\"system.inUse\":\"In use\",\"system.nextShort\":\"{version} at restart\",\"system.next\":\"{version} starts with the next restart\",\"system.confirmTitle\":\"Update lilOS to {version}?\",\"system.confirmLead\":\"lilOS {version} is installed next to {current}, the version in use, for every user.\",\"system.confirmRestart\":\"It starts when the kernel restarts: everyone signed in loses the connection for a few seconds, then lilOS loads again.\",\"system.confirmRollback\":\"If it does not start, lilOS goes back to {current} by itself and tells the administrators.\",\"system.upToDate\":\"lilOS is up to date\",\"system.ready\":\"lilOS {version} is ready: it starts with the next restart of the kernel\",\"system.nextCancelled\":\"The change of version has been called off\",\"system.removeTitle\":\"Delete lilOS {version}?\",\"system.removeLead\":\"The files of lilOS {version} are deleted from the disk: you can no longer go back to it. Data and apps are not touched.\",\"system.removed\":\"lilOS {version} deleted\",\"system.failed\":\"lilOS {version} did not start ({reason}): lilOS went back to {current} by itself.\",\"system.development\":\"This lilOS runs from a copy of its repository (development): it is updated with git, not from here.\",\"system.installedMode\":\"Installed\",\"system.developmentMode\":\"Development copy\",\"system.kept\":\"Versions kept on disk\",\"system.keptHint\":\"To go back to it\",\"system.keptFailed\":\"Did not start\",\"system.use\":\"Use this version\",\"system.cancelNext\":\"Call off\",\"system.warning\":\"lilOS is updated for every user. The new version is put next to the one in use and starts with the kernel’s restart; the one before stays on disk until you delete it.\",\"options.title\":\"Options\",\"options.lead\":\"AppStore preferences and the repositories apps and modules come from. Switch a repository off to list only what the active ones offer.\",\"options.showUnofficial\":\"Show unofficial repositories\",\"options.showUnofficialHint\":\"When off, the tabs list only what the official repository offers\",\"options.repositories\":\"Repositories\",\"options.unreachable\":\"Unreachable: {error}\",\"options.apps\":{\"one\":\"{n} app\",\"other\":\"{n} apps\"},\"options.modules\":{\"one\":\"{n} module\",\"other\":\"{n} modules\"},\"options.invalid\":{\"one\":\"{n} invalid package\",\"other\":\"{n} invalid packages\"},\"options.reading\":\"Reading…\",\"options.alwaysThere\":\"Always present\",\"options.active\":\"{name} active\",\"options.disabled\":\"Off: not read, nothing of it is listed or offered as an update\",\"options.addRepo\":\"Add a repository\",\"options.address\":\"Address\",\"options.addressHint\":\"A git repository with catalog.json, for example https://github.com/name/repo\",\"options.addressLabel\":\"Repository address\",\"options.name\":\"Name\",\"options.nameHint\":\"Optional: otherwise the one in its catalog\",\"options.nameLabel\":\"Repository name\",\"options.adminOnly\":\"Only an administrator can add and remove repositories.\",\"action.close\":\"Close\",\"action.later\":\"Later\",\"action.restartNow\":\"Restart now\",\"confirm.removeTitle\":\"Remove {name}\",\"confirm.removeModule\":\"{name} will stop running in the kernel from its next start.\",\"restart.askTitle\":\"Restart the kernel?\",\"restart.askLead\":\"Installing {name} is done. The kernel modules installed start working after the kernel restarts.\",\"restart.askHint\":\"Restarting takes a few seconds: lilOS reconnects by itself.\",\"restart.askRemovedLead\":\"{name} is removed. The kernel modules removed with it stop after the kernel restarts.\",\"deps.title\":\"Needs\",\"deps.install\":\"installs version {version}\",\"deps.update\":\"updates {from} → {version}\",\"deps.kindModule\":\"Kernel module\",\"deps.kindApp\":\"App\",\"deps.why\":\"Needed by {name}\",\"deps.whyReason\":\"Needed by {name}: {reason}\",\"deps.unverifiedModule\":\"Not verified: its code will run in the kernel with full access.\",\"deps.unverifiedApp\":\"Not verified: from an unofficial repository.\",\"deps.brings\":\"Also installs: {name} ({kind})\",\"deps.tick\":\"Also install {name}\",\"deps.cannot\":\"{name} cannot be installed now:\",\"deps.required\":\"Also installed\",\"deps.optional\":\"Optional: install them too?\",\"deps.unavailable\":\"Not available now: {list}\",\"deps.restartNote\":\"Kernel modules start working after the kernel restarts: you will be asked at the end.\",\"deps.installed\":{\"zero\":\"{name} installed\",\"one\":\"{name} installed, with {n} more package\",\"other\":\"{name} installed, with {n} more packages\"},\"deps.alsoRemove\":\"Also remove {name}\",\"deps.unneededTitle\":\"No longer needed\",\"deps.unneededHint\":\"They were installed only for it and nothing else uses them. The ticked ones are removed too.\",\"deps.blocked\":\"{name} cannot be removed: {list} needs it.\",\"deps.blockedHint\":{\"one\":\"Remove that one first, then this one.\",\"other\":\"Remove those first, then this one.\"},\"deps.appRemovedWith\":{\"one\":\"{name} uninstalled, with {n} more package\",\"other\":\"{name} uninstalled, with {n} more packages\"},\"deps.moduleRemovedWith\":{\"one\":\"{name} removed, with {n} more package\",\"other\":\"{name} removed, with {n} more packages\"},\"deps.unmetRestart\":\"{name} needs {list}, already installed: it works after the kernel restarts.\",\"deps.unmetMissing\":\"{name} is missing {list}: it cannot start until it is installed.\",\"deps.stateInstalled\":\"installed, {version}\",\"deps.stateMissing\":\"missing\",\"deps.stateRestart\":\"after the kernel restarts\",\"deps.optionalTag\":\"optional\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"AppStore\",\"@description\":\"Installa, aggiorna e rimuove app e moduli del kernel dai repository; controlla gli aggiornamenti anche a lilOS chiuso.\",\"@entrypoints.updates.label\":\"Aggiornamenti\",\"@entrypoints.updates.params.ore.label\":\"Controlla ogni (ore)\",\"category.system\":\"Sistema\",\"category.productivity\":\"Produttività\",\"category.media\":\"Multimedia\",\"category.development\":\"Sviluppo\",\"category.other\":\"Altro\",\"category.kernel\":\"Kernel\",\"tab.installed\":\"Installati\",\"tab.updates\":\"Aggiornamenti\",\"search.label\":\"Cerca\",\"search.placeholder\":\"Cerca in {tab}\",\"action.install\":\"Installa\",\"action.installAnyway\":\"Installa comunque\",\"action.installName\":\"Installa {name}\",\"action.update\":\"Aggiorna\",\"action.updateTo\":\"Aggiorna a {version}\",\"action.updateAll\":\"Aggiorna tutto\",\"action.checkUpdates\":\"Cerca aggiornamenti\",\"action.open\":\"Apri\",\"action.reinstall\":\"Reinstalla\",\"action.remove\":\"Rimuovi\",\"action.uninstall\":\"Disinstalla\",\"action.restartKernel\":\"Riavvia il kernel\",\"action.details\":\"Dettagli\",\"action.reload\":\"Ricarica\",\"action.add\":\"Aggiungi\",\"confirm.installTitle\":\"Installa {name}\",\"confirm.updateTitle\":\"Aggiorna {name}\",\"confirm.uninstallTitle\":\"Disinstalla {name}\",\"confirm.uninstall\":\"{name} sarà rimossa per tutti gli utenti, con le sue impostazioni e i suoi dati.\",\"confirm.uninstallFiles\":\"I file che aveva creato si eliminano, o vanno nel Cestino se qualcuno li ha modificati. Gli altri tuoi file restano dove sono.\",\"confirm.kernelModule\":\"{name} è un modulo del kernel: il suo codice girerà nel kernel, con accesso completo a utenti e file.\",\"confirm.replaces\":\"{name} prende il posto di {names}: impostazioni e connessioni passano al nuovo modulo e i vecchi vengono tolti.\",\"confirm.mayDo\":\"{name} potrà:\",\"confirm.unverified\":\"Non verificata: viene da un repository non ufficiale. Non si può sapere chi l’ha scritta, né che il codice non sia stato modificato. Installala solo se ti fidi di chi la distribuisce.\",\"permissions.none\":\"Nessun permesso oltre ai propri dati.\",\"done.appInstalled\":\"{name} installata\",\"done.moduleInstalled\":\"{name} installato: riavvia il kernel per usarlo\",\"done.moduleReplaced\":\"Prende il posto di {names}, con le loro impostazioni.\",\"done.appUpToDate\":\"{name} è già aggiornata\",\"done.moduleUpToDate\":\"{name} è già aggiornato\",\"done.appUpdated\":\"{name} aggiornata alla {version}\",\"done.moduleUpdated\":\"{name} {version} installato: riavvia il kernel\",\"done.updatedCount\":{\"one\":\"{n} elemento aggiornato\",\"other\":\"{n} elementi aggiornati\"},\"done.appRemoved\":\"{name} disinstallata\",\"done.moduleRemoved\":\"{name} rimosso: riavvia il kernel\",\"done.moduleRemovedDataKept\":\"{name} rimosso (i suoi dati restano): riavvia il kernel\",\"done.appReinstalled\":\"{name} reinstallata\",\"done.kernelRestarted\":\"Kernel riavviato\",\"restart.kernelReason\":\"Il kernel è ripartito con moduli diversi\",\"done.repoRemoved\":\"{name} rimosso\",\"done.repoAdded\":\"{name} aggiunto\",\"updates.atStart\":\"Controlla gli aggiornamenti all’avvio\",\"updates.atStartOn\":\"L’AppStore controllerà gli aggiornamenti quando entri\",\"updates.atStartOff\":\"Controllo degli aggiornamenti all’avvio spento\",\"updates.needsEngine\":\"Serve il motore dei servizi del kernel (modulo services-isolate)\",\"updates.bySystem\":\"Scelto da un amministratore per tutti: si cambia dal Pannello di controllo → Avvio → Servizi\",\"updates.description\":\"Quando entri e poi a intervalli (ogni 24 ore, si cambia nel Pannello di controllo → Avvio → Servizi), anche con lilOS chiuso: un avviso dice cosa si può aggiornare\",\"updates.check\":\"Controlla gli aggiornamenti\",\"updates.taskHint\":\"Un’operazione della Pianificazione, anche a lilOS chiuso: un avviso dice cosa si può aggiornare\",\"updates.when\":\"Ogni quanto\",\"updates.daily\":\"Ogni giorno alle 09:00\",\"updates.weekly\":\"Ogni lunedì alle 09:00\",\"updates.other\":\"Come nella Pianificazione\",\"updates.inScheduler\":\"Cambiala nella Pianificazione\",\"updates.taskName\":\"Controlla aggiornamenti\",\"service.found\":{\"one\":\"1 aggiornamento disponibile\",\"other\":\"{n} aggiornamenti disponibili\"},\"notify.updates\":{\"one\":\"Aggiornamento disponibile: {names}. Apri l’AppStore.\",\"other\":\"{n} aggiornamenti disponibili: {names}. Apri l’AppStore.\"},\"readme.saved\":\"README salvato in Download come «{file}»\",\"readme.truncated\":\"Il README è troppo lungo: qui se ne vede solo l’inizio.\",\"readme.download\":\"Scarica il README completo\",\"readme.none\":\"Questo pacchetto non ha un README.\",\"readme.notFromRepo\":\"Il README si legge dal repository: questo elemento non viene da un repository elencato.\",\"error.noDownloadFolder\":\"Manca la cartella Download\",\"status.available\":\"Disponibile\",\"status.updateAvailable\":\"Aggiornamento {version}\",\"status.removed\":\"Rimosso\",\"status.replacedBy\":\"Sostituito da {name}\",\"status.otherRepo\":\"Da un altro repository\",\"status.installedApp\":\"Installata\",\"status.installedModule\":\"Installato\",\"status.installedElsewhereApp\":\"Installata da un altro repository\",\"status.installedElsewhereModule\":\"Installato da un altro repository\",\"repo.manual\":\"Installato a mano\",\"repo.localFolder\":\"Cartella locale\",\"repo.unofficial\":\"non ufficiale\",\"banner.restartNeeded\":\"Le modifiche ai moduli valgono dal prossimo avvio del kernel.\",\"banner.repoUnreachable\":\"{name} non è raggiungibile: quello che offre non è elencato.\",\"banner.reposUnreachable\":{\"one\":\"{n} repository non è raggiungibile: quello che offre non è elencato.\",\"other\":\"{n} repository non sono raggiungibili: quello che offrono non è elencato.\"},\"banner.reposDisabled\":{\"one\":\"{n} repository è disattivato: quello che offre non è elencato.\",\"other\":\"{n} repository sono disattivati: quello che offrono non è elencato.\"},\"banner.officialDisabled\":\"Il repository ufficiale è disattivato: non sono elencati le sue app né gli aggiornamenti di lilOS e delle sue app.\",\"list.reading\":\"Lettura dei repository…\",\"list.items\":{\"one\":\"{n} elemento\",\"other\":\"{n} elementi\"},\"list.repos\":{\"one\":\"{n} repository\",\"other\":\"{n} repository\"},\"list.noResults\":\"Nessun risultato per “{query}” in {tab}\",\"list.upToDate\":\"Tutto aggiornato\",\"list.nothingInstalled\":\"Niente di installato\",\"list.emptyCategory\":\"Niente in questa categoria\",\"list.apps\":\"App\",\"list.modules\":\"Moduli del kernel\",\"list.updates\":{\"one\":\"{n} aggiornamento\",\"other\":\"{n} aggiornamenti\"},\"detail.kindApp\":\"App\",\"detail.kindModule\":\"Modulo del kernel\",\"detail.verified\":\"Verificata\",\"detail.unverified\":\"non ufficiale · non verificata\",\"detail.required\":\"Necessaria a lilOS\",\"detail.unofficialWarning\":\"Viene da un repository non ufficiale: non si può sapere chi l’ha scritta, né che il codice non sia stato modificato.\",\"detail.version\":\"Versione\",\"detail.repository\":\"Repository\",\"detail.provides\":\"Fornisce\",\"detail.id\":\"ID\",\"detail.state\":\"Stato\",\"detail.warning\":\"Attenzione\",\"detail.moduleWarning\":\"Il codice di un modulo gira nel kernel, con accesso completo a utenti e file. Le modifiche valgono dal prossimo avvio del kernel.\",\"detail.mayDo\":\"Potrà\",\"moduleState.removed\":\"Rimosso: attivo fino al riavvio\",\"moduleState.oldUntilRestart\":\"In uso la {version} fino al riavvio\",\"moduleState.nextStart\":\"Attivo dal prossimo avvio\",\"moduleState.inUse\":\"In uso\",\"action.delete\":\"Elimina\",\"detail.kindSystem\":\"Sistema operativo\",\"banner.systemRestart\":\"lilOS {version} parte al prossimo riavvio del kernel.\",\"system.description\":\"Il sistema stesso: scrivania, kernel e SDK.\",\"system.inUse\":\"In uso\",\"system.nextShort\":\"{version} al riavvio\",\"system.next\":\"La {version} parte al prossimo riavvio\",\"system.confirmTitle\":\"Aggiornare lilOS alla {version}?\",\"system.confirmLead\":\"lilOS {version} viene installato accanto alla {current}, quella in uso, per tutti gli utenti.\",\"system.confirmRestart\":\"Parte al riavvio del kernel: chi è collegato perde la connessione per qualche secondo, poi lilOS si ricarica.\",\"system.confirmRollback\":\"Se non parte, lilOS torna da solo alla {current} e lo dice agli amministratori.\",\"system.upToDate\":\"lilOS è aggiornato\",\"system.ready\":\"lilOS {version} è pronto: parte al prossimo riavvio del kernel\",\"system.nextCancelled\":\"Il cambio di versione è stato annullato\",\"system.removeTitle\":\"Eliminare lilOS {version}?\",\"system.removeLead\":\"I file di lilOS {version} vengono eliminati dal disco: non potrai più tornarci. Dati e app non vengono toccati.\",\"system.removed\":\"lilOS {version} eliminato\",\"system.failed\":\"lilOS {version} non è partito ({reason}): lilOS è tornato da solo alla {current}.\",\"system.development\":\"Questo lilOS gira da una copia del suo repository (sviluppo): si aggiorna con git, non da qui.\",\"system.installedMode\":\"Installato\",\"system.developmentMode\":\"Copia di sviluppo\",\"system.kept\":\"Versioni conservate sul disco\",\"system.keptHint\":\"Per tornarci\",\"system.keptFailed\":\"Non è partita\",\"system.use\":\"Usa questa versione\",\"system.cancelNext\":\"Annulla il cambio\",\"system.warning\":\"lilOS si aggiorna per tutti gli utenti. La nuova versione si mette accanto a quella in uso e parte al riavvio del kernel; quella di prima resta sul disco finché non la elimini.\",\"options.title\":\"Opzioni\",\"options.lead\":\"Preferenze dell’AppStore e repository da cui arrivano app e moduli. Disattiva un repository per elencare solo quello che offrono quelli attivi.\",\"options.showUnofficial\":\"Mostra i repository non ufficiali\",\"options.showUnofficialHint\":\"Se spento, le schede elencano solo quello che offre il repository ufficiale\",\"options.repositories\":\"Repository\",\"options.unreachable\":\"Non raggiungibile: {error}\",\"options.apps\":{\"one\":\"{n} app\",\"other\":\"{n} app\"},\"options.modules\":{\"one\":\"{n} modulo\",\"other\":\"{n} moduli\"},\"options.invalid\":{\"one\":\"{n} pacchetto non valido\",\"other\":\"{n} pacchetti non validi\"},\"options.reading\":\"Lettura…\",\"options.alwaysThere\":\"Sempre presente\",\"options.active\":\"{name} attivo\",\"options.disabled\":\"Disattivato: non si legge, niente di suo è elencato né proposto come aggiornamento\",\"options.addRepo\":\"Aggiungi un repository\",\"options.address\":\"Indirizzo\",\"options.addressHint\":\"Un repository git con catalog.json, per esempio https://github.com/nome/repo\",\"options.addressLabel\":\"Indirizzo del repository\",\"options.name\":\"Nome\",\"options.nameHint\":\"Facoltativo: altrimenti quello del suo catalogo\",\"options.nameLabel\":\"Nome del repository\",\"options.adminOnly\":\"Solo un amministratore aggiunge e rimuove repository.\",\"action.close\":\"Chiudi\",\"action.later\":\"Più tardi\",\"action.restartNow\":\"Riavvia ora\",\"confirm.removeTitle\":\"Rimuovi {name}\",\"confirm.removeModule\":\"{name} smetterà di girare nel kernel dal prossimo avvio.\",\"restart.askTitle\":\"Riavviare il kernel?\",\"restart.askLead\":\"Installazione di {name} completata. I moduli del kernel installati entrano in funzione dopo il riavvio del kernel.\",\"restart.askHint\":\"Il riavvio dura qualche secondo: lilOS si ricollega da solo.\",\"restart.askRemovedLead\":\"{name} è stato rimosso. I moduli del kernel rimossi insieme si fermano dopo il riavvio del kernel.\",\"deps.title\":\"Ha bisogno di\",\"deps.install\":\"installa la versione {version}\",\"deps.update\":\"aggiorna dalla {from} alla {version}\",\"deps.kindModule\":\"Modulo del kernel\",\"deps.kindApp\":\"App\",\"deps.why\":\"Serve a {name}\",\"deps.whyReason\":\"Serve a {name}: {reason}\",\"deps.unverifiedModule\":\"Non verificato: il suo codice girerà nel kernel con accesso completo.\",\"deps.unverifiedApp\":\"Non verificata: viene da un repository non ufficiale.\",\"deps.brings\":\"Installa anche: {name} ({kind})\",\"deps.tick\":\"Installa anche {name}\",\"deps.cannot\":\"{name} ora non si può installare:\",\"deps.required\":\"Si installa anche\",\"deps.optional\":\"Facoltativi: installare anche questi?\",\"deps.unavailable\":\"Ora non disponibili: {list}\",\"deps.restartNote\":\"I moduli del kernel entrano in funzione dopo il riavvio del kernel: te lo chiedo alla fine.\",\"deps.installed\":{\"zero\":\"Installazione di {name} completata\",\"one\":\"Installazione di {name} completata, con {n} altro pacchetto\",\"other\":\"Installazione di {name} completata, con altri {n} pacchetti\"},\"deps.alsoRemove\":\"Rimuovi anche {name}\",\"deps.unneededTitle\":\"Non servono più\",\"deps.unneededHint\":\"Erano stati installati solo per questo e niente altro li usa. Quelli spuntati si rimuovono insieme.\",\"deps.blocked\":\"{name} non si può rimuovere: serve a {list}.\",\"deps.blockedHint\":{\"one\":\"Rimuovi prima quella, poi questo.\",\"other\":\"Rimuovi prima quelle, poi questo.\"},\"deps.appRemovedWith\":{\"one\":\"{name} disinstallata, con {n} altro pacchetto\",\"other\":\"{name} disinstallata, con altri {n} pacchetti\"},\"deps.moduleRemovedWith\":{\"one\":\"{name} rimosso, con {n} altro pacchetto\",\"other\":\"{name} rimosso, con altri {n} pacchetti\"},\"deps.unmetRestart\":\"{name} ha bisogno di {list}, già installato: funziona dopo il riavvio del kernel.\",\"deps.unmetMissing\":\"A {name} manca {list}: non parte finché non è installato.\",\"deps.stateInstalled\":\"installato, {version}\",\"deps.stateMissing\":\"manca\",\"deps.stateRestart\":\"dopo il riavvio del kernel\",\"deps.optionalTag\":\"facoltativo\"}}")
}), re = () => [
	{
		id: "system",
		label: k("category.system")
	},
	{
		id: "productivity",
		label: k("category.productivity")
	},
	{
		id: "media",
		label: k("category.media")
	},
	{
		id: "development",
		label: k("category.development")
	},
	{
		id: "other",
		label: k("category.other")
	},
	{
		id: "kernel",
		label: k("category.kernel")
	}
], ie = /* @__PURE__ */ new Set([
	"system",
	"productivity",
	"media",
	"development",
	"other"
]), ae = {
	glyph: "monitor",
	color: "#5f6673"
}, oe = {
	glyph: "help",
	color: "#5f6673"
}, se = {
	glyph: "window",
	color: "#3b6ef5"
}, A = e.systemReleases ?? null;
m.define({ "appstore.showUnofficial": !0 });
var ce = "app:appstore:repos.disabled", le = () => {
	let e = h.get(ce, []);
	return (Array.isArray(e) ? e : []).filter((e) => typeof e?.id == "string" && typeof e.name == "string");
}, j = (e) => e.replace(/\.git$/i, "").replace(/\/+$/, ""), M = (e, t) => !!e?.url && j(e.url).toLowerCase() === j(t.url).toLowerCase(), N = (e) => j(e.url).split(/[/\\]/).pop() || e.name;
function ue() {
	let S = l.user?.role === "admin", C = {
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
	}, w = new t({
		title: "AppStore",
		icon: "download",
		width: 960,
		height: 640,
		minWidth: 560,
		minHeight: 420
	});
	w.el.classList.add("appstore");
	async function T(e, t, n) {
		if (C.busy) return;
		C.busy = e, $();
		let r;
		try {
			r = await t();
			let e = typeof n == "function" ? n(r) : n;
			e && g(e, { timeout: 5e3 }), await _e({ quiet: !0 });
		} catch (e) {
			g(e.message, { timeout: 7e3 });
		} finally {
			C.busy = null, $();
		}
		return r;
	}
	async function E() {
		let e = await v.services?.list().catch(() => null);
		C.updates = e?.available ? e.services.find((e) => e.app === "appstore" && e.entry === "updates") ?? null : null;
	}
	let D = e.schedule?.available && typeof e.schedule.forApp == "function" ? e.schedule.forApp("appstore") : null, ne = {
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
	}, j = () => {
		let e = /* @__PURE__ */ new Date(), t = (e) => String(e).padStart(2, "0");
		return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}T09:00`;
	}, ue = () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
	async function de() {
		D && (C.updateTask = (await D.list().catch(() => [])).find((e) => e.what?.type === "service" && e.what.app === "appstore" && e.what.entry === "updates") ?? null, !C.updateTask && C.updates?.startup === "login" && (C.updateTask = await fe({
			on: !0,
			every: "daily"
		}).catch(() => null), await v.services.setStartup("appstore", "updates", "none").catch(() => {}), await E()));
	}
	async function fe({ on: e, every: t }) {
		let n = C.updateTask, r = t ?? pe(n) ?? "daily", i = {
			name: k("updates.taskName"),
			enabled: e,
			when: n && !t ? n.when : {
				...ne[r](),
				start: n?.when?.start ?? j(),
				tz: n?.when?.tz ?? ue()
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
		return n ? D.update(n.id, i) : D.create(i);
	}
	let pe = (e) => e?.when?.every ? e.when.every.unit === "week" ? "weekly" : e.when.every.unit === "day" ? "daily" : "other" : null;
	async function me(e) {
		try {
			C.updateTask = await fe({
				on: C.updateTask?.enabled ?? !1,
				...e
			});
		} catch (e) {
			g(e.message, { timeout: 7e3 });
		}
		$();
	}
	async function he(e) {
		try {
			await v.services.setStartup("appstore", "updates", e ? "login" : "none"), await v.services[e ? "start" : "stop"]("appstore", "updates"), g(k(e ? "updates.atStartOn" : "updates.atStartOff"));
		} catch (e) {
			g(e.message, { timeout: 7e3 });
		}
		await E(), $();
	}
	async function ge(e) {
		try {
			C.catalogs.set(e.id, await p.catalog(e.id)), C.errors.delete(e.id);
		} catch (t) {
			C.catalogs.delete(e.id), C.errors.set(e.id, t.message);
		}
	}
	async function _e({ quiet: e = !1 } = {}) {
		e || (C.loading = !0, $());
		try {
			C.repos = await p.list();
			let e = le();
			e.some((e) => !C.repos.some((t) => t.id === e.id)) && h.set(ce, e.filter((e) => C.repos.some((t) => t.id === e.id))), await Promise.all(C.repos.filter(P).map(ge)), C.modules = S ? await u.list().catch(() => []) : [], C.system = A ? await A.info().catch(() => null) : null, await E(), await de(), await i.refresh();
		} catch (e) {
			g(e.message, { timeout: 7e3 });
		}
		C.loading = !1, $();
	}
	let P = (e) => !le().some((t) => t.id === e.id), ve = () => C.repos.filter((e) => P(e) && (e.official || m.get("appstore.showUnofficial")));
	async function ye(e, t) {
		let n = le().filter((t) => t.id !== e.id);
		h.set(ce, t ? n : [...n, {
			id: e.id,
			name: e.name
		}]);
		let r = () => {
			$(), w.body.querySelector(`#as-repo-${e.id}`)?.focus();
		};
		r(), t && !C.catalogs.has(e.id) && (await ge(e), r());
	}
	function be(t, n, r) {
		let i = n?.manifest ?? r.manifest, a = (n ? n.locales && e.locale?.manifest(n.manifest, n.locales) : e.locale?.manifest(r.manifest)) || i, o = n?.manifest.version ?? null, s = !!r && (!n || M(r.source, t));
		return {
			key: `app:${t?.id ?? "-"}:${i.id}`,
			kind: "app",
			id: i.id,
			name: a.name,
			shown: a,
			description: a.description ?? "",
			icon: i.icon ?? oe,
			publisher: i.publisher?.name ?? "",
			category: ie.has(i.category) ? i.category : "other",
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
			update: s && o && y(o, r.version) > 0 ? o : null,
			required: !!i.required,
			verified: !!r?.signed || !!t?.official
		};
	}
	function xe(e, t, n) {
		let r = t?.module ?? n, i = t?.module.version ?? null, a = !!n && (!t || M(n.source, e));
		return {
			key: `module:${e?.id ?? "-"}:${r.name}`,
			kind: "module",
			id: r.name,
			name: r.name,
			description: r.description ?? "",
			icon: t?.module.icon ?? n?.icon ?? ae,
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
			update: a && n.enabled && i && y(i, n.enabled) > 0 ? i : null,
			provides: r.provides ?? [],
			verified: !!e?.official,
			required: !!n?.required || !!t?.module?.required
		};
	}
	function Se() {
		let e = C.system;
		if (!e) return null;
		let t = C.repos.find((e) => e.official) ?? null, n = t && P(t) && C.catalogs.get(t.id)?.system?.system ? C.catalogs.get(t.id).system : null, r = n?.system.version ?? null, i = e.mode === "installed";
		return {
			key: "system:lilos",
			kind: "system",
			id: "lilos",
			name: "lilOS",
			description: k("system.description"),
			icon: se,
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
			update: i && r && y(r, e.version) > 0 && r !== e.next ? r : null,
			required: !0,
			verified: !0
		};
	}
	function Ce() {
		let e = i.list(), t = C.modules.filter((e) => e.enabled || e.running), n = [];
		for (let r of ve()) {
			let i = C.catalogs.get(r.id);
			for (let t of i?.apps ?? []) t.manifest && n.push(be(r, t, e.find((e) => e.id === t.manifest.id)));
			if (S) for (let e of i?.modules ?? []) e.module && !e.replacedBy && n.push(xe(r, e, t.find((t) => t.name === e.module.name)));
		}
		for (let t of e) n.some((e) => e.kind === "app" && e.here && e.id === t.id) || n.push(be(C.repos.find((e) => M(t.source, e)) ?? null, null, t));
		for (let e of t) n.some((t) => t.kind === "module" && t.here && t.id === e.name) || n.push(xe(C.repos.find((t) => M(e.source, t)) ?? null, null, e));
		let r = n.filter((e) => e.kind === "module" && e.entry && !e.have && e.module.replaces?.length);
		for (let e of n) e.kind === "module" && e.here && e.have.enabled && !e.have.replacedBy && (e.replacedBy = r.find((t) => t.module.replaces.includes(e.id)) ?? null);
		let a = Se();
		return a ? [a, ...n] : n;
	}
	function we(e) {
		let t = new Set(e.filter((e) => !e.repo || P(e.repo)).map((e) => e.category));
		return [
			{
				id: "installed",
				label: k("tab.installed"),
				filter: (e) => e.here
			},
			{
				id: "updates",
				label: k("tab.updates"),
				filter: Te,
				badge: !0
			},
			...re().filter((e) => t.has(e.id) || e.id === "kernel" && S).map((e) => ({
				...e,
				category: !0,
				filter: (t) => t.category === e.id && (!t.repo || P(t.repo))
			}))
		];
	}
	let Te = (e) => !!e.update || !!e.replacedBy, Ee = (e, t) => !t || [
		e.name,
		e.id,
		e.description,
		e.publisher,
		e.repo ? N(e.repo) : ""
	].some((e) => e.toLowerCase().includes(t)), De = () => S && C.modules.some((e) => (e.enabled ?? null) !== (e.running ?? null)), F = () => S ? C.system?.next ?? null : null;
	async function I({ title: e, text: t, content: n = null, confirm: r = null, cancel: i = null, kind: a = null, width: o = 440 }) {
		let s = r ? [i ? {
			value: "cancel",
			label: i
		} : "cancel", {
			value: "yes",
			label: r.label,
			primary: r.primary,
			danger: r.danger
		}] : [{
			value: "cancel",
			label: i,
			primary: !0
		}];
		return await d(w, {
			icon: a ?? (r?.danger ? "warning" : null),
			title: e,
			text: t.join("\n\n"),
			content: n,
			width: o,
			buttons: s,
			default: r && !r.danger ? "yes" : "cancel"
		}) === "yes";
	}
	let Oe = (e) => e.kind === "module" ? (e.module.replaces ?? []).filter((e) => C.modules.some((t) => t.name === e)) : [], ke = (e, t) => t.length ? [k("confirm.replaces", {
		name: e,
		names: t.join(", ")
	})] : [];
	async function Ae({ title: e, name: t, permissions: n = [], official: r, kernelModule: i = !1, replaces: a = [] }) {
		let o = x(n), c = i ? null : o.length ? s("ul", {}, ...o.map((e) => s("li", {}, b(e)))) : s("p", {}, k("permissions.none"));
		return await I({
			title: e,
			text: [k(i ? "confirm.kernelModule" : "confirm.mayDo", { name: t }), ...ke(t, a)],
			content: c || !r ? s("div", { class: "as-ask" }, c, r ? null : s("p", { class: "as-warning" }, k("confirm.unverified"))) : null,
			confirm: {
				label: k(r ? "action.install" : "action.installAnyway"),
				primary: r,
				danger: !r
			}
		}) ? {
			grant: o,
			allowUnsigned: !r
		} : null;
	}
	let je = (e, t) => e?.replaced?.length ? `${t} ${k("done.moduleReplaced", { names: e.replaced.join(", ") })}` : t, Me = ({ repo: e, entry: t }) => ({
		type: "git",
		url: e.url,
		path: t.path,
		ref: C.catalogs.get(e.id)?.ref
	}), Ne = (e) => e.module === void 0 ? `app:${e.app}` : `module:${e.module}`, L = (t, n) => (n ? e.locale?.manifest(t, n) : e.locale?.manifest(t)) || t, Pe = (e) => {
		let t = i.get(e);
		return t ? L(t.manifest).name : e;
	}, R = (e) => e.kind === "app" && e.manifest ? L(e.manifest, e.locales).name : e.name, Fe = (e) => e.action === "install" ? k("deps.install", { version: e.version }) : k("deps.update", {
		from: e.from,
		version: e.version
	}), z = (e) => k(e === "module" ? "deps.kindModule" : "deps.kindApp"), Ie = (e) => {
		let t = C.repos.find((t) => M({ url: e }, t));
		return t ? N(t) : e;
	};
	async function Le({ title: e, name: t, plan: n, official: i, kernelModule: a = !1, permissions: o = [], rootDeps: c = null, replaces: l = [] }) {
		let u = x(o), d = n.steps.filter((e) => !e.optional), f = n.steps.filter((e) => e.choice), p = n.problems.filter((e) => !e.optional), m = n.problems.filter((e) => e.optional), h = /* @__PURE__ */ new Set(), ee = new Map(n.steps.map((e) => [e.key, e])), g = (e) => {
			let t = [], n = (e) => e.needs.forEach((e) => {
				let r = ee.get(e);
				r && r.optional && !r.choice && !t.includes(r) && (t.push(r), n(r));
			});
			return n(e), t;
		}, _ = new Map([[n.root.key, c ?? n.root.manifest?.dependencies ?? []], ...n.steps.filter((e) => e.manifest).map((e) => [e.key, L(e.manifest, e.locales).dependencies ?? []])]), v = (e) => e.neededBy.map((r) => {
			let i = (_.get(r.key) ?? []).find((t) => Ne(t) === e.key)?.reason ?? r.reason, a = r.key === n.root.key ? t : R(ee.get(r.key) ?? r);
			return s("span", { class: "as-dep-why" }, i ? k("deps.whyReason", {
				name: a,
				reason: i
			}) : k("deps.why", { name: a }));
		}), y = (e, t = null) => s("li", { class: "as-dep" }, t, r(e.icon ?? (e.kind === "module" ? ae : oe)), s("div", { class: "as-dep-text" }, s("b", {}, R(e), " ", s("span", { class: "as-dep-action" }, Fe(e))), s("span", { class: "as-dep-sub" }, [z(e.kind), Ie(e.repo.url)].join(" · ")), ...v(e), e.permissions.length ? s("ul", {}, ...e.permissions.map((e) => s("li", {}, b(e)))) : null, e.verified ? null : s("span", { class: "as-dep-warning" }, e.kind === "module" ? k("deps.unverifiedModule") : k("deps.unverifiedApp")), ...t ? g(e).map((e) => s("span", { class: "as-dep-sub" }, k("deps.brings", {
			name: R(e),
			kind: z(e.kind)
		}))) : [])), te = (e) => {
			let t = s("input", {
				type: "checkbox",
				"aria-label": k("deps.tick", { name: R(e) })
			});
			return t.addEventListener("change", () => t.checked ? h.add(e.key) : h.delete(e.key)), t;
		}, S = () => {
			let e = {}, t = (t) => {
				e[t.key] = {
					grant: t.permissions,
					allowUnsigned: !t.verified
				};
			};
			d.forEach(t);
			for (let e of f) h.has(e.key) && [e, ...g(e)].forEach(t);
			return e;
		}, C = !i || d.some((e) => !e.verified);
		return await I({
			title: e,
			width: 520,
			text: [k(a ? "confirm.kernelModule" : "confirm.mayDo", { name: t }), ...ke(t, l)],
			content: s("div", { class: "as-ask" }, !a && u.length ? s("ul", {}, ...u.map((e) => s("li", {}, b(e)))) : null, !a && !u.length ? s("p", {}, k("permissions.none")) : null, i ? null : s("p", { class: "as-warning" }, k("confirm.unverified")), p.length ? s("div", {
				class: "as-dep-blocked",
				role: "alert"
			}, s("b", {}, k("deps.cannot", { name: t })), s("ul", {}, ...p.map((e) => s("li", {}, e.message)))) : null, d.length ? s("h3", { class: "as-dep-title" }, k("deps.required")) : null, d.length ? s("ul", { class: "as-deps" }, ...d.map((e) => y(e))) : null, f.length ? s("h3", { class: "as-dep-title" }, k("deps.optional")) : null, f.length ? s("ul", { class: "as-deps" }, ...f.map((e) => y(e, te(e)))) : null, m.length ? s("p", {
				class: "as-dep-sub",
				title: m.map((e) => e.message).join("\n")
			}, k("deps.unavailable", { list: m.map((e) => e.id).join(", ") })) : null, n.restartRequired ? s("p", { class: "as-dep-sub" }, k("deps.restartNote")) : null),
			cancel: p.length ? k("action.close") : null,
			confirm: p.length ? null : {
				label: k(C ? "action.installAnyway" : "action.install"),
				primary: !C,
				danger: C
			}
		}) ? {
			root: {
				grant: u,
				allowUnsigned: !i
			},
			steps: S()
		} : null;
	}
	async function Re(e, { removed: t = !1 } = {}) {
		S && await I({
			title: k("restart.askTitle"),
			text: [k(t ? "restart.askRemovedLead" : "restart.askLead", { name: e }), k("restart.askHint")],
			confirm: {
				label: k("action.restartNow"),
				primary: !0
			},
			cancel: k("action.later")
		}) && H();
	}
	async function ze(e) {
		if (C.busy) return null;
		C.busy = "plan", $();
		try {
			return await e();
		} catch (e) {
			return g(e.message, { timeout: 7e3 }), null;
		} finally {
			C.busy = null, $();
		}
	}
	async function Be(e) {
		try {
			return await f.plan(e);
		} catch (e) {
			return g(e.message, { timeout: 7e3 }), null;
		}
	}
	async function Ve(e, { inAct: t = !1, trusted: n = !1 } = {}) {
		let { repo: r } = e, i = Me(e), a = e.kind === "module", o = { install: {
			kind: e.kind,
			source: i
		} }, s = t ? await Be(o) : await ze(() => Be(o));
		if (!s) return null;
		if (s.steps.length || s.problems.length) {
			let t = await Le({
				title: k("confirm.installTitle", { name: e.name }),
				name: e.name,
				plan: s,
				official: r.official,
				kernelModule: a,
				permissions: e.manifest?.permissions,
				rootDeps: e.shown?.dependencies,
				replaces: Oe(e)
			});
			return t && {
				target: o,
				answer: t
			};
		}
		if (n && r.official) return {
			source: i,
			answer: {
				grant: x(e.manifest?.permissions),
				allowUnsigned: !1
			}
		};
		let c = await Ae({
			title: k("confirm.installTitle", { name: e.name }),
			name: e.name,
			official: r.official,
			...a ? {
				kernelModule: !0,
				replaces: Oe(e)
			} : { permissions: e.manifest.permissions }
		});
		return c && {
			source: i,
			answer: c
		};
	}
	let He = (e, t) => t.target ? f.install(t.target, t.answer).then((e) => ({
		...e.result,
		installed: e.installed,
		restartRequired: e.restartRequired
	})) : e.kind === "module" ? u.install(t.source, { allowUnsigned: t.answer.allowUnsigned }) : i.install(t.source, t.answer);
	async function B(e) {
		let t = await Ve(e);
		if (!t) return;
		let n = e.name;
		(await T("install", () => He(e, t), (r) => t.target ? je(r, k("deps.installed", {
			name: n,
			n: r.installed.length
		})) : e.kind === "module" ? je(r, k("done.moduleInstalled", { name: n })) : k("done.appInstalled", { name: n })))?.restartRequired && Re(n);
	}
	async function Ue(e) {
		let t = !!e.repo?.official;
		if (e.kind === "app" || e.kind === "module") {
			let n = { update: {
				kind: e.kind,
				id: e.id
			} }, r = await Be(n);
			if (!r) return null;
			if (r.steps.length || r.problems.length) {
				let i = await Le({
					title: k("confirm.updateTitle", { name: e.name }),
					name: e.name,
					plan: r,
					official: t,
					kernelModule: e.kind === "module",
					permissions: r.root.permissions,
					rootDeps: e.entry?.locales ? L(r.root.manifest ?? e.manifest, e.entry.locales).dependencies : null
				});
				return i && {
					plan: n,
					answers: i
				};
			}
		}
		if (e.kind === "module") return t || await Ae({
			title: k("confirm.updateTitle", { name: e.name }),
			name: e.name,
			official: t,
			kernelModule: !0
		}) ? { allowUnsigned: !t } : null;
		let n = x(e.entry?.manifest.permissions).filter((t) => !e.have.granted.includes(t));
		return !n.length && t ? {
			grant: [],
			allowUnsigned: !1
		} : Ae({
			title: k("confirm.updateTitle", { name: e.name }),
			name: e.name,
			permissions: n,
			official: t
		});
	}
	let V = (e, t) => t.plan ? f.install(t.plan, t.answers).then((e) => ({
		...e.result,
		restartRequired: e.restartRequired
	})) : e.kind === "module" ? u.update(e.id, t) : i.update(e.id, t);
	async function We(e, { reinstall: t = !1 } = {}) {
		if (!v.updateApps) {
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
		let n = await v.updateApps(e.map(({ item: e, run: t }) => ({
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
	async function Ge(e, t, n) {
		let [r] = await We([{
			item: e,
			run: t
		}], n) ?? [null];
		if (r?.error) throw r.error;
		return r ? r.result : null;
	}
	async function Ke(e) {
		let t = e.kind === "module", n = e.name;
		(await T("update", async () => {
			let n = await Ue(e);
			return n ? t ? V(e, n) : Ge(e, () => V(e, n)) : null;
		}, (e) => e ? e.unchanged ? k(t ? "done.moduleUpToDate" : "done.appUpToDate", { name: n }) : t ? je(e, k("done.moduleUpdated", {
			name: n,
			version: e.version
		})) : k("done.appUpdated", {
			name: n,
			version: e.version
		}) : null))?.restartRequired && !t && Re(n);
	}
	function qe(e) {
		T("update", async () => {
			let t = 0, n = [], r = e.find((e) => e.kind === "system"), i = /* @__PURE__ */ new Set();
			for (let a of e) {
				if (a === r) continue;
				if (a.replacedBy) {
					let e = a.replacedBy;
					if (i.has(e.name)) continue;
					i.add(e.name);
					let n = await Ve(e, {
						inAct: !0,
						trusted: !0
					});
					if (!n) continue;
					try {
						await He(e, n), t++;
					} catch (t) {
						g(`${e.name}: ${t.message}`, { timeout: 7e3 });
					}
					continue;
				}
				let e = await Ue(a);
				if (e) {
					if (a.kind !== "module") n.push({
						item: a,
						run: () => V(a, e)
					});
					else try {
						await V(a, e), t++;
					} catch (e) {
						g(`${a.name}: ${e.message}`, { timeout: 7e3 });
					}
				}
			}
			for (let e of n.length && await We(n) || []) e.error ? g(`${e.item.name}: ${e.error.message}`, { timeout: 7e3 }) : t++;
			if (r && await tt(r)) try {
				(await A.update()).unchanged || t++;
			} catch (e) {
				g(`${r.name}: ${e.message}`, { timeout: 7e3 });
			}
			return t;
		}, (e) => k("done.updatedCount", { n: e }));
	}
	async function Je(e, t) {
		let n = e.kind === "module", r = new Set(t.map((e) => e.key));
		return await I({
			title: k(n ? "confirm.removeTitle" : "confirm.uninstallTitle", { name: e.name }),
			width: t.length ? 480 : 440,
			text: n ? [k("confirm.removeModule", { name: e.name })] : [k("confirm.uninstall", { name: e.name }), k("confirm.uninstallFiles")],
			content: t.length ? s("div", { class: "as-ask" }, s("h3", { class: "as-dep-title" }, k("deps.unneededTitle")), s("p", { class: "as-dep-sub" }, k("deps.unneededHint")), s("ul", { class: "as-deps" }, ...t.map((e) => {
				let t = e.kind === "app" ? Pe(e.id) : e.name, n = s("input", {
					type: "checkbox",
					"aria-label": k("deps.alsoRemove", { name: t })
				});
				return n.checked = !0, n.addEventListener("change", () => n.checked ? r.add(e.key) : r.delete(e.key)), s("li", { class: "as-dep" }, n, s("div", { class: "as-dep-text" }, s("b", {}, t, " ", s("span", { class: "as-dep-action" }, e.version)), s("span", { class: "as-dep-sub" }, z(e.kind))));
			}))) : null,
			confirm: {
				label: k(n ? "action.remove" : "action.uninstall"),
				danger: !0
			}
		}) ? { also: [...r] } : null;
	}
	async function Ye(e) {
		let t = e.name, n = e.kind === "module", r = await ze(() => f.removal(e.kind, e.id));
		if (!r) return;
		if (r.blockedBy.length) {
			let e = r.blockedBy.map((e) => e.kind === "app" ? Pe(e.id) : e.name).join(", ");
			await I({
				title: k(n ? "confirm.removeTitle" : "confirm.uninstallTitle", { name: t }),
				kind: "info",
				text: [k("deps.blocked", {
					name: t,
					list: e
				}), k("deps.blockedHint", { n: r.blockedBy.length })],
				cancel: k("action.close")
			});
			return;
		}
		if (n && !r.unneeded.length) {
			T("remove", () => u.remove(e.id), (e) => e.kept.length ? k("done.moduleRemovedDataKept", { name: t }) : k("done.moduleRemoved", { name: t }));
			return;
		}
		let i = await Je(e, r.unneeded);
		i && (await T("remove", () => f.remove(e.kind, e.id, i), (e) => e.removed.length > 1 ? k(n ? "deps.moduleRemovedWith" : "deps.appRemovedWith", {
			name: t,
			n: e.removed.length - 1
		}) : k(n ? "done.moduleRemoved" : "done.appRemoved", { name: t })))?.restartRequired && Re(t, { removed: !0 });
	}
	let Xe = (e) => S && e.kind === "app" && e.here && !e.required, Ze = (e) => T("reinstall", () => Ge(e, () => i.update(e.id, {
		reinstall: !0,
		allowUnsigned: !e.verified
	}), { reinstall: !0 }), (t) => t ? k("done.appReinstalled", { name: e.name }) : null), Qe = (e, t, n) => a(e, async () => {
		try {
			let e = await n(), r = o.children(o.root).find((e) => e.type === "folder" && e.system && e.name === "Download");
			if (!r) throw Error(k("error.noDownloadFolder"));
			let i = o.create(r.id, {
				type: "file",
				name: t
			});
			await o.write(i.id, e), g(k("readme.saved", { file: i.name }), { timeout: 6e3 });
		} catch (e) {
			g(e.message, { timeout: 7e3 });
		}
	}), $e = (e, t) => Qe(t, `${e.name} - README.md`, () => p.readme(e.repo.id, e.entry.path)), et = (e, t) => Qe(t, "lilOS - CHANGELOG.md", () => p.readme(e.repo.id, e.entry.path, "CHANGELOG.md")), tt = (e) => I({
		title: k("system.confirmTitle", { version: e.update }),
		text: [
			k("system.confirmLead", {
				version: e.update,
				current: e.installed
			}),
			k("system.confirmRestart"),
			k("system.confirmRollback", { current: e.installed })
		],
		confirm: {
			label: k("action.update"),
			primary: !0
		}
	});
	async function nt(e) {
		await tt(e) && T("update", () => A.update(), (e) => e.unchanged ? k("system.upToDate") : k("system.ready", { version: e.version }));
	}
	let rt = (e) => T("system", () => A.use(e), (t) => t.restartRequired ? k("system.ready", { version: e }) : k("system.nextCancelled"));
	async function it(e) {
		await I({
			title: k("system.removeTitle", { version: e }),
			text: [k("system.removeLead", { version: e })],
			confirm: {
				label: k("action.delete"),
				danger: !0
			}
		}) && T("system", () => A.remove(e), k("system.removed", { version: e }));
	}
	let H = () => T("restart", async () => {
		let e = De();
		await u.restart(), await new Promise((e) => setTimeout(e, 2500)), e && v.requestRestart?.(k("restart.kernelReason"), "kernel-modules");
	}, k("done.kernelRestarted")), U = (e, t, { key: r = "", ...i } = {}) => {
		let a = `${e}|${r}`, o = n({
			label: e,
			onClick: () => (C.pressed = a, t()),
			...i
		});
		return o.disabled = !!C.busy, C.busy && C.pressed === a && o.setAttribute("aria-busy", "true"), o;
	}, W = (e, t = !1) => s("span", { class: "as-state" }, t ? c("check") : null, e), at = (e) => e.repo ? s("span", {
		class: "as-repo",
		title: e.repo.url
	}, c("link"), s("span", {}, N(e.repo))) : s("span", { class: "as-repo" }, c("folder"), s("span", {}, e.kind === "module" ? k("repo.manual") : k("repo.localFolder"))), ot = (e) => e.repo && !e.repo.official ? s("span", { class: "as-unofficial" }, k("repo.unofficial")) : null, st = (e) => e.kind === "system" ? k("system.inUse") : e.kind === "module" ? k("status.installedModule") : k("status.installedApp"), G = (e, ...t) => s("div", { class: "as-section-title" }, e, ...t), K = (e, t) => s("div", { class: "as-fact" }, s("b", {}, e), String(t)), ct = (e) => s("button", {
		class: "as-back",
		onclick: () => Q("list")
	}, c("arrowLeft"), e);
	function lt(e) {
		return e.kind === "system" ? e.update ? S ? U(k("action.update"), () => nt(e), {
			primary: !0,
			key: e.key
		}) : W(k("status.updateAvailable", { version: e.update })) : F() ? W(k("system.nextShort", { version: F() })) : W(k("system.inUse"), !0) : e.replacedBy ? S ? U(k("action.installName", { name: e.replacedBy.name }), () => B(e.replacedBy), {
			primary: !0,
			key: e.key
		}) : W(k("status.replacedBy", { name: e.replacedBy.name })) : e.update ? S ? U(k("action.update"), () => Ke(e), {
			primary: !0,
			key: e.key
		}) : W(k("status.updateAvailable", { version: e.update })) : e.here ? W(e.kind === "module" && !e.have.enabled ? k("status.removed") : st(e), !0) : e.elsewhere ? W(k("status.otherRepo")) : S ? U(k("action.install"), () => B(e), { key: e.key }) : W(k("status.available"));
	}
	function ut(e, { uninstall: t = !1 } = {}) {
		let n = e.replacedBy ? `${e.installed} → ${k("status.replacedBy", { name: e.replacedBy.name })}` : e.update ? `${e.installed} → ${e.update}` : e.here ? e.installed : e.offered, i = t && Xe(e) ? U(k("action.uninstall"), () => Ye(e), {
			danger: !0,
			key: e.key
		}) : null;
		return s("div", { class: "as-card" }, s("div", { class: "as-card-top" }, r(e.icon), s("div", { class: "as-card-head" }, s("button", {
			class: "as-card-open",
			onclick: () => Q("detail", e.key)
		}, e.name, s("span", { class: "as-ver" }, n)), s("div", { class: "as-card-desc" }, e.description))), s("div", { class: "as-card-foot" }, at(e), ot(e), s("span", { class: "as-spacer" }), i && !e.update ? null : lt(e), i));
	}
	let q = (e, t) => s("div", { class: "as-grid" }, ...e.map((e) => ut(e, t)));
	function J() {
		let e = [];
		F() && [
			"installed",
			"updates",
			"system"
		].includes(C.tab) && e.push(s("div", { class: "as-banner" }, c("info"), s("span", {}, k("banner.systemRestart", { version: F() })), U(k("action.restartKernel"), H, {
			primary: !0,
			key: "system"
		}))), De() && [
			"installed",
			"updates",
			"kernel"
		].includes(C.tab) && e.push(s("div", { class: "as-banner" }, c("info"), s("span", {}, k("banner.restartNeeded")), U(k("action.restartKernel"), H, { primary: !0 })));
		let t = ve().filter((e) => C.errors.has(e.id));
		t.length && e.push(s("div", { class: "as-banner" }, c("info"), s("span", {}, t.length === 1 ? k("banner.repoUnreachable", { name: N(t[0]) }) : k("banner.reposUnreachable", { n: t.length })), s("button", {
			class: "as-link",
			onclick: () => Q("options")
		}, k("action.details"))));
		let n = C.repos.filter((e) => !P(e));
		return n.length && C.tab !== "installed" && e.push(s("div", { class: "as-banner" }, c("info"), s("span", {}, n.some((e) => e.official) ? k("banner.officialDisabled") : k("banner.reposDisabled", { n: n.length })), s("button", {
			class: "as-link",
			onclick: () => Q("options")
		}, k("options.title")))), e;
	}
	function dt(e, t) {
		let n = (C.query[t.id] ?? "").trim().toLowerCase(), r = e.filter(t.filter).filter((e) => Ee(e, n));
		if (Z.textContent = C.loading ? k("list.reading") : `${k("list.items", { n: r.length })} · ${k("list.repos", { n: ve().length })}`, !r.length) {
			let e = C.loading && t.id !== "installed" ? k("list.reading") : n ? k("list.noResults", {
				query: n,
				tab: t.label
			}) : t.id === "updates" ? k("list.upToDate") : t.id === "installed" ? k("list.nothingInstalled") : k("list.emptyCategory");
			return [...J(), s("div", { class: "as-empty" }, e)];
		}
		if (t.id === "installed") {
			let e = r.filter((e) => e.kind === "app"), t = r.filter((e) => e.kind === "module"), n = r.filter((e) => e.kind === "system");
			return [
				...J(),
				n.length ? [G("lilOS"), q(n)] : null,
				e.length ? [G(k("list.apps")), q(e, { uninstall: !0 })] : null,
				t.length ? [G(k("list.modules")), q(t)] : null
			];
		}
		if (t.id === "updates") return [
			...J(),
			G(k("list.updates", { n: r.length }), S && r.length > 1 ? s("span", { class: "as-bulk" }, U(k("action.updateAll"), () => qe(r), { primary: !0 })) : null),
			q(r)
		];
		let i = (e) => Number(e.here || e.elsewhere);
		return [...J(), q([...r].sort((e, t) => i(e) - i(t) || e.name.localeCompare(t.name)))];
	}
	function ft(e, t) {
		let n = e.have, i = n.mode === "installed", a = F(), o = [];
		S && e.update && o.push(U(k("action.updateTo", { version: e.update }), () => nt(e), {
			primary: !0,
			key: e.key
		}));
		let l = S && i ? (n.releases ?? []).filter((e) => e !== n.version) : [], u = (e) => s("div", { class: "as-row" }, s("div", { class: "as-row-text" }, s("b", {}, `lilOS ${e}`), s("span", {}, e === a ? k("system.next", { version: e }) : e === n.failed?.version ? k("system.keptFailed") : k("system.keptHint"))), e === a ? U(k("system.cancelNext"), () => rt(n.version), { key: e }) : U(k("system.use"), () => rt(e), { key: e }), e === a ? null : U(k("action.delete"), () => it(e), {
			danger: !0,
			key: e
		}));
		return Z.textContent = `lilOS ${n.version}`, s("div", { class: "as-detail" }, ct(t.label), s("div", { class: "as-detail-head" }, r(e.icon), s("div", { class: "as-detail-title" }, s("h1", {}, "lilOS"), s("div", { class: "as-sub" }, k("detail.kindSystem")), s("div", { class: "as-meta" }, at(e), s("span", { class: "as-state" }, c("shield"), k("detail.verified")), s("span", { class: "as-state" }, k("detail.required"))), o.length ? s("div", { class: "as-detail-actions" }, ...o) : null)), a ? s("div", { class: "as-banner" }, c("info"), s("span", {}, k("banner.systemRestart", { version: a })), U(k("action.restartKernel"), H, {
			primary: !0,
			key: "system"
		})) : null, S && n.failed ? s("div", { class: "as-banner" }, c("warning"), s("span", {}, k("system.failed", {
			version: n.failed.version,
			reason: n.failed.reason,
			current: n.version
		}))) : null, i ? null : s("div", { class: "as-banner" }, c("info"), s("span", {}, k("system.development"))), s("div", { class: "as-facts" }, K(k("system.inUse"), n.version), K(k("detail.version"), e.offered ?? "—"), K(k("detail.repository"), e.repo ? N(e.repo) : "—"), K(k("detail.state"), a ? k("system.next", { version: a }) : k(i ? "system.installedMode" : "system.developmentMode"))), l.length ? [G(k("system.kept")), s("div", { class: "as-group" }, ...l.map(u))] : null, s("div", { class: "as-perm" }, s("h3", {}, c("info"), k("detail.warning")), s("p", {}, k("system.warning"))), e.changelog ? [s("div", { class: "as-readme-title" }, c("file"), "CHANGELOG.md"), s("article", { class: "as-readme" }, ...O(e.changelog))] : null, e.changelog && e.changelogTruncated ? s("p", { class: "as-readme-cut" }, k("readme.truncated"), " ", s("button", {
			class: "as-link",
			onclick: (t) => et(e, t.currentTarget)
		}, c("download"), k("readme.download"))) : null, s("div", { class: "as-readme-title" }, c("file"), "README.md"), e.readme ? s("article", { class: "as-readme" }, ...O(e.readme)) : s("p", { class: "as-muted" }, e.repo ? k("readme.none") : k("readme.notFromRepo")), e.readme && e.readmeTruncated ? s("p", { class: "as-readme-cut" }, k("readme.truncated"), " ", s("button", {
			class: "as-link",
			onclick: (t) => $e(e, t.currentTarget)
		}, c("download"), k("readme.download"))) : null);
	}
	function pt(e, t) {
		if (e.kind === "system") return ft(e, t);
		let n = e.kind === "module", a = [];
		e.here && !n && a.push(U(k("action.open"), () => te(e.id), { primary: !e.update || !S })), S && (e.replacedBy ? a.push(U(k("action.installName", { name: e.replacedBy.name }), () => B(e.replacedBy), {
			primary: !0,
			key: e.key
		})) : e.update && a.push(U(k("action.updateTo", { version: e.update }), () => Ke(e), {
			primary: !0,
			key: e.key
		})), e.here && (!n || e.have.enabled) && (!Te(e) && e.have.source && a.push(U(k("action.checkUpdates"), () => Ke(e), { key: e.key })), n || a.push(U(k("action.reinstall"), () => Ze(e), { key: e.key })), e.required || a.push(U(k(n ? "action.remove" : "action.uninstall"), () => Ye(e), {
			danger: !0,
			key: e.key
		}))), !e.here && !e.elsewhere && e.entry && a.push(U(e.repo.official ? k("action.install") : k("action.installAnyway"), () => B(e), {
			primary: !0,
			danger: !e.repo.official,
			key: e.key
		})));
		let o = n && e.have ? e.replacedBy ? k("status.replacedBy", { name: e.replacedBy.name }) : e.have.enabled ? e.have.running === e.have.enabled ? k("moduleState.inUse") : e.have.running ? k("moduleState.oldUntilRestart", { version: e.have.running }) : k("moduleState.nextStart") : k("moduleState.removed") : null, l = x(e.manifest?.permissions), u = (n ? e.module?.dependencies : e.shown?.dependencies ?? e.manifest?.dependencies) ?? [], d = e.here && !n ? i.get(e.id)?.unmet ?? [] : [];
		return Z.textContent = `${e.name} ${e.offered ?? e.installed}`, s("div", { class: "as-detail" }, ct(t.label), s("div", { class: "as-detail-head" }, r(e.icon), s("div", { class: "as-detail-title" }, s("h1", {}, e.name), s("div", { class: "as-sub" }, [
			e.publisher,
			k(n ? "detail.kindModule" : "detail.kindApp"),
			re().find((t) => t.id === e.category)?.label
		].filter(Boolean).join(" · ")), s("div", { class: "as-meta" }, at(e), e.verified ? s("span", { class: "as-state" }, c("shield"), k("detail.verified")) : e.repo ? s("span", { class: "as-unofficial" }, k("detail.unverified")) : null, e.required ? s("span", { class: "as-state" }, k("detail.required")) : null, e.elsewhere ? s("span", { class: "as-state" }, k(n ? "status.installedElsewhereModule" : "status.installedElsewhereApp")) : null), a.length ? s("div", { class: "as-detail-actions" }, ...a) : null)), e.repo && !e.repo.official && !e.here ? s("div", { class: "as-banner" }, c("info"), s("span", {}, k("detail.unofficialWarning"))) : null, d.length ? s("div", { class: "as-banner" }, c("warning"), s("span", {}, d.every((e) => e.why === "restart") ? k("deps.unmetRestart", {
			name: e.name,
			list: d.map((e) => e.id).join(", ")
		}) : k("deps.unmetMissing", {
			name: e.name,
			list: d.map((e) => e.id).join(", ")
		})), S && d.some((e) => e.why === "restart") ? U(k("action.restartKernel"), H, {
			primary: !0,
			key: "unmet"
		}) : null) : null, s("div", { class: "as-facts" }, K(k("detail.version"), e.offered ?? e.installed), K(st(e), e.installed ?? "—"), K(k("detail.repository"), e.repo ? N(e.repo) : "—"), n ? K(k("detail.provides"), e.provides.join(", ") || "—") : K(k("detail.id"), e.id), o ? K(k("detail.state"), o) : null), n ? s("div", { class: "as-perm" }, s("h3", {}, c("info"), k("detail.warning")), s("p", {}, k("detail.moduleWarning"))) : s("div", { class: "as-perm" }, s("h3", {}, c("shield"), k("detail.mayDo")), l.length ? s("ul", {}, ...l.map((e) => s("li", {}, c("check"), b(e)))) : s("p", { class: "as-muted" }, k("permissions.none"))), u.length ? mt(u) : null, s("div", { class: "as-readme-title" }, c("file"), "README.md"), e.readme ? s("article", { class: "as-readme" }, ...O(e.readme)) : null, e.readme && e.readmeTruncated ? s("p", { class: "as-readme-cut" }, k("readme.truncated"), " ", s("button", {
			class: "as-link",
			onclick: (t) => $e(e, t.currentTarget)
		}, c("download"), k("readme.download"))) : null, e.readme ? null : s("p", { class: "as-muted" }, e.repo ? k("readme.none") : k("readme.notFromRepo")));
	}
	function mt(e) {
		let t = (e) => {
			if (e.app !== void 0) {
				let t = i.get(e.app);
				return t ? {
					ok: !0,
					text: k("deps.stateInstalled", { version: t.version })
				} : {
					ok: !1,
					text: k("deps.stateMissing")
				};
			}
			if (!S) return null;
			let t = C.modules.find((t) => t.name === e.module && t.enabled);
			return t ? {
				ok: !0,
				text: t.running === t.enabled ? k("deps.stateInstalled", { version: t.enabled }) : k("deps.stateRestart")
			} : {
				ok: !1,
				text: k("deps.stateMissing")
			};
		};
		return s("div", { class: "as-perm" }, s("h3", {}, c("link"), k("deps.title")), s("ul", {}, ...e.map((e) => {
			let n = t(e);
			return s("li", {}, c(n && !n.ok ? "info" : "check"), s("span", {}, s("b", {}, e.app === void 0 ? e.module : Pe(e.app)), e.version ? ` ${e.version}` : "", ` · ${z(e.module === void 0 ? "app" : "module")}`, e.optional ? ` · ${k("deps.optionalTag")}` : "", e.reason ? s("span", { class: "as-muted" }, ` — ${e.reason}`) : null, n ? s("span", { class: "as-muted" }, ` (${n.text})`) : null));
		})));
	}
	function ht() {
		let e = C.updateTask, t = pe(e) ?? "daily", n = _({
			value: !!e?.enabled,
			label: k("updates.check"),
			onChange: (e) => me({ on: e })
		}), r = [
			{
				value: "daily",
				label: k("updates.daily")
			},
			{
				value: "weekly",
				label: k("updates.weekly")
			},
			...t === "other" ? [{
				value: "other",
				label: k("updates.other")
			}] : []
		], i = s("select", {
			class: "ctl-select",
			"aria-label": k("updates.when")
		}, r.map((e) => s("option", {
			value: e.value,
			selected: e.value === t
		}, e.label)));
		i.disabled = !e?.enabled, i.addEventListener("change", () => {
			i.value !== "other" && me({ every: i.value });
		});
		let a = s("button", {
			class: "as-link",
			type: "button",
			style: "background:none;border:0;padding:0;cursor:pointer;width:max-content",
			onclick: () => te("scheduler", { task: e?.id }, "main")
		}, k("updates.inScheduler"));
		return s("div", { class: "as-row" }, s("div", { class: "as-row-text" }, s("b", {}, k("updates.check")), s("span", {}, k("updates.taskHint")), e ? a : null), i, n);
	}
	function gt() {
		if (D && C.updates) return ht();
		let e = C.updates, t = !e || e.system && !e.canControl, n = e ? e.system ? k("updates.bySystem") : k("updates.description") : k("updates.needsEngine"), r = _({
			value: !!e && e.startup !== "none",
			label: k("updates.atStart"),
			onChange: he
		});
		return r.disabled = t, s("div", { class: "as-row" }, s("div", { class: "as-row-text" }, s("b", {}, k("updates.atStart")), s("span", {}, n)), r);
	}
	function _t(e) {
		let t = C.newRepo;
		return Z.textContent = k("options.title"), s("div", { class: "as-options" }, ct(e.label), s("h2", {}, k("options.title")), s("p", { class: "as-lead" }, k("options.lead")), G("AppStore"), s("div", { class: "as-group" }, s("div", { class: "as-row" }, s("div", { class: "as-row-text" }, s("b", {}, k("options.showUnofficial")), s("span", {}, k("options.showUnofficialHint"))), _({
			value: m.get("appstore.showUnofficial"),
			label: k("options.showUnofficial"),
			onChange: (e) => m.set("appstore.showUnofficial", e)
		})), gt()), G(k("options.repositories"), s("span", { class: "as-bulk" }, U(k("action.reload"), () => _e()))), s("div", { class: "as-group" }, ...C.repos.map((e) => {
			let t = P(e), n = C.catalogs.get(e.id), i = (e) => (e ?? []).filter((e) => !e.error).length, a = [...n?.apps ?? [], ...n?.modules ?? []].filter((e) => e.error), o = t ? C.errors.has(e.id) ? k("options.unreachable", { error: C.errors.get(e.id) }) : n ? [
				k("options.apps", { n: i(n.apps) }),
				k("options.modules", { n: i(n.modules) }),
				a.length ? k("options.invalid", { n: a.length }) : null
			].filter(Boolean).join(" · ") : k("options.reading") : k("options.disabled");
			return s("div", { class: t ? "as-row" : "as-row as-row-off" }, r(e.official ? {
				glyph: "shield",
				color: "#30a46c"
			} : {
				glyph: "link",
				color: "#8a909b"
			}), s("div", { class: "as-row-text" }, s("b", {}, N(e), s("span", { class: "as-muted" }, ` · ${e.name}`)), s("span", {}, e.url), s("span", {
				class: t && C.errors.has(e.id) ? "as-error" : null,
				title: t && a.map((e) => `${e.path}: ${e.error}`).join("\n") || null
			}, o)), e.official ? s("span", { class: "as-muted" }, k("options.alwaysThere")) : S ? U(k("action.remove"), () => T("repo", () => p.remove(e.id), k("done.repoRemoved", { name: N(e) })), {
				danger: !0,
				key: e.id
			}) : null, Object.assign(_({
				value: t,
				label: k("options.active", { name: N(e) }),
				onChange: (t) => ye(e, t)
			}), { id: `as-repo-${e.id}` }));
		})), G(k("options.addRepo")), S ? s("div", { class: "as-group" }, s("div", { class: "as-row" }, s("div", { class: "as-row-text" }, s("b", {}, k("options.address")), s("span", {}, k("options.addressHint"))), ee({
			value: t.url,
			placeholder: "https://…",
			label: k("options.addressLabel"),
			onInput: (e) => {
				t.url = e;
			}
		})), s("div", { class: "as-row" }, s("div", { class: "as-row-text" }, s("b", {}, k("options.name")), s("span", {}, k("options.nameHint"))), ee({
			value: t.name,
			placeholder: k("options.name"),
			label: k("options.nameLabel"),
			onInput: (e) => {
				t.name = e;
			}
		})), s("div", { class: "as-row as-row-end" }, U(k("action.add"), () => T("repo", async () => {
			let e = await p.add(t.url.trim(), t.name.trim() || void 0);
			return C.newRepo = {
				url: "",
				name: ""
			}, e;
		}, (e) => k("done.repoAdded", { name: N(e) })), { primary: !0 }))) : s("p", { class: "as-muted" }, k("options.adminOnly")));
	}
	let Y = s("input", {
		type: "search",
		autocomplete: "off",
		spellcheck: "false",
		"aria-label": k("search.label")
	}), X = s("div", {
		class: "as-tabs",
		role: "tablist"
	}), vt = s("main", { class: "as-main" }), Z = s("span", { class: "as-foot-text" });
	w.body.append(s("div", { class: "as-head" }, s("label", { class: "as-search" }, c("search"), Y), X), vt, s("footer", { class: "as-foot" }, Z, s("span", { class: "as-spacer" }), s("button", {
		class: "as-link",
		onclick: () => Q("options")
	}, c("gear"), k("options.title"))));
	function Q(e, t = null) {
		C.view = e, C.key = t, $(), vt.scrollTop = 0;
	}
	function yt(e) {
		C.tab = e, Q("list");
	}
	Y.addEventListener("input", () => {
		C.query[C.tab] = Y.value, C.view = "list", $();
	}), Y.addEventListener("keydown", (e) => {
		e.key === "Escape" && Y.value && (e.stopPropagation(), Y.value = "", Y.dispatchEvent(new Event("input")));
	}), X.addEventListener("keydown", (e) => {
		if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
		let t = [...X.querySelectorAll("[role=tab]")];
		t[(t.indexOf(document.activeElement) + (e.key === "ArrowRight" ? 1 : -1) + t.length) % t.length].click(), X.querySelector("[tabindex=\"0\"]")?.focus();
	});
	function $() {
		let e = Ce(), t = we(e);
		t.some((e) => e.id === C.tab) || (C.tab = "installed");
		let n = t.find((e) => e.id === C.tab), r = e.filter(Te).length;
		X.replaceChildren(...t.flatMap((e, n) => [e.category && !t[n - 1].category ? s("span", { class: "as-tab-sep" }) : null, s("button", {
			class: "as-tab",
			role: "tab",
			"aria-selected": String(C.view === "list" && e.id === C.tab),
			tabindex: e.id === C.tab ? "0" : "-1",
			onclick: () => yt(e.id)
		}, e.label, e.badge && r ? s("span", { class: "as-count" }, String(r)) : null)].filter(Boolean))), Y.placeholder = k("search.placeholder", { tab: n.label }), Y.value !== (C.query[C.tab] ?? "") && (Y.value = C.query[C.tab] ?? "");
		let i = C.view === "detail" ? e.find((e) => e.key === C.key) : null;
		C.view === "detail" && !i && (C.view = "list");
		let a = C.view === "options" ? _t(n) : i ? pt(i, n) : dt(e, n);
		vt.replaceChildren(...[a].flat(3).filter(Boolean));
	}
	w.on("launch", (e) => {
		let t = {
			apps: "installed",
			modules: "kernel"
		}[e?.tab] ?? e?.tab;
		t === "repos" || t === "options" ? Q("options") : typeof t == "string" && yt(t);
	});
	let bt = i.on("change", () => $()), xt = m.on("change:appstore.showUnofficial", () => $()), St = v.services?.on("change", (e) => {
		e.app === "appstore" && E().then($);
	});
	return w.on("destroy", () => {
		bt(), xt(), St?.();
	}), $(), _e(), w;
}
export { ue as default };
