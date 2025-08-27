import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    exclude: ['ham2k-polo-wasm']
  }
})