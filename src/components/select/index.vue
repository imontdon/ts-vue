<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import IDInput from '@/components/input/index.vue'

interface IDSelect {
  icon?: string,
  type?: string
  selected?: string,
  options?: Array<Option>
}

interface Option {
  value: string,
  label: string
}
@Component({
  components: {
    'id-input': IDInput
  }
})
class Select extends Vue {

  @Prop({ required: true, default: () => {} })
  private selected: object
  @Prop({ required: true, default: () => {} })
  private options: Array<Option>

  private state: IDSelect
  constructor() {
    super()
    this.state = {
      icon: '',
      type: '',
      selected: '',
      options: []
    }
  }
  // 仿react，setState
  setState(obj: IDSelect) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key]
    })
  }
  render(h: CreateElement) {
    return (
      <div class='id-select'>
        <div class='id-input'>
          <id-input
            type='text'
            readonly
            suffix='next'
            on-blur={this.handleBlur}
            on-click={this.handleClick}
            value={this.state.selected}
          >
          </id-input>
        </div>
        <div class='id-select-options'>
          <ul class='id-select-options__content'>
            { this.state.options }
            {
              this.state.options.map(opt => {
                <li>
                  { opt }
                </li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
  handleClick(event: Event, input?: Vue) {
    this.rotateIcon(input)
  }
  handleBlur(event: Event, input?: Vue) {
    this.rotateIcon(input, 0)
  }
  getSelectedVal(val: string) {
    this.setState({ selected: val })
  }
  rotateIcon(input: Vue, num?: number) {
    const suffix = input.$el.querySelector('.id-suffix-icon') as HTMLElement
    const transform: string = suffix.style.transform
    if (transform === 'rotate(0deg)' || transform === '') {
      suffix.style.transform = `rotate(90deg)`
    } else {
      suffix.style.transform = `rotate(0deg)`
    }
    if (num === 0) {
      suffix.style.transform = `rotate(0deg)`
    }
    // suffix.style.transform = `rotate(${num}deg)`
    suffix.style.transformOrigin = 'center center'
    suffix.style.transition = 'transform 0.5s'
  }

  @Watch('selected', { immediate: true })
  onSelectedChange(val: string, oldval: string) {
    this.setState({ selected: val })
  }
  @Watch('options', { immediate: true, deep: true })
  onOptionsChange(arr: Array<Option>, oldval: Array<Option>) {
    console.log(arr)
    const options = []
    for(let i = 0; i < arr.length; i++) {
      console.log(arr[i])
      options.push({ label: arr[i].value, value: arr[i].value })
    }
    console.log(options)
    if (arr.length === 0) { console.error('id-select options 没有数据') }
    this.setState({ options })
    console.log(this.state.options)
  }
}
export default Select
</script>
<style lang="scss">
  .id-select {
    width: 100%;
    position: relative;
    .id-input {
      cursor: pointer;
    }
    .id-select-options {
      position: absolute;
      width: 80%;
      top: 60px;
      ul.id-select-options__content {
        width: 100%;
        height: 120px;
        border: 1px solid #aaa;
        li {
          width: 100%;
          float: left;
        }
      }
    }
  }
</style>

