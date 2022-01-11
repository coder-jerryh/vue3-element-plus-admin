import request from '../utils/request'

// 添加菜品信息
export const addCookMenuApi = (data) => {
  return request('post', '/cookbook/cookbookRemark/addCookbookRemark', data, true)
}
// 菜品信息列表
export const getCookMenuListApi = (data) => {
  return request('get', `/cookbook/cookbookRemark/getCookbookRemarkPage?${data}`)
}
// 删除菜品信息
export const delCookMenuApi = (data) => {
  return request('post', `/cookbook/cookbookRemark/delCookbookRemark?${data}`)
}
// 更新菜品信息
export const updateCookMenuApi = (data) => {
  return request('post', '/cookbook/cookbookRemark/editCookbookRemark', data, true)
}

// 添加食谱信息
export const addCookApi = (data) => {
  return request('post', '/cookbook/cookbookInfo/addCookbookInfo', data, true)
}
// 食谱信息列表
export const getCookListApi = (data) => {
  return request('get', `/cookbook/cookbookInfo/getCookbookPage?${data}`)
}
// 删除食谱信息
export const delCookApi = (data) => {
  return request('post', `/cookbook/cookbookInfo/delCookbookInfo?${data}`)
}
// 更新食谱信息
export const updateCookApi = (data) => {
  return request('post', '/cookbook/cookbookInfo/editCookbook', data, true)
}

// 添加食谱配置
export const addCookSetApi = (data) => {
  return request('post', '/cookbook/cookbookConfig/addCookbookConfig', data, true)
}
// 食谱配置列表
export const getCookSetListApi = (data) => {
  return request('get', `/cookbook/cookbookConfig/cookbookConfigPage?${data}`)
}
// 保存食谱配置
export const saveCookSetApi = (data) => {
  return request('post', '/cookbook/cookbookConfig/saveScheduleConfig', data)
}

// 食谱班级配置列表
export const getCookClassSetListApi = (data) => {
  return request('get', `/cookbook/classConfig/cookbookClassPage?${data}`)
}
// 课表班级配置列表
export const getNoSetClassListApi = (data) => {
  return request('get', `/cookbook/classConfig/getNotConfiguredClassList?${data}`)
}
// 删除食谱班级配置
export const delCookClassSetApi = (data) => {
  return request('post', '/cookbook/classConfig/delCookbookClass', data, true)
}
// 保存食谱班级配置
export const saveCookClassSetApi = (data) => {
  return request('post', '/cookbook/classConfig/addCookbookClass', data, true)
}
