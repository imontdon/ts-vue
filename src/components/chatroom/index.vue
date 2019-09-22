<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from "vuex-class";

import IDRoomMessage from './message.vue'
import IDInput from '../input/index.vue'

import { Message, User, SelectItem } from './chatroom'
import logo from '../../assets/img/png/h5-logo.png'
interface IDChatRoom {
  list?: Array<Message>,
  text?: string,
  status?: string
}

@Component({
  components: {
    'id-room-message': IDRoomMessage,
    'id-input': IDInput
  }
})
class ChatRoom extends Vue {
  @Getter("userInfo") currentUser!: User;
  @Getter("needSelected") needSelected!: boolean;
  @Action("setlectCard") setlectCard;
  private state: IDChatRoom
  constructor() {
    super()
    this.state = {
      list: [
        {
          from: {
            username: 'robot'
          },
          to: '',
          message: '您好!我是就诊助手小卓,可为您提供分诊、导诊、药物咨询、健康科普等服务哦~',
          isTip: false
        }
      ],
      text: '',
      status: 'normal'
    }
  }
  // 仿react，setState
  setState(obj: IDChatRoom) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  mounted() {
  }
  render(h: CreateElement) {
    const Header = (
      <div class={`id-chat-room__header`}>
        <img src={logo} />
        <id-input
          readonly={true}
          suffix={'next'}
        ></id-input>
      </div>
    )
    const MessageList = (
      <div class={`id-chat-room__message-list`}>
        {
          this.state.list.map((message, index) => {
            return (
              <id-room-message 
                message={message} 
                onClick={this.handleClick}></id-room-message>
            )
          })
        }
      </div>
    )
    const Footer = (
      <div class={`id-chat-room__footer`}>
        <i class={`id-icon icon-microphone`}></i>
        <id-input
          placeholder={'请输入症状/疾病/药品'}
          onInput={this.onInput}
          value={this.state.text}
          onKeyup={this.sendMessage}
        >
          <span 
            class={`id-input__inner-span`} 
            onClick={this.sendMessage}
          >
            发送
          </span>
        </id-input>
      </div>
    )
    return (
      <div class={`id-chat-room`}>
        { Header }
        { MessageList }
        { Footer }
      </div>
    )
  }
  onInput(value: string) {
    this.setState({ text: value })
  }
  // 点击选择类型卡的时候触发
  handleClick(item: SelectItem) {
    console.log(item)
    // 微延迟，不然太机器化
    let timer = setTimeout(() => {
      clearTimeout(timer)
      const messageList = this.state.list
      messageList.push({
        from: { username: 'robot' },
        to: this.currentUser,
        message: item.title,
        isTip: true
      })
      this.setState({ list: messageList })
      this.setState({ status: item.title })
      let t = setTimeout(() => {
        clearTimeout(t)
        const list = document.querySelector('.id-chat-room__message-list') as HTMLElement
        list.scrollTop = list.scrollHeight + (list.scrollHeight - list.offsetHeight)
        // console.log(list.scrollTop, list.scrollHeight, list.offsetHeight)
      }, 100)
    }, 500)
  }
  sendMessage() {
    const messageList = this.state.list
    messageList.push({
      from: this.currentUser,
      to: { username: 'robot' },
      message: this.state.text,
      isTip: false
    })
    this.setState({ list: messageList })
    this.setState({ text: '' })
    if (this.needSelected) {
      // 请求数据
      setTimeout(() => {
        const data = this.state.list
        data.push({
          from: {
            username: 'robot'
          },
          to: this.currentUser, 
          isTip: false,
          isSelect: true
        })
        this.setState({ list: data })
        this.setlectCard(false)
      }, 500)
    }
    let t = setTimeout(() => {
      clearTimeout(t)
      const list = document.querySelector('.id-chat-room__message-list') as HTMLElement
      list.scrollTop = list.scrollHeight + (list.scrollHeight - list.offsetHeight)
      // console.log(list.scrollTop, list.scrollHeight, list.offsetHeight)
    }, 100)
  }
}
export default ChatRoom
</script>
<style lang="scss">
  .id-chat-room {
    display: flex;
    flex-direction: column;
    width: 100%;
    &__header {
      height: 1.4rem;
      width: inherit;
      background: rgb(26, 188, 95);
      display: flex;
      align-items: center;
      justify-content: space-around;
      .id-input {
        border: 0;
        height: .5rem;
        width: 2rem;
        background: rgb(79, 192, 127);
        border-radius: .4rem;
        .id-input__inner {
          border: 1px solid rgb(79, 192, 127);
          position: absolute;
          border-radius: .4rem;
          outline: none;
          &:focus {
            border: 0;
          }
        }
        .id-suffix-icon {
          right: .04rem;
        }
      }
    }
    &__message-list {
      position: absolute;
      top: 1.4rem;
      bottom: 1rem;
      overflow: auto;
    }
    &__footer {
      position: fixed;
      bottom: 0;
      height: 1rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .id-icon {
        margin-left: .2rem;
        font-size: 0.6rem;  
      }
      .id-input {
        height: 0.6rem; 
        width: 90%;
        margin-left: .1rem;
        border-radius: .4rem;
        &__inner {
          border-radius: .4rem !important;
          position: absolute;
          border: 0 !important;
        }
        &__inner-span {
          position: absolute;
          font-size: 0.32rem;
          right: .6rem;
          top: .1rem;
          color: rgb(79, 192, 127);
        }
      }
    }
  }
</style>
