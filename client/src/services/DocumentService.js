const path = 'http://localhost:3001';
import axios from 'axios';
import { getAxiosConfig } from '../helpers/auth';

const fullPath = `${path}/api/products/`;

export default {
  async getProducts(currentPage) {
    try {
      const filterQuery = window.location.search;
      const data = await axios.get(`${fullPath}${currentPage}${filterQuery}`, getAxiosConfig());
      return data.data;
    } catch (err) {
      throw new Error(err);
    }
  },

  async getFullList(currentPage) {
    try {
      const filterQuery = window.location.search;
      const data = await axios.get(`${fullPath}list/${currentPage}${filterQuery}`, getAxiosConfig());
      return data.data;
    } catch (err) {
      throw new Error(err);
    }
  },

  async getInformation(product_id) {
    try {
      const data = await axios.get(`${fullPath}information/${product_id}`, getAxiosConfig());
      return data.data;
    } catch (err) {
      throw new Error(err);
    }
  }

}
