<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Inject } from 'vue-property-decorator'

interface IDOption {
  icon?: string,
  type?: string,
  options?: Array<Option>,
  input?: Vue
}
interface Option {
  value: string,
  label: string
}
@Component
class Option extends Vue {

  @Inject('IDSelect') readonly IDSelect!: Vue
  @Prop({ required: true, default: () => {} })
  private options: Array<Option>

  private state: IDOption
  constructor() {
    super()
    this.state = {
      icon: '',
      type: '',
      options: [],
      input: null
    }
  }
  // 仿react，setState
  setState(obj: IDOption) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      /*  on-mouseup = {e => this.focusInput(e)} */
      // <div class='id-select-options'>
        // <span class='triangle-up'></span>
        <ul class='id-select-options__content'>
          { // 注释：map不能onClick
            this.state.options.map(opt => {
              return (
                <li 
                  class='id-select-dropdown__item' 
                  on-click={this.changeSelected.bind(this, opt)}
                >
                  { opt.label }
                </li>
              )
            }, this)
          }
        </ul>
      // </div>
    )
  }
  mounted() {
    console.log(this.IDSelect, 'IDSelect', this.$parent)
  }
  changeSelected(opt?: Option) {
    const parent = this.$parent as any
    parent.changeSelected(opt)
    // console.log(opt)
    // this.setState({ value: opt.label })
    // this.emitChange() 还没做完emit给父组件
    // this.rotateIcon(this.state.input, 0)
    
  }
  test(a: number) {
    console.log(a)
  }
  @Watch('options', { immediate: true, deep: true })
  onOptionsChange(arr: Array<Option>, oldval: Array<Option>) {
    if (arr.length === 0) { console.error('id-select options 没有数据') }
    this.setState({ options: arr })
  }
}
export default Option
</script>
