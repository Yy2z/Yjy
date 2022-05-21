<template>

    <div class="k-1dg3ze">
        <div class="k-1dg3ze-imageList">
            <div class="k-1dg3ze-imageBox" v-for="(item,index) of classifylist" @click="tolist(index)" :key="item.id">
                <img :src="item.path" />
            </div>
        </div>
    </div>
</template>
<script setup>
import classifylist from '../../config';
import { useRouter } from 'vue-router'
let Router = useRouter()
const tolist = (index)=>{
    Router.push(`/articlelist?index=${index}`)
}
</script>
<style lang="less" scoped>
.k-1dg3ze {
    position: relative;
    top: 98px;
    width: 100%;
    height: 100%;
    left: 10%;
    // padding: 30px 80px;
    .k-1dg3ze-imageList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 1000px;
        .k-1dg3ze-imageBox{
            
            cursor: pointer;
        }
        @media screen and (max-width: 750px) {
            .k-1dg3ze-imageBox {
                width: 100%;
                height: 650px;
                margin: 15px 0;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
        @media screen and (max-width: 1200px) and (min-width:750px) {
            .k-1dg3ze-imageBox {
                width: 48%;
                height: 300px;
                margin: 15px 0;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
        @media screen and (min-width: 1200px) {
            .k-1dg3ze-imageBox {
                width: 32%;
                height: 200px;
                margin: 15px 0;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }
}
</style>