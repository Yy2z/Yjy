/* empty css                                                                     */import{_ as c}from"./index.d1033348.js";import{o as t,e as o,f,p as u,g as h,h as s,u as v,i,F as d,j as m,k as x}from"./vendor.e736d7a5.js";import{a as g}from"./index.8bcfeaf1.js";var q="./assets/Yy2z\u767D.dbb11148.png";const b={},$=f('<div class="container" data-v-5c2f4c41><div class="logo" data-v-5c2f4c41><a href="" data-v-5c2f4c41><img src="'+q+'" alt="" data-v-5c2f4c41></a></div><ul data-v-5c2f4c41><li data-v-5c2f4c41><a href="#" data-v-5c2f4c41>\u9996\u9875</a></li><li data-v-5c2f4c41><a href="#" data-v-5c2f4c41>\u8BE6\u60C5</a></li><li data-v-5c2f4c41><a href="#" data-v-5c2f4c41>\u66F4\u591A</a></li></ul><div class="loginbox" data-v-5c2f4c41><a href="https://www.pexels.com/zh-cn/" class="btn" data-v-5c2f4c41>\u8FDB\u5165</a></div></div>',1),k=[$];function y(e,a){return t(),o("header",null,k)}var I=c(b,[["render",y],["__scopeId","data-v-5c2f4c41"]]);const w={},p=e=>(u("data-v-66039476"),e=e(),h(),e),B={class:"website-footer"},z=p(()=>s("p",null,"\xA92020 - 2022 By \u7FBD\u8499Y",-1)),S=p(()=>s("a",{href:"https://beian.miit.gov.cn/",target:"_blank"}," \u8700ICP\u59072020034730\u53F7-1 ",-1)),C=[z,S];function V(e,a){return t(),o("div",B,C)}var j=c(w,[["render",V],["__scopeId","data-v-66039476"]]);const F=`<h1>\u6211\u662F\u6807\u9898</h1>
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
`;const L={class:"k-1dg3ze"},N={class:"k-1dg3ze-imageList"},P=["onClick"],D=["src"],R={setup(e){let a=v();const _=n=>{a.push(`/articlelist?index=${n}`)};return console.log(F),(n,Y)=>(t(),o(d,null,[i(I),s("div",L,[s("div",N,[(t(!0),o(d,null,m(x(g),(r,l)=>(t(),o("div",{class:"k-1dg3ze-imageBox",onClick:A=>_(l),key:r.id},[s("img",{src:r.path},null,8,D)],8,P))),128))])]),i(j)],64))}};var G=c(R,[["__scopeId","data-v-a3924a22"]]);export{G as default};
