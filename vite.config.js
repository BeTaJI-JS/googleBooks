import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: resolve(__dirname, './src/assets/'),
      components: resolve(__dirname, './src/components/'),
      consts: resolve(__dirname, './src/consts/'),
      pages: resolve(__dirname, './src/pages/'),
      store: resolve(__dirname, './src/store/'),
      styles: resolve(__dirname, './src/styles/'),
      ui: resolve(__dirname, './src/ui/'),
      helpers: resolve(__dirname, './src/helpers/'),
      hooks: resolve(__dirname, './src/hooks/'),
    },
    extensions: ['.scss', '.js', '.jsx', '.ts', '.tsx'],
  },
});
