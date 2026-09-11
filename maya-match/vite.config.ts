import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    port: 3001,
    host: '0.0.0.0',
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    // Inline imported images (e.g. the hero photo) as base64 so they survive
    // the single-file artifact bundling step, which only inlines the built
    // CSS/JS and has no access to separately emitted asset files.
    assetsInlineLimit: 300000,
  },
});
