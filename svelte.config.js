import adapter from '@sveltejs/adapter-cloudflare-workers';
import preprocess from 'svelte-preprocess';

// create a file called .key.js in the root
// that exports your magic.link admin key
import { key } from './.key.js';
globalThis.MAGIC_ADMIN_KEY = key;

import { webcrypto } from 'node:crypto';
globalThis.crypto = webcrypto;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter()
	}
};

export default config;
