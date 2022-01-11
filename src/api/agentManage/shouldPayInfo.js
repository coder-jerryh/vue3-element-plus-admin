import request from '../../utils/request'
// 查询应付款信息
export const getAccountsPayableListApi = (data) => {
  return request('post', '/agent/accountsPayable/getAccountsPayableList', data, true)
}
