const path = 'http://localhost:3001';
import axios from 'axios';
import { getAxiosConfig } from '../helpers/auth';

export default {
  getRecords() {
    return axios.get(`${path}/api/records`, getAxiosConfig);
  },
  deleteRecord(record) {
    return axios.post(`${path}/api/records/delete`, { id: record.id });
  },
  editRecord(data) {
    return axios.post(`${path}/api/records/edit`, data);
  },
  addRecord(data) {
    return axios.post(`${path}/api/records/add`, data);
  }
}
