const express = require('express');
const router = express.Router();

const DocumentService = require('../services/DocumentService');

const ordersRoutes = require('./ordersRoutes');
const productsRoutes = require('./productsRoutes');

// main routes
router.use('/orders', ordersRoutes);

router.use('/products', productsRoutes);

module.exports = router;