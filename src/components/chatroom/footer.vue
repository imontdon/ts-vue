<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDRoomFooter {
}

@Component
class RoomFooter extends Vue {
  private state: IDRoomFooter
  constructor() {
    super()
    this.state = {
    }
  }
  // 仿react，setState
  setState(obj: IDRoomFooter) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div class={`id-chat-room__footer`}>
        111
      </div>
    )
  }
}
export default RoomFooter
</script>
