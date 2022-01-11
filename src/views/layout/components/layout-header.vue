<template>
  <div class="header">
    <header>
      <el-dropdown class="user-name" trigger="hover">
        <span class="el-dropdown-link">
          {{ username }}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item style="color: #409eff" @click="handleFullScreen">
              <i class="el-icon-rank"></i>
              全屏显示
            </el-dropdown-item>
            <el-dropdown-item style="color: #f56c6c" @click="loginout">
              <i class="el-icon-switch-button"></i>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </header>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { loginOutApi } from '../../../api/index'
  export default {
    data() {
      return {
        fullscreenFlag: false,
        showPanel: false,
        fullscreen: false
      }
    },
    computed: {
      username() {
        return JSON.parse(sessionStorage.userInfo || '{}').name
      }
    },
    methods: {
      ...mapMutations(['displayMenu']),
      // 退出登录
      loginout() {
        loginOutApi({ userId: JSON.parse(sessionStorage.userInfo || '{}').pkId }).then(() => {
          sessionStorage.clear()
          this.$router.replace('/login')
        })
        // adminLogout({ adminName: this.username }).then(data => {
        //   if (data) {
        //     localStorage.removeItem('ms_username')
        //     localStorage.removeItem('serviceID')
        //     this.$router.push('/login')
        //   }
        // })
      },
      // 全屏事件
      handleFullScreen() {
        const element = document.documentElement
        if (this.fullscreen) {
          this.fullscreenFlag = false
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        } else {
          this.fullscreenFlag = true
          if (element.requestFullscreen) {
            element.requestFullscreen()
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen()
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen()
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen()
          }
        }
        this.fullscreen = !this.fullscreen
      }
    }
  }
</script>
<style lang="scss" scoped>
  .hover {
    &::after {
      transition: all ease 0.2s;
      opacity: 0;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.1);
      display: inline-block;
    }
    &:hover {
      color: rgba(255, 255, 255, 1) !important;
      &::after {
        opacity: 1;
      }
    }
  }
  .el-icon-rank,
  .el-icon-switch-button {
    display: inline-block;
    font-size: 17px;
    cursor: pointer;
    margin-right: -1px;
    position: relative;
    top: 1px;
  }
  .el-icon-rank {
    margin-right: -2px;
    font-size: 19px;
    transform: rotate(45deg);
    top: 2px;
  }
  .header {
    margin-left: auto;
    header {
      display: flex;
      align-items: center;
      height: 60px;
      font-size: 22px;
      width: 100%;
      transition: background ease 0.3s;
      background: #fff;
      color: #666;
      padding-right: 5px;
      button {
        border: 0;
        background: transparent;
        color: inherit;
        padding: 0 18px;
        height: 60px;
        position: relative;
        transition: all ease 0.2s;
        &:hover {
          background: #f2f2f2;
        }
        &.theme {
          margin-left: auto;
          ::v-deep(.el-icon-brush) {
            font-size: 16px;
          }
        }
        &.allScreen {
          margin-left: 0;
          ::v-deep(.el-icon-rank) {
            font-size: 20px;
            display: inline-block;
            transform: rotate(45deg);
          }
        }
      }
      &.turnColor button {
        &::after {
          background: rgba(0, 0, 0, 0.1);
        }
        &:hover {
          color: #333 !important;
        }
      }
      ::v-deep(.user-name) {
        color: inherit;
        cursor: pointer;
        height: 60px;
        line-height: 60px;
        .el-dropdown-link {
          padding: 0 10px;
          width: 100%;
          height: 60px;
          position: relative;
          z-index: 1;
          display: inline-block;
        }
        &:hover {
          background: #f2f2f2;
        }
      }
    }
  }
</style>
