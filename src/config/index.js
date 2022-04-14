import vue from './vue'
export default [
    {
        path: new URL('../assets/home/javascript.jpg', import.meta.url).href,//首页图片地址
        id: 0,
        //markdown文件配置
        children: [

        ]
    },
    {
        path: new URL('../assets/home/ts.jpg', import.meta.url).href,
    },
    {
        path: new URL('../assets/home/vue.jpg', import.meta.url).href,
        id: 2,
        children: vue
    },
    {
        path: new URL('../assets/home/react.jpg', import.meta.url).href,
        id: 3
    },
    {
        path: new URL('../assets/home/nodejs.jpg', import.meta.url).href,
        id: 4
    },
    {
        path: new URL('../assets/home/webpack.jpg', import.meta.url).href,
        id: 5
    }
]