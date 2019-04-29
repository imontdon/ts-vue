<template>
  <div class="side-bar">
    <div class="tag-link">
      <note-rotate border='orange' center='关于博主'></note-rotate>
      <note-rotate center='心情随笔'></note-rotate>
      <note-rotate border='yellow' center='韶华追忆'></note-rotate>
      <note-rotate border='green' center='网站首页'></note-rotate>
      <note-rotate border='pink' center='Blog留言'></note-rotate>
      <note-rotate border='blue' center='技术分享 '></note-rotate> 
    </div>
    <div class="articles">
      <articles></articles>
    </div>
    <div class="friend-link f_l">
      <friend-link></friend-link>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from 'vue-property-decorator'
import NoteRotate from '@/components/note/rotate.vue'
import Articles from '@/components/articles/index.vue'
import FriendLink from '@/components/friendLink/index.vue'

@Component({
  components: {
    NoteRotate,
    Articles,
    FriendLink
  }
})
export default class SideBar extends Vue {
  mounted() {
    const noteRotate = document.querySelectorAll('.note-rotate') as NodeListOf<HTMLElement>
    for (let i = 0; i < noteRotate.length; i++) {
      noteRotate[i].onmouseenter = function() {
        noteRotate[i].querySelector('span').style.transform = 'rotate(360deg)'
        noteRotate[i].querySelector('span').style.transition = 'transform 1200ms ease'
      }
      noteRotate[i].onmouseout = function() {
        noteRotate[i].querySelector('span').style.transform = 'rotate(-0deg)'
        noteRotate[i].querySelector('span').style.transition = 'transform 1200ms ease'
      }
    }
  }
  @Watch('$route')
  changeRoute(newRoute: any, oldRoute: any) {
    console.log(newRoute)
  }
}
</script>

<style lang='scss'>
  @import '@/assets/css/layout/sideBar.scss';
</style>
