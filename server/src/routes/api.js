const express = require('express');
const router = express.Router();

const DocumentService = require('../services/DocumentService');

const ordersRoutes = require('./ordersRoutes');

const checkAuth = require('../middleware/checkAuth');

// main routes
router.use('/orders', ordersRoutes);

router.get('/products', checkAuth, async (eq, res, next) => {
  const user_id = eq.userDate ? eq.userDate.id : null;
  const data = await DocumentService.getProducts(user_id);
  res.send(data);
});

module.exports = router;