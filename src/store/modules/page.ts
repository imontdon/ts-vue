import { Commit } from 'vuex'
import types from '../mutation-types'
import State from '../interface'
const state: State =  {
  isHidden: false
}
const mutations: any = {
  [types.IS_HIDDEN] (state: State, isHidden: Boolean) {
    state.isHidden = isHidden
  }
}
const actions: any = {
  pageIsHidden(context: {
    commit: Commit
  }, isHidden: Boolean) {
    context.commit(types.IS_HIDDEN, isHidden)
  }
}

export default {
  state,
  mutations,
  actions
}
