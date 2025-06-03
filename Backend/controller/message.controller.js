const Message = require('../model/message.model');
const User = require('../model/user.model');

const messageController = {
  // Get all messages for admin dashboard
  getAllMessages: async (req, res) => {
    try {
      const messages = await Message.find()
        .sort({ createdAt: -1 })
        .limit(100); // Limit to last 100 messages
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get messages between admin and specific user
  getUserMessages: async (req, res) => {
    try {
      const { userId } = req.params;
      const messages = await Message.find({
        $or: [
          { senderId: userId },
          { receiverId: userId }
        ]
      }).sort({ createdAt: -1 });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all users who have sent messages
  getActiveUsers: async (req, res) => {
    try {
      // Get unique user IDs from messages
      const uniqueUserIds = await Message.distinct('senderId', {
        senderRole: 'user'
      });

      // Get user details
      const users = await User.find({
        _id: { $in: uniqueUserIds }
      }).select('firstName lastName email lastMessage');

      // Get last message for each user
      const usersWithLastMessage = await Promise.all(
        users.map(async (user) => {
          const lastMessage = await Message.findOne({
            $or: [
              { senderId: user._id },
              { receiverId: user._id }
            ]
          }).sort({ createdAt: -1 });

          return {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            lastMessage: lastMessage ? lastMessage.message : null,
            lastMessageTime: lastMessage ? lastMessage.createdAt : null,
            unread: await Message.countDocuments({
              receiverId: user._id,
              read: false
            })
          };
        })
      );

      res.json(usersWithLastMessage);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Mark messages as read
  markAsRead: async (req, res) => {
    try {
      const { userId } = req.params;
      await Message.updateMany(
        { receiverId: userId, read: false },
        { $set: { read: true } }
      );
      res.json({ message: 'Messages marked as read' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Store a new message
  storeMessage: async (req, res) => {
    try {
      const message = new Message(req.body);
      await message.save();
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = messageController; 