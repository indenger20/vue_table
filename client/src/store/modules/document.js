import DocumentService from '../../services/DocumentService';

export default {
  namespaced: true,
  state: {
    records: [],
  },
  mutations: {
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
    getAllRecords({ commit }) {
      DocumentService.getRecords().then((response) => {
        commit('updateRecords', response.data);
      }, (reject) => {
        commit('updateRecords', []);
      });
    },
    
  }
}