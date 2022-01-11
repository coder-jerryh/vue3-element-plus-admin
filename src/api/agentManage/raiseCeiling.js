import request from '../../utils/request'
// 新增代理商账户提额信息
export const addAccountApprovalInfoApi = (data) => {
  return request('post', '/agent/accountApprovalInfo/addAccountApprovalInfo', data, true)
}
// 查询代理商账户提额记录
export const getAccountApprovalInfoListApi = (data) => {
  return request('post', '/agent/accountApprovalInfo/getAccountApprovalInfoList', data, true)
}
// 发起代理商提额审批
export const sendAccountApprovalExamineApi = (data) => {
  return request('post', '/agent/accountApprovalInfo/sendAccountApprovalExamine', data, true)
}
// 修改代理商账户提额信息
export const updateAccountApprovalInfoApi = (data) => {
  return request('post', '/agent/accountApprovalInfo/updateAccountApprovalInfo', data, true)
}
// 删除代理商账户提额信息
export const deleteAccountApprovalInfoApi = (data) => {
  return request('post', '/agent/accountApprovalInfo/deleteAccountApprovalInfo', data, true)
}
// 删除代理商提额凭证信息
export const deleteAccountVoucherInfoApi = (data) => {
  return request('post', '/agent/accountVoucherInfo/deleteAccountVoucherInfo', data, true)
}
// 代理商提额审批回调
export const accountApprovalCallBackApi = (data) => {
  return request('post', '/agent/accountApprovalInfo/accountApprovalCallBack', data, true)
}
