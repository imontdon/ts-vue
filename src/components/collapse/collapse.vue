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
      <div>
        {this.$slots.default}
      </div>
    )
  }
}
export default Collapse
</script>
