import Vue from 'vue'
import axios from 'axios'
import router from '@/router'

//请求前置拦截
axios.interceptors.request.use(config => {

  if (process.env.VUE_APP_API_SOURCE === 'dev') {
    config.baseURL = window.api.dev.server
  }

  if (process.env.VUE_APP_API_SOURCE === 'test') {
    config.baseURL = window.api.test.server
  }

  if (process.env.VUE_APP_API_SOURCE === 'prod') {
    config.baseURL = window.api.prod.server
  }

  // 配置授权头 【样例】
  // if (config.url.replace(config.baseURL, '') !== '/login') {
  //   config.headers.accesstoken = UserStatus.getToken()
  // }
  return config
}, error => {
  return Promise.reject(error)
})

//请求响应后置拦截
axios.interceptors.response.use(
  response => {
    // token 无效返回，直接跳转回登陆界面 【样例】
    // if (response.data['Code'] === '-1') {
    //   router.push('/login')
    //   return
    // }
    return response
  },
  error => {
    return Promise.reject(error)
  })

Vue.prototype.$http = axios
