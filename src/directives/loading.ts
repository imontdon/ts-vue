import { DirectiveOptions, VNode, VNodeDirective, VueConstructor, CreateElement } from 'vue'
import Loading from '../components/loading/index.vue'

interface DirectiveBinding extends Readonly<VNodeDirective> {
  readonly modifiers: { [key: string]: boolean }
}
const showMask = (Vue: VueConstructor, el: HTMLElement) => {
  const Mask = Vue.extend({
    render (h: CreateElement) {
      const props = {
        text: el.getAttribute('id-loading-text') || '正在加载中...',
        background: el.getAttribute('id-loading-background') || 'rgba(255, 255, 255, 0.8)',
        color: el.getAttribute('id-loading-color') || '#333'
      }
      return h(Loading, { props })
    }
  })
  const mask = new Mask()
  const vm = mask.$mount()
  const ele = vm.$el
  el.appendChild(ele)
}
const loading = (Vue: VueConstructor, el: HTMLElement, binding: DirectiveBinding) => {
  if (binding.value) { // loading
    if (el.lastElementChild.className !== 'id-directive__loading') {
      setTimeout(() => { // 一定要延时,不然类加不上去
        Vue.nextTick(() => {
          if (!(el.style.position.indexOf('absolute') > -1) && !(el.style.position.indexOf('fixed') > -1)) { // 不能乱定位
            el.classList.add('id-loading-parent--relative')
          }
          showMask(Vue, el) // 放入loading图
          // console.log(el.className)
        })
      }, 50)
    }
  } else {
    if (el.classList.contains('id-loading-parent--relative')) {
      el.classList.remove('id-loading-parent--relative')
    }
    if (el.lastElementChild.className === 'id-directive__loading') {
      el.removeChild(el.childNodes[el.childNodes.length - 1])
    }
  }
}
const loadingDirective: any = {
  install (Vue: VueConstructor): void {
    Vue.directive('loading', {
      bind: function (el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
        console.log(el, binding, vnode, oldVnode)
        loading(Vue, el, binding)
      },
      update: function (el, binding) {
        console.log(`upload:`, binding)
        loading(Vue, el, binding)
      }
    })
  }
}
/*  const loading: DirectiveOptions = {
      inserted: function (el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
        if (binding.value) {
          console.log(el, binding, vnode, oldVnode)
        }
      }
    } */
export default loadingDirective
