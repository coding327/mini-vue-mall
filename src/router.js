import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import store from './store'
import History from './utils/history'

Vue.use(Router)
Vue.use(History)

Router.prototype.goBack = function() {
  this.isBack = true
  this.back()
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Cart',
      name: 'cart',
      meta: { auth: true },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Cart.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 判断要进入的路由是否需要认证
  if (to.meta.auth) {
    // 通过token令牌机制判断是否已登录
    if (store.state.token) {
      next() // 如果登录则放行
    } else {
      // 跳转并携带重定向地址
      next({
        path: '/login',
        query: { redirect: to.path }
      })
    }
  } else {
    // 不需要验证的模块直接放行
    next()
  }
})

router.afterEach((to) => {
  if (router.isBack) {
    History.pop()
    router.isBack = false
    router.transitionName = 'route-back'
  } else {
    History.push(to.path)
    router.transitionName = 'route-forward'
  }
})

export default router
