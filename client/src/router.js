import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import More from './views/More.vue';
import Login from './views/Login.vue';
import store from './store/store';

Vue.use(Router);

const router = new Router({
  redirect: {
    '*': '/about'
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/more',
      name: 'more',
      component: More,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && store.state.user.user === null) {
    next({ path: '/login', query: { redirect: to.fullPath }});
  } else {
    next();
  }
});

export default router;