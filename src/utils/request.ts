import { formatQuery } from './filter'
import axios from 'axios'
import router from '../router/index'
import { store } from '../store/index' // 引入状态机
import config from '../config'
import { ElMessageBox } from 'element-plus'
// 超时时间
const timeout = 30000 // 60s
// 定时器
let timer: any = null
// 控制弹窗只显示一个
const $DelMsgDom = () => {
  var elClass = '.is-message-box'
  var el = document.querySelector(elClass)
  if (el && el.parentNode) {
    el.parentNode.removeChild(el)
  }
}
// 登录超时
const loginOutTime = () => {
  $DelMsgDom()
  ElMessageBox.alert('登录已过期，请重新登录~', '提示', {
    confirmButtonText: '我知道了',
    callback: () => {
      sessionStorage.clear()
      router.replace('/login')
    }
  })
}
// 刷新token
const refreshToken = (headers: any) => {
  // 有fresh_token则刷新token
  if (headers && headers.fresh_token) {
    sessionStorage.userToken = headers.fresh_token
  }
}
axios.interceptors.request.use((config) => {
  config.cancelToken = new axios.CancelToken((cancel) => {
    store.commit('pushToken', {
      cancelToken: cancel
    })
  })
  return config
})
// 请求方法，请求地址，请求数据，是否显示loading
export default (
  method: string,
  url: string,
  data: any,
  formData: boolean = false,
  param: string = ''
) => {
  url = config.hostname + url
  const headers = {
    token: sessionStorage.userToken || '',
    'Content-Type': 'application/json',
    Accept: ''
  }
  if (formData) {
    data = formatQuery(data)
    headers.Accept = 'application/json, application/javascript'
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  timer = setTimeout(() => {
    clearTimeout(timer)
  }, timeout)
  return new Promise((resolve, reject) => {
    const instance:any = axios.create({
      // 请求头
      headers,
      // 超时时间
      timeout
    })
    instance.interceptors.request.use((config: any) => {
      config.cancelToken = new axios.CancelToken((cancel) => {
        store.commit('pushToken', {
          cancelToken: cancel
        })
      })
      return config
    })
    instance({ method, url, data, responseType: param === 'exportFile' ? 'blob' : '' })
      .then(({ headers, data }) => {
        clearTimeout(timer)
        refreshToken(headers)
        // 导出和导入不需要code判断
        if (['exportFile', 'importFile'].includes(param)) {
          return resolve(data)
        }
        switch (data.code) {
          case 200:
            resolve(data)
            return
          case 401:
            loginOutTime()
            break
          case 402:
            loginOutTime()
            break
          default:
            // 组件内处理异常
            if (param === 'componentHandleError') {
              reject(data)
            } else {
              $DelMsgDom()
              ElMessageBox.alert(data.msg, '提示', {
                confirmButtonText: '我知道了'
              })
            }
        }
        reject(data.msg)
      })
      .catch((res: any) => {
        // 没有status表示当前接口被取消请求，不弹窗
        if (JSON.stringify(res).includes('status')) {
          const headers = res.headers
          $DelMsgDom()
          ElMessageBox.alert('系统繁忙，请稍后再试~', '提示', {
            confirmButtonText: '我知道了'
          })
          clearTimeout(timer)
          refreshToken(headers)
        }
        const errorCode = 500
        reject(errorCode)
      })
  })
}
