<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import { Getter, Action } from "vuex-class";


import IDChatRoom from '../../components/chatroom/index.vue'

interface TestMessage {
}
@Component({
  components: {
    'id-chat-room': IDChatRoom,
  },
})
export default class Message extends Vue {
  @Getter("userInfo") userInfo!: any;
  @Action("setUser") setUser;

  private state: TestMessage
  constructor() {
    super()
    this.state = {
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
      <div class='chat-room'>
        <id-chat-room />
      </div>
    )
  }
  mounted() {
    this.setUser({ username: 'imontdon' })
  }
 
  
}
</script>
