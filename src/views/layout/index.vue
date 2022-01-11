<template>
  <div class="homePage">
    <!-- 顶部菜单 -->
    <layout-nav-menu />
    <!-- 路由标签栏 -->
    <layout-tag />
    <!-- 内容区 -->
    <div class="content">
      <!-- 学校树 -->
      <keep-alive>
        <e-tree v-if="treeType == 'school'" key="1" />
      </keep-alive>
      <keep-alive>
        <e-tree v-if="treeType == 'schoolDetail'" key="2" />
      </keep-alive>
      <keep-alive>
        <e-tree v-if="treeType == 'allSchool'" key="3" />
      </keep-alive>
      <!-- 右侧内容 -->
      <!-- <transition name="fade">
        <keep-alive :exclude="['noCache']">
          <router-view v-if="showView || $route.meta.treeType === 'allSchool'" />
          <e-empty-layout v-if="!showView" :text="tips" />
        </keep-alive>
      </transition> -->
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="showView || route.meta.treeType === 'allSchool' ? Component : null" />
        </keep-alive>
      </router-view>
      <e-empty-layout v-if="!showView" :text="tips" />
    </div>
  </div>
</template>

<script>
  import eEmptyLayout from '../../components/display-components/e-empty-layout.vue'
  import layoutNavMenu from './components/layout-nav-menu.vue'
  import layoutTag from './components/layout-tag.vue'
  import eTree from '../../components/display-components/e-tree.vue'
  import { mapState } from 'vuex'

  export default {
    components: {
      eEmptyLayout,
      layoutNavMenu,
      layoutTag,
      eTree
    },
    data() {
      return {
        tipsObj: {
          school: '请先选择学校',
          schoolDetail: '请先选择学校应用/学校/学段/年级/老师/学生/家长信息'
        }
      }
    },
    computed: {
      ...mapState(['schoolInfo']),
      key() {
        return this.$route.fullPath + new Date().getTime()
      },
      tips() {
        return this.tipsObj[this.$route.meta.treeType]
      },
      showView() {
        const treeType = this.$route.meta.treeType
        // 需要简单学校树
        if (treeType === 'school' || treeType === 'allSchool') {
          return Boolean(this.schoolInfo.schoolNum)
        } else if (treeType === 'schoolDetail') {
          // 需要学校树详情
          return Boolean(this.schoolInfo.attributeStr)
        } else {
          // 不需要学校树
          return true
        }
      },
      treeType() {
        return this.$route.meta.treeType
      }
    },
    mounted() {
      // 关闭loading背景
      this.closeBg()
    },
    methods: {
      // 关闭loading背景
      closeBg() {
        const loadingBg = document.getElementById('loading').style
        loadingBg.visibility = 'hidden'
        loadingBg.opacity = 0
        const timer = setTimeout(() => {
          loadingBg.display = 'none'
          clearTimeout(timer)
        }, 1500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .homePage {
    @extend .scroller;
    .content {
      background: rgb(242, 242, 242);
      height: calc(100vh - 100px);
      padding: 10px;
      display: flex;
      ::v-deep(.eEmptyLayout) {
        border-radius: 2px;
      }
      > div {
        position: relative;
      }
      > .eTree + div {
        height: 100%;
        flex: 1;
      }
    }
  }
</style>
