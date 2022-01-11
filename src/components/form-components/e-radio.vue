<template>
  <div class="e-radio" :flex="label">
    <h1 v-if="title">{{ title }}</h1>
    <label v-if="label" class="label">{{ label }}</label>
    <el-radio-group v-model="searchType" @change="change">
      <el-radio v-for="(item, i) in newSearchOption" :key="i" :label="item[propKeys[1]]">
        {{ item[propKeys[0]] }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      // value
      value: [String, Number, Array, Boolean],
      // 搜索类型提示
      placeholder: String,
      // 标题，有标题表示在筛选板里
      title: String,
      // label
      label: String,
      // 是否可清空
      clearable: {
        type: Boolean,
        default() {
          return true
        }
      },
      // 无数据提示
      noDataText: {
        type: String,
        default() {
          return '无数据'
        }
      },
      // 搜索类型
      searchOption: {
        type: [Array, Object],
        default() {
          return []
        }
        // 示例
        // [{ value: 'createByName', label: '操作人' }]
      },
      propKeys: {
        type: Array,
        default() {
          return ['label', 'value']
        }
      },
      disabled: Boolean,
      // size
      size: {
        type: String,
        default() {
          return 'medium'
        }
      },
      // 多选
      multiple: Boolean,
      // 可搜索
      filterable: {
        type: Boolean,
        default() {
          return true
        }
      }
    },
    data() {
      return {
        // 选择的搜索类型
        searchType: ''
      }
    },
    computed: {
      newSearchOption() {
        var newSearchOption = []
        if (Array.isArray(this.searchOption)) {
          newSearchOption = this.searchOption.map((item) => {
            return {
              ...item,
              label: item.label,
              value: typeof item.value === 'number' ? item.value.toString() : item.value
            }
          })
        } else {
          for (const key in this.searchOption) {
            if (key !== 'null') {
              newSearchOption.push({
                label: this.searchOption[key],
                value: typeof key === 'number' ? key.toString() : key
              })
            }
          }
        }
        return newSearchOption
      }
    },
    watch: {
      value() {
        if (this.multiple) {
          if (this.value.length) {
            this.searchType = this.value.split(',')
          } else {
            this.searchType = this.value
          }
        } else {
          this.searchType = typeof this.value === 'number' ? this.value.toString() : this.value
        }
      }
    },
    mounted() {
      this.searchType = typeof this.value === 'number' ? this.value.toString() : this.value
    },
    methods: {
      change() {
        if (this.multiple) {
          this.$emit('input', this.searchType.join())
        } else {
          this.$emit('input', this.searchType)
        }
        if (this.title && this.$parent.$parent.$parent.pages) {
          // 根据标题判断：有标题表示在筛选板里
          this.$parent.$parent.$parent.pages.current = 1
        } else if (this.$parent.pages) {
          this.$parent.pages.current = 1
        } else if (this.$parent.$parent.pages) {
          this.$parent.$parent.pages.current = 1
        } else if (this.$parent.$parent.$parent.pages) {
          this.$parent.$parent.$parent.pages.current = 1
        } else if (this.$parent.$parent.$parent.$parent.pages) {
          this.$parent.$parent.$parent.$parent.pages.current = 1
        }
        this.$emit('getData')
      },
      focus() {}
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
  .e-radio[flex] {
    display: flex;
    align-items: center;
    .label {
      display: inline-block;
      color: #666;
      font-size: 15px;
    }
    ::v-deep(.el-radio-group) {
      position: relative;
      top: 2px;
      margin-left: auto;
      margin-right: 30px;
      .el-radio {
        margin-right: 24px;
        &:last-child {
          margin-right: 0;
        }
        .el-radio__label {
          padding-left: 6px;
        }
      }
    }
  }
</style>
