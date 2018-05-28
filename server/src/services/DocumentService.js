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
      const record = null;
      this.getRecordById(id).then(r => {
        client.query(`
        DELETE FROM records WHERE id = ${id};
      `, (error, results, fields) => {
            if (error) reject(error);
            resolve(r)
          });
      });
    });
  },

  editRecord({ id, first_name, last_name }) {
    return new Promise((resolve, reject) => {
      const record_id = new Promise((resolve, reject) => {
        client.query(`
        UPDATE records SET title = '${first_name}', comment = '${last_name}' WHERE id = ${id};
      `, (error, results, fields) => {
            if (error) reject(error);
            resolve(id);
          });
      });
      record_id.then((id) => {
        this.getRecordById(id).then(r => resolve(r));
      })
    });
  },

  addRecord({ first_name, last_name }) {
    return new Promise((resolve, reject) => {
      const record_id = new Promise((resolve, reject) => {
        client.query(`
        INSERT INTO records (created_at, title, comment) VALUES(NOW(), '${first_name}', '${last_name}');
      `, (error, results, fields) => {
            if (error) reject(error);
            resolve(results.insertId);
          });
      });
      record_id.then((id) => {
        this.getRecordById(id).then(r => resolve(r));
      })
    });
  },

  getRecordById(id) {
    return new Promise((resolve, reject) => {
      client.query(`
        SELECT id, title as first_name, comment as last_name FROM records WHERE id = ${id};
      `, (error, results, fields) => {
          if (error) reject(error);
          resolve(...results);
        });
    })
  }

}