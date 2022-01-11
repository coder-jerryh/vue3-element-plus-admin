import request from '../utils/request'
// 权限组
export const getVisitRoleGroupApi = (data) => {
  return request('get', `/device/visitRoleGroup/all?${data}`)
}
// 查询1当前用户可下发的权限组
export const getVisitRoleGroupByUserApi = (data) => {
  return request('get', `/device/visitRoleGroup/getByCondition?${data}`)
}
// 下发
export const downSendCardApi = (data) => {
  return request('post', '/device/visitRoleGroupUserAccess/writeUserBatch', data, true)
}
// 删除学生头像
export const delStudentPicApi = (data) => {
  return request('post', '/user/studentInfo/deleteStudentPhoto', data, true)
}
// ---------- 学校App ----------
// 添加学校应用
export const addSchoolAppApi = (data) => {
  return request('post', '/user/schoolApp/addSchoolApp', data, true)
}
// 同步指定学校应用
export const syncSchoolAppApi = (data) => {
  return request('get', `/baseuser/dingApi/synchronizedSingleDept?${data}`)
}
// 同步所有学校应用
export const syncAllSchoolAppApi = (data) => {
  return request('get', '/baseuser/dingApi/updateHmsmDept')
}
// 更新所有学校应用token
export const updateAllSchoolAppTokenApi = () => {
  return request('get', '/user/dingApi/refreshToken')
}
// 学校应用列表(不带黑马)
export const getSchoolAppListApi = (data) => {
  return request('get', `/user/schoolApp/listSchoolApp?${data}`)
}
// 列出学校应用(带黑马)
export const getAllSchoolAppListApi = (data) => {
  return request('get', `/user/schoolApp/listSchoolAppWithHmsm?${data || ''}`)
}
// 获取黑马应用
export const getHmsmAppInfoApi = (data) => {
  return request('get', `/user/schoolApp/getHmsmApp?${data || ''}`)
}
// 删除学校应用
export const delSchoolAppApi = (data) => {
  return request('get', `/user/schoolApp/deleteById?${data}`)
}
// 更新学校应用
export const updateSchoolAppApi = (data) => {
  return request('post', '/user/schoolApp/updateSchoolApp', data, true)
}
// 修改回掉地址
export const updateBackUrlApi = (data) => {
  return request('get', `/user/schoolApp/updateRegisterCallbackUrl?${data}`)
}
// 校验回掉地址
export const verifyAddressApi = () => {
  return request('get', '/user/schoolApp/checkCallbackUrl')
}
// ---------- 后勤人员类型（开始） ----------
// 添加后勤人员类型
export const addRearPersonTypeApi = (data) => {
  return request('post', '/user/rearPersonType/addRearPersonType', data, true)
}
// 根据id删除类型
export const deleteByIdApi = (data) => {
  return request('get', `/user/rearPersonType/deleteById?${data}`)
}
// 获取后勤人员类型列表
export const listRearPersonTypeVOApi = (data) => {
  return request('post', '/user/rearPersonType/listRearPersonTypeVO', data, true)
}
// 修改后勤人员类型
export const updateRearPersonTypeApi = (data) => {
  return request('post', '/user/rearPersonType/updateRearPersonType', data, true)
}
// ---------- 后勤人员类型（结束） ----------
// ---------- 审批模板 ----------
// 学校缴费模板
export const getSchoolPayModuleApi = () => {
  return request('get', '/user/schoolTemplate/listSchoolTemplateName')
}
// 添加学校应用审批模板
export const addApproveModuleApi = (data) => {
  return request('post', '/user/schoolTemplate/addSchoolTemplate', data, true)
}
// 学校应用审批模板列表
export const getApproveModuleListApi = (data) => {
  return request('get', `/user/ApproveModule/listApproveModule?${data}`)
}
// 列出学校应用审批模板
export const getAllApproveModuleListApi = (data) => {
  return request('post', `/user/schoolTemplate/listSchoolTemplate?${data}`)
}
// 删除学校应用审批模板
export const delApproveModuleApi = (data) => {
  return request('get', `/user/schoolTemplate/deleteById?${data}`)
}
// 更新学校应用审批模板
export const updateApproveModuleApi = (data) => {
  return request('post', '/user/schoolTemplate/updateSchoolTemplate', data, true)
}
// ---------- 学生信息 ----------
// 学生信息列表
export const getStudentInfoListApi = (data) => {
  return request('post', `/user/studentInfo/listStudentInfoVOWithManyCondition?${data}`)
}
// 修改学生信息
export const updateStudentInfoApi = (data) => {
  return request('post', '/user/studentInfo/updateStudentInfo', data)
}
// 根据学生编号批量查询学生信息
export const listStudentInfoVOByCardNumbersApi = (data) => {
  return request('post', '/user/studentInfo/listStudentInfoVOByCardNumbers', data, true)
}
// 获取虚拟卡号
export const getStudentVirtualCardApi = (data) => {
  return request('get', `/user/studentInfo/getStudentVirtualCard?${data}`, data)
}
// 保存学生信息
export const saveStudentInfoApi = (data) => {
  return request('post', '/user/studentInfo/setStudentInfo', data, true)
}
// 同步所有信息
export const syncAllInfoApi = (data) => {
  return request('get', `/baseuser/dingApi/synchronizationAll?${data}`)
}
// 同步学生信息
export const syncStudentInfoApi = (data) => {
  return request('get', `/baseuser/dingApi/synchronizedStudent?${data}`)
}
// 批量生成虚拟卡
export const createStudentVirtualCard = (data) => {
  return request('post', `/user/studentInfo/createBatchVirtualCard?${data}`)
}
// 删除学生卡号
export const delStudentCardNumApi = (data) => {
  return request('get', `/user/studentInfo/clearCardNo?${data}`)
}
// 批量删除学生卡号
export const delSomeStudentCardNumApi = (data) => {
  return request('post', '/user/studentInfo/clearBatchCardNo', data, true)
}
// 批量重置学生头像状态
export const resetAvatarTypeApi = (data) => {
  return request('post', '/user/studentInfo/resetBatchUploadPhotoStatus', data, true)
}
// 批量重置学生头像状态
export const setStudnetLiveTypeApi = (data) => {
  return request('post', '/user/studentInfo/updateBatchLiveType', data, true)
}
// --------------------- 家长信息 -----------------------
// 家长信息列表
export const getParentInfoListApi = (data) => {
  return request('get', `/user/customerInfo/listCustomerBySchoolNumAndClassNum?${data}`)
}
// 家长关联学生
export const parentConnectStudentApi = (data) => {
  return request('post', '/user/customerStudent/addCustomerStudent', data)
}
// 更新家长信息
export const updateParentInfoApi = (data) => {
  return request('post', '/user/customerInfo/updateCustomerInfo', data, true)
}
// 同步家长数据
export const syncParentInfoApi = (data) => {
  return request('get', `/baseuser/dingApi/synchronizedCustomer?${data}`)
}
// 查询消息接收人
export const getMsgReciverApi = (data) => {
  return request('get', `/basic/messageUser/listRecvByMessageId?${data}`)
}
// 删除家长头像
export const delParentPicApi = (data) => {
  return request('get', `/user/customerInfo/deleteCustomerPhoto?${data}`)
}
// 获取家长的虚拟卡号(根据学校前缀)
export const getVirtualCardBySchoolNumApi = (data) => {
  return request('get', `/user/customerInfo/getVirtualCardBySchoolNum?${data}`)
}
// 清空家长卡号
export const clearCardNoApi = (data) => {
  return request('get', `/user/customerInfo/clearCardNo?${data}`)
}
// 批量清空家长卡号
export const clearBatchCardNoApi = (data) => {
  return request('get', `/user/customerInfo/clearBatchCardNo?${data}`)
}
// 批量生成家长虚拟卡号(根据学校编号，前缀采用学校的前缀)
export const createParentVirtualCardApi = (data) => {
  return request('get', `/user/customerInfo/createBatchVirtualCardBySchoolNum?${data}`)
}
// --------------------- 老师信息 -----------------------
// 老师信息列表
export const getTeacherInfoListApi = (data) => {
  return request('post', `/user/teacherInfo/listTeacherInfoVO?${data}`)
}
// 同步老师数据
export const syncTeacherInfoApi = (data) => {
  return request('get', `/baseuser/dingApi/synchronizedTeacher?${data}`)
}
// 同步老师详情数据
export const syncTeacherDetailApi = (data) => {
  return request('get', `/baseuser/dingApi/synchronizedTeacherDetail?${data}`)
}
// 创建老师虚拟卡
// 保存老师卡号
export const createBatchVirtualCardApi = (data) => {
  return request('post', '/user/teacherInfo/createBatchVirtualCard?', data, true)
}
// 获取虚拟卡号
export const getTeacherVirtualCardApi = (data) => {
  return request('get', `/user/teacherInfo/getTeacherVirtualCard?${data}`, data)
}
// 保存老师信息
export const saveTeacherInfodApi = (data) => {
  return request('post', '/user/teacherInfo/setTeacherCardAndPhone', data, true)
}
// 批量生成虚拟卡
export const createTeacherVirtualCard = (data) => {
  return request('post', `/user/teacherInfo/createBatchVirtualCard?${data}`)
}
// 删除老师头像
export const delTeacherPicApi = (data) => {
  return request('post', '/user/teacherInfo/deleteTeacherPhoto', data, true)
}
// 删除老师卡号
export const delTeacherCardNumApi = (data) => {
  return request('get', `/user/teacherInfo/clearCardNo?${data}`)
}
// --------------------- 学段信息 -----------------------
export const getPhaseInfoListApi = (data) => {
  return request('get', `/user/periodInfo/listPeriodInfo?${data}`)
}
// 导出没有卡号的学生
export const exportWithoutCardStudentApi = (data) => {
  return request('get', `/user/studentInfo/exportWithoutCardStudent?${data}`, {}, false, 'exportFile')
}
// 导出没有头像的学生
export const exportWithoutPhotoStudentApi = (data) => {
  return request('get', `/user/studentInfo/exportWithoutPhotoStudent?${data}`, {}, false, 'exportFile')
}
// 导出没有学生类型的学生
export const exportWithoutTypeStudentApi = (data) => {
  return request('get', `/user/studentInfo/exportWithoutTypeStudent?${data}`, {}, false, 'exportFile')
}
// 导出所有人员
export const exportAllPeopleApi = (data) => {
  return request('get', `/user/studentInfo/exportPerson?${data}`, {}, false, 'exportFile')
}
// 导出下发失败
export const exportFailPeopleApi = (data) => {
  return request('post', '/device/visitRoleGroupUserAccess/exportWriteFail', data, true, 'exportFile')
}
export const exportNoRegisterUserApi = (data) => {
  return request('post', '/device/visitRoleGroupUserAccess/exportNoRegister', data, true, 'exportFile')
}
// 重新注册未注册人员
export const reRegisterAllFailUserApi = (data) => {
  return request('post', '/device/visitRoleGroupUserAccess/reRegisterAllFailUser', data, true)
}
// 重新下发未下发人员
export const writeAllFailUserApi = (data) => {
  return request('post', '/device/visitRoleGroupUserAccess/reWriteAllFailUser', data, true)
}
// --------------------- 年级信息 -----------------------
export const getGradeInfoListApi = (data) => {
  return request('get', `/user/gradeInfo/listGradeInfo?${data}`)
}
// --------------------- 班级信息 -----------------------
// 班级信息列表
export const getClassInfoListApi = (data) => {
  return request('post', `/user/classInfo/listClassInfoVO?${data}`)
}
// 同步班级数据
export const syncClassInfoApi = (data) => {
  return request('get', `/baseuser/dingApi/synchronizedClass?${data}`)
}
// 同步班级人员数据
export const syncClassUserInfoApi = (data) => {
  return request('get', `/baseuser/dingApi/synchronizedStudent?${data}`)
}
// 根据姓名查学生
export const searchStudentByNameApi = (data) => {
  return request('post', '/user/studentInfo/listStudentInfoVOWithDeletedState', data, true)
}
// 删除学生身份证号
export const clearStudentNoApi = (data) => {
  return request('get', `/user/studentInfo/clearStudentNo?${data}`)
}
// 修改学校信息
export const updateClassInfoApi = (data) => {
  return request('post', '/user/classInfo/updateClassInfo', data, true)
}
// 修改学校信息
export const copyTimeConfigApi = (data) => {
  return request('post', '/user/classInfo/copyTimeConfig', data, true)
}
// --------------------- 学校信息 -----------------------
// 同步学校数据
export const syncSchoolInfoApi = (data) => {
  return request('get', `/baseuser/dingApi/synchronizedSchool?${data}`)
}
// 同步人员详情
export const syncDetailApi = (data) => {
  return request('get', `/baseuser/dingApi/synchronizedCustomerInfoDetail?${data}`)
}
// 学校信息列表
export const getSchoolInfoListApi = (data) => {
  return request('get', `/user/schoolInfo/listSchoolInfoVO?${data}`)
}
// 修改学校信息
export const updateSchoolInfoApi = (data) => {
  return request('post', '/user/schoolInfo/updateSchoolInfoExcludeNull', data, true)
}
// 添加banner
export const addSchoolBannerApi = (data) => {
  return request('post', '/user/banner/addBanner', data, true)
}
// banner列表
export const getSchoolBannerListApi = (data) => {
  return request('get', `/user/banner/listBannerBySchoolNumAndCorpId?${data}`)
}
// 删除banner
export const delSchoolBannerApi = (data) => {
  return request('get', `/user/banner/deleteBannerById?${data}`)
}
// 更新banner
export const updateSchoolBannerApi = (data) => {
  return request('post', '/user/banner/updateBanner', data, true)
}
// 添加学生类别
export const addStudentTypeApi = (data) => {
  return request('post', '/user/studentTypeInfo/addStudentTypeInfo', data, true)
}
// 学生类别列表
export const getStudentTypeListApi = (data) => {
  return request('post', `/user/studentTypeInfo/listStudentTypeInfoVO?${data}`)
}
// 删除学生类别
export const delStudentTypeApi = (data) => {
  return request('get', `/user/studentTypeInfo/deleteById?${data}`)
}
// 更新学生类别
export const updateStudentTypeApi = (data) => {
  return request('post', '/user/studentTypeInfo/updateStudentTypeInfo', data, true)
}
// 添加学校简介
export const addSchoolIntroApi = (data) => {
  return request('post', '/user/schoolIntroduction/addSchoolIntroduction', data, true)
}
// 学校简介列表
export const getSchoolIntroListApi = (data) => {
  return request('post', `/user/schoolIntroduction/listSchoolIntroductionVO?${data}`)
}
// 删除学校简介
export const delSchoolIntroApi = (data) => {
  return request('get', `/user/schoolIntroduction/deleteById?${data}`)
}
// 更新学校简介
export const updateSchoolIntroApi = (data) => {
  return request('post', '/user/schoolIntroduction/updateSchoolIntroduction', data, true)
}
// 更新学校试用信息
export const updateSchoolTrialApi = (data) => {
  return request('post', '/user/schoolInfo/updateSchoolTrial', data, true)
}
// 根据学校查询菜单信息
export const getMenuBySchoolApi = (data) => {
  return request('post', '/user/menu/listMenuByCorpIdAndSchoolNum', data, true)
}
// 将学校与菜单进行绑定
export const bindMenuBySchoolApi = (data) => {
  return request('post', '/user/menu/bindMenu', data, true)
}
// 区域类型
export const getAreaApi = (data) => {
  return request('get', `/user/areaInfo/listAreaInfo?${data}`)
}
// 日志信息
export const getSchoolLogInfoApi = (data) => {
  return request('post', '/user/logInfo/listLogInfo', data, true)
}

