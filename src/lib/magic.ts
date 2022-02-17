import { Magic } from '@magic-sdk/admin';

if (!globalThis.MAGIC_ADMIN_KEY) {
  throw new Error('you forgot the admin key');
}

export const magic = new Magic(globalThis.MAGIC_ADMIN_KEY);
