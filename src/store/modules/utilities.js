const getDefaultState = () => {
  return {
		showNavBar: false,
		darkMode: false,
  }
}

const utilities = {
	namespaced: true,
  state: getDefaultState(),
  getters: {
		showNavBar(state) {
			return state.showNavBar;
		},
		darkMode(state) {
			return state.darkMode;
		},
  },
	mutations: {
		resetState(state) {
			Object.assign(state, getDefaultState());
		},
		updateNavBar(state, bool) {
			state.showNavBar = bool;
		},
		updateDarkMode(state) {
			state.darkMode = !state.darkMode;
		},
	},
	actions: {
		resetGlobalState(context) {
			context.commit('auth/resetState', null, { root: true })
			context.commit('dialogs/resetState', null, { root: true })
		}
	}
}

export default utilities