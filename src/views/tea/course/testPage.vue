<template>
  <MenuBar></MenuBar>

  <div class="testPageMainBody">
  <div class="wholeCard">
    <div style="width: 75%; height: 100%; ">
      <div class="testTitle">
        <div style="width: 870px;margin-left: 26px;font-family: '阿里妈妈数黑体';">{{ testInfo.paperTitle }}</div>
        <div style="font-size: 18px;font-family: '阿里妈妈数黑体';" v-if="!isFinished" >耗时：{{ durationTime }}分钟</div>
                <div style="font-size: 18px;font-family: '阿里妈妈数黑体';" v-if="isFinished">作答用时:{{ examRecord.time }}  分钟</div>

      </div>
      <div class="testBody">
      <div v-if="isFinished">本试卷已完成作答，可选择对应题目查看作答情况与解析!</div>
        <!-- 选择题 -->
        <div v-if="chooseList.length!=0" class="TypeTitle">选择题</div>
        <div
          class="exeContainerChoose"
          v-for="(question, index) in chooseList"
          :key="question.chooseId"
        >
          <p class="questionTitle">{{ index + 1 }}. {{ question.question }}</p>
          <p               class="questionBody"
          >
            <input
              type="radio"
              :name="'choose' + index"
              value="A"
              @change="selectAnswer('choose', index, 'A')"
            />
            A. {{ question.optionA }}
          </p>
          <p               class="questionBody"
          >
            <input
              type="radio"
              :name="'choose' + index"
              value="B"
              @change="selectAnswer('choose', index, 'B')"
            />
            B. {{ question.optionB }}
          </p>
          <p               class="questionBody"
          >
            <input
              type="radio"
              :name="'choose' + index"
              value="C"
              @change="selectAnswer('choose', index, 'C')"
              
            />
            C. {{ question.optionC }}
          </p>
          <p               class="questionBody"
          >
            <input
              type="radio"
              :name="'choose' + index"
              value="D"
              @change="selectAnswer('choose', index, 'D')"
            />
            D. {{ question.optionD }} 
          </p>
          <div class="answerContainer" v-if="isFinished" @click="getAnswer(question.paperExeId,0)">点击这里获取我的答案与解析</div>

        </div>
        <div v-if="blankList.length!=0" class="TypeTitle">填空题</div>

        <!-- 填空题 -->
        <div
          class="exeContainerBlank"
          v-for="(question, index) in blankList"
          :key="question.blankId"
        >
          <p class="questionTitle">{{ index + 1 }}. {{ question.question }}</p>
          <p >
          <div class="form">
            <input class="input" placeholder="在这里输入你的答案" @change="selectAnswer('blank', index, $event.target.value)" type="text" />
            <span class="input-border"></span>
          </div>
          <div class="answerContainer" v-if="isFinished" @click="getAnswer(question.paperExeId,1)">点击这里获取我的答案与解析</div>

           </p>
        </div>
        <div v-if="judgeList.length!=0" class="TypeTitle">判断题</div>

        <!-- 判断题 -->
        <div
          class="exeContainerJudge"
          v-for="(question, index) in judgeList"
          :key="question.judegId"
        >
          <p class="questionTitle"> {{ index + 1 }}. {{ question.question }}</p>
          <p               class="questionBody"
          >
            <input
              type="radio"
              :name="'judge' + index"
              value="1"
              @change="selectAnswer('judge', index, '1')"
            />
            √
          </p>
          <p               class="questionBody"
          >
            <input
              type="radio"
              :name="'judge' + index"
              value="0"
              @change="selectAnswer('judge', index, '0')"
            />
            ×
          </p>
          <div class="answerContainer" v-if="isFinished" @click="getAnswer(question.paperExeId,2)">点击这里获取我的答案与解析</div>

        </div>
        <div v-if="shortAnsList.length!=0" class="TypeTitle">简答题</div>

        <!-- 简答题 -->
        <div
          class="exeContainerShortAns"
          v-for="(question, index) in shortAnsList"
          :key="question.shortAnsId"
        >
          <p class="questionTitle">{{ index + 1 }}. {{ question.question }}</p>
         
            
            <textarea    class="custom-textarea"  
             placeholder="在这里输入你的答案"   @change="selectAnswer('shortAns', index, $event.target.value)"   />
             <div class="answerContainer" v-if="isFinished" @click="getAnswer(question.paperExeId,3)">点击这里获取我的答案与解析</div>

        </div>
      </div>
    </div>

    <div style="width: 25%; height: 100%; background-color: white;border-top-right-radius:10px;border-bottom-right-radius: 10px;  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;">
      <div class="answerCard">
        <div class="answerCard-title"><div style="width:200px;font-family: '阿里妈妈数黑体';font-size: 24px;">答题卡</div><div v-if="isFinished" style="font-size: 18px;">得分：{{ examRecord.score }}</div></div> 
        <div class="answerCard-body">
          <!-- 选择题答题卡 -->
          <div v-if="chooseList.length != 0" class="typeTitle">选择题</div>
          <div
            class="anserCard-single"
            v-for="(question, index) in chooseList"
            :class="{ answered: answeredQuestions.choose[index] }"
          >
            {{ index + 1 }}
          </div>

          <!-- 填空题答题卡 -->
          <div v-if="blankList.length != 0" class="typeTitle">填空题</div>
          <div
            class="anserCard-single"
            v-for="(question, index) in blankList"
            :class="{ answered: answeredQuestions.blank[index] }"
          >
            {{ index + 1 }}
          </div>

          <!-- 判断题答题卡 -->
          <div v-if="judgeList.length != 0" class="typeTitle">判断题</div>
          <div
            class="anserCard-single"
            v-for="(question, index) in judgeList"
            :class="{ answered: answeredQuestions.judge[index] }"
          >
            {{ index + 1 }}
          </div>

          <!-- 简答题答题卡 -->
          <div v-if="shortAnsList.length != 0" class="typeTitle">简答题</div>
          <div
            class="anserCard-single"
            v-for="(question, index) in shortAnsList"
            :class="{ answered: answeredQuestions.shortAns[index] }"
          >
            {{ index + 1 }}
          </div>
        </div>
      </div>
      <el-button type="primary" @click="submitAnswers" v-if="!isFinished">提交试卷</el-button>
    </div>
    </div>
    <el-dialog v-model="centerDialogVisible" title="提示" width="500" center>
    <span>
    试卷提交成功，即将返回主页
    </span>
    <template #footer>
      <div class="dialog-footer">
         <el-button type="primary" @click="backToHome">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="answerDialogVisible" title="答案与解析" width="500" center>
    <span>
    <div style="display:flex;margin:10px 0px;">
    <div style="width:50%">本题得分:&nbsp;&nbsp;{{ansAndMyAns.stuScore }}</div>
    <div style="width: 50%;color:green">本题满分:&nbsp;&nbsp;{{ansAndMyAns.score }}</div>
