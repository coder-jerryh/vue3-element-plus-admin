import request from '../../utils/request'
// 批量为班主任生成角色
export const autoCreateMpRoleApi = (data) => {
  return request('get', `/user/role/autoCreateRoleForClassmate?${data}`)
}
// 添加角色信息
export const addRoleApi = (data) => {
  return request('post', '/user/role/addRole', data, true)
}
// 删除角色信息
export const deleteRoleByIdApi = (data) => {
  return request('get', `/user/role/deleteRoleById?${data}`)
}
// 更新角色信息
export const updateRoleByIdApi = (data) => {
  return request('get', `/user/role/autoUpdateForClassmateRole?${data}`)
}
// 批量删除角色信息
export const batchDeleteRoleByIdApi = (data) => {
  return request('post', '/user/role/deleteBatchByIds', data, true)
}
// 修改角色信息
export const updateRoleApi = (data) => {
  return request('post', '/user/role/updateRole', data, true)
}
// 查询角色列表信息
export const listRoleApi = (data) => {
  return request('post', '/user/role/listRole', data, true)
}
// 为角色配置菜单
export const addRoleToMenuRelationApi = (data) => {
  return request('post', '/user/role/addRoleToMenuRelation', data, true)
}
// 批量为角色配置菜单
export const batchConfigRoleToMenuApi = (data) => {
  return request('post', '/user/role/batchConfigRoleToMenu', data, true)
}
// 为角色配置老师
export const addRoleToTeacherRelationApi = (data) => {
  return request('post', '/user/role/addRoleToTeacherRelation', data, true)
}
// 根据角色id查询老师信息列表
export const listTeacherInfoVOByRoleIdApi = (data) => {
  return request('post', '/user/role/listTeacherInfoVOByRoleId', data, true)
}
// 查询老师信息列表
export const listTeacherInfoVOApi = (data) => {
  return request('post', '/user/teacherInfo/listTeacherInfoVO', data, true)
}
// 删除为角色配置的老师
export const deleteRoleTeacherApi = (data) => {
  return request('post', '/user/role/deleteRoleToTeacherRelation', data, true)
}
// 根据角色id获取班级信息列表
export const listClassInfoVOByRoleIdApi = (data) => {
  return request('post', '/user/role/listClassInfoVOByRoleId', data, true)
}
// 为角色配置班级
export const addRoleToClassRelationApi = (data) => {
  return request('post', '/user/role/addRoleToClassRelation', data, true)
}
// 删除为角色配置的班级
export const deleteRoleToClassRelationApi = (data) => {
  return request('post', '/user/role/deleteRoleToClassRelation', data, true)
}
// 查询单个角色配置的菜单
export const listMenuVOByTeacherNumApi = (data) => {
  return request('post', '/user/role/listMenuVOByTeacherNum', data, true)
}
