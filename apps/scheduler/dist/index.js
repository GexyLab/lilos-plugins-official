import * as e from "/host/sdk.js";
import { Window as t, fs as n, h as r, icon as i, messageBox as a, schedule as o, session as s } from "/host/sdk.js";
import * as c from "/host/system.js";
// src/shared/i18n.js
function l(t, n) {
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
var u = l("scheduler", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Scheduler\",\"@description\":\"Operations at a date and time or repeated, also with lilOS closed: reminders, backups of folders, web requests, Terminal commands, apps' services, opening apps and files, automations.\",\"@menus.scheduler.plan.label\":\"Schedule\",\"@actions.scheduler.copyFolder.label\":\"Copy this folder…\",\"@actions.scheduler.commandHere.label\":\"Command in this folder…\",\"@actions.scheduler.openFolder.label\":\"Open it…\",\"@actions.scheduler.runAutomation.label\":\"Run this automation…\",\"@actions.scheduler.openFile.label\":\"Open this file…\",\"@actions.scheduler.remind.label\":\"Reminder about it…\",\"@entrypoints.edit.label\":\"Edit an operation\",\"@entrypoints.create.label\":\"New operation\",\"@entrypoints.history.label\":\"History\",\"@entrypoints.open.label\":\"Open what a reminder says\",\"app.name\":\"Scheduler\",\"needsKernel\":\"The Scheduler needs lilOS connected to its kernel.\",\"tools.new\":\"New operation\",\"tools.run\":\"Run now\",\"tools.pause\":\"Pause\",\"tools.resume\":\"Resume\",\"tools.search\":\"Search\",\"tabs.list\":\"List\",\"tabs.history\":\"History\",\"side.label\":\"Filters\",\"side.operations\":\"Operations\",\"side.all\":\"All\",\"side.active\":\"Active\",\"side.paused\":\"Paused\",\"side.failed\":\"Failed\",\"side.system\":\"System\",\"side.users\":\"Users\",\"side.madeBy\":\"Made by\",\"side.mine\":\"Me\",\"side.apps\":\"My apps\",\"side.where\":\"Runs in\",\"side.words\":\"In words\",\"side.next\":\"Next times\",\"side.noMore\":\"It will not run again.\",\"side.cron\":\"As cron\",\"side.what\":\"What\",\"side.browser\":\"This runs in the browser: lilOS must be open then. If it is not, it waits for the next time you open it.\",\"where.kernel\":\"kernel\",\"where.browser\":\"browser\",\"owner.system\":\"System\",\"owner.me\":\"me\",\"owner.meNamed\":\"{name} (me)\",\"grp.system\":\"run without a user\",\"grp.count\":{\"one\":\"{n} operation\",\"other\":\"{n} operations\"},\"col.name\":\"Name\",\"col.when\":\"When\",\"col.next\":\"Next\",\"col.last\":\"Last\",\"row.byApp\":\"made by {app}\",\"state.paused\":\"Paused\",\"state.ok\":\"done\",\"state.error\":\"failed\",\"state.skipped\":\"skipped\",\"state.waiting\":\"waiting for lilOS\",\"state.running\":\"running\",\"state.queued\":\"queued\",\"state.cancelled\":\"cancelled\",\"last.failed\":\"Failed {when}\",\"next.done\":\"Finished\",\"list.noneHere\":\"No operation here.\",\"welcome.title\":\"Nothing scheduled yet\",\"welcome.text\":\"An operation does something at a date and time, or again and again: a reminder, a backup of a folder, a web request, a command… also with lilOS closed.\",\"status.module\":\"Scheduler module on\",\"status.count\":{\"one\":\"{n} operation, {active} active\",\"other\":\"{n} operations, {active} active\"},\"detail.label\":\"The chosen operation\",\"detail.when\":\"When\",\"detail.what\":\"What\",\"detail.runs\":\"Runs\",\"detail.inKernel\":\"In the kernel, also with lilOS closed, as {who}\",\"detail.inBrowser\":\"In the browser, with lilOS open, as {who}\",\"detail.missed\":\"If missed\",\"detail.missedOnce\":\"Made up once when the kernel is back\",\"detail.missedSkip\":\"Skipped\",\"detail.by\":\"Changed by\",\"detail.next\":\"Next\",\"detail.last\":{\"one\":\"Last run\",\"other\":\"Last {n} runs\"},\"detail.edit\":\"Edit\",\"detail.duplicate\":\"Duplicate\",\"detail.delete\":\"Delete\",\"detail.othersNote\":\"It runs as {who}, with their files and connections. When you change, pause or delete it, they get a notification.\",\"delete.title\":\"Delete «{name}»?\",\"delete.text\":\"It will not run any more, and its history goes too.\",\"error.title\":\"Not done\",\"error.save\":\"Not saved\",\"history.task\":\"Operation\",\"history.state\":\"Result\",\"history.allTasks\":\"All the operations\",\"history.allStates\":\"All the results\",\"history.what\":\"Operation and result\",\"history.took\":\"Took\",\"history.how\":\"Why\",\"history.none\":\"No run yet.\",\"history.catchup\":\"It was due {due}: the kernel was off. {text}\",\"reason.time\":\"on time\",\"reason.catchup\":\"made up\",\"reason.manual\":\"by hand\",\"reason.retry\":\"retry {n}\",\"time.today\":\"today {time}\",\"time.tomorrow\":\"tomorrow {time}\",\"time.yesterday\":\"yesterday {time}\",\"dur.s\":\"{s} s\",\"dur.ms\":\"{m} min {s} s\",\"dur.hm\":\"{h} h {m} min\",\"what.notify\":\"Reminder: {text}\",\"what.service\":\"Service of {app} · {label}\",\"what.copy.versions\":\"Copy {from} → {to}, dated versions\",\"what.copy.update\":\"Copy {from} → {to}, update\",\"what.copy.mirror\":\"Copy {from} → {to}, mirror\",\"what.command\":\"Command: {line}\",\"what.commandSsh\":\"SSH {host}: {line}\",\"what.openFile\":\"Open {file}\",\"what.openApp\":\"Open {app}\",\"what.automation\":\"Automation {file}\",\"kind.notify.name\":\"Reminder\",\"kind.notify.hint\":\"A notification, maybe with a file or an app to open\",\"kind.service.name\":\"An app's service\",\"kind.service.hint\":\"Starts a service of the installed apps, with its values\",\"kind.copy.name\":\"Copy a folder\",\"kind.copy.hint\":\"A backup into another folder or into Network\",\"kind.command.name\":\"Terminal command\",\"kind.command.hint\":\"Shell lines in lilOS, or on a saved SSH host\",\"kind.web.name\":\"Web request\",\"kind.web.hint\":\"Calls an address and checks the answer\",\"kind.open.name\":\"Open an app or a file\",\"kind.open.hint\":\"Needs lilOS open in a tab\",\"kind.automation.name\":\"Automation\",\"kind.automation.hint\":\"An automation of Automata\",\"kind.automation.missing\":\"Install Automata first\",\"editor.titleNew\":\"New operation\",\"editor.titleEdit\":\"Edit operation\",\"editor.loading\":\"Loading…\",\"editor.copyOf\":\"{name} (copy)\",\"editor.choose\":\"Choose…\",\"editor.back\":\"Back\",\"editor.next\":\"Next\",\"editor.cancel\":\"Cancel\",\"editor.create\":\"Create\",\"editor.save\":\"Save\",\"editor.suggest.copy\":\"Backup of {from}\",\"editor.proposedBy\":\"Proposed by {app}: check it before saving.\",\"step.what\":\"What\",\"step.when\":\"When\",\"step.options\":\"Options\",\"notify.text\":\"Text\",\"notify.level\":\"Kind\",\"notify.open\":\"A click opens\",\"notify.openNone\":\"Nothing\",\"notify.openFile\":\"A file\",\"notify.openApp\":\"An app\",\"notify.file\":\"File\",\"notify.app\":\"App\",\"level.info\":\"Information\",\"level.success\":\"Success\",\"level.warning\":\"Warning\",\"level.error\":\"Error\",\"service.which\":\"Service\",\"service.noParams\":\"This service has no values to choose.\",\"service.hint\":\"It runs in the kernel, also with lilOS closed. A service that was off starts for the run and stops after it.\",\"copy.from\":\"Copy\",\"copy.to\":\"Into\",\"copy.how\":\"How\",\"copy.versions\":\"Dated versions: a new folder each time, keeping the last {keep}\",\"copy.update\":\"Update: only the files that are new or changed, in one folder\",\"copy.mirror\":\"Mirror: as Update, and what is gone from the source goes from the copy (into the trash, in lilOS)\",\"copy.keep\":\"Versions to keep\",\"copy.exclude\":\"Leave out\",\"copy.excludeHint\":\"Names, with * and ?, separated by commas\",\"copy.hint\":\"The kernel copies, also with lilOS closed. The copy goes into a folder with the name of the one copied.\",\"command.where\":\"Where\",\"command.inLilos\":\"In lilOS\",\"command.onSsh\":\"On an SSH host\",\"command.host\":\"Host\",\"command.lines\":\"Commands\",\"command.placeholder\":\"# one command per line, as in the Terminal\",\"command.hint\":\"The Terminal's shell, in the kernel, as you. Files protected by an app (FileCrypt) are not opened here.\",\"command.sshHint\":\"With the credentials saved in the Terminal for that host.\",\"command.cwd\":\"Starting folder\",\"saveTo.title\":\"Save\",\"saveTo.web\":\"Save the answer in a file\",\"saveTo.command\":\"Save the output in a file\",\"saveTo.folder\":\"Folder\",\"saveTo.name\":\"File name\",\"saveTo.mode\":\"Each time\",\"saveTo.replace\":\"replace it\",\"saveTo.append\":\"add at the end\",\"saveTo.dated\":\"a new one with the date\",\"web.method\":\"Method\",\"web.url\":\"Address\",\"web.headers\":\"Headers\",\"web.headerName\":\"Name\",\"web.headerValue\":\"Value\",\"web.secret\":\"secret\",\"web.secretHint\":\"Kept encrypted in the kernel, never shown again\",\"web.change\":\"Change\",\"web.removeHeader\":\"Remove the header\",\"web.addHeader\":\"Header\",\"web.body\":\"Body\",\"web.body.none\":\"None\",\"web.body.text\":\"Text\",\"web.body.json\":\"JSON\",\"web.body.form\":\"Form\",\"web.status\":\"Done when the status is\",\"web.anyStatus\":\"any\",\"web.exactStatus\":\"exactly…\",\"web.contains\":\"and the answer contains\",\"web.containsPh\":\"optional\",\"web.timeout\":\"Time limit\",\"web.seconds\":\"seconds\",\"web.hint\":\"The history keeps the status, the time, the headers and the first 4 KB of the answer. Addresses of the local network follow the rule of Network.\",\"open.what\":\"Open\",\"open.app\":\"App\",\"open.file\":\"File\",\"open.browserHint\":\"It needs lilOS open at that time; if it is not, it waits and asks when you open it.\",\"open.done\":\"Opened.\",\"open.gone\":\"The file is not there any more.\",\"open.noApp\":\"The app is not installed.\",\"automation.file\":\"Automation\",\"automation.hint\":\"Automata runs it in its window, with lilOS open; if it is not, it waits and asks when you open it.\",\"when.once\":\"Once\",\"when.repeat\":\"Repeat\",\"when.cron\":\"Advanced (cron)\",\"when.date\":\"Date\",\"when.time\":\"Time\",\"when.cronField\":\"Cron expression\",\"when.cronHint\":\"minute hour day month weekday: «0 2 * * 0» is every Sunday at 02:00\",\"when.every\":\"Every\",\"when.n\":\"How many\",\"when.unit\":\"Unit\",\"when.on\":\"On\",\"when.onlyDays\":\"Only on\",\"when.between\":\"Only between\",\"when.from\":\"From\",\"when.to\":\"and\",\"when.until\":\"Until\",\"when.onDay\":\"On the day\",\"when.month\":\"Month\",\"when.dayN\":\"day\",\"when.lastDay\":\"the last day\",\"when.nthWeekday\":\"the…\",\"when.nth\":\"Which\",\"when.weekday\":\"Weekday\",\"when.at\":\"At\",\"when.addTime\":\"Another time\",\"when.removeTime\":\"Remove this time\",\"when.start\":\"From\",\"when.zone\":\"Time zone\",\"when.thisBrowser\":\"{zone} (this browser)\",\"when.end\":\"End\",\"when.never\":\"Never\",\"when.onDate\":\"On\",\"when.after\":\"After\",\"when.times\":\"times\",\"unit.minute\":{\"one\":\"minute\",\"other\":\"minutes\"},\"unit.hour\":{\"one\":\"hour\",\"other\":\"hours\"},\"unit.day\":{\"one\":\"day\",\"other\":\"days\"},\"unit.week\":{\"one\":\"week\",\"other\":\"weeks\"},\"unit.month\":{\"one\":\"month\",\"other\":\"months\"},\"unit.year\":{\"one\":\"year\",\"other\":\"years\"},\"day.1\":\"Monday\",\"day.2\":\"Tuesday\",\"day.3\":\"Wednesday\",\"day.4\":\"Thursday\",\"day.5\":\"Friday\",\"day.6\":\"Saturday\",\"day.7\":\"Sunday\",\"day.1.short\":\"M\",\"day.2.short\":\"T\",\"day.3.short\":\"W\",\"day.4.short\":\"T\",\"day.5.short\":\"F\",\"day.6.short\":\"S\",\"day.7.short\":\"S\",\"nth.1\":\"first\",\"nth.2\":\"second\",\"nth.3\":\"third\",\"nth.4\":\"fourth\",\"nth.5\":\"fifth\",\"nth.-1\":\"last\",\"opt.name\":\"Name\",\"opt.missed\":\"If the kernel was off at that time\",\"opt.missedOnce\":\"Run it once when it is back (within the hours an admin chose)\",\"opt.missedSkip\":\"Skip it\",\"opt.closed\":\"If lilOS is not open\",\"opt.ask\":\"Ask before running it when lilOS opens\",\"opt.overlap\":\"If the time before is still running\",\"opt.overlapSkip\":\"Skip this one\",\"opt.overlapQueue\":\"Wait until it ends\",\"opt.overlapParallel\":\"Run them together\",\"opt.timeout\":\"Stop it after\",\"opt.minutes\":\"minutes\",\"opt.retries\":\"If it fails, try again\",\"opt.timesEvery\":\"times, every\",\"opt.notify\":\"Tell me with a notification\",\"opt.notifyError\":\"Only if it fails\",\"opt.notifyAlways\":\"Every time\",\"opt.notifyNever\":\"Never\",\"opt.runAs\":\"Run as\",\"opt.me\":\"Me ({name})\",\"opt.systemHint\":\"The system has no home: only reminders to the admins, services chosen for everyone and web requests without files.\",\"opt.otherHint\":\"It runs as that person, with their files and connections; they get a notification.\",\"opt.enabled\":\"Turn it on now\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Pianificazione\",\"@description\":\"Operazioni a una data e ora o ripetute, anche a lilOS chiuso: promemoria, copie di cartelle, richieste web, comandi del Terminale, servizi delle app, aprire app e file, automazioni.\",\"@menus.scheduler.plan.label\":\"Pianifica\",\"@actions.scheduler.copyFolder.label\":\"Copia questa cartella…\",\"@actions.scheduler.commandHere.label\":\"Comando in questa cartella…\",\"@actions.scheduler.openFolder.label\":\"Aprila…\",\"@actions.scheduler.runAutomation.label\":\"Esegui questa automazione…\",\"@actions.scheduler.openFile.label\":\"Apri questo file…\",\"@actions.scheduler.remind.label\":\"Promemoria su questo…\",\"@entrypoints.edit.label\":\"Modifica un’operazione\",\"@entrypoints.create.label\":\"Nuova operazione\",\"@entrypoints.history.label\":\"Storico\",\"@entrypoints.open.label\":\"Apri quello che dice un promemoria\",\"app.name\":\"Pianificazione\",\"needsKernel\":\"La Pianificazione ha bisogno di lilOS collegato al suo kernel.\",\"tools.new\":\"Nuova operazione\",\"tools.run\":\"Esegui ora\",\"tools.pause\":\"Pausa\",\"tools.resume\":\"Riattiva\",\"tools.search\":\"Cerca\",\"tabs.list\":\"Elenco\",\"tabs.history\":\"Storico\",\"side.label\":\"Filtri\",\"side.operations\":\"Operazioni\",\"side.all\":\"Tutte\",\"side.active\":\"Attive\",\"side.paused\":\"In pausa\",\"side.failed\":\"Non riuscite\",\"side.system\":\"Sistema\",\"side.users\":\"Utenti\",\"side.madeBy\":\"Create da\",\"side.mine\":\"Me\",\"side.apps\":\"Le mie app\",\"side.where\":\"Dove gira\",\"side.words\":\"In parole\",\"side.next\":\"Prossime volte\",\"side.noMore\":\"Non partirà più.\",\"side.cron\":\"Come cron\",\"side.what\":\"Cosa\",\"side.browser\":\"Questa gira nel browser: a quell’ora serve lilOS aperto. Se non lo è, aspetta la prossima volta che lo apri.\",\"where.kernel\":\"kernel\",\"where.browser\":\"browser\",\"owner.system\":\"Sistema\",\"owner.me\":\"me\",\"owner.meNamed\":\"{name} (io)\",\"grp.system\":\"girano senza utente\",\"grp.count\":{\"one\":\"{n} operazione\",\"other\":\"{n} operazioni\"},\"col.name\":\"Nome\",\"col.when\":\"Quando\",\"col.next\":\"Prossima\",\"col.last\":\"Ultima\",\"row.byApp\":\"creata da {app}\",\"state.paused\":\"In pausa\",\"state.ok\":\"riuscita\",\"state.error\":\"non riuscita\",\"state.skipped\":\"saltata\",\"state.waiting\":\"in attesa di lilOS\",\"state.running\":\"in corso\",\"state.queued\":\"in coda\",\"state.cancelled\":\"annullata\",\"last.failed\":\"Non riuscita {when}\",\"next.done\":\"Finita\",\"list.noneHere\":\"Nessuna operazione qui.\",\"welcome.title\":\"Ancora niente di pianificato\",\"welcome.text\":\"Un’operazione fa qualcosa a una data e ora, o più volte: un promemoria, la copia di una cartella, una richiesta web, un comando… anche a lilOS chiuso.\",\"status.module\":\"Modulo scheduler attivo\",\"status.count\":{\"one\":\"{n} operazione, {active} attive\",\"other\":\"{n} operazioni, {active} attive\"},\"detail.label\":\"L’operazione scelta\",\"detail.when\":\"Quando\",\"detail.what\":\"Cosa\",\"detail.runs\":\"Gira\",\"detail.inKernel\":\"Nel kernel, anche a lilOS chiuso, come {who}\",\"detail.inBrowser\":\"Nel browser, con lilOS aperto, come {who}\",\"detail.missed\":\"Se salta\",\"detail.missedOnce\":\"Recupera una volta appena il kernel riparte\",\"detail.missedSkip\":\"Saltata\",\"detail.by\":\"Cambiata da\",\"detail.next\":\"Prossime\",\"detail.last\":{\"one\":\"Ultima corsa\",\"other\":\"Ultime {n} corse\"},\"detail.edit\":\"Modifica\",\"detail.duplicate\":\"Duplica\",\"detail.delete\":\"Elimina\",\"detail.othersNote\":\"Gira come {who}, con i suoi file e le sue connessioni. Se la cambi, la metti in pausa o la elimini, riceve una notifica.\",\"delete.title\":\"Eliminare «{name}»?\",\"delete.text\":\"Non partirà più, e se ne va anche il suo storico.\",\"error.title\":\"Non fatto\",\"error.save\":\"Non salvata\",\"history.task\":\"Operazione\",\"history.state\":\"Esito\",\"history.allTasks\":\"Tutte le operazioni\",\"history.allStates\":\"Tutti gli esiti\",\"history.what\":\"Operazione ed esito\",\"history.took\":\"Durata\",\"history.how\":\"Come\",\"history.none\":\"Ancora nessuna corsa.\",\"history.catchup\":\"Era prevista {due}: il kernel era spento. {text}\",\"reason.time\":\"a orario\",\"reason.catchup\":\"recupero\",\"reason.manual\":\"a mano\",\"reason.retry\":\"tentativo {n}\",\"time.today\":\"oggi {time}\",\"time.tomorrow\":\"domani {time}\",\"time.yesterday\":\"ieri {time}\",\"dur.s\":\"{s} s\",\"dur.ms\":\"{m} min {s} s\",\"dur.hm\":\"{h} h {m} min\",\"what.notify\":\"Promemoria: {text}\",\"what.service\":\"Servizio di {app} · {label}\",\"what.copy.versions\":\"Copia {from} → {to}, versioni datate\",\"what.copy.update\":\"Copia {from} → {to}, aggiorna\",\"what.copy.mirror\":\"Copia {from} → {to}, specchio\",\"what.command\":\"Comando: {line}\",\"what.commandSsh\":\"SSH {host}: {line}\",\"what.openFile\":\"Apri {file}\",\"what.openApp\":\"Apri {app}\",\"what.automation\":\"Automazione {file}\",\"kind.notify.name\":\"Promemoria\",\"kind.notify.hint\":\"Una notifica, anche con un file o un’app da aprire\",\"kind.service.name\":\"Servizio di un’app\",\"kind.service.hint\":\"Avvia un servizio delle app installate, con i suoi valori\",\"kind.copy.name\":\"Copia una cartella\",\"kind.copy.hint\":\"Una copia di sicurezza in un’altra cartella o in Rete\",\"kind.command.name\":\"Comando del Terminale\",\"kind.command.hint\":\"Righe di shell in lilOS, o su un host SSH salvato\",\"kind.web.name\":\"Richiesta web\",\"kind.web.hint\":\"Chiama un indirizzo e controlla la risposta\",\"kind.open.name\":\"Apri un’app o un file\",\"kind.open.hint\":\"Serve lilOS aperto in una scheda\",\"kind.automation.name\":\"Automazione\",\"kind.automation.hint\":\"Un’automazione di Automata\",\"kind.automation.missing\":\"Prima installa Automata\",\"editor.titleNew\":\"Nuova operazione\",\"editor.titleEdit\":\"Modifica operazione\",\"editor.loading\":\"Caricamento…\",\"editor.copyOf\":\"{name} (copia)\",\"editor.choose\":\"Scegli…\",\"editor.back\":\"Indietro\",\"editor.next\":\"Avanti\",\"editor.cancel\":\"Annulla\",\"editor.create\":\"Crea\",\"editor.save\":\"Salva\",\"editor.suggest.copy\":\"Copia di {from}\",\"editor.proposedBy\":\"Proposta da {app}: controllala prima di salvare.\",\"step.what\":\"Cosa\",\"step.when\":\"Quando\",\"step.options\":\"Opzioni\",\"notify.text\":\"Testo\",\"notify.level\":\"Tipo\",\"notify.open\":\"Il clic apre\",\"notify.openNone\":\"Niente\",\"notify.openFile\":\"Un file\",\"notify.openApp\":\"Un’app\",\"notify.file\":\"File\",\"notify.app\":\"App\",\"level.info\":\"Informazione\",\"level.success\":\"Riuscita\",\"level.warning\":\"Avviso\",\"level.error\":\"Errore\",\"service.which\":\"Servizio\",\"service.noParams\":\"Questo servizio non ha valori da scegliere.\",\"service.hint\":\"Gira nel kernel, anche a lilOS chiuso. Un servizio spento si accende per la corsa e si spegne dopo.\",\"copy.from\":\"Copia\",\"copy.to\":\"In\",\"copy.how\":\"Come\",\"copy.versions\":\"Versioni datate: ogni volta una cartella nuova, tenendo le ultime {keep}\",\"copy.update\":\"Aggiorna: solo i file nuovi o cambiati, in una sola cartella\",\"copy.mirror\":\"Specchio: come Aggiorna, e quello che non c’è più va via anche dalla copia (nel cestino, se è in lilOS)\",\"copy.keep\":\"Versioni da tenere\",\"copy.exclude\":\"Escludi\",\"copy.excludeHint\":\"Nomi, con * e ?, separati da virgole\",\"copy.hint\":\"Copia il kernel, anche a lilOS chiuso. La copia va in una cartella con il nome di quella copiata.\",\"command.where\":\"Dove\",\"command.inLilos\":\"In lilOS\",\"command.onSsh\":\"Su un host SSH\",\"command.host\":\"Host\",\"command.lines\":\"Comandi\",\"command.placeholder\":\"# un comando per riga, come nel Terminale\",\"command.hint\":\"La shell del Terminale, nel kernel, come te. I file protetti da un’app (FileCrypt) qui non si aprono.\",\"command.sshHint\":\"Con le credenziali salvate nel Terminale per quell’host.\",\"command.cwd\":\"Cartella di partenza\",\"saveTo.title\":\"Salva\",\"saveTo.web\":\"Salva la risposta in un file\",\"saveTo.command\":\"Salva l’output in un file\",\"saveTo.folder\":\"Cartella\",\"saveTo.name\":\"Nome del file\",\"saveTo.mode\":\"Ogni volta\",\"saveTo.replace\":\"sostituiscilo\",\"saveTo.append\":\"aggiungi in fondo\",\"saveTo.dated\":\"uno nuovo con la data\",\"web.method\":\"Metodo\",\"web.url\":\"Indirizzo\",\"web.headers\":\"Intestazioni\",\"web.headerName\":\"Nome\",\"web.headerValue\":\"Valore\",\"web.secret\":\"segreto\",\"web.secretHint\":\"Tenuto cifrato nel kernel, non si vede più\",\"web.change\":\"Cambia\",\"web.removeHeader\":\"Togli l’intestazione\",\"web.addHeader\":\"Intestazione\",\"web.body\":\"Corpo\",\"web.body.none\":\"Nessuno\",\"web.body.text\":\"Testo\",\"web.body.json\":\"JSON\",\"web.body.form\":\"Modulo\",\"web.status\":\"Riuscita se lo stato è\",\"web.anyStatus\":\"qualsiasi\",\"web.exactStatus\":\"esattamente…\",\"web.contains\":\"e la risposta contiene\",\"web.containsPh\":\"facoltativo\",\"web.timeout\":\"Tempo massimo\",\"web.seconds\":\"secondi\",\"web.hint\":\"Nello storico: stato, durata, intestazioni e i primi 4 KB della risposta. Gli indirizzi della rete locale seguono la regola della Rete.\",\"open.what\":\"Apri\",\"open.app\":\"App\",\"open.file\":\"File\",\"open.browserHint\":\"A quell’ora serve lilOS aperto; se non lo è, aspetta e te lo chiede quando lo apri.\",\"open.done\":\"Aperto.\",\"open.gone\":\"Il file non c’è più.\",\"open.noApp\":\"L’app non è installata.\",\"automation.file\":\"Automazione\",\"automation.hint\":\"La esegue Automata nella sua finestra, con lilOS aperto; se non lo è, aspetta e te lo chiede quando lo apri.\",\"when.once\":\"Una volta\",\"when.repeat\":\"Ripeti\",\"when.cron\":\"Avanzato (cron)\",\"when.date\":\"Data\",\"when.time\":\"Ora\",\"when.cronField\":\"Espressione cron\",\"when.cronHint\":\"minuto ora giorno mese giorno-della-settimana: «0 2 * * 0» è ogni domenica alle 02:00\",\"when.every\":\"Ogni\",\"when.n\":\"Quanti\",\"when.unit\":\"Unità\",\"when.on\":\"Il\",\"when.onlyDays\":\"Solo il\",\"when.between\":\"Solo tra\",\"when.from\":\"Dalle\",\"when.to\":\"e le\",\"when.until\":\"Fino alle\",\"when.onDay\":\"Il giorno\",\"when.month\":\"Mese\",\"when.dayN\":\"giorno\",\"when.lastDay\":\"l’ultimo giorno\",\"when.nthWeekday\":\"il…\",\"when.nth\":\"Quale\",\"when.weekday\":\"Giorno della settimana\",\"when.at\":\"Alle\",\"when.addTime\":\"Altro orario\",\"when.removeTime\":\"Togli questo orario\",\"when.start\":\"Dal\",\"when.zone\":\"Fuso orario\",\"when.thisBrowser\":\"{zone} (questo browser)\",\"when.end\":\"Fine\",\"when.never\":\"Mai\",\"when.onDate\":\"Il\",\"when.after\":\"Dopo\",\"when.times\":\"volte\",\"unit.minute\":{\"one\":\"minuto\",\"other\":\"minuti\"},\"unit.hour\":{\"one\":\"ora\",\"other\":\"ore\"},\"unit.day\":{\"one\":\"giorno\",\"other\":\"giorni\"},\"unit.week\":{\"one\":\"settimana\",\"other\":\"settimane\"},\"unit.month\":{\"one\":\"mese\",\"other\":\"mesi\"},\"unit.year\":{\"one\":\"anno\",\"other\":\"anni\"},\"day.1\":\"lunedì\",\"day.2\":\"martedì\",\"day.3\":\"mercoledì\",\"day.4\":\"giovedì\",\"day.5\":\"venerdì\",\"day.6\":\"sabato\",\"day.7\":\"domenica\",\"day.1.short\":\"L\",\"day.2.short\":\"M\",\"day.3.short\":\"M\",\"day.4.short\":\"G\",\"day.5.short\":\"V\",\"day.6.short\":\"S\",\"day.7.short\":\"D\",\"nth.1\":\"primo\",\"nth.2\":\"secondo\",\"nth.3\":\"terzo\",\"nth.4\":\"quarto\",\"nth.5\":\"quinto\",\"nth.-1\":\"ultimo\",\"opt.name\":\"Nome\",\"opt.missed\":\"Se a quell’ora il kernel era spento\",\"opt.missedOnce\":\"Eseguila una volta appena riparte (entro le ore scelte dall’amministratore)\",\"opt.missedSkip\":\"Saltala\",\"opt.closed\":\"Se lilOS non è aperto\",\"opt.ask\":\"Chiedi prima di eseguirla quando apri lilOS\",\"opt.overlap\":\"Se la volta prima è ancora in corso\",\"opt.overlapSkip\":\"Salta questa\",\"opt.overlapQueue\":\"Aspetta che finisca\",\"opt.overlapParallel\":\"Falle andare insieme\",\"opt.timeout\":\"Fermala dopo\",\"opt.minutes\":\"minuti\",\"opt.retries\":\"Se non riesce, riprova\",\"opt.timesEvery\":\"volte, ogni\",\"opt.notify\":\"Avvisami con una notifica\",\"opt.notifyError\":\"Solo se non riesce\",\"opt.notifyAlways\":\"Ogni volta\",\"opt.notifyNever\":\"Mai\",\"opt.runAs\":\"Esegui come\",\"opt.me\":\"Me ({name})\",\"opt.systemHint\":\"Il sistema non ha una home: solo promemoria agli amministratori, servizi scelti per tutti e richieste web senza file.\",\"opt.otherHint\":\"Gira come quella persona, con i suoi file e le sue connessioni; riceve una notifica.\",\"opt.enabled\":\"Attiva subito\"}}")
}), { t: d } = u, f = [
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
	}
], p = (e) => f.find((t) => t.type === e) ?? f[0], m = {
	ok: "check",
	error: "error",
	skipped: "arrowRight",
	waiting: "clock",
	running: "play",
	queued: "list",
	cancelled: "x"
}, h = () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
function g(e) {
	if (e === "root" || e === n.root) return "~";
	if (!n.get(e)) return "";
	let t = n.path(e);
	return t.startsWith(n.home) ? `~${t.slice(n.home.length)}` : t;
}
function _(e) {
	if (n.isRemote?.(e)) {
		let t = n.netRef(e);
		return {
			mount: t.mount,
			path: t.path || "/",
			label: g(e)
		};
	}
	return {
		home: e === n.root ? "root" : e,
		label: g(e)
	};
}
var v = (e) => c.getApp(e)?.name ?? e;
function y(e, t = null) {
	switch (e?.type) {
		case "notify": return d("what.notify", { text: e.text });
		case "service": {
			let n = t?.services?.find((t) => t.app === e.app && t.entry === e.entry);
			return d("what.service", {
				app: n?.name ?? v(e.app),
				label: n?.label ?? e.entry
			});
		}
		case "copy": return d(`what.copy.${e.mode}`, {
			from: e.from?.label || "?",
			to: e.to?.label || "?"
		});
		case "command": {
			let t = String(e.lines ?? "").split("\n").find((e) => e.trim() && !e.trim().startsWith("#"))?.trim() ?? "";
			return e.host ? d("what.commandSsh", {
				host: e.hostLabel || e.host,
				line: t
			}) : d("what.command", { line: t });
		}
		case "web": return `${e.method} ${e.url}`;
		case "open": return e.file === void 0 ? d("what.openApp", { app: e.label || v(e.app) }) : d("what.openFile", { file: e.label || g(e.file) });
		case "automation": return d("what.automation", { file: e.label || g(e.file) });
		default: return "";
	}
}
var b = (e, t) => e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
function x(e) {
	if (!Number.isFinite(e)) return "—";
	let t = new Date(e), n = /* @__PURE__ */ new Date(), r = u.date(e, {
		hour: "2-digit",
		minute: "2-digit"
	}), i = (e) => {
		let t = new Date(n);
		return t.setDate(t.getDate() + e), t;
	};
	if (b(t, n)) return d("time.today", { time: r });
	if (b(t, i(1))) return d("time.tomorrow", { time: r });
	if (b(t, i(-1))) return d("time.yesterday", { time: r });
	let a = Math.abs(e - Date.now()) > 2592e7;
	return `${u.date(e, {
		weekday: "short",
		day: "numeric",
		month: "short",
		...a && { year: "numeric" }
	})} ${r}`;
}
function S(e) {
	if (!Number.isFinite(e) || e < 0) return "—";
	let t = Math.round(e / 1e3);
	if (t < 60) return d("dur.s", { s: t });
	let n = Math.floor(t / 60);
	return n < 60 ? d("dur.ms", {
		m: n,
		s: t % 60
	}) : d("dur.hm", {
		h: Math.floor(n / 60),
		m: n % 60
	});
}
function C(e) {
	try {
		return o.describe(e);
	} catch {
		return "—";
	}
}
function w(e, t = 5) {
	let n = [], r = e.next, i = e.when?.count ? e.when.count - (e.fired ?? 0) : Infinity;
	for (; Number.isFinite(r) && n.length < t && i > 0;) {
		n.push(r), i--;
		try {
			r = o.rules.nextAfter(e.when, r);
		} catch {
			break;
		}
	}
	return n;
}
function T(e = 0) {
	let t = new Date(Date.now() + e * 6e4), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`;
}
// src/scheduler/editor.js
var E = (e, ...t) => e.replaceChildren(...t.flat(Infinity).filter((e) => e != null && e !== !1)), D = [
	"minute",
	"hour",
	"day",
	"week",
	"month",
	"year"
], O = [
	1,
	2,
	3,
	4,
	5,
	6,
	7
], k = (e) => !!e && typeof e == "object" && !Array.isArray(e), A = (e) => JSON.parse(JSON.stringify(e));
function j(e, t = {}) {
	e(L(t, e));
}
function M({ args: e = {}, openWindow: t } = {}) {
	let n = k(e) ? e : {};
	return typeof n.id == "string" ? L({ id: n.id }, t) : L({ prefill: N(n) }, t);
}
function N(e) {
	let t = Array.isArray(e.files) && e.files.length ? n.get(e.files[0]) : null, r = {};
	if (t) {
		let n = g(t.id);
		r.what = e.action === "scheduler.copyFolder" ? {
			type: "copy",
			from: _(t.id),
			to: null,
			mode: "versions",
			keep: 7,
			exclude: []
		} : e.action === "scheduler.commandHere" ? {
			type: "command",
			lines: "",
			cwd: t.id,
			cwdLabel: n,
			host: null,
			saveTo: null
		} : e.action === "scheduler.runAutomation" ? {
			type: "automation",
			file: t.id,
			label: n
		} : e.action === "scheduler.remind" ? {
			type: "notify",
			text: t.name,
			level: "info",
			open: {
				file: t.id,
				label: n
			}
		} : {
			type: "open",
			file: t.id,
			label: n
		}, r.name = t.name;
	}
	return k(e.what) && (r.what = e.what), typeof e.name == "string" && (r.name = e.name), typeof e.from == "string" && (r.from = e.from), k(e.when) && (r.when = e.when), r;
}
var P = (e) => ({
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
	}
})[e];
function F(e) {
	let t = {
		mode: "repeat",
		tz: e?.tz ?? h(),
		once: T(60),
		start: T(),
		every: {
			n: 1,
			unit: "day"
		},
		days: [(/* @__PURE__ */ new Date()).getDay() || 7],
		times: [T().slice(11)],
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
function I(e) {
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
function L({ id: e = null, copy: l = null, prefill: m = {} }, v) {
	let b = typeof e == "string", S = new t({
		title: d(b ? "editor.titleEdit" : "editor.titleNew"),
		icon: "clock",
		width: 880,
		height: 600,
		minWidth: 700,
		minHeight: 480
	}), C = {
		name: m.name ?? "",
		enabled: !0,
		owner: null,
		what: m.what ? {
			...P(m.what.type),
			...A(m.what)
		} : P("notify"),
		form: F(m.when ? m.when.tz ? m.when : {
			...m.when,
			tz: h()
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
	m.when?.once && (C.form.mode = "once");
	let w = +!!m.what, T = {
		services: [],
		hosts: [],
		users: [],
		runtime: !1
	}, k = !1, j = !b && !l, M = "", N = r("div", {
		class: "ed-steps",
		role: "tablist"
	}), L = r("div", { class: "ed-main" }), R = r("aside", {
		class: "ed-side",
		"aria-live": "polite"
	}), z = r("p", {
		class: "ed-error",
		role: "alert"
	}), B = r("div", { class: "ed-foot" });
	S.body.append(r("div", { class: "ed" }, N, r("div", { class: "ed-body" }, L, R), z, B)), (async () => {
		try {
			let [t, n] = await Promise.all([o.catalog(), o.overview()]);
			T = t, k = n.admin;
			let r = b ? e : l;
			if (r) {
				let e = await o.get(r);
				C.name = l ? d("editor.copyOf", { name: e.name }) : e.name, C.enabled = e.enabled, C.owner = e.owner, C.what = A(e.what), C.form = F(e.when), C.options = {
					...C.options,
					...e.options
				}, C.app = e.app;
			}
		} catch (e) {
			M = e.message;
		}
		j = !0, J();
	})();
	let V = (e, t, n) => r("label", { class: "ed-field" }, r("span", { class: "ed-label" }, e), t, n ? r("small", { class: "ed-hint" }, n) : null), H = (e, t, n = {}) => {
		let i = r("input", {
			class: "ed-input",
			value: e ?? "",
			...n
		});
		return i.addEventListener(n.type === "checkbox" ? "change" : "input", () => t(n.type === "checkbox" ? i.checked : i.value)), n.type === "checkbox" && (i.checked = !!e), i;
	}, U = (e, t, n, i) => {
		let a = r("select", {
			class: "ed-input",
			"aria-label": i
		}, t.map((t) => r("option", {
			value: String(t.value),
			selected: String(t.value) === String(e),
			disabled: !!t.disabled
		}, t.label)));
		return a.addEventListener("change", () => n(a.value)), a;
	}, W = (e, t, n) => r("div", {
		class: "ed-seg",
		role: "group"
	}, t.map((t) => r("button", {
		type: "button",
		"aria-pressed": String(t.value === e),
		disabled: !!t.disabled,
		onclick: () => n(t.value)
	}, t.label))), G = (e, t, n, i) => r("div", {
		class: "ed-radios",
		role: "radiogroup"
	}, n.map((n) => {
		let a = r("input", {
			type: "radio",
			name: e,
			value: n.value,
			checked: n.value === t
		});
		return a.addEventListener("change", () => {
			a.checked && i(n.value);
		}), r("label", { class: "ed-radio" }, a, r("span", {}, n.label));
	})), K = async (e, t, n = null) => c.pickFile(v, {
		kind: e,
		title: t,
		...n && { exts: n }
	}), q = (e, t, n) => r("div", { class: "ed-place" }, r("span", { class: "ed-input ed-path" }, i(e?.mount ? "globe" : "folder"), e?.label || r("span", { class: "ed-ph" }, d("editor.choose"))), r("button", {
		class: "sc-btn",
		type: "button",
		onclick: async () => {
			let e = await K("folder", t);
			e && n(_(e.id));
		}
	}, d("editor.choose")));
	function J() {
		let e = [
			d("step.what"),
			d("step.when"),
			d("step.options")
		];
		if (E(N, ...e.map((e, t) => r("button", {
			type: "button",
			role: "tab",
			"aria-selected": String(t === w),
			class: t < w ? "done" : "",
			onclick: () => {
				w = t, J();
			}
		}, r("i", {}, t < w ? "✓" : String(t + 1)), e))), !j) {
			E(L, r("p", { class: "ed-hint" }, d("editor.loading")));
			return;
		}
		E(L, ...m.from ? [r("p", { class: "ed-warn" }, i("info"), d("editor.proposedBy", { app: c.getApp(m.from)?.name ?? m.from }))] : [], ...[
			ee,
			re,
			ie
		][w]()), oe(), z.textContent = M;
		let t = r("button", {
			class: "sc-btn",
			type: "button",
			disabled: w === 0,
			onclick: () => {
				w--, J();
			}
		}, d("editor.back")), n = w < 2 ? r("button", {
			class: "sc-btn vio",
			type: "button",
			onclick: () => {
				w === 0 && !C.name.trim() && (C.name = Z()), w++, J();
			}
		}, d("editor.next")) : r("button", {
			class: "sc-btn vio",
			type: "button",
			onclick: ce
		}, i("check"), d(b ? "editor.save" : "editor.create"));
		E(B, t, r("span", { class: "sc-grow" }), r("button", {
			class: "sc-btn",
			type: "button",
			onclick: () => S.emit("close")
		}, d("editor.cancel")), n);
	}
	let Y = () => J(), X = () => oe();
	function Z() {
		let e = C.what;
		return e.type === "notify" && e.text ? e.text.slice(0, 60) : e.type === "copy" && e.from?.label ? d("editor.suggest.copy", { from: e.from.label.split("/").pop() || e.from.label }) : y(e, T).slice(0, 60) || d(`kind.${e.type}.name`);
	}
	function ee() {
		let e = c.isInstalled("automata"), t = r("div", {
			class: "ed-types",
			role: "radiogroup",
			"aria-label": d("step.what")
		}, f.map((t) => {
			let n = t.type === "automation" && !e || t.type === "service" && (!T.runtime || !T.services.length) || C.app && ![
				"notify",
				"service",
				"open"
			].includes(t.type);
			return r("button", {
				type: "button",
				role: "radio",
				class: `ed-type${C.what.type === t.type ? " on" : ""}`,
				"aria-checked": String(C.what.type === t.type),
				disabled: n || b && C.what.type !== t.type && !!C.app,
				onclick: () => {
					C.what.type !== t.type && (C.what = P(t.type), Y());
				}
			}, r("span", { class: `sc-kico k-${t.type}` }, i(t.glyph)), r("b", {}, d(`kind.${t.type}.name`)), r("span", { class: `sc-where${t.where === "browser" ? " br" : ""}` }, d(`where.${t.where}`)), r("small", {}, n && t.type === "automation" ? d("kind.automation.missing") : d(`kind.${t.type}.hint`)));
		}));
		return [r("div", { class: "ed-what" }, t, r("div", { class: "ed-form" }, ...te(C.what)))];
	}
	function te(e) {
		if (e.type === "notify") {
			let t = e.open?.file === void 0 ? e.open?.app ? "app" : "none" : "file", n = c.installedApps().filter((e) => e.id !== "scheduler");
			return [
				V(d("notify.text"), (() => {
					let t = r("textarea", {
						class: "ed-input",
						rows: 3,
						maxlength: 300
					});
					return t.value = e.text, t.addEventListener("input", () => {
						e.text = t.value, X();
					}), t;
				})()),
				V(d("notify.level"), U(e.level, [
					"info",
					"success",
					"warning",
					"error"
				].map((e) => ({
					value: e,
					label: d(`level.${e}`)
				})), (t) => {
					e.level = t;
				})),
				V(d("notify.open"), W(t, [
					{
						value: "none",
						label: d("notify.openNone")
					},
					{
						value: "file",
						label: d("notify.openFile")
					},
					{
						value: "app",
						label: d("notify.openApp")
					}
				], (t) => {
					e.open = t === "none" ? null : t === "file" ? {
						file: void 0,
						label: ""
					} : {
						app: n[0]?.id ?? "",
						entry: "main",
						args: null
					}, Y();
				})),
				t === "file" ? V(d("notify.file"), r("div", { class: "ed-place" }, r("span", { class: "ed-input ed-path" }, i("file"), e.open.label || r("span", { class: "ed-ph" }, d("editor.choose"))), r("button", {
					class: "sc-btn",
					type: "button",
					onclick: async () => {
						let t = await K("file", d("notify.file"));
						t && (e.open = {
							file: t.id,
							label: g(t.id)
						}, Y());
					}
				}, d("editor.choose")))) : null,
				t === "app" ? V(d("notify.app"), U(e.open.app, n.map((e) => ({
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
			let t = T.services.filter((e) => !C.app || e.app === C.app);
			!e.app && t[0] && Object.assign(e, {
				app: t[0].app,
				entry: t[0].entry,
				params: {}
			});
			let n = t.find((t) => t.app === e.app && t.entry === e.entry);
			return [
				V(d("service.which"), U(`${e.app}#${e.entry}`, t.map((e) => ({
					value: `${e.app}#${e.entry}`,
					label: `${e.name} · ${e.label}`
				})), (t) => {
					let [n, r] = t.split("#");
					Object.assign(e, {
						app: n,
						entry: r,
						params: {}
					}), Y();
				})),
				...n?.params ? Object.entries(n.params).map(([t, n]) => ne(e, t, n)) : [r("p", { class: "ed-hint" }, d("service.noParams"))],
				r("p", { class: "ed-hint" }, d("service.hint"))
			];
		}
		if (e.type === "copy") return [
			r("div", { class: "ed-two" }, V(d("copy.from"), q(e.from, d("copy.from"), (t) => {
				e.from = t, Y();
			})), V(d("copy.to"), q(e.to, d("copy.to"), (t) => {
				e.to = t, Y();
			}))),
			V(d("copy.how"), G("copy-mode", e.mode, [
				{
					value: "versions",
					label: d("copy.versions", { keep: e.keep })
				},
				{
					value: "update",
					label: d("copy.update")
				},
				{
					value: "mirror",
					label: d("copy.mirror")
				}
			], (t) => {
				e.mode = t, Y();
			})),
			e.mode === "versions" ? V(d("copy.keep"), H(e.keep, (t) => {
				e.keep = Math.max(1, Math.min(100, Number(t) || 1));
			}, {
				type: "number",
				min: 1,
				max: 100
			})) : null,
			V(d("copy.exclude"), H(e.exclude.join(", "), (t) => {
				e.exclude = t.split(",").map((e) => e.trim()).filter(Boolean);
			}, { placeholder: "*.tmp, ~$*, .cache" }), d("copy.excludeHint")),
			r("p", { class: "ed-hint" }, d("copy.hint"))
		];
		if (e.type === "command") {
			let t = !!e.host || e._ssh;
			return [
				V(d("command.where"), W(t ? "ssh" : "lilos", [{
					value: "lilos",
					label: d("command.inLilos")
				}, {
					value: "ssh",
					label: d("command.onSsh"),
					disabled: !T.hosts.length
				}], (t) => {
					t === "ssh" ? (e._ssh = !0, e.host = T.hosts[0]?.id ?? null, e.hostLabel = T.hosts[0]?.name ?? "", e.cwd = null) : (e._ssh = !1, e.host = null, e.hostLabel = ""), Y();
				})),
				t ? V(d("command.host"), U(e.host, T.hosts.map((e) => ({
					value: e.id,
					label: `${e.name} · ${e.address}`
				})), (t) => {
					e.host = t, e.hostLabel = T.hosts.find((e) => e.id === t)?.name ?? "";
				})) : null,
				V(d("command.lines"), (() => {
					let t = r("textarea", {
						class: "ed-input mono",
						rows: 6,
						spellcheck: "false",
						placeholder: d("command.placeholder")
					});
					return t.value = e.lines, t.addEventListener("input", () => {
						e.lines = t.value, X();
					}), t;
				})(), d(t ? "command.sshHint" : "command.hint")),
				t ? null : V(d("command.cwd"), r("div", { class: "ed-place" }, r("span", { class: "ed-input ed-path" }, i("folder"), e.cwdLabel || "~"), r("button", {
					class: "sc-btn",
					type: "button",
					onclick: async () => {
						let t = await K("folder", d("command.cwd"));
						t && (e.cwd = t.id, e.cwdLabel = g(t.id), Y());
					}
				}, d("editor.choose")))),
				Q(e, ["replace", "append"])
			];
		}
		if (e.type === "web") {
			let t = r("div", { class: "ed-headers" }, e.headers.map((t, n) => r("div", { class: "ed-header" }, H(t.name, (e) => {
				t.name = e;
			}, {
				placeholder: d("web.headerName"),
				"aria-label": d("web.headerName")
			}), t.secret && t.set && t.value === void 0 ? r("span", { class: "ed-input ed-secret" }, "••••••••", r("button", {
				class: "sc-link",
				type: "button",
				onclick: () => {
					t.value = "", t.set = !1, Y();
				}
			}, d("web.change"))) : H(t.value ?? "", (e) => {
				t.value = e;
			}, {
				placeholder: d("web.headerValue"),
				"aria-label": d("web.headerValue"),
				type: t.secret ? "password" : "text",
				autocomplete: "off"
			}), r("label", {
				class: "ed-check",
				title: d("web.secretHint")
			}, H(t.secret, (e) => {
				t.secret = e, Y();
			}, { type: "checkbox" }), i("lock"), d("web.secret")), r("button", {
				class: "sc-icon",
				type: "button",
				title: d("web.removeHeader"),
				"aria-label": d("web.removeHeader"),
				onclick: () => {
					e.headers.splice(n, 1), Y();
				}
			}, i("x"))))), n = typeof e.expect.status == "number" ? "n" : e.expect.status;
			return [
				r("div", { class: "ed-url" }, U(e.method, [
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
					e.method = t, (t === "GET" || t === "HEAD") && (e.body = { kind: "none" }), Y();
				}, d("web.method")), H(e.url, (t) => {
					e.url = t.trim(), X();
				}, {
					type: "url",
					"aria-label": d("web.url"),
					placeholder: "https://…",
					spellcheck: "false"
				})),
				V(d("web.headers"), r("div", {}, t, r("button", {
					class: "sc-btn",
					type: "button",
					onclick: () => {
						e.headers.push({
							name: "",
							value: "",
							secret: !1
						}), Y();
					}
				}, i("plus"), d("web.addHeader")))),
				e.method !== "GET" && e.method !== "HEAD" ? V(d("web.body"), r("div", {}, U(e.body.kind, [
					"none",
					"text",
					"json",
					"form"
				].map((e) => ({
					value: e,
					label: d(`web.body.${e}`)
				})), (t) => {
					e.body = t === "none" ? { kind: "none" } : {
						kind: t,
						text: e.body.text ?? ""
					}, Y();
				}, d("web.body")), e.body.kind === "none" ? null : (() => {
					let t = r("textarea", {
						class: "ed-input mono",
						rows: 4,
						spellcheck: "false"
					});
					return t.value = e.body.text ?? "", t.addEventListener("input", () => {
						e.body.text = t.value;
					}), t;
				})())) : null,
				r("div", { class: "ed-two" }, V(d("web.status"), r("div", { class: "ed-line" }, U(n, [
					{
						value: "2xx",
						label: "200–299"
					},
					{
						value: "any",
						label: d("web.anyStatus")
					},
					{
						value: "n",
						label: d("web.exactStatus")
					}
				], (t) => {
					e.expect.status = t === "n" ? 200 : t, Y();
				}, d("web.status")), n === "n" ? H(e.expect.status, (t) => {
					e.expect.status = Number(t) || 200;
				}, {
					type: "number",
					min: 100,
					max: 599,
					class: "ed-input ed-small"
				}) : null)), V(d("web.contains"), H(e.expect.contains ?? "", (t) => {
					e.expect.contains = t || null;
				}, { placeholder: d("web.containsPh") }))),
				V(d("web.timeout"), r("div", { class: "ed-line" }, H(e.timeoutS, (t) => {
					e.timeoutS = Math.max(1, Math.min(300, Number(t) || 30));
				}, {
					type: "number",
					min: 1,
					max: 300,
					class: "ed-input ed-small"
				}), r("span", {}, d("web.seconds")))),
				Q(e, ["replace", "dated"]),
				r("p", { class: "ed-hint" }, d("web.hint"))
			];
		}
		if (e.type === "open") {
			let t = e.file !== void 0 && e.file !== null ? "file" : "app", n = c.installedApps().filter((e) => e.id !== "scheduler" && (!C.app || e.id === C.app));
			return t === "app" && !e.app && n[0] && (e.app = n[0].id, e.label = n[0].name), [
				V(d("open.what"), W(t, [{
					value: "app",
					label: d("open.app")
				}, {
					value: "file",
					label: d("open.file"),
					disabled: !!C.app
				}], (e) => {
					C.what = e === "file" ? {
						type: "open",
						file: null,
						label: ""
					} : P("open"), Y();
				})),
				t === "app" ? V(d("open.app"), U(e.app, n.map((e) => ({
					value: e.id,
					label: e.name
				})), (t) => {
					e.app = t, e.label = n.find((e) => e.id === t)?.name ?? t, X();
				})) : V(d("open.file"), r("div", { class: "ed-place" }, r("span", { class: "ed-input ed-path" }, i("file"), e.label || r("span", { class: "ed-ph" }, d("editor.choose"))), r("button", {
					class: "sc-btn",
					type: "button",
					onclick: async () => {
						let t = await K("file", d("open.file"));
						t && (e.file = t.id, e.label = g(t.id), Y());
					}
				}, d("editor.choose")))),
				r("p", { class: "ed-warn" }, i("window"), d("open.browserHint"))
			];
		}
		return [V(d("automation.file"), r("div", { class: "ed-place" }, r("span", { class: "ed-input ed-path" }, i("automation"), e.label || r("span", { class: "ed-ph" }, d("editor.choose"))), r("button", {
			class: "sc-btn",
			type: "button",
			onclick: async () => {
				let t = await K("file", d("automation.file"), ["automata"]);
				t && (e.file = t.id, e.label = g(t.id), Y());
			}
		}, d("editor.choose")))), r("p", { class: "ed-warn" }, i("window"), d("automation.hint"))];
	}
	function ne(e, t, n) {
		let i = Object.hasOwn(e.params, t) ? e.params[t] : n.default, a = (n) => {
			n === "" || n == null ? delete e.params[t] : e.params[t] = n;
		}, o;
		if (n.type === "boolean") o = H(i === !0, (e) => a(e), { type: "checkbox" });
		else if (n.type === "choice") o = U(i ?? "", [{
			value: "",
			label: "—"
		}, ...n.options.map((e) => ({
			value: String(e.value),
			label: e.label
		}))], (e) => a(e === "" ? null : n.options.find((t) => String(t.value) === e)?.value));
		else if (n.type === "number") o = H(i ?? "", (e) => a(e === "" ? null : Number(e)), {
			type: "number",
			min: n.min,
			max: n.max
		});
		else if (n.type === "file" || n.type === "folder") {
			let e = H(i ?? "", (e) => a(e.trim()), { placeholder: "~/…" });
			o = r("div", { class: "ed-place" }, e, r("button", {
				class: "sc-btn",
				type: "button",
				onclick: async () => {
					let t = await K(n.type, n.label);
					t && (e.value = g(t.id), a(e.value));
				}
			}, d("editor.choose")));
		} else o = H(i ?? "", (e) => a(e), {});
		return V(n.label, o, n.description);
	}
	function Q(e, t) {
		let a = !!e.saveTo;
		return V(d("saveTo.title"), r("div", { class: "ed-saveto" }, r("label", { class: "ed-check" }, H(a, (n) => {
			e.saveTo = n ? {
				folder: "root",
				label: "~",
				name: e.type === "web" ? "risposta.txt" : "output.txt",
				mode: t[0]
			} : null, Y();
		}, { type: "checkbox" }), d(e.type === "web" ? "saveTo.web" : "saveTo.command")), a ? r("div", { class: "ed-line" }, r("button", {
			class: "sc-btn",
			type: "button",
			onclick: async () => {
				let t = await K("folder", d("saveTo.folder"));
				t && !n.isRemote?.(t.id) && (e.saveTo.folder = t.id === n.root ? "root" : t.id, e.saveTo.label = g(t.id), Y());
			}
		}, i("folder"), e.saveTo.label || "~"), H(e.saveTo.name, (t) => {
			e.saveTo.name = t.trim();
		}, { "aria-label": d("saveTo.name") }), U(e.saveTo.mode, t.map((e) => ({
			value: e,
			label: d(`saveTo.${e}`)
		})), (t) => {
			e.saveTo.mode = t;
		}, d("saveTo.mode"))) : null));
	}
	function re() {
		let e = C.form, t = [W(e.mode, [
			{
				value: "once",
				label: d("when.once")
			},
			{
				value: "repeat",
				label: d("when.repeat")
			},
			{
				value: "cron",
				label: d("when.cron")
			}
		], (t) => {
			if (t === "cron" && e.mode === "repeat") {
				let t = o.rules.toCron(ae());
				t && (e.cron = t);
			}
			if (t === "repeat" && e.mode === "cron") {
				let t = o.rules.fromCron(e.cron, {
					tz: e.tz,
					start: e.start
				});
				t && Object.assign(e, F(t), { mode: "repeat" });
			}
			e.mode = t, Y();
		})];
		if (e.mode === "once") t.push(r("div", { class: "ed-two" }, V(d("when.date"), H(e.once.slice(0, 10), (t) => {
			e.once = `${t}T${e.once.slice(11)}`, X();
		}, { type: "date" })), V(d("when.time"), H(e.once.slice(11), (t) => {
			e.once = `${e.once.slice(0, 10)}T${t}`, X();
		}, { type: "time" }))));
		else if (e.mode === "cron") t.push(V(d("when.cronField"), H(e.cron, (t) => {
			e.cron = t, X();
		}, {
			class: "ed-input mono",
			spellcheck: "false"
		}), d("when.cronHint")));
		else {
			let n = e.every.unit;
			if (t.push(V(d("when.every"), r("div", { class: "ed-line" }, H(e.every.n, (t) => {
				e.every.n = Math.max(1, Number(t) || 1), X();
			}, {
				type: "number",
				min: 1,
				class: "ed-input ed-small",
				"aria-label": d("when.n")
			}), U(n, D.map((t) => ({
				value: t,
				label: d(`unit.${t}`, { n: e.every.n })
			})), (t) => {
				e.every.unit = t, Y();
			}, d("when.unit"))))), (n === "week" || n === "minute" || n === "hour") && t.push(V(d(n === "week" ? "when.on" : "when.onlyDays"), r("div", {
				class: "ed-days",
				role: "group"
			}, O.map((t) => r("button", {
				type: "button",
				"aria-pressed": String(e.days.includes(t)),
				title: d(`day.${t}`),
				onclick: () => {
					e.days = e.days.includes(t) ? e.days.filter((e) => e !== t) : [...e.days, t].sort(), e.days.length || (e.days = [t]), Y();
				}
			}, d(`day.${t}.short`)))))), n === "minute" || n === "hour") t.push(V(d("when.between"), r("div", { class: "ed-line" }, H(!!e.between, (t) => {
				e.between = t ? ["09:00", "18:00"] : null, Y();
			}, {
				type: "checkbox",
				"aria-label": d("when.between")
			}), e.between ? H(e.between[0], (t) => {
				e.between[0] = t, X();
			}, {
				type: "time",
				"aria-label": d("when.from")
			}) : null, e.between ? r("span", {}, d("when.to")) : null, e.between ? H(e.between[1], (t) => {
				e.between[1] = t, X();
			}, {
				type: "time",
				"aria-label": d("when.until")
			}) : null)));
			else {
				if (n === "month" || n === "year") {
					let i = e.monthly;
					t.push(V(d("when.onDay"), r("div", { class: "ed-line" }, n === "year" ? U(e.month, Array.from({ length: 12 }, (e, t) => ({
						value: t + 1,
						label: u.date(Date.UTC(2e3, t, 1), {
							month: "long",
							timeZone: "UTC"
						})
					})), (t) => {
						e.month = Number(t), X();
					}, d("when.month")) : null, U(i.kind, [
						{
							value: "day",
							label: d("when.dayN")
						},
						{
							value: "last",
							label: d("when.lastDay")
						},
						{
							value: "nth",
							label: d("when.nthWeekday")
						}
					], (e) => {
						i.kind = e, Y();
					}, d("when.onDay")), i.kind === "day" ? H(i.day, (e) => {
						i.day = Math.max(1, Math.min(31, Number(e) || 1)), X();
					}, {
						type: "number",
						min: 1,
						max: 31,
						class: "ed-input ed-small"
					}) : null, i.kind === "nth" ? U(i.nth, [
						1,
						2,
						3,
						4,
						5,
						-1
					].map((e) => ({
						value: e,
						label: d(`nth.${e}`)
					})), (e) => {
						i.nth = Number(e), X();
					}, d("when.nth")) : null, i.kind === "nth" ? U(i.weekday, O.map((e) => ({
						value: e,
						label: d(`day.${e}`)
					})), (e) => {
						i.weekday = Number(e), X();
					}, d("when.weekday")) : null)));
				}
				t.push(V(d("when.at"), r("div", { class: "ed-times" }, e.times.map((t, n) => r("span", { class: "ed-chip" }, H(t, (t) => {
					e.times[n] = t, X();
				}, {
					type: "time",
					"aria-label": d("when.time")
				}), e.times.length > 1 ? r("button", {
					class: "sc-icon",
					type: "button",
					"aria-label": d("when.removeTime"),
					onclick: () => {
						e.times.splice(n, 1), Y();
					}
				}, i("x")) : null)), r("button", {
					class: "sc-btn",
					type: "button",
					onclick: () => {
						e.times.push("12:00"), Y();
					}
				}, i("plus"), d("when.addTime")))));
			}
		}
		return e.mode === "once" ? t.push(V(d("when.zone"), $(e))) : (t.push(r("div", { class: "ed-two" }, V(d("when.start"), H(e.start, (t) => {
			e.start = t, X();
		}, { type: "datetime-local" })), V(d("when.zone"), $(e)))), t.push(V(d("when.end"), r("div", { class: "ed-line" }, G("end", e.endKind, [
			{
				value: "never",
				label: d("when.never")
			},
			{
				value: "date",
				label: d("when.onDate")
			},
			{
				value: "count",
				label: d("when.after")
			}
		], (t) => {
			e.endKind = t, Y();
		}), e.endKind === "date" ? H(e.end || e.start.slice(0, 10), (t) => {
			e.end = t, X();
		}, {
			type: "date",
			"aria-label": d("when.onDate")
		}) : null, e.endKind === "count" ? H(e.count, (t) => {
			e.count = Math.max(1, Number(t) || 1), X();
		}, {
			type: "number",
			min: 1,
			class: "ed-input ed-small",
			"aria-label": d("when.after")
		}) : null, e.endKind === "count" ? r("span", {}, d("when.times")) : null)))), t;
	}
	function $(e) {
		let t = [];
		try {
			t = Intl.supportedValuesOf("timeZone");
		} catch {
			t = [e.tz];
		}
		t.includes(e.tz) || t.unshift(e.tz);
		let n = h();
		return U(e.tz, t.map((e) => ({
			value: e,
			label: e === n ? d("when.thisBrowser", { zone: e }) : e
		})), (t) => {
			e.tz = t, X();
		}, d("when.zone"));
	}
	function ie() {
		let e = C.options, t = p(C.what.type).where === "browser", n = [
			V(d("opt.name"), H(C.name, (e) => {
				C.name = e;
			}, { maxlength: 120 })),
			V(d("opt.missed"), G("missed", e.missed, [{
				value: "once",
				label: d("opt.missedOnce")
			}, {
				value: "skip",
				label: d("opt.missedSkip")
			}], (t) => {
				e.missed = t;
			})),
			t ? V(d("opt.closed"), r("label", { class: "ed-check" }, H(e.ask, (t) => {
				e.ask = t;
			}, { type: "checkbox" }), d("opt.ask"))) : null,
			V(d("opt.overlap"), G("overlap", e.overlap, [
				{
					value: "skip",
					label: d("opt.overlapSkip")
				},
				{
					value: "queue",
					label: d("opt.overlapQueue")
				},
				{
					value: "parallel",
					label: d("opt.overlapParallel")
				}
			], (t) => {
				e.overlap = t;
			})),
			r("div", { class: "ed-two" }, V(d("opt.timeout"), r("div", { class: "ed-line" }, H(e.timeoutMin, (t) => {
				e.timeoutMin = Math.max(1, Math.min(1440, Number(t) || 60));
			}, {
				type: "number",
				min: 1,
				max: 1440,
				class: "ed-input ed-small"
			}), r("span", {}, d("opt.minutes")))), V(d("opt.retries"), r("div", { class: "ed-line" }, H(e.retries, (t) => {
				e.retries = Math.max(0, Math.min(5, Number(t) || 0));
			}, {
				type: "number",
				min: 0,
				max: 5,
				class: "ed-input ed-small"
			}), r("span", {}, d("opt.timesEvery")), H(e.retryMin, (t) => {
				e.retryMin = Math.max(1, Math.min(1440, Number(t) || 5));
			}, {
				type: "number",
				min: 1,
				max: 1440,
				class: "ed-input ed-small"
			}), r("span", {}, d("opt.minutes"))))),
			V(d("opt.notify"), G("notify", e.notify, [
				{
					value: "error",
					label: d("opt.notifyError")
				},
				{
					value: "always",
					label: d("opt.notifyAlways")
				},
				{
					value: "never",
					label: d("opt.notifyNever")
				}
			], (t) => {
				e.notify = t;
			}))
		];
		if (k && !b) {
			let e = T.users.filter((e) => e.id !== s.user?.id);
			n.push(V(d("opt.runAs"), U(C.owner ?? "", [
				{
					value: "",
					label: d("opt.me", { name: s.user?.name ?? "" })
				},
				{
					value: "*",
					label: d("owner.system")
				},
				...e.map((e) => ({
					value: e.id,
					label: e.name || e.username
				}))
			], (e) => {
				C.owner = e || null, Y();
			}, d("opt.runAs")), C.owner === "*" ? d("opt.systemHint") : C.owner ? d("opt.otherHint") : null));
		}
		return n.push(r("label", { class: "ed-check" }, H(C.enabled, (e) => {
			C.enabled = e;
		}, { type: "checkbox" }), d("opt.enabled"))), n;
	}
	function ae() {
		try {
			return o.rules.checkWhen(I(C.form));
		} catch {
			return null;
		}
	}
	function oe() {
		let e = null, t = "";
		try {
			e = o.rules.checkWhen(I(C.form));
		} catch (e) {
			t = e.message;
		}
		let n = [r("div", { class: "sc-sub" }, d("side.words")), r("div", { class: "ed-words" }, e ? o.describe(e) : "—")];
		if (e && n.push(r("div", { class: "ed-tz" }, e.tz)), t && n.push(r("p", { class: "ed-bad" }, t)), e) {
			let t = o.rules.between(e, Date.now(), Date.now() + 158112e6, 6);
			n.push(r("div", { class: "sc-sub" }, d("side.next")), t.length ? r("div", { class: "sc-nexts" }, t.map((e) => r("span", {}, r("b", {}, x(e))))) : r("p", { class: "ed-hint" }, d("side.noMore")));
			let i = o.rules.toCron(e);
			i && n.push(r("div", { class: "sc-sub" }, d("side.cron")), r("code", { class: "ed-cron" }, i));
		}
		n.push(r("div", { class: "sc-sub" }, d("side.what")), r("div", { class: "ed-summary" }, r("span", { class: `sc-kico k-${C.what.type}` }, i(p(C.what.type).glyph)), y(C.what, T) || d(`kind.${C.what.type}.name`))), p(C.what.type).where === "browser" && n.push(r("p", { class: "ed-warn" }, i("window"), d("side.browser"))), E(R, ...n);
	}
	function se() {
		let e = A(C.what);
		return delete e._ssh, e.type === "web" && (e.headers = C.what.headers.filter((e) => e.name).map((e) => e.secret ? e.value ? {
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
			name: C.name.trim() || Z(),
			enabled: C.enabled,
			when: I(C.form),
			what: e,
			options: C.options,
			...!b && C.owner && { owner: C.owner }
		};
	}
	async function ce() {
		M = "";
		try {
			let t = se();
			b ? await o.update(e, t) : await o.create(t), S.emit("close");
		} catch (e) {
			M = e.message, J(), await a(S, {
				icon: "error",
				title: d("error.save"),
				text: e.message
			});
		}
	}
	return J(), S;
}
// src/scheduler/list.js
var R = (e, ...t) => e.replaceChildren(...t.flat(Infinity).filter((e) => e != null && e !== !1)), z = 250;
function B({ args: e = {}, openWindow: n } = {}) {
	let c = new t({
		title: d("app.name"),
		icon: "clock",
		width: 1120,
		height: 620,
		minWidth: 760,
		minHeight: 420
	}), l = {
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
	}, u = () => s.user?.id ?? "local", f = r("div", { class: "sc-tools" }), h = r("nav", {
		class: "sc-side",
		"aria-label": d("side.label")
	}), g = r("div", { class: "sc-main" }), _ = r("aside", {
		class: "sc-detail",
		"aria-label": d("detail.label")
	}), v = r("div", { class: "sc-status" }), b = r("div", { class: "sc-body" }, h, g, _);
	if (c.body.append(r("div", { class: "sc" }, f, b, v)), !o?.available) return R(b, r("p", { class: "sc-empty" }, d("needsKernel"))), c;
	let T = 0, E = () => {
		clearTimeout(T), T = setTimeout(() => D().catch(() => {}), z);
	};
	async function D() {
		try {
			let [e, t] = await Promise.all([o.overview(), l.catalog ? l.catalog : o.catalog()]);
			l.admin = e.admin, l.tasks = e.tasks, l.catalog = t, l.error = "", l.selected && !l.tasks.some((e) => e.id === l.selected) && (l.selected = null), l.tab === "history" && (l.runs = await o.history({
				task: l.runFilter.task || void 0,
				state: l.runFilter.state || void 0,
				limit: 200
			})), l.selected && l.lastRuns.set(l.selected, await o.history({
				task: l.selected,
				limit: 14
			}));
		} catch (e) {
			l.error = e.message;
		}
		N();
	}
	let O = [o.on("change", E), o.on("run", E)];
	c.on("destroy", () => {
		clearTimeout(T), O.forEach((e) => e?.());
	}), c.on("launch", (e) => {
		e?.task && (l.selected = e.task), (e?.tab === "history" || e?.run) && (l.tab = "history", l.openRun = e.run ?? null, l.runFilter.task = e.task ?? ""), D();
	});
	let k = (e) => e === "*" ? d("owner.system") : e === u() ? d("owner.me") : l.catalog?.users?.find((t) => t.id === e)?.name ?? e, A = (e) => p(e).where, M = () => l.tasks.filter((e) => {
		let t = l.filter;
		if (t === "active" && !e.enabled || t === "paused" && e.enabled || t === "failed" && e.last?.state !== "error" || t === "mine" && (e.owner !== u() || e.app) || t === "apps" && !e.app || t === "kernel" && A(e.what.type) !== "kernel" || t === "browser" && A(e.what.type) !== "browser" || l.group !== null && e.owner !== l.group) return !1;
		let n = l.search.trim().toLowerCase();
		return !(n && !`${e.name} ${y(e.what, l.catalog)}`.toLowerCase().includes(n));
	});
	function N() {
		P(), F(), l.tab === "history" ? H() : V(), U();
		let e = l.tasks.filter((e) => e.enabled).length;
		R(v, r("span", {}, r("i", { class: "sc-dot on" }), d("status.module")), r("span", {}, d("status.count", {
			n: l.tasks.length,
			active: e
		})), l.error ? r("span", {
			class: "sc-err",
			role: "alert"
		}, l.error) : null);
	}
	function P() {
		let e = l.tasks.find((e) => e.id === l.selected), t = (e, t, n) => r("button", {
			type: "button",
			"aria-pressed": String(l.tab === e),
			onclick: () => {
				l.tab = e, D();
			}
		}, i(t), n), a = r("input", {
			class: "sc-search",
			type: "search",
			placeholder: d("tools.search"),
			value: l.search,
			"aria-label": d("tools.search")
		});
		a.addEventListener("input", () => {
			l.search = a.value, V();
		}), R(f, r("button", {
			class: "sc-btn vio",
			type: "button",
			onclick: () => j(n, {})
		}, i("plus"), d("tools.new")), r("button", {
			class: "sc-btn",
			type: "button",
			disabled: !e,
			onclick: () => K(e)
		}, i("play"), d("tools.run")), r("button", {
			class: "sc-btn",
			type: "button",
			disabled: !e,
			onclick: () => q(e)
		}, i(e?.enabled === !1 ? "play" : "pause"), e?.enabled === !1 ? d("tools.resume") : d("tools.pause")), r("span", { class: "sc-grow" }), r("div", {
			class: "sc-tabs",
			role: "group"
		}, t("list", "list", d("tabs.list")), t("history", "restart", d("tabs.history"))), l.tab === "list" ? a : null);
	}
	function F() {
		let e = (e) => l.tasks.filter(e).length, t = (e, t, n, a, { err: o = !1, group: s = void 0 } = {}) => r("button", {
			class: "sc-flt",
			type: "button",
			"aria-current": String(s === void 0 ? l.filter === e && l.group === null : l.group === s && l.filter === "all"),
			onclick: () => {
				l.filter = s === void 0 ? e : "all", l.group = s === void 0 ? null : s, l.tab = "list", N();
			}
		}, i(t), r("span", {}, n), r("span", { class: `sc-n${o && a ? " err" : ""}` }, String(a))), n = [
			r("h6", {}, d("side.operations")),
			t("all", "list", d("side.all"), l.tasks.length),
			t("active", "play", d("side.active"), e((e) => e.enabled)),
			t("paused", "pause", d("side.paused"), e((e) => !e.enabled)),
			t("failed", "error", d("side.failed"), e((e) => e.last?.state === "error"), { err: !0 })
		];
		if (l.admin) {
			n.push(r("h6", {}, d("side.system")), t("", "monitor", d("owner.system"), e((e) => e.owner === "*"), { group: "*" }));
			let i = [...new Set(l.tasks.map((e) => e.owner).filter((e) => e !== "*"))];
			for (let e of l.catalog?.users ?? []) i.includes(e.id) || i.push(e.id);
			n.push(r("h6", {}, d("side.users")));
			for (let r of i.sort((e, t) => e === u() ? -1 : t === u() ? 1 : k(e).localeCompare(k(t)))) n.push(t("", "user", r === u() ? d("owner.meNamed", { name: s.user?.name ?? "" }) : k(r), e((e) => e.owner === r), { group: r }));
		} else n.push(r("h6", {}, d("side.madeBy")), t("mine", "user", d("side.mine"), e((e) => !e.app)), t("apps", "grid", d("side.apps"), e((e) => !!e.app)));
		n.push(r("h6", {}, d("side.where")), t("kernel", "monitor", d("where.kernel"), e((e) => A(e.what.type) === "kernel")), t("browser", "window", d("where.browser"), e((e) => A(e.what.type) === "browser"))), R(h, ...n);
	}
	let I = (e) => r("span", { class: `sc-kico k-${e}` }, i(p(e).glyph)), L = (e) => {
		if (!e.enabled && !e.last) return r("span", { class: "sc-st pause" }, i("pause"), d("state.paused"));
		if (!e.last) return r("span", { class: "sc-m" }, "—");
		let t = e.last.state;
		return r("span", { class: `sc-st ${t}` }, i(m[t] ?? "info"), t === "error" ? d("last.failed", { when: x(e.last.at) }) : x(e.last.at));
	};
	function B(e) {
		let t = e.enabled ? e.next ? x(e.next) : d("next.done") : d("state.paused");
		return r("div", {
			class: `sc-row${e.id === l.selected ? " sel" : ""}${e.enabled ? "" : " off"}`,
			role: "row",
			tabindex: "0",
			"aria-selected": String(e.id === l.selected),
			onclick: () => W(e.id),
			ondblclick: () => j(n, { id: e.id }),
			onkeydown: (t) => {
				t.key === "Enter" && j(n, { id: e.id });
			}
		}, I(e.what.type), r("span", { class: "sc-nm" }, r("b", {}, e.name), r("small", {}, r("span", { class: `sc-where${A(e.what.type) === "browser" ? " br" : ""}` }, d(`where.${A(e.what.type)}`)), e.app ? r("span", { class: "sc-from" }, d("row.byApp", { app: e.app })) : null, r("span", {}, y(e.what, l.catalog)))), r("span", { class: "sc-m" }, C(e.when)), r("span", { class: "sc-m" }, r("b", {}, t)), L(e));
	}
	function V() {
		if (l.tab !== "list") return;
		let e = M(), t = r("div", {
			class: "sc-row head",
			role: "row"
		}, r("span"), r("span", {}, d("col.name")), r("span", {}, d("col.when")), r("span", {}, d("col.next")), r("span", {}, d("col.last"))), a = [];
		if (l.admin && l.group === null && l.filter === "all") {
			let t = [...new Set(e.map((e) => e.owner))].sort((e, t) => e === "*" ? -1 : t === "*" ? 1 : e === u() ? -1 : +(t === u()));
			for (let n of t) a.push(r("div", { class: "sc-grp" }, i(n === "*" ? "monitor" : "user"), n === u() ? d("owner.meNamed", { name: s.user?.name ?? "" }) : k(n), r("small", {}, n === "*" ? d("grp.system") : d("grp.count", { n: e.filter((e) => e.owner === n).length })))), a.push(...e.filter((e) => e.owner === n).map(B));
		} else a.push(...e.map(B));
		R(g, t, r("div", {
			class: "sc-rows",
			role: "rowgroup"
		}, a.length ? a : r("div", { class: "sc-empty" }, l.tasks.length ? d("list.noneHere") : r("div", { class: "sc-welcome" }, i("clock"), r("h2", {}, d("welcome.title")), r("p", {}, d("welcome.text")), r("button", {
			class: "sc-btn vio",
			type: "button",
			onclick: () => j(n, {})
		}, i("plus"), d("tools.new"))))));
	}
	function H() {
		let e = r("select", {
			class: "sc-select",
			"aria-label": d("history.task")
		}, r("option", { value: "" }, d("history.allTasks")), l.tasks.map((e) => r("option", {
			value: e.id,
			selected: e.id === l.runFilter.task
		}, e.name)));
		e.addEventListener("change", () => {
			l.runFilter.task = e.value, D();
		});
		let t = r("select", {
			class: "sc-select",
			"aria-label": d("history.state")
		}, r("option", { value: "" }, d("history.allStates")), [
			"ok",
			"error",
			"skipped",
			"waiting",
			"cancelled"
		].map((e) => r("option", {
			value: e,
			selected: e === l.runFilter.state
		}, d(`state.${e}`))));
		t.addEventListener("change", () => {
			l.runFilter.state = t.value, D();
		});
		let n = l.runs.map((e) => {
			let t = e.id === l.openRun, n = {
				time: d("reason.time"),
				catchup: d("reason.catchup"),
				manual: d("reason.manual"),
				retry: d("reason.retry", { n: e.attempt })
			}[e.reason] ?? e.reason, a = r("div", {
				class: `sc-hrow${t ? " sel" : ""}${e.state === "error" ? " err" : ""}`,
				tabindex: "0",
				role: "row",
				onclick: () => {
					l.openRun = t ? null : e.id, H();
				},
				onkeydown: (n) => {
					n.key === "Enter" && (l.openRun = t ? null : e.id, H());
				}
			}, r("span", { class: `sc-st ${e.state}` }, i(m[e.state] ?? "info")), r("span", { class: "sc-t" }, x(e.at ?? e.due)), r("span", { class: "sc-w" }, r("b", {}, `${e.name}${e.state === "ok" ? "" : ` · ${d(`state.${e.state}`)}`}`), r("small", {}, e.reason === "catchup" ? d("history.catchup", {
				due: x(e.due),
				text: e.text || ""
			}) : e.text || "")), r("span", { class: "sc-t" }, e.end && e.at ? S(e.end - e.at) : "—"), r("span", { class: "sc-t" }, n));
			return t && e.log ? [a, r("pre", { class: "sc-log" }, e.log)] : [a];
		}).flat();
		R(g, r("div", { class: "sc-hfilters" }, e, t), r("div", {
			class: "sc-hrow head",
			role: "row"
		}, r("span"), r("span", {}, d("col.when")), r("span", {}, d("history.what")), r("span", {}, d("history.took")), r("span", {}, d("history.how"))), r("div", { class: "sc-rows" }, n.length ? n : r("div", { class: "sc-empty" }, d("history.none")))), g.querySelector(".sc-hrow.sel")?.scrollIntoView({ block: "nearest" });
	}
	function U() {
		let e = l.tasks.find((e) => e.id === l.selected);
		if (_.hidden = l.tab === "history" || !e, !e) return R(_);
		let t = l.lastRuns.get(e.id) ?? [], a = w(e);
		R(_, r("h4", {}, I(e.what.type), r("span", {}, e.name)), r("dl", { class: "sc-kv" }, r("dt", {}, d("detail.when")), r("dd", {}, C(e.when), r("br"), r("span", { class: "sc-tz" }, e.when.tz)), r("dt", {}, d("detail.what")), r("dd", {}, y(e.what, l.catalog)), r("dt", {}, d("detail.runs")), r("dd", {}, A(e.what.type) === "kernel" ? d("detail.inKernel", { who: k(e.owner) }) : d("detail.inBrowser", { who: k(e.owner) })), r("dt", {}, d("detail.missed")), r("dd", {}, e.options.missed === "once" ? d("detail.missedOnce") : d("detail.missedSkip")), e.by && e.by.id !== e.owner ? [r("dt", {}, d("detail.by")), r("dd", {}, e.by.name)] : null), r("div", {}, r("div", { class: "sc-sub" }, d("detail.next")), a.length ? r("div", { class: "sc-nexts" }, a.map((e) => r("span", {}, r("b", {}, x(e))))) : r("p", { class: "sc-hint" }, e.enabled ? d("next.done") : d("state.paused"))), r("div", {}, r("div", { class: "sc-sub" }, d("detail.last", { n: t.length })), r("div", { class: "sc-dots" }, t.slice().reverse().map((e) => r("i", {
			class: `d-${e.state}`,
			title: `${x(e.at ?? e.due)} · ${d(`state.${e.state}`)}`
		}))), t[0] ? r("p", { class: "sc-hint" }, `${x(t[0].at ?? t[0].due)} · ${t[0].text || d(`state.${t[0].state}`)}`) : null), r("div", { class: "sc-acts" }, r("button", {
			class: "sc-btn",
			type: "button",
			onclick: () => K(e)
		}, i("play"), d("tools.run")), r("button", {
			class: "sc-btn",
			type: "button",
			disabled: !1,
			onclick: () => j(n, { id: e.id })
		}, i("pencil"), d("detail.edit")), r("button", {
			class: "sc-btn",
			type: "button",
			onclick: () => q(e)
		}, i(e.enabled ? "pause" : "play"), e.enabled ? d("tools.pause") : d("tools.resume")), r("button", {
			class: "sc-btn",
			type: "button",
			onclick: () => j(n, { copy: e.id })
		}, i("filePlus"), d("detail.duplicate")), r("button", {
			class: "sc-btn danger",
			type: "button",
			onclick: () => J(e)
		}, i("trash"), d("detail.delete")), r("button", {
			class: "sc-btn",
			type: "button",
			onclick: () => {
				l.tab = "history", l.runFilter.task = e.id, D();
			}
		}, i("restart"), d("tabs.history"))), e.owner !== u() && e.owner !== "*" ? r("p", { class: "sc-warn" }, i("lock"), d("detail.othersNote", { who: k(e.owner) })) : null);
	}
	async function W(e) {
		l.selected = e, N(), l.lastRuns.set(e, await o.history({
			task: e,
			limit: 14
		}).catch(() => [])), U();
	}
	let G = async (e) => {
		try {
			await e();
		} catch (e) {
			await a(c, {
				icon: "error",
				title: d("error.title"),
				text: e.message
			});
		}
		D();
	}, K = (e) => e && G(() => o.run(e.id)), q = (e) => e && G(() => o.enable(e.id, !e.enabled));
	async function J(e) {
		await a(c, {
			icon: "warning",
			title: d("delete.title", { name: e.name }),
			text: d("delete.text"),
			buttons: ["continue", "cancel"]
		}) === "continue" && await G(() => o.remove(e.id));
	}
	return D(), c;
}
// src/scheduler/SchedulerApp.js
var V = B, H = M, U = M, W = ({ args: e, openWindow: t } = {}) => B({
	args: {
		...e ?? {},
		tab: "history"
	},
	openWindow: t
});
function G({ args: e } = {}) {
	let i = new t({
		title: d("app.name"),
		icon: "clock",
		width: 320,
		height: 140
	}), a = e && typeof e == "object" ? e : {}, o = "";
	if (typeof a.node == "string") {
		let e = n.get(a.node);
		e ? c.openFile(e) : o = d("open.gone");
	} else typeof a.app == "string" && c.isInstalled(a.app) ? c.launch(a.app, a.args ?? void 0, typeof a.entry == "string" ? a.entry : "main") : o = d("open.noApp");
	return i.body.append(r("p", { class: "sc-empty" }, o || d("open.done"))), o || setTimeout(() => i.emit("close"), 0), i;
}
export { U as create, V as default, H as edit, W as history, G as open };
