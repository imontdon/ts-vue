<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Provide } from 'vue-property-decorator'

interface IDCheckBoxGroup {
  value?: Array<string>
}

@Component
class CheckBoxGroup extends Vue {

  @Provide() IDCheckboxGroup : CheckBoxGroup =  this
  @Prop({ required: true })
  private value: Array<string>

  public state: IDCheckBoxGroup
  constructor() {
    super()
    this.state = {
      value: []
    }
  }
  // 仿react，setState
  setState(obj: IDCheckBoxGroup) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div class='id-checkbox-group'>
        {
          this.$slots.default
        }
      </div>
    )
  }
  /** 
   * [处理value]
   * @param  {string} label [Required]
   */
  handleValue(label : string) : void {
    const index = this.state.value.findIndex(val => {
      return val === label
    })
    // 不能直接改变
    if (index > -1) {
      this.state.value.splice(index, 1)
    } else {
      this.state.value.push(label)
    }
    // 要直接改变
    /* const value = []
    this.state.value.forEach(val => {
      value.push(val)
    })
    if (index > -1) {
      value.splice(index, 1)
    } else {
      value.push(label)
    } */
    this.emitChange(this.state.value)
  }
  @Emit('change')
  emitChange(arr: Array<string>) {}
  @Watch('value', { immediate: true })
  onValueChnage(newVal: Array<string>) {
    this.setState({ value: newVal })
  }
}
export default CheckBoxGroup
</script>
