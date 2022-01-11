<template>
  <div class="eEditor-wrap">
    <div :id="idName" v-loading="loading" class="eEditor"></div>
    <div v-if="disabled" class="mask"></div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import E from 'wangeditor'
  import { uploadFileApi } from '../../api/index'
  // 本组件使用方法有两种：
  // 1、如果打开dialog就直接就展示富文本的话，请在父组件el-dialog写上v-if="show"来控制展示，示例参考文件/serviceDeal/form.vue
  // 2、如果打开dialog不展示，点击dialog中某个按钮才展示的话，请在父组件使用本子组件的地方加上:show=''来控制展示，示例参考文件bannerSet.vue
  export default {
    props: {
      value: {
        type: String,
        default() {
          return ''
        }
      },
      idName: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      show: Boolean
    },
    data() {
      return {
        editor: null,
        loading: false,
        maxSize: 2
      }
    },
    watch: {
      show() {
        if (this.show) this.createEditor()
      }
    },
    mounted() {
      if (!this.show) this.createEditor()
    },
    methods: {
      // 创建富文本
      createEditor() {
        const that = this
        that.editor = new E(`#${that.idName}`) // 创建富文本实例
        that.editor.customConfig = {
          colors: [
            '#000',
            '#eeece0',
            '#1c487f',
            '#4d80bf',
            '#c24f4a',
            '#8baa4a',
            '#7b5ba1',
            '#46acc8',
            '#f9963b',
            '#fff',
            '#ff0000',
            '#999',
            '#666',
            '#333'
          ],
          menus: [
            'head', // 标题
            'bold', // 粗体
            'fontSize', // 字号
            'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'link', // 插入链接
            'justify', // 对齐方式
            'quote', // 引用
            'table', // 表格
            'image', // 插入图片
            'undo', // 撤销
            'redo' // 重复
          ],
          uploadFileName: 'file',
          uploadImgMaxSize: 3 * 1024 * 1024,
          uploadImgMaxLength: 999,
          uploadImgHeaders: {},
          zIndex: 1,
          // showLinkImg: false, // 隐藏网络图片功能
          onchange() {
            var html = that.editor.txt.html()
            if (html === '<p><br></p>') html = ''
            that.$emit('input', html)
          }
        }
        that.editor.customConfig.customUploadImg = (files, insert) => {
          that.loading = true
          // 大小判断
          if (files[0].size > that.maxSize * 1024 * 1024) {
            that.$Toast('warning', `请上传${that.maxSize}以内大小的图片`)
          }
          // 根据后台需求数据格式
          const form = new FormData()
          // 文件对象
          form.append('file', files[0])
          form.append('fileType', 10)
          form.append('objectNum', 1)
          uploadFileApi('uploadPic', form)
            .then((res) => {
              insert(res.data.fileAddr)
            })
            .finally(() => {
              that.loading = false
            })
        }
        that.editor.create()
        that.setContent(that.value)
        // 放大
        $(`#${that.idName} .w-e-toolbar`).append(`
        <div class="w-e-menu">
          <a
            id='fullscreen-icon'
            class="el-icon-zoom-in"
            href="javascript:window.toggleFullscreen('#${that.idName}')"
          ></a>
        </div>
      `)
        // 富文本内容
        window.toggleFullscreen = (data) => {
          that.toggleFullscreen(data)
        }
        that.$nextTick(() => {
          // 开启/禁用修改功能
          that.editor.$textElem.attr('contenteditable', !that.disabled)
        })
        // 清空修改器
        // editor.txt.clear()
      },
      toggleFullscreen(editorSelector) {
        $(editorSelector).toggleClass('fullscreen-editor')
        if ($(`${editorSelector} #fullscreen-icon`).hasClass('el-icon-zoom-in')) {
          $(`${editorSelector} #fullscreen-icon`).attr('class', 'el-icon-zoom-out')
        } else {
          $(`${editorSelector} #fullscreen-icon`).attr('class', 'el-icon-zoom-in')
        }
      },
      setContent(content) {
        this.editor.txt.html(content)
      }
    }
  }
</script>

<style scoped lang="scss">
  .eEditor-wrap {
    position: relative;
    .mask {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 40px;
      background-color: rgba(156, 175, 206, 0.06);
      z-index: 10;
      cursor: not-allowed;
    }
    ::v-deep(.eEditor) {
      max-height: 500px;
      overflow-y: auto;
      .w-e-text a {
        color: #1d63e7;
        text-decoration: underline;
      }
      .w-e-toolbar {
        flex-wrap: wrap;
        align-items: center;
        border-radius: 4px 4px 0 0;
        display: flex;
        align-items: center;
        .w-e-menu {
          height: 34px;
          line-height: 40px;
          padding: 0 6px;
          &:last-child {
            position: relative;
            z-index: 11;
            margin-left: auto;
            #fullscreen-icon {
              color: #888;
              font-size: 20px;
              &:hover {
                color: #333;
              }
            }
          }
        }
        .w-e-droplist {
          z-index: 10;
        }
      }
      .w-e-text-container {
        min-height: 360px;
        border-radius: 0 0 4px 4px;
      }
    }
    ::v-deep(div[contenteditable='false']) {
      background-color: rgb(238, 240, 246);
      border-color: rgb(238, 240, 246);
      color: #bbb;
    }
  }
  // 放大
  .fullscreen-editor {
    max-height: 100vh !important;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    z-index: 9999;
    ::v-deep(.w-e-toolbar) {
      // zoom: 1.15;
      // border-radius: 0;
      position: fixed;
      top: 0;
      width: 100%;
    }
    ::v-deep(.w-e-text-container) {
      // top: 40px;
      top: 36px;
      bottom: 0;
      right: 0;
      left: 0;
      height: calc(100% - 36px) !important;
      border-radius: 2px !important;
      position: fixed;
    }
  }
  ::v-deep(.el-loading-mask) {
    right: 6px;
    bottom: 1px;
    left: 6px;
    top: 36px;
  }
</style>
