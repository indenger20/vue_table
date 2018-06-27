const client = require('../db/client');

module.exports = {

  getProducts() {
    return new Promise((resolve, reject) => {
      client.query(`SELECT id, title, img, price FROM products`, (error, results, fields) => {
        if (error) reject(error);
        resolve(results);
      });
    })
  }

}