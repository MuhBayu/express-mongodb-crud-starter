import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import {store} from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(VueRouter)
Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
