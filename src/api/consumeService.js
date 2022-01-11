import request from '../utils/request'
// ---------- 充值信息 ----------
// 信息列表
export const getTopUpInfoListApi = (data) => {
  return request('post', '/onecard/rechargeInfo/getRechargeInfoPage', data, true)
}
// 总金额
export const getTopUpTotalPriceApi = (data) => {
  return request('post', '/onecard/rechargeInfo/getTotalMoney', data, true)
}
// 消费记录总金额
export const getConsumeTotalPriceApi = (data) => {
  return request('post', '/onecard/transactionsInfo/getTransactionInfoTotalMoney', data, true)
}
// 充值信息添加学生卡号
export const updateRechargeInfoByCardApi = (data) => {
  return request('post', '/onecard/rechargeInfo/updateTransactionLists')
}
// 同步学校
export const syncSchoolApi = (data) => {
  return request('post', '/onecard/oneCardSchoolInfo/useSchoolInfoList', data, true)
}
// 同步班级数据到一卡通
export const syncClassApi = (data) => {
  return request('post', '/onecard/oneCardClassInfo/useClassInfoList', data, true)
}
// 同步教师
export const syncTeacherApi = (data) => {
  return request('post', '/onecard/oneCardSchoolInfo/useTeacherInfoList', data, true)
}
// 同步学校所有学生
export const syncAllStudentApi = (data) => {
  return request('post', '/onecard/oneCardSchoolInfo/useStudentInfoList', data, true)
}
// 同步指定班级学生
export const syncClassStudentApi = (data) => {
  return request('post', '/onecard/oneCardSchoolInfo/useClassStudentInfoList', data, true)
}
// 绑定卡号
export const sysPersonListApi = (data) => {
  return request('post', '/onecard/oneCardSchoolInfo/sysPersonList', data, true)
}
// 同步充值记录
export const syncTopUpInfoApi = (data) => {
  return request('get', `/onecard/rechargeInfo/sysRechargeInfoList?${data}`)
}
// 银行接口查询订单
export const getConsumeClearInfoApi = (data) => {
  return request('get', `/onecard/rechargeInfo/queryRechargeCodeByBank?${data}`)
}
// 修改订单状态
export const updateOrderDetailApi = (data) => {
  return request('post', '/onecard/rechargeInfo/updateOrderDetail', data, true)
}
// 单个结算
export const closeOrderOneApi = (data) => {
  return request('post', '/onecard/rechargeInfo/closeRechargeOne', data, true)
}
//  多个结算
export const closeOrderAllApi = (data) => {
  return request('post', '/onecard/rechargeInfo/closeRechargeAll', data, true)
}
//  手动结算
export const closeOrdersApi = (data) => {
  return request('get', '/onecard/rechargeInfo/closeOrders')
}
// 修改补助版本号
export const updateCardMoneyStateApi = (data) => {
  return request('get', `/onecard/rechargeInfo/updateCardMoneyState?${data}`)
}

// ------------消费记录-----------------

// 消费记录列表
export const getConsumeRecordListApi = (data) => {
  return request('post', '/onecard/transactionsInfo/getTransactionsInfoPage', data, true)
}
// 同步所有学校对账记录
export const syncSchoolCheckingApi = (data) => {
  return request('get', `/onecard/transactionsInfo/sysSchoolTransactionInfo?${data}`)
}
// 对账记录
export const getCheckingListApi = (data) => {
  return request('post', '/onecard/transactionsInfo/getReconciliationInfo', data, true)
}
// 同步消费记录
export const sysTransactionInfoApi = (data) => {
  return request('post', '/onecard/transactionsInfo/sysTransactionsInfoByCollectionTime', data, true)
}
// ---------- 一卡通配置 ----------
// 添加一卡通配置
export const addOneCardAddressApi = (data) => {
  return request('post', '/onecard/oneCardAddress/addOneCardAddress', data)
}
// 列出一卡通配置
export const getAllOneCardAddressListApi = (data) => {
  return request('post', '/onecard/oneCardAddress/getOneCardAddressPage', data, true)
}
// 删除一卡通配置
export const delOneCardAddressApi = (data) => {
  return request('post', '/onecard/oneCardAddress/deleOneCardAddressState', data, true)
}
// 更新一卡通配置
export const updateOneCardAddressApi = (data) => {
  return request('post', '/onecard/oneCardAddress/updateOneCardAddress', data, true)
}

// ---------- 设备 ----------
// 新增设备
export const addEquipmentApi = (data) => {
  return request('post', '/onecard/deviceInfo/addDeviceInfo', data, true)
}
// 修改设备
export const updateEquipmentApi = (data) => {
  return request('post', '/onecard/deviceInfo/updateDeviceInfo', data, true)
}
// 缴费设备逻辑删除
export const delEquipmentApi = (data) => {
  return request('post', `/onecard/deviceInfo/deleDeviceInfo?${data}`)
}
// 设备列表
export const getEquipmentListApi = (data) => {
  return request('post', '/onecard/deviceInfo/getDeviceInfoPage', data, true)
}
// 同步设备
export const syncEquipmentApi = (data) => {
  return request('post', '/onecard/deviceInfo/sysDeviceInfoToSchool', data, true)
}

