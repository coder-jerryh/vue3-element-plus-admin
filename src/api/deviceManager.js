import request from '../utils/request'
const TreatyTypes = {
  1: 'ehome',
  2: 'yunMou'
}
// ---------- 签到服务api -----------------------------------------------------------------

// -----------软件信息api -----------------------------------------------------------------
// 软件信息列表
export const getsoftwareInfoListApi = (data) => {
  return request('post', `/device/softwareInfo/list?${data}`)
}
// 添加软件
export const addSoftwareInfoApi = (data) => {
  return request('post', '/device/softwareInfo/add', data, true)
}
// 修改软件
export const updateSoftwareInfoApi = (data) => {
  return request('put', '/device/softwareInfo/update', data, true)
}
// 删除软件
export const delSoftwareInfoApi = (data) => {
  return request('delete', `/device/softwareInfo/deleted/${data}`)
}

// -----------软件学校配置api -------------------------------------------------------------
// 查询当前软件已配置的学校信息
export const getSoftwareSchoolApi = (data) => {
  return request('get', `/device/softwareSchool/list?${data}`)
}
// 查询当前软件可配置的学校信息
export const getAddSoftwareSchoolApi = (data) => {
  return request('post', `/device/softwareSchool/addList?${data}`)
}
// 配置学校
export const configureSoftwareSchoolApi = (data) => {
  return request('post', '/device/softwareSchool/configure', data, true)
}
// 取消配置学校
export const cancelConfigureSoftwareSchoolApi = (data) => {
  return request('post', `/device/softwareSchool/cancelConfigure?${data}`)
}
// 查询其他软件已配置了学校
export const getConfiguredSoftwareSchoolApi = (data) => {
  return request('post', `/device/softwareSchool/configuredList/${data}`)
}

// ----------- 设备信息api -------------------------------------------------------------
// 查询当前学校的设备信息列表
export const getDeviceInfoListApi = (data) => {
  return request('post', `/device/deviceInfo/list?${data}`)
}
// 添加设备信息
export const addDeviceInfoApi = (data) => {
  return request('post', `/device/deviceInfo/${TreatyTypes[data.treatyType]}Save`, data)
}
// 修改设备信息
export const updateDeviceInfoApi = (data) => {
  return request('put', `/device/deviceInfo/${TreatyTypes[data.treatyType]}Update`, data)
}
// 删除设备信息
export const delDeviceInfoApi = (data, treatyType) => {
  return request('post', `/device/deviceInfo/${TreatyTypes[treatyType]}Deleted`, data, true)
}
// 下发控制命令
export const controlDoorStateApi = (data, treatyType) => {
  return request('post', `/device/deviceInfo/${TreatyTypes[treatyType]}ControlDoor?${data}`)
}
// 下发控制命令
export const getDeviceUserInfoApi = (data) => {
  return request('get', `/device/deviceInfo/getUserByEmpNo?${data}`)
}

// ----------- 门信息api ---------------------------------------------------------------
// 查询门信息列表
export const getDoorInfoListApi = (data) => {
  return request('get', `/device/doorInfo/get/${data}`)
}
// 添加门信息
export const addDoorInfoApi = (data) => {
  return request('post', '/device/doorInfo/add', data)
}
// 修改门信息
export const updateDoorInfoApi = (data) => {
  return request('put', '/device/doorInfo/update', data)
}
// 查询门数量
export const getDoorInfoCountApi = (data) => {
  return request('get', `/device/doorInfo/count/${data}`)
}

// ----------- 刷卡器api -------------------------------------------------------------
// 查询刷卡器信息列表
export const getCardReadInfoListApi = (data) => {
  return request('get', `/device/cardReadInfo/get/${data}`)
}
// 添加或修改刷卡器信息
export const handleCardReadInfoApi = (data) => {
  return request('post', '/device/cardReadInfo/addOrUpdate', data)
}
// 删除刷卡器信息
export const deleteCardReadInfoApi = (data) => {
  return request('delete', `/device/cardReadInfo/deleted/${data}`)
}

