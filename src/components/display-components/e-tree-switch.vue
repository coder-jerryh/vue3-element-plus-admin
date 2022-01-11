<template>
  <el-tooltip
    v-if="$route.meta.treeType"
    :disabled="treeSwitch || !schoolInfo.schoolItemName"
    class="item"
    effect="dark"
    :content="`当前选择：${schoolInfo.schoolItemName}`"
    placement="bottom"
  >
    <el-button
      type="success"
      icon="el-icon-d-arrow-left"
      :class="{ toOpen: !treeSwitch }"
      plain
      @click="clickTreeSwicth"
    />
  </el-tooltip>
</template>

<script>
  import { defineComponent } from 'vue'
  import { mapMutations, mapState } from 'vuex'
  export default defineComponent({
    props: {},
    data() {
      return {}
    },
    computed: {
      ...mapState(['treeSwitch', 'schoolInfo'])
    },
    methods: {
      ...mapMutations(['clickTreeSwicth'])
    }
  })
</script>
<style lang="scss" scoped>
  .el-button {
    width: 40px;
    text-align: center;
    ::v-deep(.el-icon-d-arrow-left) {
      transition: all ease 0.3s;
      position: relative;
      right: 8px;
    }
    &.toOpen {
      ::v-deep(.el-icon-d-arrow-left) {
        transform: rotate(180deg);
      }
    }
    &:focus,
    &:active,
    &:hover {
      color: #67c23a;
      background: #f0f9eb;
      border-color: #c2e7b0;
    }
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 1;
    }
  }
</style>
