<template>
  <el-dialog v-model:visible="show" width="60%" :title="curUpload.title">
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
          accept="image/*"
          type="file"
          multiple
          :disabled="chooseDisabled"
          title=""
          @change="chooseFile($event, 'file')"
        />
        <span>选择文件</span>
      </el-button>
      <!-- 选择文件夹按钮 -->
      <el-button
        v-if="curUpload.floderUpload"
        class="chooseFile"
        icon="el-icon-folder"
        type="primary"
        size="small"
        :disabled="chooseDisabled"
      >
        <input
          ref="folderFile"
          type="file"
          multiple
          webkitdirectory
          :disabled="chooseDisabled"
          title=""
          @change="chooseFile($event, 'floder')"
        />
        <span>选择文件夹</span>
      </el-button>
      <!-- 开始上传 -->
      <el-button
        size="small"
        icon="el-icon-upload"
        type="success"
        :loading="loadingInfo.loading"
        :disabled="loadingInfo.disabled"
        @click="startUpload(0)"
      >
        {{ loadingInfo.text }}
      </el-button>
      <!-- 按钮插槽 -->
      <slot name="button" />
      <!-- 下拉框 -->
      <e-selecter
        v-model="status"
        size="small"
        :search-option="statusOptions"
        placeholder="请选择文件状态"
      />
      <!-- 下载失败数据 -->
      <el-button
        size="small"
        type="danger"
        icon="el-icon-download"
        :disabled="!failLists.length || loadingInfo.text == '上传中…'"
        @click="downloadFailData"
      >
        下载失败数据{{ failLists.length ? ` (${failLists.length})` : '' }}
      </el-button>
    </div>
    <!-- 进度条提示 -->
    <div class="progress">
      <!-- 解析文件 -->
      <transition name="fade">
        <p v-if="totalFileNums && loadingInfo.text == '开始上传'">
          <span v-if="totalFileNums == underwayIndex && !chooseDisabled" class="success">
            <i class="el-icon-success"></i>文件解析成功 ({{ underwayIndex }}/{{
              totalFileNums
            }})，请点击【开始上传】</span
          >
          <span v-else class="warning"
            ><i class="el-icon-loading"></i>正在解析文件…({{ underwayIndex }}/{{
              totalFileNums
            }})</span
          >
        </p>
      </transition>
      <!-- 上传文件 -->
      <transition name="fade">
        <p v-if="totalFileNums && loadingInfo.text != '开始上传'">
          <span v-if="totalFileNums == underwayIndex" class="success"
            ><i class="el-icon-success"></i>文件上传完成({{ underwayIndex }}/{{
              totalFileNums
            }})</span
          >
          <span v-else class="warning"><i class="el-icon-loading"></i>正在上传文件…({{ underwayIndex }}/{{
            totalFileNums
          }})</span>
          <el-progress :percentage="percentage" :color="progressBg" />
        </p>
      </transition>
      <span v-if="!totalFileNums" class="info">请先选择文件…</span>
    </div>
    <!-- 文件列表 -->
    <el-table v-loading="loading" size="small" :data="tableData" height="600px">
      <el-table-column type="index" label="序号" min-width="75" />
      <el-table-column label="图片" min-width="80">
        <template #default="scope">
          <img
            class="filePic"
            :src="scope.row.url"
            @click="$previewImage(picLists, scope.$index)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="文件名称" min-width="180" />
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
  </el-dialog>
</template>

