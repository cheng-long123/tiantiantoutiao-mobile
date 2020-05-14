
//  用户请求
// 引入request
import request from '@/utils/request'
/* 全部频道 */
export const getAllchannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
/* 添加频道 */
export const addUserChannel = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}

/* 删除用户指定频道 */
export const delUserChannels = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
