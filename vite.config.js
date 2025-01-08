import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import raw from 'vite-plugin-raw'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), raw({ match: /\.md$/, })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  define: {
    "process.env": process.env,
    ENV_KEY: process.env.ENV_KEY,
  },
})
