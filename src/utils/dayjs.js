import Vue from 'vue'

// 初始化dayjs
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// 配置中文语言包
dayjs.locale('zh-cn')
// 过滤器
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
