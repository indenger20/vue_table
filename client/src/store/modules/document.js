import DocumentService from '../../services/DocumentService';

export default {
  namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    updateProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    async getProducts({ commit }) {
      const products = await DocumentService.getProducts();
      commit('updateProducts', products);
    }
  }
}