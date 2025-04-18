<template>
  <div class="stuMainBody">
    <div style="width: 1000px; margin-top: 7px">
      <div class="outContainer">
        <div style="font-family: '阿里妈妈数黑体'; font-size: 24px; margin: 12px">
          我的课程
        </div>
        <div class="innerContainer">
          <div
            style="height: 220px; margin-bottom: 10px; cursor: pointer"
            v-for="col in cols"
            :key="col.classId"
            @click="toCourse(col)"
          >
            <div class="StuMainCol">
              <img :src="col.logo" alt="课程 logo" class="course-logo" />
            </div>
            <div class="stuMainColBottom">
              <p style="line-height: 0px; font-size: 15px; font-weight: bold">
                {{ col.courseName }}
              </p>
              <p style="line-height: 10px; font-size: 12px">
                上课时间：{{ col.courseTime }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAllClassAndCourse } from "@/api/course";
import { useCourseInfoStore } from "@/stores/course";
import router from "@/router";
const cols = ref([]);
const courseInfoStore = useCourseInfoStore();
const fetchData = async () => {
  try {
    const response = await getAllClassAndCourse();
    cols.value = response.data; // 假设 API 返回的数据是一个包含列信息的数组
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
const toCourse = (col) => {
  const singleCourseInfo = col;
  courseInfoStore.setInfo(singleCourseInfo);
  router.push("/stu/course/info");
};
onMounted(() => {
  fetchData();
});
</script>

<style>
.stuMainBody {
  width: 1000px;
  height: 100%;
  background-color: #f2f5f9;
  display: flex;
  flex-wrap: wrap; /* 允许子元素换行 */
  padding: 20px;
  box-sizing: border-box; /* 包括内边距和边框 */
}
.outContainer {
  width: 1000px;
  height: 650px;
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  overflow-y: auto;

  padding: 20px;
}
.innerContainer {
  max-height: 640px;
  width: 1000px;
  background-color: white;
  display: flex;
  flex-wrap: wrap; /* 允许子元素换行 */
}
.course-logo {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.StuMainCol {
  background: rgb(236, 236, 236);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  width: 280px; /* 固定宽度 */
  height: 160px;
  margin: 10px 16px; /* 垂直方向的间距 */
  box-sizing: border-box; /* 考虑内边距和边框 */
  border-radius: 10px;
}
.stuMainColBottom {
  width: 250px;
  margin: 5px 16px;
}
</style>
