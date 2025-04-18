<script setup>
import menubar from "../MenuBar.vue";
import leftBar from "../tea/LeftBar.vue";
import Main from "../tea/Main.vue";
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
