<template>
<header/>
<div class="markdown-body" v-html="mdHtml"></div>
</template>
<script setup>
import header from '@/components/header.vue'
import { useRoute} from 'vue-router'
let Route = useRoute()
const mdHtml = Route.params.article
if(!mdHtml) window.history.go(-1)  //页面刷新直接后退一级 ps(vue3我没找到路由的back()的方法)
</script>
<style>
.markdown-body{
    background: #fff;
    padding: 20px;
    word-break: break-word;
    line-height: 1.75;
    font-weight: 400;
    font-size: 16PX;
    overflow-x: hidden;
    color: #333;
    width: 95%;
    max-width: 1200PX;
    margin: 20px auto;
    box-sizing: border-box;
}
.markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
    font-size: 20PX;
    margin: 20PX 0;
}
.markdown-body h1{
    font-size: 24PX;
}
.markdown-body ol, .markdown-body ul {
    padding-left: 28PX;
}
.markdown-body ul{
    margin-bottom: 20PX;
}
.markdown-body p {
    margin: 20PX 0;
}
.markdown-body pre{
    background: #F8F8F8;
    padding: 20PX;
    margin-bottom: 20PX;
    overflow-x: auto;
    
}
</style>