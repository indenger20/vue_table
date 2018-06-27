const client = require('../db/client');

module.exports = {
//   getOrders(user_id) {
//     return new Promise((resolve, reject) => {
//       client.query(`SELECT id, title, comment as last_name FROM orders WHERE user_id = ${user_id}`, (error, results, fields) => {
//         if (error) reject(error);
//         resolve(results);
//       });
//     });
//   },

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

//   addOrder({ first_name, last_name, user_id }) {
//     return new Promise((resolve, reject) => {
//       const order_id = new Promise((resolve, reject) => {
//         client.query(`
//         INSERT INTO orders (created_at, title, comment, user_id) VALUES(NOW(), '${first_name}', '${last_name}', '${user_id}');
//       `, (error, results, fields) => {
//             if (error) reject(error);
//             resolve(results.insertId);
//           });
//       });
//       order_id.then((id) => {
//         this.getOrderById(id).then(r => resolve(r));
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