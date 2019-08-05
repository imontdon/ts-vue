<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { doesNotThrow } from 'assert';
import { setTimeout } from 'timers';
interface IDProgress {
  percentage?: number,
  type?: string,
  textInside?: false,
  showText?: true,
}

@Component
class Progress extends Vue {
  @Prop({ required: true, default: 0 })
  private percentage: number
  @Prop({ required: false, default: 'line' })
  private type: string


  private state: IDProgress
  constructor() {
    super()
    this.state = {
      percentage: 0,
      type:'line',
    }
  }
  render(h: CreateElement) {
      const progress = 
      <div class={`id-progress id-progress--${this.state.type}}`}>
        <div class="id-progress-bar">
          <div class="el-progress-bar__outer">
            <div class="el-progress-bar__inner">
            </div>
          </div>
        </div>
        <div class="id-progress__text">{`${this.state.percentage}%`}</div>
      </div>
      return progress
  }
  @Emit('click')
  emitClick(event: Event, input?: Vue) {
    console.log("触发父组件的自定义事件",)
   }

  @Watch('type', { immediate: true })
  onIconChange(val: string, oldVal: string) {
    this.setState({ type: val })
  }

  setState(obj: IDProgress) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
}
export default Progress
</script>

<style lang="scss">
.id-progress{
  position: relative;
  line-height: 1;
}
$styles: ('line', block, (0,0,15px,0), 350px),
         ('circle', inline-block, (0,15px,0,0), 126px);

@each $type, $display, $margin, $width in $styles{
  .id-progress--#{$type}{
    display: $display;
    margin: $margin;
    width: $width;
  }
}
  
</style>

