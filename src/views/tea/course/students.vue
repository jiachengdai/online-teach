<template>
  <div class="mainBody">
    <div class="TeaCourseStudentContainer">
      <div style="width: 1050px; height: 45px">
        <h2 style="margin-left: 20px; font-family: '阿里妈妈数黑体'">学生管理</h2>
      </div>
      <div style="width: 1000px; height: 598px; overflow-y: auto; margin-left: 20px">
        <div class="uploadCard">
          <div style="width: 300px">
            <div class="search">
              <div class="search-box">
                <div class="search-field">
                  <input
                    placeholder="输入学号搜索🔍"
                    class="input"
                    type="text"
                    v-model="searchId"
                  />
                  <div class="search-box-icon">
                    <button class="btn-icon-content" @click="searchStu()">
                      <i class="search-icon">
                        <svg
                          xmlns="://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                            fill="#fff"
                          ></path>
                        </svg>
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top: 8px">
            <el-button @click="newSingleStuVisible = true">新增学生</el-button>
            <el-button @click="uploadExcelVisible = true">批量学生导入</el-button>
          </div>
        </div>
        <div class="stuContainer">
          <el-table :data="studentList" style="width: 100%" max-height="250">
            <el-table-column fixed prop="stuId" label="学号" width="120" />

            <el-table-column prop="stuName" label="姓名" width="120" />
            <el-table-column prop="sex" label="性别" width="120" />

            <el-table-column prop="type" label="学制" width="120" />

            <el-table-column prop="grade" label="年级" width="120" />
            <el-table-column prop="major" label="专业" width="120" />
            <el-table-column prop="adminClass" label="班级" width="120" />
            <el-table-column prop="score" label="总评成绩" width="120" />
            <el-table-column fixed="right" label="操作" min-width="120">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click.prevent="giveFinalScore(scope.row.stuId)"
                >
                  赋分
                </el-button>
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click.prevent="deleteStu(scope.row.stuId)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog v-model="newSingleStuVisible" title="添加学生" width="500">
      <el-form :model="newStu">
        <el-form-item label="班组编号" :label-width="formLabelWidth">
          <el-input v-model="newStu.classId" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="学生学号" :label-width="formLabelWidth">
          <el-input v-model="newStu.stuId" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="newSingleStuVisible = false">取消</el-button>
          <el-button type="primary" @click="newSingleStu()"> 确认添加 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="uploadExcelVisible" title="批量上传学生" width="500">
      <p style="width: 100%">在这里上传班级学生名单🤩</p>
      <p>班组编号[courseId]：{{ courseInfo.classId }}</p>
      <el-upload
        ref="upload"
        class="upload-demo"
        action="/api/class/batchImport"
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        :auto-upload="false"
      >
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>

        <template #tip>
          <div class="el-upload__tip text-red">只能上传一份学生名单哦~</div>
        </template>
      </el-upload>
      <a
        href="http://big-event0713.oss-cn-shanghai.aliyuncs.com/c7fdb07e-9d8b-4b1a-b0a0-70fe4f7fad28.xlsx"
        >学生名单模板下载</a
      >
      <p>【表头：stuId 学号、courseId 课程编号 、score 总评分数】</p>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="uploadExcelVisible = false">取消</el-button>
          <el-button class="ml-3" type="success" @click="submitUpload">
            上传到服务器
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="uploadSummaryScore" title="总评成绩上传" width="500">
      <el-form :model="summaryScoreForm">
        <el-form-item label="学生学号" :label-width="formLabelWidth">
          <el-input v-model="summaryScoreForm.stuId" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="班组编号" :label-width="formLabelWidth">
          <el-input v-model="summaryScoreForm.classId" autocomplete="off" disabled />
        </el-form-item>

        <el-form-item label="总评成绩" :label-width="formLabelWidth">
          <el-input
            v-model="summaryScoreForm.score"
            autocomplete="off"
            placeholder="例：2"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="uploadSummaryScore = false">取消</el-button>
          <el-button type="primary" @click="uploadScore()"> 确认上传 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCourseInfoStore } from "@/stores/course";
import { ElButton, ElMessage } from "element-plus";
import { useUserInfoStore } from "@/stores/userinfo";
import { getSlides } from "@/api/slides";
import { getAllStuService, getStuInfo } from "@/api/student";
import { uploadScoreService } from "@/api/course";
import { delStudentService } from "@/api/student";
import { newSingleStuService } from "@/api/student";
const newSingleStuVisible = ref(false);
const uploadExcelVisible = ref(false);
const searchId = ref("");
const summaryScoreForm = ref({
  stuId: "",
  classId: "",
  score: "",
});
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
const newStu = ref({
  stuId: "",
  classId: "",
});
const uploadSummaryScore = ref(false);
const studentList = ref([]); // 初始化 slides 为响应式变量
const originalStudentList = ref([]);
const getCourseClassInfo = async () => {
  courseInfo.value = courseInfoStore.info;
};

