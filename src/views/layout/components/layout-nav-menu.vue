<template>
  <div class="sidebar">
    <!-- :style="{backgroundColor: theme.funcName}" -->
    <nav :class="{ hiddenName }">
      <img v-show="!hiddenName" class="normal" src="../../../assets/img/elogo.png" alt="" />
      <img v-show="hiddenName" class="mini" src="../../../assets/img/eMiniLogo.png" alt="" />
    </nav>
    <!-- <layout-scroll> -->
    <el-menu
      background-color="#fff"
      text-color="#666"
      active-text-color="#666"
      mode="horizontal"
      class="sidebar-el-menu"
      :default-active="$route.path"
      unique-opened
      router
      @select="selectMenu"
    >
      <template v-for="item in menus">
        <template v-if="item.children.length && item.children[0].funcLevel != 3">
          <!-- 二级 -->
          <el-submenu :key="item.funcName" :index="item.funcName">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.funcName }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.path">
              <el-submenu
                v-if="subItem.children.length && subItem.children[0].funcLevel != 3"
                :key="subItem.funcName"
                :index="subItem.funcName"
              >
                <template #title>{{ subItem.funcName }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.children"
                  :key="i"
                  :index="threeItem.path"
                >
                  <i :class="threeItem.icon"></i>
                  <span>{{ threeItem.funcName }}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item :index="subItem.path">
                <i :class="subItem.icon"></i>
                <span>{{ subItem.funcName }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 一级 -->
        <template v-else>
          <el-menu-item :key="item.path || item.funcName" :index="item.path || item.funcName">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.funcName }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <!-- </layout-scroll> -->
    <layout-header />
  </div>
</template>
<script>
  // import layoutScroll from './layout-scroll.vue'
  import { mapState, mapMutations } from 'vuex'
  import layoutHeader from '../components/layout-header.vue'
  // import { getTopMenuListApi } from '../../../api/systemSet'
  export default {
    components: {
      layoutHeader
      // layoutScroll
    },
    data() {
      return {
        hiddenName: false,
        menus: [],
        timer: null
      }
    },
    computed: {
      ...mapState(['theme'])
    },
    created() {
      this.changeName()
      this.menus = [
        // {
        //   children: [],
        //   funcCode: 'ML0005',
        //   funcLevel: 1,
        //   funcName: '预招生管理',
        //   icon: 'el-icon-tickets',
        //   parentCode: '',
        //   path: '/classAssignment/schoolManage/list',
        //   pkId: '1269951363983454210',
        //   sort: 4,
        //   title: '预招生管理',
        //   treeType: ''
        // }
      ]
      this.getTopMenuList()
    },
    mounted() {
      // 防抖
      let resizeFlag = true
      window.onresize = () => {
        if (resizeFlag) {
          this.changeName()
          resizeFlag = false
          this.timer = setTimeout(() => {
            resizeFlag = true
            clearTimeout(this.timer)
          }, 100)
        }
      }
    },
    beforeUnmount() {
      clearTimeout(this.timer)
    },
    methods: {
      ...mapMutations(['saveMenu']),
      changeName() {
        window.screenWidth = document.body.clientWidth
        this.hiddenName = window.screenWidth <= 1464
      },
      getTopMenuList() {
        this.menus = JSON.parse(sessionStorage.menuTreeList || '[]')
      },
      selectMenu(path) {
        this.saveMenu(path)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sidebar {
    transition: all ease 0.3s;
    display: flex;
    align-items: center;
    nav {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      transition: all ease 0.5s;
      line-height: 60px;
      font-size: 16px;
      text-align: center;
      overflow: hidden;
      height: 60px;
      position: relative;
      z-index: 1;
      background: #fff;
      img {
        &.normal {
          width: 158px;
        }
        &.mini {
          width: 38px;
        }
      }
      .icon-eee {
        font-size: 18px;
        line-height: 60px;
      }
      &.hiddenName {
        width: 60px;
      }
    }
    ::v-deep(.sidebar-el-menu) {
      height: 60px;
      border-right: 0;
      background-color: inherit;
      flex: 1;
      display: flex;
      overflow-x: scroll;
      overflow-y: hidden;
      &::-webkit-scrollbar {
        display: none;
      }
      .el-menu {
        background-color: inherit;
        .el-submenu__title,
        .el-menu-item {
          height: 60px;
        }
      }
      .el-submenu__title {
        border-bottom: 0;
        .el-submenu__icon-arrow {
          margin-top: 2px;
          font-size: 14px;
          margin-left: 4px;
        }
      }
    }
    .el-menu {
      border-bottom: 0;
      i {
        color: #666;
        &.el-icon-house {
          font-size: 17px;
          position: relative;
          top: -1px;
        }
      }
    }
  }
</style>
