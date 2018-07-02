const path = 'http://localhost:3001/api/orders/';
import axios from 'axios';
import { getAxiosConfig } from '../helpers/auth';
import { sortAlphabetical } from '../helpers/utils';

export default {
  async getAll(user) {
    let fullPath = `${path}`;
    if (user.group === 'admin') {
      fullPath += 'admin';
    }
    try {
      const data = await axios.get(fullPath, getAxiosConfig());
      return data.data;
    } catch(err) {
      throw new Error(err);
    }
  },
  deleteRecord(record) {
    return axios.delete(`${path}${record.id}`, getAxiosConfig());
  },
  editRecord(data) {
    return axios.put(`${path}`, data, getAxiosConfig());
  },
  async create(product_id) {
    try {
      const data = await axios.post(`${path}`, { product_id }, getAxiosConfig());
      return data.data;
    } catch(err) {
      throw new Error(err);
    }
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
