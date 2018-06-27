const express = require('express');
const router = express.Router();

const OrderService = require('../services/OrderService');
const checkAuth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

router.use(checkAuth);

router.get('/', async (eq, res, next) => {
  const data = await OrderService.getOrders(eq.userDate.id);
  res.send(data);
});

router.delete('/:id', async (eq, res, next) => {
  const data = await OrderService.deleteOrder(+eq.params.id);
  res.send(data);
});

router.post('/', async (eq, res, next) => {
  const data = await OrderService.addOrder({ ...eq.body, user_id: eq.userDate.id });
  res.send(data);
});

router.put('/', async (eq, res, next) => {
  const { order, first_name, last_name } = eq.body;
  const data = await OrderService.editOrder({ id: order.id, first_name, last_name });
  res.send(data);
});

router.get('/admin', isAdmin, async (eq, res, next) => {
  const data = await OrderService.getOrdersAll();
  res.send(data);
});

module.exports = router;