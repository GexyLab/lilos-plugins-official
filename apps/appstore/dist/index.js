import * as e from "/host/sdk.js";
import { Window as t, actionButton as n, appIcon as r, apps as i, fs as a, h as o, icon as s, kernel as c, kernelModules as l, repositories as u, settings as d, storage as f, textField as p, toast as m, toggle as h } from "/host/sdk.js";
import * as g from "/host/system.js";
import { describePermission as _, launch as ee } from "/host/system.js";
// src/appstore/markdown.js
var v = /(`+)([^`]+?)\1|\*\*(.+?)\*\*|__(.+?)__|\*(?!\s)(.+?)\*|\b_(?!\s)(.+?)_\b|!\[([^\]]*)\]\([^)]*\)|\[([^\]]+)\]\(\s*<?((?:[^()\s<>]|\([^()\s]*\))+)>?(?:\s+"[^"]*")?\s*\)|<(https?:\/\/[^>\s]+)>/;
function y(e) {
	let t = [], n = e;
	for (; n;) {
		let e = v.exec(n);
		if (!e) {
			t.push(n);
			break;
		}
		e.index && t.push(n.slice(0, e.index)), e[2] === void 0 ? e[3] !== void 0 || e[4] !== void 0 ? t.push(o("strong", {}, ...y(e[3] ?? e[4]))) : e[5] !== void 0 || e[6] !== void 0 ? t.push(o("em", {}, ...y(e[5] ?? e[6]))) : e[7] === void 0 ? t.push(b(e[8] ?? e[10], e[9] ?? e[10])) : t.push(e[7] ? `[${e[7]}]` : "") : t.push(o("code", {}, e[2])), n = n.slice(e.index + e[0].length);
	}
	return t;
}
function b(e, t) {
	let n = null;
	try {
		let e = new URL(t);
		(e.protocol === "https:" || e.protocol === "http:") && (n = e.href);
	} catch {}
	let r = y(e);
	return n ? o("a", {
		href: n,
		target: "_blank",
		rel: "noopener noreferrer",
		title: n
	}, ...r) : o("span", {}, ...r);
}
var x = (e) => e.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((e) => e.trim()), S = /^\s{0,3}([-*+]|\d{1,9}[.)])\s+(.*)$/, C = /^\s{0,3}(#{1,6}\s|```|~~~|>|[-*+]\s|\d{1,9}[.)]\s|(-\s*){3,}$|(\*\s*){3,}$)/;
function w(e) {
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
			n.push(o(`h${a[1].length}`, {}, ...y(a[2]))), r++;
			continue;
		}
		if (/^\s{0,3}((-\s*){3,}|(\*\s*){3,}|(_\s*){3,})$/.test(e)) {
			n.push(o("hr")), r++;
			continue;
		}
		if (/^\s{0,3}>/.test(e)) {
			let e = [];
			for (; r < t.length && /^\s{0,3}>/.test(t[r]); r++) e.push(t[r].replace(/^\s{0,3}>\s?/, ""));
			n.push(o("blockquote", {}, ...w(e.join("\n"))));
			continue;
		}
		if (e.includes("|") && /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(t[r + 1] ?? "")) {
			let i = x(e), a = [];
			for (r += 2; r < t.length && t[r].includes("|") && t[r].trim(); r++) a.push(x(t[r]));
			n.push(o("div", { class: "md-table" }, o("table", {}, o("thead", {}, o("tr", {}, ...i.map((e) => o("th", {}, ...y(e))))), o("tbody", {}, ...a.map((e) => o("tr", {}, ...i.map((t, n) => o("td", {}, ...y(e[n] ?? "")))))))));
			continue;
		}
		let s = S.exec(e);
		if (s) {
			let e = /\d/.test(s[1]), i = [];
			for (; r < t.length;) {
				let n = S.exec(t[r]);
				if (n && /\d/.test(n[1]) === e && !/^\s{2,}/.test(t[r])) i.push([n[2]]), r++;
				else if (i.length && t[r].trim() && (/^\s{2,}/.test(t[r]) || !C.test(t[r]))) i.at(-1).push(t[r].trim()), r++;
				else break;
			}
			n.push(o(e ? "ol" : "ul", {}, ...i.map(([e, ...t]) => {
				let n = t.filter((e) => S.test(e)), r = [e, ...t.filter((e) => !S.test(e))].join(" ");
				return o("li", {}, ...y(r), n.length ? w(n.join("\n")) : null);
			})));
			continue;
		}
		let c = [];
		for (; r < t.length && t[r].trim() && !C.test(t[r]); r++) c.push(t[r].trim());
		c.length || (c.push(e.trim()), r++), n.push(o("p", {}, ...y(c.join(" "))));
	}
	return n;
}
// src/shared/i18n.js
function T(t, n) {
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
var { t: E } = T("appstore", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"AppStore\",\"@description\":\"Installs, updates and removes apps and kernel modules from repositories; checks for updates even with lilOS closed.\",\"@entrypoints.updates.label\":\"Updates\",\"@entrypoints.updates.params.ore.label\":\"Check every (hours)\",\"category.system\":\"System\",\"category.productivity\":\"Productivity\",\"category.media\":\"Media\",\"category.development\":\"Development\",\"category.other\":\"Other\",\"category.kernel\":\"Kernel\",\"tab.installed\":\"Installed\",\"tab.updates\":\"Updates\",\"search.label\":\"Search\",\"search.placeholder\":\"Search in {tab}\",\"action.cancel\":\"Cancel\",\"action.install\":\"Install\",\"action.installAnyway\":\"Install anyway\",\"action.update\":\"Update\",\"action.updateTo\":\"Update to {version}\",\"action.updateAll\":\"Update all\",\"action.checkUpdates\":\"Check for updates\",\"action.open\":\"Open\",\"action.reinstall\":\"Reinstall\",\"action.remove\":\"Remove\",\"action.uninstall\":\"Uninstall\",\"action.restartKernel\":\"Restart the kernel\",\"action.details\":\"Details\",\"action.reload\":\"Reload\",\"action.add\":\"Add\",\"confirm.installTitle\":\"Install {name}\",\"confirm.updateTitle\":\"Update {name}\",\"confirm.uninstallTitle\":\"Uninstall {name}\",\"confirm.uninstall\":\"{name} will be removed for every user, with its settings and its data.\",\"confirm.uninstallFiles\":\"The files it had created are deleted, or go to the Trash if someone changed them. Your other files stay where they are.\",\"confirm.kernelModule\":\"{name} is a kernel module: its code will run in the kernel, with full access to users and files.\",\"confirm.mayDo\":\"{name} will be able to:\",\"confirm.unverified\":\"Not verified: it comes from an unofficial repository. There is no way to know who wrote it, or that its code has not been changed. Install it only if you trust whoever distributes it.\",\"permissions.none\":\"No permissions beyond its own data.\",\"done.appInstalled\":\"{name} installed\",\"done.moduleInstalled\":\"{name} installed: restart the kernel to use it\",\"done.appUpToDate\":\"{name} is already up to date\",\"done.moduleUpToDate\":\"{name} is already up to date\",\"done.appUpdated\":\"{name} updated to {version}\",\"done.moduleUpdated\":\"{name} {version} installed: restart the kernel\",\"done.updatedCount\":{\"one\":\"{n} item updated\",\"other\":\"{n} items updated\"},\"done.appRemoved\":\"{name} uninstalled\",\"done.moduleRemoved\":\"{name} removed: restart the kernel\",\"done.moduleRemovedDataKept\":\"{name} removed (its data is kept): restart the kernel\",\"done.appReinstalled\":\"{name} reinstalled\",\"done.kernelRestarted\":\"Kernel restarted\",\"restart.kernelReason\":\"The kernel started again with other modules\",\"done.repoRemoved\":\"{name} removed\",\"done.repoAdded\":\"{name} added\",\"updates.atStart\":\"Check for updates at startup\",\"updates.atStartOn\":\"The AppStore will check for updates when you sign in\",\"updates.atStartOff\":\"Checking for updates at startup turned off\",\"updates.needsEngine\":\"Needs the kernel’s service engine (the services-isolate module)\",\"updates.bySystem\":\"Chosen by an administrator for everyone: change it in Control Panel → Startup → Services\",\"updates.description\":\"When you sign in and then at intervals (every 24 hours, change it in Control Panel → Startup → Services), even with lilOS closed: a notification tells you what can be updated\",\"updates.check\":\"Check for updates\",\"updates.taskHint\":\"An operation of the Scheduler, also with lilOS closed: a notification tells you what can be updated\",\"updates.when\":\"How often\",\"updates.daily\":\"Every day at 09:00\",\"updates.weekly\":\"Every Monday at 09:00\",\"updates.other\":\"As in the Scheduler\",\"updates.inScheduler\":\"Change it in the Scheduler\",\"updates.taskName\":\"Check for updates\",\"service.found\":{\"one\":\"1 update available\",\"other\":\"{n} updates available\"},\"notify.updates\":{\"one\":\"Update available: {names}. Open the AppStore.\",\"other\":\"{n} updates available: {names}. Open the AppStore.\"},\"readme.saved\":\"README saved in Download as “{file}”\",\"readme.truncated\":\"The README is too long: only its beginning is shown here.\",\"readme.download\":\"Download the full README\",\"readme.none\":\"This package has no README.\",\"readme.notFromRepo\":\"The README is read from the repository: this item does not come from a listed repository.\",\"error.noDownloadFolder\":\"The Download folder is missing\",\"status.available\":\"Available\",\"status.updateAvailable\":\"Update {version}\",\"status.removed\":\"Removed\",\"status.otherRepo\":\"From another repository\",\"status.installedApp\":\"Installed\",\"status.installedModule\":\"Installed\",\"status.installedElsewhereApp\":\"Installed from another repository\",\"status.installedElsewhereModule\":\"Installed from another repository\",\"repo.manual\":\"Installed manually\",\"repo.localFolder\":\"Local folder\",\"repo.unofficial\":\"unofficial\",\"banner.restartNeeded\":\"Changes to modules take effect from the next kernel start.\",\"banner.repoUnreachable\":\"{name} is unreachable: what it offers is not listed.\",\"banner.reposUnreachable\":{\"one\":\"{n} repository is unreachable: what it offers is not listed.\",\"other\":\"{n} repositories are unreachable: what they offer is not listed.\"},\"banner.reposDisabled\":{\"one\":\"{n} repository is off: what it offers is not listed.\",\"other\":\"{n} repositories are off: what they offer is not listed.\"},\"banner.officialDisabled\":\"The official repository is off: its apps and the updates of lilOS and of its apps are not listed.\",\"list.reading\":\"Reading the repositories…\",\"list.items\":{\"one\":\"{n} item\",\"other\":\"{n} items\"},\"list.repos\":{\"one\":\"{n} repository\",\"other\":\"{n} repositories\"},\"list.noResults\":\"No results for “{query}” in {tab}\",\"list.upToDate\":\"Everything is up to date\",\"list.nothingInstalled\":\"Nothing installed\",\"list.emptyCategory\":\"Nothing in this category\",\"list.apps\":\"Apps\",\"list.modules\":\"Kernel modules\",\"list.updates\":{\"one\":\"{n} update\",\"other\":\"{n} updates\"},\"detail.kindApp\":\"App\",\"detail.kindModule\":\"Kernel module\",\"detail.verified\":\"Verified\",\"detail.unverified\":\"unofficial · not verified\",\"detail.required\":\"Required by lilOS\",\"detail.unofficialWarning\":\"It comes from an unofficial repository: there is no way to know who wrote it, or that its code has not been changed.\",\"detail.version\":\"Version\",\"detail.repository\":\"Repository\",\"detail.provides\":\"Provides\",\"detail.id\":\"ID\",\"detail.state\":\"Status\",\"detail.warning\":\"Warning\",\"detail.moduleWarning\":\"A module’s code runs in the kernel, with full access to users and files. Changes take effect from the next kernel start.\",\"detail.mayDo\":\"Allowed to\",\"moduleState.removed\":\"Removed: active until restart\",\"moduleState.oldUntilRestart\":\"{version} in use until restart\",\"moduleState.nextStart\":\"Active from the next start\",\"moduleState.inUse\":\"In use\",\"action.delete\":\"Delete\",\"detail.kindSystem\":\"Operating system\",\"banner.systemRestart\":\"lilOS {version} starts with the next restart of the kernel.\",\"system.description\":\"The system itself: desktop, kernel and SDK.\",\"system.inUse\":\"In use\",\"system.nextShort\":\"{version} at restart\",\"system.next\":\"{version} starts with the next restart\",\"system.confirmTitle\":\"Update lilOS to {version}?\",\"system.confirmLead\":\"lilOS {version} is installed next to {current}, the version in use, for every user.\",\"system.confirmRestart\":\"It starts when the kernel restarts: everyone signed in loses the connection for a few seconds, then lilOS loads again.\",\"system.confirmRollback\":\"If it does not start, lilOS goes back to {current} by itself and tells the administrators.\",\"system.upToDate\":\"lilOS is up to date\",\"system.ready\":\"lilOS {version} is ready: it starts with the next restart of the kernel\",\"system.nextCancelled\":\"The change of version has been called off\",\"system.removeTitle\":\"Delete lilOS {version}?\",\"system.removeLead\":\"The files of lilOS {version} are deleted from the disk: you can no longer go back to it. Data and apps are not touched.\",\"system.removed\":\"lilOS {version} deleted\",\"system.failed\":\"lilOS {version} did not start ({reason}): lilOS went back to {current} by itself.\",\"system.development\":\"This lilOS runs from a copy of its repository (development): it is updated with git, not from here.\",\"system.installedMode\":\"Installed\",\"system.developmentMode\":\"Development copy\",\"system.kept\":\"Versions kept on disk\",\"system.keptHint\":\"To go back to it\",\"system.keptFailed\":\"Did not start\",\"system.use\":\"Use this version\",\"system.cancelNext\":\"Call off\",\"system.warning\":\"lilOS is updated for every user. The new version is put next to the one in use and starts with the kernel’s restart; the one before stays on disk until you delete it.\",\"options.title\":\"Options\",\"options.lead\":\"AppStore preferences and the repositories apps and modules come from. Switch a repository off to list only what the active ones offer.\",\"options.showUnofficial\":\"Show unofficial repositories\",\"options.showUnofficialHint\":\"When off, the tabs list only what the official repository offers\",\"options.repositories\":\"Repositories\",\"options.unreachable\":\"Unreachable: {error}\",\"options.apps\":{\"one\":\"{n} app\",\"other\":\"{n} apps\"},\"options.modules\":{\"one\":\"{n} module\",\"other\":\"{n} modules\"},\"options.invalid\":{\"one\":\"{n} invalid package\",\"other\":\"{n} invalid packages\"},\"options.reading\":\"Reading…\",\"options.alwaysThere\":\"Always present\",\"options.active\":\"{name} active\",\"options.disabled\":\"Off: not read, nothing of it is listed or offered as an update\",\"options.addRepo\":\"Add a repository\",\"options.address\":\"Address\",\"options.addressHint\":\"A git repository with catalog.json, for example https://github.com/name/repo\",\"options.addressLabel\":\"Repository address\",\"options.name\":\"Name\",\"options.nameHint\":\"Optional: otherwise the one in its catalog\",\"options.nameLabel\":\"Repository name\",\"options.adminOnly\":\"Only an administrator can add and remove repositories.\",\"action.close\":\"Close\",\"action.later\":\"Later\",\"action.restartNow\":\"Restart now\",\"confirm.removeTitle\":\"Remove {name}\",\"confirm.removeModule\":\"{name} will stop running in the kernel from its next start.\",\"restart.askTitle\":\"Restart the kernel?\",\"restart.askLead\":\"Installing {name} is done. The kernel modules installed start working after the kernel restarts.\",\"restart.askHint\":\"Restarting takes a few seconds: lilOS reconnects by itself.\",\"restart.askRemovedLead\":\"{name} is removed. The kernel modules removed with it stop after the kernel restarts.\",\"deps.title\":\"Needs\",\"deps.install\":\"installs version {version}\",\"deps.update\":\"updates {from} → {version}\",\"deps.kindModule\":\"Kernel module\",\"deps.kindApp\":\"App\",\"deps.why\":\"Needed by {name}\",\"deps.whyReason\":\"Needed by {name}: {reason}\",\"deps.unverifiedModule\":\"Not verified: its code will run in the kernel with full access.\",\"deps.unverifiedApp\":\"Not verified: from an unofficial repository.\",\"deps.brings\":\"Also installs: {name} ({kind})\",\"deps.tick\":\"Also install {name}\",\"deps.cannot\":\"{name} cannot be installed now:\",\"deps.required\":\"Also installed\",\"deps.optional\":\"Optional: install them too?\",\"deps.unavailable\":\"Not available now: {list}\",\"deps.restartNote\":\"Kernel modules start working after the kernel restarts: you will be asked at the end.\",\"deps.installed\":{\"zero\":\"{name} installed\",\"one\":\"{name} installed, with {n} more package\",\"other\":\"{name} installed, with {n} more packages\"},\"deps.alsoRemove\":\"Also remove {name}\",\"deps.unneededTitle\":\"No longer needed\",\"deps.unneededHint\":\"They were installed only for it and nothing else uses them. The ticked ones are removed too.\",\"deps.blocked\":\"{name} cannot be removed: {list} needs it.\",\"deps.blockedHint\":{\"one\":\"Remove that one first, then this one.\",\"other\":\"Remove those first, then this one.\"},\"deps.appRemovedWith\":{\"one\":\"{name} uninstalled, with {n} more package\",\"other\":\"{name} uninstalled, with {n} more packages\"},\"deps.moduleRemovedWith\":{\"one\":\"{name} removed, with {n} more package\",\"other\":\"{name} removed, with {n} more packages\"},\"deps.unmetRestart\":\"{name} needs {list}, already installed: it works after the kernel restarts.\",\"deps.unmetMissing\":\"{name} is missing {list}: it cannot start until it is installed.\",\"deps.stateInstalled\":\"installed, {version}\",\"deps.stateMissing\":\"missing\",\"deps.stateRestart\":\"after the kernel restarts\",\"deps.optionalTag\":\"optional\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"AppStore\",\"@description\":\"Installa, aggiorna e rimuove app e moduli del kernel dai repository; controlla gli aggiornamenti anche a lilOS chiuso.\",\"@entrypoints.updates.label\":\"Aggiornamenti\",\"@entrypoints.updates.params.ore.label\":\"Controlla ogni (ore)\",\"category.system\":\"Sistema\",\"category.productivity\":\"Produttività\",\"category.media\":\"Multimedia\",\"category.development\":\"Sviluppo\",\"category.other\":\"Altro\",\"category.kernel\":\"Kernel\",\"tab.installed\":\"Installati\",\"tab.updates\":\"Aggiornamenti\",\"search.label\":\"Cerca\",\"search.placeholder\":\"Cerca in {tab}\",\"action.cancel\":\"Annulla\",\"action.install\":\"Installa\",\"action.installAnyway\":\"Installa comunque\",\"action.update\":\"Aggiorna\",\"action.updateTo\":\"Aggiorna a {version}\",\"action.updateAll\":\"Aggiorna tutto\",\"action.checkUpdates\":\"Cerca aggiornamenti\",\"action.open\":\"Apri\",\"action.reinstall\":\"Reinstalla\",\"action.remove\":\"Rimuovi\",\"action.uninstall\":\"Disinstalla\",\"action.restartKernel\":\"Riavvia il kernel\",\"action.details\":\"Dettagli\",\"action.reload\":\"Ricarica\",\"action.add\":\"Aggiungi\",\"confirm.installTitle\":\"Installa {name}\",\"confirm.updateTitle\":\"Aggiorna {name}\",\"confirm.uninstallTitle\":\"Disinstalla {name}\",\"confirm.uninstall\":\"{name} sarà rimossa per tutti gli utenti, con le sue impostazioni e i suoi dati.\",\"confirm.uninstallFiles\":\"I file che aveva creato si eliminano, o vanno nel Cestino se qualcuno li ha modificati. Gli altri tuoi file restano dove sono.\",\"confirm.kernelModule\":\"{name} è un modulo del kernel: il suo codice girerà nel kernel, con accesso completo a utenti e file.\",\"confirm.mayDo\":\"{name} potrà:\",\"confirm.unverified\":\"Non verificata: viene da un repository non ufficiale. Non si può sapere chi l’ha scritta, né che il codice non sia stato modificato. Installala solo se ti fidi di chi la distribuisce.\",\"permissions.none\":\"Nessun permesso oltre ai propri dati.\",\"done.appInstalled\":\"{name} installata\",\"done.moduleInstalled\":\"{name} installato: riavvia il kernel per usarlo\",\"done.appUpToDate\":\"{name} è già aggiornata\",\"done.moduleUpToDate\":\"{name} è già aggiornato\",\"done.appUpdated\":\"{name} aggiornata alla {version}\",\"done.moduleUpdated\":\"{name} {version} installato: riavvia il kernel\",\"done.updatedCount\":{\"one\":\"{n} elemento aggiornato\",\"other\":\"{n} elementi aggiornati\"},\"done.appRemoved\":\"{name} disinstallata\",\"done.moduleRemoved\":\"{name} rimosso: riavvia il kernel\",\"done.moduleRemovedDataKept\":\"{name} rimosso (i suoi dati restano): riavvia il kernel\",\"done.appReinstalled\":\"{name} reinstallata\",\"done.kernelRestarted\":\"Kernel riavviato\",\"restart.kernelReason\":\"Il kernel è ripartito con moduli diversi\",\"done.repoRemoved\":\"{name} rimosso\",\"done.repoAdded\":\"{name} aggiunto\",\"updates.atStart\":\"Controlla gli aggiornamenti all’avvio\",\"updates.atStartOn\":\"L’AppStore controllerà gli aggiornamenti quando entri\",\"updates.atStartOff\":\"Controllo degli aggiornamenti all’avvio spento\",\"updates.needsEngine\":\"Serve il motore dei servizi del kernel (modulo services-isolate)\",\"updates.bySystem\":\"Scelto da un amministratore per tutti: si cambia dal Pannello di controllo → Avvio → Servizi\",\"updates.description\":\"Quando entri e poi a intervalli (ogni 24 ore, si cambia nel Pannello di controllo → Avvio → Servizi), anche con lilOS chiuso: un avviso dice cosa si può aggiornare\",\"updates.check\":\"Controlla gli aggiornamenti\",\"updates.taskHint\":\"Un’operazione della Pianificazione, anche a lilOS chiuso: un avviso dice cosa si può aggiornare\",\"updates.when\":\"Ogni quanto\",\"updates.daily\":\"Ogni giorno alle 09:00\",\"updates.weekly\":\"Ogni lunedì alle 09:00\",\"updates.other\":\"Come nella Pianificazione\",\"updates.inScheduler\":\"Cambiala nella Pianificazione\",\"updates.taskName\":\"Controlla aggiornamenti\",\"service.found\":{\"one\":\"1 aggiornamento disponibile\",\"other\":\"{n} aggiornamenti disponibili\"},\"notify.updates\":{\"one\":\"Aggiornamento disponibile: {names}. Apri l’AppStore.\",\"other\":\"{n} aggiornamenti disponibili: {names}. Apri l’AppStore.\"},\"readme.saved\":\"README salvato in Download come «{file}»\",\"readme.truncated\":\"Il README è troppo lungo: qui se ne vede solo l’inizio.\",\"readme.download\":\"Scarica il README completo\",\"readme.none\":\"Questo pacchetto non ha un README.\",\"readme.notFromRepo\":\"Il README si legge dal repository: questo elemento non viene da un repository elencato.\",\"error.noDownloadFolder\":\"Manca la cartella Download\",\"status.available\":\"Disponibile\",\"status.updateAvailable\":\"Aggiornamento {version}\",\"status.removed\":\"Rimosso\",\"status.otherRepo\":\"Da un altro repository\",\"status.installedApp\":\"Installata\",\"status.installedModule\":\"Installato\",\"status.installedElsewhereApp\":\"Installata da un altro repository\",\"status.installedElsewhereModule\":\"Installato da un altro repository\",\"repo.manual\":\"Installato a mano\",\"repo.localFolder\":\"Cartella locale\",\"repo.unofficial\":\"non ufficiale\",\"banner.restartNeeded\":\"Le modifiche ai moduli valgono dal prossimo avvio del kernel.\",\"banner.repoUnreachable\":\"{name} non è raggiungibile: quello che offre non è elencato.\",\"banner.reposUnreachable\":{\"one\":\"{n} repository non è raggiungibile: quello che offre non è elencato.\",\"other\":\"{n} repository non sono raggiungibili: quello che offrono non è elencato.\"},\"banner.reposDisabled\":{\"one\":\"{n} repository è disattivato: quello che offre non è elencato.\",\"other\":\"{n} repository sono disattivati: quello che offrono non è elencato.\"},\"banner.officialDisabled\":\"Il repository ufficiale è disattivato: non sono elencati le sue app né gli aggiornamenti di lilOS e delle sue app.\",\"list.reading\":\"Lettura dei repository…\",\"list.items\":{\"one\":\"{n} elemento\",\"other\":\"{n} elementi\"},\"list.repos\":{\"one\":\"{n} repository\",\"other\":\"{n} repository\"},\"list.noResults\":\"Nessun risultato per “{query}” in {tab}\",\"list.upToDate\":\"Tutto aggiornato\",\"list.nothingInstalled\":\"Niente di installato\",\"list.emptyCategory\":\"Niente in questa categoria\",\"list.apps\":\"App\",\"list.modules\":\"Moduli del kernel\",\"list.updates\":{\"one\":\"{n} aggiornamento\",\"other\":\"{n} aggiornamenti\"},\"detail.kindApp\":\"App\",\"detail.kindModule\":\"Modulo del kernel\",\"detail.verified\":\"Verificata\",\"detail.unverified\":\"non ufficiale · non verificata\",\"detail.required\":\"Necessaria a lilOS\",\"detail.unofficialWarning\":\"Viene da un repository non ufficiale: non si può sapere chi l’ha scritta, né che il codice non sia stato modificato.\",\"detail.version\":\"Versione\",\"detail.repository\":\"Repository\",\"detail.provides\":\"Fornisce\",\"detail.id\":\"ID\",\"detail.state\":\"Stato\",\"detail.warning\":\"Attenzione\",\"detail.moduleWarning\":\"Il codice di un modulo gira nel kernel, con accesso completo a utenti e file. Le modifiche valgono dal prossimo avvio del kernel.\",\"detail.mayDo\":\"Potrà\",\"moduleState.removed\":\"Rimosso: attivo fino al riavvio\",\"moduleState.oldUntilRestart\":\"In uso la {version} fino al riavvio\",\"moduleState.nextStart\":\"Attivo dal prossimo avvio\",\"moduleState.inUse\":\"In uso\",\"action.delete\":\"Elimina\",\"detail.kindSystem\":\"Sistema operativo\",\"banner.systemRestart\":\"lilOS {version} parte al prossimo riavvio del kernel.\",\"system.description\":\"Il sistema stesso: scrivania, kernel e SDK.\",\"system.inUse\":\"In uso\",\"system.nextShort\":\"{version} al riavvio\",\"system.next\":\"La {version} parte al prossimo riavvio\",\"system.confirmTitle\":\"Aggiornare lilOS alla {version}?\",\"system.confirmLead\":\"lilOS {version} viene installato accanto alla {current}, quella in uso, per tutti gli utenti.\",\"system.confirmRestart\":\"Parte al riavvio del kernel: chi è collegato perde la connessione per qualche secondo, poi lilOS si ricarica.\",\"system.confirmRollback\":\"Se non parte, lilOS torna da solo alla {current} e lo dice agli amministratori.\",\"system.upToDate\":\"lilOS è aggiornato\",\"system.ready\":\"lilOS {version} è pronto: parte al prossimo riavvio del kernel\",\"system.nextCancelled\":\"Il cambio di versione è stato annullato\",\"system.removeTitle\":\"Eliminare lilOS {version}?\",\"system.removeLead\":\"I file di lilOS {version} vengono eliminati dal disco: non potrai più tornarci. Dati e app non vengono toccati.\",\"system.removed\":\"lilOS {version} eliminato\",\"system.failed\":\"lilOS {version} non è partito ({reason}): lilOS è tornato da solo alla {current}.\",\"system.development\":\"Questo lilOS gira da una copia del suo repository (sviluppo): si aggiorna con git, non da qui.\",\"system.installedMode\":\"Installato\",\"system.developmentMode\":\"Copia di sviluppo\",\"system.kept\":\"Versioni conservate sul disco\",\"system.keptHint\":\"Per tornarci\",\"system.keptFailed\":\"Non è partita\",\"system.use\":\"Usa questa versione\",\"system.cancelNext\":\"Annulla il cambio\",\"system.warning\":\"lilOS si aggiorna per tutti gli utenti. La nuova versione si mette accanto a quella in uso e parte al riavvio del kernel; quella di prima resta sul disco finché non la elimini.\",\"options.title\":\"Opzioni\",\"options.lead\":\"Preferenze dell’AppStore e repository da cui arrivano app e moduli. Disattiva un repository per elencare solo quello che offrono quelli attivi.\",\"options.showUnofficial\":\"Mostra i repository non ufficiali\",\"options.showUnofficialHint\":\"Se spento, le schede elencano solo quello che offre il repository ufficiale\",\"options.repositories\":\"Repository\",\"options.unreachable\":\"Non raggiungibile: {error}\",\"options.apps\":{\"one\":\"{n} app\",\"other\":\"{n} app\"},\"options.modules\":{\"one\":\"{n} modulo\",\"other\":\"{n} moduli\"},\"options.invalid\":{\"one\":\"{n} pacchetto non valido\",\"other\":\"{n} pacchetti non validi\"},\"options.reading\":\"Lettura…\",\"options.alwaysThere\":\"Sempre presente\",\"options.active\":\"{name} attivo\",\"options.disabled\":\"Disattivato: non si legge, niente di suo è elencato né proposto come aggiornamento\",\"options.addRepo\":\"Aggiungi un repository\",\"options.address\":\"Indirizzo\",\"options.addressHint\":\"Un repository git con catalog.json, per esempio https://github.com/nome/repo\",\"options.addressLabel\":\"Indirizzo del repository\",\"options.name\":\"Nome\",\"options.nameHint\":\"Facoltativo: altrimenti quello del suo catalogo\",\"options.nameLabel\":\"Nome del repository\",\"options.adminOnly\":\"Solo un amministratore aggiunge e rimuove repository.\",\"action.close\":\"Chiudi\",\"action.later\":\"Più tardi\",\"action.restartNow\":\"Riavvia ora\",\"confirm.removeTitle\":\"Rimuovi {name}\",\"confirm.removeModule\":\"{name} smetterà di girare nel kernel dal prossimo avvio.\",\"restart.askTitle\":\"Riavviare il kernel?\",\"restart.askLead\":\"Installazione di {name} completata. I moduli del kernel installati entrano in funzione dopo il riavvio del kernel.\",\"restart.askHint\":\"Il riavvio dura qualche secondo: lilOS si ricollega da solo.\",\"restart.askRemovedLead\":\"{name} è stato rimosso. I moduli del kernel rimossi insieme si fermano dopo il riavvio del kernel.\",\"deps.title\":\"Ha bisogno di\",\"deps.install\":\"installa la versione {version}\",\"deps.update\":\"aggiorna dalla {from} alla {version}\",\"deps.kindModule\":\"Modulo del kernel\",\"deps.kindApp\":\"App\",\"deps.why\":\"Serve a {name}\",\"deps.whyReason\":\"Serve a {name}: {reason}\",\"deps.unverifiedModule\":\"Non verificato: il suo codice girerà nel kernel con accesso completo.\",\"deps.unverifiedApp\":\"Non verificata: viene da un repository non ufficiale.\",\"deps.brings\":\"Installa anche: {name} ({kind})\",\"deps.tick\":\"Installa anche {name}\",\"deps.cannot\":\"{name} ora non si può installare:\",\"deps.required\":\"Si installa anche\",\"deps.optional\":\"Facoltativi: installare anche questi?\",\"deps.unavailable\":\"Ora non disponibili: {list}\",\"deps.restartNote\":\"I moduli del kernel entrano in funzione dopo il riavvio del kernel: te lo chiedo alla fine.\",\"deps.installed\":{\"zero\":\"{name} installata\",\"one\":\"{name} installata, con {n} altro pacchetto\",\"other\":\"{name} installata, con altri {n} pacchetti\"},\"deps.alsoRemove\":\"Rimuovi anche {name}\",\"deps.unneededTitle\":\"Non servono più\",\"deps.unneededHint\":\"Erano stati installati solo per questo e niente altro li usa. Quelli spuntati si rimuovono insieme.\",\"deps.blocked\":\"{name} non si può rimuovere: serve a {list}.\",\"deps.blockedHint\":{\"one\":\"Rimuovi prima quella, poi questo.\",\"other\":\"Rimuovi prima quelle, poi questo.\"},\"deps.appRemovedWith\":{\"one\":\"{name} disinstallata, con {n} altro pacchetto\",\"other\":\"{name} disinstallata, con altri {n} pacchetti\"},\"deps.moduleRemovedWith\":{\"one\":\"{name} rimosso, con {n} altro pacchetto\",\"other\":\"{name} rimosso, con altri {n} pacchetti\"},\"deps.unmetRestart\":\"{name} ha bisogno di {list}, già installato: funziona dopo il riavvio del kernel.\",\"deps.unmetMissing\":\"A {name} manca {list}: non parte finché non è installato.\",\"deps.stateInstalled\":\"installato, {version}\",\"deps.stateMissing\":\"manca\",\"deps.stateRestart\":\"dopo il riavvio del kernel\",\"deps.optionalTag\":\"facoltativo\"}}")
}), te = /* @__PURE__ */ new Set([
	"fs.app",
	"fs.tmp",
	"fs.open",
	"ui.notify",
	"clipboard.write",
	"auth.remote"
]), ne = () => [
	{
		id: "system",
		label: E("category.system")
	},
	{
		id: "productivity",
		label: E("category.productivity")
	},
	{
		id: "media",
		label: E("category.media")
	},
	{
		id: "development",
		label: E("category.development")
	},
	{
		id: "other",
		label: E("category.other")
	},
	{
		id: "kernel",
		label: E("category.kernel")
	}
], re = /* @__PURE__ */ new Set([
	"system",
	"productivity",
	"media",
	"development",
	"other"
]), ie = {
	glyph: "monitor",
	color: "#5f6673"
}, ae = {
	glyph: "help",
	color: "#5f6673"
}, oe = {
	glyph: "window",
	color: "#3b6ef5"
}, D = e.systemReleases ?? null;
d.define({ "appstore.showUnofficial": !0 });
var se = "app:appstore:repos.disabled", ce = () => {
	let e = f.get(se, []);
	return (Array.isArray(e) ? e : []).filter((e) => typeof e?.id == "string" && typeof e.name == "string");
}, le = (e, t) => {
	let n = e.split(".").map(Number), r = t.split(".").map(Number);
	return (n[0] - r[0] || n[1] - r[1] || n[2] - r[2]) > 0;
}, O = (e) => e.replace(/\.git$/i, "").replace(/\/+$/, ""), k = (e, t) => !!e?.url && O(e.url).toLowerCase() === O(t.url).toLowerCase(), A = (e) => O(e.url).split(/[/\\]/).pop() || e.name, j = (e) => (e ?? []).filter((e) => !te.has(e.split(":")[0]));
function ue({ openWindow: v }) {
	let y = c.user?.role === "admin", b = {
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
	}, x = new t({
		title: "AppStore",
		icon: "download",
		width: 960,
		height: 640,
		minWidth: 560,
		minHeight: 420
	});
	x.el.classList.add("appstore");
	async function S(e, t, n) {
		if (b.busy) return;
		b.busy = e, $();
		let r;
		try {
			r = await t();
			let e = typeof n == "function" ? n(r) : n;
			e && m(e, { timeout: 5e3 }), await M({ quiet: !0 });
		} catch (e) {
			m(e.message, { timeout: 7e3 });
		} finally {
			b.busy = null, $();
		}
		return r;
	}
	async function C() {
		let e = await g.services?.list().catch(() => null);
		b.updates = e?.available ? e.services.find((e) => e.app === "appstore" && e.entry === "updates") ?? null : null;
	}
	let T = e.schedule?.available && typeof e.schedule.forApp == "function" ? e.schedule.forApp("appstore") : null, te = {
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
	}, O = () => {
		let e = /* @__PURE__ */ new Date(), t = (e) => String(e).padStart(2, "0");
		return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}T09:00`;
	}, ue = () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
	async function de() {
		T && (b.updateTask = (await T.list().catch(() => [])).find((e) => e.what?.type === "service" && e.what.app === "appstore" && e.what.entry === "updates") ?? null, !b.updateTask && b.updates?.startup === "login" && (b.updateTask = await fe({
			on: !0,
			every: "daily"
		}).catch(() => null), await g.services.setStartup("appstore", "updates", "none").catch(() => {}), await C()));
	}
	async function fe({ on: e, every: t }) {
		let n = b.updateTask, r = t ?? pe(n) ?? "daily", i = {
			name: E("updates.taskName"),
			enabled: e,
			when: n && !t ? n.when : {
				...te[r](),
				start: n?.when?.start ?? O(),
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
		return n ? T.update(n.id, i) : T.create(i);
	}
	let pe = (e) => e?.when?.every ? e.when.every.unit === "week" ? "weekly" : e.when.every.unit === "day" ? "daily" : "other" : null;
	async function me(e) {
		try {
			b.updateTask = await fe({
				on: b.updateTask?.enabled ?? !1,
				...e
			});
		} catch (e) {
			m(e.message, { timeout: 7e3 });
		}
		$();
	}
	async function he(e) {
		try {
			await g.services.setStartup("appstore", "updates", e ? "login" : "none"), await g.services[e ? "start" : "stop"]("appstore", "updates"), m(E(e ? "updates.atStartOn" : "updates.atStartOff"));
		} catch (e) {
			m(e.message, { timeout: 7e3 });
		}
		await C(), $();
	}
	async function ge(e) {
		try {
			b.catalogs.set(e.id, await u.catalog(e.id)), b.errors.delete(e.id);
		} catch (t) {
			b.catalogs.delete(e.id), b.errors.set(e.id, t.message);
		}
	}
	async function M({ quiet: e = !1 } = {}) {
		e || (b.loading = !0, $());
		try {
			b.repos = await u.list();
			let e = ce();
			e.some((e) => !b.repos.some((t) => t.id === e.id)) && f.set(se, e.filter((e) => b.repos.some((t) => t.id === e.id))), await Promise.all(b.repos.filter(N).map(ge)), b.modules = y ? await l.list().catch(() => []) : [], b.system = D ? await D.info().catch(() => null) : null, await C(), await de(), await i.refresh();
		} catch (e) {
			m(e.message, { timeout: 7e3 });
		}
		b.loading = !1, $();
	}
	let N = (e) => !ce().some((t) => t.id === e.id), _e = () => b.repos.filter((e) => N(e) && (e.official || d.get("appstore.showUnofficial")));
	async function ve(e, t) {
		let n = ce().filter((t) => t.id !== e.id);
		f.set(se, t ? n : [...n, {
			id: e.id,
			name: e.name
		}]);
		let r = () => {
			$(), x.body.querySelector(`#as-repo-${e.id}`)?.focus();
		};
		r(), t && !b.catalogs.has(e.id) && (await ge(e), r());
	}
	function ye(t, n, r) {
		let i = n?.manifest ?? r.manifest, a = (n ? n.locales && e.locale?.manifest(n.manifest, n.locales) : e.locale?.manifest(r.manifest)) || i, o = n?.manifest.version ?? null, s = !!r && (!n || k(r.source, t));
		return {
			key: `app:${t?.id ?? "-"}:${i.id}`,
			kind: "app",
			id: i.id,
			name: a.name,
			shown: a,
			description: a.description ?? "",
			icon: i.icon ?? ae,
			publisher: i.publisher?.name ?? "",
			category: re.has(i.category) ? i.category : "other",
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
			update: s && o && le(o, r.version) ? o : null,
			required: !!i.required,
			verified: !!r?.signed || !!t?.official
		};
	}
	function be(e, t, n) {
		let r = t?.module ?? n, i = t?.module.version ?? null, a = !!n && (!t || k(n.source, e));
		return {
			key: `module:${e?.id ?? "-"}:${r.name}`,
			kind: "module",
			id: r.name,
			name: r.name,
			description: r.description ?? "",
			icon: t?.module.icon ?? n?.icon ?? ie,
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
			update: a && n.enabled && i && le(i, n.enabled) ? i : null,
			provides: r.provides ?? [],
			verified: !!e?.official,
			required: !!n?.required || !!t?.module?.required
		};
	}
	function xe() {
		let e = b.system;
		if (!e) return null;
		let t = b.repos.find((e) => e.official) ?? null, n = t && N(t) && b.catalogs.get(t.id)?.system?.system ? b.catalogs.get(t.id).system : null, r = n?.system.version ?? null, i = e.mode === "installed";
		return {
			key: "system:lilos",
			kind: "system",
			id: "lilos",
			name: "lilOS",
			description: E("system.description"),
			icon: oe,
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
			update: i && r && le(r, e.version) && r !== e.next ? r : null,
			required: !0,
			verified: !0
		};
	}
	function Se() {
		let e = i.list(), t = b.modules.filter((e) => e.enabled || e.running), n = [];
		for (let r of _e()) {
			let i = b.catalogs.get(r.id);
			for (let t of i?.apps ?? []) t.manifest && n.push(ye(r, t, e.find((e) => e.id === t.manifest.id)));
			if (y) for (let e of i?.modules ?? []) e.module && n.push(be(r, e, t.find((t) => t.name === e.module.name)));
		}
		for (let t of e) n.some((e) => e.kind === "app" && e.here && e.id === t.id) || n.push(ye(b.repos.find((e) => k(t.source, e)) ?? null, null, t));
		for (let e of t) n.some((t) => t.kind === "module" && t.here && t.id === e.name) || n.push(be(b.repos.find((t) => k(e.source, t)) ?? null, null, e));
		let r = xe();
		return r ? [r, ...n] : n;
	}
	function Ce(e) {
		let t = new Set(e.filter((e) => !e.repo || N(e.repo)).map((e) => e.category));
		return [
			{
				id: "installed",
				label: E("tab.installed"),
				filter: (e) => e.here
			},
			{
				id: "updates",
				label: E("tab.updates"),
				filter: (e) => !!e.update,
				badge: !0
			},
			...ne().filter((e) => t.has(e.id) || e.id === "kernel" && y).map((e) => ({
				...e,
				category: !0,
				filter: (t) => t.category === e.id && (!t.repo || N(t.repo))
			}))
		];
	}
	let we = (e, t) => !t || [
		e.name,
		e.id,
		e.description,
		e.publisher,
		e.repo ? A(e.repo) : ""
	].some((e) => e.toLowerCase().includes(t)), Te = () => y && b.modules.some((e) => (e.enabled ?? null) !== (e.running ?? null)), P = () => y ? b.system?.next ?? null : null;
	function F({ title: e, glyph: r, height: i, width: a = 440, body: s, confirm: c, cancel: l = E("action.cancel") }) {
		return new Promise((u) => {
			let d = new t({
				title: e,
				icon: r,
				width: a,
				height: i,
				minimizable: !1,
				maximizable: !1
			}), f = !1, p = (e) => {
				f || (f = !0, u(e), d.emit("close"));
			};
			d.on("destroy", () => p(null)), d.body.append(o("div", { class: "as-dialog" }, o("div", { class: "as-dialog-content" }, ...s), o("div", { class: "as-dialog-buttons" }, n({
				label: l,
				primary: !c,
				onClick: () => p(null)
			}), c ? n({
				label: c.label,
				primary: c.primary,
				danger: c.danger,
				onClick: () => p(c.value)
			}) : null))), d.body.addEventListener("keydown", (e) => {
				e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), p(null));
			}), v(d), requestAnimationFrame(() => d.body.querySelector(".as-dialog-content input, .as-dialog-buttons button:last-child")?.focus());
		});
	}
	function I({ title: e, name: t, permissions: n = [], official: r, kernelModule: i = !1 }) {
		let a = j(n);
		return F({
			title: e,
			glyph: "download",
			height: i || !r ? 340 : 300,
			body: [
				o("p", { class: "as-dialog-lead" }, E(i ? "confirm.kernelModule" : "confirm.mayDo", { name: t })),
				!i && a.length ? o("ul", {}, ...a.map((e) => o("li", {}, _(e)))) : null,
				!i && !a.length ? o("p", {}, E("permissions.none")) : null,
				r ? null : o("p", { class: "as-warning" }, E("confirm.unverified"))
			],
			confirm: {
				label: E(r ? "action.install" : "action.installAnyway"),
				primary: r,
				danger: !r,
				value: {
					grant: a,
					allowUnsigned: !r
				}
			}
		});
	}
	let Ee = (e) => F({
		title: E("confirm.uninstallTitle", { name: e.name }),
		glyph: "trash",
		height: 230,
		body: [o("p", { class: "as-dialog-lead" }, E("confirm.uninstall", { name: e.name })), o("p", {}, E("confirm.uninstallFiles"))],
		confirm: {
			label: E("action.uninstall"),
			danger: !0,
			value: !0
		}
	}), L = e.packages ?? null, De = (e) => e.module === void 0 ? `app:${e.app}` : `module:${e.module}`, R = (t, n) => (n ? e.locale?.manifest(t, n) : e.locale?.manifest(t)) || t, Oe = (e) => {
		let t = i.get(e);
		return t ? R(t.manifest).name : e;
	}, z = (e) => e.kind === "app" && e.manifest ? R(e.manifest, e.locales).name : e.name, ke = (e) => e.action === "install" ? E("deps.install", { version: e.version }) : E("deps.update", {
		from: e.from,
		version: e.version
	}), B = (e) => E(e === "module" ? "deps.kindModule" : "deps.kindApp"), Ae = (e) => {
		let t = b.repos.find((t) => k({ url: e }, t));
		return t ? A(t) : e;
	};
	function je({ title: e, name: t, plan: n, official: i, kernelModule: a = !1, permissions: s = [], rootDeps: c = null }) {
		let l = j(s), u = n.steps.filter((e) => !e.optional), d = n.steps.filter((e) => e.choice), f = n.problems.filter((e) => !e.optional), p = n.problems.filter((e) => e.optional), m = /* @__PURE__ */ new Set(), h = new Map(n.steps.map((e) => [e.key, e])), g = (e) => {
			let t = [], n = (e) => e.needs.forEach((e) => {
				let r = h.get(e);
				r && r.optional && !r.choice && !t.includes(r) && (t.push(r), n(r));
			});
			return n(e), t;
		}, ee = new Map([[n.root.key, c ?? n.root.manifest?.dependencies ?? []], ...n.steps.filter((e) => e.manifest).map((e) => [e.key, R(e.manifest, e.locales).dependencies ?? []])]), v = (e) => e.neededBy.map((r) => {
			let i = (ee.get(r.key) ?? []).find((t) => De(t) === e.key)?.reason ?? r.reason, a = r.key === n.root.key ? t : z(h.get(r.key) ?? r);
			return o("span", { class: "as-dep-why" }, i ? E("deps.whyReason", {
				name: a,
				reason: i
			}) : E("deps.why", { name: a }));
		}), y = (e, t = null) => o("li", { class: "as-dep" }, t, r(e.icon ?? (e.kind === "module" ? ie : ae)), o("div", { class: "as-dep-text" }, o("b", {}, z(e), " ", o("span", { class: "as-dep-action" }, ke(e))), o("span", { class: "as-dep-sub" }, [B(e.kind), Ae(e.repo.url)].join(" · ")), ...v(e), e.permissions.length ? o("ul", {}, ...e.permissions.map((e) => o("li", {}, _(e)))) : null, e.verified ? null : o("span", { class: "as-dep-warning" }, e.kind === "module" ? E("deps.unverifiedModule") : E("deps.unverifiedApp")), ...t ? g(e).map((e) => o("span", { class: "as-dep-sub" }, E("deps.brings", {
			name: z(e),
			kind: B(e.kind)
		}))) : [])), b = (e) => {
			let t = o("input", {
				type: "checkbox",
				"aria-label": E("deps.tick", { name: z(e) })
			});
			return t.addEventListener("change", () => t.checked ? m.add(e.key) : m.delete(e.key)), t;
		}, x = () => {
			let e = {}, t = (t) => {
				e[t.key] = {
					grant: t.permissions,
					allowUnsigned: !t.verified
				};
			};
			u.forEach(t);
			for (let e of d) m.has(e.key) && [e, ...g(e)].forEach(t);
			return e;
		}, S = !i || u.some((e) => !e.verified), C = u.length + d.length + +!!f.length + +!!p.length;
		return F({
			title: e,
			glyph: "download",
			width: 520,
			height: Math.min(640, window.innerHeight - 80, 300 + C * 104 + l.length * 20 + (i ? 0 : 70)),
			body: [
				o("p", { class: "as-dialog-lead" }, E(a ? "confirm.kernelModule" : "confirm.mayDo", { name: t })),
				!a && l.length ? o("ul", {}, ...l.map((e) => o("li", {}, _(e)))) : null,
				!a && !l.length ? o("p", {}, E("permissions.none")) : null,
				i ? null : o("p", { class: "as-warning" }, E("confirm.unverified")),
				f.length ? o("div", {
					class: "as-dep-blocked",
					role: "alert"
				}, o("b", {}, E("deps.cannot", { name: t })), o("ul", {}, ...f.map((e) => o("li", {}, e.message)))) : null,
				u.length ? o("h3", { class: "as-dep-title" }, E("deps.required")) : null,
				u.length ? o("ul", { class: "as-deps" }, ...u.map((e) => y(e))) : null,
				d.length ? o("h3", { class: "as-dep-title" }, E("deps.optional")) : null,
				d.length ? o("ul", { class: "as-deps" }, ...d.map((e) => y(e, b(e)))) : null,
				p.length ? o("p", {
					class: "as-dep-sub",
					title: p.map((e) => e.message).join("\n")
				}, E("deps.unavailable", { list: p.map((e) => e.id).join(", ") })) : null,
				n.restartRequired ? o("p", { class: "as-dep-sub" }, E("deps.restartNote")) : null
			],
			cancel: f.length ? E("action.close") : E("action.cancel"),
			confirm: f.length ? null : {
				label: E(S ? "action.installAnyway" : "action.install"),
				primary: !S,
				danger: S,
				get value() {
					return {
						root: {
							grant: l,
							allowUnsigned: !i
						},
						steps: x()
					};
				}
			}
		});
	}
	async function Me(e) {
		y && await F({
			title: E("restart.askTitle"),
			glyph: "restart",
			height: 230,
			body: [o("p", { class: "as-dialog-lead" }, E("restart.askLead", { name: e })), o("p", {}, E("restart.askHint"))],
			confirm: {
				label: E("action.restartNow"),
				primary: !0,
				value: !0
			},
			cancel: E("action.later")
		}) && H();
	}
	async function Ne(e) {
		if (b.busy) return null;
		b.busy = "plan", $();
		try {
			return await e();
		} catch (e) {
			return m(e.message, { timeout: 7e3 }), null;
		} finally {
			b.busy = null, $();
		}
	}
	async function Pe(e) {
		try {
			return await L.plan(e);
		} catch (e) {
			return m(e.message, { timeout: 7e3 }), null;
		}
	}
	async function Fe(e) {
		y && await F({
			title: E("restart.askTitle"),
			glyph: "restart",
			height: 210,
			body: [o("p", { class: "as-dialog-lead" }, E("restart.askRemovedLead", { name: e })), o("p", {}, E("restart.askHint"))],
			confirm: {
				label: E("action.restartNow"),
				primary: !0,
				value: !0
			},
			cancel: E("action.later")
		}) && H();
	}
	async function Ie(e) {
		let { repo: t, entry: n } = e, r = {
			type: "git",
			url: t.url,
			path: n.path,
			ref: b.catalogs.get(t.id)?.ref
		}, a = e.kind === "module";
		if (L) {
			let n = { install: {
				kind: e.kind,
				source: r
			} }, i = await Ne(() => Pe(n));
			if (!i) return;
			if (i.steps.length || i.problems.length) {
				let r = await je({
					title: E("confirm.installTitle", { name: e.name }),
					name: e.name,
					plan: i,
					official: t.official,
					kernelModule: a,
					permissions: e.manifest?.permissions,
					rootDeps: e.shown?.dependencies
				});
				if (!r) return;
				(await S("install", () => L.install(n, r), (t) => E("deps.installed", {
					name: e.name,
					n: t.installed.length
				})))?.restartRequired && Me(e.name);
				return;
			}
		}
		if (a) {
			let n = await I({
				title: E("confirm.installTitle", { name: e.name }),
				name: e.name,
				official: t.official,
				kernelModule: !0
			});
			if (!n) return;
			(await S("install", () => l.install(r, { allowUnsigned: n.allowUnsigned }), E("done.moduleInstalled", { name: e.name })))?.restartRequired && L && Me(e.name);
			return;
		}
		let o = await I({
			title: E("confirm.installTitle", { name: e.name }),
			name: e.name,
			permissions: e.manifest.permissions,
			official: t.official
		});
		o && S("install", () => i.install(r, o), E("done.appInstalled", { name: e.name }));
	}
	async function Le(e) {
		let t = !!e.repo?.official;
		if (L && (e.kind === "app" || e.kind === "module")) {
			let n = { update: {
				kind: e.kind,
				id: e.id
			} }, r = await Pe(n);
			if (!r) return null;
			if (r.steps.length || r.problems.length) {
				let i = await je({
					title: E("confirm.updateTitle", { name: e.name }),
					name: e.name,
					plan: r,
					official: t,
					kernelModule: e.kind === "module",
					permissions: r.root.permissions,
					rootDeps: e.entry?.locales ? R(r.root.manifest ?? e.manifest, e.entry.locales).dependencies : null
				});
				return i && {
					plan: n,
					answers: i
				};
			}
		}
		if (e.kind === "module") return t || await I({
			title: E("confirm.updateTitle", { name: e.name }),
			name: e.name,
			official: t,
			kernelModule: !0
		}) ? { allowUnsigned: !t } : null;
		let n = j(e.entry?.manifest.permissions).filter((t) => !e.have.granted.includes(t));
		return !n.length && t ? {
			grant: [],
			allowUnsigned: !1
		} : I({
			title: E("confirm.updateTitle", { name: e.name }),
			name: e.name,
			permissions: n,
			official: t
		});
	}
	let V = (e, t) => t.plan ? L.install(t.plan, t.answers).then((e) => ({
		...e.result,
		restartRequired: e.restartRequired
	})) : e.kind === "module" ? l.update(e.id, t) : i.update(e.id, t);
	async function Re(e, { reinstall: t = !1 } = {}) {
		if (!g.updateApps) {
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
		let n = await g.updateApps(e.map(({ item: e, run: t }) => ({
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
	async function ze(e, t, n) {
		let [r] = await Re([{
			item: e,
			run: t
		}], n) ?? [null];
		if (r?.error) throw r.error;
		return r ? r.result : null;
	}
	async function Be(e) {
		let t = e.kind === "module", n = e.name;
		(await S("update", async () => {
			let n = await Le(e);
			return n ? t ? V(e, n) : ze(e, () => V(e, n)) : null;
		}, (e) => e ? e.unchanged ? E(t ? "done.moduleUpToDate" : "done.appUpToDate", { name: n }) : E(t ? "done.moduleUpdated" : "done.appUpdated", {
			name: n,
			version: e.version
		}) : null))?.restartRequired && !t && Me(n);
	}
	function Ve(e) {
		S("update", async () => {
			let t = 0, n = [], r = e.find((e) => e.kind === "system");
			for (let i of e) {
				if (i === r) continue;
				let e = await Le(i);
				if (e) {
					if (i.kind !== "module") n.push({
						item: i,
						run: () => V(i, e)
					});
					else try {
						await V(i, e), t++;
					} catch (e) {
						m(`${i.name}: ${e.message}`, { timeout: 7e3 });
					}
				}
			}
			for (let e of n.length && await Re(n) || []) e.error ? m(`${e.item.name}: ${e.error.message}`, { timeout: 7e3 }) : t++;
			if (r && await qe(r)) try {
				(await D.update()).unchanged || t++;
			} catch (e) {
				m(`${r.name}: ${e.message}`, { timeout: 7e3 });
			}
			return t;
		}, (e) => E("done.updatedCount", { n: e }));
	}
	function He(e, t) {
		let n = e.kind === "module", r = new Set(t.map((e) => e.key));
		return F({
			title: E(n ? "confirm.removeTitle" : "confirm.uninstallTitle", { name: e.name }),
			glyph: "trash",
			width: t.length ? 480 : 440,
			height: Math.min(560, 230 + (t.length ? 60 + t.length * 52 : 0)),
			body: [
				o("p", { class: "as-dialog-lead" }, E(n ? "confirm.removeModule" : "confirm.uninstall", { name: e.name })),
				n ? null : o("p", {}, E("confirm.uninstallFiles")),
				t.length ? o("h3", { class: "as-dep-title" }, E("deps.unneededTitle")) : null,
				t.length ? o("p", { class: "as-dep-sub" }, E("deps.unneededHint")) : null,
				t.length ? o("ul", { class: "as-deps" }, ...t.map((e) => {
					let t = e.kind === "app" ? Oe(e.id) : e.name, n = o("input", {
						type: "checkbox",
						"aria-label": E("deps.alsoRemove", { name: t })
					});
					return n.checked = !0, n.addEventListener("change", () => n.checked ? r.add(e.key) : r.delete(e.key)), o("li", { class: "as-dep" }, n, o("div", { class: "as-dep-text" }, o("b", {}, t, " ", o("span", { class: "as-dep-action" }, e.version)), o("span", { class: "as-dep-sub" }, B(e.kind))));
				})) : null
			],
			confirm: {
				label: E(n ? "action.remove" : "action.uninstall"),
				danger: !0,
				get value() {
					return { also: [...r] };
				}
			}
		});
	}
	async function Ue(e) {
		let t = e.name, n = e.kind === "module";
		if (L) {
			let r = await Ne(() => L.removal(e.kind, e.id));
			if (!r) return;
			if (r.blockedBy.length) {
				let e = r.blockedBy.map((e) => e.kind === "app" ? Oe(e.id) : e.name).join(", ");
				await F({
					title: E(n ? "confirm.removeTitle" : "confirm.uninstallTitle", { name: t }),
					glyph: "info",
					height: 220,
					body: [o("p", { class: "as-dialog-lead" }, E("deps.blocked", {
						name: t,
						list: e
					})), o("p", {}, E("deps.blockedHint", { n: r.blockedBy.length }))],
					confirm: null,
					cancel: E("action.close")
				});
				return;
			}
			if (!n || r.unneeded.length) {
				let i = await He(e, r.unneeded);
				if (!i) return;
				(await S("remove", () => L.remove(e.kind, e.id, i), (e) => e.removed.length > 1 ? E(n ? "deps.moduleRemovedWith" : "deps.appRemovedWith", {
					name: t,
					n: e.removed.length - 1
				}) : E(n ? "done.moduleRemoved" : "done.appRemoved", { name: t })))?.restartRequired && Fe(t);
				return;
			}
		}
		n ? S("remove", () => l.remove(e.id), (e) => e.kept.length ? E("done.moduleRemovedDataKept", { name: t }) : E("done.moduleRemoved", { name: t })) : await Ee(e) && S("remove", () => i.uninstall(e.id), E("done.appRemoved", { name: t }));
	}
	let We = (e) => y && e.kind === "app" && e.here && !e.required, Ge = (e) => S("reinstall", () => ze(e, () => i.update(e.id, {
		reinstall: !0,
		allowUnsigned: !e.verified
	}), { reinstall: !0 }), (t) => t ? E("done.appReinstalled", { name: e.name }) : null);
	async function Ke(e, t) {
		t.disabled = !0, t.setAttribute("aria-busy", "true");
		try {
			let t = await u.readme(e.repo.id, e.entry.path), n = a.children(a.root).find((e) => e.type === "folder" && e.system && e.name === "Download");
			if (!n) throw Error(E("error.noDownloadFolder"));
			let r = a.create(n.id, {
				type: "file",
				name: `${e.name} - README.md`
			});
			await a.write(r.id, t), m(E("readme.saved", { file: r.name }), { timeout: 6e3 });
		} catch (e) {
			m(e.message, { timeout: 7e3 });
		} finally {
			t.disabled = !1, t.removeAttribute("aria-busy");
		}
	}
	let qe = (e) => F({
		title: E("system.confirmTitle", { version: e.update }),
		glyph: "download",
		height: 290,
		body: [
			o("p", { class: "as-dialog-lead" }, E("system.confirmLead", {
				version: e.update,
				current: e.installed
			})),
			o("p", {}, E("system.confirmRestart")),
			o("p", {}, E("system.confirmRollback", { current: e.installed }))
		],
		confirm: {
			label: E("action.update"),
			primary: !0,
			value: !0
		}
	});
	async function Je(e) {
		await qe(e) && S("update", () => D.update(), (e) => e.unchanged ? E("system.upToDate") : E("system.ready", { version: e.version }));
	}
	let Ye = (e) => S("system", () => D.use(e), (t) => t.restartRequired ? E("system.ready", { version: e }) : E("system.nextCancelled"));
	async function Xe(e) {
		await F({
			title: E("system.removeTitle", { version: e }),
			glyph: "trash",
			height: 210,
			body: [o("p", { class: "as-dialog-lead" }, E("system.removeLead", { version: e }))],
			confirm: {
				label: E("action.delete"),
				danger: !0,
				value: !0
			}
		}) && S("system", () => D.remove(e), E("system.removed", { version: e }));
	}
	async function Ze(e, t) {
		t.disabled = !0, t.setAttribute("aria-busy", "true");
		try {
			let t = await u.readme(e.repo.id, e.entry.path, "CHANGELOG.md"), n = a.children(a.root).find((e) => e.type === "folder" && e.system && e.name === "Download");
			if (!n) throw Error(E("error.noDownloadFolder"));
			let r = a.create(n.id, {
				type: "file",
				name: "lilOS - CHANGELOG.md"
			});
			await a.write(r.id, t), m(E("readme.saved", { file: r.name }), { timeout: 6e3 });
		} catch (e) {
			m(e.message, { timeout: 7e3 });
		} finally {
			t.disabled = !1, t.removeAttribute("aria-busy");
		}
	}
	let H = () => S("restart", async () => {
		let e = Te();
		await l.restart(), await new Promise((e) => setTimeout(e, 2500)), e && g.requestRestart?.(E("restart.kernelReason"), "kernel-modules");
	}, E("done.kernelRestarted")), U = (e, t, { key: r = "", ...i } = {}) => {
		let a = `${e}|${r}`, o = n({
			label: e,
			onClick: () => (b.pressed = a, t()),
			...i
		});
		return o.disabled = !!b.busy, b.busy && b.pressed === a && o.setAttribute("aria-busy", "true"), o;
	}, W = (e, t = !1) => o("span", { class: "as-state" }, t ? s("check") : null, e), Qe = (e) => e.repo ? o("span", {
		class: "as-repo",
		title: e.repo.url
	}, s("link"), o("span", {}, A(e.repo))) : o("span", { class: "as-repo" }, s("folder"), o("span", {}, e.kind === "module" ? E("repo.manual") : E("repo.localFolder"))), $e = (e) => e.repo && !e.repo.official ? o("span", { class: "as-unofficial" }, E("repo.unofficial")) : null, et = (e) => e.kind === "system" ? E("system.inUse") : e.kind === "module" ? E("status.installedModule") : E("status.installedApp"), G = (e, ...t) => o("div", { class: "as-section-title" }, e, ...t), K = (e, t) => o("div", { class: "as-fact" }, o("b", {}, e), String(t)), tt = (e) => o("button", {
		class: "as-back",
		onclick: () => Q("list")
	}, s("arrowLeft"), e);
	function nt(e) {
		return e.kind === "system" ? e.update ? y ? U(E("action.update"), () => Je(e), {
			primary: !0,
			key: e.key
		}) : W(E("status.updateAvailable", { version: e.update })) : P() ? W(E("system.nextShort", { version: P() })) : W(E("system.inUse"), !0) : e.update ? y ? U(E("action.update"), () => Be(e), {
			primary: !0,
			key: e.key
		}) : W(E("status.updateAvailable", { version: e.update })) : e.here ? W(e.kind === "module" && !e.have.enabled ? E("status.removed") : et(e), !0) : e.elsewhere ? W(E("status.otherRepo")) : y ? U(E("action.install"), () => Ie(e), { key: e.key }) : W(E("status.available"));
	}
	function rt(e, { uninstall: t = !1 } = {}) {
		let n = e.update ? `${e.installed} → ${e.update}` : e.here ? e.installed : e.offered, i = t && We(e) ? U(E("action.uninstall"), () => Ue(e), {
			danger: !0,
			key: e.key
		}) : null;
		return o("div", { class: "as-card" }, o("div", { class: "as-card-top" }, r(e.icon), o("div", { class: "as-card-head" }, o("button", {
			class: "as-card-open",
			onclick: () => Q("detail", e.key)
		}, e.name, o("span", { class: "as-ver" }, n)), o("div", { class: "as-card-desc" }, e.description))), o("div", { class: "as-card-foot" }, Qe(e), $e(e), o("span", { class: "as-spacer" }), i && !e.update ? null : nt(e), i));
	}
	let q = (e, t) => o("div", { class: "as-grid" }, ...e.map((e) => rt(e, t)));
	function J() {
		let e = [];
		P() && [
			"installed",
			"updates",
			"system"
		].includes(b.tab) && e.push(o("div", { class: "as-banner" }, s("info"), o("span", {}, E("banner.systemRestart", { version: P() })), U(E("action.restartKernel"), H, {
			primary: !0,
			key: "system"
		}))), Te() && [
			"installed",
			"updates",
			"kernel"
		].includes(b.tab) && e.push(o("div", { class: "as-banner" }, s("info"), o("span", {}, E("banner.restartNeeded")), U(E("action.restartKernel"), H, { primary: !0 })));
		let t = _e().filter((e) => b.errors.has(e.id));
		t.length && e.push(o("div", { class: "as-banner" }, s("info"), o("span", {}, t.length === 1 ? E("banner.repoUnreachable", { name: A(t[0]) }) : E("banner.reposUnreachable", { n: t.length })), o("button", {
			class: "as-link",
			onclick: () => Q("options")
		}, E("action.details"))));
		let n = b.repos.filter((e) => !N(e));
		return n.length && b.tab !== "installed" && e.push(o("div", { class: "as-banner" }, s("info"), o("span", {}, n.some((e) => e.official) ? E("banner.officialDisabled") : E("banner.reposDisabled", { n: n.length })), o("button", {
			class: "as-link",
			onclick: () => Q("options")
		}, E("options.title")))), e;
	}
	function it(e, t) {
		let n = (b.query[t.id] ?? "").trim().toLowerCase(), r = e.filter(t.filter).filter((e) => we(e, n));
		if (Z.textContent = b.loading ? E("list.reading") : `${E("list.items", { n: r.length })} · ${E("list.repos", { n: _e().length })}`, !r.length) {
			let e = b.loading && t.id !== "installed" ? E("list.reading") : n ? E("list.noResults", {
				query: n,
				tab: t.label
			}) : t.id === "updates" ? E("list.upToDate") : t.id === "installed" ? E("list.nothingInstalled") : E("list.emptyCategory");
			return [...J(), o("div", { class: "as-empty" }, e)];
		}
		if (t.id === "installed") {
			let e = r.filter((e) => e.kind === "app"), t = r.filter((e) => e.kind === "module"), n = r.filter((e) => e.kind === "system");
			return [
				...J(),
				n.length ? [G("lilOS"), q(n)] : null,
				e.length ? [G(E("list.apps")), q(e, { uninstall: !0 })] : null,
				t.length ? [G(E("list.modules")), q(t)] : null
			];
		}
		if (t.id === "updates") return [
			...J(),
			G(E("list.updates", { n: r.length }), y && r.length > 1 ? o("span", { class: "as-bulk" }, U(E("action.updateAll"), () => Ve(r), { primary: !0 })) : null),
			q(r)
		];
		let i = (e) => Number(e.here || e.elsewhere);
		return [...J(), q([...r].sort((e, t) => i(e) - i(t) || e.name.localeCompare(t.name)))];
	}
	function at(e, t) {
		let n = e.have, i = n.mode === "installed", a = P(), c = [];
		y && e.update && c.push(U(E("action.updateTo", { version: e.update }), () => Je(e), {
			primary: !0,
			key: e.key
		}));
		let l = y && i ? (n.releases ?? []).filter((e) => e !== n.version) : [], u = (e) => o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, `lilOS ${e}`), o("span", {}, e === a ? E("system.next", { version: e }) : e === n.failed?.version ? E("system.keptFailed") : E("system.keptHint"))), e === a ? U(E("system.cancelNext"), () => Ye(n.version), { key: e }) : U(E("system.use"), () => Ye(e), { key: e }), e === a ? null : U(E("action.delete"), () => Xe(e), {
			danger: !0,
			key: e
		}));
		return Z.textContent = `lilOS ${n.version}`, o("div", { class: "as-detail" }, tt(t.label), o("div", { class: "as-detail-head" }, r(e.icon), o("div", { class: "as-detail-title" }, o("h1", {}, "lilOS"), o("div", { class: "as-sub" }, E("detail.kindSystem")), o("div", { class: "as-meta" }, Qe(e), o("span", { class: "as-state" }, s("shield"), E("detail.verified")), o("span", { class: "as-state" }, E("detail.required"))), c.length ? o("div", { class: "as-detail-actions" }, ...c) : null)), a ? o("div", { class: "as-banner" }, s("info"), o("span", {}, E("banner.systemRestart", { version: a })), U(E("action.restartKernel"), H, {
			primary: !0,
			key: "system"
		})) : null, y && n.failed ? o("div", { class: "as-banner" }, s("warning"), o("span", {}, E("system.failed", {
			version: n.failed.version,
			reason: n.failed.reason,
			current: n.version
		}))) : null, i ? null : o("div", { class: "as-banner" }, s("info"), o("span", {}, E("system.development"))), o("div", { class: "as-facts" }, K(E("system.inUse"), n.version), K(E("detail.version"), e.offered ?? "—"), K(E("detail.repository"), e.repo ? A(e.repo) : "—"), K(E("detail.state"), a ? E("system.next", { version: a }) : E(i ? "system.installedMode" : "system.developmentMode"))), l.length ? [G(E("system.kept")), o("div", { class: "as-group" }, ...l.map(u))] : null, o("div", { class: "as-perm" }, o("h3", {}, s("info"), E("detail.warning")), o("p", {}, E("system.warning"))), e.changelog ? [o("div", { class: "as-readme-title" }, s("file"), "CHANGELOG.md"), o("article", { class: "as-readme" }, ...w(e.changelog))] : null, e.changelog && e.changelogTruncated ? o("p", { class: "as-readme-cut" }, E("readme.truncated"), " ", o("button", {
			class: "as-link",
			onclick: (t) => Ze(e, t.currentTarget)
		}, s("download"), E("readme.download"))) : null, o("div", { class: "as-readme-title" }, s("file"), "README.md"), e.readme ? o("article", { class: "as-readme" }, ...w(e.readme)) : o("p", { class: "as-muted" }, e.repo ? E("readme.none") : E("readme.notFromRepo")), e.readme && e.readmeTruncated ? o("p", { class: "as-readme-cut" }, E("readme.truncated"), " ", o("button", {
			class: "as-link",
			onclick: (t) => Ke(e, t.currentTarget)
		}, s("download"), E("readme.download"))) : null);
	}
	function ot(e, t) {
		if (e.kind === "system") return at(e, t);
		let n = e.kind === "module", a = [];
		e.here && !n && a.push(U(E("action.open"), () => ee(e.id), { primary: !e.update || !y })), y && (e.update && a.push(U(E("action.updateTo", { version: e.update }), () => Be(e), {
			primary: !0,
			key: e.key
		})), e.here && (!n || e.have.enabled) && (!e.update && e.have.source && a.push(U(E("action.checkUpdates"), () => Be(e), { key: e.key })), n || a.push(U(E("action.reinstall"), () => Ge(e), { key: e.key })), e.required || a.push(U(E(n ? "action.remove" : "action.uninstall"), () => Ue(e), {
			danger: !0,
			key: e.key
		}))), !e.here && !e.elsewhere && e.entry && a.push(U(e.repo.official ? E("action.install") : E("action.installAnyway"), () => Ie(e), {
			primary: !0,
			danger: !e.repo.official,
			key: e.key
		})));
		let c = n && e.have ? e.have.enabled ? e.have.running === e.have.enabled ? E("moduleState.inUse") : e.have.running ? E("moduleState.oldUntilRestart", { version: e.have.running }) : E("moduleState.nextStart") : E("moduleState.removed") : null, l = j(e.manifest?.permissions), u = (n ? e.module?.dependencies : e.shown?.dependencies ?? e.manifest?.dependencies) ?? [], d = e.here && !n ? i.get(e.id)?.unmet ?? [] : [];
		return Z.textContent = `${e.name} ${e.offered ?? e.installed}`, o("div", { class: "as-detail" }, tt(t.label), o("div", { class: "as-detail-head" }, r(e.icon), o("div", { class: "as-detail-title" }, o("h1", {}, e.name), o("div", { class: "as-sub" }, [
			e.publisher,
			E(n ? "detail.kindModule" : "detail.kindApp"),
			ne().find((t) => t.id === e.category)?.label
		].filter(Boolean).join(" · ")), o("div", { class: "as-meta" }, Qe(e), e.verified ? o("span", { class: "as-state" }, s("shield"), E("detail.verified")) : e.repo ? o("span", { class: "as-unofficial" }, E("detail.unverified")) : null, e.required ? o("span", { class: "as-state" }, E("detail.required")) : null, e.elsewhere ? o("span", { class: "as-state" }, E(n ? "status.installedElsewhereModule" : "status.installedElsewhereApp")) : null), a.length ? o("div", { class: "as-detail-actions" }, ...a) : null)), e.repo && !e.repo.official && !e.here ? o("div", { class: "as-banner" }, s("info"), o("span", {}, E("detail.unofficialWarning"))) : null, d.length ? o("div", { class: "as-banner" }, s("warning"), o("span", {}, d.every((e) => e.why === "restart") ? E("deps.unmetRestart", {
			name: e.name,
			list: d.map((e) => e.id).join(", ")
		}) : E("deps.unmetMissing", {
			name: e.name,
			list: d.map((e) => e.id).join(", ")
		})), y && d.some((e) => e.why === "restart") ? U(E("action.restartKernel"), H, {
			primary: !0,
			key: "unmet"
		}) : null) : null, o("div", { class: "as-facts" }, K(E("detail.version"), e.offered ?? e.installed), K(et(e), e.installed ?? "—"), K(E("detail.repository"), e.repo ? A(e.repo) : "—"), n ? K(E("detail.provides"), e.provides.join(", ") || "—") : K(E("detail.id"), e.id), c ? K(E("detail.state"), c) : null), n ? o("div", { class: "as-perm" }, o("h3", {}, s("info"), E("detail.warning")), o("p", {}, E("detail.moduleWarning"))) : o("div", { class: "as-perm" }, o("h3", {}, s("shield"), E("detail.mayDo")), l.length ? o("ul", {}, ...l.map((e) => o("li", {}, s("check"), _(e)))) : o("p", { class: "as-muted" }, E("permissions.none"))), u.length ? st(u) : null, o("div", { class: "as-readme-title" }, s("file"), "README.md"), e.readme ? o("article", { class: "as-readme" }, ...w(e.readme)) : null, e.readme && e.readmeTruncated ? o("p", { class: "as-readme-cut" }, E("readme.truncated"), " ", o("button", {
			class: "as-link",
			onclick: (t) => Ke(e, t.currentTarget)
		}, s("download"), E("readme.download"))) : null, e.readme ? null : o("p", { class: "as-muted" }, e.repo ? E("readme.none") : E("readme.notFromRepo")));
	}
	function st(e) {
		let t = (e) => {
			if (e.app !== void 0) {
				let t = i.get(e.app);
				return t ? {
					ok: !0,
					text: E("deps.stateInstalled", { version: t.version })
				} : {
					ok: !1,
					text: E("deps.stateMissing")
				};
			}
			if (!y) return null;
			let t = b.modules.find((t) => t.name === e.module && t.enabled);
			return t ? {
				ok: !0,
				text: t.running === t.enabled ? E("deps.stateInstalled", { version: t.enabled }) : E("deps.stateRestart")
			} : {
				ok: !1,
				text: E("deps.stateMissing")
			};
		};
		return o("div", { class: "as-perm" }, o("h3", {}, s("link"), E("deps.title")), o("ul", {}, ...e.map((e) => {
			let n = t(e);
			return o("li", {}, s(n && !n.ok ? "info" : "check"), o("span", {}, o("b", {}, e.app === void 0 ? e.module : Oe(e.app)), e.version ? ` ${e.version}` : "", ` · ${B(e.module === void 0 ? "app" : "module")}`, e.optional ? ` · ${E("deps.optionalTag")}` : "", e.reason ? o("span", { class: "as-muted" }, ` — ${e.reason}`) : null, n ? o("span", { class: "as-muted" }, ` (${n.text})`) : null));
		})));
	}
	function ct() {
		let e = b.updateTask, t = pe(e) ?? "daily", n = h({
			value: !!e?.enabled,
			label: E("updates.check"),
			onChange: (e) => me({ on: e })
		}), r = [
			{
				value: "daily",
				label: E("updates.daily")
			},
			{
				value: "weekly",
				label: E("updates.weekly")
			},
			...t === "other" ? [{
				value: "other",
				label: E("updates.other")
			}] : []
		], i = o("select", {
			class: "ctl-select",
			"aria-label": E("updates.when")
		}, r.map((e) => o("option", {
			value: e.value,
			selected: e.value === t
		}, e.label)));
		i.disabled = !e?.enabled, i.addEventListener("change", () => {
			i.value !== "other" && me({ every: i.value });
		});
		let a = o("button", {
			class: "as-link",
			type: "button",
			style: "background:none;border:0;padding:0;cursor:pointer;width:max-content",
			onclick: () => ee("scheduler", { task: e?.id }, "main")
		}, E("updates.inScheduler"));
		return o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, E("updates.check")), o("span", {}, E("updates.taskHint")), e ? a : null), i, n);
	}
	function lt() {
		if (T && b.updates) return ct();
		let e = b.updates, t = !e || e.system && !e.canControl, n = e ? e.system ? E("updates.bySystem") : E("updates.description") : E("updates.needsEngine"), r = h({
			value: !!e && e.startup !== "none",
			label: E("updates.atStart"),
			onChange: he
		});
		return r.disabled = t, o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, E("updates.atStart")), o("span", {}, n)), r);
	}
	function ut(e) {
		let t = b.newRepo;
		return Z.textContent = E("options.title"), o("div", { class: "as-options" }, tt(e.label), o("h2", {}, E("options.title")), o("p", { class: "as-lead" }, E("options.lead")), G("AppStore"), o("div", { class: "as-group" }, o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, E("options.showUnofficial")), o("span", {}, E("options.showUnofficialHint"))), h({
			value: d.get("appstore.showUnofficial"),
			label: E("options.showUnofficial"),
			onChange: (e) => d.set("appstore.showUnofficial", e)
		})), lt()), G(E("options.repositories"), o("span", { class: "as-bulk" }, U(E("action.reload"), () => M()))), o("div", { class: "as-group" }, ...b.repos.map((e) => {
			let t = N(e), n = b.catalogs.get(e.id), i = (e) => (e ?? []).filter((e) => !e.error).length, a = [...n?.apps ?? [], ...n?.modules ?? []].filter((e) => e.error), s = t ? b.errors.has(e.id) ? E("options.unreachable", { error: b.errors.get(e.id) }) : n ? [
				E("options.apps", { n: i(n.apps) }),
				E("options.modules", { n: i(n.modules) }),
				a.length ? E("options.invalid", { n: a.length }) : null
			].filter(Boolean).join(" · ") : E("options.reading") : E("options.disabled");
			return o("div", { class: t ? "as-row" : "as-row as-row-off" }, r(e.official ? {
				glyph: "shield",
				color: "#30a46c"
			} : {
				glyph: "link",
				color: "#8a909b"
			}), o("div", { class: "as-row-text" }, o("b", {}, A(e), o("span", { class: "as-muted" }, ` · ${e.name}`)), o("span", {}, e.url), o("span", {
				class: t && b.errors.has(e.id) ? "as-error" : null,
				title: t && a.map((e) => `${e.path}: ${e.error}`).join("\n") || null
			}, s)), e.official ? o("span", { class: "as-muted" }, E("options.alwaysThere")) : y ? U(E("action.remove"), () => S("repo", () => u.remove(e.id), E("done.repoRemoved", { name: A(e) })), {
				danger: !0,
				key: e.id
			}) : null, Object.assign(h({
				value: t,
				label: E("options.active", { name: A(e) }),
				onChange: (t) => ve(e, t)
			}), { id: `as-repo-${e.id}` }));
		})), G(E("options.addRepo")), y ? o("div", { class: "as-group" }, o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, E("options.address")), o("span", {}, E("options.addressHint"))), p({
			value: t.url,
			placeholder: "https://…",
			label: E("options.addressLabel"),
			onInput: (e) => {
				t.url = e;
			}
		})), o("div", { class: "as-row" }, o("div", { class: "as-row-text" }, o("b", {}, E("options.name")), o("span", {}, E("options.nameHint"))), p({
			value: t.name,
			placeholder: E("options.name"),
			label: E("options.nameLabel"),
			onInput: (e) => {
				t.name = e;
			}
		})), o("div", { class: "as-row as-row-end" }, U(E("action.add"), () => S("repo", async () => {
			let e = await u.add(t.url.trim(), t.name.trim() || void 0);
			return b.newRepo = {
				url: "",
				name: ""
			}, e;
		}, (e) => E("done.repoAdded", { name: A(e) })), { primary: !0 }))) : o("p", { class: "as-muted" }, E("options.adminOnly")));
	}
	let Y = o("input", {
		type: "search",
		autocomplete: "off",
		spellcheck: "false",
		"aria-label": E("search.label")
	}), X = o("div", {
		class: "as-tabs",
		role: "tablist"
	}), dt = o("main", { class: "as-main" }), Z = o("span", { class: "as-foot-text" });
	x.body.append(o("div", { class: "as-head" }, o("label", { class: "as-search" }, s("search"), Y), X), dt, o("footer", { class: "as-foot" }, Z, o("span", { class: "as-spacer" }), o("button", {
		class: "as-link",
		onclick: () => Q("options")
	}, s("gear"), E("options.title"))));
	function Q(e, t = null) {
		b.view = e, b.key = t, $(), dt.scrollTop = 0;
	}
	function ft(e) {
		b.tab = e, Q("list");
	}
	Y.addEventListener("input", () => {
		b.query[b.tab] = Y.value, b.view = "list", $();
	}), Y.addEventListener("keydown", (e) => {
		e.key === "Escape" && Y.value && (e.stopPropagation(), Y.value = "", Y.dispatchEvent(new Event("input")));
	}), X.addEventListener("keydown", (e) => {
		if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
		let t = [...X.querySelectorAll("[role=tab]")];
		t[(t.indexOf(document.activeElement) + (e.key === "ArrowRight" ? 1 : -1) + t.length) % t.length].click(), X.querySelector("[tabindex=\"0\"]")?.focus();
	});
	function $() {
		let e = Se(), t = Ce(e);
		t.some((e) => e.id === b.tab) || (b.tab = "installed");
		let n = t.find((e) => e.id === b.tab), r = e.filter((e) => e.update).length;
		X.replaceChildren(...t.flatMap((e, n) => [e.category && !t[n - 1].category ? o("span", { class: "as-tab-sep" }) : null, o("button", {
			class: "as-tab",
			role: "tab",
			"aria-selected": String(b.view === "list" && e.id === b.tab),
			tabindex: e.id === b.tab ? "0" : "-1",
			onclick: () => ft(e.id)
		}, e.label, e.badge && r ? o("span", { class: "as-count" }, String(r)) : null)].filter(Boolean))), Y.placeholder = E("search.placeholder", { tab: n.label }), Y.value !== (b.query[b.tab] ?? "") && (Y.value = b.query[b.tab] ?? "");
		let i = b.view === "detail" ? e.find((e) => e.key === b.key) : null;
		b.view === "detail" && !i && (b.view = "list");
		let a = b.view === "options" ? ut(n) : i ? ot(i, n) : it(e, n);
		dt.replaceChildren(...[a].flat(3).filter(Boolean));
	}
	x.on("launch", (e) => {
		let t = {
			apps: "installed",
			modules: "kernel"
		}[e?.tab] ?? e?.tab;
		t === "repos" || t === "options" ? Q("options") : typeof t == "string" && ft(t);
	});
	let pt = i.on("change", () => $()), mt = d.on("change:appstore.showUnofficial", () => $()), ht = g.services?.on("change", (e) => {
		e.app === "appstore" && C().then($);
	});
	return x.on("destroy", () => {
		pt(), mt(), ht?.();
	}), $(), M(), x;
}
export { ue as default };
