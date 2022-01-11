<template>
  <div class="eSelecter" :flex="label">
    <h1 v-if="title">{{ title }}</h1>
    <label v-if="label" class="label">{{ label }}</label>
    <el-select
      v-model="selectValue"
      :clearable="clearable"
      :size="size"
      :placeholder="placeholder"
      :no-data-text="noDataText"
      :disabled="disabled"
      collapse-tags
      :multiple="multiple"
      :filterable="filterable"
      @change="change"
    >
      <el-option
        v-for="(item, i) in newSearchOption"
        :key="i"
        :label="item[propKeys[0]]"
        :value="item[propKeys[1]]"
      />
    </el-select>
  </div>
</template>

<script>
  import { computed, onMounted, ref, defineComponent, watch } from 'vue'
  export default defineComponent({
    props: {
      // value
      modelValue: {
        type: [String, Number, Array, Boolean],
        default: ''
      },
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
    emits: ['update:modelValue', 'getData'],
    setup(props, context) {
      var selectValue = ref('')
      // 选项组
      const newSearchOption = computed(() => {
        var newSearchOption = []
        if (Array.isArray(props.searchOption)) {
          newSearchOption = props.searchOption.map((item) => {
            return {
              ...item,
              label: item.label,
              value: typeof item.value === 'number' ? item.value.toString() : item.value
            }
          })
        } else {
          for (const key in props.searchOption) {
            if (key !== 'null') {
              newSearchOption.push({
                label: props.searchOption[key],
                value: typeof key === 'number' ? key.toString() : key
              })
            }
          }
        }
        return newSearchOption
      })
      // 找有pages的爸爸
      const myParent = computed(() => {
        let parent = context.$parent
        while (parent && !parent.pages) {
          parent = parent.$parent
        }
        return parent
      })
      onMounted(() => {
        const modelValue = props.modelValue
        selectValue.value = typeof modelValue === 'number' ? modelValue.toString() : modelValue
      })
      watch(
        () => props.modelValue,
        () => {
          const modelValue = props.modelValue
          if (props.multiple) {
            if (props.modelValue.length) {
              selectValue.value = modelValue.split(',')
            } else {
              selectValue.value = modelValue
            }
          } else {
            selectValue.value = typeof modelValue === 'number' ? modelValue.toString() : modelValue
          }
        },
        {
          immediate: true
        }
      )
      // 方法
      const change = (val) => {
        if (props.multiple) {
          context.emit('update:modelValue', val.join())
        } else {
          context.emit('update:modelValue', val)
        }
        if (myParent.value) {
          myParent.value.pages.current = 1
        }
        context.emit('getData')
      }
      return {
        // 选择的搜索类型
        selectValue,
        newSearchOption,
        myParent,
        change
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
  .eSelecter[flex] {
    display: flex;
    align-items: center;
    .label {
      display: inline-block;
      color: #666;
      font-size: 15px;
      margin-right: 10px;
    }
    .el-select {
      flex: 1;
    }
  }
</style>
