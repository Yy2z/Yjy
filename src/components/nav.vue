<template>
    <div class="k-ap8tm9" :class="{ 'k-ap8tm9-bac': isBac }" :style="isBac?styleObject:''">
        <div class="k-ap8tm9-row">
            <p>WELECOME TO MY BLOG</p>
            <p>Zhang Disheng's Personal Website</p>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
let props = defineProps(['isBac'])
const isBac = ref(props.isBac)
const styleObject = reactive({
    background: `url(${props.isBac}) 50% 50% no-repeat`,
    backgroundSize:'cover',
})
</script>
<style lang="less">
.k-ap8tm9 {
    background: #fff;
    padding: 20px 120px;
    .k-ap8tm9-row {
        text-align: left;
        padding: 10px;
        p:nth-of-type(1) {
            font-size: 20PX;
            font-weight: bolder;
        }
        p:nth-of-type(2) {
            margin-top: 10px;
            font-size: 14PX;
        }
    }
}
.k-ap8tm9-bac {
   height: 300px;
   color: #fff;
	
}
</style>