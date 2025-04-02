import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: true,
    proxy: {
      '/api/': {
        target: 'http://16.171.44.248:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/userService/, ''),
        secure: false, // Add this if the backend uses self-signed certificates
      },
    },
    allowedHosts: ['solveitsl.site'], // Add this line
  },
});