import request from '../utils/request'
/** 学校服务收费管理 */
// 查询学校服务收费列表
export const queryChargeSchoolListApi = (data) => {
  return request('post', '/charge/chargeSchoolConfig/queryChargeSchoolList', data, true)
}
// 批量冻结服务
export const selectOutDateChargeSchoolAndFreezeChargeApi = (query) => {
  return request('get', `/charge/chargeSchoolConfig/selectOutDateChargeSchoolAndFreezeCharge?${query}`)
}
// 判断是否有开通服务
export const isOpenConfigApi = (data) => {
  return request('post', '/charge/chargeSchoolConfig/isOpenConfig', data, true)
}
// 修改学校服务状态
export const changeChargeSchoolConfigStateApi = (data) => {
  return request('post', '/charge/chargeSchoolConfig/changeChargeSchoolConfigState', data, true)
}
// 修改学校服务配置
export const updateChargeSchoolApi = (data) => {
  return request('post', '/charge/chargeSchoolConfig/updateChargeSchoolMoney', data, true)
}
// 查询代理商信息列表
export const getAgentInfoPageApi = (data) => {
  return request('get', `/agent/agentInfo/getAgentInfoPage?${data}`)
}

// 查询收款账户列表
export const getCollectionAccountPageApi = (data) => {
  return request('get', `/agent/collectionAccount/getCollectionAccountPage?${data}`)
}
// 查询结算比例列表
export const getSettlementRatioPageApi = (data) => {
  return request('get', `/agent/settlementRatio/getSettlementRatioPage?${data}`)
}
// 新增学校服务配置
export const addChargeSchoolApi = (data) => {
  return request('post', '/charge/chargeSchoolConfig/addChargeSchool', data)
}

// 查询该学校服务可配置的班级列表
export const getCanBindingChargeConfigClassListApi = (data) => {
  return request('post', '/charge/chargeSchoolConfig/getCanBindingChargeConfigClassList', data, true)
  // return request('post', '/user/classInfo/listClassInfoVO', data, true)
}
// 查询该学校服务已经配置的班级列表
export const getChargeConfigHadBindingClassListApi = (data) => {
  return request('post', '/charge/chargeSchoolConfig/getChargeConfigHadBindingClassList', data, true)
}
// 删除学校服务已经配置的班级列表
export const batchDelChargeConfigBindingClassListApi = (data) => {
  return request('post', '/charge/chargeSchoolConfig/batchDelChargeConfigBindingClassList', data, true)
}

// 保存服务配置班级关联
export const batchBindingChargeConfigClassApi = (data) => {
  return request('post', '/charge/chargeSchoolConfig/batchBindingChargeConfigClass', data, true)
}
// 根据id 查询服务图片
export const getFileInfoByIdApi = (query) => {
  return request('get', `/user/fileInfo/getFileInfoById?${query}`)
}

export const queryChargeSchoolOrderListApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/queryChargeSchoolOrderList', data, true)
}

// 关闭服务
export const deleteChargeOrderTimeApi = (data) => {
  return request('post', '/charge/chargeOrderTime/deleteChargeOrderTime', data, true)
}
// 单个学生延时
export const addStudentDelayedApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/addStudentDelayed', data, true)
}
// 班级延时
export const addClassDelayedApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/addClassDelayed', data, true)
}
// 查询未开通的贫困学生或者教师子女
export const getUpOpenPoorOrTeacherChildListApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/getUpOpenPoorOrTeacherChildList', data, true)
}
// 一键开通
export const openAllChargeSchoolOrderListApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/openAllChargeSchoolOrderList', data, true)
}
// 一键开通教师子女
export const saveTeacherChildInfoListtApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/saveTeacherChildInfoList', data, true)
}

// 批量开通贫困学生服务
export const savePoorOrTeacherChildListApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/savePoorOrTeacherChildList', data, true)
}

