<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Inject } from 'vue-property-decorator'


interface IDRadioButton {
  value?: string | number,
  disabled?: boolean
}

@Component
class RadioButton extends Vue {

  @Inject('IDRadioGroup') readonly IDRadioGroup!: any
  @Prop({ required: false })
  private value: string | number
  @Prop({ required: false, default: false })
  private disabled: boolean

  private state: IDRadioButton
  constructor() {
    super()
    this.state = {
      value: '',
      disabled: false,
    }
  }
  // 仿react，setState
  setState(obj: IDRadioButton) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <label class={`id-radio-button 
                ${this.isActive ? 'is-active' : ''}
                ${this.state.disabled ? 'is-disabled' : ''}
      `} role='radio' on-click={this.handleChange}>
        <span class='id-radio-button__inner'>
          {this.state.value}
        </span>
      </label>
    )
  }
  get isActive() : boolean {
    // console.log(this.IDRadioGroup.state.value, this.value)
    return this.IDRadioGroup.state.value === this.state.value
  }
  handleChange(val) {
    if (!this.state.disabled) { // disabled 存在无动作
      if (this.IDRadioGroup) { // radio-group存在时
        this.IDRadioGroup.emitChange(this.state.value)
      }
    }
  }
  @Watch('value', { immediate: true })
  onValueChange(value: string | number) {
    this.setState({ value })
  }
  @Watch('disabled', { immediate: true })
  onDisabledChange(value: boolean) {
    this.setState({ disabled: value })
  }
  @Watch('IDRadioGroup', { deep: true })
  onIDRadioGroupChange(IDRadioGroup: any) {
    // console.log(IDRadioGroup, IDRadioGroup.state.value, this.isActive)
    // this.setState()
  }
}
export default RadioButton
</script>
<style lang="scss">
  .id-radio-button {
    width: 80px;
    height: 36px;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    color: #333;
    &.is-active {
      background: #409eff;
      color: #fff;
      border-color: #409eff;
      outline: none;
    }
    &.is-disabled {
      cursor: not-allowed;
      color: #aaa;
    }
  }
</style>

