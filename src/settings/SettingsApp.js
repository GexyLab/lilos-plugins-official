import { SettingsWindow, settings, shortcuts, shortcutField, storage, session, fs, tags, TAG_COLORS, menus, fileTypeList, toggle, swatches, segmented, selectField, textField, actionButton, toast, h, kernel, SDK_VERSION, apps as packages } from '@lilos/sdk';
import * as sdk from '@lilos/sdk';   // locale, LANGUAGES: missing in older lilOS, so not imported by name
import { executionMode, canChangeExecution, showAppSecurity } from '@lilos/system';
import { setTag } from '@lilos/system';
import { version } from '@lilos/system';
import { ACCENTS, LASSO_OPTIONS, RETENTION_OPTIONS } from '@lilos/system';
import { apps, launch } from '@lilos/system';
import { fileApps, appFor, defaultAppFor, setAppFor, resetAppsFor, knownExtensions } from '@lilos/system';
import { workspaceManager } from '@lilos/system';
import * as system from '@lilos/system';   // DESK_FIXED_ITEMS, isFixedShown, setFixedShown: missing in older lilOS, so not imported by name
import { WORKSPACE_LIMITS } from '@lilos/system';
import { menuSections } from './menuEditor.js';
import { startupOptionsSections, startupAppsSections } from './startup.js';
import { servicesSections, watchServices } from './services.js';
import { pipeSections, watchPipes } from './pipes.js';
import { t, i18n } from './i18n.js';
import './settings-app.css';

let view = null;   // the open SettingsView, to redraw after resets

/** A workspace (the current one or another): name, color, what it made, its apps and fixed desk items. */
function workspaceSections(id) {
  const ws = workspaceManager();
  const cur = ws?.list().find(w => w.id === id);
  if (!cur) return [];
  return [
    {
      title: t('workspaces.current.title'),
      rows: [
        {
          label: t('common.name'), keywords: t('workspaces.name.keywords'),
          control: () => {
            const field = textField({ value: cur.name, label: t('workspaces.name.field'), onChange: v => ws.rename(cur.id, v) });
            field.maxLength = WORKSPACE_LIMITS.MAX_NAME;
            return field;
          },
        },
        {
          label: t('common.color'), description: t('workspaces.color.description'), keywords: t('workspaces.color.keywords'),
          control: () => swatches({ value: cur.color, colors: ACCENTS, onChange: v => ws.setColor(cur.id, v) }),
        },
        {
          label: t('workspaces.owned.label'), description: t('workspaces.owned.description'),
          control: String(ws.ownedCount(cur.id)),
        },
        id !== ws.currentId && {
          label: t('workspaces.switch.label'), keywords: t('workspaces.list.keywords'),
          control: () => actionButton({ label: t('workspaces.list.switch'), onClick: () => ws.switchTo(id) }),
        },
      ].filter(Boolean),
    },
    {
      title: t('workspaces.apps.title'),
      rows: apps.map(app => ({
        label: app.name,
        description: app.system ? t('workspaces.apps.system') : t('workspaces.apps.installed'),
        keywords: t('workspaces.apps.keywords', { name: app.name }),
        control: app.system ? t('workspaces.apps.alwaysVisible') : () => toggle({
          value: ws.isInstalled(app.id, id),
          label: id === ws.currentId ? t('workspaces.apps.toggle', { name: app.name }) : t('workspaces.apps.toggleIn', { name: app.name, workspace: cur.name }),
          onChange: v => ws.setInstalled(app.id, v, id),
        }),
      })),
    },
    ...workspaceFixedSections(id),
  ];
}

/**
 * Secondary tabs of Workspace: this one, one per other workspace (named after it), all of them.
 * The same objects at every render, as SettingsView needs to know which one is shown.
 */
const currentTab = { id: 'current', get label() { return t('workspaces.current.label'); }, sections: () => workspaceSections(workspaceManager()?.currentId) };
const allTab = { id: 'all', get label() { return t('workspaces.all.label'); }, sections: allWorkspacesSections };
const otherTabs = new Map();   // workspace id → its tab

function workspaceSubtabs() {
  const ws = workspaceManager();
  const others = (ws?.list() ?? []).filter(w => w.id !== ws.currentId).map(w => {
    if (!otherTabs.has(w.id)) {
      otherTabs.set(w.id, { id: `ws-${w.id}`, get label() { return workspaceManager()?.describe(w.id)?.name ?? ''; }, sections: () => workspaceSections(w.id) });
    }
    return otherTabs.get(w.id);
  });
  return [currentTab, ...others, allTab];
}

