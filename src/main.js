import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import qs from 'qs'
import axios from 'axios'
Vue.prototype.$qs = qs
// Vue.http.options.emulateJSON = true

import * as d3 from 'd3'

Vue.prototype.$d3 = d3
window.d3 = d3
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

function getCsrftokenByCookie() {
  const cookie = document.cookie.split(';')
  let csrftoken = ''

  for (const i in cookie) {
    if (cookie[i].indexOf('csrftoken') !== -1) {
      csrftoken = cookie[i].split('=')[1]
    }
  }

  return csrftoken
}

axios.defaults.headers.common['X-CSRFToken'] = getCsrftokenByCookie()
axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})
import { Overlay } from 'vant'
Vue.use(Overlay)
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
