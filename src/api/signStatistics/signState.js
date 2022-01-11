import request from '../../utils/request'
// 签到状态分析列表
export const selectSignStatusPageApi = (data) => {
  return request('post', '/statistics/signStatus/selectSignStatusPage', data, true)
}
