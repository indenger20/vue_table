import UserServices from '../../services/UserServices';
import router from '../../router';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    singin(state, user) {
      state.user = user;
      router.push('/');
    },
    logout(state) {
      state.user = null;
      router.push('/');
    }
  },
  actions: {
    singin({ commit }, data) {
      UserServices.singin(data).then((result) => {
        const user = result.data;
        commit('singin', {
          username: user.username,
          id: user.id,
        });
      });
    },
    login({ commit }) {
      UserServices.login().then((result) => {
        const user = result.data;
        commit('singin', {
          username: user.username,
          id: user.id,
        });
      });
    },
    logout({ commit }) {
      UserServices.logout();
      commit('logout');
    }
  },
  getters: {}
}