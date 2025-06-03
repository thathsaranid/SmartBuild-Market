const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controller/jobApplication.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Submit a job application (public access)
router.post('/', jobApplicationController.submitApplication);

// Admin routes (protected)
// Get all applications with optional filters
router.get('/', authMiddleware.isAdmin, jobApplicationController.getAllApplications);

// Get application by ID
router.get('/:id', authMiddleware.isAdmin, jobApplicationController.getApplicationById);

// Update application status
router.patch('/:id/status', authMiddleware.isAdmin, jobApplicationController.updateApplicationStatus);

// Delete application
router.delete('/:id', authMiddleware.isAdmin, jobApplicationController.deleteApplication);

module.exports = router; 