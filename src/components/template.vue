<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDButton {
  icon?: string,
  type?: string
}

@Component
class Button extends Vue {
  private state: IDButton
  constructor() {
    super()
    this.state = {
      icon: '',
      type: ''
    }
  }
  // 仿react，setState
  setState(obj: IDButton) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div></div>
    )
  }
}
export default Button
</script>
