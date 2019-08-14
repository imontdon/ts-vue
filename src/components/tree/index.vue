<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDTree {
  data?: Array<any>
}

@Component
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
    return (
      <div class={`id-tree`}>
        {this.state.data.map((item: any, index: number): HTMLElement => {
          return (
            <div class={`id-tree-node ${item.active ? 'is-focus': ''}`} 
                 onClick={this.handldClick.bind(this, item, index)}
            >
              <span class={`id-tree-node__icon`}>
                <i class='id-icon icon-next'></i>
              </span>
              <span class={`id-tree-node__label`}>{item.label}</span>
            </div>
          )
        })}
      </div>
    )
  }
  handldClick(item: any, index: number, e: Event) {
    if (!item.active) {
      item.active = true
    } else {
      item.active = false
    }
    const data = this.state.data
    data.splice(index, 1, item)
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
    &-node {
      display: flex;
      cursor: pointer;
      width: 100%;
      height: 24px;
      font-size: 14px;
      align-items: center;
      &.is-focus {
        .id-tree-node__icon {
          transform: rotate(90deg);
          transition: transforem 3s;
        }
      }
      &:hover {
        background: #ebebeb;
      }
    }
  }
</style>
