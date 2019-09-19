<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Provide} from 'vue-property-decorator'

interface IDCollapse {
    accordion?: boolean,
    value?: string | number | string[] | number[] 
}

@Component
class Collapse extends Vue {
  @Provide() IDCollapse = this
  @Prop({ required: false, default: false })
  private accordion: boolean
  @Prop({ required: false, default: '' })
  private value: string | number | string[] | number[]  

  private state: IDCollapse

  constructor() {
    super()
    this.state = {
        accordion: false,
        value: '',
    }
  }
  setState(obj: IDCollapse) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div class="id-collapse">
        <p style="color: red">{}</p>
        {this.$slots.default}
      </div>
    )
  }
  // 通过计算属性获取state中的activeName
  get getActiveName(): string | number | string[] | number[]{
      console.log(this.$store.state.collapse.activeName)
      return this.$store.state.collapse.activeName
  }
  // 监听activeName属性的变化 并将其赋值给value
  @Watch('getActiveName', { immediate: true })
  onGetActiveNameChange(val: string | number | string[] | number[], oldVal: string | number | string[] | number[]) {
    this.setState({ value: val })
  }
  // value属性是当前默认要激活的面板
  // activeName属性是用户点击的面板

  // setActiveName(activeName){
  //   activeName = [].concat(this.$store.state.activeName)
  // }
  @Watch('accordion', { immediate: true })
  onAccordionChange(val: boolean, oldVal: boolean) {
    this.setState({ accordion: val })
  }
  @Watch('value', { immediate: true })
  onValueChange(val: string | number | string[] | number[], oldVal: string | number | string[] | number[]) {
    this.setState({ value: val })
    // this.$store.state.activeName = [].concat(val)
  }
}

export default Collapse
</script>
