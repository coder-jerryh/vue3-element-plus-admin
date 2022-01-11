<template>
  <div class="eDateSelecter">
    <h1 v-if="title">{{ title }}</h1>
    <el-date-picker
      v-model="dateValue"
      :clearable="clearable"
      :editable="false"
      :type="type"
      :value-format="valueFormat"
      :default-time="defaultTime"
      range-separator="至"
      :placeholder="placeholder"
      :picker-options="pickerOptions"
      :format="valueFormat"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      @click="clickDatePicker"
      @change="changeDate"
    >
    </el-date-picker>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      type: {
        type: String,
        default() {
          return 'datetimerange'
          // 可选值：datetimerange、date、datetime
        }
      },
      // 日期格式化方式
      valueFormat: {
        type: String,
        default() {
          return 'yyyy-MM-dd HH:mm:ss'
        }
      },
      // 非范围选择时的占位内容
      placeholder: {
        type: String,
        default() {
          return '请选择日期'
        }
      },
      // value
      value: [String, Array, Object, Date],
      // 标题，有标题表示在筛选板里
      title: String,
      // 是否显示清除按钮
      clearable: {
        type: Boolean,
        default() {
          return true
        }
      },
      // 是否显示清除按钮
      startPlaceholder: {
        type: String,
        default() {
          return '开始日期'
        }
      },
      // 是否显示清除按钮
      endPlaceholder: {
        type: String,
        default() {
          return '结束日期'
        }
      },
      // 是否限制未来时间
      limitDate: {
        type: Boolean,
        default() {
          return true
        }
      },
      // 时间范围选择限制天数
      timeRangeLimit: {
        type: Number,
        default() {
          return null
        }
      },
      // 时间范围时，join的合并方式
      joinMode: {
        type: String,
        default() {
          return ''
        }
      },
      // 开始时间和结束时间对应的key
      dateKeys: {
        type: Array,
        default() {
          return null
        }
      }
    },
    data() {
      return {
        dateValue: '',
        defaultTime: '',
        pickerMinDate: '',
        pickerMaxDate: '',
        pickerOptions: {
          onPick: ({ maxDate, minDate }) => {
            this.pickerMinDate = minDate && minDate.getTime()
            this.pickerMaxDate = maxDate && maxDate.getTime()
          },
          disabledDate: (time) => {
            // 设置了时间范围选择限制天数，且选择了开始时间，且没有选择结束时间才限制范围
            if (this.timeRangeLimit && this.pickerMinDate && !this.pickerMaxDate) {
              const day30 = (this.timeRangeLimit - 1) * 24 * 3600 * 1000
              const minTime = this.pickerMinDate - day30
              // 最大天数要小于今天
              var maxTime = this.pickerMinDate + day30
              maxTime = maxTime >= Date.now() ? Date.now() : maxTime
              const currentTime = time.getTime()
              return currentTime > maxTime || currentTime < minTime
            }
            // 限制不能选择未来的时间
            if (this.limitDate) {
              return (
                time.getTime() >
                new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
              )
            }
          }
        }
      }
    },
    computed: {
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
      type: {
        handler() {
          if (this.type === 'datetimerange') {
            this.defaultTime = ['00:00:00', '23:59:59']
          }
        },
        immediate: true
      },
      value: {
        // 回显
        handler() {
          this.dateValue = this.parentSendDate()
        },
        immediate: true
      }
    },
    mounted() {
      // 时间日期选择器，默认结束时间23:9:59
      if (this.type === 'datetimerange') {
        this.defaultTime = ['00:00:00', '23:59:59']
      }
    },
    methods: {
      clickDatePicker() {
        const docs = document.querySelectorAll('.el-date-range-picker .el-button--text')
        for (let i = 0; i < docs.length; i++) {
          docs[i].style.display = !this.clearable ? 'none' : 'inline-block'
        }
      },
      // 切换日期
      changeDate() {
        if (this.myParent) {
          this.myParent.pages.current = 1
        }
        this.$emit('input', this.childEmitDate())
        this.$emit('getData')
      },
      // 根据props处理日期，返回给父组件
      childEmitDate() {
        var dateValue = this.dateValue || []
        // 日期范围
        if (this.type === 'datetimerange') {
          // 传了joinMode
          if (this.joinMode) {
            dateValue = dateValue.join(this.joinMode)
          } else if (this.dateKeys) {
            // 传了dateKeys
            dateValue = {
              ...this.value,
              [this.dateKeys[0]]: dateValue[0],
              [this.dateKeys[1]]: dateValue[1]
            }
          }
        }
        return dateValue
      },
      // 根据props处理日期，回显日期
      parentSendDate() {
        var dateValue = this.value || ''
        // 日期范围
        if (this.type === 'datetimerange') {
          // 传了join的合并方式
          if (this.joinMode) {
            dateValue = dateValue.split(this.joinMode)
          } else if (this.dateKeys) {
            // 传了dateKeys
            dateValue = [this.value[this.dateKeys[0]] || '', this.value[this.dateKeys[1]] || '']
          }
        }
        return dateValue
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
  h1 + .el-range-editor,
  h1 + .el-date-editor {
    width: 320px;
    ::v-deep(.el-range-separator) {
      width: 8%;
      font-size: 13px;
    }
    ::v-deep(.el-range-input) {
      font-size: 13px;
      width: 50%;
    }
    ::v-deep(.el-range__close-icon) {
      display: none;
    }
  }
  .eDateSelecter {
    cursor: pointer;
    ::v-deep(.el-range-input) {
      cursor: pointer;
    }
  }
  ::v-deep(.el-input-group__prepend) {
    background-color: #fff;
  }
</style>
