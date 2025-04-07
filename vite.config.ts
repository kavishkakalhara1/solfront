import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: true,
    allowedHosts: ['solveitsl.site', 'www.solveitsl.site','localhost', '127.0.0.1'],
    proxy: {
      '/api/': {
        // target: 'http://13.61.21.9:3000',
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/userService/, ''),
        secure: false,
      },
    },
    hmr: {
      host: 'www.solveitsl.site', // Optional: allow HMR over custom domain
    },
  },
  preview: {
    allowedHosts: ['solveitsl.site', 'www.solveitsl.site'], // Only for `vite preview`
  },
});
