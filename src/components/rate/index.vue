<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
interface IDRate {
  list?: Array<Star>,
  hover?: number,
  showText?: boolean,
  on?: number,
  textList?: Array<string>,
  colors?: Array<string>
}
interface Star {
  item: number,
  active: boolean,
}
@Component
class Rate extends Vue {

  @Prop({ required: false, default: false })
  private showText: boolean
  @Prop({ required: false, default: [] })
  private colors: boolean
  private state: IDRate
  constructor() {
    super()
    this.state = {
      list: [
        {
          item: 1,
          active: false,
        },
        {
          item: 2,
          active: false,
        },
        {
          item: 3,
          active: false,
        },
        {
          item: 4,
          active: false,
        },
        {
          item: 5,
          active: false,
        },
      ],
      hover: -1,
      showText: false,
      on: -1,
      textList: ['极差', '失望', '一般', '满意', '惊喜']
    }
  }
  // 仿react，setState
  setState(obj: IDRate) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  handleMouseEnter(index: number, e: Event) {
    const el = this.$el 
    const items = el.querySelectorAll('.icon-star__item') as NodeListOf<HTMLElement>
    this.setState({ hover: index })
  }
  handleMouseLeave(index: number, e: Event) {
    this.setState({ hover: -1 })
  }
  handleClick(index: number): void {
    this.setState({ on: index })
    const list: Array<Star> =  this.state.list
    for (let i = 0; i < list.length; i++) {
      if (i <= index) {
        list[i].active = true
      } else {
        list[i].active = false
      }
    }
    this.setState({ list })
  }
  render(h: CreateElement) {
    const text = (
      <span class='id-rate__text'>
        {
          this.state.showText ? 
          (
            this.state.on > -1 ? 
              this.state.hover > -1 ? this.state.textList[this.state.hover] : this.state.textList[this.state.on]
              : this.state.hover > -1 ? this.state.textList[this.state.hover] : null
          ) : 
          null
        }
      </span>
    )
    const IDRate = (
      <div class='id-rate'>
        <div>
          {
            this.state.list.map((item: Star, index: number): HTMLElement => {
              return (
                  <i class={`id-icon icon-star__item 
                              ${
                                item.active ? // 是否活跃
                                (
                                  this.state.hover > -1 ? // 鼠标是否滑动在rate上 
                                  ( // 滑动对应的rate前显示icon-star-on的标签，后面显示icon-star-off标签
                                    index <= this.state.hover ? 'icon-star-on' : 'icon-star-off' 
                                  ) : 
                                  ( // 鼠标不在滑动，直接显示活跃状态的颜色
                                    'icon-star-on'
                                  )
                                ) : 
                                ( // 没活跃则根据鼠标是否滑动在rate上判断显示那种标签
                                  index <= this.state.hover ? 'icon-star-on' : 'icon-star-off'
                                ) 
                              }
                            `}
                      style={
                        this.state.colors ? // 是否需要多色彩
                        (
                          item.active ? // 该处是否活跃
                          (
                            this.state.hover > -1 ? // 鼠标是否在rate上滑动 是：显示滑动对应的颜色，否：显示click对应的颜色
                              `color: ${this.state.colors[Math.floor(this.state.hover / 2)]}`: `color: ${this.state.colors[Math.floor(this.state.on / 2)]}`
                          ) : 
                          (
                            this.state.hover > -1 ? // 未点击状态下，显示鼠标滑动对应的颜色，无滑动则无
                              `color: ${this.state.colors[Math.floor(this.state.hover / 2)]}` : null
                          )
                        ) : 
                        null // 不需要多色彩则默认
                      }
                     on-mouseenter = {this.handleMouseEnter.bind(this, index)}
                     on-mouseleave = {this.handleMouseLeave.bind(this, index)}
                     on-click= {this.handleClick.bind(this, index)}
                  >
                  </i>
              )
            })
          }
          { text }
        </div>
      </div>
    )
    return IDRate
  }

  @Watch('showText', { immediate: true })
  onShowTextChange(val: boolean) {
    if (typeof val !== 'boolean') { console.error(`showText的类型为boolean`) }
    this.setState({ showText: val })
  }
  @Watch('colors', { immediate: true })
  onColorsChange(val: Array<string>) {
    if (typeof val !== 'object') {
      if (Object.prototype.toString.call(val) === '[object Objcet]') {
        console.error('Prop: colors required Array but provide Objcet ')
      } else {
        console.error('Prop: colors type error')
      }
    }
    if (val.length !== 3) {
      console.error('Prop: colors need Array length 3 ')
    }
    this.setState({ colors: val })
  }
}
export default Rate
</script>
<style lang="scss">
  .id-rate {
    .icon-star__item {
      display: inline-block;
      transition: transform .5s;
      cursor: pointer;
      padding: 0 5px;
      &:hover {
        transform: scale(1.2)
      }
      &.icon-star-on {
        color: rgb(247, 186, 42)
      }
    }
    &__text {
      font-size: 14px;
      color: rgb(31, 45, 61);
    }
  }
</style>

