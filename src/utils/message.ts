import Vue from 'vue'
export const initMessage = (prototype: any) => {
  prototype.$Toast = (type: string, message: string, duration = 2000) => {
    prototype.$message({
      duration,
      message,
      type // success, error,warning
    })
  }
  prototype.$Alert = (
    title = '提示',
    message: string,
    onConfirm: Function,
    confirmButtonText = '我知道了'
  ) => {
    // 控制弹出框弹出一次
    const elClass = '.is-message-box'
    if (document.querySelectorAll(elClass).length === 1) return
    prototype.$alert(message, title, {
      dangerouslyUseHTMLString: true,
      confirmButtonText,
      callback: () => {
        if (onConfirm) {
          onConfirm()
        }
        // 控制弹出框弹出一次
        const el = document.querySelector(elClass)
        if (el && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
  prototype.$Confirm = (
    title = '提示',
    message: string,
    onConfirm: Function,
    confirmButtonText = '确定',
    onClose: Function,
    type = 'warning'
  ) => {
    prototype
      .$confirm(message, title, {
        confirmButtonText,
        cancelButtonText: '取消',
        type
      })
      .then(() => {
        if (onConfirm) {
          onConfirm()
        }
      })
      .catch(() => {
        if (onClose) {
          onClose()
        }
      })
      .finally(() => {
        // 控制弹出框弹出一次
        const el = document.querySelector('.is-message-box')
        if (el && el.parentNode) {
          el.parentNode.removeChild(el)
        }
      })
  }
}
