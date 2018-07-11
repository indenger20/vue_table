import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import BootstrapVue from 'bootstrap-vue';

import './assets/styles/index.scss';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Drag_Drop from 'vue-drag-and-drop';

Vue.use(BootstrapVue);
Vue.use(Drag_Drop);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
