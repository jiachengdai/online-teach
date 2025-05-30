<template>
  <div class="chapters-container">
    <div class="chapters-header">
      <h2>课程章节信息</h2>
      <div class="progress-info">
        <span class="progress-text">已完成任务点: {{ completedCount }}/{{ chapters.length }}</span>
        <div class="progress-bar">
          <div class="progress-fill" :style="{width: progressPercent + '%'}"></div>
        </div>
      </div>
    </div>
    
    <div class="chapters-content">
      <div class="chapter-item" v-for="chapter in chapters" :key="chapter.chapterId" @click="showChapterFiles(chapter)">
        <div class="chapter-number">
          <span class="number-circle" :class="chapter.completed > 0 ? 'completed' : ''">
            {{ chapter.orderNum }}
          </span>
        </div>
        <div class="chapter-info">
          <h3 class="chapter-title">{{ chapter.title }}</h3>
          <p class="chapter-description" v-if="chapter.description">{{ chapter.description }}</p>
          <div class="file-count" v-if="chapter.fileCount > 0">
            <i class="el-icon-document"></i> {{ chapter.fileCount }} 个文件
          </div>
        </div>
        <div class="chapter-status">
          <span class="status-text" :class="{'completed-text': chapter.completed > 0}">
            {{ chapter.completed > 0 ? '已完成' : '未完成' }}
          </span>
        </div>
      </div>
    </div>

    <!-- 章节文件对话框 -->
    <el-dialog v-model="fileDialogVisible" :title="currentChapter ? currentChapter.title : '章节文件'" width="700px">
      <div class="chapter-files" v-if="chapterFiles.length > 0">
        <div class="file-item" v-for="file in chapterFiles" :key="file.fileId">
          <div class="file-icon" :class="getFileIconClass(file.fileType)"></div>
          <div class="file-info">
            <h4 class="file-name">{{ file.fileName }}</h4>
            <p class="file-description" v-if="file.description">{{ file.description }}</p>
            <p class="file-type">{{ getFileTypeName(file.fileType) }}</p>
          </div>
          <div class="file-actions">
            <el-button type="primary" size="small" @click="openFile(file.fileUrl)">
              查看
            </el-button>
          </div>
        </div>
      </div>
      <div class="no-files" v-else>
        <p>该章节暂无文件</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="fileDialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="markAsCompleted" :disabled="currentChapter && currentChapter.completed > 0">
            标记为已完成
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useCourseInfoStore } from '@/stores/course'
import { getChaptersByCourse, getChapterFiles, updateChapterProgress } from '@/api/chapter'

const courseStore = useCourseInfoStore()
const chapters = ref([])
const progressPercent = ref(0)
const fileDialogVisible = ref(false)
const currentChapter = ref(null)
const chapterFiles = ref([])

// 假数据 - 当无法获取课程信息时使用
const mockChapters = [
  { chapterId: 1, title: '第一章 课程介绍', orderNum: 1, description: '介绍课程的基本内容和学习目标', completed: 1, fileCount: 2 },
  { chapterId: 2, title: '第二章 基础知识', orderNum: 2, description: '讲解课程的基础理论', completed: 0, fileCount: 1 },
  { chapterId: 3, title: '第三章 进阶内容', orderNum: 3, description: '深入探讨课程核心概念', completed: 0, fileCount: 1 },
  { chapterId: 4, title: '第四章 实践应用', orderNum: 4, description: '通过实例讲解应用场景', completed: 0, fileCount: 1 },
  { chapterId: 5, title: '第五章 前沿技术', orderNum: 5, description: '介绍最新研究成果', completed: 0, fileCount: 0 },
  { chapterId: 6, title: '第六章 总结与展望', orderNum: 6, description: '总结并展望未来', completed: 0, fileCount: 0 }
]

// 计算已完成章节数量
const completedCount = computed(() => {
  return chapters.value.filter(chapter => chapter.completed > 0).length
})

// 计算完成进度
const calculateProgress = () => {
  if (chapters.value.length === 0) return
  progressPercent.value = Math.round((completedCount.value / chapters.value.length) * 100)
}

