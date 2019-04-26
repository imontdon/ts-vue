<template>
  <div class="carousel posi-rlt">
    <div class="carousel-box">
      <div class="carousel-box-item posi-rlt" v-for="(item, index) in imgItems" :key="index" :class='activeIndex === index ? "activeImg" : "normalImgs"'>
        <img :src='item.img'> 
        <p class="posi-abs">{{ item.title }}</p>
      </div>
    </div>
    <div class="carousel-circle posi-abs" v-if="circle">
      <span class="circle f_l" v-for="(item, index) in imgItems" :key="index" :class='activeIndex === index ? "activeCricle" : "normalCricle"' @mouseenter="turnImgStatus(index)"></span>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { setInterval, clearInterval } from "timers";
@Component({})
export default class Carousel extends Vue {
  @Prop({ default: 'up' })
  way: String
  @Prop({
    type: Array,
    default: () => []
  })
  public imgItems
  @Prop({
    type: Boolean,
    default: true
  })
  public circle
  activeIndex: number = 0
  height: number = 0
  timer: any
  mounted() {
    // console.log(this.imgItems) 
    // this.startTimer()
    /* const carousel = document.querySelector('.carousel-box') as HTMLElement
    const circle = document.querySelector('.carousel-circle') as HTMLElement
    carousel.onmouseover = () => {
      console.log('carousel1')
      this.clearTimer()
    } 
    carousel.onmouseout = () => {
      console.log('carousel22')
      this.startTimer()
    } 
    circle.onmouseover = () => {
      console.log('circle11')
      this.clearTimer()
    } 
    circle.onmouseout = () => {
      console.log('circle333322')
      this.startTimer()
    }  */
  }
  beforeDestroy() {
    clearInterval(this.timer)
  }
  startTimer() {
    this.timer = setInterval(this.turnImgStatus, 1500)
  }
  clearTimer() {
    clearInterval(this.timer)
  }
  turnImgStatus(index: number) {
    console.log(index)
    if (!index) {
      index = this.activeIndex + 1 > this.imgItems.length - 1 ? 0 : this.activeIndex + 1
    }
    // this.clearTimer()
    const items = document.querySelectorAll('.carousel-box-item') as NodeListOf<HTMLElement>
    this.height = items[index].clientHeight
    // console.log(this.activeIndex, index, 'aaa')
    let distance: number = (index * this.height)
    // 测试阶段， 后修改代码
    if (this.way !== 'up') {
      distance = -distance
    }
    // console.log(`${500 - distance > 1000 ? 1000 : 500 - distance}`, 'distance')
    for (let i = 0; i < items.length; i++) {
      // this.activeIndex = index
      // activeCricle.
      items[i].style.webkitTransform  = `translateY(${distance}px)`
      items[i].style.transform  = `translateY(${distance}px)`
      items[i].style.transition = `-webkit-transform ${500 - distance > 1000 ? 1000 : 500 - distance }ms ease-in-out`;
      items[i].style.transition = `transform ${500 - distance > 1000 ? 1000 : 500 - distance}ms ease-in-out`;
    }
    this.activeIndex = index
      // console.log(items, items[index].style.transform)
    
  }
  @Watch('imgItems')
  onItemsChange(newVal: Array<Object>, oldVal: Array<Object>) {
  }
}
</script>

<style lang='scss'>
  @import '@/assets/css/components/carousel.scss'
</style>