// ------- 新闻 ---------
// 添加新闻类型
export const addSchoolNewsTypeApi = (data) => {
  return request('post', '/news/newsType/addNewsType', data, true)
}
// 新闻类型列表
export const getSchoolNewsTypeListApi = (data) => {
  return request('get', `/news/newsType/getNewsTypeList?${data}`)
}
// 删除新闻类型
export const delSchoolNewsTypeApi = (data) => {
  return request('post', `/news/newsType/delNewsType?${data}`)
}
// 更新新闻类型
export const updateSchoolNewsTypeApi = (data) => {
  return request('post', '/news/newsType/editNewsType', data, true)
}

// 添加新闻/风采
export const addSchoolNewsApi = (data) => {
  return request('post', '/news/schoolNews/addSchoolNews', data, true)
}
// 新闻/风采列表
export const getSchoolNewsListApi = (data) => {
  return request('get', `/news/schoolNews/getSchoolNewsPage?${data}`)
}
// 删除新闻/风采
export const delSchoolNewsApi = (data) => {
  return request('post', `/news/schoolNews/delSchoolNews?${data}`)
}
// 更新新闻/风采
export const updateSchoolNewsApi = (data) => {
  return request('post', '/news/schoolNews/editSchoolNews', data, true)
}
// 发布新闻/风采
export const sendSchoolNewsApi = (data) => {
  return request('post', '/news/schoolNews/releaseNews', data, true)
}

