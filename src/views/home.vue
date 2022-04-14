<template>
    <div class="k-0ffxar">
            <router-view></router-view>
        <Footer class="Footer" />
    </div>
</template>
<script setup>
import Nav from './components/nav.vue'
import Footer from './components/footer.vue'
import { html } from '../docs/test.md'
console.log(html)

</script>
<style lang="less">
.k-0ffxar{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    .Footer{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>