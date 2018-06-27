const path = 'http://localhost:300/api/orders/';
import axios from 'axios';
import { getAxiosConfig } from '../helpers/auth';
import { sortAlphabetical } from '../helpers/utils';
export default {
  getRecords(user) {
    let fullPath = `${path}`
    if (user.group === 'admin') {
      fullPath += 'admin';
    }
    return axios.get(fullPath, getAxiosConfig());
  },
  deleteRecord(record) {
    return axios.delete(`${path}${record.id}`, getAxiosConfig());
  },
  editRecord(data) {
    return axios.put(`${path}`, data, getAxiosConfig());
  },
  addRecord(data) {
    return axios.post(`${path}`, data, getAxiosConfig());
  },
  searchRecords(query) {
    return axios.get(`${path}${query}`, getAxiosConfig());
  },
  sortRecords(records, type, col) {
    if (type === 'Alphabetic') {
      records.sort((a, b) => {
        return sortAlphabetical(a[col], b[col]);
      });
    }
  },
  reorder(records, dropIndex, dragginIndex) {
    const removedRecord = records.splice(dragginIndex, 1);
    records.splice(dropIndex, 0, removedRecord[0]);
  }
}
