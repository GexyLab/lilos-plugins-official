import * as e from "/host/sdk.js";
import { SDK_VERSION as t, SettingsWindow as n, TAG_COLORS as r, Window as i, actionButton as a, appIcon as o, apps as s, fileTypeList as c, formatBytes as l, fs as u, h as d, icon as f, kernel as p, kernelModules as m, menus as h, messageBox as g, net as _, openMenu as v, segmented as y, selectField as b, session as x, settings as S, shortcutField as ee, shortcuts as C, storage as w, swatches as T, tags as E, textField as D, toast as O, toggle as k } from "/host/sdk.js";
import * as A from "/host/system.js";
import { ACCENTS as te, LASSO_OPTIONS as ne, RETENTION_OPTIONS as re, WORKSPACE_LIMITS as ie, appFor as ae, apps as j, canChangeExecution as oe, defaultAppFor as se, executionMode as ce, fileApps as le, knownExtensions as ue, launch as de, pickFile as fe, resetAppsFor as pe, setAppFor as me, setTag as he, showAppSecurity as ge, startup as M, version as _e, workspaceManager as N } from "/host/system.js";
// src/shared/i18n.js
function ve(t, n) {
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
var P = ve("settings", {
	en: /* @__PURE__ */ JSON.parse("{\"strings\":{\"window.title\":\"Control Panel\",\"cloud.onedrive.label\":\"OneDrive\",\"cloud.onedrive.description\":\"Shared folders, Upload to OneDrive and open, Office online.\",\"cloud.onedrive.keywords\":\"onedrive microsoft office online azure word excel powerpoint shared\",\"cloud.onedrive.settings\":\"OneDrive (for everyone on this lilOS)\",\"cloud.gdrive.label\":\"Google Drive\",\"cloud.gdrive.description\":\"Shared with me, the format of Google documents.\",\"cloud.gdrive.keywords\":\"google drive docs sheets slides cloud shared export\",\"cloud.gdrive.settings\":\"Google Drive (for everyone on this lilOS)\",\"cloud.gphotos.label\":\"Google Photos\",\"cloud.gphotos.description\":\"Import from Google Photos and the albums lilOS makes.\",\"cloud.gphotos.keywords\":\"google photos picker album import cloud\",\"cloud.gphotos.settings\":\"Google Photos (for everyone on this lilOS)\",\"cloud.azblob.label\":\"Azure Blob Storage\",\"cloud.azblob.description\":\"Signing in with Microsoft Entra (account key and SAS need nothing).\",\"cloud.azblob.keywords\":\"azure blob storage entra microsoft container sas key data lake\",\"cloud.azblob.settings\":\"Azure Blob Storage (for everyone on this lilOS)\",\"cloud.localfolders.label\":\"Computer folders\",\"cloud.localfolders.description\":\"Which folders of the kernel's computer the users who are not administrators may connect in Network.\",\"cloud.localfolders.keywords\":\"folders computer local disk usb network permissions\",\"cloud.localfolders.settings\":\"Folders of this computer (for everyone on this lilOS)\",\"cloud.localfolders.steps.title\":\"How it works\",\"cloud.localfolders.steps.label\":\"Who connects what\",\"cloud.localfolders.steps.1\":\"Administrators connect any folder of the computer the kernel runs on (Network → Connect to a server → This computer).\",\"cloud.localfolders.steps.2\":\"The other users connect only the folders listed here, or folders inside them, with the permissions of the computer's user that runs the kernel.\",\"cloud.nfs.label\":\"NFS\",\"cloud.nfs.description\":\"The UID and GID each user has on NFS servers.\",\"cloud.nfs.keywords\":\"nfs uid gid nas linux export identity\",\"cloud.nfs.settings\":\"Identities on NFS servers (for everyone on this lilOS)\",\"cloud.nfs.you\":\"Your user name\",\"cloud.nfs.you.description\":\"The name to write in your line\",\"cloud.nfs.steps.title\":\"On the NFS server\",\"cloud.nfs.steps.label\":\"What to check\",\"cloud.nfs.steps.1\":\"The folder is exported to the address of the computer running lilOS's kernel, with NFSv3 over TCP.\",\"cloud.nfs.steps.2\":\"If lilOS's kernel cannot use a port below 1024 (Linux without privileges), allow other ports: «insecure» in /etc/exports, «Allow connections from non-privileged ports» on Synology.\",\"cloud.nfs.steps.3\":\"The UID and GID here are those of the users on the server: whoever has them reads and writes their files.\",\"cloud.nfs.steps.4\":\"With several users, the local network must be open to the kernel (net.allowPrivate or net.allow in config.json).\",\"cloud.status\":\"State\",\"cloud.adminOnly\":\"Only an administrator changes these settings\",\"cloud.ready\":\"Ready\",\"cloud.notReady\":\"Not set yet\",\"cloud.error\":\"Settings not read\",\"cloud.saved\":\"Saved\",\"cloud.notSaved\":\"Not saved\",\"cloud.addresses.title\":\"Addresses to register\",\"cloud.redirect.label\":\"Sign-in window\",\"cloud.redirect.google\":\"This lilOS's address, as Google sends the window back to it\",\"cloud.redirect.unusable\":\"lilOS is open on http outside this computer: the sign-in window does not work here, use the sign-in by pasting the address (or open lilOS on https)\",\"cloud.byHand.label\":\"Sign-in by pasting the address\",\"cloud.byHand.google\":\"Where Google ends when lilOS is not on https: a page that does not open, whose address the user pastes\",\"cloud.copy\":\"Copy\",\"cloud.copied\":\"Copied\",\"cloud.azblob.steps.title\":\"How to sign in with Microsoft Entra\",\"cloud.azblob.steps.label\":\"Steps\",\"cloud.azblob.steps.1\":\"Only to sign in with a Microsoft account: with the account key or a SAS token nothing is needed.\",\"cloud.azblob.steps.2\":\"The Microsoft app (its tab here) needs the API permission Azure Storage → user_impersonation (delegated).\",\"cloud.azblob.steps.3\":\"On the storage account, give users the role «Storage Blob Data Contributor» (Access control).\",\"cloud.microsoft.label\":\"Microsoft app\",\"cloud.microsoft.description\":\"The app on Azure that OneDrive and Azure Blob Storage sign in with.\",\"cloud.microsoft.keywords\":\"microsoft azure entra app registration client id tenant onedrive blob\",\"cloud.microsoft.settings\":\"App on Azure (for everyone on this lilOS)\",\"cloud.microsoft.steps.title\":\"How to register the app on Azure\",\"cloud.microsoft.steps.label\":\"Steps\",\"cloud.microsoft.steps.1\":\"portal.azure.com → App registrations → New registration (a free Azure account is enough).\",\"cloud.microsoft.steps.2\":\"Supported account types: the same as «Accounts allowed» here.\",\"cloud.microsoft.steps.3\":\"Authentication → Mobile and desktop applications: the two addresses above; Allow public client flows: Yes.\",\"cloud.microsoft.steps.4\":\"API permissions, delegated: for OneDrive Microsoft Graph Files.ReadWrite, User.Read, offline_access (Files.ReadWrite.All for the shared folders); for Azure Blob Storage Azure Storage → user_impersonation.\",\"cloud.microsoft.steps.5\":\"Copy the Application (client) ID into the field above.\",\"cloud.google.label\":\"Google project\",\"cloud.google.description\":\"The Google Cloud project that Google Drive and Google Photos sign in with.\",\"cloud.google.keywords\":\"google cloud project oauth client id secret drive photos\",\"cloud.google.settings\":\"Google Cloud project (for everyone on this lilOS)\",\"cloud.google.steps.title\":\"How to make the project on Google Cloud\",\"cloud.google.steps.label\":\"Steps\",\"cloud.google.steps.1\":\"console.cloud.google.com → New project (for example «lilOS»).\",\"cloud.google.steps.2\":\"APIs & Services → Library → enable Google Drive API; for Google Photos also Google Photos Picker API and Photos Library API.\",\"cloud.google.steps.3\":\"OAuth consent screen: Internal with Google Workspace; otherwise External, then Publish app (in Testing the sign-in expires every 7 days). Scopes: …/auth/drive; for Google Photos photospicker.mediaitems.readonly, photoslibrary.appendonly, photoslibrary.readonly.appcreateddata, photoslibrary.edit.appcreateddata.\",\"cloud.google.steps.4\":\"Credentials → Create OAuth client ID → Web application, with the two addresses above as authorized redirect URIs (or Desktop app: then always by pasting the address).\",\"cloud.google.steps.5\":\"Copy the client ID and the client secret above.\",\"cloud.google.steps.6\":\"On first sign-in Google says the app is not verified: it is your project, Continue.\",\"cloud.google.steps.7\":\"Since 2025 Google lets apps see only the photos the user picks and the albums the app makes.\",\"cloud.uses.microsoft\":\"Microsoft app\",\"cloud.uses.google\":\"Google project\",\"cloud.uses.description\":\"Signing in uses the app registered with the provider: set once in its own tab, for every service of that provider.\",\"cloud.uses.open\":\"Open\",\"cloud.signAgain\":\"The connections ask to sign in again, to accept the new permissions.\",\"cloud.redirect.microsoft\":\"This lilOS's address, as Microsoft sends the window back to it\",\"cloud.byHand.microsoft\":\"Where Microsoft ends when lilOS is not on https: a page that does not open, whose address the user pastes\",\"onedrive.upload.title\":\"Upload to OneDrive and open\",\"onedrive.upload.mount.label\":\"Connection\",\"onedrive.upload.mount.description\":\"Where the Office documents of your Home go before they open in Office online.\",\"onedrive.upload.mount.none\":\"Connect OneDrive first: File Manager → Rete → +.\",\"onedrive.upload.mount.ask\":\"Ask each time\",\"onedrive.upload.folder.label\":\"Folder\",\"onedrive.upload.folder.description\":\"On OneDrive (made if missing). The original stays in your Home: what you change in Office is changed in the copy.\",\"onedrive.upload.exists.label\":\"A file with the same name\",\"onedrive.upload.exists.description\":\"When the folder on OneDrive has one already.\",\"onedrive.upload.exists.ask\":\"Ask\",\"onedrive.upload.exists.keep\":\"Keep both\",\"onedrive.upload.exists.replace\":\"Replace it\",\"onedrive.office.title\":\"Office documents\",\"onedrive.office.doubleClick.label\":\"Double click opens Office online\",\"onedrive.office.doubleClick.description\":\"Word, Excel and PowerPoint documents of OneDrive, when no app of lilOS is chosen for their type (Usability → File types).\",\"group.system\":\"System\",\"group.data\":\"Data\",\"common.name\":\"Name\",\"common.color\":\"Color\",\"common.items\":\"Items\",\"common.create\":\"Create\",\"common.add\":\"Add\",\"common.addMore\":\"Add…\",\"common.remove\":\"Remove\",\"common.delete\":\"Delete…\",\"common.deleteNow\":\"Delete\",\"common.reset\":\"Reset\",\"common.confirm\":\"Confirm\",\"common.loading\":\"Loading…\",\"common.unavailable\":\"Not available\",\"common.yes\":\"Yes\",\"common.no\":\"No\",\"appearance.label\":\"Appearance\",\"appearance.description\":\"Colors and motion of the interface.\",\"appearance.colors.label\":\"Colors\",\"appearance.theme.label\":\"Theme\",\"appearance.theme.description\":\"Light or dark: desk, taskbar, menus and windows\",\"appearance.theme.keywords\":\"theme light dark night mode\",\"appearance.theme.light\":\"Light\",\"appearance.theme.dark\":\"Dark\",\"appearance.accent.title\":\"Accent color\",\"appearance.accent.description\":\"Selection, buttons, active tabs and logo\",\"appearance.accent.keywords\":\"accent theme highlight\",\"appearance.motion.label\":\"Motion\",\"appearance.animations.label\":\"Animations\",\"appearance.animations.description\":\"View movements, menus and transitions. If the operating system asks for reduced motion, they stay reduced.\",\"appearance.animations.keywords\":\"motion movement transitions\",\"language.label\":\"Language\",\"language.description\":\"The language of lilOS and apps: their texts, dates and numbers.\",\"language.title\":\"System language\",\"language.row.description\":\"Apps without this language use English. lilOS’s own texts are still in Italian.\",\"language.row.packs\":\"lilOS’s own texts come from the language pack of this language (English needs none). Each app uses its own translation if it has one, otherwise English.\",\"language.more.label\":\"More languages\",\"language.more.description\":\"The language packs of the official repository, in the AppStore: any user can install one, and it is there for everyone.\",\"language.more.button\":\"Open AppStore\",\"language.more.keywords\":\"more languages language pack install appstore translation\",\"language.keywords\":\"language translation locale english italian dates numbers\",\"language.auto\":\"Automatic: {name}\",\"desk.label\":\"Desk\",\"desk.description\":\"How the infinite desk behaves.\",\"desk.fixed.title\":\"Fixed items\",\"desk.fixed.label\":\"On the desk\",\"desk.fixed.descriptionSwitchable\":\"The ones turned on are on the desk of every workspace. They open and move like other items, but cannot be renamed or deleted: you remove them here.\",\"desk.fixed.description\":\"They are on the desk of every workspace. They open and move like other items, but cannot be renamed or deleted.\",\"desk.fixed.keywords\":\"fixed items desk show hide delete {name}\",\"desk.fixed.toggle\":\"{name} on the desk\",\"desk.fixed.toggleIn\":\"{name} on the desk of {workspace}\",\"desk.fixed.always\":\"Fixed\",\"desk.fixed.item.home.name\":\"Home\",\"desk.fixed.item.home.description\":\"The main folder, with all the others\",\"desk.fixed.item.documents.name\":\"Documenti\",\"desk.fixed.item.documents.description\":\"The Documenti folder, shared by every workspace\",\"desk.fixed.item.images.name\":\"Immagini\",\"desk.fixed.item.images.description\":\"The Immagini folder, shared by every workspace\",\"desk.fixed.item.files.name\":\"File Manager\",\"desk.fixed.item.files.description\":\"Opens the File Manager\",\"desk.fixed.item.downloads.name\":\"Download\",\"desk.fixed.item.downloads.description\":\"The Download folder, shared by every workspace\",\"desk.fixed.item.trash.name\":\"Trash\",\"desk.fixed.item.trash.description\":\"Opens the trash; files and folders can be dragged onto it\",\"desk.fixed.descriptionWorkspace\":\"The ones turned on are on this workspace's desk. They open and move like other items, but cannot be renamed or deleted: you remove them here.\",\"desk.fixed.descriptionAll\":\"Turn one on or off in every workspace at once; new workspaces get the same. Each workspace can then change it in its own tab.\",\"desk.fixed.some\":\"On in {on} of {n} workspaces\",\"desk.fixed.toggleAll\":\"{name} on every desk\",\"desk.fixed.moved.label\":\"Each workspace has its own\",\"desk.fixed.moved.description\":\"Choose them in Workspaces: in each workspace's tab, or in All for every desk.\",\"desk.fixed.moved.keywords\":\"fixed items desk home documents trash workspace\",\"desk.fixed.moved.open\":\"Open\",\"desk.placement.title\":\"Placement\",\"desk.snap.label\":\"Snap to grid\",\"desk.snap.description\":\"Dragged items line up on an invisible grid\",\"desk.snap.keywords\":\"icons snap grid align\",\"desk.previews.title\":\"Icons\",\"desk.previews.label\":\"Show file previews\",\"desk.previews.description\":\"Files show a small image of what they contain, made by the app that opens them (Photo, Editor…), in place of their icon\",\"desk.previews.keywords\":\"previews thumbnails icons images files\",\"desk.background.label\":\"Background\",\"desk.background.color.title\":\"Color\",\"desk.background.color.description\":\"Behind the items, and around images that are transparent\",\"desk.background.color.keywords\":\"background color desk wallpaper\",\"desk.background.custom.label\":\"Other color\",\"desk.background.custom.description\":\"Any color you like\",\"desk.background.theme.label\":\"Theme color\",\"desk.background.theme.description\":\"Back to the color of the light or dark theme\",\"desk.background.theme.button\":\"Use the theme color\",\"desk.background.image.title\":\"Image\",\"desk.background.image.label\":\"Background image\",\"desk.background.image.keywords\":\"background image wallpaper picture photo desk\",\"desk.background.image.current\":\"«{name}»: as tall as the desk, in its own proportions (a wider image is cut at the sides); it does not move or zoom with the desk\",\"desk.background.image.none\":\"None: only the color. In the menu of an image on the desk: Use as desktop background\",\"desk.background.image.choose\":\"Choose…\",\"desk.background.image.pick\":\"Choose the background image\",\"desk.background.image.remove.label\":\"Remove the image\",\"desk.background.image.remove.description\":\"The file stays where it is\",\"desk.background.image.remove.button\":\"Remove\",\"desk.overview.label\":\"Overview\",\"desk.overview.title\":\"Bottom-right panel\",\"desk.minimap.label\":\"Show the minimap\",\"desk.minimap.keywords\":\"map minimap thumbnail\",\"workspaces.label\":\"Workspaces\",\"workspaces.description\":\"Separate desks, each with its own items, windows and apps. Files outside the desk belong to everyone.\",\"workspaces.current.label\":\"This workspace\",\"workspaces.current.title\":\"Workspace\",\"workspaces.all.label\":\"All\",\"workspaces.name.keywords\":\"rename workspace name\",\"workspaces.name.field\":\"Workspace name\",\"workspaces.description.label\":\"Description\",\"workspaces.description.description\":\"A line about what the workspace is for, under its name at the bottom of the start menu\",\"workspaces.description.keywords\":\"workspace description notes start menu\",\"workspaces.description.field\":\"Workspace description\",\"workspaces.description.placeholder\":\"What you use it for\",\"workspaces.color.description\":\"The dot in the taskbar and next to its files in the File Manager\",\"workspaces.color.keywords\":\"workspace color\",\"workspaces.owned.label\":\"Files, folders and shortcuts\",\"workspaces.owned.description\":\"Created in this workspace, on the desk and in shared folders\",\"workspaces.apps.title\":\"Apps\",\"workspaces.apps.system\":\"System app: it is in every workspace\",\"workspaces.apps.installed\":\"Installed in lilOS: you can hide it here\",\"workspaces.apps.keywords\":\"app hide show {name}\",\"workspaces.apps.alwaysVisible\":\"Always visible\",\"workspaces.apps.toggle\":\"{name} visible in this workspace\",\"workspaces.apps.toggleIn\":\"{name} visible in {workspace}\",\"workspaces.list.current\":\"{name} (current)\",\"workspaces.list.owned\":{\"one\":\"{n} item created\",\"other\":\"{n} items created\"},\"workspaces.list.apps\":{\"one\":\"{n} app\",\"other\":\"{n} apps\"},\"workspaces.list.keywords\":\"workspace switch delete\",\"workspaces.list.switch\":\"Switch to it\",\"workspaces.switch.label\":\"Go to this workspace\",\"workspaces.new.label\":\"New workspace\",\"workspaces.new.description\":\"With an empty desk and every app visible\",\"workspaces.taskbar.title\":\"Taskbar\",\"workspaces.taskbar.label\":\"Workspaces in the taskbar\",\"workspaces.taskbar.description\":\"Only the current one, or a button for each workspace in a row, to change with one click\",\"workspaces.taskbar.keywords\":\"taskbar bar bottom workspace list all current\",\"workspaces.taskbar.current\":\"Current only\",\"workspaces.taskbar.all\":\"All\",\"workspaces.deleting.title\":\"Deleting a workspace\",\"workspaces.deleting.files.label\":\"Files stay\",\"workspaces.deleting.files.description\":\"Its desk becomes the folder Documenti/Scrivania di <name> (if it is not empty); files created elsewhere stay where they are, marked as its own.\",\"workspaces.deleting.windows.label\":\"Windows stay\",\"workspaces.deleting.windows.description\":\"Its open windows move to the current workspace, with their unsaved changes. Workareas, view and hidden apps are lost.\",\"tags.label\":\"Tags\",\"tags.description\":\"Colored labels to find files and folders wherever they are. A hidden tag hides its items.\",\"tags.new.title\":\"New tag\",\"tags.new.pending\":{\"one\":\"The new tag will go on {n} selected item\",\"other\":\"The new tag will go on {n} selected items\"},\"tags.new.description\":\"Then assign it from the right-click menu → Tag, on the desk and in the File Manager\",\"tags.new.keywords\":\"new tag create label\",\"tags.new.placeholder\":\"For example: Urgent\",\"tags.new.field\":\"Name of the new tag\",\"tags.name.keywords\":\"rename tag\",\"tags.name.field\":\"Name of the tag {name}\",\"tags.color.keywords\":\"tag color\",\"tags.visible.label\":\"Visible\",\"tags.visible.on\":\"Items with this tag are shown everywhere\",\"tags.visible.off\":\"Items with this tag are hidden everywhere: you find them in File Manager → Tags\",\"tags.visible.keywords\":\"hide show hidden invisible tag\",\"tags.visible.toggle\":\"Tag {name} visible\",\"tags.items.description\":{\"one\":\"{n} item in this workspace and in shared folders\",\"other\":\"{n} items in this workspace and in shared folders\"},\"tags.items.show\":\"Show in File Manager\",\"tags.items.delete\":\"Delete the tag\",\"usability.label\":\"Usability\",\"usability.description\":\"Keyboard, mouse, apps that open files, context menus and trash.\",\"shortcuts.label\":\"Shortcuts\",\"shortcuts.title\":\"Keyboard shortcuts\",\"shortcuts.all.label\":\"All shortcuts\",\"shortcuts.all.description\":\"Changes apply right away. To record a combination press +, then the keys; Esc cancels.\",\"shortcuts.all.reset\":\"Reset all\",\"shortcuts.keywords\":\"shortcut keys {keys}\",\"shortcuts.mouse.title\":\"Mouse\",\"shortcuts.lasso.label\":\"Freehand selection\",\"shortcuts.lasso.description\":\"Draw a closed path: the items inside it are selected\",\"shortcuts.lasso.keywords\":\"lasso freehand path selection alt\",\"shortcuts.rectangle.label\":\"Rectangle selection\",\"shortcuts.rectangle.control\":\"Drag on the background\",\"shortcuts.addToSelection.label\":\"Add to the selection\",\"shortcuts.addToSelection.control\":\"Ctrl or Shift + click or drag\",\"shortcuts.pan.label\":\"Move around the desk\",\"shortcuts.pan.control\":\"Space + drag, or middle button\",\"shortcuts.fixed.title\":\"Fixed keys\",\"shortcuts.navigate.label\":\"Move through menus, lists and tabs\",\"shortcuts.navigate.control\":\"Arrows, Enter, Esc\",\"shortcuts.rename.label\":\"Confirm or cancel renaming\",\"shortcuts.rename.control\":\"Enter, Esc\",\"fileTypes.label\":\"File types\",\"fileTypes.title\":\"Apps by file type\",\"fileTypes.all.label\":\"All file types\",\"fileTypes.all.description\":\"When you open a file, lilOS uses the app chosen here. With “Ask every time” the Open with window appears.\",\"fileTypes.all.reset\":\"Reset all\",\"fileTypes.noExtension\":\"No extension\",\"fileTypes.default\":\"Default: {app}\",\"fileTypes.noDefault\":\"No default app\",\"fileTypes.keywords\":\"file type extension open with {ext}\",\"fileTypes.field\":\"App for .{ext}\",\"fileTypes.fieldNoExtension\":\"App for files without an extension\",\"fileTypes.ask\":\"Ask every time\",\"fileTypes.others\":\"Others\",\"menu.label\":\"Context menu\",\"menu.separator\":\"— Separator —\",\"menu.submenu\":{\"one\":\"Submenu · {n} item\",\"other\":\"Submenu · {n} items\"},\"menu.create.folder\":\"Creates the folder “{name}”\",\"menu.create.file\":\"Creates the file “{name}”\",\"menu.create.fileFromTemplate\":\"Creates the file “{name}” from the template {template}\",\"menu.create.fileWithContent\":\"Creates the file “{name}” with initial content\",\"menu.create.deletedTemplate\":\"(deleted file)\",\"menu.launch\":\"Opens the app {name}\",\"menu.action\":\"Action\",\"menu.keywords\":\"context menu item separator new\",\"menu.moveUp\":\"Move up\",\"menu.moveDown\":\"Move down\",\"menu.target.root\":\"Main menu\",\"menu.target.inside\":\"Inside “{name}”\",\"menu.target.label\":\"Where\",\"menu.item.label\":\"Item\",\"menu.item.description\":\"An action or opening an app\",\"menu.item.field\":\"Item to add\",\"menu.item.open\":\"Open {name}\",\"menu.separatorRow.label\":\"Separator\",\"menu.separatorRow.description\":\"A line to group items\",\"menu.new.label\":\"New item in “{name}”\",\"menu.new.description\":\"Creates a file or a folder with this name; a file can start from the contents of a template\",\"menu.new.labelField\":\"Label\",\"menu.new.labelPlaceholder\":\"Label (e.g. Style sheet)\",\"menu.new.nameField\":\"Name of the file or folder\",\"menu.new.namePlaceholder\":\"Name (e.g. style.css)\",\"menu.new.kind\":\"Type\",\"menu.new.kindFile\":\"File\",\"menu.new.kindFolder\":\"Folder\",\"menu.new.missing\":\"A label and a name are needed\",\"menu.template.button\":\"Template…\",\"menu.template.chosen\":\"Template: {name}\",\"menu.template.title\":\"Choose the template file\",\"menu.template.text\":\"The new file will start with the contents of this file.\",\"menu.defaults.label\":\"Default items\",\"menu.defaults.custom\":\"The menu has been customized\",\"menu.defaults.default\":\"The menu is the default one\",\"trash.label\":\"Trash\",\"trash.deleting.title\":\"Deleting\",\"trash.confirm.label\":\"Ask for confirmation\",\"trash.confirm.description\":\"Before deleting files and folders, a small menu asks you to confirm\",\"trash.confirm.keywords\":\"confirm delete remove ask\",\"trash.permanent.label\":\"Delete permanently\",\"trash.permanent.description\":\"Deleted items skip the trash: they can be recovered only with Ctrl Z, while the page stays open\",\"trash.permanent.keywords\":\"trash permanent immediately delete skip\",\"trash.retention.label\":\"Keep items for\",\"trash.retention.description\":\"After this time, what is in the trash is deleted permanently\",\"trash.retention.keywords\":\"retention duration days automatic cleanup empty\",\"trash.retention.field\":\"Keep items in the trash for\",\"trash.retention.days\":{\"one\":\"{n} day\",\"other\":\"{n} days\"},\"trash.retention.forever\":\"Forever\",\"trash.contents.label\":\"Contents\",\"trash.contents.description\":{\"one\":\"{n} item · {size}\",\"other\":\"{n} items · {size}\"},\"trash.contents.empty\":\"The trash is empty\",\"trash.contents.keywords\":\"open trash restore\",\"trash.contents.open\":\"Open the trash\",\"trash.empty.label\":\"Empty the trash\",\"trash.empty.description\":\"Permanently deletes everything in it\",\"trash.empty.keywords\":\"empty trash\",\"trash.empty.button\":\"Empty…\",\"trash.empty.confirm\":\"Empty\",\"trash.empty.none\":\"Empty\",\"apps.label\":\"Apps\",\"apps.description\":\"How installed apps run.\",\"apps.security.label\":\"Security\",\"apps.execution.title\":\"Running apps\",\"apps.isolated.label\":\"Run apps isolated\",\"apps.isolated.description\":\"Each app runs in a sandbox and sees only what its permissions allow. If you turn this off, apps run in lilOS’s page and in a Web Worker: faster, but they can do everything you can do. Applies from the next time each app opens.\",\"apps.isolated.adminOnly\":\"Only an administrator can change it.\",\"apps.isolated.keywords\":\"security isolation sandbox iframe worker\",\"apps.isolated.failed\":\"Not changed: {error}\",\"apps.system.label\":\"System apps\",\"apps.system.description\":\"File Manager, Editor, Control Panel and AppStore are part of lilOS and always run inside lilOS.\",\"apps.installed.title\":\"Installed apps\",\"apps.installed.keywords\":\"security isolation\",\"apps.installed.shared\":\"Like the other apps\",\"apps.installed.own\":\"Chosen for this app\",\"apps.installed.properties\":\"Properties…\",\"apps.installed.none\":\"No apps installed besides the system ones\",\"apps.mode.isolated\":\"Isolated\",\"apps.mode.open\":\"Not isolated\",\"apps.mode.system\":\"Inside lilOS\",\"apps.mode.remote\":\"Isolated, on its own site\",\"startup.label\":\"Startup\",\"startup.description\":\"Services and apps that start by themselves when lilOS starts and when you sign in.\",\"startup.options.label\":\"Options\",\"startup.services.label\":\"Services\",\"startup.apps.label\":\"Apps\",\"startup.auto.title\":\"Automatic startup\",\"startup.openApps.label\":\"Open apps when you sign in\",\"startup.openApps.description\":\"The apps chosen in Apps open, with their parameters. Only in the first lilOS tab of this browser: the others open empty.\",\"startup.openApps.keywords\":\"startup automatic sign-in login autorun\",\"startup.trouble.title\":\"If something goes wrong\",\"startup.safe.label\":\"Start without apps\",\"startup.safe.description\":\"Just once: open lilOS with ?avvio=no at the end of the address. Saved choices are kept.\",\"startup.safe.keywords\":\"safe start startup no apps avvio=no\",\"startup.safe.active\":\"Active now\",\"startup.apps.title\":\"Open when you sign in\",\"startup.apps.hint\":\"In the workspace lilOS opens in, in the order of the list. Turn off every entry point of an app and the app leaves the list.\",\"startup.apps.none\":\"No app opens by itself.\",\"startup.apps.oneEntry\":\"1 entry point\",\"startup.apps.entries\":{\"one\":\"{on} of {n} entry point\",\"other\":\"{on} of {n} entry points\"},\"startup.apps.remove\":\"Remove from startup\",\"startup.apps.allAdded\":\"All apps are already in startup\",\"startup.apps.add\":\"Add an app to startup\",\"startup.apps.addDescription\":\"Its main window opens; then choose other entry points and parameters\",\"startup.params.of\":\"{entry} of {app}\",\"startup.params.undescribed\":\"This entry point does not describe its parameters: they reach the app as they are, as args.\",\"startup.params.json\":\"Parameters (JSON)\",\"startup.params.jsonOf\":\"Parameters (JSON) of {name}\",\"startup.params.invalidJson\":\"Not valid JSON\",\"startup.params.notSaved\":\"Not saved: {error}\",\"services.unsupported\":\"This version of lilOS has no app services\",\"services.status.off\":\"Off\",\"services.status.starting\":\"Starting…\",\"services.status.error\":\"Stopped: {error}\",\"services.status.unknownError\":\"error\",\"services.status.restarting\":\"Restarting… (it had stopped: {error})\",\"services.status.onNow\":\"On for less than a minute\",\"services.status.onMinutes\":{\"one\":\"On for {n} minute\",\"other\":\"On for {n} minutes\"},\"services.status.onHours\":{\"one\":\"On for {n} hour\",\"other\":\"On for {n} hours\"},\"services.status.onSince\":\"On since {date}\",\"services.auto.label\":\"Start services automatically\",\"services.auto.noEngine\":\"The kernel has no services engine (services-isolate module)\",\"services.auto.description\":\"When you sign in, your services chosen in Services start. The ones an administrator chose for everyone start anyway.\",\"services.auto.keywords\":\"services startup automatic background kernel\",\"services.title\":\"Installed services\",\"services.noEngine\":\"The kernel has no services engine: it needs the services-isolate module (AppStore → Kernel).\",\"services.none\":\"No installed app has services.\",\"services.hint\":\"The parts of apps that work in the kernel, without a window, even with lilOS closed. “At system startup” applies to every user and is chosen by an administrator; “At sign-in” only to you.\",\"services.startup.none\":\"Never\",\"services.startup.login\":\"At sign-in\",\"services.startup.system\":\"At system startup\",\"services.startup.field\":\"Startup of {name}\",\"services.restart\":\"Restart\",\"services.restartOf\":\"Restart {name}\",\"services.stop\":\"Stop\",\"services.start\":\"Start\",\"services.byAdmin\":\"chosen by an administrator\",\"services.log.label\":\"Log\",\"services.log.title\":\"Log of {name}\",\"services.log.empty\":\"No lines: the service has not started yet.\",\"storage.label\":\"Storage\",\"storage.description.kernel\":\"Your space, the limits of files and every user's space.\",\"storage.description.browser\":\"lilOS data saved in this browser.\",\"storage.space.title\":\"Space\",\"storage.used.label\":\"lilOS data\",\"storage.used.description\":\"Positions, view and settings\",\"storage.contents.label\":\"File contents\",\"storage.contents.description\":\"Text saved in files\",\"storage.reset.title\":\"Reset\",\"storage.defaults.label\":\"Default settings\",\"storage.defaults.description\":\"Resets settings, shortcuts, file type apps and menus to their initial values\",\"storage.initial.label\":\"Initial desk and files\",\"storage.initial.description\":\"Deletes all the folders and files created, the workspaces, the tags, the saved positions and view, then reloads lilOS\",\"storage.initial.keywords\":\"reset factory desktop desk workspace tag\",\"storage.initial.button\":\"Reset…\",\"storage.initial.confirm\":\"Delete and reload\",\"storage.mine.label\":\"My space\",\"storage.mine.title\":\"Your space\",\"storage.limits.label\":\"Limits\",\"storage.users.label\":\"Users\",\"storage.quota.label\":\"Space used\",\"storage.quota.description\":\"All your files, the trash included\",\"storage.quota.none\":\"All your files, the trash included: no limit set\",\"storage.quota.of\":\"{used} of {quota}\",\"storage.quota.noLimit\":\"{used}\",\"storage.maxFile.label\":\"Biggest file\",\"storage.maxFile.description\":\"The size up to which lilOS saves a file\",\"storage.unlimited\":\"No limit\",\"storage.limits.title\":\"File limits\",\"storage.pieces.title\":\"Pieces\",\"storage.limits.keywords\":\"limit size file quota space upload pieces megabyte gigabyte\",\"storage.limits.saved\":\"Saved in the kernel's configuration and valid at once, without restarting it.\",\"storage.setting.maxFileSize.label\":\"Maximum size of a file\",\"storage.setting.maxFileSize.description\":\"A bigger file is not saved in the home. 0 = no limit.\",\"storage.setting.maxReadWhole.label\":\"Reading at once\",\"storage.setting.maxReadWhole.description\":\"Past this size a file is read only as a stream: apps that open it whole in memory refuse it. 0 = no limit.\",\"storage.setting.maxText.label\":\"Text\",\"storage.setting.maxText.description\":\"The longest text read or saved as text (Editor, Sticky notes). 0 = no limit.\",\"storage.setting.uploadPiece.label\":\"Upload pieces\",\"storage.setting.uploadPiece.description\":\"A bigger file goes from the browser in several requests of this size, and an interrupted upload goes on from where it was. Lower it if a proxy in front of lilOS limits the requests. 0 = one request.\",\"storage.setting.inlineMax.label\":\"Small files in one row\",\"storage.setting.inlineMax.description\":\"Up to this size the content stays in the file's row and is read with one request to the database; past it, it goes in pieces. 0 = always in pieces (64 MB at most).\",\"storage.setting.dbChunk.label\":\"Pieces in the database\",\"storage.setting.dbChunk.description\":\"The size of each piece saved. It counts for the files written from now on: those already saved stay as they are. From 256 KB to 16 MB.\",\"storage.setting.cacheMax.label\":\"Copy in the browser\",\"storage.setting.cacheMax.description\":\"The browser keeps a copy of the files opened up to this size, to show them when the kernel does not answer. 0 = of all of them.\",\"storage.setting.quota.label\":\"Default quota\",\"storage.setting.quota.description\":\"The space of every user who has no quota of their own. 0 = no limit.\",\"storage.source.default\":\"Default\",\"storage.source.local\":\"Changed\",\"storage.source.user\":\"Own\",\"storage.source.locked\":\"Managed\",\"storage.reset\":\"Reset\",\"storage.size.unit\":\"Unit of {name}\",\"storage.size.invalid\":\"Write a number, 0 or more\",\"storage.mine.files\":\"Space of your files\",\"storage.size.noZero\":\"{name} cannot be 0\",\"storage.size.min\":\"{name}: at least {min}\",\"storage.size.max\":\"{name}: at most {max}\",\"storage.users.default.title\":\"Quota\",\"storage.users.title\":\"Users\",\"storage.users.admin\":\"administrator\",\"storage.users.quotaOf\":\"Quota of {name}\",\"storage.users.useDefault\":\"Use the default\",\"storage.users.custom\":\"Customize\",\"storage.users.unavailable\":\"Quotas not available\",\"storage.users.unavailableText\":\"The file system module of the kernel does not say the space used (fs-postgres 1.2.0 or newer does): update it from the AppStore.\",\"storage.error\":\"Settings of the kernel not read\",\"storage.retry\":\"Try again\",\"storage.loading\":\"Loading…\",\"computer.label\":\"Computer\",\"computer.description\":\"The program lilOS on this computer: start, window, devices and servers. These settings belong to the computer, not to your user.\",\"computer.loading\":\"Reading from the program…\",\"computer.error\":\"Not changed: {error}\",\"computer.program.label\":\"Program\",\"computer.program.title\":\"Program\",\"computer.program.version\":\"Version of the program\",\"computer.program.system\":\"Operating system\",\"computer.program.engine\":\"Page engine\",\"computer.program.kernel\":\"lilOS on this computer\",\"computer.program.kernelHint\":\"The kernel and the database the program runs here.\",\"computer.updates.title\":\"Updates of the program\",\"computer.updates.label\":\"Updates\",\"computer.updates.description\":\"Only the program: lilOS itself updates from the AppStore, as always.\",\"computer.updates.mac\":\"On macOS the program is not signed and cannot replace itself: a notification says when a new version is out.\",\"computer.updates.auto\":\"Automatic\",\"computer.updates.notify\":\"Notify me\",\"computer.updates.off\":\"Never\",\"computer.updates.check\":\"Last check\",\"computer.updates.checkButton\":\"Check now\",\"computer.updates.install\":\"Restart and update\",\"computer.updates.download\":\"Download\",\"computer.updates.never\":\"Not checked yet in this session.\",\"computer.updates.dev\":\"Development copy: no updates.\",\"computer.updates.current\":\"The program is up to date.\",\"computer.updates.available\":\"Version {version} is available.\",\"computer.updates.downloaded\":\"Version {version} is ready: it is installed when the program quits.\",\"computer.updates.failed\":\"Check failed: {error}\",\"computer.updates.checking\":\"Checking…\",\"computer.start.title\":\"Start and window\",\"computer.start.login\":\"Start with the computer\",\"computer.start.loginHint\":\"The kernel starts when you sign in to the computer; the window stays closed until you open it.\",\"computer.start.tray\":\"Closing the window keeps lilOS in the tray\",\"computer.start.trayHint\":\"Otherwise closing the window quits the program (and stops the kernel of this computer).\",\"computer.start.notifications\":\"System notifications\",\"computer.start.notificationsHint\":\"lilOS's notifications also appear in the computer's notification center when the window is not in front.\",\"computer.screen.label\":\"Screen\",\"computer.screen.title\":\"How lilOS is shown\",\"computer.screen.mode\":\"Mode\",\"computer.screen.window\":\"Window\",\"computer.screen.fullscreen\":\"Full screen\",\"computer.screen.kiosk\":\"Kiosk\",\"computer.screen.windowHint\":\"A window of the computer, with its frame.\",\"computer.screen.fullscreenHint\":\"lilOS covers the whole screen, the computer's taskbar or Dock too. F11 goes in and out.\",\"computer.screen.kioskHint\":\"lilOS stays full screen and cannot be closed: only an administrator of lilOS turns it off. With «Start with the computer» it is the only thing the computer shows.\",\"computer.screen.leave\":\"Leave the kiosk\",\"computer.screen.leaveHint\":\"Only an administrator of lilOS can do it.\",\"computer.screen.leaveButton\":\"Leave the kiosk\",\"computer.screen.leaveTitle\":\"Leave the kiosk\",\"computer.screen.leaveText\":\"An administrator of lilOS signs in to let lilOS out of the kiosk.\",\"computer.screen.adminName\":\"Administrator\",\"computer.screen.adminPassword\":\"Password\",\"computer.screen.notAdmin\":\"This user is not an administrator.\",\"computer.screen.monitor\":\"Monitor\",\"computer.screen.monitorHint\":\"Where lilOS goes in full screen and in kiosk.\",\"computer.screen.monitorSame\":\"The one the window is on\",\"computer.screen.primary\":\"main\",\"computer.screen.keys\":\"System keys to lilOS in full screen\",\"computer.screen.keysHint.win32\":\"The Windows key, Alt+Tab and Esc reach lilOS (Keyboard Lock). Ctrl+Alt+Del always stays with Windows.\",\"computer.screen.keysHint.darwin\":\"Esc and the other keys reach lilOS; in kiosk ⌘Tab and force quit are blocked by the system.\",\"computer.screen.keysHint.linux\":\"The keys reach lilOS (Keyboard Lock); in the session «lilOS» everything goes to lilOS.\",\"computer.screen.limitsTitle\":\"What the system allows\",\"computer.screen.limits.win32\":\"Windows always keeps Ctrl+Alt+Del. Putting lilOS in place of the Windows desktop (Shell Launcher) is only in Windows Enterprise and Education: on Home and Pro use kiosk with «Start with the computer».\",\"computer.screen.limits.darwin\":\"macOS hides the Dock and the menu bar and blocks ⌘Tab and force quit in kiosk. It does not let a program replace the Finder: for a dedicated Mac use an account of its own with lilOS in kiosk at start.\",\"computer.screen.limits.linux\":\"With the .deb or .rpm package, run once «sudo sh /opt/lilOS/resources/session/install-session.sh» (it needs cage): the session «lilOS» appears on the login screen and lilOS is the whole desktop.\",\"computer.hardware.label\":\"Hardware\",\"computer.hardware.title\":\"Use of devices\",\"computer.hardware.rule\":\"Apps use devices\",\"computer.hardware.ask\":\"Asking every time\",\"computer.hardware.declared\":\"Apps that declare it\",\"computer.hardware.all\":\"All apps\",\"computer.hardware.askHint\":\"Every port or device is picked by you in a lilOS window, once per device.\",\"computer.hardware.declaredHint\":\"The apps whose permissions (seen at installation) include a device use all of them without asking.\",\"computer.hardware.allHint\":\"Every app sees and uses every device without asking: only for dedicated computers (kiosks, laboratories).\",\"computer.hardware.adminOnly\":\"Only an administrator changes it.\",\"computer.hardware.devices\":\"What the computer has\",\"computer.hardware.none\":\"None\",\"computer.hardware.unnamed\":\"Without a name\",\"computer.hardware.cameras\":\"Cameras\",\"computer.hardware.microphones\":\"Microphones\",\"computer.hardware.serial\":\"Serial ports\",\"computer.hardware.usb\":\"USB devices\",\"computer.hardware.hid\":\"Input devices (HID)\",\"computer.hardware.gpu\":\"Graphics cards\",\"computer.hardware.active\":\"in use\",\"computer.hardware.webgpu\":\"WebGPU\",\"computer.hardware.printers\":\"Printers\",\"computer.hardware.default\":\"default\",\"computer.hardware.displays\":\"Monitors\",\"computer.hardware.drives\":\"Removable drives\",\"computer.hardware.driveSpace\":\"{free} free of {size}\",\"computer.hardware.eject\":\"Eject\",\"computer.hardware.noDrives\":\"No USB stick or memory card connected.\",\"computer.hardware.refresh\":\"Read again\",\"computer.folders.title\":\"Folders of the computer in Network\",\"computer.folders.readOnly\":\"read only\",\"computer.folders.none\":\"None yet: add the folders you want to use in lilOS.\",\"computer.folders.add\":\"Add a folder\",\"computer.folders.addHint\":\"Chosen with the computer's dialog: it appears in Network › This computer and is read and written where it is.\",\"computer.folders.addButton\":\"Choose…\",\"computer.folders.added\":\"«{name}» is in Network › This computer\",\"computer.hardware.portNumber\":\"Port {n}\",\"computer.credits.title\":\"Credits of the program\",\"computer.credits.site\":\"Site\",\"computer.servers.label\":\"Servers\",\"computer.servers.title\":\"The lilOS this program opens\",\"computer.servers.current\":\"this window\",\"computer.servers.trusted\":\"trusted\",\"computer.servers.untrusted\":\"not trusted: it cannot touch the computer\",\"computer.servers.status.running\":\"running\",\"computer.servers.status.starting\":\"starting\",\"computer.servers.status.stopped\":\"stopped\",\"computer.servers.status.failed\":\"stopped by an error\",\"computer.servers.open\":\"Open\",\"computer.servers.browser\":\"Open in the browser\",\"computer.servers.restart\":\"Restart the kernel\",\"computer.servers.remove\":\"Remove\",\"computer.servers.removeConfirm\":\"Remove it?\",\"computer.servers.addTitle\":\"Add a server\",\"computer.servers.address\":\"Address\",\"computer.servers.addressHint\":\"https:// (http:// only for this computer). Each server opens in its own window, with its own sign-in.\",\"computer.servers.trust\":\"Trusted server\",\"computer.servers.trustHint\":\"It may open files on this computer and change the program's settings. Only for servers you control.\",\"computer.servers.add\":\"Add\",\"about.label\":\"About\",\"about.description\":\"Version, environment and credits.\",\"about.version\":\"Version\",\"about.sdkVersion\":\"SDK version\",\"about.language\":\"Language\",\"about.browser\":\"Browser\",\"about.unknownBrowser\":\"Unknown\",\"credits.label\":\"Credits\",\"credits.libraries\":\"Libraries\",\"credits.indirect\":\"Libraries used by other libraries\",\"credits.fonts\":\"Fonts\",\"credits.tools\":\"Tools\",\"credits.usedBy\":\"used by {users}\",\"credits.via\":\"brought by {libraries}, in {users}\",\"credits.builds\":\"builds lilOS and its apps\",\"credits.optional\":\"optional\",\"credits.module\":\"{name} (kernel module)\",\"credits.fontUsedBy\":\"used by {users}\",\"credits.site\":\"Website\",\"credits.siteOf\":\"Website of {name}\",\"credits.keywords\":\"credits acknowledgements license libraries open source thanks\",\"userPage.label\":\"User page\",\"userPage.description\":\"What the page opened from your name shows\",\"userPage.title\":\"User page\",\"userPage.open.label\":\"Opened from your name\",\"userPage.open.description\":\"Click your name in the taskbar or at the bottom of the menu. Your name and photo are always there: choose here what else it shows.\",\"userPage.keywords\":\"user page profile account photo lock sign out restart {name}\",\"userPage.toggle\":\"{name} on the user page\",\"userPage.group.header\":\"Header\",\"userPage.group.actions\":\"Actions\",\"userPage.group.account\":\"Account\",\"userPage.group.session\":\"This session\",\"userPage.group.footer\":\"Footer\",\"userPage.item.details.name\":\"Username and role\",\"userPage.item.details.description\":\"Under your name: the name you sign in with and whether you are an administrator\",\"userPage.item.lock.name\":\"Lock\",\"userPage.item.lock.description\":\"Covers the screen until you enter your password again; apps stay open\",\"userPage.item.logout.name\":\"Sign out\",\"userPage.item.logout.description\":\"Saves, closes the apps and goes back to the sign-in screen\",\"userPage.item.restart.name\":\"Restart the system\",\"userPage.item.restart.description\":\"Restarts the lilOS kernel for every user; administrators only\",\"userPage.item.photo.name\":\"Profile photo\",\"userPage.item.photo.description\":\"Choose, change or remove your photo\",\"userPage.item.theme.name\":\"Theme\",\"userPage.item.theme.description\":\"Light or dark\",\"userPage.item.language.name\":\"Language\",\"userPage.item.language.description\":\"The language of apps\",\"userPage.item.settings.name\":\"All settings\",\"userPage.item.settings.description\":\"Opens Control Panel\",\"userPage.item.workspace.name\":\"Workspace\",\"userPage.item.workspace.description\":\"The one you are in and how many there are\",\"userPage.item.windows.name\":\"Open windows\",\"userPage.item.windows.description\":\"How many windows are open and how many apps work in the background\",\"userPage.item.startup.name\":\"At startup\",\"userPage.item.startup.description\":\"How many apps open when you come in\",\"userPage.item.storage.name\":\"Space used\",\"userPage.item.storage.description\":\"How much your files take up\",\"userPage.item.about.name\":\"lilOS version\",\"userPage.item.about.description\":\"The lilOS version and the address you are connected to\",\"notifications.label\":\"Notifications\",\"notifications.description\":\"How notifications appear when they arrive, and how many are kept\",\"notifications.arrive.title\":\"When they arrive\",\"notifications.shown.label\":\"Shown together\",\"notifications.shown.description\":\"How many appear one above the other over the notification area of the taskbar. Past this number the older ones are not shown there, but stay in the list.\",\"notifications.shown.keywords\":\"notifications bar popup tray count\",\"notifications.shown.field\":\"Notifications shown together\",\"notifications.seconds.label\":\"How long they stay\",\"notifications.seconds.description\":\"Seconds after the last one arrived. With the pointer over them they stay until you move it away.\",\"notifications.seconds.keywords\":\"notifications time seconds duration\",\"notifications.seconds.field\":\"How long notifications stay\",\"notifications.seconds.value\":{\"one\":\"{n} second\",\"other\":\"{n} seconds\"},\"notifications.list.title\":\"List\",\"notifications.keep.label\":\"Notifications kept\",\"notifications.keep.description\":\"When one more arrives the oldest is deleted. The bell in the notification area lists them all.\",\"notifications.keep.page\":\"Without the kernel's notifications module they are kept only until lilOS reloads.\",\"notifications.keep.keywords\":\"notifications history list keep limit\",\"notifications.keep.field\":\"Notifications kept\",\"notifications.test.label\":\"Try\",\"notifications.test.description\":\"Sends you a notification, to see how it looks.\",\"notifications.test.button\":\"Send a test notification\",\"notifications.test.text\":\"Test notification: notifications work.\",\"notifications.error\":\"Not saved: {message}\",\"@name\":\"Control Panel\",\"@description\":\"Appearance, language, desk, user page, workspaces, notifications, tags, shortcuts, file types, startup services and apps, storage.\",\"@entrypoints.main.params.tab.label\":\"Section\",\"@entrypoints.main.params.tab.options.appearance.label\":\"Appearance\",\"@entrypoints.main.params.tab.options.language.label\":\"Language\",\"@entrypoints.main.params.tab.options.desk.label\":\"Desk\",\"@entrypoints.main.params.tab.options.userpage.label\":\"User page\",\"@entrypoints.main.params.tab.options.workspaces.label\":\"Workspaces\",\"@entrypoints.main.params.tab.options.notifications.label\":\"Notifications\",\"@entrypoints.main.params.tab.options.tags.label\":\"Tags\",\"@entrypoints.main.params.tab.options.usability.label\":\"Usability\",\"@entrypoints.main.params.tab.options.apps.label\":\"Apps\",\"@entrypoints.main.params.tab.options.startup.label\":\"Startup\",\"@entrypoints.main.params.tab.options.onedrive.label\":\"OneDrive\",\"@entrypoints.main.params.tab.options.microsoft.label\":\"Microsoft app\",\"@entrypoints.main.params.tab.options.google.label\":\"Google project\",\"@entrypoints.main.params.tab.options.storage.label\":\"Storage\",\"@entrypoints.main.params.tab.options.about.label\":\"About\",\"pipes.label\":\"Pipes\",\"pipes.title\":\"Pipes on events\",\"pipes.keywords\":\"pipes events handlers order chain\",\"pipes.intro.label\":\"What apps do when something happens\",\"pipes.intro.description\":\"Apps can step in when a file is opened, read or saved, or look at what happens in the system; an app can also add events of its own. Below, each event with its handlers in the order they run ({count} events in all). The after stage runs in the reverse order of before.\",\"pipes.unsupported\":\"This version of lilOS has no pipes\",\"pipes.lilos\":\"lilOS\",\"pipes.up\":\"Up\",\"pipes.down\":\"Down\",\"pipes.stage.before\":\"Before\",\"pipes.stage.after\":\"After\",\"pipes.band.first\":\"among the first\",\"pipes.band.middle\":\"in the middle\",\"pipes.band.last\":\"among the last\",\"pipes.where.all\":\"every item\",\"pipes.where.system\":\"chosen by lilOS\",\"pipes.where.own\":\"the files it marked\",\"pipes.where.ext\":\"files {list}\",\"pipes.where.type.file\":\"files\",\"pipes.where.type.folder\":\"folders\",\"pipes.where.type.app\":\"app shortcuts\",\"pipes.where.app\":\"apps {list}\",\"pipes.reset.label\":\"Order of the handlers\",\"pipes.reset.description\":\"You changed it: go back to the order of installation\",\"pipes.idle.title\":\"Events without handlers\",\"pipes.idle.description\":\"{count} events: no app handles them now\",\"pipes.idle.none\":\"Every event has a handler\",\"pipes.owned\":\"{label} (of {app})\",\"pipes.event.file.open\":\"Opening a file\",\"pipes.event.file.read\":\"Reading a file\",\"pipes.event.file.write\":\"Saving a file\",\"pipes.event.app.launch\":\"Starting an app\",\"pipes.event.file.create\":\"Creating an item\",\"pipes.event.file.rename\":\"Renaming\",\"pipes.event.file.move\":\"Moving\",\"pipes.event.file.copy\":\"Copying a file\",\"pipes.event.file.remove\":\"Deleting for good\",\"pipes.event.trash.put\":\"Moving to the Trash\",\"pipes.event.trash.restore\":\"Restoring from the Trash\",\"pipes.event.trash.purge\":\"Emptying the Trash\",\"pipes.event.tags.assign\":\"Tags of an item\",\"pipes.event.window.open\":\"Opening a window\",\"pipes.event.device.attach\":\"Device connected\",\"pipes.event.device.detach\":\"Device disconnected\",\"pipes.event.window.close\":\"Closing a window\",\"pipes.event.workspace.switch\":\"Changing workspace\",\"pipes.event.settings.change\":\"Changing a setting\",\"pipes.event.system.ready\":\"System ready\",\"pipes.event.session.login\":\"User signed in\",\"pipes.event.session.logout\":\"Signing out\",\"pipes.event.apps.install\":\"Installing an app\",\"pipes.event.apps.update\":\"Updating an app\",\"pipes.event.apps.remove\":\"Removing an app\",\"pipes.event.permissions.change\":\"Permissions of an app\",\"pipes.event.settings.system\":\"System settings\",\"pipes.event.pipes.change\":\"Subscriptions to pipes\",\"network.label\":\"Network\",\"network.description\":\"Where the kernel may connect for users: Rete folder, Terminal, NetTest\",\"network.loading\":\"Reading the rules…\",\"network.error\":\"The rules could not be read\",\"network.saved\":\"Network rules saved\",\"network.single\":\"One user, no sign-in\",\"network.singleText\":\"Now the kernel connects anywhere, as you could yourself. These rules apply when users sign in to lilOS.\",\"network.exception\":\"Exceptions for the users\",\"network.local.label\":\"This computer (localhost)\",\"network.local.description\":\"127.0.0.1 and ::1: test servers, databases and services on the computer of the kernel. Users could reach the kernel’s own services too: open it only if you trust them.\",\"network.private.label\":\"The whole local network\",\"network.private.description\":\"10.x, 172.16–31.x, 192.168.x, 100.64.x and the private IPv6 addresses: printers, NAS, routers, the office’s servers.\",\"network.ranges.label\":\"Only these addresses\",\"network.ranges.description\":\"Addresses or ranges allowed even when the rest stays closed, separated by commas: 192.168.1.50/32 (one NAS), 10.0.5.0/24.\",\"network.always\":\"Always closed, whatever the exceptions: link-local addresses (cloud metadata, 169.254.x), multicast and reserved addresses. A name is checked again at every connection, on the address it really points to.\",\"logic.label\":\"Logic Studio\",\"logic.description\":\"The engine of Logic Studio: what your programs use, and for admins limits and quotas of everybody.\",\"logic.loading\":\"Reading…\",\"logic.noEngine\":\"The engine of Logic Studio (module logicstudio-engine) is not installed or does not answer.\",\"logic.noSettings\":\"Only an administrator sees the settings of the engine.\",\"logic.mine.label\":\"My use\",\"logic.mine.usage\":\"What my programs use\",\"logic.mine.programs\":\"My programs\",\"logic.active\":\"Active programs\",\"logic.activeHint\":\"They run also with lilOS closed.\",\"logic.tests\":\"Tests running\",\"logic.testsHint\":\"A test stops by itself after {min} minutes.\",\"logic.net\":\"Network requests this minute\",\"logic.log\":\"Log\",\"logic.cpuMem\":\"CPU and memory\",\"logic.cpuMemValue\":\"at most {cpu}% · {mem} MB\",\"logic.noPrograms\":\"No programs\",\"logic.program\":\"Program\",\"logic.user\":\"User\",\"logic.kind\":\"Kind\",\"logic.state\":\"State\",\"logic.since\":\"Since\",\"logic.kind.test\":\"Test\",\"logic.kind.active\":\"Active\",\"logic.state.starting\":\"Starting\",\"logic.state.running\":\"Running\",\"logic.state.stopped\":\"Stopped\",\"logic.state.failed\":\"Stopped by an error\",\"logic.state.waiting\":\"Waiting for a package\",\"logic.stop\":\"Stop\",\"logic.stopConfirm\":\"Stop it\",\"logic.forget\":\"Remove\",\"logic.limits.label\":\"Limits\",\"logic.limits.all\":\"For all users\",\"logic.limits.schemas\":\"Schemas\",\"logic.limits.projects\":\"Projects\",\"logic.limits.when\":\"When they count\",\"logic.limits.whenHint\":\"For the programs that start from now: the running ones keep the limits they started with.\",\"logic.quota.label\":\"Quotas\",\"logic.quota.defaults\":\"Quotas of every user\",\"logic.quota.users\":\"A user's own quotas\",\"logic.quota.usersHint\":\"Empty: the quota of every user (shown in grey). A number: that user's own.\",\"logic.quota.maxActive\":\"Active\",\"logic.quota.maxTests\":\"Tests\",\"logic.quota.cpuPercent\":\"CPU %\",\"logic.quota.memoryMb\":\"Memory MB\",\"logic.quota.netPerMinute\":\"Requests/min\",\"logic.quota.logMb\":\"Log MB\",\"logic.reset\":\"Default\",\"logic.running.label\":\"Running\",\"logic.running.title\":\"Programs of every user\",\"logic.packages.label\":\"Packages\",\"logic.packages.title\":\"Packages of blocks and components\",\"logic.packages.counts\":\"{blocks} blocks · {components} components\",\"logic.packages.more\":\"More packages\",\"logic.packages.moreHint\":\"New blocks and components come with kernel modules: install them from the AppStore.\",\"logic.kind.app\":\"App (not installed)\",\"logic.kind.cli\":\"Command line\"}}"),
	it: /* @__PURE__ */ JSON.parse("{\"strings\":{\"window.title\":\"Pannello di controllo\",\"cloud.onedrive.label\":\"OneDrive\",\"cloud.onedrive.description\":\"Le cartelle condivise, Carica su OneDrive e apri, Office online.\",\"cloud.onedrive.keywords\":\"onedrive microsoft office online azure word excel powerpoint condivisi condivise\",\"cloud.onedrive.settings\":\"OneDrive (per tutti su questo lilOS)\",\"cloud.gdrive.label\":\"Google Drive\",\"cloud.gdrive.description\":\"Condivisi con me, il formato dei documenti Google.\",\"cloud.gdrive.keywords\":\"google drive documenti fogli presentazioni cloud condivisi esporta\",\"cloud.gdrive.settings\":\"Google Drive (per tutti su questo lilOS)\",\"cloud.gphotos.label\":\"Google Foto\",\"cloud.gphotos.description\":\"Importa da Google Foto e gli album creati da lilOS.\",\"cloud.gphotos.keywords\":\"google foto picker album importa cloud\",\"cloud.gphotos.settings\":\"Google Foto (per tutti su questo lilOS)\",\"cloud.azblob.label\":\"Azure Blob Storage\",\"cloud.azblob.description\":\"L’accesso con Microsoft Entra (chiave dell’account e SAS non chiedono niente).\",\"cloud.azblob.keywords\":\"azure blob storage entra microsoft contenitore sas chiave data lake\",\"cloud.azblob.settings\":\"Azure Blob Storage (per tutti su questo lilOS)\",\"cloud.localfolders.label\":\"Cartelle del computer\",\"cloud.localfolders.description\":\"Quali cartelle del computer del kernel possono collegare in Rete gli utenti che non sono amministratori.\",\"cloud.localfolders.keywords\":\"cartelle computer locale disco usb rete permessi\",\"cloud.localfolders.settings\":\"Cartelle di questo computer (per tutti su questo lilOS)\",\"cloud.localfolders.steps.title\":\"Come funziona\",\"cloud.localfolders.steps.label\":\"Chi collega cosa\",\"cloud.localfolders.steps.1\":\"Gli amministratori collegano qualsiasi cartella del computer su cui gira il kernel (Rete → Connetti a un server → Questo computer).\",\"cloud.localfolders.steps.2\":\"Gli altri utenti collegano solo le cartelle elencate qui, o cartelle dentro di esse, con i permessi dell'utente del computer che fa girare il kernel.\",\"cloud.nfs.label\":\"NFS\",\"cloud.nfs.description\":\"UID e GID di ogni utente sui server NFS.\",\"cloud.nfs.keywords\":\"nfs uid gid nas linux esportazione identità\",\"cloud.nfs.settings\":\"Identità sui server NFS (per tutti su questo lilOS)\",\"cloud.nfs.you\":\"Il tuo nome utente\",\"cloud.nfs.you.description\":\"Il nome da scrivere nella tua riga\",\"cloud.nfs.steps.title\":\"Sul server NFS\",\"cloud.nfs.steps.label\":\"Cosa controllare\",\"cloud.nfs.steps.1\":\"La cartella è esportata all’indirizzo del computer su cui gira il kernel di lilOS, con NFSv3 su TCP.\",\"cloud.nfs.steps.2\":\"Se il kernel di lilOS non può usare una porta sotto la 1024 (Linux senza privilegi), permetti le altre porte: «insecure» in /etc/exports, «Consenti connessioni da porte non privilegiate» su Synology.\",\"cloud.nfs.steps.3\":\"UID e GID qui sono quelli degli utenti sul server: chi li ha legge e scrive i loro file.\",\"cloud.nfs.steps.4\":\"Con più utenti, la rete locale deve essere aperta al kernel (net.allowPrivate o net.allow in config.json).\",\"cloud.status\":\"Stato\",\"cloud.adminOnly\":\"Solo un amministratore cambia queste impostazioni\",\"cloud.ready\":\"Pronto\",\"cloud.notReady\":\"Non ancora impostato\",\"cloud.error\":\"Impostazioni non lette\",\"cloud.saved\":\"Salvato\",\"cloud.notSaved\":\"Non salvato\",\"cloud.addresses.title\":\"Indirizzi da registrare\",\"cloud.redirect.label\":\"Finestra di accesso\",\"cloud.redirect.google\":\"L’indirizzo di questo lilOS, a cui Google rimanda la finestra\",\"cloud.redirect.unusable\":\"lilOS è aperto su http fuori da questo computer: qui la finestra di accesso non funziona, si accede incollando l’indirizzo (o apri lilOS su https)\",\"cloud.byHand.label\":\"Accesso incollando l’indirizzo\",\"cloud.byHand.google\":\"Dove Google finisce quando lilOS non è su https: una pagina che non si apre, di cui l’utente incolla l’indirizzo\",\"cloud.copy\":\"Copia\",\"cloud.copied\":\"Copiato\",\"cloud.azblob.steps.title\":\"Come accedere con Microsoft Entra\",\"cloud.azblob.steps.label\":\"Passi\",\"cloud.azblob.steps.1\":\"Solo per l’accesso con un account Microsoft: con la chiave dell’account o un token SAS non serve niente.\",\"cloud.azblob.steps.2\":\"L’app Microsoft (la sua scheda qui) deve avere l’autorizzazione API Azure Storage → user_impersonation (delegata).\",\"cloud.azblob.steps.3\":\"Sull’account di archiviazione dai agli utenti il ruolo «Collaboratore ai dati dei BLOB di archiviazione» (Controllo di accesso).\",\"cloud.microsoft.label\":\"App Microsoft\",\"cloud.microsoft.description\":\"L’app su Azure con cui accedono OneDrive e Azure Blob Storage.\",\"cloud.microsoft.keywords\":\"microsoft azure entra registrazione app client id tenant onedrive blob\",\"cloud.microsoft.settings\":\"App su Azure (per tutti su questo lilOS)\",\"cloud.microsoft.steps.title\":\"Come registrare l’app su Azure\",\"cloud.microsoft.steps.label\":\"Passi\",\"cloud.microsoft.steps.1\":\"portal.azure.com → Registrazioni app → Nuova registrazione (basta un account Azure gratuito).\",\"cloud.microsoft.steps.2\":\"Tipi di account supportati: gli stessi di «Account ammessi» qui.\",\"cloud.microsoft.steps.3\":\"Autenticazione → Applicazioni per dispositivi mobili e desktop: i due indirizzi qui sopra; Consenti flussi client pubblici: Sì.\",\"cloud.microsoft.steps.4\":\"Autorizzazioni API, delegate: per OneDrive Microsoft Graph Files.ReadWrite, User.Read, offline_access (Files.ReadWrite.All per le cartelle condivise); per Azure Blob Storage Azure Storage → user_impersonation.\",\"cloud.microsoft.steps.5\":\"Copia l’ID dell’applicazione (client) nel campo qui sopra.\",\"cloud.google.label\":\"Progetto Google\",\"cloud.google.description\":\"Il progetto Google Cloud con cui accedono Google Drive e Google Foto.\",\"cloud.google.keywords\":\"google cloud progetto oauth client id segreto drive foto\",\"cloud.google.settings\":\"Progetto Google Cloud (per tutti su questo lilOS)\",\"cloud.google.steps.title\":\"Come creare il progetto su Google Cloud\",\"cloud.google.steps.label\":\"Passi\",\"cloud.google.steps.1\":\"console.cloud.google.com → Nuovo progetto (per esempio «lilOS»).\",\"cloud.google.steps.2\":\"API e servizi → Libreria → abilita Google Drive API; per Google Foto anche Google Photos Picker API e Photos Library API.\",\"cloud.google.steps.3\":\"Schermata di consenso OAuth: Interno con Google Workspace; altrimenti Esterno, poi Pubblica l’app (in «Test» l’accesso scade ogni 7 giorni). Ambiti: …/auth/drive; per Google Foto photospicker.mediaitems.readonly, photoslibrary.appendonly, photoslibrary.readonly.appcreateddata, photoslibrary.edit.appcreateddata.\",\"cloud.google.steps.4\":\"Credenziali → Crea ID client OAuth → Applicazione web, con i due indirizzi qui sopra come URI di reindirizzamento autorizzati (oppure App desktop: allora sempre incollando l’indirizzo).\",\"cloud.google.steps.5\":\"Copia l’ID client e il segreto client qui sopra.\",\"cloud.google.steps.6\":\"Al primo accesso Google dice che l’app non è verificata: è il tuo progetto, Continua.\",\"cloud.google.steps.7\":\"Dal 2025 Google fa vedere alle app solo le foto che l’utente sceglie e gli album creati dall’app.\",\"cloud.uses.microsoft\":\"App Microsoft\",\"cloud.uses.google\":\"Progetto Google\",\"cloud.uses.description\":\"L’accesso usa l’app registrata presso il fornitore: si imposta una volta nella sua scheda, per tutti i servizi di quel fornitore.\",\"cloud.uses.open\":\"Apri\",\"cloud.signAgain\":\"Le connessioni chiedono di rifare l’accesso, per accettare i nuovi permessi.\",\"cloud.redirect.microsoft\":\"L’indirizzo di questo lilOS, a cui Microsoft rimanda la finestra\",\"cloud.byHand.microsoft\":\"Dove Microsoft finisce quando lilOS non è su https: una pagina che non si apre, di cui l’utente incolla l’indirizzo\",\"onedrive.upload.title\":\"Carica su OneDrive e apri\",\"onedrive.upload.mount.label\":\"Connessione\",\"onedrive.upload.mount.description\":\"Dove vanno i documenti Office della tua Home prima di aprirsi in Office online.\",\"onedrive.upload.mount.none\":\"Prima collega OneDrive: File Manager → Rete → +.\",\"onedrive.upload.mount.ask\":\"Chiedi ogni volta\",\"onedrive.upload.folder.label\":\"Cartella\",\"onedrive.upload.folder.description\":\"Su OneDrive (creata se manca). L’originale resta nella Home: quello che cambi in Office cambia nella copia.\",\"onedrive.upload.exists.label\":\"Un file con lo stesso nome\",\"onedrive.upload.exists.description\":\"Quando la cartella su OneDrive ne ha già uno.\",\"onedrive.upload.exists.ask\":\"Chiedi\",\"onedrive.upload.exists.keep\":\"Tieni entrambi\",\"onedrive.upload.exists.replace\":\"Sostituiscilo\",\"onedrive.office.title\":\"Documenti Office\",\"onedrive.office.doubleClick.label\":\"Il doppio clic apre Office online\",\"onedrive.office.doubleClick.description\":\"Documenti Word, Excel e PowerPoint di OneDrive, quando per il loro tipo non è scelta un’app di lilOS (Usabilità → Tipi di file).\",\"group.system\":\"Sistema\",\"group.data\":\"Dati\",\"common.name\":\"Nome\",\"common.color\":\"Colore\",\"common.items\":\"Elementi\",\"common.create\":\"Crea\",\"common.add\":\"Aggiungi\",\"common.addMore\":\"Aggiungi…\",\"common.remove\":\"Togli\",\"common.delete\":\"Elimina…\",\"common.deleteNow\":\"Elimina\",\"common.reset\":\"Ripristina\",\"common.confirm\":\"Conferma\",\"common.loading\":\"Lettura…\",\"common.unavailable\":\"Non disponibile\",\"common.yes\":\"Sì\",\"common.no\":\"No\",\"appearance.label\":\"Aspetto\",\"appearance.description\":\"Colori e movimento dell’interfaccia.\",\"appearance.colors.label\":\"Colori\",\"appearance.theme.label\":\"Tema\",\"appearance.theme.description\":\"Chiaro o scuro: scrivania, barra, menu e finestre\",\"appearance.theme.keywords\":\"tema chiaro scuro dark light notte\",\"appearance.theme.light\":\"Chiaro\",\"appearance.theme.dark\":\"Scuro\",\"appearance.accent.title\":\"Colore principale\",\"appearance.accent.description\":\"Selezione, pulsanti, tab attivi e logo\",\"appearance.accent.keywords\":\"accento tema\",\"appearance.motion.label\":\"Movimento\",\"appearance.animations.label\":\"Animazioni\",\"appearance.animations.description\":\"Spostamenti della vista, menu e transizioni. Se il sistema operativo chiede movimento ridotto, restano ridotte.\",\"appearance.animations.keywords\":\"movimento transizioni\",\"language.label\":\"Lingua\",\"language.description\":\"La lingua di lilOS e delle app: i testi, le date e i numeri.\",\"language.title\":\"Lingua del sistema\",\"language.row.description\":\"Le app che non hanno questa lingua usano l’inglese. I testi di lilOS sono ancora in italiano.\",\"language.row.packs\":\"I testi di lilOS vengono dal pacchetto di questa lingua (l’inglese non ne ha bisogno). Ogni app usa la propria traduzione se ce l’ha, altrimenti l’inglese.\",\"language.more.label\":\"Altre lingue\",\"language.more.description\":\"I pacchetti di lingua del repository ufficiale, nell’AppStore: ogni utente può installarne uno, e vale per tutti.\",\"language.more.button\":\"Apri AppStore\",\"language.more.keywords\":\"altre lingue pacchetto lingua installa appstore traduzione\",\"language.keywords\":\"lingua traduzione inglese italiano date numeri language locale\",\"language.auto\":\"Automatica: {name}\",\"desk.label\":\"Scrivania\",\"desk.description\":\"Comportamento della scrivania infinita.\",\"desk.fixed.title\":\"Elementi fissi\",\"desk.fixed.label\":\"Sulla scrivania\",\"desk.fixed.descriptionSwitchable\":\"Quelli attivi ci sono sulla scrivania di ogni workspace. Si aprono e si spostano come gli altri, ma non si rinominano e non si eliminano: si tolgono da qui.\",\"desk.fixed.description\":\"Ci sono sulla scrivania di ogni workspace. Si aprono e si spostano come gli altri, ma non si rinominano e non si eliminano.\",\"desk.fixed.keywords\":\"elementi fissi scrivania mostra nascondi elimina {name}\",\"desk.fixed.toggle\":\"{name} sulla scrivania\",\"desk.fixed.toggleIn\":\"{name} sulla scrivania di {workspace}\",\"desk.fixed.always\":\"Fisso\",\"desk.fixed.item.home.name\":\"Home\",\"desk.fixed.item.home.description\":\"La cartella principale, con tutte le altre\",\"desk.fixed.item.documents.name\":\"Documenti\",\"desk.fixed.item.documents.description\":\"La cartella Documenti, condivisa da tutti i workspace\",\"desk.fixed.item.images.name\":\"Immagini\",\"desk.fixed.item.images.description\":\"La cartella Immagini, condivisa da tutti i workspace\",\"desk.fixed.item.files.name\":\"File Manager\",\"desk.fixed.item.files.description\":\"Apre il File Manager\",\"desk.fixed.item.downloads.name\":\"Download\",\"desk.fixed.item.downloads.description\":\"La cartella Download, condivisa da tutti i workspace\",\"desk.fixed.item.trash.name\":\"Cestino\",\"desk.fixed.item.trash.description\":\"Apre il cestino; ci si possono trascinare file e cartelle\",\"desk.fixed.descriptionWorkspace\":\"Quelli attivi ci sono sulla scrivania di questo workspace. Si aprono e si spostano come gli altri, ma non si rinominano e non si eliminano: si tolgono da qui.\",\"desk.fixed.descriptionAll\":\"Accendi o spegni un elemento in tutti i workspace insieme; i workspace nuovi lo hanno uguale. Ogni workspace poi lo può cambiare nel suo tab.\",\"desk.fixed.some\":\"Acceso in {on} workspace su {n}\",\"desk.fixed.toggleAll\":\"{name} su tutte le scrivanie\",\"desk.fixed.moved.label\":\"Ogni workspace ha i suoi\",\"desk.fixed.moved.description\":\"Si scelgono in Workspace: nel tab di ogni workspace, o in Tutti per tutte le scrivanie.\",\"desk.fixed.moved.keywords\":\"elementi fissi scrivania home documenti cestino workspace\",\"desk.fixed.moved.open\":\"Apri\",\"desk.placement.title\":\"Posizionamento\",\"desk.snap.label\":\"Allinea alla griglia\",\"desk.snap.description\":\"Gli elementi trascinati si allineano a una griglia invisibile\",\"desk.snap.keywords\":\"icone snap\",\"desk.previews.title\":\"Icone\",\"desk.previews.label\":\"Mostra l’anteprima dei file\",\"desk.previews.description\":\"Al posto dell’icona, i file mostrano una piccola immagine di quello che contengono, fatta dall’app che li apre (Photo, Editor…)\",\"desk.previews.keywords\":\"anteprime miniature icone immagini file\",\"desk.background.label\":\"Sfondo\",\"desk.background.color.title\":\"Colore\",\"desk.background.color.description\":\"Dietro gli elementi, e intorno alle immagini trasparenti\",\"desk.background.color.keywords\":\"sfondo colore scrivania desktop\",\"desk.background.custom.label\":\"Altro colore\",\"desk.background.custom.description\":\"Un colore a scelta\",\"desk.background.theme.label\":\"Colore del tema\",\"desk.background.theme.description\":\"Torna al colore del tema chiaro o scuro\",\"desk.background.theme.button\":\"Usa il colore del tema\",\"desk.background.image.title\":\"Immagine\",\"desk.background.image.label\":\"Immagine di sfondo\",\"desk.background.image.keywords\":\"sfondo immagine foto scrivania desktop wallpaper\",\"desk.background.image.current\":\"«{name}»: alta quanto la scrivania, con le sue proporzioni (se è più larga si taglia ai lati); non si sposta né si ingrandisce con lei\",\"desk.background.image.none\":\"Nessuna: solo il colore. Nel menu di un'immagine sulla scrivania: Usa come sfondo desktop\",\"desk.background.image.choose\":\"Scegli…\",\"desk.background.image.pick\":\"Scegli l'immagine di sfondo\",\"desk.background.image.remove.label\":\"Togli l'immagine\",\"desk.background.image.remove.description\":\"Il file resta dov'è\",\"desk.background.image.remove.button\":\"Togli\",\"desk.overview.label\":\"Panoramica\",\"desk.overview.title\":\"Pannello in basso a destra\",\"desk.minimap.label\":\"Mostra la minimappa\",\"desk.minimap.keywords\":\"mappa miniatura\",\"workspaces.label\":\"Workspace\",\"workspaces.description\":\"Scrivanie separate, ognuna con i suoi elementi, finestre e app. I file fuori dalla scrivania sono di tutti.\",\"workspaces.current.label\":\"Questo workspace\",\"workspaces.current.title\":\"Workspace\",\"workspaces.all.label\":\"Tutti\",\"workspaces.name.keywords\":\"rinomina workspace\",\"workspaces.name.field\":\"Nome del workspace\",\"workspaces.description.label\":\"Descrizione\",\"workspaces.description.description\":\"Una riga su a cosa serve il workspace, sotto il suo nome in fondo al menu di avvio\",\"workspaces.description.keywords\":\"descrizione workspace note menu di avvio\",\"workspaces.description.field\":\"Descrizione del workspace\",\"workspaces.description.placeholder\":\"A cosa ti serve\",\"workspaces.color.description\":\"Il pallino nella barra in basso e accanto ai suoi file nel File Manager\",\"workspaces.color.keywords\":\"colore workspace\",\"workspaces.owned.label\":\"File, cartelle e collegamenti\",\"workspaces.owned.description\":\"Creati in questo workspace, sulla scrivania e nelle cartelle condivise\",\"workspaces.apps.title\":\"App\",\"workspaces.apps.system\":\"App di sistema: c’è in ogni workspace\",\"workspaces.apps.installed\":\"Installata in lilOS: qui la puoi nascondere\",\"workspaces.apps.keywords\":\"app nascondi mostra {name}\",\"workspaces.apps.alwaysVisible\":\"Sempre visibile\",\"workspaces.apps.toggle\":\"{name} visibile in questo workspace\",\"workspaces.apps.toggleIn\":\"{name} visibile in {workspace}\",\"workspaces.list.current\":\"{name} (attuale)\",\"workspaces.list.owned\":{\"one\":\"{n} elemento creato\",\"other\":\"{n} elementi creati\"},\"workspaces.list.apps\":{\"one\":\"{n} app\",\"other\":\"{n} app\"},\"workspaces.list.keywords\":\"workspace passa elimina\",\"workspaces.list.switch\":\"Passa a questo\",\"workspaces.switch.label\":\"Vai a questo workspace\",\"workspaces.new.label\":\"Nuovo workspace\",\"workspaces.new.description\":\"Con la scrivania vuota e tutte le app visibili\",\"workspaces.taskbar.title\":\"Barra delle applicazioni\",\"workspaces.taskbar.label\":\"Workspace nella barra\",\"workspaces.taskbar.description\":\"Solo quello attuale, oppure un pulsante per ogni workspace in fila, per cambiare con un clic\",\"workspaces.taskbar.keywords\":\"barra applicazioni in basso workspace elenco tutti attuale\",\"workspaces.taskbar.current\":\"Solo l'attuale\",\"workspaces.taskbar.all\":\"Tutti\",\"workspaces.deleting.title\":\"Eliminare un workspace\",\"workspaces.deleting.files.label\":\"I file restano\",\"workspaces.deleting.files.description\":\"La sua scrivania diventa la cartella Documenti/Scrivania di <nome> (se non è vuota); i file creati altrove restano dove sono, segnati come suoi.\",\"workspaces.deleting.windows.label\":\"Le finestre restano\",\"workspaces.deleting.windows.description\":\"Le sue finestre aperte passano nel workspace attuale, con le modifiche non salvate. Workarea, vista e app nascoste si perdono.\",\"tags.label\":\"Tag\",\"tags.description\":\"Etichette colorate per ritrovare file e cartelle ovunque siano. Un tag invisibile nasconde i suoi elementi.\",\"tags.new.title\":\"Nuovo tag\",\"tags.new.pending\":{\"one\":\"Il nuovo tag andrà su {n} elemento selezionato\",\"other\":\"Il nuovo tag andrà su {n} elementi selezionati\"},\"tags.new.description\":\"Poi si assegna dal menu del tasto destro → Tag, sulla scrivania e nel File Manager\",\"tags.new.keywords\":\"nuovo tag crea etichetta\",\"tags.new.placeholder\":\"Per esempio: Urgente\",\"tags.new.field\":\"Nome del nuovo tag\",\"tags.name.keywords\":\"rinomina tag\",\"tags.name.field\":\"Nome del tag {name}\",\"tags.color.keywords\":\"colore tag\",\"tags.visible.label\":\"Visibile\",\"tags.visible.on\":\"Gli elementi con questo tag si vedono ovunque\",\"tags.visible.off\":\"Gli elementi con questo tag sono nascosti ovunque: si ritrovano nel File Manager → Tag\",\"tags.visible.keywords\":\"nascondi mostra invisibile tag\",\"tags.visible.toggle\":\"Tag {name} visibile\",\"tags.items.description\":{\"one\":\"{n} elemento in questo workspace e nelle cartelle condivise\",\"other\":\"{n} elementi in questo workspace e nelle cartelle condivise\"},\"tags.items.show\":\"Mostra nel File Manager\",\"tags.items.delete\":\"Elimina il tag\",\"usability.label\":\"Usabilità\",\"usability.description\":\"Tastiera, mouse, app che aprono i file, menu contestuali e cestino.\",\"shortcuts.label\":\"Scorciatoie\",\"shortcuts.title\":\"Scorciatoie da tastiera\",\"shortcuts.all.label\":\"Tutte le scorciatoie\",\"shortcuts.all.description\":\"Le modifiche valgono subito. Per registrare una combinazione premi +, poi i tasti; Esc annulla.\",\"shortcuts.all.reset\":\"Ripristina tutte\",\"shortcuts.keywords\":\"scorciatoia tasti {keys}\",\"shortcuts.mouse.title\":\"Mouse\",\"shortcuts.lasso.label\":\"Selezione a mano libera\",\"shortcuts.lasso.description\":\"Disegna un percorso chiuso: si selezionano gli elementi che contiene\",\"shortcuts.lasso.keywords\":\"lazo lasso percorso selezione alt\",\"shortcuts.rectangle.label\":\"Selezione a rettangolo\",\"shortcuts.rectangle.control\":\"Trascina sullo sfondo\",\"shortcuts.addToSelection.label\":\"Aggiungere alla selezione\",\"shortcuts.addToSelection.control\":\"Ctrl o Shift + clic o trascinamento\",\"shortcuts.pan.label\":\"Spostarsi sulla scrivania\",\"shortcuts.pan.control\":\"Spazio + trascina, o tasto centrale\",\"shortcuts.fixed.title\":\"Tasti fissi\",\"shortcuts.navigate.label\":\"Muoversi nei menu, nelle liste e nei tab\",\"shortcuts.navigate.control\":\"Frecce, Invio, Esc\",\"shortcuts.rename.label\":\"Confermare o annullare la rinomina\",\"shortcuts.rename.control\":\"Invio, Esc\",\"fileTypes.label\":\"Tipi di file\",\"fileTypes.title\":\"App per tipo di file\",\"fileTypes.all.label\":\"Tutti i tipi di file\",\"fileTypes.all.description\":\"Aprendo un file, lilOS usa l’app scelta qui. Con «Chiedi ogni volta» compare la finestra Apri con.\",\"fileTypes.all.reset\":\"Ripristina tutti\",\"fileTypes.noExtension\":\"Senza estensione\",\"fileTypes.default\":\"Predefinita: {app}\",\"fileTypes.noDefault\":\"Nessuna app predefinita\",\"fileTypes.keywords\":\"tipo file estensione apri con {ext}\",\"fileTypes.field\":\"App per .{ext}\",\"fileTypes.fieldNoExtension\":\"App per i file senza estensione\",\"fileTypes.ask\":\"Chiedi ogni volta\",\"fileTypes.others\":\"Altri\",\"menu.label\":\"Menu contestuale\",\"menu.separator\":\"— Separatore —\",\"menu.submenu\":{\"one\":\"Sottomenu · {n} voce\",\"other\":\"Sottomenu · {n} voci\"},\"menu.create.folder\":\"Crea la cartella «{name}»\",\"menu.create.file\":\"Crea il file «{name}»\",\"menu.create.fileFromTemplate\":\"Crea il file «{name}» dal modello {template}\",\"menu.create.fileWithContent\":\"Crea il file «{name}» con un contenuto iniziale\",\"menu.create.deletedTemplate\":\"(file eliminato)\",\"menu.launch\":\"Apre l’app {name}\",\"menu.action\":\"Azione\",\"menu.keywords\":\"menu contestuale voce separatore nuovo\",\"menu.moveUp\":\"Sposta su\",\"menu.moveDown\":\"Sposta giù\",\"menu.target.root\":\"Menu principale\",\"menu.target.inside\":\"Dentro «{name}»\",\"menu.target.label\":\"Dove\",\"menu.item.label\":\"Voce\",\"menu.item.description\":\"Un’azione o l’apertura di un’app\",\"menu.item.field\":\"Voce da aggiungere\",\"menu.item.open\":\"Apri {name}\",\"menu.separatorRow.label\":\"Separatore\",\"menu.separatorRow.description\":\"Una linea per raggruppare le voci\",\"menu.new.label\":\"Nuovo elemento in «{name}»\",\"menu.new.description\":\"Crea un file o una cartella con questo nome; un file può partire dal contenuto di un modello\",\"menu.new.labelField\":\"Etichetta\",\"menu.new.labelPlaceholder\":\"Etichetta (es. Foglio di stile)\",\"menu.new.nameField\":\"Nome del file o della cartella\",\"menu.new.namePlaceholder\":\"Nome (es. stile.css)\",\"menu.new.kind\":\"Tipo\",\"menu.new.kindFile\":\"File\",\"menu.new.kindFolder\":\"Cartella\",\"menu.new.missing\":\"Servono l’etichetta e il nome\",\"menu.template.button\":\"Modello…\",\"menu.template.chosen\":\"Modello: {name}\",\"menu.template.title\":\"Scegli il file modello\",\"menu.template.text\":\"Il nuovo file partirà con il contenuto di questo file.\",\"menu.defaults.label\":\"Voci predefinite\",\"menu.defaults.custom\":\"Il menu è stato personalizzato\",\"menu.defaults.default\":\"Il menu è quello predefinito\",\"trash.label\":\"Cestino\",\"trash.deleting.title\":\"Eliminazione\",\"trash.confirm.label\":\"Chiedi conferma\",\"trash.confirm.description\":\"Prima di eliminare file e cartelle, un piccolo menu chiede di confermare\",\"trash.confirm.keywords\":\"conferma elimina cancella domanda\",\"trash.permanent.label\":\"Elimina definitivamente\",\"trash.permanent.description\":\"Gli elementi eliminati non passano dal cestino: si recuperano solo con Ctrl Z, finché la pagina resta aperta\",\"trash.permanent.keywords\":\"cestino definitivo subito cancella salta\",\"trash.retention.label\":\"Conserva gli elementi per\",\"trash.retention.description\":\"Passato questo tempo, quello che è nel cestino viene eliminato definitivamente\",\"trash.retention.keywords\":\"retention durata giorni pulizia automatica svuota\",\"trash.retention.field\":\"Conserva gli elementi nel cestino per\",\"trash.retention.days\":{\"one\":\"{n} giorno\",\"other\":\"{n} giorni\"},\"trash.retention.forever\":\"Per sempre\",\"trash.contents.label\":\"Contenuto\",\"trash.contents.description\":{\"one\":\"{n} elemento · {size}\",\"other\":\"{n} elementi · {size}\"},\"trash.contents.empty\":\"Il cestino è vuoto\",\"trash.contents.keywords\":\"apri cestino ripristina\",\"trash.contents.open\":\"Apri il cestino\",\"trash.empty.label\":\"Svuota il cestino\",\"trash.empty.description\":\"Elimina definitivamente tutto quello che contiene\",\"trash.empty.keywords\":\"svuota cestino\",\"trash.empty.button\":\"Svuota…\",\"trash.empty.confirm\":\"Svuota\",\"trash.empty.none\":\"Vuoto\",\"apps.label\":\"App\",\"apps.description\":\"Come girano le app installate.\",\"apps.security.label\":\"Sicurezza\",\"apps.execution.title\":\"Esecuzione delle app\",\"apps.isolated.label\":\"Esegui le app isolate\",\"apps.isolated.description\":\"Ogni app gira in una sandbox e vede solo quello che i suoi permessi le concedono. Se lo togli, le app girano nella pagina di lilOS e in un Web Worker: più veloci, ma possono fare tutto quello che puoi fare tu. Vale dalla prossima apertura di ogni app.\",\"apps.isolated.adminOnly\":\"Solo un amministratore la cambia.\",\"apps.isolated.keywords\":\"sicurezza isolamento sandbox iframe worker\",\"apps.isolated.failed\":\"Non cambiata: {error}\",\"apps.system.label\":\"App di sistema\",\"apps.system.description\":\"File Manager, Editor, Pannello di controllo e AppStore fanno parte di lilOS e girano sempre dentro lilOS.\",\"apps.installed.title\":\"App installate\",\"apps.installed.keywords\":\"sicurezza isolamento\",\"apps.installed.shared\":\"Come le altre app\",\"apps.installed.own\":\"Scelta per questa app\",\"apps.installed.properties\":\"Proprietà…\",\"apps.installed.none\":\"Nessuna app installata oltre a quelle di sistema\",\"apps.mode.isolated\":\"Isolata\",\"apps.mode.open\":\"Non isolata\",\"apps.mode.system\":\"Dentro lilOS\",\"apps.mode.remote\":\"Isolata, nel suo sito\",\"startup.label\":\"Avvio\",\"startup.description\":\"Servizi e app che partono da soli all’avvio di lilOS e quando entri.\",\"startup.options.label\":\"Opzioni\",\"startup.services.label\":\"Servizi\",\"startup.apps.label\":\"App\",\"startup.auto.title\":\"Avvio automatico\",\"startup.openApps.label\":\"Apri le app quando entri\",\"startup.openApps.description\":\"Si aprono le app scelte in App, con i loro parametri. Solo nella prima scheda di lilOS di questo browser: le altre si aprono vuote.\",\"startup.openApps.keywords\":\"avvio automatico accesso login esecuzione automatica\",\"startup.trouble.title\":\"Se qualcosa non va\",\"startup.safe.label\":\"Avvio senza app\",\"startup.safe.description\":\"Per una volta sola: apri lilOS con ?avvio=no in fondo all’indirizzo. Le scelte salvate restano.\",\"startup.safe.keywords\":\"avvio sicuro avvio=no\",\"startup.safe.active\":\"Attivo ora\",\"startup.apps.title\":\"Si aprono quando entri\",\"startup.apps.hint\":\"Nel workspace in cui si apre lilOS, nell’ordine dell’elenco. Togli tutti i punti d’ingresso di un’app e l’app esce dall’elenco.\",\"startup.apps.none\":\"Nessuna app si apre da sola.\",\"startup.apps.oneEntry\":\"1 punto d’ingresso\",\"startup.apps.entries\":{\"one\":\"{on} di {n} punto d’ingresso\",\"other\":\"{on} di {n} punti d’ingresso\"},\"startup.apps.remove\":\"Rimuovi dall’avvio\",\"startup.apps.allAdded\":\"Tutte le app sono già all’avvio\",\"startup.apps.add\":\"Aggiungi un’app all’avvio\",\"startup.apps.addDescription\":\"Si apre la sua finestra principale; poi scegli altri punti d’ingresso e parametri\",\"startup.params.of\":\"{entry} di {app}\",\"startup.params.undescribed\":\"Questo punto d’ingresso non descrive i suoi parametri: arrivano all’app così come sono, come args.\",\"startup.params.json\":\"Parametri (JSON)\",\"startup.params.jsonOf\":\"Parametri (JSON) di {name}\",\"startup.params.invalidJson\":\"Non è JSON valido\",\"startup.params.notSaved\":\"Non salvati: {error}\",\"services.unsupported\":\"Questa versione di lilOS non ha i servizi delle app\",\"services.status.off\":\"Spento\",\"services.status.starting\":\"Si avvia…\",\"services.status.error\":\"Fermo: {error}\",\"services.status.unknownError\":\"errore\",\"services.status.restarting\":\"Riparte… (si era fermato: {error})\",\"services.status.onNow\":\"Acceso da meno di un minuto\",\"services.status.onMinutes\":{\"one\":\"Acceso da {n} minuto\",\"other\":\"Acceso da {n} minuti\"},\"services.status.onHours\":{\"one\":\"Acceso da {n} ora\",\"other\":\"Acceso da {n} ore\"},\"services.status.onSince\":\"Acceso dal {date}\",\"services.auto.label\":\"Avvia i servizi automaticamente\",\"services.auto.noEngine\":\"Il kernel non ha il motore dei servizi (modulo services-isolate)\",\"services.auto.description\":\"Quando entri partono i tuoi servizi scelti in Servizi. Quelli scelti da un amministratore per tutti partono comunque.\",\"services.auto.keywords\":\"servizi avvio automatico background kernel\",\"services.title\":\"Servizi installati\",\"services.noEngine\":\"Il kernel non ha il motore dei servizi: serve il modulo services-isolate (AppStore → Kernel).\",\"services.none\":\"Nessuna app installata ha servizi.\",\"services.hint\":\"Le parti delle app che lavorano nel kernel, senza finestra, anche con lilOS chiuso. «All’avvio del sistema» vale per tutti gli utenti e lo sceglie un amministratore; «All’accesso» solo per te.\",\"services.startup.none\":\"Non si avvia\",\"services.startup.login\":\"All’accesso\",\"services.startup.system\":\"All’avvio del sistema\",\"services.startup.field\":\"Avvio di {name}\",\"services.restart\":\"Riavvia\",\"services.restartOf\":\"Riavvia {name}\",\"services.stop\":\"Spegni\",\"services.start\":\"Accendi\",\"services.byAdmin\":\"scelto da un amministratore\",\"services.log.label\":\"Registro\",\"services.log.title\":\"Registro di {name}\",\"services.log.empty\":\"Nessuna riga: il servizio non è ancora partito.\",\"storage.label\":\"Archiviazione\",\"storage.description.kernel\":\"Il tuo spazio, i limiti dei file e lo spazio di ogni utente.\",\"storage.description.browser\":\"Dati di lilOS salvati in questo browser.\",\"storage.space.title\":\"Spazio\",\"storage.used.label\":\"Dati di lilOS\",\"storage.used.description\":\"Posizioni, vista e impostazioni\",\"storage.contents.label\":\"Contenuto dei file\",\"storage.contents.description\":\"Testo salvato nei file\",\"storage.reset.title\":\"Ripristino\",\"storage.defaults.label\":\"Impostazioni predefinite\",\"storage.defaults.description\":\"Riporta impostazioni, scorciatoie, app dei tipi di file e menu ai valori iniziali\",\"storage.initial.label\":\"Scrivania e file iniziali\",\"storage.initial.description\":\"Elimina tutte le cartelle e i file creati, i workspace, i tag, le posizioni e la vista salvate, poi ricarica lilOS\",\"storage.initial.keywords\":\"reset desktop workspace tag\",\"storage.initial.button\":\"Ripristina…\",\"storage.initial.confirm\":\"Elimina e ricarica\",\"storage.mine.label\":\"Il mio spazio\",\"storage.mine.title\":\"Il tuo spazio\",\"storage.limits.label\":\"Limiti\",\"storage.users.label\":\"Utenti\",\"storage.quota.label\":\"Spazio usato\",\"storage.quota.description\":\"Tutti i tuoi file, cestino compreso\",\"storage.quota.none\":\"Tutti i tuoi file, cestino compreso: nessun limite\",\"storage.quota.of\":\"{used} di {quota}\",\"storage.quota.noLimit\":\"{used}\",\"storage.maxFile.label\":\"File più grande\",\"storage.maxFile.description\":\"La dimensione fino a cui lilOS salva un file\",\"storage.unlimited\":\"Senza limite\",\"storage.limits.title\":\"Limiti dei file\",\"storage.pieces.title\":\"Pezzi\",\"storage.limits.keywords\":\"limite dimensione file quota spazio caricamento pezzi megabyte gigabyte\",\"storage.limits.saved\":\"Salvate nella configurazione del kernel e valide subito, senza riavviarlo.\",\"storage.setting.maxFileSize.label\":\"Dimensione massima di un file\",\"storage.setting.maxFileSize.description\":\"Un file più grande non si salva nella home. 0 = senza limite.\",\"storage.setting.maxReadWhole.label\":\"Lettura in una volta\",\"storage.setting.maxReadWhole.description\":\"Oltre questa dimensione un file si legge solo a flusso: le app che lo aprono tutto in memoria lo rifiutano. 0 = senza limite.\",\"storage.setting.maxText.label\":\"Testo\",\"storage.setting.maxText.description\":\"Il testo più lungo che si legge o si salva come testo (Editor, Note adesive). 0 = senza limite.\",\"storage.setting.uploadPiece.label\":\"Pezzi di caricamento\",\"storage.setting.uploadPiece.description\":\"Un file più grande si carica dal browser in più richieste di questa dimensione, e un invio interrotto riparte da dove era arrivato. Abbassalo se un proxy davanti a lilOS limita le richieste. 0 = una richiesta sola.\",\"storage.setting.inlineMax.label\":\"File piccoli in una riga\",\"storage.setting.inlineMax.description\":\"Fino a questa dimensione il contenuto sta nella riga del file, che si legge con una sola richiesta al database; oltre, va in pezzi. 0 = sempre in pezzi (massimo 64 MB).\",\"storage.setting.dbChunk.label\":\"Pezzi nel database\",\"storage.setting.dbChunk.description\":\"La dimensione di ogni pezzo salvato. Vale per i file scritti da ora; quelli già salvati restano come sono. Da 256 KB a 16 MB.\",\"storage.setting.cacheMax.label\":\"Copia nel browser\",\"storage.setting.cacheMax.description\":\"Il browser tiene una copia dei file aperti fino a questa dimensione, per mostrarli quando il kernel non risponde. 0 = di tutti.\",\"storage.setting.quota.label\":\"Quota predefinita\",\"storage.setting.quota.description\":\"Lo spazio di ogni utente che non ne ha una sua. 0 = senza limite.\",\"storage.source.default\":\"Predefinito\",\"storage.source.local\":\"Modificato\",\"storage.source.user\":\"Personale\",\"storage.source.locked\":\"Gestito\",\"storage.reset\":\"Ripristina\",\"storage.size.unit\":\"Unità di {name}\",\"storage.size.invalid\":\"Scrivi un numero, 0 o più\",\"storage.mine.files\":\"Spazio dei tuoi file\",\"storage.size.noZero\":\"{name} non può essere 0\",\"storage.size.min\":\"{name}: almeno {min}\",\"storage.size.max\":\"{name}: al massimo {max}\",\"storage.users.default.title\":\"Quota\",\"storage.users.title\":\"Utenti\",\"storage.users.admin\":\"amministratore\",\"storage.users.quotaOf\":\"Quota di {name}\",\"storage.users.useDefault\":\"Usa la predefinita\",\"storage.users.custom\":\"Personalizza\",\"storage.users.unavailable\":\"Quote non disponibili\",\"storage.users.unavailableText\":\"Il modulo del file system del kernel non dice lo spazio usato (lo fa fs-postgres 1.2.0 o più recente): aggiornalo dall'AppStore.\",\"storage.error\":\"Impostazioni del kernel non lette\",\"storage.retry\":\"Riprova\",\"storage.loading\":\"Caricamento…\",\"computer.label\":\"Computer\",\"computer.description\":\"Il programma lilOS su questo computer: avvio, finestra, dispositivi e server. Queste impostazioni sono del computer, non del tuo utente.\",\"computer.loading\":\"Leggo dal programma…\",\"computer.error\":\"Non cambiato: {error}\",\"computer.program.label\":\"Programma\",\"computer.program.title\":\"Programma\",\"computer.program.version\":\"Versione del programma\",\"computer.program.system\":\"Sistema operativo\",\"computer.program.engine\":\"Motore della pagina\",\"computer.program.kernel\":\"lilOS su questo computer\",\"computer.program.kernelHint\":\"Il kernel e il database che il programma fa girare qui.\",\"computer.updates.title\":\"Aggiornamenti del programma\",\"computer.updates.label\":\"Aggiornamenti\",\"computer.updates.description\":\"Solo il programma: lilOS si aggiorna dall'AppStore, come sempre.\",\"computer.updates.mac\":\"Su macOS il programma non è firmato e non può sostituirsi da solo: una notifica avvisa quando esce una nuova versione.\",\"computer.updates.auto\":\"Automatici\",\"computer.updates.notify\":\"Avvisami\",\"computer.updates.off\":\"Mai\",\"computer.updates.check\":\"Ultimo controllo\",\"computer.updates.checkButton\":\"Controlla ora\",\"computer.updates.install\":\"Riavvia e aggiorna\",\"computer.updates.download\":\"Scarica\",\"computer.updates.never\":\"Non ancora controllato in questa sessione.\",\"computer.updates.dev\":\"Copia di sviluppo: niente aggiornamenti.\",\"computer.updates.current\":\"Il programma è aggiornato.\",\"computer.updates.available\":\"È disponibile la versione {version}.\",\"computer.updates.downloaded\":\"La versione {version} è pronta: si installa quando esci dal programma.\",\"computer.updates.failed\":\"Controllo non riuscito: {error}\",\"computer.updates.checking\":\"Controllo…\",\"computer.start.title\":\"Avvio e finestra\",\"computer.start.login\":\"Avvia con il computer\",\"computer.start.loginHint\":\"Il kernel parte quando accedi al computer; la finestra resta chiusa finché non la apri.\",\"computer.start.tray\":\"Chiudendo la finestra lilOS resta nell'area di notifica\",\"computer.start.trayHint\":\"Altrimenti chiudere la finestra chiude il programma (e ferma il kernel di questo computer).\",\"computer.start.notifications\":\"Notifiche del sistema\",\"computer.start.notificationsHint\":\"Le notifiche di lilOS compaiono anche nel centro notifiche del computer quando la finestra non è in primo piano.\",\"computer.screen.label\":\"Schermo\",\"computer.screen.title\":\"Come si vede lilOS\",\"computer.screen.mode\":\"Modo\",\"computer.screen.window\":\"Finestra\",\"computer.screen.fullscreen\":\"Schermo intero\",\"computer.screen.kiosk\":\"Kiosk\",\"computer.screen.windowHint\":\"Una finestra del computer, con la sua cornice.\",\"computer.screen.fullscreenHint\":\"lilOS copre tutto lo schermo, anche la barra o il Dock del computer. F11 entra ed esce.\",\"computer.screen.kioskHint\":\"lilOS resta a schermo intero e non si chiude: solo un amministratore di lilOS lo toglie. Con «Avvia con il computer» è l'unica cosa che il computer mostra.\",\"computer.screen.leave\":\"Esci dal kiosk\",\"computer.screen.leaveHint\":\"Lo può fare solo un amministratore di lilOS.\",\"computer.screen.leaveButton\":\"Esci dal kiosk\",\"computer.screen.leaveTitle\":\"Esci dal kiosk\",\"computer.screen.leaveText\":\"Un amministratore di lilOS accede per far uscire lilOS dal kiosk.\",\"computer.screen.adminName\":\"Amministratore\",\"computer.screen.adminPassword\":\"Password\",\"computer.screen.notAdmin\":\"Questo utente non è un amministratore.\",\"computer.screen.monitor\":\"Monitor\",\"computer.screen.monitorHint\":\"Dove va lilOS a schermo intero e in kiosk.\",\"computer.screen.monitorSame\":\"Quello su cui è la finestra\",\"computer.screen.primary\":\"principale\",\"computer.screen.keys\":\"Tasti di sistema a lilOS a schermo intero\",\"computer.screen.keysHint.win32\":\"Il tasto Windows, Alt+Tab ed Esc arrivano a lilOS (Keyboard Lock). Ctrl+Alt+Canc resta sempre di Windows.\",\"computer.screen.keysHint.darwin\":\"Esc e gli altri tasti arrivano a lilOS; in kiosk ⌘Tab e l'uscita forzata li blocca il sistema.\",\"computer.screen.keysHint.linux\":\"I tasti arrivano a lilOS (Keyboard Lock); nella sessione «lilOS» va tutto a lilOS.\",\"computer.screen.limitsTitle\":\"Cosa permette il sistema\",\"computer.screen.limits.win32\":\"Windows tiene sempre Ctrl+Alt+Canc. Mettere lilOS al posto del desktop di Windows (Shell Launcher) c'è solo in Windows Enterprise ed Education: su Home e Pro usa il kiosk con «Avvia con il computer».\",\"computer.screen.limits.darwin\":\"macOS in kiosk nasconde Dock e barra dei menu e blocca ⌘Tab e l'uscita forzata. Non lascia sostituire il Finder: per un Mac dedicato usa un account apposta con lilOS in kiosk all'avvio.\",\"computer.screen.limits.linux\":\"Con il pacchetto .deb o .rpm esegui una volta «sudo sh /opt/lilOS/resources/session/install-session.sh» (serve cage): nella schermata di accesso compare la sessione «lilOS» e lilOS è il desktop intero.\",\"computer.hardware.label\":\"Hardware\",\"computer.hardware.title\":\"Uso dei dispositivi\",\"computer.hardware.rule\":\"Le app usano i dispositivi\",\"computer.hardware.ask\":\"Chiedendo ogni volta\",\"computer.hardware.declared\":\"App che lo dichiarano\",\"computer.hardware.all\":\"Tutte le app\",\"computer.hardware.askHint\":\"Ogni porta o dispositivo lo scegli tu in una finestra di lilOS, una volta per dispositivo.\",\"computer.hardware.declaredHint\":\"Le app che tra i permessi (visti all'installazione) hanno un dispositivo li usano tutti senza chiedere.\",\"computer.hardware.allHint\":\"Ogni app vede e usa ogni dispositivo senza chiedere: solo per computer dedicati (kiosk, laboratori).\",\"computer.hardware.adminOnly\":\"Lo cambia solo un amministratore.\",\"computer.hardware.devices\":\"Cosa ha il computer\",\"computer.hardware.none\":\"Nessuno\",\"computer.hardware.unnamed\":\"Senza nome\",\"computer.hardware.cameras\":\"Fotocamere\",\"computer.hardware.microphones\":\"Microfoni\",\"computer.hardware.serial\":\"Porte seriali\",\"computer.hardware.usb\":\"Dispositivi USB\",\"computer.hardware.hid\":\"Dispositivi di input (HID)\",\"computer.hardware.gpu\":\"Schede grafiche\",\"computer.hardware.active\":\"in uso\",\"computer.hardware.webgpu\":\"WebGPU\",\"computer.hardware.printers\":\"Stampanti\",\"computer.hardware.default\":\"predefinita\",\"computer.hardware.displays\":\"Monitor\",\"computer.hardware.drives\":\"Unità rimovibili\",\"computer.hardware.driveSpace\":\"{free} liberi su {size}\",\"computer.hardware.eject\":\"Espelli\",\"computer.hardware.noDrives\":\"Nessuna chiavetta USB o scheda di memoria collegata.\",\"computer.hardware.refresh\":\"Leggi di nuovo\",\"computer.folders.title\":\"Cartelle del computer in Rete\",\"computer.folders.readOnly\":\"sola lettura\",\"computer.folders.none\":\"Nessuna per ora: aggiungi le cartelle che vuoi usare in lilOS.\",\"computer.folders.add\":\"Aggiungi una cartella\",\"computer.folders.addHint\":\"Si sceglie con il dialogo del computer: compare in Rete › Questo computer e si legge e scrive dove sta.\",\"computer.folders.addButton\":\"Scegli…\",\"computer.folders.added\":\"«{name}» è in Rete › Questo computer\",\"computer.hardware.portNumber\":\"Porta {n}\",\"computer.credits.title\":\"Riconoscimenti del programma\",\"computer.credits.site\":\"Sito\",\"computer.servers.label\":\"Server\",\"computer.servers.title\":\"I lilOS che questo programma apre\",\"computer.servers.current\":\"questa finestra\",\"computer.servers.trusted\":\"di fiducia\",\"computer.servers.untrusted\":\"non di fiducia: non può toccare il computer\",\"computer.servers.status.running\":\"attivo\",\"computer.servers.status.starting\":\"in avvio\",\"computer.servers.status.stopped\":\"fermo\",\"computer.servers.status.failed\":\"fermo per un errore\",\"computer.servers.open\":\"Apri\",\"computer.servers.browser\":\"Apri nel browser\",\"computer.servers.restart\":\"Riavvia il kernel\",\"computer.servers.remove\":\"Togli\",\"computer.servers.removeConfirm\":\"Toglierlo?\",\"computer.servers.addTitle\":\"Aggiungi un server\",\"computer.servers.address\":\"Indirizzo\",\"computer.servers.addressHint\":\"https:// (http:// solo per questo computer). Ogni server si apre nella sua finestra, con il suo accesso.\",\"computer.servers.trust\":\"Server di fiducia\",\"computer.servers.trustHint\":\"Può aprire file su questo computer e cambiare le impostazioni del programma. Solo per server che controlli tu.\",\"computer.servers.add\":\"Aggiungi\",\"about.label\":\"Informazioni\",\"about.description\":\"Versione, ambiente e riconoscimenti.\",\"about.version\":\"Versione\",\"about.sdkVersion\":\"Versione dell’SDK\",\"about.language\":\"Lingua\",\"about.browser\":\"Browser\",\"about.unknownBrowser\":\"Sconosciuto\",\"credits.label\":\"Riconoscimenti\",\"credits.libraries\":\"Librerie\",\"credits.indirect\":\"Librerie usate da altre librerie\",\"credits.fonts\":\"Font\",\"credits.tools\":\"Strumenti\",\"credits.usedBy\":\"usata da {users}\",\"credits.via\":\"portata da {libraries}, in {users}\",\"credits.builds\":\"costruisce lilOS e le sue app\",\"credits.optional\":\"facoltativa\",\"credits.module\":\"{name} (modulo del kernel)\",\"credits.fontUsedBy\":\"usato da {users}\",\"credits.site\":\"Sito\",\"credits.siteOf\":\"Sito di {name}\",\"credits.keywords\":\"credits riconoscimenti crediti licenza licenze librerie open source grazie\",\"userPage.label\":\"Pagina utente\",\"userPage.description\":\"Cosa mostra la pagina che si apre dal tuo nome\",\"userPage.title\":\"Pagina utente\",\"userPage.open.label\":\"Si apre dal tuo nome\",\"userPage.open.description\":\"Clicca il tuo nome nella barra in basso o in fondo al menu. Nome e foto ci sono sempre: qui scegli cos’altro mostra.\",\"userPage.keywords\":\"pagina utente profilo account foto blocca chiudi sessione esci riavvia {name}\",\"userPage.toggle\":\"{name} nella pagina utente\",\"userPage.group.header\":\"Intestazione\",\"userPage.group.actions\":\"Azioni\",\"userPage.group.account\":\"Account\",\"userPage.group.session\":\"Questa sessione\",\"userPage.group.footer\":\"Piè di pagina\",\"userPage.item.details.name\":\"Nome utente e ruolo\",\"userPage.item.details.description\":\"Sotto il nome: il nome con cui accedi e se sei amministratore\",\"userPage.item.lock.name\":\"Blocca\",\"userPage.item.lock.description\":\"Copre lo schermo finché non inserisci di nuovo la password; le app restano aperte\",\"userPage.item.logout.name\":\"Chiudi sessione\",\"userPage.item.logout.description\":\"Salva, chiude le app e torna alla schermata di accesso\",\"userPage.item.restart.name\":\"Riavvia il sistema\",\"userPage.item.restart.description\":\"Riavvia il kernel di lilOS per tutti gli utenti; solo per gli amministratori\",\"userPage.item.photo.name\":\"Foto profilo\",\"userPage.item.photo.description\":\"Scegliere, cambiare o togliere la foto\",\"userPage.item.theme.name\":\"Tema\",\"userPage.item.theme.description\":\"Chiaro o scuro\",\"userPage.item.language.name\":\"Lingua\",\"userPage.item.language.description\":\"La lingua delle app\",\"userPage.item.settings.name\":\"Tutte le impostazioni\",\"userPage.item.settings.description\":\"Apre il Pannello di controllo\",\"userPage.item.workspace.name\":\"Workspace\",\"userPage.item.workspace.description\":\"Quello in cui sei e quanti ce ne sono\",\"userPage.item.windows.name\":\"Finestre aperte\",\"userPage.item.windows.description\":\"Quante finestre sono aperte e quante app lavorano in background\",\"userPage.item.startup.name\":\"All’avvio\",\"userPage.item.startup.description\":\"Quante app si aprono quando entri\",\"userPage.item.storage.name\":\"Spazio usato\",\"userPage.item.storage.description\":\"Quanto occupano i tuoi file\",\"userPage.item.about.name\":\"Versione di lilOS\",\"userPage.item.about.description\":\"La versione di lilOS e l’indirizzo a cui sei collegato\",\"notifications.label\":\"Notifiche\",\"notifications.description\":\"Come compaiono le notifiche quando arrivano, e quante se ne conservano\",\"notifications.arrive.title\":\"Quando arrivano\",\"notifications.shown.label\":\"Mostrate insieme\",\"notifications.shown.description\":\"Quante ne compaiono una sopra l'altra sopra l'area di notifica della barra delle applicazioni. Oltre questo numero le più vecchie non si vedono lì, ma restano nell'elenco.\",\"notifications.shown.keywords\":\"notifiche barra avvisi area di notifica numero\",\"notifications.shown.field\":\"Notifiche mostrate insieme\",\"notifications.seconds.label\":\"Per quanto restano visibili\",\"notifications.seconds.description\":\"Secondi dopo l'ultima arrivata. Con il puntatore sopra restano finché non lo sposti.\",\"notifications.seconds.keywords\":\"notifiche tempo secondi durata\",\"notifications.seconds.field\":\"Per quanto restano visibili le notifiche\",\"notifications.seconds.value\":{\"one\":\"{n} secondo\",\"other\":\"{n} secondi\"},\"notifications.list.title\":\"Elenco\",\"notifications.keep.label\":\"Notifiche conservate\",\"notifications.keep.description\":\"Quando ne arriva una in più si cancella la più vecchia. La campanella nell'area di notifica le elenca tutte.\",\"notifications.keep.page\":\"Senza il modulo delle notifiche del kernel restano solo finché lilOS non si ricarica.\",\"notifications.keep.keywords\":\"notifiche cronologia elenco conservare limite\",\"notifications.keep.field\":\"Notifiche conservate\",\"notifications.test.label\":\"Prova\",\"notifications.test.description\":\"Ti manda una notifica, per vedere come appare.\",\"notifications.test.button\":\"Invia una notifica di prova\",\"notifications.test.text\":\"Notifica di prova: le notifiche funzionano.\",\"notifications.error\":\"Non salvato: {message}\",\"@name\":\"Pannello di controllo\",\"@description\":\"Aspetto, lingua, scrivania, pagina utente, workspace, notifiche, tag, scorciatoie, tipi di file, servizi e app all’avvio, archiviazione.\",\"@entrypoints.main.params.tab.label\":\"Sezione\",\"@entrypoints.main.params.tab.options.appearance.label\":\"Aspetto\",\"@entrypoints.main.params.tab.options.language.label\":\"Lingua\",\"@entrypoints.main.params.tab.options.desk.label\":\"Scrivania\",\"@entrypoints.main.params.tab.options.userpage.label\":\"Pagina utente\",\"@entrypoints.main.params.tab.options.workspaces.label\":\"Workspace\",\"@entrypoints.main.params.tab.options.notifications.label\":\"Notifiche\",\"@entrypoints.main.params.tab.options.tags.label\":\"Tag\",\"@entrypoints.main.params.tab.options.usability.label\":\"Usabilità\",\"@entrypoints.main.params.tab.options.apps.label\":\"App\",\"@entrypoints.main.params.tab.options.startup.label\":\"Avvio\",\"@entrypoints.main.params.tab.options.onedrive.label\":\"OneDrive\",\"@entrypoints.main.params.tab.options.microsoft.label\":\"App Microsoft\",\"@entrypoints.main.params.tab.options.google.label\":\"Progetto Google\",\"@entrypoints.main.params.tab.options.storage.label\":\"Archiviazione\",\"@entrypoints.main.params.tab.options.about.label\":\"Informazioni\",\"pipes.label\":\"Pipe\",\"pipes.title\":\"Pipe sugli eventi\",\"pipes.keywords\":\"pipe eventi handler ordine catena\",\"pipes.intro.label\":\"Cosa fanno le app quando succede qualcosa\",\"pipes.intro.description\":\"Le app possono intervenire quando un file si apre, si legge o si salva, oppure guardare cosa succede nel sistema; un’app può anche aggiungere eventi suoi. Qui sotto, ogni evento con i suoi handler nell’ordine in cui partono ({count} eventi in tutto). La fase dopo scorre in ordine inverso rispetto a prima.\",\"pipes.unsupported\":\"Questa versione di lilOS non ha le pipe\",\"pipes.lilos\":\"lilOS\",\"pipes.up\":\"Su\",\"pipes.down\":\"Giù\",\"pipes.stage.before\":\"Prima\",\"pipes.stage.after\":\"Dopo\",\"pipes.band.first\":\"tra i primi\",\"pipes.band.middle\":\"in mezzo\",\"pipes.band.last\":\"tra gli ultimi\",\"pipes.where.all\":\"ogni elemento\",\"pipes.where.system\":\"scelti da lilOS\",\"pipes.where.own\":\"i file che ha segnato\",\"pipes.where.ext\":\"file {list}\",\"pipes.where.type.file\":\"file\",\"pipes.where.type.folder\":\"cartelle\",\"pipes.where.type.app\":\"collegamenti alle app\",\"pipes.where.app\":\"app {list}\",\"pipes.reset.label\":\"Ordine degli handler\",\"pipes.reset.description\":\"L’hai cambiato: torna all’ordine di installazione\",\"pipes.idle.title\":\"Eventi senza handler\",\"pipes.idle.description\":\"{count} eventi: per ora nessuna app li gestisce\",\"pipes.idle.none\":\"Ogni evento ha un handler\",\"pipes.owned\":\"{label} (di {app})\",\"pipes.event.file.open\":\"Apertura di un file\",\"pipes.event.file.read\":\"Lettura di un file\",\"pipes.event.file.write\":\"Salvataggio di un file\",\"pipes.event.app.launch\":\"Avvio di un’app\",\"pipes.event.file.create\":\"Creazione di un elemento\",\"pipes.event.file.rename\":\"Cambio di nome\",\"pipes.event.file.move\":\"Spostamento\",\"pipes.event.file.copy\":\"Copia di un file\",\"pipes.event.file.remove\":\"Eliminazione definitiva\",\"pipes.event.trash.put\":\"Spostamento nel Cestino\",\"pipes.event.trash.restore\":\"Ripristino dal Cestino\",\"pipes.event.trash.purge\":\"Svuotamento del Cestino\",\"pipes.event.tags.assign\":\"Tag di un elemento\",\"pipes.event.window.open\":\"Apertura di una finestra\",\"pipes.event.device.attach\":\"Collegamento di un dispositivo\",\"pipes.event.device.detach\":\"Scollegamento di un dispositivo\",\"pipes.event.window.close\":\"Chiusura di una finestra\",\"pipes.event.workspace.switch\":\"Cambio di workspace\",\"pipes.event.settings.change\":\"Cambio di un’impostazione\",\"pipes.event.system.ready\":\"Sistema pronto\",\"pipes.event.session.login\":\"Utente entrato\",\"pipes.event.session.logout\":\"Uscita dall’account\",\"pipes.event.apps.install\":\"Installazione di un’app\",\"pipes.event.apps.update\":\"Aggiornamento di un’app\",\"pipes.event.apps.remove\":\"Rimozione di un’app\",\"pipes.event.permissions.change\":\"Permessi di un’app\",\"pipes.event.settings.system\":\"Impostazioni di sistema\",\"pipes.event.pipes.change\":\"Iscrizioni alle pipe\",\"network.label\":\"Rete\",\"network.description\":\"Dove il kernel può collegarsi per gli utenti: cartella Rete, Terminale, NetTest\",\"network.loading\":\"Lettura delle regole…\",\"network.error\":\"Non è stato possibile leggere le regole\",\"network.saved\":\"Regole di rete salvate\",\"network.single\":\"Un solo utente, senza accesso\",\"network.singleText\":\"Adesso il kernel si collega ovunque, come potresti fare tu. Queste regole valgono quando gli utenti accedono a lilOS.\",\"network.exception\":\"Eccezioni per gli utenti\",\"network.local.label\":\"Questo computer (localhost)\",\"network.local.description\":\"127.0.0.1 e ::1: server di prova, database e servizi sul computer del kernel. Gli utenti raggiungerebbero anche i servizi del kernel stesso: aprilo solo se ti fidi di loro.\",\"network.private.label\":\"Tutta la rete locale\",\"network.private.description\":\"10.x, 172.16–31.x, 192.168.x, 100.64.x e gli indirizzi IPv6 privati: stampanti, NAS, router, i server dell’ufficio.\",\"network.ranges.label\":\"Solo questi indirizzi\",\"network.ranges.description\":\"Indirizzi o intervalli permessi anche quando il resto resta chiuso, separati da virgole: 192.168.1.50/32 (un NAS), 10.0.5.0/24.\",\"network.always\":\"Sempre chiusi, qualunque eccezione: indirizzi link-local (metadati del cloud, 169.254.x), multicast e indirizzi riservati. Un nome si controlla di nuovo a ogni connessione, sull’indirizzo a cui punta davvero.\",\"logic.label\":\"Logic Studio\",\"logic.description\":\"Il motore di Logic Studio: quello che usano i tuoi programmi e, per gli amministratori, limiti e quote di tutti.\",\"logic.loading\":\"Lettura…\",\"logic.noEngine\":\"Il motore di Logic Studio (modulo logicstudio-engine) non è installato o non risponde.\",\"logic.noSettings\":\"Solo un amministratore vede le impostazioni del motore.\",\"logic.mine.label\":\"Il mio uso\",\"logic.mine.usage\":\"Quello che usano i miei programmi\",\"logic.mine.programs\":\"I miei programmi\",\"logic.active\":\"Programmi attivi\",\"logic.activeHint\":\"Girano anche a lilOS chiuso.\",\"logic.tests\":\"Prove in corso\",\"logic.testsHint\":\"Una prova si ferma da sola dopo {min} minuti.\",\"logic.net\":\"Richieste di rete in questo minuto\",\"logic.log\":\"Registro\",\"logic.cpuMem\":\"CPU e memoria\",\"logic.cpuMemValue\":\"al massimo {cpu}% · {mem} MB\",\"logic.noPrograms\":\"Nessun programma\",\"logic.program\":\"Programma\",\"logic.user\":\"Utente\",\"logic.kind\":\"Tipo\",\"logic.state\":\"Stato\",\"logic.since\":\"Da\",\"logic.kind.test\":\"Prova\",\"logic.kind.active\":\"Attivo\",\"logic.state.starting\":\"Si avvia\",\"logic.state.running\":\"In esecuzione\",\"logic.state.stopped\":\"Fermo\",\"logic.state.failed\":\"Fermo per un errore\",\"logic.state.waiting\":\"Aspetta un pacchetto\",\"logic.stop\":\"Ferma\",\"logic.stopConfirm\":\"Fermalo\",\"logic.forget\":\"Togli\",\"logic.limits.label\":\"Limiti\",\"logic.limits.all\":\"Per tutti gli utenti\",\"logic.limits.schemas\":\"Schemi\",\"logic.limits.projects\":\"Progetti\",\"logic.limits.when\":\"Quando contano\",\"logic.limits.whenHint\":\"Per i programmi che partono da ora: quelli in esecuzione tengono i limiti con cui sono partiti.\",\"logic.quota.label\":\"Quote\",\"logic.quota.defaults\":\"Quote di ogni utente\",\"logic.quota.users\":\"Le quote di un utente\",\"logic.quota.usersHint\":\"Vuoto: la quota di ogni utente (in grigio). Un numero: quella sua.\",\"logic.quota.maxActive\":\"Attivi\",\"logic.quota.maxTests\":\"Prove\",\"logic.quota.cpuPercent\":\"CPU %\",\"logic.quota.memoryMb\":\"Memoria MB\",\"logic.quota.netPerMinute\":\"Richieste/min\",\"logic.quota.logMb\":\"Registro MB\",\"logic.reset\":\"Predefinita\",\"logic.running.label\":\"In esecuzione\",\"logic.running.title\":\"Programmi di tutti gli utenti\",\"logic.packages.label\":\"Pacchetti\",\"logic.packages.title\":\"Pacchetti di blocchi e componenti\",\"logic.packages.counts\":\"{blocks} blocchi · {components} componenti\",\"logic.packages.more\":\"Altri pacchetti\",\"logic.packages.moreHint\":\"Blocchi e componenti nuovi arrivano con i moduli del kernel: installali dall'AppStore.\",\"logic.kind.app\":\"App (non installata)\",\"logic.kind.cli\":\"Riga di comando\"}}")
}), { t: F } = P;
// src/settings/menuEditor.js
function ye(e, { openWindow: t, rerender: n, confirmButton: r }) {
	let i = h.layout(e), o = (t) => {
		h.setLayout(e, t), n();
	}, s = (e) => {
		if (e.type === "separator") return {
			label: F("menu.separator"),
			description: ""
		};
		if (e.type === "submenu") return {
			label: e.label,
			description: F("menu.submenu", { n: e.items.length })
		};
		let t = h.action(e.action), n = e.label ?? t?.label ?? e.action;
		if (e.action === "desktop.create") {
			let t = e.params.name;
			return e.params.kind === "folder" ? {
				label: n,
				description: F("menu.create.folder", { name: t })
			} : e.params.template ? {
				label: n,
				description: F("menu.create.fileFromTemplate", {
					name: t,
					template: u.exists(e.params.template) ? u.path(e.params.template) : F("menu.create.deletedTemplate")
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
	}, l = (e, t) => o(c(e, (e, n) => {
		let r = n + t;
		r < 0 || r >= e.length || ([e[n], e[r]] = [e[r], e[n]]);
	})), p = (e) => o(c(e, (e, t) => e.splice(t, 1))), m = (e, t, n) => {
		let { label: r, description: i } = s(e), a = t[t.length - 1], o = (e, t, n, i) => d("button", {
			class: "mm-btn",
			type: "button",
			title: t,
			"aria-label": `${t}: ${r}`,
			disabled: i,
			onclick: n
		}, f(e));
		return {
			label: t.length === 2 ? `↳ ${r}` : r,
			description: i,
			keywords: F("menu.keywords"),
			control: d("div", { class: "mm-ctl" }, o("arrowUp", F("menu.moveUp"), () => l(t, -1), a === 0), o("arrowDown", F("menu.moveDown"), () => l(t, 1), a === n - 1), o("x", F("common.remove"), () => p(t)))
		};
	}, g = [];
	i.forEach((e, t) => {
		g.push(m(e, [t], i.length)), e.type === "submenu" && e.items.forEach((n, r) => g.push(m(n, [t, r], e.items.length)));
	});
	let _ = i.map((e, t) => [e, t]).filter(([e]) => e.type === "submenu"), v = [{
		value: "root",
		label: F("menu.target.root")
	}, ..._.map(([e, t]) => ({
		value: String(t),
		label: F("menu.target.inside", { name: e.label })
	}))], y = (e, t) => o(c(e === "root" ? [0] : [Number(e), 0], (e) => e.push(t))), x = h.actions(e).filter((e) => e.id !== "desktop.create" && e.id !== "app.launch"), S = b({
		value: x[0]?.id,
		label: F("menu.item.field"),
		options: [...x.map((e) => ({
			value: e.id,
			label: e.label
		})), ...j.filter((e) => e.load).map((e) => ({
			value: `app:${e.id}`,
			label: F("menu.item.open", { name: e.name })
		}))]
	}), ee = b({
		value: "root",
		options: v,
		label: F("menu.target.label")
	}), C = b({
		value: "root",
		options: v,
		label: F("menu.target.label")
	}), w = _[0], T = D({
		placeholder: F("menu.new.labelPlaceholder"),
		label: F("menu.new.labelField")
	}), E = D({
		placeholder: F("menu.new.namePlaceholder"),
		label: F("menu.new.nameField")
	}), O = b({
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
			let e = await fe(t, {
				title: F("menu.template.title"),
				text: F("menu.template.text")
			});
			e && (k = e.id, A.textContent = F("menu.template.chosen", { name: e.name }));
		}
	}), te = d("small", { class: "mm-note" });
	return [{
		title: h.list().find((t) => t.id === e)?.label ?? e,
		rows: g
	}, {
		title: F("common.add"),
		rows: [
			{
				label: F("menu.item.label"),
				description: F("menu.item.description"),
				control: d("div", { class: "mm-add" }, S, ee, a({
					label: F("common.add"),
					onClick: () => {
						let e = S.value, t = e.startsWith("app:") ? {
							type: "action",
							action: "app.launch",
							label: F("menu.item.open", { name: j.find((t) => t.id === e.slice(4))?.name }),
							params: { app: e.slice(4) }
						} : {
							type: "action",
							action: e
						};
						y(ee.value, t);
					}
				}))
			},
			{
				label: F("menu.separatorRow.label"),
				description: F("menu.separatorRow.description"),
				control: d("div", { class: "mm-add" }, C, a({
					label: F("common.add"),
					onClick: () => y(C.value, { type: "separator" })
				}))
			},
			...w ? [{
				label: F("menu.new.label", { name: w[0].label }),
				description: F("menu.new.description"),
				control: d("div", { class: "mm-add" }, T, E, O, A, a({
					label: F("common.add"),
					primary: !0,
					onClick: () => {
						let e = T.value.trim(), t = E.value.trim();
						if (!e || !t) {
							te.textContent = F("menu.new.missing");
							return;
						}
						let n = {
							kind: O.value,
							name: t,
							...k && O.value === "file" && { template: k }
						};
						y(String(w[1]), {
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
				description: h.isCustom(e) ? F("menu.defaults.custom") : F("menu.defaults.default"),
				control: r(F("common.reset"), F("common.confirm"), () => {
					h.reset(e), n();
				})
			}
		]
	}];
}
// src/shared/paramsForm.js
function be(e, t, { t: n, label: r = e.label, onChange: i = null, pickFile: o = null, pathAs: s = "id", live: c = !1, locked: l = !1, empty: p = !0 } = {}) {
	let m = e.type ?? "text", h = e.required === !0, g = t ?? (m === "files" ? [] : null), _ = (e, t) => i?.(e) === !1 ? (t(), !1) : (g = e, !0), v = c ? "input" : "change", y = b();
	if (l) for (let e of [y.el, ...y.el.querySelectorAll("input, select, button, textarea")]) "disabled" in e && (e.disabled = !0);
	return y;
	function b() {
		if (m === "boolean") {
			let e = k({
				value: g === !0,
				label: r,
				onChange: (t) => _(t, () => {
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
			}))], i = d("select", {
				class: "ctl-select",
				"aria-label": r
			}, ...t.map((e) => d("option", {
				value: e.value,
				selected: e.value === (g == null ? "" : String(g)),
				disabled: !!e.disabled
			}, e.label))), a = (t) => t === "" ? null : (e.options ?? []).find((e) => String(e.value) === t)?.value ?? null;
			return i.addEventListener("change", () => _(a(i.value), () => {
				i.value = g == null ? "" : String(g);
			})), {
				el: i,
				get: () => a(i.value),
				check: () => h && a(i.value) == null ? n("shared.params.required") : ""
			};
		}
		if (m === "number") {
			let t = d("input", {
				class: "ctl-text sh-param-number",
				type: "number",
				min: e.min ?? null,
				max: e.max ?? null,
				"aria-label": r
			});
			return t.value = g ?? "", t.addEventListener(v, () => _(t.value === "" ? null : Number(t.value), () => {
				t.value = g ?? "";
			})), {
				el: t,
				get: () => t.value === "" ? null : Number(t.value),
				check: () => {
					if (t.value === "") return h ? n("shared.params.required") : "";
					let r = Number(t.value);
					return Number.isFinite(r) ? Number.isFinite(e.min) && r < e.min ? n("shared.params.tooSmall", { min: e.min }) : Number.isFinite(e.max) && r > e.max ? n("shared.params.tooBig", { max: e.max }) : "" : n("shared.params.badNumber");
				}
			};
		}
		if (m === "file" || m === "folder") return ee();
		if (m === "files") return C();
		let t = m === "secret", i = d("input", {
			class: "ctl-text",
			type: t ? "password" : "text",
			spellcheck: "false",
			autocomplete: t ? "new-password" : "off",
			"aria-label": r,
			maxlength: e.maxLength ?? null,
			placeholder: t && g ? n("shared.params.secretKept") : null
		});
		return t || (i.value = g ?? ""), i.addEventListener(v, () => {
			(!t || i.value) && _(i.value || null, () => {
				i.value = t ? "" : g ?? "";
			});
		}), c || i.addEventListener("keydown", (e) => {
			e.key === "Enter" && i.blur();
		}), {
			el: i,
			get: () => t ? i.value || g : i.value || null,
			check: () => h && !(t ? i.value || g : i.value) ? n("shared.params.required") : ""
		};
	}
	function x(e) {
		return e ? s === "tilde" ? e : u.exists(e) ? u.tildePath(e) : n("shared.params.gone") : "";
	}
	function S(e) {
		return s === "tilde" ? u.tildePath(e.id) : e.id;
	}
	function ee() {
		let t = m === "folder", i = s === "tilde", l = d("input", {
			class: "ctl-text",
			type: "text",
			spellcheck: "false",
			readonly: !i,
			"aria-label": r,
			placeholder: i ? "~/…" : n(t ? "shared.params.noFolder" : "shared.params.noFile")
		});
		l.value = x(g);
		let u = () => {
			l.value = x(g);
		};
		i && (l.addEventListener(v, () => _(l.value.trim() || null, u)), c || l.addEventListener("keydown", (e) => {
			e.key === "Enter" && l.blur();
		}));
		let p = o && a({
			label: n("shared.params.choose"),
			onClick: async () => {
				let n = await o({
					kind: t ? "folder" : "file",
					title: e.label
				});
				n && _(S(n), u) && u();
			}
		}), y = !i && !h && d("button", {
			class: "ctl-btn sh-param-clear",
			type: "button",
			title: n("shared.params.clear"),
			"aria-label": n("shared.params.clearOf", { name: e.label }),
			onclick: () => {
				_(null, u) && u();
			}
		}, f("x"));
		return {
			el: d("div", { class: "sh-param-path" }, l, p, y),
			get: () => i ? l.value.trim() || null : g,
			check: () => h && !(i ? l.value.trim() : g) ? n("shared.params.noneChosen") : ""
		};
	}
	function C() {
		g = (Array.isArray(g) ? g : g ? [g] : []).filter((e) => s === "tilde" || u.exists(e));
		let e = d("div", { class: "sh-param-list" }), t = (e) => {
			_(e, i) && i();
		};
		function i() {
			e.replaceChildren(...g.length ? g.map((e, r) => {
				let i = x(e);
				return d("div", { class: "sh-param-item" }, f(s === "id" && u.get(e)?.type === "folder" ? "folder" : "file"), d("code", {}, i), l ? null : d("button", {
					class: "ctl-btn sh-param-clear",
					type: "button",
					title: n("shared.params.remove"),
					"aria-label": n("shared.params.removeOf", { name: i }),
					onclick: () => t(g.filter((e, t) => t !== r))
				}, f("x")));
			}) : [d("span", { class: "sh-param-none" }, n("shared.params.none"))]);
		}
		i();
		let c = (e) => async () => {
			let n = await o({
				kind: e,
				title: r
			});
			if (!n) return;
			let i = S(n);
			g.includes(i) || t([...g, i]);
		};
		return {
			el: d("div", { class: "sh-param-files" }, e, o ? d("div", { class: "sh-param-add" }, a({
				label: n("shared.params.addFile"),
				onClick: c("file")
			}), a({
				label: n("shared.params.addFolder"),
				onClick: c("folder")
			})) : null),
			get: () => [...g],
			check: () => h && !g.length ? n("shared.params.noneChosen") : ""
		};
	}
}
function xe(e, t = {}, { t: n, onChange: r = null, context: i = "", ...a } = {}) {
	let o = { ...t }, s = /* @__PURE__ */ new Map(), c = Object.entries(e ?? {}).flatMap(([e, t]) => {
		let c = be(t, Object.hasOwn(o, e) ? o[e] : t.default, {
			...a,
			t: n,
			label: i ? `${t.label} (${i})` : t.label,
			onChange: (t) => {
				let n = { ...o };
				return t === "" || t == null || Array.isArray(t) && !t.length ? delete n[e] : n[e] = t, r?.({ ...n }, e) !== !1 && (o = n, !0);
			}
		});
		return s.set(e, c), [d("span", { class: "sh-param-label" }, t.label, t.required ? d("span", {
			class: "sh-param-req",
			"aria-hidden": "true"
		}, " *") : null), d("div", { class: "sh-param-field" }, c.el, t.description ? d("small", { class: "sh-param-hint" }, t.description) : null)];
	}), l = d("div", { class: "sh-params" }, c);
	return {
		el: l,
		controls: s,
		values: () => {
			let e = {};
			for (let [t, n] of s) {
				let r = n.get();
				r !== "" && r != null && (!Array.isArray(r) || r.length) && (e[t] = r);
			}
			return e;
		},
		check: () => {
			for (let [t, n] of s) {
				let r = n.check();
				if (r) return `${e[t].label}: ${r}`;
			}
			return "";
		},
		focus: () => l.querySelector("input:not([readonly]), select, button")?.focus()
	};
}
// src/settings/services.js
var I = null, Se = null;
function Ce(e) {
	A.services ? Se ??= A.services.list().then((e) => {
		I = e;
	}, (e) => {
		I = { error: e.message };
	}).finally(() => {
		Se = null, e();
	}) : I = { get error() {
		return F("services.unsupported");
	} };
}
function we(e) {
	return A.services?.on("change", () => Ce(e)) ?? null;
}
function Te(e) {
	let t = Math.round((Date.now() - e) / 6e4);
	if (t < 1) return F("services.status.onNow");
	if (t < 60) return F("services.status.onMinutes", { n: t });
	let n = Math.round(t / 60);
	return n < 48 ? F("services.status.onHours", { n }) : F("services.status.onSince", { date: P.date(e) });
}
function Ee(e) {
	return e.status === "on" ? Te(e.since) : e.status === "starting" && e.error ? F("services.status.restarting", { error: e.error }) : e.status === "error" ? F("services.status.error", { error: e.error ?? F("services.status.unknownError") }) : e.status === "off" ? F("services.status.off") : e.status === "starting" ? F("services.status.starting") : e.status;
}
var De = async (e, t) => {
	try {
		await e();
	} catch (e) {
		O(e.message, { timeout: 7e3 });
	}
	Ce(t);
};
function Oe(e) {
	I || Ce(e);
	let t = I && !I.error && I.available, n = k({
		value: t ? I.enabled : !1,
		label: F("services.auto.label"),
		onChange: (t) => De(() => A.services.setEnabled(t), e)
	});
	return n.disabled = !t, {
		label: F("services.auto.label"),
		description: I ? I.error ? I.error : I.available ? F("services.auto.description") : F("services.auto.noEngine") : F("common.loading"),
		keywords: F("services.auto.keywords"),
		control: n
	};
}
function ke(e) {
	I || Ce(e.rerender);
	let t = (e) => [{
		title: F("services.title"),
		rows: [{ label: e }]
	}];
	return I ? I.error ? t(I.error) : I.available ? I.services.length ? [{
		title: F("services.title"),
		content: () => d("div", { class: "su-apps" }, d("p", { class: "su-hint" }, F("services.hint")), d("div", { class: "st-card su-app" }, I.services.flatMap((t) => Ae(t, e))))
	}] : t(F("services.none")) : t(F("services.noEngine")) : t(F("common.loading"));
}
function Ae(e, t) {
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
	], s = b({
		value: e.startup,
		options: i,
		label: F("services.startup.field", { name: r }),
		onChange: (t) => De(() => A.services.setStartup(e.app, e.entry, t), n)
	});
	s.disabled = e.system && !I.admin;
	let c = e.status === "on" || e.status === "starting", l = d("button", {
		class: "ctl-btn su-clear",
		type: "button",
		title: F("services.restart"),
		"aria-label": F("services.restartOf", { name: r })
	}, f("redo"));
	l.disabled = !e.canControl || !c, l.addEventListener("click", () => De(() => A.services.restart(e.app, e.entry), n));
	let u = a({
		label: F(c ? "services.stop" : "services.start"),
		spinner: !0,
		onClick: () => De(() => A.services[c ? "stop" : "start"](e.app, e.entry), n)
	});
	u.disabled = !e.canControl, u.classList.add("su-power");
	let p = a({
		label: F("services.log.label"),
		onClick: () => Me(e, t)
	});
	p.disabled = e.system && !I.admin;
	let m = d("div", { class: "st-row su-service" }, o(e, "su-icon"), d("div", { class: "st-label" }, d("b", {}, r), d("small", {}, d("span", { class: `su-state ${e.status}` }, Ee(e)), " · ", d("code", {}, e.entry), e.system && !I.admin ? ` · ${F("services.byAdmin")}` : "")), s, l, u, p);
	return e.params && e.startup !== "none" ? [m, je(e, t)] : [m];
}
function je(e, { openWindow: t, rerender: n }) {
	let r = xe(e.params, e.values, {
		t: F,
		pathAs: "tilde",
		locked: e.system && !I.admin,
		context: `${e.name} · ${e.label}`,
		pickFile: (e) => fe(t, e),
		onChange: (t) => De(() => A.services.setStartup(e.app, e.entry, e.startup, t), n)
	});
	return d("div", { class: "su-params" }, r.el);
}
async function Me(e, { openWindow: t }) {
	let n;
	try {
		n = await A.services.log(e.app, e.entry);
	} catch (e) {
		return O(e.message, { timeout: 7e3 });
	}
	let r = new i({
		title: F("services.log.title", { name: `${e.name} · ${e.label}` }),
		icon: "list",
		width: 620,
		height: 380
	}), a = (e) => new Date(e).toLocaleTimeString(x.locale);
	r.body.append(d("div", {
		class: "su-log",
		tabindex: "0",
		"aria-label": F("services.log.label")
	}, n.length ? n.map((e) => d("div", { class: `su-line ${e.level}` }, d("span", {}, a(e.at)), ` ${e.text}`)) : d("p", { class: "su-empty" }, F("services.log.empty")))), t(r);
}
// src/settings/startup.js
function Ne({ rerender: e }) {
	return [{
		title: F("startup.auto.title"),
		rows: [Oe(e), {
			label: F("startup.openApps.label"),
			description: F("startup.openApps.description"),
			keywords: F("startup.openApps.keywords"),
			control: k({
				value: S.get("startupApps"),
				label: F("startup.openApps.label"),
				onChange: (e) => S.set("startupApps", e)
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
function Pe(e) {
	let t = M.apps().filter((e) => j.some((t) => t.id === e.app));
	return [{
		title: F("startup.apps.title"),
		content: () => d("div", { class: "su-apps" }, d("p", { class: "su-hint" }, F("startup.apps.hint")), t.length ? t.map((t) => Fe(t, e)) : d("p", { class: "su-empty" }, F("startup.apps.none")), Le(t, e))
	}];
}
function Fe(e, t) {
	let n = j.find((t) => t.id === e.app), r = M.windowEntries(n.id), i = new Map(e.entries.map((e) => [e.entry, e.params])), s = r.filter((e) => i.has(e.entry)).length, c = d("div", { class: "st-row su-head" }, o(n, "su-icon"), d("div", { class: "st-label" }, d("b", {}, n.name), d("small", {}, r.length === 1 ? F("startup.apps.oneEntry") : F("startup.apps.entries", {
		on: s,
		n: r.length
	}))), a({
		label: F("startup.apps.remove"),
		onClick: () => {
			M.removeApp(n.id), t.rerender();
		}
	})), l = r.flatMap((e) => {
		let r = i.has(e.entry), a = d("div", { class: "st-row su-entry" }, k({
			value: r,
			label: `${n.name}: ${e.label}`,
			onChange: (r) => {
				try {
					M.setEntry(n.id, e.entry, r);
				} catch (e) {
					O(e.message);
				}
				t.rerender();
			}
		}), d("div", { class: "st-label" }, d("b", {}, e.label), d("small", {}, d("code", {}, e.entry))));
		return r ? [a, Ie(n, e, i.get(e.entry), t)] : [a];
	});
	return d("div", { class: "st-card su-app" }, c, l);
}
function Ie(e, t, n, { openWindow: r }) {
	let i = F("startup.params.of", {
		entry: t.label,
		app: e.name
	});
	if (!t.params) {
		let r = F("startup.params.undescribed"), a = d("span", { class: "su-note" }, r), o = d("textarea", {
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
		}), d("div", { class: "su-params su-params-json" }, d("span", { class: "su-plabel" }, F("startup.params.json")), d("span"), o, a);
	}
	let a = xe(t.params, n, {
		t: F,
		context: i,
		pickFile: (e) => fe(r, e),
		onChange: (n) => {
			try {
				M.setParams(e.id, t.entry, n);
			} catch (e) {
				return O(e.message, { timeout: 6e3 }), !1;
			}
		}
	});
	return d("div", { class: "su-params" }, a.el);
}
function Le(e, { rerender: t }) {
	let n = a({
		label: F("common.addMore"),
		onClick: () => {
			let r = j.filter((t) => t.load && !e.some((e) => e.app === t.id) && M.windowEntries(t.id).length).sort((e, t) => e.name.localeCompare(t.name));
			if (!r.length) return O(F("startup.apps.allAdded"));
			let i = n.getBoundingClientRect();
			v(i.left, i.bottom + 4, r.map((e) => ({
				label: e.name,
				icon: e.glyph,
				action: () => {
					try {
						M.addApp(e.id);
					} catch (e) {
						O(e.message);
					}
					t();
				}
			})));
		}
	});
	return d("div", { class: "st-row su-add" }, d("span", { class: "su-plus" }, f("plus")), d("div", { class: "st-label" }, d("b", {}, F("startup.apps.add")), d("small", {}, F("startup.apps.addDescription"))), n);
}
// src/settings/pipes.js
var Re = ["before", "after"], ze = (e) => {
	let t = `pipes.event.${e.name}`, n = F(t);
	return n === t ? e.label : n;
}, Be = (e) => {
	if (!e.owner) return ze(e);
	let t = j.find((t) => t.id === e.owner)?.name ?? e.owner;
	return F("pipes.owned", {
		label: ze(e),
		app: t
	});
};
function Ve(e) {
	if (!e) return F("pipes.where.all");
	if (typeof e == "string") return F("pipes.where.system");
	let t = [];
	return e.meta === "own" && t.push(F("pipes.where.own")), e.ext && t.push(F("pipes.where.ext", { list: e.ext.map((e) => `.${e}`).join(" ") })), e.type && t.push(F(`pipes.where.type.${e.type}`)), e.app && t.push(F("pipes.where.app", { list: e.app.join(", ") })), t.join(" · ");
}
function He(e, t, n, r) {
	let i = e.chain(t.name, n);
	if (!i.length) return [];
	let o = n === "after" ? [...i].reverse() : i, s = (a, o) => {
		let s = i.map((e) => e.key), c = n === "after" ? i.length - 1 - a : a, l = n === "after" ? c - o : c + o;
		[s[c], s[l]] = [s[l], s[c]], e.setOrder(t.name, n, s), r();
	};
	return o.map((e, t) => {
		let r = e.position, i = (e) => !!e?.app && e.position === r, c = !!e.app && i(o[t - 1]), l = !!e.app && i(o[t + 1]), u = e.app ? e.entry && e.entry !== "main" ? `${e.name} · ${e.entry}` : e.name : F("pipes.lilos"), f = a({
			label: F("pipes.up"),
			onClick: () => s(t, -1)
		}), p = a({
			label: F("pipes.down"),
			onClick: () => s(t, 1)
		});
		return f.disabled = !c, p.disabled = !l, {
			label: `${t + 1}. ${u}`,
			description: `${F(`pipes.stage.${n}`)} · ${F(`pipes.band.${r}`)} · ${Ve(e.where)}`,
			keywords: F("pipes.keywords"),
			control: c || l ? d("span", { class: "pipes-move" }, f, p) : null
		};
	});
}
function Ue({ rerender: t }) {
	let n = e.pipes;
	if (!n) return [{
		title: F("pipes.title"),
		rows: [{ label: F("pipes.unsupported") }]
	}];
	let r = n.catalog(), i = r.filter((e) => Re.some((t) => n.chain(e.name, t).length)), o = [{
		title: F("pipes.title"),
		rows: [{
			label: F("pipes.intro.label"),
			description: F("pipes.intro.description", { count: r.length }),
			keywords: F("pipes.keywords")
		}]
	}];
	for (let e of i) {
		let r = Re.flatMap((r) => He(n, e, r, t));
		Re.some((t) => n.isCustomOrder(e.name, t)) && r.push({
			label: F("pipes.reset.label"),
			description: F("pipes.reset.description"),
			control: a({
				label: F("common.reset"),
				onClick: () => {
					Re.forEach((t) => n.setOrder(e.name, t, null)), t();
				}
			})
		}), o.push({
			title: `${Be(e)} · ${e.name}`,
			rows: r
		});
	}
	let s = r.filter((e) => !i.includes(e));
	return o.push({
		title: F("pipes.idle.title"),
		rows: s.length ? [{
			label: s.map(Be).join(", "),
			description: F("pipes.idle.description", { count: s.length })
		}] : [{ label: F("pipes.idle.none") }]
	}), o;
}
var We = (t) => e.pipes?.on("change", t) ?? null, { h: L, uid: Ge, toggle: Ke, textField: qe, actionButton: Je, fs: Ye } = e, Xe = (e, t) => !e.when || Object.entries(e.when).every(([e, n]) => Array.isArray(n) ? n.includes(t[e]) : t[e] === n), Ze = (t) => e.net?.text?.(t) ?? (typeof t == "string" ? t : ""), Qe = (e) => e.secret || e.type === "password";
function $e(e, t) {
	for (let n of e) !Qe(n) && n.type !== "signin" && t[n.key] === void 0 && n.default !== void 0 && (t[n.key] = n.default);
	return t;
}
var et = (e, t) => (e.options ?? []).find((e) => String(e.value) === t)?.value;
function tt(e, t, n, r = {}) {
	return L("select", {
		class: "ctl-select",
		...r
	}, ...(e.options ?? []).map((e) => L("option", {
		value: String(e.value),
		selected: e.value === t,
		disabled: !!e.disabled
	}, n(e.label))));
}
function R(e, t, { t: n, save: r, secrets: i = [], text: a = Ze, keywords: o } = {}) {
	let s = $e(e, { ...t });
	return e.filter((e) => e.type !== "signin" && e.type !== "file" && Xe(e, s)).map((e) => ({
		label: a(e.label),
		description: e.hint ? a(e.hint) : void 0,
		keywords: o,
		control: () => nt(e, s[e.key], {
			t: n,
			save: r,
			set: i.includes(e.key),
			text: a
		})
	}));
}
function nt(e, t, { t: n, save: r, set: i, text: a }) {
	let o = a(e.label);
	if (e.type === "checkbox") return Ke({
		value: t === !0,
		label: o,
		onChange: (t) => r(e, t)
	});
	if (e.type === "select") {
		let n = tt(e, t, a, { "aria-label": o });
		return n.addEventListener("change", () => r(e, et(e, n.value))), n;
	}
	if (Qe(e)) {
		let t = L("input", {
			class: "ctl-text sh-setting-text",
			type: "password",
			autocomplete: "new-password",
			placeholder: n(i ? "shared.fields.secretSet" : "shared.fields.secretEmpty"),
			"aria-label": o
		});
		return t.addEventListener("change", () => {
			t.value.trim() && r(e, t.value.trim());
		}), L("div", { class: "sh-setting-secret" }, t, i ? Je({
			label: n("shared.fields.secretRemove"),
			danger: !0,
			onClick: () => r(e, null)
		}) : null);
	}
	if (e.type === "textarea") {
		let n = L("textarea", {
			class: "ctl-text sh-setting-area",
			rows: "5",
			spellcheck: "false",
			placeholder: e.placeholder ?? "",
			"aria-label": o
		});
		return n.value = t ?? "", n.addEventListener("change", () => r(e, n.value)), n;
	}
	if (e.type === "number") {
		let n = L("input", {
			class: "ctl-text sh-setting-number",
			type: "number",
			placeholder: e.placeholder ?? "",
			"aria-label": o,
			min: e.min ?? null,
			max: e.max ?? null
		});
		return n.value = t ?? "", n.addEventListener("change", () => r(e, n.value === "" ? "" : Number(n.value))), n;
	}
	let s = qe({
		value: t ?? "",
		placeholder: e.placeholder ?? "",
		label: o,
		onChange: (t) => r(e, t.trim())
	});
	return s.classList.add("sh-setting-text"), s;
}
// src/settings/onedrive.js
var rt = "onedrive", it = {
	mount: null,
	folder: "/lilOS",
	ifExists: "ask",
	doubleClick: !0
};
function at() {
	let e = w.get(rt, {}) ?? {};
	return {
		...it,
		...e && typeof e == "object" && !Array.isArray(e) ? e : {}
	};
}
var ot = (e, t) => w.set(rt, {
	...at(),
	[e]: t
}), st = () => [ct(), lt()];
function ct() {
	let e = at(), t = _.mounts().filter((e) => e.protocol === "onedrive");
	return {
		title: F("onedrive.upload.title"),
		rows: [
			{
				label: F("onedrive.upload.mount.label"),
				description: t.length ? F("onedrive.upload.mount.description") : F("onedrive.upload.mount.none"),
				keywords: F("cloud.onedrive.keywords"),
				control: () => {
					let n = [{
						value: "",
						label: F("onedrive.upload.mount.ask")
					}, ...t.map((e) => ({
						value: e.id,
						label: `${e.name} · ${e.values?.account ?? e.address}`
					}))], r = b({
						value: t.some((t) => t.id === e.mount) ? e.mount : "",
						options: n,
						label: F("onedrive.upload.mount.label"),
						onChange: (e) => ot("mount", e || null)
					});
					return r.disabled = !t.length, r;
				}
			},
			{
				label: F("onedrive.upload.folder.label"),
				description: F("onedrive.upload.folder.description"),
				keywords: F("cloud.onedrive.keywords"),
				control: () => {
					let t = D({
						value: e.folder,
						placeholder: it.folder,
						label: F("onedrive.upload.folder.label"),
						onChange: (e) => ot("folder", ut(e))
					});
					return t.classList.add("od-text"), t;
				}
			},
			{
				label: F("onedrive.upload.exists.label"),
				description: F("onedrive.upload.exists.description"),
				keywords: F("cloud.onedrive.keywords"),
				control: () => b({
					value: e.ifExists,
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
					onChange: (e) => ot("ifExists", e)
				})
			}
		]
	};
}
function lt() {
	return {
		title: F("onedrive.office.title"),
		rows: [{
			label: F("onedrive.office.doubleClick.label"),
			description: F("onedrive.office.doubleClick.description"),
			keywords: F("cloud.onedrive.keywords"),
			control: () => k({
				value: at().doubleClick !== !1,
				label: F("onedrive.office.doubleClick.label"),
				onChange: (e) => ot("doubleClick", e)
			})
		}]
	};
}
function ut(e) {
	let t = String(e ?? "").split(/[/\\]+/).map((e) => e.trim()).filter((e) => e && e !== "." && e !== "..");
	return t.length ? `/${t.join("/")}` : it.folder;
}
// src/settings/cloud.js
var z = {
	onedrive: {
		module: "netfs-onedrive",
		icon: "cloud",
		uses: "microsoft",
		signAgain: ["shared"],
		sections: st
	},
	gdrive: {
		module: "netfs-google",
		icon: "cloud",
		uses: "google",
		hide: ["photos"]
	},
	gphotos: {
		module: "netfs-google",
		icon: "image",
		uses: "google",
		hide: ["shared", "exportFormat"]
	},
	azblob: {
		module: "netfs-azblob",
		icon: "cloud",
		uses: "microsoft",
		steps: 3
	},
	nfs: {
		module: "netfs-nfs",
		icon: "disk",
		steps: 4
	},
	localfolders: {
		module: "netfs-local",
		icon: "monitor",
		protocols: ["local"],
		steps: 2
	},
	microsoft: {
		app: "microsoft",
		icon: "lock",
		protocols: ["onedrive", "azblob"],
		steps: 5
	},
	google: {
		app: "google",
		icon: "lock",
		protocols: ["gdrive", "gphotos"],
		steps: 7
	}
}, dt = [
	"clientId",
	"clientSecret",
	"clientType",
	"accounts",
	"tenant"
], ft = "/api/net/signin/callback", pt = "http://127.0.0.1:53682/", B = /* @__PURE__ */ new Map(), mt = /* @__PURE__ */ new Map(), ht = /* @__PURE__ */ new Map(), gt = () => p.user?.role === "admin", _t = (e) => !!_.protocols?.some((t) => t.id === e), vt = (e) => z[e].protocols ?? [e];
function yt(e) {
	return Object.entries(z).filter(([e]) => vt(e).some(_t)).map(([t, n]) => ({
		id: t,
		icon: n.icon,
		get label() {
			return F(`cloud.${t}.label`);
		},
		get description() {
			return F(`cloud.${t}.description`);
		},
		sections: () => Ct(t, e)
	}));
}
var bt = (e) => Object.hasOwn(z, e);
function xt(e) {
	B.delete(e), ht.delete(e);
}
function St(e, t) {
	if (!gt()) {
		B.set(e, { readOnly: !0 });
		return;
	}
	if (mt.has(e)) return;
	let n = z[e], r = n.app ? m.oauthApps().then((e) => e.find((e) => e.id === n.app) ?? { error: "" }) : m.settings(n.module);
	mt.set(e, r.then((t) => B.set(e, t), (t) => B.set(e, { error: t.message })).finally(() => {
		mt.delete(e), t();
	}));
}
function Ct(e, t) {
	B.has(e) || St(e, t.rerender);
	let n = z[e], r = [wt(e, t)];
	return n.app && r.push(Et(n.app)), n.steps && r.push({
		title: F(`cloud.${e}.steps.title`),
		rows: [{
			label: F(`cloud.${e}.steps.label`),
			control: () => d("ol", { class: "od-steps" }, ...Array.from({ length: n.steps }, (t, n) => d("li", {}, F(`cloud.${e}.steps.${n + 1}`))))
		}]
	}), n.sections && r.push(...n.sections(t)), r;
}
function wt(e, { rerender: t, select: n }) {
	let r = z[e], i = B.get(e), o = [];
	if (!i) o.push({ label: F("common.loading") });
	else if (i.error) o.push({
		label: F("cloud.error"),
		description: i.error
	});
	else if (i.readOnly) {
		let t = vt(e).filter(_t).every((e) => !_.protocols.find((t) => t.id === e).notReady);
		o.push({
			label: F("cloud.status"),
			description: F("cloud.adminOnly"),
			control: F(t ? "cloud.ready" : "cloud.notReady")
		});
	} else {
		let n = /* @__PURE__ */ new Set([...r.hide ?? [], ...r.module ? dt : []]), a = i.fields.filter((e) => !n.has(e.key));
		o.push(...R(a, i.values, {
			t: F,
			secrets: i.secrets ?? [],
			keywords: F(`cloud.${e}.keywords`),
			save: (n, r) => Tt(e, n, r, t)
		})), r.app && i.ready && o.push({
			label: F("cloud.status"),
			description: _.text(i.ready),
			control: F("cloud.notReady")
		}), e === "nfs" && o.push({
			label: F("cloud.nfs.you"),
			description: F("cloud.nfs.you.description"),
			control: () => d("code", {}, p.user?.username ?? "")
		});
		let s = ht.get(e);
		s && o.push({
			label: s.ok ? F("cloud.saved") : F("cloud.notSaved"),
			description: s.text
		});
	}
	return r.uses && o.push({
		label: F(`cloud.uses.${r.uses}`),
		description: F("cloud.uses.description"),
		keywords: F(`cloud.${e}.keywords`),
		control: () => a({
			label: F("cloud.uses.open"),
			onClick: () => n(r.uses)
		})
	}), {
		title: F(`cloud.${e}.settings`),
		rows: o
	};
}
async function Tt(e, t, n, r) {
	let i = z[e], a = B.get(e), o = Object.fromEntries(Object.entries(a.values).filter(([e]) => a.fields.some((t) => t.key === e && t.type !== "password")));
	t.type === "password" ? o[t.key] = n : n === "" || n === void 0 ? delete o[t.key] : o[t.key] = n;
	try {
		B.set(e, await (i.app ? m.saveOAuthApp(i.app, o) : m.saveSettings(i.module, o))), ht.set(e, {
			ok: !0,
			text: i.signAgain?.includes(t.key) ? F("cloud.signAgain") : ""
		}), await _.load();
	} catch (t) {
		ht.set(e, {
			ok: !1,
			text: t.message
		});
	}
	r();
}
function Et(e) {
	let t = (e) => a({
		label: F("cloud.copy"),
		onClick: () => navigator.clipboard?.writeText(e).then(() => O(F("cloud.copied")), () => {})
	}), n = `${location.origin}${ft}`, r = location.protocol === "https:" || [
		"localhost",
		"127.0.0.1",
		"[::1]"
	].includes(location.hostname);
	return {
		title: F("cloud.addresses.title"),
		rows: [{
			label: F("cloud.redirect.label"),
			description: F(r ? `cloud.redirect.${e}` : "cloud.redirect.unusable"),
			control: () => d("div", { class: "od-redirect" }, d("code", {}, n), t(n))
		}, {
			label: F("cloud.byHand.label"),
			description: F(`cloud.byHand.${e}`),
			control: () => d("div", { class: "od-redirect" }, d("code", {}, pt), t(pt))
		}]
	};
}
var Dt = {
	libraries: [
		{
			kind: "library",
			name: "@azure-rest/core-client",
			version: "2.9.0",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation.",
			url: "https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-client-rest/",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/abort-controller",
			version: "2.2.0",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation.",
			url: "https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/abort-controller/README.md",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/core-auth",
			version: "1.11.0",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation.",
			url: "https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-auth/README.md",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/core-client",
			version: "1.11.2",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation.",
			url: "https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-client/",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/core-lro",
			version: "2.7.2",
			license: "MIT",
			copyright: "Copyright (c) 2020 Microsoft",
			url: "https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-lro/README.md",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/core-paging",
			version: "1.7.0",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation.",
			url: "https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-paging/README.md",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/core-process",
			version: "1.0.0",
			license: "MIT",
			copyright: "Copyright (c) 2018 Microsoft",
			url: "https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-process",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/core-rest-pipeline",
			version: "1.25.1",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation.",
			url: "https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/core-rest-pipeline/README.md",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/core-tracing",
			version: "1.4.0",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation.",
			url: "https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-tracing/README.md",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/core-util",
			version: "1.14.0",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation.",
			url: "https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-util/",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/identity",
			version: "4.14.1",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation.",
			url: "https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity/README.md",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/keyvault-common",
			version: "2.1.1",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation.",
			url: "https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-common/README.md",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/keyvault-keys",
			version: "4.10.2",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation.",
			url: "https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-keys/README.md",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/logger",
			version: "1.4.0",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation.",
			url: "https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger/README.md",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/msal-browser",
			version: "5.29.0",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation. All rights reserved.",
			url: "https://github.com/AzureAD/microsoft-authentication-library-for-js",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/msal-common",
			version: "16.16.1",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation. All rights reserved.",
			url: "https://github.com/AzureAD/microsoft-authentication-library-for-js",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@azure/msal-node",
			version: "7.2.1",
			license: "MIT",
			copyright: "Copyright (c) 2020 Microsoft",
			url: "https://github.com/AzureAD/microsoft-authentication-library-for-js",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@ioredis/commands",
			version: "2.0.0",
			license: "MIT",
			copyright: "Copyright (c) 2022 Zihua Li",
			url: "https://github.com/ioredis/commands",
			usedBy: ["module:logicstudio-redis"],
			via: ["ioredis"]
		},
		{
			kind: "library",
			name: "@js-joda/core",
			version: "6.3.2",
			license: "BSD-3-Clause",
			copyright: "Copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper",
			url: "https://js-joda.github.io/js-joda",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "@mongodb-js/saslprep",
			version: "1.6.3",
			license: "MIT",
			copyright: "Copyright (c) 2014 Dmitry Tsvettsikh",
			url: "https://github.com/mongodb-js/devtools-shared/tree/main/packages/saslprep",
			usedBy: ["module:logicstudio-mongodb"],
			via: ["mongodb"]
		},
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
			name: "@typespec/ts-http-runtime",
			version: "0.3.10",
			license: "MIT",
			copyright: "Copyright (c) Microsoft Corporation.",
			url: "https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/ts-http-runtime/README.md",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
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
			name: "abort-controller",
			version: "3.0.0",
			license: "MIT",
			copyright: "Copyright (c) 2017 Toru Nagashima",
			url: "https://github.com/mysticatea/abort-controller",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "agent-base",
			version: "9.0.0",
			license: "MIT",
			copyright: "Copyright (c) 2013 Nathan Rajlich <nathan@tootallnate.net>",
			url: "https://github.com/TooTallNate/proxy-agents",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "asn1",
			version: "0.2.6",
			license: "MIT",
			copyright: "Copyright (c) 2011 Mark Cavage, All rights reserved.",
			url: "https://github.com/joyent/node-asn1",
			usedBy: ["module:ssh"],
			via: ["ssh2"]
		},
		{
			kind: "library",
			name: "aws-ssl-profiles",
			version: "1.1.2",
			license: "MIT",
			copyright: "Copyright (c) 2024 Andrey Sidorov, Douglas Wilson, Weslley Araújo and contributors.",
			url: "https://github.com/mysqljs/aws-ssl-profiles",
			usedBy: ["module:logicstudio-db"],
			via: ["mysql2"]
		},
		{
			kind: "library",
			name: "base64-js",
			version: "1.5.1",
			license: "MIT",
			copyright: "Copyright (c) 2014 Jameson Little",
			url: "https://github.com/beatgammit/base64-js",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
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
			usedBy: ["module:ssh"],
			via: ["ssh2"]
		},
		{
			kind: "library",
			name: "bl",
			version: "6.1.6",
			license: "MIT",
			copyright: "Copyright (c) 2013-2019 bl contributors",
			url: "https://github.com/rvagg/bl",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "bson",
			version: "7.3.4",
			license: "Apache-2.0",
			copyright: "© The MongoDB NodeJS Team",
			url: "https://github.com/mongodb/js-bson",
			usedBy: ["module:logicstudio-mongodb"],
			via: ["mongodb"]
		},
		{
			kind: "library",
			name: "buffer",
			version: "6.0.3",
			license: "MIT",
			copyright: "Copyright (c) Feross Aboukhadijeh, and other contributors.",
			url: "https://github.com/feross/buffer",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "buffer-equal-constant-time",
			version: "1.0.1",
			license: "BSD-3-Clause",
			copyright: "Copyright (c) 2013, GoInstant Inc., a salesforce.com company",
			url: "git@github.com:goinstant/buffer-equal-constant-time",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "buildcheck",
			version: "0.0.7",
			license: "MIT",
			copyright: "Copyright Brian White. All rights reserved.",
			url: "https://github.com/mscdex/buildcheck",
			usedBy: ["module:ssh"],
			via: ["ssh2"],
			optional: !0
		},
		{
			kind: "library",
			name: "bundle-name",
			version: "4.1.1",
			license: "MIT",
			copyright: "Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)",
			url: "https://github.com/sindresorhus/bundle-name",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
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
			name: "cluster-key-slot",
			version: "1.1.1",
			license: "Apache-2.0",
			copyright: "Copyright (c) 2018 Mike Diarmid (Salakar) <mike.diarmid@gmail.com>",
			url: "https://github.com/Salakar/cluster-key-slot",
			usedBy: ["module:logicstudio-redis"],
			via: ["ioredis"]
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
			usedBy: ["module:ssh"],
			via: ["ssh2"],
			optional: !0
		},
		{
			kind: "library",
			name: "debug",
			version: "4.4.3",
			license: "MIT",
			copyright: "Copyright (c) 2014-2017 TJ Holowaychuk <tj@vision-media.ca>",
			url: "https://github.com/debug-js/debug",
			usedBy: ["module:logicstudio-db", "module:logicstudio-redis"],
			via: ["ioredis", "tedious"]
		},
		{
			kind: "library",
			name: "default-browser",
			version: "5.5.1",
			license: "MIT",
			copyright: "Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)",
			url: "https://github.com/sindresorhus/default-browser",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "default-browser-id",
			version: "5.0.1",
			license: "MIT",
			copyright: "Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)",
			url: "https://github.com/sindresorhus/default-browser-id",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "define-lazy-prop",
			version: "3.0.0",
			license: "MIT",
			copyright: "Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)",
			url: "https://github.com/sindresorhus/define-lazy-prop",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "denque",
			version: "2.1.0",
			license: "Apache-2.0",
			copyright: "Copyright 2018-present Invertase Limited",
			url: "https://docs.page/invertase/denque",
			usedBy: ["module:logicstudio-redis"],
			via: ["ioredis"]
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
			name: "ecdsa-sig-formatter",
			version: "1.0.11",
			license: "Apache-2.0",
			copyright: "Copyright 2015 D2L Corporation",
			url: "https://github.com/Brightspace/node-ecdsa-sig-formatter",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "event-target-shim",
			version: "5.0.1",
			license: "MIT",
			copyright: "Copyright (c) 2015 Toru Nagashima",
			url: "https://github.com/mysticatea/event-target-shim",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "events",
			version: "3.3.0",
			license: "MIT",
			copyright: "Copyright Joyent, Inc. and other Node contributors.",
			url: "https://github.com/Gozala/events",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "generate-function",
			version: "2.3.1",
			license: "MIT",
			copyright: "Copyright (c) 2014 Mathias Buus",
			url: "https://github.com/mafintosh/generate-function",
			usedBy: ["module:logicstudio-db"],
			via: ["mysql2"]
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
			name: "http-proxy-agent",
			version: "9.1.0",
			license: "MIT",
			copyright: "Copyright (c) 2013 Nathan Rajlich <nathan@tootallnate.net>",
			url: "https://github.com/TooTallNate/proxy-agents",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "https-proxy-agent",
			version: "9.1.0",
			license: "MIT",
			copyright: "Copyright (c) 2013 Nathan Rajlich <nathan@tootallnate.net>",
			url: "https://github.com/TooTallNate/proxy-agents",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "iconv-lite",
			version: "0.7.3",
			license: "MIT",
			copyright: "Copyright (c) 2011 Alexander Shtuchkin",
			url: "https://github.com/pillarjs/iconv-lite",
			usedBy: ["module:logicstudio-db"],
			via: ["mysql2", "tedious"]
		},
		{
			kind: "library",
			name: "ieee754",
			version: "1.2.1",
			license: "BSD-3-Clause",
			copyright: "Copyright 2008 Fair Oaks Labs, Inc.",
			url: "https://github.com/feross/ieee754",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "inherits",
			version: "2.0.4",
			license: "ISC",
			copyright: "Copyright (c) Isaac Z. Schlueter",
			url: "https://github.com/isaacs/inherits",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "ioredis",
			version: "6.0.0",
			license: "MIT",
			copyright: "Copyright (c) 2015-2022 Zihua Li",
			url: "https://github.com/redis/ioredis",
			usedBy: ["module:logicstudio-redis"]
		},
		{
			kind: "library",
			name: "is-docker",
			version: "3.0.0",
			license: "MIT",
			copyright: "Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)",
			url: "https://github.com/sindresorhus/is-docker",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "is-in-ssh",
			version: "1.0.0",
			license: "MIT",
			copyright: "Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)",
			url: "https://github.com/sindresorhus/is-in-ssh",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "is-inside-container",
			version: "1.0.0",
			license: "MIT",
			copyright: "Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)",
			url: "https://github.com/sindresorhus/is-inside-container",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "is-property",
			version: "1.0.2",
			license: "MIT",
			copyright: "Copyright (c) 2013 Mikola Lysenko",
			url: "https://github.com/mikolalysenko/is-property",
			usedBy: ["module:logicstudio-db"],
			via: ["mysql2"]
		},
		{
			kind: "library",
			name: "is-wsl",
			version: "3.1.1",
			license: "MIT",
			copyright: "Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)",
			url: "https://github.com/sindresorhus/is-wsl",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
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
			name: "js-md4",
			version: "0.3.2",
			license: "MIT",
			copyright: "Copyright 2015-2017 Yi-Cyuan Chen",
			url: "https://github.com/emn178/js-md4",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
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
			name: "jsonwebtoken",
			version: "9.0.3",
			license: "MIT",
			copyright: "Copyright (c) 2015 Auth0, Inc. <support@auth0.com> (http://auth0.com)",
			url: "https://github.com/auth0/node-jsonwebtoken",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "jwa",
			version: "2.0.1",
			license: "MIT",
			copyright: "Copyright (c) 2013 Brian J. Brennan",
			url: "https://github.com/brianloveswords/node-jwa",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "jws",
			version: "4.0.1",
			license: "MIT",
			copyright: "Copyright (c) 2013 Brian J. Brennan",
			url: "https://github.com/brianloveswords/node-jws",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "lodash.includes",
			version: "4.3.0",
			license: "MIT",
			copyright: "Copyright jQuery Foundation and other contributors <https://jquery.org/>",
			url: "https://lodash.com/",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "lodash.isboolean",
			version: "3.0.3",
			license: "MIT",
			copyright: "Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>",
			url: "https://lodash.com/",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "lodash.isinteger",
			version: "4.0.4",
			license: "MIT",
			copyright: "Copyright jQuery Foundation and other contributors <https://jquery.org/>",
			url: "https://lodash.com/",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "lodash.isnumber",
			version: "3.0.3",
			license: "MIT",
			copyright: "Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>",
			url: "https://lodash.com/",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "lodash.isplainobject",
			version: "4.0.6",
			license: "MIT",
			copyright: "Copyright jQuery Foundation and other contributors <https://jquery.org/>",
			url: "https://lodash.com/",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "lodash.isstring",
			version: "4.0.1",
			license: "MIT",
			copyright: "Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>",
			url: "https://lodash.com/",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "lodash.once",
			version: "4.1.1",
			license: "MIT",
			copyright: "Copyright jQuery Foundation and other contributors <https://jquery.org/>",
			url: "https://lodash.com/",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "long",
			version: "5.3.2",
			license: "Apache-2.0",
			copyright: "© Daniel Wirtz",
			url: "https://github.com/dcodeIO/long.js",
			usedBy: ["module:call-grpc", "module:logicstudio-db"],
			via: ["mysql2", "protobufjs"]
		},
		{
			kind: "library",
			name: "lru.min",
			version: "1.1.5",
			license: "MIT",
			copyright: "Copyright (c) 2024-current Weslley Araújo (@wellwelwel)",
			url: "https://github.com/wellwelwel/lru.min",
			usedBy: ["module:logicstudio-db"],
			via: ["mysql2"]
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
			name: "memory-pager",
			version: "1.5.0",
			license: "MIT",
			copyright: "Copyright (c) 2017 Mathias Buus",
			url: "https://github.com/mafintosh/memory-pager",
			usedBy: ["module:logicstudio-mongodb"],
			via: ["mongodb"]
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
			name: "mongodb",
			version: "7.8.0",
			license: "Apache-2.0",
			copyright: "Copyright {yyyy} {name of copyright owner}",
			url: "https://github.com/mongodb/node-mongodb-native",
			usedBy: ["module:logicstudio-mongodb"]
		},
		{
			kind: "library",
			name: "mongodb-connection-string-url",
			version: "7.0.2",
			license: "Apache-2.0",
			copyright: "Copyright 2020 MongoDB Inc.",
			url: "https://github.com/mongodb-js/mongodb-connection-string-url",
			usedBy: ["module:logicstudio-mongodb"],
			via: ["mongodb"]
		},
		{
			kind: "library",
			name: "ms",
			version: "2.1.3",
			license: "MIT",
			copyright: "Copyright (c) 2020 Vercel, Inc.",
			url: "https://github.com/vercel/ms",
			usedBy: ["module:logicstudio-db", "module:logicstudio-redis"],
			via: ["ioredis", "tedious"]
		},
		{
			kind: "library",
			name: "mysql2",
			version: "3.24.6",
			license: "MIT",
			copyright: "Copyright (c) 2016 Andrey Sidorov (sidorares@yandex.ru) and contributors",
			url: "https://sidorares.github.io/node-mysql2/docs",
			usedBy: ["module:logicstudio-db"]
		},
		{
			kind: "library",
			name: "named-placeholders",
			version: "1.1.6",
			license: "MIT",
			copyright: "Copyright (c) 2014 Andrey Sidorov",
			url: "https://github.com/mysqljs/named-placeholders",
			usedBy: ["module:logicstudio-db"],
			via: ["mysql2"]
		},
		{
			kind: "library",
			name: "nan",
			version: "2.30.0",
			license: "MIT",
			copyright: "Copyright (c) 2018 [NAN contributors](<https://github.com/nodejs/nan#wg-members--collaborators>)",
			url: "https://github.com/nodejs/nan",
			usedBy: ["module:ssh"],
			via: ["ssh2"],
			optional: !0
		},
		{
			kind: "library",
			name: "native-duplexpair",
			version: "1.0.0",
			license: "MIT",
			copyright: "Copyright (c) 2017 Anna Henningsen",
			url: "https://github.com/tediousjs/native-duplexpair",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
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
			name: "open",
			version: "11.0.4",
			license: "MIT",
			copyright: "Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)",
			url: "https://github.com/sindresorhus/open",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "oracledb",
			version: "26.0.0",
			license: "(Apache-2.0 OR UPL-1.0)",
			copyright: "Copyright (c) 2015, 2026, Oracle and/or its affiliates.",
			url: "https://oracle.github.io/node-oracledb/",
			usedBy: ["module:logicstudio-db"]
		},
		{
			kind: "library",
			name: "pg",
			version: "8.23.1",
			license: "MIT",
			copyright: "Copyright (c) 2010 - 2021 Brian Carlson",
			url: "https://github.com/brianc/node-postgres",
			usedBy: ["module:fs-postgres", "module:logicstudio-db"]
		},
		{
			kind: "library",
			name: "pg-cloudflare",
			version: "1.4.1",
			license: "MIT",
			copyright: "Copyright (c) 2010 - 2021 Brian Carlson",
			url: "https://github.com/brianc/node-postgres",
			usedBy: ["module:fs-postgres", "module:logicstudio-db"],
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
			usedBy: ["module:fs-postgres", "module:logicstudio-db"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "pg-int8",
			version: "1.0.1",
			license: "ISC",
			copyright: "Copyright © 2017, Charmander <~@charmander.me>",
			url: "https://github.com/charmander/pg-int8",
			usedBy: ["module:fs-postgres", "module:logicstudio-db"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "pg-pool",
			version: "3.14.0",
			license: "MIT",
			copyright: "Copyright (c) 2017 Brian M. Carlson",
			url: "https://github.com/brianc/node-postgres/tree/master/packages/pg-pool",
			usedBy: ["module:fs-postgres", "module:logicstudio-db"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "pg-protocol",
			version: "1.16.1",
			license: "MIT",
			copyright: "Copyright (c) 2010 - 2021 Brian Carlson",
			url: "https://github.com/brianc/node-postgres",
			usedBy: ["module:fs-postgres", "module:logicstudio-db"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "pg-types",
			version: "2.2.0",
			license: "MIT",
			copyright: "© Brian M. Carlson",
			url: "https://github.com/brianc/node-pg-types",
			usedBy: ["module:fs-postgres", "module:logicstudio-db"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "pgpass",
			version: "1.0.5",
			license: "MIT",
			copyright: "© Hannes Hörl",
			url: "https://github.com/hoegaarden/pgpass",
			usedBy: ["module:fs-postgres", "module:logicstudio-db"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "postgres-array",
			version: "2.0.0",
			license: "MIT",
			copyright: "Copyright (c) Ben Drucker <bvdrucker@gmail.com> (bendrucker.me)",
			url: "https://github.com/bendrucker/postgres-array",
			usedBy: ["module:fs-postgres", "module:logicstudio-db"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "postgres-bytea",
			version: "1.0.1",
			license: "MIT",
			copyright: "Copyright (c) Ben Drucker <bvdrucker@gmail.com> (bendrucker.me)",
			url: "https://github.com/bendrucker/postgres-bytea",
			usedBy: ["module:fs-postgres", "module:logicstudio-db"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "postgres-date",
			version: "1.0.7",
			license: "MIT",
			copyright: "Copyright (c) Ben Drucker <bvdrucker@gmail.com> (bendrucker.me)",
			url: "https://github.com/bendrucker/postgres-date",
			usedBy: ["module:fs-postgres", "module:logicstudio-db"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "postgres-interval",
			version: "1.2.0",
			license: "MIT",
			copyright: "Copyright (c) Ben Drucker <bvdrucker@gmail.com> (bendrucker.me)",
			url: "https://github.com/bendrucker/postgres-interval",
			usedBy: ["module:fs-postgres", "module:logicstudio-db"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "powershell-utils",
			version: "0.2.1",
			license: "MIT",
			copyright: "Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)",
			url: "https://github.com/sindresorhus/powershell-utils",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "process",
			version: "0.11.10",
			license: "MIT",
			copyright: "Copyright (c) 2013 Roman Shtylman <shtylman@gmail.com>",
			url: "https://github.com/shtylman/node-process",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
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
			name: "protobufjs",
			version: "8.8.1",
			license: "BSD-3-Clause",
			copyright: "Copyright (c) 2016, Daniel Wirtz  All rights reserved.",
			url: "https://github.com/protobufjs/protobuf.js",
			usedBy: ["module:call-grpc"]
		},
		{
			kind: "library",
			name: "proxy-agent-negotiate",
			version: "1.1.0",
			license: "MIT",
			copyright: "© Nathan Rajlich",
			url: "https://github.com/TooTallNate/proxy-agents",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "punycode",
			version: "2.3.1",
			license: "MIT",
			copyright: "© Mathias Bynens",
			url: "https://mths.be/punycode",
			usedBy: ["module:logicstudio-mongodb"],
			via: ["mongodb"]
		},
		{
			kind: "library",
			name: "readable-stream",
			version: "4.8.0",
			license: "MIT",
			copyright: "Copyright Node.js contributors. All rights reserved.",
			url: "https://github.com/nodejs/readable-stream",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "redis-errors",
			version: "1.2.0",
			license: "MIT",
			copyright: "Copyright (c) 2017 Ruben Bridgewater",
			url: "https://github.com/NodeRedis/redis-errors",
			usedBy: ["module:logicstudio-redis"],
			via: ["ioredis"]
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
			name: "run-applescript",
			version: "7.1.0",
			license: "MIT",
			copyright: "Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)",
			url: "https://github.com/sindresorhus/run-applescript",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "safe-buffer",
			version: "5.2.1",
			license: "MIT",
			copyright: "Copyright (c) Feross Aboukhadijeh",
			url: "https://github.com/feross/safe-buffer",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "safer-buffer",
			version: "2.1.2",
			license: "MIT",
			copyright: "Copyright (c) 2018 Nikita Skovoroda <chalkerx@gmail.com>",
			url: "https://github.com/ChALkeR/safer-buffer",
			usedBy: ["module:logicstudio-db", "module:ssh"],
			via: [
				"mysql2",
				"ssh2",
				"tedious"
			]
		},
		{
			kind: "library",
			name: "semver",
			version: "7.8.6",
			license: "ISC",
			copyright: "Copyright (c) Isaac Z. Schlueter and Contributors",
			url: "https://github.com/npm/node-semver",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
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
			name: "sparse-bitfield",
			version: "3.0.3",
			license: "MIT",
			copyright: "Copyright (c) 2016 Mathias Buus",
			url: "https://github.com/mafintosh/sparse-bitfield",
			usedBy: ["module:logicstudio-mongodb"],
			via: ["mongodb"]
		},
		{
			kind: "library",
			name: "split2",
			version: "4.2.0",
			license: "ISC",
			copyright: "Copyright (c) 2014-2018, Matteo Collina <hello@matteocollina.com>",
			url: "https://github.com/mcollina/split2",
			usedBy: ["module:fs-postgres", "module:logicstudio-db"],
			via: ["pg"]
		},
		{
			kind: "library",
			name: "sql-escaper",
			version: "1.5.2",
			license: "MIT",
			copyright: "Copyright (c) 2026 Weslley Araújo, Andrey Sidorov, Douglas Wilson, and contributors.",
			url: "https://github.com/mysqljs/sql-escaper",
			usedBy: ["module:logicstudio-db"],
			via: ["mysql2"]
		},
		{
			kind: "library",
			name: "sql.js",
			version: "1.16.0",
			license: "MIT",
			copyright: "Copyright (c) 2017 sql.js authors (see AUTHORS)",
			url: "https://github.com/sql-js/sql.js",
			usedBy: ["module:logicstudio-db"]
		},
		{
			kind: "library",
			name: "ssh2",
			version: "1.17.0",
			license: "MIT",
			copyright: "Copyright Brian White. All rights reserved.",
			url: "https://github.com/mscdex/ssh2",
			usedBy: ["module:ssh"]
		},
		{
			kind: "library",
			name: "standard-as-callback",
			version: "2.1.0",
			license: "MIT",
			copyright: "Copyright (c) 2018 Zihua Li",
			url: "https://github.com/luin/asCallback",
			usedBy: ["module:logicstudio-redis"],
			via: ["ioredis"]
		},
		{
			kind: "library",
			name: "string_decoder",
			version: "1.3.0",
			license: "MIT",
			copyright: "Copyright Node.js contributors. All rights reserved.",
			url: "https://github.com/nodejs/string_decoder",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
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
			name: "tedious",
			version: "20.3.8",
			license: "MIT",
			copyright: "Copyright (c) 2010-2026 Mike D Pilsbury",
			url: "https://github.com/tediousjs/tedious",
			usedBy: ["module:logicstudio-db"]
		},
		{
			kind: "library",
			name: "tr46",
			version: "5.1.1",
			license: "MIT",
			copyright: "Copyright (c) Sebastian Mayr",
			url: "https://github.com/jsdom/tr46",
			usedBy: ["module:logicstudio-mongodb"],
			via: ["mongodb"]
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
			name: "tslib",
			version: "2.9.1",
			license: "0BSD",
			copyright: "Copyright (c) Microsoft Corporation.",
			url: "https://www.typescriptlang.org/",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "tweetnacl",
			version: "0.14.5",
			license: "Unlicense",
			copyright: "© TweetNaCl-js contributors",
			url: "https://tweetnacl.js.org",
			usedBy: ["module:ssh"],
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
			name: "webidl-conversions",
			version: "7.0.0",
			license: "BSD-2-Clause",
			copyright: "Copyright (c) 2014, Domenic Denicola",
			url: "https://github.com/jsdom/webidl-conversions",
			usedBy: ["module:logicstudio-mongodb"],
			via: ["mongodb"]
		},
		{
			kind: "library",
			name: "whatwg-url",
			version: "14.2.0",
			license: "MIT",
			copyright: "Copyright (c) Sebastian Mayr",
			url: "https://github.com/jsdom/whatwg-url",
			usedBy: ["module:logicstudio-mongodb"],
			via: ["mongodb"]
		},
		{
			kind: "library",
			name: "wsl-utils",
			version: "1.0.1",
			license: "MIT",
			copyright: "Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)",
			url: "https://github.com/sindresorhus/wsl-utils",
			usedBy: ["module:logicstudio-db"],
			via: ["tedious"]
		},
		{
			kind: "library",
			name: "xtend",
			version: "4.0.2",
			license: "MIT",
			copyright: "Copyright (c) 2012-2014 Raynos.",
			url: "https://github.com/Raynos/xtend",
			usedBy: ["module:fs-postgres", "module:logicstudio-db"],
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
		}
	}
};
// src/settings/credits.js
function Ot(e) {
	if (e === "lilos") return "lilOS";
	if (e.startsWith("module:")) return F("credits.module", { name: e.slice(7) });
	let t = Dt.names[e];
	return t?.[P.lang] ?? t?.en ?? e;
}
function kt(e) {
	let t = e.usedBy.map(Ot).join(", "), n = e.kind === "tool" ? F("credits.builds") : e.kind === "font" ? F("credits.fontUsedBy", { users: t }) : e.via ? F("credits.via", {
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
		control: () => d("a", {
			class: "credits-link",
			href: e.url,
			target: "_blank",
			rel: "noopener noreferrer",
			title: e.url,
			"aria-label": F("credits.siteOf", { name: e.name })
		}, F("credits.site"))
	};
}
function At() {
	let e = (e) => Dt.libraries.filter((t) => t.kind === e), t = e("library").filter((e) => !e.via), n = e("library").filter((e) => e.via);
	return [
		{
			title: F("credits.libraries"),
			rows: t.map(kt)
		},
		{
			title: F("credits.indirect"),
			rows: n.map(kt)
		},
		{
			title: F("credits.fonts"),
			rows: e("font").map(kt)
		},
		{
			title: F("credits.tools"),
			rows: e("tool").map(kt)
		}
	].filter((e) => e.rows.length);
}
// src/settings/computer.js
var V = () => e.host?.native ? e.host : null, jt = () => !p.user || p.user.role === "admin", H = {
	info: null,
	settings: null,
	devices: null,
	servers: null,
	local: null,
	displays: [],
	updates: null,
	loading: null
};
function U(e, t = [
	"info",
	"settings",
	"servers",
	"local",
	"displays"
]) {
	let n = V();
	if (!n) return;
	let r = {
		info: () => n.info(),
		settings: () => n.settings.get(),
		servers: () => n.servers.list(),
		local: () => n.local.status().catch(() => null),
		displays: () => n.displays(),
		devices: () => n.devices.list()
	};
	return H.loading = Promise.all(t.map((e) => r[e]().then((t) => {
		H[e] = t;
	}, () => {}))).then(() => e()), H.loading;
}
var Mt = !1;
function Nt({ rerender: t }) {
	let n = V();
	return n ? (Mt || (Mt = !0, n.on("settings", (e) => {
		H.settings = e, t();
	}), n.on("drives", (e) => {
		H.devices && (H.devices.drives = e, t());
	}), e.net?.on?.("mounts", () => t()), U(t)), {
		id: "computer",
		icon: "monitor",
		get label() {
			return F("computer.label");
		},
		get description() {
			return F("computer.description");
		},
		subtabs: [
			{
				id: "program",
				get label() {
					return F("computer.program.label");
				},
				sections: () => Ft(t)
			},
			{
				id: "screen",
				get label() {
					return F("computer.screen.label");
				},
				sections: () => Lt(t)
			},
			{
				id: "hardware",
				get label() {
					return F("computer.hardware.label");
				},
				sections: () => Bt(t)
			},
			{
				id: "servers",
				get label() {
					return F("computer.servers.label");
				},
				sections: () => Vt(t)
			}
		]
	}) : null;
}
var W = () => [{
	title: "",
	rows: [{
		label: F("computer.loading"),
		control: ""
	}]
}];
function G(e, t, n) {
	return V().settings.set(e, t).then((e) => {
		H.settings = e, n();
	}, (e) => O(F("computer.error", { error: e.message }), { level: "error" }));
}
var Pt = {
	win32: "Windows",
	darwin: "macOS",
	linux: "Linux"
};
function Ft(t) {
	let { info: n, settings: r } = H;
	if (!n || !r) return W();
	let i = n.os === "darwin", o = n.runtime, s = [
		{
			label: F("computer.program.version"),
			control: n.program
		},
		{
			label: F("computer.program.system"),
			control: `${Pt[n.os] ?? n.os} ${n.osVersion} · ${n.arch}`
		},
		{
			label: F("computer.program.engine"),
			control: `Electron ${n.electron} · Chromium ${n.chrome}`
		}
	];
	n.profile.kind === "local" && o && s.push({
		label: F("computer.program.kernel"),
		description: F("computer.program.kernelHint"),
		control: `lilOS ${n.lilos ?? "?"} · Node.js ${o.node} · PostgreSQL ${String(o.postgres).split("-")[0]} · git ${o.git}`
	});
	let c = Array.isArray(n.credits) ? n.credits : [];
	return [
		{
			title: F("computer.program.title"),
			rows: s
		},
		...c.length ? [{
			title: F("computer.credits.title"),
			rows: c.map((t) => ({
				label: `${t.name} ${t.version ?? ""}`.trim(),
				description: `${t.license} · ${t.copyright}${t.use ? ` · ${typeof t.use == "string" ? t.use : e.net?.text?.(t.use) ?? t.use.en}` : ""}`,
				control: t.url ? d("a", {
					class: "credits-link",
					href: t.url,
					target: "_blank",
					rel: "noopener noreferrer"
				}, F("computer.credits.site")) : ""
			}))
		}] : [],
		{
			title: F("computer.updates.title"),
			rows: [{
				label: F("computer.updates.label"),
				description: F(i ? "computer.updates.mac" : "computer.updates.description"),
				control: b({
					value: r.updates,
					label: F("computer.updates.label"),
					onChange: (e) => G("updates", e, t),
					options: [
						{
							value: "auto",
							label: F("computer.updates.auto"),
							disabled: i
						},
						{
							value: "notify",
							label: F("computer.updates.notify")
						},
						{
							value: "off",
							label: F("computer.updates.off")
						}
					]
				})
			}, {
				label: F("computer.updates.check"),
				description: It(),
				control: d("span", { class: "cp-actions" }, a({
					label: F("computer.updates.checkButton"),
					spinner: !0,
					onClick: () => V().updates.check().then((e) => {
						H.updates = e, t();
					})
				}), ["available", "downloaded"].includes(H.updates?.status) ? a({
					label: H.updates.status === "downloaded" ? F("computer.updates.install") : F("computer.updates.download"),
					primary: !0,
					onClick: () => V().updates.install()
				}) : null)
			}]
		},
		{
			title: F("computer.start.title"),
			rows: [
				{
					label: F("computer.start.login"),
					description: F("computer.start.loginHint"),
					control: k({
						value: r.startAtLogin,
						label: F("computer.start.login"),
						onChange: (e) => G("startAtLogin", e, t)
					})
				},
				{
					label: F("computer.start.tray"),
					description: F("computer.start.trayHint"),
					control: k({
						value: r.stayInTray,
						label: F("computer.start.tray"),
						onChange: (e) => G("stayInTray", e, t)
					})
				},
				{
					label: F("computer.start.notifications"),
					description: F("computer.start.notificationsHint"),
					control: k({
						value: r.notifications,
						label: F("computer.start.notifications"),
						onChange: (e) => G("notifications", e, t)
					})
				}
			]
		}
	];
}
function It() {
	let e = H.updates;
	return e ? e.status === "dev" ? F("computer.updates.dev") : e.status === "current" ? F("computer.updates.current") : e.status === "available" ? F("computer.updates.available", { version: e.version }) : e.status === "downloaded" ? F("computer.updates.downloaded", { version: e.version }) : e.status === "error" ? F("computer.updates.failed", { error: e.error ?? "" }) : F("computer.updates.checking") : F("computer.updates.never");
}
function Lt(e) {
	let { info: t, settings: n, displays: r } = H;
	if (!t || !n) return W();
	let i = jt(), o = n.display === "kiosk", s = [{
		label: F("computer.screen.mode"),
		description: F(`computer.screen.${n.display}Hint`),
		control: y({
			value: n.display,
			label: F("computer.screen.mode"),
			options: [
				{
					value: "window",
					label: F("computer.screen.window"),
					disabled: o && !i
				},
				{
					value: "fullscreen",
					label: F("computer.screen.fullscreen"),
					disabled: o && !i
				},
				{
					value: "kiosk",
					label: F("computer.screen.kiosk"),
					disabled: !i
				}
			],
			onChange: (t) => G("display", t, e)
		})
	}];
	return o && !i && s.push({
		label: F("computer.screen.leave"),
		description: F("computer.screen.leaveHint"),
		control: a({
			label: F("computer.screen.leaveButton"),
			onClick: () => Rt(e)
		})
	}), r.length > 1 && s.push({
		label: F("computer.screen.monitor"),
		description: F("computer.screen.monitorHint"),
		control: b({
			value: n.monitor ?? "",
			label: F("computer.screen.monitor"),
			options: [{
				value: "",
				label: F("computer.screen.monitorSame")
			}, ...r.map((e) => ({
				value: String(e.id),
				label: `${e.label}${e.primary ? ` (${F("computer.screen.primary")})` : ""} · ${e.width}×${e.height}`
			}))],
			onChange: (t) => G("monitor", t === "" ? null : Number(t), e)
		})
	}), s.push({
		label: F("computer.screen.keys"),
		description: F(`computer.screen.keysHint.${t.os}`),
		control: k({
			value: n.kioskKeys,
			label: F("computer.screen.keys"),
			onChange: (t) => G("kioskKeys", t, e)
		})
	}), [{
		title: F("computer.screen.title"),
		rows: s
	}, {
		title: F("computer.screen.limitsTitle"),
		rows: [{
			label: F(`computer.screen.limits.${t.os}`),
			control: ""
		}]
	}];
}
async function Rt(e) {
	(await g(null, {
		icon: "warning",
		title: F("computer.screen.leaveTitle"),
		text: F("computer.screen.leaveText"),
		fields: [{
			name: "username",
			label: F("computer.screen.adminName"),
			required: !0
		}, {
			name: "password",
			type: "password",
			label: F("computer.screen.adminPassword"),
			required: !0
		}],
		buttons: ["cancel", {
			value: "ok",
			label: F("computer.screen.leaveButton"),
			primary: !0
		}],
		validate: async (e) => {
			let t = await p.request("POST", "/session/verify", {
				username: e.username,
				password: e.password
			}).catch((e) => ({ error: e.message }));
			return t?.error ? t.error : t?.role === "admin" || F("computer.screen.notAdmin");
		}
	}))?.button === "ok" && G("display", "window", e);
}
var zt = [
	"ask",
	"declared",
	"all"
];
function Bt(e) {
	let { settings: t, devices: n } = H;
	if (!t) return W();
	!n && !H.devicesLoading && (H.devicesLoading = !0, U(e, ["devices"]).finally(() => {
		H.devicesLoading = !1;
	}));
	let r = [{
		title: F("computer.hardware.title"),
		rows: [{
			label: F("computer.hardware.rule"),
			description: `${F(`computer.hardware.${t.hardware}Hint`)}${jt() ? "" : ` ${F("computer.hardware.adminOnly")}`}`,
			control: b({
				value: t.hardware,
				label: F("computer.hardware.rule"),
				disabled: !jt(),
				options: zt.map((e) => ({
					value: e,
					label: F(`computer.hardware.${e}`)
				})),
				onChange: (t) => G("hardware", t, e)
			})
		}]
	}];
	if (!n) return [...r, ...W()];
	let i = (e, t) => e.map((e) => e.name || e.displayName || t), o = (e) => e.vendorId != null && e.productId != null ? ` · ${e.vendorId.toString(16).padStart(4, "0")}:${e.productId.toString(16).padStart(4, "0")}` : "", s = (e, t) => ({
		label: e,
		description: t.length ? t.join(" · ") : F("computer.hardware.none"),
		control: String(t.length)
	});
	return r.push({
		title: F("computer.hardware.devices"),
		rows: [
			s(F("computer.hardware.cameras"), i(n.cameras, F("computer.hardware.unnamed"))),
			s(F("computer.hardware.microphones"), i(n.microphones, F("computer.hardware.unnamed"))),
			s(F("computer.hardware.serial"), n.serial.map((e, t) => e.vendorId == null ? F("computer.hardware.portNumber", { n: t + 1 }) : `USB${o(e)}`)),
			s(F("computer.hardware.usb"), n.usb.map((e) => `${e.name ?? F("computer.hardware.unnamed")}${o(e)}`)),
			s(F("computer.hardware.hid"), n.hid.map((e) => `${e.name ?? F("computer.hardware.unnamed")}${o(e)}`)),
			s(F("computer.hardware.gpu"), n.gpu.map((e) => `${e.name ?? `${e.vendorId}:${e.deviceId}`}${e.active ? ` (${F("computer.hardware.active")})` : ""}`)),
			{
				label: F("computer.hardware.webgpu"),
				control: n.gpuFeatures?.webgpu ?? "—"
			},
			s(F("computer.hardware.printers"), n.printers.map((e) => `${e.displayName}${e.default ? ` (${F("computer.hardware.default")})` : ""}`)),
			s(F("computer.hardware.displays"), n.displays.map((e) => `${e.label} ${e.width}×${e.height}`))
		]
	}), r.push({
		title: F("computer.hardware.drives"),
		rows: n.drives.length ? n.drives.map((e) => ({
			label: e.name,
			description: F("computer.hardware.driveSpace", {
				free: l(e.free),
				size: l(e.size)
			}),
			control: a({
				label: F("computer.hardware.eject"),
				spinner: !0,
				onClick: () => V().devices.eject(e.id).catch((e) => O(e.message, { level: "error" }))
			})
		})) : [{
			label: F("computer.hardware.noDrives"),
			control: ""
		}]
	}), r.push({
		title: "",
		rows: [{
			label: "",
			control: a({
				label: F("computer.hardware.refresh"),
				spinner: !0,
				onClick: () => U(e, ["devices"])
			})
		}]
	}), r;
}
function Vt(t) {
	let { servers: n, local: r } = H;
	if (!n) return W();
	let i = V().trusted, o = n.map((e) => {
		let n = e.kind === "local" ? F(`computer.servers.status.${e.status ?? "stopped"}`) : e.trusted ? F("computer.servers.trusted") : F("computer.servers.untrusted");
		return {
			label: `${e.name}${e.current ? ` · ${F("computer.servers.current")}` : ""}`,
			description: `${e.url ?? ""} · ${n}${e.version ? ` · lilOS ${e.version}` : ""}`,
			control: d("span", { class: "cp-actions" }, !e.current && i ? a({
				label: F("computer.servers.open"),
				onClick: () => V().servers.open(e.id)
			}) : null, e.kind === "local" && i ? a({
				label: F("computer.servers.browser"),
				onClick: () => V().local.openInBrowser()
			}) : null, e.kind === "local" && i && r?.status === "running" && !e.current ? a({
				label: F("computer.servers.restart"),
				spinner: !0,
				onClick: () => V().local.restart()
			}) : null, e.kind === "remote" && !e.current && i ? a({
				label: F("computer.servers.remove"),
				confirm: F("computer.servers.removeConfirm"),
				danger: !0,
				onClick: () => V().servers.remove(e.id).then(() => U(t, ["servers"]))
			}) : null)
		};
	}), s = [{
		title: F("computer.servers.title"),
		rows: o
	}];
	if (i) {
		let e = {
			url: "",
			trusted: !1
		};
		s.push({
			title: F("computer.servers.addTitle"),
			rows: [
				{
					label: F("computer.servers.address"),
					description: F("computer.servers.addressHint"),
					control: D({
						value: "",
						placeholder: "https://lilos.azienda.it",
						type: "url",
						mono: !0,
						label: F("computer.servers.address"),
						onInput: (t) => {
							e.url = t;
						},
						onChange: (t) => {
							e.url = t;
						}
					})
				},
				{
					label: F("computer.servers.trust"),
					description: F("computer.servers.trustHint"),
					control: k({
						value: !1,
						label: F("computer.servers.trust"),
						onChange: (t) => {
							e.trusted = t;
						}
					})
				},
				{
					label: "",
					control: a({
						label: F("computer.servers.add"),
						primary: !0,
						spinner: !0,
						onClick: () => V().servers.add({
							url: e.url,
							trusted: e.trusted
						}).then(() => U(t, ["servers"])).catch((e) => O(e.message, { level: "error" }))
					})
				}
			]
		});
	}
	return H.info?.profile?.thisComputer && e.net?.protocols?.some((e) => e.id === "local") && s.push(Ht(t)), s;
}
function Ht(t) {
	let n = new Set(Object.values(w.get("desktop-drives", {}) ?? {})), r = e.net.mounts().filter((e) => e.protocol === "local" && !n.has(e.id)), i = async () => {
		let n = await V().pickFolder();
		if (n) {
			try {
				let t = n.split(/[\\/]/).filter(Boolean).pop() || n, r = await e.net.create({
					name: t,
					protocol: "local",
					values: {
						folder: n,
						readOnly: !1
					},
					auto: !0,
					remember: !0
				});
				await e.net.connect(r.id).catch(() => {}), O(F("computer.folders.added", { name: t }), { level: "success" });
			} catch (e) {
				O(F("computer.error", { error: e.message }), { level: "error" });
			}
			t();
		}
	};
	return {
		title: F("computer.folders.title"),
		rows: [...r.length ? r.map((n) => ({
			label: n.name,
			description: `${n.values?.folder ?? ""}${n.values?.readOnly ? ` · ${F("computer.folders.readOnly")}` : ""}`,
			control: a({
				label: F("computer.servers.remove"),
				confirm: F("computer.servers.removeConfirm"),
				danger: !0,
				onClick: () => e.net.remove(n.id).then(t, (e) => O(e.message, { level: "error" }))
			})
		})) : [{
			label: F("computer.folders.none"),
			control: ""
		}], {
			label: F("computer.folders.add"),
			description: F("computer.folders.addHint"),
			control: a({
				label: F("computer.folders.addButton"),
				spinner: !0,
				onClick: i
			})
		}]
	};
}
// src/settings/network.js
var K = {
	rules: null,
	error: "",
	loading: !1
}, Ut = () => p.user?.role === "admin";
function Wt(t) {
	K.loading || (K.loading = !0, e.net.rules().then((e) => {
		K.rules = e, K.error = "";
	}, (e) => {
		K.error = e.message;
	}).finally(() => {
		K.loading = !1, t();
	}));
}
async function Gt(t, n) {
	try {
		K.rules = await e.net.setRules(t), O(F("network.saved"));
	} catch (e) {
		O(e.message, { level: "error" });
	}
	n();
}
function Kt({ rerender: t }) {
	return !p.connected || typeof e.net?.rules != "function" || !Ut() ? null : {
		id: "network",
		icon: "globe",
		get label() {
			return F("network.label");
		},
		get description() {
			return F("network.description");
		},
		sections: () => qt(t)
	};
}
function qt(e) {
	if (!K.rules && !K.error && Wt(e), K.error) return [{
		title: "",
		rows: [{
			label: F("network.error"),
			description: K.error,
			control: ""
		}]
	}];
	let t = K.rules;
	if (!t) return [{
		title: "",
		rows: [{
			label: F("network.loading"),
			control: ""
		}]
	}];
	let n = D({
		value: t.allow.join(", "),
		placeholder: "192.168.1.50/32, 10.0.5.0/24",
		mono: !0,
		className: "set-wide",
		onChange: (t) => Gt({ allow: String(t).split(/[\s,;]+/).filter(Boolean) }, e)
	});
	return [
		...t.multiUser ? [] : [{
			title: "",
			rows: [{
				label: F("network.single"),
				description: F("network.singleText"),
				control: ""
			}]
		}],
		{
			title: F("network.exception"),
			rows: [
				{
					label: F("network.local.label"),
					description: F("network.local.description"),
					control: k({
						value: t.allowLocal,
						onChange: (t) => Gt({ allowLocal: t }, e)
					})
				},
				{
					label: F("network.private.label"),
					description: F("network.private.description"),
					control: k({
						value: t.allowPrivate,
						onChange: (t) => Gt({ allowPrivate: t }, e)
					})
				},
				{
					label: F("network.ranges.label"),
					description: F("network.ranges.description"),
					control: n
				}
			]
		},
		{
			title: "",
			rows: [{
				label: "",
				description: F("network.always"),
				control: d("span")
			}]
		}
	];
}
// src/settings/storage.js
var Jt = 1024, q = Jt * 1024, Yt = q * 1024, Xt = [
	["KB", Jt],
	["MB", q],
	["GB", Yt],
	["TB", Yt * 1024]
], Zt = [
	"files.maxFileSize",
	"files.maxReadWhole",
	"files.maxText"
], Qt = [
	"files.uploadPiece",
	"files.inlineMax",
	"files.dbChunk",
	"files.cacheMax"
], J = {
	items: null,
	quotas: !0,
	users: null,
	limits: null,
	error: "",
	loading: !1
}, $t = () => p.user?.role === "admin", en = () => p.connected && typeof e.kernelSettings?.list == "function", tn = (e) => e.slice(e.indexOf(".") + 1);
function nn() {
	J.items = J.users = J.limits = null, J.error = "";
}
function rn(t) {
	if (J.loading) return;
	J.loading = !0;
	let n = e.kernelSettings, r = $t();
	Promise.all([
		n.limits({ fresh: !0 }),
		r ? n.list() : null,
		r ? n.users() : null
	]).then(([e, t, n]) => {
		J.limits = e, t && (J.items = t.items, J.quotas = t.quotas !== !1), J.users = n, J.error = "";
	}, (e) => {
		J.error = e.message;
	}).finally(() => {
		J.loading = !1, t();
	});
}
var an = (e) => (!J.limits && !J.error && rn(e), !!J.limits);
async function on(t, n) {
	try {
		let n = await e.kernelSettings.update(t);
		t.user || (J.items = n.items), J.users = null, J.limits = null;
	} catch (e) {
		O(e.message, { level: "error" });
	}
	rn(n);
}
function sn(e, t = q) {
	return e ? [...Xt].reverse().find(([, t]) => e >= t && e % t === 0)?.[1] ?? [...Xt].reverse().find(([, t]) => e >= t)?.[1] ?? Jt : t;
}
var cn = (t) => new Intl.NumberFormat(e.locale?.code || void 0, {
	maximumFractionDigits: 2,
	useGrouping: !1
}).format(t);
function ln({ value: e, onChange: t, label: n, disabled: r = !1, fallbackUnit: i = q, item: a = null }) {
	let o = sn(e, i), s = d("input", {
		class: "ctl-text set-size-n",
		type: "text",
		inputmode: "decimal",
		"aria-label": n,
		disabled: r
	});
	s.value = cn(e / o);
	let c = d("select", {
		class: "ctl-select set-size-u",
		"aria-label": F("storage.size.unit", { name: n }),
		disabled: r
	}, Xt.map(([e, t]) => d("option", {
		value: String(t),
		selected: t === o
	}, e))), u = (t) => {
		O(t, { level: "error" }), o = sn(e, i), c.value = String(o), s.value = cn(e / o);
	}, f = () => {
		let r = String(s.value).trim().replace(/\s/g, "").replace(",", "."), i = Number(r);
		if (!r || !Number.isFinite(i) || i < 0) return u(F("storage.size.invalid"));
		let c = Math.round(i * o);
		if (a) {
			if (c === 0 && !a.zero) return u(F("storage.size.noZero", { name: n }));
			if (c > 0 && a.min != null && c < a.min) return u(F("storage.size.min", {
				name: n,
				min: l(a.min)
			}));
			if (c > 0 && a.max != null && c > a.max) return u(F("storage.size.max", {
				name: n,
				max: l(a.max)
			}));
		}
		c !== e && t(c);
	};
	return s.addEventListener("change", f), s.addEventListener("keydown", (e) => {
		e.key === "Enter" && s.blur();
	}), c.addEventListener("change", () => {
		o = Number(c.value), f();
	}), d("span", { class: "set-size" }, [s, c]);
}
var un = (e) => d("span", { class: `set-badge set-badge-${e}` }, F(`storage.source.${e}`));
function dn(e, t, { user: n = null, label: r, description: i } = {}) {
	let o = tn(e.key);
	return r ??= F(`storage.setting.${o}.label`), {
		label: r,
		description: i ?? F(`storage.setting.${o}.description`),
		keywords: F("storage.limits.keywords"),
		control: () => d("span", { class: "set-size-row" }, [
			e.source !== "default" && !e.locked ? a({
				label: F("storage.reset"),
				onClick: () => on({
					reset: [e.key],
					...n && { user: n }
				}, t)
			}) : null,
			e.value === 0 && e.zero === "unlimited" ? d("span", { class: "set-size-hint" }, F("storage.unlimited")) : null,
			un(e.locked ? "locked" : e.source),
			ln({
				value: e.value,
				label: r,
				item: e,
				disabled: e.locked,
				fallbackUnit: o === "quota" ? Yt : q,
				onChange: (r) => on({
					set: { [e.key]: r },
					...n && { user: n }
				}, t)
			})
		])
	};
}
function fn(e, t) {
	if (e == null) return F("common.unavailable");
	if (!t) return d("span", { class: "set-quota" }, [d("span", {}, F("storage.quota.noLimit", { used: l(e) }))]);
	let n = Math.min(1, e / t), r = n >= 1 ? "full" : n >= .9 ? "warn" : "";
	return d("span", { class: "set-quota" }, [d("span", {}, F("storage.quota.of", {
		used: l(e),
		quota: l(t)
	})), d("span", {
		class: `set-bar ${r}`,
		role: "meter",
		"aria-valuemin": "0",
		"aria-valuemax": "100",
		"aria-valuenow": String(Math.round(n * 100)),
		"aria-label": F("storage.quota.label")
	}, d("i", { style: `width:${Math.round(n * 100)}%` }))]);
}
var pn = (e) => J.error ? [{
	title: "",
	rows: [{
		label: F("storage.error"),
		description: J.error,
		control: a({
			label: F("storage.retry"),
			onClick: () => {
				nn(), rn(e);
			}
		})
	}]
}] : [{
	title: "",
	rows: [{
		label: F("storage.loading"),
		control: ""
	}]
}];
function mn(e, t) {
	if (!en()) return e();
	if (!an(t)) return [...J.error ? pn(t) : [], ...e()];
	let n = J.limits;
	return [{
		title: F("storage.mine.title"),
		rows: [{
			label: F("storage.mine.files"),
			description: n.quota ? F("storage.quota.description") : F("storage.quota.none"),
			keywords: F("storage.limits.keywords"),
			control: fn(n.used, n.quota)
		}, {
			label: F("storage.maxFile.label"),
			description: F("storage.maxFile.description"),
			control: n.maxFileSize ? l(n.maxFileSize) : F("storage.unlimited")
		}]
	}, ...e()];
}
function hn(e) {
	if (!an(e) || !J.items) return pn(e);
	let t = new Map(J.items.map((e) => [e.key, e])), n = (n) => n.filter((e) => t.has(e)).map((n) => dn(t.get(n), e));
	return [
		{
			title: F("storage.limits.title"),
			rows: n(Zt)
		},
		{
			title: F("storage.pieces.title"),
			rows: n(Qt)
		},
		{
			title: "",
			rows: [{
				label: "",
				description: F("storage.limits.saved"),
				control: d("span")
			}]
		}
	];
}
function gn(e) {
	if (!an(e) || !J.items) return pn(e);
	let t = J.items.find((e) => e.key === "files.quota");
	if (!J.quotas || !t) return [{
		title: "",
		rows: [{
			label: F("storage.users.unavailable"),
			description: F("storage.users.unavailableText"),
			control: ""
		}]
	}];
	let n = J.users ?? [];
	return [{
		title: F("storage.users.default.title"),
		rows: [dn(t, e, {
			label: F("storage.setting.quota.label"),
			description: F("storage.setting.quota.description")
		})]
	}, {
		title: F("storage.users.title"),
		rows: n.map((n) => ({
			label: n.name || n.username,
			description: [n.username, n.role === "admin" ? F("storage.users.admin") : null].filter(Boolean).join(" · "),
			keywords: `${n.username} ${n.name ?? ""}`,
			control: () => d("span", { class: "set-user-quota" }, [fn(n.used, n.quota), n.own ? d("span", { class: "set-size-row" }, [
				a({
					label: F("storage.users.useDefault"),
					onClick: () => on({
						reset: ["files.quota"],
						user: n.id
					}, e)
				}),
				n.quota === 0 ? d("span", { class: "set-size-hint" }, F("storage.unlimited")) : null,
				un("user"),
				ln({
					value: n.quota,
					label: F("storage.users.quotaOf", { name: n.name || n.username }),
					item: t,
					fallbackUnit: Yt,
					onChange: (t) => on({
						set: { "files.quota": t },
						user: n.id
					}, e)
				})
			]) : a({
				label: F("storage.users.custom"),
				onClick: () => on({
					set: { "files.quota": t.value },
					user: n.id
				}, e)
			})])
		}))
	}];
}
function _n({ own: e, rerender: t }) {
	let n = en() ? [{
		id: "mine",
		get label() {
			return F("storage.mine.label");
		},
		sections: () => mn(e, t)
	}, ...$t() ? [{
		id: "limits",
		get label() {
			return F("storage.limits.label");
		},
		sections: () => hn(t)
	}, {
		id: "users",
		get label() {
			return F("storage.users.label");
		},
		sections: () => gn(t)
	}] : []] : null;
	return {
		id: "storage",
		icon: "disk",
		get label() {
			return F("storage.label");
		},
		get description() {
			return p.connected ? F("storage.description.kernel") : F("storage.description.browser");
		},
		...n ? { subtabs: n } : { sections: e }
	};
}
function vn(t) {
	return !en() || typeof e.kernelSettings.on != "function" ? () => {} : e.kernelSettings.on("change", () => {
		nn(), t();
	});
}
// src/settings/logicstudio.js
var yn = "logicstudio-engine", bn = [
	"maxActive",
	"maxTests",
	"cpuPercent",
	"memoryMb",
	"netPerMinute",
	"logMb"
], Y = {
	status: null,
	programs: null,
	all: null,
	users: null,
	overrides: null,
	settings: null,
	catalog: null,
	error: "",
	loading: !1
}, xn = () => p.user?.role === "admin", X = () => e.logic;
function Sn() {
	Object.assign(Y, {
		status: null,
		programs: null,
		all: null,
		users: null,
		overrides: null,
		settings: null,
		catalog: null,
		error: ""
	});
}
function Cn(t) {
	if (Y.loading) return;
	Y.loading = !0;
	let n = xn();
	Promise.all([
		X().status(),
		X().programs(),
		X().catalog({ fresh: !0 }),
		n ? X().programs({ all: !0 }) : null,
		n ? X().admin.users() : null,
		n ? m.settings(yn) : null,
		n && e.kernelSettings?.users ? e.kernelSettings.users().catch(() => null) : null
	]).then(([e, t, n, r, i, a, o]) => {
		Object.assign(Y, {
			status: e,
			programs: t,
			catalog: n,
			all: r,
			overrides: i,
			settings: a,
			users: o,
			error: ""
		});
	}, (e) => {
		Y.error = e.message;
	}).finally(() => {
		Y.loading = !1, t();
	});
}
var wn = (e) => (!Y.status && !Y.error && Cn(e), !!Y.status), Tn = () => [{ rows: [{
	label: Y.error ? F("logic.noEngine") : F("logic.loading"),
	description: Y.error || void 0
}] }];
function En(e, t, n = `${e} / ${t}`) {
	return d("span", { class: "ls-cp-bar" }, d("b", {}, n), d("i", {}, d("i", { style: `width:${t ? Math.min(100, e / t * 100) : 0}%` })));
}
function Dn(e, t, { owner: n = !1 } = {}) {
	return e.length ? d("table", { class: "ls-cp-table" }, d("tr", {}, d("th", {}, F("logic.program")), n ? d("th", {}, F("logic.user")) : null, d("th", {}, F("logic.kind")), d("th", {}, F("logic.state")), d("th", {}, F("logic.since")), d("th", {})), ...e.map((e) => d("tr", {}, d("td", {}, d("b", {}, e.name), e.source?.path ? d("small", {}, e.source.path) : null, e.error ? d("small", { class: "err" }, e.error) : null), n ? d("td", {}, e.user?.name ?? e.owner) : null, d("td", {}, F(`logic.kind.${e.kind}`)), d("td", {}, F(`logic.state.${e.status}`)), d("td", {}, e.started ? P.date(e.started, {
		dateStyle: "short",
		timeStyle: "short"
	}) : "—"), d("td", {}, e.status === "running" || e.status === "starting" ? a({
		label: F("logic.stop"),
		danger: !0,
		confirm: F("logic.stopConfirm"),
		onClick: () => X().stop(e.id).then(() => {
			Sn(), t();
		})
	}) : a({
		label: F("logic.forget"),
		onClick: () => X().forget(e.id).then(() => {
			Sn(), t();
		})
	}))))) : d("p", { class: "ls-cp-empty" }, F("logic.noPrograms"));
}
function On(e) {
	if (!wn(e)) return Tn();
	let t = Y.status, n = t.quota;
	return [{
		title: F("logic.mine.usage"),
		rows: [
			{
				label: F("logic.active"),
				description: F("logic.activeHint"),
				control: En(t.active, n.maxActive)
			},
			{
				label: F("logic.tests"),
				description: F("logic.testsHint", { min: t.limits.testMinutes }),
				control: En(t.tests, n.maxTests)
			},
			{
				label: F("logic.net"),
				control: En(t.net, n.netPerMinute)
			},
			{
				label: F("logic.log"),
				control: En(t.log, n.logMb * 1024 * 1024, `${Math.round(t.log / 1024)} KB / ${n.logMb} MB`)
			},
			{
				label: F("logic.cpuMem"),
				control: F("logic.cpuMemValue", {
					cpu: n.cpuPercent,
					mem: n.memoryMb
				})
			}
		]
	}, {
		title: F("logic.mine.programs"),
		content: () => Dn(Y.programs ?? [], e)
	}];
}
async function kn(e, t, n) {
	try {
		Y.settings = await m.saveSettings(yn, {
			...Y.settings.values,
			[e.key]: t
		});
	} catch (e) {
		Y.error = e.message;
	}
	Y.status = null, n();
}
function An(e) {
	if (!wn(e)) return Tn();
	if (!Y.settings) return [{ rows: [{ label: F("logic.noSettings") }] }];
	let t = Y.settings.fields.filter((e) => !e.key.startsWith("quota")), n = (e) => t.filter((t) => e.includes(t.key)), r = (t, n) => kn(t, n, e);
	return [
		{
			title: F("logic.limits.all"),
			rows: R(n([
				"totalActive",
				"totalMemoryMb",
				"runsPer10s",
				"blockSeconds",
				"testMinutes",
				"maxThreads"
			]), Y.settings.values, {
				t: F,
				save: r
			})
		},
		{
			title: F("logic.limits.schemas"),
			rows: R(n([
				"maxBlocks",
				"maxLinks",
				"maxAddedPorts"
			]), Y.settings.values, {
				t: F,
				save: r
			})
		},
		{
			title: F("logic.limits.projects"),
			rows: R(n([
				"maxSchemas",
				"maxWindows",
				"maxComponents",
				"maxProjectLinks",
				"maxConsoles",
				"consoleLinesPerSecond",
				"chartPoints",
				"signalSamples"
			]), Y.settings.values, {
				t: F,
				save: r
			})
		},
		{ rows: [{
			label: F("logic.limits.when"),
			description: F("logic.limits.whenHint")
		}] }
	];
}
function jn(e) {
	if (!wn(e)) return Tn();
	if (!Y.settings) return [{ rows: [{ label: F("logic.noSettings") }] }];
	let t = Y.settings.fields.filter((e) => e.key.startsWith("quota")), n = (t, n) => kn(t, n, e), r = new Map((Y.overrides ?? []).map((e) => [e.id, e])), i = (Y.users ?? []).length ? Y.users : (Y.overrides ?? []).map((e) => ({
		id: e.id,
		username: e.id,
		name: e.id
	})), o = () => d("table", { class: "ls-cp-table quotas" }, d("tr", {}, d("th", {}, F("logic.user")), ...bn.map((e) => d("th", {}, F(`logic.quota.${e}`))), d("th", {})), ...i.map((t) => {
		let n = r.get(t.id)?.overrides ?? null, i = { ...r.get(t.id)?.quota ?? {} }, o = bn.map((r) => {
			let a = d("input", {
				class: `ctl-text ls-cp-num${n?.[r] === void 0 ? "" : " own"}`,
				type: "number",
				min: "0",
				value: String(n?.[r] ?? ""),
				placeholder: String(i[r] ?? ""),
				"aria-label": `${t.name} · ${F(`logic.quota.${r}`)}`
			});
			return a.addEventListener("change", async () => {
				let i = { ...n ?? {} };
				a.value === "" ? delete i[r] : i[r] = Number(a.value), await X().admin.setQuota(t.id, Object.keys(i).length ? i : null).catch((e) => {
					Y.error = e.message;
				}), Sn(), e();
			}), d("td", {}, a);
		});
		return d("tr", {}, d("td", {}, d("b", {}, t.name ?? t.username), d("small", {}, t.username)), ...o, d("td", {}, n ? a({
			label: F("logic.reset"),
			onClick: () => X().admin.setQuota(t.id, null).then(() => {
				Sn(), e();
			})
		}) : null));
	}));
	return [{
		title: F("logic.quota.defaults"),
		rows: R(t, Y.settings.values, {
			t: F,
			save: n
		})
	}, {
		title: F("logic.quota.users"),
		content: () => d("div", {}, d("p", { class: "ls-cp-hint" }, F("logic.quota.usersHint")), o())
	}];
}
function Mn(e) {
	return wn(e) ? [{
		title: F("logic.running.title"),
		content: () => Dn(Y.all ?? [], e, { owner: !0 })
	}] : Tn();
}
function Nn(e) {
	if (!wn(e)) return Tn();
	let t = P.lang, n = (e) => e && typeof e == "object" ? e[t] ?? e.en : String(e ?? "");
	return [{
		title: F("logic.packages.title"),
		rows: (Y.catalog?.packages ?? []).map((e) => ({
			label: `${n(e.label)} · ${e.name} ${e.version}`,
			description: F("logic.packages.counts", {
				blocks: e.blocks.length,
				components: e.components.length
			})
		}))
	}, { rows: [{
		label: F("logic.packages.more"),
		description: F("logic.packages.moreHint")
	}] }];
}
function Pn({ rerender: e }) {
	return {
		id: "logicstudio",
		icon: "blocks",
		get label() {
			return F("logic.label");
		},
		get description() {
			return F("logic.description");
		},
		subtabs: [
			{
				id: "mine",
				get label() {
					return F("logic.mine.label");
				},
				sections: () => On(e)
			},
			...xn() ? [
				{
					id: "limits",
					get label() {
						return F("logic.limits.label");
					},
					sections: () => An(e)
				},
				{
					id: "quotas",
					get label() {
						return F("logic.quota.label");
					},
					sections: () => jn(e)
				},
				{
					id: "running",
					get label() {
						return F("logic.running.label");
					},
					sections: () => Mn(e)
				}
			] : [],
			{
				id: "packages",
				get label() {
					return F("logic.packages.label");
				},
				sections: () => Nn(e)
			}
		]
	};
}
// src/settings/SettingsApp.js
var Z = null;
function Fn(e) {
	let t = N(), n = t?.list().find((t) => t.id === e);
	return n ? [
		{
			title: F("workspaces.current.title"),
			rows: [
				{
					label: F("common.name"),
					keywords: F("workspaces.name.keywords"),
					control: () => {
						let e = D({
							value: n.name,
							label: F("workspaces.name.field"),
							onChange: (e) => t.rename(n.id, e)
						});
						return e.maxLength = ie.MAX_NAME, e;
					}
				},
				t.setDescription && {
					label: F("workspaces.description.label"),
					description: F("workspaces.description.description"),
					keywords: F("workspaces.description.keywords"),
					control: () => {
						let e = D({
							value: n.description ?? "",
							placeholder: F("workspaces.description.placeholder"),
							label: F("workspaces.description.field"),
							onChange: (e) => t.setDescription(n.id, e)
						});
						return e.maxLength = ie.MAX_DESCRIPTION ?? 200, e;
					}
				},
				{
					label: F("common.color"),
					description: F("workspaces.color.description"),
					keywords: F("workspaces.color.keywords"),
					control: () => T({
						value: n.color,
						colors: te,
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
				control: r.system ? F("workspaces.apps.alwaysVisible") : () => k({
					value: t.isInstalled(r.id, e),
					label: e === t.currentId ? F("workspaces.apps.toggle", { name: r.name }) : F("workspaces.apps.toggleIn", {
						name: r.name,
						workspace: n.name
					}),
					onChange: (n) => t.setInstalled(r.id, n, e)
				})
			}))
		},
		...Jn(e)
	] : [];
}
var In = {
	id: "current",
	get label() {
		return F("workspaces.current.label");
	},
	sections: () => Fn(N()?.currentId)
}, Ln = {
	id: "all",
	get label() {
		return F("workspaces.all.label");
	},
	sections: Vn
}, Rn = /* @__PURE__ */ new Map();
function zn() {
	let e = N();
	return [
		In,
		...(e?.list() ?? []).filter((t) => t.id !== e.currentId).map((e) => (Rn.has(e.id) || Rn.set(e.id, {
			id: `ws-${e.id}`,
			get label() {
				return N()?.describe(e.id)?.name ?? "";
			},
			sections: () => Fn(e.id)
		}), Rn.get(e.id))),
		Ln
	];
}
function Bn(e) {
	try {
		return S.get(e), !0;
	} catch {
		return !1;
	}
}
function Vn() {
	let e = N();
	if (!e) return [];
	let t = e.list();
	return [
		Bn("taskbarWorkspaces") && {
			title: F("workspaces.taskbar.title"),
			rows: [{
				label: F("workspaces.taskbar.label"),
				description: F("workspaces.taskbar.description"),
				keywords: F("workspaces.taskbar.keywords"),
				control: y({
					value: S.get("taskbarWorkspaces") === "all" ? "all" : "current",
					label: F("workspaces.taskbar.label"),
					options: [{
						value: "current",
						label: F("workspaces.taskbar.current")
					}, {
						value: "all",
						label: F("workspaces.taskbar.all")
					}],
					onChange: (e) => S.set("taskbarWorkspaces", e)
				})
			}]
		},
		{
			title: F("workspaces.label"),
			rows: [...t.map((n) => {
				let r = n.id === e.currentId, i = j.filter((t) => e.isInstalled(t.id, n.id)).length;
				return {
					label: r ? F("workspaces.list.current", { name: n.name }) : n.name,
					description: `${F("workspaces.list.owned", { n: e.ownedCount(n.id) })} · ${F("workspaces.list.apps", { n: i })}`,
					keywords: F("workspaces.list.keywords"),
					control: () => d("div", { class: "ws-settings-actions" }, r ? null : a({
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
		...Yn(),
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
	].filter(Boolean);
}
var Hn = [];
function Un() {
	let e = (e) => {
		try {
			let t = E.create({ name: e.value });
			Hn.length && he(Hn, t.id, !0), Hn = [];
		} catch (t) {
			O(t.message), e.focus();
		}
	}, t = Hn.filter((e) => u.exists(e)).length;
	return [{
		title: F("tags.new.title"),
		rows: [{
			label: F("common.name"),
			description: t ? F("tags.new.pending", { n: t }) : F("tags.new.description"),
			keywords: F("tags.new.keywords"),
			control: () => {
				let t = D({
					placeholder: F("tags.new.placeholder"),
					label: F("tags.new.field")
				});
				return t.maxLength = 30, t.classList.add("tag-new-name"), t.addEventListener("keydown", (n) => {
					n.key === "Enter" && (n.preventDefault(), e(t));
				}), d("div", { class: "tag-settings-actions" }, t, a({
					label: F("common.create"),
					primary: !0,
					onClick: () => e(t)
				}));
			}
		}]
	}, ...E.list().map((e) => ({
		title: e.name,
		rows: [
			{
				label: F("common.name"),
				keywords: F("tags.name.keywords"),
				control: () => {
					let t = D({
						value: e.name,
						label: F("tags.name.field", { name: e.name }),
						onChange: (n) => {
							try {
								E.rename(e.id, n);
							} catch (n) {
								O(n.message), t.value = E.get(e.id)?.name ?? "";
							}
						}
					});
					return t.maxLength = 30, t;
				}
			},
			{
				label: F("common.color"),
				keywords: F("tags.color.keywords"),
				control: () => T({
					value: e.color,
					colors: r,
					onChange: (t) => E.setColor(e.id, t)
				})
			},
			{
				label: F("tags.visible.label"),
				description: e.visible ? F("tags.visible.on") : F("tags.visible.off"),
				keywords: F("tags.visible.keywords"),
				control: () => k({
					value: e.visible,
					label: F("tags.visible.toggle", { name: e.name }),
					onChange: (t) => E.setVisible(e.id, t)
				})
			},
			{
				label: F("common.items"),
				description: F("tags.items.description", { n: u.tagged(e.id).length }),
				control: () => d("div", { class: "tag-settings-actions" }, a({
					label: F("tags.items.show"),
					onClick: () => de("files", { tag: e.id })
				}), $(F("common.delete"), F("tags.items.delete"), () => E.remove(e.id)))
			}
		]
	}))];
}
var Wn = [
	"home",
	"documents",
	"images",
	"files",
	"downloads",
	"trash"
];
function Gn(e) {
	return Wn.includes(e.key) ? {
		...e,
		name: F(`desk.fixed.item.${e.key}.name`),
		description: F(`desk.fixed.item.${e.key}.description`)
	} : e;
}
function Kn(e, t) {
	let n = (A.DESK_FIXED_ITEMS ?? []).map(Gn);
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
var qn = () => typeof A.setFixedShownEverywhere == "function";
function Jn(e) {
	if (!qn()) return [];
	let t = N(), n = (n) => e === t?.currentId ? F("desk.fixed.toggle", { name: n }) : F("desk.fixed.toggleIn", {
		name: n,
		workspace: t?.describe(e)?.name ?? ""
	});
	return Kn(F("desk.fixed.descriptionWorkspace"), (t) => ({ control: () => k({
		value: A.isFixedShown(t.key, e),
		label: n(t.name),
		onChange: (n) => A.setFixedShown(t.key, n, e)
	}) }));
}
function Yn() {
	let e = N();
	if (qn() && e) {
		let t = e.list();
		return Kn(F("desk.fixed.descriptionAll"), (e) => {
			let n = t.filter((t) => A.isFixedShown(e.key, t.id)).length;
			return {
				description: n && n < t.length ? F("desk.fixed.some", {
					on: n,
					n: t.length
				}) : e.description,
				control: () => k({
					value: n === t.length,
					label: F("desk.fixed.toggleAll", { name: e.name }),
					onChange: (t) => A.setFixedShownEverywhere(e.key, t)
				})
			};
		});
	}
	let t = typeof A.setFixedShown == "function";
	return Kn(F(t ? "desk.fixed.descriptionSwitchable" : "desk.fixed.description"), (e) => ({ control: t ? () => k({
		value: A.isFixedShown(e.key),
		label: F("desk.fixed.toggle", { name: e.name }),
		onChange: (t) => A.setFixedShown(e.key, t)
	}) : F("desk.fixed.always") }));
}
function Xn() {
	return (A.DESK_FIXED_ITEMS ?? []).length ? [{
		title: F("desk.fixed.title"),
		rows: [{
			label: F("desk.fixed.moved.label"),
			description: F("desk.fixed.moved.description"),
			keywords: F("desk.fixed.moved.keywords"),
			control: () => a({
				label: F("desk.fixed.moved.open"),
				onClick: () => Z?.select("workspaces", "current")
			})
		}]
	}] : [];
}
function Zn(e, t) {
	let n = d("input", {
		class: "desk-color-field",
		type: "color",
		"aria-label": F("desk.background.custom.label")
	});
	return n.value = /^#[0-9a-f]{6}$/i.test(e) ? e : "#1f2227", n.addEventListener("change", () => t(n.value)), n;
}
function Qn(e) {
	let t = S.get("deskColor"), n = A.wallpaperInfo(), r = async () => {
		let t = await A.pickFile(e, {
			title: F("desk.background.image.pick"),
			exts: A.WALLPAPER_EXTS
		});
		t && await A.setWallpaper(t.id);
	};
	return [{
		title: F("desk.background.color.title"),
		rows: [
			{
				label: F("common.color"),
				description: F("desk.background.color.description"),
				keywords: F("desk.background.color.keywords"),
				control: () => {
					let e = T({
						value: t,
						colors: A.DESK_COLORS,
						onChange: (e) => S.set("deskColor", e)
					});
					return e.classList.add("desk-color-swatches"), e;
				}
			},
			{
				label: F("desk.background.custom.label"),
				description: F("desk.background.custom.description"),
				keywords: F("desk.background.color.keywords"),
				control: () => Zn(t, (e) => S.set("deskColor", e))
			},
			t && {
				label: F("desk.background.theme.label"),
				description: F("desk.background.theme.description"),
				control: () => a({
					label: F("desk.background.theme.button"),
					onClick: () => S.set("deskColor", "")
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
				onClick: () => A.clearWallpaper()
			})
		}].filter(Boolean)
	}];
}
var Q = (e) => () => k({
	value: S.get(e),
	onChange: (t) => S.set(e, t)
}), $n = {
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
function er() {
	let e = A.USER_PAGE_ITEMS ?? [], t = (e) => $n.groups.includes(e.key) ? F(`userPage.group.${e.key}`) : e.name, n = (e) => $n.items.includes(e.key) ? {
		name: F(`userPage.item.${e.key}.name`),
		description: F(`userPage.item.${e.key}.description`)
	} : e;
	return [{
		title: F("userPage.title"),
		rows: [{
			label: F("userPage.open.label"),
			description: F("userPage.open.description")
		}]
	}, ...(A.USER_PAGE_GROUPS ?? []).map((r) => ({
		title: t(r),
		rows: e.filter((e) => e.group === r.key).map((e) => {
			let { name: t, description: r } = n(e);
			return {
				label: t,
				description: r,
				keywords: F("userPage.keywords", { name: t }),
				control: () => k({
					value: A.isUserPageShown(e.key),
					label: F("userPage.toggle", { name: t }),
					onChange: (t) => A.setUserPageShown(e.key, t)
				})
			};
		})
	})).filter((e) => e.rows.length)];
}
var tr = [
	"system",
	"desk",
	"items",
	"windows"
];
function nr() {
	let e = new Set(ue()), t = /* @__PURE__ */ new Set(), n = (e) => {
		t.add(e);
		let n = se(e);
		return {
			label: e ? `.${e}` : F("fileTypes.noExtension"),
			description: n ? F("fileTypes.default", { app: n.name }) : F("fileTypes.noDefault"),
			keywords: F("fileTypes.keywords", { ext: e }),
			control: () => b({
				value: ae(e)?.id ?? "ask",
				label: e ? F("fileTypes.field", { ext: e }) : F("fileTypes.fieldNoExtension"),
				options: [{
					value: "ask",
					label: F("fileTypes.ask")
				}, ...le().map((e) => ({
					value: e.id,
					label: e.name
				}))],
				onChange: (t) => me(e, t)
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
					pe(), Z?.render();
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
function rr() {
	let e = u.trashed(), t = e.reduce((e, t) => e + t.bytes, 0);
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
					let e = S.get("trashRetention"), t = re.some((t) => t.value === e) ? re : [...re, {
						value: e,
						label: e > 0 ? F("trash.retention.days", { n: e }) : F("trash.retention.forever")
					}];
					return b({
						value: e,
						label: F("trash.retention.field"),
						options: t,
						onChange: (e) => S.set("trashRetention", Number(e))
					});
				}
			},
			{
				label: F("trash.contents.label"),
				description: e.length ? F("trash.contents.description", {
					n: e.length,
					size: cr(t)
				}) : F("trash.contents.empty"),
				keywords: F("trash.contents.keywords"),
				control: a({
					label: F("trash.contents.open"),
					onClick: () => de("files", { trash: !0 })
				})
			},
			{
				label: F("trash.empty.label"),
				description: F("trash.empty.description"),
				keywords: F("trash.empty.keywords"),
				control: e.length ? $(F("trash.empty.button"), F("trash.empty.confirm"), () => u.purgeTrash()) : F("trash.empty.none")
			}
		]
	}];
}
function ir() {
	let e = /* @__PURE__ */ new Map();
	for (let t of C.list()) e.has(t.group) || e.set(t.group, []), e.get(t.group).push(t);
	let t = (e) => {
		let t = tr.indexOf(String(e[0]?.id ?? "").split(".")[0]);
		return t < 0 ? tr.length : t;
	};
	return [
		{
			title: F("shortcuts.title"),
			rows: [{
				label: F("shortcuts.all.label"),
				description: F("shortcuts.all.description"),
				control: $(F("shortcuts.all.reset"), F("common.confirm"), () => C.resetAll())
			}]
		},
		...[...e].sort(([, e], [, n]) => t(e) - t(n)).map(([e, t]) => ({
			title: e,
			rows: t.map((e) => ({
				label: e.label,
				keywords: F("shortcuts.keywords", { keys: e.keys.map((e) => C.format(e)).join(" ") }),
				control: ee(e.id)
			}))
		})),
		{
			title: F("shortcuts.mouse.title"),
			rows: [
				{
					label: F("shortcuts.lasso.label"),
					description: F("shortcuts.lasso.description"),
					keywords: F("shortcuts.lasso.keywords"),
					control: () => b({
						value: S.get("lasso"),
						options: ne,
						onChange: (e) => S.set("lasso", e)
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
var ar = () => ({
	isolated: F("apps.mode.isolated"),
	open: F("apps.mode.open"),
	system: F("apps.mode.system"),
	remote: F("apps.mode.remote")
});
function or() {
	let e = oe(), { isolated: t } = s.security(), n = j.filter((e) => e.package && !e.package.system);
	return [{
		title: F("apps.execution.title"),
		rows: [{
			label: F("apps.isolated.label"),
			description: F(e ? "apps.isolated.description" : "apps.isolated.adminOnly"),
			keywords: F("apps.isolated.keywords"),
			control: e ? k({
				value: t,
				label: F("apps.isolated.label"),
				onChange: async (e) => {
					try {
						await s.setSecurity({ isolated: e });
					} catch (e) {
						O(F("apps.isolated.failed", { error: e.message }));
					}
					Z?.render();
				}
			}) : F(t ? "common.yes" : "common.no")
		}, {
			label: F("apps.system.label"),
			description: F("apps.system.description")
		}]
	}, {
		title: F("apps.installed.title"),
		rows: n.length ? n.map((e) => {
			let t = ce(e.package), n = t.fixed ? t.reason : t.own === null ? F("apps.installed.shared") : F("apps.installed.own");
			return {
				label: e.name,
				description: `${ar()[t.mode]} · ${n}`,
				keywords: F("apps.installed.keywords"),
				control: a({
					label: F("apps.installed.properties"),
					onClick: () => ge(e.id)
				})
			};
		}) : [{ label: F("apps.installed.none") }]
	}];
}
function $(e, t, n) {
	return a({
		label: e,
		confirm: t,
		onClick: () => {
			let e = n();
			return typeof e?.then == "function" ? e.catch((e) => O(e.message, { timeout: 7e3 })) : e;
		}
	});
}
function sr() {
	return w.bytes();
}
var cr = (e) => e == null ? F("common.unavailable") : l(e), lr = [
	[/Edg\/(\d+)/, "Edge"],
	[/Firefox\/(\d+)/, "Firefox"],
	[/Chrome\/(\d+)/, "Chrome"],
	[/Version\/(\d+).*Safari/, "Safari"]
];
function ur() {
	for (let [e, t] of lr) {
		let n = navigator.userAgent.match(e);
		if (n) return `${t} ${n[1]}`;
	}
	return F("about.unknownBrowser");
}
function dr(e, t = e) {
	try {
		return new Intl.DisplayNames([t], { type: "language" }).of(e) ?? e;
	} catch {
		return e;
	}
}
function fr() {
	let t = S.get("language"), n = [...e.LANGUAGES ?? []], r = e.locale?.language, i = t !== "auto" && !n.includes(t) && e.locale?.code === t && r && r !== "en" && n.includes(r) ? r : t;
	i !== "auto" && !n.includes(i) && n.push(i);
	let o = (t) => {
		let n = e.locale?.packs?.find((e) => e.language === t)?.name ?? dr(t);
		return n.charAt(0).toUpperCase() + n.slice(1);
	}, s = !!e.languagePacks;
	return [{
		title: F("language.title"),
		rows: [{
			label: F("language.label"),
			description: F(s ? "language.row.packs" : "language.row.description"),
			keywords: F("language.keywords"),
			control: () => b({
				value: i,
				label: F("language.label"),
				options: [{
					value: "auto",
					label: F("language.auto", { name: dr(navigator.language || "en", P.lang) })
				}, ...n.map((e) => ({
					value: e,
					label: o(e)
				}))],
				onChange: (e) => S.set("language", e)
			})
		}, s && {
			label: F("language.more.label"),
			description: F("language.more.description"),
			keywords: F("language.more.keywords"),
			control: a({
				label: F("language.more.button"),
				onClick: () => de("appstore", { tab: "languages" })
			})
		}].filter(Boolean)
	}];
}
var pr = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	10
], mr = [
	3,
	5,
	8,
	10,
	15,
	30,
	60
], hr = [
	10,
	20,
	50,
	100,
	200
];
function gr({ value: e, values: t, label: n, text: r = String, onChange: i }) {
	let a = t.includes(e) ? t : [...t, e].sort((e, t) => e - t);
	return b({
		value: e,
		label: n,
		options: a.map((e) => ({
			value: e,
			label: r(e)
		})),
		onChange: (e) => i(Number(e))
	});
}
function _r() {
	let { notifications: t } = e, n = (e) => O(F("notifications.error", { message: e.message }));
	return [{
		title: F("notifications.arrive.title"),
		rows: [{
			label: F("notifications.shown.label"),
			description: F("notifications.shown.description"),
			keywords: F("notifications.shown.keywords"),
			control: () => gr({
				value: S.get("notifyShown"),
				values: pr,
				label: F("notifications.shown.field"),
				onChange: (e) => S.set("notifyShown", e)
			})
		}, {
			label: F("notifications.seconds.label"),
			description: F("notifications.seconds.description"),
			keywords: F("notifications.seconds.keywords"),
			control: () => gr({
				value: S.get("notifySeconds"),
				values: mr,
				label: F("notifications.seconds.field"),
				text: (e) => F("notifications.seconds.value", { n: e }),
				onChange: (e) => S.set("notifySeconds", e)
			})
		}]
	}, {
		title: F("notifications.list.title"),
		rows: [{
			label: F("notifications.keep.label"),
			keywords: F("notifications.keep.keywords"),
			description: t.available ? F("notifications.keep.description") : `${F("notifications.keep.description")} ${F("notifications.keep.page")}`,
			control: () => gr({
				value: t.keep,
				values: hr,
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
function vr({ openWindow: r, args: i } = {}) {
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
							control: y({
								value: S.get("theme"),
								label: F("appearance.theme.label"),
								options: [{
									value: "light",
									label: F("appearance.theme.light")
								}, {
									value: "dark",
									label: F("appearance.theme.dark")
								}],
								onChange: (e) => S.set("theme", e)
							})
						}]
					}, {
						title: F("appearance.accent.title"),
						rows: [{
							label: F("common.color"),
							description: F("appearance.accent.description"),
							keywords: F("appearance.accent.keywords"),
							control: T({
								value: S.get("accent"),
								colors: te,
								onChange: (e) => S.set("accent", e)
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
				sections: fr
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
							...Xn(),
							{
								title: F("desk.placement.title"),
								rows: [{
									label: F("desk.snap.label"),
									description: F("desk.snap.description"),
									keywords: F("desk.snap.keywords"),
									control: Q("snap")
								}]
							},
							typeof A.fileThumbnail == "function" && {
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
					typeof A.setWallpaper == "function" && {
						id: "background",
						get label() {
							return F("desk.background.label");
						},
						sections: () => Qn(r)
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
			(A.USER_PAGE_ITEMS ?? []).length && {
				id: "userpage",
				icon: "user",
				get label() {
					return F("userPage.label");
				},
				get description() {
					return F("userPage.description");
				},
				sections: er
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
					return zn();
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
				sections: _r
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
				sections: Un
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
						sections: ir
					},
					{
						id: "filetypes",
						get label() {
							return F("fileTypes.label");
						},
						sections: nr
					},
					{
						id: "contextmenu",
						get label() {
							return F("menu.label");
						},
						sections: () => ye("desktop.background", {
							openWindow: r,
							confirmButton: $,
							rerender: () => Z?.render()
						})
					},
					{
						id: "trash",
						get label() {
							return F("trash.label");
						},
						sections: rr
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
					sections: or
				}, {
					id: "pipes",
					get label() {
						return F("pipes.label");
					},
					sections: () => Ue({ rerender: () => Z?.render() })
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
						sections: () => Ne({ rerender: () => Z?.render() })
					},
					{
						id: "services",
						get label() {
							return F("startup.services.label");
						},
						sections: () => ke({
							openWindow: r,
							rerender: () => Z?.render()
						})
					},
					{
						id: "apps",
						get label() {
							return F("startup.apps.label");
						},
						sections: () => Pe({
							openWindow: r,
							rerender: () => Z?.render()
						})
					}
				]
			},
			Kt({ rerender: () => Z?.render() }),
			p.connected && e.logic && Pn({ rerender: () => Z?.render() }),
			Nt({ rerender: () => Z?.render() }),
			...yt({
				rerender: () => Z?.render(),
				select: (e) => Z?.select(e)
			}),
			{ get group() {
				return F("group.data");
			} },
			_n({
				rerender: () => Z?.render(),
				own: () => [{
					title: F("storage.space.title"),
					rows: [{
						label: F("storage.used.label"),
						description: F("storage.used.description"),
						control: cr(sr())
					}, {
						label: F("storage.contents.label"),
						description: F("storage.contents.description"),
						control: cr(u.usage(u.root)?.bytes)
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
								...A.fileThumbnail ? ["deskPreviews"] : [],
								"minimap",
								"lasso",
								"deleteConfirm",
								"deletePermanent",
								"trashRetention",
								"startupApps",
								...e.locale ? ["language"] : [],
								...A.USER_PAGE_ITEMS ? ["userPageHidden"] : [],
								...e.notifications ? ["notifyShown", "notifySeconds"] : [],
								...A.setWallpaper ? ["deskColor", "wallpaper"] : []
							].forEach((e) => S.reset(e)), C.resetAll(), pe(), h.list().forEach((e) => h.reset(e.id));
						})
					}, {
						label: F("storage.initial.label"),
						description: F("storage.initial.description"),
						keywords: F("storage.initial.keywords"),
						control: $(F("storage.initial.button"), F("storage.initial.confirm"), async () => {
							await u.reset(), [
								"workspaces",
								"tags",
								"desktop-layout",
								"desktop",
								"camera",
								"workareas",
								"editor-tree",
								"files-sidebar",
								"app-setup"
							].forEach((e) => w.remove(e)), await p.flush().catch(() => {}), location.reload();
						})
					}]
				}]
			}),
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
								control: _e
							},
							{
								label: F("about.sdkVersion"),
								control: t
							},
							{
								label: F("about.language"),
								control: x.locale
							},
							{
								label: F("about.browser"),
								control: ur()
							}
						]
					}]
				}, {
					id: "credits",
					get label() {
						return F("credits.label");
					},
					sections: At
				}]
			}
		].filter(Boolean)
	});
	Z = a.view;
	let o = (e) => {
		Array.isArray(e?.tagFor) && (Hn = e.tagFor.filter((e) => typeof e == "string" && u.exists(e))), typeof e?.tab == "string" && a.view.select(e.tab, typeof e.subtab == "string" ? e.subtab : void 0), e?.tab === "tags" && a.view.panel.querySelector(".tag-new-name")?.focus();
	};
	o(i), a.on("launch", o);
	let c = () => a.view.tab?.subtabs?.length && !a.view.subtab ? a.view.select(a.view.tab.id) : a.view.render(), l = [N()?.on("change", c), N()?.on("switch", c)], d = u.on("trash", () => a.view.render()), f = E.on("change", () => a.view.render()), m = [
		s.on("change", () => a.view.render()),
		s.on("security", () => a.view.render()),
		we(() => a.view.render()),
		We(() => a.view.render())
	], g = S.on("change:deskHidden", () => a.view.render()), _ = [S.on("change:deskColor", () => a.view.render()), A.wallpaper?.on("change", () => a.view.render())], v = () => a.setTitle(F("window.title"), a.view.tab?.label ?? "");
	a.view.on("select", v), a.view.on("select", () => {
		bt(a.view.tab?.id) && (xt(a.view.tab.id), a.view.render()), a.view.tab?.id === "storage" && (nn(), a.view.render());
	});
	let b = vn(() => a.view.render()), ee = e.net?.on?.("mounts", () => {
		a.view.tab?.id === "onedrive" && a.view.render();
	}), D = e.locale?.on("change", () => {
		a.view.render(), v();
	}), O = e.locale?.on("languages", () => a.view.render());
	return a.on("destroy", () => {
		l.forEach((e) => e?.()), d(), f(), g(), _.forEach((e) => e?.()), D?.(), O?.(), m.forEach((e) => e?.()), ee?.(), b(), Z === a.view && (Z = null);
	}), a;
}
export { vr as default };
