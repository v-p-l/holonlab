import Vue from "vue"
import App from "./App.vue"
import "./plugins/registerServiceWorker"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import { initializeApp } from "firebase/app"
import firebaseConfig from "./plugins/firebaseConfig.js"

initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
