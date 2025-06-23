import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
   server: {
    proxy: {
       "/api": "http://localhost:4000"
    },
  },
    plugins: [
    tailwindcss(),
    react()
  ],
  base: '/',
   build: {
    chunkSizeWarningLimit: 1000, // 🚨 Warning limit increased from 500 KB to 1000 KB
  },
})
