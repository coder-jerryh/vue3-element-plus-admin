import { App } from 'vue'
import { formatQuery } from './filter' // {a: 1, b: 2} => a=1&b=2
import axios from 'axios'
import { initMessage } from './message' // 消息弹窗
// import { openUsingPopup } from '../components/usingPopup/index'
// import QR from '../components/usingQr/index'
// import Preview from '../components/e-preview/index'
// 原型
// prototype.$openUsingPopup = openUsingPopup
// prototype.$openUsingQR = QR.install
// prototype.$previewImage = Preview.install
export const setupPrototype = (app: App) => {
  const prototype = app.config.globalProperties
  prototype.$axios = axios
  prototype.$Pages = { current: 1, size: 10, totalNum: 0 }
  prototype.$DeepClone = (data: any) => {
    return JSON.parse(JSON.stringify(data))
  }
  prototype.$TableHeight = window.innerHeight - 250
  prototype.$FQ = formatQuery // {a: 1, b: 2} => a=1&b=2
  initMessage(prototype)
}
