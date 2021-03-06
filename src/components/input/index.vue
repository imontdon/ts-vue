<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDInput {
  type?: string,
  placeholder?: string,
  prefix?: string, // 前缀icon
  suffix?: string, // 后缀icon
  clearable?: boolean,
  value?: string,
  maxlength?: number,
  disabled?: boolean,
  readonly?: boolean,
  showClearIcon?: boolean // 在后缀图标和清除图标都有的情况下是否要显示清除图标

  isInit?: boolean
}

@Component
class Input extends Vue {
  @Prop({ required: false, default: 'text' })
  private type: string
  @Prop({ required: false, default: '' })
  private placeholder: string
  @Prop({ required: false, default: '' })
  private prefix: string
  @Prop({ required: false, default: false })
  private suffix: string
  @Prop({ required: false, default: '' })
  private value: string
  @Prop({ required: false, default: false })
  private readonly: boolean
  @Prop({ required: false, default: false })
  private disabled: boolean
  @Prop({ required: false, default: false })
  private clearable: boolean

  private state: IDInput
  constructor() {
    super()
    this.state = {
      type: 'text',
      placeholder: '',
      prefix: '',
      suffix: '',
      clearable: false,
      value: '',
      maxlength: 100,
      readonly: false,
      disabled: false,
      showClearIcon: false,
      isInit: true
    }
  }
  /**
   * 1.id-icon 要判断是否在icon列表中，在显示不在设null，暂时无判断
   */
  render(h: CreateElement) {
    const basicInput = ['text', 'password', 'submit', 'textarea'].join('')
    return (
      <div 
        class={`id-input id-input__${this.state.type}`} 
      >
        <input 
          class={`id-input id-input__inner 
                  ${this.state.readonly ? 'is-readonly' : ''}
                  ${this.state.disabled ? 'is-disabled' : ''}
                  ${this.state.clearable ? 
                      this.state.disabled ? 
                        '' : 
                        'is-clearable' : 
                      ''
                  }
                `}
          focus
          type={ basicInput.indexOf(this.state.type) > -1 ? this.state.type : 'text' } 
          // placeholder={ this.state.type === 'password' ? null : this.state.placeholder }
          placeholder={ this.state.placeholder }
          style={ this.state.prefix === '' ? '' : 'width: 84%; padding-left: 25px;' }
          value={this.state.value}
          on-input = {e => this.emitInput(e.target.value, this)}
          on-change = {e => this.emitChange(this.state.value, this)}
          on-keyup = {e => this.emitKeyUp(e, this)}
          on-focus = {e => this.emitFocus(e, this)}
          on-mouseenter = {e => this.handleMouseEnter(e, this)}
          on-mouseout = {e => this.handleMouseOut(e, this)}
          on-blur = {e => this.emitBlur(e, this)}
          on-click= {e => this.emitClick(e, this)}
        />
        { // 前缀图标
          this.state.prefix ?  
          (
            <span class='id-prefix-icon'>
              <i class={`id-icon icon-${ this.state.prefix }`}></i>
            </span>
          ) : null
        }
        { // clearable图标和后缀图标
          // 是否有clearable
          this.state.clearable ?  // 有clearable
          (
            this.state.suffix ? 
            (
              <span class='id-suffix-icon' on-mouseenter={this.spanMouseEnter.bind(this)}>
                {
                  this.state.showClearIcon && this.state.value ? 
                  (
                    <i class={`id-icon icon-cancel-circle`} on-click={this.clearInput.bind(this)}></i>
                  ) : 
                  (
                    <i class={`id-icon icon-${this.state.suffix}`} on-click={this.clearInput.bind(this)}></i>
                  )

                }
              </span>
            ) : 
            (
              <span class='id-suffix-icon' on-mouseenter={this.spanMouseEnter.bind(this)}>
                <i class={`id-icon icon-cancel-circle`} on-click={this.clearInput.bind(this)}></i>
              </span>
            )
          ) : ( // 无clearable
            this.state.suffix ?  // 是否有后缀图标
            ( // 有suffix
              <span class='id-suffix-icon' style={this.state.clearable ? 'padding-right: 22px' : ''}>
                <i class={`id-icon icon-${ this.state.suffix }`}></i>
              </span>
            ) : null // 无suffix
          )
        }
      </div>
    )
  }
  setState(obj: IDInput) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key]
    })
  }

  @Emit('change')
  emitChange(val: string, input?: Input) { }
  @Emit('keyup')
  emitKeyUp(event: Event, input?: Input) { }
  @Emit('input')
  emitInput(val: string, input?: Input) { }
  @Emit('mouseout')
  emitMouseOut(event: Event, input?: Input) { }
  @Emit('mouseenter')
  emitMouseEnter(event: Event, input?: Input) { }
  @Emit('blur')
  emitBlur(event: Event, input?: Input) { }
  @Emit('focus')
  emitFocus(event: Event, input?: Input) { }
  @Emit('click')
  emitClick(event: Event, input?: Input) { }
  @Emit('clear')
  emitClear() { }

  clearInput() {
    this.setState({ value: '' })
    this.emitClear()
  }
  handleMouseEnter(e?: Event, input?: Input) {
    if (this.state.clearable) {
      this.setState({ showClearIcon: true })
      // console.log(this.state.showClearIcon)
      // const cancel = this.$el.querySelector('.icon-cancel-circle') as HTMLElement
      // if (cancel) {
      //   cancel.style.transition = 'opacity .5s'
      //   cancel.style.opacity = '0.5'
      // }
      this.emitMouseEnter(e, input)
    } else {
      this.emitMouseEnter(e, input)
    }
  }
  handleMouseOut(e?: Event, input?: Input) {
    if (this.state.clearable) {
      this.setState({ showClearIcon: false })
      // console.log(this.state.showClearIcon)
      // const cancel = this.$el.querySelector('.icon-cancel-circle') as HTMLElement
      // if (cancel) {
      //   cancel.style.transition = 'opacity .5s'
      //   cancel.style.opacity = '0.5'
      // }
      this.emitMouseOut(e, input)
    } else {
      this.emitMouseOut(e, input)
    }
  }
  spanMouseEnter() {
    // const cancel = this.$el.querySelector('.icon-cancel-circle') as HTMLElement
    // if (cancel) {
    //   cancel.style.opacity = '0.5'
    // }
    this.setState({ showClearIcon: true })
  }
  handleFocus(e: Event) {
    console.log('focus no emit')
  }
  @Watch('type', { immediate: true })
  onTypeChange(val: string, oldVal: string) {
    this.setState({ type: val })
  }
  @Watch('placeholder', { immediate: true })
  onPlaceholderChange(val: string, oldVal: string) {
    this.setState({ placeholder: val })
  }
  @Watch('prefix', { immediate: true })
  onPrefixChange(val: string, oldVal: string) {
    this.setState({ prefix: val })
  }
  @Watch('suffix', { immediate: true })
  onSuffixChange(val: string, oldVal: string) {
    this.setState({ suffix: val })
  }
  @Watch('value', { immediate: true })
  onValueChange(val: string, oldVal: string) {
    this.setState({ value: val })
    if (!this.state.isInit) {
      this.emitChange(val)
    } else {
      this.setState({ isInit: false })
    }
  }
  @Watch('readonly', { immediate: true })
  onReadonlyChange(val: boolean, oldVal: boolean) {
    this.setState({ readonly: val })
    if(val) {
      setTimeout(() => {
        const readonlyInput = document.querySelectorAll('.id-input .is-readonly')
        for (let i = 0; i < readonlyInput.length; i++) {
          readonlyInput[i].setAttribute('readonly', 'readonly')
        }
      }, 10)
    }
  }
  @Watch('disabled', { immediate: true })
  onDisabledChange(val: boolean, oldVal: boolean) {
    this.setState({ disabled: val })
  }
  @Watch('clearable', { immediate: true })
  onClearableChange(val: boolean, oldVal: boolean) {
    this.setState({ clearable: val })
  }
}

