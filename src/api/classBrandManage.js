import request from '../utils/request'
// 配置希沃学校关联
export const configSeewoSchoolInfoApi = (data) => {
  return request('post', '/classcard/schoolInfoSeewo/configSeewoSchoolInfo', data, true)
}
// 获取希沃学校关联列表
export const getClassBrandSchoolListApi = (data) => {
  return request('get', `/classcard/schoolInfoSeewo/getSchoolInfoSeewoPage?${data}`)
}
// 按学校或班级绑定学生一卡通111
export const bindStudentCardsApi = (data) => {
  return request('post', '/classcard/cardInfo/bindStudentCards', data, true)
}
// 绑定当前学校老师一卡通
export const bindTeacherCardsApi = (data) => {
  return request('post', '/classcard/cardInfo/bindTeacherCards', data, true)
}
// 按学校或班级同步学生家长
export const synchronousStudentCustomerApi = (data) => {
  return request('post', '/classcard/studentInfo/synchronousStudentCustomer', data, true)
}
// 按学校或班级同步学生数据
export const synchronousStudentInfoApi = (data) => {
  return request('post', '/classcard/studentInfo/synchronousStudentInfo', data, true)
}
// 同步当前学校新闻
export const synchronousNewsApi = (data) => {
  return request('post', '/classcard/newsInfo/synchronousNews', data, true)
}
// 按学校或班级同步班级班主任
export const synchronousClassAdviserApi = (data) => {
  return request('post', '/classcard/classInfo/synchronousClassAdviser', data, true)
}
// 按学校或班级同步班级数据
export const synchronousClassInfoApi = (data) => {
  return request('get', `/classcard/classInfo/synchronousClassInfo?${data}`)
}
// 同步学校老师数据
export const synchronousTeacherInfoApi = (data) => {
  return request('get', `/classcard/teacherInfo/synchronousTeacherInfo?${data}`)
}
// 同步学校课表计划
export const enableTermPlanApi = (data) => {
  return request('post', '/classcard/timeTableInfo/saveAllRoomExistClassTimetable', data, true)
}
// 同步当前班级学期排课计划课表详情
export const saveRoomExistClassTimetableApi = (data) => {
  return request('post', '/classcard/timeTableInfo/saveRoomExistClassTimetable', data, true)
}
// 同步当前学校学期排课计划
export const saveTermPlanApi = (data) => {
  return request('post', '/classcard/timeTableInfo/saveTermPlan', data, true)
}
// 通过学校或班级进行班级场地绑定
export const addRelationsApi = (data) => {
  return request('post', '/classcard/buildingInfo/addRelations', data, true)
}
// 同步学校场地
export const saveBuildingRoomApi = (data) => {
  return request('post', '/classcard/buildingInfo/saveBuildingRoom', data, true)
}
// 同步学校建筑
export const saveBuildingsApi = (data) => {
  return request('post', '/classcard/buildingInfo/saveBuildings', data, true)
}
// 同步教师头像信息
export const synchronousTeacherPhotosApi = (data) => {
  return request('post', '/classcard/photoInfo/synchronousTeacherPhotos', data, true)
}
// 同步学生头像信息
export const synchronousStudentPhotosApi = (data) => {
  return request('post', '/classcard/photoInfo/synchronousStudentPhotos', data, true)
}
// 删除希沃学校关联
export const removeSeewoSchoolInfoApi = (data) => {
  return request('post', '/classcard/schoolInfoSeewo/removeSeewoSchoolInfo', data, true)
}
// ---------- 设备管理 ----------
// 获取班牌设备信息列表
export const getDeviceManagementPageApi = (data) => {
  return request('get', `/classcard/deviceManagement/getDeviceManagementPage?${data}`)
}
// 同步学校班牌设备信息
export const synchronousDeviceInfoApi = (data) => {
  return request('post', '/classcard/deviceManagement/synchronousDeviceInfo', data, true)
}
// 删除待删除的设备
export const deleteDeviceApi = (data) => {
  return request('post', '/classcard/deviceManagement/deleteDevice', data, true)
}

