import request from '../../utils/request'
// 查询服务状态列表
export const getMonitoringServiceInfoPageApi = (data) => {
  return request('get', `/monitor/monitoringServiceInfo/getMonitoringServiceInfoPage?${data}`)
}
// 查询服务状态监控日志
export const getMonitoringServiceInfoLogByMonitoringServiceInfoIdApi = (data) => {
  return request('get', `/monitor/monitoringServiceInfoLog/getMonitoringServiceInfoLogByMonitoringServiceInfoId?${data}`)
}
