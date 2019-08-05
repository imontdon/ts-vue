export default function setState (state: any, obj: any) { // 改改改
  // 第一个参数不要
  setTimeout(() => {
    Object.keys(obj).forEach(key => {
      state[key] = obj[key]
    })
  }, 100)
}
