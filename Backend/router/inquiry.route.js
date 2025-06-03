const express = require('express');
const router = express.Router();
const inquiryController = require('../controller/inquiry.controller');

// Create a new inquiry
router.post('/', inquiryController.createInquiry);

// Get all inquiries
router.get('/', inquiryController.getAllInquiries);

// Get inquiry by ID
router.get('/:id', inquiryController.getInquiryById);

// Update inquiry status
router.patch('/:id', inquiryController.updateInquiryStatus);

// Delete inquiry
router.delete('/:id', inquiryController.deleteInquiry);

module.exports = router; 