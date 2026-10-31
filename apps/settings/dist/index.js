import * as e from "/host/sdk.js";
import { SDK_VERSION as t, SettingsWindow as n, TAG_COLORS as r, Window as i, actionButton as a, appIcon as o, apps as s, fileTypeList as c, fs as l, h as u, icon as d, kernel as f, menus as p, openMenu as m, segmented as h, selectField as g, session as _, settings as v, shortcutField as y, shortcuts as b, storage as x, swatches as S, tags as C, textField as w, toast as T, toggle as E } from "/host/sdk.js";
import * as D from "/host/system.js";
import { ACCENTS as O, LASSO_OPTIONS as k, RETENTION_OPTIONS as A, WORKSPACE_LIMITS as j, appFor as M, apps as N, canChangeExecution as ee, defaultAppFor as te, executionMode as ne, fileApps as re, knownExtensions as ie, launch as P, pickFile as F, resetAppsFor as I, setAppFor as ae, setTag as oe, showAppSecurity as se, startup as L, version as ce, workspaceManager as R } from "/host/system.js";
// src/shared/i18n.js
function le(t, n) {
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
// src/settings/i18n.js
var z = le("settings", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"window.title\":\"System\",\"group.system\":\"System\",\"group.data\":\"Data\",\"common.name\":\"Name\",\"common.color\":\"Color\",\"common.items\":\"Items\",\"common.create\":\"Create\",\"common.add\":\"Add\",\"common.addMore\":\"Add…\",\"common.choose\":\"Choose…\",\"common.remove\":\"Remove\",\"common.delete\":\"Delete…\",\"common.deleteNow\":\"Delete\",\"common.reset\":\"Reset\",\"common.confirm\":\"Confirm\",\"common.loading\":\"Loading…\",\"common.unavailable\":\"Not available\",\"common.yes\":\"Yes\",\"common.no\":\"No\",\"appearance.label\":\"Appearance\",\"appearance.description\":\"Colors and motion of the interface.\",\"appearance.colors.label\":\"Colors\",\"appearance.theme.label\":\"Theme\",\"appearance.theme.description\":\"Light or dark: desk, taskbar, menus and windows\",\"appearance.theme.keywords\":\"theme light dark night mode\",\"appearance.theme.light\":\"Light\",\"appearance.theme.dark\":\"Dark\",\"appearance.accent.title\":\"Accent color\",\"appearance.accent.description\":\"Selection, buttons, active tabs and logo\",\"appearance.accent.keywords\":\"accent theme highlight\",\"appearance.motion.label\":\"Motion\",\"appearance.animations.label\":\"Animations\",\"appearance.animations.description\":\"View movements, menus and transitions. If the operating system asks for reduced motion, they stay reduced.\",\"appearance.animations.keywords\":\"motion movement transitions\",\"language.label\":\"Language\",\"language.description\":\"The language of apps: their texts, dates and numbers.\",\"language.title\":\"System language\",\"language.row.description\":\"Apps without this language use English. lilOS’s own texts are still in Italian.\",\"language.keywords\":\"language translation locale english italian dates numbers\",\"language.auto\":\"Automatic: {name}\",\"desk.label\":\"Desk\",\"desk.description\":\"How the infinite desk behaves.\",\"desk.fixed.title\":\"Fixed items\",\"desk.fixed.label\":\"On the desk\",\"desk.fixed.descriptionSwitchable\":\"The ones turned on are on the desk of every workspace. They open and move like other items, but cannot be renamed or deleted: you remove them here.\",\"desk.fixed.description\":\"They are on the desk of every workspace. They open and move like other items, but cannot be renamed or deleted.\",\"desk.fixed.keywords\":\"fixed items desk show hide delete {name}\",\"desk.fixed.toggle\":\"{name} on the desk\",\"desk.fixed.toggleIn\":\"{name} on the desk of {workspace}\",\"desk.fixed.always\":\"Fixed\",\"desk.fixed.descriptionWorkspace\":\"The ones turned on are on this workspace's desk. They open and move like other items, but cannot be renamed or deleted: you remove them here.\",\"desk.fixed.descriptionAll\":\"Turn one on or off in every workspace at once; new workspaces get the same. Each workspace can then change it in its own tab.\",\"desk.fixed.some\":\"On in {on} of {n} workspaces\",\"desk.fixed.toggleAll\":\"{name} on every desk\",\"desk.fixed.moved.label\":\"Each workspace has its own\",\"desk.fixed.moved.description\":\"Choose them in Workspaces: in each workspace's tab, or in All for every desk.\",\"desk.fixed.moved.keywords\":\"fixed items desk home documents trash workspace\",\"desk.fixed.moved.open\":\"Open\",\"desk.placement.title\":\"Placement\",\"desk.snap.label\":\"Snap to grid\",\"desk.snap.description\":\"Dragged items line up on an invisible grid\",\"desk.snap.keywords\":\"icons snap grid align\",\"desk.overview.label\":\"Overview\",\"desk.overview.title\":\"Bottom-right panel\",\"desk.minimap.label\":\"Show the minimap\",\"desk.minimap.keywords\":\"map minimap thumbnail\",\"workspaces.label\":\"Workspaces\",\"workspaces.description\":\"Separate desks, each with its own items, windows and apps. Files outside the desk belong to everyone.\",\"workspaces.current.label\":\"This workspace\",\"workspaces.current.title\":\"Workspace\",\"workspaces.all.label\":\"All\",\"workspaces.name.keywords\":\"rename workspace name\",\"workspaces.name.field\":\"Workspace name\",\"workspaces.color.description\":\"The dot in the taskbar and next to its files in the File Manager\",\"workspaces.color.keywords\":\"workspace color\",\"workspaces.owned.label\":\"Files, folders and shortcuts\",\"workspaces.owned.description\":\"Created in this workspace, on the desk and in shared folders\",\"workspaces.apps.title\":\"Apps\",\"workspaces.apps.system\":\"System app: it is in every workspace\",\"workspaces.apps.installed\":\"Installed in lilOS: you can hide it here\",\"workspaces.apps.keywords\":\"app hide show {name}\",\"workspaces.apps.alwaysVisible\":\"Always visible\",\"workspaces.apps.toggle\":\"{name} visible in this workspace\",\"workspaces.apps.toggleIn\":\"{name} visible in {workspace}\",\"workspaces.list.current\":\"{name} (current)\",\"workspaces.list.owned\":{\"one\":\"{n} item created\",\"other\":\"{n} items created\"},\"workspaces.list.apps\":{\"one\":\"{n} app\",\"other\":\"{n} apps\"},\"workspaces.list.keywords\":\"workspace switch delete\",\"workspaces.list.switch\":\"Switch to it\",\"workspaces.switch.label\":\"Go to this workspace\",\"workspaces.new.label\":\"New workspace\",\"workspaces.new.description\":\"With an empty desk and every app visible\",\"workspaces.deleting.title\":\"Deleting a workspace\",\"workspaces.deleting.files.label\":\"Files stay\",\"workspaces.deleting.files.description\":\"Its desk becomes the folder Documenti/Scrivania di <name> (if it is not empty); files created elsewhere stay where they are, marked as its own.\",\"workspaces.deleting.windows.label\":\"Windows stay\",\"workspaces.deleting.windows.description\":\"Its open windows move to the current workspace, with their unsaved changes. Workareas, view and hidden apps are lost.\",\"tags.label\":\"Tags\",\"tags.description\":\"Colored labels to find files and folders wherever they are. A hidden tag hides its items.\",\"tags.new.title\":\"New tag\",\"tags.new.pending\":{\"one\":\"The new tag will go on {n} selected item\",\"other\":\"The new tag will go on {n} selected items\"},\"tags.new.description\":\"Then assign it from the right-click menu → Tag, on the desk and in the File Manager\",\"tags.new.keywords\":\"new tag create label\",\"tags.new.placeholder\":\"For example: Urgent\",\"tags.new.field\":\"Name of the new tag\",\"tags.name.keywords\":\"rename tag\",\"tags.name.field\":\"Name of the tag {name}\",\"tags.color.keywords\":\"tag color\",\"tags.visible.label\":\"Visible\",\"tags.visible.on\":\"Items with this tag are shown everywhere\",\"tags.visible.off\":\"Items with this tag are hidden everywhere: you find them in File Manager → Tags\",\"tags.visible.keywords\":\"hide show hidden invisible tag\",\"tags.visible.toggle\":\"Tag {name} visible\",\"tags.items.description\":{\"one\":\"{n} item in this workspace and in shared folders\",\"other\":\"{n} items in this workspace and in shared folders\"},\"tags.items.show\":\"Show in File Manager\",\"tags.items.delete\":\"Delete the tag\",\"usability.label\":\"Usability\",\"usability.description\":\"Keyboard, mouse, apps that open files, context menus and trash.\",\"shortcuts.label\":\"Shortcuts\",\"shortcuts.title\":\"Keyboard shortcuts\",\"shortcuts.all.label\":\"All shortcuts\",\"shortcuts.all.description\":\"Changes apply right away. To record a combination press +, then the keys; Esc cancels.\",\"shortcuts.all.reset\":\"Reset all\",\"shortcuts.keywords\":\"shortcut keys {keys}\",\"shortcuts.mouse.title\":\"Mouse\",\"shortcuts.lasso.label\":\"Freehand selection\",\"shortcuts.lasso.description\":\"Draw a closed path: the items inside it are selected\",\"shortcuts.lasso.keywords\":\"lasso freehand path selection alt\",\"shortcuts.rectangle.label\":\"Rectangle selection\",\"shortcuts.rectangle.control\":\"Drag on the background\",\"shortcuts.addToSelection.label\":\"Add to the selection\",\"shortcuts.addToSelection.control\":\"Ctrl or Shift + click or drag\",\"shortcuts.pan.label\":\"Move around the desk\",\"shortcuts.pan.control\":\"Space + drag, or middle button\",\"shortcuts.fixed.title\":\"Fixed keys\",\"shortcuts.navigate.label\":\"Move through menus, lists and tabs\",\"shortcuts.navigate.control\":\"Arrows, Enter, Esc\",\"shortcuts.rename.label\":\"Confirm or cancel renaming\",\"shortcuts.rename.control\":\"Enter, Esc\",\"fileTypes.label\":\"File types\",\"fileTypes.title\":\"Apps by file type\",\"fileTypes.all.label\":\"All file types\",\"fileTypes.all.description\":\"When you open a file, lilOS uses the app chosen here. With “Ask every time” the Open with window appears.\",\"fileTypes.all.reset\":\"Reset all\",\"fileTypes.noExtension\":\"No extension\",\"fileTypes.default\":\"Default: {app}\",\"fileTypes.noDefault\":\"No default app\",\"fileTypes.keywords\":\"file type extension open with {ext}\",\"fileTypes.field\":\"App for .{ext}\",\"fileTypes.fieldNoExtension\":\"App for files without an extension\",\"fileTypes.ask\":\"Ask every time\",\"fileTypes.others\":\"Others\",\"menu.label\":\"Context menu\",\"menu.separator\":\"— Separator —\",\"menu.submenu\":{\"one\":\"Submenu · {n} item\",\"other\":\"Submenu · {n} items\"},\"menu.create.folder\":\"Creates the folder “{name}”\",\"menu.create.file\":\"Creates the file “{name}”\",\"menu.create.fileFromTemplate\":\"Creates the file “{name}” from the template {template}\",\"menu.create.fileWithContent\":\"Creates the file “{name}” with initial content\",\"menu.create.deletedTemplate\":\"(deleted file)\",\"menu.launch\":\"Opens the app {name}\",\"menu.action\":\"Action\",\"menu.keywords\":\"context menu item separator new\",\"menu.moveUp\":\"Move up\",\"menu.moveDown\":\"Move down\",\"menu.target.root\":\"Main menu\",\"menu.target.inside\":\"Inside “{name}”\",\"menu.target.label\":\"Where\",\"menu.item.label\":\"Item\",\"menu.item.description\":\"An action or opening an app\",\"menu.item.field\":\"Item to add\",\"menu.item.open\":\"Open {name}\",\"menu.separatorRow.label\":\"Separator\",\"menu.separatorRow.description\":\"A line to group items\",\"menu.new.label\":\"New item in “{name}”\",\"menu.new.description\":\"Creates a file or a folder with this name; a file can start from the contents of a template\",\"menu.new.labelField\":\"Label\",\"menu.new.labelPlaceholder\":\"Label (e.g. Style sheet)\",\"menu.new.nameField\":\"Name of the file or folder\",\"menu.new.namePlaceholder\":\"Name (e.g. style.css)\",\"menu.new.kind\":\"Type\",\"menu.new.kindFile\":\"File\",\"menu.new.kindFolder\":\"Folder\",\"menu.new.missing\":\"A label and a name are needed\",\"menu.template.button\":\"Template…\",\"menu.template.chosen\":\"Template: {name}\",\"menu.template.title\":\"Choose the template file\",\"menu.template.text\":\"The new file will start with the contents of this file.\",\"menu.defaults.label\":\"Default items\",\"menu.defaults.custom\":\"The menu has been customized\",\"menu.defaults.default\":\"The menu is the default one\",\"trash.label\":\"Trash\",\"trash.deleting.title\":\"Deleting\",\"trash.confirm.label\":\"Ask for confirmation\",\"trash.confirm.description\":\"Before deleting files and folders, a small menu asks you to confirm\",\"trash.confirm.keywords\":\"confirm delete remove ask\",\"trash.permanent.label\":\"Delete permanently\",\"trash.permanent.description\":\"Deleted items skip the trash: they can be recovered only with Ctrl Z, while the page stays open\",\"trash.permanent.keywords\":\"trash permanent immediately delete skip\",\"trash.retention.label\":\"Keep items for\",\"trash.retention.description\":\"After this time, what is in the trash is deleted permanently\",\"trash.retention.keywords\":\"retention duration days automatic cleanup empty\",\"trash.retention.field\":\"Keep items in the trash for\",\"trash.retention.days\":{\"one\":\"{n} day\",\"other\":\"{n} days\"},\"trash.retention.forever\":\"Forever\",\"trash.contents.label\":\"Contents\",\"trash.contents.description\":{\"one\":\"{n} item · {size}\",\"other\":\"{n} items · {size}\"},\"trash.contents.empty\":\"The trash is empty\",\"trash.contents.keywords\":\"open trash restore\",\"trash.contents.open\":\"Open the trash\",\"trash.empty.label\":\"Empty the trash\",\"trash.empty.description\":\"Permanently deletes everything in it\",\"trash.empty.keywords\":\"empty trash\",\"trash.empty.button\":\"Empty…\",\"trash.empty.confirm\":\"Empty\",\"trash.empty.none\":\"Empty\",\"apps.label\":\"Apps\",\"apps.description\":\"How installed apps run.\",\"apps.security.label\":\"Security\",\"apps.execution.title\":\"Running apps\",\"apps.isolated.label\":\"Run apps isolated\",\"apps.isolated.description\":\"Each app runs in a sandbox and sees only what its permissions allow. If you turn this off, apps run in lilOS’s page and in a Web Worker: faster, but they can do everything you can do. Applies from the next time each app opens.\",\"apps.isolated.adminOnly\":\"Only an administrator can change it.\",\"apps.isolated.keywords\":\"security isolation sandbox iframe worker\",\"apps.isolated.failed\":\"Not changed: {error}\",\"apps.system.label\":\"System apps\",\"apps.system.description\":\"File Manager, Editor, System and AppStore are part of lilOS and always run inside lilOS.\",\"apps.installed.title\":\"Installed apps\",\"apps.installed.keywords\":\"security isolation\",\"apps.installed.shared\":\"Like the other apps\",\"apps.installed.own\":\"Chosen for this app\",\"apps.installed.properties\":\"Properties…\",\"apps.installed.none\":\"No apps installed besides the system ones\",\"apps.mode.isolated\":\"Isolated\",\"apps.mode.open\":\"Not isolated\",\"apps.mode.system\":\"Inside lilOS\",\"apps.mode.remote\":\"Isolated, on its own site\",\"startup.label\":\"Startup\",\"startup.description\":\"Services and apps that start by themselves when lilOS starts and when you sign in.\",\"startup.options.label\":\"Options\",\"startup.services.label\":\"Services\",\"startup.apps.label\":\"Apps\",\"startup.auto.title\":\"Automatic startup\",\"startup.openApps.label\":\"Open apps when you sign in\",\"startup.openApps.description\":\"The apps chosen in Apps open, with their parameters. Only in the first lilOS tab of this browser: the others open empty.\",\"startup.openApps.keywords\":\"startup automatic sign-in login autorun\",\"startup.trouble.title\":\"If something goes wrong\",\"startup.safe.label\":\"Start without apps\",\"startup.safe.description\":\"Just once: open lilOS with ?avvio=no at the end of the address. Saved choices are kept.\",\"startup.safe.keywords\":\"safe start startup no apps avvio=no\",\"startup.safe.active\":\"Active now\",\"startup.apps.title\":\"Open when you sign in\",\"startup.apps.hint\":\"In the workspace lilOS opens in, in the order of the list. Turn off every entry point of an app and the app leaves the list.\",\"startup.apps.none\":\"No app opens by itself.\",\"startup.apps.oneEntry\":\"1 entry point\",\"startup.apps.entries\":{\"one\":\"{on} of {n} entry point\",\"other\":\"{on} of {n} entry points\"},\"startup.apps.remove\":\"Remove from startup\",\"startup.apps.allAdded\":\"All apps are already in startup\",\"startup.apps.add\":\"Add an app to startup\",\"startup.apps.addDescription\":\"Its main window opens; then choose other entry points and parameters\",\"startup.params.of\":\"{entry} of {app}\",\"startup.params.undescribed\":\"This entry point does not describe its parameters: they reach the app as they are, as args.\",\"startup.params.json\":\"Parameters (JSON)\",\"startup.params.jsonOf\":\"Parameters (JSON) of {name}\",\"startup.params.invalidJson\":\"Not valid JSON\",\"startup.params.notSaved\":\"Not saved: {error}\",\"startup.path.noFolder\":\"No folder\",\"startup.path.noFile\":\"No file\",\"startup.path.gone\":\"(no longer exists)\",\"startup.path.clear\":\"Remove {name}\",\"services.unsupported\":\"This version of lilOS has no app services\",\"services.status.off\":\"Off\",\"services.status.starting\":\"Starting…\",\"services.status.error\":\"Stopped: {error}\",\"services.status.unknownError\":\"error\",\"services.status.restarting\":\"Restarting… (it had stopped: {error})\",\"services.status.onNow\":\"On for less than a minute\",\"services.status.onMinutes\":{\"one\":\"On for {n} minute\",\"other\":\"On for {n} minutes\"},\"services.status.onHours\":{\"one\":\"On for {n} hour\",\"other\":\"On for {n} hours\"},\"services.status.onSince\":\"On since {date}\",\"services.auto.label\":\"Start services automatically\",\"services.auto.noEngine\":\"The kernel has no services engine (services-isolate module)\",\"services.auto.description\":\"When you sign in, your services chosen in Services start. The ones an administrator chose for everyone start anyway.\",\"services.auto.keywords\":\"services startup automatic background kernel\",\"services.title\":\"Installed services\",\"services.noEngine\":\"The kernel has no services engine: it needs the services-isolate module (AppStore → Kernel).\",\"services.none\":\"No installed app has services.\",\"services.hint\":\"The parts of apps that work in the kernel, without a window, even with lilOS closed. “At system startup” applies to every user and is chosen by an administrator; “At sign-in” only to you.\",\"services.startup.none\":\"Never\",\"services.startup.login\":\"At sign-in\",\"services.startup.system\":\"At system startup\",\"services.startup.field\":\"Startup of {name}\",\"services.restart\":\"Restart\",\"services.restartOf\":\"Restart {name}\",\"services.stop\":\"Stop\",\"services.start\":\"Start\",\"services.byAdmin\":\"chosen by an administrator\",\"services.log.label\":\"Log\",\"services.log.title\":\"Log of {name}\",\"services.log.empty\":\"No lines: the service has not started yet.\",\"storage.label\":\"Storage\",\"storage.description.kernel\":\"lilOS data saved in your user folder.\",\"storage.description.browser\":\"lilOS data saved in this browser.\",\"storage.space.title\":\"Space\",\"storage.used.label\":\"Space used\",\"storage.used.description\":\"Positions, view and settings\",\"storage.contents.label\":\"File contents\",\"storage.contents.description\":\"Text saved in files\",\"storage.reset.title\":\"Reset\",\"storage.defaults.label\":\"Default settings\",\"storage.defaults.description\":\"Resets settings, shortcuts, file type apps and menus to their initial values\",\"storage.initial.label\":\"Initial desk and files\",\"storage.initial.description\":\"Deletes all the folders and files created, the workspaces, the tags, the saved positions and view, then reloads lilOS\",\"storage.initial.keywords\":\"reset factory desktop desk workspace tag\",\"storage.initial.button\":\"Reset…\",\"storage.initial.confirm\":\"Delete and reload\",\"about.label\":\"About\",\"about.description\":\"Version and environment.\",\"about.version\":\"Version\",\"about.sdkVersion\":\"SDK version\",\"about.language\":\"Language\",\"about.browser\":\"Browser\",\"about.unknownBrowser\":\"Unknown\",\"@name\":\"System\",\"@description\":\"Appearance, language, workspaces, tags, shortcuts, file types, startup services and apps, storage.\",\"@entrypoints.main.params.tab.label\":\"Section\",\"@entrypoints.main.params.tab.options.appearance.label\":\"Appearance\",\"@entrypoints.main.params.tab.options.language.label\":\"Language\",\"@entrypoints.main.params.tab.options.desk.label\":\"Desk\",\"@entrypoints.main.params.tab.options.workspaces.label\":\"Workspaces\",\"@entrypoints.main.params.tab.options.tags.label\":\"Tags\",\"@entrypoints.main.params.tab.options.usability.label\":\"Usability\",\"@entrypoints.main.params.tab.options.apps.label\":\"Apps\",\"@entrypoints.main.params.tab.options.startup.label\":\"Startup\",\"@entrypoints.main.params.tab.options.storage.label\":\"Storage\",\"@entrypoints.main.params.tab.options.about.label\":\"About\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"window.title\":\"Sistema\",\"group.system\":\"Sistema\",\"group.data\":\"Dati\",\"common.name\":\"Nome\",\"common.color\":\"Colore\",\"common.items\":\"Elementi\",\"common.create\":\"Crea\",\"common.add\":\"Aggiungi\",\"common.addMore\":\"Aggiungi…\",\"common.choose\":\"Scegli…\",\"common.remove\":\"Togli\",\"common.delete\":\"Elimina…\",\"common.deleteNow\":\"Elimina\",\"common.reset\":\"Ripristina\",\"common.confirm\":\"Conferma\",\"common.loading\":\"Lettura…\",\"common.unavailable\":\"Non disponibile\",\"common.yes\":\"Sì\",\"common.no\":\"No\",\"appearance.label\":\"Aspetto\",\"appearance.description\":\"Colori e movimento dell’interfaccia.\",\"appearance.colors.label\":\"Colori\",\"appearance.theme.label\":\"Tema\",\"appearance.theme.description\":\"Chiaro o scuro: scrivania, barra, menu e finestre\",\"appearance.theme.keywords\":\"tema chiaro scuro dark light notte\",\"appearance.theme.light\":\"Chiaro\",\"appearance.theme.dark\":\"Scuro\",\"appearance.accent.title\":\"Colore principale\",\"appearance.accent.description\":\"Selezione, pulsanti, tab attivi e logo\",\"appearance.accent.keywords\":\"accento tema\",\"appearance.motion.label\":\"Movimento\",\"appearance.animations.label\":\"Animazioni\",\"appearance.animations.description\":\"Spostamenti della vista, menu e transizioni. Se il sistema operativo chiede movimento ridotto, restano ridotte.\",\"appearance.animations.keywords\":\"movimento transizioni\",\"language.label\":\"Lingua\",\"language.description\":\"La lingua delle app: i loro testi, le date e i numeri.\",\"language.title\":\"Lingua del sistema\",\"language.row.description\":\"Le app che non hanno questa lingua usano l’inglese. I testi di lilOS sono ancora in italiano.\",\"language.keywords\":\"lingua traduzione inglese italiano date numeri language locale\",\"language.auto\":\"Automatica: {name}\",\"desk.label\":\"Scrivania\",\"desk.description\":\"Comportamento della scrivania infinita.\",\"desk.fixed.title\":\"Elementi fissi\",\"desk.fixed.label\":\"Sulla scrivania\",\"desk.fixed.descriptionSwitchable\":\"Quelli attivi ci sono sulla scrivania di ogni workspace. Si aprono e si spostano come gli altri, ma non si rinominano e non si eliminano: si tolgono da qui.\",\"desk.fixed.description\":\"Ci sono sulla scrivania di ogni workspace. Si aprono e si spostano come gli altri, ma non si rinominano e non si eliminano.\",\"desk.fixed.keywords\":\"elementi fissi scrivania mostra nascondi elimina {name}\",\"desk.fixed.toggle\":\"{name} sulla scrivania\",\"desk.fixed.toggleIn\":\"{name} sulla scrivania di {workspace}\",\"desk.fixed.always\":\"Fisso\",\"desk.fixed.descriptionWorkspace\":\"Quelli attivi ci sono sulla scrivania di questo workspace. Si aprono e si spostano come gli altri, ma non si rinominano e non si eliminano: si tolgono da qui.\",\"desk.fixed.descriptionAll\":\"Accendi o spegni un elemento in tutti i workspace insieme; i workspace nuovi lo hanno uguale. Ogni workspace poi lo può cambiare nel suo tab.\",\"desk.fixed.some\":\"Acceso in {on} workspace su {n}\",\"desk.fixed.toggleAll\":\"{name} su tutte le scrivanie\",\"desk.fixed.moved.label\":\"Ogni workspace ha i suoi\",\"desk.fixed.moved.description\":\"Si scelgono in Workspace: nel tab di ogni workspace, o in Tutti per tutte le scrivanie.\",\"desk.fixed.moved.keywords\":\"elementi fissi scrivania home documenti cestino workspace\",\"desk.fixed.moved.open\":\"Apri\",\"desk.placement.title\":\"Posizionamento\",\"desk.snap.label\":\"Allinea alla griglia\",\"desk.snap.description\":\"Gli elementi trascinati si allineano a una griglia invisibile\",\"desk.snap.keywords\":\"icone snap\",\"desk.overview.label\":\"Panoramica\",\"desk.overview.title\":\"Pannello in basso a destra\",\"desk.minimap.label\":\"Mostra la minimappa\",\"desk.minimap.keywords\":\"mappa miniatura\",\"workspaces.label\":\"Workspace\",\"workspaces.description\":\"Scrivanie separate, ognuna con i suoi elementi, finestre e app. I file fuori dalla scrivania sono di tutti.\",\"workspaces.current.label\":\"Questo workspace\",\"workspaces.current.title\":\"Workspace\",\"workspaces.all.label\":\"Tutti\",\"workspaces.name.keywords\":\"rinomina workspace\",\"workspaces.name.field\":\"Nome del workspace\",\"workspaces.color.description\":\"Il pallino nella barra in basso e accanto ai suoi file nel File Manager\",\"workspaces.color.keywords\":\"colore workspace\",\"workspaces.owned.label\":\"File, cartelle e collegamenti\",\"workspaces.owned.description\":\"Creati in questo workspace, sulla scrivania e nelle cartelle condivise\",\"workspaces.apps.title\":\"App\",\"workspaces.apps.system\":\"App di sistema: c’è in ogni workspace\",\"workspaces.apps.installed\":\"Installata in lilOS: qui la puoi nascondere\",\"workspaces.apps.keywords\":\"app nascondi mostra {name}\",\"workspaces.apps.alwaysVisible\":\"Sempre visibile\",\"workspaces.apps.toggle\":\"{name} visibile in questo workspace\",\"workspaces.apps.toggleIn\":\"{name} visibile in {workspace}\",\"workspaces.list.current\":\"{name} (attuale)\",\"workspaces.list.owned\":{\"one\":\"{n} elemento creato\",\"other\":\"{n} elementi creati\"},\"workspaces.list.apps\":{\"one\":\"{n} app\",\"other\":\"{n} app\"},\"workspaces.list.keywords\":\"workspace passa elimina\",\"workspaces.list.switch\":\"Passa a questo\",\"workspaces.switch.label\":\"Vai a questo workspace\",\"workspaces.new.label\":\"Nuovo workspace\",\"workspaces.new.description\":\"Con la scrivania vuota e tutte le app visibili\",\"workspaces.deleting.title\":\"Eliminare un workspace\",\"workspaces.deleting.files.label\":\"I file restano\",\"workspaces.deleting.files.description\":\"La sua scrivania diventa la cartella Documenti/Scrivania di <nome> (se non è vuota); i file creati altrove restano dove sono, segnati come suoi.\",\"workspaces.deleting.windows.label\":\"Le finestre restano\",\"workspaces.deleting.windows.description\":\"Le sue finestre aperte passano nel workspace attuale, con le modifiche non salvate. Workarea, vista e app nascoste si perdono.\",\"tags.label\":\"Tag\",\"tags.description\":\"Etichette colorate per ritrovare file e cartelle ovunque siano. Un tag invisibile nasconde i suoi elementi.\",\"tags.new.title\":\"Nuovo tag\",\"tags.new.pending\":{\"one\":\"Il nuovo tag andrà su {n} elemento selezionato\",\"other\":\"Il nuovo tag andrà su {n} elementi selezionati\"},\"tags.new.description\":\"Poi si assegna dal menu del tasto destro → Tag, sulla scrivania e nel File Manager\",\"tags.new.keywords\":\"nuovo tag crea etichetta\",\"tags.new.placeholder\":\"Per esempio: Urgente\",\"tags.new.field\":\"Nome del nuovo tag\",\"tags.name.keywords\":\"rinomina tag\",\"tags.name.field\":\"Nome del tag {name}\",\"tags.color.keywords\":\"colore tag\",\"tags.visible.label\":\"Visibile\",\"tags.visible.on\":\"Gli elementi con questo tag si vedono ovunque\",\"tags.visible.off\":\"Gli elementi con questo tag sono nascosti ovunque: si ritrovano nel File Manager → Tag\",\"tags.visible.keywords\":\"nascondi mostra invisibile tag\",\"tags.visible.toggle\":\"Tag {name} visibile\",\"tags.items.description\":{\"one\":\"{n} elemento in questo workspace e nelle cartelle condivise\",\"other\":\"{n} elementi in questo workspace e nelle cartelle condivise\"},\"tags.items.show\":\"Mostra nel File Manager\",\"tags.items.delete\":\"Elimina il tag\",\"usability.label\":\"Usabilità\",\"usability.description\":\"Tastiera, mouse, app che aprono i file, menu contestuali e cestino.\",\"shortcuts.label\":\"Scorciatoie\",\"shortcuts.title\":\"Scorciatoie da tastiera\",\"shortcuts.all.label\":\"Tutte le scorciatoie\",\"shortcuts.all.description\":\"Le modifiche valgono subito. Per registrare una combinazione premi +, poi i tasti; Esc annulla.\",\"shortcuts.all.reset\":\"Ripristina tutte\",\"shortcuts.keywords\":\"scorciatoia tasti {keys}\",\"shortcuts.mouse.title\":\"Mouse\",\"shortcuts.lasso.label\":\"Selezione a mano libera\",\"shortcuts.lasso.description\":\"Disegna un percorso chiuso: si selezionano gli elementi che contiene\",\"shortcuts.lasso.keywords\":\"lazo lasso percorso selezione alt\",\"shortcuts.rectangle.label\":\"Selezione a rettangolo\",\"shortcuts.rectangle.control\":\"Trascina sullo sfondo\",\"shortcuts.addToSelection.label\":\"Aggiungere alla selezione\",\"shortcuts.addToSelection.control\":\"Ctrl o Shift + clic o trascinamento\",\"shortcuts.pan.label\":\"Spostarsi sulla scrivania\",\"shortcuts.pan.control\":\"Spazio + trascina, o tasto centrale\",\"shortcuts.fixed.title\":\"Tasti fissi\",\"shortcuts.navigate.label\":\"Muoversi nei menu, nelle liste e nei tab\",\"shortcuts.navigate.control\":\"Frecce, Invio, Esc\",\"shortcuts.rename.label\":\"Confermare o annullare la rinomina\",\"shortcuts.rename.control\":\"Invio, Esc\",\"fileTypes.label\":\"Tipi di file\",\"fileTypes.title\":\"App per tipo di file\",\"fileTypes.all.label\":\"Tutti i tipi di file\",\"fileTypes.all.description\":\"Aprendo un file, lilOS usa l’app scelta qui. Con «Chiedi ogni volta» compare la finestra Apri con.\",\"fileTypes.all.reset\":\"Ripristina tutti\",\"fileTypes.noExtension\":\"Senza estensione\",\"fileTypes.default\":\"Predefinita: {app}\",\"fileTypes.noDefault\":\"Nessuna app predefinita\",\"fileTypes.keywords\":\"tipo file estensione apri con {ext}\",\"fileTypes.field\":\"App per .{ext}\",\"fileTypes.fieldNoExtension\":\"App per i file senza estensione\",\"fileTypes.ask\":\"Chiedi ogni volta\",\"fileTypes.others\":\"Altri\",\"menu.label\":\"Menu contestuale\",\"menu.separator\":\"— Separatore —\",\"menu.submenu\":{\"one\":\"Sottomenu · {n} voce\",\"other\":\"Sottomenu · {n} voci\"},\"menu.create.folder\":\"Crea la cartella «{name}»\",\"menu.create.file\":\"Crea il file «{name}»\",\"menu.create.fileFromTemplate\":\"Crea il file «{name}» dal modello {template}\",\"menu.create.fileWithContent\":\"Crea il file «{name}» con un contenuto iniziale\",\"menu.create.deletedTemplate\":\"(file eliminato)\",\"menu.launch\":\"Apre l’app {name}\",\"menu.action\":\"Azione\",\"menu.keywords\":\"menu contestuale voce separatore nuovo\",\"menu.moveUp\":\"Sposta su\",\"menu.moveDown\":\"Sposta giù\",\"menu.target.root\":\"Menu principale\",\"menu.target.inside\":\"Dentro «{name}»\",\"menu.target.label\":\"Dove\",\"menu.item.label\":\"Voce\",\"menu.item.description\":\"Un’azione o l’apertura di un’app\",\"menu.item.field\":\"Voce da aggiungere\",\"menu.item.open\":\"Apri {name}\",\"menu.separatorRow.label\":\"Separatore\",\"menu.separatorRow.description\":\"Una linea per raggruppare le voci\",\"menu.new.label\":\"Nuovo elemento in «{name}»\",\"menu.new.description\":\"Crea un file o una cartella con questo nome; un file può partire dal contenuto di un modello\",\"menu.new.labelField\":\"Etichetta\",\"menu.new.labelPlaceholder\":\"Etichetta (es. Foglio di stile)\",\"menu.new.nameField\":\"Nome del file o della cartella\",\"menu.new.namePlaceholder\":\"Nome (es. stile.css)\",\"menu.new.kind\":\"Tipo\",\"menu.new.kindFile\":\"File\",\"menu.new.kindFolder\":\"Cartella\",\"menu.new.missing\":\"Servono l’etichetta e il nome\",\"menu.template.button\":\"Modello…\",\"menu.template.chosen\":\"Modello: {name}\",\"menu.template.title\":\"Scegli il file modello\",\"menu.template.text\":\"Il nuovo file partirà con il contenuto di questo file.\",\"menu.defaults.label\":\"Voci predefinite\",\"menu.defaults.custom\":\"Il menu è stato personalizzato\",\"menu.defaults.default\":\"Il menu è quello predefinito\",\"trash.label\":\"Cestino\",\"trash.deleting.title\":\"Eliminazione\",\"trash.confirm.label\":\"Chiedi conferma\",\"trash.confirm.description\":\"Prima di eliminare file e cartelle, un piccolo menu chiede di confermare\",\"trash.confirm.keywords\":\"conferma elimina cancella domanda\",\"trash.permanent.label\":\"Elimina definitivamente\",\"trash.permanent.description\":\"Gli elementi eliminati non passano dal cestino: si recuperano solo con Ctrl Z, finché la pagina resta aperta\",\"trash.permanent.keywords\":\"cestino definitivo subito cancella salta\",\"trash.retention.label\":\"Conserva gli elementi per\",\"trash.retention.description\":\"Passato questo tempo, quello che è nel cestino viene eliminato definitivamente\",\"trash.retention.keywords\":\"retention durata giorni pulizia automatica svuota\",\"trash.retention.field\":\"Conserva gli elementi nel cestino per\",\"trash.retention.days\":{\"one\":\"{n} giorno\",\"other\":\"{n} giorni\"},\"trash.retention.forever\":\"Per sempre\",\"trash.contents.label\":\"Contenuto\",\"trash.contents.description\":{\"one\":\"{n} elemento · {size}\",\"other\":\"{n} elementi · {size}\"},\"trash.contents.empty\":\"Il cestino è vuoto\",\"trash.contents.keywords\":\"apri cestino ripristina\",\"trash.contents.open\":\"Apri il cestino\",\"trash.empty.label\":\"Svuota il cestino\",\"trash.empty.description\":\"Elimina definitivamente tutto quello che contiene\",\"trash.empty.keywords\":\"svuota cestino\",\"trash.empty.button\":\"Svuota…\",\"trash.empty.confirm\":\"Svuota\",\"trash.empty.none\":\"Vuoto\",\"apps.label\":\"App\",\"apps.description\":\"Come girano le app installate.\",\"apps.security.label\":\"Sicurezza\",\"apps.execution.title\":\"Esecuzione delle app\",\"apps.isolated.label\":\"Esegui le app isolate\",\"apps.isolated.description\":\"Ogni app gira in una sandbox e vede solo quello che i suoi permessi le concedono. Se lo togli, le app girano nella pagina di lilOS e in un Web Worker: più veloci, ma possono fare tutto quello che puoi fare tu. Vale dalla prossima apertura di ogni app.\",\"apps.isolated.adminOnly\":\"Solo un amministratore la cambia.\",\"apps.isolated.keywords\":\"sicurezza isolamento sandbox iframe worker\",\"apps.isolated.failed\":\"Non cambiata: {error}\",\"apps.system.label\":\"App di sistema\",\"apps.system.description\":\"File Manager, Editor, Sistema e AppStore fanno parte di lilOS e girano sempre dentro lilOS.\",\"apps.installed.title\":\"App installate\",\"apps.installed.keywords\":\"sicurezza isolamento\",\"apps.installed.shared\":\"Come le altre app\",\"apps.installed.own\":\"Scelta per questa app\",\"apps.installed.properties\":\"Proprietà…\",\"apps.installed.none\":\"Nessuna app installata oltre a quelle di sistema\",\"apps.mode.isolated\":\"Isolata\",\"apps.mode.open\":\"Non isolata\",\"apps.mode.system\":\"Dentro lilOS\",\"apps.mode.remote\":\"Isolata, nel suo sito\",\"startup.label\":\"Avvio\",\"startup.description\":\"Servizi e app che partono da soli all’avvio di lilOS e quando entri.\",\"startup.options.label\":\"Opzioni\",\"startup.services.label\":\"Servizi\",\"startup.apps.label\":\"App\",\"startup.auto.title\":\"Avvio automatico\",\"startup.openApps.label\":\"Apri le app quando entri\",\"startup.openApps.description\":\"Si aprono le app scelte in App, con i loro parametri. Solo nella prima scheda di lilOS di questo browser: le altre si aprono vuote.\",\"startup.openApps.keywords\":\"avvio automatico accesso login esecuzione automatica\",\"startup.trouble.title\":\"Se qualcosa non va\",\"startup.safe.label\":\"Avvio senza app\",\"startup.safe.description\":\"Per una volta sola: apri lilOS con ?avvio=no in fondo all’indirizzo. Le scelte salvate restano.\",\"startup.safe.keywords\":\"avvio sicuro avvio=no\",\"startup.safe.active\":\"Attivo ora\",\"startup.apps.title\":\"Si aprono quando entri\",\"startup.apps.hint\":\"Nel workspace in cui si apre lilOS, nell’ordine dell’elenco. Togli tutti i punti d’ingresso di un’app e l’app esce dall’elenco.\",\"startup.apps.none\":\"Nessuna app si apre da sola.\",\"startup.apps.oneEntry\":\"1 punto d’ingresso\",\"startup.apps.entries\":{\"one\":\"{on} di {n} punto d’ingresso\",\"other\":\"{on} di {n} punti d’ingresso\"},\"startup.apps.remove\":\"Rimuovi dall’avvio\",\"startup.apps.allAdded\":\"Tutte le app sono già all’avvio\",\"startup.apps.add\":\"Aggiungi un’app all’avvio\",\"startup.apps.addDescription\":\"Si apre la sua finestra principale; poi scegli altri punti d’ingresso e parametri\",\"startup.params.of\":\"{entry} di {app}\",\"startup.params.undescribed\":\"Questo punto d’ingresso non descrive i suoi parametri: arrivano all’app così come sono, come args.\",\"startup.params.json\":\"Parametri (JSON)\",\"startup.params.jsonOf\":\"Parametri (JSON) di {name}\",\"startup.params.invalidJson\":\"Non è JSON valido\",\"startup.params.notSaved\":\"Non salvati: {error}\",\"startup.path.noFolder\":\"Nessuna cartella\",\"startup.path.noFile\":\"Nessun file\",\"startup.path.gone\":\"(non c’è più)\",\"startup.path.clear\":\"Togli {name}\",\"services.unsupported\":\"Questa versione di lilOS non ha i servizi delle app\",\"services.status.off\":\"Spento\",\"services.status.starting\":\"Si avvia…\",\"services.status.error\":\"Fermo: {error}\",\"services.status.unknownError\":\"errore\",\"services.status.restarting\":\"Riparte… (si era fermato: {error})\",\"services.status.onNow\":\"Acceso da meno di un minuto\",\"services.status.onMinutes\":{\"one\":\"Acceso da {n} minuto\",\"other\":\"Acceso da {n} minuti\"},\"services.status.onHours\":{\"one\":\"Acceso da {n} ora\",\"other\":\"Acceso da {n} ore\"},\"services.status.onSince\":\"Acceso dal {date}\",\"services.auto.label\":\"Avvia i servizi automaticamente\",\"services.auto.noEngine\":\"Il kernel non ha il motore dei servizi (modulo services-isolate)\",\"services.auto.description\":\"Quando entri partono i tuoi servizi scelti in Servizi. Quelli scelti da un amministratore per tutti partono comunque.\",\"services.auto.keywords\":\"servizi avvio automatico background kernel\",\"services.title\":\"Servizi installati\",\"services.noEngine\":\"Il kernel non ha il motore dei servizi: serve il modulo services-isolate (AppStore → Kernel).\",\"services.none\":\"Nessuna app installata ha servizi.\",\"services.hint\":\"Le parti delle app che lavorano nel kernel, senza finestra, anche con lilOS chiuso. «All’avvio del sistema» vale per tutti gli utenti e lo sceglie un amministratore; «All’accesso» solo per te.\",\"services.startup.none\":\"Non si avvia\",\"services.startup.login\":\"All’accesso\",\"services.startup.system\":\"All’avvio del sistema\",\"services.startup.field\":\"Avvio di {name}\",\"services.restart\":\"Riavvia\",\"services.restartOf\":\"Riavvia {name}\",\"services.stop\":\"Spegni\",\"services.start\":\"Accendi\",\"services.byAdmin\":\"scelto da un amministratore\",\"services.log.label\":\"Registro\",\"services.log.title\":\"Registro di {name}\",\"services.log.empty\":\"Nessuna riga: il servizio non è ancora partito.\",\"storage.label\":\"Archiviazione\",\"storage.description.kernel\":\"Dati di lilOS salvati nella tua cartella utente.\",\"storage.description.browser\":\"Dati di lilOS salvati in questo browser.\",\"storage.space.title\":\"Spazio\",\"storage.used.label\":\"Spazio usato\",\"storage.used.description\":\"Posizioni, vista e impostazioni\",\"storage.contents.label\":\"Contenuto dei file\",\"storage.contents.description\":\"Testo salvato nei file\",\"storage.reset.title\":\"Ripristino\",\"storage.defaults.label\":\"Impostazioni predefinite\",\"storage.defaults.description\":\"Riporta impostazioni, scorciatoie, app dei tipi di file e menu ai valori iniziali\",\"storage.initial.label\":\"Scrivania e file iniziali\",\"storage.initial.description\":\"Elimina tutte le cartelle e i file creati, i workspace, i tag, le posizioni e la vista salvate, poi ricarica lilOS\",\"storage.initial.keywords\":\"reset desktop workspace tag\",\"storage.initial.button\":\"Ripristina…\",\"storage.initial.confirm\":\"Elimina e ricarica\",\"about.label\":\"Informazioni\",\"about.description\":\"Versione e ambiente.\",\"about.version\":\"Versione\",\"about.sdkVersion\":\"Versione dell’SDK\",\"about.language\":\"Lingua\",\"about.browser\":\"Browser\",\"about.unknownBrowser\":\"Sconosciuto\",\"@name\":\"Sistema\",\"@description\":\"Aspetto, lingua, workspace, tag, scorciatoie, tipi di file, servizi e app all’avvio, archiviazione.\",\"@entrypoints.main.params.tab.label\":\"Sezione\",\"@entrypoints.main.params.tab.options.appearance.label\":\"Aspetto\",\"@entrypoints.main.params.tab.options.language.label\":\"Lingua\",\"@entrypoints.main.params.tab.options.desk.label\":\"Scrivania\",\"@entrypoints.main.params.tab.options.workspaces.label\":\"Workspace\",\"@entrypoints.main.params.tab.options.tags.label\":\"Tag\",\"@entrypoints.main.params.tab.options.usability.label\":\"Usabilità\",\"@entrypoints.main.params.tab.options.apps.label\":\"App\",\"@entrypoints.main.params.tab.options.startup.label\":\"Avvio\",\"@entrypoints.main.params.tab.options.storage.label\":\"Archiviazione\",\"@entrypoints.main.params.tab.options.about.label\":\"Informazioni\"}}")
}), { t: B } = z;
// src/settings/menuEditor.js
function ue(e, { openWindow: t, rerender: n, confirmButton: r }) {
	let i = p.layout(e), o = (t) => {
		p.setLayout(e, t), n();
	}, s = (e) => {
		if (e.type === "separator") return {
			label: B("menu.separator"),
			description: ""
		};
		if (e.type === "submenu") return {
			label: e.label,
			description: B("menu.submenu", { n: e.items.length })
		};
		let t = p.action(e.action), n = e.label ?? t?.label ?? e.action;
		if (e.action === "desktop.create") {
			let t = e.params.name;
			return e.params.kind === "folder" ? {
				label: n,
				description: B("menu.create.folder", { name: t })
			} : e.params.template ? {
				label: n,
				description: B("menu.create.fileFromTemplate", {
					name: t,
					template: l.exists(e.params.template) ? l.path(e.params.template) : B("menu.create.deletedTemplate")
				})
			} : {
				label: n,
				description: e.params.content ? B("menu.create.fileWithContent", { name: t }) : B("menu.create.file", { name: t })
			};
		}
		return e.action === "app.launch" ? {
			label: n,
			description: B("menu.launch", { name: N.find((t) => t.id === e.params.app)?.name ?? e.params.app })
		} : {
			label: n,
			description: B("menu.action")
		};
	}, c = (e, t) => {
		let n = structuredClone(i);
		return t(e.length === 1 ? n : n[e[0]].items, e[e.length - 1]), n;
	}, f = (e, t) => o(c(e, (e, n) => {
		let r = n + t;
		r < 0 || r >= e.length || ([e[n], e[r]] = [e[r], e[n]]);
	})), m = (e) => o(c(e, (e, t) => e.splice(t, 1))), h = (e, t, n) => {
		let { label: r, description: i } = s(e), a = t[t.length - 1], o = (e, t, n, i) => u("button", {
			class: "mm-btn",
			type: "button",
			title: t,
			"aria-label": `${t}: ${r}`,
			disabled: i,
			onclick: n
		}, d(e));
		return {
			label: t.length === 2 ? `↳ ${r}` : r,
			description: i,
			keywords: B("menu.keywords"),
			control: u("div", { class: "mm-ctl" }, o("arrowUp", B("menu.moveUp"), () => f(t, -1), a === 0), o("arrowDown", B("menu.moveDown"), () => f(t, 1), a === n - 1), o("x", B("common.remove"), () => m(t)))
		};
	}, _ = [];
	i.forEach((e, t) => {
		_.push(h(e, [t], i.length)), e.type === "submenu" && e.items.forEach((n, r) => _.push(h(n, [t, r], e.items.length)));
	});
	let v = i.map((e, t) => [e, t]).filter(([e]) => e.type === "submenu"), y = [{
		value: "root",
		label: B("menu.target.root")
	}, ...v.map(([e, t]) => ({
		value: String(t),
		label: B("menu.target.inside", { name: e.label })
	}))], b = (e, t) => o(c(e === "root" ? [0] : [Number(e), 0], (e) => e.push(t))), x = p.actions(e).filter((e) => e.id !== "desktop.create" && e.id !== "app.launch"), S = g({
		value: x[0]?.id,
		label: B("menu.item.field"),
		options: [...x.map((e) => ({
			value: e.id,
			label: e.label
		})), ...N.filter((e) => e.load).map((e) => ({
			value: `app:${e.id}`,
			label: B("menu.item.open", { name: e.name })
		}))]
	}), C = g({
		value: "root",
		options: y,
		label: B("menu.target.label")
	}), T = g({
		value: "root",
		options: y,
		label: B("menu.target.label")
	}), E = v[0], D = w({
		placeholder: B("menu.new.labelPlaceholder"),
		label: B("menu.new.labelField")
	}), O = w({
		placeholder: B("menu.new.namePlaceholder"),
		label: B("menu.new.nameField")
	}), k = g({
		value: "file",
		options: [{
			value: "file",
			label: B("menu.new.kindFile")
		}, {
			value: "folder",
			label: B("menu.new.kindFolder")
		}],
		label: B("menu.new.kind")
	}), A = null, j = a({
		label: B("menu.template.button"),
		onClick: async () => {
			let e = await F(t, {
				title: B("menu.template.title"),
				text: B("menu.template.text")
			});
			e && (A = e.id, j.textContent = B("menu.template.chosen", { name: e.name }));
		}
	}), M = u("small", { class: "mm-note" });
	return [{
		title: p.list().find((t) => t.id === e)?.label ?? e,
		rows: _
	}, {
		title: B("common.add"),
		rows: [
			{
				label: B("menu.item.label"),
				description: B("menu.item.description"),
				control: u("div", { class: "mm-add" }, S, C, a({
					label: B("common.add"),
					onClick: () => {
						let e = S.value, t = e.startsWith("app:") ? {
							type: "action",
							action: "app.launch",
							label: B("menu.item.open", { name: N.find((t) => t.id === e.slice(4))?.name }),
							params: { app: e.slice(4) }
						} : {
							type: "action",
							action: e
						};
						b(C.value, t);
					}
				}))
			},
			{
				label: B("menu.separatorRow.label"),
				description: B("menu.separatorRow.description"),
				control: u("div", { class: "mm-add" }, T, a({
					label: B("common.add"),
					onClick: () => b(T.value, { type: "separator" })
				}))
			},
			...E ? [{
				label: B("menu.new.label", { name: E[0].label }),
				description: B("menu.new.description"),
				control: u("div", { class: "mm-add" }, D, O, k, j, a({
					label: B("common.add"),
					primary: !0,
					onClick: () => {
						let e = D.value.trim(), t = O.value.trim();
						if (!e || !t) {
							M.textContent = B("menu.new.missing");
							return;
						}
						let n = {
							kind: k.value,
							name: t,
							...A && k.value === "file" && { template: A }
						};
						b(String(E[1]), {
							type: "action",
							action: "desktop.create",
							label: e,
							icon: n.kind === "folder" ? "folderPlus" : "filePlus",
							params: n
						});
					}
				}), M)
			}] : [],
			{
				label: B("menu.defaults.label"),
				description: p.isCustom(e) ? B("menu.defaults.custom") : B("menu.defaults.default"),
				control: r(B("common.reset"), B("common.confirm"), () => {
					p.reset(e), n();
				})
			}
		]
	}];
}
// src/settings/services.js
var V = null, H = null;
function U(e) {
	D.services ? H ??= D.services.list().then((e) => {
		V = e;
	}, (e) => {
		V = { error: e.message };
	}).finally(() => {
		H = null, e();
	}) : V = { get error() {
		return B("services.unsupported");
	} };
}
function de(e) {
	return D.services?.on("change", () => U(e)) ?? null;
}
function fe(e) {
	let t = Math.round((Date.now() - e) / 6e4);
	if (t < 1) return B("services.status.onNow");
	if (t < 60) return B("services.status.onMinutes", { n: t });
	let n = Math.round(t / 60);
	return n < 48 ? B("services.status.onHours", { n }) : B("services.status.onSince", { date: z.date(e) });
}
function pe(e) {
	return e.status === "on" ? fe(e.since) : e.status === "starting" && e.error ? B("services.status.restarting", { error: e.error }) : e.status === "error" ? B("services.status.error", { error: e.error ?? B("services.status.unknownError") }) : e.status === "off" ? B("services.status.off") : e.status === "starting" ? B("services.status.starting") : e.status;
}
var W = async (e, t) => {
	try {
		await e();
	} catch (e) {
		T(e.message, { timeout: 7e3 });
	}
	U(t);
};
function me(e) {
	V || U(e);
	let t = V && !V.error && V.available, n = E({
		value: t ? V.enabled : !1,
		label: B("services.auto.label"),
		onChange: (t) => W(() => D.services.setEnabled(t), e)
	});
	return n.disabled = !t, {
		label: B("services.auto.label"),
		description: V ? V.error ? V.error : V.available ? B("services.auto.description") : B("services.auto.noEngine") : B("common.loading"),
		keywords: B("services.auto.keywords"),
		control: n
	};
}
function he(e) {
	V || U(e.rerender);
	let t = (e) => [{
		title: B("services.title"),
		rows: [{ label: e }]
	}];
	return V ? V.error ? t(V.error) : V.available ? V.services.length ? [{
		title: B("services.title"),
		content: () => u("div", { class: "su-apps" }, u("p", { class: "su-hint" }, B("services.hint")), u("div", { class: "st-card su-app" }, V.services.flatMap((t) => ge(t, e))))
	}] : t(B("services.none")) : t(B("services.noEngine")) : t(B("common.loading"));
}
function ge(e, t) {
	let { rerender: n } = t, r = `${e.name} · ${e.label}`, i = [
		{
			value: "none",
			label: B("services.startup.none")
		},
		{
			value: "login",
			label: B("services.startup.login")
		},
		...V.admin || e.startup === "system" ? [{
			value: "system",
			label: B("services.startup.system")
		}] : []
	], s = g({
		value: e.startup,
		options: i,
		label: B("services.startup.field", { name: r }),
		onChange: (t) => W(() => D.services.setStartup(e.app, e.entry, t), n)
	});
	s.disabled = e.system && !V.admin;
	let c = e.status === "on" || e.status === "starting", l = u("button", {
		class: "ctl-btn su-clear",
		type: "button",
		title: B("services.restart"),
		"aria-label": B("services.restartOf", { name: r })
	}, d("redo"));
	l.disabled = !e.canControl || !c, l.addEventListener("click", () => W(() => D.services.restart(e.app, e.entry), n));
	let f = a({
		label: B(c ? "services.stop" : "services.start"),
		spinner: !0,
		onClick: () => W(() => D.services[c ? "stop" : "start"](e.app, e.entry), n)
	});
	f.disabled = !e.canControl, f.classList.add("su-power");
	let p = a({
		label: B("services.log.label"),
		onClick: () => ve(e, t)
	});
	p.disabled = e.system && !V.admin;
	let m = u("div", { class: "st-row su-service" }, o(e, "su-icon"), u("div", { class: "st-label" }, u("b", {}, r), u("small", {}, u("span", { class: `su-state ${e.status}` }, pe(e)), " · ", u("code", {}, e.entry), e.system && !V.admin ? ` · ${B("services.byAdmin")}` : "")), s, l, f, p);
	return e.params && e.startup !== "none" ? [m, _e(e, t)] : [m];
}
function _e(e, { openWindow: t, rerender: n }) {
	let r = e.system && !V.admin, i = { ...e.values }, o = (t, r) => {
		let a = { ...i };
		r === "" || r == null ? delete a[t] : a[t] = r, i = a, W(() => D.services.setStartup(e.app, e.entry, e.startup, a), n);
	}, s = Object.entries(e.params).flatMap(([n, s]) => {
		let c = Object.hasOwn(i, n) ? i[n] : s.default, d = `${s.label} (${e.name} · ${e.label})`, f;
		if (s.type === "boolean") f = E({
			value: c === !0,
			label: d,
			onChange: (e) => o(n, e)
		});
		else if (s.type === "choice") f = g({
			value: c === void 0 ? "" : String(c),
			label: d,
			options: [{
				value: "",
				label: "—"
			}, ...s.options.map((e) => ({
				value: String(e.value),
				label: e.label
			}))],
			onChange: (e) => o(n, e === "" ? null : s.options.find((t) => String(t.value) === e)?.value)
		});
		else if (s.type === "number") f = u("input", {
			class: "ctl-text su-number",
			type: "number",
			min: s.min,
			max: s.max,
			"aria-label": d
		}), f.value = c ?? "", f.addEventListener("change", () => o(n, f.value === "" ? null : Number(f.value)));
		else if (s.type === "file" || s.type === "folder") {
			let e = w({
				value: c ?? "",
				label: d,
				placeholder: "~/…",
				onChange: (e) => o(n, e.trim())
			}), i = a({
				label: B("common.choose"),
				onClick: async () => {
					let r = await F(t, {
						kind: s.type,
						title: s.label
					});
					if (!r) return;
					let i = `~${l.path(r.id).slice(l.home.length)}`;
					e.value = i, o(n, i);
				}
			});
			i.disabled = r, f = u("div", { class: "su-path" }, e, i);
		} else f = w({
			value: c ?? "",
			label: d,
			onChange: (e) => o(n, e)
		});
		return f.querySelectorAll?.("input, select, button").forEach((e) => {
			e.disabled ||= r;
		}), f.matches?.("input, select, button") && (f.disabled ||= r), [u("label", {
			class: "su-plabel",
			title: s.description ?? ""
		}, s.label), u("div", { class: "su-field" }, f)];
	});
	return u("div", { class: "su-params" }, s);
}
async function ve(e, { openWindow: t }) {
	let n;
	try {
		n = await D.services.log(e.app, e.entry);
	} catch (e) {
		return T(e.message, { timeout: 7e3 });
	}
	let r = new i({
		title: B("services.log.title", { name: `${e.name} · ${e.label}` }),
		icon: "list",
		width: 620,
		height: 380
	}), a = (e) => new Date(e).toLocaleTimeString(_.locale);
	r.body.append(u("div", {
		class: "su-log",
		tabindex: "0",
		"aria-label": B("services.log.label")
	}, n.length ? n.map((e) => u("div", { class: `su-line ${e.level}` }, u("span", {}, a(e.at)), ` ${e.text}`)) : u("p", { class: "su-empty" }, B("services.log.empty")))), t(r);
}
// src/settings/startup.js
function ye({ rerender: e }) {
	return [{
		title: B("startup.auto.title"),
		rows: [me(e), {
			label: B("startup.openApps.label"),
			description: B("startup.openApps.description"),
			keywords: B("startup.openApps.keywords"),
			control: E({
				value: v.get("startupApps"),
				label: B("startup.openApps.label"),
				onChange: (e) => v.set("startupApps", e)
			})
		}]
	}, {
		title: B("startup.trouble.title"),
		rows: [{
			label: B("startup.safe.label"),
			description: B("startup.safe.description"),
			keywords: B("startup.safe.keywords"),
			control: L.skipped ? B("startup.safe.active") : ""
		}]
	}];
}
function be(e) {
	let t = L.apps().filter((e) => N.some((t) => t.id === e.app));
	return [{
		title: B("startup.apps.title"),
		content: () => u("div", { class: "su-apps" }, u("p", { class: "su-hint" }, B("startup.apps.hint")), t.length ? t.map((t) => xe(t, e)) : u("p", { class: "su-empty" }, B("startup.apps.none")), we(t, e))
	}];
}
function xe(e, t) {
	let n = N.find((t) => t.id === e.app), r = L.windowEntries(n.id), i = new Map(e.entries.map((e) => [e.entry, e.params])), s = r.filter((e) => i.has(e.entry)).length, c = u("div", { class: "st-row su-head" }, o(n, "su-icon"), u("div", { class: "st-label" }, u("b", {}, n.name), u("small", {}, r.length === 1 ? B("startup.apps.oneEntry") : B("startup.apps.entries", {
		on: s,
		n: r.length
	}))), a({
		label: B("startup.apps.remove"),
		onClick: () => {
			L.removeApp(n.id), t.rerender();
		}
	})), l = r.flatMap((e) => {
		let r = i.has(e.entry), a = u("div", { class: "st-row su-entry" }, E({
			value: r,
			label: `${n.name}: ${e.label}`,
			onChange: (r) => {
				try {
					L.setEntry(n.id, e.entry, r);
				} catch (e) {
					T(e.message);
				}
				t.rerender();
			}
		}), u("div", { class: "st-label" }, u("b", {}, e.label), u("small", {}, u("code", {}, e.entry))));
		return r ? [a, Se(n, e, i.get(e.entry), t)] : [a];
	});
	return u("div", { class: "st-card su-app" }, c, l);
}
function Se(e, t, n, { openWindow: r }) {
	let i = B("startup.params.of", {
		entry: t.label,
		app: e.name
	});
	if (!t.params) {
		let r = B("startup.params.undescribed"), a = u("span", { class: "su-note" }, r), o = u("textarea", {
			class: "su-json",
			spellcheck: "false",
			placeholder: "{ }",
			"aria-label": B("startup.params.jsonOf", { name: i })
		});
		return o.value = Object.keys(n).length ? JSON.stringify(n) : "", o.addEventListener("change", () => {
			let n = o.value.trim();
			try {
				let i;
				try {
					i = n ? JSON.parse(n) : {};
				} catch {
					throw Error(B("startup.params.invalidJson"));
				}
				L.setParams(e.id, t.entry, i), o.removeAttribute("aria-invalid"), a.classList.remove("bad"), a.textContent = r;
			} catch (e) {
				o.setAttribute("aria-invalid", "true"), a.classList.add("bad"), a.textContent = B("startup.params.notSaved", { error: e.message });
			}
		}), u("div", { class: "su-params" }, u("span", { class: "su-plabel" }, B("startup.params.json")), u("span"), o, a);
	}
	let a = { ...n }, o = (n, r) => {
		let i = { ...a };
		r === "" || r == null ? delete i[n] : i[n] = r;
		try {
			return L.setParams(e.id, t.entry, i), a = i, !0;
		} catch (e) {
			return T(e.message, { timeout: 6e3 }), !1;
		}
	}, s = Object.entries(t.params).flatMap(([e, t]) => {
		let n = Object.hasOwn(a, e) ? a[e] : t.default, s = `${t.label} (${i})`, c;
		if (t.type === "boolean") c = E({
			value: n === !0,
			label: s,
			onChange: (t) => o(e, t)
		});
		else if (t.type === "choice") {
			let r = [{
				value: "",
				label: "—"
			}, ...t.options.map((e) => ({
				value: String(e.value),
				label: e.label
			}))];
			c = g({
				value: n === void 0 ? "" : String(n),
				options: r,
				label: s,
				onChange: (n) => o(e, n === "" ? null : t.options.find((e) => String(e.value) === n)?.value)
			});
		} else t.type === "number" ? (c = u("input", {
			class: "ctl-text su-number",
			type: "number",
			min: t.min,
			max: t.max,
			"aria-label": s
		}), c.value = n ?? "", c.addEventListener("change", () => {
			o(e, c.value === "" ? null : Number(c.value)) || (c.value = a[e] ?? "");
		})) : t.type === "file" || t.type === "folder" ? c = Ce(t, n, s, (t) => o(e, t), r) : (c = w({
			value: n ?? "",
			label: s,
			onChange: (t) => {
				o(e, t) || (c.value = a[e] ?? "");
			}
		}), t.maxLength && (c.maxLength = t.maxLength));
		return [u("label", {
			class: "su-plabel",
			title: t.description ?? ""
		}, t.label), u("div", { class: "su-field" }, c)];
	});
	return u("div", { class: "su-params" }, s);
}
function Ce(e, t, n, r, i) {
	let o = e.type === "folder", s = u("input", {
		class: "ctl-text",
		type: "text",
		readonly: !0,
		placeholder: B(o ? "startup.path.noFolder" : "startup.path.noFile"),
		"aria-label": n
	}), c = (e) => {
		s.value = e ? l.exists(e) ? l.path(e) : B("startup.path.gone") : "";
	};
	c(t);
	let f = a({
		label: B("common.choose"),
		onClick: async () => {
			let t = await F(i, {
				kind: o ? "folder" : "file",
				title: e.label
			});
			t && r(t.id) && c(t.id);
		}
	}), p = u("button", {
		class: "ctl-btn su-clear",
		type: "button",
		title: B("common.remove"),
		"aria-label": B("startup.path.clear", { name: e.label })
	}, d("x"));
	return p.addEventListener("click", () => {
		r(null) && c(null);
	}), u("div", { class: "su-path" }, s, f, p);
}
function we(e, { rerender: t }) {
	let n = a({
		label: B("common.addMore"),
		onClick: () => {
			let r = N.filter((t) => t.load && !e.some((e) => e.app === t.id) && L.windowEntries(t.id).length).sort((e, t) => e.name.localeCompare(t.name));
			if (!r.length) return T(B("startup.apps.allAdded"));
			let i = n.getBoundingClientRect();
			m(i.left, i.bottom + 4, r.map((e) => ({
				label: e.name,
				icon: e.glyph,
				action: () => {
					try {
						L.addApp(e.id);
					} catch (e) {
						T(e.message);
					}
					t();
				}
			})));
		}
	});
	return u("div", { class: "st-row su-add" }, u("span", { class: "su-plus" }, d("plus")), u("div", { class: "st-label" }, u("b", {}, B("startup.apps.add")), u("small", {}, B("startup.apps.addDescription"))), n);
}
// src/settings/SettingsApp.js
var G = null;
function Te(e) {
	let t = R(), n = t?.list().find((t) => t.id === e);
	return n ? [
		{
			title: B("workspaces.current.title"),
			rows: [
				{
					label: B("common.name"),
					keywords: B("workspaces.name.keywords"),
					control: () => {
						let e = w({
							value: n.name,
							label: B("workspaces.name.field"),
							onChange: (e) => t.rename(n.id, e)
						});
						return e.maxLength = j.MAX_NAME, e;
					}
				},
				{
					label: B("common.color"),
					description: B("workspaces.color.description"),
					keywords: B("workspaces.color.keywords"),
					control: () => S({
						value: n.color,
						colors: O,
						onChange: (e) => t.setColor(n.id, e)
					})
				},
				{
					label: B("workspaces.owned.label"),
					description: B("workspaces.owned.description"),
					control: String(t.ownedCount(n.id))
				},
				e !== t.currentId && {
					label: B("workspaces.switch.label"),
					keywords: B("workspaces.list.keywords"),
					control: () => a({
						label: B("workspaces.list.switch"),
						onClick: () => t.switchTo(e)
					})
				}
			].filter(Boolean)
		},
		{
			title: B("workspaces.apps.title"),
			rows: N.map((r) => ({
				label: r.name,
				description: r.system ? B("workspaces.apps.system") : B("workspaces.apps.installed"),
				keywords: B("workspaces.apps.keywords", { name: r.name }),
				control: r.system ? B("workspaces.apps.alwaysVisible") : () => E({
					value: t.isInstalled(r.id, e),
					label: e === t.currentId ? B("workspaces.apps.toggle", { name: r.name }) : B("workspaces.apps.toggleIn", {
						name: r.name,
						workspace: n.name
					}),
					onChange: (n) => t.setInstalled(r.id, n, e)
				})
			}))
		},
		...Me(e)
	] : [];
}
var Ee = {
	id: "current",
	get label() {
		return B("workspaces.current.label");
	},
	sections: () => Te(R()?.currentId)
}, De = {
	id: "all",
	get label() {
		return B("workspaces.all.label");
	},
	sections: ke
}, K = /* @__PURE__ */ new Map();
function Oe() {
	let e = R();
	return [
		Ee,
		...(e?.list() ?? []).filter((t) => t.id !== e.currentId).map((e) => (K.has(e.id) || K.set(e.id, {
			id: `ws-${e.id}`,
			get label() {
				return R()?.describe(e.id)?.name ?? "";
			},
			sections: () => Te(e.id)
		}), K.get(e.id))),
		De
	];
}
function ke() {
	let e = R();
	if (!e) return [];
	let t = e.list();
	return [
		{
			title: B("workspaces.label"),
			rows: [...t.map((n) => {
				let r = n.id === e.currentId, i = N.filter((t) => e.isInstalled(t.id, n.id)).length;
				return {
					label: r ? B("workspaces.list.current", { name: n.name }) : n.name,
					description: `${B("workspaces.list.owned", { n: e.ownedCount(n.id) })} · ${B("workspaces.list.apps", { n: i })}`,
					keywords: B("workspaces.list.keywords"),
					control: () => u("div", { class: "ws-settings-actions" }, r ? null : a({
						label: B("workspaces.list.switch"),
						onClick: () => e.switchTo(n.id)
					}), t.length > 1 ? Q(B("common.delete"), B("common.deleteNow"), () => e.remove(n.id)) : null)
				};
			}), {
				label: B("workspaces.new.label"),
				description: B("workspaces.new.description"),
				control: a({
					label: B("common.create"),
					onClick: () => {
						let t = e.create();
						t && e.switchTo(t);
					}
				})
			}]
		},
		...Ne(),
		{
			title: B("workspaces.deleting.title"),
			rows: [{
				label: B("workspaces.deleting.files.label"),
				description: B("workspaces.deleting.files.description")
			}, {
				label: B("workspaces.deleting.windows.label"),
				description: B("workspaces.deleting.windows.description")
			}]
		}
	];
}
var q = [];
function Ae() {
	let e = (e) => {
		try {
			let t = C.create({ name: e.value });
			q.length && oe(q, t.id, !0), q = [];
		} catch (t) {
			T(t.message), e.focus();
		}
	}, t = q.filter((e) => l.exists(e)).length;
	return [{
		title: B("tags.new.title"),
		rows: [{
			label: B("common.name"),
			description: t ? B("tags.new.pending", { n: t }) : B("tags.new.description"),
			keywords: B("tags.new.keywords"),
			control: () => {
				let t = w({
					placeholder: B("tags.new.placeholder"),
					label: B("tags.new.field")
				});
				return t.maxLength = 30, t.classList.add("tag-new-name"), t.addEventListener("keydown", (n) => {
					n.key === "Enter" && (n.preventDefault(), e(t));
				}), u("div", { class: "tag-settings-actions" }, t, a({
					label: B("common.create"),
					primary: !0,
					onClick: () => e(t)
				}));
			}
		}]
	}, ...C.list().map((e) => ({
		title: e.name,
		rows: [
			{
				label: B("common.name"),
				keywords: B("tags.name.keywords"),
				control: () => {
					let t = w({
						value: e.name,
						label: B("tags.name.field", { name: e.name }),
						onChange: (n) => {
							try {
								C.rename(e.id, n);
							} catch (n) {
								T(n.message), t.value = C.get(e.id)?.name ?? "";
							}
						}
					});
					return t.maxLength = 30, t;
				}
			},
			{
				label: B("common.color"),
				keywords: B("tags.color.keywords"),
				control: () => S({
					value: e.color,
					colors: r,
					onChange: (t) => C.setColor(e.id, t)
				})
			},
			{
				label: B("tags.visible.label"),
				description: e.visible ? B("tags.visible.on") : B("tags.visible.off"),
				keywords: B("tags.visible.keywords"),
				control: () => E({
					value: e.visible,
					label: B("tags.visible.toggle", { name: e.name }),
					onChange: (t) => C.setVisible(e.id, t)
				})
			},
			{
				label: B("common.items"),
				description: B("tags.items.description", { n: l.tagged(e.id).length }),
				control: () => u("div", { class: "tag-settings-actions" }, a({
					label: B("tags.items.show"),
					onClick: () => P("files", { tag: e.id })
				}), Q(B("common.delete"), B("tags.items.delete"), () => C.remove(e.id)))
			}
		]
	}))];
}
function J(e, t) {
	let n = D.DESK_FIXED_ITEMS ?? [];
	return n.length ? [{
		title: B("desk.fixed.title"),
		rows: [{
			label: B("desk.fixed.label"),
			description: e
		}, ...n.map((e) => ({
			label: e.name,
			description: e.description,
			keywords: B("desk.fixed.keywords", { name: e.name }),
			...t(e)
		}))]
	}] : [];
}
var je = () => typeof D.setFixedShownEverywhere == "function";
function Me(e) {
	if (!je()) return [];
	let t = R(), n = (n) => e === t?.currentId ? B("desk.fixed.toggle", { name: n }) : B("desk.fixed.toggleIn", {
		name: n,
		workspace: t?.describe(e)?.name ?? ""
	});
	return J(B("desk.fixed.descriptionWorkspace"), (t) => ({ control: () => E({
		value: D.isFixedShown(t.key, e),
		label: n(t.name),
		onChange: (n) => D.setFixedShown(t.key, n, e)
	}) }));
}
function Ne() {
	let e = R();
	if (je() && e) {
		let t = e.list();
		return J(B("desk.fixed.descriptionAll"), (e) => {
			let n = t.filter((t) => D.isFixedShown(e.key, t.id)).length;
			return {
				description: n && n < t.length ? B("desk.fixed.some", {
					on: n,
					n: t.length
				}) : e.description,
				control: () => E({
					value: n === t.length,
					label: B("desk.fixed.toggleAll", { name: e.name }),
					onChange: (t) => D.setFixedShownEverywhere(e.key, t)
				})
			};
		});
	}
	let t = typeof D.setFixedShown == "function";
	return J(B(t ? "desk.fixed.descriptionSwitchable" : "desk.fixed.description"), (e) => ({ control: t ? () => E({
		value: D.isFixedShown(e.key),
		label: B("desk.fixed.toggle", { name: e.name }),
		onChange: (t) => D.setFixedShown(e.key, t)
	}) : B("desk.fixed.always") }));
}
function Pe() {
	return (D.DESK_FIXED_ITEMS ?? []).length ? [{
		title: B("desk.fixed.title"),
		rows: [{
			label: B("desk.fixed.moved.label"),
			description: B("desk.fixed.moved.description"),
			keywords: B("desk.fixed.moved.keywords"),
			control: () => a({
				label: B("desk.fixed.moved.open"),
				onClick: () => G?.select("workspaces", "current")
			})
		}]
	}] : [];
}
var Y = (e) => () => E({
	value: v.get(e),
	onChange: (t) => v.set(e, t)
}), X = [
	"Generale",
	"Scrivania",
	"Elementi",
	"Finestre"
];
function Fe() {
	let e = new Set(ie()), t = /* @__PURE__ */ new Set(), n = (e) => {
		t.add(e);
		let n = te(e);
		return {
			label: e ? `.${e}` : B("fileTypes.noExtension"),
			description: n ? B("fileTypes.default", { app: n.name }) : B("fileTypes.noDefault"),
			keywords: B("fileTypes.keywords", { ext: e }),
			control: () => g({
				value: M(e)?.id ?? "ask",
				label: e ? B("fileTypes.field", { ext: e }) : B("fileTypes.fieldNoExtension"),
				options: [{
					value: "ask",
					label: B("fileTypes.ask")
				}, ...re().map((e) => ({
					value: e.id,
					label: e.name
				}))],
				onChange: (t) => ae(e, t)
			})
		};
	}, r = c().map((t) => ({
		title: t.label,
		rows: t.exts.filter((t) => e.has(t)).map(n)
	})).filter((e) => e.rows.length), i = [...e].filter((e) => !t.has(e)).sort((e, t) => e === "" ? -1 : t === "" ? 1 : e.localeCompare(t));
	return [
		{
			title: B("fileTypes.title"),
			rows: [{
				label: B("fileTypes.all.label"),
				description: B("fileTypes.all.description"),
				control: Q(B("fileTypes.all.reset"), B("common.confirm"), () => {
					I(), G?.render();
				})
			}]
		},
		...r,
		...i.length ? [{
			title: B("fileTypes.others"),
			rows: i.map(n)
		}] : []
	];
}
function Ie() {
	let e = l.trashed(), t = e.reduce((e, t) => e + t.bytes, 0);
	return [{
		title: B("trash.deleting.title"),
		rows: [{
			label: B("trash.confirm.label"),
			description: B("trash.confirm.description"),
			keywords: B("trash.confirm.keywords"),
			control: Y("deleteConfirm")
		}, {
			label: B("trash.permanent.label"),
			description: B("trash.permanent.description"),
			keywords: B("trash.permanent.keywords"),
			control: Y("deletePermanent")
		}]
	}, {
		title: B("trash.label"),
		rows: [
			{
				label: B("trash.retention.label"),
				description: B("trash.retention.description"),
				keywords: B("trash.retention.keywords"),
				control: () => {
					let e = v.get("trashRetention"), t = A.some((t) => t.value === e) ? A : [...A, {
						value: e,
						label: e > 0 ? B("trash.retention.days", { n: e }) : B("trash.retention.forever")
					}];
					return g({
						value: e,
						label: B("trash.retention.field"),
						options: t,
						onChange: (e) => v.set("trashRetention", Number(e))
					});
				}
			},
			{
				label: B("trash.contents.label"),
				description: e.length ? B("trash.contents.description", {
					n: e.length,
					size: $(t)
				}) : B("trash.contents.empty"),
				keywords: B("trash.contents.keywords"),
				control: a({
					label: B("trash.contents.open"),
					onClick: () => P("files", { trash: !0 })
				})
			},
			{
				label: B("trash.empty.label"),
				description: B("trash.empty.description"),
				keywords: B("trash.empty.keywords"),
				control: e.length ? Q(B("trash.empty.button"), B("trash.empty.confirm"), () => l.purgeTrash()) : B("trash.empty.none")
			}
		]
	}];
}
function Z(e = l.root) {
	return l.children(e).reduce((e, t) => e + (t.type === "folder" ? Z(t.id) : t.size ?? 0), 0);
}
function Le() {
	let e = /* @__PURE__ */ new Map();
	for (let t of b.list()) e.has(t.group) || e.set(t.group, []), e.get(t.group).push(t);
	let t = (e) => X.includes(e) ? X.indexOf(e) : X.length;
	return [
		{
			title: B("shortcuts.title"),
			rows: [{
				label: B("shortcuts.all.label"),
				description: B("shortcuts.all.description"),
				control: Q(B("shortcuts.all.reset"), B("common.confirm"), () => b.resetAll())
			}]
		},
		...[...e].sort(([e], [n]) => t(e) - t(n)).map(([e, t]) => ({
			title: e,
			rows: t.map((e) => ({
				label: e.label,
				keywords: B("shortcuts.keywords", { keys: e.keys.map((e) => b.format(e)).join(" ") }),
				control: y(e.id)
			}))
		})),
		{
			title: B("shortcuts.mouse.title"),
			rows: [
				{
					label: B("shortcuts.lasso.label"),
					description: B("shortcuts.lasso.description"),
					keywords: B("shortcuts.lasso.keywords"),
					control: () => g({
						value: v.get("lasso"),
						options: k,
						onChange: (e) => v.set("lasso", e)
					})
				},
				{
					label: B("shortcuts.rectangle.label"),
					control: B("shortcuts.rectangle.control")
				},
				{
					label: B("shortcuts.addToSelection.label"),
					control: B("shortcuts.addToSelection.control")
				},
				{
					label: B("shortcuts.pan.label"),
					control: B("shortcuts.pan.control")
				}
			]
		},
		{
			title: B("shortcuts.fixed.title"),
			rows: [{
				label: B("shortcuts.navigate.label"),
				control: B("shortcuts.navigate.control")
			}, {
				label: B("shortcuts.rename.label"),
				control: B("shortcuts.rename.control")
			}]
		}
	];
}
var Re = () => ({
	isolated: B("apps.mode.isolated"),
	open: B("apps.mode.open"),
	system: B("apps.mode.system"),
	remote: B("apps.mode.remote")
});
function ze() {
	let e = ee(), { isolated: t } = s.security(), n = N.filter((e) => e.package && !e.package.system);
	return [{
		title: B("apps.execution.title"),
		rows: [{
			label: B("apps.isolated.label"),
			description: B(e ? "apps.isolated.description" : "apps.isolated.adminOnly"),
			keywords: B("apps.isolated.keywords"),
			control: e ? E({
				value: t,
				label: B("apps.isolated.label"),
				onChange: async (e) => {
					try {
						await s.setSecurity({ isolated: e });
					} catch (e) {
						T(B("apps.isolated.failed", { error: e.message }));
					}
					G?.render();
				}
			}) : B(t ? "common.yes" : "common.no")
		}, {
			label: B("apps.system.label"),
			description: B("apps.system.description")
		}]
	}, {
		title: B("apps.installed.title"),
		rows: n.length ? n.map((e) => {
			let t = ne(e.package), n = t.fixed ? t.reason : t.own === null ? B("apps.installed.shared") : B("apps.installed.own");
			return {
				label: e.name,
				description: `${Re()[t.mode]} · ${n}`,
				keywords: B("apps.installed.keywords"),
				control: a({
					label: B("apps.installed.properties"),
					onClick: () => se(e.id)
				})
			};
		}) : [{ label: B("apps.installed.none") }]
	}];
}
function Q(e, t, n) {
	let r = 0, i = a({
		label: e,
		onClick: () => {
			if (!i.classList.contains("primary")) {
				i.textContent = t, i.classList.add("danger", "primary"), r = setTimeout(o, 4e3);
				return;
			}
			clearTimeout(r);
			let e = n();
			typeof e?.then == "function" ? (i.disabled = !0, i.setAttribute("aria-busy", "true"), e.catch((e) => T(e.message, { timeout: 7e3 })).finally(() => {
				i.disabled = !1, i.removeAttribute("aria-busy"), o();
			})) : o();
		}
	}), o = () => {
		i.textContent = e, i.classList.remove("danger", "primary");
	};
	return i;
}
function Be() {
	return x.bytes();
}
function $(e) {
	return e == null ? B("common.unavailable") : e < 1024 ? `${e} B` : `${(e / 1024).toLocaleString(_.locale, { maximumFractionDigits: 1 })} KB`;
}
var Ve = [
	[/Edg\/(\d+)/, "Edge"],
	[/Firefox\/(\d+)/, "Firefox"],
	[/Chrome\/(\d+)/, "Chrome"],
	[/Version\/(\d+).*Safari/, "Safari"]
];
function He() {
	for (let [e, t] of Ve) {
		let n = navigator.userAgent.match(e);
		if (n) return `${t} ${n[1]}`;
	}
	return B("about.unknownBrowser");
}
function Ue(e, t = e) {
	try {
		return new Intl.DisplayNames([t], { type: "language" }).of(e) ?? e;
	} catch {
		return e;
	}
}
function We() {
	let t = v.get("language"), n = [...e.LANGUAGES ?? []];
	t !== "auto" && !n.includes(t) && n.push(t);
	let r = (e) => {
		let t = Ue(e);
		return t.charAt(0).toUpperCase() + t.slice(1);
	};
	return [{
		title: B("language.title"),
		rows: [{
			label: B("language.label"),
			description: B("language.row.description"),
			keywords: B("language.keywords"),
			control: () => g({
				value: t,
				label: B("language.label"),
				options: [{
					value: "auto",
					label: B("language.auto", { name: Ue(navigator.language || "en", z.lang) })
				}, ...n.map((e) => ({
					value: e,
					label: r(e)
				}))],
				onChange: (e) => v.set("language", e)
			})
		}]
	}];
}
function Ge({ openWindow: r, args: i } = {}) {
	let a = new n({
		title: B("window.title"),
		icon: "gear",
		width: 760,
		height: 500,
		tabs: [
			{ get group() {
				return B("group.system");
			} },
			{
				id: "appearance",
				icon: "palette",
				get label() {
					return B("appearance.label");
				},
				get description() {
					return B("appearance.description");
				},
				subtabs: [{
					id: "colors",
					get label() {
						return B("appearance.colors.label");
					},
					sections: () => [{
						title: B("appearance.theme.label"),
						rows: [{
							label: B("appearance.theme.label"),
							description: B("appearance.theme.description"),
							keywords: B("appearance.theme.keywords"),
							control: h({
								value: v.get("theme"),
								label: B("appearance.theme.label"),
								options: [{
									value: "light",
									label: B("appearance.theme.light")
								}, {
									value: "dark",
									label: B("appearance.theme.dark")
								}],
								onChange: (e) => v.set("theme", e)
							})
						}]
					}, {
						title: B("appearance.accent.title"),
						rows: [{
							label: B("common.color"),
							description: B("appearance.accent.description"),
							keywords: B("appearance.accent.keywords"),
							control: S({
								value: v.get("accent"),
								colors: O,
								onChange: (e) => v.set("accent", e)
							})
						}]
					}]
				}, {
					id: "motion",
					get label() {
						return B("appearance.motion.label");
					},
					sections: () => [{
						title: B("appearance.animations.label"),
						rows: [{
							label: B("appearance.animations.label"),
							description: B("appearance.animations.description"),
							keywords: B("appearance.animations.keywords"),
							control: Y("motion")
						}]
					}]
				}]
			},
			e.locale && {
				id: "language",
				icon: "globe",
				get label() {
					return B("language.label");
				},
				get description() {
					return B("language.description");
				},
				sections: We
			},
			{
				id: "desk",
				icon: "grid",
				get label() {
					return B("desk.label");
				},
				get description() {
					return B("desk.description");
				},
				subtabs: [{
					id: "items",
					get label() {
						return B("common.items");
					},
					sections: () => [...Pe(), {
						title: B("desk.placement.title"),
						rows: [{
							label: B("desk.snap.label"),
							description: B("desk.snap.description"),
							keywords: B("desk.snap.keywords"),
							control: Y("snap")
						}]
					}]
				}, {
					id: "overview",
					get label() {
						return B("desk.overview.label");
					},
					sections: () => [{
						title: B("desk.overview.title"),
						rows: [{
							label: B("desk.minimap.label"),
							keywords: B("desk.minimap.keywords"),
							control: Y("minimap")
						}]
					}]
				}]
			},
			{
				id: "workspaces",
				icon: "workspace",
				get label() {
					return B("workspaces.label");
				},
				get description() {
					return B("workspaces.description");
				},
				get subtabs() {
					return Oe();
				}
			},
			{
				id: "tags",
				icon: "tag",
				get label() {
					return B("tags.label");
				},
				get description() {
					return B("tags.description");
				},
				sections: Ae
			},
			{
				id: "usability",
				icon: "accessibility",
				get label() {
					return B("usability.label");
				},
				get description() {
					return B("usability.description");
				},
				subtabs: [
					{
						id: "shortcuts",
						get label() {
							return B("shortcuts.label");
						},
						sections: Le
					},
					{
						id: "filetypes",
						get label() {
							return B("fileTypes.label");
						},
						sections: Fe
					},
					{
						id: "contextmenu",
						get label() {
							return B("menu.label");
						},
						sections: () => ue("desktop.background", {
							openWindow: r,
							confirmButton: Q,
							rerender: () => G?.render()
						})
					},
					{
						id: "trash",
						get label() {
							return B("trash.label");
						},
						sections: Ie
					}
				]
			},
			{
				id: "apps",
				icon: "window",
				get label() {
					return B("apps.label");
				},
				get description() {
					return B("apps.description");
				},
				subtabs: [{
					id: "security",
					get label() {
						return B("apps.security.label");
					},
					sections: ze
				}]
			},
			{
				id: "startup",
				icon: "power",
				get label() {
					return B("startup.label");
				},
				get description() {
					return B("startup.description");
				},
				subtabs: [
					{
						id: "options",
						get label() {
							return B("startup.options.label");
						},
						sections: () => ye({ rerender: () => G?.render() })
					},
					{
						id: "services",
						get label() {
							return B("startup.services.label");
						},
						sections: () => he({
							openWindow: r,
							rerender: () => G?.render()
						})
					},
					{
						id: "apps",
						get label() {
							return B("startup.apps.label");
						},
						sections: () => be({
							openWindow: r,
							rerender: () => G?.render()
						})
					}
				]
			},
			{ get group() {
				return B("group.data");
			} },
			{
				id: "storage",
				icon: "disk",
				get label() {
					return B("storage.label");
				},
				get description() {
					return f.connected ? B("storage.description.kernel") : B("storage.description.browser");
				},
				sections: () => [{
					title: B("storage.space.title"),
					rows: [{
						label: B("storage.used.label"),
						description: B("storage.used.description"),
						control: $(Be())
					}, {
						label: B("storage.contents.label"),
						description: B("storage.contents.description"),
						control: $(Z())
					}]
				}, {
					title: B("storage.reset.title"),
					rows: [{
						label: B("storage.defaults.label"),
						description: B("storage.defaults.description"),
						control: Q(B("common.reset"), B("common.confirm"), () => {
							[
								"accent",
								"theme",
								"motion",
								"snap",
								"minimap",
								"lasso",
								"deleteConfirm",
								"deletePermanent",
								"trashRetention",
								"startupApps",
								...e.locale ? ["language"] : []
							].forEach((e) => v.reset(e)), b.resetAll(), I(), p.list().forEach((e) => p.reset(e.id));
						})
					}, {
						label: B("storage.initial.label"),
						description: B("storage.initial.description"),
						keywords: B("storage.initial.keywords"),
						control: Q(B("storage.initial.button"), B("storage.initial.confirm"), async () => {
							await l.reset(), [
								"workspaces",
								"tags",
								"desktop-layout",
								"desktop",
								"camera",
								"workareas",
								"editor-tree",
								"files-sidebar",
								"app-setup"
							].forEach((e) => x.remove(e)), await f.flush().catch(() => {}), location.reload();
						})
					}]
				}]
			},
			{ group: "" },
			{
				id: "about",
				icon: "info",
				get label() {
					return B("about.label");
				},
				get description() {
					return B("about.description");
				},
				sections: () => [{
					title: "lilOS",
					rows: [
						{
							label: B("about.version"),
							control: ce
						},
						{
							label: B("about.sdkVersion"),
							control: t
						},
						{
							label: B("about.language"),
							control: _.locale
						},
						{
							label: B("about.browser"),
							control: He()
						}
					]
				}]
			}
		].filter(Boolean)
	});
	G = a.view;
	let o = (e) => {
		Array.isArray(e?.tagFor) && (q = e.tagFor.filter((e) => typeof e == "string" && l.exists(e))), typeof e?.tab == "string" && a.view.select(e.tab, typeof e.subtab == "string" ? e.subtab : void 0), e?.tab === "tags" && a.view.panel.querySelector(".tag-new-name")?.focus();
	};
	o(i), a.on("launch", o);
	let c = () => a.view.tab?.subtabs?.length && !a.view.subtab ? a.view.select(a.view.tab.id) : a.view.render(), u = [R()?.on("change", c), R()?.on("switch", c)], d = l.on("trash", () => a.view.render()), m = C.on("change", () => a.view.render()), g = [
		s.on("change", () => a.view.render()),
		s.on("security", () => a.view.render()),
		de(() => a.view.render())
	], y = v.on("change:deskHidden", () => a.view.render()), w = () => a.setTitle(B("window.title"), a.view.tab?.label ?? "");
	a.view.on("select", w);
	let T = e.locale?.on("change", () => {
		a.view.render(), w();
	});
	return a.on("destroy", () => {
		u.forEach((e) => e?.()), d(), m(), y(), T?.(), g.forEach((e) => e?.()), G === a.view && (G = null);
	}), a;
}
export { Ge as default };
