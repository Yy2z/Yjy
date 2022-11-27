<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      router
    >
      <el-menu-item index="/one">LOGO</el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="/one">首页</el-menu-item>
      <el-sub-menu index="2">
        <template #title>更多</template>
        <el-menu-item index="/one">item one</el-menu-item>
        <el-menu-item index="/two">item two</el-menu-item>
        <el-sub-menu index="/three">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const activeIndex = ref('1')
  const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
  }
  </script>
  
  <style>
  .flex-grow {
    flex-grow: 1;
  }
  </style>
  