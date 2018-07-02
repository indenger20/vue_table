const client = require('../db/client');

module.exports = {
  async create({ product_id, user_id }) {
    try {
      await client.then(conn => conn.query(`INSERT INTO orders (created_at, product_id, user_id) VALUES(NOW(), '${product_id}', '${user_id}');`));
      const orders = await this.getOrders(user_id);
      return orders;
    } catch(err) {
      throw new Error(err);
    }
  },

  getOrders(user_id) {
    try {
      const orders = client.then(conn => conn.query(`
          SELECT orders.id as order_id, orders.product_id, products.title, products.price, products.img 
          FROM orders INNER JOIN products ON orders.user_id = ${user_id} AND orders.product_id = products.id;
        `));
      return orders;
    } catch (err) {
      throw new Error(err);
    }
  },

  //   deleteOrder(id) {
  //     return new Promise((resolve, reject) => {
  //       const record = null;
  //       this.getRecordById(id).then(r => {
  //         client.query(`
  //         DELETE FROM orders WHERE id = ${id};
  //       `, (error, results, fields) => {
  //             if (error) reject(error);
  //             resolve(r)
  //           });
  //       });
  //     });
  //   },

  //   editOrder({ id, first_name, last_name }) {
  //     return new Promise((resolve, reject) => {
  //       const order_id = new Promise((resolve, reject) => {
  //         client.query(`
  //         UPDATE orders SET title = '${first_name}', comment = '${last_name}' WHERE id = ${id};
  //       `, (error, results, fields) => {
  //             if (error) reject(error);
  //             resolve(id);
  //           });
  //       });
  //       order_id.then((id) => {
  //         this.getRecordById(id).then(r => resolve(r));
  //       })
  //     });
  //   },



  //   getOrderById(id) {
  //     return new Promise((resolve, reject) => {
  //       client.query(`
  //         SELECT id, title as first_name, comment as last_name FROM orders WHERE id = ${id};
  //       `, (error, results, fields) => {
  //           if (error) reject(error);
  //           resolve(...results);
  //         });
  //     })
  //   },

  //   getOrdersAll() {
  //     return new Promise((resolve, reject) => {
  //       client.query(`SELECT id, title as first_name, comment as last_name FROM orders;`, (error, results, fields) => {
  //         if (error) reject(error);
  //         resolve(results);
  //       });
  //     });
  //   }, 

}