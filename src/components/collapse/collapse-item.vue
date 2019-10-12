<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch, Inject } from 'vue-property-decorator'
import { document } from '../../vue-shim';
import { emit } from 'cluster';

interface IDCollapseItem {
  title?: string,
  name?: string | number,
  isActive?: boolean
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
      isActive: false
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
          <div class= {`id-collapse-item__wrap collapse-transition ${this.state.isActive ? 'is-active': ''}`}>
            <div class="id-collapse-item__content">
              {this.$slots.default}
            </div>
          </div>
        </div>
    )
  }

  // get isActive() : boolean {
    // return  this.MainCollapse.state.activeNames.indexOf(this.state.name) > -1
  // }
  setState(obj: IDCollapseItem) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  handleClick(){
    // 若上次点击的为此item
    if(this.$store.state.collapse.activeName == this.state.name){
      this.state.isActive = !this.state.isActive
      let index = this.MainCollapse.state.activeNames.indexOf(this.state.name)
      if(index > -1) this.MainCollapse.state.activeNames.splice(index, 1)
      this.$store.dispatch('activeNameHandle', this.state.name)
      console.log(this.MainCollapse.state.activeNames)
    }else{
      // 否则控制此item展开 将当前激活的names存入collapse的activenames数组中 
      this.$store.dispatch('activeNameHandle', this.state.name)
      setTimeout(() =>{
        this.setState({ isActive: this.MainCollapse.state.activeNames.includes(this.state.name) })
        console.log(this.MainCollapse.state.activeNames)
      },100)
    }
  }
  
  @Watch('title', { immediate: true })
  onTitleChange(val: string, oldVal: string) {
    this.setState({ title: val })
  }
  @Watch('name', { immediate: true })
  onNameChange(val: string | number, oldVal:string | number) {
    this.setState({ name: val })
  }
  @Watch('isActive', { immediate: true })
  onIsActiveChange(val: boolean, oldVal: boolean) {
    this.setState({ isActive: val })
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