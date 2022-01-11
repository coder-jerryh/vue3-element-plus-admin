import request from '../../utils/request'
// 查询学校人员进出事件
export const getStudentTurnoverListApi = (data) => {
  return request('post', '/dormitory/infoEvent/page', data)
}
// 查询进出事件
export const getStrangerTurnoverListApi = (data) => {
  return request('post', '/dormitory/infoStranger/page', data)
}
// 查询事件消息推送记录
export const getPushLogApi = (data) => {
  return request('get', `/dormitory/logPush/getPushLog?${data}`)
}
// 查询人员状态变更记录
export const getUserChangeNoteListApi = (data) => {
  return request('post', '/dormitory/logStatusPerson/page', data)
}
