//  用户请求
// 引入request
import request from '@/utils/request'
// 用户登陆
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data

  })
}
// 发送验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`

  })
}
// 获取登录用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
// 获取用户频道
export const getUserchannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 关注用户
export const addFollowed = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 取消关注用户
export const delFollowed = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
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
