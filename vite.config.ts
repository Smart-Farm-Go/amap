import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  cacheDir: resolve(__dirname, '.cache'),
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'example/index.html'),
      },
    },
  },
});
