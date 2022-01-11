<template>
  <div>{{ modelValue }}</div>
  <div>{{ parentDataTwo }}</div>
  <button @click="updateData1">修改1</button>
  <button @click="updateData2">修改2</button>
  <button @click="updateData3">修改3</button>
  <button @click="updateTest">修改Test</button>
</template>

<script>
  export default {
    components: {},
    props: {
      modelValue: String,
      parentDataTwo: String,
      parentData: String,
      test: Number
    },
    emits: ['update:modelValue', 'update:parentDataTwo'],
    setup(props, ctx) {
      console.log(props.modelValue)
      const updateData1 = () => {
        ctx.emit('update:modelValue', '修改后的父组件1')
      }
      const updateData2 = () => {
        ctx.emit('update:parentDataTwo', '修改后的父组件2')
      }
      return {
        updateData1,
        updateData2
      }
    },
    data() {
      return {
        show: false
      }
    },
    watch: {
      show() {
        console.log(new Date().getTime())
      },
      test() {
        console.log(this.test, 'test')
        console.log(new Date().getTime())
      }
    },
    created() {},
    methods: {
      updateData3() {
        this.$emit('update', '修改后的父组件3')
      },
      updateTest() {
        this.show = false
      }
    }
  }
</script>

<style lang="scss" scoped></style>
