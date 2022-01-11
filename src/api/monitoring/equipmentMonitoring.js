import request from '../../utils/request'
// 实时查看当前设备状态、掉线时长(签到设备)
export const getSignMonitoringDeviceInfoPageApi = (data) => {
  return request('get', `/monitor/monitoringDeviceInfo/getSignMonitoringDeviceInfoPage?${data}`)
}
// 同步签到设备信息
export const synchronousSignDeviceInfoApi = (data) => {
  return request('post', '/monitor/monitoringDeviceInfo/synchronousSignDeviceInfo', data, true)
}
// 通过设备序列号得到设备变更记录
export const getChangeDeviceListApi = (data) => {
  return request('get', `/monitor/changeDeviceInfo/getChangeDeviceInfoPageByDeviceSerialNumber?${data}`)
}
// 通过设备信息主键得到设备变更记录
export const getLiveChangeNoteApi = (data) => {
  return request('get', `/monitor/changeDeviceInfo/getChangeDeviceInfoPageByDevicePkId?${data}`)
}
// 设备变更统计查询
export const getStatisticsDeviceChangePageApi = (data) => {
  return request('get', `/monitor/statisticsDeviceChange/getStatisticsDeviceChangePage?${data}`)
}
// 实时查看当前设备状态(直播摄像头)
export const getLiveMonitoringDeviceInfoPageApi = (data) => {
  return request('get', `/monitor/monitoringDeviceInfo/getLiveMonitoringDeviceInfoPage?${data}`)
}
// 同步直播设备信息
export const syncLiveMonitoroApi = (data) => {
  return request('get', `/monitor/monitoringDeviceInfo/synchronousLiveMonitorDeviceInfo?${data}`)
}
// 实时查看一卡通设备状态、掉线时长
export const getOneCardDeviceListApi = (data) => {
  return request('get', `/monitor/monitoringDeviceInfo/getOneCardDeviceList?${data}`)
}
