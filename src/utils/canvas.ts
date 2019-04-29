export class Board {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  constructor (ctx, width, height) {
    this.ctx = ctx
    this.width = width
    this.height = height
  }
  draw () {
    const ctx: CanvasRenderingContext2D = this.ctx
    const gradient: CanvasGradient = ctx.createRadialGradient(100, 100, 60, 200, 200, 600)
    gradient.addColorStop(1, 'rgb(0,0,10)')
    ctx.save()
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, this.width, this.height)
    ctx.restore()
  }
}
export class Stars {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  public stars: any
  constructor (ctx: CanvasRenderingContext2D, width: number, height: number, amount: number) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.stars = this.getStars(amount)
  }
  getStars (amount: number) {
    let stars = []
    while (amount--) {
      stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: Math.random() + 0.3
      })
    }
    return stars
  }
  draw () {
    let ctx: CanvasRenderingContext2D = this.ctx
    ctx.save()
    ctx.fillStyle = 'white'
    this.stars.forEach(star => {
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI)
      ctx.fill()
    })
    ctx.restore()
  }
  blink () {
    this.stars = this.stars.map(star => {
      let sign: number = Math.random() > 0.5 ? 1 : -1
      star.r += sign * 0.2
      // star.r = star.r < 0 ? -star.r : (star.r > 2 ? star.r = 0.2 : star.r)
      if (star.r < 0) {
        star.r = -star.r
      } else if (star.r > 1) {
        star.r -= 0.2
      }
      return star
    })
  }
}
export class Meteor {
  private ctx: CanvasRenderingContext2D
  public x: number
  public y: number
  public h: number
  public vx: number
  public vy: number
  public len: number
  constructor (ctx, x, h) {
    this.ctx = ctx
    this.x = x
    this.h = h
    // 初始高度
    this.y = 0
    // 水平速度
    this.vx = -(4 + Math.random() * 4)
    // 垂直速度
    this.vy = -this.vx
    this.len = Math.random() * 300 + 500
  }
  flow () {
    // 判定流星出界
    if (this.x < -this.len || this.y > this.h + this.len) {
      return false
    }
    this.x += this.vx
    this.y += this.vy
    return true
  }
  draw () {
    let ctx = this.ctx
    let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.len)
    const PI = Math.PI
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.save()
    ctx.fillStyle = gradient
    ctx.beginPath()
    // 流星头，二分之一圆
    ctx.arc(this.x, this.y, 1, PI / 4, 5 * PI / 4)
    // 绘制流星尾，三角形
    ctx.lineTo(this.x + this.len, this.y - this.len)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
}
