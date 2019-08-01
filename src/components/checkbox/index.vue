<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Inject } from 'vue-property-decorator'
import CheckboxGroup from './checkbox-group.vue'

interface IDCheckBox {
  label?: string,
  disabled?: boolean
}

@Component
class CheckBox extends Vue {

  @Inject('IDCheckboxGroup') readonly IDCheckboxGroup !: CheckboxGroup

  @Prop({ required: true })
  private label: string
  @Prop({ required: true })
  private disabled: boolean
  private state: IDCheckBox
  constructor() {
    super()
    this.state = {
      label: '',
      disabled: false
    }
  }
  // 仿react，setState
  setState(obj: IDCheckBox) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }

  get isChecked() : boolean {
    return this.IDCheckboxGroup.state.value.some(val => val === this.state.label)
    
  }
  mounted() {
    console.log(this.IDCheckboxGroup)
  }
  handleClick() {
    if (!this.state.disabled) {
      this.IDCheckboxGroup.handleValue(this.state.label)
    }
  }
  @Watch('label', { immediate: true })
  onLabelChnage(newVal: string) {
    this.setState({ label: newVal })
  }
  @Watch('disabled', { immediate: true })
  onDisabledChnage(newVal: boolean) {
    this.setState({ disabled: newVal })
  }
  render(h: CreateElement) {
    return (
      <label class={
          `id-checkbox
            ${this.isChecked ? 'is-checked' : '' } 
            ${this.state.disabled ? 'is-disabled' : ''}
          `
        }
        on-click={this.handleClick.bind(this)}
      >
        <span class={`id-checkbox__squre`}>
          <span class={`
                        id-checkbox__inner
                        ${this.isChecked ? 'is-checked' : '' } 
                        ${this.state.disabled ? 'is-disabled' : ''}
          `}></span>
          <input type='checkbox' class={
              ` 
                id-checkbox__input
                ${this.isChecked ? 'is-checked' : '' } 
                ${this.state.disabled ? 'is-disabled' : ''}
              `
            }
            checked = {this.isChecked ? 'checked' : false } 
          />
        </span>
        <span class={`
                      id-checkbox__label
                      ${this.isChecked ? 'is-checked' : '' } 
                      ${this.state.disabled ? 'is-disabled' : ''}
        `}>
          {
            this.state.label
          }
        </span>
      </label>
    )
  }
}
export default CheckBox
</script>
<style lang="scss">
  .id-checkbox {
    cursor: pointer;
    margin-right: 20px;
    &.is-disabled {
      cursor: not-allowed;
      color: #dcdfe6;
    }
    .id-checkbox__inner {
        position: relative;
        width: 12px;
        height: 12px;
        border-radius: 2px;
        background: #fafafa;
        border: 1px solid #dcdfe6;
        display: inline-block;
        z-index: 1;
        margin-right: 4px;
        top: 1px;
        transition: background-color .25s cubic-bezier(.71,-.46,.29,1.46);
      &.is-checked {
        background: #409eff;
        border: 1px solid #409eff;
      }
      &:after {
        content: '';
        position: absolute;
        color: #409eff;
        width: 3px;
        height: 7px;
        border: 1px solid #fff;
        left: 0;
        margin-left: 4.5px;
        margin-top: 1px;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg);
        transform-origin: center;
        transition: transform .15s ease-in .05s
      }
    }
    .id-checkbox__input {
      display: none;
    }
    .id-checkbox__label {
      &.is-checked {
        color: #409eff;
      }
    }
  }
</style>

