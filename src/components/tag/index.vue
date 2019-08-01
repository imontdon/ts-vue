<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
//定义属性接口 包含可选属性
interface IDTag {
  type?: string, //标签主题类型
  hit?: boolean, //是否描边
  color?: string, //背景色
  clearable?: boolean, //是否可关闭
  showContent?: boolean,
}
@Component
class Tag extends Vue {
  @Prop({ required: false, default: 'default' })
  private type: string
  @Prop({required: false, default: false})
  private hit: boolean
  @Prop({ required: false, default: '' })
  private color: string
  @Prop({required: false, default: false})
  private clearable: boolean

  
  private state: IDTag
  constructor() {
    super()
    this.state = {
      type: 'default',
      hit: false,
      color: '',
      clearable: false,
      showContent: true,
    }
  }
  render(h: CreateElement) {
    return (
      <span>{
       this.state.showContent? 
       (<span 
        type='span' 
        on-close= {e => this.emitClose(e, this)}
        style={`background-color:${this.state.color}`}
        class={`id-tag id-tag--${this.state.type}
                ${this.state.hit? 'is-hit' : ''}
              `}>
            {
              <span>
                {this.$slots.default}
                <span on-click={this.handleClick.bind(this)}>
                  {this.state.clearable ? (<i class={`id-icon icon-cancel-circle`}></i>) : ''}
                </span>
              </span>
            }
      </span>) : ''
      }</span>
    )
  }
  
  // 仿react，setState
  setState(obj: IDTag) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  handleClick() {
    console.log('222')
    this.state.showContent = false
  }
  woundEmit(event) {
    if (!this.state.clearable) {
      this.emitClose(event)
    }
  }
  @Emit('close')
  emitClose(event: Event, input?: Vue) { }
  @Watch('type', { immediate: true })
  onIconChange(val: string, oldVal: string) {
    this.setState({ type: val })
  }

  @Watch('hit', { immediate: true })
  onHitChange(val: boolean, oldVal: boolean) {
    this.setState({ hit: val })
  }

  @Watch('color', { immediate: true })
  onColorChange(val: string, oldVal: string) {
    this.setState({ color: val })
  }

  @Watch('clearable', { immediate: true })
  onclearableChange(val: boolean, oldVal: boolean) {
    this.setState({ clearable: val })
  }
}
export default Tag
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
  .id-icon{
    border-radius: 50%;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    height: 16px;
    width: 16px;
    line-height: 16px;
    vertical-align: middle;
    top: -1px;
    right: -5px;
  }
  .id-tag {
    background-color: rgba(64,158,255,.1);
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
    .id-span {
      position: relative;
    }
  }
  $colors:  ('success', #67c23a, rgba(103,194,58,.1),rgba(103,194,58,.2)),
            ('info', #909399,hsla(220,4%,58%,.1),hsla(220,4%,58%,.2)),
            ('warning', #e6a23c, rgba(230,162,60,.1), rgba(230,162,60,.2)),
            ('danger',  #f56c6c,hsla(0,87%,69%,.1),hsla(0,87%,69%,.2));
  @each $name, $color, $bgColor, $bcColor in $colors {
    .id-tag--#{$name} {
      color: $color;
      background-color: $bgColor;
      border-color: $bcColor;
    &.is-hit {
        border-color:$color;
    }
    } 
    // .id-tag--info .is--hit{}
  }
</style>
