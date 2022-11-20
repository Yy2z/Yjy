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
    host: '0.0.0.0',
    open: true,// 是否自动启动浏览器
    port: 3000,//端口号
    proxy: { // 本地开发环境通过代理实现跨域
      // 正则表达式写法
      '/api': {
        target: 'http://localhost:3000', // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }

  },
  base: './', // 设置打包路径
})
// module.exports = {
//   devServer: {
    
//   proxyTable: {
//   '/api': {
//   target: 'http://localhost:3000', //接口域名
//   changeOrigin: true, // 是否跨域
//   ws: true,                    //是否代理 websockets
//   secure: true，               //是否https接口
//   pathRewrite: {              //路径重置
//   '^/api': '',
//   },
//   },
//   },
//  },
//  };