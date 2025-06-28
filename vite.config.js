import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const manifestIcons = [
  {
    src: 'pwa-192.png',
    sizes: '192x192',
    type: 'image/png',
  },
  {
    src: 'pwa-512.png',
    sizes: '512x512',
    type: 'image/png',
  }
]

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'Macro Tracker PWA',
        short_name: 'MacroTracker',
        description: 'AI-powered macro and calorie tracking app',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: manifestIcons,
      }
    })
  ],
})

