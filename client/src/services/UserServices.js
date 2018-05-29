import axios from 'axios';
import { setToken } from '../helpers/auth';
const path = 'http://localhost:3001';
import { getAxiosConfig, removeToken } from '../helpers/auth';

export default {

  singin({ username, password }) {
    return axios.post(`${path}/auth/singin`, {
      username,
      password
    }).then(res => {
      setToken(res.data.token);
      return res;
    })
  },

  login() {
    return axios.get(`${path}/auth/login`, getAxiosConfig());
  },

  logout() {
    removeToken();
  }

}