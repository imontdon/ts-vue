<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Inject } from 'vue-property-decorator'

interface IDOption {
  value?: string,
  label?: string,
  key?: number,
  disabled?: boolean
}
/* interface Option {
  value: string,
  label: string,
  key: number,
  disabled?: false
} */
@Component
class Option extends Vue {

  @Inject('IDSelect') readonly IDSelect!: any
  /* @Prop({ required: true, default: () => {} })
  private options: Array<Option> */

  @Prop({ required: true, default: '' })
  private label: string
  @Prop({ required: true, default: '' })
  private value: string
  @Prop({ required: true, default: -1 })
  private key: number
  @Prop({ required: false, default: false })
  private disabled: boolean
  
  private state: IDOption
  constructor() {
    super()
    this.state = {
      value: '',
      label: '',
      key: -1,
      disabled: false
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
    const opt: any= {
      value: this.state.value,
      label: this.state.label,
      key: this.state.key,
      disabled: this.state.disabled
    }
    return (
      <span>
        {
          this.IDSelect.state.filterable ?
          ( // 有过滤器
            opt.label.indexOf(this.filterVal) > -1 ? 
            (
              <li
                class={
                  `id-select-dropdown__item
                  ${this.state.disabled ? 'is-disabled' : '' }
                  ${this.isActive ? 'is-active' : '' }
                  `
                } 
                on-click={this.changeSelected.bind(this, opt)}
              >
                { // <slot>用户自定义
                  this.$slots.default ?
                  (
                    this.$slots.default
                  ) : 
                  (
                    opt.label
                  )
                }
              </li>
            ) : (
              null
            )
          ) : ( // 没有过滤器的话
            <li
              class={
                `id-select-dropdown__item
                ${this.state.disabled ? 'is-disabled' : '' }
                ${this.isActive ? 'is-active' : '' }
                `
              } 
              on-click={this.changeSelected.bind(this, opt)}
            >
              { // <slot>用户自定义
                this.$slots.default ?
                (
                  this.$slots.default
                ) : 
                (
                  opt.label
                )
              }
            </li>
          )
        }
      </span>
    )
  }
  // computed
  get isActive() : boolean {
    // console.log(this.IDSelect.state.value === this.state.label)
    return this.IDSelect.state.value === this.state.label
  }
  get filterVal() : string {
    return this.IDSelect.state.value
  }
  mounted() {
    // console.log(this.IDSelect, 'IDSelect', this.$parent, this.IDSelect.state.value)
    // console.log(this.filterVal)
  }
  changeSelected(opt?: any) {
    if (!opt.disabled) {
      // const parent = this.$parent as any
      this.IDSelect.changeSelected(opt)
      // console.log(this.selectValue === this.state.label, this.state.label, this.selectValue)
    }
  }
  @Watch('value', { immediate: true })
  onValueChange(val: string, oldval: string) {
    if (val === '') { console.warn('id-option value 不可为空') }
    this.setState({ value: val })
  }
  @Watch('label', { immediate: true })
  onLabelChange(val: string, oldval: string) {
    if (val === '') { console.warn('id-option label 不可为空') }
    this.setState({ label: val })
  }
  @Watch('key', { immediate: true })
  onKeyChange(val: number, oldval: number) {
    this.setState({ key: val })
  }
  @Watch('disabled', { immediate: true })
  onDisabledChange(val: boolean, oldval: boolean) {
    this.setState({ disabled: val })
  }
  /* @Watch('filterVal', { immediate: true })
  onFilterValChange(val: string, oldval: string) {
    // this.setState({ disabled: val })
    if (this.IDSelect.state.value) {
      console.log('filterVal', val)
    }
  } */
}
export default Option
</script>
