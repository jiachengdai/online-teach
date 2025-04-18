<template>
  <div class="mainBody">
    <div class="teaInfoOutContainer">
      <div class="infoContainer">
        <div class="card" style="margin-left: 20px; margin-top: 20px">
          <div class="card-details">
            <p class="text-title">课程信息</p>
            <p>学分：{{ courseInfo.credit }}</p>
            <p>上课地点：{{ courseInfo.place }}</p>
          </div>
          <button class="card-button" @click="updateCourse()">点此更新🙌</button>
        </div>

        <div class="card" style="margin-top: 20px">
          <div class="card-details">
            <p class="text-title">班级信息</p>
            <p>授课老师：{{ courseInfo.teacherName }}</p>
            <p>班级人数：{{ courseInfo.stuNum }}</p>
          </div>
          <button class="card-button">Class Info🗒️</button>
        </div>

        <div class="card" style="margin-top: 20px; margin-right: 20px">
          <div class="card-details">
            <p class="text-title">教学大纲</p>
            <p v-if="courseInfo.syllabus">简介：{{ courseInfo.syllabus }}</p>
            <p v-else>暂无教学大纲</p>
            <a
              class="text-body"
              :href="courseInfo.syllabusUrl"
              target="_blank"
              v-if="courseInfo.syllabus"
            >
              点击下载查看教学大纲
            </a>
            <a v-else class="text-body">在下方上传↓</a>
          </div>
          <button class="card-button" @click="updateSyllabusVisible = true">
            点此更新大纲
          </button>
        </div>
      </div>

      <div class="spaceContainer">
        <div class="card">
          <span class="title">班级空间</span>

          <div class="text-box">
            <div class="box-container">
              <textarea
                placeholder="在这里键入问题，参与讨论吧！💡"
                v-model="comment.content"
              ></textarea>
              <div>
                <div class="formatting">
                  <!-- Formatting buttons -->
                  <button type="submit" class="send" title="Send" @click="sendNewComment">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      height="18"
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2.5"
                        stroke="#ffffff"
                        d="M12 5L12 20"
                      ></path>
                      <path
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2.5"
                        stroke="#ffffff"
                        d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="comments">
            <div
              v-for="(item, index) in commentData"
              :key="index"
              class="comment-container"
            >
              <div class="user">
                <div class="user-pic">
                  <el-avatar>
                    <img :src="item.comment.commentLogo || 'default-avatar.png'" />
                  </el-avatar>
                </div>
                <div class="user-info">
                  <span>{{ item.comment.commentName || "Unknown" }}</span>
                  <p>{{ item.comment.commentTime || "No time" }}</p>
                </div>
              </div>
              <p class="comment-content">{{ item.comment.content }}</p>
              <div>
                <!-- Sub-comments -->
                <el-popover :visible="item.isVisible" placement="bottom" :width="460">
                  <p>回复&nbsp;{{ item.comment.commentName }}</p>
                  <el-input
                    v-model="textarea"
                    style="width: 440px; margin-bottom: 20px"
                    :rows="4"
                    type="textarea"
                    placeholder="在这里输入回复留言🥳"
                  />
                  <div style="text-align: center; margin: 0; width: 440px">
                    <el-button
                      size="small"
                      type="primary"
                      @click="
                        reply(item.comment.commentId);

                        item.isVisible = false;
                      "
                    >
                      确认
                    </el-button>
                    <el-button size="small" text @click="item.isVisible = false"
                      >取消</el-button
                    >
                  </div>
                  <template #reference>
                    <span @click="item.isVisible = true" class="replyButton">回复</span>
                  </template>
                </el-popover>
                <span
                  class="replyButton"
                  style="margin-left: 20px"
                  v-if="item.comment.commentUser == userInfo.accId"
                  @click="delComment(item.comment.commentId)"
                  >删除</span
                >
              </div>
              <div
                v-if="item.subComment.length"
                class="sub-comments"
                style="margin-left: 60px"
              >
                <div
                  v-for="(sub, subIndex) in item.subComment"
                  :key="subIndex"
                  class="sub-comment"
                >
                  <div class="user">
                    <div class="user-pic">
                      <el-avatar>
                        <img :src="sub.commentLogo || 'default-avatar.png'" />
                      </el-avatar>
                    </div>
                    <div class="user-info">
                      <span
                        >{{ sub.commentName || "Unknown" }}&nbsp;&nbsp;&nbsp;&nbsp;回复{{
                          item.comment.commentName
                        }}</span
                      >
                      <p>{{ sub.commentTime || "No time" }}</p>
                    </div>
                  </div>
                  <p class="comment-content">{{ sub.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="upadateCourseVisible" title="新建课程" width="500">
      <el-form :model="updateCourseForm">
        <el-form-item label="课程编号" :label-width="formLabelWidth">
          <el-input
            v-model="updateCourseForm.courseId"
            autocomplete="off"
            placeholder="6尾纯数字编码"
            disabled
          />
        </el-form-item>
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="updateCourseForm.courseName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="课程学分" :label-width="formLabelWidth">
          <el-input
            v-model="updateCourseForm.credit"
            autocomplete="off"
            placeholder="例：2"
          />
        </el-form-item>
        <el-form-item label="上课时间" :label-width="formLabelWidth">
          <el-input
            v-model="updateCourseForm.courseTime"
            autocomplete="off"
            placeholder="周次+时间"
          />
        </el-form-item>
        <el-form-item label="上课地点" :label-width="formLabelWidth">
          <el-input v-model="updateCourseForm.place" autocomplete="off" />
        </el-form-item>
        <el-form-item label="课程描述" :label-width="formLabelWidth">
          <el-input v-model="updateCourseForm.syllabus" autocomplete="off" />
        </el-form-item>
        <el-form-item label="开设学期" :label-width="formLabelWidth">
          <el-select v-model="updateCourseForm.term" placeholder="选择课程开设学期">
            <el-option label="2024s" value="2024s" />
            <el-option label="2024a" value="2024a" />
            <el-option label="2025s" value="2025s" />
            <el-option label="2025a" value="2025a" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="upadateCourseVisible = false">取消</el-button>
          <el-button type="primary" @click="doUpdateCourse()"> 更新信息 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="updateSyllabusVisible" title="上传课程大纲" width="500">
      <p style="width: 100%">在这里上传/更新教学大纲🤩</p>

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
          <div class="el-upload__tip text-red">只能上传一份PDF文件哦~</div>
        </template>
      </el-upload>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="updateSyllabusVisible = false">取消</el-button>
          <el-button type="primary" @click="updateSyllabus()"> 确认上传 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useCourseInfoStore } from "@/stores/course";
import { getComments, sendComment, replyComment, delCommentService } from "@/api/comment";
import { ElMessage } from "element-plus";
import { useUserInfoStore } from "@/stores/userinfo";
import {
  getSingleCourseInfoService,
  updateCourseInfoService,
  updateSyllabusService,
} from "@/api/course";

const updateCourseForm = ref({
  courseId: "",
  credit: null,
  courseTime: "",
  place: "",
  term: "",
  courseName: "",
  syllabus: "",
  syllabusUrl: "",
});
const upadateCourseVisible = ref(false);

const updateSyllabusVisible = ref(false);
const userStore = useUserInfoStore();
const textarea = ref("");
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
const commentData = ref([]);
const comment = ref({
  classId: null,
  content: "",
});
const reComment = ref({
  replyToId: null,
  classId: null,
  content: "",
});
const pdfUrl = ref("");
const getCourseClassInfo = async () => {
  courseInfo.value = courseInfoStore.info;
};

const getCommentList = async () => {
  const result = await getComments(courseInfo.value.classId);
  commentData.value = result.data
    .map((comment) => ({
      ...comment,
      isVisible: false,
    }))
    .reverse(); // 反转评论数据并添加 isVisible 属性
};
const sendNewComment = async () => {
  console.log(comment.value);
  let result = await sendComment(comment.value);
  ElMessage.success("发送成功");
  comment.value.content = "";

  getCommentList();
};
const reply = async (commentId) => {
  reComment.value.content = textarea.value;
  reComment.value.replyToId = commentId;
  let result = await replyComment(reComment.value);
  getCommentList();
  textarea.value = "";
  reComment.value.content = "";
};
onMounted(() => {
  getCourseClassInfo();
  getCommentList();
  comment.value.classId = courseInfo.value.classId;
  reComment.value.classId = courseInfo.value.classId;
  userInfo.value = userStore.info;
  console.log(userInfo);
});
const delComment = async (commentId) => {
  let result = await delCommentService(commentId);
  getCommentList();
};
const updateCourse = async () => {
  let result = await getSingleCourseInfoService(courseInfo.value.courseId);
  updateCourseForm.value = result.data;
  upadateCourseVisible.value = true;
};
const doUpdateCourse = async () => {
  let result = await updateCourseInfoService(updateCourseForm.value);
  ElMessage.success("更新成功");
  upadateCourseVisible.value = false;
  getCourseClassInfo();
};
const updateSyllabus = async () => {
  let result = await updateSyllabusService(pdfUrl.value, courseInfo.value.courseId);
  ElMessage.success("上传成功");
  updateSyllabusVisible.value = false;
  getCourseClassInfo();
};

import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";

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
    pdfUrl.value = response.data;
  }
};

