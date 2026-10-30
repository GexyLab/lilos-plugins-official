import { h, fs, fileType, session, settings } from '@lilos/sdk';
import { describeWorkspace } from '@lilos/system';

/** Labels shared by the list, the information panel and the preview. */

export const typeLabel = n => (n.type === 'folder' ? 'Cartella' : n.type === 'app' ? 'App' : fileType(n.name).label);
export const folderName = n => (n.id === fs.root ? 'Home' : n.name);
export const locationLabel = n => (n.parent === fs.root ? 'Home' : fs.path(n.parent));

/** Where a trashed item goes back when restored: the folder it left, or Home if that is gone. */
export function originLabel(n) {
  const from = n.trashed.from;
  return fs.exists(from) && from !== fs.root ? fs.path(from) : 'Home';
}

/** Whose a node is: the workspace that made it, or shared (system folders). */
export function ownerLabel(n) {
  const ws = describeWorkspace(n.workspace);
  if (!ws) return n.workspace ? 'Sconosciuto' : 'Condiviso';
  return ws.removed ? `${ws.name} (eliminato)` : ws.name;
}

export function ownerNode(n) {
  const ws = describeWorkspace(n.workspace);
  const dot = h('span', { class: 'ws-owner-dot', 'aria-hidden': 'true' });
  if (ws) dot.style.background = ws.color;   // validated hex color (workspaces/store.js)
  return h('span', { class: ['ws-owner', !ws && 'shared', ws?.removed && 'removed'].filter(Boolean).join(' '), title: `Workspace: ${ownerLabel(n)}` },
    dot, h('span', {}, ownerLabel(n)));
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let v = bytes, u = -1;
  do { v /= 1024; u++; } while (v >= 1024 && u < units.length - 1);
  return `${v.toLocaleString(session.locale, { maximumFractionDigits: 1 })} ${units[u]}`;
}

export const countLabel = n => (n === 0 ? 'Vuota' : n === 1 ? '1 elemento' : `${n.toLocaleString(session.locale)} elementi`);

export function sizeLabel(n) {
  if (n.type === 'folder') return countLabel(n.trashed ? n.inside : fs.children(n.id).length);
  return n.type === 'file' ? formatBytes(n.size ?? 0) : '—';
}

/** Status bar of the trash: how long it keeps what it holds. */
export function retentionLabel() {
  const days = settings.get('trashRetention');
  if (days <= 0) return 'Gli elementi restano finché non li elimini';
  return `Eliminati definitivamente dopo ${days === 1 ? '1 giorno' : `${days} giorni`}`;
}

export const dateLabel = t => new Date(t).toLocaleString(session.locale, { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
