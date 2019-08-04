<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import IDForm from '../form/index.vue'
import IDFormItem from '../form/item.vue'
import IDInput from '../input/index.vue'
import IDRadio from '../radio/radio.vue'
import IDRadioGroup from '../radio/radio-group.vue'
import IDRadioButton from '../radio/radio-button.vue'
import IDButton from '../button/index.vue'
import IDTag from '../tag/index.vue'
import IDBadge from '../badge/index.vue'
import IDSelect from '../select/index.vue'
import IDOption from '../select/option.vue'
import IDOptionGroup from '../select/option-group.vue'
import IDChoutbox from '../checkbox/index.vue'
import IDChoutboxGroup from '../checkbox/checkbox-group.vue'
// import Ajax from '../../request/request'
import { post, get } from '../../request'

interface Message {
  text?: string,
  boxVisible?: boolean,
  username?: string,
  password?: string,
  loading?: boolean,
  selected?: string,
  options?: Array<any>
  group?: Array<any>,
  radio?: string | number,
  radioGroupValue?: string | number,
  radioButtonGroupValue?: string | number,
  checkList?: Array<string | number>,
  num1?: number,
  num2?: number,
}

@Component({
  components: {
    'id-form': IDForm,
    'id-form-item': IDFormItem,
    'id-input': IDInput,
    'id-radio': IDRadio,
    'id-radio-group': IDRadioGroup,
    'id-radio-button': IDRadioButton,
    'id-button': IDButton,
    'id-tag': IDTag,
    'id-badge': IDBadge,
    'id-select': IDSelect,
    'id-option': IDOption,
    'id-option-group': IDOptionGroup,
    'id-checkbox': IDChoutbox,
    'id-checkbox-group': IDChoutboxGroup
  }
})
class MessageForm extends Vue {
  @Getter userIsLogin

  private state: Message
  constructor(props: any) {
    super(props)
    this.state = {
      text: '',
      boxVisible: false,
      username: '',
      password: '222',
      loading: false,
      selected: '',
      options: [],
      group: [],
      radio: '1',
      radioGroupValue: '1',
      radioButtonGroupValue: '上海',
      checkList: ['复选框 A'],
      num1: 10,
      num2: 13,
    }
    /* Object.keys(this.state).forEach(key => {
      console.log(key)
      Object.defineProperty(this.state, key, {
        value: '',
        configurable: true,
        writable: false,
      })
    }) */
  }
  render(h: CreateElement) {
    return (
      <div class='form-squre'>
        <id-form visible={this.state.boxVisible} on-change={this.changeVisible} >
          <id-checkbox-group value={this.state.checkList} on-change={this.changeCheckVal.bind(this)}>
            <id-checkbox label='复选框 A'></id-checkbox>
            <id-checkbox label='复选框 B' disabled={true}></id-checkbox>
            <id-checkbox label='复选框 C'></id-checkbox>
          </id-checkbox-group>
          <id-radio-group style={'width: 340px;'} value={this.state.radioButtonGroupValue} on-change={this.handleRadioButtonGroupChage.bind(this)} >
            <id-radio-button value='北京' disabled={true}></id-radio-button>
            <id-radio-button value='上海'></id-radio-button>
            <id-radio-button value='广州'></id-radio-button>
            <id-radio-button value='深圳'></id-radio-button>
          </id-radio-group>

            <id-tag type="success" clearable>aloft</id-tag>
            <id-tag type="info"  clearable animationable>peak</id-tag>
            <id-tag type="danger"  clearable>summit</id-tag>
            <id-tag type="danger"  clearable>climax</id-tag>
           { // <id-badge value = {100} max = {99} >《october sky》</id-badge>
            }
        </id-form>
      
        <div class='form-textarea'>
          <textarea class='textarea-squre' rows="4" value={this.state.text} on-change={this.textAreaChange}/>
          <div class='user-options'>
            <span class='un-word'>
              <a on-click={this.show.bind(this, 'emoji')}>
                <i class='id-icon icon-grin'></i>
              </a>
              <a on-click={this.show.bind(this, 'files')}>
                <i class='id-icon icon-image'></i>
              </a>
            </span>
            <span>
              <button class='user-submit' on-click={this.submitText.bind(this, this.state.text)}>
                提交
              </button>
            </span>
          </div>
        </div>
      </div>
    )
  }

