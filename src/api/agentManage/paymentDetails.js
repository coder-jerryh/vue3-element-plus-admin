import request from '../../utils/request'
// 查询代理商账户明细信息
export const gePayDetailListApi = (data) => {
  return request('post', '/agent/accountTransactionDetail/getAccountTransactionDetailList', data, true)
}
