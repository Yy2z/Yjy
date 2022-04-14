import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible/index.js'
import router from './router/index'
createApp(App).use(router).mount('#app')