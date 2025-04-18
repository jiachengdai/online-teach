<template>
  <div class="mainBody">
    <div class="examContainer">
      <div style="width: 1050px; height: 45px">
        <h2 style="margin-left: 20px; font-family: '阿里妈妈数黑体'">课程考试</h2>
      </div>
      <div style="width: 1020px; height: 598px; overflow-y: auto; margin-left: 20px">
        <div
          class="testCard"
          v-for="test in testInfo"
          :key="test.paperId"
          @click="toTestPage(test)"
        >
          <svg
            t="1722246980562"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4291"
            width="40"
            height="40"
            style="margin-top: 10px; margin-left: 10px"
          >
            <path
              d="M600.436364 889.018182h-418.909091c-32.581818 0-55.854545-23.272727-55.854546-55.854546v-651.636363c0-32.581818 23.272727-55.854545 55.854546-55.854546h651.636363c32.581818 0 55.854545 23.272727 55.854546 55.854546v46.545454c0 18.618182 18.618182 37.236364 37.236363 37.236364s37.236364-18.618182 37.236364-37.236364v-46.545454c0-69.818182-60.509091-130.327273-130.327273-130.327273h-651.636363c-69.818182 0-130.327273 60.509091-130.327273 130.327273v651.636363c0 69.818182 60.509091 130.327273 130.327273 130.327273h418.909091c18.618182 0 37.236364-18.618182 37.236363-37.236364s-13.963636-37.236364-37.236363-37.236363z"
              p-id="4292"
              fill="#ffffff"
            ></path>
            <path
              d="M581.818182 516.654545c0-18.618182-18.618182-37.236364-37.236364-37.236363h-274.618182c-13.963636 0-18.618182 4.654545-23.272727 13.963636-4.654545 4.654545-13.963636 18.618182-13.963636 23.272727 0 18.618182 18.618182 37.236364 37.236363 37.236364h274.618182c18.618182 0 37.236364-13.963636 37.236364-37.236364zM972.8 442.181818c0-51.2-46.545455-102.4-97.745455-102.4h-65.163636c-51.2 0-107.054545 51.2-107.054545 102.4v390.981818c0 13.963636 9.309091 27.927273 23.272727 37.236364l74.472727 74.472727c13.963636 18.618182 27.927273 27.927273 46.545455 27.927273s37.236364-9.309091 46.545454-27.927273l65.163637-74.472727c9.309091-9.309091 9.309091-18.618182 9.309091-27.927273h4.654545v-400.290909z m-79.127273 386.327273l-60.509091 65.163636-65.163636-65.163636v-283.927273h125.672727v283.927273z m0-353.745455h-125.672727v-32.581818c0-13.963636 13.963636-27.927273 32.581818-27.927273h60.509091c18.618182 0 27.927273 18.618182 27.927273 27.927273v32.581818zM269.963636 674.909091c-18.618182 0-37.236364 18.618182-37.236363 37.236364s18.618182 37.236364 37.236363 37.236363h167.563637c18.618182 0 37.236364-18.618182 37.236363-37.236363s-18.618182-37.236364-37.236363-37.236364h-167.563637zM628.363636 288.581818h-358.4c-18.618182 0-37.236364 18.618182-37.236363 37.236364s18.618182 37.236364 37.236363 37.236363h358.4c18.618182 0 37.236364-18.618182 37.236364-37.236363s-18.618182-37.236364-37.236364-37.236364z"
              p-id="4293"
              fill="#ffffff"
            ></path>
          </svg>
          <div class="testCardRight">
            <div style="width: 700px">
              <div style="font-size: 17px">{{ test.paperTitle }}</div>
              <div style="font-size: 15px">考试时长：{{ test.duration }} min</div>
            </div>
            <div>
              <div style="font-size: 15px">截止时间：{{ test.endTime }}</div>
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
import { getScoreState } from "@/api/test";
import { useTestInfoStore } from "@/stores/test";
import { getExamInfo } from "@/api/exam";
import router from "@/router";
const userStore = useUserInfoStore();
const courseInfoStore = useCourseInfoStore();
const testInfoStore = useTestInfoStore();
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
const testInfo = ref([]);
const getCourseClassInfo = async () => {
  courseInfo.value = courseInfoStore.info;
};

const getTest = async () => {
  let result = await getExamInfo(courseInfo.value.classId);
  testInfo.value = result.data;
};
const toTestPage = async (test) => {
  testInfoStore.setInfo(test);
  console.log(test);
  router.push("/stu/testPage");
};
onMounted(() => {
  getCourseClassInfo();
  userInfo.value = userStore.info;
  getTest();
});
</script>

<style scoped>
.mainBody {
  overflow-y: auto;
  width: 1150px;
  height: 100%;
  background-color: #f2f5f9;
  display: flex;
  padding: 20px;
}
.testCard {
  cursor: pointer;
  border-radius: 10px;
  color: white;
  width: 96%;
  height: 60px;
  background-color: #5872ad;
  margin-top: 10px;
  display: flex;
}
.testCardRight {
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-top: 10px;
}
.examContainer {
  width: 1050px;
  height: 670px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  background-color: white;
  margin-top: 6px;
}
</style>
