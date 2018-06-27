const path = 'http://localhost:3001';
import axios from 'axios';
import { getAxiosConfig } from '../helpers/auth';

const fullPath = `${path}/api/products/`;

export default {
  getProducts() {
    return new Promise((resolve, reject) => {
      axios.get(fullPath, getAxiosConfig()).then(data => resolve(data.data));
    })
  },
  
}
