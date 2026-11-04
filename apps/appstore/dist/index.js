import * as e from "/host/sdk.js";
import { Window as t, actionButton as n, appIcon as r, apps as i, busyButton as a, fs as o, h as s, icon as c, kernel as l, kernelModules as u, messageBox as d, packages as f, repositories as p, settings as m, storage as h, textField as g, toast as _, toggle as v } from "/host/sdk.js";
import * as y from "/host/system.js";
import { compareVersions as b, describePermission as x, launch as ee, needsGrant as S } from "/host/system.js";
// src/appstore/markdown.js
var te = /(`+)([^`]+?)\1|\*\*(.+?)\*\*|__(.+?)__|\*(?!\s)(.+?)\*|\b_(?!\s)(.+?)_\b|!\[([^\]]*)\]\([^)]*\)|\[([^\]]+)\]\(\s*<?((?:[^()\s<>]|\([^()\s]*\))+)>?(?:\s+"[^"]*")?\s*\)|<(https?:\/\/[^>\s]+)>/;
function C(e) {
	let t = [], n = e;
	for (; n;) {
		let e = te.exec(n);
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
function k(t, n) {
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
var { t: A } = k("appstore", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"AppStore\",\"@description\":\"Installs, updates and removes apps and kernel modules from repositories; checks for updates even with lilOS closed.\",\"@entrypoints.updates.label\":\"Updates\",\"@entrypoints.updates.params.ore.label\":\"Check every (hours)\",\"category.system\":\"System\",\"category.productivity\":\"Productivity\",\"category.media\":\"Media\",\"category.development\":\"Development\",\"category.other\":\"Other\",\"category.kernel\":\"Kernel\",\"tab.installed\":\"Installed\",\"tab.updates\":\"Updates\",\"tab.languages\":\"Languages\",\"search.label\":\"Search\",\"search.placeholder\":\"Search in {tab}\",\"action.install\":\"Install\",\"action.installAnyway\":\"Install anyway\",\"action.installName\":\"Install {name}\",\"action.update\":\"Update\",\"action.updateTo\":\"Update to {version}\",\"action.updateAll\":\"Update all\",\"action.checkUpdates\":\"Check for updates\",\"action.open\":\"Open\",\"action.reinstall\":\"Reinstall\",\"action.remove\":\"Remove\",\"action.uninstall\":\"Uninstall\",\"action.restartKernel\":\"Restart the kernel\",\"action.details\":\"Details\",\"action.reload\":\"Reload\",\"action.add\":\"Add\",\"confirm.installTitle\":\"Install {name}\",\"confirm.updateTitle\":\"Update {name}\",\"confirm.uninstallTitle\":\"Uninstall {name}\",\"confirm.uninstall\":\"{name} will be removed for every user, with its settings and its data.\",\"confirm.uninstallFiles\":\"The files it had created are deleted, or go to the Trash if someone changed them. Your other files stay where they are.\",\"confirm.kernelModule\":\"{name} is a kernel module: its code will run in the kernel, with full access to users and files.\",\"confirm.replaces\":\"{name} takes the place of {names}: their settings and connections move to it, and they are removed.\",\"confirm.mayDo\":\"{name} will be able to:\",\"confirm.unverified\":\"Not verified: it comes from an unofficial repository. There is no way to know who wrote it, or that its code has not been changed. Install it only if you trust whoever distributes it.\",\"permissions.none\":\"No permissions beyond its own data.\",\"done.appInstalled\":\"{name} installed\",\"done.moduleInstalled\":\"{name} installed: restart the kernel to use it\",\"done.moduleReplaced\":\"It takes the place of {names}, with their settings.\",\"done.appUpToDate\":\"{name} is already up to date\",\"done.moduleUpToDate\":\"{name} is already up to date\",\"done.appUpdated\":\"{name} updated to {version}\",\"done.moduleUpdated\":\"{name} {version} installed: restart the kernel\",\"done.updatedCount\":{\"one\":\"{n} item updated\",\"other\":\"{n} items updated\"},\"done.appRemoved\":\"{name} uninstalled\",\"done.moduleRemoved\":\"{name} removed: restart the kernel\",\"done.moduleRemovedDataKept\":\"{name} removed (its data is kept): restart the kernel\",\"done.appReinstalled\":\"{name} reinstalled\",\"done.kernelRestarted\":\"Kernel restarted\",\"restart.kernelReason\":\"The kernel started again with other modules\",\"done.repoRemoved\":\"{name} removed\",\"done.repoAdded\":\"{name} added\",\"updates.atStart\":\"Check for updates at startup\",\"updates.atStartOn\":\"The AppStore will check for updates when you sign in\",\"updates.atStartOff\":\"Checking for updates at startup turned off\",\"updates.needsEngine\":\"Needs the kernel’s service engine (the services-isolate module)\",\"updates.bySystem\":\"Chosen by an administrator for everyone: change it in Control Panel → Startup → Services\",\"updates.description\":\"When you sign in and then at intervals (every 24 hours, change it in Control Panel → Startup → Services), even with lilOS closed: a notification tells you what can be updated\",\"updates.check\":\"Check for updates\",\"updates.taskHint\":\"An operation of the Scheduler, also with lilOS closed: a notification tells you what can be updated\",\"updates.when\":\"How often\",\"updates.daily\":\"Every day at 09:00\",\"updates.weekly\":\"Every Monday at 09:00\",\"updates.other\":\"As in the Scheduler\",\"updates.inScheduler\":\"Change it in the Scheduler\",\"updates.taskName\":\"Check for updates\",\"service.found\":{\"one\":\"1 update available\",\"other\":\"{n} updates available\"},\"notify.updates\":{\"one\":\"Update available: {names}. Open the AppStore.\",\"other\":\"{n} updates available: {names}. Open the AppStore.\"},\"readme.saved\":\"README saved in Download as “{file}”\",\"readme.truncated\":\"The README is too long: only its beginning is shown here.\",\"readme.download\":\"Download the full README\",\"readme.none\":\"This package has no README.\",\"readme.notFromRepo\":\"The README is read from the repository: this item does not come from a listed repository.\",\"error.noDownloadFolder\":\"The Download folder is missing\",\"status.available\":\"Available\",\"status.updateAvailable\":\"Update {version}\",\"status.removed\":\"Removed\",\"status.replacedBy\":\"Replaced by {name}\",\"status.otherRepo\":\"From another repository\",\"status.installedApp\":\"Installed\",\"status.installedModule\":\"Installed\",\"status.installedElsewhereApp\":\"Installed from another repository\",\"status.installedElsewhereModule\":\"Installed from another repository\",\"status.installedLanguage\":\"Installed\",\"repo.manual\":\"Installed manually\",\"repo.localFolder\":\"Local folder\",\"repo.unofficial\":\"unofficial\",\"banner.restartNeeded\":\"Changes to modules take effect from the next kernel start.\",\"banner.repoUnreachable\":\"{name} is unreachable: what it offers is not listed.\",\"banner.reposUnreachable\":{\"one\":\"{n} repository is unreachable: what it offers is not listed.\",\"other\":\"{n} repositories are unreachable: what they offer is not listed.\"},\"banner.reposDisabled\":{\"one\":\"{n} repository is off: what it offers is not listed.\",\"other\":\"{n} repositories are off: what they offer is not listed.\"},\"banner.officialDisabled\":\"The official repository is off: its apps and the updates of lilOS and of its apps are not listed.\",\"list.reading\":\"Reading the repositories…\",\"list.items\":{\"one\":\"{n} item\",\"other\":\"{n} items\"},\"list.repos\":{\"one\":\"{n} repository\",\"other\":\"{n} repositories\"},\"list.noResults\":\"No results for “{query}” in {tab}\",\"list.upToDate\":\"Everything is up to date\",\"list.nothingInstalled\":\"Nothing installed\",\"list.emptyCategory\":\"Nothing in this category\",\"list.apps\":\"Apps\",\"list.modules\":\"Kernel modules\",\"list.updates\":{\"one\":\"{n} update\",\"other\":\"{n} updates\"},\"list.languages\":\"Languages\",\"detail.kindApp\":\"App\",\"detail.kindModule\":\"Kernel module\",\"detail.kindLanguage\":\"Language pack\",\"detail.verified\":\"Verified\",\"detail.unverified\":\"unofficial · not verified\",\"detail.required\":\"Required by lilOS\",\"detail.unofficialWarning\":\"It comes from an unofficial repository: there is no way to know who wrote it, or that its code has not been changed.\",\"detail.version\":\"Version\",\"detail.repository\":\"Repository\",\"detail.provides\":\"Provides\",\"detail.id\":\"ID\",\"detail.state\":\"Status\",\"detail.warning\":\"Warning\",\"detail.moduleWarning\":\"A module’s code runs in the kernel, with full access to users and files. Changes take effect from the next kernel start.\",\"detail.mayDo\":\"Allowed to\",\"moduleState.removed\":\"Removed: active until restart\",\"moduleState.oldUntilRestart\":\"{version} in use until restart\",\"moduleState.nextStart\":\"Active from the next start\",\"moduleState.inUse\":\"In use\",\"languages.lead\":\"Language packs translate lilOS’s own texts: desktop, menus, windows, messages. Any user can install one, and it is there for everyone; each app uses its own translation if it has one, otherwise English.\",\"languages.empty\":\"The official repository offers no language packs\",\"languages.rtl\":\"right to left\",\"languages.installedBy\":\"installed by {name}\",\"languages.inUse\":\"In use\",\"languages.notInstalled\":\"Not installed\",\"languages.updateAvailable\":\"Update available {from} → {to}\",\"languages.use\":\"Use this language\",\"languages.updated\":\"{name} updated to {version}\",\"languages.removed\":\"{name} removed\",\"languages.offerTitle\":\"{name} is installed\",\"languages.offerLead\":\"{name} ({title}) is installed for every user of this lilOS. Use it now for your lilOS?\",\"languages.offerHint\":\"You can change it at any time in Control Panel → Language.\",\"languages.removeTitle\":\"Remove {name}\",\"languages.removeLead\":\"{name} ({title}) will be removed for every user of this lilOS.\",\"languages.removeEnglish\":\"Whoever uses it goes back to English, until they choose another language.\",\"languages.code\":\"Language code\",\"languages.installedByLabel\":\"Installed by\",\"languages.needs\":\"Needs\",\"languages.aboutTitle\":\"Language pack\",\"languages.about\":\"It translates lilOS’s own texts, not apps: each app uses its own translation if it has one, otherwise English. It comes from the official repository.\",\"languages.removeOnly\":\"Only {name}, who installed it, or an administrator can remove it.\",\"languages.removeAdmin\":\"Only an administrator can remove it.\",\"languages.notOffered\":\"The official repository no longer offers this language: its README is not available.\",\"action.delete\":\"Delete\",\"detail.kindSystem\":\"Operating system\",\"banner.systemRestart\":\"lilOS {version} starts with the next restart of the kernel.\",\"system.description\":\"The system itself: desktop, kernel and SDK.\",\"system.inUse\":\"In use\",\"system.nextShort\":\"{version} at restart\",\"system.next\":\"{version} starts with the next restart\",\"system.confirmTitle\":\"Update lilOS to {version}?\",\"system.confirmLead\":\"lilOS {version} is installed next to {current}, the version in use, for every user.\",\"system.confirmRestart\":\"It starts when the kernel restarts: everyone signed in loses the connection for a few seconds, then lilOS loads again.\",\"system.confirmRollback\":\"If it does not start, lilOS goes back to {current} by itself and tells the administrators.\",\"system.upToDate\":\"lilOS is up to date\",\"system.ready\":\"lilOS {version} is ready: it starts with the next restart of the kernel\",\"system.nextCancelled\":\"The change of version has been called off\",\"system.removeTitle\":\"Delete lilOS {version}?\",\"system.removeLead\":\"The files of lilOS {version} are deleted from the disk: you can no longer go back to it. Data and apps are not touched.\",\"system.removed\":\"lilOS {version} deleted\",\"system.failed\":\"lilOS {version} did not start ({reason}): lilOS went back to {current} by itself.\",\"system.development\":\"This lilOS runs from a copy of its repository (development): it is updated with git, not from here.\",\"system.installedMode\":\"Installed\",\"system.developmentMode\":\"Development copy\",\"system.kept\":\"Versions kept on disk\",\"system.keptHint\":\"To go back to it\",\"system.keptFailed\":\"Did not start\",\"system.use\":\"Use this version\",\"system.cancelNext\":\"Call off\",\"system.warning\":\"lilOS is updated for every user. The new version is put next to the one in use and starts with the kernel’s restart; the one before stays on disk until you delete it.\",\"options.title\":\"Options\",\"options.lead\":\"AppStore preferences and the repositories apps and modules come from. Switch a repository off to list only what the active ones offer.\",\"options.showUnofficial\":\"Show unofficial repositories\",\"options.showUnofficialHint\":\"When off, the tabs list only what the official repository offers\",\"options.repositories\":\"Repositories\",\"options.unreachable\":\"Unreachable: {error}\",\"options.apps\":{\"one\":\"{n} app\",\"other\":\"{n} apps\"},\"options.modules\":{\"one\":\"{n} module\",\"other\":\"{n} modules\"},\"options.languages\":{\"one\":\"{n} language\",\"other\":\"{n} languages\"},\"options.invalid\":{\"one\":\"{n} invalid package\",\"other\":\"{n} invalid packages\"},\"options.reading\":\"Reading…\",\"options.alwaysThere\":\"Always present\",\"options.active\":\"{name} active\",\"options.disabled\":\"Off: not read, nothing of it is listed or offered as an update\",\"options.addRepo\":\"Add a repository\",\"options.address\":\"Address\",\"options.addressHint\":\"A git repository with catalog.json, for example https://github.com/name/repo\",\"options.addressLabel\":\"Repository address\",\"options.name\":\"Name\",\"options.nameHint\":\"Optional: otherwise the one in its catalog\",\"options.nameLabel\":\"Repository name\",\"options.adminOnly\":\"Only an administrator can add and remove repositories.\",\"action.close\":\"Close\",\"action.later\":\"Later\",\"action.restartNow\":\"Restart now\",\"confirm.removeTitle\":\"Remove {name}\",\"confirm.removeModule\":\"{name} will stop running in the kernel from its next start.\",\"restart.askTitle\":\"Restart the kernel?\",\"restart.askLead\":\"Installing {name} is done. The kernel modules installed start working after the kernel restarts.\",\"restart.askHint\":\"Restarting takes a few seconds: lilOS reconnects by itself.\",\"restart.askRemovedLead\":\"{name} is removed. The kernel modules removed with it stop after the kernel restarts.\",\"deps.title\":\"Needs\",\"deps.install\":\"installs version {version}\",\"deps.update\":\"updates {from} → {version}\",\"deps.kindModule\":\"Kernel module\",\"deps.kindApp\":\"App\",\"deps.why\":\"Needed by {name}\",\"deps.whyReason\":\"Needed by {name}: {reason}\",\"deps.unverifiedModule\":\"Not verified: its code will run in the kernel with full access.\",\"deps.unverifiedApp\":\"Not verified: from an unofficial repository.\",\"deps.brings\":\"Also installs: {name} ({kind})\",\"deps.tick\":\"Also install {name}\",\"deps.cannot\":\"{name} cannot be installed now:\",\"deps.required\":\"Also installed\",\"deps.optional\":\"Optional: install them too?\",\"deps.unavailable\":\"Not available now: {list}\",\"deps.restartNote\":\"Kernel modules start working after the kernel restarts: you will be asked at the end.\",\"deps.installed\":{\"zero\":\"{name} installed\",\"one\":\"{name} installed, with {n} more package\",\"other\":\"{name} installed, with {n} more packages\"},\"deps.alsoRemove\":\"Also remove {name}\",\"deps.unneededTitle\":\"No longer needed\",\"deps.unneededHint\":\"They were installed only for it and nothing else uses them. The ticked ones are removed too.\",\"deps.blocked\":\"{name} cannot be removed: {list} needs it.\",\"deps.blockedHint\":{\"one\":\"Remove that one first, then this one.\",\"other\":\"Remove those first, then this one.\"},\"deps.appRemovedWith\":{\"one\":\"{name} uninstalled, with {n} more package\",\"other\":\"{name} uninstalled, with {n} more packages\"},\"deps.moduleRemovedWith\":{\"one\":\"{name} removed, with {n} more package\",\"other\":\"{name} removed, with {n} more packages\"},\"deps.unmetRestart\":\"{name} needs {list}, already installed: it works after the kernel restarts.\",\"deps.unmetMissing\":\"{name} is missing {list}: it cannot start until it is installed.\",\"deps.stateInstalled\":\"installed, {version}\",\"deps.stateMissing\":\"missing\",\"deps.stateRestart\":\"after the kernel restarts\",\"deps.optionalTag\":\"optional\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"AppStore\",\"@description\":\"Installa, aggiorna e rimuove app e moduli del kernel dai repository; controlla gli aggiornamenti anche a lilOS chiuso.\",\"@entrypoints.updates.label\":\"Aggiornamenti\",\"@entrypoints.updates.params.ore.label\":\"Controlla ogni (ore)\",\"category.system\":\"Sistema\",\"category.productivity\":\"Produttività\",\"category.media\":\"Multimedia\",\"category.development\":\"Sviluppo\",\"category.other\":\"Altro\",\"category.kernel\":\"Kernel\",\"tab.installed\":\"Installati\",\"tab.updates\":\"Aggiornamenti\",\"tab.languages\":\"Lingue\",\"search.label\":\"Cerca\",\"search.placeholder\":\"Cerca in {tab}\",\"action.install\":\"Installa\",\"action.installAnyway\":\"Installa comunque\",\"action.installName\":\"Installa {name}\",\"action.update\":\"Aggiorna\",\"action.updateTo\":\"Aggiorna a {version}\",\"action.updateAll\":\"Aggiorna tutto\",\"action.checkUpdates\":\"Cerca aggiornamenti\",\"action.open\":\"Apri\",\"action.reinstall\":\"Reinstalla\",\"action.remove\":\"Rimuovi\",\"action.uninstall\":\"Disinstalla\",\"action.restartKernel\":\"Riavvia il kernel\",\"action.details\":\"Dettagli\",\"action.reload\":\"Ricarica\",\"action.add\":\"Aggiungi\",\"confirm.installTitle\":\"Installa {name}\",\"confirm.updateTitle\":\"Aggiorna {name}\",\"confirm.uninstallTitle\":\"Disinstalla {name}\",\"confirm.uninstall\":\"{name} sarà rimossa per tutti gli utenti, con le sue impostazioni e i suoi dati.\",\"confirm.uninstallFiles\":\"I file che aveva creato si eliminano, o vanno nel Cestino se qualcuno li ha modificati. Gli altri tuoi file restano dove sono.\",\"confirm.kernelModule\":\"{name} è un modulo del kernel: il suo codice girerà nel kernel, con accesso completo a utenti e file.\",\"confirm.replaces\":\"{name} prende il posto di {names}: impostazioni e connessioni passano al nuovo modulo e i vecchi vengono tolti.\",\"confirm.mayDo\":\"{name} potrà:\",\"confirm.unverified\":\"Non verificata: viene da un repository non ufficiale. Non si può sapere chi l’ha scritta, né che il codice non sia stato modificato. Installala solo se ti fidi di chi la distribuisce.\",\"permissions.none\":\"Nessun permesso oltre ai propri dati.\",\"done.appInstalled\":\"{name} installata\",\"done.moduleInstalled\":\"{name} installato: riavvia il kernel per usarlo\",\"done.moduleReplaced\":\"Prende il posto di {names}, con le loro impostazioni.\",\"done.appUpToDate\":\"{name} è già aggiornata\",\"done.moduleUpToDate\":\"{name} è già aggiornato\",\"done.appUpdated\":\"{name} aggiornata alla {version}\",\"done.moduleUpdated\":\"{name} {version} installato: riavvia il kernel\",\"done.updatedCount\":{\"one\":\"{n} elemento aggiornato\",\"other\":\"{n} elementi aggiornati\"},\"done.appRemoved\":\"{name} disinstallata\",\"done.moduleRemoved\":\"{name} rimosso: riavvia il kernel\",\"done.moduleRemovedDataKept\":\"{name} rimosso (i suoi dati restano): riavvia il kernel\",\"done.appReinstalled\":\"{name} reinstallata\",\"done.kernelRestarted\":\"Kernel riavviato\",\"restart.kernelReason\":\"Il kernel è ripartito con moduli diversi\",\"done.repoRemoved\":\"{name} rimosso\",\"done.repoAdded\":\"{name} aggiunto\",\"updates.atStart\":\"Controlla gli aggiornamenti all’avvio\",\"updates.atStartOn\":\"L’AppStore controllerà gli aggiornamenti quando entri\",\"updates.atStartOff\":\"Controllo degli aggiornamenti all’avvio spento\",\"updates.needsEngine\":\"Serve il motore dei servizi del kernel (modulo services-isolate)\",\"updates.bySystem\":\"Scelto da un amministratore per tutti: si cambia dal Pannello di controllo → Avvio → Servizi\",\"updates.description\":\"Quando entri e poi a intervalli (ogni 24 ore, si cambia nel Pannello di controllo → Avvio → Servizi), anche con lilOS chiuso: un avviso dice cosa si può aggiornare\",\"updates.check\":\"Controlla gli aggiornamenti\",\"updates.taskHint\":\"Un’operazione della Pianificazione, anche a lilOS chiuso: un avviso dice cosa si può aggiornare\",\"updates.when\":\"Ogni quanto\",\"updates.daily\":\"Ogni giorno alle 09:00\",\"updates.weekly\":\"Ogni lunedì alle 09:00\",\"updates.other\":\"Come nella Pianificazione\",\"updates.inScheduler\":\"Cambiala nella Pianificazione\",\"updates.taskName\":\"Controlla aggiornamenti\",\"service.found\":{\"one\":\"1 aggiornamento disponibile\",\"other\":\"{n} aggiornamenti disponibili\"},\"notify.updates\":{\"one\":\"Aggiornamento disponibile: {names}. Apri l’AppStore.\",\"other\":\"{n} aggiornamenti disponibili: {names}. Apri l’AppStore.\"},\"readme.saved\":\"README salvato in Download come «{file}»\",\"readme.truncated\":\"Il README è troppo lungo: qui se ne vede solo l’inizio.\",\"readme.download\":\"Scarica il README completo\",\"readme.none\":\"Questo pacchetto non ha un README.\",\"readme.notFromRepo\":\"Il README si legge dal repository: questo elemento non viene da un repository elencato.\",\"error.noDownloadFolder\":\"Manca la cartella Download\",\"status.available\":\"Disponibile\",\"status.updateAvailable\":\"Aggiornamento {version}\",\"status.removed\":\"Rimosso\",\"status.replacedBy\":\"Sostituito da {name}\",\"status.otherRepo\":\"Da un altro repository\",\"status.installedApp\":\"Installata\",\"status.installedModule\":\"Installato\",\"status.installedElsewhereApp\":\"Installata da un altro repository\",\"status.installedElsewhereModule\":\"Installato da un altro repository\",\"status.installedLanguage\":\"Installata\",\"repo.manual\":\"Installato a mano\",\"repo.localFolder\":\"Cartella locale\",\"repo.unofficial\":\"non ufficiale\",\"banner.restartNeeded\":\"Le modifiche ai moduli valgono dal prossimo avvio del kernel.\",\"banner.repoUnreachable\":\"{name} non è raggiungibile: quello che offre non è elencato.\",\"banner.reposUnreachable\":{\"one\":\"{n} repository non è raggiungibile: quello che offre non è elencato.\",\"other\":\"{n} repository non sono raggiungibili: quello che offrono non è elencato.\"},\"banner.reposDisabled\":{\"one\":\"{n} repository è disattivato: quello che offre non è elencato.\",\"other\":\"{n} repository sono disattivati: quello che offrono non è elencato.\"},\"banner.officialDisabled\":\"Il repository ufficiale è disattivato: non sono elencati le sue app né gli aggiornamenti di lilOS e delle sue app.\",\"list.reading\":\"Lettura dei repository…\",\"list.items\":{\"one\":\"{n} elemento\",\"other\":\"{n} elementi\"},\"list.repos\":{\"one\":\"{n} repository\",\"other\":\"{n} repository\"},\"list.noResults\":\"Nessun risultato per “{query}” in {tab}\",\"list.upToDate\":\"Tutto aggiornato\",\"list.nothingInstalled\":\"Niente di installato\",\"list.emptyCategory\":\"Niente in questa categoria\",\"list.apps\":\"App\",\"list.modules\":\"Moduli del kernel\",\"list.updates\":{\"one\":\"{n} aggiornamento\",\"other\":\"{n} aggiornamenti\"},\"list.languages\":\"Lingue\",\"detail.kindApp\":\"App\",\"detail.kindModule\":\"Modulo del kernel\",\"detail.kindLanguage\":\"Pacchetto di lingua\",\"detail.verified\":\"Verificata\",\"detail.unverified\":\"non ufficiale · non verificata\",\"detail.required\":\"Necessaria a lilOS\",\"detail.unofficialWarning\":\"Viene da un repository non ufficiale: non si può sapere chi l’ha scritta, né che il codice non sia stato modificato.\",\"detail.version\":\"Versione\",\"detail.repository\":\"Repository\",\"detail.provides\":\"Fornisce\",\"detail.id\":\"ID\",\"detail.state\":\"Stato\",\"detail.warning\":\"Attenzione\",\"detail.moduleWarning\":\"Il codice di un modulo gira nel kernel, con accesso completo a utenti e file. Le modifiche valgono dal prossimo avvio del kernel.\",\"detail.mayDo\":\"Potrà\",\"moduleState.removed\":\"Rimosso: attivo fino al riavvio\",\"moduleState.oldUntilRestart\":\"In uso la {version} fino al riavvio\",\"moduleState.nextStart\":\"Attivo dal prossimo avvio\",\"moduleState.inUse\":\"In uso\",\"languages.lead\":\"I pacchetti di lingua traducono i testi di lilOS: scrivania, menu, finestre, messaggi. Ogni utente può installarne uno, e vale per tutti; ogni app usa la propria traduzione se ce l’ha, altrimenti l’inglese.\",\"languages.empty\":\"Il repository ufficiale non offre pacchetti di lingua\",\"languages.rtl\":\"da destra a sinistra\",\"languages.installedBy\":\"installata da {name}\",\"languages.inUse\":\"In uso\",\"languages.notInstalled\":\"Non installata\",\"languages.updateAvailable\":\"Aggiornamento disponibile {from} → {to}\",\"languages.use\":\"Usa questa lingua\",\"languages.updated\":\"{name} aggiornata alla {version}\",\"languages.removed\":\"{name} rimossa\",\"languages.offerTitle\":\"{name} è installata\",\"languages.offerLead\":\"{name} ({title}) è installata per tutti gli utenti di questo lilOS. Usarla ora per il tuo lilOS?\",\"languages.offerHint\":\"Puoi cambiarla quando vuoi in Pannello di controllo → Lingua.\",\"languages.removeTitle\":\"Rimuovi {name}\",\"languages.removeLead\":\"{name} ({title}) sarà rimossa per tutti gli utenti di questo lilOS.\",\"languages.removeEnglish\":\"Chi la usa torna all’inglese, finché non sceglie un’altra lingua.\",\"languages.code\":\"Codice della lingua\",\"languages.installedByLabel\":\"Installata da\",\"languages.needs\":\"Richiede\",\"languages.aboutTitle\":\"Pacchetto di lingua\",\"languages.about\":\"Traduce i testi di lilOS, non le app: ogni app usa la propria traduzione se ce l’ha, altrimenti l’inglese. Viene dal repository ufficiale.\",\"languages.removeOnly\":\"Solo {name}, che l’ha installata, o un amministratore può rimuoverla.\",\"languages.removeAdmin\":\"Solo un amministratore può rimuoverla.\",\"languages.notOffered\":\"Il repository ufficiale non offre più questa lingua: il suo README non è disponibile.\",\"action.delete\":\"Elimina\",\"detail.kindSystem\":\"Sistema operativo\",\"banner.systemRestart\":\"lilOS {version} parte al prossimo riavvio del kernel.\",\"system.description\":\"Il sistema stesso: scrivania, kernel e SDK.\",\"system.inUse\":\"In uso\",\"system.nextShort\":\"{version} al riavvio\",\"system.next\":\"La {version} parte al prossimo riavvio\",\"system.confirmTitle\":\"Aggiornare lilOS alla {version}?\",\"system.confirmLead\":\"lilOS {version} viene installato accanto alla {current}, quella in uso, per tutti gli utenti.\",\"system.confirmRestart\":\"Parte al riavvio del kernel: chi è collegato perde la connessione per qualche secondo, poi lilOS si ricarica.\",\"system.confirmRollback\":\"Se non parte, lilOS torna da solo alla {current} e lo dice agli amministratori.\",\"system.upToDate\":\"lilOS è aggiornato\",\"system.ready\":\"lilOS {version} è pronto: parte al prossimo riavvio del kernel\",\"system.nextCancelled\":\"Il cambio di versione è stato annullato\",\"system.removeTitle\":\"Eliminare lilOS {version}?\",\"system.removeLead\":\"I file di lilOS {version} vengono eliminati dal disco: non potrai più tornarci. Dati e app non vengono toccati.\",\"system.removed\":\"lilOS {version} eliminato\",\"system.failed\":\"lilOS {version} non è partito ({reason}): lilOS è tornato da solo alla {current}.\",\"system.development\":\"Questo lilOS gira da una copia del suo repository (sviluppo): si aggiorna con git, non da qui.\",\"system.installedMode\":\"Installato\",\"system.developmentMode\":\"Copia di sviluppo\",\"system.kept\":\"Versioni conservate sul disco\",\"system.keptHint\":\"Per tornarci\",\"system.keptFailed\":\"Non è partita\",\"system.use\":\"Usa questa versione\",\"system.cancelNext\":\"Annulla il cambio\",\"system.warning\":\"lilOS si aggiorna per tutti gli utenti. La nuova versione si mette accanto a quella in uso e parte al riavvio del kernel; quella di prima resta sul disco finché non la elimini.\",\"options.title\":\"Opzioni\",\"options.lead\":\"Preferenze dell’AppStore e repository da cui arrivano app e moduli. Disattiva un repository per elencare solo quello che offrono quelli attivi.\",\"options.showUnofficial\":\"Mostra i repository non ufficiali\",\"options.showUnofficialHint\":\"Se spento, le schede elencano solo quello che offre il repository ufficiale\",\"options.repositories\":\"Repository\",\"options.unreachable\":\"Non raggiungibile: {error}\",\"options.apps\":{\"one\":\"{n} app\",\"other\":\"{n} app\"},\"options.modules\":{\"one\":\"{n} modulo\",\"other\":\"{n} moduli\"},\"options.languages\":{\"one\":\"{n} lingua\",\"other\":\"{n} lingue\"},\"options.invalid\":{\"one\":\"{n} pacchetto non valido\",\"other\":\"{n} pacchetti non validi\"},\"options.reading\":\"Lettura…\",\"options.alwaysThere\":\"Sempre presente\",\"options.active\":\"{name} attivo\",\"options.disabled\":\"Disattivato: non si legge, niente di suo è elencato né proposto come aggiornamento\",\"options.addRepo\":\"Aggiungi un repository\",\"options.address\":\"Indirizzo\",\"options.addressHint\":\"Un repository git con catalog.json, per esempio https://github.com/nome/repo\",\"options.addressLabel\":\"Indirizzo del repository\",\"options.name\":\"Nome\",\"options.nameHint\":\"Facoltativo: altrimenti quello del suo catalogo\",\"options.nameLabel\":\"Nome del repository\",\"options.adminOnly\":\"Solo un amministratore aggiunge e rimuove repository.\",\"action.close\":\"Chiudi\",\"action.later\":\"Più tardi\",\"action.restartNow\":\"Riavvia ora\",\"confirm.removeTitle\":\"Rimuovi {name}\",\"confirm.removeModule\":\"{name} smetterà di girare nel kernel dal prossimo avvio.\",\"restart.askTitle\":\"Riavviare il kernel?\",\"restart.askLead\":\"Installazione di {name} completata. I moduli del kernel installati entrano in funzione dopo il riavvio del kernel.\",\"restart.askHint\":\"Il riavvio dura qualche secondo: lilOS si ricollega da solo.\",\"restart.askRemovedLead\":\"{name} è stato rimosso. I moduli del kernel rimossi insieme si fermano dopo il riavvio del kernel.\",\"deps.title\":\"Ha bisogno di\",\"deps.install\":\"installa la versione {version}\",\"deps.update\":\"aggiorna dalla {from} alla {version}\",\"deps.kindModule\":\"Modulo del kernel\",\"deps.kindApp\":\"App\",\"deps.why\":\"Serve a {name}\",\"deps.whyReason\":\"Serve a {name}: {reason}\",\"deps.unverifiedModule\":\"Non verificato: il suo codice girerà nel kernel con accesso completo.\",\"deps.unverifiedApp\":\"Non verificata: viene da un repository non ufficiale.\",\"deps.brings\":\"Installa anche: {name} ({kind})\",\"deps.tick\":\"Installa anche {name}\",\"deps.cannot\":\"{name} ora non si può installare:\",\"deps.required\":\"Si installa anche\",\"deps.optional\":\"Facoltativi: installare anche questi?\",\"deps.unavailable\":\"Ora non disponibili: {list}\",\"deps.restartNote\":\"I moduli del kernel entrano in funzione dopo il riavvio del kernel: te lo chiedo alla fine.\",\"deps.installed\":{\"zero\":\"Installazione di {name} completata\",\"one\":\"Installazione di {name} completata, con {n} altro pacchetto\",\"other\":\"Installazione di {name} completata, con altri {n} pacchetti\"},\"deps.alsoRemove\":\"Rimuovi anche {name}\",\"deps.unneededTitle\":\"Non servono più\",\"deps.unneededHint\":\"Erano stati installati solo per questo e niente altro li usa. Quelli spuntati si rimuovono insieme.\",\"deps.blocked\":\"{name} non si può rimuovere: serve a {list}.\",\"deps.blockedHint\":{\"one\":\"Rimuovi prima quella, poi questo.\",\"other\":\"Rimuovi prima quelle, poi questo.\"},\"deps.appRemovedWith\":{\"one\":\"{name} disinstallata, con {n} altro pacchetto\",\"other\":\"{name} disinstallata, con altri {n} pacchetti\"},\"deps.moduleRemovedWith\":{\"one\":\"{name} rimosso, con {n} altro pacchetto\",\"other\":\"{name} rimosso, con altri {n} pacchetti\"},\"deps.unmetRestart\":\"{name} ha bisogno di {list}, già installato: funziona dopo il riavvio del kernel.\",\"deps.unmetMissing\":\"A {name} manca {list}: non parte finché non è installato.\",\"deps.stateInstalled\":\"installato, {version}\",\"deps.stateMissing\":\"manca\",\"deps.stateRestart\":\"dopo il riavvio del kernel\",\"deps.optionalTag\":\"facoltativo\"}}")
}), ne = () => [
	{
		id: "system",
		label: A("category.system")
	},
	{
		id: "productivity",
		label: A("category.productivity")
	},
	{
		id: "media",
		label: A("category.media")
	},
	{
		id: "development",
		label: A("category.development")
	},
	{
		id: "other",
		label: A("category.other")
	},
	{
		id: "kernel",
		label: A("category.kernel")
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
}, j = e.systemReleases ?? null, M = e.languagePacks ?? null, se = {
	glyph: "globe",
	color: "#7c5cff"
};
m.define({ "appstore.showUnofficial": !0 });
var ce = "app:appstore:repos.disabled", le = () => {
	let e = h.get(ce, []);
	return (Array.isArray(e) ? e : []).filter((e) => typeof e?.id == "string" && typeof e.name == "string");
}, ue = (e) => e.replace(/\.git$/i, "").replace(/\/+$/, ""), N = (e, t) => !!e?.url && ue(e.url).toLowerCase() === ue(t.url).toLowerCase(), P = (e) => ue(e.url).split(/[/\\]/).pop() || e.name;
function de({ args: te } = {}) {
	let C = l.user?.role === "admin", w = {
		repos: [],
		catalogs: /* @__PURE__ */ new Map(),
		errors: /* @__PURE__ */ new Map(),
		modules: [],
		system: null,
		packs: [],
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
	}, T = new t({
		title: "AppStore",
		icon: "download",
		width: 960,
		height: 640,
		minWidth: 560,
		minHeight: 420
	});
	T.el.classList.add("appstore");
	async function E(e, t, n) {
		if (w.busy) return;
		w.busy = e, $();
		let r;
		try {
			r = await t();
			let e = typeof n == "function" ? n(r) : n;
			e && _(e, { timeout: 5e3 }), await ye({ quiet: !0 });
		} catch (e) {
			_(e.message, { timeout: 7e3 });
		} finally {
			w.busy = null, $();
		}
		return r;
	}
	async function D() {
		let e = await y.services?.list().catch(() => null);
		w.updates = e?.available ? e.services.find((e) => e.app === "appstore" && e.entry === "updates") ?? null : null;
	}
	let k = e.schedule?.available && typeof e.schedule.forApp == "function" ? e.schedule.forApp("appstore") : null, ue = {
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
	}, de = () => {
		let e = /* @__PURE__ */ new Date(), t = (e) => String(e).padStart(2, "0");
		return `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}T09:00`;
	}, fe = () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
	async function pe() {
		k && (w.updateTask = (await k.list().catch(() => [])).find((e) => e.what?.type === "service" && e.what.app === "appstore" && e.what.entry === "updates") ?? null, !w.updateTask && w.updates?.startup === "login" && (w.updateTask = await me({
			on: !0,
			every: "daily"
		}).catch(() => null), await y.services.setStartup("appstore", "updates", "none").catch(() => {}), await D()));
	}
	async function me({ on: e, every: t }) {
		let n = w.updateTask, r = t ?? he(n) ?? "daily", i = {
			name: A("updates.taskName"),
			enabled: e,
			when: n && !t ? n.when : {
				...ue[r](),
				start: n?.when?.start ?? de(),
				tz: n?.when?.tz ?? fe()
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
		return n ? k.update(n.id, i) : k.create(i);
	}
	let he = (e) => e?.when?.every ? e.when.every.unit === "week" ? "weekly" : e.when.every.unit === "day" ? "daily" : "other" : null;
	async function ge(e) {
		try {
			w.updateTask = await me({
				on: w.updateTask?.enabled ?? !1,
				...e
			});
		} catch (e) {
			_(e.message, { timeout: 7e3 });
		}
		$();
	}
	async function _e(e) {
		try {
			await y.services.setStartup("appstore", "updates", e ? "login" : "none"), await y.services[e ? "start" : "stop"]("appstore", "updates"), _(A(e ? "updates.atStartOn" : "updates.atStartOff"));
		} catch (e) {
			_(e.message, { timeout: 7e3 });
		}
		await D(), $();
	}
	async function ve(e) {
		try {
			w.catalogs.set(e.id, await p.catalog(e.id)), w.errors.delete(e.id);
		} catch (t) {
			w.catalogs.delete(e.id), w.errors.set(e.id, t.message);
		}
	}
	async function ye({ quiet: e = !1 } = {}) {
		e || (w.loading = !0, $());
		try {
			w.repos = await p.list();
			let e = le();
			e.some((e) => !w.repos.some((t) => t.id === e.id)) && h.set(ce, e.filter((e) => w.repos.some((t) => t.id === e.id))), await Promise.all(w.repos.filter(F).map(ve)), w.modules = C ? await u.list().catch(() => []) : [], w.system = j ? await j.info().catch(() => null) : null, w.packs = M ? await M.list().catch(() => w.packs) : [], await D(), await pe(), await i.refresh();
		} catch (e) {
			_(e.message, { timeout: 7e3 });
		}
		w.loading = !1, $();
	}
	let F = (e) => !le().some((t) => t.id === e.id), be = () => w.repos.filter((e) => F(e) && (e.official || m.get("appstore.showUnofficial")));
	async function xe(e, t) {
		let n = le().filter((t) => t.id !== e.id);
		h.set(ce, t ? n : [...n, {
			id: e.id,
			name: e.name
		}]);
		let r = () => {
			$(), T.body.querySelector(`#as-repo-${e.id}`)?.focus();
		};
		r(), t && !w.catalogs.has(e.id) && (await ve(e), r());
	}
	function Se(t, n, r) {
		let i = n?.manifest ?? r.manifest, a = (n ? n.locales && e.locale?.manifest(n.manifest, n.locales) : e.locale?.manifest(r.manifest)) || i, o = n?.manifest.version ?? null, s = !!r && (!n || N(r.source, t));
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
			update: s && o && b(o, r.version) > 0 ? o : null,
			required: !!i.required,
			verified: !!r?.signed || !!t?.official
		};
	}
	function Ce(e, t, n) {
		let r = t?.module ?? n, i = t?.module.version ?? null, a = !!n && (!t || N(n.source, e));
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
			update: a && n.enabled && i && b(i, n.enabled) > 0 ? i : null,
			provides: r.provides ?? [],
			verified: !!e?.official,
			required: !!n?.required || !!t?.module?.required
		};
	}
	function we() {
		let e = w.system;
		if (!e) return null;
		let t = w.repos.find((e) => e.official) ?? null, n = t && F(t) && w.catalogs.get(t.id)?.system?.system ? w.catalogs.get(t.id).system : null, r = n?.system.version ?? null, i = e.mode === "installed";
		return {
			key: "system:lilos",
			kind: "system",
			id: "lilos",
			name: "lilOS",
			description: A("system.description"),
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
			update: i && r && b(r, e.version) > 0 && r !== e.next ? r : null,
			required: !0,
			verified: !0
		};
	}
	function Te(t, n) {
		try {
			let n = new Intl.DisplayNames([e.locale?.code ?? navigator.language ?? "en"], {
				type: "language",
				fallback: "none"
			}).of(t);
			if (n && n !== t) return n.charAt(0).toUpperCase() + n.slice(1);
		} catch {}
		return n || t;
	}
	function Ee(t, n, r) {
		let i = n?.language ?? r, a = n?.language.version ?? null, o = r?.version ?? null, s = i.dir === "rtl", c = Te(i.language, i.englishName), l = r?.installedBy?.username;
		return {
			key: `language:${i.language}`,
			kind: "language",
			id: i.language,
			language: i.language,
			name: i.name,
			title: c,
			rtl: s,
			description: [
				c,
				s ? A("languages.rtl") : null,
				l ? A("languages.installedBy", { name: l }) : null
			].filter(Boolean).join(" · "),
			icon: se,
			publisher: "lilOS",
			category: "languages",
			repo: t,
			entry: n,
			have: r,
			lilos: i.lilos ?? null,
			readme: n?.readme ?? null,
			readmeTruncated: !1,
			offered: a,
			installed: o,
			here: !!r,
			elsewhere: !1,
			update: r && a && b(a, o) > 0 ? a : null,
			canRemove: !!r?.canRemove,
			inUse: !!r && e.locale?.language === i.language,
			verified: !0
		};
	}
	function De() {
		if (!M) return [];
		let e = w.repos.find((e) => e.official) ?? null, t = e && F(e) ? (w.catalogs.get(e.id)?.languages ?? []).filter((e) => typeof e.language?.language == "string") : [], n = w.packs.filter((e) => typeof e?.language == "string");
		return [...t.map((t) => Ee(e, t, n.find((e) => e.language === t.language.language))), ...n.filter((e) => !t.some((t) => t.language.language === e.language)).map((t) => Ee(e, null, t))];
	}
	function Oe() {
		let e = i.list(), t = w.modules.filter((e) => e.enabled || e.running), n = [];
		for (let r of be()) {
			let i = w.catalogs.get(r.id);
			for (let t of i?.apps ?? []) t.manifest && n.push(Se(r, t, e.find((e) => e.id === t.manifest.id)));
			if (C) for (let e of i?.modules ?? []) e.module && !e.replacedBy && n.push(Ce(r, e, t.find((t) => t.name === e.module.name)));
		}
		for (let t of e) n.some((e) => e.kind === "app" && e.here && e.id === t.id) || n.push(Se(w.repos.find((e) => N(t.source, e)) ?? null, null, t));
		for (let e of t) n.some((t) => t.kind === "module" && t.here && t.id === e.name) || n.push(Ce(w.repos.find((t) => N(e.source, t)) ?? null, null, e));
		let r = n.filter((e) => e.kind === "module" && e.entry && !e.have && e.module.replaces?.length);
		for (let e of n) e.kind === "module" && e.here && e.have.enabled && !e.have.replacedBy && (e.replacedBy = r.find((t) => t.module.replaces.includes(e.id)) ?? null);
		n.push(...De());
		let a = we();
		return a ? [a, ...n] : n;
	}
	function ke(e) {
		let t = new Set(e.filter((e) => !e.repo || F(e.repo)).map((e) => e.category));
		return [
			{
				id: "installed",
				label: A("tab.installed"),
				filter: (e) => e.here
			},
			{
				id: "updates",
				label: A("tab.updates"),
				filter: Ae,
				badge: !0
			},
			...ne().filter((e) => t.has(e.id) || e.id === "kernel" && C).map((e) => ({
				...e,
				category: !0,
				filter: (t) => t.category === e.id && (!t.repo || F(t.repo))
			})),
			...M ? [{
				id: "languages",
				label: A("tab.languages"),
				separate: !0,
				filter: (e) => e.kind === "language"
			}] : []
		];
	}
	let Ae = (e) => !!e.update || !!e.replacedBy, je = (e, t) => !t || [
		e.name,
		e.id,
		e.description,
		e.publisher,
		e.repo ? P(e.repo) : ""
	].some((e) => e.toLowerCase().includes(t)), Me = () => C && w.modules.some((e) => (e.enabled ?? null) !== (e.running ?? null)), I = () => C ? w.system?.next ?? null : null;
	async function L({ title: e, text: t, content: n = null, confirm: r = null, cancel: i = null, kind: a = null, width: o = 440 }) {
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
		return await d(T, {
			icon: a ?? (r?.danger ? "warning" : null),
			title: e,
			text: t.join("\n\n"),
			content: n,
			width: o,
			buttons: s,
			default: r && !r.danger ? "yes" : "cancel"
		}) === "yes";
	}
	let Ne = (e) => e.kind === "module" ? (e.module.replaces ?? []).filter((e) => w.modules.some((t) => t.name === e)) : [], Pe = (e, t) => t.length ? [A("confirm.replaces", {
		name: e,
		names: t.join(", ")
	})] : [];
	async function Fe({ title: e, name: t, permissions: n = [], official: r, kernelModule: i = !1, replaces: a = [] }) {
		let o = S(n), c = i ? null : o.length ? s("ul", {}, ...o.map((e) => s("li", {}, x(e)))) : s("p", {}, A("permissions.none"));
		return await L({
			title: e,
			text: [A(i ? "confirm.kernelModule" : "confirm.mayDo", { name: t }), ...Pe(t, a)],
			content: c || !r ? s("div", { class: "as-ask" }, c, r ? null : s("p", { class: "as-warning" }, A("confirm.unverified"))) : null,
			confirm: {
				label: A(r ? "action.install" : "action.installAnyway"),
				primary: r,
				danger: !r
			}
		}) ? {
			grant: o,
			allowUnsigned: !r
		} : null;
	}
	let Ie = (e, t) => e?.replaced?.length ? `${t} ${A("done.moduleReplaced", { names: e.replaced.join(", ") })}` : t, Le = ({ repo: e, entry: t }) => ({
		type: "git",
		url: e.url,
		path: t.path,
		ref: w.catalogs.get(e.id)?.ref
	}), Re = (e) => e.module === void 0 ? `app:${e.app}` : `module:${e.module}`, ze = (t, n) => (n ? e.locale?.manifest(t, n) : e.locale?.manifest(t)) || t, Be = (e) => {
		let t = i.get(e);
		return t ? ze(t.manifest).name : e;
	}, Ve = (e) => e.kind === "app" && e.manifest ? ze(e.manifest, e.locales).name : e.name, He = (e) => e.action === "install" ? A("deps.install", { version: e.version }) : A("deps.update", {
		from: e.from,
		version: e.version
	}), Ue = (e) => A(e === "module" ? "deps.kindModule" : "deps.kindApp"), We = (e) => {
		let t = w.repos.find((t) => N({ url: e }, t));
		return t ? P(t) : e;
	};
	async function Ge({ title: e, name: t, plan: n, official: i, kernelModule: a = !1, permissions: o = [], rootDeps: c = null, replaces: l = [] }) {
		let u = S(o), d = n.steps.filter((e) => !e.optional), f = n.steps.filter((e) => e.choice), p = n.problems.filter((e) => !e.optional), m = n.problems.filter((e) => e.optional), h = /* @__PURE__ */ new Set(), g = new Map(n.steps.map((e) => [e.key, e])), _ = (e) => {
			let t = [], n = (e) => e.needs.forEach((e) => {
				let r = g.get(e);
				r && r.optional && !r.choice && !t.includes(r) && (t.push(r), n(r));
			});
			return n(e), t;
		}, v = new Map([[n.root.key, c ?? n.root.manifest?.dependencies ?? []], ...n.steps.filter((e) => e.manifest).map((e) => [e.key, ze(e.manifest, e.locales).dependencies ?? []])]), y = (e) => e.neededBy.map((r) => {
			let i = (v.get(r.key) ?? []).find((t) => Re(t) === e.key)?.reason ?? r.reason, a = r.key === n.root.key ? t : Ve(g.get(r.key) ?? r);
			return s("span", { class: "as-dep-why" }, i ? A("deps.whyReason", {
				name: a,
				reason: i
			}) : A("deps.why", { name: a }));
		}), b = (e, t = null) => s("li", { class: "as-dep" }, t, r(e.icon ?? (e.kind === "module" ? ie : ae)), s("div", { class: "as-dep-text" }, s("b", {}, Ve(e), " ", s("span", { class: "as-dep-action" }, He(e))), s("span", { class: "as-dep-sub" }, [Ue(e.kind), We(e.repo.url)].join(" · ")), ...y(e), e.permissions.length ? s("ul", {}, ...e.permissions.map((e) => s("li", {}, x(e)))) : null, e.verified ? null : s("span", { class: "as-dep-warning" }, e.kind === "module" ? A("deps.unverifiedModule") : A("deps.unverifiedApp")), ...t ? _(e).map((e) => s("span", { class: "as-dep-sub" }, A("deps.brings", {
			name: Ve(e),
			kind: Ue(e.kind)
		}))) : [])), ee = (e) => {
			let t = s("input", {
				type: "checkbox",
				"aria-label": A("deps.tick", { name: Ve(e) })
			});
			return t.addEventListener("change", () => t.checked ? h.add(e.key) : h.delete(e.key)), t;
		}, te = () => {
			let e = {}, t = (t) => {
				e[t.key] = {
					grant: t.permissions,
					allowUnsigned: !t.verified
				};
			};
			d.forEach(t);
			for (let e of f) h.has(e.key) && [e, ..._(e)].forEach(t);
			return e;
		}, C = !i || d.some((e) => !e.verified);
		return await L({
			title: e,
			width: 520,
			text: [A(a ? "confirm.kernelModule" : "confirm.mayDo", { name: t }), ...Pe(t, l)],
			content: s("div", { class: "as-ask" }, !a && u.length ? s("ul", {}, ...u.map((e) => s("li", {}, x(e)))) : null, !a && !u.length ? s("p", {}, A("permissions.none")) : null, i ? null : s("p", { class: "as-warning" }, A("confirm.unverified")), p.length ? s("div", {
				class: "as-dep-blocked",
				role: "alert"
			}, s("b", {}, A("deps.cannot", { name: t })), s("ul", {}, ...p.map((e) => s("li", {}, e.message)))) : null, d.length ? s("h3", { class: "as-dep-title" }, A("deps.required")) : null, d.length ? s("ul", { class: "as-deps" }, ...d.map((e) => b(e))) : null, f.length ? s("h3", { class: "as-dep-title" }, A("deps.optional")) : null, f.length ? s("ul", { class: "as-deps" }, ...f.map((e) => b(e, ee(e)))) : null, m.length ? s("p", {
				class: "as-dep-sub",
				title: m.map((e) => e.message).join("\n")
			}, A("deps.unavailable", { list: m.map((e) => e.id).join(", ") })) : null, n.restartRequired ? s("p", { class: "as-dep-sub" }, A("deps.restartNote")) : null),
			cancel: p.length ? A("action.close") : null,
			confirm: p.length ? null : {
				label: A(C ? "action.installAnyway" : "action.install"),
				primary: !C,
				danger: C
			}
		}) ? {
			root: {
				grant: u,
				allowUnsigned: !i
			},
			steps: te()
		} : null;
	}
	async function Ke(e, { removed: t = !1 } = {}) {
		C && await L({
			title: A("restart.askTitle"),
			text: [A(t ? "restart.askRemovedLead" : "restart.askLead", { name: e }), A("restart.askHint")],
			confirm: {
				label: A("action.restartNow"),
				primary: !0
			},
			cancel: A("action.later")
		}) && B();
	}
	async function qe(e) {
		if (w.busy) return null;
		w.busy = "plan", $();
		try {
			return await e();
		} catch (e) {
			return _(e.message, { timeout: 7e3 }), null;
		} finally {
			w.busy = null, $();
		}
	}
	async function Je(e) {
		try {
			return await f.plan(e);
		} catch (e) {
			return _(e.message, { timeout: 7e3 }), null;
		}
	}
	async function Ye(e, { inAct: t = !1, trusted: n = !1 } = {}) {
		let { repo: r } = e, i = Le(e), a = e.kind === "module", o = { install: {
			kind: e.kind,
			source: i
		} }, s = t ? await Je(o) : await qe(() => Je(o));
		if (!s) return null;
		if (s.steps.length || s.problems.length) {
			let t = await Ge({
				title: A("confirm.installTitle", { name: e.name }),
				name: e.name,
				plan: s,
				official: r.official,
				kernelModule: a,
				permissions: e.manifest?.permissions,
				rootDeps: e.shown?.dependencies,
				replaces: Ne(e)
			});
			return t && {
				target: o,
				answer: t
			};
		}
		if (n && r.official) return {
			source: i,
			answer: {
				grant: S(e.manifest?.permissions),
				allowUnsigned: !1
			}
		};
		let c = await Fe({
			title: A("confirm.installTitle", { name: e.name }),
			name: e.name,
			official: r.official,
			...a ? {
				kernelModule: !0,
				replaces: Ne(e)
			} : { permissions: e.manifest.permissions }
		});
		return c && {
			source: i,
			answer: c
		};
	}
	let Xe = (e, t) => t.target ? f.install(t.target, t.answer).then((e) => ({
		...e.result,
		installed: e.installed,
		restartRequired: e.restartRequired
	})) : e.kind === "module" ? u.install(t.source, { allowUnsigned: t.answer.allowUnsigned }) : i.install(t.source, t.answer);
	async function R(e) {
		let t = await Ye(e);
		if (!t) return;
		let n = e.name;
		(await E("install", () => Xe(e, t), (r) => t.target ? Ie(r, A("deps.installed", {
			name: n,
			n: r.installed.length
		})) : e.kind === "module" ? Ie(r, A("done.moduleInstalled", { name: n })) : A("done.appInstalled", { name: n })))?.restartRequired && Ke(n);
	}
	async function Ze(e) {
		let t = !!e.repo?.official;
		if (e.kind === "app" || e.kind === "module") {
			let n = { update: {
				kind: e.kind,
				id: e.id
			} }, r = await Je(n);
			if (!r) return null;
			if (r.steps.length || r.problems.length) {
				let i = await Ge({
					title: A("confirm.updateTitle", { name: e.name }),
					name: e.name,
					plan: r,
					official: t,
					kernelModule: e.kind === "module",
					permissions: r.root.permissions,
					rootDeps: e.entry?.locales ? ze(r.root.manifest ?? e.manifest, e.entry.locales).dependencies : null
				});
				return i && {
					plan: n,
					answers: i
				};
			}
		}
		if (e.kind === "module") return t || await Fe({
			title: A("confirm.updateTitle", { name: e.name }),
			name: e.name,
			official: t,
			kernelModule: !0
		}) ? { allowUnsigned: !t } : null;
		let n = S(e.entry?.manifest.permissions).filter((t) => !e.have.granted.includes(t));
		return !n.length && t ? {
			grant: [],
			allowUnsigned: !1
		} : Fe({
			title: A("confirm.updateTitle", { name: e.name }),
			name: e.name,
			permissions: n,
			official: t
		});
	}
	let z = (e, t) => t.plan ? f.install(t.plan, t.answers).then((e) => ({
		...e.result,
		restartRequired: e.restartRequired
	})) : e.kind === "module" ? u.update(e.id, t) : i.update(e.id, t);
	async function Qe(e, { reinstall: t = !1 } = {}) {
		if (!y.updateApps) {
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
		let n = await y.updateApps(e.map(({ item: e, run: t }) => ({
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
	async function $e(e, t, n) {
		let [r] = await Qe([{
			item: e,
			run: t
		}], n) ?? [null];
		if (r?.error) throw r.error;
		return r ? r.result : null;
	}
	async function et(e) {
		let t = e.kind === "module", n = e.name;
		(await E("update", async () => {
			let n = await Ze(e);
			return n ? t ? z(e, n) : $e(e, () => z(e, n)) : null;
		}, (e) => e ? e.unchanged ? A(t ? "done.moduleUpToDate" : "done.appUpToDate", { name: n }) : t ? Ie(e, A("done.moduleUpdated", {
			name: n,
			version: e.version
		})) : A("done.appUpdated", {
			name: n,
			version: e.version
		}) : null))?.restartRequired && !t && Ke(n);
	}
	function tt(e) {
		E("update", async () => {
			let t = 0, n = [], r = e.find((e) => e.kind === "system"), i = /* @__PURE__ */ new Set();
			for (let a of e) {
				if (a === r || a.kind === "language") continue;
				if (a.replacedBy) {
					let e = a.replacedBy;
					if (i.has(e.name)) continue;
					i.add(e.name);
					let n = await Ye(e, {
						inAct: !0,
						trusted: !0
					});
					if (!n) continue;
					try {
						await Xe(e, n), t++;
					} catch (t) {
						_(`${e.name}: ${t.message}`, { timeout: 7e3 });
					}
					continue;
				}
				let e = await Ze(a);
				if (e) {
					if (a.kind !== "module") n.push({
						item: a,
						run: () => z(a, e)
					});
					else try {
						await z(a, e), t++;
					} catch (e) {
						_(`${a.name}: ${e.message}`, { timeout: 7e3 });
					}
				}
			}
			for (let e of n.length && await Qe(n) || []) e.error ? _(`${e.item.name}: ${e.error.message}`, { timeout: 7e3 }) : t++;
			for (let n of e.filter((e) => e.kind === "language")) try {
				await M.install(n.language), t++;
			} catch (e) {
				_(`${n.name}: ${e.message}`, { timeout: 7e3 });
			}
			if (r && await lt(r)) try {
				(await j.update()).unchanged || t++;
			} catch (e) {
				_(`${r.name}: ${e.message}`, { timeout: 7e3 });
			}
			return t;
		}, (e) => A("done.updatedCount", { n: e }));
	}
	async function nt(e, t) {
		let n = e.kind === "module", r = new Set(t.map((e) => e.key));
		return await L({
			title: A(n ? "confirm.removeTitle" : "confirm.uninstallTitle", { name: e.name }),
			width: t.length ? 480 : 440,
			text: n ? [A("confirm.removeModule", { name: e.name })] : [A("confirm.uninstall", { name: e.name }), A("confirm.uninstallFiles")],
			content: t.length ? s("div", { class: "as-ask" }, s("h3", { class: "as-dep-title" }, A("deps.unneededTitle")), s("p", { class: "as-dep-sub" }, A("deps.unneededHint")), s("ul", { class: "as-deps" }, ...t.map((e) => {
				let t = e.kind === "app" ? Be(e.id) : e.name, n = s("input", {
					type: "checkbox",
					"aria-label": A("deps.alsoRemove", { name: t })
				});
				return n.checked = !0, n.addEventListener("change", () => n.checked ? r.add(e.key) : r.delete(e.key)), s("li", { class: "as-dep" }, n, s("div", { class: "as-dep-text" }, s("b", {}, t, " ", s("span", { class: "as-dep-action" }, e.version)), s("span", { class: "as-dep-sub" }, Ue(e.kind))));
			}))) : null,
			confirm: {
				label: A(n ? "action.remove" : "action.uninstall"),
				danger: !0
			}
		}) ? { also: [...r] } : null;
	}
	async function rt(e) {
		let t = e.name, n = e.kind === "module", r = await qe(() => f.removal(e.kind, e.id));
		if (!r) return;
		if (r.blockedBy.length) {
			let e = r.blockedBy.map((e) => e.kind === "app" ? Be(e.id) : e.name).join(", ");
			await L({
				title: A(n ? "confirm.removeTitle" : "confirm.uninstallTitle", { name: t }),
				kind: "info",
				text: [A("deps.blocked", {
					name: t,
					list: e
				}), A("deps.blockedHint", { n: r.blockedBy.length })],
				cancel: A("action.close")
			});
			return;
		}
		if (n && !r.unneeded.length) {
			E("remove", () => u.remove(e.id), (e) => e.kept.length ? A("done.moduleRemovedDataKept", { name: t }) : A("done.moduleRemoved", { name: t }));
			return;
		}
		let i = await nt(e, r.unneeded);
		i && (await E("remove", () => f.remove(e.kind, e.id, i), (e) => e.removed.length > 1 ? A(n ? "deps.moduleRemovedWith" : "deps.appRemovedWith", {
			name: t,
			n: e.removed.length - 1
		}) : A(n ? "done.moduleRemoved" : "done.appRemoved", { name: t })))?.restartRequired && Ke(t, { removed: !0 });
	}
	let it = (e) => C && e.kind === "app" && e.here && !e.required, at = (e) => E("reinstall", () => $e(e, () => i.update(e.id, {
		reinstall: !0,
		allowUnsigned: !e.verified
	}), { reinstall: !0 }), (t) => t ? A("done.appReinstalled", { name: e.name }) : null), ot = (e, t, n) => a(e, async () => {
		try {
			let e = await n(), r = o.children(o.root).find((e) => e.type === "folder" && e.system && e.name === "Download");
			if (!r) throw Error(A("error.noDownloadFolder"));
			let i = o.create(r.id, {
				type: "file",
				name: t
			});
			await o.write(i.id, e), _(A("readme.saved", { file: i.name }), { timeout: 6e3 });
		} catch (e) {
			_(e.message, { timeout: 7e3 });
		}
	}), st = (e, t) => ot(t, `${e.name} - README.md`, () => p.readme(e.repo.id, e.entry.path)), ct = (e, t) => ot(t, "lilOS - CHANGELOG.md", () => p.readme(e.repo.id, e.entry.path, "CHANGELOG.md")), lt = (e) => L({
		title: A("system.confirmTitle", { version: e.update }),
		text: [
			A("system.confirmLead", {
				version: e.update,
				current: e.installed
			}),
			A("system.confirmRestart"),
			A("system.confirmRollback", { current: e.installed })
		],
		confirm: {
			label: A("action.update"),
			primary: !0
		}
	});
	async function ut(e) {
		await lt(e) && E("update", () => j.update(), (e) => e.unchanged ? A("system.upToDate") : A("system.ready", { version: e.version }));
	}
	let dt = (e) => E("system", () => j.use(e), (t) => t.restartRequired ? A("system.ready", { version: e }) : A("system.nextCancelled"));
	async function ft(e) {
		await L({
			title: A("system.removeTitle", { version: e }),
			text: [A("system.removeLead", { version: e })],
			confirm: {
				label: A("action.delete"),
				danger: !0
			}
		}) && E("system", () => j.remove(e), A("system.removed", { version: e }));
	}
	let B = () => E("restart", async () => {
		let e = Me();
		await u.restart(), await new Promise((e) => setTimeout(e, 2500)), e && y.requestRestart?.(A("restart.kernelReason"), "kernel-modules");
	}, A("done.kernelRestarted"));
	async function pt(e) {
		await E("language", () => M.install(e.language), null) && ht(e);
	}
	let mt = (e) => E("language", () => M.install(e.language), (t) => A("languages.updated", {
		name: e.name,
		version: t?.version ?? e.update
	}));
	async function ht(t) {
		await e.locale?.refresh?.(), e.locale?.language !== t.language && await L({
			title: A("languages.offerTitle", { name: t.name }),
			text: [A("languages.offerLead", {
				name: t.name,
				title: t.title
			}), A("languages.offerHint")],
			confirm: {
				label: A("languages.use"),
				primary: !0
			},
			cancel: A("action.later")
		}) && gt(t);
	}
	async function gt(t) {
		await e.locale?.refresh?.(), m.set("language", t.language);
	}
	async function _t(e) {
		await L({
			title: A("languages.removeTitle", { name: e.name }),
			text: [A("languages.removeLead", {
				name: e.name,
				title: e.title
			}), A("languages.removeEnglish")],
			confirm: {
				label: A("action.remove"),
				danger: !0
			}
		}) && E("language", () => M.remove(e.language), e.inUse ? null : A("languages.removed", { name: e.name }));
	}
	async function vt() {
		M && (w.packs = await M.list().catch(() => w.packs), $());
	}
	let V = (e, t, { key: r = "", ...i } = {}) => {
		let a = `${e}|${r}`, o = n({
			label: e,
			onClick: () => (w.pressed = a, t()),
			...i
		});
		return o.disabled = !!w.busy, w.busy && w.pressed === a && o.setAttribute("aria-busy", "true"), o;
	}, H = (e, t = !1) => s("span", { class: "as-state" }, t ? c("check") : null, e), U = (e) => e.repo ? s("span", {
		class: "as-repo",
		title: e.repo.url
	}, c("link"), s("span", {}, P(e.repo))) : e.kind === "language" ? null : s("span", { class: "as-repo" }, c("folder"), s("span", {}, e.kind === "module" ? A("repo.manual") : A("repo.localFolder"))), yt = (e) => e.repo && !e.repo.official ? s("span", { class: "as-unofficial" }, A("repo.unofficial")) : null, W = (e) => e.kind === "system" ? A("system.inUse") : e.kind === "module" ? A("status.installedModule") : e.kind === "language" ? A("status.installedLanguage") : A("status.installedApp"), G = (e, ...t) => s("div", { class: "as-section-title" }, e, ...t), K = (e, t) => s("div", { class: "as-fact" }, s("b", {}, e), String(t)), bt = (e) => s("button", {
		class: "as-back",
		onclick: () => Q("list")
	}, c("arrowLeft"), e);
	function xt(e) {
		return e.kind === "language" ? e.update ? V(A("action.update"), () => mt(e), {
			primary: !0,
			key: e.key
		}) : e.here ? H(e.inUse ? A("languages.inUse") : W(e), !0) : e.entry ? V(A("action.install"), () => pt(e), { key: e.key }) : null : e.kind === "system" ? e.update ? C ? V(A("action.update"), () => ut(e), {
			primary: !0,
			key: e.key
		}) : H(A("status.updateAvailable", { version: e.update })) : I() ? H(A("system.nextShort", { version: I() })) : H(A("system.inUse"), !0) : e.replacedBy ? C ? V(A("action.installName", { name: e.replacedBy.name }), () => R(e.replacedBy), {
			primary: !0,
			key: e.key
		}) : H(A("status.replacedBy", { name: e.replacedBy.name })) : e.update ? C ? V(A("action.update"), () => et(e), {
			primary: !0,
			key: e.key
		}) : H(A("status.updateAvailable", { version: e.update })) : e.here ? H(e.kind === "module" && !e.have.enabled ? A("status.removed") : W(e), !0) : e.elsewhere ? H(A("status.otherRepo")) : C ? V(A("action.install"), () => R(e), { key: e.key }) : H(A("status.available"));
	}
	function St(e, { uninstall: t = !1 } = {}) {
		let n = e.replacedBy ? `${e.installed} → ${A("status.replacedBy", { name: e.replacedBy.name })}` : e.update ? `${e.installed} → ${e.update}` : e.here ? e.installed : e.offered, i = t && it(e) ? V(A("action.uninstall"), () => rt(e), {
			danger: !0,
			key: e.key
		}) : null;
		return s("div", { class: "as-card" }, s("div", { class: "as-card-top" }, r(e.icon), s("div", { class: "as-card-head" }, s("button", {
			class: "as-card-open",
			onclick: () => Q("detail", e.key)
		}, e.name, s("span", { class: "as-ver" }, n)), s("div", { class: "as-card-desc" }, e.description))), s("div", { class: "as-card-foot" }, U(e), yt(e), s("span", { class: "as-spacer" }), i && !e.update ? null : xt(e), i));
	}
	let q = (e, t) => s("div", { class: "as-grid" }, ...e.map((e) => St(e, t)));
	function J() {
		let e = [];
		I() && [
			"installed",
			"updates",
			"system"
		].includes(w.tab) && e.push(s("div", { class: "as-banner" }, c("info"), s("span", {}, A("banner.systemRestart", { version: I() })), V(A("action.restartKernel"), B, {
			primary: !0,
			key: "system"
		}))), Me() && [
			"installed",
			"updates",
			"kernel"
		].includes(w.tab) && e.push(s("div", { class: "as-banner" }, c("info"), s("span", {}, A("banner.restartNeeded")), V(A("action.restartKernel"), B, { primary: !0 })));
		let t = be().filter((e) => w.errors.has(e.id));
		t.length && e.push(s("div", { class: "as-banner" }, c("info"), s("span", {}, t.length === 1 ? A("banner.repoUnreachable", { name: P(t[0]) }) : A("banner.reposUnreachable", { n: t.length })), s("button", {
			class: "as-link",
			onclick: () => Q("options")
		}, A("action.details"))));
		let n = w.repos.filter((e) => !F(e));
		return n.length && w.tab !== "installed" && e.push(s("div", { class: "as-banner" }, c("info"), s("span", {}, n.some((e) => e.official) ? A("banner.officialDisabled") : A("banner.reposDisabled", { n: n.length })), s("button", {
			class: "as-link",
			onclick: () => Q("options")
		}, A("options.title")))), e;
	}
	function Ct(e, t) {
		let n = (w.query[t.id] ?? "").trim().toLowerCase(), r = e.filter(t.filter).filter((e) => je(e, n));
		if (Z.textContent = w.loading ? A("list.reading") : `${A("list.items", { n: r.length })} · ${A("list.repos", { n: be().length })}`, t.id === "languages") {
			let e = w.loading ? A("list.reading") : n ? A("list.noResults", {
				query: n,
				tab: t.label
			}) : A("languages.empty");
			return [
				...J(),
				s("p", { class: "as-lead" }, A("languages.lead")),
				r.length ? q([...r].sort((e, t) => e.title.localeCompare(t.title))) : s("div", { class: "as-empty" }, e)
			];
		}
		if (!r.length) {
			let e = w.loading && t.id !== "installed" ? A("list.reading") : n ? A("list.noResults", {
				query: n,
				tab: t.label
			}) : t.id === "updates" ? A("list.upToDate") : t.id === "installed" ? A("list.nothingInstalled") : A("list.emptyCategory");
			return [...J(), s("div", { class: "as-empty" }, e)];
		}
		if (t.id === "installed") {
			let e = r.filter((e) => e.kind === "app"), t = r.filter((e) => e.kind === "module"), n = r.filter((e) => e.kind === "system"), i = r.filter((e) => e.kind === "language");
			return [
				...J(),
				n.length ? [G("lilOS"), q(n)] : null,
				e.length ? [G(A("list.apps")), q(e, { uninstall: !0 })] : null,
				t.length ? [G(A("list.modules")), q(t)] : null,
				i.length ? [G(A("list.languages")), q(i)] : null
			];
		}
		if (t.id === "updates") {
			let e = r.filter((e) => C || e.kind === "language");
			return [
				...J(),
				G(A("list.updates", { n: r.length }), e.length > 1 ? s("span", { class: "as-bulk" }, V(A("action.updateAll"), () => tt(e), { primary: !0 })) : null),
				q(r)
			];
		}
		let i = (e) => Number(e.here || e.elsewhere);
		return [...J(), q([...r].sort((e, t) => i(e) - i(t) || e.name.localeCompare(t.name)))];
	}
	function wt(e, t) {
		let n = e.have, i = n.mode === "installed", a = I(), o = [];
		C && e.update && o.push(V(A("action.updateTo", { version: e.update }), () => ut(e), {
			primary: !0,
			key: e.key
		}));
		let l = C && i ? (n.releases ?? []).filter((e) => e !== n.version) : [], u = (e) => s("div", { class: "as-row" }, s("div", { class: "as-row-text" }, s("b", {}, `lilOS ${e}`), s("span", {}, e === a ? A("system.next", { version: e }) : e === n.failed?.version ? A("system.keptFailed") : A("system.keptHint"))), e === a ? V(A("system.cancelNext"), () => dt(n.version), { key: e }) : V(A("system.use"), () => dt(e), { key: e }), e === a ? null : V(A("action.delete"), () => ft(e), {
			danger: !0,
			key: e
		}));
		return Z.textContent = `lilOS ${n.version}`, s("div", { class: "as-detail" }, bt(t.label), s("div", { class: "as-detail-head" }, r(e.icon), s("div", { class: "as-detail-title" }, s("h1", {}, "lilOS"), s("div", { class: "as-sub" }, A("detail.kindSystem")), s("div", { class: "as-meta" }, U(e), s("span", { class: "as-state" }, c("shield"), A("detail.verified")), s("span", { class: "as-state" }, A("detail.required"))), o.length ? s("div", { class: "as-detail-actions" }, ...o) : null)), a ? s("div", { class: "as-banner" }, c("info"), s("span", {}, A("banner.systemRestart", { version: a })), V(A("action.restartKernel"), B, {
			primary: !0,
			key: "system"
		})) : null, C && n.failed ? s("div", { class: "as-banner" }, c("warning"), s("span", {}, A("system.failed", {
			version: n.failed.version,
			reason: n.failed.reason,
			current: n.version
		}))) : null, i ? null : s("div", { class: "as-banner" }, c("info"), s("span", {}, A("system.development"))), s("div", { class: "as-facts" }, K(A("system.inUse"), n.version), K(A("detail.version"), e.offered ?? "—"), K(A("detail.repository"), e.repo ? P(e.repo) : "—"), K(A("detail.state"), a ? A("system.next", { version: a }) : A(i ? "system.installedMode" : "system.developmentMode"))), l.length ? [G(A("system.kept")), s("div", { class: "as-group" }, ...l.map(u))] : null, s("div", { class: "as-perm" }, s("h3", {}, c("info"), A("detail.warning")), s("p", {}, A("system.warning"))), e.changelog ? [s("div", { class: "as-readme-title" }, c("file"), "CHANGELOG.md"), s("article", { class: "as-readme" }, ...O(e.changelog))] : null, e.changelog && e.changelogTruncated ? s("p", { class: "as-readme-cut" }, A("readme.truncated"), " ", s("button", {
			class: "as-link",
			onclick: (t) => ct(e, t.currentTarget)
		}, c("download"), A("readme.download"))) : null, s("div", { class: "as-readme-title" }, c("file"), "README.md"), e.readme ? s("article", { class: "as-readme" }, ...O(e.readme)) : s("p", { class: "as-muted" }, e.repo ? A("readme.none") : A("readme.notFromRepo")), e.readme && e.readmeTruncated ? s("p", { class: "as-readme-cut" }, A("readme.truncated"), " ", s("button", {
			class: "as-link",
			onclick: (t) => st(e, t.currentTarget)
		}, c("download"), A("readme.download"))) : null);
	}
	function Tt(e, t) {
		let n = [];
		e.here && !e.inUse && n.push(V(A("languages.use"), () => gt(e), {
			primary: !e.update,
			key: e.key
		})), e.update && n.push(V(A("action.updateTo", { version: e.update }), () => mt(e), {
			primary: !0,
			key: e.key
		})), !e.here && e.entry && n.push(V(A("action.install"), () => pt(e), {
			primary: !0,
			key: e.key
		})), e.here && e.canRemove && n.push(V(A("action.remove"), () => _t(e), {
			danger: !0,
			key: e.key
		}));
		let i = e.inUse ? A("languages.inUse") : e.update ? A("languages.updateAvailable", {
			from: e.installed,
			to: e.update
		}) : e.here ? A("status.installedLanguage") : A("languages.notInstalled"), a = e.have?.installedBy?.username ?? null;
		return Z.textContent = `${e.name} ${e.offered ?? e.installed}`, s("div", { class: "as-detail" }, bt(t.label), s("div", { class: "as-detail-head" }, r(e.icon), s("div", { class: "as-detail-title" }, s("h1", {
			lang: e.language,
			dir: e.rtl ? "rtl" : null
		}, e.name), s("div", { class: "as-sub" }, [e.title, A("detail.kindLanguage")].join(" · ")), s("div", { class: "as-meta" }, U(e), s("span", { class: "as-state" }, c("shield"), A("detail.verified")), e.rtl ? s("span", { class: "as-state" }, A("languages.rtl")) : null), n.length ? s("div", { class: "as-detail-actions" }, ...n) : null)), s("div", { class: "as-facts" }, K(A("detail.version"), e.offered ?? e.installed), K(W(e), e.installed ?? "—"), K(A("languages.code"), e.language), K(A("detail.state"), i), e.here ? K(A("languages.installedByLabel"), a ?? "—") : null, e.lilos ? K(A("languages.needs"), `lilOS ${e.lilos}`) : null), s("div", { class: "as-perm" }, s("h3", {}, c("info"), A("languages.aboutTitle")), s("p", {}, A("languages.about")), e.here && !e.canRemove ? s("p", { class: "as-muted" }, a ? A("languages.removeOnly", { name: a }) : A("languages.removeAdmin")) : null), s("div", { class: "as-readme-title" }, c("file"), "README.md"), e.readme ? s("article", { class: "as-readme" }, ...O(e.readme)) : s("p", { class: "as-muted" }, e.entry ? A("readme.none") : A("languages.notOffered")));
	}
	function Et(e, t) {
		if (e.kind === "system") return wt(e, t);
		if (e.kind === "language") return Tt(e, t);
		let n = e.kind === "module", a = [];
		e.here && !n && a.push(V(A("action.open"), () => ee(e.id), { primary: !e.update || !C })), C && (e.replacedBy ? a.push(V(A("action.installName", { name: e.replacedBy.name }), () => R(e.replacedBy), {
			primary: !0,
			key: e.key
		})) : e.update && a.push(V(A("action.updateTo", { version: e.update }), () => et(e), {
			primary: !0,
			key: e.key
		})), e.here && (!n || e.have.enabled) && (!Ae(e) && e.have.source && a.push(V(A("action.checkUpdates"), () => et(e), { key: e.key })), n || a.push(V(A("action.reinstall"), () => at(e), { key: e.key })), e.required || a.push(V(A(n ? "action.remove" : "action.uninstall"), () => rt(e), {
			danger: !0,
			key: e.key
		}))), !e.here && !e.elsewhere && e.entry && a.push(V(e.repo.official ? A("action.install") : A("action.installAnyway"), () => R(e), {
			primary: !0,
			danger: !e.repo.official,
			key: e.key
		})));
		let o = n && e.have ? e.replacedBy ? A("status.replacedBy", { name: e.replacedBy.name }) : e.have.enabled ? e.have.running === e.have.enabled ? A("moduleState.inUse") : e.have.running ? A("moduleState.oldUntilRestart", { version: e.have.running }) : A("moduleState.nextStart") : A("moduleState.removed") : null, l = S(e.manifest?.permissions), u = (n ? e.module?.dependencies : e.shown?.dependencies ?? e.manifest?.dependencies) ?? [], d = e.here && !n ? i.get(e.id)?.unmet ?? [] : [];
		return Z.textContent = `${e.name} ${e.offered ?? e.installed}`, s("div", { class: "as-detail" }, bt(t.label), s("div", { class: "as-detail-head" }, r(e.icon), s("div", { class: "as-detail-title" }, s("h1", {}, e.name), s("div", { class: "as-sub" }, [
			e.publisher,
			A(n ? "detail.kindModule" : "detail.kindApp"),
			ne().find((t) => t.id === e.category)?.label
		].filter(Boolean).join(" · ")), s("div", { class: "as-meta" }, U(e), e.verified ? s("span", { class: "as-state" }, c("shield"), A("detail.verified")) : e.repo ? s("span", { class: "as-unofficial" }, A("detail.unverified")) : null, e.required ? s("span", { class: "as-state" }, A("detail.required")) : null, e.elsewhere ? s("span", { class: "as-state" }, A(n ? "status.installedElsewhereModule" : "status.installedElsewhereApp")) : null), a.length ? s("div", { class: "as-detail-actions" }, ...a) : null)), e.repo && !e.repo.official && !e.here ? s("div", { class: "as-banner" }, c("info"), s("span", {}, A("detail.unofficialWarning"))) : null, d.length ? s("div", { class: "as-banner" }, c("warning"), s("span", {}, d.every((e) => e.why === "restart") ? A("deps.unmetRestart", {
			name: e.name,
			list: d.map((e) => e.id).join(", ")
		}) : A("deps.unmetMissing", {
			name: e.name,
			list: d.map((e) => e.id).join(", ")
		})), C && d.some((e) => e.why === "restart") ? V(A("action.restartKernel"), B, {
			primary: !0,
			key: "unmet"
		}) : null) : null, s("div", { class: "as-facts" }, K(A("detail.version"), e.offered ?? e.installed), K(W(e), e.installed ?? "—"), K(A("detail.repository"), e.repo ? P(e.repo) : "—"), n ? K(A("detail.provides"), e.provides.join(", ") || "—") : K(A("detail.id"), e.id), o ? K(A("detail.state"), o) : null), n ? s("div", { class: "as-perm" }, s("h3", {}, c("info"), A("detail.warning")), s("p", {}, A("detail.moduleWarning"))) : s("div", { class: "as-perm" }, s("h3", {}, c("shield"), A("detail.mayDo")), l.length ? s("ul", {}, ...l.map((e) => s("li", {}, c("check"), x(e)))) : s("p", { class: "as-muted" }, A("permissions.none"))), u.length ? Dt(u) : null, s("div", { class: "as-readme-title" }, c("file"), "README.md"), e.readme ? s("article", { class: "as-readme" }, ...O(e.readme)) : null, e.readme && e.readmeTruncated ? s("p", { class: "as-readme-cut" }, A("readme.truncated"), " ", s("button", {
			class: "as-link",
			onclick: (t) => st(e, t.currentTarget)
		}, c("download"), A("readme.download"))) : null, e.readme ? null : s("p", { class: "as-muted" }, e.repo ? A("readme.none") : A("readme.notFromRepo")));
	}
	function Dt(e) {
		let t = (e) => {
			if (e.app !== void 0) {
				let t = i.get(e.app);
				return t ? {
					ok: !0,
					text: A("deps.stateInstalled", { version: t.version })
				} : {
					ok: !1,
					text: A("deps.stateMissing")
				};
			}
			if (!C) return null;
			let t = w.modules.find((t) => t.name === e.module && t.enabled);
			return t ? {
				ok: !0,
				text: t.running === t.enabled ? A("deps.stateInstalled", { version: t.enabled }) : A("deps.stateRestart")
			} : {
				ok: !1,
				text: A("deps.stateMissing")
			};
		};
		return s("div", { class: "as-perm" }, s("h3", {}, c("link"), A("deps.title")), s("ul", {}, ...e.map((e) => {
			let n = t(e);
			return s("li", {}, c(n && !n.ok ? "info" : "check"), s("span", {}, s("b", {}, e.app === void 0 ? e.module : Be(e.app)), e.version ? ` ${e.version}` : "", ` · ${Ue(e.module === void 0 ? "app" : "module")}`, e.optional ? ` · ${A("deps.optionalTag")}` : "", e.reason ? s("span", { class: "as-muted" }, ` — ${e.reason}`) : null, n ? s("span", { class: "as-muted" }, ` (${n.text})`) : null));
		})));
	}
	function Ot() {
		let e = w.updateTask, t = he(e) ?? "daily", n = v({
			value: !!e?.enabled,
			label: A("updates.check"),
			onChange: (e) => ge({ on: e })
		}), r = [
			{
				value: "daily",
				label: A("updates.daily")
			},
			{
				value: "weekly",
				label: A("updates.weekly")
			},
			...t === "other" ? [{
				value: "other",
				label: A("updates.other")
			}] : []
		], i = s("select", {
			class: "ctl-select",
			"aria-label": A("updates.when")
		}, r.map((e) => s("option", {
			value: e.value,
			selected: e.value === t
		}, e.label)));
		i.disabled = !e?.enabled, i.addEventListener("change", () => {
			i.value !== "other" && ge({ every: i.value });
		});
		let a = s("button", {
			class: "as-link",
			type: "button",
			style: "background:none;border:0;padding:0;cursor:pointer;width:max-content",
			onclick: () => ee("scheduler", { task: e?.id }, "main")
		}, A("updates.inScheduler"));
		return s("div", { class: "as-row" }, s("div", { class: "as-row-text" }, s("b", {}, A("updates.check")), s("span", {}, A("updates.taskHint")), e ? a : null), i, n);
	}
	function kt() {
		if (k && w.updates) return Ot();
		let e = w.updates, t = !e || e.system && !e.canControl, n = e ? e.system ? A("updates.bySystem") : A("updates.description") : A("updates.needsEngine"), r = v({
			value: !!e && e.startup !== "none",
			label: A("updates.atStart"),
			onChange: _e
		});
		return r.disabled = t, s("div", { class: "as-row" }, s("div", { class: "as-row-text" }, s("b", {}, A("updates.atStart")), s("span", {}, n)), r);
	}
	function At(e) {
		let t = w.newRepo;
		return Z.textContent = A("options.title"), s("div", { class: "as-options" }, bt(e.label), s("h2", {}, A("options.title")), s("p", { class: "as-lead" }, A("options.lead")), G("AppStore"), s("div", { class: "as-group" }, s("div", { class: "as-row" }, s("div", { class: "as-row-text" }, s("b", {}, A("options.showUnofficial")), s("span", {}, A("options.showUnofficialHint"))), v({
			value: m.get("appstore.showUnofficial"),
			label: A("options.showUnofficial"),
			onChange: (e) => m.set("appstore.showUnofficial", e)
		})), kt()), G(A("options.repositories"), s("span", { class: "as-bulk" }, V(A("action.reload"), () => ye()))), s("div", { class: "as-group" }, ...w.repos.map((e) => {
			let t = F(e), n = w.catalogs.get(e.id), i = (e) => (e ?? []).filter((e) => !e.error).length, a = [
				...n?.apps ?? [],
				...n?.modules ?? [],
				...n?.languages ?? []
			].filter((e) => e.error), o = t ? w.errors.has(e.id) ? A("options.unreachable", { error: w.errors.get(e.id) }) : n ? [
				A("options.apps", { n: i(n.apps) }),
				A("options.modules", { n: i(n.modules) }),
				i(n.languages) ? A("options.languages", { n: i(n.languages) }) : null,
				a.length ? A("options.invalid", { n: a.length }) : null
			].filter(Boolean).join(" · ") : A("options.reading") : A("options.disabled");
			return s("div", { class: t ? "as-row" : "as-row as-row-off" }, r(e.official ? {
				glyph: "shield",
				color: "#30a46c"
			} : {
				glyph: "link",
				color: "#8a909b"
			}), s("div", { class: "as-row-text" }, s("b", {}, P(e), s("span", { class: "as-muted" }, ` · ${e.name}`)), s("span", {}, e.url), s("span", {
				class: t && w.errors.has(e.id) ? "as-error" : null,
				title: t && a.map((e) => `${e.path}: ${e.error}`).join("\n") || null
			}, o)), e.official ? s("span", { class: "as-muted" }, A("options.alwaysThere")) : C ? V(A("action.remove"), () => E("repo", () => p.remove(e.id), A("done.repoRemoved", { name: P(e) })), {
				danger: !0,
				key: e.id
			}) : null, Object.assign(v({
				value: t,
				label: A("options.active", { name: P(e) }),
				onChange: (t) => xe(e, t)
			}), { id: `as-repo-${e.id}` }));
		})), G(A("options.addRepo")), C ? s("div", { class: "as-group" }, s("div", { class: "as-row" }, s("div", { class: "as-row-text" }, s("b", {}, A("options.address")), s("span", {}, A("options.addressHint"))), g({
			value: t.url,
			placeholder: "https://…",
			label: A("options.addressLabel"),
			onInput: (e) => {
				t.url = e;
			}
		})), s("div", { class: "as-row" }, s("div", { class: "as-row-text" }, s("b", {}, A("options.name")), s("span", {}, A("options.nameHint"))), g({
			value: t.name,
			placeholder: A("options.name"),
			label: A("options.nameLabel"),
			onInput: (e) => {
				t.name = e;
			}
		})), s("div", { class: "as-row as-row-end" }, V(A("action.add"), () => E("repo", async () => {
			let e = await p.add(t.url.trim(), t.name.trim() || void 0);
			return w.newRepo = {
				url: "",
				name: ""
			}, e;
		}, (e) => A("done.repoAdded", { name: P(e) })), { primary: !0 }))) : s("p", { class: "as-muted" }, A("options.adminOnly")));
	}
	let Y = s("input", {
		type: "search",
		autocomplete: "off",
		spellcheck: "false",
		"aria-label": A("search.label")
	}), X = s("div", {
		class: "as-tabs",
		role: "tablist"
	}), jt = s("main", { class: "as-main" }), Z = s("span", { class: "as-foot-text" });
	T.body.append(s("div", { class: "as-head" }, s("label", { class: "as-search" }, c("search"), Y), X), jt, s("footer", { class: "as-foot" }, Z, s("span", { class: "as-spacer" }), s("button", {
		class: "as-link",
		onclick: () => Q("options")
	}, c("gear"), A("options.title"))));
	function Q(e, t = null) {
		w.view = e, w.key = t, $(), jt.scrollTop = 0;
	}
	function Mt(e) {
		w.tab = e, Q("list");
	}
	Y.addEventListener("input", () => {
		w.query[w.tab] = Y.value, w.view = "list", $();
	}), Y.addEventListener("keydown", (e) => {
		e.key === "Escape" && Y.value && (e.stopPropagation(), Y.value = "", Y.dispatchEvent(new Event("input")));
	}), X.addEventListener("keydown", (e) => {
		if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
		let t = [...X.querySelectorAll("[role=tab]")];
		t[(t.indexOf(document.activeElement) + (e.key === "ArrowRight" ? 1 : -1) + t.length) % t.length].click(), X.querySelector("[tabindex=\"0\"]")?.focus();
	});
	function $() {
		let e = Oe(), t = ke(e);
		t.some((e) => e.id === w.tab) || (w.tab = "installed");
		let n = t.find((e) => e.id === w.tab), r = e.filter(Ae).length;
		X.replaceChildren(...t.flatMap((e, n) => [e.category && !t[n - 1].category || e.separate ? s("span", { class: "as-tab-sep" }) : null, s("button", {
			class: "as-tab",
			role: "tab",
			"aria-selected": String(w.view === "list" && e.id === w.tab),
			tabindex: e.id === w.tab ? "0" : "-1",
			onclick: () => Mt(e.id)
		}, e.label, e.badge && r ? s("span", { class: "as-count" }, String(r)) : null)].filter(Boolean))), Y.placeholder = A("search.placeholder", { tab: n.label }), Y.value !== (w.query[w.tab] ?? "") && (Y.value = w.query[w.tab] ?? "");
		let i = w.view === "detail" ? e.find((e) => e.key === w.key) : null;
		w.view === "detail" && !i && (w.view = "list");
		let a = w.view === "options" ? At(n) : i ? Et(i, n) : Ct(e, n);
		jt.replaceChildren(...[a].flat(3).filter(Boolean));
	}
	let Nt = (e) => {
		let t = {
			apps: "installed",
			modules: "kernel"
		}[e?.tab] ?? e?.tab;
		t === "repos" || t === "options" ? Q("options") : typeof t == "string" && Mt(t);
	};
	T.on("launch", Nt);
	let Pt = i.on("change", () => $()), Ft = m.on("change:appstore.showUnofficial", () => $()), It = y.services?.on("change", (e) => {
		e.app === "appstore" && D().then($);
	}), Lt = e.locale?.on?.("languages", vt), Rt = e.locale?.on?.("change", () => $());
	return T.on("destroy", () => {
		Pt(), Ft(), It?.(), Lt?.(), Rt?.();
	}), $(), Nt(te), ye(), T;
}
export { de as default };
