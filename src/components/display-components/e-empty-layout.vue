<template>
  <div class="eEmptyLayout">
    <img src="../../assets/img/tips.png" alt="" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      text: String
    },
    data() {
      return {
        // 选择的搜索类型
        searchType: ''
      }
    },
    watch: {},
    mounted() {
      this.searchType = this.value
    },
    methods: {}
  })
</script>

<style lang="scss" scoped>
  .eEmptyLayout {
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #f8f8f8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 20;
    img {
      width: 64px;
      margin-bottom: 10px;
    }
    p {
      color: #999;
    }
  }
</style>
