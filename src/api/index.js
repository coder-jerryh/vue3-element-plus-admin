import request from '../utils/request'

// 扫码登录
export const scanLoginApi = (data) => {
  return request('get', `/function/user/dingLogin?${data}`)
}
// 登录
export const loginApi = (data) => {
  return request('post', '/function/user/manageLogin', data, true)
}
// 退出登录
export const loginOutApi = (data) => {
  return request('post', '/function/user/logout', data, true)
}
// 获取学校树
export const getSchoolTreeApi = (type, data) => {
  const TreeTypes = {
    // 仅包含学校
    school: 'selectSchoolTree',
    // 所有学校信息（包含“全部学校”）
    allSchool: 'selectSchoolTree',
    // 包含全部的学校信息(学校树里包含学校信息和人员信息)
    schoolDetail: 'selectSchoolTreeWithClassInfoAndPersonInfo',
    // 包含区域信息的学校树
    areaSchool: 'selectSchoolTreeWithAreaInfo'
  }
  return request('get', `/user/schoolInfo/${TreeTypes[type]}?${data}`)
}
// --------------------- 统计 -------------------------
// 本周设备事件统计
export const getDeviceStatApi = (data) => {
  return request('post', '/device/warningInfo/statistics', data, true)
}
// 本学期已缴费统计
export const getTermTotalApi = (data) => {
  return request('post', '/fees/payFeesOrder/getTermTotal', data, true)
}
// 今日缴费统计
export const getOrderPayTypeStatApi = (data) => {
  return request('post', '/fees/payFeesOrder/getOrderPayTypeTotal', data, true)
}
// 班级考勤统计
export const getCheckingStatApi = (data) => {
  return request('post', '/device/eventInfo/getAttendanceStatistics', data, true)
}
// 服务统计
export const getChargeStatApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/chargeStatistics', data, true)
}
// --------------------- 批量导入相关 -------------------------
// 上传Url
export const uploadFileApi = (uploadApi, data) => {
  const uploadUrls = {
    studentAvatar: '/user/studentInfo/uploadStudentPhoto',
    parentAvatar: '/user/customerInfo/uploadCustomerPhoto',
    teacherAvatar: '/user/teacherInfo/uploadTeacherPhoto',
    studentIDPic: '/theclass/fileUpDown/uploadOss',
    personnelAvatar: '/user/fileInfo/uploadHeadPic',
    uploadPic: '/user/fileInfo/uploadImage',
    uploadFile: '/user/fileInfo/uploadFile',
    getAppClientKeyStr: '/pay/weChat/getAppClientKeyStr',
    getAppClientCertStr: '/pay/weChat/getAppClientCertStr',
    // 服务开通
    importServerOpen: '/charge/chargeSchoolOrder/saveOpenChargeSchoolOrderExcelTemple'
  }
  return request('post', uploadUrls[uploadApi], data, false, 'componentHandleError')
}
// 导入Url
export const importFileApi = (importType, file, query, selectFileType = 'file') => {
  const i = { file: 0, floder: 1 }[selectFileType]
  const importUrl = {
    importCamera: '/live/liveCamera/cameraExcelUpload',
    studentCardNum: '/user/studentInfo/importStudentCard',
    studentAvatars:
      '/user/studentInfo/uploadStudentPhotoWithoutStudentNum,/user/studentInfo/uploadStudentPhotoWithFolder',
    studentType: '/user/studentInfo/importStudentType',
    parentAvatars: '/user/customerInfo/uploadCustomerPhotoWithoutDingUserId',
    parentCardNum: '/user/customerInfo/importCustomerCard',
    classSorce: '/theclass/achievementInfo/importAchievement',
    schoolCard: '/schoolcard/schoolCard/excelUpload',
    // 缴费信息：学生单位缴费excel上传
    studentPriceExcel: '/fees/payFeesInfo/uploadStudentPriceExcel',
    // 缴费信息：基础缴费学生配置excel上传
    importPayFeesExcel: '/fees/payFeesInfo/importPayFeesExcel',
    // 缴费信息：成绩缴费excel上传
    gradePay: '/fees/payFeesInfo/uploadStudentScoreExcel',
    // 学生课程导入
    studentSchedule: '/user/studentCourse/importStudentCourse',
    // 学生学号导入
    studentNum: '/user/studentInfo/importSchoolStudentNum',
    // 后勤人员信息导入
    personnelInfo: '/user/rearPerson/importRearPerson',
    // 后勤人员卡号导入
    personnelCardNum: '/user/rearPerson/importPersonCard',
    // 后勤人员头像导入
    personnelAvatars: '/user/rearPerson/importPhoto',
    // 教师头像导入
    teacherAvatars: '/user/teacherInfo/uploadTeacherPhotoWithoutTeacherNum',
    // 教师卡号导入
    teacherCardNum: '/user/teacherInfo/importTeacherCard',
    // 成绩导入
    importClassScore: '/theclass/achievementInfo/importAchievement',
    // 服务开通
    importServerOpen: '/charge/chargeSchoolOrder/saveOpenChargeSchoolOrderExcelTemple',
    // 导入课表
    uploadSchedule: '/schedule/scheduleConfig/saveScheduleConfigByExcel',
    // 导入留校人员
    importStaySchoolUser: '/device/visitRoleGroupUserAccess/importStaySchoolUser',
    // 撤销留校人员
    importEndStaySchoolUser: '/device/visitRoleGroupUserAccess/importStaySchoolUser',
    // // 易科士一卡通现金补助导入
    cashSubsidy: '/onecard/cashGrantInfo/upLoad',
    // 宿舍批量入住
    batchCheckIn: '/dormitory/mgPerson/personOccupancyUpload',
    // 宿舍批量退宿
    batchQuitDormitory: '/dormitory/mgPerson/returnDormUpload'
  }[importType].split(',')[i]
  // 根据后台需求数据格式
  const form = new FormData()
  // 文件对象
  form.append('file', file)
  // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
  for (const key in query) {
    form.append(key, query[key])
  }
  return request('post', importUrl, form, false, 'importFile')
}

