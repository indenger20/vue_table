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
    inCart(state, product_id) {
      const products = state.products.map(p => {
        if (p.id === product_id) {
          p.inCart = true;
        }
        return p;
      })
      state.products = products;
    }
  },
  actions: {
    async getProducts({ commit }) {
      const products = await DocumentService.getProducts();
      commit('updateProducts', products);
    }
  }
}