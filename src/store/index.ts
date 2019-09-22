import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import getters from './getters'
import page from './modules/page'
import user from './modules/user'
import card from './modules/card'
import collapse from './modules/collapse/collapse'

Vue.use(Vuex)
export default new Vuex.Store({
  getters,
  modules: {
    page,
    user,
    card,
    collapse
  },
  plugins: process.env.NODE_ENV !== 'production' ? [ createLogger() ] : []
})
