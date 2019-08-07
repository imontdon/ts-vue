import Message from './index.vue'
import { CreateElement, VueConstructor } from 'vue'

interface MessageText {
  text: string,
  message: string,
  duration: number
}
const MESSAGE: any = {
  duration: 3000, // 显示的时间 ms
  animateTime: 300, // 动画时间,表示这个组件切换show的动画时间
  install (Vue: VueConstructor): void {
    /* if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    } */
    // console.log(Vue.component)
    const MessageComponent = Vue.component('Message', Message)
    function msg (type: string, text: string | MessageText, callBack) {
      let message: string = ''
      let duration: number = MESSAGE.duration
      if (typeof text === 'string') {
        message = text
      } else if (text instanceof Object) {
        message = text.text || ''
        if (text.duration) {
          duration = text.duration
        }
      }
      let VueMessage = Vue.extend({
        render (h: CreateElement) {
          let props: any = {
            type,
            text: message,
            show: this.show
          }
          return h(MessageComponent, { props })
        },
        data () {
          return {
            show: false
          }
        }
      })
      let IDMessage = new VueMessage()
      let vm = IDMessage.$mount()
      let el: Element = vm.$el
      document.body.appendChild(el) // 把生成的提示的dom插入body中
      vm.show = true
      let t1 = setTimeout(() => {
        clearTimeout(t1)
        vm.show = false // 隐藏提示组件，此时会有300ms的动画效果，等动画效果过了再从body中移除dom
        let t2 = setTimeout(() => {
          clearTimeout(t2)
          document.body.removeChild(el) // 从body中移除dom
          IDMessage.$destroy()
          vm = null // 设置为null，好让js垃圾回收算法回收，释放内存

          callBack && (typeof callBack === 'function') && callBack()
        }, MESSAGE.animateTime)
      }, duration)
    }

    // 挂载到vue原型上，暴露四个方法
    Vue.prototype.$message = {
      info (text, callBack) {
        if (!text) return
        msg('info', text, callBack)
      },
      success (text, callBack) {
        if (!text) return
        msg('success', text, callBack)
      },
      error (text, callBack) {
        if (!text) return
        msg('error', text, callBack)
      },
      warning (text, callBack) {
        if (!text) return
        msg('warning', text, callBack)
      }
    }
  }
}
export default MESSAGE
