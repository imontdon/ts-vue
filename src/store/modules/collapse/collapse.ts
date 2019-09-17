// import { Commit } from 'vuex'
// import types from '../mutation-types'

import {ACTIVE_NAME} from './type' // export导出则需要加花括号
// 01-设置全局的state访问对象
const state: {activeName : string | number | string[] | number[]} = {
    activeName: ''
}
// 02-设置getters实时监听state值的变化 类似vue中的computed
const getters: any = {
    activeName: state => state.collapse.activeName,
}
// 03-设置同步函数mutation来更改state的属相值
const mutation: any = {
    // [ACTIVE_NAME] ()
}
export default{
    state,
    getters,
    mutation,
}