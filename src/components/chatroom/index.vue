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
  status?: string,
  restQuestionList?: Message [],
  questionStatus?: string,
  inputPlaceholder?: string
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
  @Action("selectCard") selectCard;
  private state: IDChatRoom
  constructor() {
    super()
    this.state = {
      list: [],
      text: '感冒发烧',
      inputPlaceholder: '请输入症状/疾病/药品',
      status: 'normal',
      restQuestionList: [],
      questionStatus: 'un' // un, ing, ed
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
    setTimeout(() => {
      const robotMessage: Message = {
        from: {
          username: 'robot'
        },
        to: '',
        message: '您好!我是就诊助手小卓,可为您提供分诊、导诊、药物咨询、健康科普等服务哦~',
        isTip: false
      }
      const list = this.state.list
      list.push(robotMessage)
      this.setState({ list })
    }, 500)
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
                onQuestion={this.handleQuestion}
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
          placeholder={this.state.inputPlaceholder}
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
  // 输入框值改变绑定函数
  onInput(value: string) {
    this.setState({ text: value })
  }
  // 点击选择类型卡的时候触发
  handleClick(item: SelectItem) {
    // console.log(item)
    // 微延迟，不然太机器化

    // 每次选择一个卡片，就强制重置答题状态
    this.setState({ questionStatus: 'un' })
    const tip: Message = {
      from: { username: 'robot' },
      to: this.currentUser,
      message: item.title,
      isTip: true
    }
    this.pushMessage(tip, () => { // 要把提示语先推送出去在执行cb函数
      this.setState({ status: item.type })
      let message: Message = null
      if (item.type === 'one') { // 这里不能用this.state.status, setState有延迟
        message = {
          from: { username: 'robot' },
          to: this.currentUser,
          message: `请问是否还有其他的症状请继续输入? 如果没有请点击"没有"`,
          isQuestion: true,
          hasAnswer: false
        }
        this.setState({ inputPlaceholder: '请输入症状' })
      } else if (item.type === 'two') {
        message = {
          from: { username: 'robot' },
          to: this.currentUser,
          message: `请输入药品名称`,
        }
        this.setState({ inputPlaceholder: '请输入药品名称' })
      }
      this.pushMessage(message)
    })
  }
  // 回答问题触发
  handleQuestion(select: boolean) {
    const text: string = select ? '有' : '没有'
    const message: Message = {
      from: this.currentUser,
      to: {
        username: 'robot'
      },
      message: text,
      isTip: false
    }
    this.newMessage(message)
    if (this.state.restQuestionList.length === 0) { // 俩种状态, 1、刚开始答题；2、回答完所有问题
      // 刚开始答题
      if (this.state.questionStatus === 'un') {
        console.log('question请求数据')
        // 请求数据
        const questionList: Message[] = [
          {
            from: {
              username: 'robot'
            },
            to: this.currentUser,
            message: '请问是否有以下症状: 四肢无力',
            isQuestion: true,
            hasAnswer: false,
            needSelected: true
          },
          {
            from: {
              username: 'robot'
            },
            to: this.currentUser,
            message: '请问是否有以下症状: 鼻塞流鼻涕',
            isQuestion: true,
            hasAnswer: false,
            needSelected: true
          },
        ]
        const question: Message = questionList.reverse().pop()
        if (question !== undefined) { // 有数据
          this.pushMessage(question)
          this.setState({ questionStatus: 'ing' }) // 机器人发送消息成功进入答题状态
          this.setState({ restQuestionList: questionList.reverse() })
        }
      } else { // 结束答题
        this.setState({ questionStatus: 'ed' })
        console.log('question结束了吗?')
        const result: Message = {
          from: {
            username: 'robot',
          },
          to: this.currentUser,
          message: `根据以上症状，导诊助手初步判断为上呼吸道感染，建议您前往呼吸内科就诊`,
          isResult: true,
          resultSug: [ 
            { content: '点击去挂号', route: ''},
            { content: '感冒有哪些症状', route: ''},
            { content: '感冒该吃什么药', route: ''},
            { content: '如何预防感冒', route: ''},
          ]
        }
        this.pushMessage(result)
      }
    } else { // 防止用户第一步选择在输入框输入而不是选择‘没有’: 还没做第一步直接发消息的！
      console.log('question直接从现有数据取')
      // 直接从现有数据取
      const questionList: Message[] = this.state.restQuestionList
      const question: Message = questionList.reverse().pop()
      // console.log(question, questionList)
      if (question !== undefined) { // 有数据
        this.pushMessage(question)
        this.setState({ restQuestionList: questionList.reverse() })
      }
    }
  }
  // 手动发消息
  sendMessage() {
    if (this.state.status === 'normal') { // 未选择卡的状态
      if (this.state.text !== '') { // 发送消息时输入框不为空
        const data: Message = {
          from: this.currentUser,
          to: { username: 'robot' },
          message: this.state.text,
          isTip: false
        }
        this.newMessage(data)
        this.setState({ text: '' }) // 清空输入框
        if (this.needSelected) { // 第一次出现卡片选择的时候,命名重复了不想改了很烦
          // 请求数据，获取选择卡的所有类型??
          const message: Message = {
            from: {
              username: 'robot'
            },
            to: this.currentUser, 
            isTip: false,
            isSelect: true
          }
          this.pushMessage(message, () => {
            this.selectCard(false) // VUEX设置不在出现卡片选择器，好像不需要这一步...可以用status控制。。。
          })
        }
      }
    } else if (this.state.status === 'one') { // 症状自检
      // 晚点写
    } else if (this.state.status === 'two') { // 智能问药
      if (this.state.text !== '') { // 发送消息时输入框不为空
        const data: Message = {
          from: this.currentUser,
          to: { username: 'robot' },
          message: this.state.text,
          isTip: false
        }
        this.newMessage(data)
        this.setState({ text: '' }) // 清空输入框
        const message: Message = {
          from: {
            username: 'robot'
          },
          to: this.currentUser, 
          isTip: false,
          isSelect: true
        }
        this.pushMessage(message)
      }
    }
  }
  // 延迟（机器人回的要延迟）
  pushMessage(message: Message, cb?: Function) {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      this.newMessage(message)
      this.pageTurnDown() // 需要的话页面下移
      if (cb) {
        cb()
      }
    }, 500)
  }
  // 非延迟(自己发的要非延迟)
  newMessage(message: Message) {
    const messageList: Message[] = this.state.list
    messageList.push(message)
    this.setState({ list: messageList })
    this.pageTurnDown()
  }
  pageTurnDown() {
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