// ---------- 开关机计划 ----------
// 获取开关机计划列表
export const getPowerPlanPageApi = (data) => {
  return request('get', `/classcard/powerPlan/getPowerPlanPage?${data}`)
}
// 删除开关机计划
export const removePowerPlanApi = (data) => {
  return request('post', '/classcard/powerPlan/removePowerPlan', data, true)
}
// 添加开关机计划
export const savePowerPlanApi = (data) => {
  return request('post', '/classcard/powerPlan/savePowerPlan', data)
}
// 修改开关机计划
export const editPowerPlanApi = (data) => {
  return request('post', '/classcard/powerPlan/editPowerPlan', data)
}
// 查询该开关机计划及其配置
export const getPowerPlanAndConfigApi = (data) => {
  return request('get', `/classcard/powerPlan/getPowerPlanAndConfig?${data}`)
}
// 获取未配置开关机计划的设备列表
export const getNoConfigDeviceListApi = (data) => {
  return request('get', `/classcard/powerPlan/getNoConfigDeviceList?${data}`)
}
// 获取配置了当前开关机计划的设备列表
export const getConfigThisPowerPlanDeviceListApi = (data) => {
  return request('get', `/classcard/powerPlan/getConfigThisPowerPlanDeviceList?${data}`)
}
// 保存并应用设备开关机计划
export const configureDeviceAndIssueApi = (data) => {
  return request('post', '/classcard/powerPlan/configureDeviceAndIssue', data)
}
// 清除设备应用的开关机计划
export const cancelConfigureDeviceApi = (data) => {
  return request('post', '/classcard/powerPlan/cancelConfigureDevice', data)
}

// ---------- 同步信息查询 ----------
// 获取同步的班级信息
export const getClassInfoSeewoPageApi = (data) => {
  return request('get', `/classcard/classInfoSeewo/getClassInfoSeewoPage?${data}`)
}
// 删除同步的班级信息
export const deleteClassInfoSeewoApi = (data) => {
  return request('post', '/classcard/classInfoSeewo/deleteClassInfoSeewo', data)
}
// 获取同步的老师信息
export const getTeacherInfoSeewoPageApi = (data) => {
  return request('get', `/classcard/teacherInfoSeewo/getTeacherInfoSeewoPage?${data}`)
}
// 删除同步的老师信息
export const deleteTeacherInfoSeewoApi = (data) => {
  return request('post', '/classcard/teacherInfoSeewo/deleteTeacherInfoSeewo', data)
}
// 获取同步的学生信息
export const getStudentInfoSeewoPageApi = (data) => {
  return request('get', `/classcard/studentInfoSeewo/getStudentInfoSeewoPage?${data}`)
}
// 删除同步的学生信息
export const deleteStudentInfoSeewoApi = (data) => {
  return request('post', '/classcard/studentInfoSeewo/deleteStudentInfoSeewo', data)
}
// 获取同步的一卡通信息
export const getCardInfoSeewoPageApi = (data) => {
  return request('get', `/classcard/cardInfoSeewo/getCardInfoSeewoPage?${data}`)
}
// 删除同步的一卡通信息
export const deleteCardInfoSeeeApi = (data) => {
  return request('post', '/classcard/cardInfoSeewo/deleteCardInfoSeee', data)
}
// 获取同步的建筑信息
export const getBuildingInfoSeewoPageApi = (data) => {
  return request('get', `/classcard/buildingInfoSeewo/getBuildingInfoSeewoPage?${data}`)
}
// 删除同步的建筑信息
export const deleteBuildingInfoSeewoApi = (data) => {
  return request('post', '/classcard/buildingInfoSeewo/deleteBuildingInfoSeewo', data, true)
}
// 获取同步的建筑下的场地信息
export const getBuildingRoomInfoSeewoPageApi = (data) => {
  return request('get', `/classcard/buildingRoomInfoSeewo/getBuildingRoomInfoSeewoPage?${data}`)
}
// 删除同步的场地信息
export const deleteBuildingRoomInfoSeewoApi = (data) => {
  return request('post', '/classcard/buildingRoomInfoSeewo/deleteBuildingRoomInfoSeewo', data)
}

// ---------- 图片发布 ----------
// 查询发布的图片
export const getPicInfoSeewoPageApi = (data) => {
  return request('get', `/classcard/picInfoSeewo/getPicInfoSeewoPage?${data}`)
}
// 删除班牌图片
export const deletePicsApi = (data) => {
  return request('post', '/classcard/picInfoSeewo/deletePics', data)
}
// 发布班牌图片
export const releasePicsApi = (data) => {
  return request('post', '/classcard/picInfoSeewo/releasePics', data)
}
