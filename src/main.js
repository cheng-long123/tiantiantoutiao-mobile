import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import '@/style/index.less'
Vue.config.productionTip = false

// 创建vue根实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
