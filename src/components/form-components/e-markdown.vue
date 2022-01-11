<template>
  <mavon-editor
    ref="md"
    v-model="markdownValue"
    v-loading="loading"
    :placeholder="placeholder"
    :toolbars="toolbars"
    style="height: 600px"
    :class="{ previewModel, disabled }"
    :editable="!disabled"
    @imgAdd="handleEditorImgAdd"
    @imgDel="handleEditorImgDel"
    @change="change"
  />
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import { uploadFileApi } from '../../api/index'
  export default {
    components: {
      mavonEditor
    },
    props: {
      // 内容
      value: {
        type: String,
        default() {
          return ''
        }
      },
      // 占位符
      placeholder: {
        type: String,
        default() {
          return '请输入内容'
        }
      },
      // 预览模式
      previewModel: {
        type: Boolean,
        default() {
          return false
        }
      },
      // 只读模式
      disabled: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        loading: false,
        markdownValue: '',
        toolbars: {
          bold: false, // 粗体
          italic: false, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: false, // code
          table: true, // 表格
          fullscreen: false, // 全屏修改
          readmodel: false, // 沉浸式阅读
          htmlcode: false, // 展示html源码
          help: false, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: false, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: false, // 单双栏模式
          preview: false // 预览
        }
      }
    },
    watch: {
      value: {
        handler() {
          this.markdownValue = this.value
        },
        immediate: true
      }
    },
    methods: {
      // 监听markdown变化
      change(value, markdownValue) {
        this.$emit('input', value)
      },
      // 上传图片接口pos 表示第几个图片
      handleEditorImgAdd(pos, $file) {
        this.loading = true
        var formdata = new FormData()
        // 文件对象
        formdata.append('file', $file)
        formdata.append('fileType', 10)
        formdata.append('objectNum', 1)
        uploadFileApi('uploadPic', formdata)
          .then((res) => {
            this.$refs.md.$img2Url(pos, res.data.fileAddr)
          })
          .finally(() => {
            this.loading = false
          })
      },
      handleEditorImgDel() {
        // 删除图片要做的事
      }
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep(.v-right-item) {
    display: none;
  }
  .markdown-body {
    overflow: hidden;
    box-shadow: none !important;
    border: 1px solid #dcdfe6 !important;
    ::v-deep(.v-note-op) {
      border-bottom: 1px solid #dcdfe6;
    }
    // 添加超链接的弹窗
    ::v-deep(.op-btn) {
      width: 40% !important;
    }
    &.disabled {
      ::v-deep(.v-note-op) {
        display: none;
      }
    }
    &.previewModel {
      border: none !important;
      ::v-deep(.v-note-edit),
      ::v-deep(.v-note-op) {
        display: none;
      }
      ::v-deep(.v-note-show) {
        border-radius: 4px;
        border: 1px solid #dcdfe6 !important;
      }
    }
  }
</style>
