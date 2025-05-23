<template>
  <div class="chapter-manage-container">
    <div class="chapter-manage-header">
      <h2>章节管理</h2>
      <el-button type="primary" @click="showAddChapterDialog">添加章节</el-button>
    </div>
    
    <div class="chapters-list">
      <el-table :data="chapters" style="width: 100%">
        <el-table-column prop="orderNum" label="序号" width="80" />
        <el-table-column prop="title" label="章节标题" />
        <el-table-column prop="description" label="章节描述" />
        <el-table-column prop="fileCount" label="文件数量" width="100" />
        <el-table-column label="操作" width="250">
          <template #default="scope">
            <el-button size="small" @click="showUploadDialog(scope.row)">上传文件</el-button>
            <el-button size="small" type="primary" @click="showFilesDialog(scope.row)">查看文件</el-button>
            <el-button size="small" type="danger" @click="deleteChapter(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- 添加章节对话框 -->
    <el-dialog v-model="addChapterDialogVisible" title="添加章节" width="500px">
      <el-form :model="chapterForm" label-width="100px">
        <el-form-item label="章节标题">
          <el-input v-model="chapterForm.title" placeholder="请输入章节标题"></el-input>
        </el-form-item>
        <el-form-item label="章节序号">
          <el-input-number v-model="chapterForm.orderNum" :min="1" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="章节描述">
          <el-input v-model="chapterForm.description" type="textarea" placeholder="请输入章节描述"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addChapterDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addChapter">确认</el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 上传文件对话框 -->
    <el-dialog v-model="uploadDialogVisible" title="上传文件" width="500px">
      <el-form :model="fileForm" label-width="100px">
        <el-form-item label="文件名称">
          <el-input v-model="fileForm.fileName" placeholder="请输入文件名称"></el-input>
        </el-form-item>
        <el-form-item label="文件类型">
          <el-select v-model="fileForm.fileType" placeholder="请选择文件类型">
            <el-option label="视频" value="video"></el-option>
            <el-option label="幻灯片" value="ppt"></el-option>
            <el-option label="PDF文档" value="pdf"></el-option>
            <el-option label="其他" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件描述">
          <el-input v-model="fileForm.description" type="textarea" placeholder="请输入文件描述"></el-input>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            action="#"
            :auto-upload="false"
            :on-change="handleFileChange"
            :limit="1"
          >
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip">
                支持各种类型的文件，大小不超过50MB
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="uploadDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="uploadFile">上传</el-button>
        </div>
      </template>
    </el-dialog>
    
    <!-- 查看文件对话框 -->
    <el-dialog v-model="filesDialogVisible" :title="currentChapter ? currentChapter.title + ' - 文件列表' : '文件列表'" width="700px">
      <div class="chapter-files" v-if="chapterFiles.length > 0">
        <el-table :data="chapterFiles" style="width: 100%">
          <el-table-column prop="fileName" label="文件名称" />
          <el-table-column prop="fileType" label="文件类型">
            <template #default="scope">
              {{ getFileTypeName(scope.row.fileType) }}
            </template>
          </el-table-column>
          <el-table-column prop="description" label="文件描述" />
          <el-table-column prop="uploadTime" label="上传时间" />
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button size="small" type="primary" @click="openFile(scope.row.fileUrl)">查看</el-button>
              <el-button size="small" type="danger" @click="deleteFile(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="no-files" v-else>
        <p>该章节暂无文件</p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useCourseInfoStore } from '@/stores/course'
import { getChaptersByCourse, getChapterFiles, uploadChapterFile } from '@/api/chapter'
import axios from 'axios'

const courseStore = useCourseInfoStore()
const chapters = ref([])
const chapterFiles = ref([])

// 对话框控制
const addChapterDialogVisible = ref(false)
const uploadDialogVisible = ref(false)
const filesDialogVisible = ref(false)

// 当前选中的章节
const currentChapter = ref(null)

// 章节表单
const chapterForm = ref({
  title: '',
  orderNum: 1,
  description: ''
})

// 文件表单
const fileForm = ref({
  fileName: '',
  fileType: 'pdf',
  description: '',
  file: null
})

// 获取课程章节
const getChapters = async () => {
  try {
    // 从课程信息存储中获取当前课程ID
    const courseId = courseStore.courseInfo.courseId
    if (!courseId) {
      ElMessage.warning('未找到课程信息')
      return
    }
    
    const response = await getChaptersByCourse(courseId)
    if (response.code === 0) {
      chapters.value = response.data
    } else {
      ElMessage.error(response.msg || '获取章节信息失败')
    }
  } catch (error) {
    console.error('获取章节信息出错:', error)
    ElMessage.error('获取章节信息失败')
  }
}

