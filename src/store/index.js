import Vue from 'vue'
import Vuex from 'vuex'
import { setUser, getUser } from '@/utils/storage.js'

Vue.use(Vuex)
const USER_KEY = 'toutiao-user'
export default new Vuex.Store({
  state: {
    user: getUser(USER_KEY)
    // user: JSON.parse(window.localStorage.getItem('user'))
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // window.localStorage.setItem('user', JSON.stringify(data))
      setUser(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
