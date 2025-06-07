import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    proxy: {
      "/api/portfolio": {
        target: `http://192.168.0.123:9090`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/portfolio/, ""),
      },
      "/api/auth": {
        target: `http://192.168.0.123:8080/`,
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
