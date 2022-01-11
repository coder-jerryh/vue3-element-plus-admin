/* 属性 (带*表示必传)
*title：弹窗标题
format：导入的文件支持的格式，默认是.xls,.xlsx
queryKeys：导入时，接口传递的额外参数，数组格式，如：['schoolNum']
multiple：布尔值，是否支持多选
tips：提示语句
templateUrl：下载模版的链接
requestTemplete: { 请求接口下载模版
  name: 文件名,
  api: 接口
}
*importApi：文件导入的接口
progressRequest: { 需要进度条
  progressApi：进度条接口
  progressRequest: 进度条结果接口
},
folderApi：按文件夹导入的接口
*/

const OSS_URL = '//elzx.oss-cn-chengdu.aliyuncs.com/elink-cloud'
// ---------- 进度条（按服务或类型区分）----------
// user服务
const userProgressApi = '/user/studentInfo/getRate'
// 服务开通
const openServiceProgressApi = '/charge/chargeSchoolOrder/getRate'

// ---------- 进度结果（按服务或类型区分）----------
// user服务
const userProgressResultApi = '/user/studentInfo/getImportResult'
// 服务开通
const openServiceProgressResultApi = '/charge/chargeSchoolOrder/getImportResult'

// 常量
export const IMPORT_TYPES = {
  studentCardNum: {
    title: '学生卡号导入',
    templateUrl: `${OSS_URL}/2020/8/28/批量导入学生卡号导入模版.xlsx`,
    importApi: '/user/studentInfo/importStudentCard',
    progressRequest: {
      progressApi: userProgressApi,
      progressResultApi: userProgressResultApi
    }
  },
  studentType: {
    title: '学生类型导入',
    templateUrl: `${OSS_URL}/2020/11/27/批量导入学生类型模版.xlsx`,
    importApi: '/user/studentInfo/importStudentType',
    progressRequest: {
      progressApi: userProgressApi,
      progressResultApi: userProgressResultApi
    }
  },
  studentSchedule: {
    title: '学生课程导入',
    templateUrl: `${OSS_URL}/2020/8/31/学生课程导入模板.xlsx`,
    importApi: '/user/studentCourse/importStudentCourse',
    progressRequest: {
      progressApi: userProgressApi,
      progressResultApi: userProgressResultApi
    }
  },
  studentNum: {
    title: '学生学号导入',
    templateUrl: `${OSS_URL}/2020/8/28/批量导入学生学号模板.xlsx`,
    importApi: '/user/studentInfo/importSchoolStudentNum',
    progressRequest: {
      progressApi: userProgressApi,
      progressResultApi: userProgressResultApi
    }
  },
  parentCardNum: {
    title: '家长卡号导入',
    templateUrl: `${OSS_URL}/2020/9/25/批量导入家长卡号模板.xlsx`,
    importApi: '/user/customerInfo/importCustomerCard',
    progressRequest: {
      progressApi: userProgressApi,
      progressResultApi: userProgressResultApi
    }
  },
  personnelInfo: {
    title: '后勤人员信息导入',
    templateUrl: `${OSS_URL}/2020/11/10/批量导入后勤人员模板.xlsx`,
    importApi: '/user/rearPerson/importRearPerson',
    progressRequest: {
      progressApi: userProgressApi,
      progressResultApi: userProgressResultApi
    }
  },
  personnelCardNum: {
    title: '后勤人员卡号导入',
    templateUrl: `${OSS_URL}/2020/8/28/批量导入后勤人员卡号模板.xlsx`,
    importApi: '/user/rearPerson/importPersonCard',
    progressRequest: {
      progressApi: userProgressApi,
      progressResultApi: userProgressResultApi
    }
  },
  teacherCardNum: {
    title: '教师卡号导入',
    templateUrl: `${OSS_URL}/2020/8/28/批量导入教师卡号模板.xlsx`,
    importApi: '/user/teacherInfo/importTeacherCard',
    progressRequest: {
      progressApi: userProgressApi,
      progressResultApi: userProgressResultApi
    }
  },
  importClassScore: {
    title: '分班成绩导入',
    requestTemplete: {
      name: '成绩导入模版.xls',
      api: '/theclass/achievementInfo/downAcTemplate'
    },
    importApi: '/theclass/achievementInfo/importAchievement'
  },
  importServerOpen: {
    title: '服务开通列表导入',
    templateUrl: `${OSS_URL}/feesOrder/服务开通模版.xlsx`,
    importApi: '/charge/chargeSchoolOrder/saveOpenChargeSchoolOrderExcelTemple',
    progressRequest: {
      progressApi: openServiceProgressApi,
      progressResultApi: openServiceProgressResultApi
    }
  },
  uploadSchedule: {
    title: '课表导入',
    tips: '提示：上传前请在学科管理中添加学科，文件名称为完整的班级名称',
    multiple: true,
    templateUrl: `${OSS_URL}/2020/11/9/课表导入模版.xls`,
    importApi: '/schedule/scheduleConfig/saveScheduleConfigByExcel'
  },
  importStaySchoolUser: {
    title: '留校人员导入',
    importApi: '/device/visitRoleGroupUserAccess/importStaySchoolUser',
    templateUrl: `${OSS_URL}/2021/2/2/批量导入留校学生.xlsx`,
    queryKeys: ['startOrEnd']
  },
  importEndStaySchoolUser: {
    title: '撤销留校人员导入',
    importApi: '/device/visitRoleGroupUserAccess/importStaySchoolUser',
    templateUrl: `${OSS_URL}/2021/2/2/批量导入留校学生.xlsx`,
    queryKeys: ['startOrEnd']
  },
  cashSubsidy: {
    title: '一卡通现金补助导入',
    importApi: '/onecard/cashGrantInfo/upLoad',
    requestTemplete: {
      name: '批量导入现金补助模版.xls',
      api: '/onecard/cashGrantInfo/downLoadMode'
    },
    queryKeys: ['corpId', 'forumName', 'schoolNum', 'userType', 'gradeId', 'classNum']
  },
  // 批量入住
  batchCheckIn: {
    title: '学生宿舍批量入住',
    importApi: '/dormitory/mgPerson/personOccupancyUpload',
    requestTemplete: {
      name: '宿舍学生批量入住导入模板.xls',
      api: '/dormitory/mgPerson/downLoadMode'
    },
    queryKeys: ['corpId', 'schoolNum', 'gradeId', 'classNum', 'personType']
  },
  // 批量退宿
  batchQuitDormitory: {
    title: '学生宿舍批量退宿',
    importApi: '/dormitory/mgPerson/returnDormUpload',
    requestTemplete: {
      name: '宿舍批量退宿导入模板.xls',
      api: '/dormitory/mgPerson/downLoadMode'
    },
    queryKeys: ['corpId', 'schoolNum', 'gradeId', 'classNum']
  },
  // 校牌信息导入
  schoolCard: {
    title: '校牌信息导入',
    importApi: '/schoolcard/schoolCard/excelUpload',
    requestTemplete: {
      name: '校牌信息导入模版.xls',
      api: '/schoolcard/schoolCard/downTemplate'
    },
    queryKeys: ['corpId', 'schoolNum']
  },
  liveCamera: {
    title: '导入摄像头',
    importApi: '/live/liveCamera/cameraExcelUpload',
    templateUrl: `${OSS_URL}/2020/6/21/摄像头信息模板.xlsx`,
    queryKeys: ['corpId', 'schoolNum', 'liveAppId', 'schoolName']
  }
}
