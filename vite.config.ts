import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@modules': path.resolve(__dirname, 'src/modules'),
			'@context': path.resolve(__dirname, 'src/App-context.tsx'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['@vitest/web-worker'],
	},
});
