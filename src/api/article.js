// 文章

// 引入request
import request from '@/utils/request'
// 获取文章
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
