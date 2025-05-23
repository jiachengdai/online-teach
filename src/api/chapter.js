import request from '@/utils/request'

/**
 * 获取课程章节列表
 * @param {string} courseId 课程ID
 * @returns {Promise} 请求结果
 */
export function getChaptersByCourse(courseId) {
  return request({
    url: `/chapter/list/${courseId}`,
    method: 'get'
  })
}

/**
 * 获取章节文件列表
 * @param {number} chapterId 章节ID
 * @returns {Promise} 请求结果
 */
export function getChapterFiles(chapterId) {
  return request({
    url: `/chapter/files/${chapterId}`,
    method: 'get'
  })
}

/**
 * 更新章节完成状态
 * @param {Object} data 请求数据
 * @param {number} data.chapterId 章节ID
 * @param {boolean} data.completed 是否完成
 * @returns {Promise} 请求结果
 */
export function updateChapterProgress(data) {
  return request({
    url: '/chapter/progress',
    method: 'post',
    data
  })
}

/**
 * 上传章节文件
 * @param {FormData} formData 表单数据
 * @returns {Promise} 请求结果
 */
export function uploadChapterFile(formData) {
  return request({
    url: '/chapter/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}