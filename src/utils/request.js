import axios from 'axios'
// 请求模块
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 请求拦截器

// 响应拦截器

// 到处request
export default request
