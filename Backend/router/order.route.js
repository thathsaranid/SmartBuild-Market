const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controller');
const authenticateToken = require('../middleware/authenticateToken');

// Create new order
router.post('/create', authenticateToken, orderController.createOrder);

// Get all orders (admin only)
router.get('/all', authenticateToken, orderController.getAllOrders);

// Get user's orders
router.get('/my-orders', authenticateToken, orderController.getUserOrders);

// Get single order
router.get('/:id', authenticateToken, orderController.getOrderById);

// Update order status (admin only)
router.put('/:id/status', authenticateToken, orderController.updateOrderStatus);

module.exports = router; 