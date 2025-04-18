import request from '@/utils/request.js'
export const getAllClassAndCourse=()=>{
  return  request.get('/class/getAllClass')
}
export const getSummaryScore=(classId,stuId)=>{
  return request.get('/class/getSummaryScore?classId='+classId+'&stuId='+stuId)
}
export const teacherGetClassCourseService=()=>{
  return request.get('/class/teaGetClass')
}
export const newCourseService=(course)=>{
  return request.post('/course/add',course)
}
export const newClassService=(newClass)=>{
  return request.post('/class/add',newClass)
}
export const getSingleCourseInfoService=(courseId)=>{
return request.get("/course/info?courseId="+courseId)
}
export const updateCourseInfoService=(course)=>{
  return request.put('/course/update',course)
}
export const updateSyllabusService = (pdfUrl, courseId) => {
  return request.put('/course/updateSyllabus', null, {
    params: {
      pdfUrl: pdfUrl,
      courseId: courseId
    }
  })};
  export const uploadScoreService=(scoreForm)=>{
    const params=new URLSearchParams();
    for(let key in scoreForm){
        params.append(key,scoreForm[key])
    }
return request.put('/class/finalScore',params)
  }