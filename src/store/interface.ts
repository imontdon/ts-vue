
interface Info {
  id: number
  username: string,
  real_name: string
}
class Page {
  public isHidden: boolean
}
class User {
  public userIsLogin: boolean
  public info: Info
}
class Name {
  public activeName : string | number | string[] | number[]
}
export {
  Page,
  User,
  Name
}