// 修改推送方式
// 班级批量修改消息发送方式
export const updateChargeSchoolOrderListApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/updateChargeSchoolOrderList', data, true)
}
// 单个修改消息发送方式
export const updateReceiveTypeByOneApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/updateReceiveTypeByOne', data, true)
}

// 查询一键开通下面的服务类型
export const queryChargeSchoolConfigApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/queryChargeSchoolConfig', data, true)
}
// 一键关闭服务
export const stopDeleteChargeOrderApi = (query) => {
  return request('get', `/charge/chargeSchoolOrder/stopDeleteChargeOrder?${query}`)
}
// 人员已删除的已开通服务列表状态修改
export const updateDeletedChargeSchoolOrderListApi = (data) => {
  return request('get', `/charge/chargeSchoolOrder/updateDeletedChargeSchoolOrderList?${data}`)
}
// 查询班级下面的服务
export const selectChargeConfigListApi = (query) => {
  return request('get', `/charge/chargeSchoolOrder/selectChargeConfigList?${query}`)
}
// 查询班级下面的学生
export const selectClassStuListApi = (data) => {
  return request('post', '/user/studentInfo/listStudentInfoVOWithManyCondition', data, true)
}

export const selectStuCustomerlsitApi = (query) => {
  return request('get', `/charge/chargeSchoolOrder/selectStuCustomerlsit?${query}`)
}

// 平台开通个人服务
export const addOpenChargeSchoolOrderApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/addOpenChargeSchoolOrder', data, true)
}
// 平台开通整个班级服务
export const openChargeSchoolOrderListApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/openChargeSchoolOrderList', data, true)
}
// 未开通服务
export const selectUnOpenChargeStuListApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/selectUnOpenChargeStuList', data, true)
}
// 学生编号查询学生家长信息
export const getCustomerListByStudentNumApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/getCustomerListByStudentNum', data, true)
}
// 给家长开服务
export const openChargeCustomerOrderApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/openChargeCustomerOrder', data, true)
}

// 支付商品列表
export const getAllHadPayPlayOrderListApi = (data) => {
  return request('post', '/charge/playOrderInfo/getAllHadPayPlayOrderList', data, true)
}
export const getPayOrderTotalPriceApi = (data) => {
  return request('post', '/charge/playOrderInfo/getPayOrderTotalPrice', data, true)
}

// 发起服务订单结算审批
export const closePlayOrderAllApi = (data) => {
  return request('post', '/charge/playOrderInfo/closePlayOrderAll', data, true)
}
// 单个发起服务订单结算审批
export const closePlayOrderOneApi = (data) => {
  return request('post', '/charge/playOrderInfo/closePlayOrderOne', data, true)
}
//
// 支付流水数据导出
export const exportPlayOrderDataExcelApi = (data) => {
  return request('get', `/charge/playOrderInfo/exportPlayOrderDataExcel?${data}`, {}, false, 'exportFile')
}
// 开收据
export const createReceiptApi = (data) => {
  return request('post', '/charge/receiptInfo/createReceipt', data, true)
}
// 批量下载收据
export const downloadReceiptBatchApi = (data) => {
  return request('post', '/charge/receiptInfo/downloadReceiptBatch', data, true, 'exportFile')
}
// 获取商品信息详情
export const getPlayOrderDownChargeListApi = (query) => {
  return request('get', '/charge/playOrderInfo/getPlayOrderDownChargeList?' + query)
}
//
export const CallPayFeesOrderCloseApi = (data) => {
  return request('post', '/charge/api/CallPayFeesOrderClose', data, true)
}

// 查看支付状态详情
export const getPlayOrderDetailsApi = (query) => {
  return request('get', `/charge/playOrderInfo/getPlayOrderDetails?${query}`)
}

