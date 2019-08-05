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
}

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


  private state: IDProgress
  constructor() {
    super()
    this.state = {
      percentage: 0,
      type:'line',
      showText: true,
      textInside: false//需type == line
    }
  }
  render(h: CreateElement) {
      const bar =
              <div class="id-progress-bar">
                <div class="id-progress-bar_outer">
                  <div class="id-progress-bar_inner" style={`width: ${this.state.percentage}%`}>
                  </div>
                </div>
              </div>
      const progressLine = 
        <div class={`id-progress id-progress-line`}>
          {
            this.state.showText ? (
              this.state.textInside?
              //inner
              (<div class="id-progress-bar">
                <div class="id-progress-bar_outer">
                  <div class="id-progress-bar_inner" style={`width: ${this.state.percentage}%`}>
                    <div class="id-progress-bar_innerText">{`${this.state.percentage}%`}</div>
                  </div>
                </div>
              </div>): bar ): bar
          }
          {this.state.showText && !this.state.textInside ? <div class="id-progress-bar_outerText">{`${this.state.percentage}%`}</div> : ''}
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
    border-radius: 20px;
    background-color: #e4e8f1;
    overflow: hidden;
    position: relative;
    vertical-align: middle;
}
.id-progress-bar_inner{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #20a0ff;
    text-align: right;
    border-radius: 100px;
    line-height: 1;
}
.id-progress-bar_outerText{
    font-size: 14px;
    color: #48576a;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    line-height: 1;
}
.id-progress-bar_innerText{
    display: inline-block;
    vertical-align: middle;
    color: #fff;
    font-size: 12px;
    margin: 0 5px;
}
.id-progress-line{
    margin-bottom: 15px;
    width: 200px;
}
// $styles: ('line', inline-block, (0,0,15px,0), 350px),
//          ('circle', inline-block, (0,15px,0,0), 126px);

// @each $type, $display, $margin, $width in $styles{
//   .id-progress--#{$type}{
//     display: $display;
//     margin: $margin;
//     width: $width;
//   }
// }
// $textStyle: ('text-inside'),('text-outside')
// .id-progress--#{$textStyle}{

// }
  
</style>

