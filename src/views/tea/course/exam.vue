<template>
  <div class="mainBody">
    <div class="teaexamContainer">
      <div style="width: 1050px; height: 45px">
        <h2 style="margin-left: 20px; font-family: '阿里妈妈数黑体'">测验考试</h2>
      </div>
      <div style="width: 1000px; height: 598px; overflow-y: auto; margin-left: 20px">
        <div style="height: 50px">
          <el-button @click="newPaperVisible = true" style="margin-top: 8px"
            >新建试卷</el-button
          >
        </div>
        <div class="testCard" v-for="test in testInfo" :key="test.paperId">
          <svg
            t="1721917302558"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4299"
            width="40"
            height="40"
            style="margin-left: 10px; margin-top: 10px"
          >
            <path
              d="M837.818182 55.854545h-651.636364c-69.818182 0-130.327273 60.509091-130.327273 130.327273v651.636364c0 69.818182 60.509091 130.327273 130.327273 130.327273h260.654546c18.618182 0 37.236364-18.618182 37.236363-37.236364s-18.618182-37.236364-37.236363-37.236364H186.181818c-32.581818 0-55.854545-23.272727-55.854545-55.854545V186.181818c0-32.581818 23.272727-55.854545 55.854545-55.854545h651.636364c32.581818 0 55.854545 23.272727 55.854545 55.854545v349.090909c0 18.618182 18.618182 37.236364 37.236364 37.236364s37.236364-18.618182 37.236364-37.236364V186.181818c0-74.472727-60.509091-130.327273-130.327273-130.327273z"
              p-id="4300"
            ></path>
            <path
              d="M246.690909 479.418182h465.454546c18.618182 0 37.236364-18.618182 37.236363-37.236364s-18.618182-37.236364-37.236363-37.236363h-465.454546c-18.618182 0-37.236364 18.618182-37.236364 37.236363s18.618182 37.236364 37.236364 37.236364zM902.981818 721.454545l-158.254545 158.254546-93.090909-93.090909c-13.963636-13.963636-37.236364-13.963636-51.2 0s-13.963636 37.236364 0 51.2l121.018181 121.018182c18.618182 13.963636 41.890909 13.963636 51.2 0 4.654545-4.654545 4.654545-9.309091 9.309091-13.963637l172.218182-172.218182c13.963636-13.963636 13.963636-37.236364 0-51.2-13.963636-13.963636-37.236364-13.963636-51.2 0zM246.690909 316.509091h288.581818c18.618182 0 37.236364-18.618182 37.236364-37.236364s-18.618182-37.236364-37.236364-37.236363h-288.581818c-18.618182 0-37.236364 13.963636-37.236364 37.236363 0 18.618182 18.618182 37.236364 37.236364 37.236364zM246.690909 633.018182h530.618182c18.618182 0 37.236364-18.618182 37.236364-37.236364s-18.618182-37.236364-37.236364-37.236363h-530.618182c-18.618182 0-37.236364 18.618182-37.236364 37.236363s18.618182 37.236364 37.236364 37.236364zM470.109091 716.8h-223.418182c-18.618182 0-37.236364 18.618182-37.236364 37.236364s18.618182 37.236364 37.236364 37.236363h223.418182c18.618182 0 37.236364-18.618182 37.236364-37.236363s-18.618182-37.236364-37.236364-37.236364z"
              p-id="4301"
            ></path>
          </svg>
          <div class="testCardRight">
            <div style="width: 600px">
              <div style="font-size: 17px">{{ test.paperTitle }}</div>
              <div style="font-size: 15px">考试时长：{{ test.duration }} min</div>
            </div>
            <div>
              <div style="font-size: 15px">截止时间：{{ test.endTime }}</div>
              <el-button @click="makePaper(test.paperId)">组题</el-button>
              <el-button @click="toTestPage(test)">预览试卷</el-button>
              <el-button @click="getStuExamState(test.paperId)">作答情况</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="newPaperVisible" title="新建试卷" width="500">
      <el-form :model="newPaper">
        <el-form-item label="班组编号" :label-width="formLabelWidth">
          <el-input v-model="newPaper.classId" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="试卷标题" :label-width="formLabelWidth">
          <el-input v-model="newPaper.paperTitle" autocomplete="off" />
        </el-form-item>

        <el-form-item label="试卷类型" :label-width="formLabelWidth">
          <el-select v-model="newPaper.type" placeholder="选择试卷类型">
            <el-option label="测验" value="0" />
            <el-option label="考试" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="试卷总分" :label-width="formLabelWidth">
          <el-input v-model="newPaper.tolScore" autocomplete="off" />
        </el-form-item>

        <el-form-item label="及格分数" :label-width="formLabelWidth">
          <el-input
            v-model="newPaper.standardScore"
            autocomplete="off"
            placeholder="例：2"
          />
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth" style="display: flex">
          <el-select v-model="year" placeholder="年" style="width: 140px">
            <el-option label="2023" value="2023" />
            <el-option label="2024" value="2024" />
            <el-option label="2025" value="2024" />
            <el-option label="2026" value="2024" />
          </el-select>
          <el-select v-model="month" placeholder="月" style="width: 140px">
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
            <el-option label="4" value="4" />
            <el-option label="5" value="5" />
            <el-option label="6" value="6" />
            <el-option label="7" value="7" />
            <el-option label="8" value="8" />
            <el-option label="9" value="9" />
            <el-option label="10" value="10" />
            <el-option label="11" value="11" />
            <el-option label="12" value="12" />
          </el-select>
          <el-select v-model="day" placeholder="日" style="width: 140px">
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
            <el-option label="4" value="4" />
            <el-option label="5" value="5" />
            <el-option label="6" value="6" />
            <el-option label="7" value="7" />
            <el-option label="8" value="8" />
            <el-option label="9" value="9" />
            <el-option label="10" value="10" />
            <el-option label="11" value="11" />
            <el-option label="12" value="12" />
            <el-option label="13" value="13" />
            <el-option label="14" value="14" />
            <el-option label="15" value="15" />
            <el-option label="16" value="16" />
            <el-option label="17" value="17" />
            <el-option label="18" value="18" />
            <el-option label="19" value="19" />
            <el-option label="20" value="20" />
            <el-option label="21" value="21" />
            <el-option label="22" value="22" />
            <el-option label="23" value="23" />
            <el-option label="24" value="24" />
            <el-option label="25" value="25" />
            <el-option label="26" value="26" />
            <el-option label="27" value="27" />
            <el-option label="28" value="28" />
            <el-option label="29" value="29" />
            <el-option label="30" value="30" />
            <el-option label="31" value="31" />
          </el-select>
        </el-form-item>
        <el-form-item label="考试时间" :label-width="formLabelWidth">
          <div class="demo-range">
            <el-time-picker
              v-model="value1"
              is-range
              range-separator="To"
              start-placeholder="Start time"
              end-placeholder="End time"
            />
          </div>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="newPaperVisible = false">取消</el-button>
          <el-button type="primary" @click="createPaper()"> 新建试卷 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="makePaperVisible" title="组卷" width="1100">
      <el-form :model="makePaperForm" label-width="90px">
      <el-form-item label="试卷编号">
        <el-input v-model="makePaperForm.paperId" autocomplete="off" disabled />
      </el-form-item>
 <div   style="  margin-bottom: 20px;display:flex;max-height: 350px;">
      <div style="width: 40%; margin-right: 20px; background: #f9f9f9; border-radius: 8px; padding: 16px; min-height: 320px;">
        <b>题库</b>
        <el-table :data="allExe" style="width: 100%" max-height="300">
          <el-table-column prop="exeId" label="题目编号" width="80" />
          <el-table-column prop="type" label="类型" width="80" />
          <el-table-column prop="question" label="题目" width="180" />
          <el-table-column prop="ans" label="答案" width="100" />
          <el-table-column prop="ansText" label="解析" width="120" />
          <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-popover
            v-model:visible="scope.row.popVisible"
            placement="bottom"
            width="180"
            title="设置分值"
            >
            <div style="margin-bottom: 8px;">
              <el-input
              v-model="singleExe.score"
              autocomplete="off"
              placeholder="请输入分数"
              size="small"
              style="width: 120px"
              type="number"
              min="1"
              />
            </div>
            <div style="text-align: right;">
              <el-button size="small" @click="scope.row.popVisible = false">取消</el-button>
              <el-button
              size="small"
              type="primary"
              @click="
                () => {
                select(scope.row.exeId);
                scope.row.popVisible = false;
                }
              "
              >添加</el-button>
            </div>
            <template #reference>
              <el-button
              size="small"
              @click="
                () => {
                singleExe.score = '';
                scope.row.popVisible = true;
                }
              "
              >添加</el-button>
            </template>
            </el-popover>
          </template>
          </el-table-column>
        </el-table>
      </div>
       
        <!-- 试卷预览 -->
        <div style="width: 60%; background: #f9f9f9; border-radius: 8px; padding: 16px; min-height: 320px;overflow-y: auto; "> 
          <b>试卷预览</b>
          <div v-if="makePaperForm.paperExes.length == 0" style="color: #aaa; margin-top: 16px;">
            暂无题目，请从左侧添加
          </div>
          <div v-else  >
            <div
              v-for="(item, idx) in makePaperForm.paperExes"
              :key="item.paperExeId || item.exeId"
              style="margin-bottom: 18px; border-bottom: 1px dashed #e0e0e0; padding-bottom: 10px;"
            >
              <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="font-weight: bold; margin-bottom: 4px;">
            {{ idx + 1 }}. [{{ allExe.find(e => e.exeId === item.exeId)?.type || '未知类型' }}]
            (分值: {{ item.score }})
          </div>
          <el-button
            link
            type="danger"
            size="small"
            @click.prevent="delPaperExe(item.paperExeId)"
            >移除</el-button>
              </div>
              <div style="margin-bottom: 4px;">
          {{ allExe.find(e => e.exeId === item.exeId)?.question || '题目已被删除' }}
              </div>
              <div style="font-size: 13px; color: #888;">
          答案：{{ allExe.find(e => e.exeId === item.exeId)?.ans || '-' }}
          <span v-if="allExe.find(e => e.exeId === item.exeId)?.ansText">
            | 解析：{{ allExe.find(e => e.exeId === item.exeId)?.ansText }}
          </span>
              </div>
            </div>
          </div>
        </div>
     </div>
      </el-form>
      <template #footer>
      <div class="dialog-footer">
        <el-button @click="makePaperVisible = false">取消</el-button>
        <el-button type="primary" @click="makePaperExe()">确认组卷</el-button>
      </div>
      </template>
    </el-dialog>

    <el-dialog v-model="stateVisible" title="作答情况" width="500">
      <el-form>
        <div class="stuContainer">
          <el-table :data="stuStateForm" style="width: 100%" max-height="500">
            <el-table-column fixed prop="stuId" label="学号" width="120" />
            <el-table-column prop="paperId" label="试卷编号" width="80" />

            <el-table-column prop="time" label="作答时间" width="80" />

            <el-table-column prop="score" label="分数" width="80" />

            <el-table-column prop="state" label="是否及格" width="90">
              <template #default="scope">
                <span>{{ scope.row.state === 1 ? "及格" : "不及格" }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="stateVisible = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCourseInfoStore } from "@/stores/course";
import { ElMessage } from "element-plus";
import { useUserInfoStore } from "@/stores/userinfo";
import { getSlides } from "@/api/slides";
import { getScoreState } from "@/api/test";
import { useTestInfoStore } from "@/stores/test";
import { getExamInfo, getPaperService } from "@/api/exam";
import { delPaperExeService, getPaperExeService, newPaperService } from "@/api/paper";
import { makePaperService } from "@/api/paper";
import { getAllExe } from "@/api/exercise";
import { getStuExamStateService } from "@/api/exam";
import router from "@/router";

const userStore = useUserInfoStore();
const stateVisible = ref(false);
const courseInfoStore = useCourseInfoStore();
const makePaperVisible = ref(false);
const testInfoStore = useTestInfoStore();
const userInfo = ref({});
const newPaperVisible = ref(false);
const allExe = ref([]);
const stuStateForm = ref([]);
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
const makePaperForm = ref({
  paperId: null,
  paperExes: [],
});
const singleExe = ref({
  exeId: null,
  score: null,
});
const popVisible = ref(false);
const newSelect = ref({ paperId: null, paperExes: [] });
const select = async (exeId) => {
  singleExe.value.exeId = exeId;

  newSelect.value.paperExes.push(singleExe.value);
  let result = await makePaperService(newSelect.value);
  newSelect.value.paperExes = [];
  singleExe.value.exeId = null;
  singleExe.value.score = null;
  console.log(newSelect.value);
  popVisible.value = false;
  getPaperExe(tmpPaperId.value);
};
const makePaperExe = async () => {
  ElMessage.success("组卷成功");
  makePaperVisible.value = false;
  newSelect.value.paperExes = [];
};
const getStuExamState = async (paperId) => {
  stateVisible.value = true;
  let result = await getStuExamStateService(paperId);
  stuStateForm.value = result.data;
};
const testInfo = ref([]);
const newPaper = ref({
  type: null,
  tolScore: null,
  classId: null,
  paperTitle: "",
  standardScore: null,
  startTime: "",
  endTime: "",
  state: null,
});
const year = ref("");
const month = ref("");
const day = ref("");
const delPaperExe = async (paperExeId) => {
  let result = delPaperExeService(paperExeId);
  ElMessage.success("删除成功");
  setTimeout(() => {
    getPaperExe(tmpPaperId.value);
  }, 500);
};
const getCourseClassInfo = async () => {
  courseInfo.value = courseInfoStore.info;
};
const getAllExeList = async () => {
  let result = await getAllExe(courseInfo.value.classId);
  allExe.value = result.data;
  console.log(allExe.value);
};
const getPapers = async () => {
  let result = await getPaperService(courseInfo.value.classId);
  testInfo.value = result.data;
};
const toTestPage = async (test) => {
  testInfoStore.setInfo(test);
  console.log(test);
  router.push("/tea/testPage");
};
function formatDate(date) {
  const fyear = year.value;
  const fmonth = String(month.value.padStart(2, "0")); // 月份是从0开始的，所以加1
  const fday = String(day.value.padStart(2, "0"));
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${fyear}-${fmonth}-${fday} ${hours}:${minutes}:${seconds}`;
}

// 使用格式化函数

const createPaper = async () => {
  const formattedDates = value1.value.map(formatDate);
  newPaper.value.startTime = formattedDates[0];
  newPaper.value.endTime = formattedDates[1];
  let result = await newPaperService(newPaper.value);
  newPaperVisible.value = false;
  getPapers();
};
onMounted(() => {
  getCourseClassInfo();
  userInfo.value = userStore.info;
  getPapers();
  newPaper.value.classId = courseInfo.value.classId;
});
const value1 = ref<[Date, Date]>([
  new Date(2016, 9, 10, 8, 40),
  new Date(2016, 9, 10, 9, 40),
]);
const getPaperExe = async (paperId) => {
  let result = await getPaperExeService(paperId);
  let nowList = [];
  for (let i = 0; i < result.data.length; i++) {
    let single = { paperExeId: null, exeId: null, score: null };
    single.paperExeId = result.data[i].paperExeId;
    single.exeId = result.data[i].exeId;
    single.score = result.data[i].score;
    nowList.push(single);
  }
  console.log(nowList);
  makePaperForm.value.paperExes = nowList;

  // makePaperForm.value.paperExes=result.data;
};
const tmpPaperId = ref(null);
const makePaper = (paperId) => {
  getAllExeList();
  getPaperExe(paperId);
  tmpPaperId.value = paperId;
  makePaperForm.value.paperId = paperId;
  newSelect.value.paperId = paperId;
  makePaperVisible.value = true;
  console.log(paperId);
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
  height: 70px;
  background-color: #f5f7fb;
  margin-top: 10px;
  border-radius: 10px;
  display: flex;
}
.testCardRight {
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-top: 10px;
}
.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
}
.teaexamContainer {
  width: 1050px;
  height: 670px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  background-color: white;
  margin-top: 6px;
}
</style>
