import request from '../utils/request'
// ---------- 校牌信息 ----------
// 新增校牌信息
export const addSchoolcardApi = (data) => {
  return request('post', '/schoolcard/schoolCard', data)
}
// 更新校牌信息
export const updataSchoolcardApi = (data) => {
  return request('PATCH', '/schoolcard/schoolCard', data)
}
// 新增校牌信息
export const listSchoolCardApi = (data) => {
  return request('post', '/schoolcard/schoolCard/page', data)
}
// 删除校牌信息
export const delSchoolCardApi = (pkId) => {
  return request('DELETE', `/schoolcard/schoolCard/${pkId}`)
}
// 解除校牌绑定
export const relieveSchoolCardApi = (data) => {
  return request('post', '/schoolcard/schoolCard/relieveSchoolCard', data, true)
}
// 下发sos亲情电话
export const saveSchoolCardRecordApi = (data) => {
  return request('post', '/schoolcard/schoolCardRecord/saveSchoolCardRecord', data, true)
}

// 地理位置
export const selectSchoolPositionApi = (data) => {
  return request('post', '/schoolcard/schoolPosition/selectSchoolPosition', data)
}
// 操作日志
export const selectSchoolCardRecordApi = (data) => {
  return request('get', `/schoolcard/schoolCardRecord/selectSchoolCardRecord?${data}`, false)
}

// 查询当前班级所有已经绑定校牌的学生信息
export const getStudentByClassApi = (data) => {
  return request('get', `/schoolcard/schoolPosition/getStudentByClass?${data}`)
}

// 学校查询班级
export const getClassInfoListApi = (data) => {
  return request('post', `/user/classInfo/listClassInfoVO?${data}`)
}
// 查询班级下面的学生
export const listStudentInfoVOWithManyConditionApi = (data) => {
  return request('post', '/user/studentInfo/listStudentInfoVOWithManyCondition', data, true)
}
// 新增校牌学生关联
export const addStudentSchoolCardApi = (data) => {
  return request('post', '/schoolcard/studentSchoolCard', data)
}
// 新增校牌学生关联
export const updatastudentSchoolCardApi = (data) => {
  return request('PATCH', '/schoolcard/studentSchoolCard', data)
}
// 查询单个学生校牌关联
export const findStudentSchoolCardApi = (data) => {
  return request('get', `/schoolcard/studentSchoolCard?${data}`, false)
}
// 根据小孩编号查询其家长信息(包含别名等信息)
export const listCustomerByStudentApi = (data) => {
  return request('post', '/user/customerInfo/listCustomerByStudent', data, true)
}
// 下载模版
export const downTemplateStudentSchoolCardApi = (data) => {
  return request('get', '/schoolcard/schoolCard/downTemplate', data, false, 'exportFile')
}
// 查询当前家长是否拥有校牌服务
export const getChargeSchoolOrderByChargeTypeApi = (data) => {
  return request('post', '/charge/api/getChargeSchoolOrderByChargeType', data, true)
}
// 设置家长亲情号码
export const updateSchoolCardPhoneByFamilyApi = (data) => {
  return request('post', '/schoolcard/schoolCardPhone/updateSchoolCardPhoneByFamily', data, false)
}
// 获取单个学生的定位
export const getPositionTrueApi = (data) => {
  return request('get', `/schoolcard/schoolPosition/getPositionTrue?${data}`)
}
// 查询当前班级所有学生位置
export const getPositionByClassApi = (data) => {
  return request('get', `/schoolcard/schoolPosition/getPositionByClass?${data}`)
}
