import request from '@/utils/request.js'

export const userRegisterService=(registerData)=>{
    // 借助urlsearchparam
    const params=new URLSearchParams();
    for(let key in registerData){
        params.append(key,registerData[key])
    }
   return  request.post('/account/register',params);
}
export const userLoginService=(loginData)=>{
   const params= new URLSearchParams();
   for(let key in loginData){
    params.append(key,loginData[key])
   }
   return request.post('/account/login',params)
    
}
export const userInfoService=()=>{
  return  request.get('/account');
}
 
  
export const uploadPic=(formData)=>{
 return request.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}
export const updateAvatarService=(imgUrl)=>{
  return request.patch('/account/avatar?imgUrl='+imgUrl);
}