// ----------- 摄像头api -------------------------------------------------------------
// 查询摄像头信息列表
export const getCaptureCameraListApi = (data) => {
  return request('get', `/device/captureCamera/get/${data}`)
}
// 添加或修改摄像头信息
export const handleCaptureCameraApi = (data) => {
  return request('post', '/device/captureCamera/addOrUpdate', data)
}
// 删除摄像头信息
export const deleteCaptureCameraApi = (data) => {
  return request('delete', `/device/captureCamera/deleted/${data}`)
}

// ----------- 设备日志api -------------------------------------------------------------
// 查询摄像头信息列表
export const getDeviceLogListApi = (data) => {
  return request('post', `/device/deviceLog/list?${data}`)
}
// 查询日志详情
export const getDeviceLogContentApi = (data) => {
  return request('get', `/device/deviceLog/get/${data}`)
}

// ----------- 计划模板api -------------------------------------------------------------
// 查询计划模板列表
export const getPlanTemplateInfoListApi = (data) => {
  return request('post', '/device/planTemplateInfo/list', data, true)
}
// 保存计划模板
export const savePlanTemplateInfoApi = (data) => {
  return request('post', '/device/planTemplateInfo/save', data, true)
}
// 修改计划模板
export const updatePlanTemplateInfoApi = (data) => {
  return request('put', '/device/planTemplateInfo/update', data, true)
}
// 启用或冻结计划模板
export const updateStatePlanTemplateInfoApi = (data) => {
  return request('put', '/device/planTemplateInfo/updateState', data, true)
}
// 根据id查询模板列表
export const getPlanTemplateInfoApi = (data) => {
  return request('get', `/device/planTemplateInfo/get/${data}`)
}
// 下发计划模板
export const writePlanTemplateInfoApi = (data) => {
  return request('post', `/device/planTemplateInfo/${TreatyTypes[data.treatyType]}WritePlanTemplate`, data, true)
}
// 下发计划模板组
export const yunMouWritePlanGroupApi = (treatyType, data) => {
  return request('post', `/device/planGroup/${TreatyTypes[treatyType]}WritePlanGroup`, data, true)
}
// 获取已绑定的设备列表
export const getBindingDeviceListApi = (data) => {
  return request('get', `/device/planDeviceConfig/getBindingDeviceList?${data}`)
}
// 绑定设备
export const bindingDeviceApi = (data) => {
  return request('post', '/device/planDeviceConfig/binding', data, true)
}
// 解绑设备
export const unBindingDeviceApi = (data) => {
  return request('post', '/device/planDeviceConfig/unBinding', data, true)
}
// 添加计划模板组
export const addPlanGroupApi = (data) => {
  return request('post', '/device/planGroup/insert', data, true)
}
// 修改计划模板组
export const updatePlanGroupApi = (data) => {
  return request('post', '/device/planGroup/update', data, true)
}
// 查询计划模板组列表
export const getPlanGrouplistApi = (data) => {
  return request('get', `/device/planGroup/list?${data}`)
}
// 查询计划模板组下的计划模板
export const planTemplateInfoListApi = (data) => {
  return request('get', `/device/planGroupTemplateConfig/planTemplateInfoList?${data}`)
}
// 配置计划模板
export const configPlanApi = (data) => {
  return request('post', '/device/planGroupTemplateConfig/configPlan', data, true)
}
// ----------- 告警信息api -------------------------------------------------------------
// 查询计划模板列表
export const getWarningInfoListApi = (data) => {
  return request('post', `/device/warningInfo/list?${data}`)
}
// 查询所有计划模板列表
export const getAllWarningInfoListApi = (data) => {
  return request('post', `/device/warningInfo/getSchoolWarningInfoList?${data}`)
}

