const express = require('express');
const router = express.Router();
const paymentController = require('../controller/payment.controller');
const { isAuthenticated } = require('../middleware/auth.middleware');

// Create payment intent and order
router.post('/create-payment-intent', isAuthenticated, paymentController.createPaymentIntent);

// Handle successful payment
router.post('/payment-success', isAuthenticated, paymentController.handlePaymentSuccess);

// Get order by ID
router.get('/orders/:orderId', isAuthenticated, paymentController.getOrder);

// Get user's orders
router.get('/orders', isAuthenticated, paymentController.getUserOrders);

module.exports = router;
