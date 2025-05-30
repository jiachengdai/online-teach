<script setup>
import { ref, onMounted } from 'vue'
import { useCourseInfoStore } from '@/stores/course'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getChaptersByCourse, addChapter, deleteChapter, uploadChapterFile, getChapterFiles, deleteChapterFile } from '@/api/teacherChapter'
import { genFileId } from 'element-plus'

const courseInfoStore = useCourseInfoStore()
const chapters = ref([])
const addChapterDialogVisible = ref(false)
const uploadDialogVisible = ref(false)
const filesDialogVisible = ref(false)
const currentChapter = ref(null)
const chapterFiles = ref([])

const uploadRef = ref(null)
const fileList = ref([])

const chapterForm = ref({
  title: '',
  orderNum: 1,
  description: ''
})

const fileForm = ref({
  fileName: '',
  fileType: '',
  description: '',
  file: null
})

onMounted(async () => {
  await loadChapters()
})

async function loadChapters() {
  try {
    const courseId = courseInfoStore.info.courseId
    if (!courseId) {
      ElMessage.error('课程ID无效')
      console.error('课程ID无效，无法获取章节列表')
      return
    }
    const response = await getChaptersByCourse(courseId)
    if (response.code === 0) {
      chapters.value = response.data
    } else {
      console.error('获取章节列表失败，接口返回：', response)
      ElMessage.error('获取章节列表失败：' + (response.msg || '未知错误'))
    }
  } catch (error) {
    console.error('加载章节失败，捕获异常：', error)
    ElMessage.error('加载章节失败：' + (error.message || '未知错误'))
  }
}

function showAddChapterDialog() {
  chapterForm.value = {
    title: '',
    orderNum: 1,
    description: ''
  }
  addChapterDialogVisible.value = true
}

async function handleAddChapter() {
  try {
    const courseId = courseInfoStore.info.courseId
    if (!courseId) {
      ElMessage.error('课程ID无效')
      console.error('课程ID无效，无法添加章节')
      return
    }
    const chapterData = {
      ...chapterForm.value,
      courseId: courseId
    }
    const response = await addChapter(chapterData)
    if (response.code === 0) {
      ElMessage.success('添加章节成功')
      addChapterDialogVisible.value = false
      await loadChapters()
    } else {
      console.error('添加章节失败，接口返回：', response)
      ElMessage.error('添加章节失败：' + (response.msg || '未知错误'))
    }
  } catch (error) {
    console.error('添加章节失败，捕获异常：', error)
    ElMessage.error('添加章节失败：' + (error.message || '未知错误'))
  }
}

