import axios from 'axios';

const path = 'http://localhost:3001';


export default {
  getRecords() {
    return axios.get(`${path}/api/records`);
  },
  deleteRecord(record) {
    return axios.post(`${path}/api/records/delete`, { id: record.id });
  }
}
