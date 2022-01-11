import request from '../../utils/request'
// 查询学生信息操作记录
export const getOperationInfoStudentPageApi = (data) => {
  return request('get', `/monitor/operationInfoStudent/getOperationInfoStudentPage?${data}`)
}
// 查询家长信息操作记录
export const getOperationInfoCustomerPageApi = (data) => {
  return request('get', `/monitor/operationInfoCustomer/getOperationInfoCustomerPage?${data}`)
}
// 查询教师信息操作记录
export const getOperationInfoTeacherPageApi = (data) => {
  return request('get', `/monitor/operationInfoTeacher/getOperationInfoTeacherPage?${data}`)
}
// 查询操作记录详情
export const getOperationDetailByOperationInfoIApi = (data) => {
  return request('get', `/monitor/operationDetail/getOperationDetailByOperationInfoId?${data}`)
}
// 多条件用户数据变更统计记录查询
export const getStatisticsUserChangeListApi = (data) => {
  return request('get', `/monitor/statisticsUserChange/getStatisticsUserChangeList?${data}`)
}
// 签到统计查询
export const getStatisticsSignInfoApi = (data) => {
  return request('get', `/monitor/statisticsSignInfo/getStatisticsSignInfo?${data}`)
}
