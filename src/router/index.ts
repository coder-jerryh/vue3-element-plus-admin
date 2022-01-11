import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 默认路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/compositionApi',
    name: 'compositionApi',
    component: () => import('../views/compositionApi.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '/404',
    component: () => import('../views/errorView/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
// 路由拦截
export const routerBefore = (store: any) => {
  // 使用钩子函数对路由进行权限跳转
  router.beforeEach((to: any, from, next) => {
    store.commit('clearToken')
    // 存学校树信息
    store.commit('saveSchoolInfo', store.state.fullSchoolInfo[to.meta.treeType] || {})
    const userToken = sessionStorage.userToken
    if (!userToken && to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  })
}
// 设置路由
export const setupRoute = (menuTreeList: object[] = []) => {
  const children: any[] = []
  const addPath = (item: any) => {
    if (item.children && item.children.length) {
      item.children.forEach((child: any) => {
        if (child.path) {
          children.push({
            path: child.path,
            component: () =>
              import(`../views${child.path === '/homePage' ? '/homePage/index' : child.path}.vue`),
            meta: {
              title: child.funcName,
              treeType: child.treeType,
              funcLevel: child.funcLevel
            }
          })
        }
        addPath(child)
      })
    }
  }
  addPath({
    children: menuTreeList.length ? menuTreeList : JSON.parse(sessionStorage.menuTreeList || '[]')
  })
  router.addRoute({
    path: '/',
    redirect: '/homePage',
    component: () => import('../views/layout/index.vue'),
    children
  })
}
export default router
