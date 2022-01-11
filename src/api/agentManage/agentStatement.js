import request from '../../utils/request'
// 日报详情查询接口
export const listAccountDayReportApi = (data) => {
  return request('get', `/agent/accountDayReport/listAccountDayReport?${data}`)
}
// 周报详情查询接口
export const listAccountWeekReportApi = (data) => {
  return request('get', `/agent/accountWeekReport/listAccountWeekReport?${data}`)
}
// 月报详情查询接口
export const listAccountMonthReportApi = (data) => {
  return request('get', `/agent/accountMonthReport/listAccountMonthReport?${data}`)
}
// 日报详情导出接口
export const excelAccountDayReportApi = (data) => {
  return request('get', `/agent/accountDayReport/ExcelAccountDayReport?${data}`, {}, false, 'exportFile')
}
// 周报详情导出接口
export const excelAccountWeekReportApi = (data) => {
  return request('get', `/agent/accountWeekReport/ExcelAccountWeekReport?${data}`)
}
// 月报详情导出接口
export const excelAccountMonthReportApi = (data) => {
  return request('get', `/agent/accountMonthReport/ExcelAccountMonthReport?${data}`)
}
