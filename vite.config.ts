import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Baking-converter/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
