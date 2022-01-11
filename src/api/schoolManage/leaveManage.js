import request from '../../utils/request'
// 获取请假信息
export const getLeaveListApi = (data) => {
  return request('post', '/workdevice/leaveInfo/selectLeaveInfo', data, true)
}
// 基本信息详情
export const getLeaveInfoApi = (data) => {
  return request('get', `/workdevice/leaveInfo/getLeaveInfo?${data}`)
}
// 请假进出信息
export const selectAccessInfoApi = (data) => {
  return request('get', `/workdevice/leaveAccessInfo/selectAccessInfo?${data}`)
}
