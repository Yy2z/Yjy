<template>
            <router-view></router-view>
        <Footer class="Footer" />
</template>
<script setup>
// import Nav from './components/nav.vue'
import Footer from '@/components/footer.vue'
import { html } from '../docs/test.md'
console.log(html)

</script>
<style lang="less" scoped>
    .Footer{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>