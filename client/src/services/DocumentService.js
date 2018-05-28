const path = 'http://localhost:3001';
import Vue from 'vue';


export default {
  getRecords() {
    return Vue.axios.get(`${path}/api/records`);
  },
  deleteRecord(record) {
    return Vue.axios.post(`${path}/api/records/delete`, { id: record.id });
  },
  editRecord(data) {
    return Vue.axios.post(`${path}/api/records/edit`, data);
  },
  addRecord(data) {
    return Vue.axios.post(`${path}/api/records/add`, data);
  }
}
