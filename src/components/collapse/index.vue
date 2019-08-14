<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { document } from '../../vue-shim';
import { emit } from 'cluster';

interface IDCollapse {
  title?: string,
  name?: string | number,
  isActive?: boolean,
}

@Component
class Collapse extends Vue {
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
      isActive: false,
    }
  }

  render(h: CreateElement) {
    return (
     <div class="id-collapse">
        <div class="id-collapse-item">
          <div 
            on-click={this.handleClick.bind(this)}
            class={`id-collapse-item__header ${this.state.isActive? 'is-Active':'' }`}
          >
            <i class="id-icon icon-cancel-circle id-collapse-item__header__arrow"></i>
            {this.state.title}
          </div> 
          <div>
          <div 
              //  style={`overflow: hidden; display: ${this.state.isActive? 'block':'none'}`}
               style={`overflow: hidden;  ${this.state.isActive ? 'height: 500px;' : 'height: 0px;' } transition: 1s height ease-in-out;`}
               >
            <div class="id-collapse-item__wrap">
              <div class="id-collapse-item__content">
                {this.$slots.default}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
  setState(obj: IDCollapse) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  handleClick(){
    this.state.isActive = !this.state.isActive;
  }
  @Watch('title', { immediate: true })
  ontitleChange(val: string, oldVal: string) {
    this.setState({ title: val })
  }
}
export default Collapse
</script>
<style lang="scss">
  .id-collapse{
    // border: 1px solid #dfe6ec; 
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
        overflow: hidden;
        box-sizing: border-box;
        border-bottom: 1px solid #dfe6ec;
      }
      &__content{
        padding: 10px 15px;
        font-size: 13px;
        color: #1f2d3d;
        line-height: 1.769230769230769;
      }
    }
    .heightChange{
      height:0;
      padding:0;
    }
  }
  .collapse-transition{
    transition: .3s height ease-in-out,.3s padding-top ease-in-out,.3s padding-bottom ease-in-out;
  }  
</style>