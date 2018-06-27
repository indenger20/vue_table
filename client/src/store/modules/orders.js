import OrdersService from '../../services/OrdersService';

export default {
  namespaced: true,
  state: {
    records: [],
    sortDirection: {
      type: null,
      col: null
    }
  },
  mutations: {
    sortRecords(state, { type, col }) {
      state.sortDirection = {
        type,
        col
      };
      OrdersService.sortRecords(state.records, type, col);
    },

    addRecord(state, record) {
      state.records.push(record);
    },

    deleteRecord(state, record) {
      state.records = state.records.filter(r => r.id !== record.id);
    },

    editRecord(state, record) {
      state.records.forEach(r => {
        if (r.id === record.id) {
          r.first_name = record.first_name;
          r.last_name = record.last_name;
        }
      })
    },
    updateRecords(state, records) {
      state.records = records;
    },
    reorder(state, { dropIndex, dragginIndex }) {
      OrdersService.reorder(state.records, dropIndex, dragginIndex);
    },
  },
  actions: {
    addRecord({ commit }, data) {
      OrdersService.addRecord(data).then((response) => {
        commit('addRecord', response.data);
      });
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
    getAllRecords({ commit }, user) {
      OrdersService.getRecords(user).then((response) => {
        commit('updateRecords', response.data);
      }, (reject) => {
        commit('updateRecords', []);
      });
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