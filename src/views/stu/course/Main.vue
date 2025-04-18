<template>
  <div class="mainBody"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCourseInfoStore } from "@/stores/course";
const courseInfoStore = useCourseInfoStore();

onMounted(() => {});
</script>
<style>
.mainBody {
  overflow-y: auto;
  width: 1150px;
  height: 100%;
  background-color: #f2f5f9;
  display: flex;
  flex-wrap: wrap; /* 允许子元素换行 */
  padding: 20px;
  box-sizing: border-box; /* 包括内边距和边框 */
}

.col {
  background: rgb(236, 236, 236);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  width: 320px; /* 固定宽度 */
  height: 250px;
  margin: 10px 16px; /* 垂直方向的间距 */
}
</style>
