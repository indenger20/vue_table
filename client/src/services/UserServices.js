import axios from 'axios';
import { setToken } from '../helpers/auth';
const path = 'http://localhost:3001';


export default {

  login({ username, password }) {
    return axios.post(`${path}/auth/login`, {
      username,
      password
    }).then(res => {
      setToken(res.data.token);
      window.location = '/home';
      return res;
    })
  },

}