<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import IDButton from '../button/index.vue'
interface IDUpload {
  action?: string,
  multiple?: boolean,
  fileList?: Array<File>,
  picture?: boolean,
}
import { AxiosResponse, AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { service } from '../../request'
@Component({
  components: {
    'id-button': IDButton
  }
})
class Upload extends Vue {
  private axiosConfig: AxiosRequestConfig = {
    // baseURL: 'http://101.132.116.241:1337/api',
    // baseURL: 'http://127.0.0.1:3000/',
    transformResponse: [(data: AxiosResponse) => data],
    paramsSerializer: (params: any) => {
      return qs.stringify(params)
    },
    headers: {
      'Content-type': 'application/json'
    },
    timeout: 30000,
    withCredentials: true,
    responseType: 'json',
    onUploadProgress: (progressEvent: any) => {
      let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
      // this.setState({ progress: complete })
      // console.log(this.state.progress)
      this.emitProgress(complete)
    }
  }
  @Prop({ required: true })
  private action: string
  @Prop({ required: false, default: false })
  private multiple: boolean
  @Prop({ required: false, default: false })
  private picture: boolean

  private state: IDUpload
  constructor() {
    super()
    this.state = {
      action: '',
      multiple: false,
      fileList: [],
      picture: false
      // progress: 0
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
  async animateRemoveLi(index, duration) {
    return new Promise((reslove, reject) => {
      const el = this.$el as HTMLElement
      const lis = el.querySelectorAll('.id-upload-list--picture li') as NodeListOf<HTMLElement>
      lis[index].style.animation = `removeLI ${duration / 1000}s`
      setTimeout(() => {
        reslove()
      }, duration)
    })
  }
  async handeRemoved(index: number) {
    const duration = 1000
    await this.animateRemoveLi(index, duration)
    const fileList: Array<any> = this.state.fileList
    fileList.splice(index, 1)
    this.setState({ fileList })
    this.emitRemove()
  }
  handleClick(e: Event) {
    const file = this.$refs.file as HTMLElement
    file.click()
  }

  async beforeUpload(files) {
    return new Promise((reslove, reject) => {
      if (!files || files.length === 0) {
        reject('没有files')
      }
      this.emitBeforeUpload(files)
      reslove()
    })
  }
  async handleChange(e: Event) {
    console.log('handleChange')
    this.emitProgress(0)
    this.emitChange()
    const target = e.target as HTMLInputElement
    const files: FileList = target.files
    const formdata = new FormData()
    for (let i = 0; i < files.length; i++) {
      formdata.append('files', files[i], files[i].name)
    }
    const [ baseURL, action ] = this.state.action.replace(/(\d\/)/, '$1_').split(/\_/)
    this.axiosConfig.baseURL = baseURL
    await this.beforeUpload(files)
    const res: any = await service.post(`/${action}`, formdata, this.axiosConfig)
    // this.emitFinished(res)
    if (res.data.ret_code === 0) { // 不是所有的后台都是一样的这边要用emitFinished传
      this.emitSuccess(res.data.ret_data, files)
      if (this.state.picture) {
        const fileList: Array<any> = this.state.fileList
        for (let i = 0; i < res.data.ret_data.length; i++) {
          fileList.push(res.data.ret_data[i])
        }
        // console.log(fileList)
        this.setState({ fileList })
      }
    } else {
      this.emitError(new Error(res.data.ret_info), files)
    }
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
        { // 图像显示
          this.state.picture ? 
          (
            this.state.fileList.length > 0 ? 
            (
              <ul class='id-upload-list id-upload-list--picture'>
                {
                  this.state.fileList.map((file: any, index: number) => {
                    console.log(file)
                    return (
                      <li>
                        <img src={ file.filepath} />
                        <a>{file.filename}</a>
                        <label class='id-upload-list__item-status-label'>
                          <i class='id-icon icon-Check'></i>
                        </label>
                        <i class='id-icon icon-remove' onClick={ this.handeRemoved.bind(this, index)}></i>
                      </li>
                    )
                  })
                }
              </ul>
            ) : null
          ) : null
        }
      </div>
        <input class="exclude-input" 
               style='display: none;' 
               onChange={this.handleChange.bind(this)} 
               ref='file' 
               name='file' 
               type='file'
               multiple = {this.state.multiple ? true : false} />
      </div>
    )
    return IDUpload
  }
  mounted() {
    this.$message.warning('test')
    console.log(this.$message.info)
  }
  @Emit('change')
  emitChange() { }
  @Emit('remove')
  emitRemove() { }
  @Emit('success')
  emitSuccess(data: Array<any>, files: FileList) { }
  @Emit('error')
  emitError(error: Error, files: FileList) {}
  @Emit('beforeUpload')
  emitBeforeUpload(files: FileList) {}
  @Emit('progress')
  emitProgress(progress: number) {}
  @Emit('finish')
  emitFinished(data: any) {}


  @Watch('action', { immediate: true })
  onActionChange(val: string) {
    if (!val) {
      console.error('id-upload, action is required')
    }
    this.setState({ action: val })
  }
  @Watch('multiple', { immediate: true })
  onMultipleChange(val: boolean) {
    this.setState({ multiple: val })
  }
  @Watch('picture', { immediate: true })
  onPictureChange(val: boolean) {
    this.setState({ picture: val })
  }
}
export default Upload
</script>
<style lang="scss">
  @keyframes showLI {
    0% {
      top: -30px;
      opacity: 0;
    }
    80% {
      top: 20px;
    }
    85% {
      top: 13px;
    }
    90% {
      top: 8px;
    }
    95% {
      top: 4px;
    }
    100% {
      top: 0;
      opacity: 1;
    }
  }
  @keyframes removeLI {
    0% {
      opacity: 1;
    }
    10% {
      top: -10px;
    }
    20% {
      top: -15px;
    }
    100% {
      top: -20px;
      opacity: 0;
    }
  }
  .id-upload {
    .id-upload__tip {
      font-size: 12px;
      color: #606266;
      margin-top: 7px;
    }
    .id-upload-list--picture {
      li {
        overflow: hidden;
        z-index: 0;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        margin-top: 10px;
        padding: 10px 10px 10px 90px;
        height: 92px;
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        animation: showLI 1s;
        &:hover {
          .id-upload-list__item-status-label {
            display: none;
          }
          .id-icon.icon-remove {
            display: block;
          }
        }
        img {
          display: inline-block;
          width: 70px;
          height: 70px;
          float: left;
          position: relative;
          z-index: 1;
          margin-left: -80px;
        }
        a {
          font-size: 12px;
          margin-left: 20px;
        }
        .id-upload-list__item-status-label {
          position: absolute;
          width: 39px;
          height: 24px;
          background: #13ce66;
          right: -15px;
          top: -8px;
          transform: rotate(45deg);
          transform: -webkit-rotate(45deg);
          transform: -o-rotate(45deg);
          transform: -moz-rotate(45deg);
          transform: -ms-rotate(45deg);
          cursor: pointer;
          .id-icon.icon-Check {
            position: absolute;
            top: 9px;
            left: 11px;
            transform: rotate(-45deg);
            transform: -o-rotate(45deg);
            transform: -moz-rotate(45deg);
            transform: -ms-rotate(45deg);
            color: #fff;
          }
        }
        .id-icon.icon-remove {
          position: absolute;
          top: 0;
          right: 1px;
          display: none;
          transform: scale(0.8);
        }
      }
    }
  }
</style>

