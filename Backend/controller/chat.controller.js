const ChatModel = require("../model/chat.model");
const UserModel = require("../model/user.model");
const AdminModel = require("../model/adminModel");

// Get all chats for a user (if user) or all chats (if admin)
exports.getChats = async (req, res) => {
  try {
    const { userId, userType } = req.params;
    let query = {};

    if (userType === 'user') {
      // For regular users, only show their own chats
      query = {
        'participants.userId': userId,
        'participants.model': userType
      };
    } else if (userType === 'admin') {
      // Admin can see all chats
      // No specific query needed, or you can filter by admin ID if needed
    }

    const chats = await ChatModel.find(query)
      .populate({
        path: 'participants.userId',
        match: { 'participants.model': 'user' },
        select: 'firstName lastName email'
      })
      .sort({ lastUpdated: -1 });

    return res.status(200).json({
      success: true,
      data: chats
    });
  } catch (error) {
    console.error("Error in getChats:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get or create a chat between two users
exports.getChatWithUser = async (req, res) => {
  try {
    const { userId, userType, otherId, otherType } = req.params;

    // Find existing chat
    let chat = await ChatModel.findOne({
      'participants': {
        $all: [
          { $elemMatch: { userId, model: userType } },
          { $elemMatch: { userId: otherId, model: otherType } }
        ]
      }
    }).populate({
      path: 'participants.userId',
      select: 'firstName lastName email name role'
    });

    // If chat doesn't exist, create a new one
    if (!chat) {
      chat = await ChatModel.create({
        participants: [
          { userId, model: userType },
          { userId: otherId, model: otherType }
        ],
        messages: [],
        lastUpdated: new Date()
      });

      chat = await ChatModel.findById(chat._id).populate({
        path: 'participants.userId',
        select: 'firstName lastName email name role'
      });
    }

    return res.status(200).json({
      success: true,
      data: chat
    });
  } catch (error) {
    console.error("Error in getChatWithUser:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Send a message in a chat
exports.sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { senderId, senderModel, receiverId, receiverModel, content } = req.body;

    if (!chatId || !senderId || !senderModel || !receiverId || !receiverModel || !content) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const newMessage = {
      senderId,
      senderModel,
      receiverId,
      receiverModel,
      content,
      timestamp: new Date()
    };

    const updatedChat = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $push: { messages: newMessage },
        lastUpdated: new Date()
      },
      { new: true }
    );

    if (!updatedChat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found"
      });
    }

    // Emit the message using Socket.io
    const io = req.app.get('io');
    if (io) {
      const roomId = [senderId, receiverId].sort().join("_");
      io.to(roomId).emit("receiveMessage", newMessage);
    }

    return res.status(200).json({
      success: true,
      data: updatedChat,
      message: newMessage
    });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Mark messages as read
exports.markAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.body;

    const chat = await ChatModel.findById(chatId);
    
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found"
      });
    }

    // Update all unread messages where the current user is the receiver
    const updatedChat = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $set: {
          "messages.$[elem].read": true
        }
      },
      {
        arrayFilters: [{ "elem.receiverId": userId, "elem.read": false }],
        new: true
      }
    );

    return res.status(200).json({
      success: true,
      data: updatedChat
    });
  } catch (error) {
    console.error("Error in markAsRead:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get unread message count for a user
exports.getUnreadCount = async (req, res) => {
  try {
    const { userId, userType } = req.params;

    const chats = await ChatModel.find({
      'participants': {
        $elemMatch: { userId, model: userType }
      }
    });

    let totalUnread = 0;
    for (const chat of chats) {
      const unreadCount = chat.messages.filter(
        msg => !msg.read && msg.receiverId.toString() === userId.toString()
      ).length;
      totalUnread += unreadCount;
    }

    return res.status(200).json({
      success: true,
      unreadCount: totalUnread
    });
  } catch (error) {
    console.error("Error in getUnreadCount:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get active users
exports.getActiveUsers = async (req, res) => {
  try {
    // Get all users who have been active in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const activeUsers = await UserModel.find({
      lastActive: { $gte: fiveMinutesAgo }
    }).select('firstName lastName email _id');

    return res.status(200).json({
      success: true,
      data: activeUsers
    });
  } catch (error) {
    console.error("Error in getActiveUsers:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}; 