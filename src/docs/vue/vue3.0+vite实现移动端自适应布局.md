# vue3.0+vite实现移动端自适应布局

## 1 安装postcss-pxtorem
```
npm i postcss-pxtorem -D
```

## 2 新建postcss.config.js配置文件
```
module.exports = {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8",
                "last 10 versions", // 所有主流浏览器最近10版本用
            ],
            grid: true,
        },
        'postcss-pxtorem': {
            rootValue: 37.5,//这里配置37.5是为了和iphone6的css像素1:1还原,750px的设计稿就要除以2 来写px单位
            propList: ['*'],
            unitPrecision: 5
        }
    }
}
```

## 安装amfe-flexible(将rem单位转为px)
```
npm i amfe-flexible -D
```
然后再main.ts中引入amfe-flexible
```
import 'amfe-flexible/index.js'
```

## 安装autoprefixer(前缀处理插件)
```
npm i autoprefixer
```

 最后启动项目就会发现px已经是自适应的单位,如果想用原来的px只需改成大写的PX单位即可