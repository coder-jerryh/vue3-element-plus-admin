import request from '../utils/request'
// ---------- 学校信息 ----------
// 新增学校
export const addSemesterSchoolApi = (data) => {
  return request('post', '/theclass/semesterInfo', data)
}
// 更新学校
export const updataSemesterSchoolApi = (data) => {
  return request('PATCH', '/theclass/semesterInfo', data)
}
// 删除学校
export const delSemesterSchoolApi = (query) => {
  return request('DELETE', `/theclass/semesterInfo/${query}`)
}
// 查询学校列表
export const listSemesterSchoolApi = (query, data) => {
  return request('POST', `/theclass/semesterInfo/page?${query}`, data)
}
// 发布分班
export const postPlacementApi = (data) => {
  return request('POST', '/theclass/semesterInfo/postPlacement', data, true)
}
export const exportStudentApi = (query) => {
  return request('GET', `/theclass/semesterInfo/export?${query}`, {}, false, 'exportFile')
}

// ---------- 学期信息 ----------
// 新增学期
export const addSemesterGradeApi = (data) => {
  return request('POST', '/theclass/gradeInfo', data)
}
// 更新学期
export const updataSemesterGradeApi = (data) => {
  return request('PATCH', '/theclass/gradeInfo', data)
}
// 删除学期
export const delSemesterGradeApi = (pkId) => {
  return request('DELETE', `/theclass/gradeInfo/${pkId}`)
}
// 查询学校下的学期列表
export const listSemesterGradeApi = (query, data) => {
  return request('POST', `/theclass/gradeInfo/page?${query}`, data)
}
// 开始分班
export const divideClassApi = (data) => {
  return request('POST', '/theclass/gradeInfo/divideClass', data, true)
}

// ---------- 表单信息 ----------
// 新增表单
export const addFormInfoApi = (data) => {
  return request('POST', '/theclass/formInfo', data)
}
// 更新表单
export const updataFormInfoApi = (data) => {
  return request('PATCH', '/theclass/formInfo', data)
}
// 删除表单
export const delFormInfoApi = (pkId) => {
  return request('DELETE', `/theclass/formInfo/${pkId}`)
}
// 查询表单配置信息
export const queryFormInfoApi = (pkId) => {
  return request('POST', '/theclass/theclass/formInfo/query')
}
// 查询学校下的表单列表
export const listFormInfoApi = (query, data) => {
  return request('POST', `/theclass/formInfo/page?${query}`, data)
}

// ---------- 分班过后的班级信息 ----------
// 新增关联班级
export const addClassInfoApi = (data) => {
  return request('POST', '/theclass/classInfo', data)
}
// 更新关联班级
export const updataClassInfoApi = (data) => {
  return request('PATCH', '/theclass/classInfo', data)
}
// 删除关联班级
export const delClassInfoApi = (pkId) => {
  return request('DELETE', `/theclass/classInfo/${pkId}`)
}
// 查询关联班级配置信息
export const queryClassInfoApi = (pkId) => {
  return request('POST', '/theclass/theclass/classInfo/query')
}
// 查询分页关联班级列表
export const listClassInfoApi = (query, data) => {
  return request('POST', `/theclass/classInfo/page?${query}`, data)
}
// 推送分班二维码
export const pushQRCodeClassoApi = (data) => {
  return request('POST', '/theclass/classInfo/pushQRCode', data, true)
}
export const queryAllClassApi = (data) => {
  return request('POST', '/theclass/classInfo/query', data)
}

// ---------- 关联班级信息 ----------
// 新增学生
export const addStudentInfoApi = (data) => {
  return request('POST', '/theclass/studentInfo', data)
}
// 更新学生
export const updataStudentInfoApi = (data) => {
  return request('PATCH', '/theclass/studentInfo', data)
}
// 删除学生
export const delStudentInfoApi = (pkId) => {
  return request('DELETE', `/theclass/studentInfo/${pkId}`)
}
// 查询学生配置信息
export const queryStudentInfoApi = (pkId) => {
  return request('POST', '/theclass/theclass/studentInfo/query')
}
// 查询学校下的学生列表
export const listStudentInfoApi = (query, data) => {
  return request('POST', `/theclass/studentInfo/page?${query}`, data)
}
//
export const batchstudentClassApi = (data) => {
  return request('POST', '/theclass/studentClass/batch', data, true)
}

// 管理已经分班的学生和关联的数据查询
export const listStudentByClassInfoApi = (query, data) => {
  return request('POST', `/theclass/studentClass/page?${query}`, data)
}
// 更新当前学生和班级的数据
export const updataStudentByClassInfoApi = (data) => {
  return request('PATCH', '/theclass/studentClass', data)
}
// 查询没有分到班级的学生
export const listNoClassInStudentApi = (query, data) => {
  return request('POST', `/theclass/studentClass/pageUnclassified?${query}`, data)
}
// 下载导入模版
export const downSorceAcTemplateApi = (data) => {
  return request('GET', '/theclass/achievementInfo/downAcTemplate', data, false, 'exportFile')
}
// 查询带成绩的班级学生分班数据
export const listClassInStudentHasSoresApi = (query, data) => {
  return request('POST', `/theclass/studentClass/query?${query}`, data)
}

// 查询分区消息模版
export const getMessageTemplateApi = () => {
  return request('GET', '/theclass/messageTemplate')
}
// 推送分区消息
// 查询带成绩的班级学生分班数据
export const sendMessageTemplateApi = (data) => {
  return request('POST', '/theclass/messageTemplate/sendMessage', data, true)
}
