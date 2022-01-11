import request from '../../utils/request'
// 实时查看各个宿舍状态
export const getDormStateListsApi = (data) => {
  return request('get', `/dormitory/mgScreenDevice/getDormState?${data}`)
}
// 实时查看宿舍人员状态
export const getPersonStateApi = (data) => {
  return request('get', `/dormitory/mgScreenDevice/getPersonState?${data}`)
}
// 下发该学校所有未下发的人员
export const downSendApi = (data) => {
  return request('post', '/dormitory/mgIssuedTask/deliveryBySchool', data, true)
}
// 同步人员下发状态
export const syncPersonnelStatusApi = (data) => {
  return request('post', '/dormitory/mgPerson/syncPersonnelStatusBySchool', data, true)
}
// 批量重新注册注册失败人员
export const registerPersonApi = (data) => {
  return request('post', '/dormitory/mgPerson/registerPerson', data, true)
}
// 获取教师宿管入住列表
export const getTeacherOccupancyListApi = (data) => {
  return request('get', `/dormitory/mgPerson/getTeacherOccupancyList?${data}`)
}
