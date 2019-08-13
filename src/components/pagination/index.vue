<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import IDButton from '../button/index.vue'
import IDInput from '../input/index.vue'
import IDSelect from '../select/index.vue'
import IDOption from '../select/option.vue'

interface IDPagination {
  layout?: string,
  total?: number,
  currentPage?: number,
  pageSize?: number,
  pageSizes?: Array<number>, // 分页大小选择器
  pagerCount?: number, // 设置最大页码按钮数
  pageTotal?: number,
  flowStart?: number,
  flowPageCenter?: number,
  jumperValue?: string | number,
  background?: boolean,
  hasNextPage?: boolean,
  hasPrevPage?: boolean,
  prevActive?: boolean, // 前按钮是否活跃
  nextActive?: boolean,
}

@Component({
  components: {
    'id-button': IDButton,
    'id-select': IDSelect,
    'id-option': IDOption,
    'id-input': IDInput
  }
})
class Pagination extends Vue {

  @Prop({ required: true, default: 'prev, pager, next' })
  private layout: string

  @Prop({ required: true })
  private total: number

  @Prop({ required: false })
  private background: boolean

  @Prop({ required: false, default: 10 })
  private pageSize: number
  @Prop({ required: false, default: () => [] })
  private pageSizes: Array<number>

  @Prop({ required: false, default: 1 })
  private currentPage: number

