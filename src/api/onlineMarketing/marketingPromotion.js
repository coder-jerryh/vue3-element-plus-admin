
// 多条件分页查询广告推送配置
import request from '../../utils/request'
export const getBusinessConfigByPageApi = (data) => {
  return request('get', `/business/businessConfig/getBusinessConfigByPage?${data}`)
}
// 新增广告推送配置
export const addBusinessConfigApi = (data) => {
  return request('post', '/business/businessConfig/addBusinessConfig', data, true)
}
// 修改广告推送配置
export const updateBusinessConfigApi = (data) => {
  return request('post', '/business/businessConfig/updateBusinessConfig', data, true)
}
// 删除广告推送配置
export const delBusinessConfigApi = (data) => {
  return request('get', `/business/businessConfig/delBusinessConfig?${data}`)
}
// 复制广告推送配置
export const copyBusinessConfigApi = (data) => {
  return request('get', `/business/businessConfig/copyBusinessConfig?${data}`)
}
// 获取服务关联的班级
export const getChargeToClassesByPkIdApi = (data) => {
  return request('get', `/business/sendSymbol/getChargeToClassesByPkId?${data}`)
}
// 添加班级推广对象
export const addSendSymbolToClassApi = (data) => {
  return request('post', '/business/sendSymbol/addSendSymbolToClass', data, false)
}
// 获取班级已配置推广对象
export const getSettledSendSymbolOfClassApi = (data) => {
  return request('get', `/business/sendSymbol/getSettledSendSymbolOfClass?${data}`)
}
// 修改已配置的班级推广对象
export const updateSendTypeApi = (data) => {
  return request('post', '/business/sendSymbol/updateSendType', data, false)
}
// 删除已配置的班级推广对象
export const delSendSymbolApi = (data) => {
  return request('post', '/business/sendSymbol/delSendSymbol', data, true)
}
// 多条件多表查询学生信息
export const listStudentInfoVOWithManyConditionApi = (data) => {
  return request('post', '/user/studentInfo/listStudentInfoVOWithManyCondition', data, true)
}
// 添加人员推广对象
export const addSendSymbolToStudentApi = (data) => {
  return request('post', '/business/sendSymbol/addSendSymbolToStudent', data, false)
}
// 获取人员已配置推广对象
export const getSettledSendSymbolOfStudentApi = (data) => {
  return request('get', `/business/sendSymbol/getSettledSendSymbolOfStudent?${data}`)
}
// 获取学生信息列表
export const getStudentInfoListApi = (data) => {
  return request('post', '/user/studentInfo/getStudentInfoList', data, true)
}
