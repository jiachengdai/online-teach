<template>
  <div class="leftBody">
    <div class="selfInfo">
      <div style="margin-top: 70px">
        <router-link to="/admin/course" class="menu" active-class="active-menu"
          >课程信息</router-link
        >
        <router-link to="/admin/student" class="menu" active-class="active-menu"
          >学生管理</router-link
        >
        <router-link to="/admin/tea" class="menu" active-class="active-menu"
          >教师信息</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useUserInfoStore } from "@/stores/userinfo";
import { ref } from "vue";
import { useCourseInfoStore } from "@/stores/course";
import { getTeacherInfo } from "@/api/teacher";
import { getSummaryScore } from "@/api/course";
import router from "@/router";
const userStore = useUserInfoStore();

onMounted(() => {});
</script>

<style scoped>
.leftBody {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 100%;
}
.menu {
  display: block;
  margin: 0;
  line-height: 50px;
  text-align: center;
  height: 50px;
  border-top: 1px solid #16243d;
  border-bottom: 1px solid #16243d;
  color: white;
  text-decoration: none;
}
.menu:hover,
.active-menu {
  background-color: white;
  color: #16243d;
}
.selfInfo {
  position: relative;
  margin-top: 10px;
  width: 85%;
  height: 94%;
  background-color: #16243d;
  border-radius: 10px;
}
.courseAvatar {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  display: flex;
  justify-content: center;
  height: 180px;
  background-color: yellow;
}
.txtInfo {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  margin-top: 10px;
  height: 120px;
  background-color: yellow;
}
.courseAvatar-img {
  width: 75%;
  height: 100%;
}
</style>