/** Every workspace: change to it, delete it; make a new one. */
function allWorkspacesSections() {
  const ws = workspaceManager();
  if (!ws) return [];
  const list = ws.list();
  return [
    {
      title: t('workspaces.label'),
      rows: [
        ...list.map(w => {
          const current = w.id === ws.currentId;
          const installed = apps.filter(a => ws.isInstalled(a.id, w.id)).length;
          return {
            label: current ? t('workspaces.list.current', { name: w.name }) : w.name,
            description: `${t('workspaces.list.owned', { n: ws.ownedCount(w.id) })} · ${t('workspaces.list.apps', { n: installed })}`,
            keywords: t('workspaces.list.keywords'),
            control: () => h('div', { class: 'ws-settings-actions' },
              current ? null : actionButton({ label: t('workspaces.list.switch'), onClick: () => ws.switchTo(w.id) }),
              list.length > 1 ? confirmButton(t('common.delete'), t('common.deleteNow'), () => ws.remove(w.id)) : null),
          };
        }),
        {
          label: t('workspaces.new.label'), description: t('workspaces.new.description'),
          control: actionButton({ label: t('common.create'), onClick: () => { const id = ws.create(); if (id) ws.switchTo(id); } }),
        },
      ],
    },
    ...allFixedSections(),
    {
      title: t('workspaces.deleting.title'),
      rows: [
        { label: t('workspaces.deleting.files.label'), description: t('workspaces.deleting.files.description') },
        { label: t('workspaces.deleting.windows.label'), description: t('workspaces.deleting.windows.description') },
      ],
    },
  ];
}

/** Bound toggle for a boolean setting. */
let pendingTagFor = [];   // items to put the next tag made here on (from Tag → Nuovo tag…)

/** Creating tags, and one section per tag: name, color, visible, its items, delete. */
function tagSections() {
  const create = field => {
    try {
      const tag = tags.create({ name: field.value });
      if (pendingTagFor.length) setTag(pendingTagFor, tag.id, true);
      pendingTagFor = [];
    } catch (err) {
      toast(err.message);
      field.focus();
    }
  };
  const pending = pendingTagFor.filter(id => fs.exists(id)).length;
  return [
    {
      title: t('tags.new.title'),
      rows: [{
        label: t('common.name'),
        description: pending ? t('tags.new.pending', { n: pending }) : t('tags.new.description'),
        keywords: t('tags.new.keywords'),
        control: () => {
          const field = textField({ placeholder: t('tags.new.placeholder'), label: t('tags.new.field') });
          field.maxLength = 30;
          field.classList.add('tag-new-name');
          field.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); create(field); } });
          return h('div', { class: 'tag-settings-actions' }, field, actionButton({ label: t('common.create'), primary: true, onClick: () => create(field) }));
        },
      }],
    },
    ...tags.list().map(tag => ({
      title: tag.name,
      rows: [
        {
          label: t('common.name'), keywords: t('tags.name.keywords'),
          control: () => {
            const field = textField({
              value: tag.name, label: t('tags.name.field', { name: tag.name }),
              onChange: v => { try { tags.rename(tag.id, v); } catch (err) { toast(err.message); field.value = tags.get(tag.id)?.name ?? ''; } },
            });
            field.maxLength = 30;
            return field;
          },
        },
        { label: t('common.color'), keywords: t('tags.color.keywords'), control: () => swatches({ value: tag.color, colors: TAG_COLORS, onChange: v => tags.setColor(tag.id, v) }) },
        {
          label: t('tags.visible.label'),
          description: tag.visible ? t('tags.visible.on') : t('tags.visible.off'),
          keywords: t('tags.visible.keywords'),
          control: () => toggle({ value: tag.visible, label: t('tags.visible.toggle', { name: tag.name }), onChange: v => tags.setVisible(tag.id, v) }),
        },
        {
          label: t('common.items'), description: t('tags.items.description', { n: fs.tagged(tag.id).length }),
          control: () => h('div', { class: 'tag-settings-actions' },
            actionButton({ label: t('tags.items.show'), onClick: () => launch('files', { tag: tag.id }) }),
            confirmButton(t('common.delete'), t('tags.items.delete'), () => tags.remove(tag.id))),
        },
      ],
    })),
  ];
}

