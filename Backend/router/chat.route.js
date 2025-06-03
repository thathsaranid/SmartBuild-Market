const express = require("express");
const router = express.Router();
const chatController = require("../controller/chat.controller");

// Get all chats for a user or admin
router.get("/chats/:userId/:userType", chatController.getChats);

// Get or create a chat between two users
router.get("/chat/:userId/:userType/:otherId/:otherType", chatController.getChatWithUser);

// Send a message
router.post("/chat/:chatId/message", chatController.sendMessage);

// Mark messages as read
router.put("/chat/:chatId/read", chatController.markAsRead);

// Get unread message count
router.get("/chat/unread/:userId/:userType", chatController.getUnreadCount);

// Get active users
router.get("/active-users", chatController.getActiveUsers);

module.exports = router; 