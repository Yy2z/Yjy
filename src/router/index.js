import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
    // {
    //     path: '/',
    //     redirect: '/home'
    // },
    {
        path: '/',
        component: () => import('../views/home.vue'),
    }
]
// 哈希路由
const router = createRouter({
    // 路由模式
    history: createWebHashHistory(),
    routes,
})

export default router;