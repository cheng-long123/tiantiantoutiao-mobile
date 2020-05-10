/* 本地存储 */
// 存储
export const setUser = (value, name) => {
// 如果values是对象就转换为字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
// 获取
export const getUser = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 删除
export const remoUser = name => {
  window.localStorage.removeItem(name)
}
