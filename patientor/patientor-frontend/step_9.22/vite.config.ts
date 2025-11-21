import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,          // explicitly set port
    open: true,           // opens browser automatically
  },
  resolve: {
    alias: {
      '@': '/src',        // optional: allows import from '@/components/...'
    },
  },
});
