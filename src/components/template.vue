<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface Button {
  icon?: string,
  type?: string
}

@Component
class IDButton extends Vue {
  private state: Button
  constructor() {
    super()
    this.state = {
      icon: '',
      type: ''
    }
  }
  // 仿react，setState
  setState(obj: Button) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key]
    })
  }
  render(h: CreateElement) {
    return (
      <div></div>
    )
  }
}
export default IDButton
</script>