  private pageTotal: number
  private state: IDPagination
  constructor() {
    super()
    this.state = {
      layout: 'prev, pager, next',
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10], 
      pagerCount: 7, // 设置最大页码按钮数
      pageTotal: 0,
      flowStart: 2,
      flowPageCenter: 4,
      jumperValue: '',
      background: false,
      hasNextPage: true,
      hasPrevPage: false,
      prevActive: false,
      nextActive: false,
    }
  }
  // 仿react，setState
  setState(obj: IDPagination) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    const pageList = []
    for (let i = 0; i < this.state.pageTotal; i++) {
      pageList.push({ index: i })
    }
    const prevBtn = (
      <span class='id-pagination__btn id-pagination__btn--prev' onClick={this.prevPage.bind(this)}>
        {
          this.state.background ?
            <id-button disabled={!this.state.hasPrevPage} icon='prev' class='page-prev'></id-button>
            : <i class='id-icon icon-prev'></i>
        }
      </span>
    )
    const nextBtn = (
      <span class={`id-pagination__btn id-pagination__btn--next`} onClick={this.nextPage.bind(this)}>
        {
          this.state.background ?
            <id-button disabled={!this.state.hasNextPage} icon='next' class='page-next'></id-button>
            : <i class='id-icon icon-next'></i>
        }
      </span>
    )
    const total = ( // 总数
      <span class='total-num'>共{this.state.total}条</span>      
    )
    const pageSizesSelector = ( // 分页单页大小选择器
      <id-select
        class='id-pagination__selector'
        style={`width: 15%;`}
        placeholder={'请选择'}
        onChange = {this.pageSizesSelectorChange}
        value = {`${this.state.pageSize}条/页`}
      >
        {
          this.state.pageSizes.map((item, index) => {
            return (
              <id-option
                value= {item}
                label= {`${item}条/页`}
              ></id-option>
            )
          })
        }
      </id-select>
    )
    const smallPager = ( // 普通按钮
      pageList.map((item: any, index: number): HTMLElement => {
        return (
          <li class={`id-pager__items 
                      ${this.state.background ? 'is-background' : ''} 
                      ${this.state.currentPage === (index + 1) ? 'is-active' : ''}`}
              onClick= {this.turnToPage.bind(this, index + 1)}
          >
            { index + 1 }
          </li>
        )
      })
    )
    const flowPager = ( // 流动按钮
      <span>
        { // 前省略号
          this.state.currentPage > 2 + Math.floor((this.state.pagerCount - 2) / 2) ?
          (
            <li class={`id-pager__items id-pager__items--etc
                      ${this.state.background ? 'is-background' : ''}`}
              onClick= {this.turnToFlowPage.bind(this, this.state.flowPageCenter - this.state.pagerCount - 2)}
              onMouseEnter = {() => { this.setState({ prevActive: true }) }}
              onMouseLeave = {() => { this.setState({ prevActive: false }) }}
            >
              <i class={`id-icon ${!this.state.prevActive ? 'icon-more' : 'icon-Doublearrowleft'}`}></i> 
            </li>
          ) : null
        }
        { // 开始论，不好
          /* pageList.map((item: any, index: number): HTMLElement => {
            return (
              // 当前页 >= flowStart 开始页 && 当前页  < 当前页 + (固定数量 - 首尾数 = 流动的按钮数) && 当前页不是最后一页
              index + 1 >= this.state.flowStart && index + 1 < this.state.flowStart + this.state.pagerCount - 2 && index + 1 !== allPages? 
              (
                <li class={`id-pager__items 
                          ${this.state.background ? 'is-background' : ''} 
                          ${this.state.currentPage === (index + 1) ? 'is-active' : ''}`}
                    onClick= {this.turnToFlowPage.bind(this, index + 1)}
                >
                  { index + 1 }
                </li>
              ) : null
            )
          }) */
        }
        { // 中心论
          pageList.map((item: any, index: number): HTMLElement => {
            return (
              // 流动按钮数 =  固定数量 - 首尾数
              // 当前页 >= 中心页 - 流动按钮数 / 2
              // 当前页 <= 中心页 + 流动按钮数 / 2
              // 当前页不是尾页
              index + 1 >= this.state.flowPageCenter - Math.floor((this.state.pagerCount - 2) / 2) 
                && index + 1 <= this.state.flowPageCenter + Math.floor((this.state.pagerCount - 2) / 2) 
                && index + 1 !== this.state.pageTotal? 
              (
                <li class={`id-pager__items 
                          ${this.state.background ? 'is-background' : ''} 
                          ${this.state.currentPage === (index + 1) ? 'is-active' : ''}`}
                    onClick= {this.turnToFlowPage.bind(this, index + 1)}
                >
                  { index + 1 }
                </li>
              ) : null
            )
          })
        }
        { // 后省略号
          this.state.currentPage < this.state.pageTotal - Math.floor((this.state.pagerCount - 2) / 2) - 1
            ?
            (
              <li class={`id-pager__items id-pager__items--etc
                      ${this.state.background ? 'is-background' : ''}`}
                onClick= {this.turnToFlowPage.bind(this, this.state.flowPageCenter + this.state.pagerCount - 2)}
                onMouseEnter = {() => { this.setState({ nextActive: true }) }}
                onMouseLeave = {() => { this.setState({ nextActive: false }) }}
              >
                <i class='id-icon icon-more'></i>  
              </li>
            ) : null
        }
      </span>
    )
    const largePager = ( // 总页数过大显示 首尾 + 流动按钮
      <span>
        <li class={`id-pager__items 
                      ${this.state.background ? 'is-background' : ''} 
                      ${this.state.currentPage === 1 ? 'is-active' : ''}`}
              onClick= {this.turnToFlowPage.bind(this, 1)}
        >
          { 1 }
        </li>
        { flowPager }
        <li class={`id-pager__items 
                      ${this.state.background ? 'is-background' : ''} 
                      ${this.state.currentPage === pageList.length ? 'is-active' : ''}`}
              onClick= {this.turnToFlowPage.bind(this, pageList.length)}
        >
          { pageList.length }
        </li>
      </span>
    )
    const pager = ( // 按钮区域
      <ul class='id-pager'>
        {
          pageList.length < this.state.pagerCount ?
            smallPager : largePager
        }
      </ul>
    )
    const jumper = ( // 直接前往
      <span class='id-pagination__jumper'>
        <id-input
          value={this.state.jumperValue}
          onInput = {this.handleJumperInput.bind(this)}
          onKeyup={this.handleKeyup.bind(this)}
        ></id-input> 
        <span class='id-pagination__jumper--unit'>页</span>
      </span>
    )
    const Pagination = ( // layout 区域
      <div class='id-pagination'>
        {
          this.state.layout.includes('total') ? total : null
        }
        {
          this.state.layout.includes('sizes') ? pageSizesSelector : null
        }
        { prevBtn }
        { pager }
        { nextBtn }
        {
          this.state.layout.includes('jumper') && pageList.length >= this.state.pagerCount ? jumper : null
        }
      </div>
    )
    return Pagination
  }
  handleJumperInput(val: string | number) {
    val = val > this.state.pageTotal ? this.state.pageTotal : val
    this.setState({ jumperValue: val })
  }
  handleKeyup(e: KeyboardEvent, input?: IDInput) {
    if (e.which === 13 || e.keyCode === 13) {
      let index: number = parseInt(input.state.value)
      this.turnToFlowPage(index)
    }
  }
  pageSizesSelectorChange(val: number) {
    // this.setState({ pageSize: val })
    this.pageSize = val
    this.emitSizeChange(val)
  }
  turnToFlowPage(index: number) { // 流动按钮跳转 =》 普通跳转方法
    // if ()
    // 避免当前页跳出总长度
    index = index > this.state.pageTotal ? this.state.pageTotal : index
    index = index < 1 ? 1 : index
    if (index <= 2 + Math.floor(this.state.pagerCount - 2) / 2) {
      this.setState({ flowPageCenter: 2 + Math.floor((this.state.pagerCount - 2) / 2) })
      this.setState({ flowStart: 2 })
      // console.log(`开始页aaa: ${index - (Math.floor(this.state.pagerCount / 2) - 1)}, 中心位置aaa: ${index}`)
    } else {
      // flowStart + (固定数量 - 首尾数 = 流动的按钮数) < 总页数, 开始论
      // 中心论：当前页是否小于 结尾页 - 向下取整：流动按钮数的一半
      if (index < this.state.pageTotal - Math.floor((this.state.pagerCount - 2) / 2)) {
        this.setState({ flowStart: index - (Math.floor(this.state.pagerCount / 2) - 1) })
        this.setState({ flowPageCenter: index })
        // console.log(`开始页: ${index - (Math.floor(this.state.pagerCount / 2) - 1)}, 中心位置: ${index}`)
      } else {
        // 获取新的中心，根据规律得出。。
        // 中心为 页面总长度 - 向上取整: 流动按钮数一半
        const center: number = this.state.pageTotal - Math.floor((this.state.pagerCount - 1) / 2) 
        // 第一次设置新的中心，后不设置
        if (this.state.flowPageCenter !== center) {
          this.setState({ flowPageCenter: center })
          // 流动按钮的开始计数值为： 页面总长度 - 用户设置的显示最多的按钮数（流动按钮数 + 首尾按钮数） + 向下取整：流动按钮数的一半
          this.setState({ flowStart: this.state.pageTotal - this.state.pagerCount + Math.floor((this.state.pagerCount - 2) / 2) })
        }
      }
    }
    // 跳转
    this.turnToPage(index)
  }
  // 跳转
  turnToPage(index: number): void {
    // console.log(index)
    this.setState({ currentPage: index })
    this.judgeHasNext(index)
    this.judgeHasPrev(index)
    this.emitCurrentChange(index)
    // this.setState({ hasPrevPage: index === 1 })
    // this.setState({ hasNextPage: index === this.state.})
  }
  // 下一页
  nextPage(): void {
    let currentPage = this.state.currentPage
    if (this.state.hasNextPage) {
      currentPage++
      this.judgeHasNext(currentPage)
      if (this.state.pageTotal < this.state.pagerCount) {
        this.setState({ currentPage })
        this.emitCurrentChange(currentPage)
      } else {
        this.turnToFlowPage(currentPage)
      }
    }
    
    this.emitNextClick(currentPage)
  }
  // 上一页
  prevPage(): void {
    let currentPage = this.state.currentPage
    if (currentPage !== 1) {
      currentPage--
      this.judgeHasPrev(currentPage)
      if (this.state.pageTotal < this.state.pagerCount) {
        this.setState({ currentPage })
        this.emitCurrentChange(currentPage)
      } else {
        this.turnToFlowPage(currentPage)
      }
    }
    this.emitPrevClick(currentPage)
  }
  judgeHasNext(currentPage?: number, pageTotal?: number): void { // 判断是否有下一页
    // const current = currentPage ? currentPage : this.currentPage 
    const page = pageTotal ? pageTotal : this.state.pageTotal
    const hasNextPage = currentPage !== page
    this.setState({ hasNextPage })
  }
  judgeHasPrev(currentPage?: number): void { // 判断是否有上一页
    // const current = currentPage ? currentPage : this.currentPage 
    const hasPrevPage = currentPage === 1 ? false : true
    this.setState({ hasPrevPage })
  }
  watchPageTotalChange() { // 监听总页数变化
    let allPages = this.state.pageTotal // 总页数
    if (this.total % this.pageSize === 0) {
      allPages = this.total / this.pageSize
    } else {
      allPages = Math.floor(this.total / this.pageSize) + 1
    }
    // let center: number = allPages - Math.floor((this.state.pagerCount - 1) / 2)
    // center = center > 4 ? center : 4
    // const currentPage = this.state.currentPage > allPages ? 
    //   allPages : this.state.currentPage
    if (this.state.currentPage > allPages) {
      const currentPage = allPages
      this.setState({ currentPage: allPages })
    } else {
      const currentPage = this.state.currentPage
      this.setState({ currentPage })
      if (this.pageSize === 10) { // 啊啊啊啊，这里解决不了
        this.setState({ flowPageCenter: 4 })
      }
    }
    // console.log('currentPage', this.state.flowPageCenter, allPages)
    // this.setState({ flowPageCenter: 4})
    this.setState({ pageTotal: allPages })
    this.judgeHasNext(this.currentPage, allPages)
    this.judgeHasPrev(this.currentPage)
  }

  @Emit('currentChange')
  emitCurrentChange(currentPage: number) { }
  @Emit('nextClick')
  emitNextClick(currentPage: number) { }
  @Emit('prevClick')
  emitPrevClick(currentPage: number) { }
  @Emit('sizeChange')
  emitSizeChange(pageSize: number) {}

  @Watch('layout', { immediate: true })
  onLayoutChange(val: string) {
    const newLayout = val.replace(/\s+/g, '').split(',')
    if (newLayout.includes('prev') && newLayout.includes('pager') && newLayout.includes('next')) {
      this.setState({ layout: val })
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`pagination layout need basic params: 'prev, pager, next'`)
      }
    }
  }
  @Watch('total', { immediate: true })
  onTotalChange(val: number) {
    this.setState({ total: val })
    this.watchPageTotalChange()
  }
  @Watch('background', { immediate: true })
  onBackgroundChange(val: boolean) {
    this.setState({ background: val })
  }
  @Watch('pageSize', { immediate: true })
  onPageSizeChange(val: number, oldVal: number) {
    this.setState({ pageSize: val })
    if (oldVal) {
      this.watchPageTotalChange()
    }
  }
  @Watch('pageSizes', { immediate: true })
  onPageSizesChange(val: Array<number>) {
    this.setState({ pageSizes: val })
  }
}
export default Pagination
</script>
<style lang="scss">
  .id-pagination {
    display: flex;
    &__selector {
      height: 30px;
      margin-right: 10px;
    }
    &__btn {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      .id-icon {
        cursor: pointer;
      }
    }
    .id-pager {
      &__items {
        width: 30px;
        height: 30px;
        float: left;
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &.is-background {
          margin: 0 5px;
          background-color: #f4f4f5;
          color: #606266;
          min-width: 30px;
          border-radius: 2px;
        }
        &.is-active {
          background: #409eff;
          color: #fff;
        }
        &:hover:not(.is-active) {
          color: #409eff;
        }
      }
    }
    &__jumper {
      height: 30px;
      width: 48px;
      margin-left: 10px;
      position: relative;
      &--unit {
        position: absolute;
        right: -30px;
        top: 4px;
      }
    }
    .total-num {
      font-size: 14px;
      line-height: 30px;
      margin: 0 20px;
    }
  }
</style>
