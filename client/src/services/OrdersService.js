const path = 'http://localhost:3001/api/orders/';
import axios from 'axios';
import { getAxiosConfig } from '../helpers/auth';
// import { sortAlphabetical } from '../helpers/utils';

export default {
  async getAll(user) {
    let fullPath = `${path}`;
    if (user.group === 'admin') {
      fullPath += 'admin';
    }
    try {
      const data = await axios.get(fullPath, getAxiosConfig());
      return data.data;
    } catch (err) {
      throw new Error(err);
    }
  },
  async removeOrder(order) {
    try {
      const data = await axios.delete(`${path}${order.order_id}`, getAxiosConfig());
      return data.data;
    } catch (err) {
      throw new Error(err);
    }
  },
  async create(product_id) {
    try {
      const data = await axios.post(`${path}`, { product_id }, getAxiosConfig());
      return data.data;
    } catch (err) {
      throw new Error(err);
    }
  },

  reorder(records, dropIndex, dragginIndex) {
    const removedRecord = records.splice(dragginIndex, 1);
    records.splice(dropIndex, 0, removedRecord[0]);
  }
}
