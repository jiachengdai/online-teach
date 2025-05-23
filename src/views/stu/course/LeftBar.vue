<template>
  <div class="stuCourseLeftBody">
    <div class="stuCourseSelfInfo">
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
      <el-card class="txtInfo">
        <p style="line-height: 10px">课程名称: {{ courseInfo.courseName }}</p>
        <p style="line-height: 10px">开设学期: {{ courseInfo.term }}</p>
        <p style="line-height: 10px">总评成绩: {{ summaryScore }}分</p>
      </el-card>

      <div class="menuContainer">
        <router-link to="/stu/course/info" class="menu" active-class="active-menu"
          >课程信息</router-link
        >
        <router-link to="/stu/course/slides" class="menu" active-class="active-menu"
          >教学课件</router-link
        >
        <router-link to="/stu/course/test" class="menu" active-class="active-menu"
          >作业测验</router-link
        >
        <router-link to="/stu/course/exam" class="menu" active-class="active-menu"
          >课程考试</router-link
        >
        <router-link to="/stu/course/chapters" class="menu" active-class="active-menu"
          >课程章节</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { useUserInfoStore } from "@/stores/userinfo";
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
  courseInfo.value.teacherName = result.data.teaName;
};

const getCurSummaryScore = async () => {
  let result = await getSummaryScore(courseInfo.value.classId, userStore.info.stuId);
  summaryScore.value = result.data;
};

onMounted(() => {
  courseInfo.value = courseInfoStore.info;
  getTeaInfo();
  getCurSummaryScore();
});
</script>

<style>
.stuCourseLeftBody {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 100%;
  background-color: #f2f5f9;
}
.stuCourseSelfInfo {
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
  margin-top: 360px;
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
