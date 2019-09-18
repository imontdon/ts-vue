// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './common/fonts/id-icon.css'
import './common/iconfont/fonts/iconfont.css'
import setState from './utils/setState'
import IDMessage from './components/message/message'
import directives from './directives/index'
console.log(directives)
// import permission from './permission'
Vue.config.productionTip = false
Vue.prototype.$setState = setState
Vue.use(IDMessage)
Vue.use(directives.loadingDirective)
// Vue.use(vMessage)
/* eslint-disable no-new */
let v = new Vue({
  el: '#app',
  router,
  store,
  // permission,
  components: { App },
  template: '<App/>'
})
