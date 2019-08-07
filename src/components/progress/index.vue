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
  width?: number,
  pathLength?: number,
}
// 圆形 stroke
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
  @Prop({ required: false, default: ''})
  private width: number

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
      width: 126,
    }
  }
  render(h: CreateElement) {
      const barInner = <div class="id-progress-bar_inner" style={`width: ${this.state.percentage}%`}> </div>      
      const progressLine = 
        <div class={`id-progress-line ${this.state.textInside? 'id-progress--text-inside': ''}`}>
          <div class="id-progress-bar">
            <div class="id-progress-bar_outer" style={`height: ${this.state.strokeWidth}px`}>{
              this.state.showText ? (
                this.state.textInside?
                //inner
                (<div class="id-progress-bar_inner" style={`width: ${this.state.percentage}%`}>
                    <div class="id-progress-bar_innerText">{`${this.state.percentage}%`}</div>
                </div>): barInner ): barInner}
            </div>
          </div>
          {this.state.showText && !this.state.textInside && !this.state.status ? <div class="id-progress-bar_outerText">{`${this.state.percentage}%`}</div> : ''}
          {this.state.status? <div class="id-progress-bar_outerText">{this.state.status == 'success' ? <i class="id-icon icon-image"></i>:<i class="id-icon icon-cancel-circle"></i>}</div>:''}
        </div>
      const progressCycle = 
        <div class={`id-progress-circle`}>
          <div style={`height: ${this.state.width}px; width: ${this.state.width}px;`}>
            <svg viewBox="0 0 100 100" style="overflow:visible;">
              <path class="id-progress-circle_track" d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" style={`stroke-width: ${this.state.strokeWidth}px`}>
              </path>
              <path class="id-progress-circle_path" d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94"  
                    style={`stroke-width: ${this.state.strokeWidth}px;
                            stroke-dasharray: ${this.pathLenth}px;
                            stroke-dashoffset: ${this.pathLenth*(1-this.state.percentage/100)}px;
                          `}>
              </path>
            </svg>
          </div>
          <div class="id-progress_text">
            {this.state.status?
            (this.state.status == 'success' ? <i class="id-icon icon-image"></i> : <i class="id-icon icon-cancel-circle"></i>)
            : `${this.state.percentage}%`}
          </div>
        </div>
      const progress =
        <div class={`id-progress ${this.state.status? (this.state.status == 'success' ? 'is-success' : 'is-exception'):''}`}>
            { this.state.type == 'line' ? progressLine : (this.state.type == 'circle' ? progressCycle :'')}
        </div>
      return progress
  }



  setState(obj: IDProgress) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  get pathLenth(): number {
    let path = document.querySelector('path')
    console.log("获取路径", path)
    if (path) {
      let length = path.getTotalLength()
      console.log(length,'长度')
      return length
    } else {
      return 0
    }
  }
  @Watch('type', { immediate: true })
  onTypeChange(val: string, oldVal: string) {
    this.setState({ type: val })
  }
  @Watch('percentage', { immediate: true })
  onPercentageChange(val: number, oldVal: number) {
    if(typeof val == 'number'){
      if(val > 0 && val < 100){
        this.setState({ percentage: val })
      }else{
        console.error("百分比值应为0-100")
      }
    }
    else{
        console.error("输入percentage类型有误")
    }
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
  @Watch('width', { immediate: true })
  onWidthChange(val: number, oldVal: number) {
    this.setState({ width: val })
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
      .id-progress-circle_path{
        stroke: #13ce66;
      }
    }
    &.is-exception{
      .id-progress-bar_inner {
        background-color: #ff4949;
      }
      .id-progress-bar_outer {
         color: #ff4949;
      }
      .id-progress-circle_path{
        stroke: #ff4949;
      }
    }
    &.text-inside{
      .id-progress-bar{
        padding-right: 0;
        margin-right: 0;
      }
    }
    .id-progress-line{
        margin-bottom: 15px;
        width: 350px;
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

    // 圆形
    .id-progress-circle{
        display: inline-block;
        margin-right: 15px;
        position: relative;
        .id-progress_text{
            @extend .id-progress-bar_outerText;
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            text-align: center;
            margin: 0;
            -ms-transform: translate(0,-50%);
            transform: translate(0,-50%);
        }
    }
    .id-progress-circle_track{
        stroke: #e5e9f2;
        fill: none;
    }
    .id-progress-circle_path{
        stroke: #20a0ff;
        fill: none;
        stroke-linecap: round;
        transition: stroke-dashoffset 0.6s ease 0s, 
                    stroke 0.6s ease 0s;
    }
}

</style>

