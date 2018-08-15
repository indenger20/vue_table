const express = require('express');
const router = express.Router();

const DocumentService = require('../services/DocumentService');
// const checkAuth = require('../middleware/auth');
const checkAuth = require('../middleware/checkAuth');


router.get('/list/:page', checkAuth, async (eq, res, next) => {
  const user_id = eq.userDate ? eq.userDate.id : null;
  const page = +eq.params.page;
  const query = eq.query;
  delete query.redirect;
  const { products, pages } = await DocumentService.getProducts(user_id, page, query);
  const categories = await DocumentService.getCategories();
  const makes = await DocumentService.getMakes();

  res.send({ products, makes, pages, categories });
});

router.get('/:page', checkAuth, async (eq, res, next) => {
  const user_id = eq.userDate ? eq.userDate.id : null;
  const page = +eq.params.page;
  const query = eq.query;
  const { products, pages } = await DocumentService.getProducts(user_id, page, query);
  res.send({ products, pages });
});

router.get('/information/:id', async (eq, res, next) => {
  const product_id = +eq.params.id;
  const data = await DocumentService.getInformation(product_id);
  res.send(data);
});

module.exports = router;