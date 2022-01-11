import request from '../../utils/request'
// 调宿
export const changeDormApi = (data) => {
  return request('post', '/dormitory/mgPerson/changeDorm', data)
}
// 手动更改学生状态，执行归寝操作
export const changePersonStatusApi = (data) => {
  return request('post', '/dormitory/mgPerson/changePersonStatus', data, true)
}
// 对调宿舍
export const exchangeDormApi = (data) => {
  return request('post', '/dormitory/mgPerson/exchangeDorm', data, true)
}
// 人员入住
export const personOccupancyApi = (data) => {
  return request('post', '/dormitory/mgPerson/personOccupancy', data)
}
// 批量入住
export const personOccupancyUploadApi = (data) => {
  return request('post', '/dormitory/mgPerson/personOccupancyUpload', data, true)
}
// 入住列表
export const getPersonOccupancyListApi = (data) => {
  return request('get', `/dormitory/logPersonStay/getPersonOccupancyList?${data}`)
}
// 退宿
export const returnDormApi = (data) => {
  return request('delete', `/dormitory/mgPerson/returnDorm?${data}`)
}
// 批量退宿
export const returnDormUploadApi = (data) => {
  return request('delete', `/dormitory/mgPerson/returnDormUpload?${data}`)
}
// 获取入住人员信息
export const getPersonInfoApi = (data) => {
  return request('get', `/dormitory/mgPerson/getPersonInfo?${data}`)
}
// 获取入住人员列表
export const getMgPersonListApi = (data) => {
  return request('get', `/dormitory/mgPerson/getMgPersonList?${data}`)
}
// 教师入住
export const teacherOccupancyApi = (query, data) => {
  return request('post', `/dormitory/mgPerson/teacherOccupancy?${query}`, data)
}
// 获取未入住教师列表
export const getTeacherInfoListApi = (data) => {
  return request('get', `/dormitory/mgPerson/getTeacherInfoList?${data}`)
}
// 教师退宿
export const teacherReturnDormApi = (data) => {
  return request('post', '/dormitory/mgPerson/teacherReturnDorm', data)
}
// 获取未入住学生列表
export const getStudentInfoListApi = (data) => {
  return request('get', `/dormitory/mgPerson/getStudentInfoList?${data}`)
}
// 寝室列表
export const getSchoolDormListApi = (data) => {
  return request('post', '/user/schoolField/listSchoolDormFieldVO', data, true)
}
