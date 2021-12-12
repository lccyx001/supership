import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
axios.defaults.baseURL = 'http://192.168.191.1:8010'
axios.defaults.timeout = 60000
axios.defaults.withCredentials = true
axios.defaults.headers = { 'Content-Type': 'application/json' }
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(ElementUI)
Vue.use(Vuex)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)

})
