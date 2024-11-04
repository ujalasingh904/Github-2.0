import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy:{
      '/api':{
        target: 'https://github-2-0-dxyu-backend.vercel.app',
      }
    }
  }
})
