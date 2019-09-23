
class Message {
  public from?: User
  public to?: User | string
  public message?: string
  // tips
  public isTip?: boolean
  // select card
  public isSelect?: boolean
  // question
  public isQuestion?: boolean
  public hasAnswer?: boolean
  public needSelected?: boolean
  // result
  public isResult?: boolean
  public resultSug?: Result[]
  // drugRecommend
  public isDrug?: boolean
  public drugList?: string[]
  // info
  public isInfo?: boolean
  public infoTitle?: string
  public infoContent?: string
}
class User {
  public username?: string
  public idCard?: number | string
  public address?: string
  public phone?: number | string
  public gender?: string
  public patientList?: Array<any>
}
class SelectItem {
  public title: string
  public content: string
  public type: string
  public src: string
}
class Result {
  public content: string
  public route: string
  public resultId?: number | string
}
export {
  Message,
  User,
  SelectItem,
  Result
}