// 进度条Url
export const importFileProcessApi = (service, query) => {
  const processUrl = {
    user: `/user/studentInfo/getRate?${query}`,
    // 成绩导入
    importClassScore: `/user/studentInfo/getRate?${query}`,
    // 服务开通
    openService: `/charge/chargeSchoolOrder/getRate?${query}`
  }[service]
  return request('get', processUrl, false)
}
// 进度条结果
export const importFileResultApi = (service, query) => {
  const resultUrl = {
    user: `/user/studentInfo/getImportResult?${query}`,
    // 成绩导入
    importClassScore: `/user/studentInfo/getImportResult?${query}`,
    // 服务开通
    openService: `/charge/chargeSchoolOrder/getImportResult?${query}`
  }[service]
  return request('get', resultUrl, false)
}

// 下载模版
export const downModuleApi = (importType, query, data) => {
  const moduleUrls = {
    // 成绩导入
    importClassScore: '/theclass/achievementInfo/downAcTemplate',
    // 易科士一卡通现金补助导入
    cashSubsidy: '/onecard/cashGrantInfo/downLoadMode',
    // 批量入住退宿
    batchCheckIn: '/dormitory/mgPerson/downLoadMode',
    // 宿舍批量退宿
    batchQuitDormitory: '/dormitory/mgPerson/downLoadMode'
  }
  // return request('GET', moduleUrls[importType], data, false, 'exportFile')
  return request('get', `${moduleUrls[importType]}?${query}`, data, false, 'exportFile')
}
// 获取导入进度
export const getImportProcessApi = (data) => {
  return request('get', `/user/studentInfo/getRate?${data}`)
}
// 获取导入结果
export const getImportResultApi = (data) => {
  return request('get', `/user/studentInfo/getImportResult?${data}`)
}
