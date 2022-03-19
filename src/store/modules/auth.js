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
	updatePassword
} from "firebase/auth";
import router from '@/router';

const getDefaultState = () => {
	return {
		displayName: null,
		email: null,
		emailVerified: null,
		photoURL: null,
		uid: null,
		providerData: []
	}
}

const auth = {
	namespaced: true,
	state: getDefaultState(),
	getters: {
		isLoggedIn(state) {
			return state.uid != null;
		},
		userName(state) {
			return state.displayName;
		},
		userEmail(state) {
			return state.email;
		},
		userImg(state) {
			return state.photoURL;
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
	},
	mutations: {
		resetState(state) {
			Object.assign(state, getDefaultState());
		},
		updateUser(state, userObject) {
			const { displayName, email, emailVerified, photoURL, uid, providerData } = userObject;
			state.displayName = displayName;
			state.email = email;
			state.emailVerified = emailVerified;
			state.photoURL = photoURL;
			state.uid = uid;
			state.providerData = providerData;
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

			return createUserWithEmailAndPassword(auth, email, password)
				.then((res) => {
					updateProfile(res.user, { displayName: username })
						.then(() => {
							commit('updateUser', res.user);
						})
						.catch(() => {
							throw "An error happened while updating user";
						})
					sendEmailVerification(res.user)
						.catch(() => {
							throw "An error happened while sending verification mail";
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
		async signOutUser({ commit }) {
			const auth = getAuth();

			return signOut(auth)
				.then(() => {
					commit('resetState');
					if (router.currentRoute.name !== "Home") {
						router.push('/');
					}
				})
				.catch((err) => {
					console.log(err)
					switch (err.code) {
						default:
							throw "An error happened while signing out";
					}
				})
		},
		async onUserAuthStateChanged({ commit }) {
			const auth = getAuth();

			return onAuthStateChanged(auth, (user) => {
				user ? commit('updateUser', user) : commit('resetState')
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
			console.log(payload)

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
					console.log(err)
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
						.catch((err) => {
							switch (err.code) {
								default:
									throw "An error happened";
							}
						})
				})
		},
	}
}

export default auth