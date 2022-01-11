<template>
  <e-input v-model="inputValue" v-bind="$props" title="" @input="input">
    <!-- 输入框头部内容 -->
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <!-- 输入框尾部内容 -->
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
    <!-- 输入框前置内容 -->
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <!-- 输入框后置内容 -->
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </e-input>
</template>

<script>
  import { defineComponent } from 'vue'
  import { ElInput } from 'element-plus'
  export default defineComponent({
    components: { eInput: ElInput },
    props: {
      // 类型 （新增整数类型：integer）
      type: String,
      // 绑定值
      value: [String, Number],
      // 原生属性，最大输入长度
      maxlength: [Number, String],
      // 原生属性，最小输入长度
      minlength: [Number, String],
      // 输入框占位文本
      placeholder: String,
      // 是否可清空
      clearable: Boolean,
      // 禁用
      disabled: Boolean,
      // 输入框头部图标
      prefixIcon: String,
      // 输入框尾部图标
      suffixIcon: String,
      // 输入框行数，只对 type="textarea"
      rows: [Number, String],
      // 原生属性，设置最大值
      max: [Number, String],
      // 原生属性，设置最小值
      min: [Number, String],
      // 控制是否能被用户缩放：none, both, horizontal, vertical
      resize: String,
      // 自适应内容高度
      autosize: [Boolean, Object]
    },
    data() {
      return {
        inputValue: ''
      }
    },
    watch: {
      value: {
        handler() {
          this.inputValue = this.value
        },
        immediate: true
      }
    },
    methods: {
      input(e) {
        var value = e
        // 搜索框，禁止输入特殊符号：$、空格、#、%、&、*、\、^、[、]、{、}、|、`，\s表示空格
        if (this.type === 'search') {
          value = e.replace(/\$|\s|%|&|\+|\^|\\|\[|]|{|}|\||`/, '')
        }
        // 限制长度
        if (this.maxlength) {
          value = value.slice(0, this.maxlength)
        }
        // 不允许输入小数点
        if (this.type === 'integer') {
          value = e.replace(/[^0-9]/g, '')
        }
        // 数字类型
        if (this.type === 'number') {
          // 不允许小数点开头
          if (e[0] === '.') {
            value = '0' + e
          }
          // 最小为1，不允许负数
          if (Number(this.min) === 1) {
            value = e.replace(/[^0-9.]/g, '')
          }
        }
        this.inputValue = value
        this.$emit('input', value)
      }
    }
  })
</script>
<style lang="scss" scoped></style>
