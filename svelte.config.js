import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
			base: process.argv.includes('dev') ? '' : '/combination_tones'
		}
	},
	preprocess: vitePreprocess({ script: true }),
	vite: {
		ssr: {
			noExternal: ['svelte-fa']
		}
	}
};

export default config;
