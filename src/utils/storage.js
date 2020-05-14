/* 本地存储 */
// 存储
export const setItem = (name, value) => {
// 如果values是对象就转换为字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
// 获取
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 删除
export const remoItem = name => {
  window.localStorage.removeItem(name)
}
