import {
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	updateProfile,
	sendEmailVerification,
	sendPasswordResetEmail,
	signOut,
	onAuthStateChanged,
	reauthenticateWithCredential,
	updateEmail,
	EmailAuthProvider,
	updatePassword,
	getIdTokenResult
} from "firebase/auth";
import router from '@/router';

const getDefaultState = () => {
	return {
		displayName: null,
		email: null,
		emailVerified: null,
		uid: null,
		providerData: [],
		role: null,
	}
}

const auth = {
	namespaced: true,
	state: getDefaultState(),
	getters: {
		isLoggedIn(state) {
			return state.uid != null;
		},
		userId(state) {
			return state.uid;
		},
		userName(state) {
			return state.displayName;
		},
		userEmail(state) {
			return state.email;
		},
		isEmailVerified(state) {
			return state.emailVerified;
		},
		userProvider(state) {
			if (state.providerData.length > 0) {
				return state.providerData[0].providerId;
			} else {
				return null
			}
		},
		isAdmin(state) {
			return state.role === "admin";
		}
	},
	mutations: {
		resetState(state) {
			Object.assign(state, getDefaultState());
		},
		updateUser(state, userObject) {
			const { displayName, email, emailVerified, uid, providerData, reloadUserInfo } = userObject;
			state.displayName = displayName;
			state.email = email;
			state.emailVerified = emailVerified;
			state.uid = uid;
			state.providerData = providerData;
			let customAttributes = reloadUserInfo.customAttributes;
			let parsedCA = JSON.parse(customAttributes);
			state.role = parsedCA.role;
		},
	},
	actions: {
		async loginWithEmail({ commit }, credentials) {
			const auth = getAuth();
			const { email, password } = credentials;

			return signInWithEmailAndPassword(auth, email, password)
				.then((res) => {
					commit('updateUser', res.user);
				})
				.catch((err) => {
					switch (err.code) {
						case "auth/invalid-email":
							throw "Invalid email";
						default:
							throw "Email or password was incorrect";
					}
				});
		},
		async loginWithGoogle({ commit }) {
			const auth = getAuth();
			const provider = new GoogleAuthProvider();

			return signInWithPopup(auth, provider)
				.then((res) => {
					commit('updateUser', res.user);
				})
		},
		async registerWithEmail({ commit }, credentials) {
			const auth = getAuth();
			const { username, email, password } = credentials;
			if (!username || !email || !password) throw ("Please complete the form");

			return createUserWithEmailAndPassword(auth, email, password)
				.then(async (res) => {
					return updateProfile(res.user, { displayName: username })
						.then(async () => {
							commit('updateUser', res.user);
							return sendEmailVerification(res.user).catch(() => {
								throw "An error happened while sending verification mail";
							})
						})
						.catch(() => {
							throw "An error happened while updating user";
						})
				})
				.catch((err) => {
					switch (err.code) {
						case "auth/email-already-in-use":
							throw "Email already in use";
						case "auth/invalid-email":
							throw "Invalid email";
						case "auth/operation-not-allowed":
							throw "Operation not allowed";
						case "auth/weak-password":
							throw "Weak password";
						default:
							throw "An error happened while creating your account";
					}
				})
		},
		async signOutUser({ dispatch }) {
			const auth = getAuth();

			return signOut(auth)
				.then(() => {
					dispatch('utilities/resetGlobalState', null, { root: true })
					if (router.currentRoute.name !== "Home") {
						router.push('/');
					}
				})
				.catch((err) => {
					switch (err.code) {
						default:
							throw "An error happened while signing out";
					}
				})
		},
		async onUserAuthStateChanged({ dispatch, commit }) {
			const auth = getAuth();

			return onAuthStateChanged(auth, async (user) => {
				user ? commit('updateUser', user) : dispatch('utilities/resetGlobalState', null, { root: true })
			})
		},
		async resetUserPassword(_, email) {
			const auth = getAuth();

			return sendPasswordResetEmail(auth, email)
				.catch((err) => {
					switch (err.code) {
						case "auth/invalid-email":
							throw "Invalid email";
						default:
							throw "An error happened";
					}
				});
		},
		async newEmailVerification() {
			const auth = getAuth();

			return sendEmailVerification(auth.currentUser)
				.catch((err) => {
					switch (err.code) {
						default:
							throw "An error happened";
					}
				})
		},
		async updateUserEmail({ dispatch, commit }, payload) {
			const auth = getAuth();
			const { email, password } = payload;
			const credential = EmailAuthProvider.credential(auth.currentUser.email, password);

			try {
				await reauthenticateWithCredential(auth.currentUser, credential)
				await updateEmail(auth.currentUser, email)
				commit('updateUser', auth.currentUser)
				dispatch('newEmailVerification', auth.currentUser)
			} catch (err) {
				switch (err.code) {
					case "auth/invalid-email":
						throw "Invalid email";
					case "auth/user-not-found":
						throw "No account with that email was found";
					case "auth/wrong-password":
						throw "Incorrect password";
					default:
						throw "Error while updating email";
				}
			}
		},
		async updateUserPassword({ commit }, payload) {
			const auth = getAuth();
			const { currentPw, newPw } = payload;
			const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPw);

			return reauthenticateWithCredential(auth.currentUser, credential)
				.then(() => {
					updatePassword(auth.currentUser, newPw)
						.then(() => {
							commit('updateUser', auth.currentUser)
						})
						.catch((err) => {
							switch (err.code) {
								default:
									throw "An error happened";
							}
						})
				})
				.catch((err) => {
					switch (err.code) {
						case "auth/invalid-email":
							throw "Invalid email";
						case "auth/user-not-found":
							throw "No account with that email was found";
						case "auth/wrong-password":
							throw "Current password incorrect";
						default:
							throw "An error happened";
					}
				})

		},
		async updateUserName({ commit }, newUserName) {
			const auth = getAuth();
			return updateProfile(auth.currentUser, { displayName: newUserName })
				.then(() => {
					commit('updateUser', auth.currentUser)
				})
				.catch((err) => {
					switch (err) {
						default:
							throw "An error happened";
					}
				})
		},
		async verifyUserIsAdmin() {
			const auth = getAuth();
			return getIdTokenResult(auth.currentUser)
				.then((idTokenResult) => {
					if (idTokenResult.claims.role === "admin") {
						return true
					} else {
						return false
					}
				})
				.catch((error) => {
					throw error
				});
		}
	}
}

export default auth