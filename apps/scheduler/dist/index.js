import * as e from "/host/sdk.js";
import { Window as t, actionButton as n, checkbox as r, fs as i, h as a, icon as o, messageBox as s, radios as c, schedule as l, segmented as u, selectField as d, session as f, textField as p, toggle as m } from "/host/sdk.js";
import * as h from "/host/system.js";
// src/shared/i18n.js
function g(t, n) {
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
// src/scheduler/i18n.js
var _ = g("scheduler", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Scheduler\",\"@description\":\"Operations at a date and time or repeated, also with lilOS closed: reminders, backups of folders, web requests, NetTest collections, Terminal commands, apps' services, opening apps and files, automations.\",\"@menus.scheduler.plan.label\":\"Schedule\",\"@actions.scheduler.copyFolder.label\":\"Copy this folder…\",\"@actions.scheduler.commandHere.label\":\"Command in this folder…\",\"@actions.scheduler.openFolder.label\":\"Open it…\",\"@actions.scheduler.runAutomation.label\":\"Run this automation…\",\"@actions.scheduler.openFile.label\":\"Open this file…\",\"@actions.scheduler.remind.label\":\"Reminder about it…\",\"@entrypoints.edit.label\":\"Edit an operation\",\"@entrypoints.create.label\":\"New operation\",\"@entrypoints.history.label\":\"History\",\"@entrypoints.open.label\":\"Open what a reminder says\",\"@dependencies.scheduler.reason\":\"Runs the operations in the kernel, also with lilOS closed\",\"app.name\":\"Scheduler\",\"needsKernel\":\"The Scheduler needs lilOS connected to its kernel.\",\"tools.new\":\"New operation\",\"tools.run\":\"Run now\",\"tools.pause\":\"Pause\",\"tools.resume\":\"Resume\",\"tools.search\":\"Search\",\"tabs.list\":\"List\",\"tabs.history\":\"History\",\"side.label\":\"Filters\",\"side.operations\":\"Operations\",\"side.all\":\"All\",\"side.active\":\"Active\",\"side.paused\":\"Paused\",\"side.failed\":\"Failed\",\"side.system\":\"System\",\"side.users\":\"Users\",\"side.madeBy\":\"Made by\",\"side.mine\":\"Me\",\"side.apps\":\"My apps\",\"side.where\":\"Runs in\",\"side.words\":\"In words\",\"side.next\":\"Next times\",\"side.noMore\":\"It will not run again.\",\"side.cron\":\"As cron\",\"side.what\":\"What\",\"side.browser\":\"This runs in the browser: lilOS must be open then. If it is not, it waits for the next time you open it.\",\"where.kernel\":\"kernel\",\"where.browser\":\"browser\",\"owner.system\":\"System\",\"owner.me\":\"me\",\"owner.meNamed\":\"{name} (me)\",\"grp.system\":\"run without a user\",\"grp.count\":{\"one\":\"{n} operation\",\"other\":\"{n} operations\"},\"col.name\":\"Name\",\"col.when\":\"When\",\"col.next\":\"Next\",\"col.last\":\"Last\",\"row.byApp\":\"made by {app}\",\"state.paused\":\"Paused\",\"state.ok\":\"done\",\"state.error\":\"failed\",\"state.skipped\":\"skipped\",\"state.waiting\":\"waiting for lilOS\",\"state.running\":\"running\",\"state.queued\":\"queued\",\"state.cancelled\":\"cancelled\",\"last.failed\":\"Failed {when}\",\"next.done\":\"Finished\",\"list.noneHere\":\"No operation here.\",\"welcome.title\":\"Nothing scheduled yet\",\"welcome.text\":\"An operation does something at a date and time, or again and again: a reminder, a backup of a folder, a web request, a command… also with lilOS closed.\",\"status.module\":\"Scheduler module on\",\"status.count\":{\"one\":\"{n} operation, {active} active\",\"other\":\"{n} operations, {active} active\"},\"detail.label\":\"The chosen operation\",\"detail.when\":\"When\",\"detail.what\":\"What\",\"detail.runs\":\"Runs\",\"detail.inKernel\":\"In the kernel, also with lilOS closed, as {who}\",\"detail.inBrowser\":\"In the browser, with lilOS open, as {who}\",\"detail.missed\":\"If missed\",\"detail.missedOnce\":\"Made up once when the kernel is back\",\"detail.missedSkip\":\"Skipped\",\"detail.by\":\"Changed by\",\"detail.next\":\"Next\",\"detail.last\":{\"one\":\"Last run\",\"other\":\"Last {n} runs\"},\"detail.edit\":\"Edit\",\"detail.duplicate\":\"Duplicate\",\"detail.delete\":\"Delete\",\"detail.othersNote\":\"It runs as {who}, with their files and connections. When you change, pause or delete it, they get a notification.\",\"delete.title\":\"Delete «{name}»?\",\"delete.text\":\"It will not run any more, and its history goes too.\",\"error.title\":\"Not done\",\"error.save\":\"Not saved\",\"history.task\":\"Operation\",\"history.state\":\"Result\",\"history.allTasks\":\"All the operations\",\"history.allStates\":\"All the results\",\"history.what\":\"Operation and result\",\"history.took\":\"Took\",\"history.how\":\"Why\",\"history.none\":\"No run yet.\",\"history.catchup\":\"It was due {due}: the kernel was off. {text}\",\"reason.time\":\"on time\",\"reason.catchup\":\"made up\",\"reason.manual\":\"by hand\",\"reason.retry\":\"retry {n}\",\"time.today\":\"today {time}\",\"time.tomorrow\":\"tomorrow {time}\",\"time.yesterday\":\"yesterday {time}\",\"dur.s\":\"{s} s\",\"dur.ms\":\"{m} min {s} s\",\"dur.hm\":\"{h} h {m} min\",\"what.notify\":\"Reminder: {text}\",\"what.service\":\"Service of {app} · {label}\",\"what.copy.versions\":\"Copy {from} → {to}, dated versions\",\"what.copy.update\":\"Copy {from} → {to}, update\",\"what.copy.mirror\":\"Copy {from} → {to}, mirror\",\"what.command\":\"Command: {line}\",\"what.commandSsh\":\"SSH {host}: {line}\",\"what.openFile\":\"Open {file}\",\"what.openApp\":\"Open {app}\",\"what.automation\":\"Automation {file}\",\"kind.notify.name\":\"Reminder\",\"kind.notify.hint\":\"A notification, maybe with a file or an app to open\",\"kind.service.name\":\"An app's service\",\"kind.service.hint\":\"Starts a service of the installed apps, with its values\",\"kind.copy.name\":\"Copy a folder\",\"kind.copy.hint\":\"A backup into another folder or into Network\",\"kind.command.name\":\"Terminal command\",\"kind.command.hint\":\"Shell lines in lilOS, or on a saved SSH host\",\"kind.web.name\":\"Web request\",\"kind.web.hint\":\"Calls an address and checks the answer\",\"kind.open.name\":\"Open an app or a file\",\"kind.open.hint\":\"Needs lilOS open in a tab\",\"kind.automation.name\":\"Automation\",\"kind.automation.hint\":\"An automation of Automata\",\"kind.automation.missing\":\"Install Automata first\",\"editor.titleNew\":\"New operation\",\"editor.titleEdit\":\"Edit operation\",\"editor.loading\":\"Loading…\",\"editor.copyOf\":\"{name} (copy)\",\"editor.choose\":\"Choose…\",\"editor.back\":\"Back\",\"editor.next\":\"Next\",\"editor.cancel\":\"Cancel\",\"editor.create\":\"Create\",\"editor.save\":\"Save\",\"editor.suggest.copy\":\"Backup of {from}\",\"editor.proposedBy\":\"Proposed by {app}: check it before saving.\",\"step.what\":\"What\",\"step.when\":\"When\",\"step.options\":\"Options\",\"notify.text\":\"Text\",\"notify.level\":\"Kind\",\"notify.open\":\"A click opens\",\"notify.openNone\":\"Nothing\",\"notify.openFile\":\"A file\",\"notify.openApp\":\"An app\",\"notify.file\":\"File\",\"notify.app\":\"App\",\"level.info\":\"Information\",\"level.success\":\"Success\",\"level.warning\":\"Warning\",\"level.error\":\"Error\",\"service.which\":\"Service\",\"service.noParams\":\"This service has no values to choose.\",\"service.hint\":\"It runs in the kernel, also with lilOS closed. A service that was off starts for the run and stops after it.\",\"copy.from\":\"Copy\",\"copy.to\":\"Into\",\"copy.how\":\"How\",\"copy.versions\":\"Dated versions: a new folder each time, keeping the last {keep}\",\"copy.update\":\"Update: only the files that are new or changed, in one folder\",\"copy.mirror\":\"Mirror: as Update, and what is gone from the source goes from the copy (into the trash, in lilOS)\",\"copy.keep\":\"Versions to keep\",\"copy.exclude\":\"Leave out\",\"copy.excludeHint\":\"Names, with * and ?, separated by commas\",\"copy.hint\":\"The kernel copies, also with lilOS closed. The copy goes into a folder with the name of the one copied.\",\"command.where\":\"Where\",\"command.inLilos\":\"In lilOS\",\"command.onSsh\":\"On an SSH host\",\"command.host\":\"Host\",\"command.lines\":\"Commands\",\"command.placeholder\":\"# one command per line, as in the Terminal\",\"command.hint\":\"The Terminal's shell, in the kernel, as you. Files protected by an app (FileCrypt) are not opened here.\",\"command.sshHint\":\"With the credentials saved in the Terminal for that host.\",\"command.cwd\":\"Starting folder\",\"saveTo.title\":\"Save\",\"saveTo.web\":\"Save the answer in a file\",\"saveTo.command\":\"Save the output in a file\",\"saveTo.folder\":\"Folder\",\"saveTo.name\":\"File name\",\"saveTo.mode\":\"Each time\",\"saveTo.replace\":\"replace it\",\"saveTo.append\":\"add at the end\",\"saveTo.dated\":\"a new one with the date\",\"web.method\":\"Method\",\"web.url\":\"Address\",\"web.headers\":\"Headers\",\"web.headerName\":\"Name\",\"web.headerValue\":\"Value\",\"web.secret\":\"secret\",\"web.secretHint\":\"Kept encrypted in the kernel, never shown again\",\"web.change\":\"Change\",\"web.removeHeader\":\"Remove the header\",\"web.addHeader\":\"Header\",\"web.body\":\"Body\",\"web.body.none\":\"None\",\"web.body.text\":\"Text\",\"web.body.json\":\"JSON\",\"web.body.form\":\"Form\",\"web.status\":\"Done when the status is\",\"web.anyStatus\":\"any\",\"web.exactStatus\":\"exactly…\",\"web.contains\":\"and the answer contains\",\"web.containsPh\":\"optional\",\"web.timeout\":\"Time limit\",\"web.seconds\":\"seconds\",\"web.hint\":\"The history keeps the status, the time, the headers and the first 4 KB of the answer. Addresses of the local network follow the rule of Network.\",\"open.what\":\"Open\",\"open.app\":\"App\",\"open.file\":\"File\",\"open.browserHint\":\"It needs lilOS open at that time; if it is not, it waits and asks when you open it.\",\"open.done\":\"Opened.\",\"open.gone\":\"The file is not there any more.\",\"open.noApp\":\"The app is not installed.\",\"automation.file\":\"Automation\",\"automation.hint\":\"Automata runs it in its window, with lilOS open; if it is not, it waits and asks when you open it.\",\"when.once\":\"Once\",\"when.repeat\":\"Repeat\",\"when.cron\":\"Advanced (cron)\",\"when.date\":\"Date\",\"when.time\":\"Time\",\"when.cronField\":\"Cron expression\",\"when.cronHint\":\"minute hour day month weekday: «0 2 * * 0» is every Sunday at 02:00\",\"when.every\":\"Every\",\"when.n\":\"How many\",\"when.unit\":\"Unit\",\"when.on\":\"On\",\"when.onlyDays\":\"Only on\",\"when.between\":\"Only between\",\"when.from\":\"From\",\"when.to\":\"and\",\"when.until\":\"Until\",\"when.onDay\":\"On the day\",\"when.month\":\"Month\",\"when.dayN\":\"day\",\"when.lastDay\":\"the last day\",\"when.nthWeekday\":\"the…\",\"when.nth\":\"Which\",\"when.weekday\":\"Weekday\",\"when.at\":\"At\",\"when.addTime\":\"Another time\",\"when.removeTime\":\"Remove this time\",\"when.start\":\"From\",\"when.zone\":\"Time zone\",\"when.thisBrowser\":\"{zone} (this browser)\",\"when.end\":\"End\",\"when.never\":\"Never\",\"when.onDate\":\"On\",\"when.after\":\"After\",\"when.times\":\"times\",\"unit.minute\":{\"one\":\"minute\",\"other\":\"minutes\"},\"unit.hour\":{\"one\":\"hour\",\"other\":\"hours\"},\"unit.day\":{\"one\":\"day\",\"other\":\"days\"},\"unit.week\":{\"one\":\"week\",\"other\":\"weeks\"},\"unit.month\":{\"one\":\"month\",\"other\":\"months\"},\"unit.year\":{\"one\":\"year\",\"other\":\"years\"},\"day.1\":\"Monday\",\"day.2\":\"Tuesday\",\"day.3\":\"Wednesday\",\"day.4\":\"Thursday\",\"day.5\":\"Friday\",\"day.6\":\"Saturday\",\"day.7\":\"Sunday\",\"day.1.short\":\"M\",\"day.2.short\":\"T\",\"day.3.short\":\"W\",\"day.4.short\":\"T\",\"day.5.short\":\"F\",\"day.6.short\":\"S\",\"day.7.short\":\"S\",\"nth.1\":\"first\",\"nth.2\":\"second\",\"nth.3\":\"third\",\"nth.4\":\"fourth\",\"nth.5\":\"fifth\",\"nth.-1\":\"last\",\"opt.name\":\"Name\",\"opt.missed\":\"If the kernel was off at that time\",\"opt.missedOnce\":\"Run it once when it is back (within the hours an admin chose)\",\"opt.missedSkip\":\"Skip it\",\"opt.closed\":\"If lilOS is not open\",\"opt.ask\":\"Ask before running it when lilOS opens\",\"opt.overlap\":\"If the time before is still running\",\"opt.overlapSkip\":\"Skip this one\",\"opt.overlapQueue\":\"Wait until it ends\",\"opt.overlapParallel\":\"Run them together\",\"opt.timeout\":\"Stop it after\",\"opt.minutes\":\"minutes\",\"opt.retries\":\"If it fails, try again\",\"opt.timesEvery\":\"times, every\",\"opt.notify\":\"Tell me with a notification\",\"opt.notifyError\":\"Only if it fails\",\"opt.notifyAlways\":\"Every time\",\"opt.notifyNever\":\"Never\",\"opt.runAs\":\"Run as\",\"opt.me\":\"Me ({name})\",\"opt.systemHint\":\"The system has no home: only reminders to the admins, services chosen for everyone and web requests without files.\",\"opt.otherHint\":\"It runs as that person, with their files and connections; they get a notification.\",\"opt.enabled\":\"Turn it on now\",\"what.collection\":\"NetTest collection {file}\",\"what.collectionEnv\":\"NetTest collection {file} ({env})\",\"kind.collection.name\":\"NetTest collection\",\"kind.collection.hint\":\"The requests of a .nettest file, with their checks\",\"kind.collection.missing\":\"Install NetTest first\",\"collection.file\":\"Collection\",\"collection.env\":\"Environment\",\"collection.envNone\":\"No environment\",\"collection.hint\":\"The kernel sends the requests, also with lilOS closed. The operation fails when a request does not answer or a check or a test fails.\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Pianificazione\",\"@description\":\"Operazioni a una data e ora o ripetute, anche a lilOS chiuso: promemoria, copie di cartelle, richieste web, collezioni di NetTest, comandi del Terminale, servizi delle app, aprire app e file, automazioni.\",\"@menus.scheduler.plan.label\":\"Pianifica\",\"@actions.scheduler.copyFolder.label\":\"Copia questa cartella…\",\"@actions.scheduler.commandHere.label\":\"Comando in questa cartella…\",\"@actions.scheduler.openFolder.label\":\"Aprila…\",\"@actions.scheduler.runAutomation.label\":\"Esegui questa automazione…\",\"@actions.scheduler.openFile.label\":\"Apri questo file…\",\"@actions.scheduler.remind.label\":\"Promemoria su questo…\",\"@entrypoints.edit.label\":\"Modifica un’operazione\",\"@entrypoints.create.label\":\"Nuova operazione\",\"@entrypoints.history.label\":\"Storico\",\"@entrypoints.open.label\":\"Apri quello che dice un promemoria\",\"@dependencies.scheduler.reason\":\"Esegue le operazioni nel kernel, anche a lilOS chiuso\",\"app.name\":\"Pianificazione\",\"needsKernel\":\"La Pianificazione ha bisogno di lilOS collegato al suo kernel.\",\"tools.new\":\"Nuova operazione\",\"tools.run\":\"Esegui ora\",\"tools.pause\":\"Pausa\",\"tools.resume\":\"Riattiva\",\"tools.search\":\"Cerca\",\"tabs.list\":\"Elenco\",\"tabs.history\":\"Storico\",\"side.label\":\"Filtri\",\"side.operations\":\"Operazioni\",\"side.all\":\"Tutte\",\"side.active\":\"Attive\",\"side.paused\":\"In pausa\",\"side.failed\":\"Non riuscite\",\"side.system\":\"Sistema\",\"side.users\":\"Utenti\",\"side.madeBy\":\"Create da\",\"side.mine\":\"Me\",\"side.apps\":\"Le mie app\",\"side.where\":\"Dove gira\",\"side.words\":\"In parole\",\"side.next\":\"Prossime volte\",\"side.noMore\":\"Non partirà più.\",\"side.cron\":\"Come cron\",\"side.what\":\"Cosa\",\"side.browser\":\"Questa gira nel browser: a quell’ora serve lilOS aperto. Se non lo è, aspetta la prossima volta che lo apri.\",\"where.kernel\":\"kernel\",\"where.browser\":\"browser\",\"owner.system\":\"Sistema\",\"owner.me\":\"me\",\"owner.meNamed\":\"{name} (io)\",\"grp.system\":\"girano senza utente\",\"grp.count\":{\"one\":\"{n} operazione\",\"other\":\"{n} operazioni\"},\"col.name\":\"Nome\",\"col.when\":\"Quando\",\"col.next\":\"Prossima\",\"col.last\":\"Ultima\",\"row.byApp\":\"creata da {app}\",\"state.paused\":\"In pausa\",\"state.ok\":\"riuscita\",\"state.error\":\"non riuscita\",\"state.skipped\":\"saltata\",\"state.waiting\":\"in attesa di lilOS\",\"state.running\":\"in corso\",\"state.queued\":\"in coda\",\"state.cancelled\":\"annullata\",\"last.failed\":\"Non riuscita {when}\",\"next.done\":\"Finita\",\"list.noneHere\":\"Nessuna operazione qui.\",\"welcome.title\":\"Ancora niente di pianificato\",\"welcome.text\":\"Un’operazione fa qualcosa a una data e ora, o più volte: un promemoria, la copia di una cartella, una richiesta web, un comando… anche a lilOS chiuso.\",\"status.module\":\"Modulo scheduler attivo\",\"status.count\":{\"one\":\"{n} operazione, {active} attive\",\"other\":\"{n} operazioni, {active} attive\"},\"detail.label\":\"L’operazione scelta\",\"detail.when\":\"Quando\",\"detail.what\":\"Cosa\",\"detail.runs\":\"Gira\",\"detail.inKernel\":\"Nel kernel, anche a lilOS chiuso, come {who}\",\"detail.inBrowser\":\"Nel browser, con lilOS aperto, come {who}\",\"detail.missed\":\"Se salta\",\"detail.missedOnce\":\"Recupera una volta appena il kernel riparte\",\"detail.missedSkip\":\"Saltata\",\"detail.by\":\"Cambiata da\",\"detail.next\":\"Prossime\",\"detail.last\":{\"one\":\"Ultima corsa\",\"other\":\"Ultime {n} corse\"},\"detail.edit\":\"Modifica\",\"detail.duplicate\":\"Duplica\",\"detail.delete\":\"Elimina\",\"detail.othersNote\":\"Gira come {who}, con i suoi file e le sue connessioni. Se la cambi, la metti in pausa o la elimini, riceve una notifica.\",\"delete.title\":\"Eliminare «{name}»?\",\"delete.text\":\"Non partirà più, e se ne va anche il suo storico.\",\"error.title\":\"Non fatto\",\"error.save\":\"Non salvata\",\"history.task\":\"Operazione\",\"history.state\":\"Esito\",\"history.allTasks\":\"Tutte le operazioni\",\"history.allStates\":\"Tutti gli esiti\",\"history.what\":\"Operazione ed esito\",\"history.took\":\"Durata\",\"history.how\":\"Come\",\"history.none\":\"Ancora nessuna corsa.\",\"history.catchup\":\"Era prevista {due}: il kernel era spento. {text}\",\"reason.time\":\"a orario\",\"reason.catchup\":\"recupero\",\"reason.manual\":\"a mano\",\"reason.retry\":\"tentativo {n}\",\"time.today\":\"oggi {time}\",\"time.tomorrow\":\"domani {time}\",\"time.yesterday\":\"ieri {time}\",\"dur.s\":\"{s} s\",\"dur.ms\":\"{m} min {s} s\",\"dur.hm\":\"{h} h {m} min\",\"what.notify\":\"Promemoria: {text}\",\"what.service\":\"Servizio di {app} · {label}\",\"what.copy.versions\":\"Copia {from} → {to}, versioni datate\",\"what.copy.update\":\"Copia {from} → {to}, aggiorna\",\"what.copy.mirror\":\"Copia {from} → {to}, specchio\",\"what.command\":\"Comando: {line}\",\"what.commandSsh\":\"SSH {host}: {line}\",\"what.openFile\":\"Apri {file}\",\"what.openApp\":\"Apri {app}\",\"what.automation\":\"Automazione {file}\",\"kind.notify.name\":\"Promemoria\",\"kind.notify.hint\":\"Una notifica, anche con un file o un’app da aprire\",\"kind.service.name\":\"Servizio di un’app\",\"kind.service.hint\":\"Avvia un servizio delle app installate, con i suoi valori\",\"kind.copy.name\":\"Copia una cartella\",\"kind.copy.hint\":\"Una copia di sicurezza in un’altra cartella o in Rete\",\"kind.command.name\":\"Comando del Terminale\",\"kind.command.hint\":\"Righe di shell in lilOS, o su un host SSH salvato\",\"kind.web.name\":\"Richiesta web\",\"kind.web.hint\":\"Chiama un indirizzo e controlla la risposta\",\"kind.open.name\":\"Apri un’app o un file\",\"kind.open.hint\":\"Serve lilOS aperto in una scheda\",\"kind.automation.name\":\"Automazione\",\"kind.automation.hint\":\"Un’automazione di Automata\",\"kind.automation.missing\":\"Prima installa Automata\",\"editor.titleNew\":\"Nuova operazione\",\"editor.titleEdit\":\"Modifica operazione\",\"editor.loading\":\"Caricamento…\",\"editor.copyOf\":\"{name} (copia)\",\"editor.choose\":\"Scegli…\",\"editor.back\":\"Indietro\",\"editor.next\":\"Avanti\",\"editor.cancel\":\"Annulla\",\"editor.create\":\"Crea\",\"editor.save\":\"Salva\",\"editor.suggest.copy\":\"Copia di {from}\",\"editor.proposedBy\":\"Proposta da {app}: controllala prima di salvare.\",\"step.what\":\"Cosa\",\"step.when\":\"Quando\",\"step.options\":\"Opzioni\",\"notify.text\":\"Testo\",\"notify.level\":\"Tipo\",\"notify.open\":\"Il clic apre\",\"notify.openNone\":\"Niente\",\"notify.openFile\":\"Un file\",\"notify.openApp\":\"Un’app\",\"notify.file\":\"File\",\"notify.app\":\"App\",\"level.info\":\"Informazione\",\"level.success\":\"Riuscita\",\"level.warning\":\"Avviso\",\"level.error\":\"Errore\",\"service.which\":\"Servizio\",\"service.noParams\":\"Questo servizio non ha valori da scegliere.\",\"service.hint\":\"Gira nel kernel, anche a lilOS chiuso. Un servizio spento si accende per la corsa e si spegne dopo.\",\"copy.from\":\"Copia\",\"copy.to\":\"In\",\"copy.how\":\"Come\",\"copy.versions\":\"Versioni datate: ogni volta una cartella nuova, tenendo le ultime {keep}\",\"copy.update\":\"Aggiorna: solo i file nuovi o cambiati, in una sola cartella\",\"copy.mirror\":\"Specchio: come Aggiorna, e quello che non c’è più va via anche dalla copia (nel cestino, se è in lilOS)\",\"copy.keep\":\"Versioni da tenere\",\"copy.exclude\":\"Escludi\",\"copy.excludeHint\":\"Nomi, con * e ?, separati da virgole\",\"copy.hint\":\"Copia il kernel, anche a lilOS chiuso. La copia va in una cartella con il nome di quella copiata.\",\"command.where\":\"Dove\",\"command.inLilos\":\"In lilOS\",\"command.onSsh\":\"Su un host SSH\",\"command.host\":\"Host\",\"command.lines\":\"Comandi\",\"command.placeholder\":\"# un comando per riga, come nel Terminale\",\"command.hint\":\"La shell del Terminale, nel kernel, come te. I file protetti da un’app (FileCrypt) qui non si aprono.\",\"command.sshHint\":\"Con le credenziali salvate nel Terminale per quell’host.\",\"command.cwd\":\"Cartella di partenza\",\"saveTo.title\":\"Salva\",\"saveTo.web\":\"Salva la risposta in un file\",\"saveTo.command\":\"Salva l’output in un file\",\"saveTo.folder\":\"Cartella\",\"saveTo.name\":\"Nome del file\",\"saveTo.mode\":\"Ogni volta\",\"saveTo.replace\":\"sostituiscilo\",\"saveTo.append\":\"aggiungi in fondo\",\"saveTo.dated\":\"uno nuovo con la data\",\"web.method\":\"Metodo\",\"web.url\":\"Indirizzo\",\"web.headers\":\"Intestazioni\",\"web.headerName\":\"Nome\",\"web.headerValue\":\"Valore\",\"web.secret\":\"segreto\",\"web.secretHint\":\"Tenuto cifrato nel kernel, non si vede più\",\"web.change\":\"Cambia\",\"web.removeHeader\":\"Togli l’intestazione\",\"web.addHeader\":\"Intestazione\",\"web.body\":\"Corpo\",\"web.body.none\":\"Nessuno\",\"web.body.text\":\"Testo\",\"web.body.json\":\"JSON\",\"web.body.form\":\"Modulo\",\"web.status\":\"Riuscita se lo stato è\",\"web.anyStatus\":\"qualsiasi\",\"web.exactStatus\":\"esattamente…\",\"web.contains\":\"e la risposta contiene\",\"web.containsPh\":\"facoltativo\",\"web.timeout\":\"Tempo massimo\",\"web.seconds\":\"secondi\",\"web.hint\":\"Nello storico: stato, durata, intestazioni e i primi 4 KB della risposta. Gli indirizzi della rete locale seguono la regola della Rete.\",\"open.what\":\"Apri\",\"open.app\":\"App\",\"open.file\":\"File\",\"open.browserHint\":\"A quell’ora serve lilOS aperto; se non lo è, aspetta e te lo chiede quando lo apri.\",\"open.done\":\"Aperto.\",\"open.gone\":\"Il file non c’è più.\",\"open.noApp\":\"L’app non è installata.\",\"automation.file\":\"Automazione\",\"automation.hint\":\"La esegue Automata nella sua finestra, con lilOS aperto; se non lo è, aspetta e te lo chiede quando lo apri.\",\"when.once\":\"Una volta\",\"when.repeat\":\"Ripeti\",\"when.cron\":\"Avanzato (cron)\",\"when.date\":\"Data\",\"when.time\":\"Ora\",\"when.cronField\":\"Espressione cron\",\"when.cronHint\":\"minuto ora giorno mese giorno-della-settimana: «0 2 * * 0» è ogni domenica alle 02:00\",\"when.every\":\"Ogni\",\"when.n\":\"Quanti\",\"when.unit\":\"Unità\",\"when.on\":\"Il\",\"when.onlyDays\":\"Solo il\",\"when.between\":\"Solo tra\",\"when.from\":\"Dalle\",\"when.to\":\"e le\",\"when.until\":\"Fino alle\",\"when.onDay\":\"Il giorno\",\"when.month\":\"Mese\",\"when.dayN\":\"giorno\",\"when.lastDay\":\"l’ultimo giorno\",\"when.nthWeekday\":\"il…\",\"when.nth\":\"Quale\",\"when.weekday\":\"Giorno della settimana\",\"when.at\":\"Alle\",\"when.addTime\":\"Altro orario\",\"when.removeTime\":\"Togli questo orario\",\"when.start\":\"Dal\",\"when.zone\":\"Fuso orario\",\"when.thisBrowser\":\"{zone} (questo browser)\",\"when.end\":\"Fine\",\"when.never\":\"Mai\",\"when.onDate\":\"Il\",\"when.after\":\"Dopo\",\"when.times\":\"volte\",\"unit.minute\":{\"one\":\"minuto\",\"other\":\"minuti\"},\"unit.hour\":{\"one\":\"ora\",\"other\":\"ore\"},\"unit.day\":{\"one\":\"giorno\",\"other\":\"giorni\"},\"unit.week\":{\"one\":\"settimana\",\"other\":\"settimane\"},\"unit.month\":{\"one\":\"mese\",\"other\":\"mesi\"},\"unit.year\":{\"one\":\"anno\",\"other\":\"anni\"},\"day.1\":\"lunedì\",\"day.2\":\"martedì\",\"day.3\":\"mercoledì\",\"day.4\":\"giovedì\",\"day.5\":\"venerdì\",\"day.6\":\"sabato\",\"day.7\":\"domenica\",\"day.1.short\":\"L\",\"day.2.short\":\"M\",\"day.3.short\":\"M\",\"day.4.short\":\"G\",\"day.5.short\":\"V\",\"day.6.short\":\"S\",\"day.7.short\":\"D\",\"nth.1\":\"primo\",\"nth.2\":\"secondo\",\"nth.3\":\"terzo\",\"nth.4\":\"quarto\",\"nth.5\":\"quinto\",\"nth.-1\":\"ultimo\",\"opt.name\":\"Nome\",\"opt.missed\":\"Se a quell’ora il kernel era spento\",\"opt.missedOnce\":\"Eseguila una volta appena riparte (entro le ore scelte dall’amministratore)\",\"opt.missedSkip\":\"Saltala\",\"opt.closed\":\"Se lilOS non è aperto\",\"opt.ask\":\"Chiedi prima di eseguirla quando apri lilOS\",\"opt.overlap\":\"Se la volta prima è ancora in corso\",\"opt.overlapSkip\":\"Salta questa\",\"opt.overlapQueue\":\"Aspetta che finisca\",\"opt.overlapParallel\":\"Falle andare insieme\",\"opt.timeout\":\"Fermala dopo\",\"opt.minutes\":\"minuti\",\"opt.retries\":\"Se non riesce, riprova\",\"opt.timesEvery\":\"volte, ogni\",\"opt.notify\":\"Avvisami con una notifica\",\"opt.notifyError\":\"Solo se non riesce\",\"opt.notifyAlways\":\"Ogni volta\",\"opt.notifyNever\":\"Mai\",\"opt.runAs\":\"Esegui come\",\"opt.me\":\"Me ({name})\",\"opt.systemHint\":\"Il sistema non ha una home: solo promemoria agli amministratori, servizi scelti per tutti e richieste web senza file.\",\"opt.otherHint\":\"Gira come quella persona, con i suoi file e le sue connessioni; riceve una notifica.\",\"opt.enabled\":\"Attiva subito\",\"what.collection\":\"Collezione di NetTest {file}\",\"what.collectionEnv\":\"Collezione di NetTest {file} ({env})\",\"kind.collection.name\":\"Collezione di NetTest\",\"kind.collection.hint\":\"Le richieste di un file .nettest, con le loro verifiche\",\"kind.collection.missing\":\"Installa prima NetTest\",\"collection.file\":\"Collezione\",\"collection.env\":\"Ambiente\",\"collection.envNone\":\"Nessun ambiente\",\"collection.hint\":\"Le richieste le manda il kernel, anche a lilOS chiuso. L’operazione fallisce quando una richiesta non risponde o una verifica o un test non passano.\"}}")
}), { t: v } = _, y = [
	{
		type: "notify",
		glyph: "bell",
		where: "kernel"
	},
	{
		type: "service",
		glyph: "gear",
		where: "kernel"
	},
	{
		type: "copy",
		glyph: "transfer",
		where: "kernel"
	},
	{
		type: "command",
		glyph: "terminal",
		where: "kernel"
	},
	{
		type: "web",
		glyph: "globe",
		where: "kernel"
	},
	{
		type: "open",
		glyph: "window",
		where: "browser"
	},
	{
		type: "automation",
		glyph: "automation",
		where: "browser"
	},
	{
		type: "collection",
		glyph: "bolt",
		where: "kernel"
	}
], b = (e) => y.find((t) => t.type === e) ?? y[0], x = {
	ok: "check",
	error: "error",
	skipped: "arrowRight",
	waiting: "clock",
	running: "play",
	queued: "list",
	cancelled: "x"
}, S = () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC", C = (e) => e === "root" ? "~" : i.tildePath(e) ?? "";
function w(e) {
	if (i.isRemote?.(e)) {
		let t = i.netRef(e);
		return {
			mount: t.mount,
			path: t.path || "/",
			label: C(e)
		};
	}
	return {
		home: e === i.root ? "root" : e,
		label: C(e)
	};
}
var T = (e) => h.getApp(e)?.name ?? e;
function E(e, t = null) {
	switch (e?.type) {
		case "notify": return v("what.notify", { text: e.text });
		case "service": {
			let n = t?.services?.find((t) => t.app === e.app && t.entry === e.entry);
			return v("what.service", {
				app: n?.name ?? T(e.app),
				label: n?.label ?? e.entry
			});
		}
		case "copy": return v(`what.copy.${e.mode}`, {
			from: e.from?.label || "?",
			to: e.to?.label || "?"
		});
		case "command": {
			let t = String(e.lines ?? "").split("\n").find((e) => e.trim() && !e.trim().startsWith("#"))?.trim() ?? "";
			return e.host ? v("what.commandSsh", {
				host: e.hostLabel || e.host,
				line: t
			}) : v("what.command", { line: t });
		}
		case "web": return `${e.method} ${e.url}`;
		case "open": return e.file === void 0 ? v("what.openApp", { app: e.label || T(e.app) }) : v("what.openFile", { file: e.label || C(e.file) });
		case "automation": return v("what.automation", { file: e.label || C(e.file) });
		case "collection": return e.environmentLabel ? v("what.collectionEnv", {
			file: e.label || C(e.file),
			env: e.environmentLabel
		}) : v("what.collection", { file: e.label || C(e.file) });
		default: return "";
	}
}
var D = (e, t) => e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
function O(e) {
	if (!Number.isFinite(e)) return "—";
	let t = new Date(e), n = /* @__PURE__ */ new Date(), r = _.date(e, {
		hour: "2-digit",
		minute: "2-digit"
	}), i = (e) => {
		let t = new Date(n);
		return t.setDate(t.getDate() + e), t;
	};
	if (D(t, n)) return v("time.today", { time: r });
	if (D(t, i(1))) return v("time.tomorrow", { time: r });
	if (D(t, i(-1))) return v("time.yesterday", { time: r });
	let a = Math.abs(e - Date.now()) > 2592e7;
	return `${_.date(e, {
		weekday: "short",
		day: "numeric",
		month: "short",
		...a && { year: "numeric" }
	})} ${r}`;
}
function k(e) {
	if (!Number.isFinite(e) || e < 0) return "—";
	let t = Math.round(e / 1e3);
	if (t < 60) return v("dur.s", { s: t });
	let n = Math.floor(t / 60);
	return n < 60 ? v("dur.ms", {
		m: n,
		s: t % 60
	}) : v("dur.hm", {
		h: Math.floor(n / 60),
		m: n % 60
	});
}
function A(e) {
	try {
		return l.describe(e);
	} catch {
		return "—";
	}
}
function ee(e, t = 5) {
	let n = [], r = e.next, i = e.when?.count ? e.when.count - (e.fired ?? 0) : Infinity;
	for (; Number.isFinite(r) && n.length < t && i > 0;) {
		n.push(r), i--;
		try {
			r = l.rules.nextAfter(e.when, r);
		} catch {
			break;
		}
	}
	return n;
}
function j(e = 0) {
	let t = new Date(Date.now() + e * 6e4), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`;
}
// src/shared/paramsForm.js
function M(e, t, { t: r, label: s = e.label, onChange: c = null, pickFile: l = null, pathAs: u = "id", live: d = !1, locked: f = !1, empty: p = !0 } = {}) {
	let h = e.type ?? "text", g = e.required === !0, _ = t ?? (h === "files" ? [] : null), v = (e, t) => c?.(e) === !1 ? (t(), !1) : (_ = e, !0), y = d ? "input" : "change", b = x();
	if (f) for (let e of [b.el, ...b.el.querySelectorAll("input, select, button, textarea")]) "disabled" in e && (e.disabled = !0);
	return b;
	function x() {
		if (h === "boolean") {
			let e = m({
				value: _ === !0,
				label: s,
				onChange: (t) => v(t, () => {
					e.classList.toggle("on", !t), e.setAttribute("aria-checked", String(!t));
				})
			});
			return {
				el: e,
				get: () => e.getAttribute("aria-checked") === "true",
				check: () => ""
			};
		}
		if (h === "choice") {
			let t = [...p ? [{
				value: "",
				label: "—"
			}] : [], ...(e.options ?? []).map((e) => ({
				...e,
				value: String(e.value)
			}))], n = a("select", {
				class: "ctl-select",
				"aria-label": s
			}, ...t.map((e) => a("option", {
				value: e.value,
				selected: e.value === (_ == null ? "" : String(_)),
				disabled: !!e.disabled
			}, e.label))), i = (t) => t === "" ? null : (e.options ?? []).find((e) => String(e.value) === t)?.value ?? null;
			return n.addEventListener("change", () => v(i(n.value), () => {
				n.value = _ == null ? "" : String(_);
			})), {
				el: n,
				get: () => i(n.value),
				check: () => g && i(n.value) == null ? r("shared.params.required") : ""
			};
		}
		if (h === "number") {
			let t = a("input", {
				class: "ctl-text sh-param-number",
				type: "number",
				min: e.min ?? null,
				max: e.max ?? null,
				"aria-label": s
			});
			return t.value = _ ?? "", t.addEventListener(y, () => v(t.value === "" ? null : Number(t.value), () => {
				t.value = _ ?? "";
			})), {
				el: t,
				get: () => t.value === "" ? null : Number(t.value),
				check: () => {
					if (t.value === "") return g ? r("shared.params.required") : "";
					let n = Number(t.value);
					return Number.isFinite(n) ? Number.isFinite(e.min) && n < e.min ? r("shared.params.tooSmall", { min: e.min }) : Number.isFinite(e.max) && n > e.max ? r("shared.params.tooBig", { max: e.max }) : "" : r("shared.params.badNumber");
				}
			};
		}
		if (h === "file" || h === "folder") return w();
		if (h === "files") return T();
		let t = h === "secret", n = a("input", {
			class: "ctl-text",
			type: t ? "password" : "text",
			spellcheck: "false",
			autocomplete: t ? "new-password" : "off",
			"aria-label": s,
			maxlength: e.maxLength ?? null,
			placeholder: t && _ ? r("shared.params.secretKept") : null
		});
		return t || (n.value = _ ?? ""), n.addEventListener(y, () => {
			(!t || n.value) && v(n.value || null, () => {
				n.value = t ? "" : _ ?? "";
			});
		}), d || n.addEventListener("keydown", (e) => {
			e.key === "Enter" && n.blur();
		}), {
			el: n,
			get: () => t ? n.value || _ : n.value || null,
			check: () => g && !(t ? n.value || _ : n.value) ? r("shared.params.required") : ""
		};
	}
	function S(e) {
		return e ? u === "tilde" ? e : i.exists(e) ? i.tildePath(e) : r("shared.params.gone") : "";
	}
	function C(e) {
		return u === "tilde" ? i.tildePath(e.id) : e.id;
	}
	function w() {
		let t = h === "folder", i = u === "tilde", c = a("input", {
			class: "ctl-text",
			type: "text",
			spellcheck: "false",
			readonly: !i,
			"aria-label": s,
			placeholder: i ? "~/…" : r(t ? "shared.params.noFolder" : "shared.params.noFile")
		});
		c.value = S(_);
		let f = () => {
			c.value = S(_);
		};
		i && (c.addEventListener(y, () => v(c.value.trim() || null, f)), d || c.addEventListener("keydown", (e) => {
			e.key === "Enter" && c.blur();
		}));
		let p = l && n({
			label: r("shared.params.choose"),
			onClick: async () => {
				let n = await l({
					kind: t ? "folder" : "file",
					title: e.label
				});
				n && v(C(n), f) && f();
			}
		}), m = !i && !g && a("button", {
			class: "ctl-btn sh-param-clear",
			type: "button",
			title: r("shared.params.clear"),
			"aria-label": r("shared.params.clearOf", { name: e.label }),
			onclick: () => {
				v(null, f) && f();
			}
		}, o("x"));
		return {
			el: a("div", { class: "sh-param-path" }, c, p, m),
			get: () => i ? c.value.trim() || null : _,
			check: () => g && !(i ? c.value.trim() : _) ? r("shared.params.noneChosen") : ""
		};
	}
	function T() {
		_ = (Array.isArray(_) ? _ : _ ? [_] : []).filter((e) => u === "tilde" || i.exists(e));
		let e = a("div", { class: "sh-param-list" }), t = (e) => {
			v(e, c) && c();
		};
		function c() {
			e.replaceChildren(..._.length ? _.map((e, n) => {
				let s = S(e);
				return a("div", { class: "sh-param-item" }, o(u === "id" && i.get(e)?.type === "folder" ? "folder" : "file"), a("code", {}, s), f ? null : a("button", {
					class: "ctl-btn sh-param-clear",
					type: "button",
					title: r("shared.params.remove"),
					"aria-label": r("shared.params.removeOf", { name: s }),
					onclick: () => t(_.filter((e, t) => t !== n))
				}, o("x")));
			}) : [a("span", { class: "sh-param-none" }, r("shared.params.none"))]);
		}
		c();
		let d = (e) => async () => {
			let n = await l({
				kind: e,
				title: s
			});
			if (!n) return;
			let r = C(n);
			_.includes(r) || t([..._, r]);
		};
		return {
			el: a("div", { class: "sh-param-files" }, e, l ? a("div", { class: "sh-param-add" }, n({
				label: r("shared.params.addFile"),
				onClick: d("file")
			}), n({
				label: r("shared.params.addFolder"),
				onClick: d("folder")
			})) : null),
			get: () => [..._],
			check: () => g && !_.length ? r("shared.params.noneChosen") : ""
		};
	}
}
function te(e, t = {}, { t: n, onChange: r = null, context: i = "", ...o } = {}) {
	let s = { ...t }, c = /* @__PURE__ */ new Map(), l = Object.entries(e ?? {}).flatMap(([e, t]) => {
		let l = M(t, Object.hasOwn(s, e) ? s[e] : t.default, {
			...o,
			t: n,
			label: i ? `${t.label} (${i})` : t.label,
			onChange: (t) => {
				let n = { ...s };
				return t === "" || t == null || Array.isArray(t) && !t.length ? delete n[e] : n[e] = t, r?.({ ...n }, e) !== !1 && (s = n, !0);
			}
		});
		return c.set(e, l), [a("span", { class: "sh-param-label" }, t.label, t.required ? a("span", {
			class: "sh-param-req",
			"aria-hidden": "true"
		}, " *") : null), a("div", { class: "sh-param-field" }, l.el, t.description ? a("small", { class: "sh-param-hint" }, t.description) : null)];
	}), u = a("div", { class: "sh-params" }, l);
	return {
		el: u,
		controls: c,
		values: () => {
			let e = {};
			for (let [t, n] of c) {
				let r = n.get();
				r !== "" && r != null && (!Array.isArray(r) || r.length) && (e[t] = r);
			}
			return e;
		},
		check: () => {
			for (let [t, n] of c) {
				let r = n.check();
				if (r) return `${e[t].label}: ${r}`;
			}
			return "";
		},
		focus: () => u.querySelector("input:not([readonly]), select, button")?.focus()
	};
}
// src/scheduler/editor.js
var N = (e, ...t) => e.replaceChildren(...t.flat(Infinity).filter((e) => e != null && e !== !1)), ne = [
	"minute",
	"hour",
	"day",
	"week",
	"month",
	"year"
], P = [
	1,
	2,
	3,
	4,
	5,
	6,
	7
], F = (e) => !!e && typeof e == "object" && !Array.isArray(e), I = (e) => JSON.parse(JSON.stringify(e));
function L(e, t = {}) {
	e(H(t, e));
}
function R({ args: e = {}, openWindow: t } = {}) {
	let n = F(e) ? e : {};
	return typeof n.id == "string" ? H({ id: n.id }, t) : H({ prefill: re(n) }, t);
}
function re(e) {
	let t = Array.isArray(e.files) && e.files.length ? i.get(e.files[0]) : null, n = {};
	if (t) {
		let r = C(t.id);
		n.what = e.action === "scheduler.copyFolder" ? {
			type: "copy",
			from: w(t.id),
			to: null,
			mode: "versions",
			keep: 7,
			exclude: []
		} : e.action === "scheduler.commandHere" ? {
			type: "command",
			lines: "",
			cwd: t.id,
			cwdLabel: r,
			host: null,
			saveTo: null
		} : e.action === "scheduler.runAutomation" ? {
			type: "automation",
			file: t.id,
			label: r
		} : e.action === "scheduler.remind" ? {
			type: "notify",
			text: t.name,
			level: "info",
			open: {
				file: t.id,
				label: r
			}
		} : {
			type: "open",
			file: t.id,
			label: r
		}, n.name = t.name;
	}
	return F(e.what) && y.some((t) => t.type === e.what.type) && (n.what = e.what, e.what.type !== "automation" && e.what.type !== "collection" || typeof e.what.file != "string" || e.what.label || (n.what = {
		...e.what,
		label: C(e.what.file)
	})), typeof e.name == "string" && (n.name = e.name), typeof e.from == "string" && (n.from = e.from), F(e.when) && (n.when = e.when), n;
}
var z = (e) => ({
	notify: {
		type: e,
		text: "",
		level: "info",
		open: null
	},
	service: {
		type: e,
		app: "",
		entry: "",
		params: {}
	},
	copy: {
		type: e,
		from: null,
		to: null,
		mode: "versions",
		keep: 7,
		exclude: []
	},
	command: {
		type: e,
		lines: "",
		cwd: null,
		cwdLabel: "",
		host: null,
		hostLabel: "",
		saveTo: null
	},
	web: {
		type: e,
		method: "GET",
		url: "https://",
		headers: [],
		body: { kind: "none" },
		expect: {
			status: "2xx",
			contains: null
		},
		timeoutS: 30,
		saveTo: null
	},
	open: {
		type: e,
		app: "",
		entry: "main",
		args: null
	},
	automation: {
		type: e,
		file: null,
		label: ""
	},
	collection: {
		type: e,
		file: null,
		label: "",
		environment: null,
		environmentLabel: "",
		only: null
	}
})[e];
function B(e) {
	let t = {
		mode: "repeat",
		tz: e?.tz ?? S(),
		once: j(60),
		start: j(),
		every: {
			n: 1,
			unit: "day"
		},
		days: [(/* @__PURE__ */ new Date()).getDay() || 7],
		times: [j().slice(11)],
		between: null,
		monthly: {
			kind: "day",
			day: (/* @__PURE__ */ new Date()).getDate(),
			nth: 1,
			weekday: 1
		},
		month: (/* @__PURE__ */ new Date()).getMonth() + 1,
		endKind: "never",
		end: "",
		count: 10,
		cron: "0 9 * * 1-5",
		skip: [],
		extra: []
	};
	return e ? e.once ? {
		...t,
		mode: "once",
		once: e.once
	} : (Object.assign(t, {
		start: e.start,
		skip: e.skip ?? [],
		extra: e.extra ?? []
	}), e.end ? Object.assign(t, {
		endKind: "date",
		end: e.end
	}) : e.count && Object.assign(t, {
		endKind: "count",
		count: e.count
	}), e.cron ? {
		...t,
		mode: "cron",
		cron: e.cron
	} : (t.every = { ...e.every }, e.days && (t.days = [...e.days]), e.times && (t.times = [...e.times]), e.between && (t.between = [...e.between]), e.monthly && (t.monthly = e.monthly.day === -1 ? {
		...t.monthly,
		kind: "last"
	} : e.monthly.day === void 0 ? {
		...t.monthly,
		kind: "nth",
		nth: e.monthly.nth,
		weekday: e.monthly.weekday
	} : {
		...t.monthly,
		kind: "day",
		day: e.monthly.day
	}), e.month && (t.month = e.month), t)) : t;
}
function V(e) {
	if (e.mode === "once") return {
		once: e.once,
		tz: e.tz
	};
	let t = {
		tz: e.tz,
		start: e.start
	};
	if (e.endKind === "date" && e.end && (t.end = e.end), e.endKind === "count" && (t.count = Number(e.count)), e.skip?.length && (t.skip = e.skip), e.extra?.length && (t.extra = e.extra), e.mode === "cron") return {
		...t,
		cron: e.cron
	};
	let n = e.every.unit;
	if (t.every = {
		n: Number(e.every.n),
		unit: n
	}, (n === "week" || (n === "minute" || n === "hour") && e.days.length && e.days.length < 7) && (t.days = [...e.days]), n === "minute" || n === "hour" ? e.between && (t.between = e.between) : t.times = [...e.times], n === "month" || n === "year") {
		let n = e.monthly;
		t.monthly = n.kind === "last" ? { day: -1 } : n.kind === "day" ? { day: Number(n.day) } : {
			nth: Number(n.nth),
			weekday: Number(n.weekday)
		};
	}
	return n === "year" && (t.month = Number(e.month)), t;
}
function H({ id: e = null, copy: n = null, prefill: m = {} }, g) {
	let x = typeof e == "string", T = new t({
		title: v(x ? "editor.titleEdit" : "editor.titleNew"),
		icon: "clock",
		width: 880,
		height: 600,
		minWidth: 700,
		minHeight: 480
	}), D = {
		name: m.name ?? "",
		enabled: !0,
		owner: null,
		what: m.what ? {
			...z(m.what.type),
			...I(m.what)
		} : z("notify"),
		form: B(m.when ? m.when.tz ? m.when : {
			...m.when,
			tz: S()
		} : null),
		options: {
			missed: "once",
			overlap: "skip",
			timeoutMin: 60,
			retries: 0,
			retryMin: 5,
			notify: "error",
			ask: !0
		}
	};
	m.when?.once && (D.form.mode = "once");
	let k = +!!m.what, A = {
		services: [],
		hosts: [],
		users: [],
		runtime: !1
	}, ee = !1, j = !x && !n, M = "", F = a("div", {
		class: "ed-steps",
		role: "tablist"
	}), L = a("div", { class: "ed-main" }), R = a("aside", {
		class: "ed-side",
		"aria-live": "polite"
	}), re = a("p", {
		class: "ed-error",
		role: "alert"
	}), H = a("div", { class: "ed-foot" });
	T.body.append(a("div", { class: "ed" }, F, a("div", { class: "ed-body" }, L, R), re, H)), (async () => {
		try {
			let [t, r] = await Promise.all([l.catalog(), l.overview()]);
			A = t, ee = r.admin;
			let i = x ? e : n;
			if (i) {
				let e = await l.get(i);
				D.name = n ? v("editor.copyOf", { name: e.name }) : e.name, D.enabled = e.enabled, D.owner = e.owner, D.what = I(e.what), D.form = B(e.when), D.options = {
					...D.options,
					...e.options
				}, D.app = e.app;
			}
		} catch (e) {
			M = e.message;
		}
		j = !0, Z();
	})();
	let U = (e, t, n) => a(t?.matches?.("input, select, textarea") ? "label" : "div", { class: "ed-field" }, a("span", { class: "ed-label" }, e), t, n ? a("small", { class: "ed-hint" }, n) : null), W = (e, t, { small: n = !1, ...r } = {}) => p({
		...r,
		value: e ?? "",
		onInput: t,
		className: n ? "ed-small" : ""
	}), G = (e, t, { rows: n, mono: r = !1, placeholder: i = null, maxLength: o = null } = {}) => {
		let s = a("textarea", {
			class: `ctl-text${r ? " mono" : ""}`,
			rows: n,
			placeholder: i,
			maxlength: o,
			spellcheck: "false"
		});
		return s.value = e ?? "", s.addEventListener("input", () => t(s.value)), s;
	}, K = (e, t, n, i = null) => {
		let a = r({
			value: e,
			onChange: t,
			label: n
		});
		return i && a.querySelector("input").setAttribute("aria-label", i), a;
	}, q = (e, t, n, r) => d({
		value: String(e),
		options: t.map((e) => ({
			...e,
			value: String(e.value)
		})),
		onChange: n,
		label: r
	}), J = (e, t, n) => u({
		value: e,
		options: t,
		onChange: n
	}), Y = (e, t, n) => c({
		value: e,
		options: t,
		onChange: n
	}), X = async (e, t, n = null) => h.pickFile(g, {
		kind: e,
		title: t,
		...n && { exts: n }
	}), ie = (e, t, n) => a("div", { class: "ed-place" }, a("span", { class: "ctl-text ed-path" }, o(e?.mount ? "globe" : "folder"), e?.label || a("span", { class: "ed-ph" }, v("editor.choose"))), a("button", {
		class: "ctl-btn",
		type: "button",
		onclick: async () => {
			let e = await X("folder", t);
			e && n(w(e.id));
		}
	}, v("editor.choose")));
	function Z() {
		let e = [
			v("step.what"),
			v("step.when"),
			v("step.options")
		];
		if (N(F, ...e.map((e, t) => a("button", {
			type: "button",
			role: "tab",
			"aria-selected": String(t === k),
			class: t < k ? "done" : "",
			onclick: () => {
				k = t, Z();
			}
		}, a("i", {}, t < k ? "✓" : String(t + 1)), e))), !j) {
			N(L, a("p", { class: "ed-hint" }, v("editor.loading")));
			return;
		}
		N(L, ...m.from ? [a("p", { class: "ed-warn" }, o("info"), v("editor.proposedBy", { app: h.getApp(m.from)?.name ?? m.from }))] : [], ...[
			oe,
			ue,
			fe
		][k]()), me(), re.textContent = M;
		let t = a("button", {
			class: "ctl-btn",
			type: "button",
			disabled: k === 0,
			onclick: () => {
				k--, Z();
			}
		}, v("editor.back")), n = k < 2 ? a("button", {
			class: "ctl-btn vio",
			type: "button",
			onclick: () => {
				k === 0 && !D.name.trim() && (D.name = ae()), k++, Z();
			}
		}, v("editor.next")) : a("button", {
			class: "ctl-btn vio",
			type: "button",
			onclick: ge
		}, o("check"), v(x ? "editor.save" : "editor.create"));
		N(H, t, a("span", { class: "sc-grow" }), a("button", {
			class: "ctl-btn",
			type: "button",
			onclick: () => T.emit("close")
		}, v("editor.cancel")), n);
	}
	let Q = () => Z(), $ = () => me();
	function ae() {
		let e = D.what;
		return e.type === "notify" && e.text ? e.text.slice(0, 60) : e.type === "copy" && e.from?.label ? v("editor.suggest.copy", { from: e.from.label.split("/").pop() || e.from.label }) : E(e, A).slice(0, 60) || v(`kind.${e.type}.name`);
	}
	function oe() {
		let e = h.isInstalled("automata"), t = h.isInstalled("nettest"), n = a("div", {
			class: "ed-types",
			role: "radiogroup",
			"aria-label": v("step.what")
		}, y.map((n) => {
			let r = n.type === "automation" && !e || n.type === "collection" && !t || n.type === "service" && (!A.runtime || !A.services.length) || D.app && ![
				"notify",
				"service",
				"open"
			].includes(n.type);
			return a("button", {
				type: "button",
				role: "radio",
				class: `ed-type${D.what.type === n.type ? " on" : ""}`,
				"aria-checked": String(D.what.type === n.type),
				disabled: r || x && D.what.type !== n.type && !!D.app,
				onclick: () => {
					D.what.type !== n.type && (D.what = z(n.type), Q());
				}
			}, a("span", { class: `sc-kico k-${n.type}` }, o(n.glyph)), a("b", {}, v(`kind.${n.type}.name`)), a("span", { class: `sc-where${n.where === "browser" ? " br" : ""}` }, v(`where.${n.where}`)), a("small", {}, r && (n.type === "automation" || n.type === "collection") ? v(`kind.${n.type}.missing`) : v(`kind.${n.type}.hint`)));
		}));
		return [a("div", { class: "ed-what" }, n, a("div", { class: "ed-form" }, ...se(D.what)))];
	}
	function se(e) {
		if (e.type === "notify") {
			let t = e.open?.file === void 0 ? e.open?.app ? "app" : "none" : "file", n = h.installedApps().filter((e) => e.id !== "scheduler");
			return [
				U(v("notify.text"), G(e.text, (t) => {
					e.text = t, $();
				}, {
					rows: 3,
					maxLength: 300
				})),
				U(v("notify.level"), q(e.level, [
					"info",
					"success",
					"warning",
					"error"
				].map((e) => ({
					value: e,
					label: v(`level.${e}`)
				})), (t) => {
					e.level = t;
				})),
				U(v("notify.open"), J(t, [
					{
						value: "none",
						label: v("notify.openNone")
					},
					{
						value: "file",
						label: v("notify.openFile")
					},
					{
						value: "app",
						label: v("notify.openApp")
					}
				], (t) => {
					e.open = t === "none" ? null : t === "file" ? {
						file: void 0,
						label: ""
					} : {
						app: n[0]?.id ?? "",
						entry: "main",
						args: null
					}, Q();
				})),
				t === "file" ? U(v("notify.file"), a("div", { class: "ed-place" }, a("span", { class: "ctl-text ed-path" }, o("file"), e.open.label || a("span", { class: "ed-ph" }, v("editor.choose"))), a("button", {
					class: "ctl-btn",
					type: "button",
					onclick: async () => {
						let t = await X("file", v("notify.file"));
						t && (e.open = {
							file: t.id,
							label: C(t.id)
						}, Q());
					}
				}, v("editor.choose")))) : null,
				t === "app" ? U(v("notify.app"), q(e.open.app, n.map((e) => ({
					value: e.id,
					label: e.name
				})), (t) => {
					e.open = {
						app: t,
						entry: "main",
						args: null
					};
				})) : null
			];
		}
		if (e.type === "service") {
			let t = A.services.filter((e) => !D.app || e.app === D.app);
			!e.app && t[0] && Object.assign(e, {
				app: t[0].app,
				entry: t[0].entry,
				params: {}
			});
			let n = t.find((t) => t.app === e.app && t.entry === e.entry);
			return [
				U(v("service.which"), q(`${e.app}#${e.entry}`, t.map((e) => ({
					value: `${e.app}#${e.entry}`,
					label: `${e.name} · ${e.label}`
				})), (t) => {
					let [n, r] = t.split("#");
					Object.assign(e, {
						app: n,
						entry: r,
						params: {}
					}), Q();
				})),
				n?.params && Object.keys(n.params).length ? te(n.params, e.params, {
					t: v,
					pathAs: "tilde",
					live: !0,
					pickFile: (e) => X(e.kind, e.title),
					onChange: (t) => {
						e.params = t;
					}
				}).el : a("p", { class: "ed-hint" }, v("service.noParams")),
				a("p", { class: "ed-hint" }, v("service.hint"))
			];
		}
		if (e.type === "copy") return [
			a("div", { class: "ed-two" }, U(v("copy.from"), ie(e.from, v("copy.from"), (t) => {
				e.from = t, Q();
			})), U(v("copy.to"), ie(e.to, v("copy.to"), (t) => {
				e.to = t, Q();
			}))),
			U(v("copy.how"), Y(e.mode, [
				{
					value: "versions",
					label: v("copy.versions", { keep: e.keep })
				},
				{
					value: "update",
					label: v("copy.update")
				},
				{
					value: "mirror",
					label: v("copy.mirror")
				}
			], (t) => {
				e.mode = t, Q();
			})),
			e.mode === "versions" ? U(v("copy.keep"), W(e.keep, (t) => {
				e.keep = Math.max(1, Math.min(100, Number(t) || 1));
			}, {
				type: "number",
				min: 1,
				max: 100
			})) : null,
			U(v("copy.exclude"), W(e.exclude.join(", "), (t) => {
				e.exclude = t.split(",").map((e) => e.trim()).filter(Boolean);
			}, { placeholder: "*.tmp, ~$*, .cache" }), v("copy.excludeHint")),
			a("p", { class: "ed-hint" }, v("copy.hint"))
		];
		if (e.type === "command") {
			let t = !!e.host || e._ssh;
			return [
				U(v("command.where"), J(t ? "ssh" : "lilos", [{
					value: "lilos",
					label: v("command.inLilos")
				}, {
					value: "ssh",
					label: v("command.onSsh"),
					disabled: !A.hosts.length
				}], (t) => {
					t === "ssh" ? (e._ssh = !0, e.host = A.hosts[0]?.id ?? null, e.hostLabel = A.hosts[0]?.name ?? "", e.cwd = null) : (e._ssh = !1, e.host = null, e.hostLabel = ""), Q();
				})),
				t ? U(v("command.host"), q(e.host, A.hosts.map((e) => ({
					value: e.id,
					label: `${e.name} · ${e.address}`
				})), (t) => {
					e.host = t, e.hostLabel = A.hosts.find((e) => e.id === t)?.name ?? "";
				})) : null,
				U(v("command.lines"), G(e.lines, (t) => {
					e.lines = t, $();
				}, {
					rows: 6,
					mono: !0,
					placeholder: v("command.placeholder")
				}), v(t ? "command.sshHint" : "command.hint")),
				t ? null : U(v("command.cwd"), a("div", { class: "ed-place" }, a("span", { class: "ctl-text ed-path" }, o("folder"), e.cwdLabel || "~"), a("button", {
					class: "ctl-btn",
					type: "button",
					onclick: async () => {
						let t = await X("folder", v("command.cwd"));
						t && (e.cwd = t.id, e.cwdLabel = C(t.id), Q());
					}
				}, v("editor.choose")))),
				le(e, ["replace", "append"])
			];
		}
		if (e.type === "web") {
			let t = a("div", { class: "ed-headers" }, e.headers.map((t, n) => a("div", { class: "ed-header" }, W(t.name, (e) => {
				t.name = e;
			}, {
				placeholder: v("web.headerName"),
				label: v("web.headerName")
			}), t.secret && t.set && t.value === void 0 ? a("span", { class: "ctl-text ed-secret" }, "••••••••", a("button", {
				class: "sc-link",
				type: "button",
				onclick: () => {
					t.value = "", t.set = !1, Q();
				}
			}, v("web.change"))) : W(t.value ?? "", (e) => {
				t.value = e;
			}, {
				placeholder: v("web.headerValue"),
				label: v("web.headerValue"),
				type: t.secret ? "password" : "text"
			}), Object.assign(K(t.secret, (e) => {
				t.secret = e, Q();
			}, [o("lock"), v("web.secret")]), { title: v("web.secretHint") }), a("button", {
				class: "sc-icon",
				type: "button",
				title: v("web.removeHeader"),
				"aria-label": v("web.removeHeader"),
				onclick: () => {
					e.headers.splice(n, 1), Q();
				}
			}, o("x"))))), n = typeof e.expect.status == "number" ? "n" : e.expect.status;
			return [
				a("div", { class: "ed-url" }, q(e.method, [
					"GET",
					"HEAD",
					"POST",
					"PUT",
					"PATCH",
					"DELETE"
				].map((e) => ({
					value: e,
					label: e
				})), (t) => {
					e.method = t, (t === "GET" || t === "HEAD") && (e.body = { kind: "none" }), Q();
				}, v("web.method")), W(e.url, (t) => {
					e.url = t.trim(), $();
				}, {
					type: "url",
					label: v("web.url"),
					placeholder: "https://…"
				})),
				U(v("web.headers"), a("div", {}, t, a("button", {
					class: "ctl-btn",
					type: "button",
					onclick: () => {
						e.headers.push({
							name: "",
							value: "",
							secret: !1
						}), Q();
					}
				}, o("plus"), v("web.addHeader")))),
				e.method !== "GET" && e.method !== "HEAD" ? U(v("web.body"), a("div", {}, q(e.body.kind, [
					"none",
					"text",
					"json",
					"form"
				].map((e) => ({
					value: e,
					label: v(`web.body.${e}`)
				})), (t) => {
					e.body = t === "none" ? { kind: "none" } : {
						kind: t,
						text: e.body.text ?? ""
					}, Q();
				}, v("web.body")), e.body.kind === "none" ? null : G(e.body.text, (t) => {
					e.body.text = t;
				}, {
					rows: 4,
					mono: !0
				}))) : null,
				a("div", { class: "ed-two" }, U(v("web.status"), a("div", { class: "ed-line" }, q(n, [
					{
						value: "2xx",
						label: "200–299"
					},
					{
						value: "any",
						label: v("web.anyStatus")
					},
					{
						value: "n",
						label: v("web.exactStatus")
					}
				], (t) => {
					e.expect.status = t === "n" ? 200 : t, Q();
				}, v("web.status")), n === "n" ? W(e.expect.status, (t) => {
					e.expect.status = Number(t) || 200;
				}, {
					type: "number",
					min: 100,
					max: 599,
					small: !0
				}) : null)), U(v("web.contains"), W(e.expect.contains ?? "", (t) => {
					e.expect.contains = t || null;
				}, { placeholder: v("web.containsPh") }))),
				U(v("web.timeout"), a("div", { class: "ed-line" }, W(e.timeoutS, (t) => {
					e.timeoutS = Math.max(1, Math.min(300, Number(t) || 30));
				}, {
					type: "number",
					min: 1,
					max: 300,
					small: !0
				}), a("span", {}, v("web.seconds")))),
				le(e, ["replace", "dated"]),
				a("p", { class: "ed-hint" }, v("web.hint"))
			];
		}
		if (e.type === "open") {
			let t = e.file !== void 0 && e.file !== null ? "file" : "app", n = h.installedApps().filter((e) => e.id !== "scheduler" && (!D.app || e.id === D.app));
			return t === "app" && !e.app && n[0] && (e.app = n[0].id, e.label = n[0].name), [
				U(v("open.what"), J(t, [{
					value: "app",
					label: v("open.app")
				}, {
					value: "file",
					label: v("open.file"),
					disabled: !!D.app
				}], (e) => {
					D.what = e === "file" ? {
						type: "open",
						file: null,
						label: ""
					} : z("open"), Q();
				})),
				t === "app" ? U(v("open.app"), q(e.app, n.map((e) => ({
					value: e.id,
					label: e.name
				})), (t) => {
					e.app = t, e.label = n.find((e) => e.id === t)?.name ?? t, $();
				})) : U(v("open.file"), a("div", { class: "ed-place" }, a("span", { class: "ctl-text ed-path" }, o("file"), e.label || a("span", { class: "ed-ph" }, v("editor.choose"))), a("button", {
					class: "ctl-btn",
					type: "button",
					onclick: async () => {
						let t = await X("file", v("open.file"));
						t && (e.file = t.id, e.label = C(t.id), Q());
					}
				}, v("editor.choose")))),
				a("p", { class: "ed-warn" }, o("window"), v("open.browserHint"))
			];
		}
		return e.type === "collection" ? ce(e) : [U(v("automation.file"), a("div", { class: "ed-place" }, a("span", { class: "ctl-text ed-path" }, o("automation"), e.label || a("span", { class: "ed-ph" }, v("editor.choose"))), a("button", {
			class: "ctl-btn",
			type: "button",
			onclick: async () => {
				let t = await X("file", v("automation.file"), ["automata"]);
				t && (e.file = t.id, e.label = C(t.id), Q());
			}
		}, v("editor.choose")))), a("p", { class: "ed-warn" }, o("window"), v("automation.hint"))];
	}
	function ce(e) {
		let t = a("select", {
			class: "ctl-select",
			disabled: !e.file,
			onchange: (t) => {
				e.environment = t.target.value || null, e.environmentLabel = t.target.selectedOptions[0]?.dataset.name ?? "";
			}
		}, a("option", { value: "" }, v("collection.envNone")));
		return e.file && i.read(e.file).then((n) => {
			let r = JSON.parse(n)?.environments;
			for (let n of Array.isArray(r) ? r : []) typeof n?.id == "string" && t.append(a("option", {
				value: n.id,
				selected: n.id === e.environment,
				dataset: { name: String(n.name ?? "") }
			}, String(n.name ?? n.id)));
		}).catch(() => {}), [
			U(v("collection.file"), a("div", { class: "ed-place" }, a("span", { class: "ctl-text ed-path" }, o("bolt"), e.label || a("span", { class: "ed-ph" }, v("editor.choose"))), a("button", {
				class: "ctl-btn",
				type: "button",
				onclick: async () => {
					let t = await X("file", v("collection.file"), ["nettest"]);
					t && (e.file = t.id, e.label = C(t.id), e.environment = null, e.environmentLabel = "", Q());
				}
			}, v("editor.choose")))),
			U(v("collection.env"), t),
			a("p", { class: "ed-warn" }, o("monitor"), v("collection.hint"))
		];
	}
	function le(e, t) {
		let n = !!e.saveTo;
		return U(v("saveTo.title"), a("div", { class: "ed-saveto" }, K(n, (n) => {
			e.saveTo = n ? {
				folder: "root",
				label: "~",
				name: e.type === "web" ? "risposta.txt" : "output.txt",
				mode: t[0]
			} : null, Q();
		}, v(e.type === "web" ? "saveTo.web" : "saveTo.command")), n ? a("div", { class: "ed-line" }, a("button", {
			class: "ctl-btn",
			type: "button",
			onclick: async () => {
				let t = await X("folder", v("saveTo.folder"));
				t && !i.isRemote?.(t.id) && (e.saveTo.folder = t.id === i.root ? "root" : t.id, e.saveTo.label = C(t.id), Q());
			}
		}, o("folder"), e.saveTo.label || "~"), W(e.saveTo.name, (t) => {
			e.saveTo.name = t.trim();
		}, { label: v("saveTo.name") }), q(e.saveTo.mode, t.map((e) => ({
			value: e,
			label: v(`saveTo.${e}`)
		})), (t) => {
			e.saveTo.mode = t;
		}, v("saveTo.mode"))) : null));
	}
	function ue() {
		let e = D.form, t = [J(e.mode, [
			{
				value: "once",
				label: v("when.once")
			},
			{
				value: "repeat",
				label: v("when.repeat")
			},
			{
				value: "cron",
				label: v("when.cron")
			}
		], (t) => {
			if (t === "cron" && e.mode === "repeat") {
				let t = l.rules.toCron(pe());
				t && (e.cron = t);
			}
			if (t === "repeat" && e.mode === "cron") {
				let t = l.rules.fromCron(e.cron, {
					tz: e.tz,
					start: e.start
				});
				t && Object.assign(e, B(t), { mode: "repeat" });
			}
			e.mode = t, Q();
		})];
		if (e.mode === "once") t.push(a("div", { class: "ed-two" }, U(v("when.date"), W(e.once.slice(0, 10), (t) => {
			e.once = `${t}T${e.once.slice(11)}`, $();
		}, { type: "date" })), U(v("when.time"), W(e.once.slice(11), (t) => {
			e.once = `${e.once.slice(0, 10)}T${t}`, $();
		}, { type: "time" }))));
		else if (e.mode === "cron") t.push(U(v("when.cronField"), W(e.cron, (t) => {
			e.cron = t, $();
		}, { mono: !0 }), v("when.cronHint")));
		else {
			let n = e.every.unit;
			if (t.push(U(v("when.every"), a("div", { class: "ed-line" }, W(e.every.n, (t) => {
				e.every.n = Math.max(1, Number(t) || 1), $();
			}, {
				type: "number",
				min: 1,
				small: !0,
				label: v("when.n")
			}), q(n, ne.map((t) => ({
				value: t,
				label: v(`unit.${t}`, { n: e.every.n })
			})), (t) => {
				e.every.unit = t, Q();
			}, v("when.unit"))))), (n === "week" || n === "minute" || n === "hour") && t.push(U(v(n === "week" ? "when.on" : "when.onlyDays"), a("div", {
				class: "ed-days",
				role: "group"
			}, P.map((t) => a("button", {
				type: "button",
				"aria-pressed": String(e.days.includes(t)),
				title: v(`day.${t}`),
				onclick: () => {
					e.days = e.days.includes(t) ? e.days.filter((e) => e !== t) : [...e.days, t].sort(), e.days.length || (e.days = [t]), Q();
				}
			}, v(`day.${t}.short`)))))), n === "minute" || n === "hour") t.push(U(v("when.between"), a("div", { class: "ed-line" }, K(!!e.between, (t) => {
				e.between = t ? ["09:00", "18:00"] : null, Q();
			}, null, v("when.between")), e.between ? W(e.between[0], (t) => {
				e.between[0] = t, $();
			}, {
				type: "time",
				label: v("when.from")
			}) : null, e.between ? a("span", {}, v("when.to")) : null, e.between ? W(e.between[1], (t) => {
				e.between[1] = t, $();
			}, {
				type: "time",
				label: v("when.until")
			}) : null)));
			else {
				if (n === "month" || n === "year") {
					let r = e.monthly;
					t.push(U(v("when.onDay"), a("div", { class: "ed-line" }, n === "year" ? q(e.month, Array.from({ length: 12 }, (e, t) => ({
						value: t + 1,
						label: _.date(Date.UTC(2e3, t, 1), {
							month: "long",
							timeZone: "UTC"
						})
					})), (t) => {
						e.month = Number(t), $();
					}, v("when.month")) : null, q(r.kind, [
						{
							value: "day",
							label: v("when.dayN")
						},
						{
							value: "last",
							label: v("when.lastDay")
						},
						{
							value: "nth",
							label: v("when.nthWeekday")
						}
					], (e) => {
						r.kind = e, Q();
					}, v("when.onDay")), r.kind === "day" ? W(r.day, (e) => {
						r.day = Math.max(1, Math.min(31, Number(e) || 1)), $();
					}, {
						type: "number",
						min: 1,
						max: 31,
						small: !0
					}) : null, r.kind === "nth" ? q(r.nth, [
						1,
						2,
						3,
						4,
						5,
						-1
					].map((e) => ({
						value: e,
						label: v(`nth.${e}`)
					})), (e) => {
						r.nth = Number(e), $();
					}, v("when.nth")) : null, r.kind === "nth" ? q(r.weekday, P.map((e) => ({
						value: e,
						label: v(`day.${e}`)
					})), (e) => {
						r.weekday = Number(e), $();
					}, v("when.weekday")) : null)));
				}
				t.push(U(v("when.at"), a("div", { class: "ed-times" }, e.times.map((t, n) => a("span", { class: "ed-chip" }, W(t, (t) => {
					e.times[n] = t, $();
				}, {
					type: "time",
					label: v("when.time")
				}), e.times.length > 1 ? a("button", {
					class: "sc-icon",
					type: "button",
					"aria-label": v("when.removeTime"),
					onclick: () => {
						e.times.splice(n, 1), Q();
					}
				}, o("x")) : null)), a("button", {
					class: "ctl-btn",
					type: "button",
					onclick: () => {
						e.times.push("12:00"), Q();
					}
				}, o("plus"), v("when.addTime")))));
			}
		}
		return e.mode === "once" ? t.push(U(v("when.zone"), de(e))) : (t.push(a("div", { class: "ed-two" }, U(v("when.start"), W(e.start, (t) => {
			e.start = t, $();
		}, { type: "datetime-local" })), U(v("when.zone"), de(e)))), t.push(U(v("when.end"), a("div", { class: "ed-line" }, Y(e.endKind, [
			{
				value: "never",
				label: v("when.never")
			},
			{
				value: "date",
				label: v("when.onDate")
			},
			{
				value: "count",
				label: v("when.after")
			}
		], (t) => {
			e.endKind = t, Q();
		}), e.endKind === "date" ? W(e.end || e.start.slice(0, 10), (t) => {
			e.end = t, $();
		}, {
			type: "date",
			label: v("when.onDate")
		}) : null, e.endKind === "count" ? W(e.count, (t) => {
			e.count = Math.max(1, Number(t) || 1), $();
		}, {
			type: "number",
			min: 1,
			small: !0,
			label: v("when.after")
		}) : null, e.endKind === "count" ? a("span", {}, v("when.times")) : null)))), t;
	}
	function de(e) {
		let t = [];
		try {
			t = Intl.supportedValuesOf("timeZone");
		} catch {
			t = [e.tz];
		}
		t.includes(e.tz) || t.unshift(e.tz);
		let n = S();
		return q(e.tz, t.map((e) => ({
			value: e,
			label: e === n ? v("when.thisBrowser", { zone: e }) : e
		})), (t) => {
			e.tz = t, $();
		}, v("when.zone"));
	}
	function fe() {
		let e = D.options, t = b(D.what.type).where === "browser", n = [
			U(v("opt.name"), W(D.name, (e) => {
				D.name = e;
			}, { maxLength: 120 })),
			U(v("opt.missed"), Y(e.missed, [{
				value: "once",
				label: v("opt.missedOnce")
			}, {
				value: "skip",
				label: v("opt.missedSkip")
			}], (t) => {
				e.missed = t;
			})),
			t ? U(v("opt.closed"), K(e.ask, (t) => {
				e.ask = t;
			}, v("opt.ask"))) : null,
			U(v("opt.overlap"), Y(e.overlap, [
				{
					value: "skip",
					label: v("opt.overlapSkip")
				},
				{
					value: "queue",
					label: v("opt.overlapQueue")
				},
				{
					value: "parallel",
					label: v("opt.overlapParallel")
				}
			], (t) => {
				e.overlap = t;
			})),
			a("div", { class: "ed-two" }, U(v("opt.timeout"), a("div", { class: "ed-line" }, W(e.timeoutMin, (t) => {
				e.timeoutMin = Math.max(1, Math.min(1440, Number(t) || 60));
			}, {
				type: "number",
				min: 1,
				max: 1440,
				small: !0
			}), a("span", {}, v("opt.minutes")))), U(v("opt.retries"), a("div", { class: "ed-line" }, W(e.retries, (t) => {
				e.retries = Math.max(0, Math.min(5, Number(t) || 0));
			}, {
				type: "number",
				min: 0,
				max: 5,
				small: !0
			}), a("span", {}, v("opt.timesEvery")), W(e.retryMin, (t) => {
				e.retryMin = Math.max(1, Math.min(1440, Number(t) || 5));
			}, {
				type: "number",
				min: 1,
				max: 1440,
				small: !0
			}), a("span", {}, v("opt.minutes"))))),
			U(v("opt.notify"), Y(e.notify, [
				{
					value: "error",
					label: v("opt.notifyError")
				},
				{
					value: "always",
					label: v("opt.notifyAlways")
				},
				{
					value: "never",
					label: v("opt.notifyNever")
				}
			], (t) => {
				e.notify = t;
			}))
		];
		if (ee && !x) {
			let e = A.users.filter((e) => e.id !== f.user?.id);
			n.push(U(v("opt.runAs"), q(D.owner ?? "", [
				{
					value: "",
					label: v("opt.me", { name: f.user?.name ?? "" })
				},
				{
					value: "*",
					label: v("owner.system")
				},
				...e.map((e) => ({
					value: e.id,
					label: e.name || e.username
				}))
			], (e) => {
				D.owner = e || null, Q();
			}, v("opt.runAs")), D.owner === "*" ? v("opt.systemHint") : D.owner ? v("opt.otherHint") : null));
		}
		return n.push(K(D.enabled, (e) => {
			D.enabled = e;
		}, v("opt.enabled"))), n;
	}
	function pe() {
		try {
			return l.rules.checkWhen(V(D.form));
		} catch {
			return null;
		}
	}
	function me() {
		let e = null, t = "";
		try {
			e = l.rules.checkWhen(V(D.form));
		} catch (e) {
			t = e.message;
		}
		let n = [a("div", { class: "sc-sub" }, v("side.words")), a("div", { class: "ed-words" }, e ? l.describe(e) : "—")];
		if (e && n.push(a("div", { class: "ed-tz" }, e.tz)), t && n.push(a("p", { class: "ed-bad" }, t)), e) {
			let t = l.rules.between(e, Date.now(), Date.now() + 158112e6, 6);
			n.push(a("div", { class: "sc-sub" }, v("side.next")), t.length ? a("div", { class: "sc-nexts" }, t.map((e) => a("span", {}, a("b", {}, O(e))))) : a("p", { class: "ed-hint" }, v("side.noMore")));
			let r = l.rules.toCron(e);
			r && n.push(a("div", { class: "sc-sub" }, v("side.cron")), a("code", { class: "ed-cron" }, r));
		}
		n.push(a("div", { class: "sc-sub" }, v("side.what")), a("div", { class: "ed-summary" }, a("span", { class: `sc-kico k-${D.what.type}` }, o(b(D.what.type).glyph)), E(D.what, A) || v(`kind.${D.what.type}.name`))), b(D.what.type).where === "browser" && n.push(a("p", { class: "ed-warn" }, o("window"), v("side.browser"))), N(R, ...n);
	}
	function he() {
		let e = I(D.what);
		return delete e._ssh, e.type === "web" && (e.headers = D.what.headers.filter((e) => e.name).map((e) => e.secret ? e.value ? {
			name: e.name,
			secret: !0,
			value: e.value
		} : {
			name: e.name,
			secret: !0
		} : {
			name: e.name,
			value: e.value ?? ""
		})), e.type === "open" && e.file === null && delete e.file, {
			name: D.name.trim() || ae(),
			enabled: D.enabled,
			when: V(D.form),
			what: e,
			options: D.options,
			...!x && D.owner && { owner: D.owner }
		};
	}
	async function ge() {
		M = "";
		try {
			let t = he();
			x ? await l.update(e, t) : await l.create(t), T.emit("close");
		} catch (e) {
			M = e.message, Z(), await s(T, {
				icon: "error",
				title: v("error.save"),
				text: e.message
			});
		}
	}
	return Z(), T;
}
// src/scheduler/list.js
var U = (e, ...t) => e.replaceChildren(...t.flat(Infinity).filter((e) => e != null && e !== !1)), W = 250;
function G({ args: e = {}, openWindow: n } = {}) {
	let r = new t({
		title: v("app.name"),
		icon: "clock",
		width: 1120,
		height: 620,
		minWidth: 760,
		minHeight: 420
	}), i = {
		admin: !1,
		tasks: [],
		catalog: null,
		filter: "all",
		group: null,
		search: "",
		tab: e?.tab === "history" || e?.run ? "history" : "list",
		selected: typeof e?.task == "string" ? e.task : null,
		runs: [],
		runFilter: {
			task: typeof e?.task == "string" && (e?.tab === "history" || e?.run) ? e.task : "",
			state: ""
		},
		openRun: typeof e?.run == "string" ? e.run : null,
		lastRuns: /* @__PURE__ */ new Map(),
		error: ""
	}, c = () => f.user?.id ?? "local", u = a("div", { class: "sc-tools" }), d = a("nav", {
		class: "sc-side",
		"aria-label": v("side.label")
	}), p = a("div", { class: "sc-main" }), m = a("aside", {
		class: "sc-detail",
		"aria-label": v("detail.label")
	}), h = a("div", { class: "sc-status" }), g = a("div", { class: "sc-body" }, d, p, m);
	if (r.body.append(a("div", { class: "sc" }, u, g, h)), !l?.available) return U(g, a("p", { class: "sc-empty" }, v("needsKernel"))), r;
	let _ = 0, y = () => {
		clearTimeout(_), _ = setTimeout(() => S().catch(() => {}), W);
	};
	async function S() {
		try {
			let [e, t] = await Promise.all([l.overview(), i.catalog ? i.catalog : l.catalog()]);
			i.admin = e.admin, i.tasks = e.tasks, i.catalog = t, i.error = "", i.selected && !i.tasks.some((e) => e.id === i.selected) && (i.selected = null), i.tab === "history" && (i.runs = await l.history({
				task: i.runFilter.task || void 0,
				state: i.runFilter.state || void 0,
				limit: 200
			})), i.selected && i.lastRuns.set(i.selected, await l.history({
				task: i.selected,
				limit: 14
			}));
		} catch (e) {
			i.error = e.message;
		}
		j();
	}
	let C = [l.on("change", y), l.on("run", y)];
	r.on("destroy", () => {
		clearTimeout(_), C.forEach((e) => e?.());
	}), r.on("launch", (e) => {
		e?.task && (i.selected = e.task), (e?.tab === "history" || e?.run) && (i.tab = "history", i.openRun = e.run ?? null, i.runFilter.task = e.task ?? ""), S();
	});
	let w = (e) => e === "*" ? v("owner.system") : e === c() ? v("owner.me") : i.catalog?.users?.find((t) => t.id === e)?.name ?? e, T = (e) => b(e).where, D = () => i.tasks.filter((e) => {
		let t = i.filter;
		if (t === "active" && !e.enabled || t === "paused" && e.enabled || t === "failed" && e.last?.state !== "error" || t === "mine" && (e.owner !== c() || e.app) || t === "apps" && !e.app || t === "kernel" && T(e.what.type) !== "kernel" || t === "browser" && T(e.what.type) !== "browser" || i.group !== null && e.owner !== i.group) return !1;
		let n = i.search.trim().toLowerCase();
		return !(n && !`${e.name} ${E(e.what, i.catalog)}`.toLowerCase().includes(n));
	});
	function j() {
		M(), te(), i.tab === "history" ? I() : F(), R();
		let e = i.tasks.filter((e) => e.enabled).length;
		U(h, a("span", {}, a("i", { class: "sc-dot on" }), v("status.module")), a("span", {}, v("status.count", {
			n: i.tasks.length,
			active: e
		})), i.error ? a("span", {
			class: "sc-err",
			role: "alert"
		}, i.error) : null);
	}
	function M() {
		let e = i.tasks.find((e) => e.id === i.selected), t = (e, t, n) => a("button", {
			type: "button",
			"aria-pressed": String(i.tab === e),
			onclick: () => {
				i.tab = e, S();
			}
		}, o(t), n), r = a("input", {
			class: "ctl-text sc-search",
			type: "search",
			placeholder: v("tools.search"),
			value: i.search,
			"aria-label": v("tools.search")
		});
		r.addEventListener("input", () => {
			i.search = r.value, F();
		}), U(u, a("button", {
			class: "ctl-btn vio",
			type: "button",
			onclick: () => L(n, {})
		}, o("plus"), v("tools.new")), a("button", {
			class: "ctl-btn",
			type: "button",
			disabled: !e,
			onclick: () => B(e)
		}, o("play"), v("tools.run")), a("button", {
			class: "ctl-btn",
			type: "button",
			disabled: !e,
			onclick: () => V(e)
		}, o(e?.enabled === !1 ? "play" : "pause"), e?.enabled === !1 ? v("tools.resume") : v("tools.pause")), a("span", { class: "sc-grow" }), a("div", {
			class: "sc-tabs",
			role: "group"
		}, t("list", "list", v("tabs.list")), t("history", "restart", v("tabs.history"))), i.tab === "list" ? r : null);
	}
	function te() {
		let e = (e) => i.tasks.filter(e).length, t = (e, t, n, r, { err: s = !1, group: c = void 0 } = {}) => a("button", {
			class: "sc-flt",
			type: "button",
			"aria-current": String(c === void 0 ? i.filter === e && i.group === null : i.group === c && i.filter === "all"),
			onclick: () => {
				i.filter = c === void 0 ? e : "all", i.group = c === void 0 ? null : c, i.tab = "list", j();
			}
		}, o(t), a("span", {}, n), a("span", { class: `sc-n${s && r ? " err" : ""}` }, String(r))), n = [
			a("h6", {}, v("side.operations")),
			t("all", "list", v("side.all"), i.tasks.length),
			t("active", "play", v("side.active"), e((e) => e.enabled)),
			t("paused", "pause", v("side.paused"), e((e) => !e.enabled)),
			t("failed", "error", v("side.failed"), e((e) => e.last?.state === "error"), { err: !0 })
		];
		if (i.admin) {
			n.push(a("h6", {}, v("side.system")), t("", "monitor", v("owner.system"), e((e) => e.owner === "*"), { group: "*" }));
			let r = [...new Set(i.tasks.map((e) => e.owner).filter((e) => e !== "*"))];
			for (let e of i.catalog?.users ?? []) r.includes(e.id) || r.push(e.id);
			n.push(a("h6", {}, v("side.users")));
			for (let i of r.sort((e, t) => e === c() ? -1 : t === c() ? 1 : w(e).localeCompare(w(t)))) n.push(t("", "user", i === c() ? v("owner.meNamed", { name: f.user?.name ?? "" }) : w(i), e((e) => e.owner === i), { group: i }));
		} else n.push(a("h6", {}, v("side.madeBy")), t("mine", "user", v("side.mine"), e((e) => !e.app)), t("apps", "grid", v("side.apps"), e((e) => !!e.app)));
		n.push(a("h6", {}, v("side.where")), t("kernel", "monitor", v("where.kernel"), e((e) => T(e.what.type) === "kernel")), t("browser", "window", v("where.browser"), e((e) => T(e.what.type) === "browser"))), U(d, ...n);
	}
	let N = (e) => a("span", { class: `sc-kico k-${e}` }, o(b(e).glyph)), ne = (e) => {
		if (!e.enabled && !e.last) return a("span", { class: "sc-st pause" }, o("pause"), v("state.paused"));
		if (!e.last) return a("span", { class: "sc-m" }, "—");
		let t = e.last.state;
		return a("span", { class: `sc-st ${t}` }, o(x[t] ?? "info"), t === "error" ? v("last.failed", { when: O(e.last.at) }) : O(e.last.at));
	};
	function P(e) {
		let t = e.enabled ? e.next ? O(e.next) : v("next.done") : v("state.paused");
		return a("div", {
			class: `sc-row${e.id === i.selected ? " sel" : ""}${e.enabled ? "" : " off"}`,
			role: "row",
			tabindex: "0",
			"aria-selected": String(e.id === i.selected),
			onclick: () => re(e.id),
			ondblclick: () => L(n, { id: e.id }),
			onkeydown: (t) => {
				t.key === "Enter" && L(n, { id: e.id });
			}
		}, N(e.what.type), a("span", { class: "sc-nm" }, a("b", {}, e.name), a("small", {}, a("span", { class: `sc-where${T(e.what.type) === "browser" ? " br" : ""}` }, v(`where.${T(e.what.type)}`)), e.app ? a("span", { class: "sc-from" }, v("row.byApp", { app: e.app })) : null, a("span", {}, E(e.what, i.catalog)))), a("span", { class: "sc-m" }, A(e.when)), a("span", { class: "sc-m" }, a("b", {}, t)), ne(e));
	}
	function F() {
		if (i.tab !== "list") return;
		let e = D(), t = a("div", {
			class: "sc-row head",
			role: "row"
		}, a("span"), a("span", {}, v("col.name")), a("span", {}, v("col.when")), a("span", {}, v("col.next")), a("span", {}, v("col.last"))), r = [];
		if (i.admin && i.group === null && i.filter === "all") {
			let t = [...new Set(e.map((e) => e.owner))].sort((e, t) => e === "*" ? -1 : t === "*" ? 1 : e === c() ? -1 : +(t === c()));
			for (let n of t) r.push(a("div", { class: "sc-grp" }, o(n === "*" ? "monitor" : "user"), n === c() ? v("owner.meNamed", { name: f.user?.name ?? "" }) : w(n), a("small", {}, n === "*" ? v("grp.system") : v("grp.count", { n: e.filter((e) => e.owner === n).length })))), r.push(...e.filter((e) => e.owner === n).map(P));
		} else r.push(...e.map(P));
		U(p, t, a("div", {
			class: "sc-rows",
			role: "rowgroup"
		}, r.length ? r : a("div", { class: "sc-empty" }, i.tasks.length ? v("list.noneHere") : a("div", { class: "sc-welcome" }, o("clock"), a("h2", {}, v("welcome.title")), a("p", {}, v("welcome.text")), a("button", {
			class: "ctl-btn vio",
			type: "button",
			onclick: () => L(n, {})
		}, o("plus"), v("tools.new"))))));
	}
	function I() {
		let e = a("select", {
			class: "ctl-select",
			"aria-label": v("history.task")
		}, a("option", { value: "" }, v("history.allTasks")), i.tasks.map((e) => a("option", {
			value: e.id,
			selected: e.id === i.runFilter.task
		}, e.name)));
		e.addEventListener("change", () => {
			i.runFilter.task = e.value, S();
		});
		let t = a("select", {
			class: "ctl-select",
			"aria-label": v("history.state")
		}, a("option", { value: "" }, v("history.allStates")), [
			"ok",
			"error",
			"skipped",
			"waiting",
			"cancelled"
		].map((e) => a("option", {
			value: e,
			selected: e === i.runFilter.state
		}, v(`state.${e}`))));
		t.addEventListener("change", () => {
			i.runFilter.state = t.value, S();
		});
		let n = i.runs.map((e) => {
			let t = e.id === i.openRun, n = {
				time: v("reason.time"),
				catchup: v("reason.catchup"),
				manual: v("reason.manual"),
				retry: v("reason.retry", { n: e.attempt })
			}[e.reason] ?? e.reason, r = a("div", {
				class: `sc-hrow${t ? " sel" : ""}${e.state === "error" ? " err" : ""}`,
				tabindex: "0",
				role: "row",
				onclick: () => {
					i.openRun = t ? null : e.id, I();
				},
				onkeydown: (n) => {
					n.key === "Enter" && (i.openRun = t ? null : e.id, I());
				}
			}, a("span", { class: `sc-st ${e.state}` }, o(x[e.state] ?? "info")), a("span", { class: "sc-t" }, O(e.at ?? e.due)), a("span", { class: "sc-w" }, a("b", {}, `${e.name}${e.state === "ok" ? "" : ` · ${v(`state.${e.state}`)}`}`), a("small", {}, e.reason === "catchup" ? v("history.catchup", {
				due: O(e.due),
				text: e.text || ""
			}) : e.text || "")), a("span", { class: "sc-t" }, e.end && e.at ? k(e.end - e.at) : "—"), a("span", { class: "sc-t" }, n));
			return t && e.log ? [r, a("pre", { class: "sc-log" }, e.log)] : [r];
		}).flat();
		U(p, a("div", { class: "sc-hfilters" }, e, t), a("div", {
			class: "sc-hrow head",
			role: "row"
		}, a("span"), a("span", {}, v("col.when")), a("span", {}, v("history.what")), a("span", {}, v("history.took")), a("span", {}, v("history.how"))), a("div", { class: "sc-rows" }, n.length ? n : a("div", { class: "sc-empty" }, v("history.none")))), p.querySelector(".sc-hrow.sel")?.scrollIntoView({ block: "nearest" });
	}
	function R() {
		let e = i.tasks.find((e) => e.id === i.selected);
		if (m.hidden = i.tab === "history" || !e, !e) return U(m);
		let t = i.lastRuns.get(e.id) ?? [], r = ee(e);
		U(m, a("h4", {}, N(e.what.type), a("span", {}, e.name)), a("dl", { class: "sc-kv" }, a("dt", {}, v("detail.when")), a("dd", {}, A(e.when), a("br"), a("span", { class: "sc-tz" }, e.when.tz)), a("dt", {}, v("detail.what")), a("dd", {}, E(e.what, i.catalog)), a("dt", {}, v("detail.runs")), a("dd", {}, T(e.what.type) === "kernel" ? v("detail.inKernel", { who: w(e.owner) }) : v("detail.inBrowser", { who: w(e.owner) })), a("dt", {}, v("detail.missed")), a("dd", {}, e.options.missed === "once" ? v("detail.missedOnce") : v("detail.missedSkip")), e.by && e.by.id !== e.owner ? [a("dt", {}, v("detail.by")), a("dd", {}, e.by.name)] : null), a("div", {}, a("div", { class: "sc-sub" }, v("detail.next")), r.length ? a("div", { class: "sc-nexts" }, r.map((e) => a("span", {}, a("b", {}, O(e))))) : a("p", { class: "sc-hint" }, e.enabled ? v("next.done") : v("state.paused"))), a("div", {}, a("div", { class: "sc-sub" }, v("detail.last", { n: t.length })), a("div", { class: "sc-dots" }, t.slice().reverse().map((e) => a("i", {
			class: `d-${e.state}`,
			title: `${O(e.at ?? e.due)} · ${v(`state.${e.state}`)}`
		}))), t[0] ? a("p", { class: "sc-hint" }, `${O(t[0].at ?? t[0].due)} · ${t[0].text || v(`state.${t[0].state}`)}`) : null), a("div", { class: "sc-acts" }, a("button", {
			class: "ctl-btn",
			type: "button",
			onclick: () => B(e)
		}, o("play"), v("tools.run")), a("button", {
			class: "ctl-btn",
			type: "button",
			disabled: !1,
			onclick: () => L(n, { id: e.id })
		}, o("pencil"), v("detail.edit")), a("button", {
			class: "ctl-btn",
			type: "button",
			onclick: () => V(e)
		}, o(e.enabled ? "pause" : "play"), e.enabled ? v("tools.pause") : v("tools.resume")), a("button", {
			class: "ctl-btn",
			type: "button",
			onclick: () => L(n, { copy: e.id })
		}, o("filePlus"), v("detail.duplicate")), a("button", {
			class: "ctl-btn danger",
			type: "button",
			onclick: () => H(e)
		}, o("trash"), v("detail.delete")), a("button", {
			class: "ctl-btn",
			type: "button",
			onclick: () => {
				i.tab = "history", i.runFilter.task = e.id, S();
			}
		}, o("restart"), v("tabs.history"))), e.owner !== c() && e.owner !== "*" ? a("p", { class: "sc-warn" }, o("lock"), v("detail.othersNote", { who: w(e.owner) })) : null);
	}
	async function re(e) {
		i.selected = e, j(), i.lastRuns.set(e, await l.history({
			task: e,
			limit: 14
		}).catch(() => [])), R();
	}
	let z = async (e) => {
		try {
			await e();
		} catch (e) {
			await s(r, {
				icon: "error",
				title: v("error.title"),
				text: e.message
			});
		}
		S();
	}, B = (e) => e && z(() => l.run(e.id)), V = (e) => e && z(() => l.enable(e.id, !e.enabled));
	async function H(e) {
		await s(r, {
			icon: "warning",
			title: v("delete.title", { name: e.name }),
			text: v("delete.text"),
			buttons: ["continue", "cancel"]
		}) === "continue" && await z(() => l.remove(e.id));
	}
	return S(), r;
}
// src/scheduler/SchedulerApp.js
var K = G, q = R, J = R, Y = ({ args: e, openWindow: t } = {}) => G({
	args: {
		...e ?? {},
		tab: "history"
	},
	openWindow: t
});
function X({ args: e } = {}) {
	let n = new t({
		title: v("app.name"),
		icon: "clock",
		width: 320,
		height: 140
	}), r = e && typeof e == "object" ? e : {}, o = "";
	if (typeof r.node == "string") {
		let e = i.get(r.node);
		e ? h.openFile(e) : o = v("open.gone");
	} else typeof r.app == "string" && h.isInstalled(r.app) ? h.launch(r.app, r.args ?? void 0, typeof r.entry == "string" ? r.entry : "main") : o = v("open.noApp");
	return n.body.append(a("p", { class: "sc-empty" }, o || v("open.done"))), o || setTimeout(() => n.emit("close"), 0), n;
}
export { J as create, K as default, q as edit, Y as history, X as open };
