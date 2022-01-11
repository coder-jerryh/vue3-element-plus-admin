/**
 *  时间
 * */
import './monent' // Date扩展
export const dateRangeFilter = (entryStart: any, entryEnd: any) => {
  return entryStart
    ? new Date(entryStart).Format('yyyy-MM-dd hh:mm:ss') +
        ' 至 ' +
        new Date(entryEnd).Format('yyyy-MM-dd hh:mm:ss')
    : ''
}
export const dateFilter = (time: any, format = 'yyyy-MM-dd hh:mm:ss') => {
  if (typeof time === 'string') {
    return time
  } else {
    return time && JSON.stringify(time) !== '{}' ? new Date(time).Format(format) : ''
  }
}
// 获取当月第一天到今天
export const firstEndDays = () => {
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth()
  const firstDay = new Date(y, m, 1)
  // var lastDay = new Date(y, m + 1, 0)
  const today = new Date().getTime()
  return [
    dateFilter(firstDay, 'yyyy-MM-dd') + ' 00:00:00',
    dateFilter(today, 'yyyy-MM-dd') + ' 23:59:59'
  ]
}
// 获取今天到未来某一天
export const todayToSomeday = (day: any) => {
  const today = new Date().getTime()
  // 最大天数要小于今天
  let maxDate = today + (day - 1) * 24 * 3600 * 1000
  maxDate = maxDate >= today ? today : maxDate
  const arr = [
    dateFilter(today, 'yyyy-MM-dd') + ' 00:00:00',
    dateFilter(maxDate, 'yyyy-MM-dd') + ' 23:59:59'
  ]
  if (today > maxDate) {
    arr.reverse()
  }
  return arr
}
// 千分位数字
export const moneyFormat = (number: any) =>
  typeof number === 'number' ? number.toLocaleString() : Number(number).toLocaleString()
// 导出
export const exportTable = (columns: any, list: any, name = '未命名') => {
  return new Promise((resolve) => {
    const columnNames: any[] = []
    const columnValues: any[] = []
    for (let i = 0; i < columns.length; i++) {
      columnNames[i] = columns[i].label
      columnValues[i] = columns[i].prop
    }
    require.ensure([], () => {
      const { exportJsonToExcel } = require('./Export2Excel')
      const tHeader = columnNames
      const filterVal = columnValues
      const data = list.map((v: any) => filterVal.map((j) => v[j]))
      exportJsonToExcel(tHeader, data, name)
      resolve('')
    })
  })
}
// 解析成markdown
export const turnToMarkdown = (content: string) => {
  return new Markdown.Converter().makeHtml(content) // 转换
}
// 转换query
export const formatQuery = (query: object) => {
  let newQuery = ''
  for (const key in query) {
    if (key !== 'totalNum' && !['', null, undefined].includes(query[key])) {
      newQuery += `&${key}=${query[key]}`
    }
  }
  return newQuery.slice(1)
}
// 单个数组对象去重
export const filterArray = (arr: any[], key: string) => {
  const newArray = []
  const tempObj = {}
  arr = arr.reverse()
  for (let i = 0; i < arr.length; i++) {
    if (!tempObj[arr[i][key]]) {
      newArray.push(arr[i])
      tempObj[arr[i][key]] = true
    }
  }
  return newArray
}
// 两个数组对象去重
export const filterTwoArray = (arr1: any[], arr2: any[], key: any) => {
  if (arr1.length && arr2.length) {
    return arr1.filter((x) => arr2.every((y) => y[key] !== x[key]))
  } else {
    return []
  }
}
// 下载文件
export const downFile = (file: any, fileName: string) => {
  return new Promise((resolve) => {
    if (fileName) {
      // type: `application/msword` //word文档为msword,pdf文档为pdf
      // type: 'application/vnd.ms-excel'
      const blob = new Blob([file], { type: 'application/xlsx' }) // data就是接口返回的文件流了
      const link = document.createElement('a') // 生成一个a标签。
      link.href = window.URL.createObjectURL(blob) // href属性指定下载链接
      link.download = fileName // dowload属性指定文件名
      link.click() // click()事件触发下载
    } else {
      const alink = document.createElement('a')
      alink.href = file
      alink.download = file
      alink.click()
    }
    resolve('')
  })
}
// 富文本过滤器
export const textFormat = (text: string) => {
  if (!text) return
  text = text.replace(/&nbsp;/g, '')
  text = text.replace(/(\n)/g, '')
  text = text.replace(/(\t)/g, '')
  text = text.replace(/(\r)/g, '')
  text = text.replace(/<\/?[^>]*>/g, '')
  text = text.replace(/\s*/g, '')
  return text
}
// 获取时长
export const getDuration = (endTime: any, startTime: any) => {
  const end = new Date(endTime).getTime()
  const start = new Date(startTime).getTime()
  return computed(end - start)
}
// 计算时间
export const computed = (time: any) => {
  const d = Math.floor(time / (24 * 60 * 60 * 1000))
  const leave1 = time % (24 * 60 * 60 * 1000)
  const h = Math.floor(leave1 / (60 * 60 * 1000))
  const leave2 = leave1 % (60 * 60 * 1000)
  const m = Math.floor(leave2 / (60 * 1000))
  const leave3 = leave2 % (60 * 1000)
  const s = Math.round(leave3 / 1000)
  let str = ''
  if (d) {
    str += `${d}天`
  }
  if (h) {
    str += `${h}小时`
  }
  if (m) {
    str += `${m}分钟`
  }
  if (s) {
    str += `${s}秒`
  }
  return str
}

// 秒转时分秒
export const secondsToHms = (value: any) => {
  let theTime: number = parseInt(value) // 秒
  let middle = 0 // 分
  let hour = 0 // 小时
  if (theTime > 60) {
    middle = Math.floor(theTime / 60)
    theTime = Math.floor(theTime % 60)
    if (middle > 60) {
      hour = Math.floor(middle / 60)
      middle = Math.floor(middle % 60)
    }
  }
  let result = ''
  if (theTime) {
    result = '' + Math.floor(theTime) + '秒'
  }
  if (middle > 0) {
    result = '' + Math.floor(middle) + '分' + result
  }
  if (hour > 0) {
    result = '' + Math.floor(hour) + '小时' + result
  }
  return result
}
export const getAfterTime = (time: any, afterMin: any) => {
  // 时分秒转时间戳
  let timestamp: any = ''
  const hour = time.split(':')[0]
  const min = time.split(':')[1]
  // var sec = time.split(':')[2]
  // + Number(sec)
  timestamp = Number(hour * 3600) + Number(min * 60) + afterMin * 60
  // 时间戳转时分秒
  const h = Math.floor(timestamp / 3600)
  const m = Math.floor((timestamp % 3600) / 60)
  // var s = parseInt(timestamp % 3600) % 60
  const hh = h < 10 ? '0' + h : h
  const mm = m < 10 ? '0' + m : m
  // var ss = s < 10 ? '0' + s : s
  return hh + ':' + mm
}
