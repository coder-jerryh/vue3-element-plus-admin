import request from '../utils/request'
// ---------- 缴费信息 ----------
// 新增修改缴费信息
export const addUpdatePayInfoApi = (data) => {
  return request('post', '/fees/payFeesInfo/insertOrUpdate', data)
}
// 获取成绩缴费模版
export const getscoreTemplateApi = (data) => {
  return request('post', '/fees/scoreTemplate/getScoreTemplateList', data, true)
}
// 缴费商户逻辑删除
export const delPayInfoApi = (data) => {
  return request('post', `/fees/payFeesInfo/delPayFeesInfo?${data}`)
}
// 缴费商户逻辑关闭
export const closePayInfoApi = (data) => {
  return request('post', `/fees/payFeesInfo/closePayFeesInfo?${data}`)
}
// 信息列表
export const getPayInfoListApi = (data) => {
  return request('get', `/fees/payFeesInfo/getPayFeesInfoPage?${data}`)
}
// 通过学校、商户分类查询商户号
export const getMerchantByTypeApi = (data) => {
  return request('get', `/fees/payFeesProject/getMerchantInfoBySort?${data}`)
}
// 添加缴费项目
export const addPayItemApi = (data) => {
  return request('post', '/fees/payFeesProject/insertOrUpdateProject', data)
}
// 未配置项目列表
export const getNoSetItemListApi = (data) => {
  return request('get', `/fees/payFeesProject/getPayFeesProjectPage?${data}`)
}
// 已配置项目列表
export const getHasSettedItemListApi = (data) => {
  return request('get', `/fees/payFeesProject/getAddPayFeesProjectsList?${data}`)
}
// 保存缴费项目POST /fees
export const savePayItemApi = (data) => {
  return request('post', '/fees/payFeesProject/addPayFeesProjects', data, true)
}
// 删除已配置缴费项目
export const delSettedPayItemApi = (data) => {
  return request('post', '/fees/payFeesProject/delPayProjectConfigs', data, true)
}
// 删除未配置的缴费项目
export const delNoSetPayItemApi = (data) => {
  return request('post', '/fees/payFeesProject/delPayFeesProject', data, true)
}
// 发布缴费信息
export const sendPayInfoApi = (data) => {
  return request('post', '/fees/payFeesInfo/issue', data, true)
}
// 撤回缴费信息
export const cancelPayInfoApi = (data) => {
  return request('post', '/fees/payFeesInfo/recall', data, true)
}
// 班级配置
// 获取未保存班级列表
export const getNoSetClassListApi = (data) => {
  return request('get', `/fees/payFeesInfo/selectClassPage?${data}`)
}
// 获取已保存班级列表
export const getSettedClassListApi = (data) => {
  return request('get', `/fees/payFeesInfo/selectPayFeesClassPage?${data}`)
}
// 保存班级配置
export const saveClassApi = (data) => {
  return request('post', '/fees/payFeesInfo/addBatchPayFeesClass', data, true)
}
// 保存全部班级配置
export const saveAllClassApi = (data) => {
  return request('post', '/fees/payFeesInfo/addPayFeesClass', data, true)
}
// 删除班级配置
export const delClassApi = (data) => {
  return request('post', '/fees/payFeesInfo/delPayFeesClass', data, true)
}
// 学生配置
// 获取未保存学生列表
export const getNoSetStudentListApi = (data) => {
  return request('post', '/fees/payFeesInfo/getStudentInfoList', data, true)
}
// 获取已保存学生列表
export const getSettedStudentListApi = (data) => {
  return request('get', `/fees/payFeesInfo/selectPayFeesStudentPage?${data}`)
}
// 保存学生配置
export const saveStudentApi = (data) => {
  return request('post', '/fees/payFeesInfo/addPayFeesStudents', data, true)
}
// 保存全部学生配置
export const saveAllStudentApi = (data) => {
  return request('post', '/fees/payFeesInfo/addAllPayFeesStudents', data, true)
}
// 删除学生配置
export const delStudentApi = (data) => {
  return request('post', '/fees/payFeesInfo/delPayFeesStudent', data, true)
}
// 删除全部学生配置
export const delAllStudentApi = (data) => {
  return request('post', '/fees/payFeesInfo/delAllPayFeesStudent', data, true)
}
// 根据分数线模板pkId查询缴费规则
export const getScoreLineRuleApi = (data) => {
  return request('get', `/fees/scoreTemplate/getScoreTemplateById?${data}`)
}
// 根据分数段模板pkId查询缴费规则
export const getScorePassageRuleApi = (data) => {
  return request('get', `/fees/scoreTemplate/getScoreSegmentTemplateConfigById?${data}`)
}

