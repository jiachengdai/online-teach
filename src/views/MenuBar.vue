<template>
  <div>
    <div class="headBar">
      <span
        style="
          font-size: 24px;
          margin-left: 20px;
          line-height: 47px;
          font-family: 阿里妈妈数黑体;
          cursor: pointer;
        "
        >智学助手</span
      >
      <el-header>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="selfInfo.avatar || defaultAvatar" />

            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="tohome" :icon="House">回到主页</el-dropdown-item>
              <el-dropdown-item command="selfShift" :icon="User" v-if="Usertype"
                >修改信息</el-dropdown-item
              >

              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
    </div>
    <el-dialog v-model="teaSelfVisible" title="教师信息修改" width="500">
      <el-form :model="teaInfo">
        <el-form-item label="工号：" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="teaInfo.teaId" disabled />
        </el-form-item>
        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="teaInfo.teaName" />
        </el-form-item>
        <el-form-item label="性别：" :label-width="formLabelWidth">
          <el-select v-model="teaInfo.sex" placeholder="选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="职称：">
          <el-select v-model="teaInfo.job" placeholder="选择职称">
            <el-option label="教授" value="教授" />
            <el-option label="副教授" value="副教授" />
            <el-option label="讲师" value="讲师" />
            <el-option label="其他" value="其他" />
          </el-select> </el-form-item
        ><el-form-item label="电话：" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="teaInfo.phone" /> </el-form-item
        ><el-form-item label="邮箱：" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="teaInfo.email" /> </el-form-item
        ><el-form-item label="教授课程：" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="teaInfo.courses" /> </el-form-item
        ><el-form-item label="个人简介：" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="teaInfo.selfInfo" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="teaSelfVisible = false">取消</el-button>
          <el-button type="primary" @click="updateTea()"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="stuSelfVisible" title="学生信息修改" width="500">
      <el-form :model="stuInfo">
        <el-form-item label="学号">
          <el-input v-model="stuInfo.stuId" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="stuInfo.stuName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="stuInfo.sex" placeholder="选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="学制">
          <el-select v-model="stuInfo.type" placeholder="请选择">
            <el-option label="本科生" value="本科生" />
            <el-option label="研究生" value="研究生" />
            <el-option label="博士生" value="博士生" />
          </el-select>
        </el-form-item>

        <el-form-item label="学院">
          <el-input v-model="stuInfo.dept" autocomplete="off" />
        </el-form-item>

        <el-form-item label="专业">
          <el-input v-model="stuInfo.major" autocomplete="off" />
        </el-form-item>
        <el-form-item label="入学年份">
          <el-select v-model="stuInfo.grade" placeholder="请选择">
            <el-option label="2021" value="2021" />
            <el-option label="2022" value="2022" />
            <el-option label="2023" value="2023" />
            <el-option label="2024" value="2024" />
          </el-select>
        </el-form-item>

        <el-form-item label="行政班级">
          <el-input v-model="stuInfo.adminClass" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="stuSelfVisible = false">取消</el-button>
          <el-button type="primary" @click="updateStu()"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { useUserInfoStore } from "@/stores/userinfo";
import { onMounted, ref } from "vue";
import { userInfoService } from "@/api/user";
import { User, SwitchButton, CaretBottom, House } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useTokenStore } from "@/stores/token";
import { getStuInfo } from "@/api/student";
import { getTeacherInfo } from "@/api/teacher";
import { updateTeaService } from "@/api/teacher";
import { updateStuService } from "@/api/student";
const tokenStore = useTokenStore();
const selfInfo = ref({});
const defaultAvatar = "../assets/avatar.jpg"; // 默认头像路径
const router = useRouter();
const userInfoStore = useUserInfoStore();
const stuSelfVisible = ref(false);
const teaSelfVisible = ref(false);
const adminSelfVisible = ref(false);
const stuInfo = ref({});
const teaInfo = ref({});
const adminInfo = ref({});
const Usertype = ref(false);
const getAccInfo = async () => {
  try {
    let result = await userInfoService();
    console.log(result.data);
    selfInfo.value = result.data;
    if (selfInfo.value.type == 2) {
      Usertype.value = true;
      let result1 = await getStuInfo(selfInfo.value.username);
      stuInfo.value = result1.data;
    } else if (selfInfo.value.type == 1) {
      Usertype.value = true;

      let result1 = await getTeacherInfo(selfInfo.value.username);
      console.log(result1.data);
      teaInfo.value = result1.data;
    }
  } catch (error) {
    console.error("Failed to fetch account info:", error);
  }
};
const updateTea = async () => {
  let result = await updateTeaService(teaInfo.value);
  getAccInfo();
  teaSelfVisible.value = false;
  location.reload();
};
const updateStu = async () => {
  let result = await updateStuService(stuInfo.value);
  getAccInfo();
  stuSelfVisible.value = false;
  location.reload();
};
const handleCommand = (command) => {
  if (command === "logout") {
    ElMessageBox.confirm("你确认退出？", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        tokenStore.removeToken();
        userInfoStore.removeInfo();
        router.push("/login");
        ElMessage({
          type: "success",
          message: "退出登录成功",
        });
      })
      .catch((e) => {
        console.log(e);
        ElMessage({
          type: "info",
          message: "用户退出取消",
        });
      });
  } else if (command === "selfShift") {
    const type = selfInfo.value.type;

    if (type == 2) {
      stuSelfVisible.value = true;
    } else if (type == 1) {
      teaSelfVisible.value = true;
    } else if (type == 0) {
      adminSelfVisible.value = true;
    }
  } else {
    const type = selfInfo.value.type;
    if (type == 2) {
      router.push("/stu");
    } else if (type == 1) {
      router.push("/tea");
    } else if (type == 0) {
      router.push("/admin/course");
    }
  }
};
onMounted(() => {
  getAccInfo();
});
</script>

<style scoped>
.headBar {
  color: white;
  width: 100%;
  height: 50px;
  background-color: #16243d;
}
.el-header {
  display: flex;
  float: right;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
.el-dropdown__box {
  display: flex;
  align-items: center;
}
.el-icon {
  color: #999;
  margin-left: 10px;
}
.el-dropdown__box:active,
.el-dropdown__box:focus {
  outline: none;
}
</style>
