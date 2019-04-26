<template>
  <div class="friend-content">
    <div class="title f_l"><h3>友情链接</h3></div>
    <ul class="f_l">
      <li class="f_l" v-for="(item, index) in links" :key="index">
        <a :href="item.url" target="blank">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import { link } from 'fs';
declare let Mock: any;

@Component({})
export default class FriedndLink extends Vue {
  links: Array<Object> = []
  mounted() {
    this.links = [
      {
        title: 'LIKAI LEE',
        url: 'https://github.com/LikaiLee'
      },
      {
        title: '叶子博客',
        url: 'https://www.yezismile.com'
      },
      {
        title: '三命',
        url: 'https://segmentfault.com/u/3900'
      }
    ]
  }
}
</script>

<style lang='scss'>
  @import '@/assets/css/components/frinedLink.scss';
</style>
