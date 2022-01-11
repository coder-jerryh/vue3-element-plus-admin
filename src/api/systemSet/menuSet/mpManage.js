import request from '../../../utils/request'
// ------- 小程序菜单 ---------
// 添加菜单
export const addMenuApi = (data) => {
  return request('post', '/user/menu/addMenu', data, true)
}
// 菜单列表
export const getMenuListApi = (data) => {
  return request('post', `/user/menu/listMenu?${data}`)
}
// 删除菜单
export const delMenuApi = (data) => {
  return request('get', `/user/menu/deleteById?${data}`)
}
// 更新菜单
export const updateMenuApi = (data) => {
  return request('post', '/user/menu/updateMenu', data, true)
}
