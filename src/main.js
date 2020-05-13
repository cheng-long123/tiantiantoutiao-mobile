import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant组件
import Vant from 'vant'
import dayjs from '@/utils/dayjs'
import 'vant/lib/index.css'
// 自动设置 REM REM适配（根据html字体大小）
import 'amfe-flexible'
// 加载全局样式
import '@/style/index.less'
// 注册vant
Vue.use(Vant)
Vue.config.productionTip = false

// 创建vue根实例
new Vue({
  router,
  dayjs,
  store,
  render: h => h(App)
}).$mount('#app')
