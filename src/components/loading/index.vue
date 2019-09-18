<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDLoading {
  text?: string,
  background?: string,
  color?: string,
  defaultColor?: string
}

@Component
class Loading extends Vue {
  @Prop({ required: false, default: '正在加载中...'})
  private text: string
  @Prop({ required: false, default: ''})
  private background: string
  @Prop({ required: false, default: ''})
  private color: string

  private state: IDLoading
  constructor() {
    super()
    this.state = {
      text: '正在加载中...',
      background: '',
      color: '',
      defaultColor: '#f77825'
    }
  }
  // 仿react，setState
  setState(obj: IDLoading) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div 
        class={`id-directive__loading`}
        style={`
          background: ${this.state.background !== "" ? this.state.background : "rgba(255, 255, 255, 0.8)"};
          color: ${this.state.color !== '' ? this.state.color : this.state.defaultColor}
        `}
      >
        <i class='id-icon icon-loading'></i>
        {this.state.text}
      </div>
    )
  }

  @Watch('text', { immediate: true })
  onTextChange(newVal) {
    this.setState({ text: newVal })
  }
  @Watch('background', { immediate: true })
  onBackgroundChange(newVal) {
    this.setState({ background: newVal })
  }
  @Watch('color', { immediate: true })
  onColorChange(newVal) {
    this.setState({ color: newVal })
  }
}
export default Loading
</script>
<style lang="scss">
  .id-directive__loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .icon-loading {
      animation: rotating 2s linear infinite;
    }
  }
</style>