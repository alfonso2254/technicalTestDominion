import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax)
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import './assets/styles.scss'

Vue.config.productionTip = false

import axios from 'axios'
const baseURL = "https://swapi.dev/"

axios.defaults.baseURL = baseURL;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
