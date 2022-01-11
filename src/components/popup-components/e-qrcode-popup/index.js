import Vue from 'vue'
import QR from './qr.vue'

const QrConstructor = Vue.extend(QR)

QR.install = function (data) {
  const instance = new QrConstructor({
    data
  }).$mount()
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.show = true
    // show 和弹窗组件里的show对应，用于控制显隐
  })
}
export default QR
