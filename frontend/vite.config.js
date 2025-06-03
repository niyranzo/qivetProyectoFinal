import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173, 
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: 'qivetproyectofinal-frontend-production.up.railway.app',
        changeOrigin: true,
        secure: false,
        credentials: 'include'
      }
    }
  },
})