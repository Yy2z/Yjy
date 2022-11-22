<template>
 <div>chshi</div>
 <p>123</p>
</template>
<script setup>
import * as api from "../api/index";
import { onMounted } from "vue";

onMounted(async () => {
    let result = await api.getHomepage();
    console.log(result);
})

// let name = "hh"
// let age = "12"

// sayhello(()=> {
// console.log('我叫${name},我${age}岁了')
// }) 

// sayhello()
</script>

<style lang="less" scoped>
</style>
