import request from '@/utils/request.js'
export const getExamInfo=(classId)=>{
return request.get("/paper/class?type=1&classId="+classId)
}
export const getPaperService=(classId)=>{
    return request.get("/paper/testAndExam?&classId="+classId)
}
export const getStuExamStateService=(paperId)=>{
    return request.get("/exam/getStuExamState?&paperId="+paperId)
}