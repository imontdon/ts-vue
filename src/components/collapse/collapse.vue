<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Provide} from 'vue-property-decorator'
import { type } from 'os'

interface IDCollapse {
    accordion?: boolean,
    value?: string | number | string[] | number[] 
    activeNames?: any[]
}

@Component
class Collapse extends Vue {
  @Provide() MainCollapse = this
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
        activeNames: []
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
  // activeNames中存放是否开始手风琴模式两种模式下的活跃name值 
  // 通过计算属性获取state中的activeName
  get getActiveName(): string | number{
      console.log(this.$store.state.collapse.activeName,'activeName值')
      return this.$store.state.collapse.activeName
  }
  @Watch('getActiveName', { immediate: true })
  onGetActiveNameChange(val: string | number, oldVal: string | number) {
    let index = this.state.activeNames.indexOf(val)
    if(index > -1){
        this.state.activeNames.splice(index, 1)
    }else{
      if(this.state.accordion){
        this.state.activeNames = [].concat(val)
      }else{    
        this.state.activeNames.push(val)
      }
    }
  }
  // value属性是当前默认要激活的面板
  // activeName属性是用户点击的面板
  @Watch('accordion', { immediate: true })
  onAccordionChange(val: boolean, oldVal: boolean) {
    this.setState({ accordion: val })
  }
  @Watch('value', { immediate: true })
  onValueChange(val: string | number | string[] | number[], oldVal: string | number | string[] | number[]) {
    this.setState({ value: val })
  }
}

export default Collapse
</script>
