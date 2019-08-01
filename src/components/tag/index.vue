<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { doesNotThrow } from 'assert';
//定义属性接口 包含可选属性
interface IDTag {
  type?: string, //标签主题类型
  hit?: boolean, //是否描边
  color?: string, //背景色
  clearable?: boolean, //是否可关闭
  animationable?: boolean,
  hiddenTag?: boolean,
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
  @Prop({required: false, default: false})
  private animationable: boolean
  
  private state: IDTag
  constructor() {
    super()
    this.state = {
      type: 'default',
      hit: false,
      color: '',
      clearable: false,
      animationable: false,
      hiddenTag: false,
    }
  }
  render(h: CreateElement) {

    const mianContent =  (
      <span>
        {this.$slots.default}
        <span on-click={this.handleClick.bind(this)}>
          {this.state.clearable ? (<i class={`id-icon icon-cancel-circle`}></i>) : ''}
        </span>
      </span>
     )
    const mytag = (      
      <span 
        type='span' 
        on-close= {e => this.emitClose(e, this)}
        style={`background-color:${this.state.color}`}
        class={`id-tag id-tag--${this.state.type}
                ${this.state.hit? 'is-hit' : ''}
              `}>{mianContent}</span>
      )
      //关闭标签时 开了动画 过渡关闭 
      const result = this.state.hiddenTag ? (this.state.animationable ? (
        <span 
          type='span'
          on-close= {e => this.emitClose(e, this)}
          style={`background-color:${this.state.color}`}
          class={`id-tag id-tag--${this.state.type}
                  ${this.state.hit? 'is-hit' : ''}
                  slow-close
                `}>{mianContent}
        </span>
      ) :'') : mytag
      return result
  }
  handleClick() {
    this.state.hiddenTag = true
  }
  destoryTag(){

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

  @Watch('animationable', { immediate: true })
  onanimationableChange(val: boolean, oldVal: boolean) {
      this.setState({ animationable: val })
  }

  @Watch('hiddenTag', { immediate: true })
  onhiddenTagChange(val: boolean, oldVal: boolean) {
    if(this.state.hiddenTag){
      console.log(`hiddenTag:${val}`)
    }else{
      console.log(`hiddenTag:${val}`)
    }
  }
  setState(obj: IDTag) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
}
export default Tag
</script>

<style lang="scss">
  $paddingXAuto: 10px;
  $paddingAutoX: 30px;

  .slow-close{
    opacity: 0;
    transform: scaleX(0)
  }
  .hidden{
    display: none;
  }
  // .id-tag{
  //   // animation: rotating 0.3s forwards;
  // }
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
    transition: all 0.3s cubic-bezier(.55,0,.1,1);
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

