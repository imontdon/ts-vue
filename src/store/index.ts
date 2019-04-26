import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import getters from './getters'
import page from './modules/page'
Vue.use(Vuex)
export default new Vuex.Store({
  getters,
  modules: {
    page
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})
