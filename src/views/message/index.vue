<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import MessageForm from '@/components/message/form.vue'
@Component({
  components: {
    MessageForm
  }
})
export default class Message extends Vue {
  render(h: CreateElement) {
    return (
      <div class='message-box'>
        <div class='message-form'>
          <message-form on-submit={this.getTextContent}></message-form>
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
