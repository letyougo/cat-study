// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import VCharts from 'v-charts'
import './reset.css'
import './global.less'
import '../theme/index.css'
import './element-reset.less'
import api from './api'
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VCharts)

Object.assign(global,{
  user :JSON.parse(localStorage.getItem('cat-study-user'))
})


Vue.use(api)
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