<script>
  import { importPictureApi } from '../../../api/index'
  import { compressAccurately } from 'image-conversion'
  import { exportTable } from '../../../utils/filter'
  import { IMPORT_TYPES } from './ImportTypes'
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
      form: Object
    },
    data() {
      return {
        status: '',
        chooseFileWay: '',
        underwayIndex: 1,
        totalFileNums: 0,
        chooseDisabled: false,
        show: false,
        loading: false,
        statusOptions: {
          ready: '待上传',
          loading: '上传中',
          success: '上传成功',
          fail: '上传失败'
        },
        loadingInfo: {
          text: '开始上传',
          disabled: true,
          loading: false
        },
        fileLists: []
      }
    },
    computed: {
      // 图片列表
      picLists() {
        if (!this.isTextType) {
          return this.fileLists.map((file) => file.url)
        } else {
          return []
        }
      },
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
      // 进度条
      percentage() {
        return Math.floor((this.underwayIndex / this.totalFileNums) * 100)
      },
      // 上传失败文件列表
      failLists() {
        return this.fileLists.filter((item) => item.status === 'fail')
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
      chooseFile(e, chooseFileWay) {
        // 选择文件的disabled
        this.chooseDisabled = true
        // 清空筛选条件
        this.status = ''
        // 选择的文件夹还是文件
        this.chooseFileWay = chooseFileWay
        // 当前导入/上传文件归1
        this.underwayIndex = 1
        // 开始上传按钮的状态
        this.loadingInfo = {
          text: '开始上传',
          disabled: true,
          loading: false
        }
        // 表格loading
        this.loading = true
        // 文件列表
        this.fileLists = []
        // 过滤非图片
        var files = []
        for (const file of e.target.files) {
          // 过滤掉非图片文件
          if (file.type.includes('image')) {
            files.push(file)
          }
        }
        // 总文件数量
        this.totalFileNums = files.length
        // 压缩图片
        this.compressPic(files, 0)
      },
      // 压缩图片
      async compressPic(files, currentI) {
        const file = files[currentI]
        var compressFile = file
        // 判定图片大小是否大于1M，大于1M需要压缩
        if (file.size * 1024 * 1024 > 1) {
          // 压缩为1MB
          compressFile = await compressAccurately(file, 500)
          compressFile = new File([compressFile], file.name, {
            type: 'image/jpg',
            lastModified: Date.now()
          })
        }
        this.fileLists.push({
          name: file.name,
          webkitRelativePath: file.webkitRelativePath,
          file: compressFile,
          size: compressFile.size,
          status: 'ready',
          remark: '--',
          url: URL.createObjectURL(compressFile),
          [this.curUpload.queryKey]:
            file.webkitRelativePath && file.webkitRelativePath.split('/').splice(-2)[0]
        })
        this.loading = false
        if (currentI !== files.length - 1) {
          currentI++
          this.compressPic(files, currentI)
          this.underwayIndex++
        } else {
          this.chooseDisabled = false
          this.loadingInfo.disabled = false
        }
      },
      // 开始上传
      startUpload(currentI) {
        // underwayIndex归0
        if (!currentI) this.underwayIndex = 0
        this.loadingInfo = {
          loading: true,
          text: '上传中…',
          disabled: true
        }
        var currentFile = this.fileLists[currentI]
        currentFile.status = 'loading'
        const query = {
          ...this.form,
          [this.curUpload.queryKey]: currentFile[this.curUpload.queryKey]
        }
        importPictureApi(this.curUpload, currentFile.file, query, this.chooseFileWay)
          .then(({ code, msg }) => {
            if (code === 200) {
              currentFile.status = 'success'
              currentFile.remark = '上传成功！'
            } else {
              currentFile.status = 'fail'
              currentFile.remark = msg
            }
          })
          .catch(() => {
            currentFile.status = 'fail'
            currentFile.remark = '网络异常，上传失败…'
          })
          .finally(() => {
            this.underwayIndex = currentI + 1
            if (currentI === this.fileLists.length - 1) {
              this.loadingInfo = {
                loading: false,
                text: '上传完成',
                disabled: true
              }
              // 上传完成清空input
              this.$refs.uploadFile.value = ''
              this.$refs.folderFile.value = ''
              this.$emit('getData')
            } else {
              currentI++
              this.startUpload(currentI)
            }
          })
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
      // 下载失败数据
      downloadFailData() {
        const columns = [
          { prop: 'className', label: '班级' },
          { prop: 'name', label: '名称' },
          { prop: 'remark', label: '失败原因' }
        ]
        // 文件夹上传
        if (this.chooseFileWay === 'floder') {
          exportTable(
            columns,
            this.failLists,
            `【${this.failLists[0].className}】${this.curUpload.title}失败清单`
          )
        } else {
          // 文件上传
          exportTable(columns.slice(1), this.failLists, `${this.curUpload.title}失败清单`)
        }
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
    padding-top: 4px !important;
    // 图片大小
    .filePic {
      border-radius: 2px;
      width: 50px;
      height: 70px;
      margin-bottom: -7px;
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
  }
</style>
