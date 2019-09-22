
interface Info {
  id: number
  username: string,
  real_name: string
}
class Page {
  public isHidden: boolean
}
class User {
  username?: string
  idCard?: number | string
  address?: string
  phone?: number | string
  gender?: string
  patientList?: Array<any>
}
class Choose {
  needSelected?: boolean
}
class Name {
  public activeName : string | number | string[] | number[]
}
export {
  Page,
  User,
  Name,
  Choose
}