import request from '@/utils/request.js'
export const adminFill=(fillData)=>{
   
   return  request.post('/admin/new',fillData);
}
export const adminGetStuService=()=>{
   return request.get('/admin/getStu');
}

export const adminDelStuService=(stuId,accId)=>{
   return request.delete("/admin/delStu?stuId="+stuId+"&accId="+accId);
}
export const adminGetTeaService=()=>{
   return request.get('/admin/getTea');
}
 export const adminGetCourseService=()=>{
   return request.get('/admin/getCourse');}