export default Input
</script>
<style lang="scss">
  $iconSize: 20px;
  $iconLeft: 5px;
  .id-input {
    position: relative;
    width: 100%;
    .id-input__inner {
      width: 90%;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      height: 40px;
      line-height: 40px;
      // padding-left: $iconSize + $iconLeft;
      padding-left: 10px;
      color: #606266;
      &.is-disabled {
        background-color: #F5F7FA;
        border-color: #E4E7ED;
        color: #C0C4CC;
        cursor: not-allowed;
        // pointer-events: none; // 取消所有事件，但会与cursor冲突
      }
    }
    /* #f56c6c */
    .id-input__inner:not(.is-disabled):focus {
      outline: none;
      border-color: #409eff;
    }
    .id-prefix-icon {
      position: absolute;
      width: $iconSize;
      height: $iconSize;
      left: $iconLeft;
      top: 50%;
      opacity: 0.4;
      margin-top: -10px;
    }
    .id-suffix-icon {
      position: absolute;
      display: flex;
      transform: scale(0.8);
      width: $iconSize;
      height: $iconSize;
      right: $iconLeft + 10px;
      top: 50%;
      margin-top: -10px;
      justify-content: center;
      align-items: center;
      opacity: 0.5;
      .id-icon.icon-cancel-circle {
        transform: scale(0.8);
        cursor: pointer;
        // opacity: 0;
      }
    }
  }
</style>

