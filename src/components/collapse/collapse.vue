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
        {this.$slots.default}
      </div>
    )
  }
  setActiveName(activeName){
    activeName = [].concat(activeName)
  }
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
