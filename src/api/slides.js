import request from '@/utils/request.js'
export const getSlides=(courseId)=>{
    return request.get('/slides/getSlides?courseId='+courseId)
}
export const uploadSlidesService=(newSlide)=>{
    return request.post('/slides/add',newSlide)
}