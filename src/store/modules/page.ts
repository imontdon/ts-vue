import { Commit } from 'vuex'
import types from '../mutation-types'
import { Page } from '../interface'
const state: Page = {
  isHidden: false
}
const mutations: any = {
  [types.IS_HIDDEN] (state: Page, isHidden: boolean) {
    state.isHidden = isHidden
  }
}
const actions: any = {
  pageIsHidden (context: {
    commit: Commit
  }, isHidden: boolean) {
    context.commit(types.IS_HIDDEN, isHidden)
  }
}

export default {
  state,
  mutations,
  actions
}
