
export default class Ajax {
  private xhr: XMLHttpRequest
  constructor (url: string, val?: Object) {
    this.xhr = new XMLHttpRequest()
    this.open(url)
    this.xhr.setRequestHeader('Content-Type', 'application/json')
    this.send(val)
    // this.getResult(this.xhr)
  }
  getResult () {
    this.xhr.onreadystatechange = (): Promise<any> => {
      // console.log(xhr.readyState)
      switch (this.xhr.readyState) {
        case 0:
          console.log('请求未初始化')
          break
        case 1:
          console.log('服务器连接已建立')
          break
        case 2:
          console.log('请求已接收')
          break
        case 3:
          console.log('请求处理中')
          break
        case 4:
          console.log('请求已完成，且响应已就绪')
          return new Promise((resolve, reject) => {
            if (this.xhr.status === 200) {
              // options
              if (process.env.NODE_ENV === 'development') {
                console.log(this.xhr.response)
              }
              resolve(this.xhr.response)
            } else {
              reject(this.xhr.response)
            }
          })
          break
      }
    }
  }
  open (url) {
    this.xhr.open('post', url)
  }
  send (val: Object) {
    this.xhr.send(JSON.stringify(val))
  }
}
