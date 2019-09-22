<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang='ts'>
import Vue from "Vue";
import Component from "vue-class-component";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
declare let Mock: any;

// const page = namespace('./store/modules/page');
@Component({})
export default class App extends Vue {
  @Getter("pageIsHidden") isHidden!: boolean;
  @Action("pageIsHidden") pageIsHidden;

  mounted() {
    (function (doc: Document, win: Window) {
      const docEl: HTMLElement = doc.documentElement
      const resizeEvt: string = 'orientationchange' in window ? 'orientationchange' : 'resize'
      const recalc = function (): void {
        const clientWidth: number = docEl.clientWidth;
        if (!clientWidth) return;
        if(clientWidth >= 720){
            // docEl.style.fontSize = '100px';
            docEl.setAttribute('style', 'font-size: 100px !important')
        }else{
          // docEl.style.setAttribute('font')
          docEl.setAttribute('style', `font-size: ${(100 * (clientWidth / 720))}px !important`)
            // docEl.style.fontSize =  target + 'px !important';
        }
        console.log(docEl.style.fontSize)
      };

      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
    // console.log(this.isHidden)
    if (process.env.NODE_ENV !== "development") {
      document.oncontextmenu = function() {
        return false;
      };
      document.onkeydown = function(event) {
        if (event && event.keyCode == 123) {
          event.returnValue = false;
          return false;
        }
      };
    }
    let hidden: string;
    let visibilityChange: string;
    if (typeof window.document.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    }

    // 添加监听器，在title里显示状态变化
    document.addEventListener(
      visibilityChange,
      () => {
        if (document[hidden]) {
          this.pageIsHidden(true);
          // console.log(this.isHidden)
          // 用户没有浏览当前页面
          // console.log('用户没有浏览当前页面')
        } else {
          // 用户正在浏览当前页面
          this.pageIsHidden(false);
          // console.log(this.isHidden)
          // console.log('用户正在浏览当前页面')
        }
      },
      false
    );
  }
}
</script>
<style lang='scss'>
@import "@/assets/css/index.scss";
</style>