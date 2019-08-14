<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import MessageForm from '@/components/message/form.vue'
import IDProgress from '@/components/progress/index.vue'
import IDSwitch from '@/components/switch/index.vue'
import IDSlider from '@/components/slider/index.vue'
import IDUpload from '@/components/upload/index.vue'
import IDRate from '@/components/rate/index.vue'
import IDCollapse from '@/components/collapse/index.vue'






import IDPagination from '@/components/pagination/index.vue'


interface TestMessage {
  percentage?: number
}
@Component({
  components: {
    MessageForm,
    'id-switch': IDSwitch,
    'id-slider': IDSlider,
    'id-upload': IDUpload,
    'id-rate': IDRate,
    'id-progress': IDProgress,
    'id-collapse': IDCollapse,
    'id-pagination': IDPagination
  }
})
export default class Message extends Vue {
  private state: TestMessage
  constructor() {
    super()
    this.state = {
      percentage: 0
    }
  }
  setState(obj: TestMessage) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  render(h: CreateElement) {
    return (
      <div class='message-box'>
        <div class='message-form'>
        {         
        //            <id-pagination
        //             layout="prev, pager, next"
        //             total={151}
        //             background={true}
        //           ></id-pagination>
        //           <id-rate style={'width: 100%; height: 100px;'} showText={true} colors={['#99A9BF', '#F7BA2A', '#FF9900']}></id-rate>
        }
        <id-collapse title="难以言喻">
          <div>加几就内呵呵哈哈哈</div>
          <div>加几就内呵呵哈哈哈</div>
        </id-collapse>
          {
            /* 
              <id-upload action='http://localhost:1997/api/upload'
                     multiple={true}
                    //  picture={true}
                     onBeforeUpload = {this.beforeUpload.bind(this)}
                     onProgress = {this.handleProgress.bind(this)}
                     onSuccess = {this.uploadSuccess.bind(this)}
                     onRemove = {this.removeFile.bind(this)}
              >
                <div slot="tip" class="id-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </id-upload>
            */
          }
          {/* <id-progress percentage={this.state.percentage}></id-progress> */}
          {
          // <id-progress percentage={this.state.percentage}  width={60}  type="circle"> </id-progress>
          // <id-slider style='margin-left: 20px;' value={64}>测试</id-slider>
          // <id-slider style='margin-left: 20px;' disabled={true}>测试</id-slider>
          // <id-switch style='margin-left: 20px;' value={true} showText={true} oncolor="#13ce66" offcolor='#ff4949'></id-switch>
          // <id-switch style='margin-left: 20px;' disabled={true} value={true} showText></id-switch>
          // <MessageForm on-submit={this.getTextContent}></MessageForm>
          }
        </div>
        <div class='comment-area'>
        </div>
      </div>
    )
  }
  uploadSuccess() {
    console.log('success')
  }
  removeFile() {
    console.log('removed')
  }
  handleProgress(progress: number) {
    console.log(progress)
    this.setState({ percentage: progress })
  }
  beforeUpload(files: FileList) {
    console.log(files)
  }
  mounted() {
  }
  getTextContent(val: string|boolean) {
  }
}
</script>
