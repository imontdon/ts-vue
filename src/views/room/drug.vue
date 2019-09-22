<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

interface IDDrug {
  drugList?: Dg[]
}
interface Dg {
  product?: string,
  name?: string,
  type?: string,
  info?: string
}

@Component
class Drug extends Vue {
  private state: IDDrug
  constructor() {
    super()
    this.state = {
      drugList: []
    }
  }
  // 仿react，setState
  setState(obj: IDDrug) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  mounted() {
    const drugList: Dg[] = [
      {
        name: '布洛芬缓释胶囊',
        product: 'xxxxx药厂',
        info: '药品介绍药品介绍药品介绍药品介绍药品介绍药品介绍',
        type: 'OTC'
      },
      {
        name: '布洛芬缓释胶囊',
        product: 'xxxxx药厂',
        info: '药品介绍药品介绍药品介绍药品介绍药品介绍药品介绍',
        type: 'OTC'
      },
      {
        name: '布洛芬缓释胶囊',
        product: 'xxxxx药厂',
        info: '药品介绍药品介绍药品介绍药品介绍药品介绍药品介绍',
        type: 'OTC'
      },
      {
        name: '布洛芬缓释胶囊',
        product: 'xxxxx药厂',
        info: '药品介绍药品介绍药品介绍药品介绍药品介绍药品介绍',
        type: 'OTC'
      },
      {
        name: '布洛芬缓释胶囊',
        product: 'xxxxx药厂',
        info: '药品介绍药品介绍药品介绍药品介绍药品介绍药品介绍',
        type: 'OTC'
      },
      {
        name: '布洛芬缓释胶囊',
        product: 'xxxxx药厂',
        info: '药品介绍药品介绍药品介绍药品介绍药品介绍药品介绍',
        type: 'OTC'
      },
      {
        name: '布洛芬缓释胶囊',
        product: 'xxxxx药厂',
        info: '药品介绍药品介绍药品介绍药品介绍药品介绍药品介绍',
        type: 'OTC'
      },
      {
        name: '布洛芬缓释胶囊',
        product: 'xxxxx药厂',
        info: '药品介绍药品介绍药品介绍药品介绍药品介绍药品介绍',
        type: 'OTC'
      },
      {
        name: '布洛芬缓释胶囊',
        product: 'xxxxx药厂',
        info: '药品介绍药品介绍药品介绍药品介绍药品介绍药品介绍',
        type: 'OTC'
      },
      {
        name: '布洛芬缓释胶囊',
        product: 'xxxxx药厂',
        info: '药品介绍药品介绍药品介绍药品介绍药品介绍药品介绍',
        type: 'OTC'
      },
    ]
    this.setState({ drugList })
  }
  render(h: CreateElement) {
    return (
      <div class={`id-drug-list`}>
        {
          this.state.drugList.map((drug: Dg, index: number) => {
            return (
              <div class={`id-drug-list__items`}>
                <div class={`header-info`}>
                  <span style={`line-height: 1.5;`}>
                    <dl>
                      <span class={`drug-name`}>{ drug.name }</span>
                      <span class={`drug-type`}>{ drug.type }</span>
                    </dl>
                    <dl>生产厂家: { drug.product }</dl>
                  </span>
                  <span class={`buy__button`}>
                    购买
                  </span>
                </div>
                <div class={`limit-word2 drug-info`}>
                  药品介绍: { drug.info }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default Drug
</script>
<style lang="scss">
  .id-drug-list {
    font-size: .32rem;
    margin: 0.2rem auto;
    width: 90%;
    background: #fff;
    padding: .2rem 0 .4rem 0;
    border-radius: .28rem;
    &__items {
      padding: .2rem;
      border-bottom: 1px solid #e6e6e6;
      .header-info {
        display: flex;   
        margin-top: .2rem;
        align-items: center;
        justify-content: space-between;
        .drug-name {
          font-weight: bold;
          font-size: .36rem;
        }
        .drug-type {
          color: red;
          border: 1px solid red;
          padding: .01rem .06rem;
          margin-left: .2rem;
          border-radius: .1rem;
          font-size: .28rem;
        }
        .buy__button {
          padding: .1rem .8rem;
          border: 1px solid skyblue;
          background: skyblue;
          color: #fff;
          border-radius: .2rem;
          margin-left: .2rem;
          font-size: .3rem;
        }
      } 
      .drug-info {
        font-size: .28rem;
        color: #666;
      }
    }
  }
</style>
