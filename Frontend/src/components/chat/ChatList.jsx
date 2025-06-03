import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { chatAPI } from '../../services/chat.service';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, currentWorker, userType } = useAuth();

  const userId = userType === 'user' ? currentUser?._id : currentWorker?._id;

  useEffect(() => {
    const fetchChats = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        const response = await chatAPI.getChats(userId, userType);
        setChats(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching chats:', err);
        setError('Failed to load chat conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [userId, userType]);

  const formatLastMessage = (chat) => {
    if (!chat.messages || chat.messages.length === 0) {
      return 'No messages yet';
    }
    
    const lastMessage = chat.messages[chat.messages.length - 1];
    const content = lastMessage.content.length > 30 
      ? `${lastMessage.content.substring(0, 30)}...` 
      : lastMessage.content;
      
    return content;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    
    // If today, show the time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If this week, show the day
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    
    // Otherwise show the date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  const getUnreadCount = (chat) => {
    if (!chat.messages) return 0;
    
    return chat.messages.filter(
      msg => !msg.read && msg.receiverId === userId
    ).length;
  };

  const getOtherParticipant = (chat) => {
    const otherParticipant = chat.participants.find(
      p => p.userId._id !== userId
    );
    
    if (!otherParticipant || !otherParticipant.userId) {
      return { name: 'Unknown User' };
    }
    
    const user = otherParticipant.userId;
    
    // For regular users
    if (user.firstName && user.lastName) {
      return {
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar || generateInitialsAvatar(user.firstName, user.lastName)
      };
    }
    
    // For admin users
    if (user.name) {
      return {
        name: user.name,
        avatar: user.avatar || generateInitialsAvatar(user.name)
      };
    }
    
    return { name: 'Unknown User' };
  };
  
  const generateInitialsAvatar = (firstName, lastName) => {
    const initials = firstName.charAt(0) + (lastName ? lastName.charAt(0) : '');
    const colors = ['#5E35B1', '#3949AB', '#1E88E5', '#039BE5', '#00ACC1', '#00897B', '#43A047', '#7CB342'];
    const colorIndex = (firstName.charCodeAt(0) + (lastName ? lastName.charCodeAt(0) : 0)) % colors.length;
    
    return {
      initials,
      bgColor: colors[colorIndex]
    };
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No conversations yet.</p>
        <p className="mt-2">Start a new conversation by contacting support.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {chats.map((chat) => {
        const otherUser = getOtherParticipant(chat);
        const unreadCount = getUnreadCount(chat);
        const lastMessage = chat.messages && chat.messages.length > 0
          ? chat.messages[chat.messages.length - 1]
          : null;
        
        return (
          <motion.div
            key={chat._id}
            className={`p-4 hover:bg-gray-50 cursor-pointer ${unreadCount > 0 ? 'bg-blue-50' : ''}`}
            onClick={() => onSelectChat(chat)}
            whileHover={{ backgroundColor: '#F9FAFB' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {otherUser.avatar && otherUser.avatar.initials ? (
                  <div 
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                    style={{ backgroundColor: otherUser.avatar.bgColor }}
                  >
                    {otherUser.avatar.initials}
                  </div>
                ) : (
                  <img 
                    src={otherUser.avatar || '/default-avatar.png'} 
                    alt={otherUser.name} 
                    className="h-10 w-10 rounded-full"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {otherUser.name}
                  </h3>
                  {lastMessage && (
                    <span className="text-xs text-gray-500">
                      {formatTime(lastMessage.timestamp)}
                    </span>
                  )}
                </div>
                <p className={`text-sm truncate ${unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                  {formatLastMessage(chat)}
                </p>
              </div>
              {unreadCount > 0 && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-xs">
                    {unreadCount}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ChatList; 