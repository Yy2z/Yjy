<template>
    <div class="common-layout">
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main><router-view /></el-main>
        <!-- <el-footer><Footer></Footer></el-footer> -->
      </el-container>
    </div>
  </template>
<script setup>

// import Footer from "../components/footer.vue"
import Header from "../components/header.vue"

</script>

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
}
</style>
