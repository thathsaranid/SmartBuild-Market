import axios from 'axios';

const API_URL = 'http://localhost:3002/api/chat';

export const chatAPI = {
  // Get all chats for a user or admin
  getChats: async (userId, userType) => {
    try {
      const response = await axios.get(`${API_URL}/chats/${userId}/${userType}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching chats:', error);
      throw error;
    }
  },

  // Get or create chat with another user
  getChatWithUser: async (userId, userType, otherId, otherType) => {
    try {
      const response = await axios.get(`${API_URL}/chat/${userId}/${userType}/${otherId}/${otherType}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching chat:', error);
      throw error;
    }
  },

  // Send a message
  sendMessage: async (chatId, messageData) => {
    try {
      const response = await axios.post(`${API_URL}/chat/${chatId}/message`, messageData);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Mark messages as read
  markAsRead: async (chatId, userId) => {
    try {
      const response = await axios.put(`${API_URL}/chat/${chatId}/read`, { userId });
      return response.data;
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  },

  // Get unread message count
  getUnreadCount: async (userId, userType) => {
    try {
      const response = await axios.get(`${API_URL}/chat/unread/${userId}/${userType}`);
      return response.data;
    } catch (error) {
      console.error('Error getting unread count:', error);
      throw error;
    }
  }
};

class ChatService {
  constructor() {
    this.storageKey = 'chat_messages';
  }

  // Get all messages
  getAllMessages() {
    const messages = localStorage.getItem(this.storageKey);
    return messages ? JSON.parse(messages) : [];
  }

  // Get messages for a specific user
  getUserMessages(userId) {
    const messages = this.getAllMessages();
    return messages.filter(msg => msg.userId === userId);
  }

  // Add a new message
  addMessage(userId, userName, message) {
    const messages = this.getAllMessages();
    const newMessage = {
      id: Date.now(),
      userId,
      userName,
      message,
      timestamp: new Date().toISOString()
    };
    messages.push(newMessage);
    localStorage.setItem(this.storageKey, JSON.stringify(messages));
    return newMessage;
  }

  // Get all unique users who have sent messages
  getAllUsers() {
    const messages = this.getAllMessages();
    const users = new Map();
    
    messages.forEach(msg => {
      if (!users.has(msg.userId)) {
        users.set(msg.userId, {
          userId: msg.userId,
          userName: msg.userName
        });
      }
    });
    
    return Array.from(users.values());
  }
}

const chatService = new ChatService();
export default chatService; 