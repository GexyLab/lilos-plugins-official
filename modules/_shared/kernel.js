import { netError } from './errors.js';

/**
 * What the drivers take from the kernel since lilOS 1.21.0: without it they stop with a clear
 * message instead of working around it (an older kernel has the module's update waiting).
 */
const OLD_KERNEL = 'Questo modulo richiede lilOS ≥ 1.21.0: aggiorna lilOS';

/**
 * ctx.lookup of connect(), shares() and open(): dns.lookup's signature, resolving only to the
 * addresses the kernel's NetGuard allows. Every connection a driver opens resolves through it, so
 * it goes to an address checked a moment ago (no DNS rebinding between the kernel's check and the
 * connection).
 */
export function needLookup(ctx) {
  if (typeof ctx?.lookup !== 'function') throw netError('unsupported', OLD_KERNEL);
  return ctx.lookup;
}

/**
 * ctx.paths: { cleanPath, joinPath, parentOf, baseName, isSafeName, cleanName } of the kernel's
 * net/drivers.js, from the first of `ctxs` that has it (the module's ctx or connect()'s).
 */
export function needPaths(...ctxs) {
  const paths = ctxs.find(c => c?.paths && typeof c.paths.baseName === 'function')?.paths;
  if (!paths) throw netError('unsupported', OLD_KERNEL);
  return paths;
}
