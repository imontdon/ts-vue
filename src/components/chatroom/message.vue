<script lang="tsx">
// 第三方库
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from "vuex-class";

// interface
import { Message, User, SelectItem } from './chatroom' 

// images
import logo from '../../assets/img/png/h5-logo.png'
interface IDRoomMessage {
  message?: Message,
  selectList?: SelectItem []
}
@Component
class RoomMessage extends Vue {
  @Getter("userInfo") currentUser!: User;
  @Prop({ required: true, default: () => {} })
  private message: Message

  private state: IDRoomMessage
  constructor() {
    super()
    this.state = {
      message: {
        from: {
          username: '',
        },
        isTip: false,
        isSelect: false,
      },
      selectList: []
    }
  }
  // 仿react，setState
  setState(obj: IDRoomMessage) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  mounted() {
    // 请求接口
    const list: SelectItem[] = [
      {
        title: '症状自检',
        content: '获取更准确的就诊指导'
      },
      {
        title: '智能问药',
        content: '寻找适合您的用药方案'
      },
      {
        title: '健康科普',
        content: '学习患者教育健康知识'
      },
    ]
    this.setState({ selectList: list })
  }
  render(h: CreateElement) {
    let silder: HTMLElement = null
    if (this.state.message.isSelect) { // 省的渲染
      silder = (
        <div class={`slide-selected`}>
          {
            this.state.selectList.map((item, index) => {
              return (
                <span 
                  class={`slide-selected__items`} 
                  onClick={() => this.emitClick(item)}
                >
                  <dt>
                    <img src={logo} />
                    <span>{ item.title }</span>
                  </dt>
                  <dl>
                    { item.content }
                  </dl>
                </span>
              )
            })
          }
        </div>
      )
    }
    return (
      <div style={'display: flex;'} 
        class={`id-chat-room__message-parent
          ${this.state.message.isTip ? 
            'is-tip' : 
            this.state.message.from.username === this.currentUser.username ? 'own-message' : 'other-message'
          }
          `}
        >
        { /*
           * 消息类型是不是选择卡
           * 渲染不同的虚拟dom和类select-message/text-message
           */
          this.state.message.isSelect ? 
          (
            <div class={`id-chat-room__message select-message`}>
              { silder }
            </div>
          ) : 
          ( /*
             * 消息类型是不是提示
             * 加载不同的类名
             */

            <div class={`id-chat-room__message text-message
              ${this.state.message.isTip ? 
                'is-tip' : 
                this.state.message.from.username === this.currentUser.username ? 'own-message' : 'other-message'
              }
            `}>
              <span>
                {
                  this.state.message.isTip ? 
                  (`导巡助手提示: 已进入${this.state.message.message}功能`) : 
                  this.state.message.message
                }
              </span>
            </div>
          )
        }
      </div>
    )
  }
  @Emit('click')
  emitClick(item: SelectItem) { }
  @Watch('message', { immediate: true })
  onMessageChange(newVal: Message) {
    console.log(newVal)
    this.setState({ message: newVal })
  }
}
export default RoomMessage
</script>
<style lang="scss">
  .id-chat-room__message-parent {
    &.other-message {
      justify-content: flex-start;
    }
    &.own-message {
      justify-content: flex-end;
    }
    &.is-tip {
      justify-content: center;
    }
  }
  .id-chat-room__message {
    ::-webkit-scrollbar{width:0;height:1px}
    ::-webkit-scrollbar-thumb{border-radius:5px;-webkit-box-shadow:inset 0 0 5px rgba(0,0,0,.2);background:rgba(0,0,0,.2)}
    font-size: 0.32rem;
    border-radius: .4rem;
    padding: .2rem;
    margin: .2rem;
    min-width: 10%;
    max-width: 60%;
    word-break: break-all;
    &.other-message {
      background: #fff;
      float: left;
    }
    &.own-message {
      background: rgb(26, 188, 95);
      color: #fff;
      float: right;
    }
    &.select-message {
      width: 100%;
      height: 2rem;
      max-width: 100%;
      background: #fff;
      border-radius: .4rem;
      overflow-x: auto;
    }
    &.is-tip {
      max-width: 100%;
      margin: 0;
      font-size: .28rem;
    }
    .slide-selected {
      width: 152%;
      display: flex;
      height: 100%;
      span {
        width: 60%;
        margin-left: .2rem;
        dt {
          display: flex;
          align-items: center;
          img {
            width: .8rem;
            height: .8rem;
            border-radius: 100%;
          }
          span {
            margin-left: .2rem;
            font-size: .40rem;
            font-weight: bold;
          }
        }
        dl {
          margin-left: .3rem;
          margin-top: .1rem;
          width: 67%;
        }
      }
    }
  }
</style>
