import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import auth from './modules/auth';
import utilities from './modules/utilities';
import dialogs from './modules/dialogs';
import pcatracker from './modules/pcatracker';

const vuexPersist = new VuexPersist({
  key: 'template_vue',
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  modules: { auth, utilities, dialogs, pcatracker }
})
