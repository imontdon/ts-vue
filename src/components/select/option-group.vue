<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDOptionGroup {
  icon?: string,
  type?: string,
  label?: string
}

@Component
class OptionGroup extends Vue {

  @Prop({ required: true, default: '' })
  private label: string

  
  private state: IDOptionGroup
  constructor() {
    super()
    this.state = {
      icon: '',
      type: '',
      label: ''
    }
  }
  // 仿react，setState
  setState(obj: IDOptionGroup) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div class='id-select-group__wrap'>
        <li class='id-select-group__title'>{ this.state.label }</li>
        <li>
          <ul class='el-select-group'>
            { this.$slots.default }
          </ul>
        </li>
      </div>
    )
  }

  @Watch('label', { immediate: true })
  onLabelChange(val: string, oldVal: string) {
    this.setState({ label: val })
    console.log(val)
  }
}
export default OptionGroup
</script>
