const express = require('express');
const router = express.Router();

const DocumentService = require('../services/DocumentService');

const ordersRoutes = require('./ordersRoutes');

// main routes
router.use('/orders', ordersRoutes);

router.get('/products', async (eq, res, next) => {
  const data = await DocumentService.getProducts();
  res.send(data);
});

module.exports = router;