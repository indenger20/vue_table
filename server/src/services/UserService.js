const client = require('../db/client');

module.exports = {
  getUserByName(username) {
    return new Promise((resolve, reject) => {
      client.query(`SELECT id, username, password FROM users WHERE username = '${username}';`, (error, results, fields) => {
        if (error) reject(error);
        resolve(...results);
      });
    });
  },
  getUserById(id) {
    return new Promise((resolve, reject) => {
      client.query(`SELECT id, username FROM users WHERE id = '${id}'`, (error, results) => {
        if (error) reject(error);
        resolve(...results);
      });
    });
  },
  authenticate(username, password) {
    return new Promise((resolve, reject) => {
      if (!username && !password) {
        return reject('Empty fields');
      }
      this.getUserByName(username).then(user => {
        if (user === undefined) {
          return reject('Incorrect username');
        }
        if (user.password === password) {
          return resolve(user);
        } else {
          return reject('Incorrect password');
        }
      });
    });
  },
}