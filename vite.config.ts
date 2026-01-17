import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'https://adsp-api.livbee.co.kr',
        changeOrigin: true,
        secure: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.error('[Proxy Error]', err)
          })
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('[Proxy Request]', req.method, req.url, '→', proxyReq.path)
          })
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('[Proxy Response]', req.url, 'Status:', proxyRes.statusCode)
          })
        },
      },
    },
  },
})
