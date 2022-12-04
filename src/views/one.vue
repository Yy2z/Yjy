<template>
  <!-- 卡片 -->
  <el-row>
    <el-col
      v-for="(o, index) in 4"
      :key="o"
      :span="4"
      :offset="index > 0 ? 1 : 0"
    >
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <img
          src="https://photo.yujunyan.xyz/头像.png"
          class="image"
        />
        <div style="padding: 14px">
          <span>Yummy hamburger</span>
          <div class="bottom">
            <time class="time">{{ currentDate }}</time>
            <el-button text class="button">Operating</el-button>
          </div>
        </div>
      </el-card>

      
    </el-col>
  </el-row>


</template>

<script setup>
import { ref } from 'vue'

const currentDate = ref(new Date())
</script>

<style lang="scss" scoped>


/* 卡片 */
.el-row {
  margin: 40px
};
.el-col {
  margin: auto;
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>