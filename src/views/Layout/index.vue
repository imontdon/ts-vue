<template>
  <div class="layout">
    <div class="web-header">
      <canvas></canvas>
    </div>
    <nav-bar :routes='routes'></nav-bar>
    <div class="main-content">
      <div class="l_content f_l">
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
import { Board, Stars, Meteor } from '../../utils/canvas'

@Component({
  components: {
    navBar,
    AppMain,
    SideBar
  }
})
export default class Layout extends Vue {
  routes = routes
  count: number = 0
  stars: Stars
  meteors: Array<Meteor> = []
  context: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  width: number = 0
  height: number = 0
  board: Board
  mounted(){
    console.log(this.routes)
    this.initCanvas()
    this.draw()
    this.meteorGenerator()
    this.frame()
    window.onresize = () => {
      this.initCanvas()
      // this.draw()
    }
  }
  initCanvas() {
    this.canvas = document.querySelector('canvas') as HTMLCanvasElement
    this.context =  this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.width = window.innerWidth
    this.height = window.innerHeight
  }
  draw() {
    this.board = new Board(this.context, this.width, this.height)
    this.stars = new Stars(this.context, this.canvas.width, this.height, window.innerHeight)
  }
  meteorGenerator() {
    let x = Math.random() * this.width + 800
    this.meteors.push(new Meteor(this.context, x, this.height))
    setTimeout(() => {
      this.meteorGenerator()
    }, Math.random() * 2000)
  }
  frame() {
    this.count++
    this.count % 10 === 0 && this.stars.blink()
    this.board.draw()
    this.stars.draw()
    this.meteors.forEach((meteor, index, arr) => {
      // 如果流星离开视野之内，销毁流星实例，回收内存
      if (meteor.flow()) {
        meteor.draw()
      } else {
        arr.splice(index, 1)
      }
    })
    requestAnimationFrame(this.frame)
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
