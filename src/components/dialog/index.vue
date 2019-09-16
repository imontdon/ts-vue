<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDDialog {
  visible?: boolean,
  title?: string,
  canClose?: boolean
}

@Component
class Dialog extends Vue {

  @Prop({ required: true, default: false })
  private visible: boolean
  @Prop({ required: true, default: '提示' })
  private title: string

  private state: IDDialog
  constructor() {
    super()
    this.state = {
      visible: false,
      title: '提示',
      canClose: false
    }
  }
  // 仿react，setState
  setState(obj: IDDialog) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div
        class='id-dialog__warpper'
        onClick={this.clickDialog}
        onMouseDown={this.touchStart}
        style={`${this.state.visible ? 'display: block;' : 'display: none;'}`}>
        <div class='id-dialog' style='margin-top: 15vh;'>
          <div class='id-dialog__header'>
            <div class='id-dialog__header-title'>
              <span>{this.state.title}</span>
              <span onClick={this.closeDialog}><i class='id-icon icon-remove'></i></span>
            </div>
          </div>
          <div class='id-dialog__body'>
            {
              this.$slots.default
            }
          </div>
          <div class='id-dialog__footer'>
            {
              this.$slots.footer
            }
          </div>
        </div>
      </div>
    )
  }
  @Emit('close')
  emitCloseDialog() {}


  touchStart(e: Event) {
    console.log('touchStart', e)
    const target = e.target as HTMLElement
    if (target.className === 'id-dialog__warpper') {
      this.setState({ canClose: true })
    } else {
      this.setState({ canClose: false })
    }
  }
  clickDialog(e: Event) {
    const target = e.target as HTMLElement
    if (target.className === 'id-dialog__warpper') {
      // this.setState({ visible: false })
      this.closeDialog()
    }
  }
  closeDialog() {
    this.visible = false
    this.emitCloseDialog()
  }
  @Watch('visible', { immediate: true })
  onVisibleChange(newVal: boolean) {
    this.setState({ visible: newVal })
  }
  @Watch('title', { immediate: true })
  onTitleChange(newVal: string) {
    this.setState({ title: newVal })
  }
}
export default Dialog
</script>
<style lang="scss">
  @keyframes dialog-fade-in {
    0% {
      transform: translate3d(0, -20px, 0);
      opacity: 0;
    }
    100% {
      transform: translateZ(0);
      opacity: 1;
    }
  }
  @keyframes dialog-fade-out {
    0% {
      opacity: 1;
      transform: translateZ(0);
    }
    100% {
      transform: translate3d(0, -20px, 0);
      opacity: 0;
    }
  }
  .id-dialog__warpper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    z-index: 1998;
    background: rgba(0, 0, 0, 0.4);
    .id-dialog {
      position: relative;
      margin: 0 auto 50px;
      background: #fff;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
      box-sizing: border-box;
      width: 50%;
      animation: dialog-fade-in .3s;
      .id-dialog__header-title {
        padding: 15px;
        padding-bottom: 10px;
        display: flex;
        justify-content: space-between;
        i {
          cursor: pointer;
          font-weight: bold;
        }
      }
      .id-dialog__body {
        padding: 30px 20px;
        color: #606266;
        line-height: 24px;
        font-size: 14px;
      }
      .id-dialog__footer {
        padding: 15px;
        text-align: right;
      }
    }
  }
</style>
