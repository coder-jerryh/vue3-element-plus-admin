<template>
  <div class="eTag" :class="{ showHelp }">
    <el-button
      class="home"
      icon="el-icon-house"
      :class="{ selected: $route.path === '/homePage' }"
      @click="$router.push('/homePage')"
    >
      <i>首页</i>
    </el-button>
    <el-tabs
      v-model="selectPath"
      type="card"
      closable
      @tab-click="clickTag"
      @tab-remove="closeCurrentTag"
    >
      <el-tab-pane v-for="(item, i) in tagLists" :key="i" :name="item.path" :label="item.title" />
    </el-tabs>
    <div v-show="tagLists.length" class="right">
      <el-button
        v-if="$route.path != 'homePage'"
        class="refresh"
        icon="el-icon-refresh"
        @click="changeRefreshFlag"
      >
        <i>刷新</i>
      </el-button>
      <el-button v-if="showHelp" class="refresh" icon="el-icon-question" @click="getHelp">
        <i>帮助</i>
      </el-button>
      <div class="tags-close-box">
        <el-dropdown @command="handleTags">
          <el-button size="mini" type="primary">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu size="small">
              <el-dropdown-item command="current">关闭当前标签</el-dropdown-item>
              <el-dropdown-item command="other">关闭其他标签</el-dropdown-item>
              <el-dropdown-item command="all">关闭所有标签</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  // import { needHelpPages } from '../../../components/usingPopup/index'
  export default {
    data() {
      return {
        tagLists: [],
        selectPath: '/homePage',
        showHelp: false
      }
    },
    watch: {
      $route(newValue) {
        this.setHelp()
        if (newValue.meta.funcLevel === 3) return
        this.setTags(newValue)
      },
      tagLists: {
        handler() {
          sessionStorage.tagLists = JSON.stringify(this.tagLists)
        },
        deep: true
      }
    },
    created() {
      this.tagLists = JSON.parse(sessionStorage.tagLists || '[]')
      this.setHelp()
      this.setTags(this.$route)
    },
    methods: {
      ...mapMutations(['changeRefreshFlag']),
      clickTag() {
        this.$router.push(this.selectPath)
      },
      closeCurrentTag(path = this.selectPath) {
        const tabs = this.tagLists
        let activePath = '/homePage'
        if (this.selectPath === path) {
          tabs.forEach((tab, index) => {
            if (tab.path === path) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activePath = nextTab.path
              }
            }
          })
        }
        this.selectPath = activePath
        this.$router.push(activePath)
        this.tagLists = tabs.filter((tab) => tab.path !== path)
      },
      // 关闭全部标签
      closeAllTag() {
        this.tagLists = []
        this.$router.push('/homePage')
      },
      // 关闭其他标签
      closeOtherTag() {
        const curItem = this.tagLists.filter((item) => {
          return item.path === this.$route.fullPath
        })
        this.tagLists = curItem
      },
      // 设置标签
      setTags(route) {
        const isExistPath = this.tagLists.some((item) => item.path === route.fullPath)
        if (!isExistPath && route.fullPath !== '/homePage') {
          this.tagLists.push({
            title: route.meta.title,
            path: route.fullPath
          })
        }
        this.selectPath = route.fullPath
      },
      handleTags(command) {
        switch (command) {
          case 'current':
            this.closeCurrentTag()
            break
          case 'other':
            this.closeOtherTag()
            break
          case 'all':
            this.closeAllTag()
        }
      },
      setHelp() {
        // 使用教程
        // var path = '/' + this.$route.path.split('/').slice(1, 3).join('/')
        // // 列表页，子页面不包含
        // const isListPage = this.$route.path.includes('/list')
        // // 学校基础信息页面
        // const isSchoolPage = this.$route.path.includes('/schoolBaseInfo')
        // this.showHelp = JSON.stringify(needHelpPages).includes(path) && (isListPage || isSchoolPage)
      },
      getHelp() {
        // 使用教程
        // this.$openUsingPopup(this.$route.path, true)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .eTag {
    position: relative;
    background: #6ac144;
    color: #fff;
    padding-right: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    position: relative;
    // tag栏
    ::v-deep(.el-tabs__header) {
      margin-bottom: 0;
      margin-left: 0;
      position: absolute;
      top: 0;
      left: 78px;
      right: 120px;
      border: 0;
      .el-tabs__nav-wrap {
        > span {
          background: #6ac144;
          z-index: 20;
          width: 22px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          i {
            line-height: inherit;
            font-size: 22px;
            color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
          }
          &:hover {
            background: #3d9b3e;
          }
        }
        .el-tabs__nav {
          border-radius: 0;
          border: 0;
          .el-tabs__item {
            box-shadow: none;
            border: 0;
            color: #fff;
            .el-icon-close {
              font-size: 14px;
              color: rgb(222, 222, 222);
              line-height: 15px;
              &:hover {
                background: #fff;
                color: #888;
              }
            }
            &.is-active,
            &:hover {
              background: #3d9b3e;
              color: #fff;
            }
          }
        }
      }
    }
    &.showHelp ::v-deep(.el-tabs__header) {
      right: 176px;
    }
    .el-button {
      border-radius: 0;
      border: 0;
      background: #6ac144;
      margin: 0;
      color: #fff;
      height: 100%;
      width: 68px;
      padding: 0;
      @extend.hover;
      &.home {
        width: 78px;
      }
      &:hover,
      &.selected {
        border: 0;
        color: #fff;
        border: 0;
        background: #3d9b3e;
      }
      &.right-scroll {
        margin-left: auto;
      }
    }
    .right {
      position: absolute;
      right: 0;
      background: #fff;
      z-index: 10;
      display: flex;
      height: 100%;
      .tags-close-box {
        width: 40px;
        text-align: center;
        .el-icon-arrow-down {
          color: #fff;
        }
        @extend.hover;
        height: 100%;
        line-height: 40px;
        button {
          border: 0;
          padding: 0;
          height: 40px;
          i {
            background: transparent;
            color: #fff;
            margin-left: 0;
            font-size: 20px;
            position: relative;
            left: -13px;
          }
        }
      }
    }
  }
</style>
