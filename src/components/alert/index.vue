<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { document } from '../../vue-shim';
import { emit } from 'cluster';

interface IDAlert {
    title?: string,
    type?: string,
    description?: string,
    closable?: boolean,
    closeText?: string,
    showIcon?: boolean,
}

@Component
class Alert extends Vue {
  @Prop({ required: true, default: '' })
  private title: string
  @Prop({ required: false, default: 'info' })
  private type: string
  @Prop({ required: false, default: '' })
  private description: string
  @Prop({ required: false, default: '' })
  private closeText: string
  @Prop({ required: false, default: true })
  private closable: boolean
  @Prop({ required: false, default: false })
  private showIcon: boolean

  private state: IDAlert
  constructor() {
    super()
    this.state = {
      title: '',
      type: 'info',
      description: '',
      closeText: '',
      closable: true,
      showIcon: false,
    }
  }
  setState(obj: IDAlert) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div ref="alert" class={`id-alert id-alert--${this.state.type}`}>
        <div class="id-alert__content">
          <span class="id-alert__title">{this.state.title}</span>
          {this.state.closable ? 
          <i 
           on-click= {this.emitClick.bind(this)}
           class={`id-alert__closebtn ${this.state.closeText ? 'is-customed' : 'id-icon icon-cancel-circle'}`}>
           {this.state.closeText}
          </i>
         :''}
        </div>
      </div>
    )
  }
  handleClose(){
    let res = this.$refs.alert as any
    res.style.display = 'none'
  }
  @Emit('click')
  emitClick(event: Event,input?: Vue){
    this.handleClose()
  }
  @Watch('title', { immediate: true })
  ontitleChange(val: string, oldVal: string) {
    this.setState({ title: val })
  }
  @Watch('type', { immediate: true })
  ontypeChange(val: string, oldVal: string) {
    this.setState({ type: val })
  }
  @Watch('closeText', { immediate: true })
  oncloseTextChange(val: string, oldVal: string) {
    this.setState({ closeText: val })
  }
  @Watch('description', { immediate: true })
  ondescriptionChange(val: string, oldVal: string) {
    this.setState({ description: val })
  }
  @Watch('closable', { immediate: true })
  onclosableChange(val: boolean, oldVal: boolean) {
    this.setState({ closable: val })
  }
  @Watch('showIcon', { immediate: true })
  onshowIconChange(val: boolean, oldVal: boolean) {
    this.setState({ showIcon: val })
  }
}
export default Alert
</script>
<style lang="scss">
   .id-alert{
      width: 100%;
      padding: 8px 16px;
      margin: 0;
      box-sizing: border-box;
      border-radius: 4px;
      position: relative;
      background-color: #fff;
      overflow: hidden;
      color: #fff;
      opacity: 1;
      display: table;
      transition: opacity .2s;
      margin-bottom: 20px;
      &--info{
        background-color:#50bfff;
      }
      &--success{
        background-color: #13ce66;
      }
      &--warning{
        background-color: #f7ba2a;
      }
      &--error{
        background-color: #ff4949;
      }
      &__content {
        display: table-cell;
        padding: 0 8px;
      }
      &__title {
        font-size: 13px;
        line-height: 18px;
      }
      &__closebtn{
        font-size: 12px;
        color: #fff;
        opacity: 1;
        top: 12px;
        right: 15px;
        position: absolute;
        cursor: pointer;
        &.is-customed {
        font-style: normal;
        font-size: 13px;
        top: 9px;
        }
      }
   }
</style>