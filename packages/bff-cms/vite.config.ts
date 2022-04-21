import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
      {
        find: 'config',
        replacement: resolve(__dirname, 'config'),
      },
      {
        find: 'utils',
        replacement: resolve(__dirname, 'utils'),
      },
    ],
  },
  plugins: [react()],
});
