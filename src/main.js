// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueBus from 'vue-bus'
import router from './router'
import VCharts from 'v-charts'
import './reset.css'
import './global.less'
import '../theme/index.css'
import './element-reset.less'
import api from './api'
import $ from 'jquery'
import './printThis'
import moment from 'moment'
Vue.config.productionTip = false
const jQuery = $
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(VueBus)

Object.assign(global, {
  user: JSON.parse(window.localStorage.getItem('cat-study-user')),
  $,
  printConfig: {
    debug: false, // show the iframe for debugging
    importCSS: true, // import page CSS
    importStyle: true, // import style tags
    printContainer: true, // grab outer container as well as the contents of the selector
    loadCSS: '', // path to additional css file - use an array [] for multiple
    pageTitle: '', // add title to print page
    removeInline: false, // remove all inline styles from print elements
    printDelay: 333, // variable print delay
    header: null, // prefix to html
    footer: null, // postfix to html
    base: false, // preserve the BASE tag, or accept a string for the URL
    formValues: true, // preserve input/form values
    canvas: false, // copy canvas elements (experimental)
    doctypeString: '...', // enter a different doctype for older markup
    removeScripts: false, // remove script tags from print content
    copyTagClasses: false // copy classes from the html & body tag
  },
  print: function (sel) {
    $(sel).printThis({
      debug: false, // show the iframe for debugging
      importCSS: true, // import page CSS
      importStyle: true, // import style tags
      printContainer: true, // grab outer container as well as the contents of the selector
      loadCSS: '', // path to additional css file - use an array [] for multiple
      pageTitle: '', // add title to print page
      removeInline: false, // remove all inline styles from print elements
      printDelay: 333, // variable print delay
      header: null, // prefix to html
      footer: null, // postfix to html
      base: false, // preserve the BASE tag, or accept a string for the URL
      formValues: true, // preserve input/form values
      canvas: false, // copy canvas elements (experimental)
      doctypeString: '...', // enter a different doctype for older markup
      removeScripts: false, // remove script tags from print content
      copyTagClasses: false // copy classes from the html & body tag
    })
  },
  isAdmin: false,
  isDoctor: false,
  isHuayan: false,
  isYunyin: false
})

Vue.filter('date', (val) => {
  return moment(val).format('YYYY-MM-DD')
})
Vue.use(api)

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