/** Fixed items whose name and description are in locales.json (desk.fixed.item.<key>.…). */
const TRANSLATED_FIXED = ['home', 'documents', 'images', 'files', 'downloads', 'trash'];

/**
 * A fixed item with its name and description in the system's language. lilOS gives them in
 * Italian; one Sistema does not know keeps those.
 */
function translatedFixed(f) {
  if (!TRANSLATED_FIXED.includes(f.key)) return f;
  return { ...f, name: t(`desk.fixed.item.${f.key}.name`), description: t(`desk.fixed.item.${f.key}.description`) };
}

/**
 * The fixed items of the desks (lilOS's list: none in older versions), with what `row(item)` adds
 * to each one's row (control, description).
 */
function fixedItemsSections(description, row) {
  const fixed = (system.DESK_FIXED_ITEMS ?? []).map(translatedFixed);
  if (!fixed.length) return [];
  return [{
    title: t('desk.fixed.title'),
    rows: [
      { label: t('desk.fixed.label'), description },
      ...fixed.map(f => ({ label: f.name, description: f.description, keywords: t('desk.fixed.keywords', { name: f.name }), ...row(f) })),
    ],
  }];
}

/** lilOS keeps the fixed items of each workspace apart (older ones: one choice for every desk). */
const fixedPerWorkspace = () => typeof system.setFixedShownEverywhere === 'function';

/** The fixed items of one workspace's desk, each one on or off there. */
function workspaceFixedSections(id) {
  if (!fixedPerWorkspace()) return [];
  const ws = workspaceManager();
  // Another workspace's tab: its name in the label, for screen readers
  const label = name => (id === ws?.currentId ? t('desk.fixed.toggle', { name }) : t('desk.fixed.toggleIn', { name, workspace: ws?.describe(id)?.name ?? '' }));
  return fixedItemsSections(t('desk.fixed.descriptionWorkspace'), f => ({
    control: () => toggle({ value: system.isFixedShown(f.key, id), label: label(f.name), onChange: v => system.setFixedShown(f.key, v, id) }),
  }));
}

/**
 * The fixed items of every desk: each one turned on or off in all the workspaces at once (and in
 * new ones). In older lilOS, the single choice for every desk, or just the list (always on).
 */
function allFixedSections() {
  const ws = workspaceManager();
  if (fixedPerWorkspace() && ws) {
    const list = ws.list();
    return fixedItemsSections(t('desk.fixed.descriptionAll'), f => {
      const on = list.filter(w => system.isFixedShown(f.key, w.id)).length;
      return {
        description: on && on < list.length ? t('desk.fixed.some', { on, n: list.length }) : f.description,
        control: () => toggle({ value: on === list.length, label: t('desk.fixed.toggleAll', { name: f.name }), onChange: v => system.setFixedShownEverywhere(f.key, v) }),
      };
    });
  }
  const switchable = typeof system.setFixedShown === 'function';
  return fixedItemsSections(switchable ? t('desk.fixed.descriptionSwitchable') : t('desk.fixed.description'), f => ({
    control: switchable
      ? () => toggle({ value: system.isFixedShown(f.key), label: t('desk.fixed.toggle', { name: f.name }), onChange: v => system.setFixedShown(f.key, v) })
      : t('desk.fixed.always'),
  }));
}

/** Where the fixed items went (Scrivania → Elementi had them before they were per workspace). */
function deskFixedSections() {
  if (!(system.DESK_FIXED_ITEMS ?? []).length) return [];
  return [{
    title: t('desk.fixed.title'),
    rows: [{
      label: t('desk.fixed.moved.label'), description: t('desk.fixed.moved.description'), keywords: t('desk.fixed.moved.keywords'),
      control: () => actionButton({ label: t('desk.fixed.moved.open'), onClick: () => view?.select('workspaces', 'current') }),
    }],
  }];
}

const settingToggle = key => () => toggle({ value: settings.get(key), onChange: v => settings.set(key, v) });

/** Groups and items of the user page whose names and descriptions are in locales.json (userPage.…). */
const TRANSLATED_USER_PAGE = {
  groups: ['header', 'actions', 'account', 'session', 'footer'],
  items: ['details', 'lock', 'logout', 'restart', 'photo', 'theme', 'language', 'settings', 'workspace', 'windows', 'startup', 'storage', 'about'],
};

