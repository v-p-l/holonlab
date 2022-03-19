import Vue from 'vue'
import VueRouter from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from "@/store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
	{
		path: "/settings",
		name: "settings",
		component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings/Settings.vue'),
		meta: {
			requiredAuth: true
		}
	},
	{
		path: "/auth",
		name: "auth",
		component: () => import(/* webpackChunkName: "Authenticated" */ '@/views/Authenticated.vue'),
		meta: {
			requiredAuth: true,
			requiredMailVerified: true
		}
	},
  {
    path: '/error',
    name: 'error',
    component: () => import(/* webpackChunkName: "error" */ '@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
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
	if (to.meta.requiredAuth) {
		if (await getCurrentUser()) {
			if (to.meta.requiredMailVerified) {
				if (store.getters["auth/isEmailVerified"]) {
					next();
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
