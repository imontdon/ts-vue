<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDForm {
  visible?: boolean,
}


@Component
class Form extends Vue {
  @Prop({ required: false, default: false })
  public visible?: boolean
  private state: IDForm
  constructor() {
    super()
    this.state = {
      visible: false,
    }
  }
  render(h: CreateElement) {
    return (
      <div class='id-form'>
        {
          this.state.visible ? 
          (
            <div class='login-back' onClick={this.handleFormClick.bind(this)}>
              <div class='login-form'>
                {                                                                           
                  this.$slots.default ? (
                    <div>
                      { this.$slots.default }
                    </div>
                  ) : null
                }
              </div>
            </div>
          ) : null 
        }
      </div>
    )
  }
  
  handleFormClick(e) {
    e.preventDefault()
    e.stopPropagation()
    // console.log(e.target.className)
    if (e.target.className === 'login-back') {
        this.onVisibleChange(!this.state.visible)

        // this.visible = false
    }
  }
/*   setState(obj: IDForm) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 100)
  } */
  // 改了啥
  mounted() {
  }
  @Emit('change')
  emitVisible(visible: boolean) {}
  @Watch('visible')
  onVisibleChange(val: boolean) {
    this.$setState(this.state, { visible: val })
    this.emitVisible(val)
  }
}
export default Form
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
      padding: 20px;
    }
  }
</style>

