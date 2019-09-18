<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Provide } from 'vue-property-decorator'

// import { loading } from '../../directives/index'

interface IDTable {
  data?: Array<any>,
  stripe?: boolean
}

@Component
class Table extends Vue {
  @Provide() IDTable: Table = this

  @Prop({ required: true, default: () => [] })
  public data: Array<any>
  @Prop({ required: false, default: false })
  public stripe: boolean

  public state: IDTable
  constructor() {
    super()
    this.state = {
      data: [],
      stripe: false,
    }
  }
  // 仿react，setState
  setState(obj: IDTable) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div 
        class={`id-table ${this.state.stripe ? 'id-table__stripe' : ''}`}>
        {
          this.$slots.default
        }
      </div>
    )
  }
  mounted() {
    // console.log(this.$slots) 
  }
  @Watch('data', { immediate: true, deep: true })
  onDataChange(newVal: Array<any>) {
    this.setState({ data: newVal })
  }
  @Watch('stripe', { immediate: true })
  onStripeChange(newVal: boolean) {
    this.setState({ stripe: newVal })
  }
}
export default Table
</script>
