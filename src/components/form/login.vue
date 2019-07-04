<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface loginForm {
  visible?: boolean
}

@Component
class LoginForm extends Vue {
  @Prop({ required: false, default: false })
  public formVisible?: boolean
  private state: loginForm
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  render(h: CreateElement) {
    return (
      <div>
        {
          this.formVisible ? 
          (
            <div class='login-back'>
              <div class='login-form'>
                <slot></slot>
              </div>
            </div>
          ) : null 
        }
      </div>
    )
  }
  setState(obj: loginForm) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key]
    })
  }
  mounted() {
    document.addEventListener('click', (e: MouseEvent): void =>  {
      e.preventDefault()
      const target = e.target as HTMLInputElement
      if (target.className === 'login-back') {
        this.setState({ visible: false })
        this.formVisible = false
      }
    })
  }
  @Emit('change')
  emitVisible(visible: boolean) {}
  @Watch('formVisible')
  onFormVisibleChange(val, oldVal) {
    this.setState({ visible: val })
    this.emitVisible(this.state.visible)
  }
}
export default LoginForm
</script>
<style lang="scss">
  .login-back {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 100;
    .login-form {
      position: absolute;
      height: 340px;
      width: 320px;
      border: 1px solid #aaa;
      top: 50%;
      margin-top: -170px;
      left: 50%;
      margin-left: -160px;
      z-index: 100;
      background: #fff;
      border-radius: 4px;
    }
  }
</style>

