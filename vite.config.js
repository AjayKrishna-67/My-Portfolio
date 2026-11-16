import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Let the dev server answer through an ngrok tunnel. The leading dot covers
    // every ngrok-free.app address, so a new tunnel URL needs no change here.
    // Dev server only; the production build is unaffected.
    allowedHosts: ['.ngrok-free.app'],
  },
})
