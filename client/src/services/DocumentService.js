const path = 'http://localhost:3001';
import axios from 'axios';
import { getAxiosConfig } from '../helpers/auth';

const fullPath = `${path}/api/products/`;

export default {
  async getProducts(currentPage) {
    try {
      const data = await axios.get(`${fullPath}${currentPage}`, getAxiosConfig());
      return data.data;
    } catch (err) {
      throw new Error(err);
    }
  },

  async getPagesCount() {
    try {
      const data = await axios.post(`${fullPath}pages/`, getAxiosConfig());
      return data.data;
    } catch (err) {
      throw new Error(err);
    }
  }

}
