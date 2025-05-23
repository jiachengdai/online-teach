<template>
  <div class="chapters-container">
    <div class="chapters-header">
      <h2>课程章节信息</h2>
      <div class="progress-info">
        <span class="progress-text">已完成任务点: 1/7</span>
        <div class="progress-bar">
          <div class="progress-fill" :style="{width: progressPercent + '%'}"></div>
        </div>
      </div>
    </div>
    
    <div class="chapters-content">
      <div class="chapter-item" v-for="chapter in chapters" :key="chapter.id">
        <div class="chapter-number">
          <span class="number-circle" :class="chapter.completed ? 'completed' : ''">
            {{ chapter.id }}
          </span>
        </div>
        <div class="chapter-info">
          <h3 class="chapter-title">{{ chapter.title }}</h3>
        </div>
        <div class="chapter-status">
          <span class="status-text">{{ chapter.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// 假数据
const chapters = ref([
  {
    id: 1,
    title: '1.1 课程介绍',
    status: '已完成',
    completed: true
  },
  {
    id: 2,
    title: '1.2 报告1：专业依赖人选专业-计算机科学与技术-海问明',
    status: '未完成',
    completed: false
  },
  {
    id: 3,
    title: '1.3 报告2：专业依赖人选专业-信息安全-李玮',
    status: '未完成',
    completed: false
  },
  {
    id: 4,
    title: '1.4 视频1：计算机大类所有专业介绍',
    status: '未完成',
    completed: false
  },
  {
    id: 5,
    title: '1.5 视频2：计算机科学与技术专业',
    status: '未完成',
    completed: false
  },
  {
    id: 6,
    title: '1.6 视频3：智能科学与技术专业',
    status: '未完成',
    completed: false
  }
])

// 计算进度百分比
const progressPercent = ref(0)

// 计算完成进度
const calculateProgress = () => {
  const completedCount = chapters.value.filter(chapter => chapter.completed).length
  progressPercent.value = Math.round((completedCount / chapters.value.length) * 100)
}

onMounted(() => {
  calculateProgress()
})
</script>

<style scoped>
.chapters-container {
  padding: 20px;
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
  width: 120px;
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
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #6c757d;
  color: white;
  font-size: 12px;
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
  font-size: 14px;
  color: #333;
  font-weight: 500;
  line-height: 1.4;
}

.chapter-status {
  margin-left: auto;
}

.status-text {
  font-size: 12px;
  color: #6c757d;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: #f8f9fa;
}
</style>