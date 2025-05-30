<template>
  <div class="mainBody">
    <div class="slideContainer">
      <div style="width: 1150px; height: 45px">
        <h2 style="margin-left: 20px; font-family: '阿里妈妈数黑体'">课件浏览</h2>
      </div>
      <div style="width: 1150px; height: 598px; overflow-y: auto; margin-left: 20px">
        <div class="slidesCard" v-for="slide in slides" :key="slide.slidesId">
          <div class="slidescontainer">
            <div class="left">
              <div class="status-ind"></div>
            </div>
            <div class="right">
              <div class="text-wrap">
                <p class="text-content">
                  {{ slide.sectionId }}
                  <a class="text-link" href="#">{{ slide.title }}</a>
                </p>
              </div>
              <div class="button-wrap">
                <a class="primary-cta" :href="slide.url" target="_blank">下载课件</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCourseInfoStore } from "@/stores/course";
import { ElMessage } from "element-plus";
import { useUserInfoStore } from "@/stores/userinfo";
import { getSlides } from "@/api/slides";

const userStore = useUserInfoStore();
const courseInfoStore = useCourseInfoStore();
const userInfo = ref({});
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
const slides = ref([]); // 初始化 slides 为响应式变量

const getCourseClassInfo = async () => {
  courseInfo.value = courseInfoStore.info;
};

const getAllSlides = async () => {
  try {
    let result = await getSlides(courseInfo.value.courseId);
    // 假设返回的数据格式为 result.data
    slides.value = result.data; // 更新 slides 为获取到的幻灯片数据
  } catch (error) {
    console.error("获取幻灯片失败:", error);
    ElMessage.error("获取幻灯片失败");
  }
};

onMounted(() => {
  getCourseClassInfo();
  getAllSlides();
  userInfo.value = userStore.info;
});
</script>

<style>
.mainBody {
  width: 1250px;
  height: 100%;
  background-color: #f2f5f9;
  display: flex;
  padding: 20px;
}

.slidesCard {
  width: 98%;
  height: 100px;
  background-color: #f2f3f7;
  border-radius: 0.75em;
  transition: ease 0.2s;
  box-shadow: 1em 1em 1em #d8dae0b1, -0.75em -0.75em 1em #ffffff;
  border: 1.5px solid #f2f3f7;
  margin-bottom: 20px;
}

.slidesCard:hover {
  background-color: #d3ddf1;
  border: 1.5px solid #1677ff;
}

.slidescontainer {
  margin-top: 1.25em;
  margin-bottom: 1.375em;
  margin-left: 1.375em;
  margin-right: 2em;
  display: flex;
  flex-direction: row;
  gap: 0.75em;
}

.status-ind {
  width: 0.625em;
  height: 0.625em;
  background-color: #16243d;
  margin: 0.375em 0;
  border-radius: 0.5em;
}

.text-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  color: #333;
}

.time {
  font-size: 0.875em;
  color: #777;
  margin: 0px;
}

.text-link {
  font-weight: 500;
  text-decoration: none;
  color: black;
}

.button-wrap {
  display: flex;
  flex-direction: row;
  gap: 1em;
  align-items: center;
}

.secondary-cta {
  background-color: transparent;
  border: none;
  font-size: 15px;
  font-weight: 400;
  color: #666;
  cursor: pointer;
}

.primary-cta {
  font-size: 15px;
  background-color: transparent;
  font-weight: 600;
  color: #1e3051;
  border: none;
  border-radius: 1.5em;
  cursor: pointer;
  text-decoration: none; /* 去掉所有链接的下划线 */
}

button:hover {
  text-decoration: underline;
}

.right {
  display: flex;
  flex-direction: column;
  gap: 0.875em;
}
.text-content {
  margin: 0px;
}
.slideContainer {
  width: 1250px;
  height: 670px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  background-color: white;
  margin-top: 6px;
}
</style>