/**
 * What the page opened from the user's name shows (lilOS's lists: none in older versions), one
 * switch per item, a section per group. Items Control Panel does not know keep lilOS's Italian texts.
 */
function userPageSections() {
  const items = system.USER_PAGE_ITEMS ?? [];
  const groupName = g => (TRANSLATED_USER_PAGE.groups.includes(g.key) ? t(`userPage.group.${g.key}`) : g.name);
  const texts = i => (TRANSLATED_USER_PAGE.items.includes(i.key)
    ? { name: t(`userPage.item.${i.key}.name`), description: t(`userPage.item.${i.key}.description`) }
    : i);
  return [
    { title: t('userPage.title'), rows: [{ label: t('userPage.open.label'), description: t('userPage.open.description') }] },
    ...(system.USER_PAGE_GROUPS ?? []).map(g => ({
      title: groupName(g),
      rows: items.filter(i => i.group === g.key).map(i => {
        const { name, description } = texts(i);
        return {
          label: name, description, keywords: t('userPage.keywords', { name }),
          control: () => toggle({ value: system.isUserPageShown(i.key), label: t('userPage.toggle', { name }), onChange: v => system.setUserPageShown(i.key, v) }),
        };
      }),
    })).filter(section => section.rows.length),
  ];
}

const GROUP_ORDER = ['Generale', 'Scrivania', 'Elementi', 'Finestre'];

/** One section per type group (Testo, Codice…), one row per extension, with the app that opens it. */
function fileTypeSections() {
  const known = new Set(knownExtensions());
  const listed = new Set();
  const row = ext => {
    listed.add(ext);
    const fallback = defaultAppFor(ext);
    return {
      label: ext ? `.${ext}` : t('fileTypes.noExtension'),
      description: fallback ? t('fileTypes.default', { app: fallback.name }) : t('fileTypes.noDefault'),
      keywords: t('fileTypes.keywords', { ext }),
      control: () => selectField({
        value: appFor(ext)?.id ?? 'ask', label: ext ? t('fileTypes.field', { ext }) : t('fileTypes.fieldNoExtension'),
        options: [{ value: 'ask', label: t('fileTypes.ask') }, ...fileApps().map(a => ({ value: a.id, label: a.name }))],
        onChange: v => setAppFor(ext, v),
      }),
    };
  };
  const groups = fileTypeList()
    .map(t => ({ title: t.label, rows: t.exts.filter(e => known.has(e)).map(row) }))
    .filter(g => g.rows.length);
  const others = [...known].filter(e => !listed.has(e)).sort((a, b) => (a === '' ? -1 : b === '' ? 1 : a.localeCompare(b)));
  return [
    {
      title: t('fileTypes.title'),
      rows: [{
        label: t('fileTypes.all.label'),
        description: t('fileTypes.all.description'),
        control: confirmButton(t('fileTypes.all.reset'), t('common.confirm'), () => { resetAppsFor(); view?.render(); }),
      }],
    },
    ...groups,
    ...(others.length ? [{ title: t('fileTypes.others'), rows: others.map(row) }] : []),
  ];
}

/** Deleting files and folders, and how long the trash keeps them. */
function trashSections() {
  const items = fs.trashed();
  const bytes = items.reduce((sum, n) => sum + n.bytes, 0);
  return [
    {
      title: t('trash.deleting.title'),
      rows: [
        {
          label: t('trash.confirm.label'), description: t('trash.confirm.description'),
          keywords: t('trash.confirm.keywords'), control: settingToggle('deleteConfirm'),
        },
        {
          label: t('trash.permanent.label'), description: t('trash.permanent.description'),
          keywords: t('trash.permanent.keywords'), control: settingToggle('deletePermanent'),
        },
      ],
    },
    {
      title: t('trash.label'),
      rows: [
        {
          label: t('trash.retention.label'), description: t('trash.retention.description'),
          keywords: t('trash.retention.keywords'),
          control: () => {
            // A stored period that is not in the list (set by hand) is shown as it is, not as the first option
            const days = settings.get('trashRetention');
            const listed = RETENTION_OPTIONS.some(o => o.value === days);
            const options = listed ? RETENTION_OPTIONS : [...RETENTION_OPTIONS, { value: days, label: days > 0 ? t('trash.retention.days', { n: days }) : t('trash.retention.forever') }];
            return selectField({
              value: days, label: t('trash.retention.field'), options,
              onChange: v => settings.set('trashRetention', Number(v)),
            });
          },
        },
        {
          label: t('trash.contents.label'), description: items.length ? t('trash.contents.description', { n: items.length, size: formatBytes(bytes) }) : t('trash.contents.empty'),
          keywords: t('trash.contents.keywords'), control: actionButton({ label: t('trash.contents.open'), onClick: () => launch('files', { trash: true }) }),
        },
        {
          label: t('trash.empty.label'), description: t('trash.empty.description'), keywords: t('trash.empty.keywords'),
          control: items.length ? confirmButton(t('trash.empty.button'), t('trash.empty.confirm'), () => fs.purgeTrash()) : t('trash.empty.none'),
        },
      ],
    },
  ];
}

