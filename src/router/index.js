import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
    // {
    //     path: '/',
    //     redirect: '/home'
    // },
    {
        path: '/',
        component: () => import('../views/home.vue'),
        children: [
            {
                name:'articlelist',
                path: '/articlelist',
                component: () => import('@/views/article/articlelist.vue'),
            },
            {
                name:'articledetail',
                path: '/articledetail',
                component: () => import('@/views/article/articledetail.vue'),
            },
            {
                name:'photo',
                path: '/photo',
                component: () => import('../views/photo/index.vue'),
            },
        ]

    }
]
// 哈希路由
const router = createRouter({
    // 路由模式
    history: createWebHashHistory(),
    routes,
})

export default router;