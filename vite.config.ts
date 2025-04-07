import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: true,
    allowedHosts: ['.'], // This will allow all hosts in development
    proxy: {
      '/api/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/userService/, ''),
        secure: false,
      },
    },
    hmr: {
      clientPort: 443, // Add this if you're using HTTPS
      host: 'www.solveitsl.site',
    },
  },
  preview: {
    host: true,
    port: 5000,
    allowedHosts: ['.'], // This will allow all hosts in preview mode
  },
});