import request from '@/utils/request.js'
export const getAllExe=(classId)=>{

    return request.get('/exe/getClassExe?classId='+classId)
}
export const newChooseService=(chooseForm)=>{
    return request.post('/choice/add',chooseForm)
}
export const newBlankService=(blankForm)=>{
    return request.post('/blank/add',blankForm)
}
export const newJudgeService=(judgeForm)=>{
    return request.post('/judge/add',judgeForm)
}
export const newShortAnsService=(shortAnsForm)=>{
    return request.post('/shortAns/add',shortAnsForm)
}

export const newExeService=(exeForm)=>{
    const params=new URLSearchParams();
    for(let key in exeForm){
        params.append(key,exeForm[key])
    }
    return request.post('/exe/add',params)
}
export const delChoose=(exeId,chooseId)=>{
    return request.delete("/choice/del?exeId="+exeId+"&chooseId="+chooseId)
}
export const delBlank=(exeId,blankId)=>{
    return request.delete("/blank/del?exeId="+exeId+"&blankId="+blankId)
}
export const delJudge=(exeId,judgeId)=>{
    return request.delete("/judge/del?exeId="+exeId+"&judgeId="+judgeId)
}
export const delShortAns=(exeId,shortAnsId)=>{
    return request.delete("/shortAns/del?exeId="+exeId+"&shortAnsId="+shortAnsId)
}
export const getChoose=(exeId)=>{
    return request.get("/choice/getInfo?exeId="+exeId)
}
export const getBlank=(exeId)=>{
    return request.get("/blank/getInfo?exeId="+exeId)
}
export const getJudge=(exeId)=>{
    return request.get("/judge/getInfo?exeId="+exeId)
}
export const getShortAns=(exeId)=>{
    return request.get("/shortAns/getInfo?exeId="+exeId)
}
export const updateChooseService=(updateChooseForm)=>{
    return request.put("/choice/update",updateChooseForm)
}

export const updateBlankService=(updateBlankForm)=>{
    return request.put("/blank/update",updateBlankForm)
}
export  const updateJudgeService=(updateJudgeForm)=>{
    return request.put("/judge/update",updateJudgeForm)
}
export const updateShortAnsService=(updateShortAnsForm)=>{
    return request.put("/shortAns/update",updateShortAnsForm)
}
