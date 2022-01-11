import request from '../utils/request'

// 查询已推送成绩 查询消息的家长推送记录
export const getResultsQuerySendLogPageApi = (data) => {
  return request('get', `/basic/resultsQuerySendLog/getResultsQuerySendLogPage?${data}`)
}
// 查询未推送成绩查询消息的家长信息
export const getNotResultsQuerySendLogPageApi = (data) => {
  return request('get', `/basic/resultsQuerySendLog/getNotResultsQuerySendLogPage?${data}`)
}
// 指定家长推送成绩查询消息
export const pushResultsQueryMessageToCustomerApi = (data) => {
  return request('post', '/basic/resultsQuerySendLog/pushResultsQueryMessageToCustomer', data, false)
}
// 删除成绩查询消息推送记录
export const removeResultsQuerySendLogApi = (data) => {
  return request('post', '/basic/resultsQuerySendLog/removeResultsQuerySendLog', data, true)
}
// 查询成绩查询日志
export const getResultsQueryLogPageApi = (data) => {
  return request('get', `/basic/resultsQueryLog/getResultsQueryLogPage?${data}`)
}
// 全校推送成绩查询消息
export const pushResultsQueryMessageApi = (data) => {
  return request('post', '/basic/resultsQuerySendLog/pushResultsQueryMessage', data, true)
}
