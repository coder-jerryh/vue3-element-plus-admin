// 商户缴费类别
export const SEX_OPTIONS = {
  0: '未设置',
  1: '男',
  2: '女',
  3: '其他',
  null: '未设置'
}
// 商户缴费类别
export const MERCHANT_PAY_TYPES = {
  1: '学校',
  2: '供应商',
  3: '个人'
}
// 订单状态
export const PAY_TYPE_OPTIONS = {
  2: '已支付',
  1: '未支付',
  4: '支付中',
  6: '已退款',
  3: '支付失败',
  7: '交易关闭'
}
// 来源
export const USER_SOURCE_TYPES = {
  0: '系统',
  1: '钉钉家校通',
  2: '微信',
  3: '内部通讯录'
}
// 教师来源
export const TEACHER_SOURCE_TYPES = {
  0: '系统',
  1: '家校通讯录',
  2: '微信',
  3: '内部通讯录'
}
export const STUDENT_STAGES = {
  1: '分班配置',
  2: '数据收集',
  3: '分班完成'
}
export const STUDENT_CLASS_TYPES = {
  1: '手动分班',
  2: '随机分班',
  3: '成绩分班'
}
// 缴费类型
export const payTypes = {
  1: '必缴',
  2: '自愿'
}
// 缴费方式
export const PAY_FEES_WAY = {
  1: '普通缴费',
  // 2: '预缴费',
  3: '学生单位缴费',
  4: '分数线缴费',
  5: '分数段缴费'
}

