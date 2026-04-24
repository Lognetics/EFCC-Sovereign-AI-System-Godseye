import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages deployment the site is served at /<repo>/.
// Set VITE_BASE at build time (the Pages workflow does this automatically).
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor':  ['react', 'react-dom'],
          'motion':         ['framer-motion'],
          'three':          ['three', '@react-three/fiber', '@react-three/drei'],
          'icons':          ['lucide-react']
        }
      }
    }
  }
})
