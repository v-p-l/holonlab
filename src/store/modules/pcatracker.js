// Firestore modular SDK (v9)
import db from "@/main.js";
import { collection, doc, getDoc, setDoc, updateDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore";

const getDefaultState = () => {
	return {
		filters: {
			name: "",
			rarity: "",
			setName: "",
		},
	}
}

const pcatracker = {
	namespaced: true,
	state: getDefaultState(),
	getters: {
		filters(state) {
			return state.filters;
		}
	},
	mutations: {
		updateFilters({ state }, newFilters) {
			state.filters = newFilters;
		}
	},
	actions: {
		async getCards({ rootGetters }, query) {
			const userId = rootGetters['auth/userId'];

			// Get data from DB
			const queryCardsSnapshot = await getDocs(query);

			// Get the last visible document
			const nextQuery = queryCardsSnapshot.docs[queryCardsSnapshot.docs.length - 1];

			// If true, set isFavorite to true and push card to cards array
			let cards = [];
			for (let doc of queryCardsSnapshot.docs) {
				const card = doc.data();
				card.id = doc.id;
				card.isFavorite = card.usersFav.find(user => user === userId);

				cards.push(card);
			}

			// Return cards
			return { cards, nextQuery };
		},
		async getCardDetails({ rootGetters }, cardId) {
			const userId = rootGetters['auth/userId'];

			// Get collection reference and initialize query
			const cardsRef = doc(db, "cards", cardId);
			const cardSnapshot = await getDoc(cardsRef);

			let card = {};
			if (cardSnapshot.exists()) {
				card = cardSnapshot.data();
				card.id = cardSnapshot.id;
				card.isFavorite = card.usersFav.find(user => user === userId);
			} else {
				throw "Erreur, impossible de récupérer les données :(";
			}

			// Get collection reference and initialize query
			const popsRef = collection(db, "cards", cardId, "history");
			const q = query(popsRef, orderBy("lastUpdate", "desc"), limit(5));
			const popSnapshot = await getDocs(q);
			let populationsHistory = [];
			popSnapshot.forEach((doc) => {
				populationsHistory.push(doc.data());
			})

			return { card, populationsHistory };
		},
		async getFavorites({ rootGetters }) {
			const userId = rootGetters['auth/userId'];

			// Get favorites from DB where user id key equal current user
			const favoritesRef = collection(db, "cards");
			const q = query(favoritesRef, where("usersFav", "array-contains", userId));
			const qSnapshot = await getDocs(q);

			// Open an empty array and push in all the favorites cardId
			let favorites = [];
			qSnapshot.forEach((doc) => {
				const card = doc.data();
				card.id = doc.id;
				card.isFavorite = card.usersFav.find(user => user === userId);
				favorites.push(card)
			});

			// If there is no favorites return to avoid error while querying with an empty array
			if (!favorites.length > 0) return [];

			// Return favorites cards
			return favorites;
		},
		async addToFavorite({ rootGetters }, payload) {
			const { cardId } = payload;
			const userId = rootGetters['auth/userId'];
			if (!userId) throw "Erreur";

			const cardsRef = doc(db, "cards", cardId);
			const cardSnapshot = await getDoc(cardsRef);

			// Verify if doc exist
			if (cardSnapshot.exists()) {
				// If user is already in the users fav array return, either add user to array
				if (cardSnapshot.data().usersFav.find(user => user === userId)) {
					const updatedUsersFav = cardSnapshot.data().usersFav.filter(user => user !== userId);
					setDoc(cardsRef, { usersFav: updatedUsersFav }, { merge: true });
					return "Carte retirée de vos favoris !"
				} else {
					// Get favorites from DB where user id key equal current user
					const favoritesRef = collection(db, "cards");
					const q = query(favoritesRef, where("usersFav", "array-contains", userId));
					const qSnapshot = await getDocs(q);

					if (qSnapshot.docs.length > 4) {
						throw "Vous ne pouvez pas avoir plus de 5 cartes dans vos favoris"
					}

					const updatedUsersFav = cardSnapshot.data().usersFav;
					updatedUsersFav.push(userId);
					setDoc(cardsRef, { usersFav: updatedUsersFav }, { merge: true });
					return "Carte ajoutée à vos favoris !"
				}
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
				throw "Erreur"
			}

		},
		async getNotifications({ rootGetters }) {
			const userId = rootGetters['auth/userId'];

			// Get favorites from DB where user id key equal current user
			const notificationsRef = collection(db, "users", userId, "notifications");
			const q = query(notificationsRef, orderBy("createdAt", "desc"));
			const qSnapshot = await getDocs(q);

			// Open an empty array and push in all the favorites cardId
			let notifications = [];
			qSnapshot.forEach((doc) => {
				const notification = doc.data();
				notifications.push(notification)
			});

			// If there is no favorites return to avoid error while querying with an empty array
			if (!notifications.length > 0) return [];

			// Return favorites cards
			return notifications;
		},
		async getLimitedNotifications({ rootGetters }, payload) {
			const userId = rootGetters['auth/userId'];

			// Get favorites from DB where user id key equal current user
			const notificationsRef = collection(db, "users", userId, "notifications");
			const q = query(notificationsRef, orderBy("createdAt", "desc"), limit(payload));
			const qSnapshot = await getDocs(q);

			// Open an empty array and push in all the favorites cardId
			let notifications = [];
			qSnapshot.forEach((doc) => {
				const notification = doc.data();
				notifications.push(notification)
			});

			// If there is no favorites return to avoid error while querying with an empty array
			if (!notifications.length > 0) return [];

			// Return favorites cards
			return notifications;
		},
		async getTotalNewNotifications({ rootGetters }) {
			const userId = rootGetters['auth/userId'];

			// Get favorites from DB where user id key equal current user
			const notificationsRef = doc(db, "users", userId);
			const docSnap = await getDoc(notificationsRef);

			if (docSnap.exists()) {
				return docSnap.data().newNotificationsCount;
			}
		},
		async setNewNotificationsToFalse({ rootGetters }, payload) {
			if (payload === 0) {
				return;
			}

			const userId = rootGetters['auth/userId'];

			// Get favorites from DB where user id key equal current user
			const notificationsCountRef = doc(db, "users", userId);
			const docSnap = await getDoc(notificationsCountRef);

			if (docSnap.exists()) {
				updateDoc(notificationsCountRef, { newNotificationsCount: 0 });
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}

			// const notificationsRef = collection(db, "users", userId, "notifications");
			// const q = query(notificationsRef, where("new", "==", true));
			// const docsSnapshot = await getDocs(q);

			// const batch = db.batch();
			// docsSnapshot.forEach((doc) => {
			// 	batch.update(doc.ref, { "new": false });
			// })
			// await batch.commit();

			return;
		},
		updateFilters({ commit }, newFilters) {
			commit('updateFilters', newFilters);
		}
	}
}

export default pcatracker