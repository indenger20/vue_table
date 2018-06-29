import OrdersService from '../../services/OrdersService';

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  mutations: {
    
    clear(state) {
      state.orders = [];
    },

    deleteRecord(state, order) {
      state.orders = state.orders.filter(o => o.id !== order.id);
    },

    editRecord(state, record) {
      state.records.forEach(r => {
        if (r.id === record.id) {
          r.first_name = record.first_name;
          r.last_name = record.last_name;
        }
      })
    },
    update(state, orders) {
      state.orders = orders;
    },
    reorder(state, { dropIndex, dragginIndex }) {
      OrdersService.reorder(state.orders, dropIndex, dragginIndex);
    },
  },
  actions: {
    async create({ commit }, product) {
      const orders = await OrdersService.create(product.id);
      commit('update', orders);
      this.commit('document/inCart', product.id)
    },
    deleteRecord({ commit }, { record }) {
      OrdersService.deleteRecord(record).then((response) => {
        commit('deleteRecord', response.data);
      });
    },
    editRecord({ commit }, data) {
      OrdersService.editRecord(data).then((response) => {
        commit('editRecord', response.data);
      });
    },
    async getAll({ commit }, user) {
      const orders = await OrdersService.getAll(user);
      commit('update', orders);
    },
    searchRecords({ commit }, query) {
      OrdersService.searchRecords(query).then((response) => {
        commit('updateRecords', response.data);
      }, (reject) => {
        commit('updateRecords', []);
      })
    },
  }
}