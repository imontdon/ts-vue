<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import LoginForm from '../form/login.vue'

interface Message {
  text?: string,
  boxVisible?: boolean
}

@Component({
  components: {
    'login-form': LoginForm
  }
})
class MessageForm extends Vue {
  @Getter userIsLogin!: boolean

  private state: Message
  constructor(props: any) {
    super(props)
    this.state = {
      text: '',
      boxVisible: false
    }
    /* Object.keys(this.state).forEach(key => {
      console.log(key)
      Object.defineProperty(this.state, key, {
        value: '',
        configurable: true,
        writable: false,
      })
    }) */
  }
  render(h: CreateElement) {
    return (
      <div class='form-squre'>
        <login-form formVisible={this.state.boxVisible} on-change={this.changeVisible}></login-form>
        <div class='form-textarea'>
          <textarea class='textarea-squre' rows="4" value={this.state.text} onChange={this.textAreaChange}/>
          <div class='user-options'>
            <span class='un-word'>
              <a on-click={this.show.bind(this, 'emoji')}>
                <i class='elm-icon icon-grin'></i>
              </a>
              <a on-click={this.show.bind(this, 'files')}>
                <i class='elm-icon icon-image'></i>
              </a>
            </span>
            <span>
              <button class='user-submit' on-click={this.submitText.bind(this, this.state.text)}>
                提交
              </button>
            </span>
          </div>
        </div>
      </div>
    )
  }

  // 点击表情或者上传图片时间，后续加
  show(type: string) {
    console.log(type)
  }
  // 防react，setState
  setState(obj: Message) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key]
    })
  }
  // 文本框改变时间
  textAreaChange = (e) :void => {
    this.setState({ text: e.target.value })
    // console.log(this.state)
  }
  changeVisible(visible: boolean) {
    this.setState({ boxVisible: visible })
    // console.log('change: ', this.state.boxVisible)
  }

  // 提交事件
  submitText(text: string) {
    if (this.userIsLogin) {
      this.emitSubmit(text)
    } else {
      this.setState({ boxVisible: !this.state.boxVisible })
      this.emitSubmit(this.state.boxVisible)
    }
  }
  @Emit('submit')
  emitSubmit(val: string|boolean) {}
}
export default MessageForm
</script>

<style lang="scss">
  .form-squre {
    width: 100%;
    height: 160px;
    .form-textarea {
      height: 120px;
      position: relative;
      margin: 10px;
      .textarea-squre {
        width: 90%;
        // height: 80%;
        padding: 10px;
        border: 1px solid #e74851;
        border-radius: 10px;
      }
      .user-options {
        width: 93%;
        display: flex;
        justify-content: space-between;
        .un-word {
          margin: 8px 0;
          a { cursor: pointer; width: 25px; float: left; }
          a:hover i {
            filter: drop-shadow(red 80px 0px);
            position: relative;
            left: -74px;
            border-right: 20px solid transparent;
          }
          a:nth-child(2) { margin-left: 10px; } 
          i {
            filter: drop-shadow(#e74851 80px 0px);
            position: relative;
            left: -74px;
            border-right: 20px solid transparent;
          }
        }
        .user-submit {
          color: #fff;
          background-color: #f56c6c;
          border-color: #f56c6c;
          line-height: 1;
          cursor: pointer;
          border: 0;
          padding: 8px 25px;
          border-radius: 6px;
          margin: 4px 0;
        }
      }
    }
  }
</style>

