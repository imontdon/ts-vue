<template>
  <div class="note borde f_l" :class="'border-' + border">
    <h3 class="note-title f_l">{{ note.title }}</h3>
    <p class="note-content f_l">{{ note.content }}</p>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Note extends Vue{
  @Prop({
    type: Object,
    default: () => {}
  })
  public note
  @Prop({
    type: String,
    default: ''
  })
  public border
}
</script>

<style lang='scss'>
  @import '@/assets/css/components/note.scss';
</style>
