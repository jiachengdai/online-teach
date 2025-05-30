<template>
  <div class="teaCourseLeftBody">
    <div class="teaCourseSelfInfo">
      <div
        style="
          font-size: 28px;
          text-align: center;
          font-family: '阿里妈妈数黑体';
          color: white;
          margin-top: 27px;
        "
      >
        课程信息
      </div>

      <div class="courseAvatar">
        <img
          :src="courseInfo.logo"
          style="width: 100%; height: 100%; border-radius: 10px"
        />
      </div>
      <!-- <el-card class="txtInfo">
        <p style="line-height: 10px">课程名称: {{ courseInfo.courseName }}</p>
        <p style="line-height: 10px">开设学期: {{ courseInfo.term }}</p>
      </el-card> -->

      <div class="menuContainer"  >
        <router-link to="/tea/course/info" class="menu" active-class="active-menu"
          >课程信息</router-link
        >
        <router-link to="/tea/course/slides" class="menu" active-class="active-menu"
          >教学课件</router-link
        >
        <router-link to="/tea/course/students" class="menu" active-class="active-menu"
          >学生管理</router-link
        >
        <router-link to="/tea/course/test" class="menu" active-class="active-menu"
          >题库管理</router-link
        >
        <router-link to="/tea/course/exam" class="menu" active-class="active-menu"
          >测验考试</router-link
        >
        <router-link to="/tea/course/chapters" class="menu" active-class="active-menu"
          >章节管理</router-link
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
const summaryScore = ref();
const courseInfoStore = useCourseInfoStore();
const courseInfo = ref({
  classId: null,
  courseId: "",
  courseName: "",
  courseTime: "",
  credit: null,
  logo: "",
  place: "",
  stuNum: null,
  syllabus: "",
  syllabusUrl: "",
  teaId: "",
  term: "",
  teacherName: "",
});
const getTeaInfo = async () => {
  let result = await getTeacherInfo(courseInfo.value.teaId);
  console.log(result); //这里开
  courseInfo.value.teacherName = result.data.teaName;
  console.log(courseInfo.value.teacherName);
};
const getCurSummaryScore = async () => {
  let result = await getSummaryScore(courseInfo.value.classId, userStore.info.stuId);
  summaryScore.value = result.data;
};
onMounted(() => {
  courseInfo.value = courseInfoStore.info;
  getTeaInfo();
  console.log(courseInfo);
  getCurSummaryScore();
});
</script>

<style scoped>
.teaCourseLeftBody {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
  height: 100%;
  background-color: #f2f5f9;
}
.teaCourseSelfInfo {
  margin-top: 15px;
  position: relative;
  width: 88%;
  height: 670px;
  border-radius: 10px;
  background-color: #16243d;
}
.courseAvatar {
  position: absolute;
  top: 23%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  display: flex;
  justify-content: center;
  height: 140px;
  border-radius: 10px;
}
.txtInfo {
  font-family: "华文中宋";
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  margin-top: 10px;
  height: 120px;
  background-color: white;
}
.courseAvatar-img {
  width: 75%;
  height: 100%;
}
.menuContainer {
  margin-top: 220px;
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
</style>
