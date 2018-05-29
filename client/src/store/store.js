import Vue from 'vue';
import Vuex from 'vuex';


import userStore from './modules/user';
import documentStore from './modules/document';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userStore,
    document: documentStore
  }
})
