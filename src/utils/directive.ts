import { App } from 'vue'
// import VueClipboard from 'vue-clipboard2'
// import Print from 'vue-print-nb' // 打印
// 权限码
const code: object = {
  inserted: (el: any, binding: any) => {
    const btnCode = binding.value
    const btnCodes = JSON.parse(sessionStorage.userInfo || '{}').funcCodeList || []
    if (!btnCodes.includes(btnCode)) {
      el.parentNode.removeChild(el)
    }
  }
}

// 按钮快速点击
const prevent: object = {
  inserted: (el: any, binding: any) => {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(
          () => {
            el.disabled = false
          },
          !binding.value ? 1000 : binding.value
        )
      }
    })
  }
}
export const setupDirective = (app: App) => {
  // Vue.use(VueClipboard)
  // Vue.use(Print)
  app.directive('code', code)
  app.directive('prevent', prevent)
}
