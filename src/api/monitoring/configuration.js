import request from '../../utils/request'
// 查询消息推送配置
export const getConfigPushListApi = (data) => {
  return request('get', `/monitor/configPush/getConfigPushList?${data}`)
}
// 修改监控配置
export const updateConfigPushApi = (data) => {
  return request('post', '/monitor/configPush/updateConfigPush', data, true)
}
// 添加监控配置
export const addConfigPushApi = (data) => {
  return request('post', '/monitor/configPush/addConfigPush', data, true)
}
// 删除监控配置
export const delConfigPushApi = (data) => {
  return request('post', '/monitor/configPush/delConfigPush', data, true)
}
// 查询获取群信息列表
export const getConfigGroupManagementListApi = (data) => {
  return request('get', `/monitor/configGroupManagement/getConfigGroupManagementList?${data}`)
}
// 添加推送群
export const saveConfigGroupManagementApi = (data) => {
  return request('post', '/monitor/configGroupManagement/saveConfigGroupManagement', data, true)
}
// 更新推送群
export const updateConfigGroupManagementApi = (data) => {
  return request('post', '/monitor/configGroupManagement/updateConfigGroupManagement', data, true)
}
// 删除推送群
export const delConfigGroupManagementApi = (data) => {
  return request('post', '/monitor/configGroupManagement/delConfigGroupManagement', data, true)
}
// 添加策略配置
export const saveConfigMonitoringStrategyApi = (data) => {
  return request('post', '/monitor/configMonitoringStrategy/saveConfigMonitoringStrategy', data, true)
}
// 查询获取策略配置详情列表
export const getConfigMonitoringStrategyListApi = (data) => {
  return request('get', `/monitor/configMonitoringStrategy/getConfigMonitoringStrategyList?${data}`)
}
// 删除策略配置
export const delConfigMonitoringStrategyApi = (data) => {
  return request('post', '/monitor/configMonitoringStrategy/delConfigMonitoringStrategy', data, true)
}
// 修改策略配置
export const updateConfigMonitoringStrategyApi = (data) => {
  return request('post', '/monitor/configMonitoringStrategy/updateConfigMonitoringStrategy', data, true)
}
// 添加学校与策略关系
export const saveConfigMonitoringStrategySchoolApi = (data) => {
  return request('post', '/monitor/configMonitoringStrategySchool/saveConfigMonitoringStrategySchool', data, true)
}
// 获取单个学校策略关系
export const getConfigMonitoringStrategySchoolApi = (data) => {
  return request('get', `/monitor/configMonitoringStrategySchool/getConfigMonitoringStrategySchool?${data}`)
}
// 获取学校策略关系列表
export const getConfigMonitoringStrategySchoolListApi = (data) => {
  return request('get', `/monitor/configMonitoringStrategySchool/getConfigMonitoringStrategySchoolList?${data}`)
}
// 保存消息推送配置关联人员
export const saveConfigPushUserApi = (data) => {
  return request('post', '/monitor/configPushUser/saveConfigPushUser', data, true)
}
// 通过策略id查询获取群信息列表
export const getConfigGroupManagementListByStrategyIdApi = (data) => {
  return request('get', `/monitor/configGroupManagement/getConfigGroupManagementListByStrategyId?${data}`)
}
// 新增消息推送配置关联群
export const saveConfigPushGroupApi = (data) => {
  return request('post', '/monitor/configPushGroup/saveConfigPushGroup', data, true)
}
// 删除消息推送配置关联群
export const delConfigPushGroupApi = (data) => {
  return request('post', '/monitor/configPushGroup/delConfigPushGroup', data, true)
}
// 根据消息推送配置id获取人列表
export const getConfigUserByConfigIdApi = (data) => {
  return request('post', '/monitor/configPushUser/getConfigUserByConfigId', data, true)
}
// 删除消息推送配置关联人员
export const delConfigPushUserApi = (data) => {
  return request('post', '/monitor/configPushUser/delConfigPushUser', data, true)
}
// 查询策略参数
export const getStrategyParameterApi = (data) => {
  return request('get', `/monitor/configMonitoringStrategy/getStrategyParameter?${data}`)
}
// 查询客服值班表列表
export const getCustomerServiceDutyListApi = (data) => {
  return request('post', '/monitor/customerServiceDuty/getCustomerServiceDutyList', data, true)
}
// 添加客服值班表
export const addCustomerServiceDutyApi = (data) => {
  return request('post', '/monitor/customerServiceDuty/addCustomerServiceDuty', data, true)
}
// 删除客服值班表
export const delCustomerServiceDutyApi = (data) => {
  return request('post', '/monitor/customerServiceDuty/delCustomerServiceDuty', data, true)
}
// 修改客服值班表
export const updateCustomerServiceDutyApi = (data) => {
  return request('post', '/monitor/customerServiceDuty/updateCustomerServiceDuty', data, true)
}
