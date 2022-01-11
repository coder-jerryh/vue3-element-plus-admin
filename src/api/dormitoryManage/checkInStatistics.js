import request from '../../utils/request'
// 获取实时归寝统计
export const getToLayStatisticsApi = (data) => {
  return request('get', `/dormitory/mgPerson/getToLayStatistics?${data}`)
}
// 获取人员归寝详情记录
export const getGoingToBedDetailApi = (data) => {
  return request('get', `/dormitory/mgPerson/getGoingToBedDetails?${data}`)
}
// 手动更改学生状态，执行归寝操作
export const changePersonStatusApi = (data) => {
  return request('post', '/dormitory/mgPerson/changePersonStatus', data, true)
}
