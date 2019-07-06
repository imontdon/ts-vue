<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface Input {
  type?: string,
  placeholder?: string,
  prefix?: string, // 前缀icon
  suffix?: string, // 后缀icon
  clearable?: boolean,
  value?: string
}

@Component
class IDInput extends Vue {
  @Prop({ required: false, default: 'text' })
  private type: string
  @Prop({ required: false, default: '' })
  private placeholder: string
  @Prop({ required: false, default: '' })
  private prefix: string
  @Prop({ required: false, default: '' })
  private value: string
  private state: Input
  constructor() {
    super()
    this.state = {
      type: 'text',
      placeholder: '',
      prefix: '',
      suffix: '',
      clearable: false,
      value: ''
    }
  }
  /**
   * 1.id-icon 要判断是否在icon列表中，在显示不在设null，暂时无判断
   */
  render(h: CreateElement) {
    const basicInput = ['type', 'password', 'submit'].join('')
    return (
      <div class={`id-input id-input__${this.state.type}`}>
        <input 
          class='id-input__inner'
          type={ basicInput.indexOf(this.state.type) > -1 ? this.state.type : 'text' } 
          // placeholder={ this.state.type === 'password' ? null : this.state.placeholder }
          placeholder={ this.state.placeholder }
          style={ this.state.prefix === '' ? 'padding-left: 10px' : null }
          value={this.state.value}
          on-input={(e) => this.emitInput(e.target.value)}
          on-change={(e) => this.emitChange(this.state.value)}
          on-keyup={e => this.emitKeyUp(e)}
        />
        {
          this.state.prefix ?  
          (
            <span class='id-prefix-icon'>
              <i class={`id-icon icon-${ this.state.prefix }`}></i>
            </span>
          ) : null
        }
      </div>
    )
  }
  setState(obj: Input) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key]
    })
  }

  @Emit('change')
  emitChange(val: string) { }
  @Emit('keyup')
  emitKeyUp(e: Event) { }
  @Emit('input')
  emitInput(val: string) { }

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
  @Watch('value')
  onValueChange(val: string, oldVal: string) {
    this.setState({ value: val })
  }
}

export default IDInput
</script>
<style lang="scss">
  $iconSize: 20px;
  $iconLeft: 5px;
  .id-input {
    position: relative;
    width: 100%;
    .id-input__inner {
      width: 88%;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      height: 40px;
      line-height: 40px;
      padding-left: $iconSize + $iconLeft;
      color: #606266;
    }
    /* #f56c6c */
    .id-input__inner:focus {
      outline: none;
      border-color: #409eff;
    }
    .id-prefix-icon {
      position: absolute;
      width: $iconSize;
      height: $iconSize;
      left: $iconLeft;
      top: 50%;
      margin-top: -10px;
    }
  }
</style>

