import loadingDirective from './loading'

export default {
  install (Vue) {
    Vue.use(loadingDirective)
  },
  loadingDirective
}
