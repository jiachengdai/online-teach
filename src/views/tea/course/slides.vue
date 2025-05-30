<template>
  <div class="mainBody">
    <div class="slideContainer">
      <div style="width: 1150px; height: 45px">
        <h2 style="margin-left: 20px; font-family: '阿里妈妈数黑体'">课件浏览</h2>
      </div>
      <div style="width: 1150px; height: 598px; overflow-y: auto; margin-left: 20px">
       <div class="uploadCard">
          <el-button class="card-button" @click="handleUpload()">点此上传新课件</el-button>
        </div>
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
 
    <el-dialog v-model="uploadSlidesVisible" title="上传章节课件" width="500">
      <el-form :model="newSlide">
        <el-form-item label="课程编号" :label-width="formLabelWidth">
          <el-input
            v-model="newSlide.courseId"
            autocomplete="off"
            placeholder="6尾纯数字编码"
            disabled
          />
        </el-form-item>
        <el-form-item label="章节序号" :label-width="formLabelWidth">
          <el-input v-model="newSlide.sectionId" autocomplete="off" placeholder="例：2" />
        </el-form-item>
        <el-form-item label="章节名称" :label-width="formLabelWidth">
          <el-input v-model="newSlide.title" autocomplete="off" />
        </el-form-item>
      </el-form>

      <p style="width: 100%">在这里上传教学课件🤩</p>

      <el-upload
        ref="upload"
        class="upload-demo"
        action="/api/upload"
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        :auto-upload="false"
      >
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
        <el-button
          class="ml-3"
          type="success"
          @click="submitUpload"
          style="margin-left: 10px"
        >
          上传到服务器
        </el-button>
        <template #tip>
          <div class="el-upload__tip text-red">只能上传一份PPT文件哦~</div>
        </template>
      </el-upload>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="uploadSlidesVisible = false">取消</el-button>
          <el-button type="primary" @click="uploadSlides()"> 确认上传 </el-button>
        </div>
      </template>
    </el-dialog>
 
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCourseInfoStore } from "@/stores/course";
import { ElButton, ElMessage } from "element-plus";
import { useUserInfoStore } from "@/stores/userinfo";
import { getSlides } from "@/api/slides";
const uploadSlidesVisible = ref(false);
const formLabelWidth = ref('120px');

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
const newSlide = ref({
  courseId: "1",
  title: "",
  url: "",
  sectionId: "",
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

onMounted(async () => {
  await getCourseClassInfo();
  await getAllSlides();
  userInfo.value = userStore.info;
  console.log('课程ID:', courseInfo.value.courseId);
  console.log('获取到的课件:', slides.value);
});
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import { uploadSlidesService } from "@/api/slides";
const upload = ref<UploadInstance>();
const handleExceed = (files: UploadRawFile[]) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const handleSuccess = (response: any, file: any) => {
  console.log("File uploaded successfully:", response);
  if (response && response.data) {
    console.log("File URL:", response.data);
    newSlide.value.url = response.data;
  }
};

const submitUpload = () => {
  upload.value!.submit();
};
const uploadSlides = async () => {
  let result = await uploadSlidesService(newSlide.value);
  ElMessage.success("上传成功");
  uploadSlidesVisible.value = false;
  getAllSlides();
  newSlide.value.title = "";
  newSlide.value.url = "";
  newSlide.value.sectionId = "";
};

const handleUpload = () => {
  uploadSlidesVisible.value = true;

  newSlide.value.courseId = courseInfo.value.courseId;
};
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

