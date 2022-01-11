import request from '../../utils/request'
// 实时查询异常服务列表
export const getAbnormalChargePageApi = (data) => {
  return request('get', `/monitor/monitoringChargeInfo/getAbnormalChargePage?${data}`)
}
