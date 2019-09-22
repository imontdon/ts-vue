
class Message {
  public from?: User
  public to?: User | string
  public message?: string
  public isTip?: boolean
  public isSelect?: boolean
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
}
export {
  Message,
  User,
  SelectItem
}