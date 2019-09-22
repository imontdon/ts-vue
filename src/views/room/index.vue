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
    (function (doc: Document, win: Window) {
      const docEl: HTMLElement = doc.documentElement
      const resizeEvt: string = 'orientationchange' in window ? 'orientationchange' : 'resize'
      const recalc = function (): void {
        const clientWidth: number = docEl.clientWidth;
        if (!clientWidth) return;
        if(clientWidth >= 720){
            // docEl.style.fontSize = '100px';
            docEl.setAttribute('style', 'font-size: 100px !important')
        }else{
          // docEl.style.setAttribute('font')
          docEl.setAttribute('style', `font-size: ${(100 * (clientWidth / 720))}px !important`)
            // docEl.style.fontSize =  target + 'px !important';
        }
        console.log(docEl.style.fontSize)
      };

      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
    this.setUser({ username: 'imontdon' })
  }
 
  
}
</script>
