import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
// vite.config.js
export default defineConfig({
  build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    },
  },
  server: {
    proxy: {
      '/upload': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false,
      },
    }
  },
  plugins: [react()],
})