import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
    {
        path: '/',
        name:'home',
        component: () => import('../layout/index.vue'),
        children:[
            {
                path: '/',
                name: 'home',
                component: () => import('../views/home.vue'),
            },
            {
                path: '/one',
                name: 'one',
                component: () => import('../views/one.vue'),
            },
            {
                path: '/photo',
                name: 'photo',
                component: () => import('../views/photo.vue'),
            },
            {
                path: '/three',
                name: 'three',
                component: () => import('../views/three.vue'),
            },
        ]
    },
    
]
// 哈希路由
const router = createRouter({
    // 路由模式
    history: createWebHashHistory(),
    routes,
})

export default router;