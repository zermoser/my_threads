import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/my_threads/',
  server: {
    open: true,
    port: 3002
  }
});
