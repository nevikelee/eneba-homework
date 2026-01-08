import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows external hosts
  },
  preview: {
    host: true, // allows network requests in preview
    allowedHosts: ['frontend', 'localhost', '127.0.0.1'],
  },
});
