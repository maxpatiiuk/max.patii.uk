import type { LoadHookSync } from 'node:module';

// Ignore css imports to make such modules importable in Node.js
export const load: LoadHookSync = function load(url, context, nextLoad) {
  if (url.endsWith('.css')) {
    return {
      format: 'module',
      shortCircuit: true,
      source: 'export default "";',
    };
  }
  return nextLoad(url, context);
};
