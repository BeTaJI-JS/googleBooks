import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: resolve(__dirname, './src/assets/'),
      components: resolve(__dirname, './src/components/'),
      pages: resolve(__dirname, './src/pages/'),
      store: resolve(__dirname, './src/store/'),
      styles: resolve(__dirname, './src/styles/'),
      helpers: resolve(__dirname, './src/helpers/'),
      hooks: resolve(__dirname, './src/hooks/'),
      context: resolve(__dirname, './src/context/'),
    },
    extensions: ['.scss', '.js', '.jsx', '.ts', '.tsx'],
  },
});
