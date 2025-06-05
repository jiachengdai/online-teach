//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus'

//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({baseURL})
 const router={push:()=>{}}
 export function setRouter(r){
    router.push=r.push;
 }
//添加响应拦截器
instance.interceptors.response.use(
    result=>{
        // 判断业务状态码
        if(result.data.code===0){
            return result.data;
        }
        else if(result.data.result !== undefined){
            return result.data;
        }
      //  alert(result.data.msg?result.data.msg:'服务异常')
       ElMessage.error(result.data.message?result.data.message:'服务异常') 
        return Promise.reject(result.data);
    },
    err=>{
        if(err.response.status===401){
            ElMessage.error("请先登陆")
            router.push('/login')
        }
        else{
        ElMessage.error("服务异常")}
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)
import { useTokenStore } from '@/stores/token'
instance.interceptors.request.use(
    (config)=>{
        // 请求前的回调
      const tokenStore=  useTokenStore();
      if(tokenStore.token){
        config.headers.Authorization=tokenStore.token
      }
      return config;
    },
    (err)=>{
        Promise.reject(err)
    }
)
export default instance;