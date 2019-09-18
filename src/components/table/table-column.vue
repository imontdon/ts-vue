<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Inject } from 'vue-property-decorator'

import IDTable from './index.vue'
interface IDTableColumn {
}

@Component
class TableColumn extends Vue {
  @Inject('IDTable') readonly IDTable!: IDTable

  private state: IDTableColumn
  constructor() {
    super()
    this.state = {
      icon: '',
      type: ''
    }
  }
  // 仿react，setState
  setState(obj: IDTableColumn) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div>?</div>
    )
  }
  mounted() {
    console.log(this.IDTable)
    if (!this.IDTable) {
      console.error('id-table-column必须放在id-table中')
    }
  }
}
export default TableColumn
</script>
