import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { chatAPI } from '../../services/chat.service';
import socketService from '../../services/socket.service';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChatWindow = ({ chat, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser, currentWorker, userType } = useAuth();
  const messagesEndRef = useRef(null);
  
  const userId = userType === 'user' ? currentUser?._id : currentWorker?._id;
  
  // Get the other participant in the conversation
  const otherParticipant = chat?.participants?.find(
    p => p.userId._id !== userId
  )?.userId;
  
  // Set up socket connection when chat changes
  useEffect(() => {
    if (!chat || !userId || !otherParticipant) return;
    
    // Connect to socket if not already connected
    socketService.connect();
    
    // Join the room for this conversation
    socketService.joinRoom(userId, otherParticipant._id);
    
    // Set up message listener
    const unsubscribe = socketService.onMessage((messageData) => {
      setMessages(prev => [...prev, messageData]);
    });
    
    // Mark messages as read
    markMessagesAsRead();
    
    return () => {
      unsubscribe();
    };
  }, [chat, userId, otherParticipant]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Initialize messages from chat
  useEffect(() => {
    if (chat?.messages) {
      setMessages(chat.messages);
    }
  }, [chat]);

  const markMessagesAsRead = async () => {
    if (!chat || !userId) return;
    
    try {
      await chatAPI.markAsRead(chat._id, userId);
    } catch (err) {
      console.error('Error marking messages as read:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !chat || !userId || !otherParticipant) return;
    
    try {
      setLoading(true);
      
      const messageData = {
        senderId: userId,
        senderModel: userType,
        receiverId: otherParticipant._id,
        receiverModel: otherParticipant.role === 'admin' ? 'admin' : 'user',
        content: newMessage.trim()
      };
      
      await chatAPI.sendMessage(chat._id, messageData);
      
      // No need to manually add to messages as the socket will handle it
      setNewMessage('');
      setError(null);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };
  
  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = [];
    let currentDate = null;
    let currentGroup = null;
    
    messages.forEach((message) => {
      const messageDate = new Date(message.timestamp).toDateString();
      
      if (messageDate !== currentDate) {
        currentDate = messageDate;
        currentGroup = {
          date: message.timestamp,
          messages: []
        };
        groups.push(currentGroup);
      }
      
      currentGroup.messages.push(message);
    });
    
    return groups;
  };

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="border-b p-4 flex items-center space-x-3">
        <button 
          className="md:hidden p-2 rounded-full hover:bg-gray-100"
          onClick={onBack}
        >
          <ArrowBackIcon fontSize="small" />
        </button>
        <div className="flex-shrink-0">
          {otherParticipant?.avatar ? (
            <img 
              src={otherParticipant.avatar} 
              alt={otherParticipant.name || otherParticipant.firstName} 
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
              {(otherParticipant?.name?.charAt(0) || otherParticipant?.firstName?.charAt(0) || '?')}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium">
            {otherParticipant?.name || 
             (otherParticipant?.firstName && otherParticipant?.lastName ? 
              `${otherParticipant.firstName} ${otherParticipant.lastName}` : 
              'User')}
          </h3>
          <p className="text-sm text-gray-500">
            {otherParticipant?.role === 'admin' ? 'Support Team' : 'User'}
          </p>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {groupMessagesByDate().map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <div className="flex justify-center my-4">
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                {formatDate(group.date)}
              </span>
            </div>
            
            {group.messages.map((message, msgIndex) => {
              const isMe = message.senderId === userId;
              
              return (
                <motion.div
                  key={msgIndex}
                  className={`flex mb-3 ${isMe ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`max-w-[75%] ${isMe ? 'bg-primary text-white' : 'bg-white'} rounded-lg p-3 shadow-sm`}>
                    <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    <span className={`text-xs ${isMe ? 'text-blue-100' : 'text-gray-500'} block text-right mt-1`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
        
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
            <p>No messages yet</p>
            <p className="text-sm mt-2">Send a message to start the conversation</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="border-t p-4 bg-white">
        {error && (
          <div className="text-red-500 text-sm mb-2">
            {error}
          </div>
        )}
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark disabled:opacity-50"
            disabled={loading || !newMessage.trim()}
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow; 