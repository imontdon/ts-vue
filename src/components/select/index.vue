<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Provide } from 'vue-property-decorator'
import IDInput from '@/components/input/index.vue'
interface IDSelect {
  icon?: string,
  type?: string
  value?: string,
  placeholder?: string,
  clearable?: boolean
  // options?: Array<Option>,
  input?: Vue
}

/* interface Option {
  value: string,
  label: string
} */
@Component({
  components: {
    'id-input': IDInput,
  }
})
class Select extends Vue {

  @Provide() IDSelect = this
  @Prop({ required: true, default: '' })
  private value: string
  /* @Prop({ required: true, default: () => [] })
  private options: Array<Option> */
  @Prop({ required: false, default: '' })
  private placeholder: string
  @Prop({ required: false, default: '' })
  private clearable: boolean

  private state: IDSelect
  constructor() {
    super()
    this.state = {
      icon: '',
      type: '',
      value: '',
      placeholder: '',
      clearable: false,
      // options: [],
      input: null
    }
  }
  // 仿react，setState
  setState(obj: IDSelect) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div class='id-select'>
        <div class='id-input'>
          <id-input
            type='text'
            readonly
            suffix='next'
            clearable={this.state.value.length > 0 && this.state.clearable ? this.state.clearable : false }
            // clearable
            on-clear= {this.handleClear}
            placeholder={this.state.placeholder}
            on-blur={this.handleBlur}
            on-click={this.handleClick}
            value={this.state.value}
          >
          </id-input>
        </div>
        {
          // this.$slots.default
        }
        {
          <div class='id-select-options' on-mouseup = {e => this.focusInput(e)}>
            <span class='triangle-up'></span>
            <ul class='id-select-options__content'>
              { // 注释：map不能onClick
                /* this.state.options.map(opt => {
                  return (
                    <li 
                      class='id-select-dropdown__item' 
                      on-click={this.changeSelected.bind(this, opt)}
                    >
                      { opt.label }
                    </li>
                  )
                }, this) */
                this.$slots.default
              }
            </ul>
          </div>
        }

      </div>
    )
  }
  mounted() {
    // const child = this.$children[1] as any
    // child.test(1)
    // console.log(this.$children)
  }



  handleClear() {
    this.setState({ value: '' })
  }
  handleClick(event: Event, input?: Vue) {
    this.rotateIcon(input)
    if (!this.state.input) {
      this.setState({ input })
    }
  }
  handleBlur(event: Event, input?: Vue) {
    // console.log('22222')
    // console.log(event)
    // this.rotateIcon(input, 0)
  }
  // 获取下拉框的值
  getSelectedVal(val: string) {
    this.setState({ value: val })
  }
  // 图标旋转
  rotateIcon(input: Vue, num?: number) {
    // 后缀图标
    const suffix = input.$el.querySelector('.id-suffix-icon') as HTMLElement
    // 下拉选项
    const options = input.$el.parentNode.parentNode.querySelector('.id-select-options') as HTMLElement
    const ul = options.querySelector('.id-select-options__content') as HTMLElement
    const transform: string = suffix.style.transform
    if (transform === 'rotate(0deg) scale(0.8)' || transform === '' || transform === 'rotate(0deg)') {
      suffix.style.transform = `rotate(90deg) scale(0.8)`
      if (num !== 0) {
        options.style.visibility = 'visible'
        ul.style.height = '120px'
        ul.style.transition = 'height .5s'
      }
    } else {
      suffix.style.transform = `rotate(0deg) scale(0.8)`
      options.style.visibility = 'hidden'
      ul.style.height = '0px'
      ul.style.transition = 'height .2s, visibility .2s'
    }
    if (num === 0) {
      suffix.style.transform = `rotate(0deg) scale(0.8)`
    }
    // suffix.style.transform = `rotate(${num}deg)`
    suffix.style.transformOrigin = 'center center'
    suffix.style.transition = 'transform 0.5s'
  }
  focusInput(event: MouseEvent) {
    if (event.button === 2) {
      const target: any = event.target
      const pNode = target.parentNode.parentNode.parentNode as any
      pNode.querySelector('.id-input__inner').focus()
    }
  }
  changeSelected(opt?: any) {
    // console.log(opt)
    this.setState({ value: opt.label })
    // this.emitChange() 还没做完emit给父组件
    this.rotateIcon(this.state.input, 0)
  }
  @Watch('value', { immediate: true })
  onValueChange(val: string, oldval: string) {
    this.setState({ value: val })
  }
  @Watch('placeholder', { immediate: true })
  onPlaceholderChange(val: string, oldval: string) {
    this.setState({ placeholder: val })
  }
  @Watch('clearable', { immediate: true })
  onClearableChange(val: boolean, oldval: boolean) {
    this.setState({ clearable: val })
  }
  /* @Watch('options', { immediate: true, deep: true })
  onOptionsChange(arr: Array<Option>, oldval: Array<Option>) {
    if (arr.length === 0) { console.error('id-select options 没有数据') }
    this.setState({ options: arr })
  } */
}
export default Select
</script>
<style lang="scss">
  .id-select {
    width: 100%;
    position: relative;
    .id-input {
      cursor: pointer;
    }
    .id-select-options {
      position: absolute;
      width: 80%;
      top: 52px;
      visibility: hidden;
      .triangle-up {
        width: 0;
        height: 0;
        position: absolute;
        left: 20px;
        top: -15px;
        border-width: 8px;
        border-style: solid;
        border-color: transparent transparent #d6d6d6 transparent;
        &:after{
          content: '';
          display: block;
          width: 0;
          height: 0;
          border-width: 8px;
          border-style: solid;
          border-color: transparent transparent #fff transparent;
          position: absolute;
          top: -7px;
          left: -8px;
        }
      }
      ul.id-select-options__content {
        width: 100%;
        height: 0;
        border: 1px solid #e4e7ed;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        transition: height .3s;
        overflow: auto;
        background: #fff;
        border-radius: 4px;
        overflow-x: hidden;
        &::-webkit-scrollbar {/*滚动条整体样式*/
          width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 6px;
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 20px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background: #fdfdfd;
        }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          -webkit-box-shadow: inset 0 0 5px #fff;
          border-radius: 20px;
          background: #fff;
        }
        li {
          width: 75%;
          padding: 0 25px ;
          height: 34px;
          line-height: 34px;
          font-size: 0.8rem;
          color: #606266;
          &:hover {
            background: #f5f7fa;
            cursor: pointer;
          }
          &.is-disabled {
            color: #c0c4cc;
            cursor: not-allowed;
          }
        }
        li:nth-child(1) {
          margin-top: 10px;
        }
        li:last-child {
          margin-bottom: 10px;
        }
      }
    }
  }
</style>

