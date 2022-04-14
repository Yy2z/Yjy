import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
const mdPlugin = require('vite-plugin-markdown')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), mdPlugin.plugin({
    mode: ['html']
  })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src') // 设置 `@` 指向 `src` 目录
    }
  },
  server: {
    host: '0.0.0.0'
  },
  base: './', // 设置打包路径
})
