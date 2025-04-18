<template>
  <div class="mainBody">
    <div class="TeaTestStudentContainer">
      <div style="width: 1050px; height: 45px">
        <h2 style="margin-left: 20px; font-family: '阿里妈妈数黑体'">题库管理</h2>
      </div>
      <div style="width: 1000px; height: 598px; overflow-y: auto; margin-left: 20px">
        <div class="uploadCard">
          <div style="width: 300px">
            <div class="search">
              <div class="search-box">
                <div class="search-field">
                  <input
                    placeholder="输入题目关键字搜索🔍"
                    class="input"
                    type="text"
                    v-model="searchContent"
                  />
                  <div class="search-box-icon">
                    <button class="btn-icon-content" @click="searchExe()">
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

          <El-Button @click="newExerciseVisible = true" style="margin-top: 8px"
            >新增题目</El-Button
          >
        </div>
        <div class="stuContainer">
          <el-table :data="allExe" style="width: 100%" max-height="500">
            <el-table-column fixed prop="exeId" label="题目编号" width="80" />

            <el-table-column prop="type" label="类型" width="80" />

            <el-table-column prop="question" label="题目" width="220" />

            <el-table-column prop="ans" label="答案" width="120" />
            <el-table-column prop="ansText" label="解析" width="720" />

            <el-table-column fixed="right" label="操作" min-width="120">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click.prevent="updateExe(scope.row.exeId, scope.row.type)"
                >
                  修改
                </el-button>
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click.prevent="delExe(scope.row.exeId, scope.row.type)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog v-model="newExerciseVisible" title="新增题目" width="500">
      <el-form :model="newExe">
        <el-form-item label="题目编号" :label-width="formLabelWidth">
          <el-input v-model="newExe.exeId" autocomplete="off" placeholder="数字编码" />
        </el-form-item>
        <el-form-item label="题目类别" :label-width="formLabelWidth">
          <el-select v-model="newExe.type" placeholder="选择题目类别">
            <el-option label="选择题" value="选择题" />
            <el-option label="填空题" value="填空题" />
            <el-option label="判断题" value="判断题" />
            <el-option label="简答题" value="简答题" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="newExerciseVisible = false">取消</el-button>
          <el-button type="primary" @click="newExercise()"> 确认添加 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="chooseVisible" title="选择题新增" width="500">
      <el-form :model="chooseForm">
        <el-form-item label="题目编号" :label-width="formLabelWidth">
          <el-input v-model="chooseForm.exeId" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="chooseForm.question" autocomplete="off" />
        </el-form-item>

        <el-form-item label="选项A" :label-width="formLabelWidth">
          <el-input v-model="chooseForm.optionA" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选项B" :label-width="formLabelWidth">
          <el-input v-model="chooseForm.optionB" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选项C" :label-width="formLabelWidth">
          <el-input v-model="chooseForm.optionC" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选项D" :label-width="formLabelWidth">
          <el-input v-model="chooseForm.optionD" autocomplete="off" />
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth">
          <el-select v-model="chooseForm.ans" placeholder="选择正确答案">
            <el-option label="A" value="A" />
            <el-option label="B" value="B" />
            <el-option label="C" value="C" />
            <el-option label="D" value="D" />
          </el-select>
        </el-form-item>
        <el-form-item label="解析" :label-width="formLabelWidth">
          <el-input v-model="chooseForm.ansText" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="chooseVisible = false">取消</el-button>
          <el-button type="primary" @click="newChoose()"> 确认添加 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="blankVisible" title="填空题新增" width="500">
      <el-form :model="blankForm">
        <el-form-item label="题目编号" :label-width="formLabelWidth">
          <el-input v-model="blankForm.exeId" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="blankForm.question" autocomplete="off" />
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth">
          <el-input v-model="blankForm.ans" autocomplete="off" />
        </el-form-item>

        <el-form-item label="解析" :label-width="formLabelWidth">
          <el-input v-model="blankForm.ansText" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="blankVisible = false">取消</el-button>
          <el-button type="primary" @click="newBlank()"> 确认添加 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="judgeVisible" title="判断题新增" width="500">
      <el-form :model="judgeForm">
        <el-form-item label="题目编号" :label-width="formLabelWidth">
          <el-input v-model="judgeForm.exeId" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="judgeForm.question" autocomplete="off" />
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth">
          <el-select v-model="judgeForm.ans" placeholder="选择正确答案">
            <el-option label="√" value="1" />
            <el-option label="×" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="解析" :label-width="formLabelWidth">
          <el-input v-model="judgeForm.ansText" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="judgeVisible = false">取消</el-button>
          <el-button type="primary" @click="newJudge()"> 确认添加 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="shortAnsVisible" title="简答题新增" width="500">
      <el-form :model="shortAnsForm">
        <el-form-item label="题目编号" :label-width="formLabelWidth">
          <el-input v-model="shortAnsForm.exeId" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="shortAnsForm.question" autocomplete="off" />
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth">
          <textarea v-model="shortAnsForm.ans" autocomplete="off" />
        </el-form-item>

        <el-form-item label="解析" :label-width="formLabelWidth">
          <el-input v-model="shortAnsForm.ansText" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="shortAnsVisible = false">取消</el-button>
          <el-button type="primary" @click="newShortAns()"> 确认添加 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="updateChooseVisible" title="选择题修改" width="500">
      <el-form :model="updateChooseForm">
        <el-form-item label="题目编号" :label-width="formLabelWidth">
          <el-input v-model="updateChooseForm.chooseId" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="updateChooseForm.question" autocomplete="off" />
        </el-form-item>

        <el-form-item label="选项A" :label-width="formLabelWidth">
          <el-input v-model="updateChooseForm.optionA" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选项B" :label-width="formLabelWidth">
          <el-input v-model="updateChooseForm.optionB" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选项C" :label-width="formLabelWidth">
          <el-input v-model="updateChooseForm.optionC" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选项D" :label-width="formLabelWidth">
          <el-input v-model="updateChooseForm.optionD" autocomplete="off" />
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth">
          <el-select v-model="updateChooseForm.ans" placeholder="选择正确答案">
            <el-option label="A" value="A" />
            <el-option label="B" value="B" />
            <el-option label="C" value="C" />
            <el-option label="D" value="D" />
          </el-select>
        </el-form-item>
        <el-form-item label="解析" :label-width="formLabelWidth">
          <el-input v-model="updateChooseForm.ansText" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="updateChooseVisible = false">取消</el-button>
          <el-button type="primary" @click="updateChoose()"> 确认修改 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="updateBlankVisible" title="填空题修改" width="500">
      <el-form :model="updateBlankForm">
        <el-form-item label="题目编号" :label-width="formLabelWidth">
          <el-input v-model="updateBlankForm.blankId" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="updateBlankForm.question" autocomplete="off" />
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth">
          <el-input v-model="updateBlankForm.ans" autocomplete="off" />
        </el-form-item>

        <el-form-item label="解析" :label-width="formLabelWidth">
          <el-input v-model="updateBlankForm.ansText" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="updateBlankVisible = false">取消</el-button>
          <el-button type="primary" @click="updateBlank()"> 确认修改 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="updateJudgeVisible" title="判断题修改" width="500">
      <el-form :model="updateJudgeForm">
        <el-form-item label="题目编号" :label-width="formLabelWidth">
          <el-input v-model="updateJudgeForm.judgeId" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="updateJudgeForm.question" autocomplete="off" />
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth">
          <el-select v-model="updateJudgeForm.ans" placeholder="选择正确答案">
            <el-option label="√" value="1" />
            <el-option label="×" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="解析" :label-width="formLabelWidth">
          <el-input v-model="updateJudgeForm.ansText" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="updateJudgeVisible = false">取消</el-button>
          <el-button type="primary" @click="updateJudge()"> 确认修改 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="updateShortAnsVisible" title="简答题修改" width="500">
      <el-form :model="updateShortAnsForm">
        <el-form-item label="题目编号" :label-width="formLabelWidth">
          <el-input v-model="updateShortAnsForm.shortAnsId" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="updateShortAnsForm.question" autocomplete="off" />
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth">
          <textarea
            v-model="updateShortAnsForm.ans"
            autocomplete="off"
            style="width: 416px; border: 1px grey solid"
            rows="3"
          />
        </el-form-item>

        <el-form-item label="解析" :label-width="formLabelWidth">
          <el-input v-model="updateShortAnsForm.ansText" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="updateShortAnsVisible = false">取消</el-button>
          <el-button type="primary" @click="updateShortAns()"> 确认修改 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useCourseInfoStore } from "@/stores/course";
