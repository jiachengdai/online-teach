import request from '@/utils/request.js'

// 用户注册：使用 JSON 格式
export const userRegisterService = (registerData) => {
  return request.post('/account/register', registerData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// 用户登录：使用 JSON 格式
export const userLoginService = (loginData) => {
  return request.post('/account/login', loginData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// 获取用户信息
export const userInfoService = () => {
  return request.get('/account');
};

// 上传头像：使用 multipart/form-data
export const uploadPic = (formData) => {
  return request.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 更新头像地址（URL 作为参数传递）
export const updateAvatarService = (imgUrl) => {
  return request.patch('/account/avatar?imgUrl=' + imgUrl);
};
