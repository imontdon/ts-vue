<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDMessage {
  type?: string,
  text?: string,
  duration?: number
}

@Component
class Message extends Vue {
  private state: IDMessage
  constructor() {
    super()
    this.state = {
      type: '',
      text: '',
      duration: 3000
    }
  }
  // 仿react，setState
  setState(obj: IDMessage) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key]
    })
  }
  render(h: CreateElement) {
    return (
      <div class={`id-message id-message__${this.state.type}`}>
        <i class='id-icon icon-image'></i>
        {this.state.text}
      </div>
    )
  }
}
export default Message
</script>
<style lang="scss">
  .id-message {
    position: fixed;
    top: 40px;
    text-align: center;
    left: 50%;
    min-width: 400px;
    z-index: 100;
  }
</style>