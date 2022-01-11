import request from '../utils/request'

// ---------- 直播APP ----------
// 添加直播APP
export const addUpdateLiveAppApi = (data) => {
  return request('post', '/live/liveApp/insertOrUpdate', data)
}
// 直播APP列表
export const getLiveAppListApi = (data) => {
  return request('get', `/live/liveApp/getLiveAppPage?${data}`)
}
// 删除直播APP
export const delLiveAppListApi = (data) => {
  return request('post', `/live/liveApp/delLiveApp?${data}`)
}
// 直播APP列表
export const getAllLiveAppListApi = (data) => {
  return request('get', '/live/liveApp/getAllLiveApp')
}
// ---------- 直播日志 ----------
// 直播日志
export const getLiveLogListApi = (data) => {
  return request('get', `/live/cameraLog/getCameraLogPage?${data}`)
}

// ---------- 直播摄像头 --------
// 直播摄像头列表
export const getLiveCaremaListApi = (data) => {
  return request('post', `/live/liveCamera/getLiveCameraPage?${data}`)
}
// 删除直播摄像头
export const delLiveCaremaApi = (data) => {
  return request('post', `/live/liveCamera/delLiveCamera?${data}`)
}
// 添加直播摄像头
export const addUpdateLivCaremaApi = (data) => {
  return request('post', '/live/liveCamera/insertOrUpdate', data)
}
// 添加直播摄像头
export const getLiveUrlApi = (data) => {
  return request('get', `/live/liveCamera/getLiveCameraUrl?${data}`)
}

// ---------- 教室设置 ----------
// 教室列表
export const geClassroomListApi = (data) => {
  return request('post', '/user/schoolField/listSchoolFieldVO', data, true)
}
// 删除教室
export const delClassroomApi = (data) => {
  return request('post', `/live/classRoom/delClassRoom?${data}`)
}
// 添加教室
export const addUpdateClassroomApi = (data) => {
  return request('post', '/live/classRoom/insertOrUpdate', data)
}
// 通过学生编号查询摄像头
export const getCameraByCardNumberApi = (data) => {
  return request('get', `/live/ding/getCameraByCardNumber?${data}`)
}
/* 教室摄像头 */
// 已配置的教室摄像头
export const getHasSettedClassroomCaremaApi = (data) => {
  return request('get', `/live/classRoom/getCameraClassRoom?${data}`)
}
// 可配置的教室摄像头
export const getClassroomCaremaApi = (data) => {
  return request('get', `/live/classRoom/getCameraList?${data}`)
}
// 删除教室摄像头
export const delClassroomCaremaApi = (data) => {
  return request('post', '/live/classRoom/delCameraClassRoom', data, true)
}
// 添加教室摄像头
export const addClassroomCaremaApi = (data) => {
  return request('post', '/live/classRoom/addCameraClassRoom', data, true)
}
/* 教室时间 */
// 教室时间列表
export const geClassroomTimeListApi = (data) => {
  return request('get', `/live/classRoomTime/getClassRoomTimeList?${data}`)
}
// 删除教室时间
export const delClassroomTimeApi = (data) => {
  return request('post', '/live/classRoomTime/delClassRoomTimes', data, true)
}
// 添加教室时间
export const addUpdateClassroomTimeApi = (data) => {
  return request('post', '/live/classRoomTime/insertOrUpdate', data)
}
// 查询未配置时间教室列表
export const getNoTimeClassroomListApi = (data) => {
  return request('post', '/live/classRoomTime/getClassInfoVoBySchool', data, true)
}
// 复制时间
export const copySchoolTimeApi = (data) => {
  return request('post', '/live/classRoomTime/copyClassRoomTime', data, true)
}

/* 教室日期 */
// 复制时间
export const copySchoolHolidayApi = (data) => {
  return request('post', '/live/classRoomDate/copyCameraClassDate', data, true)
}
// 设置本年双休日
export const setSchoolDayoffsApi = (data) => {
  return request('post', '/live/classRoomDate/addAllDayOffs', data, true)
}
// 获取日期列表
export const getSchoolDateApi = (data) => {
  return request('post', '/live/classRoomDate/getClassRoomDateList', data, true)
}
// 清空时间
export const clearSchoolDateApi = (data) => {
  return request('post', '/live/classRoomDate/delAll', data, true)
}
// 设置假期
export const setSchoolHolidayApi = (data) => {
  return request('post', '/live/classRoomDate/addClassRoomDates', data, true)
}

// ---------- 直播组管理 ----------
// 分页查询组列表
export const getGroupListApi = (data) => {
  return request('get', `/live/liveGroup/getGroupList?${data}`)
}
// 添加或更新组
export const addEditLiveGroupApi = (data) => {
  return request('post', '/live/liveGroup/insertOrUpdate', data)
}
// 删除组
export const deleteGroupApi = (data) => {
  return request('delete', `/live/liveGroup/deleteGroup?${data}`)
}

// ---------- 直播设备 ----------
// 获取设备分页列表
export const getDeviceListApi = (data) => {
  return request('get', `/live/liveDevice/getDeviceList?${data}`)
}
// 注册设备
export const addLiveDeviceApi = (data) => {
  return request('post', '/live/liveDevice/addDevice', data)
}
// 注销设备
export const deleteLiveDeviceApi = (data) => {
  return request('delete', `/live/liveDevice/deleteDevice?${data}`)
}
// 修改设备名称
export const updateDeviceNameApi = (data) => {
  return request('put', '/live/liveDevice/updateDeviceName', data, true)
}
