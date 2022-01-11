<template>
  <div class="upload-wrap" :class="[size, { 'upload-text-wrap': type == 'text' }]">
    <el-upload
      ref="upload"
      :class="{ hideUpload: hideUpload || fileLists.length >= limit || disabled }"
      :accept="acceptFileType"
      :limit="limit"
      :list-type="type"
      :file-list="fileLists"
      :disabled="disabled"
      :headers="headers"
      action=""
      :http-request="onUpload"
      :on-preview="preview"
      :on-change="selectFile"
      :before-upload="beforeUpload"
      :on-remove="removeFile"
      :auto-upload="!openCropper"
    >
      <section v-if="type == 'text'" flex-center>
        <!-- 文本上传 -->
        <el-button
          :disabled="disabled || fileLists.length >= limit"
          size="small"
          type="warning"
          icon="el-icon-upload2"
        >
          点击上传
        </el-button>
        <!-- 提示 -->
        <p v-if="placeholder" class="placeholder">*提示：{{ placeholder }}</p>
      </section>
      <!-- 图片上传 -->
      <i v-else class="el-icon-plus"></i>
    </el-upload>
    <!-- 无图，只读 -->
    <div v-if="type != 'text' && !fileLists.length && disabled" class="noData">无</div>
    <slot />
    <!-- 预览弹窗 -->
    <el-dialog
      v-model:visible="dialogVisible"
      size="tiny"
      :modal="true"
      append-to-body
      width="fit-content"
      title="图片预览"
    >
      <img style="width: 400px" :src="dialogImageUrl" />
    </el-dialog>
    <!-- 上传头像失败信息提示弹窗 -->
    <el-dialog
      v-model:visible="errorShow"
      width="50%"
      size="tiny"
      :modal="true"
      append-to-body
      title="上传失败提示"
    >
      <div class="errorInfo">
        <p class="top">上传失败原因：{{ errorInfo.msg }}</p>
        <div class="bottom">
          <div class="errorPic">
            <img :src="errorInfo.imageUrl" />
          </div>
          <ul>
            <li>
              <label>类别</label>
              <i>建议取值</i>
              <span>当前值</span>
            </li>
            <li>
              <label>清晰度</label>
              <i>≥0.6</i>
              <span :class="{ error: errorInfo.clearity < 0.6 }">{{
                errorInfo.clearity || 0
              }}</span>
            </li>
            <li>
              <label>特征点置信度</label>
              <i>≥0.85</i>
              <span :class="{ error: errorInfo.pointsQuality < 0.85 }">{{
                errorInfo.pointsQuality || 0
              }}</span>
            </li>
            <li>
              <label>瞳距</label>
              <i>≥40.0</i>
              <span :class="{ error: errorInfo.eyeDistance < 40 }">{{
                errorInfo.eyeDistance || 0
              }}</span>
            </li>
            <li>
              <label>俯仰角</label>
              <i>-15.0 ~ 15.0</i>
              <span :class="{ error: errorInfo.posePitch < -15 || errorInfo.posePitch > 15 }">{{
                errorInfo.posePitch || 0
              }}</span>
            </li>
            <li>
              <label>左右角</label>
              <i>-20.0 ~ 20.0</i>
              <span :class="{ error: errorInfo.poseYaw < -20 || errorInfo.poseYaw > 20 }">{{
                errorInfo.poseYaw || 0
              }}</span>
            </li>
            <li>
              <label>可见性</label>
              <i>≥0.8</i>
              <span :class="{ error: errorInfo.uncovered < 0.8 }">{{
                errorInfo.uncovered || 0
              }}</span>
            </li>
            <li>
              <label>总评分</label>
              <i>≥0.6</i>
              <span :class="{ error: errorInfo.totalQuality < 0.6 }">{{
                errorInfo.totalQuality || 0
              }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="errorShow = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 裁剪图片 -->
    <e-cropper
      :fixed-number="fixedNumber"
      :dialog-visible="showCropper"
      :cropper-img="cropperImg"
      @closeCropper="closeCropper"
      @upload-img="cropperComplete"
    />
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  import {
    compressAccurately,
    imagetoCanvas,
    canvastoFile,
    filetoDataURL,
    dataURLtoImage
  } from 'image-conversion'
  import { uploadFileApi } from '../../../api/index'
  import eCropper from './e-cropper.vue'
  // 文本类型文件
  const textFileTypes = '.docx,.doc,.pdf,.xlsx,.xls'
  export default defineComponent({
    components: {
      eCropper
    },
    props: {
      // 上传框类型
      type: {
        type: String,
        default() {
          return 'picture-card'
          // 可选值：picture-card、text
        }
      },
      // 接受的文件类型
      accept: {
        type: [String, Array],
        default() {
          return ''
          // 举个🌰：'.xls' 或者 ['.xls', '.pdf']
        }
      },
      // 是否压缩
      compress: {
        type: Boolean,
        default() {
          return false
        }
      },
      // 提示
      placeholder: {
        type: String,
        default() {
          return ''
        }
      },
      // 压缩大小
      compressSize: {
        type: [String, Number],
        default() {
          return 200
        }
      },
      // 上传接口url
      uploadApi: {
        type: String,
        default() {
          return 'uploadPic'
        }
      },
      // 额外参数
      queryData: {
        type: Object,
        default() {
          return {}
        }
      },
      // 绑定值
      value: [String, Array],
      // 最大上传数量
      limit: {
        type: Number,
        default() {
          return 1
        }
      },
      // 只读
      disabled: {
        type: Boolean,
        default() {
          return false
        }
      },
      // 大小限制
      maxSize: {
        type: Number,
        default() {
          return 10
        }
      },
      // 开启裁剪
      openCropper: {
        type: Boolean,
        default() {
          return false
        }
      },
      // 裁剪比例
      fixedNumber: {
        type: Array,
        default() {
          return [1, 1]
        }
      },
      // 压缩图片
      zipFile: {
        type: Boolean,
        default() {
          return true
        }
      },
      handleAvater: {
        type: Boolean,
        default() {
          return false
        }
      },
      fixedSize: {
        type: Array,
        default() {
          return [500, 700]
        }
      },
      size: {
        type: String,
        default() {
          return 'medium'
        }
      }
    },
    data() {
      return {
        errorShow: false,
        errorInfo: {
          data: {}
        },
        // 是否上传成功
        uploadSuccessFlag: true,
        headers: {},
        hideUpload: false,
        dialogVisible: false,
        dialogImageUrl: '',
        cropperImg: '', // 需要裁剪的图片
        showCropper: false, // 是否显示裁剪框
        cropperFile: '' // 裁剪后的文件
      }
    },
    computed: {
      // 文件列表
      fileLists() {
        if (this.value) {
          return this.value.split(',').map((url, i) => {
            return {
              name: `文件${i + 1}.${url.split('.').pop()}`,
              url
            }
          })
        } else {
          return []
        }
      },
      // 接受的文本类型
      acceptFileType() {
        // 指定类型
        if (this.accept) {
          // accept为数组
          if (typeof this.accept === 'object') {
            return this.accept.join()
          } else {
            // accept为字符串
            return this.accept
          }
        } else if (this.type === 'picture-card') {
          // 图片类型
          return 'image/*'
        } else {
          // 文本类型
          return textFileTypes
        }
      }
    },
    watch: {
      fileLists() {
        if (this.value) {
          this.hideUpload = this.value.length === this.limit
        } else {
          this.hideUpload = false
        }
      }
    },
    created() {
      this.headers = {
        token: sessionStorage.userToken
      }
    },
    methods: {
      // 选择文件
      selectFile(file) {
        const { raw } = file
        // 需要裁剪
        if (this.openCropper) {
          this.beforeUpload(raw)
        }
      },
      // 上传之前
      beforeUpload(file) {
        // 上传数量判断
        if (this.fileLists.length >= this.limit) {
          this.$Toast('warning', `最多能上传${this.limit}张图片`)
          this.uploadFail(file)
          return false
        }
        // 大小判断
        if (file.size > this.maxSize * 1024 * 1024) {
          this.$Toast('warning', `请上传${this.maxSize}M以内大小的图片`)
          this.uploadFail(file)
          return false
        }
        if (this.fileLists.length + 1 === this.limit) {
          this.hideUpload = true
        }
        // 需要裁剪
        if (this.openCropper) {
          var reader = new FileReader()
          reader.onload = (e) => {
            let data
            if (typeof e.target.result === 'object') {
              // 把Array Buffer转化为blob 如果是base64不需要
              data = window.URL.createObjectURL(new Blob([e.target.result]))
            } else {
              data = e.target.result
            }
            this.cropperImg = data
          }
          // 转化为base64
          // reader.readAsDataURL(file)
          // 转化为blob
          reader.readAsArrayBuffer(file)
          this.showCropper = true
        } else {
          return true
        }
      },
      // 裁剪之后开始上传图片
      cropperComplete(file) {
        this.cropperFile = file
        this.$refs.upload.submit()
        this.showCropper = false
      },
      async handleAvaterFun(file) {
        // 得到base64对象
        const dataURL = await filetoDataURL(file)
        // 得到image对象
        const imageObj = await dataURLtoImage(dataURL)
        // 得到裁剪后canvas对象
        const canvasObj = await imagetoCanvas(imageObj, {
          width: this.fixedSize[0],
          height: this.fixedSize[1]
        })
        // canvas对象转file对象
        const compressFile = await canvastoFile(canvasObj)
        // 压缩后return
        return compressAccurately(compressFile, this.compressSize)
      },
      // 上传
      onUpload(param) {
        // 获取裁剪的图片
        if (this.openCropper) {
          param.file = this.cropperFile
        }
        // 头像处理
        if (this.handleAvater) {
          this.handleAvaterFun(param.file, this.compressSize).then((res) => {
            param.file = res
            this.upToServer(param)
          })
          return
        }
        // 只压缩处理
        if (this.compress) {
          compressAccurately(param.file, this.compressSize).then((res) => {
            param.file = res
            this.upToServer(param)
          })
        } else {
          this.upToServer(param)
        }
      },
      upToServer(param) {
        param.file = new File([param.file], param.file.name, {
          type: 'image/jpg',
          lastModified: Date.now()
        })
        // 根据后台需求数据格式
        const form = new FormData()
        // 文件对象
        form.append('file', param.file)
        // 组装向后台传递的参数
        for (const key in this.queryData) {
          form.append(key, this.queryData[key])
        }
        param.file.percent = 99
        param.onProgress(param.file)
        uploadFileApi(this.uploadApi, form)
          .then((res) => {
            this.uploadSuccess(res.data.imageUrl || res.data.fileAddr)
            this.$emit('uploadSuccess', res.data)
          })
          .catch((data) => {
            this.$emit('uploadError', data)
            if (this.handleAvater) {
              this.showErrorImage(data)
            }
            this.uploadSuccessFlag = false
            this.uploadFail(param.file)
          })
          .finally(() => {
            this.showCropper = false
          })
      },
      // 删除文件
      removeFile(file, files) {
        const fileLists = this.fileLists.filter((e) => e.url !== file.url)
        this.$emit('input', fileLists.map((item) => item.url).join())
        this.hideUpload = false
        if (!this.uploadSuccessFlag) return
        this.$emit('removeFile', file.url)
      },
      // 上传成功
      uploadSuccess(url) {
        this.uploadSuccessFlag = true
        var fileLists = this.fileLists.map((item) => item.url)
        fileLists.push(url)
        this.$emit('input', fileLists.join())
      },
      preview(file) {
        // 文本文件
        if (this.type === 'text') {
          // window.open('http://elzx.oss-cn-chengdu.aliyuncs.com/elink-cloud/2021/1/5/宿舍学生批量入住导入模板.xls')
          window.open(file.url)
        } else {
          // 图片
          this.dialogImageUrl = file.url
          this.dialogVisible = true
        }
      },
      // 展示错误图片信息
      showErrorImage(data) {
        // 控制弹窗只显示一个
        this.delMsgDom()
        var msgHTML = `<p>${data.msg}</p>`
        // 有错误图片、表格
        if (data.data) {
          this.errorInfo = {
            ...data,
            ...data.data,
            ...JSON.parse(data.data.result || '{}')
          }
          this.errorShow = true
        } else {
          this.$Alert('上传失败提示', msgHTML)
        }
      },
      // 上传失败
      uploadFail(file) {
        this.hideUpload = this.fileLists.length === this.limit
        this.uploadSuccessFlag = false
        this.$refs.upload.handleRemove(file)
      },
      // 关闭裁剪图片弹窗
      closeCropper() {
        this.showCropper = false
        this.uploadFail()
      },
      // 控制弹窗只显示一个
      delMsgDom() {
        var elClass = '.el-message-box__wrapper'
        var el = document.querySelector(elClass)
        if (el) {
          el.parentNode.removeChild(el)
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
  $size: 136px;
  .upload-wrap {
    margin-bottom: -15px;
    min-height: $size;
    min-width: $size;
    &.mini {
      zoom: 0.8;
      ::v-deep(.el-icon-zoom-in),
      ::v-deep(.el-icon-delete) {
        zoom: 1.4;
        position: relative;
        top: 5px;
      }
    }
    // 上传文本
    &.upload-text-wrap {
      min-height: auto;
      min-width: auto;
      // 文本列表样式
      ::v-deep(.el-upload-list) {
        margin-bottom: 10px;
        i {
          font-size: 16px;
        }
        .el-upload-list__item-status-label {
          top: 58%;
          transform: translateY(-50%);
        }
        .el-icon-close {
          font-size: 18px;
          color: rgb(220, 82, 82);
        }
      }
      // 文本类型挡住上传按钮
      ::v-deep(.hideUpload) {
        position: relative;
        &::before {
          content: '';
          display: inline-block;
          left: 0;
          right: 0;
          height: 38px;
          position: absolute;
          z-index: 1;
          cursor: not-allowed;
        }
      }
    }
    // 提示
    .placeholder {
      margin-left: 10px;
      font-size: 13px;
      color: #e6a23c;
    }
    ::v-deep(.el-upload-list__item) {
      transition: none !important;
      margin-bottom: 0;
    }
    ::v-deep(.el-upload) {
      &.el-upload--picture-card {
        line-height: 174px;
        margin-bottom: 15px;
        .el-icon-plus {
          font-size: 50px;
          color: #bbb;
        }
      }
    }
    ::v-deep(.hideUpload .el-upload--picture-card) {
      display: none;
    }
    .noData {
      width: $size;
      height: $size;
      border: 1px solid #e4e7ed;
      text-align: center;
      line-height: $size;
      background-color: #f5f7fa;
      color: #c0c4cc;
      border-radius: 4px;
      font-size: 16px;
      cursor: not-allowed;
    }
    ::v-deep(.el-progress.el-progress--circle) {
      position: relative;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #fbfdff;
      z-index: 100;
      transition: all ease 0.3s;
      &::before {
        display: inline-block;
        font-family: element-icons;
        content: '\e6cf';
        font-size: 24px;
        color: #409eff;
        animation: rotating 2s linear infinite;
      }
      &::after {
        display: inline-block;
        content: '上传中…';
        margin-top: 8px;
        font-size: 14px;
        color: #409eff;
      }
      .el-progress-circle,
      .el-progress__text {
        display: none;
      }
    }
  }
  .errorInfo {
    border-radius: 4px;
    width: fit-content;
    margin: 0 auto;
    .bottom {
      display: flex;
      align-items: center;
      height: 260px;
      font-size: 0;
      .errorPic {
        border: 1px solid #eee;
        padding: 10px;
        img {
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
          width: 190px;
          height: 250px;
          border-radius: 6px;
        }
      }
      ul {
        border-top: 1px solid #eee;
        border-right: 1px solid #eee;
        height: 272px;
        display: flex;
        flex-direction: column;
        font-size: 15px;
        li {
          border-bottom: 1px solid #eee;
          flex: 1;
          display: flex;
          align-items: center;
          text-align: left;
          color: #444;
          * {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
            width: 150px;
            height: 100%;
          }
          label {
            border-right: 1px solid #eee;
          }
          i {
            border-right: 1px solid #eee;
            color: #409eff;
          }
          span {
            color: #666;
            &.error {
              color: #f56c6c;
            }
          }
        }
        li:first-child {
          * {
            font-size: 16px;
            color: #333;
            font-weight: bold;
          }
        }
      }
    }
    .top {
      margin-bottom: 6px;
      border: 1px solid #eee;
      border-bottom: 0;
      text-align: left;
      width: 100%;
      padding: 10px 20px;
      color: #f56c6c;
      font-size: 15px;
    }
  }
</style>
