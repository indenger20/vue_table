const path = 'http://localhost:3001';
import axios from 'axios';
import { getAxiosConfig } from '../helpers/auth';
import { sortAlphabetical } from '../helpers/utils';

export default {
  getRecords(user) {
    let fullPath = `${path}/api/records/`
    if (user.group === 'admin') {
      fullPath += 'admin';
    }
    return axios.get(fullPath, getAxiosConfig());
  },
  deleteRecord(record) {
    return axios.delete(`${path}/api/records/${record.id}`, getAxiosConfig());
  },
  editRecord(data) {
    return axios.put(`${path}/api/records/`, data, getAxiosConfig());
  },
  addRecord(data) {
    return axios.post(`${path}/api/records/`, data, getAxiosConfig());
  },
  searchRecords(query) {
    return axios.get(`${path}/api/records/${query}`, getAxiosConfig());
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