// ----------- 权限组api ---------------------------------------------------------------
// 查询权限组列表
export const getVisitRoleGroupListApi = (data) => {
  return request('post', `/device/visitRoleGroup/pageList?${data}`)
}
// 添加权限组
export const addVisitRoleGroupApi = (data) => {
  return request('post', '/device/visitRoleGroup/save', data)
}
// 修改权限组
export const updateVisitRoleGroupApi = (data) => {
  return request('put', '/device/visitRoleGroup/update', data)
}
// 删除权限组
export const deleteVisitRoleGroupApi = (data) => {
  return request('delete', `/device/visitRoleGroup/deleted?${data}`)
}
// 查询单个权限组
export const getVisitRoleGroupApi = (data) => {
  return request('get', `/device/visitRoleGroup/get/${data}`)
}
// 多条件查询权限组
export const getVisitRoleGroupByConditionApi = (data) => {
  return request('get', `/device/visitRoleGroup/getByCondition?${data}`)
}
// ----------- 权限组用户api -----------------------------------------------------------
// 导出权限组用户列表
export const exportVisitRoleGroupUserListApi = (data) => {
  return request('get', `/device/visitRoleGroupUser/getVisitRoleGroupUserExcelByGroupId?${data}`, {}, false, 'exportFile')
}
// 查询权限组用户列表
export const getVisitRoleGroupUserListApi = (data) => {
  return request('post', `/device/visitRoleGroupUser/userList?${data}`)
}
// 下发单个人员
export const writeVisitRoleGroupUserApi = (data) => {
  return request('post', `/device/visitRoleGroupUser/writeOneStudent?${data}`)
}
// 删除单个人员
export const delVisitRoleGroupUserApi = (data) => {
  return request('post', `/device/visitRoleGroupUser/deleteVisitRoleGroupUser?${data}`)
}
// 下发选中或全部下发用户信息
export const writeCheckVisitRoleGroupUserApi = (data) => {
  return request('post', '/device/visitRoleGroupUser/batchWriteStudent', data, true)
}
// 删除选中或删除全部用户信息
export const batchDelVisitRoleGroupUserApi = (data) => {
  return request('post', '/device/visitRoleGroupUser/batchDeleteVisitRoleGroupUser', data, true)
}
// 查询可添加至权限组用户的列表
export const getAddVisitRoleGroupUserListApi = (data) => {
  return request('post', '/device/visitRoleGroupUser/userAddList', data, true)
}
// 添加权限组用户
export const addVisitRoleGroupUserListApi = (data) => {
  return request('post', '/device/visitRoleGroupUser/addVisitRoleGroupUser', data)
}
// 一键添加权限组用户
export const addAllVisitRoleGroupUserListApi = (data) => {
  return request('post', `/device/visitRoleGroupUser/addAllVisitRoleGroupUser?${data}`)
}
// ----------- 签到事件api -----------------------------------------------------------
// 查询权限组用户列表
export const getEventInfoListApi = (data) => {
  return request('get', `/device/eventInfo/selectEventInfoList?${data}`)
}
// 查询权限组异常日志列表
export const getEventLogListApi = (data) => {
  return request('post', '/device/eventLog/list', data, true)
}
// 批量处理无效事件
export const handleInvalidEventApi = (data) => {
  return request('post', '/device/eventInfo/handleInvalidEvent', data, true)
}
// 批量处理异常日志事件
export const batchHandleStudentEventApi = (data) => {
  return request('post', '/device/eventLog/batchHandleStudentEvent', data, true)
}
// 获取考勤本地列表
export const getAccessEventListApi = (data) => {
  return request('get', `/device/eventInfo/getAccessEventList?${data}`)
}
// 获取每日签到
export const getDailyCreditCardPushRecordApi = (data) => {
  return request('get', `/statistics/studentSignStatistics/getDailyCreditCardPushRecord?${data}`)
}
// 查询学生签到列表详情
export const getCreditCardListInfoApi = (data) => {
  return request('get', `/device/eventInfo/getCreditCardListInfo?${data}`)
}
// 查询事件照片
export const getEventPgetictureApi = (data) => {
  return request('get', `/device/eventInfo/selectEventPicture?${data}`)
}
// 查询推送记录
export const getEventMessageListApi = (data) => {
  return request('get', `/device/eventMessage/list?${data}`)
}
// 学校班级考勤统计
export const getSchoolClassStatisticsApi = (data) => {
  return request('get', `/statistics/studentSignStatistics/getSchoolClassStatistics?${data}`)
}
// 获取班级考勤列表详情
export const getClassAttendanceListInfoApi = (data) => {
  return request('get', `/statistics/studentSignStatistics/getClassAttendanceListInfo?${data}`)
}
// 获取教师每日签到列表
export const getTeacherDailySignInListApi = (data) => {
  return request('get', `/statistics/teacherSignStatistics/getTeacherSignInList?${data}`)
}
// 获取教师每月签到列表
export const getTeacherMonthSignInListApi = (data) => {
  return request('get', `/statistics/teacherSignStatistics/getTeacherMonthSignInList?${data}`)
}
// ----------- 体温统计api -----------------------------------------------------------
// 查询体温统计列表
export const getTemperatureStatApi = (type, data) => {
  return request('post', `/device/eventInfo/temperatureStatisticsBy${type}`, data, true)
}
// 导出体温列表
export const exportTemperatureStatApi = (data) => {
  return request('post', '/device/eventInfo/exportTemperatureBySchool', data, true, 'exportFile')
}
// 查询体温统计列表
export const getTemperatureTestListApi = (data) => {
  return request('post', '/device/eventInfo/geTestList', data, true)
}
// -----------刷卡统计api -----------------------------------------------------------
// 查询体温统计列表
export const getSwipingCardStatApi = (data) => {
  return request('get', `/device/eventInfo/selectEventStatistics?${data}`)
}
// 查询签到推送率
export const getSignInAndPushDataApi = (data) => {
  return request('get', `/device/eventInfo/signInAndPushRate?${data}`)
}
// -----------任务结果api -----------------------------------------------------------
// 查询体温统计列表
export const getSendStateApi = (data) => {
  return request('post', '/device/deviceUser/getList', data, true)
}
// -----------同步下发状态api -----------------------------------------------------------
export const syncSendStateApi = (data) => {
  return request('post', '/device/visitRoleGroupUser/syncState', data, true)
}
// -----------查询状态码api -----------------------------------------------------------
export const getSendResultTaskIdApi = (data) => {
  return request('get', `/device/deviceUser/getTaskIds?${data}`)
}
// -----------查询设备人员详情api -----------------------------------------------------------
export const getDeviceUserDetailApi = (data) => {
  return request('post', '/device/deviceUser/getDeviceUserBySerial', data, true)
}
// -----------同步设备状态api -----------------------------------------------------------
export const synchronizationDeviceStateApi = (data) => {
  return request('post', '/device/deviceInfo/synchronizationDeviceState', data, true)
}
// -----------查询学生类型api -----------------------------------------------------------
export const getStudentTypeListApi = (data) => {
  return request('post', '/user/studentTypeInfo/listStudentTypeInfoVO', data, true)
}
// -----------同步下发数据pi -----------------------------------------------------------
export const syncResultDataApi = (data) => {
  return request('post', '/device/deviceUser/syncTaskResult', data, true)
}
// -----------导出设备人员数据api -----------------------------------------------------------
export const exportDeviceUserApi = (data) => {
  return request('post', '/device/deviceUser/export', data, true, 'exportFile')
}
// -----------设备校时api -----------------------------------------------------------
export const deviceTimingApi = (data) => {
  return request('post', '/device/deviceInfo/deviceTimingConfig', data, true)
}
// -----------下发失败人员到失败设备api -----------------------------------------------------------
export const writeFailUserApi = (data) => {
  return request('post', '/device/deviceUser//writeFailUser', data, true)
}
// -----------重置权限组数据api -----------------------------------------------------------
export const resetVisitGroupDataApi = (data) => {
  return request('post', '/device/visitRoleGroupUser/resetVisitGroup', data, true)
}

