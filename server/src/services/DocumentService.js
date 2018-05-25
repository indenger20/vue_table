const client = require('../db/client');

module.exports = {
  getRecords() {
    return new Promise((resolve, reject) => {
      client.query('SELECT `id`, `title` as `first_name`, `comment` as `last_name` FROM records', (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  },

  deleteRecord(id) {
    return new Promise((resolve, reject) => {
      client.query(`
        DELETE FROM records WHERE id = ${id};
      `, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }

}