// 发票
export const toReceiptInfoApi = (query) => {
  return request('get', `/charge/receiptInfo/toReceiptInfo?${query}`)
}
// 订单转移
export const transferOrderApi = (data) => {
  return request('post', '/charge/playOrderInfo/transferOrder', data, true)
}
// 订单转移回调（测试）
export const transferPlayOrderCallBackApi = (data) => {
  return request('post', '/charge/playOrderInfo/transferPlayOrderCallBack', data, true)
}
// 发起微信扫码支付
export const weChatScanCodePaymentOrderApi = (data) => {
  return request('post', '/charge/playOrderInfo/weChatScanCodePaymentOrder', data, true)
}
// 查询订单是否支付成功
export const getPlayOrderStateByOrderCodeApi = (data) => {
  return request('post', '/charge/playOrderInfo/getPlayOrderStateByOrderCode', data, true)
}
// 通过批次id进行开通操作
export const chargeByExcelIdApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/chargeByExcelId', data, true)
}
// 根据小孩编号查询其家长信息(包含别名等信息)
export const listCustomerByStudentApi = (data) => {
  return request('post', '/user/customerInfo/listCustomerByStudent', data, true)
}
// 临时数据迁移
export const saveOrderTimeListApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/saveOrderTimeList', data, true)
}
// 根据查询删除
export const removeAllSchoolOrderListApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/removeAllSchoolOrderList', data, true)
}
// 根据服务ID查询服务时间信息
export const getChargeOrderTimeListApi = (data) => {
  return request('post', '/charge/chargeOrderTime/getChargeOrderTimeList', data, true)
}
// 根据选择的数据删除
export const removeChargeSchoolOrderListApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/removeChargeSchoolOrderList', data, true)
}

// 修改订单状态
export const updateOrderDetailApi = (data) => {
  return request('post', '/charge/playOrderInfo/updatePlayOrderDetail', data, true)
}
// 批量开通贫困学生服务
export const savePoorStudentInfoListApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/savePoorStudentInfoList', data, true)
}
// 人员已删除的已开通服务列表
export const getAbnormalChargeOrderListApi = (data) => {
  return request('get', `/charge/chargeSchoolOrder/getAbnormalChargeOrderList?${data}`)
}

// 查询学校的所有有效服务
export const getSchoolConfigListApi = (data) => {
  return request('get', `/charge/chargeSchoolConfig/getSchoolConfigList?${data}`)
}
// 查询服务配置班级
export const getChargeSchoolConfigClassListApi = (data) => {
  return request('get', `/charge/chargeSchoolConfig/getChargeSchoolConfigClassList?${data}`)
}
// 查询贫困学生的订单
export const getPoorStudentOrderListApi = (data) => {
  return request('get', `/charge/playOrderInfo/getPoorStudentOrderList?${data}`)
}
// 平台excel批量开通个人服务模板导入
export const saveOpenChargeSchoolOrderExcelTempleApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/saveOpenChargeSchoolOrderExcelTemple', data, true)
}
// 获取查询学生信息
export const getStudentInfoApi = (data) => {
  return request('get', `/user/studentInfo/getStudentInfoVoByStudentNo?${data}`)
}
// export const getStudentInfoApi = (data) => {
//   return request('post', '/user/studentInfo/getStudentInfoList', data, true)
// }
// 删除老的学生服务开通学生新的服务
export const saveNewStudentChargeOrderApi = (data) => {
  return request('post', '/charge/chargeSchoolOrder/saveNewStudentChargeOrder', data, true)
}
// 查询正在生效的服务(小程序)
export const selectCustomerOrderTimeApi = (data) => {
  return request('post', '/charge/ding/selectCustomerOrderTime', data, true)
}
// 查询家长信息(包头像、卡号等信息，会根据钉钉编号进行去重，不展示别名)
export const listCustomerWithManyCondtionApi = (data) => {
  return request('get', `/user/customerInfo/listCustomerWithManyCondtion?${data}`)
}
// 查询某个家长下的孩子信息
export const listStudentInfoVOByCorpIdAndDingUserIdApi = (data) => {
  return request('post', '/user/studentInfo/listStudentInfoVOByCorpIdAndDingUserId', data, true)
}
