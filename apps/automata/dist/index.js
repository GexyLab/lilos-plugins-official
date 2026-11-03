import * as e from "/host/sdk.js";
import { Window as t, actionButton as n, automation as r, checkbox as i, fs as a, h as o, icon as s, messageBox as c, notifications as l, openMenu as u, schedule as d, segmented as f, selectField as p, shortcuts as m, tags as h, textField as g, toggle as _ } from "/host/sdk.js";
import * as v from "/host/system.js";
// src/shared/i18n.js
function y(t, n) {
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
var b = y("automata", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Automata\",\"@description\":\"Record what you do in lilOS and do it again with a click: each step can ask for confirmation, or for its values, before it runs.\",\"@entrypoints.main.params.file.label\":\"Automation\",\"@entrypoints.main.params.file.description\":\"The automation to open\",\"@entrypoints.recorder.label\":\"Recorder\",\"@entrypoints.run.label\":\"Run an automation\",\"@entrypoints.cli.label\":\"Terminal command\",\"@entrypoints.triggers.label\":\"Starts at a time moved to Scheduler\",\"needsNewer\":\"Automata needs lilOS 1.22.0 or later.\",\"newName\":\"New automation\",\"newNameAt\":\"Automation of {date}\",\"action.save\":\"Save\",\"action.cancel\":\"Cancel\",\"action.close\":\"Close\",\"side.label\":\"Your automations\",\"side.title\":\"Automations\",\"side.record\":\"Record new\",\"side.steps\":{\"one\":\"1 step\",\"other\":\"{n} steps\"},\"side.none\":\"None yet: record one and it shows up here.\",\"side.where\":\"Saved in {folder} as .automata files: copy and share them like any other file.\",\"welcome.title\":\"Do it once, then let lilOS do it\",\"welcome.text\":\"Start recording and work as usual: moving and renaming files, resizing an image, replacing text… Every operation becomes a step you can run again, on other files too. A step can ask for confirmation, or for a value, before it runs.\",\"head.name\":\"Name of the automation\",\"head.desc\":\"Description\",\"head.descPlaceholder\":\"Add a description\",\"head.recordMore\":\"Record more steps\",\"head.run\":\"Run\",\"head.more\":\"More\",\"menu.launch\":\"Launch options…\",\"menu.show\":\"Show in File Manager\",\"menu.delete\":\"Move to Trash\",\"menu.deleteAsk\":\"Move «{name}» to the Trash?\",\"chip.input\":\"Works on: {what}\",\"chip.menu\":\"Files menu\",\"chip.menuExt\":\"Files menu: {ext}\",\"input.none\":\"nothing\",\"input.files\":\"the files chosen when it starts\",\"input.folder\":\"a folder chosen when it starts\",\"col.on\":\"Run this step\",\"col.confirm\":\"Ask before running it\",\"col.ask\":\"Ask for its values\",\"col.askNone\":\"No values to ask for\",\"col.step\":\"Steps\",\"steps.none\":\"No steps. Use «Record more steps» to add some.\",\"steps.missing\":\"{action} (app not installed)\",\"steps.broken\":\"uses a step that no longer comes before it\",\"steps.removeAsk\":\"Remove the step «{step}»?\",\"foot.fromHere\":\"Run from here\",\"foot.only\":\"Only this step\",\"foot.launch\":\"Launch…\",\"foot.hint\":\"Alt ↑↓ to move a step · Del to remove it\",\"detail.label\":\"Options of the step\",\"detail.none\":\"Select a step to see its options.\",\"detail.from\":\"Step {n} · {app}\",\"detail.on\":\"Run this step\",\"detail.onHint\":\"Off: the automation skips it\",\"detail.confirm\":\"Ask before running it\",\"detail.confirmHint\":\"Shows what it is about to do: Run, Skip or Stop\",\"detail.changed\":\"Changed while recording\",\"detail.others\":\"Other fields\",\"detail.fields\":\"Fields\",\"detail.onError\":\"If the step fails\",\"onError.stop\":\"Stop the automation and tell me\",\"onError.skip\":\"Skip it and go on\",\"onError.ask\":\"Ask me what to do\",\"field.file\":\"File\",\"field.recorded\":\"recorded {value}\",\"field.was\":\"was {value}\",\"field.secret\":\"never saved: always asked\",\"field.question\":\"Question\",\"field.template\":\"Template\",\"mode.use\":\"Use {value}\",\"mode.useRef\":\"Use this\",\"mode.ask\":\"Ask\",\"mode.template\":\"Template\",\"token.nome\":\"Name without extension\",\"token.est\":\"Extension\",\"token.data\":\"Today's date\",\"token.ora\":\"Time\",\"token.n\":\"Number of the item (1, 2, 3…)\",\"token.cartella\":\"Name of its folder\",\"source.fixed\":\"Always {path}\",\"source.input\":\"The item chosen when it starts\",\"source.inputFolder\":\"The folder of the item chosen when it starts\",\"source.step\":\"What step {n} made ({step})\",\"ref.input\":\"the item chosen when it starts\",\"ref.inputFolder\":\"the folder of the item chosen when it starts\",\"ref.step\":\"the result of step {n}\",\"ref.stepItem\":\"item {k} of step {n}\",\"ref.none\":\"—\",\"value.empty\":\"—\",\"value.yes\":\"yes\",\"value.no\":\"no\",\"value.items\":{\"one\":\"1 item\",\"other\":\"{n} items\"},\"value.places\":{\"one\":\"1 position\",\"other\":\"{n} positions\"},\"value.noTags\":\"no tags\",\"value.defaultApp\":\"its app\",\"value.gone\":\"(gone)\",\"value.inTrash\":\"{name} (in the Trash)\",\"launch.title\":\"Launching «{name}»\",\"launch.input\":\"Works on\",\"launch.inputHint\":\"Several files: the steps run once for each of them.\",\"launch.menu\":\"In the files menu\",\"launch.menuHint\":\"Under «Automazioni», on the desk and in File Manager\",\"launch.ext\":\"Only for these extensions (empty: every file)\",\"launch.badExt\":\"Extensions are letters and digits, separated by commas.\",\"launch.shortcut\":\"Shortcut\",\"launch.shortcutHint\":\"Click, then press the keys (with Ctrl or Alt). Del removes it.\",\"launch.noKey\":\"None\",\"launch.keyTaken\":\"Already used by «{name}»\",\"launch.press\":\"Press the keys…\",\"launch.command\":\"Name for the Terminal\",\"launch.commandHint\":\"automata run <name> [file…] [--field=value] [--yes]\",\"launch.badCommand\":\"A name for the Terminal starts with a letter: letters, digits, - _ .\",\"launch.commandTaken\":\"«{name}» already has this name.\",\"trigger.title\":\"When it starts by itself\",\"trigger.hint\":\"Only while lilOS is open in a tab (in one tab only). If it asks something it opens in Automata; otherwise it runs quietly and a notification says how it went.\",\"trigger.add.login\":\"When I sign in\",\"trigger.add.folder\":\"When files arrive in a folder\",\"trigger.remove\":\"Remove\",\"trigger.login\":\"When I sign in\",\"trigger.folder\":\"Files arriving in\",\"trigger.noFolderYet\":\"no folder yet\",\"trigger.chooseFolder\":\"Choose…\",\"trigger.folderHint\":\"Made, moved or copied there; only the extensions above, if any. They are the files it works on.\",\"trigger.noFolder\":\"Choose the folder to watch.\",\"trigger.needsNone\":\"At sign-in there is nothing to choose: set «Works on» to nothing (a folder trigger works with files too).\",\"trigger.chipLogin\":\"at sign-in\",\"trigger.chipFolder\":\"files in {path}\",\"plan.title\":\"At a time\",\"plan.hint\":\"Scheduler starts it, also when lilOS is closed (it runs as soon as lilOS opens). Only an automation that works on nothing.\",\"plan.new\":\"Schedule…\",\"plan.edit\":\"Change in Scheduler\",\"plan.editOf\":\"Change «{what}» in Scheduler\",\"plan.next\":\"next: {when}\",\"plan.done\":\"no more times\",\"plan.paused\":\"paused\",\"plan.needsNone\":\"Set «Works on» to nothing and save first.\",\"plan.unavailable\":\"Scheduler needs lilOS’s kernel: not available here.\",\"plan.moved\":{\"one\":\"«{name}»: its start at a time is now in Scheduler.\",\"other\":\"«{name}»: its {n} starts at a time are now in Scheduler.\"},\"plan.moveFailed\":\"«{name}»: its start at a time could not move to Scheduler ({error}).\",\"rec.title\":\"Recorder\",\"rec.recording\":\"Recording\",\"rec.paused\":\"Paused\",\"rec.steps\":\"Recorded steps\",\"rec.empty\":\"Work as usual: what you do appears here as steps. Ctrl Z takes back the last one.\",\"rec.emptyAppend\":\"Work as usual: the new steps go at the end of the automation.\",\"rec.undone\":\"undone with Ctrl Z: left out\",\"rec.missed\":\"{app} cannot record it\",\"rec.pause\":\"Pause\",\"rec.resume\":\"Resume\",\"rec.discard\":\"Discard\",\"rec.finish\":\"Done\",\"rec.discardAsk\":{\"one\":\"Forget the step recorded?\",\"other\":\"Forget the {n} steps recorded?\"},\"rec.closeAsk\":{\"one\":\"Closing the recorder ends the recording and forgets 1 step. Close it?\",\"other\":\"Closing the recorder ends the recording and forgets {n} steps. Close it?\"},\"run.title\":\"Running\",\"run.pause\":\"Pause\",\"run.resume\":\"Resume\",\"run.stop\":\"Stop\",\"run.stopAll\":\"Stop everything\",\"run.skip\":\"Skip\",\"run.run\":\"Run\",\"run.retry\":\"Try again\",\"run.continue\":\"Continue\",\"run.start\":\"Start\",\"run.off\":\"off\",\"run.skipped\":\"skipped\",\"run.stepOf\":\"Step {n} of {total}\",\"run.itemOf\":\"item {n} of {total}\",\"run.confirm\":\"Run «{step}»?\",\"run.failed\":\"«{step}» did not work\",\"run.recorded\":\"Recorded: {value}\",\"run.remember\":\"Use it for all the remaining items\",\"run.chooseTitle\":\"Choose what to work on\",\"run.addFile\":\"Add a file\",\"run.chooseFolder\":\"Choose a folder\",\"run.needFiles\":\"Choose the files to work on: the steps run once for each of them.\",\"run.needFolder\":\"Choose the folder to work on.\",\"run.missing\":\"The automation does not exist any more.\",\"run.busy\":\"An automation is already running: wait for it to end.\",\"run.end\":{\"one\":\"{name}: done ({skipped} steps skipped).\",\"other\":\"{name}: done on {n} items ({skipped} steps skipped).\"},\"run.endStopped\":\"{name}: stopped.\",\"run.endError\":\"{name}: {error}\",\"error.open\":\"The automation cannot be opened: {error}\",\"error.save\":\"The automation was not saved: {error}\",\"cli.usage\":\"usage: automata list\\n       automata run <name> [file…] [--field=value…] [--yes]\\n  <name>   the Terminal name chosen in Launch, the automation's name or its .automata file\\n  --yes    run here: confirmations are given, asked values take the recorded one\",\"cli.unknown\":\"automata: unknown command «{sub}»\",\"cli.none\":\"No automations yet: record one with Automata.\",\"cli.notFound\":\"automata: no automation called «{name}»\",\"cli.noFile\":\"automata: {path}: no such file or folder\",\"cli.needItems\":\"automata: this automation works on files: name them after its name\",\"cli.opened\":\"«{name}» asks something: it opened in Automata.\",\"cli.failed\":\"{step}: {error}\",\"cli.done\":{\"one\":\"{name}: done.\",\"other\":\"{name}: done on {n} items.\"},\"action.lilos.create\":\"Create\",\"action.lilos.create.folder\":\"In the folder\",\"action.lilos.create.name\":\"Name\",\"action.lilos.create.kind\":\"Kind\",\"action.lilos.create.kind.file\":\"File\",\"action.lilos.create.kind.folder\":\"Folder\",\"action.lilos.rename\":\"Rename\",\"action.lilos.rename.item\":\"Item\",\"action.lilos.rename.name\":\"New name\",\"action.lilos.move\":\"Move\",\"action.lilos.move.items\":\"Items\",\"action.lilos.move.to\":\"Into\",\"action.lilos.copy\":\"Copy\",\"action.lilos.copy.items\":\"Items\",\"action.lilos.copy.to\":\"Into\",\"action.lilos.trash\":\"Move to Trash\",\"action.lilos.trash.items\":\"Items\",\"action.lilos.restore\":\"Restore from Trash\",\"action.lilos.restore.items\":\"Items\",\"action.lilos.delete\":\"Delete for good\",\"action.lilos.delete.items\":\"Items\",\"action.lilos.emptyTrash\":\"Empty the Trash\",\"action.lilos.tags\":\"Tags\",\"action.lilos.tags.item\":\"Item\",\"action.lilos.tags.tags\":\"Tags\",\"action.lilos.open\":\"Open\",\"action.lilos.open.item\":\"File\",\"action.lilos.open.app\":\"With\",\"action.lilos.launch\":\"Open the app\",\"action.lilos.launch.app\":\"App\",\"action.lilos.launch.entry\":\"Window\",\"action.lilos.close\":\"Close the window\",\"action.lilos.close.app\":\"App\",\"action.lilos.close.file\":\"Showing\",\"action.lilos.workspace\":\"Go to workspace\",\"action.lilos.workspace.to\":\"Workspace\",\"action.lilos.setting\":\"Setting\",\"action.lilos.setting.key\":\"Setting\",\"action.lilos.setting.value\":\"Value\",\"action.lilos.place\":\"Move on the desk\",\"action.lilos.place.places\":\"Positions\",\"action.lilos.arrange\":\"Arrange the icons\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"@name\":\"Automata\",\"@description\":\"Registra quello che fai in lilOS e rifallo con un clic: ogni passo può chiedere conferma, o i suoi valori, prima di essere eseguito.\",\"@entrypoints.main.params.file.label\":\"Automazione\",\"@entrypoints.main.params.file.description\":\"L’automazione da aprire\",\"@entrypoints.recorder.label\":\"Registratore\",\"@entrypoints.run.label\":\"Esegui un’automazione\",\"@entrypoints.cli.label\":\"Comando del Terminale\",\"@entrypoints.triggers.label\":\"Partenze a un’ora spostate in Pianificazione\",\"needsNewer\":\"Automata richiede lilOS 1.22.0 o successivo.\",\"newName\":\"Nuova automazione\",\"newNameAt\":\"Automazione del {date}\",\"action.save\":\"Salva\",\"action.cancel\":\"Annulla\",\"action.close\":\"Chiudi\",\"side.label\":\"Le tue automazioni\",\"side.title\":\"Automazioni\",\"side.record\":\"Registra nuova\",\"side.steps\":{\"one\":\"1 passo\",\"other\":\"{n} passi\"},\"side.none\":\"Nessuna per ora: registrane una e compare qui.\",\"side.where\":\"Salvate in {folder} come file .automata: si copiano e si condividono come gli altri file.\",\"welcome.title\":\"Fallo una volta, poi lo fa lilOS\",\"welcome.text\":\"Avvia la registrazione e lavora come sempre: spostare e rinominare file, ridimensionare un’immagine, sostituire un testo… Ogni operazione diventa un passo che puoi rieseguire, anche su altri file. Un passo può chiedere conferma, o un valore, prima di essere eseguito.\",\"head.name\":\"Nome dell’automazione\",\"head.desc\":\"Descrizione\",\"head.descPlaceholder\":\"Aggiungi una descrizione\",\"head.recordMore\":\"Registra altri passi\",\"head.run\":\"Esegui\",\"head.more\":\"Altro\",\"menu.launch\":\"Opzioni di avvio…\",\"menu.show\":\"Mostra nel File Manager\",\"menu.delete\":\"Sposta nel Cestino\",\"menu.deleteAsk\":\"Spostare «{name}» nel Cestino?\",\"chip.input\":\"Lavora su: {what}\",\"chip.menu\":\"Menu dei file\",\"chip.menuExt\":\"Menu dei file: {ext}\",\"input.none\":\"niente\",\"input.files\":\"i file scelti all’avvio\",\"input.folder\":\"una cartella scelta all’avvio\",\"col.on\":\"Esegui questo passo\",\"col.confirm\":\"Chiedi conferma prima\",\"col.ask\":\"Chiedi i valori\",\"col.askNone\":\"Nessun valore da chiedere\",\"col.step\":\"Passi\",\"steps.none\":\"Nessun passo. Usa «Registra altri passi» per aggiungerne.\",\"steps.missing\":\"{action} (app non installata)\",\"steps.broken\":\"usa un passo che non viene più prima\",\"steps.removeAsk\":\"Togliere il passo «{step}»?\",\"foot.fromHere\":\"Esegui da qui\",\"foot.only\":\"Solo questo passo\",\"foot.launch\":\"Avvio…\",\"foot.hint\":\"Alt ↑↓ per spostare un passo · Canc per toglierlo\",\"detail.label\":\"Opzioni del passo\",\"detail.none\":\"Seleziona un passo per vederne le opzioni.\",\"detail.from\":\"Passo {n} · {app}\",\"detail.on\":\"Esegui questo passo\",\"detail.onHint\":\"Spento: l’automazione lo salta\",\"detail.confirm\":\"Chiedi conferma prima\",\"detail.confirmHint\":\"Mostra cosa sta per fare: Esegui, Salta o Ferma\",\"detail.changed\":\"Cambiati durante la registrazione\",\"detail.others\":\"Altri campi\",\"detail.fields\":\"Campi\",\"detail.onError\":\"Se il passo non riesce\",\"onError.stop\":\"Ferma l’automazione e avvisa\",\"onError.skip\":\"Saltalo e continua\",\"onError.ask\":\"Chiedimi cosa fare\",\"field.file\":\"File\",\"field.recorded\":\"registrato {value}\",\"field.was\":\"era {value}\",\"field.secret\":\"mai salvato: chiesto sempre\",\"field.question\":\"Domanda\",\"field.template\":\"Modello\",\"mode.use\":\"Usa {value}\",\"mode.useRef\":\"Usa questo\",\"mode.ask\":\"Chiedi\",\"mode.template\":\"Modello\",\"token.nome\":\"Nome senza estensione\",\"token.est\":\"Estensione\",\"token.data\":\"Data di oggi\",\"token.ora\":\"Ora\",\"token.n\":\"Numero dell’elemento (1, 2, 3…)\",\"token.cartella\":\"Nome della sua cartella\",\"source.fixed\":\"Sempre {path}\",\"source.input\":\"L’elemento scelto all’avvio\",\"source.inputFolder\":\"La cartella dell’elemento scelto all’avvio\",\"source.step\":\"Quello che fa il passo {n} ({step})\",\"ref.input\":\"l’elemento scelto all’avvio\",\"ref.inputFolder\":\"la cartella dell’elemento scelto all’avvio\",\"ref.step\":\"il risultato del passo {n}\",\"ref.stepItem\":\"l’elemento {k} del passo {n}\",\"ref.none\":\"—\",\"value.empty\":\"—\",\"value.yes\":\"sì\",\"value.no\":\"no\",\"value.items\":{\"one\":\"1 elemento\",\"other\":\"{n} elementi\"},\"value.places\":{\"one\":\"1 posizione\",\"other\":\"{n} posizioni\"},\"value.noTags\":\"nessun tag\",\"value.defaultApp\":\"la sua app\",\"value.gone\":\"(non c’è più)\",\"value.inTrash\":\"{name} (nel Cestino)\",\"launch.title\":\"Avvio di «{name}»\",\"launch.input\":\"Su cosa lavora\",\"launch.inputHint\":\"Più file: i passi si ripetono per ciascuno.\",\"launch.menu\":\"Nel menu dei file\",\"launch.menuHint\":\"Sotto «Automazioni», sulla scrivania e nel File Manager\",\"launch.ext\":\"Solo per queste estensioni (vuoto: ogni file)\",\"launch.badExt\":\"Le estensioni sono lettere e cifre, separate da virgole.\",\"launch.shortcut\":\"Scorciatoia\",\"launch.shortcutHint\":\"Fai clic, poi premi i tasti (con Ctrl o Alt). Canc la toglie.\",\"launch.noKey\":\"Nessuna\",\"launch.keyTaken\":\"Già usata da «{name}»\",\"launch.press\":\"Premi i tasti…\",\"launch.command\":\"Nome per il Terminale\",\"launch.commandHint\":\"automata run <nome> [file…] [--campo=valore] [--yes]\",\"launch.badCommand\":\"Un nome per il Terminale inizia con una lettera: lettere, cifre, - _ .\",\"launch.commandTaken\":\"«{name}» ha già questo nome.\",\"trigger.title\":\"Quando parte da sola\",\"trigger.hint\":\"Solo mentre lilOS è aperto in una scheda (in una sola). Se chiede qualcosa si apre in Automata; altrimenti gira da sola e una notifica dice com’è andata.\",\"trigger.add.login\":\"Quando entro\",\"trigger.add.folder\":\"Quando arrivano file in una cartella\",\"trigger.remove\":\"Togli\",\"trigger.login\":\"Quando entro\",\"trigger.folder\":\"File che arrivano in\",\"trigger.noFolderYet\":\"nessuna cartella\",\"trigger.chooseFolder\":\"Scegli…\",\"trigger.folderHint\":\"Creati, spostati o copiati lì; solo con le estensioni indicate sopra, se ce ne sono. Sono i file su cui lavora.\",\"trigger.noFolder\":\"Scegli la cartella da tenere d’occhio.\",\"trigger.needsNone\":\"All’accesso non c’è niente da scegliere: imposta «Su cosa lavora» su niente (con una cartella da tenere d’occhio vanno bene anche i file).\",\"trigger.chipLogin\":\"all’accesso\",\"trigger.chipFolder\":\"file in {path}\",\"plan.title\":\"A un’ora\",\"plan.hint\":\"La fa partire Pianificazione, anche con lilOS chiuso (parte appena lilOS si apre). Solo un’automazione che non lavora su niente.\",\"plan.new\":\"Pianifica…\",\"plan.edit\":\"Cambia in Pianificazione\",\"plan.editOf\":\"Cambia «{what}» in Pianificazione\",\"plan.next\":\"prossima: {when}\",\"plan.done\":\"nessun’altra volta\",\"plan.paused\":\"in pausa\",\"plan.needsNone\":\"Prima imposta «Su cosa lavora» su niente e salva.\",\"plan.unavailable\":\"Pianificazione ha bisogno del kernel di lilOS: qui non c’è.\",\"plan.moved\":{\"one\":\"«{name}»: la sua partenza a un’ora ora è in Pianificazione.\",\"other\":\"«{name}»: le sue {n} partenze a un’ora ora sono in Pianificazione.\"},\"plan.moveFailed\":\"«{name}»: la partenza a un’ora non è passata in Pianificazione ({error}).\",\"rec.title\":\"Registratore\",\"rec.recording\":\"Registrazione\",\"rec.paused\":\"In pausa\",\"rec.steps\":\"Passi registrati\",\"rec.empty\":\"Lavora come sempre: quello che fai compare qui come passi. Ctrl Z toglie l’ultimo.\",\"rec.emptyAppend\":\"Lavora come sempre: i nuovi passi vanno in fondo all’automazione.\",\"rec.undone\":\"annullato con Ctrl Z: tolto\",\"rec.missed\":\"{app} non lo rende registrabile\",\"rec.pause\":\"Pausa\",\"rec.resume\":\"Riprendi\",\"rec.discard\":\"Scarta\",\"rec.finish\":\"Fine\",\"rec.discardAsk\":{\"one\":\"Dimenticare il passo registrato?\",\"other\":\"Dimenticare i {n} passi registrati?\"},\"rec.closeAsk\":{\"one\":\"Chiudere il registratore termina la registrazione e dimentica 1 passo. Chiuderlo?\",\"other\":\"Chiudere il registratore termina la registrazione e dimentica {n} passi. Chiuderlo?\"},\"run.title\":\"In esecuzione\",\"run.pause\":\"Pausa\",\"run.resume\":\"Riprendi\",\"run.stop\":\"Ferma\",\"run.stopAll\":\"Ferma tutto\",\"run.skip\":\"Salta\",\"run.run\":\"Esegui\",\"run.retry\":\"Riprova\",\"run.continue\":\"Continua\",\"run.start\":\"Avvia\",\"run.off\":\"spento\",\"run.skipped\":\"saltato\",\"run.stepOf\":\"Passo {n} di {total}\",\"run.itemOf\":\"elemento {n} di {total}\",\"run.confirm\":\"Eseguire «{step}»?\",\"run.failed\":\"«{step}» non è riuscito\",\"run.recorded\":\"Registrato: {value}\",\"run.remember\":\"Usa per tutti gli elementi rimanenti\",\"run.chooseTitle\":\"Scegli su cosa lavorare\",\"run.addFile\":\"Aggiungi un file\",\"run.chooseFolder\":\"Scegli una cartella\",\"run.needFiles\":\"Scegli i file su cui lavorare: i passi si ripetono per ciascuno.\",\"run.needFolder\":\"Scegli la cartella su cui lavorare.\",\"run.missing\":\"L’automazione non esiste più.\",\"run.busy\":\"C’è già un’automazione in esecuzione: aspetta che finisca.\",\"run.end\":{\"one\":\"{name}: fatto ({skipped} passi saltati).\",\"other\":\"{name}: fatto su {n} elementi ({skipped} passi saltati).\"},\"run.endStopped\":\"{name}: fermata.\",\"run.endError\":\"{name}: {error}\",\"error.open\":\"Non si riesce ad aprire l’automazione: {error}\",\"error.save\":\"L’automazione non è stata salvata: {error}\",\"cli.usage\":\"uso: automata list\\n     automata run <nome> [file…] [--campo=valore…] [--yes]\\n  <nome>   il nome per il Terminale scelto in Avvio, il nome dell’automazione o il suo file .automata\\n  --yes    esegue qui: le conferme sono date, i valori chiesti prendono quello registrato\",\"cli.unknown\":\"automata: comando sconosciuto «{sub}»\",\"cli.none\":\"Ancora nessuna automazione: registrane una con Automata.\",\"cli.notFound\":\"automata: nessuna automazione si chiama «{name}»\",\"cli.noFile\":\"automata: {path}: file o cartella inesistente\",\"cli.needItems\":\"automata: questa automazione lavora su file: scrivili dopo il suo nome\",\"cli.opened\":\"«{name}» chiede qualcosa: si è aperta in Automata.\",\"cli.failed\":\"{step}: {error}\",\"cli.done\":{\"one\":\"{name}: fatto.\",\"other\":\"{name}: fatto su {n} elementi.\"},\"action.lilos.create\":\"Crea\",\"action.lilos.create.folder\":\"Nella cartella\",\"action.lilos.create.name\":\"Nome\",\"action.lilos.create.kind\":\"Tipo\",\"action.lilos.create.kind.file\":\"File\",\"action.lilos.create.kind.folder\":\"Cartella\",\"action.lilos.rename\":\"Rinomina\",\"action.lilos.rename.item\":\"Elemento\",\"action.lilos.rename.name\":\"Nuovo nome\",\"action.lilos.move\":\"Sposta\",\"action.lilos.move.items\":\"Elementi\",\"action.lilos.move.to\":\"In\",\"action.lilos.copy\":\"Copia\",\"action.lilos.copy.items\":\"Elementi\",\"action.lilos.copy.to\":\"In\",\"action.lilos.trash\":\"Sposta nel Cestino\",\"action.lilos.trash.items\":\"Elementi\",\"action.lilos.restore\":\"Ripristina dal Cestino\",\"action.lilos.restore.items\":\"Elementi\",\"action.lilos.delete\":\"Elimina definitivamente\",\"action.lilos.delete.items\":\"Elementi\",\"action.lilos.emptyTrash\":\"Svuota il Cestino\",\"action.lilos.tags\":\"Tag\",\"action.lilos.tags.item\":\"Elemento\",\"action.lilos.tags.tags\":\"Tag\",\"action.lilos.open\":\"Apri\",\"action.lilos.open.item\":\"File\",\"action.lilos.open.app\":\"Con\",\"action.lilos.launch\":\"Apri l’app\",\"action.lilos.launch.app\":\"App\",\"action.lilos.launch.entry\":\"Finestra\",\"action.lilos.close\":\"Chiudi la finestra\",\"action.lilos.close.app\":\"App\",\"action.lilos.close.file\":\"Che mostra\",\"action.lilos.workspace\":\"Vai al workspace\",\"action.lilos.workspace.to\":\"Workspace\",\"action.lilos.setting\":\"Impostazione\",\"action.lilos.setting.key\":\"Impostazione\",\"action.lilos.setting.value\":\"Valore\",\"action.lilos.place\":\"Sposta sulla scrivania\",\"action.lilos.place.places\":\"Posizioni\",\"action.lilos.arrange\":\"Riordina le icone\"}}")
}), { t: x } = b, S = () => v.automations ?? null, C = () => S()?.library ?? null;
async function w(e) {
	return S().check(await a.read(e));
}
async function T(e, t) {
	await a.write(e, `${JSON.stringify(t, null, 2)}\n`);
}
async function E(e) {
	let t = S().folder(), n = a.cleanName(e.name || x("newName"), { portable: !0 }) || x("newName"), r = a.create(t.id, {
		type: "file",
		name: a.uniqueName(t.id, `${n}.automata`)
	});
	return await T(r.id, e), r.id;
}
var D = (e, t = "info") => l.send({
	app: "automata",
	text: e,
	level: t
}).catch(() => {}), O = [
	"file",
	"files",
	"folder"
], k = (e) => x(e) !== e, A = (e) => r.describe(e.action);
function j(e) {
	return k(`action.${e}`) ? x(`action.${e}`) : r.describe(e)?.label ?? e;
}
function M(e, t, n) {
	return k(`action.${e}.${t}`) ? x(`action.${e}.${t}`) : n?.label || t;
}
var N = (e) => e ? v.getApp?.(e)?.name ?? e : "lilOS", ee = (e) => e ? v.getApp?.(e)?.color ?? "#5b6b82" : "#3b6ef5", te = (e, t) => e ? v.getApp?.(e)?.glyph ?? "window" : P[t] ?? "folder", P = {
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
}, F = (e) => e && a.exists(e) ? a.tildePath(e) ?? "" : "";
function I(e) {
	return e ? e.input ? e.parent ? x("ref.inputFolder") : x("ref.input") : Number.isInteger(e.step) ? Number.isInteger(e.index) ? x("ref.stepItem", {
		n: e.step + 1,
		k: e.index + 1
	}) : x("ref.step", { n: e.step + 1 }) : e.id && a.exists(e.id) ? F(e.id) : e.path ? e.path.replace(/^\/home\/[^/]+/, "~") : x("ref.none") : x("ref.none");
}
var L = (e) => e?.input || Number.isInteger(e?.step) ? "ref" : "plain";
function R(e, t, n, r) {
	if (r == null || r === "") return x("value.empty");
	switch (n?.type) {
		case "boolean": return x(r ? "value.yes" : "value.no");
		case "number": return b.number(r);
		case "choice": {
			let i = n.options?.find((e) => e.value === r);
			return k(`action.${e}.${t}.${r}`) ? x(`action.${e}.${t}.${r}`) : i?.label ?? String(r);
		}
		case "file":
		case "folder": return I(r);
		case "files": {
			let e = Array.isArray(r) ? r : [r];
			return e.length > 2 ? x("value.items", { n: e.length }) : e.map(I).join(", ");
		}
		case "tags": return (Array.isArray(r) ? r : []).map((e) => h.get?.(e)?.name ?? e).join(", ") || x("value.noTags");
		case "places": return x("value.places", { n: Array.isArray(r) ? r.length : 0 });
		case "secret": return "••••";
		default: return e === "lilos.launch" && t === "app" ? N(r) : e === "lilos.open" && t === "app" ? r ? N(r) : x("value.defaultApp") : e === "lilos.close" && t === "app" ? N(r) : e === "lilos.workspace" ? v.describeWorkspace?.(r)?.name ?? String(r) : typeof r == "string" ? r : JSON.stringify(r).slice(0, 60);
	}
}
function z(e) {
	let t = A(e);
	if (!t) return Object.entries(e.params ?? {}).slice(0, 4).map(([e, t]) => ({
		label: e,
		text: JSON.stringify(t).slice(0, 40),
		kind: "plain"
	}));
	let n = [];
	for (let [r, i] of Object.entries(t.params)) {
		if (!(r in e.params) && e.fields?.[r]?.mode !== "ask" && i.type !== "secret" || e.action === "lilos.launch" && r === "entry" && e.params.entry === "main") continue;
		let t = e.fields?.[r]?.mode ?? "use", a = t === "template" ? e.fields[r].template : R(e.action, r, i, e.params[r]), o = t === "ask" ? "ask" : t === "template" ? "template" : O.includes(i.type) ? L(Array.isArray(e.params[r]) ? e.params[r][0] : e.params[r]) : e.changed?.includes(r) ? "changed" : "plain";
		n.push({
			label: M(e.action, r, i),
			text: a,
			kind: o
		});
	}
	return e.file && n.unshift({
		label: x("field.file"),
		text: I(e.file),
		kind: L(e.file)
	}), n;
}
function B(e, t) {
	let n = [], r = (e) => {
		Array.isArray(e) ? e.forEach(r) : e && typeof e == "object" && (Number.isInteger(e.step) ? n.push(e.step) : e.ref && r(e.ref));
	};
	return r(Object.values(e.params ?? {})), r(e.file), n.some((e) => e < 0 || e >= t);
}
function V(e) {
	let t = r.describe(e.action), n = (e) => e && a.exists(e) ? a.get(e).name : a.trashed().find((t) => t.id === e)?.name ?? x("value.gone"), i = [];
	for (let [r, a] of Object.entries(t?.params ?? {})) {
		let t = e.params?.[r];
		if (t === void 0 || e.action === "lilos.launch" && r === "entry") continue;
		if (e.defaults && r in e.defaults && e.changed?.includes(r) && typeof t == "string" && a.type === "text") {
			i.push({
				text: `${e.defaults[r]} → ${t}`,
				changed: !0
			});
			continue;
		}
		if (a.subject && e.action === "lilos.rename") continue;
		let o;
		o = a.type === "file" || a.type === "folder" ? n(t) : a.type === "files" ? t.length > 2 ? x("value.items", { n: t.length }) : t.map(n).join(", ") : R(e.action, r, a, t), i.push({
			text: o,
			changed: e.changed?.includes(r)
		});
	}
	return e.file && i.unshift({
		text: n(e.file),
		changed: !1
	}), i;
}
// src/automata/plans.js
var H = "scheduler", U = ["time", "every"], W = /^([01]\d|2[0-3]):[0-5]\d$/, G = (e) => !!e && typeof e == "object" && !Array.isArray(e), K = () => !!d?.available && v.isInstalled?.(H) !== !1;
async function q(e) {
	return !e || !K() ? [] : (await d.list()).filter((t) => t.what?.type === "automation" && t.what.file === e);
}
function ne(e, t) {
	v.launch(H, {
		what: {
			type: "automation",
			file: e,
			label: a.tildePath(e) ?? ""
		},
		name: t
	}, "create");
}
function re(e) {
	v.launch(H, { id: e }, "edit");
}
function ie(e, t = Date.now()) {
	let n = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC", r = d.rules.localText(t, n);
	if (e?.type === "every") return Number.isInteger(e.minutes) && e.minutes >= 5 && e.minutes <= 1440 ? {
		every: {
			n: e.minutes,
			unit: "minute"
		},
		start: r,
		tz: n
	} : null;
	if (e?.type !== "time" || typeof e.at != "string" || !W.test(e.at)) return null;
	let i = [...new Set((Array.isArray(e.days) ? e.days : []).filter((e) => Number.isInteger(e) && e >= 1 && e <= 7))].sort();
	return i.length && i.length < 7 ? {
		every: {
			n: 1,
			unit: "week"
		},
		days: i,
		times: [e.at],
		start: r,
		tz: n
	} : {
		every: {
			n: 1,
			unit: "day"
		},
		times: [e.at],
		start: r,
		tz: n
	};
}
var J = (e, t) => e?.every?.n === t?.every?.n && e?.every?.unit === t?.every?.unit && String(e.days ?? "") === String(t.days ?? "") && String(e.times ?? "") === String(t.times ?? ""), Y = /* @__PURE__ */ new Set();
async function X(e = C()?.list() ?? []) {
	if (!K()) return 0;
	let t = e.filter((e) => e.launch?.triggers?.some((e) => U.includes(e.type)) && !Y.has(e.id));
	if (!t.length) return 0;
	let n = async () => {
		let e = 0;
		for (let n of t) e += await oe(n.id).catch(() => 0);
		return e;
	};
	return navigator.locks?.request ? navigator.locks.request("lilos:automata-triggers", n) : n();
}
async function ae({ lilos: e } = {}) {
	e?.handle?.(() => X()), await C()?.ready(), await X().catch((e) => console.warn("[automata] triggers:", e.message));
}
async function oe(e) {
	let t = JSON.parse(await a.read(e)), n = Array.isArray(t?.launch?.triggers) ? t.launch.triggers : [], r = n.filter((e) => U.includes(e?.type));
	if (!G(t.launch) || !r.length) return 0;
	let i = typeof t.name == "string" && t.name.trim() ? t.name.trim().slice(0, 120) : a.get(e)?.name ?? "", o = await q(e), s = n.filter((e) => !U.includes(e?.type)), c = 0;
	for (let t of r) {
		let n = ie(t);
		if (n && !o.some((e) => J(e.when, n))) try {
			await d.create({
				name: i,
				enabled: !0,
				when: n,
				what: {
					type: "automation",
					file: e,
					label: a.tildePath(e) ?? ""
				},
				options: {
					missed: t.type === "every" || t.catchUp === !0 ? "once" : "skip",
					overlap: "skip",
					ask: !1,
					notify: "error"
				}
			}), o.push({ when: n }), c++;
		} catch (n) {
			s.push(t), Y.has(e) || D(x("plan.moveFailed", {
				name: i,
				error: n.message
			}), "error"), Y.add(e);
		}
	}
	return t.launch.triggers = s, await T(e, t), c && D(x("plan.moved", {
		name: i,
		n: c
	}), "success"), c;
}
// src/automata/editor.js
var se = 400, ce = [
	"file",
	"files",
	"folder"
], le = (e) => !!e && typeof e == "object" && !Array.isArray(e), ue = {
	login: "user",
	folder: "folderOpen"
}, de = (e) => e.type === "login" ? x("trigger.chipLogin") : x("trigger.chipFolder", { path: I(e.folder) });
function fe(e) {
	try {
		return d.describe(e.when);
	} catch {
		return e.name;
	}
}
function pe({ args: e, openWindow: n } = {}) {
	let l = new t({
		title: "Automata",
		icon: "automation",
		width: 1060,
		height: 620,
		minWidth: 760,
		minHeight: 440
	}), h = null, y = null, E = 0, O = null, k = "", P = [], F = o("nav", {
		class: "au-side",
		"aria-label": x("side.label")
	}), L = o("div", { class: "au-main" }), V = o("aside", {
		class: "au-detail",
		"aria-label": x("detail.label")
	}), H = o("div", { class: "au" }, F, L, V);
	if (l.body.append(H), !S()) return H.replaceChildren(o("p", { class: "au-empty" }, x("needsNewer"))), l;
	let W = (e = "all") => {
		clearTimeout(O);
		let t = h, n = structuredClone(y);
		O = setTimeout(() => T(t, n).catch((e) => D(x("error.save", { error: e.message }), "error")), se), e === "all" ? De() : e === "steps" ? (Y(), Q()) : e === "detail" && Q();
	};
	l.on("destroy", () => {
		O && y && (clearTimeout(O), T(h, y).catch(() => {}));
	});
	async function G(e) {
		if (O && y && (clearTimeout(O), await T(h, y).catch(() => {}), O = null), h = e, y = null, k = "", E = 0, P = [], e) {
			await X(C().list().filter((t) => t.id === e)).catch(() => {});
			try {
				y = await w(e);
			} catch (e) {
				k = x("error.open", { error: e.message });
			}
		}
		l.setTitle(y ? `Automata — ${y.name}` : "Automata"), De(), ie();
	}
	async function ie() {
		let e = h, t = await q(e).catch(() => []);
		e === h && (P = t, y && Y(), l.emit("plans"));
	}
	function J() {
		let e = C().list();
		F.replaceChildren(o("button", {
			class: "ctl-btn rec",
			type: "button",
			onclick: () => v.launch("automata", {}, "recorder")
		}, s("record"), x("side.record")), o("h6", {}, x("side.title")), o("div", {
			class: "au-list",
			role: "listbox",
			"aria-label": x("side.title")
		}, e.map((e) => o("button", {
			class: "au-item",
			type: "button",
			role: "option",
			"aria-selected": String(e.id === h),
			onclick: () => G(e.id)
		}, s(e.input === "none" ? "automation" : e.input === "folder" ? "folder" : "file"), o("span", { class: "au-two" }, o("span", {}, e.name), o("small", {}, [x("side.steps", { n: e.steps }), e.launch.shortcut ? ` · ${m.format(e.launch.shortcut)}` : ""].join("")))))), ...e.length ? [] : [o("p", { class: "au-hint" }, x("side.none"))], o("span", { class: "au-grow" }), o("p", { class: "au-hint" }, x("side.where", { folder: S().FOLDER })));
	}
	function Y() {
		if (k) return L.replaceChildren(o("div", {
			class: "au-empty",
			role: "alert"
		}, k));
		if (!y) return L.replaceChildren(o("div", { class: "au-welcome" }, s("automation"), o("h2", {}, x("welcome.title")), o("p", {}, x("welcome.text")), o("button", {
			class: "ctl-btn primary",
			type: "button",
			onclick: () => v.launch("automata", {}, "recorder")
		}, s("record"), x("side.record"))));
		let e = o("input", {
			class: "au-name",
			value: y.name,
			"aria-label": x("head.name"),
			maxlength: 80,
			spellcheck: "false"
		});
		e.addEventListener("change", () => {
			y.name = e.value.trim() || y.name, l.setTitle(`Automata — ${y.name}`), W("none"), J();
		}), e.addEventListener("keydown", (t) => {
			t.key === "Enter" && e.blur();
		});
		let t = o("input", {
			class: "au-desc",
			value: y.description,
			placeholder: x("head.descPlaceholder"),
			"aria-label": x("head.desc"),
			maxlength: 500
		});
		t.addEventListener("change", () => {
			y.description = t.value, W("none");
		}), t.addEventListener("keydown", (e) => {
			e.key === "Enter" && t.blur();
		});
		let n = o("button", {
			class: "au-icon",
			type: "button",
			title: x("head.more"),
			"aria-label": x("head.more"),
			"aria-haspopup": "menu"
		}, s("list"));
		n.addEventListener("click", () => {
			let e = n.getBoundingClientRect();
			u(e.left, e.bottom, [
				{
					label: x("menu.launch"),
					icon: "play",
					action: Se
				},
				{
					label: x("menu.show"),
					icon: "folderOpen",
					action: () => v.launch("files", { folder: a.get(h)?.parent })
				},
				"-",
				{
					label: x("menu.delete"),
					icon: "trash",
					danger: !0,
					action: Ee
				}
			]);
		}), L.replaceChildren(o("header", { class: "au-head" }, o("div", { class: "au-l1" }, e, o("button", {
			class: "ctl-btn",
			type: "button",
			onclick: () => v.launch("automata", { append: h }, "recorder")
		}, s("record"), x("head.recordMore")), o("button", {
			class: "ctl-btn primary",
			type: "button",
			onclick: () => Te()
		}, s("play"), x("head.run")), n), t, o("div", { class: "au-chips" }, ae())), o("div", {
			class: "au-steps-h",
			"aria-hidden": "true"
		}, o("span", { title: x("col.on") }, s("check")), o("span", { title: x("col.confirm") }, s("help")), o("span", { title: x("col.ask") }, s("pencil")), o("span"), o("span", {}, x("col.step"))), pe(), o("footer", { class: "au-foot" }, o("button", {
			class: "ctl-btn",
			type: "button",
			disabled: !y.steps.length,
			onclick: () => Te({ from: E })
		}, s("play"), x("foot.fromHere")), o("button", {
			class: "ctl-btn",
			type: "button",
			disabled: !y.steps.length,
			onclick: () => Te({
				from: E,
				only: !0
			})
		}, s("arrowRight"), x("foot.only")), o("button", {
			class: "ctl-btn",
			type: "button",
			onclick: Se
		}, s("gear"), x("foot.launch")), o("span", { class: "au-grow" }), o("span", { class: "au-hint" }, x("foot.hint"))));
	}
	function ae() {
		let e = [], t = {
			none: x("input.none"),
			files: x("input.files"),
			folder: x("input.folder")
		}[y.input];
		e.push(o("span", { class: "au-chip in" }, s(y.input === "none" ? "automation" : "file"), x("chip.input", { what: t }))), y.launch.shortcut && e.push(o("span", { class: "au-chip" }, s("keyboard"), o("kbd", {}, m.format(y.launch.shortcut)))), y.launch.menu && e.push(o("span", { class: "au-chip" }, s("list"), y.launch.ext.length ? x("chip.menuExt", { ext: y.launch.ext.join(", ") }) : x("chip.menu"))), y.launch.command && e.push(o("span", { class: "au-chip" }, s("terminal"), `automata run ${y.launch.command}`));
		for (let t of y.launch.triggers ?? []) ue[t.type] && e.push(o("span", { class: "au-chip auto" }, s(ue[t.type]), de(t)));
		for (let t of P) e.push(o("button", {
			class: `au-chip auto${t.enabled ? "" : " off"}`,
			type: "button",
			title: x("plan.edit"),
			onclick: () => re(t.id)
		}, s("clock"), fe(t)));
		return e;
	}
	function oe(e) {
		let t = A(e);
		return t ? Object.entries(t.params).filter(([, e]) => r.askable.includes(e.type)).map(([e]) => e) : [];
	}
	function pe() {
		let e = o("div", {
			class: "au-steps",
			role: "listbox",
			tabindex: "0",
			"aria-label": x("col.step"),
			"aria-activedescendant": `au-step-${E}`
		});
		return y.steps.length || e.append(o("p", { class: "au-hint pad" }, x("steps.none"))), y.steps.forEach((t, n) => {
			let r = A(t), i = Object.values(t.fields ?? {}).some((e) => e.mode === "ask"), a = oe(t).length > 0, c = (e, t, n, r, i, a = !0) => {
				let c = o("button", {
					class: `au-tg ${e}${t ? " on" : ""}`,
					type: "button",
					title: n,
					"aria-label": n,
					"aria-pressed": String(t),
					tabindex: "-1",
					disabled: !a
				});
				return c.append(s(r)), c.addEventListener("click", (e) => {
					e.stopPropagation(), i();
				}), c;
			}, l = o("input", {
				type: "checkbox",
				checked: t.enabled,
				tabindex: "-1",
				"aria-label": x("col.on")
			});
			l.addEventListener("click", (e) => e.stopPropagation()), l.addEventListener("change", () => {
				t.enabled = l.checked, W("steps");
			});
			let u = B(t, n), d = o("div", {
				class: `au-step${n === E ? " sel" : ""}${t.enabled ? "" : " off"}`,
				id: `au-step-${n}`,
				role: "option",
				"aria-selected": String(n === E),
				onclick: () => {
					E = n, Y(), Q();
				}
			}, o("span", { class: "c" }, l), o("span", { class: "c" }, c("cf", t.confirm, x("col.confirm"), "help", () => {
				t.confirm = !t.confirm, W("steps");
			})), o("span", { class: "c" }, c("ak", i, x(a ? "col.ask" : "col.askNone"), "pencil", () => me(t), a)), o("span", { class: "c" }, he(t)), o("span", { class: "what" }, o("b", {}, r ? j(t.action) : x("steps.missing", { action: t.action }), o("em", {}, N(r?.app))), o("small", {}, z(t).map((e) => o("span", { class: "au-v-wrap" }, `${e.label} `, o("span", { class: `au-v ${e.kind}` }, e.text))), u ? o("span", { class: "au-warn" }, s("warning"), x("steps.broken")) : null)), o("span", { class: "n" }, String(n + 1)));
			e.append(d);
		}), e.addEventListener("keydown", (e) => {
			if (!y.steps.length) return;
			let t = y.steps[E];
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				let t = Math.max(0, Math.min(y.steps.length - 1, E + (e.key === "ArrowDown" ? 1 : -1)));
				if (e.altKey) return _e(E, t);
				E = t;
			} else if (e.key === " ") return e.preventDefault(), t.enabled = !t.enabled, W("steps"), Z();
			else if (e.key === "Delete") return e.preventDefault(), e.stopPropagation(), ve(E);
			else return;
			Y(), Q(), Z();
		}), e;
	}
	let Z = () => L.querySelector(".au-steps")?.focus();
	function me(e) {
		let t = oe(e);
		if (t.filter((t) => e.fields[t]?.mode === "ask").length) t.forEach((t) => {
			A(e).params[t].type !== "secret" && (e.fields[t] = {
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
		W("steps");
	}
	function he(e) {
		let t = A(e), n = o("span", {
			class: "au-badge",
			"aria-hidden": "true"
		}, s(te(t?.app, e.action)));
		return n.style.background = ee(t?.app), n;
	}
	function ge(e) {
		let t = (n) => Array.isArray(n) ? n.map(t) : le(n) ? Number.isInteger(n.step) ? {
			...n,
			step: e.has(n.step) ? e.get(n.step) : -1
		} : n.ref ? {
			...n,
			ref: t(n.ref)
		} : n : n;
		for (let e of y.steps) {
			for (let n of Object.keys(e.params)) e.params[n] = t(e.params[n]);
			e.file &&= t(e.file);
		}
	}
	function _e(e, t) {
		if (e === t) return;
		let n = y.steps.map((e, t) => t);
		n.splice(t, 0, n.splice(e, 1)[0]), y.steps = n.map((e) => y.steps[e]), ge(new Map(n.map((e, t) => [e, t]))), E = t, W("steps"), Z();
	}
	async function ve(e) {
		if (await c(l, {
			icon: "warning",
			text: x("steps.removeAsk", { step: j(y.steps[e].action) }),
			buttons: ["continue", "cancel"]
		}) !== "continue") return Z();
		let t = new Map(y.steps.map((t, n) => [n, n < e ? n : n - 1]).filter(([t]) => t !== e));
		y.steps.splice(e, 1), ge(t), E = Math.min(E, y.steps.length - 1), W("steps"), Z();
	}
	function Q() {
		let e = y?.steps[E];
		if (!e) return V.replaceChildren(o("p", { class: "au-hint pad" }, y ? x("detail.none") : ""));
		let t = A(e), n = (e, t, n, r) => o("div", { class: "au-sw-row" }, _({
			value: e,
			label: t,
			onChange: r
		}), o("div", {}, o("b", {}, t), o("small", {}, n))), r = [
			o("div", { class: "au-dh" }, he(e), o("div", {}, o("b", {}, t ? j(e.action) : e.action), o("small", {}, x("detail.from", {
				n: E + 1,
				app: N(t?.app)
			})))),
			n(e.enabled, x("detail.on"), x("detail.onHint"), (t) => {
				e.enabled = t, W("steps");
			}),
			n(e.confirm, x("detail.confirm"), x("detail.confirmHint"), (t) => {
				e.confirm = t, W("steps");
			})
		];
		if (t) {
			let n = Object.keys(t.params).filter((n) => n in e.params || t.params[n].type === "secret" || e.fields[n]?.mode === "ask"), i = n.filter((t) => e.changed.includes(t)), a = n.filter((t) => !e.changed.includes(t));
			e.file && r.push(o("div", { class: "au-sec" }, x("field.file")), ye(e, null, t)), i.length && r.push(o("div", { class: "au-sec" }, s("pencil"), x("detail.changed")), ...i.map((n) => $(e, n, t))), a.length && r.push(o("div", { class: "au-sec" }, i.length ? x("detail.others") : x("detail.fields")), ...a.map((n) => $(e, n, t)));
		}
		let i = p({
			value: e.onError,
			label: x("detail.onError"),
			options: [
				"stop",
				"skip",
				"ask"
			].map((e) => ({
				value: e,
				label: x(`onError.${e}`)
			})),
			onChange: (t) => {
				e.onError = t, W("none");
			}
		});
		r.push(o("div", { class: "au-sec" }, x("detail.onError")), i), V.replaceChildren(o("div", { class: "au-db" }, r));
	}
	function $(e, t, n) {
		let i = n.params[t], c = e.fields[t] ?? { mode: "use" }, l = M(e.action, t, i);
		if (ce.includes(i.type)) return ye(e, t, n);
		let u = e.params[t], d = e.defaults && t in e.defaults && e.changed.includes(t) ? R(e.action, t, i, e.defaults[t]) : null, p = o("div", { class: `au-fld${c.mode === "ask" ? " asking" : ""}` }, o("div", { class: "top" }, o("b", {}, l), o("span", { class: "was" }, i.type === "secret" ? x("field.secret") : [x("field.recorded", { value: R(e.action, t, i, u) }), d ? ` · ${x("field.was", { value: d })}` : ""].join(""))));
		if (!r.askable.includes(i.type)) return p;
		let m = i.type === "secret" ? ["ask"] : i.type === "text" ? [
			"use",
			"template",
			"ask"
		] : ["use", "ask"];
		if (p.append(f({
			value: c.mode,
			label: l,
			className: "wide",
			options: m.map((n) => ({
				value: n,
				class: n === "ask" ? "ask" : "",
				label: n === "use" ? x("mode.use", { value: xe(R(e.action, t, i, u)) }) : x(`mode.${n}`)
			})),
			onChange: (n) => {
				e.fields[t] = {
					...c,
					mode: n,
					...n === "template" && !c.template && { template: "{nome}.{est}" }
				}, W("steps");
			}
		})), c.mode === "ask") {
			let n = g({
				value: c.question ?? "",
				placeholder: l,
				maxLength: 200,
				label: x("field.question"),
				onChange: (n) => {
					e.fields[t] = {
						...e.fields[t],
						question: n.trim()
					}, W("steps");
				}
			});
			p.append(o("label", { class: "au-q" }, o("span", {}, x("field.question")), n));
		}
		if (c.mode === "template") {
			let r = g({
				value: c.template ?? "",
				maxLength: 255,
				mono: !0,
				label: x("field.template"),
				onChange: (n) => {
					e.fields[t] = {
						...e.fields[t],
						template: n
					}, W("steps");
				}
			}), i = [
				"{nome}",
				"{est}",
				"{data}",
				"{ora}",
				"{n}",
				"{cartella}"
			].map((e) => o("button", {
				class: "au-tok",
				type: "button",
				title: x(`token.${e.slice(1, -1)}`),
				onclick: () => {
					r.value += e, r.dispatchEvent(new Event("change"));
				}
			}, e)), l = a.get(be(e, n)), u = l ? S().fillTemplate(c.template ?? "", {
				node: l,
				n: 1
			}) : "";
			p.append(o("label", { class: "au-q" }, o("span", {}, x("field.template")), r), o("div", { class: "au-tokens" }, i), u ? o("div", { class: "au-preview" }, s("check"), `${l.name} → ${u}`) : null);
		}
		return p;
	}
	function ye(e, t, n) {
		let i = t ? n.params[t] : { type: "file" }, a = t ? e.params[t] : e.file, s = t ? e.fields[t] ?? { mode: "use" } : { mode: "use" }, c = t ? M(e.action, t, i) : x("field.file"), l = Array.isArray(a) ? a[0] : a, u = [], d = l && !l.input && !Number.isInteger(l.step) ? l : null;
		d ? u.push({
			key: "fixed",
			label: x("source.fixed", { path: I(d) }),
			value: d
		}) : e.recordedFixed?.[t ?? "_file"] && u.push({
			key: "fixed",
			label: x("source.fixed", { path: I(e.recordedFixed[t ?? "_file"]) }),
			value: e.recordedFixed[t ?? "_file"]
		}), y.input !== "none" && u.push({
			key: "input",
			label: x("source.input"),
			value: { input: !0 }
		}), y.input === "files" && i.type === "folder" && u.push({
			key: "inputFolder",
			label: x("source.inputFolder"),
			value: {
				input: !0,
				parent: !0
			}
		}), y.steps.slice(0, E).forEach((e, t) => {
			(A(e)?.result === "file" || [
				"lilos.move",
				"lilos.rename",
				"lilos.open"
			].includes(e.action)) && u.push({
				key: `step${t}`,
				label: x("source.step", {
					n: t + 1,
					step: j(e.action)
				}),
				value: { step: t }
			});
		});
		let m = (e) => e ? e.input ? e.parent ? "inputFolder" : "input" : Number.isInteger(e.step) ? `step${e.step}` : "fixed" : "", h = o("div", { class: `au-fld${s.mode === "ask" ? " asking" : ""}` }, o("div", { class: "top" }, o("b", {}, c)));
		return Array.isArray(a) && a.length > 1 ? h.append(o("div", { class: "au-hint" }, R(e.action, t, i, a))) : h.append(p({
			value: m(l),
			label: c,
			options: u.map((e) => ({
				value: e.key,
				label: e.label
			})),
			onChange: (n) => {
				let r = u.find((e) => e.key === n);
				d && (e.recordedFixed = {
					...e.recordedFixed,
					[t ?? "_file"]: d
				});
				let a = i.type === "files" ? [r.value] : r.value;
				t ? e.params[t] = a : e.file = a, W("steps");
			}
		})), t && r.askable.includes(i.type) && h.append(f({
			value: s.mode,
			label: c,
			className: "wide",
			options: [{
				value: "use",
				label: x("mode.useRef")
			}, {
				value: "ask",
				label: x("mode.ask"),
				class: "ask"
			}],
			onChange: (n) => {
				e.fields[t] = {
					...s,
					mode: n
				}, W("steps");
			}
		})), h;
	}
	let be = (e, t) => {
		let n = Object.entries(t.params).find(([, e]) => e.subject)?.[0], r = n ? e.params[n] : e.file, i = Array.isArray(r) ? r[0] : r;
		return i?.id && a.exists(i.id) ? i.id : i?.path ? a.resolve(i.path)?.id ?? null : null;
	}, xe = (e) => e.length > 18 ? `${e.slice(0, 17)}…` : e;
	function Se() {
		if (!y) return;
		let e = structuredClone({
			input: y.input,
			launch: {
				...y.launch,
				triggers: y.launch.triggers ?? []
			}
		}), t = e.launch.triggers.filter((e) => U.includes(e.type)), n = e.launch.menu && e.input !== "none", r = o("div"), a = () => {
			let t = i({
				value: n,
				disabled: e.input === "none",
				label: [o("b", {}, x("launch.menu")), o("small", {}, x("launch.menuHint"))],
				onChange: (e) => {
					n = e;
				}
			});
			t.classList.add("au-check"), r.replaceChildren(t);
		}, u = f({
			value: e.input,
			label: x("launch.input"),
			className: "wide",
			options: [
				"none",
				"files",
				"folder"
			].map((e) => ({
				value: e,
				label: x(`input.${e}`)
			})),
			onChange: (t) => {
				e.input = t, t === "none" && (n = !1), a(), S();
			}
		}), d = g({
			value: e.launch.ext.join(", "),
			placeholder: "jpg, png",
			label: x("launch.ext")
		}), p = g({
			value: e.launch.command,
			placeholder: "web",
			maxLength: 40,
			mono: !0,
			label: x("launch.command")
		}), m = Ce(e.launch.shortcut), _ = we(e.launch.triggers.filter((e) => !U.includes(e.type))), v = o("div", { class: "au-plans" });
		function S() {
			if (!K()) return v.replaceChildren(o("p", { class: "au-hint" }, x("plan.unavailable")));
			let t = e.input === "none" && y.input === "none";
			v.replaceChildren(...P.map((e) => o("div", { class: `au-plan${e.enabled ? "" : " off"}` }, s("clock"), o("span", { class: "au-two" }, o("span", {}, fe(e)), o("small", {}, e.enabled ? e.next ? x("plan.next", { when: b.date(e.next, {
				weekday: "short",
				day: "numeric",
				month: "short",
				hour: "2-digit",
				minute: "2-digit"
			}) }) : x("plan.done") : x("plan.paused"))), o("button", {
				class: "au-icon",
				type: "button",
				title: x("plan.edit"),
				"aria-label": x("plan.editOf", { what: fe(e) }),
				onclick: () => re(e.id)
			}, s("pencil")))), o("div", { class: "au-l1 wrap" }, o("button", {
				class: "ctl-btn",
				type: "button",
				disabled: !t,
				onclick: () => ne(h, y.name)
			}, s("clock"), x("plan.new")), t ? null : o("small", { class: "au-hint" }, x("plan.needsNone"))));
		}
		a(), S();
		let w = l.on("plans", S), T = o("div", { class: "au-launch" }, o("div", { class: "au-opt" }, o("div", { class: "au-sec" }, x("launch.input")), u, o("p", { class: "au-hint" }, x("launch.inputHint"))), r, o("label", { class: "au-q" }, o("span", {}, x("launch.ext")), d), o("div", { class: "au-q" }, o("span", {}, x("launch.shortcut")), m.el, o("small", { class: "au-hint" }, x("launch.shortcutHint"))), o("label", { class: "au-q" }, o("span", {}, x("launch.command")), p, o("small", { class: "au-hint" }, x("launch.commandHint"))), o("div", { class: "au-opt" }, o("div", { class: "au-sec" }, x("plan.title")), v, o("p", { class: "au-hint" }, x("plan.hint"))), o("div", { class: "au-opt" }, o("div", { class: "au-sec" }, x("trigger.title")), _.el, o("p", { class: "au-hint" }, x("trigger.hint")))), E = null;
		c(l, {
			title: x("launch.title", { name: y.name }),
			content: T,
			width: 500,
			buttons: ["cancel", {
				value: "save",
				label: x("action.save"),
				primary: !0
			}],
			validate: () => {
				let r = d.value.split(/[\s,;]+/).map((e) => e.replace(/^\./, "").toLowerCase()).filter(Boolean);
				if (r.some((e) => !/^[a-z0-9]{1,10}$/.test(e))) return x("launch.badExt");
				let i = p.value.trim().toLowerCase();
				if (i && !/^[a-z][\w.-]{0,39}$/.test(i)) return x("launch.badCommand");
				let a = C().list().find((e) => e.id !== h && i && e.launch.command === i);
				if (a) return x("launch.commandTaken", { name: a.name });
				let o = _.value();
				return o.some((e) => e.type === "folder" && !e.folder) ? x("trigger.noFolder") : [...t, ...o].some((e) => e.type !== "folder") && e.input !== "none" ? x("trigger.needsNone") : (E = {
					input: e.input,
					launch: {
						menu: n && e.input !== "none",
						ext: r,
						shortcut: m.value(),
						command: i,
						triggers: [...t, ...o]
					}
				}, !0);
			}
		}).then((e) => {
			m.stop(), w(), e === "save" && E && y && (y.input = E.input, y.launch = E.launch, W()), Z();
		});
	}
	function Ce(e) {
		let t = e, n = null, r = o("button", {
			class: "ctl-btn au-key",
			type: "button"
		}), i = (e) => {
			r.textContent = e ?? (t ? m.format(t) : x("launch.noKey"));
		}, a = (e) => {
			e.target !== r && s();
		};
		function s() {
			n?.(), n = null, r.classList.remove("listening"), removeEventListener("pointerdown", a, !0), i();
		}
		return r.addEventListener("click", () => {
			n ||= (r.classList.add("listening"), i(x("launch.press")), addEventListener("pointerdown", a, !0), m.record({
				onPreview: (e) => i(e ? `${e} …` : x("launch.press")),
				onCancel: s,
				onCombo: (e) => {
					if (!r.isConnected) return s();
					if (e === "Backspace" || e === "Delete") return t = "", s();
					if (!/^(Ctrl|Alt)\+/.test(e)) return i(x("launch.press"));
					let n = m.owner(e, `automation.${h}`), a = m.validate(e, `automation.${h}`) || (n ? x("launch.keyTaken", { name: n.label }) : "");
					if (a) return i(a);
					t = e, s();
				}
			}));
		}), i(), {
			el: r,
			value: () => t,
			stop: s
		};
	}
	function we(e) {
		let t = e.map((e) => ({ ...e })), r = o("div", { class: "au-triggers" }), i = () => {
			r.replaceChildren(...t.map((e, r) => {
				let c = o("button", {
					class: "au-icon",
					type: "button",
					title: x("trigger.remove"),
					"aria-label": x("trigger.remove"),
					onclick: () => {
						t.splice(r, 1), i();
					}
				}, s("x")), l;
				if (e.type === "login") l = [o("div", { class: "au-l1" }, s("user"), o("b", {}, x("trigger.login")))];
				else {
					let t = o("code", { class: "au-where" }, e.folder ? I(e.folder) : x("trigger.noFolderYet")), r = o("button", {
						class: "ctl-btn",
						type: "button"
					}, x("trigger.chooseFolder"));
					r.addEventListener("click", async () => {
						let r = await v.pickFile?.(n, {
							kind: "folder",
							title: x("trigger.chooseFolder")
						});
						r && (e.folder = {
							id: r.id,
							path: a.path(r.id)
						}, t.textContent = I(e.folder));
					}), l = [o("div", { class: "au-l1" }, s("folderOpen"), o("b", {}, x("trigger.folder")), t, r), o("small", { class: "au-hint" }, x("trigger.folderHint"))];
				}
				return o("div", { class: "au-trigger" }, o("div", { class: "au-tbody" }, l), c);
			}), o("div", { class: "au-l1 wrap" }, ["login", "folder"].map((e) => o("button", {
				class: "ctl-btn",
				type: "button",
				disabled: t.length >= 10,
				onclick: () => {
					t.push({ type: e }), i();
				}
			}, s("plus"), x(`trigger.add.${e}`)))));
		};
		return i(), {
			el: r,
			value: () => t.map((e) => e.type === "login" ? { type: "login" } : {
				type: "folder",
				folder: e.folder ?? null
			})
		};
	}
	async function Te({ from: e = 0, only: t = !1 } = {}) {
		y && (O && (clearTimeout(O), O = null, await T(h, y).catch(() => {})), v.launch("automata", {
			automation: h,
			from: e,
			only: t
		}, "run"));
	}
	async function Ee() {
		await c(l, {
			icon: "warning",
			text: x("menu.deleteAsk", { name: y.name }),
			buttons: ["continue", "cancel"]
		}) === "continue" && (clearTimeout(O), O = null, a.trash([h]), y = null, h = null, De());
	}
	function De() {
		J(), Y(), Q();
	}
	C().on("change", J);
	let Oe = r.on("actions", () => {
		y && Y();
	}), ke = K() ? d.on("change", () => {
		h && ie();
	}) : () => {};
	return l.on("destroy", () => {
		C().off("change", J), Oe(), ke();
	}), l.on("launch", (e) => {
		e?.file && G(e.file);
	}), l.getState = () => h ? { file: h } : {}, C().ready().then(() => X().catch(() => {})).then(() => G(e?.file && a.exists(e.file) ? e.file : C().list()[0]?.id ?? null)), l;
}
// src/automata/recorder.js
var Z = null;
function me({ args: e } = {}) {
	let n = new t({
		title: x("rec.title"),
		icon: "record",
		width: 300,
		height: 380,
		minWidth: 260,
		minHeight: 220,
		maximizable: !1,
		focusable: !1,
		onTop: !0
	}), i = S();
	if (!i) return n.body.append(o("p", { class: "au-empty" }, x("needsNewer"))), n;
	let l = (e) => {
		r.recording || e?.restored || (Z = typeof e?.append == "string" && a.exists(e.append) ? e.append : null, i.startRecording({ items: Array.isArray(e?.items) ? e.items : [] }));
	};
	if (l(e), n.on("launch", l), n.getState = () => ({ restored: !0 }), e?.restored && !r.recording) return setTimeout(() => n.emit("close"), 0), n;
	let u = Date.now(), d = o("span", { class: "rc-time" }, "00:00"), f = o("div", { class: "rc-head" }, o("span", { class: "rc-dot" }), o("b", {}, x("rec.recording")), d), p = o("div", {
		class: "rc-list",
		role: "log",
		"aria-live": "polite",
		"aria-label": x("rec.steps")
	}), m = o("button", {
		class: "ctl-btn",
		type: "button"
	}), h = o("button", {
		class: "ctl-btn",
		type: "button"
	}, s("x"), x("rec.discard")), g = o("button", {
		class: "ctl-btn stop",
		type: "button"
	}, s("stop"), x("rec.finish")), _ = o("div", { class: "rc" }, f, p, o("div", { class: "rc-foot" }, m, h, g));
	n.body.append(_);
	let y = setInterval(() => {
		let e = Math.floor((Date.now() - u) / 1e3);
		d.textContent = `${String(Math.floor(e / 60)).padStart(2, "0")}:${String(e % 60).padStart(2, "0")}`;
	}, 1e3);
	function b() {
		let e = r.steps().filter((e) => e.retracted !== "merged");
		f.classList.toggle("paused", r.paused), f.querySelector("b").textContent = r.paused ? x("rec.paused") : x("rec.recording"), m.replaceChildren(s(r.paused ? "record" : "pause"), r.paused ? x("rec.resume") : x("rec.pause")), g.disabled = !e.some((e) => !e.retracted && !e.missed), e.length ? (p.replaceChildren(...e.map((t, n) => {
			if (t.missed) return o("div", { class: "rc-step undone" }, o("span", {
				class: "au-badge",
				style: "background:#3a3f48"
			}, s("x")), o("div", {}, o("span", {}, t.missed), o("small", {}, x("rec.missed", { app: N(t.app) }))));
			let i = r.describe(t.action), a = o("span", { class: "au-badge" }, s(te(i?.app, t.action)));
			return a.style.background = t.retracted ? "#3a3f48" : ee(i?.app), o("div", { class: `rc-step${t.retracted ? " undone" : ""}${n === e.length - 1 && !t.retracted ? " new" : ""}` }, a, o("div", {}, o("span", {}, j(t.action)), o("small", {}, t.retracted ? x("rec.undone") : V(t).map((e, t) => [t ? " · " : "", e.changed ? o("i", {}, e.text) : e.text]).flat())));
		})), p.scrollTop = p.scrollHeight) : p.replaceChildren(o("p", { class: "rc-empty" }, x(Z ? "rec.emptyAppend" : "rec.empty")));
	}
	let C = [
		"change",
		"step",
		"retract",
		"restore"
	].map((e) => r.on(e, b));
	return b(), m.addEventListener("click", () => i.pauseRecording(!r.paused)), h.addEventListener("click", async () => {
		let e = r.steps().filter((e) => !e.retracted && !e.missed).length;
		e && await c(n, {
			icon: "warning",
			text: x("rec.discardAsk", { n: e }),
			buttons: ["continue", "cancel"]
		}) !== "continue" || (i.discardRecording(), Z = null, n.emit("close"));
	}), g.addEventListener("click", async () => {
		g.disabled = !0;
		try {
			let e = await he();
			n.emit("close"), e && v.launch("automata", { file: e });
		} catch (e) {
			g.disabled = !1, D(x("error.save", { error: e.message }), "error");
		}
	}), n.canClose = async () => {
		if (!r.recording) return !0;
		let e = r.steps().filter((e) => !e.retracted && !e.missed).length;
		return e ? await c(n, {
			icon: "warning",
			text: x("rec.closeAsk", { n: e }),
			buttons: ["continue", "cancel"]
		}) === "continue" && (i.discardRecording(), !0) : (i.discardRecording(), !0);
	}, n.on("destroy", () => {
		clearInterval(y), C.forEach((e) => e());
	}), n;
}
async function he() {
	let e = S(), { steps: t, inputs: n } = e.stopRecording(), r = Z;
	if (Z = null, !t.length) return null;
	let i = e.fromRecording(t, {
		name: x("newNameAt", { date: (/* @__PURE__ */ new Date()).toLocaleDateString() }),
		inputs: n
	});
	if (!r) return E(i);
	let a = await w(r), o = a.steps.length, s = (e) => Array.isArray(e) ? e.map(s) : !e || typeof e != "object" ? e : Number.isInteger(e.step) ? {
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
	return a.input === "none" && i.input !== "none" && (a.input = i.input), a.steps.push(...i.steps), await T(r, a), r;
}
// src/shared/paramsForm.js
function ge(e, t, { t: r, label: i = e.label, onChange: c = null, pickFile: l = null, pathAs: u = "id", live: d = !1, locked: f = !1, empty: p = !0 } = {}) {
	let m = e.type ?? "text", h = e.required === !0, g = t ?? (m === "files" ? [] : null), v = (e, t) => c?.(e) === !1 ? (t(), !1) : (g = e, !0), y = d ? "input" : "change", b = x();
	if (f) for (let e of [b.el, ...b.el.querySelectorAll("input, select, button, textarea")]) "disabled" in e && (e.disabled = !0);
	return b;
	function x() {
		if (m === "boolean") {
			let e = _({
				value: g === !0,
				label: i,
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
		if (m === "choice") {
			let t = [...p ? [{
				value: "",
				label: "—"
			}] : [], ...(e.options ?? []).map((e) => ({
				...e,
				value: String(e.value)
			}))], n = o("select", {
				class: "ctl-select",
				"aria-label": i
			}, ...t.map((e) => o("option", {
				value: e.value,
				selected: e.value === (g == null ? "" : String(g)),
				disabled: !!e.disabled
			}, e.label))), a = (t) => t === "" ? null : (e.options ?? []).find((e) => String(e.value) === t)?.value ?? null;
			return n.addEventListener("change", () => v(a(n.value), () => {
				n.value = g == null ? "" : String(g);
			})), {
				el: n,
				get: () => a(n.value),
				check: () => h && a(n.value) == null ? r("shared.params.required") : ""
			};
		}
		if (m === "number") {
			let t = o("input", {
				class: "ctl-text sh-param-number",
				type: "number",
				min: e.min ?? null,
				max: e.max ?? null,
				"aria-label": i
			});
			return t.value = g ?? "", t.addEventListener(y, () => v(t.value === "" ? null : Number(t.value), () => {
				t.value = g ?? "";
			})), {
				el: t,
				get: () => t.value === "" ? null : Number(t.value),
				check: () => {
					if (t.value === "") return h ? r("shared.params.required") : "";
					let n = Number(t.value);
					return Number.isFinite(n) ? Number.isFinite(e.min) && n < e.min ? r("shared.params.tooSmall", { min: e.min }) : Number.isFinite(e.max) && n > e.max ? r("shared.params.tooBig", { max: e.max }) : "" : r("shared.params.badNumber");
				}
			};
		}
		if (m === "file" || m === "folder") return w();
		if (m === "files") return T();
		let t = m === "secret", n = o("input", {
			class: "ctl-text",
			type: t ? "password" : "text",
			spellcheck: "false",
			autocomplete: t ? "new-password" : "off",
			"aria-label": i,
			maxlength: e.maxLength ?? null,
			placeholder: t && g ? r("shared.params.secretKept") : null
		});
		return t || (n.value = g ?? ""), n.addEventListener(y, () => {
			(!t || n.value) && v(n.value || null, () => {
				n.value = t ? "" : g ?? "";
			});
		}), d || n.addEventListener("keydown", (e) => {
			e.key === "Enter" && n.blur();
		}), {
			el: n,
			get: () => t ? n.value || g : n.value || null,
			check: () => h && !(t ? n.value || g : n.value) ? r("shared.params.required") : ""
		};
	}
	function S(e) {
		return e ? u === "tilde" ? e : a.exists(e) ? a.tildePath(e) : r("shared.params.gone") : "";
	}
	function C(e) {
		return u === "tilde" ? a.tildePath(e.id) : e.id;
	}
	function w() {
		let t = m === "folder", a = u === "tilde", c = o("input", {
			class: "ctl-text",
			type: "text",
			spellcheck: "false",
			readonly: !a,
			"aria-label": i,
			placeholder: a ? "~/…" : r(t ? "shared.params.noFolder" : "shared.params.noFile")
		});
		c.value = S(g);
		let f = () => {
			c.value = S(g);
		};
		a && (c.addEventListener(y, () => v(c.value.trim() || null, f)), d || c.addEventListener("keydown", (e) => {
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
		}), _ = !a && !h && o("button", {
			class: "ctl-btn sh-param-clear",
			type: "button",
			title: r("shared.params.clear"),
			"aria-label": r("shared.params.clearOf", { name: e.label }),
			onclick: () => {
				v(null, f) && f();
			}
		}, s("x"));
		return {
			el: o("div", { class: "sh-param-path" }, c, p, _),
			get: () => a ? c.value.trim() || null : g,
			check: () => h && !(a ? c.value.trim() : g) ? r("shared.params.noneChosen") : ""
		};
	}
	function T() {
		g = (Array.isArray(g) ? g : g ? [g] : []).filter((e) => u === "tilde" || a.exists(e));
		let e = o("div", { class: "sh-param-list" }), t = (e) => {
			v(e, c) && c();
		};
		function c() {
			e.replaceChildren(...g.length ? g.map((e, n) => {
				let i = S(e);
				return o("div", { class: "sh-param-item" }, s(u === "id" && a.get(e)?.type === "folder" ? "folder" : "file"), o("code", {}, i), f ? null : o("button", {
					class: "ctl-btn sh-param-clear",
					type: "button",
					title: r("shared.params.remove"),
					"aria-label": r("shared.params.removeOf", { name: i }),
					onclick: () => t(g.filter((e, t) => t !== n))
				}, s("x")));
			}) : [o("span", { class: "sh-param-none" }, r("shared.params.none"))]);
		}
		c();
		let d = (e) => async () => {
			let n = await l({
				kind: e,
				title: i
			});
			if (!n) return;
			let r = C(n);
			g.includes(r) || t([...g, r]);
		};
		return {
			el: o("div", { class: "sh-param-files" }, e, l ? o("div", { class: "sh-param-add" }, n({
				label: r("shared.params.addFile"),
				onClick: d("file")
			}), n({
				label: r("shared.params.addFolder"),
				onClick: d("folder")
			})) : null),
			get: () => [...g],
			check: () => h && !g.length ? r("shared.params.noneChosen") : ""
		};
	}
}
// src/automata/run.js
function _e({ args: e, openWindow: n } = {}) {
	let c = new t({
		title: x("run.title"),
		icon: "automation",
		width: 460,
		height: 520,
		minWidth: 380,
		minHeight: 320,
		maximizable: !1
	}), u = S();
	if (!u) return c.body.append(o("p", { class: "au-empty" }, x("needsNewer"))), c;
	let d = !1, f = null, p = null, m = o("div", { class: "rn-top" }), h = o("div", {
		class: "rn-list",
		role: "list"
	}), g = o("div", {
		class: "rn-panel",
		hidden: !0
	}), _ = o("button", {
		class: "ctl-btn",
		type: "button"
	}), y = o("button", {
		class: "ctl-btn danger",
		type: "button"
	}, s("stop"), x("run.stop")), b = o("div", { class: "rn-foot" }, _, o("span", { class: "au-grow" }), y), C = o("div", { class: "rn" }, m, h, g, b);
	c.body.append(C), _.addEventListener("click", () => {
		f && (f.paused ? (p?.(), f.paused = null) : f.paused = new Promise((e) => {
			p = e;
		}), T());
	}), y.addEventListener("click", () => {
		if (!d) return c.emit("close");
		f.stopped = !0, p?.(), E?.("stop");
	});
	let T = () => _.replaceChildren(s(f?.paused ? "play" : "pause"), f?.paused ? x("run.resume") : x("run.pause")), E = null, D = (e, t) => new Promise((n) => {
		E = (e) => {
			E = null, g.hidden = !0, g.replaceChildren(), n(e);
		}, g.replaceChildren(...e, o("div", { class: "rn-actions" }, t)), g.hidden = !1, (g.querySelector("input, select, button.primary") ?? g.querySelector("button"))?.focus();
	}), O = (e, t, n) => o("div", { class: "rn-ask-head" }, o("span", { class: `rn-bub ${e}` }, s(e === "ak" ? "pencil" : "help")), o("div", {}, o("b", {}, t), o("small", {}, n))), k = (e) => e && a.exists(e) ? a.get(e).name : "", A = (e, t, r) => ge(e.type === "files" || e.type === "number" ? {
		...e,
		required: !0
	} : e, (e.type === "file" || e.type === "folder") && Array.isArray(t) ? t[0] : t, {
		t: x,
		label: r,
		empty: !1,
		pickFile: (e) => v.pickFile?.(n, e) ?? null
	}), N = {
		ask: ({ step: e, index: t, item: n, fields: r }) => {
			let a = r.map((e) => ({
				f: e,
				...A(e.param, e.value, e.question)
			})), s = !1, c = (f.items ?? 0) > 1, l = o("p", {
				class: "au-error",
				role: "alert"
			}), u = o("button", {
				class: "ctl-btn primary",
				type: "button"
			}, x("run.continue"));
			return u.addEventListener("click", () => {
				let e = a.map((e) => e.check()).find(Boolean);
				if (e) return void (l.textContent = e);
				E({
					values: Object.fromEntries(a.map((e) => [e.f.name, e.get()])),
					remember: s
				});
			}), g.onkeydown = (e) => {
				e.key === "Enter" && e.target.tagName === "INPUT" && e.target.type !== "checkbox" && u.click();
			}, D([
				O("ak", j(e.action), [x("run.stepOf", {
					n: t + 1,
					total: f.total
				}), k(n)].filter(Boolean).join(" · ")),
				...a.map((t) => o("div", { class: "au-q" }, o("span", {}, t.f.question), t.el, t.f.param.type !== "secret" && t.f.value != null ? o("small", { class: "au-hint" }, x("run.recorded", { value: R(e.action, t.f.name, t.f.param, t.f.value) })) : null)),
				c && !r.some((e) => e.param.type === "secret") ? i({
					value: !1,
					label: x("run.remember"),
					onChange: (e) => {
						s = e;
					}
				}) : null,
				l
			].filter(Boolean), [
				o("button", {
					class: "ctl-btn danger",
					type: "button",
					onclick: () => E("stop")
				}, x("run.stop")),
				o("span", { class: "au-grow" }),
				o("button", {
					class: "ctl-btn",
					type: "button",
					onclick: () => E("skip")
				}, x("run.skip")),
				u
			]);
		},
		confirm: ({ step: e, index: t, item: n, params: i, file: a }) => {
			let c = r.describe(e.action), l = Object.entries(c?.params ?? {}).filter(([e]) => i[e] !== void 0 && i[e] !== null && !(Array.isArray(i[e]) && !i[e].length)).map(([t, n]) => o("div", { class: "rn-line" }, o("span", {}, M(e.action, t, n)), o("code", {}, P(e.action, t, n, i[t]))));
			return a && l.unshift(o("div", { class: "rn-line" }, o("span", {}, x("field.file")), o("code", {}, F(a)))), D([O("cf", x("run.confirm", { step: j(e.action) }), [x("run.stepOf", {
				n: t + 1,
				total: f.total
			}), k(n)].filter(Boolean).join(" · ")), o("div", { class: "rn-preview" }, l)], [
				o("button", {
					class: "ctl-btn danger",
					type: "button",
					onclick: () => E("stop")
				}, x("run.stopAll")),
				o("span", { class: "au-grow" }),
				o("button", {
					class: "ctl-btn",
					type: "button",
					onclick: () => E("skip")
				}, x("run.skip")),
				o("button", {
					class: "ctl-btn primary",
					type: "button",
					onclick: () => E("run")
				}, s("play"), x("run.run"))
			]);
		},
		failed: ({ step: e, index: t, error: n }) => D([O("cf", x("run.failed", { step: j(e.action) }), x("run.stepOf", {
			n: t + 1,
			total: f.total
		})), o("p", { class: "au-error" }, n.message)], [
			o("button", {
				class: "ctl-btn danger",
				type: "button",
				onclick: () => E("stop")
			}, x("run.stop")),
			o("span", { class: "au-grow" }),
			o("button", {
				class: "ctl-btn",
				type: "button",
				onclick: () => E("skip")
			}, x("run.skip")),
			o("button", {
				class: "ctl-btn primary",
				type: "button",
				onclick: () => E("retry")
			}, x("run.retry"))
		]),
		progress: (e) => G(e)
	};
	function P(e, t, n, r) {
		let i = (e) => F(e) || (a.isTrashed(e) ? x("value.inTrash", { name: a.trashed().find((t) => t.id === e)?.name ?? "" }) : x("value.gone"));
		return n.type === "file" || n.type === "folder" ? i(r) : n.type === "files" ? r.length > 3 ? x("value.items", { n: r.length }) : r.map(i).join(", ") : n.type === "places" ? x("value.places", { n: r.length }) : R(e, t, n, r);
	}
	let I = null, L = [], z = null, B = null, V = null;
	function H(e) {
		z = o("i"), B = o("span", { class: "r" }), V = o("div", { class: "rn-item" }), m.replaceChildren(o("div", { class: "rn-l1" }, o("b", {}, e), B), o("div", { class: "rn-bar" }, z), V);
	}
	function U(e, t) {
		L = I.steps.map((n, i) => {
			let a = r.describe(n.action), c = o("span", { class: "au-badge" }, s(te(a?.app, n.action)));
			c.style.background = ee(a?.app);
			let l = o("span", { class: "st" }), u = o("span", { class: "mk todo" }, s("check")), d = o("div", {
				class: `rn-row${n.enabled && i >= e && i < t ? "" : " dim"}`,
				role: "listitem"
			}, u, c, o("span", { class: "nm" }, j(n.action)), l);
			return n.enabled || (l.textContent = x("run.off")), {
				row: d,
				st: l,
				mark: u
			};
		}), h.replaceChildren(...L.map((e) => e.row));
	}
	let W = (e, t, n, r = "check") => {
		let i = L[e];
		i && (i.row.classList.remove("cur"), t === "cur" && i.row.classList.add("cur"), i.mark.className = `mk ${t}`, i.mark.replaceChildren(t === "cur" ? o("span", { class: "spin" }) : s(r)), i.st.textContent = n);
	};
	function G(e) {
		e.type === "item" ? (f.done = e.index, B.textContent = e.total > 1 ? x("run.itemOf", {
			n: e.index + 1,
			total: e.total
		}) : "", z.style.width = `${Math.round(e.index / e.total * 100)}%`, V.textContent = e.item ? F(e.item) : "", L.forEach((e, t) => {
			I.steps[t].enabled && W(t, "todo", "");
		})) : e.type === "step" ? W(e.index, "cur", "") : e.type === "done" ? W(e.index, "ok", "") : e.type === "skipped" ? e.reason === "user" && W(e.index, "skip", x("run.skipped"), "arrowRight") : e.type === "failed" ? W(e.index, "err", e.error ?? "", "warning") : e.type === "end" && (z.style.width = "100%");
	}
	async function K(e) {
		if (d) return void l.send({
			app: "automata",
			text: x("run.busy"),
			level: "warning"
		}).catch(() => {});
		let t = e?.automation;
		if (!t || !a.exists(t)) return void h.replaceChildren(o("p", { class: "au-error" }, x("run.missing")));
		try {
			I = await w(t);
		} catch (e) {
			h.replaceChildren(o("p", { class: "au-error" }, x("error.open", { error: e.message })));
			return;
		}
		c.setTitle(`${x("run.title")} — ${I.name}`), H(I.name);
		let n = Number.isInteger(e.from) ? e.from : 0;
		U(n, e.only ? n + 1 : I.steps.length);
		let r = (Array.isArray(e.items) ? e.items : []).filter((e) => a.exists(e));
		if (I.input !== "none" && !r.length && (r = await q(), !r)) return c.emit("close");
		d = !0, f = {
			stopped: !1,
			paused: null,
			items: I.input === "files" ? r.length : 1,
			total: I.steps.length
		}, T(), y.replaceChildren(s("stop"), x("run.stop"));
		let i;
		try {
			i = await u.run(I, {
				items: r,
				values: e.values ?? {},
				ui: N,
				control: f,
				from: n,
				only: !!e.only
			});
		} catch (e) {
			i = { error: e.message };
		}
		d = !1, E = null, g.hidden = !0, _.hidden = !0, y.replaceChildren(x("action.close")), y.classList.remove("danger");
		let p = i.error ? x("run.endError", {
			name: I.name,
			error: i.error
		}) : i.stopped ? x("run.endStopped", { name: I.name }) : x("run.end", {
			name: I.name,
			n: i.items,
			skipped: i.skipped + i.failed
		});
		V.textContent = p, V.classList.toggle("bad", !!i.error), l.send({
			app: "automata",
			text: p,
			level: i.error ? "error" : i.stopped ? "warning" : "success"
		}).catch(() => {});
	}
	function q() {
		let e = [], t = o("div", { class: "rn-chosen" }), r = o("button", {
			class: "ctl-btn primary",
			type: "button",
			disabled: !0
		}, s("play"), x("run.start")), i = o("button", {
			class: "ctl-btn",
			type: "button"
		}, s("plus"), I.input === "folder" ? x("run.chooseFolder") : x("run.addFile")), a = () => {
			t.replaceChildren(...e.map((e) => o("div", { class: "rn-line" }, s(I.input === "folder" ? "folder" : "file"), o("code", {}, F(e))))), r.disabled = !e.length, i.hidden = I.input === "folder" && e.length > 0;
		};
		return i.addEventListener("click", async () => {
			let t = await v.pickFile?.(n, {
				kind: I.input === "folder" ? "folder" : "file",
				exts: I.launch.ext.length ? I.launch.ext : null,
				title: x("run.chooseTitle")
			});
			t && !e.includes(t.id) && e.push(t.id), a();
		}), a(), new Promise((n) => {
			E = (e) => {
				E = null, g.hidden = !0, g.replaceChildren(), n(e);
			}, r.addEventListener("click", () => E([...e])), g.replaceChildren(o("p", {}, I.input === "folder" ? x("run.needFolder") : x("run.needFiles")), t, o("div", { class: "rn-actions" }, i, o("span", { class: "au-grow" }), o("button", {
				class: "ctl-btn",
				type: "button",
				onclick: () => E(null)
			}, x("action.cancel")), r)), g.hidden = !1, i.focus();
		});
	}
	if (c.on("launch", K), c.getState = () => ({ restored: !0 }), e?.restored) return setTimeout(() => c.emit("close"), 0), c;
	let ne = () => (d && (f.stopped = !0, p?.(), E?.("stop")), !0);
	return c.canClose = ne, c.on("destroy", ne), K(e), c;
}
// src/automata/cli.js
function ve({ lilos: e }) {
	e.handle(async ({ args: e = [], cwd: t = "~" } = {}) => {
		if (!S()) return {
			stderr: `${x("needsNewer")}\n`,
			code: 1
		};
		await C().ready();
		let [n, ...r] = e;
		return !n || n === "help" || n === "--help" || n === "-h" ? { stdout: `${x("cli.usage")}\n` } : n === "list" || n === "ls" ? Q() : n === "run" ? ye(r, t) : {
			stderr: `${x("cli.unknown", { sub: n })}\n${x("cli.usage")}\n`,
			code: 2
		};
	});
}
function Q() {
	let e = C().list();
	if (!e.length) return { stdout: `${x("cli.none")}\n` };
	let t = Math.max(...e.map((e) => (e.launch.command || "-").length), 4);
	return { stdout: e.map((e) => `${(e.launch.command || "-").padEnd(t)}  ${e.name}${e.input === "none" ? "" : `  (${x(`input.${e.input}`)})`}`).join("\n") + "\n" };
}
var $ = (e, t) => e.startsWith("/") || e.startsWith("~") ? a.resolve(e) : a.resolve(`${t.replace(/\/+$/, "")}/${e}`);
async function ye(e, t) {
	let [n, ...r] = e;
	if (!n) return {
		stderr: `${x("cli.usage")}\n`,
		code: 2
	};
	let i = C().get(n) ?? ($(n, t) ? C().get($(n, t).id) : null);
	if (!i) return {
		stderr: `${x("cli.notFound", { name: n })}\n`,
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
		let r = $(e, t);
		if (!r) return {
			stderr: `${x("cli.noFile", { path: e })}\n`,
			code: 1
		};
		s.push(r.id);
	}
	let l = await w(i.id);
	if (l.input !== "none" && !s.length) return {
		stderr: `${x("cli.needItems")}\n`,
		code: 2
	};
	if (l.steps.some((e) => e.enabled && (e.confirm || Object.entries(e.fields).some(([e, t]) => t.mode === "ask" && !Object.hasOwn(o, e)))) && !c) return v.launch("automata", {
		automation: i.id,
		items: s,
		values: o
	}, "run"), { stdout: `${x("cli.opened", { name: l.name })}\n` };
	let u = [], d = 0, f = 1, p = await S().run(l, {
		items: s,
		values: o,
		ui: { progress: (e) => {
			e.type === "item" && (d = e.index + 1, f = e.total, e.total > 1 && u.push(`[${d}/${f}] ${e.item ? a.get(e.item)?.name ?? "" : ""}`)), e.type === "failed" && u.push(`  ${x("cli.failed", {
				step: j(l.steps[e.index].action),
				error: e.error
			})}`);
		} }
	}).catch((e) => ({ error: e.message }));
	return p.error ? {
		stdout: u.length ? `${u.join("\n")}\n` : "",
		stderr: `${p.error}\n`,
		code: 1
	} : (u.push(x("cli.done", {
		name: l.name,
		n: p.items
	})), { stdout: `${u.join("\n")}\n` });
}
// src/automata/AutomataApp.js
var be = pe;
export { ve as cli, be as default, me as recorder, _e as run, ae as triggers };