import { ElMessage } from "element-plus";
import { useUserInfoStore } from "@/stores/userinfo";
import { getSlides } from "@/api/slides";
import { getTestInfo, getScoreState } from "@/api/test";
import { useTestInfoStore } from "@/stores/test";
import { getAllExe } from "@/api/exercise";
import {
  newBlankService,
  newChooseService,
  newJudgeService,
  newShortAnsService,
  newExeService,
  delBlank,
  delChoose,
  delJudge,
  delShortAns,
  getChoose,
  getBlank,
  getJudge,
  getShortAns,
  updateBlankService,
  updateChooseService,
  updateJudgeService,
  updateShortAnsService,
} from "@/api/exercise";
import router from "@/router";
const userStore = useUserInfoStore();
const courseInfoStore = useCourseInfoStore();
const testInfoStore = useTestInfoStore();
const chooseVisible = ref(false);
const blankVisible = ref(false);
const judgeVisible = ref(false);
const shortAnsVisible = ref(false);
const newExerciseVisible = ref(false);
const updateBlankVisible = ref(false);
const updateChooseVisible = ref(false);
const updateJudgeVisible = ref(false);
const updateShortAnsVisible = ref(false);
const userInfo = ref({});
const newExe = ref({
  exeId: null,
  type: "",
  classId: null,
});
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
const chooseForm = ref({
  exeId: null,
  question: "",
  ans: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  ansText: "",
});
const blankForm = ref({ exeId: null, question: "", ans: "", ansText: "" });
const judgeForm = ref({
  exeId: null,
  question: "",
  ans: null,
  ansText: "",
});
const shortAnsForm = ref({
  exeId: null,
  question: "",
  ans: null,
  ansText: "",
});

