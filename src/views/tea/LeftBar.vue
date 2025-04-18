<template>
  <div class="teaLeftBody">
    <div class="teaSelfInfo">
      <div
        style="
          font-size: 28px;
          text-align: center;
          font-family: 阿里妈妈数黑体;
          color: white;
          margin-top: 27px;
        "
      >
        个人信息
      </div>
      <div class="teaAvatar">
        <el-avatar
          :size="180"
          :src="accountInfoForm.avatar || defaultAvatarUrl"
          @click="AvatarVisible = true"
        />
      </div>
      <el-card class="selfTxtInfo">
        <p>姓名: {{ teaInfo.teaName }}</p>
        <p>性别: {{ teaInfo.sex }}</p>
        <p>职称: {{ teaInfo.job }}</p>
        <p>电子邮件: {{ teaInfo.email }}</p>

        <p>联系电话: {{ teaInfo.phone }}</p>
        <p>教授课程: {{ teaInfo.courses }}</p>
      </el-card>
    </div>
    <el-dialog v-model="AvatarVisible" title="头像上传" width="400">
      <div style="margin-left: 80px">
        <p style="font-family: '阿里妈妈数黑体'; font-size: 20px">在这里上传头像哦🥳</p>
        <el-upload
          class="avatar-uploader"
          action="/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="AvatarVisible = false">取消</el-button>
          <el-button type="primary" @click="uploadAvatar()"> 确认上传 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { userInfoService } from "@/api/user";
import { getTeacherInfo } from "@/api/teacher";
import { useUserInfoStore } from "@/stores/userinfo";
import { updateAvatarService } from "@/api/user";
import { ref } from "vue";
const defaultAvatarUrl = ref(
  "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
);
const AvatarVisible = ref(false);
const userStore = useUserInfoStore();
const teaInfo = reactive({
  teaId: "",
  teaName: "",
  sex: "",
  phone: "",
  email: "",
  job: "",
  courses: "",
  selfInfo: "",
  accId: 5,
});
const accountInfoForm = reactive({
  accId: null,
  username: "",
  password: "",
  avatar: "",
  type: null,
});
let isFetched = false;

const getSelfInfo = async () => {
  if (isFetched) return;
  isFetched = true;

  try {
    const res = await userInfoService();
    Object.assign(accountInfoForm, res.data);
    const res1 = await getTeacherInfo(res.data.username);

    // 使用 Object.assign 更新 reactive 对象
    Object.assign(teaInfo, res1.data);
    const combinedInfo = Object.assign({}, accountInfoForm, teaInfo);
    userStore.setInfo(combinedInfo);
  } catch (error) {
    console.error("Error fetching teacher info:", error);
  }
};

onMounted(() => {
  getSelfInfo();
});
import { Plus } from "@element-plus/icons-vue";

import { ElMain, ElMessage, type UploadProps } from "element-plus";

const imageUrl = ref("");

const handleAvatarSuccess: UploadProps["onSuccess"] =  (response, uploadFile) => {
   imageUrl.value = response.data;

};
const uploadAvatar = async () => {
console.log(imageUrl.value)
  let result = await updateAvatarService(imageUrl.value);
  ElMessage.success("头像上传成功");
  AvatarVisible.value = false;
  location.reload();
}
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("必须是JPG格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("大小不得超过 2MB!");
    return false;
  }
  return true;
};
</script>

<style>
.teaLeftBody {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 330px;
  height: 100%;
  background-color: #f2f5f9;
}
.teaSelfInfo {
  margin-top: 30px;
  position: relative;
  width: 88%;
  height: 690px;
  border-radius: 10px;
  background-color: #16243d;
}
.teaAvatar {
  position: absolute;
  margin: 20px 0px;
  top: 24%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65%;
  display: flex;
  justify-content: center;
  height: 180px;
  cursor: pointer;
}
.selfTxtInfo {
  font-family: "华文中宋";
  border-radius: 10px;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  margin-top: 30px;
  height: 320px;
  background-color: white;
}
.teaAvatar-img {
  width: 75%;
  height: 100%;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
