const getDefaultState = () => {
  return {
		showLoginDialog: false,
		showForgotPasswordDialog: false,
		showVerifyEmailDialog: false,
  }
}

const dialogs = {
	namespaced: true,
  state: getDefaultState(),
  getters: {
		showLoginDialog (state) {
			return state.showLoginDialog;
		},
		showForgotPasswordDialog (state) {
			return state.showForgotPasswordDialog;
		},
		showVerifyEmailDialog (state) {
			return state.showVerifyEmailDialog;
		},
  },
	mutations: {
		resetState(state) {
			Object.assign(state, getDefaultState());
		},
		updateLoginDialog (state, bool) {
			state.showLoginDialog = bool;
		},
		updateForgotPasswordDialog (state, bool) {
			state.showForgotPasswordDialog = bool;
		},
		updateVerifyEmailDialog (state, bool) {
			state.showVerifyEmailDialog = bool;
		},
	}
}

export default dialogs