export default {
  pageIsHidden: state => state.page.isHidden,
  userIsLogin: state => state.user.userIsLogin,
  activeName: state => state.collapse.activeName,// 设置getters实时监听state值的变化 类似vue中的computed
}
