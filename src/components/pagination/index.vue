<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import IDButton from '../button/index.vue'

interface IDPagination {
  layout?: string,
  total?: number,
  currentPage?: number,
  pageSize?: number,
  pagerCount?: number, // 设置最大页码按钮数
  pageTotal?: number,
  flowStart?: number,
  flowPageCenter?: number,
  background?: boolean,
  hasNextPage?: boolean,
  hasPrevPage?: boolean
}

@Component({
  components: {
    'id-button': IDButton
  }
})
class Pagination extends Vue {

  @Prop({ required: true })
  private layout: string
  @Prop({ required: true })
  private total: number
  @Prop({ required: false })
  private background: boolean


  private state: IDPagination
  constructor() {
    super()
    this.state = {
      layout: '',
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pagerCount: 9, // 设置最大页码按钮数
      pageTotal: 0,
      flowStart: 2,
      flowPageCenter: 5,
      background: false,
      hasNextPage: true,
      hasPrevPage: false
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
    /* const flowPageCenter = this.state.flowStart + Math.floor((this.state.pagerCount - 2) / 2)
    this.setState({ flowPageCenter }) */
    let allPages = 0 // 总页数
    if (this.state.total % this.state.pageSize === 0) {
      allPages = this.state.total / this.state.pageSize
    } else {
      allPages = Math.floor(this.state.total / this.state.pageSize) + 1
    }
    const hasNextPage = this.state.currentPage !== allPages
    const hasPrevPage = this.state.currentPage === 1 ? false : true
    this.setState({ hasNextPage })
    this.setState({ hasPrevPage })
    this.setState({ pageTotal: allPages })

    const pageList = []
    for (let i = 0; i < allPages; i++) {
      pageList.push({ index: i})
    }
    const prevBtn = (
      <span class='id-pagination__btn id-pagination__btn--prev' onClick={this.prevPage.bind(this)}>
        {
          this.state.background ?
            <id-button disabled={!hasPrevPage} icon='prev' class='page-prev'></id-button>
            : <i class='id-icon icon-prev'></i>
        }
      </span>
    )
    const nextBtn = (
      <span class={`id-pagination__btn id-pagination__btn--next`} onClick={this.nextPage.bind(this)}>
        {
          this.state.background ?
            <id-button disabled={!hasNextPage} icon='next' class='page-next'></id-button>
            : <i class='id-icon icon-next'></i>
        }
      </span>
    )
    const smallPager = (
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
    const flowPager = (
      <span>
        { // 前省略号
          this.state.currentPage > 2 + Math.floor((this.state.pagerCount - 2) / 2) ?
          (
            <li class={`id-pager__items 
                      ${this.state.background ? 'is-background' : ''}`}
              onClick= {this.turnToFlowPage.bind(this, this.state.flowPageCenter - this.state.pagerCount - 2)}
            >
              ... 
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
                && index + 1 !== allPages? 
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
              <li class={`id-pager__items 
                      ${this.state.background ? 'is-background' : ''}`}
                onClick= {this.turnToFlowPage.bind(this, this.state.flowPageCenter + this.state.pagerCount - 2)}
              >
                ... 
              </li>
            ) : null
        }
      </span>
    )
    const largePager = (
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
    const pager = (
      <ul class='id-pager'>
        {
          pageList.length < this.state.pagerCount ?
            smallPager : largePager
        }
      </ul>
    )
    const Pagination = (
      <div class='id-pagination'>
        { prevBtn }
        { pager }
        { nextBtn }
      </div>
    )
    return Pagination
  }
  turnToFlowPage(index: number) {
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
    console.log(index)
    this.setState({ currentPage: index })
    // this.setState({ hasPrevPage: index === 1 })
    // this.setState({ hasNextPage: index === this.state.})
  }
  // 下一页
  nextPage(): void {
    let currentPage = this.state.currentPage
    if (this.state.hasNextPage) {
      currentPage++
      if (this.state.pageTotal < this.state.pagerCount) {
        this.setState({ currentPage })
      } else {
        this.turnToFlowPage(currentPage)
      }
    }
  }
  // 上一页
  prevPage(): void {
    let currentPage = this.state.currentPage
    if (currentPage !== 1) {
      currentPage--
      if (this.state.pageTotal < this.state.pagerCount) {
        this.setState({ currentPage })
      } else {
        this.turnToFlowPage(currentPage)
      }
    }
  }
  @Watch('layout', { immediate: true })
  onLayoutChange(val: string) {
    const newLayout = val.replace(/\s+/g, '')
    this.setState({ layout: val })
  }
  @Watch('total', { immediate: true })
  onTotalChange(val: number) {
    this.setState({ total: val })
  }
  @Watch('background', { immediate: true })
  onBackgroundChange(val: boolean) {
    this.setState({ background: val })
  }
}
export default Pagination
</script>
<style lang="scss">
  .id-pagination {
    display: flex;
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
      }
    }
  }
</style>
