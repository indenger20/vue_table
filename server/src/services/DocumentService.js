const client = require('../db/client');

module.exports = {
  getRecords(user_id) {
    return new Promise((resolve, reject) => {
      client.query(`SELECT id, title as first_name, comment as last_name FROM records WHERE user_id = ${user_id}`, (error, results, fields) => {
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

  addRecord({ first_name, last_name, user_id }) {
    return new Promise((resolve, reject) => {
      const record_id = new Promise((resolve, reject) => {
        client.query(`
        INSERT INTO records (created_at, title, comment, user_id) VALUES(NOW(), '${first_name}', '${last_name}', '${user_id}');
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
  },

  getRecordsAll() {
    return new Promise((resolve, reject) => {
      client.query(`SELECT id, title as first_name, comment as last_name FROM records;`, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }, 

  searchRecords(query, user_id) {
    return new Promise((resolve, reject) => {
      client.query(`SELECT id, title as first_name, comment as last_name FROM records 
        WHERE user_id = ${user_id}
        AND title LIKE '%${query}%'
        OR comment LIKE '%${query}%';`, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }

}