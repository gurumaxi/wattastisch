import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    // needed for service worker
    define: {
        'process.env.NODE_ENV': '"production"',
    },
});
