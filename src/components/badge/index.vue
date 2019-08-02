<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDBadge {
  value?: string | number
  max?: number
  isdot?: boolean
}

@Component
class Badge extends Vue {
  @Prop({ required: false, default: '' })
  private value: string | number
  @Prop({required: false, default: ''})
  private max: number
  @Prop({required: false, default: false})
  private isdot: boolean

  private state: IDBadge
  constructor() {
    super()
    this.state = {
      value: '',
      max: 0,
      isdot: false,
    }
  }
  setState(obj: IDBadge) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    const value = this.state.value
    const max = this.state.max
    return (
      <sup
      type = 'sup'
      class = {`id-sup is-fixed`}
      >
      {
       (typeof value == 'number' && typeof max == 'number') ? ((value < max) ? value : max) : value
      }
      </sup>
    )
  }
  @Watch('value', { immediate: true })
  onvalueChange(val: string | number, oldVal: string | number) {
    this.setState({ value: val })
  }
  @Watch('max', { immediate: true })
  onmaxChange(val: number, oldVal: number) {
    this.setState({ max: val })
  }
  @Watch('isdot', { immediate: true })
  onIconChange(val: boolean, oldVal: boolean) {
    this.setState({ isdot: val })
  }

}
export default Badge
</script>
<style lang="scss">
    .id-sup{
        background-color: #f56c6c;
        border-radius: 10px;
        color: #fff;
        display: inline-block;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        padding: 0 6px;
        text-align: center;
        white-space: nowrap;//强制不换行
        border: 1px solid #fff;
    }
   .is-fixed{
      position: absolute;
      top: 0;
      right: 10px;
      transform: translateY(-50%) translateX(100%);
    }
</style>