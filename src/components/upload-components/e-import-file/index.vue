<template>
  <el-dialog v-model:visible="show" width="50%" :title="curUpload.title">
    <!-- 表单插槽 -->
    <section v-if="$slots.form" class="slotForm">
      <slot ref="slotForm" name="form" />
    </section>
    <!-- 上传提示 -->
    <p v-if="curUpload.tips" class="tips" v-html="curUpload.tips"></p>
    <!-- 按钮容器 -->
    <div class="toolbar">
      <!-- 选择文件按钮 -->
      <el-button
        class="chooseFile"
        icon="el-icon-document"
        type="primary"
        size="small"
        :disabled="chooseDisabled"
      >
        <input
          ref="uploadFile"
          :accept="accept"
          type="file"
          :multiple="curUpload.multiple"
          :disabled="chooseDisabled"
          title=""
          @change="chooseFile"
        />
        <span>选择文件</span>
      </el-button>
      <!-- 开始上传 -->
      <el-button
        size="small"
        icon="el-icon-upload"
        type="success"
        :loading="loadingInfo.loading"
        :disabled="loadingInfo.disabled"
        @click="beforeUpload"
      >
        {{ loadingInfo.text }}
      </el-button>
      <el-button
        class="marginAuto"
        size="small"
        :loading="downloadLoading"
        type="warning"
        icon="el-icon-download"
        plain
        @click="downLoadModule"
      >
        下载模板
      </el-button>
    </div>
    <!-- 进度条提示 -->
    <div v-if="curUpload.progressRequest" class="progress">
      <!-- 解析文件 -->
      <transition name="fade">
        <p v-if="totalFileNums && loadingInfo.text == '开始上传'">
          <span v-if="totalFileNums == underwayIndex && !chooseDisabled" class="success"
            ><i class="el-icon-success"></i>文件解析成功 ({{ underwayIndex }}/{{
              totalFileNums
            }})，请点击【开始上传】</span
          >
        </p>
      </transition>
      <!-- 上传文件 -->
      <transition name="fade">
        <p v-if="totalFileNums && loadingInfo.text != '开始上传'">
          <span v-if="uploadStatus == 'success'" class="success"
            ><i class="el-icon-success"></i>文件上传完成</span
          >
          <span v-if="uploadStatus == 'fail'" class="fail"
            ><i class="el-icon-error"></i>文件上传失败</span
          >
          <span v-if="uploadStatus == 'underway'" class="warning"><i class="el-icon-loading"></i>正在上传文件…({{ underwayIndex }}/{{
            totalFileNums
          }})</span>
          <el-progress
            v-if="loadingInfo.text != '开始上传'"
            :percentage="percentage"
            :color="progressBg"
          />
        </p>
      </transition>
      <span v-if="!totalFileNums" class="info">请先选择文件…</span>
    </div>
    <!-- 文件列表 -->
    <el-table v-loading="loading" size="small" :data="tableData" max-height="200px">
      <el-table-column type="index" label="序号" width="70" />
      <el-table-column prop="name" label="文件名称" width="300" />
      <el-table-column prop="name" label="文件状态" min-width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.status == 'ready'" type="warning">待上传</el-tag>
          <el-tag v-if="scope.row.status == 'loading'" type="primary">上传中…</el-tag>
          <el-tag v-if="scope.row.status == 'fail'" type="danger">上传失败</el-tag>
          <el-tag v-if="scope.row.status == 'success'" type="success">上传成功</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注信息" min-width="300">
        <template #default="scope">
          <span :class="scope.row.status">{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="scope">
          <!-- 解析中、上传中、上传成功，无法删除文件 -->
          <el-button
            icon="el-icon-delete"
            type="text"
            class="danger"
            size="small"
            :disabled="loadingInfo.loading || loadingInfo.disabled || Boolean(scope.row.remark)"
            @click="removeFile(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 结果列表 -->
    <p v-show="uploadResult.length" class="result" v-html="uploadResultTips"></p>
    <transition name="fade">
      <el-table v-if="uploadResult.length" border :data="uploadResult" max-height="525" size="mini">
        <el-table-column prop="index" label="行数" width="70">
          <template #default="scope">
            <span v-if="typeof scope.row.index == 'number'">{{ scope.row.index + 2 }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="300">
          <template>
            <el-tag type="danger">导入失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="msg" label="备注信息" min-width="300">
          <template #default="scope">
            <span class="fail">{{ scope.row.msg }}</span>
          </template>
        </el-table-column>
      </el-table>
    </transition>
  </el-dialog>
</template>

<script>
  import {
    importFileApi,
    importFileProcessApi,
    importFileResultApi,
    downModuleApi
  } from '../../../api/index'
  import { IMPORT_TYPES } from './ImportTypes'
  import { downFile } from '../../../utils/filter'
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      importType: {
        type: String,
        default() {
          return ''
        },
        required: true
      },
      // 显隐
      value: Boolean,
      // 表单数据
      form: Object,
      // 表单验证ref
      refName: {
        type: String,
        default() {
          return ''
        }
      },
      // 上传需要验证
      uploadNeedValid: {
        type: Boolean,
        default() {
          return true
        }
      }
    },
    data() {
      return {
        uploadStatus: 'start',
        percentage: 0,
        status: '',
        underwayIndex: 1,
        totalFileNums: 0,
        chooseDisabled: false,
        show: false,
        loading: false,
        downloadLoading: false,
        uploadResultTips: '导入结果',
        loadingInfo: {
          text: '开始上传',
          disabled: true,
          loading: false
        },
        fileLists: [],
        uploadResult: []
      }
    },
    computed: {
      // 表格数据
      tableData() {
        if (this.status) {
          return this.fileLists.filter((item) => item.status === this.status)
        } else {
          return this.fileLists
        }
      },
      // 当前上传信息
      curUpload() {
        return IMPORT_TYPES[this.importType] || {}
      },
      // 上传失败文件列表
      failLists() {
        return this.fileLists.filter((item) => item.status === 'fail')
      },
      // 文件格式
      accept() {
        return this.curUpload.format || '.xls,.xlsx'
      }
    },
    watch: {
      value() {
        this.show = this.value
      },
      show() {
        this.$emit('input', this.show)
        if (!this.show) {
          Object.assign(this.$data, this.$options.data())
        }
      }
    },
    methods: {
      // 选择文件
      chooseFile(e) {
        // 选择文件的disabled
        this.chooseDisabled = false
        // 当前导入/上传文件归1
        this.underwayIndex = 1
        // 文件列表
        this.fileLists = []
        // 清空结果
        this.uploadResultTips = '导入结果'
        this.uploadResult = []
        for (const file of e.target.files) {
          this.fileLists.push({
            name: file.name,
            file: file,
            status: 'ready'
          })
        }
        // 总文件数量
        this.totalFileNums = this.fileLists.length
        this.loadingInfo = {
          text: '开始上传',
          disabled: false,
          loading: false
        }
        // 清空上传框
        this.$refs.uploadFile.value = ''
      },
      // 上传之前
      beforeUpload() {
        // 有refName且上传需要验证才验证
        if (this.refName && this.uploadNeedValid) {
          this.$parent.$refs[this.refName].validate((valid) => {
            if (valid) this.startUpload(0)
          })
        } else {
          this.startUpload(0)
        }
      },
      // 上传
      startUpload(currentI) {
        this.uploadStatus = 'underway'
        // underwayIndex归0
        if (!currentI) this.underwayIndex = 0
        this.loadingInfo = {
          loading: true,
          text: '上传中…',
          remark: '',
          disabled: true
        }
        var currentFile = this.fileLists[currentI]
        currentFile.status = 'loading'
        importFileApi(this.curUpload, currentFile.file, this.form)
          .then((res) => {
            // 请求成功
            if (res.code === 200) {
              // 需要进度条
              if (this.curUpload.progressRequest) {
                // 进度key
                this.uploadKey = res.data
                this.onProgress(currentFile)
              } else {
                this.uploadSuccess(currentFile, res)
              }
            } else {
              // 请求失败
              this.uploadFail(currentFile, res.msg)
            }
          })
          .finally(() => {
            this.underwayIndex = currentI + 1
            if (currentI !== this.fileLists.length - 1) {
              currentI++
              this.startUpload(currentI)
            }
          })
      },
      // 获取进度
      onProgress(currentFile) {
        importFileProcessApi(
          this.curUpload.progressRequest.progressApi,
          this.$FQ({ key: this.uploadKey })
        )
          .then(({ data }) => {
            // state导入状态：1正在解析文件、2正在处理数据、3导入失败、4导入完成
            switch (data.state) {
              // 正在解析文件
              case 1:
                this.progressTimer = setTimeout(() => {
                  this.onProgress(currentFile)
                }, 1500)
                return
              // 正在处理数据
              case 2:
                this.percentage = (data.current / data.total).toFixed(1) * 100
                this.progressTimer = setTimeout(() => {
                  this.onProgress(currentFile)
                }, 1500)
                return
              // 导入失败
              case 3:
                this.uploadFail(currentFile, data.msg)
                return
              // 导入完成
              case 4:
                this.percentage = 100
                // 获得结果
                importFileResultApi(
                  this.curUpload.progressRequest.progressResultApi,
                  this.$FQ({ key: this.uploadKey })
                ).then((res) => {
                  this.uploadSuccess(currentFile, res)
                })
            }
          })
          .catch(() => {
            this.uploadFail()
          })
      },
      // 导入成功
      uploadSuccess(currentFile, res) {
        currentFile.status = 'success'
        currentFile.remark = '上传成功！'
        const resultData = res.errList || res.data || []
        if (!resultData.length) {
          // 全部上传成功
          this.uploadResultTips = '<span class=\'success\'>全部导入成功！</span>'
        } else {
          const failLists = resultData.filter((item) => !item.state)
          this.uploadResultTips = `
          导入结果：导入成功【<span class='success'>${
            resultData.length - failLists.length
          }</span>】条，
          失败【<span class='fail'>${failLists.length}</span>】条，表格仅展示导入失败的数据
        `
          this.uploadResult = resultData.filter((item) => !item.state)
        }
        this.uploadStatus = 'success'
        this.$emit('getData')
        this.uploadFinally()
        this.loadingInfo.text = '上传成功'
      },
      // 导入失败
      uploadFail(currentFile, msg = '导入失败，请重试…') {
        currentFile.remark = msg
        currentFile.status = 'fail'
        this.uploadStatus = 'fail'
        this.uploadFinally()
        this.loadingInfo.text = '上传失败'
      },
      // 导入完成
      uploadFinally() {
        clearTimeout(this.progressTimer)
        // 开始上传按钮的状态
        this.loadingInfo = {
          disabled: true,
          loading: false
        }
      },
      // 移除文件
      removeFile(i) {
        this.fileLists.splice(i, 1)
        this.underwayIndex--
        this.totalFileNums--
        if (!this.fileLists.length) {
          // 开始上传按钮的状态
          this.loadingInfo = {
            text: '开始上传',
            disabled: true,
            loading: false
          }
        }
      },
      // 下载模版
      downLoadModule() {
        const url = this.curUpload.templateUrl
        const requestTemplete = this.curUpload.requestTemplete
        return new Promise((resolve, reject) => {
          // 需要表单验证
          if (this.refName && !url) {
            this.$parent.$refs[this.refName].validate((valid) => {
              if (valid) resolve()
            })
          } else {
            // 直接下载
            resolve()
          }
        }).then(() => {
          this.downloadLoading = true
          // 直接下载模版
          if (url) {
            window.open(url, '_self')
            this.downloadLoading = false
          } else {
            // 请求接口下载模版
            var query = {}
            for (var item of this.curUpload.queryKeys) {
              query[item] = this.form[item]
            }
            downModuleApi(requestTemplete.api, this.$FQ(query))
              .then((data) => {
                downFile(data, requestTemplete.name)
              })
              .finally(() => {
                this.downloadLoading = false
              })
          }
        })
      },
      // 进度条颜色变化
      progressBg(percentage) {
        if (percentage < 30) {
          return '#e6a23c'
        } else if (percentage < 80) {
          return '#409EFF'
        } else {
          return '#67C23A'
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
  ::v-deep(.el-dialog__body) {
    padding-top: 8px !important;
    height: 780px;
    // 表单插槽
    .slotForm {
      background: #f8f8f8;
      padding-top: 20px;
      margin-bottom: 12px;
      border-radius: 2px;
      overflow: hidden;
    }
    // toolbar
    .toolbar {
      // 选择文件
      .chooseFile {
        overflow: hidden;
        position: relative;
        input {
          position: absolute;
          top: 0;
          right: 0;
          margin: 0;
          padding: 0;
          font-size: 20px;
          cursor: pointer;
          opacity: 0;
        }
      }
      .eSelecter {
        margin-right: 10px;
        width: 150px;
        margin-left: auto;
      }
    }
    // 提示
    .tips {
      margin-bottom: 8px;
      font-size: 14px;
      color: #f56c6c;
      line-height: 1.6;
    }
    // 垃圾桶
    .el-icon-delete + span {
      margin-left: 2px;
    }
    span {
      &.fail {
        color: $danger;
      }
      &.success {
        color: $success;
      }
      &.warning {
        color: $warning;
      }
      &.info {
        color: #909399;
      }
      .el-icon-success,
      .el-icon-loading {
        font-size: 16px;
        position: relative;
        top: 1px;
        margin-right: 2px;
      }
    }
    // 进度条
    .progress {
      height: 44px;
      line-height: 44px;
      padding: 0 12px;
      border: 1px solid #ebeef5;
      border-bottom: 0;
      text-align: center;
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        .el-progress {
          flex: 1;
          display: flex;
          align-items: center;
          .el-progress-bar {
            margin-right: 0;
            padding-right: 0;
            margin-left: 10px;
            flex: 1;
          }
        }
      }
    }
    .result {
      height: 44px;
      line-height: 44px;
      text-align: left;
      color: #666;
    }
  }
</style>
