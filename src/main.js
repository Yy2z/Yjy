 import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Axios from 'axios';
import VueAxios from 'vue-axios'
import mysql from 'mysql'



const app = createApp(App)

app.mount('#app')
app.use(VueAxios,Axios);
app.use(ElementPlus);
app.use(mysql);
app.use(router)

// createApp(App).use(router).mount('#app')
// app.config.globalProperties.$http = Axios
// app.config.productionTip = false
// Vue.prototype.$http = axios;

// Vue.config.productionsip = false
