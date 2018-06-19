import DocumentService from '../../services/DocumentService';

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
      DocumentService.sortRecords(state.records, type, col);
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
      DocumentService.reorder(state.records, dropIndex, dragginIndex);
    },
    searchRecords(state, query) {
      const records = DocumentService.searchRecords(state.records, query);
      state.records = records;
    }
  },
  actions: {
    addRecord({ commit }, data) {
      DocumentService.addRecord(data).then((response) => {
        commit('addRecord', response.data);
      });
    },
    deleteRecord({ commit }, { record }) {
      DocumentService.deleteRecord(record).then((response) => {
        commit('deleteRecord', response.data);
      });
    },
    editRecord({ commit }, data) {
      DocumentService.editRecord(data).then((response) => {
        commit('editRecord', response.data);
      });
    },
    getAllRecords({ commit }, user) {
      DocumentService.getRecords(user).then((response) => {
        commit('updateRecords', response.data);
      }, (reject) => {
        commit('updateRecords', []);
      });
    },
  }
}