const updateChooseForm = ref({
  chooseId: null,
  question: "",
  ans: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  ansText: "",
});
const updateBlankForm = ref({ blankId: null, question: "", ans: "", ansText: "" });
const updateJudgeForm = ref({
  judgeId: null,
  question: "",
  ans: null,
  ansText: "",
});
const updateShortAnsForm = ref({
  shortAnsId: null,
  question: "",
  ans: null,
  ansText: "",
});
const allExe = ref([]);
const testInfo = ref([]);
const getCourseClassInfo = async () => {
  courseInfo.value = courseInfoStore.info;
};

const getTest = async () => {
  let result = await getTestInfo(courseInfo.value.classId);
  testInfo.value = result.data;
};
const toTestPage = async (test) => {
  testInfoStore.setInfo(test);
  console.log(test);
  router.push("/tea/testPage");
};
const getAllExeList = async () => {
  let result = await getAllExe(courseInfo.value.classId);
  allExe.value = result.data;
  originalExeList.value = result.data;
};
onMounted(() => {
  getCourseClassInfo();
  userInfo.value = userStore.info;
  getTest();
  getAllExeList();
});

const newChoose = async () => {
  let result = await newChooseService(chooseForm.value);
  getAllExeList();
  ElMessage.success("添加题目成功");
  chooseForm.value.exeId = null;
  chooseForm.value.question = "";
  chooseForm.value.ans = "";
  chooseForm.value.optionA = "";
  chooseForm.value.optionB = "";
  chooseForm.value.optionC = "";
  chooseForm.value.optionD = "";
  chooseForm.value.ansText = "";

  chooseVisible.value = false;
};
const newBlank = async () => {
  let result = await newBlankService(blankForm.value);
  getAllExeList();
  ElMessage.success("添加题目成功");
  blankForm.value.exeId = null;
  blankForm.value.question = "";
  blankForm.value.ans = "";
  blankForm.value.ansText = "";

  blankVisible.value = false;
};
const newJudge = async () => {
  let result = await newJudgeService(judgeForm.value);
  getAllExeList();
  ElMessage.success("添加题目成功");
  judgeForm.value.exeId = null;
  judgeForm.value.question = "";
  judgeForm.value.ans = "";
  judgeForm.value.ansText = "";

  judgeVisible.value = false;
};
const newShortAns = async () => {
  let result = await newShortAnsService(shortAnsForm.value);
  getAllExeList();
  ElMessage.success("添加题目成功");
  shortAnsForm.value.exeId = null;
  shortAnsForm.value.question = "";
  shortAnsForm.value.ans = "";
  shortAnsForm.value.ansText = "";
  shortAnsVisible.value = false;
};
const newExercise = async () => {
  newExe.value.classId = courseInfo.value.classId;
  let result = await newExeService(newExe.value);
  ElMessage.success("添加题目成功，请继续完善题目信息");
  if (newExe.value.type == "选择题") {
    chooseVisible.value = true;
    chooseForm.value.exeId = newExe.value.exeId;
  } else if (newExe.value.type == "填空题") {
    blankVisible.value = true;
    blankForm.value.exeId = newExe.value.exeId;
  } else if (newExe.value.type == "判断题") {
    judgeVisible.value = true;
    judgeForm.value.exeId = newExe.value.exeId;
  } else if (newExe.value.type == "简答题") {
    shortAnsVisible.value = true;
    shortAnsForm.value.exeId = newExe.value.exeId;
  }
  newExe.value.exeId = null;
  newExerciseVisible.value = false;
};
const searchContent = ref("");
const originalExeList = ref([]);
const searchExe = async () => {
  if (searchContent.value == "") {
    getAllExeList();
  } else if (searchContent.value != "") {
    allExe.value = originalExeList.value.filter((exe) =>
      exe.question.includes(searchContent.value)
    );
  }
};
const updateExe = async (exeId, type) => {
  if (type == "选择题") {
    let result = await getChoose(exeId);
    updateChooseForm.value = result.data;
    updateChooseVisible.value = true;
  } else if (type == "填空题") {
    let result = await getBlank(exeId);
    updateBlankForm.value = result.data;
    updateBlankVisible.value = true;
  } else if (type == "判断题") {
    let result = await getJudge(exeId);
    updateJudgeForm.value = result.data;
    updateJudgeVisible.value = true;
  } else if (type == "简答题") {
    let result = await getShortAns(exeId);
    updateShortAnsForm.value = result.data;
    updateShortAnsVisible.value = true;
  }
};
const updateChoose = async () => {
  let result = await updateChooseService(updateChooseForm.value);
  ElMessage.success("修改成功");
  getAllExeList();

  updateChooseVisible.value = false;
};
const updateBlank = async () => {
  let result = await updateBlankService(updateBlankForm.value);
  ElMessage.success("修改成功");
  getAllExeList();

  updateBlankVisible.value = false;
};
const updateJudge = async () => {
  let result = await updateJudgeService(updateJudgeForm.value);
  ElMessage.success("修改成功");
  getAllExeList();

  updateJudgeVisible.value = false;
};
const updateShortAns = async () => {
  let result = await updateShortAnsService(updateShortAnsForm.value);
  ElMessage.success("修改成功");
  getAllExeList();

  updateShortAnsVisible.value = false;
};
const delExe = async (exeId, type) => {
  if (type == "选择题") {
    let result = await getChoose(exeId);
    const chooseId = result.data.chooseId;
    let result1 = await delChoose(exeId, chooseId);
  } else if (type == "填空题") {
    let result = await getBlank(exeId);
    const blankId = result.data.blankId;
    let result1 = await delBlank(exeId, blankId);
  } else if (type == "判断题") {
    let result = await getJudge(exeId);
    const judgeId = result.data.judgeId;
    let result1 = await delJudge(exeId, judgeId);
  } else if (type == "简答题") {
    let result = await getShortAns(exeId);
    const shortAnsId = result.data.shortAnsId;
    let result1 = await delShortAns(exeId, shortAnsId);
  }
  getAllExeList();
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
.testCard {
  width: 96%;
  height: 60px;
  background-color: yellow;
  margin-top: 10px;
  display: flex;
}
.testCardRight {
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-top: 10px;
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
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.TeaTestStudentContainer {
  width: 1050px;
  height: 670px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  background-color: white;
  margin-top: 6px;
}
</style>
