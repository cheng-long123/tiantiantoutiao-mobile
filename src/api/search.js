/* 搜索相关的模块 */
// 引入request
import request from '@/utils/request'
// 获取文章
export const getAssociateSuggest = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
