<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import { ref } from "vue";
import { userRegisterService, userLoginService, userInfoService } from "@/api/user.js";
import { ElMessage } from "element-plus";
import { reactive } from "vue";
import { adminFill } from "@/api/admin.js";
import { stuFill } from "@/api/student.js";
import { teaFill } from "@/api/teacher.js";
const loginVisible = ref(true);
const loginUsernameTip = ref(" ");
const loginPasswordTip = ref(" ");

const LoginUserInfoForm = reactive({
  username: "",
  password: "",
});
const registerUserInfoForm = reactive({
  username: "",
  password: "",
  type: null,
});
// 定义数据模型

import { useTokenStore } from "@/stores/token.js";
import { useRouter } from "vue-router";
const router = useRouter();
const tokenStore = useTokenStore();
const toFitPage = () => {};
const login = async () => {
  let result = await userLoginService(LoginUserInfoForm);

  ElMessage.success(result.msg ? result.msg : "登陆成功");
  tokenStore.setToken(result.data);
  let result1 = await userInfoService(LoginUserInfoForm.username);
  let type = result1.data.type;
  if (type == 0) {
    router.push("/admin/course");
  } else if (type == 1) {
    router.push("/tea");
  } else if (type == 2) {
    router.push("/stu");
  }
};

const nextStep = async () => {
  if (registerUserInfoForm.username.length < 6) {
    ElMessage.error("用户名长度不能小于6");
  } else if (registerUserInfoForm.password.length < 6) {
    ElMessage.error("密码长度不能小于6");
  } else if (registerUserInfoForm.type == null) {
    ElMessage.error("请选择用户类型");
  } else {
    let result = await userRegisterService(registerUserInfoForm);

    ElMessage.success(result.msg ? result.msg : "注册成功,请完善个人信息");
    if (result.code == 0) {
      LoginUserInfoForm.username = registerUserInfoForm.username;
      LoginUserInfoForm.password = registerUserInfoForm.password;
      let result0 = await userLoginService(LoginUserInfoForm);
      tokenStore.setToken(result0.data);
    }

    let result1 = await userInfoService(registerUserInfoForm);
    const visibleType = registerUserInfoForm.type;
    if (visibleType == 0) {
      adminFormVisible.value = true;
      adminForm.accId = result1.data.accId;
    } else if (visibleType == 1) {
      teaFormVisible.value = true;
      TeacherForm.accId = result1.data.accId;
    } else if (visibleType == 2) {
      stuFormVisible.value = true;
      StudentForm.accId = result1.data.accId;
    }
  }
};
const adminInfoFill = async () => {
  if (adminForm.sex == "") {
    ElMessage.error("请选择性别");
  } else if (adminForm.job == "") {
    ElMessage.error("请填写职务");
  } else {
    let fillInfoResult = await adminFill(adminForm);
    ElMessage.success(fillInfoResult.msg ? fillInfoResult.msg : "成功！");

    adminFormVisible.value = false;
    router.push("/admin/course");
  }
};
const stuInfoFill = async () => {
  if (StudentForm.stuName.length == "") {
    ElMessage.error("请输入学生姓名");
  } else if (StudentForm.sex == "") {
    ElMessage.error("请选择性别");
  } else if (StudentForm.type == "") {
    ElMessage.error("请选择学制");
  } else if (StudentForm.dept == "") {
    ElMessage.error("请填写院系");
  } else if (StudentForm.major == "") {
    ElMessage.error("请填写专业");
  } else if (StudentForm.grade == "") {
    ElMessage.error("请选择入学年份");
  } else if (StudentForm.adminClass == "") {
    ElMessage.error("请填写班级");
  } else {
    let fillInfoResult = await stuFill(StudentForm);
    ElMessage.success(fillInfoResult.msg ? fillInfoResult.msg : "成功！");

    stuFormVisible.value = false;
    router.push("/stu");
  }
};
const teaInfoFill = async () => {
  if (TeacherForm.teaName.length == "") {
    ElMessage.error("请输入教师姓名");
  } else if (TeacherForm.sex == "") {
    ElMessage.error("请选择性别");
  } else if (TeacherForm.job == "") {
    ElMessage.error("请选择职称");
  } else if (TeacherForm.phone == "") {
    ElMessage.error("请填写手机号");
  } else if (TeacherForm.email == "") {
    ElMessage.error("请填写邮箱");
  } else if (TeacherForm.courses == "") {
    ElMessage.error("请填写讲授课程");
  } else if (TeacherForm.selfInfo == "") {
    ElMessage.error("请填写个人简介");
  } else {
    let fillInfoResult = await teaFill(TeacherForm);
    ElMessage.success(fillInfoResult.msg ? fillInfoResult.msg : "成功！");

    teaFormVisible.value = false;
    router.push("/tea");
  }
};
const checkUsername = (username) => {
  if (username.length < 6) {
    loginUsernameTip.value = "用户名长度不能小于6位";
  } else {
    loginUsernameTip.value = "";
  }
};
const checkPassword = (password) => {
  if (password.length < 6) {
    loginPasswordTip.value = "密码长度不能小于6位";
  } else {
    loginPasswordTip.value = "";
  }
};
const toRegister = () => {
  LoginUserInfoForm.username = "";
  LoginUserInfoForm.password = "";
  loginPasswordTip.value = "";
  loginUsernameTip.value = "";
};
const toLogin = () => {
  registerUserInfoForm.username = "";
  registerUserInfoForm.password = "";
  loginPasswordTip.value = "";
  loginUsernameTip.value = "";
};

