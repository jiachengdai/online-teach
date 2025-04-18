<template>
  <div class="mainBody">
    <div class="slideContainer">
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
        </div>
        <div class="stuContainer">
          <el-table :data="studentList" style="width: 100%" max-height="250">
            <el-table-column fixed prop="stuId" label="学号" width="120" />
            <el-table-column prop="accId" label="账号ID" width="120" />

            <el-table-column prop="stuName" label="姓名" width="120" />
            <el-table-column prop="sex" label="性别" width="120" />

            <el-table-column prop="type" label="学制" width="120" />

            <el-table-column prop="grade" label="年级" width="120" />
            <el-table-column prop="major" label="专业" width="120" />
            <el-table-column prop="adminClass" label="班级" width="120" />
            <el-table-column fixed="right" label="操作" min-width="120">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click.prevent="deleteStu(scope.row.stuId, scope.row.accId)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
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

import { adminGetStuService, adminDelStuService } from "@/api/admin";
const searchId = ref("");

const userStore = useUserInfoStore();
const courseInfoStore = useCourseInfoStore();
const userInfo = ref({});

const studentList = ref([]); // 初始化 slides 为响应式变量
const originalStudentList = ref([]);

const adminGetStu = async () => {
  let result = await adminGetStuService();
  studentList.value = result.data;
  originalStudentList.value = result.data;
};

const deleteStu = async (stuId, accId) => {
  let result = await adminDelStuService(stuId, accId);
  ElMessage.success("删除成功");
  adminGetStu();
};

onMounted(() => {
  userInfo.value = userStore.info;
  adminGetStu();
});

const searchStu = async () => {
  if (searchId.value == "") {
    adminGetStu();
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
.slideContainer {
  width: 1050px;
  height: 670px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  background-color: white;
  margin-top: 6px;
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