  mounted() {  
    const options = [
      {
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎',
        disabled: true
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }
    ]
    const group = [{
      label: '热门城市',
      options: [{
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Beijing',
        label: '北京'
      }]
    }, {
      label: '城市名',
      options: [{
        value: 'Chengdu',
        label: '成都'
      }, {
        value: 'Shenzhen',
        label: '深圳'
      }, {
        value: 'Guangzhou',
        label: '广州'
      }, {
        value: 'Dalian',
        label: '大连'
      }]
    }]
    this.setState({ options })
    this.setState({ group })
    // this.$message('sakhdakjs')
  }
  // change后的值返回用户应该不需要用它控制，系统自动选择复选框
  changeCheckVal(arr: Array<string>) {
    console.log('changeCheckVal', arr)
    // this.setState({ checkList: arr })
  }
  handleRadioButtonGroupChage(val: string | number) {
    // this.setState({ radioButtonGroupValue: val })
    console.log(val)
  }
  handleRadioGroupChage(val: string | number) {
    console.log(val)
    // this.setState({ radioGroupValue: val })
  }
  handleRadioChange(val: string | number) {
    this.setState({ radio: val })
  }
  handleChange(val: string) {
    console.log(val)
  }
  // 点击表情或者上传图片时间，后续加
  show(type: string) {
    console.log(type)
  }
  login(e: Event) {
    /* const ajax = new Ajax('http://localhost:1997/api/user/login', {
      username: this.state.username,
      password: this.state.password
    }) */
    this.setState({ loading: true })
    post('/user/login', {
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      res = res.data 
      localStorage.setItem('user', res.data.user_name)
      this.setState({ loading: false })
      this.setState({ boxVisible: false })
    }).catch(e => {
      this.setState({ loading: false })
    })
  }
  // 仿react，setState
  setState(obj: Message) {
    Object.keys(obj).forEach(key => {
      this.state[key] = obj[key]
    })
  }

  getUserValue(val: string) {
    this.setState({ username: val })
  }
  getPwdValue(val: string) {
    this.setState({ password: val })
  }
  changeValue(val: string) {
    console.log(val)
  }
  keyup(e: KeyboardEvent) {
    e.keyCode === 13 ? this.login(e) : null 
  }
  // 文本框改变时间
  textAreaChange = (e) :void => {
    // console.log(e)
    this.setState({ text: e.target.value })
    // console.log(this.state)
  }
  changeVisible(visible: boolean) {
    this.setState({ boxVisible: visible })
    // console.log('change: ', this.state.boxVisible)
  }

  // 提交事件
  submitText(text: string) {
    if (this.userIsLogin) {
      this.emitSubmit(text)
    } else {
      this.setState({ boxVisible: !this.state.boxVisible })
      this.emitSubmit(this.state.boxVisible)
    }
  }
  @Emit('submit')
  emitSubmit(val: string|boolean) {}
}
export default MessageForm
</script>

<style lang="scss">
  .form-squre {
    width: 100%;
    height: 160px;
    .form-textarea {
      height: 120px;
      position: relative;
      margin: 10px;
      .textarea-squre {
        width: 90%;
        // height: 80%;
        padding: 10px;
        border: 1px solid #e74851;
        border-radius: 10px;
      }
      .user-options {
        width: 93%;
        display: flex;
        justify-content: space-between;
        .un-word {
          margin: 8px 0;
          a { cursor: pointer; width: 25px; float: left; }
          a:hover i {
            filter: drop-shadow(red 80px 0px);
            position: relative;
            left: -74px;
            border-right: 20px solid transparent;
          }
          a:nth-child(2) { margin-left: 10px; } 
          i {
            filter: drop-shadow(#e74851 80px 0px);
            position: relative;
            left: -74px;
            border-right: 20px solid transparent;
          }
        }
        .user-submit {
          color: #fff;
          background-color: #f56c6c;
          border-color: #f56c6c;
          line-height: 1;
          cursor: pointer;
          border: 0;
          padding: 8px 25px;
          border-radius: 6px;
          margin: 4px 0;
        }
      }
    }
  }
  .test {
    margin-left: 20px;
  }
</style>

