import { Commit } from 'vuex'
import types from '../mutation-types'
import { User } from '../interface'

const state: User = {
  username: ''
}

const mutations: any = {
  [types.SET_USER] (state: User, user: User) {
    state.username = user.username
  }
}

const actions: any = {
  setUser (context: {
    commit: Commit
  }, user) {
    context.commit(types.SET_USER, user)
  }
}

export default {
  state,
  mutations,
  actions
}
