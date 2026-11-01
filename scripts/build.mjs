/**
 * Builds every app of the repository and writes its package: apps/<id>/lilos.json (from
 * src/<id>/app.json) with the hash of every built file. The built files are committed: lilOS
 * installs them as they are, without building anything.
 * The translations (src/<id>/locales.json, see lilOS's SDK i18n.js) go to apps/<id>/locales.json,
 * named by `locales` in the manifest; the build stops if a language lacks keys of English.
 *
 *   npm run build
 */
import { build } from 'vite';
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { appConfig } from '../vite.config.js';

const APPS = [
  { id: 'files', entry: 'FilesApp.js' },
  { id: 'editor', entry: 'EditorApp.js' },
  { id: 'settings', entry: 'SettingsApp.js' },
  { id: 'appstore', entry: 'AppStoreApp.js' },
  { id: 'photo', entry: 'PhotoApp.js' },
  { id: 'terminal', entry: 'TerminalApp.js' },
  { id: 'filecrypt', entry: 'FileCryptApp.js' },
  { id: 'calculator', entry: 'CalculatorApp.js' },
  { id: 'keyboard', entry: 'KeyboardApp.js' },
];

/** Every language without `extends` has every key of English, and none that English lacks. */
function checkLocales(id, table) {
  const en = Object.keys(table.en?.strings ?? {});
  if (!en.length) throw new Error(`${id}: locales.json senza "en"`);
  for (const [lang, { extends: ext, strings = {} }] of Object.entries(table)) {
    if (lang === 'en' || ext) continue;
    const missing = en.filter(k => !Object.hasOwn(strings, k));
    const extra = Object.keys(strings).filter(k => !en.includes(k));
    if (missing.length || extra.length) throw new Error(`${id}: locales.json, ${lang}: ${missing.length ? `mancano ${missing.join(', ')}` : ''}${extra.length ? ` in più ${extra.join(', ')}` : ''}`);
  }
}

const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
const sha256 = data => `sha256-${createHash('sha256').update(data).digest('base64')}`;

for (const { id, entry } of APPS.filter(a => !process.argv[2] || process.argv.slice(2).includes(a.id))) {
  await build({ configFile: false, ...appConfig(id, entry) });
  const pkg = join('apps', id);
  // Services (entry points of kind 'service') run in the kernel's isolate: modules without imports, copied as they are
  const services = join('src', id, 'services');
  if (existsSync(services)) for (const f of readdirSync(services).filter(f => f.endsWith('.js'))) copyFileSync(join(services, f), join(pkg, 'dist', f));
  const locales = join('src', id, 'locales.json');
  if (existsSync(locales)) {
    checkLocales(id, JSON.parse(readFileSync(locales, 'utf8')));
    copyFileSync(locales, join(pkg, 'locales.json'));
  }
  const files = {};
  for (const file of walk(join(pkg, 'dist')).sort()) files[relative(pkg, file).split(sep).join('/')] = sha256(readFileSync(file));
  if (existsSync(locales)) files['locales.json'] = sha256(readFileSync(join(pkg, 'locales.json')));
  const styles = readdirSync(join(pkg, 'dist')).filter(f => f.endsWith('.css')).map(f => `dist/${f}`);
  const template = JSON.parse(readFileSync(join('src', id, 'app.json'), 'utf8'));
  const manifest = {
    ...template,
    entry: 'dist/index.js',
    ...(styles.length && { styles }),
    ...(existsSync(locales) && { locales: 'locales.json' }),
    files,
  };
  writeFileSync(join(pkg, 'lilos.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`${id} ${manifest.version}: ${Object.keys(files).length} file`);
}
