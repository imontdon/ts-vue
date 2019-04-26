<template>
  <div class="note-rotate f_l" :class="'border-' + border">
    <span class="rotate-font">
      {{ center }}
    </span>
  </div>
</template>

<script lang='ts'>
import { Prop, Component, Vue } from 'vue-property-decorator'
@Component({})
export default class NoteRotate extends Vue {
  @Prop({
    type: String,
    default: 'skyblue'
  })
  public border
  @Prop({
    type: String,
    default: ''
  })
  public center
  mounted() {
    
  }
}
</script>

<style>

</style>
