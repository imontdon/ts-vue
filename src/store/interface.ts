
interface Info {
  id: number
  username: string,
  real_name: string
}
class State {
  public isHidden: boolean
}
class User {
  public userIsLogin: boolean
  public info: Info
}
export {
  State,
  User
}