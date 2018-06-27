import Vue from 'vue';
import Vuex from 'vuex';


import userStore from './modules/user';
import documentStore from './modules/document';
// import ordersStore from './modules/orders';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userStore,
    document: documentStore
  }
})
