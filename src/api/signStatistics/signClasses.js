import request from '../../utils/request'
// 新增班次
export const addSignItemApi = (data) => {
  return request('post', '/statistics/signItem/addSignItem', data, false)
}
// 新增班次
export const updateSignItemApi = (data) => {
  return request('post', '/statistics/signItem/updateSignItem', data, false)
}
// 根据签到班次主键删除签到班次信息
export const delSignItemApi = (data) => {
  return request('get', `/statistics/signItem/delSignItem?${data}`)
}
// 获取所有班次
export const getSignItemsApi = (data) => {
  return request('post', '/statistics/signItem/getSignItems', data, true)
}

// 根据主键查询单个签到班次信息
export const getOneSignItemApi = (data) => {
  return request('get', `/statistics/signItem/getOneSignItem?${data}`)
}

// 进校签到统计列表查询
export const getSignClassInStatisticsInfoListApi = (data) => {
  return request('get', `/statistics/signClassInStatistics/getSignClassInStatisticsInfoList?${data}`)
}
// 出校签到统计列表查询
export const getSignClassOutStatisticsInfoListApi = (data) => {
  return request('get', `/statistics/signClassOutStatistics/getSignClassOutStatisticsInfoList?${data}`)
}
// 进校签到统计人员详情
export const getSignInClassInStatisticsDetailApi = (data) => {
  return request('get', `/statistics/signClassInUser/getSignClassInStatisticsInfoList?${data}`)
}
// 出校签到统计人员详情
export const getSignOutClassStatisticsDetailApi = (data) => {
  return request('get', `/statistics/signClassOutUser/getSignClassInStatisticsInfoList?${data}`)
}
