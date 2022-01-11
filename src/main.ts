import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'
import * as echarts from 'echarts'
import router, { setupRoute, routerBefore } from './router/index'
// elementUI
import { setupElementUI } from './utils/elemenUI'
// 绑定方法到原型
import { setupPrototype } from './utils/prototype'
// 绑定全局组件
import { setupGlobalComponent } from './utils/globalComponent'
// 绑定自定义指令
import { setupDirective } from './utils/directive'
// 绑定minixs
import { mixins } from './utils/mixins'
const app: any = createApp(App)
app.use(store, key)
// minixs
app.mixin(mixins)
// elementUI
setupElementUI(app)
// 绑定方法到原型
setupPrototype(app)
// 挂载全局组件
setupGlobalComponent(app)
// 自定义指令
setupDirective(app)
// 路由拦截
routerBefore(store)
// 挂载路由
setupRoute()
app.use(router)
// 路由准备就绪后挂载APP实例
router.isReady().then(() => {
  app.mount('#app').echarts = echarts
})