// ------------一卡通充值-----------------

// 一卡通充值
export const oneCardTopUpApi = (data) => {
  return request('post', '/onecard/rechargeInfo/backStageRechargeInfo', data, true)
}
// 充值记录
export const getTopUpNoteListApi = (data) => {
  return request('post', '/onecard/rechargeInfo/getBackRechargeInfoPage', data, true)
}
// 学生信息
export const getStudentInfoApi = (data) => {
  return request('post', '/user/studentInfo/listStudentInfoVOByStudentNameAndStudentNo', data, true)
}

// ------------一脸通充值-----------------
// 一脸通后台在线扣费
export const onlineConsumeApi = (data) => {
  return request('post', '/onecard/yqshOnlineConsume/onlineConsume', data, true)
}
// 一脸通在线扣费记录
export const getYqshOnlineConsumePageApi = (data) => {
  return request('post', '/onecard/yqshOnlineConsume/getYqshOnlineConsumePage', data, true)
}
// ------------一脸通日志-----------------
// 一脸通操作日志
export const getYqshHandleLogPageApi = (data) => {
  return request('post', '/onecard/yqshHandleLog/getYqshHandleLogPage', data, true)
}

// ------------一卡通管理员-----------------
// 一卡通管理员信息查询
export const getOneCardAdminInfoPageApi = (data) => {
  return request('post', '/onecard/oneCardAdminInfo/getOneCardAdminInfoPage', data, true)
}
// 删除一卡通管理员
export const deleOneCardAdminInfoApi = (data) => {
  return request('post', '/onecard/oneCardAdminInfo/deleOneCardAdminInfo', data, true)
}
// 添加一卡通管理员
export const addOneCardAdminInfoApi = (data) => {
  return request('post', '/onecard/oneCardAdminInfo/addOneCardAdminInfo', data, true)
}

// ------------一卡通挂失-----------------
// 一卡通挂失信息查询
export const getOneCardLossInfoPageApi = (data) => {
  return request('post', '/onecard/oneCardLossInfo/getOneCardLossInfoPage', data, true)
}
// 处理挂失信息
export const handleLossApi = (data) => {
  return request('post', '/onecard/oneCardLossInfo/handleLoss', data, true)
}
// 受理挂失信息
export const acceptanceLossApi = (data) => {
  return request('post', '/onecard/oneCardLossInfo/acceptanceLoss', data, true)
}
// 一卡通挂失
export const saveBackOneCardLossInfoApi = (data) => {
  return request('post', '/onecard/oneCardLossInfo/saveBackOneCardLossInfo', data, true)
}

// ------------充值报表-----------------
// 日充值统计报表
export const getOneCardRechargeReportPageApi = (data) => {
  return request('post', '/onecard/oneCardRechargeReport/getOneCardRechargeReportPage', data, true)
}
// 日充值统计报表总金额
export const getReportTotalMoneyApi = (data) => {
  return request('get', `/onecard/oneCardRechargeReport/getTotalMoney?${data}`)
}
// 导出
export const getSchoolOneCardReportApi = (data) => {
  return request('get', `/onecard/oneCardRechargeReport/getSchoolOneCardReport?${data}`, {}, false, 'exportFile')
}
// 生成日充值报表
export const addOneCardRechargeReportInfoApi = (data) => {
  return request('post', '/onecard/oneCardRechargeReport/addOneCardRechargeReportInfo', data, true)
}
// 根据报表id分页查询现金充值记录
export const selectCardRechargePageByReportIdApi = (data) => {
  return request('get', `/onecard/cardRechargeInfo/selectCardRechargePageByReportId?${data}`)
}
// 根据报表id分页查询远程总金额
export const selectCardRechargeTotalByReportIdApi = (data) => {
  return request('get', `/onecard/cardRechargeInfo/selectCardRechargeTotalByReportId?${data}`)
}
// 根据报表id分页查询远程充值记录
export const selectRechargePageByReportIdApi = (data) => {
  return request('get', `/onecard/rechargeInfo/selectRechargePageByReportId?${data}`)
}
// 根据报表id分页查询远程总金额
export const selectRechargeTotalByReportIdApi = (data) => {
  return request('get', `/onecard/rechargeInfo/selectRechargeTotalByReportId?${data}`)
}
// ------------现金充值记录-----------------
// 查询现金充值记录信息
export const getCardRechargeInfoListApi = (data) => {
  return request('post', '/onecard/cardRechargeInfo/getCardRechargeInfoList', data, true)
}
// 查询现金充值记录总金额
export const getCardRechargeTotalMoneyApi = (data) => {
  return request('post', '/onecard/cardRechargeInfo/getCardRechargeTotalMoney', data, true)
}
// 同步学校现金充值记录
export const sysCardRechargeListApi = (data) => {
  return request('post', '/onecard/cardRechargeInfo/sysCardRechargeList', data, true)
}
// ------------一脸通同步学校和学生信息-----------------
// 同步学校/班级信息
export const syncYLTSchoolOrClassInfoApi = (data) => {
  return request('post', '/onecard/yqshDeptInfo/syncSchoolOrClassInfo', data, true)
}
// 同步人员信息
export const syncYLTClassUserInfoApi = (data) => {
  return request('post', '/onecard/yqshUserInfo/syncClassUserInfo', data, true)
}
// ------------易科士同步学校和学生信息-----------------
// 同步学校及班级到易科士一卡通
export const yksSyncSchoolApi = (data) => {
  return request('post', '/onecard/actionLog/syncSchool', data, true)
}
// 同步学校后勤人员信息到易科士一卡通
export const syncStaffApi = (data) => {
  return request('post', '/onecard/actionLog/syncStaff', data, true)
}
// 同步学校学生信息到易科士一卡通
export const syncStudentApi = (data) => {
  return request('post', '/onecard/actionLog/syncStudent', data, true)
}
// 同步学校教师信息到易科士一卡通
export const yksSyncTeacherApi = (data) => {
  return request('post', '/onecard/actionLog/syncTeacher', data, true)
}

