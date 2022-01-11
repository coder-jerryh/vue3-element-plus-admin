import request from '../../utils/request'
// 获取班级信息列表
export const listClassInfoVOApi = (data) => {
  return request('post', '/user/classInfo/listClassInfoVO', data, true)
}
// 分页查询签到班次信息
export const getSignItemsApi = (data) => {
  return request('post', '/statistics/signItem/getSignItems', data, true)
}
// 新增签到组
export const addSignGroupApi = (data) => {
  return request('post', '/statistics/signGroup/addSignGroup', data, true)
}
// 条件查询签到组列表
export const listSignGroupApi = (data) => {
  return request('post', '/statistics/signGroup/listSignGroup', data, true)
}
// 删除签到组
export const delSignGroupApi = (data) => {
  return request('post', '/statistics/signGroup/delSignGroup', data, true)
}
// 查询单个签到组详情
export const getSignGroupApi = (data) => {
  return request('post', '/statistics/signGroup/getSignGroup', data, true)
}
// 新增签到组无须签到时间
export const addSignGroupNotDayApi = (data) => {
  return request('post', '/statistics/signGroupNotDay/addSignGroupNotDay', data, true)
}
// 获取签到组无须签到时间列表
export const listSignGroupNotDayApi = (data) => {
  return request('post', '/statistics/signGroupNotDay/listSignGroupNotDay', data, true)
}
// 删除签到组无须签到时间
export const delSignGroupNotDayApi = (data) => {
  return request('post', '/statistics/signGroupNotDay/delSignGroupNotDay', data, true)
}
// 新增无需签到人员列表
export const addSignGroupNotUserApi = (data) => {
  return request('post', '/statistics/signGroupNotUser/addSignGroupNotUser', data, true)
}
// 根据班级编号查询学生信息
export const findByClassNumsApi = (data) => {
  return request('get', `/user/studentInfo/findByClassNums?${data}`)
}
// 根据groupId获取班级
export const listSignGroupClassApi = (data) => {
  return request('post', '/statistics/signGroupClass/listSignGroupClass', data, true)
}
// 新增签到组必须签到时间
export const addSignGroupNeedDayApi = (data) => {
  return request('post', '/statistics/signGroupNeedDay/addSignGroupNeedDay', data, true)
}
// 获取签到组必须签到时间列表
export const listSignGroupNeedDayApi = (data) => {
  return request('post', '/statistics/signGroupNeedDay/listSignGroupNeedDay', data, true)
}
// 获取无需签到人员
export const listSignGroupNotUserApi = (data) => {
  return request('post', '/statistics/signGroupNotUser/listSignGroupNotUser', data, true)
}
// 删除无需签到人员列表
export const delSignGroupNotUserApi = (data) => {
  return request('post', '/statistics/signGroupNotUser/delSignGroupNotUser', data, true)
}
// 删除签到组必须签到时间
export const delSignGroupNeedDayApi = (data) => {
  return request('post', '/statistics/signGroupNeedDay/delSignGroupNeedDay', data, true)
}
// 修改签到组
export const updateSignGroupApi = (data) => {
  return request('post', '/statistics/signGroup/updateSignGroup', data, true)
}
// 查询老师信息列表(包含老师的头像地址)
export const listTeacherInfoVOApi = (data) => {
  return request('post', '/user/teacherInfo/listTeacherInfoVO', data, true)
}
// 修改签到组必须签到时间
export const updateSignGroupNeedDayApi = (data) => {
  return request('post', '/statistics/signGroupNeedDay/updateSignGroupNeedDay', data, true)
}
// 设置消息领导
export const addLeaderApi = (data) => {
  return request('post', '/statistics/signGroup/addLeader', data, true)
}
// 获取未被走读签到组绑定的班级
export const getUnChooseClassApi = (data) => {
  return request('post', '/statistics/signGroupClass/getUnChooseClass', data, true)
}
// 多条件多表查询学生信息
export const listStudentInfoVOWithManyConditionApi = (data) => {
  return request('post', '/user/studentInfo/listStudentInfoVOWithManyCondition', data, true)
}
