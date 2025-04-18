import request from '@/utils/request.js'
export const teaFill=(fillData)=>{
     
   return  request.post('/teacher/newInfo',fillData);
}
export const getTeacherInfo=(teaId)=>{
  return request.get('/teacher/search?teaId='+teaId);
}
export const updateTeaService=(teaForm)=>{
  return request.put('/teacher/updateInfo',teaForm);
}