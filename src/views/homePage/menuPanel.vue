<template>
  <ul class="menuPanel">
    <li v-for="index in 2" :key="index">
      <h1>{{ index == 1 ? '最近使用' : '常用菜单' }}</h1>
      <ul v-if="index == 1" class="menuLists">
        <li
          v-for="(val, key) in recentlyMenus"
          v-show="recentlyMenus[key].funcName"
          :key="key"
          @click="toUrl(key)"
        >
          <i :class="recentlyMenus[key].icon"></i>
          <h2>{{ recentlyMenus[key].funcName }}</h2>
        </li>
      </ul>
      <ul v-else class="menuLists">
        <li
          v-for="(val, key) in commonUseMenus"
          v-show="commonUseMenus[key].funcName"
          :key="key"
          @click="toUrl(key)"
        >
          <i :class="commonUseMenus[key].icon"></i>
          <h2>{{ commonUseMenus[key].funcName }}</h2>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  // 常用菜单
  const commonUseMenuPath = [
    '/schoolManage/schoolBaseInfo/index', // 学校基础信息
    '/deviceManager/deviceInfo/list', // 设备管理
    '/deviceManager/eventInfo/index', // 签到管理
    '/liveManage/classroomSet/list', // 直播教室
    '/serviceManagement/openService/list', // 已开通服务
    '/serviceManagement/noOpendService/list', // 未开通服务
    '/payManage/payInfo/list', // 缴费信息
    '/payManage/noPayInfo/list' // 未缴费信息
  ]
  export default {
    data() {
      return {
        // 常用菜单
        commonUseMenus: {},
        // 最近使用菜单
        recentlyMenus: {}
      }
    },
    mounted() {
      this.getMenu()
    },
    computed: {
      ...mapState(['cacheRecentlyMenus'])
    },
    watch: {
      cacheRecentlyMenus() {
        this.getMenu()
      }
    },
    methods: {
      ...mapMutations(['saveMenu']),
      getMenu() {
        var commonUseMenus = {}
        var recentlyMenus = {}
        const cacheMenus = JSON.parse(sessionStorage.menuTreeList || '[]')
        var recentlyMenuPath = JSON.parse(localStorage.cacheRecentlyMenus || '[]')
        recentlyMenuPath = recentlyMenuPath.length ? recentlyMenuPath : commonUseMenuPath
        recentlyMenuPath.forEach((item) => {
          recentlyMenus[item] = {}
        })
        commonUseMenuPath.forEach((item) => {
          commonUseMenus[item] = {}
        })
        const getMenu = (item) => {
          if (item.children && item.children.length) {
            item.children.forEach((child) => {
              if (commonUseMenuPath.includes(child.path)) {
                commonUseMenus[child.path] = child
              }
              if (recentlyMenuPath.includes(child.path)) {
                recentlyMenus[child.path] = child
              }
              getMenu(child)
            })
          }
        }
        getMenu({ children: cacheMenus })
        this.commonUseMenus = { ...commonUseMenus }
        this.recentlyMenus = { ...recentlyMenus }
      },
      toUrl(path) {
        this.$router.push(path)
        this.saveMenu(path)
      }
    }
  }
</script>

<style scoped lang="scss">
  .menuPanel {
    display: flex;
    > li {
      flex: 1;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.05);
      padding: 26px 0;
      &:first-child {
        margin-right: 10px;
      }
      h1 {
        padding: 0 32px;
        font-size: 18px;
        color: #1a1a1a;
        margin-bottom: -10px;
      }
      .menuLists {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        li {
          margin-top: 30px;
          width: 25%;
          text-align: center;
          cursor: pointer;
          transition: all ease 0.2s;
          &:hover {
            opacity: 0.7;
          }
          &:active {
            opacity: 1;
          }
          i {
            font-size: 34px;
            color: #00a543;
          }
          h2 {
            font-size: 16px;
            color: #1a1a1a;
            margin-top: 12px;
            font-weight: normal;
          }
        }
      }
    }
  }
</style>
