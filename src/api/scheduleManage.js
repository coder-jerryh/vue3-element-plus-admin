import request from '../utils/request'
// 添加排课信息
export const addSchedulePlanApi = (data) => {
  return request('post', '/schedule/termPlan/addTermPlan', data, true)
}
// 排课信息列表
export const getSchedulePlanListApi = (data) => {
  return request('get', `/schedule/termPlan/termPlanPage?${data}`)
}
// 删除排课信息
export const delSchedulePlanApi = (data) => {
  return request('post', `/schedule/termPlan/deleteTermPlan?${data}`)
}
// 更新排课信息
export const updateSchedulePlanApi = (data) => {
  return request('post', '/schedule/termPlan/editTermPlan', data, true)
}
// 启用排课信息
export const openSchedulePlanApi = (data) => {
  return request('post', `/schedule/termPlan/enableTermPlan?${data}`)
}
// 禁用排课信息
export const closeSchedulePlanApi = (data) => {
  return request('post', `/schedule/termPlan/disableTermPlan?${data}`)
}

// 添加课程信息
export const addCourseNameApi = (data) => {
  return request('post', '/schedule/scheduleCourse/addScheduleCourse', data, true)
}
// 课程信息列表
export const getCourseNameListApi = (data) => {
  return request('get', `/schedule/scheduleCourse/getScheduleCoursePage?${data}`)
}
// 删除课程信息
export const delCourseNameApi = (data) => {
  return request('post', `/schedule/scheduleCourse/delScheduleCourse?${data}`)
}
// 更新课程信息
export const updateCourseNameApi = (data) => {
  return request('post', '/schedule/scheduleCourse/editScheduleCourse', data, true)
}

// 添加课程信息
export const addScheduleApi = (data) => {
  return request('post', '/schedule/scheduleInfo/addSchedule', data, true)
}
// 课程信息列表
export const getScheduleListApi = (data) => {
  return request('get', `/schedule/scheduleInfo/getSchedulePage?${data}`)
}
// 删除课程信息
export const delScheduleApi = (data) => {
  return request('post', `/schedule/scheduleInfo/delScheduleInfo?${data}`)
}
// 更新课程信息
export const updateScheduleApi = (data) => {
  return request('post', '/schedule/scheduleInfo/editSchedule', data, true)
}

// 保存课表配置
export const saveScheduleSetApi = (data) => {
  return request('post', '/schedule/scheduleConfig/saveScheduleConfig', data)
}
// 课表配置列表
export const getScheduleSetApi = (data) => {
  return request('get', `/schedule/scheduleConfig/scheduleConfigPage?${data}`)
}
// 删除课表配置
export const delScheduleSetApi = (data) => {
  return request('post', `/schedule/scheduleConfig/delScheduleConfig?${data}`)
}
// 更新课表配置
export const updateScheduleSetApi = (data) => {
  return request('post', '/schedule/scheduleConfig/editScheduleConfig', data, true)
}

// 课表班级配置列表
export const getScheduleClassSetListApi = (data) => {
  return request('get', `/schedule/classConfig/scheduleClassPage?${data}`)
}
// 课表班级配置列表
export const getNoSetClassListApi = (data) => {
  return request('get', `/schedule/classConfig/getNotConfiguredClassListByTermPlan?${data}`)
}
// 删除课表班级配置
export const delScheduleClassSetApi = (data) => {
  return request('post', '/schedule/classConfig/delScheduleClass', data, true)
}
// 保存课表班级配置
export const saveScheduleClassSetApi = (data) => {
  return request('post', '/schedule/classConfig/addScheduleClass', data, true)
}
// 导出课表
export const exportScheduleApi = (data) => {
  return request('get', `/schedule/scheduleConfig/getScheduleConfigByExcel?${data}`, {}, false, 'exportFile')
}

