<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface Button {
  icon?: string,
  type?: string,
  plain?: boolean,
  round?: boolean,
  circle?: boolean,
  disabled?: boolean,
  loading?: boolean
}

@Component
class IDButton extends Vue {
  @Prop({ required: false, default: '' })
  private icon: string
  @Prop({ required: false, default: 'default' })
  private type: string
  @Prop({ required: false, default: false })
  private plain: boolean
  @Prop({ required: false, default: false })
  private round: boolean
  @Prop({ required: false, default: false })
  private circle: boolean
  @Prop({ required: false, default: false })
  private disabled: boolean
  @Prop({ required: false, default: false })
  private loading: boolean

  private state: Button
  constructor() {
    super()
    this.state = {
      icon: '',
      type: 'default',
      plain: false,
      round: false,
      circle: false,
      disabled: false,
      loading: false,
    }
  }
  render(h: CreateElement) {
    return (
      <button 
        type='button' 
        on-click={this.woundEmit.bind(this, event)}
        class={`id-button id-button--${this.state.type} 
                ${this.state.plain ? 'is-plain' : ''} 
                ${this.state.round ? 'is-round' : '' } 
                ${this.state.loading ? 'is-loading' : '' } 
                ${this.state.disabled ? 'is-disabled' : '' } 
                ${this.state.circle ? 'is-circle' : ''} 
              `}>
              {
                this.state.circle ? ( // 是否为圆
                  <i class={`id-icon icon-${this.state.icon}`}></i> // 圆=》只显示icon
                ) : this.state.icon === '' ? // 否则，判断是否有icon
                    // 没有icon属性， 输出children内容
                    this.state.loading ? ( // 是否有loading
                      // 有loading，输出loading + children
                      <span class='id-span'>
                        <i class={`id-icon icon-loading prefix-icon`}></i>
                        {this.$slots.default}
                      </span>
                    ) : this.$slots.default // 没有loading，输出children
                    : ( // 否则输出icon + children内容
                      <span class='id-span'>
                        { // 优先加载loading图
                          this.state.loading ? 
                          (
                            <i class={`id-icon icon-loading prefix-icon`}></i>
                          ) : <i class={`id-icon icon-${this.state.icon} prefix-icon`}></i>
                        }
                        {this.$slots.default}
                      </span>
                    )
              }
        
      </button>
    )
  }
  
  // 仿react，setState
  setState(obj: Button) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key]
    })
  }
  woundEmit(event) {
    if (!this.state.disabled) {
      this.emitClick(event)
    }
  }
  @Emit('click')
  emitClick(e?: Event) {}
  @Watch('icon', { immediate: true })
  onIconChange(val: string, oldVal: string) {
    this.setState({ icon: val })
  }
  @Watch('type', { immediate: true })
  onTypeChange(val: string, oldVal: string) {
    this.setState({ type: val })
  }
  @Watch('plain', { immediate: true })
  onPlainChange(val: boolean, oldVal: boolean) {
    this.setState({ plain: val })
  }
  @Watch('round', { immediate: true })
  onRoundChange(val: boolean, oldVal: boolean) {
    this.setState({ round: val })
  }
  @Watch('circle', { immediate: true })
  onCircleChange(val: boolean, oldVal: boolean) {
    this.setState({ circle: val })
  }
  @Watch('disabled', { immediate: true })
  onDisabledChange(val: boolean, oldVal: boolean) {
    this.setState({ disabled: val })
  }
  @Watch('loading', { immediate: true })
  onLoadingChange(val: boolean, oldVal: boolean) {
    this.setState({ loading: val })
    console.log(this.state.loading)
  }
}
export default IDButton
</script>

<style lang="scss">
  $paddingXAuto: 10px;
  $paddingAutoX: 30px;

  @keyframes rotating {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }
  .id-button {
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: $paddingXAuto $paddingAutoX;
    // width: 70px;
    // height: 30px;
    border-radius: 4px;
    &.is-round {
      border-radius: 20px;
      // padding: 12px 23px;
      padding: $paddingXAuto $paddingAutoX;
    }
    &.is-circle {
      border-radius: 50%;
      padding: 12px;
    }
    &.is-disabled, &[disabled] {
      // pointer-events: none;
      cursor: not-allowed;
    }
    &.is-loading, &[loading] {
      .icon-loading {
        animation: rotating 2s linear infinite;
      }
    }
    .id-span {
      position: relative;
      .id-icon {
        position: absolute;
        top: 50%;
        margin-top: -6.5px;
      }
      .prefix-icon {
        // left: -$paddingXAuto - 2px;
        // top: 1px;
        left: -$paddingXAuto - 8px;
      }
      .id-icon:not(.prefix-icon) {
        // right: -$paddingXAuto - 2px;
        // top: 1px;
        right: -$paddingXAuto - 8px;
      }
    }
  }
  .id-button:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
  $colors:  ('primary', #409eff, #ecf5ff, #b3d8ff), 
            ('success', #67c23a, #f0f9eb, #c2e7b0),
            ('info', #909399, #f4f4f5, #d3d4d6),
            ('warning', #e6a23c, #fdf6ec, #f5dab1),
            ('danger',  #f56c6c, #fef0f0, #fbc4c4);
  @each $name, $color, $plainBg, $plainBc in $colors {
    .id-button--#{$name} {
      color: #fff;
      background-color: $color;
      border-color: $color;
      &.is-plain {
        color: $color;
        background: $plainBg;
        border-color: $plainBc;
      }
    }
  }
</style>

