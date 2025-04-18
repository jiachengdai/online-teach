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
  background-color: f2f5f9;
  display: flex;
  flex-wrap: wrap; /* 允许子元素换行 */
  padding: 20px;
  box-sizing: border-box; /* 包括内边距和边框 */
}

.col {
  background-color: #f5f7fb;
  width: 320px; /* 固定宽度 */
  height: 250px;
  margin: 10px 16px; /* 垂直方向的间距 */
  box-sizing: border-box; /* 考虑内边距和边框 */
}
</style>
