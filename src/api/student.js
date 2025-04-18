import request from '@/utils/request.js'
export const stuFill=(fillData)=>{
 
   return  request.post('/student/newInfo',fillData);
}
export const getStuInfo=(stuId)=>{
   return request.get('/student/search?stuId='+stuId)
}
export const getAllStuService=(classId)=>{
   return request.get("/student/getAllStu?classId="+classId)
}
export const delStudentService=(stuId,classId)=>{
   return request.delete("/class/delFromClass?stuId="+stuId+"&classId="+classId)
}
export const newSingleStuService=(newStu)=>{
   const params=new URLSearchParams();
   for(let key in newStu){
       params.append(key,newStu[key])
   }
   return request.post("/class/addStu",params)
}
export const updateStuService=(stuForm)=>{
   return request.put('/student/updateInfo',stuForm);
 }