/* 属性 (带*表示必传)
*title：弹窗标题
*format：导入的文件支持的格式
queryKey：导入时，接口传递的额外参数
floderUpload：导入时，是否支持选择文件夹方式导入
tips：提示语句
*importApi：文件导入的接口
folderApi：按文件夹导入的接口
*/
export const IMPORT_TYPES = {
  studentAvatars: {
    title: '学生头像导入',
    format: '.jpg,.png,.jpeg',
    queryKey: 'className',
    floderUpload: true,
    tips: '*若【选择文件】方式上传，图片名称必须是【学生身份证号】<br/>*若【选择文件夹】方式上传，图片名称必须是【学生姓名】，外层文件夹命名必须是【班级名称】',
    importApi: '/user/studentInfo/uploadStudentPhotoWithoutStudentNum',
    folderApi: '/user/studentInfo/uploadStudentPhotoWithFolder'
  },
  parentAvatars: {
    title: '家长头像导入',
    format: '.jpg,.png,.jpeg',
    queryKey: 'className',
    tips: '请上传以【手机号】命名的图片',
    importApi: '/user/customerInfo/uploadCustomerPhotoWithoutDingUserId'
  },
  personnelAvatars: {
    title: '后勤人员头像导入',
    format: '.jpg,.png,.jpeg',
    tips: '请上传以【身份证号】或【手机号】或【姓名】命名的图片',
    importApi: '/user/rearPerson/importPhoto'
  },
  teacherAvatars: {
    title: '教师头像导入',
    format: '.jpg,.png,.jpeg',
    tips: '请上传以【教师姓名】或【手机号】命名的图片 (不能包含特殊符号)',
    importApi: '/user/teacherInfo/uploadTeacherPhotoWithoutTeacherNum'
  }
}
