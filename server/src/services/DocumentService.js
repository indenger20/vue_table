const client = require('../db/client');
const OrderService = require('./OrderService');
const config = require('../../config/config');


module.exports = {

  getProducts(user_id) {
    return new Promise((resolve, reject) => {
      client.query(`SELECT id, title, img, price FROM products`, async (error, results, fields) => {
        if (error) reject(error);
        const products = results;
        const orders = await OrderService.getOrders(user_id);
        if (orders.length) {
          products.forEach(p => {
            if (orders.some(o => o.product_id === p.id)) {
              p.inCart = true;
            }
          });
        }
        // const products = results.map(p => {
        //   const imgPath = `${config.imagesFolder}/${p.img}`;
        //   p.img = imgPath;
        //   return p;
        // });
        resolve(products);
      });
    })
  }

}