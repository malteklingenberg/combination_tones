import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
     		base: process.argv.includes('dev') ? '' : '/combination_tones'
	   	}
	},
	vite: {
		ssr: {
			noExternal: ['svelte-fa']
		}
	}
};

export default config;
