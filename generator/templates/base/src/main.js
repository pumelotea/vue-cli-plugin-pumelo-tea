import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HttpApi from '@/apis/http.api'
import '@/configs/router.config'

Vue.use(HttpApi)

// 开启vconsole
// if (process.env.NODE_ENV !== 'production') {
//   let Vconsole =  require('vconsole')
//   let vc = new Vconsole()
//   Vue.use(vc)
// }

// 开启水印
// import WM from '@/plugins/watermark.plugin'
// WM.set('squirrelzoo.com','松鼠乐园开发版')

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
