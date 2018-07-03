const client = require('../db/client');

module.exports = {
  async create({ product_id, user_id }) {
    try {
      await client.then(conn => conn.query(`INSERT INTO orders (created_at, product_id, user_id) VALUES(NOW(), '${product_id}', '${user_id}');`));
      const orders = await this.getOrders(user_id);
      return orders;
    } catch (err) {
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

  async removeOrder({ order_id, user_id }) {
    try {
      await client.then(conn => conn.query(`DELETE FROM orders WHERE id = ${order_id}`));
      const orders = await this.getOrders(user_id);
      return orders;
    } catch (err) {
      throw new Error(err);
    }
  },
}