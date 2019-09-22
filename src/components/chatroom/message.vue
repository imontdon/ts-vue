<script lang="tsx">
// 第三方库
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from "vuex-class";

// interface
import { Message, User, SelectItem, Result } from './chatroom' 

import IDButton from '../button/index.vue'
// images
import logo from '../../assets/img/png/h5-logo.png'
interface IDRoomMessage {
  message?: Message,
  selectList?: SelectItem []
}
@Component({
  components: {
    'id-button': IDButton
  }
})
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
        content: '获取更准确的就诊指导',
        type: 'one'
      },
      {
        title: '智能问药',
        content: '寻找适合您的用药方案',
        type: 'two'
      },
      {
        title: '健康科普',
        content: '学习患者教育健康知识',
        type: 'three'
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
        { /* 复杂化了。。。
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
                  this.state.message.isTip ? // 是不是提示
                  (`导巡助手提示: 已进入${this.state.message.message}功能`) : 
                    this.state.message.isQuestion ? // 是不是问题
                      (
                        <span class={`question-answer`}>
                          {
                            this.state.message.message
                          }
                          {
                            this.state.message.hasAnswer ?
                              null : (
                                <span>
                                  <span 
                                    class={`question-answer__select`}
                                    onClick={() => this.emitQuestionClick(false)}
                                  >没有</span>
                                  {
                                    this.state.message.needSelected ? 
                                      (
                                        <span
                                          class={`question-answer__select`}
                                          onClick={() => this.emitQuestionClick(true)}
                                        >
                                          有
                                        </span>
                                      ) : null
                                  }
                                </span>
                              )
                          }
                        </span>
                      ) : this.state.message.message
                }
                {
                  this.state.message.isResult ? 
                    (
                      <span class={`id-chat-room__message-result`}>
                        {
                          this.state.message.message
                        }
                        {
                          this.state.message.resultSug.map((item: Result, index: number) => {
                            return (
                              <div>
                                <span class={`active-span`} onClick={() => this.routerPush(item.route)}>{ item.content }</span>
                              </div>
                            )
                          })
                        }
                      </span>
                    ) : null
                }
                {
                  this.state.message.isDrug ? 
                  (
                    <div>
                      <dt style={`margin-bottom: .2rem;`}>导诊助手推荐药品如下:</dt>
                      {
                        this.state.message.drugList.map((item: string, index: number) => {
                          return (
                            <dl>
                              <span>{ item }</span>
                            </dl>
                          )
                        })
                        /* 
                          { // 点击查看更多放在末尾的（按原型图）
                            index === this.state.message.drugList.length - 1 ? 
                              (
                                <span style={`margin-left: .8rem;`}>点击查看更多</span>
                              ) : null
                          }
                        */
                      }
                      <dl style={`color: skyblue;`} onClick={() => this.routerPush('')}>
                        点击查看更多
                      </dl>
                    </div>
                  ) : null
                }
                {
                  this.state.message.isInfo ? 
                    (
                      <div>
                        <dt style={`font-size: .40rem; font-weight: bold;`}>
                          {this.state.message.infoTitle}
                        </dt>
                        <dl>
                          { this.state.message.infoContent }
                        </dl>
                        <dl style={`color: skyblue;`}>点击查看更多</dl>
                      </div>
                    ) : null
                }
              </span>
            </div>
          )
        }
      </div>
    )
  }
  routerPush(routeName: string) {}
  @Emit('click')
  emitClick(item: SelectItem | string) { }
  @Emit('question')
  emitQuestionClick(answer: boolean) {
    // 回答问题后消除选择的对话框
    const singleMsg: Message = this.state.message
    singleMsg.hasAnswer = true
    this.setState({ message: singleMsg })
  }
  @Watch('message', { immediate: true })
  onMessageChange(newVal: Message) {
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
    font-size: 0.32rem;
    border-radius: .4rem;
    // padding: .2rem;
    margin: .2rem;
    min-width: 0%;
    max-width: 60%;
    word-break: break-all;
    padding: .2rem .4rem;
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
    .question-answer {
      &__select {
        border: 1px solid #aaa;
        margin-top: .2rem;
        padding: .06rem .4rem;
        border-radius: .5rem;
        font-size: .28rem;
        margin-left: .2rem;
        line-height: 3;
      }
    }
    &-result {
      .active-span {
        color: skyblue;
      }
    }
    .slide-selected {
      width: 160%;
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
