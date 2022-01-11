import request from '../../utils/request'
// 查询所有的设备信息列表
export const getAllDeviceInfoApi = (data) => {
  return request('get', `/device/deviceInfo/getAllDeviceInfo?${data}`)
}
// 获取异常推送人员列表
export const getAbnormalPushUserApi = (data) => {
  return request('get', `/device/eventInfo/getAbnormalPushUser?${data}`)
}