// ----------订单信息--------
// 缴费信息列表
export const getOrderInfoListApi = (data) => {
  return request('post', '/fees/payFeesOrder/getPayFeesOrderPage', data, true)
}
// 合计金额
export const getTableTotalPriceApi = (data) => {
  return request('post', '/fees/payFeesOrder/getTableTotalPrice', data, true)
}
// 合计金额
export const getClearTotalPriceApi = (data) => {
  return request('post', '/fees/payOrder/getTableTotalPrice', data, true)
}
// 支付渠道下拉框
export const getPayChannelsApi = () => {
  return request('get', '/fees/payFeesOrder/getPayTypeList')
}
// 获取缴费信息
export const getPayInfoBySchoolNumApi = (data) => {
  return request('get', `/fees/payFeesOrder/getPayInfoBySchoolNum?${data}`)
}
// 获取未配置班级
export const getNoSetClassSelectApi = (data) => {
  return request('get', `/fees/payFeesOrder/getClassListBySchool?${data}`)
}
export const getClassSelectApi = (data) => {
  return request('post', '/user/classInfo/listClassInfoVO', data, true)
}
// 获取已配置班级
export const getSettedClassSelectApi = (data) => {
  return request('get', `/fees/payFeesInfo/selectFeesClassInfos?${data}`)
}
// 订单详情
export const getOrderDetailsApi = (data) => {
  return request('get', `/fees/payFeesOrder/getPayOrderDetails?${data}`)
}
// 修改订单状态
export const updateOrderDetailApi = (data) => {
  return request('post', '/fees/payOrder/updateOrderDetail', data, true)
}
// 导出订单信息
export const exportOrderApi = (data) => {
  return request('post', '/fees/payFeesOrder/exportPayFessOrderDataExcel', data, true)
}
// 退款
export const refundOrderApi = (data) => {
  return request('post', '/fees/payOrder/refundOrder', data, true)
}
// ---------- 订单结算 ----------
// 缴费信息列表
export const getOrderClearListApi = (data) => {
  return request('post', '/fees/payOrder/getPayOrderPage', data, true)
}
// 单个订单结算
export const closeOrderOneApi = (data) => {
  return request('post', '/fees/payOrder/closeOrderOne', data, true)
}
// 全部结算
export const closeOrderAllApi = (data) => {
  return request('post', '/fees/payOrder/closeOrderAll', data, true)
}
// 全部撤回
export const cancelOrderAllApi = (data) => {
  return request('post', '/fees/payOrder/recallAll', data, true)
}
// 开票据
export const handelOrderBillApi = (data) => {
  return request('post', '/fees/payFeesOrder/createReceiptInfo', data, true)
}
// 订单转移
export const transferOrderApi = (data) => {
  return request('post', '/fees/payFeesOrder/transferOrder', data, true)
}
// 订单结算详情
export const getOrderClearDetailsApi = (data) => {
  return request('get', `/fees/payOrder/getOrderDetails?${data}`)
}
// 修改订单状态
export const updateOrderClearDetailApi = (data) => {
  return request('post', '/fees/payOrder/updateOrderDetail', data, true)
}
// ---------- 未缴费 ----------
// 未缴费信息列表
export const getNoPayInfoListApi = (data) => {
  return request('get', `/fees/payFeesOrder/getUnpaidFeesInfoList?${data}`)
}
// ---------- 商户号 ----------
// 新增修改商户号
export const addUpdateMerchantApi = (data) => {
  return request('post', '/fees/payFeesMerchant/insertOrUpdateMerchant', data)
}
// 缴费商户逻辑删除
export const delMerchantApi = (data) => {
  return request('post', `/fees/payFeesMerchant/delPayFeesMerchant?${data}`)
}
// 商户列表
export const getMerchantListApi = (data) => {
  return request('get', `/fees/payFeesMerchant/getMerchantInfoPage?${data}`)
}

// ---------- 成绩模版 ----------
// 新增修改分数线
export const addUpdateGradeLineApi = (data) => {
  return request('post', '/fees/scoreTemplate/scoreLineInsertOrUpdate', data)
}
// 新增修改分数段
export const addUpdateGradePassageApi = (data) => {
  return request('post', '/fees/scoreTemplate/scoreSegmentInsertOrUpdate', data)
}
// 缴费分数线逻辑删除
export const delGradeLineApi = (data) => {
  return request('post', `/fees/scoreTemplate/delScoreTemplate?${data}`)
}
// 分数线列表
export const getGradeLineListApi = (data) => {
  return request('post', '/fees/scoreTemplate/getScoreTemplatePage', data, true)
}
// 根据分数段模板pkId查询模板配置列表
export const getScoreSegmentTemplateApi = (data) => {
  return request('get', `/fees/scoreTemplate/getScoreSegmentTemplateConfigById?${data}`)
}
// 分数段模板配置 插入/更新
export const addUpdateGradePassageConfigApi = (data) => {
  return request('post', '/fees/scoreTemplate/configInsertOrUpdate', data)
}
// 删除分数段模板配置
export const delGradePassageConfigApi = (data) => {
  return request('post', `/fees/scoreTemplate/delScoreSegmentTemplateConfig?${data}`)
}
// 发布模版
export const sendGradeModuleApi = (data) => {
  return request('post', '/fees/scoreTemplate/issue', data, true)
}
