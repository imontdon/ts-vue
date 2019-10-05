<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import IDChildNodes from './child-nodes.vue'

interface IDTree {
  data?: Array<Node>
}
interface Node {
  label: string,
  children?: Array<Node>,
  active?: boolean
}
@Component({
  components: {
    'id-child-nodes': IDChildNodes
  }
})
class Tree extends Vue {

  @Prop({ required: true })
  private data: Array<any>

  private state: IDTree
  constructor() {
    super()
    this.state = {
      data: []
    }
  }
  // 仿react，setState
  setState(obj: IDTree) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    /* const childrenNode = (node: Node, index: number) => {
      node.active && node.children && node.children.length > 0 ? 
      (
        <id-child-nodes data={node.children} level={1} parentLevel={index + 1}></id-child-nodes>
      ) 
      : null
    } */
    const Tree = (
      <div class={`id-tree`}>
        {
          this.state.data.map((node: Node, index: number): HTMLElement => {
            return (
              <div class={`id-tree-node`}>
                <div class={`id-tree-node__parent ${node.active ? 'is-focus': ''}`}
                    onClick={this.handldClick.bind(this, node, index)}>
                  <span class={`id-tree-node__icon`}>
                    <i class='id-icon icon-caretright'></i>
                  </span>
                  <span class={`id-tree-node__label`}>{node.label}</span>
                </div>
                {
                  node.active && node.children && node.children.length > 0 ? 
                  (
                    <id-child-nodes data={node.children} level={1} parentLevel={index + 1}></id-child-nodes>
                  ) 
                  : null
                }
              </div>
            )
          })
        }
      </div>
    )
    return Tree
  }
  handldClick(node: Node, index: number, e: Event) {
    e.preventDefault()
    if (!node.active) {
      node.active = true
    } else {
      node.active = false
    }
    console.log(node, 1)
    const data = this.state.data
    data.splice(index, 1, node)
    this.setState({ data })
  }
  @Watch('data', { immediate: true, deep: true })
  onDataChange(val: Array<any>) {
    if (val.length > 0) {
      this.setState({ data: val }) 
    }
  }
}
export default Tree
</script>
<style lang="scss">
  .id-tree {
    .icon-caretright {}
    .id-tree-node {
      // 双击选中文本框问题
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      &__parent, &__children .tree-node {
        display: flex;
        cursor: pointer;
        // width: 100%;
        font-size: 14px;
        align-items: center;
        // transition: transform .5s;
        // transform: rotate(0deg);
        &.is-focus {
          .id-tree-node__icon {
            transition: transform .5s;
            transform: rotate(90deg);
          }
        }
        &:hover {
          background: #ebebeb;
        }
      }
    }
  }
</style>
