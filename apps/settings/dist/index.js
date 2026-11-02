import * as e from "/host/sdk.js";
import { SDK_VERSION as t, SettingsWindow as n, TAG_COLORS as r, Window as i, actionButton as a, appIcon as o, apps as s, fileTypeList as c, fs as l, h as u, icon as d, kernel as f, menus as p, openMenu as m, segmented as ee, selectField as h, session as g, settings as _, shortcutField as v, shortcuts as y, storage as b, swatches as x, tags as S, textField as C, toast as w, toggle as T } from "/host/sdk.js";
import * as E from "/host/system.js";
import { ACCENTS as D, LASSO_OPTIONS as O, RETENTION_OPTIONS as k, WORKSPACE_LIMITS as A, appFor as te, apps as j, canChangeExecution as ne, defaultAppFor as re, executionMode as ie, fileApps as ae, knownExtensions as oe, launch as se, pickFile as ce, resetAppsFor as le, setAppFor as ue, setTag as de, showAppSecurity as fe, startup as M, version as pe, workspaceManager as N } from "/host/system.js";
// src/shared/i18n.js
function me(t, n) {
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
var P = me("settings", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"window.title\":\"Control Panel\",\"onedrive.label\":\"OneDrive\",\"onedrive.description\":\"The app on Azure, shared folders, Upload to OneDrive and open, Office online.\",\"onedrive.keywords\":\"onedrive microsoft office online azure word excel powerpoint shared\",\"cloud.gdrive.label\":\"Google Drive\",\"cloud.gdrive.description\":\"The Google Cloud project, Shared with me, the format of Google documents.\",\"cloud.gdrive.keywords\":\"google drive docs sheets slides cloud project client secret\",\"cloud.gdrive.settings\":\"Google Cloud project (for everyone on this lilOS)\",\"cloud.gdrive.steps.title\":\"How to make the project on Google Cloud\",\"cloud.gdrive.steps.label\":\"Steps\",\"cloud.gdrive.steps.1\":\"console.cloud.google.com → New project (for example «lilOS»).\",\"cloud.gdrive.steps.2\":\"APIs & Services → Library → enable Google Drive API.\",\"cloud.gdrive.steps.3\":\"OAuth consent screen: Internal with Google Workspace; otherwise External, then Publish app (in Testing the sign-in expires every 7 days). Scope: …/auth/drive.\",\"cloud.gdrive.steps.4\":\"Credentials → Create OAuth client ID → Web application, with the two addresses above as authorized redirect URIs (or Desktop app: then always by pasting the address).\",\"cloud.gdrive.steps.5\":\"Copy the client ID and the client secret above.\",\"cloud.gdrive.steps.6\":\"On first sign-in Google says the app is not verified: it is your project, Continue.\",\"cloud.gphotos.label\":\"Google Photos\",\"cloud.gphotos.description\":\"The Google Cloud project for Import from Google Photos and the albums lilOS makes.\",\"cloud.gphotos.keywords\":\"google photos picker album import cloud project client secret\",\"cloud.gphotos.settings\":\"Google Cloud project (for everyone on this lilOS)\",\"cloud.gphotos.steps.title\":\"How to set the project on Google Cloud\",\"cloud.gphotos.steps.label\":\"Steps\",\"cloud.gphotos.steps.1\":\"Use the Google Drive project or make one at console.cloud.google.com.\",\"cloud.gphotos.steps.2\":\"APIs & Services → Library → enable Google Photos Picker API and Photos Library API.\",\"cloud.gphotos.steps.3\":\"OAuth consent screen: add the Photos scopes (photospicker.mediaitems.readonly, photoslibrary.appendonly, photoslibrary.readonly.appcreateddata, photoslibrary.edit.appcreateddata).\",\"cloud.gphotos.steps.4\":\"Credentials: the same OAuth client as Drive is fine, with the two addresses above.\",\"cloud.gphotos.steps.5\":\"Copy the client ID and the client secret above.\",\"cloud.gphotos.steps.6\":\"Since 2025 Google lets apps see only the photos the user picks and the albums the app makes.\",\"cloud.azblob.label\":\"Azure Blob Storage\",\"cloud.azblob.description\":\"The app on Azure for signing in with Microsoft Entra (account key and SAS need nothing).\",\"cloud.azblob.keywords\":\"azure blob storage entra microsoft container sas key data lake\",\"cloud.azblob.settings\":\"Microsoft Entra (for everyone on this lilOS)\",\"cloud.azblob.steps.title\":\"How to set Microsoft Entra\",\"cloud.azblob.steps.label\":\"Steps\",\"cloud.azblob.steps.1\":\"Only to sign in with a Microsoft account: with the account key or a SAS token nothing is needed.\",\"cloud.azblob.steps.2\":\"portal.azure.com → App registrations: OneDrive's app is fine, or a new one.\",\"cloud.azblob.steps.3\":\"Authentication → Mobile and desktop applications: the two addresses above; Allow public client flows: Yes.\",\"cloud.azblob.steps.4\":\"API permissions → Azure Storage → user_impersonation (delegated).\",\"cloud.azblob.steps.5\":\"On the storage account, give users the role «Storage Blob Data Contributor» (Access control).\",\"cloud.nfs.label\":\"NFS\",\"cloud.nfs.description\":\"The UID and GID each user has on NFS servers.\",\"cloud.nfs.keywords\":\"nfs uid gid nas linux export identity\",\"cloud.nfs.settings\":\"Identities on NFS servers (for everyone on this lilOS)\",\"cloud.nfs.you\":\"Your user name\",\"cloud.nfs.you.description\":\"The name to write in your line\",\"cloud.nfs.steps.title\":\"On the NFS server\",\"cloud.nfs.steps.label\":\"What to check\",\"cloud.nfs.steps.1\":\"The folder is exported to the address of the computer running lilOS's kernel, with NFSv3 over TCP.\",\"cloud.nfs.steps.2\":\"If lilOS's kernel cannot use a port below 1024 (Linux without privileges), allow other ports: «insecure» in /etc/exports, «Allow connections from non-privileged ports» on Synology.\",\"cloud.nfs.steps.3\":\"The UID and GID here are those of the users on the server: whoever has them reads and writes their files.\",\"cloud.nfs.steps.4\":\"With several users, the local network must be open to the kernel (net.allowPrivate or net.allow in config.json).\",\"cloud.status\":\"State\",\"cloud.adminOnly\":\"Only an administrator changes these settings\",\"cloud.ready\":\"Ready\",\"cloud.notReady\":\"Not set yet\",\"cloud.error\":\"Settings not read\",\"cloud.saved\":\"Saved\",\"cloud.notSaved\":\"Not saved\",\"cloud.secret.set\":\"Set (type to replace it)\",\"cloud.secret.empty\":\"Not set\",\"cloud.secret.remove\":\"Remove\",\"cloud.addresses.title\":\"Addresses to register\",\"cloud.redirect.label\":\"Sign-in window\",\"cloud.redirect.google\":\"This lilOS's address, as Google sends the window back to it\",\"cloud.redirect.entra\":\"This lilOS's address, as Microsoft sends the window back to it\",\"cloud.redirect.unusable\":\"lilOS is open on http outside this computer: the sign-in window does not work here, use the sign-in by pasting the address (or open lilOS on https)\",\"cloud.byHand.label\":\"Sign-in by pasting the address\",\"cloud.byHand.google\":\"Where Google ends when lilOS is not on https: a page that does not open, whose address the user pastes\",\"cloud.byHand.entra\":\"Where Microsoft ends when lilOS is not on https: a page that does not open, whose address the user pastes\",\"cloud.copy\":\"Copy\",\"cloud.copied\":\"Copied\",\"onedrive.app.title\":\"App on Azure (for everyone on this lilOS)\",\"onedrive.app.error\":\"Settings not read\",\"onedrive.app.status\":\"State\",\"onedrive.app.adminOnly\":\"Only an administrator changes the app on Azure.\",\"onedrive.app.ready\":\"Ready\",\"onedrive.app.notReady\":\"Not set yet\",\"onedrive.app.saved\":\"Saved\",\"onedrive.app.notSaved\":\"Not saved\",\"onedrive.app.signAgain\":\"The connections ask to sign in again, to accept the new permissions.\",\"onedrive.redirect.label\":\"Redirect URI\",\"onedrive.redirect.description\":\"To register on Azure, platform «Public client/native (mobile & desktop)»: the address of this lilOS, as you open it now.\",\"onedrive.redirect.unusable\":\"Microsoft accepts only https addresses, or http on this computer (localhost): open lilOS that way to sign in.\",\"onedrive.copy\":\"Copy\",\"onedrive.copied\":\"Address copied\",\"onedrive.steps.label\":\"How to register the app\",\"onedrive.steps.1\":\"portal.azure.com → App registrations → New registration (a free Azure account is enough).\",\"onedrive.steps.2\":\"Supported account types: the same as «Accounts allowed» here.\",\"onedrive.steps.3\":\"Redirect URI: platform «Public client/native (mobile & desktop)», the address above.\",\"onedrive.steps.4\":\"Authentication → Allow public client flows: Yes.\",\"onedrive.steps.5\":\"API permissions → Microsoft Graph, delegated: Files.ReadWrite, User.Read, offline_access (Files.ReadWrite.All for the shared folders).\",\"onedrive.steps.6\":\"Copy the Application (client) ID into the field above.\",\"onedrive.upload.title\":\"Upload to OneDrive and open\",\"onedrive.upload.mount.label\":\"Connection\",\"onedrive.upload.mount.description\":\"Where the Office documents of your Home go before they open in Office online.\",\"onedrive.upload.mount.none\":\"Connect OneDrive first: File Manager → Rete → +.\",\"onedrive.upload.mount.ask\":\"Ask each time\",\"onedrive.upload.folder.label\":\"Folder\",\"onedrive.upload.folder.description\":\"On OneDrive (made if missing). The original stays in your Home: what you change in Office is changed in the copy.\",\"onedrive.upload.exists.label\":\"A file with the same name\",\"onedrive.upload.exists.description\":\"When the folder on OneDrive has one already.\",\"onedrive.upload.exists.ask\":\"Ask\",\"onedrive.upload.exists.keep\":\"Keep both\",\"onedrive.upload.exists.replace\":\"Replace it\",\"onedrive.office.title\":\"Office documents\",\"onedrive.office.doubleClick.label\":\"Double click opens Office online\",\"onedrive.office.doubleClick.description\":\"Word, Excel and PowerPoint documents of OneDrive, when no app of lilOS is chosen for their type (Usability → File types).\",\"group.system\":\"System\",\"group.data\":\"Data\",\"common.name\":\"Name\",\"common.color\":\"Color\",\"common.items\":\"Items\",\"common.create\":\"Create\",\"common.add\":\"Add\",\"common.addMore\":\"Add…\",\"common.choose\":\"Choose…\",\"common.remove\":\"Remove\",\"common.delete\":\"Delete…\",\"common.deleteNow\":\"Delete\",\"common.reset\":\"Reset\",\"common.confirm\":\"Confirm\",\"common.loading\":\"Loading…\",\"common.unavailable\":\"Not available\",\"common.yes\":\"Yes\",\"common.no\":\"No\",\"appearance.label\":\"Appearance\",\"appearance.description\":\"Colors and motion of the interface.\",\"appearance.colors.label\":\"Colors\",\"appearance.theme.label\":\"Theme\",\"appearance.theme.description\":\"Light or dark: desk, taskbar, menus and windows\",\"appearance.theme.keywords\":\"theme light dark night mode\",\"appearance.theme.light\":\"Light\",\"appearance.theme.dark\":\"Dark\",\"appearance.accent.title\":\"Accent color\",\"appearance.accent.description\":\"Selection, buttons, active tabs and logo\",\"appearance.accent.keywords\":\"accent theme highlight\",\"appearance.motion.label\":\"Motion\",\"appearance.animations.label\":\"Animations\",\"appearance.animations.description\":\"View movements, menus and transitions. If the operating system asks for reduced motion, they stay reduced.\",\"appearance.animations.keywords\":\"motion movement transitions\",\"language.label\":\"Language\",\"language.description\":\"The language of apps: their texts, dates and numbers.\",\"language.title\":\"System language\",\"language.row.description\":\"Apps without this language use English. lilOS’s own texts are still in Italian.\",\"language.keywords\":\"language translation locale english italian dates numbers\",\"language.auto\":\"Automatic: {name}\",\"desk.label\":\"Desk\",\"desk.description\":\"How the infinite desk behaves.\",\"desk.fixed.title\":\"Fixed items\",\"desk.fixed.label\":\"On the desk\",\"desk.fixed.descriptionSwitchable\":\"The ones turned on are on the desk of every workspace. They open and move like other items, but cannot be renamed or deleted: you remove them here.\",\"desk.fixed.description\":\"They are on the desk of every workspace. They open and move like other items, but cannot be renamed or deleted.\",\"desk.fixed.keywords\":\"fixed items desk show hide delete {name}\",\"desk.fixed.toggle\":\"{name} on the desk\",\"desk.fixed.toggleIn\":\"{name} on the desk of {workspace}\",\"desk.fixed.always\":\"Fixed\",\"desk.fixed.item.home.name\":\"Home\",\"desk.fixed.item.home.description\":\"The main folder, with all the others\",\"desk.fixed.item.documents.name\":\"Documenti\",\"desk.fixed.item.documents.description\":\"The Documenti folder, shared by every workspace\",\"desk.fixed.item.images.name\":\"Immagini\",\"desk.fixed.item.images.description\":\"The Immagini folder, shared by every workspace\",\"desk.fixed.item.files.name\":\"File Manager\",\"desk.fixed.item.files.description\":\"Opens the File Manager\",\"desk.fixed.item.downloads.name\":\"Download\",\"desk.fixed.item.downloads.description\":\"The Download folder, shared by every workspace\",\"desk.fixed.item.trash.name\":\"Trash\",\"desk.fixed.item.trash.description\":\"Opens the trash; files and folders can be dragged onto it\",\"desk.fixed.descriptionWorkspace\":\"The ones turned on are on this workspace's desk. They open and move like other items, but cannot be renamed or deleted: you remove them here.\",\"desk.fixed.descriptionAll\":\"Turn one on or off in every workspace at once; new workspaces get the same. Each workspace can then change it in its own tab.\",\"desk.fixed.some\":\"On in {on} of {n} workspaces\",\"desk.fixed.toggleAll\":\"{name} on every desk\",\"desk.fixed.moved.label\":\"Each workspace has its own\",\"desk.fixed.moved.description\":\"Choose them in Workspaces: in each workspace's tab, or in All for every desk.\",\"desk.fixed.moved.keywords\":\"fixed items desk home documents trash workspace\",\"desk.fixed.moved.open\":\"Open\",\"desk.placement.title\":\"Placement\",\"desk.snap.label\":\"Snap to grid\",\"desk.snap.description\":\"Dragged items line up on an invisible grid\",\"desk.snap.keywords\":\"icons snap grid align\",\"desk.previews.title\":\"Icons\",\"desk.previews.label\":\"Show file previews\",\"desk.previews.description\":\"Files show a small image of what they contain, made by the app that opens them (Photo, Editor…), in place of their icon\",\"desk.previews.keywords\":\"previews thumbnails icons images files\",\"desk.background.label\":\"Background\",\"desk.background.color.title\":\"Color\",\"desk.background.color.description\":\"Behind the items, and around images that are transparent\",\"desk.background.color.keywords\":\"background color desk wallpaper\",\"desk.background.custom.label\":\"Other color\",\"desk.background.custom.description\":\"Any color you like\",\"desk.background.theme.label\":\"Theme color\",\"desk.background.theme.description\":\"Back to the color of the light or dark theme\",\"desk.background.theme.button\":\"Use the theme color\",\"desk.background.image.title\":\"Image\",\"desk.background.image.label\":\"Background image\",\"desk.background.image.keywords\":\"background image wallpaper picture photo desk\",\"desk.background.image.current\":\"«{name}»: as tall as the desk, in its own proportions (a wider image is cut at the sides); it does not move or zoom with the desk\",\"desk.background.image.none\":\"None: only the color. In the menu of an image on the desk: Use as desktop background\",\"desk.background.image.choose\":\"Choose…\",\"desk.background.image.pick\":\"Choose the background image\",\"desk.background.image.remove.label\":\"Remove the image\",\"desk.background.image.remove.description\":\"The file stays where it is\",\"desk.background.image.remove.button\":\"Remove\",\"desk.overview.label\":\"Overview\",\"desk.overview.title\":\"Bottom-right panel\",\"desk.minimap.label\":\"Show the minimap\",\"desk.minimap.keywords\":\"map minimap thumbnail\",\"workspaces.label\":\"Workspaces\",\"workspaces.description\":\"Separate desks, each with its own items, windows and apps. Files outside the desk belong to everyone.\",\"workspaces.current.label\":\"This workspace\",\"workspaces.current.title\":\"Workspace\",\"workspaces.all.label\":\"All\",\"workspaces.name.keywords\":\"rename workspace name\",\"workspaces.name.field\":\"Workspace name\",\"workspaces.description.label\":\"Description\",\"workspaces.description.description\":\"A line about what the workspace is for, under its name at the bottom of the start menu\",\"workspaces.description.keywords\":\"workspace description notes start menu\",\"workspaces.description.field\":\"Workspace description\",\"workspaces.description.placeholder\":\"What you use it for\",\"workspaces.color.description\":\"The dot in the taskbar and next to its files in the File Manager\",\"workspaces.color.keywords\":\"workspace color\",\"workspaces.owned.label\":\"Files, folders and shortcuts\",\"workspaces.owned.description\":\"Created in this workspace, on the desk and in shared folders\",\"workspaces.apps.title\":\"Apps\",\"workspaces.apps.system\":\"System app: it is in every workspace\",\"workspaces.apps.installed\":\"Installed in lilOS: you can hide it here\",\"workspaces.apps.keywords\":\"app hide show {name}\",\"workspaces.apps.alwaysVisible\":\"Always visible\",\"workspaces.apps.toggle\":\"{name} visible in this workspace\",\"workspaces.apps.toggleIn\":\"{name} visible in {workspace}\",\"workspaces.list.current\":\"{name} (current)\",\"workspaces.list.owned\":{\"one\":\"{n} item created\",\"other\":\"{n} items created\"},\"workspaces.list.apps\":{\"one\":\"{n} app\",\"other\":\"{n} apps\"},\"workspaces.list.keywords\":\"workspace switch delete\",\"workspaces.list.switch\":\"Switch to it\",\"workspaces.switch.label\":\"Go to this workspace\",\"workspaces.new.label\":\"New workspace\",\"workspaces.new.description\":\"With an empty desk and every app visible\",\"workspaces.deleting.title\":\"Deleting a workspace\",\"workspaces.deleting.files.label\":\"Files stay\",\"workspaces.deleting.files.description\":\"Its desk becomes the folder Documenti/Scrivania di <name> (if it is not empty); files created elsewhere stay where they are, marked as its own.\",\"workspaces.deleting.windows.label\":\"Windows stay\",\"workspaces.deleting.windows.description\":\"Its open windows move to the current workspace, with their unsaved changes. Workareas, view and hidden apps are lost.\",\"tags.label\":\"Tags\",\"tags.description\":\"Colored labels to find files and folders wherever they are. A hidden tag hides its items.\",\"tags.new.title\":\"New tag\",\"tags.new.pending\":{\"one\":\"The new tag will go on {n} selected item\",\"other\":\"The new tag will go on {n} selected items\"},\"tags.new.description\":\"Then assign it from the right-click menu → Tag, on the desk and in the File Manager\",\"tags.new.keywords\":\"new tag create label\",\"tags.new.placeholder\":\"For example: Urgent\",\"tags.new.field\":\"Name of the new tag\",\"tags.name.keywords\":\"rename tag\",\"tags.name.field\":\"Name of the tag {name}\",\"tags.color.keywords\":\"tag color\",\"tags.visible.label\":\"Visible\",\"tags.visible.on\":\"Items with this tag are shown everywhere\",\"tags.visible.off\":\"Items with this tag are hidden everywhere: you find them in File Manager → Tags\",\"tags.visible.keywords\":\"hide show hidden invisible tag\",\"tags.visible.toggle\":\"Tag {name} visible\",\"tags.items.description\":{\"one\":\"{n} item in this workspace and in shared folders\",\"other\":\"{n} items in this workspace and in shared folders\"},\"tags.items.show\":\"Show in File Manager\",\"tags.items.delete\":\"Delete the tag\",\"usability.label\":\"Usability\",\"usability.description\":\"Keyboard, mouse, apps that open files, context menus and trash.\",\"shortcuts.label\":\"Shortcuts\",\"shortcuts.title\":\"Keyboard shortcuts\",\"shortcuts.all.label\":\"All shortcuts\",\"shortcuts.all.description\":\"Changes apply right away. To record a combination press +, then the keys; Esc cancels.\",\"shortcuts.all.reset\":\"Reset all\",\"shortcuts.keywords\":\"shortcut keys {keys}\",\"shortcuts.mouse.title\":\"Mouse\",\"shortcuts.lasso.label\":\"Freehand selection\",\"shortcuts.lasso.description\":\"Draw a closed path: the items inside it are selected\",\"shortcuts.lasso.keywords\":\"lasso freehand path selection alt\",\"shortcuts.rectangle.label\":\"Rectangle selection\",\"shortcuts.rectangle.control\":\"Drag on the background\",\"shortcuts.addToSelection.label\":\"Add to the selection\",\"shortcuts.addToSelection.control\":\"Ctrl or Shift + click or drag\",\"shortcuts.pan.label\":\"Move around the desk\",\"shortcuts.pan.control\":\"Space + drag, or middle button\",\"shortcuts.fixed.title\":\"Fixed keys\",\"shortcuts.navigate.label\":\"Move through menus, lists and tabs\",\"shortcuts.navigate.control\":\"Arrows, Enter, Esc\",\"shortcuts.rename.label\":\"Confirm or cancel renaming\",\"shortcuts.rename.control\":\"Enter, Esc\",\"fileTypes.label\":\"File types\",\"fileTypes.title\":\"Apps by file type\",\"fileTypes.all.label\":\"All file types\",\"fileTypes.all.description\":\"When you open a file, lilOS uses the app chosen here. With “Ask every time” the Open with window appears.\",\"fileTypes.all.reset\":\"Reset all\",\"fileTypes.noExtension\":\"No extension\",\"fileTypes.default\":\"Default: {app}\",\"fileTypes.noDefault\":\"No default app\",\"fileTypes.keywords\":\"file type extension open with {ext}\",\"fileTypes.field\":\"App for .{ext}\",\"fileTypes.fieldNoExtension\":\"App for files without an extension\",\"fileTypes.ask\":\"Ask every time\",\"fileTypes.others\":\"Others\",\"menu.label\":\"Context menu\",\"menu.separator\":\"— Separator —\",\"menu.submenu\":{\"one\":\"Submenu · {n} item\",\"other\":\"Submenu · {n} items\"},\"menu.create.folder\":\"Creates the folder “{name}”\",\"menu.create.file\":\"Creates the file “{name}”\",\"menu.create.fileFromTemplate\":\"Creates the file “{name}” from the template {template}\",\"menu.create.fileWithContent\":\"Creates the file “{name}” with initial content\",\"menu.create.deletedTemplate\":\"(deleted file)\",\"menu.launch\":\"Opens the app {name}\",\"menu.action\":\"Action\",\"menu.keywords\":\"context menu item separator new\",\"menu.moveUp\":\"Move up\",\"menu.moveDown\":\"Move down\",\"menu.target.root\":\"Main menu\",\"menu.target.inside\":\"Inside “{name}”\",\"menu.target.label\":\"Where\",\"menu.item.label\":\"Item\",\"menu.item.description\":\"An action or opening an app\",\"menu.item.field\":\"Item to add\",\"menu.item.open\":\"Open {name}\",\"menu.separatorRow.label\":\"Separator\",\"menu.separatorRow.description\":\"A line to group items\",\"menu.new.label\":\"New item in “{name}”\",\"menu.new.description\":\"Creates a file or a folder with this name; a file can start from the contents of a template\",\"menu.new.labelField\":\"Label\",\"menu.new.labelPlaceholder\":\"Label (e.g. Style sheet)\",\"menu.new.nameField\":\"Name of the file or folder\",\"menu.new.namePlaceholder\":\"Name (e.g. style.css)\",\"menu.new.kind\":\"Type\",\"menu.new.kindFile\":\"File\",\"menu.new.kindFolder\":\"Folder\",\"menu.new.missing\":\"A label and a name are needed\",\"menu.template.button\":\"Template…\",\"menu.template.chosen\":\"Template: {name}\",\"menu.template.title\":\"Choose the template file\",\"menu.template.text\":\"The new file will start with the contents of this file.\",\"menu.defaults.label\":\"Default items\",\"menu.defaults.custom\":\"The menu has been customized\",\"menu.defaults.default\":\"The menu is the default one\",\"trash.label\":\"Trash\",\"trash.deleting.title\":\"Deleting\",\"trash.confirm.label\":\"Ask for confirmation\",\"trash.confirm.description\":\"Before deleting files and folders, a small menu asks you to confirm\",\"trash.confirm.keywords\":\"confirm delete remove ask\",\"trash.permanent.label\":\"Delete permanently\",\"trash.permanent.description\":\"Deleted items skip the trash: they can be recovered only with Ctrl Z, while the page stays open\",\"trash.permanent.keywords\":\"trash permanent immediately delete skip\",\"trash.retention.label\":\"Keep items for\",\"trash.retention.description\":\"After this time, what is in the trash is deleted permanently\",\"trash.retention.keywords\":\"retention duration days automatic cleanup empty\",\"trash.retention.field\":\"Keep items in the trash for\",\"trash.retention.days\":{\"one\":\"{n} day\",\"other\":\"{n} days\"},\"trash.retention.forever\":\"Forever\",\"trash.contents.label\":\"Contents\",\"trash.contents.description\":{\"one\":\"{n} item · {size}\",\"other\":\"{n} items · {size}\"},\"trash.contents.empty\":\"The trash is empty\",\"trash.contents.keywords\":\"open trash restore\",\"trash.contents.open\":\"Open the trash\",\"trash.empty.label\":\"Empty the trash\",\"trash.empty.description\":\"Permanently deletes everything in it\",\"trash.empty.keywords\":\"empty trash\",\"trash.empty.button\":\"Empty…\",\"trash.empty.confirm\":\"Empty\",\"trash.empty.none\":\"Empty\",\"apps.label\":\"Apps\",\"apps.description\":\"How installed apps run.\",\"apps.security.label\":\"Security\",\"apps.execution.title\":\"Running apps\",\"apps.isolated.label\":\"Run apps isolated\",\"apps.isolated.description\":\"Each app runs in a sandbox and sees only what its permissions allow. If you turn this off, apps run in lilOS’s page and in a Web Worker: faster, but they can do everything you can do. Applies from the next time each app opens.\",\"apps.isolated.adminOnly\":\"Only an administrator can change it.\",\"apps.isolated.keywords\":\"security isolation sandbox iframe worker\",\"apps.isolated.failed\":\"Not changed: {error}\",\"apps.system.label\":\"System apps\",\"apps.system.description\":\"File Manager, Editor, Control Panel and AppStore are part of lilOS and always run inside lilOS.\",\"apps.installed.title\":\"Installed apps\",\"apps.installed.keywords\":\"security isolation\",\"apps.installed.shared\":\"Like the other apps\",\"apps.installed.own\":\"Chosen for this app\",\"apps.installed.properties\":\"Properties…\",\"apps.installed.none\":\"No apps installed besides the system ones\",\"apps.mode.isolated\":\"Isolated\",\"apps.mode.open\":\"Not isolated\",\"apps.mode.system\":\"Inside lilOS\",\"apps.mode.remote\":\"Isolated, on its own site\",\"startup.label\":\"Startup\",\"startup.description\":\"Services and apps that start by themselves when lilOS starts and when you sign in.\",\"startup.options.label\":\"Options\",\"startup.services.label\":\"Services\",\"startup.apps.label\":\"Apps\",\"startup.auto.title\":\"Automatic startup\",\"startup.openApps.label\":\"Open apps when you sign in\",\"startup.openApps.description\":\"The apps chosen in Apps open, with their parameters. Only in the first lilOS tab of this browser: the others open empty.\",\"startup.openApps.keywords\":\"startup automatic sign-in login autorun\",\"startup.trouble.title\":\"If something goes wrong\",\"startup.safe.label\":\"Start without apps\",\"startup.safe.description\":\"Just once: open lilOS with ?avvio=no at the end of the address. Saved choices are kept.\",\"startup.safe.keywords\":\"safe start startup no apps avvio=no\",\"startup.safe.active\":\"Active now\",\"startup.apps.title\":\"Open when you sign in\",\"startup.apps.hint\":\"In the workspace lilOS opens in, in the order of the list. Turn off every entry point of an app and the app leaves the list.\",\"startup.apps.none\":\"No app opens by itself.\",\"startup.apps.oneEntry\":\"1 entry point\",\"startup.apps.entries\":{\"one\":\"{on} of {n} entry point\",\"other\":\"{on} of {n} entry points\"},\"startup.apps.remove\":\"Remove from startup\",\"startup.apps.allAdded\":\"All apps are already in startup\",\"startup.apps.add\":\"Add an app to startup\",\"startup.apps.addDescription\":\"Its main window opens; then choose other entry points and parameters\",\"startup.params.of\":\"{entry} of {app}\",\"startup.params.undescribed\":\"This entry point does not describe its parameters: they reach the app as they are, as args.\",\"startup.params.json\":\"Parameters (JSON)\",\"startup.params.jsonOf\":\"Parameters (JSON) of {name}\",\"startup.params.invalidJson\":\"Not valid JSON\",\"startup.params.notSaved\":\"Not saved: {error}\",\"startup.path.noFolder\":\"No folder\",\"startup.path.noFile\":\"No file\",\"startup.path.gone\":\"(no longer exists)\",\"startup.path.clear\":\"Remove {name}\",\"services.unsupported\":\"This version of lilOS has no app services\",\"services.status.off\":\"Off\",\"services.status.starting\":\"Starting…\",\"services.status.error\":\"Stopped: {error}\",\"services.status.unknownError\":\"error\",\"services.status.restarting\":\"Restarting… (it had stopped: {error})\",\"services.status.onNow\":\"On for less than a minute\",\"services.status.onMinutes\":{\"one\":\"On for {n} minute\",\"other\":\"On for {n} minutes\"},\"services.status.onHours\":{\"one\":\"On for {n} hour\",\"other\":\"On for {n} hours\"},\"services.status.onSince\":\"On since {date}\",\"services.auto.label\":\"Start services automatically\",\"services.auto.noEngine\":\"The kernel has no services engine (services-isolate module)\",\"services.auto.description\":\"When you sign in, your services chosen in Services start. The ones an administrator chose for everyone start anyway.\",\"services.auto.keywords\":\"services startup automatic background kernel\",\"services.title\":\"Installed services\",\"services.noEngine\":\"The kernel has no services engine: it needs the services-isolate module (AppStore → Kernel).\",\"services.none\":\"No installed app has services.\",\"services.hint\":\"The parts of apps that work in the kernel, without a window, even with lilOS closed. “At system startup” applies to every user and is chosen by an administrator; “At sign-in” only to you.\",\"services.startup.none\":\"Never\",\"services.startup.login\":\"At sign-in\",\"services.startup.system\":\"At system startup\",\"services.startup.field\":\"Startup of {name}\",\"services.restart\":\"Restart\",\"services.restartOf\":\"Restart {name}\",\"services.stop\":\"Stop\",\"services.start\":\"Start\",\"services.byAdmin\":\"chosen by an administrator\",\"services.log.label\":\"Log\",\"services.log.title\":\"Log of {name}\",\"services.log.empty\":\"No lines: the service has not started yet.\",\"storage.label\":\"Storage\",\"storage.description.kernel\":\"lilOS data saved in your user folder.\",\"storage.description.browser\":\"lilOS data saved in this browser.\",\"storage.space.title\":\"Space\",\"storage.used.label\":\"Space used\",\"storage.used.description\":\"Positions, view and settings\",\"storage.contents.label\":\"File contents\",\"storage.contents.description\":\"Text saved in files\",\"storage.reset.title\":\"Reset\",\"storage.defaults.label\":\"Default settings\",\"storage.defaults.description\":\"Resets settings, shortcuts, file type apps and menus to their initial values\",\"storage.initial.label\":\"Initial desk and files\",\"storage.initial.description\":\"Deletes all the folders and files created, the workspaces, the tags, the saved positions and view, then reloads lilOS\",\"storage.initial.keywords\":\"reset factory desktop desk workspace tag\",\"storage.initial.button\":\"Reset…\",\"storage.initial.confirm\":\"Delete and reload\",\"about.label\":\"About\",\"about.description\":\"Version, environment and credits.\",\"about.version\":\"Version\",\"about.sdkVersion\":\"SDK version\",\"about.language\":\"Language\",\"about.browser\":\"Browser\",\"about.unknownBrowser\":\"Unknown\",\"credits.label\":\"Credits\",\"credits.libraries\":\"Libraries\",\"credits.indirect\":\"Libraries used by other libraries\",\"credits.fonts\":\"Fonts\",\"credits.tools\":\"Tools\",\"credits.usedBy\":\"used by {users}\",\"credits.via\":\"brought by {libraries}, in {users}\",\"credits.builds\":\"builds lilOS and its apps\",\"credits.optional\":\"optional\",\"credits.module\":\"{name} (kernel module)\",\"credits.fontUsedBy\":\"used by {users}\",\"credits.site\":\"Website\",\"credits.siteOf\":\"Website of {name}\",\"credits.keywords\":\"credits acknowledgements license libraries open source thanks\",\"userPage.label\":\"User page\",\"userPage.description\":\"What the page opened from your name shows\",\"userPage.title\":\"User page\",\"userPage.open.label\":\"Opened from your name\",\"userPage.open.description\":\"Click your name in the taskbar or at the bottom of the menu. Your name and photo are always there: choose here what else it shows.\",\"userPage.keywords\":\"user page profile account photo lock sign out restart {name}\",\"userPage.toggle\":\"{name} on the user page\",\"userPage.group.header\":\"Header\",\"userPage.group.actions\":\"Actions\",\"userPage.group.account\":\"Account\",\"userPage.group.session\":\"This session\",\"userPage.group.footer\":\"Footer\",\"userPage.item.details.name\":\"Username and role\",\"userPage.item.details.description\":\"Under your name: the name you sign in with and whether you are an administrator\",\"userPage.item.lock.name\":\"Lock\",\"userPage.item.lock.description\":\"Covers the screen until you enter your password again; apps stay open\",\"userPage.item.logout.name\":\"Sign out\",\"userPage.item.logout.description\":\"Saves, closes the apps and goes back to the sign-in screen\",\"userPage.item.restart.name\":\"Restart the system\",\"userPage.item.restart.description\":\"Restarts the lilOS kernel for every user; administrators only\",\"userPage.item.photo.name\":\"Profile photo\",\"userPage.item.photo.description\":\"Choose, change or remove your photo\",\"userPage.item.theme.name\":\"Theme\",\"userPage.item.theme.description\":\"Light or dark\",\"userPage.item.language.name\":\"Language\",\"userPage.item.language.description\":\"The language of apps\",\"userPage.item.settings.name\":\"All settings\",\"userPage.item.settings.description\":\"Opens Control Panel\",\"userPage.item.workspace.name\":\"Workspace\",\"userPage.item.workspace.description\":\"The one you are in and how many there are\",\"userPage.item.windows.name\":\"Open windows\",\"userPage.item.windows.description\":\"How many windows are open and how many apps work in the background\",\"userPage.item.startup.name\":\"At startup\",\"userPage.item.startup.description\":\"How many apps open when you come in\",\"userPage.item.storage.name\":\"Space used\",\"userPage.item.storage.description\":\"How much your files take up\",\"userPage.item.about.name\":\"lilOS version\",\"userPage.item.about.description\":\"The lilOS version and the address you are connected to\",\"notifications.label\":\"Notifications\",\"notifications.description\":\"How notifications appear when they arrive, and how many are kept\",\"notifications.arrive.title\":\"When they arrive\",\"notifications.shown.label\":\"Shown together\",\"notifications.shown.description\":\"How many appear one above the other over the notification area of the taskbar. Past this number the older ones are not shown there, but stay in the list.\",\"notifications.shown.keywords\":\"notifications bar popup tray count\",\"notifications.shown.field\":\"Notifications shown together\",\"notifications.seconds.label\":\"How long they stay\",\"notifications.seconds.description\":\"Seconds after the last one arrived. With the pointer over them they stay until you move it away.\",\"notifications.seconds.keywords\":\"notifications time seconds duration\",\"notifications.seconds.field\":\"How long notifications stay\",\"notifications.seconds.value\":{\"one\":\"{n} second\",\"other\":\"{n} seconds\"},\"notifications.list.title\":\"List\",\"notifications.keep.label\":\"Notifications kept\",\"notifications.keep.description\":\"When one more arrives the oldest is deleted. The bell in the notification area lists them all.\",\"notifications.keep.page\":\"Without the kernel's notifications module they are kept only until lilOS reloads.\",\"notifications.keep.keywords\":\"notifications history list keep limit\",\"notifications.keep.field\":\"Notifications kept\",\"notifications.test.label\":\"Try\",\"notifications.test.description\":\"Sends you a notification, to see how it looks.\",\"notifications.test.button\":\"Send a test notification\",\"notifications.test.text\":\"Test notification: notifications work.\",\"notifications.error\":\"Not saved: {message}\",\"@name\":\"Control Panel\",\"@description\":\"Appearance, language, desk, user page, workspaces, notifications, tags, shortcuts, file types, startup services and apps, storage.\",\"@entrypoints.main.params.tab.label\":\"Section\",\"@entrypoints.main.params.tab.options.appearance.label\":\"Appearance\",\"@entrypoints.main.params.tab.options.language.label\":\"Language\",\"@entrypoints.main.params.tab.options.desk.label\":\"Desk\",\"@entrypoints.main.params.tab.options.userpage.label\":\"User page\",\"@entrypoints.main.params.tab.options.workspaces.label\":\"Workspaces\",\"@entrypoints.main.params.tab.options.notifications.label\":\"Notifications\",\"@entrypoints.main.params.tab.options.tags.label\":\"Tags\",\"@entrypoints.main.params.tab.options.usability.label\":\"Usability\",\"@entrypoints.main.params.tab.options.apps.label\":\"Apps\",\"@entrypoints.main.params.tab.options.startup.label\":\"Startup\",\"@entrypoints.main.params.tab.options.onedrive.label\":\"OneDrive\",\"@entrypoints.main.params.tab.options.storage.label\":\"Storage\",\"@entrypoints.main.params.tab.options.about.label\":\"About\",\"pipes.label\":\"Pipes\",\"pipes.title\":\"Pipes on events\",\"pipes.keywords\":\"pipes events handlers order chain\",\"pipes.intro.label\":\"What apps do when something happens\",\"pipes.intro.description\":\"Apps can step in when a file is opened, read or saved, or look at what happens in the system; an app can also add events of its own. Below, each event with its handlers in the order they run ({count} events in all). The after stage runs in the reverse order of before.\",\"pipes.unsupported\":\"This version of lilOS has no pipes\",\"pipes.lilos\":\"lilOS\",\"pipes.up\":\"Up\",\"pipes.down\":\"Down\",\"pipes.stage.before\":\"Before\",\"pipes.stage.after\":\"After\",\"pipes.band.first\":\"among the first\",\"pipes.band.middle\":\"in the middle\",\"pipes.band.last\":\"among the last\",\"pipes.where.all\":\"every item\",\"pipes.where.system\":\"chosen by lilOS\",\"pipes.where.own\":\"the files it marked\",\"pipes.where.ext\":\"files {list}\",\"pipes.where.type.file\":\"files\",\"pipes.where.type.folder\":\"folders\",\"pipes.where.type.app\":\"app shortcuts\",\"pipes.where.app\":\"apps {list}\",\"pipes.reset.label\":\"Order of the handlers\",\"pipes.reset.description\":\"You changed it: go back to the order of installation\",\"pipes.idle.title\":\"Events without handlers\",\"pipes.idle.description\":\"{count} events: no app handles them now\",\"pipes.idle.none\":\"Every event has a handler\",\"pipes.owned\":\"{label} (of {app})\",\"pipes.event.file.open\":\"Opening a file\",\"pipes.event.file.read\":\"Reading a file\",\"pipes.event.file.write\":\"Saving a file\",\"pipes.event.app.launch\":\"Starting an app\",\"pipes.event.file.create\":\"Creating an item\",\"pipes.event.file.rename\":\"Renaming\",\"pipes.event.file.move\":\"Moving\",\"pipes.event.file.copy\":\"Copying a file\",\"pipes.event.file.remove\":\"Deleting for good\",\"pipes.event.trash.put\":\"Moving to the Trash\",\"pipes.event.trash.restore\":\"Restoring from the Trash\",\"pipes.event.trash.purge\":\"Emptying the Trash\",\"pipes.event.tags.assign\":\"Tags of an item\",\"pipes.event.window.open\":\"Opening a window\",\"pipes.event.window.close\":\"Closing a window\",\"pipes.event.workspace.switch\":\"Changing workspace\",\"pipes.event.settings.change\":\"Changing a setting\",\"pipes.event.system.ready\":\"System ready\",\"pipes.event.session.login\":\"User signed in\",\"pipes.event.session.logout\":\"Signing out\",\"pipes.event.apps.install\":\"Installing an app\",\"pipes.event.apps.update\":\"Updating an app\",\"pipes.event.apps.remove\":\"Removing an app\",\"pipes.event.permissions.change\":\"Permissions of an app\",\"pipes.event.settings.system\":\"System settings\",\"pipes.event.pipes.change\":\"Subscriptions to pipes\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"window.title\":\"Pannello di controllo\",\"onedrive.label\":\"OneDrive\",\"onedrive.description\":\"L’app su Azure, le cartelle condivise, Carica su OneDrive e apri, Office online.\",\"onedrive.keywords\":\"onedrive microsoft office online azure word excel powerpoint condivisi condivise\",\"cloud.gdrive.label\":\"Google Drive\",\"cloud.gdrive.description\":\"Il progetto Google Cloud, Condivisi con me, il formato dei documenti Google.\",\"cloud.gdrive.keywords\":\"google drive documenti fogli presentazioni cloud progetto client segreto\",\"cloud.gdrive.settings\":\"Progetto Google Cloud (per tutti su questo lilOS)\",\"cloud.gdrive.steps.title\":\"Come creare il progetto su Google Cloud\",\"cloud.gdrive.steps.label\":\"Passi\",\"cloud.gdrive.steps.1\":\"console.cloud.google.com → Nuovo progetto (per esempio «lilOS»).\",\"cloud.gdrive.steps.2\":\"API e servizi → Libreria → abilita Google Drive API.\",\"cloud.gdrive.steps.3\":\"Schermata di consenso OAuth: Interno con Google Workspace; altrimenti Esterno, poi Pubblica l’app (in «Test» l’accesso scade ogni 7 giorni). Ambito: …/auth/drive.\",\"cloud.gdrive.steps.4\":\"Credenziali → Crea ID client OAuth → Applicazione web, con i due indirizzi qui sopra come URI di reindirizzamento autorizzati (oppure App desktop: allora sempre incollando l’indirizzo).\",\"cloud.gdrive.steps.5\":\"Copia l’ID client e il segreto client qui sopra.\",\"cloud.gdrive.steps.6\":\"Al primo accesso Google dice che l’app non è verificata: è il tuo progetto, Continua.\",\"cloud.gphotos.label\":\"Google Foto\",\"cloud.gphotos.description\":\"Il progetto Google Cloud per Importa da Google Foto e gli album creati da lilOS.\",\"cloud.gphotos.keywords\":\"google foto picker album importa cloud progetto client segreto\",\"cloud.gphotos.settings\":\"Progetto Google Cloud (per tutti su questo lilOS)\",\"cloud.gphotos.steps.title\":\"Come impostare il progetto su Google Cloud\",\"cloud.gphotos.steps.label\":\"Passi\",\"cloud.gphotos.steps.1\":\"Usa il progetto di Google Drive o creane uno su console.cloud.google.com.\",\"cloud.gphotos.steps.2\":\"API e servizi → Libreria → abilita Google Photos Picker API e Photos Library API.\",\"cloud.gphotos.steps.3\":\"Schermata di consenso OAuth: aggiungi gli ambiti di Google Foto (photospicker.mediaitems.readonly, photoslibrary.appendonly, photoslibrary.readonly.appcreateddata, photoslibrary.edit.appcreateddata).\",\"cloud.gphotos.steps.4\":\"Credenziali: va bene lo stesso client OAuth di Drive, con i due indirizzi qui sopra.\",\"cloud.gphotos.steps.5\":\"Copia l’ID client e il segreto client qui sopra.\",\"cloud.gphotos.steps.6\":\"Dal 2025 Google fa vedere alle app solo le foto che l’utente sceglie e gli album creati dall’app.\",\"cloud.azblob.label\":\"Azure Blob Storage\",\"cloud.azblob.description\":\"L’app su Azure per l’accesso con Microsoft Entra (chiave dell’account e SAS non chiedono niente).\",\"cloud.azblob.keywords\":\"azure blob storage entra microsoft contenitore sas chiave data lake\",\"cloud.azblob.settings\":\"Microsoft Entra (per tutti su questo lilOS)\",\"cloud.azblob.steps.title\":\"Come impostare Microsoft Entra\",\"cloud.azblob.steps.label\":\"Passi\",\"cloud.azblob.steps.1\":\"Solo per l’accesso con un account Microsoft: con la chiave dell’account o un token SAS non serve niente.\",\"cloud.azblob.steps.2\":\"portal.azure.com → Registrazioni app: va bene l’app di OneDrive, o una nuova.\",\"cloud.azblob.steps.3\":\"Autenticazione → Applicazioni per dispositivi mobili e desktop: i due indirizzi qui sopra; Consenti flussi client pubblici: Sì.\",\"cloud.azblob.steps.4\":\"Autorizzazioni API → Azure Storage → user_impersonation (delegata).\",\"cloud.azblob.steps.5\":\"Sull’account di archiviazione dai agli utenti il ruolo «Collaboratore ai dati dei BLOB di archiviazione» (Controllo di accesso).\",\"cloud.nfs.label\":\"NFS\",\"cloud.nfs.description\":\"UID e GID di ogni utente sui server NFS.\",\"cloud.nfs.keywords\":\"nfs uid gid nas linux esportazione identità\",\"cloud.nfs.settings\":\"Identità sui server NFS (per tutti su questo lilOS)\",\"cloud.nfs.you\":\"Il tuo nome utente\",\"cloud.nfs.you.description\":\"Il nome da scrivere nella tua riga\",\"cloud.nfs.steps.title\":\"Sul server NFS\",\"cloud.nfs.steps.label\":\"Cosa controllare\",\"cloud.nfs.steps.1\":\"La cartella è esportata all’indirizzo del computer su cui gira il kernel di lilOS, con NFSv3 su TCP.\",\"cloud.nfs.steps.2\":\"Se il kernel di lilOS non può usare una porta sotto la 1024 (Linux senza privilegi), permetti le altre porte: «insecure» in /etc/exports, «Consenti connessioni da porte non privilegiate» su Synology.\",\"cloud.nfs.steps.3\":\"UID e GID qui sono quelli degli utenti sul server: chi li ha legge e scrive i loro file.\",\"cloud.nfs.steps.4\":\"Con più utenti, la rete locale deve essere aperta al kernel (net.allowPrivate o net.allow in config.json).\",\"cloud.status\":\"Stato\",\"cloud.adminOnly\":\"Solo un amministratore cambia queste impostazioni\",\"cloud.ready\":\"Pronto\",\"cloud.notReady\":\"Non ancora impostato\",\"cloud.error\":\"Impostazioni non lette\",\"cloud.saved\":\"Salvato\",\"cloud.notSaved\":\"Non salvato\",\"cloud.secret.set\":\"Impostato (scrivi per sostituirlo)\",\"cloud.secret.empty\":\"Non impostato\",\"cloud.secret.remove\":\"Togli\",\"cloud.addresses.title\":\"Indirizzi da registrare\",\"cloud.redirect.label\":\"Finestra di accesso\",\"cloud.redirect.google\":\"L’indirizzo di questo lilOS, a cui Google rimanda la finestra\",\"cloud.redirect.entra\":\"L’indirizzo di questo lilOS, a cui Microsoft rimanda la finestra\",\"cloud.redirect.unusable\":\"lilOS è aperto su http fuori da questo computer: qui la finestra di accesso non funziona, si accede incollando l’indirizzo (o apri lilOS su https)\",\"cloud.byHand.label\":\"Accesso incollando l’indirizzo\",\"cloud.byHand.google\":\"Dove Google finisce quando lilOS non è su https: una pagina che non si apre, di cui l’utente incolla l’indirizzo\",\"cloud.byHand.entra\":\"Dove Microsoft finisce quando lilOS non è su https: una pagina che non si apre, di cui l’utente incolla l’indirizzo\",\"cloud.copy\":\"Copia\",\"cloud.copied\":\"Copiato\",\"onedrive.app.title\":\"App su Azure (per tutti su questo lilOS)\",\"onedrive.app.error\":\"Impostazioni non lette\",\"onedrive.app.status\":\"Stato\",\"onedrive.app.adminOnly\":\"Solo un amministratore cambia l’app su Azure.\",\"onedrive.app.ready\":\"Pronto\",\"onedrive.app.notReady\":\"Non ancora impostato\",\"onedrive.app.saved\":\"Salvato\",\"onedrive.app.notSaved\":\"Non salvato\",\"onedrive.app.signAgain\":\"Le connessioni chiedono di rifare l’accesso, per accettare i nuovi permessi.\",\"onedrive.redirect.label\":\"Indirizzo di ritorno\",\"onedrive.redirect.description\":\"Da registrare su Azure, piattaforma «Client pubblico/nativo (dispositivi mobili e desktop)»: l’indirizzo di questo lilOS, come lo apri adesso.\",\"onedrive.redirect.unusable\":\"Microsoft accetta solo indirizzi https, o http da questo computer (localhost): apri lilOS così per fare l’accesso.\",\"onedrive.copy\":\"Copia\",\"onedrive.copied\":\"Indirizzo copiato\",\"onedrive.steps.label\":\"Come registrare l’app\",\"onedrive.steps.1\":\"portal.azure.com → Registrazioni app → Nuova registrazione (basta un account Azure gratuito).\",\"onedrive.steps.2\":\"Tipi di account supportati: gli stessi di «Account ammessi» qui.\",\"onedrive.steps.3\":\"URI di reindirizzamento: piattaforma «Client pubblico/nativo (dispositivi mobili e desktop)», l’indirizzo qui sopra.\",\"onedrive.steps.4\":\"Autenticazione → Consenti flussi client pubblici: Sì.\",\"onedrive.steps.5\":\"Autorizzazioni API → Microsoft Graph, delegate: Files.ReadWrite, User.Read, offline_access (Files.ReadWrite.All per le cartelle condivise).\",\"onedrive.steps.6\":\"Copia l’ID dell’applicazione (client) nel campo qui sopra.\",\"onedrive.upload.title\":\"Carica su OneDrive e apri\",\"onedrive.upload.mount.label\":\"Connessione\",\"onedrive.upload.mount.description\":\"Dove vanno i documenti Office della tua Home prima di aprirsi in Office online.\",\"onedrive.upload.mount.none\":\"Prima collega OneDrive: File Manager → Rete → +.\",\"onedrive.upload.mount.ask\":\"Chiedi ogni volta\",\"onedrive.upload.folder.label\":\"Cartella\",\"onedrive.upload.folder.description\":\"Su OneDrive (creata se manca). L’originale resta nella Home: quello che cambi in Office cambia nella copia.\",\"onedrive.upload.exists.label\":\"Un file con lo stesso nome\",\"onedrive.upload.exists.description\":\"Quando la cartella su OneDrive ne ha già uno.\",\"onedrive.upload.exists.ask\":\"Chiedi\",\"onedrive.upload.exists.keep\":\"Tieni entrambi\",\"onedrive.upload.exists.replace\":\"Sostituiscilo\",\"onedrive.office.title\":\"Documenti Office\",\"onedrive.office.doubleClick.label\":\"Il doppio clic apre Office online\",\"onedrive.office.doubleClick.description\":\"Documenti Word, Excel e PowerPoint di OneDrive, quando per il loro tipo non è scelta un’app di lilOS (Usabilità → Tipi di file).\",\"group.system\":\"Sistema\",\"group.data\":\"Dati\",\"common.name\":\"Nome\",\"common.color\":\"Colore\",\"common.items\":\"Elementi\",\"common.create\":\"Crea\",\"common.add\":\"Aggiungi\",\"common.addMore\":\"Aggiungi…\",\"common.choose\":\"Scegli…\",\"common.remove\":\"Togli\",\"common.delete\":\"Elimina…\",\"common.deleteNow\":\"Elimina\",\"common.reset\":\"Ripristina\",\"common.confirm\":\"Conferma\",\"common.loading\":\"Lettura…\",\"common.unavailable\":\"Non disponibile\",\"common.yes\":\"Sì\",\"common.no\":\"No\",\"appearance.label\":\"Aspetto\",\"appearance.description\":\"Colori e movimento dell’interfaccia.\",\"appearance.colors.label\":\"Colori\",\"appearance.theme.label\":\"Tema\",\"appearance.theme.description\":\"Chiaro o scuro: scrivania, barra, menu e finestre\",\"appearance.theme.keywords\":\"tema chiaro scuro dark light notte\",\"appearance.theme.light\":\"Chiaro\",\"appearance.theme.dark\":\"Scuro\",\"appearance.accent.title\":\"Colore principale\",\"appearance.accent.description\":\"Selezione, pulsanti, tab attivi e logo\",\"appearance.accent.keywords\":\"accento tema\",\"appearance.motion.label\":\"Movimento\",\"appearance.animations.label\":\"Animazioni\",\"appearance.animations.description\":\"Spostamenti della vista, menu e transizioni. Se il sistema operativo chiede movimento ridotto, restano ridotte.\",\"appearance.animations.keywords\":\"movimento transizioni\",\"language.label\":\"Lingua\",\"language.description\":\"La lingua delle app: i loro testi, le date e i numeri.\",\"language.title\":\"Lingua del sistema\",\"language.row.description\":\"Le app che non hanno questa lingua usano l’inglese. I testi di lilOS sono ancora in italiano.\",\"language.keywords\":\"lingua traduzione inglese italiano date numeri language locale\",\"language.auto\":\"Automatica: {name}\",\"desk.label\":\"Scrivania\",\"desk.description\":\"Comportamento della scrivania infinita.\",\"desk.fixed.title\":\"Elementi fissi\",\"desk.fixed.label\":\"Sulla scrivania\",\"desk.fixed.descriptionSwitchable\":\"Quelli attivi ci sono sulla scrivania di ogni workspace. Si aprono e si spostano come gli altri, ma non si rinominano e non si eliminano: si tolgono da qui.\",\"desk.fixed.description\":\"Ci sono sulla scrivania di ogni workspace. Si aprono e si spostano come gli altri, ma non si rinominano e non si eliminano.\",\"desk.fixed.keywords\":\"elementi fissi scrivania mostra nascondi elimina {name}\",\"desk.fixed.toggle\":\"{name} sulla scrivania\",\"desk.fixed.toggleIn\":\"{name} sulla scrivania di {workspace}\",\"desk.fixed.always\":\"Fisso\",\"desk.fixed.item.home.name\":\"Home\",\"desk.fixed.item.home.description\":\"La cartella principale, con tutte le altre\",\"desk.fixed.item.documents.name\":\"Documenti\",\"desk.fixed.item.documents.description\":\"La cartella Documenti, condivisa da tutti i workspace\",\"desk.fixed.item.images.name\":\"Immagini\",\"desk.fixed.item.images.description\":\"La cartella Immagini, condivisa da tutti i workspace\",\"desk.fixed.item.files.name\":\"File Manager\",\"desk.fixed.item.files.description\":\"Apre il File Manager\",\"desk.fixed.item.downloads.name\":\"Download\",\"desk.fixed.item.downloads.description\":\"La cartella Download, condivisa da tutti i workspace\",\"desk.fixed.item.trash.name\":\"Cestino\",\"desk.fixed.item.trash.description\":\"Apre il cestino; ci si possono trascinare file e cartelle\",\"desk.fixed.descriptionWorkspace\":\"Quelli attivi ci sono sulla scrivania di questo workspace. Si aprono e si spostano come gli altri, ma non si rinominano e non si eliminano: si tolgono da qui.\",\"desk.fixed.descriptionAll\":\"Accendi o spegni un elemento in tutti i workspace insieme; i workspace nuovi lo hanno uguale. Ogni workspace poi lo può cambiare nel suo tab.\",\"desk.fixed.some\":\"Acceso in {on} workspace su {n}\",\"desk.fixed.toggleAll\":\"{name} su tutte le scrivanie\",\"desk.fixed.moved.label\":\"Ogni workspace ha i suoi\",\"desk.fixed.moved.description\":\"Si scelgono in Workspace: nel tab di ogni workspace, o in Tutti per tutte le scrivanie.\",\"desk.fixed.moved.keywords\":\"elementi fissi scrivania home documenti cestino workspace\",\"desk.fixed.moved.open\":\"Apri\",\"desk.placement.title\":\"Posizionamento\",\"desk.snap.label\":\"Allinea alla griglia\",\"desk.snap.description\":\"Gli elementi trascinati si allineano a una griglia invisibile\",\"desk.snap.keywords\":\"icone snap\",\"desk.previews.title\":\"Icone\",\"desk.previews.label\":\"Mostra l’anteprima dei file\",\"desk.previews.description\":\"Al posto dell’icona, i file mostrano una piccola immagine di quello che contengono, fatta dall’app che li apre (Photo, Editor…)\",\"desk.previews.keywords\":\"anteprime miniature icone immagini file\",\"desk.background.label\":\"Sfondo\",\"desk.background.color.title\":\"Colore\",\"desk.background.color.description\":\"Dietro gli elementi, e intorno alle immagini trasparenti\",\"desk.background.color.keywords\":\"sfondo colore scrivania desktop\",\"desk.background.custom.label\":\"Altro colore\",\"desk.background.custom.description\":\"Un colore a scelta\",\"desk.background.theme.label\":\"Colore del tema\",\"desk.background.theme.description\":\"Torna al colore del tema chiaro o scuro\",\"desk.background.theme.button\":\"Usa il colore del tema\",\"desk.background.image.title\":\"Immagine\",\"desk.background.image.label\":\"Immagine di sfondo\",\"desk.background.image.keywords\":\"sfondo immagine foto scrivania desktop wallpaper\",\"desk.background.image.current\":\"«{name}»: alta quanto la scrivania, con le sue proporzioni (se è più larga si taglia ai lati); non si sposta né si ingrandisce con lei\",\"desk.background.image.none\":\"Nessuna: solo il colore. Nel menu di un'immagine sulla scrivania: Usa come sfondo desktop\",\"desk.background.image.choose\":\"Scegli…\",\"desk.background.image.pick\":\"Scegli l'immagine di sfondo\",\"desk.background.image.remove.label\":\"Togli l'immagine\",\"desk.background.image.remove.description\":\"Il file resta dov'è\",\"desk.background.image.remove.button\":\"Togli\",\"desk.overview.label\":\"Panoramica\",\"desk.overview.title\":\"Pannello in basso a destra\",\"desk.minimap.label\":\"Mostra la minimappa\",\"desk.minimap.keywords\":\"mappa miniatura\",\"workspaces.label\":\"Workspace\",\"workspaces.description\":\"Scrivanie separate, ognuna con i suoi elementi, finestre e app. I file fuori dalla scrivania sono di tutti.\",\"workspaces.current.label\":\"Questo workspace\",\"workspaces.current.title\":\"Workspace\",\"workspaces.all.label\":\"Tutti\",\"workspaces.name.keywords\":\"rinomina workspace\",\"workspaces.name.field\":\"Nome del workspace\",\"workspaces.description.label\":\"Descrizione\",\"workspaces.description.description\":\"Una riga su a cosa serve il workspace, sotto il suo nome in fondo al menu di avvio\",\"workspaces.description.keywords\":\"descrizione workspace note menu di avvio\",\"workspaces.description.field\":\"Descrizione del workspace\",\"workspaces.description.placeholder\":\"A cosa ti serve\",\"workspaces.color.description\":\"Il pallino nella barra in basso e accanto ai suoi file nel File Manager\",\"workspaces.color.keywords\":\"colore workspace\",\"workspaces.owned.label\":\"File, cartelle e collegamenti\",\"workspaces.owned.description\":\"Creati in questo workspace, sulla scrivania e nelle cartelle condivise\",\"workspaces.apps.title\":\"App\",\"workspaces.apps.system\":\"App di sistema: c’è in ogni workspace\",\"workspaces.apps.installed\":\"Installata in lilOS: qui la puoi nascondere\",\"workspaces.apps.keywords\":\"app nascondi mostra {name}\",\"workspaces.apps.alwaysVisible\":\"Sempre visibile\",\"workspaces.apps.toggle\":\"{name} visibile in questo workspace\",\"workspaces.apps.toggleIn\":\"{name} visibile in {workspace}\",\"workspaces.list.current\":\"{name} (attuale)\",\"workspaces.list.owned\":{\"one\":\"{n} elemento creato\",\"other\":\"{n} elementi creati\"},\"workspaces.list.apps\":{\"one\":\"{n} app\",\"other\":\"{n} app\"},\"workspaces.list.keywords\":\"workspace passa elimina\",\"workspaces.list.switch\":\"Passa a questo\",\"workspaces.switch.label\":\"Vai a questo workspace\",\"workspaces.new.label\":\"Nuovo workspace\",\"workspaces.new.description\":\"Con la scrivania vuota e tutte le app visibili\",\"workspaces.deleting.title\":\"Eliminare un workspace\",\"workspaces.deleting.files.label\":\"I file restano\",\"workspaces.deleting.files.description\":\"La sua scrivania diventa la cartella Documenti/Scrivania di <nome> (se non è vuota); i file creati altrove restano dove sono, segnati come suoi.\",\"workspaces.deleting.windows.label\":\"Le finestre restano\",\"workspaces.deleting.windows.description\":\"Le sue finestre aperte passano nel workspace attuale, con le modifiche non salvate. Workarea, vista e app nascoste si perdono.\",\"tags.label\":\"Tag\",\"tags.description\":\"Etichette colorate per ritrovare file e cartelle ovunque siano. Un tag invisibile nasconde i suoi elementi.\",\"tags.new.title\":\"Nuovo tag\",\"tags.new.pending\":{\"one\":\"Il nuovo tag andrà su {n} elemento selezionato\",\"other\":\"Il nuovo tag andrà su {n} elementi selezionati\"},\"tags.new.description\":\"Poi si assegna dal menu del tasto destro → Tag, sulla scrivania e nel File Manager\",\"tags.new.keywords\":\"nuovo tag crea etichetta\",\"tags.new.placeholder\":\"Per esempio: Urgente\",\"tags.new.field\":\"Nome del nuovo tag\",\"tags.name.keywords\":\"rinomina tag\",\"tags.name.field\":\"Nome del tag {name}\",\"tags.color.keywords\":\"colore tag\",\"tags.visible.label\":\"Visibile\",\"tags.visible.on\":\"Gli elementi con questo tag si vedono ovunque\",\"tags.visible.off\":\"Gli elementi con questo tag sono nascosti ovunque: si ritrovano nel File Manager → Tag\",\"tags.visible.keywords\":\"nascondi mostra invisibile tag\",\"tags.visible.toggle\":\"Tag {name} visibile\",\"tags.items.description\":{\"one\":\"{n} elemento in questo workspace e nelle cartelle condivise\",\"other\":\"{n} elementi in questo workspace e nelle cartelle condivise\"},\"tags.items.show\":\"Mostra nel File Manager\",\"tags.items.delete\":\"Elimina il tag\",\"usability.label\":\"Usabilità\",\"usability.description\":\"Tastiera, mouse, app che aprono i file, menu contestuali e cestino.\",\"shortcuts.label\":\"Scorciatoie\",\"shortcuts.title\":\"Scorciatoie da tastiera\",\"shortcuts.all.label\":\"Tutte le scorciatoie\",\"shortcuts.all.description\":\"Le modifiche valgono subito. Per registrare una combinazione premi +, poi i tasti; Esc annulla.\",\"shortcuts.all.reset\":\"Ripristina tutte\",\"shortcuts.keywords\":\"scorciatoia tasti {keys}\",\"shortcuts.mouse.title\":\"Mouse\",\"shortcuts.lasso.label\":\"Selezione a mano libera\",\"shortcuts.lasso.description\":\"Disegna un percorso chiuso: si selezionano gli elementi che contiene\",\"shortcuts.lasso.keywords\":\"lazo lasso percorso selezione alt\",\"shortcuts.rectangle.label\":\"Selezione a rettangolo\",\"shortcuts.rectangle.control\":\"Trascina sullo sfondo\",\"shortcuts.addToSelection.label\":\"Aggiungere alla selezione\",\"shortcuts.addToSelection.control\":\"Ctrl o Shift + clic o trascinamento\",\"shortcuts.pan.label\":\"Spostarsi sulla scrivania\",\"shortcuts.pan.control\":\"Spazio + trascina, o tasto centrale\",\"shortcuts.fixed.title\":\"Tasti fissi\",\"shortcuts.navigate.label\":\"Muoversi nei menu, nelle liste e nei tab\",\"shortcuts.navigate.control\":\"Frecce, Invio, Esc\",\"shortcuts.rename.label\":\"Confermare o annullare la rinomina\",\"shortcuts.rename.control\":\"Invio, Esc\",\"fileTypes.label\":\"Tipi di file\",\"fileTypes.title\":\"App per tipo di file\",\"fileTypes.all.label\":\"Tutti i tipi di file\",\"fileTypes.all.description\":\"Aprendo un file, lilOS usa l’app scelta qui. Con «Chiedi ogni volta» compare la finestra Apri con.\",\"fileTypes.all.reset\":\"Ripristina tutti\",\"fileTypes.noExtension\":\"Senza estensione\",\"fileTypes.default\":\"Predefinita: {app}\",\"fileTypes.noDefault\":\"Nessuna app predefinita\",\"fileTypes.keywords\":\"tipo file estensione apri con {ext}\",\"fileTypes.field\":\"App per .{ext}\",\"fileTypes.fieldNoExtension\":\"App per i file senza estensione\",\"fileTypes.ask\":\"Chiedi ogni volta\",\"fileTypes.others\":\"Altri\",\"menu.label\":\"Menu contestuale\",\"menu.separator\":\"— Separatore —\",\"menu.submenu\":{\"one\":\"Sottomenu · {n} voce\",\"other\":\"Sottomenu · {n} voci\"},\"menu.create.folder\":\"Crea la cartella «{name}»\",\"menu.create.file\":\"Crea il file «{name}»\",\"menu.create.fileFromTemplate\":\"Crea il file «{name}» dal modello {template}\",\"menu.create.fileWithContent\":\"Crea il file «{name}» con un contenuto iniziale\",\"menu.create.deletedTemplate\":\"(file eliminato)\",\"menu.launch\":\"Apre l’app {name}\",\"menu.action\":\"Azione\",\"menu.keywords\":\"menu contestuale voce separatore nuovo\",\"menu.moveUp\":\"Sposta su\",\"menu.moveDown\":\"Sposta giù\",\"menu.target.root\":\"Menu principale\",\"menu.target.inside\":\"Dentro «{name}»\",\"menu.target.label\":\"Dove\",\"menu.item.label\":\"Voce\",\"menu.item.description\":\"Un’azione o l’apertura di un’app\",\"menu.item.field\":\"Voce da aggiungere\",\"menu.item.open\":\"Apri {name}\",\"menu.separatorRow.label\":\"Separatore\",\"menu.separatorRow.description\":\"Una linea per raggruppare le voci\",\"menu.new.label\":\"Nuovo elemento in «{name}»\",\"menu.new.description\":\"Crea un file o una cartella con questo nome; un file può partire dal contenuto di un modello\",\"menu.new.labelField\":\"Etichetta\",\"menu.new.labelPlaceholder\":\"Etichetta (es. Foglio di stile)\",\"menu.new.nameField\":\"Nome del file o della cartella\",\"menu.new.namePlaceholder\":\"Nome (es. stile.css)\",\"menu.new.kind\":\"Tipo\",\"menu.new.kindFile\":\"File\",\"menu.new.kindFolder\":\"Cartella\",\"menu.new.missing\":\"Servono l’etichetta e il nome\",\"menu.template.button\":\"Modello…\",\"menu.template.chosen\":\"Modello: {name}\",\"menu.template.title\":\"Scegli il file modello\",\"menu.template.text\":\"Il nuovo file partirà con il contenuto di questo file.\",\"menu.defaults.label\":\"Voci predefinite\",\"menu.defaults.custom\":\"Il menu è stato personalizzato\",\"menu.defaults.default\":\"Il menu è quello predefinito\",\"trash.label\":\"Cestino\",\"trash.deleting.title\":\"Eliminazione\",\"trash.confirm.label\":\"Chiedi conferma\",\"trash.confirm.description\":\"Prima di eliminare file e cartelle, un piccolo menu chiede di confermare\",\"trash.confirm.keywords\":\"conferma elimina cancella domanda\",\"trash.permanent.label\":\"Elimina definitivamente\",\"trash.permanent.description\":\"Gli elementi eliminati non passano dal cestino: si recuperano solo con Ctrl Z, finché la pagina resta aperta\",\"trash.permanent.keywords\":\"cestino definitivo subito cancella salta\",\"trash.retention.label\":\"Conserva gli elementi per\",\"trash.retention.description\":\"Passato questo tempo, quello che è nel cestino viene eliminato definitivamente\",\"trash.retention.keywords\":\"retention durata giorni pulizia automatica svuota\",\"trash.retention.field\":\"Conserva gli elementi nel cestino per\",\"trash.retention.days\":{\"one\":\"{n} giorno\",\"other\":\"{n} giorni\"},\"trash.retention.forever\":\"Per sempre\",\"trash.contents.label\":\"Contenuto\",\"trash.contents.description\":{\"one\":\"{n} elemento · {size}\",\"other\":\"{n} elementi · {size}\"},\"trash.contents.empty\":\"Il cestino è vuoto\",\"trash.contents.keywords\":\"apri cestino ripristina\",\"trash.contents.open\":\"Apri il cestino\",\"trash.empty.label\":\"Svuota il cestino\",\"trash.empty.description\":\"Elimina definitivamente tutto quello che contiene\",\"trash.empty.keywords\":\"svuota cestino\",\"trash.empty.button\":\"Svuota…\",\"trash.empty.confirm\":\"Svuota\",\"trash.empty.none\":\"Vuoto\",\"apps.label\":\"App\",\"apps.description\":\"Come girano le app installate.\",\"apps.security.label\":\"Sicurezza\",\"apps.execution.title\":\"Esecuzione delle app\",\"apps.isolated.label\":\"Esegui le app isolate\",\"apps.isolated.description\":\"Ogni app gira in una sandbox e vede solo quello che i suoi permessi le concedono. Se lo togli, le app girano nella pagina di lilOS e in un Web Worker: più veloci, ma possono fare tutto quello che puoi fare tu. Vale dalla prossima apertura di ogni app.\",\"apps.isolated.adminOnly\":\"Solo un amministratore la cambia.\",\"apps.isolated.keywords\":\"sicurezza isolamento sandbox iframe worker\",\"apps.isolated.failed\":\"Non cambiata: {error}\",\"apps.system.label\":\"App di sistema\",\"apps.system.description\":\"File Manager, Editor, Pannello di controllo e AppStore fanno parte di lilOS e girano sempre dentro lilOS.\",\"apps.installed.title\":\"App installate\",\"apps.installed.keywords\":\"sicurezza isolamento\",\"apps.installed.shared\":\"Come le altre app\",\"apps.installed.own\":\"Scelta per questa app\",\"apps.installed.properties\":\"Proprietà…\",\"apps.installed.none\":\"Nessuna app installata oltre a quelle di sistema\",\"apps.mode.isolated\":\"Isolata\",\"apps.mode.open\":\"Non isolata\",\"apps.mode.system\":\"Dentro lilOS\",\"apps.mode.remote\":\"Isolata, nel suo sito\",\"startup.label\":\"Avvio\",\"startup.description\":\"Servizi e app che partono da soli all’avvio di lilOS e quando entri.\",\"startup.options.label\":\"Opzioni\",\"startup.services.label\":\"Servizi\",\"startup.apps.label\":\"App\",\"startup.auto.title\":\"Avvio automatico\",\"startup.openApps.label\":\"Apri le app quando entri\",\"startup.openApps.description\":\"Si aprono le app scelte in App, con i loro parametri. Solo nella prima scheda di lilOS di questo browser: le altre si aprono vuote.\",\"startup.openApps.keywords\":\"avvio automatico accesso login esecuzione automatica\",\"startup.trouble.title\":\"Se qualcosa non va\",\"startup.safe.label\":\"Avvio senza app\",\"startup.safe.description\":\"Per una volta sola: apri lilOS con ?avvio=no in fondo all’indirizzo. Le scelte salvate restano.\",\"startup.safe.keywords\":\"avvio sicuro avvio=no\",\"startup.safe.active\":\"Attivo ora\",\"startup.apps.title\":\"Si aprono quando entri\",\"startup.apps.hint\":\"Nel workspace in cui si apre lilOS, nell’ordine dell’elenco. Togli tutti i punti d’ingresso di un’app e l’app esce dall’elenco.\",\"startup.apps.none\":\"Nessuna app si apre da sola.\",\"startup.apps.oneEntry\":\"1 punto d’ingresso\",\"startup.apps.entries\":{\"one\":\"{on} di {n} punto d’ingresso\",\"other\":\"{on} di {n} punti d’ingresso\"},\"startup.apps.remove\":\"Rimuovi dall’avvio\",\"startup.apps.allAdded\":\"Tutte le app sono già all’avvio\",\"startup.apps.add\":\"Aggiungi un’app all’avvio\",\"startup.apps.addDescription\":\"Si apre la sua finestra principale; poi scegli altri punti d’ingresso e parametri\",\"startup.params.of\":\"{entry} di {app}\",\"startup.params.undescribed\":\"Questo punto d’ingresso non descrive i suoi parametri: arrivano all’app così come sono, come args.\",\"startup.params.json\":\"Parametri (JSON)\",\"startup.params.jsonOf\":\"Parametri (JSON) di {name}\",\"startup.params.invalidJson\":\"Non è JSON valido\",\"startup.params.notSaved\":\"Non salvati: {error}\",\"startup.path.noFolder\":\"Nessuna cartella\",\"startup.path.noFile\":\"Nessun file\",\"startup.path.gone\":\"(non c’è più)\",\"startup.path.clear\":\"Togli {name}\",\"services.unsupported\":\"Questa versione di lilOS non ha i servizi delle app\",\"services.status.off\":\"Spento\",\"services.status.starting\":\"Si avvia…\",\"services.status.error\":\"Fermo: {error}\",\"services.status.unknownError\":\"errore\",\"services.status.restarting\":\"Riparte… (si era fermato: {error})\",\"services.status.onNow\":\"Acceso da meno di un minuto\",\"services.status.onMinutes\":{\"one\":\"Acceso da {n} minuto\",\"other\":\"Acceso da {n} minuti\"},\"services.status.onHours\":{\"one\":\"Acceso da {n} ora\",\"other\":\"Acceso da {n} ore\"},\"services.status.onSince\":\"Acceso dal {date}\",\"services.auto.label\":\"Avvia i servizi automaticamente\",\"services.auto.noEngine\":\"Il kernel non ha il motore dei servizi (modulo services-isolate)\",\"services.auto.description\":\"Quando entri partono i tuoi servizi scelti in Servizi. Quelli scelti da un amministratore per tutti partono comunque.\",\"services.auto.keywords\":\"servizi avvio automatico background kernel\",\"services.title\":\"Servizi installati\",\"services.noEngine\":\"Il kernel non ha il motore dei servizi: serve il modulo services-isolate (AppStore → Kernel).\",\"services.none\":\"Nessuna app installata ha servizi.\",\"services.hint\":\"Le parti delle app che lavorano nel kernel, senza finestra, anche con lilOS chiuso. «All’avvio del sistema» vale per tutti gli utenti e lo sceglie un amministratore; «All’accesso» solo per te.\",\"services.startup.none\":\"Non si avvia\",\"services.startup.login\":\"All’accesso\",\"services.startup.system\":\"All’avvio del sistema\",\"services.startup.field\":\"Avvio di {name}\",\"services.restart\":\"Riavvia\",\"services.restartOf\":\"Riavvia {name}\",\"services.stop\":\"Spegni\",\"services.start\":\"Accendi\",\"services.byAdmin\":\"scelto da un amministratore\",\"services.log.label\":\"Registro\",\"services.log.title\":\"Registro di {name}\",\"services.log.empty\":\"Nessuna riga: il servizio non è ancora partito.\",\"storage.label\":\"Archiviazione\",\"storage.description.kernel\":\"Dati di lilOS salvati nella tua cartella utente.\",\"storage.description.browser\":\"Dati di lilOS salvati in questo browser.\",\"storage.space.title\":\"Spazio\",\"storage.used.label\":\"Spazio usato\",\"storage.used.description\":\"Posizioni, vista e impostazioni\",\"storage.contents.label\":\"Contenuto dei file\",\"storage.contents.description\":\"Testo salvato nei file\",\"storage.reset.title\":\"Ripristino\",\"storage.defaults.label\":\"Impostazioni predefinite\",\"storage.defaults.description\":\"Riporta impostazioni, scorciatoie, app dei tipi di file e menu ai valori iniziali\",\"storage.initial.label\":\"Scrivania e file iniziali\",\"storage.initial.description\":\"Elimina tutte le cartelle e i file creati, i workspace, i tag, le posizioni e la vista salvate, poi ricarica lilOS\",\"storage.initial.keywords\":\"reset desktop workspace tag\",\"storage.initial.button\":\"Ripristina…\",\"storage.initial.confirm\":\"Elimina e ricarica\",\"about.label\":\"Informazioni\",\"about.description\":\"Versione, ambiente e riconoscimenti.\",\"about.version\":\"Versione\",\"about.sdkVersion\":\"Versione dell’SDK\",\"about.language\":\"Lingua\",\"about.browser\":\"Browser\",\"about.unknownBrowser\":\"Sconosciuto\",\"credits.label\":\"Riconoscimenti\",\"credits.libraries\":\"Librerie\",\"credits.indirect\":\"Librerie usate da altre librerie\",\"credits.fonts\":\"Font\",\"credits.tools\":\"Strumenti\",\"credits.usedBy\":\"usata da {users}\",\"credits.via\":\"portata da {libraries}, in {users}\",\"credits.builds\":\"costruisce lilOS e le sue app\",\"credits.optional\":\"facoltativa\",\"credits.module\":\"{name} (modulo del kernel)\",\"credits.fontUsedBy\":\"usato da {users}\",\"credits.site\":\"Sito\",\"credits.siteOf\":\"Sito di {name}\",\"credits.keywords\":\"credits riconoscimenti crediti licenza licenze librerie open source grazie\",\"userPage.label\":\"Pagina utente\",\"userPage.description\":\"Cosa mostra la pagina che si apre dal tuo nome\",\"userPage.title\":\"Pagina utente\",\"userPage.open.label\":\"Si apre dal tuo nome\",\"userPage.open.description\":\"Clicca il tuo nome nella barra in basso o in fondo al menu. Nome e foto ci sono sempre: qui scegli cos’altro mostra.\",\"userPage.keywords\":\"pagina utente profilo account foto blocca chiudi sessione esci riavvia {name}\",\"userPage.toggle\":\"{name} nella pagina utente\",\"userPage.group.header\":\"Intestazione\",\"userPage.group.actions\":\"Azioni\",\"userPage.group.account\":\"Account\",\"userPage.group.session\":\"Questa sessione\",\"userPage.group.footer\":\"Piè di pagina\",\"userPage.item.details.name\":\"Nome utente e ruolo\",\"userPage.item.details.description\":\"Sotto il nome: il nome con cui accedi e se sei amministratore\",\"userPage.item.lock.name\":\"Blocca\",\"userPage.item.lock.description\":\"Copre lo schermo finché non inserisci di nuovo la password; le app restano aperte\",\"userPage.item.logout.name\":\"Chiudi sessione\",\"userPage.item.logout.description\":\"Salva, chiude le app e torna alla schermata di accesso\",\"userPage.item.restart.name\":\"Riavvia il sistema\",\"userPage.item.restart.description\":\"Riavvia il kernel di lilOS per tutti gli utenti; solo per gli amministratori\",\"userPage.item.photo.name\":\"Foto profilo\",\"userPage.item.photo.description\":\"Scegliere, cambiare o togliere la foto\",\"userPage.item.theme.name\":\"Tema\",\"userPage.item.theme.description\":\"Chiaro o scuro\",\"userPage.item.language.name\":\"Lingua\",\"userPage.item.language.description\":\"La lingua delle app\",\"userPage.item.settings.name\":\"Tutte le impostazioni\",\"userPage.item.settings.description\":\"Apre il Pannello di controllo\",\"userPage.item.workspace.name\":\"Workspace\",\"userPage.item.workspace.description\":\"Quello in cui sei e quanti ce ne sono\",\"userPage.item.windows.name\":\"Finestre aperte\",\"userPage.item.windows.description\":\"Quante finestre sono aperte e quante app lavorano in background\",\"userPage.item.startup.name\":\"All’avvio\",\"userPage.item.startup.description\":\"Quante app si aprono quando entri\",\"userPage.item.storage.name\":\"Spazio usato\",\"userPage.item.storage.description\":\"Quanto occupano i tuoi file\",\"userPage.item.about.name\":\"Versione di lilOS\",\"userPage.item.about.description\":\"La versione di lilOS e l’indirizzo a cui sei collegato\",\"notifications.label\":\"Notifiche\",\"notifications.description\":\"Come compaiono le notifiche quando arrivano, e quante se ne conservano\",\"notifications.arrive.title\":\"Quando arrivano\",\"notifications.shown.label\":\"Mostrate insieme\",\"notifications.shown.description\":\"Quante ne compaiono una sopra l'altra sopra l'area di notifica della barra delle applicazioni. Oltre questo numero le più vecchie non si vedono lì, ma restano nell'elenco.\",\"notifications.shown.keywords\":\"notifiche barra avvisi area di notifica numero\",\"notifications.shown.field\":\"Notifiche mostrate insieme\",\"notifications.seconds.label\":\"Per quanto restano visibili\",\"notifications.seconds.description\":\"Secondi dopo l'ultima arrivata. Con il puntatore sopra restano finché non lo sposti.\",\"notifications.seconds.keywords\":\"notifiche tempo secondi durata\",\"notifications.seconds.field\":\"Per quanto restano visibili le notifiche\",\"notifications.seconds.value\":{\"one\":\"{n} secondo\",\"other\":\"{n} secondi\"},\"notifications.list.title\":\"Elenco\",\"notifications.keep.label\":\"Notifiche conservate\",\"notifications.keep.description\":\"Quando ne arriva una in più si cancella la più vecchia. La campanella nell'area di notifica le elenca tutte.\",\"notifications.keep.page\":\"Senza il modulo delle notifiche del kernel restano solo finché lilOS non si ricarica.\",\"notifications.keep.keywords\":\"notifiche cronologia elenco conservare limite\",\"notifications.keep.field\":\"Notifiche conservate\",\"notifications.test.label\":\"Prova\",\"notifications.test.description\":\"Ti manda una notifica, per vedere come appare.\",\"notifications.test.button\":\"Invia una notifica di prova\",\"notifications.test.text\":\"Notifica di prova: le notifiche funzionano.\",\"notifications.error\":\"Non salvato: {message}\",\"@name\":\"Pannello di controllo\",\"@description\":\"Aspetto, lingua, scrivania, pagina utente, workspace, notifiche, tag, scorciatoie, tipi di file, servizi e app all’avvio, archiviazione.\",\"@entrypoints.main.params.tab.label\":\"Sezione\",\"@entrypoints.main.params.tab.options.appearance.label\":\"Aspetto\",\"@entrypoints.main.params.tab.options.language.label\":\"Lingua\",\"@entrypoints.main.params.tab.options.desk.label\":\"Scrivania\",\"@entrypoints.main.params.tab.options.userpage.label\":\"Pagina utente\",\"@entrypoints.main.params.tab.options.workspaces.label\":\"Workspace\",\"@entrypoints.main.params.tab.options.notifications.label\":\"Notifiche\",\"@entrypoints.main.params.tab.options.tags.label\":\"Tag\",\"@entrypoints.main.params.tab.options.usability.label\":\"Usabilità\",\"@entrypoints.main.params.tab.options.apps.label\":\"App\",\"@entrypoints.main.params.tab.options.startup.label\":\"Avvio\",\"@entrypoints.main.params.tab.options.onedrive.label\":\"OneDrive\",\"@entrypoints.main.params.tab.options.storage.label\":\"Archiviazione\",\"@entrypoints.main.params.tab.options.about.label\":\"Informazioni\",\"pipes.label\":\"Pipe\",\"pipes.title\":\"Pipe sugli eventi\",\"pipes.keywords\":\"pipe eventi handler ordine catena\",\"pipes.intro.label\":\"Cosa fanno le app quando succede qualcosa\",\"pipes.intro.description\":\"Le app possono intervenire quando un file si apre, si legge o si salva, oppure guardare cosa succede nel sistema; un’app può anche aggiungere eventi suoi. Qui sotto, ogni evento con i suoi handler nell’ordine in cui partono ({count} eventi in tutto). La fase dopo scorre in ordine inverso rispetto a prima.\",\"pipes.unsupported\":\"Questa versione di lilOS non ha le pipe\",\"pipes.lilos\":\"lilOS\",\"pipes.up\":\"Su\",\"pipes.down\":\"Giù\",\"pipes.stage.before\":\"Prima\",\"pipes.stage.after\":\"Dopo\",\"pipes.band.first\":\"tra i primi\",\"pipes.band.middle\":\"in mezzo\",\"pipes.band.last\":\"tra gli ultimi\",\"pipes.where.all\":\"ogni elemento\",\"pipes.where.system\":\"scelti da lilOS\",\"pipes.where.own\":\"i file che ha segnato\",\"pipes.where.ext\":\"file {list}\",\"pipes.where.type.file\":\"file\",\"pipes.where.type.folder\":\"cartelle\",\"pipes.where.type.app\":\"collegamenti alle app\",\"pipes.where.app\":\"app {list}\",\"pipes.reset.label\":\"Ordine degli handler\",\"pipes.reset.description\":\"L’hai cambiato: torna all’ordine di installazione\",\"pipes.idle.title\":\"Eventi senza handler\",\"pipes.idle.description\":\"{count} eventi: per ora nessuna app li gestisce\",\"pipes.idle.none\":\"Ogni evento ha un handler\",\"pipes.owned\":\"{label} (di {app})\",\"pipes.event.file.open\":\"Apertura di un file\",\"pipes.event.file.read\":\"Lettura di un file\",\"pipes.event.file.write\":\"Salvataggio di un file\",\"pipes.event.app.launch\":\"Avvio di un’app\",\"pipes.event.file.create\":\"Creazione di un elemento\",\"pipes.event.file.rename\":\"Cambio di nome\",\"pipes.event.file.move\":\"Spostamento\",\"pipes.event.file.copy\":\"Copia di un file\",\"pipes.event.file.remove\":\"Eliminazione definitiva\",\"pipes.event.trash.put\":\"Spostamento nel Cestino\",\"pipes.event.trash.restore\":\"Ripristino dal Cestino\",\"pipes.event.trash.purge\":\"Svuotamento del Cestino\",\"pipes.event.tags.assign\":\"Tag di un elemento\",\"pipes.event.window.open\":\"Apertura di una finestra\",\"pipes.event.window.close\":\"Chiusura di una finestra\",\"pipes.event.workspace.switch\":\"Cambio di workspace\",\"pipes.event.settings.change\":\"Cambio di un’impostazione\",\"pipes.event.system.ready\":\"Sistema pronto\",\"pipes.event.session.login\":\"Utente entrato\",\"pipes.event.session.logout\":\"Uscita dall’account\",\"pipes.event.apps.install\":\"Installazione di un’app\",\"pipes.event.apps.update\":\"Aggiornamento di un’app\",\"pipes.event.apps.remove\":\"Rimozione di un’app\",\"pipes.event.permissions.change\":\"Permessi di un’app\",\"pipes.event.settings.system\":\"Impostazioni di sistema\",\"pipes.event.pipes.change\":\"Iscrizioni alle pipe\"}}")
}), { t: F } = P;
// src/settings/menuEditor.js
function he(e, { openWindow: t, rerender: n, confirmButton: r }) {
	let i = p.layout(e), o = (t) => {
		p.setLayout(e, t), n();
	}, s = (e) => {
		if (e.type === "separator") return {
			label: F("menu.separator"),
			description: ""
		};
		if (e.type === "submenu") return {
			label: e.label,
			description: F("menu.submenu", { n: e.items.length })
		};
		let t = p.action(e.action), n = e.label ?? t?.label ?? e.action;
		if (e.action === "desktop.create") {
			let t = e.params.name;
			return e.params.kind === "folder" ? {
				label: n,
				description: F("menu.create.folder", { name: t })
			} : e.params.template ? {
				label: n,
				description: F("menu.create.fileFromTemplate", {
					name: t,
					template: l.exists(e.params.template) ? l.path(e.params.template) : F("menu.create.deletedTemplate")
				})
			} : {
				label: n,
				description: e.params.content ? F("menu.create.fileWithContent", { name: t }) : F("menu.create.file", { name: t })
			};
		}
		return e.action === "app.launch" ? {
			label: n,
			description: F("menu.launch", { name: j.find((t) => t.id === e.params.app)?.name ?? e.params.app })
		} : {
			label: n,
			description: F("menu.action")
		};
	}, c = (e, t) => {
		let n = structuredClone(i);
		return t(e.length === 1 ? n : n[e[0]].items, e[e.length - 1]), n;
	}, f = (e, t) => o(c(e, (e, n) => {
		let r = n + t;
		r < 0 || r >= e.length || ([e[n], e[r]] = [e[r], e[n]]);
	})), m = (e) => o(c(e, (e, t) => e.splice(t, 1))), ee = (e, t, n) => {
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
			keywords: F("menu.keywords"),
			control: u("div", { class: "mm-ctl" }, o("arrowUp", F("menu.moveUp"), () => f(t, -1), a === 0), o("arrowDown", F("menu.moveDown"), () => f(t, 1), a === n - 1), o("x", F("common.remove"), () => m(t)))
		};
	}, g = [];
	i.forEach((e, t) => {
		g.push(ee(e, [t], i.length)), e.type === "submenu" && e.items.forEach((n, r) => g.push(ee(n, [t, r], e.items.length)));
	});
	let _ = i.map((e, t) => [e, t]).filter(([e]) => e.type === "submenu"), v = [{
		value: "root",
		label: F("menu.target.root")
	}, ..._.map(([e, t]) => ({
		value: String(t),
		label: F("menu.target.inside", { name: e.label })
	}))], y = (e, t) => o(c(e === "root" ? [0] : [Number(e), 0], (e) => e.push(t))), b = p.actions(e).filter((e) => e.id !== "desktop.create" && e.id !== "app.launch"), x = h({
		value: b[0]?.id,
		label: F("menu.item.field"),
		options: [...b.map((e) => ({
			value: e.id,
			label: e.label
		})), ...j.filter((e) => e.load).map((e) => ({
			value: `app:${e.id}`,
			label: F("menu.item.open", { name: e.name })
		}))]
	}), S = h({
		value: "root",
		options: v,
		label: F("menu.target.label")
	}), w = h({
		value: "root",
		options: v,
		label: F("menu.target.label")
	}), T = _[0], E = C({
		placeholder: F("menu.new.labelPlaceholder"),
		label: F("menu.new.labelField")
	}), D = C({
		placeholder: F("menu.new.namePlaceholder"),
		label: F("menu.new.nameField")
	}), O = h({
		value: "file",
		options: [{
			value: "file",
			label: F("menu.new.kindFile")
		}, {
			value: "folder",
			label: F("menu.new.kindFolder")
		}],
		label: F("menu.new.kind")
	}), k = null, A = a({
		label: F("menu.template.button"),
		onClick: async () => {
			let e = await ce(t, {
				title: F("menu.template.title"),
				text: F("menu.template.text")
			});
			e && (k = e.id, A.textContent = F("menu.template.chosen", { name: e.name }));
		}
	}), te = u("small", { class: "mm-note" });
	return [{
		title: p.list().find((t) => t.id === e)?.label ?? e,
		rows: g
	}, {
		title: F("common.add"),
		rows: [
			{
				label: F("menu.item.label"),
				description: F("menu.item.description"),
				control: u("div", { class: "mm-add" }, x, S, a({
					label: F("common.add"),
					onClick: () => {
						let e = x.value, t = e.startsWith("app:") ? {
							type: "action",
							action: "app.launch",
							label: F("menu.item.open", { name: j.find((t) => t.id === e.slice(4))?.name }),
							params: { app: e.slice(4) }
						} : {
							type: "action",
							action: e
						};
						y(S.value, t);
					}
				}))
			},
			{
				label: F("menu.separatorRow.label"),
				description: F("menu.separatorRow.description"),
				control: u("div", { class: "mm-add" }, w, a({
					label: F("common.add"),
					onClick: () => y(w.value, { type: "separator" })
				}))
			},
			...T ? [{
				label: F("menu.new.label", { name: T[0].label }),
				description: F("menu.new.description"),
				control: u("div", { class: "mm-add" }, E, D, O, A, a({
					label: F("common.add"),
					primary: !0,
					onClick: () => {
						let e = E.value.trim(), t = D.value.trim();
						if (!e || !t) {
							te.textContent = F("menu.new.missing");
							return;
						}
						let n = {
							kind: O.value,
							name: t,
							...k && O.value === "file" && { template: k }
						};
						y(String(T[1]), {
							type: "action",
							action: "desktop.create",
							label: e,
							icon: n.kind === "folder" ? "folderPlus" : "filePlus",
							params: n
						});
					}
				}), te)
			}] : [],
			{
				label: F("menu.defaults.label"),
				description: p.isCustom(e) ? F("menu.defaults.custom") : F("menu.defaults.default"),
				control: r(F("common.reset"), F("common.confirm"), () => {
					p.reset(e), n();
				})
			}
		]
	}];
}
// src/settings/services.js
var I = null, ge = null;
function L(e) {
	E.services ? ge ??= E.services.list().then((e) => {
		I = e;
	}, (e) => {
		I = { error: e.message };
	}).finally(() => {
		ge = null, e();
	}) : I = { get error() {
		return F("services.unsupported");
	} };
}
function _e(e) {
	return E.services?.on("change", () => L(e)) ?? null;
}
function ve(e) {
	let t = Math.round((Date.now() - e) / 6e4);
	if (t < 1) return F("services.status.onNow");
	if (t < 60) return F("services.status.onMinutes", { n: t });
	let n = Math.round(t / 60);
	return n < 48 ? F("services.status.onHours", { n }) : F("services.status.onSince", { date: P.date(e) });
}
function ye(e) {
	return e.status === "on" ? ve(e.since) : e.status === "starting" && e.error ? F("services.status.restarting", { error: e.error }) : e.status === "error" ? F("services.status.error", { error: e.error ?? F("services.status.unknownError") }) : e.status === "off" ? F("services.status.off") : e.status === "starting" ? F("services.status.starting") : e.status;
}
var R = async (e, t) => {
	try {
		await e();
	} catch (e) {
		w(e.message, { timeout: 7e3 });
	}
	L(t);
};
function be(e) {
	I || L(e);
	let t = I && !I.error && I.available, n = T({
		value: t ? I.enabled : !1,
		label: F("services.auto.label"),
		onChange: (t) => R(() => E.services.setEnabled(t), e)
	});
	return n.disabled = !t, {
		label: F("services.auto.label"),
		description: I ? I.error ? I.error : I.available ? F("services.auto.description") : F("services.auto.noEngine") : F("common.loading"),
		keywords: F("services.auto.keywords"),
		control: n
	};
}
function xe(e) {
	I || L(e.rerender);
	let t = (e) => [{
		title: F("services.title"),
		rows: [{ label: e }]
	}];
	return I ? I.error ? t(I.error) : I.available ? I.services.length ? [{
		title: F("services.title"),
		content: () => u("div", { class: "su-apps" }, u("p", { class: "su-hint" }, F("services.hint")), u("div", { class: "st-card su-app" }, I.services.flatMap((t) => Se(t, e))))
	}] : t(F("services.none")) : t(F("services.noEngine")) : t(F("common.loading"));
}
function Se(e, t) {
	let { rerender: n } = t, r = `${e.name} · ${e.label}`, i = [
		{
			value: "none",
			label: F("services.startup.none")
		},
		{
			value: "login",
			label: F("services.startup.login")
		},
		...I.admin || e.startup === "system" ? [{
			value: "system",
			label: F("services.startup.system")
		}] : []
	], s = h({
		value: e.startup,
		options: i,
		label: F("services.startup.field", { name: r }),
		onChange: (t) => R(() => E.services.setStartup(e.app, e.entry, t), n)
	});
	s.disabled = e.system && !I.admin;
	let c = e.status === "on" || e.status === "starting", l = u("button", {
		class: "ctl-btn su-clear",
		type: "button",
		title: F("services.restart"),
		"aria-label": F("services.restartOf", { name: r })
	}, d("redo"));
	l.disabled = !e.canControl || !c, l.addEventListener("click", () => R(() => E.services.restart(e.app, e.entry), n));
	let f = a({
		label: F(c ? "services.stop" : "services.start"),
		spinner: !0,
		onClick: () => R(() => E.services[c ? "stop" : "start"](e.app, e.entry), n)
	});
	f.disabled = !e.canControl, f.classList.add("su-power");
	let p = a({
		label: F("services.log.label"),
		onClick: () => we(e, t)
	});
	p.disabled = e.system && !I.admin;
	let m = u("div", { class: "st-row su-service" }, o(e, "su-icon"), u("div", { class: "st-label" }, u("b", {}, r), u("small", {}, u("span", { class: `su-state ${e.status}` }, ye(e)), " · ", u("code", {}, e.entry), e.system && !I.admin ? ` · ${F("services.byAdmin")}` : "")), s, l, f, p);
	return e.params && e.startup !== "none" ? [m, Ce(e, t)] : [m];
}
function Ce(e, { openWindow: t, rerender: n }) {
	let r = e.system && !I.admin, i = { ...e.values }, o = (t, r) => {
		let a = { ...i };
		r === "" || r == null ? delete a[t] : a[t] = r, i = a, R(() => E.services.setStartup(e.app, e.entry, e.startup, a), n);
	}, s = Object.entries(e.params).flatMap(([n, s]) => {
		let c = Object.hasOwn(i, n) ? i[n] : s.default, d = `${s.label} (${e.name} · ${e.label})`, f;
		if (s.type === "boolean") f = T({
			value: c === !0,
			label: d,
			onChange: (e) => o(n, e)
		});
		else if (s.type === "choice") f = h({
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
			let e = C({
				value: c ?? "",
				label: d,
				placeholder: "~/…",
				onChange: (e) => o(n, e.trim())
			}), i = a({
				label: F("common.choose"),
				onClick: async () => {
					let r = await ce(t, {
						kind: s.type,
						title: s.label
					});
					if (!r) return;
					let i = `~${l.path(r.id).slice(l.home.length)}`;
					e.value = i, o(n, i);
				}
			});
			i.disabled = r, f = u("div", { class: "su-path" }, e, i);
		} else f = C({
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
async function we(e, { openWindow: t }) {
	let n;
	try {
		n = await E.services.log(e.app, e.entry);
	} catch (e) {
		return w(e.message, { timeout: 7e3 });
	}
	let r = new i({
		title: F("services.log.title", { name: `${e.name} · ${e.label}` }),
		icon: "list",
		width: 620,
		height: 380
	}), a = (e) => new Date(e).toLocaleTimeString(g.locale);
	r.body.append(u("div", {
		class: "su-log",
		tabindex: "0",
		"aria-label": F("services.log.label")
	}, n.length ? n.map((e) => u("div", { class: `su-line ${e.level}` }, u("span", {}, a(e.at)), ` ${e.text}`)) : u("p", { class: "su-empty" }, F("services.log.empty")))), t(r);
}
// src/settings/startup.js
function Te({ rerender: e }) {
	return [{
		title: F("startup.auto.title"),
		rows: [be(e), {
			label: F("startup.openApps.label"),
			description: F("startup.openApps.description"),
			keywords: F("startup.openApps.keywords"),
			control: T({
				value: _.get("startupApps"),
				label: F("startup.openApps.label"),
				onChange: (e) => _.set("startupApps", e)
			})
		}]
	}, {
		title: F("startup.trouble.title"),
		rows: [{
			label: F("startup.safe.label"),
			description: F("startup.safe.description"),
			keywords: F("startup.safe.keywords"),
			control: M.skipped ? F("startup.safe.active") : ""
		}]
	}];
}
function Ee(e) {
	let t = M.apps().filter((e) => j.some((t) => t.id === e.app));
	return [{
		title: F("startup.apps.title"),
		content: () => u("div", { class: "su-apps" }, u("p", { class: "su-hint" }, F("startup.apps.hint")), t.length ? t.map((t) => De(t, e)) : u("p", { class: "su-empty" }, F("startup.apps.none")), Ae(t, e))
	}];
}
function De(e, t) {
	let n = j.find((t) => t.id === e.app), r = M.windowEntries(n.id), i = new Map(e.entries.map((e) => [e.entry, e.params])), s = r.filter((e) => i.has(e.entry)).length, c = u("div", { class: "st-row su-head" }, o(n, "su-icon"), u("div", { class: "st-label" }, u("b", {}, n.name), u("small", {}, r.length === 1 ? F("startup.apps.oneEntry") : F("startup.apps.entries", {
		on: s,
		n: r.length
	}))), a({
		label: F("startup.apps.remove"),
		onClick: () => {
			M.removeApp(n.id), t.rerender();
		}
	})), l = r.flatMap((e) => {
		let r = i.has(e.entry), a = u("div", { class: "st-row su-entry" }, T({
			value: r,
			label: `${n.name}: ${e.label}`,
			onChange: (r) => {
				try {
					M.setEntry(n.id, e.entry, r);
				} catch (e) {
					w(e.message);
				}
				t.rerender();
			}
		}), u("div", { class: "st-label" }, u("b", {}, e.label), u("small", {}, u("code", {}, e.entry))));
		return r ? [a, Oe(n, e, i.get(e.entry), t)] : [a];
	});
	return u("div", { class: "st-card su-app" }, c, l);
}
function Oe(e, t, n, { openWindow: r }) {
	let i = F("startup.params.of", {
		entry: t.label,
		app: e.name
	});
	if (!t.params) {
		let r = F("startup.params.undescribed"), a = u("span", { class: "su-note" }, r), o = u("textarea", {
			class: "su-json",
			spellcheck: "false",
			placeholder: "{ }",
			"aria-label": F("startup.params.jsonOf", { name: i })
		});
		return o.value = Object.keys(n).length ? JSON.stringify(n) : "", o.addEventListener("change", () => {
			let n = o.value.trim();
			try {
				let i;
				try {
					i = n ? JSON.parse(n) : {};
				} catch {
					throw Error(F("startup.params.invalidJson"));
				}
				M.setParams(e.id, t.entry, i), o.removeAttribute("aria-invalid"), a.classList.remove("bad"), a.textContent = r;
			} catch (e) {
				o.setAttribute("aria-invalid", "true"), a.classList.add("bad"), a.textContent = F("startup.params.notSaved", { error: e.message });
			}
		}), u("div", { class: "su-params" }, u("span", { class: "su-plabel" }, F("startup.params.json")), u("span"), o, a);
	}
	let a = { ...n }, o = (n, r) => {
		let i = { ...a };
		r === "" || r == null ? delete i[n] : i[n] = r;
		try {
			return M.setParams(e.id, t.entry, i), a = i, !0;
		} catch (e) {
			return w(e.message, { timeout: 6e3 }), !1;
		}
	}, s = Object.entries(t.params).flatMap(([e, t]) => {
		let n = Object.hasOwn(a, e) ? a[e] : t.default, s = `${t.label} (${i})`, c;
		if (t.type === "boolean") c = T({
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
			c = h({
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
		})) : t.type === "file" || t.type === "folder" ? c = ke(t, n, s, (t) => o(e, t), r) : (c = C({
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
function ke(e, t, n, r, i) {
	let o = e.type === "folder", s = u("input", {
		class: "ctl-text",
		type: "text",
		readonly: !0,
		placeholder: F(o ? "startup.path.noFolder" : "startup.path.noFile"),
		"aria-label": n
	}), c = (e) => {
		s.value = e ? l.exists(e) ? l.path(e) : F("startup.path.gone") : "";
	};
	c(t);
	let f = a({
		label: F("common.choose"),
		onClick: async () => {
			let t = await ce(i, {
				kind: o ? "folder" : "file",
				title: e.label
			});
			t && r(t.id) && c(t.id);
		}
	}), p = u("button", {
		class: "ctl-btn su-clear",
		type: "button",
		title: F("common.remove"),
		"aria-label": F("startup.path.clear", { name: e.label })
	}, d("x"));
	return p.addEventListener("click", () => {
		r(null) && c(null);
	}), u("div", { class: "su-path" }, s, f, p);
}
function Ae(e, { rerender: t }) {
	let n = a({
		label: F("common.addMore"),
		onClick: () => {
			let r = j.filter((t) => t.load && !e.some((e) => e.app === t.id) && M.windowEntries(t.id).length).sort((e, t) => e.name.localeCompare(t.name));
			if (!r.length) return w(F("startup.apps.allAdded"));
			let i = n.getBoundingClientRect();
			m(i.left, i.bottom + 4, r.map((e) => ({
				label: e.name,
				icon: e.glyph,
				action: () => {
					try {
						M.addApp(e.id);
					} catch (e) {
						w(e.message);
					}
					t();
				}
			})));
		}
	});
	return u("div", { class: "st-row su-add" }, u("span", { class: "su-plus" }, d("plus")), u("div", { class: "st-label" }, u("b", {}, F("startup.apps.add")), u("small", {}, F("startup.apps.addDescription"))), n);
}
// src/settings/pipes.js
var z = ["before", "after"], je = (e) => {
	let t = `pipes.event.${e.name}`, n = F(t);
	return n === t ? e.label : n;
}, Me = (e) => {
	if (!e.owner) return je(e);
	let t = j.find((t) => t.id === e.owner)?.name ?? e.owner;
	return F("pipes.owned", {
		label: je(e),
		app: t
	});
};
function Ne(e) {
	if (!e) return F("pipes.where.all");
	if (typeof e == "string") return F("pipes.where.system");
	let t = [];
	return e.meta === "own" && t.push(F("pipes.where.own")), e.ext && t.push(F("pipes.where.ext", { list: e.ext.map((e) => `.${e}`).join(" ") })), e.type && t.push(F(`pipes.where.type.${e.type}`)), e.app && t.push(F("pipes.where.app", { list: e.app.join(", ") })), t.join(" · ");
}
function Pe(e, t, n, r) {
	let i = e.chain(t.name, n);
	if (!i.length) return [];
	let o = n === "after" ? [...i].reverse() : i, s = (a, o) => {
		let s = i.map((e) => e.key), c = n === "after" ? i.length - 1 - a : a, l = n === "after" ? c - o : c + o;
		[s[c], s[l]] = [s[l], s[c]], e.setOrder(t.name, n, s), r();
	};
	return o.map((e, t) => {
		let r = e.position, i = (e) => !!e?.app && e.position === r, c = !!e.app && i(o[t - 1]), l = !!e.app && i(o[t + 1]), d = e.app ? e.entry && e.entry !== "main" ? `${e.name} · ${e.entry}` : e.name : F("pipes.lilos"), f = a({
			label: F("pipes.up"),
			onClick: () => s(t, -1)
		}), p = a({
			label: F("pipes.down"),
			onClick: () => s(t, 1)
		});
		return f.disabled = !c, p.disabled = !l, {
			label: `${t + 1}. ${d}`,
			description: `${F(`pipes.stage.${n}`)} · ${F(`pipes.band.${r}`)} · ${Ne(e.where)}`,
			keywords: F("pipes.keywords"),
			control: c || l ? u("span", { class: "pipes-move" }, f, p) : null
		};
	});
}
function Fe({ rerender: t }) {
	let n = e.pipes;
	if (!n) return [{
		title: F("pipes.title"),
		rows: [{ label: F("pipes.unsupported") }]
	}];
	let r = n.catalog(), i = r.filter((e) => z.some((t) => n.chain(e.name, t).length)), o = [{
		title: F("pipes.title"),
		rows: [{
			label: F("pipes.intro.label"),
			description: F("pipes.intro.description", { count: r.length }),
			keywords: F("pipes.keywords")
		}]
	}];
	for (let e of i) {
		let r = z.flatMap((r) => Pe(n, e, r, t));
		z.some((t) => n.isCustomOrder(e.name, t)) && r.push({
			label: F("pipes.reset.label"),
			description: F("pipes.reset.description"),
			control: a({
				label: F("common.reset"),
				onClick: () => {
					z.forEach((t) => n.setOrder(e.name, t, null)), t();
				}
			})
		}), o.push({
			title: `${Me(e)} · ${e.name}`,
			rows: r
		});
	}
	let s = r.filter((e) => !i.includes(e));
	return o.push({
		title: F("pipes.idle.title"),
		rows: s.length ? [{
			label: s.map(Me).join(", "),
			description: F("pipes.idle.description", { count: s.length })
		}] : [{ label: F("pipes.idle.none") }]
	}), o;
}
var Ie = (t) => e.pipes?.on("change", t) ?? null, Le = "netfs-onedrive", Re = "onedrive", B = {
	mount: null,
	folder: "/lilOS",
	ifExists: "ask",
	doubleClick: !0
}, ze = "/api/net/signin/callback", V = null, Be = null, H = null, Ve = () => !!e.net?.protocols?.some((e) => e.id === "onedrive"), He = () => f.user?.role === "admin", U = (t) => e.net?.text(t) ?? (typeof t == "string" ? t : "");
function Ue(t) {
	!He() || !e.kernelModules?.settings ? V = {
		fields: [],
		values: {},
		readOnly: !0
	} : Be ??= e.kernelModules.settings(Le).then((e) => {
		V = e;
	}, (e) => {
		V = { error: e.message };
	}).finally(() => {
		Be = null, t();
	});
}
function We() {
	V = null, H = null;
}
function Ge() {
	let e = b.get(Re, {}) ?? {};
	return {
		...B,
		...e && typeof e == "object" && !Array.isArray(e) ? e : {}
	};
}
var W = (e, t) => b.set(Re, {
	...Ge(),
	[e]: t
}), Ke = (e, t) => !e.when || Object.entries(e.when).every(([e, n]) => Array.isArray(n) ? n.includes(t[e]) : t[e] === n);
function qe({ rerender: e }) {
	return V || Ue(e), [
		Je(e),
		Xe(),
		Ze()
	];
}
function Je(t) {
	let n = [];
	if (!V) n.push({ label: F("common.loading") });
	else if (V.error) n.push({
		label: F("onedrive.app.error"),
		description: V.error
	});
	else if (V.readOnly) {
		let t = !e.net.protocols.find((e) => e.id === "onedrive")?.notReady;
		n.push({
			label: F("onedrive.app.status"),
			description: F("onedrive.app.adminOnly"),
			control: F(t ? "onedrive.app.ready" : "onedrive.app.notReady")
		});
	} else {
		let e = { ...V.values };
		for (let t of V.fields) e[t.key] === void 0 && t.default !== void 0 && (e[t.key] = t.default);
		for (let r of V.fields) Ke(r, e) && n.push({
			label: U(r.label),
			description: r.hint ? U(r.hint) : void 0,
			keywords: F("onedrive.keywords"),
			control: () => Ye(r, e, t)
		});
		H && n.push({
			label: H.ok ? F("onedrive.app.saved") : F("onedrive.app.notSaved"),
			description: H.text
		});
	}
	let r = `${location.origin}${ze}`, i = location.protocol === "https:" || [
		"localhost",
		"127.0.0.1",
		"[::1]"
	].includes(location.hostname);
	return n.push({
		label: F("onedrive.redirect.label"),
		description: F(i ? "onedrive.redirect.description" : "onedrive.redirect.unusable"),
		keywords: F("onedrive.keywords"),
		control: () => u("div", { class: "od-redirect" }, u("code", {}, r), a({
			label: F("onedrive.copy"),
			onClick: () => navigator.clipboard?.writeText(r).then(() => w(F("onedrive.copied")), () => {})
		}))
	}), n.push({
		label: F("onedrive.steps.label"),
		keywords: F("onedrive.keywords"),
		control: () => u("ol", { class: "od-steps" }, ...[
			1,
			2,
			3,
			4,
			5,
			6
		].map((e) => u("li", {}, F(`onedrive.steps.${e}`))))
	}), {
		title: F("onedrive.app.title"),
		rows: n
	};
}
function Ye(t, n, r) {
	let i = async (n) => {
		let i = {
			...V.values,
			[t.key]: n
		};
		(n === "" || n === void 0) && delete i[t.key];
		try {
			V = await e.kernelModules.saveSettings(Le, i), H = {
				ok: !0,
				text: t.key === "shared" ? F("onedrive.app.signAgain") : ""
			}, await e.net.load();
		} catch (e) {
			H = {
				ok: !1,
				text: e.message
			};
		}
		r();
	}, a = U(t.label);
	if (t.type === "checkbox") return T({
		value: n[t.key] === !0,
		label: a,
		onChange: i
	});
	if (t.type === "select") return h({
		value: n[t.key],
		label: a,
		options: (t.options ?? []).map((e) => ({
			value: e.value,
			label: U(e.label)
		})),
		onChange: i
	});
	let o = C({
		value: n[t.key] ?? "",
		placeholder: t.placeholder ?? "",
		label: a,
		onChange: (e) => i(e.trim())
	});
	return o.classList.add("od-text"), o;
}
function Xe() {
	let t = Ge(), n = e.net.mounts().filter((e) => e.protocol === "onedrive");
	return {
		title: F("onedrive.upload.title"),
		rows: [
			{
				label: F("onedrive.upload.mount.label"),
				description: n.length ? F("onedrive.upload.mount.description") : F("onedrive.upload.mount.none"),
				keywords: F("onedrive.keywords"),
				control: () => {
					let e = [{
						value: "",
						label: F("onedrive.upload.mount.ask")
					}, ...n.map((e) => ({
						value: e.id,
						label: `${e.name} · ${e.values?.account ?? e.address}`
					}))], r = h({
						value: n.some((e) => e.id === t.mount) ? t.mount : "",
						options: e,
						label: F("onedrive.upload.mount.label"),
						onChange: (e) => W("mount", e || null)
					});
					return r.disabled = !n.length, r;
				}
			},
			{
				label: F("onedrive.upload.folder.label"),
				description: F("onedrive.upload.folder.description"),
				keywords: F("onedrive.keywords"),
				control: () => {
					let e = C({
						value: t.folder,
						placeholder: B.folder,
						label: F("onedrive.upload.folder.label"),
						onChange: (e) => W("folder", Qe(e))
					});
					return e.classList.add("od-text"), e;
				}
			},
			{
				label: F("onedrive.upload.exists.label"),
				description: F("onedrive.upload.exists.description"),
				keywords: F("onedrive.keywords"),
				control: () => h({
					value: t.ifExists,
					label: F("onedrive.upload.exists.label"),
					options: [
						{
							value: "ask",
							label: F("onedrive.upload.exists.ask")
						},
						{
							value: "keep",
							label: F("onedrive.upload.exists.keep")
						},
						{
							value: "replace",
							label: F("onedrive.upload.exists.replace")
						}
					],
					onChange: (e) => W("ifExists", e)
				})
			}
		]
	};
}
function Ze() {
	return {
		title: F("onedrive.office.title"),
		rows: [{
			label: F("onedrive.office.doubleClick.label"),
			description: F("onedrive.office.doubleClick.description"),
			keywords: F("onedrive.keywords"),
			control: () => T({
				value: Ge().doubleClick !== !1,
				label: F("onedrive.office.doubleClick.label"),
				onChange: (e) => W("doubleClick", e)
			})
		}]
	};
}
function Qe(e) {
	let t = String(e ?? "").split(/[/\\]+/).map((e) => e.trim()).filter((e) => e && e !== "." && e !== "..");
	return t.length ? `/${t.join("/")}` : B.folder;
}
// src/settings/cloud.js
var G = {
	gdrive: {
		module: "netfs-gdrive",
		icon: "cloud",
		google: !0
	},
	gphotos: {
		module: "netfs-gphotos",
		icon: "image",
		google: !0
	},
	azblob: {
		module: "netfs-azblob",
		icon: "cloud",
		entra: !0
	},
	nfs: {
		module: "netfs-nfs",
		icon: "disk"
	}
}, $e = "/api/net/signin/callback", et = "http://127.0.0.1:53682/", tt = {
	gdrive: 6,
	gphotos: 6,
	azblob: 5,
	nfs: 4
}, K = /* @__PURE__ */ new Map(), nt = /* @__PURE__ */ new Map(), q = /* @__PURE__ */ new Map(), rt = () => f.user?.role === "admin", J = (t) => e.net?.text(t) ?? (typeof t == "string" ? t : ""), it = (e, t) => !e.when || Object.entries(e.when).every(([e, n]) => Array.isArray(n) ? n.includes(t[e]) : t[e] === n);
function at({ rerender: t }) {
	return Object.entries(G).filter(([t]) => e.net?.protocols?.some((e) => e.id === t)).map(([e, n]) => ({
		id: e,
		icon: n.icon,
		get label() {
			return F(`cloud.${e}.label`);
		},
		get description() {
			return F(`cloud.${e}.description`);
		},
		sections: () => ct(e, t)
	}));
}
function ot(e) {
	K.delete(e), q.delete(e);
}
function st(t, n) {
	!rt() || !e.kernelModules?.settings ? K.set(t, { readOnly: !0 }) : nt.has(t) || nt.set(t, e.kernelModules.settings(G[t].module).then((e) => K.set(t, e), (e) => K.set(t, { error: e.message })).finally(() => {
		nt.delete(t), n();
	}));
}
function ct(e, t) {
	K.has(e) || st(e, t);
	let n = [lt(e, t)];
	return (G[e].google || G[e].entra) && n.push(dt(e)), n.push({
		title: F(`cloud.${e}.steps.title`),
		rows: [{
			label: F(`cloud.${e}.steps.label`),
			control: () => u("ol", { class: "od-steps" }, ...Array.from({ length: tt[e] }, (t, n) => u("li", {}, F(`cloud.${e}.steps.${n + 1}`))))
		}]
	}), n;
}
function lt(t, n) {
	let r = K.get(t), i = [];
	if (!r) i.push({ label: F("common.loading") });
	else if (r.error) i.push({
		label: F("cloud.error"),
		description: r.error
	});
	else if (r.readOnly) {
		let n = !e.net.protocols.find((e) => e.id === t)?.notReady;
		i.push({
			label: F("cloud.status"),
			description: F("cloud.adminOnly"),
			control: F(n ? "cloud.ready" : "cloud.notReady")
		});
	} else {
		let e = { ...r.values };
		for (let t of r.fields) e[t.key] === void 0 && t.default !== void 0 && t.type !== "password" && (e[t.key] = t.default);
		for (let a of r.fields) it(a, e) && i.push({
			label: J(a.label),
			description: a.hint ? J(a.hint) : void 0,
			keywords: F(`cloud.${t}.keywords`),
			control: () => ut(t, a, e, n)
		});
		t === "nfs" && i.push({
			label: F("cloud.nfs.you"),
			description: F("cloud.nfs.you.description"),
			control: () => u("code", {}, f.user?.username ?? "")
		});
		let a = q.get(t);
		a && i.push({
			label: a.ok ? F("cloud.saved") : F("cloud.notSaved"),
			description: a.text
		});
	}
	return {
		title: F(`cloud.${t}.settings`),
		rows: i
	};
}
function ut(t, n, r, i) {
	let o = K.get(t), s = async (r) => {
		let a = Object.fromEntries(Object.entries(o.values).filter(([e]) => o.fields.some((t) => t.key === e && t.type !== "password")));
		n.type === "password" ? a[n.key] = r : r === "" || r === void 0 ? delete a[n.key] : a[n.key] = r;
		try {
			K.set(t, await e.kernelModules.saveSettings(G[t].module, a)), q.set(t, {
				ok: !0,
				text: ""
			}), await e.net.load();
		} catch (e) {
			q.set(t, {
				ok: !1,
				text: e.message
			});
		}
		i();
	}, c = J(n.label);
	if (n.type === "checkbox") return T({
		value: r[n.key] === !0,
		label: c,
		onChange: s
	});
	if (n.type === "select") return h({
		value: r[n.key],
		label: c,
		options: (n.options ?? []).filter((e) => !e.disabled).map((e) => ({
			value: e.value,
			label: J(e.label)
		})),
		onChange: s
	});
	if (n.type === "textarea") {
		let e = u("textarea", {
			class: "ctl-text cloud-area",
			rows: "5",
			spellcheck: "false",
			placeholder: n.placeholder ?? "",
			"aria-label": c
		});
		return e.value = r[n.key] ?? "", e.addEventListener("change", () => s(e.value)), e;
	}
	if (n.type === "password") {
		let e = o.secrets?.includes(n.key), t = u("input", {
			class: "ctl-text od-text",
			type: "password",
			autocomplete: "new-password",
			placeholder: F(e ? "cloud.secret.set" : "cloud.secret.empty"),
			"aria-label": c
		});
		return t.addEventListener("change", () => {
			t.value.trim() && s(t.value.trim());
		}), u("div", { class: "cloud-secret" }, t, e ? a({
			label: F("cloud.secret.remove"),
			danger: !0,
			onClick: () => s(null)
		}) : null);
	}
	let l = C({
		value: r[n.key] ?? "",
		placeholder: n.placeholder ?? "",
		label: c,
		onChange: (e) => s(e.trim())
	});
	return l.classList.add("od-text"), l;
}
function dt(e) {
	let t = (e) => a({
		label: F("cloud.copy"),
		onClick: () => navigator.clipboard?.writeText(e).then(() => w(F("cloud.copied")), () => {})
	}), n = `${location.origin}${$e}`, r = location.protocol === "https:" || [
		"localhost",
		"127.0.0.1",
		"[::1]"
	].includes(location.hostname);
	return {
		title: F("cloud.addresses.title"),
		rows: [{
			label: F("cloud.redirect.label"),
			description: F(r ? `cloud.redirect.${G[e].google ? "google" : "entra"}` : "cloud.redirect.unusable"),
			control: () => u("div", { class: "od-redirect" }, u("code", {}, n), t(n))
		}, {
			label: F("cloud.byHand.label"),
			description: F(`cloud.byHand.${G[e].google ? "google" : "entra"}`),
			control: () => u("div", { class: "od-redirect" }, u("code", {}, et), t(et))
		}]
	};
}
var ft = {
	libraries: [
		{
			kind: "library",
			name: "@noble/ciphers",
			version: "1.3.0",
			license: "MIT",
			copyright: "Copyright (c) 2022 Paul Miller (https://paulmillr.com)",
			url: "https://paulmillr.com/noble/",
			usedBy: ["filecrypt"]
		},
		{
			kind: "library",
			name: "@shikijs/core",
			version: "4.5.0",
			license: "MIT",
			copyright: "Copyright (c) 2021 Pine Wu",
			url: "https://github.com/shikijs/shiki",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "@shikijs/engine-javascript",
			version: "4.5.0",
			license: "MIT",
			copyright: "Copyright (c) 2021 Pine Wu",
			url: "https://github.com/shikijs/shiki",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "@shikijs/langs",
			version: "4.5.0",
			license: "MIT",
			copyright: "Copyright (c) 2021 Pine Wu",
			url: "https://github.com/shikijs/shiki",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "@shikijs/primitive",
			version: "4.5.0",
			license: "MIT",
			copyright: "Copyright (c) 2021 Pine Wu",
			url: "https://github.com/shikijs/shiki",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "@shikijs/themes",
			version: "4.5.0",
			license: "MIT",
			copyright: "Copyright (c) 2021 Pine Wu",
			url: "https://github.com/shikijs/shiki",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "@shikijs/types",
			version: "4.5.0",
			license: "MIT",
			copyright: "Copyright (c) 2021 Pine Wu",
			url: "https://github.com/shikijs/shiki",
			usedBy: ["editor"],
			via: [
				"@shikijs/core",
				"@shikijs/engine-javascript",
				"@shikijs/langs",
				"@shikijs/themes"
			]
		},
		{
			kind: "library",
			name: "@shikijs/vscode-textmate",
			version: "10.1.0",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation",
			url: "https://github.com/shikijs/vscode-textmate",
			usedBy: ["editor"],
			via: [
				"@shikijs/core",
				"@shikijs/engine-javascript",
				"@shikijs/langs",
				"@shikijs/themes"
			]
		},
		{
			kind: "library",
			name: "@ungap/structured-clone",
			version: "1.4.0",
			license: "ISC",
			copyright: "Copyright (c) 2021, Andrea Giammarchi, @WebReflection",
			url: "https://github.com/ungap/structured-clone",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "@vscode/l10n",
			version: "0.0.18",
			license: "MIT",
			copyright: "© Microsoft Corporation",
			url: "https://github.com/Microsoft/vscode-l10n",
			usedBy: ["editor"],
			via: [
				"vscode-css-languageservice",
				"vscode-html-languageservice",
				"vscode-json-languageservice"
			]
		},
		{
			kind: "library",
			name: "@xterm/addon-fit",
			version: "0.11.0",
			license: "MIT",
			copyright: "Copyright (c) 2019, The xterm.js authors (https://github.com/xtermjs/xterm.js)",
			url: "https://github.com/xtermjs/xterm.js/tree/master/addons/addon-fit",
			usedBy: ["terminal"]
		},
		{
			kind: "library",
			name: "@xterm/addon-search",
			version: "0.16.0",
			license: "MIT",
			copyright: "Copyright (c) 2017, The xterm.js authors (https://github.com/xtermjs/xterm.js)",
			url: "https://github.com/xtermjs/xterm.js/tree/master/addons/addon-search",
			usedBy: ["terminal"]
		},
		{
			kind: "library",
			name: "@xterm/addon-unicode11",
			version: "0.9.0",
			license: "MIT",
			copyright: "Copyright (c) 2019, The xterm.js authors (https://github.com/xtermjs/xterm.js)",
			url: "https://github.com/xtermjs/xterm.js/tree/master/addons/addon-unicode11",
			usedBy: ["terminal"]
		},
		{
			kind: "library",
			name: "@xterm/xterm",
			version: "6.0.0",
			license: "MIT",
			copyright: "Copyright (c) 2017-2019, The xterm.js authors (https://github.com/xtermjs/xterm.js)",
			url: "https://github.com/xtermjs/xterm.js",
			usedBy: ["terminal"]
		},
		{
			kind: "library",
			name: "asn1",
			version: "0.2.6",
			license: "MIT",
			copyright: "Copyright (c) 2011 Mark Cavage, All rights reserved.",
			url: "https://github.com/joyent/node-asn1",
			usedBy: ["module:netfs-sftp", "module:term-ssh"],
			via: ["ssh2"]
		},
		{
			kind: "library",
			name: "basic-ftp",
			version: "6.2.3",
			license: "MIT",
			copyright: "Copyright (c) 2019 Patrick Juchli",
			url: "https://github.com/patrickjuchli/basic-ftp",
			usedBy: ["module:netfs-ftp"]
		},
		{
			kind: "library",
			name: "bcrypt-pbkdf",
			version: "1.0.2",
			license: "BSD-3-Clause",
			copyright: "Copyright 1997 Niels Provos <provos@physnet.uni-hamburg.de>",
			url: "https://github.com/joyent/node-bcrypt-pbkdf",
			usedBy: ["module:netfs-sftp", "module:term-ssh"],
			via: ["ssh2"]
		},
		{
			kind: "library",
			name: "buildcheck",
			version: "0.0.7",
			license: "MIT",
			copyright: "Copyright Brian White. All rights reserved.",
			url: "https://github.com/mscdex/buildcheck",
			usedBy: ["module:netfs-sftp", "module:term-ssh"],
			via: ["ssh2"],
			optional: !0
		},
		{
			kind: "library",
			name: "ccount",
			version: "2.0.1",
			license: "MIT",
			copyright: "Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/wooorm/ccount",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "character-entities-html4",
			version: "2.1.0",
			license: "MIT",
			copyright: "Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/wooorm/character-entities-html4",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "character-entities-legacy",
			version: "3.0.0",
			license: "MIT",
			copyright: "Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/wooorm/character-entities-legacy",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "comma-separated-tokens",
			version: "2.0.3",
			license: "MIT",
			copyright: "Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/wooorm/comma-separated-tokens",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "cpu-features",
			version: "0.0.10",
			license: "MIT",
			copyright: "Copyright Brian White. All rights reserved.",
			url: "https://github.com/mscdex/cpu-features",
			usedBy: ["module:netfs-sftp", "module:term-ssh"],
			via: ["ssh2"],
			optional: !0
		},
		{
			kind: "library",
			name: "dequal",
			version: "2.0.3",
			license: "MIT",
			copyright: "Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)",
			url: "https://github.com/lukeed/dequal",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "devlop",
			version: "1.1.0",
			license: "MIT",
			copyright: "Copyright (c) 2023 Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/wooorm/devlop",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "fflate",
			version: "0.8.2",
			license: "MIT",
			copyright: "Copyright (c) 2023 Arjun Barrett",
			url: "https://101arrowz.github.io/fflate",
			usedBy: ["zip"]
		},
		{
			kind: "library",
			name: "hast-util-to-html",
			version: "9.0.6",
			license: "MIT",
			copyright: "Copyright (c) Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/syntax-tree/hast-util-to-html",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "hast-util-whitespace",
			version: "3.0.0",
			license: "MIT",
			copyright: "Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/syntax-tree/hast-util-whitespace",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "html-void-elements",
			version: "3.0.0",
			license: "MIT",
			copyright: "Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/wooorm/html-void-elements",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "isolated-vm",
			version: "6.2.0",
			license: "ISC",
			copyright: "Copyright 2017 Marcel Laverdet",
			url: "https://github.com/laverdet/isolated-vm",
			usedBy: ["module:services-isolate"]
		},
		{
			kind: "library",
			name: "jsonc-parser",
			version: "3.3.1",
			license: "MIT",
			copyright: "Copyright (c) Microsoft",
			url: "https://github.com/microsoft/node-jsonc-parser",
			usedBy: ["editor"],
			via: ["vscode-json-languageservice"]
		},
		{
			kind: "library",
			name: "mdast-util-to-hast",
			version: "13.2.1",
			license: "MIT",
			copyright: "Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/syntax-tree/mdast-util-to-hast",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "micromark-util-character",
			version: "2.1.1",
			license: "MIT",
			copyright: "Copyright (c) Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/micromark/micromark/tree/main/packages/micromark-util-character",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "micromark-util-encode",
			version: "2.0.1",
			license: "MIT",
			copyright: "Copyright (c) Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/micromark/micromark/tree/main/packages/micromark-util-encode",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "micromark-util-sanitize-uri",
			version: "2.0.1",
			license: "MIT",
			copyright: "Copyright (c) Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/micromark/micromark/tree/main/packages/micromark-util-sanitize-uri",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "micromark-util-symbol",
			version: "2.0.1",
			license: "MIT",
			copyright: "Copyright (c) Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/micromark/micromark/tree/main/packages/micromark-util-symbol",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "micromark-util-types",
			version: "2.0.3",
			license: "MIT",
			copyright: "Copyright (c) Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/micromark/micromark/tree/main/packages/micromark-util-types",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "nan",
			version: "2.30.0",
			license: "MIT",
			copyright: "Copyright (c) 2018 [NAN contributors](<https://github.com/nodejs/nan#wg-members--collaborators>)",
			url: "https://github.com/nodejs/nan",
			usedBy: ["module:netfs-sftp", "module:term-ssh"],
			via: ["ssh2"],
			optional: !0
		},
		{
			kind: "library",
			name: "node-gyp-build",
			version: "4.8.4",
			license: "MIT",
			copyright: "Copyright (c) 2017 Mathias Buus",
			url: "https://github.com/prebuild/node-gyp-build",
			usedBy: ["module:services-isolate"],
			via: ["isolated-vm"]
		},
		{
			kind: "library",
			name: "oniguruma-parser",
			version: "0.12.2",
			license: "MIT",
			copyright: "Copyright (c) 2025-2026 Steven Levithan",
			url: "https://github.com/slevithan/oniguruma-parser",
			usedBy: ["editor"],
			via: ["@shikijs/engine-javascript"]
		},
		{
			kind: "library",
			name: "oniguruma-to-es",
			version: "4.3.6",
			license: "MIT",
			copyright: "Copyright (c) 2024-2026 Steven Levithan",
			url: "https://github.com/slevithan/oniguruma-to-es",
			usedBy: ["editor"],
			via: ["@shikijs/engine-javascript"]
		},
		{
			kind: "library",
			name: "pg",
			version: "8.23.1",
			license: "MIT",
			copyright: "Copyright (c) 2010 - 2021 Brian Carlson",
			url: "https://github.com/brianc/node-postgres",
			usedBy: ["module:fs-postgres"]
		},
		{
			kind: "library",
			name: "pg-cloudflare",
			version: "1.4.1",
			license: "MIT",
			copyright: "Copyright (c) 2010 - 2021 Brian Carlson",
			url: "https://github.com/brianc/node-postgres",
			usedBy: ["module:fs-postgres"],
			via: ["pg"],
			optional: !0
		},
		{
			kind: "library",
			name: "pg-connection-string",
			version: "2.14.1",
			license: "MIT",
			copyright: "Copyright (c) 2014 Iced Development",
			url: "https://github.com/brianc/node-postgres/tree/master/packages/pg-connection-string",
			usedBy: ["module:fs-postgres"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "pg-int8",
			version: "1.0.1",
			license: "ISC",
			copyright: "Copyright © 2017, Charmander <~@charmander.me>",
			url: "https://github.com/charmander/pg-int8",
			usedBy: ["module:fs-postgres"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "pg-pool",
			version: "3.14.0",
			license: "MIT",
			copyright: "Copyright (c) 2017 Brian M. Carlson",
			url: "https://github.com/brianc/node-postgres/tree/master/packages/pg-pool",
			usedBy: ["module:fs-postgres"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "pg-protocol",
			version: "1.16.1",
			license: "MIT",
			copyright: "Copyright (c) 2010 - 2021 Brian Carlson",
			url: "https://github.com/brianc/node-postgres",
			usedBy: ["module:fs-postgres"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "pg-types",
			version: "2.2.0",
			license: "MIT",
			copyright: "© Brian M. Carlson",
			url: "https://github.com/brianc/node-pg-types",
			usedBy: ["module:fs-postgres"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "pgpass",
			version: "1.0.5",
			license: "MIT",
			copyright: "© Hannes Hörl",
			url: "https://github.com/hoegaarden/pgpass",
			usedBy: ["module:fs-postgres"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "postgres-array",
			version: "2.0.0",
			license: "MIT",
			copyright: "Copyright (c) Ben Drucker <bvdrucker@gmail.com> (bendrucker.me)",
			url: "https://github.com/bendrucker/postgres-array",
			usedBy: ["module:fs-postgres"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "postgres-bytea",
			version: "1.0.1",
			license: "MIT",
			copyright: "Copyright (c) Ben Drucker <bvdrucker@gmail.com> (bendrucker.me)",
			url: "https://github.com/bendrucker/postgres-bytea",
			usedBy: ["module:fs-postgres"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "postgres-date",
			version: "1.0.7",
			license: "MIT",
			copyright: "Copyright (c) Ben Drucker <bvdrucker@gmail.com> (bendrucker.me)",
			url: "https://github.com/bendrucker/postgres-date",
			usedBy: ["module:fs-postgres"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "postgres-interval",
			version: "1.2.0",
			license: "MIT",
			copyright: "Copyright (c) Ben Drucker <bvdrucker@gmail.com> (bendrucker.me)",
			url: "https://github.com/bendrucker/postgres-interval",
			usedBy: ["module:fs-postgres"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "property-information",
			version: "7.2.0",
			license: "MIT",
			copyright: "Copyright (c) Titus Wormer <mailto:tituswormer@gmail.com>",
			url: "https://github.com/wooorm/property-information",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "regex",
			version: "6.1.0",
			license: "MIT",
			copyright: "Copyright (c) 2025 Steven Levithan",
			url: "https://github.com/slevithan/regex",
			usedBy: ["editor"],
			via: ["@shikijs/engine-javascript"]
		},
		{
			kind: "library",
			name: "regex-recursion",
			version: "6.0.2",
			license: "MIT",
			copyright: "Copyright (c) 2025 Steven Levithan",
			url: "https://github.com/slevithan/regex-recursion",
			usedBy: ["editor"],
			via: ["@shikijs/engine-javascript"]
		},
		{
			kind: "library",
			name: "regex-utilities",
			version: "2.3.0",
			license: "MIT",
			copyright: "Copyright (c) 2024 Steven Levithan",
			url: "https://github.com/slevithan/regex-utilities",
			usedBy: ["editor"],
			via: ["@shikijs/engine-javascript"]
		},
		{
			kind: "library",
			name: "safer-buffer",
			version: "2.1.2",
			license: "MIT",
			copyright: "Copyright (c) 2018 Nikita Skovoroda <chalkerx@gmail.com>",
			url: "https://github.com/ChALkeR/safer-buffer",
			usedBy: ["module:netfs-sftp", "module:term-ssh"],
			via: ["ssh2"]
		},
		{
			kind: "library",
			name: "smb3-client",
			version: "0.2.0",
			license: "MIT",
			copyright: "Copyright (c) 2026 Eurico Jardim",
			url: "https://github.com/euricojardim/smb3-client",
			usedBy: ["module:netfs-smb"]
		},
		{
			kind: "library",
			name: "space-separated-tokens",
			version: "2.0.2",
			license: "MIT",
			copyright: "Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/wooorm/space-separated-tokens",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "split2",
			version: "4.2.0",
			license: "ISC",
			copyright: "Copyright (c) 2014-2018, Matteo Collina <hello@matteocollina.com>",
			url: "https://github.com/mcollina/split2",
			usedBy: ["module:fs-postgres"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "ssh2",
			version: "1.17.0",
			license: "MIT",
			copyright: "Copyright Brian White. All rights reserved.",
			url: "https://github.com/mscdex/ssh2",
			usedBy: ["module:netfs-sftp", "module:term-ssh"]
		},
		{
			kind: "library",
			name: "stringify-entities",
			version: "4.0.4",
			license: "MIT",
			copyright: "Copyright (c) 2015 Titus Wormer <mailto:tituswormer@gmail.com>",
			url: "https://github.com/wooorm/stringify-entities",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "tree-sitter-bash",
			version: "0.25.1",
			license: "MIT",
			copyright: "Copyright (c) 2017 Max Brunsfeld",
			url: "https://github.com/tree-sitter/tree-sitter-bash",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "tree-sitter-css",
			version: "0.25.0",
			license: "MIT",
			copyright: "Copyright (c) 2018 Max Brunsfeld",
			url: "https://github.com/tree-sitter/tree-sitter-css",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "tree-sitter-html",
			version: "0.23.2",
			license: "MIT",
			copyright: "Copyright (c) 2014 Max Brunsfeld",
			url: "https://github.com/tree-sitter/tree-sitter-html",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "tree-sitter-javascript",
			version: "0.25.0",
			license: "MIT",
			copyright: "Copyright (c) 2014 Max Brunsfeld",
			url: "https://github.com/tree-sitter/tree-sitter-javascript",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "tree-sitter-json",
			version: "0.24.8",
			license: "MIT",
			copyright: "Copyright (c) 2014 Max Brunsfeld",
			url: "https://github.com/tree-sitter/tree-sitter-json",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "tree-sitter-python",
			version: "0.25.0",
			license: "MIT",
			copyright: "Copyright (c) 2016 Max Brunsfeld",
			url: "https://github.com/tree-sitter/tree-sitter-python",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "trim-lines",
			version: "3.0.1",
			license: "MIT",
			copyright: "Copyright (c) 2015 Titus Wormer <mailto:tituswormer@gmail.com>",
			url: "https://github.com/wooorm/trim-lines",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "tweetnacl",
			version: "0.14.5",
			license: "Unlicense",
			copyright: "© TweetNaCl-js contributors",
			url: "https://tweetnacl.js.org",
			usedBy: ["module:netfs-sftp", "module:term-ssh"],
			via: ["ssh2"]
		},
		{
			kind: "library",
			name: "unist-util-is",
			version: "6.0.1",
			license: "MIT",
			copyright: "Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/syntax-tree/unist-util-is",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "unist-util-position",
			version: "5.0.0",
			license: "MIT",
			copyright: "Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/syntax-tree/unist-util-position",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "unist-util-stringify-position",
			version: "4.0.0",
			license: "MIT",
			copyright: "Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/syntax-tree/unist-util-stringify-position",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "unist-util-visit",
			version: "5.2.0",
			license: "MIT",
			copyright: "Copyright (c) Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/syntax-tree/unist-util-visit",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "unist-util-visit-parents",
			version: "6.1.0",
			license: "MIT",
			copyright: "Copyright (c) Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/syntax-tree/unist-util-visit-parents",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "vfile",
			version: "6.0.3",
			license: "MIT",
			copyright: "Copyright (c) 2015 Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/vfile/vfile",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "vfile-message",
			version: "4.0.3",
			license: "MIT",
			copyright: "Copyright (c) Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/vfile/vfile-message",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "library",
			name: "vscode-css-languageservice",
			version: "6.3.10",
			license: "MIT",
			copyright: "Copyright (c) Microsoft",
			url: "https://github.com/Microsoft/vscode-css-languageservice",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "vscode-html-languageservice",
			version: "5.6.2",
			license: "MIT",
			copyright: "Copyright (c) Microsoft",
			url: "https://github.com/Microsoft/vscode-html-languageservice",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "vscode-json-languageservice",
			version: "5.7.2",
			license: "MIT",
			copyright: "Copyright (c) Microsoft",
			url: "https://github.com/Microsoft/vscode-json-languageservice",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "vscode-languageserver-textdocument",
			version: "1.0.15",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation",
			url: "https://github.com/Microsoft/vscode-languageserver-node",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "vscode-languageserver-types",
			version: "3.17.5",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation",
			url: "https://github.com/Microsoft/vscode-languageserver-node",
			usedBy: ["editor"],
			via: [
				"vscode-css-languageservice",
				"vscode-html-languageservice",
				"vscode-json-languageservice"
			]
		},
		{
			kind: "library",
			name: "vscode-uri",
			version: "3.2.0",
			license: "MIT",
			copyright: "Copyright (c) Microsoft",
			url: "https://github.com/microsoft/vscode-uri",
			usedBy: ["editor"],
			via: [
				"vscode-css-languageservice",
				"vscode-html-languageservice",
				"vscode-json-languageservice"
			]
		},
		{
			kind: "library",
			name: "web-tree-sitter",
			version: "0.27.1",
			license: "MIT",
			copyright: "Copyright (c) 2018 Max Brunsfeld",
			url: "https://github.com/tree-sitter/tree-sitter",
			usedBy: ["editor"]
		},
		{
			kind: "library",
			name: "xtend",
			version: "4.0.2",
			license: "MIT",
			copyright: "Copyright (c) 2012-2014 Raynos.",
			url: "https://github.com/Raynos/xtend",
			usedBy: ["module:fs-postgres"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "zwitch",
			version: "2.0.4",
			license: "MIT",
			copyright: "Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com>",
			url: "https://github.com/wooorm/zwitch",
			usedBy: ["editor"],
			via: ["@shikijs/core"]
		},
		{
			kind: "font",
			name: "JetBrains Mono",
			version: "",
			license: "OFL-1.1",
			copyright: "Copyright 2020 The JetBrains Mono Project Authors",
			url: "https://github.com/JetBrains/JetBrainsMono",
			usedBy: ["lilos"]
		},
		{
			kind: "font",
			name: "Manrope",
			version: "",
			license: "OFL-1.1",
			copyright: "Copyright 2018 The Manrope Project Authors",
			url: "https://github.com/sharanda/manrope",
			usedBy: ["lilos"]
		},
		{
			kind: "tool",
			name: "vite",
			version: "8.3.5",
			license: "MIT",
			copyright: "Copyright (c) 2019-present, VoidZero Inc. and Vite contributors",
			url: "https://vite.dev",
			usedBy: []
		}
	],
	names: {
		filecrypt: {
			en: "FileCrypt",
			it: "FileCrypt"
		},
		editor: {
			en: "Editor",
			it: "Editor"
		},
		terminal: {
			en: "Terminal",
			it: "Terminale"
		},
		zip: {
			en: "Zip",
			it: "Zip"
		}
	}
};
// src/settings/credits.js
function pt(e) {
	if (e === "lilos") return "lilOS";
	if (e.startsWith("module:")) return F("credits.module", { name: e.slice(7) });
	let t = ft.names[e];
	return t?.[P.lang] ?? t?.en ?? e;
}
function Y(e) {
	let t = e.usedBy.map(pt).join(", "), n = e.kind === "tool" ? F("credits.builds") : e.kind === "font" ? F("credits.fontUsedBy", { users: t }) : e.via ? F("credits.via", {
		libraries: e.via.join(", "),
		users: t
	}) : F("credits.usedBy", { users: t });
	return {
		label: e.version ? `${e.name} ${e.version}` : e.name,
		description: [
			e.license,
			e.copyright,
			n,
			e.optional && F("credits.optional")
		].filter(Boolean).join(" · "),
		keywords: `${F("credits.keywords")} ${e.license} ${t}`,
		control: () => u("a", {
			class: "credits-link",
			href: e.url,
			target: "_blank",
			rel: "noopener noreferrer",
			title: e.url,
			"aria-label": F("credits.siteOf", { name: e.name })
		}, F("credits.site"))
	};
}
function mt() {
	let e = (e) => ft.libraries.filter((t) => t.kind === e), t = e("library").filter((e) => !e.via), n = e("library").filter((e) => e.via);
	return [
		{
			title: F("credits.libraries"),
			rows: t.map(Y)
		},
		{
			title: F("credits.indirect"),
			rows: n.map(Y)
		},
		{
			title: F("credits.fonts"),
			rows: e("font").map(Y)
		},
		{
			title: F("credits.tools"),
			rows: e("tool").map(Y)
		}
	].filter((e) => e.rows.length);
}
// src/settings/SettingsApp.js
var X = null;
function ht(e) {
	let t = N(), n = t?.list().find((t) => t.id === e);
	return n ? [
		{
			title: F("workspaces.current.title"),
			rows: [
				{
					label: F("common.name"),
					keywords: F("workspaces.name.keywords"),
					control: () => {
						let e = C({
							value: n.name,
							label: F("workspaces.name.field"),
							onChange: (e) => t.rename(n.id, e)
						});
						return e.maxLength = A.MAX_NAME, e;
					}
				},
				t.setDescription && {
					label: F("workspaces.description.label"),
					description: F("workspaces.description.description"),
					keywords: F("workspaces.description.keywords"),
					control: () => {
						let e = C({
							value: n.description ?? "",
							placeholder: F("workspaces.description.placeholder"),
							label: F("workspaces.description.field"),
							onChange: (e) => t.setDescription(n.id, e)
						});
						return e.maxLength = A.MAX_DESCRIPTION ?? 200, e;
					}
				},
				{
					label: F("common.color"),
					description: F("workspaces.color.description"),
					keywords: F("workspaces.color.keywords"),
					control: () => x({
						value: n.color,
						colors: D,
						onChange: (e) => t.setColor(n.id, e)
					})
				},
				{
					label: F("workspaces.owned.label"),
					description: F("workspaces.owned.description"),
					control: String(t.ownedCount(n.id))
				},
				e !== t.currentId && {
					label: F("workspaces.switch.label"),
					keywords: F("workspaces.list.keywords"),
					control: () => a({
						label: F("workspaces.list.switch"),
						onClick: () => t.switchTo(e)
					})
				}
			].filter(Boolean)
		},
		{
			title: F("workspaces.apps.title"),
			rows: j.map((r) => ({
				label: r.name,
				description: r.system ? F("workspaces.apps.system") : F("workspaces.apps.installed"),
				keywords: F("workspaces.apps.keywords", { name: r.name }),
				control: r.system ? F("workspaces.apps.alwaysVisible") : () => T({
					value: t.isInstalled(r.id, e),
					label: e === t.currentId ? F("workspaces.apps.toggle", { name: r.name }) : F("workspaces.apps.toggleIn", {
						name: r.name,
						workspace: n.name
					}),
					onChange: (n) => t.setInstalled(r.id, n, e)
				})
			}))
		},
		...Et(e)
	] : [];
}
var gt = {
	id: "current",
	get label() {
		return F("workspaces.current.label");
	},
	sections: () => ht(N()?.currentId)
}, _t = {
	id: "all",
	get label() {
		return F("workspaces.all.label");
	},
	sections: bt
}, vt = /* @__PURE__ */ new Map();
function yt() {
	let e = N();
	return [
		gt,
		...(e?.list() ?? []).filter((t) => t.id !== e.currentId).map((e) => (vt.has(e.id) || vt.set(e.id, {
			id: `ws-${e.id}`,
			get label() {
				return N()?.describe(e.id)?.name ?? "";
			},
			sections: () => ht(e.id)
		}), vt.get(e.id))),
		_t
	];
}
function bt() {
	let e = N();
	if (!e) return [];
	let t = e.list();
	return [
		{
			title: F("workspaces.label"),
			rows: [...t.map((n) => {
				let r = n.id === e.currentId, i = j.filter((t) => e.isInstalled(t.id, n.id)).length;
				return {
					label: r ? F("workspaces.list.current", { name: n.name }) : n.name,
					description: `${F("workspaces.list.owned", { n: e.ownedCount(n.id) })} · ${F("workspaces.list.apps", { n: i })}`,
					keywords: F("workspaces.list.keywords"),
					control: () => u("div", { class: "ws-settings-actions" }, r ? null : a({
						label: F("workspaces.list.switch"),
						onClick: () => e.switchTo(n.id)
					}), t.length > 1 ? $(F("common.delete"), F("common.deleteNow"), () => e.remove(n.id)) : null)
				};
			}), {
				label: F("workspaces.new.label"),
				description: F("workspaces.new.description"),
				control: a({
					label: F("common.create"),
					onClick: () => {
						let t = e.create();
						t && e.switchTo(t);
					}
				})
			}]
		},
		...Dt(),
		{
			title: F("workspaces.deleting.title"),
			rows: [{
				label: F("workspaces.deleting.files.label"),
				description: F("workspaces.deleting.files.description")
			}, {
				label: F("workspaces.deleting.windows.label"),
				description: F("workspaces.deleting.windows.description")
			}]
		}
	];
}
var Z = [];
function xt() {
	let e = (e) => {
		try {
			let t = S.create({ name: e.value });
			Z.length && de(Z, t.id, !0), Z = [];
		} catch (t) {
			w(t.message), e.focus();
		}
	}, t = Z.filter((e) => l.exists(e)).length;
	return [{
		title: F("tags.new.title"),
		rows: [{
			label: F("common.name"),
			description: t ? F("tags.new.pending", { n: t }) : F("tags.new.description"),
			keywords: F("tags.new.keywords"),
			control: () => {
				let t = C({
					placeholder: F("tags.new.placeholder"),
					label: F("tags.new.field")
				});
				return t.maxLength = 30, t.classList.add("tag-new-name"), t.addEventListener("keydown", (n) => {
					n.key === "Enter" && (n.preventDefault(), e(t));
				}), u("div", { class: "tag-settings-actions" }, t, a({
					label: F("common.create"),
					primary: !0,
					onClick: () => e(t)
				}));
			}
		}]
	}, ...S.list().map((e) => ({
		title: e.name,
		rows: [
			{
				label: F("common.name"),
				keywords: F("tags.name.keywords"),
				control: () => {
					let t = C({
						value: e.name,
						label: F("tags.name.field", { name: e.name }),
						onChange: (n) => {
							try {
								S.rename(e.id, n);
							} catch (n) {
								w(n.message), t.value = S.get(e.id)?.name ?? "";
							}
						}
					});
					return t.maxLength = 30, t;
				}
			},
			{
				label: F("common.color"),
				keywords: F("tags.color.keywords"),
				control: () => x({
					value: e.color,
					colors: r,
					onChange: (t) => S.setColor(e.id, t)
				})
			},
			{
				label: F("tags.visible.label"),
				description: e.visible ? F("tags.visible.on") : F("tags.visible.off"),
				keywords: F("tags.visible.keywords"),
				control: () => T({
					value: e.visible,
					label: F("tags.visible.toggle", { name: e.name }),
					onChange: (t) => S.setVisible(e.id, t)
				})
			},
			{
				label: F("common.items"),
				description: F("tags.items.description", { n: l.tagged(e.id).length }),
				control: () => u("div", { class: "tag-settings-actions" }, a({
					label: F("tags.items.show"),
					onClick: () => se("files", { tag: e.id })
				}), $(F("common.delete"), F("tags.items.delete"), () => S.remove(e.id)))
			}
		]
	}))];
}
var St = [
	"home",
	"documents",
	"images",
	"files",
	"downloads",
	"trash"
];
function Ct(e) {
	return St.includes(e.key) ? {
		...e,
		name: F(`desk.fixed.item.${e.key}.name`),
		description: F(`desk.fixed.item.${e.key}.description`)
	} : e;
}
function wt(e, t) {
	let n = (E.DESK_FIXED_ITEMS ?? []).map(Ct);
	return n.length ? [{
		title: F("desk.fixed.title"),
		rows: [{
			label: F("desk.fixed.label"),
			description: e
		}, ...n.map((e) => ({
			label: e.name,
			description: e.description,
			keywords: F("desk.fixed.keywords", { name: e.name }),
			...t(e)
		}))]
	}] : [];
}
var Tt = () => typeof E.setFixedShownEverywhere == "function";
function Et(e) {
	if (!Tt()) return [];
	let t = N(), n = (n) => e === t?.currentId ? F("desk.fixed.toggle", { name: n }) : F("desk.fixed.toggleIn", {
		name: n,
		workspace: t?.describe(e)?.name ?? ""
	});
	return wt(F("desk.fixed.descriptionWorkspace"), (t) => ({ control: () => T({
		value: E.isFixedShown(t.key, e),
		label: n(t.name),
		onChange: (n) => E.setFixedShown(t.key, n, e)
	}) }));
}
function Dt() {
	let e = N();
	if (Tt() && e) {
		let t = e.list();
		return wt(F("desk.fixed.descriptionAll"), (e) => {
			let n = t.filter((t) => E.isFixedShown(e.key, t.id)).length;
			return {
				description: n && n < t.length ? F("desk.fixed.some", {
					on: n,
					n: t.length
				}) : e.description,
				control: () => T({
					value: n === t.length,
					label: F("desk.fixed.toggleAll", { name: e.name }),
					onChange: (t) => E.setFixedShownEverywhere(e.key, t)
				})
			};
		});
	}
	let t = typeof E.setFixedShown == "function";
	return wt(F(t ? "desk.fixed.descriptionSwitchable" : "desk.fixed.description"), (e) => ({ control: t ? () => T({
		value: E.isFixedShown(e.key),
		label: F("desk.fixed.toggle", { name: e.name }),
		onChange: (t) => E.setFixedShown(e.key, t)
	}) : F("desk.fixed.always") }));
}
function Ot() {
	return (E.DESK_FIXED_ITEMS ?? []).length ? [{
		title: F("desk.fixed.title"),
		rows: [{
			label: F("desk.fixed.moved.label"),
			description: F("desk.fixed.moved.description"),
			keywords: F("desk.fixed.moved.keywords"),
			control: () => a({
				label: F("desk.fixed.moved.open"),
				onClick: () => X?.select("workspaces", "current")
			})
		}]
	}] : [];
}
function kt(e, t) {
	let n = u("input", {
		class: "desk-color-field",
		type: "color",
		"aria-label": F("desk.background.custom.label")
	});
	return n.value = /^#[0-9a-f]{6}$/i.test(e) ? e : "#1f2227", n.addEventListener("change", () => t(n.value)), n;
}
function At(e) {
	let t = _.get("deskColor"), n = E.wallpaperInfo(), r = async () => {
		let t = await E.pickFile(e, {
			title: F("desk.background.image.pick"),
			exts: E.WALLPAPER_EXTS
		});
		t && await E.setWallpaper(t.id);
	};
	return [{
		title: F("desk.background.color.title"),
		rows: [
			{
				label: F("common.color"),
				description: F("desk.background.color.description"),
				keywords: F("desk.background.color.keywords"),
				control: () => {
					let e = x({
						value: t,
						colors: E.DESK_COLORS,
						onChange: (e) => _.set("deskColor", e)
					});
					return e.classList.add("desk-color-swatches"), e;
				}
			},
			{
				label: F("desk.background.custom.label"),
				description: F("desk.background.custom.description"),
				keywords: F("desk.background.color.keywords"),
				control: () => kt(t, (e) => _.set("deskColor", e))
			},
			t && {
				label: F("desk.background.theme.label"),
				description: F("desk.background.theme.description"),
				control: () => a({
					label: F("desk.background.theme.button"),
					onClick: () => _.set("deskColor", "")
				})
			}
		].filter(Boolean)
	}, {
		title: F("desk.background.image.title"),
		rows: [{
			label: F("desk.background.image.label"),
			keywords: F("desk.background.image.keywords"),
			description: n ? F("desk.background.image.current", { name: n.name }) : F("desk.background.image.none"),
			control: () => a({
				label: F("desk.background.image.choose"),
				spinner: !0,
				onClick: r
			})
		}, n && {
			label: F("desk.background.image.remove.label"),
			description: F("desk.background.image.remove.description"),
			control: () => a({
				label: F("desk.background.image.remove.button"),
				onClick: () => E.clearWallpaper()
			})
		}].filter(Boolean)
	}];
}
var Q = (e) => () => T({
	value: _.get(e),
	onChange: (t) => _.set(e, t)
}), jt = {
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
function Mt() {
	let e = E.USER_PAGE_ITEMS ?? [], t = (e) => jt.groups.includes(e.key) ? F(`userPage.group.${e.key}`) : e.name, n = (e) => jt.items.includes(e.key) ? {
		name: F(`userPage.item.${e.key}.name`),
		description: F(`userPage.item.${e.key}.description`)
	} : e;
	return [{
		title: F("userPage.title"),
		rows: [{
			label: F("userPage.open.label"),
			description: F("userPage.open.description")
		}]
	}, ...(E.USER_PAGE_GROUPS ?? []).map((r) => ({
		title: t(r),
		rows: e.filter((e) => e.group === r.key).map((e) => {
			let { name: t, description: r } = n(e);
			return {
				label: t,
				description: r,
				keywords: F("userPage.keywords", { name: t }),
				control: () => T({
					value: E.isUserPageShown(e.key),
					label: F("userPage.toggle", { name: t }),
					onChange: (t) => E.setUserPageShown(e.key, t)
				})
			};
		})
	})).filter((e) => e.rows.length)];
}
var Nt = [
	"Generale",
	"Scrivania",
	"Elementi",
	"Finestre"
];
function Pt() {
	let e = new Set(oe()), t = /* @__PURE__ */ new Set(), n = (e) => {
		t.add(e);
		let n = re(e);
		return {
			label: e ? `.${e}` : F("fileTypes.noExtension"),
			description: n ? F("fileTypes.default", { app: n.name }) : F("fileTypes.noDefault"),
			keywords: F("fileTypes.keywords", { ext: e }),
			control: () => h({
				value: te(e)?.id ?? "ask",
				label: e ? F("fileTypes.field", { ext: e }) : F("fileTypes.fieldNoExtension"),
				options: [{
					value: "ask",
					label: F("fileTypes.ask")
				}, ...ae().map((e) => ({
					value: e.id,
					label: e.name
				}))],
				onChange: (t) => ue(e, t)
			})
		};
	}, r = c().map((t) => ({
		title: t.label,
		rows: t.exts.filter((t) => e.has(t)).map(n)
	})).filter((e) => e.rows.length), i = [...e].filter((e) => !t.has(e)).sort((e, t) => e === "" ? -1 : t === "" ? 1 : e.localeCompare(t));
	return [
		{
			title: F("fileTypes.title"),
			rows: [{
				label: F("fileTypes.all.label"),
				description: F("fileTypes.all.description"),
				control: $(F("fileTypes.all.reset"), F("common.confirm"), () => {
					le(), X?.render();
				})
			}]
		},
		...r,
		...i.length ? [{
			title: F("fileTypes.others"),
			rows: i.map(n)
		}] : []
	];
}
function Ft() {
	let e = l.trashed(), t = e.reduce((e, t) => e + t.bytes, 0);
	return [{
		title: F("trash.deleting.title"),
		rows: [{
			label: F("trash.confirm.label"),
			description: F("trash.confirm.description"),
			keywords: F("trash.confirm.keywords"),
			control: Q("deleteConfirm")
		}, {
			label: F("trash.permanent.label"),
			description: F("trash.permanent.description"),
			keywords: F("trash.permanent.keywords"),
			control: Q("deletePermanent")
		}]
	}, {
		title: F("trash.label"),
		rows: [
			{
				label: F("trash.retention.label"),
				description: F("trash.retention.description"),
				keywords: F("trash.retention.keywords"),
				control: () => {
					let e = _.get("trashRetention"), t = k.some((t) => t.value === e) ? k : [...k, {
						value: e,
						label: e > 0 ? F("trash.retention.days", { n: e }) : F("trash.retention.forever")
					}];
					return h({
						value: e,
						label: F("trash.retention.field"),
						options: t,
						onChange: (e) => _.set("trashRetention", Number(e))
					});
				}
			},
			{
				label: F("trash.contents.label"),
				description: e.length ? F("trash.contents.description", {
					n: e.length,
					size: Vt(t)
				}) : F("trash.contents.empty"),
				keywords: F("trash.contents.keywords"),
				control: a({
					label: F("trash.contents.open"),
					onClick: () => se("files", { trash: !0 })
				})
			},
			{
				label: F("trash.empty.label"),
				description: F("trash.empty.description"),
				keywords: F("trash.empty.keywords"),
				control: e.length ? $(F("trash.empty.button"), F("trash.empty.confirm"), () => l.purgeTrash()) : F("trash.empty.none")
			}
		]
	}];
}
function It(e = l.root) {
	return l.children(e).reduce((e, t) => e + (t.type === "folder" ? It(t.id) : t.size ?? 0), 0);
}
function Lt() {
	let e = /* @__PURE__ */ new Map();
	for (let t of y.list()) e.has(t.group) || e.set(t.group, []), e.get(t.group).push(t);
	let t = (e) => Nt.includes(e) ? Nt.indexOf(e) : Nt.length;
	return [
		{
			title: F("shortcuts.title"),
			rows: [{
				label: F("shortcuts.all.label"),
				description: F("shortcuts.all.description"),
				control: $(F("shortcuts.all.reset"), F("common.confirm"), () => y.resetAll())
			}]
		},
		...[...e].sort(([e], [n]) => t(e) - t(n)).map(([e, t]) => ({
			title: e,
			rows: t.map((e) => ({
				label: e.label,
				keywords: F("shortcuts.keywords", { keys: e.keys.map((e) => y.format(e)).join(" ") }),
				control: v(e.id)
			}))
		})),
		{
			title: F("shortcuts.mouse.title"),
			rows: [
				{
					label: F("shortcuts.lasso.label"),
					description: F("shortcuts.lasso.description"),
					keywords: F("shortcuts.lasso.keywords"),
					control: () => h({
						value: _.get("lasso"),
						options: O,
						onChange: (e) => _.set("lasso", e)
					})
				},
				{
					label: F("shortcuts.rectangle.label"),
					control: F("shortcuts.rectangle.control")
				},
				{
					label: F("shortcuts.addToSelection.label"),
					control: F("shortcuts.addToSelection.control")
				},
				{
					label: F("shortcuts.pan.label"),
					control: F("shortcuts.pan.control")
				}
			]
		},
		{
			title: F("shortcuts.fixed.title"),
			rows: [{
				label: F("shortcuts.navigate.label"),
				control: F("shortcuts.navigate.control")
			}, {
				label: F("shortcuts.rename.label"),
				control: F("shortcuts.rename.control")
			}]
		}
	];
}
var Rt = () => ({
	isolated: F("apps.mode.isolated"),
	open: F("apps.mode.open"),
	system: F("apps.mode.system"),
	remote: F("apps.mode.remote")
});
function zt() {
	let e = ne(), { isolated: t } = s.security(), n = j.filter((e) => e.package && !e.package.system);
	return [{
		title: F("apps.execution.title"),
		rows: [{
			label: F("apps.isolated.label"),
			description: F(e ? "apps.isolated.description" : "apps.isolated.adminOnly"),
			keywords: F("apps.isolated.keywords"),
			control: e ? T({
				value: t,
				label: F("apps.isolated.label"),
				onChange: async (e) => {
					try {
						await s.setSecurity({ isolated: e });
					} catch (e) {
						w(F("apps.isolated.failed", { error: e.message }));
					}
					X?.render();
				}
			}) : F(t ? "common.yes" : "common.no")
		}, {
			label: F("apps.system.label"),
			description: F("apps.system.description")
		}]
	}, {
		title: F("apps.installed.title"),
		rows: n.length ? n.map((e) => {
			let t = ie(e.package), n = t.fixed ? t.reason : t.own === null ? F("apps.installed.shared") : F("apps.installed.own");
			return {
				label: e.name,
				description: `${Rt()[t.mode]} · ${n}`,
				keywords: F("apps.installed.keywords"),
				control: a({
					label: F("apps.installed.properties"),
					onClick: () => fe(e.id)
				})
			};
		}) : [{ label: F("apps.installed.none") }]
	}];
}
function $(e, t, n) {
	let r = 0, i = a({
		label: e,
		onClick: () => {
			if (!i.classList.contains("primary")) {
				i.textContent = t, i.classList.add("danger", "primary"), r = setTimeout(o, 4e3);
				return;
			}
			clearTimeout(r);
			let e = n();
			typeof e?.then == "function" ? (i.disabled = !0, i.setAttribute("aria-busy", "true"), e.catch((e) => w(e.message, { timeout: 7e3 })).finally(() => {
				i.disabled = !1, i.removeAttribute("aria-busy"), o();
			})) : o();
		}
	}), o = () => {
		i.textContent = e, i.classList.remove("danger", "primary");
	};
	return i;
}
function Bt() {
	return b.bytes();
}
function Vt(e) {
	return e == null ? F("common.unavailable") : e < 1024 ? `${e} B` : `${(e / 1024).toLocaleString(g.locale, { maximumFractionDigits: 1 })} KB`;
}
var Ht = [
	[/Edg\/(\d+)/, "Edge"],
	[/Firefox\/(\d+)/, "Firefox"],
	[/Chrome\/(\d+)/, "Chrome"],
	[/Version\/(\d+).*Safari/, "Safari"]
];
function Ut() {
	for (let [e, t] of Ht) {
		let n = navigator.userAgent.match(e);
		if (n) return `${t} ${n[1]}`;
	}
	return F("about.unknownBrowser");
}
function Wt(e, t = e) {
	try {
		return new Intl.DisplayNames([t], { type: "language" }).of(e) ?? e;
	} catch {
		return e;
	}
}
function Gt() {
	let t = _.get("language"), n = [...e.LANGUAGES ?? []];
	t !== "auto" && !n.includes(t) && n.push(t);
	let r = (e) => {
		let t = Wt(e);
		return t.charAt(0).toUpperCase() + t.slice(1);
	};
	return [{
		title: F("language.title"),
		rows: [{
			label: F("language.label"),
			description: F("language.row.description"),
			keywords: F("language.keywords"),
			control: () => h({
				value: t,
				label: F("language.label"),
				options: [{
					value: "auto",
					label: F("language.auto", { name: Wt(navigator.language || "en", P.lang) })
				}, ...n.map((e) => ({
					value: e,
					label: r(e)
				}))],
				onChange: (e) => _.set("language", e)
			})
		}]
	}];
}
var Kt = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	10
], qt = [
	3,
	5,
	8,
	10,
	15,
	30,
	60
], Jt = [
	10,
	20,
	50,
	100,
	200
];
function Yt({ value: e, values: t, label: n, text: r = String, onChange: i }) {
	let a = t.includes(e) ? t : [...t, e].sort((e, t) => e - t);
	return h({
		value: e,
		label: n,
		options: a.map((e) => ({
			value: e,
			label: r(e)
		})),
		onChange: (e) => i(Number(e))
	});
}
function Xt() {
	let { notifications: t } = e, n = (e) => w(F("notifications.error", { message: e.message }));
	return [{
		title: F("notifications.arrive.title"),
		rows: [{
			label: F("notifications.shown.label"),
			description: F("notifications.shown.description"),
			keywords: F("notifications.shown.keywords"),
			control: () => Yt({
				value: _.get("notifyShown"),
				values: Kt,
				label: F("notifications.shown.field"),
				onChange: (e) => _.set("notifyShown", e)
			})
		}, {
			label: F("notifications.seconds.label"),
			description: F("notifications.seconds.description"),
			keywords: F("notifications.seconds.keywords"),
			control: () => Yt({
				value: _.get("notifySeconds"),
				values: qt,
				label: F("notifications.seconds.field"),
				text: (e) => F("notifications.seconds.value", { n: e }),
				onChange: (e) => _.set("notifySeconds", e)
			})
		}]
	}, {
		title: F("notifications.list.title"),
		rows: [{
			label: F("notifications.keep.label"),
			keywords: F("notifications.keep.keywords"),
			description: t.available ? F("notifications.keep.description") : `${F("notifications.keep.description")} ${F("notifications.keep.page")}`,
			control: () => Yt({
				value: t.keep,
				values: Jt,
				label: F("notifications.keep.field"),
				onChange: (e) => t.setKeep(e).catch(n)
			})
		}, {
			label: F("notifications.test.label"),
			description: F("notifications.test.description"),
			control: a({
				label: F("notifications.test.button"),
				onClick: () => t.send({
					app: "settings",
					text: F("notifications.test.text")
				}).catch(n)
			})
		}]
	}];
}
function Zt({ openWindow: r, args: i } = {}) {
	let a = new n({
		title: F("window.title"),
		icon: "gear",
		width: 760,
		height: 500,
		tabs: [
			{ get group() {
				return F("group.system");
			} },
			{
				id: "appearance",
				icon: "palette",
				get label() {
					return F("appearance.label");
				},
				get description() {
					return F("appearance.description");
				},
				subtabs: [{
					id: "colors",
					get label() {
						return F("appearance.colors.label");
					},
					sections: () => [{
						title: F("appearance.theme.label"),
						rows: [{
							label: F("appearance.theme.label"),
							description: F("appearance.theme.description"),
							keywords: F("appearance.theme.keywords"),
							control: ee({
								value: _.get("theme"),
								label: F("appearance.theme.label"),
								options: [{
									value: "light",
									label: F("appearance.theme.light")
								}, {
									value: "dark",
									label: F("appearance.theme.dark")
								}],
								onChange: (e) => _.set("theme", e)
							})
						}]
					}, {
						title: F("appearance.accent.title"),
						rows: [{
							label: F("common.color"),
							description: F("appearance.accent.description"),
							keywords: F("appearance.accent.keywords"),
							control: x({
								value: _.get("accent"),
								colors: D,
								onChange: (e) => _.set("accent", e)
							})
						}]
					}]
				}, {
					id: "motion",
					get label() {
						return F("appearance.motion.label");
					},
					sections: () => [{
						title: F("appearance.animations.label"),
						rows: [{
							label: F("appearance.animations.label"),
							description: F("appearance.animations.description"),
							keywords: F("appearance.animations.keywords"),
							control: Q("motion")
						}]
					}]
				}]
			},
			e.locale && {
				id: "language",
				icon: "globe",
				get label() {
					return F("language.label");
				},
				get description() {
					return F("language.description");
				},
				sections: Gt
			},
			{
				id: "desk",
				icon: "grid",
				get label() {
					return F("desk.label");
				},
				get description() {
					return F("desk.description");
				},
				subtabs: [
					{
						id: "items",
						get label() {
							return F("common.items");
						},
						sections: () => [
							...Ot(),
							{
								title: F("desk.placement.title"),
								rows: [{
									label: F("desk.snap.label"),
									description: F("desk.snap.description"),
									keywords: F("desk.snap.keywords"),
									control: Q("snap")
								}]
							},
							typeof E.fileThumbnail == "function" && {
								title: F("desk.previews.title"),
								rows: [{
									label: F("desk.previews.label"),
									description: F("desk.previews.description"),
									keywords: F("desk.previews.keywords"),
									control: Q("deskPreviews")
								}]
							}
						].filter(Boolean)
					},
					typeof E.setWallpaper == "function" && {
						id: "background",
						get label() {
							return F("desk.background.label");
						},
						sections: () => At(r)
					},
					{
						id: "overview",
						get label() {
							return F("desk.overview.label");
						},
						sections: () => [{
							title: F("desk.overview.title"),
							rows: [{
								label: F("desk.minimap.label"),
								keywords: F("desk.minimap.keywords"),
								control: Q("minimap")
							}]
						}]
					}
				].filter(Boolean)
			},
			(E.USER_PAGE_ITEMS ?? []).length && {
				id: "userpage",
				icon: "user",
				get label() {
					return F("userPage.label");
				},
				get description() {
					return F("userPage.description");
				},
				sections: Mt
			},
			{
				id: "workspaces",
				icon: "workspace",
				get label() {
					return F("workspaces.label");
				},
				get description() {
					return F("workspaces.description");
				},
				get subtabs() {
					return yt();
				}
			},
			e.notifications && {
				id: "notifications",
				icon: "bell",
				get label() {
					return F("notifications.label");
				},
				get description() {
					return F("notifications.description");
				},
				sections: Xt
			},
			{
				id: "tags",
				icon: "tag",
				get label() {
					return F("tags.label");
				},
				get description() {
					return F("tags.description");
				},
				sections: xt
			},
			{
				id: "usability",
				icon: "accessibility",
				get label() {
					return F("usability.label");
				},
				get description() {
					return F("usability.description");
				},
				subtabs: [
					{
						id: "shortcuts",
						get label() {
							return F("shortcuts.label");
						},
						sections: Lt
					},
					{
						id: "filetypes",
						get label() {
							return F("fileTypes.label");
						},
						sections: Pt
					},
					{
						id: "contextmenu",
						get label() {
							return F("menu.label");
						},
						sections: () => he("desktop.background", {
							openWindow: r,
							confirmButton: $,
							rerender: () => X?.render()
						})
					},
					{
						id: "trash",
						get label() {
							return F("trash.label");
						},
						sections: Ft
					}
				]
			},
			{
				id: "apps",
				icon: "window",
				get label() {
					return F("apps.label");
				},
				get description() {
					return F("apps.description");
				},
				subtabs: [{
					id: "security",
					get label() {
						return F("apps.security.label");
					},
					sections: zt
				}, {
					id: "pipes",
					get label() {
						return F("pipes.label");
					},
					sections: () => Fe({ rerender: () => X?.render() })
				}]
			},
			{
				id: "startup",
				icon: "power",
				get label() {
					return F("startup.label");
				},
				get description() {
					return F("startup.description");
				},
				subtabs: [
					{
						id: "options",
						get label() {
							return F("startup.options.label");
						},
						sections: () => Te({ rerender: () => X?.render() })
					},
					{
						id: "services",
						get label() {
							return F("startup.services.label");
						},
						sections: () => xe({
							openWindow: r,
							rerender: () => X?.render()
						})
					},
					{
						id: "apps",
						get label() {
							return F("startup.apps.label");
						},
						sections: () => Ee({
							openWindow: r,
							rerender: () => X?.render()
						})
					}
				]
			},
			Ve() && {
				id: "onedrive",
				icon: "cloud",
				get label() {
					return F("onedrive.label");
				},
				get description() {
					return F("onedrive.description");
				},
				sections: () => qe({ rerender: () => X?.render() })
			},
			...at({ rerender: () => X?.render() }),
			{ get group() {
				return F("group.data");
			} },
			{
				id: "storage",
				icon: "disk",
				get label() {
					return F("storage.label");
				},
				get description() {
					return f.connected ? F("storage.description.kernel") : F("storage.description.browser");
				},
				sections: () => [{
					title: F("storage.space.title"),
					rows: [{
						label: F("storage.used.label"),
						description: F("storage.used.description"),
						control: Vt(Bt())
					}, {
						label: F("storage.contents.label"),
						description: F("storage.contents.description"),
						control: Vt(It())
					}]
				}, {
					title: F("storage.reset.title"),
					rows: [{
						label: F("storage.defaults.label"),
						description: F("storage.defaults.description"),
						control: $(F("common.reset"), F("common.confirm"), () => {
							[
								"accent",
								"theme",
								"motion",
								"snap",
								...E.fileThumbnail ? ["deskPreviews"] : [],
								"minimap",
								"lasso",
								"deleteConfirm",
								"deletePermanent",
								"trashRetention",
								"startupApps",
								...e.locale ? ["language"] : [],
								...E.USER_PAGE_ITEMS ? ["userPageHidden"] : [],
								...e.notifications ? ["notifyShown", "notifySeconds"] : [],
								...E.setWallpaper ? ["deskColor", "wallpaper"] : []
							].forEach((e) => _.reset(e)), y.resetAll(), le(), p.list().forEach((e) => p.reset(e.id));
						})
					}, {
						label: F("storage.initial.label"),
						description: F("storage.initial.description"),
						keywords: F("storage.initial.keywords"),
						control: $(F("storage.initial.button"), F("storage.initial.confirm"), async () => {
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
							].forEach((e) => b.remove(e)), await f.flush().catch(() => {}), location.reload();
						})
					}]
				}]
			},
			{ group: "" },
			{
				id: "about",
				icon: "info",
				get label() {
					return F("about.label");
				},
				get description() {
					return F("about.description");
				},
				subtabs: [{
					id: "system",
					label: "lilOS",
					sections: () => [{
						title: "lilOS",
						rows: [
							{
								label: F("about.version"),
								control: pe
							},
							{
								label: F("about.sdkVersion"),
								control: t
							},
							{
								label: F("about.language"),
								control: g.locale
							},
							{
								label: F("about.browser"),
								control: Ut()
							}
						]
					}]
				}, {
					id: "credits",
					get label() {
						return F("credits.label");
					},
					sections: mt
				}]
			}
		].filter(Boolean)
	});
	X = a.view;
	let o = (e) => {
		Array.isArray(e?.tagFor) && (Z = e.tagFor.filter((e) => typeof e == "string" && l.exists(e))), typeof e?.tab == "string" && a.view.select(e.tab, typeof e.subtab == "string" ? e.subtab : void 0), e?.tab === "tags" && a.view.panel.querySelector(".tag-new-name")?.focus();
	};
	o(i), a.on("launch", o);
	let c = () => a.view.tab?.subtabs?.length && !a.view.subtab ? a.view.select(a.view.tab.id) : a.view.render(), u = [N()?.on("change", c), N()?.on("switch", c)], d = l.on("trash", () => a.view.render()), m = S.on("change", () => a.view.render()), h = [
		s.on("change", () => a.view.render()),
		s.on("security", () => a.view.render()),
		_e(() => a.view.render()),
		Ie(() => a.view.render())
	], v = _.on("change:deskHidden", () => a.view.render()), C = [_.on("change:deskColor", () => a.view.render()), E.wallpaper?.on("change", () => a.view.render())], w = () => a.setTitle(F("window.title"), a.view.tab?.label ?? "");
	a.view.on("select", w), a.view.on("select", () => {
		a.view.tab?.id === "onedrive" && (We(), a.view.render()), [
			"gdrive",
			"gphotos",
			"azblob",
			"nfs"
		].includes(a.view.tab?.id) && (ot(a.view.tab.id), a.view.render());
	});
	let T = e.net?.on?.("mounts", () => {
		a.view.tab?.id === "onedrive" && a.view.render();
	}), O = e.locale?.on("change", () => {
		a.view.render(), w();
	});
	return a.on("destroy", () => {
		u.forEach((e) => e?.()), d(), m(), v(), C.forEach((e) => e?.()), O?.(), h.forEach((e) => e?.()), T?.(), X === a.view && (X = null);
	}), a;
}
export { Zt as default };
