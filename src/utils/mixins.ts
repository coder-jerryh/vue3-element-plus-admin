// import Vue from 'vue'
export const mixins = {
  // name: router.path,
  data() {
    return {
      // 解决keepAlive和watch冲突
      activatedFlag: false,
      btnLoading: false
    }
  },
  watch: {
    refreshFlag() {
      if (this.activatedFlag) {
        this.loaading = true
        // 回到第一页
        if (this.pages) {
          this.pages.current = 1
        }
        this.tableData = []
      }
    }
  },
  mounted() {
    this.activatedFlag = true
  },
  activated() {
    this.activatedFlag = true
  },
  deactivated() {
    this.activatedFlag = false
  }
}
