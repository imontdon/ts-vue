<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDSelect {
  icon?: string,
  type?: string
}

@Component
class Select extends Vue {
  private state: IDSelect
  constructor() {
    super()
    this.state = {
      icon: '',
      type: ''
    }
  }
  // 仿react，setState
  setState(obj: IDSelect) {
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
export default Select
</script>
