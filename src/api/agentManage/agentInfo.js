import request from '../../utils/request'
// ---------------- 代理商信息 --------------------
// 新增或修改代理商信息
export const addOrUpdateAgentInfoApi = (data) => {
  return request('post', '/agent/agentInfo/addOrUpdateAgentInfo', data, true)
}
// 查询代理商信息列表
export const getAgentInfoPageApi = (data) => {
  return request('get', `/agent/agentInfo/getAgentInfoPage?${data}`)
}
// 删除代理商信息
export const removeAgentInfoApi = (data) => {
  return request('post', '/agent/agentInfo/removeAgentInfo', data, true)
}
// ---------------- 结算比例 --------------------
// 新增或修改结算比例
export const addSettlementRatioApi = (data) => {
  return request('post', '/agent/settlementRatio/addSettlementRatio', data, true)
}
// 查询结算比例列表
export const getSettlementRatioPageApi = (data) => {
  return request('get', `/agent/settlementRatio/getSettlementRatioPage?${data}`)
}
// 删除结算比例
export const removeSettlementRatioApi = (data) => {
  return request('post', '/agent/settlementRatio/removeSettlementRatio', data, true)
}
// ---------------- 收款账户 --------------------
// 新增或修改收款账户
export const addOrUpdatePayAccountApi = (data) => {
  return request('post', '/agent/collectionAccount/addOrUpdateCollectionAccount', data, true)
}
// 查询收款账户列表
export const getCollectionAccountPageApi = (data) => {
  return request('get', `/agent/collectionAccount/getCollectionAccountPage?${data}`)
}
// 删除收款账户比例
export const removeCollectionAccountApi = (data) => {
  return request('post', '/agent/collectionAccount/removeCollectionAccount', data, true)
}
// ---------------- 登录账号关联 --------------------
// 代理商配置登录账号
export const addAgentUserApi = (data) => {
  return request('post', '/agent/agentUserInfo/addAgentUser', data)
}
// 移除代理商登录账号配置
export const removeAgentUserApi = (data) => {
  return request('post', '/agent/agentUserInfo/removeAgentUser', data, true)
}
// 查询配置的代理商登录账号
export const getAgentUserInfoPageApi = (data) => {
  return request('post', '/agent/agentUserInfo/getAgentUserInfoPage', data, true)
}
// ---------------- 收费模式 --------------------
// 配置代理商收费模式
export const setAgentChargeTypeApi = (data) => {
  return request('post', '/agent/agentChargeType/addAgentChargeType', data)
}
// 查询代理商收费模式
export const getAgentChargeTypePageApi = (data) => {
  return request('get', `/agent/agentChargeType/getAgentChargeTypePage?${data}`)
}
// 获取代理商配置（微信）
export const getAgentPayConfigWxPageApi = (data) => {
  return request('post', '/agent/agentPayConfigWx/getAgentPayConfigWxPage', data, true)
}
// ---------------- 收款账户 --------------------
// 新增/修改代理商支付配置（微信）
export const insertOrUpdateAgentPayConfigWxApi = (data) => {
  return request('post', '/agent/agentPayConfigWx/insertOrUpdateAgentPayConfigWx', data, true)
}
// 辑删除代理商支付配置（微信）
export const delAgentPayConfigWxApi = (data) => {
  return request('post', '/agent/agentPayConfigWx/delAgentPayConfigWx', data, true)
}
// 获取代理商配置（支付宝）
export const getAgentPayConfigZfbPageApi = (data) => {
  return request('post', '/agent/agentPayConfigZfb/getAgentPayConfigZfbPage', data, true)
}
// 新增/修改代理商支付配置（支付宝）
export const insertOrUpdateAgentPayConfigZfbApi = (data) => {
  return request('post', '/agent/agentPayConfigZfb/insertOrUpdateAgentPayConfigZfb', data, true)
}

// 逻辑删除代理商支付配置（支付宝）
export const delAgentPayConfigZfbApi = (data) => {
  return request('post', '/agent/agentPayConfigZfb/delAgentPayConfigZfb', data, true)
}

// 启停代理商服务配置（支付宝）
export const changeAgentPayConfigZfbUseStatusApi = (data) => {
  return request('post', '/agent/agentPayConfigZfb/changeAgentPayConfigZfbUseStatus', data, true)
}
// 启停代理商服务配置（微信）
export const changeAgentPayConfigWxUseStatusApi = (data) => {
  return request('post', '/agent/agentPayConfigWx/changeAgentPayConfigWxUseStatus', data, true)
}
// 启停代理商服务配置（农商行）
export const changeCollectionAccountUseStatusApi = (data) => {
  return request('post', '/agent/collectionAccount/changeCollectionAccountUseStatus', data, true)
}
