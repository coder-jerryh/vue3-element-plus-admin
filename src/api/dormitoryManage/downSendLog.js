import request from '../../utils/request'
// 查询该学校的人脸下发记录
export const getSendRecordApi = (data) => {
  return request('post', '/dormitory/mgIssuedTask/pageSendRecord', data, true)
}
// 查询当前记录相关人员下发情况
export const getSendRecordDetailApi = (data) => {
  return request('get', `/dormitory/mgIssuedTask/pageSendRecord?${data}`)
}
// 查询进出事件
export const getErrorInfoLogApi = (data) => {
  return request('post', '/dormitory/infoError/page', data)
}
// 同步设备下发任务
export const synchronizeDeviceTasksApi = (data) => {
  return request('post', '/dormitory/mgDevice/synchronizeDeviceTasksBySchool', data, true)
}
// 补推消息
export const sendMessageApi = (data) => {
  return request('post', '/dormitory/infoError/sendMessage', data, true)
}
