<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDSlider {
  value?: number, // 默认进度{value%}
  disabled?: boolean, // 是否被禁止
  showInput?: boolean,

  /* 自身属性 */
  currentPosition?: number, // 圆环当前位置
  startPosition?: number, // 进度条左侧开始位置（ps: 不是圆环位置）
  barWidth?: number, // 进度条的总长度
  isDragging?: boolean, // 是否是拖动属性
  isInit?: boolean // 是否是第一次
}
/**
 * 未兼容移动端
 * tooltip以后加，等tooltip做完
 * showInput 等input的计数器做完做
 */
@Component
class Slider extends Vue {

  @Prop({ required: false, default: 0 })
  private value: number
  @Prop({ required: false, default: false })
  private disabled: boolean
  // @Prop({ required: false, default: false })
  // private showInput: boolean

  private state: IDSlider
  constructor() {
    super()
    this.state = {
      value: 0,
      disabled: false,
      currentPosition: 0,
      startPosition: 0,
      barWidth: 0,
      isDragging: false,
      isInit: true
    }
  }
  // 仿react，setState
  setState(obj: IDSlider) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  onButtonDown(event: MouseEvent) :void {
    if (this.state.disabled) {
      return
    }
    event.preventDefault()
    const el = this.$el as HTMLElement
    if (this.state.isInit) {
      if (this.state.value > 0) {
        this.setState({ startPosition: event.clientX - Math.floor(this.state.barWidth * this.state.value / 100) })
      } else {
        this.setState({ startPosition: event.clientX })
      }
      this.setState({ isInit: false})
    }
    /* if (this.state.value > 0) {
    }
    if (this.state.startPosition === 0) {
    } */
    document.addEventListener('mousemove', this.onDragging)
    document.addEventListener('mouseup', this.onDragEnd);
    // console.log('mousemove', event)
  }
  onDragging(event: MouseEvent) {
    if (!this.state.isDragging) {
      this.setState({ isDragging: true })
    } else {
      console.log('onDragging: ',event.clientX)
      let moveX: number = event.clientX - this.state.startPosition
      moveX = moveX > this.state.barWidth ? this.state.barWidth : moveX
      moveX = moveX < 0 ? 0 : moveX
      this.setState({ currentPosition: moveX })
      this.setState({ value: Math.floor(moveX / this.state.barWidth * 100) })
      // console.log(this.state.currentPosition)
    }
  }
  onDragEnd(event: MouseEvent) {
    console.log('onDragEnd: ', event)
    const el = this.$el as HTMLElement
    // this.setState({ startPosition: this.state.currentPosition })
    document.removeEventListener('mousemove', this.onDragging)
    document.removeEventListener('mouseup', this.onDragEnd)
  }
  render(h: CreateElement) {
    const value = this.state.value
    // 圆环
    const circleBtn = (
      <div class={`
                    el-slider__btn-warpper
                    ${this.state.disabled ? 'is-disabled' : ''}
                  `} on-mousedown={e => this.onButtonDown(e)}>
        <div class='el-slider__btn'></div>
      </div>
    )
    // 进度条
    const bar = (
      <div class='id-slider__bar'
        style={
              this.state.barWidth > 0 ? 
              `width: ${value}%`
              : null
            }
      >
        { circleBtn }
      </div>
    )
    // 文字区域
    const labelArea = (
      <div class='demonstration'>
        {
          this.$slots.default
        }
      </div>
    )
    // Slider
    const IDSlider = (
      <div class={`
                    id-slider block
                    ${this.state.disabled ? 'is-disabled' : ''}
                  `}>
        { labelArea }
        <div class='id-slider__runway'>
          { bar }
        </div>
        <div style='margin-left: 10px;'>
          {value}
        </div>
      </div>
    )
    return IDSlider
  }
  mounted() {
    const el = this.$el as HTMLElement
    const defaultBar = el.querySelector('.id-slider__runway') as HTMLElement
    console.log(defaultBar.offsetWidth)
    this.setState({ barWidth: defaultBar.offsetWidth})
    // defaultBar.onclick = function(e) {
    //   const offsetX = e.offsetX
    //   bar.style.width = `${Math.floor((offsetX / defaultBar.offsetWidth) * 100)}%`
    // }
    
  }
  @Watch('value', { immediate: true })
  onValueChange(val: number) {
    if (val > 0) {
      this.setState({ value: val })
    }
  }
  @Watch('disabled', { immediate: true })
  onDisabledChange(val: boolean) {
    this.setState({ disabled: val })
  }
  // @Watch('showInput', { immediate: true })
  // onShowInputChange(val: boolean) {
  //   this.setState({ disabled: val })
  // }
}
export default Slider
</script>
<style lang="scss">
  .id-slider.block {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    .demonstration {
      width: 25%;
    }
    .id-slider__runway {
      width: 60%;
      height: 6px;
      background: #e4e7ed;
      border-radius: 3px;
      cursor: pointer;
      position: relative;
      .id-slider__bar {
        position: absolute;
        left: 0;
        top: 0;
        height: 6px;
        background: #409eff;
        border-radius: 12px;
      }
      .el-slider__btn-warpper {
        width: 36px;
        height: 36px;
        position: absolute;
        right: -18px;
        top: -18px;
        &.is-disabled {
          opacity: 0.6;
        }
        .el-slider__btn {
          width: 12px;
          height: 12px;
          position: absolute;
          left: 50%;
          margin-left: -6px;
          top: 50%;
          margin-top: -6px;
          background: #fff;
          border-radius: 100%;
          border: 2px solid #409eff;
          cursor: grab;
        }
      }
    }
  }
</style>

