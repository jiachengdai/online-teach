<template>
  <div class="stuMainBody">
    <div style="width: 1000px; margin-top: 7px">
      <div class="outContainer">
        <div style="width: 100%; height: 40px">
          <el-button @click="newCourseVisible = true">新建课程</el-button>
        </div>
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
              <img :src="col.logo" alt="上传课程 logo" class="course-logo" />
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

    <el-dialog v-model="newCourseVisible" title="新建课程" width="500">
      <el-form :model="newCourse">
        <el-form-item label="课程编号" :label-width="formLabelWidth">
          <el-input
            v-model="newCourse.courseId"
            autocomplete="off"
            placeholder="6尾纯数字编码"
          />
        </el-form-item>
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="newCourse.courseName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="课程学分" :label-width="formLabelWidth">
          <el-input v-model="newCourse.credit" autocomplete="off" placeholder="例：2" />
        </el-form-item>
        <el-form-item label="上课时间" :label-width="formLabelWidth">
          <el-input
            v-model="newCourse.courseTime"
            autocomplete="off"
            placeholder="周次+时间"
          />
        </el-form-item>
        <el-form-item label="上课地点" :label-width="formLabelWidth">
          <el-input v-model="newCourse.place" autocomplete="off" />
        </el-form-item>
        <el-form-item label="课程描述" :label-width="formLabelWidth">
          <el-input v-model="newCourse.syllabus" autocomplete="off" />
        </el-form-item>
        <el-form-item label="开设学期" :label-width="formLabelWidth">
          <el-select v-model="newCourse.term" placeholder="选择课程开设学期">
            <el-option label="2024s" value="2024s" />
            <el-option label="2024a" value="2024a" />
            <el-option label="2025s" value="2025s" />
            <el-option label="2025a" value="2025a" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="newCourseVisible = false">取消</el-button>
          <el-button type="primary" @click="createCourse()"> 创建班级 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="newClassVisible" title="新建班级" width="500">
      <el-form :model="newClass">
        <el-form-item label="课程编号" :label-width="formLabelWidth">
          <el-input v-model="newCourse.courseId" autocomplete="off" />
        </el-form-item>
        <el-form-item style="margin-left: 130px">
          <label for="file" class="custom-file-upload">
            <div class="icon">
              <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                    fill=""
                  ></path>
                </g>
              </svg>
            </div>
            <div class="text">
              <span>点击这里上传班级logo🙌</span>
            </div>
            <input id="file" type="file" @change="handleFileUpload" />
          </label>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="newClassVisible = false">取消</el-button>
          <el-button type="primary" @click="createClass()"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { newClassService, teacherGetClassCourseService } from "@/api/course";
import { useCourseInfoStore } from "@/stores/course";
import { reactive } from "vue";
import router from "@/router";
import { newCourseService } from "@/api/course";

import { ElMessage } from "element-plus";
import { uploadPic } from "@/api/user";
const newCourseVisible = ref(false);
const formLabelWidth = "80px";
const newClassVisible = ref(false);
const defaultLogo = ref("../../assets/cover.jpg"); // 默认头像路径

const newCourse = reactive({
  courseId: "",
  credit: null,
  courseTime: "",
  place: "",
  term: "",
  courseName: "",
  syllabus: "",
  syllabusUrl: "",
});
const newClass = reactive({
  stuNum: 0,
  courseId: "",
  logo: "",
});
const cols = ref([]);
const courseInfoStore = useCourseInfoStore();
const fetchData = async () => {
  try {
    const response = await teacherGetClassCourseService();
    cols.value = response.data; // 假设 API 返回的数据是一个包含列信息的数组
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
const createCourse = async () => {
  let result = await newCourseService(newCourse);
  ElMessage.success("新建课程成功");
  newCourseVisible.value = false;
  newClassVisible.value = true;
};
const createClass = async () => {
  newClass.courseId = newCourse.courseId;
  let result = await newClassService(newClass);
  ElMessage.success("新建班级成功");
  newClassVisible.value = false;
  fetchData();
};
const toCourse = (col) => {
  const singleCourseInfo = col;
  courseInfoStore.setInfo(singleCourseInfo);
  router.push("/tea/course/info");
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    let response = await uploadPic(formData);
    newClass.logo = response.data;
    ElMessage.success("上传班级logo成功");
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.custom-file-upload {
  display: inline-block;
  cursor: pointer;
  padding: 12px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

.custom-file-upload .icon {
  margin-bottom: 8px;
}

.custom-file-upload .text {
  font-size: 14px;
}

.custom-file-upload input[type="file"] {
  display: none;
}
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
