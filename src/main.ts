// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './common/fonts/elm-icon.css'
// import permission from './permission'
Vue.config.productionTip = false

/* eslint-disable no-new */
let v = new Vue({
  el: '#app',
  router,
  store,
  // permission,
  components: { App },
  template: '<App/>'
})
