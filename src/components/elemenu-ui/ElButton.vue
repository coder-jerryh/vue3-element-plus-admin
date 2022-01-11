<template>
  <e-button v-prevent="prevent" v-bind="$props" @click="$emit('click', $event)">
    <slot />
  </e-button>
</template>

<script>
  import { defineComponent } from 'vue'
  import { ElButton } from 'element-plus'
  export default defineComponent({
    name: 'Elbutton',
    components: { eButton: ElButton },
    props: {
      // 尺寸
      size: String,
      // 类型
      type: String,
      // 是否朴素按钮
      plain: {
        type: Boolean,
        default() {
          return false
        }
      },
      // 是否圆角按钮
      round: {
        type: Boolean,
        default() {
          return false
        }
      },
      // 是否圆形按钮
      circle: {
        type: Boolean,
        default() {
          return false
        }
      },
      // 是否加载中状态
      loading: {
        type: Boolean,
        default() {
          return false
        }
      },
      // 是否禁用状态
      disabled: {
        type: Boolean,
        default() {
          return false
        }
      },
      // 图标类名
      icon: String,
      // 是否打开禁止快速点击
      prevent: {
        type: Boolean,
        default() {
          return true
        }
      }
    },
    emits: ['click'],
    data() {
      return {}
    },
    computed: {},
    methods: {}
  })
</script>
<style lang="scss" scoped></style>
