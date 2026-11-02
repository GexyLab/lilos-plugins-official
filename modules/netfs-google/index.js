import { bind } from './google.js';
import { drive } from './drive.js';
import { photos } from './photos.js';

/**
 * Google for the Rete folder: Google Drive (service 'netfs.gdrive', drive.js) and Google Photos
 * ('netfs.gphotos', photos.js), see the kernel's net/drivers.js. Both use the project each lilOS
 * installation makes on Google Cloud, set once in the module's settings, and the same sign-in
 * (google.js). It replaces the modules netfs-gdrive and netfs-gphotos (module.json `replaces`: the
 * kernel carries their settings over); the connections stay as they are.
 */
export { cleanRoot } from './drive.js';

export default {
  async init(ctx) {
    bind(ctx);
    ctx.provide('netfs.gdrive', drive);
    ctx.provide('netfs.gphotos', photos);
  },
};
