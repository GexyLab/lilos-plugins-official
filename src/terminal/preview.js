/**
 * The preview of a .term file for lilOS (the `filePreview` entry point, see lilOS's
 * apps/filePreview.js): Terminal's icon with the protocol under it, as a square image (WebP, PNG
 * where the browser cannot write it), and the address as the note. Thumbnails (desk, File Manager)
 * ask for small ones with `size`.
 */
import { parseTerm, termAddress } from './termFile.js';

const SIZE = 512;
const MIN_SIZE = 16;
const MAX_SIZE = 2048;
const TILE = '#2b3038';
const BADGES = {
  ssh: ['SSH', '#dff3ec', '#1d6f57'], telnet: ['TELNET', '#fdeccf', '#8a5a0f'],
  rlogin: ['RLOGIN', '#ece6fb', '#5b3fae'], supdup: ['SUPDUP', '#fbe3e6', '#a2283a'],
};

export function filePreview({ lilos }) {
  lilos.handle(async data => {
    if (typeof data?.file !== 'string') return null;
    let term;
    try { term = parseTerm(await lilos.files.read(data.file)); } catch { return null; }
    const size = Number.isFinite(data.size) ? Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.round(data.size))) : SIZE;
    return { image: await draw(term, size), note: termAddress(term) };
  });
}

async function draw(term, size) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const s = size / 100;
  // The tile: a flat square with the terminal's mark, as the app's icon
  ctx.fillStyle = term.protocol === 'local' ? '#3b4049' : TILE;
  ctx.fillRect(14 * s, 10 * s, 72 * s, 72 * s);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6 * s;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(32 * s, 34 * s);
  ctx.lineTo(44 * s, 46 * s);
  ctx.lineTo(32 * s, 58 * s);
  ctx.moveTo(50 * s, 58 * s);
  ctx.lineTo(66 * s, 58 * s);
  ctx.stroke();
  const badge = BADGES[term.protocol] ?? (term.protocol === 'local' ? null : [term.protocol.toUpperCase().slice(0, 8), '#e9ecf1', '#59606c']);
  if (badge) {
    const [text, bg, fg] = badge;
    ctx.font = `700 ${11 * s}px system-ui, "Segoe UI", sans-serif`;
    const w = ctx.measureText(text).width + 8 * s;
    const x = Math.min(96 * s - w, 86 * s - w / 2), y = 76 * s, hgt = 17 * s;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x - 1.5 * s, y - 1.5 * s, w + 3 * s, hgt + 3 * s);
    ctx.fillStyle = bg;
    ctx.fillRect(x, y, w, hgt);
    ctx.fillStyle = fg;
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + 4 * s, y + hgt / 2 + 0.5 * s);
  }
  const encode = type => new Promise(resolve => canvas.toBlob(resolve, type, 0.9));
  const webp = await encode('image/webp');
  return webp?.type === 'image/webp' ? webp : encode('image/png');
}
