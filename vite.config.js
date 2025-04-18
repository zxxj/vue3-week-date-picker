import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import path from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin(), // ✅ 插入样式到 JS
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/package/index.js'),
      name: 'WeekDatePicker',
      fileName: (format) => `week-date-picker.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
