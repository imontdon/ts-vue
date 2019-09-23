<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Inject } from 'vue-property-decorator'
import { document } from '../../vue-shim';
import { emit } from 'cluster';

interface IDCollapseItem {
  title?: string,
  name?: string | number,
}

@Component
class CollapseItem extends Vue {

  // 注入依赖
  @Inject('MainCollapse') readonly MainCollapse!: any
  // 接受父组件的值
  @Prop({ required: false, default: '' })
  private title: string
  @Prop({ required: false, default: '' })
  private name: string | number
  
  private state: IDCollapseItem
  constructor() {
    super()
    this.state = {
      title:'',
      name:'',
    }
  }

  render(h: CreateElement) {
    return (
        <div class="id-collapse-item">
          <div 
            on-click = {this.handleClick}
            class = "id-collapse-item__header"
            name = {this.state.name}>
            <i class="id-icon icon-cancel-circle id-collapse-item__header__arrow"></i>
            {this.state.title}
          </div> 
          {/* 内容 */}
          <div class= {`id-collapse-item__wrap collapse-transition ${this.isActive ? 'is-active': ''}`}>
            <div class="id-collapse-item__content">
              {this.$slots.default}
            </div>
          </div>
        </div>
    )
  }
  // 如果不是手风琴模式  将各个子项collapse-item 中的name的都传入到value中 此时value为一数组
  // 手风琴模式下点击后将name传入到父组件collapse的value中  此时value为一string
  // isActive 
  get isActive() : boolean {
    // 子项根据父项value中的值
    return  this.MainCollapse.getActiveName == this.state.name
  }
  setState(obj: IDCollapseItem) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  handleClick(){
    // 触发mutation中的ACTIVE_NAME 改变共享属性 activeName的值
    this.$store.dispatch('activeNameHandle', this.state.name );
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
export default CollapseItem
</script>
<style lang="scss">
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
</style>