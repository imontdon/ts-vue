import { post, get } from '../../request'

const loginCheck = async (url, data) => {
  return post(url, data)
}
export {
  loginCheck
}
