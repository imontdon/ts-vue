import router from '@/router/index'
// import NProgress from 'nprogress'
// import { getToken } from './utils/auth'
// import 'nprogress/nprogress.css'
// import store from '@/store'

export default router.beforeEach((to, from, next) => {
  document.oncontextmenu = function() {
    return false;
  };
  document.onkeydown = function(event) {
    if (event && event.keyCode == 123) {
      event.returnValue = false;
      return false;
    }
  };
  // NProgress.start()
  /* if (!getToken()) {
    // 白名单存在说明可以访问如404,login等界面
    if (store.getters.whiteList.some(item => item.path === to.path)) {
      next()
    } else {
      // 不存在统一给白名单添加login界面（避免死循环）
      if (!store.getters.whiteList.some(item => item.path === '/')) {
        store.dispatch('addWhiteList', {path: '/', name: '操作'})
      }
      next('/')
    }
  } else {
    next()
  } */
  // next()
  document.title = to.name
  // auth 问题
  // NProgress.done()
})
