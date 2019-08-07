<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDMessage {
  type?: string,
  text?: string,
  duration?: number
}

@Component
class Message extends Vue {
  
  @Prop({ required: false, default: '' })
  private text: string
  @Prop({ required: false, default: 'info' })
  private type: string

  private state: IDMessage
  constructor() {
    super()
    this.state = {
      type: '',
      text: '',
      duration: 3000
    }
  }
  // 仿react，setState
  setState(obj: IDMessage) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key]
    })
  }
  render(h: CreateElement) {
    return (
      <div class={`id-message id-message__${this.state.type}`}>
        <i class={`id-icon icon-${this.state.type}`}></i>
        <span class={`id-message__text id-message__text--${this.state.type}`}>{this.state.text}</span>
      </div>
    )
  }

  @Watch('text', { immediate: true })
  onTextChange(val: string) {
    this.setState({ text: val })
  }
  @Watch('type', { immediate: true })
  onTypeChange(val: string) {
    this.setState({ type: val })
  }
}
export default Message
</script>
<style lang="scss">
  $colors: ('info', #edf2fc, #edf2fc, #909399),
            ('success', #f0f9eb, #e1f3d8, #67C23A),
            ('error', #fef0f0, #fde2e2, #F56C6C),
            ('warning', #fdf6ec, #faecd8, #E6A23C);
  @each $name, $bgColor, $borderColor, $fontColor in $colors {
    .id-message {
      &__#{$name} {
        background: $bgColor;
        border-color: $borderColor;
      }
      &__text {
        &--#{$name} {
          color: $fontColor;
        }
      }
      & .id-icon {
        &.icon-#{$name} {
          color: $fontColor;
        }
      }
    }
  }
  .id-message {
    position: fixed;
    top: 10%;
    text-align: center;
    left: 50%;
    margin-left: -200px;
    width: 400px;
    z-index: 100;
    height: 40px;
    display: flex;
    align-items: center;
    border-radius: 3px;
    
    // 文本框
    &__text {
      margin-left: 10px;
      font-size: 14px;
    }
    // icon
    & .id-icon {
      margin-left: 20px;
      &.icon-error {
        transform: scale(0.8);
        -o-transform: scale(0.8);
        -webkit-transform: scale(0.8);
        -moz-transform: scale(0.8);
        -ms-transform: scale(0.8);
      }
    }
  }
</style>