</div>
<div style="display:flex;margin:10px 0px">
    <div style="width: 50%;">我的答案:&nbsp;&nbsp;{{ansAndMyAns.stuAns }}</div>

    <div style="width: 50%;color:green">正确答案:&nbsp;&nbsp;{{ ansAndMyAns.ans }}</div>
</div>

   <div style="margin:10px 0px">解析:   {{ansAndMyAns.ansText }}</div>
    </span>
    <template #footer>
      <div class="dialog-footer">
         <el-button type="primary" @click="answerDialogVisible=false"  >
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCourseInfoStore } from "@/stores/course";
import { ElMessage } from "element-plus";
import { useUserInfoStore } from "@/stores/userinfo";
import {
  getTestInfo,
  getChoose,
  getBlank,
  getJudge,
  getShortAns,
  submitTestAnswers,
  newTestRecord,
  getExamRecord,getChooseAnsAndMyAns,getBlankAnsAndMyAns,getJudgeAnsAndMyAns,getShortAnsAndMyAns,getObjectScore,
} from "@/api/test";
import { useTestInfoStore } from "@/stores/test";
import MenuBar from "@/views/MenuBar.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const centerDialogVisible = ref(false)
const answerDialogVisible = ref(false)
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
const testInfo = ref({});
const chooseList = ref([]);
const blankList = ref([]);
const judgeList = ref([]);
const shortAnsList = ref([]);
const ansAndMyAns = ref({})
const getAnswer = async (paperExeId,type) => {
    console.log(type)
    if(type==0){
            let result =await getChooseAnsAndMyAns(paperExeId,type);

            if(result.data==null){
                ElMessage.error("您未作答本题，不允许查看答案");
                answerDialogVisible.value=false;
            }
            else {            answerDialogVisible.value=true;

            ansAndMyAns.value=result.data;}
    }
    else if(type==1){
        let result=await getBlankAnsAndMyAns(paperExeId,type);

        if(result.data==null){
                ElMessage.error("您未作答本题，不允许查看答案");
                answerDialogVisible.value=false;
            }
            else {        answerDialogVisible.value=true;

            ansAndMyAns.value=result.data;}
    }
    else if(type==2){
        let result =await getJudgeAnsAndMyAns(paperExeId,type);

        if(result.data==null){
                ElMessage.error("您未作答本题，不允许查看答案");
                answerDialogVisible.value=false;
            }
            else {        answerDialogVisible.value=true;

            ansAndMyAns.value=result.data;}
    }
    else if(type==3){
        let result =await getShortAnsAndMyAns(paperExeId,type);

        if(result.data==null){
                ElMessage.error("您未作答本题，不允许查看答案");
                answerDialogVisible.value=false;
            }
            else {
                answerDialogVisible.value=true;

            ansAndMyAns.value=result.data;}
    }
 }
