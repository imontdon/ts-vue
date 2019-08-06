<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { doesNotThrow } from 'assert';
import { setTimeout } from 'timers';
interface IDProgress {
  percentage?: number,
  type?: string,
  textInside?: boolean,
  showText?: boolean,
  strokeWidth?: number,
  status?: string,
}
// 类型 和 圆形进度条
@Component
class Progress extends Vue {
  @Prop({ required: true, default: 0})
  private percentage: number
  @Prop({ required: false, default: 'line'})
  private type: string
  @Prop({ required: false, default: false})
  private textInside: boolean
  @Prop({ required: false, default: true})
  private showText: boolean
  @Prop({ required: false, default: 8})
  private strokeWidth: number
  @Prop({ required: false, default: ''})
  private status: string

  private state: IDProgress
  constructor() {
    super()
    this.state = {
      percentage: 0,
      type: 'line',
      showText: true,
      textInside: false,//需type == line
      strokeWidth: 8,
      status: '',
    }
  }
  render(h: CreateElement) {
      const bar_inner = <div class="id-progress-bar_inner" style={`width: ${this.state.percentage}%`}> </div>
      const progressLine = 
        <div class={`id-progress id-progress-line
         ${this.state.status? (this.state.status == 'success' ? 'is-success' : 'is-exception'):''}
         ${this.state.textInside? 'id-progress--text-inside': ''}
         `}>
            <div class="id-progress-bar">
               <div class="id-progress-bar_outer" style={`height: ${this.state.strokeWidth}px`}>{
                 this.state.showText ? (
                    this.state.textInside?
                    //inner
                    (<div class="id-progress-bar_inner" style={`width: ${this.state.percentage}%`}>
                        <div class="id-progress-bar_innerText">{`${this.state.percentage}%`}</div>
                     </div>): bar_inner ): bar_inner}
              </div>
              </div>
          {this.state.showText && !this.state.textInside && !this.state.status ? <div class="id-progress-bar_outerText">{`${this.state.percentage}%`}</div> : ''}
          {this.state.status? <div class="id-progress-bar_outerText">{this.state.status == 'success' ? <i class="id-icon icon-image"></i>:<i class="id-icon icon-cancel-circle"></i>}</div>:''}
        </div>
      return progressLine
  }

  @Watch('type', { immediate: true })
  onTypeChange(val: string, oldVal: string) {
    this.setState({ type: val })
  }
  @Watch('percentage', { immediate: true })
  onPercentageChange(val: number, oldVal: number) {
    this.setState({ percentage: val })
  }
  @Watch('textInside', { immediate: true })
  ontextInsideChange(val: boolean, oldVal: boolean) {
    this.setState({ textInside: val })
  }
  @Watch('showText', { immediate: true })
  onshowTextChange(val: boolean, oldVal: boolean) {
    this.setState({ showText: val })
  }
  @Watch('strokeWidth', { immediate: true })
  onstrokeWidthChange(val: number, oldVal: number) {
    this.setState({ strokeWidth: val })
  }
  @Watch('status', { immediate: true })
  onStatusChange(val: string, oldVal: string) {
    this.setState({ status: val })
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
    &.is-success{
      .id-progress-bar_inner {
        background-color: #13ce66;
      }
      .id-progress-bar_outer {
         color: #13ce66;
      }
    }
    &.is-exception{
      .id-progress-bar_inner {
        background-color: #ff4949;
      }
      .id-progress-bar_outer {
         color: #ff4949;
      }
    }
    &.text-inside{
      .id-progress-bar{
        padding-right: 0;
        margin-right: 0;
      }
    }          
    .id-progress-bar{
        padding-right: 50px;
        width: 100%;
        margin-right: -55px;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: middle;
    }
    .id-progress-bar_outer{
        height: 8px;
        border-radius: 50px;
        background-color: #e4e8f1;
        overflow: hidden;
        position: relative;
        vertical-align: middle;
    }
    .id-progress-bar_outerText{
        font-size: 14px;
        color: #48576a;
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        line-height: 1;
    }
    .id-progress-bar_inner{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background-color: #20a0ff;
        border-radius: 50px;
    }
    .id-progress-bar_innerText{
        display: inline-block;
        color: #fff;
        font-size: 12px;
        margin: 0 5px;
    }
    .id-progress-line{
        margin-bottom: 15px;
        width: 350px;
    }

}

</style>

