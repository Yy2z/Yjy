const e=`<h1>vue3.0+vite\u5B9E\u73B0\u79FB\u52A8\u7AEF\u81EA\u9002\u5E94\u5E03\u5C40</h1>
<h2>1 \u5B89\u88C5postcss-pxtorem</h2>
<pre><code>npm i postcss-pxtorem -D
</code></pre>
<h2>2 \u65B0\u5EFApostcss.config.js\u914D\u7F6E\u6587\u4EF6</h2>
<pre><code>module.exports = {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: [
                &quot;Android 4.1&quot;,
                &quot;iOS 7.1&quot;,
                &quot;Chrome &gt; 31&quot;,
                &quot;ff &gt; 31&quot;,
                &quot;ie &gt;= 8&quot;,
                &quot;last 10 versions&quot;, // \u6240\u6709\u4E3B\u6D41\u6D4F\u89C8\u5668\u6700\u8FD110\u7248\u672C\u7528
            ],
            grid: true,
        },
        'postcss-pxtorem': {
            rootValue: 37.5,//\u8FD9\u91CC\u914D\u7F6E37.5\u662F\u4E3A\u4E86\u548Ciphone6\u7684css\u50CF\u7D201:1\u8FD8\u539F,750px\u7684\u8BBE\u8BA1\u7A3F\u5C31\u8981\u9664\u4EE52 \u6765\u5199px\u5355\u4F4D
            propList: ['*'],
            unitPrecision: 5
        }
    }
}
</code></pre>
<h2>\u5B89\u88C5amfe-flexible(\u5C06rem\u5355\u4F4D\u8F6C\u4E3Apx)</h2>
<pre><code>npm i amfe-flexible -D
</code></pre>
<p>\u7136\u540E\u518Dmain.ts\u4E2D\u5F15\u5165amfe-flexible</p>
<pre><code>import 'amfe-flexible/index.js'
</code></pre>
<h2>\u5B89\u88C5autoprefixer(\u524D\u7F00\u5904\u7406\u63D2\u4EF6)</h2>
<pre><code>npm i autoprefixer
</code></pre>
<p>\u6700\u540E\u542F\u52A8\u9879\u76EE\u5C31\u4F1A\u53D1\u73B0px\u5DF2\u7ECF\u662F\u81EA\u9002\u5E94\u7684\u5355\u4F4D,\u5982\u679C\u60F3\u7528\u539F\u6765\u7684px\u53EA\u9700\u6539\u6210\u5927\u5199\u7684PX\u5355\u4F4D\u5373\u53EF</p>
`;var t=[{title:"vue3.0+vite\u5B9E\u73B0\u79FB\u52A8\u7AEF\u81EA\u9002\u5E94\u5E03\u5C40",article:e,summary:"vue3.0+vite\u5B9E\u73B0\u79FB\u52A8\u7AEF\u81EA\u9002\u5E94\u5E03\u5C40,\u5B89\u88C5postcss-pxtorem",author:"zhangdisheng",time:"2022/3/11"},{title:"\u4ECE0\u642D\u5EFA\u4E00\u4E2Avite+vue3\u9879\u76EE",article:e,summary:"## \u521D\u59CB\u5316vite\u4F7F\u7528npm:npm init vite@latest  * \u4F7F\u7528Yarn: yarn create vite* \u4F7F\u7528 PNPM:  pnpm create vite",author:"zhangdisheng",time:"2022/3/11"}],n=[{path:new URL("./assets/javascript.16ab2c6e.jpg",self.location).href,id:0,children:[]},{path:new URL("./assets/ts.cc37bb94.jpg",self.location).href},{path:new URL("./assets/vue.083ae07f.jpg",self.location).href,id:2,children:t},{path:new URL("./assets/react.a27f11b4.jpg",self.location).href,id:3},{path:new URL("./assets/nodejs.7bc3074b.jpg",self.location).href,id:4},{path:new URL("./assets/webpack.365558f7.jpg",self.location).href,id:5}];export{n as a};
