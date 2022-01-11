import request from '../utils/request'
// 获取审批模板列表
export const getProcessListApi = (data) => {
  return request('get', `/process/processInfo/getProcessList?${data}`)
}
// 添加/更新审批模板
export const insertOrUpdateApi = (data) => {
  return request('post', '/process/processInfo/insertOrUpdate', data)
}

// 根据id删除模板
export const delProcessByIdApi = (data) => {
  return request('put', '/process/processInfo/delProcessById', data, true)
}
// 发布审批模板
export const issueApi = (data) => {
  return request('put', '/process/processInfo/issue', data, true)
}
// 学校模板审批流程列表
export const getProcessSchoolPageApi = (data) => {
  return request('post', '/process/processSchool/getProcessSchoolPage', data, true)
}
// 添加学校模板审批流程
export const insertProcessSchoolApi = (data) => {
  return request('post', '/process/processSchool/insertProcessSchool', data, true)
}
// 编辑学校模板审批流程
export const updateProcessSchoolApi = (data) => {
  return request('post', '/process/processSchool/updateProcessSchool', data, true)
}
// 删除审批流程
export const delSchoolProcessApi = (data) => {
  return request('put', '/process/processSchool/delSchoolProcess', data, true)
}
// 【pc端】 审批记录列表
export const selectRecordListApi = (data) => {
  return request('post', '/process/processRecord/selectRecordList', data, true)
}
// 【pc端】审批详情
export const getRecordDetailsApi = (data) => {
  return request('get', `/process/processRecord/getRecordDetails?${data}`)
}
// 取消发布
export const cancelIssueApi = (data) => {
  return request('put', '/process/processInfo/cancelIssue', data, true)
}
// 一键同步学校钉钉模板表单
export const synchronizationSchoolProcessApi = (data) => {
  return request('post', '/process/processInfo/synchronizationSchoolProcess', data, true)
}
