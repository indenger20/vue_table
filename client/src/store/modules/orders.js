import OrdersService from '../../services/OrdersService';

export default {
  namespaced: true,
  state: {
    orders: [],
    staticOrders: [],
  },
  mutations: {

    clear(state) {
      state.orders = [];
      state.staticOrders = [];
    },

    deleteRecord(state, order) {
      state.orders = state.orders.filter(o => o.id !== order.id);
      state.staticOrders = [...state.orders];
    },

    editRecord(state, record) {
      state.records.forEach(r => {
        if (r.id === record.id) {
          r.first_name = record.first_name;
          r.last_name = record.last_name;
        }
      });
      state.staticOrders = [...state.orders];
    },
    update(state, orders) {
      state.orders = orders;
      state.staticOrders = [...state.orders];
    },
    reorder(state, { dropIndex, dragginIndex }) {
      OrdersService.reorder(state.orders, dropIndex, dragginIndex);
      state.staticOrders = [...state.orders];
    },
    filterOrders(state, query) {
      state.orders = state.staticOrders.filter(o => o.title.toUpperCase().indexOf(query.toUpperCase()) > -1);
    },
  },
  actions: {
    async create({ commit }, product) {
      const orders = await OrdersService.create(product.id);
      commit('update', orders);
      this.commit('document/inCart', product.id);
    },
    async removeOrder({ commit }, { order }) {
      const orders = await OrdersService.removeOrder(order);
      commit('update', orders);
      this.commit('document/fromCart', order.product_id);
    },

    async getAll({ commit }, user) {
      const orders = await OrdersService.getAll(user);
      commit('update', orders);
    },

  }
}