// ---------- 兴趣班 ----------
// 添加兴趣分组
export const addInterestGroupApi = (data) => {
  return request('post', '/robclass/choiceCourseGroup/addChoiceCourseGroup', data, true)
}
// 兴趣分组列表
export const getInterestGroupListApi = (data) => {
  return request('get', `/robclass/choiceCourseGroup/listChoiceCourseGroup?${data}`)
}
// 获取提示语
export const getRobClassTipApi = (data) => {
  return request('get', `/user/schoolInfo/getRobClassTip?${data}`)
}
// 更新提示语
export const setRobClassTipApi = (data) => {
  return request('post', '/user/schoolInfo/setRobClassTip', data, true)
}
// 删除兴趣分组
export const delInterestGroupApi = (data) => {
  return request('get', `/robclass/choiceCourseGroup/deleteChoiceCourseGroupById?${data}`)
}
// 更新兴趣分组
export const updateInterestGroupApi = (data) => {
  return request('post', '/robclass/choiceCourseGroup/updateChoiceCourseGroup', data, true)
}
// 设置分组状态
export const setInterestGroupStateApi = (data) => {
  return request('post', '/robclass/choiceCourseGroup/setChoiceCourseGroupState', data, true)
}
// 检查是否可以导出
export const checkExportFlagApi = (data) => {
  return request('get', `/robclass/interestClass/checkBeforeExportExcel?${data}`)
}
// 导出结果
export const exportInterClassResultApi = (data) => {
  return request('get', `/robclass/interestClass/exportRobClassResultExcel?${data}`, {}, false, 'exportFile')
}
// 导出汇总结果
export const exportSumInterClassResultApi = (data) => {
  return request('get', `/robclass/interestClass/exportSumRobClassResultExcel?${data}`, {}, false, 'exportFile')
}
// 添加兴趣班
export const addInterestClassApi = (data) => {
  return request('post', '/robclass/interestClass/addInterestClass', data, true)
}
// 兴趣班列表
export const getInterestClassListApi = (data) => {
  return request('get', `/robclass/interestClass/listInterestClass?${data}`)
}
// 删除兴趣班
export const delInterestClassApi = (data) => {
  return request('get', `/robclass/interestClass/deleteInterestClassById?${data}`)
}
// 更新兴趣班
export const updateInterestClassApi = (data) => {
  return request('post', '/robclass/interestClass/updateInterestClass', data, true)
}
// 抢课结果
export const readInterestReaultApi = (data) => {
  return request('get', `/robclass/interestClass/listRobClassResult?${data}`)
}
// 根据兴趣班id查询兴趣班绑定的班级
export const getInterestBindClassApi = (data) => {
  return request('get', `/robclass/interestClass/listClassByInterestClassId?${data}`)
}
// 解绑兴趣班和班级
export const cancelBindInterestClassApi = (data) => {
  return request('post', '/robclass/interestClass/unbindClass', data, true)
}
// 绑定兴趣班和班级
export const bindInterestClassApi = (data) => {
  return request('post', '/robclass/interestClass/bindClass', data, true)
}
// ---------------------课时设置-------------------------
// 查询课表作息时间配置信息列表
export const getScheduleTimeInfoPageApi = (data) => {
  return request('get', `/schedule/scheduleTimeInfo/getScheduleTimeInfoPage?${data}`)
}
// 删除课表作息时间配置信息
export const removeScheduleTimeInfoApi = (data) => {
  return request('post', '/schedule/scheduleTimeInfo/removeScheduleTimeInfo', data, true)
}
// 添加或修改课表作息时间配置信息
export const saveOrUpdateScheduleTimeInfoApi = (data) => {
  return request('post', '/schedule/scheduleTimeInfo/saveOrUpdateScheduleTimeInfo', data)
}
// 课表课节时间配置
export const configScheduleTimeApi = (data) => {
  return request('post', '/schedule/scheduleTime/configScheduleTime', data)
}
// 获取课表课节时间配置
export const getScheduleTimeListApi = (data) => {
  return request('get', `/schedule/scheduleTime/getScheduleTimeByScheduleInfoId?${data}`)
}
// 查询作息时间信息及其配置
export const getScheduleTimeInfoDTOByIdApi = (data) => {
  return request('get', `/schedule/scheduleTimeInfo/getScheduleTimeInfoDTOById?${data}`)
}
