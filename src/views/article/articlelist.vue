<template>
    <Nav :isBac="articlelist[index].path" />
    <div class="k-d20wl8">
        <div class="k-w7hgdo">
            <div class="k-w7hgdo-listcon" v-for="item in nowlist">
            <div class="k-w7hgdo-list" @click="toarticle(item.article)">
                <div class="k-w7hgdo-auth"><span>{{item.author}}</span><span style="margin: 0 8px;">|</span><span>{{item.time}}</span></div>
                <div class="k-w7hgdo-til">{{item.title}}</div>
                <div
                    class="k-w7hgdo-content"
                >{{item.summary}}</div>
            </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import articlelist from '@/config'
import Nav from '@/components/nav.vue'
import { ref } from 'vue';
import { useRoute,useRouter } from 'vue-router'
let Route = useRoute()
let Router = useRouter()
const { index } = Route.query
const nowlist = ref(articlelist[index].children)
const toarticle = (article)=>{
    Router.push({name:'articledetail',params:{article}})
    
}

</script>
<style lang="less">
.k-d20wl8 {
    background: #fff;
    max-width: 1000PX;
    max-height: 600PX;
    margin: 20PX auto;
    width: 100%
    
}
.k-w7hgdo {
    min-height: 200px;
    padding: 30px 0;
    margin-bottom: 20px;
     .k-w7hgdo-list:nth-of-type(1){
         border-top: 1px solid #e5e6eb;
     }
    
    .k-w7hgdo-listcon:hover{
            background: #fafafa;
        }
    .k-w7hgdo-list {
        width: 90%;
        box-sizing: border-box;
        margin: 0 auto;
        padding: 20PX;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e6eb;
        cursor: pointer;
        .k-w7hgdo-auth{
            font-size: 14PX;
            color: #4e5969;
            margin-bottom: 6PX;
        }
        .k-w7hgdo-til {
            font-weight: bolder;
            font-size: 18PX;
            margin-bottom: 6PX;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
        .k-w7hgdo-content {
            color: #4e5969;
            font-size: 14PX;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}
</style>