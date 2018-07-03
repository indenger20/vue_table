const client = require('../db/client');
const OrderService = require('./OrderService');
const config = require('../../config/config');
const utils = require('../helpers/utils');


module.exports = {

  async getProductsLength() {
    try {
      const products = await client.then(conn => conn.query('SELECT id FROM products'));
      return products.length;
    } catch (err) {
      throw new Error(err);
    }
  },

  async getPagesCount() {
    try {
      const productsCount = await this.getProductsLength();
      const pages = utils.getAllPagesCount(productsCount, config.pagination.limit);
      return { pages, limit: config.pagination.limit };
    } catch (err) {
      throw new Error(err);
    }
  },

  async getProducts(user_id, page = 1) {
    try {
      const offset = page * config.pagination.limit;
      const products = await client.then(conn => conn.query(`SELECT id, title, img, price FROM products LIMIT ${config.pagination.limit} OFFSET ${offset}`));
      const orders = await OrderService.getOrders(user_id);
      if (orders.length) {
        products.forEach(p => {
          if (orders.some(o => o.product_id === p.id)) {
            p.inCart = true;
          }
        });
      }
      return products;
    } catch (err) {
      console.log(err);
    }
  },

  async getInformation(product_id) {
    try {
      const info = await client.then(conn => conn.query(`SELECT description FROM products WHERE id = ${product_id}`));
      return info[0].description;
    } catch (err) {
      console.log(err);
    }
  }

}