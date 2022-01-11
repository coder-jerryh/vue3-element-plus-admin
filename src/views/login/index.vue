<template>
  <div class="login">
    <div class="top-img">
      <img src="../../assets/img/elogo.png" />
    </div>
    <div class="form-wrap">
      <img src="../../assets/img/tip.png" />
      <!-- 账号密码登录 -->
      <div v-if="(isDevEnv && !scanLogin) || accountLogin" class="form accountForm">
        <h1>用户登录</h1>
        <label for>
          <input
            v-model="form.username"
            type="text"
            placeholder="账户/手机号"
            @keydown.enter="submitForm"
          />
        </label>
        <label for>
          <input
            v-model="form.password"
            type="password"
            placeholder="密码"
            @keydown.enter="submitForm"
          />
        </label>
        <el-button :loading="loading" @click="submitForm">登录</el-button>
      </div>
      <!-- 扫码登录 -->
      <div v-else class="form scanForm">
        <h1>用户登录</h1>
        <div id="login_container" v-loading="maskLoading"></div>
      </div>
    </div>
    <footer>
      <p>© 2021 四川黑马数码科技有限公司 v2.0</p>
      <p>蜀ICP备09016605号-2</p>
    </footer>
  </div>
</template>

<script>
  import { scanLoginApi, loginApi } from '../../api/index'
  import { setupRoute } from '../../router'
  import config from '../../config'
  import { store } from '../../store/index'
  import { getAgentUserInfoPageApi } from '../../api/agentManage/agentInfo'

  // 登录成功
  const loginSuccess = (data) => {
    store.commit('saveSchoolInfo', {})
    store.commit('saveFullSchoolInfo', 'clear')
    sessionStorage.userInfo = JSON.stringify(data)
    sessionStorage.userToken = data.token
    sessionStorage.menuTreeList = JSON.stringify([...data.menuTreeList])
    // 是否是代理商
    getAgentUserInfoPageApi({ userId: data.pkId }).then((res) => {
      sessionStorage.isAgent = res.total === 1
      sessionStorage.myAgentInfo = JSON.stringify(res.data[0])
    })
    // 路由添加
    setupRoute()
  }

  export default {
    beforeRouteEnter(to, from, next) {
      const { code, state } = to.query
      if (code && state) {
        scanLoginApi(`code=${code}&state=${state}`)
          .then(({ data }) => {
            loginSuccess(data)
            next('/homePage')
          })
          .catch(() => {
            next('/login')
          })
      } else {
        next()
      }
    },
    data() {
      return {
        isDevEnv: false,
        form: {
          username: '',
          password: '',
          imageCode: '1234'
        },
        scanLogin: false,
        accountLogin: false,
        timer: null,
        loading: false,
        maskLoading: true
      }
    },
    mounted() {
      // 关闭loading背景
      this.closeBg()
      this.scanLogin = this.$route.query.scanLogin === 'true'
      this.accountLogin = this.$route.query.accountLogin === 'true'
      this.isDevEnv = process.env.NODE_ENV === 'development'
      if (this.isDevEnv) {
        // 从缓存中获取已登录账号
        const accountInfo = JSON.parse(localStorage.accountInfo || '{}')
        if (accountInfo.username) {
          this.form = accountInfo
        }
      } else {
        this.codeLogin()
      }
    },
    beforeUnmount() {
      clearTimeout(this.timer)
    },
    methods: {
      // 获取钉钉扫码相关参数
      codeLogin() {
        const appid = config.appid
        const redirectUrl = location.href
        const goto = encodeURIComponent(
          `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${encodeURIComponent(
            redirectUrl
          )}`
        )
        window.DDLogin({
          id: 'login_container',
          goto, // goto这里需要对url整体做一个urlencode编码
          style: 'border:none;background-color:#FFFFFF;',
          width: '365',
          height: '300'
        })
        this.timer = setTimeout(() => {
          this.maskLoading = false
          clearTimeout(this.timer)
        }, 1400)
        const hanndleMessage = (event) => {
          const origin = event.origin
          // 判断是否来自ddLogin扫码事件
          if (origin === 'https://login.dingtalk.com') {
            // 这里url不用进行urlencode编码
            const loginTmpCode = event.data // 拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
            const goback = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&loginTmpCode=${loginTmpCode}&time=${new Date().getTime()}`
            window.location.href = goback
          }
        }
        if (typeof window.addEventListener !== 'undefined') {
          window.addEventListener('message', hanndleMessage, false)
        } else if (typeof window.attachEvent !== 'undefined') {
          window.attachEvent('onmessage', hanndleMessage)
        }
      },
      // 账号密码登录
      async submitForm() {
        if (!this.form.username) {
          return this.$Toast('warning', '请输入账号')
        }
        if (!this.form.password) {
          return this.$Toast('warning', '请输入密码')
        }
        this.loading = true
        const { data } = await loginApi(this.form)
        // 缓存账号信息
        localStorage.accountInfo = JSON.stringify(this.form)
        loginSuccess(data)
        this.$router.replace('/homePage')
      },
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
  .login {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url('../../assets/img/dbg.png');
    background-attachment: fixed;
    background-size: cover;
    padding-top: 30px;
    .top-img {
      margin-top: -100px;
      img {
        width: 360px;
        height: 80px;
        object-fit: fill;
      }
    }
    .form-wrap {
      padding: 12px 50px;
      margin-top: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1120px;
      height: 520px;
      border-radius: 20px;
      box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.08);
      background: linear-gradient(to bottom, rgb(5, 181, 132) 0%, rgb(46, 211, 133) 100%);
      > img {
        width: 452px;
        height: 520px;
        margin-left: 60px;
      }
      .form {
        height: 410px;
        width: 368px;
        padding: 12px 50px;
        background-color: #fff;
        border-radius: 16px;
        margin-left: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &.scanForm {
          h1 {
            font-size: 18px;
            color: rgba(47, 51, 50, 1);
          }
        }
        &.accountForm {
          h1 {
            font-size: 18px;
            color: rgba(47, 51, 50, 1);
            margin-bottom: 60px;
          }
          label {
            margin-bottom: 30px;
            overflow: hidden;
            position: relative;
            input {
              border-radius: 28px;
              font-size: 14px;
              border: 1px rgba(16, 194, 141, 1) solid;
              color: rgba(139, 153, 149, 1);
              height: 50px;
              width: 320px;
              padding: 0 38px;
              transition: all ease 0.5s;
              &:focus,
              &:hover {
                border-color: rgb(201, 201, 201);
              }
            }
            img {
              border-radius: 0 28px 28px 0;
              position: absolute;
              right: 1px;
              height: 48px;
              width: 130px;
              top: 50%;
              transform: translateY(-50%);
            }
          }
          button {
            margin-top: 30px;
            background: linear-gradient(to right, #06a66e, #35d87f);
            border-radius: 28px;
            height: 52px;
            width: 320px;
            font-size: 14px;
            color: #fff;
            transition: all ease 0.3s;
            &:hover {
              opacity: 0.85;
            }
            &:active {
              opacity: 1;
            }
          }
          a {
            margin-bottom: 20px;
            text-align: center;
            margin-top: 15px;
            font-size: 16px;
            color: rgba(139, 153, 149, 1);
          }
        }
      }
    }
    footer {
      margin: 20px 0;
      color: #fff;
      font-size: 14px;
      line-height: 1.4;
      text-align: center;
      position: fixed;
      bottom: 0;
    }
  }
</style>
