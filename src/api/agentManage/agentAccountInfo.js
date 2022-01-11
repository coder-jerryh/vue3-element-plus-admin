import request from '../../utils/request'
// 查询代理商账户信息
export const getAgentAccountInfoListApi = (data) => {
  return request('post', '/agent/agentAccountInfo/getAgentAccountInfoList', data, true)
}
// 新增代理商账户信息
export const saveAgentAccountInfoApi = (data) => {
  return request('post', '/agent/agentAccountInfo/saveAgentAccountInfo', data, true)
}
// 修改代理商账户信息
export const updateAgentAccountInfoApi = (data) => {
  return request('post', '/agent/agentAccountInfo/updateAgentAccountInfo', data, true)
}
// 删除代理商账户信息
export const deleteAgentAccountInfoApi = (data) => {
  return request('post', '/agent/agentAccountInfo/deleteAgentAccountInfo', data, true)
}
