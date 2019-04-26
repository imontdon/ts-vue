<template>
  <div class="app-index">
    <carousel :imgItems='carArr' way='down' class="f_l"></carousel>
    <note :note='about' :border='yellow'></note>
    <note :note='about' :border='skyblue'></note>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Carousel from '@/components/carousel/index.vue'
import Note from '@/components/note/index.vue'
@Component({
  components: {
    Carousel,
    Note
  }
})
export default class Index extends Vue {
  carArr: Array<Object> = []
  about: Object = {}
  yellow: String = 'yellow'
  skyblue: String = 'skyblue'
  mounted() {
    this.carArr = [
      {
        img: require('@/assets/img/png/carousel1.png'),
        title: '文字说明1'
      },
      {
        img: require('@/assets/img/png/carousel2.png'),
        title: '文字说明2'
      },
      {
        img: require('@/assets/img/png/carousel3.png'),
        title: '文字说明3'
      },
      {
        img: require('@/assets/img/png/carousel4.png'),
        title: '文字说明4'
      },
      {
        img: require('@/assets/img/png/carousel5.png'),
        title: '文字说明5'
      }
    ]
    this.about = {
      title: '关于博主',
      content: '关于博主关于博主关于博主关于博主关于博主关于博主关于博主关于博主关于博主关于博主关于博主关于博主关于博主关于博主关于博主关于博主'
    }
  }
}
</script>

<style>

</style>
