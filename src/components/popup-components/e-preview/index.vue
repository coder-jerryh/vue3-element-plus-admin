<template>
  <el-dialog v-model:visible="show" width="800px" append-to-body>
    <el-carousel
      trigger="click"
      height="600px"
      :autoplay="false"
      :initial-index="current"
      :arrow="picLists.length > 1 ? 'always' : 'never'"
      :class="{ onePic: picLists.length == 1 }"
    >
      <el-carousel-item v-for="(item, i) in picLists" :key="i">
        <img v-show="show" class="pic" :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
    <div slot="footer">
      <el-button @click="show = false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        picLists: [],
        current: 0
      }
    },
    watch: {
      show() {
        if (!this.show) {
          // 销毁组件
          const timer = setTimeout(() => {
            this.$destroy()
            clearTimeout(timer)
          }, 300)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep(.el-dialog__header) {
    display: none;
  }
  ::v-deep(.el-dialog__body) {
    padding: 25px !important;
  }
  ::v-deep(.el-carousel__arrow) {
    background: rgba(64, 158, 255, 0.8);
    .el-icon-arrow-left,
    .el-icon-arrow-right {
      font-size: 18px;
    }
  }
  ::v-deep(.el-carousel__indicators--horizontal) {
    width: 100%;
    display: flex;
    justify-content: center;
    .el-carousel__indicator {
      .el-carousel__button {
        background: #aaa;
      }
      &.is-active .el-carousel__button {
        background: #409eff;
      }
    }
  }
  ::v-deep(.onePic .el-carousel__indicator) {
    display: none;
  }
  .el-carousel {
    border-radius: 4px;
    overflow: hidden;
    background: #f2f2f2;
    .el-carousel__item {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .pic {
        max-width: 100%;
      }
    }
  }
</style>
