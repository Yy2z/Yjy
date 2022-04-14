import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
    {
        path: '/',
        component: () => import('@/views/home.vue'),
        children: [
            {
                path: '/',
                component: () => import('@/views/article/home.vue'),
            },
            {
                name:'articlelist',
                path: '/articlelist',
                component: () => import('@/views/article/articlelist.vue'),
            },
            {
                name:'articledetail',
                path: '/articledetail',
                component: () => import('@/views/article/articledetail.vue'),
            }
        ]

    }
]
export default createRouter({
    routes,
    history: createWebHashHistory(),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})