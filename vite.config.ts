import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/key.pem')), // Path to your SSL key
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/cert.pem')), // Path to your SSL certificate
    },
    allowedHosts: ['solveitsl.site', 'www.solveitsl.site'], // Explicitly allow these hosts
    proxy: {
      '/api/': {
        target: 'https://localhost:3000', // Use HTTPS if your backend also uses SSL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/userService/, ''),
        secure: false, // Set to false if using self-signed certificates
      },
    },
    hmr: {
      clientPort: 443, // Ensure HMR works over HTTPS
      host: 'www.solveitsl.site',
    },
  },
  preview: {
    host: true,
    port: 5000,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/key.pem')), // Path to your SSL key
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/cert.pem')), // Path to your SSL certificate
    },
    allowedHosts: ['solveitsl.site', 'www.solveitsl.site'], // Explicitly allow these hosts
  },
})