// -----------告警摄像头api -----------------------------------------------------------
export const getAlarmCameraListApi = (data) => {
  return request('get', `/device/alarmCamera/list?${data}`, data)
}
export const insertAlarmCameraApi = (data) => {
  return request('post', '/device/alarmCamera/insert', data)
}
export const updateAlarmCameraApi = (data) => {
  return request('post', '/device/alarmCamera/update', data)
}
export const deleteAlarmCameraApi = (data) => {
  return request('post', '/device/alarmCamera/delete', data, true)
}
export const syncAlarmStateApi = (data) => {
  return request('post', '/device/alarmCamera/synchronizationDeviceState', data, true)
}
export const timingAlarmConfigApi = (data) => {
  return request('post', '/device/alarmCamera/deviceTimingConfig', data, true)
}
export const defenceConfigApi = (data) => {
  return request('post', '/device/alarmCamera/setDefence', data, true)
}
// -----------告警事件api -----------------------------------------------------------
export const getAlarmEventListApi = (data) => {
  return request('post', '/device/alarmEventInfo/list', data, true)
}
export const getAlarmPictureListApi = (data) => {
  return request('get', `/device/alarmPictureInfo/getList/${data}`)
}
// -----------云眸权限组api -----------------------------------------------------------
export const getEquipmentGroupListApi = (data) => {
  return request('post', '/device/equipmentGroup/page', data, true)
}
export const insertEquipmentGroupApi = (data) => {
  return request('post', '/device/equipmentGroup/addEquipmentGroup', data, true)
}
export const updateEquipmentGroupApi = (data) => {
  return request('post', '/device/equipmentGroup/updateEquipmentGroupName', data, true)
}
export const deleteEquipmentGroupApi = (data) => {
  return request('delete', '/device/equipmentGroup/deleteEquipmentGroup', data, true)
}
export const addDeviceToGroupApi = (data) => {
  return request('post', '/device/equipmentGroup/addDevice', data, true)
}
export const getGroupDeviceListApi = (data) => {
  return request('post', '/device/equipmentGroup/pageDevice', data, true)
}
export const delDeviceToGroupApi = (data) => {
  return request('delete', '/device/equipmentGroup/removeDevice', data, true)
}
// -----------门禁组件权限组接口api -----------------------------------------------------------
export const getAddAccessUserListApi = (data) => {
  return request('post', '/device/visitRoleGroupUserAccess/userAddList', data, true)
}
export const exportAddAccessUserListApi = (data) => {
  return request('get', `/device/visitRoleGroupUserAccess/getAddVisitRoleGroupUserByExcel?${data}`, {}, false, 'exportFile')
}
export const addAccessVisitRoleUserListApi = (data) => {
  return request('post', '/device/visitRoleGroupUserAccess/addVisitRoleGroupUser', data, true)
}
export const addAllAddAccessUserListApi = (data) => {
  return request('post', '/device/visitRoleGroupUserAccess/addAllVisitRoleGroupUser', data, true)
}
export const delAccessUserListApi = (data) => {
  return request('delete', `/device/visitRoleGroupUserAccess/${TreatyTypes[data.treatyType]}BatchDeleteVisitRoleGroupUser`, data, true)
}
export const reRegistrationFailedApi = (data) => {
  return request('post', '/device/visitRoleGroupUserAccess/reRegistrationFailed', data, true)
}
export const getFailUserListApi = (data) => {
  return request('post', '/device/visitRoleGroupUserAccess/pagePermissionIssuance', data, true)
}
export const reissuedByGroupApi = (data) => {
  return request('post', '/device/visitRoleGroupUserAccess/reissuedByGroup', data, true)
}
export const stayInSchoolApi = (data) => {
  return request('post', '/device/visitRoleGroupUserAccess/changeVisitRoleUserStatus', data, true)
}
export const batchChangeApi = (data) => {
  return request('post', '/device/visitRoleGroupUserAccess/batchChange', data, true)
}
export const writeUserBatchApi = (data) => {
  return request('post', `/device/visitRoleGroupUserAccess/${TreatyTypes[data.treatyType]}WriteUserBatch`, data, true)
}
