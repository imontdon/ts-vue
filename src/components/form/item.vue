<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface FormItem {
  title?: string
}

@Component
class IDFormItem extends Vue {
  @Prop({ required: false, default: '' })
  private label: string
  private state: FormItem
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }
  render(h: CreateElement) {
    return (
      <div class='id-form-item'>
        <div class='id-form-item__label'>
          { this.state.title }
        </div>
        {
          this.$slots.default ? (
            <div class='id-form-item__content'>
              { this.$slots.default }
            </div>
          ) : null
        }
      </div>
    )
  }
  setState(obj: FormItem) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key]
    })
  }
  @Watch('label', { immediate: true })
  onLabelChange(val: string, oldVal: string) {
    this.setState({ title: val })
  }
}

export default IDFormItem
</script>
<style lang='scss'>
  .id-form-item {
    display: flex;
    align-items: center;
    margin: 10px;
    &__label {
      width: 20%;
    }
    &__content {
      width: 80%;
    }
  }
</style>