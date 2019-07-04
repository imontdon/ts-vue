import { Commit } from 'vuex'
import types from '../mutation-types'
import { User } from '../interface'

const state: User = {
  userIsLogin: false,
  info: {
    id: -1,
    username: '',
    real_name: ''
  }
}

const mutations: any = {
  [types.USER_IS_LOGIN] (state: User, userIsLogin: boolean) {
    state.userIsLogin = userIsLogin
  }
}

const actions: any = {
  userIsLogin (context: {
    commit: Commit
  }, userIsLogin: boolean) {
    context.commit(types.USER_IS_LOGIN, userIsLogin)
  }
}

export default {
  state,
  mutations,
  actions
}
