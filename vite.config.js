import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        weather: resolve(__dirname, 'weather/index.html'),
        note: resolve(__dirname, 'note/index.html'),
        stock: resolve(__dirname, 'stock/index.html'),
      },
    },
    outDir: 'dist',
  },
})
