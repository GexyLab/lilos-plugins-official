/**
 * Checks the translations of apps (src/<id>/locales.json) against their code and manifest:
 *   errors    keys used with t('…') that English lacks; texts of app.json without their '@' key
 *             in a language; languages without every key of English
 *   warnings  keys of English that no t('…') uses (keys built at run time look unused too)
 *
 *   node scripts/check-locales.mjs [id…]     every app with a locales.json by default
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => (e.isDirectory() ? (e.name === 'public' ? [] : walk(join(dir, e.name))) : [join(dir, e.name)]));

/** The '@' keys the texts of a manifest need (see lilOS's SDK i18n.js, localizeManifest). */
function manifestKeys(m) {
  const keys = ['@name'];
  if (m.description) keys.push('@description');
  for (const c of m.contributes?.commands ?? []) keys.push(`@commands.${c.id}.label`);
  for (const w of m.contributes?.widgets ?? []) keys.push(`@widgets.${w.id}.name`);
  for (const a of m.contributes?.actions ?? []) keys.push(`@actions.${a.id}.label`);
  for (const menu of m.contributes?.menus ?? []) keys.push(`@menus.${menu.id}.label`);
  if (m.contributes?.badge) keys.push('@badge.label');
  for (const [name, ep] of Object.entries(m.entrypoints ?? {})) {
    if (ep.label) keys.push(`@entrypoints.${name}.label`);
    for (const [p, def] of Object.entries(ep.params ?? {})) {
      const base = `@entrypoints.${name}.params.${p}`;
      if (def.label) keys.push(`${base}.label`);
      if (def.description) keys.push(`${base}.description`);
      for (const o of def.options ?? []) keys.push(`${base}.options.${o.value}.label`);
    }
  }
  return keys;
}

let failed = false;
const ids = process.argv.slice(2).length ? process.argv.slice(2) : readdirSync('src').filter(id => existsSync(join('src', id, 'locales.json')));
for (const id of ids) {
  const table = JSON.parse(readFileSync(join('src', id, 'locales.json'), 'utf8'));
  const en = table.en?.strings ?? {};
  const errors = [], used = new Set();
  for (const file of walk(join('src', id)).filter(f => f.endsWith('.js'))) {
    for (const m of readFileSync(file, 'utf8').matchAll(/\bt\(\s*(['"`])([\w.:-]+)\1/g)) {
      used.add(m[2]);
      if (!Object.hasOwn(en, m[2])) errors.push(`${file}: "${m[2]}" non è in en`);
    }
  }
  const manifest = JSON.parse(readFileSync(join('src', id, 'app.json'), 'utf8'));
  for (const [lang, entry] of Object.entries(table)) {
    if (entry.extends) continue;
    for (const key of manifestKeys(manifest)) if (!Object.hasOwn(entry.strings ?? {}, key)) errors.push(`${lang}: manca ${key} (testo del manifesto)`);
    if (lang !== 'en') for (const key of Object.keys(en)) if (!Object.hasOwn(entry.strings ?? {}, key)) errors.push(`${lang}: manca ${key}`);
  }
  const unused = Object.keys(en).filter(k => !k.startsWith('@') && !used.has(k));
  console.log(`${id}: ${Object.keys(en).length} chiavi, ${errors.length} errori${unused.length ? `, non usate (o costruite al volo): ${unused.join(', ')}` : ''}`);
  for (const e of errors) console.log(`  ${e}`);
  if (errors.length) failed = true;
}
process.exit(failed ? 1 : 0);
