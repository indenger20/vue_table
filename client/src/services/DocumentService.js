const path = 'http://localhost:3001';
import axios from 'axios';
import { getAxiosConfig } from '../helpers/auth';

const sortAlphabetical = (a, b) => {
  return a.localeCompare(b);
}

export default {
  getRecords() {
    return axios.get(`${path}/api/records`, getAxiosConfig());
  },
  deleteRecord(record) {
    return axios.post(`${path}/api/records/delete`, { id: record.id }, getAxiosConfig());
  },
  editRecord(data) {
    return axios.put(`${path}/api/records/edit`, data, getAxiosConfig());
  },
  addRecord(data) {
    return axios.post(`${path}/api/records/add`, data, getAxiosConfig());
  },
  searchRecords(query) {
    return axios.post(`${path}/api/records/search`, { query: query }, getAxiosConfig());
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
