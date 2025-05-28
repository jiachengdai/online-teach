import request from '@/utils/request'

/**
 * 获取课程章节列表
 * @param {string} courseId 课程ID
 * @returns {Promise} 请求结果
 */
export function getChaptersByCourse(courseId) {
  return request({
    url: `/teacher/chapter/list/${courseId}`,
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
    url: `/teacher/chapter/files/${chapterId}`,
    method: 'get'
  })
}

/**
 * 添加课程章节
 * @param {Object} chapterData 章节数据
 * @returns {Promise} 请求结果
 */
export function addChapter(chapterData) {
  return request({
    url: '/teacher/chapter/add',
    method: 'post',
    data: chapterData
  })
}

/**
 * 删除课程章节
 * @param {number} chapterId 章节ID
 * @returns {Promise} 请求结果
 */
export function deleteChapter(chapterId) {
  return request({
    url: `/teacher/chapter/delete/${chapterId}`,
    method: 'delete'
  })
}

/**
 * 删除章节文件
 * @param {number} fileId 文件ID
 * @returns {Promise} 请求结果
 */
export function deleteChapterFile(fileId) {
  return request({
    url: `/teacher/chapter/file/delete/${fileId}`,
    method: 'delete'
  })
}

/**
 * 上传章节文件
 * @param {FormData} formData 表单数据
 * @returns {Promise} 请求结果
 */
export function uploadChapterFile(formData) {
  return request({
    url: '/teacher/chapter/file/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}