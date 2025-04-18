import request from '@/utils/request.js'
export const getTestInfo=(classId)=>{
return request.get("/paper/class?type=0&classId="+classId)
}
export const getScoreState=(paperId,stuId)=>{
    return request.get("/paper/getState?paperId="+paperId+"&username="+stuId)
}
export const getChoose=(paperId)=>{
    return request.get("/makePaper/getAllChoose?paperId="+paperId)
}
export const getBlank=(paperId)=>{
    return request.get("/makePaper/getAllBlank?paperId="+paperId)
}
export const getJudge=(paperId)=>{
    return request.get("/makePaper/getAllJudge?paperId="+paperId)
}
export const getShortAns=(paperId)=>{
    return request.get("/makePaper/getAllShortAns?paperId="+paperId)
}
export const submitTestAnswers=(answerSubimit)=>{
return request.post("/ans/newAns",answerSubimit)
}
export const newTestRecord=(record)=>{
    const params=new URLSearchParams();
    for(let key in record){
        params.append(key,record[key])
    }
return request.post('/exam/addRecord',params)
}
export const getExamRecord=(stuId,paperId)=>{
    return request.get("/exam/singleExam?stuId="+stuId+"&paperId="+paperId)
}
export const getChooseAnsAndMyAns=(paperExeId)=>{
     return request.get("/exam/getAnsAndMyRecord?paperExeId="+paperExeId+"&type=0")
}
export const getBlankAnsAndMyAns=(paperExeId)=>{
 return request.get("/exam/getAnsAndMyRecord?paperExeId="+paperExeId+"&type=1")
}
export const getJudgeAnsAndMyAns=(paperExeId)=>{
     return request.get("/exam/getAnsAndMyRecord?paperExeId="+paperExeId+"&type=2")
   }
export const getShortAnsAndMyAns=(paperExeId)=>{
        return request.get("/exam/getAnsAndMyRecord?paperExeId="+paperExeId+"&type=3")
  }
  export const getObjectScore=(paperId,stuId)=>{
    return request.get("/exam/getObjectScore?paperId="+paperId+"&stuId="+stuId)
  }