const path = 'http://localhost:3001/api/orders/';
import axios from 'axios';
import { getAxiosConfig } from '../helpers/auth';
import { sortAlphabetical } from '../helpers/utils';

export default {
  getAll(user) {
    let fullPath = `${path}`;
    if (user.group === 'admin') {
      fullPath += 'admin';
    }
    return new Promise((resolve, reject) => {
      axios.get(fullPath, getAxiosConfig()).then(data => resolve(data.data));
    })
  },
  deleteRecord(record) {
    return axios.delete(`${path}${record.id}`, getAxiosConfig());
  },
  editRecord(data) {
    return axios.put(`${path}`, data, getAxiosConfig());
  },
  create(product_id) {
    return new Promise((resolve, reject) => {
      axios.post(`${path}`, { product_id }, getAxiosConfig()).then(data => resolve(data.data));
    })
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
