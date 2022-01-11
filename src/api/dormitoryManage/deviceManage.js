import request from '../../utils/request'
// 新增设备
export const addDeviceApi = (data) => {
  return request('post', '/dormitory/mgDevice/addOne', data)
}
// 删除设备
export const deleteDeviceApi = (data) => {
  return request('delete', `/dormitory/mgDevice/deleteOne?${data}`)
}
// 修改设备
export const updateDeviceApi = (data) => {
  return request('post', '/dormitory/mgDevice/updateOne', data)
}
// 分页查询设备信息
export const getDeviceListApi = (data) => {
  return request('post', '/dormitory/mgDevice/page', data)
}
// 注册当前学校所有未注册设备设备
export const registerDevicesApi = (data) => {
  return request('post', '/dormitory/mgDevice/registerDevices', data, true)
}
// 同步设备状态
export const syncDeviceStatusApi = (data) => {
  return request('post', '/dormitory/mgDevice/syncDeviceStatus', data, true)
}
// 注销设备
export const unregisterDeviceApi = (data) => {
  return request('delete', `/dormitory/mgDevice/unregisterDevice?${data}`)
}
// -------------------- 设备通道 -------------------
// 查询设备通道列表
export const getDeviceChannelListApi = (data) => {
  return request('post', '/dormitory/mgChannel/page', data)
}
// 同步设备通道
export const synchronousChannelApi = (data) => {
  return request('post', '/dormitory/mgChannel/synchronousChannel', data, true)
}
// 修改通道信息
export const updateChannelApi = (data) => {
  return request('post', '/dormitory/mgChannel/update', data, true)
}
// -------------------- 人脸库 -------------------
// 分页查询人脸库信息
export const getDeviceFaceListApi = (data) => {
  return request('post', '/dormitory/mgFaceLibrary/page', data)
}
// 新增人脸库
export const addDeviceFaceApi = (data) => {
  return request('post', '/dormitory/mgFaceLibrary/addOne', data)
}
// 删除人脸库
export const deleteDeviceFaceApiApi = (data) => {
  return request('delete', `/dormitory/mgFaceLibrary/deleteOne?${data}`)
}
// 修改人脸库
export const updateDeviceFaceApiApi = (data) => {
  return request('post', '/dormitory/mgFaceLibrary/updateOne', data)
}
