import { post, get } from '../../request'

const loginCheck = async (url: string, data: any): Promise<any> => {
  return post(url, data)
}
export {
  loginCheck
}
