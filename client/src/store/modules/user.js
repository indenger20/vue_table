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
      const redirectPath = location.href.split('redirect=%2F');
      router.push(`/${redirectPath.length > 1 ? redirectPath[1] : ''}`);
    },
    logout(state) {
      state.user = null;
      router.push('/');
    }
  },
  actions: {
    singin({ commit }, data) {
      const $this = this;
      UserServices.singin(data).then((result) => {
        const user = result.data;
        commit('singin', {
          username: user.username,
          id: user.id,
        });
        $this.dispatch("document/getAllRecords");
      });
    },
    login({ commit }) {
      const $this = this;
      UserServices.login().then((result) => {
        const user = result.data;
        commit('singin', {
          username: user.username,
          id: user.id,
        });
        $this.dispatch("document/getAllRecords");
      });
    },
    logout({ commit }) {
      UserServices.logout();
      commit('logout');
    }
  },
  getters: {}
}