const stuFormVisible = ref(false);
const adminFormVisible = ref(false);
const teaFormVisible = ref(false);
const formLabelWidth = "140px";

const StudentForm = reactive({
  stuName: "",
  sex: "",
  type: "",
  dept: "",
  major: "",
  grade: "",
  adminClass: "",
  accId: null,
});
const TeacherForm = reactive({
  teaName: "",
  sex: "",
  phone: "",
  email: "",
  job: "",
  courses: "",
  selfInfo: "",
  accId: null,
});
const adminForm = reactive({
  sex: "",
  job: "",
  accId: null,
});
</script>

<template>
  <div>
    <el-row class="login-page">
      <el-col :span="12" class="bg"></el-col>
      <el-col :span="12" class="form">
        <div class="right">
          <div
            class="heading"
            style="
              font-size: 40px;
              margin-bottom: 40px;
              margin-left: 200px;
              font-family: '阿里妈妈数黑体';
            "
          >
            智慧教学系统
          </div>
          <div class="login" v-if="loginVisible">
            <div class="container">
              <div class="heading" style="text-align: center">登陆🥳</div>
              <el-form class="form" :rules="rules">
                <input
                  v-model="LoginUserInfoForm.username"
                  v-on:blur="checkUsername(LoginUserInfoForm.username)"
                  required=""
                  class="input"
                  placeholder="请输入用户名（学号、职工号）[6-16位]"
                  style="margin-top: 15px"
                />
                <p class="tip">{{ loginUsernameTip }}</p>
                <input
                  v-model="LoginUserInfoForm.password"
                  v-on:blur="checkPassword(LoginUserInfoForm.password)"
                  required=""
                  class="input"
                  type="password"
                  placeholder="请输入密码🙈[6-16位]"
                />
                <p class="tip">{{ loginPasswordTip }}</p>
                <span class="forgot-password" @click="loginVisible = false"
                  ><a @click="toRegister">没有账号？立即注册！</a></span
                >
              </el-form>
              <button class="login-button" @click="login">登陆</button>
            </div>
          </div>

          <div class="register" v-if="!loginVisible">
            <div class="container">
              <div class="heading" style="text-align: center">注册新用户🤩</div>
              <form class="form">
                <input
                  v-model="registerUserInfoForm.username"
                  v-on:blur="checkUsername(registerUserInfoForm.username)"
                  required=""
                  class="input"
                  id="email"
                  placeholder="请输入用户名（学号、职工号）[6-16位]"
                  style="margin-top: 15px"
                />
                <p class="tip">{{ loginUsernameTip }}</p>
                <input
                  v-model="registerUserInfoForm.password"
                  v-on:blur="checkPassword(registerUserInfoForm.password)"
                  required=""
                  class="input"
                  type="password"
                  id="password"
                  placeholder="请输入密码🙈[6-16位]"
                />
                <p class="tip">{{ loginPasswordTip }}</p>
                <el-radio-group
                  v-model="registerUserInfoForm.type"
                  style="margin-left: 5px"
                >
                  <el-radio :label="2">学生</el-radio>
                  <el-radio :label="1">教师</el-radio>
                  <el-radio :label="0">管理员</el-radio>
                </el-radio-group>
                <span class="forgot-password" @click="loginVisible = true"
                  ><a @click="toLogin">已有账号？去登录！</a></span
                >
              </form>
              <button class="login-button" @click="nextStep">下一步</button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 学生信息完善对话框 -->

    <el-dialog
      v-model="stuFormVisible"
      title="学生个人信息完善"
      width="500"
      :show-close="false"
    >
      <el-form :model="StudentForm">
        <el-form-item label="姓名">
          <el-input v-model="StudentForm.stuName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="StudentForm.sex" placeholder="选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="学制">
          <el-select v-model="StudentForm.type" placeholder="请选择">
            <el-option label="本科生" value="本科生" />
            <el-option label="研究生" value="研究生" />
            <el-option label="博士生" value="博士生" />
          </el-select>
        </el-form-item>

        <el-form-item label="学院">
          <el-input v-model="StudentForm.dept" autocomplete="off" />
        </el-form-item>

        <el-form-item label="专业">
          <el-input v-model="StudentForm.major" autocomplete="off" />
        </el-form-item>
        <el-form-item label="入学年份">
          <el-select v-model="StudentForm.grade" placeholder="请选择">
            <el-option label="2021" value="2021" />
            <el-option label="2022" value="2022" />
            <el-option label="2023" value="2023" />
            <el-option label="2024" value="2024" />
          </el-select>
        </el-form-item>

        <el-form-item label="行政班级">
          <el-input v-model="StudentForm.adminClass" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="stuInfoFill"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 老师信息完善 -->
    <el-dialog
      v-model="teaFormVisible"
      title="教师个人信息完善"
      width="500"
      :show-close="false"
    >
      <el-form :model="TeacherForm">
        <el-form-item label="姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名">
          <el-input v-model="TeacherForm.teaName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别">
          <el-select v-model="TeacherForm.sex" placeholder="选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称">
          <el-select v-model="TeacherForm.job" placeholder="选择职称">
            <el-option label="教授" value="教授" />
            <el-option label="副教授" value="副教授" />
            <el-option label="讲师" value="讲师" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>
        <el-form-item label="电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话">
          <el-input v-model="TeacherForm.phone" autocomplete="off" />
        </el-form-item>

        <el-form-item label="电子邮件">
          <el-input v-model="TeacherForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="讲授课程">
          <el-input v-model="TeacherForm.courses" autocomplete="off" />
        </el-form-item>

        <el-form-item label="个人介绍">
          <el-input v-model="TeacherForm.selfInfo" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="teaInfoFill"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 管理员信息完善 -->
    <el-dialog
      v-model="adminFormVisible"
      title="管理员个人信息完善"
      width="500"
      :show-close="false"
    >
      <el-form :model="StudentForm">
        <el-form-item label="性别">
          <el-select v-model="adminForm.sex" placeholder="选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="adminForm.job" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="adminInfoFill"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url("../assets/Welcome.jpg") no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
