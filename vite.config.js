import { resolve } from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

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
      },
    },
    outDir: 'dist',
  },
})
