<template>
  <div class="layout">
    <app-main></app-main>
    <!-- <nav-bar :routes='routes'></nav-bar>
    <div class="main-content">
      <div class="l_content f_l">
        <app-main></app-main>
      </div>
      <div class="r_content f_r">
        <side-bar></side-bar>
      </div>
    </div> -->
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import routes from '../../router/defaultRoutes'
import navBar from '../../components/nav/index.vue'
import AppMain from './appMain.vue'
import SideBar from './sideBar.vue'
import { Board, Stars, Meteor } from '../../utils/canvas'
import { Getter, Action } from 'vuex-class'

import { loginCheck } from '../../api/login'

interface res {
  errNum?: number
}

@Component({
  components: {
    navBar,
    AppMain,
    SideBar
  }
})
export default class Layout extends Vue {
  @Action isLogin
  routes = routes
  mounted(){
    if (localStorage.getItem('user')) {
      const user = localStorage.getItem('user')
      loginCheck('/user/checkLogin', { user }).then(res => {
        if (res.data.ret_code === 0) {
          this.isLogin(true)
        } else {
          this.isLogin(false)
        }
        
      })
    }
  }
  
  @Watch("$route")
  routeChange(newRoute: Object, oldRoute: Object) {
    console.log(newRoute)
  }
 
}
</script>

<style lang='scss'>
 @import '@/assets/css/layout/index.scss';
</style>
