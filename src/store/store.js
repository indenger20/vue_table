import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    records: [
      {
        "first_name": "title1",
        "last_name": "value1"
      },
      {
        "first_name": "title1",
        "last_name": "value1"
      }
    ]
  },
  mutations: {
    addRecord(state, { data }) {
      state.records.push({
        data
      });
    },

    deleteRecord(state, { record }) {
      state.records.splice(state.records.indexOf(record), 1);
    },

    editRecord(state, { record, first_name, last_name }) {
      record.first_name = first_name;
      record.last_name = last_name;
    },

  },
  actions: {

  }
})
