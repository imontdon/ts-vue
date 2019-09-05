<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Inject } from 'vue-property-decorator'
import { document } from '../../vue-shim';
import { emit } from 'cluster';

interface IDCollapse {
  title?: string,
  name?: string | number,
}

@Component
class Collapse extends Vue {

  @Inject('IDCollapse') readonly IDCollapse!: any
  @Prop({ required: false, default: '' })
  private title: string
  @Prop({ required: false, default: '' })
  private name: string | number
  
  private state: IDCollapse
  constructor() {
    super()
    this.state = {
      title:'',
      name:'',
    }
  }

  render(h: CreateElement) {
    return (
     <div class="id-collapse">
        <div class="id-collapse-item">
          {/* 标题 */}
          <div 
            on-click={this.handleClick.bind(this)}
            class="id-collapse-item__header">
            <i class="id-icon icon-cancel-circle id-collapse-item__header__arrow"></i>
            {this.state.title}
          </div> 
          {/* 内容 */}
          <div class= {`id-collapse-item__wrap  collapse-transition`}>
            <div class="id-collapse-item__content">
              {this.$slots.default}
            </div>
        </div>
        </div>
      </div>
    )
  }
  setState(obj: IDCollapse) {
    console.log(obj)
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  handleClick(val){
    console.log(val)
  }
  @Watch('title', { immediate: true })
  onTitleChange(val: string, oldVal: string) {
    this.setState({ title: val })
  }
  @Watch('name', { immediate: true })
  onNameChange(val: string | number, oldVal:string | number) {
    this.setState({ name: val })
  }
}
export default Collapse
</script>
<style lang="scss">
  .id-collapse{
    border-radius: 0;
    .id-collapse-item{
      &__header{
        height: 43px;
        line-height: 43px;
        padding-left: 15px;
        background-color: #fff;
        color: #48576a;
        cursor: pointer;
        border-bottom: 1px solid #dfe6ec;
        font-size: 13px;
      }
      &__header__arrow {
        margin-right: 8px;
        transition: transform .3s;
      }
      &__wrap{
        will-change: height;
        background-color: #fbfdff;
        box-sizing: border-box;
        border-bottom: 1px solid #dfe6ec;
        max-height: 0;
      }
      &__content{
        padding: 10px 15px;
        font-size: 13px;
        color: #1f2d3d;
        line-height: 1.769230769230769;
      }
      .is-active{
        max-height: 100px;
      }
      .collapse-transition{
        overflow: hidden;
        transition: max-height 0.4s;
      }  
    }
  }

</style>