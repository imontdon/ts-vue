<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import MessageForm from '@/components/message/form.vue'
import IDSwitch from '@/components/switch/index.vue'
import IDSlider from '@/components/slider/index.vue'
import IDUpload from '@/components/upload/index.vue'
@Component({
  components: {
    MessageForm,
    'id-switch': IDSwitch,
    'id-slider': IDSlider,
    'id-upload': IDUpload
  }
})
export default class Message extends Vue {
  render(h: CreateElement) {
    return (
      <div class='message-box'>
        <div class='message-form'>
          <id-upload></id-upload>
          <id-slider style='margin-left: 20px;' value={64}>测试</id-slider>
          <id-slider style='margin-left: 20px;' disabled={true}>测试</id-slider>
          <id-switch style='margin-left: 20px;' value={true} showText={true} oncolor="#13ce66" offcolor='#ff4949'></id-switch>
          <id-switch style='margin-left: 20px;' disabled={true} value={true} showText></id-switch>
          <MessageForm on-submit={this.getTextContent}></MessageForm>
        </div>
        <div class='comment-area'>
        </div>
      </div>
    )
  }
  mounted() {
  }
  getTextContent(val: string|boolean) {
  }
}
</script>