/** Bytes of all file contents (sizes kept in the tree). */
function contentsSize(id = fs.root) {
  return fs.children(id).reduce((sum, n) => sum + (n.type === 'folder' ? contentsSize(n.id) : n.size ?? 0), 0);
}

/** One section per command group, one row per command, each with its shortcut editor. */
function shortcutSections() {
  const groups = new Map();
  for (const cmd of shortcuts.list()) {
    if (!groups.has(cmd.group)) groups.set(cmd.group, []);
    groups.get(cmd.group).push(cmd);
  }
  const rank = g => (GROUP_ORDER.includes(g) ? GROUP_ORDER.indexOf(g) : GROUP_ORDER.length);
  return [
    {
      title: t('shortcuts.title'),
      rows: [{
        label: t('shortcuts.all.label'),
        description: t('shortcuts.all.description'),
        control: confirmButton(t('shortcuts.all.reset'), t('common.confirm'), () => shortcuts.resetAll()),
      }],
    },
    ...[...groups].sort(([a], [b]) => rank(a) - rank(b)).map(([group, cmds]) => ({
      title: group,
      rows: cmds.map(cmd => ({
        label: cmd.label,
        keywords: t('shortcuts.keywords', { keys: cmd.keys.map(k => shortcuts.format(k)).join(' ') }),
        control: shortcutField(cmd.id),
      })),
    })),
    {
      title: t('shortcuts.mouse.title'),
      rows: [
        {
          label: t('shortcuts.lasso.label'), description: t('shortcuts.lasso.description'),
          keywords: t('shortcuts.lasso.keywords'),
          control: () => selectField({ value: settings.get('lasso'), options: LASSO_OPTIONS, onChange: v => settings.set('lasso', v) }),
        },
        { label: t('shortcuts.rectangle.label'), control: t('shortcuts.rectangle.control') },
        { label: t('shortcuts.addToSelection.label'), control: t('shortcuts.addToSelection.control') },
        { label: t('shortcuts.pan.label'), control: t('shortcuts.pan.control') },
      ],
    },
    {
      title: t('shortcuts.fixed.title'),
      rows: [
        { label: t('shortcuts.navigate.label'), control: t('shortcuts.navigate.control') },
        { label: t('shortcuts.rename.label'), control: t('shortcuts.rename.control') },
      ],
    },
  ];
}

const modeLabels = () => ({ isolated: t('apps.mode.isolated'), open: t('apps.mode.open'), system: t('apps.mode.system'), remote: t('apps.mode.remote') });

/**
 * How installed apps run: isolated (a sandbox: only what their permissions allow) or not
 * (lilOS's page and a Web Worker: faster, with everything the user can do). Only an
 * administrator changes it; each app may have its own choice (its Proprietà → Sicurezza).
 */
function appSecuritySections() {
  const admin = canChangeExecution();
  const { isolated } = packages.security();
  const listed = apps.filter(a => a.package && !a.package.system);
  return [
    {
      title: t('apps.execution.title'),
      rows: [
        {
          label: t('apps.isolated.label'),
          description: admin ? t('apps.isolated.description') : t('apps.isolated.adminOnly'),
          keywords: t('apps.isolated.keywords'),
          control: admin
            ? toggle({
              value: isolated, label: t('apps.isolated.label'),
              onChange: async v => {
                try {
                  await packages.setSecurity({ isolated: v });
                } catch (err) {
                  toast(t('apps.isolated.failed', { error: err.message }));
                }
                view?.render();
              },
            })
            : (isolated ? t('common.yes') : t('common.no')),
        },
        { label: t('apps.system.label'), description: t('apps.system.description') },
      ],
    },
    {
      title: t('apps.installed.title'),
      rows: listed.length
        ? listed.map(a => {
          const mode = executionMode(a.package);
          const why = mode.fixed ? mode.reason : mode.own === null ? t('apps.installed.shared') : t('apps.installed.own');
          return {
            label: a.name, description: `${modeLabels()[mode.mode]} · ${why}`, keywords: t('apps.installed.keywords'),
            control: actionButton({ label: t('apps.installed.properties'), onClick: () => showAppSecurity(a.id) }),
          };
        })
        : [{ label: t('apps.installed.none') }],
    },
  ];
}

