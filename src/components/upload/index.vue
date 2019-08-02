<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDUpload {
  icon?: string,
  type?: string
}

@Component
class Upload extends Vue {
  private state: IDUpload
  constructor() {
    super()
    this.state = {
      icon: '',
      type: ''
    }
  }
  // 仿react，setState
  setState(obj: IDUpload) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    const IDUpload = (
      <div class='id-upload'>
        111111
      </div>
    )
    return IDUpload
  }
}
export default Upload
</script>
