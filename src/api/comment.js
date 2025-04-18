import  request from '@/utils/request.js'
export const getComments=(classId)=>{
  return  request.get('/comment/getSingle?classId='+classId)
}
export const sendComment=(comment)=>{
 
 return request.post("/comment/newComment",comment)
}
export const replyComment=(comment)=>{
  return request.post("/comment/reply",comment)
}
export const delCommentService=(commentId)=>{
    return request.delete("/comment/del?commentId="+commentId)
}