// 获取课程章节
const getChapters = async () => {
  try {
    const courseInfo = courseStore.info
    console.log('当前课程信息:', courseInfo)
    
    const courseId = courseInfo?.courseId
    if (!courseId) {
      console.warn('未找到课程ID，使用假数据显示')
      ElMessage.warning('未找到课程信息，显示示例数据')
      chapters.value = mockChapters
      calculateProgress()
      return
    }
    
    const response = await getChaptersByCourse(courseId)
    if (response?.code === 0 && Array.isArray(response.data) && response.data.length > 0) {
      chapters.value = response.data
    } else {
      ElMessage.error(response.msg || '获取章节信息失败，显示示例数据')
      chapters.value = mockChapters
    }
  } catch (error) {
    console.error('获取章节信息出错:', error)
    ElMessage.error('获取章节信息失败，显示示例数据')
    chapters.value = mockChapters
  } finally {
    calculateProgress()
  }
}


// 章节文件假数据
const mockChapterFiles = {
  1: [ // 第一章的文件
    { fileId: 1, chapterId: 1, fileName: '课程介绍.pdf', fileUrl: 'http://big-event0713.oss-cn-shanghai.aliyuncs.com/eafd4bfc-0ba1-4c2d-9cb0-231a88a6f180.pdf', fileType: 'pdf', description: '课程介绍文档' },
    { fileId: 2, chapterId: 1, fileName: '课程介绍视频', fileUrl: 'http://example.com/video1.mp4', fileType: 'video', description: '课程介绍视频' }
  ],
  2: [ // 第二章的文件
    { fileId: 3, chapterId: 2, fileName: '基础知识PPT', fileUrl: 'http://staff.ustc.edu.cn/~xlanchen/2011FallOS/slides/0_start.pdf', fileType: 'ppt', description: '基础知识讲解幻灯片' }
  ],
  3: [ // 第三章的文件
    { fileId: 4, chapterId: 3, fileName: '进阶内容讲解', fileUrl: 'http://big-event0713.oss-cn-shanghai.aliyuncs.com/c7e5b17e-5e08-4aa1-9878-e6b0c6764bbc.pptx', fileType: 'ppt', description: '进阶内容讲解幻灯片' }
  ],
  4: [ // 第四章的文件
    { fileId: 5, chapterId: 4, fileName: '实践案例视频', fileUrl: 'http://example.com/video2.mp4', fileType: 'video', description: '实践案例视频讲解' }
  ]
}

// 显示章节文件
const showChapterFiles = async (chapter) => {
  currentChapter.value = chapter
  fileDialogVisible.value = true
  
  try {
    const response = await getChapterFiles(chapter.chapterId)
    if (response.code === 0) {
      chapterFiles.value = response.data
    } else {
      // 使用假数据
      const mockFiles = mockChapterFiles[chapter.chapterId] || []
      chapterFiles.value = mockFiles
      ElMessage.warning((response.msg || '获取章节文件失败') + '，显示示例数据')
    }
  } catch (error) {
    console.error('获取章节文件出错:', error)
    // 使用假数据
    const mockFiles = mockChapterFiles[chapter.chapterId] || []
    chapterFiles.value = mockFiles
    ElMessage.error('获取章节文件失败，显示示例数据')
  }
}

// 获取文件图标类名
const getFileIconClass = (fileType) => {
  switch (fileType) {
    case 'video':
      return 'file-icon-video'
    case 'ppt':
      return 'file-icon-ppt'
    case 'pdf':
      return 'file-icon-pdf'
    default:
      return 'file-icon-default'
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
      return '文件'
  }
}

// 打开文件
const openFile = (url) => {
  window.open(url, '_blank')
}

