import { post, get } from '../../request'

const uploadFiles = async (url: string, data: any): Promise<any> => {
  return post(url, data)
}
export {
  uploadFiles
}
