import Vue from 'vue';
import Vuex from 'vuex';

import DocumentService from '../services/DocumentService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    records: [],
  },
  mutations: {
    addRecord(state, { first_name, last_name }) {
      state.records.push({
        first_name,
        last_name,
      });
    },

    deleteRecord(state, { record }) {
      state.records.splice(state.records.indexOf(record), 1);
    },

    editRecord(state, { record, first_name, last_name }) {
      record.first_name = first_name;
      record.last_name = last_name;
    },
    updateRecords(state, records) {
      state.records = records;
    }
  },
  actions: {
    addRecord({ commit }, data) {
      commit('addRecord', data);
    },
    deleteRecord({ commit }, { record }) {
      DocumentService.deleteRecord(record).then((response) => {
        commit('deleteRecord', record);
      })
    },
    editRecord({ commit }, data) {
      commit('editRecord', data);
    },
    getAllRecords({ commit }) {
      DocumentService.getRecords().then((response) => {
        commit('updateRecords', response.data)
      })
    }
  }
})
