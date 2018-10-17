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
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VCharts)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
