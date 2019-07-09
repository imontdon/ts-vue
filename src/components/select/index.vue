<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import IDInput from '@/components/input/index.vue'

interface IDSelect {
  icon?: string,
  type?: string
}

@Component({
  components: {
    'id-input': IDInput
  }
})
class Select extends Vue {
  private state: IDSelect
  constructor() {
    super()
    this.state = {
      icon: '',
      type: ''
    }
  }
  // 仿react，setState
  setState(obj: IDSelect) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key]
    })
  }
  render(h: CreateElement) {
    return (
      <div class='id-select'>
        <div class='id-input'>
          <id-input
            type='text'
            readonly
            suffix='next'
            on-focus={this.handleFocus}
          >
          </id-input>
        </div>
      </div>
    )
  }
  handleFocus(event: Event) {
    console.log(event)
  }
}
export default Select
</script>
<style lang="scss">
  .id-select {
    width: 100%;
    cursor: pointer;
  }
</style>

