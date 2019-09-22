<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDRoomHeader {
}

@Component
class RoomHeader extends Vue {
  private state: IDRoomHeader
  constructor() {
    super()
    this.state = {
    }
  }
  // 仿react，setState
  setState(obj: IDRoomHeader) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div class={`id-chat-room`}>
        111
      </div>
    )
  }
}
export default RoomHeader
</script>
