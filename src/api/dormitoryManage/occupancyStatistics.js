import request from '../../utils/request'
// 入住率统计
export const getOccupancyRateApi = (data) => {
  return request('get', `/dormitory/mgPerson/getOccupancyRate?${data}`)
}
