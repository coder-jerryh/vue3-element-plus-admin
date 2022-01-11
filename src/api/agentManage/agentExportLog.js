import request from '../../utils/request'
// 查询批量导入信息
export const getExcelChargeInfoApi = (data) => {
  return request('get', `/charge/excelChargeInfo/getExcelChargeInfo?${data}`)
}
// 查询批量导入详情
export const getExcelChargeLogApi = (data) => {
  return request('get', `/charge/excelChargeLog/getExcelChargeLog?${data}`)
}