/** Destructive action in two clicks: the first one asks for confirmation for a few seconds. */
function confirmButton(label, confirmLabel, action) {
  let timer = 0;
  const btn = actionButton({
    label,
    onClick: () => {
      if (!btn.classList.contains('primary')) {
        btn.textContent = confirmLabel;
        btn.classList.add('danger', 'primary');
        timer = setTimeout(reset, 4000);
        return;
      }
      clearTimeout(timer);
      const result = action();
      if (typeof result?.then !== 'function') { reset(); return; }
      // Waits with the confirm label and a spinner (lilOS styles [aria-busy]) until the action ends
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      result.catch(err => toast(err.message, { timeout: 7000 })).finally(() => {
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
        reset();
      });
    },
  });
  const reset = () => {
    btn.textContent = label;
    btn.classList.remove('danger', 'primary');
  };
  return btn;
}

/** Bytes of settings, positions and views saved by lilOS (JSON text). */
function storageUsage() {
  return storage.bytes();
}

function formatBytes(bytes) {
  if (bytes == null) return t('common.unavailable');
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toLocaleString(session.locale, { maximumFractionDigits: 1 })} KB`;
}

const BROWSERS = [[/Edg\/(\d+)/, 'Edge'], [/Firefox\/(\d+)/, 'Firefox'], [/Chrome\/(\d+)/, 'Chrome'], [/Version\/(\d+).*Safari/, 'Safari']];

function browserName() {
  for (const [re, name] of BROWSERS) {
    const m = navigator.userAgent.match(re);
    if (m) return `${name} ${m[1]}`;
  }
  return t('about.unknownBrowser');
}

/** A language's name in the given language ('it-IT' → 'italiano (Italia)'); the code if Intl does not know it. */
function languageName(code, lang = code) {
  try {
    return new Intl.DisplayNames([lang], { type: 'language' }).of(code) ?? code;
  } catch {
    return code;
  }
}

/** The language of apps: 'auto' (the browser's) or one of lilOS's, each named in its own language. */
function languageSections() {
  const value = settings.get('language');
  const codes = [...(sdk.LANGUAGES ?? [])];
  // A stored language that is not in the list (set by hand) is shown as it is
  if (value !== 'auto' && !codes.includes(value)) codes.push(value);
  const own = code => {
    const name = languageName(code);
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  return [{
    title: t('language.title'),
    rows: [{
      label: t('language.label'), description: t('language.row.description'), keywords: t('language.keywords'),
      control: () => selectField({
        value, label: t('language.label'),
        options: [
          { value: 'auto', label: t('language.auto', { name: languageName(navigator.language || 'en', i18n.lang) }) },
          ...codes.map(code => ({ value: code, label: own(code) })),
        ],
        onChange: v => settings.set('language', v),
      }),
    }],
  }];
}

/**
 * The system Settings app: only settings that actually work. Tabs and secondary tabs give their
 * texts with getters, read on every render: they follow a change of language.
 */
export default function createSettings({ openWindow, args } = {}) {
  const win = new SettingsWindow({
    title: t('window.title'),
    icon: 'gear',
    width: 760,
    height: 500,
    tabs: [
      { get group() { return t('group.system'); } },
      {
        id: 'appearance', icon: 'palette',
        get label() { return t('appearance.label'); },
        get description() { return t('appearance.description'); },
        subtabs: [
          {
            id: 'colors', get label() { return t('appearance.colors.label'); },
            sections: () => [{
              title: t('appearance.theme.label'),
              rows: [{
                label: t('appearance.theme.label'), description: t('appearance.theme.description'), keywords: t('appearance.theme.keywords'),
                control: segmented({
                  value: settings.get('theme'), label: t('appearance.theme.label'),
                  options: [{ value: 'light', label: t('appearance.theme.light') }, { value: 'dark', label: t('appearance.theme.dark') }],
                  onChange: v => settings.set('theme', v),
                }),
              }],
            }, {
              title: t('appearance.accent.title'),
              rows: [{
                label: t('common.color'), description: t('appearance.accent.description'), keywords: t('appearance.accent.keywords'),
                control: swatches({ value: settings.get('accent'), colors: ACCENTS, onChange: v => settings.set('accent', v) }),
              }],
            }],
          },
          {
            id: 'motion', get label() { return t('appearance.motion.label'); },
            sections: () => [{
              title: t('appearance.animations.label'),
              rows: [{
                label: t('appearance.animations.label'), description: t('appearance.animations.description'),
                keywords: t('appearance.animations.keywords'), control: settingToggle('motion'),
              }],
            }],
          },
        ],
      },
      sdk.locale && {
        id: 'language', icon: 'globe',
        get label() { return t('language.label'); },
        get description() { return t('language.description'); },
        sections: languageSections,
      },
      {
        id: 'desk', icon: 'grid',
        get label() { return t('desk.label'); },
        get description() { return t('desk.description'); },
        subtabs: [
          {
            id: 'items', get label() { return t('common.items'); },
            sections: () => [...deskFixedSections(), {
              title: t('desk.placement.title'),
              rows: [{
                label: t('desk.snap.label'), description: t('desk.snap.description'),
                keywords: t('desk.snap.keywords'), control: settingToggle('snap'),
              }],
            }],
          },
          {
            id: 'overview', get label() { return t('desk.overview.label'); },
            sections: () => [{
              title: t('desk.overview.title'),
              rows: [{ label: t('desk.minimap.label'), keywords: t('desk.minimap.keywords'), control: settingToggle('minimap') }],
            }],
          },
        ],
      },
      (system.USER_PAGE_ITEMS ?? []).length && {
        id: 'userpage', icon: 'user',
        get label() { return t('userPage.label'); },
        get description() { return t('userPage.description'); },
        sections: userPageSections,
      },
      {
        id: 'workspaces', icon: 'workspace',
        get label() { return t('workspaces.label'); },
        get description() { return t('workspaces.description'); },
        get subtabs() { return workspaceSubtabs(); },
      },
      {
        id: 'tags', icon: 'tag',
        get label() { return t('tags.label'); },
        get description() { return t('tags.description'); },
        sections: tagSections,
      },
      {
        id: 'usability', icon: 'accessibility',
        get label() { return t('usability.label'); },
        get description() { return t('usability.description'); },
        subtabs: [
          { id: 'shortcuts', get label() { return t('shortcuts.label'); }, sections: shortcutSections },
          { id: 'filetypes', get label() { return t('fileTypes.label'); }, sections: fileTypeSections },
          { id: 'contextmenu', get label() { return t('menu.label'); }, sections: () => menuSections('desktop.background', { openWindow, confirmButton, rerender: () => view?.render() }) },
          { id: 'trash', get label() { return t('trash.label'); }, sections: trashSections },
        ],
      },
      {
        id: 'apps', icon: 'window',
        get label() { return t('apps.label'); },
        get description() { return t('apps.description'); },
        subtabs: [
          { id: 'security', get label() { return t('apps.security.label'); }, sections: appSecuritySections },
          { id: 'pipes', get label() { return t('pipes.label'); }, sections: () => pipeSections({ rerender: () => view?.render() }) },
        ],
      },
      {
        id: 'startup', icon: 'power',
        get label() { return t('startup.label'); },
        get description() { return t('startup.description'); },
        subtabs: [
          { id: 'options', get label() { return t('startup.options.label'); }, sections: () => startupOptionsSections({ rerender: () => view?.render() }) },
          { id: 'services', get label() { return t('startup.services.label'); }, sections: () => servicesSections({ openWindow, rerender: () => view?.render() }) },
          { id: 'apps', get label() { return t('startup.apps.label'); }, sections: () => startupAppsSections({ openWindow, rerender: () => view?.render() }) },
        ],
      },
      { get group() { return t('group.data'); } },
      {
        id: 'storage', icon: 'disk',
        get label() { return t('storage.label'); },
        get description() { return kernel.connected ? t('storage.description.kernel') : t('storage.description.browser'); },
        sections: () => [
          {
            title: t('storage.space.title'),
            rows: [
              { label: t('storage.used.label'), description: t('storage.used.description'), control: formatBytes(storageUsage()) },
              { label: t('storage.contents.label'), description: t('storage.contents.description'), control: formatBytes(contentsSize()) },
            ],
          },
          {
            title: t('storage.reset.title'),
            rows: [
              {
                label: t('storage.defaults.label'), description: t('storage.defaults.description'),
                control: confirmButton(t('common.reset'), t('common.confirm'), () => {
                  ['accent', 'theme', 'motion', 'snap', 'minimap', 'lasso', 'deleteConfirm', 'deletePermanent', 'trashRetention', 'startupApps', ...(sdk.locale ? ['language'] : []), ...(system.USER_PAGE_ITEMS ? ['userPageHidden'] : [])].forEach(k => settings.reset(k));
                  shortcuts.resetAll();
                  resetAppsFor();
                  menus.list().forEach(m => menus.reset(m.id));
                }),
              },
              {
                label: t('storage.initial.label'), description: t('storage.initial.description'),
                keywords: t('storage.initial.keywords'), control: confirmButton(t('storage.initial.button'), t('storage.initial.confirm'), async () => {
                  // The keys of each workspace (ws:<id>:…) are dropped at start-up, once their workspace is gone
                  await fs.reset();
                  // 'app-setup' too: installed apps make their folders and desk items again
                  ['workspaces', 'tags', 'desktop-layout', 'desktop', 'camera', 'workareas', 'editor-tree', 'files-sidebar', 'app-setup'].forEach(k => storage.remove(k));
                  await kernel.flush().catch(() => {});
                  location.reload();
                }),
              },
            ],
          },
        ],
      },
      { group: '' },
      {
        id: 'about', icon: 'info',
        get label() { return t('about.label'); },
        get description() { return t('about.description'); },
        sections: () => [{
          title: 'lilOS',
          rows: [
            { label: t('about.version'), control: version },
            { label: t('about.sdkVersion'), control: SDK_VERSION },
            { label: t('about.language'), control: session.locale },
            { label: t('about.browser'), control: browserName() },
          ],
        }],
      },
    ].filter(Boolean),
  });
  view = win.view;
  // Opened on a tab (args.tab, e.g. 'workspaces' from the taskbar; args.subtab, one of its
  // secondary tabs), also when launched again.
  // args.tagFor: items the next tag made here goes on (Tag → Nuovo tag… in a menu)
  const show = a => {
    if (Array.isArray(a?.tagFor)) pendingTagFor = a.tagFor.filter(id => typeof id === 'string' && fs.exists(id));
    if (typeof a?.tab === 'string') win.view.select(a.tab, typeof a.subtab === 'string' ? a.subtab : undefined);
    if (a?.tab === 'tags') win.view.panel.querySelector('.tag-new-name')?.focus();
  };
  show(args);
  win.on('launch', show);
  // Workspaces changed or switched: Workspace has a tab per other workspace (back to the first
  // one if the workspace shown went away, or became the current one)
  const refresh = () => (win.view.tab?.subtabs?.length && !win.view.subtab ? win.view.select(win.view.tab.id) : win.view.render());
  const offWorkspaces = [workspaceManager()?.on('change', refresh), workspaceManager()?.on('switch', refresh)];
  const offTrash = fs.on('trash', () => win.view.render());
  const offTags = tags.on('change', () => win.view.render());
  const offApps = [packages.on('change', () => win.view.render()), packages.on('security', () => win.view.render()), watchServices(() => win.view.render()), watchPipes(() => win.view.render())];
  // Fixed desk items turned off from the desk's menu meanwhile (older lilOS: one choice for every desk)
  const offDesk = settings.on('change:deskHidden', () => win.view.render());
  // The language changed (here or elsewhere): every text again in the new one. The title too,
  // which SettingsWindow sets on each tab change with the text it was made with
  const retitle = () => win.setTitle(t('window.title'), win.view.tab?.label ?? '');
  win.view.on('select', retitle);
  const offLocale = sdk.locale?.on('change', () => { win.view.render(); retitle(); });
  win.on('destroy', () => { offWorkspaces.forEach(off => off?.()); offTrash(); offTags(); offDesk(); offLocale?.(); offApps.forEach(off => off?.()); if (view === win.view) view = null; });
  return win;
}
