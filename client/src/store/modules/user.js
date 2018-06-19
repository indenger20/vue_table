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
        const user = {
          username: result.data.username,
          id: result.data.id,
          group: result.data.group,
        }
        commit('singin', user);
        $this.dispatch("document/getAllRecords", user);
      });
    },
    login({ commit }) {
      const $this = this;
      UserServices.login().then((result) => {
        const user = {
          username: result.data.username,
          id: result.data.id,
          group: result.data.group,
        }
        commit('singin', user);
        $this.dispatch("document/getAllRecords", user);
      });
    },
    logout({ commit }) {
      UserServices.logout();
      commit('logout');
    }
  },
  getters: {}
}