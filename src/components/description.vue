<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'




/**
 * 项目描述文档
 * 等做完id-table开始写
 * @yyk
 */
interface IDDescription {
  icon?: string,
  type?: string
}

@Component
class Description extends Vue {
  private state: IDDescription
  constructor() {
    super()
    this.state = {
      icon: '',
      type: ''
    }
  }
  // 仿react，setState
  setState(obj: IDDescription) {
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
export default Description
</script>
