import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import config from './config'

const service: AxiosInstance = axios.create(config)

service.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  res => {
    const debug = process.env.NODE_ENV !== 'production'
    if (debug) {
      const url = res.request.responseURL
      const method = res.config.method.toUpperCase()
      console.log(`${url}:  method: ${method},  data: `, res.data)
    }
    return res
  },
  err => {
    return Promise.reject(err)
  }
)

const post = (url: string, data: any, type?: string) => {
  if (type === 'form') {
    config.headers = {
      'Content-type': 'multipart/form-data'
    }
  } else if (type === 'base') {
    config.headers = {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  } else {
    config.headers = {
      'Content-type': 'application/json'
    }
  }
  return service.post(url, data, config)
}

const get = (url: string, type?: string) => {
  if (type === 'form') {
    config.headers = {
      'Content-type': 'multipart/form-data'
    }
  } else if (type === 'base') {
    config.headers = {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  } else {
    config.headers = {
      'Content-type': 'application/json'
    }
  }
  return service.get(url, config)
}

export {
  post,
  get
}
