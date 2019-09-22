<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDRoomList {
}

@Component
class RoomList extends Vue {
  private state: IDRoomList
  constructor() {
    super()
    this.state = {
    }
  }
  // 仿react，setState
  setState(obj: IDRoomList) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div class={`id-chat-room__list`}>
        111
      </div>
    )
  }
}
export default RoomList
</script>
