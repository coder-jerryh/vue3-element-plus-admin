<template>
  <div class="eSeacher">
    <h1 v-if="title">{{ title }}</h1>
    <el-input
      v-model="searchValue"
      :placeholder="placeholder"
      :prefix-icon="hiddenBtn ? 'el-icon-search' : ''"
      :maxlength="maxlength"
      clearable
      @clear="searchValue = ''"
      @keyup.enter="search"
      @input="input"
    >
      <template v-if="hasSearchType" #prepend>
        <el-select
          v-model="searchType"
          :style="{ width }"
          :placeholder="selectPlaceholder || '请选择'"
          @change="input"
          @clear="searchValue = ''"
        >
          <el-option
            v-for="(item, i) in searchOption"
            :key="i"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <template v-if="!hiddenBtn" #append>
        <el-button type="danger" @click="search">查询</el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      // 是否展示搜索按钮
      hiddenBtn: Boolean,
      // value
      modelValue: [Object, String],
      // 标题，有标题表示在筛选板里
      title: String,
      // placeholder
      placeholder: {
        type: String,
        default() {
          return '请输入关键字搜索'
        }
      },
      maxlength: [String, Number],
      // 搜索类型提示
      selectPlaceholder: String,
      // 搜索类型
      searchOption: {
        type: Array,
        default() {
          return []
        }
        // 示例
        // [{ value: 'createByName', label: '操作人' }]
      },
      width: {
        type: String,
        default() {
          return '120px'
        }
      }
    },
    emits: ['update:modelValue', 'getData'],
    data() {
      return {
        // 是否搜索过
        isSearchFlag: false,
        // 输入框的值
        searchValue: '',
        // 选择的搜索类型
        searchType: ''
      }
    },
    computed: {
      hasSearchType() {
        return this.searchOption.length
      },
      // 找有pages的爸爸
      myParent() {
        let parent = this.$parent
        while (parent && !parent.pages) {
          parent = parent.$parent
        }
        return parent
      }
    },
    watch: {
      modelValue() {
        if (this.hasSearchType) {
          this.searchValue = this.modelValue[this.searchType]
        } else {
          this.searchValue = this.modelValue
        }
      },
      searchValue() {
        if (this.searchValue === '') {
          // 搜索过才请求接口，为false表示用户未搜索过，所以清空的时候不需要请求接口
          if (this.isSearchFlag) {
            this.input()
            this.$emit('getData')
          }
          this.isSearchFlag = false
        }
      }
    },
    created() {
      for (const key in this.modelValue) {
        this.searchType = key
      }
    },
    methods: {
      input() {
        // 有搜索类型
        if (this.hasSearchType) {
          var searchValue = { ...this.modelValue }
          // 切换筛选类型，清空
          this.searchOption.forEach((item) => {
            for (const key in searchValue) {
              if (item.value === key) searchValue[key] = ''
            }
          })
          this.$emit('update:modelValue', { ...searchValue, [this.searchType]: this.searchValue })
        } else {
          this.$emit('update:modelValue', this.searchValue)
        }
      },
      search() {
        if (this.myParent) {
          this.myParent.pages.current = 1
        }
        // 有搜索类型
        if (this.hasSearchType && !this.searchType) {
          return this.$Toast('warning', '请选择搜索类型')
        }
        // 请求数据
        this.$emit('getData')
        this.isSearchFlag = true
      }
    }
  })
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 16px;
    color: #333;
    margin: 12px 0;
  }
  ::v-deep(.el-input-group__prepend) {
    background-color: #fff;
  }
  ::v-deep(.el-input-group--append) {
    .el-input__inner {
      border-right: 0;
    }
    .el-input-group__append {
      background: #409eff;
      border-color: #409eff;
      border-radius: 0 4px 4px 0;
      color: #fff;
      &:hover {
        background: #66b1ff;
      }
      &:active {
        background: #3a8ee6;
      }
    }
  }
</style>