// ---------------- 学生课程 ------------------
// 添加学生课程
export const addStudentScheduleApi = (data) => {
  return request('post', '/user/studentCourse/addStudentCourse', data, true)
}
// 学生课程列表
export const getStudentScheduleListApi = (data) => {
  return request('post', '/user/studentCourse/listStudentCourseVO', data, true)
}
// 删除学生课程
export const delStudentScheduleApi = (data) => {
  return request('get', `/user/studentCourse/deleteById?${data}`)
}
// 更新学生课程
export const updateStudentScheduleApi = (data) => {
  return request('post', '/user/studentCourse/updateStudentCourse', data, true)
}

// ------- 建筑 ---------
// 添加学校建筑
export const addSchoolBuildingApi = (data) => {
  return request('post', '/user/schoolBuilding/addSchoolBuilding', data, true)
}
// 学校建筑列表
export const getSchoolBuildingListApi = (data) => {
  return request('post', '/user/schoolBuilding/listSchoolBuildingVO', data, true)
}
// 删除学校建筑
export const delSchoolBuildingApi = (data) => {
  return request('get', `/user/schoolBuilding/deleteById?${data}`)
}
// 更新学校建筑
export const updateSchoolBuildingApi = (data) => {
  return request('post', '/user/schoolBuilding/updateSchoolBuilding', data, true)
}

