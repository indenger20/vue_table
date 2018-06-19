const client = require('../db/client');

module.exports = {
  getUserByName(username) {
    return new Promise((resolve, reject) => {
      client.query('SELECT id, username, password, `group` FROM users WHERE username = "' + username + '";', (error, results, fields) => {
        if (error) reject(error);
        resolve(results[0]);
      });
    });
  },
  getUserById(id) {
    return new Promise((resolve, reject) => {
      client.query('SELECT id, username, `group` FROM users WHERE id = "' + id + '"', (error, results) => {
        if (error) reject(error);
        resolve(results[0]);
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
  isAdmin(user) {
    return user.group === 'admin';
  }
}