import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    proxy: {
      "/api/portfolio": {
        target: `https://delukesoft.pl/api/portfolio/`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/portfolio/, ""),
      },
      "/api/auth": {
        target: `https://delukesoft.pl/api/auth/`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, ""),
      },
      "/resources": {
        target: `https://delukesoft.pl/resources/`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/resources/, ""),
      },
    },
  },
  plugins: [react()],
})
