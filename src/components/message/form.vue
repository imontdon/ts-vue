<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import IDForm from '../form/index.vue'
import IDFormItem from '../form/item.vue'
import IDInput from '../input/index.vue'
import IDButton from '../button/index.vue'
// import Ajax from '../../request/request'
import { post, get } from '../../request'

interface Message {
  text?: string,
  boxVisible?: boolean,
  username?: string,
  password?: string,
  loading?: boolean
}

@Component({
  components: {
    'id-form': IDForm,
    'id-form-item': IDFormItem,
    'id-input': IDInput,
    'id-button': IDButton
  }
})
class MessageForm extends Vue {
  @Getter userIsLogin

  private state: Message
  constructor(props: any) {
    super(props)
    this.state = {
      text: '',
      boxVisible: false,
      username: '',
      password: '222',
      loading: false
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
        <id-form visible={this.state.boxVisible} on-change={this.changeVisible} >
          <id-form-item label='用户名'>
            <id-input 
              placeholder='请输入用户名' 
              value={this.state.username} 
              on-input= {this.getUserValue}
            ></id-input>
          </id-form-item>
          <id-form-item label='密码'>
            <id-input 
              type='password' 
              placeholder='请输入密码' 
              value={this.state.password} 
              on-keyup={this.keyup}
              on-input= {this.getPwdValue}
              clearable
              suffix='image'
            ></id-input>
          </id-form-item>
          <id-form-item>
            <id-button plain>
              注册
            </id-button>
            <id-button 
              type='primary' 
              on-click={this.login}
              loading={this.state.loading}
            >
              登录
            </id-button>
          </id-form-item>
        </id-form>
        <div class='form-textarea'>
          <textarea class='textarea-squre' rows="4" value={this.state.text} on-change={this.textAreaChange}/>
          <div class='user-options'>
            <span class='un-word'>
              <a on-click={this.show.bind(this, 'emoji')}>
                <i class='id-icon icon-grin'></i>
              </a>
              <a on-click={this.show.bind(this, 'files')}>
                <i class='id-icon icon-image'></i>
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
  login(e: Event) {
    /* const ajax = new Ajax('http://localhost:1997/api/user/login', {
      username: this.state.username,
      password: this.state.password
    }) */
    this.setState({ loading: true })
    post('/user/login', {
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      res = res.data 
      localStorage.setItem('user', res.data.user_name)
      this.setState({ loading: false })
      this.setState({ boxVisible: false })
      console.log(this.state.boxVisible)
    }).catch(e => {
      this.setState({ loading: false })
    })
  }
  // 仿react，setState
  setState(obj: Message) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key]
    })
  }

  getUserValue(val: string) {
    this.setState({ username: val })
  }
  getPwdValue(val: string) {
    this.setState({ password: val })
  }
  changeValue(val: string) {
    console.log(val)
  }
  keyup(e: KeyboardEvent) {
    e.keyCode === 13 ? this.login(e) : null 
  }
  // 文本框改变时间
  textAreaChange = (e) :void => {
    // console.log(e)
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
  .test {
    margin-left: 20px;
  }
</style>

