import request from '../../utils/request'
// 获取消息列表
export const listMessageInfoVOApi = (data) => {
  return request('post', '/business/messageInfo/listMessageInfoVO', data, true)
}
// 获取服务评价列表
export const getEvaluationListApi = (data) => {
  return request('get', `/business/evaluationRecord/getEvaluationList?${data}`)
}
// 根据消息唯一编码获取消息
export const getMessageInfoVOApi = (data) => {
  return request('get', `/business/messageInfo/getMessageInfoVO?${data}`)
}
// 获取标签列表
export const getLabelConfigPageApi = (data) => {
  return request('post', '/business/labelConfig/getLabelConfigPage', data, true)
}
// 逻辑删除标签信息
export const delLabelConfigApi = (data) => {
  return request('post', '/business/labelConfig/delLabelConfig', data, true)
}
// 新增/修改标签信息
export const insertOrUpdateLabelConfigApi = (data) => {
  return request('post', '/business/labelConfig/insertOrUpdateLabelConfig', data, true)
}
