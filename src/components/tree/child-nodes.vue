<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDChildNodes {
  data?: Array<Node>,
  level?: number,
  parentLevel?: number
}
interface Node {
  label: string,
  children?: Array<Node>,
  active?: boolean
}
@Component
class ChildNodes extends Vue {

  @Prop({ required: true })
  private data: Array<Node>
  @Prop({ required: true })
  private level: number
  @Prop({ required: true })
  private parentLevel: number

  private state: IDChildNodes
  constructor(data) {
    super(data)
    this.state = {
      data: [],
      level: 0,
      parentLevel: 1,
    }
  }
  // 仿react，setState
  setState(obj: IDChildNodes) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  handldClick(node: Node, index: number, e: Event) {
    e.preventDefault()
    if (!node.active) {
      node.active = true
    } else {
      node.active = false
    }
    const data = this.state.data
    data.splice(index, 1, node)
    this.setState({ data })
  }
  render(h: CreateElement) {
    return (
      <div class={`id-tree-node__children`}>
        {
          this.state.data.map((node: Node, index: number) => {
            return (
              <div class={`node__children children-level-${this.state.parentLevel}-${this.state.level}-${index + 1}`}>
                <div class={`tree-node ${node.active ? 'is-focus': ''}`} 
                    style={`padding-left: ${20 * this.state.level}px`}
                    onClick={this.handldClick.bind(this, node, index)}
                >
                  <span class={`id-tree-node__icon`} style={`${node.active && !node.children ? 'padding-left: 16px' : ''}`}>
                    {
                      node.active && !node.children ? 
                      null :
                      (<i class='id-icon icon-caretright'></i>)
                    }
                  </span>
                  <span class={`id-tree-node__label`}>{node.label}</span>
                </div>
                {
                  node.active && node.children && node.children.length > 0 ? 
                  (<ChildNodes data={node.children} level={this.state.level + 1} parentLevel={this.state.parentLevel}></ChildNodes>) : null
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  @Watch('data', { immediate: true })
  onDataChange(val: Array<Node>) {
    this.setState({ data: val })
  }
  @Watch('level', { immediate: true })
  onLevelChange(val: number) {
    this.setState({ level: val })
  }
  @Watch('parentLevel', { immediate: true })
  onParentLevelChange(val: number) {
    this.setState({ parentLevel: val })
  }
}
export default ChildNodes
</script>
