import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { chatAPI } from '../services/chat.service';
import socketService from '../services/socket.service';
import '../styles/ChatBox.css';

const SimpleChatPage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [chatId, setChatId] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Connect to socket and fetch existing chat on component mount
  useEffect(() => {
    if (isAuthenticated && currentUser?._id) {
      setLoading(true);

      // Connect to socket
      socketService.connect();

      // Default admin ID (use your actual admin ID)
      const adminUserId = 'admin123';
      
      // Join chat room
      socketService.joinRoom(currentUser._id, adminUserId);

      // Find or create a chat with admin
      const fetchOrCreateAdminChat = async () => {
        try {
          // Get or create chat with admin
          const response = await chatAPI.getChatWithUser(currentUser._id, 'user', adminUserId, 'admin');
          const chat = response.data;
          
          // Set chat ID
          setChatId(chat._id);
          
          // Format messages
          const formattedMessages = chat.messages.map(msg => ({
            text: msg.content,
            sender: msg.senderId === currentUser._id ? 'user' : 'support',
            timestamp: new Date(msg.timestamp)
          }));
          
          setMessages(formattedMessages);
          
          // Mark messages as read
          if (chat._id) {
            await chatAPI.markAsRead(chat._id, currentUser._id);
          }
        } catch (error) {
          console.error('Error fetching admin chat:', error);
          setError('Failed to load chat. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchOrCreateAdminChat();

      // Set up socket listener for new messages
      const unsubscribe = socketService.onMessage((messageData) => {
        console.log('Received message via socket:', messageData);
        
        // Add the new message to our messages state
        if (messageData.senderId !== currentUser._id) {
          setMessages(prevMessages => [
            ...prevMessages,
            {
              text: messageData.message || messageData.content,
              sender: 'support',
              timestamp: new Date(messageData.time || messageData.timestamp || new Date())
            }
          ]);
          
          // Mark messages as read if we have a chatId
          if (chatId) {
            chatAPI.markAsRead(chatId, currentUser._id).catch(err => {
              console.error('Error marking messages as read:', err);
            });
          }
        }
      });

      // Clean up on unmount
      return () => {
        unsubscribe();
        socketService.disconnect();
      };
    }
  }, [isAuthenticated, currentUser, chatId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !chatId) return;

    // Default admin ID
    const adminUserId = 'admin123';
    
    try {
      // Format message data for the API
      const messageData = {
        senderId: currentUser._id,
        senderModel: 'user',
        receiverId: adminUserId,
        receiverModel: 'admin',
        content: newMessage.trim()
      };

      // Add message to local state immediately for better UX
      const newMsg = {
        text: newMessage.trim(),
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, newMsg]);
      setNewMessage('');

      // Send message via API
      const response = await chatAPI.sendMessage(chatId, messageData);
      
      // Also send via socket for real-time
      socketService.sendMessage(currentUser._id, adminUserId, newMessage.trim());
      
      console.log('Message sent successfully:', response);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    }
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/chat' }} />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container-custom py-8">
      <div className="chat-container">
        <h2 className="chat-title">Customer Support</h2>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 text-center">
            {error}
            <button 
              className="ml-2 underline text-primary" 
              onClick={() => setError(null)}
            >
              Dismiss
            </button>
          </div>
        )}
        
        <div className="chat-box">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 my-8">
              <p>No messages yet. Start a conversation with customer support!</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <div>{msg.text}</div>
                <div className="message-time">{formatTime(msg.timestamp)}</div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            disabled={!chatId}
          />
          <button 
            onClick={handleSend}
            disabled={!newMessage.trim() || !chatId}
            className={!newMessage.trim() || !chatId ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleChatPage; 