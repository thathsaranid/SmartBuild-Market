const express = require('express');
const router = express.Router();
const AdminController = require('../controller/admin.controller');

// Dashboard stats
router.get('/dashboard-stats', AdminController.getDashboardStats);

// User management
router.get('/users', AdminController.getUsers);
router.get('/sellers', AdminController.getSellers);
router.put('/sellers/:id/approve', AdminController.approveSeller);
router.put('/sellers/:id/reject', AdminController.rejectSeller);

// Content management
router.get('/orders', AdminController.getOrders);
router.get('/products', AdminController.getProducts);
router.get('/materials', AdminController.getMaterials);
router.get('/workers', AdminController.getWorkers);
router.get('/designs', AdminController.getDesigns);
router.get('/machines', AdminController.getMachines);

module.exports = router; 