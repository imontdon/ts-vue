<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import IDButton from '../button/index.vue'
// 来来来哪个先不用理他
// 看看这些interface能放在一起吗
/* interface IDUpload {
  action: string,
  multiple: boolean,
  flieList: Array<File>,
} */
import { IDUpload } from '@/interface/IDUpload'
@Component({
  components: {
    'id-button': IDButton
  }
})
class Upload extends Vue {
  private state: IDUpload
  constructor() {
    super()
    this.state = {
      action: '',
      multiple: false,
      flieList: []
    }
  }
  // 仿react，setState
  setState(obj: IDUpload) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  handleClick(e: Event) {
    console.log(e)
    const file = this.$refs.file as HTMLElement
    file.click()
  }
  handleChange() {
    console.log('handleChange')
  }
  render(h: CreateElement) {
    const IDUpload = (
      <div>
      <div class='id-upload'>
        <id-button type='primary' onClick={this.handleClick.bind(this)}>
          点击上传
        </id-button>
        {
          this.$slots.tip
        }
      </div>
        <input class="exclude-input" onChange={this.handleChange.bind(this)} type='file' ref='file' name='file' multiple/>
      </div>
    )
    return IDUpload
  }
}
export default Upload
</script>
<style lang="scss">
  .id-upload {

    .id-upload__tip {
      font-size: 12px;
      color: #606266;
      margin-top: 7px;
    }
  }
</style>

