<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

// images
import logo from '../../assets/img/png/h5-logo.png'
import IDRate from '../../components/rate/index.vue'

interface IDDepart {
  departName?: string,
  info?: string,
  docList?: Doc []
}
interface Doc {
  name?: string,
  position?: string,
  hospital?: string,
  special?: string,
  star?: number | string
}
@Component({
  components: {
    'id-rate': IDRate
  }
})
class Depart extends Vue {
  private state: IDDepart
  constructor() {
    super()
    this.state = {
      departName: '',
      info: '',
      docList: []
    }
  }
  setState(obj: IDDepart) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  mounted() {
    const docList: Doc[] = [
      {
        name: '张三',
        position: '副主任医师',
        hospital: '浙江省附属第一医院',
        special: '很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货'
      },
      {
        name: '张三',
        position: '副主任医师',
        hospital: '浙江省附属第一医院',
        special: '很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货'
      },
      {
        name: '张三',
        position: '副主任医师',
        hospital: '浙江省附属第一医院',
        special: '很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货'
      },
      {
        name: '张三',
        position: '副主任医师',
        hospital: '浙江省附属第一医院',
        special: '很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货'
      },
      {
        name: '张三',
        position: '副主任医师',
        hospital: '浙江省附属第一医院',
        special: '很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货'
      },
      {
        name: '张三',
        position: '副主任医师',
        hospital: '浙江省附属第一医院',
        special: '很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货'
      },
      {
        name: '张三',
        position: '副主任医师',
        hospital: '浙江省附属第一医院',
        special: '很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货'
      },
      {
        name: '张三',
        position: '副主任医师',
        hospital: '浙江省附属第一医院',
        special: '很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货很灰暗的哈哈是的还是丢货'
      },
    ]
    this.setState({ docList })
  }
  render(h: CreateElement) {
    const Header = (
      <div class={`id-depart__header`}>
        <dt>呼吸内科</dt>
        <dl class={`limit-word2`}>科室介绍: 科室介绍科室介绍科室介绍科室介绍科室介绍科室介绍科室介绍科室介绍科室介绍</dl>
      </div>
    )
    const DoctorList = (
      <div class={`id-depart__doc-list`}>
        {
          this.state.docList.map((doc: Doc, index: number) => {
            return (
              <div class={`id-depart__doc-detail`}>
                <img src={logo} />
                <div class={`id-depart__doc-info`}>
                  <dt>
                    <span> { doc.name }</span>
                    <span class={`color666`}> { doc.position }</span>
                  </dt>
                  <dl class={`color666 font3`}>{ doc.hospital }</dl>
                  <dl class={`limit-word2 color666 font3`}>擅长: { doc.special }</dl>
                  <dl style={`display: flex;`}>
                    <id-rate
                      colors={['#99A9BF', '#F7BA2A', '#F7BA2A']}
                    ></id-rate>5.0
                  </dl>
                </div>
              </div>
            )
          })
        }
      </div>
    )
    const Doctor = (
      <div>
        111
      </div>
    )
    return (
      <div class={`id-depart`}>
        { Header }
        { DoctorList }
      </div>
    )
  }
}
export default Depart
</script>
<style lang="scss">
  .id-depart {
    .color666 {
      color: #666;
    }
    .font3 {
      font-size: .3rem;
    }
    font-size: .32rem;
    &__header {
      height: 1.4rem;
      background: #fff;
      padding: .2rem .4rem;;
      dt {
        font-weight: bold;
        font-size: .4rem;
      }
    }
    &__doc-list {
      .id-depart__doc-detail {
        display: flex;
        align-items: center;
        padding: .2rem;
        border-bottom: 1px solid #e6e6e6;
        img {
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 2px;
          margin-left: .1rem;
        }
        .id-depart__doc-info {
          margin-left: .4rem;
          padding-right: .2rem; 
          dt span:first-child {
            font-weight: bold;
            font-size: .4rem;
          }
          dt span:last-child {
            margin-left: .2rem;
            font-size: .3rem;
          }
        }
      }
    }
  }
</style>
