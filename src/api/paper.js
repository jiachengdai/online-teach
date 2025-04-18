import request from '@/utils/request.js'
export const newPaperService=(paperForm)=>{
    return request.post("/paper/new",paperForm)
}
export const makePaperService=(paperExeForm)=>{
    return request.post("/makePaper/new",paperExeForm)
}
export const getPaperExeService=(paperId)=>{
    return request.get("/makePaper/info?paperId="+paperId)
}
export const delPaperExeService=(paperExeId)=>{
return request.delete("/makePaper/del?paperExeId="+paperExeId)
}