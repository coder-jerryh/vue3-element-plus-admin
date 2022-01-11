import request from '../utils/request'

// 角色
// 添加角色
export const addRoleApi = (data) => {
  return request('post', '/function/role/saveRole', data, true)
}
// 角色列表
export const getRoleListApi = (data) => {
  return request('post', `/function/role/selectRoleList?${data}`)
}
// 删除角色
export const delRoleApi = (data) => {
  return request('delete', `/function/role/deleteRole?${data}`)
}
// 更新角色
export const updateRoleApi = (data) => {
  return request('post', '/function/role/updateRole', data, true)
}
// 配置权限
export const setRoleMenuApi = (data) => {
  return request('post', '/function/role/configRoleFuncs', data)
}
// 配置用户角色
export const setAdminMenuApi = (data) => {
  return request('post', '/function/role/saveRoleUsers', data, true)
}
// 移除用户角色
export const delAdminRoleApi = (data) => {
  return request('delete', `/function/role/deleteRoleUsers?${data}`)
}
// 管理员列表
export const getAdminListApi = (data, query) => {
  return request('post', `/function/user/page?${data}`, query)
}
// 管理员角色列表
export const getRoleAdminListApi = (data, query) => {
  return request('post', `/function/role/selectUserPageByRoleId?${data}`, query)
}

// 日志列表
export const getSystemLogListApi = (data, query) => {
  return request('post', `/function/logInfo/page?${data}`, query)
}

// 服务协议
// 添加服务协议
export const addServiceDealApi = (data) => {
  return request('post', '/basic/chargeAgreement/addOneChargeAgreement', data)
}
// 服务协议列表
export const getServiceDealListApi = (data) => {
  return request('get', '/basic/chargeAgreement/selectAllCharAgreementList')
}
// 删除服务协议
export const delServiceDealApi = (data) => {
  return request('post', `/basic/chargeAgreement/deleteChargeAgreement?${data}`)
}
// 更新服务协议
export const updateServiceDealApi = (data) => {
  return request('post', '/basic/chargeAgreement/editOneChargeAgreement', data)
}

// 服务密钥
// 添加服务密钥
export const addServiceKeyApi = (data) => {
  return request('post', '/basic/signInfo/addSignInfo', data, true)
}
// 服务密钥列表
export const getServiceKeyListApi = (data) => {
  return request('get', `/basic/signInfo/getSignListPage?${data}`)
}
// 删除服务密钥
export const delServiceKeyApi = (data) => {
  return request('post', `/basic/signInfo/delSignInfo?${data}`)
}

// 获取所有系统配置
export const getAllSystemConfigApi = (data) => {
  return request('get', '/basic/sysConfig/selectSysConfig')
}
// 保存所有配置
export const saveSystemConfigApi = (data) => {
  return request('post', '/basic/sysConfig/updateSysConfig', data)
}
// 查询转发配置列表
export const getDingdingConfigListApi = (data) => {
  return request('get', `/ddConfig/relayConfig/getList?${data}`)
}
// 保存或修改钉钉转发配置
export const saveDingOrUpdateApi = (data) => {
  return request('post', '/ddConfig/relayConfig/saveOrUpdate', data, true)
}
// 消息管理
// 添加消息管理
export const addMsgApi = (data) => {
  return request('post', '/basic/message/addMessage', data, true)
}
// 消息管理列表
export const getMsgListApi = (data) => {
  return request('get', `/basic/message/listMessage?${data}`)
}
// 删除消息管理
export const delMsgApi = (data) => {
  return request('post', `/basic/message/deleteMsg?${data}`)
}

// ------- 场所类型 ---------
// 添加场所类型
export const addPlaceTypeApi = (data) => {
  return request('post', '/user/fieldType/addFieldType', data, true)
}
// 场所类型列表
export const getPlaceTypeListApi = (data) => {
  return request('post', '/user/fieldType/listFieldTypeVO', data, true)
}
// 删除场所类型
export const delPlaceTypeApi = (data) => {
  return request('get', `/user/fieldType/deleteById?${data}`)
}
// 更新场所类型
export const updatePlaceTypeApi = (data) => {
  return request('post', '/user/fieldType/updateFieldType', data, true)
}

// ------------ 农信订单处理 -----------------
// 分页查询农商行补处理订单信息
export const getNshOrderListApi = (data) => {
  return request('get', `/pay/scrcuOrderMakeUp/pageList?${data}`)
}
// 手动批量处理农商行订单回调
export const handleUnNotifyScrcuOrderBatchApi = (data) => {
  return request('post', '/pay/scrcuOrderMakeUp/handleUnNotifyScrcuOrderBatch', data)
}
// 插入/更新
export const insertOrderUpdateApi = (data) => {
  return request('post', '/user/demoConfig/insertOrderUpdate', data)
}
// 修改演示状态
export const updateIsOpenApi = (data) => {
  return request('put', '/user/demoConfig/updateIsOpen', data, true)
}
// 演示配置列表
export const getDemoConfigListApi = (data) => {
  return request('get', `/user/demoConfig/getDemoConfigList?${data}`)
}
