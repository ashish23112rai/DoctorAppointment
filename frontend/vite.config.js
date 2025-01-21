import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Makes the server accessible on the local network
    port: 5173,        // Development server port
    proxy: {
      '/api': {  // Adjust this path based on your API endpoint
        target: 'http://localhost:4000',  // Backend API server URL
        changeOrigin: true,  // Handle virtual host-based backends
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove '/api' prefix if not needed by the backend
      },
    },
  },
})
