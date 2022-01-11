import request from '../../utils/request'
// 学校管理员
// 添加学校管理员
export const addSchoolAdminApi = (data) => {
  return request('post', '/function/user', data)
}
// 批量创建学校管理员
export const saveTeacherAccountBatchApi = (data) => {
  return request('post', '/function/user/saveTeacherAccountBatch', data, true)
}
// 修改学校管理员
export const updateSchoolAdminApi = (data) => {
  return request('PATCH', '/function/user', data)
}
// 学校管理员列表
export const getSchoolAdminListApi = (data, query) => {
  return request('post', `/function/user/page?${data}`, query)
}
// 删除学校管理员
export const delSchoolAdminApi = (data) => {
  return request('delete', `/function/user/${data}`)
}
// 学校用户列表
export const getSchoolUserListApi = (data) => {
  return request('get', `/user/schoolUser/listSchoolUserVO?${data}`)
}
// 配置学校
export const setSchoolApi = (data) => {
  return request('POST', '/function/user/configureSchool', data)
}
// 获取当前用户配置学校
export const getUserConfigSchoolApi = (data) => {
  return request('get', `/function/user/getUserSchoolByUserId?${data}`)
}
// 修改用户信息
export const saveUserInfoApi = (data) => {
  return request('PATCH', '/function/user', data)
}
