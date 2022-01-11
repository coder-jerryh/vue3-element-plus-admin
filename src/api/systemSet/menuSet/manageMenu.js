import request from '../../../utils/request'
// ------- 管理系统菜单 ---------
// 添加路由菜单
export const addMenuApi = (data) => {
  return request('post', '/function/func/saveFunc', data, true)
}
// 路由菜单列表
export const getMenuListApi = (data) => {
  return request('get', '/function/func/selectFunc')
}
// 删除路由菜单
export const delMenuApi = (data) => {
  return request('delete', `/function/func/deleteFunc?${data}`)
}
// 更新路由菜单
export const updateMenuApi = (data) => {
  return request('put', '/function/func/updateFunc', data, true)
}
// 纯菜单列表
export const getTopMenuListApi = (data) => {
  return request('get', `/function/func/selectMenuTreeByUserId?${data}`)
}
