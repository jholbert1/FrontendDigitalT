import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../components/Users.vue')
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../components/Vehicles.vue')
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: () => import(/* webpackChunkName: "about" */ '../components/ConfirmAccount.vue')
  },
  {
    path: '*',
    redirect: "/",
    component: () => import(/* webpackChunkName: "about" */ '../components/ConfirmAccount.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const authUser = store.getters["auth/AUTHENTICATED"];

  // Verifico Autenticacion
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authUser) {
      next({ path: "/" })
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router
