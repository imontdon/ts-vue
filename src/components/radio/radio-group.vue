<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Provide } from 'vue-property-decorator'

interface IDRadioGroup {
  icon?: string,
  type?: string,
  value?: string | number,
}

@Component
class RadioGroup extends Vue {
  @Provide() IDRadioGroup = this

  @Prop({ required: false, default: '' })
  private value: string | number
  
  private state: IDRadioGroup
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }
  // 仿react，setState
  setState(obj: IDRadioGroup) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div class='el-radio-group'>
        {
          this.$slots.default
        }
      </div>
    )
  }
  @Emit('change')
  emitChange(val: string | number) {}
  @Watch('value', { immediate: true })
  onValueChange(val: string | number) {
    this.setState({ value: val })
  }
}
export default RadioGroup
</script>
