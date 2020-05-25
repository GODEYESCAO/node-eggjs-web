import fetch from './fetch';

export default {
  // 登录
  login(params) { 
    return fetch.post('/login', params)
  },

  // 验证管理员token
  auth(params) {
    return fetch.get('/auth', params)
  },

  // 注册管理员 
  register(params){
    console.log(params)
    return fetch.post('/register', params)
  }
}
