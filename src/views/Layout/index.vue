<template>
  <div class="layout">
    <nav-bar :routes='routes'></nav-bar>
    <div class="main-content">
      <div class="l_content f_l border">
        <app-main></app-main>
      </div>
      <div class="r_content f_r">
        <side-bar></side-bar>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import routes from '../../router/defaultRoutes'
import navBar from '../../components/nav/index.vue'
import AppMain from './appMain.vue'
import SideBar from './sideBar.vue'
@Component({
  components: {
    navBar,
    AppMain,
    SideBar
  }
})
export default class Layout extends Vue {
  routes = routes
  mounted(){
    console.log(this.routes)
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