const submitUpload = () => {
  upload.value!.submit();
};
</script>

<style scoped>
.mainBody {
  overflow-y: auto;
  width: 1150px;
  height: 100%;
  background-color: #f2f5f9;
  display: flex;
  flex-wrap: wrap; /* 允许子元素换行 */
  padding: 20px;
  box-sizing: border-box; /* 包括内边距和边框 */
}

.col {
  background-color: #f5f7fb;
  width: 320px; /* 固定宽度 */
  height: 250px;
  margin: 10px 16px; /* 垂直方向的间距 */
  box-sizing: border-box; /* 考虑内边距和边框 */
}
.infoContainer {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  width: 1050px;
  height: 300px;
}
.spaceContainer {
  width: 1050px;
  height: 500px;

  .card {
    width: 990px;
    height: fit-content;
    background-color: white;

    border-radius: 17px 17px 27px 27px;
  }

  .title {
    width: 100%;
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid #f1f1f1;
    font-weight: 700;
    font-size: 18px;
    color: #47484b;
  }

  .title::after {
    content: "";
    width: 8ch;
    height: 1px;
    position: absolute;
    bottom: -1px;
    background-color: #47484b;
  }

  .comments {
    grid-template-columns: 35px 1fr;
    gap: 20px;
    padding: 20px;
  }

  .comment-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 0;
    margin: 0;
    margin-top: 40px;
  }

  .comment-container .user {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 10px;
  }

  .comment-container .user .user-pic {
    width: 40px;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f1f1f1;
    border-radius: 50%;
  }

  .comment-container .user .user-pic:after {
    content: "";
    width: 9px;
    height: 9px;
    position: absolute;
    right: 0px;
    bottom: 0px;
    border-radius: 50%;
    background-color: #0fc45a;
    border: 2px solid #ffffff;
  }

  .comment-container .user .user-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 3px;
  }

  .comment-container .user .user-info span {
    font-weight: 700;
    font-size: 12px;
    color: #47484b;
  }

  .comment-container .user .user-info p {
    font-weight: 600;
    font-size: 10px;
    color: #acaeb4;
  }

  .comment-container .comment-content {
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    color: #5f6064;
    margin-top: 0px;
  }

  .text-box {
    width: 100%;
    height: fit-content;
    border: 2px solid #f1f1f1;
    border-radius: 10px;
    padding: 8px;
  }

  .text-box .box-container {
    background-color: #ffffff;
    border-radius: 8px 8px 21px 21px;
    padding: 8px;
  }

  .text-box textarea {
    width: 95%;
    height: 40px;
    resize: none;
    border: 0;
    border-radius: 6px;
    padding: 12px 12px 10px 12px;
    font-size: 13px;
    outline: none;
    caret-color: #16243d;
  }

  .text-box .formatting {
    display: grid;
    grid-template-columns: auto auto auto auto auto 1fr;
  }

  .text-box .formatting button {
    width: 30px;
    height: 30px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: 50%;
    border: 0;
    outline: none;
  }

  .text-box .formatting button:hover {
    background-color: #f1f1f1;
  }

  .text-box .formatting .send {
    width: 30px;
    height: 30px;
    background-color: #16243d;
    margin: 0 0 0 auto;
  }

  .text-box .formatting .send:hover {
    background-color: #16243d;
  }

  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 0.6;
    }

    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
}
.card {
  width: 190px;
  height: 200px;
  border-radius: 20px;
  background: #f5f5f5;
  position: relative;
  padding: 1.8rem;
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;
}

.card-details {
  color: black;
  height: 100%;
  gap: 0.5em;
  display: grid;
  place-content: center;
}

.card-button {
  transform: translate(-50%, 125%);
  width: 60%;
  border-radius: 1rem;
  border: none;
  background-color: #16243d;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;
}

.text-body {
  color: rgb(134, 134, 134);
}

/*Text*/
.text-title {
  font-family: "阿里妈妈数黑体";
  font-size: 1.5em;
  font-weight: bold;
}

/*Hover*/
.card:hover {
  border-color: #16243d;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
  transform: translate(-50%, 50%);
  opacity: 1;
}
.replyButton {
  width: 380px;
  font-size: 12px;
  color: #16243d;
}
.replyButton:hover {
  cursor: pointer;
}
.teaInfoOutContainer {
  width: 1050px;
  height: auto;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  background-color: white;
  margin-top: 6px;
}
</style>