async function handleDeleteChapter(chapter) {
  try {
    await ElMessageBox.confirm('确定要删除该章节吗？', '提示', {
      type: 'warning'
    })
    const response = await deleteChapter(chapter.chapterId)
    if (response.code === 0) {
      ElMessage.success('删除章节成功')
      await loadChapters()
    } else {
      console.error('删除章节失败，接口返回：', response)
      ElMessage.error('删除章节失败：' + (response.msg || '未知错误'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除章节失败，捕获异常：', error)
      ElMessage.error('删除章节失败：' + (error.message || '未知错误'))
    }
  }
}

function showUploadDialog(chapter) {
  currentChapter.value = chapter
  fileForm.value = {
    fileName: '',
    fileType: '',
    description: '',
    file: null
  }
  fileList.value = []
  if (uploadRef.value) {
    uploadRef.value.clearFiles()
  }
  uploadDialogVisible.value = true
}

function handleFileChange(uploadFile, uploadFiles) {
  fileForm.value.file = uploadFile.raw
  if (!fileForm.value.fileName) {
    fileForm.value.fileName = uploadFile.name
  }
  fileList.value = [uploadFile]
}

const handleExceed = (files) => {
  if (uploadRef.value) {
    uploadRef.value.clearFiles()
  }
  const file = files[0]
  file.uid = genFileId()
  if (uploadRef.value) {
    uploadRef.value.handleStart(file)
  }
}

async function handleUploadFile() {
  if (!fileForm.value.file) {
    ElMessage.warning('请选择要上传的文件')
    return
  }

  try {
    const formData = new FormData()
    formData.append('file', fileForm.value.file)
    formData.append('chapterId', currentChapter.value.chapterId)
    formData.append('fileName', fileForm.value.fileName)
    formData.append('fileType', fileForm.value.fileType)
    formData.append('description', fileForm.value.description)

    const response = await uploadChapterFile(formData)
    if (response.code === 0) {
      ElMessage.success('上传文件成功')
      uploadDialogVisible.value = false
      await loadChapters()
    } else {
      console.error('上传文件失败，接口返回：', response)
      ElMessage.error('上传文件失败：' + (response.msg || '未知错误'))
    }
  } catch (error) {
    console.error('上传文件失败，捕获异常：', error)
    ElMessage.error('上传文件失败：' + (error.message || '未知错误'))
  }
}

async function showFilesDialog(chapter) {
  currentChapter.value = chapter
  try {
    const response = await getChapterFiles(chapter.chapterId)
    if (response.code === 0) {
      chapterFiles.value = response.data
      filesDialogVisible.value = true
    } else {
      console.error('获取文件列表失败，接口返回：', response)
      ElMessage.error('获取文件列表失败：' + (response.msg || '未知错误'))
    }
  } catch (error) {
    console.error('获取文件列表失败，捕获异常：', error)
    ElMessage.error('获取文件列表失败：' + (error.message || '未知错误'))
  }
}

async function handleDeleteFile(file) {
  try {
    await ElMessageBox.confirm('确定要删除该文件吗？', '提示', {
      type: 'warning'
    })
    const response = await deleteChapterFile(file.fileId)
    if (response.code === 0) {
      ElMessage.success('删除文件成功')
      await showFilesDialog(currentChapter.value)
      await loadChapters()
    } else {
      console.error('删除文件失败，接口返回：', response)
      ElMessage.error('删除文件失败：' + (response.msg || '未知错误'))
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除文件失败，捕获异常：', error)
      ElMessage.error('删除文件失败：' + (error.message || '未知错误'))
    }
  }
}

function openFile(fileUrl) {
  window.open(fileUrl, '_blank')
}

function getFileTypeName(fileType) {
  const typeMap = {
    video: '视频',
    ppt: '幻灯片',
    pdf: 'PDF文档',
    other: '其他'
  }
  return typeMap[fileType] || '未知类型'
}
</script>

<template>
  <div class="chapter-manage-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>章节管理</span>
          <el-button type="primary" @click="showAddChapterDialog">添加章节</el-button>
        </div>
      </template>
      <el-table :data="chapters" style="width: 100%">
        <el-table-column prop="orderNum" label="章节顺序" width="100"></el-table-column>
        <el-table-column prop="title" label="章节标题"></el-table-column>
        <el-table-column prop="description" label="章节描述"></el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button size="small" @click="showUploadDialog(scope.row)">上传文件</el-button>
            <el-button size="small" @click="showFilesDialog(scope.row)">查看文件</el-button>
            <el-button size="small" type="danger" @click="handleDeleteChapter(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加章节对话框 -->
    <el-dialog v-model="addChapterDialogVisible" title="添加章节" width="500px">
      <el-form :model="chapterForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="chapterForm.title"></el-input>
        </el-form-item>
        <el-form-item label="顺序">
          <el-input-number v-model="chapterForm.orderNum" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="chapterForm.description"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addChapterDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAddChapter">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 上传文件对话框 -->
    <el-dialog v-model="uploadDialogVisible" title="上传章节文件" width="500px">
      <el-form :model="fileForm" label-width="80px">
        <el-form-item label="文件名">
          <el-input v-model="fileForm.fileName"></el-input>
        </el-form-item>
        <el-form-item label="文件类型">
          <el-select v-model="fileForm.fileType" placeholder="请选择文件类型">
            <el-option label="视频" value="video"></el-option>
            <el-option label="幻灯片" value="ppt"></el-option>
            <el-option label="PDF文档" value="pdf"></el-option>
            <el-option label="其他" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="fileForm.description"></el-input>
        </el-form-item>
        <el-form-item label="文件">
          <el-upload
            ref="uploadRef"
            class="upload-demo"
            :auto-upload="false"
            :on-change="handleFileChange"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :limit="1"
          >
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip">单个文件大小不超过100MB</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="uploadDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleUploadFile">上传</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 查看文件对话框 -->
    <el-dialog v-model="filesDialogVisible" title="章节文件" width="600px">
      <el-table :data="chapterFiles" style="width: 100%">
        <el-table-column prop="fileName" label="文件名"></el-table-column>
        <el-table-column label="文件类型">
          <template #default="scope">
            {{ getFileTypeName(scope.row.fileType) }}
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="openFile(scope.row.fileUrl)">查看</el-button>
            <el-button link type="danger" size="small" @click="handleDeleteFile(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="filesDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped>
.chapter-manage-container {
  width: 85%;
  height: 100vh; /* 高度填满视口 */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 16px;
  background-color: #f5f5f5;
  overflow: auto;
}

.box-card {
  width: 100%;
  flex: 1;
  overflow: auto;
}
</style>

