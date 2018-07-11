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

  async getPagesCount(products = null) {
    try {
      let productsCount = null;
      if (products === null) {
        productsCount = await this.getProductsLength();
      } else {
        productsCount = products.length;
      }
      const pages = utils.getAllPagesCount(productsCount, config.pagination.limit);
      return { pages, limit: config.pagination.limit };
    } catch (err) {
      throw new Error(err);
    }
  },

  async checkSelectedProducts(products, user_id) {
    try {
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
      throw new Error(err);
    }
  },

  async getProducts(user_id, page = 1, query) {
    try {
      let queryFilter = ``;
      if (!utils.isEmpty(query)) {
        queryFilter = utils.createFilterQuery(query);
      }


      let products = await client.then(conn => conn.query(`
        SELECT id, title, img, price, make_id 
        FROM products 
        ${queryFilter}
      `));

      const pages = await this.getPagesCount(products);
      const offset = pages.pages < page ? (pages.pages - 1) * config.pagination.limit : (page - 1) * config.pagination.limit;
      products = products.splice(offset, config.pagination.limit);
      products = await this.checkSelectedProducts(products, user_id);


      return { products, pages };
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
  },

  async getMakes() {
    try {
      const makes = await client.then(conn => conn.query(`SELECT title, id FROM makes`));
      return makes;
    } catch (err) {
      console.log(err);
    }
  }

}