// 标记章节为已完成
const markAsCompleted = async () => {
  if (!currentChapter.value) return
  
  try {
    const response = await updateChapterProgress({
      chapterId: currentChapter.value.chapterId,
      completed: true
    })
    
    if (response.code === 0) {
      // 更新本地章节状态
      currentChapter.value.completed = 1
      calculateProgress()
      ElMessage.success('章节已标记为完成')
      fileDialogVisible.value = false
      
      // 重新获取章节列表以更新状态
      getChapters()
    } else {
      // 即使API调用失败，也在本地更新状态，提供更好的用户体验
      console.warn('API调用失败，但在本地更新状态:', response)
      currentChapter.value.completed = 1
      calculateProgress()
      ElMessage.warning(response.msg || '服务器操作失败，但已在本地标记为完成')
      fileDialogVisible.value = false
    }
  } catch (error) {
    console.error('标记章节完成状态出错:', error)
    // 即使发生错误，也在本地更新状态
    currentChapter.value.completed = 1
    calculateProgress()
    ElMessage.warning('服务器操作失败，但已在本地标记为完成')
    fileDialogVisible.value = false
  }
}

onMounted(() => {
  getChapters()
})
</script>

<style scoped>
.chapters-container {
  max-width: 1200px;    /* 最大宽度 */
  width: 100%;          /* 宽度撑满父容器 */
  margin: 0 auto;       /* 居中 */
  padding: 20px 40px;   /* 上下20px，左右40px */
  box-sizing: border-box;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.chapters-header {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chapters-header h2 {
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.progress-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-text {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}

.progress-bar {
  width: 160px;    /* 放宽进度条宽度 */
  height: 6px;
  background-color: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #28a745;
  transition: width 0.3s ease;
}

.chapters-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;    /* 宽度撑满 */
  max-width: 100%; /* 去掉最大宽度限制 */
}

.chapter-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
  cursor: pointer;
}

.chapter-item:last-child {
  border-bottom: none;
}

.chapter-item:hover {
  background-color: #f8f9fa;
}

.chapter-number {
  margin-right: 15px;
}

.number-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;      /* 放大数字圈 */
  height: 28px;
  border-radius: 50%;
  background-color: #6c757d;
  color: white;
  font-size: 14px;  /* 字号加大 */
  font-weight: 600;
}

.number-circle.completed {
  background-color: #28a745;
}

.chapter-info {
  flex: 1;
}

.chapter-title {
  margin: 0;
  font-size: 16px;  /* 字号放大 */
  color: #333;
  font-weight: 500;
  line-height: 1.4;
}

.chapter-description {
  margin: 5px 0 0;
  font-size: 14px;  /* 放大描述字体 */
  color: #6c757d;
  line-height: 1.4;
}

.file-count {
  margin-top: 5px;
  font-size: 14px;   /* 放大字体 */
  color: #007bff;
  display: flex;
  align-items: center;
}

.file-count i {
  margin-right: 5px;
}

.chapter-status {
  margin-left: auto;
}

.status-text {
  font-size: 14px;   /* 放大状态字体 */
  color: #6c757d;
  padding: 6px 12px; /* 增大内边距 */
  border-radius: 12px;
  background-color: #f8f9fa;
}

.completed-text {
  color: #28a745;
  background-color: rgba(40, 167, 69, 0.1);
}

/* 文件对话框样式 */
.chapter-files {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background-color: #f8f9fa;
  transition: background-color 0.2s;
}

.file-item:hover {
  background-color: #e9ecef;
}

.file-icon {
  width: 48px;       /* 放大图标 */
  height: 48px;
  border-radius: 8px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;   /* 图标字体加大 */
}

.file-icon-video {
  background-color: #dc3545;
}

.file-icon-ppt {
  background-color: #fd7e14;
}

.file-icon-pdf {
  background-color: #007bff;
}

.file-icon-default {
  background-color: #6c757d;
}

.file-info {
  flex: 1;
}

.file-name {
  margin: 0;
  font-size: 16px;   /* 放大文件名 */
  font-weight: 500;
  color: #333;
}

.file-description {
  margin: 5px 0 0;
  font-size: 14px;
  color: #6c757d;
}

.file-type {
  margin: 5px 0 0;
  font-size: 14px;
  color: #6c757d;
  font-style: italic;
}

.file-actions {
  margin-left: 15px;
}

.no-files {
  text-align: center;
  padding: 30px;
  color: #6c757d;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

</style>