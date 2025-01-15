import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'node:path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),

		// Had to disable this because of the CORS error
		csrf: {
			checkOrigin: false,
		},

		alias: {
			'$components': resolve('./src/components'),
			'$components/*': resolve('./src/components/*'),

			'$libs': resolve('./src/libs'),
			'$libs/*': resolve('./src/libs/*'),

			'$stores': resolve('./src/stores'),
			'$stores/*': resolve('./src/stores/*'),

			'$types': resolve('./src/types'),
			'$types/*': resolve('./src/types/*'),

			'$static': resolve('./static'),
			'$static/*': resolve('./static/*'),
		},
	},
};

export default config;
