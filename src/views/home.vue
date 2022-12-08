<template>
  <el-row>
    <el-col :span="6"><div>111</div></el-col>
    <el-col :span="6"><div>111</div></el-col>
    <el-col :span="6"><div>111</div></el-col>
    <el-col :span="6"><div>111</div></el-col>
  </el-row>
  <el-row>
    <el-col :span="6"><div>111</div></el-col>
    <el-col :span="6"><div>111</div></el-col>
    <el-col :span="6"><div>111</div></el-col>
    <el-col :span="6"><div>111</div></el-col>
    <button labs-button>Button</button>
  </el-row>
</template>

<script setup>

// import Footer from "../components/footer.vue"
// import Header from "../components/header.vue"
import {watch} from 'vue'
// "use strict";
const [button] = document.querySelectorAll("[labs-button]");
button.watch("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const { style } = button;
    const right = event.offsetX > rect.width / 2;
    const top = event.offsetY <= rect.height / 2;
    style.removeProperty("--tr");
    style.removeProperty("--br");
    style.removeProperty("--tl");
    style.removeProperty("--bl");
    if (right) {
        button.classList.add("right");
    }
    else {
        button.classList.remove("right");
    }
    if (top && right) {
        style.setProperty("--tr", "1");
    }
    else if (!top && right) {
        style.setProperty("--br", "1");
    }
    else if (!top && !right) {
        style.setProperty("--bl", "1");
    }
    else if (top && !right) {
        style.setProperty("--tl", "1");
    }
    style.setProperty("--x", `${event.offsetX}px`);
    style.setProperty("--y", `${event.offsetY}px`);
});
button.addEventListener("mouseleave", () => {
    const { style } = button;
    style.removeProperty("--tr");
    style.removeProperty("--br");
    style.removeProperty("--tl");
    style.removeProperty("--bl");
});

</script>

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
}

.el-row {
  height: 280px;
 
}
.el-col {
  width: 80px;
}

button {
  overflow: hidden;
  background-color: transparent;
  border: 1px solid transparent;
  box-shadow: -1px -1px 0 rgba(255, 255, 255, var(--tl, 0.2)),
    1px 1px 0 rgba(255, 255, 255, var(--br, 0.2)),
    1px -1px 0 rgba(255, 255, 255, var(--tr, 0.2)),
    -1px 1px 0 rgba(255, 255, 255, var(--bl, 0.2));
  border-radius: var(--size-4);
  padding: var(--size-4);
  min-width: var(--size-10);
  color: var(--color-on-surface);
  letter-spacing: 0.03125rem;
  transition: box-shadow 1s ease, opacity 0.3s ease;
  //  opacity: 0.6;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    transition: opacity 1s ease;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    filter: blur(2px);
    bottom: 0;
    background: radial-gradient(
        circle,
        hsla(264deg, 74%, 67%, 0.8) 0%,
        hsla(264deg, 74%, 8%, 0.6) 25%,
        transparent 100%
      )
      no-repeat;
    transition: all 0.2s linear;
    background-size: 240% 200%;
    background-position: calc(80% + var(--x)) calc(100% + var(--y));
    z-index: -1;
  }

  &.right {
    &:before {
      filter: blur(2px) hue-rotate(-90deg);
    }
  }

  &:hover {
    opacity: 1;

    &:before {
      opacity: 0.8;
    }
  }
}

body {
  display: grid;
  place-items: center;
  background: linear-gradient(black, var(--color-primary-variant)) no-repeat;
  height: 100vh;
}

:root {
  --color-primary: hsl(264deg 44% 48%);
  --color-on-surface: white;
  --color-primary-variant: #120046;
  --color-surface-emphasis-4: rgba(255, 255, 255, 0.8);
  --color-surface-emphasis-2: rgba(255, 255, 255, 0.2);
  --size-10: 10rem;
  --size-4: 1rem;
  --size-3: 0.75rem;
  --size-2: 0.5rem;
}


</style>
