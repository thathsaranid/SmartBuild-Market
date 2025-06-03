import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.messageListeners = [];
    this.url = 'http://localhost:3001';
  }

  connect() {
    if (!this.socket) {
      try {
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('userRole');
        const userName = localStorage.getItem('userName');

        if (!token) {
          console.error('No authentication token found');
          return null;
        }

        this.socket = io(this.url, {
          auth: { 
            token,
            userType,
            userName 
          },
          withCredentials: true,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          transports: ['polling', 'websocket'], // Start with polling, upgrade to websocket
          upgrade: true,
          rememberUpgrade: true,
          path: '/socket.io'
        });

        this.socket.on('connect', () => {
          console.log('Socket connected:', this.socket.id);
        });

        this.socket.on('connect_error', (error) => {
          console.error('Socket connection error:', error);
          if (error.message === 'jwt expired' || error.message === 'jwt malformed') {
            // Handle token expiration
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
        });

        this.socket.on('disconnect', (reason) => {
          console.log('Socket disconnected:', reason);
          if (reason === 'io server disconnect') {
            // Reconnect if server initiated disconnect
            setTimeout(() => this.connect(), 1000);
          }
        });

        this.socket.on('error', (error) => {
          console.error('Socket error:', error);
        });

        this.socket.on('receiveMessage', (messageData) => {
          console.log('Message received via socket:', messageData);
          this.messageListeners.forEach(callback => callback(messageData));
        });

      } catch (error) {
        console.error('Error initializing socket:', error);
        return null;
      }
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.messageListeners = [];
      console.log('Socket disconnected manually');
    }
  }

  joinRoom(senderId, receiverId) {
    if (!this.socket?.connected) {
      const socket = this.connect();
      if (!socket) return;
    }
    
    if (this.socket?.connected && senderId && receiverId) {
      console.log(`Joining chat room for ${senderId} and ${receiverId}`);
      this.socket.emit('joinRoom', { senderId, receiverId });
    } else {
      console.error('Cannot join room: socket not connected or invalid IDs');
    }
  }

  sendMessage(senderId, receiverId, messageData) {
    if (!this.socket?.connected) {
      const socket = this.connect();
      if (!socket) return false;
    }
    
    if (this.socket?.connected && senderId && receiverId && messageData) {
      console.log(`Sending message via socket from ${senderId} to ${receiverId}`);
      this.socket.emit('sendMessage', { 
        senderId, 
        receiverId, 
        message: messageData.message,
        timestamp: new Date().toISOString(),
        type: messageData.type || 'chat'
      });
      return true;
    } else {
      console.error('Cannot send message: socket not connected or invalid parameters');
      return false;
    }
  }

  onMessage(callback) {
    if (typeof callback === 'function') {
      this.messageListeners.push(callback);
    }
    return () => {
      this.messageListeners = this.messageListeners.filter(cb => cb !== callback);
    };
  }

  isConnected() {
    return this.socket?.connected || false;
  }
}

// Create singleton instance
const socketService = new SocketService();
export default socketService; 