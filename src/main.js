import Vue from "vue";
import App from "@/App.vue";
import "@/plugins/registerServiceWorker";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";
import "@/plugins/toastification";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "@/plugins/firebase/firebaseConfig";
import axios from 'axios';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// If on localhost, use all firebase services locally
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
if (location.hostname === 'localhost') {
  const auth = getAuth();
  connectFirestoreEmulator(db, 'localhost', 8088);
  connectAuthEmulator(auth, 'http://localhost:9099');
  axios.defaults.baseURL = "http://localhost:5001/holonlab-4e280/us-central1";
} else {
  axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
}

Vue.prototype.$api = axios;
export default db;

Vue.use(require('vue-moment'));
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  db,
  render: h => h(App)
}).$mount('#app')
