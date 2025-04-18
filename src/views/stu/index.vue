<script setup>
import menubar from "../MenuBar.vue";
import leftBar from "../stu/LeftBar.vue";
import Main from "../stu/Main.vue";
</script>

<template>
  <div>
    <menubar></menubar>
    <div class="main">
      <leftBar></leftBar>
      <Main></Main>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 1440px;
  display: flex;
  height: 710px;
}
</style>
