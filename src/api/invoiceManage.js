import request from '../utils/request'

// ---------- 发票应用 ----------
// 获取【发票余量】666
export const getInvoiceAmountByAppIdApi = (data) => {
  return request('get', `/invoice/invoiceApp/getInvoiceAmountByAppId?${data}`)
}
// 【发票告警阈值】插入/更新666
export const InvoiceWarnInsertAndUpdateApi = (data) => {
  return request('post', '/invoice/invoiceApp/InvoiceWarnInsertAndUpdate', data)
}
// 【发票告警阈值】集合666
export const getWarnListByInvoiceAppIdApi = (data) => {
  return request('get', `/invoice/invoiceApp/getWarnListByInvoiceAppId?${data}`)
}
// 添加【发票应用】666
export const insertInvoiceApi = (data) => {
  return request('post', '/invoice/invoiceApp/insertInvoice', data)
}
// 【发票应用】列表(不需要分页)666
export const getInvoiceAppListApi = (data) => {
  return request('get', `/invoice/invoiceApp/selectInvoiceAppList?${data}`)
}
// 修改【发票应用】666
export const updateInvoiceApi = (data) => {
  return request('post', '/invoice/invoiceApp/updateInvoice', data)
}
// 修改【发票余量】666
export const updateInvoiceAmountApi = (data) => {
  return request('post', '/invoice/invoiceApp/updateInvoiceAmount', data, true)
}
// 【发票告警阈值】删除
export const deleteInvoiceWarnApi = (data) => {
  return request('post', '/invoice/invoiceApp/deleteInvoiceWarn', data, true)
}

// ---------- 发票记录 ----------
// 查询开票记录
export const selectInvoiceRecordPageApi = (data) => {
  return request('post', '/invoice/invoiceRecord/selectInvoiceRecordPage', data, true)
}
// 开票记录详情
export const getInvoiceDetailsByOrderCodeApi = (data) => {
  return request('get', `/invoice/invoiceRecord/getInvoiceDetailsByOrderCode?${data}`)
}

// ---------- 发票日志 ----------
// 电子发票日志列表
export const getInvoiceLogPageApi = (data) => {
  return request('post', '/invoice/invoiceLog/getInvoiceLogPage', data, true)
}
