import request from '../../utils/request'
// 宿舍进出时间配置添加或修改
export const setUpDormitoryInOutTimeApi = (data) => {
  return request('post', '/dormitory/configInOutTime/setUpDormitoryInOutTime', data)
}
// 获取宿舍进出时间配置列表
export const getDormitoryInOutTimeListApi = (data) => {
  return request('get', `/dormitory/configInOutTime/getDormitoryInOutTimeConfigList?${data}`)
}
// 删除宿舍进出时间配置
export const delDormitoryInOutTimeConfigApi = (data) => {
  return request('delete', `/dormitory/configInOutTime/delDormitoryInOutTimeConfig?${data}`)
}
// 获取特殊日期进出配置列表
export const getTimeSpecialListApi = (data) => {
  return request('get', `/dormitory/configInOutTimeSpecial/getTimeSpecialList?${data}`)
}
// 删除特殊日期进出配置
export const delTimeSpecialApi = (data) => {
  return request('delete', `/dormitory/configInOutTimeSpecial/delTimeSpecial?${data}`)
}
// 添加修改特殊日期进出配置
export const timeSpecialSaveOrUpdateApi = (data) => {
  return request('post', '/dormitory/configInOutTimeSpecial/timeSpecialSaveOrUpdate', data)
}