const answeredQuestions = ref({
  choose: {},
  blank: {},
  judge: {},
  shortAns: {},
});
const testRecord = ref({
  stuId: "",
  paperId: "",
  time: "",
});
const answers = ref({
  choose: [],
  blank: [],
  judge: [],
  shortAns: [],
});
const isFinished=ref(false);
const durationTime = ref(0);

const submitRecord = async () => {
  testRecord.value.stuId = userInfo.value.stuId;
  testRecord.value.paperId = testInfo.value.paperId;
  testRecord.value.time = durationTime.value;
  let result = await newTestRecord(testRecord.value);
};
const getCourseClassInfo = async () => {
  courseInfo.value = courseInfoStore.info;
};
const examRecord=ref({});
const getCurExamRecord= async () => {
    let result=await getExamRecord(userInfo.value.stuId,testInfo.value.paperId);
    if(result.data==null){
        isFinished.value=false;
    }
    else {
        isFinished.value=true;
        examRecord.value=result.data;
    }
 }
const getTest = async () => {
  testInfo.value = testInfoStore.info;
};

const getChooseList = async () => {
  let result = await getChoose(testInfo.value.paperId);
   chooseList.value = result.data;
};

const getBlankList = async () => {
  let result = await getBlank(testInfo.value.paperId);
  blankList.value = result.data;
};

const getJudgeList = async () => {
  let result = await getJudge(testInfo.value.paperId);
  judgeList.value = result.data;
};

const getShortAnsList = async () => {
  let result = await getShortAns(testInfo.value.paperId);
  shortAnsList.value = result.data;
};

const selectAnswer = (type, index, answer) => {
  answeredQuestions.value[type][index] = true;
  answers.value[type][index] = answer;
};
const backToHome = () => {
    router.push("/stu/course/info");

    centerDialogVisible.value = false;
}
const getObjectScoreService = async() => {
    let result=await getObjectScore(testInfo.value.paperId,);
}
const submitAnswers = async () => {
  const formattedAnswers = [];

  chooseList.value.forEach((question, index) => {
    if (answers.value.choose[index] !== undefined) {
      formattedAnswers.push({
        paperExeId: question.paperExeId,
        stuAns: answers.value.choose[index],
      });
    }
  });

  blankList.value.forEach((question, index) => {
    if (answers.value.blank[index] !== undefined) {
      formattedAnswers.push({
        paperExeId: question.paperExeId,
        stuAns: answers.value.blank[index],
      });
    }
  });

  judgeList.value.forEach((question, index) => {
    if (answers.value.judge[index] !== undefined) {
      formattedAnswers.push({
        paperExeId: question.paperExeId,
        stuAns: answers.value.judge[index],
      });
    }
  });

  shortAnsList.value.forEach((question, index) => {
    if (answers.value.shortAns[index] !== undefined) {
      formattedAnswers.push({
        paperExeId: question.paperExeId,
        stuAns: answers.value.shortAns[index],
      });
    }
  });

  try {
    await submitTestAnswers({ answers: formattedAnswers });
    submitRecord();
getObjectScoreService();
    centerDialogVisible.value = true;
    ElMessage.success("试卷提交成功");
  } catch (error) {
    ElMessage.error("提交失败，请稍后再试");
  }
};

