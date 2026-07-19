import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// '/portfolio/' for GitHub Pages (repo name = portfolio)
// '/'           for Vercel / custom domain — just change this one line
const base = process.env.VITE_BASE_PATH ?? '/portfolio/'

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
