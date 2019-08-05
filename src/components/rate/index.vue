<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import rate from '../../utils/rate'
interface IDRate {
  icon?: string,
  type?: string
}

@Component
class Rate extends Vue {
  private state: IDRate
  constructor() {
    super()
    this.state = {
      icon: '',
      type: ''
    }
  }
  // 仿react，setState
  setState(obj: IDRate) {
    setTimeout(() => {
      Object.keys(obj).forEach(key => {
        this.state[key] = obj[key]
      })
    }, 10)
  }
  mounted() {
    // const canvas = this.$el.querySelector('.id-rate__canvas') as HTMLCanvasElement
    // const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
    // const r = new rate(ctx, 3.6, 10, 20)
    // r.draw()
    const canvas = this.$el.querySelector('.id-rate__item') as HTMLCanvasElement
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
    let R : number = 14
    let r : number = 7
    let y = 30
    for (let k = 1; k < 6; k++) {
      let x = 20 * k
      ctx.beginPath()
      ctx.fillStyle = '#ddd'
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + 72 * i + 72) / 180 * Math.PI) * R + x, - Math.sin((18 + 72 * i + 72) / 180 * Math.PI) * R + y)
        ctx.lineTo(Math.cos((54 + 72 * i + 72) / 180 * Math.PI) * r + x, - Math.sin((54 + 72 * i + 72) / 180 * Math.PI) * r + y)
      }
      ctx.fill()
      ctx.closePath()
    }
  }
  render(h: CreateElement) {
    const IDRate = (
      <div class='id-rate'>
        <canvas class='id-rate__item'>1</canvas>
        <canvas class='id-rate__item'>2</canvas>
        <canvas class='id-rate__item'>3</canvas>
        <canvas class='id-rate__item'>4</canvas>
        <canvas class='id-rate__item'>5</canvas>
      </div>
    )
    return IDRate
  }
}
export default Rate
</script>
<style lang="scss">
  .id-rate {
    .id-rate__item {
      width: 240px;
      height: 180px;
      float: left;
    }
  }
</style>