// 关联类型
export const PAY_RELEVANCE_TYPES = {
  1: '班级',
  2: '学生'
}
// 学校类型
export const SCHOOL_TYPES = {
  1: '幼儿园',
  2: '小学',
  3: '初中',
  4: '高中'
}
// 学生状态
export const STUDENT_STATUS_OPTIONS = {
  1: '在校',
  2: '放假',
  3: '请假',
  4: '离校',
  5: '休学',
  6: '请假未归'
}
// 亲属关系
export const PARENT_OPTIONS = {
  1: '妈妈',
  2: '爸爸',
  3: '姐姐',
  4: '哥哥',
  5: '爷爷',
  6: '奶奶',
  7: '外公',
  8: '外婆',
  9: '叔叔',
  10: '阿姨',
  11: '家长'
}
// 菜单类型
export const menuTypes = {
  0: '无',
  1: '门禁服务',
  2: '校牌服务',
  3: '监控服务',
  4: '缴费'
}
// 亲属关系
export const INPUT_TYPE_OPTIONS = {
  text: '文本框',
  selecter: '下拉框',
  number: '数字框',
  file: '文件框'
}
// 星期
export const DEFAULT_WEEKS = {
  0: '星期一',
  1: '星期二',
  2: '星期三',
  3: '星期四',
  4: '星期五',
  5: '星期六',
  6: '星期天'
}
// 星期
export const ALL_WEEKS = {
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  0: '星期天'
}
// 中文数字
export const CHINESE_NUM = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
  10: '十',
  11: '十一',
  12: '十二',
  13: '十三',
  14: '十四',
  15: '十五',
  16: '十六',
  17: '十七',
  18: '十八',
  19: '十九',
  20: '二十'
}
// 服务协议类型
export const SERVICE_DEALS = {
  1: '门禁购买协议',
  2: '校牌购买协议',
  3: '视频购买协议',
  4: '服务统一订购协议',
  5: '微信注册协议'
}
// 消息类型
export const MST_TYPES = {
  1: '系统消息',
  2: '权益消息',
  3: '交易消息',
  4: '活动消息'
}
// 管理员类型
export const ADMIN_TYPES = {
  1: '超级管理员',
  2: '普通用户',
  3: '班主任'
}
// 一卡通配置
export const CONSUME_PLATFORM = {
  1: '卡德',
  2: '易科士',
  3: '一脸通'
}
// 希沃进入方式
export const CLASS_CARD_ENTER_WAYS = {
  1: '刷卡识别',
  2: '人脸识别',
  3: '刷卡识别 + 人脸识别'
}
// 消费类型
export const CONSUMEC_TYPE_OPTIONS = {
  3: '充值',
  46: '补卡补助余额转入',
  6: '领取补助',
  49: '补助退款',
  50: '补助平台纠错',
  10: '现金消费',
  61: '现金领款',
  4: '平台消费减款',
  73: '翼支付充值',
  36: '次数扣除',
  5: '平台消费退款',
  40: '补助消费',
  11: '平台消费纠错',
  28: '补卡余额转入',
  100: '支付宝刷脸'
}
// 发票类型
export const INVOICE_TYPE_OPTIONS = {
  p: '普通发票(电票)',
  c: '普通发票(纸票)',
  s: '专用发票',
  e: '收购发票(电票)',
  f: '收购发票(纸质)',
  r: '普通发票(卷式)'
}
export const LEAVE_AUDIT_TYPE_OPTIONS = {
  0: '待审批',
  1: '已通过',
  2: '已拒绝',
  3: '已撤销',
  11: '请假开始',
  12: '请假结束',
  13: '归校确认'
}
export const VISIT_TYPE_OPTIONS = {
  0: '待审批',
  1: '已通过',
  2: '已拒绝',
  3: '已撤销',
  11: '到访开始',
  12: '到访结束'
}
export const APPROVER_RESULT_OPTIONS = {
  0: '待审批',
  1: '已通过',
  2: '已拒绝'
}
export const LEAVE_TYPE_OPTIONS = {
  1: '事假',
  2: '病假',
  9: '其他'
}
export const ORDER_STATES = {
  '01': '交易中',
  '02': '交易成功',
  '03': '交易失败',
  '04': '交易关闭'
}
export const LOG_TYPES = {
  1: '登录日志',
  4: '同步学生相关日志',
  5: '同步家长相关日志',
  7: '同步组织架构人员相关日志',
  8: '同步老师相关日志',
  9: '同步关联关系相关日志',
  10: '同步部门相关日志'
}
export const LIVE_SOURCE_TYPES = {
  1: '云眸',
  2: '萤石云'
}
export const TOP_UP_TYPES = {
  3: '现金充值',
  4: '减款',
  5: '退款'
}
export const RECHARGE_TYPES = {
  1: '自充',
  2: '代充'
}
export const RECEIVE_TYPES = {
  1: '1',
  2: '2',
  3: '12'
}
export const ISSUE_STATUS_OPTIONS = {
  null: '未添加权限组',
  1: '未下发',
  2: '已下发',
  3: '部分下发'
}
export const REGISTER_STATUS_OPTIONS = {
  null: '未添加权限组',
  1: '已注册',
  2: '未注册'
}
export const BANK_PAY_TYPES = {
  '00': '蜀信e支付',
  '01': '蜀信卡快捷支付',
  '02': '银联支付'
  // '03': '微信支付',
  // '04': '支付宝支付',
  // '05': '易宝支付',
  // '06': '快钱支付',
  // '07': '积分支付',
  // '08': '红包支付',
  // '09': '优惠券支付',
  // 10: '面值卡支付',
  // 11: '线下微信支付',
  // 12: '线下支付宝支付',
  // 13: '线下蜀信e支付',
  // 14: '线下银联支付'
}
export const CHARGE_TYPE_OPTIONS = {
  1: '签到服务',
  2: '校牌服务',
  3: '阳光直播',
  4: '一卡通'
}
// 学生行为
export const STUDENT_BEHAVIORS = {
  1: '已签到',
  2: '迟到',
  3: '未签到'
}
// 学生行为
export const LIVE_TYPE_OPTIONS = {
  0: '未设置',
  1: '住校',
  2: '走读'
}
// 监控配置
export const MONITORING_PUSH_TYPES = {
  1: '实时推送',
  2: '报警推送',
  3: '延时推送',
  4: '不推送'
}
export const MONITORING_FREQUENCYS = {
  1: '定时监控',
  2: '间隔监控'
}
export const MONITORING_TYPES = {
  1: '系统组件监控',
  2: '用户数据监控',
  301: '云眸注册监控',
  302: '云眸下发监控',
  4: '签到设备状态监控',
  402: '一卡通设备状态监控',
  403: '直播设备状态监控',
  5: '业务数据监控',
  6: '客服上线提醒',
  701: '系统签到监控',
  702: '每日签到监控',
  8: '异常服务监控',
  9: '服务状态监控'
}
export const monitoringRange = {
  1: '所有学校',
  2: '指定学校'
}
export const monitoringDay = {
  0: '每天',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  7: '星期天',
  8: '月初',
  9: '月末'
}
export const USER_STATUS_OPTIONS = {
  1: '正常',
  2: '请假',
  3: '留校'
}
export const AGREEMENT_TYPES = {
  1: 'ehome协议',
  2: '云眸协议',
  21: '云眸',
  22: '萤石云',
  51: '卡德',
  52: '易科士'
}
export const ONE_CARD_TYPES = {
  51: '卡德',
  52: '易科士'
}
export const DEVICE_TYPES = {
  1: '门禁主机',
  2: '签到机',
  3: '班牌',
  4: '直播摄像头',
  5: '一卡通'
}
// 用户数据操作类型
export const OPERATION_TYPES = {
  1: '新增',
  2: '修改',
  3: '删除',
  201: '基础信息修改',
  203: '卡号修改',
  204: '头像修改'
}
export const OPERATION_SELECT_TYPES = {
  1: {
    1: '新增',
    3: '删除',
    201: '基础信息修改',
    203: '卡号修改',
    204: '头像修改'
  },
  2: {
    1: '新增',
    2: '修改',
    3: '删除'
  }
}
// 用户数据操作人来源
export const OPERATION_FROM_OPTIONS = {
  0: '未知',
  1: '钉钉小程序',
  2: '后台用户',
  3: '系统内部',
  4: '钉钉管理员'
}
// 操作数据类型
export const INFO_TYPES = {
  1: '学生信息',
  2: '教师信息',
  3: '家长信息',
  4: '服务信息'
}
// 监控类型
export const MONITOR_TYPES = {
  1: '家长信息变更监控',
  2: '家长学生关联关系监控'
}
export const USER_TYPES_OPTIONS = {
  0: '未知',
  1: '学生',
  2: '教师',
  3: '家长',
  4: '后勤'
}
// 服务操作类型
export const SERVICE_OPERATIONS = {
  1: '开通',
  2: '续费',
  3: '停止'
}
// 服务状态类型
export const chargeStatusOptions = {
  1: '有效',
  2: '无效',
  3: '异常'
}
// 宿舍进出事件类型
export const DORMITORY_EVENT_TYPE = {
  101: '有效事件',
  1011: '正常进出',
  1012: '异常进出',
  102: '重复事件',
  201: '匹配多个人员',
  202: '查询人员信息失败',
  301: '陌生人事件'
}
// 宿舍进出事件类型
export const EVENT_TYPES = {
  1: '刷卡事件',
  2: '刷脸事件',
  3: '其他事件',
  4: '无效时段'
}
export const CHARGES_MODE = {
  1: '线下收费',
  2: '黑马线上收费',
  3: '代理商线上收费'
}
// export const PAY_TYPE = {
//   1: '微信',
//   2: '支付宝',
//   3: '农商银行',
//   4: '微信+支付宝',
//   5: '微信+农商银行',
//   6: '支付宝+农商银行',
//   7: '微信+支付宝+农商银行'
// }
export const PAY_TYPE = {
  1: '1',
  2: '2',
  3: '3',
  4: '12',
  5: '13',
  6: '23',
  7: '123'
}

export const SETTLEMENT_TYPE = {
  1: '固定金额',
  2: '单价比例'
}
