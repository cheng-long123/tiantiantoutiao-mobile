// 评论相关的接口
// 引入request
import request from '@/utils/request'

// 获取文章的评论
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
// 对评论和评论回复点赞
export const addLikings = likingsId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: likingsId
    }
  })
}
// 取消对评论和评论回复点赞
export const delLikings = likingsId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${likingsId}`
  })
}
// 添加评论或评论回复
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
