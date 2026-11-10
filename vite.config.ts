import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// In development the PHP backend (../rangoma_backend, `composer serve`) runs on :8000.
// Change the target here if you serve it elsewhere; in production the web server routes /api and /uploads to PHP.
const backend = 'http://127.0.0.1:8000'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': backend,
      '/uploads': backend,
    },
  },
})
