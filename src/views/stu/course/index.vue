<script setup>
import menubar from "../../MenuBar.vue";
import leftBar from "../course/LeftBar.vue";
import Main from "../course/Main.vue";
</script>

<template>
  <div>
    <menubar></menubar>
    <div class="main">
      <leftBar></leftBar>
      <router-view></router-view>
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
