<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Model, Provide, Inject } from 'vue-property-decorator'
import IDRadioGroup from './radio-group.vue'

interface IDRadio {
  value?: string | number,
  // checked?: boolean,
  disabled?: boolean
}

@Component
class Radio extends Vue {

  @Inject('IDRadioGroup') readonly IDRadioGroup!: IDRadioGroup
  /* @Prop({ required: false, default: '' })
  private checked: boolean */
  @Prop({ required: false, default: '' })
  private value: string
  @Prop({ required: false, default: '' })
  private disabled: boolean
  private state: IDRadio

  constructor() {
    super()
    this.state = {
      value: '',
      // checked: false,
      disabled: false
    }
  }
  // 仿react，setState
  setState(obj: IDRadio) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <label class={`id-radio
                    ${this.isChecked ? 'is-checked' : ''}
                    ${this.state.disabled ? 'is-disabled' : ''}
      `} 
        on-click = {this.changeModel}
      >
        <span class={`id-radio__squre`}>
          <span class={`id-radio__inner 
                        ${this.isChecked ? 'is-checked' : ''}
                        ${this.state.disabled ? 'is-disabled' : ''}
          `}></span>
          <input type='radio' class={`id-radio__input 
                                        ${this.isChecked ? 'is-checked' : ''}
                                        ${this.state.disabled ? 'is-disabled' : ''}
                                    `}
            disabled = {`${this.state.disabled ? 'disabled' : ''}`}
            checked = {`${this.isChecked ? 'checked' : ''}` === '' ? false : true}
          />
        </span>
        <span class={`id-radio__label 
                      ${this.isChecked ? 'is-checked' : ''}
                      ${this.state.disabled ? 'is-disabled' : ''}
        `}>
          {
            this.$slots.default ? 
              this.$slots.default : ''
          }
        </span>
      </label>
    )
  }
  get isChecked() : boolean {
    return this.IDRadioGroup.state.value === this.state.value
  }
  mounted() {
  }
  changeModel() {
    // this.setState({ model: this.state.value })
    if (!this.state.disabled) { // disabled 存在无动作
      if (this.IDRadioGroup) { // radio-group存在时
        this.IDRadioGroup.emitChange(this.state.value)
      } else {
        this.emitChange(this.state.value)
      }
    }
  }
  @Emit('change')
  emitChange(val: string | number) : void {}
  /* @Watch('checked', { immediate: true })
  onModelChange(val: boolean) {
    this.setState({ checked: val})
  } */
  @Watch('value', { immediate: true })
  onvalueChange(val: string | number) {
    this.setState({ value: val})
  }
  @Watch('disabled', { immediate: true })
  onDisabledChange(val: boolean) {
    this.setState({ disabled: val})
  }
  /* @Watch('IDRadioGroup', { deep: true })
  onIDRadioGroupChange(IDRadioGroup: any) {
    console.log('22222222', IDRadioGroup.state.value, this.state.value)
    this.setState({ checked: this.state.value === IDRadioGroup.value})
  } */
  /* @Watch('isChecked')
  onIsCheckedChange(val: string | number) {
    this.setState({ checked: val === this.state.value })
  } */
}
export default Radio
</script>
<style lang='scss'>
  .id-radio {
    margin-right: 30px;
    cursor: pointer;
    &.is-disabled {
      cursor: not-allowed;
      color: #aaa;
    }
    .id-radio__squre {
      position: relative;
      .id-radio__inner {
        border: 1px solid #DCDFE6;
        border-radius: 100%;
        width: 12px;
        height: 12px;
        background-color: #fff;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
        position: absolute;
        z-index: 1;
        top: 6px;
        &.is-disabled {
          cursor: not-allowed;
        }
        &:after {
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background-color: #fff;
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%) scale(0);
          transition: transform .15s ease-in;
          transform: translate(-50%,-50%) scale(1);
        }
        &.is-checked:not(.is-disabled) {
          border-color: #409eff;
          background: #409eff;
        }
        &.is-checked.is-disabled {
          border-color: #aaa;
          background: #aaa;
        }
      }
      .id-radio__input {
        position: absolute;
        top: 6px;
      }
    }
    .id-radio__label {
      font-size: 14px;
      margin-left: 10px;
      padding-left: 10px;
      &.is-checked:not(.is-disabled) {
        color: #409eff;
      }
    }
  }
</style>
