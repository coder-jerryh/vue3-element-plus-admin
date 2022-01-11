<template>
  <el-dialog
    class="Cropper"
    append-to-body
    :visible.sync="dialogVisible"
    width="600px"
    title="裁剪图片"
    center
    :before-close="handleClose">
    <div class="cropper-container">
      <div class="cropper-el">
        <vue-cropper
          ref="cropper"
          :img="cropperImg"
          :output-size="option.size"
          :output-type="option.outputType"
          :info="true"
          :full="option.full"
          :can-move="option.canMove"
          :can-move-box="option.canMoveBox"
          :fixed-box="option.fixedBox"
          :original="option.original"
          :auto-crop="option.autoCrop"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :center-box="option.centerBox"
          :high="option.high"
          :info-true="option.infoTrue"
          @realTime="realTime"
          :enlarge="option.enlarge"
          :fixed="option.fixed"
          :fixed-number="option.fixedNumber"
        />
      </div>
      <!-- 预览 -->
      <!-- <div class="prive-el">
        <h1>预览</h1>
        <div class="prive-style">
          <div class="preview" :style="previews.div">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
      </div> -->
    </div>
    <div slot="footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="saveImg">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  name: 'Cropper',
  components: {
    VueCropper
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    imgType: {
      type: String,
      // blob、image
      default: 'image'
    },
    cropperImg: {
      type: String,
      default: ''
    },
    fixedNumber: {
      type: Array,
      default () {
        return [1, 1]
      }
    }
  },
  watch: {
    dialogVisible () {
      if (this.dialogVisible) {
        this.option.fixedNumber = this.fixedNumber
      }
    }
  },
  data () {
    return {
      previews: {},
      option: {
        img: '', // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量
        full: true, // 是否输出原图比例的截图 默认false
        outputType: 'png', // 裁剪生成图片的格式 默认jpg
        canMove: false, // 上传图片是否可以移动
        fixedBox: false, // 固定截图框大小 不允许改变
        original: false, // 上传图片按照原始比例渲染
        canMoveBox: true, // 截图框能否拖动
        autoCrop: true, // 是否默认生成截图框
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 500, // 默认生成截图框宽度
        autoCropHeight: 500, // 默认生成截图框高度
        centerBox: true, // 截图框是否被限制在图片里面
        high: true, // 是否按照设备的dpr 输出等比例图片
        enlarge: 1, // 图片根据截图框输出比例倍数
        mode: 'contain', // 图片默认渲染方式
        maxImgSize: 2000, // 限制图片最大宽度和高度
        limitMinSize: [100, 120], // 更新裁剪框最小属性
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        fixed: true, // 是否开启截图框宽高固定比例  (默认:true)
        fixedNumber: [1, 1] // 截图框的宽高比例
      }
    }
  },
  methods: {
    // 裁剪时触发的方法，用于实时预览
    realTime (data) {
      this.previews = data
    },
    // 取消关闭弹框
    handleClose () {
      this.$emit('closeCropper')
    },
    // 获取裁剪之后的图片，默认blob，也可以获取base64的图片
    saveImg () {
      if (this.imgType === 'blob') {
        // blob转file
        this.$refs.cropper.getCropBlob(data => {
          this.$emit('upload-img', data)
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          if (this.imgType === 'image') {
            this.$emit('upload-img', this.dataURLtoFile(data, 'XX'))
          } else {
            this.$emit('upload-img', data)
          }
        })
      }
    },
    // 将base64转换为文件
    dataURLtoFile (dataurl, filename) {
      const arr = dataurl.split(',')
      // const type = arr[0].match(/:(.*?);/)[1]
      const type = 'jpg'
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `x.${type}`, { type: `image/${type}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.Cropper {
  .cropper-el {
    height: 500px;
    width: 500px;
  }
  .cropper-container {
    display: flex;
    justify-content: center;
    // .prive-el {
    //   height: 164px;
    //   width: 94px;
    //   flex: 1;
    //   text-align: center;
    //   h1{
    //     font-size: 18px;
    //     margin-left: 40px;
    //     margin-bottom: 20px;
    //     margin-top: 20px;
    //   }
    //   .prive-style {
    //     margin: 0 auto;
    //     flex: 1;
    //     -webkit-flex: 1;
    //     display: flex;
    //     display: -webkit-flex;
    //     justify-content: center;
    //     -webkit-justify-content: center;
    //     overflow: hidden;
    //     background: #ededed;
    //     margin-left: 40px;
    //   }
    //   .preview {
    //     overflow: hidden;
    //   }
    //   .el-button {
    //     margin-top: 20px;
    //   }
    // }
  }
}
</style>
