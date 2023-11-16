import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DictionaryView from '../views/DictionaryView.vue';
import TranslatorView from '../views/TranslatorView.vue';
import FavoritesView from '../views/FavoritesView.vue';
import Dashboard from '../views/DashBoard.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dictionary',
    name: 'dictionary',
    component: DictionaryView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/translator',
    name: 'translator',
    component: TranslatorView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe after getting the user
      resolve(user);
    }, reject);
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = await getCurrentUser();
    if (user) {
      next();
    } else {
      alert('Please login');
      next('/');
    }
  } else {
    next();
  }
});

export default router;