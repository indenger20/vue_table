import axios from 'axios';
import { setToken } from '../helpers/auth';
const path = 'http://localhost:3001';
import { getAxiosConfig, removeToken } from '../helpers/auth';

export default {

  async singin({ username, password }) {
    try {
      const data = await axios.post(`${path}/auth/singin`, {
        username,
        password
      });
      setToken(data.data.token);
      return data.data;
    } catch (err) {
      throw new Error(err);
    }
  },

  async login() {
    try {
      const data = await axios.get(`${path}/auth/login`, getAxiosConfig());
      return data.data;
    } catch (err) {
      throw new Error(err);
    }

  },

  logout() {
    removeToken();
  }

}