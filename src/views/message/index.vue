<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import MessageForm from '@/components/message/form.vue'
import IDProgress from '@/components/progress/index.vue'
import IDSwitch from '@/components/switch/index.vue'
import IDSlider from '@/components/slider/index.vue'
import IDUpload from '@/components/upload/index.vue'
import IDRate from '@/components/rate/index.vue'
import IDCollapseItem from '@/components/collapse/collapse-item.vue'
import IDCollapse from '@/components/collapse/collapse.vue'
import IDTree from '@/components/tree/index.vue'
import IDPagination from '@/components/pagination/index.vue'
import IDDialog from '@/components/dialog/index.vue'
import IDButton from '@/components/button/index.vue'
import IDTable from '@/components/table/index.vue'
import IDTableColumn from '@/components/table/table-column.vue'

// import { loading } from '@/directives/index'
interface TestMessage {
  percentage?: number,
  treeData?: Array<any>,
  dialogVisible?: boolean,
  tableData?: Array<any>,
  loading?: boolean
}
@Component({
  components: {
    MessageForm,
    'id-button': IDButton,
    'id-switch': IDSwitch,
    'id-slider': IDSlider,
    'id-upload': IDUpload,
    'id-rate': IDRate,
    'id-progress': IDProgress,
    'id-collapse-item': IDCollapseItem,
    'id-collapse': IDCollapse,
    'id-pagination': IDPagination,
    'id-tree': IDTree,
    'id-dialog': IDDialog,
    'id-table': IDTable,
    'id-table-column': IDTableColumn,
  },
})
export default class Message extends Vue {
  private state: TestMessage
  constructor() {
    super()
    this.state = {
      percentage: 0,
      treeData: [],
      dialogVisible: true,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      loading: true
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
        <a onClick={() => this.showDialog()}>showDialog</a>
        <id-collapse 
          accordion
          value="2"
        >
          <id-collapse-item title="哥达鸭" name="1" >你好年最佳设计计算机会社书撒火收到就好护甲护士计计算机会社书撒火收到就好计计算机会社书撒火收到就好计计算机会社书撒火收到就好</id-collapse-item>
          <id-collapse-item title="宝石海星" name="2">计计算机会社书撒火收到就好计计算机会社书撒火收到就好计计算机会社书撒火收到就好计计算机会社书撒火收到就好计计算机会社书撒火收到就好</id-collapse-item>
          <id-collapse-item title="海星星" name="3">计计算机会社书撒火收到就好计计算机会社书撒火收到就好计计算机会社书撒火收到就好计计算机会社书撒火收到就好计计算机会社书撒火收到就好</id-collapse-item>
        </id-collapse>
        </div>
        <div class='comment-area'>
        </div>
      </div>
    )
  }

  mounted() {
    const data = [
      {
        label: '一级 1',
        children: [
          {
            label: '二级 1-1',
            children: [
              {
                label: '三级 1-1-1'
              },
            ]
          },
          {
            label: '二级 1-2',
            children: [
              {
                label: '三级 1-1-1'
              }
            ]
          },
          {
            label: '二级 1-3'
          }
        ]
      }, 
      {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, 
      {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }
    ]
    this.setState({ treeData: data })
  }
  closeDialog() {
    this.setState({ dialogVisible: false })
  }
  showDialog() {
    this.setState({ dialogVisible: true })
    console.log(this.state.dialogVisible)
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
  getTextContent(val: string|boolean) {
  }
}
</script>
