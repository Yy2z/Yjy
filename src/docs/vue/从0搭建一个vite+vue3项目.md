
# 从0搭建一个vite+vue3项目

## 初始化vite
* 使用npm:  
npm init vite@latest  
* 使用Yarn:  
yarn create vite  
* 使用 PNPM:  
pnpm create vite  

这里采用npm这种方式： 

1, 输入项目名称:     

![1644386944(1).jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5165da226ee465ca7bde9af6d1d385a~tplv-k3u1fbpfcp-watermark.image?)

2, 选择一个模板vue  

![1644387116(1).jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab10b07754a74323bf938e515676fc9e~tplv-k3u1fbpfcp-watermark.image?)

3, 根据需求选择是否使用TS,这里选择vue

![1644387139(1).jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64ed08e4b1f64f838c269827adcd806f~tplv-k3u1fbpfcp-watermark.image?)

## 启动项目
* 进入我们的项目 cd 项目名称
* 执行 npm install
* 启动项目: npm run dev  
项目启动默认地址为:http://localhost:3000/; 端口可以在后面vite.config.js中配置

## vite.config.js配置
这里只对@指向src目录,端口,打包路径以及代理等进行简单配置

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src') // 设置 `@` 指向 `src` 目录
    }
  },
  base: './', // 设置打包路径
  server: {
    port: 3000, // 设置服务启动端口号
    open: false, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    proxy: {
      '/api': {
        target: 'http://xxxxxxx:xxxx/',//遇到/api的接口会将路径指向target
        changeOrigin: true,
        secure: false,
        // 这里是追加链接,比如接口里包含了 /api,就需要这样配置.
        //rewrite: (path) => path.replace('/api/', '/'),
      }
    }
  }
})

```

## vue-router
在vue3中安装vue-router直接
```
npm install vue-router@4
```

* 我们在src下创建router文件夹和下面的index.js首先引入router
```
import { createRouter,createWebHashHistory} from "vue-router";

```
* 在src下新建Home.vue和Login.vue方便调试 

这里采用script-setup语法糖形式,vue3.2以上即可使用

Home.vue:
```
<template>
    <div>{{ msg }}</div>
    <button @click="quit">跳转login</button>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router'
const msg = ref("home")
let router = useRouter();
function quit() {
    router.push('/login')
}
</script>



```

Login.vue:
```
<template>
    <div>{{ msg }}</div>
</template>
<script setup>
import { ref } from "vue"
const msg = ref("login")
</script>


```
* 路由中动态引入Home和Login, index.js如下:  
这里采用hash模式
```
import { createRouter,createWebHashHistory} from "vue-router";
const routes = [
    {
        path:'/login',
        component:()=>import('@/Login.vue')
    },
    {
        path:'/home',
        component:()=>import('@/Home.vue')
    }
]
export default  createRouter({
    history: createWebHashHistory(),
    routes: routes,
  })
  
```

* 在 main.js 中挂载路由配置
```
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
createApp(App).use(router).mount('#app')
```

* 修改App.vue
```
<template>
  <router-view />
</template>
```

* 启动项目  
浏览器输入:http://localhost:3000/#/home; 即可进入home页面; 点击按钮则会跳转到login页面

## axios封装
* 安装axios  
axios 的安装与vue2中的一样,直接安装即可:
```
npm install axios
```

* 在src下新建http/index.js用于请求处理:
```
import axios from 'axios'
const showStatus = (status) => {
    let message = ''
    switch (status) {
        case 400:
            message = '请求错误(400)'
            break
        case 401:
            message = '未授权，请重新登录(401)'
            break
        case 403:
            message = '拒绝访问(403)'
            break
        case 404:
            message = '请求出错(404)'
            break
        case 408:
            message = '请求超时(408)'
            break
        case 500:
            message = '服务器错误(500)'
            break
        case 501:
            message = '服务未实现(501)'
            break
        case 502:
            message = '网络错误(502)'
            break
        case 503:
            message = '服务不可用(503)'
            break
        case 504:
            message = '网络超时(504)'
            break
        case 505:
            message = 'HTTP版本不受支持(505)'
            break
        default:
            message = `连接出错(${status})!`
    }
    return `${message}，请检查网络或联系管理员！`
}

const service = axios.create({
    // 联调
    method: 'get',
    baseURL: 'http://localhost:3001',//根据项目实际情况填写地址
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    timeout: 30000
})
// 请求拦截器
service.interceptors.request.use((config) => {
   
    return config
}, (error) => {
    // 错误抛到业务代码
   
    return Promise.resolve(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
    const status = response.status
  
    if (status < 200 || status >= 300) {
        // 处理http错误，抛到业务代码
        return showStatus(status)
        
    }

    
    return response.data
}, (error) => {
    // 错误根据需要抛到业务代码
   
    return Promise.reject(error)
})
const $http = (options) => {
    if (!options.data) { options.data = {} }
    if (options.method === 'get') {
        options.params = options.data
    }
    return service(options)
}
export default $http
```
* home页面直接使用:  
```
<template><div>
    <div>{{ msg }}</div>
    <button @click="quit">跳转login</button>
    <br>
    <button @click="postrequest">post请求</button>
    <br>
    <button @click="getrequest">get请求</button>
    </div>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router'
import $http from "@/http"
const msg = ref("home")
let router = useRouter();
function quit() {
    router.push('/login')
}
//post请求
async function postrequest() {
    const data = await $http({
        url: '/login',
        method: 'post',
        data:{
            username:'xx',
            password:'xx'
        }
    })
    console.log(data)
}
//get请求
async function getrequest() {
    const data = await $http({
        url: '/login',
        method: 'get',
        data:{
            username:'xx',
            password:'xx'
        }
    })
    console.log(data)
}
</script>

```
一般封装会将接口请求统一放入一个文件中便于管理,具体可以参考 [axios封装](https://gitee.com/geeksdidi/kancli)


<b>这样一个vue3+vite的项目框架基础基本搭建完成;vite还有很多配置,可以参考 [vite官网](https://vitejs.cn/guide/why.html) 进行学习</b>


     
