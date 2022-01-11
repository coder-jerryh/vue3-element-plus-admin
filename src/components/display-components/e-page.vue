<template>
  <div class="ePage" :class="position">
    <el-pagination
      background="background"
      :page-sizes="pageSizes"
      :current-page="pages.current"
      :page-size="pages.size"
      :total="pages.totalNum"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="changePageSize"
      @current-change="changePage"
    />
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'EPage',
    props: {
      position: {
        type: String,
        default() {
          return 'absolute'
        }
      },
      modelValue: Object,
      getData: Function,
      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 40, 50]
        }
      }
    },
    emits: ['update:modelValue'],
    data() {
      return {}
    },
    computed: {
      pages() {
        const pages = this.modelValue
        if (!this.modelValue.totalNum) {
          pages.totalNum = 0
        }
        return this.modelValue
      }
    },
    watch: {
      pages() {
        const maxPage = Math.ceil(this.pages.totalNum / this.pages.size)
        if (this.pages.current > 1 && this.pages.current > maxPage) {
          this.$emit('update:modelValue', { ...this.pages, current: this.pages.current - 1 })
          this.getData()
        }
      }
    },
    methods: {
      // 改变pageSize
      changePageSize(size) {
        this.$emit('update:modelValue', { ...this.pages, size })
        this.getData()
      },
      // 改变page
      changePage(current) {
        this.$emit('update:modelValue', { ...this.pages, current })
        this.getData()
      }
    }
  })
</script>
<style lang="scss" scoped>
  .ePage {
    background: #fff;
    padding: 12px;
    text-align: right;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 10;
    &.absolute {
      position: absolute;
    }
  }
</style>
