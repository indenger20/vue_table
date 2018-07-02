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
    async singin({ commit }, data) {
      const $this = this;
      const result = await UserServices.singin(data);
      const user = {
        username: result.username,
        id: result.id,
        group: result.group,
      }
      commit('singin', user);
      $this.dispatch('orders/getAll', user);
    },
    async login({ commit }) {
      const $this = this;
      const result = await UserServices.login();
      const user = {
        username: result.username,
        id: result.id,
        group: result.group,
      }
      commit('singin', user);
      $this.dispatch('orders/getAll', user);
    },
    logout({ commit }) {
      UserServices.logout();
      commit('logout');
      this.commit('orders/clear');
      this.commit('document/clear');
    }
  },
  getters: {}
}