<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDSwitch {
  value?: boolean,
  disabled?: boolean,
  showText?: boolean,
  onText?: string,
  offText?: string,
  oncolor?: string,
  offcolor?: string
}

@Component
class Switch extends Vue {

  @Prop({ required: true, default: false })
  private value : boolean
  @Prop({ required: false, default: false })
  private disabled : boolean
  @Prop({ required: false, default: false })
  private showText : boolean
  @Prop({ required: false })
  private oncolor : string
  @Prop({ required: false })
  private offcolor : string

  private state: IDSwitch
  constructor() {
    super()
    this.state = {
      value: false, // 是否选中
      disabled: false,
      showText: false, // 是否显示文字
      onText: 'ON',
      offText: 'OFF',
      oncolor: '', // 选中的背景颜色
      offcolor: '' // 未选中的背景颜色
    }
  }
  // 仿react，setState
  setState(obj: IDSwitch) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }

  handleClick(e: Event) {
    if (!this.state.disabled) {
      const span = this.$el
      const circle = span.querySelector('.id-switch__circle') as HTMLElement
      const core = span.querySelector('.id-switch__core') as HTMLElement
      if (this.state.value) {
        circle.style.transform = 'translate(0px, 0px)'
      } else {
        circle.style.transform = 'translate(26px, 0px)'
      }
      this.setState({ value: !this.state.value })
    }
  }
  render(h: CreateElement) {
    const textArea = this.state.showText ? // 是否要显示文字
      (
        <div>
          <div class={`id-switch__label id-switch__label--left
                        ${this.state.value ? 'is-checked' : ''}
          `}>
            <span>{this.state.onText}</span>
          </div>
          <div class={`id-switch__label id-switch__label--right
                        ${this.state.value ? 'is-checked' : ''}
          `}>
            <span>
              {
                this.state.offcolor ? this.state.offText : '' // 关闭颜色存在的情况下再显示文字
              }
            </span>
          </div>
        </div>
      ) : null
    const mainSwitch = (
      <span class={`id-switch__core
                    ${this.state.value ? 'is-checked' : ''}
                    ${this.state.disabled ? 'is-disabled' : ''}
                  `}
            style={this.state.value ? 
                      this.state.oncolor ? `
                        background: ${this.state.oncolor};
                        border: 1px solid ${this.state.oncolor}
                      ` : null : 
                      this.state.offcolor ? `
                        background: ${this.state.offcolor};
                        border: 1px solid ${this.state.offcolor}
                      ` : null
                  }
      >
        <span class='id-switch__circle'>
        
        </span>
      </span>
    ) 
    const IDSwitch = (
      <label class={`id-switch
                      ${this.state.value ? 'is-checked' : ''}
                      ${this.state.disabled ? 'is-disabled' : ''}
      `} on-click={e => this.handleClick(e)}>
        { mainSwitch }
        { textArea }
      </label>
    )
    return IDSwitch
  }
  @Watch('value', { immediate: true })
  onValueChange(val: boolean) {
    this.setState({ value: val })
  }
  @Watch('disabled', { immediate: true })
  onDisabledChange(val: boolean) {
    this.setState({ disabled: val })
  }
  @Watch('showText', { immediate: true })
  onShowTextChange(val: boolean) {
    this.setState({ showText: val })
  }
  @Watch('oncolor', { immediate: true })
  onOncolorChange(val: string) {
    this.setState({ oncolor: val })
  }
  @Watch('offcolor', { immediate: true })
  onOffcolorChange(val: string) {
    this.setState({ offcolor: val })
  }
  
}
export default Switch
</script>
<style lang="scss">
  .id-switch {
    position: relative;
    line-height: 22px;
    height: 22px;
    vertical-align: middle;
    width: 50px;
    display: inline-block;
    cursor: pointer;
    &.is-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    .id-switch__core {
      float: left;
      width: 50px;
      position: relative;
      height: 22px;
      border-radius: 14px;
      background: #bfcbd9;
      border: 1px solid #bfcbd9;
      position: relative;
      &.is-checked {
        background: #20a0ff;
        border: 1px solid #20a0ff;
        .id-switch__circle {
          transform: translate(26px, 0px);
        }
      }
      .id-switch__circle {
        height: 20px;
        width: 20px;
        background: #fff;
        position: absolute;
        left: 2px;
        top: 1px;
        border-radius: 20px;
        transition: transform 0.3s
      }
    }
    .id-switch__label {
      position: absolute;
      font-size: 12px;
      color: #fff;
      &--left {
        left: 7px;
        &:not(.is-checked) {
          display: none;
        }
      }
      &--right {
        right: 2px;
        &.is-checked {
          display: none;
        }
      }
      transition: all .3s;
    }
  }
</style>

