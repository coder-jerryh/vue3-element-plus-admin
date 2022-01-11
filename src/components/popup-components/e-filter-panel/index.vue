<template>
  <div class="filterPanel">
    <el-badge :is-dot="!plain" type="danger">
      <el-button icon="el-icon-search" type="primary" :plain="plain" @click="show = true">
        筛选
      </el-button>
    </el-badge>
    <el-drawer v-model="show" size="350px" class="filter-panel" :with-header="false">
      <!-- 解决打开drawer，自动聚焦的bug -->
      <input class="hidden" />
      <nav>
        <h3>{{ title }}</h3>
        <i class="el-icon-close" @click="show = false"></i>
      </nav>
      <div class="content">
        <slot />
      </div>
      <!-- 底部按钮 -->
      <footer>
        <el-button class="btn-send" icon="el-icon-refresh-right" type="warning" @click="resetForm">
          重置
        </el-button>
        <!-- <el-button type="primary" icon="el-icon-search" @click="search">确定</el-button> -->
      </footer>
    </el-drawer>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      excludeKeys: {
        type: Array,
        default() {
          return []
        }
      },
      modelValue: Object,
      title: {
        type: String,
        default() {
          return '筛选'
        }
      }
    },
    emits: ['update:modelValue', 'getData', 'reset'],
    data() {
      return {
        show: false,
        plain: true
      }
    },
    computed: {
      newExcludeKeys() {
        return [...this.excludeKeys, 'current', 'size', 'totalNum']
      }
    },
    watch: {
      modelValue: {
        handler() {
          this.handler()
        },
        deep: true
      }
    },
    created() {
      this.handler()
    },
    mounted() {},
    methods: {
      search() {
        this.$emit('getData')
        this.show = false
      },
      resetForm() {
        const pages = { ...this.modelValue }
        for (const key in pages) {
          if (!this.newExcludeKeys.includes(key)) {
            // 数组
            if (pages[key] instanceof Array) {
              pages[key] = []
            } else if (pages[key] instanceof Object) {
              pages[key] = {}
            } else {
              pages[key] = ''
            }
          }
        }
        this.$emit('update:modelValue', { ...this.modelValue, ...pages })
        this.$emit('reset')
        this.$emit('getData')
      },
      handler() {
        this.plain = true
        for (const key in this.modelValue) {
          if (
            !this.newExcludeKeys.includes(key) &&
            this.modelValue[key] &&
            !['{}', '[]'].includes(JSON.stringify(this.modelValue[key]))
          ) {
            this.plain = false
            return
          }
        }
      }
    }
  })
</script>
<style lang="scss" scoped>
  .el-button.el-button--medium.is-plain {
    &:hover,
    &:focus {
      color: #409eff;
      background: #ecf5ff;
      border-color: #b3d8ff;
    }
    &:hover {
      opacity: 0.7;
    }
    &:active {
      opacity: 1;
    }
  }
  .filterPanel {
    line-height: 20px;
  }
  ::v-deep(.el-badge__content) {
    height: 11px;
    width: 11px;
    right: 7px !important;
    top: 1px;
  }
  ::v-deep(.el-overlay) {
    .hidden {
      position: fixed;
      z-index: -2;
      opacity: 0;
    }
    .el-drawer {
      margin-top: 60px;
      height: calc(100% - 60px);
      nav {
        height: 54px;
        line-height: 54px;
        padding: 0 15px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h3 {
          color: #000;
          font-size: 18px;
          font-weight: bold;
        }
        i {
          font-size: 25px;
          color: #666;
          cursor: pointer;
          transition: all ease 0.25s;
          &:hover {
            color: #409eff;
          }
        }
      }
      .content {
        height: calc(100vh - 184px);
        overflow: auto;
        padding: 0 15px 20px;
        ::v-deep(.el-input-group__append) {
          background: #ecf5ff;
          border: 1px solid #b3d8ff;
          border-radius: 0 4px 4px 0;
          color: #409eff;
          &:hover {
            opacity: 0.7;
            background: #ecf5ff;
          }
          &:active {
            background: #ecf5ff;
            opacity: 1;
          }
        }
        .el-input__inner:focus {
          border-color: #b3d8ff;
        }
      }
      footer {
        border-top: 1px solid #eee;
        height: 70px;
        display: flex;
        align-items: center;
        padding: 12px;
        .el-button {
          flex: 1;
          height: 100%;
          &:last-child {
            flex: 2;
            // margin-left: 20px;
          }
        }
      }
    }
  }
</style>