// 显示添加章节对话框
const showAddChapterDialog = () => {
  chapterForm.value = {
    title: '',
    orderNum: chapters.value.length + 1,
    description: ''
  }
  addChapterDialogVisible.value = true
}

// 添加章节
const addChapter = async () => {
  try {
    const courseId = courseStore.courseInfo.courseId
    if (!courseId) {
      ElMessage.warning('未找到课程信息')
      return
    }
    
    const response = await axios.post('/chapter/add', {
      courseId,
      title: chapterForm.value.title,
      orderNum: chapterForm.value.orderNum,
      description: chapterForm.value.description
    })
    
    if (response.data.code === 0) {
      ElMessage.success('添加章节成功')
      addChapterDialogVisible.value = false
      getChapters()
    } else {
      ElMessage.error(response.data.msg || '添加章节失败')
    }
  } catch (error) {
    console.error('添加章节出错:', error)
    ElMessage.error('添加章节失败')
  }
}

// 显示上传文件对话框
const showUploadDialog = (chapter) => {
  currentChapter.value = chapter
  fileForm.value = {
    fileName: '',
    fileType: 'pdf',
    description: '',
    file: null
  }
  uploadDialogVisible.value = true
}

// 处理文件选择
const handleFileChange = (file) => {
  fileForm.value.file = file.raw
}

// 上传文件
const uploadFile = async () => {
  if (!fileForm.value.file) {
    ElMessage.warning('请选择要上传的文件')
    return
  }
  
  if (!fileForm.value.fileName) {
    ElMessage.warning('请输入文件名称')
    return
  }
  
  try {
    const formData = new FormData()
    formData.append('chapterId', currentChapter.value.chapterId)
    formData.append('fileName', fileForm.value.fileName)
    formData.append('fileType', fileForm.value.fileType)
    formData.append('description', fileForm.value.description)
    formData.append('file', fileForm.value.file)
    
    const response = await uploadChapterFile(formData)
    
    if (response.code === 0) {
      ElMessage.success('文件上传成功')
      uploadDialogVisible.value = false
      getChapters()
    } else {
      ElMessage.error(response.msg || '文件上传失败')
    }
  } catch (error) {
    console.error('文件上传出错:', error)
    ElMessage.error('文件上传失败')
  }
}

// 显示文件列表对话框
const showFilesDialog = async (chapter) => {
  currentChapter.value = chapter
  filesDialogVisible.value = true
  
  try {
    const response = await getChapterFiles(chapter.chapterId)
    if (response.code === 0) {
      chapterFiles.value = response.data
    } else {
      chapterFiles.value = []
      ElMessage.warning(response.msg || '获取章节文件失败')
    }
  } catch (error) {
    console.error('获取章节文件出错:', error)
    chapterFiles.value = []
    ElMessage.error('获取章节文件失败')
  }
}

// 删除章节
const deleteChapter = async (chapter) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除该章节吗？删除后将无法恢复，且章节下的所有文件也将被删除。',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    
    const response = await axios.delete(`/chapter/delete/${chapter.chapterId}`)
    
    if (response.data.code === 0) {
      ElMessage.success('删除章节成功')
      getChapters()
    } else {
      ElMessage.error(response.data.msg || '删除章节失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除章节出错:', error)
      ElMessage.error('删除章节失败')
    }
  }
}

// 删除文件
const deleteFile = async (file) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除该文件吗？删除后将无法恢复。',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    
    const response = await axios.delete(`/chapter/file/delete/${file.fileId}`)
    
    if (response.data.code === 0) {
      ElMessage.success('删除文件成功')
      // 重新获取文件列表
      showFilesDialog(currentChapter.value)
    } else {
      ElMessage.error(response.data.msg || '删除文件失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除文件出错:', error)
      ElMessage.error('删除文件失败')
    }
  }
}

// 获取文件类型名称
const getFileTypeName = (fileType) => {
  switch (fileType) {
    case 'video':
      return '视频'
    case 'ppt':
      return '幻灯片'
    case 'pdf':
      return 'PDF文档'
    default:
      return '其他'
  }
}

// 打开文件
const openFile = (url) => {
  window.open(url, '_blank')
}

onMounted(() => {
  getChapters()
})
</script>

<style scoped>
.chapter-manage-container {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.chapter-manage-header {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chapter-manage-header h2 {
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.chapters-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.no-files {
  text-align: center;
  padding: 30px;
  color: #6c757d;
}
</style>