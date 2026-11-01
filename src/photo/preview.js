/**
 * The preview of an image for lilOS (the `filePreview` entry point, see lilOS's
 * apps/filePreview.js): the image itself, made smaller, as a WebP (PNG where the browser cannot
 * write WebP). lilOS asks it for the File Manager's preview panel and for the thumbnails of the
 * icons; `size` is the longest side it wants, in pixels.
 */
import { OPENS, FORMATS, extOf, decode, resample, encode, supported } from './image.js';

/** Longest side when the caller does not say, and the limits of what it may ask. */
const SIZE = 1024;
const MIN_SIZE = 16;
const MAX_SIZE = 2048;
const MIME = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', bmp: 'image/bmp', avif: 'image/avif', ico: 'image/x-icon', svg: 'image/svg+xml' };

export function filePreview({ lilos }) {
  lilos.handle(async data => {
    if (typeof data?.file !== 'string') return null;
    const info = await lilos.files.info(data.file);
    const ext = extOf(info.name);
    if (!OPENS.includes(ext) || !info.size) return null;
    const bytes = await lilos.files.read(data.file, { bytes: true });
    let image;
    try {
      // The type by the extension: an SVG without it is not drawn as an image
      image = await decode(new Blob([bytes], { type: MIME[ext] }));
    } catch {
      return null;   // not an image the browser can read: the File Manager shows its own preview
    }
    const limit = Number.isFinite(data.size) ? Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.round(data.size))) : SIZE;
    const scale = Math.min(1, limit / Math.max(image.width, image.height));
    const small = scale < 1 ? resample(image, image.width * scale, image.height * scale) : image;
    const webp = FORMATS.find(f => f.id === 'webp');
    return { image: await encode(small, supported(webp) ? webp : FORMATS[0], 0.85) };
  });
}
