import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter(),
        // needed because github pages deploys the project to <author>.github.io/<repository>
        paths: {
            base: process.env.NODE_ENV === 'production' ? '/wattastisch' : '',
        },
        version: {
            name: process.env.npm_package_version,
        },
    },
};

export default config;