// 配置易科士新增一卡通日套餐信息
export const configMealInfoApi = (data) => {
  return request('post', '/onecard/mealInfo/configMealInfo', data, true)
}
// 根据套餐信息主键删除
export const delMealInfoApi = (data) => {
  return request('get', `/onecard/mealInfo/delMealInfo?${data}`)
}
// 多条件分页查询套餐信息
export const getMealInfosApi = (data) => {
  return request('post', '/onecard/mealInfo/getMealInfos', data, true)
}
// 根据套餐信息主键修改
export const updateMealInfoApi = (data) => {
  return request('post', '/onecard/mealInfo/updateMealInfo', data, true)
}
//  --------现金补助-----------
// 多条件分页查询一卡通现金补助信息
export const pageListApi = (data) => {
  return request('get', `/onecard/cashGrantInfo/pageList?${data}`)
}
// 审核现金补助
export const approveApi = (data) => {
  return request('post', '/onecard/cashGrantInfo/approve', data)
}
// 下载模板
export const downLoadModeApi = (data) => {
  return request('post', '/onecard/cashGrantInfo/downLoadMode', data, true)
}
// 导入上传文件
export const upLoadApi = (data) => {
  return request('post', '/onecard/cashGrantInfo/upLoad', data, true)
}
// 下发现金补助
export const useCashGrantApi = (data) => {
  return request('post', '/onecard/cashGrantInfo/useCashGrant', data)
}
// 根据条件统计现金补助金额
export const statisticsCashGrantApi = (data) => {
  return request('get', `/onecard/cashGrantInfo/statisticsCashGrant?${data}`)
}
// 根据易科士服务端心跳信息主键查询详情
export const getYksHeartDetailsApi = (data) => {
  return request('get', `/onecard/yksHeartDetail/getYksHeartDetails?${data}`)
}
// 多条件分页查询易科士心跳
export const getYksHeartInfosApi = (data) => {
  return request('get', `/onecard/yksHeartInfo/getYksHeartInfos?${data}`)
}
// ---------用户信息同步-------------
// 带条件的分页查询一卡通用户信息
export const getYksUserInfoDTOApi = (data) => {
  return request('get', `/onecard/yksUserInfo/getYksUserInfoDTO?${data}`)
}
// 异步同步易科士用户信息到E联智校
export const syncGetCustomerApi = (data) => {
  return request('post', '/onecard/actionLog/syncGetCustomer', data, true)
}
// 分页查询易科士命令日志信息
export const logPageListApi = (data) => {
  return request('get', `/onecard/actionLog/pageList?${data}`)
}
// 查询易科士命令日志数据
export const getActionLogDataApi = (data) => {
  return request('get', `/onecard/actionLogData/getActionLogData?${data}`)
}
// 消费套餐变更记录
// 查询一卡通日套餐工单
export const getAllMealLogsApi = (data) => {
  return request('get', `/onecard/mealLog/getAllMealLogs?${data}`)
}
// 工作人员处理完成一卡通日套餐工单
export const dealMealLogOverApi = (data) => {
  return request('get', `/onecard/mealLog/dealMealLogOver?${data}`)
}
// 处理卡号下发状态
export const handleCardStatusApi = (data) => {
  return request('post', '/onecard/yksUserInfo/handlePushCardStateSuccess', data)
}
// 重新下发卡号
export const downSendCardNumApi = (data) => {
  return request('post', '/onecard/yksUserInfo/reissueCardNo', data)
}
