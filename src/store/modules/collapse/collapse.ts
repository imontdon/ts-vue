import { Commit } from 'vuex'
import { Name } from '../../interface'
import { ACTIVE_NAME } from './type' // export导出则需要加花括号

// 01-设置全局的state访问对象
const state: Name = {
  activeName: ''
}
// 02-设置getters实时监听state值的变化 类似vue中的computed
const getters: any = {
  activeName: state => state.collapse.activeName
}
// 03-设置同步函数mutation来更改state的属相值
const mutations: any = {
  [ACTIVE_NAME] (state: Name, activeName: string | number) {
    state.activeName = activeName
    console.log(activeName,'hhhk')
  }
}
// 04-设置异步函数Actio来异步触发mutations中的方法
const actions: any = {
    // context: context与store对象具有相同的实例和方法
  activeNameHandle (context: {commit: Commit}, activeName: string | number): any {
    context.commit(ACTIVE_NAME, activeName)
  }
}
export default{
  state,
  getters,
  mutations,
  actions
}
