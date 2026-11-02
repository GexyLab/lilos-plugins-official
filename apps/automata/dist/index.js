import * as e from "/host/sdk.js";
import { Window as t, automation as n, comboFromEvent as r, fs as i, h as a, icon as o, messageBox as s, notifications as c, openMenu as l, shortcuts as u, tags as d } from "/host/sdk.js";
import * as f from "/host/system.js";
// src/shared/i18n.js
function p(t, n) {
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
// src/automata/i18n.js
var m = p("automata", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Automata\",\"@description\":\"Record what you do in lilOS and do it again with a click: each step can ask for confirmation, or for its values, before it runs.\",\"@entrypoints.main.params.file.label\":\"Automation\",\"@entrypoints.main.params.file.description\":\"The automation to open\",\"@entrypoints.recorder.label\":\"Recorder\",\"@entrypoints.run.label\":\"Run an automation\",\"@entrypoints.cli.label\":\"Terminal command\",\"needsNewer\":\"Automata needs lilOS 1.17.0 or later.\",\"newName\":\"New automation\",\"newNameAt\":\"Automation of {date}\",\"action.save\":\"Save\",\"action.cancel\":\"Cancel\",\"action.close\":\"Close\",\"side.label\":\"Your automations\",\"side.title\":\"Automations\",\"side.record\":\"Record new\",\"side.steps\":{\"one\":\"1 step\",\"other\":\"{n} steps\"},\"side.none\":\"None yet: record one and it shows up here.\",\"side.where\":\"Saved in {folder} as .automata files: copy and share them like any other file.\",\"welcome.title\":\"Do it once, then let lilOS do it\",\"welcome.text\":\"Start recording and work as usual: moving and renaming files, resizing an image, replacing text… Every operation becomes a step you can run again, on other files too. A step can ask for confirmation, or for a value, before it runs.\",\"head.name\":\"Name of the automation\",\"head.desc\":\"Description\",\"head.descPlaceholder\":\"Add a description\",\"head.recordMore\":\"Record more steps\",\"head.run\":\"Run\",\"head.more\":\"More\",\"menu.launch\":\"Launch options…\",\"menu.show\":\"Show in File Manager\",\"menu.delete\":\"Move to Trash\",\"menu.deleteAsk\":\"Move «{name}» to the Trash?\",\"chip.input\":\"Works on: {what}\",\"chip.menu\":\"Files menu\",\"chip.menuExt\":\"Files menu: {ext}\",\"input.none\":\"nothing\",\"input.files\":\"the files chosen when it starts\",\"input.folder\":\"a folder chosen when it starts\",\"col.on\":\"Run this step\",\"col.confirm\":\"Ask before running it\",\"col.ask\":\"Ask for its values\",\"col.askNone\":\"No values to ask for\",\"col.step\":\"Steps\",\"steps.none\":\"No steps. Use «Record more steps» to add some.\",\"steps.missing\":\"{action} (app not installed)\",\"steps.broken\":\"uses a step that no longer comes before it\",\"steps.removeAsk\":\"Remove the step «{step}»?\",\"foot.fromHere\":\"Run from here\",\"foot.only\":\"Only this step\",\"foot.launch\":\"Launch…\",\"foot.hint\":\"Alt ↑↓ to move a step · Del to remove it\",\"detail.label\":\"Options of the step\",\"detail.none\":\"Select a step to see its options.\",\"detail.from\":\"Step {n} · {app}\",\"detail.on\":\"Run this step\",\"detail.onHint\":\"Off: the automation skips it\",\"detail.confirm\":\"Ask before running it\",\"detail.confirmHint\":\"Shows what it is about to do: Run, Skip or Stop\",\"detail.changed\":\"Changed while recording\",\"detail.others\":\"Other fields\",\"detail.fields\":\"Fields\",\"detail.onError\":\"If the step fails\",\"onError.stop\":\"Stop the automation and tell me\",\"onError.skip\":\"Skip it and go on\",\"onError.ask\":\"Ask me what to do\",\"field.file\":\"File\",\"field.recorded\":\"recorded {value}\",\"field.was\":\"was {value}\",\"field.secret\":\"never saved: always asked\",\"field.question\":\"Question\",\"field.template\":\"Template\",\"mode.use\":\"Use {value}\",\"mode.useRef\":\"Use this\",\"mode.ask\":\"Ask\",\"mode.template\":\"Template\",\"token.nome\":\"Name without extension\",\"token.est\":\"Extension\",\"token.data\":\"Today's date\",\"token.ora\":\"Time\",\"token.n\":\"Number of the item (1, 2, 3…)\",\"token.cartella\":\"Name of its folder\",\"source.fixed\":\"Always {path}\",\"source.input\":\"The item chosen when it starts\",\"source.inputFolder\":\"The folder of the item chosen when it starts\",\"source.step\":\"What step {n} made ({step})\",\"ref.input\":\"the item chosen when it starts\",\"ref.inputFolder\":\"the folder of the item chosen when it starts\",\"ref.step\":\"the result of step {n}\",\"ref.stepItem\":\"item {k} of step {n}\",\"ref.none\":\"—\",\"value.empty\":\"—\",\"value.yes\":\"yes\",\"value.no\":\"no\",\"value.items\":{\"one\":\"1 item\",\"other\":\"{n} items\"},\"value.places\":{\"one\":\"1 position\",\"other\":\"{n} positions\"},\"value.noTags\":\"no tags\",\"value.defaultApp\":\"its app\",\"value.gone\":\"(gone)\",\"value.inTrash\":\"{name} (in the Trash)\",\"launch.title\":\"Launching «{name}»\",\"launch.input\":\"Works on\",\"launch.inputHint\":\"Several files: the steps run once for each of them.\",\"launch.menu\":\"In the files menu\",\"launch.menuHint\":\"Under «Automazioni», on the desk and in File Manager\",\"launch.ext\":\"Only for these extensions (empty: every file)\",\"launch.badExt\":\"Extensions are letters and digits, separated by commas.\",\"launch.shortcut\":\"Shortcut\",\"launch.shortcutHint\":\"Click, then press the keys (with Ctrl or Alt). Del removes it.\",\"launch.noKey\":\"None\",\"launch.keyTaken\":\"Already used by «{name}»\",\"launch.press\":\"Press the keys…\",\"launch.command\":\"Name for the Terminal\",\"launch.commandHint\":\"automata run <name> [file…] [--field=value] [--yes]\",\"launch.badCommand\":\"A name for the Terminal starts with a letter: letters, digits, - _ .\",\"launch.commandTaken\":\"«{name}» already has this name.\",\"trigger.title\":\"When it starts by itself\",\"trigger.hint\":\"Only while lilOS is open in a tab (in one tab only). If it asks something it opens in Automata; otherwise it runs quietly and a notification says how it went.\",\"trigger.add.time\":\"At a time\",\"trigger.add.every\":\"Every few minutes\",\"trigger.add.login\":\"When I sign in\",\"trigger.add.folder\":\"When files arrive in a folder\",\"trigger.remove\":\"Remove\",\"trigger.time\":\"At\",\"trigger.at\":\"Time\",\"trigger.days\":\"Days (none: every day)\",\"trigger.catchUp\":\"If lilOS was closed at that time, run it when I sign in\",\"trigger.every\":\"Every\",\"trigger.minutes\":\"Minutes\",\"trigger.minutesUnit\":\"minutes\",\"trigger.login\":\"When I sign in\",\"trigger.folder\":\"Files arriving in\",\"trigger.noFolderYet\":\"no folder yet\",\"trigger.chooseFolder\":\"Choose…\",\"trigger.folderHint\":\"Made, moved or copied there; only the extensions above, if any. They are the files it works on.\",\"trigger.noFolder\":\"Choose the folder to watch.\",\"trigger.needsNone\":\"At a time, every few minutes and at sign-in there is nothing to choose: set «Works on» to nothing (a folder trigger works with files too).\",\"trigger.chipEvery\":\"every {n} min\",\"trigger.chipLogin\":\"at sign-in\",\"trigger.chipFolder\":\"files in {path}\",\"trigger.everyDay\":\"every day\",\"rec.title\":\"Recorder\",\"rec.recording\":\"Recording\",\"rec.paused\":\"Paused\",\"rec.steps\":\"Recorded steps\",\"rec.empty\":\"Work as usual: what you do appears here as steps. Ctrl Z takes back the last one.\",\"rec.emptyAppend\":\"Work as usual: the new steps go at the end of the automation.\",\"rec.undone\":\"undone with Ctrl Z: left out\",\"rec.missed\":\"{app} cannot record it\",\"rec.pause\":\"Pause\",\"rec.resume\":\"Resume\",\"rec.discard\":\"Discard\",\"rec.finish\":\"Done\",\"rec.discardAsk\":{\"one\":\"Forget the step recorded?\",\"other\":\"Forget the {n} steps recorded?\"},\"rec.closeAsk\":{\"one\":\"Closing the recorder ends the recording and forgets 1 step. Close it?\",\"other\":\"Closing the recorder ends the recording and forgets {n} steps. Close it?\"},\"run.title\":\"Running\",\"run.pause\":\"Pause\",\"run.resume\":\"Resume\",\"run.stop\":\"Stop\",\"run.stopAll\":\"Stop everything\",\"run.skip\":\"Skip\",\"run.run\":\"Run\",\"run.retry\":\"Try again\",\"run.continue\":\"Continue\",\"run.start\":\"Start\",\"run.off\":\"off\",\"run.skipped\":\"skipped\",\"run.stepOf\":\"Step {n} of {total}\",\"run.itemOf\":\"item {n} of {total}\",\"run.confirm\":\"Run «{step}»?\",\"run.failed\":\"«{step}» did not work\",\"run.recorded\":\"Recorded: {value}\",\"run.remember\":\"Use it for all the remaining items\",\"run.badNumber\":\"Write a number (within the limits of the field).\",\"run.choose\":\"Choose…\",\"run.chooseTitle\":\"Choose what to work on\",\"run.addFile\":\"Add a file\",\"run.addFolder\":\"Add a folder\",\"run.removeItem\":\"Take away {name}\",\"run.noneChosen\":\"Choose at least one item.\",\"run.chooseFolder\":\"Choose a folder\",\"run.needFiles\":\"Choose the files to work on: the steps run once for each of them.\",\"run.needFolder\":\"Choose the folder to work on.\",\"run.missing\":\"The automation does not exist any more.\",\"run.busy\":\"An automation is already running: wait for it to end.\",\"run.end\":{\"one\":\"{name}: done ({skipped} steps skipped).\",\"other\":\"{name}: done on {n} items ({skipped} steps skipped).\"},\"run.endStopped\":\"{name}: stopped.\",\"run.endError\":\"{name}: {error}\",\"error.open\":\"The automation cannot be opened: {error}\",\"error.save\":\"The automation was not saved: {error}\",\"cli.usage\":\"usage: automata list\\n       automata run <name> [file…] [--field=value…] [--yes]\\n  <name>   the Terminal name chosen in Launch, the automation's name or its .automata file\\n  --yes    run here: confirmations are given, asked values take the recorded one\",\"cli.unknown\":\"automata: unknown command «{sub}»\",\"cli.none\":\"No automations yet: record one with Automata.\",\"cli.notFound\":\"automata: no automation called «{name}»\",\"cli.noFile\":\"automata: {path}: no such file or folder\",\"cli.needItems\":\"automata: this automation works on files: name them after its name\",\"cli.opened\":\"«{name}» asks something: it opened in Automata.\",\"cli.failed\":\"{step}: {error}\",\"cli.done\":{\"one\":\"{name}: done.\",\"other\":\"{name}: done on {n} items.\"},\"action.lilos.create\":\"Create\",\"action.lilos.create.folder\":\"In the folder\",\"action.lilos.create.name\":\"Name\",\"action.lilos.create.kind\":\"Kind\",\"action.lilos.create.kind.file\":\"File\",\"action.lilos.create.kind.folder\":\"Folder\",\"action.lilos.rename\":\"Rename\",\"action.lilos.rename.item\":\"Item\",\"action.lilos.rename.name\":\"New name\",\"action.lilos.move\":\"Move\",\"action.lilos.move.items\":\"Items\",\"action.lilos.move.to\":\"Into\",\"action.lilos.copy\":\"Copy\",\"action.lilos.copy.items\":\"Items\",\"action.lilos.copy.to\":\"Into\",\"action.lilos.trash\":\"Move to Trash\",\"action.lilos.trash.items\":\"Items\",\"action.lilos.restore\":\"Restore from Trash\",\"action.lilos.restore.items\":\"Items\",\"action.lilos.delete\":\"Delete for good\",\"action.lilos.delete.items\":\"Items\",\"action.lilos.emptyTrash\":\"Empty the Trash\",\"action.lilos.tags\":\"Tags\",\"action.lilos.tags.item\":\"Item\",\"action.lilos.tags.tags\":\"Tags\",\"action.lilos.open\":\"Open\",\"action.lilos.open.item\":\"File\",\"action.lilos.open.app\":\"With\",\"action.lilos.launch\":\"Open the app\",\"action.lilos.launch.app\":\"App\",\"action.lilos.launch.entry\":\"Window\",\"action.lilos.close\":\"Close the window\",\"action.lilos.close.app\":\"App\",\"action.lilos.close.file\":\"Showing\",\"action.lilos.workspace\":\"Go to workspace\",\"action.lilos.workspace.to\":\"Workspace\",\"action.lilos.setting\":\"Setting\",\"action.lilos.setting.key\":\"Setting\",\"action.lilos.setting.value\":\"Value\",\"action.lilos.place\":\"Move on the desk\",\"action.lilos.place.places\":\"Positions\",\"action.lilos.arrange\":\"Arrange the icons\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Automata\",\"@description\":\"Registra quello che fai in lilOS e rifallo con un clic: ogni passo può chiedere conferma, o i suoi valori, prima di essere eseguito.\",\"@entrypoints.main.params.file.label\":\"Automazione\",\"@entrypoints.main.params.file.description\":\"L’automazione da aprire\",\"@entrypoints.recorder.label\":\"Registratore\",\"@entrypoints.run.label\":\"Esegui un’automazione\",\"@entrypoints.cli.label\":\"Comando del Terminale\",\"needsNewer\":\"Automata richiede lilOS 1.17.0 o successivo.\",\"newName\":\"Nuova automazione\",\"newNameAt\":\"Automazione del {date}\",\"action.save\":\"Salva\",\"action.cancel\":\"Annulla\",\"action.close\":\"Chiudi\",\"side.label\":\"Le tue automazioni\",\"side.title\":\"Automazioni\",\"side.record\":\"Registra nuova\",\"side.steps\":{\"one\":\"1 passo\",\"other\":\"{n} passi\"},\"side.none\":\"Nessuna per ora: registrane una e compare qui.\",\"side.where\":\"Salvate in {folder} come file .automata: si copiano e si condividono come gli altri file.\",\"welcome.title\":\"Fallo una volta, poi lo fa lilOS\",\"welcome.text\":\"Avvia la registrazione e lavora come sempre: spostare e rinominare file, ridimensionare un’immagine, sostituire un testo… Ogni operazione diventa un passo che puoi rieseguire, anche su altri file. Un passo può chiedere conferma, o un valore, prima di essere eseguito.\",\"head.name\":\"Nome dell’automazione\",\"head.desc\":\"Descrizione\",\"head.descPlaceholder\":\"Aggiungi una descrizione\",\"head.recordMore\":\"Registra altri passi\",\"head.run\":\"Esegui\",\"head.more\":\"Altro\",\"menu.launch\":\"Opzioni di avvio…\",\"menu.show\":\"Mostra nel File Manager\",\"menu.delete\":\"Sposta nel Cestino\",\"menu.deleteAsk\":\"Spostare «{name}» nel Cestino?\",\"chip.input\":\"Lavora su: {what}\",\"chip.menu\":\"Menu dei file\",\"chip.menuExt\":\"Menu dei file: {ext}\",\"input.none\":\"niente\",\"input.files\":\"i file scelti all’avvio\",\"input.folder\":\"una cartella scelta all’avvio\",\"col.on\":\"Esegui questo passo\",\"col.confirm\":\"Chiedi conferma prima\",\"col.ask\":\"Chiedi i valori\",\"col.askNone\":\"Nessun valore da chiedere\",\"col.step\":\"Passi\",\"steps.none\":\"Nessun passo. Usa «Registra altri passi» per aggiungerne.\",\"steps.missing\":\"{action} (app non installata)\",\"steps.broken\":\"usa un passo che non viene più prima\",\"steps.removeAsk\":\"Togliere il passo «{step}»?\",\"foot.fromHere\":\"Esegui da qui\",\"foot.only\":\"Solo questo passo\",\"foot.launch\":\"Avvio…\",\"foot.hint\":\"Alt ↑↓ per spostare un passo · Canc per toglierlo\",\"detail.label\":\"Opzioni del passo\",\"detail.none\":\"Seleziona un passo per vederne le opzioni.\",\"detail.from\":\"Passo {n} · {app}\",\"detail.on\":\"Esegui questo passo\",\"detail.onHint\":\"Spento: l’automazione lo salta\",\"detail.confirm\":\"Chiedi conferma prima\",\"detail.confirmHint\":\"Mostra cosa sta per fare: Esegui, Salta o Ferma\",\"detail.changed\":\"Cambiati durante la registrazione\",\"detail.others\":\"Altri campi\",\"detail.fields\":\"Campi\",\"detail.onError\":\"Se il passo non riesce\",\"onError.stop\":\"Ferma l’automazione e avvisa\",\"onError.skip\":\"Saltalo e continua\",\"onError.ask\":\"Chiedimi cosa fare\",\"field.file\":\"File\",\"field.recorded\":\"registrato {value}\",\"field.was\":\"era {value}\",\"field.secret\":\"mai salvato: chiesto sempre\",\"field.question\":\"Domanda\",\"field.template\":\"Modello\",\"mode.use\":\"Usa {value}\",\"mode.useRef\":\"Usa questo\",\"mode.ask\":\"Chiedi\",\"mode.template\":\"Modello\",\"token.nome\":\"Nome senza estensione\",\"token.est\":\"Estensione\",\"token.data\":\"Data di oggi\",\"token.ora\":\"Ora\",\"token.n\":\"Numero dell’elemento (1, 2, 3…)\",\"token.cartella\":\"Nome della sua cartella\",\"source.fixed\":\"Sempre {path}\",\"source.input\":\"L’elemento scelto all’avvio\",\"source.inputFolder\":\"La cartella dell’elemento scelto all’avvio\",\"source.step\":\"Quello che fa il passo {n} ({step})\",\"ref.input\":\"l’elemento scelto all’avvio\",\"ref.inputFolder\":\"la cartella dell’elemento scelto all’avvio\",\"ref.step\":\"il risultato del passo {n}\",\"ref.stepItem\":\"l’elemento {k} del passo {n}\",\"ref.none\":\"—\",\"value.empty\":\"—\",\"value.yes\":\"sì\",\"value.no\":\"no\",\"value.items\":{\"one\":\"1 elemento\",\"other\":\"{n} elementi\"},\"value.places\":{\"one\":\"1 posizione\",\"other\":\"{n} posizioni\"},\"value.noTags\":\"nessun tag\",\"value.defaultApp\":\"la sua app\",\"value.gone\":\"(non c’è più)\",\"value.inTrash\":\"{name} (nel Cestino)\",\"launch.title\":\"Avvio di «{name}»\",\"launch.input\":\"Su cosa lavora\",\"launch.inputHint\":\"Più file: i passi si ripetono per ciascuno.\",\"launch.menu\":\"Nel menu dei file\",\"launch.menuHint\":\"Sotto «Automazioni», sulla scrivania e nel File Manager\",\"launch.ext\":\"Solo per queste estensioni (vuoto: ogni file)\",\"launch.badExt\":\"Le estensioni sono lettere e cifre, separate da virgole.\",\"launch.shortcut\":\"Scorciatoia\",\"launch.shortcutHint\":\"Fai clic, poi premi i tasti (con Ctrl o Alt). Canc la toglie.\",\"launch.noKey\":\"Nessuna\",\"launch.keyTaken\":\"Già usata da «{name}»\",\"launch.press\":\"Premi i tasti…\",\"launch.command\":\"Nome per il Terminale\",\"launch.commandHint\":\"automata run <nome> [file…] [--campo=valore] [--yes]\",\"launch.badCommand\":\"Un nome per il Terminale inizia con una lettera: lettere, cifre, - _ .\",\"launch.commandTaken\":\"«{name}» ha già questo nome.\",\"trigger.title\":\"Quando parte da sola\",\"trigger.hint\":\"Solo mentre lilOS è aperto in una scheda (in una sola). Se chiede qualcosa si apre in Automata; altrimenti gira da sola e una notifica dice com’è andata.\",\"trigger.add.time\":\"A un’ora\",\"trigger.add.every\":\"Ogni tot minuti\",\"trigger.add.login\":\"Quando entro\",\"trigger.add.folder\":\"Quando arrivano file in una cartella\",\"trigger.remove\":\"Togli\",\"trigger.time\":\"Alle\",\"trigger.at\":\"Ora\",\"trigger.days\":\"Giorni (nessuno: tutti i giorni)\",\"trigger.catchUp\":\"Se a quell’ora lilOS era chiuso, eseguila quando entro\",\"trigger.every\":\"Ogni\",\"trigger.minutes\":\"Minuti\",\"trigger.minutesUnit\":\"minuti\",\"trigger.login\":\"Quando entro\",\"trigger.folder\":\"File che arrivano in\",\"trigger.noFolderYet\":\"nessuna cartella\",\"trigger.chooseFolder\":\"Scegli…\",\"trigger.folderHint\":\"Creati, spostati o copiati lì; solo con le estensioni indicate sopra, se ce ne sono. Sono i file su cui lavora.\",\"trigger.noFolder\":\"Scegli la cartella da tenere d’occhio.\",\"trigger.needsNone\":\"A un’ora, ogni tot minuti e all’accesso non c’è niente da scegliere: imposta «Su cosa lavora» su niente (con una cartella da tenere d’occhio vanno bene anche i file).\",\"trigger.chipEvery\":\"ogni {n} min\",\"trigger.chipLogin\":\"all’accesso\",\"trigger.chipFolder\":\"file in {path}\",\"trigger.everyDay\":\"ogni giorno\",\"rec.title\":\"Registratore\",\"rec.recording\":\"Registrazione\",\"rec.paused\":\"In pausa\",\"rec.steps\":\"Passi registrati\",\"rec.empty\":\"Lavora come sempre: quello che fai compare qui come passi. Ctrl Z toglie l’ultimo.\",\"rec.emptyAppend\":\"Lavora come sempre: i nuovi passi vanno in fondo all’automazione.\",\"rec.undone\":\"annullato con Ctrl Z: tolto\",\"rec.missed\":\"{app} non lo rende registrabile\",\"rec.pause\":\"Pausa\",\"rec.resume\":\"Riprendi\",\"rec.discard\":\"Scarta\",\"rec.finish\":\"Fine\",\"rec.discardAsk\":{\"one\":\"Dimenticare il passo registrato?\",\"other\":\"Dimenticare i {n} passi registrati?\"},\"rec.closeAsk\":{\"one\":\"Chiudere il registratore termina la registrazione e dimentica 1 passo. Chiuderlo?\",\"other\":\"Chiudere il registratore termina la registrazione e dimentica {n} passi. Chiuderlo?\"},\"run.title\":\"In esecuzione\",\"run.pause\":\"Pausa\",\"run.resume\":\"Riprendi\",\"run.stop\":\"Ferma\",\"run.stopAll\":\"Ferma tutto\",\"run.skip\":\"Salta\",\"run.run\":\"Esegui\",\"run.retry\":\"Riprova\",\"run.continue\":\"Continua\",\"run.start\":\"Avvia\",\"run.off\":\"spento\",\"run.skipped\":\"saltato\",\"run.stepOf\":\"Passo {n} di {total}\",\"run.itemOf\":\"elemento {n} di {total}\",\"run.confirm\":\"Eseguire «{step}»?\",\"run.failed\":\"«{step}» non è riuscito\",\"run.recorded\":\"Registrato: {value}\",\"run.remember\":\"Usa per tutti gli elementi rimanenti\",\"run.badNumber\":\"Scrivi un numero (nei limiti del campo).\",\"run.choose\":\"Scegli…\",\"run.chooseTitle\":\"Scegli su cosa lavorare\",\"run.addFile\":\"Aggiungi un file\",\"run.addFolder\":\"Aggiungi una cartella\",\"run.removeItem\":\"Togli {name}\",\"run.noneChosen\":\"Scegli almeno un elemento.\",\"run.chooseFolder\":\"Scegli una cartella\",\"run.needFiles\":\"Scegli i file su cui lavorare: i passi si ripetono per ciascuno.\",\"run.needFolder\":\"Scegli la cartella su cui lavorare.\",\"run.missing\":\"L’automazione non esiste più.\",\"run.busy\":\"C’è già un’automazione in esecuzione: aspetta che finisca.\",\"run.end\":{\"one\":\"{name}: fatto ({skipped} passi saltati).\",\"other\":\"{name}: fatto su {n} elementi ({skipped} passi saltati).\"},\"run.endStopped\":\"{name}: fermata.\",\"run.endError\":\"{name}: {error}\",\"error.open\":\"Non si riesce ad aprire l’automazione: {error}\",\"error.save\":\"L’automazione non è stata salvata: {error}\",\"cli.usage\":\"uso: automata list\\n     automata run <nome> [file…] [--campo=valore…] [--yes]\\n  <nome>   il nome per il Terminale scelto in Avvio, il nome dell’automazione o il suo file .automata\\n  --yes    esegue qui: le conferme sono date, i valori chiesti prendono quello registrato\",\"cli.unknown\":\"automata: comando sconosciuto «{sub}»\",\"cli.none\":\"Ancora nessuna automazione: registrane una con Automata.\",\"cli.notFound\":\"automata: nessuna automazione si chiama «{name}»\",\"cli.noFile\":\"automata: {path}: file o cartella inesistente\",\"cli.needItems\":\"automata: questa automazione lavora su file: scrivili dopo il suo nome\",\"cli.opened\":\"«{name}» chiede qualcosa: si è aperta in Automata.\",\"cli.failed\":\"{step}: {error}\",\"cli.done\":{\"one\":\"{name}: fatto.\",\"other\":\"{name}: fatto su {n} elementi.\"},\"action.lilos.create\":\"Crea\",\"action.lilos.create.folder\":\"Nella cartella\",\"action.lilos.create.name\":\"Nome\",\"action.lilos.create.kind\":\"Tipo\",\"action.lilos.create.kind.file\":\"File\",\"action.lilos.create.kind.folder\":\"Cartella\",\"action.lilos.rename\":\"Rinomina\",\"action.lilos.rename.item\":\"Elemento\",\"action.lilos.rename.name\":\"Nuovo nome\",\"action.lilos.move\":\"Sposta\",\"action.lilos.move.items\":\"Elementi\",\"action.lilos.move.to\":\"In\",\"action.lilos.copy\":\"Copia\",\"action.lilos.copy.items\":\"Elementi\",\"action.lilos.copy.to\":\"In\",\"action.lilos.trash\":\"Sposta nel Cestino\",\"action.lilos.trash.items\":\"Elementi\",\"action.lilos.restore\":\"Ripristina dal Cestino\",\"action.lilos.restore.items\":\"Elementi\",\"action.lilos.delete\":\"Elimina definitivamente\",\"action.lilos.delete.items\":\"Elementi\",\"action.lilos.emptyTrash\":\"Svuota il Cestino\",\"action.lilos.tags\":\"Tag\",\"action.lilos.tags.item\":\"Elemento\",\"action.lilos.tags.tags\":\"Tag\",\"action.lilos.open\":\"Apri\",\"action.lilos.open.item\":\"File\",\"action.lilos.open.app\":\"Con\",\"action.lilos.launch\":\"Apri l’app\",\"action.lilos.launch.app\":\"App\",\"action.lilos.launch.entry\":\"Finestra\",\"action.lilos.close\":\"Chiudi la finestra\",\"action.lilos.close.app\":\"App\",\"action.lilos.close.file\":\"Che mostra\",\"action.lilos.workspace\":\"Vai al workspace\",\"action.lilos.workspace.to\":\"Workspace\",\"action.lilos.setting\":\"Impostazione\",\"action.lilos.setting.key\":\"Impostazione\",\"action.lilos.setting.value\":\"Valore\",\"action.lilos.place\":\"Sposta sulla scrivania\",\"action.lilos.place.places\":\"Posizioni\",\"action.lilos.arrange\":\"Riordina le icone\"}}")
}), { t: h } = m, g = () => f.automations ?? null, _ = () => g()?.library ?? null;
async function v(e) {
	return g().check(await i.read(e));
}
async function y(e, t) {
	await i.write(e, `${JSON.stringify(t, null, 2)}\n`);
}
async function b(e) {
	let t = g().folder(), n = (e.name || h("newName")).replace(/[/\\:*?"<>|]+/g, "-").trim() || h("newName"), r = i.create(t.id, {
		type: "file",
		name: i.uniqueName(t.id, `${n}.automata`)
	});
	return await y(r.id, e), r.id;
}
var x = (e, t = "info") => c.send({
	app: "automata",
	text: e,
	level: t
}).catch(() => {}), S = [
	"file",
	"files",
	"folder"
], C = (e) => h(e) !== e, w = (e) => n.describe(e.action);
function T(e) {
	return C(`action.${e}`) ? h(`action.${e}`) : n.describe(e)?.label ?? e;
}
function E(e, t, n) {
	return C(`action.${e}.${t}`) ? h(`action.${e}.${t}`) : n?.label || t;
}
var D = (e) => e ? f.getApp?.(e)?.name ?? e : "lilOS", O = (e) => e ? f.getApp?.(e)?.color ?? "#5b6b82" : "#3b6ef5", k = (e, t) => e ? f.getApp?.(e)?.glyph ?? "window" : A[t] ?? "folder", A = {
	"lilos.create": "filePlus",
	"lilos.rename": "pencil",
	"lilos.move": "folderOpen",
	"lilos.copy": "file",
	"lilos.trash": "trash",
	"lilos.restore": "undo",
	"lilos.delete": "trash",
	"lilos.emptyTrash": "trash",
	"lilos.tags": "tag",
	"lilos.open": "open",
	"lilos.launch": "window",
	"lilos.close": "x",
	"lilos.workspace": "workspace",
	"lilos.setting": "gear",
	"lilos.place": "grip",
	"lilos.arrange": "grid"
};
function j(e) {
	if (!e || !i.exists(e)) return "";
	let t = i.path(e), n = i.path(i.root);
	return t === n ? "~" : t.startsWith(`${n}/`) ? `~${t.slice(n.length)}` : t;
}
function M(e) {
	return e ? e.input ? e.parent ? h("ref.inputFolder") : h("ref.input") : Number.isInteger(e.step) ? Number.isInteger(e.index) ? h("ref.stepItem", {
		n: e.step + 1,
		k: e.index + 1
	}) : h("ref.step", { n: e.step + 1 }) : e.id && i.exists(e.id) ? j(e.id) : e.path ? e.path.replace(/^\/home\/[^/]+/, "~") : h("ref.none") : h("ref.none");
}
var N = (e) => e?.input || Number.isInteger(e?.step) ? "ref" : "plain";
function P(e, t, n, r) {
	if (r == null || r === "") return h("value.empty");
	switch (n?.type) {
		case "boolean": return h(r ? "value.yes" : "value.no");
		case "number": return m.number(r);
		case "choice": {
			let i = n.options?.find((e) => e.value === r);
			return C(`action.${e}.${t}.${r}`) ? h(`action.${e}.${t}.${r}`) : i?.label ?? String(r);
		}
		case "file":
		case "folder": return M(r);
		case "files": {
			let e = Array.isArray(r) ? r : [r];
			return e.length > 2 ? h("value.items", { n: e.length }) : e.map(M).join(", ");
		}
		case "tags": return (Array.isArray(r) ? r : []).map((e) => d.get?.(e)?.name ?? e).join(", ") || h("value.noTags");
		case "places": return h("value.places", { n: Array.isArray(r) ? r.length : 0 });
		case "secret": return "••••";
		default: return e === "lilos.launch" && t === "app" ? D(r) : e === "lilos.open" && t === "app" ? r ? D(r) : h("value.defaultApp") : e === "lilos.close" && t === "app" ? D(r) : e === "lilos.workspace" ? f.describeWorkspace?.(r)?.name ?? String(r) : typeof r == "string" ? r : JSON.stringify(r).slice(0, 60);
	}
}
function F(e) {
	let t = w(e);
	if (!t) return Object.entries(e.params ?? {}).slice(0, 4).map(([e, t]) => ({
		label: e,
		text: JSON.stringify(t).slice(0, 40),
		kind: "plain"
	}));
	let n = [];
	for (let [r, i] of Object.entries(t.params)) {
		if (!(r in e.params) && e.fields?.[r]?.mode !== "ask" && i.type !== "secret" || e.action === "lilos.launch" && r === "entry" && e.params.entry === "main") continue;
		let t = e.fields?.[r]?.mode ?? "use", a = t === "template" ? e.fields[r].template : P(e.action, r, i, e.params[r]), o = t === "ask" ? "ask" : t === "template" ? "template" : S.includes(i.type) ? N(Array.isArray(e.params[r]) ? e.params[r][0] : e.params[r]) : e.changed?.includes(r) ? "changed" : "plain";
		n.push({
			label: E(e.action, r, i),
			text: a,
			kind: o
		});
	}
	return e.file && n.unshift({
		label: h("field.file"),
		text: M(e.file),
		kind: N(e.file)
	}), n;
}
function ee(e, t) {
	let n = [], r = (e) => {
		Array.isArray(e) ? e.forEach(r) : e && typeof e == "object" && (Number.isInteger(e.step) ? n.push(e.step) : e.ref && r(e.ref));
	};
	return r(Object.values(e.params ?? {})), r(e.file), n.some((e) => e < 0 || e >= t);
}
function I(e) {
	let t = n.describe(e.action), r = (e) => e && i.exists(e) ? i.get(e).name : i.trashed().find((t) => t.id === e)?.name ?? h("value.gone"), a = [];
	for (let [n, i] of Object.entries(t?.params ?? {})) {
		let t = e.params?.[n];
		if (t === void 0 || e.action === "lilos.launch" && n === "entry") continue;
		if (e.defaults && n in e.defaults && e.changed?.includes(n) && typeof t == "string" && i.type === "text") {
			a.push({
				text: `${e.defaults[n]} → ${t}`,
				changed: !0
			});
			continue;
		}
		if (i.subject && e.action === "lilos.rename") continue;
		let o;
		o = i.type === "file" || i.type === "folder" ? r(t) : i.type === "files" ? t.length > 2 ? h("value.items", { n: t.length }) : t.map(r).join(", ") : P(e.action, n, i, t), a.push({
			text: o,
			changed: e.changed?.includes(n)
		});
	}
	return e.file && a.unshift({
		text: r(e.file),
		changed: !1
	}), a;
}
// src/automata/editor.js
var L = 400, R = [
	"file",
	"files",
	"folder"
], z = (e) => !!e && typeof e == "object" && !Array.isArray(e), B = {
	time: "calendar",
	every: "redo",
	login: "user",
	folder: "folderOpen"
};
function V(e) {
	if (e.type === "every") return h("trigger.chipEvery", { n: e.minutes });
	if (e.type === "login") return h("trigger.chipLogin");
	if (e.type === "folder") return h("trigger.chipFolder", { path: M(e.folder) });
	let t = new Date(2026, 10, 2), n = e.days.length && e.days.length < 7 ? e.days.map((e) => m.date(new Date(t.getTime() + (e - 1) * 864e5), { weekday: "short" })).join(" ") : h("trigger.everyDay");
	return `${e.at} · ${n}`;
}
function H({ args: e, openWindow: c } = {}) {
	let d = new t({
		title: "Automata",
		icon: "automation",
		width: 1060,
		height: 620,
		minWidth: 760,
		minHeight: 440
	}), p = null, b = null, S = 0, C = null, A = "", j = a("nav", {
		class: "au-side",
		"aria-label": h("side.label")
	}), N = a("div", { class: "au-main" }), I = a("aside", {
		class: "au-detail",
		"aria-label": h("detail.label")
	}), H = a("div", { class: "au" }, j, N, I);
	if (d.body.append(H), !g()) return H.replaceChildren(a("p", { class: "au-empty" }, h("needsNewer"))), d;
	let U = (e = "all") => {
		clearTimeout(C);
		let t = p, n = structuredClone(b);
		C = setTimeout(() => y(t, n).catch((e) => x(h("error.save", { error: e.message }), "error")), L), e === "all" ? $() : e === "steps" ? (K(), Z()) : e === "detail" && Z();
	};
	d.on("destroy", () => {
		C && b && (clearTimeout(C), y(p, b).catch(() => {}));
	});
	async function W(e) {
		if (C && b && (clearTimeout(C), await y(p, b).catch(() => {}), C = null), p = e, b = null, A = "", S = 0, e) try {
			b = await v(e);
		} catch (e) {
			A = h("error.open", { error: e.message });
		}
		d.setTitle(b ? `Automata — ${b.name}` : "Automata"), $();
	}
	function G() {
		let e = _().list();
		j.replaceChildren(a("button", {
			class: "au-btn rec",
			type: "button",
			onclick: () => f.launch("automata", {}, "recorder")
		}, o("record"), h("side.record")), a("h6", {}, h("side.title")), a("div", {
			class: "au-list",
			role: "listbox",
			"aria-label": h("side.title")
		}, e.map((e) => a("button", {
			class: "au-item",
			type: "button",
			role: "option",
			"aria-selected": String(e.id === p),
			onclick: () => W(e.id)
		}, o(e.input === "none" ? "automation" : e.input === "folder" ? "folder" : "file"), a("span", { class: "au-two" }, a("span", {}, e.name), a("small", {}, [h("side.steps", { n: e.steps }), e.launch.shortcut ? ` · ${e.launch.shortcut}` : ""].join("")))))), ...e.length ? [] : [a("p", { class: "au-hint" }, h("side.none"))], a("span", { class: "au-grow" }), a("p", { class: "au-hint" }, h("side.where", { folder: g().FOLDER })));
	}
	function K() {
		if (A) return N.replaceChildren(a("div", {
			class: "au-empty",
			role: "alert"
		}, A));
		if (!b) return N.replaceChildren(a("div", { class: "au-welcome" }, o("automation"), a("h2", {}, h("welcome.title")), a("p", {}, h("welcome.text")), a("button", {
			class: "au-btn primary",
			type: "button",
			onclick: () => f.launch("automata", {}, "recorder")
		}, o("record"), h("side.record"))));
		let e = a("input", {
			class: "au-name",
			value: b.name,
			"aria-label": h("head.name"),
			maxlength: 80,
			spellcheck: "false"
		});
		e.addEventListener("change", () => {
			b.name = e.value.trim() || b.name, d.setTitle(`Automata — ${b.name}`), U("none"), G();
		}), e.addEventListener("keydown", (t) => {
			t.key === "Enter" && e.blur();
		});
		let t = a("input", {
			class: "au-desc",
			value: b.description,
			placeholder: h("head.descPlaceholder"),
			"aria-label": h("head.desc"),
			maxlength: 500
		});
		t.addEventListener("change", () => {
			b.description = t.value, U("none");
		}), t.addEventListener("keydown", (e) => {
			e.key === "Enter" && t.blur();
		});
		let n = a("button", {
			class: "au-icon",
			type: "button",
			title: h("head.more"),
			"aria-label": h("head.more"),
			"aria-haspopup": "menu"
		}, o("list"));
		n.addEventListener("click", () => {
			let e = n.getBoundingClientRect();
			l(e.left, e.bottom, [
				{
					label: h("menu.launch"),
					icon: "play",
					action: ue
				},
				{
					label: h("menu.show"),
					icon: "folderOpen",
					action: () => f.launch("files", { folder: i.get(p)?.parent })
				},
				"-",
				{
					label: h("menu.delete"),
					icon: "trash",
					danger: !0,
					action: fe
				}
			]);
		}), N.replaceChildren(a("header", { class: "au-head" }, a("div", { class: "au-l1" }, e, a("button", {
			class: "au-btn",
			type: "button",
			onclick: () => f.launch("automata", { append: p }, "recorder")
		}, o("record"), h("head.recordMore")), a("button", {
			class: "au-btn primary",
			type: "button",
			onclick: () => Q()
		}, o("play"), h("head.run")), n), t, a("div", { class: "au-chips" }, q())), a("div", {
			class: "au-steps-h",
			"aria-hidden": "true"
		}, a("span", { title: h("col.on") }, o("check")), a("span", { title: h("col.confirm") }, o("help")), a("span", { title: h("col.ask") }, o("pencil")), a("span"), a("span", {}, h("col.step"))), Y(), a("footer", { class: "au-foot" }, a("button", {
			class: "au-btn",
			type: "button",
			disabled: !b.steps.length,
			onclick: () => Q({ from: S })
		}, o("play"), h("foot.fromHere")), a("button", {
			class: "au-btn",
			type: "button",
			disabled: !b.steps.length,
			onclick: () => Q({
				from: S,
				only: !0
			})
		}, o("arrowRight"), h("foot.only")), a("button", {
			class: "au-btn",
			type: "button",
			onclick: ue
		}, o("gear"), h("foot.launch")), a("span", { class: "au-grow" }), a("span", { class: "au-hint" }, h("foot.hint"))));
	}
	function q() {
		let e = [], t = {
			none: h("input.none"),
			files: h("input.files"),
			folder: h("input.folder")
		}[b.input];
		e.push(a("span", { class: "au-chip in" }, o(b.input === "none" ? "automation" : "file"), h("chip.input", { what: t }))), b.launch.shortcut && e.push(a("span", { class: "au-chip" }, o("keyboard"), a("kbd", {}, b.launch.shortcut))), b.launch.menu && e.push(a("span", { class: "au-chip" }, o("list"), b.launch.ext.length ? h("chip.menuExt", { ext: b.launch.ext.join(", ") }) : h("chip.menu"))), b.launch.command && e.push(a("span", { class: "au-chip" }, o("terminal"), `automata run ${b.launch.command}`));
		for (let t of b.launch.triggers ?? []) e.push(a("span", { class: "au-chip auto" }, o(B[t.type]), V(t)));
		return e;
	}
	function J(e) {
		let t = w(e);
		return t ? Object.entries(t.params).filter(([, e]) => n.askable.includes(e.type)).map(([e]) => e) : [];
	}
	function Y() {
		let e = a("div", {
			class: "au-steps",
			role: "listbox",
			tabindex: "0",
			"aria-label": h("col.step"),
			"aria-activedescendant": `au-step-${S}`
		});
		return b.steps.length || e.append(a("p", { class: "au-hint pad" }, h("steps.none"))), b.steps.forEach((t, n) => {
			let r = w(t), i = Object.values(t.fields ?? {}).some((e) => e.mode === "ask"), s = J(t).length > 0, c = (e, t, n, r, i, s = !0) => {
				let c = a("button", {
					class: `au-tg ${e}${t ? " on" : ""}`,
					type: "button",
					title: n,
					"aria-label": n,
					"aria-pressed": String(t),
					tabindex: "-1",
					disabled: !s
				});
				return c.append(o(r)), c.addEventListener("click", (e) => {
					e.stopPropagation(), i();
				}), c;
			}, l = a("input", {
				type: "checkbox",
				checked: t.enabled,
				tabindex: "-1",
				"aria-label": h("col.on")
			});
			l.addEventListener("click", (e) => e.stopPropagation()), l.addEventListener("change", () => {
				t.enabled = l.checked, U("steps");
			});
			let u = ee(t, n), d = a("div", {
				class: `au-step${n === S ? " sel" : ""}${t.enabled ? "" : " off"}`,
				id: `au-step-${n}`,
				role: "option",
				"aria-selected": String(n === S),
				onclick: () => {
					S = n, K(), Z();
				}
			}, a("span", { class: "c" }, l), a("span", { class: "c" }, c("cf", t.confirm, h("col.confirm"), "help", () => {
				t.confirm = !t.confirm, U("steps");
			})), a("span", { class: "c" }, c("ak", i, h(s ? "col.ask" : "col.askNone"), "pencil", () => te(t), s)), a("span", { class: "c" }, ne(t)), a("span", { class: "what" }, a("b", {}, r ? T(t.action) : h("steps.missing", { action: t.action }), a("em", {}, D(r?.app))), a("small", {}, F(t).map((e) => a("span", { class: "au-v-wrap" }, `${e.label} `, a("span", { class: `au-v ${e.kind}` }, e.text))), u ? a("span", { class: "au-warn" }, o("warning"), h("steps.broken")) : null)), a("span", { class: "n" }, String(n + 1)));
			e.append(d);
		}), e.addEventListener("keydown", (e) => {
			if (!b.steps.length) return;
			let t = b.steps[S];
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				let t = Math.max(0, Math.min(b.steps.length - 1, S + (e.key === "ArrowDown" ? 1 : -1)));
				if (e.altKey) return ie(S, t);
				S = t;
			} else if (e.key === " ") return e.preventDefault(), t.enabled = !t.enabled, U("steps"), X();
			else if (e.key === "Delete") return e.preventDefault(), e.stopPropagation(), ae(S);
			else return;
			K(), Z(), X();
		}), e;
	}
	let X = () => N.querySelector(".au-steps")?.focus();
	function te(e) {
		let t = J(e);
		if (t.filter((t) => e.fields[t]?.mode === "ask").length) t.forEach((t) => {
			w(e).params[t].type !== "secret" && (e.fields[t] = {
				...e.fields[t],
				mode: "use"
			});
		});
		else {
			let n = t.filter((t) => e.changed.includes(t));
			(n.length ? n : t).forEach((t) => {
				e.fields[t] = {
					...e.fields[t],
					mode: "ask"
				};
			});
		}
		U("steps");
	}
	function ne(e) {
		let t = w(e), n = a("span", {
			class: "au-badge",
			"aria-hidden": "true"
		}, o(k(t?.app, e.action)));
		return n.style.background = O(t?.app), n;
	}
	function re(e) {
		let t = (n) => Array.isArray(n) ? n.map(t) : z(n) ? Number.isInteger(n.step) ? {
			...n,
			step: e.has(n.step) ? e.get(n.step) : -1
		} : n.ref ? {
			...n,
			ref: t(n.ref)
		} : n : n;
		for (let e of b.steps) {
			for (let n of Object.keys(e.params)) e.params[n] = t(e.params[n]);
			e.file &&= t(e.file);
		}
	}
	function ie(e, t) {
		if (e === t) return;
		let n = b.steps.map((e, t) => t);
		n.splice(t, 0, n.splice(e, 1)[0]), b.steps = n.map((e) => b.steps[e]), re(new Map(n.map((e, t) => [e, t]))), S = t, U("steps"), X();
	}
	async function ae(e) {
		if (await s(d, {
			icon: "warning",
			text: h("steps.removeAsk", { step: T(b.steps[e].action) }),
			buttons: ["continue", "cancel"]
		}) !== "continue") return X();
		let t = new Map(b.steps.map((t, n) => [n, n < e ? n : n - 1]).filter(([t]) => t !== e));
		b.steps.splice(e, 1), re(t), S = Math.min(S, b.steps.length - 1), U("steps"), X();
	}
	function Z() {
		let e = b?.steps[S];
		if (!e) return I.replaceChildren(a("p", { class: "au-hint pad" }, b ? h("detail.none") : ""));
		let t = w(e), n = (e, t, n, r) => {
			let i = a("button", {
				class: `au-switch${e ? " on" : ""}`,
				type: "button",
				role: "switch",
				"aria-checked": String(e),
				"aria-label": t
			});
			return i.addEventListener("click", () => r(!e)), a("div", { class: "au-sw-row" }, i, a("div", {}, a("b", {}, t), a("small", {}, n)));
		}, r = [
			a("div", { class: "au-dh" }, ne(e), a("div", {}, a("b", {}, t ? T(e.action) : e.action), a("small", {}, h("detail.from", {
				n: S + 1,
				app: D(t?.app)
			})))),
			n(e.enabled, h("detail.on"), h("detail.onHint"), (t) => {
				e.enabled = t, U("steps");
			}),
			n(e.confirm, h("detail.confirm"), h("detail.confirmHint"), (t) => {
				e.confirm = t, U("steps");
			})
		];
		if (t) {
			let n = Object.keys(t.params).filter((n) => n in e.params || t.params[n].type === "secret" || e.fields[n]?.mode === "ask"), i = n.filter((t) => e.changed.includes(t)), s = n.filter((t) => !e.changed.includes(t));
			e.file && r.push(a("div", { class: "au-sec" }, h("field.file")), se(e, null, t)), i.length && r.push(a("div", { class: "au-sec" }, o("pencil"), h("detail.changed")), ...i.map((n) => oe(e, n, t))), s.length && r.push(a("div", { class: "au-sec" }, i.length ? h("detail.others") : h("detail.fields")), ...s.map((n) => oe(e, n, t)));
		}
		let i = a("select", {
			class: "au-select",
			"aria-label": h("detail.onError")
		}, [
			"stop",
			"skip",
			"ask"
		].map((t) => a("option", {
			value: t,
			selected: e.onError === t
		}, h(`onError.${t}`))));
		i.addEventListener("change", () => {
			e.onError = i.value, U("none");
		}), r.push(a("div", { class: "au-sec" }, h("detail.onError")), i), I.replaceChildren(a("div", { class: "au-db" }, r));
	}
	function oe(e, t, r) {
		let s = r.params[t], c = e.fields[t] ?? { mode: "use" }, l = E(e.action, t, s);
		if (R.includes(s.type)) return se(e, t, r);
		let u = e.params[t], d = e.defaults && t in e.defaults && e.changed.includes(t) ? P(e.action, t, s, e.defaults[t]) : null, f = a("div", { class: `au-fld${c.mode === "ask" ? " asking" : ""}` }, a("div", { class: "top" }, a("b", {}, l), a("span", { class: "was" }, s.type === "secret" ? h("field.secret") : [h("field.recorded", { value: P(e.action, t, s, u) }), d ? ` · ${h("field.was", { value: d })}` : ""].join(""))));
		if (!n.askable.includes(s.type)) return f;
		let p = s.type === "secret" ? ["ask"] : s.type === "text" ? [
			"use",
			"template",
			"ask"
		] : ["use", "ask"], m = a("div", {
			class: "au-seg",
			role: "radiogroup",
			"aria-label": l
		});
		for (let n of p) {
			let r = a("button", {
				type: "button",
				role: "radio",
				"aria-checked": String(c.mode === n),
				class: n === "ask" ? "ask" : ""
			}, n === "use" ? h("mode.use", { value: le(P(e.action, t, s, u)) }) : h(`mode.${n}`));
			r.addEventListener("click", () => {
				e.fields[t] = {
					...c,
					mode: n,
					...n === "template" && !c.template && { template: "{nome}.{est}" }
				}, U("steps");
			}), m.append(r);
		}
		if (f.append(m), c.mode === "ask") {
			let n = a("input", {
				class: "au-input",
				value: c.question ?? "",
				placeholder: l,
				maxlength: 200,
				"aria-label": h("field.question")
			});
			n.addEventListener("change", () => {
				e.fields[t] = {
					...e.fields[t],
					question: n.value.trim()
				}, U("steps");
			}), f.append(a("label", { class: "au-q" }, a("span", {}, h("field.question")), n));
		}
		if (c.mode === "template") {
			let n = a("input", {
				class: "au-input mono",
				value: c.template ?? "",
				maxlength: 255,
				"aria-label": h("field.template")
			});
			n.addEventListener("change", () => {
				e.fields[t] = {
					...e.fields[t],
					template: n.value
				}, U("steps");
			});
			let s = [
				"{nome}",
				"{est}",
				"{data}",
				"{ora}",
				"{n}",
				"{cartella}"
			].map((e) => a("button", {
				class: "au-tok",
				type: "button",
				title: h(`token.${e.slice(1, -1)}`),
				onclick: () => {
					n.value += e, n.dispatchEvent(new Event("change"));
				}
			}, e)), l = i.get(ce(e, r)), u = l ? g().fillTemplate(c.template ?? "", {
				node: l,
				n: 1
			}) : "";
			f.append(a("label", { class: "au-q" }, a("span", {}, h("field.template")), n), a("div", { class: "au-tokens" }, s), u ? a("div", { class: "au-preview" }, o("check"), `${l.name} → ${u}`) : null);
		}
		return f;
	}
	function se(e, t, r) {
		let i = t ? r.params[t] : { type: "file" }, o = t ? e.params[t] : e.file, s = t ? e.fields[t] ?? { mode: "use" } : { mode: "use" }, c = t ? E(e.action, t, i) : h("field.file"), l = Array.isArray(o) ? o[0] : o, u = [], d = l && !l.input && !Number.isInteger(l.step) ? l : null;
		d ? u.push({
			key: "fixed",
			label: h("source.fixed", { path: M(d) }),
			value: d
		}) : e.recordedFixed?.[t ?? "_file"] && u.push({
			key: "fixed",
			label: h("source.fixed", { path: M(e.recordedFixed[t ?? "_file"]) }),
			value: e.recordedFixed[t ?? "_file"]
		}), b.input !== "none" && u.push({
			key: "input",
			label: h("source.input"),
			value: { input: !0 }
		}), b.input === "files" && i.type === "folder" && u.push({
			key: "inputFolder",
			label: h("source.inputFolder"),
			value: {
				input: !0,
				parent: !0
			}
		}), b.steps.slice(0, S).forEach((e, t) => {
			(w(e)?.result === "file" || [
				"lilos.move",
				"lilos.rename",
				"lilos.open"
			].includes(e.action)) && u.push({
				key: `step${t}`,
				label: h("source.step", {
					n: t + 1,
					step: T(e.action)
				}),
				value: { step: t }
			});
		});
		let f = (e) => e ? e.input ? e.parent ? "inputFolder" : "input" : Number.isInteger(e.step) ? `step${e.step}` : "fixed" : "", p = a("div", { class: `au-fld${s.mode === "ask" ? " asking" : ""}` }, a("div", { class: "top" }, a("b", {}, c)));
		if (Array.isArray(o) && o.length > 1) p.append(a("div", { class: "au-hint" }, P(e.action, t, i, o)));
		else {
			let n = a("select", {
				class: "au-select",
				"aria-label": c
			}, u.map((e) => a("option", {
				value: e.key,
				selected: e.key === f(l)
			}, e.label)));
			n.addEventListener("change", () => {
				let r = u.find((e) => e.key === n.value);
				d && (e.recordedFixed = {
					...e.recordedFixed,
					[t ?? "_file"]: d
				});
				let a = i.type === "files" ? [r.value] : r.value;
				t ? e.params[t] = a : e.file = a, U("steps");
			}), p.append(n);
		}
		if (t && n.askable.includes(i.type)) {
			let n = a("div", {
				class: "au-seg",
				role: "radiogroup",
				"aria-label": c
			});
			for (let r of ["use", "ask"]) {
				let i = a("button", {
					type: "button",
					role: "radio",
					"aria-checked": String(s.mode === r),
					class: r === "ask" ? "ask" : ""
				}, h(r === "use" ? "mode.useRef" : "mode.ask"));
				i.addEventListener("click", () => {
					e.fields[t] = {
						...s,
						mode: r
					}, U("steps");
				}), n.append(i);
			}
			p.append(n);
		}
		return p;
	}
	let ce = (e, t) => {
		let n = Object.entries(t.params).find(([, e]) => e.subject)?.[0], r = n ? e.params[n] : e.file, a = Array.isArray(r) ? r[0] : r;
		return a?.id && i.exists(a.id) ? a.id : a?.path ? i.resolve(a.path)?.id ?? null : null;
	}, le = (e) => e.length > 18 ? `${e.slice(0, 17)}…` : e;
	function ue() {
		if (!b) return;
		let e = structuredClone({
			input: b.input,
			launch: {
				...b.launch,
				triggers: b.launch.triggers ?? []
			}
		}), t = a("div", {
			class: "au-overlay",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": h("launch.title", { name: b.name })
		}), n = () => {
			t.remove(), X();
		}, i = a("div", {
			class: "au-seg wide",
			role: "radiogroup",
			"aria-label": h("launch.input")
		});
		for (let t of [
			"none",
			"files",
			"folder"
		]) {
			let n = a("button", {
				type: "button",
				role: "radio",
				"aria-checked": String(e.input === t)
			}, h(`input.${t}`));
			n.addEventListener("click", () => {
				e.input = t, o.disabled = t === "none", t === "none" && (o.checked = !1), i.querySelectorAll("button").forEach((e) => e.setAttribute("aria-checked", String(e === n)));
			}), i.append(n);
		}
		let o = a("input", {
			type: "checkbox",
			checked: e.launch.menu && e.input !== "none",
			disabled: e.input === "none"
		}), s = a("input", {
			class: "au-input",
			value: e.launch.ext.join(", "),
			placeholder: "jpg, png",
			"aria-label": h("launch.ext")
		}), c = e.launch.shortcut, l = a("button", {
			class: "au-btn key",
			type: "button"
		}, c || h("launch.noKey"));
		l.addEventListener("click", () => {
			l.textContent = h("launch.press"), l.dataset.listening = "1";
		}), l.addEventListener("keydown", (e) => {
			if (!l.dataset.listening) return;
			if (e.preventDefault(), e.stopPropagation(), e.key === "Escape") {
				delete l.dataset.listening, l.textContent = c || h("launch.noKey");
				return;
			}
			if (e.key === "Backspace" || e.key === "Delete") {
				c = "", delete l.dataset.listening, l.textContent = h("launch.noKey");
				return;
			}
			let t = r(e);
			if (!t || !/^(Ctrl|Alt)\+/.test(t)) return;
			let n = u.owner?.(t, `automation.${p}`), i = u.validate?.(t, `automation.${p}`) || (n ? h("launch.keyTaken", { name: n.label ?? n }) : "");
			i ? l.textContent = i : (c = t, delete l.dataset.listening, l.textContent = t);
		});
		let d = a("input", {
			class: "au-input mono",
			value: e.launch.command,
			placeholder: "web",
			maxlength: 40,
			"aria-label": h("launch.command")
		}), f = de(e.launch.triggers), m = a("p", {
			class: "au-error",
			role: "alert"
		}), g = a("button", {
			class: "au-btn primary",
			type: "button"
		}, h("action.save"));
		g.addEventListener("click", () => {
			let t = s.value.split(/[\s,;]+/).map((e) => e.replace(/^\./, "").toLowerCase()).filter(Boolean);
			if (t.some((e) => !/^[a-z0-9]{1,10}$/.test(e))) return void (m.textContent = h("launch.badExt"));
			let r = d.value.trim().toLowerCase();
			if (r && !/^[a-z][\w.-]{0,39}$/.test(r)) return void (m.textContent = h("launch.badCommand"));
			let i = _().list().find((e) => e.id !== p && r && e.launch.command === r);
			if (i) return void (m.textContent = h("launch.commandTaken", { name: i.name }));
			let a = f.value();
			if (a.some((e) => e.type === "folder" && !e.folder)) return void (m.textContent = h("trigger.noFolder"));
			if (a.some((e) => e.type !== "folder") && e.input !== "none") return void (m.textContent = h("trigger.needsNone"));
			b.input = e.input, b.launch = {
				menu: o.checked && e.input !== "none",
				ext: t,
				shortcut: c,
				command: r,
				triggers: a
			}, n(), U();
		}), t.append(a("div", { class: "au-dialog" }, a("h3", {}, h("launch.title", { name: b.name })), a("div", { class: "au-opt" }, a("div", { class: "au-sec" }, h("launch.input")), i, a("p", { class: "au-hint" }, h("launch.inputHint"))), a("label", { class: "au-check" }, o, a("span", {}, a("b", {}, h("launch.menu")), a("small", {}, h("launch.menuHint")))), a("label", { class: "au-q" }, a("span", {}, h("launch.ext")), s), a("div", { class: "au-q" }, a("span", {}, h("launch.shortcut")), l, a("small", { class: "au-hint" }, h("launch.shortcutHint"))), a("label", { class: "au-q" }, a("span", {}, h("launch.command")), d, a("small", { class: "au-hint" }, h("launch.commandHint"))), a("div", { class: "au-opt" }, a("div", { class: "au-sec" }, h("trigger.title")), f.el, a("p", { class: "au-hint" }, h("trigger.hint"))), m, a("div", { class: "au-dfoot" }, a("button", {
			class: "au-btn",
			type: "button",
			onclick: n
		}, h("action.cancel")), g))), t.addEventListener("keydown", (e) => {
			e.key === "Escape" && !l.dataset.listening && (e.stopPropagation(), n());
		}), H.append(t), t.querySelector("button[aria-checked=\"true\"]")?.focus();
	}
	function de(e) {
		let t = e.map((e) => ({
			...e,
			days: [...e.days ?? []]
		})), n = a("div", { class: "au-triggers" }), r = new Date(2026, 10, 2), s = (e, t) => m.date(new Date(r.getTime() + (e - 1) * 864e5), { weekday: t }), l = () => {
			n.replaceChildren(...t.map((e, n) => {
				let r = a("button", {
					class: "au-icon",
					type: "button",
					title: h("trigger.remove"),
					"aria-label": h("trigger.remove"),
					onclick: () => {
						t.splice(n, 1), l();
					}
				}, o("x")), u;
				if (e.type === "time") {
					let t = a("input", {
						class: "au-input",
						type: "time",
						value: e.at ?? "08:00",
						"aria-label": h("trigger.at")
					});
					t.addEventListener("change", () => {
						e.at = t.value;
					}), e.at = t.value;
					let n = a("div", {
						class: "au-days",
						role: "group",
						"aria-label": h("trigger.days")
					}, [
						1,
						2,
						3,
						4,
						5,
						6,
						7
					].map((t) => {
						let n = a("button", {
							type: "button",
							class: "au-day",
							"aria-pressed": String(e.days.includes(t)),
							title: s(t, "long"),
							"aria-label": s(t, "long")
						}, s(t, "narrow"));
						return n.addEventListener("click", () => {
							e.days = e.days.includes(t) ? e.days.filter((e) => e !== t) : [...e.days, t].sort(), n.setAttribute("aria-pressed", String(e.days.includes(t)));
						}), n;
					})), r = a("input", {
						type: "checkbox",
						checked: e.catchUp === !0
					});
					r.addEventListener("change", () => {
						e.catchUp = r.checked;
					}), u = [a("div", { class: "au-l1" }, o("calendar"), a("b", {}, h("trigger.time")), t, n), a("label", { class: "au-check small" }, r, a("span", {}, h("trigger.catchUp")))];
				} else if (e.type === "every") {
					let t = a("input", {
						class: "au-input num",
						type: "number",
						min: 5,
						max: 1440,
						value: e.minutes ?? 30,
						"aria-label": h("trigger.minutes")
					});
					t.addEventListener("change", () => {
						e.minutes = Math.max(5, Math.min(1440, Math.round(Number(t.value) || 30))), t.value = e.minutes;
					}), e.minutes ??= 30, u = [a("div", { class: "au-l1" }, o(B.every), a("b", {}, h("trigger.every")), t, a("span", {}, h("trigger.minutesUnit")))];
				} else if (e.type === "login") u = [a("div", { class: "au-l1" }, o("user"), a("b", {}, h("trigger.login")))];
				else {
					let t = a("code", { class: "au-where" }, e.folder ? M(e.folder) : h("trigger.noFolderYet")), n = a("button", {
						class: "au-btn",
						type: "button"
					}, h("trigger.chooseFolder"));
					n.addEventListener("click", async () => {
						let n = await f.pickFile?.(c, {
							kind: "folder",
							title: h("trigger.chooseFolder")
						});
						n && (e.folder = {
							id: n.id,
							path: i.path(n.id)
						}, t.textContent = M(e.folder));
					}), u = [a("div", { class: "au-l1" }, o("folderOpen"), a("b", {}, h("trigger.folder")), t, n), a("small", { class: "au-hint" }, h("trigger.folderHint"))];
				}
				return a("div", { class: "au-trigger" }, a("div", { class: "au-tbody" }, u), r);
			}), a("div", { class: "au-l1 wrap" }, [
				"time",
				"every",
				"login",
				"folder"
			].map((e) => a("button", {
				class: "au-btn",
				type: "button",
				disabled: t.length >= 10,
				onclick: () => {
					t.push(e === "time" ? {
						type: e,
						at: "08:00",
						days: [],
						catchUp: !1
					} : e === "every" ? {
						type: e,
						minutes: 30
					} : { type: e }), l();
				}
			}, o("plus"), h(`trigger.add.${e}`)))));
		};
		return l(), {
			el: n,
			value: () => t.map((e) => e.type === "time" ? {
				type: "time",
				at: e.at,
				days: e.days,
				catchUp: !!e.catchUp
			} : e.type === "every" ? {
				type: "every",
				minutes: e.minutes
			} : e.type === "login" ? { type: "login" } : {
				type: "folder",
				folder: e.folder ?? null
			})
		};
	}
	async function Q({ from: e = 0, only: t = !1 } = {}) {
		b && (C && (clearTimeout(C), C = null, await y(p, b).catch(() => {})), f.launch("automata", {
			automation: p,
			from: e,
			only: t
		}, "run"));
	}
	async function fe() {
		await s(d, {
			icon: "warning",
			text: h("menu.deleteAsk", { name: b.name }),
			buttons: ["continue", "cancel"]
		}) === "continue" && (clearTimeout(C), C = null, i.trash([p]), b = null, p = null, $());
	}
	function $() {
		G(), K(), Z();
	}
	_().on("change", G);
	let pe = n.on("actions", () => {
		b && K();
	});
	return d.on("destroy", () => {
		_().off("change", G), pe();
	}), d.on("launch", (e) => {
		e?.file && W(e.file);
	}), d.getState = () => p ? { file: p } : {}, _().ready().then(() => W(e?.file && i.exists(e.file) ? e.file : _().list()[0]?.id ?? null)), d;
}
// src/automata/recorder.js
var U = null;
function W({ args: e } = {}) {
	let r = new t({
		title: h("rec.title"),
		icon: "record",
		width: 300,
		height: 380,
		minWidth: 260,
		minHeight: 220,
		maximizable: !1,
		focusable: !1,
		onTop: !0
	}), c = g();
	if (!c) return r.body.append(a("p", { class: "au-empty" }, h("needsNewer"))), r;
	let l = (e) => {
		n.recording || e?.restored || (U = typeof e?.append == "string" && i.exists(e.append) ? e.append : null, c.startRecording({ items: Array.isArray(e?.items) ? e.items : [] }));
	};
	if (l(e), r.on("launch", l), r.getState = () => ({ restored: !0 }), e?.restored && !n.recording) return setTimeout(() => r.emit("close"), 0), r;
	let u = Date.now(), d = a("span", { class: "rc-time" }, "00:00"), p = a("div", { class: "rc-head" }, a("span", { class: "rc-dot" }), a("b", {}, h("rec.recording")), d), m = a("div", {
		class: "rc-list",
		role: "log",
		"aria-live": "polite",
		"aria-label": h("rec.steps")
	}), _ = a("button", {
		class: "au-btn",
		type: "button"
	}), v = a("button", {
		class: "au-btn",
		type: "button"
	}, o("x"), h("rec.discard")), y = a("button", {
		class: "au-btn stop",
		type: "button"
	}, o("stop"), h("rec.finish")), b = a("div", { class: "rc" }, p, m, a("div", { class: "rc-foot" }, _, v, y));
	r.body.append(b);
	let S = setInterval(() => {
		let e = Math.floor((Date.now() - u) / 1e3);
		d.textContent = `${String(Math.floor(e / 60)).padStart(2, "0")}:${String(e % 60).padStart(2, "0")}`;
	}, 1e3);
	function C() {
		let e = n.steps().filter((e) => e.retracted !== "merged");
		p.classList.toggle("paused", n.paused), p.querySelector("b").textContent = n.paused ? h("rec.paused") : h("rec.recording"), _.replaceChildren(o(n.paused ? "record" : "pause"), n.paused ? h("rec.resume") : h("rec.pause")), y.disabled = !e.some((e) => !e.retracted && !e.missed), e.length ? (m.replaceChildren(...e.map((t, r) => {
			if (t.missed) return a("div", { class: "rc-step undone" }, a("span", {
				class: "au-badge",
				style: "background:#3a3f48"
			}, o("x")), a("div", {}, a("span", {}, t.missed), a("small", {}, h("rec.missed", { app: D(t.app) }))));
			let i = n.describe(t.action), s = a("span", { class: "au-badge" }, o(k(i?.app, t.action)));
			return s.style.background = t.retracted ? "#3a3f48" : O(i?.app), a("div", { class: `rc-step${t.retracted ? " undone" : ""}${r === e.length - 1 && !t.retracted ? " new" : ""}` }, s, a("div", {}, a("span", {}, T(t.action)), a("small", {}, t.retracted ? h("rec.undone") : I(t).map((e, t) => [t ? " · " : "", e.changed ? a("i", {}, e.text) : e.text]).flat())));
		})), m.scrollTop = m.scrollHeight) : m.replaceChildren(a("p", { class: "rc-empty" }, h(U ? "rec.emptyAppend" : "rec.empty")));
	}
	let w = [
		"change",
		"step",
		"retract",
		"restore"
	].map((e) => n.on(e, C));
	return C(), _.addEventListener("click", () => c.pauseRecording(!n.paused)), v.addEventListener("click", async () => {
		let e = n.steps().filter((e) => !e.retracted && !e.missed).length;
		e && await s(r, {
			icon: "warning",
			text: h("rec.discardAsk", { n: e }),
			buttons: ["continue", "cancel"]
		}) !== "continue" || (c.discardRecording(), U = null, r.emit("close"));
	}), y.addEventListener("click", async () => {
		y.disabled = !0;
		try {
			let e = await G();
			r.emit("close"), e && f.launch("automata", { file: e });
		} catch (e) {
			y.disabled = !1, x(h("error.save", { error: e.message }), "error");
		}
	}), r.canClose = async () => {
		if (!n.recording) return !0;
		let e = n.steps().filter((e) => !e.retracted && !e.missed).length;
		return e ? await s(r, {
			icon: "warning",
			text: h("rec.closeAsk", { n: e }),
			buttons: ["continue", "cancel"]
		}) === "continue" && (c.discardRecording(), !0) : (c.discardRecording(), !0);
	}, r.on("destroy", () => {
		clearInterval(S), w.forEach((e) => e());
	}), r;
}
async function G() {
	let e = g(), { steps: t, inputs: n } = e.stopRecording(), r = U;
	if (U = null, !t.length) return null;
	let i = e.fromRecording(t, {
		name: h("newNameAt", { date: (/* @__PURE__ */ new Date()).toLocaleDateString() }),
		inputs: n
	});
	if (!r) return b(i);
	let a = await v(r), o = a.steps.length, s = (e) => Array.isArray(e) ? e.map(s) : !e || typeof e != "object" ? e : Number.isInteger(e.step) ? {
		...e,
		step: e.step + o
	} : e.ref ? {
		...e,
		ref: s(e.ref)
	} : e;
	for (let e of i.steps) {
		for (let t of Object.keys(e.params)) e.params[t] = s(e.params[t]);
		e.file &&= s(e.file);
	}
	return a.input === "none" && i.input !== "none" && (a.input = i.input), a.steps.push(...i.steps), await y(r, a), r;
}
// src/automata/run.js
function K({ args: e, openWindow: r } = {}) {
	let s = new t({
		title: h("run.title"),
		icon: "automation",
		width: 460,
		height: 520,
		minWidth: 380,
		minHeight: 320,
		maximizable: !1
	}), l = g();
	if (!l) return s.body.append(a("p", { class: "au-empty" }, h("needsNewer"))), s;
	let u = !1, d = null, p = null, m = a("div", { class: "rn-top" }), _ = a("div", {
		class: "rn-list",
		role: "list"
	}), y = a("div", {
		class: "rn-panel",
		hidden: !0
	}), b = a("button", {
		class: "au-btn",
		type: "button"
	}), x = a("button", {
		class: "au-btn danger",
		type: "button"
	}, o("stop"), h("run.stop")), S = a("div", { class: "rn-foot" }, b, a("span", { class: "au-grow" }), x), C = a("div", { class: "rn" }, m, _, y, S);
	s.body.append(C), b.addEventListener("click", () => {
		d && (d.paused ? (p?.(), d.paused = null) : d.paused = new Promise((e) => {
			p = e;
		}), w());
	}), x.addEventListener("click", () => {
		if (!u) return s.emit("close");
		d.stopped = !0, p?.(), D?.("stop");
	});
	let w = () => b.replaceChildren(o(d?.paused ? "play" : "pause"), d?.paused ? h("run.resume") : h("run.pause")), D = null, A = (e, t) => new Promise((n) => {
		D = (e) => {
			D = null, y.hidden = !0, y.replaceChildren(), n(e);
		}, y.replaceChildren(...e, a("div", { class: "rn-actions" }, t)), y.hidden = !1, (y.querySelector("input, select, button.primary") ?? y.querySelector("button"))?.focus();
	}), M = (e, t, n) => a("div", { class: "rn-ask-head" }, a("span", { class: `rn-bub ${e}` }, o(e === "ak" ? "pencil" : "help")), a("div", {}, a("b", {}, t), a("small", {}, n))), N = (e) => e && i.exists(e) ? i.get(e).name : "";
	function F(e, t, n) {
		if (e.type === "boolean") {
			let e = a("input", {
				type: "checkbox",
				checked: !!t,
				"aria-label": n
			});
			return {
				el: a("label", { class: "au-check" }, e, a("span", {}, n)),
				get: () => e.checked,
				labelled: !0
			};
		}
		if (e.type === "choice") {
			let r = a("select", {
				class: "au-select",
				"aria-label": n
			}, e.options.map((e) => a("option", {
				value: String(e.value),
				selected: e.value === t
			}, e.label)));
			return {
				el: r,
				get: () => e.options.find((e) => String(e.value) === r.value)?.value
			};
		}
		if (e.type === "files") {
			let e = (Array.isArray(t) ? t : t ? [t] : []).filter((e) => i.exists(e)), s = a("div", { class: "rn-chosen" }), c = () => s.replaceChildren(...e.length ? e.map((t, n) => a("div", { class: "rn-line" }, o(i.get(t)?.type === "folder" ? "folder" : "file"), a("code", {}, j(t)), a("button", {
				class: "au-icon",
				type: "button",
				title: h("run.removeItem"),
				"aria-label": h("run.removeItem", { name: i.get(t)?.name ?? "" }),
				onclick: () => {
					e.splice(n, 1), c();
				}
			}, o("x")))) : [a("span", { class: "au-hint" }, h("value.empty"))]), l = (t) => async () => {
				let i = await f.pickFile?.(r, {
					kind: t,
					title: n
				});
				i && !e.includes(i.id) && (e.push(i.id), c());
			};
			return c(), {
				el: a("div", { class: "rn-many" }, s, a("div", { class: "rn-actions" }, a("button", {
					class: "au-btn",
					type: "button",
					onclick: l("file")
				}, o("plus"), h("run.addFile")), a("button", {
					class: "au-btn",
					type: "button",
					onclick: l("folder")
				}, o("folder"), h("run.addFolder")))),
				get: () => [...e],
				check: () => e.length ? "" : h("run.noneChosen")
			};
		}
		if (e.type === "file" || e.type === "folder") {
			let i = Array.isArray(t) ? t[0] : t, o = a("span", { class: "rn-path" }, i ? j(i) : h("value.empty")), s = a("button", {
				class: "au-btn",
				type: "button"
			}, h("run.choose"));
			return s.addEventListener("click", async () => {
				let t = await f.pickFile?.(r, {
					kind: e.type === "folder" ? "folder" : "file",
					title: n
				});
				t && (i = t.id, o.textContent = j(t.id));
			}), {
				el: a("div", { class: "rn-pick" }, o, s),
				get: () => i
			};
		}
		let s = a("input", {
			class: "au-input",
			type: e.type === "secret" ? "password" : e.type === "number" ? "number" : "text",
			"aria-label": n,
			autocomplete: "off"
		});
		return e.type !== "secret" && t != null && (s.value = String(t)), e.type === "number" && (Number.isFinite(e.min) && (s.min = e.min), Number.isFinite(e.max) && (s.max = e.max)), {
			el: s,
			get: () => e.type === "number" ? Number(s.value) : s.value,
			check: () => e.type === "number" && (s.value === "" || !Number.isFinite(Number(s.value)) || Number.isFinite(e.min) && Number(s.value) < e.min || Number.isFinite(e.max) && Number(s.value) > e.max) ? h("run.badNumber") : ""
		};
	}
	let ee = {
		ask: ({ step: e, index: t, item: n, fields: r }) => {
			let i = r.map((e) => ({
				f: e,
				...F(e.param, e.value, e.question)
			})), o = a("input", { type: "checkbox" }), s = (d.items ?? 0) > 1, c = a("p", {
				class: "au-error",
				role: "alert"
			}), l = a("button", {
				class: "au-btn primary",
				type: "button"
			}, h("run.continue"));
			return l.addEventListener("click", () => {
				let e = i.map((e) => e.check?.()).find(Boolean);
				if (e) return void (c.textContent = e);
				D({
					values: Object.fromEntries(i.map((e) => [e.f.name, e.get()])),
					remember: o.checked
				});
			}), y.onkeydown = (e) => {
				e.key === "Enter" && e.target.tagName === "INPUT" && e.target.type !== "checkbox" && l.click();
			}, A([
				M("ak", T(e.action), [h("run.stepOf", {
					n: t + 1,
					total: d.total
				}), N(n)].filter(Boolean).join(" · ")),
				...i.map((t) => t.labelled ? t.el : a("label", { class: "au-q" }, a("span", {}, t.f.question), t.el, t.f.param.type !== "secret" && t.f.value != null ? a("small", { class: "au-hint" }, h("run.recorded", { value: P(e.action, t.f.name, t.f.param, t.f.value) })) : null)),
				s && !r.some((e) => e.param.type === "secret") ? a("label", { class: "au-check" }, o, a("span", {}, h("run.remember"))) : null,
				c
			].filter(Boolean), [
				a("button", {
					class: "au-btn danger",
					type: "button",
					onclick: () => D("stop")
				}, h("run.stop")),
				a("span", { class: "au-grow" }),
				a("button", {
					class: "au-btn",
					type: "button",
					onclick: () => D("skip")
				}, h("run.skip")),
				l
			]);
		},
		confirm: ({ step: e, index: t, item: r, params: i, file: s }) => {
			let c = n.describe(e.action), l = Object.entries(c?.params ?? {}).filter(([e]) => i[e] !== void 0 && i[e] !== null && !(Array.isArray(i[e]) && !i[e].length)).map(([t, n]) => a("div", { class: "rn-line" }, a("span", {}, E(e.action, t, n)), a("code", {}, I(e.action, t, n, i[t]))));
			return s && l.unshift(a("div", { class: "rn-line" }, a("span", {}, h("field.file")), a("code", {}, j(s)))), A([M("cf", h("run.confirm", { step: T(e.action) }), [h("run.stepOf", {
				n: t + 1,
				total: d.total
			}), N(r)].filter(Boolean).join(" · ")), a("div", { class: "rn-preview" }, l)], [
				a("button", {
					class: "au-btn danger",
					type: "button",
					onclick: () => D("stop")
				}, h("run.stopAll")),
				a("span", { class: "au-grow" }),
				a("button", {
					class: "au-btn",
					type: "button",
					onclick: () => D("skip")
				}, h("run.skip")),
				a("button", {
					class: "au-btn primary",
					type: "button",
					onclick: () => D("run")
				}, o("play"), h("run.run"))
			]);
		},
		failed: ({ step: e, index: t, error: n }) => A([M("cf", h("run.failed", { step: T(e.action) }), h("run.stepOf", {
			n: t + 1,
			total: d.total
		})), a("p", { class: "au-error" }, n.message)], [
			a("button", {
				class: "au-btn danger",
				type: "button",
				onclick: () => D("stop")
			}, h("run.stop")),
			a("span", { class: "au-grow" }),
			a("button", {
				class: "au-btn",
				type: "button",
				onclick: () => D("skip")
			}, h("run.skip")),
			a("button", {
				class: "au-btn primary",
				type: "button",
				onclick: () => D("retry")
			}, h("run.retry"))
		]),
		progress: (e) => G(e)
	};
	function I(e, t, n, r) {
		let a = (e) => j(e) || (i.isTrashed(e) ? h("value.inTrash", { name: i.trashed().find((t) => t.id === e)?.name ?? "" }) : h("value.gone"));
		return n.type === "file" || n.type === "folder" ? a(r) : n.type === "files" ? r.length > 3 ? h("value.items", { n: r.length }) : r.map(a).join(", ") : n.type === "places" ? h("value.places", { n: r.length }) : P(e, t, n, r);
	}
	let L = null, R = [], z = null, B = null, V = null;
	function H(e) {
		z = a("i"), B = a("span", { class: "r" }), V = a("div", { class: "rn-item" }), m.replaceChildren(a("div", { class: "rn-l1" }, a("b", {}, e), B), a("div", { class: "rn-bar" }, z), V);
	}
	function U(e, t) {
		R = L.steps.map((r, i) => {
			let s = n.describe(r.action), c = a("span", { class: "au-badge" }, o(k(s?.app, r.action)));
			c.style.background = O(s?.app);
			let l = a("span", { class: "st" }), u = a("span", { class: "mk todo" }, o("check")), d = a("div", {
				class: `rn-row${r.enabled && i >= e && i < t ? "" : " dim"}`,
				role: "listitem"
			}, u, c, a("span", { class: "nm" }, T(r.action)), l);
			return r.enabled || (l.textContent = h("run.off")), {
				row: d,
				st: l,
				mark: u
			};
		}), _.replaceChildren(...R.map((e) => e.row));
	}
	let W = (e, t, n, r = "check") => {
		let i = R[e];
		i && (i.row.classList.remove("cur"), t === "cur" && i.row.classList.add("cur"), i.mark.className = `mk ${t}`, i.mark.replaceChildren(t === "cur" ? a("span", { class: "spin" }) : o(r)), i.st.textContent = n);
	};
	function G(e) {
		e.type === "item" ? (d.done = e.index, B.textContent = e.total > 1 ? h("run.itemOf", {
			n: e.index + 1,
			total: e.total
		}) : "", z.style.width = `${Math.round(e.index / e.total * 100)}%`, V.textContent = e.item ? j(e.item) : "", R.forEach((e, t) => {
			L.steps[t].enabled && W(t, "todo", "");
		})) : e.type === "step" ? W(e.index, "cur", "") : e.type === "done" ? W(e.index, "ok", "") : e.type === "skipped" ? e.reason === "user" && W(e.index, "skip", h("run.skipped"), "arrowRight") : e.type === "failed" ? W(e.index, "err", e.error ?? "", "warning") : e.type === "end" && (z.style.width = "100%");
	}
	async function K(e) {
		if (u) return void c.send({
			app: "automata",
			text: h("run.busy"),
			level: "warning"
		}).catch(() => {});
		let t = e?.automation;
		if (!t || !i.exists(t)) return void _.replaceChildren(a("p", { class: "au-error" }, h("run.missing")));
		try {
			L = await v(t);
		} catch (e) {
			_.replaceChildren(a("p", { class: "au-error" }, h("error.open", { error: e.message })));
			return;
		}
		s.setTitle(`${h("run.title")} — ${L.name}`), H(L.name);
		let n = Number.isInteger(e.from) ? e.from : 0;
		U(n, e.only ? n + 1 : L.steps.length);
		let r = (Array.isArray(e.items) ? e.items : []).filter((e) => i.exists(e));
		if (L.input !== "none" && !r.length && (r = await q(), !r)) return s.emit("close");
		u = !0, d = {
			stopped: !1,
			paused: null,
			items: L.input === "files" ? r.length : 1,
			total: L.steps.length
		}, w(), x.replaceChildren(o("stop"), h("run.stop"));
		let f;
		try {
			f = await l.run(L, {
				items: r,
				values: e.values ?? {},
				ui: ee,
				control: d,
				from: n,
				only: !!e.only
			});
		} catch (e) {
			f = { error: e.message };
		}
		u = !1, D = null, y.hidden = !0, b.hidden = !0, x.replaceChildren(h("action.close")), x.classList.remove("danger");
		let p = f.error ? h("run.endError", {
			name: L.name,
			error: f.error
		}) : f.stopped ? h("run.endStopped", { name: L.name }) : h("run.end", {
			name: L.name,
			n: f.items,
			skipped: f.skipped + f.failed
		});
		V.textContent = p, V.classList.toggle("bad", !!f.error), c.send({
			app: "automata",
			text: p,
			level: f.error ? "error" : f.stopped ? "warning" : "success"
		}).catch(() => {});
	}
	function q() {
		let e = [], t = a("div", { class: "rn-chosen" }), n = a("button", {
			class: "au-btn primary",
			type: "button",
			disabled: !0
		}, o("play"), h("run.start")), i = a("button", {
			class: "au-btn",
			type: "button"
		}, o("plus"), L.input === "folder" ? h("run.chooseFolder") : h("run.addFile")), s = () => {
			t.replaceChildren(...e.map((e) => a("div", { class: "rn-line" }, o(L.input === "folder" ? "folder" : "file"), a("code", {}, j(e))))), n.disabled = !e.length, i.hidden = L.input === "folder" && e.length > 0;
		};
		return i.addEventListener("click", async () => {
			let t = await f.pickFile?.(r, {
				kind: L.input === "folder" ? "folder" : "file",
				exts: L.launch.ext.length ? L.launch.ext : null,
				title: h("run.chooseTitle")
			});
			t && !e.includes(t.id) && e.push(t.id), s();
		}), s(), new Promise((r) => {
			D = (e) => {
				D = null, y.hidden = !0, y.replaceChildren(), r(e);
			}, n.addEventListener("click", () => D([...e])), y.replaceChildren(a("p", {}, L.input === "folder" ? h("run.needFolder") : h("run.needFiles")), t, a("div", { class: "rn-actions" }, i, a("span", { class: "au-grow" }), a("button", {
				class: "au-btn",
				type: "button",
				onclick: () => D(null)
			}, h("action.cancel")), n)), y.hidden = !1, i.focus();
		});
	}
	if (s.on("launch", K), s.getState = () => ({ restored: !0 }), e?.restored) return setTimeout(() => s.emit("close"), 0), s;
	let J = () => (u && (d.stopped = !0, p?.(), D?.("stop")), !0);
	return s.canClose = J, s.on("destroy", J), K(e), s;
}
// src/automata/cli.js
function q({ lilos: e }) {
	e.handle(async ({ args: e = [], cwd: t = "~" } = {}) => {
		if (!g()) return {
			stderr: `${h("needsNewer")}\n`,
			code: 1
		};
		await _().ready();
		let [n, ...r] = e;
		return !n || n === "help" || n === "--help" || n === "-h" ? { stdout: `${h("cli.usage")}\n` } : n === "list" || n === "ls" ? J() : n === "run" ? X(r, t) : {
			stderr: `${h("cli.unknown", { sub: n })}\n${h("cli.usage")}\n`,
			code: 2
		};
	});
}
function J() {
	let e = _().list();
	if (!e.length) return { stdout: `${h("cli.none")}\n` };
	let t = Math.max(...e.map((e) => (e.launch.command || "-").length), 4);
	return { stdout: e.map((e) => `${(e.launch.command || "-").padEnd(t)}  ${e.name}${e.input === "none" ? "" : `  (${h(`input.${e.input}`)})`}`).join("\n") + "\n" };
}
var Y = (e, t) => e.startsWith("/") || e.startsWith("~") ? i.resolve(e) : i.resolve(`${t.replace(/\/+$/, "")}/${e}`);
async function X(e, t) {
	let [n, ...r] = e;
	if (!n) return {
		stderr: `${h("cli.usage")}\n`,
		code: 2
	};
	let a = _().get(n) ?? (Y(n, t) ? _().get(Y(n, t).id) : null);
	if (!a) return {
		stderr: `${h("cli.notFound", { name: n })}\n`,
		code: 1
	};
	let o = {}, s = [], c = !1;
	for (let e of r) {
		if (e === "--yes" || e === "-y") {
			c = !0;
			continue;
		}
		let n = /^--([a-zA-Z][\w]*)=(.*)$/s.exec(e);
		if (n) {
			o[n[1]] = n[2];
			continue;
		}
		let r = Y(e, t);
		if (!r) return {
			stderr: `${h("cli.noFile", { path: e })}\n`,
			code: 1
		};
		s.push(r.id);
	}
	let l = await v(a.id);
	if (l.input !== "none" && !s.length) return {
		stderr: `${h("cli.needItems")}\n`,
		code: 2
	};
	if (l.steps.some((e) => e.enabled && (e.confirm || Object.entries(e.fields).some(([e, t]) => t.mode === "ask" && !Object.hasOwn(o, e)))) && !c) return f.launch("automata", {
		automation: a.id,
		items: s,
		values: o
	}, "run"), { stdout: `${h("cli.opened", { name: l.name })}\n` };
	let u = [], d = 0, p = 1, m = await g().run(l, {
		items: s,
		values: o,
		ui: { progress: (e) => {
			e.type === "item" && (d = e.index + 1, p = e.total, e.total > 1 && u.push(`[${d}/${p}] ${e.item ? i.get(e.item)?.name ?? "" : ""}`)), e.type === "failed" && u.push(`  ${h("cli.failed", {
				step: T(l.steps[e.index].action),
				error: e.error
			})}`);
		} }
	}).catch((e) => ({ error: e.message }));
	return m.error ? {
		stdout: u.length ? `${u.join("\n")}\n` : "",
		stderr: `${m.error}\n`,
		code: 1
	} : (u.push(h("cli.done", {
		name: l.name,
		n: m.items
	})), { stdout: `${u.join("\n")}\n` });
}
// src/automata/AutomataApp.js
var te = H;
export { q as cli, te as default, W as recorder, K as run };
