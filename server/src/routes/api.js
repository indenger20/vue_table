const express = require('express');
const router = express.Router();

const DocumentService = require('../services/DocumentService');

const ordersRoutes = require('./ordersRoutes');

const checkAuth = require('../middleware/checkAuth');

// main routes
router.use('/orders', ordersRoutes);

router.get('/products/:page', checkAuth, async (eq, res, next) => {
  const user_id = eq.userDate ? eq.userDate.id : null;
  const page = +eq.params.page;
  const data = await DocumentService.getProducts(user_id, page);
  res.send(data);
});

router.post('/products/pages', async (eq, res, next) => {
  const data = await DocumentService.getPagesCount();
  res.send(data);
});

module.exports = router;