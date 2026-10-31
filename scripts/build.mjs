/**
 * Builds every app of the repository and writes its package: apps/<id>/lilos.json (from
 * src/<id>/app.json) with the hash of every built file. The built files are committed: lilOS
 * installs them as they are, without building anything.
 *
 *   npm run build
 */
import { build } from 'vite';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { appConfig } from '../vite.config.js';

const APPS = [
  { id: 'files', entry: 'FilesApp.js' },
  { id: 'editor', entry: 'EditorApp.js' },
  { id: 'settings', entry: 'SettingsApp.js' },
  { id: 'appstore', entry: 'AppStoreApp.js' },
  { id: 'photo', entry: 'PhotoApp.js' },
  { id: 'terminal', entry: 'TerminalApp.js' },
];

const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
const sha256 = data => `sha256-${createHash('sha256').update(data).digest('base64')}`;

for (const { id, entry } of APPS.filter(a => !process.argv[2] || process.argv.slice(2).includes(a.id))) {
  await build({ configFile: false, ...appConfig(id, entry) });
  const pkg = join('apps', id);
  const files = {};
  for (const file of walk(join(pkg, 'dist')).sort()) files[relative(pkg, file).split(sep).join('/')] = sha256(readFileSync(file));
  const styles = readdirSync(join(pkg, 'dist')).filter(f => f.endsWith('.css')).map(f => `dist/${f}`);
  const template = JSON.parse(readFileSync(join('src', id, 'app.json'), 'utf8'));
  const manifest = {
    ...template,
    entry: 'dist/index.js',
    ...(styles.length && { styles }),
    files,
  };
  writeFileSync(join(pkg, 'lilos.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`${id} ${manifest.version}: ${Object.keys(files).length} file`);
}
