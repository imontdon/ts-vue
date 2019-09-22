<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDInfo {
  title?: string,
  content?: string
}

@Component
class Info extends Vue {
  private state: IDInfo
  constructor() {
    super()
    this.state = {
      title: '',
      content: ''
    }
  }
  // 仿react，setState
  setState(obj: IDInfo) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  mounted() {
    if (this.$route.query.title !== '' && this.$route.query.title) {
      const title = this.$route.query.title as string
      const content = this.$route.query.content as string
      this.setState({ title })
      this.setState({ content })
    }
    if (this.$route.query.id) {
      const title = `感冒咳嗽是什么疾病`
      const content = `感冒咳嗽是一种气道变应性炎症，是非常常见的症状，几乎每个人都经历过咳嗽的烦恼，尤其是寒冬季节，很多老人、孩子和患者连门也不敢出，大大影响了生活质量。`
      this.setState({ title })
      this.setState({ content })
    }
  }
  render(h: CreateElement) {
    return (
      <div style={`    
            display: flex;
            flex-direction: column;
            align-items: center;
            line-height: 1.5;
            padding: 0.2rem .4rem;
            font-size: .32rem;`}>
        <div style={`font-size: .4rem; font-weight: bold;`}>{this.state.title}</div>
        <div>{this.state.content}</div>
      </div>
    )
  }
}
export default Info
</script>
