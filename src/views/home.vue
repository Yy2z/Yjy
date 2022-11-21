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

</script>

<style lang="less" scoped>
</style>