// ------- 场所 ---------
// 添加学校场所
export const addSchoolPlaceApi = (data) => {
  return request('post', '/user/schoolField/addSchoolField', data, true)
}
// 学校场所列表
export const getSchoolPlaceListApi = (data) => {
  return request('post', '/user/schoolField/listSchoolFieldVO', data, true)
}
// 删除学校场所
export const delSchoolPlaceApi = (data) => {
  return request('get', `/user/schoolField/deleteById?${data}`)
}
// 更新学校场所
export const updateSchoolPlaceApi = (data) => {
  return request('post', '/user/schoolField/updateSchoolField', data, true)
}

// ------- 后勤人员 ---------
// 添加后勤人员
export const addPersonnelApi = (data) => {
  return request('post', '/user/rearPerson/addRearPerson', data, true)
}
// 批量生成卡号
export const createBatchMagneticCardNumberApi = (data) => {
  return request('post', '/user/rearPerson/createBatchMagneticCardNumber', data, true)
}
// 根据后勤人员id删除后勤人员
export const deletePersonnelApi = (data) => {
  return request('get', `/user/rearPerson/deleteByJobNumber?${data}`)
}
// 批量删除后勤人员
export const deleteBatchRearPersonApi = (data) => {
  return request('post', '/user/rearPerson/deleteBatchRearPerson', data, true)
}
// 获取后勤人员列表
export const listPersonnelVOApi = (data) => {
  return request('post', '/user/rearPerson/listRearPersonVO', data, true)
}
// 修改后勤人员
export const updatePersonnelApi = (data) => {
  return request('post', '/user/rearPerson/updateRearPerson', data, true)
}
// 设置下发状态(下发状态：1--已下发，2--未下发，3--部分设备下发)
export const setIssueStatusApi = (data) => {
  return request('post', '/user/rearPerson/setIssueStatus', data, true)
}
// 获取自动生成的卡号
export const getMagneticCardNumberApi = (data) => {
  return request('get', `/user/rearPerson/getMagneticCardNumber?${data}`)
}
// 后勤人员下发
export const downSendPersonnelCardApi = (data) => {
  return request('post', '/device/visitRoleGroupUser/writeLogisticUser', data, true)
}
// 批量后勤人员下发
export const batchWriteLogisticUserApi = (data) => {
  return request('post', '/device/visitRoleGroupUser/batchWriteLogisticUser', data)
}
// 删除后勤人员卡号
export const delPersonnelCardNumApi = (data) => {
  return request('get', `/user/rearPerson/clearCardNo?${data}`)
}
// 批量删除后勤人员卡号
export const deleteBatchRearPersonCardApi = (data) => {
  return request('post', '/user/rearPerson/deleteBatchRearPersonCard', data, true)
}
// 删除后勤人员头像
export const deleteRearPersonPhotoApi = (data) => {
  return request('get', `/user/rearPerson/deleteRearPersonPhoto?${data}`)
}
// ------- 消息推送设置 ---------
// 查询学校指定学段的配置信息
export const getMsgPushSetApi = (data) => {
  return request('post', '/statistics/statisticsPushConfig/page', data)
}
// 添加消息推送
export const addMsgPushSetApi = (data) => {
  return request('post', '/statistics/statisticsPushConfig/add', data)
}
// 更新消息推送
export const updateMsgPushSetApi = (data) => {
  return request('post', '/statistics/statisticsPushConfig/update', data)
}
// 删除配置
export const deleteMsgPushSetApi = (data) => {
  return request('delete', `/statistics/statisticsPushConfig/deleteMore?${data}`)
}

// ------- 学校服务配置策略 ---------
// 根据学校查询学校服务配置策略
export const getSchoolChargeStrategyApi = (data) => {
  return request('get', `/user/schoolChargeStrategy/getSchoolChargeStrategyBySchool?${data}`)
}
// 新增或修改学校服务配置策略
export const setSchoolChargeStrategyApi = (data) => {
  return request('post', '/user/schoolChargeStrategy/addOrUpdateSchoolChargeStrategy', data, true)
}
