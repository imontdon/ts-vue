import { Commit } from 'vuex'
import types from '../mutation-types'
import { Choose } from '../interface'

const state: Choose = {
  needSelected: true
}

const mutations: any = {
  [types.SELECT_CARD] (state: Choose, flag: boolean) {
    state.needSelected = flag
  }
}

const actions: any = {
  selectCard (context: {
    commit: Commit
  }, flag) {
    context.commit(types.SELECT_CARD, flag)
  }
}

export default {
  state,
  mutations,
  actions
}
