import router from '../router'

// 路由拦截器
router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from) => {
})