const startTimer = () => {
  const interval = setInterval(() => {
    durationTime.value += 1; // 每分钟增加 1
  }, 60000); // 60,000 毫秒等于 1 分钟
};
onMounted(() => {
  getCourseClassInfo();
  userInfo.value = userStore.info;
  getTest();
  getChooseList();
  getBlankList();
  getJudgeList();
  getShortAnsList();
  startTimer();
  getCurExamRecord();
});
</script>

<style scoped>
.testPageMainBody {
  width: 1370px;
  height: 690px;
   display: flex;
  padding: 20px;
}
.wholeCard{
  width: 1380px;
  height: 690px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  background-color: white;
  border-radius: 10px;
  display: flex;
 
}
.testCard {
  width: 96%;
  height: 60px;
   margin-top: 10px;
  display: flex;
}
.testCardRight {
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-top: 10px;
}
.testTitle {
  font-size: 24px;
  display: flex;border-bottom: 1px solid #858282ea ;
  align-items: center;
  width: 100%;
  height: 60px;
 }
.testBody {
  width: 96.2%;
  height: 574px;
   overflow-y: auto;
  padding: 25px;
}
.exeContainerChoose,
.exeContainerBlank,
.exeContainerJudge,
.exeContainerShortAns {
  margin: 20px 0px;
  width: 95%;
 }
.answerCard {
  margin: 30px 20px;
  width: 90%;
 }
.answerCard-title {
    display: flex;
  width: 100%;
  height: 40px;
  font-size: 20px;
 }
.answerCard-body {
    overflow-y: auto;
  display: flex;
  flex-wrap: wrap; /* 允许子元素换行 */
  width: 100%;
 }
.anserCard-single {
  font-family: '华文宋体';
  border-radius: 10px;
  font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  margin: 10px 10px 10px 0px;
  width: 42px;
  height: 42px;
  background-color: rgba(245, 245, 245,1);
 }
.anserCard-single.answered {
  background-color:#34fc34;
 }
.typeTitle {
  width: 100%;
  margin-top: 10px;
  font-size: 18px;
  font-family: '阿里妈妈数黑体';
 }
button {
  margin: 20px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
.inputArea {
}
.form {
  --width-of-input: 400px;
  --border-height: 1px;
  --border-before-color: rgba(221, 221, 221, 0.39);
  --border-after-color: #5891ff;
  --input-hovered-color: #4985e01f;
  position: relative;
  width: var(--width-of-input);
}
/* styling of Input */
.input {
  color: black;
  font-size: 0.9rem;
  background-color: transparent;
  width: 100%;
  box-sizing: border-box;
  padding-inline: 0.5em;
  padding-block: 0.7em;
  border: none;
  border-bottom: var(--border-height) solid var(--border-before-color);
}
/* styling of animated border */
.input-border {
  position: absolute;
  background: var(--border-after-color);
  width: 0%;
  height: 2px;
  bottom: 0;
  left: 0;
  transition: 0.3s;
}
/* Hover on Input */
input:hover {
  background: var(--input-hovered-color);
}

input:focus {
  outline: none;
}
/* here is code of animated border */
input:focus ~ .input-border {
  width: 100%;
}
/* === if you want to do animated border on typing === */
/* remove input:focus code and uncomment below code */
/* input:valid ~ .input-border{
  width: 100%;
} */
.custom-textarea {  
  width: 90%; /* 设置宽度 */  
  height: 100px; /* 设置高度 */  
  padding: 10px; /* 内边距 */  
  border: 1px solid #ccc; /* 边框 */  
  border-radius: 5px; /* 圆角 */  
  font-size: 16px; /* 字体大小 */  
  color: #333; /* 字体颜色 */  
  background-color: #f9f9f9; /* 背景颜色 */  
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */  
  transition: border-color 0.3s ease; /* 边框颜色变化过渡 */  

}  

.custom-textarea:focus {  
  border-color: #007bff; /* 聚焦时的边框颜色 */  
  outline: none; /* 去掉默认的轮廓 */  
}  

.custom-textarea::placeholder {  
  color: #888; /* 占位符颜色 */  
  opacity: 1; /* 确保占位符不透明 */  
}
.answerContainer{
    width: 100%;
 }
.TypeTitle{
  font-family: '阿里妈妈数黑体';
    width: 95%;
     font-size: 24px;
    font-weight: bold;
}
.questionTitle{
  font-size: 18px;
  font-weight: bold;
  font-family: '华文中宋';
}
.questionBody{
  font-size: 16px;
  font-family: '华文中宋';
}
</style>
