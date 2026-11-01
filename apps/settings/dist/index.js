import * as e from "/host/sdk.js";
import { SDK_VERSION as t, SettingsWindow as n, TAG_COLORS as r, Window as i, actionButton as a, appIcon as o, apps as s, fileTypeList as c, fs as l, h as u, icon as d, kernel as f, menus as p, openMenu as m, segmented as h, selectField as g, session as _, settings as v, shortcutField as y, shortcuts as b, storage as x, swatches as S, tags as C, textField as w, toast as T, toggle as E } from "/host/sdk.js";
import * as D from "/host/system.js";
import { ACCENTS as O, LASSO_OPTIONS as k, RETENTION_OPTIONS as A, WORKSPACE_LIMITS as j, appFor as M, apps as N, canChangeExecution as ee, defaultAppFor as te, executionMode as ne, fileApps as re, knownExtensions as ie, launch as ae, pickFile as P, resetAppsFor as oe, setAppFor as se, setTag as ce, showAppSecurity as le, startup as F, version as ue, workspaceManager as I } from "/host/system.js";
// src/shared/i18n.js
function de(t, n) {
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
var L = de("settings", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"window.title\":\"Control Panel\",\"group.system\":\"System\",\"group.data\":\"Data\",\"common.name\":\"Name\",\"common.color\":\"Color\",\"common.items\":\"Items\",\"common.create\":\"Create\",\"common.add\":\"Add\",\"common.addMore\":\"Add…\",\"common.choose\":\"Choose…\",\"common.remove\":\"Remove\",\"common.delete\":\"Delete…\",\"common.deleteNow\":\"Delete\",\"common.reset\":\"Reset\",\"common.confirm\":\"Confirm\",\"common.loading\":\"Loading…\",\"common.unavailable\":\"Not available\",\"common.yes\":\"Yes\",\"common.no\":\"No\",\"appearance.label\":\"Appearance\",\"appearance.description\":\"Colors and motion of the interface.\",\"appearance.colors.label\":\"Colors\",\"appearance.theme.label\":\"Theme\",\"appearance.theme.description\":\"Light or dark: desk, taskbar, menus and windows\",\"appearance.theme.keywords\":\"theme light dark night mode\",\"appearance.theme.light\":\"Light\",\"appearance.theme.dark\":\"Dark\",\"appearance.accent.title\":\"Accent color\",\"appearance.accent.description\":\"Selection, buttons, active tabs and logo\",\"appearance.accent.keywords\":\"accent theme highlight\",\"appearance.motion.label\":\"Motion\",\"appearance.animations.label\":\"Animations\",\"appearance.animations.description\":\"View movements, menus and transitions. If the operating system asks for reduced motion, they stay reduced.\",\"appearance.animations.keywords\":\"motion movement transitions\",\"language.label\":\"Language\",\"language.description\":\"The language of apps: their texts, dates and numbers.\",\"language.title\":\"System language\",\"language.row.description\":\"Apps without this language use English. lilOS’s own texts are still in Italian.\",\"language.keywords\":\"language translation locale english italian dates numbers\",\"language.auto\":\"Automatic: {name}\",\"desk.label\":\"Desk\",\"desk.description\":\"How the infinite desk behaves.\",\"desk.fixed.title\":\"Fixed items\",\"desk.fixed.label\":\"On the desk\",\"desk.fixed.descriptionSwitchable\":\"The ones turned on are on the desk of every workspace. They open and move like other items, but cannot be renamed or deleted: you remove them here.\",\"desk.fixed.description\":\"They are on the desk of every workspace. They open and move like other items, but cannot be renamed or deleted.\",\"desk.fixed.keywords\":\"fixed items desk show hide delete {name}\",\"desk.fixed.toggle\":\"{name} on the desk\",\"desk.fixed.toggleIn\":\"{name} on the desk of {workspace}\",\"desk.fixed.always\":\"Fixed\",\"desk.fixed.item.home.name\":\"Home\",\"desk.fixed.item.home.description\":\"The main folder, with all the others\",\"desk.fixed.item.documents.name\":\"Documenti\",\"desk.fixed.item.documents.description\":\"The Documenti folder, shared by every workspace\",\"desk.fixed.item.images.name\":\"Immagini\",\"desk.fixed.item.images.description\":\"The Immagini folder, shared by every workspace\",\"desk.fixed.item.files.name\":\"File Manager\",\"desk.fixed.item.files.description\":\"Opens the File Manager\",\"desk.fixed.item.downloads.name\":\"Download\",\"desk.fixed.item.downloads.description\":\"The Download folder, shared by every workspace\",\"desk.fixed.item.trash.name\":\"Trash\",\"desk.fixed.item.trash.description\":\"Opens the trash; files and folders can be dragged onto it\",\"desk.fixed.descriptionWorkspace\":\"The ones turned on are on this workspace's desk. They open and move like other items, but cannot be renamed or deleted: you remove them here.\",\"desk.fixed.descriptionAll\":\"Turn one on or off in every workspace at once; new workspaces get the same. Each workspace can then change it in its own tab.\",\"desk.fixed.some\":\"On in {on} of {n} workspaces\",\"desk.fixed.toggleAll\":\"{name} on every desk\",\"desk.fixed.moved.label\":\"Each workspace has its own\",\"desk.fixed.moved.description\":\"Choose them in Workspaces: in each workspace's tab, or in All for every desk.\",\"desk.fixed.moved.keywords\":\"fixed items desk home documents trash workspace\",\"desk.fixed.moved.open\":\"Open\",\"desk.placement.title\":\"Placement\",\"desk.snap.label\":\"Snap to grid\",\"desk.snap.description\":\"Dragged items line up on an invisible grid\",\"desk.snap.keywords\":\"icons snap grid align\",\"desk.previews.title\":\"Icons\",\"desk.previews.label\":\"Show file previews\",\"desk.previews.description\":\"Files show a small image of what they contain, made by the app that opens them (Photo, Editor…), in place of their icon\",\"desk.previews.keywords\":\"previews thumbnails icons images files\",\"desk.background.label\":\"Background\",\"desk.background.color.title\":\"Color\",\"desk.background.color.description\":\"Behind the items, and around images that are transparent\",\"desk.background.color.keywords\":\"background color desk wallpaper\",\"desk.background.custom.label\":\"Other color\",\"desk.background.custom.description\":\"Any color you like\",\"desk.background.theme.label\":\"Theme color\",\"desk.background.theme.description\":\"Back to the color of the light or dark theme\",\"desk.background.theme.button\":\"Use the theme color\",\"desk.background.image.title\":\"Image\",\"desk.background.image.label\":\"Background image\",\"desk.background.image.keywords\":\"background image wallpaper picture photo desk\",\"desk.background.image.current\":\"«{name}»: it fills the desk keeping its proportions, and does not move or zoom with it\",\"desk.background.image.none\":\"None: only the color. In the menu of an image on the desk: Use as desktop background\",\"desk.background.image.choose\":\"Choose…\",\"desk.background.image.pick\":\"Choose the background image\",\"desk.background.image.remove.label\":\"Remove the image\",\"desk.background.image.remove.description\":\"The file stays where it is\",\"desk.background.image.remove.button\":\"Remove\",\"desk.overview.label\":\"Overview\",\"desk.overview.title\":\"Bottom-right panel\",\"desk.minimap.label\":\"Show the minimap\",\"desk.minimap.keywords\":\"map minimap thumbnail\",\"workspaces.label\":\"Workspaces\",\"workspaces.description\":\"Separate desks, each with its own items, windows and apps. Files outside the desk belong to everyone.\",\"workspaces.current.label\":\"This workspace\",\"workspaces.current.title\":\"Workspace\",\"workspaces.all.label\":\"All\",\"workspaces.name.keywords\":\"rename workspace name\",\"workspaces.name.field\":\"Workspace name\",\"workspaces.description.label\":\"Description\",\"workspaces.description.description\":\"A line about what the workspace is for, under its name at the bottom of the start menu\",\"workspaces.description.keywords\":\"workspace description notes start menu\",\"workspaces.description.field\":\"Workspace description\",\"workspaces.description.placeholder\":\"What you use it for\",\"workspaces.color.description\":\"The dot in the taskbar and next to its files in the File Manager\",\"workspaces.color.keywords\":\"workspace color\",\"workspaces.owned.label\":\"Files, folders and shortcuts\",\"workspaces.owned.description\":\"Created in this workspace, on the desk and in shared folders\",\"workspaces.apps.title\":\"Apps\",\"workspaces.apps.system\":\"System app: it is in every workspace\",\"workspaces.apps.installed\":\"Installed in lilOS: you can hide it here\",\"workspaces.apps.keywords\":\"app hide show {name}\",\"workspaces.apps.alwaysVisible\":\"Always visible\",\"workspaces.apps.toggle\":\"{name} visible in this workspace\",\"workspaces.apps.toggleIn\":\"{name} visible in {workspace}\",\"workspaces.list.current\":\"{name} (current)\",\"workspaces.list.owned\":{\"one\":\"{n} item created\",\"other\":\"{n} items created\"},\"workspaces.list.apps\":{\"one\":\"{n} app\",\"other\":\"{n} apps\"},\"workspaces.list.keywords\":\"workspace switch delete\",\"workspaces.list.switch\":\"Switch to it\",\"workspaces.switch.label\":\"Go to this workspace\",\"workspaces.new.label\":\"New workspace\",\"workspaces.new.description\":\"With an empty desk and every app visible\",\"workspaces.deleting.title\":\"Deleting a workspace\",\"workspaces.deleting.files.label\":\"Files stay\",\"workspaces.deleting.files.description\":\"Its desk becomes the folder Documenti/Scrivania di <name> (if it is not empty); files created elsewhere stay where they are, marked as its own.\",\"workspaces.deleting.windows.label\":\"Windows stay\",\"workspaces.deleting.windows.description\":\"Its open windows move to the current workspace, with their unsaved changes. Workareas, view and hidden apps are lost.\",\"tags.label\":\"Tags\",\"tags.description\":\"Colored labels to find files and folders wherever they are. A hidden tag hides its items.\",\"tags.new.title\":\"New tag\",\"tags.new.pending\":{\"one\":\"The new tag will go on {n} selected item\",\"other\":\"The new tag will go on {n} selected items\"},\"tags.new.description\":\"Then assign it from the right-click menu → Tag, on the desk and in the File Manager\",\"tags.new.keywords\":\"new tag create label\",\"tags.new.placeholder\":\"For example: Urgent\",\"tags.new.field\":\"Name of the new tag\",\"tags.name.keywords\":\"rename tag\",\"tags.name.field\":\"Name of the tag {name}\",\"tags.color.keywords\":\"tag color\",\"tags.visible.label\":\"Visible\",\"tags.visible.on\":\"Items with this tag are shown everywhere\",\"tags.visible.off\":\"Items with this tag are hidden everywhere: you find them in File Manager → Tags\",\"tags.visible.keywords\":\"hide show hidden invisible tag\",\"tags.visible.toggle\":\"Tag {name} visible\",\"tags.items.description\":{\"one\":\"{n} item in this workspace and in shared folders\",\"other\":\"{n} items in this workspace and in shared folders\"},\"tags.items.show\":\"Show in File Manager\",\"tags.items.delete\":\"Delete the tag\",\"usability.label\":\"Usability\",\"usability.description\":\"Keyboard, mouse, apps that open files, context menus and trash.\",\"shortcuts.label\":\"Shortcuts\",\"shortcuts.title\":\"Keyboard shortcuts\",\"shortcuts.all.label\":\"All shortcuts\",\"shortcuts.all.description\":\"Changes apply right away. To record a combination press +, then the keys; Esc cancels.\",\"shortcuts.all.reset\":\"Reset all\",\"shortcuts.keywords\":\"shortcut keys {keys}\",\"shortcuts.mouse.title\":\"Mouse\",\"shortcuts.lasso.label\":\"Freehand selection\",\"shortcuts.lasso.description\":\"Draw a closed path: the items inside it are selected\",\"shortcuts.lasso.keywords\":\"lasso freehand path selection alt\",\"shortcuts.rectangle.label\":\"Rectangle selection\",\"shortcuts.rectangle.control\":\"Drag on the background\",\"shortcuts.addToSelection.label\":\"Add to the selection\",\"shortcuts.addToSelection.control\":\"Ctrl or Shift + click or drag\",\"shortcuts.pan.label\":\"Move around the desk\",\"shortcuts.pan.control\":\"Space + drag, or middle button\",\"shortcuts.fixed.title\":\"Fixed keys\",\"shortcuts.navigate.label\":\"Move through menus, lists and tabs\",\"shortcuts.navigate.control\":\"Arrows, Enter, Esc\",\"shortcuts.rename.label\":\"Confirm or cancel renaming\",\"shortcuts.rename.control\":\"Enter, Esc\",\"fileTypes.label\":\"File types\",\"fileTypes.title\":\"Apps by file type\",\"fileTypes.all.label\":\"All file types\",\"fileTypes.all.description\":\"When you open a file, lilOS uses the app chosen here. With “Ask every time” the Open with window appears.\",\"fileTypes.all.reset\":\"Reset all\",\"fileTypes.noExtension\":\"No extension\",\"fileTypes.default\":\"Default: {app}\",\"fileTypes.noDefault\":\"No default app\",\"fileTypes.keywords\":\"file type extension open with {ext}\",\"fileTypes.field\":\"App for .{ext}\",\"fileTypes.fieldNoExtension\":\"App for files without an extension\",\"fileTypes.ask\":\"Ask every time\",\"fileTypes.others\":\"Others\",\"menu.label\":\"Context menu\",\"menu.separator\":\"— Separator —\",\"menu.submenu\":{\"one\":\"Submenu · {n} item\",\"other\":\"Submenu · {n} items\"},\"menu.create.folder\":\"Creates the folder “{name}”\",\"menu.create.file\":\"Creates the file “{name}”\",\"menu.create.fileFromTemplate\":\"Creates the file “{name}” from the template {template}\",\"menu.create.fileWithContent\":\"Creates the file “{name}” with initial content\",\"menu.create.deletedTemplate\":\"(deleted file)\",\"menu.launch\":\"Opens the app {name}\",\"menu.action\":\"Action\",\"menu.keywords\":\"context menu item separator new\",\"menu.moveUp\":\"Move up\",\"menu.moveDown\":\"Move down\",\"menu.target.root\":\"Main menu\",\"menu.target.inside\":\"Inside “{name}”\",\"menu.target.label\":\"Where\",\"menu.item.label\":\"Item\",\"menu.item.description\":\"An action or opening an app\",\"menu.item.field\":\"Item to add\",\"menu.item.open\":\"Open {name}\",\"menu.separatorRow.label\":\"Separator\",\"menu.separatorRow.description\":\"A line to group items\",\"menu.new.label\":\"New item in “{name}”\",\"menu.new.description\":\"Creates a file or a folder with this name; a file can start from the contents of a template\",\"menu.new.labelField\":\"Label\",\"menu.new.labelPlaceholder\":\"Label (e.g. Style sheet)\",\"menu.new.nameField\":\"Name of the file or folder\",\"menu.new.namePlaceholder\":\"Name (e.g. style.css)\",\"menu.new.kind\":\"Type\",\"menu.new.kindFile\":\"File\",\"menu.new.kindFolder\":\"Folder\",\"menu.new.missing\":\"A label and a name are needed\",\"menu.template.button\":\"Template…\",\"menu.template.chosen\":\"Template: {name}\",\"menu.template.title\":\"Choose the template file\",\"menu.template.text\":\"The new file will start with the contents of this file.\",\"menu.defaults.label\":\"Default items\",\"menu.defaults.custom\":\"The menu has been customized\",\"menu.defaults.default\":\"The menu is the default one\",\"trash.label\":\"Trash\",\"trash.deleting.title\":\"Deleting\",\"trash.confirm.label\":\"Ask for confirmation\",\"trash.confirm.description\":\"Before deleting files and folders, a small menu asks you to confirm\",\"trash.confirm.keywords\":\"confirm delete remove ask\",\"trash.permanent.label\":\"Delete permanently\",\"trash.permanent.description\":\"Deleted items skip the trash: they can be recovered only with Ctrl Z, while the page stays open\",\"trash.permanent.keywords\":\"trash permanent immediately delete skip\",\"trash.retention.label\":\"Keep items for\",\"trash.retention.description\":\"After this time, what is in the trash is deleted permanently\",\"trash.retention.keywords\":\"retention duration days automatic cleanup empty\",\"trash.retention.field\":\"Keep items in the trash for\",\"trash.retention.days\":{\"one\":\"{n} day\",\"other\":\"{n} days\"},\"trash.retention.forever\":\"Forever\",\"trash.contents.label\":\"Contents\",\"trash.contents.description\":{\"one\":\"{n} item · {size}\",\"other\":\"{n} items · {size}\"},\"trash.contents.empty\":\"The trash is empty\",\"trash.contents.keywords\":\"open trash restore\",\"trash.contents.open\":\"Open the trash\",\"trash.empty.label\":\"Empty the trash\",\"trash.empty.description\":\"Permanently deletes everything in it\",\"trash.empty.keywords\":\"empty trash\",\"trash.empty.button\":\"Empty…\",\"trash.empty.confirm\":\"Empty\",\"trash.empty.none\":\"Empty\",\"apps.label\":\"Apps\",\"apps.description\":\"How installed apps run.\",\"apps.security.label\":\"Security\",\"apps.execution.title\":\"Running apps\",\"apps.isolated.label\":\"Run apps isolated\",\"apps.isolated.description\":\"Each app runs in a sandbox and sees only what its permissions allow. If you turn this off, apps run in lilOS’s page and in a Web Worker: faster, but they can do everything you can do. Applies from the next time each app opens.\",\"apps.isolated.adminOnly\":\"Only an administrator can change it.\",\"apps.isolated.keywords\":\"security isolation sandbox iframe worker\",\"apps.isolated.failed\":\"Not changed: {error}\",\"apps.system.label\":\"System apps\",\"apps.system.description\":\"File Manager, Editor, Control Panel and AppStore are part of lilOS and always run inside lilOS.\",\"apps.installed.title\":\"Installed apps\",\"apps.installed.keywords\":\"security isolation\",\"apps.installed.shared\":\"Like the other apps\",\"apps.installed.own\":\"Chosen for this app\",\"apps.installed.properties\":\"Properties…\",\"apps.installed.none\":\"No apps installed besides the system ones\",\"apps.mode.isolated\":\"Isolated\",\"apps.mode.open\":\"Not isolated\",\"apps.mode.system\":\"Inside lilOS\",\"apps.mode.remote\":\"Isolated, on its own site\",\"startup.label\":\"Startup\",\"startup.description\":\"Services and apps that start by themselves when lilOS starts and when you sign in.\",\"startup.options.label\":\"Options\",\"startup.services.label\":\"Services\",\"startup.apps.label\":\"Apps\",\"startup.auto.title\":\"Automatic startup\",\"startup.openApps.label\":\"Open apps when you sign in\",\"startup.openApps.description\":\"The apps chosen in Apps open, with their parameters. Only in the first lilOS tab of this browser: the others open empty.\",\"startup.openApps.keywords\":\"startup automatic sign-in login autorun\",\"startup.trouble.title\":\"If something goes wrong\",\"startup.safe.label\":\"Start without apps\",\"startup.safe.description\":\"Just once: open lilOS with ?avvio=no at the end of the address. Saved choices are kept.\",\"startup.safe.keywords\":\"safe start startup no apps avvio=no\",\"startup.safe.active\":\"Active now\",\"startup.apps.title\":\"Open when you sign in\",\"startup.apps.hint\":\"In the workspace lilOS opens in, in the order of the list. Turn off every entry point of an app and the app leaves the list.\",\"startup.apps.none\":\"No app opens by itself.\",\"startup.apps.oneEntry\":\"1 entry point\",\"startup.apps.entries\":{\"one\":\"{on} of {n} entry point\",\"other\":\"{on} of {n} entry points\"},\"startup.apps.remove\":\"Remove from startup\",\"startup.apps.allAdded\":\"All apps are already in startup\",\"startup.apps.add\":\"Add an app to startup\",\"startup.apps.addDescription\":\"Its main window opens; then choose other entry points and parameters\",\"startup.params.of\":\"{entry} of {app}\",\"startup.params.undescribed\":\"This entry point does not describe its parameters: they reach the app as they are, as args.\",\"startup.params.json\":\"Parameters (JSON)\",\"startup.params.jsonOf\":\"Parameters (JSON) of {name}\",\"startup.params.invalidJson\":\"Not valid JSON\",\"startup.params.notSaved\":\"Not saved: {error}\",\"startup.path.noFolder\":\"No folder\",\"startup.path.noFile\":\"No file\",\"startup.path.gone\":\"(no longer exists)\",\"startup.path.clear\":\"Remove {name}\",\"services.unsupported\":\"This version of lilOS has no app services\",\"services.status.off\":\"Off\",\"services.status.starting\":\"Starting…\",\"services.status.error\":\"Stopped: {error}\",\"services.status.unknownError\":\"error\",\"services.status.restarting\":\"Restarting… (it had stopped: {error})\",\"services.status.onNow\":\"On for less than a minute\",\"services.status.onMinutes\":{\"one\":\"On for {n} minute\",\"other\":\"On for {n} minutes\"},\"services.status.onHours\":{\"one\":\"On for {n} hour\",\"other\":\"On for {n} hours\"},\"services.status.onSince\":\"On since {date}\",\"services.auto.label\":\"Start services automatically\",\"services.auto.noEngine\":\"The kernel has no services engine (services-isolate module)\",\"services.auto.description\":\"When you sign in, your services chosen in Services start. The ones an administrator chose for everyone start anyway.\",\"services.auto.keywords\":\"services startup automatic background kernel\",\"services.title\":\"Installed services\",\"services.noEngine\":\"The kernel has no services engine: it needs the services-isolate module (AppStore → Kernel).\",\"services.none\":\"No installed app has services.\",\"services.hint\":\"The parts of apps that work in the kernel, without a window, even with lilOS closed. “At system startup” applies to every user and is chosen by an administrator; “At sign-in” only to you.\",\"services.startup.none\":\"Never\",\"services.startup.login\":\"At sign-in\",\"services.startup.system\":\"At system startup\",\"services.startup.field\":\"Startup of {name}\",\"services.restart\":\"Restart\",\"services.restartOf\":\"Restart {name}\",\"services.stop\":\"Stop\",\"services.start\":\"Start\",\"services.byAdmin\":\"chosen by an administrator\",\"services.log.label\":\"Log\",\"services.log.title\":\"Log of {name}\",\"services.log.empty\":\"No lines: the service has not started yet.\",\"storage.label\":\"Storage\",\"storage.description.kernel\":\"lilOS data saved in your user folder.\",\"storage.description.browser\":\"lilOS data saved in this browser.\",\"storage.space.title\":\"Space\",\"storage.used.label\":\"Space used\",\"storage.used.description\":\"Positions, view and settings\",\"storage.contents.label\":\"File contents\",\"storage.contents.description\":\"Text saved in files\",\"storage.reset.title\":\"Reset\",\"storage.defaults.label\":\"Default settings\",\"storage.defaults.description\":\"Resets settings, shortcuts, file type apps and menus to their initial values\",\"storage.initial.label\":\"Initial desk and files\",\"storage.initial.description\":\"Deletes all the folders and files created, the workspaces, the tags, the saved positions and view, then reloads lilOS\",\"storage.initial.keywords\":\"reset factory desktop desk workspace tag\",\"storage.initial.button\":\"Reset…\",\"storage.initial.confirm\":\"Delete and reload\",\"about.label\":\"About\",\"about.description\":\"Version and environment.\",\"about.version\":\"Version\",\"about.sdkVersion\":\"SDK version\",\"about.language\":\"Language\",\"about.browser\":\"Browser\",\"about.unknownBrowser\":\"Unknown\",\"userPage.label\":\"User page\",\"userPage.description\":\"What the page opened from your name shows\",\"userPage.title\":\"User page\",\"userPage.open.label\":\"Opened from your name\",\"userPage.open.description\":\"Click your name in the taskbar or at the bottom of the menu. Your name and photo are always there: choose here what else it shows.\",\"userPage.keywords\":\"user page profile account photo lock sign out restart {name}\",\"userPage.toggle\":\"{name} on the user page\",\"userPage.group.header\":\"Header\",\"userPage.group.actions\":\"Actions\",\"userPage.group.account\":\"Account\",\"userPage.group.session\":\"This session\",\"userPage.group.footer\":\"Footer\",\"userPage.item.details.name\":\"Username and role\",\"userPage.item.details.description\":\"Under your name: the name you sign in with and whether you are an administrator\",\"userPage.item.lock.name\":\"Lock\",\"userPage.item.lock.description\":\"Covers the screen until you enter your password again; apps stay open\",\"userPage.item.logout.name\":\"Sign out\",\"userPage.item.logout.description\":\"Saves, closes the apps and goes back to the sign-in screen\",\"userPage.item.restart.name\":\"Restart the system\",\"userPage.item.restart.description\":\"Restarts the lilOS kernel for every user; administrators only\",\"userPage.item.photo.name\":\"Profile photo\",\"userPage.item.photo.description\":\"Choose, change or remove your photo\",\"userPage.item.theme.name\":\"Theme\",\"userPage.item.theme.description\":\"Light or dark\",\"userPage.item.language.name\":\"Language\",\"userPage.item.language.description\":\"The language of apps\",\"userPage.item.settings.name\":\"All settings\",\"userPage.item.settings.description\":\"Opens Control Panel\",\"userPage.item.workspace.name\":\"Workspace\",\"userPage.item.workspace.description\":\"The one you are in and how many there are\",\"userPage.item.windows.name\":\"Open windows\",\"userPage.item.windows.description\":\"How many windows are open and how many apps work in the background\",\"userPage.item.startup.name\":\"At startup\",\"userPage.item.startup.description\":\"How many apps open when you come in\",\"userPage.item.storage.name\":\"Space used\",\"userPage.item.storage.description\":\"How much your files take up\",\"userPage.item.about.name\":\"lilOS version\",\"userPage.item.about.description\":\"The lilOS version and the address you are connected to\",\"notifications.label\":\"Notifications\",\"notifications.description\":\"How notifications appear when they arrive, and how many are kept\",\"notifications.arrive.title\":\"When they arrive\",\"notifications.shown.label\":\"Shown together\",\"notifications.shown.description\":\"How many appear one above the other over the notification area of the taskbar. Past this number the older ones are not shown there, but stay in the list.\",\"notifications.shown.keywords\":\"notifications bar popup tray count\",\"notifications.shown.field\":\"Notifications shown together\",\"notifications.seconds.label\":\"How long they stay\",\"notifications.seconds.description\":\"Seconds after the last one arrived. With the pointer over them they stay until you move it away.\",\"notifications.seconds.keywords\":\"notifications time seconds duration\",\"notifications.seconds.field\":\"How long notifications stay\",\"notifications.seconds.value\":{\"one\":\"{n} second\",\"other\":\"{n} seconds\"},\"notifications.list.title\":\"List\",\"notifications.keep.label\":\"Notifications kept\",\"notifications.keep.description\":\"When one more arrives the oldest is deleted. The bell in the notification area lists them all.\",\"notifications.keep.page\":\"Without the kernel's notifications module they are kept only until lilOS reloads.\",\"notifications.keep.keywords\":\"notifications history list keep limit\",\"notifications.keep.field\":\"Notifications kept\",\"notifications.test.label\":\"Try\",\"notifications.test.description\":\"Sends you a notification, to see how it looks.\",\"notifications.test.button\":\"Send a test notification\",\"notifications.test.text\":\"Test notification: notifications work.\",\"notifications.error\":\"Not saved: {message}\",\"@name\":\"Control Panel\",\"@description\":\"Appearance, language, desk, user page, workspaces, notifications, tags, shortcuts, file types, startup services and apps, storage.\",\"@entrypoints.main.params.tab.label\":\"Section\",\"@entrypoints.main.params.tab.options.appearance.label\":\"Appearance\",\"@entrypoints.main.params.tab.options.language.label\":\"Language\",\"@entrypoints.main.params.tab.options.desk.label\":\"Desk\",\"@entrypoints.main.params.tab.options.userpage.label\":\"User page\",\"@entrypoints.main.params.tab.options.workspaces.label\":\"Workspaces\",\"@entrypoints.main.params.tab.options.notifications.label\":\"Notifications\",\"@entrypoints.main.params.tab.options.tags.label\":\"Tags\",\"@entrypoints.main.params.tab.options.usability.label\":\"Usability\",\"@entrypoints.main.params.tab.options.apps.label\":\"Apps\",\"@entrypoints.main.params.tab.options.startup.label\":\"Startup\",\"@entrypoints.main.params.tab.options.storage.label\":\"Storage\",\"@entrypoints.main.params.tab.options.about.label\":\"About\",\"pipes.label\":\"Pipes\",\"pipes.title\":\"Pipes on events\",\"pipes.keywords\":\"pipes events handlers order chain\",\"pipes.intro.label\":\"What apps do when something happens\",\"pipes.intro.description\":\"Apps can step in when a file is opened, read or saved, or look at what happens in the system; an app can also add events of its own. Below, each event with its handlers in the order they run ({count} events in all). The after stage runs in the reverse order of before.\",\"pipes.unsupported\":\"This version of lilOS has no pipes\",\"pipes.lilos\":\"lilOS\",\"pipes.up\":\"Up\",\"pipes.down\":\"Down\",\"pipes.stage.before\":\"Before\",\"pipes.stage.after\":\"After\",\"pipes.band.first\":\"among the first\",\"pipes.band.middle\":\"in the middle\",\"pipes.band.last\":\"among the last\",\"pipes.where.all\":\"every item\",\"pipes.where.system\":\"chosen by lilOS\",\"pipes.where.own\":\"the files it marked\",\"pipes.where.ext\":\"files {list}\",\"pipes.where.type.file\":\"files\",\"pipes.where.type.folder\":\"folders\",\"pipes.where.type.app\":\"app shortcuts\",\"pipes.where.app\":\"apps {list}\",\"pipes.reset.label\":\"Order of the handlers\",\"pipes.reset.description\":\"You changed it: go back to the order of installation\",\"pipes.idle.title\":\"Events without handlers\",\"pipes.idle.description\":\"{count} events: no app handles them now\",\"pipes.idle.none\":\"Every event has a handler\",\"pipes.owned\":\"{label} (of {app})\",\"pipes.event.file.open\":\"Opening a file\",\"pipes.event.file.read\":\"Reading a file\",\"pipes.event.file.write\":\"Saving a file\",\"pipes.event.app.launch\":\"Starting an app\",\"pipes.event.file.create\":\"Creating an item\",\"pipes.event.file.rename\":\"Renaming\",\"pipes.event.file.move\":\"Moving\",\"pipes.event.file.copy\":\"Copying a file\",\"pipes.event.file.remove\":\"Deleting for good\",\"pipes.event.trash.put\":\"Moving to the Trash\",\"pipes.event.trash.restore\":\"Restoring from the Trash\",\"pipes.event.trash.purge\":\"Emptying the Trash\",\"pipes.event.tags.assign\":\"Tags of an item\",\"pipes.event.window.open\":\"Opening a window\",\"pipes.event.window.close\":\"Closing a window\",\"pipes.event.workspace.switch\":\"Changing workspace\",\"pipes.event.settings.change\":\"Changing a setting\",\"pipes.event.system.ready\":\"System ready\",\"pipes.event.session.login\":\"User signed in\",\"pipes.event.session.logout\":\"Signing out\",\"pipes.event.apps.install\":\"Installing an app\",\"pipes.event.apps.update\":\"Updating an app\",\"pipes.event.apps.remove\":\"Removing an app\",\"pipes.event.permissions.change\":\"Permissions of an app\",\"pipes.event.settings.system\":\"System settings\",\"pipes.event.pipes.change\":\"Subscriptions to pipes\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"window.title\":\"Pannello di controllo\",\"group.system\":\"Sistema\",\"group.data\":\"Dati\",\"common.name\":\"Nome\",\"common.color\":\"Colore\",\"common.items\":\"Elementi\",\"common.create\":\"Crea\",\"common.add\":\"Aggiungi\",\"common.addMore\":\"Aggiungi…\",\"common.choose\":\"Scegli…\",\"common.remove\":\"Togli\",\"common.delete\":\"Elimina…\",\"common.deleteNow\":\"Elimina\",\"common.reset\":\"Ripristina\",\"common.confirm\":\"Conferma\",\"common.loading\":\"Lettura…\",\"common.unavailable\":\"Non disponibile\",\"common.yes\":\"Sì\",\"common.no\":\"No\",\"appearance.label\":\"Aspetto\",\"appearance.description\":\"Colori e movimento dell’interfaccia.\",\"appearance.colors.label\":\"Colori\",\"appearance.theme.label\":\"Tema\",\"appearance.theme.description\":\"Chiaro o scuro: scrivania, barra, menu e finestre\",\"appearance.theme.keywords\":\"tema chiaro scuro dark light notte\",\"appearance.theme.light\":\"Chiaro\",\"appearance.theme.dark\":\"Scuro\",\"appearance.accent.title\":\"Colore principale\",\"appearance.accent.description\":\"Selezione, pulsanti, tab attivi e logo\",\"appearance.accent.keywords\":\"accento tema\",\"appearance.motion.label\":\"Movimento\",\"appearance.animations.label\":\"Animazioni\",\"appearance.animations.description\":\"Spostamenti della vista, menu e transizioni. Se il sistema operativo chiede movimento ridotto, restano ridotte.\",\"appearance.animations.keywords\":\"movimento transizioni\",\"language.label\":\"Lingua\",\"language.description\":\"La lingua delle app: i loro testi, le date e i numeri.\",\"language.title\":\"Lingua del sistema\",\"language.row.description\":\"Le app che non hanno questa lingua usano l’inglese. I testi di lilOS sono ancora in italiano.\",\"language.keywords\":\"lingua traduzione inglese italiano date numeri language locale\",\"language.auto\":\"Automatica: {name}\",\"desk.label\":\"Scrivania\",\"desk.description\":\"Comportamento della scrivania infinita.\",\"desk.fixed.title\":\"Elementi fissi\",\"desk.fixed.label\":\"Sulla scrivania\",\"desk.fixed.descriptionSwitchable\":\"Quelli attivi ci sono sulla scrivania di ogni workspace. Si aprono e si spostano come gli altri, ma non si rinominano e non si eliminano: si tolgono da qui.\",\"desk.fixed.description\":\"Ci sono sulla scrivania di ogni workspace. Si aprono e si spostano come gli altri, ma non si rinominano e non si eliminano.\",\"desk.fixed.keywords\":\"elementi fissi scrivania mostra nascondi elimina {name}\",\"desk.fixed.toggle\":\"{name} sulla scrivania\",\"desk.fixed.toggleIn\":\"{name} sulla scrivania di {workspace}\",\"desk.fixed.always\":\"Fisso\",\"desk.fixed.item.home.name\":\"Home\",\"desk.fixed.item.home.description\":\"La cartella principale, con tutte le altre\",\"desk.fixed.item.documents.name\":\"Documenti\",\"desk.fixed.item.documents.description\":\"La cartella Documenti, condivisa da tutti i workspace\",\"desk.fixed.item.images.name\":\"Immagini\",\"desk.fixed.item.images.description\":\"La cartella Immagini, condivisa da tutti i workspace\",\"desk.fixed.item.files.name\":\"File Manager\",\"desk.fixed.item.files.description\":\"Apre il File Manager\",\"desk.fixed.item.downloads.name\":\"Download\",\"desk.fixed.item.downloads.description\":\"La cartella Download, condivisa da tutti i workspace\",\"desk.fixed.item.trash.name\":\"Cestino\",\"desk.fixed.item.trash.description\":\"Apre il cestino; ci si possono trascinare file e cartelle\",\"desk.fixed.descriptionWorkspace\":\"Quelli attivi ci sono sulla scrivania di questo workspace. Si aprono e si spostano come gli altri, ma non si rinominano e non si eliminano: si tolgono da qui.\",\"desk.fixed.descriptionAll\":\"Accendi o spegni un elemento in tutti i workspace insieme; i workspace nuovi lo hanno uguale. Ogni workspace poi lo può cambiare nel suo tab.\",\"desk.fixed.some\":\"Acceso in {on} workspace su {n}\",\"desk.fixed.toggleAll\":\"{name} su tutte le scrivanie\",\"desk.fixed.moved.label\":\"Ogni workspace ha i suoi\",\"desk.fixed.moved.description\":\"Si scelgono in Workspace: nel tab di ogni workspace, o in Tutti per tutte le scrivanie.\",\"desk.fixed.moved.keywords\":\"elementi fissi scrivania home documenti cestino workspace\",\"desk.fixed.moved.open\":\"Apri\",\"desk.placement.title\":\"Posizionamento\",\"desk.snap.label\":\"Allinea alla griglia\",\"desk.snap.description\":\"Gli elementi trascinati si allineano a una griglia invisibile\",\"desk.snap.keywords\":\"icone snap\",\"desk.previews.title\":\"Icone\",\"desk.previews.label\":\"Mostra l’anteprima dei file\",\"desk.previews.description\":\"Al posto dell’icona, i file mostrano una piccola immagine di quello che contengono, fatta dall’app che li apre (Photo, Editor…)\",\"desk.previews.keywords\":\"anteprime miniature icone immagini file\",\"desk.background.label\":\"Sfondo\",\"desk.background.color.title\":\"Colore\",\"desk.background.color.description\":\"Dietro gli elementi, e intorno alle immagini trasparenti\",\"desk.background.color.keywords\":\"sfondo colore scrivania desktop\",\"desk.background.custom.label\":\"Altro colore\",\"desk.background.custom.description\":\"Un colore a scelta\",\"desk.background.theme.label\":\"Colore del tema\",\"desk.background.theme.description\":\"Torna al colore del tema chiaro o scuro\",\"desk.background.theme.button\":\"Usa il colore del tema\",\"desk.background.image.title\":\"Immagine\",\"desk.background.image.label\":\"Immagine di sfondo\",\"desk.background.image.keywords\":\"sfondo immagine foto scrivania desktop wallpaper\",\"desk.background.image.current\":\"«{name}»: riempie la scrivania mantenendo le proporzioni, e non si sposta né si ingrandisce con lei\",\"desk.background.image.none\":\"Nessuna: solo il colore. Nel menu di un'immagine sulla scrivania: Usa come sfondo desktop\",\"desk.background.image.choose\":\"Scegli…\",\"desk.background.image.pick\":\"Scegli l'immagine di sfondo\",\"desk.background.image.remove.label\":\"Togli l'immagine\",\"desk.background.image.remove.description\":\"Il file resta dov'è\",\"desk.background.image.remove.button\":\"Togli\",\"desk.overview.label\":\"Panoramica\",\"desk.overview.title\":\"Pannello in basso a destra\",\"desk.minimap.label\":\"Mostra la minimappa\",\"desk.minimap.keywords\":\"mappa miniatura\",\"workspaces.label\":\"Workspace\",\"workspaces.description\":\"Scrivanie separate, ognuna con i suoi elementi, finestre e app. I file fuori dalla scrivania sono di tutti.\",\"workspaces.current.label\":\"Questo workspace\",\"workspaces.current.title\":\"Workspace\",\"workspaces.all.label\":\"Tutti\",\"workspaces.name.keywords\":\"rinomina workspace\",\"workspaces.name.field\":\"Nome del workspace\",\"workspaces.description.label\":\"Descrizione\",\"workspaces.description.description\":\"Una riga su a cosa serve il workspace, sotto il suo nome in fondo al menu di avvio\",\"workspaces.description.keywords\":\"descrizione workspace note menu di avvio\",\"workspaces.description.field\":\"Descrizione del workspace\",\"workspaces.description.placeholder\":\"A cosa ti serve\",\"workspaces.color.description\":\"Il pallino nella barra in basso e accanto ai suoi file nel File Manager\",\"workspaces.color.keywords\":\"colore workspace\",\"workspaces.owned.label\":\"File, cartelle e collegamenti\",\"workspaces.owned.description\":\"Creati in questo workspace, sulla scrivania e nelle cartelle condivise\",\"workspaces.apps.title\":\"App\",\"workspaces.apps.system\":\"App di sistema: c’è in ogni workspace\",\"workspaces.apps.installed\":\"Installata in lilOS: qui la puoi nascondere\",\"workspaces.apps.keywords\":\"app nascondi mostra {name}\",\"workspaces.apps.alwaysVisible\":\"Sempre visibile\",\"workspaces.apps.toggle\":\"{name} visibile in questo workspace\",\"workspaces.apps.toggleIn\":\"{name} visibile in {workspace}\",\"workspaces.list.current\":\"{name} (attuale)\",\"workspaces.list.owned\":{\"one\":\"{n} elemento creato\",\"other\":\"{n} elementi creati\"},\"workspaces.list.apps\":{\"one\":\"{n} app\",\"other\":\"{n} app\"},\"workspaces.list.keywords\":\"workspace passa elimina\",\"workspaces.list.switch\":\"Passa a questo\",\"workspaces.switch.label\":\"Vai a questo workspace\",\"workspaces.new.label\":\"Nuovo workspace\",\"workspaces.new.description\":\"Con la scrivania vuota e tutte le app visibili\",\"workspaces.deleting.title\":\"Eliminare un workspace\",\"workspaces.deleting.files.label\":\"I file restano\",\"workspaces.deleting.files.description\":\"La sua scrivania diventa la cartella Documenti/Scrivania di <nome> (se non è vuota); i file creati altrove restano dove sono, segnati come suoi.\",\"workspaces.deleting.windows.label\":\"Le finestre restano\",\"workspaces.deleting.windows.description\":\"Le sue finestre aperte passano nel workspace attuale, con le modifiche non salvate. Workarea, vista e app nascoste si perdono.\",\"tags.label\":\"Tag\",\"tags.description\":\"Etichette colorate per ritrovare file e cartelle ovunque siano. Un tag invisibile nasconde i suoi elementi.\",\"tags.new.title\":\"Nuovo tag\",\"tags.new.pending\":{\"one\":\"Il nuovo tag andrà su {n} elemento selezionato\",\"other\":\"Il nuovo tag andrà su {n} elementi selezionati\"},\"tags.new.description\":\"Poi si assegna dal menu del tasto destro → Tag, sulla scrivania e nel File Manager\",\"tags.new.keywords\":\"nuovo tag crea etichetta\",\"tags.new.placeholder\":\"Per esempio: Urgente\",\"tags.new.field\":\"Nome del nuovo tag\",\"tags.name.keywords\":\"rinomina tag\",\"tags.name.field\":\"Nome del tag {name}\",\"tags.color.keywords\":\"colore tag\",\"tags.visible.label\":\"Visibile\",\"tags.visible.on\":\"Gli elementi con questo tag si vedono ovunque\",\"tags.visible.off\":\"Gli elementi con questo tag sono nascosti ovunque: si ritrovano nel File Manager → Tag\",\"tags.visible.keywords\":\"nascondi mostra invisibile tag\",\"tags.visible.toggle\":\"Tag {name} visibile\",\"tags.items.description\":{\"one\":\"{n} elemento in questo workspace e nelle cartelle condivise\",\"other\":\"{n} elementi in questo workspace e nelle cartelle condivise\"},\"tags.items.show\":\"Mostra nel File Manager\",\"tags.items.delete\":\"Elimina il tag\",\"usability.label\":\"Usabilità\",\"usability.description\":\"Tastiera, mouse, app che aprono i file, menu contestuali e cestino.\",\"shortcuts.label\":\"Scorciatoie\",\"shortcuts.title\":\"Scorciatoie da tastiera\",\"shortcuts.all.label\":\"Tutte le scorciatoie\",\"shortcuts.all.description\":\"Le modifiche valgono subito. Per registrare una combinazione premi +, poi i tasti; Esc annulla.\",\"shortcuts.all.reset\":\"Ripristina tutte\",\"shortcuts.keywords\":\"scorciatoia tasti {keys}\",\"shortcuts.mouse.title\":\"Mouse\",\"shortcuts.lasso.label\":\"Selezione a mano libera\",\"shortcuts.lasso.description\":\"Disegna un percorso chiuso: si selezionano gli elementi che contiene\",\"shortcuts.lasso.keywords\":\"lazo lasso percorso selezione alt\",\"shortcuts.rectangle.label\":\"Selezione a rettangolo\",\"shortcuts.rectangle.control\":\"Trascina sullo sfondo\",\"shortcuts.addToSelection.label\":\"Aggiungere alla selezione\",\"shortcuts.addToSelection.control\":\"Ctrl o Shift + clic o trascinamento\",\"shortcuts.pan.label\":\"Spostarsi sulla scrivania\",\"shortcuts.pan.control\":\"Spazio + trascina, o tasto centrale\",\"shortcuts.fixed.title\":\"Tasti fissi\",\"shortcuts.navigate.label\":\"Muoversi nei menu, nelle liste e nei tab\",\"shortcuts.navigate.control\":\"Frecce, Invio, Esc\",\"shortcuts.rename.label\":\"Confermare o annullare la rinomina\",\"shortcuts.rename.control\":\"Invio, Esc\",\"fileTypes.label\":\"Tipi di file\",\"fileTypes.title\":\"App per tipo di file\",\"fileTypes.all.label\":\"Tutti i tipi di file\",\"fileTypes.all.description\":\"Aprendo un file, lilOS usa l’app scelta qui. Con «Chiedi ogni volta» compare la finestra Apri con.\",\"fileTypes.all.reset\":\"Ripristina tutti\",\"fileTypes.noExtension\":\"Senza estensione\",\"fileTypes.default\":\"Predefinita: {app}\",\"fileTypes.noDefault\":\"Nessuna app predefinita\",\"fileTypes.keywords\":\"tipo file estensione apri con {ext}\",\"fileTypes.field\":\"App per .{ext}\",\"fileTypes.fieldNoExtension\":\"App per i file senza estensione\",\"fileTypes.ask\":\"Chiedi ogni volta\",\"fileTypes.others\":\"Altri\",\"menu.label\":\"Menu contestuale\",\"menu.separator\":\"— Separatore —\",\"menu.submenu\":{\"one\":\"Sottomenu · {n} voce\",\"other\":\"Sottomenu · {n} voci\"},\"menu.create.folder\":\"Crea la cartella «{name}»\",\"menu.create.file\":\"Crea il file «{name}»\",\"menu.create.fileFromTemplate\":\"Crea il file «{name}» dal modello {template}\",\"menu.create.fileWithContent\":\"Crea il file «{name}» con un contenuto iniziale\",\"menu.create.deletedTemplate\":\"(file eliminato)\",\"menu.launch\":\"Apre l’app {name}\",\"menu.action\":\"Azione\",\"menu.keywords\":\"menu contestuale voce separatore nuovo\",\"menu.moveUp\":\"Sposta su\",\"menu.moveDown\":\"Sposta giù\",\"menu.target.root\":\"Menu principale\",\"menu.target.inside\":\"Dentro «{name}»\",\"menu.target.label\":\"Dove\",\"menu.item.label\":\"Voce\",\"menu.item.description\":\"Un’azione o l’apertura di un’app\",\"menu.item.field\":\"Voce da aggiungere\",\"menu.item.open\":\"Apri {name}\",\"menu.separatorRow.label\":\"Separatore\",\"menu.separatorRow.description\":\"Una linea per raggruppare le voci\",\"menu.new.label\":\"Nuovo elemento in «{name}»\",\"menu.new.description\":\"Crea un file o una cartella con questo nome; un file può partire dal contenuto di un modello\",\"menu.new.labelField\":\"Etichetta\",\"menu.new.labelPlaceholder\":\"Etichetta (es. Foglio di stile)\",\"menu.new.nameField\":\"Nome del file o della cartella\",\"menu.new.namePlaceholder\":\"Nome (es. stile.css)\",\"menu.new.kind\":\"Tipo\",\"menu.new.kindFile\":\"File\",\"menu.new.kindFolder\":\"Cartella\",\"menu.new.missing\":\"Servono l’etichetta e il nome\",\"menu.template.button\":\"Modello…\",\"menu.template.chosen\":\"Modello: {name}\",\"menu.template.title\":\"Scegli il file modello\",\"menu.template.text\":\"Il nuovo file partirà con il contenuto di questo file.\",\"menu.defaults.label\":\"Voci predefinite\",\"menu.defaults.custom\":\"Il menu è stato personalizzato\",\"menu.defaults.default\":\"Il menu è quello predefinito\",\"trash.label\":\"Cestino\",\"trash.deleting.title\":\"Eliminazione\",\"trash.confirm.label\":\"Chiedi conferma\",\"trash.confirm.description\":\"Prima di eliminare file e cartelle, un piccolo menu chiede di confermare\",\"trash.confirm.keywords\":\"conferma elimina cancella domanda\",\"trash.permanent.label\":\"Elimina definitivamente\",\"trash.permanent.description\":\"Gli elementi eliminati non passano dal cestino: si recuperano solo con Ctrl Z, finché la pagina resta aperta\",\"trash.permanent.keywords\":\"cestino definitivo subito cancella salta\",\"trash.retention.label\":\"Conserva gli elementi per\",\"trash.retention.description\":\"Passato questo tempo, quello che è nel cestino viene eliminato definitivamente\",\"trash.retention.keywords\":\"retention durata giorni pulizia automatica svuota\",\"trash.retention.field\":\"Conserva gli elementi nel cestino per\",\"trash.retention.days\":{\"one\":\"{n} giorno\",\"other\":\"{n} giorni\"},\"trash.retention.forever\":\"Per sempre\",\"trash.contents.label\":\"Contenuto\",\"trash.contents.description\":{\"one\":\"{n} elemento · {size}\",\"other\":\"{n} elementi · {size}\"},\"trash.contents.empty\":\"Il cestino è vuoto\",\"trash.contents.keywords\":\"apri cestino ripristina\",\"trash.contents.open\":\"Apri il cestino\",\"trash.empty.label\":\"Svuota il cestino\",\"trash.empty.description\":\"Elimina definitivamente tutto quello che contiene\",\"trash.empty.keywords\":\"svuota cestino\",\"trash.empty.button\":\"Svuota…\",\"trash.empty.confirm\":\"Svuota\",\"trash.empty.none\":\"Vuoto\",\"apps.label\":\"App\",\"apps.description\":\"Come girano le app installate.\",\"apps.security.label\":\"Sicurezza\",\"apps.execution.title\":\"Esecuzione delle app\",\"apps.isolated.label\":\"Esegui le app isolate\",\"apps.isolated.description\":\"Ogni app gira in una sandbox e vede solo quello che i suoi permessi le concedono. Se lo togli, le app girano nella pagina di lilOS e in un Web Worker: più veloci, ma possono fare tutto quello che puoi fare tu. Vale dalla prossima apertura di ogni app.\",\"apps.isolated.adminOnly\":\"Solo un amministratore la cambia.\",\"apps.isolated.keywords\":\"sicurezza isolamento sandbox iframe worker\",\"apps.isolated.failed\":\"Non cambiata: {error}\",\"apps.system.label\":\"App di sistema\",\"apps.system.description\":\"File Manager, Editor, Pannello di controllo e AppStore fanno parte di lilOS e girano sempre dentro lilOS.\",\"apps.installed.title\":\"App installate\",\"apps.installed.keywords\":\"sicurezza isolamento\",\"apps.installed.shared\":\"Come le altre app\",\"apps.installed.own\":\"Scelta per questa app\",\"apps.installed.properties\":\"Proprietà…\",\"apps.installed.none\":\"Nessuna app installata oltre a quelle di sistema\",\"apps.mode.isolated\":\"Isolata\",\"apps.mode.open\":\"Non isolata\",\"apps.mode.system\":\"Dentro lilOS\",\"apps.mode.remote\":\"Isolata, nel suo sito\",\"startup.label\":\"Avvio\",\"startup.description\":\"Servizi e app che partono da soli all’avvio di lilOS e quando entri.\",\"startup.options.label\":\"Opzioni\",\"startup.services.label\":\"Servizi\",\"startup.apps.label\":\"App\",\"startup.auto.title\":\"Avvio automatico\",\"startup.openApps.label\":\"Apri le app quando entri\",\"startup.openApps.description\":\"Si aprono le app scelte in App, con i loro parametri. Solo nella prima scheda di lilOS di questo browser: le altre si aprono vuote.\",\"startup.openApps.keywords\":\"avvio automatico accesso login esecuzione automatica\",\"startup.trouble.title\":\"Se qualcosa non va\",\"startup.safe.label\":\"Avvio senza app\",\"startup.safe.description\":\"Per una volta sola: apri lilOS con ?avvio=no in fondo all’indirizzo. Le scelte salvate restano.\",\"startup.safe.keywords\":\"avvio sicuro avvio=no\",\"startup.safe.active\":\"Attivo ora\",\"startup.apps.title\":\"Si aprono quando entri\",\"startup.apps.hint\":\"Nel workspace in cui si apre lilOS, nell’ordine dell’elenco. Togli tutti i punti d’ingresso di un’app e l’app esce dall’elenco.\",\"startup.apps.none\":\"Nessuna app si apre da sola.\",\"startup.apps.oneEntry\":\"1 punto d’ingresso\",\"startup.apps.entries\":{\"one\":\"{on} di {n} punto d’ingresso\",\"other\":\"{on} di {n} punti d’ingresso\"},\"startup.apps.remove\":\"Rimuovi dall’avvio\",\"startup.apps.allAdded\":\"Tutte le app sono già all’avvio\",\"startup.apps.add\":\"Aggiungi un’app all’avvio\",\"startup.apps.addDescription\":\"Si apre la sua finestra principale; poi scegli altri punti d’ingresso e parametri\",\"startup.params.of\":\"{entry} di {app}\",\"startup.params.undescribed\":\"Questo punto d’ingresso non descrive i suoi parametri: arrivano all’app così come sono, come args.\",\"startup.params.json\":\"Parametri (JSON)\",\"startup.params.jsonOf\":\"Parametri (JSON) di {name}\",\"startup.params.invalidJson\":\"Non è JSON valido\",\"startup.params.notSaved\":\"Non salvati: {error}\",\"startup.path.noFolder\":\"Nessuna cartella\",\"startup.path.noFile\":\"Nessun file\",\"startup.path.gone\":\"(non c’è più)\",\"startup.path.clear\":\"Togli {name}\",\"services.unsupported\":\"Questa versione di lilOS non ha i servizi delle app\",\"services.status.off\":\"Spento\",\"services.status.starting\":\"Si avvia…\",\"services.status.error\":\"Fermo: {error}\",\"services.status.unknownError\":\"errore\",\"services.status.restarting\":\"Riparte… (si era fermato: {error})\",\"services.status.onNow\":\"Acceso da meno di un minuto\",\"services.status.onMinutes\":{\"one\":\"Acceso da {n} minuto\",\"other\":\"Acceso da {n} minuti\"},\"services.status.onHours\":{\"one\":\"Acceso da {n} ora\",\"other\":\"Acceso da {n} ore\"},\"services.status.onSince\":\"Acceso dal {date}\",\"services.auto.label\":\"Avvia i servizi automaticamente\",\"services.auto.noEngine\":\"Il kernel non ha il motore dei servizi (modulo services-isolate)\",\"services.auto.description\":\"Quando entri partono i tuoi servizi scelti in Servizi. Quelli scelti da un amministratore per tutti partono comunque.\",\"services.auto.keywords\":\"servizi avvio automatico background kernel\",\"services.title\":\"Servizi installati\",\"services.noEngine\":\"Il kernel non ha il motore dei servizi: serve il modulo services-isolate (AppStore → Kernel).\",\"services.none\":\"Nessuna app installata ha servizi.\",\"services.hint\":\"Le parti delle app che lavorano nel kernel, senza finestra, anche con lilOS chiuso. «All’avvio del sistema» vale per tutti gli utenti e lo sceglie un amministratore; «All’accesso» solo per te.\",\"services.startup.none\":\"Non si avvia\",\"services.startup.login\":\"All’accesso\",\"services.startup.system\":\"All’avvio del sistema\",\"services.startup.field\":\"Avvio di {name}\",\"services.restart\":\"Riavvia\",\"services.restartOf\":\"Riavvia {name}\",\"services.stop\":\"Spegni\",\"services.start\":\"Accendi\",\"services.byAdmin\":\"scelto da un amministratore\",\"services.log.label\":\"Registro\",\"services.log.title\":\"Registro di {name}\",\"services.log.empty\":\"Nessuna riga: il servizio non è ancora partito.\",\"storage.label\":\"Archiviazione\",\"storage.description.kernel\":\"Dati di lilOS salvati nella tua cartella utente.\",\"storage.description.browser\":\"Dati di lilOS salvati in questo browser.\",\"storage.space.title\":\"Spazio\",\"storage.used.label\":\"Spazio usato\",\"storage.used.description\":\"Posizioni, vista e impostazioni\",\"storage.contents.label\":\"Contenuto dei file\",\"storage.contents.description\":\"Testo salvato nei file\",\"storage.reset.title\":\"Ripristino\",\"storage.defaults.label\":\"Impostazioni predefinite\",\"storage.defaults.description\":\"Riporta impostazioni, scorciatoie, app dei tipi di file e menu ai valori iniziali\",\"storage.initial.label\":\"Scrivania e file iniziali\",\"storage.initial.description\":\"Elimina tutte le cartelle e i file creati, i workspace, i tag, le posizioni e la vista salvate, poi ricarica lilOS\",\"storage.initial.keywords\":\"reset desktop workspace tag\",\"storage.initial.button\":\"Ripristina…\",\"storage.initial.confirm\":\"Elimina e ricarica\",\"about.label\":\"Informazioni\",\"about.description\":\"Versione e ambiente.\",\"about.version\":\"Versione\",\"about.sdkVersion\":\"Versione dell’SDK\",\"about.language\":\"Lingua\",\"about.browser\":\"Browser\",\"about.unknownBrowser\":\"Sconosciuto\",\"userPage.label\":\"Pagina utente\",\"userPage.description\":\"Cosa mostra la pagina che si apre dal tuo nome\",\"userPage.title\":\"Pagina utente\",\"userPage.open.label\":\"Si apre dal tuo nome\",\"userPage.open.description\":\"Clicca il tuo nome nella barra in basso o in fondo al menu. Nome e foto ci sono sempre: qui scegli cos’altro mostra.\",\"userPage.keywords\":\"pagina utente profilo account foto blocca chiudi sessione esci riavvia {name}\",\"userPage.toggle\":\"{name} nella pagina utente\",\"userPage.group.header\":\"Intestazione\",\"userPage.group.actions\":\"Azioni\",\"userPage.group.account\":\"Account\",\"userPage.group.session\":\"Questa sessione\",\"userPage.group.footer\":\"Piè di pagina\",\"userPage.item.details.name\":\"Nome utente e ruolo\",\"userPage.item.details.description\":\"Sotto il nome: il nome con cui accedi e se sei amministratore\",\"userPage.item.lock.name\":\"Blocca\",\"userPage.item.lock.description\":\"Copre lo schermo finché non inserisci di nuovo la password; le app restano aperte\",\"userPage.item.logout.name\":\"Chiudi sessione\",\"userPage.item.logout.description\":\"Salva, chiude le app e torna alla schermata di accesso\",\"userPage.item.restart.name\":\"Riavvia il sistema\",\"userPage.item.restart.description\":\"Riavvia il kernel di lilOS per tutti gli utenti; solo per gli amministratori\",\"userPage.item.photo.name\":\"Foto profilo\",\"userPage.item.photo.description\":\"Scegliere, cambiare o togliere la foto\",\"userPage.item.theme.name\":\"Tema\",\"userPage.item.theme.description\":\"Chiaro o scuro\",\"userPage.item.language.name\":\"Lingua\",\"userPage.item.language.description\":\"La lingua delle app\",\"userPage.item.settings.name\":\"Tutte le impostazioni\",\"userPage.item.settings.description\":\"Apre il Pannello di controllo\",\"userPage.item.workspace.name\":\"Workspace\",\"userPage.item.workspace.description\":\"Quello in cui sei e quanti ce ne sono\",\"userPage.item.windows.name\":\"Finestre aperte\",\"userPage.item.windows.description\":\"Quante finestre sono aperte e quante app lavorano in background\",\"userPage.item.startup.name\":\"All’avvio\",\"userPage.item.startup.description\":\"Quante app si aprono quando entri\",\"userPage.item.storage.name\":\"Spazio usato\",\"userPage.item.storage.description\":\"Quanto occupano i tuoi file\",\"userPage.item.about.name\":\"Versione di lilOS\",\"userPage.item.about.description\":\"La versione di lilOS e l’indirizzo a cui sei collegato\",\"notifications.label\":\"Notifiche\",\"notifications.description\":\"Come compaiono le notifiche quando arrivano, e quante se ne conservano\",\"notifications.arrive.title\":\"Quando arrivano\",\"notifications.shown.label\":\"Mostrate insieme\",\"notifications.shown.description\":\"Quante ne compaiono una sopra l'altra sopra l'area di notifica della barra delle applicazioni. Oltre questo numero le più vecchie non si vedono lì, ma restano nell'elenco.\",\"notifications.shown.keywords\":\"notifiche barra avvisi area di notifica numero\",\"notifications.shown.field\":\"Notifiche mostrate insieme\",\"notifications.seconds.label\":\"Per quanto restano visibili\",\"notifications.seconds.description\":\"Secondi dopo l'ultima arrivata. Con il puntatore sopra restano finché non lo sposti.\",\"notifications.seconds.keywords\":\"notifiche tempo secondi durata\",\"notifications.seconds.field\":\"Per quanto restano visibili le notifiche\",\"notifications.seconds.value\":{\"one\":\"{n} secondo\",\"other\":\"{n} secondi\"},\"notifications.list.title\":\"Elenco\",\"notifications.keep.label\":\"Notifiche conservate\",\"notifications.keep.description\":\"Quando ne arriva una in più si cancella la più vecchia. La campanella nell'area di notifica le elenca tutte.\",\"notifications.keep.page\":\"Senza il modulo delle notifiche del kernel restano solo finché lilOS non si ricarica.\",\"notifications.keep.keywords\":\"notifiche cronologia elenco conservare limite\",\"notifications.keep.field\":\"Notifiche conservate\",\"notifications.test.label\":\"Prova\",\"notifications.test.description\":\"Ti manda una notifica, per vedere come appare.\",\"notifications.test.button\":\"Invia una notifica di prova\",\"notifications.test.text\":\"Notifica di prova: le notifiche funzionano.\",\"notifications.error\":\"Non salvato: {message}\",\"@name\":\"Pannello di controllo\",\"@description\":\"Aspetto, lingua, scrivania, pagina utente, workspace, notifiche, tag, scorciatoie, tipi di file, servizi e app all’avvio, archiviazione.\",\"@entrypoints.main.params.tab.label\":\"Sezione\",\"@entrypoints.main.params.tab.options.appearance.label\":\"Aspetto\",\"@entrypoints.main.params.tab.options.language.label\":\"Lingua\",\"@entrypoints.main.params.tab.options.desk.label\":\"Scrivania\",\"@entrypoints.main.params.tab.options.userpage.label\":\"Pagina utente\",\"@entrypoints.main.params.tab.options.workspaces.label\":\"Workspace\",\"@entrypoints.main.params.tab.options.notifications.label\":\"Notifiche\",\"@entrypoints.main.params.tab.options.tags.label\":\"Tag\",\"@entrypoints.main.params.tab.options.usability.label\":\"Usabilità\",\"@entrypoints.main.params.tab.options.apps.label\":\"App\",\"@entrypoints.main.params.tab.options.startup.label\":\"Avvio\",\"@entrypoints.main.params.tab.options.storage.label\":\"Archiviazione\",\"@entrypoints.main.params.tab.options.about.label\":\"Informazioni\",\"pipes.label\":\"Pipe\",\"pipes.title\":\"Pipe sugli eventi\",\"pipes.keywords\":\"pipe eventi handler ordine catena\",\"pipes.intro.label\":\"Cosa fanno le app quando succede qualcosa\",\"pipes.intro.description\":\"Le app possono intervenire quando un file si apre, si legge o si salva, oppure guardare cosa succede nel sistema; un’app può anche aggiungere eventi suoi. Qui sotto, ogni evento con i suoi handler nell’ordine in cui partono ({count} eventi in tutto). La fase dopo scorre in ordine inverso rispetto a prima.\",\"pipes.unsupported\":\"Questa versione di lilOS non ha le pipe\",\"pipes.lilos\":\"lilOS\",\"pipes.up\":\"Su\",\"pipes.down\":\"Giù\",\"pipes.stage.before\":\"Prima\",\"pipes.stage.after\":\"Dopo\",\"pipes.band.first\":\"tra i primi\",\"pipes.band.middle\":\"in mezzo\",\"pipes.band.last\":\"tra gli ultimi\",\"pipes.where.all\":\"ogni elemento\",\"pipes.where.system\":\"scelti da lilOS\",\"pipes.where.own\":\"i file che ha segnato\",\"pipes.where.ext\":\"file {list}\",\"pipes.where.type.file\":\"file\",\"pipes.where.type.folder\":\"cartelle\",\"pipes.where.type.app\":\"collegamenti alle app\",\"pipes.where.app\":\"app {list}\",\"pipes.reset.label\":\"Ordine degli handler\",\"pipes.reset.description\":\"L’hai cambiato: torna all’ordine di installazione\",\"pipes.idle.title\":\"Eventi senza handler\",\"pipes.idle.description\":\"{count} eventi: per ora nessuna app li gestisce\",\"pipes.idle.none\":\"Ogni evento ha un handler\",\"pipes.owned\":\"{label} (di {app})\",\"pipes.event.file.open\":\"Apertura di un file\",\"pipes.event.file.read\":\"Lettura di un file\",\"pipes.event.file.write\":\"Salvataggio di un file\",\"pipes.event.app.launch\":\"Avvio di un’app\",\"pipes.event.file.create\":\"Creazione di un elemento\",\"pipes.event.file.rename\":\"Cambio di nome\",\"pipes.event.file.move\":\"Spostamento\",\"pipes.event.file.copy\":\"Copia di un file\",\"pipes.event.file.remove\":\"Eliminazione definitiva\",\"pipes.event.trash.put\":\"Spostamento nel Cestino\",\"pipes.event.trash.restore\":\"Ripristino dal Cestino\",\"pipes.event.trash.purge\":\"Svuotamento del Cestino\",\"pipes.event.tags.assign\":\"Tag di un elemento\",\"pipes.event.window.open\":\"Apertura di una finestra\",\"pipes.event.window.close\":\"Chiusura di una finestra\",\"pipes.event.workspace.switch\":\"Cambio di workspace\",\"pipes.event.settings.change\":\"Cambio di un’impostazione\",\"pipes.event.system.ready\":\"Sistema pronto\",\"pipes.event.session.login\":\"Utente entrato\",\"pipes.event.session.logout\":\"Uscita dall’account\",\"pipes.event.apps.install\":\"Installazione di un’app\",\"pipes.event.apps.update\":\"Aggiornamento di un’app\",\"pipes.event.apps.remove\":\"Rimozione di un’app\",\"pipes.event.permissions.change\":\"Permessi di un’app\",\"pipes.event.settings.system\":\"Impostazioni di sistema\",\"pipes.event.pipes.change\":\"Iscrizioni alle pipe\"}}")
}), { t: R } = L;
// src/settings/menuEditor.js
function fe(e, { openWindow: t, rerender: n, confirmButton: r }) {
	let i = p.layout(e), o = (t) => {
		p.setLayout(e, t), n();
	}, s = (e) => {
		if (e.type === "separator") return {
			label: R("menu.separator"),
			description: ""
		};
		if (e.type === "submenu") return {
			label: e.label,
			description: R("menu.submenu", { n: e.items.length })
		};
		let t = p.action(e.action), n = e.label ?? t?.label ?? e.action;
		if (e.action === "desktop.create") {
			let t = e.params.name;
			return e.params.kind === "folder" ? {
				label: n,
				description: R("menu.create.folder", { name: t })
			} : e.params.template ? {
				label: n,
				description: R("menu.create.fileFromTemplate", {
					name: t,
					template: l.exists(e.params.template) ? l.path(e.params.template) : R("menu.create.deletedTemplate")
				})
			} : {
				label: n,
				description: e.params.content ? R("menu.create.fileWithContent", { name: t }) : R("menu.create.file", { name: t })
			};
		}
		return e.action === "app.launch" ? {
			label: n,
			description: R("menu.launch", { name: N.find((t) => t.id === e.params.app)?.name ?? e.params.app })
		} : {
			label: n,
			description: R("menu.action")
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
			keywords: R("menu.keywords"),
			control: u("div", { class: "mm-ctl" }, o("arrowUp", R("menu.moveUp"), () => f(t, -1), a === 0), o("arrowDown", R("menu.moveDown"), () => f(t, 1), a === n - 1), o("x", R("common.remove"), () => m(t)))
		};
	}, _ = [];
	i.forEach((e, t) => {
		_.push(h(e, [t], i.length)), e.type === "submenu" && e.items.forEach((n, r) => _.push(h(n, [t, r], e.items.length)));
	});
	let v = i.map((e, t) => [e, t]).filter(([e]) => e.type === "submenu"), y = [{
		value: "root",
		label: R("menu.target.root")
	}, ...v.map(([e, t]) => ({
		value: String(t),
		label: R("menu.target.inside", { name: e.label })
	}))], b = (e, t) => o(c(e === "root" ? [0] : [Number(e), 0], (e) => e.push(t))), x = p.actions(e).filter((e) => e.id !== "desktop.create" && e.id !== "app.launch"), S = g({
		value: x[0]?.id,
		label: R("menu.item.field"),
		options: [...x.map((e) => ({
			value: e.id,
			label: e.label
		})), ...N.filter((e) => e.load).map((e) => ({
			value: `app:${e.id}`,
			label: R("menu.item.open", { name: e.name })
		}))]
	}), C = g({
		value: "root",
		options: y,
		label: R("menu.target.label")
	}), T = g({
		value: "root",
		options: y,
		label: R("menu.target.label")
	}), E = v[0], D = w({
		placeholder: R("menu.new.labelPlaceholder"),
		label: R("menu.new.labelField")
	}), O = w({
		placeholder: R("menu.new.namePlaceholder"),
		label: R("menu.new.nameField")
	}), k = g({
		value: "file",
		options: [{
			value: "file",
			label: R("menu.new.kindFile")
		}, {
			value: "folder",
			label: R("menu.new.kindFolder")
		}],
		label: R("menu.new.kind")
	}), A = null, j = a({
		label: R("menu.template.button"),
		onClick: async () => {
			let e = await P(t, {
				title: R("menu.template.title"),
				text: R("menu.template.text")
			});
			e && (A = e.id, j.textContent = R("menu.template.chosen", { name: e.name }));
		}
	}), M = u("small", { class: "mm-note" });
	return [{
		title: p.list().find((t) => t.id === e)?.label ?? e,
		rows: _
	}, {
		title: R("common.add"),
		rows: [
			{
				label: R("menu.item.label"),
				description: R("menu.item.description"),
				control: u("div", { class: "mm-add" }, S, C, a({
					label: R("common.add"),
					onClick: () => {
						let e = S.value, t = e.startsWith("app:") ? {
							type: "action",
							action: "app.launch",
							label: R("menu.item.open", { name: N.find((t) => t.id === e.slice(4))?.name }),
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
				label: R("menu.separatorRow.label"),
				description: R("menu.separatorRow.description"),
				control: u("div", { class: "mm-add" }, T, a({
					label: R("common.add"),
					onClick: () => b(T.value, { type: "separator" })
				}))
			},
			...E ? [{
				label: R("menu.new.label", { name: E[0].label }),
				description: R("menu.new.description"),
				control: u("div", { class: "mm-add" }, D, O, k, j, a({
					label: R("common.add"),
					primary: !0,
					onClick: () => {
						let e = D.value.trim(), t = O.value.trim();
						if (!e || !t) {
							M.textContent = R("menu.new.missing");
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
				label: R("menu.defaults.label"),
				description: p.isCustom(e) ? R("menu.defaults.custom") : R("menu.defaults.default"),
				control: r(R("common.reset"), R("common.confirm"), () => {
					p.reset(e), n();
				})
			}
		]
	}];
}
// src/settings/services.js
var z = null, B = null;
function V(e) {
	D.services ? B ??= D.services.list().then((e) => {
		z = e;
	}, (e) => {
		z = { error: e.message };
	}).finally(() => {
		B = null, e();
	}) : z = { get error() {
		return R("services.unsupported");
	} };
}
function pe(e) {
	return D.services?.on("change", () => V(e)) ?? null;
}
function me(e) {
	let t = Math.round((Date.now() - e) / 6e4);
	if (t < 1) return R("services.status.onNow");
	if (t < 60) return R("services.status.onMinutes", { n: t });
	let n = Math.round(t / 60);
	return n < 48 ? R("services.status.onHours", { n }) : R("services.status.onSince", { date: L.date(e) });
}
function he(e) {
	return e.status === "on" ? me(e.since) : e.status === "starting" && e.error ? R("services.status.restarting", { error: e.error }) : e.status === "error" ? R("services.status.error", { error: e.error ?? R("services.status.unknownError") }) : e.status === "off" ? R("services.status.off") : e.status === "starting" ? R("services.status.starting") : e.status;
}
var H = async (e, t) => {
	try {
		await e();
	} catch (e) {
		T(e.message, { timeout: 7e3 });
	}
	V(t);
};
function ge(e) {
	z || V(e);
	let t = z && !z.error && z.available, n = E({
		value: t ? z.enabled : !1,
		label: R("services.auto.label"),
		onChange: (t) => H(() => D.services.setEnabled(t), e)
	});
	return n.disabled = !t, {
		label: R("services.auto.label"),
		description: z ? z.error ? z.error : z.available ? R("services.auto.description") : R("services.auto.noEngine") : R("common.loading"),
		keywords: R("services.auto.keywords"),
		control: n
	};
}
function _e(e) {
	z || V(e.rerender);
	let t = (e) => [{
		title: R("services.title"),
		rows: [{ label: e }]
	}];
	return z ? z.error ? t(z.error) : z.available ? z.services.length ? [{
		title: R("services.title"),
		content: () => u("div", { class: "su-apps" }, u("p", { class: "su-hint" }, R("services.hint")), u("div", { class: "st-card su-app" }, z.services.flatMap((t) => ve(t, e))))
	}] : t(R("services.none")) : t(R("services.noEngine")) : t(R("common.loading"));
}
function ve(e, t) {
	let { rerender: n } = t, r = `${e.name} · ${e.label}`, i = [
		{
			value: "none",
			label: R("services.startup.none")
		},
		{
			value: "login",
			label: R("services.startup.login")
		},
		...z.admin || e.startup === "system" ? [{
			value: "system",
			label: R("services.startup.system")
		}] : []
	], s = g({
		value: e.startup,
		options: i,
		label: R("services.startup.field", { name: r }),
		onChange: (t) => H(() => D.services.setStartup(e.app, e.entry, t), n)
	});
	s.disabled = e.system && !z.admin;
	let c = e.status === "on" || e.status === "starting", l = u("button", {
		class: "ctl-btn su-clear",
		type: "button",
		title: R("services.restart"),
		"aria-label": R("services.restartOf", { name: r })
	}, d("redo"));
	l.disabled = !e.canControl || !c, l.addEventListener("click", () => H(() => D.services.restart(e.app, e.entry), n));
	let f = a({
		label: R(c ? "services.stop" : "services.start"),
		spinner: !0,
		onClick: () => H(() => D.services[c ? "stop" : "start"](e.app, e.entry), n)
	});
	f.disabled = !e.canControl, f.classList.add("su-power");
	let p = a({
		label: R("services.log.label"),
		onClick: () => be(e, t)
	});
	p.disabled = e.system && !z.admin;
	let m = u("div", { class: "st-row su-service" }, o(e, "su-icon"), u("div", { class: "st-label" }, u("b", {}, r), u("small", {}, u("span", { class: `su-state ${e.status}` }, he(e)), " · ", u("code", {}, e.entry), e.system && !z.admin ? ` · ${R("services.byAdmin")}` : "")), s, l, f, p);
	return e.params && e.startup !== "none" ? [m, ye(e, t)] : [m];
}
function ye(e, { openWindow: t, rerender: n }) {
	let r = e.system && !z.admin, i = { ...e.values }, o = (t, r) => {
		let a = { ...i };
		r === "" || r == null ? delete a[t] : a[t] = r, i = a, H(() => D.services.setStartup(e.app, e.entry, e.startup, a), n);
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
				label: R("common.choose"),
				onClick: async () => {
					let r = await P(t, {
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
async function be(e, { openWindow: t }) {
	let n;
	try {
		n = await D.services.log(e.app, e.entry);
	} catch (e) {
		return T(e.message, { timeout: 7e3 });
	}
	let r = new i({
		title: R("services.log.title", { name: `${e.name} · ${e.label}` }),
		icon: "list",
		width: 620,
		height: 380
	}), a = (e) => new Date(e).toLocaleTimeString(_.locale);
	r.body.append(u("div", {
		class: "su-log",
		tabindex: "0",
		"aria-label": R("services.log.label")
	}, n.length ? n.map((e) => u("div", { class: `su-line ${e.level}` }, u("span", {}, a(e.at)), ` ${e.text}`)) : u("p", { class: "su-empty" }, R("services.log.empty")))), t(r);
}
// src/settings/startup.js
function xe({ rerender: e }) {
	return [{
		title: R("startup.auto.title"),
		rows: [ge(e), {
			label: R("startup.openApps.label"),
			description: R("startup.openApps.description"),
			keywords: R("startup.openApps.keywords"),
			control: E({
				value: v.get("startupApps"),
				label: R("startup.openApps.label"),
				onChange: (e) => v.set("startupApps", e)
			})
		}]
	}, {
		title: R("startup.trouble.title"),
		rows: [{
			label: R("startup.safe.label"),
			description: R("startup.safe.description"),
			keywords: R("startup.safe.keywords"),
			control: F.skipped ? R("startup.safe.active") : ""
		}]
	}];
}
function Se(e) {
	let t = F.apps().filter((e) => N.some((t) => t.id === e.app));
	return [{
		title: R("startup.apps.title"),
		content: () => u("div", { class: "su-apps" }, u("p", { class: "su-hint" }, R("startup.apps.hint")), t.length ? t.map((t) => Ce(t, e)) : u("p", { class: "su-empty" }, R("startup.apps.none")), Ee(t, e))
	}];
}
function Ce(e, t) {
	let n = N.find((t) => t.id === e.app), r = F.windowEntries(n.id), i = new Map(e.entries.map((e) => [e.entry, e.params])), s = r.filter((e) => i.has(e.entry)).length, c = u("div", { class: "st-row su-head" }, o(n, "su-icon"), u("div", { class: "st-label" }, u("b", {}, n.name), u("small", {}, r.length === 1 ? R("startup.apps.oneEntry") : R("startup.apps.entries", {
		on: s,
		n: r.length
	}))), a({
		label: R("startup.apps.remove"),
		onClick: () => {
			F.removeApp(n.id), t.rerender();
		}
	})), l = r.flatMap((e) => {
		let r = i.has(e.entry), a = u("div", { class: "st-row su-entry" }, E({
			value: r,
			label: `${n.name}: ${e.label}`,
			onChange: (r) => {
				try {
					F.setEntry(n.id, e.entry, r);
				} catch (e) {
					T(e.message);
				}
				t.rerender();
			}
		}), u("div", { class: "st-label" }, u("b", {}, e.label), u("small", {}, u("code", {}, e.entry))));
		return r ? [a, we(n, e, i.get(e.entry), t)] : [a];
	});
	return u("div", { class: "st-card su-app" }, c, l);
}
function we(e, t, n, { openWindow: r }) {
	let i = R("startup.params.of", {
		entry: t.label,
		app: e.name
	});
	if (!t.params) {
		let r = R("startup.params.undescribed"), a = u("span", { class: "su-note" }, r), o = u("textarea", {
			class: "su-json",
			spellcheck: "false",
			placeholder: "{ }",
			"aria-label": R("startup.params.jsonOf", { name: i })
		});
		return o.value = Object.keys(n).length ? JSON.stringify(n) : "", o.addEventListener("change", () => {
			let n = o.value.trim();
			try {
				let i;
				try {
					i = n ? JSON.parse(n) : {};
				} catch {
					throw Error(R("startup.params.invalidJson"));
				}
				F.setParams(e.id, t.entry, i), o.removeAttribute("aria-invalid"), a.classList.remove("bad"), a.textContent = r;
			} catch (e) {
				o.setAttribute("aria-invalid", "true"), a.classList.add("bad"), a.textContent = R("startup.params.notSaved", { error: e.message });
			}
		}), u("div", { class: "su-params" }, u("span", { class: "su-plabel" }, R("startup.params.json")), u("span"), o, a);
	}
	let a = { ...n }, o = (n, r) => {
		let i = { ...a };
		r === "" || r == null ? delete i[n] : i[n] = r;
		try {
			return F.setParams(e.id, t.entry, i), a = i, !0;
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
		})) : t.type === "file" || t.type === "folder" ? c = Te(t, n, s, (t) => o(e, t), r) : (c = w({
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
function Te(e, t, n, r, i) {
	let o = e.type === "folder", s = u("input", {
		class: "ctl-text",
		type: "text",
		readonly: !0,
		placeholder: R(o ? "startup.path.noFolder" : "startup.path.noFile"),
		"aria-label": n
	}), c = (e) => {
		s.value = e ? l.exists(e) ? l.path(e) : R("startup.path.gone") : "";
	};
	c(t);
	let f = a({
		label: R("common.choose"),
		onClick: async () => {
			let t = await P(i, {
				kind: o ? "folder" : "file",
				title: e.label
			});
			t && r(t.id) && c(t.id);
		}
	}), p = u("button", {
		class: "ctl-btn su-clear",
		type: "button",
		title: R("common.remove"),
		"aria-label": R("startup.path.clear", { name: e.label })
	}, d("x"));
	return p.addEventListener("click", () => {
		r(null) && c(null);
	}), u("div", { class: "su-path" }, s, f, p);
}
function Ee(e, { rerender: t }) {
	let n = a({
		label: R("common.addMore"),
		onClick: () => {
			let r = N.filter((t) => t.load && !e.some((e) => e.app === t.id) && F.windowEntries(t.id).length).sort((e, t) => e.name.localeCompare(t.name));
			if (!r.length) return T(R("startup.apps.allAdded"));
			let i = n.getBoundingClientRect();
			m(i.left, i.bottom + 4, r.map((e) => ({
				label: e.name,
				icon: e.glyph,
				action: () => {
					try {
						F.addApp(e.id);
					} catch (e) {
						T(e.message);
					}
					t();
				}
			})));
		}
	});
	return u("div", { class: "st-row su-add" }, u("span", { class: "su-plus" }, d("plus")), u("div", { class: "st-label" }, u("b", {}, R("startup.apps.add")), u("small", {}, R("startup.apps.addDescription"))), n);
}
// src/settings/pipes.js
var U = ["before", "after"], W = (e) => {
	let t = `pipes.event.${e.name}`, n = R(t);
	return n === t ? e.label : n;
}, De = (e) => {
	if (!e.owner) return W(e);
	let t = N.find((t) => t.id === e.owner)?.name ?? e.owner;
	return R("pipes.owned", {
		label: W(e),
		app: t
	});
};
function Oe(e) {
	if (!e) return R("pipes.where.all");
	if (typeof e == "string") return R("pipes.where.system");
	let t = [];
	return e.meta === "own" && t.push(R("pipes.where.own")), e.ext && t.push(R("pipes.where.ext", { list: e.ext.map((e) => `.${e}`).join(" ") })), e.type && t.push(R(`pipes.where.type.${e.type}`)), e.app && t.push(R("pipes.where.app", { list: e.app.join(", ") })), t.join(" · ");
}
function ke(e, t, n, r) {
	let i = e.chain(t.name, n);
	if (!i.length) return [];
	let o = n === "after" ? [...i].reverse() : i, s = (a, o) => {
		let s = i.map((e) => e.key), c = n === "after" ? i.length - 1 - a : a, l = n === "after" ? c - o : c + o;
		[s[c], s[l]] = [s[l], s[c]], e.setOrder(t.name, n, s), r();
	};
	return o.map((e, t) => {
		let r = e.position, i = (e) => !!e?.app && e.position === r, c = !!e.app && i(o[t - 1]), l = !!e.app && i(o[t + 1]), d = e.app ? e.entry && e.entry !== "main" ? `${e.name} · ${e.entry}` : e.name : R("pipes.lilos"), f = a({
			label: R("pipes.up"),
			onClick: () => s(t, -1)
		}), p = a({
			label: R("pipes.down"),
			onClick: () => s(t, 1)
		});
		return f.disabled = !c, p.disabled = !l, {
			label: `${t + 1}. ${d}`,
			description: `${R(`pipes.stage.${n}`)} · ${R(`pipes.band.${r}`)} · ${Oe(e.where)}`,
			keywords: R("pipes.keywords"),
			control: c || l ? u("span", { class: "pipes-move" }, f, p) : null
		};
	});
}
function Ae({ rerender: t }) {
	let n = e.pipes;
	if (!n) return [{
		title: R("pipes.title"),
		rows: [{ label: R("pipes.unsupported") }]
	}];
	let r = n.catalog(), i = r.filter((e) => U.some((t) => n.chain(e.name, t).length)), o = [{
		title: R("pipes.title"),
		rows: [{
			label: R("pipes.intro.label"),
			description: R("pipes.intro.description", { count: r.length }),
			keywords: R("pipes.keywords")
		}]
	}];
	for (let e of i) {
		let r = U.flatMap((r) => ke(n, e, r, t));
		U.some((t) => n.isCustomOrder(e.name, t)) && r.push({
			label: R("pipes.reset.label"),
			description: R("pipes.reset.description"),
			control: a({
				label: R("common.reset"),
				onClick: () => {
					U.forEach((t) => n.setOrder(e.name, t, null)), t();
				}
			})
		}), o.push({
			title: `${De(e)} · ${e.name}`,
			rows: r
		});
	}
	let s = r.filter((e) => !i.includes(e));
	return o.push({
		title: R("pipes.idle.title"),
		rows: s.length ? [{
			label: s.map(De).join(", "),
			description: R("pipes.idle.description", { count: s.length })
		}] : [{ label: R("pipes.idle.none") }]
	}), o;
}
var je = (t) => e.pipes?.on("change", t) ?? null, G = null;
function Me(e) {
	let t = I(), n = t?.list().find((t) => t.id === e);
	return n ? [
		{
			title: R("workspaces.current.title"),
			rows: [
				{
					label: R("common.name"),
					keywords: R("workspaces.name.keywords"),
					control: () => {
						let e = w({
							value: n.name,
							label: R("workspaces.name.field"),
							onChange: (e) => t.rename(n.id, e)
						});
						return e.maxLength = j.MAX_NAME, e;
					}
				},
				t.setDescription && {
					label: R("workspaces.description.label"),
					description: R("workspaces.description.description"),
					keywords: R("workspaces.description.keywords"),
					control: () => {
						let e = w({
							value: n.description ?? "",
							placeholder: R("workspaces.description.placeholder"),
							label: R("workspaces.description.field"),
							onChange: (e) => t.setDescription(n.id, e)
						});
						return e.maxLength = j.MAX_DESCRIPTION ?? 200, e;
					}
				},
				{
					label: R("common.color"),
					description: R("workspaces.color.description"),
					keywords: R("workspaces.color.keywords"),
					control: () => S({
						value: n.color,
						colors: O,
						onChange: (e) => t.setColor(n.id, e)
					})
				},
				{
					label: R("workspaces.owned.label"),
					description: R("workspaces.owned.description"),
					control: String(t.ownedCount(n.id))
				},
				e !== t.currentId && {
					label: R("workspaces.switch.label"),
					keywords: R("workspaces.list.keywords"),
					control: () => a({
						label: R("workspaces.list.switch"),
						onClick: () => t.switchTo(e)
					})
				}
			].filter(Boolean)
		},
		{
			title: R("workspaces.apps.title"),
			rows: N.map((r) => ({
				label: r.name,
				description: r.system ? R("workspaces.apps.system") : R("workspaces.apps.installed"),
				keywords: R("workspaces.apps.keywords", { name: r.name }),
				control: r.system ? R("workspaces.apps.alwaysVisible") : () => E({
					value: t.isInstalled(r.id, e),
					label: e === t.currentId ? R("workspaces.apps.toggle", { name: r.name }) : R("workspaces.apps.toggleIn", {
						name: r.name,
						workspace: n.name
					}),
					onChange: (n) => t.setInstalled(r.id, n, e)
				})
			}))
		},
		...Ve(e)
	] : [];
}
var Ne = {
	id: "current",
	get label() {
		return R("workspaces.current.label");
	},
	sections: () => Me(I()?.currentId)
}, Pe = {
	id: "all",
	get label() {
		return R("workspaces.all.label");
	},
	sections: Ie
}, K = /* @__PURE__ */ new Map();
function Fe() {
	let e = I();
	return [
		Ne,
		...(e?.list() ?? []).filter((t) => t.id !== e.currentId).map((e) => (K.has(e.id) || K.set(e.id, {
			id: `ws-${e.id}`,
			get label() {
				return I()?.describe(e.id)?.name ?? "";
			},
			sections: () => Me(e.id)
		}), K.get(e.id))),
		Pe
	];
}
function Ie() {
	let e = I();
	if (!e) return [];
	let t = e.list();
	return [
		{
			title: R("workspaces.label"),
			rows: [...t.map((n) => {
				let r = n.id === e.currentId, i = N.filter((t) => e.isInstalled(t.id, n.id)).length;
				return {
					label: r ? R("workspaces.list.current", { name: n.name }) : n.name,
					description: `${R("workspaces.list.owned", { n: e.ownedCount(n.id) })} · ${R("workspaces.list.apps", { n: i })}`,
					keywords: R("workspaces.list.keywords"),
					control: () => u("div", { class: "ws-settings-actions" }, r ? null : a({
						label: R("workspaces.list.switch"),
						onClick: () => e.switchTo(n.id)
					}), t.length > 1 ? Z(R("common.delete"), R("common.deleteNow"), () => e.remove(n.id)) : null)
				};
			}), {
				label: R("workspaces.new.label"),
				description: R("workspaces.new.description"),
				control: a({
					label: R("common.create"),
					onClick: () => {
						let t = e.create();
						t && e.switchTo(t);
					}
				})
			}]
		},
		...He(),
		{
			title: R("workspaces.deleting.title"),
			rows: [{
				label: R("workspaces.deleting.files.label"),
				description: R("workspaces.deleting.files.description")
			}, {
				label: R("workspaces.deleting.windows.label"),
				description: R("workspaces.deleting.windows.description")
			}]
		}
	];
}
var q = [];
function Le() {
	let e = (e) => {
		try {
			let t = C.create({ name: e.value });
			q.length && ce(q, t.id, !0), q = [];
		} catch (t) {
			T(t.message), e.focus();
		}
	}, t = q.filter((e) => l.exists(e)).length;
	return [{
		title: R("tags.new.title"),
		rows: [{
			label: R("common.name"),
			description: t ? R("tags.new.pending", { n: t }) : R("tags.new.description"),
			keywords: R("tags.new.keywords"),
			control: () => {
				let t = w({
					placeholder: R("tags.new.placeholder"),
					label: R("tags.new.field")
				});
				return t.maxLength = 30, t.classList.add("tag-new-name"), t.addEventListener("keydown", (n) => {
					n.key === "Enter" && (n.preventDefault(), e(t));
				}), u("div", { class: "tag-settings-actions" }, t, a({
					label: R("common.create"),
					primary: !0,
					onClick: () => e(t)
				}));
			}
		}]
	}, ...C.list().map((e) => ({
		title: e.name,
		rows: [
			{
				label: R("common.name"),
				keywords: R("tags.name.keywords"),
				control: () => {
					let t = w({
						value: e.name,
						label: R("tags.name.field", { name: e.name }),
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
				label: R("common.color"),
				keywords: R("tags.color.keywords"),
				control: () => S({
					value: e.color,
					colors: r,
					onChange: (t) => C.setColor(e.id, t)
				})
			},
			{
				label: R("tags.visible.label"),
				description: e.visible ? R("tags.visible.on") : R("tags.visible.off"),
				keywords: R("tags.visible.keywords"),
				control: () => E({
					value: e.visible,
					label: R("tags.visible.toggle", { name: e.name }),
					onChange: (t) => C.setVisible(e.id, t)
				})
			},
			{
				label: R("common.items"),
				description: R("tags.items.description", { n: l.tagged(e.id).length }),
				control: () => u("div", { class: "tag-settings-actions" }, a({
					label: R("tags.items.show"),
					onClick: () => ae("files", { tag: e.id })
				}), Z(R("common.delete"), R("tags.items.delete"), () => C.remove(e.id)))
			}
		]
	}))];
}
var Re = [
	"home",
	"documents",
	"images",
	"files",
	"downloads",
	"trash"
];
function ze(e) {
	return Re.includes(e.key) ? {
		...e,
		name: R(`desk.fixed.item.${e.key}.name`),
		description: R(`desk.fixed.item.${e.key}.description`)
	} : e;
}
function J(e, t) {
	let n = (D.DESK_FIXED_ITEMS ?? []).map(ze);
	return n.length ? [{
		title: R("desk.fixed.title"),
		rows: [{
			label: R("desk.fixed.label"),
			description: e
		}, ...n.map((e) => ({
			label: e.name,
			description: e.description,
			keywords: R("desk.fixed.keywords", { name: e.name }),
			...t(e)
		}))]
	}] : [];
}
var Be = () => typeof D.setFixedShownEverywhere == "function";
function Ve(e) {
	if (!Be()) return [];
	let t = I(), n = (n) => e === t?.currentId ? R("desk.fixed.toggle", { name: n }) : R("desk.fixed.toggleIn", {
		name: n,
		workspace: t?.describe(e)?.name ?? ""
	});
	return J(R("desk.fixed.descriptionWorkspace"), (t) => ({ control: () => E({
		value: D.isFixedShown(t.key, e),
		label: n(t.name),
		onChange: (n) => D.setFixedShown(t.key, n, e)
	}) }));
}
function He() {
	let e = I();
	if (Be() && e) {
		let t = e.list();
		return J(R("desk.fixed.descriptionAll"), (e) => {
			let n = t.filter((t) => D.isFixedShown(e.key, t.id)).length;
			return {
				description: n && n < t.length ? R("desk.fixed.some", {
					on: n,
					n: t.length
				}) : e.description,
				control: () => E({
					value: n === t.length,
					label: R("desk.fixed.toggleAll", { name: e.name }),
					onChange: (t) => D.setFixedShownEverywhere(e.key, t)
				})
			};
		});
	}
	let t = typeof D.setFixedShown == "function";
	return J(R(t ? "desk.fixed.descriptionSwitchable" : "desk.fixed.description"), (e) => ({ control: t ? () => E({
		value: D.isFixedShown(e.key),
		label: R("desk.fixed.toggle", { name: e.name }),
		onChange: (t) => D.setFixedShown(e.key, t)
	}) : R("desk.fixed.always") }));
}
function Ue() {
	return (D.DESK_FIXED_ITEMS ?? []).length ? [{
		title: R("desk.fixed.title"),
		rows: [{
			label: R("desk.fixed.moved.label"),
			description: R("desk.fixed.moved.description"),
			keywords: R("desk.fixed.moved.keywords"),
			control: () => a({
				label: R("desk.fixed.moved.open"),
				onClick: () => G?.select("workspaces", "current")
			})
		}]
	}] : [];
}
function We(e, t) {
	let n = u("input", {
		class: "desk-color-field",
		type: "color",
		"aria-label": R("desk.background.custom.label")
	});
	return n.value = /^#[0-9a-f]{6}$/i.test(e) ? e : "#1f2227", n.addEventListener("change", () => t(n.value)), n;
}
function Ge(e) {
	let t = v.get("deskColor"), n = D.wallpaperInfo(), r = async () => {
		let t = await D.pickFile(e, {
			title: R("desk.background.image.pick"),
			exts: D.WALLPAPER_EXTS
		});
		t && await D.setWallpaper(t.id);
	};
	return [{
		title: R("desk.background.color.title"),
		rows: [
			{
				label: R("common.color"),
				description: R("desk.background.color.description"),
				keywords: R("desk.background.color.keywords"),
				control: () => {
					let e = S({
						value: t,
						colors: D.DESK_COLORS,
						onChange: (e) => v.set("deskColor", e)
					});
					return e.classList.add("desk-color-swatches"), e;
				}
			},
			{
				label: R("desk.background.custom.label"),
				description: R("desk.background.custom.description"),
				keywords: R("desk.background.color.keywords"),
				control: () => We(t, (e) => v.set("deskColor", e))
			},
			t && {
				label: R("desk.background.theme.label"),
				description: R("desk.background.theme.description"),
				control: () => a({
					label: R("desk.background.theme.button"),
					onClick: () => v.set("deskColor", "")
				})
			}
		].filter(Boolean)
	}, {
		title: R("desk.background.image.title"),
		rows: [{
			label: R("desk.background.image.label"),
			keywords: R("desk.background.image.keywords"),
			description: n ? R("desk.background.image.current", { name: n.name }) : R("desk.background.image.none"),
			control: () => a({
				label: R("desk.background.image.choose"),
				spinner: !0,
				onClick: r
			})
		}, n && {
			label: R("desk.background.image.remove.label"),
			description: R("desk.background.image.remove.description"),
			control: () => a({
				label: R("desk.background.image.remove.button"),
				onClick: () => D.clearWallpaper()
			})
		}].filter(Boolean)
	}];
}
var Y = (e) => () => E({
	value: v.get(e),
	onChange: (t) => v.set(e, t)
}), Ke = {
	groups: [
		"header",
		"actions",
		"account",
		"session",
		"footer"
	],
	items: [
		"details",
		"lock",
		"logout",
		"restart",
		"photo",
		"theme",
		"language",
		"settings",
		"workspace",
		"windows",
		"startup",
		"storage",
		"about"
	]
};
function qe() {
	let e = D.USER_PAGE_ITEMS ?? [], t = (e) => Ke.groups.includes(e.key) ? R(`userPage.group.${e.key}`) : e.name, n = (e) => Ke.items.includes(e.key) ? {
		name: R(`userPage.item.${e.key}.name`),
		description: R(`userPage.item.${e.key}.description`)
	} : e;
	return [{
		title: R("userPage.title"),
		rows: [{
			label: R("userPage.open.label"),
			description: R("userPage.open.description")
		}]
	}, ...(D.USER_PAGE_GROUPS ?? []).map((r) => ({
		title: t(r),
		rows: e.filter((e) => e.group === r.key).map((e) => {
			let { name: t, description: r } = n(e);
			return {
				label: t,
				description: r,
				keywords: R("userPage.keywords", { name: t }),
				control: () => E({
					value: D.isUserPageShown(e.key),
					label: R("userPage.toggle", { name: t }),
					onChange: (t) => D.setUserPageShown(e.key, t)
				})
			};
		})
	})).filter((e) => e.rows.length)];
}
var X = [
	"Generale",
	"Scrivania",
	"Elementi",
	"Finestre"
];
function Je() {
	let e = new Set(ie()), t = /* @__PURE__ */ new Set(), n = (e) => {
		t.add(e);
		let n = te(e);
		return {
			label: e ? `.${e}` : R("fileTypes.noExtension"),
			description: n ? R("fileTypes.default", { app: n.name }) : R("fileTypes.noDefault"),
			keywords: R("fileTypes.keywords", { ext: e }),
			control: () => g({
				value: M(e)?.id ?? "ask",
				label: e ? R("fileTypes.field", { ext: e }) : R("fileTypes.fieldNoExtension"),
				options: [{
					value: "ask",
					label: R("fileTypes.ask")
				}, ...re().map((e) => ({
					value: e.id,
					label: e.name
				}))],
				onChange: (t) => se(e, t)
			})
		};
	}, r = c().map((t) => ({
		title: t.label,
		rows: t.exts.filter((t) => e.has(t)).map(n)
	})).filter((e) => e.rows.length), i = [...e].filter((e) => !t.has(e)).sort((e, t) => e === "" ? -1 : t === "" ? 1 : e.localeCompare(t));
	return [
		{
			title: R("fileTypes.title"),
			rows: [{
				label: R("fileTypes.all.label"),
				description: R("fileTypes.all.description"),
				control: Z(R("fileTypes.all.reset"), R("common.confirm"), () => {
					oe(), G?.render();
				})
			}]
		},
		...r,
		...i.length ? [{
			title: R("fileTypes.others"),
			rows: i.map(n)
		}] : []
	];
}
function Ye() {
	let e = l.trashed(), t = e.reduce((e, t) => e + t.bytes, 0);
	return [{
		title: R("trash.deleting.title"),
		rows: [{
			label: R("trash.confirm.label"),
			description: R("trash.confirm.description"),
			keywords: R("trash.confirm.keywords"),
			control: Y("deleteConfirm")
		}, {
			label: R("trash.permanent.label"),
			description: R("trash.permanent.description"),
			keywords: R("trash.permanent.keywords"),
			control: Y("deletePermanent")
		}]
	}, {
		title: R("trash.label"),
		rows: [
			{
				label: R("trash.retention.label"),
				description: R("trash.retention.description"),
				keywords: R("trash.retention.keywords"),
				control: () => {
					let e = v.get("trashRetention"), t = A.some((t) => t.value === e) ? A : [...A, {
						value: e,
						label: e > 0 ? R("trash.retention.days", { n: e }) : R("trash.retention.forever")
					}];
					return g({
						value: e,
						label: R("trash.retention.field"),
						options: t,
						onChange: (e) => v.set("trashRetention", Number(e))
					});
				}
			},
			{
				label: R("trash.contents.label"),
				description: e.length ? R("trash.contents.description", {
					n: e.length,
					size: Q(t)
				}) : R("trash.contents.empty"),
				keywords: R("trash.contents.keywords"),
				control: a({
					label: R("trash.contents.open"),
					onClick: () => ae("files", { trash: !0 })
				})
			},
			{
				label: R("trash.empty.label"),
				description: R("trash.empty.description"),
				keywords: R("trash.empty.keywords"),
				control: e.length ? Z(R("trash.empty.button"), R("trash.empty.confirm"), () => l.purgeTrash()) : R("trash.empty.none")
			}
		]
	}];
}
function Xe(e = l.root) {
	return l.children(e).reduce((e, t) => e + (t.type === "folder" ? Xe(t.id) : t.size ?? 0), 0);
}
function Ze() {
	let e = /* @__PURE__ */ new Map();
	for (let t of b.list()) e.has(t.group) || e.set(t.group, []), e.get(t.group).push(t);
	let t = (e) => X.includes(e) ? X.indexOf(e) : X.length;
	return [
		{
			title: R("shortcuts.title"),
			rows: [{
				label: R("shortcuts.all.label"),
				description: R("shortcuts.all.description"),
				control: Z(R("shortcuts.all.reset"), R("common.confirm"), () => b.resetAll())
			}]
		},
		...[...e].sort(([e], [n]) => t(e) - t(n)).map(([e, t]) => ({
			title: e,
			rows: t.map((e) => ({
				label: e.label,
				keywords: R("shortcuts.keywords", { keys: e.keys.map((e) => b.format(e)).join(" ") }),
				control: y(e.id)
			}))
		})),
		{
			title: R("shortcuts.mouse.title"),
			rows: [
				{
					label: R("shortcuts.lasso.label"),
					description: R("shortcuts.lasso.description"),
					keywords: R("shortcuts.lasso.keywords"),
					control: () => g({
						value: v.get("lasso"),
						options: k,
						onChange: (e) => v.set("lasso", e)
					})
				},
				{
					label: R("shortcuts.rectangle.label"),
					control: R("shortcuts.rectangle.control")
				},
				{
					label: R("shortcuts.addToSelection.label"),
					control: R("shortcuts.addToSelection.control")
				},
				{
					label: R("shortcuts.pan.label"),
					control: R("shortcuts.pan.control")
				}
			]
		},
		{
			title: R("shortcuts.fixed.title"),
			rows: [{
				label: R("shortcuts.navigate.label"),
				control: R("shortcuts.navigate.control")
			}, {
				label: R("shortcuts.rename.label"),
				control: R("shortcuts.rename.control")
			}]
		}
	];
}
var Qe = () => ({
	isolated: R("apps.mode.isolated"),
	open: R("apps.mode.open"),
	system: R("apps.mode.system"),
	remote: R("apps.mode.remote")
});
function $e() {
	let e = ee(), { isolated: t } = s.security(), n = N.filter((e) => e.package && !e.package.system);
	return [{
		title: R("apps.execution.title"),
		rows: [{
			label: R("apps.isolated.label"),
			description: R(e ? "apps.isolated.description" : "apps.isolated.adminOnly"),
			keywords: R("apps.isolated.keywords"),
			control: e ? E({
				value: t,
				label: R("apps.isolated.label"),
				onChange: async (e) => {
					try {
						await s.setSecurity({ isolated: e });
					} catch (e) {
						T(R("apps.isolated.failed", { error: e.message }));
					}
					G?.render();
				}
			}) : R(t ? "common.yes" : "common.no")
		}, {
			label: R("apps.system.label"),
			description: R("apps.system.description")
		}]
	}, {
		title: R("apps.installed.title"),
		rows: n.length ? n.map((e) => {
			let t = ne(e.package), n = t.fixed ? t.reason : t.own === null ? R("apps.installed.shared") : R("apps.installed.own");
			return {
				label: e.name,
				description: `${Qe()[t.mode]} · ${n}`,
				keywords: R("apps.installed.keywords"),
				control: a({
					label: R("apps.installed.properties"),
					onClick: () => le(e.id)
				})
			};
		}) : [{ label: R("apps.installed.none") }]
	}];
}
function Z(e, t, n) {
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
function et() {
	return x.bytes();
}
function Q(e) {
	return e == null ? R("common.unavailable") : e < 1024 ? `${e} B` : `${(e / 1024).toLocaleString(_.locale, { maximumFractionDigits: 1 })} KB`;
}
var tt = [
	[/Edg\/(\d+)/, "Edge"],
	[/Firefox\/(\d+)/, "Firefox"],
	[/Chrome\/(\d+)/, "Chrome"],
	[/Version\/(\d+).*Safari/, "Safari"]
];
function nt() {
	for (let [e, t] of tt) {
		let n = navigator.userAgent.match(e);
		if (n) return `${t} ${n[1]}`;
	}
	return R("about.unknownBrowser");
}
function rt(e, t = e) {
	try {
		return new Intl.DisplayNames([t], { type: "language" }).of(e) ?? e;
	} catch {
		return e;
	}
}
function it() {
	let t = v.get("language"), n = [...e.LANGUAGES ?? []];
	t !== "auto" && !n.includes(t) && n.push(t);
	let r = (e) => {
		let t = rt(e);
		return t.charAt(0).toUpperCase() + t.slice(1);
	};
	return [{
		title: R("language.title"),
		rows: [{
			label: R("language.label"),
			description: R("language.row.description"),
			keywords: R("language.keywords"),
			control: () => g({
				value: t,
				label: R("language.label"),
				options: [{
					value: "auto",
					label: R("language.auto", { name: rt(navigator.language || "en", L.lang) })
				}, ...n.map((e) => ({
					value: e,
					label: r(e)
				}))],
				onChange: (e) => v.set("language", e)
			})
		}]
	}];
}
var at = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	10
], ot = [
	3,
	5,
	8,
	10,
	15,
	30,
	60
], st = [
	10,
	20,
	50,
	100,
	200
];
function $({ value: e, values: t, label: n, text: r = String, onChange: i }) {
	let a = t.includes(e) ? t : [...t, e].sort((e, t) => e - t);
	return g({
		value: e,
		label: n,
		options: a.map((e) => ({
			value: e,
			label: r(e)
		})),
		onChange: (e) => i(Number(e))
	});
}
function ct() {
	let { notifications: t } = e, n = (e) => T(R("notifications.error", { message: e.message }));
	return [{
		title: R("notifications.arrive.title"),
		rows: [{
			label: R("notifications.shown.label"),
			description: R("notifications.shown.description"),
			keywords: R("notifications.shown.keywords"),
			control: () => $({
				value: v.get("notifyShown"),
				values: at,
				label: R("notifications.shown.field"),
				onChange: (e) => v.set("notifyShown", e)
			})
		}, {
			label: R("notifications.seconds.label"),
			description: R("notifications.seconds.description"),
			keywords: R("notifications.seconds.keywords"),
			control: () => $({
				value: v.get("notifySeconds"),
				values: ot,
				label: R("notifications.seconds.field"),
				text: (e) => R("notifications.seconds.value", { n: e }),
				onChange: (e) => v.set("notifySeconds", e)
			})
		}]
	}, {
		title: R("notifications.list.title"),
		rows: [{
			label: R("notifications.keep.label"),
			keywords: R("notifications.keep.keywords"),
			description: t.available ? R("notifications.keep.description") : `${R("notifications.keep.description")} ${R("notifications.keep.page")}`,
			control: () => $({
				value: t.keep,
				values: st,
				label: R("notifications.keep.field"),
				onChange: (e) => t.setKeep(e).catch(n)
			})
		}, {
			label: R("notifications.test.label"),
			description: R("notifications.test.description"),
			control: a({
				label: R("notifications.test.button"),
				onClick: () => t.send({
					app: "settings",
					text: R("notifications.test.text")
				}).catch(n)
			})
		}]
	}];
}
function lt({ openWindow: r, args: i } = {}) {
	let a = new n({
		title: R("window.title"),
		icon: "gear",
		width: 760,
		height: 500,
		tabs: [
			{ get group() {
				return R("group.system");
			} },
			{
				id: "appearance",
				icon: "palette",
				get label() {
					return R("appearance.label");
				},
				get description() {
					return R("appearance.description");
				},
				subtabs: [{
					id: "colors",
					get label() {
						return R("appearance.colors.label");
					},
					sections: () => [{
						title: R("appearance.theme.label"),
						rows: [{
							label: R("appearance.theme.label"),
							description: R("appearance.theme.description"),
							keywords: R("appearance.theme.keywords"),
							control: h({
								value: v.get("theme"),
								label: R("appearance.theme.label"),
								options: [{
									value: "light",
									label: R("appearance.theme.light")
								}, {
									value: "dark",
									label: R("appearance.theme.dark")
								}],
								onChange: (e) => v.set("theme", e)
							})
						}]
					}, {
						title: R("appearance.accent.title"),
						rows: [{
							label: R("common.color"),
							description: R("appearance.accent.description"),
							keywords: R("appearance.accent.keywords"),
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
						return R("appearance.motion.label");
					},
					sections: () => [{
						title: R("appearance.animations.label"),
						rows: [{
							label: R("appearance.animations.label"),
							description: R("appearance.animations.description"),
							keywords: R("appearance.animations.keywords"),
							control: Y("motion")
						}]
					}]
				}]
			},
			e.locale && {
				id: "language",
				icon: "globe",
				get label() {
					return R("language.label");
				},
				get description() {
					return R("language.description");
				},
				sections: it
			},
			{
				id: "desk",
				icon: "grid",
				get label() {
					return R("desk.label");
				},
				get description() {
					return R("desk.description");
				},
				subtabs: [
					{
						id: "items",
						get label() {
							return R("common.items");
						},
						sections: () => [
							...Ue(),
							{
								title: R("desk.placement.title"),
								rows: [{
									label: R("desk.snap.label"),
									description: R("desk.snap.description"),
									keywords: R("desk.snap.keywords"),
									control: Y("snap")
								}]
							},
							typeof D.fileThumbnail == "function" && {
								title: R("desk.previews.title"),
								rows: [{
									label: R("desk.previews.label"),
									description: R("desk.previews.description"),
									keywords: R("desk.previews.keywords"),
									control: Y("deskPreviews")
								}]
							}
						].filter(Boolean)
					},
					typeof D.setWallpaper == "function" && {
						id: "background",
						get label() {
							return R("desk.background.label");
						},
						sections: () => Ge(r)
					},
					{
						id: "overview",
						get label() {
							return R("desk.overview.label");
						},
						sections: () => [{
							title: R("desk.overview.title"),
							rows: [{
								label: R("desk.minimap.label"),
								keywords: R("desk.minimap.keywords"),
								control: Y("minimap")
							}]
						}]
					}
				].filter(Boolean)
			},
			(D.USER_PAGE_ITEMS ?? []).length && {
				id: "userpage",
				icon: "user",
				get label() {
					return R("userPage.label");
				},
				get description() {
					return R("userPage.description");
				},
				sections: qe
			},
			{
				id: "workspaces",
				icon: "workspace",
				get label() {
					return R("workspaces.label");
				},
				get description() {
					return R("workspaces.description");
				},
				get subtabs() {
					return Fe();
				}
			},
			e.notifications && {
				id: "notifications",
				icon: "bell",
				get label() {
					return R("notifications.label");
				},
				get description() {
					return R("notifications.description");
				},
				sections: ct
			},
			{
				id: "tags",
				icon: "tag",
				get label() {
					return R("tags.label");
				},
				get description() {
					return R("tags.description");
				},
				sections: Le
			},
			{
				id: "usability",
				icon: "accessibility",
				get label() {
					return R("usability.label");
				},
				get description() {
					return R("usability.description");
				},
				subtabs: [
					{
						id: "shortcuts",
						get label() {
							return R("shortcuts.label");
						},
						sections: Ze
					},
					{
						id: "filetypes",
						get label() {
							return R("fileTypes.label");
						},
						sections: Je
					},
					{
						id: "contextmenu",
						get label() {
							return R("menu.label");
						},
						sections: () => fe("desktop.background", {
							openWindow: r,
							confirmButton: Z,
							rerender: () => G?.render()
						})
					},
					{
						id: "trash",
						get label() {
							return R("trash.label");
						},
						sections: Ye
					}
				]
			},
			{
				id: "apps",
				icon: "window",
				get label() {
					return R("apps.label");
				},
				get description() {
					return R("apps.description");
				},
				subtabs: [{
					id: "security",
					get label() {
						return R("apps.security.label");
					},
					sections: $e
				}, {
					id: "pipes",
					get label() {
						return R("pipes.label");
					},
					sections: () => Ae({ rerender: () => G?.render() })
				}]
			},
			{
				id: "startup",
				icon: "power",
				get label() {
					return R("startup.label");
				},
				get description() {
					return R("startup.description");
				},
				subtabs: [
					{
						id: "options",
						get label() {
							return R("startup.options.label");
						},
						sections: () => xe({ rerender: () => G?.render() })
					},
					{
						id: "services",
						get label() {
							return R("startup.services.label");
						},
						sections: () => _e({
							openWindow: r,
							rerender: () => G?.render()
						})
					},
					{
						id: "apps",
						get label() {
							return R("startup.apps.label");
						},
						sections: () => Se({
							openWindow: r,
							rerender: () => G?.render()
						})
					}
				]
			},
			{ get group() {
				return R("group.data");
			} },
			{
				id: "storage",
				icon: "disk",
				get label() {
					return R("storage.label");
				},
				get description() {
					return f.connected ? R("storage.description.kernel") : R("storage.description.browser");
				},
				sections: () => [{
					title: R("storage.space.title"),
					rows: [{
						label: R("storage.used.label"),
						description: R("storage.used.description"),
						control: Q(et())
					}, {
						label: R("storage.contents.label"),
						description: R("storage.contents.description"),
						control: Q(Xe())
					}]
				}, {
					title: R("storage.reset.title"),
					rows: [{
						label: R("storage.defaults.label"),
						description: R("storage.defaults.description"),
						control: Z(R("common.reset"), R("common.confirm"), () => {
							[
								"accent",
								"theme",
								"motion",
								"snap",
								...D.fileThumbnail ? ["deskPreviews"] : [],
								"minimap",
								"lasso",
								"deleteConfirm",
								"deletePermanent",
								"trashRetention",
								"startupApps",
								...e.locale ? ["language"] : [],
								...D.USER_PAGE_ITEMS ? ["userPageHidden"] : [],
								...e.notifications ? ["notifyShown", "notifySeconds"] : [],
								...D.setWallpaper ? ["deskColor", "wallpaper"] : []
							].forEach((e) => v.reset(e)), b.resetAll(), oe(), p.list().forEach((e) => p.reset(e.id));
						})
					}, {
						label: R("storage.initial.label"),
						description: R("storage.initial.description"),
						keywords: R("storage.initial.keywords"),
						control: Z(R("storage.initial.button"), R("storage.initial.confirm"), async () => {
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
					return R("about.label");
				},
				get description() {
					return R("about.description");
				},
				sections: () => [{
					title: "lilOS",
					rows: [
						{
							label: R("about.version"),
							control: ue
						},
						{
							label: R("about.sdkVersion"),
							control: t
						},
						{
							label: R("about.language"),
							control: _.locale
						},
						{
							label: R("about.browser"),
							control: nt()
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
	let c = () => a.view.tab?.subtabs?.length && !a.view.subtab ? a.view.select(a.view.tab.id) : a.view.render(), u = [I()?.on("change", c), I()?.on("switch", c)], d = l.on("trash", () => a.view.render()), m = C.on("change", () => a.view.render()), g = [
		s.on("change", () => a.view.render()),
		s.on("security", () => a.view.render()),
		pe(() => a.view.render()),
		je(() => a.view.render())
	], y = v.on("change:deskHidden", () => a.view.render()), w = [v.on("change:deskColor", () => a.view.render()), D.wallpaper?.on("change", () => a.view.render())], T = () => a.setTitle(R("window.title"), a.view.tab?.label ?? "");
	a.view.on("select", T);
	let E = e.locale?.on("change", () => {
		a.view.render(), T();
	});
	return a.on("destroy", () => {
		u.forEach((e) => e?.()), d(), m(), y(), w.forEach((e) => e?.()), E?.(), g.forEach((e) => e?.()), G === a.view && (G = null);
	}), a;
}
export { lt as default };
