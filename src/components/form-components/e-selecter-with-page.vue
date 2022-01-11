<template>
  <div class="eSelecterWithPage">
    <el-select
      v-model="optionValue"
      :placeholder="selectPlaceholder"
      :no-data-text="'暂无数据'"
      @change="changeOption"
    >
      <div v-loading="loading" class="mask"></div>
      <nav class="filterSelecter">
        <el-input
          v-model="queryData[searchKey]"
          class="search"
          :placeholder="placeholder"
          clearable
          @keyup.enter.native="searchUserPage"
          @input="clearSearch"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUserPage" />
        </el-input>
        <el-pagination
          v-show="queryData.totalNum"
          class="page"
          layout="prev, pager, next"
          :current-page="queryData.current"
          :total="queryData.totalNum"
          :page-size="queryData.size"
          :pager-count="7"
          @current-change="changePage"
        />
      </nav>
      <el-option
        v-for="(item, i) in selectOptions"
        :key="i"
        :label="item[propKeys[0]]"
        :value="item[propKeys[1]]"
      />
    </el-select>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        // 回显数据
        type: String,
        default() {
          return ''
        }
      },
      // 下拉框提示
      selectPlaceholder: {
        type: String,
        default() {
          return ''
        }
      },
      placeholder: {
        type: String,
        default() {
          return '请输入关键字搜索'
        }
      },
      // 传递数据
      query: {
        type: Object,
        required: true
      },
      // 父亲组件传递数据
      selectOptions: {
        type: Array,
        required: true
      },
      // 搜索参数
      searchKey: {
        type: String,
        required: true
      },
      // option获取的方法
      getOptions: {
        type: Function,
        required: true
      },
      // 下拉匹配数据
      propKeys: {
        type: Array,
        default() {
          return ['label', 'value']
        }
      },
      // loading
      loading: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        queryData: {},
        optionValue: '',
        isSearchFlag: false // 是否搜索过
      }
    },
    watch: {
      value() {
        this.optionValue = this.value
        this.queryData[this.searchKey] = ''
        this.isSearchFlag = false // 是否搜索过
      },
      query: {
        handler() {
          this.queryData = this.query
        },
        immediate: true
      },
      isSearchFlag() {
        if (!this.queryData[this.searchKey] && this.isSearchFlag) {
          this.searchData()
        }
      }
    },
    methods: {
      // 清空搜索
      clearSearch() {
        if (!this.queryData[this.searchKey] && this.isSearchFlag) {
          this.searchData()
        }
      },
      // 用户主动触发搜索
      searchUserPage() {
        this.queryData.current = 1
        this.isSearchFlag = true
        this.searchData()
      },
      // 初始化搜索数据
      searchData() {
        this.queryData.current = 1
        this.$emit('input', '')
        this.getOptions()
      },
      // 页码切换
      changePage(val) {
        this.$emit('input', '')
        this.queryData.current = val
        this.getOptions()
      },
      // 传递选中数据
      changeOption() {
        this.$emit('input', this.optionValue)
        this.$emit(
          'change',
          this.selectOptions.find((item) => item[this.propKeys[1]] === this.optionValue)
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  .eSelecterWithPage {
    cursor: pointer;
    ::v-deep(.el-range-input) {
      cursor: pointer;
    }
    ::v-deep(.el-input-group__prepend) {
      background-color: #fff;
    }
  }
  .mask {
    position: absolute;
    left: 0;
    top: 84px;
    right: 0;
    bottom: 0;
  }
  ::v-deep(.el-input__suffix) {
    top: -2px;
    // 解决出现两个关闭图标的问题
    > i {
      display: none;
    }
  }
  .filterSelecter {
    border-radius: 4px 4px 0 0;
    background: #fff;
    top: 0;
    z-index: 1;
    position: sticky;
    padding: 10px;
    padding-bottom: 2px;
    border-bottom: 1px solid #e4e7ed;
    .search {
      padding-bottom: 8px;
    }
    ::v-deep(.el-pagination) {
      display: flex;
      justify-content: center;
      button,
      li {
        background: transparent !important;
      }
    }
  }
</style>
