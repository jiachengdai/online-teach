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
    if (response.code === 200) {
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
    if (response.code === 200) {
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
    if (response.code === 200) {
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
    if (response.code === 200) {
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
    if (response.code === 200) {
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
    if (response.code === 200) {
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
