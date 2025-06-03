const express = require('express');
const router = express.Router();
const messageController = require('../controller/message.controller');
const { protect, authorize } = require('../middleware/auth');

// Get all messages (admin only)
router.get('/all', protect, authorize('admin'), messageController.getAllMessages);

// Get messages for specific user
router.get('/user/:userId', protect, messageController.getUserMessages);

// Get active users with their last messages
router.get('/active-users', protect, messageController.getActiveUsers);

// Mark messages as read
router.put('/read/:userId', protect, messageController.markAsRead);

// Store new message
router.post('/', protect, messageController.storeMessage);

module.exports = router; 