.tip {
  margin-left: 5px;
  margin-top: 10px;
  color: red;
  margin-bottom: 0px;
  font-size: 13px;
}
.container {
  width: 450px;
  height: 380px;
  background: #f8f9fd;
  background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
  border-radius: 40px;
  padding: 25px 35px;
  border: 5px solid rgb(255, 255, 255);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
  margin: 20px;
  margin-left: 60px;
}

.heading {
  font-weight: 900;
  font-size: 30px;
  color: rgb(16, 137, 211);
}

.form {
  margin-top: 20px;
}

.form .input {
  font-size: 16px;
  width: 90%;
  background: white;
  border: none;
  padding: 15px 20px;
  border-radius: 20px;
  margin-top: 20px;
  box-shadow: #cff0ff 0px 10px 10px -5px;
  border-inline: 2px solid transparent;
}

.form .input::-moz-placeholder {
  color: rgb(170, 170, 170);
}

.form .input::placeholder {
  color: rgb(170, 170, 170);
}

.form .input:focus {
  outline: none;
  border-inline: 2px solid #12b1d1;
}

.form .forgot-password {
  display: block;
  margin-top: 10px;
  margin-left: 10px;
}

.form .forgot-password a {
  font-size: 14px;
  color: #0099ff;
  text-decoration: none;
}

.form .login-button {
  height: 50px;
  font-size: 16px;
  display: block;
  width: 100%;
  font-weight: bold;
  background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
  color: white;
  padding-block: 15px;
  margin: 20px auto;
  border-radius: 20px;
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
  border: none;
  transition: all 0.2s ease-in-out;
  margin-top: 30px;
}

.form .login-button:hover {
  transform: scale(1.03);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
}

.form .login-button:active {
  transform: scale(0.95);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
}
</style>