const uploadScore = async () => {
  let result = await uploadScoreService(summaryScoreForm.value);
  ElMessage.success("上传成功");
  uploadSummaryScore.value = false;
  summaryScoreForm.value.score = "";
  summaryScoreForm.value.stuId = "";
  summaryScoreForm.value.classId = "";
  getAllStudent();
};
const getAllStudent = async () => {
  let result = await getAllStuService(courseInfo.value.classId);
  studentList.value = result.data;
  originalStudentList.value = result.data;
};
const giveFinalScore = async (stuId) => {
  summaryScoreForm.value.classId = courseInfo.value.classId;
  summaryScoreForm.value.stuId = stuId;
  uploadSummaryScore.value = true;
};
const deleteStu = async (stuId) => {
  let classId = courseInfo.value.classId;
  let result = await delStudentService(stuId, classId);
  ElMessage.success("删除成功");
  getAllStudent();
};
const newSingleStu = async () => {
  try {
    let result = await newSingleStuService(newStu.value);
    ElMessage.success("添加成功");
    newSingleStuVisible.value = false;
    newStu.value.stuId = "";

    getAllStudent();
  } catch (error) {
    ElMessage.error("添加失败");
  }
};
onMounted(() => {
  userInfo.value = userStore.info;
  newStu.value.classId = courseInfoStore.info.classId;
  getCourseClassInfo();
  getAllStudent();
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
  try {
    upload.value!.submit();
    ElMessage.success("导入成功，稍后将更新名单！");
    uploadExcelVisible.value = false;
    //睡5s钟
    setTimeout(() => {
      getAllStudent();
    }, 5000);
  } catch (error) {
    ElMessage.error(error.message);
  }
};

const handleUpload = () => {
  uploadExcelVisible.value = true;

  newSlide.value.courseId = courseInfo.value.courseId;
};
const searchStu = async () => {
  if (searchId.value == "") {
    getAllStudent();
  }
  if (searchId.value != "") {
    studentList.value = originalStudentList.value.filter((student) =>
      student.stuId.includes(searchId.value)
    );
  }
};
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

.slidesCard {
  width: 95%;
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
.TeaCourseStudentContainer {
  width: 1050px;
  height: 670px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  background-color: white;
  margin-top: 6px;
}

.status-ind {
  width: 0.625em;
  height: 0.625em;
  background-color: #1677ff;
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
  color: #1677ff;
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
.uploadCard {
  display: flex;
  width: 100%;
  background-color: white;
  height: 48px;
}
.search {
  --input-line: #cccccc;
  --input-text-color: #808080;
  --input-text-hover-color: transparent;
  --input-border-color: #808080;
  --input-border-hover-color: #999999;
  --input-bg-color: #333333;
  --search-max-width: 250px;
  --search-min-width: 150px;
  --border-radius: 5px;
  --transition-cubic-bezier: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.search-box {
  max-width: var(--search-max-width);
  min-width: var(--search-min-width);
  height: 35px;
  border: 1px solid var(--input-border-color);
  border-radius: var(--border-radius);
  padding: 5px 15px;
  background: var(--input-bg-color);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  transition: var(--transition-cubic-bezier);
}

.search-box:hover {
  border-color: var(--input-border-hover-color);
}

/*Section input*/
.search-field {
  position: relative;
  width: 100%;
  height: 100%;
  left: -5px;
  border: 0;
}

.input {
  width: calc(100% - 29px);
  height: 100%;
  border: 0;
  border-color: transparent;
  font-size: 1rem;
  padding-right: 0px;
  color: var(--input-line);
  background: var(--input-bg-color);
  border-right: 2px solid var(--input-border-color);
  outline: none;
}

.input::-webkit-input-placeholder {
  color: var(--input-text-color);
}

.input::-moz-input-placeholder {
  color: var(--input-text-color);
}

.input::-ms-input-placeholder {
  color: var(--input-text-color);
}

.input:focus::-webkit-input-placeholder {
  color: var(--input-text-hover-color);
}

.input:focus::-moz-input-placeholder {
  color: var(--input-text-hover-color);
}

.input:focus::-ms-input-placeholder {
  color: var(--input-text-hover-color);
}

/*Search button*/
.search-box-icon {
  width: 52px;
  height: 35px;
  position: absolute;
  top: -6px;
  right: -21px;
  background: transparent;
  border-bottom-right-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  transition: var(--transition-cubic-bezier);
}

.search-box-icon:hover {
  background: var(--input-border-color);
}

.btn-icon-content {
  width: 52px;
  height: 35px;
  top: -6px;
  right: -21px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-bottom-right-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  transition: var(--transition-cubic-bezier);
  opacity: 0.4;
}

.btn-icon-content:hover {
  opacity: 0.8;
}

.search-icon {
  width: 21px;
  height: 21px;
  position: absolute;
  top: 7px;
  right: 15px;
}
</style>
