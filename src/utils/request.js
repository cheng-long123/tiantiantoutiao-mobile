import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'
// 请求模块
const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [function (data) {
    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return jsonBig.parse(data)
    } catch (err) {
      // console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }

    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }]
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  const status = error.response.status
  if (status === 400) {
    Toast('客户端请求参数错误无')
  } else if (status === 401) {
    const { user } = store.state
    if (!user || !user.token) {
      return reidrectLogin()
    }
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      user.token = data.data.token
      store.commit('setUser', user)
      return request(error.config)
    } catch (err) {
      reidrectLogin()
    }
    Toast('登录过期，请重新登录')
  } else if (status === 403) {
    Toast('没有操作权限')
  } else if (status >= 500) {
    Toast('服务器异常')
  }

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

function reidrectLogin () {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
// 导出request
export default request
