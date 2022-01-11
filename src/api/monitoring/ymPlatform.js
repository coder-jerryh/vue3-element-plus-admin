import request from '../../utils/request'
// 实时查询云眸人员状态
export const pageUserRegistrationApi = (data) => {
  return request('get', `/monitor/monitoringYmPersonRegisteredInfo/pageUserRegistration?${data}`)
}
// 查询云眸人员注册历史数据
export const pageUserRegistrationHistoryApi = (data) => {
  return request('get', `/monitor/monitoringYmPersonRegisteredInfo/pageUserRegistrationHistory?${data}`)
}
// 查询云眸人员下发失败信息
export const pageUserSendFailApi = (data) => {
  return request('get', `/monitor/monitoringYmPersonSendInfo/pageUserSendFail?${data}`)
}
// 查询云眸人员下发失败信息历史记录
export const pageUserSendFailHistoryApi = (data) => {
  return request('get', `/monitor/monitoringYmPersonSendInfo/pageUserSendFailHistory?${data}`)
}
