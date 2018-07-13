import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Cart from './views/Cart.vue';
import Catalog from './views/Catalog.vue';
import Login from './views/Login.vue';
import ProductInfo from './views/ProductInfo.vue';
import store from './store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  redirect: {
    '*': '/catalog'
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: { requiresAuth: true }
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/productInfo',
      name: 'productInfo',
      component: ProductInfo
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && store.state.user.user === null) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;