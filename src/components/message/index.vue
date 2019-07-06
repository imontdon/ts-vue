<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface Message {
  type?: string,
  duration?: number
}

@Component
class IDMessage extends Vue {
  private state: Message
  constructor() {
    super()
    this.state = {
      type: '',
      duration: 3000
    }
  }
  // 仿react，setState
  setState(obj: Message) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key]
    })
  }
  render(h: CreateElement) {
    return (
      <div>
        1111
      </div>
    )
  }
}
export default IDMessage
</script>
