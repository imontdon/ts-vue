<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Provide } from 'vue-property-decorator'

// import { loading } from '../../directives/index'

interface IDTable {
  data?: Array<any>,
  stripe?: boolean,
  table?: table
}
interface table {
  title?: Array<Title>,
}
interface Title {
  label?: string,
  prop?: string,
  width?: string | number
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
      table: {
        title: []
      }
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
    const TableHeader = (
      <thead>
        {
          this.state.table.title.map(title => {
            console.log(title)
            return (
              <th>
                {title.label}
              </th>
            )
          })
        }
      </thead>
    )
    return (
      <div 
        class={`id-table ${this.state.stripe ? 'id-table__stripe' : ''}`}>
        <table>
          { TableHeader }
          <tbody>
            
          </tbody>
        </table>
      </div>
    )
  }
  mounted() {
    // console.log(this.$slots.default)
    const table: table = {
      title: []
    }
    this.$slots.default.forEach(lo => {
      table.title.push(lo.data.attrs)
    })
    this.setState({ table })
    setTimeout(() => {
      console.log(this.state.table)
    }, 1000)
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
<style lang="scss">
  .id-table {
    table {
      width: 100%;
    }
  }
</style>
