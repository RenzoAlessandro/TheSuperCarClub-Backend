const express = require('express');
const router = express.Router();
const jwtVerify = require('../middlewares/isAuth')
const orderController = require('../controllers/order.controller');

router.get('/orders', jwtVerify, orderController.getOrders);

router.post('/orders', jwtVerify, orderController.createOrder);

module.exports = router;