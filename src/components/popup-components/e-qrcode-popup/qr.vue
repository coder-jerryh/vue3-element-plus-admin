<template>
  <el-dialog
    width="20%"
    :title="title"
    center
    :visible.sync="show"
    destroy-on-close
    :close-on-click-modal="false">
    <div class="qrBox">
      <vue-qr :text="QRtext"  colorDark="#f67b29" colorLight="#fff" :logoScale="0.3" :size="300"/>
    </div>
  </el-dialog>
</template>

<script>

import vueQr from 'vue-qr'
export default {
  components: {
    vueQr
  },
  show () {
    if (!this.show) {
      const timer = setTimeout(() => {
        this.$destroy()
        clearTimeout(timer)
      }, 300)
    }
  },
  data () {
    return {
      show: false,
      QRtext: '',
      title: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .qrBox{
    display: flex;
    img{
      margin: 0 auto;
    }
  }
</style>
