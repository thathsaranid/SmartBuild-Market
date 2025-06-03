// Message storage service using localStorage
class MessageStorage {
  constructor() {
    this.storageKey = 'chat_messages';
  }

  // Get all messages
  getAllMessages() {
    const messages = localStorage.getItem(this.storageKey);
    return messages ? JSON.parse(messages) : {};
  }

  // Get messages for a specific user
  getUserMessages(userId) {
    const allMessages = this.getAllMessages();
    return allMessages[userId] || [];
  }

  // Add a new message
  addMessage(userId, message) {
    const allMessages = this.getAllMessages();
    if (!allMessages[userId]) {
      allMessages[userId] = [];
    }
    
    const newMessage = {
      id: Date.now(),
      text: message,
      timestamp: new Date().toISOString(),
      senderId: userId
    };
    
    allMessages[userId].push(newMessage);
    localStorage.setItem(this.storageKey, JSON.stringify(allMessages));
    return newMessage;
  }

  // Get all users who have sent messages
  getAllUsers() {
    const allMessages = this.getAllMessages();
    return Object.keys(allMessages).map(userId => ({
      id: userId,
      name: `User ${userId}`,
      lastMessage: allMessages[userId][allMessages[userId].length - 1]?.text || 'No messages',
      lastMessageTime: allMessages[userId][allMessages[userId].length - 1]?.timestamp
    }));
  }
}

const messageStorage = new MessageStorage();
export default messageStorage; 