<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Inject } from 'vue-property-decorator'

interface IDOption {
  value?: string,
  label?: string,
  key?: number
}
/* interface Option {
  value: string,
  label: string
} */
@Component
class Option extends Vue {

  // @Inject('IDSelect') readonly IDSelect!: Vue
  /* @Prop({ required: true, default: () => {} })
  private options: Array<Option> */

  @Prop({ required: true, default: '' })
  private label: string
  @Prop({ required: true, default: '' })
  private value: string
  @Prop({ required: true, default: -1 })
  private key: number
  
  private state: IDOption
  constructor() {
    super()
    this.state = {
      value: '',
      label: '',
      key: -1,
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
    const opt = {
      value: this.state.value,
      label: this.state.label,
      key: this.state.key
    }
    return (
      /*  on-mouseup = {e => this.focusInput(e)} */
      // <div class='id-select-options'>
        // <span class='triangle-up'></span>
        /* <ul class='id-select-options__content'>
          { // 注释：map不能onClick
            this.state.options.map(opt => {
              return ( */
                <li 
                  class='id-select-dropdown__item' 
                  on-click={this.changeSelected.bind(this, opt)}
                >
                  { opt.label }
                </li>
              /* )
            }, this)
          }
        </ul> */
      // </div>
    )
  }
  mounted() {
    // console.log(this.IDSelect, 'IDSelect', this.$parent)
  }
  changeSelected(opt?: Option) {
    const parent = this.$parent as any
    parent.changeSelected(opt)
    // console.log(opt)
    // this.setState({ value: opt.label })
    // this.emitChange() 还没做完emit给父组件
    // this.rotateIcon(this.state.input, 0)
    
  }
  @Watch('value', { immediate: true })
  onValueChange(val: string, oldval: string) {
    console.log('value', val)
    if (val === '') { console.warn('id-option value 不可为空') }
    this.setState({ value: val })
  }
  @Watch('label', { immediate: true })
  onLabelChange(val: string, oldval: string) {
    if (val === '') { console.warn('id-option label 不可为空') }
    this.setState({ label: val })
  }
  @Watch('key', { immediate: true })
  onOptionsChange(val: number, oldval: number) {
    this.setState({ key: val })
  }
}
export default Option
</script>
