import Vue from 'vue'
import VueRouter from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from "@/store"

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/pca'
		// name: 'Home',
		// component: () => import(/* webpackChunkName: "Home" */ '@/views/Home/Home.vue'),
		// meta: {
		// 	title: "Home"
		// }
	},
	{
		path: '/pca',
		name: 'Cards',
		component: () => import(/* webpackChunkName: "Cards" */ '@/views/Cards/Cards.vue'),
		meta: {
			title: "PCA Tracker"
		}
	},
	{
		path: "/pca/:card_id",
		name: "CardSingle",
		component: () => import(/* webpackChunkName: "CardSingle" */ '@/views/Cards/CardSingle.vue'),
		meta: {
			title: "Carte"
		}
	},
	{
		path: '/about',
		name: 'About',
		component: () => import(/* webpackChunkName: "About" */ '@/views/About/About.vue'),
		meta: {
			title: "À propos"
		}
	},
	{
		path: "/settings",
		name: "Settings",
		component: () => import(/* webpackChunkName: "Settings" */ '@/views/Settings/Settings.vue'),
		meta: {
			title: "Settings",
			requiredAuth: true
		}
	},
	{
		path: "/favorites",
		name: "Favorites",
		component: () => import(/* webpackChunkName: "Favorites" */ '@/views/Favorites/Favorites.vue'),
		meta: {
			title: "Favoris",
			requiredAuth: true,
			requiredMailVerified: true
		}
	},
	{
		path: "/notifications",
		name: "Notifications",
		component: () => import(/* webpackChunkName: "Notifications" */ '@/views/Notifications/Notifications.vue'),
		meta: {
			title: "Notifications",
			requiredAuth: true,
			requiredMailVerified: false
		}
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import(/* webpackChunkName: "Admin" */ '@/views/Admin/Admin.vue'),
		meta: {
			title: "Admin",
			requiredAuth: true,
			requiredMailVerified: true,
			requiredAdmin: true
		}
	},
	{
		path: '/error',
		name: 'error',
		component: () => import(/* webpackChunkName: "error" */ '@/views/Error/Error.vue'),
		meta: {
			title: "Erreur",
			layout: 'blank',
		},
	},
	{
		path: '/*',
		redirect: 'error',
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const removeListener = onAuthStateChanged(
			getAuth(),
			(user) => {
				removeListener();
				resolve(user);
			},
			reject
		)
	})
}

router.beforeEach(async (to, from, next) => {
	document.title = to.meta.title + " - Holonlab";
	if (to.meta.requiredAuth) {
		if (await getCurrentUser()) {
			if (to.meta.requiredMailVerified) {
				if (store.getters["auth/isEmailVerified"]) {
					next();
					if (to.meta.requiredAdmin) {
						if (store.getters["auth/isAdmin"]) {
							next();
						} else {
							next(from);
						}
					} else {
						next();
					}
				} else {
					next(from);
					store.commit('dialogs/updateVerifyEmailDialog', true)
				}
			} else {
				next();
			}
		} else {
			next(from);
			store.commit('dialogs/updateLoginDialog', true)
		}
	} else {
		next();
	}
});

export default router
