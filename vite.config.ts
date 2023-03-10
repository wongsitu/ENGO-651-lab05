import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint(), react()],
  define: {
    'process.env': {},
  },
  base: '/ENGO-651-lab05/',
});
