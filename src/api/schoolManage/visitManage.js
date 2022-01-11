import request from '../../utils/request'
// 查询到访记录
export const selectVisitInfoApi = (data) => {
  return request('post', '/workdevice/visitInfo/selectVisitInfo', data, true)
}
// 到访详情
export const getVisitInfoApi = (data) => {
  return request('get', `/workdevice/visitInfo/getVisitInfo?${data}`)
}
// 到访进出信息
export const selectAccessInfoApi = (data) => {
  return request('get', `/workdevice/visitAccessInfo/selectAccessInfo?${data}`)
}
