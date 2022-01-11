<template>
  <el-pagination
    v-show='dataOption.length > 10'
    @current-change="changePage"
    class="page"
    layout="prev, pager, next"
    :current-page="pages.current"
    :total="dataOption.length"
    :page-size="pages.size"
    :pager-count="7"
  />
</template>

<script>
export default {
  props: {
    // value
    value: Array,
    dataOption: Array
  },
  data () {
    return {
      pages: {
        current: 1,
        size: 10
      }
    }
  },
  watch: {
    dataOption () {
      this.changePage(1)
    }
  },
  mounted () {
  },
  methods: {
    // 页码切换
    changePage (val) {
      this.pages.current = val
      this.$emit('input', this.dataOption.slice((this.pages.current - 1) * this.pages.size, this.pages.current * this.pages.size))
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-pagination{
    border-radius: 4px 4px 0 0;
    display: flex;
    justify-content: center;
    padding: 4px 0;
    position: sticky;
    top: 0;
    z-index: 1;
    background: #fff;
    border-bottom: 1px solid #E4E7ED;
  }
</style>
